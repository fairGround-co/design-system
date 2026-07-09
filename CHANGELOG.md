# Changelog

## 2026-07-09 — Token contract v0 draft (issue #1)

- `docs/token-contract.md`: full semantic token set — surfaces/ink, action pair,
  status, capability scope, categorical, selection, elevation (border + optional
  shadow), typography, space/radius/motion/layout, `--viz-*`/`--path-*` dataviz
  namespace, density axis, tenant-override whitelist, reserved slide/map
  namespaces, neutral reference theme. Awaiting Kyle's review (tiered policy).

## 2026-07-09 — Repo partitioned and recreated public

- Org-scoped planning docs moved to the private `fairground-co/ops` repo (see its
  DECISIONS #26); this repo now carries only design-system-scoped material and was
  recreated with clean history before going public. Added `docs/adoption-plan.md`
  (distilled component adoption plan for core).

## 2026-07-09 — Design decisions settled via live samples page

- DECISIONS #18–21: adapt → genericize → re-import pipeline with the one-styling
  invariant; bordered surfaces + optional shadow token; rail + ring selection
  variants; drift = composable gap-fill + caliper with behind/ahead roles.

## 2026-07-09 — Reuse-discovery doctrine committed

- DECISIONS #13: package catalog + `graduation-candidate` issues; three-step
  "before you build something reusable" gate added to `AGENTS.md`.

## 2026-07-08 — Topology refined

- DECISIONS #8–12: `@fairground-co/*` scope; this repo public with functionally-named
  packages; per-org theme repos (public) + brand-assets repos (private);
  owner-prefixed repo naming with bare flagships.

## 2026-07-08 — Repo seeded

- Project seeded from a planning session: brief, standard operating files,
  decisions log, session handoff.
