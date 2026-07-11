import React from 'react';
import { Icon } from '../icons/Icon.jsx';

/**
 * Notice — the inline/banner notice for page content: callouts, review
 * notes, empty-data warnings, form-level errors. Sits IN the flow on a
 * resting surface — unlike Toast (transient, floating) it never moves,
 * never auto-dismisses, and never carries actions beyond its text.
 *
 * Tone styling follows the selection-state recipe rather than the -soft
 * tints: the fill mixes the status hue INTO the current surface
 * (color-mix with var(--surface)), so it tracks light/dark and any brand
 * scope automatically — a -soft tint always mixes toward white and goes
 * illegible on charcoal.
 */
const TONES = {
  success: { color: 'var(--status-success)', ink: 'var(--status-success-ink)', icon: 'check' },
  warning: { color: 'var(--status-warning)', ink: 'var(--status-warning-ink)', icon: 'warning' },
  caution: { color: 'var(--status-caution)', ink: 'var(--status-caution-ink)', icon: 'pending' },
  danger:  { color: 'var(--status-danger)',  ink: 'var(--status-danger-ink)',  icon: 'cancel' },
  info:    { color: 'var(--status-info)',    ink: 'var(--status-info-ink)',    icon: 'info' },
};

export function Notice({
  tone = 'info',
  title,
  icon,
  compact = false,
  children,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.info;
  const iconName = icon === null ? null : (icon || t.icon);
  return (
    <div role="note" style={{
      display: 'flex', gap: compact ? 8 : 12, alignItems: 'flex-start',
      background: `color-mix(in oklab, ${t.color}, var(--surface) 88%)`,
      border: `var(--border-w-std) solid ${t.color}`,
      borderRadius: 'var(--r-sm)',
      padding: compact ? '6px 12px' : 'var(--space-5) var(--space-6)',
      color: 'var(--text)', fontFamily: 'var(--font-ui)',
      fontSize: compact ? 'var(--fs-xs)' : 'var(--fs-sm)',
      lineHeight: 'var(--lh-normal)',
      ...style,
    }} {...rest}>
      {iconName && (
        <span style={{ color: t.ink, flex: 'none', display: 'inline-flex', marginTop: compact ? 1 : 2 }} aria-hidden="true">
          <Icon name={iconName} size={compact ? 14 : 17} />
        </span>
      )}
      <div style={{ minWidth: 0 }}>
        {title && (
          <div style={{
            color: t.ink, fontWeight: 'var(--fw-bold)', textTransform: 'uppercase',
            letterSpacing: 'var(--ls-label)', fontSize: compact ? 'var(--fs-2xs)' : 'var(--fs-xs)',
            marginBottom: children ? 4 : 0,
          }}>{title}</div>
        )}
        {children}
      </div>
    </div>
  );
}
