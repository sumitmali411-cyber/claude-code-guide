"use client";
import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Webhook, ChevronDown } from "lucide-react";

const EVENTS = [
  { value: "PostToolUse", label: "PostToolUse — After a tool call succeeds" },
  { value: "PreToolUse", label: "PreToolUse — Before a tool call (can block)" },
  { value: "Notification", label: "Notification — Claude needs your attention" },
  { value: "SessionStart", label: "SessionStart — When a session begins/resumes" },
  { value: "Stop", label: "Stop — When Claude finishes responding" },
  { value: "UserPromptSubmit", label: "UserPromptSubmit — When you submit a prompt" },
  { value: "PreCompact", label: "PreCompact — Before context compaction" },
];

const MATCHERS: Record<string, { value: string; label: string }[]> = {
  PostToolUse: [
    { value: "Edit|Write", label: "Edit|Write — After file edits" },
    { value: "Bash", label: "Bash — After shell commands" },
    { value: "", label: "(no filter) — Every tool call" },
    { value: "mcp__.*", label: "mcp__.* — Any MCP tool" },
  ],
  PreToolUse: [
    { value: "Edit|Write", label: "Edit|Write — Before file edits" },
    { value: "Bash", label: "Bash — Before shell commands" },
    { value: "", label: "(no filter) — Every tool call" },
  ],
  Notification: [
    { value: "", label: "(no filter) — All notifications" },
    { value: "permission_prompt", label: "permission_prompt — Needs approval" },
    { value: "idle_prompt", label: "idle_prompt — Waiting for your input" },
  ],
  SessionStart: [
    { value: "", label: "(no filter) — Every session start" },
    { value: "compact", label: "compact — After context compaction only" },
    { value: "startup", label: "startup — Fresh sessions only" },
  ],
  Stop: [{ value: "", label: "(no filter) — Every stop" }],
  UserPromptSubmit: [{ value: "", label: "(no filter) — Every prompt" }],
  PreCompact: [
    { value: "", label: "(no filter)" },
    { value: "auto", label: "auto — Automatic compaction only" },
    { value: "manual", label: "manual — Manual /compact only" },
  ],
};

const PRESETS = [
  {
    label: "Desktop notification (macOS)",
    event: "Notification",
    matcher: "",
    command: "osascript -e 'display notification \"Claude needs your attention\" with title \"Claude Code\"'",
  },
  {
    label: "Auto-format with Prettier",
    event: "PostToolUse",
    matcher: "Edit|Write",
    command: "jq -r '.tool_input.file_path' | xargs npx prettier --write",
  },
  {
    label: "Run ESLint after edits",
    event: "PostToolUse",
    matcher: "Edit|Write",
    command: "jq -r '.tool_input.file_path' | xargs npx eslint --fix",
  },
  {
    label: "Log all bash commands",
    event: "PostToolUse",
    matcher: "Bash",
    command: "jq -r '.tool_input.command' >> ~/.claude/command-log.txt",
  },
  {
    label: "Re-inject context after compact",
    event: "SessionStart",
    matcher: "compact",
    command: "echo 'Reminder: use pnpm. Run pnpm test before committing.'",
  },
  {
    label: "Block .env edits",
    event: "PreToolUse",
    matcher: "Edit|Write",
    command: `bash -c 'FILE=$(jq -r ".tool_input.file_path"); [[ "$FILE" == *".env"* ]] && echo "Blocked: .env" >&2 && exit 2 || exit 0'`,
  },
];

const SCOPES = [
  { value: "user", label: "~/.claude/settings.json (all projects)" },
  { value: "project", label: ".claude/settings.json (this project, shared)" },
  { value: "local", label: ".claude/settings.local.json (this project, private)" },
];

function Select({ value, onChange, children }: { value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg px-3 py-2.5 pr-8 text-sm outline-none"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#e2e8f0",
          cursor: "pointer",
        }}
      >
        {children}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#64748b" }} />
    </div>
  );
}

