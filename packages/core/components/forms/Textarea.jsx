import React from 'react';

/**
 * Textarea — multiline text input for forms and dialogs. Same visual language
 * as TextInput (surface-2 fill, card border, accent focus ring, error state).
 * `rows` sets the visible line count; the field does NOT auto-resize — use a
 * fixed row count appropriate to the expected content.
 */
export function Textarea({
  value,
  onChange,
  placeholder = '',
  rows = 4,
  error = false,
  disabled = false,
  readOnly = false,
  name,
  id,
  maxLength,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const borderColor = error ? 'var(--status-danger)' : focused ? 'var(--accent)' : 'var(--border)';

  return (
    <div style={{ position: 'relative', ...style }}>
      <textarea
        value={value}
        name={name}
        id={id}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        onChange={(e) => onChange && onChange(e.target.value, e)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', boxSizing: 'border-box',
          padding: '10px 12px', resize: 'vertical',
          background: disabled ? 'var(--surface-3)' : 'var(--surface-2)',
          border: '1.5px solid ' + borderColor,
          borderRadius: 'var(--r-sm)',
          outline: focused && !error ? '2px solid var(--accent)' : 'none',
          outlineOffset: -1,
          color: 'var(--text)', fontSize: 15,
          fontFamily: 'var(--font-ui)', lineHeight: 1.5,
          opacity: disabled ? 'var(--opacity-disabled)' : 1,
          transition: 'border-color var(--dur-fast) var(--ease-ui)',
        }}
        {...rest}
      />
      {maxLength ? (
        <div style={{
          position: 'absolute', bottom: 6, right: 10,
          fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-ui)',
          fontVariantNumeric: 'tabular-nums',
        }}>{(value || '').length}/{maxLength}</div>
      ) : null}
    </div>
  );
}
