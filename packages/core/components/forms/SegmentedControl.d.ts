import * as React from 'react';

export interface SegmentOption {
  value: string;
  label?: string;
  /** Emoji / glyph shown instead of (or before) the label. */
  icon?: React.ReactNode;
  /** Tooltip — REQUIRED for icon-only segments. */
  title?: string;
}

/**
 * The system's primary selector — list filters (tabs) and escalating scales (enclosed).
 */
export interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange?: (value: string) => void;
  /** "enclosed" = bordered pill group; "tabs" = flush filter buttons. @default "enclosed" */
  variant?: 'enclosed' | 'tabs';
  /** Accent edge position for the tabs variant. @default "bottom" */
  edge?: 'top' | 'bottom';
  /** Escalating cumulative scale — keeps earlier options lit. @default false */
  progressive?: boolean;
  style?: React.CSSProperties;
}

/** The system's primary selector — list filters (tabs) and escalating scales (enclosed). */
export function SegmentedControl(props: SegmentedControlProps): JSX.Element;
