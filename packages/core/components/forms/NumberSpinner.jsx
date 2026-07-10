import React from 'react';

const _isCoarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/**
 * NumberSpinner — a compact numeric stepper.
 *
 * Two layouts:
 *   • 'stacked'  — a value with a tiny +/− pair stacked to its right; a dense
 *     per-row count control (revealed on row hover) that fits inside a table
 *     cell.
 *   • 'inline'   — [−] value [+] on one row, larger targets. The general-purpose
 *     boxed spinner (e.g. a year field on a sign-in screen).
 *
 * The value can be `accent`-tinted (e.g. a count that should read in the
 * theme accent). Clamps to [min, max]; the −/＋ buttons disable at the bounds.
 * Numbers are always tabular. Controlled: pass `value` + `onChange(next)`.
 */
export function NumberSpinner({
  value = 0,
  onChange,
  min = 0,
  max = 99,
  step = 1,
  layout = 'inline',
  size = 'md',
  accent = false,
  disabled = false,
  hideStepsUntilHover = false,   // stacked-only: +/- fade in on parent hover
  hovering = true,               // parent-controlled hover flag for the above
  'aria-label': ariaLabel,
  style,
}) {
  const clamp = (n) => Math.max(min, Math.min(max, n));
  const bump = (d) => { if (disabled) return; const next = clamp(value + d * step); if (next !== value) onChange && onChange(next); };
  const atMin = value <= min, atMax = value >= max;

  const valColor = accent ? 'var(--accent)' : 'var(--text)';

  if (layout === 'stacked') {
    const stepBtn = {
      width: 18, height: 15, lineHeight: '12px', padding: 0, textAlign: 'center',
      fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-ui)',
      background: 'var(--surface-3)', border: '1px solid var(--border-strong)', color: 'var(--text)',
      borderRadius: 3, cursor: 'pointer',
    };
    const show = !hideStepsUntilHover || hovering;
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', gap: 5, fontFamily: 'var(--font-ui)', ...style }}>
        <span className="fg-tnum" style={{ fontSize: size === 'sm' ? 13 : 15, fontWeight: 700, color: valColor, minWidth: 16, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{value}</span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2, opacity: show ? 1 : 0, pointerEvents: show ? 'auto' : 'none', transition: 'opacity var(--dur-fast)' }}>
          <button type="button" title="Increase" disabled={disabled || atMax} aria-label="Increase"
            onClick={(e) => { e.stopPropagation(); bump(1); }}
            style={{ ...stepBtn, opacity: (disabled || atMax) ? 'var(--opacity-disabled)' : 1, cursor: (disabled || atMax) ? 'not-allowed' : 'pointer' }}>+</button>
          <button type="button" title="Decrease" disabled={disabled || atMin} aria-label="Decrease"
            onClick={(e) => { e.stopPropagation(); bump(-1); }}
            style={{ ...stepBtn, opacity: (disabled || atMin) ? 'var(--opacity-disabled)' : 1, cursor: (disabled || atMin) ? 'not-allowed' : 'pointer' }}>−</button>
        </span>
      </span>
    );
  }

  // inline layout — [−] value [+]
  const sizes = {
    sm: { btn: _isCoarse ? 44 : 28, font: 14, valW: 34 },
    md: { btn: _isCoarse ? 44 : 34, font: 17, valW: 44 },
    lg: { btn: _isCoarse ? 48 : 42, font: 21, valW: 56 },
  };
  const s = sizes[size] || sizes.md;
  const roundBtn = (dir, dis) => ({
    width: s.btn, height: s.btn, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--surface-2)', border: '1.5px solid var(--border-strong)', color: 'var(--text)',
    borderRadius: 'var(--r-sm)', fontSize: Math.round(s.font * 1.1), fontWeight: 700, lineHeight: 1,
    fontFamily: 'var(--font-ui)', cursor: dis ? 'not-allowed' : 'pointer', opacity: dis ? 'var(--opacity-disabled)' : 1,
    transition: 'border-color var(--dur-fast), background var(--dur-fast)',
  });
  return (
    <span role="group" aria-label={ariaLabel} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-ui)', ...style }}>
      <button type="button" title="Decrease" aria-label="Decrease" disabled={disabled || atMin} onClick={() => bump(-1)} style={roundBtn('-', disabled || atMin)}>−</button>
      <span className="fg-tnum" aria-live="polite" style={{
        minWidth: s.valW, textAlign: 'center', fontSize: s.font, fontWeight: 800, color: valColor,
        fontVariantNumeric: 'tabular-nums',
      }}>{value}</span>
      <button type="button" title="Increase" aria-label="Increase" disabled={disabled || atMax} onClick={() => bump(1)} style={roundBtn('+', disabled || atMax)}>+</button>
    </span>
  );
}
