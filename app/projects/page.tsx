const projects = [
  "Personal Website",
  "GmailAI",
  "Dodge The Falling Blocks",
  "Ressom Properties",
];

export default function Projects() {
  return (
    <main className="min-h-screen bg-[#eef4ec] px-4 pb-20 pt-16 text-[#20221f]">
      <section className="mx-auto max-w-2xl text-center">
        <p className="mono-font mx-auto w-fit rounded-full border border-[#d4ded2] bg-[#fbfaf3] px-3 py-1 text-[10px] lowercase tracking-[0.18em] text-[#386f8f]">
          projects
        </p>
        <h1 className="mt-8 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          Projects
        </h1>
        <div className="mt-10 space-y-3 text-left">
          {projects.map((project) => (
            <p
              key={project}
              className="rounded-2xl border border-[#d4ded2] bg-[#fbfaf3]/75 p-4 text-sm font-semibold"
            >
              {project}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
