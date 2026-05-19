# Next Chapter Labs

A living journal of every lab and exercise from the [Next Chapter](https://www.nextchapterproject.org/) AI Augmented Builder Bootcamp. Deployed at [philanthony.dev/labs](https://philanthony.dev/labs/).

## About

Tree explorer on the left, full writeup on the right. Each lab is a markdown file rendered into the main pane with marked.js. No build step, no framework. Just HTML, CSS, vanilla JS.

Lives as a subfolder of my [personal portfolio repo](https://github.com/philay3/Personal-Portfolio) and deploys to philanthony.dev/labs/ via the same Vercel project.

## Stack

- HTML5
- CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript (tree rendering, async fetch, delegated click handling)
- [marked.js](https://marked.js.org/) via CDN for markdown rendering
- Vercel for hosting

## Structure

```
labs/
├── index.html       Site shell (sidebar tree + main content pane)
├── style.css        Design tokens, tree, lab body
├── script.js        Tree rendering and async lab loading
├── labs.js          Index of weeks, days, and lab metadata
├── content/         One markdown file per lab, named after the lab id
└── images/          Screenshots used in lab writeups
```

## Lab IDs

`w{WEEK}d{DAY}l{LAB}` - e.g. `w1d1l1` is Week 1 Day 1 Lab 1. Stable and sortable.

## Author

Phil Anthony.

[GitHub](https://github.com/philay3) · [LinkedIn](https://www.linkedin.com/in/phil-anthony-270a273a0/) · [Twitter](https://twitter.com/upnupent) · [Substack](https://substack.com/@philay3)