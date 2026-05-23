# Fullstack Visualizer - Server (Phase 1)

Node + Express + SQLite backend. No frontend yet. Test everything with curl.

## Run

```
cd labs/fullstack-visualizer/server
npm install
npm start
```

Server starts at `http://localhost:3000`. The database file `workflows.sqlite` is created automatically on first boot.

## Endpoints

| Method | Path             | Body        | Success | Notes             |
|--------|------------------|-------------|---------|-------------------|
| GET    | /health          | -           | 200     |                   |
| GET    | /workflows       | -           | 200     | returns array     |
| POST   | /workflows       | `{name}`    | 201     | returns new row   |
| GET    | /workflows/:id   | -           | 200     | 404 if missing    |
| PUT    | /workflows/:id   | `{name}`    | 200     | 404 if missing    |
| DELETE | /workflows/:id   | -           | 200     | 404 if missing    |

## Curl test suite

Run these in order in a second terminal while `npm start` is running.

```sh
# 1. Health check
curl http://localhost:3000/health

# 2. Empty list
curl http://localhost:3000/workflows

# 3. Create first workflow - should return 201 with id, name, created_at
curl -X POST http://localhost:3000/workflows \
  -H "Content-Type: application/json" \
  -d '{"name":"Bug Fix"}'

# 4. Create second workflow
curl -X POST http://localhost:3000/workflows \
  -H "Content-Type: application/json" \
  -d '{"name":"Feature Spike"}'

# 5. List all - should show both
curl http://localhost:3000/workflows

# 6. Get one by id
curl http://localhost:3000/workflows/1

# 7. Get missing id - should return 404
curl -i http://localhost:3000/workflows/999

# 8. Update name
curl -X PUT http://localhost:3000/workflows/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Bug Triage"}'

# 9. Confirm update
curl http://localhost:3000/workflows/1

# 10. Delete it
curl -X DELETE http://localhost:3000/workflows/1

# 11. Confirm deletion - should return 404
curl -i http://localhost:3000/workflows/1

# 12. List remaining - should show only id 2
curl http://localhost:3000/workflows

# 13. POST with missing name - should return 400
curl -X POST http://localhost:3000/workflows \
  -H "Content-Type: application/json" \
  -d '{}'

# 14. PUT with missing name - should return 400
curl -X PUT http://localhost:3000/workflows/2 \
  -H "Content-Type: application/json" \
  -d '{}'
```

## File layout

```
server/
  index.js          Express app + all routes inline
  db.js             SQLite connection, WAL mode, schema init
  package.json      ESM, Express 5, better-sqlite3
  .gitignore        node_modules/, *.sqlite
  README.md         this file
  workflows.sqlite  created at runtime, git-ignored
```

## What each piece does

**`db.js`** - Opens or creates `workflows.sqlite`, enables WAL journal mode (keeps reads fast during writes), and runs `CREATE TABLE IF NOT EXISTS` so the schema is always ready before the first request.

**`index.js`** - Imports the db connection, registers all six routes, starts the server. Routes are inline because the file is short enough to read in one screen. Refactor into a router file when it grows.

**`better-sqlite3`** - Synchronous SQLite driver. No callbacks, no promises. `.prepare().all()` returns an array, `.prepare().get()` returns one row or `undefined`, `.prepare().run()` executes a write and returns `{ lastInsertRowid, changes }`. Simpler to follow while learning than async alternatives.

**ESM (`"type": "module"`)** - Enables `import`/`export` syntax natively in Node without a build step.
