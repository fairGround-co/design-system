import React from 'react';
import { Icon } from '../icons/Icon.jsx';

/**
 * Badge — a rounded status / category pill.
 *
 * Two flavors:
 *  • Status (tone): tinted background derived from a semantic status hue,
 *    for record state ("Checked In", "Cancelled", "Not yet").
 *    Pass `icon` for an inline status icon (e.g. 'check', 'cancel', 'pending').
 *  • Categorical (cat): a solid identity color chip for categorical labels —
 *    a --cat-N slot number or a pass-through CSS color.
 *
 * Standard status set:
 *   <Badge tone="info" icon="check">Checked In</Badge>
 *   <Badge tone="caution" icon="pending">Not yet</Badge>
 *   <Badge tone="danger" icon="cancel">Cancelled</Badge>
 *   <Badge tone="success" solid>Confirmed</Badge>
 */
export function Badge({
  tone = 'neutral',
  cat = null,
  solid = false,
  icon = null,
  children,
  style,
  ...rest
}) {
  // Background/border tints are deliberately TRANSLUCENT (color-mix with
  // transparent) — NOT the opaque -soft tokens from the contract. The
  // translucency lets badges subtly adapt to whatever surface they sit on
  // (surface, surface-2, surface-3, dark/light). Switching to the opaque
  // -soft values would make them float on non-white backgrounds.
  //
  // Caution and success draw their fg/border from --status-caution-ink /
  // --status-success-ink. In light mode those tokens resolve to a
  // ~12%-darkened ink so the too-light base hues stay legible as text/border;
  // in dark mode the theme re-points them to the base hues, which read fine
  // on charcoal. Do NOT replace them with the raw status hue (that breaks
  // the dark-mode re-point).
  const tones = {
    success: { bg: 'color-mix(in srgb, var(--status-success) 18%, transparent)', fg: 'var(--status-success-ink)', bd: 'var(--status-success-ink)' },
    warning: { bg: 'color-mix(in srgb, var(--status-warning) 16%, transparent)', fg: 'var(--status-warning-ink)', bd: 'color-mix(in srgb, var(--status-warning) 40%, transparent)' },
    caution: { bg: 'color-mix(in srgb, var(--status-caution) 20%, transparent)', fg: 'var(--status-caution-ink)', bd: 'var(--status-caution-ink)' },
    danger:  { bg: 'color-mix(in srgb, var(--status-danger) 14%, transparent)', fg: 'var(--status-danger-ink)', bd: 'color-mix(in srgb, var(--status-danger) 40%, transparent)' },
    info:    { bg: 'color-mix(in srgb, var(--status-info) 16%, transparent)', fg: 'var(--status-info-ink)', bd: 'color-mix(in srgb, var(--status-info) 40%, transparent)' },
    commit:  { bg: 'color-mix(in srgb, var(--commit) 14%, transparent)', fg: 'var(--commit)', bd: 'color-mix(in srgb, var(--commit) 40%, transparent)' },
    neutral: { bg: 'var(--surface-2)', fg: 'var(--text-muted)', bd: 'var(--border)' },
  };

  // Categorical takes precedence: a solid identity color chip.
  // `cat` = slot number 1–12 (renders var(--cat-N)) or any CSS color string
  // for app-computed identity palettes.
  if (cat) {
    const cc = typeof cat === 'number' ? `var(--cat-${cat})` : cat;
    const light = cat === 3; // slot 3 (yellow) is the light fill — dark ink
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '4px 12px', borderRadius: 'var(--r-pill)',
        /* literal dark ink on the light fill — chip fills don't flip with theme */
        background: cc, color: light ? '#1c2126' : 'var(--on-accent)',
        fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 800,
        textTransform: 'uppercase', letterSpacing: '0.04em', ...style,
      }} {...rest}>{children}</span>
    );
  }

  const t = tones[tone] || tones.neutral;
  const iconEl = icon ? <Icon name={icon} size={14} color="currentColor" /> : null;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 14px', borderRadius: 'var(--r-pill)',
      background: solid ? t.fg : t.bg,
      color: solid ? 'var(--on-accent)' : t.fg,
      border: `2px solid ${solid ? 'transparent' : t.bd}`,
      fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 700,
      lineHeight: 1, whiteSpace: 'nowrap', ...style,
    }} {...rest}>{iconEl}{children}</span>
  );
}
