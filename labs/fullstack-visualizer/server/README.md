# Fullstack Visualizer - Server (Phase 3)

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

| Method | Path           | Body     | Success | Notes          |
|--------|----------------|----------|---------|----------------|
| GET    | /workflows     | -        | 200     | returns array  |
| POST   | /workflows     | `{name}` | 201     | returns new row |
| GET    | /workflows/:id | -        | 200     | 404 if missing |
| PUT    | /workflows/:id | `{name}` | 200     | 404 if missing |
| DELETE | /workflows/:id | -        | 200     | cascades steps and tasks |

### Steps

| Method | Path                     | Body                         | Success | Notes                   |
|--------|--------------------------|------------------------------|---------|-------------------------|
| GET    | /workflows/:id/steps     | -                            | 200     | ordered by position ASC |
| POST   | /workflows/:id/steps     | `{name}`                     | 201     | position auto-assigned  |
| GET    | /steps/:id               | -                            | 200     | 404 if missing          |
| PUT    | /steps/:id               | `{name}` and/or `{position}` | 200     | partial update ok       |
| DELETE | /steps/:id               | -                            | 200     | cascades tasks          |

### Tasks

| Method | Path                   | Body                           | Success | Notes                   |
|--------|------------------------|--------------------------------|---------|-------------------------|
| GET    | /steps/:id/tasks       | -                              | 200     | ordered by created_at ASC |
| POST   | /steps/:id/tasks       | `{text}`                       | 201     | completed defaults to 0 |
| GET    | /tasks/:id             | -                              | 200     | 404 if missing          |
| PUT    | /tasks/:id             | `{text}` and/or `{completed}`  | 200     | completed must be 0 or 1 |
| DELETE | /tasks/:id             | -                              | 200     | 404 if missing          |
| PATCH  | /tasks/:id/toggle      | -                              | 200     | flips completed atomically |

## File layout

```
server/
  index.js          Express app, /health, route mounts
  db.js             SQLite connection, WAL + FK pragmas, schema init
  routes/
    workflows.js    Workflow CRUD + step collection routes
    steps.js        Step item routes + task collection routes
    tasks.js        Task item routes (flat /tasks/:id)
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


# --- Workflows ---
curl -X POST http://localhost:3000/workflows \
  -H "Content-Type: application/json" -d '{"name":"Bug Fix"}'

# Use the id returned above (example: 1)
curl http://localhost:3000/workflows/1
curl http://localhost:3000/workflows
curl -X PUT http://localhost:3000/workflows/1 \
  -H "Content-Type: application/json" -d '{"name":"Bug Triage"}'
curl -i http://localhost:3000/workflows/99999


# --- Steps ---
curl -X POST http://localhost:3000/workflows/1/steps \
  -H "Content-Type: application/json" -d '{"name":"Reproduce the bug"}'

curl -X POST http://localhost:3000/workflows/1/steps \
  -H "Content-Type: application/json" -d '{"name":"Write a failing test"}'

curl http://localhost:3000/workflows/1/steps

# Use the step id returned above (example: 1)
curl http://localhost:3000/steps/1
curl -X PUT http://localhost:3000/steps/1 \
  -H "Content-Type: application/json" -d '{"name":"Isolate the bug"}'
curl -X PUT http://localhost:3000/steps/1 \
  -H "Content-Type: application/json" -d '{"position":5}'
curl -i -X PUT http://localhost:3000/steps/1 \
  -H "Content-Type: application/json" -d '{}'


# --- Tasks ---
curl -X POST http://localhost:3000/steps/1/tasks \
  -H "Content-Type: application/json" -d '{"text":"Check the logs"}'

curl -X POST http://localhost:3000/steps/1/tasks \
  -H "Content-Type: application/json" -d '{"text":"Reproduce locally"}'

curl http://localhost:3000/steps/1/tasks

# Use the task id returned above (example: 1)
curl http://localhost:3000/tasks/1

# PUT - text only (completed unchanged)
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" -d '{"text":"Review the error logs"}'

# PUT - completed only (text unchanged)
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" -d '{"completed":1}'

# PUT - invalid completed value (400)
curl -i -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" -d '{"completed":2}'

# PUT - no fields (400)
curl -i -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" -d '{}'

# Toggle off -> on -> off
curl -X PATCH http://localhost:3000/tasks/1/toggle
curl -X PATCH http://localhost:3000/tasks/1/toggle

# Delete one task
curl -X DELETE http://localhost:3000/tasks/1
curl -i http://localhost:3000/tasks/1

# Step cascade: delete step, confirm its tasks are gone
curl -X DELETE http://localhost:3000/steps/1
curl -i http://localhost:3000/steps/1/tasks


# --- Transitive CASCADE demonstration ---
# Deleting a workflow cascades to steps, which cascades to tasks.
# The chain: workflows -> steps -> tasks (two hops).

# Create workflow
curl -X POST http://localhost:3000/workflows \
  -H "Content-Type: application/json" -d '{"name":"Cascade Test"}'

# Note the workflow id (example: 2). Create a step under it.
curl -X POST http://localhost:3000/workflows/2/steps \
  -H "Content-Type: application/json" -d '{"name":"Only Step"}'

# Note the step id (example: 3). Create 3 tasks under it.
curl -X POST http://localhost:3000/steps/3/tasks \
  -H "Content-Type: application/json" -d '{"text":"Task Alpha"}'

curl -X POST http://localhost:3000/steps/3/tasks \
  -H "Content-Type: application/json" -d '{"text":"Task Beta"}'

curl -X POST http://localhost:3000/steps/3/tasks \
  -H "Content-Type: application/json" -d '{"text":"Task Gamma"}'

# Confirm 3 tasks exist
curl http://localhost:3000/steps/3/tasks

# Delete the workflow - this cascades to the step, which cascades to the tasks
curl -X DELETE http://localhost:3000/workflows/2

# Step is gone (via cascade from workflow)
curl -i http://localhost:3000/steps/3

# Tasks are gone (via cascade from step, triggered by workflow delete)
# These task ids will vary - check the ids returned from the POST calls above
curl -i http://localhost:3000/tasks/3
curl -i http://localhost:3000/tasks/4
curl -i http://localhost:3000/tasks/5
```

## Design notes

**Foreign key cascade chain:** `workflows -> steps -> tasks`. SQLite walks the chain automatically when `foreign_keys = ON` is set. Deleting a workflow triggers the `ON DELETE CASCADE` on steps, which in turn triggers the cascade on tasks. Without the pragma, all three deletes would silently leave orphan rows.

**`completed` as INTEGER:** SQLite has no native boolean type. `0` and `1` are the idiomatic representation. The `toggle` route uses `1 - completed` in SQL to flip the value atomically - no read-modify-write round trip, no race condition possible.

**Collection routes in parent router files:** `GET/POST /workflows/:id/steps` lives in `routes/workflows.js` and `GET/POST /steps/:id/tasks` lives in `routes/steps.js`. This is because Express 5's path-to-regexp doesn't reliably propagate named params through `router.use()` delegation. Registering them directly on the parent router sidesteps that.

**Partial PUT pattern:** Both `PUT /steps/:id` and `PUT /tasks/:id` accept any subset of updatable fields. The handler fetches the existing row first, uses it as the fallback for omitted fields, then writes everything in one `UPDATE`. One extra SELECT, zero silent data loss.
