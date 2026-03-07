import { LearnLayout } from "@/components/LearnLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { TryThis } from "@/components/TryThis";
import { AnimatedSection } from "@/components/AnimatedSection";

const SECTIONS = [
  "The agentic loop",
  "Built-in tools",
  "Context window",
  "Permission modes",
  "Plan Mode",
  "Extended thinking",
  "Checkpointing",
];

export default function HowItWorksPage() {
  return (
    <LearnLayout
      title="How Claude Code Works"
      description="Understand the agentic loop, built-in tools, context management, and the different permission modes."
      moduleId="how-it-works"
      sections={SECTIONS}
      readTime="8 min read"
      docsUrl="https://code.claude.com/docs/en/how-claude-code-works"
      prev={{ href: "/learn/getting-started", label: "Getting Started" }}
      next={{ href: "/learn/daily-workflows", label: "Daily Workflows" }}
    >
      <AnimatedSection>
        <h2>The Agentic Loop</h2>
        <p>
          Claude Code isn&apos;t a chatbot that replies and waits. It runs an{" "}
          <strong>agentic loop</strong>: receive a goal → plan → take actions → observe
          results → continue until done (or until it needs your input).
        </p>
        <div
          className="rounded-xl p-6 my-4"
          style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex flex-col gap-0">
            {[
              { n: "1", label: "You give a goal", color: "#7c3aed", desc: 'e.g. "fix the login bug"' },
              { n: "2", label: "Claude plans", color: "#4f46e5", desc: "Reads relevant files, understands context" },
              { n: "3", label: "Claude acts", color: "#0ea5e9", desc: "Edits files, runs commands, calls tools" },
              { n: "4", label: "Claude observes", color: "#10b981", desc: "Reads output, checks tests, verifies" },
              { n: "5", label: "Repeat or stop", color: "#f59e0b", desc: "Continues until done or asks you" },
            ].map((step, i, arr) => (
              <div key={step.n} className="step-item">
                <div className="step-number" style={{ background: `${step.color}20`, borderColor: `${step.color}50`, color: step.color }}>
                  {step.n}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: "#e2e8f0" }}>{step.label}</div>
                  <div className="text-sm" style={{ color: "#64748b" }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Built-in Tools</h2>
        <p>Claude has access to these tools during every session:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          {[
            { tool: "Read / Write / Edit", desc: "Read files, create new files, or edit existing ones with precise diffs" },
            { tool: "Bash", desc: "Run shell commands — tests, builds, git operations, any CLI tool" },
            { tool: "Glob / Grep", desc: "Find files by pattern or search content across your codebase" },
            { tool: "WebFetch", desc: "Fetch URLs for docs, API references, issue tracker content" },
            { tool: "TodoWrite", desc: "Maintain a task list for multi-step operations" },
            { tool: "AskUserQuestion", desc: "Pause and ask you something before proceeding (used in Plan Mode)" },
          ].map(({ tool, desc }) => (
            <div
              key={tool}
              className="rounded-lg p-4"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="font-mono text-xs mb-1.5" style={{ color: "#c4b5fd" }}>{tool}</div>
              <div className="text-sm" style={{ color: "#64748b" }}>{desc}</div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>The Context Window — Your #1 Resource</h2>
        <p>
          The context window holds your entire conversation: every message, every file
          Claude read, every command output. <strong>Performance degrades as it fills.</strong>
        </p>
        <div className="space-y-3 my-4">
          {[
            { action: "Track usage", cmd: "Add a custom status line via /statusline" },
            { action: "Clear context", cmd: "/clear  — reset between unrelated tasks" },
            { action: "Compact manually", cmd: "/compact  — summarize to free space" },
            { action: "Targeted compact", cmd: "Esc+Esc → select message → Summarize from here" },
            { action: "Use subagents", cmd: "Delegate research so it doesn't fill YOUR context" },
          ].map(({ action, cmd }) => (
            <div key={action} className="flex items-start gap-3">
              <span className="text-xs pt-0.5" style={{ color: "#7c3aed" }}>▸</span>
              <div>
                <span className="text-sm font-medium" style={{ color: "#e2e8f0" }}>{action}:</span>{" "}
                <code className="text-xs" style={{ color: "#94a3b8", fontFamily: "monospace" }}>{cmd}</code>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Permission Modes</h2>
        <p>Press <strong>Shift+Tab</strong> to cycle through these modes during a session:</p>
        <div className="space-y-3 my-4">
          {[
            { mode: "Normal Mode", key: "default", desc: "Claude asks before modifying files or running commands. Safest.", color: "#64748b" },
            { mode: "Auto-Accept Mode", key: "⏵⏵ accept edits on", desc: "Approves all file edits automatically. Still asks for Bash commands.", color: "#f59e0b" },
            { mode: "Plan Mode", key: "⏸ plan mode on", desc: "Read-only. Claude can explore but not change anything. Perfect for research.", color: "#7c3aed" },
          ].map(({ mode, key, desc, color }) => (
            <div
              key={mode}
              className="rounded-xl p-4 flex items-start gap-4"
              style={{ background: "var(--card)", border: `1px solid ${color}25` }}
            >
              <div>
                <div className="font-semibold text-sm mb-0.5" style={{ color: "#e2e8f0" }}>{mode}</div>
                <div className="text-xs mb-1 font-mono" style={{ color }}>{key}</div>
                <div className="text-sm" style={{ color: "#64748b" }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
        <CodeBlock
          lang="bash"
          code={`# Start directly in Plan Mode\nclaude --permission-mode plan\n\n# Run a one-off headless query in Plan Mode\nclaude --permission-mode plan -p "analyze the auth system"`}
        />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Plan Mode Workflow</h2>
        <p>For complex multi-file changes, use this 4-phase workflow:</p>
        <div className="space-y-3 my-4">
          {[
            { phase: "Explore", mode: "Plan Mode", prompt: 'read /src/auth and understand how sessions work', color: "#7c3aed" },
            { phase: "Plan", mode: "Plan Mode", prompt: 'I want to add Google OAuth — create a detailed plan', color: "#4f46e5" },
            { phase: "Implement", mode: "Normal Mode", prompt: 'implement the OAuth flow from your plan, run tests', color: "#0ea5e9" },
            { phase: "Commit", mode: "Normal Mode", prompt: 'commit with a descriptive message and open a PR', color: "#10b981" },
          ].map(({ phase, mode, prompt, color }) => (
            <div key={phase} className="step-item">
              <div className="step-number" style={{ background: `${color}20`, borderColor: `${color}50`, color }}>
                {phase[0]}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm" style={{ color: "#e2e8f0" }}>{phase}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color }}>
                    {mode}
                  </span>
                </div>
                <code className="text-sm" style={{ color: "#94a3b8", fontFamily: "monospace" }}>
                  &ldquo;{prompt}&rdquo;
                </code>
              </div>
            </div>
          ))}
        </div>
        <div className="tip-block">
          Press <strong>Ctrl+G</strong> in Plan Mode to open the plan in your editor before
          Claude proceeds with implementation.
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Extended Thinking (ultrathink)</h2>
        <p>
          Extended thinking is on by default — Claude reasons through complex problems
          before responding. You can see this reasoning with <strong>Ctrl+O</strong> (verbose mode).
        </p>
        <CodeBlock
          lang="bash"
          code={`# Include "ultrathink" in any prompt for maximum reasoning depth\n# Works with Opus 4.6 and Sonnet 4.6\nclaude\n> ultrathink: design the best database schema for our multi-tenant SaaS`}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {[
            { way: "Toggle thinking", how: "Alt+T (Win/Linux) or Option+T (Mac)" },
            { way: "Effort level", how: "/model → set low/medium/high" },
            { way: "Force deep think", how: 'add "ultrathink" to your prompt' },
            { way: "View reasoning", how: "Ctrl+O to toggle verbose mode" },
          ].map(({ way, how }) => (
            <div key={way} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-xs font-medium mb-1" style={{ color: "#a78bfa" }}>{way}</div>
              <code className="text-xs" style={{ color: "#64748b", fontFamily: "monospace" }}>{how}</code>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Checkpointing & Rewind</h2>
        <p>
          Every action Claude takes creates a checkpoint automatically. You can restore
          conversation, code, or both to any point — even across sessions.
        </p>
        <CodeBlock
          lang="bash"
          code={`# Open the rewind menu\nEsc Esc   (or /rewind)\n\n# From the menu you can:\n# • Restore code only\n# • Restore conversation only  \n# • Restore both\n# • Summarize from a selected message`}
        />
        <div className="warning-block mt-3">
          Checkpoints only track changes made by Claude, not external processes.
          This is not a replacement for git.
        </div>
      </AnimatedSection>

      <TryThis
        title="Explore how Claude thinks"
        prompts={[
          "ultrathink: what's the best architecture for our new payment system?",
          "/model",
          "what tools do you have available?",
          "explain your reasoning for the last change you made",
        ]}
      />
    </LearnLayout>
  );
}
