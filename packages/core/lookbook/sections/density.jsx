/* Density axis — scoped remap demo. The toggle here is LOCAL (DECISIONS
   #31 viewer refinement): density remaps on any [data-density] scope, so
   the card demonstrates exactly that — the rest of the page stays put. */
import React from 'react';
import { DENSITY_TOKENS } from '../../src/tokens.js';
import { Section, Card, DensityScope, useEpoch } from '../scaffold.jsx';

export const meta = {
  id: 'density',
  title: 'Density',
  visibility: 'public',
  sources: ['contract'],
};

function DensityTable({ wrapRef }) {
  useEpoch();
  const [vals, setVals] = React.useState({});
  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const s = getComputedStyle(el);
    setVals(Object.fromEntries(DENSITY_TOKENS.map((t) => [t, s.getPropertyValue(t).trim()])));
  });
  return (
    <table style={{ borderCollapse: 'collapse', fontSize: 'var(--font-size-data)' }} className="fg-tnum">
      <thead>
        <tr>{['token', 'resolved in this scope'].map((h) => <th key={h} style={{ textAlign: 'left', padding: 'var(--cell-pad-y) var(--cell-pad-x)', borderBottom: 'var(--border-w-std) solid var(--border-strong)', textTransform: 'uppercase', letterSpacing: 'var(--ls-label)', fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {DENSITY_TOKENS.map((t) => (
          <tr key={t}>
            <td style={{ padding: 'var(--cell-pad-y) var(--cell-pad-x)', borderBottom: 'var(--border-w-hair) solid var(--border)', fontFamily: 'var(--font-mono)' }}>{t}</td>
            <td style={{ padding: 'var(--cell-pad-y) var(--cell-pad-x)', borderBottom: 'var(--border-w-hair) solid var(--border)', fontFamily: 'var(--font-mono)' }}>{vals[t] || ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function SectionBody() {
  return (
    <Section meta={meta}
      lead="One axis, two stops — remap [data-density=compact] on ANY scope, not just the page root. The toggle below scopes to this card alone; the rest of the page is untouched. Interactive targets never shrink below --touch-min (44px) on coarse pointers.">
      <Card title="Scoped remap — live values" note="The table itself is density-styled: rows tighten and the data font steps down as you toggle.">
        <DensityScope>
          {({ wrapRef }) => <DensityTable wrapRef={wrapRef} />}
        </DensityScope>
      </Card>
    </Section>
  );
}
