import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  lang?: string;
  label?: string;
  showLineNumbers?: boolean;
}

// Simple syntax highlighting without server-side Shiki dependency issues
function highlight(code: string, lang: string): string {
  if (lang === "bash" || lang === "sh" || lang === "shell") {
    return code
      .replace(/(&lt;|<)/g, "&lt;")
      .replace(/(&gt;|>)/g, "&gt;")
      .replace(/(#[^\n]*)/g, '<span style="color:#586e75">$1</span>')
      .replace(/\b(claude|npm|npx|git|curl|cat|echo|export|cd|mkdir|chmod)\b/g, '<span style="color:#7c3aed;font-weight:600">$1</span>')
      .replace(/"([^"]*)"/g, '<span style="color:#86efac">"$1"</span>')
      .replace(/'([^']*)'/g, '<span style="color:#86efac">\'$1\'</span>')
      .replace(/\b(-p|-c|-r|--continue|--resume|--worktree|--permission-mode|--output-format)\b/g, '<span style="color:#38bdf8">$1</span>');
  }
  if (lang === "json") {
    return code
      .replace(/"([^"]+)"(\s*:)/g, '<span style="color:#818cf8">"$1"</span>$2')
      .replace(/:\s*"([^"]*)"/g, ': <span style="color:#86efac">"$1"</span>')
      .replace(/:\s*(true|false|null)\b/g, ': <span style="color:#f97316">$1</span>')
      .replace(/:\s*(\d+)/g, ': <span style="color:#fcd34d">$1</span>');
  }
  if (lang === "typescript" || lang === "tsx" || lang === "ts") {
    return code
      .replace(/(\/\/[^\n]*)/g, '<span style="color:#586e75">$1</span>')
      .replace(/\b(import|export|from|const|let|var|function|return|async|await|interface|type|class|extends|implements|new|if|else|for|while)\b/g, '<span style="color:#7c3aed;font-weight:600">$1</span>')
      .replace(/"([^"]*)"/g, '<span style="color:#86efac">"$1"</span>')
      .replace(/'([^']*)'/g, '<span style="color:#86efac">\'$1\'</span>');
  }
  if (lang === "markdown" || lang === "md") {
    return code
      .replace(/^(#{1,4}\s.*)/gm, '<span style="color:#a78bfa;font-weight:600">$1</span>')
      .replace(/^(---[\s\S]*?---)/m, '<span style="color:#38bdf8">$1</span>')
      .replace(/`([^`]+)`/g, '<span style="color:#c4b5fd">`$1`</span>')
      .replace(/\*\*([^*]+)\*\*/g, '<span style="color:#e2e8f0;font-weight:600">**$1**</span>');
  }
  if (lang === "yaml") {
    return code
      .replace(/^([a-z-]+)(\s*:)/gm, '<span style="color:#818cf8">$1</span>$2')
      .replace(/:\s*(true|false)/g, ': <span style="color:#f97316">$1</span>')
      .replace(/:\s*"([^"]*)"/g, ': <span style="color:#86efac">"$1"</span>')
      .replace(/(#[^\n]*)/g, '<span style="color:#586e75">$1</span>');
  }
  // escape HTML for unknown langs
  return code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function CodeBlock({ code, lang = "bash", label, showLineNumbers = false }: CodeBlockProps) {
  const highlighted = highlight(code.trim(), lang);

  return (
    <div className="code-block my-4">
      <div className="code-block-header">
        <div className="flex items-center gap-2">
          {label && (
            <span className="text-xs font-mono" style={{ color: "#64748b" }}>
              {label}
            </span>
          )}
          <span
            className="text-xs px-2 py-0.5 rounded"
            style={{
              background: "rgba(124,58,237,0.12)",
              color: "#a78bfa",
              fontFamily: "monospace",
            }}
          >
            {lang}
          </span>
        </div>
        <CopyButton text={code.trim()} />
      </div>
      <pre
        className="overflow-x-auto"
        style={{
          padding: "16px",
          margin: 0,
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: "0.85rem",
          lineHeight: "1.65",
          color: "#c9d1d9",
          background: "var(--code-bg)",
        }}
      >
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        fontFamily: "var(--font-mono, monospace)",
        fontSize: "0.85em",
        background: "rgba(124,58,237,0.12)",
        color: "#c4b5fd",
        padding: "2px 6px",
        borderRadius: "4px",
        border: "1px solid rgba(124,58,237,0.2)",
      }}
    >
      {children}
    </code>
  );
}
