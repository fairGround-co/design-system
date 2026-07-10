import * as React from 'react';

export interface ValidationRule {
  /** Returns true when the value is valid. */
  test: (value: any) => boolean;
  /** Error message shown when the rule fails. */
  message: string;
}

export interface FormFieldProps {
  /** Uppercase tracked eyebrow label. */
  label?: string;
  /** Small hint text below the label. */
  hint?: string;
  /** Danger-colored error message below the control. Overrides auto-validation if set. */
  error?: string;
  /** Adds a commit-colored asterisk after the label. @default false */
  required?: boolean;
  htmlFor?: string;
  /** Current field value — when paired with `rules`, enables auto-validation. */
  value?: any;
  /** Validation rules — auto-validates when `value` is also provided. */
  rules?: ValidationRule[];
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/** Label + input + error wrapper — the standard way to compose any form control with its label. */
export function FormField(props: FormFieldProps): JSX.Element;
