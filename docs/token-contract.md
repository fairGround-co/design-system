# The fairGround token contract — v0 draft

*Draft for review (issue #1). The contract is the set of semantic token **names,
roles, and scales** every layer codes against. Themes supply only **values** for
these names. Structural base is the NWA Pride-derived system (DECISIONS #18);
extensions come from `docs/adoption-plan.md` and DECISIONS #19–21.*

**Contract rule of change (semver):** adding a token = minor; changing a meaning or
renaming = major; themes must compile against the contract version they declare
(a theme referencing a token that no longer exists is a compile-time error).

---

## 1. Architecture

### 1.1 Cascade (four layers, last wins)
```
:root                      core neutral reference theme (every token has a value)
  ← [data-brand]           the org theme package (brand values)
  ← [data-theme="dark"]    mode remap (may be brand-tuned)
  ← [data-tenant] scope    runtime overrides (whitelisted tokens only — §9)
```

### 1.2 Modes
Exactly two per brand: **light** and **dark**. Dark doubles as the **outdoor/field
high-contrast mode** (minimal active pixels in sunlight) — there is no third mode.
Themes may flip which hue plays `--accent` between modes (NWA does; see §3.3).

### 1.3 Density
One axis, two stops, remapped via `[data-density="compact"]` on any scope:
| token | comfortable (default) | compact |
|---|---|---|
| `--row-h` | 40px | 32px |
| `--control-h` | 36px | 28px |
| `--cell-pad-y` / `--cell-pad-x` | 8px / 16px | 5px / 12px |
| `--font-size-data` | `--fs-sm` (13) | `--fs-xs` (11) |

Touch floor: interactive targets never shrink below `--touch-min` (44px) on
touch/coarse pointers, regardless of density.

---

## 2. Surfaces & ink

| token | role |
|---|---|
| `--bg` | app background |
| `--surface` | resting card/panel |
| `--surface-2` | nested/inset surface (input fills, hover rows, menus' hover) |
| `--surface-3` | deepest inset (wells, code blocks) |
| `--text` | primary ink |
| `--text-muted` | secondary ink |
| `--text-faint` | tertiary/disabled-adjacent ink |
| `--border` | standard 1px edge |
| `--border-strong` | emphasized edge |
| `--overlay` | hovering layer tint |
| `--scrim` | modal backdrop |

## 3. Action & signal colors

### 3.1 Working pair
| token | role |
|---|---|
| `--accent` | THE action color: primary buttons, active nav, interactive markers |
| `--accent-2` | complementary working color; never competes with `--accent` |
| `--on-accent` | ink on accent fills |
| `--match` | filter/search-hit signal (always the *complement* of selection, so selected ≠ matched) |
| `--commit` | data-changing/commit emphasis (vs blue-ish view operations) |

### 3.2 Status
`--status-success` · `--status-warning` · `--status-caution` · `--status-danger` ·
`--status-info`, each with a contrast-tuned `--status-*-ink` where fills are used.
Status hues are **reserved for state** — never decorative.

### 3.3 Capability scope (auth-signaled UI)
`--scope-view` (read-only/safe) · `--scope-guest` (unauthenticated/limited) ·
`--scope-edit` (writeable/caution). Color signals capability everywhere it matters
(NWA's proven pattern, generalized names).

### 3.4 Categorical
`--cat-1` … `--cat-12` — the discrete identity palette (zones, lot types, series
fallback). Each with derived `--cat-N-soft/-deep/-bright` variants (themes may
compute via `color-mix(in oklab, …)` or hand-tune). Categorical hues are **never**
UI accents. Domain aliases (zone names, lot-type names) live in themes/apps, mapped
onto `--cat-*`.

Slot names + reference values (from the NWA-derived base; reviewed on the samples
page 2026-07-09):
| slot | name | reference | note |
|---|---|---|---|
| 1–8 | red · orange · yellow · green · blue · purple · sky · magenta | `#EA0029` `#FF6B00` `#FFD040` `#01AD4B` `#0055B8` `#862C91` `#00A7E1` `#E50695` | the original spectrum |
| 9 | teal | `#0B8A80` | fills the green↔sky hue gap |
| 10 | brown | `#9C6636` | promoted from the base neutrals (proven in icons) |
| 11 | slate | `#64748B` | use with care: can read as neutral/disabled UI gray |
| 12 | lime | `#9BBB2E` | use last: weak color-blind separation from yellow/green |

Slots 1–8 are the default assignment order; 9–12 extend reach when a domain needs
more identities. No one is obligated to use a slot (per Kyle: lime is borderline —
kept because "no one has to use it").

## 4. Selection

| token | role |
|---|---|
| `--select-accent` | the selection hue (defaults to `--match`'s complement rule) |
| `--select-bg` | selected-surface tint |
| `--ring-select` | focus/selected ring spec (width+color) |

Two committed **component variants** consume these (DECISIONS #21): **`rail`**
(inset edge bar: `inset 3px 0 0 0 var(--select-accent)` + `--select-bg`) and
**`ring`** (outline: `inset 0 0 0 1.5px var(--select-accent)` + `--select-bg`).
Hierarchy discipline: Selected > Match > Hover; cues never collide.

## 5. Elevation (DECISIONS #20–21)

| token | role |
|---|---|
| `--border-w-hair` / `--border-w-std` | 1px / 1.5px edge widths |
| `--shadow-card` | **optional** resting-surface shadow — themes/apps may zero it |
| `--shadow-pop` | floating layers (menus, popovers, toasts) — always on |
| `--shadow-header` | reserved theme-level flourish (accent-tinted header lift) |

Resting surfaces always carry the 1px border; shadow is additive, never a
replacement for edges.

## 6. Typography

**Family roles:** `--font-ui` (all chrome) · `--font-display` (titles, sparingly) ·
`--font-editorial` (long-form) · `--font-mono` (numbers, dates, IDs, axes —
load-bearing; tabular numerals on via `font-variant-numeric`).
Font *families* are theme values; font *files* only ever ship via private
brand-assets packages.

**Size ramp** (`--fs-*`): 2xs 10 · xs 11 · sm 13 · base 15 · md 16 · lg 20 ·
xl 28 · 2xl 36 · 3xl 44 · 4xl 64 · 5xl 96.
**Weights:** book 400 · medium 500 · semibold 600 · bold 700 · extrabold 800 ·
black 900. **Line-heights:** tight 1.15 · snug 1.3 · normal 1.5 · relaxed 1.65.
**Tracking:** tight · normal · label 0.06em · eyebrow 0.12em.

## 7. Space, radius, motion, layout

- **Spacing** (4px base): `--space-0…10` = 0, 2, 4, 6, 8, 12, 16, 24, 32, 40, 48, 64.
- **Radius:** `--r-sm` 6 (inputs/buttons/cards) · `--r-md` 10 (menus/toasts) ·
  `--r-lg` 14 (dialogs/sheets) · `--r-pill` 999.
- **Motion:** `--ease-ui` cubic-bezier(.4,0,.2,1); `--dur-instant` 120 ·
  `--dur-fast` 150 · `--dur-base` 200 · `--dur-pan` 400ms. No bounce/spring easings;
  no looping decorative animation; everything respects `prefers-reduced-motion`.
- **Layout/touch:** `--touch-min` 44px · `--mobile-bp` 760px · pane vars
  (`--pane-list-w`, `--pane-min-w`, `--handle-w`, `--collapse-strip`) ·
  `--sheet-radius` · `--safe-area-bottom` · `--opacity-disabled` 0.4.

## 8. Dataviz namespace (`--viz-*`, `--path-*`)

| token | role |
|---|---|
| `--viz-series-1…12` | chart series colors (default: alias `--cat-*`; themes may re-tune for chart contrast) |
| `--viz-grid` | gridlines (dashed) |
| `--viz-axis-ink` | axis labels (mono, 10px) |
| `--viz-tooltip-bg` / `--viz-tooltip-ink` | data tooltips |
| `--viz-seq-1…7` | sequential ramp (single-hue, light→deep) |
| `--viz-div-neg / -mid / -pos` | diverging ramp anchors |
| `--path-planned` | plan line: dashed, recedes |
| `--path-actual` | actual line: solid, leads |
| `--path-drift-behind` | divergence past tolerance, behind plan (alarm hue) |
| `--path-drift-ahead` | divergence past tolerance, ahead of plan (calm positive) |

Drift renders via two composable styles — gap-fill and caliper (DECISIONS #21).
Series legibility on multi-entity charts is enforced at runtime by the color-
repulsion utility (adoption plan), not by adding hues to the contract.

## 9. Tenant runtime overrides (multi-tenant apps)

Only a **whitelist** may be overridden at runtime on a `[data-tenant]` scope:
`--accent`, `--accent-2`, `--on-accent`, `--cat-1…12`, `--viz-series-1…12`.
Surfaces, ink, status, spacing, type, motion are **not** tenant-overridable —
this keeps accessibility and layout invariants intact. Override values are data
(e.g., from app config), applied as CSS vars on the scope.

## 10. Reserved namespaces (declared now, specified later)

- `--slide-*` — presentation surface (lp-pres-*): fixed-aspect canvas, slide type
  scale, slide-theme concept. Specified with the first lp-pres build.
- `--map-*` — spatial/canvas surfaces beyond `--viz-*` (siteplanner/GIS work).

## 11. Neutral reference theme (core ships this)

Grayscale + one restrained accent so core is usable brand-free and every token is
exercised: `--bg` #f5f6f7 · `--surface` #fff · ink #1c2126 · `--accent` #3b6ea5 ·
`--match` #2a8f8f · categorical = 8 evenly-spaced oklab hues at matched lightness ·
dark mode = true grays (#1a1a1a bg / #111 surface), accent brightened for contrast.
(Exact values land with the `packages/core` implementation; the reference theme is
deliberately boring.)

---

### Review checklist — status (2026-07-09)
1. Role names (terse NWA names; `--auth-*` → `--scope-*`) — **AGREED**.
2. Density: two stops only — **AGREED**.
3. Tenant whitelist (accent + categorical + series) — **AGREED**.
4. Categorical palette — **AGREED (2026-07-09, samples round 4)**: all four
   candidates adopted → `--cat-1…12` (teal, brown, slate, lime join the original 8).
   Slate/lime carry usage caveats in §3.4; assignment order defaults to 1–8 first.
5. Reserved namespaces wait for first consumer — **AGREED**.
