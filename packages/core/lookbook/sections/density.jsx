/* Density axis — comfortable/compact live remap table. */
import React from 'react';
import { DENSITY_TOKENS } from '../../src/tokens.js';
import { Section, Card, useEpoch, rawValue } from '../scaffold.jsx';

export const meta = {
  id: 'density',
  title: 'Density',
  visibility: 'public',
  sources: ['contract'],
};

export function SectionBody({ density }) {
  useEpoch();
  return (
    <Section meta={meta}
      lead="One axis, two stops — remap [data-density=compact] on any scope. Interactive targets never shrink below --touch-min (44px) on coarse pointers.">
      <Card title={`Current: ${density}`} note="Toggle density in the toolbar above — the table below re-reads the live values.">
        <table style={{ borderCollapse: 'collapse', fontSize: 'var(--font-size-data)' }} className="fg-tnum">
          <thead>
            <tr>{['token', 'resolved now'].map((h) => <th key={h} style={{ textAlign: 'left', padding: 'var(--cell-pad-y) var(--cell-pad-x)', borderBottom: 'var(--border-w-std) solid var(--border-strong)', textTransform: 'uppercase', letterSpacing: 'var(--ls-label)', fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {DENSITY_TOKENS.map((t) => (
              <tr key={t}>
                <td style={{ padding: 'var(--cell-pad-y) var(--cell-pad-x)', borderBottom: 'var(--border-w-hair) solid var(--border)', fontFamily: 'var(--font-mono)' }}>{t}</td>
                <td style={{ padding: 'var(--cell-pad-y) var(--cell-pad-x)', borderBottom: 'var(--border-w-hair) solid var(--border)', fontFamily: 'var(--font-mono)' }}>{rawValue(t)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Section>
  );
}
