import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  Rocket, Cpu, Workflow, Brain, Zap, Webhook, Plug, Layers,
} from "lucide-react";

const MODULES = [
  { href: "/learn/getting-started", icon: Rocket, title: "Getting Started", desc: "Install, login, first session", time: "5 min", color: "#7c3aed" },
  { href: "/learn/how-it-works", icon: Cpu, title: "How It Works", desc: "Agentic loop, context, Plan Mode", time: "8 min", color: "#4f46e5" },
  { href: "/learn/daily-workflows", icon: Workflow, title: "Daily Workflows", desc: "Debug, test, commit, PR", time: "12 min", color: "#0ea5e9" },
  { href: "/learn/memory", icon: Brain, title: "Memory & CLAUDE.md", desc: "Persistent instructions", time: "10 min", color: "#7c3aed" },
  { href: "/learn/skills", icon: Zap, title: "Skills", desc: "/slash commands", time: "10 min", color: "#f59e0b" },
  { href: "/learn/hooks", icon: Webhook, title: "Hooks", desc: "Deterministic automation", time: "10 min", color: "#10b981" },
  { href: "/learn/mcp", icon: Plug, title: "MCP", desc: "Connect external tools", time: "8 min", color: "#ec4899" },
  { href: "/learn/advanced", icon: Layers, title: "Advanced", desc: "Sub-agents, CI/CD, scale", time: "15 min", color: "#6366f1" },
];

export default function LearnPage() {
  const totalTime = MODULES.reduce((a, m) => a + parseInt(m.time), 0);
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <AnimatedSection>
        <h1 className="text-3xl font-extrabold mb-2" style={{ color: "#e2e8f0" }}>Learning Modules</h1>
        <p className="mb-2" style={{ color: "#64748b" }}>
          8 modules, ~{totalTime} minutes total, from beginner to advanced.
        </p>
        <div className="flex items-center gap-2 mb-8 text-xs" style={{ color: "#64748b" }}>
          <Clock size={13} style={{ color: "#7c3aed" }} />
          Complete them in order, or jump to what you need.
        </div>
      </AnimatedSection>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MODULES.map((mod, i) => {
          const Icon = mod.icon;
          return (
            <AnimatedSection key={mod.href} delay={i * 50}>
              <Link href={mod.href}>
                <SpotlightCard className="p-5 h-full cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: `${mod.color}18`, border: `1px solid ${mod.color}30` }}>
                      <Icon size={16} style={{ color: mod.color }} />
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full"
                      style={{ background: "rgba(255,255,255,0.05)", color: "#64748b" }}>
                      {mod.time}
                    </span>
                  </div>
                  <div className="font-bold text-sm mb-1 group-hover:text-purple-300 transition-colors"
                    style={{ color: "#e2e8f0" }}>{mod.title}</div>
                  <div className="text-sm" style={{ color: "#64748b" }}>{mod.desc}</div>
                  <div className="flex items-center gap-1 mt-3 text-xs font-medium" style={{ color: mod.color }}>
                    Start <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </SpotlightCard>
              </Link>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
}
