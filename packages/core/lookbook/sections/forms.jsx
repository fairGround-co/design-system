/* Forms — inputs, checkboxes, steppers, palette picker. */
import React from 'react';
import { TextInput } from '../../components/forms/TextInput.jsx';
import { Textarea } from '../../components/forms/Textarea.jsx';
import { Select } from '../../components/forms/Select.jsx';
import { Checkbox } from '../../components/forms/Checkbox.jsx';
import { FormField } from '../../components/forms/FormField.jsx';
import { SearchInput } from '../../components/forms/SearchInput.jsx';
import { NumberSpinner } from '../../components/forms/NumberSpinner.jsx';
import { ColorPicker } from '../../components/forms/ColorPicker.jsx';
import { ThemeToggle } from '../../components/forms/ThemeToggle.jsx';
import { required, minLength } from '../../components/forms/useFormValidation.js';
import { Section, Card, Flow } from '../scaffold.jsx';

export const meta = {
  id: 'forms',
  title: 'Forms',
  visibility: 'public',
  sources: ['components'],
};

export function SectionBody() {
  const [name, setName] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [type, setType] = React.useState('walk');
  const [ok, setOk] = React.useState(true);
  const [part, setPart] = React.useState(false);
  const [q, setQ] = React.useState('');
  const [n, setN] = React.useState(4);
  const [stackN, setStackN] = React.useState(2);
  const [color, setColor] = React.useState('var(--cat-5)');
  const [demoTheme1, setDemoTheme1] = React.useState('light');
  const [demoTheme2, setDemoTheme2] = React.useState('dark');
  return (
    <Section meta={meta}
      lead="Inputs fill with --surface-2 and focus with the view-scope ring; errors are --status-danger; the required asterisk is --commit. FormField auto-validates when given value + rules.">
      <Card title="Text · select · checkbox">
        <Flow gap={6} align="flex-start">
          <FormField label="Group name" required value={name} rules={[required(), minLength(3)]} hint="Auto-validating: type fewer than 3 chars">
            <TextInput value={name} onChange={setName} placeholder="e.g. Marching Band" />
          </FormField>
          <FormField label="Type">
            <Select value={type} onChange={setType} options={[{ value: 'walk', label: 'Walking' }, { value: 'float', label: 'Float' }, { value: 'truck', label: 'Truck' }]} />
          </FormField>
          <FormField label="With icon">
            <TextInput icon="search" placeholder="Leading icon" />
          </FormField>
          <FormField label="Error state">
            <TextInput error value="bad value" onChange={() => {}} />
          </FormField>
        </Flow>
        <Flow gap={6} style={{ marginTop: 'var(--space-6)' }}>
          <Checkbox checked={ok} onChange={setOk} label="Ready to stage" />
          <Checkbox indeterminate={!part} checked={part} onChange={setPart} label="Select all (indeterminate)" />
          <Checkbox disabled label="Disabled" />
        </Flow>
        <div style={{ marginTop: 'var(--space-6)', maxWidth: 420 }}>
          <FormField label="Notes">
            <Textarea value={notes} onChange={setNotes} rows={3} maxLength={120} placeholder="Multiline with counter…" />
          </FormField>
        </div>
      </Card>
      <Card title="Search · steppers · palette picker">
        <Flow gap={6}>
          <SearchInput value={q} onChange={setQ} placeholder="Search the list…" />
          <NumberSpinner value={n} onChange={setN} min={0} max={20} aria-label="Count" />
          <NumberSpinner layout="stacked" accent value={stackN} onChange={setStackN} min={0} max={9} aria-label="Slots" />
          <ColorPicker value={color} onChange={setColor} />
        </Flow>
      </Card>
      <Card title="ThemeToggle — switch · icon variants"
        note="Controlled here (value/onChange) so these previews stay scoped to their own boxes instead of flipping the whole page. Leave value out in your app and it self-manages [data-theme] + localStorage — true zero-config for a header or profile menu. The on-state (dark) reads --scope-view, matching Checkbox: a display preference is a view operation, not a data-changing commit.">
        <Flow gap={7} align="flex-start">
          <div data-theme={demoTheme1} style={{ padding: 'var(--space-5) var(--space-6)', background: 'var(--surface)', border: 'var(--border-w-hair) solid var(--border)', borderRadius: 'var(--r-sm)' }}>
            <ThemeToggle value={demoTheme1} onChange={setDemoTheme1} label={demoTheme1 === 'dark' ? 'Dark' : 'Light'} />
          </div>
          <div data-theme={demoTheme2} style={{ padding: 'var(--space-5) var(--space-6)', background: 'var(--surface)', border: 'var(--border-w-hair) solid var(--border)', borderRadius: 'var(--r-sm)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
            <ThemeToggle variant="icon" value={demoTheme2} onChange={setDemoTheme2} />
            <ThemeToggle variant="icon" size="sm" value={demoTheme2} onChange={setDemoTheme2} />
          </div>
        </Flow>
      </Card>
    </Section>
  );
}
