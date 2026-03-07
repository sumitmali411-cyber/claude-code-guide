"use client";
import { useState, useMemo } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CopyButton } from "@/components/CopyButton";
import { Search, Terminal } from "lucide-react";

interface Command {
  cmd: string;
  desc: string;
  example?: string;
  category: string;
}

const COMMANDS: Command[] = [
  // CLI
  { category: "CLI", cmd: "claude", desc: "Start interactive session", example: "claude" },
  { category: "CLI", cmd: 'claude "task"', desc: "Run a one-time task without interactive session", example: 'claude "fix the build error"' },
  { category: "CLI", cmd: "claude -p \"query\"", desc: "One-off query, print result and exit", example: 'claude -p "explain this function"' },
  { category: "CLI", cmd: "claude -c", desc: "Continue most recent conversation in current directory", example: "claude -c" },
  { category: "CLI", cmd: "claude -r", desc: "Resume a previous conversation (opens picker)", example: "claude -r" },
  { category: "CLI", cmd: "claude --resume <name>", desc: "Resume a named session directly", example: "claude --resume auth-refactor" },
  { category: "CLI", cmd: "claude --continue", desc: "Continue the most recent conversation", example: "claude --continue" },
  { category: "CLI", cmd: "claude --from-pr <number>", desc: "Resume session linked to a pull request", example: "claude --from-pr 123" },
  { category: "CLI", cmd: "claude --worktree [name]", desc: "Start Claude in a new isolated git worktree", example: "claude --worktree feature-auth" },
  { category: "CLI", cmd: "claude --permission-mode plan", desc: "Start session in read-only Plan Mode", example: "claude --permission-mode plan" },
  { category: "CLI", cmd: "claude --permission-mode auto-edit", desc: "Start with Auto-Accept Mode (auto-approves edits)", example: "" },
  { category: "CLI", cmd: "claude --dangerously-skip-permissions", desc: "Skip all permission prompts (use in sandboxed envs only)", example: "" },
  { category: "CLI", cmd: "claude --output-format json", desc: "Output as JSON (use with -p)", example: 'claude -p "list endpoints" --output-format json' },
  { category: "CLI", cmd: "claude --output-format stream-json", desc: "Output streaming JSON in real-time", example: 'cat log.txt | claude -p "parse errors" --output-format stream-json' },
  { category: "CLI", cmd: "claude --allowedTools \"Edit,Bash(git *)\"", desc: "Restrict which tools Claude can use", example: "" },
  { category: "CLI", cmd: "claude --verbose", desc: "Show detailed output including thinking", example: "" },
  { category: "CLI", cmd: "claude mcp add", desc: "Add an MCP server interactively", example: "claude mcp add" },
  { category: "CLI", cmd: "claude mcp list", desc: "List configured MCP servers", example: "claude mcp list" },
  { category: "CLI", cmd: "claude mcp remove <name>", desc: "Remove an MCP server", example: "claude mcp remove github" },
  // Slash commands
  { category: "Slash", cmd: "/help", desc: "Show all available commands and shortcuts", example: "/help" },
  { category: "Slash", cmd: "/clear", desc: "Clear conversation history and reset context", example: "/clear" },
  { category: "Slash", cmd: "/compact", desc: "Compress conversation history to save context space", example: "/compact" },
  { category: "Slash", cmd: "/compact <instructions>", desc: "Compact with custom focus instructions", example: "/compact Focus on the API changes only" },
  { category: "Slash", cmd: "/resume", desc: "Open session picker or resume by name", example: "/resume auth-refactor" },
  { category: "Slash", cmd: "/rename <name>", desc: "Give current session a descriptive name", example: "/rename oauth-migration" },
  { category: "Slash", cmd: "/rewind", desc: "Open rewind menu to restore previous state", example: "/rewind" },
  { category: "Slash", cmd: "/memory", desc: "View and manage CLAUDE.md and auto memory files", example: "/memory" },
  { category: "Slash", cmd: "/init", desc: "Generate a starter CLAUDE.md for the current project", example: "/init" },
  { category: "Slash", cmd: "/model", desc: "Change model or adjust effort level", example: "/model" },
  { category: "Slash", cmd: "/login", desc: "Log in or switch accounts", example: "/login" },
  { category: "Slash", cmd: "/hooks", desc: "Configure hooks interactively", example: "/hooks" },
  { category: "Slash", cmd: "/agents", desc: "View and create custom sub-agents", example: "/agents" },
  { category: "Slash", cmd: "/permissions", desc: "Configure allowed/denied tools and commands", example: "/permissions" },
  { category: "Slash", cmd: "/config", desc: "Toggle settings like thinking mode", example: "/config" },
  { category: "Slash", cmd: "/context", desc: "View context window usage", example: "/context" },
  { category: "Slash", cmd: "/statusline", desc: "Configure the status bar display", example: "/statusline" },
  { category: "Slash", cmd: "/simplify", desc: "Review changed files for quality and fix issues", example: "/simplify" },
  { category: "Slash", cmd: "/batch <instruction>", desc: "Large-scale parallel changes across codebase", example: "/batch migrate all handlers to async/await" },
  { category: "Slash", cmd: "/debug", desc: "Troubleshoot current Claude Code session", example: "/debug" },
  { category: "Slash", cmd: "/claude-api", desc: "Load Claude API reference for your language", example: "/claude-api" },
  // Keyboard shortcuts
  { category: "Keyboard", cmd: "Shift+Tab", desc: "Cycle permission mode: Normal → Auto-Accept → Plan", example: "" },
  { category: "Keyboard", cmd: "Ctrl+G", desc: "Open current plan in text editor (Plan Mode)", example: "" },
  { category: "Keyboard", cmd: "Ctrl+O", desc: "Toggle verbose mode (shows Claude's thinking)", example: "" },
  { category: "Keyboard", cmd: "Ctrl+C / Esc", desc: "Stop Claude mid-action (preserves context)", example: "" },
  { category: "Keyboard", cmd: "Esc Esc", desc: "Open rewind menu", example: "" },
  { category: "Keyboard", cmd: "Alt+T (Win) / Option+T (Mac)", desc: "Toggle extended thinking on/off", example: "" },
  { category: "Keyboard", cmd: "↑", desc: "Command history (in prompt)", example: "" },
  { category: "Keyboard", cmd: "Tab", desc: "Autocomplete commands and file paths", example: "" },
  { category: "Keyboard", cmd: "?", desc: "Show keyboard shortcuts reference", example: "" },
];

