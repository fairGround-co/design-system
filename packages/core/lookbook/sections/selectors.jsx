/* Selectors & filters — segmented controls, chips, menus, status track. */
import React from 'react';
import { SegmentedControl } from '../../components/forms/SegmentedControl.jsx';
import { FilterChips } from '../../components/forms/FilterChips.jsx';
import { FilterMenu } from '../../components/forms/FilterMenu.jsx';
import { StatusSelector } from '../../components/forms/StatusSelector.jsx';
import { HeaderSelect } from '../../components/forms/HeaderSelect.jsx';
import { Section, Card, Flow } from '../scaffold.jsx';

export const meta = {
  id: 'selectors',
  title: 'Selectors & filters',
  visibility: 'public',
  sources: ['components'],
};

export function SectionBody() {
  const [seg, setSeg] = React.useState('all');
  const [tab, setTab] = React.useState('list');
  const [level, setLevel] = React.useState('2');
  const [chips, setChips] = React.useState(['a']);
  const [menuVals, setMenuVals] = React.useState(['done', 'pending']);
  const [status, setStatus] = React.useState('done');
  const [page, setPage] = React.useState('lineup');
  return (
    <Section meta={meta}
      lead="View operations read --scope-view in every mode — filtering is a view op, not a data change. SegmentedControl is the primary selector; FilterMenu takes over past ~4 facets; StatusSelector adds per-segment semantic color and tap-or-swipe selection.">
      <Card title="SegmentedControl — enclosed · tabs · progressive">
        <Flow gap={6}>
          <SegmentedControl options={[{ value: 'all', label: 'All' }, { value: 'open', label: 'Open' }, { value: 'done', label: 'Done' }]} value={seg} onChange={setSeg} />
          <SegmentedControl variant="tabs" options={[{ value: 'list', label: 'List' }, { value: 'map', label: 'Map' }, { value: 'both', label: 'Both' }]} value={tab} onChange={setTab} />
          <SegmentedControl progressive options={[{ value: '1', label: 'Basic' }, { value: '2', label: 'Standard' }, { value: '3', label: 'Full' }]} value={level} onChange={setLevel} />
        </Flow>
      </Card>
      <Card title="FilterChips (empty = all) · FilterMenu (explicit set)">
        <Flow gap={6}>
          <FilterChips
            options={[{ value: 'a', label: 'Confirmed', tone: 'success', icon: 'check' }, { value: 'b', label: 'Pending', tone: 'caution', icon: 'pending' }, { value: 'c', label: 'Cancelled', tone: 'danger', icon: 'cancel' }]}
            value={chips} onChange={setChips}
          />
          <FilterMenu noun="status" nounPlural="statuses"
            options={[
              { value: 'done', label: 'Done', color: 'var(--status-success-ink)', icon: 'check' },
              { value: 'pending', label: 'Pending', color: 'var(--status-caution-ink)', icon: 'pending' },
              { value: 'blocked', label: 'Blocked', color: 'var(--status-danger-ink)', icon: 'ban' },
              { value: 'na', label: 'No contact', color: 'var(--text-faint)', icon: 'nocontact' },
            ]}
            value={menuVals} onChange={setMenuVals}
          />
        </Flow>
      </Card>
      <Card title="StatusSelector — tap or swipe across the track">
        <StatusSelector value={status} onChange={setStatus} />
      </Card>
      <Card title="HeaderSelect — nav that reads as the H1">
        <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 'var(--fw-extrabold)', textTransform: 'uppercase', letterSpacing: 'var(--ls-label)' }}>
          <HeaderSelect value={page} onChange={setPage}
            options={[
              { label: 'Admin', options: [{ value: 'lineup', label: 'Lineup' }, { value: 'checkin', label: 'Check-in' }] },
              { label: 'Public', options: [{ value: 'map', label: 'Map' }] },
            ]} />
        </div>
      </Card>
    </Section>
  );
}
