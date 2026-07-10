import * as React from 'react';

export interface ProgressBarProps {
  /** Progress value 0–1 (clamped). Ignored when indeterminate. */
  value?: number;
  /** Sliding gradient animation instead of a determinate fill. @default false */
  indeterminate?: boolean;
  /** Track height: sm=4px, md=8px, lg=12px. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Fill color (used when `colors` is not given). @default "var(--accent)" */
  color?: string;
  /** Multi-color gradient fill — evenly-spaced stops through these colors.
   *  Brand preset gradients live app-side and are passed here. */
  colors?: string[];
  /** Accessible label. @default "Progress" */
  label?: string;
  /** Show percentage number to the right of the bar. @default false */
  showPercent?: boolean;
  /** Indeterminate animation speed in seconds. @default 1.4 */
  speed?: number;
  /** Indeterminate gradient band width as a fraction 0–1. @default 0.35 */
  gradientWidth?: number;
  style?: React.CSSProperties;
}

/** Determinate + indeterminate progress bar — solid or multi-color gradient fill, pill-radius ends, optional percentage readout. */
export function ProgressBar(props: ProgressBarProps): JSX.Element;
