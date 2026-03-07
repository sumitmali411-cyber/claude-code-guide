import { LearnLayout } from "@/components/LearnLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { TryThis } from "@/components/TryThis";
import { AnimatedSection } from "@/components/AnimatedSection";

const SECTIONS = [
  "Explore new codebases",
  "Fix bugs",
  "Refactor code",
  "Write tests",
  "Create pull requests",
  "Work with images",
  "Reference files with @",
  "Unix-style piping",
  "Parallel sessions",
];

export default function DailyWorkflowsPage() {
  return (
    <LearnLayout
      title="Daily Workflows"
      description="Step-by-step guides for the tasks you do every day: exploring code, debugging, testing, PRs, and more."
      moduleId="daily-workflows"
      sections={SECTIONS}
      readTime="12 min read"
      docsUrl="https://code.claude.com/docs/en/common-workflows"
      prev={{ href: "/learn/how-it-works", label: "How It Works" }}
      next={{ href: "/learn/memory", label: "Memory & CLAUDE.md" }}
    >

      <AnimatedSection>
        <h2>Explore New Codebases</h2>
        <p>Just joined a project? Use Claude to ramp up fast instead of reading every file manually.</p>
        <TryThis title="Exploration prompts" prompts={[
          "give me an overview of this codebase",
          "explain the main architecture patterns used here",
          "what are the key data models?",
          "how is authentication handled?",
          "find the files that handle user authentication",
          "trace the login process from front-end to database",
          "what coding conventions and patterns does this project use?",
        ]} />
        <div className="tip-block">
          Start broad → go specific. Ask for a glossary of project-specific terms.
          Install a code intelligence plugin for your language to give Claude precise
          &quot;go to definition&quot; navigation.
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Fix Bugs</h2>
        <p>
          Paste error messages directly. The more context you give, the faster Claude
          finds the root cause.
        </p>
        <div className="space-y-3 my-4">
          {[
            { label: "Paste the error", prompt: "I'm seeing this error when I run npm test:\n[paste error]" },
            { label: "Ask for options", prompt: "suggest a few ways to fix the @ts-ignore in user.ts" },
            { label: "Apply the fix", prompt: "update user.ts to add the null check you suggested" },
          ].map(({ label, prompt }) => (
            <div key={label} className="step-item">
              <div className="step-number">→</div>
              <div>
                <div className="text-sm font-semibold mb-1" style={{ color: "#e2e8f0" }}>{label}</div>
                <code className="text-xs" style={{ color: "#94a3b8", fontFamily: "monospace", whiteSpace: "pre-wrap" }}>&ldquo;{prompt}&rdquo;</code>
              </div>
            </div>
          ))}
        </div>
        <TryThis title="Debug prompts" prompts={[
          "I'm seeing this error when I run npm test: [paste error here]",
          "suggest a few ways to fix the null pointer in auth.ts",
          "the build fails with: [paste error]. fix it and verify the build succeeds",
          "trace why this function returns undefined instead of the user object",
        ]} />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Refactor Code</h2>
        <CodeBlock lang="bash" code={`# In Claude:\nfind deprecated API usage in our codebase\n# Then:\nsuggest how to refactor utils.js to use modern JavaScript\n# Then:\nrefactor utils.js to ES2024 features, maintaining same behavior\n# Verify:\nrun tests for the refactored code`} />
        <TryThis title="Refactor prompts" prompts={[
          "refactor the auth module to use async/await instead of callbacks",
          "find all places we use var and convert to const/let",
          "split this 500-line file into smaller focused modules",
          "convert these callback-based functions to use promises",
        ]} />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Write Tests</h2>
        <p>Claude matches your existing test patterns — it reads your test files first.</p>
        <TryThis title="Testing prompts" prompts={[
          "find functions in NotificationsService.swift that are not covered by tests",
          "add tests for the notification service",
          "add test cases for edge conditions in the notification service",
          "run the new tests and fix any failures",
          "write a test for foo.py covering the edge case where the user is logged out. avoid mocks",
        ]} />
        <div className="tip-block">
          Ask Claude to &quot;identify edge cases you might have missed&quot; after generating the basic tests.
          It will suggest tests for error conditions, boundary values, and unexpected inputs.
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Create Pull Requests</h2>
        <CodeBlock lang="bash" code={`# Simplest way:\ncreate a pr for my changes\n\n# Or step by step:\nsummarize the changes I've made to the authentication module\ncreate a pr\nenhance the PR description with more context about security improvements`} />
        <p>
          When you create a PR with <code>gh pr create</code>, the session is automatically
          linked. Resume it later with:
        </p>
        <CodeBlock lang="bash" code={`claude --from-pr 123`} />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Reference Files with @</h2>
        <p>
          Use <code>@</code> to instantly include files without waiting for Claude to read them:
        </p>
        <CodeBlock lang="bash" code={`# Include a single file\nExplain the logic in @src/utils/auth.js\n\n# Reference a directory listing\nWhat's the structure of @src/components?\n\n# Multiple files in one message\nCompare @file1.js and @file2.js and suggest which pattern is better\n\n# MCP resources\nShow me the data from @github:repos/owner/repo/issues`} />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Work with Images</h2>
        <p>Drag-and-drop images into Claude Code, or paste with Ctrl+V (not Cmd+V):</p>
        <TryThis title="Image-related prompts" prompts={[
          "Analyze this image: /path/to/screenshot.png — what's causing the error?",
          "Generate CSS to match this design mockup [paste image]",
          "What HTML structure would recreate this component? [drag image in]",
          "This is our current DB schema diagram. How should we modify it for the new feature?",
        ]} />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Unix-Style Piping</h2>
        <p>Claude Code is composable — pipe data in, pipe structured output out:</p>
        <CodeBlock lang="bash" code={`# Analyze logs in real-time\ntail -f app.log | claude -p "alert me if you see any anomalies"

# Review changed files for security issues
git diff main --name-only | claude -p "review these for security issues"

# Save analysis to file
cat build-error.txt | claude -p "explain the root cause" > analysis.txt

# Structured JSON output for scripts
claude -p "list all API endpoints" --output-format json | jq '.[]'

# Lint-style code review in CI
claude -p "you are a linter. check for typos in changed files vs main. \
  report filename:line and description only"`} />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Parallel Sessions with Git Worktrees</h2>
        <p>
          Work on multiple tasks simultaneously without conflicts — each session gets
          its own isolated copy of the codebase:
        </p>
        <CodeBlock lang="bash" code={`# Start Claude in a new isolated worktree (new branch + directory)
claude --worktree feature-auth

# Start another session on a different task simultaneously
claude --worktree bugfix-payment

# Auto-generate a name
claude --worktree

# Worktrees are created at .claude/worktrees/<name>/
# Add to .gitignore:
echo ".claude/worktrees/" >> .gitignore`} />
        <div className="tip-block">
          When you exit a worktree session with no changes, it cleans up automatically.
          With changes, Claude asks whether to keep or remove the branch.
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Resume Previous Sessions</h2>
        <CodeBlock lang="bash" code={`# Continue most recent session
claude --continue

# Pick from recent sessions
claude --resume

# Resume by name
claude --resume auth-refactor

# Resume session linked to a PR
claude --from-pr 123

# Inside a session:
/rename auth-refactor    # Give current session a name
/resume                  # Open session picker`} />
      </AnimatedSection>

    </LearnLayout>
  );
}
