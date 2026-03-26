"use client";

import { useEffect, useRef, useState } from "react";

const phrases = ["Adam Ressom.", "a software engineer.", "a builder."];

export default function Home() {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    const current = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
    } else if (!deleting && displayed.length === current.length) {
      if (phraseIndex === 0) {
        timeout = setTimeout(() => { setDeleting(true); }, 2000);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1400);
      }
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length === 0 ? 1 : (i + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIndex]);

  return (
    <main
      className="h-screen w-full flex flex-col justify-center px-16 bg-white"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}
    >
      <p className="text-xs tracking-widest text-gray-400 uppercase mb-6">
        Software Engineer — Washington, D.C
      </p>

      <h1 className="text-7xl font-medium tracking-tight text-gray-900 mb-6 leading-none min-h-[1.2em]">
        {displayed}
        <span className="border-r-2 border-gray-900 ml-1 animate-pulse">&nbsp;</span>
      </h1>

      <p className="text-base text-gray-400 max-w-md leading-relaxed mb-8">
        I build thoughtful, performant software — from clean interfaces to robust backend systems.
      </p>

      <div className="flex gap-3 flex-wrap">
        {["Next.js", "TypeScript", "Convex", "React", "Node.js"].map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="absolute bottom-8 left-16 text-xs text-gray-300 tracking-widest flex items-center gap-3">
        <span className="w-7 h-px bg-gray-200 inline-block" />
        Scroll to explore
      </p>
    </main>
  );
}