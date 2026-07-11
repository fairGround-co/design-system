/* ═══════════════════════════════════════════════════════════════════════
   @fairground-co/core — LOOKBOOK (composition shell)

   The theme catalog / specimen page, assembled from separately-maintained
   section modules in lookbook/sections/ (DECISIONS #31). Each module
   exports `meta` ({ id, title, visibility, sources, enabled? }) and a
   `SectionBody`; this shell filters by render flavor and composes them:

     PUBLIC STUB  (default)     — public modules only. Lives in the theme
                                  repo → GitHub Pages.
     COMPLETE     (--complete)  — adds the private modules + licensed
                                  fonts. Lives in the brand-assets repo
                                  (private) — the canonical review surface.

   VIEWER CONTROLS (master, in the sticky toolbar):
     brand ⇄ neutral            — when a brand theme is inlined
     Light | Dark | Side-by-side — side-by-side renders the catalog twice
                                  in two theme-scoped frames
     Desktop | Tablet | Phone   — viewport frames (768 / 375px); with
                                  side-by-side, two separate device frames
                                  render next to each other, never columns
                                  squeezed inside one device
   Density is NOT a master control — density-sensitive cards carry their
   own scoped toggle (DensityScope), which doubles as a live demo of the
   contract's remap-on-any-scope behavior.

   Config comes from window.__LOOKBOOK__, injected by
   scripts/build-lookbook.mjs.
   ═══════════════════════════════════════════════════════════════════════ */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { CONTRACT_VERSION } from '../src/tokens.js';
import { SegmentedControl } from '../components/forms/SegmentedControl.jsx';
import { Notice } from '../components/feedback/Notice.jsx';
import { EpochContext, ScopeContext, NavContext, LB, BRAND, COMPLETE } from './scaffold.jsx';

import * as voice from './sections/voice.jsx';
import * as foundations from './sections/foundations.jsx';
import * as brandMarks from './sections/brand-marks.jsx';
import * as surfaces from './sections/surfaces.jsx';
import * as action from './sections/action.jsx';
import * as categorical from './sections/categorical.jsx';
import * as selection from './sections/selection.jsx';
import * as typography from './sections/typography.jsx';
import * as geometry from './sections/geometry.jsx';
import * as density from './sections/density.jsx';
import * as dataviz from './sections/dataviz.jsx';
import * as buttons from './sections/buttons.jsx';
import * as forms from './sections/forms.jsx';
import * as selectors from './sections/selectors.jsx';
import * as feedback from './sections/feedback.jsx';
import * as layout from './sections/layout.jsx';
import * as icons from './sections/icons.jsx';
import * as tenant from './sections/tenant.jsx';

/* Order = page order. Guidance leads (who the brand is), then the token
   system, then the primitives, then assets and plumbing. */
const MODULES = [
  voice, foundations, brandMarks,
  surfaces, action, categorical, selection, typography, geometry, density,
  dataviz, buttons, forms, selectors, feedback, layout, icons, tenant,
];

function activeModules() {
  return MODULES.filter((m) =>
    (m.meta.visibility === 'public' || COMPLETE) &&
    (!m.meta.enabled || m.meta.enabled()));
}

const FRAME_WIDTHS = { tablet: 768, phone: 375 };

/** One theme-scoped render of the whole catalog. data-theme AND data-brand
    ride the SAME element — brand dark blocks are compound selectors
    ([data-brand="x"][data-theme="dark"]), so splitting the attributes
    across elements would silently skip the brand's dark values. */
function ThemeFrame({ theme, brandOn, viewport, suffix, label, modules }) {
  const elRef = React.useRef(null);
  const device = viewport !== 'desktop';
  const attrs = { 'data-theme': theme };
  if (BRAND && brandOn) attrs['data-brand'] = BRAND;
  return (
    <div style={{ minWidth: 0, flex: device ? 'none' : '1 1 0' }}>
      {label && (
        <div style={{
          textAlign: 'center', font: '600 11px system-ui, sans-serif',
          letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.55,
          marginBottom: 8,
        }}>{label}</div>
      )}
      <div ref={elRef} {...attrs} style={{
        background: 'var(--bg)', color: 'var(--text)',
        fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-base)',
        width: device ? FRAME_WIDTHS[viewport] : 'auto',
        maxWidth: '100%',
        border: device ? 'var(--border-w-std) solid var(--border-strong)' : 'none',
        borderRadius: device ? 'var(--r-lg)' : 0,
        // clip, not auto/hidden: a scroll container would break the sticky
        // section headers inside the frame.
        overflow: 'clip',
      }}>
        <ScopeContext.Provider value={{ elRef, suffix }}>
          <div style={{ padding: device ? 'var(--space-6) var(--space-5)' : 'var(--space-7) var(--space-6)', minHeight: device ? 'auto' : '60vh' }}>
            {modules.map((m) => <m.SectionBody key={m.meta.id} />)}
          </div>
        </ScopeContext.Provider>
      </div>
    </div>
  );
}

