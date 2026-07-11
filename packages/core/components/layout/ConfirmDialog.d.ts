import * as React from 'react';

export interface ConfirmDialogProps {
  /** @default false */
  open?: boolean;
  /** Dialog title. @default "Confirm" */
  title?: string;
  /** Body text explaining what will happen. */
  message?: React.ReactNode;
  /** @default "Confirm" */
  confirmLabel?: string;
  /** @default "Cancel" */
  cancelLabel?: string;
  /** Color / icon treatment. @default "danger" */
  variant?: 'danger' | 'warning' | 'commit';
  /** When set, the user must type this exact string to enable the confirm button. */
  requireTyped?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  style?: React.CSSProperties;
}

/** Specialized Dialog for destructive/irreversible actions — warning icon, message, typed-confirmation gate. */
export function ConfirmDialog(props: ConfirmDialogProps): JSX.Element;
