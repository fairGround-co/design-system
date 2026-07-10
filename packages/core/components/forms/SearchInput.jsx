import React from 'react';

const _isCoarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/**
 * SearchInput — the list-filter search box used at the top of a list pane.
 * Surface-2 fill, card border, accent focus ring, and a clear (✕) button that
 * appears once there's a value.
 */
export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = 'Search…',
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ position: 'relative', ...style }}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', boxSizing: 'border-box', padding: '10px 32px 10px 12px',
          background: 'var(--surface-2)',
          border: '1.5px solid ' + (focused ? 'var(--accent)' : 'var(--border)'),
          outline: focused ? '2px solid var(--accent)' : 'none',
          borderRadius: 'var(--r-sm)', color: 'var(--text)',
          fontSize: 15, fontFamily: 'var(--font-ui)',
        }}
        {...rest}
      />
      {value ? (
        <button type="button" title="Clear" aria-label="Clear search"
          onClick={() => { onChange && onChange(''); onClear && onClear(); }}
          style={{
            position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
            fontSize: 16, lineHeight: 1, padding: '2px 4px',
            width: _isCoarse ? 44 : undefined, height: _isCoarse ? 44 : undefined,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
      ) : null}
    </div>
  );
}
