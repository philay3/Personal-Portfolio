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

// Render a lab's writeup in the main pane
// Render a lab. Try markdown content first, fall back to legacy data.
async function renderLab(labId) {
    const lab = findLab(labId);
    if (!lab) return;

    // Mark active in the tree immediately so the click feels responsive
    document.querySelectorAll('.tree__lab').forEach(btn => btn.classList.remove('is-active'));
    document.querySelector(`.tree__lab[data-lab-id="${labId}"]`)?.classList.add('is-active');

    // Try markdown first
    try {
        const response = await fetch(`content/${labId}.md`);
        if (response.ok) {
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
            return;
        }
    } catch (e) {
        // Network or fetch error, fall through to legacy
    }

    // Legacy: render from labsData fields
    renderLegacyLab(lab);
}

// Legacy renderer using the notes/code/screenshots/learned fields.
// Will get deleted once all labs are migrated to markdown files.
function renderLegacyLab(lab) {
    const codeBlock = lab.code
        ? `<section class="lab__section">
               <h3 class="lab__section-title">Code</h3>
               <pre class="lab__code"><code></code></pre>
           </section>`
        : '';

    const screenshotsBlock = lab.screenshots.length
        ? `<section class="lab__section">
               <h3 class="lab__section-title">Screenshots</h3>
               <div class="lab__screenshots">
                   ${lab.screenshots.map(src => `<img src="${src}" alt="" class="lab__screenshot">`).join('')}
               </div>
           </section>`
        : '';

    content.innerHTML = `
        <article class="lab">
            <header class="lab__header">
                <h2 class="lab__title">${lab.title}</h2>
                <p class="lab__date">${lab.date}</p>
            </header>
            <section class="lab__section">
                <h3 class="lab__section-title">Notes</h3>
                <p>${lab.notes}</p>
            </section>
            ${codeBlock}
            ${screenshotsBlock}
            <section class="lab__section">
                <h3 class="lab__section-title">What I learned</h3>
                <p>${lab.learned}</p>
            </section>
        </article>
    `;

    if (lab.code) {
        content.querySelector('.lab__code code').textContent = lab.code;
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