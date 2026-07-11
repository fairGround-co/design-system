# Decisions Log — fairGround Design System

Append-only. Newest at top. Design-system-scoped decisions only — **org-scoped
decisions (#14–17, #22–25) and the partition record (#26) live in the private
`fairground-co/ops` repo's DECISIONS.md.** Numbering is shared across both files.

## Brand identity model, theme icons, lookbook split (2026-07-11 — with Kyle, issue #6)

31. **The lookbook is modular sections + provenance labels, rendered in two
    flavors from one generator.** The generator stays in `packages/core`.
    Sections are separately-maintained modules composed into a single overview
    (mirrors the Claude Code design-system presentation); each rendered section
    shows its source as a dimmed, smaller, hyperlinked file/URL subheader so an
    agent or dev can jump to the file driving it. Two renders from the same
    generator: the **public stub** (in the theme repo → GitHub Pages) = tokens,
    components, the theme's icon set, and token-explanatory annotation; the
    **complete** render (in the private brand-assets repo) = all of that plus
    real licensed fonts, logos, and the strategic guidance (#29). Modules are
    tagged public/private so the public build simply omits the private modules.
    The complete render is the **canonical review surface** ("one place to
    look"); the public stub is the deliberately-partial window ("half the
    story"). Kyle reviews from the brand repo's complete lookbook.

30. **Icons are a theme-layer library (SVG data) — amends #10.** A theme MAY
    ship an icon-glyph library (name → inner-SVG-markup **data**), consumed by
    core's `Icon` via its `glyphs` prop. This narrows #10's "themes are
    values-only": a theme carries token VALUES **and** an optional icon-glyph
    data library — still no React components, no behavior, no licensed files.
    Glyphs tint via `currentColor` and may reference specific tokens (inline
    `style="fill: var(--token)"`) so they bend with theme values; literal
    "perma-color" fills are allowed for org art (e.g. flag glyphs). A glyph
    that embeds a licensed logo/wordmark is NOT a theme icon — it stays in
    brand-assets (private). **App-created icons are theme content** (org
    vocabulary), promoted app→theme; a broadly-generic glyph may further
    graduate theme→core (parallels widget graduation). Custom UI *widgets* are
    not icons — they keep the widget path. Consequence: NWA's icon registry
    (app-side per the Phase 1 partition) reclassifies to `nwae-theme`, minus
    logo-bearing marks.

29. **Brand identity is one thing, partitioned by publish-safety into a public
    theme facet and a private brand facet; guidance splits strategic-vs-
    explanatory.** Brand identity = colors, type, logos, voice, principles,
    icon vocabulary — not one repo, but two facets of the same identity
    (generic, brand-neutral material lives below both, in core):
    - **Theme (public):** the machine-consumable, publish-safe facet — token
      VALUES + an icon library (#30) + **token-explanatory annotation** (what a
      token means, special-contrast rules, operational "how to use this value"
      notes that must travel with the value) + the public stub lookbook (#31).
    - **Brand-assets (private):** the license/trademark-restricted + strategic
      facet — licensed font files + logo files + **strategic guidance** (voice
      dos/don'ts, visual-foundations philosophy, writing samples, internal
      policy) + the complete lookbook (#31).
    - **Guidance split test:** does the prose explain THE TOKEN (→ theme,
      public) or THE BRAND'S strategy/identity (→ brand-assets, private)?
      Contrast/semantics/operation = public; voice/philosophy/"why" = private.
      This is preference, not licensing — the org chooses how much strategy to
      show the world; **default private** ("take the manual with you").
    - **Dependency direction (access-to-render, not access-to-display):** repos
      are compile-time inputs; end users receive fonts/logos as bytes bundled
      into and served from the deployed app under the app's authorized license.
      The theme stays **independently public and installable without brand
      access** (outsiders may borrow it to learn). Brand-assets build-time-
      consumes theme+core to render its complete lookbook, but its SHIPPED
      package stays a dependency-free leaf (fonts + files). Apps consume
      **core + theme + brand-assets as three DIRECT dependencies** — brand is
      not the app's single entry point.
    Mental model (Kyle): tokens = the car (public, anyone drives); strategic
    guidance = the owner's manual (private, rides in the brand repo); licensed
    assets = the driver's license (gated by registry access).

## Token implementation architecture (2026-07-10 — Phase 1 build, issue #2)

28. **Derived tokens are declared on every cascade scope, and the contract grew
    four additive families the port proved necessary.**
    - *Derivation scoping:* tokens computed from other tokens (`-soft/-deep/
      -bright`, selection, viz ramps, `--match`) are declared on
      `:root, [data-brand], [data-theme], [data-tenant]` — not `:root` alone.
      An unregistered custom property substitutes its `var()`s at the element
      it is declared on and descendants inherit the *resolved* value, so a
      :root-only derivation would freeze neutral values into every derived
      token regardless of theme. Consequence: a mode remap must not point a
      base token at its own derived family (cycle) — dark-mode "lifts" of a
      base hue use literals or a different chain (e.g. nwae dark
      `--status-success: var(--cat-4-bright)`).
    - *Load order is contractual:* core CSS, then theme CSS; themes may
      hand-tune any derived token by re-declaring it.
    - *Contract additions (minor, per the contract's own semver rule):*
      `--status-*-soft/-deep/-bright` and `--scope-*-soft/-deep` derived
      families; `--border-w-accent` (3px active-edge weight);
      `--ring-match` / `--ring-commit` completing the selection hierarchy;
      `--space-8-5` named. Genericization convention: capability/view-op
      coloring uses the mode-stable `--scope-*` tokens; `--accent` is the
      theme-flippable action color. Recorded in `docs/partition-map.md`.

## Elevation, selection, drift — settled (2026-07-09 — samples round 2 review)

21. **Elevation finalized:** committed 1px border (per #20) + **shadow as an optional
    parameter** (elevation token, off/on per theme or app). Observed: subtle-but-nice
    in the field-dark theme, near-invisible in the deep-navy dark theme — dark themes
    may zero it without loss. **Selection: `rail` and `ring` are both committed** as
    separate, owner-neutral selection-style options.
    **Drift encoding chosen:** two composable styles — **gap-fill** (magnitude as
    shaded area between planned/actual) and **caliper** (measured bracket + number) —
    usable independently or combined. Onset-dot and flag-glyph dropped. Drift splits
    into **`drift-behind` / `drift-ahead`** roles: behind = alarm hue, ahead = calm
    positive hue — ahead of plan is good news and must not read as an alarm.

## Elevation + selection (2026-07-09 — samples-page review round 1)

20. **Resting elevation = bordered surfaces (FIRM).** Core's default: 1px border on
    resting cards/panels. Whether a soft shadow is additionally offered as an on/off
    token was pending a border-with/without-shadow sample (resolved in #21).
    **Selection styles: both survive as named functional variants** — descriptive,
    owner-neutral names (**"rail"** = inset edge bar; **"ring"** = accent outline +
    tint). A theme/app chooses which variant its products use. First concrete
    instance of #18's "menu grows by capability."

## Source-system walkthrough outcomes (2026-07-09 — reviewed with Kyle)

19. **Division of labor between the two source systems:** the #18 pipeline pulls
    **behavior from the shipped app, specification from the design draft.** The
    draft contributed formalized tokens, an app-wide dark-theme spec (treat as spec,
    not code), exact state-discipline rules (hover/press/focus/selected/disabled;
    motion 100–200ms no-bounce), KPI stat cards, named Planned-vs-Actual tokens, and
    content/voice rules. The app holds the working interaction machinery
    (edit-in-place, matrices, gantt). Specifics settled:
    - **Snap slider:** one core component (semantic snap stops, keyboard arrows,
      click-rail, persisted state).
    - **Voice/content rules:** org voice lives in per-org theme docs (voice = brand);
      generic discipline (tabular numerals, icon rules) in core docs.
    - **Nav model:** selector-as-header AND sidebar nav are BOTH core layout
      options — functional alternatives; apps pick per product.
    - **Hierarchy-map concept** (nested containment visualization with orbit
      sequencing): worth continued development; not prime-time; incubates as a
      theme-specific skin until the visual + navigation are right; candidate for a
      future generic widget.
    See `docs/adoption-plan.md` for the component-level plan.

## Adoption direction (2026-07-09 — interview with Kyle)

18. **The NWA Pride-derived system is the structural base; other systems adapt TO it
    — via a three-step pipeline:**
    1. **Adapt** — incoming components are first fully adapted to the base system
       (color scheme, structure, shape, behavior).
    2. **Genericize** — the adapted version is de-branded for core (contract tokens
       + neutral reference theme only).
    3. **Re-import** — the originating product consumes the core modules back with
       its own theme values.
    **Invariant: the common design system never possesses two separate stylings.**
    One styling system only; brand divergence exists solely as theme values.
    Alternate *functional* variants of a widget ARE welcome — the menu grows by
    capability, never by brand.

## Reuse discovery (2026-07-09 — interview with Kyle)

13. **Reuse is discovered via an intentional catalog, never by snooping repos.**
    - *Shipped* code discovers itself: the registry + an auto-generated package index
      (`PACKAGES.md` from `packages/*` + specimens; a docs site later).
    - *Incubating* app-internal code is tracked as **`graduation-candidate` issues**
      in this repo. The candidate issue *becomes* the graduation task when a second
      consumer appears.
    - **Required pre-build gate** (encoded in `AGENTS.md`): (1) check the catalog →
      consume; (2) check candidate issues → if an app-internal version exists you are
      the second consumer, graduate it; (3) else build app-internal and register a
      candidate issue. Bias toward over-registering.

## Topology refinements (2026-07-08 — interview with Kyle)

8. **Package scope = `@fairground-co/*`.** GitHub Packages forces the npm scope to
   equal the org name.
9. **`design-system` is public and holds generic shared IP only, named functionally.**
   Anchor package `@fairground-co/core` (token contract + base primitives + neutral
   reference theme); larger composed widgets are separate packages named by
   **function, not by app/org** (`@fairground-co/mapview`, `@fairground-co/listview`,
   …), each depending on `core`. No client-owned material and no app-named packages.
   - **Incubate app-specific widgets inside the app.** Theme repos stay values-only.
     A widget shared by multiple apps of one org but not yet generic goes in a lazy
     `<org>-ui` repo — still not the theme repo.
   - **Graduation:** move into design-system under a functional name (app identity
     stripped); ownership transfers to core. App-internal incubation makes
     graduation a single move-and-reimport PR — nothing published to alias. If a
     package must be superseded: one-time hard cutover, **never a permanent alias**.
10. **Themes live OUTSIDE the monorepo — one public repo per org, org-prefixed**
    (pkgs `@fairground-co/<org>-theme`). Each holds all that org's palettes/variants.
    A new/independent app can install `core` and theme it with no write access to
    the monorepo.
11. **Licensed brand assets → separate PRIVATE per-org repos** (pkgs
    `@fairground-co/<org>-brand-assets`). Split from themes to hold the invariant
    *theme repo = always safe to publish; brand-assets repo = always
    license-restricted.* Theme ships `@font-face` by family name + tokens;
    brand-assets ships the font files + their `@font-face src` + logos. Apps install
    both. Public repos and public history never carry licensed files. (Licenses
    confirmed to permit self-hosting + private registry storage.)
12. **Repo/app naming: owner-prefixed, flagships bare.** Flagship apps are
    unprefixed; all other repos carry their owner prefix. Themes and app repos are
    **public**; brand-assets repos are **private**.

## Carried over from the planning session (2026-07-08)

1. **Layered design system.** Shared `core` (generic primitives + token contract +
   neutral reference theme) → theme-agnostic shared widgets → **theme** packages
   (brand token values only) → applications. Consistency comes from the shared
   **token contract**, not shared components.
2. **Ownership model.** fairGround owns the code/components; clients own only brand
   identity (colors/logo/fonts), isolated in the theme layer. No client brand assets
   or licensed fonts in shared packages.
3. **Monorepo for the design system; separate repos per app** consuming **versioned
   published packages** (GitHub Packages + changesets).
4. **Graduation rule:** promote a widget to core only on the *second consumer*,
   after de-branding + token-only + docs + specimen.
5. **Theming = token values only**, in a cascade: core reference ← brand base theme
   ← app/tenant runtime override. Shared packages stay brand-neutral; per-tenant
   runtime overrides supported (CSS vars on a scope).
6. **Multi-agent ops:** separate locals coordinated via Git; GitHub Issues/Projects
   as the task-ownership substrate; protected `main`; agent-prefixed branches;
   `AGENTS.md` canonical with tool-native pointers.
7. **First consumer stack:** React + Vite static SPA + TypeScript; consumes the DS
   as pinned packages; recolors via a token-override theme; Tailwind NOT added to
   the DS.

## Open (resolve before building)

- **The full semantic token contract** (the last big one). Seeds already decided:
  #20–21 elevation/selection/drift roles, density axis, mono role, `--dataviz-*`
  namespace (see `docs/adoption-plan.md`).
- Phase 1 partition-import of the seed system (`nwa-equality-design-system`) into
  this repo's packages (classify → core / theme / private brand-assets / app;
  licensed files never touch public history).
