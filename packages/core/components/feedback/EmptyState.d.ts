import * as React from 'react';

export interface EmptyStateProps {
  /** Icon glyph name from the Icon registry. @default "info" */
  icon?: string;
  title?: string;
  message?: string;
  /** Button label for the optional action. */
  action?: string;
  onAction?: () => void;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

/** Centered message for empty lists, panels, or views — icon + title + optional action. */
export function EmptyState(props: EmptyStateProps): JSX.Element;
