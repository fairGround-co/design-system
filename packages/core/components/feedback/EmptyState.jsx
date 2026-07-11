import React from 'react';
import { Icon } from '../icons/Icon.jsx';

const _canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

/**
 * EmptyState — a centered message for when a list, panel, or view has no data.
 * Shows an icon, a title, an optional description, and an optional action
 * button. Keeps the terse operational voice: short titles, no filler.
 *
 * Examples:
 *   <EmptyState icon="search" title="No results" message="Try a different search." />
 *   <EmptyState icon="list" title="No items yet" action="Add item" onAction={…} />
 *   <EmptyState icon="check" title="All done" />
 */
export function EmptyState({
  icon = 'info',
  title,
  message,
  action,
  onAction,
  size = 'md',
  style,
}) {
  const sizes = {
    sm: { iconSize: 28, titleSize: 13, msgSize: 12, gap: 8, pad: '20px 16px' },
    md: { iconSize: 36, titleSize: 15, msgSize: 13, gap: 10, pad: '32px 24px' },
    lg: { iconSize: 48, titleSize: 18, msgSize: 14, gap: 14, pad: '48px 32px' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: s.pad, fontFamily: 'var(--font-ui)',
      ...style,
    }}>
      <div style={{ color: 'var(--text-faint)', marginBottom: s.gap }}>
        <Icon name={icon} size={s.iconSize} color="var(--text-faint)" />
      </div>
      {title ? (
        <div style={{
          fontSize: s.titleSize, fontWeight: 800, color: 'var(--text-muted)',
          textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1.3,
        }}>{title}</div>
      ) : null}
      {message ? (
        <div style={{
          fontSize: s.msgSize, color: 'var(--text-faint)', lineHeight: 1.5,
          marginTop: 4, maxWidth: 280,
        }}>{message}</div>
      ) : null}
      {action && onAction ? (
        <button type="button" onClick={onAction} style={{
          marginTop: 14,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          padding: '8px 18px', fontSize: 13, fontWeight: 800,
          fontFamily: 'var(--font-ui)', lineHeight: 1,
          background: 'var(--accent)', color: 'var(--on-accent)', border: 'none',
          borderRadius: 'var(--r-sm)', cursor: 'pointer',
          transition: 'opacity var(--dur-instant) var(--ease-ui)',
        }}
          onMouseEnter={_canHover ? (e) => { e.currentTarget.style.opacity = '0.85'; } : undefined}
          onMouseLeave={_canHover ? (e) => { e.currentTarget.style.opacity = '1'; } : undefined}
        >{action}</button>
      ) : null}
    </div>
  );
}
