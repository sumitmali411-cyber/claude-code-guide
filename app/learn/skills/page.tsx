import { LearnLayout } from "@/components/LearnLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { TryThis } from "@/components/TryThis";
import { AnimatedSection } from "@/components/AnimatedSection";

const SECTIONS = [
  "What are Skills",
  "Built-in bundled skills",
  "Create your first skill",
  "SKILL.md structure",
  "Frontmatter options",
  "Control who invokes",
  "Pass arguments",
  "Run in a subagent",
  "Dynamic context injection",
];

export default function SkillsPage() {
  return (
    <LearnLayout
      title="Skills"
      description="Create /slash commands that give Claude domain knowledge and automate repeatable workflows."
      moduleId="skills"
      sections={SECTIONS}
      readTime="10 min read"
      docsUrl="https://code.claude.com/docs/en/skills"
      prev={{ href: "/learn/memory", label: "Memory & CLAUDE.md" }}
      next={{ href: "/learn/hooks", label: "Hooks" }}
    >

      <AnimatedSection>
        <h2>What Are Skills?</h2>
        <p>
          A skill is a directory with a <code>SKILL.md</code> file. Create one and Claude
          adds it to its toolkit — either invoked with <code>/skill-name</code> or loaded
          automatically when relevant to your conversation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          {[
            { location: "~/.claude/skills/", scope: "All your projects", example: "personal coding conventions" },
            { location: ".claude/skills/", scope: "This project only", example: "project-specific deploy script" },
            { location: "plugin skills", scope: "When plugin is enabled", example: "shared team skills" },
          ].map(({ location, scope, example }) => (
            <div key={location} className="rounded-xl p-4" style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <code className="text-xs block mb-1" style={{ color: "#c4b5fd", fontFamily: "monospace" }}>{location}</code>
              <div className="text-xs font-medium mb-1" style={{ color: "#a78bfa" }}>{scope}</div>
              <div className="text-xs" style={{ color: "#64748b" }}>e.g. {example}</div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Built-in Bundled Skills</h2>
        <p>These ship with every Claude Code installation:</p>
        <div className="space-y-3 my-4">
          {[
            { cmd: "/simplify", desc: "Reviews your recently changed files for code reuse, quality, and efficiency. Spawns 3 parallel review agents." },
            { cmd: "/batch <instruction>", desc: "Large-scale parallel changes across a codebase. Decomposes into 5–30 independent tasks, each in its own worktree with its own PR." },
            { cmd: "/debug [description]", desc: "Troubleshoots your current Claude Code session by reading the debug log." },
            { cmd: "/claude-api", desc: "Loads Claude API reference for your language. Also activates automatically when you import the anthropic SDK." },
          ].map(({ cmd, desc }) => (
            <div key={cmd} className="rounded-xl p-4" style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <code className="text-sm font-bold block mb-1.5" style={{ color: "#c4b5fd", fontFamily: "monospace" }}>{cmd}</code>
              <p className="text-sm" style={{ color: "#64748b" }}>{desc}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Create Your First Skill</h2>
        <CodeBlock lang="bash" code={`mkdir -p ~/.claude/skills/explain-code`} />
        <CodeBlock
          lang="markdown"
          label="~/.claude/skills/explain-code/SKILL.md"
          code={`---
name: explain-code
description: Explains code with visual diagrams and analogies. Use when
  explaining how code works, teaching about a codebase, or when the user
  asks "how does this work?"
---

When explaining code, always include:

1. **Start with an analogy**: Compare the code to something from everyday life
2. **Draw a diagram**: Use ASCII art to show the flow or relationships
3. **Walk through the code**: Explain step-by-step what happens
4. **Highlight a gotcha**: What's a common mistake or misconception?

Keep explanations conversational. For complex concepts, use multiple analogies.`}
        />
        <p>Test it two ways:</p>
        <CodeBlock lang="bash" code={`# Let Claude invoke it automatically:\nHow does this code work?\n\n# Or invoke directly:\n/explain-code src/auth/login.ts`} />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Frontmatter Reference</h2>
        <CodeBlock
          lang="yaml"
          label="SKILL.md frontmatter"
          code={`---
name: my-skill                    # Becomes /my-skill command
description: What it does         # Claude uses this to decide when to load it
argument-hint: [issue-number]     # Shown in autocomplete
disable-model-invocation: true    # Only YOU can invoke (not Claude auto)
user-invocable: false             # Only Claude invokes (hidden from / menu)
allowed-tools: Read, Grep, Glob   # Tools allowed without asking permission
model: opus                       # Specific model for this skill
context: fork                     # Run in isolated subagent context
agent: Explore                    # Which subagent type to use
---`}
        />

        <div className="rounded-xl overflow-hidden my-4" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(124,58,237,0.1)" }}>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#a78bfa" }}>Setting</th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#a78bfa" }}>You can invoke</th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#a78bfa" }}>Claude can invoke</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["(default)", "✓", "✓"],
                ["disable-model-invocation: true", "✓", "✗"],
                ["user-invocable: false", "✗", "✓"],
              ].map(([setting, you, claude]) => (
                <tr key={setting} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-4 py-2.5"><code style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#c4b5fd" }}>{setting}</code></td>
                  <td className="px-4 py-2.5 text-sm" style={{ color: you === "✓" ? "#86efac" : "#f87171" }}>{you}</td>
                  <td className="px-4 py-2.5 text-sm" style={{ color: claude === "✓" ? "#86efac" : "#f87171" }}>{claude}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Pass Arguments</h2>
        <CodeBlock
          lang="markdown"
          label=".claude/skills/fix-issue/SKILL.md"
          code={`---
name: fix-issue
description: Fix a GitHub issue by number
disable-model-invocation: true
---

Fix GitHub issue $ARGUMENTS following our coding standards.

1. Read the issue with \`gh issue view $ARGUMENTS\`
2. Understand the requirements
3. Implement the fix
4. Write tests
5. Create a commit and PR`}
        />
        <CodeBlock lang="bash" code={`/fix-issue 123\n# → Claude receives "Fix GitHub issue 123 following our coding standards..."`} />
        <p>Access specific arguments by position with <code>$ARGUMENTS[0]</code>, <code>$0</code>, etc:</p>
        <CodeBlock
          lang="markdown"
          code={`---\nname: migrate-component\n---\n\nMigrate the $0 component from $1 to $2.\nPreserve all existing behavior and tests.`}
        />
        <CodeBlock lang="bash" code={`/migrate-component SearchBar React Vue`} />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Dynamic Context Injection</h2>
        <p>
          Use <code>!`command`</code> syntax to run shell commands before the skill runs.
          The output is injected into the prompt — Claude sees real data, not the command:
        </p>
        <CodeBlock
          lang="markdown"
          label="pr-summary SKILL.md"
          code={`---
name: pr-summary
description: Summarize changes in a pull request
context: fork
agent: Explore
allowed-tools: Bash(gh *)
---

## Pull request context
- PR diff: !\`gh pr diff\`
- PR comments: !\`gh pr view --comments\`
- Changed files: !\`gh pr diff --name-only\`

## Your task
Summarize this PR for the team — key changes, risks, and testing notes.`}
        />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <TryThis title="Skill prompts to try" prompts={[
          "/simplify",
          "/batch update all console.log calls to use our logger utility",
          "/debug",
          "what skills are available?",
          "/explain-code src/utils/auth.ts",
        ]} />
      </AnimatedSection>

    </LearnLayout>
  );
}
