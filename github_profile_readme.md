# Hi there, I'm Phil Anthony! 👋

### Software Engineer & Data Systems Builder

I build high-performance web applications and robust data pipelines. I specialize in **Next.js**, **React**, **TypeScript**, and **SQL** database design, with a focus on structured data architecture and API enrichment pipelines.

---

## 🛠️ My Tech Stack

| Layer | Technologies |
| --- | --- |
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) |
| **Backend & DB** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) ![SQL](https://img.shields.io/badge/SQL-00758F?style=flat-square) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white) ![SQLite](https://img.shields.io/badge/SQLite-07405E?style=flat-square&logo=sqlite&logoColor=white) ![Prisma ORM](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white) |
| **Developer Tools** | ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) ![Jest/Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white) |

---

## 🚀 Featured Projects

### 🔎 [Legal Prospector](https://legal-prospect.vercel.app)
*A high-yield prospecting engine that turns US ZIP codes into structured, exportable leads.*
* **The Problem:** Google Maps lists firm locations, but misses attorney details, practice areas, and direct emails.
* **The Solution:** Automates Places discovery, visits target websites to scrape content (Tavily/Jina API), and structures data utilizing OpenAI.
* **Key Architecture Choice:** Separates the lookup key (`searchZip`) from the mutable address (`zip`) to prevent cache collisions and Places data overrides. Enforces private routes via HttpOnly session cookies.
* **Stack:** Next.js · React · TypeScript · Neon Postgres · Prisma ORM · OpenAI GPT · Resend

### 📊 [Fullstack Workflow Visualizer](https://github.com/philay3/Workflow-Visualizer)
*A concurrent workflow and checklist tracker with real-time HTTP logging.*
* **What it does:** Allows users to create multi-step procedures (steps + tasks) and monitor browser-server fetch sequences.
* **The Tech Detail:** Employs a custom observer hook in `api.js` to dispatch events (`start`, `end`, `error`) with correlated UUIDs. Pushing workflow steps logs parallel `Promise.all` fetches in real time in a side panel.
* **Stack:** Node.js · Express · SQLite · Vanilla HTML/CSS/JS

### 🛡️ [Digital Footprinter](https://kttjdtttsc-jpg.github.io/)
*A browser fingerprinting explorer demonstrating silent tracking mechanics.*
* **What it does:** Explores what headers, canvas data, and connection configurations your browser exposes passively.
* **Stack:** Vanilla JS · CSS Custom Properties · GitHub Pages

---

## 📝 Writing & Logs

I write about engineering, bootcamp logs, and API learnings:
* ✍️ **Substack:** [How I Got Into the Next Chapter Bootcamp](https://philanthony3.substack.com/p/how-i-got-into-the-next-chapter-ai)
* ✍️ **Substack:** [Rebuilding a Scroll Spy with the Intersection Observer API](https://philanthony3.substack.com/p/rebuilding-a-scroll-spy-with-the)
* 📓 **Next Chapter Labs Journal:** [philanthony.dev/labs](https://philanthony.dev/labs/) (73+ daily technical records)

---

## 📫 Let's Connect

* **Portfolio:** [philanthony.dev](https://philanthony.dev)
* **LinkedIn:** [phillip-anthony-75280778](https://www.linkedin.com/in/phillip-anthony-75280778/)
