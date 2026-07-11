import React from 'react';
import { useTrackDrag } from './useTrackDrag.js';
import { Icon } from '../icons/Icon.jsx';

/**
 * StatusSelector — a single-select status control where each segment carries
 * its own semantic color. Set the value by TAPPING a segment or SWIPING across
 * the track (pointer-capture drag) — both gestures resolve to the segment under
 * the pointer. The selected segment shows its full color; unselected segments
 * show a translucent wash of the same hue, so the whole control reads as a
 * status spectrum rather than a generic toggle.
 *
 * Distinct from SegmentedControl on purpose: that one is click-only, single
 * accent, arbitrary option list (and supports a progressive scale). This one is
 * for a small, color-coded *status* domain you set by feel.
 *
 * `options` defaults to a neutral done / pending / blocked set expressed in
 * status tokens, but is fully overridable — pass any 2–N states with their
 * colors (domain status sets live app-side).
 */

const DEFAULT_STATUSES = [
  { value: 'done',    label: 'Done',    icon: 'check',   color: 'var(--status-success)', fg: 'var(--on-accent)' },
  /* fg literal: ink on a caution/gold fill must stay dark in every theme —
     var(--text) flips light in dark mode and fails contrast on the fill.   */
  { value: 'pending', label: 'Pending', icon: 'pending', color: 'var(--status-caution)', fg: '#1c2126' },
  { value: 'blocked', label: 'Blocked', icon: 'cancel',  color: 'var(--status-danger)',  fg: 'var(--on-accent)' },
];

export function StatusSelector({
  value,
  onChange,
  options = DEFAULT_STATUSES,
  style,
}) {
  const selIdx = options.findIndex((o) => o.value === value);

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

  const drag = useTrackDrag(options.length, (i) => {
    const next = options[i].value;
    if (next !== value) onChange && onChange(next);
  });

  return (
    <div {...drag}
      role="radiogroup" onKeyDown={handleKeyDown}
      style={{
        display: 'flex', borderRadius: 'var(--r-md)', overflow: 'hidden',
        cursor: 'pointer',
        border: '1px solid var(--border-strong)', fontFamily: 'var(--font-ui)',
        ...drag.style, ...style,
      }}>
      {options.map((o, i) => {
        const on = o.value === value;
        return (
          <div key={i}
            role="radio" aria-checked={on} aria-label={o.label}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '10px 4px',
              fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap',
              background: on ? o.color : 'color-mix(in oklab, ' + o.color + ', transparent 90%)',
              color: on ? (o.fg || 'var(--on-accent)') : 'var(--text-faint)',
              borderLeft: i === 0 ? 'none' : '1px solid var(--border-strong)',
              transition: 'background var(--dur-fast), color var(--dur-fast)',
            }}>{o.icon ? <Icon name={o.icon} size={15} color="currentColor" title={o.label} /> : null}{o.label}</div>
        );
      })}
    </div>
  );
}
