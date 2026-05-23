import express from 'express';
import db from './db.js';

const app = express();
const PORT = 3000;

// Parse incoming JSON bodies
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// --- Workflows ---

app.get('/workflows', (req, res) => {
  const rows = db.prepare('SELECT * FROM workflows ORDER BY id').all();
  res.json(rows);
});

app.post('/workflows', (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'name is required' });
  }
  // .run() executes and returns lastInsertRowid; .get() fetches the fresh row
  const result = db.prepare('INSERT INTO workflows (name) VALUES (?)').run(name.trim());
  const row = db.prepare('SELECT * FROM workflows WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(row);
});

app.get('/workflows/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM workflows WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'not found' });
  res.json(row);
});

app.put('/workflows/:id', (req, res) => {
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

app.delete('/workflows/:id', (req, res) => {
  const existing = db.prepare('SELECT id FROM workflows WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not found' });
  db.prepare('DELETE FROM workflows WHERE id = ?').run(req.params.id);
  res.json({ deleted: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
