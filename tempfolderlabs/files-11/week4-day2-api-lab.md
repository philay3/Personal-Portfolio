# Week 4 · Day 2 — What's an API? (Lab Work)

Completed lab record covering Exercises 1–5 and the peer activity.

---

## Exercise 1 — API Explorer

### API 1: GitHub User (`/users/octocat`)
- **login:** octocat
- **public_repos:** 8
- **followers:** ~22,900 (live value, drifts over time)
- **Own username works:** yes

### API 2: JSONPlaceholder Posts (`/posts/1`)
- **Fields:** userId, id, title, body
- **title:** "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
- **/posts/2:** id, title, body (and userId) all change
- **/posts:** returns an array of all posts, 100 total

### API 3: JSONPlaceholder Users (`/users/1`)
- **name:** Leanne Graham
- **city:** Gwenborough (nested inside the `address` object)
- **company:** Romaguera-Crona (nested inside the `company` object)
- **/users:** 10 total

### API 4: JSONPlaceholder Todos (`/todos/1`)
- **Fields:** userId, id, title, completed
- **completed:** a boolean; `false` means not done yet
- **/todos:** 200 total
- **completed: true exists:** yes, several

**Reflection:** What surprised me was how structured the response looks.

---

## Exercise 2 — Make an API Call in Code

```javascript
// Send a GET request to the API endpoint (the waiter takes the order)
fetch("https://jsonplaceholder.typicode.com/posts/1")
  // The response arrives as a raw stream, so convert the body to JSON
  .then((response) => response.json())
  // Now `data` is a normal JS object we can read fields off of
  .then((data) => {
    // Grab the "title" field and print it
    console.log("Title: " + data.title);
  })
  // If the request or parsing fails, handle it instead of crashing
  .catch((error) => {
    console.log("Error: " + error);
  });
```

**Expected output:** `Title: sunt aut facere repellat provident occaecati excepturi optio reprehenderit`

### What each piece does
1. **`fetch()`** — sends the request and hands back a pending promise immediately.
2. **`.then()`** — registers "run this callback once the previous promise resolves," and returns a new promise so the chain can continue.
3. **`response.json()`** — reads the raw response body and parses it into a JS object; returns a promise while it does.
4. **`data.title`** — reads the `title` field off the parsed object.
5. **`.catch()`** — runs if any promise in the chain rejects, instead of crashing.

### async/await equivalent
```javascript
async function getPost() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await res.json();
    console.log("Title: " + data.title);
  } catch (error) {
    console.log("Error: " + error);
  }
}
```
`await` is `.then` with friendlier syntax: it waits for the promise and unwraps the value.

> Note to self: revisit how promises work (pending container, chaining, why a returned promise gets unwrapped).

---

## Exercise 3 — HTTP Methods / Endpoint Design

**App:** Fullstack Visualizer (workflow app)
**Resources (nouns):** workflows, steps, tasks (nested: a workflow has steps, a step has tasks)

```
WORKFLOWS
GET    /workflows                       -- Returns all workflows
GET    /workflows/5                     -- Returns a single workflow (#5)
POST   /workflows                       -- Creates a new workflow
PUT    /workflows/5                     -- Updates workflow #5 (e.g. rename, pin)
DELETE /workflows/5                     -- Deletes workflow #5

STEPS  (a step belongs to a workflow)
GET    /workflows/5/steps               -- Returns all steps in workflow #5
GET    /workflows/5/steps/2             -- Returns a single step (#2)
POST   /workflows/5/steps               -- Creates a new step in workflow #5
PUT    /workflows/5/steps/2             -- Updates step #2 (e.g. reorder, retitle)
DELETE /workflows/5/steps/2             -- Deletes step #2

TASKS  (a task belongs to a step)
GET    /workflows/5/steps/2/tasks       -- Returns all tasks in step #2
GET    /workflows/5/steps/2/tasks/9     -- Returns a single task (#9)
POST   /workflows/5/steps/2/tasks       -- Creates a new task in step #2
PUT    /workflows/5/steps/2/tasks/9     -- Updates task #9 (e.g. toggle completed)
DELETE /workflows/5/steps/2/tasks/9     -- Deletes task #9
```

**Design notes:**
- The nesting in the URL is the parent-child relationship made visible.
- Convention: nest for collection reads/creates where you need parent context, but flatten single-item ops to the global id (`PUT /tasks/9`) since the id is already unique.
- `PATCH /tasks/9` is the more honest verb for a single-field change like toggling `completed` (`PUT` implies replacing the whole resource).

---

## Exercise 4 — Error Handling

- **`/posts/99999`** (JSONPlaceholder): returns an empty object `{}` with a **200** status, not a 404.
- **Fake GitHub user:** returns **404** with `"message": "Not Found"`.
- **Lesson:** getting a body back does not mean it worked. Check the status code, not just whether data showed up.

### Status Code Reference Card
```
200 OK            -- Worked. Here's your data.
201 Created       -- Worked, and a new thing was made (usual reply to a POST).
400 Bad Request   -- Your request was malformed. Bad syntax, missing field, junk body.
401 Unauthorized  -- I don't know who you are. Not logged in / no valid token.
403 Forbidden     -- I know who you are, and you still can't have this.
404 Not Found     -- That resource doesn't exist (or the URL is wrong).
500 Server Error  -- The server broke on its end. Nothing you did wrong.
```

**Mental model:** the first digit tells you who's at fault. **4xx = client's fault**, **5xx = server's fault**. 401 vs 403: 401 is "who are you?", 403 is "I know who you are and the answer is still no."

---

## Exercise 5 — Public API for the Project

- **API name / URL:** GitHub REST API, `https://api.github.com/repos/{owner}/{repo}/commits`
- **What data it provides:** repo metadata, commit history, pull requests, issues, contributors
- **How it's useful:** turn a repo's commit history into an auto-generated workflow timeline (commit message to step, date to ordering, author to who did it)
- **Issue hit:** unauthenticated rate limit of 60 requests/hour returns a **403**; fix with a personal access token (5,000/hr)

### Response shape (commits)
```json
{
  "sha": "a1b2c3d...",
  "commit": {
    "author": { "name": "Phillip", "date": "2026-06-01T14:22:00Z" },
    "message": "Add task toggle with optimistic update"
  },
  "author": { "login": "philay3" },
  "html_url": "https://github.com/philay3/.../commit/a1b2c3d"
}
```

### Fetch
```javascript
// Pull the 5 most recent commits for a repo
fetch("https://api.github.com/repos/philay3/nyc-311-data-story/commits?per_page=5", {
  headers: {
    // Authorization: "Bearer YOUR_TOKEN_HERE"  // raises limit to 5,000/hr
  }
})
  .then((res) => res.json())
  .then((commits) => {
    commits.forEach((c) => {
      console.log(c.commit.author.date, "-", c.commit.message);
    });
  })
  .catch((err) => console.log("Error:", err));
```

**Architecture note:** the token must never live in the front-end (the client is untrusted; anything on it can be read). Call GitHub from the Express backend, keep the token server-side, and have the React front-end ask its own server. That also avoids CORS issues.

---

## Peer Activity — Restaurant Analogy

- **Customer** = front-end
- **Kitchen** = back-end
- **Waiter** = HTTP
- **Order** = request; you request from the API endpoints, HTTP carries the request to the back-end, the back-end sends a response back.
- **200** = OK, everything is fine.
- **404** = the thing you asked for doesn't exist (it's not on the menu). (A broken kitchen is a 500.)
- **JSON** = the format the data is written in, the shared language on both the order and the plate. It is not the menu; the menu is the endpoints.
