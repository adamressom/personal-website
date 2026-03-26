"use client";

import { useEffect, useRef, useState } from "react";

const phrases = ["Adam Ressom.", "a software engineer.", "a builder."];

const projects = [
  { name: "Personal website", desc: "This very site — built with Next.js, Convex & WorkOS", tech: "Next.js", year: "2026" },
  { name: "Project two", desc: "A short punchy description of what this does", tech: "React", year: "2025" },
  { name: "Project three", desc: "A short punchy description of what this does", tech: "TypeScript", year: "2025" },
  { name: "Project four", desc: "A short punchy description of what this does", tech: "Node.js", year: "2024" },
];

const experience = [
  { year: "2024", role: "Software Engineer", place: "Company Name · Full-time", note: "Built and maintained full-stack features used by thousands of users daily." },
  { year: "2023", role: "Software Engineer Intern", place: "Company Name · Internship", note: "Shipped three features end-to-end in a 12-week summer program." },
  { year: "2021", role: "B.S. Computer Science", place: "University of Michigan", note: "Graduated with honors. Focus on systems and software engineering." },
];

function useVisible(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return visible;
}

export default function Home() {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const resumeRef = useRef<HTMLElement>(null);

  const aboutVisible = useVisible(aboutRef);
  const projectsVisible = useVisible(projectsRef);
  const resumeVisible = useVisible(resumeRef);

  useEffect(() => {
    const current = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), phraseIndex === 0 ? 2000 : 1400);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIndex((i) => i + 1 >= phrases.length ? 1 : i + 1);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIndex]);

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory" style={{ scrollbarWidth: "none" }}>

      {/* HOME */}
      <section className="snap-start h-screen flex flex-col justify-center px-16 bg-white">
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
            <span key={tag} className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-400">
              {tag}
            </span>
          ))}
        </div>
        <p className="absolute bottom-8 left-16 text-xs text-gray-300 tracking-widest flex items-center gap-3">
          <span className="w-7 h-px bg-gray-200 inline-block" />
          Scroll to explore
        </p>
      </section>

      {/* ABOUT */}
      <section
        ref={aboutRef}
        className="snap-start h-screen flex items-center px-16 bg-gray-50"
        style={{ opacity: aboutVisible ? 1 : 0, transform: aboutVisible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
      >
        <div className="grid grid-cols-2 gap-24 w-full max-w-5xl">
          <div className="flex flex-col gap-4">
            <span className="text-8xl font-medium text-gray-100 leading-none tracking-tight">01</span>
            <span className="text-xs tracking-widest text-gray-300 uppercase">About me</span>
          </div>
          <div>
            <h2 className="text-3xl font-medium tracking-tight text-gray-900 mb-6">Builder at heart.</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              I&apos;m a software engineer who loves turning ideas into real products. I care deeply about the details — the ones users notice, and the ones they don&apos;t.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              When I&apos;m not coding, you&apos;ll find me exploring new tech, working on side projects, or figuring out what to build next.
            </p>
            <div className="flex gap-10 pt-6 border-t border-gray-200">
              <div><div className="text-2xl font-medium text-gray-900">3+</div><div className="text-xs text-gray-300 tracking-wide mt-1">Years building</div></div>
              <div><div className="text-2xl font-medium text-gray-900">12</div><div className="text-xs text-gray-300 tracking-wide mt-1">Projects shipped</div></div>
              <div><div className="text-2xl font-medium text-gray-900">∞</div><div className="text-xs text-gray-300 tracking-wide mt-1">Things to learn</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        ref={projectsRef}
        className="snap-start h-screen flex items-center px-16 bg-black"
        style={{ opacity: projectsVisible ? 1 : 0, transform: projectsVisible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
      >
        <div className="w-full max-w-4xl">
          <p className="text-xs tracking-widest text-gray-600 uppercase mb-8">02 — Selected work</p>
          <div className="flex flex-col">
            {projects.map((project, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-5 border-b border-gray-800 cursor-pointer"
                style={{ borderTop: i === 0 ? "1px solid #1f1f1f" : undefined, paddingLeft: hovered === i ? "1rem" : "0", transition: "padding-left 0.22s ease" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-medium text-white">{project.name}</span>
                  <span className="text-xs text-gray-600">{project.desc}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs text-gray-700">{project.tech}</span>
                  <span className="text-xs text-gray-700">{project.year}</span>
                  <span style={{ color: hovered === i ? "#fff" : "#374151", transform: hovered === i ? "translateX(4px)" : "none", transition: "all 0.2s ease" }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESUME */}
      <section
        ref={resumeRef}
        className="snap-start h-screen flex items-center px-16 bg-white"
        style={{ opacity: resumeVisible ? 1 : 0, transform: resumeVisible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
      >
        <div className="w-full max-w-3xl">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-medium tracking-tight text-gray-900">Experience</h2>
            <span className="text-xs text-gray-300 tracking-wide border-b border-gray-200 pb-px cursor-pointer hover:text-gray-500 transition-colors">Download PDF ↓</span>
          </div>
          <div className="flex flex-col">
            {experience.map((item, i) => (
              <div key={i} className="flex gap-8 py-6 border-b border-gray-50">
                <div className="text-xs text-gray-300 min-w-[44px] pt-1">{item.year}</div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium text-gray-900">{item.role}</div>
                  <div className="text-xs text-gray-400">{item.place}</div>
                  <div className="text-xs text-gray-300 leading-relaxed mt-1">{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}