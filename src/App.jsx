import { useState, useEffect, useRef } from "react";
import "./App.css";

const NAV_LINKS = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "education", href: "#education" },
  { label: "contact", href: "#contact" },
];

const SKILLS = {
  Languages: ["JavaScript", "TypeScript", "SQL", "C", "C++ (Basics)"],
  "Backend Technologies": ["Node.js", "Express.js", "NestJS", "Jest"],
  Databases: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
  "Tools & Platforms": [
    "Git",
    "GitHub",
    "Postman",
    "Docker",
    "AWS (SQS)",
    "Postbird",
    "DBeaver",
  ],
  "AI Tools": ["Cursor", "Claude", "ChatGPT", "Gemini"],
  Concepts: [
    "REST APIs",
    "Database Design",
    "Secure Coding",
    "MVC Architecture",
    "Agile",
    "DSA",
    "OOP",
  ],
};

const EXPERIENCE = [
  {
    role: "Backend Developer",
    company: "GKM IT Pvt. Ltd.",
    location: "Udaipur, Rajasthan",
    period: "April 2025 – Present",
    type: "Full-time",
    projects: [
      {
        name: "Venture Capital Platform",
        stack: "Node.js · Express.js · PostgreSQL · SQS",
        points: [
          "Contributed to development & maintenance of 5+ microservices handling large-scale investor and startup data workflows.",
          "Designed and optimized complex PostgreSQL queries, reducing API response time by 35–45%.",
          "Architected inter-service communication within a microservices ecosystem, managing data flow for 30+ internal stakeholders.",
          "Integrated Harmonic and Proxycurl APIs, improving data enrichment speed by 25%.",
          "Implemented a Slack-based alerting system enabling real-time monitoring & reducing error detection time.",
          "Utilized Salesforce CMS to access and manage user data within backend workflows.",
        ],
      },
      {
        name: "Fintech Platform",
        stack: "Node.js · Express.js · PostgreSQL · SQS",
        points: [
          "Integrated multiple third-party services and payment gateways using extensible, class-based architectures.",
          "Implemented core fintech features: transaction lifecycle management, wallet/ledger systems, and split transaction handling.",
          "Developed a rule-based processing engine automating 500+ daily transaction updates without manual intervention.",
          "Introduced database-level locking to ensure transaction atomicity and prevent race conditions.",
          "Streamlined real-time data updates using Socket.IO.",
        ],
      },
    ],
    summary:
      "Developed end-to-end backend architectures for production-grade applications. Built comprehensive Jest integration and unit testing suites to validate core business logic.",
  },
  {
    role: "Backend Developer Intern",
    company: "GKM IT Pvt. Ltd.",
    location: "Udaipur, Rajasthan",
    period: "September 2024 – March 2025",
    type: "Internship",
    projects: [],
    points: [
      "Spearheaded the design of a Swiggy-inspired backend architecture, implementing RBAC logic for three distinct user types and standardizing 30+ internal APIs.",
      "Completed structured backend training, progressing from fundamentals to real-world backend system design.",
      "Collaborated using Git on shared repositories, contributing to development and debugging.",
      "Acquired working knowledge of Docker and containerized application workflows.",
    ],
  },
];

const PROJECTS = [
  {
    name: "Venture Capital Platform",
    stack: ["Node.js", "Express.js", "PostgreSQL", "AWS SQS"],
    description:
      "Production microservices platform handling large-scale investor & startup data workflows for a VC firm. Reduced API response times by 35–45% through query optimization.",
    highlights: ["5+ microservices", "35–45% faster APIs", "30+ stakeholders"],
    github: null,
    live: null,
  },
  {
    name: "Fintech Platform",
    stack: ["Node.js", "Express.js", "PostgreSQL", "Socket.IO"],
    description:
      "Core fintech system with transaction lifecycle management, wallet/ledger systems, and a rule-based processing engine handling 500+ daily transactions autonomously.",
    highlights: [
      "500+ daily txns",
      "Race condition prevention",
      "Real-time updates",
    ],
    github: null,
    live: null,
  },
  {
    name: "Swiggy-Inspired Backend",
    stack: ["Node.js", "Express.js", "PostgreSQL", "Docker"],
    description:
      "Full backend architecture with RBAC for three user types (admin, restaurant, customer), standardized 30+ REST APIs, and containerized deployment.",
    highlights: ["RBAC for 3 roles", "30+ REST APIs", "Dockerized"],
    github: "https://github.com/jyoti-Deveda",
    live: null,
  },
  {
    name: "Weather App",
    stack: ["HTML", "CSS", "JavaScript", "API"],
    description:
      "Responsive weather app fetching real-time weather data via external API based on user location or searched city.",
    highlights: ["Geolocation API", "Responsive UI", "Real-time data"],
    github: "https://github.com/Jyoti-Deveda/Weather-app",
    live: "https://get-the-weatherconditions.netlify.app/",
  },
  {
    name: "Password Generator",
    stack: ["HTML", "CSS", "JavaScript"],
    description:
      "Tool for generating strong, secure passwords with customizable length, character types, and a password strength indicator.",
    highlights: ["Strength indicator", "Custom config", "Copy to clipboard"],
    github: "https://github.com/Jyoti-Deveda/Password-Generator",
    live: "https://generate-the-password.netlify.app/",
  },
];

