import React from 'react';
import { Icon } from '../icons/Icon.jsx';

const _isCoarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/**
 * TextInput — the standard text input for forms and dialogs. Distinct from
 * SearchInput (which is a filter control with a clear button and search
 * semantics). This is the everyday "type a value" field.
 *
 * surface-2 fill, card border, accent focus ring. Optional leading icon,
 * error state (danger border + message), and disabled state (token opacity).
 * Sizes match Button: sm (32px), md (40px), lg (52px).
 */
export function TextInput({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  size = 'md',
  icon = null,
  error = false,
  disabled = false,
  readOnly = false,
  autoFocus = false,
  name,
  id,
  style,
  inputStyle,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const sizes = {
    sm: { padding: _isCoarse ? '10px 10px' : '6px 10px', fontSize: 13, height: _isCoarse ? 44 : 32 },
    md: { padding: '9px 12px', fontSize: 15, height: 40 },
    lg: { padding: '14px 18px', fontSize: 20, height: 52 },
  };
  const s = sizes[size] || sizes.md;
  const borderColor = error ? 'var(--status-danger)' : focused ? 'var(--accent)' : 'var(--border)';

  return (
    <div style={{
      position: 'relative', display: 'flex', alignItems: 'center',
      background: disabled ? 'var(--surface-3)' : 'var(--surface-2)',
      border: '1.5px solid ' + borderColor,
      borderRadius: 'var(--r-sm)',
      outline: focused && !error ? '2px solid var(--accent)' : 'none',
      outlineOffset: -1,
      opacity: disabled ? 'var(--opacity-disabled)' : 1,
      transition: 'border-color var(--dur-fast) var(--ease-ui), outline var(--dur-fast) var(--ease-ui)',
      ...style,
    }}>
      {icon ? (
        <span style={{ display: 'flex', alignItems: 'center', paddingLeft: 10, color: 'var(--text-muted)', flexShrink: 0 }}>
          <Icon name={icon} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
        </span>
      ) : null}
      <input
        type={type}
        value={value}
        name={name}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        autoFocus={autoFocus}
        onChange={(e) => onChange && onChange(e.target.value, e)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1, width: '100%', boxSizing: 'border-box',
          padding: s.padding,
          paddingLeft: icon ? 6 : undefined,
          background: 'transparent', border: 'none', outline: 'none',
          color: 'var(--text)', fontSize: s.fontSize,
          fontFamily: 'var(--font-ui)', minHeight: s.height,
          ...inputStyle,
        }}
        {...rest}
      />
    </div>
  );
}
