"use client";
import { CopyButton } from "@/components/CopyButton";
import { FileText, Printer } from "lucide-react";

const CLAUDE_MD_TEMPLATE = `# <project-name> — CLAUDE.md

## Commands
- Install: <package-manager> install
- Dev: <package-manager> run dev
- Test (single): <package-manager> test <pattern>
- Build: <package-manager> run build
- Typecheck: npx tsc --noEmit

## Code Style
- <language conventions>
- <formatting rules>

## Architecture
- <key directory structure>
- <important patterns>

## Git
- <branch naming>
- <commit format>

## Important
- NEVER commit .env files
- Run lint before committing`;

interface Section {
  title: string;
  items: { label: string; value: string }[];
}

const SECTIONS: Section[] = [
  {
    title: "Start / Navigate",
    items: [
      { label: "Start interactive session", value: "claude" },
      { label: "One-off task", value: 'claude "task description"' },
      { label: "One-off query + exit", value: 'claude -p "query"' },
      { label: "Continue last session", value: "claude -c" },
      { label: "Resume by name", value: "claude --resume <name>" },
      { label: "Pipe data in", value: 'cat file.txt | claude -p "analyze this"' },
    ],
  },
  {
    title: "Inside a Session",
    items: [
      { label: "Show all commands", value: "/help" },
      { label: "Clear context", value: "/clear" },
      { label: "Compact (summarize)", value: "/compact" },
      { label: "Name this session", value: "/rename <name>" },
      { label: "Rewind to checkpoint", value: "/rewind  (or Esc Esc)" },
      { label: "View CLAUDE.md files", value: "/memory" },
      { label: "Generate CLAUDE.md", value: "/init" },
      { label: "Configure hooks", value: "/hooks" },
      { label: "Switch model", value: "/model" },
      { label: "View context usage", value: "/context" },
    ],
  },
  {
    title: "Permission Modes (Shift+Tab to cycle)",
    items: [
      { label: "Normal Mode", value: "Ask before all actions" },
      { label: "Auto-Accept Mode", value: "Auto-approves file edits (⏵⏵)" },
      { label: "Plan Mode", value: "Read-only, no changes (⏸)" },
      { label: "Start in Plan Mode", value: "claude --permission-mode plan" },
    ],
  },
  {
    title: "Keyboard Shortcuts",
    items: [
      { label: "Cycle permission mode", value: "Shift+Tab" },
      { label: "Stop Claude mid-action", value: "Esc" },
      { label: "Open rewind menu", value: "Esc Esc" },
      { label: "Open plan in editor", value: "Ctrl+G" },
      { label: "Toggle verbose mode", value: "Ctrl+O" },
      { label: "Toggle thinking", value: "Alt+T (Win) / Option+T (Mac)" },
      { label: "Show shortcuts", value: "?" },
    ],
  },
  {
    title: "Built-in Skills",
    items: [
      { label: "Simplify changed code", value: "/simplify" },
      { label: "Large-scale parallel changes", value: "/batch <instruction>" },
      { label: "Debug current session", value: "/debug" },
      { label: "Load Claude API reference", value: "/claude-api" },
    ],
  },
  {
    title: "Git Worktrees",
    items: [
      { label: "New isolated session", value: "claude --worktree feature-name" },
      { label: "Auto-name worktree", value: "claude --worktree" },
      { label: "Ignore worktrees", value: "echo '.claude/worktrees/' >> .gitignore" },
    ],
  },
  {
    title: "Non-Interactive (CI / Scripts)",
    items: [
      { label: "JSON output", value: 'claude -p "query" --output-format json' },
      { label: "Streaming JSON", value: 'claude -p "query" --output-format stream-json' },
      { label: "Restrict tools", value: 'claude -p "task" --allowedTools "Edit,Bash(git *)"' },
      { label: "Plan Mode headless", value: 'claude --permission-mode plan -p "analyze"' },
    ],
  },
  {
    title: "Useful Prompt Patterns",
    items: [
      { label: "Deep reasoning", value: '"ultrathink: <complex problem>"' },
      { label: "Reference a file", value: '"explain @src/utils/auth.ts"' },
      { label: "Ask Claude to verify", value: '"...run tests and fix any failures"' },
      { label: "Delegate research", value: '"use a subagent to investigate..."' },
      { label: "Ask with interview", value: '"interview me about this feature using AskUserQuestion"' },
    ],
  },
];

