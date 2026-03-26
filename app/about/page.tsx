"use client";

import { useEffect, useState } from "react";

export default function About() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className="min-h-screen w-full flex items-center px-16 bg-white"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}
    >
      <div className="grid grid-cols-2 gap-24 w-full max-w-5xl">
        <div className="flex flex-col gap-4">
          <span className="text-8xl font-medium text-gray-100 leading-none tracking-tight">About Me</span>
        </div>
        <div>
          <h2 className="text-3xl font-medium tracking-tight text-gray-900 mb-6">
            Builder at heart.
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            I'm a software engineer who loves turning ideas into real products. I care deeply about the details — the ones users notice, and the ones they don't.
          </p>
          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            When I'm not coding, you'll find me exploring new tech, working on side projects, or figuring out what to build next.
          </p>
          <div className="flex gap-10 pt-6 border-t border-gray-100">
            <div>
              <div className="text-2xl font-medium text-gray-900">3+</div>
              <div className="text-xs text-gray-300 tracking-wide mt-1">Years building</div>
            </div>
            <div>
              <div className="text-2xl font-medium text-gray-900">12</div>
              <div className="text-xs text-gray-300 tracking-wide mt-1">Projects shipped</div>
            </div>
            <div>
              <div className="text-2xl font-medium text-gray-900">∞</div>
              <div className="text-xs text-gray-300 tracking-wide mt-1">Things to learn</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}