import * as React from 'react';

export interface MenuItem {
  label: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  /** Danger-tint the item (destructive option). */
  danger?: boolean;
}

export interface MenuButtonProps {
  children?: React.ReactNode;
  items?: MenuItem[];
  /** Action semantics, same as Button: commit=var(--commit) (Publish), primary=var(--accent) (Download), neutral, ghost. @default "primary" */
  variant?: 'commit' | 'primary' | 'neutral' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Split button: a primary segment (fires `onClick`) + a divided caret that opens the menu. @default false */
  split?: boolean;
  /** Primary action for split mode. */
  onClick?: () => void;
  disabled?: boolean;
  /** Which edge the menu aligns to under the button. @default "right" */
  align?: 'left' | 'right';
  title?: string;
  menuMinWidth?: number;
  style?: React.CSSProperties;
}

/** Action button that drops a menu of options — the toolbar pattern. Plain menu button (Download ▾) or `split` (Publish: main label commits, divided caret opens options). Closes on outside click / Escape. */
export function MenuButton(props: MenuButtonProps): JSX.Element;
