// Active section highlighting in nav
const navLinks = document.querySelectorAll('.site-nav__links a[href^="#"]');
const sectionToLink = new Map();

navLinks.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    if (section) {
        sectionToLink.set(section, link);
    }
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const link = sectionToLink.get(entry.target);
        if (link) {
            link.classList.toggle('is-active', entry.isIntersecting);
        }
    });
}, {
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
});

for (const section of sectionToLink.keys()) {
    observer.observe(section);
}