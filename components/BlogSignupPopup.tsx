"use client";

import { useState } from "react";

export default function BlogSignupPopup({ initialShow }: { initialShow: boolean }) {
  const [showPopup, setShowPopup] = useState(initialShow);

  if (!showPopup) return null;

  return (
    <div
      onClick={() => setShowPopup(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#eef4ec]/80 px-5 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xs rounded-3xl border border-[#d4ded2] bg-[#fbfaf3] p-7 text-center"
      >
        <button
          onClick={() => setShowPopup(false)}
          className="absolute right-5 top-4 text-sm text-[#667069] hover:text-[#c45f3a]"
        >
          x
        </button>
        <h3 className="text-lg font-semibold">You&apos;re in!</h3>
        <p className="mt-3 text-xs leading-6 text-[#4f5b53]">
          You&apos;ll get notes on projects, tools, and lessons I can reuse.
        </p>
        <button
          onClick={() => setShowPopup(false)}
          className="mt-6 rounded-full bg-[#20221f] px-4 py-2 text-xs font-semibold lowercase text-[#fbfaf3]"
        >
          got it
        </button>
      </div>
    </div>
  );
}
