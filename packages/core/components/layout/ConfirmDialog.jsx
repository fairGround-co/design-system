import React from 'react';
import { Dialog } from './Dialog.jsx';
import { Button } from '../core/Button.jsx';
import { Icon } from '../icons/Icon.jsx';
import { TextInput } from '../forms/TextInput.jsx';

/**
 * ConfirmDialog — a specialized Dialog for destructive/irreversible actions.
 * Wraps the existing Dialog component with a warning icon, message text, and
 * confirm/cancel footer. Optionally requires the user to type a specific
 * string before the confirm button enables (e.g. "DELETE").
 *
 * Variants:
 *  • danger  — --status-danger confirm button, warning icon. For destructive/irreversible.
 *  • warning — --status-warning confirm button, warning icon. For risky but recoverable.
 *  • commit  — --commit confirm button, info icon. For significant but non-destructive.
 */
export function ConfirmDialog({
  open = false,
  title = 'Confirm',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  requireTyped,
  onConfirm,
  onCancel,
  style,
}) {
  const [typed, setTyped] = React.useState('');

  React.useEffect(() => {
    if (open) setTyped('');
  }, [open]);

  const variantColors = {
    danger: 'var(--status-danger)',
    warning: 'var(--status-warning)',
    commit: 'var(--commit)',
  };
  const iconName = variant === 'commit' ? 'info' : 'warning';
  const accentColor = variantColors[variant] || variantColors.danger;
  const canConfirm = requireTyped ? typed === requireTyped : true;

  const footer = (
    <>
      <Button variant="neutral" size="sm" onClick={onCancel}>{cancelLabel}</Button>
      <Button
        size="sm"
        disabled={!canConfirm}
        onClick={() => canConfirm && onConfirm && onConfirm()}
        style={{ background: accentColor, color: 'var(--on-accent)', border: 'none' }}
      >{confirmLabel}</Button>
    </>
  );

  return (
    <Dialog open={open} title={title} size="sm" onClose={onCancel} footer={footer} style={style}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontFamily: 'var(--font-ui)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flexShrink: 0, marginTop: 1 }}>
            <Icon name={iconName} size={22} color={accentColor} />
          </div>
          <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.55 }}>
            {message}
          </div>
        </div>
        {requireTyped ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <label style={{
              fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4,
            }}>
              Type <strong style={{ color: 'var(--text)', fontWeight: 800 }}>"{requireTyped}"</strong> to confirm
            </label>
            <TextInput
              value={typed}
              onChange={setTyped}
              placeholder={requireTyped}
              size="sm"
              autoFocus
            />
          </div>
        ) : null}
      </div>
    </Dialog>
  );
}
