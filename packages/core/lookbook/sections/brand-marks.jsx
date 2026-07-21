/* Brand marks — logos, lockups, launcher marks (DECISIONS #29/#31:
   private brand facet; trademark-restricted files live only in the
   brand-assets repo, so this section renders only in the complete
   lookbook where those files are reachable). */
import React from 'react';
import { Section, Card, Flow, LB } from '../scaffold.jsx';

export const meta = {
  id: 'brand-marks',
  title: 'Brand marks',
  visibility: 'private',
  sources: ['brandAssets'],
  enabled: () => Array.isArray(LB.logos) && LB.logos.length > 0,
};

function MarkTile({ name, src, onDark }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: 150, height: 96, display: 'grid', placeItems: 'center',
        background: onDark ? '#131313' : 'var(--surface)',
        border: 'var(--border-w-hair) solid var(--border)', borderRadius: 'var(--r-sm)',
        padding: 'var(--space-4)',
      }}>
        <img src={src} alt={name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
      <code style={{ fontSize: 'var(--fs-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{name}</code>
    </div>
  );
}

export function SectionBody() {
  const logos = LB.logos || [];
  return (
    <Section meta={meta}
      lead="Trademark-restricted marks — never in public repos or packages. Division apps wear their own division's mark; the parent-org mark belongs on info/about/legal screens. Each mark is shown on light and dark surface.">
      <Card title={`${logos.length} marks (from the private package)`}>
        <Flow gap={6} align="flex-start">
          {logos.map((l) => <MarkTile key={l.name} name={l.name} src={l.src} />)}
        </Flow>
        <div style={{ marginTop: 'var(--space-6)' }}>
          <Flow gap={6} align="flex-start">
            {logos.slice(0, 4).map((l) => <MarkTile key={l.name + '-dark'} name={l.name} src={l.src} onDark />)}
          </Flow>
        </div>
      </Card>
    </Section>
  );
}
