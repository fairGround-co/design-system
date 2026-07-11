import React from 'react';
import { useTrackDrag } from './useTrackDrag.js';

/**
 * SegmentedControl — the system's workhorse selector.
 *
 * Two shapes:
 *  • "tabs"     → flush filter buttons with an accent edge marker (list
 *                 filters). Edge is top or bottom via `edge`.
 *  • "enclosed" → a bordered, rounded pill group (e.g. an escalating
 *                 announcement scale).
 *
 * Active/selected cues use the view-scope color — a segmented filter is a
 * view operation, not a data change.
 *
 * `progressive` makes it an escalating cumulative scale: selecting a later
 * option keeps every earlier one lit too (index ≤ selected).
 *
 * Options may be icon-only (emoji) — always pass `title` for the tooltip.
 */
export function SegmentedControl({
  options = [],
  value,
  onChange,
  variant = 'enclosed',
  edge = 'bottom',
  progressive = false,
  style,
}) {
  const selIdx = options.findIndex((o) => o.value === value);
  const drag = useTrackDrag(options.length, (i) => onChange && onChange(options[i].value));

  const handleKeyDown = (e) => {
    const len = options.length;
    if (!len) return;
    let idx = selIdx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); idx = (idx + 1) % len; }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); idx = (idx - 1 + len) % len; }
    else if (e.key === 'Home') { e.preventDefault(); idx = 0; }
    else if (e.key === 'End') { e.preventDefault(); idx = len - 1; }
    else return;
    onChange && onChange(options[idx].value);
  };

  if (variant === 'tabs') {
    return (
      <div style={{ display: 'flex', fontFamily: 'var(--font-ui)', ...style }} onKeyDown={handleKeyDown} role="tablist">
        {options.map((o) => {
          const active = o.value === value;
          const edgeProp = edge === 'top' ? 'borderTop' : 'borderBottom';
          return (
            <button key={o.value} type="button" title={o.title || o.label}
              onClick={() => onChange && onChange(o.value)}
              style={{
                flex: 1, padding: '10px 6px', fontSize: 16, cursor: 'pointer',
                background: active ? 'var(--surface-2)' : 'transparent',
                border: 'none', [edgeProp]: 'var(--border-w-accent) solid ' + (active ? 'var(--scope-view)' : 'transparent'),
                color: active ? 'var(--text)' : 'var(--text-muted)',
                fontFamily: 'inherit', transition: 'background var(--dur-instant), border-color var(--dur-instant)',
              }}>
              {o.icon ? <span aria-hidden="true">{o.icon}</span> : o.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div {...drag}
      role="radiogroup" onKeyDown={handleKeyDown}
      style={{
      display: 'flex', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)',
      overflow: 'hidden', fontFamily: 'var(--font-ui)', cursor: 'pointer', ...drag.style, ...style,
    }}>
      {options.map((o, i) => {
        const on = progressive ? (selIdx >= 0 && i <= selIdx) : o.value === value;
        return (
          <button key={o.value} type="button" title={o.title || o.label}
            onClick={() => onChange && onChange(o.value)}
            style={{
              flex: 1, padding: '12px 8px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              whiteSpace: 'nowrap',
              background: on ? 'var(--scope-view)' : 'var(--surface-2)',
              color: on ? 'var(--on-accent)' : 'var(--text-muted)',
              border: 'none', borderLeft: i === 0 ? 'none' : '1px solid var(--border)',
              fontFamily: 'inherit', transition: 'background var(--dur-instant)',
            }}>
            {o.icon ? <span aria-hidden="true" style={{ marginRight: o.label ? 6 : 0 }}>{o.icon}</span> : null}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