function Table({ section }: { section: Section }) {
  return (
    <div className="mb-6 break-inside-avoid">
      <div
        className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-t-lg"
        style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa", letterSpacing: "0.1em" }}
      >
        {section.title}
      </div>
      <div className="rounded-b-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)", borderTop: "none" }}>
        {section.items.map((item, i) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-4 px-3 py-2 group"
            style={{
              background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
              borderBottom: i < section.items.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
            }}
          >
            <span className="text-xs" style={{ color: "#94a3b8", flexShrink: 0, minWidth: "140px" }}>{item.label}</span>
            <code
              className="text-xs font-mono ml-auto text-right"
              style={{ color: "#c4b5fd", wordBreak: "break-all" }}
            >
              {item.value}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CheatsheetPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText size={24} style={{ color: "#7c3aed" }} />
          <div>
            <h1 className="text-2xl font-extrabold" style={{ color: "#e2e8f0" }}>Cheat Sheet</h1>
            <p className="text-sm" style={{ color: "#64748b" }}>Quick reference for Claude Code</p>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all print:hidden"
          style={{
            background: "rgba(124,58,237,0.15)",
            border: "1px solid rgba(124,58,237,0.3)",
            color: "#a78bfa",
            cursor: "pointer",
          }}
        >
          <Printer size={14} />
          Print / Save PDF
        </button>
      </div>

      {/* Commands grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {SECTIONS.map((section) => (
          <Table key={section.title} section={section} />
        ))}
      </div>

      {/* CLAUDE.md template */}
      <div className="rounded-xl overflow-hidden mb-8" style={{ border: "1px solid rgba(124,58,237,0.3)" }}>
        <div className="flex items-center justify-between px-4 py-3"
          style={{ background: "rgba(124,58,237,0.1)", borderBottom: "1px solid rgba(124,58,237,0.2)" }}>
          <div>
            <span className="text-sm font-semibold" style={{ color: "#a78bfa" }}>CLAUDE.md Template</span>
            <span className="text-xs ml-2" style={{ color: "#64748b" }}>Copy → customize → save as CLAUDE.md in project root</span>
          </div>
          <CopyButton text={CLAUDE_MD_TEMPLATE} />
        </div>
        <pre
          style={{
            padding: "16px",
            margin: 0,
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.8rem",
            lineHeight: "1.7",
            color: "#c9d1d9",
            background: "#0a0a12",
            whiteSpace: "pre-wrap",
          }}
        >
          {CLAUDE_MD_TEMPLATE}
        </pre>
      </div>

      {/* Hook events quick ref */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="px-4 py-3 text-sm font-semibold" style={{ background: "rgba(255,255,255,0.04)", color: "#e2e8f0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          Hook Events Quick Reference
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
          {[
            { event: "PreToolUse", use: "Block dangerous commands" },
            { event: "PostToolUse", use: "Format/lint after edits" },
            { event: "Notification", use: "Desktop alerts" },
            { event: "SessionStart", use: "Re-inject context after compact" },
            { event: "Stop", use: "Quality checks after response" },
            { event: "ConfigChange", use: "Audit settings changes" },
          ].map(({ event, use }) => (
            <div key={event} className="px-4 py-3">
              <code className="text-xs block mb-0.5" style={{ color: "#c4b5fd", fontFamily: "monospace" }}>{event}</code>
              <span className="text-xs" style={{ color: "#64748b" }}>{use}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .aurora-bg, nav, aside, footer { display: none !important; }
        }
      `}</style>
    </div>
  );
}
