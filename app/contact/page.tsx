"use client";

import { useEffect, useState } from "react";

const socials = [
  { label: "Email me", href: "mailto:adamressom@gmail.com", filled: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/adam-ressom", filled: false },
  { label: "GitHub", href: "https://github.com/adamressom", filled: false },
  { label: "Instagram", href: "https://www.instagram.com/adamressom", filled: false },
];

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    const cookies = document.cookie.split(";").map((c) => c.trim());
    const signedIn = cookies.some((c) => c.startsWith("is_signed_in="));
    setIsSignedIn(signedIn);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-16 bg-white" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>
      <div className="text-center max-w-lg">
        <h2 className="text-5xl font-medium tracking-tight text-gray-900 mb-4 leading-tight">Let&apos;s build something together.</h2>
        <p className="text-sm text-gray-400 leading-relaxed mb-10">Open to new opportunities, collaborations, and good conversations.</p>
        <div className="flex gap-3 justify-center flex-wrap mb-10">
          {socials.map((s) => (<a key={s.label} href={s.href} rel="noreferrer" className={s.filled ? "text-xs px-5 py-2.5 rounded-full bg-black text-white hover:bg-gray-800 transition-colors" : "text-xs px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors"}>{s.label}</a>))}
        </div>
        <div className="border-t border-gray-100 pt-8">
          <p className="text-xs tracking-widest text-gray-300 uppercase mb-3">Stay in the loop</p>
          {isSignedIn ? (<div><p className="text-sm text-gray-400 mb-2">You&apos;re already subscribed!</p><p className="text-xs text-gray-300">Check your inbox every week.</p></div>) : (<div><p className="text-sm text-gray-400 mb-6">Get weekly updates on what I&apos;m building and writing.</p><a href="/auth" className="inline-block text-sm px-8 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition-colors">Sign up</a></div>)}
        </div>
        <p className="text-xs text-gray-200 mt-6 tracking-wide">Usually responds within 24 hours</p>
      </div>
    </main>
  );
}
