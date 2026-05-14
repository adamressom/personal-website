"use client";

import { useEffect, useRef, useState } from "react";

const phrases = ["Adam Ressom.", "a software engineer.", "a builder."];

const projects = [
  {
    name: "Personal Website",
    desc: "This very site — built with Next.js, Convex & WorkOS",
    tech: ["Next.js", "TypeScript", "Convex", "WorkOS"],
    year: "2026",
    github: "https://github.com/adamressom/personal-website",
    href: "#",
  },
  {
    name: "GmailAI",
    desc: "An AI tool that organizes, summarizes, and prioritizes your Gmail inbox",
    tech: ["Python", "Flask", "Gemini AI", "Gmail API"],
    year: "2026",
    github: "https://github.com/adamressom/GmailAI",
    href: "#",
  },
  {
    name: "Dodge The Falling Blocks",
    desc: "Dodge blocks falling from the sky across increasingly harder levels",
    tech: ["Python", "Pygame"],
    year: "2025",
    github: "https://github.com/adamressom/your-repo-link-here",
    href: "#",
  },
  {
    name: "Ressom Properties",
    desc: "Family-owned real estate development platform for Northern Virginia",
    tech: ["Next.js", "Convex", "WorkOS", "TypeScript"],
    year: "2026",
    github: "",
    href: "#",
  },
];

const experience = [
  {
    year: "2026",
    role: "Incoming Software Engineering Intern",
    place: "SEO Tech · Remote",
    note: "Incoming summer intern focused on full-stack development.",
    tag: "Upcoming",
  },
  {
    year: "2025",
    role: "Software Engineer",
    place: "Freelance · Self-employed",
    note: "Built full-stack applications including Ressom Properties — a real estate platform with auth, database, and live deployment.",
    tag: "Current",
  },
  {
    year: "2021",
    role: "B.S. Computer Science",
    place: "University · Washington D.C.",
    note: "Focus on software engineering and systems. Built several side projects during university.",
    tag: "Education",
  },
];

const skills = ["Next.js", "TypeScript", "React", "Python", "Flask", "Convex", "WorkOS", "Node.js", "Git", "Google Cloud", "Vercel", "Gemini AI"];

