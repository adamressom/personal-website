"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type BlogImageLightboxProps = {
  src: string;
  alt: string;
  orientation: "wide" | "portrait";
};

export default function BlogImageLightbox({
  src,
  alt,
  orientation,
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

  const frameClass =
    orientation === "portrait"
      ? "mx-auto aspect-[4/5] max-w-[260px]"
      : "mx-auto aspect-[16/9] max-w-md";

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
          fill
          sizes={
            orientation === "portrait"
              ? "260px"
              : "(max-width: 768px) 100vw, 448px"
          }
          className="object-cover"
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
            className={`relative w-full overflow-hidden rounded-2xl ${
              orientation === "portrait"
                ? "h-[min(82vh,760px)] max-w-[608px]"
                : "aspect-[16/9] max-w-5xl"
            }`}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
