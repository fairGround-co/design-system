import React from 'react';

/**
 * Spinner — a loading indicator.
 *
 * NOTE (core port): the source system's brand preset variants
 * (rainbow / pinkblue / flag / transflag) were removed — presets stay
 * app-side. The multi-color arc mechanics remain: pass `colors` (an array
 * of CSS colors) and the arc stroke cycles through them on an interval
 * (`colorInterval` ms), so an app can reproduce its own presets. The
 * waving-flag variants were bespoke brand components and live app-side
 * entirely.
 *
 * Variants:
 *  • default — rotating arc in `color` (accent by default).
 *  • colors  — rotating arc cycling its stroke through the given colors.
 *
 * Three sizes: sm (16px inline), md (24px list/card), lg (40px page-level).
 * Quick and functional — no bounce, no decorative loops.
 *
 * The @keyframes fg-spin rule is injected once globally by this module:
 *   @keyframes fg-spin { to { transform: rotate(360deg); } }
 */
export function Spinner({ size = 'md', color = 'var(--accent)', colors, colorInterval = 400, label = 'Loading…', style }) {
  const sizes = { sm: 16, md: 24, lg: 40 };
  const s = sizes[size] || sizes.md;
  const stroke = 2.5;
  const r = (s - stroke) / 2;
  const circ = 2 * Math.PI * r;

  const cycle = Array.isArray(colors) && colors.length > 0 ? colors : null;
  const [ci, setCi] = React.useState(0);
  React.useEffect(() => {
    if (!cycle || cycle.length < 2) return;
    const t = setInterval(() => setCi(p => (p + 1) % cycle.length), Math.max(50, colorInterval));
    return () => clearInterval(t);
  }, [cycle ? cycle.join('|') : '', colorInterval]);

  const strokeColor = cycle ? cycle[ci % cycle.length] : color;

  return (
    <svg width={s} height={s} viewBox={'0 0 ' + s + ' ' + s}
      role="status" aria-label={label}
      style={{ display: 'inline-block', verticalAlign: 'middle', animation: 'fg-spin 0.8s linear infinite', ...style }}>
      <circle cx={s/2} cy={s/2} r={r} fill="none" stroke={strokeColor} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={circ * 0.7 + ' ' + circ * 0.3}
        style={cycle ? { transition: 'stroke 0.35s ease' } : undefined} />
    </svg>
  );
}

// Inject keyframes once globally
if (typeof document !== 'undefined') {
  if (!document.getElementById('fg-spinner-keyframe')) {
    const st = document.createElement('style');
    st.id = 'fg-spinner-keyframe';
    st.textContent = '@keyframes fg-spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(st);
  }
}