export default function HookBuilderPage() {
  const [event, setEvent] = useState("PostToolUse");
  const [matcher, setMatcher] = useState("Edit|Write");
  const [command, setCommand] = useState("jq -r '.tool_input.file_path' | xargs npx prettier --write");
  const [scope, setScope] = useState("project");

  const applyPreset = (p: (typeof PRESETS)[number]) => {
    setEvent(p.event);
    setMatcher(p.matcher);
    setCommand(p.command);
  };

  const generate = () => {
    const hookObj = {
      hooks: {
        [event]: [
          {
            matcher,
            hooks: [{ type: "command", command }],
          },
        ],
      },
    };
    return JSON.stringify(hookObj, null, 2);
  };

  const scopeLabel = SCOPES.find((s) => s.value === scope)?.label || "";
  const output = generate();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="aurora-bg fixed inset-0 pointer-events-none opacity-30" style={{ zIndex: 0 }}>
        <div className="aurora-1" /><div className="aurora-2" />
      </div>
      <div className="relative" style={{ zIndex: 1 }}>
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-2">
            <Webhook size={24} style={{ color: "#7c3aed" }} />
            <h1 className="text-2xl font-extrabold" style={{ color: "#e2e8f0" }}>Hook Builder</h1>
          </div>
          <p className="mb-8" style={{ color: "#64748b" }}>
            Configure a hook visually → get the settings.json snippet
          </p>
        </AnimatedSection>

        {/* Presets */}
        <AnimatedSection>
          <div className="mb-6">
            <div className="text-sm font-semibold mb-3" style={{ color: "#a78bfa" }}>Quick Presets</div>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => applyPreset(p)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={{
                    background: "rgba(124,58,237,0.1)",
                    border: "1px solid rgba(124,58,237,0.25)",
                    color: "#c4b5fd",
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Config panel */}
          <div className="flex-1 space-y-4">
            <AnimatedSection>
              <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#e2e8f0" }}>
                  Hook Event
                </label>
                <Select value={event} onChange={(v) => { setEvent(v); setMatcher(MATCHERS[v]?.[0]?.value ?? ""); }}>
                  {EVENTS.map((e) => <option key={e.value} value={e.value}>{e.label}</option>)}
                </Select>
                <p className="text-xs mt-2" style={{ color: "#64748b" }}>
                  When should this hook fire?
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={80}>
              <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#e2e8f0" }}>
                  Matcher (filter)
                </label>
                <Select value={matcher} onChange={setMatcher}>
                  {(MATCHERS[event] || []).map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </Select>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    value={matcher}
                    onChange={(e) => setMatcher(e.target.value)}
                    className="flex-1 rounded-lg px-3 py-2 text-xs outline-none font-mono"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#c4b5fd",
                    }}
                    placeholder="Custom regex matcher..."
                  />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={120}>
              <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#e2e8f0" }}>
                  Shell Command
                </label>
                <textarea
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg px-3 py-2 text-xs outline-none resize-none font-mono"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#e2e8f0",
                  }}
                  placeholder="Your shell command..."
                />
                <div className="mt-2 space-y-1">
                  <p className="text-xs" style={{ color: "#64748b" }}>Hook receives event JSON on stdin. Exit codes:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { code: "exit 0", meaning: "Allow" },
                      { code: "exit 2", meaning: "Block (write reason to stderr)" },
                      { code: "other", meaning: "Allow + log error" },
                    ].map(({ code, meaning }) => (
                      <span key={code} className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(124,58,237,0.1)", color: "#a78bfa" }}>
                        <code style={{ fontFamily: "monospace" }}>{code}</code> = {meaning}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={160}>
              <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#e2e8f0" }}>Save Location</label>
                <Select value={scope} onChange={setScope}>
                  {SCOPES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </Select>
              </div>
            </AnimatedSection>
          </div>

          {/* Output panel */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="lg:sticky lg:top-8">
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(124,58,237,0.3)" }}>
                <div className="flex items-center justify-between px-4 py-3"
                  style={{ background: "rgba(124,58,237,0.1)", borderBottom: "1px solid rgba(124,58,237,0.2)" }}>
                  <div className="text-xs font-mono" style={{ color: "#a78bfa" }}>
                    {scopeLabel.split("(")[0].trim()}
                  </div>
                  <CopyButton text={output} />
                </div>
                <pre
                  style={{
                    padding: "16px",
                    margin: 0,
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.75rem",
                    lineHeight: "1.65",
                    color: "#c9d1d9",
                    background: "#0a0a12",
                    maxHeight: "60vh",
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {output}
                </pre>
              </div>
              <div className="mt-3 rounded-lg p-3 text-xs"
                style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)", color: "#a78bfa" }}>
                <strong>To apply:</strong> merge this into <code style={{ fontFamily: "monospace" }}>{scopeLabel.split(" ")[0]}</code>.
                Then run <code style={{ fontFamily: "monospace" }}>/hooks</code> in Claude Code to reload.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
