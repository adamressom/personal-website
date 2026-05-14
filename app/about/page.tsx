export default function About() {
  return (
    <main className="min-h-screen bg-[#eef4ec] px-4 pb-20 pt-16 text-[#20221f]">
      <section className="mx-auto max-w-2xl text-center">
        <p className="mono-font mx-auto w-fit rounded-full border border-[#d4ded2] bg-[#fbfaf3] px-3 py-1 text-[10px] lowercase tracking-[0.18em] text-[#386f8f]">
          about
        </p>
        <h1 className="mt-8 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          Adam Ressom
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#4f5b53]">
          I study computer science and build web products. I focus on useful
          interfaces, backend systems, and projects I can ship.
        </p>
      </section>
    </main>
  );
}
