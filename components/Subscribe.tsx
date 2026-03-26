"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const subscribe = useMutation(api.subscribers.subscribe);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await subscribe({ email });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-100">
      <p className="text-xs tracking-widest text-gray-300 uppercase mb-4">
        Stay in the loop
      </p>
      <p className="text-sm text-gray-400 mb-5">
        Get weekly updates on what I&apos;m building and writing.
      </p>
      {status === "success" ? (
        <p className="text-sm text-gray-500">You&apos;re subscribed! Talk soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-sm px-4 py-2 border border-gray-200 rounded-full outline-none focus:border-gray-400 transition-colors w-64"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="text-xs px-5 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-xs text-red-400 mt-2">Something went wrong. Try again!</p>
      )}
    </div>
  );
}