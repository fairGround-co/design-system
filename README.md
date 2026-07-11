# fairGround Design System

Monorepo for fairGround's shared, multi-brand design system.

**→ [Open the lookbook](https://fairground-co.github.io/design-system/)** — the
live specimen catalog: every token in the contract with its resolved value, and
every core primitive rendered interactively, in the neutral reference theme
(light/dark, comfortable/compact). Each org theme repo publishes its own
branded lookbook the same way (e.g.
[NWA Equality](https://fairground-co.github.io/nwae-theme/)). The same file
ships inside the published package at
`node_modules/@fairground-co/core/dist/lookbook.html`.

**Layered architecture** — consistency comes from a shared *token contract*, not
shared components:

- `packages/core` — generic primitives + the token contract + a neutral reference
  theme (+ compact density tier and outdoor/field high-contrast mode)
- `packages/<function>` — shared widgets named by function (`mapview`, `listview`,
  …), theme-agnostic, built on core; created lazily via graduation from apps
- Brand token values live **outside** this repo in per-org theme repos; licensed
  brand assets live in private per-org brand-assets repos

Applications live in their own `fairground-co` repos and consume these as versioned
`@fairground-co/*` packages (GitHub Packages + changesets).

## Start here
1. **`AGENTS.md`** — how every agent works in this repo, including the
   reuse-discovery gate.
2. **`PROJECT_BRIEF.md`** — what this system is and the rules it follows.
3. **`SESSION_HANDOFF.md`** — current state.
4. **`DECISIONS.md`** — the architecture decision log.
5. **`docs/adoption-plan.md`** — the component adoption plan seeding core.
