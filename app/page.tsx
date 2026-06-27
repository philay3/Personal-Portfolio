"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Project {
  title: string;
  link: string;
  image: string;
  alt: string;
}

interface Article {
  title: string;
  date: string;
  link: string;
}

interface GalleryItem {
  title: string;
  description: string;
  image: string;
  alt: string;
  position?: string;
}

const projects: Project[] = [
  {
    title: "Legal Prospector",
    link: "https://legal-prospect.vercel.app",
    image: "/images/legal-prospector-search.png",
    alt: "Legal Prospector search results page showing local boutique law firm enrichment results.",
  },
  {
    title: "Fullstack Visualizer",
    link: "https://github.com/philay3/Workflow-Visualizer",
    image: "/images/fullstack-visualizer.png",
    alt: "Fullstack Visualizer interface showing repeatable workflow checklists and HTTP request logging.",
  },
  {
    title: "Digital Footprinter",
    link: "https://kttjdtttsc-jpg.github.io/",
    image: "/images/digital-footprinter.png",
    alt: "Digital Footprinter homepage with terminal-style green-on-black UI explaining browser fingerprinting.",
  },
];

const articles: Article[] = [
  {
    title: "How I Got Into the Next Chapter AI Builder Bootcamp",
    date: "May 14, 2026",
    link: "https://philanthony3.substack.com/p/how-i-got-into-the-next-chapter-ai",
  },
  {
    title: "Rebuilding a Scroll Spy with the Intersection Observer API",
    date: "May 17, 2026",
    link: "https://philanthony3.substack.com/p/rebuilding-a-scroll-spy-with-the",
  },
];

