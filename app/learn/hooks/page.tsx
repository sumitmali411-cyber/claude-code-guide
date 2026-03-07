import { LearnLayout } from "@/components/LearnLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { TryThis } from "@/components/TryThis";
import { AnimatedSection } from "@/components/AnimatedSection";

const SECTIONS = [
  "What are hooks",
  "Hook lifecycle events",
  "Your first hook (notifications)",
  "Auto-format on save",
  "Block protected files",
  "Re-inject context after compaction",
  "Matchers",
  "Hook output and exit codes",
  "Prompt-based and agent hooks",
];

export default function HooksPage() {
  return (
    <LearnLayout
      title="Hooks"
      description="Run shell commands automatically when Claude edits files, finishes tasks, or needs input. Deterministic automation."
      moduleId="hooks"
      sections={SECTIONS}
      readTime="10 min read"
      docsUrl="https://code.claude.com/docs/en/hooks-guide"
      prev={{ href: "/learn/skills", label: "Skills" }}
      next={{ href: "/learn/mcp", label: "MCP" }}
    >

      <AnimatedSection>
        <h2>What Are Hooks?</h2>
        <p>
          Hooks are shell commands that run at specific points in Claude&apos;s lifecycle.
          Unlike CLAUDE.md instructions (which Claude may or may not follow), hooks are{" "}
          <strong>deterministic</strong> — they always run.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          {[
            { hook: "CLAUDE.md instructions", type: "Advisory", desc: "Claude tries to follow them. May be inconsistent." },
            { hook: "Hooks", type: "Deterministic", desc: "Always executes. Perfect for formatting, logging, blocking." },
          ].map(({ hook, type, desc }) => (
            <div key={hook} className="rounded-xl p-4"
              style={{ background: "var(--card)", border: `1px solid rgba(${type === "Deterministic" ? "124,58,237" : "100,116,139"},.25)` }}>
              <div className="font-semibold text-sm mb-0.5" style={{ color: "#e2e8f0" }}>{hook}</div>
              <div className="text-xs mb-1 badge-purple inline-block px-2 py-0.5 rounded-full">{type}</div>
              <p className="text-sm" style={{ color: "#64748b" }}>{desc}</p>
            </div>
          ))}
        </div>
        <p>Set up hooks with <code>/hooks</code> in the CLI, or edit settings.json directly.</p>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Hook Lifecycle Events</h2>
        <div className="rounded-xl overflow-hidden my-4" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(124,58,237,0.1)" }}>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#a78bfa" }}>Event</th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#a78bfa" }}>When it fires</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["SessionStart", "When a session begins or resumes"],
                ["UserPromptSubmit", "When you submit a prompt, before Claude processes it"],
                ["PreToolUse", "Before a tool call executes — can block it"],
                ["PostToolUse", "After a tool call succeeds"],
                ["Notification", "When Claude sends a notification (idle, needs input, etc.)"],
                ["Stop", "When Claude finishes responding"],
                ["PreCompact", "Before context compaction"],
                ["SubagentStart / Stop", "When a subagent spawns or finishes"],
                ["ConfigChange", "When a settings or skills file changes"],
                ["WorktreeCreate / Remove", "When worktrees are created or cleaned up"],
              ].map(([event, when]) => (
                <tr key={event} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-4 py-2.5">
                    <code style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#c4b5fd" }}>{event}</code>
                  </td>
                  <td className="px-4 py-2.5 text-sm" style={{ color: "#94a3b8" }}>{when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Your First Hook: Desktop Notifications</h2>
        <p>Get notified when Claude finishes or needs your input. Run <code>/hooks</code> → select <code>Notification</code>:</p>
        <CodeBlock
          lang="json"
          label="~/.claude/settings.json"
          code={`{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \\"Claude needs your attention\\" with title \\"Claude Code\\"'"
          }
        ]
      }
    ]
  }
}`}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
          {[
            { os: "macOS", cmd: "osascript -e 'display notification \"Claude\" with title \"Claude Code\"'" },
            { os: "Linux", cmd: "notify-send 'Claude Code' 'Claude needs your attention'" },
            { os: "Windows", cmd: "powershell.exe -Command \"[Windows.Forms.MessageBox]::Show('Claude needs your attention')\"" },
          ].map(({ os, cmd }) => (
            <div key={os} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-xs font-medium mb-2" style={{ color: "#a78bfa" }}>{os}</div>
              <code className="text-xs break-all" style={{ color: "#64748b", fontFamily: "monospace" }}>{cmd}</code>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Auto-Format Code After Edits</h2>
        <p>Run Prettier on every file Claude edits — automatically, every time:</p>
        <CodeBlock
          lang="json"
          label=".claude/settings.json"
          code={`{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
          }
        ]
      }
    ]
  }
}`}
        />
        <div className="note-block mt-3">
          Install <code>jq</code> for JSON parsing: <code>brew install jq</code> (macOS) or{" "}
          <code>apt-get install jq</code> (Linux).
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Block Edits to Protected Files</h2>
        <p>Prevent Claude from modifying sensitive files like <code>.env</code> or <code>package-lock.json</code>:</p>
        <CodeBlock
          lang="bash"
          label=".claude/hooks/protect-files.sh"
          code={`#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

PROTECTED=(".env" "package-lock.json" ".git/")

for pattern in "\${PROTECTED[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "Blocked: $FILE_PATH matches protected pattern '$pattern'" >&2
    exit 2   # exit 2 = block the action
  fi
done

exit 0  # exit 0 = allow`}
        />
        <CodeBlock
          lang="json"
          label=".claude/settings.json"
          code={`{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": ".claude/hooks/protect-files.sh" }]
      }
    ]
  }
}`}
        />
        <div className="tip-block">
          Exit code 2 blocks the action. Claude receives anything you write to stderr as feedback so it can adjust.
          Exit code 0 allows. Any other exit code allows but logs the error.
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Re-inject Context After Compaction</h2>
        <p>
          When Claude compacts, it can lose important context. Use a <code>SessionStart</code>{" "}
          hook with <code>compact</code> matcher to re-inject it:
        </p>
        <CodeBlock
          lang="json"
          label=".claude/settings.json"
          code={`{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [{
          "type": "command",
          "command": "echo 'Reminder: use pnpm (not npm). Run pnpm test before committing. Current sprint: auth refactor.'"
        }]
      }
    ]
  }
}`}
        />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Matchers</h2>
        <p>Matchers filter when a hook fires — they&apos;re regex patterns:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          {[
            { matcher: "Edit|Write", fires: "Only on file-editing tools" },
            { matcher: "Bash", fires: "Only on shell commands" },
            { matcher: "mcp__github__.*", fires: "Any GitHub MCP tool" },
            { matcher: "compact", fires: "Only on compact SessionStart" },
            { matcher: '""', fires: "Every occurrence (no filter)" },
            { matcher: "permission_prompt", fires: "Only permission prompts in Notification" },
          ].map(({ matcher, fires }) => (
            <div key={matcher} className="flex items-center gap-3 rounded-lg p-3"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <code className="text-xs font-mono" style={{ color: "#c4b5fd" }}>{matcher}</code>
              <span className="text-xs" style={{ color: "#64748b" }}>→ {fires}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Prompt-Based Hooks</h2>
        <p>For decisions that need judgment, use <code>type: "prompt"</code> — Claude evaluates the condition:</p>
        <CodeBlock
          lang="json"
          code={`{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "prompt",
        "prompt": "Check if all requested tasks are complete. If not, respond with {\"ok\": false, \"reason\": \"what remains\"}."
      }]
    }]
  }
}`}
        />
        <p>
          If the model returns <code>{`{"ok": false}`}</code>, Claude keeps working using the{" "}
          <code>reason</code> as its next instruction. Perfect for quality gates.
        </p>
      </AnimatedSection>

      <TryThis title="Hook-related prompts" prompts={[
        "/hooks",
        'write a hook that runs eslint after every file edit',
        'write a hook that blocks writes to the migrations folder',
        'write a hook that logs every bash command I run to ~/.claude/audit.log',
      ]} />

    </LearnLayout>
  );
}
