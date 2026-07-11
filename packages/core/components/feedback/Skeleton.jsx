import React from 'react';

// ── Media-row card layout sync ────────────────────────────────────────
// These mirror a typical media-row card's column structure so the skeleton
// placeholder matches: [icon col] [number badge] [category bar] [text].
// If the app's card widths differ, override via SkeletonCard's `style`.
const _CARD_ICON_COL  = 22;   // leading icon column
const _CARD_BADGE_W   = 34;   // number-badge column width
const _CARD_COLOR_BAR = 6;    // category color bar
const _CARD_GAP       = 4;    // marginBottom between cards

/**
 * Skeleton — a shimmer placeholder for loading states. Renders a pulsing
 * rounded rectangle that fills its container. Use it in place of text lines,
 * card contents, or tile grids while data is loading.
 *
 * Variants:
 *  • 'line'  — a single text-line placeholder (default). Set `width` for
 *              partial-width lines (e.g. "60%" for a short line).
 *  • 'card'  — a full card-height placeholder with the standard card radius.
 *  • 'tile'  — a square tile placeholder.
 *  • 'circle'— a circular placeholder (avatar, icon).
 *
 * Multiple Skeletons stacked with a small gap simulate a loading card body.
 * The shimmer is a CSS animation — no JS timers.
 */
export function Skeleton({ variant = 'line', width, height, style }) {
  const defaults = {
    line:   { h: 14, r: 'var(--r-sm)', w: '100%' },
    card:   { h: 60, r: 'var(--r-sm)', w: '100%' },
    tile:   { h: 48, r: 'var(--r-sm)', w: '100%' },
    circle: { h: 32, r: '50%', w: 32 },
  };
  const d = defaults[variant] || defaults.line;

  return (
    <div aria-hidden="true" style={{
      width: width || d.w,
      height: height || d.h,
      borderRadius: d.r,
      background: 'var(--border)',
      animation: 'fg-shimmer 1.4s ease-in-out infinite',
      ...style,
    }} />
  );
}

/**
 * SkeletonCard — a pre-composed skeleton matching a typical media-row card
 * layout: [icon col] [number] [color bar] [two text lines]. Drop-in
 * replacement while a card list is loading.
 */
export function SkeletonCard({ style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'stretch', borderRadius: 'var(--r-sm)',
      border: 'var(--border-w-std) solid var(--border)', background: 'var(--surface-2)',
      overflow: 'hidden', marginBottom: _CARD_GAP, height: 52,
      ...style,
    }}>
      <div style={{ width: _CARD_ICON_COL, flexShrink: 0 }} />
      <div style={{ width: _CARD_BADGE_W, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Skeleton variant="line" width={18} height={14} />
      </div>
      <div style={{ width: _CARD_COLOR_BAR, flexShrink: 0, background: 'var(--surface-3)' }} />
      <div style={{ flex: 1, padding: '9px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Skeleton variant="line" width="70%" height={13} />
        <Skeleton variant="line" width="40%" height={10} />
      </div>
    </div>
  );
}

// Inject shimmer keyframe once
if (typeof document !== 'undefined' && !document.getElementById('fg-skeleton-keyframe')) {
  const st = document.createElement('style');
  st.id = 'fg-skeleton-keyframe';
  st.textContent = '@keyframes fg-shimmer { 0%, 100% { opacity: 0.45; } 50% { opacity: 0.85; } }';
  document.head.appendChild(st);
}
