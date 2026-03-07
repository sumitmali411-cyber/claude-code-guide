import { LearnLayout } from "@/components/LearnLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { TryThis } from "@/components/TryThis";
import { AnimatedSection } from "@/components/AnimatedSection";

const SECTIONS = [
  "What is MCP",
  "Add MCP servers",
  "Popular MCP integrations",
  "Use MCP in prompts",
  "MCP resources with @",
];

export default function McpPage() {
  return (
    <LearnLayout
      title="MCP — Model Context Protocol"
      description="Connect Claude to external tools: databases, Jira, Slack, GitHub, Figma, and any custom service."
      moduleId="mcp"
      sections={SECTIONS}
      readTime="8 min read"
      docsUrl="https://code.claude.com/docs/en/mcp"
      prev={{ href: "/learn/hooks", label: "Hooks" }}
      next={{ href: "/learn/advanced", label: "Advanced" }}
    >

      <AnimatedSection>
        <h2>What is MCP?</h2>
        <p>
          The <strong>Model Context Protocol</strong> is an open standard that lets Claude
          connect to external data sources and tools. With MCP, Claude can:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          {[
            { icon: "📋", text: "Read design docs from Google Drive or Notion" },
            { icon: "🎫", text: "Update tickets in Jira or Linear" },
            { icon: "💬", text: "Read threads from Slack" },
            { icon: "🔍", text: "Query your database directly" },
            { icon: "🎨", text: "Pull designs from Figma" },
            { icon: "🐙", text: "Manage GitHub repos, issues, PRs" },
            { icon: "📊", text: "Read monitoring data from Datadog" },
            { icon: "🔧", text: "Use your own custom tooling" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3 rounded-lg p-3"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <span>{icon}</span>
              <span className="text-sm" style={{ color: "#94a3b8" }}>{text}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Add MCP Servers</h2>
        <p>Use the CLI to add any MCP server:</p>
        <CodeBlock lang="bash" code={`# Add an MCP server interactively
claude mcp add

# Add a specific server (example: filesystem)
claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem /path

# Add GitHub MCP
claude mcp add github -- npx -y @modelcontextprotocol/server-github

# List configured servers
claude mcp list

# Remove a server
claude mcp remove <name>`} />
        <p>Or configure directly in settings:</p>
        <CodeBlock
          lang="json"
          label="~/.claude/settings.json"
          code={`{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "$GITHUB_TOKEN"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://localhost/mydb"
      }
    }
  }
}`}
        />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Popular MCP Integrations</h2>
        <div className="space-y-3 my-4">
          {[
            {
              name: "GitHub",
              pkg: "@modelcontextprotocol/server-github",
              use: "Read/create issues, PRs, code search",
            },
            {
              name: "PostgreSQL",
              pkg: "@modelcontextprotocol/server-postgres",
              use: "Query databases, inspect schemas",
            },
            {
              name: "Filesystem",
              pkg: "@modelcontextprotocol/server-filesystem",
              use: "Read files outside your project directory",
            },
            {
              name: "Slack",
              pkg: "@modelcontextprotocol/server-slack",
              use: "Read channel messages, search conversations",
            },
            {
              name: "Google Drive",
              pkg: "@modelcontextprotocol/server-gdrive",
              use: "Read docs, spreadsheets, slides",
            },
            {
              name: "Brave Search",
              pkg: "@modelcontextprotocol/server-brave-search",
              use: "Real-time web search from within Claude",
            },
          ].map(({ name, pkg, use }) => (
            <div key={name} className="rounded-xl p-4"
              style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm" style={{ color: "#e2e8f0" }}>{name}</span>
                <code className="text-xs" style={{ color: "#64748b", fontFamily: "monospace" }}>{pkg}</code>
              </div>
              <p className="text-sm" style={{ color: "#64748b" }}>{use}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>Use MCP in Prompts</h2>
        <p>Once servers are connected, use them naturally in conversation:</p>
        <TryThis title="MCP-powered prompts" prompts={[
          "read the open issues on our GitHub repo and prioritize them",
          "look at the Jira ticket CCG-123 and implement what it describes",
          "query the users table and show me users created this week",
          "read the latest Slack messages in #engineering and summarize them",
          "pull the latest designs from Figma and implement the new button component",
          "search the web for the best approach to implement OAuth2 PKCE flow",
        ]} />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <h2>MCP Resources with @</h2>
        <p>Reference MCP resources directly using @ syntax:</p>
        <CodeBlock lang="bash" code={`# Reference a GitHub issue
Show me the data from @github:repos/owner/repo/issues/42

# Reference a database resource
Query @postgres:tables/users for users created this week

# Reference a file resource
Analyze @filesystem:/path/to/large-file.log`} />
      </AnimatedSection>

    </LearnLayout>
  );
}
