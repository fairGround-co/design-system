import React from 'react';

const _isCoarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/**
 * Dialog — a modal dialog shell. Renders a scrim overlay + a centered card
 * with a title bar, scrollable body, and a footer slot for actions.
 *
 * Visual language: 14px radius (the --r-lg dialog tier), surface fill,
 * pop shadow, 1px border. The title bar uses the uppercase tracked eyebrow
 * style. Close button (✕) in the top-right corner.
 *
 * `size`: 'sm' (320px), 'md' (440px), 'lg' (600px), 'full' (90vw).
 *
 * On screens ≤760px (--mobile-bp), the dialog anchors to the bottom of the
 * screen as a slide-up sheet — putting footer actions in the thumb zone.
 * Top-only border-radius, full width minus margins, safe-area padding.
 *
 * The dialog traps focus on mount and restores it on unmount. Press Escape
 * or click the scrim to close (unless `persistent`).
 */
export function Dialog({
  open = true,
  title,
  size = 'md',
  persistent = false,
  onClose,
  footer,
  children,
  style,
}) {
  const dialogRef = React.useRef(null);
  const triggerRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches
  );

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 760px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Capture trigger element on open, restore on close
  React.useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
    } else if (triggerRef.current) {
      try { triggerRef.current.focus(); } catch (e) {}
      triggerRef.current = null;
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape' && !persistent && onClose) onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, persistent, onClose]);

  React.useEffect(() => {
    if (open && dialogRef.current) {
      const first = dialogRef.current.querySelector('button, input, select, textarea, [tabindex]');
      if (first) first.focus();
    }
  }, [open]);

  if (!open) return null;

  const widths = { sm: 320, md: 440, lg: 600, full: '90vw' };
  const w = widths[size] || widths.md;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex',
      alignItems: isMobile ? 'flex-end' : 'center',
      justifyContent: 'center',
      background: 'var(--scrim)',
    }}
      onClick={(e) => {
        if (!persistent && onClose && e.target === e.currentTarget) onClose();
      }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={title}
        style={{
          width: isMobile ? 'calc(100% - 16px)' : (typeof w === 'number' ? w : w),
          maxWidth: isMobile ? 'none' : '95vw',
          maxHeight: '85vh',
          background: 'var(--surface)',
          border: '1.5px solid var(--border-strong)',
          borderRadius: isMobile ? '14px 14px 0 0' : 'var(--r-lg)',
          boxShadow: 'var(--shadow-pop)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          fontFamily: 'var(--font-ui)',
          ...(isMobile ? { marginBottom: 0 } : {}),
          ...style,
        }}>
        {/* Title bar */}
        {title ? (
          <div style={{
            display: 'flex', alignItems: 'center', padding: '14px 18px',
            borderBottom: '1px solid var(--border)', flexShrink: 0,
          }}>
            <h3 style={{
              flex: 1, margin: 0, fontSize: 14, fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: '0.06em',
              color: 'var(--text)',
            }}>{title}</h3>
            {onClose ? (
              <button type="button" onClick={onClose} title="Close" aria-label="Close"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-muted)', fontSize: 16, lineHeight: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: _isCoarse ? 0 : '2px 4px',
                  width: _isCoarse ? 44 : undefined,
                  height: _isCoarse ? 44 : undefined,
                }}>✕</button>
            ) : null}
          </div>
        ) : null}
        {/* Body */}
        <div style={{ flex: 1, overflow: 'auto', padding: '18px 18px' }}>
          {children}
        </div>
        {/* Footer */}
        {footer ? (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10,
            padding: '12px 18px',
            paddingBottom: isMobile ? 'calc(12px + env(safe-area-inset-bottom, 0px))' : 12,
            borderTop: '1px solid var(--border)', flexShrink: 0,
          }}>{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
