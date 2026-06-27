# Week 5 · Day 1 — Node.js + TypeScript Basics (Lab Work)

Completed lab record covering Exercises 1–7, with concept explainers (sync vs async, JSON.parse, optional fields) and exit ticket notes.

---

## Exercise 1 — Hello Node

```javascript
// Variables
const firstName = "Phil";
const age = 35;
const city = "Philadelphia";

// Math
const birthYear = 2026 - age;

// String building
const intro = "My name is " + firstName + " and I was born in " + birthYear + " in " + city + ".";

// Conditional (check the exact-18 case first, then the general adult case)
if (age === 18) {
  console.log(firstName + " just became an adult.");
} else if (age >= 18) {
  console.log(firstName + " is an adult.");
} else {
  console.log(firstName + " is a minor.");
}

// Loop
console.log("Counting to 5:");
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

**Fix applied:** `==` upgraded to `===`. Always use strict equality — `==` does type coercion (`"18" == 18` is true), a classic bug source.

---

## Exercise 2 — npm Init + dayjs

**package.json answers:** name = `date-project`, main = `index.js`, no dependencies yet (until `npm install dayjs` adds the `dependencies` section, the `node_modules` folder, and `package-lock.json`).

```javascript
import dayjs from 'dayjs';

const today = dayjs().format("MMMM D, YYYY");
console.log("Today is: " + today);

const dayOfWeek = dayjs().format("dddd");
console.log("It's " + dayOfWeek + "!");

const endOfYear = dayjs("2026-12-31");
const daysLeft = endOfYear.diff(dayjs(), "day");
console.log("Days left in 2026: " + daysLeft);

const futureDate = dayjs().add(30, "day").format("MMMM D, YYYY");
console.log("30 days from now: " + futureDate);

// Modifications
const birthday = dayjs("2027-04-18");
console.log("My next birthday is on a " + birthday.format("dddd") + ".");

const startOfYear = dayjs("2026-01-01");
console.log("Days since January 1, 2026: " + dayjs().diff(startOfYear, "day"));

console.log("100 days from now: " + dayjs().add(100, "day").format("MMMM D, YYYY"));
```

---

## Exercise 3 — Build a Module

`utils.js` exports: `calculateTip`, `toCelsius`, `toFahrenheit`, plus the two additions `formatCurrency` and `toLetterGrade` (the lab's `getGrade`, renamed). All JSDoc-commented. `app.js` imports all five and exercises them (tip calculator, temperature conversions, currency formatting, letter grades 95→A through 55→F).

Key pattern: small files with focused exported functions, imported where needed — how real projects are organized.

---

## Exercise 4 — Read Someone Else's Code

**Predictions (all correct):**
- `readFileSync` — synchronously reads a file's entire content into memory, blocking until done (see explainer below)
- `JSON.parse(raw)` — converts the JSON text string into a real JavaScript object (see explainer below)
- `"=".repeat(30)` — a string of 30 equals signs (a divider line)
- `totalProjects` = 14, average = 14/4 = **3.5**

**Surprise noted:** where the `repeat` divider landed in the output.

**Modifications:** added Lina (Backend, 6 projects) to `data.json`, and a top-member tracker:

```javascript
let topMember = data.members[0];          // seed with the first member

