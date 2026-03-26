"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const lastY = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showNav() {
    setShow(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShow(false), 3000);
  }

  useEffect(() => {
    showNav();
  }, [pathname]);

  useEffect(() => {
    const container = document.querySelector("main") as HTMLElement | null;
    const target = container ?? window;

    const handleScroll = () => {
      const currentY = container ? container.scrollTop : window.scrollY;
      if (currentY < lastY.current - 5) {
        showNav();
      } else if (currentY > lastY.current + 5) {
        setShow(false);
        if (hideTimer.current) clearTimeout(hideTimer.current);
      }
      lastY.current = currentY;
    };

    target.addEventListener("scroll", handleScroll, { passive: true });
    return () => target.removeEventListener("scroll", handleScroll);
  }, [pathname]);

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