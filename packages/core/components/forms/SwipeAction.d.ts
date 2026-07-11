import * as React from 'react';

export interface SwipeActionAction {
  label: string;
  icon?: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

export interface SwipeActionProps {
  children: React.ReactNode;
  /** Action buttons revealed on swipe. */
  actions?: SwipeActionAction[];
  /** Swipe direction to reveal actions. @default "right" */
  direction?: 'left' | 'right' | 'both';
  /** Pixels to swipe before snapping to revealed. @default 80 */
  threshold?: number;
  style?: React.CSSProperties;
}

/**
 * Swipe-to-reveal action buttons behind a card or list row.
 * Touch-only — for mobile check-off, edit, delete patterns.
 */
export function SwipeAction(props: SwipeActionProps): JSX.Element;
