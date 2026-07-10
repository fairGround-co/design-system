# Changelog

## 2026-07-10 — Phase 1 partition-import executed (issue #2)

- **`packages/core` created** (`@fairground-co/core`): token contract v0 as CSS
  custom properties (neutral reference theme, light + dark + density axis +
  reduced-motion) with TS types (`TokenName` union, `ThemeValues`, tenant
  whitelist + `applyTenantOverrides`), plus 33 generic primitives + 2 hooks
  genericized from `nwa-equality-design-system` (contract tokens only). Exact
  per-hue `-soft/-deep/-bright` `color-mix` recipes extracted from the seed
  source; derivation tokens declared across all cascade scopes so theme
  overrides recompute them (DECISIONS #28). Build: tsup/esbuild → ESM + IIFE +
  bundled CSS + rolled types; typecheck green; CI workflow added.
- **npm workspaces + changesets** stood up (root scripts, initial minor
  changeset → 0.1.0 on release).
- **`nwae-theme` populated** (PR nwae-theme#1): full NWA value set incl. the
  light/dark accent flip, 12-slot categorical palette, hand-tuned status inks,
  font family names, `docs/voice.md`.
- **`nwae-brand-assets` populated** (PR nwae-brand-assets#1, PRIVATE): 17
  licensed .otf + @font-face src + 12 logos + foundry license notice. No
  licensed file touched public history.
- **Stay-with-app inventory** (parade widgets, editor, NWA glyph registry, brand
  presets) recorded on issue #2; partition rules in `docs/partition-map.md`.
- **Scratch-consumer verification passed**: packed tarballs installed into a
  Vite app; recolor confirmed across nwae-light / nwae-dark (accent flip) /
  neutral-light / neutral-dark; categorical derivations recompute from brand
  values; density remap verified.
- **Published 2026-07-10**: `@fairground-co/core@0.1.0`, `@fairground-co/nwae-theme@0.1.0`, `@fairground-co/nwae-brand-assets@0.1.0` (restricted) on GitHub Packages; registry install verified by the scratch consumer.
- **Lookbook** (added post-publish, on the PR): core builds `dist/lookbook.html`
  — a self-contained token + component specimen catalog with live resolved
  values; `build-lookbook.mjs` generates each theme repo's branded
  `docs/lookbook.html` (nwae's is on nwae-theme#1, voice rules included). This
  is the visual review surface for theme/contract PRs.

## 2026-07-09 — Token contract v0 draft (issue #1)

- `docs/token-contract.md`: full semantic token set — surfaces/ink, action pair,
  status, capability scope, categorical, selection, elevation (border + optional
  shadow), typography, space/radius/motion/layout, `--viz-*`/`--path-*` dataviz
  namespace, density axis, tenant-override whitelist, reserved slide/map
  namespaces, neutral reference theme. Review checklist fully AGREED 2026-07-09:
  categorical palette expanded to 12 slots (teal, brown, slate, lime adopted; slate/
  lime carry usage caveats).

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
