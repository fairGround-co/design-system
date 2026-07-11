/* Layout & shell — header, panes, mobile shell, dialogs, danger zone. */
import React from 'react';
import { AppHeader } from '../../components/layout/AppHeader.jsx';
import { AuthStatus } from '../../components/layout/AuthStatus.jsx';
import { BottomTabBar } from '../../components/layout/BottomTabBar.jsx';
import { Dialog } from '../../components/layout/Dialog.jsx';
import { ConfirmDialog } from '../../components/layout/ConfirmDialog.jsx';
import { DangerZone } from '../../components/layout/DangerZone.jsx';
import { PopoutPane } from '../../components/layout/PopoutPane/PopoutPane.jsx';
import { ResizeHandle } from '../../components/layout/ResizeHandle.jsx';
import { SegmentedControl } from '../../components/forms/SegmentedControl.jsx';
import { Button } from '../../components/core/Button.jsx';
import { Badge } from '../../components/core/Badge.jsx';
import { Section, Card, Flow, Frame, DensityScope, BRAND } from '../scaffold.jsx';

export const meta = {
  id: 'layout',
  title: 'Layout & shell',
  visibility: 'public',
  sources: ['components'],
};

export function SectionBody() {
  const [dialog, setDialog] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [scope, setScope] = React.useState('viewer');
  const [page, setPage] = React.useState('lineup');
  const [tab, setTab] = React.useState('map');
  const [paneW, setPaneW] = React.useState(200);
  const dragStart = React.useRef(200);
  return (
    <Section meta={meta}
      lead="Navigation lives in the header (the selector IS the nav); multi-pane views drag-resize everywhere; below the mobile breakpoint the layout collapses to one pane switched by a bottom tab bar; dialogs anchor as bottom sheets on phones.">
      <Card title="AppHeader — year (informational) · wordmark (ink) · selector (context-changing) · AuthStatus">
        <Frame>
          <AppHeader year="2026" name={BRAND ? BRAND.toUpperCase() : 'FAIRGROUND'} clock="9:41 AM"
            select={{ value: page, onChange: setPage, options: [{ value: 'lineup', label: 'Lineup' }, { value: 'script', label: 'Script' }, { value: 'checkin', label: 'Check-in' }] }}
            right={<AuthStatus scope={scope} user={scope === 'guest' ? null : 'Kyle S.'} onSignIn={() => setScope('viewer')} onSignOut={() => setScope('guest')} onSwitchAccount={() => {}} />}
          />
        </Frame>
        <div style={{ marginTop: 'var(--space-4)' }}>
          <SegmentedControl options={[{ value: 'guest', label: 'Guest' }, { value: 'viewer', label: 'View-only' }, { value: 'editor', label: 'Editor' }]} value={scope} onChange={setScope} />
        </div>
      </Card>
      <Card title="Panes — ResizeHandle + PopoutPane" note="Drag the divider; the pop-out extends over the middle pane or collapses to a strip via its ‹/› pill. List rows are density-styled — toggle above the frame.">
        <DensityScope>
        <Frame height={260}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ width: paneW, minWidth: 'var(--pane-min-w)', background: 'var(--surface)', padding: 'var(--space-5)', fontSize: 'var(--font-size-data)' }}>
              {['Alpha Group', 'Beta Crew', 'Gamma Riders'].map((g, i) => (
                <div key={g} style={{ padding: 'var(--cell-pad-y) var(--cell-pad-x)', borderBottom: 'var(--border-w-hair) solid var(--border)', minHeight: 'var(--row-h)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Badge cat={i + 1}>{i + 1}</Badge>{g}
                </div>
              ))}
            </div>
            <div onPointerDown={() => { dragStart.current = paneW; }}>
              <ResizeHandle onDrag={(d) => setPaneW(Math.max(140, Math.min(320, dragStart.current + d)))} title="Drag to resize" />
            </div>
            <div style={{ flex: 1, display: 'grid', placeItems: 'center', color: 'var(--text-faint)', fontSize: 'var(--fs-sm)' }}>content pane</div>
            <PopoutPane title="Inspector" dockedWidth={180} minWidth={140} maxWidth={260} footer={<span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>footer slot</span>}>
              <div style={{ padding: 'var(--space-5)', fontSize: 'var(--font-size-data)' }}>Any content — tables, detail forms, check-in lists.</div>
            </PopoutPane>
          </div>
        </Frame>
        </DensityScope>
      </Card>
      <Card title="Mobile shell — BottomTabBar (static demo)" note="SwipeAction and PullToRefresh are touch-only; try this page on a phone.">
        <Frame width={320} height={120} style={{ margin: '0 auto' }}>
          <div style={{ display: 'grid', placeItems: 'center', height: 64, color: 'var(--text-faint)', fontSize: 'var(--fs-sm)' }}>single pane ≤ 760px</div>
          <BottomTabBar position="static" value={tab} onChange={setTab}
            tabs={[{ value: 'map', label: 'Map', icon: 'map' }, { value: 'list', label: 'List', icon: 'list' }, { value: 'search', label: 'Search', icon: 'search' }]} />
        </Frame>
      </Card>
      <Card title="Dialog · ConfirmDialog · DangerZone">
        <Flow>
          <Button variant="neutral" onClick={() => setDialog(true)}>Open Dialog</Button>
          <Button variant="neutral" onClick={() => setConfirm(true)}>Typed confirmation</Button>
        </Flow>
        <Dialog open={dialog} title="A floating surface" onClose={() => setDialog(false)}
          footer={<Button variant="primary" onClick={() => setDialog(false)}>Done</Button>}>
          <p style={{ marginTop: 0 }}>Scrim + centered card, focus trap, Escape/scrim close; anchors as a bottom sheet ≤760px. Modals are reserved for destructive/committing acts — routine editing happens in place.</p>
        </Dialog>
        <ConfirmDialog open={confirm} variant="danger" title="Delete everything?" message='Type DELETE to enable the confirm button.' requireTyped="DELETE" onConfirm={() => setConfirm(false)} onCancel={() => setConfirm(false)} />
        <div style={{ marginTop: 'var(--space-6)', maxWidth: 460 }}>
          <DangerZone title="Danger zone">
            <Flow>
              <Button variant="commit" confirm={{ message: 'This one is guarded too.', variant: 'danger' }}>Destructive act</Button>
              <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Destructive actions group here, each behind a confirm.</span>
            </Flow>
          </DangerZone>
        </div>
      </Card>
    </Section>
  );
}
