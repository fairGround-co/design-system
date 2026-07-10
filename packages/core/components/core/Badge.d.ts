import * as React from 'react';

export interface BadgeProps {
  /** Semantic status tone (ignored when `cat` is set). @default "neutral" */
  tone?: 'success' | 'warning' | 'caution' | 'danger' | 'info' | 'commit' | 'neutral';
  /**
   * Categorical identity chip: a --cat-N slot number (1–12) or any CSS color
   * string pass-through. Overrides `tone` when present.
   */
  cat?: number | string | null;
  /** Filled instead of tinted (status only). @default false */
  solid?: boolean;
  /** Icon name from the Icon set (e.g. 'check', 'cancel', 'pending'). Renders inline before children. */
  icon?: string | null;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Rounded status / category pill — record state, RSVP, or a solid categorical chip.
 */
export function Badge(props: BadgeProps): JSX.Element;
