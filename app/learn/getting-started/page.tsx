import { LearnLayout } from "@/components/LearnLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { OsTabs } from "@/components/OsTabs";
import { TryThis } from "@/components/TryThis";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Terminal, type TerminalLine } from "@/components/Terminal";
import { CheckCircle2 } from "lucide-react";

const INSTALL_TABS = [
  {
    label: "macOS / Linux / WSL",
    lang: "bash",
    code: `curl -fsSL https://claude.ai/install.sh | bash`,
  },
  {
    label: "Windows PowerShell",
    lang: "powershell",
    code: `irm https://claude.ai/install.ps1 | iex`,
  },
  {
    label: "Windows CMD",
    lang: "batch",
    code: `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd`,
  },
  {
    label: "Homebrew",
    lang: "bash",
    code: `brew install --cask claude-code`,
  },
  {
    label: "WinGet",
    lang: "powershell",
    code: `winget install Anthropic.ClaudeCode`,
  },
];

const FIRST_SESSION: TerminalLine[][] = [
  [
    { type: "command", text: "cd my-awesome-project" },
    { type: "command", text: "claude" },
    { type: "output", text: "✓ Logged in as you@email.com", delay: 500 },
    { type: "output", text: "✓ Claude Code ready", delay: 300 },
    { type: "blank", text: "" },
    { type: "prompt", text: "what does this project do?" },
    { type: "output", text: "Reading your codebase...", delay: 700 },
    { type: "output", text: "This appears to be a Node.js REST API with:", delay: 400 },
    { type: "output", text: "  • Express.js for routing", delay: 200 },
    { type: "output", text: "  • PostgreSQL for data", delay: 200 },
    { type: "output", text: "  • JWT authentication", delay: 200 },
  ],
];

const SECTIONS = [
  "Install Claude Code",
  "Log in to your account",
  "Start first session",
  "Ask first question",
  "Make first code change",
  "Use Git with Claude",
  "Essential commands",
];

