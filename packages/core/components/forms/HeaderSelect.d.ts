import * as React from 'react';

export interface HeaderSelectOption {
  value: string;
  /** Label; a trailing "↗" renders an external-link icon. */
  label: string;
  disabled?: boolean;
}
export interface HeaderSelectGroup {
  /** Group heading — renders as an accent divider. */
  label: string;
  options: HeaderSelectOption[];
}

export interface HeaderSelectProps {
  value: string;
  onChange?: (value: string) => void;
  /** Flat options or grouped ({ label, options }) for accent dividers. */
  options: Array<HeaderSelectOption | HeaderSelectGroup>;
  title?: string;
  /** Selector text color. @default "var(--accent-2)" (the complementary working color). */
  color?: string;
  style?: React.CSSProperties;
}

/**
 * Inline header dropdown that doubles as the active-page label — view-scope underline + chevron.
 */
export function HeaderSelect(props: HeaderSelectProps): JSX.Element;
