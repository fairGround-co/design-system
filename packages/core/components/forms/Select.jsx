import React from 'react';

const _isCoarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/**
 * Select — a boxed dropdown for in-form use. Distinct from HeaderSelect (which
 * is an inline header-text dropdown for navigation). This is the everyday
 * "pick from a list" control that sits inside a form alongside TextInput,
 * Textarea, and Checkbox.
 *
 * Uses a native <select> under a styled wrapper for accessibility and mobile
 * OS picker support. The custom chevron replaces the browser default.
 *
 * Options: [{ value, label, disabled? }] or plain strings.
 */
export function Select({
  value,
  onChange,
  options = [],
  placeholder,
  size = 'md',
  error = false,
  disabled = false,
  name,
  id,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const sizes = {
    sm: { padding: _isCoarse ? '10px 28px 10px 10px' : '6px 28px 6px 10px', fontSize: 13, height: _isCoarse ? 44 : 32 },
    md: { padding: '9px 32px 9px 12px', fontSize: 15, height: 40 },
    lg: { padding: '12px 36px 12px 16px', fontSize: 18, height: 52 },
  };
  const s = sizes[size] || sizes.md;
  const borderColor = error ? 'var(--status-danger)' : focused ? 'var(--accent)' : 'var(--border)';

  const normalize = (o) => typeof o === 'string' ? { value: o, label: o } : o;

  return (
    <div style={{ position: 'relative', display: 'inline-flex', ...style }}>
      <select
        value={value}
        name={name}
        id={id}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.value, e)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', boxSizing: 'border-box',
          appearance: 'none', WebkitAppearance: 'none',
          padding: s.padding, minHeight: s.height,
          background: disabled ? 'var(--surface-3)' : 'var(--surface-2)',
          border: '1.5px solid ' + borderColor,
          borderRadius: 'var(--r-sm)',
          outline: focused && !error ? '2px solid var(--accent)' : 'none',
          outlineOffset: -1,
          color: value ? 'var(--text)' : 'var(--text-muted)',
          fontSize: s.fontSize, fontFamily: 'var(--font-ui)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 'var(--opacity-disabled)' : 1,
          transition: 'border-color var(--dur-fast) var(--ease-ui)',
        }}
        {...rest}
      >
        {placeholder ? <option value="" disabled>{placeholder}</option> : null}
        {options.map((o) => {
          const n = normalize(o);
          return <option key={n.value} value={n.value} disabled={n.disabled}>{n.label}</option>;
        })}
      </select>
      <span style={{
        position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
        pointerEvents: 'none', color: 'var(--scope-view)', fontSize: 11,
      }} aria-hidden="true">▾</span>
    </div>
  );
}
