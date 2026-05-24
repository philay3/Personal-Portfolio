import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM workflows ORDER BY pinned DESC, created_at ASC').all();
  res.json(rows);
});

router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'name is required' });
  }
  // .run() executes and returns lastInsertRowid; .get() fetches the fresh row
  const result = db.prepare('INSERT INTO workflows (name) VALUES (?)').run(name.trim());
  const row = db.prepare('SELECT * FROM workflows WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(row);
});

// These two must come before /:id so Express doesn't try to match "8/steps" as an id
router.get('/:workflow_id/steps', (req, res) => {
  const workflow = db.prepare('SELECT id FROM workflows WHERE id = ?').get(req.params.workflow_id);
  if (!workflow) return res.status(404).json({ error: 'workflow not found' });

  const rows = db.prepare(
    'SELECT * FROM steps WHERE workflow_id = ? ORDER BY position ASC'
  ).all(req.params.workflow_id);
  res.json(rows);
});

router.post('/:workflow_id/steps', (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'name is required' });
  }

  const workflow = db.prepare('SELECT id FROM workflows WHERE id = ?').get(req.params.workflow_id);
  if (!workflow) return res.status(404).json({ error: 'workflow not found' });

  // MAX returns null when no rows exist, so fall back to -1 so first position is 0
  const max = db.prepare(
    'SELECT MAX(position) AS max_pos FROM steps WHERE workflow_id = ?'
  ).get(req.params.workflow_id);
  const position = max.max_pos === null ? 0 : max.max_pos + 1;

  const result = db.prepare(
    'INSERT INTO steps (workflow_id, name, position) VALUES (?, ?, ?)'
  ).run(req.params.workflow_id, name.trim(), position);

  const row = db.prepare('SELECT * FROM steps WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(row);
});

router.patch('/:id/toggle-pin', (req, res) => {
  const existing = db.prepare('SELECT id FROM workflows WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not found' });
  db.prepare('UPDATE workflows SET pinned = 1 - pinned WHERE id = ?').run(req.params.id);
  const row = db.prepare('SELECT * FROM workflows WHERE id = ?').get(req.params.id);
  res.json(row);
});

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM workflows WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'not found' });
  res.json(row);
});

router.put('/:id', (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'name is required' });
  }
  const existing = db.prepare('SELECT id FROM workflows WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not found' });
  db.prepare('UPDATE workflows SET name = ? WHERE id = ?').run(name.trim(), req.params.id);
  const row = db.prepare('SELECT * FROM workflows WHERE id = ?').get(req.params.id);
  res.json(row);
});

router.delete('/:id', (req, res) => {
  const existing = db.prepare('SELECT id FROM workflows WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not found' });
  db.prepare('DELETE FROM workflows WHERE id = ?').run(req.params.id);
  res.json({ deleted: true });
});

export default router;
