"use client";
import { useEffect, useState } from "react";

export interface TerminalLine {
  type: "prompt" | "command" | "output" | "blank";
  text: string;
  delay?: number;
}

interface TerminalProps {
  sequences: TerminalLine[][];
  title?: string;
  loop?: boolean;
}

export function Terminal({ sequences, title = "terminal", loop = true }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [typing, setTyping] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [seqIdx, setSeqIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "wait" | "done">("typing");

  const seq = sequences[seqIdx] || [];
  const currentLine = seq[lineIdx];

  useEffect(() => {
    if (phase === "done") {
      const t = setTimeout(() => {
        if (loop) {
          setLines([]);
          setTyping("");
          setLineIdx(0);
          setCharIdx(0);
          setSeqIdx((i) => (i + 1) % sequences.length);
          setPhase("typing");
        }
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [phase, loop, sequences.length]);

  useEffect(() => {
    if (phase !== "typing" || !currentLine) return;

    if (currentLine.type === "blank" || currentLine.type === "output") {
      const t = setTimeout(() => {
        setLines((l) => [...l, currentLine]);
        advanceLine();
      }, currentLine.delay || (currentLine.type === "output" ? 100 : 50));
      return () => clearTimeout(t);
    }

    // typing animation for prompt/command
    if (charIdx < currentLine.text.length) {
      const speed = currentLine.type === "prompt" ? 40 : 55;
      const t = setTimeout(() => {
        setTyping(currentLine.text.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      // finished typing this line
      const t = setTimeout(() => {
        setLines((l) => [...l, { ...currentLine, text: typing || currentLine.text }]);
        setTyping("");
        setCharIdx(0);
        advanceLine();
      }, 300);
      return () => clearTimeout(t);
    }
  });

  function advanceLine() {
    if (lineIdx + 1 < seq.length) {
      setLineIdx((i) => i + 1);
    } else {
      setPhase("done");
    }
  }

  function renderLine(line: TerminalLine, i: number) {
    if (line.type === "blank") return <div key={i} className="h-3" />;
    if (line.type === "prompt") {
      return (
        <div key={i} className="flex gap-2">
          <span className="terminal-prompt select-none">❯</span>
          <span className="terminal-command">{line.text}</span>
        </div>
      );
    }
    if (line.type === "command") {
      return (
        <div key={i} className="flex gap-2">
          <span className="terminal-prompt select-none">❯</span>
          <span className="terminal-command">{line.text}</span>
        </div>
      );
    }
    return (
      <div key={i} className="terminal-output pl-4">
        {line.text}
      </div>
    );
  }

  const currentTypingLine = currentLine && phase === "typing" && charIdx > 0;

  return (
    <div className="terminal-window w-full">
      <div className="terminal-titlebar">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span
          className="ml-3 text-xs"
          style={{ color: "#586e75", fontFamily: "monospace" }}
        >
          {title}
        </span>
      </div>
      <div className="terminal-body min-h-[180px]">
        {lines.map(renderLine)}
        {currentTypingLine && (
          <div className="flex gap-2">
            {(currentLine.type === "prompt" || currentLine.type === "command") && (
              <span className="terminal-prompt select-none">❯</span>
            )}
            <span className="terminal-command">{typing}</span>
            <span className="terminal-cursor" />
          </div>
        )}
        {phase === "done" && (
          <div className="flex gap-2 mt-1">
            <span className="terminal-prompt select-none">❯</span>
            <span className="terminal-cursor" />
          </div>
        )}
      </div>
    </div>
  );
}

// Pre-built demo sequences for the home page
export const HOME_SEQUENCES: TerminalLine[][] = [
  [
    { type: "command", text: "cd my-project && claude" },
    { type: "output", text: "✓ Claude Code ready. Type your request below.", delay: 500 },
    { type: "blank", text: "" },
    { type: "prompt", text: "what does this project do?" },
    { type: "output", text: "Analyzing your codebase...", delay: 800 },
    { type: "output", text: "This is a REST API built with Express + TypeScript.", delay: 400 },
    { type: "output", text: "It handles user auth, product catalog, and order management.", delay: 300 },
  ],
  [
    { type: "command", text: "claude" },
    { type: "blank", text: "" },
    { type: "prompt", text: "fix the login bug where users see a blank screen" },
    { type: "output", text: "Reading src/auth/login.ts...", delay: 600 },
    { type: "output", text: "Found issue: missing null check on session.user", delay: 500 },
    { type: "output", text: "✓ Fixed in src/auth/login.ts (line 47)", delay: 400 },
    { type: "output", text: "✓ Tests passing", delay: 300 },
  ],
  [
    { type: "command", text: "claude" },
    { type: "blank", text: "" },
    { type: "prompt", text: "write unit tests for the auth module and run them" },
    { type: "output", text: "Reading src/auth/...", delay: 500 },
    { type: "output", text: "Writing tests/auth.test.ts...", delay: 600 },
    { type: "output", text: "✓ 12 tests written", delay: 400 },
    { type: "output", text: "Running npm test...", delay: 500 },
    { type: "output", text: "✓ 12/12 passing (1.2s)", delay: 300 },
  ],
  [
    { type: "command", text: "claude" },
    { type: "blank", text: "" },
    { type: "prompt", text: "commit my changes and create a PR" },
    { type: "output", text: "Reviewing changes: 3 files modified", delay: 600 },
    { type: "output", text: "git commit -m 'fix: null check on session.user in login'", delay: 500 },
    { type: "output", text: "gh pr create --title 'Fix blank screen on login'", delay: 400 },
    { type: "output", text: "✓ PR #47 created: github.com/you/project/pull/47", delay: 300 },
  ],
];
