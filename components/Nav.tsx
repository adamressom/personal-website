"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 64px",
        background: "rgba(248,245,240,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(234,228,220,0.6)",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: "#0F0F0F",
          textDecoration: "none",
          letterSpacing: "0.04em",
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        AR
      </Link>

      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.label}
              href={l.href}
              style={{
                fontSize: 13,
                color: active ? "#0F0F0F" : "#8A8078",
                textDecoration: "none",
                fontWeight: active ? 600 : 400,
                letterSpacing: "0.02em",
                transition: "color 0.2s ease",
                position: "relative",
              }}
            >
              {l.label}
              {active && (
                <span style={{ position: "absolute", bottom: -4, left: 0, right: 0, height: 1.5, background: "#C4A882", borderRadius: 1 }} />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}