const EDUCATION = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    institution: "Mandsaur University",
    location: "Mandsaur, M.P.",
    year: "2021 – 2025",
    score: "CGPA: 8.7",
  },
  {
    degree: "XII (MPBSE)",
    institution: "Dalauda Public School",
    location: "Dalauda",
    year: "2021",
    score: "98%",
  },
  {
    degree: "X (MPBSE)",
    institution: "Dalauda Public School",
    location: "Dalauda",
    year: "2019",
    score: "97.2%",
  },
];

const CERTIFICATIONS = [
  {
    name: "Advanced SQL Course",
    issuer: "Udemy",
    id: "UC-64f6c1cb-3354-4251-9a92-7260304ac747",
  },
  {
    name: "PostgreSQL High Performance Tuning Guide",
    issuer: "Udemy",
    id: "UC-50b120d4-c243-4d21-bfee-f9da16befdac",
  },
];

// --- Typewriter Hook ---
function useTypewriter(texts, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let timeout;
    if (!deleting && display.length < current.length) {
      timeout = setTimeout(
        () => setDisplay(current.slice(0, display.length + 1)),
        speed,
      );
    } else if (!deleting && display.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && display.length > 0) {
      timeout = setTimeout(() => setDisplay(display.slice(0, -1)), speed / 2);
    } else if (deleting && display.length === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIdx((i) => (i + 1) % texts.length);
      }, speed / 2);
    }
    return () => clearTimeout(timeout);
  }, [display, deleting, idx, texts, speed, pause]);

  return display;
}

