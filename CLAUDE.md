# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Dev server: `npm run dev` (runs at http://localhost:3000)
- Build: `npm run build`
- Lint: `npm run lint`
- Type check: `npx tsc --noEmit`
- Re-scrape docs: `npx tsx scripts/scrape.ts`

## Architecture

**Next.js 14 App Router** with all pages statically generated.

```
app/                        # Pages (App Router)
  page.tsx                  # Home/hero page
  learn/[module]/page.tsx   # 8 learning module pages
  reference/commands/       # Searchable CLI reference
  reference/cheatsheet/     # Print-friendly cheat sheet
  tools/claude-md-builder/  # Interactive CLAUDE.md generator
  tools/hook-builder/       # Visual hook JSON configurator
components/
  nav/Sidebar.tsx           # Desktop sidebar navigation
  nav/MobileNav.tsx         # Mobile top navigation
  Terminal.tsx              # Animated typewriter terminal demo
  CodeBlock.tsx             # Syntax-highlighted code blocks
  SpotlightCard.tsx         # Aceternity-style hover spotlight cards
  AnimatedSection.tsx       # Intersection-observer scroll reveals
  LearnLayout.tsx           # Shared layout for all /learn/* pages
  LenisProvider.tsx         # Smooth scroll wrapper
  CopyButton.tsx            # Copy-to-clipboard button
  OsTabs.tsx                # Mac/Windows/Linux tabbed code examples
  TryThis.tsx               # Copy-ready prompt suggestion blocks
  ProgressTracker.tsx       # localStorage-based section progress
data/docs/                  # 60 scraped doc pages as JSON
  _index.json               # Index of all pages
  *.json                    # Individual page data
scripts/
  scrape.ts                 # Playwright scraper for all doc pages
lib/
  nav.ts                    # Navigation structure definition
```

## Key Conventions

- All animation components must be `"use client"` — server components cannot have event handlers
- `LearnLayout` provides the shared header, breadcrumb, sidebar progress tracker, and prev/next nav for all learn pages
- Aurora background uses CSS animations defined in `globals.css` (`.aurora-1/2/3`)
- Spotlight cards use CSS custom properties `--mouse-x/y` set via `onMouseMove`
- Color palette: `#7c3aed` (purple primary), `#4f46e5` (indigo), `#09090f` (background)
- Fonts: Inter (`--font-sans`), JetBrains Mono (`--font-mono`)

## Adding a New Learn Module

1. Create `app/learn/<slug>/page.tsx`
2. Use `<LearnLayout>` with `moduleId`, `sections[]`, `prev`/`next` props
3. Add entry to `LEARN_MODULES` array in `app/page.tsx`
4. Add to sidebar in `lib/nav.ts`
