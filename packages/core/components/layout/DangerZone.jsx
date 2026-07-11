import React from 'react';

/**
 * DangerZone — a visual wrapper for destructive action groups in admin/settings
 * panels. A subtle danger-tinted border and recessed background clearly separate
 * dangerous controls from everyday ones. Matches the dense utility aesthetic.
 */
export function DangerZone({
  title = 'Danger Zone',
  children,
  style,
}) {
  return (
    <div style={{
      border: '1.5px solid var(--status-danger-soft)',
      borderRadius: 'var(--r-sm)',
      background: 'color-mix(in oklab, var(--status-danger), transparent 96%)',
      padding: '14px 16px',
      fontFamily: 'var(--font-ui)',
      ...style,
    }}>
      <div style={{
        fontSize: 10, fontWeight: 800, textTransform: 'uppercase',
        letterSpacing: '0.08em', color: 'var(--status-danger-ink)',
        marginBottom: 10,
      }}>{title}</div>
      {children}
    </div>
  );
}
