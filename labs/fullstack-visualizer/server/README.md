# Fullstack Visualizer - Server (Phase 2)

Node + Express + SQLite backend. No frontend yet. Test everything with curl.

## Run

```
cd labs/fullstack-visualizer/server
npm install
node index.js
```

Server starts at `http://localhost:3000`. The database file `workflows.sqlite` is created automatically on first boot.

## Endpoints

### Workflows

| Method | Path              | Body     | Success | Notes           |
|--------|-------------------|----------|---------|-----------------|
| GET    | /workflows        | -        | 200     | returns array   |
| POST   | /workflows        | `{name}` | 201     | returns new row |
| GET    | /workflows/:id    | -        | 200     | 404 if missing  |
| PUT    | /workflows/:id    | `{name}` | 200     | 404 if missing  |
| DELETE | /workflows/:id    | -        | 200     | cascades steps  |

### Steps

| Method | Path                          | Body                    | Success | Notes                        |
|--------|-------------------------------|-------------------------|---------|------------------------------|
| GET    | /workflows/:id/steps          | -                       | 200     | ordered by position ASC      |
| POST   | /workflows/:id/steps          | `{name}`                | 201     | position auto-assigned       |
| GET    | /steps/:id                    | -                       | 200     | 404 if missing               |
| PUT    | /steps/:id                    | `{name}` and/or `{position}` | 200 | partial update ok       |
| DELETE | /steps/:id                    | -                       | 200     | 404 if missing               |

## File layout

```
server/
  index.js          Express app, /health, route mounts
  db.js             SQLite connection, WAL + FK pragmas, schema init
  routes/
    workflows.js    Workflow CRUD + step collection routes
    steps.js        Individual step routes (flat /steps/:id)
  package.json      ESM, Express 5, better-sqlite3
  .gitignore        node_modules/, *.sqlite
  README.md         this file
  workflows.sqlite  created at runtime, git-ignored
```

## Curl test suite

Run these in order while `node index.js` is running in another terminal.

```sh
# --- Health ---

curl http://localhost:3000/health


# --- Workflows CRUD ---

# Create two workflows
curl -X POST http://localhost:3000/workflows \
  -H "Content-Type: application/json" \
  -d '{"name":"Bug Fix"}'

curl -X POST http://localhost:3000/workflows \
  -H "Content-Type: application/json" \
  -d '{"name":"Feature Spike"}'

# List all
curl http://localhost:3000/workflows

# Get one (replace 1 with the id returned above)
curl http://localhost:3000/workflows/1

# Update
curl -X PUT http://localhost:3000/workflows/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Bug Triage"}'

# Missing workflow (404)
curl -i http://localhost:3000/workflows/99999


# --- Steps ---

# Add three steps to workflow 1 - positions assigned automatically (0, 1, 2)
curl -X POST http://localhost:3000/workflows/1/steps \
  -H "Content-Type: application/json" \
  -d '{"name":"Reproduce the bug"}'

curl -X POST http://localhost:3000/workflows/1/steps \
  -H "Content-Type: application/json" \
  -d '{"name":"Write a failing test"}'

curl -X POST http://localhost:3000/workflows/1/steps \
  -H "Content-Type: application/json" \
  -d '{"name":"Fix and verify"}'

# List steps for workflow 1 (ordered by position)
curl http://localhost:3000/workflows/1/steps

# Get one step by id
curl http://localhost:3000/steps/1

# Update step name only
curl -X PUT http://localhost:3000/steps/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Isolate the bug"}'

# Update step position only (partial update - name unchanged)
curl -X PUT http://localhost:3000/steps/1 \
  -H "Content-Type: application/json" \
  -d '{"position":5}'

# 400 - neither field provided
curl -i -X PUT http://localhost:3000/steps/1 \
  -H "Content-Type: application/json" \
  -d '{}'

# Delete one step
curl -X DELETE http://localhost:3000/steps/1

# Confirm it's gone (404)
curl -i http://localhost:3000/steps/1

# Steps for a missing workflow (404)
curl -i http://localhost:3000/workflows/99999/steps


# --- CASCADE demonstration ---
# Deleting a workflow also deletes all its steps (ON DELETE CASCADE).

# Create a fresh workflow
curl -X POST http://localhost:3000/workflows \
  -H "Content-Type: application/json" \
  -d '{"name":"Cascade Test"}'

# Note the id returned above, use it below (example uses id=2)

# Add 3 steps
curl -X POST http://localhost:3000/workflows/2/steps \
  -H "Content-Type: application/json" \
  -d '{"name":"Step A"}'

curl -X POST http://localhost:3000/workflows/2/steps \
  -H "Content-Type: application/json" \
  -d '{"name":"Step B"}'

curl -X POST http://localhost:3000/workflows/2/steps \
  -H "Content-Type: application/json" \
  -d '{"name":"Step C"}'

# Confirm 3 steps exist
curl http://localhost:3000/workflows/2/steps

# Delete the workflow
curl -X DELETE http://localhost:3000/workflows/2

# Steps are gone - endpoint returns 404 (workflow gone) not an empty array
curl -i http://localhost:3000/workflows/2/steps

# Verify directly via the steps table - any of these step ids should 404
curl -i http://localhost:3000/steps/1
```

## What each piece does

**`db.js`** - Opens or creates `workflows.sqlite`. Sets WAL journal mode (reads stay fast during writes) and `foreign_keys = ON` (SQLite disables FK enforcement per-connection by default - without this pragma, `ON DELETE CASCADE` silently does nothing). Runs both `CREATE TABLE IF NOT EXISTS` statements on every boot.

**`routes/workflows.js`** - Handles all `/workflows/*` routes. The step collection routes (`GET` and `POST /:workflow_id/steps`) live here because Express 5 resolves route params reliably when they are registered directly on the parent router rather than delegated via `router.use()`.

**`routes/steps.js`** - Handles `/steps/:id` routes (get, update, delete a single step by its own id). Mounted flat at `/steps` in `index.js`.

**`better-sqlite3`** - Synchronous SQLite driver. `.prepare().all()` returns an array, `.prepare().get()` returns one row or `undefined`, `.prepare().run()` executes a write and returns `{ lastInsertRowid, changes }`.

**ESM (`"type": "module"`)** - Enables `import`/`export` syntax natively in Node without a build step.
