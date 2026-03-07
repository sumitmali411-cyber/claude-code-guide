import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Clock } from "lucide-react";
import { ProgressTracker } from "./ProgressTracker";

interface LearnLayoutProps {
  title: string;
  description: string;
  moduleId: string;
  sections: string[];
  readTime: string;
  docsUrl?: string;
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
  children: React.ReactNode;
}

export function LearnLayout({
  title,
  description,
  moduleId,
  sections,
  readTime,
  docsUrl,
  prev,
  next,
  children,
}: LearnLayoutProps) {
  return (
    <div className="relative">
      {/* Subtle aurora */}
      <div className="aurora-bg fixed inset-0 pointer-events-none opacity-40" style={{ zIndex: 0 }}>
        <div className="aurora-1" />
        <div className="aurora-2" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-10" style={{ zIndex: 1 }}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "#64748b" }}>
          <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-purple-400 transition-colors">Learn</Link>
          <span>/</span>
          <span style={{ color: "#a78bfa" }}>{title}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(124,58,237,0.25)",
                color: "#a78bfa",
              }}
            >
              <Clock size={11} />
              {readTime}
            </span>
            {docsUrl && (
              <a
                href={docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs transition-colors hover:text-purple-400"
                style={{ color: "#64748b" }}
              >
                Official docs <ExternalLink size={11} />
              </a>
            )}
          </div>
          <h1 className="text-3xl font-extrabold mb-3 tracking-tight" style={{ color: "#e2e8f0" }}>
            {title}
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "#94a3b8" }}>
            {description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0 content">{children}</div>

          {/* Sticky sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-8 space-y-4">
              <ProgressTracker moduleId={moduleId} sections={sections} />
            </div>
          </div>
        </div>

        {/* Prev / Next nav */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/5">
          {prev ? (
            <Link href={prev.href}>
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#94a3b8",
                }}
              >
                <ArrowLeft size={14} /> {prev.label}
              </button>
            </Link>
          ) : (
            <div />
          )}
          {next && (
            <Link href={next.href}>
              <button className="shimmer-btn flex items-center gap-2 px-4 py-2.5 text-sm font-semibold">
                {next.label} <ArrowRight size={14} />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
