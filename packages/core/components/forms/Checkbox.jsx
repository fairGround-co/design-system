import React from 'react';

const _isCoarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/**
 * Checkbox — a custom-styled checkbox with label. The native checkbox is
 * visually hidden; a styled span renders the box in the view-scope color
 * when checked (checking a box is a view/selection operation). Matches the
 * FilterMenu's inline checkbox pattern but extracted as a standalone
 * component for form use.
 *
 * `indeterminate` renders a horizontal dash instead of a check — useful for
 * "select all" controls where some children are checked.
 */
export function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  label,
  disabled = false,
  id,
  name,
  style,
}) {
  const on = checked || indeterminate;

  return (
    <label style={{
      display: 'inline-flex', alignItems: 'center', gap: 9,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 'var(--opacity-disabled)' : 1,
      fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--text)',
      userSelect: 'none', minHeight: _isCoarse ? 44 : undefined, ...style,
    }}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        id={id}
        name={name}
        onChange={(e) => onChange && onChange(e.target.checked, e)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <span aria-hidden="true" style={{
        width: 18, height: 18, flexShrink: 0, borderRadius: 4,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: on ? 'var(--scope-view)' : 'transparent',
        border: '1.5px solid ' + (on ? 'var(--scope-view)' : 'var(--border-strong)'),
        color: 'var(--on-accent)',
        transition: 'background var(--dur-fast) var(--ease-ui), border-color var(--dur-fast) var(--ease-ui)',
      }}>
        {checked && !indeterminate ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12.5l5 5L20 6.5" />
          </svg>
        ) : indeterminate ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
          </svg>
        ) : null}
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
