import { api } from './api.js';
import './visualizer.js';

// Global state - single source of truth, re-render on every mutation
const state = {
  workflows: [],
  selectedId: null,
  steps: [],        // each step has a .tasks array attached after load
};

// --- Default data seeded when the DB is empty ---

const DEFAULTS = [
  {
    name: 'Frontend Workflow',
    steps: [
      { name: 'Design',  tasks: ['Wireframe key screens', 'Review with team', 'Finalize component list'] },
      { name: 'Build',   tasks: ['Set up project scaffold', 'Implement components', 'Wire up API calls'] },
      { name: 'Test',    tasks: ['Cross-browser check', 'Mobile responsiveness', 'Fix console errors'] },
      { name: 'Deploy',  tasks: ['Run build', 'Push to staging', 'Smoke test in prod'] },
    ],
  },
  {
    name: 'Bug Fix Workflow',
    steps: [
      { name: 'Reproduce', tasks: ['Find the failing case', 'Write a test that fails'] },
      { name: 'Fix',       tasks: ['Identify root cause', 'Apply fix', 'Verify test passes'] },
      { name: 'Ship',      tasks: ['Code review', 'Merge to main', 'Monitor for regressions'] },
    ],
  },
  {
    name: 'Code Review Workflow',
    steps: [
      { name: 'Read',     tasks: ['Understand the goal', 'Check tests exist'] },
      { name: 'Evaluate', tasks: ['Look for edge cases', 'Check error handling', 'Spot style issues'] },
      { name: 'Respond',  tasks: ['Leave inline comments', 'Approve or request changes'] },
    ],
  },
];

async function seedDefaults() {
  for (const wfDef of DEFAULTS) {
    const wf = await api.workflows.create(wfDef.name);
    for (const stepDef of wfDef.steps) {
      const step = await api.steps.create(wf.id, stepDef.name);
      for (const taskText of stepDef.tasks) {
        await api.tasks.create(step.id, taskText);
      }
    }
  }
}

// --- Data loading ---

async function loadWorkflows() {
  state.workflows = await api.workflows.list();
  renderWorkflows();
}

async function loadStepsAndTasks(workflowId) {
  const steps = await api.steps.listForWorkflow(workflowId);
  // Fetch all task lists in parallel rather than sequentially
  const taskLists = await Promise.all(steps.map(s => api.tasks.listForStep(s.id)));
  state.steps = steps.map((s, i) => ({ ...s, tasks: taskLists[i] }));
  renderStepsPanel();
}

// --- Render: workflows sidebar ---

function renderWorkflows() {
  const list = document.getElementById('workflow-list');
  list.innerHTML = '';

  if (state.workflows.length === 0) {
    list.innerHTML = '<p class="empty-hint">No workflows yet.</p>';
    return;
  }

  state.workflows.forEach(wf => {
    const item = document.createElement('div');
    item.className = 'workflow-item' + (wf.id === state.selectedId ? ' selected' : '');

    const nameSpan = document.createElement('span');
    nameSpan.className = 'workflow-item__name';
    nameSpan.title = wf.name;
    nameSpan.textContent = wf.name;

    const delBtn = document.createElement('button');
    delBtn.className = 'ghost danger-text delete-wf-btn';
    delBtn.title = 'Delete workflow';
    delBtn.textContent = 'x';
    delBtn.dataset.id = wf.id;

    nameSpan.addEventListener('click', () => {
      state.selectedId = wf.id;
      renderWorkflows();
      loadStepsAndTasks(wf.id);
    });

    delBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (!confirm(`Delete workflow "${wf.name}"? This will also delete all its steps and tasks.`)) return;
      await api.workflows.remove(wf.id);
      if (state.selectedId === wf.id) {
        state.selectedId = null;
        state.steps = [];
      }
      await loadWorkflows();
      renderStepsPanel();
    });

    item.appendChild(nameSpan);
    item.appendChild(delBtn);
    list.appendChild(item);
  });
}

