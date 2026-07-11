# Component adoption plan — seeds for core

*Distilled 2026-07-09 from a full side-by-side evaluation of the two source systems:
the NWA Pride design system (token-driven event/field-ops kit) and LotPlanner's UI
layer (dense analytical/productivity kit). The full evaluation lives in the private
ops repo; this file is the actionable plan. Pipeline per DECISIONS #18: adapt →
genericize → re-import.*

## Verdict

The systems are complementary, not competing. They overlap on ~8 basic controls —
every collision reconciles into one core component (NWA structure + the other
system's capabilities as props). Everywhere else, each fills the other's gaps.

## Collisions → one core component each

| Control | Resolution |
|---|---|
| Button | NWA token discipline + `loading`, icon slots, danger variant; keep `confirm` prop |
| Inputs (text/select/area/field) | merge; adopt `mono` numeric affordance + auto-select-on-focus |
| Badge | one family: status (dot), count (pill), categorical (zone/type) |
| Modal/Dialog | NWA Dialog wins (focus trap, bottom-sheet ≤760px); doctrine: modals never for routine editing |
| SegmentedControl | one control; view-ops stay visually distinct from data-ops |
| Tooltip | merge; adopt global tooltip mode (all/hover/none) |
| Toast/Spinner | merge; UndoToast (countdown undo) is the differentiator |
| Table | density-aware Table primitives are the core seed (compact 32 / comfortable 40) |

## Adopt into core (from the analytical kit)

- **Edit-in-place framework** — the big prize: `EditableInput` (commit on
  blur/Enter/Tab, Escape cancels, Enter = same field next row, Tab = next field),
  paired-value editor, auto-edit-on-create, inline delete-confirm row, "＋ New X"
  footer row, editable-cell wiring, KPI-number edit-in-place.
- `PortalSelect` (overflow-safe dropdown) · search-morphing table header ·
  KPI/stat bar · ~~sticky section header~~ **→ shipped as `StickySectionHeader`
  (DECISIONS #30-adjacent; graduated 2026-07-11, first consumer = the lookbook)** ·
  snap-stop slider (semantic stops, keyboard,
  persisted state — absorbs both systems' sliders per DECISIONS #19).
- Guided-tour system (step cards, chaining, never-show-again).
- Color utilities: dominant-color extraction, force-directed color repulsion
  (multi-series legibility), YIQ auto-contrast.
- One unified drag-to-reorder primitive.
- Charts/gantt layers graduate later — they need a token-migration pass first.

## Adopt into core (from the event/field kit)

- HeaderSelect (selector-as-header nav) — one of two nav options (DECISIONS #19).
- Strict selection hierarchy (Selected > Match > Hover, non-colliding cues) + the
  `rail`/`ring` selection variants (DECISIONS #21).
- Auth-scoped progressive disclosure (capability-by-color popup tiers).
- UndoToast; typed-confirmation gate for destructive actions.
- Mobile layer: bottom-sheet dialogs, bottom tab bar, swipe actions, pull-to-refresh.
- Outdoor/field dark mode with theme-flipped accent discipline.

## Interaction doctrine (both systems already agree)

Editing happens in place; modals are reserved for destructive/committing acts.
Edit-in-place, selector-as-header, and tap-or-swipe status serve different moments
and compose in one core — no parallel component sets.

## Token-contract requirements this plan creates

1. **Density axis** (compact/comfortable) as a contract dimension.
2. **`--font-mono` role** is load-bearing (numbers/dates/IDs, tabular numerals).
3. **`--dataviz-*` namespace**: series scales + the Planned-vs-Actual roles
   `--path-planned` / `--path-actual` / `--path-drift-behind` / `--path-drift-ahead`
   (DECISIONS #21: gap-fill + caliper styles, composable).
4. **Elevation tokens**: committed 1px border + optional shadow parameter
   (DECISIONS #20–21).
5. Brand divergence (typefaces, palettes) stays entirely in theme values — validated
   against both source systems.
