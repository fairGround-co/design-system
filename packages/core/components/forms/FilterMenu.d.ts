import * as React from 'react';

export interface FilterMenuOption {
  /** Value toggled into/out of the selected array. */
  value: string;
  label: string;
  /** Optional semantic color for the row marker (and the icon's tint). */
  color?: string;
  /** Optional glyph name (from the Icon set). When set, the icon — tinted with
   *  `color` — replaces the plain color dot. */
  icon?: string;
}

/**
 * Multi-select status filter as a dropdown checkbox list — the "many statuses"
 * sibling to FilterChips (use this past ~4 facets). The value is the EXPLICIT
 * set of shown statuses (all checked = everything, none = nothing) — NOT the
 * "empty = all" rule FilterChips uses. Button summarizes the count; panel has
 * All / None actions and closes on outside click.
 */
export interface FilterMenuProps {
  options: FilterMenuOption[];
  /** Explicit set of selected (shown) values. */
  value: string[];
  onChange?: (next: string[]) => void;
  /** Singular noun for the summary. @default "status" */
  noun?: string;
  /** Plural noun. @default noun + "es" */
  nounPlural?: string;
  /** Text shown when nothing is checked (you're hiding all data). Context-set;
   *  blank by default — the amber funnel + warning glyph still flag the state. */
  emptyLabel?: string | null;
  style?: React.CSSProperties;
}

export function FilterMenu(props: FilterMenuProps): JSX.Element;
