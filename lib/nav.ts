export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
  children?: NavItem[];
}

export const NAV: NavItem[] = [
  { label: "Home", href: "/", icon: "home" },
  {
    label: "Learn",
    href: "/learn",
    icon: "book-open",
    children: [
      { label: "Getting Started", href: "/learn/getting-started", icon: "rocket", badge: "5 min" },
      { label: "How It Works", href: "/learn/how-it-works", icon: "cpu", badge: "8 min" },
      { label: "Daily Workflows", href: "/learn/daily-workflows", icon: "workflow", badge: "12 min" },
      { label: "Memory & CLAUDE.md", href: "/learn/memory", icon: "brain", badge: "10 min" },
      { label: "Skills", href: "/learn/skills", icon: "zap", badge: "10 min" },
      { label: "Hooks", href: "/learn/hooks", icon: "webhook", badge: "10 min" },
      { label: "MCP", href: "/learn/mcp", icon: "plug", badge: "8 min" },
      { label: "Advanced", href: "/learn/advanced", icon: "layers", badge: "15 min" },
    ],
  },
  {
    label: "Reference",
    href: "/reference",
    icon: "book",
    children: [
      { label: "CLI Commands", href: "/reference/commands", icon: "terminal" },
      { label: "Cheat Sheet", href: "/reference/cheatsheet", icon: "file-text" },
    ],
  },
  {
    label: "Tools",
    href: "/tools",
    icon: "wrench",
    children: [
      { label: "CLAUDE.md Builder", href: "/tools/claude-md-builder", icon: "file-plus" },
      { label: "Hook Builder", href: "/tools/hook-builder", icon: "settings" },
    ],
  },
];