for (const member of data.members) {
  // ...existing display + total...
  if (member.projects > topMember.projects) {
    topMember = member;                   // challenge the champion each row
  }
}
console.log("Most projects: " + topMember.name + " (" + topMember.projects + ")");
```

### Explainer: synchronous vs asynchronous

**Synchronous (blocking):** the program stops on that line until the work finishes. `readFileSync` freezes everything until the whole file is read; the next line is guaranteed to have the data.

**Asynchronous (non-blocking):** the `fetch` pattern — kick off the work, get a pending promise immediately, keep moving, handle the result when it arrives.

Why sync exists: in a small CLI script, blocking is fine and simpler — nothing else needs to happen while waiting. Where it's forbidden: **servers**. If an Express handler called `readFileSync`, every other user's request would freeze waiting on that one disk read. Rule of thumb: sync in scripts, async in request handlers.

### Explainer: JSON.parse

`readFileSync` returns one giant **string** — the literal characters of the file. Strings have no `.team` property. `JSON.parse(raw)` reads that text and **builds the real object it describes**; after parsing, `data.team` and the loop work because it's an actual object.

Connections: `response.json()` from the API lab is the same operation (text in, object out), async version. The mirror twin is `JSON.stringify(obj)` (object → text) for *sending* JSON. Parse to receive, stringify to send.

---

## Exercise 5 — Build a CLI Tool (Quiz Game)

Built the 5-question terminal quiz with score tracking and tiered final messages.

**War story (worth keeping):** `prompt-sync` is written in CommonJS, so the ESM `import promptSync from "prompt-sync"` errored. Fix: bridge into CommonJS with `createRequire`:

```javascript
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const prompt = require("prompt-sync")();
```

Second error: a stray `"type": "module"` had ended up in the package.json *inside the prompt-sync folder itself* — removed it. Real ESM-vs-CommonJS friction, diagnosed and fixed. This comes up again in real projects.

---

## Exercise 6 — Convert JS to TypeScript

```typescript
// Step 4 — every parameter AND the return value annotated
function calculateBill(price: number, taxRate: number, tipPercent: number): number {
  const tax = price * taxRate;
  const tip = price * (tipPercent / 100);
  const total = price + tax + tip;
  return total;
}

console.log(calculateBill(500, 0.08, 20));

// Step 5 — string parameters required because the body calls last.toUpperCase()
function formatName(first: string, last: string): string {
  return last.toUpperCase() + ", " + first;
}

console.log(formatName("Phil", "Anthony")); // "ANTHONY, Phil"

// Step 6 stretch
function isAdult(age: number): boolean {
  if (age >= 18) {
    return true;
  } else {
    return false;
  }
}

console.log(isAdult(3)); // false
```

**Fix applied:** return annotations (`: number`, `: boolean`) added — TypeScript infers them, but the exercise (and good practice on exported functions) wants them explicit. The `formatName` parameter types aren't decoration: they protect the `.toUpperCase()` call from ever receiving a non-string.

---

## Exercise 7 — Read AI-Generated TypeScript

**Step 2 answers (graded):**

1. `type Student = { ... }` creates **a type only — no object, no data**. It's a stencil/shape definition. Objects come into existence at lines like `const alex: Student = {...}`. Fields: `id` number, `name` string, `grades` array of numbers, `honors` optional boolean.
2. The `?` marks `honors` optional — present or absent, both valid. ✓
3. `student` is typed `Student`; the function **returns `number`** (the `: number` after the parens — the question asked for both halves).
4. The ternary: when `honors` is true → `" (Honors)"`; when `undefined` → `undefined` is *falsy*, so it takes the `""` branch. The optional field and the ternary work as a pair. ✓
5. `const alex: Student` declares the type — "check this object against the Student stencil here." ✓

### Explainer: why a missing field does (or doesn't) throw

Calling `listBook({ title: 'Dune', author: 'Herbert', pages: 600 })` without `isAvailable` is **fine — no error** — because `isAvailable?: boolean` is optional; the object satisfies every *required* field.

Delete the `?` (making it required) and the same call errors: "Property 'isAvailable' is missing." Crucially, that's a **compile-time error** — the red squiggle; the code never runs at all. That's TypeScript's whole pitch: shape violations die before runtime. Plain JavaScript would run it and crash later when something touched the missing field. Inside the function, an absent optional field's value is `undefined` — which is exactly what the ternary handles.

---

## Exit Tickets — reference answers

- **Node.js:** a runtime that runs JavaScript outside the browser (on your computer/server) — same language, new environment, which is what makes back-ends in JS possible.
- **npm:** the package manager — installs and tracks other people's code (packages) so you don't rebuild everything from scratch; solves dependency management.
- **package.json:** the project's manifest — tracks (among others) the project name, version, dependencies, scripts, and module type.
- **double/shout output:** `14` then `HELLO!!!`
- **TypeScript:** JavaScript plus type annotations, compiled down to plain JS; projects use it to catch shape/type bugs at compile time instead of runtime.
- **discountPrice annotated:**
  ```typescript
  function discountPrice(price: number, percentOff: number): number {
    return price - (price * percentOff / 100);
  }
  ```
- **Book questions:** fields title/author/pages/isAvailable (optional, shown by the `?`); `listBook` takes a `Book` and returns a `string`; yes — callable without `isAvailable` because optional fields may be absent (see explainer above).
