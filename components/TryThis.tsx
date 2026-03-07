"use client";
import { CopyButton } from "./CopyButton";
import { Lightbulb } from "lucide-react";

interface TryThisProps {
  prompts: string[];
  title?: string;
}

export function TryThis({ prompts, title = "Try These Prompts" }: TryThisProps) {
  return (
    <div
      className="my-6 rounded-xl p-5"
      style={{
        background: "rgba(124,58,237,0.06)",
        border: "1px solid rgba(124,58,237,0.2)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb size={16} style={{ color: "#a78bfa" }} />
        <h4 className="font-semibold text-sm" style={{ color: "#a78bfa" }}>
          {title}
        </h4>
      </div>
      <div className="space-y-2">
        {prompts.map((prompt, i) => (
          <div
            key={i}
            className="flex items-start justify-between gap-3 rounded-lg p-3 group"
            style={{
              background: "rgba(9,9,15,0.6)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex gap-2 items-start min-w-0">
              <span style={{ color: "#7c3aed", fontFamily: "monospace", flexShrink: 0 }}>❯</span>
              <code
                className="text-sm break-words"
                style={{
                  color: "#e2e8f0",
                  fontFamily: "var(--font-mono, monospace)",
                }}
              >
                {prompt}
              </code>
            </div>
            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <CopyButton text={prompt} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
