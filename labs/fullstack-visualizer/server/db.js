import Database from 'better-sqlite3';
import { seedIfEmpty } from './seed.js';

// Opens (or creates) the file on first use; path is relative to where node runs
const db = new Database('workflows.sqlite');

// WAL mode keeps reads fast while a write is in progress
db.pragma('journal_mode = WAL');
// SQLite ships with foreign keys OFF per connection - must enable explicitly
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS workflows (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS steps (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    workflow_id INTEGER NOT NULL,
    name        TEXT    NOT NULL,
    position    INTEGER NOT NULL,
    FOREIGN KEY (workflow_id) REFERENCES workflows(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    step_id    INTEGER NOT NULL,
    text       TEXT    NOT NULL,
    completed  INTEGER NOT NULL DEFAULT 0,
    created_at TEXT    NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (step_id) REFERENCES steps(id) ON DELETE CASCADE
  );
`);

// Idempotent migration: add pinned column if it doesn't exist yet
const cols = db.prepare('PRAGMA table_info(workflows)').all();
const hasPinned = cols.some(c => c.name === 'pinned');
if (!hasPinned) {
  db.exec('ALTER TABLE workflows ADD COLUMN pinned INTEGER NOT NULL DEFAULT 0');
}

seedIfEmpty(db);

export default db;
