"use client";
import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Brain, Check } from "lucide-react";

interface Option { id: string; label: string; snippet: string }
interface Section { id: string; title: string; options: Option[] }

const SECTIONS: Section[] = [
  {
    id: "package-manager",
    title: "Package Manager",
    options: [
      { id: "npm", label: "npm", snippet: "# Package manager: npm\n# Install: npm install\n# Run scripts: npm run <script>" },
      { id: "pnpm", label: "pnpm", snippet: "# Package manager: pnpm (not npm)\n# Install: pnpm install\n# Run scripts: pnpm <script>" },
      { id: "yarn", label: "yarn", snippet: "# Package manager: yarn\n# Install: yarn install\n# Run scripts: yarn <script>" },
      { id: "bun", label: "bun", snippet: "# Package manager: bun (not npm)\n# Install: bun install\n# Run scripts: bun run <script>" },
    ],
  },
  {
    id: "testing",
    title: "Testing",
    options: [
      { id: "jest", label: "Jest", snippet: "# Testing\n# Run all tests: npx jest\n# Run single test: npx jest <pattern>\n# Run with coverage: npx jest --coverage" },
      { id: "vitest", label: "Vitest", snippet: "# Testing\n# Run all tests: npx vitest run\n# Run single test: npx vitest run <pattern>\n# Watch mode: npx vitest" },
      { id: "pytest", label: "pytest", snippet: "# Testing\n# Run all tests: pytest\n# Run single test: pytest tests/test_auth.py\n# Run with coverage: pytest --cov" },
      { id: "go-test", label: "Go test", snippet: "# Testing\n# Run all tests: go test ./...\n# Run single package: go test ./pkg/auth/..." },
    ],
  },
  {
    id: "language",
    title: "Language / Stack",
    options: [
      { id: "typescript", label: "TypeScript", snippet: "# Typechecking\n# Always run after making changes: npx tsc --noEmit\n# Use strict mode (already configured)" },
      { id: "python", label: "Python", snippet: "# Python environment\n# Virtual env: source .venv/bin/activate\n# Typecheck: mypy src/\n# Format: black src/" },
      { id: "go", label: "Go", snippet: "# Go\n# Build: go build ./...\n# Lint: golangci-lint run\n# Format: gofmt -w ." },
      { id: "rust", label: "Rust", snippet: "# Rust\n# Build: cargo build\n# Test: cargo test\n# Lint: cargo clippy\n# Format: cargo fmt" },
    ],
  },
  {
    id: "code-style",
    title: "Code Style",
    options: [
      { id: "esm", label: "ES Modules only", snippet: "# Code style\n- Use ES modules (import/export), never CommonJS (require)\n- Destructure imports: import { foo } from 'bar'" },
      { id: "single-quotes", label: "Single quotes", snippet: "- Single quotes for strings, no semicolons" },
      { id: "2-spaces", label: "2-space indent", snippet: "- 2-space indentation" },
      { id: "async-await", label: "async/await over callbacks", snippet: "- Prefer async/await over callbacks and .then() chains" },
      { id: "no-throw", label: "Result pattern (no throw)", snippet: "- Use Result<T,E> pattern for error handling, never throw\n- All errors should be explicit return values" },
    ],
  },
  {
    id: "git",
    title: "Git Conventions",
    options: [
      { id: "conventional", label: "Conventional commits", snippet: "# Git\n- Conventional commit format: feat:, fix:, chore:, docs:\n- Branch naming: feat/, fix/, chore/ prefixes" },
      { id: "squash", label: "Squash before merge", snippet: "- Squash commits before merging to main\n- PR description must include test plan" },
      { id: "no-force", label: "No force push to main", snippet: "- Never force push to main or master\n- Prefer rebasing feature branches" },
    ],
  },
  {
    id: "arch",
    title: "Architecture",
    options: [
      { id: "handlers", label: "API handlers in src/api/", snippet: "# Architecture\n- API handlers live in src/api/handlers/ only\n- Never put business logic in route handlers" },
      { id: "db-queries", label: "DB queries in src/db/", snippet: "- All database queries go through src/db/queries/ only\n- Never write raw SQL outside of that directory" },
      { id: "components", label: "React components in src/components/", snippet: "- React components in src/components/\n- Each component in its own directory with an index.ts export" },
      { id: "microservices", label: "Service boundaries", snippet: "- Each service communicates only through its public API\n- No direct database access across service boundaries" },
    ],
  },
  {
    id: "guards",
    title: "Important Rules",
    options: [
      { id: "no-env", label: "Never commit .env", snippet: "\n# Important\n- NEVER commit .env files or any file containing secrets" },
      { id: "lint-before", label: "Lint before commit", snippet: "- Always run lint before committing: npm run lint" },
      { id: "single-test", label: "Run single test not full suite", snippet: "- Prefer running single tests over the full suite for speed" },
      { id: "migration", label: "No edits to migration files", snippet: "- NEVER edit existing migration files — create new ones instead" },
    ],
  },
];

