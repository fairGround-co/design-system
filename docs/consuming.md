# Consuming the fairGround design system — the guide app repos point at

*Canonical. Every app repo's `AGENTS.md`/`CLAUDE.md` carries the short section
from the end of this file and links here. Written for agents (human or AI)
working in an app that uses the system — including design-focused agents and
skills (Claude Design, impeccable, etc.): the rules below tell you what to
honor and WHERE a revision belongs.*

## The layers, one line each

```
App        your repo      — screens, app-specific widgets, domain aliases
Theme      <org>-theme    — brand token VALUES only (public; never components)
Assets     <org>-brand-assets — licensed fonts/logos (PRIVATE; never public)
Core       design-system  — THE token contract + generic primitives + neutral theme
```

## Using it

```js
import '@fairground-co/core/styles.css';        // contract + neutral reference
import '@fairground-co/<org>-theme/styles.css'; // brand values — AFTER core
import '@fairground-co/<org>-brand-assets/fonts.css'; // if licensed faces apply
import { Button, Dialog, Icon /* … */ } from '@fairground-co/core';
```

```html
<html data-brand="<org>" data-theme="light|dark">
<section data-density="compact">          <!-- density remap, any scope -->
<div data-tenant style="--accent:…">      <!-- runtime overrides, whitelist only -->
```

- **See what you have:** every install ships the visual catalog at
  `node_modules/@fairground-co/core/dist/lookbook.html`; each theme repo
  publishes its branded lookbook via GitHub Pages (link in its README).
- Style app code with **contract tokens only** (`var(--accent)`,
  `var(--space-5)`, `var(--status-danger-ink)`…). The full name set is
  exported: `import { ALL_TOKENS, TokenName } from '@fairground-co/core'`.
- Tenant/runtime recoloring goes through `applyTenantOverrides` (core) — the
  whitelist (accent + categorical + series) is enforced; surfaces, ink,
  status, spacing, type, and motion are deliberately not overridable.

## Where a change belongs — THE ROUTING TABLE

| You want to… | It belongs in | Process |
|---|---|---|
| Style or build something only this app needs | **your app repo** | Use contract tokens; incubate the widget app-side. If it smells reusable, open a `graduation-candidate` issue in design-system (required gate — see its AGENTS.md). |
| Change a brand color / font family / theme value | **`<org>-theme`** | Edit `styles.css` VALUES, regenerate `docs/lookbook.html` (command in its README), changeset (patch/minor), PR. Kyle reviews brand values. |
| Add/replace a licensed font file or logo | **`<org>-brand-assets`** (PRIVATE) | Never in a public repo, ever — not in git history, not in a lookbook, not base64'd into CSS. |
| Add a token NAME, change a token's meaning, change a generic component | **design-system** | Contract tier: adding a name = minor, rename/meaning = major; PR is presented to Kyle in conversation with lookbook evidence before merge. |
| Recolor per tenant/campaign at runtime | **your app's config** | Whitelist via `applyTenantOverrides` — never new CSS files, never new token names. |
| Map domain names (zones, lot types) to colors | **your app repo** | Alias onto `--cat-1…12` slots app-side; never mint new hues. |

## Invariants (violating these is never a fix)

1. **One styling system.** Brand divergence exists solely as theme values; the
   component menu grows by *function*, never by brand.
2. **No brand values in app code.** If you're typing a hex that means "our
   brand," it belongs in the theme repo. If the contract has no token for what
   you need, propose the token — don't hardcode around it.
3. **Themes are values-only.** No components, no widget code, no assets.
4. **Licensed assets never touch public history.** Public lookbooks/themes
   name font families; files ship only via the private assets package.
5. **Status hues are state, categorical hues are identity** — neither is
   decoration; `--accent`/`--commit` carry action semantics.
6. Touch targets ≥ `--touch-min` on coarse pointers at any density; motion
   respects reduced-motion; dark mode is the outdoor/field mode.

## For design agents & skills specifically

When asked to restyle, polish, or redesign UI in a consuming app:
- **Evaluate against the theme's lookbook** (that's the intended rendering);
  the contract + this doc are the design system your guidance must honor.
- Compose with core primitives and contract tokens first; propose contract
  additions rather than inventing parallel styles.
- If the revision is really about brand values (palette, type families), your
  deliverable is a change to `<org>-theme` — ideally reviewed in a live
  lookbook session with Kyle (the lookbook edit-mode tool is planned in
  design-system#5) — not CSS in the app.
- The verification pattern: after changes, open the lookbook (or the app) in
  both modes, both densities, and under `data-brand` off (neutral reference) —
  a correct change survives all of them.

---

## Paste-in section for an app repo's AGENTS.md / CLAUDE.md

> ## Design system
> This app consumes the fairGround design system: `@fairground-co/core`
> (token contract + primitives) + `@fairground-co/<ORG>-theme` (brand values)
> [+ `@fairground-co/<ORG>-brand-assets` (licensed fonts, private)].
> Style with contract tokens only — never hardcode brand values here.
> Where changes belong (app vs theme vs core), the invariants, and guidance
> for design agents: **`fairground-co/design-system` → `docs/consuming.md`.**
> Visual catalog: the theme's lookbook (README link in the theme repo) or
> `node_modules/@fairground-co/core/dist/lookbook.html`.