export default function GettingStartedPage() {
  return (
    <LearnLayout
      title="Getting Started"
      description="Install Claude Code, log in, and have a productive first session in under 5 minutes."
      moduleId="getting-started"
      sections={SECTIONS}
      readTime="5 min read"
      docsUrl="https://code.claude.com/docs/en/quickstart"
      next={{ href: "/learn/how-it-works", label: "How It Works" }}
    >

      {/* Step 1: Install */}
      <AnimatedSection>
        <h2>Step 1: Install Claude Code</h2>
        <p>
          Claude Code installs as a native binary that auto-updates in the background.
          Choose your platform:
        </p>
        <OsTabs tabs={INSTALL_TABS} />
        <div className="note-block">
          <strong>Windows users:</strong> Install{" "}
          <a href="https://git-scm.com/downloads/win" target="_blank" rel="noopener noreferrer">
            Git for Windows
          </a>{" "}
          first. Homebrew and WinGet installs don&apos;t auto-update — run the upgrade
          command periodically.
        </div>
      </AnimatedSection>

      {/* Step 2: Log in */}
      <AnimatedSection delay={100}>
        <h2>Step 2: Log In</h2>
        <p>
          Claude Code requires a{" "}
          <a href="https://claude.com/pricing" target="_blank" rel="noopener noreferrer">
            Claude subscription
          </a>{" "}
          (Pro, Max, Teams, or Enterprise) or Console API access. On first launch,
          you&apos;ll be prompted automatically:
        </p>
        <CodeBlock
          code={`claude\n# → Opens browser login on first use\n\n# Or inside a session:\n/login`}
          lang="bash"
        />
        <p>
          You can also authenticate via <strong>Amazon Bedrock</strong>,{" "}
          <strong>Google Vertex AI</strong>, or <strong>Microsoft Foundry</strong> for
          enterprise cloud setups.
        </p>
      </AnimatedSection>

      {/* Step 3: First session */}
      <AnimatedSection delay={150}>
        <h2>Step 3: Start Your First Session</h2>
        <p>Open any project directory and run:</p>
        <CodeBlock code={`cd your-project\nclaude`} lang="bash" />
        <p>
          Claude reads your project files as needed — you don&apos;t have to manually add
          context. Here&apos;s what a real first session looks like:
        </p>
        <Terminal sequences={FIRST_SESSION} title="claude — your-project" loop />
      </AnimatedSection>

      {/* Step 4: Ask questions */}
      <AnimatedSection delay={100}>
        <h2>Step 4: Ask Your First Question</h2>
        <p>
          Start with exploration before making changes. Claude excels at codebase
          understanding:
        </p>
        <TryThis
          title="Great first prompts"
          prompts={[
            "what does this project do?",
            "what technologies does this project use?",
            "where is the main entry point?",
            "explain the folder structure",
            "how is authentication handled?",
            "what are the key data models?",
          ]}
        />
      </AnimatedSection>

      {/* Step 5: Make a change */}
      <AnimatedSection delay={100}>
        <h2>Step 5: Make Your First Code Change</h2>
        <p>
          Ask Claude to do real work. It will show proposed changes and ask for your
          approval before editing files:
        </p>
        <TryThis
          title="Try making changes"
          prompts={[
            "add a hello world function to the main file",
            "add input validation to the user registration form",
            "fix the bug where users can submit empty forms",
            "refactor the auth module to use async/await instead of callbacks",
          ]}
        />
        <div className="tip-block mt-4">
          <strong>Approval flow:</strong> Claude always shows what it plans to do and
          asks permission. You can approve individual changes or enable{" "}
          <strong>Accept All</strong> mode for a session.
        </div>
      </AnimatedSection>

      {/* Step 6: Git */}
      <AnimatedSection delay={100}>
        <h2>Step 6: Use Git with Claude</h2>
        <p>Claude speaks Git natively — no commands to memorize:</p>
        <TryThis
          title="Git operations"
          prompts={[
            "what files have I changed?",
            "commit my changes with a descriptive message",
            "create a new branch called feature/auth-refresh",
            "show me the last 5 commits",
            "help me resolve merge conflicts",
            "create a pr for my changes",
          ]}
        />
      </AnimatedSection>

      {/* Essential commands */}
      <AnimatedSection delay={100}>
        <h2>Essential Commands Reference</h2>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(124,58,237,0.1)" }}>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#a78bfa" }}>Command</th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#a78bfa" }}>What it does</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["claude", "Start interactive session"],
                ['claude "fix the build error"', "Run a one-time task"],
                ['claude -p "explain this function"', "One-off query, then exit"],
                ["claude -c", "Continue most recent conversation"],
                ["claude -r", "Resume a previous conversation"],
                ["/clear", "Clear conversation history"],
                ["/help", "Show all available commands"],
                ["/compact", "Compress context to save tokens"],
                ["/memory", "View and edit CLAUDE.md files"],
                ["Shift+Tab", "Cycle between modes (Normal → Auto-Accept → Plan)"],
                ["Esc", "Stop Claude mid-action (preserves context)"],
                ["Esc Esc", "Open rewind menu"],
              ].map(([cmd, desc]) => (
                <tr key={cmd} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-4 py-3">
                    <code
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "0.8rem",
                        color: "#c4b5fd",
                        background: "rgba(124,58,237,0.1)",
                        padding: "2px 6px",
                        borderRadius: "4px",
                      }}
                    >
                      {cmd}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#94a3b8" }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      {/* Pro tips */}
      <AnimatedSection delay={100}>
        <h2>Pro Tips for Beginners</h2>
        <div className="space-y-3">
          {[
            {
              tip: "Be specific",
              bad: 'fix the bug',
              good: 'fix the login bug where users see a blank screen after wrong credentials',
            },
            {
              tip: "Break complex tasks into steps",
              bad: 'build me a dashboard',
              good: '1. create database table for user profiles\n2. create API endpoint\n3. build the UI page',
            },
            {
              tip: "Let Claude explore first",
              bad: 'add a payment system',
              good: 'first analyze how we handle existing transactions, then suggest how to add Stripe',
            },
          ].map(({ tip, bad, good }) => (
            <div
              key={tip}
              className="rounded-xl p-5"
              style={{
                background: "var(--card)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="font-semibold text-sm mb-3" style={{ color: "#e2e8f0" }}>
                {tip}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  className="rounded-lg p-3"
                  style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
                >
                  <div className="text-xs font-medium mb-1" style={{ color: "#f87171" }}>❌ Vague</div>
                  <code className="text-xs" style={{ color: "#fca5a5", fontFamily: "monospace" }}>{bad}</code>
                </div>
                <div
                  className="rounded-lg p-3"
                  style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}
                >
                  <div className="text-xs font-medium mb-1" style={{ color: "#86efac" }}>✓ Specific</div>
                  <code className="text-xs whitespace-pre-wrap" style={{ color: "#bbf7d0", fontFamily: "monospace" }}>{good}</code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

    </LearnLayout>
  );
}
