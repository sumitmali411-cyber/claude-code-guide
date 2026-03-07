import { LearnLayout } from "@/components/LearnLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { TryThis } from "@/components/TryThis";
import { AnimatedSection } from "@/components/AnimatedSection";

const SECTIONS = [
  "Custom sub-agents",
  "Agent teams",
  "Non-interactive (headless) mode",
  "CI/CD with GitHub Actions",
  "Fan out across files",
  "Best practices summary",
];

export default function AdvancedPage() {
  return (
    <LearnLayout
      title="Advanced"
      description="Sub-agents, parallel sessions, non-interactive mode, CI/CD integration, and scaling Claude Code horizontally."
      moduleId="advanced"
      sections={SECTIONS}
      readTime="15 min read"
      docsUrl="https://code.claude.com/docs/en/sub-agents"
      prev={{ href: "/learn/mcp", label: "MCP" }}
    >

      <AnimatedSection>
        <h2>Custom Sub-agents</h2>
        <p>
          Sub-agents run in their own isolated context with their own tools. Useful for
          research (keeps your main context clean) and specialized review tasks.
        </p>
        <CodeBlock
          lang="markdown"
          label=".claude/agents/security-reviewer.md"
          code={`---
name: security-reviewer
description: Reviews code for security vulnerabilities. Use when reviewing PRs
  or asking about security issues.
tools: Read, Grep, Glob, Bash
model: opus
---

You are a senior security engineer. Review code for:
- Injection vulnerabilities (SQL, XSS, command injection)
- Authentication and authorization flaws
- Secrets or credentials accidentally committed
- Insecure data handling and storage
- Dependency vulnerabilities

Provide specific line references and suggested fixes for each issue found.`}
        />
        <TryThis title="Use sub-agents" prompts={[
          "use a subagent to review this code for security issues",
          "use subagents to investigate how our auth system handles token refresh",
          "have a subagent analyze our API endpoints for inconsistencies",
          "/agents",
        ]} />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Agent Teams</h2>
        <p>
          Spawn multiple Claude instances that work in parallel on different parts of a task,
          coordinated by a lead agent:
        </p>
        <CodeBlock lang="bash" code={`# /batch is the easiest way to run agent teams
/batch migrate all API handlers in src/api/ from Express 4 to Express 5

# Claude will:
# 1. Research the codebase
# 2. Break work into 5-30 independent units
# 3. Show you the plan for approval
# 4. Spawn one agent per unit, each in its own worktree
# 5. Each agent opens a separate PR when done`} />
        <div className="tip-block">
          Each sub-agent in /batch gets its own git worktree, so their changes never conflict.
          You get parallel PRs you can review and merge independently.
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Non-Interactive (Headless) Mode</h2>
        <p>
          Run Claude in CI pipelines, pre-commit hooks, or scripts without an interactive session:
        </p>
        <CodeBlock lang="bash" code={`# One-off query
claude -p "explain what this project does"

# Structured JSON output for scripts
claude -p "list all API endpoints" --output-format json

# Streaming for real-time processing
claude -p "analyze this log file" --output-format stream-json

# Pipe data in
cat build-error.txt | claude -p "explain the root cause concisely"

# In Plan Mode (read-only, safe for CI analysis)
claude --permission-mode plan -p "check for security issues in changed files"

# Skip all permission prompts (use in sandboxed environments only)
claude --dangerously-skip-permissions -p "fix all lint errors"`} />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>CI/CD with GitHub Actions</h2>
        <CodeBlock
          lang="yaml"
          label=".github/workflows/claude-review.yml"
          code={`name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Claude PR Review
        uses: anthropics/claude-code-action@beta
        with:
          anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}
          # Claude will review the PR and post comments automatically`}
        />
        <p>Claude Code also has official GitLab CI/CD integration via <code>anthropics/claude-code-gitlab</code>.</p>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Fan Out Across Files</h2>
        <p>For large migrations, loop Claude across hundreds of files in parallel:</p>
        <CodeBlock lang="bash" code={`# Step 1: Get list of files to process
claude -p "list all Python files that use the old requests library" > files.txt

# Step 2: Loop Claude across each file
while IFS= read -r file; do
  claude -p "migrate $file from requests to httpx. Return OK or FAIL." \\
    --allowedTools "Edit,Bash(git commit *)" &
done < files.txt

wait
echo "All done"

# Step 3: Review with structured output
claude -p "summarize all changes made" --output-format json | jq .`} />
        <div className="warning-block mt-3">
          Use <code>--allowedTools</code> to restrict what Claude can do in unattended mode.
          Only use <code>--dangerously-skip-permissions</code> in a sandboxed environment without internet access.
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Writer/Reviewer Pattern</h2>
        <p>Use two separate Claude sessions for better quality — one writes, one reviews:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div className="rounded-xl p-4" style={{ background: "var(--card)", border: "1px solid rgba(124,58,237,0.2)" }}>
            <div className="text-xs font-semibold mb-3" style={{ color: "#a78bfa" }}>Session A — Writer</div>
            <code className="text-xs" style={{ color: "#94a3b8", fontFamily: "monospace" }}>
              Implement a rate limiter for our API endpoints
            </code>
          </div>
          <div className="rounded-xl p-4" style={{ background: "var(--card)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <div className="text-xs font-semibold mb-3" style={{ color: "#6ee7b7" }}>Session B — Reviewer</div>
            <code className="text-xs" style={{ color: "#94a3b8", fontFamily: "monospace" }}>
              Review @src/middleware/rateLimiter.ts for edge cases, race conditions, and consistency with our existing middleware patterns.
            </code>
          </div>
        </div>
        <p>The reviewer session has clean context — no bias toward code it just wrote.</p>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Best Practices Summary</h2>
        <div className="space-y-3 my-4">
          {[
            { pattern: "Give Claude a way to verify its work", detail: "Include tests, screenshots, or expected outputs. Single highest-leverage thing you can do." },
            { pattern: "Explore → Plan → Implement → Commit", detail: "Use Plan Mode for research. Switch to Normal Mode to implement." },
            { pattern: "Clear context between unrelated tasks", detail: "/clear between tasks. Long sessions with irrelevant context reduce performance." },
            { pattern: "After two failed corrections, start fresh", detail: "Run /clear and write a better initial prompt incorporating what you learned." },
            { pattern: "Use subagents for investigation", detail: "Delegate research so exploration doesn't consume your main context." },
            { pattern: "Keep CLAUDE.md under 200 lines", detail: "Ruthlessly prune. If Claude already does it without the rule, delete it." },
            { pattern: "Name your sessions", detail: "/rename auth-refactor — find them later with claude --resume auth-refactor." },
          ].map(({ pattern, detail }) => (
            <div key={pattern} className="rounded-xl p-4"
              style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="font-semibold text-sm mb-1" style={{ color: "#e2e8f0" }}>{pattern}</div>
              <p className="text-sm" style={{ color: "#64748b" }}>{detail}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

    </LearnLayout>
  );
}
