import React from 'react';

/**
 * ProgressBar — a determinate + indeterminate progress indicator for multi-step
 * flows (e.g. "Publishing: step 3 of 5").
 *
 * NOTE (core port): the source system's named gradient variants were brand
 * presets and stay app-side. Apps reproduce them by passing their own color
 * arrays via `colors`, which renders the same multi-color gradient mechanics
 * (evenly spaced stops across the fill / sliding band).
 *
 * Fill styles:
 *  • default — solid fill in `color` (default accent).
 *  • colors  — `colors: string[]` renders an evenly-spaced gradient through
 *              the given colors.
 *
 * Determinate: `value` is 0–1 (clamped). The fill width animates smoothly.
 * Indeterminate: a sliding gradient band — built from `colors` when given,
 * otherwise from `color`.
 *
 * Sizes: sm (4px), md (8px), lg (12px). Pill-radius ends on both track and fill.
 */

function buildFillGradient(colors) {
  if (colors.length === 1) return colors[0];
  const stops = colors.map((c, idx) => {
    const t = (idx / (colors.length - 1)) * 100;
    return c + ' ' + t + '%';
  });
  return 'linear-gradient(90deg, ' + stops.join(', ') + ')';
}

function buildIndeterminateGradient(colors, spread) {
  // spread: 0–1, controls how wide the gradient band is (0.3 = 30% of track)
  const s = Math.max(0.1, Math.min(1, spread));
  const edge = ((1 - s) / 2) * 100;
  const inner = edge + s * 100;
  const w = inner - edge;
  const stops = colors.length === 1
    ? [colors[0] + ' ' + edge + '%', colors[0] + ' ' + inner + '%']
    : colors.map((c, idx) => {
        const t = idx / (colors.length - 1);
        return c + ' ' + (edge + w * t) + '%';
      });
  return 'linear-gradient(90deg, transparent 0%, transparent ' + edge + '%, ' + stops.join(', ') + ', transparent ' + inner + '%)';
}

export function ProgressBar({
  value,
  indeterminate = false,
  size = 'md',
  color = 'var(--accent)',
  colors,
  label = 'Progress',
  showPercent = false,
  speed = 1.4,
  gradientWidth = 0.35,
  style,
}) {
  const heights = { sm: 4, md: 8, lg: 12 };
  const h = heights[size] || heights.md;
  const clamped = Math.max(0, Math.min(1, value || 0));
  const pct = Math.round(clamped * 100);

  const multi = Array.isArray(colors) && colors.length > 0 ? colors : null;
  const fillBg = multi ? buildFillGradient(multi) : color;
  const indeterminateBg = buildIndeterminateGradient(multi || [color], gradientWidth);

  const dur = Math.max(0.3, speed) + 's';

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={indeterminate ? undefined : pct}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: 'var(--font-ui)', ...style,
      }}
    >
      <div style={{
        flex: 1, height: h, borderRadius: 'var(--r-pill)',
        background: 'var(--surface-2)', overflow: 'hidden', position: 'relative',
      }}>
        {indeterminate ? (
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: 'var(--r-pill)',
            background: indeterminateBg,
            animation: 'fg-progress-slide ' + dur + ' var(--ease-ui) infinite',
          }} />
        ) : (
          <div style={{
            height: '100%', borderRadius: 'var(--r-pill)',
            background: fillBg,
            backgroundSize: multi ? (100 / clamped) + '% 100%' : undefined,
            width: pct + '%',
            transition: 'width var(--dur-base) var(--ease-ui)',
          }} />
        )}
      </div>
      {showPercent && !indeterminate ? (
        <span style={{
          fontSize: 11, fontWeight: 800, color: 'var(--text-muted)',
          fontVariantNumeric: 'tabular-nums', letterSpacing: '0.04em',
          minWidth: 32, textAlign: 'right',
        }}>{pct}%</span>
      ) : null}
    </div>
  );
}

// Inject keyframes once globally
if (typeof document !== 'undefined' && !document.getElementById('fg-progress-keyframe')) {
  const st = document.createElement('style');
  st.id = 'fg-progress-keyframe';
  st.textContent = '@keyframes fg-progress-slide { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }';
  document.head.appendChild(st);
}
