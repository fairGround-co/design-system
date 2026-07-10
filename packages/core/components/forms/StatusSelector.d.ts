import * as React from 'react';

export interface StatusOption {
  /** The value this segment sets. May be null (e.g. a "no record yet" state). */
  value: string | null;
  /** Segment text — typically a glyph + word, e.g. "✓ Done". */
  label: string;
  /** Full segment color when selected; a translucent wash of it when not. */
  color: string;
  /** Foreground color of the selected segment. @default "var(--on-accent)" */
  fg?: string;
}

/**
 * Color-coded single-select status control. Set by tapping OR swiping across
 * the track. Distinct from SegmentedControl: per-segment semantic color, a
 * fixed status domain, and pointer-drag selection.
 */
export interface StatusSelectorProps {
  value: string | null;
  onChange?: (value: string | null) => void;
  /** The status set. Defaults to a neutral done / pending / blocked trio in
   *  status tokens; domain sets (e.g. check-in states) live app-side. */
  options?: StatusOption[];
  style?: React.CSSProperties;
}

export function StatusSelector(props: StatusSelectorProps): JSX.Element;
