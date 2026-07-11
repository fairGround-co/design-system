/* Dataviz namespace — series, ramps, planned-vs-actual paths. */
import React from 'react';
import { Section, Card, Flow, TokenChip } from '../scaffold.jsx';

export const meta = {
  id: 'dataviz',
  title: 'Dataviz',
  visibility: 'public',
  sources: ['contract', 'theme'],
};

export function SectionBody() {
  return (
    <Section meta={meta}
      lead="Series default to the categorical slots; sequential ramps derive from --accent; planned-vs-actual paths split drift into behind (alarm) and ahead (calm positive — good news must not read as an alarm).">
      <Card title="Series 1–12">
        <Flow gap={2}>
          {Array.from({ length: 12 }, (_, i) => <div key={i} title={`--viz-series-${i + 1}`} style={{ width: 34, height: 22, borderRadius: 3, background: `var(--viz-series-${i + 1})` }} />)}
        </Flow>
      </Card>
      <Flow gap={6} align="stretch">
        <Card title="Sequential ramp" style={{ flex: '1 1 240px', marginBottom: 0 }}>
          <div style={{ display: 'flex', borderRadius: 'var(--r-sm)', overflow: 'hidden' }}>
            {Array.from({ length: 7 }, (_, i) => <div key={i} title={`--viz-seq-${i + 1}`} style={{ flex: 1, height: 30, background: `var(--viz-seq-${i + 1})` }} />)}
          </div>
        </Card>
        <Card title="Diverging anchors" style={{ flex: '1 1 240px', marginBottom: 0 }}>
          <div style={{ display: 'flex', borderRadius: 'var(--r-sm)', overflow: 'hidden' }}>
            {['neg', 'mid', 'pos'].map((k) => <div key={k} title={`--viz-div-${k}`} style={{ flex: 1, height: 30, background: `var(--viz-div-${k})` }} />)}
          </div>
        </Card>
        <Card title="Planned vs actual + drift" style={{ flex: '2 1 320px', marginBottom: 0 }}>
          <svg viewBox="0 0 320 90" style={{ width: '100%', maxWidth: 420, display: 'block' }} aria-label="Planned vs actual drift sample">
            <path d="M10 70 L90 55 L170 45 L310 20" fill="none" stroke="var(--path-planned)" strokeWidth="2" strokeDasharray="6 5" />
            <path d="M10 70 L90 60 L170 62 L230 50" fill="none" stroke="var(--path-actual)" strokeWidth="2.5" />
            <path d="M90 55 L170 45 L170 62 L90 60 Z" fill="var(--path-drift-behind)" opacity="0.25" />
            <path d="M170 45 L230 33 L230 50 L170 62 Z" fill="var(--path-drift-behind)" opacity="0.25" />
            <text x="240" y="30" fontSize="10" fill="var(--viz-axis-ink)" fontFamily="var(--font-mono)">planned</text>
            <text x="238" y="55" fontSize="10" fill="var(--path-actual)" fontFamily="var(--font-mono)">actual</text>
          </svg>
          <Flow gap={4}>
            <TokenChip token="--path-drift-behind" text="behind plan" />
            <TokenChip token="--path-drift-ahead" text="ahead of plan" />
          </Flow>
        </Card>
      </Flow>
    </Section>
  );
}
