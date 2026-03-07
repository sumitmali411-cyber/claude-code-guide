import Link from "next/link";
import { Terminal, HOME_SEQUENCES } from "@/components/Terminal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  Rocket, Cpu, Workflow, Brain, Zap, Webhook, Plug, Layers,
  ArrowRight, BookOpen, Terminal as TerminalIcon, Wrench, Star,
  GitBranch, Code2, FileCode, Sparkles
} from "lucide-react";

const LEARN_MODULES = [
  {
    href: "/learn/getting-started",
    icon: Rocket,
    title: "Getting Started",
    desc: "Install Claude Code, log in, and run your first session in minutes.",
    badge: "5 min",
    color: "#7c3aed",
  },
  {
    href: "/learn/how-it-works",
    icon: Cpu,
    title: "How It Works",
    desc: "The agentic loop, context window, Plan Mode vs Normal Mode explained.",
    badge: "8 min",
    color: "#4f46e5",
  },
  {
    href: "/learn/daily-workflows",
    icon: Workflow,
    title: "Daily Workflows",
    desc: "Explore codebases, fix bugs, write tests, create PRs — step by step.",
    badge: "12 min",
    color: "#0ea5e9",
  },
  {
    href: "/learn/memory",
    icon: Brain,
    title: "Memory & CLAUDE.md",
    desc: "Give Claude persistent instructions. Build the perfect CLAUDE.md file.",
    badge: "10 min",
    color: "#7c3aed",
  },
  {
    href: "/learn/skills",
    icon: Zap,
    title: "Skills",
    desc: "Create /slash commands. Use built-in /simplify, /batch, /debug.",
    badge: "10 min",
    color: "#f59e0b",
  },
  {
    href: "/learn/hooks",
    icon: Webhook,
    title: "Hooks",
    desc: "Auto-format on save, block protected files, get notified when done.",
    badge: "10 min",
    color: "#10b981",
  },
  {
    href: "/learn/mcp",
    icon: Plug,
    title: "MCP",
    desc: "Connect Claude to Jira, Slack, databases, and any custom tool.",
    badge: "8 min",
    color: "#ec4899",
  },
  {
    href: "/learn/advanced",
    icon: Layers,
    title: "Advanced",
    desc: "Sub-agents, parallel worktrees, CI/CD integration, non-interactive mode.",
    badge: "15 min",
    color: "#6366f1",
  },
];

