# fairGround Design System — brief

A **layered, multi-brand design system** by fairGround (`fairground-co`). Consistency
across products comes from a shared **token contract**, not shared components — every
layer codes against the same semantic token names/roles, so any widget renders
coherently under any brand and a theme swap recolors everything.

*Org/business context (project inventory, planning, governance) lives in the private
`fairground-co/ops` repo. This file covers only what the design system is and how
it's built.*

## The layers

```
Applications      one repo per app; installs core + widgets it uses + its org's theme
Themes            <org>-theme repos — brand token VALUES only; never components
Brand assets      <org>-brand-assets repos (PRIVATE) — licensed fonts/logos only
Shared widgets    @fairground-co/mapview · listview · … — FUNCTIONAL names, no
                  app/org identity; graduate here from apps once generic (lazy)
Core              @fairground-co/core — generic primitives + THE token contract
                  + a neutral reference theme
```

## Rules that fall out of this

- **Core** holds only generic, brand-neutral primitives + the contract + a neutral
  reference theme. Ships a compact density tier and a high-contrast outdoor/field
  mode.
- **Shared widget packages** depend on core, stay theme-agnostic (contract tokens
  only, no brand values), and are named by function, never by consumer.
- **Themes are token values only** — a separate layer, one public repo per org.
  Cascade: `core reference ← brand base theme ← app/tenant runtime override`.
- **Incubate in the app, graduate on the second consumer.** App-specific widgets live
  inside their app. When a second consumer appears, the widget moves here under a
  functional name (app identity stripped); ownership transfers to core. No permanent
  aliases — one-time hard cutover if a published package must be superseded.
- **One styling system.** The menu grows by *functional* variant (e.g. edit-in-place
  vs not; rail vs ring selection), never by brand. Brand divergence exists solely as
  theme values.
- **No licensed assets in public repos.** Fonts/logos ship only via the private
  `<org>-brand-assets` packages; public themes reference fonts by family name.

## Reuse discovery (how agents avoid reinventing)

Before building anything reusable: (1) check the package catalog here — consume if it
exists; (2) check `graduation-candidate` issues — if an app-internal version exists
elsewhere, you're the second consumer: graduate it; (3) otherwise build app-internal
and open a `graduation-candidate` issue if it smells reusable. See `AGENTS.md`.

## Publishing

GitHub Packages under `@fairground-co/*` + changesets; semver per package; apps pin
versions and upgrade deliberately (a DS release auto-files an upgrade issue in each
consuming app).

## Current phase

Token-contract drafting, then Phase 1: partition-import of the seed system
(`nwa-equality-design-system`) into `packages/core` + external theme/brand-assets
repos. See `SESSION_HANDOFF.md` for live state and `DECISIONS.md` for the record.
