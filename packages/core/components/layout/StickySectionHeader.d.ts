import * as React from 'react';

export interface StickyState {
  /** True while the header is pinned at its `top` offset. */
  stuck: boolean;
}

export interface StickySectionHeaderProps {
  /** Pin offset — number(px) or CSS length. Match the fixed chrome above it. @default 0 */
  top?: number | string;
  /** Stacking context for the pinned header. @default 30 */
  zIndex?: number;
  /** Element/tag to render as (e.g. 'h2'). @default 'div' */
  as?: keyof JSX.IntrinsicElements;
  /** Node, or a render-prop `({ stuck }) => node` to vary content when pinned. */
  children?: React.ReactNode | ((state: StickyState) => React.ReactNode);
  style?: React.CSSProperties;
  [attr: string]: any;
}

/**
 * Section header that pins below `top` while its section scrolls under it,
 * exposing a stuck flag via render-prop and a `[data-stuck]` attribute.
 * Sticky positioning + a passive scroll/resize sentinel read (portable
 * across embedded webviews where IntersectionObserver misbehaves).
 */
export function StickySectionHeader(props: StickySectionHeaderProps): JSX.Element;
