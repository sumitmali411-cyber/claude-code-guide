"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";

interface ProgressTrackerProps {
  moduleId: string;
  sections: string[];
}

export function ProgressTracker({ moduleId, sections }: ProgressTrackerProps) {
  const key = `progress-${moduleId}`;
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || "[]");
      setCompleted(new Set(saved));
    } catch {}
  }, [key]);

  const toggle = (section: string) => {
    const next = new Set(completed);
    if (next.has(section)) next.delete(section);
    else next.add(section);
    setCompleted(next);
    localStorage.setItem(key, JSON.stringify([...next]));
  };

  const pct = Math.round((completed.size / sections.length) * 100);

  return (
    <div
      className="rounded-xl p-5 mb-8"
      style={{
        background: "var(--card)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm" style={{ color: "#e2e8f0" }}>
          Your Progress
        </h3>
        <span className="text-sm font-bold" style={{ color: "#a78bfa" }}>
          {pct}%
        </span>
      </div>
      <div className="h-1.5 rounded-full mb-4" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div
          className="progress-bar h-1.5 rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="space-y-1.5">
        {sections.map((section) => {
          const done = completed.has(section);
          return (
            <button
              key={section}
              onClick={() => toggle(section)}
              className="flex items-center gap-2.5 w-full text-left px-2 py-1.5 rounded-lg transition-all hover:bg-white/5"
            >
              {done ? (
                <CheckCircle2 size={16} style={{ color: "#7c3aed", flexShrink: 0 }} />
              ) : (
                <Circle size={16} style={{ color: "#334155", flexShrink: 0 }} />
              )}
              <span
                className="text-sm"
                style={{
                  color: done ? "#a78bfa" : "#64748b",
                  textDecoration: done ? "line-through" : "none",
                }}
              >
                {section}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
