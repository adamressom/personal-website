"use client";

import { useEffect, useState } from "react";

const socials = [
  { label: "email", href: "mailto:aressom@umich.edu" },
  { label: "linkedin", href: "https://linkedin.com/in/adam-ressom" },
  { label: "github", href: "https://github.com/adamressom" },
  { label: "instagram", href: "https://www.instagram.com/adamressom" },
];

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const cookies = document.cookie.split(";").map((c) => c.trim());
      const signedIn = cookies.some((c) => c.startsWith("is_signed_in="));
      setIsSignedIn(signedIn);
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className="min-h-screen bg-[#eef4ec] px-4 pb-20 pt-16 text-[#20221f]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}
    >
      <section className="mx-auto max-w-2xl text-center">
        <p className="mono-font mx-auto w-fit rounded-full border border-[#d4ded2] bg-[#fbfaf3] px-3 py-1 text-[10px] lowercase tracking-[0.18em] text-[#386f8f]">
          open channel
        </p>
        <h1 className="mt-8 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          Contact
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#4f5b53]">
          Send internship leads, project ideas, or direct questions. Short
          messages work best.
        </p>
        <div className="mx-auto mt-7 flex w-fit flex-wrap justify-center gap-2 text-[12px] font-medium lowercase">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              rel="noreferrer"
              className="rounded-full bg-[#fbfaf3] px-3 py-1.5 text-[#20221f] ring-1 ring-[#d4ded2] hover:text-[#c45f3a]"
            >
              {s.label}
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-2xl rounded-[28px] border border-[#d4ded2] bg-[#fbfaf3] p-5 text-center shadow-[0_24px_80px_rgba(57,70,61,0.08)]">
        <div className="mx-auto max-w-md">
          {isSignedIn ? (
            <div>
              <h2 className="text-base font-semibold">
                You&apos;re already in.
              </h2>
              <p className="mt-3 text-xs leading-6 text-[#4f5b53]">
                You will get short notes on projects, tools, and lessons.
              </p>
              <svg
                aria-hidden="true"
                className="smiley mx-auto mt-6"
                viewBox="0 0 96 72"
                fill="none"
              >
                <circle
                  className="smiley-eye smiley-eye-wink"
                  cx="30"
                  cy="22"
                  r="5"
                />
                <circle className="smiley-eye" cx="66" cy="22" r="5" />
                <path
                  className="smiley-mouth"
                  d="M24 39C28 50 36 56 48 56C60 56 68 50 72 39"
                />
              </svg>
            </div>
          ) : (
            <div>
              <p className="mono-font text-[10px] uppercase tracking-[0.16em] text-[#c45f3a]">
                tiny newsletter
              </p>
              <h2 className="mt-3 text-base font-semibold">
                Get the notes.
              </h2>
              <p className="mt-3 text-xs leading-6 text-[#4f5b53]">
                Get short updates on what I build, read, and learn.
              </p>
              <a
                href="/auth"
                className="mt-5 inline-block rounded-full bg-[#20221f] px-4 py-2 text-xs font-semibold lowercase text-[#fbfaf3] hover:bg-[#386f8f]"
              >
                sign up
              </a>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .smiley {
          display: block;
          width: 96px;
          height: 72px;
        }

        .smiley-eye {
          fill: #20221f;
        }

        .smiley-eye-wink {
          transform-box: fill-box;
          transform-origin: center;
          animation: wink 2s ease-in-out infinite;
        }

        .smiley-mouth {
          stroke: #20221f;
          stroke-width: 4;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        @keyframes wink {
          0%,
          72%,
          86%,
          100% {
            transform: scaleY(1);
          }

          78%,
          82% {
            transform: scaleY(0.12);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .smiley-eye-wink {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
