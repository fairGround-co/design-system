import React from 'react';
import { Icon } from '../icons/Icon.jsx';

const SIZES = {
  sm: { trackW: 40, trackH: 22, thumb: 16, inset: 2, icon: 10, iconBtn: 32, iconSize: 15 },
  md: { trackW: 48, trackH: 26, thumb: 20, inset: 2, icon: 12, iconBtn: 38, iconSize: 17 },
};

function readInitial(persistKey) {
  if (typeof document === 'undefined') return 'light';
  if (persistKey) {
    try {
      const stored = window.localStorage.getItem(persistKey);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch { /* storage may be unavailable (private mode, SSR) — fall through */ }
  }
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return (typeof window !== 'undefined' && window.matchMedia
    && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
}

/**
 * ThemeToggle — the standard light/dark switcher, sized to drop into a
 * header strip or a user-profile menu with zero wiring.
 *
 * Controlled like every other input here (`value` + `onChange`) when you
 * own theme state yourself. Leave `value` out and it manages itself: reads
 * the current `[data-theme]`/system preference on mount, then on every
 * toggle writes `document.documentElement.setAttribute('data-theme', …)`
 * and persists to `localStorage` (key `persist`, default `"fg-theme"`;
 * pass `persist={false}` to skip storage, or a string for a custom key).
 * Uncontrolled mode is the "just drop it in a header" path; controlled mode
 * is for apps that already own theme state (e.g. a per-user server pref).
 *
 * Two variants:
 *  • "switch" (default) — a labeled pill switch with a sliding icon thumb;
 *    reads well inline in a profile dropdown row.
 *  • "icon"   — a compact icon-only button that cycles on click; sized for
 *    a header icon strip alongside AuthStatus/QRShare.
 *
 * The on-state (dark) uses --scope-view, matching Checkbox's precedent:
 * a display preference is a view operation, not a data-changing commit.
 */
export function ThemeToggle({
  value,
  onChange,
  defaultValue,
  variant = 'switch',
  size = 'md',
  persist = true,
  label,
  title,
  style,
}) {
  const controlled = value !== undefined;
  const persistKey = persist === false ? null : (typeof persist === 'string' ? persist : 'fg-theme');
  const [internal, setInternal] = React.useState(() => defaultValue || readInitial(persistKey));
  const theme = controlled ? value : internal;

  React.useEffect(() => {
    if (controlled) return; // parent owns the [data-theme] application
    document.documentElement.setAttribute('data-theme', internal);
    if (persistKey) {
      try { window.localStorage.setItem(persistKey, internal); } catch { /* ignore */ }
    }
  }, [internal, controlled, persistKey]);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    onChange && onChange(next);
    if (!controlled) setInternal(next);
  };

  const s = SIZES[size] || SIZES.md;
  const tip = title || (theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

  if (variant === 'icon') {
    return (
      <button
        type="button" role="switch" aria-checked={theme === 'dark'} title={tip}
        onClick={toggle}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: s.iconBtn, height: s.iconBtn, padding: 0, flexShrink: 0,
          borderRadius: 'var(--r-md)', border: 'var(--border-w-hair) solid var(--border)',
          background: 'var(--surface-2)', color: 'var(--text-muted)', cursor: 'pointer',
          transition: 'background var(--dur-fast) var(--ease-ui), color var(--dur-fast) var(--ease-ui)',
          ...style,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-3)'; e.currentTarget.style.color = 'var(--text)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
      >
        <Icon name={theme === 'dark' ? 'moon' : 'sun'} size={s.iconSize} />
      </button>
    );
  }

  const travel = s.trackW - s.thumb - s.inset * 2;
  return (
    <label style={{
      display: 'inline-flex', alignItems: 'center', gap: 9, cursor: 'pointer',
      fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-sm)', color: 'var(--text)',
      userSelect: 'none', ...style,
    }}>
      <span
        role="switch" aria-checked={theme === 'dark'} tabIndex={0} title={tip}
        onClick={toggle}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); } }}
        style={{
          position: 'relative', display: 'inline-flex', alignItems: 'center', flexShrink: 0,
          width: s.trackW, height: s.trackH, borderRadius: 'var(--r-pill)',
          background: theme === 'dark' ? 'var(--scope-view)' : 'var(--surface-2)',
          border: '1.5px solid ' + (theme === 'dark' ? 'var(--scope-view)' : 'var(--border-strong)'),
          transition: 'background var(--dur-fast) var(--ease-ui), border-color var(--dur-fast) var(--ease-ui)',
        }}
      >
        <span aria-hidden="true" style={{
          position: 'absolute', top: s.inset, left: s.inset,
          width: s.thumb, height: s.thumb, borderRadius: '50%',
          background: 'var(--surface)', boxShadow: 'var(--shadow-card)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)',
          transform: theme === 'dark' ? `translateX(${travel}px)` : 'translateX(0)',
          transition: 'transform var(--dur-fast) var(--ease-ui)',
        }}>
          <Icon name={theme === 'dark' ? 'moon' : 'sun'} size={s.icon} />
        </span>
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
