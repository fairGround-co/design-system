import * as React from 'react';

export interface ToastProps {
  /** Semantic tone — maps to the status tokens (info / success / warning / danger). @default "info" */
  tone?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message?: string;
  /** Optional inline action (e.g. "Undo", "Retry"). */
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  style?: React.CSSProperties;
}

/**
 * Transient notification pill — full tone-colored border, semantic icon, optional action.
 */
export function Toast(props: ToastProps): JSX.Element;
