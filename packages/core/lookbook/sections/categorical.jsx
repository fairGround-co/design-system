/* Categorical palette — 12 identity slots + derivations. */
import React from 'react';
import { CAT_SLOTS } from '../../src/tokens.js';
import { Badge } from '../../components/core/Badge.jsx';
import { Section, Card, Flow, VariantStrip } from '../scaffold.jsx';

export const meta = {
  id: 'categorical',
  title: 'Categorical palette',
  visibility: 'public',
  sources: ['contract', 'theme'],
};

export function SectionBody() {
  return (
    <Section meta={meta}
      lead="Discrete identities (zones, types, series) — never UI accents. Slots 1–8 are the default assignment order; 9–12 extend reach. Slate can read as neutral gray; lime has weak color-blind separation — use last. Domain names live app-side, aliased onto slots.">
      <Card title="12 slots × base / soft / deep / bright">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 'var(--space-5)' }}>
          {Array.from({ length: CAT_SLOTS }, (_, i) => <VariantStrip key={i} base={`--cat-${i + 1}`} />)}
        </div>
      </Card>
      <Card title="As identity chips">
        <Flow>
          {Array.from({ length: CAT_SLOTS }, (_, i) => <Badge key={i} cat={i + 1}>Slot {i + 1}</Badge>)}
        </Flow>
      </Card>
    </Section>
  );
}
