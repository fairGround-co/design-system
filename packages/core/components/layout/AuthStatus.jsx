import React from 'react';

const _canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

/**
 * AuthStatus — the sign-in / guest-mode status indicator *and* activator,
 * built as ONE segmented pill (the split-button / segmented-selector language):
 * a badge-style left half (status dot + label) fused to a solid right cap that
 * is the activator.
 *
 * Color is the capability-scope signal (contract §3.3):
 *   • guest  → --scope-guest. Unauthenticated / limited. The right half is a
 *     full "Sign in" action cap wearing --commit (signing in is what *enables
 *     change*, so the action wears the data-changing color).
 *   • viewer → --scope-view. Signed in, read-only in this area — the SAFE
 *     mode. The right half shrinks to a small solid caret that opens an
 *     account menu.
 *   • editor → --scope-edit. Signed in with write access — stands out from
 *     the rest of the scheme so you know you're somewhere you can change
 *     data. Same small solid caret + account menu.
 *
 * Mount once in the shell header; drive the module's write controls (publish,
 * record edits) off the same `scope`.
 */
export function AuthStatus({
  scope = 'guest',
  user = null,
  guestLabel = 'Guest',
  signInLabel = 'Sign in',
  onSignIn,
  onSignOut,
  onSwitchAccount,
  compact = false,
  style,
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    if (!menuOpen) return;
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setMenuOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onDoc); document.removeEventListener('keydown', onKey); };
  }, [menuOpen]);

  // `color` signals the STATE; `capColor` fills the solid activator cap
  // (guest's cap is the sign-in ACTION, so it wears --commit).
  const cfg = {
    guest:  { color: 'var(--scope-guest)', capColor: 'var(--commit)',     onSolid: 'var(--on-accent)', label: guestLabel },
    viewer: { color: 'var(--scope-view)',  capColor: 'var(--scope-view)', onSolid: 'var(--on-accent)', label: user || 'Signed in · view' },
    editor: { color: 'var(--scope-edit)',  capColor: 'var(--scope-edit)', onSolid: 'var(--on-accent)', label: user || 'Editor' },
  }[scope] || { color: 'var(--scope-guest)', capColor: 'var(--commit)', onSolid: 'var(--on-accent)', label: guestLabel };

  const dot = (
    <span aria-hidden="true" style={{
      width: 9, height: 9, borderRadius: '50%', flexShrink: 0, background: cfg.color,
      boxShadow: '0 0 0 3px color-mix(in oklab, ' + cfg.color + ', transparent 78%)',
    }} />
  );

  // Shared pill shell: bordered, pill-radius, overflow-clipped so the segments
  // read as one control. Border tints toward the state color.
  const shell = {
    display: 'inline-flex', alignItems: 'stretch', overflow: 'hidden',
    borderRadius: 'var(--r-pill)', background: 'var(--surface-2)',
    border: '1.5px solid color-mix(in oklab, ' + cfg.color + ', var(--border) 45%)',
    fontFamily: 'var(--font-ui)',
  };

  // Left badge half — status dot + label.
  const badge = (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: compact ? '6px 8px 6px 11px' : '6px 12px' }}>
      {dot}
      {!compact && (
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.03em', color: 'var(--text)', whiteSpace: 'nowrap', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis' }}>{cfg.label}</span>
      )}
    </span>
  );

  // Guest — the right half is a full solid "Sign in" action.
  if (scope === 'guest') {
    return (
      <span style={{ ...shell, ...style }}>
        {badge}
        <button type="button" onClick={onSignIn} title="Sign in to unlock editing"
          style={{
            display: 'inline-flex', alignItems: 'center', padding: '0 16px', border: 'none',
            borderLeft: '1.5px solid color-mix(in oklab, ' + cfg.color + ', var(--border) 45%)',
            background: cfg.capColor, color: cfg.onSolid, fontFamily: 'inherit', fontSize: 12,
            fontWeight: 800, letterSpacing: '0.04em', cursor: 'pointer',
            transition: 'opacity var(--dur-instant)',
          }}
          onMouseEnter={_canHover ? (e) => { e.currentTarget.style.opacity = '0.85'; } : undefined}
          onMouseLeave={_canHover ? (e) => { e.currentTarget.style.opacity = '1'; } : undefined}>
          {signInLabel}
        </button>
      </span>
    );
  }

  // Signed in — the right half is a small solid caret cap opening an account menu.
  const menuItems = [
    onSwitchAccount && { label: 'Change user', onClick: onSwitchAccount },
    onSignOut && { label: 'Sign out', onClick: onSignOut, danger: true },
  ].filter(Boolean);

  return (
    <span ref={wrapRef} style={{ position: 'relative', display: 'inline-flex', fontFamily: 'var(--font-ui)', ...style }}>
      <span style={shell}>
        {badge}
        {menuItems.length ? (
          <button type="button" aria-haspopup="true" aria-expanded={menuOpen} title="Account"
            onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 9px', border: 'none',
              borderLeft: '1.5px solid color-mix(in oklab, ' + cfg.color + ', var(--border) 45%)',
              background: cfg.capColor, color: cfg.onSolid, cursor: 'pointer', fontSize: 11, lineHeight: 1,
              transition: 'opacity var(--dur-instant)',
            }}
            onMouseEnter={_canHover ? (e) => { e.currentTarget.style.opacity = '0.85'; } : undefined}
            onMouseLeave={_canHover ? (e) => { e.currentTarget.style.opacity = '1'; } : undefined}>
            <span aria-hidden="true" style={{ fontWeight: 900 }}>▾</span>
          </button>
        ) : null}
      </span>
      {menuOpen && menuItems.length ? (
        <div role="menu" style={{
          position: 'absolute', top: 'calc(100% + 4px)', right: 0, minWidth: 170,
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
          boxShadow: 'var(--shadow-pop)', zIndex: 50, overflow: 'hidden',
        }}>
          {scope === 'viewer' && (
            <div style={{ padding: '9px 14px 4px', fontSize: 10, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
              Read-only in this area
            </div>
          )}
          {scope === 'editor' && (
            <div style={{ padding: '9px 14px 4px', fontSize: 10, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'color-mix(in oklab, var(--scope-edit), var(--text-muted) 30%)' }}>
              Editing enabled — take care
            </div>
          )}
          {menuItems.map((it, i) => (
            <button key={i} type="button" role="menuitem" onClick={() => { setMenuOpen(false); it.onClick && it.onClick(); }}
              style={{
                display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none',
                color: it.danger ? 'var(--status-danger-ink)' : 'var(--text)', fontSize: 13, fontFamily: 'var(--font-ui)',
                padding: '9px 14px', cursor: 'pointer', whiteSpace: 'nowrap',
              }}
              onMouseEnter={_canHover ? (e) => { e.currentTarget.style.background = 'var(--surface-2)'; } : undefined}
              onMouseLeave={_canHover ? (e) => { e.currentTarget.style.background = 'none'; } : undefined}>
              {it.label}
            </button>
          ))}
        </div>
      ) : null}
    </span>
  );
}
