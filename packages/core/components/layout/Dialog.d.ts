import * as React from 'react';

export interface DialogProps {
  /** @default true */
  open?: boolean;
  title?: string;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg' | 'full';
  /** If true, clicking scrim or pressing Escape won't close. @default false */
  persistent?: boolean;
  onClose?: () => void;
  /** Action buttons rendered in the footer bar. */
  footer?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Modal dialog shell — scrim overlay, centered card, title bar, scrollable body, footer slot. */
export function Dialog(props: DialogProps): JSX.Element;
