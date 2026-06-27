# Phil Anthony — Personal Portfolio 🌐

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)

My personal portfolio site built using the Next.js App Router, styled with Tailwind CSS v4, and written in TypeScript. Deployed live at **[philanthony.dev](https://philanthony.dev/)**.

---

## ✨ Features

* **Premium Ledger Aesthetic:** Designed with a curated **Balsam & Cedar** warm-paper ledger look (warm cream backgrounds, deep cedar/forest-green text, and brick-red emphasis/hover highlights).
* **Scroll Spy Navigation:** Responsive navigation bar that highlights the current page section dynamically as the user scrolls, using the `IntersectionObserver` API.
* **Featured Projects Showcase:** Highlighted cards for core fullstack systems:
  * **[Legal Prospector](https://legal-prospect.vercel.app):** A ZIP code lookup and LLM-grounded company scraper pipeline.
  * **[Workflow Visualizer](https://github.com/philay3/Workflow-Visualizer):** A task/step tracking UI with parallel-fetch logging.
  * **[Digital Footprinter](https://kttjdtttsc-jpg.github.io/):** A terminal-styled browser header inspector.
* **Polished Screenshot Gallery:** A landscape-optimized layout displaying core application workflows and mockups cleanly.
* **Static `/labs` Subsite Integration:** Serves the bootcamp learning log archive dynamically under `/labs/` out of the static `public/labs/` subdirectory.

---

## 🛠️ Project Structure

```
Personal-Portfolio/
├── app/
│   ├── favicon.ico
│   ├── globals.css         # Tailwind v4 theme configurations & styling layers
│   ├── layout.tsx          # Main HTML wrap, Google Fonts (Fraunces & Inter)
│   └── page.tsx            # Main Single Page App (Bio, Projects, Substack, Gallery)
├── public/
│   ├── images/             # UI screenshots & assets
│   └── labs/               # The legacy static HTML/CSS/JS learning log subsite
├── legacy-portfolio/       # Backup copies of the original portfolio files
├── package.json            # Scripts & project dependencies
├── next.config.ts          # Next.js bundler settings
├── tsconfig.json           # Type mapping configurations
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org) (v18+) installed.

### Setup and Run

1. Clone this repository:
   ```bash
   git clone https://github.com/philay3/Personal-Portfolio.git
   cd Personal-Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the local copy.

---

## 👤 Author

* **Phil Anthony**
* **GitHub:** [@philay3](https://github.com/philay3)
* **LinkedIn:** [phillip-anthony-75280778](https://www.linkedin.com/in/phillip-anthony-75280778/)
* **Substack:** [philanthony3](https://substack.com/@philay3)