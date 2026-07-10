import * as React from 'react';

export interface SearchInputProps {
  value: string;
  onChange?: (value: string) => void;
  /** Extra handler fired when the ✕ clear button is pressed. */
  onClear?: () => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

/** List-pane search box with surface-2 fill, accent focus ring, and a ✕ clear button. */
export function SearchInput(props: SearchInputProps): JSX.Element;
