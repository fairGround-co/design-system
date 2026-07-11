# Migration plan — brand-facet model, theme icons, modular two-render lookbook

*Ratified in DECISIONS #29–31 (2026-07-11, with Kyle). This restructures the
theme/brand relationship established in Phase 1. Contract-tier — Kyle reviews
from the brand repo's complete lookbook before each merge. Tracking issue:
design-system#6, with per-repo sub-issues worked by agents that hold each
app's context.*

## What changes, in one paragraph

Strategic guidance (voice, philosophy, writing samples, policy) moves from the
public theme repos into the private brand-assets repos; token-explanatory
annotation stays public with the theme. Themes gain an icon-glyph library
(NWA's app-side registry graduates into nwae-theme). The lookbook becomes
modular with per-section provenance labels and builds in two flavors: a public
stub (theme → Pages) and a complete render (brand-assets, private) that is the
canonical review surface. Apps still consume core + theme + brand-assets as
three direct dependencies.

## Phase A — core (the generator) · contract-tier

1. Refactor `lookbook/lookbook.jsx` into per-section modules composed into one
   overview; add a provenance subheader per section (header + dimmed, smaller,
   hyperlinked source path/URL).
2. Tag each module `public` | `private`; `build-lookbook.mjs` gains a
   `--complete` mode that includes private modules and inlines brand-assets
   fonts/logos (as data URIs); default mode emits the public stub.
3. Add section modules: visual-foundations (public annotation vs private
   philosophy split), voice + writing samples (private), theme icon gallery
   (public), app-launcher marks + logos (private).
4. Icon model: confirm `Icon` merges `theme glyphs → app glyphs` over
   `CORE_ICON_GLYPHS`; support token-referencing fills + perma-color.
5. Amend `DECISIONS #10` reference in docs; core minor release.

## Phase B — each theme repo (×3: nwae, lp, fairground) · brand-review tier

1. **Move strategic guidance OUT** to brand-assets (Phase C). Keep/author
   token-explanatory annotation (contrast rules, token semantics) in the theme.
2. **Add the icon library** (`icons.js` data export). For nwae: graduate the
   registry from `nwa-pride` (drop logo-bearing marks). lp/fairground: seed
   later or empty for now.
3. Regenerate the **public stub** `docs/lookbook.html`; keep Pages.
4. Theme minor release (icons added). Note DECISIONS #10 amendment in README.

## Phase C — each brand-assets repo (×3, PRIVATE) · brand-review tier

1. Add strategic guidance docs (`voice.md`, `visual-foundations.md`, writing
   samples, policy) — the ones moved out of the theme.
2. Build + commit the **complete** `docs/lookbook.html` (build-consumes
   theme+core, inlines fonts/logos/guidance). This is Kyle's review surface.
3. Wire the build-time dep on theme+core (devDeps); the shipped package stays
   a dependency-free leaf. Add a short "deploying the assets" note.
4. brand-assets minor release.

## Phase D — consumers & docs

1. `docs/consuming.md`: update the routing table (guidance split; icons→theme;
   two lookbooks + which to review; strategic guidance is private).
2. `nwa-pride`: PR to drop the local icon registry and consume it from
   nwae-theme; update its AGENTS.md (icon registry moved).
3. Propagate the DECISIONS #29–31 summary to the theme/brand-assets repos'
   docs; refresh SESSION_HANDOFF here.

## Sequencing & risk

- Order: A (core) → B+C per org (theme before its brand-assets, since brand
  build-consumes theme) → D. nwae first (fully populated), then lp/fairground.
- Versioning: core minor; each theme minor; each brand-assets minor; nwa-pride
  a coordinated change (its own icon imports repoint to the theme package).
- Already-public voice.md (nwae) stays in git history — benign; not worth a
  rewrite. It simply stops being the live location.
- No app runtime breakage: the app dependency set (core+theme+brand-assets) is
  unchanged; only nwa-pride's internal icon-import path moves.

## Open sub-decisions (resolve during execution, not blocking)

- App-launcher marks: per-asset — logo-bearing → brand-assets; original
  geometry → theme (icon library) or brand-assets by trademark judgment.
- lp/fairground icon libraries: seed now from their apps, or leave empty until
  a second consumer appears (reuse-discovery gate).