function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all"
      style={{
        background: checked ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${checked ? "#7c3aed" : "rgba(255,255,255,0.1)"}`,
      }}
    >
      {checked && <Check size={12} style={{ color: "#a78bfa" }} />}
    </button>
  );
}

export default function ClaudeMdBuilderPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["pnpm", "typescript", "esm", "no-env"]));
  const [projectName, setProjectName] = useState("my-project");
  const [customNote, setCustomNote] = useState("");

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const generate = () => {
    const parts: string[] = [`# ${projectName} — CLAUDE.md\n`];
    for (const section of SECTIONS) {
      const picked = section.options.filter((o) => selected.has(o.id));
      if (picked.length > 0) {
        parts.push(`\n## ${section.title}`);
        for (const opt of picked) parts.push(opt.snippet);
      }
    }
    if (customNote.trim()) {
      parts.push(`\n## Additional Notes\n${customNote.trim()}`);
    }
    return parts.join("\n");
  };

  const output = generate();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Aurora */}
      <div className="aurora-bg fixed inset-0 pointer-events-none opacity-30" style={{ zIndex: 0 }}>
        <div className="aurora-1" /><div className="aurora-2" />
      </div>
      <div className="relative" style={{ zIndex: 1 }}>
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-2">
            <Brain size={24} style={{ color: "#7c3aed" }} />
            <h1 className="text-2xl font-extrabold" style={{ color: "#e2e8f0" }}>CLAUDE.md Builder</h1>
          </div>
          <p className="mb-8" style={{ color: "#64748b" }}>
            Pick what applies to your project → get a ready-to-use CLAUDE.md
          </p>
        </AnimatedSection>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Options panel */}
          <div className="flex-1 space-y-5">
            {/* Project name */}
            <AnimatedSection>
              <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="text-sm font-semibold mb-3" style={{ color: "#e2e8f0" }}>Project Name</div>
                <input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#e2e8f0",
                    fontFamily: "var(--font-mono, monospace)",
                  }}
                  placeholder="my-project"
                />
              </div>
            </AnimatedSection>

            {SECTIONS.map((section, i) => (
              <AnimatedSection key={section.id} delay={i * 40}>
                <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-sm font-semibold mb-3" style={{ color: "#e2e8f0" }}>{section.title}</div>
                  <div className="space-y-2">
                    {section.options.map((opt) => (
                      <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
                        <Checkbox checked={selected.has(opt.id)} onChange={() => toggle(opt.id)} />
                        <span className="text-sm transition-colors group-hover:text-purple-300"
                          style={{ color: selected.has(opt.id) ? "#c4b5fd" : "#94a3b8" }}>
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}

            {/* Custom note */}
            <AnimatedSection>
              <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="text-sm font-semibold mb-3" style={{ color: "#e2e8f0" }}>Additional Notes</div>
                <textarea
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none resize-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#e2e8f0",
                    fontFamily: "var(--font-mono, monospace)",
                  }}
                  placeholder="Any project-specific rules, gotchas, or context..."
                />
              </div>
            </AnimatedSection>
          </div>

          {/* Preview panel */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="lg:sticky lg:top-8">
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(124,58,237,0.3)" }}>
                <div className="flex items-center justify-between px-4 py-3"
                  style={{ background: "rgba(124,58,237,0.1)", borderBottom: "1px solid rgba(124,58,237,0.2)" }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono" style={{ color: "#a78bfa" }}>CLAUDE.md</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full badge-purple">
                      {output.split("\n").length} lines
                    </span>
                  </div>
                  <CopyButton text={output} />
                </div>
                <pre
                  className="overflow-auto"
                  style={{
                    padding: "16px",
                    margin: 0,
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.75rem",
                    lineHeight: "1.65",
                    color: "#c9d1d9",
                    background: "#0a0a12",
                    maxHeight: "70vh",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {output}
                </pre>
              </div>
              <p className="text-xs mt-3 text-center" style={{ color: "#475569" }}>
                Copy → save as <code style={{ color: "#7c3aed" }}>CLAUDE.md</code> in your project root
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
