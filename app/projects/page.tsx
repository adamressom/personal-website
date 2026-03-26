"use client";

import { useEffect, useState } from "react";

const projects = [
  { name: "Personal website", desc: "This very site — built with Next.js, Convex & WorkOS", tech: "Next.js", year: "2026" },
  { name: "Project two", desc: "A short punchy description of what this does", tech: "React", year: "2025" },
  { name: "Project three", desc: "A short punchy description of what this does", tech: "TypeScript", year: "2025" },
  { name: "Project four", desc: "A short punchy description of what this does", tech: "Node.js", year: "2024" },
];

export default function Projects() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className="min-h-screen w-full flex items-center px-16 bg-black"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}
    >
      <div className="w-full max-w-4xl">
        <p className="text-xs tracking-widest text-gray-600 uppercase mb-8">
          02 — Selected work
        </p>
        <div className="flex flex-col">
          {projects.map((project, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-5 border-b border-gray-800 cursor-pointer"
              style={{
                borderTop: i === 0 ? "1px solid #1f1f1f" : undefined,
                paddingLeft: hovered === i ? "1rem" : "0",
                transition: "padding-left 0.22s ease",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex flex-col gap-1">
                <span className="text-lg font-medium text-white">{project.name}</span>
                <span className="text-xs text-gray-600">{project.desc}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xs text-gray-700 tracking-wide">{project.tech}</span>
                <span className="text-xs text-gray-700">{project.year}</span>
                <span style={{ color: hovered === i ? "#fff" : "#374151", transform: hovered === i ? "translateX(4px)" : "none", transition: "all 0.2s ease" }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}