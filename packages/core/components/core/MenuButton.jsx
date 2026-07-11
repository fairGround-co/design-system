import React from 'react';

const _canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
const _isCoarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/**
 * MenuButton — an action button that drops a menu of options. The toolbar
 * pattern: **Download ▾** (a plain menu button — the label opens the list)
 * and **Publish ▾** (a split button — the main label commits the default
 * action, a divided caret opens alternate options).
 *
 * Variant carries meaning, same as Button: `commit` (var(--commit),
 * final/publish), `primary` (var(--accent), the everyday/download default),
 * `neutral`, `ghost`.
 *
 * Modes:
 *   • split = false (default) — one button; clicking it opens the menu.
 *   • split = true — a primary segment (fires `onClick`) + a caret segment
 *     (opens the menu). Use when there's a sensible default action plus options.
 *
 * `items`: [{ label, onClick, disabled?, title?, danger? }]. The menu is a
 * dark-shadowed popup (r-md), right-aligned under the button, closing on
 * outside click or Escape.
 */
export function MenuButton({
  children,
  items = [],
  variant = 'primary',
  size = 'md',
  split = false,
  onClick,                // split-mode primary action
  disabled = false,
  align = 'right',
  title,
  menuMinWidth = 220,
  style,
}) {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const sizes = {
    sm: { padding: _isCoarse ? '10px 14px' : '6px 14px', fontSize: 13, height: _isCoarse ? 44 : 32 },
    md: { padding: '9px 20px', fontSize: 15, height: 40 },
    lg: { padding: '12px 26px', fontSize: 18, height: 52 },
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    commit: { background: 'var(--commit)', color: 'var(--on-accent)', border: 'none' },
    primary: { background: 'var(--accent)', color: 'var(--on-accent)', border: 'none' },
    neutral: { background: 'var(--surface-2)', color: 'var(--text)', border: '1.5px solid var(--border)' },
    ghost: { background: 'transparent', color: 'var(--text-muted)', border: 'none' },
  };
  const v = variants[variant] || variants.primary;
  const radius = size === 'sm' ? 'var(--r-sm)' : 'var(--r-md)';

  const baseBtn = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
    fontFamily: 'var(--font-ui)', fontWeight: 800, lineHeight: 1,
    fontSize: s.fontSize, minHeight: s.height, ...v,
    cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 'var(--opacity-disabled)' : 1,
    transition: 'opacity var(--dur-instant) var(--ease-ui)',
  };
  const hoverOn = _canHover ? (e) => { if (!disabled) e.currentTarget.style.opacity = '0.85'; } : undefined;
  const hoverOff = _canHover ? (e) => { if (!disabled) e.currentTarget.style.opacity = '1'; } : undefined;

  const caret = <span aria-hidden="true" style={{ fontSize: '0.8em', opacity: 0.95 }}>▾</span>;

  const menu = open ? (
    <div role="menu" style={{
      position: 'absolute', top: 'calc(100% + 4px)', [align]: 0, minWidth: menuMinWidth,
      background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
      boxShadow: 'var(--shadow-pop)', zIndex: 50, overflow: 'hidden', fontFamily: 'var(--font-ui)',
    }}>
      {items.map((it, i) => (
        <button key={i} type="button" role="menuitem" title={it.title} disabled={it.disabled}
          onClick={() => { if (it.disabled) return; setOpen(false); it.onClick && it.onClick(); }}
          style={{
            display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none',
            color: it.danger ? 'var(--status-danger-ink)' : 'var(--text)', fontSize: 13, fontFamily: 'inherit',
            padding: _isCoarse ? '12px 14px' : '9px 14px', cursor: it.disabled ? 'not-allowed' : 'pointer',
            opacity: it.disabled ? 'var(--opacity-disabled)' : 1, whiteSpace: 'nowrap',
          }}
          onMouseEnter={_canHover ? (e) => { if (!it.disabled) e.currentTarget.style.background = 'var(--surface-2)'; } : undefined}
          onMouseLeave={_canHover ? (e) => { e.currentTarget.style.background = 'none'; } : undefined}>
          {it.label}
        </button>
      ))}
    </div>
  ) : null;

  if (split) {
    return (
      <span ref={wrapRef} style={{ position: 'relative', display: 'inline-flex', fontFamily: 'var(--font-ui)', ...style }}>
        <button type="button" title={title} disabled={disabled} onClick={onClick}
          onMouseEnter={hoverOn} onMouseLeave={hoverOff}
          style={{ ...baseBtn, padding: s.padding, borderRadius: `${radius} 0 0 ${radius}` }}>
          {children}
        </button>
        <button type="button" title="More options" aria-haspopup="true" aria-expanded={open} disabled={disabled}
          onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
          onMouseEnter={hoverOn} onMouseLeave={hoverOff}
          style={{
            ...baseBtn, padding: '0 10px', borderRadius: `0 ${radius} ${radius} 0`,
            borderLeft: v.border && v.border !== 'none' ? v.border : '1px solid rgba(0,0,0,0.25)',
          }}>
          {caret}
        </button>
        {menu}
      </span>
    );
  }

  return (
    <span ref={wrapRef} style={{ position: 'relative', display: 'inline-flex', fontFamily: 'var(--font-ui)', ...style }}>
      <button type="button" title={title} disabled={disabled} aria-haspopup="true" aria-expanded={open}
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
        onMouseEnter={hoverOn} onMouseLeave={hoverOff}
        style={{ ...baseBtn, padding: s.padding, borderRadius: radius }}>
        {children}{caret}
      </button>
      {menu}
    </span>
  );
}
