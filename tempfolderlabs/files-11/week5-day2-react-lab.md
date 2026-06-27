# Week 5 · Day 2 — React: Thinking in Components (Lab Work)

Completed lab record covering Exercises 1–5, with interactive lesson results, a deep code-reading trace for Exercise 5, and exit ticket answers.

> **Side task (self-study):** event handling deep dive — how events flow from DOM → handler → state setter, synthetic events, `event.target`, and handler-as-prop patterns. Scheduled as independent practice.

---

## Exercise 1 — Read a React Component (MovieCard)

**Prediction quiz: 5/5.**

1. Props: `title`, `year`, `rating`, `genre`
2. The Matrix `<h2>`: "The Matrix (1999)" — JSX fills in `{title}` and `{year}`
3. `{"*".repeat(rating)}`: `*****` for 5, `**` for 2 — builds a string of n stars
4. `{rating >= 4 && <p>...</p>}`: **short-circuit conditional rendering.** When the left side is false, React renders *nothing at all* — not a hidden element, nothing. Matrix and Toy Story show "Highly Recommended!"; A Bad Movie doesn't.
5. Adding a `director` prop: two places — add `director` to the destructured props `{ title, year, rating, genre, director }` and add `<p>{director}</p>` in the JSX (then pass it at the call site).

---

## Exercise 2 — Build Your First Component (ProfileCard)

Built the card, reused it three times (one component definition, three usages), and completed both mods:

- **Level 1 — `color` prop:** drives `border: "2px solid " + color` so each card gets its own border color from the call site.
- **Level 2 — `skills` badges:** the string→array→elements pipeline:

```jsx
<div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
  {skills.split(",").map((skill) => (
    <span key={skill.trim()} style={{ /* badge styles */ }}>
      {skill.trim()}
    </span>
  ))}
</div>
```

`split(",")` turns `"React, Node, SQL"` into an array; `.map()` turns each item into a `<span>`; React renders the resulting array of elements. Every mapped element needs a `key`. This is THE React list pattern — Exercise 5 is the same pipeline at app scale.

---

## Exercise 3 — State (Counter, Toggle, ColorCounter)

**Trace quiz: 4/4.**

| count | color | message |
|---|---|---|
| 3 | green | "Keep going!" |
| 7 | orange | "Getting warm..." |
| 10 | red | "You made it to 10!" |

