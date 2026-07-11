/* ═══════════════════════════════════════════════════════════════════════
   @fairground-co/core — LOOKBOOK (composition shell)

   The theme catalog / specimen page, assembled from separately-maintained
   section modules in lookbook/sections/ (DECISIONS #31). Each module
   exports `meta` ({ id, title, visibility, sources, enabled? }) and a
   `SectionBody`; this shell filters by render flavor and composes them:

     PUBLIC STUB  (default)     — public modules only. Lives in the theme
                                  repo → GitHub Pages: tokens, components,
                                  the theme's icon library, explanatory
                                  annotation. "Half the story", on purpose.
     COMPLETE     (--complete)  — adds the private modules (voice,
                                  foundations, brand marks) + licensed
                                  fonts. Lives in the brand-assets repo
                                  (private) — the canonical review surface.

   Config comes from window.__LOOKBOOK__, injected by
   scripts/build-lookbook.mjs.
   ═══════════════════════════════════════════════════════════════════════ */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { CONTRACT_VERSION } from '../src/tokens.js';
import { SegmentedControl } from '../components/forms/SegmentedControl.jsx';
import { EpochContext, LB, BRAND, COMPLETE } from './scaffold.jsx';

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

function App() {
  const [brandOn, setBrandOn] = React.useState(!!BRAND);
  const [mode, setMode] = React.useState(document.documentElement.getAttribute('data-theme') || 'light');
  const [densityStop, setDensityStop] = React.useState('comfortable');
  const [epoch, setEpoch] = React.useState(0);

  React.useEffect(() => {
    const el = document.documentElement;
    if (BRAND && brandOn) el.setAttribute('data-brand', BRAND);
    else el.removeAttribute('data-brand');
    el.setAttribute('data-theme', mode);
    if (densityStop === 'compact') el.setAttribute('data-density', 'compact');
    else el.removeAttribute('data-density');
    setEpoch((e) => e + 1); // re-resolve every live token readout
  }, [brandOn, mode, densityStop]);

  const modules = activeModules();

  return (
    <EpochContext.Provider value={epoch}>
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-base)' }}>
        <div style={{ position: 'sticky', top: 0, zIndex: 40, background: 'var(--surface)', borderBottom: 'var(--border-w-std) solid var(--border)', boxShadow: 'var(--shadow-header)' }}>
          <div style={{ maxWidth: 1060, margin: '0 auto', padding: 'var(--space-4) var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
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
              <SegmentedControl options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} value={mode} onChange={setMode} />
              <SegmentedControl options={[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }]} value={densityStop} onChange={setDensityStop} />
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1060, margin: '0 auto', padding: 'var(--space-7) var(--space-6) var(--space-10)' }}>
          {LB.note && (
            <div style={{ border: 'var(--border-w-std) solid var(--status-caution)', background: 'var(--status-caution-soft)', color: 'var(--text)', borderRadius: 'var(--r-sm)', padding: 'var(--space-5) var(--space-6)', marginBottom: 'var(--space-7)', fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-normal)' }}>
              {LB.note}
            </div>
          )}
          <nav style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
            {modules.map(({ meta }) => (
              <a key={meta.id} href={`#${meta.id}`} style={{ color: 'var(--scope-view)', textDecoration: 'none', fontSize: 'var(--fs-sm)', padding: '4px 10px', border: 'var(--border-w-hair) solid var(--border)', borderRadius: 'var(--r-pill)', background: 'var(--surface)' }}>{meta.title}</a>
            ))}
          </nav>

          {modules.map((m) => <m.SectionBody key={m.meta.id} density={densityStop} />)}

          <div style={{ borderTop: 'var(--border-w-hair) solid var(--border)', paddingTop: 'var(--space-6)', fontSize: 'var(--fs-xs)', color: 'var(--text-faint)', lineHeight: 'var(--lh-normal)' }}>
            {COMPLETE
              ? 'COMPLETE render (private): includes strategic guidance, licensed type, and brand marks — the canonical review surface. The public stub in the theme repo carries the token/component half of this page.'
              : 'Public render: the machine-consumable facet. The complete brand book (guidance, licensed type, marks) lives in the private brand-assets repo.'}
            {' '}Generated by @fairground-co/core scripts/build-lookbook.mjs from the section modules in packages/core/lookbook/sections/ — every swatch and value is read live from the CSS custom properties.
          </div>
        </div>
      </div>
    </EpochContext.Provider>
  );
}

createRoot(document.getElementById('lookbook-root')).render(<App />);