// --- Render: step card (returns HTML string) ---

function stepCardHTML(step) {
  const tasksHTML = step.tasks.length === 0
    ? '<p class="empty-hint">No tasks yet.</p>'
    : `<ul class="task-list">
        ${step.tasks.map(t => `
          <li class="task-item${t.completed ? ' completed' : ''}">
            <button class="ghost toggle-task-btn" data-id="${t.id}" title="Toggle">
              ${t.completed ? '&#10003;' : '&#9675;'}
            </button>
            <span class="task-item__text">${t.text}</span>
            <button class="ghost danger-text delete-task-btn" data-id="${t.id}" title="Delete task">x</button>
          </li>`).join('')}
      </ul>`;

  return `
    <div class="step-card" data-id="${step.id}">
      <div class="step-card__header">
        <span class="step-card__name">
          ${step.name}<span class="step-card__position">#${step.position}</span>
        </span>
        <button class="ghost danger-text delete-step-btn" data-id="${step.id}">Delete step</button>
      </div>
      ${tasksHTML}
      <form class="add-task-form" data-step-id="${step.id}">
        <input type="text" placeholder="New task" required>
        <button type="submit">Add task</button>
      </form>
    </div>`;
}

// --- Render: main steps panel ---

function renderStepsPanel() {
  const panel = document.getElementById('steps-panel');

  if (!state.selectedId) {
    panel.innerHTML = '<p class="empty-hint">Select a workflow to see its steps.</p>';
    return;
  }

  const wf = state.workflows.find(w => w.id === state.selectedId);
  const wfName = wf ? wf.name : `Workflow ${state.selectedId}`;

  const stepsHTML = state.steps.length === 0
    ? '<p class="empty-hint">No steps yet.</p>'
    : state.steps.map(stepCardHTML).join('');

  panel.innerHTML = `
    <div class="steps-header">
      <h2>${wfName}</h2>
    </div>
    ${stepsHTML}
    <form id="add-step-form">
      <input type="text" id="step-name-input" placeholder="New step name" required>
      <button type="submit">Add step</button>
    </form>`;

  // Wire step deletes
  panel.querySelectorAll('.delete-step-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      await api.steps.remove(Number(btn.dataset.id));
      await loadStepsAndTasks(state.selectedId);
    });
  });

  // Wire task toggles
  panel.querySelectorAll('.toggle-task-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      await api.tasks.toggle(Number(btn.dataset.id));
      await loadStepsAndTasks(state.selectedId);
    });
  });

  // Wire task deletes
  panel.querySelectorAll('.delete-task-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      await api.tasks.remove(Number(btn.dataset.id));
      await loadStepsAndTasks(state.selectedId);
    });
  });

  // Wire add-task forms (one per step card)
  panel.querySelectorAll('.add-task-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const stepId = Number(form.dataset.stepId);
      const input = form.querySelector('input');
      const text = input.value.trim();
      if (!text) return;
      await api.tasks.create(stepId, text);
      input.value = '';
      await loadStepsAndTasks(state.selectedId);
    });
  });

  // Wire add-step form
  document.getElementById('add-step-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('step-name-input');
    const name = input.value.trim();
    if (!name) return;
    await api.steps.create(state.selectedId, name);
    input.value = '';
    await loadStepsAndTasks(state.selectedId);
  });
}

// --- Top-level event wiring ---

document.getElementById('create-workflow-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.getElementById('workflow-name-input');
  const name = input.value.trim();
  if (!name) return;
  const created = await api.workflows.create(name);
  input.value = '';
  state.selectedId = created.id;
  state.steps = [];
  await loadWorkflows();
  renderStepsPanel();
});

// --- Boot ---

async function init() {
  const workflows = await api.workflows.list();
  if (workflows.length === 0) await seedDefaults();
  await loadWorkflows();
}

init();
