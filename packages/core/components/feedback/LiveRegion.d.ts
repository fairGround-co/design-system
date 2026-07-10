import * as React from 'react';

export interface LiveRegionProps {
  /** The text to announce. Screen reader speaks when this changes. */
  message?: string;
  /** Use assertive (interrupts) instead of polite (waits). @default false */
  assertive?: boolean;
  style?: React.CSSProperties;
}

/**
 * Visually hidden aria-live region for announcing dynamic updates to screen readers.
 */
export function LiveRegion(props: LiveRegionProps): JSX.Element;
