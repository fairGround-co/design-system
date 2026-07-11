import React from 'react';

/**
 * ColorPicker — a curated swatch picker drawn from a fixed palette (never a
 * free-form hex picker). One palette can serve every color control in a
 * system: a standalone chooser AND rich-text text/background formatters.
 *
 * The default palette is the contract's 12 categorical slots
 * (`--cat-1…--cat-12`) — discrete identities, brand-overridable at the theme
 * layer. Apps with a domain palette (named hues, theme-adaptive "default" /
 * "inverse" swatches, neutrals) inject it via `options`; entries with the
 * special values `'default'` (auto text color) and `'inverse'` (auto surface
 * color) track the active theme instead of being fixed hex, so a picker reads
 * correctly on light and dark surfaces alike.
 */
const DEFAULT_PALETTE = [
  { name: 'Red', value: 'var(--cat-1)' },
  { name: 'Orange', value: 'var(--cat-2)' },
  { name: 'Yellow', value: 'var(--cat-3)' },
  { name: 'Green', value: 'var(--cat-4)' },
  { name: 'Blue', value: 'var(--cat-5)' },
  { name: 'Purple', value: 'var(--cat-6)' },
  { name: 'Sky', value: 'var(--cat-7)' },
  { name: 'Magenta', value: 'var(--cat-8)' },
  { name: 'Teal', value: 'var(--cat-9)' },
  { name: 'Brown', value: 'var(--cat-10)' },
  { name: 'Slate', value: 'var(--cat-11)' },
  { name: 'Lime', value: 'var(--cat-12)' },
];

// Light swatches need an edge to stay visible on light surfaces.
const _isWhite = (v) => /^(#fff(?:fff)?|white)$/i.test(String(v || '').trim());

export function ColorPicker({ value, onChange, options, swatch = 26, columns = 4, allowDefault = false, style }) {
  // allowDefault prepends a theme-aware "Default" swatch when the palette in
  // use (default or injected) doesn't already carry one.
  const base = options || DEFAULT_PALETTE;
  const palette = (allowDefault && !base.some((c) => c.value === 'default'))
    ? [{ name: 'Default', value: 'default' }, ...base] : base;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: columns ? `repeat(${columns}, ${swatch}px)` : `repeat(auto-fit, ${swatch}px)`,
      gap: 8, ...style,
    }}>
      {palette.map((c) => {
        const on = value === c.value || value === c.name;
        // "default" = the theme's own text color (auto-black on light / auto-white
        // on dark); "inverse" = the theme's surface color (its mirror image). Both
        // flip with the active theme rather than being a fixed hex.
        const isDefault = c.value === 'default';
        const isInverse = c.value === 'inverse';
        const isAuto = isDefault || isInverse;
        const bg = isDefault ? 'var(--text)' : isInverse ? 'var(--surface)' : c.value;
        return (
          <button key={c.name} type="button" title={c.name} aria-label={c.name}
            onClick={() => onChange && onChange(c.value, c)}
            style={{
              width: swatch, height: swatch, borderRadius: 'var(--r-sm)',
              background: bg, cursor: 'pointer', padding: 0,
              border: (isAuto || _isWhite(c.value)) ? '1.5px solid var(--border)' : 'none',
              boxShadow: on ? '0 0 0 2px var(--surface), 0 0 0 4px var(--text)' : 'none',
              outline: 'none', position: 'relative',
            }}>
            {isAuto ? <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDefault ? 'var(--surface)' : 'var(--text)', fontSize: 13, fontWeight: 800 }}>A</span> : null}
          </button>
        );
      })}
    </div>
  );
}
