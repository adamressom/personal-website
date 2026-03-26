"use client";

import { useEffect, useState } from "react";

const posts = [
  {
    date: "Mar 2026",
    title: "Why I chose Convex over a traditional database",
    excerpt: "Real-time sync, no boilerplate, and a developer experience that actually makes sense.",
    tag: "Engineering",
  },
  {
    date: "Feb 2026",
    title: "Building my personal site from scratch in a weekend",
    excerpt: "The stack, the decisions, and what I'd do differently next time.",
    tag: "Projects",
  },
  {
    date: "Jan 2026",
    title: "What I learned shipping my first solo product",
    excerpt: "Lessons on scoping, speed, and knowing when something is good enough.",
    tag: "Thoughts",
  },
];

export default function Blog() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className="min-h-screen w-full flex items-center px-16 bg-gray-50"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}
    >
      <div className="w-full max-w-4xl">
        <p className="text-xs tracking-widest text-gray-300 uppercase mb-10">
          05 — Writing
        </p>
        <div className="grid grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-xl p-5 cursor-pointer transition-all duration-200"
              style={{
                borderColor: hovered === i ? "#ccc" : undefined,
                transform: hovered === i ? "translateY(-2px)" : "none",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="text-xs text-gray-300 tracking-wide mb-2">{post.date}</div>
              <div className="text-sm font-medium text-gray-900 leading-snug mb-2">{post.title}</div>
              <div className="text-xs text-gray-400 leading-relaxed">{post.excerpt}</div>
              <span className="inline-block mt-3 text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-400">
                {post.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}