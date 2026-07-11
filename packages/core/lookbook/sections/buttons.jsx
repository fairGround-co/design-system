/* Buttons & menus. */
import React from 'react';
import { Button } from '../../components/core/Button.jsx';
import { MenuButton } from '../../components/core/MenuButton.jsx';
import { Icon } from '../../components/icons/Icon.jsx';
import { Section, Card, Flow } from '../scaffold.jsx';

export const meta = {
  id: 'buttons',
  title: 'Buttons & menus',
  visibility: 'public',
  sources: ['components'],
};

export function SectionBody() {
  return (
    <Section meta={meta}
      lead="Pick the variant by what the click DOES: primary = the theme's action color; commit = data-changing/final (use sparingly); neutral/ghost for low emphasis. Solid fills carry the contrast — no outlines on actions.">
      <Card title="Button">
        <Flow>
          <Button variant="primary">Primary</Button>
          <Button variant="commit">Commit</Button>
          <Button variant="neutral">Neutral</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" icon={<Icon name="share" size={16} />}>With icon</Button>
          <Button variant="neutral" disabled>Disabled</Button>
          <Button variant="commit" confirm="This intercepts the click with a ConfirmDialog.">confirm prop</Button>
        </Flow>
      </Card>
      <Card title="MenuButton — plain + split">
        <Flow>
          <MenuButton items={[{ label: 'CSV' }, { label: 'GeoJSON' }, { label: 'PDF', disabled: true }]}>Download</MenuButton>
          <MenuButton split variant="commit" onClick={() => {}} items={[{ label: 'Publish draft' }, { label: 'Unpublish', danger: true }]}>Publish</MenuButton>
        </Flow>
      </Card>
    </Section>
  );
}
