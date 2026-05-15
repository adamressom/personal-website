const projects = [
  {
    name: "Personal Website",
    context: "Next.js, Convex, WorkOS",
    dates: "",
    summary: "I rebuilt this site as a small personal system.",
  },
  {
    name: "GmailAI",
    context: "Python, Flask, Gemini",
    dates: "",
    summary: "I built email triage tools for a cleaner inbox.",
  },
  {
    name: "Dodge The Falling Blocks",
    context: "Python, Pygame",
    dates: "",
    summary: "I made a small arcade game with rising difficulty.",
  },
  {
    name: "Ressom Properties",
    context: "Next.js, TypeScript",
    dates: "",
    summary: "I worked on a real estate platform for my family.",
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
