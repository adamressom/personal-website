"use client";

import { useEffect, useState } from "react";

const experience = [
  {
    year: "2024",
    role: "Software Engineer",
    place: "Company Name · Full-time",
    note: "Built and maintained full-stack features used by thousands of users daily.",
  },
  {
    year: "2023",
    role: "Software Engineer Intern",
    place: "Company Name · Internship",
    note: "Shipped three features end-to-end in a 12-week summer program.",
  },
  {
    year: "2021",
    role: "B.S. Computer Science",
    place: "University of Michigan",
    note: "Graduated with honors. Focus on systems and software engineering.",
  },
];

export default function Resume() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className="min-h-screen w-full flex items-center px-16 bg-white"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}
    >
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-medium tracking-tight text-gray-900">
            Experience
          </h2>
          <span className="text-xs text-gray-300 tracking-wide border-b border-gray-200 pb-px cursor-pointer hover:text-gray-500 transition-colors">
            Download PDF ↓
          </span>
        </div>
        <div className="flex flex-col">
          {experience.map((item, i) => (
            <div key={i} className="flex gap-8 py-6 border-b border-gray-50">
              <div className="text-xs text-gray-300 min-w-[44px] pt-1 tracking-wide">
                {item.year}
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-sm font-medium text-gray-900">{item.role}</div>
                <div className="text-xs text-gray-400">{item.place}</div>
                <div className="text-xs text-gray-300 leading-relaxed mt-1">{item.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}