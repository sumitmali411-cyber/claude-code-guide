import { LearnLayout } from "@/components/LearnLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { TryThis } from "@/components/TryThis";
import { AnimatedSection } from "@/components/AnimatedSection";
import Link from "next/link";

const SECTIONS = [
  "CLAUDE.md vs Auto Memory",
  "Where to put CLAUDE.md files",
  "What to include",
  "Write effective instructions",
  "Import other files",
  "Path-specific rules (.claude/rules/)",
  "Auto Memory",
  "The /memory command",
];

export default function MemoryPage() {
  return (
    <LearnLayout
      title="Memory & CLAUDE.md"
      description="Give Claude persistent instructions that survive across sessions. Learn what to write, what to skip, and how auto memory works."
      moduleId="memory"
      sections={SECTIONS}
      readTime="10 min read"
      docsUrl="https://code.claude.com/docs/en/memory"
      prev={{ href: "/learn/daily-workflows", label: "Daily Workflows" }}
      next={{ href: "/learn/skills", label: "Skills" }}
    >

      <AnimatedSection>
        <h2>Two Memory Systems</h2>
        <p>
          Claude starts every session with an empty context window. Two mechanisms carry
          knowledge across sessions:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {[
            {
              title: "CLAUDE.md files",
              sub: "You write these",
              items: ["Instructions and rules", "Coding standards", "Architecture decisions", "Workflow preferences"],
              color: "#7c3aed",
            },
            {
              title: "Auto Memory",
              sub: "Claude writes these",
              items: ["Build commands it discovers", "Debugging insights", "Your correction patterns", "Project-specific learnings"],
              color: "#10b981",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl p-5"
              style={{ background: "var(--card)", border: `1px solid ${item.color}25` }}
            >
              <div className="font-bold text-sm mb-0.5" style={{ color: "#e2e8f0" }}>{item.title}</div>
              <div className="text-xs mb-3" style={{ color: item.color }}>{item.sub}</div>
              <ul className="space-y-1">
                {item.items.map((i) => (
                  <li key={i} className="flex items-center gap-2 text-sm" style={{ color: "#94a3b8" }}>
                    <span style={{ color: item.color, fontSize: "10px" }}>▸</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="tip-block">
          Run <strong>/init</strong> in any project to auto-generate a starter CLAUDE.md.
          Claude analyzes your codebase and creates a file with build commands and conventions.
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Where to Put CLAUDE.md Files</h2>
        <p>Each location has a different scope — more specific locations take precedence:</p>
        <div className="space-y-3 my-4">
          {[
            {
              path: "./CLAUDE.md or ./.claude/CLAUDE.md",
              scope: "Project",
              desc: "Shared with team via git. Architecture, coding standards, workflows.",
              shared: true,
            },
            {
              path: "./CLAUDE.local.md",
              scope: "Local project",
              desc: "Personal project prefs, not committed. Your sandbox URLs, test data.",
              shared: false,
            },
            {
              path: "~/.claude/CLAUDE.md",
              scope: "All your projects",
              desc: "Personal preferences for all projects. Code style, shortcuts.",
              shared: false,
            },
            {
              path: "~/.claude/rules/",
              scope: "All your projects",
              desc: "Topic-specific rule files that apply to matching paths.",
              shared: false,
            },
          ].map((item) => (
            <div
              key={item.path}
              className="flex items-start gap-4 rounded-xl p-4"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex-1">
                <code className="text-xs" style={{ color: "#c4b5fd", fontFamily: "monospace" }}>{item.path}</code>
                <div className="flex items-center gap-2 mt-1 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full badge-purple">{item.scope}</span>
                  {item.shared && <span className="text-xs px-2 py-0.5 rounded-full badge-cyan">shared via git</span>}
                </div>
                <p className="text-sm" style={{ color: "#64748b" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Write Effective Instructions</h2>
        <p>
          CLAUDE.md is context loaded into every session — not enforced configuration.
          The more specific and concise, the better Claude follows it.
        </p>

        <div className="grid grid-cols-2 gap-4 my-4">
          <div
            className="rounded-xl p-4"
            style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)" }}
          >
            <div className="text-sm font-semibold mb-3" style={{ color: "#86efac" }}>✓ Include</div>
            <ul className="space-y-1.5 text-sm" style={{ color: "#94a3b8" }}>
              {[
                "Bash commands Claude can't guess",
                "Code style rules differing from defaults",
                "Test runner & how to run single tests",
                "Branch naming, PR conventions",
                "Architectural decisions",
                "Required env vars or dev quirks",
                "Common gotchas",
              ].map((i) => <li key={i} className="flex gap-2"><span style={{ color: "#86efac" }}>+</span>{i}</li>)}
            </ul>
          </div>
          <div
            className="rounded-xl p-4"
            style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            <div className="text-sm font-semibold mb-3" style={{ color: "#f87171" }}>✗ Exclude</div>
            <ul className="space-y-1.5 text-sm" style={{ color: "#94a3b8" }}>
              {[
                "Things Claude can read from code",
                "Standard language conventions",
                "Detailed API docs (link instead)",
                "Info that changes frequently",
                "File-by-file codebase descriptions",
                "Self-evident practices",
                "Anything over 200 lines total",
              ].map((i) => <li key={i} className="flex gap-2"><span style={{ color: "#f87171" }}>-</span>{i}</li>)}
            </ul>
          </div>
        </div>

        <p className="text-sm" style={{ color: "#64748b" }}>
          <strong style={{ color: "#e2e8f0" }}>Size target: under 200 lines.</strong> Longer files
          consume more context and reduce adherence. Use IMPORTANT or YOU MUST for rules Claude
          keeps ignoring.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Example CLAUDE.md</h2>
        <CodeBlock
          lang="markdown"
          label="CLAUDE.md"
          code={`# Project Setup
- Run \`pnpm dev\` to start (not npm)
- Run \`pnpm test:unit src/auth\` to test a single module
- Build: \`pnpm build\` — always typecheck after changes

# Code Style
- Use ES modules (import/export), never CommonJS require()
- Destructure imports: import { foo } from 'bar'
- 2-space indentation, single quotes, no semicolons

# Architecture
- API handlers live in src/api/handlers/
- Database queries go through src/db/queries/ only
- Use the Result<T,E> pattern for error handling, never throw

# Git
- Branch naming: feat/, fix/, chore/ prefixes
- Squash commits before merging to main
- PR description must include test plan

# Important
- NEVER commit .env files
- Run \`pnpm lint\` before committing`}
        />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Import Other Files</h2>
        <p>
          Use <code>@path/to/file</code> syntax to pull in READMEs, package.json, or
          detailed instructions without bloating the main CLAUDE.md:
        </p>
        <CodeBlock
          lang="markdown"
          label="CLAUDE.md"
          code={`See @README.md for project overview.
See @package.json for available npm scripts.

# Additional Instructions
- Git workflow: @docs/git-instructions.md
- Personal overrides: @~/.claude/my-project.md`}
        />
        <div className="note-block mt-3">
          Claude will show an approval dialog the first time it encounters external imports.
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Path-Specific Rules (.claude/rules/)</h2>
        <p>
          For large projects, split instructions into topic files. Use YAML frontmatter
          to scope rules to specific file patterns:
        </p>
        <CodeBlock
          lang="markdown"
          label=".claude/rules/api-design.md"
          code={`---
paths:
  - "src/api/**/*.ts"
---

# API Development Rules

- All endpoints must include input validation with Zod
- Use the standard error response format: { error, message, code }
- Include OpenAPI JSDoc comments on every handler
- Rate limit all authenticated routes`}
        />
        <p>Rules without a <code>paths</code> field load every session. Path-scoped rules
        only load when Claude reads matching files — saving context.</p>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Auto Memory</h2>
        <p>
          Auto memory is on by default. Claude saves notes as it works — build commands
          it discovers, your correction patterns, debugging insights — without you writing anything.
        </p>
        <p>
          Stored at <code>~/.claude/projects/&lt;project&gt;/memory/MEMORY.md</code>.
          The first 200 lines load into every session.
        </p>
        <div
          className="rounded-xl p-5 my-4"
          style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="font-semibold text-sm mb-3" style={{ color: "#e2e8f0" }}>How to control auto memory</div>
          <div className="space-y-3">
            {[
              { action: "View memory files", cmd: "/memory" },
              { action: "Tell Claude to remember something", cmd: 'say "always use pnpm, not npm"' },
              { action: "Disable auto memory", cmd: '{"autoMemoryEnabled": false} in settings' },
              { action: "Disable via env var", cmd: "CLAUDE_CODE_DISABLE_AUTO_MEMORY=1" },
            ].map(({ action, cmd }) => (
              <div key={action} className="flex items-center justify-between gap-4">
                <span className="text-sm" style={{ color: "#94a3b8" }}>{action}</span>
                <code className="text-xs px-2 py-1 rounded" style={{ background: "rgba(124,58,237,0.1)", color: "#c4b5fd", fontFamily: "monospace" }}>{cmd}</code>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <TryThis
          title="Memory-related prompts to try"
          prompts={[
            "/init",
            "/memory",
            "add to CLAUDE.md: always use pnpm, not npm",
            "remember that the API tests require a local Redis instance",
            "what instructions are you following for this project?",
            "create a .claude/rules/testing.md with our test conventions",
          ]}
        />
        <div className="tip-block">
          <strong>Pro tip:</strong> After adding rules to CLAUDE.md, test them by starting
          a new session and checking if Claude follows them. If not, the rule is probably
          too vague or the file is too long.
        </div>
      </AnimatedSection>

    </LearnLayout>
  );
}
