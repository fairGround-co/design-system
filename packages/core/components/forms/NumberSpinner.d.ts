import * as React from 'react';

export interface NumberSpinnerProps {
  value?: number;
  onChange?: (next: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** 'inline' = [−] value [+] on one row; 'stacked' = value with a tiny +/− pair stacked to the right (dense table cell). @default "inline" */
  layout?: 'inline' | 'stacked';
  size?: 'sm' | 'md' | 'lg';
  /** Tint the value with the theme accent. @default false */
  accent?: boolean;
  disabled?: boolean;
  /** stacked-only: fade the +/− buttons in only when `hovering` is true (parent-controlled row hover). @default false */
  hideStepsUntilHover?: boolean;
  /** stacked-only: parent-controlled hover flag driving the fade. @default true */
  hovering?: boolean;
  'aria-label'?: string;
  style?: React.CSSProperties;
}

/** Compact numeric stepper. `inline` = [−] value [+]; `stacked` = value + tiny +/− pair (dense per-row count control). Clamps to [min,max]; buttons disable at bounds; tabular numbers. */
export function NumberSpinner(props: NumberSpinnerProps): JSX.Element;
