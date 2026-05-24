import { api } from './api.js';

// Global state - single source of truth, re-render on every mutation
const state = {
  workflows: [],
  selectedId: null,
};

// --- Render ---

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
    item.dataset.id = wf.id;

    item.innerHTML = `
      <span class="workflow-item__name" title="${wf.name}">${wf.name}</span>
      <button class="ghost danger-text delete-wf-btn" data-id="${wf.id}" title="Delete">x</button>
    `;

    // Click on the name area selects the workflow
    item.querySelector('.workflow-item__name').addEventListener('click', () => {
      state.selectedId = wf.id;
      renderWorkflows();
      renderStepsPanel();
    });

    item.querySelector('.delete-wf-btn').addEventListener('click', async (e) => {
      e.stopPropagation();
      await api.workflows.remove(wf.id);
      if (state.selectedId === wf.id) state.selectedId = null;
      await loadWorkflows();
      renderStepsPanel();
    });

    list.appendChild(item);
  });
}

function renderStepsPanel() {
  const panel = document.getElementById('steps-panel');
  if (!state.selectedId) {
    panel.innerHTML = '<p class="empty-hint">Select a workflow to see its steps.</p>';
    return;
  }
  // Steps rendering added in C5; placeholder for now
  panel.innerHTML = `<p class="empty-hint">Workflow ${state.selectedId} selected. Steps coming in C5.</p>`;
}

// --- Data loading ---

async function loadWorkflows() {
  state.workflows = await api.workflows.list();
  renderWorkflows();
}

// --- Event wiring ---

document.getElementById('create-workflow-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.getElementById('workflow-name-input');
  const name = input.value.trim();
  if (!name) return;
  const created = await api.workflows.create(name);
  input.value = '';
  // Select the newly created workflow automatically
  state.selectedId = created.id;
  await loadWorkflows();
  renderStepsPanel();
});

// --- Boot ---

loadWorkflows();
