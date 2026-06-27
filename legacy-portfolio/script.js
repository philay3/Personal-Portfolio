// Active section highlighting via Intersection Observer
// As the user scrolls, the nav link for the section currently in view
// gets the .is-active class. CSS does the color change.

const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".site-nav__links a");

const observer = new IntersectionObserver(
    (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                for (const link of navLinks) {
                    link.classList.toggle(
                        "is-active",
                        link.getAttribute("href") === `#${id}`
                    );
                }
            }
        }
    },
    {
        // Fire when the section is roughly centered in the viewport,
        // not the instant its top edge crosses in.
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
    }
);

for (const section of sections) {
    observer.observe(section);
}