const labsData = [
    {
        week: 1,
        title: "Foundations",
        days: [
            {
                day: 1,
                title: "Talking to AI",
                labs: [
                    {
                        id: "w1d1l1",
                        title: "Ask AI a curious question",
                        date: "April 27, 2026",
                        notes: "First exercise of the bootcamp. Prompted an AI with a plain-language curiosity question to see how it handled explanation. Asked: 'explain how a car engine works like I'm 10.' Got an analogy back: four cylinders are like four runners in a relay race, each taking turns pushing the car forward. Air plus gas plus spark equals a tiny explosion that drives the wheels.",
                        code: "",
                        screenshots: [],
                        learned: "Low stakes, high payoff. First time a mechanical concept clicked in 30 seconds. Plain language prompts get plain language back."
                    },
                    {
                        id: "w1d1l2",
                        title: "Ask AI to write something",
                        date: "April 27, 2026",
                        notes: "Asked AI for a 3-sentence bio for socials. The first draft was generic and could have been pasted from any LinkedIn profile. Gave it feedback to be more specific to my background and the second draft came back sharper and more accurate to who I actually am.",
                        code: `v1 (AI first draft):
tech enthusiast pivoting into software development with 7+ years in IT. Passionate about cybersecurity. Always learning, always building.

v2 (after feedback):
IT systems guy turned legal-AI seller, now circling back to code with a focus on security. Seven years breaking and fixing things in healthcare and enterprise IT. I learn out loud.`,
                        screenshots: [],
                        learned: "Loop is prompt, output, feedback, iterate. The first draft from AI is rarely the final one. The value is in the feedback round, not the initial output."
                    },
                    {
                        id: "w1d1l3",
                        title: "Ask AI something it cannot answer",
                        date: "April 27, 2026",
                        notes: "Tested AI on questions where it had no real information to draw from. Asked what color shirt I was wearing (it said navy, I was in gray), what I ate for breakfast (it listed eggs and toast, I had just coffee), and who was in my class right now (it made up three plausible-sounding names). Each time it answered confidently while being wrong.",
                        code: "",
                        screenshots: [],
                        learned: "AI does not know things outside its training data. It sounds like it does. The confident-but-wrong mode is the dangerous one. Worth remembering anytime I ship something it wrote."
                    },
                    {
                        id: "w1d1l4",
                        title: "The prediction game",
                        date: "April 27, 2026",
                        notes: "Two parts. Part A: gave AI sentence starters and compared its predictions to my actual answers. 'Best thing about Fridays' for me was leaving work early; AI said 'the weekend on the horizon.' Ran the same prompt three times and got three different completions. Part B: tried to break it on purpose. Asked what year it was (it said 2024, wrong), how many R's are in 'strawberry' (it said 2, wrong, there are 3), and what my middle name is (it made one up).",
                        code: "",
                        screenshots: [],
                        learned: "AI averages and I am specific. The same prompt does not equal the same answer because it samples rather than retrieves. The strawberry letter count fails because the model sees tokens (chunks), not individual characters. Counting letters inside a word is genuinely hard for a token-based model."
                    },
                    {
                        id: "w1d1l5",
                        title: "AI can code",
                        date: "April 27, 2026",
                        notes: "Prompted AI for a simple HTML page with a big blue 'Hello, World!' centered on a light gray background. Pasted it into Replit and it worked. Then read through the code to find where each piece lived (color, font size, text content) and made modifications: changed the color to red, swapped the text to 'Chops,' and added a paragraph below.",
                        code: `<!-- AI's original code -->
<body style="background:#eee; text-align:center;">
  <h1 style="color:blue; font-size:64px;">
    Hello, World!
  </h1>
</body>

<!-- My modifications -->
<body style="background:#eee; text-align:center;">
  <h1 style="color:red; font-size:64px;">
    Chops
  </h1>
  <p>Building, breaking, learning.</p>
</body>`,
                        screenshots: [],
                        learned: "First time writing code by reading and modifying. The skill is identifying where each property lives in the source, not memorizing syntax. Felt like cheating. Also felt like the future."
                    }
                ]
            },
            {
                day: 2,
                title: "Reading code and better prompts",
                labs: [
                    {
                        id: "w1d2l1",
                        title: "Prompt makeover",
                        date: "April 28, 2026",
                        notes: "Took three lazy prompts and rewrote each with specificity. Calculator: bare 'write code for a calculator' became 'vanilla HTML/JS calculator. Two number inputs, +/-/x/division buttons, result display. Dark bg, light buttons. No frameworks.' Result went from pseudocode to runnable. Resume: bare 'help me with my resume' became a paragraph with my real background and target role. Result went from generic tips to tailored advice. Quiz: bare 'make a quiz' became '10-question multiple-choice quiz on JS fundamentals (vars, functions, conditionals, loops). Audience: 1-week bootcamp beginner. Output as HTML, 4 options each, answer key at bottom.' Result went from a vague outline to working HTML.",
                        code: "",
                        screenshots: [],
                        learned: "Pattern: WHO is this for, WHAT exactly, HOW should it look. AI fills in the blanks if I do not. Specificity costs the same tokens but multiplies the value of the output."
                    },
                    {
                        id: "w1d2l2",
                        title: "Reading code AI wrote",
                        date: "April 28, 2026",
                        notes: "Asked AI for a name plus color greeting and read the code before running it. Identified each new piece: prompt() opens a popup that asks the user something and returns whatever they type as a string. const is a variable that cannot be reassigned. Plus with text is concatenation (gluing strings together). Clicking cancel on a prompt returns null, which would display as 'Hello, null!' if not handled.",
                        code: `// AI's code
const name = prompt("What is your name?");
const color = prompt("What is your favorite color?");
const message = "Hello, " + name + "! Your favorite color is " + color + ".";
document.write(message);

// My modification: added a third prompt
const food = prompt("What's your favorite food?");
const message = "Hello, " + name + "! Your favorite color is "
    + color + " and your favorite food is " + food + ".";`,
                        screenshots: [],
                        learned: "Reading first, running second. Easier to spot what each line does when you're not waiting on output. Building the muscle to predict what code will do before clicking run."
                    },
                    {
                        id: "w1d2l3",
                        title: "Peer activity: prompt partners",
                        date: "April 28, 2026",
                        notes: "Paired up with a cohort member. Same task (get AI to write a bio for someone changing careers into tech), different prompts, no peeking. My prompt: 3-sentence bio for someone with 7 years IT background pivoting into junior dev, casual but professional, mention transferable skills. Their prompt: LinkedIn bio for a former teacher with 5 years experience transitioning into front-end dev, show their teaching skills as an asset for tech.",
                        code: "",
                        screenshots: [],
                        learned: "Their result was better. Why: they named the platform (LinkedIn) explicitly and tied the old skills to the new field. I left both implicit. Lesson: spell out the medium and spell out the bridge between past and target."
                    },
                    {
                        id: "w1d2l4",
                        title: "Tip calculator",
                        date: "April 28, 2026",
                        notes: "Traced a tip calculator with bill of 50 and tip of 20%: tip is 50 times (20/100) which is 10. Total is 50 plus 10 which is 60. Then layered three modifications on top: split between 2 people, variable number of people via prompt, and a 'generous tipper' flag if tip is over 20%.",
                        code: `// Base
bill = 50
tipPercent = 20
tip = 50 * (20/100) = 10
total = 50 + 10 = 60

// L1: split between 2
const perPerson = total / 2;
document.write("Each owes: $" + perPerson.toFixed(2));
// 60 / 2 = $30 each

// L2: variable number of people
const people = parseInt(prompt("How many people?"));
const perPerson = total / people;

// L3: generous tipper flag
if (tip > 20) {
    document.write("Generous tipper!");
}`,
                        screenshots: [],
                        learned: "First time stacking modifications on the same program. Each one small, but they compound. Build small, add small, keep working software at every step."
                    },
                    {
                        id: "w1d2l5",
                        title: "Temperature converter",
                        date: "April 28, 2026",
                        notes: "Built a Fahrenheit to Celsius converter, traced it with F = 212 (boiling water) to confirm the math output 100 C. Then made three modifications: flipped the direction (C to F), let the user pick which direction via prompt, and rounded to 1 decimal place with .toFixed(1).",
                        code: `// L1: C to F
const C = parseFloat(prompt("Celsius:"));
const F = (C * 9/5) + 32;
document.write(C + "°C = " + F + "°F");

// L2: user picks direction
const dir = prompt("Convert (1) F→C or (2) C→F?");
if (dir === "1") {
    // F to C math
} else {
    // C to F math
}

// L3: clean output
result.toFixed(1)  // "100.0" not "100.000..."`,
                        screenshots: [],
                        learned: ".toFixed(n) is the move for clean number output. Floats can return ugly long decimals by default."
                    },
                    {
                        id: "w1d2l6",
                        title: "Compliment generator",
                        date: "April 28, 2026",
                        notes: "First time using arrays plus Math.random(). New territory. Walked through the pieces: Math.random() returns a decimal between 0 and 1. Math.floor() rounds down to a whole number. compliments.length tells me how many items are in the array. Multiplying random by length and flooring gives a valid random index. With 5 compliments and a random of 0.7: floor(0.7 * 5) is floor(3.5) is index 3. Then modified to pick two random compliments, then wrapped it in a while loop that runs as long as the user keeps saying yes.",
                        code: `// L2: pick two at random
const i1 = Math.floor(Math.random() * compliments.length);
const i2 = Math.floor(Math.random() * compliments.length);
// might be the same index, that's OK

// L3: keep going while user says yes
let again = "yes";
while (again === "yes") {
    // pick + display compliment
    again = prompt("Want another? yes/no");
}`,
                        screenshots: [],
                        learned: "Arrays plus random plus loop. Three new tools in thirty minutes. The combinations multiply fast once you understand the pieces."
                    }
                ]
            },
            {
                day: 3,
                title: "Sequence, selection, iteration",
                labs: [
                    {
                        id: "w1d3l1",
                        title: "Warm-up: predict the path",
                        date: "April 29, 2026",
                        notes: "Given a chain of if/else if/else statements checking a weather string, predicted what each input would log. With weather of 'rainy' the second branch hits and prints 'Grab an umbrella!' With 'cloudy' it falls all the way to the else and prints 'Check the forecast.' With 'Rainy' (capital R) it ALSO falls to else because === is case sensitive.",
                        code: `const weather = "rainy";
if (weather === "sunny") console.log("Wear sunglasses!");
else if (weather === "rainy") console.log("Grab an umbrella!");
else console.log("Check the forecast.");`,
                        screenshots: [],
                        learned: "=== checks for an EXACT match, including type and case. Same idea as the comparison operators in PowerShell that have bit me before. Strict equality has no surprises but no leniency either."
                    },
                    {
                        id: "w1d3l2",
                        title: "Build with sequence: hourly wage",
                        date: "April 29, 2026",
                        notes: "Asked AI for a weekly pay calculator. Read the code, traced it with $15/hour and 40 hours to confirm $600.00 output. Then modified to subtract 8% in tax for take-home calculation.",
                        code: `const wage = parseFloat(prompt("Hourly wage?"));
const hours = parseFloat(prompt("Hours this week?"));
const pay = wage * hours;
document.write("You earned $" + pay.toFixed(2) + " this week.");

// Modification: 8% tax
const takeHome = pay * 0.92;
document.write("After tax: $" + takeHome.toFixed(2));
// 600 * 0.92 = $552`,
                        screenshots: [],
                        learned: "Order matters. takeHome cannot run before pay exists. That is sequence in one sentence."
                    },
                    {
                        id: "w1d3l3",
                        title: "Build with selection: temperature ranges",
                        date: "April 29, 2026",
                        notes: "Wrote a program that asks for a temperature and prints different messages for different ranges (freezing under 32, chilly through 60, perfect through 80, hot above 80). Traced it with 45 (chilly) and 80 (perfect). Then modified to add an exact-match for 72 as 'the perfect temperature' but had to put that check FIRST or the broader chilly/perfect branches would grab it. Also tried edge cases: a typed word returns NaN which makes every comparison false and falls to the final else.",
                        code: `if (temp === 72) {
    document.write("The perfect temperature!");
} else if (temp < 32) {
    document.write("Freezing!");
} else if (temp <= 60) {
    document.write("Chilly, grab a jacket.");
} else if (temp <= 80) {
    document.write("Perfect weather!");
} else {
    document.write("Hot.");
}`,
                        screenshots: [],
                        learned: "Order of conditions matters as much as the conditions themselves. First match wins. The exact match has to come before the range match or the range match swallows it."
                    },
                    {
                        id: "w1d3l4",
                        title: "Build with iteration: grocery list",
                        date: "April 29, 2026",
                        notes: "Built a 5-item grocery list using an array of objects (name and price), then looped through with a for loop to display each and tally the total. Then modified to apply a 10% discount on items over $5, using selection (an if statement) INSIDE the iteration (the loop).",
                        code: `const items = [
    { name: "Apples", price: 1.25 },
    { name: "Bread", price: 3.50 },
    { name: "Eggs", price: 4.99 },
    { name: "Milk", price: 6.20 },
    { name: "Cheese", price: 5.75 }
];

let total = 0;
for (let i = 0; i < items.length; i++) {
    if (items[i].price > 5) {
        const sale = items[i].price * 0.9;
        document.write(items[i].name + ": was $" + items[i].price
            + ", now $" + sale.toFixed(2));
        total += sale;
    } else {
        document.write(items[i].name + ": $" + items[i].price);
        total += items[i].price;
    }
}
document.write("Total: $" + total.toFixed(2));`,
                        screenshots: [],
                        learned: "Selection INSIDE iteration. The loop hits every item, the condition decides what to do with each one. First time these patterns started feeling like they could combine."
                    },
                    {
                        id: "w1d3l5",
                        title: "Pair exercise: prompt and read swap",
                        date: "April 29, 2026",
                        notes: "Round 1: I gave a partner a prompt I wrote (random song picker) and they read the AI's resulting code without seeing my prompt. They described it as 'makes a list of songs, generates a random number, picks one, shows it on the page.' Nailed it. Round 2: they handed me their code (a string reverser). I guessed it 'loops backwards through a string and builds a new one,' but they had actually used .split() plus .reverse() plus .join() built-ins, not a manual loop.",
                        code: "",
                        screenshots: [],
                        learned: "Reading is faster than writing, but I projected my approach onto their code at first. There's almost always more than one way to solve a problem, and reading other people's code is the fastest way to learn approaches that aren't yours."
                    },
                    {
                        id: "w1d3l6",
                        title: "Bug hunts",
                        date: "April 29, 2026",
                        notes: "Three buggy programs to debug. Bug 1: off-by-one. A loop printing numbers 1-5 actually printed 2, 3, 4, 5, undefined because the index started at 1 instead of 0 and the condition used <= instead of <. Fix: start at 0, use <. Bug 2: the trick. Setup claimed a student scored 85 but the program said they failed. Traced through and the code was actually correct. The setup lied; no bug existed. Trust your trace over the description. Bug 3: missing piece. A shopping list showed items but the total stayed at $0. The loop never added to total. One-line fix inside the loop: total += items[i].price.",
                        code: `// Bug 1: off-by-one
// Broken:
for (let i = 1; i <= numbers.length; i++) {
    document.write("Number: " + numbers[i]);
}
// Fixed:
for (let i = 0; i < numbers.length; i++) {
    document.write("Number: " + numbers[i]);
}

// Bug 3: missing accumulator
// Broken: no update to total inside loop
// Fix:
total += items[i].price;`,
                        screenshots: [],
                        learned: "Arrays start at 0, not 1. Trust your trace, not the description. A loop that does not change anything is just heat. Mutation is the point of a loop, otherwise why are you iterating."
                    },
                    {
                        id: "w1d3l7",
                        title: "Combining sequence, selection, iteration",
                        date: "April 29, 2026",
                        notes: "Final exercise of Day 3. Wrote a program with five students and their scores. Looped through, graded each (90+ is A, 80+ is B, 70+ is C, else needs improvement), counted A's, and averaged the scores. Two A's (Marcus 92, Aaliyah 96), average 83.0. All three patterns in one program: setup (sequence), loop (iteration), grade decision (selection).",
                        code: `const students = [
    { name: "Marcus", score: 92 },
    { name: "Keisha", score: 85 },
    { name: "David", score: 78 },
    { name: "Aaliyah", score: 96 },
    { name: "Ray", score: 64 }
];

let aCount = 0;
let totalScore = 0;

for (let i = 0; i < students.length; i++) {
    const s = students[i];
    totalScore += s.score;
    if (s.score >= 90) { aCount++; /* A */ }
    else if (s.score >= 80) { /* B */ }
    else if (s.score >= 70) { /* C */ }
    else { /* needs improvement */ }
}

document.write("A's: " + aCount);
document.write("Avg: " + (totalScore / students.length).toFixed(1));`,
                        screenshots: [],
                        learned: "First time something felt like a real program instead of an exercise. The three patterns combined naturally: sequence sets things up, iteration walks the data, selection decides what to do with each row."
                    }
                ]
            },
            {
                day: 4,
                title: "Structured prompting and judgment",
                labs: [
                    {
                        id: "w1d4l1",
                        title: "Role prompting",
                        date: "April 30, 2026",
                        notes: "Asked the same question (what is a JS variable) three times with three different roles assigned. No role: got a generic textbook definition, accurate but flat. Patient teacher role: got the 'labeled jar in your kitchen' analogy, 3 sentences, no jargon. Senior tech writer role: got a mini docs page with headers (Definition, Syntax, Example, Common Mistake), and it covered const vs let vs var plus the hoisting gotcha. The writer's was strongest because it included a real bug example.",
                        code: "",
                        screenshots: [],
                        learned: "Role is a filter. Same question, but the role decides what is in scope and how it gets framed. Patient teacher for new concepts. Tech writer for things I am trying to nail down."
                    },
                    {
                        id: "w1d4l2",
                        title: "Constraint prompting",
                        date: "April 30, 2026",
                        notes: "Built an 'About me' page with explicit constraints stacked on the prompt: specific colors, required sections, max line count, mobile-friendly, one external link. AI returned a 47-line page (under the 50-line limit), it rendered correctly in Replit, and it was readable on a phone because max-width plus padding handled the responsive layout. Then I tweaked the colors away from the AI's default navy/amber to deep purple plus mint green to make it feel like mine, and rewrote the goal line to match my actual plan.",
                        code: `<body style="background:#1a1a2e; color:#fff;
    font-family:system-ui; padding:20px;
    max-width:680px; margin:0 auto;">
  <h1 style="color:#f59e0b;">Chops</h1>
  <h2 style="color:#f59e0b;">About</h2>
  <p>IT systems guy, 7+ yrs, pivoting to dev.</p>
  <!-- ... -->
  <a href="https://github.com/philay3">GitHub</a>
</body>`,
                        screenshots: [],
                        learned: "Constraints turn a vague ask into a deliverable. Without them I would have gotten 200 lines of generic Bootstrap junk. With them I got a small, real, modifiable page."
                    },
                    {
                        id: "w1d4l3",
                        title: "System instructions",
                        date: "April 30, 2026",
                        notes: "Wrote three system instructions and tested each. Debug helper: required AI to ask 'what did you expect vs what's happening' before suggesting fixes, never rewrite whole files, point to line numbers. Tested it; AI asked me two questions before answering. App brainstorm: required exactly 5 ideas at a time with target user plus difficulty 1-5, wait for me to pick before expanding any. Stuck to the format, ratings were honest (mostly 4-5). Quiz mode: required quizzing on the week's JS material one question at a time, wait for my answer, then right/wrong plus a 1-sentence explanation. Caught me on === vs ==, the explanation actually landed.",
                        code: `// Debug helper
"You are a JS debugging buddy. Before suggesting fixes, ask
me what I expected vs what's happening. Never rewrite my whole
file, point me to the line(s). Explain errors in plain English
first, jargon second."

// App brainstorm
"Suggest exactly 5 app ideas at a time. For each: target user
(one sentence) + difficulty 1-5. Wait for me to pick before
expanding any."

// Quiz mode
"Quiz me on this week's JS material. One question at a time.
Wait for my answer. Then tell me right/wrong + a 1-sentence
explanation. Move to next question only after I respond."`,
                        screenshots: [],
                        learned: "System instructions set the rules of the game BEFORE the first move. Way more effective than correcting tone or format mid-conversation. Once you have a few good ones written down, they become reusable."
                    },
                    {
                        id: "w1d4l4",
                        title: "Peer activity: context comparison",
                        date: "April 30, 2026",
                        notes: "Same landing-page task, two rounds. Round 1 (bare prompt): 'build a landing page for a small business.' Got a generic stock-photo template with 'Welcome to Our Business' and lorem ipsum. Round 2 (full context): named the business (Paws & Strolls), owner (Marcus), service (dog walking), prices, tagline, colors, primary CTA. Got back a real usable page with the tagline in the hero, prices in a grid, earthy green palette, and a Book-a-Walk button. Nearly every specific detail I gave the prompt showed up in the output.",
                        code: "",
                        screenshots: [],
                        learned: "Specificity in equals specificity out. The bare prompt cost the same tokens but produced 10% of the value. The expensive part of prompting is the thinking, not the typing."
                    },
                    {
                        id: "w1d4l5",
                        title: "Applied judgment: accept, reject, modify",
                        date: "April 30, 2026",
                        notes: "Three judgment calls, all on AI output that looked good on the surface. (A) Cover letter that claimed 'extensive experience' with a stack list (React, Node, PostgreSQL, Python, Java, C++, AWS, Docker, Kubernetes, ML). Rejected; none of that is true for me right now. Rewrote honestly with my real 7 years of IT, current pivot, and vanilla JS work. (B) Optimized prime number function using the 6k+/-1 trick. Rejected with intent to come back; if I cannot explain why i*i <= num works or why we skip multiples of 6, I should not ship it. Asked for the naive O(n) version first. (C) Five food truck app names (TruckTracker, StreetEats, FoodRoamer, BiteBus, RollUp). Modified; googled all 5 and StreetEats was already taken by a NYC food publication. Picked 'Curbside' instead.\n\nThen wrote a decision log for a rebuild of the About Me page. Five decisions total: 3 modifies, 2 rejects, 1 accept. Almost nothing made it through untouched.",
                        code: "",
                        screenshots: [],
                        learned: "Accept/reject/modify is a real workflow, not a checklist. Default for me is modify. The job is being an editor with taste, not a copy-paste machine."
                    },
                    {
                        id: "w1d4l6",
                        title: "Applied judgment: ethics",
                        date: "April 30, 2026",
                        notes: "Three ethics scenarios. (1) Fake resume case: someone let AI invent projects, got an interview, could not walk through the project. The line: AI as ghostwriter is fine, AI as fact-fabricator is not. AI can shape my truth, it cannot invent a new one. (2) Client website you cannot fix: the minimum understanding needed to deliver responsibly is enough to triage when it breaks (what each file does, where state lives, what it depends on, how to read the errors). Not every line, but enough to know which line to look at when something goes wrong. (3) Bias check: asked for 'typical software engineer' vs 'typical nurse.' Engineer came back as male, hoodie, glasses, late 20s, antisocial, coffee. Nurse came back as female, scrubs, warm, caring, mid-30s. The bias comes from the training data (decades of media defaults), and it impacts hiring filters, image generators, recommendation systems.",
                        code: "",
                        screenshots: [],
                        learned: "AI bakes in the average and calls it normal. Worth checking, especially in anything that touches hiring, healthcare, or law. Relevant for legal AI tools like CoCounsel: bias in legal context equals real damage."
                    },
                    {
                        id: "w1d4l7",
                        title: "Peer: explain AI to a non-technical person",
                        date: "April 30, 2026",
                        notes: "Two minutes, no jargon, one analogy, one strength, one weakness. My pitch: AI is autocomplete on steroids. Your phone guesses the next word in a text; AI does the same thing but with a much bigger memory and across paragraphs instead of words. It read most of the public internet, so when you ask it something, it is predicting the most-likely-good answer based on every similar question it has seen. Good at: rewording, summarizing long docs, generating drafts you can edit. Bad at: being sure. It will make things up confidently. Treat it like a fast intern, not an oracle. Partner understood it; flagged 'autocomplete' as a borderline technical term but got the idea; said 'fast intern, not oracle' was the strongest line.",
                        code: "",
                        screenshots: [],
                        learned: "Building this muscle for the Phase 1 verbal gate. The 'fast intern' frame is sticky and accurate, going to keep using it. Being able to explain a tool simply is its own test of whether I actually understand it."
                    }
                ]
            }
        ]
    },
    {
        week: 2,
        title: "HTML and CSS",
        days: [
            {
                day: 1,
                title: "HTML and CSS basics",
                labs: [
                    {
                        id: "w2d1l1",
                        title: "Reading HTML tags",
                        date: "May 4, 2026",
                        notes: "Sent a prompt to ChatGPT asking for a simple HTML page for a community center: heading, description, list of 4 programs, signup link, image placeholder, with comments explaining each section. Then read through every line of the returned HTML and filled in a tag-by-tag reference mapping each tag's purpose and its rendered behavior. Covered the structural tags (DOCTYPE, html, head, title, body) and the content tags (h1, p, ul, li, a, img).",
                        code: `Prompt sent:
Create a simple HTML page for a community center. Include:
- A main heading with the center's name
- A short paragraph describing the center
- A list of 4 programs they offer
- A link to a signup page (use "#" as the URL)
- An image placeholder (use "community.jpg" as the source)
Add a comment explaining what each section does. No CSS yet.

Tag reference:
<!DOCTYPE html>  Tells the browser this is HTML5. Invisible.
<html>           Root element. Invisible container.
<head>           Meta info, CSS links, title. Invisible on page.
<title>          The document name. Appears in browser tab.
<body>           The visible canvas. Holds everything seen.
<h1>             Top-level heading. Large bold text on its own line.
<p>              Paragraph. Normal text with spacing above and below.
<ul>             Unordered list container. Indented block.
<li>             Single list item. Text preceded by a bullet point.
<a>              Anchor / hyperlink. Blue underlined clickable text.
<img>            Image embed. The actual picture on screen.`,
                        screenshots: [],
                        learned: "HTML splits into invisible structure (DOCTYPE, html, head) and visible content (h1, p, img, a). Reading the rendered page next to the source is the fastest way to learn what each tag does."
                    },
                    {
                        id: "w2d1l2",
                        title: "Build a page from scratch in VS Code",
                        date: "May 4, 2026",
                        notes: "First time writing HTML from scratch instead of just reading it. Built an 'About Me' page in VS Code: header with a logo and nav, h1 with my name, a one-line quote paragraph, an image (Shiva as the Lord of Dance), a link to Polymarket, and a 3-item list about my interests in software development.",
                        code: `<!DOCTYPE html>
<html>
    <head>
        <title>About Me</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <header class="site-header">
            <div class="logo">My Page</div>
            <nav>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </nav>
        </header>
        <h1>Phil Anthony</h1>
        <p>Good luck comes with success.</p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Shiva_as_the_Lord_of_Dance_LACMA_edit.jpg/250px-Shiva_as_the_Lord_of_Dance_LACMA_edit.jpg" alt="Shiva as the Lord of Dance">
        <a href="https://polymarket.com/">Polymarket</a>
        <ul>
            <li>I am interested in learning software development.</li>
            <li>I am interested in learning from experienced developers who came before AI.</li>
            <li>I am interested in learning better communication skills.</li>
        </ul>
    </body>
</html>`,
                        screenshots: [],
                        learned: "You can build a real page with surprisingly few tags. Structure plus headings plus text plus links plus images plus lists covers most of what a basic site needs."
                    },
                    {
                        id: "w2d1l3",
                        title: "External CSS stylesheet",
                        date: "May 4, 2026",
                        notes: "Linked an external style.css to the About Me page via <link rel='stylesheet' href='style.css'> in the head. Wrote rules for the basics first: body (teal background, light text, centered with max-width 800px), h1 (amber, centered), paragraphs, links, list items. Then styled the header bar with its own background, padding, rounded corners, plus its logo and nav links.",
                        code: `/* Body: the whole page */
body {
    font-family: Arial, sans-serif;
    background-color: #29837c;
    color: #e0e0e0;
    margin: 0 auto;
    max-width: 800px;
    padding: 40px 24px;
}

/* Main heading */
h1 {
    color: #f59e0b;
    text-align: center;
}

/* Paragraphs */
p {
    font-size: 18px;
    line-height: 1.6;
}

/* Links */
a {
    color: #60a5fa;
}

/* List items */
li {
    margin-bottom: 8px;
}

/* Header bar */
.site-header {
    background-color: #2d2d44;
    padding: 16px 24px;
    border-radius: 8px;
    margin-bottom: 32px;
}

.site-header .logo {
    color: #f59e0b;
    font-weight: bold;
    font-size: 20px;
}

.site-header nav a {
    color: #e0e0e0;
    text-decoration: none;
    margin-left: 32px;
}

.site-header nav a:hover {
    color: #60a5fa;
}`,
                        screenshots: [],
                        learned: "External stylesheets keep HTML and styling separate. One CSS file can style every page in a site. Class selectors (.site-header) let you target specific elements without changing the HTML structure."
                    },
                    {
                        id: "w2d1l4",
                        title: "Flexbox header",
                        date: "May 4, 2026",
                        notes: "Turned the header into a flexbox row to position the logo on the left and the nav on the right. Three properties did all the work: display: flex turns the element into a flex container, justify-content: space-between pushes children to opposite ends, align-items: center vertically centers them on the same baseline.",
                        code: `.site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2d2d44;
    padding: 16px 24px;
    border-radius: 8px;
    margin-bottom: 32px;
}`,
                        screenshots: [],
                        learned: "Display: flex is the modern default for laying things out in a row. Justify-content handles horizontal spacing, align-items handles vertical alignment. Same three-property pattern works for nav bars, card rows, hero sections, anything that needs two things at opposite ends of a line."
                    },
                    {
                        id: "w2d1l5",
                        title: "AI improvements",
                        date: "May 4, 2026",
                        notes: "Asked AI to suggest three small improvements to the page. Got back: a system font fallback for sharper typography on each OS, smooth color transitions on the nav links so the hover state fades instead of snapping, and a max-width constraint on the header so it does not stretch across the full viewport. Each one was 1 to 3 lines of CSS but together they noticeably leveled up the visual quality.",
                        code: `/* 1. Typography: native system font */
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Helvetica, Arial, sans-serif;
}

/* 2. Polish: smooth hover transition on nav */
.site-header nav a {
    transition: color 0.3s ease;
}

/* 3. Spacing: constrain the header width */
.site-header {
    max-width: 800px;
    margin: 0 auto 32px auto;
}`,
                        screenshots: [],
                        learned: "Premium feel comes from a stack of small details, not one big change. System fonts feel native because they ARE native. Transitions soften every state change. Max-width keeps long lines from feeling sloppy on wide screens."
                    }
                ]
            },
            {
                day: 2,
                title: "Forms and DOM basics",
                labs: [
                    { id: "w2d2l1", title: "Build a contact form", date: "May 5, 2026" },
                    { id: "w2d2l2", title: "The Greet Me page", date: "May 5, 2026" },
                    { id: "w2d2l3", title: "Two-question survey", date: "May 5, 2026" },
                    { id: "w2d2l4", title: "AI, build me an interactive thing", date: "May 5, 2026" },
                    { id: "w2d2l5", title: "Counter module styled as a calculator", date: "May 5, 2026" }
                ]
            },
            {
                day: 3,
                title: "Debugging",
                labs: [
                    { id: "w2d3l1", title: "Break your Day 2 page on purpose", date: "May 6, 2026" },
                    { id: "w2d3l2", title: "Read the error", date: "May 6, 2026" },
                    { id: "w2d3l3", title: "Console.log detective", date: "May 6, 2026" },
                    { id: "w2d3l4", title: "DevTools scavenger hunt", date: "May 6, 2026" },
                    { id: "w2d3l5", title: "Fix AI's bugs", date: "May 6, 2026" },
                    { id: "w2d3l6", title: "Describe a bug to AI", date: "May 6, 2026" },
                    { id: "w2d3l7", title: "Debug a multi-file project", date: "May 6, 2026" },
                    { id: "w2d3l8", title: "Peer activity: bug story walkthrough", date: "May 6, 2026" }
                ]
            }
        ]
    },
    { week: 3, title: "TBD", days: [] },
    { week: 4, title: "TBD", days: [] },
    { week: 5, title: "TBD", days: [] },
    { week: 6, title: "TBD", days: [] },
    { week: 7, title: "TBD", days: [] },
    { week: 8, title: "TBD", days: [] },
    { week: 9, title: "TBD", days: [] },
    { week: 10, title: "TBD", days: [] },
    { week: 11, title: "TBD", days: [] },
    { week: 12, title: "TBD", days: [] },
    { week: 13, title: "TBD", days: [] }
];