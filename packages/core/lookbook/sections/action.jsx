/* Action & signal — working pair, capability scope, status families. */
import React from 'react';
import { STATUS_ROLES, SCOPE_ROLES } from '../../src/tokens.js';
import { Badge } from '../../components/core/Badge.jsx';
import { AuthStatus } from '../../components/layout/AuthStatus.jsx';
import { Section, Card, Flow, TokenChip, VariantStrip, useEpoch } from '../scaffold.jsx';

export const meta = {
  id: 'action',
  title: 'Action & signal',
  visibility: 'public',
  sources: ['contract', 'theme'],
};

export function SectionBody() {
  useEpoch();
  return (
    <Section meta={meta}
      lead="--accent is THE action color and may flip per mode (a brand's signature); --scope-* capability colors and --commit stay stable across modes: view operations read --scope-view, data-changing acts read --commit.">
      <Card title="Working pair">
        <Flow gap={6}>
          <TokenChip token="--accent" text="primary actions" />
          <TokenChip token="--accent-2" text="complement" />
          <TokenChip token="--on-accent" text="ink on fills" />
          <TokenChip token="--match" text="search/filter hit" />
          <TokenChip token="--commit" text="data-changing" />
        </Flow>
      </Card>
      <Card title="Capability scope">
        <Flow gap={6}>
          {SCOPE_ROLES.map((r) => <TokenChip key={r} token={`--scope-${r}`} text={{ view: 'read-only / safe', guest: 'limited access', edit: 'write-enabled' }[r]} />)}
        </Flow>
        <div style={{ marginTop: 'var(--space-6)' }}>
          <Flow>
            {['guest', 'viewer', 'editor'].map((s) => <AuthStatus key={s} scope={s} user={s === 'guest' ? null : 'Kyle S.'} />)}
          </Flow>
        </div>
      </Card>
      <Card title="Status — reserved for state, never decorative"
        note="Each hue ships -soft / -deep / -bright derivations and a contrast-tuned -ink for text/marks.">
        <Flow gap={6} align="flex-start">
          {STATUS_ROLES.map((r) => <VariantStrip key={r} base={`--status-${r}`} />)}
        </Flow>
        <div style={{ marginTop: 'var(--space-6)' }}>
          <Flow>
            <Badge tone="success" icon="check">Success</Badge>
            <Badge tone="warning" icon="warning">Warning</Badge>
            <Badge tone="caution" icon="pending">Caution</Badge>
            <Badge tone="danger" icon="cancel">Danger</Badge>
            <Badge tone="info" icon="info">Info</Badge>
            <Badge tone="success" solid>Solid</Badge>
          </Flow>
        </div>
      </Card>
    </Section>
  );
}
