"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Code2 } from "lucide-react";
import { NAV } from "@/lib/nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-white/5 sticky top-0 z-50"
      style={{ background: "rgba(9,9,15,0.9)", backdropFilter: "blur(12px)" }}
    >
      <Link href="/" className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
        >
          <Code2 size={14} className="text-white" />
        </div>
        <span className="font-bold text-sm text-white">Claude Code Guide</span>
      </Link>

      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <div
          className="absolute top-full left-0 right-0 border-b border-white/5 p-4 space-y-1 z-50"
          style={{ background: "var(--sidebar)" }}
        >
          {NAV.flatMap((item) =>
            item.children
              ? item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className={`nav-link ${pathname === child.href ? "active" : ""}`}
                  >
                    {child.label}
                  </Link>
                ))
              : [
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`nav-link ${pathname === item.href ? "active" : ""}`}
                  >
                    {item.label}
                  </Link>,
                ]
          )}
        </div>
      )}
    </header>
  );
}
