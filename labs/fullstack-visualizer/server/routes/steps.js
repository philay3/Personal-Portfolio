import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM steps WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'not found' });
  res.json(row);
});

router.put('/:id', (req, res) => {
  const { name, position } = req.body;
  if (name === undefined && position === undefined) {
    return res.status(400).json({ error: 'name or position is required' });
  }
  const existing = db.prepare('SELECT * FROM steps WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not found' });

  // Only update fields that were provided; fall back to current values for the rest
  const newName = (name !== undefined && typeof name === 'string' && name.trim())
    ? name.trim()
    : existing.name;
  const newPosition = position !== undefined ? position : existing.position;

  db.prepare('UPDATE steps SET name = ?, position = ? WHERE id = ?')
    .run(newName, newPosition, req.params.id);

  const row = db.prepare('SELECT * FROM steps WHERE id = ?').get(req.params.id);
  res.json(row);
});

router.delete('/:id', (req, res) => {
  const existing = db.prepare('SELECT id FROM steps WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not found' });
  db.prepare('DELETE FROM steps WHERE id = ?').run(req.params.id);
  res.json({ deleted: true });
});

export default router;
