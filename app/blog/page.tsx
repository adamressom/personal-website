"use client";

import { useEffect, useState } from "react";

const posts = [
  {
    date: "Mar 2026",
    title: "Why I chose Convex over a traditional database",
    excerpt: "Real-time sync, no boilerplate, and a developer experience that actually makes sense.",
    tag: "Engineering",
    readTime: "5 min",
  },
  {
    date: "Feb 2026",
    title: "Building my personal site from scratch in a weekend",
    excerpt: "The stack, the decisions, and what I'd do differently next time.",
    tag: "Projects",
    readTime: "4 min",
  },
  {
    date: "Jan 2026",
    title: "What I learned shipping my first solo product",
    excerpt: "Lessons on scoping, speed, and knowing when something is good enough.",
    tag: "Thoughts",
    readTime: "6 min",
  },
];

const tagColors: Record<string, { bg: string; color: string }> = {
  Engineering: { bg: "#F0F0F9", color: "#2E4799" },
  Projects: { bg: "#F0F9F0", color: "#2E7D32" },
  Thoughts: { bg: "#F9F5F0", color: "#8A6540" },
};

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
      className="min-h-screen w-full flex items-center px-16"
      style={{
        background: "#F8F5F0",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap');
        .serif { font-family: 'Cormorant Garamond', serif; }
      `}</style>

      {/* Signup success popup */}
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(15,15,15,0.4)", backdropFilter: "blur(6px)" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: 24, padding: "48px 52px", maxWidth: 400, width: "90%", textAlign: "center", position: "relative", border: "1px solid #EAE4DC", boxShadow: "0 32px 80px rgba(15,15,15,0.12)" }}
          >
            <button onClick={() => setShowPopup(false)} style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", fontSize: 18, color: "#B5A99A", cursor: "pointer" }}>✕</button>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🎉</div>
            <h3 style={{ fontSize: 22, fontWeight: 500, color: "#0F0F0F", marginBottom: 10, fontFamily: "'Cormorant Garamond', serif" }}>
              {justSignedUp ? "You're in!" : "Welcome back!"}
            </h3>
            <p style={{ fontSize: 13, color: "#8A8078", lineHeight: 1.7, marginBottom: 24, fontWeight: 300 }}>
              You&apos;ll receive weekly updates on what I&apos;m building, writing, and thinking about.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              style={{ fontSize: 13, fontWeight: 500, padding: "10px 28px", borderRadius: 10, background: "#0F0F0F", color: "#fff", border: "none", cursor: "pointer" }}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <div style={{ width: "100%", maxWidth: 900 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 20, height: 1, background: "#C4A882" }} />
          <span style={{ fontSize: 11, letterSpacing: "0.14em", color: "#8A8078", textTransform: "uppercase" }}>Writing</span>
        </div>
        <h1 className="serif" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: "#0F0F0F", marginBottom: 48, letterSpacing: "-0.01em" }}>
          Things I&apos;ve been<br /><em style={{ color: "#C4A882" }}>thinking about</em>
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {posts.map((post, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? "#fff" : "#FDFAF7",
                border: "1px solid",
                borderColor: hovered === i ? "#C4A882" : "#EAE4DC",
                borderRadius: 18,
                padding: 28,
                cursor: "pointer",
                transition: "all 0.22s ease",
                transform: hovered === i ? "translateY(-3px)" : "none",
                boxShadow: hovered === i ? "0 12px 32px rgba(15,15,15,0.08)" : "none",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 11, color: "#B5A99A", letterSpacing: "0.04em" }}>{post.date}</span>
                <span style={{ fontSize: 10, color: "#B5A99A" }}>{post.readTime} read</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 500, color: "#0F0F0F", lineHeight: 1.4, marginBottom: 10, fontFamily: "'Cormorant Garamond', serif" }}>
                {post.title}
              </h3>
              <p style={{ fontSize: 12, color: "#8A8078", lineHeight: 1.7, marginBottom: 16, fontWeight: 300 }}>
                {post.excerpt}
              </p>
              <span style={{
                display: "inline-block",
                fontSize: 10,
                fontWeight: 500,
                padding: "4px 12px",
                borderRadius: 999,
                background: tagColors[post.tag]?.bg,
                color: tagColors[post.tag]?.color,
              }}>
                {post.tag}
              </span>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 12, color: "#C8C3BC", marginTop: 48, letterSpacing: "0.06em", textAlign: "center" }}>
          More posts coming soon · <a href="/contact" style={{ color: "#C4A882", textDecoration: "none" }}>Subscribe for updates</a>
        </p>
      </div>
    </main>
  );
}