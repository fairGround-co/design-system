import * as React from 'react';

export interface TextareaProps {
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  /** Visible line count. @default 4 */
  rows?: number;
  error?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  id?: string;
  maxLength?: number;
  style?: React.CSSProperties;
}

/** Multiline text input — same visual language as TextInput with optional character counter. */
export function Textarea(props: TextareaProps): JSX.Element;