// --- Scroll reveal hook ---
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function RevealSection({ children, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "revealed" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// ---- NAVBAR ----
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <a href="#about" className="nav-logo">
        <span className="nav-logo-bracket">&lt;</span>
        JD
        <span className="nav-logo-bracket">/&gt;</span>
      </a>
      <ul className={`nav-links ${open ? "nav-links--open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <li key={l.label}>
            <a href={l.href} onClick={() => setOpen(false)}>
              <span className="nav-link-tilde">~/</span>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <button
        className="nav-hamburger"
        onClick={() => setOpen((o) => !o)}
        aria-label="menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}

// ---- HERO ----
function Hero() {
  const typed = useTypewriter([
    "Backend Developer",
    "API Architect",
    "PostgreSQL Optimizer",
    "Systems Thinker",
  ]);

  return (
    <section className="hero" id="about">
      <div className="hero-terminal-bar">
        <span className="dot dot-red" />
        <span className="dot dot-yellow" />
        <span className="dot dot-green" />
        <span className="hero-terminal-title">jyoti@portfolio ~ bash</span>
      </div>
      <div className="hero-body">
        <div className="hero-layout">
          <div className="hero-left">
            <div className="hero-prompt">
              <span className="prompt-path">~/dev</span>
              <span className="prompt-dollar">$</span>
              <span className="prompt-cmd"> whoami</span>
            </div>
            <h1 className="hero-name">Jyoti Deveda</h1>
            <div className="hero-role">
              <span className="role-prefix">→ </span>
              <span className="role-text">{typed}</span>
              <span className="cursor-blink">_</span>
            </div>
            <p className="hero-summary">
              Backend Developer focused on building scalable, high-performance
              systems using <strong>Node.js</strong> and{" "}
              <strong>PostgreSQL</strong>. Experienced in designing robust APIs,
              optimizing system performance, and working on production-grade,
              data-driven applications. Passionate about clean architecture,
              reliability, and solving real-world engineering problems.
            </p>
            <div className="hero-actions">
              <a href="#experience" className="btn btn-primary">
                <span>view experience</span>
                <span className="btn-arrow">→</span>
              </a>
              <a
                href="mailto:jyotideveda02@gmail.com"
                className="btn btn-ghost"
              >
                get in touch
              </a>
            </div>
            <div className="hero-links">
              <a
                href="https://github.com/jyoti-Deveda"
                target="_blank"
                rel="noreferrer"
                className="hero-link"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="18"
                  height="18"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                </svg>
                github
              </a>
              <a
                href="https://www.linkedin.com/in/jyoti-deveda/"
                target="_blank"
                rel="noreferrer"
                className="hero-link"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="18"
                  height="18"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                linkedin
              </a>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-img-frame">
              <div className="hero-img-terminal-bar">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
                <span className="hero-img-label">jyoti.jpg</span>
              </div>
              <div className="hero-img-wrap">
                <img
                  src="/userImage.jpg"
                  alt="Jyoti Deveda"
                  className="hero-img"
                />
                <div className="hero-img-overlay" />
              </div>
              <div className="hero-img-footer">
                <span className="hero-img-status">
                  <span className="status-dot" />
                  available for work
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

// ---- EXPERIENCE ----
function Experience() {
  const [activeJob, setActiveJob] = useState(0);
  const [activeProject, setActiveProject] = useState(0);

  const job = EXPERIENCE[activeJob];

  return (
    <section className="section" id="experience">
      <RevealSection>
        <div className="section-label">
          <span className="section-num">02</span>
          <span className="section-slash">//</span>
          <span className="section-title">work experience</span>
        </div>

        <div className="exp-layout">
          <div className="exp-tabs">
            {EXPERIENCE.map((e, i) => (
              <button
                key={i}
                className={`exp-tab ${activeJob === i ? "exp-tab--active" : ""}`}
                onClick={() => {
                  setActiveJob(i);
                  setActiveProject(0);
                }}
              >
                <span className="exp-tab-role">{e.role}</span>
                <span className="exp-tab-type">{e.type}</span>
              </button>
            ))}
          </div>

          <div className="exp-content">
            <div className="exp-header">
              <h3 className="exp-role">{job.role}</h3>
              <div className="exp-meta">
                <span className="exp-company">
                  {job.company} · {job.location}
                </span>
                <span className="exp-period">{job.period}</span>
              </div>
            </div>

            {job.summary && <p className="exp-summary">{job.summary}</p>}

            {job.projects.length > 0 && (
              <>
                <div className="exp-project-tabs">
                  {job.projects.map((p, i) => (
                    <button
                      key={i}
                      className={`exp-proj-tab ${activeProject === i ? "exp-proj-tab--active" : ""}`}
                      onClick={() => setActiveProject(i)}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
                <div className="exp-project-content">
                  <div className="exp-proj-stack">
                    {job.projects[activeProject].stack}
                  </div>
                  <ul className="exp-points">
                    {job.projects[activeProject].points.map((pt, i) => (
                      <li key={i}>
                        <span className="point-arrow">▸</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {job.points && (
              <ul className="exp-points">
                {job.points.map((pt, i) => (
                  <li key={i}>
                    <span className="point-arrow">▸</span>
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </RevealSection>
    </section>
  );
}

// ---- SKILLS ----
function Skills() {
  return (
    <section className="section section--alt" id="skills">
      <RevealSection>
        <div className="section-label">
          <span className="section-num">03</span>
          <span className="section-slash">//</span>
          <span className="section-title">tech stack</span>
        </div>
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div className="skill-card" key={cat}>
              <div className="skill-card-header">
                <span className="skill-card-dot" />
                <span className="skill-card-cat">{cat}</span>
              </div>
              <div className="skill-tags">
                {items.map((s) => (
                  <span className="skill-tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </RevealSection>
    </section>
  );
}

// ---- PROJECTS ----
function Projects() {
  return (
    <section className="section" id="projects">
      <RevealSection>
        <div className="section-label">
          <span className="section-num">04</span>
          <span className="section-slash">//</span>
          <span className="section-title">projects</span>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div className="proj-card" key={i}>
              <div className="proj-card-top">
                <div className="proj-card-icons">
                  <span className="proj-folder">⬡</span>
                  <div className="proj-card-links">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          width="18"
                          height="18"
                        >
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                        </svg>
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Live"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          width="18"
                          height="18"
                        >
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="proj-name">{p.name}</h3>
                <p className="proj-desc">{p.description}</p>
              </div>
              <div className="proj-card-bottom">
                <div className="proj-highlights">
                  {p.highlights.map((h) => (
                    <span className="proj-highlight" key={h}>
                      {h}
                    </span>
                  ))}
                </div>
                <div className="proj-stack">
                  {p.stack.map((s) => (
                    <span className="proj-stack-item" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>
    </section>
  );
}

// ---- EDUCATION ----
function Education() {
  return (
    <section className="section section--alt" id="education">
      <RevealSection>
        <div className="section-label">
          <span className="section-num">05</span>
          <span className="section-slash">//</span>
          <span className="section-title">education & certifications</span>
        </div>
        <div className="edu-grid">
          <div>
            <div className="edu-sub-title">education</div>
            <div className="edu-list">
              {EDUCATION.map((e, i) => (
                <div className="edu-item" key={i}>
                  <div className="edu-item-left">
                    <div className="edu-degree">{e.degree}</div>
                    <div className="edu-institution">
                      {e.institution} · {e.location}
                    </div>
                  </div>
                  <div className="edu-item-right">
                    <span className="edu-score">{e.score}</span>
                    <span className="edu-year">{e.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="edu-sub-title">certifications</div>
            <div className="edu-list">
              {CERTIFICATIONS.map((c, i) => (
                <div className="edu-item cert-item" key={i}>
                  <div className="edu-item-left">
                    <div className="edu-degree">{c.name}</div>
                    <div className="edu-institution">{c.issuer}</div>
                  </div>
                  <div className="edu-item-right">
                    <span className="cert-id">{c.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}

// ---- CONTACT ----
function Contact() {
  return (
    <section className="section" id="contact">
      <RevealSection>
        <div className="section-label">
          <span className="section-num">06</span>
          <span className="section-slash">//</span>
          <span className="section-title">contact</span>
        </div>
        <div className="contact-inner">
          <div className="contact-terminal">
            <div className="contact-terminal-bar">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="contact-terminal-body">
              <div className="ct-line">
                <span className="ct-prompt">$</span>{" "}
                <span className="ct-cmd">ping jyoti --open-to-work</span>
              </div>
              <div className="ct-line ct-response">
                <span className="ct-arrow">→</span> Available for new
                opportunities
              </div>
              <div className="ct-line">
                <span className="ct-prompt">$</span>{" "}
                <span className="ct-cmd">cat contact.json</span>
              </div>
              <div className="ct-block">
                <div className="ct-json">{"{"}</div>
                <div className="ct-json-line">
                  <span className="ct-key">"email"</span>:{" "}
                  <a
                    href="mailto:jyotideveda02@gmail.com"
                    className="ct-val ct-link"
                  >
                    "jyotideveda02@gmail.com"
                  </a>
                  ,
                </div>
                <div className="ct-json-line">
                  <span className="ct-key">"linkedin"</span>:{" "}
                  <a
                    href="https://www.linkedin.com/in/jyoti-deveda/"
                    target="_blank"
                    rel="noreferrer"
                    className="ct-val ct-link"
                  >
                    "linkedin.com/in/jyoti-deveda"
                  </a>
                  ,
                </div>
                <div className="ct-json-line">
                  <span className="ct-key">"github"</span>:{" "}
                  <a
                    href="https://github.com/jyoti-Deveda"
                    target="_blank"
                    rel="noreferrer"
                    className="ct-val ct-link"
                  >
                    "github.com/jyoti-Deveda"
                  </a>
                  ,
                </div>
                <div className="ct-json-line">
                  <span className="ct-key">"phone"</span>:{" "}
                  <span className="ct-val">
                    "
                    <a href="tel:+918839478280" className="ct-link">
                      +91 88394 78280
                    </a>
                    "
                  </span>
                </div>
                <div className="ct-json">{"}"}</div>
              </div>
              <div className="ct-line">
                <span className="ct-prompt">$</span>{" "}
                <span className="ct-cursor-blink">_</span>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}

// ---- FOOTER ----
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-logo">&lt;JD /&gt;</span>
        <span className="footer-text">Jyoti Deveda · CSE 2021-25</span>
        <span className="footer-text">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

// ---- APP ----
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
