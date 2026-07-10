import * as React from 'react';

/** Names in the built-in generic registry (status, text, wayfinding/nav). */
export type IconName =
  | 'check' | 'pending' | 'cancel' | 'warning' | 'info' | 'checkcircle'
  | 'thumbsup' | 'thumbsdown' | 'ban' | 'help' | 'conflict' | 'nocontact'
  | 'xmark'
  | 'fontsize'
  | 'pin' | 'people' | 'group' | 'flag' | 'phone' | 'mail' | 'edit'
  | 'search' | 'filter' | 'map' | 'list' | 'share' | 'external' | 'chevron';

/**
 * The built-in generic glyph registry: name → inner SVG markup for a 24×24
 * viewBox (1.75px stroke, round caps/joins, currentColor). App registries
 * merge over it via the Icon `glyphs` prop.
 */
export const CORE_ICON_GLYPHS: Record<IconName, string>;

export interface IconProps {
  /** Glyph name — from CORE_ICON_GLYPHS or an injected `glyphs` registry. */
  name: IconName | string;
  /** Pixel size (width = height). @default 24 */
  size?: number;
  /** @default 1.75 */
  strokeWidth?: number;
  /** Stroke color; defaults to currentColor so it inherits text color. */
  color?: string;
  /** Tooltip / accessible label — pass whenever the icon stands alone. */
  title?: string;
  /**
   * App-side glyph registry (name → inner SVG for a 24×24 viewBox), merged
   * OVER CORE_ICON_GLYPHS — same-name entries win. Unknown names render a
   * dashed placeholder box.
   */
  glyphs?: Record<string, string> | null;
  style?: React.CSSProperties;
}

/**
 * Custom line-art icon. Consistent 24×24 / 1.75px-stroke / round style; inherits color.
 */
export function Icon(props: IconProps): JSX.Element;
