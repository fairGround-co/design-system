/* Tenant runtime overrides — the §9 whitelist. */
import React from 'react';
import { TENANT_OVERRIDE_WHITELIST } from '../../src/tokens.js';
import { Section, Card } from '../scaffold.jsx';

export const meta = {
  id: 'tenant',
  title: 'Tenant runtime overrides',
  visibility: 'public',
  sources: ['tokensJs'],
};

export function SectionBody() {
  return (
    <Section meta={meta}
      lead="Multi-tenant apps may override ONLY the whitelist below at runtime on a [data-tenant] scope — surfaces, ink, status, spacing, type, and motion stay locked so accessibility and layout invariants hold.">
      <Card>
        <code style={{ fontSize: 'var(--fs-xs)', fontFamily: 'var(--font-mono)', lineHeight: 1.9, color: 'var(--text-muted)', wordBreak: 'break-word' }}>
          {TENANT_OVERRIDE_WHITELIST.join(' · ')}
        </code>
      </Card>
    </Section>
  );
}
