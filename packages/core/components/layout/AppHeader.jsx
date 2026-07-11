import React from 'react';
import { HeaderSelect } from '../forms/HeaderSelect.jsx';

/**
 * AppHeader — the single shared bar across every tool in the suite. Surface
 * background, a 3px accent bottom rule, and an uppercase extrabold H1 on the
 * left whose four color roles are configured here, in ONE place, so every page
 * renders the identical header:
 *
 *   • year   — the dynamic/informational part (default --scope-view)
 *   • name   — the static wordmark (default --text, inverts per theme)
 *   • select — the inline HeaderSelect that IS the navigation (default --commit,
 *              the data/context-changing signal)
 *   • clock  — absolutely-centered live clock (default --text-muted)
 *
 * Pass the structured props (year / name / select / clock) to get the canonical
 * header. `title` and `center` remain as escape hatches that override the
 * built-in title / clock when a page needs something bespoke. The `right` slot
 * holds status text / actions. Header shadow is a theme-level flourish
 * (--shadow-header; the reference theme keeps it flat).
 *
 * Navigation lives IN the header — there is no separate nav bar.
 */
export function AppHeader({
  year, yearColor = 'var(--scope-view)',
  name = '', nameColor = 'var(--text)',
  select, selectColor = 'var(--commit)',
  clock, clockColor = 'var(--text-muted)',
  title, center, right, style,
}) {
  const builtTitle = title ?? (
    <>
      {year != null && year !== '' ? <span style={{ color: yearColor }}>{year}</span> : null}
      {name ? <span style={{ color: nameColor }}>{name}</span> : null}
      {select ? (
        <HeaderSelect value={select.value} onChange={select.onChange}
          options={select.options} title={select.title} color={selectColor} />
      ) : null}
    </>
  );
  const builtCenter = center ?? (clock != null && clock !== '' ? (
    <span style={{ color: clockColor, fontVariantNumeric: 'tabular-nums', fontWeight: 700, fontSize: 18 }}>{clock}</span>
  ) : null);

  return (
    <header style={{
      background: 'var(--surface)', borderBottom: '3px solid var(--accent)',
      padding: '9px 16px', display: 'flex', alignItems: 'center', gap: 12,
      flexShrink: 0, boxShadow: 'var(--shadow-header)', position: 'relative',
      fontFamily: 'var(--font-ui)', ...style,
    }}>
      <a href="#main-content" style={{
        position: 'absolute', left: -9999, top: 'auto', width: 1, height: 1,
        overflow: 'hidden', zIndex: 1000,
        padding: '8px 16px', background: 'var(--accent)', color: 'var(--on-accent)',
        fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 800,
        borderRadius: 'var(--r-sm)', textDecoration: 'none',
      }} onFocus={(e) => { e.currentTarget.style.cssText += 'position:relative;left:0;width:auto;height:auto;overflow:visible;'; }}
         onBlur={(e) => { e.currentTarget.style.cssText += 'position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;'; }}
      >Skip to main content</a>
      <h1 style={{
        display: 'flex', alignItems: 'center', gap: '0.3em', margin: 0,
        fontFamily: 'var(--font-display)',
        fontSize: 22, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
        color: 'var(--text)', minWidth: 0, whiteSpace: 'nowrap',
      }}>{builtTitle}</h1>
      {builtCenter ? (
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>{builtCenter}</div>
      ) : null}
      {right ? <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>{right}</div> : null}
    </header>
  );
}
