import * as React from 'react';

export interface BottomTabBarTab {
  value: string;
  label: string;
  /** Icon glyph name from the Icon registry. */
  icon: string;
}

export interface BottomTabBarProps {
  tabs?: BottomTabBarTab[];
  value?: string;
  onChange?: (value: string) => void;
  /** @default "fixed" */
  position?: 'fixed' | 'static' | 'relative';
  style?: React.CSSProperties;
}

/** Mobile bottom navigation bar — icon + label tabs, accent highlight, safe-area padding. */
export function BottomTabBar(props: BottomTabBarProps): JSX.Element;
