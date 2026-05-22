"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type BlogImageLightboxProps = {
  src: string;
  alt: string;
  orientation: "wide" | "portrait" | "square";
  variant?: "body" | "title";
};

export default function BlogImageLightbox({
  src,
  alt,
  orientation,
  variant = "body",
}: BlogImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const frameClass = (() => {
    if (variant === "title") {
      if (orientation === "wide") return "w-[min(100%,360px)]";
      if (orientation === "portrait") return "w-[min(100%,180px)]";
      return "w-[min(100%,170px)]";
    }

    if (orientation === "portrait") return "mx-auto max-w-[260px]";
    if (orientation === "square") return "mx-auto max-w-[280px]";

    return "mx-auto max-w-md";
  })();

  const previewSize = (() => {
    if (orientation === "wide") return { width: 896, height: 504 };
    if (orientation === "portrait") return { width: 520, height: 650 };
    return { width: 560, height: 560 };
  })();

  const modalSize = (() => {
    if (orientation === "wide") return { width: 1280, height: 720 };
    if (orientation === "portrait") return { width: 760, height: 950 };
    return { width: 900, height: 900 };
  })();

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Open larger view of ${alt}`}
        className={`relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-[#d4ded2] bg-[#fbfaf3] transition hover:border-[#b8c7b6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#386f8f] ${frameClass}`}
      >
        <Image
          src={src}
          alt={alt}
          width={previewSize.width}
          height={previewSize.height}
          sizes={
            variant === "title"
              ? orientation === "wide"
                ? "(max-width: 768px) 100vw, 360px"
                : "180px"
              : orientation === "portrait"
                ? "260px"
                : orientation === "square"
                  ? "280px"
                  : "(max-width: 768px) 100vw, 448px"
          }
          preload={variant === "title"}
          className="h-auto w-full object-cover"
        />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#20221f]/80 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close larger image"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-[#20221f]/70 text-xl text-white transition hover:bg-[#20221f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            x
          </button>

          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-5xl overflow-hidden rounded-2xl"
          >
            <Image
              src={src}
              alt={alt}
              width={modalSize.width}
              height={modalSize.height}
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="mx-auto h-auto max-h-[82vh] w-auto max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
