# Week 4 · Day 3 — Databases (Lab Work)

Completed lab record covering Exercises 1–5, the AI schema review, and edge-case decisions. Final schema also lives in `workflow-app-schema.xlsx`.

---

## Exercise 1 — Read a Database Diagram

Blog schema: `users`, `posts`, `comments`.

1. **Tables:** 3
2. **PK of posts:** `id`
3. **Posts → users:** `posts.user_id` (FK) → `users.id` (PK)
4. **Comments → posts:** `comments.post_id` (FK) → `posts.id`
5. **New post by user #2:** `{ id: 42, title: "My Database Journey", body: "...", published_at: "2026-06-10", user_id: 2 }`
6. **Comment by user #1:** `{ id: 89, body: "Great post!", created_at: "...", post_id: 42, user_id: 1 }`
7. **Post → many comments:** Yes. Multiple comment rows can share the same `post_id`.
8. **Comment → many posts:** No. Each comment row holds one `post_id`, so one parent.

**Concept:** 7 and 8 together are a **one-to-many** relationship (one post, many comments).

---

## Exercise 2 — Design Your App's Tables

**App:** Fullstack Visualizer. **Resources:** `users`, `workflows`, `steps`, `tasks` (after going multi-user).

Two one-to-many relationships chained: a user has many workflows, a workflow has many steps, a step has many tasks. The FK chain (`tasks.step_id` → `steps.id` → `workflows.id` → `users.id`) mirrors the nested API URL `/workflows/5/steps/2/tasks/9` from Day 2.

---

## Exercise 3 — AI-Assisted Schema Review

Reviewed against the inferred user stories (create workflows with ordered steps, check off tasks, pin workflows). Decisions made:

- **Multi-user:** accepted. App should support multiple users, so a `users` table was added and `workflows` got a `user_id` FK.
- **Timestamps:** accepted. Added `updated_at` on workflows (for "most recently worked on" sorting) and `completed_at` on tasks (for "what did I finish" queries).
- **Indexes:** accepted. Index the foreign keys, especially `workflows.user_id`, which is queried on every dashboard load.
- **Authorization scoping:** every workflow query must filter by `user_id` (`WHERE user_id = ?`) to prevent IDOR. The `user_id` column lets the front-end ask; the server decides what it can see (the Day 2 trust boundary).

---

## Final Schema (multi-user)

| Table | Column | Type | Key | Nullable | Default | Notes |
|---|---|---|---|---|---|---|
| users | id | INTEGER | PK | NO | auto | |
| users | email | TEXT | | NO | | UNIQUE, blocks duplicate signups |
| users | password_hash | TEXT | | NO | | Hash, never plaintext |
| users | name | TEXT | | YES | | Optional |
| users | is_deleted | BOOLEAN | | NO | false | Soft delete flag |
| users | created_at | TIMESTAMP | | NO | now | |
| workflows | id | INTEGER | PK | NO | auto | |
| workflows | user_id | INTEGER | FK | NO | | → users.id (owner) |
| workflows | name | TEXT | | NO | | |
| workflows | pinned | BOOLEAN | | NO | false | |
| workflows | created_at | TIMESTAMP | | NO | now | |
| workflows | updated_at | TIMESTAMP | | NO | now | Bump on any change |
| steps | id | INTEGER | PK | NO | auto | |
| steps | workflow_id | INTEGER | FK | NO | | → workflows.id |
| steps | name | TEXT | | NO | | |
| steps | position | INTEGER | | NO | | Preserves order |
| steps | created_at | TIMESTAMP | | NO | now | |
| tasks | id | INTEGER | PK | NO | auto | |
| tasks | step_id | INTEGER | FK | NO | | → steps.id |
| tasks | text | TEXT | | NO | | |
| tasks | complete | BOOLEAN | | NO | false | |
| tasks | completed_at | TIMESTAMP | | YES | null | Set when complete flips true |
| tasks | created_at | TIMESTAMP | | NO | now | |

---

## Exercise 4 — Peer Review Round 2

1. **Find a user's pinned workflows:** `workflows` table, filter `WHERE user_id = ? AND pinned = true`. (The `user_id` scope is required, not just `pinned`.)
2. **Workflows by most recently worked on:** Yes, `ORDER BY updated_at DESC`.
3. **Checking off a task:** No row is created. The task row is **updated**: `complete` flips false→true and `completed_at` is set to a timestamp. The parent workflow's `updated_at` should also be bumped so the "recently worked on" sort reflects the action.

---

## Exercise 5 — Edge Cases

- **Account deletion:** Soft delete. Set `users.is_deleted = true`; keep all workflows, steps, and tasks.
- **Duplicate email:** Prevented by the UNIQUE constraint on `users.email`. The database rejects the second insert and the app turns the error into "email already taken." No manual check needed.
- **Required vs optional:** NOT NULL on all ids, all FKs, `email`, `password_hash`, names, task `text`, the boolean flags (with defaults), and `created_at`. Nullable: `users.name` and `tasks.completed_at`.

---

## Remaining (Phase 2 gate, verbal component)

Verbal mini-demo: point at a foreign key, name the two tables it connects, and state the user story that breaks without it. Practice with `tasks.step_id` → `steps.id` (without it, a task has no parent step and the whole nested checklist falls apart).
