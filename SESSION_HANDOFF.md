# Session handoff — decisions settled, token contract is next

**Status (2026-07-09): interview/decision phase COMPLETE; no build work yet.**
`DECISIONS.md` here holds the design-system record (#1–13, #18–21); org-scoped
context and decisions live in the private `fairground-co/ops` repo — fairGround
agents read that repo's `SESSION_HANDOFF.md` too.

## What's settled here
- **Topology (#8–12):** `@fairground-co/*`; this repo = public generic IP,
  functionally-named packages; per-org theme repos (public) + brand-assets repos
  (private); incubate-in-app + graduation doctrine.
- **Doctrine (#13, #18):** reuse-discovery gate (see `AGENTS.md`); adapt →
  genericize → re-import pipeline; one-styling invariant.
- **Design (#19–21):** border + optional shadow; rail/ring selection variants;
  drift = composable gap-fill + caliper with behind/ahead roles; snap-slider spec;
  both nav models as core layout options. Component plan: `docs/adoption-plan.md`.

## Next build steps
1. **Draft the token contract** — the last blocker before splitting. Inputs:
   `docs/adoption-plan.md` (density axis, mono role, `--dataviz-*` roles including
   `--path-planned/actual/drift-behind/drift-ahead`), the seed system's tokens (the
   base), DECISIONS #20–21.
2. **Phase 1 partition-import** of `nwa-equality-design-system`: classify each
   element → `packages/core` / theme repo / private brand-assets repo / app.
   Licensed files never touch public history. Then workspaces + changesets +
   publish `0.x`.

## References
- `docs/adoption-plan.md` — component-level adoption plan for core.
- `AGENTS.md` — operating rules incl. the reuse-discovery gate.
- Private org context: `fairground-co/ops`.
