import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'not found' });
  res.json(row);
});

router.put('/:id', (req, res) => {
  const { text, completed } = req.body;
  if (text === undefined && completed === undefined) {
    return res.status(400).json({ error: 'text or completed is required' });
  }
  if (completed !== undefined && completed !== 0 && completed !== 1) {
    return res.status(400).json({ error: 'completed must be 0 or 1' });
  }

  const existing = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not found' });

  // Fall back to current values for any field not included in the request
  const newText = (text !== undefined && typeof text === 'string' && text.trim())
    ? text.trim()
    : existing.text;
  const newCompleted = completed !== undefined ? completed : existing.completed;

  db.prepare('UPDATE tasks SET text = ?, completed = ? WHERE id = ?')
    .run(newText, newCompleted, req.params.id);

  const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
  res.json(row);
});

// Flip completed without needing to know the current value
router.patch('/:id/toggle', (req, res) => {
  const existing = db.prepare('SELECT id FROM tasks WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not found' });

  db.prepare('UPDATE tasks SET completed = 1 - completed WHERE id = ?').run(req.params.id);

  const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
  res.json(row);
});

router.delete('/:id', (req, res) => {
  const existing = db.prepare('SELECT id FROM tasks WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not found' });
  db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id);
  res.json({ deleted: true });
});

export default router;
