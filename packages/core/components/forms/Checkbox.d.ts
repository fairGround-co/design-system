import * as React from 'react';

export interface CheckboxProps {
  checked?: boolean;
  /** Renders a dash instead of a check — for "select all" partial state. */
  indeterminate?: boolean;
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  id?: string;
  name?: string;
  style?: React.CSSProperties;
}

/** Custom-styled checkbox with a view-scope check mark and optional label. */
export function Checkbox(props: CheckboxProps): JSX.Element;