const FEATURES = [
  { icon: TerminalIcon, text: "Animated terminal demos" },
  { icon: FileCode, text: "60 pages of real docs" },
  { icon: Wrench, text: "Interactive CLAUDE.md builder" },
  { icon: BookOpen, text: "CLI command reference" },
  { icon: GitBranch, text: "Real copy-paste examples" },
  { icon: Star, text: "Progress tracking" },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Aurora background */}
      <div className="aurora-bg fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="aurora-1" />
        <div className="aurora-2" />
        <div className="aurora-3" />
      </div>

      {/* Dot pattern */}
      <div className="fixed inset-0 dot-pattern opacity-40 pointer-events-none" style={{ zIndex: 0 }} />

      <div className="relative" style={{ zIndex: 1 }}>

        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="px-6 pt-16 pb-8 max-w-5xl mx-auto">
          <AnimatedSection animation="up">
            <div className="flex items-center gap-2 mb-6">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.3)",
                  color: "#a78bfa",
                }}
              >
                <Sparkles size={11} />
                Based on official Claude Code docs — 60 pages scraped
              </span>
            </div>

            <h1
              className="text-5xl font-extrabold leading-[1.1] mb-6 tracking-tight"
              style={{ maxWidth: "720px" }}
            >
              Learn{" "}
              <span className="gradient-text">Claude Code</span>
              <br />
              interactively
            </h1>

            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: "#94a3b8", maxWidth: "560px" }}
            >
              The unofficial interactive guide to Claude Code — Anthropic&apos;s agentic
              coding tool. Real examples, animated demos, and hands-on tools to
              help you go from zero to productive.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Link href="/learn/getting-started">
                <button
                  className="shimmer-btn flex items-center gap-2 px-6 py-3 text-sm font-semibold"
                >
                  Start Learning <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/reference/cheatsheet">
                <button
                  className="flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-all"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#e2e8f0",
                  }}
                >
                  <FileCode size={16} />
                  Cheat Sheet
                </button>
              </Link>
              <Link href="/tools/claude-md-builder">
                <button
                  className="flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-all"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#e2e8f0",
                  }}
                >
                  <Wrench size={16} />
                  CLAUDE.md Builder
                </button>
              </Link>
            </div>
          </AnimatedSection>

          {/* Feature pills */}
          <AnimatedSection animation="up" delay={100}>
            <div className="flex flex-wrap gap-2 mb-12">
              {FEATURES.map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "#64748b",
                  }}
                >
                  <Icon size={12} style={{ color: "#7c3aed" }} />
                  {text}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {/* Terminal demo */}
          <AnimatedSection animation="up" delay={150}>
            <div className="mb-16">
              <div className="flex items-center gap-2 mb-3">
                <Code2 size={14} style={{ color: "#7c3aed" }} />
                <span className="text-xs font-medium" style={{ color: "#64748b" }}>
                  See it in action
                </span>
              </div>
              <Terminal sequences={HOME_SEQUENCES} title="claude — your-project" loop />
            </div>
          </AnimatedSection>
        </section>

        {/* ── Learning modules grid ─────────────────────────── */}
        <section className="px-6 pb-16 max-w-5xl mx-auto">
          <AnimatedSection animation="up">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#e2e8f0" }}>
                Learning Modules
              </h2>
              <p className="text-sm" style={{ color: "#64748b" }}>
                8 modules from beginner to advanced. Each builds on the previous.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {LEARN_MODULES.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <AnimatedSection key={mod.href} animation="up" delay={i * 60}>
                  <Link href={mod.href}>
                    <SpotlightCard className="h-full cursor-pointer p-5 group">
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: `${mod.color}20`, border: `1px solid ${mod.color}30` }}
                          >
                            <Icon size={18} style={{ color: mod.color }} />
                          </div>
                          <span
                            className="text-xs px-2 py-1 rounded-full"
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              color: "#64748b",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            {mod.badge}
                          </span>
                        </div>
                        <h3 className="font-bold text-base mb-1.5 group-hover:text-purple-300 transition-colors"
                          style={{ color: "#e2e8f0" }}>
                          {mod.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                          {mod.desc}
                        </p>
                        <div className="flex items-center gap-1 mt-4 text-xs font-medium transition-all"
                          style={{ color: mod.color }}>
                          Start <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </SpotlightCard>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </section>

        {/* ── Quick tools strip ─────────────────────────────── */}
        <section className="px-6 pb-16 max-w-5xl mx-auto">
          <AnimatedSection animation="up">
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(124,58,237,0.06)",
                border: "1px solid rgba(124,58,237,0.15)",
              }}
            >
              <h2 className="text-lg font-bold mb-1" style={{ color: "#e2e8f0" }}>
                Interactive Tools
              </h2>
              <p className="text-sm mb-5" style={{ color: "#64748b" }}>
                Generate real config files you can drop straight into your project.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    href: "/tools/claude-md-builder",
                    icon: Brain,
                    title: "CLAUDE.md Builder",
                    desc: "Pick your stack → get a ready-to-use CLAUDE.md",
                  },
                  {
                    href: "/tools/hook-builder",
                    icon: Webhook,
                    title: "Hook Builder",
                    desc: "Configure hooks visually → get the JSON config",
                  },
                  {
                    href: "/reference/commands",
                    icon: TerminalIcon,
                    title: "CLI Reference",
                    desc: "Search all commands and flags",
                  },
                ].map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link key={tool.href} href={tool.href}>
                      <div
                        className="rounded-xl p-4 cursor-pointer transition-all hover:border-purple-500/30"
                        style={{
                          background: "rgba(9,9,15,0.6)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <Icon size={18} className="mb-2" style={{ color: "#7c3aed" }} />
                        <div className="font-semibold text-sm mb-1" style={{ color: "#e2e8f0" }}>
                          {tool.title}
                        </div>
                        <div className="text-xs" style={{ color: "#64748b" }}>
                          {tool.desc}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </section>

      </div>
    </div>
  );
}
