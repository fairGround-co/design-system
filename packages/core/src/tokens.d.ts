/* Token contract — type surface. A theme or app referencing a token that
   does not exist in the contract fails to compile against these types. */

export const CONTRACT_VERSION: string;
export const CAT_SLOTS: 12;

type CatSlot = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type SeqStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type StatusRole = 'success' | 'warning' | 'caution' | 'danger' | 'info';
type ScopeRole = 'view' | 'guest' | 'edit';
type Variant = 'soft' | 'deep' | 'bright';

export type SurfaceToken =
  | '--bg' | '--surface' | '--surface-2' | '--surface-3'
  | '--text' | '--text-muted' | '--text-faint'
  | '--border' | '--border-strong' | '--overlay' | '--scrim';

export type ActionToken = '--accent' | '--accent-2' | '--on-accent' | '--match' | '--commit';

export type StatusToken = `--status-${StatusRole}` | `--status-${StatusRole}-${Variant | 'ink'}`;

export type ScopeToken = `--scope-${ScopeRole}` | `--scope-${ScopeRole}-${'soft' | 'deep'}`;

export type CatToken = `--cat-${CatSlot}` | `--cat-${CatSlot}-${Variant}`;

export type SelectionToken =
  | '--select-accent' | '--select-bg' | '--ring-select' | '--ring-match' | '--ring-commit';

export type ElevationToken =
  | '--border-w-hair' | '--border-w-std' | '--border-w-accent'
  | '--shadow-card' | '--shadow-pop' | '--shadow-header';

export type TypeToken =
  | '--font-ui' | '--font-display' | '--font-editorial' | '--font-mono'
  | `--fs-${'2xs' | 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'}`
  | `--fw-${'book' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'}`
  | `--lh-${'tight' | 'snug' | 'normal' | 'relaxed'}`
  | `--ls-${'tight' | 'normal' | 'label' | 'eyebrow'}`;

export type SpaceToken =
  | `--space-${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}` | '--space-8-5';

export type RadiusToken = `--r-${'sm' | 'md' | 'lg' | 'pill'}`;

export type MotionToken = '--ease-ui' | `--dur-${'instant' | 'fast' | 'base' | 'pan'}`;

export type LayoutToken =
  | '--touch-min' | '--mobile-bp' | '--pane-list-w' | '--pane-min-w' | '--handle-w'
  | '--collapse-strip' | '--sheet-radius' | '--safe-area-bottom' | '--opacity-disabled';

export type DensityToken =
  | '--row-h' | '--control-h' | '--cell-pad-y' | '--cell-pad-x' | '--font-size-data';

export type VizToken =
  | `--viz-series-${CatSlot}`
  | '--viz-grid' | '--viz-axis-ink' | '--viz-tooltip-bg' | '--viz-tooltip-ink'
  | `--viz-seq-${SeqStep}`
  | `--viz-div-${'neg' | 'mid' | 'pos'}`
  | `--path-${'planned' | 'actual' | 'drift-behind' | 'drift-ahead'}`;

/** Every token name in the contract. */
export type TokenName =
  | SurfaceToken | ActionToken | StatusToken | ScopeToken | CatToken
  | SelectionToken | ElevationToken | TypeToken | SpaceToken | RadiusToken
  | MotionToken | LayoutToken | DensityToken | VizToken;

/** A theme supplies VALUES for contract names — never new names. */
export type ThemeValues = Partial<Record<TokenName, string>>;

/** §9 — the only tokens a multi-tenant app may override at runtime. */
export type TenantOverridableToken =
  | '--accent' | '--accent-2' | '--on-accent'
  | `--cat-${CatSlot}` | `--viz-series-${CatSlot}`;
export type TenantOverrides = Partial<Record<TenantOverridableToken, string>>;

export const SURFACE_TOKENS: readonly SurfaceToken[];
export const ACTION_TOKENS: readonly ActionToken[];
export const STATUS_ROLES: readonly StatusRole[];
export const STATUS_TOKENS: readonly StatusToken[];
export const SCOPE_ROLES: readonly ScopeRole[];
export const SCOPE_TOKENS: readonly ScopeToken[];
export const CAT_TOKENS: readonly CatToken[];
export const SELECTION_TOKENS: readonly SelectionToken[];
export const ELEVATION_TOKENS: readonly ElevationToken[];
export const TYPE_TOKENS: readonly TypeToken[];
export const SPACE_TOKENS: readonly SpaceToken[];
export const RADIUS_TOKENS: readonly RadiusToken[];
export const MOTION_TOKENS: readonly MotionToken[];
export const LAYOUT_TOKENS: readonly LayoutToken[];
export const DENSITY_TOKENS: readonly DensityToken[];
export const VIZ_TOKENS: readonly VizToken[];
export const ALL_TOKENS: readonly TokenName[];
export const TENANT_OVERRIDE_WHITELIST: readonly TenantOverridableToken[];

/** Apply a tenant override map as CSS vars on a scope element; returns the
    names rejected by the whitelist. */
export function applyTenantOverrides(
  el: { style: { setProperty(name: string, value: string): void } },
  overrides: TenantOverrides | Record<string, string>,
): string[];
