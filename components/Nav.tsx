"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { label: "home", href: "/" },
  { label: "blogs", href: "/blogs" },
  { label: "contact", href: "/contact" },
];

function getInitial(email: string) {
  return email.trim().charAt(0).toUpperCase();
}

export default function Nav() {
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const isSignedIn = Boolean(userEmail);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      try {
        const response = await fetch("/api/me");
        if (!response.ok) return;

        const data: { email?: string | null } = await response.json();
        if (active) setUserEmail(data.email ?? null);
      } catch {
        if (active) setUserEmail(null);
      }
    }

    loadUser();

    return () => {
      active = false;
    };
  }, []);

  return (
    <header className="sticky left-0 right-0 top-0 z-50 px-4 py-4">
      <nav className="mx-auto flex max-w-2xl items-center justify-between rounded-full border border-[#d4ded2] bg-[#fbfaf3]/85 px-4 py-2 backdrop-blur">
        <Link
          href="/"
          className="mono-font text-[11px] font-semibold lowercase tracking-[0.12em] text-[#20221f]"
          aria-label="Adam Ressom home"
        >
          adamressom.dev
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.label}
                href={l.href}
                className={`text-xs font-medium lowercase transition-colors ${
                  active
                    ? "text-[#c45f3a]"
                    : "text-[#667069] hover:text-[#20221f]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          {isSignedIn ? (
            <div
              className="flex max-w-[150px] items-center gap-2 rounded-full border border-[#d4ded2] bg-[#eef4ec] py-1 pl-1 pr-2 text-[#20221f]"
              title={userEmail ?? undefined}
              aria-label={`Signed in as ${userEmail}`}
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#20221f] text-[10px] font-semibold text-[#fbfaf3]">
                {getInitial(userEmail!)}
              </span>
              <span className="hidden truncate text-[11px] font-medium lowercase text-[#4f5b53] sm:block">
                {userEmail}
              </span>
            </div>
          ) : (
            <Link
              href="/auth"
              className="rounded-full bg-[#20221f] px-3 py-1.5 text-[11px] font-semibold lowercase text-[#fbfaf3] transition-colors hover:bg-[#386f8f]"
            >
              sign up
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
