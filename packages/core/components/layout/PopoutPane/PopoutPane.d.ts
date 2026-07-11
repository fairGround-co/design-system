import * as React from 'react';

export interface PopoutPaneProps {
  title?: React.ReactNode;
  /** Controlled visibility — renders nothing when false. @default true */
  open?: boolean;
  onClose?: () => void;
  /** Extended (covers the middle pane) state. Controlled if provided. */
  expanded?: boolean;
  defaultExpanded?: boolean;
  onToggleExpand?: (next: boolean) => void;
  /** Allow collapsing to a thin labelled strip. @default true */
  collapsible?: boolean;
  /** Collapsed state. Controlled if provided. */
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onToggleCollapse?: (next: boolean) => void;
  /** Docked width in px (when not expanded) — the initial drag-resize width. @default 440 */
  dockedWidth?: number;
  minWidth?: number;
  /** Max drag-resize width in px. @default 760 */
  maxWidth?: number;
  /** Allow drag-resizing the docked width via the trailing edge handle. @default true */
  resizable?: boolean;
  /** Optional pinned footer content. */
  footer?: React.ReactNode;
  /** Show the ‹/› edge pill handle. @default true */
  handle?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Generic pop-out container pane: opens beside the primary list (never replacing it), holds any `children`, drag-resizable at its trailing edge, and can EXTEND to cover the middle pane or COLLAPSE to a strip via a ‹/› edge pill — without hiding the main list. Header carries title + expand/restore + close. Mount in your flex row; wrap e.g. a data table or inspector. */
export function PopoutPane(props: PopoutPaneProps): JSX.Element;
