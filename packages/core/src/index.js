/* ═══════════════════════════════════════════════════════════════════════
   @fairground-co/core — public barrel entry
   Re-exports the token contract manifest and every generic primitive.
   Grouped to match the component tree. Relative specifiers keep the
   codebase's explicit .jsx / .js extensions.
   ═══════════════════════════════════════════════════════════════════════ */

/* ── token contract ───────────────────────────────────────────────────── */
export {
  CONTRACT_VERSION,
  CAT_SLOTS,
  SURFACE_TOKENS,
  ACTION_TOKENS,
  STATUS_ROLES,
  STATUS_TOKENS,
  SCOPE_ROLES,
  SCOPE_TOKENS,
  CAT_TOKENS,
  SELECTION_TOKENS,
  ELEVATION_TOKENS,
  TYPE_TOKENS,
  SPACE_TOKENS,
  RADIUS_TOKENS,
  MOTION_TOKENS,
  LAYOUT_TOKENS,
  DENSITY_TOKENS,
  VIZ_TOKENS,
  ALL_TOKENS,
  TENANT_OVERRIDE_WHITELIST,
  applyTenantOverrides,
} from './tokens.js';

/* ── core ─────────────────────────────────────────────────────────────── */
export { Button } from '../components/core/Button.jsx';
export { Badge } from '../components/core/Badge.jsx';
export { MenuButton } from '../components/core/MenuButton.jsx';

/* ── feedback ─────────────────────────────────────────────────────────── */
export { EmptyState } from '../components/feedback/EmptyState.jsx';
export { InlineHelp } from '../components/feedback/InlineHelp.jsx';
export { LiveRegion } from '../components/feedback/LiveRegion.jsx';
export { Notice } from '../components/feedback/Notice.jsx';
export { ProgressBar } from '../components/feedback/ProgressBar.jsx';
export { QRShare } from '../components/feedback/QRShare.jsx';
export { Skeleton, SkeletonCard } from '../components/feedback/Skeleton.jsx';
export { Spinner } from '../components/feedback/Spinner.jsx';
export { Toast } from '../components/feedback/Toast.jsx';
export { Tooltip } from '../components/feedback/Tooltip.jsx';
export { UndoToast } from '../components/feedback/UndoToast.jsx';

/* ── forms ────────────────────────────────────────────────────────────── */
export { Checkbox } from '../components/forms/Checkbox.jsx';
export { ColorPicker } from '../components/forms/ColorPicker.jsx';
export { FilterChips } from '../components/forms/FilterChips.jsx';
export { FilterMenu } from '../components/forms/FilterMenu.jsx';
export { FormField } from '../components/forms/FormField.jsx';
export { HeaderSelect } from '../components/forms/HeaderSelect.jsx';
export { NumberSpinner } from '../components/forms/NumberSpinner.jsx';
export { SearchInput } from '../components/forms/SearchInput.jsx';
export { SegmentedControl } from '../components/forms/SegmentedControl.jsx';
export { Select } from '../components/forms/Select.jsx';
export { StatusSelector } from '../components/forms/StatusSelector.jsx';
export { SwipeAction } from '../components/forms/SwipeAction.jsx';
export { TextInput } from '../components/forms/TextInput.jsx';
export { Textarea } from '../components/forms/Textarea.jsx';
export {
  useFormValidation,
  required,
  email,
  minLength,
  maxLength,
  pattern,
  validateValue,
} from '../components/forms/useFormValidation.js';
export { useTrackDrag } from '../components/forms/useTrackDrag.js';

/* ── icons ────────────────────────────────────────────────────────────── */
export { Icon, CORE_ICON_GLYPHS } from '../components/icons/Icon.jsx';

/* ── layout ───────────────────────────────────────────────────────────── */
export { AppHeader } from '../components/layout/AppHeader.jsx';
export { AuthStatus } from '../components/layout/AuthStatus.jsx';
export { BottomTabBar } from '../components/layout/BottomTabBar.jsx';
export { ConfirmDialog } from '../components/layout/ConfirmDialog.jsx';
export { DangerZone } from '../components/layout/DangerZone.jsx';
export { Dialog } from '../components/layout/Dialog.jsx';
export { PopoutPane } from '../components/layout/PopoutPane/PopoutPane.jsx';
export { PullToRefresh } from '../components/layout/PullToRefresh.jsx';
export { ResizeHandle } from '../components/layout/ResizeHandle.jsx';
export { StickySectionHeader } from '../components/layout/StickySectionHeader.jsx';
