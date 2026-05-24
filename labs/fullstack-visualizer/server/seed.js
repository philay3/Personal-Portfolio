const SEED_WORKFLOWS = [
  { name: 'Bug Fix',              steps: ['Reproduce', 'Diagnose', 'Fix', 'Test', 'Open PR'] },
  { name: 'Ship a Feature',       steps: ['Spec', 'Build', 'Test', 'Deploy', 'Monitor'] },
  { name: 'Code Review',          steps: ['Pull latest', 'Read changes', 'Test locally', 'Leave comments', 'Approve or block'] },
  { name: 'Vibe Code Friday',     steps: ['Pick a side project to scratch', 'Set up playground (repo, branch, env)', 'Spike a rough version', 'Demo to self', 'Commit and reflect'] },
  { name: 'Frontend Development', steps: ['Define the feature', 'Sketch the markup', 'Style it', 'Add interactivity', 'Test in browser'] },
];

export function seedIfEmpty(db) {
  const { count } = db.prepare('SELECT COUNT(*) AS count FROM workflows').get();
  if (count > 0) return;

  const insertWorkflow = db.prepare('INSERT INTO workflows (name) VALUES (?)');
  const insertStep     = db.prepare('INSERT INTO steps (workflow_id, name, position) VALUES (?, ?, ?)');

  const seed = db.transaction((workflows) => {
    for (const wf of workflows) {
      const { lastInsertRowid: wfId } = insertWorkflow.run(wf.name);
      wf.steps.forEach((stepName, i) => insertStep.run(wfId, stepName, i));
    }
  });

  seed(SEED_WORKFLOWS);
}
