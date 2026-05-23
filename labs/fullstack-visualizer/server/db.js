import Database from 'better-sqlite3';

// Opens (or creates) the file on first use; path is relative to where node runs
const db = new Database('workflows.sqlite');

// WAL mode keeps reads fast while a write is in progress
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS workflows (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`);

export default db;
