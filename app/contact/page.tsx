"use client";

import { useEffect, useState } from "react";
import Subscribe from "@/components/Subscribe";

const socials = [
  { label: "Email me", href: "mailto:adamressom@gmail.com", filled: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/adam-ressom", filled: false },
  { label: "GitHub", href: "https://github.com/adamressom", filled: false },
  { label: "Instagram", href: "https://www.instagram.com/adamressom", filled: false },
];

export default function Contact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-16 bg-white" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>
      <div className="text-center max-w-lg">
        <h2 className="text-5xl font-medium tracking-tight text-gray-900 mb-4 leading-tight">
          Let&apos;s build something together.
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed mb-10">
          Open to new opportunities, collaborations, and good conversations.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          {socials.map((s) => (
            <a key={s.label} href={s.href} rel="noreferrer" className={s.filled ? "text-xs px-5 py-2.5 rounded-full bg-black text-white hover:bg-gray-800 transition-colors" : "text-xs px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors"}>
              {s.label}
            </a>
          ))}
        </div>
        <Subscribe />
      </div>
    </main>
  );
}