/* Space · radius · elevation · motion. */
import React from 'react';
import { SPACE_TOKENS, RADIUS_TOKENS, MOTION_TOKENS } from '../../src/tokens.js';
import { Section, Card, Flow, useEpoch, rawValue } from '../scaffold.jsx';

export const meta = {
  id: 'geometry',
  title: 'Space · radius · elevation · motion',
  visibility: 'public',
  sources: ['contract'],
};

export function SectionBody() {
  useEpoch();
  return (
    <Section meta={meta}>
      <Card title="Spacing scale (4px base, dense)">
        <Flow gap={4} align="flex-end">
          {SPACE_TOKENS.map((t) => (
            <div key={t} style={{ textAlign: 'center' }}>
              <div style={{ width: 22, height: `max(${rawValue(t) || '0px'}, 1px)`, background: 'var(--accent)', borderRadius: 2, margin: '0 auto' }} />
              <code className="fg-tnum" style={{ fontSize: 'var(--fs-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{t.replace('--space-', '')}</code>
            </div>
          ))}
        </Flow>
      </Card>
      <Flow gap={6} align="stretch">
        <Card title="Radius" style={{ flex: '1 1 240px', marginBottom: 0 }}>
          <Flow>
            {RADIUS_TOKENS.map((t) => (
              <div key={t} style={{ textAlign: 'center' }}>
                <div style={{ width: 64, height: 44, background: 'var(--surface-2)', border: 'var(--border-w-std) solid var(--border-strong)', borderRadius: `var(${t})` }} />
                <code style={{ fontSize: 'var(--fs-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{t}</code>
              </div>
            ))}
          </Flow>
        </Card>
        <Card title="Elevation — border first, shadow additive" style={{ flex: '1 1 300px', marginBottom: 0 }}
          note="--shadow-card may be zeroed by dark themes; --shadow-pop is always on for floating layers.">
          <Flow gap={6}>
            <div style={{ width: 120, height: 64, borderRadius: 'var(--r-sm)', background: 'var(--surface)', border: 'var(--border-w-std) solid var(--border)', boxShadow: 'var(--shadow-card)', display: 'grid', placeItems: 'center', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>resting card</div>
            <div style={{ width: 120, height: 64, borderRadius: 'var(--r-md)', background: 'var(--surface)', border: 'var(--border-w-hair) solid var(--border)', boxShadow: 'var(--shadow-pop)', display: 'grid', placeItems: 'center', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>floating pop</div>
          </Flow>
        </Card>
        <Card title="Motion" style={{ flex: '1 1 240px', marginBottom: 0 }}
          note="No bounce, no decorative loops; prefers-reduced-motion zeroes every duration.">
          <div className="fg-tnum" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-sm)', lineHeight: 1.8 }}>
            {MOTION_TOKENS.map((t) => <div key={t}>{t} · {rawValue(t)}</div>)}
          </div>
        </Card>
      </Flow>
    </Section>
  );
}
