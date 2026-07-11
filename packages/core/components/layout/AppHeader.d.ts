import * as React from 'react';

/** A navigation option for the header's inline HeaderSelect. */
export interface HeaderSelectOption {
  value: string;
  label: string;
}

/** The header's inline navigation selector configuration. */
export interface AppHeaderSelect {
  value: string;
  onChange: (value: string) => void;
  options: Array<HeaderSelectOption | { label: string; options: HeaderSelectOption[] }>;
  title?: string;
}

/**
 * The single shared tool header — surface bar, 3px accent rule, navigation baked
 * into the H1. Configure its four color roles here so every page is identical.
 */
export interface AppHeaderProps {
  /** Dynamic leading part (e.g. the year). */
  year?: React.ReactNode;
  /** Color of the year part. Default --scope-view (informational). */
  yearColor?: string;
  /** Static wordmark (the app/brand supplies it). Default "" (none). */
  name?: React.ReactNode;
  /** Color of the wordmark. Default --text (inverts per theme). */
  nameColor?: string;
  /** Inline HeaderSelect navigation — this is the page nav. */
  select?: AppHeaderSelect;
  /** Color of the selector. Default --commit (context-changing signal). */
  selectColor?: string;
  /** Absolutely-centered clock text. */
  clock?: React.ReactNode;
  /** Color of the clock. Default --text-muted. */
  clockColor?: string;
  /** Escape hatch — overrides the structured year/name/select title. */
  title?: React.ReactNode;
  /** Escape hatch — overrides the centered clock slot. */
  center?: React.ReactNode;
  /** Right-aligned slot — status text, share / action buttons. */
  right?: React.ReactNode;
  style?: React.CSSProperties;
}

/** The single shared tool header — configure its four color roles in one place. */
export function AppHeader(props: AppHeaderProps): JSX.Element;
