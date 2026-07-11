import * as React from 'react';

export interface FilterChipOption {
  /** The value toggled into/out of the selected array. */
  value: string;
  label: string;
  /** Optional leading glyph name (from the Icon set). */
  icon?: string;
  /** Badge status tone when active (success / warning / caution / danger / info /
   *  commit / neutral). @default "info" */
  tone?: string;
  /** Tooltip — defaults to label. */
  title?: string;
}

/**
 * Multi-select status filter. NONE selected = no filter = everything shown,
 * so there is no "All" option. The leading funnel doubles as a clear-all
 * action. Reads in the view-scope color throughout — filtering is a view
 * operation.
 */
export interface FilterChipsProps {
  options: FilterChipOption[];
  /** Selected values. Empty array = unfiltered (show all). */
  value: string[];
  onChange?: (next: string[]) => void;
  /** Chips flex to fill the available width (each `flex: 1`, centered). @default false */
  stretch?: boolean;
  /** Icon-only chips (labels hidden) — for narrow containers. @default false */
  compact?: boolean;
  style?: React.CSSProperties;
}

export function FilterChips(props: FilterChipsProps): JSX.Element;
