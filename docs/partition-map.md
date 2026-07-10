# Phase 1 partition map — `nwa-equality-design-system` → the layered system

*The classification record for issue #2, plus the genericization rules used for
the port. The full per-file table was posted as a comment on issue #2; this doc
records the rules so future graduations follow the same mapping.*

## Where each element went

| Element class | Destination |
|---|---|
| Token layer (`tokens/*.css`) | **`packages/core`** — reimplemented as the token contract (names + neutral reference values). NWA brand VALUES → `nwae-theme`. |
| Generic primitives (`core/`, `forms/`, `icons/`, `feedback/`, `layout/`) | **`packages/core`**, genericized (rules below) |
| Brand token values (hues, theme surfaces, accent flip, font family names) | **`fairground-co/nwae-theme`** (public, values only) |
| Licensed fonts (`.otf`) + `@font-face src` + logos | **`fairground-co/nwae-brand-assets`** (PRIVATE — never in public history) |
| Parade widgets (`parade/*`), editor (`EmceeScript`, `RichTextEditor` + `inkColors`), NWA icon-glyph registry, app marks, UI kits, `CHECKIN_STATUSES` / `BRAND_PALETTE` / Spinner flag variants, zone aliases | **stay with `nwa-pride`** (listed on issue #2; RichTextEditor is a `graduation-candidate`) |
| Dev artifacts (guidelines specimens, screenshots, task prompts, handoff bundles, dist) | archive only — not ported |

## Genericization rules (the token mapping)

Applied to every ported component. The invariant: core references **contract
tokens only** — no brand hue names, no brand values.

| NWA source | Core contract | Rationale |
|---|---|---|
| `--auth-safe/-guest/-change` | `--scope-view/-guest/-edit` | agreed rename (contract §3.3) |
| `--trans-blue` signaling view/safe/filter/informational | `--scope-view` | NWA's "blue = view operation" rule, generalized: capability/view color is stable across modes (a plain `--accent` would flip with the theme and break the rule) |
| `--trans-pink` signaling commit/change/danger-adjacent | `--commit` (actions) / `--scope-edit` (capability) | stable "data-changing" signal |
| `--red/-orange/-yellow/-green/-blue/-purple` as status | `--status-danger/-warning/-caution/-success/-info` (+`-ink`, `-soft`, `-deep`) | status roles, never raw hues |
| the 8 standard hues as categorical | `--cat-1…8` (order: red, orange, yellow, green, blue, purple, sky, magenta) | contract §3.4 slot order |
| `--yellow-ink` / `--green-ink` | `--status-caution-ink` / `--status-success-ink` | contrast-tuned ink pattern |
| `--ink` | `--text` (or literal where it meant "brand black on fills") | surface-relative ink |
| `--gray-400` etc. | `--text-faint` / `--border-strong` per instance | contract has no raw gray ramp |
| `--white` on accent fills | `--on-accent` | |
| `--radius-sm/-md/-lg/-pill/-full` | `--r-sm/-md/-lg/-pill` | contract names; `-full` folds into `-pill` |
| `--border-hair/-width/-accent` | `--border-w-hair/-std/-accent` | |
| `--shadow-menu` | `--shadow-pop` (dark remaps it) | one floating-shadow role |
| `--text-2xs…5xl`, `--text-body` | `--fs-2xs…5xl`, `--fs-base` | |
| `--zone-*` | app-side aliases onto `--cat-*` | domain names live in apps |
| `.nwa-tnum` | `.fg-tnum` | |
| `--font-brand` | (theme/app concern; UI components use `--font-ui`) | contract families: ui/display/editorial/mono |

Unchanged names (already contract-shaped): `--bg --surface(-2/-3) --text(-muted/-faint)
--border(-strong) --overlay --scrim --accent --accent-2 --on-accent --match --commit
--status-* --select-bg --ring-select/-match/-commit --font-ui/-display/-mono --fw-* --lh-*
--ls-* --space-* --ease-ui --dur-* --touch-min --mobile-bp --pane-* --handle-w
--collapse-strip --sheet-radius --safe-area-bottom --opacity-disabled --shadow-card/-pop/-header`.

### Component-level genericization

- **StatusSelector** — check-in domain default (`CHECKIN_STATUSES`) moved app-side;
  core requires/accepts a generic `statuses` prop with a neutral default set.
- **ColorPicker** — `BRAND_PALETTE` (zone hues) moved app-side; core defaults to the
  `--cat-1…12` palette; any palette injectable via prop.
- **Spinner** — `rainbow`/`pinkblue`/`flag`/`transflag` presets moved app-side; core
  keeps `default` + a `colors` array prop that reproduces them.
- **Icon** — the registry *mechanism* is core (`glyphs` prop merges over a small
  generic base set `CORE_ICON_GLYPHS`); the NWA parade/performance/vehicle registry
  (`NWA_ICON_GLYPHS`) stays app-side and is injected by the app.
- **Button/inputs/dialogs/etc.** — solid ports; only token names change per the table.

## Contract additions made by this implementation (for review)

The port surfaced tokens the NWA system proves necessary but the contract doc
didn't name explicitly — all additive (minor under the contract's semver rule):

1. `--status-*-soft/-deep/-bright` and `--scope-*-soft/-deep` derived families
   (NWA derives these from its hue palette; status/scope needed the same reach —
   e.g. DangerZone's red tint, AuthStatus pill fills).
2. `--border-w-accent` (3px) — the active tab/filter edge weight (NWA
   `--border-accent`), consumed by SegmentedControl and the `rail` variant.
3. `--ring-match` / `--ring-commit` alongside `--ring-select` — the NWA selection
   hierarchy's other two rings (§4 implies them; now they're named).
4. `--space-8-5` (40px) — NWA's half-step; the contract's §7 value list already
   included 40 but only ten slot names.

## `-soft/-deep/-bright` derivation recipes (extracted, exact)

From NWA `tokens/colors.css` — `color-mix(in oklab, hue, white|black N%)`:

| hue family (slot) | soft | deep | bright |
|---|---|---|---|
| red (1) | white 80% | black 18% | white 24% |
| orange (2) | white 80% | black 18% | white 18% |
| yellow (3) | white 76% | black 24% | white 10% |
| green (4) | white 80% | black 18% | white 30% |
| blue (5) | white 82% | black 18% | white 36% |
| purple (6) | white 80% | black 18% | white 32% |
| sky / trans-blue (7) | white 82% | black 16% | white 22% |
| magenta / trans-pink (8) | white 82% | black 16% | white 26% |
| teal (9) *extrapolated* | white 80% | black 18% | white 26% |
| brown (10) *extrapolated* | white 80% | black 18% | white 30% |
| slate (11) *extrapolated* | white 82% | black 18% | white 28% |
| lime (12) *extrapolated* | white 78% | black 22% | white 12% |

Core encodes these per-slot in `packages/core/tokens/contract.css`; because the
mixes reference `var(--cat-N)`, a theme overriding the base slot gets correct
variants for free (and may hand-tune any derived token directly). Status/scope
derivations reuse the recipe of their hue family (danger=red, warning=orange,
caution=yellow, success=green, info/view=sky, edit=magenta).
