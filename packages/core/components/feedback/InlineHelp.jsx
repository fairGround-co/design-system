import React from 'react';
import { Icon } from '../icons/Icon.jsx';

const _canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
const _isCoarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/**
 * InlineHelp — a contextual help popover for users who need quick guidance.
 * Renders a small muted icon button; on click (not hover — touch-first
 * devices) it toggles a popover with the help text. Closes on outside click.
 *
 * Designed to sit inline next to a FormField label or a section header.
 */
export function InlineHelp({
  text,
  icon = 'info',
  placement = 'top',
  maxWidth = 240,
  style,
}) {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, [open]);

  const posStyles = {
    top:    { bottom: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)' },
    bottom: { top: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)' },
    left:   { right: 'calc(100% + 6px)', top: '50%', transform: 'translateY(-50%)' },
    right:  { left: 'calc(100% + 6px)', top: '50%', transform: 'translateY(-50%)' },
  };

  return (
    <span ref={wrapRef} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', ...style }}>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        aria-label="Help"
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: _isCoarse ? 44 : 18, height: _isCoarse ? 44 : 18, padding: 0,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-faint)',
          borderRadius: 'var(--r-pill)',
          transition: 'color var(--dur-fast) var(--ease-ui)',
        }}
        onMouseEnter={_canHover ? (e) => { e.currentTarget.style.color = 'var(--text-muted)'; } : undefined}
        onMouseLeave={_canHover ? (e) => { e.currentTarget.style.color = 'var(--text-faint)'; } : undefined}
      >
        <Icon name={icon} size={16} color="currentColor" />
      </button>
      {open ? (
        <div style={{
          position: 'absolute', zIndex: 30,
          ...posStyles[placement] || posStyles.top,
          width: maxWidth, maxWidth: maxWidth,
          padding: '10px 12px',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)',
          boxShadow: 'var(--shadow-pop)',
          fontSize: 12, lineHeight: 1.5, color: 'var(--text)',
          fontFamily: 'var(--font-ui)', fontWeight: 400,
        }}>
          {text}
        </div>
      ) : null}
    </span>
  );
}
