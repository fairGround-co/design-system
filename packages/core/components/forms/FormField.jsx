import React from 'react';
import { validateValue } from './useFormValidation.js';

/**
 * FormField — a label + input + error wrapper. The standard way to compose
 * any form control (TextInput, Textarea, Select, Checkbox) with its label,
 * optional hint text, and validation error message.
 *
 * Labels are UPPERCASE tracked eyebrows (the system's section-label style).
 * Errors show in the danger status color below the control. `required` adds
 * a commit-colored asterisk after the label (required = the field must be
 * filled to commit).
 *
 * Pass the input as `children` — FormField is layout-only, not a compound
 * input. This lets you use it with any control:
 *
 *   <FormField label="Group name" error="Required">
 *     <TextInput value={name} onChange={setName} error />
 *   </FormField>
 *
 * Auto-validation: when both `value` and `rules` are provided, FormField
 * validates automatically and shows the first failing rule's message.
 * The explicit `error` prop still overrides if set.
 */
export function FormField({
  label,
  hint,
  error,
  required = false,
  htmlFor,
  value,
  rules,
  style,
  children,
}) {
  // Auto-validate when value + rules are provided
  const autoError = (rules && rules.length && value !== undefined)
    ? validateValue(value, rules)
    : null;
  // Explicit error overrides auto
  error = error !== undefined && error !== null ? error : autoError;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontFamily: 'var(--font-ui)', ...style }}>
      {label ? (
        <label htmlFor={htmlFor} style={{
          fontSize: 11, fontWeight: 800, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: 'var(--text-muted)', lineHeight: 1,
        }}>
          {label}
          {required ? <span style={{ color: 'var(--commit)', marginLeft: 3 }}>*</span> : null}
        </label>
      ) : null}
      {hint ? (
        <div style={{ fontSize: 12, color: 'var(--text-faint)', lineHeight: 1.4, marginTop: -2 }}>{hint}</div>
      ) : null}
      {children}
      {error ? (
        <div role="alert" style={{
          fontSize: 12, color: 'var(--status-danger-ink)', fontWeight: 600, lineHeight: 1.3,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <span style={{ fontSize: 14 }}>⚠</span> {error}
        </div>
      ) : null}
    </div>
  );
}
