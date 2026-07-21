import * as React from 'react';

export interface ThemeToggleProps {
  /** Controlled theme. Omit to let the toggle self-manage [data-theme] + localStorage. */
  value?: 'light' | 'dark';
  onChange?: (next: 'light' | 'dark') => void;
  /** Uncontrolled-mode initial value, overriding the auto-detected [data-theme] / system preference. */
  defaultValue?: 'light' | 'dark';
  /** "switch" = labeled pill with a sliding icon thumb (profile dropdowns).
   *  "icon" = compact icon-only button, cycles on click (header strips).
   *  @default "switch" */
  variant?: 'switch' | 'icon';
  /** @default "md" */
  size?: 'sm' | 'md';
  /** Uncontrolled-mode localStorage key. `false` disables persistence;
   *  a string sets a custom key. @default true (key "fg-theme") */
  persist?: boolean | string;
  /** Optional trailing label (switch variant only). */
  label?: React.ReactNode;
  /** Tooltip / accessible title. Defaults to "Switch to light/dark mode". */
  title?: string;
  style?: React.CSSProperties;
}

/**
 * Standard light/dark switcher — drop into a header or profile dropdown.
 * Controlled (value/onChange) like the rest of the system's inputs, with an
 * uncontrolled zero-config fallback that writes document.documentElement's
 * [data-theme] and persists to localStorage on its own.
 */
export function ThemeToggle(props: ThemeToggleProps): JSX.Element;
