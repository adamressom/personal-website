import Link from "next/link";
import BlogSignupPopup from "@/components/BlogSignupPopup";
import { posts } from "@/lib/blog-posts";

export default async function Blogs({
  searchParams,
}: {
  searchParams: Promise<{ subscribed?: string }>;
}) {
  const { subscribed } = await searchParams;

  return (
    <main className="min-h-screen bg-[#eef4ec] px-4 pb-20 pt-16 text-[#20221f]">
      <BlogSignupPopup initialShow={subscribed === "true"} />

      <section className="mx-auto max-w-2xl text-center">
        <p className="mono-font mx-auto w-fit rounded-full border border-[#d4ded2] bg-[#fbfaf3] px-3 py-1 text-[10px] lowercase tracking-[0.18em] text-[#386f8f]">
          notes from the shelf
        </p>
        <h1 className="mt-8 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          Blogs
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#4f5b53]">
          Short notes on projects, tools, and decisions. Each post keeps one
          lesson easy to find.
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-2xl">
        <div className="space-y-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="rounded-2xl border border-[#d4ded2] bg-[#fbfaf3]/75 p-4 transition-colors hover:border-[#b8c7b6]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-semibold">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="hover:text-[#c45f3a]"
                  >
                    {post.title}
                  </Link>
                </h2>
                <span className="mono-font text-[10px] lowercase text-[#667069]">
                  {post.date}
                </span>
              </div>
              <p className="mono-font mt-2 text-[10px] lowercase text-[#386f8f]">
                {post.tag} / {post.readTime}
              </p>
              <p className="mt-3 text-xs leading-6 text-[#4f5b53]">
                {post.excerpt}
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
