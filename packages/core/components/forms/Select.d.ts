import * as React from 'react';

export interface SelectProps {
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Plain strings or {value, label, disabled?} objects. */
  options?: (string | { value: string; label: string; disabled?: boolean })[];
  placeholder?: string;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
  style?: React.CSSProperties;
}

/** Boxed dropdown for in-form use — native select under a styled wrapper with custom chevron. */
export function Select(props: SelectProps): JSX.Element;
