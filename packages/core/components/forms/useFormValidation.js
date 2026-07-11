/**
 * useFormValidation — a React hook for form-level validation.
 *
 * Takes a map of { fieldName: { value, rules } } where each rule is
 * { test: (value) => boolean, message: string }. A rule passes when test()
 * returns true; the first failing rule's message becomes the field error.
 *
 * Returns { errors, isValid, validate, touched }.
 *  - errors: { fieldName: string|null } — only populated for touched fields
 *    (or all fields after validate() is called).
 *  - isValid: boolean — true when ALL fields pass (not just touched ones).
 *  - validate(): runs all rules on all fields, marks all as touched, returns boolean.
 *  - touched: Set of field names the user has blurred.
 *
 * Built-in rule factories:
 *  - required(msg?) — value is non-empty (trims strings).
 *  - email(msg?) — basic email format check.
 *  - minLength(n, msg?) — string length >= n.
 *  - maxLength(n, msg?) — string length <= n.
 *  - pattern(regex, msg?) — value matches the regex.
 */

// Rule factories
export function required(msg) {
  return {
    test: (v) => v != null && String(v).trim().length > 0,
    message: msg || 'Required',
  };
}

export function email(msg) {
  return {
    test: (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v)),
    message: msg || 'Enter a valid email',
  };
}

export function minLength(n, msg) {
  return {
    test: (v) => !v || String(v).length >= n,
    message: msg || 'Must be at least ' + n + ' characters',
  };
}

export function maxLength(n, msg) {
  return {
    test: (v) => !v || String(v).length <= n,
    message: msg || 'Must be at most ' + n + ' characters',
  };
}

export function pattern(regex, msg) {
  return {
    test: (v) => !v || regex.test(String(v)),
    message: msg || 'Invalid format',
  };
}

// Validate a single value against rules — returns first failing message or null.
export function validateValue(value, rules) {
  if (!rules || !rules.length) return null;
  for (const rule of rules) {
    if (!rule.test(value)) return rule.message;
  }
  return null;
}

// React hook
export function useFormValidation(fields) {
  const React = window.React;
  const [touched, setTouched] = React.useState(new Set());
  const [showAll, setShowAll] = React.useState(false);

  const allErrors = {};
  let allValid = true;
  for (const name in fields) {
    const { value, rules } = fields[name];
    const err = validateValue(value, rules);
    allErrors[name] = err;
    if (err) allValid = false;
  }

  // Only expose errors for touched fields (or all after validate())
  const errors = {};
  for (const name in allErrors) {
    errors[name] = (showAll || touched.has(name)) ? allErrors[name] : null;
  }

  const markTouched = (name) => {
    setTouched((prev) => {
      if (prev.has(name)) return prev;
      const next = new Set(prev);
      next.add(name);
      return next;
    });
  };

  const validate = () => {
    setShowAll(true);
    return allValid;
  };

  return { errors, isValid: allValid, validate, touched, markTouched };
}
