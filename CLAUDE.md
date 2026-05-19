# Personal Portfolio + Next Chapter Labs - Project Handoff

This file is the project context for any Claude session working on this repo. Read it on startup.

## Where I am

This repo is my personal portfolio site at **philanthony.dev**, plus the **Next Chapter Labs** subsite at **philanthony.dev/labs/**. Both live in this single repo and deploy from the same Vercel project.

Working through the Next Chapter AI Augmented Builder Bootcamp. Through Week 4 Day 1 as of May 18, 2026. ~71 labs migrated to markdown.

Primary work environment: Claude Code in a Kali VM. This file is the project context.

## Working style

- Prompt-driven, section by section. I drive, you guide.
- **Don't pile on options or questions.** When I say "let's do all the labs," do it in one shot. Don't ask whether to do l1 first then check in. Read the room for "user wants progress" mode vs "user wants to deliberate" mode.
- **One clarifying question max per turn**, and only when truly blocked. If a reasonable default exists, take it and note it in passing.
- Structure first, styling second.
- Frequent git commits with clear messages after each chunk.
- Brief notes on design choices alongside the code.
- Repeat git commands so they stick.
- **No em dashes anywhere.** Real hyphens are fine.
- Apply established accuracy cleanups to lab writeups automatically (see below). Don't ask permission each time.

## Repos and where things live

- **This repo:** philay3/Personal-Portfolio, deployed on Vercel at philanthony.dev.
- **Labs subsite:** lives as `/labs` subfolder inside this repo. Same Vercel deploy. Served at philanthony.dev/labs/.
- **Old `philay3/next-chapter-labs` repo:** deleted.
- **Old `philay3/philay3.github.io` repo:** scrapped notebook attempt, not active.
- **Digital Footprinter project (linked from portfolio):** kttjdtttsc-jpg/kttjdtttsc-jpg.github.io, on GitHub Pages.

## Two separate style.css and script.js files - important

This repo has TWO of each:

```
Personal-Portfolio/           (deploys to philanthony.dev)
├── index.html                ← philanthony.dev homepage
├── style.css                 ← PORTFOLIO styles (Balsam & Cedar, hero, projects grid)
├── script.js                 ← PORTFOLIO scroll spy (Intersection Observer)
├── images/
└── labs/                     ← deploys to philanthony.dev/labs/
    ├── index.html            ← labs site shell
    ├── style.css             ← LABS styles (tree, lab body)
    ├── script.js             ← LABS tree/markdown rendering
    ├── labs.js               ← Week/day/lab index
    └── content/              ← Markdown files, one per lab
```

Portfolio's `script.js` is the scroll spy. Labs' `script.js` is tree rendering. Completely different purposes. There's been a near-miss where labs `script.js` got copied over the portfolio `script.js`, breaking scroll spy with a `tree.addEventListener` null error. Watch for it on both files.

## Design tokens

Balsam & Cedar palette, used in BOTH the labs site and the portfolio homepage:

- `--color-bg: #f5f0e6` (warm cream)
- `--color-bg-alt: #ebe3d0`
- `--color-text: #1f2d22` (deep green-black)
- `--color-text-muted: #5c5247`
- `--color-accent: #2d4a37` (cedar green, hover states)
- `--color-accent-warm: #a87f4f`
- `--color-emphasis: #a8312a` (brick red, links and active nav)
- `--color-border: #d4c9b3`

Fonts:
- **Fraunces** for headings (Google Fonts)
- **Inter** for body (Google Fonts)
- **ui-monospace** for code

Spacing (consolidated into custom properties):
- `--space-xs: 0.5rem`
- `--space-sm: 1rem`
- `--space-md: 1.5rem`
- `--space-lg: 3rem` (Projects, Articles, Gallery sections)
- `--space-xl: 5rem` (Biography section as hero)

Layout:
- Portfolio: `--max-width: 1100px`, ONE responsive breakpoint at 700px
- Labs: `--max-width: 1400px`, `--sidebar-width: 280px`, also 700px breakpoint

Real BEM class names (writeups from previous Claudes often invent classes like `.biography-section`, `.nav-links` which DO NOT exist). The real ones:
- `.biography`, `.projects`, `.articles`, `.gallery` (sections)
- `.site-nav`, `.site-nav__links`, `.site-nav__brand` (nav)
- `.project`, `.project__media`, `.project__image`, `.project__title`, `.project__link` (project cards)
- `.article-card`, `.article-card__link`, `.article-card__thumb` (article cards)
- `.site-footer`, `.site-footer__social`, `.site-footer__icon-link` (footer)

## Common previous-Claude inaccuracies to correct on sight

Writeups drafted by earlier Claudes have a recurring pattern of inventing plausible-sounding details that don't match the actual site. When converting a writeup into a lab, audit and fix:

- Class names like `.biography-section`, `.nav-links` → real are `.biography`, `.site-nav__links`
- "Dark background" or "dark, low-saturation" → real bg is warm cream (`#f5f0e6`)
- "Inter only" as typography → real is Fraunces (headings) + Inter (body)
- "Max content width: 800px" → real is 1100px (portfolio) or 1400px (labs)
- "Two breakpoints at 600px and 900px" → real is one at 700px
- "Standardized to 60px section padding" → real is `--space-xl` (5rem) on biography, `--space-lg` (3rem) on others
- `#YOUR_BG`, `#YOUR_TEXT`, `#YOUR_ACCENT` placeholders → replace with `#f5f0e6`, `#1f2d22`, `#a8312a` respectively (or the specific token the context calls for)

Don't ask permission for each fix. Apply them and note briefly at the end ("accuracy cleanups: x, y, z").

## Labs site architecture

- `labs/index.html` — markup shell, includes marked.js CDN
- `labs/style.css` — design tokens, tree, lab body styling
- `labs/script.js` — tree rendering, async fetch + marked.js parsing, friendly error UI on fetch failure. Markdown is the only render path; the old `renderLegacyLab` fallback has been removed.
- `labs/labs.js` — slim index, one line per lab. Contains Weeks 1-3 plus Week 4 Day 1, with TBD placeholders for weeks 4 (after day 1) through 13.
- `labs/content/` — one markdown file per lab, named after the lab id.
- `labs/images/` — screenshots if any

## Lab ID convention

`w{WEEK}d{DAY}l{LAB}` — e.g. `w1d1l1` is Week 1 Day 1 Lab 1. Stable, sortable, easy to deep-link to via URL fragments.

## Markdown lab file format

Files live in `labs/content/{id}.md`. Use `### Heading` for section titles. Standard sections in order: Notes, Code (optional), What I learned. Heavier labs can add custom h3 sections.

Quirks worth remembering:
- HTML tags appearing in prose need to be wrapped in backticks or marked.js parses them as real HTML.
- Tables render unstyled (no CSS rules for them). Convert table-shaped content to bulleted lists for visual consistency.
- Fenced code blocks inside blockquotes can be fragile across markdown parsers. Pull the code outside the blockquote.
- The block quote `>` syntax IS fine for non-code quoted text (e.g. presentation scripts, partner quotes, user stories).

## Calendar mapping

- Week 1: April 27-30, 2026 (Mon-Thu)
- Week 2: May 4-7, 2026 (Mon-Thu)
- Week 3: May 11-14, 2026 (Mon-Thu)
- Week 4: May 18-21, 2026 (Mon-Thu)

## Day titles established

Week 1 (theme: "Foundations"):
- W1D1: Talking to AI
- W1D2: Reading code and better prompts
- W1D3: Sequence, selection, iteration
- W1D4: Structured prompting and judgment

Week 2 (theme: "HTML and CSS"):
- W2D1: HTML and CSS basics
- W2D2: Forms and DOM basics
- W2D3: Debugging
- W2D4: Functions and rendering

Week 3 (theme: "Personal portfolio"):
- W3D1: Scoping and shipping
- W3D2: Build day
- W3D3: Polish and deploy

Week 4 (theme: "Design thinking"):
- W4D1: Design thinking workshop

## Portfolio Projects section: target state

Vertical grid (image + title only, whole card is a clickable link). The change from horizontal carousel to vertical grid was in progress at handoff time and may not yet be live in the repo. Target structure:

```html
<section class="projects" id="projects">
    <h2 class="projects__heading">Projects</h2>
    <div class="projects__grid">
        <article class="project">
            <a href="..." class="project__link" target="_blank" rel="noopener noreferrer">
                <div class="project__media">
                    <img src="..." alt="..." class="project__image">
                </div>
                <h3 class="project__title">Project Title</h3>
            </a>
        </article>
        <!-- repeat per project -->
    </div>
</section>
```

```css
.projects__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--space-md);
}

.project {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.project__link {
    display: block;
    color: inherit;
}

.project__link:hover {
    text-decoration: none;
}

.project__image {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: top;
    border-radius: 8px;
    border: 1px solid var(--color-border);
    transition: border-color 0.15s ease;
}

.project__link:hover .project__image {
    border-color: var(--color-accent);
}
```

If the section still shows the old horizontal carousel behavior, check that:
1. `index.html` has `projects__grid` (not `projects__scroller`)
2. `style.css` has a `.projects__grid` rule (not `.projects__scroller`)
3. `.project` no longer has `flex: 0 0 360px` or `scroll-snap-align: start`

Likely orphan CSS rules from the old detailed-card layout: `.project__description`, `.project__notes`, `.project__stack`, `.project__stack strong`, `.project__ctas`. Don't break anything; safe to delete for tidiness.

## Hosting

Vercel for both the portfolio and the labs subsite. Single Vercel project, deploys from this repo. The `/labs` subfolder gets served at philanthony.dev/labs/ automatically due to Vercel's static file routing.

Optional `vercel.json` at repo root with redirect from `/labs` to `/labs/` (not currently in place):

```json
{
  "redirects": [
    { "source": "/labs", "destination": "/labs/", "permanent": true }
  ]
}
```

## What's pending

1. **Verify the projects section is rendering as a vertical grid** (carousel → grid change was being applied at handoff time).
2. **Add Week 4 Day 2-4 content** as those days happen. Same conversion pattern: minimal index entries in `labs/labs.js`, full content as markdown files in `labs/content/`.
3. **Add later weeks (5-13)** as they happen. Update placeholders in `labs/labs.js`.

## File naming notes

- Portfolio's Next Chapter Labs project image is `images/nextchaplabs.png` (no hyphens), NOT `images/next-chapter-labs.png`.
