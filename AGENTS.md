# AGENTS.md — operating rules for ALL developer-agents in this repo

Both **Claude Code** and **Antigravity** MUST read this before any action.
Tool-native files (`CLAUDE.md`, `GEMINI.md`) only point here — this is the
canonical source. See `PROJECT_BRIEF.md` for full project context and direction.

## Before you start
1. `git pull --rebase` your branch. Read `SESSION_HANDOFF.md`, `DECISIONS.md`,
   `CHANGELOG.md`, and any `docs/` for the area you're touching. fairGround agents:
   org-internal context (inventory, planning, governance) lives in the private
   `fairground-co/ops` repo — read its `SESSION_HANDOFF.md` too.
2. Find your task on the GitHub Project board. **Assign the issue to yourself.**
   If it's assigned to the other agent, pick another — do not touch its branch or
   files. Default domain ownership reduces overlap (see `PROJECT_BRIEF.md` §7-coord);
   override per issue only by reassigning it first.

## While you work
- **Separate locals, coordinate via Git.** Never two live agents in one working
  tree — same machine → `git worktree` per agent; different envs → separate clones.
- One branch per issue: `cc/<issue#>-slug` (Claude Code) or `ag/<issue#>-slug`
  (Antigravity). Never share a branch with the other agent.
- Commit small, push often, `pull --rebase` before opening a PR. Never edit `main`
  directly; never force-push a shared branch. Resolve conflicts in the PR.
- Post progress as issue comments so a fresh session of either agent can resume.

## Before you build something reusable
Reuse is discovered, not snooped. Before writing a new widget or backend helper:
1. **Check the package catalog** — `design-system` / `toolkit` published packages +
   `PACKAGES.md`. Shipped already? → **consume it.**
2. **Check `graduation-candidate` issues** in `design-system`. An app-internal version
   exists in another app? → you're the **second consumer**: **graduate it** (that issue is
   the graduation task), don't reinvent.
3. **Neither?** → build it app-internal; if it smells reusable, **open a
   `graduation-candidate` issue** so the next agent finds it. Bias toward over-registering.

## Before you finish
- Update `CHANGELOG.md`; refresh `SESSION_HANDOFF.md`; add a `DECISIONS.md` entry if
  you settled an architecture question. Add a **changeset** if you changed a published
  package.
- Open a PR referencing the issue; ensure CI (build/typecheck/test) is green. Merge
  only per this repo's human-review policy.

## Versioning (all repos, by default)
- **Conventional commits** everywhere: `feat:` / `fix:` / `docs:` / `chore:` /
  `refactor:`; append `!` for breaking (`feat!:`).
- **Published packages**: semver via **changesets** — any PR touching a published
  package includes a changeset (bump type + one-line summary). Releases = merging
  the bot "Version Packages" PR (Kyle's release gate).
- **Deployable apps**: **release-please** — bot release PR carries version +
  changelog from conventional commits; merging it releases.
- **Docs/scripts repos**: CHANGELOG.md + git history; adopt release-please only
  when a deployable app appears.
- **0.x**: breaking-in-minor tolerated; go 1.0.0 at two production consumers.
  Post-1.0 majors are deliberate, Kyle-reviewed events.

## Never
- Two agents in one working tree. Data files or secrets in git. Client brand
  assets / licensed fonts in shared packages. Editing another agent's in-flight branch.

## Coordination substrate
GitHub is the live coordination state: **Issues = tasks**, assignee + labels
(`agent:claude-code` / `agent:antigravity`, status) = ownership, **Project board** =
status, **PRs** = integration, issue/PR comments = the progress log. These files
encode the *rules*; GitHub holds the *state*. Nothing durable lives only in an
agent's memory.