function useVisible(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
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
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 72);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), phraseIndex === 0 ? 2200 : 1500);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 36);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1 >= phrases.length ? 1 : i + 1));
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIndex]);

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory" style={{ scrollbarWidth: "none" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap');
        .serif { font-family: 'Cormorant Garamond', serif; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        @keyframes pulse-dot { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        .cursor-blink { animation: pulse-dot 1s infinite; }
      `}</style>

      {/* ─── HERO ─── */}
      <section className="snap-start h-screen flex flex-col justify-center px-16 bg-white relative overflow-hidden">
        {/* subtle background texture */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 20%, #f9f7f4 0%, transparent 60%)", pointerEvents: "none" }} />

        <div className="relative z-10">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <div style={{ width: 28, height: 1, background: "#C4A882" }} />
            <span style={{ fontSize: 11, fontWeight: 500, color: "#8A8078", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "'Outfit', sans-serif" }}>
              Software Engineer · Washington, D.C.
            </span>
          </div>

          <h1 className="serif" style={{ fontSize: "clamp(52px, 7vw, 96px)", fontWeight: 400, lineHeight: 1.05, color: "#0F0F0F", marginBottom: 24, letterSpacing: "-0.02em", minHeight: "1.15em" }}>
            {displayed}
            <span className="cursor-blink" style={{ borderRight: "3px solid #C4A882", marginLeft: 4 }}>&nbsp;</span>
          </h1>

          <p style={{ fontSize: 15, color: "#8A8078", maxWidth: 440, lineHeight: 1.8, marginBottom: 36, fontWeight: 300, fontFamily: "'Outfit', sans-serif" }}>
            I build thoughtful, performant software — from clean interfaces to robust backend systems. Currently open to new opportunities.
          </p>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
            {skills.map((tag) => (
              <span key={tag} style={{ fontSize: 11, padding: "5px 14px", borderRadius: 999, border: "1px solid #EAE4DC", color: "#8A8078", fontFamily: "'Outfit', sans-serif", letterSpacing: "0.02em" }}>{tag}</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <a href="/contact" style={{ fontSize: 13, fontWeight: 500, background: "#0F0F0F", color: "#fff", borderRadius: 10, padding: "12px 28px", textDecoration: "none", fontFamily: "'Outfit', sans-serif" }}>
              Get in touch
            </a>
            <a href="https://github.com/adamressom" target="_blank" rel="noreferrer" style={{ fontSize: 13, background: "transparent", color: "#0F0F0F", border: "1.5px solid #EAE4DC", borderRadius: 10, padding: "12px 28px", textDecoration: "none", fontFamily: "'Outfit', sans-serif" }}>
              GitHub ↗
            </a>
          </div>
        </div>

        <p style={{ position: "absolute", bottom: 32, left: 64, fontSize: 11, color: "#C8C3BC", letterSpacing: "0.12em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 12, fontFamily: "'Outfit', sans-serif" }}>
          <span style={{ width: 28, height: 1, background: "#E0DBD4", display: "inline-block" }} />
          Scroll to explore
        </p>
      </section>

      {/* ─── ABOUT ─── */}
      <section
        ref={aboutRef}
        className="snap-start h-screen flex items-center px-16"
        style={{
          background: "#F8F5F0",
          opacity: aboutVisible ? 1 : 0,
          transform: aboutVisible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.75s ease, transform 0.75s ease",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, width: "100%", maxWidth: 1000 }}>
          <div>
            <div style={{ fontSize: 120, fontWeight: 400, color: "#EAE4DC", lineHeight: 1, fontFamily: "'Cormorant Garamond', serif", marginBottom: 8 }}>01</div>
            <div style={{ fontSize: 11, letterSpacing: "0.14em", color: "#B5A99A", textTransform: "uppercase", fontFamily: "'Outfit', sans-serif" }}>About me</div>

            {/* mini stat cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 36 }}>
              {[
                { n: "3+", l: "Years building" },
                { n: "4", l: "Projects shipped" },
                { n: "D.C.", l: "Based in" },
              ].map((s) => (
                <div key={s.l} style={{ background: "#fff", border: "1px solid #EAE4DC", borderRadius: 14, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 20, fontWeight: 500, fontFamily: "'Cormorant Garamond', serif" }}>{s.n}</span>
                  <span style={{ fontSize: 11, color: "#8A8078", fontFamily: "'Outfit', sans-serif", letterSpacing: "0.04em" }}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, letterSpacing: "-0.01em", color: "#0F0F0F", marginBottom: 20, fontFamily: "'Cormorant Garamond', serif" }}>
              Builder at heart.<br /><em style={{ color: "#C4A882" }}>Focused on craft.</em>
            </h2>
            <p style={{ fontSize: 14, color: "#6B6560", lineHeight: 1.85, marginBottom: 16, fontWeight: 300, fontFamily: "'Outfit', sans-serif" }}>
              I&apos;m a software engineer who loves turning ideas into real products. I care deeply about the details — the ones users notice, and the ones they don&apos;t.
            </p>
            <p style={{ fontSize: 14, color: "#6B6560", lineHeight: 1.85, marginBottom: 32, fontWeight: 300, fontFamily: "'Outfit', sans-serif" }}>
              When I&apos;m not coding, I&apos;m building side projects, exploring new tech, or thinking about what to build next. Currently working on Ressom Properties — a full-stack real estate platform — and open to new opportunities in software engineering.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Full-Stack", "Product-minded", "Detail-oriented", "Open to work"].map((tag) => (
                <span key={tag} style={{ fontSize: 11, padding: "5px 14px", borderRadius: 999, background: "#EDE8E1", color: "#5C4A3A", fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section
        ref={projectsRef}
        className="snap-start h-screen flex items-center px-16"
        style={{
          background: "#0F0F0F",
          opacity: projectsVisible ? 1 : 0,
          transform: projectsVisible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.75s ease, transform 0.75s ease",
        }}
      >
        <div style={{ width: "100%", maxWidth: 900 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
            <div style={{ width: 20, height: 1, background: "#C4A882" }} />
            <span style={{ fontSize: 11, letterSpacing: "0.14em", color: "#4A4540", textTransform: "uppercase", fontFamily: "'Outfit', sans-serif" }}>Current Projects</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {projects.map((project, i) => (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderTop: i === 0 ? "1px solid #1E1E1E" : undefined,
                  borderBottom: "1px solid #1E1E1E",
                  padding: "22px 0",
                  paddingLeft: hovered === i ? 14 : 0,
                  transition: "padding-left 0.22s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 17, fontWeight: 500, color: hovered === i ? "#F8F5F0" : "#fff", fontFamily: "'Outfit', sans-serif", transition: "color 0.2s" }}>{project.name}</span>
                    <span style={{ fontSize: 11, color: "#3A3530", fontFamily: "'Outfit', sans-serif" }}>{project.year}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ fontSize: 11, padding: "5px 14px", borderRadius: 999, border: "1px solid #2A2A2A", color: "#5A5550", textDecoration: "none", fontFamily: "'Outfit', sans-serif", transition: "border-color 0.2s, color 0.2s" }}>
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#4A4540", maxWidth: 400, fontFamily: "'Outfit', sans-serif", lineHeight: 1.6 }}>{project.desc}</span>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end", maxWidth: 320 }}>
                    {project.tech.map((t) => (
                      <span key={t} style={{ fontSize: 10, padding: "3px 10px", borderRadius: 999, border: "1px solid #222", color: "#4A4540", fontFamily: "'Outfit', sans-serif" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESUME / EXPERIENCE ─── */}
      <section
        ref={resumeRef}
        className="snap-start h-screen flex items-center px-16"
        style={{
          background: "#fff",
          opacity: resumeVisible ? 1 : 0,
          transform: resumeVisible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.75s ease, transform 0.75s ease",
        }}
      >
        <div style={{ width: "100%", maxWidth: 860 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 20, height: 1, background: "#C4A882" }} />
                <span style={{ fontSize: 11, letterSpacing: "0.14em", color: "#8A8078", textTransform: "uppercase", fontFamily: "'Outfit', sans-serif" }}>Experience</span>
              </div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: "#0F0F0F", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.01em" }}>Where I&apos;ve worked</h2>
            </div>
            <a href="#" style={{ fontSize: 12, color: "#8A8078", borderBottom: "1px solid #EAE4DC", paddingBottom: 2, textDecoration: "none", fontFamily: "'Outfit', sans-serif" }}>
              Download PDF ↓
            </a>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {experience.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 32, padding: "24px 0", borderBottom: "1px solid #F2EDE8" }}>
                <div style={{ minWidth: 52 }}>
                  <div style={{ fontSize: 12, color: "#B5A99A", fontFamily: "'Outfit', sans-serif" }}>{item.year}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "#0F0F0F", fontFamily: "'Outfit', sans-serif" }}>{item.role}</div>
                    <span style={{ fontSize: 10, padding: "2px 10px", borderRadius: 999, background: item.tag === "Upcoming" ? "#F0F9F0" : item.tag === "Current" ? "#F0F0F9" : "#F9F5F0", color: item.tag === "Upcoming" ? "#2E7D32" : item.tag === "Current" ? "#2E4799" : "#8A6540", fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>{item.tag}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#8A8078", marginBottom: 6, fontFamily: "'Outfit', sans-serif" }}>{item.place}</div>
                  <div style={{ fontSize: 12, color: "#B5A99A", lineHeight: 1.7, fontFamily: "'Outfit', sans-serif', fontWeight: 300" }}>{item.note}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Skills row at bottom */}
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid #F2EDE8", display: "flex", gap: 8, flexWrap: "wrap" }}>
            {skills.map((s) => (
              <span key={s} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 999, border: "1px solid #EAE4DC", color: "#8A8078", fontFamily: "'Outfit', sans-serif" }}>{s}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}