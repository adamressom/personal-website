import Link from "next/link";

const projects = [
  ["Personal Website", "Next.js, Convex, WorkOS", "I rebuilt this site as a small personal system."],
  ["GmailAI", "Python, Flask, Gemini", "I built email triage tools for a cleaner inbox."],
  ["Dodge The Falling Blocks", "Python, Pygame", "I made a small arcade game with rising difficulty."],
  ["Ressom Properties", "Next.js, TypeScript", "I worked on a real estate platform for my family."],
];

const current = [
  ["studying", "Computer science. Software design. Web systems."],
  ["building", "Apps with auth, data, and clear user flows."],
  ["looking for", "Internship work where I can learn and ship."],
];

const experience = [
  [
    "SEO Tech",
    "Software Engineering Intern",
    "Python, Pygame, HTML, CSS",
    "Feb 2025 to Aug 2025, returning Summer 2026",
    "Built a desktop game in Python. Tested features with an Agile team.",
  ],
  [
    "Georgetown University",
    "Data Science Intern",
    "Python, SQL, Git, AI",
    "Jun 2023 to Aug 2023",
    "Cut metabolomics processing time by 50%. Found 2 potential biomarkers.",
  ],
  [
    "OmicsCraft LLC",
    "AI and Software Engineering Intern",
    "Java, Git, AI",
    "Jun 2022 to Aug 2022",
    "Tested 3 bioinformatics toolkits. Found 2 critical bugs.",
  ],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#eef4ec] px-4 pb-20 pt-16 text-[#20221f]">
      <section className="mx-auto max-w-2xl text-center">
        <p className="mono-font mx-auto w-fit rounded-full border border-[#d4ded2] bg-[#fbfaf3] px-3 py-1 text-[10px] lowercase tracking-[0.18em] text-[#386f8f]">
          operation adamressom.dev
        </p>
        <h1 className="mt-8 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          Adam Ressom
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#4f5b53]">
          I build practical web tools. I care about clear interfaces, useful
          data, and reliable deployment.
        </p>
        <div className="mx-auto mt-7 flex w-fit flex-wrap justify-center gap-2 text-[12px] font-medium lowercase">
          <a className="rounded-full bg-[#20221f] px-3 py-1.5 text-[#fbfaf3]" href="https://github.com/adamressom" target="_blank" rel="noreferrer">
            github
          </a>
          <a className="rounded-full bg-[#dceaf2] px-3 py-1.5 text-[#244f68]" href="https://linkedin.com/in/adam-ressom" target="_blank" rel="noreferrer">
            linkedin
          </a>
          <a className="rounded-full bg-[#ffe1d4] px-3 py-1.5 text-[#8c3d23]" href="mailto:aressom@umich.edu">
            email
          </a>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-2xl rounded-[28px] border border-[#d4ded2] bg-[#fbfaf3] p-5 shadow-[0_24px_80px_rgba(57,70,61,0.08)]">
        <div className="mb-4 text-center">
          <p className="mono-font text-[10px] uppercase tracking-[0.16em] text-[#c45f3a]">
            currently
          </p>
          <h2 className="mt-2 text-base font-semibold">What I&apos;m doing</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {current.map(([title, body]) => (
            <article key={title} className="rounded-2xl bg-[#eef4ec] p-4">
              <h3 className="text-xs font-semibold lowercase text-[#20221f]">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-[#667069]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-2xl">
        <div className="mb-5 flex items-center justify-between border-b border-[#d4ded2] pb-3">
          <h2 className="mono-font text-[11px] font-semibold uppercase tracking-[0.16em] text-[#386f8f]">
            technical experience
          </h2>
          <Link href="/resume" className="text-xs font-medium text-[#c45f3a]">
            resume
          </Link>
        </div>
        <div className="space-y-3">
          {experience.map(([company, role, stack, dates, result]) => (
            <article
              key={company}
              className="rounded-2xl border border-[#d4ded2] bg-[#fbfaf3]/70 p-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold">{company}</h3>
                <p className="mono-font text-[10px] text-[#667069]">{dates}</p>
              </div>
              <p className="mt-2 text-xs font-medium text-[#20221f]">{role}</p>
              <p className="mono-font mt-2 text-[10px] text-[#386f8f]">{stack}</p>
              <p className="mt-2 text-xs leading-6 text-[#4f5b53]">{result}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-2xl">
        <div className="mb-5 flex items-center justify-between border-b border-[#d4ded2] pb-3">
          <h2 className="mono-font text-[11px] font-semibold uppercase tracking-[0.16em] text-[#386f8f]">
            current shelf
          </h2>
          <Link href="/blog" className="text-xs font-medium text-[#c45f3a]">
            read notes
          </Link>
        </div>
        <div className="space-y-3">
          {projects.map(([name, stack, detail]) => (
            <article key={name} className="rounded-2xl border border-[#d4ded2] bg-[#fbfaf3]/70 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold">{name}</h3>
                <p className="mono-font text-[10px] text-[#667069]">{stack}</p>
              </div>
              <p className="mt-2 text-xs leading-6 text-[#4f5b53]">{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="mx-auto mt-14 flex max-w-2xl flex-col gap-4 border-t border-[#d4ded2] pt-6 text-xs text-[#667069] sm:flex-row sm:items-center sm:justify-between">
        <p className="mono-font tracking-[0.12em]">adamressom.dev</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-medium lowercase">
          <a href="https://github.com/adamressom" target="_blank" rel="noreferrer" className="hover:text-[#20221f]">
            github
          </a>
          <a href="https://linkedin.com/in/adam-ressom" target="_blank" rel="noreferrer" className="hover:text-[#20221f]">
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
