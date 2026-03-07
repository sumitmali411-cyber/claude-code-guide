"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs transition-all ${className}`}
      style={{
        background: copied ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)",
        color: copied ? "#86efac" : "#64748b",
        border: `1px solid ${copied ? "rgba(34,197,94,0.3)" : "transparent"}`,
      }}
      title="Copy to clipboard"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
