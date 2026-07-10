import * as React from 'react';

export interface UndoToastProps {
  /** Description of the action that can be undone. */
  message: string;
  /** Label for the undo button. @default "Undo" */
  undoLabel?: string;
  /** Auto-dismiss duration in ms. @default 5000 */
  duration?: number;
  /** Semantic tone (matches Toast). @default "info" */
  tone?: 'info' | 'success' | 'warning' | 'error';
  /** Called when the user clicks Undo (before the toast auto-dismisses). */
  onUndo?: () => void;
  /** Called when the toast auto-dismisses without the user clicking Undo. */
  onExpire?: () => void;
  style?: React.CSSProperties;
}

/**
 * Undo-capable toast — countdown bar + prominent Undo button.
 * For Tier 1 reversible actions. Pauses countdown on hover.
 */
export function UndoToast(props: UndoToastProps): JSX.Element | null;
