/* Voice & content — STRATEGIC guidance (DECISIONS #29: private brand facet).
   Renders only in the complete lookbook, from the brand-assets repo's
   docs/voice.md. The public stub omits this module entirely. */
import React from 'react';
import { Section, Card, Md, LB } from '../scaffold.jsx';

export const meta = {
  id: 'voice',
  title: 'Voice & content',
  visibility: 'private',
  sources: ['voice'],
  enabled: () => !!LB.voiceMd,
};

export function SectionBody() {
  return (
    <Section meta={meta}
      lead="How this brand writes — dos, don'ts, and writing samples. Strategic guidance: content producers (and agents) work FROM this; what they produce is the public content.">
      <Card>
        <Md src={LB.voiceMd} />
      </Card>
    </Section>
  );
}
