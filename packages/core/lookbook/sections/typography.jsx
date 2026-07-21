/* Typography — family roles, size ramp, weights, casing.
   In the COMPLETE render (brand-assets), licensed brand faces are loaded
   via the inlined @font-face rules, so the family-role specimens show the
   true brand type; the public stub falls back to system stacks by design. */
import React from 'react';
import { Section, Card, useEpoch, rawValue, BRAND, COMPLETE } from '../scaffold.jsx';

export const meta = {
  id: 'type',
  title: 'Typography',
  visibility: 'public',
  sources: ['contract', 'theme'],
};

export function SectionBody() {
  useEpoch();
  const fams = ['--font-ui', '--font-display', '--font-editorial', '--font-mono'];
  const sizes = ['2xs', 'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl'];
  const fontNote = COMPLETE
    ? 'Complete render: licensed brand faces are loaded from the private brand-assets package — the specimens below are the true brand type.'
    : (BRAND ? 'Public render: brand faces fall back to system stacks by design (font FILES ship only via the private brand-assets package; the field tools boot webfont-free anyway).' : null);
  return (
    <Section meta={meta}
      lead={`Families are theme values; font FILES ship only via the private brand-assets package. Numbers are mono + tabular (.fg-tnum) wherever data aligns.${fontNote ? ' ' + fontNote : ''}`}>
      <Card title="Family roles">
        {fams.map((t) => (
          <div key={t} style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 'var(--space-4)' }}>
            <code style={{ font: '500 var(--fs-xs)/1 var(--font-mono)', color: 'var(--text-muted)', width: 130, flex: 'none' }}>{t}</code>
            <span style={{ fontFamily: `var(${t})`, fontSize: 'var(--fs-lg)' }}>
              {t === '--font-mono' ? '0123456789 · 40×28 · 12:00:00' : 'Joyful but organized, quick brown fox'}
            </span>
          </div>
        ))}
        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-faint)' }}>{rawValue('--font-display') === rawValue('--font-ui') ? '--font-display aliases --font-ui in the neutral reference.' : ''}</div>
      </Card>
      <Card title="Size ramp · weights · casing">
        {sizes.map((s) => (
          <div key={s} style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 'var(--space-2)' }}>
            <code className="fg-tnum" style={{ font: '500 var(--fs-xs)/1 var(--font-mono)', color: 'var(--text-muted)', width: 130, flex: 'none' }}>--fs-{s} · {rawValue(`--fs-${s}`)}</code>
            <span style={{ fontSize: `var(--fs-${s})`, lineHeight: 'var(--lh-tight)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Parade lineup ready</span>
          </div>
        ))}
        <div style={{ marginTop: 'var(--space-6)', display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'baseline' }}>
          {['book', 'medium', 'semibold', 'bold', 'extrabold', 'black'].map((w) => (
            <span key={w} style={{ fontWeight: `var(--fw-${w})` }}>{w}</span>
          ))}
          <span style={{ textTransform: 'uppercase', letterSpacing: 'var(--ls-label)', fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-extrabold)' }}>Uppercase headers, tracked</span>
          <span style={{ textTransform: 'uppercase', letterSpacing: 'var(--ls-eyebrow)', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Eyebrow tracking</span>
        </div>
      </Card>
      {COMPLETE && (
        <Card title="Brand faces — editorial & display specimens"
          note="Rendered from the licensed files (private package). If these read as system fonts, the @font-face inlining failed — flag it.">
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-2xl)', fontWeight: 'var(--fw-bold)', lineHeight: 'var(--lh-tight)', marginBottom: 'var(--space-5)' }}>
            Display: headline presence
          </div>
          <div style={{ fontFamily: 'var(--font-editorial)', fontSize: 'var(--fs-lg)', lineHeight: 'var(--lh-relaxed)', maxWidth: 560 }}>
            Editorial: long-form warmth — pull quotes, mission copy, letters. The
            quick brown fox jumps over the lazy dog, 1234567890.
          </div>
        </Card>
      )}
    </Section>
  );
}
