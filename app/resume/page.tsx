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

export default function Resume() {
  return (
    <main className="min-h-screen bg-[#eef4ec] px-4 pb-20 pt-16 text-[#20221f]">
      <section className="mx-auto max-w-2xl text-center">
        <p className="mono-font mx-auto w-fit rounded-full border border-[#d4ded2] bg-[#fbfaf3] px-3 py-1 text-[10px] lowercase tracking-[0.18em] text-[#386f8f]">
          resume
        </p>
        <h1 className="mt-8 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          Experience
        </h1>
        <div className="mt-10 space-y-3 text-left">
          {experience.map(([company, role, stack, dates, result]) => (
            <article
              key={company}
              className="rounded-2xl border border-[#d4ded2] bg-[#fbfaf3]/75 p-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-sm font-semibold">{company}</h2>
                <p className="mono-font text-[10px] text-[#667069]">{dates}</p>
              </div>
              <p className="mt-2 text-xs font-medium text-[#20221f]">{role}</p>
              <p className="mono-font mt-2 text-[10px] text-[#386f8f]">{stack}</p>
              <p className="mt-2 text-xs leading-6 text-[#4f5b53]">{result}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
