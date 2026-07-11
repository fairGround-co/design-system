import * as React from 'react';

export interface SpinnerProps {
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Arc color when `colors` is not given. @default "var(--accent)" */
  color?: string;
  /** Cycle the arc stroke through these colors on an interval.
   *  Brand presets live app-side and are passed here as color arrays. */
  colors?: string[];
  /** Milliseconds between color steps when `colors` is set. @default 400 */
  colorInterval?: number;
  /** Accessible label. @default "Loading…" */
  label?: string;
  style?: React.CSSProperties;
}

/** Loading indicator — rotating arc in a single color or cycling through a `colors` array. */
export function Spinner(props: SpinnerProps): JSX.Element;
