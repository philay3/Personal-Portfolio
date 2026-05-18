const labsData = [
    {
        week: 1,
        title: "Foundations",
        days: [
            {
                day: 1,
                title: "Talking to AI",
                labs: [
                    { id: "w1d1l1", title: "Ask AI a curious question", date: "April 27, 2026" },
                    { id: "w1d1l2", title: "Ask AI to write something", date: "April 27, 2026" },
                    { id: "w1d1l3", title: "Ask AI something it cannot answer", date: "April 27, 2026" },
                    { id: "w1d1l4", title: "The prediction game", date: "April 27, 2026" },
                    { id: "w1d1l5", title: "AI can code", date: "April 27, 2026" }
                ]
            },
            {
                day: 2,
                title: "Reading code and better prompts",
                labs: [
                    { id: "w1d2l1", title: "Prompt makeover", date: "April 28, 2026" },
                    { id: "w1d2l2", title: "Reading code AI wrote", date: "April 28, 2026" },
                    { id: "w1d2l3", title: "Peer activity: prompt partners", date: "April 28, 2026" },
                    { id: "w1d2l4", title: "Tip calculator", date: "April 28, 2026" },
                    { id: "w1d2l5", title: "Temperature converter", date: "April 28, 2026" },
                    { id: "w1d2l6", title: "Compliment generator", date: "April 28, 2026" }
                ]
            },
            {
                day: 3,
                title: "Sequence, selection, iteration",
                labs: [
                    { id: "w1d3l1", title: "Warm-up: predict the path", date: "April 29, 2026" },
                    { id: "w1d3l2", title: "Build with sequence: hourly wage", date: "April 29, 2026" },
                    { id: "w1d3l3", title: "Build with selection: temperature ranges", date: "April 29, 2026" },
                    { id: "w1d3l4", title: "Build with iteration: grocery list", date: "April 29, 2026" },
                    { id: "w1d3l5", title: "Pair exercise: prompt and read swap", date: "April 29, 2026" },
                    { id: "w1d3l6", title: "Bug hunts", date: "April 29, 2026" },
                    { id: "w1d3l7", title: "Combining sequence, selection, iteration", date: "April 29, 2026" }
                ]
            },
            {
                day: 4,
                title: "Structured prompting and judgment",
                labs: [
                    { id: "w1d4l1", title: "Role prompting", date: "April 30, 2026" },
                    { id: "w1d4l2", title: "Constraint prompting", date: "April 30, 2026" },
                    { id: "w1d4l3", title: "System instructions", date: "April 30, 2026" },
                    { id: "w1d4l4", title: "Peer activity: context comparison", date: "April 30, 2026" },
                    { id: "w1d4l5", title: "Applied judgment: accept, reject, modify", date: "April 30, 2026" },
                    { id: "w1d4l6", title: "Applied judgment: ethics", date: "April 30, 2026" },
                    { id: "w1d4l7", title: "Peer: explain AI to a non-technical person", date: "April 30, 2026" }
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
                    { id: "w2d1l1", title: "Reading HTML tags", date: "May 4, 2026" },
                    { id: "w2d1l2", title: "Build a page from scratch in VS Code", date: "May 4, 2026" },
                    { id: "w2d1l3", title: "External CSS stylesheet", date: "May 4, 2026" },
                    { id: "w2d1l4", title: "Flexbox header", date: "May 4, 2026" },
                    { id: "w2d1l5", title: "AI improvements", date: "May 4, 2026" }
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
            },
            {
                day: 4,
                title: "Functions and rendering",
                labs: [
                    { id: "w2d4l1", title: "First functions in the console", date: "May 7, 2026" },
                    { id: "w2d4l2", title: "Loop over an array", date: "May 7, 2026" },
                    { id: "w2d4l3", title: "Render a list from an array of objects", date: "May 7, 2026" },
                    { id: "w2d4l4", title: "AI refactor my code", date: "May 7, 2026" },
                    { id: "w2d4l5", title: "Todo list mini-app", date: "May 7, 2026" },
                    { id: "w2d4l6", title: "Peer activity: explain renderTasks", date: "May 7, 2026" },
                    { id: "w2d4l7", title: "Going deeper: localStorage persistence", date: "May 7, 2026" }
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