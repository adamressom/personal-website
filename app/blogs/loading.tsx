export default function BlogsLoading() {
  return (
    <main className="min-h-screen bg-[#eef4ec] px-4 pb-20 pt-16 text-[#20221f]">
      <section className="mx-auto max-w-2xl text-center">
        <div className="mx-auto h-6 w-36 rounded-full bg-[#d4ded2]" />
        <div className="mx-auto mt-8 h-10 w-32 rounded-full bg-[#d4ded2]" />
        <div className="mx-auto mt-5 h-4 max-w-md rounded-full bg-[#d4ded2]" />
      </section>

      <section className="mx-auto mt-12 max-w-2xl space-y-3">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-[#d4ded2] bg-[#fbfaf3]/75 p-4"
          >
            <div className="h-4 w-3/4 rounded-full bg-[#d4ded2]" />
            <div className="mt-3 h-3 w-28 rounded-full bg-[#dceaf2]" />
            <div className="mt-4 h-3 w-full rounded-full bg-[#d4ded2]" />
            <div className="mt-2 h-3 w-2/3 rounded-full bg-[#d4ded2]" />
          </div>
        ))}
      </section>
    </main>
  );
}
