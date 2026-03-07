"use client";
import { useState } from "react";
import { CodeBlock } from "./CodeBlock";

interface OsTab {
  label: string;
  code: string;
  lang?: string;
}

interface OsTabsProps {
  tabs: OsTab[];
  defaultTab?: number;
}

export function OsTabs({ tabs, defaultTab = 0 }: OsTabsProps) {
  const [active, setActive] = useState(defaultTab);

  return (
    <div className="my-4">
      <div className="flex gap-1 mb-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className="px-4 py-2 text-sm font-medium transition-all relative"
            style={{
              color: active === i ? "#a78bfa" : "#64748b",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              borderBottom: active === i ? "2px solid #7c3aed" : "2px solid transparent",
              marginBottom: "-1px",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <CodeBlock
        code={tabs[active].code}
        lang={tabs[active].lang || "bash"}
        label={tabs[active].label}
      />
    </div>
  );
}
