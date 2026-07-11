/* Visual foundations — STRATEGIC design philosophy (DECISIONS #29: private
   brand facet). The "why we do it" prose from the brand-assets repo's
   docs/visual-foundations.md. Token-EXPLANATORY annotation (what a value
   means, contrast rules) stays public, inline in the token sections. */
import React from 'react';
import { Section, Card, Md, LB } from '../scaffold.jsx';

export const meta = {
  id: 'foundations',
  title: 'Visual foundations',
  visibility: 'private',
  sources: ['foundations'],
  enabled: () => !!LB.foundationsMd,
};

export function SectionBody() {
  return (
    <Section meta={meta}
      lead="The brand's design philosophy — why the palette, type, space, and motion are what they are. Private: the owner's manual, not the car.">
      <Card>
        <Md src={LB.foundationsMd} />
      </Card>
    </Section>
  );
}
