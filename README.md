# agent-orchestrators

A researched, filterable catalog of GUI/desktop/web tools for running multiple
parallel AI coding-agent sessions (Claude Code, Codex, Copilot, Gemini CLI,
Aider, and others) across one or more harnesses — generally by reusing
subscriptions you already pay for rather than raw API keys. The canonical
example in this space is [traycer.ai](https://traycer.ai).

**Live site:** https://nsheaps.github.io/agent-orchestrators/
(single static page — `multi-agent-orchestrators.html`, deployed as-is via
GitHub Actions on every push to `main`)

## What's here

- `multi-agent-orchestrators.html` — the artifact. All tool data lives in the
  `TOOLS` array in its `<script>` block; that array is the single source of
  truth. Cards show name / description / license / form factor at rest and
  expand to reveal auth model, supported harnesses, repo link, and caveats.
- `CHANGELOG.md` — verification log: what was confirmed, corrected, added, or
  couldn't be confirmed on each pass.

## Updating

Edit the `TOOLS` array directly in the HTML file, then push to `main` — the
Pages deploy workflow picks it up automatically. One-time setup: repo
Settings → Pages → Source: **GitHub Actions**.

This space moves fast; re-verify licenses and repo links periodically —
several tools have already been renamed or shut down since this list was
first assembled (see the changelog).