function App() {
  const [brandOn, setBrandOn] = React.useState(!!BRAND);
  const [themeMode, setThemeMode] = React.useState(document.documentElement.getAttribute('data-theme') || 'light');
  const [viewport, setViewport] = React.useState('desktop');
  const [epoch, setEpoch] = React.useState(0);
  const toolbarRef = React.useRef(null);

  // Publish the toolbar height so sticky section headers park right
  // under it (and jump targets scroll-margin past both).
  React.useEffect(() => {
    const el = toolbarRef.current;
    if (!el) return;
    const set = () => document.documentElement.style.setProperty('--lb-sticky-top', el.offsetHeight + 'px');
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    // The page root drives the toolbar/nav chrome; frames carry their own
    // theme scopes. In side-by-side the root stays light.
    const el = document.documentElement;
    if (BRAND && brandOn) el.setAttribute('data-brand', BRAND);
    else el.removeAttribute('data-brand');
    el.setAttribute('data-theme', themeMode === 'both' ? 'light' : themeMode);
    setEpoch((e) => e + 1); // re-resolve every live token readout
  }, [brandOn, themeMode, viewport]);

  const modules = activeModules();
  const navList = modules.map((m) => ({ value: m.meta.id, label: m.meta.title }));
  const themes = themeMode === 'both' ? ['light', 'dark'] : [themeMode];
  const device = viewport !== 'desktop';
  const single = themes.length === 1;

  return (
    <EpochContext.Provider value={epoch}>
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-base)' }}>
        <div ref={toolbarRef} style={{ position: 'sticky', top: 0, zIndex: 40, background: 'var(--surface)', borderBottom: 'var(--border-w-std) solid var(--border)', boxShadow: 'var(--shadow-header)' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', padding: 'var(--space-4) var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontWeight: 'var(--fw-extrabold)', textTransform: 'uppercase', letterSpacing: 'var(--ls-label)', fontSize: 'var(--fs-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <span><span style={{ color: 'var(--scope-view)' }}>{LB.title || 'fairGround core'}</span> <span>{COMPLETE ? 'brand book' : 'lookbook'}</span></span>
                {COMPLETE && (
                  <span style={{
                    font: 'var(--fw-semibold) var(--fs-2xs)/1 var(--font-mono)',
                    letterSpacing: 'var(--ls-eyebrow)', color: 'var(--status-caution-ink)',
                    border: 'var(--border-w-hair) solid var(--status-caution)',
                    borderRadius: 'var(--r-pill)', padding: '3px 8px',
                  }}>COMPLETE · PRIVATE</span>
                )}
              </div>
              <div className="fg-tnum" style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {LB.packageLine || ''}{LB.packageLine ? ' · ' : ''}contract v{CONTRACT_VERSION}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', flexWrap: 'wrap', marginLeft: 'auto' }}>
              {BRAND && (
                <SegmentedControl options={[{ value: 'on', label: LB.title || BRAND }, { value: 'off', label: 'neutral reference' }]}
                  value={brandOn ? 'on' : 'off'} onChange={(v) => setBrandOn(v === 'on')} />
              )}
              <SegmentedControl options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }, { value: 'both', label: 'Side-by-side' }]}
                value={themeMode} onChange={setThemeMode} />
              <SegmentedControl options={[{ value: 'desktop', label: 'Desktop' }, { value: 'tablet', label: 'Tablet' }, { value: 'phone', label: 'Phone' }]}
                value={viewport} onChange={setViewport} />
            </div>
          </div>
        </div>

        <div style={{ maxWidth: single && !device ? 1060 : 'none', margin: '0 auto', padding: 'var(--space-7) var(--space-6) 0' }}>
          <div style={{ maxWidth: 1060, margin: '0 auto' }}>
            {LB.note && (
              <Notice tone="caution" title={COMPLETE ? 'Review note' : undefined} style={{ marginBottom: 'var(--space-7)' }}>
                {LB.note}
              </Notice>
            )}
            {device && (
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-faint)', marginBottom: 'var(--space-6)', lineHeight: 'var(--lh-snug)' }}>
                Simulated {viewport} width ({FRAME_WIDTHS[viewport]}px). Width-driven layout is faithful; behaviors keyed to the real
                window (bottom-sheet dialogs, coarse-pointer touch targets) still follow your actual browser — verify those on a device.
              </div>
            )}
          </div>
        </div>

        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: device ? 'var(--space-7)' : 'var(--space-6)',
          alignItems: 'flex-start',
          maxWidth: single && !device ? 1060 : (device ? 'none' : 2200),
          margin: '0 auto', padding: '0 var(--space-6)',
        }}>
          <NavContext.Provider value={navList}>
            {themes.map((t, i) => (
              <ThemeFrame key={`${t}-${viewport}-${brandOn}`} theme={t} brandOn={brandOn} viewport={viewport}
                suffix={i === 0 ? '' : '-b'} label={single ? null : t.toUpperCase()} modules={modules} />
            ))}
          </NavContext.Provider>
        </div>

        <div style={{ maxWidth: 1060, margin: '0 auto', padding: 'var(--space-8) var(--space-6) var(--space-10)' }}>
          <div style={{ borderTop: 'var(--border-w-hair) solid var(--border)', paddingTop: 'var(--space-6)', fontSize: 'var(--fs-xs)', color: 'var(--text-faint)', lineHeight: 'var(--lh-normal)' }}>
            {COMPLETE
              ? 'COMPLETE render (private): includes strategic guidance, licensed type, and brand marks — the canonical review surface. The public stub in the theme repo carries the token/component half of this page.'
              : 'Public render: the machine-consumable facet. The complete brand book (guidance, licensed type, marks) lives in the private brand-assets repo.'}
            {' '}Generated by @fairground-co/core scripts/build-lookbook.mjs from the section modules in packages/core/lookbook/sections/ — every swatch and value is read live from the CSS custom properties, per theme frame.
          </div>
        </div>
      </div>
    </EpochContext.Provider>
  );
}

createRoot(document.getElementById('lookbook-root')).render(<App />);
