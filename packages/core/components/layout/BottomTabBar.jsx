import React from 'react';
import { Icon } from '../icons/Icon.jsx';

/**
 * BottomTabBar — the mobile single-pane navigation bar. On screens ≤760px the
 * multi-pane desktop layout collapses to one pane at a time, switched by this
 * bottom tab bar. Each tab is an icon + short label; the active tab uses the
 * accent color; inactive tabs are muted.
 *
 * Tabs: [{ value, label, icon }]. `icon` is a glyph name from the Icon
 * registry. The bar sits fixed at the bottom of the viewport (position: fixed
 * by default; override with `position` prop for in-flow use in specimens).
 *
 * Touch targets are ≥44px tall (the --touch-min token). The bar has a top
 * border matching the header's bottom rule, and a surface background.
 */
export function BottomTabBar({
  tabs = [],
  value,
  onChange,
  position = 'fixed',
  style,
}) {
  return (
    <nav style={{
      position: position, bottom: 0, left: 0, right: 0, zIndex: 500,
      display: 'flex', alignItems: 'stretch',
      background: 'var(--surface)', borderTop: '1.5px solid var(--border)',
      boxShadow: '0 -2px 8px rgba(0,0,0,0.08)',
      fontFamily: 'var(--font-ui)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      ...style,
    }}>
      {tabs.map((tab) => {
        const active = tab.value === value;
        return (
          <button key={tab.value} type="button" title={tab.label}
            onClick={() => onChange && onChange(tab.value)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 2,
              minHeight: 52, padding: '6px 4px 8px',
              background: 'none', border: 'none', borderTop: '3px solid ' + (active ? 'var(--accent)' : 'transparent'),
              cursor: 'pointer',
              color: active ? 'var(--accent)' : 'var(--text-muted)',
              transition: 'color var(--dur-fast) var(--ease-ui), border-color var(--dur-fast) var(--ease-ui)',
            }}>
            <Icon name={tab.icon} size={22} color="currentColor" />
            <span style={{
              fontSize: 10, fontWeight: 800, letterSpacing: '0.04em',
              textTransform: 'uppercase', lineHeight: 1,
            }}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
