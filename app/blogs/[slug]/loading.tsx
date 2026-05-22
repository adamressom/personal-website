export default function BlogPostLoading() {
  return (
    <main className="min-h-screen bg-[#eef4ec] px-4 pb-20 pt-16 text-[#20221f]">
      <article className="mx-auto max-w-2xl">
        <div className="h-3 w-24 rounded-full bg-[#dceaf2]" />
        <header className="mt-8">
          <div className="h-3 w-44 rounded-full bg-[#dceaf2]" />
          <div className="mt-4 h-10 w-11/12 rounded-full bg-[#d4ded2]" />
          <div className="mt-3 h-10 w-3/4 rounded-full bg-[#d4ded2]" />
          <div className="mt-5 h-4 w-full max-w-xl rounded-full bg-[#d4ded2]" />
          <div className="mt-2 h-4 w-2/3 rounded-full bg-[#d4ded2]" />
        </header>

        <div className="mt-8 rounded-[24px] border border-[#d4ded2] bg-[#fbfaf3]/75 p-5 sm:p-7">
          <div className="space-y-3">
            {[0, 1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-3 rounded-full bg-[#d4ded2]"
                style={{ width: `${item % 2 === 0 ? 100 : 82}%` }}
              />
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
