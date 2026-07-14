# agent-orchestrators

A researched, filterable catalog of GUI/desktop/web tools for running multiple
parallel AI coding-agent sessions (Claude Code, Codex, Copilot, Gemini CLI,
Aider, and others) across one or more harnesses — generally by reusing
subscriptions you already pay for rather than raw API keys. The canonical
example in this space is [traycer.ai](https://traycer.ai).

**Live site:** https://nsheaps.github.io/agent-orchestrators/

## Stack

- **Bun** — package manager, task runner, test runner
- **Nx** — orchestrates the workspace's `dev`/`build`/`lint`/`typecheck`/`test`
  targets (package-based: each app just declares plain npm scripts, no
  `project.json` needed — see `nx.json`)
- **Vue 3** (`<script setup>` + Composition API) + **vue-router** + **Vite**,
  written in strict TypeScript

## What's here

- `apps/web/` — the app. Three routes: `/` (featured Tier-1 picks), `/browse`
  (search + filter the full catalog), `/tools/:slug` (one tool's full detail).
  - `src/data/tools.ts` — the single source of truth for every tool's tier,
    license, form factor, harnesses, auth model, and links (homepage, code
    homepage/repo, developer docs, direct license text).
  - `src/composables/useToolFilters.ts` — search + filter-chip logic, synced
    to the URL query string so filtered views are shareable links.
  - `src/components/`, `src/views/` — UI.
- `CHANGELOG.md` — verification log: what was confirmed, corrected, added, or
  couldn't be confirmed on each research pass.
- `multi-agent-orchestrators.html` — the original single-file prototype this
  app replaced. Kept for history; no longer deployed.

## Developing

```bash
mise install       # bun + node
bun install        # JS/TS deps
bun run dev         # dev server (apps/web)
bun run validate    # lint + typecheck + test + build
```

## Updating the catalog

Edit `apps/web/src/data/tools.ts` directly, then push to `main` — the Pages
deploy workflow rebuilds and republishes automatically. One-time setup: repo
Settings → Pages → Source: **GitHub Actions**.

This space moves fast; re-verify licenses and repo links periodically —
several tools have already been renamed or shut down since this list was
first assembled (see the changelog).
