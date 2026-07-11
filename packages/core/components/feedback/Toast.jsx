import React from 'react';
import { Icon } from '../icons/Icon.jsx';

const _isCoarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/**
 * Toast — a transient notification. A surface pill with a FULL border in the
 * tone color (not a left-border accent), centered text, leading semantic
 * icon, optional action + close.
 *
 * Tones map to the status tokens — success / warning / error (danger) /
 * info — so themes control the semantics. The inline action uses the accent
 * color. Place a fixed container bottom-center and render Toasts into it;
 * this component is the pill itself.
 */
const TONES = {
  info:    { color: 'var(--status-info)',    icon: 'info' },
  success: { color: 'var(--status-success)', icon: 'check' },
  warning: { color: 'var(--status-warning)', icon: 'warning' },
  error:   { color: 'var(--status-danger)',  icon: 'cancel' },
};

export function Toast({ tone = 'info', title, message, actionLabel, onAction, onClose, style }) {
  const t = TONES[tone] || TONES.info;
  return (
    <div role="status" style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      minWidth: 260, maxWidth: 420, padding: '12px 14px',
      background: 'var(--surface)', border: '2px solid ' + t.color, borderRadius: 'var(--r-md)',
      boxShadow: 'var(--shadow-pop)', fontFamily: 'var(--font-ui)', ...style,
    }}>
      <span style={{ flexShrink: 0, marginTop: 1, color: t.color }}>
        <Icon name={t.icon} size={20} title={tone} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title ? <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', lineHeight: 1.3 }}>{title}</div> : null}
        {message ? <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.4, marginTop: title ? 2 : 0 }}>{message}</div> : null}
        {actionLabel ? (
          <button type="button" onClick={onAction} style={{
            marginTop: 8, background: 'none', border: 'none', padding: 0, cursor: 'pointer',
            color: 'var(--accent)', fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 800,
          }}>{actionLabel}</button>
        ) : null}
      </div>
      {onClose ? (
        <button type="button" onClick={onClose} title="Dismiss" aria-label="Dismiss" style={{
          flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-muted)', fontSize: 14, lineHeight: 1,
          padding: 2, width: _isCoarse ? 44 : undefined, height: _isCoarse ? 44 : undefined,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✕</button>
      ) : null}
    </div>
  );
}
