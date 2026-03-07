/**
 * Scraper for Claude Code docs (code.claude.com/docs)
 * Fetches all pages listed in llms.txt and saves structured JSON to data/docs/
 */

import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import * as http from "http";

const BASE = "https://code.claude.com/docs";
const OUT_DIR = path.join(process.cwd(), "data", "docs");

interface DocPage {
  slug: string;
  title: string;
  description: string;
  url: string;
  content: string;
  sections: Section[];
  codeBlocks: CodeBlock[];
  tips: string[];
  warnings: string[];
}

interface Section {
  level: number;
  heading: string;
  content: string;
}

interface CodeBlock {
  lang: string;
  code: string;
  label?: string;
}

function fetch(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { headers: { "User-Agent": "claude-code-guide-scraper/1.0" } }, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetch(res.headers.location as string).then(resolve).catch(reject);
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function extractSections(md: string): Section[] {
  const sections: Section[] = [];
  const lines = md.split("\n");
  let current: Section | null = null;
  let buffer: string[] = [];

  for (const line of lines) {
    const h = line.match(/^(#{1,4})\s+(.+)/);
    if (h) {
      if (current) {
        current.content = buffer.join("\n").trim();
        sections.push(current);
      }
      current = { level: h[1].length, heading: h[2].trim(), content: "" };
      buffer = [];
    } else {
      buffer.push(line);
    }
  }
  if (current) {
    current.content = buffer.join("\n").trim();
    sections.push(current);
  }
  return sections;
}

function extractCodeBlocks(md: string): CodeBlock[] {
  const blocks: CodeBlock[] = [];
  const re = /```(\w*)[^\n]*\n([\s\S]*?)```/g;
  let m;
  while ((m = re.exec(md))) {
    const code = m[2].trim();
    if (code.length > 0) {
      blocks.push({ lang: m[1] || "text", code });
    }
  }
  return blocks;
}

function extractTips(md: string, marker: string): string[] {
  const results: string[] = [];
  // Match <Tip>, <Note>, <Warning>, <Info> style tags
  const re = new RegExp(`<${marker}[^>]*>([\\s\\S]*?)<\\/${marker}>`, "gi");
  let m;
  while ((m = re.exec(md))) {
    results.push(m[1].trim().replace(/\n+/g, " "));
  }
  // Also match > blockquote style
  if (marker === "Tip") {
    const bq = md.match(/^> \*\*Tips?:?\*\*\n([\s\S]*?)(?=\n\n|\n#|$)/gm);
    if (bq) results.push(...bq.map((b) => b.replace(/^> ?/gm, "").trim()));
  }
  return results;
}

function extractDescription(md: string): string {
  const m = md.match(/^>\s+(.+)/m);
  return m ? m[1].trim() : "";
}

function extractTitle(md: string): string {
  const m = md.match(/^#\s+(.+)/m);
  return m ? m[1].trim() : "";
}

function slugFromUrl(url: string): string {
  return url.replace(/.*\/en\//, "").replace(/\.md$/, "");
}

async function parseLlmsTxt(): Promise<Array<{ title: string; url: string; description: string }>> {
  const txt = await fetch(`${BASE}/llms.txt`);
  const pages: Array<{ title: string; url: string; description: string }> = [];
  const lines = txt.split("\n");
  for (const line of lines) {
    // Format: - [Title](url): description
    const m = line.match(/^-\s+\[([^\]]+)\]\(([^)]+)\)(?::\s+(.*))?/);
    if (m) {
      pages.push({ title: m[1], url: m[2], description: m[3] || "" });
    }
  }
  // Also handle markdown table format
  for (const line of lines) {
    const m = line.match(/\|\s*([^|]+)\s*\|\s*(https?:\/\/[^|\s]+)\s*\|\s*([^|]*)\s*\|/);
    if (m && m[2].includes("code.claude.com")) {
      pages.push({ title: m[1].trim(), url: m[2].trim(), description: m[3].trim() });
    }
  }
  return pages;
}

async function scrapePage(url: string, title: string, description: string): Promise<DocPage> {
  // Fetch the .md version
  const mdUrl = url.endsWith(".md") ? url : url.replace(/\/?$/, ".md");
  const md = await fetch(mdUrl);

  const extractedTitle = extractTitle(md) || title;
  const extractedDesc = extractDescription(md) || description;
  const sections = extractSections(md);
  const codeBlocks = extractCodeBlocks(md);
  const tips = [
    ...extractTips(md, "Tip"),
    ...extractTips(md, "Note"),
    ...extractTips(md, "Info"),
  ];
  const warnings = extractTips(md, "Warning");

  return {
    slug: slugFromUrl(url),
    title: extractedTitle,
    description: extractedDesc,
    url,
    content: md,
    sections,
    codeBlocks,
    tips,
    warnings,
  };
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log("Fetching page list from llms.txt...");
  let pages = await parseLlmsTxt();

  if (pages.length === 0) {
    // Fallback: hardcoded list from our research
    console.log("Parsing llms.txt returned 0 pages, using known page list...");
    pages = KNOWN_PAGES;
  }

  console.log(`Found ${pages.length} pages to scrape.\n`);

  const index: Array<{ slug: string; title: string; description: string; url: string }> = [];

  for (let i = 0; i < pages.length; i++) {
    const { title, url, description } = pages[i];
    const slug = slugFromUrl(url);
    console.log(`[${i + 1}/${pages.length}] ${slug}`);

    try {
      const doc = await scrapePage(url, title, description);
      fs.writeFileSync(
        path.join(OUT_DIR, `${slug}.json`),
        JSON.stringify(doc, null, 2)
      );
      index.push({ slug, title: doc.title, description: doc.description, url });
    } catch (e) {
      console.error(`  ✗ Failed: ${(e as Error).message}`);
    }

    // polite delay
    await sleep(300);
  }

  fs.writeFileSync(path.join(OUT_DIR, "_index.json"), JSON.stringify(index, null, 2));
  console.log(`\nDone! Scraped ${index.length} pages → data/docs/`);
}

const KNOWN_PAGES = [
  { title: "Claude Code overview", url: "https://code.claude.com/docs/en/overview.md", description: "Claude Code is an agentic coding tool" },
  { title: "Quickstart", url: "https://code.claude.com/docs/en/quickstart.md", description: "Welcome to Claude Code!" },
  { title: "Best Practices", url: "https://code.claude.com/docs/en/best-practices.md", description: "Tips and patterns for getting the most out of Claude Code" },
  { title: "Common workflows", url: "https://code.claude.com/docs/en/common-workflows.md", description: "Step-by-step guides for everyday tasks" },
  { title: "How Claude Code works", url: "https://code.claude.com/docs/en/how-claude-code-works.md", description: "Understand the agentic loop, built-in tools" },
  { title: "How Claude remembers your project", url: "https://code.claude.com/docs/en/memory.md", description: "CLAUDE.md files and auto memory" },
  { title: "Extend Claude with skills", url: "https://code.claude.com/docs/en/skills.md", description: "Create, manage, and share skills" },
  { title: "Automate workflows with hooks", url: "https://code.claude.com/docs/en/hooks-guide.md", description: "Run shell commands automatically" },
  { title: "Hooks reference", url: "https://code.claude.com/docs/en/hooks.md", description: "Reference for Claude Code hook events" },
  { title: "Connect Claude Code to tools via MCP", url: "https://code.claude.com/docs/en/mcp.md", description: "Model Context Protocol" },
  { title: "CLI reference", url: "https://code.claude.com/docs/en/cli-reference.md", description: "Complete reference for Claude Code CLI" },
  { title: "Claude Code settings", url: "https://code.claude.com/docs/en/settings.md", description: "Configure Claude Code" },
  { title: "Configure permissions", url: "https://code.claude.com/docs/en/permissions.md", description: "Control what Claude Code can access" },
  { title: "Create custom subagents", url: "https://code.claude.com/docs/en/sub-agents.md", description: "Specialized AI subagents" },
  { title: "Orchestrate teams of Claude Code sessions", url: "https://code.claude.com/docs/en/agent-teams.md", description: "Coordinate multiple Claude Code instances" },
  { title: "Use Plan Mode for safe code analysis", url: "https://code.claude.com/docs/en/interactive-mode.md", description: "Keyboard shortcuts and interactive features" },
  { title: "Run Claude Code programmatically", url: "https://code.claude.com/docs/en/headless.md", description: "Use Agent SDK programmatically" },
  { title: "Claude Code GitHub Actions", url: "https://code.claude.com/docs/en/github-actions.md", description: "Integrate with GitHub Actions" },
  { title: "Claude Code GitLab CI/CD", url: "https://code.claude.com/docs/en/gitlab-ci-cd.md", description: "Integrate with GitLab CI/CD" },
  { title: "Use Claude Code in VS Code", url: "https://code.claude.com/docs/en/vs-code.md", description: "VS Code extension" },
  { title: "JetBrains IDEs", url: "https://code.claude.com/docs/en/jetbrains.md", description: "JetBrains plugin" },
  { title: "Claude Code Desktop", url: "https://code.claude.com/docs/en/desktop.md", description: "Desktop app" },
  { title: "Claude Code on the web", url: "https://code.claude.com/docs/en/claude-code-on-the-web.md", description: "Run in browser" },
  { title: "Claude Code in Slack", url: "https://code.claude.com/docs/en/slack.md", description: "Delegate tasks from Slack" },
  { title: "Continue local sessions with Remote Control", url: "https://code.claude.com/docs/en/remote-control.md", description: "Remote control sessions" },
  { title: "Speed up responses with fast mode", url: "https://code.claude.com/docs/en/fast-mode.md", description: "Fast mode" },
  { title: "Checkpointing", url: "https://code.claude.com/docs/en/checkpointing.md", description: "Track and rewind edits" },
  { title: "Troubleshooting", url: "https://code.claude.com/docs/en/troubleshooting.md", description: "Solutions to common issues" },
  { title: "Advanced setup", url: "https://code.claude.com/docs/en/setup.md", description: "System requirements and installation" },
  { title: "Authentication", url: "https://code.claude.com/docs/en/authentication.md", description: "Log in and configure authentication" },
  { title: "Security", url: "https://code.claude.com/docs/en/security.md", description: "Security safeguards and best practices" },
  { title: "Data usage", url: "https://code.claude.com/docs/en/data-usage.md", description: "Data usage policies" },
  { title: "Manage costs effectively", url: "https://code.claude.com/docs/en/costs.md", description: "Track token usage and reduce costs" },
  { title: "Model configuration", url: "https://code.claude.com/docs/en/model-config.md", description: "Model configuration and aliases" },
  { title: "Extend Claude Code", url: "https://code.claude.com/docs/en/features-overview.md", description: "When to use CLAUDE.md, Skills, subagents, hooks, MCP" },
  { title: "Create plugins", url: "https://code.claude.com/docs/en/plugins.md", description: "Create custom plugins" },
  { title: "Discover and install plugins", url: "https://code.claude.com/docs/en/discover-plugins.md", description: "Find and install plugins" },
  { title: "Sandboxing", url: "https://code.claude.com/docs/en/sandboxing.md", description: "Sandboxed bash tool" },
  { title: "Output styles", url: "https://code.claude.com/docs/en/output-styles.md", description: "Adapt Claude Code for different uses" },
  { title: "Monitoring", url: "https://code.claude.com/docs/en/monitoring-usage.md", description: "OpenTelemetry for Claude Code" },
  { title: "Amazon Bedrock", url: "https://code.claude.com/docs/en/amazon-bedrock.md", description: "Configure through Amazon Bedrock" },
  { title: "Google Vertex AI", url: "https://code.claude.com/docs/en/google-vertex-ai.md", description: "Configure through Google Vertex AI" },
  { title: "Enterprise deployment overview", url: "https://code.claude.com/docs/en/third-party-integrations.md", description: "Third-party integrations" },
  { title: "Changelog", url: "https://code.claude.com/docs/en/changelog.md", description: "Release notes" },
];

main().catch(console.error);