const CATEGORIES = ["All", "CLI", "Slash", "Keyboard"];

export default function CommandsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return COMMANDS.filter((c) => {
      const matchCat = category === "All" || c.category === category;
      const matchSearch = !q || c.cmd.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, category]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="aurora-bg fixed inset-0 pointer-events-none opacity-30" style={{ zIndex: 0 }}>
        <div className="aurora-1" />
      </div>
      <div className="relative" style={{ zIndex: 1 }}>
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-2">
            <Terminal size={24} style={{ color: "#7c3aed" }} />
            <h1 className="text-2xl font-extrabold" style={{ color: "#e2e8f0" }}>CLI Reference</h1>
          </div>
          <p className="mb-6" style={{ color: "#64748b" }}>
            All {COMMANDS.length} commands, slash commands, and keyboard shortcuts.
          </p>

          {/* Search + filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#64748b" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search commands..."
                className="w-full rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#e2e8f0",
                }}
              />
            </div>
            <div className="flex gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: category === cat ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${category === cat ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.08)"}`,
                    color: category === cat ? "#a78bfa" : "#64748b",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Results */}
        <AnimatedSection delay={100}>
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="px-4 py-2 text-xs" style={{ background: "rgba(124,58,237,0.08)", color: "#64748b" }}>
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </div>
            <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
              {filtered.length === 0 ? (
                <div className="px-4 py-12 text-center" style={{ color: "#475569" }}>
                  No commands match &ldquo;{search}&rdquo;
                </div>
              ) : (
                filtered.map((c) => (
                  <div
                    key={c.cmd}
                    className="px-4 py-3 flex items-start gap-4 group hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <code
                          className="text-sm font-mono break-all"
                          style={{ color: "#c4b5fd" }}
                        >
                          {c.cmd}
                        </code>
                        <span
                          className="text-xs px-1.5 py-0.5 rounded-full flex-shrink-0"
                          style={{
                            background: c.category === "Slash" ? "rgba(79,70,229,0.15)" :
                              c.category === "Keyboard" ? "rgba(16,185,129,0.12)" : "rgba(124,58,237,0.12)",
                            color: c.category === "Slash" ? "#818cf8" :
                              c.category === "Keyboard" ? "#6ee7b7" : "#a78bfa",
                          }}
                        >
                          {c.category}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: "#64748b" }}>{c.desc}</p>
                      {c.example && (
                        <div className="mt-1.5 flex items-center gap-2">
                          <span className="text-xs" style={{ color: "#475569" }}>e.g.</span>
                          <code className="text-xs" style={{ color: "#7c6b9e", fontFamily: "monospace" }}>{c.example}</code>
                        </div>
                      )}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <CopyButton text={c.cmd} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
