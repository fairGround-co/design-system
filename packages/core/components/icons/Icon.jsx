import React from 'react';
import { CORE_ICON_GLYPHS } from './glyphs.js';

/* Re-exported so consumers (and the package barrel) can read/extend the
   built-in registry: `export { Icon, CORE_ICON_GLYPHS } from '.../Icon.jsx'`. */
export { CORE_ICON_GLYPHS };

/**
 * Icon — the line-art icon primitive. One consistent style: 24×24 grid,
 * 1.75px stroke, round caps/joins, no fill, inherits color via currentColor
 * (defaults to ink, var(--text)).
 *
 * The registry MECHANISM lives here; domain glyph sets live app-side. The
 * built-in generic set is CORE_ICON_GLYPHS (status, text, wayfinding/nav);
 * pass `glyphs` (Record<name, innerSVG>) to merge an app registry OVER it —
 * same-name entries win. Unknown names render a dashed placeholder box.
 * Always pass `title` when the icon stands alone — accessibility + the
 * "an icon always carries a tooltip" rule.
 */
export function Icon({ name, size = 24, strokeWidth = 1.75, color, title, glyphs = null, style, ...rest }) {
  const registry = glyphs ? { ...CORE_ICON_GLYPHS, ...glyphs } : CORE_ICON_GLYPHS;
  const inner = registry[name];
  if (!inner) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label={title || name}
        style={style} {...rest}>
        <title>{title || name}</title>
        <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="var(--text-faint)" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
    );
  }
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      role="img" aria-label={title || name}
      /* No color default: the svg strokes with currentColor, so the icon
         INHERITS its context's ink (button labels, toast tones, muted
         captions) unless a color prop overrides it. */
      style={{ ...(color ? { color } : {}), display: 'inline-block', verticalAlign: 'middle', ...style }}
      dangerouslySetInnerHTML={{ __html: (title ? '<title>' + title + '</title>' : '') + inner }}
      {...rest}
    />
  );
}
