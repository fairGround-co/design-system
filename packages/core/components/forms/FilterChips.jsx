import React from 'react';
import { Icon } from '../icons/Icon.jsx';
import { Badge } from '../core/Badge.jsx';

const _isCoarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/**
 * FilterChips — multi-select status filter. Each chip is an independent on/off
 * facet; the value is the array of selected values. The modeling rule that
 * makes this honest:
 *
 *   NONE selected  =  no filter applied  =  everything shown.
 *
 * So there is no dedicated "All" option — "all" is the cleared/default state.
 * That removes the impossible "both off → nothing" state a single-select tab
 * strip suffers, and it scales: a new status is just one more chip.
 *
 * Each chip renders as the status **Badge**: an active chip lights up in its
 * own semantic *tone* (the tinted, lighter treatment), an inactive one falls
 * back to the neutral ghost. The tint is deliberate — it reads as "status,"
 * distinct from solid categorical color chips used for section identity, so
 * status-filtering never gets confused with section color.
 *
 * The leading funnel doubles as a CLEAR-ALL action — when any filter is active
 * it lights up in the view-scope color (filtering is a view operation) and
 * clearing it (one tap) returns to show-all without un-checking each chip.
 * When nothing is selected it sits muted as a plain "this is a filter" marker.
 */
export function FilterChips({ options = [], value = [], onChange, style, stretch = false, compact = false }) {
  const sel = new Set(value);
  const active = sel.size > 0;

  const toggle = (v) => {
    const next = new Set(sel);
    if (next.has(v)) next.delete(v); else next.add(v);
    onChange && onChange([...next]);
  };
  const clear = () => { if (active) onChange && onChange([]); };

  return (
    <div role="group" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-ui)', ...style }}>
      <button type="button" onClick={clear} disabled={!active}
        title={active ? 'Clear filters — show all' : 'Filter by status'}
        aria-label={active ? 'Clear filters' : 'Filter by status'}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'none', border: 'none', padding: 4, borderRadius: 'var(--r-sm)',
          cursor: active ? 'pointer' : 'default',
          color: active ? 'var(--scope-view)' : 'var(--text-faint)',
          transition: 'color var(--dur-fast)',
        }}>
        <Icon name="filter" size={18} color="currentColor" />
      </button>
      {options.map((o) => {
        const on = sel.has(o.value);
        return (
          <Badge key={o.value} tone={on ? (o.tone || 'info') : 'neutral'}
            role="button" aria-pressed={on} title={o.title || o.label}
            onClick={() => toggle(o.value)}
            style={{
              cursor: 'pointer', userSelect: 'none',
              opacity: on ? 1 : 0.7,
              flex: stretch ? '1 1 0' : undefined,
              justifyContent: 'center', minWidth: 0,
              minHeight: _isCoarse ? 44 : undefined,
              transition: 'opacity var(--dur-fast), background var(--dur-fast), color var(--dur-fast), border-color var(--dur-fast)',
            }}>
            {o.icon ? <Icon name={o.icon} size={15} color="currentColor" /> : null}
            {compact ? null : o.label}
          </Badge>
        );
      })}
    </div>
  );
}