const galleryItems: GalleryItem[] = [
  {
    title: "Legal Prospector Dashboard",
    description: "Pipeline status tiles, recent searches, and per-user activity feed log.",
    image: "/images/legal-prospector-dashboard.png",
    alt: "Legal Prospector dashboard interface mockup",
  },
  {
    title: "Saved Leads Pipeline",
    description: "Private leads workspace showing Active / Won / Lost status tracker and CSV export.",
    image: "/images/legal-prospector-leads.png",
    alt: "Legal Prospector saved leads pipeline mockup",
  },
  {
    title: "Enriched Firm Search",
    description: "Google Places API and LLM-grounded site scraper returning boutique firm details.",
    image: "/images/legal-prospector-search.png",
    alt: "Legal Prospector search results page",
  },
  {
    title: "Fullstack Visualizer HTTP Log",
    description: "Real-time HTTP request panel visualizing parallel fetches and API response times.",
    image: "/images/fullstack-visualizer.png",
    alt: "Fullstack Visualizer HTTP logs detail",
  },
  {
    title: "Digital Footprinter UI",
    description: "Terminal-style layout built to demonstrate browser headers and cookie tracking.",
    image: "/images/digital-footprinter.png",
    alt: "Digital Footprinter interface detail",
  },
  {
    title: "Phil's Avatar",
    description: "The official biography portrait used across social media and platform profiles.",
    image: "/images/portypic.png",
    alt: "Phil Anthony biography portrait detail",
    position: "object-center",
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("main section");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const navLinks = [
    { href: "#biography", label: "Biography" },
    { href: "#projects", label: "Projects" },
    { href: "#articles", label: "Articles" },
    { href: "#gallery", label: "Gallery" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Site Header */}
      <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-md border-b border-border transition-colors duration-200">
        <nav className="flex items-center justify-between max-w-[1100px] mx-auto px-6 py-4" aria-label="Primary">
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-2 font-bold text-xl text-text hover:text-emphasis transition-colors duration-150" aria-label="Home">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="font-serif">Phil Anthony</span>
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`font-medium transition-all duration-200 hover:text-emphasis py-1 border-b-2 ${activeSection === link.href.substring(1)
                      ? "text-emphasis border-emphasis"
                      : "text-text border-transparent"
                    }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-text hover:text-emphasis focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-bg-alt/98 px-6 py-4 animate-fade-in">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 font-medium transition-colors duration-150 ${activeSection === link.href.substring(1) ? "text-emphasis font-bold" : "text-text"
                      }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main className="flex-grow max-w-[1100px] w-full mx-auto px-6 py-8 space-y-16 md:space-y-24">
        {/* Biography Section */}
        <section id="biography" className="scroll-mt-24 flex flex-col md:flex-row items-center gap-12 py-8 md:py-16 border-b border-border/60">
          <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0 group">
            <div className="absolute inset-0 rounded-full bg-accent-warm/20 group-hover:scale-105 transition-transform duration-300 -z-10 blur-md"></div>
            <Image
              src="/images/portypic.png"
              alt="Portrait of Phil Anthony"
              width={224}
              height={224}
              priority
              className="rounded-full object-cover border-2 border-border group-hover:border-accent transition-colors duration-300 w-full h-full shadow-lg"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text mb-2">Phil Anthony</h1>
            <p className="text-xl md:text-2xl font-medium text-text-muted font-serif mb-6">Software Engineer</p>
            <p className="text-lg text-text-muted leading-relaxed max-w-[65ch] mb-8 mx-auto md:mx-0">
              I&apos;m a software engineer focused on building clean, high-performance web applications and robust data systems. I specialize in <strong className="font-bold text-text">Next.js</strong>, <strong className="font-bold text-text">React</strong>, and <strong className="font-bold text-text">TypeScript</strong> for the frontend, coupled with structured backend architecture using <strong className="font-bold text-text">SQL</strong> and relational databases. I love organizing complex data flows and designing scalable schemas that solve real-world problems.
            </p>
            <div>
              <a
                href="#projects"
                className="inline-block px-8 py-3 rounded-md font-semibold bg-text text-bg border border-text hover:bg-accent hover:border-accent transition-colors duration-150 shadow-md"
              >
                See My Work
              </a>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-24 space-y-8 border-b border-border/60 pb-16 md:pb-24">
          <h2 className="text-3xl font-bold tracking-tight text-text">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {projects.map((project) => (
              <article key={project.title} className="group flex flex-col gap-4 bg-bg-alt/40 border border-border p-4 rounded-xl hover:border-accent hover:bg-bg-alt/70 transition-all duration-300 shadow-sm hover:shadow-md">
                <a href={project.link} className="block overflow-hidden rounded-lg aspect-[16/10]" target={project.link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    width={480}
                    height={300}
                    className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300 border border-border/40"
                  />
                </a>
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-bold font-serif text-text group-hover:text-emphasis transition-colors duration-150">
                    <a href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                      {project.title}
                    </a>
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Articles Section */}
        <section id="articles" className="scroll-mt-24 space-y-8 border-b border-border/60 pb-16 md:pb-24">
          <h2 className="text-3xl font-bold tracking-tight text-text">Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {articles.map((article) => (
              <article key={article.title} className="group flex flex-col">
                <a
                  href={article.link}
                  className="block text-center flex-grow"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="aspect-square bg-text text-bg flex items-center justify-center p-8 rounded-xl shadow-sm group-hover:bg-accent group-hover:shadow-md transition-all duration-300">
                    <h3 className="text-2xl font-bold font-serif tracking-tight leading-snug">
                      {article.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-text-muted text-left font-medium">{article.date}</p>
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="scroll-mt-24 space-y-8 pb-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-text">Gallery</h2>
            <p className="text-text-muted">A collection of visual artifacts, dashboard concepts, and project mockups.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div key={item.title} className="relative group overflow-hidden rounded-xl border border-border bg-bg-alt aspect-[16/10] shadow-sm hover:shadow-md transition-all duration-300">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={`object-cover ${item.position || "object-top"} group-hover:scale-105 transition-transform duration-300`}
                />
                <div className="absolute inset-0 bg-text/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-bg">
                  <h4 className="font-serif font-bold text-lg mb-1 leading-tight">{item.title}</h4>
                  <p className="text-xs text-bg-alt leading-normal">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-bg-alt/30 py-12">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/philay3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-emphasis transition-colors duration-150"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/phillip-anthony-75280778/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-emphasis transition-colors duration-150"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
          <p className="text-text-muted text-sm">Phil Anthony © 2026</p>
        </div>
      </footer>
    </div>
  );
}
