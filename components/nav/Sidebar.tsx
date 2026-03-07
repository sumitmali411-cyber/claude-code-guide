"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV } from "@/lib/nav";
import {
  Home, BookOpen, Book, Wrench, Rocket, Cpu, Workflow, Brain,
  Zap, Webhook, Plug, Layers, Terminal, FileText, FilePlus,
  Settings, ChevronDown, ChevronRight, Code2
} from "lucide-react";

const ICONS: Record<string, React.ElementType> = {
  home: Home, "book-open": BookOpen, book: Book, wrench: Wrench,
  rocket: Rocket, cpu: Cpu, workflow: Workflow, brain: Brain,
  zap: Zap, webhook: Webhook, plug: Plug, layers: Layers,
  terminal: Terminal, "file-text": FileText, "file-plus": FilePlus,
  settings: Settings,
};

function NavIcon({ name }: { name: string }) {
  const Icon = ICONS[name] || Code2;
  return <Icon size={16} className="nav-icon flex-shrink-0" />;
}

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<Record<string, boolean>>({
    Learn: true, Reference: false, Tools: false,
  });

  const toggle = (label: string) => setOpen((p) => ({ ...p, [label]: !p[label] }));

  return (
    <aside
      className="sidebar w-64 flex-shrink-0 flex flex-col border-r border-white/5 overflow-y-auto"
      style={{ background: "var(--sidebar)", minHeight: "100vh" }}
    >
      {/* Logo */}
      <div className="p-5 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center glow-sm"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
          >
            <Code2 size={16} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-sm text-white leading-none">Claude Code</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
              Interactive Guide
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {NAV.map((item) => {
          if (!item.children) {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`nav-link ${active ? "active" : ""}`}>
                <NavIcon name={item.icon} />
                <span>{item.label}</span>
              </Link>
            );
          }

          const isOpen = open[item.label];
          const groupActive = item.children.some((c) => pathname === c.href || pathname.startsWith(c.href));

          return (
            <div key={item.label}>
              <button
                onClick={() => toggle(item.label)}
                className={`nav-link w-full justify-between ${groupActive ? "active" : ""}`}
              >
                <div className="flex items-center gap-2.5">
                  <NavIcon name={item.icon} />
                  <span>{item.label}</span>
                </div>
                {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>

              {isOpen && (
                <div className="ml-3 mt-1 space-y-0.5 border-l border-white/5 pl-3">
                  {item.children.map((child) => {
                    const active = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`nav-link text-xs ${active ? "active" : ""}`}
                      >
                        <NavIcon name={child.icon} />
                        <span className="flex-1">{child.label}</span>
                        {child.badge && (
                          <span
                            className="text-xs px-1.5 py-0.5 rounded-full"
                            style={{
                              background: "rgba(124,58,237,0.15)",
                              color: "#a78bfa",
                              fontSize: "10px",
                            }}
                          >
                            {child.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <a
          href="https://code.claude.com/docs/en/overview"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link text-xs"
        >
          <BookOpen size={14} />
          <span>Official Docs</span>
        </a>
      </div>
    </aside>
  );
}