- Reset = `setCount(0)` — you never touch the DOM; change the data and React re-renders from the new state.
- **Order of conditions matters when ranges overlap:** `getColor()` checks `count >= 10` FIRST. Written bottom-up, count 12 would match `>= 5` and never reach red. (Same reason Exercise 1's age check tested `=== 18` before `>= 18`.)
- New syntax locked in: ternary `isOn ? "ON" : "OFF"`, boolean flip `!isOn`.

---

## Exercise 4 — Compose Components

Built the Header / Main / Footer / ProfileCard page plus both mods (Header `subtitle` prop; Contact section as its own component slotted between `<Main />` and `<Footer />` in App).

**The composition model:**
- App owns everything — it composes Header, Main, Footer. Top of the tree, source of the data.
- Data flows DOWN through props: App decides `appName`, Header just displays it.
- Main composes three ProfileCards — identical component code, only props differ.
- Footer takes no props — it computes the year itself. Not everything needs props.
- "A new section" = "a new component composed into App," not more JSX stuffed into an existing one. Composing in is the mirror skill of extracting out (StepCard / TaskItem).

---

## Exercise 5 — Favorites List Mini-App

Built with all three mods: retitle (L1), Clear All via `setFavorites([])` (L2), duplicate prevention (L3).

### Deep code-reading trace — how this app actually works

**The mental model: the UI is a projection of state.** The component holds two pieces of state, and everything on screen is computed from them. You never edit the screen; you edit the data and React repaints.

**State — two independent pieces:**

```jsx
const [favorites, setFavorites] = useState([]);   // the list: array of {id, text} objects
const [inputValue, setInputValue] = useState(""); // what's currently typed in the box
```

Each has its own setter. They update independently and React batches the renders.

**The controlled input — state and input box locked together:**

```jsx
<input
  value={inputValue}                                   // box displays state
  onChange={(event) => setInputValue(event.target.value)} // typing updates state
/>
```

Every keystroke: DOM event fires → handler reads `event.target.value` → setter updates state → re-render → box shows the new value. The input never holds its own truth; state does. That loop is called a **controlled component**.

**Adding — trace one click of Add:**

```jsx
const handleAdd = () => {
  if (inputValue.trim() === "") return;        // guard: ignore empty input
  const newItem = { id: Date.now(), text: inputValue.trim() };
  setFavorites([...favorites, newItem]);       // NEW array: old items spread + new one
  setInputValue("");                            // second state update: clear the box
};
```

1. Click fires `onClick={handleAdd}`
2. Guard checks for empty input — if empty, **no setState is called, so nothing re-renders**
3. A new item object is built with a stable unique id (`Date.now()`)
4. `setFavorites([...favorites, newItem])` — the spread operator copies every existing item into a **brand-new array** and appends the new item
5. `setInputValue("")` clears the box
6. One re-render reflects both updates

**Why a new array (immutability):** React detects change by comparing references. `favorites.push(newItem)` mutates the SAME array — same reference — so React sees "nothing changed" and the UI silently fails to update. `[...favorites, newItem]` produces a new reference. Rule: **never mutate state; always produce a new value.** Removal follows the same rule with `.filter()`, which also returns a new array:

```jsx
const handleRemove = (idToRemove) => {
  setFavorites(favorites.filter((item) => item.id !== idToRemove));
};
```

**Props + handler-passing — how the child talks to the parent:**

```jsx
<FavoriteItem
  key={item.id}
  text={item.text}
  onRemove={() => handleRemove(item.id)}
/>
```

`FavoriteItem` receives `text` (data down) and `onRemove` (a function). The child doesn't know how removal works — it just calls `onRemove()` when its X is clicked. The parent owns the state, so the parent owns the logic; the child gets a pre-loaded function with the right `id` already baked in. **Data flows down as props; actions flow up as callback props.** (Flagged for the event-handling side task — this pattern is its centerpiece.)

**Rendering the list — `.map()` + keys:**

```jsx
{favorites.map((item) => (
  <FavoriteItem key={item.id} ... />
))}
```

`.map()` converts the array of data into an array of elements. The `key={item.id}` gives React a stable identity per item so it can tell, when the array changes, which rows were added/removed/kept. A stable id (not the array index) is correct for any editable list — indexes shift when items are removed, which makes React mis-match rows.

**Conditional rendering — the empty state:**

```jsx
{favorites.length === 0 ? <p>No favorites yet...</p> : <ul>...</ul>}
```

A ternary picking between two whole branches of UI based on state.

**Level 3 mod — duplicate prevention:**

```jsx
const isDuplicate = favorites.some(
  (f) => f.text.toLowerCase() === inputValue.trim().toLowerCase()
);
if (isDuplicate) { /* flash the border red */ return; }
```

`.some()` answers "does at least one item match?" — and on a duplicate, no setState is called, so no re-render happens. State unchanged = screen unchanged.

---

## Exit Tickets

**What is a React component?**
A reusable, self-contained function that takes props as input and returns JSX describing a piece of UI. Components compose: big screens are built from small components nested inside each other, and each one re-renders when its props or state change.

**Props vs state, one example of each:**
Props are data passed INTO a component from its parent — read-only from the component's perspective (e.g., `<ProfileCard name="Aisha" />`). State is data the component owns and changes over time, declared with `useState` (e.g., `const [count, setCount] = useState(0)` in the Counter). Rule of thumb: props come from outside, state lives inside.

**`<Greeting name="Priya" excited={true} />` output:**
"Hello, Priya!" as the heading, and — because `excited` is true, the `&&` renders its right side — "Welcome to React!" below it. With `excited={false}` the second line would render nothing at all.

**Counter click, step by step (polished version):**
Clicking fires the `onClick` handler, which calls `setCount(count + 1)`. React schedules a re-render, runs the component function again with the new state value, diffs the new output against the previous virtual DOM, and applies only the minimal changes to the real DOM — the button text updates without rebuilding the page.
*Sharpening:* `count` inside the handler is a snapshot from the current render; `setCount(count + 1)` schedules "snapshot plus one." Calling it twice in one handler still adds only 1 (both calls read the same snapshot) — the fix is the updater form `setCount(c => c + 1)`. Classic interview gotcha.

---

## Interactive lesson scores

- Exercise 1 prediction quiz: **5/5**
- Exercise 3 trace quiz: **4/4**
