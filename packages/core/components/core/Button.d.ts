import * as React from 'react';

/**
 * Action semantics for the button.
 */
export interface ButtonProps {
  /**
   * Action semantics — color carries meaning.
   * @default "primary"
   */
  variant?: 'commit' | 'primary' | 'neutral' | 'ghost';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Stretch to fill the container width (used in nav bars). @default false */
  fullWidth?: boolean;
  disabled?: boolean;
  /** Optional leading icon — an emoji string or small SVG node. */
  icon?: React.ReactNode;
  /**
   * When set, intercepts the click and shows a ConfirmDialog before calling onClick.
   * String = message with default title "Are you sure?".
   * Object = full ConfirmDialog props (title, message, confirmLabel, variant, requireTyped).
   */
  confirm?: string | {
    title?: string;
    message: string;
    confirmLabel?: string;
    variant?: 'danger' | 'warning' | 'commit';
    requireTyped?: string;
  };
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** The action button. commit = var(--commit), final/data-changing; primary = var(--accent), intermediate/next. */
export function Button(props: ButtonProps): JSX.Element;
