# @fairground-co/core

The fairGround design system core: **the token contract**, a **neutral
reference theme** (light + dark, every token valued), and the **generic,
brand-neutral React primitives** ported from the seed system in Phase 1.

Consistency across products comes from the contract, not shared components —
every layer codes against the same semantic token names, so any widget renders
coherently under any brand and a theme swap recolors everything.

## Install & use

```js
import '@fairground-co/core/styles.css';         // contract + neutral reference
// optionally, an org theme (values only, AFTER core):
import '@fairground-co/nwae-theme/styles.css';

import { Button, Dialog, TextInput, Icon } from '@fairground-co/core';
```

```html
<html data-theme="light">                  <!-- neutral reference -->
<html data-brand="nwae" data-theme="dark"> <!-- branded, dark/field mode -->
<div data-density="compact">…</div>        <!-- density remap on any scope -->
```

React ≥18 is a peer dependency. A no-bundler IIFE ships at
`@fairground-co/core/global` (`window.FairGroundCore`; load React/ReactDOM
from CDN first).

## The contract, in code

- `tokens/contract.css` — every token name + neutral reference values.
  Derived tokens (`-soft/-deep/-bright`, selection, viz ramps) are declared
  across all cascade scopes so theme overrides recompute them (see the file
  header for why).
- `tokens/dark.css` · `tokens/density.css` · `tokens/utilities.css`.
- `import { ALL_TOKENS, TENANT_OVERRIDE_WHITELIST, applyTenantOverrides,
  CONTRACT_VERSION } from '@fairground-co/core'` — the name manifest and the
  runtime tenant-override helper (whitelist enforced). `TokenName` /
  `ThemeValues` types make an unknown token a compile-time error.

## Conventions the primitives encode

- **Capability scope colors**: view operations (filters, search, segmented
  view selectors) render `--scope-view`; data-changing acts render
  `--commit` / `--scope-edit`; guest/limited states render `--scope-guest`.
  Stable across modes — themes flip `--accent`, not these.
- **Selection hierarchy**: Selected (`--select-accent` + `--select-bg`) >
  Match (`--ring-match`, always the complementary hue) > Hover — cues never
  collide.
- **Elevation**: resting surfaces carry a 1px border; `--shadow-card` is
  additive and may be zeroed by themes.
- **Numbers are mono + tabular** (`--font-mono`, `.fg-tnum`).
- Motion 120–400ms, no bounce, `prefers-reduced-motion` respected.
- Touch targets ≥ `--touch-min` (44px) on coarse pointers, at any density.

Icon ships a small generic glyph set (`CORE_ICON_GLYPHS`); apps inject their
own registries via the `glyphs` prop. Status/domain presets (check-in status
sets, brand palettes, flag spinners) live app-side by design.
