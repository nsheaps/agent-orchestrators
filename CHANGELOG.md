# Changelog

Verification pass on the multi-agent-orchestrators catalog, run 2026-07-14.
All license/repo/status claims below were checked live against the GitHub API
(`search_repositories`, which reads GitHub's own SPDX license detection,
stars, archived-state, and push timestamps) unless noted otherwise. 29 tools
total, up from 23.

## Corrected

- **Omnara** — the GitHub repo (`omnara-ai/omnara`) now shows as **archived**
  (read-only). License is still confirmed Apache-2.0, but active-development
  status is now genuinely unclear. Flagged with a caution note; kept in
  Tier 1 pending a follow-up check.
- **Crystal → Nimbalyst** — found the actual successor repo, previously
  missing from this catalog: `github.com/nimbalyst/nimbalyst`. Core app is
  MIT; the multi-tenant collaboration-server component
  (`packages/collabv3`) is separately dual-licensed AGPL-3.0/commercial, so
  a blanket "MIT" was inaccurate for the whole project. Added the iOS/Android
  companion app to its form factors.
- **Terragon (OSS)** — license was previously unconfirmed ("open-source
  snapshot"); now confirmed **Apache-2.0** via the GitHub API. Shutdown date
  refined from "~Jan 2026" to "~Feb 2026" (last date existing subscribers
  could use the hosted service).
- **Emdash** — license changed **MIT → Apache-2.0** in Apr 2026 (PR #1691);
  catalog now reflects Apache-2.0. The "33 CLIs" marketing claim couldn't be
  corroborated — official docs say "25+ coding agents," used instead.
- **container-use** — license ambiguity ("MIT or Apache-2.0") resolved:
  it's **Apache-2.0**.
- **cmux** — license is a **dual** GPL-3.0-or-later / paid-commercial split
  (which is why GitHub's badge shows "Other" rather than a clean GPL badge),
  not a plain GPL-3.0-or-later. Noted explicitly.
- **HumanLayer / CodeLayer** — the "MULTICLAUDE" feature named in the old
  entry could not be found anywhere in the current repo (a full code search
  returned zero hits) — removed that claim. The real mechanism is the `hld`
  daemon + the "CodeLayer" app (internally called "WUI"). Corrected form
  factor from TUI-adjacent to genuine **web/desktop GUI**, and moved it to
  reflect that in `forms`.
- **Conductor** — added confirmed YC batch (S24); dropped "OpenCode" from its
  harness list — no source corroborates it.
- **Vibe Kanban** — Bloop's shutdown is now sourced (vibekanban.com/blog,
  GitHub issues #3231/#3408) rather than asserted; added a note that
  community discussion questions ongoing maintenance pace even though the
  repo isn't archived.
- **Sculptor** — license was previously unconfirmed; now confirmed **MIT**
  via the GitHub API. Trimmed its harness list to what's actually
  corroborated (public materials focus on Claude Code specifically).

## Added — promoted from unverified Tier-3 placeholders to confirmed entries

All 8 old Tier-3 entries pointed at the awesome-agent-orchestrators registry
instead of a real repo, with guessed/"provisional" licenses. All 8 turned out
to be real, actively-maintained projects. Most had a genuine GUI + multi-session
+ multi-harness support strong enough to qualify for Tier 1 or 2 outright, so
they were re-tiered rather than just left as verified Tier-3 placeholders:

- **agent-of-empires** → Tier 2 (MIT confirmed, real repo, 2.8k★)
- **Superset** → Tier 1 (real repo `superset-sh/superset`, ~12.4k★ matches
  the earlier estimate; Elastic License 2.0, source-available). Not
  Apache Superset — unrelated project, same name.
- **parallel-code** → Tier 1 (MIT confirmed, real repo `johannesjo/parallel-code`)
- **clideck** → Tier 1 (MIT confirmed, real repo `rustykuntz/clideck`)
- **Proliferate** → Tier 1 (real repo `proliferate-ai/proliferate`; license
  is actually **AGPL-3.0**, not generic "open source" as previously guessed)
- **dorothy** → Tier 1, renamed **Dorothy** (MIT confirmed, real repo
  `Charlie85270/Dorothy`)
- **constellagent** → stayed in Tier 3: real repo, but GitHub detects **no
  LICENSE file at all** — worse than "provisional," this is genuinely
  unlicensed. Flagged prominently rather than guessing a license.
- **agentsmesh** → stayed in Tier 3: real repo is `AgentsMesh/AgentsMesh`
  (not `sampleXbro/agentsmesh`, an unrelated config-sync tool with the same
  name). License is a Business Source License converting to GPL-2.0-or-later.
  Kept out of Tier 1 despite solid GUI/harness facts because its BYOK-first
  auth model is a genuine mismatch with this catalog's subscription-reuse
  thesis — a judgment call, easy to revisit.

## Added — brand new tools

Found via awesome-agent-orchestrators (README reconstructed through targeted
web searches — see Access limitations below), then independently verified
via the GitHub API:

- **AI Maestro** (Tier 1) — `23blocks-OS/ai-maestro`, MIT, self-hosted
  multi-machine web dashboard with agent memory/code-graph search.
- **Claude Command Center** (Tier 1) — `amirfish1/claude-command-center`,
  MIT, local macOS Kanban dashboard for Claude Code/Codex/Cursor/Antigravity/
  Kilo Code sessions.
- **Agent Kanban** (Tier 1) — `saltbo/agent-kanban`, FSL-1.1-ALv2
  (source-available), agent-first Kanban with per-agent Ed25519 identities.
- **Ivy Tendril** (Tier 1) — `Ivy-Interactive/Ivy-Tendril`, FSL-1.1-ALv2,
  local-first Draft→Execute→Review→PR plan orchestration.
- **Fusion** (Tier 1) — `Runfusion/Fusion`, MIT, multi-node "software
  factory" with kanban/graph views and a mission-planning hierarchy.
- **Gas Town** (Tier 2) — `gastownhall/gastown`, MIT, Steve Yegge's
  git-backed multi-agent workspace manager (17k+★); CLI-first with a
  companion web dashboard, so filed under Tier 2 rather than Tier 1.

New license category added to the legend/filters as a result: **FSL / BSL**
(Functional/Business Source License — source-available, not OSI-approved),
now bucketed under the existing "copyleft" filter chip alongside Elastic
License 2.0, since none of those are permissive and the UI only has three
license buckets.

### Considered and explicitly rejected (for the record, not added)

Tools that came up during discovery but didn't meet all three criteria (GUI +
multi-session + multi-harness): **Bernstein** (CLI-primary, only a thin log
viewer), **Centaur** (Slack-thread-native, no dashboard of its own), **kodo**
(post-hoc HTML log viewer, not live session management), **Hephaestus**
(knowledge-graph/skills dashboard, not a session control surface),
**CodexMonitor / clave / 1code** (single-harness only), **herdr / amux /
multi-agent-shogun** (TUI multiplexers, not GUIs), **gnap / swarm-protocol /
wit / guild / shire** (no GUI evidence found). A longer tail (loki-mode, loom,
MiroShark, paperclip, scion, skillfold, 5dive, claude_code_bridge, AGX,
aizen, claude-flow, clawe, ClawTeam, CompanyHelm, agenttier, hcom) had
insufficient signal to justify a deep-dive and are unverified rather than
confirmed-excluded — worth another look if this list gets revisited.

## Access limitations on this pass

- Direct `WebFetch`/raw GitHub fetches (`github.com`, `raw.githubusercontent.com`)
  are blocked by this session's egress policy; all GitHub-hosted facts came
  from the GitHub MCP server's `search_repositories` tool instead (which does
  reach live GitHub API data, including SPDX license detection, star counts,
  and archived state) or from `WebSearch`.
- `github.com/nsheaps?tab=stars` could not be reached at all in this
  environment (JS-rendered, not search-indexed, no MCP tool exposes a
  user's starred repos) — the "check nsheaps' stars" part of the brief
  could not be completed. If this list is revisited with a session that has
  direct GitHub UI access (or the stars exported to a file), that page is
  still worth checking.
- The awesome-agent-orchestrators README itself was never fetched directly;
  its contents were reconstructed via multiple targeted web searches. Treat
  the "new tools found" list as a strong sample, not a guaranteed-complete
  enumeration of that registry.

## Infrastructure

- Added `.github/workflows/deploy.yml` — packages the single HTML file as
  `index.html` and deploys to GitHub Pages on every push to `main` (same
  pattern as `cept`/`github2`, scaled down since there's no build step).
  One-time manual step still required: repo Settings → Pages → Source:
  **GitHub Actions**.
- Added `.github/CODEOWNERS` (`* @nsheaps`).
- Added `nsheaps/agent-orchestrators` to the `managed_repos` list in
  `nsheaps/.github` (`ansible/config/managed-repos.yml`), so it picks up the
  org's shared `apply-repo-settings`, `dispatch-review`, and
  `pr-status-dispatch` automation on the next sync run.
- Not done: `nsheaps/.org`'s human-readable `REPOS.md` catalog (mentioned in
  `nsheaps/.github/REPOS.md` as the canonical human-readable list) is outside
  this session's repo scope — someone with access to `nsheaps/.org` should
  add an entry there too.
