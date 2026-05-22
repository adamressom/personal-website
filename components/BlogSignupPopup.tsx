"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function BlogSignupPopup() {
  const searchParams = useSearchParams();
  const subscribed = searchParams.get("subscribed") === "true";
  const [dismissed, setDismissed] = useState(false);
  const showPopup = subscribed && !dismissed;

  const closePopup = () => setDismissed(true);

  if (!showPopup) return null;

  return (
    <div
      onClick={closePopup}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#eef4ec]/80 px-5 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xs rounded-3xl border border-[#d4ded2] bg-[#fbfaf3] p-7 text-center"
      >
        <button
          onClick={closePopup}
          className="absolute right-5 top-4 text-sm text-[#667069] hover:text-[#c45f3a]"
        >
          x
        </button>
        <h3 className="text-lg font-semibold">You&apos;re in!</h3>
        <p className="mt-3 text-xs leading-6 text-[#4f5b53]">
          You&apos;ll get notes on projects, tools, and lessons I can reuse.
        </p>
        <button
          onClick={closePopup}
          className="mt-6 rounded-full bg-[#20221f] px-4 py-2 text-xs font-semibold lowercase text-[#fbfaf3]"
        >
          got it
        </button>
      </div>
    </div>
  );
}
