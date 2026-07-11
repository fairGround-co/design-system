/* Selection hierarchy — rail + ring variants, match ring, hover tint. */
import React from 'react';
import { Icon } from '../../components/icons/Icon.jsx';
import { Section, Card, Flow } from '../scaffold.jsx';

export const meta = {
  id: 'selection',
  title: 'Selection hierarchy',
  visibility: 'public',
  sources: ['contract'],
};

export function SectionBody() {
  const [sel, setSel] = React.useState(1);
  const rows = ['Row one — click me', 'Row two — click me', 'Row three (matches a filter)'];
  return (
    <Section meta={meta}
      lead="Strict three levels so cues never collide: SELECTED (accent border + tint) > MATCH (ring in the complementary hue) > HOVER (surface-2 tint). Two committed selection variants: rail (inset edge bar) and ring (accent outline).">
      <Flow gap={6} align="flex-start">
        {['rail', 'ring'].map((variant) => (
          <Card key={variant} title={`${variant} variant`} style={{ flex: '1 1 280px', marginBottom: 0 }}>
            {rows.map((label, i) => {
              const selected = sel === i;
              const matched = i === 2;
              return (
                <div key={i} onClick={() => setSel(i)}
                  onMouseEnter={(e) => { if (!selected) e.currentTarget.style.background = 'var(--surface-2)'; }}
                  onMouseLeave={(e) => { if (!selected) e.currentTarget.style.background = selected ? 'var(--select-bg)' : 'transparent'; }}
                  style={{
                    padding: 'var(--cell-pad-y) var(--cell-pad-x)', minHeight: 'var(--row-h)',
                    display: 'flex', alignItems: 'center', cursor: 'pointer',
                    borderRadius: 'var(--r-sm)', marginBottom: 'var(--space-2)',
                    background: selected ? 'var(--select-bg)' : 'transparent',
                    boxShadow: [
                      selected && variant === 'rail' ? 'inset 3px 0 0 0 var(--select-accent)' : null,
                      selected && variant === 'ring' ? 'inset 0 0 0 1.5px var(--select-accent)' : null,
                      matched && !selected ? 'var(--ring-match)' : null,
                    ].filter(Boolean).join(', ') || 'none',
                    transition: 'background var(--dur-fast) var(--ease-ui)',
                  }}>
                  <span style={{ fontSize: 'var(--font-size-data)' }}>{label}</span>
                  {matched && <Icon name="search" size={14} title="filter match" style={{ marginLeft: 'auto', color: 'var(--match)' }} />}
                </div>
              );
            })}
          </Card>
        ))}
      </Flow>
    </Section>
  );
}
