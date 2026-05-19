// DOM references
const tree = document.getElementById('tree');
const content = document.getElementById('content');

// Render the sidebar tree from labsData
function renderTree() {
    const html = labsData.map(week => `
        <details class="tree__week">
            <summary class="tree__week-label">Week ${week.week}: ${week.title}</summary>
            <ul class="tree__days">
                ${week.days.map(day => `
                    <li>
                        <details class="tree__day">
                            <summary class="tree__day-label">Day ${day.day}: ${day.title}</summary>
                            <ul class="tree__labs">
                                ${day.labs.map(lab => `
                                    <li>
                                        <button class="tree__lab" data-lab-id="${lab.id}" type="button">
                                            ${lab.title}
                                        </button>
                                    </li>
                                `).join('')}
                            </ul>
                        </details>
                    </li>
                `).join('')}
            </ul>
        </details>
    `).join('');
    tree.innerHTML = html;
}

// Find a lab by id, walking weeks and days
function findLab(labId) {
    for (const week of labsData) {
        for (const day of week.days) {
            const lab = day.labs.find(l => l.id === labId);
            if (lab) return lab;
        }
    }
    return null;
}

// Render a lab's writeup by fetching its markdown content
async function renderLab(labId) {
    const lab = findLab(labId);
    if (!lab) return;

    // Mark active in the tree immediately so the click feels responsive
    document.querySelectorAll('.tree__lab').forEach(btn => btn.classList.remove('is-active'));
    document.querySelector(`.tree__lab[data-lab-id="${labId}"]`)?.classList.add('is-active');

    try {
        const response = await fetch(`content/${labId}.md`);
        if (!response.ok) {
            throw new Error(`Failed to load ${labId}.md (status ${response.status})`);
        }
        const markdown = await response.text();
        content.innerHTML = `
            <article class="lab">
                <header class="lab__header">
                    <h2 class="lab__title">${lab.title}</h2>
                    <p class="lab__date">${lab.date}</p>
                </header>
                <div class="lab__body">${marked.parse(markdown)}</div>
            </article>
        `;
    } catch (error) {
        console.error(error);
        content.innerHTML = `
            <article class="lab">
                <header class="lab__header">
                    <h2 class="lab__title">${lab.title}</h2>
                    <p class="lab__date">${lab.date}</p>
                </header>
                <p>Couldn't load this lab's content. Try refreshing.</p>
            </article>
        `;
    }
}

// One delegated click handler for the whole tree
tree.addEventListener('click', (event) => {
    const labButton = event.target.closest('.tree__lab');
    if (labButton) {
        renderLab(labButton.dataset.labId);
    }
});

renderTree();