# Fullstack Workflow Visualizer

A learning project built through the Next Chapter AI Augmented Builder Bootcamp. Vanilla Node + Express + SQLite backend, vanilla HTML/CSS/JS frontend, with a built-in HTTP log panel that lets you see every API call the browser makes in real time.

## What it does

- Create workflows, add steps to each workflow, add tasks to each step
- Toggle tasks complete/incomplete, delete anything
- All state persists in SQLite - refresh and it's still there
- Open the HTTP Log panel to watch every fetch call as it happens: method, path, status, duration
- Click any log row to inspect the full request body, response body, and headers

## Running it

You need two terminals.

**Terminal 1 - Backend:**
```
cd labs/fullstack-visualizer/server
npm install
node index.js
```
Server runs at http://localhost:3000.

**Terminal 2 - Frontend:**
```
npx serve -p 5050 labs/fullstack-visualizer/client
```
Open http://localhost:5050 in your browser.

## The HTTP Log panel

Click **HTTP Log** in the top-right of the header to open the panel. It slides in from the right and pushes the main content area so nothing is hidden underneath.

What you see in the panel:
- Every fetch call logged as it happens, newest at top
- **Pending rows** appear the moment a request fires (before the response arrives), with a `...` status and a pulsing border
- When the response arrives, the same row updates in place with the real status code and duration
- **Concurrent requests** appear as multiple pending rows at once - try clicking a workflow that has several steps, you will see the step fetch resolve and then N task fetches all appear pending simultaneously
- Color-coded method badges: GET=blue, POST=green, PUT=orange, PATCH=purple, DELETE=red
- Status colors: 2xx=green, 4xx=yellow, 5xx=red, errors=red

**Clicking a row** opens an inline inspector showing:
- Full URL
- Request body (pretty-printed JSON)
- Response status and duration
- Response body (pretty-printed JSON)
- Response headers

**Clear** empties the log. The panel remembers state until you refresh.

## Watching concurrent requests

1. Create a workflow with 3 or more steps, and add at least one task to each step
2. Open the HTTP Log panel
3. Click the workflow in the sidebar
4. Watch: one `GET /workflows/:id/steps` fires first, resolves, then three `GET /steps/:id/tasks` appear as pending simultaneously, then all resolve

This is the core demo: the app uses `Promise.all` to fetch all task lists in parallel, and the visualizer makes that concurrency visible.

## Architecture

```
labs/fullstack-visualizer/
  server/
    index.js          Express app + CORS + route mounts
    db.js             SQLite, WAL mode, FK enforcement, schema init
    routes/
      workflows.js    Workflow CRUD + step collection routes
      steps.js        Step item routes + task collection routes
      tasks.js        Task item routes (GET, PUT, PATCH toggle, DELETE)
  client/
    index.html        App shell + visualizer panel HTML
    api.js            Single request() chokepoint + apiEvents EventTarget
    app.js            DOM + state, imports visualizer.js for side effects
    visualizer.js     Subscribes to apiEvents, owns the log panel DOM
    styles.css        App layout + dark visualizer panel styles
```

The visualizer is a **pure observer**. `app.js` knows nothing about it. Deleting `import './visualizer.js'` from `app.js` would leave the app fully functional - the HTTP Log button just would not work.

The instrumentation lives in one place: the `request()` function in `api.js`. It fires three events:
- `request:start` - immediately when the fetch is dispatched (carries request body)
- `request:end` - when the response arrives and JSON is parsed (carries response data)
- `request:error` - when a network failure occurs (no `request:end` fires)

`visualizer.js` correlates start and end events by UUID to update the same row in place rather than pushing a new one.

## Backend endpoints

### Workflows
| Method | Path | Notes |
|--------|------|-------|
| GET | /workflows | list all |
| POST | /workflows | `{name}`, returns 201 |
| GET | /workflows/:id | 404 if missing |
| PUT | /workflows/:id | `{name}` |
| DELETE | /workflows/:id | cascades steps and tasks |

### Steps
| Method | Path | Notes |
|--------|------|-------|
| GET | /workflows/:id/steps | ordered by position |
| POST | /workflows/:id/steps | `{name}`, position auto-assigned |
| GET | /steps/:id | |
| PUT | /steps/:id | `{name}` and/or `{position}`, partial ok |
| DELETE | /steps/:id | cascades tasks |

### Tasks
| Method | Path | Notes |
|--------|------|-------|
| GET | /steps/:id/tasks | ordered by created_at |
| POST | /steps/:id/tasks | `{text}`, completed defaults 0 |
| GET | /tasks/:id | |
| PUT | /tasks/:id | `{text}` and/or `{completed}` (0 or 1), partial ok |
| PATCH | /tasks/:id/toggle | flips completed atomically |
| DELETE | /tasks/:id | |
