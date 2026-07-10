/* ═══════════════════════════════════════════════════════════════════════
   Token contract — runtime manifest.
   The names below mirror tokens/contract.css exactly. Tooling (theme
   validation, tenant-override plumbing, specimen pages) reads these lists
   so the contract has one source of truth per layer: CSS for values,
   this module for names.
   ═══════════════════════════════════════════════════════════════════════ */

/** Contract semver: adding a token = minor; changing meaning/renaming = major. */
export const CONTRACT_VERSION = '0.1.0';

const range = (n, make) => Array.from({ length: n }, (_, i) => make(i + 1));

export const CAT_SLOTS = 12;

export const SURFACE_TOKENS = [
  '--bg', '--surface', '--surface-2', '--surface-3',
  '--text', '--text-muted', '--text-faint',
  '--border', '--border-strong', '--overlay', '--scrim',
];

export const ACTION_TOKENS = ['--accent', '--accent-2', '--on-accent', '--match', '--commit'];

export const STATUS_ROLES = ['success', 'warning', 'caution', 'danger', 'info'];
export const STATUS_TOKENS = STATUS_ROLES.flatMap((role) => [
  `--status-${role}`, `--status-${role}-soft`, `--status-${role}-deep`,
  `--status-${role}-bright`, `--status-${role}-ink`,
]);

export const SCOPE_ROLES = ['view', 'guest', 'edit'];
export const SCOPE_TOKENS = SCOPE_ROLES.flatMap((role) => [
  `--scope-${role}`, `--scope-${role}-soft`, `--scope-${role}-deep`,
]);

export const CAT_TOKENS = range(CAT_SLOTS, (i) => `--cat-${i}`).concat(
  range(CAT_SLOTS, (i) => `--cat-${i}-soft`),
  range(CAT_SLOTS, (i) => `--cat-${i}-deep`),
  range(CAT_SLOTS, (i) => `--cat-${i}-bright`),
);

export const SELECTION_TOKENS = [
  '--select-accent', '--select-bg', '--ring-select', '--ring-match', '--ring-commit',
];

export const ELEVATION_TOKENS = [
  '--border-w-hair', '--border-w-std', '--border-w-accent',
  '--shadow-card', '--shadow-pop', '--shadow-header',
];

export const TYPE_TOKENS = [
  '--font-ui', '--font-display', '--font-editorial', '--font-mono',
  '--fs-2xs', '--fs-xs', '--fs-sm', '--fs-base', '--fs-md', '--fs-lg',
  '--fs-xl', '--fs-2xl', '--fs-3xl', '--fs-4xl', '--fs-5xl',
  '--fw-book', '--fw-medium', '--fw-semibold', '--fw-bold', '--fw-extrabold', '--fw-black',
  '--lh-tight', '--lh-snug', '--lh-normal', '--lh-relaxed',
  '--ls-tight', '--ls-normal', '--ls-label', '--ls-eyebrow',
];

export const SPACE_TOKENS = [
  '--space-0', '--space-1', '--space-2', '--space-3', '--space-4', '--space-5',
  '--space-6', '--space-7', '--space-8', '--space-8-5', '--space-9', '--space-10',
];

export const RADIUS_TOKENS = ['--r-sm', '--r-md', '--r-lg', '--r-pill'];

export const MOTION_TOKENS = ['--ease-ui', '--dur-instant', '--dur-fast', '--dur-base', '--dur-pan'];

export const LAYOUT_TOKENS = [
  '--touch-min', '--mobile-bp', '--pane-list-w', '--pane-min-w', '--handle-w',
  '--collapse-strip', '--sheet-radius', '--safe-area-bottom', '--opacity-disabled',
];

export const DENSITY_TOKENS = ['--row-h', '--control-h', '--cell-pad-y', '--cell-pad-x', '--font-size-data'];

export const VIZ_TOKENS = range(CAT_SLOTS, (i) => `--viz-series-${i}`).concat(
  ['--viz-grid', '--viz-axis-ink', '--viz-tooltip-bg', '--viz-tooltip-ink'],
  range(7, (i) => `--viz-seq-${i}`),
  ['--viz-div-neg', '--viz-div-mid', '--viz-div-pos'],
  ['--path-planned', '--path-actual', '--path-drift-behind', '--path-drift-ahead'],
);

/** Every token name in the contract, in contract.css order. */
export const ALL_TOKENS = [
  ...SURFACE_TOKENS, ...ACTION_TOKENS, ...STATUS_TOKENS, ...SCOPE_TOKENS,
  ...CAT_TOKENS, ...SELECTION_TOKENS, ...ELEVATION_TOKENS, ...TYPE_TOKENS,
  ...SPACE_TOKENS, ...RADIUS_TOKENS, ...MOTION_TOKENS, ...LAYOUT_TOKENS,
  ...DENSITY_TOKENS, ...VIZ_TOKENS,
];

/** §9 — the ONLY tokens a multi-tenant app may override at runtime on a
    [data-tenant] scope. Surfaces, ink, status, spacing, type, and motion
    are not tenant-overridable — this keeps accessibility and layout
    invariants intact. */
export const TENANT_OVERRIDE_WHITELIST = [
  '--accent', '--accent-2', '--on-accent',
  ...range(CAT_SLOTS, (i) => `--cat-${i}`),
  ...range(CAT_SLOTS, (i) => `--viz-series-${i}`),
];

/** Apply a validated tenant override map as CSS vars on a scope element.
    Silently ignores tokens outside the whitelist (returns the list of
    rejected names so callers can log them). */
export function applyTenantOverrides(el, overrides) {
  const rejected = [];
  for (const [token, value] of Object.entries(overrides || {})) {
    if (TENANT_OVERRIDE_WHITELIST.includes(token)) el.style.setProperty(token, value);
    else rejected.push(token);
  }
  return rejected;
}
