/* Surfaces & ink — the token contract's §2, rendered live. */
import React from 'react';
import { SURFACE_TOKENS } from '../../src/tokens.js';
import { Section, Card, Flow, TokenChip } from '../scaffold.jsx';

export const meta = {
  id: 'surfaces',
  title: 'Surfaces & ink',
  visibility: 'public',
  sources: ['contract', 'theme'],
};

export function SectionBody() {
  return (
    <Section meta={meta}
      lead="The stage everything else stands on. Resting surfaces carry a 1px border; --shadow-card is additive and themes may zero it.">
      <Card title="Surface ladder + ink">
        <Flow gap={6} align="stretch">
          {SURFACE_TOKENS.filter((t) => !['--overlay', '--scrim'].includes(t)).map((t) => <TokenChip key={t} token={t} />)}
        </Flow>
      </Card>
      <Card title="Backdrops — scrim vs overlay" note="A floating surface (Dialog, sheet) dims the page with --scrim; --overlay is the opaque full-bleed cover for blocking states.">
        <Flow>
          <TokenChip token="--scrim" /><TokenChip token="--overlay" />
        </Flow>
      </Card>
    </Section>
  );
}
