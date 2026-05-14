import Link from "next/link";
import { allWork } from "@/lib/work";

export const metadata = {
  title: "Work | adamressom.dev",
  description: "Work and leadership experience for Adam Ressom.",
};

export default function Work() {
  return (
    <main className="min-h-screen bg-[#eef4ec] px-4 pb-20 pt-16 text-[#20221f]">
      <section className="mx-auto max-w-2xl text-left">
        <div className="flex items-center justify-between gap-4 border-b border-[#d4ded2] pb-3">
          <p className="mono-font text-[11px] font-semibold uppercase tracking-[0.16em] text-[#386f8f]">
            work
          </p>
          <Link href="/" className="text-xs font-medium lowercase text-[#c45f3a]">
            home
          </Link>
        </div>

        <div className="mt-10 space-y-10">
          {allWork.map((item) => (
            <article key={`${item.organization}-${item.role}-${item.dates}`}>
              <h1 className="text-base font-semibold leading-tight text-[#20221f]">
                {item.role}
              </h1>
              <p className="mt-1 text-sm leading-6 text-[#667069]">
                {item.organization}
                {item.location ? ` · ${item.location}` : ""} · {item.dates}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#4f5b53]">
                {item.summary}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
