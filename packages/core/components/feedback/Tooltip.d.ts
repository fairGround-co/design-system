import * as React from 'react';

export interface TooltipProps {
  /** Tooltip content text. */
  text: string;
  /** The trigger element. */
  children: React.ReactNode;
  /** @default "top" */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay in ms before showing. @default 400 */
  delay?: number;
  /** Custom id for aria-describedby linking. */
  id?: string;
  style?: React.CSSProperties;
}

/**
 * Accessible styled tooltip — shows on hover (desktop) and long-press (mobile).
 * Uses role="tooltip" and aria-describedby.
 */
export function Tooltip(props: TooltipProps): JSX.Element;
