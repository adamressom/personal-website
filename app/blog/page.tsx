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

function WinkFace() {
  const [winking, setWinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWinking(true);
      setTimeout(() => setWinking(false), 350);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ animation: "bob 2s ease-in-out infinite" }}>
      <style>{`@keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }`}</style>
      {winking ? (
        <path d="M28 28 Q35 36 42 28" stroke="#111" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      ) : (
        <ellipse cx="35" cy="28" rx="7" ry="9" fill="#111"/>
      )}
      <ellipse cx="85" cy="28" rx="7" ry="9" fill="#111"/>
      <path d="M28 60 Q60 80 92 60" stroke="#111" strokeWidth="4" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export default function Blog() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [justSignedUp, setJustSignedUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    const params = new URLSearchParams(window.location.search);
    if (params.get("subscribed") === "true") {
      setJustSignedUp(true);
      setShowPopup(true);
    }
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className="min-h-screen w-full flex items-center px-16 bg-gray-50"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}
    >
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-3xl p-12 max-w-md w-full mx-4 relative text-center">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-5 right-5 text-gray-300 hover:text-gray-600 transition-colors text-lg"
            >
              ✕
            </button>
            <h3 className="text-2xl font-medium text-gray-900 mb-6">
              {justSignedUp ? "You're in!" : "Welcome back!"}
            </h3>
            <div className="flex justify-center mb-6">
              <WinkFace />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-8">
              You&apos;ll receive weekly updates on what I&apos;m building, writing, and thinking about. Stay tuned!
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="text-xs px-8 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl">
        <p className="text-xs tracking-widest text-gray-300 uppercase mb-10">
          Blogs
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