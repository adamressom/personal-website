import Link from "next/link";

type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
};

type Project = {
  name: string;
  context: string;
  dates: string;
  summary: string;
  links?: ProjectLink[];
};

const projects: Project[] = [
  {
    name: "Open-Source Software Contribution",
    context: "",
    dates: "",
    summary:
      "Contributing to a real GitHub project by working through a documented bug or feature request, building the project locally, testing changes, and submitting work through an open-source workflow.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/adamressom",
        external: true,
      },
    ],
  },
  {
    name: "PlanGuard",
    context: "SEO Tech",
    dates: "Jun - Aug 2026",
    summary:
      "A full-stack study planning app with secure authentication, explainable priority scoring, and 62 automated tests.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/adamressom/PlanGuard",
        external: true,
      },
    ],
  },
  {
    name: "Glioblastoma Single-Cell Analysis",
    context: "Georgetown Data Science Corps",
    dates: "Jun - Aug 2026",
    summary:
      "A Python machine learning project analyzing 1.1 million single-cell records to classify glioblastoma data and uncover patterns.",
    links: [
      {
        label: "GitHub · clustering",
        href: "https://github.com/adamressom/Glioblastoma-introduction-to-clustering",
        external: true,
      },
      {
        label: "GitHub · data analysis",
        href: "https://github.com/adamressom/glioblastoma-data-",
        external: true,
      },
    ],
  },
  {
    name: "Debugging Automation Toolkit",
    context: "EECS 481 - Software Engineering",
    dates: "Jan - Feb 2026",
    summary:
      "Built Python debugging tools for delta debugging and fault localization to minimize failure-inducing inputs and identify suspicious lines in failing programs.",
  },
  {
    name: "______ Properties",
    context: "Personal Project",
    dates: "2026",
    summary:
      "Built a property-focused web app with Next.js and TypeScript, using a clean frontend structure for presenting real estate information online. I am not linking the GitHub repo because the project used property data and business context that I should not publish without clearer data rights and permissions.",
    links: [
      {
        label: "Read why",
        href: "/blogs/biggest-coding-project-didnt-launch",
      },
    ],
  },
  {
    name: "User-Centered Interface Design Prototype",
    context: "EECS 493 - User Interface Development",
    dates: "Jan - Apr 2026",
    summary:
      "Designed and iterated a high-fidelity Figma prototype through user interviews, affinity mapping, storyboarding, think-aloud usability testing, and feedback-driven design improvements.",
  },
  {
    name: "GmailAI",
    context: "MHacks/Personal Project",
    dates: "Feb - Mar 2026",
    summary:
      "Built an AI-powered Gmail organizer that connects through Google OAuth, categorizes student emails into smart labels, generates summaries and priority scores, and lets users ask inbox questions with cited email responses.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/adamressom/GmailAI/tree/main?utm_source=chatgpt.com",
        external: true,
      },
    ],
  },
  {
    name: "Personal Website",
    context: "Personal Project",
    dates: "March 2026 - Present",
    summary:
      "Rebuilt this site as a small personal system to organize my projects, experience, and updates in one place, with a clean responsive interface and maintainable frontend structure.",
  },
  {
    name: "Dodge The Falling Blocks",
    context: "Python, Pygame",
    dates: "Jun - Aug 2025",
    summary:
      "Built a multi-stage arcade game in Python using Pygame, with live hit detection, random block spawning, point tracking, and difficulty that increases as the player survives longer.",
  },
];

export const metadata = {
  title: "Archive | adamressom.dev",
  description: "Projects by Adam Ressom.",
};

export default function Archive() {
  return (
    <main className="min-h-screen bg-[#eef4ec] px-4 pb-20 pt-16 text-[#20221f]">
      <section className="mx-auto max-w-2xl text-left">
        <div className="border-b border-[#d4ded2] pb-3">
          <h1 className="mono-font text-[11px] font-semibold uppercase tracking-[0.16em] text-[#386f8f]">
            projects
          </h1>
        </div>

        <div className="mt-10 space-y-10">
          {projects.map((project) => (
            <article key={project.name}>
              <h2 className="text-base font-semibold leading-tight text-[#20221f]">
                {project.name}
              </h2>
              <p className="mt-1 text-sm leading-6 text-[#667069]">
                {project.context}
                {project.dates ? ` · ${project.dates}` : ""}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#4f5b53]">
                {project.summary}
              </p>
              {project.links && (
                <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold">
                  {project.links.map((link) =>
                    link.external ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="lowercase text-[#c45f3a] hover:text-[#20221f]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="lowercase text-[#c45f3a] hover:text-[#20221f]"
                      >
                        {link.label}
                      </Link>
                    ),
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <footer className="mx-auto mt-14 flex max-w-2xl flex-col gap-4 border-t border-[#d4ded2] pt-6 text-xs text-[#667069] sm:flex-row sm:items-center sm:justify-between">
        <p className="mono-font tracking-[0.12em]">adamressom.dev</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-medium lowercase">
          <a
            href="https://github.com/adamressom"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#20221f]"
          >
            github
          </a>
          <a
            href="https://linkedin.com/in/adam-ressom"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#20221f]"
          >
            linkedin
          </a>
          <a href="mailto:aressom@umich.edu" className="hover:text-[#20221f]">
            aressom@umich.edu
          </a>
        </div>
      </footer>
    </main>
  );
}
