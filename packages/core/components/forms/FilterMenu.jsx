import React from 'react';
import { Icon } from '../icons/Icon.jsx';

const _canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
const _isCoarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/**
 * FilterMenu — a multi-select status filter that collapses into a dropdown
 * checkbox list. This is the "many statuses" sibling to FilterChips: when a
 * status domain grows past 3–4 facets (some run to nine or more), inline
 * chips overflow, so the filter becomes a count-summary button that opens a
 * checkbox panel.
 *
 * Each row carries an optional semantic color dot + label. The button
 * summarizes the selection — "All statuses", "N statuses", or the consumer's
 * `emptyLabel` when nothing is checked (blank by default). The panel closes on
 * outside click.
 *
 * SEMANTICS (deliberately NOT the same as FilterChips): the value is the
 * EXPLICIT set of shown statuses. All checked = everything; none checked =
 * nothing. There is no "empty = all" shortcut here, because with this many
 * facets an explicit set is what the operator expects.
 *
 *   value = ['checkedin','yes', …]   // exactly the statuses shown
 */
export function FilterMenu({
  options = [],
  value = [],
  onChange,
  noun = 'status',
  nounPlural,
  emptyLabel = null,
  style,
}) {
  const [open, setOpen] = React.useState(false);
  const [focusIdx, setFocusIdx] = React.useState(-1);
  const wrapRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const sel = new Set(value);
  const plural = nounPlural || noun + 'es';

  React.useEffect(() => {
    if (!open) return;
    setFocusIdx(-1);
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, [open]);

  // Keyboard navigation when dropdown is open
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (!wrapRef.current || !wrapRef.current.contains(document.activeElement) && !wrapRef.current.contains(e.target)) return;
      const len = options.length;
      if (!len) return;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusIdx((p) => Math.min(p + 1, len - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusIdx((p) => Math.max(p - 1, 0));
          break;
        case 'Home':
          e.preventDefault();
          setFocusIdx(0);
          break;
        case 'End':
          e.preventDefault();
          setFocusIdx(len - 1);
          break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          if (focusIdx >= 0 && focusIdx < len) toggle(options[focusIdx].value);
          break;
        case 'Escape':
          e.preventDefault();
          setOpen(false);
          break;
        case 'a':
        case 'A':
          e.preventDefault();
          setAll(true);
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          setAll(false);
          break;
        default:
          break;
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, focusIdx, options, value]);

  // Scroll focused item into view
  React.useEffect(() => {
    if (!open || focusIdx < 0 || !menuRef.current) return;
    const items = menuRef.current.querySelectorAll('[role="menuitemcheckbox"]');
    if (items[focusIdx]) items[focusIdx].focus();
  }, [focusIdx, open]);

  const toggle = (v) => {
    const next = new Set(sel);
    if (next.has(v)) next.delete(v); else next.add(v);
    onChange && onChange(options.filter((o) => next.has(o.value)).map((o) => o.value));
  };
  const setAll = (on) => onChange && onChange(on ? options.map((o) => o.value) : []);

  const n = sel.size, total = options.length;
  const none = n === 0;
  const summary = n === total ? 'All ' + plural : none ? (emptyLabel || '') : n + ' ' + (n === 1 ? noun : plural);

  const funnelColor = none ? 'var(--status-warning)' : n === total ? 'var(--text-faint)' : 'var(--scope-view)';

  return (
    <div ref={wrapRef} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8, flex: '0 0 auto', fontFamily: 'var(--font-ui)', ...style }}>
      <button type="button" onClick={() => setAll(n === total ? false : true)}
        title={n === total ? 'Clear all — start from an empty slate' : 'Show all — no filtering'}
        aria-label={n === total ? 'Clear all statuses' : 'Select all statuses'}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'none', border: 'none', padding: _isCoarse ? 10 : 4, borderRadius: 'var(--r-sm)', cursor: 'pointer',
          color: funnelColor,
          transition: 'color var(--dur-fast)',
        }}>
        <Icon name="filter" size={18} color="currentColor" />
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        aria-haspopup="true" aria-expanded={open}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
          background: 'var(--surface-2)',
          border: '1px solid var(--border-strong)',
          color: 'var(--text)',
          fontFamily: 'inherit', fontSize: 13, fontWeight: 700, padding: '8px 11px',
          borderRadius: 'var(--r-sm)', cursor: 'pointer',
        }}>
        {summary}
        <span aria-hidden="true" style={{ color: 'var(--scope-view)', fontSize: 11 }}>▾</span>
      </button>
      {open && (
        <div ref={menuRef} role="menu" style={{
          position: 'absolute', left: 30, top: 'calc(100% + 4px)', width: 200, maxHeight: 280, overflowY: 'auto',
          background: 'var(--surface)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)',
          boxShadow: 'var(--shadow-pop)', zIndex: 20, padding: 4,
        }}>
          {options.map((o, idx) => {
            const on = sel.has(o.value);
            const focused = idx === focusIdx;
            return (
              <div key={o.value} role="menuitemcheckbox" aria-checked={on} tabIndex={-1}
                onClick={() => toggle(o.value)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 9, padding: _isCoarse ? '10px 8px' : '6px 8px',
                  fontSize: 13, color: 'var(--text)', cursor: 'pointer', borderRadius: 'var(--r-sm)',
                  minHeight: _isCoarse ? 44 : undefined,
                  background: focused ? 'var(--surface-2)' : 'transparent',
                  outline: focused ? '2px solid var(--accent)' : 'none',
                  outlineOffset: -1,
                }}
                onMouseEnter={_canHover ? () => setFocusIdx(idx) : undefined}
                onMouseLeave={_canHover ? () => { if (focusIdx === idx) setFocusIdx(-1); } : undefined}>
                <span aria-hidden="true" style={{
                  width: 16, height: 16, flexShrink: 0, borderRadius: 4, display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center',
                  background: on ? 'var(--scope-view)' : 'transparent',
                  border: '1.5px solid ' + (on ? 'var(--scope-view)' : 'var(--border-strong)'),
                  color: 'var(--on-accent)', transition: 'background var(--dur-fast), border-color var(--dur-fast)',
                }}>
                  {on ? (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5L20 6.5" /></svg>
                  ) : null}
                </span>
                {o.icon
                  ? <Icon name={o.icon} size={15} color={o.color || 'var(--text-muted)'} style={{ flexShrink: 0 }} />
                  : (o.color ? <span style={{ width: 11, height: 11, borderRadius: '50%', background: o.color, flexShrink: 0 }} /> : null)}
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
