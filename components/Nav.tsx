"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    setShow(true);
    const hideTimer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(hideTimer);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastY - 5) {
        setShow(true);
      } else if (currentY > lastY + 5) {
        setShow(false);
      }
      setLastY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4 bg-white/95 border-b border-gray-100 transition-transform duration-300"
      style={{ transform: show ? "translateY(0)" : "translateY(-100%)" }}
    >
      <Link href="/" className="text-sm font-medium tracking-wide text-gray-900">
        AR
      </Link>
      <div className="flex gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-xs tracking-wide transition-colors duration-200 ${
              pathname === link.href
                ? "text-gray-900"
                : "text-gray-400 hover:text-gray-900"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}