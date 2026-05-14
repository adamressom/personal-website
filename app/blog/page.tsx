"use client";

import { useEffect, useState } from "react";

const posts = [
  {
    date: "Mar 2026",
    title: "Why I chose Convex",
    excerpt: "Convex gave me real-time sync, less setup, and a faster path to shipping.",
    tag: "Engineering",
    readTime: "5 min",
  },
  {
    date: "Feb 2026",
    title: "Rebuilding this site",
    excerpt: "I changed the layout, cut the copy, and made the site easier to scan.",
    tag: "Projects",
    readTime: "4 min",
  },
  {
    date: "Jan 2026",
    title: "Shipping a small product",
    excerpt: "Scope small. Test the core path. Ship before the idea gets too large.",
    tag: "Thoughts",
    readTime: "6 min",
  },
];

export default function Blog() {
  const [visible, setVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [justSignedUp, setJustSignedUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("subscribed") === "true") {
        setJustSignedUp(true);
        setShowPopup(true);
      }
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className="min-h-screen bg-[#eef4ec] px-4 pb-20 pt-16 text-[#20221f]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}
    >
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#eef4ec]/80 px-5 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xs rounded-3xl border border-[#d4ded2] bg-[#fbfaf3] p-7 text-center"
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute right-5 top-4 text-sm text-[#667069] hover:text-[#c45f3a]"
            >
              x
            </button>
            <h3 className="text-lg font-semibold">
              {justSignedUp ? "You're in!" : "Welcome back!"}
            </h3>
            <p className="mt-3 text-xs leading-6 text-[#4f5b53]">
              You&apos;ll get notes on projects, tools, and lessons I can reuse.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-6 rounded-full bg-[#20221f] px-4 py-2 text-xs font-semibold lowercase text-[#fbfaf3]"
            >
              got it
            </button>
          </div>
        </div>
      )}

      <section className="mx-auto max-w-2xl text-center">
        <p className="mono-font mx-auto w-fit rounded-full border border-[#d4ded2] bg-[#fbfaf3] px-3 py-1 text-[10px] lowercase tracking-[0.18em] text-[#386f8f]">
          notes from the shelf
        </p>
        <h1 className="mt-8 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          Blog
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
              className="rounded-2xl border border-[#d4ded2] bg-[#fbfaf3]/75 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-semibold">{post.title}</h2>
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
