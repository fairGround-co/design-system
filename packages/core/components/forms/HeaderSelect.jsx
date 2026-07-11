import React from 'react';

const _canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

/**
 * HeaderSelect — a dropdown that does double duty as a page label. It reads
 * as inline header text (inherits the H1's font/size/weight), distinguished
 * only by a view-scope underline + accent chevron (switching pages is a view
 * operation). The open menu is a theme-matched panel with larger options; an
 * optgroup renders as an accent divider. This is how navigation lives inside
 * the header.
 *
 * Pass plain options, or grouped options ({ label, options }) to get group
 * dividers. Option labels ending in "↗" render an external-link icon.
 */
export function HeaderSelect({ value, onChange, options = [], title, color = 'var(--commit)', style }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  // Normalize: flat list of {value,label,external,disabled} + group separators
  const rows = [];
  options.forEach((o) => {
    if (o.options) {
      rows.push({ sep: o.label });
      o.options.forEach((c) => rows.push(c));
    } else { rows.push(o); }
  });
  const clean = (l) => String(l || '').replace(/\s*↗\s*$/, '').trim();
  const isExt = (l) => /↗\s*$/.test(l || '');
  const selected = rows.find((r) => !r.sep && r.value === value);

  const ExtIco = (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
      <path d="M14 4h6v6" /><path d="M20 4l-8.5 8.5" />
      <path d="M18 13.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5.5" />
    </svg>
  );

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-block', ...style }}>
      <button type="button" title={title}
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        style={{
          background: 'transparent', border: 'none', borderBottom: '2px solid var(--scope-view)',
          borderRadius: 0, color: color, font: 'inherit', letterSpacing: 'inherit',
          textTransform: 'inherit', lineHeight: 1, padding: '0 20px 1px 0',
          cursor: 'pointer', position: 'relative',
        }}>
        {clean(selected ? selected.label : '')}
        <span style={{ position: 'absolute', right: 2, top: '50%', transform: 'translateY(-50%)',
          color: 'var(--accent)', fontSize: '0.62em' }} aria-hidden="true">▾</span>
      </button>
      {open && (
        <div role="menu" style={{
          position: 'absolute', left: 0, top: 'calc(100% + 5px)', zIndex: 600, minWidth: '100%',
          maxHeight: '70vh', overflowY: 'auto', background: 'var(--surface)',
          border: '1px solid var(--border)', borderRadius: 'var(--r-lg)',
          boxShadow: 'var(--shadow-pop)', padding: 5,
        }}>
          {rows.map((r, i) => r.sep ? (
            <div key={'s' + i} style={{
              margin: '6px 4px 4px', paddingTop: 8, borderTop: '2px solid var(--accent-2)',
              fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}>{r.sep}</div>
          ) : (
            <button key={r.value} type="button" role="menuitem" disabled={r.disabled}
              onClick={(e) => { e.stopPropagation(); setOpen(false); onChange && onChange(r.value); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, width: '100%', whiteSpace: 'nowrap',
                textAlign: 'left', background: 'none', border: 'none',
                color: r.value === value ? 'var(--accent)' : 'var(--text)',
                fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: r.value === value ? 700 : 400,
                padding: '9px 12px', borderRadius: 'var(--r-sm)',
                cursor: r.disabled ? 'default' : 'pointer', opacity: r.disabled ? 0.4 : 1,
              }}
              onMouseEnter={_canHover ? (e) => { if (!r.disabled) e.currentTarget.style.background = 'var(--surface-2)'; } : undefined}
              onMouseLeave={_canHover ? (e) => { e.currentTarget.style.background = 'none'; } : undefined}>
              <span style={{ flex: 1 }}>{clean(r.label)}</span>
              {isExt(r.label) ? ExtIco : null}
            </button>
          ))}
        </div>
      )}
    </span>
  );
}
