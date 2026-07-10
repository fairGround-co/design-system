import * as React from 'react';

export interface PaletteColor {
  name: string;
  /** CSS color (token var or hex), or the special values 'default' /
   *  'inverse' for theme-adaptive text / surface swatches. */
  value: string;
}

export interface ColorPickerProps {
  /** Selected color (matched by value or name). */
  value?: string;
  onChange?: (value: string, color: PaletteColor) => void;
  /** Curated swatches. Defaults to the 12 categorical slots
   *  (var(--cat-1)…var(--cat-12)). Inject a domain palette here. */
  options?: PaletteColor[];
  /** Swatch size in px. @default 26 */
  swatch?: number;
  /** Fixed column count. @default 4 */
  columns?: number;
  /** Prepend a theme-aware "Default" swatch when the palette in use omits one.
   *  @default false */
  allowDefault?: boolean;
  style?: React.CSSProperties;
}

/**
 * Curated palette swatch picker — fixed palette only, never a free hex field.
 */
export function ColorPicker(props: ColorPickerProps): JSX.Element;
