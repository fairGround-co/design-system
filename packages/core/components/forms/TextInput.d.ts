import * as React from 'react';

export interface TextInputProps {
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Leading icon glyph name (from the Icon set). */
  icon?: string;
  error?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  name?: string;
  id?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

/** Standard text input — surface-2 fill, accent focus ring, error state, sizes matching Button. */
export function TextInput(props: TextInputProps): JSX.Element;
