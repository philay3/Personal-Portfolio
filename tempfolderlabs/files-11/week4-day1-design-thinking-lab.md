# Week 4 · Day 1 — Design Thinking Workshop (Lab Work)

Completed lab record covering Exercises 1–5. App: Fullstack Visualizer (Phase 2 project).

---

## Exercise 1 — Problem Brainstorm

**Problem 1:** Developers lose track of multi-step technical processes they run over and over.
- Who: developers and bootcamp learners running repeatable setups (deploys, environment setup, debugging routines)
- How often: every time they run the process, often several times a week
- Current workaround: rebuilding the steps from memory, scattered READMEs, sticky notes

**Problem 2:** Job seekers lose track of where they stand across dozens of applications.
- Who: people in an active job search (bootcamp grads applying to many roles at once)
- How often: daily during the search
- Current workaround: a messy spreadsheet, memory, scanning old emails

**Problem 3:** Everyday users have no idea what data a website is collecting on them.
- Who: privacy-conscious web users
- How often: every site visit
- Current workaround: guessing, generic privacy advice

---

## Exercise 2 — Stress Test + Problem Statement

Problem 1 survived the stress test: specific "who" (developers), real cost (lost time, skipped steps, broken deploys), buildable in weeks, and differentiated from generic to-do apps.

> **Developers who run the same multi-step technical processes repeatedly** struggle with **losing their place and skipping steps** because **those processes live scattered across memory, READMEs, and notes instead of one structured place**, and right now they deal with it by **rebuilding the checklist from memory every time**.

---

## Exercise 3 — User Stories to Features

| User Story | Feature |
|---|---|
| As a developer, I want to save a repeatable process as a step-by-step workflow so that I run it the same way every time | Create workflows with steps and tasks (CRUD) |
| As a developer, I want to check off tasks as I work so that I always know what's done and what's left | Task toggle + progress |
| As a developer, I want to pin my most-used workflows so that I can reach them instantly | Pin / favorite |
| As a developer, I want workflows sorted by most recently worked on so that I can pick up where I left off | `updated_at` sorting |
| As a developer, I want to import a repo's recent commits as workflow steps so that I can turn real activity into a process | GitHub API integration |
| As a developer, I want my workflows private to my account so that other users can't see them | Auth + per-user scoping |

---

## Exercise 4 — Feature Prioritization + MVP

| Must Have (MVP) | Nice to Have | Later |
|---|---|---|
| Create/edit workflows with steps and tasks | Pin workflows | GitHub commit import |
| Check off tasks + see progress | Sort by recently worked on | HTTP log visualizer panel |
| User accounts + per-user scoping | Reorder steps (`position`) | Analytics / impact dashboard |

> **My app:** Fullstack Visualizer, a workflow tracker for repeatable technical processes
> **Problem:** developers lose track of multi-step processes they run repeatedly
> **MVP features:**
> 1. Create workflows with steps and tasks (full CRUD)
> 2. Check off tasks with progress tracking
> 3. User accounts with per-user scoping (auth)

Auth is a hard MVP requirement: this is being deployed for real users, so accounts and per-user data isolation ship on day one, not as a fast-follow.

---

## Exercise 5 — AI-Assisted Competitive Research

Real tools (searched, not assumed):

- **Process Street** — no-code workflow builder for recurring processes (approvals, onboarding, scheduling) aimed at small tech/ops/service teams. Strong at team SOPs without a developer. Missing: built for business ops, no code or git awareness.
- **Manifestly** — 100% focused on recurring SOPs and checklists, with assigned runs, deadlines, reminders, and audit history. Strong recurring focus. Missing: team/compliance oriented, heavier than a solo dev needs.
- **CheckFlow** — no-code drag-and-drop builder for recurring processes, with conditional logic and steps that block until prior ones are done. Strong automation. Missing: business-process framing, subscription SaaS, nothing dev-native.
- **General PM tools (Trello, Asana, Notion)** — flexible, but focused on one-off projects rather than recurring workflows, so repeatability is bolted on with templates.
- **Simple to-do apps (Todoist, Procedural)** — lightweight repeatable checklists, but no workflow→step→task structure and no developer integration.

> **Existing solution 1:** Process Street. Does well: no-code recurring team workflows. Missing: not built for developers or code.
> **Existing solution 2:** CheckFlow. Does well: automated, structured checklists with enforced order. Missing: business-ops framing, paid SaaS, no git tie-in.
> **My opportunity:** a lightweight, developer-native workflow tracker that turns repeatable technical processes into checklists and can pull a repo's commit history straight into steps, instead of the business-ops, no-code SaaS angle every competitor takes.

**The gap:** every competitor is built for operations teams running business SOPs. None are developer-first, and none touch the codebase. The commit-import idea is the wedge.

---

## Peer Activity — Verbal Mini-Demo (Phase 2 gate prep)

Be ready to deliver in 2 minutes:
- Who has the problem: developers running repeatable multi-step technical processes
- What the pain looks like: losing their place, skipping steps, rebuilding from memory each run
- Why it matters: lost time and broken deploys from missed steps
- Current workaround: scattered READMEs, sticky notes, memory
