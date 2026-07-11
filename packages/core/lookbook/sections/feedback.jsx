/* Feedback & loading — toasts, spinners, skeletons, progress, help. */
import React from 'react';
import { Toast } from '../../components/feedback/Toast.jsx';
import { UndoToast } from '../../components/feedback/UndoToast.jsx';
import { Spinner } from '../../components/feedback/Spinner.jsx';
import { Skeleton, SkeletonCard } from '../../components/feedback/Skeleton.jsx';
import { EmptyState } from '../../components/feedback/EmptyState.jsx';
import { ProgressBar } from '../../components/feedback/ProgressBar.jsx';
import { InlineHelp } from '../../components/feedback/InlineHelp.jsx';
import { Tooltip } from '../../components/feedback/Tooltip.jsx';
import { LiveRegion } from '../../components/feedback/LiveRegion.jsx';
import { Notice } from '../../components/feedback/Notice.jsx';
import { QRShare } from '../../components/feedback/QRShare.jsx';
import { Button } from '../../components/core/Button.jsx';
import { Icon } from '../../components/icons/Icon.jsx';
import { Section, Card, Flow } from '../scaffold.jsx';

export const meta = {
  id: 'feedback',
  title: 'Feedback & loading',
  visibility: 'public',
  sources: ['components'],
};

export function SectionBody() {
  const [undoKey, setUndoKey] = React.useState(0);
  const [announced, setAnnounced] = React.useState('');
  return (
    <Section meta={meta}>
      <Card title="Notice — inline, persistent, in-flow" note="Notice sits in the page flow and stays put; Toast is transient and floats. Fills mix the tone into the current surface (the selection-state recipe), so they track light/dark and brand scopes.">
        <div style={{ display: 'grid', gap: 'var(--space-4)', maxWidth: 620 }}>
          <Notice tone="info">Data refreshes every 60 seconds while this tab is open.</Notice>
          <Notice tone="success" title="Import complete">214 entries loaded; 0 rows skipped.</Notice>
          <Notice tone="caution" title="Draft values">These numbers are provisional until the review pass lands.</Notice>
          <Notice tone="warning">Working offline — changes queue locally until the connection returns.</Notice>
          <Notice tone="danger" title="Locked">This lineup is published; unpublish before editing.</Notice>
          <Notice tone="info" compact icon="help">Compact variant for in-form placement.</Notice>
        </div>
      </Card>
      <Card title="Toast tones">
        <Flow gap={4} align="flex-start">
          <Toast tone="info" message="Synced 12s ago" onClose={() => {}} />
          <Toast tone="success" title="Published" message="Lineup is live" onClose={() => {}} />
          <Toast tone="warning" message="Working offline" actionLabel="Retry" onAction={() => {}} />
          <Toast tone="error" message="Save failed" onClose={() => {}} />
        </Flow>
        <div style={{ marginTop: 'var(--space-5)' }}>
          <Flow>
            <Button variant="neutral" size="sm" onClick={() => setUndoKey((k) => k + 1)}>Trigger UndoToast</Button>
            {undoKey > 0 && <UndoToast key={undoKey} message="Entry deleted" duration={5000} onUndo={() => {}} />}
          </Flow>
        </div>
      </Card>
      <Card title="Spinner · Skeleton · ProgressBar" note="Brand preset animations (flag spinners, gradient bars) live app-side and pass in via the colors prop — shown here with categorical slots.">
        <Flow gap={7}>
          <Spinner size="sm" /><Spinner size="md" /><Spinner size="lg" />
          <Spinner size="md" colors={['var(--cat-1)', 'var(--cat-3)', 'var(--cat-5)', 'var(--cat-7)']} label="Cycling demo" />
        </Flow>
        <Flow gap={7} style={{ marginTop: 'var(--space-6)' }} align="flex-start">
          <div style={{ width: 220 }}>
            <Skeleton width="70%" /><div style={{ height: 8 }} /><Skeleton width="45%" /><div style={{ height: 12 }} /><SkeletonCard />
          </div>
          <div style={{ width: 240, display: 'grid', gap: 12 }}>
            <ProgressBar value={0.62} showPercent />
            <ProgressBar indeterminate />
            <ProgressBar value={0.8} colors={['var(--cat-4)', 'var(--cat-9)', 'var(--cat-7)']} />
          </div>
        </Flow>
      </Card>
      <Card title="Tooltip · InlineHelp · LiveRegion · QRShare">
        <Flow gap={7}>
          <Tooltip text="Hover on desktop, long-press on mobile"><span style={{ textDecoration: 'underline dotted', cursor: 'help' }}>tooltip trigger</span></Tooltip>
          <span>Field guidance <InlineHelp text="Click-to-toggle help popover, sized for a phone in sunlight." /></span>
          <Button variant="neutral" size="sm" onClick={() => setAnnounced(`Checked in at ${new Date().toLocaleTimeString()}`)}>Announce to screen readers</Button>
          <LiveRegion message={announced} />
          {announced && <code style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>aria-live: “{announced}”</code>}
          <QRShare buttonLabel="Share" title="Share This Page" />
        </Flow>
      </Card>
      <Card title="EmptyState">
        <EmptyState icon="list" title="No entries yet" message="Content lists start here." action="Add the first one" onAction={() => {}} size="sm" />
      </Card>
    </Section>
  );
}
