import React from 'react';
import { ConfirmDialog } from '../layout/ConfirmDialog.jsx';

const _canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
const _isCoarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/**
 * Button — the action primitive.
 *
 * Color carries meaning here, so pick the variant by what the click DOES:
 *  • commit  → var(--commit). Final / data-changing / destructive-ish
 *              actions. Use sparingly.
 *  • primary → var(--accent), the theme's dominant action color (themes flip
 *              which hue that is). Intermediate / navigational / "next".
 *              The everyday default.
 *  • neutral → surface + border. Secondary, cancel, low-emphasis.
 *  • ghost   → transparent, text-only.
 * Inherits theme via the nearest [data-theme] ancestor.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  icon = null,
  type = 'button',
  title,
  confirm,
  onClick,
  children,
  style,
  ...rest
}) {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const sizes = {
    sm: { padding: _isCoarse ? '10px 14px' : '6px 14px', fontSize: 13, height: _isCoarse ? 44 : 32, radius: 'var(--r-sm)' },
    md: { padding: '9px 20px', fontSize: 15, height: 40, radius: 'var(--r-md)' },
    lg: { padding: '12px 26px', fontSize: 18, height: 52, radius: 'var(--r-md)' },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    commit: { background: 'var(--commit)', color: 'var(--on-accent)', border: 'none' },
    primary: { background: 'var(--accent)', color: 'var(--on-accent)', border: 'none' },
    neutral: { background: 'var(--surface-2)', color: 'var(--text)', border: '1.5px solid var(--border)' },
    ghost: { background: 'transparent', color: 'var(--text-muted)', border: 'none' },
  };
  const v = variants[variant] || variants.primary;

  const handleClick = confirm ? (e) => {
    setConfirmOpen(true);
  } : onClick;

  const confirmProps = typeof confirm === 'string'
    ? { message: confirm, title: 'Are you sure?', variant: variant === 'commit' ? 'danger' : 'warning' }
    : confirm || {};

  return (
    <>
    <button
      type={type}
      title={title}
      disabled={disabled}
      onClick={handleClick}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        fontFamily: 'var(--font-ui)', fontWeight: 800, lineHeight: 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 'var(--opacity-disabled)' : 1,
        transition: 'opacity var(--dur-instant) var(--ease-ui), background var(--dur-instant) var(--ease-ui)',
        width: fullWidth ? '100%' : 'auto',
        padding: s.padding, fontSize: s.fontSize, minHeight: s.height, borderRadius: s.radius,
        ...v,
        ...style,
      }}
      onMouseEnter={_canHover ? (e) => { if (!disabled) e.currentTarget.style.opacity = '0.85'; } : undefined}
      onMouseLeave={_canHover ? (e) => { if (!disabled) e.currentTarget.style.opacity = '1'; } : undefined}
      {...rest}
    >
      {icon && <span style={{ display: 'inline-flex', fontSize: '1.1em' }} aria-hidden="true">{icon}</span>}
      {children}
    </button>
    {confirm ? (
      <ConfirmDialog
        open={confirmOpen}
        title={confirmProps.title || 'Are you sure?'}
        message={confirmProps.message}
        confirmLabel={confirmProps.confirmLabel || 'Confirm'}
        variant={confirmProps.variant || 'warning'}
        requireTyped={confirmProps.requireTyped}
        onConfirm={() => { setConfirmOpen(false); onClick && onClick(); }}
        onCancel={() => setConfirmOpen(false)}
      />
    ) : null}
    </>
  );
}
