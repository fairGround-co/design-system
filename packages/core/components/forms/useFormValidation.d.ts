export interface ValidationRule {
  test: (value: any) => boolean;
  message: string;
}
export interface FieldConfig {
  value: any;
  rules?: ValidationRule[];
}
export interface FormValidationResult {
  errors: Record<string, string | null>;
  isValid: boolean;
  validate: () => boolean;
  touched: Set<string>;
  markTouched: (name: string) => void;
}
/** Form-level validation with touched-field tracking. */
export function useFormValidation(fields: Record<string, FieldConfig>): FormValidationResult;
/** Rule factory: value must be non-empty. */
export function required(msg?: string): ValidationRule;
/** Rule factory: value must be a valid email. */
export function email(msg?: string): ValidationRule;
/** Rule factory: minimum string length. */
export function minLength(n: number, msg?: string): ValidationRule;
/** Rule factory: maximum string length. */
export function maxLength(n: number, msg?: string): ValidationRule;
/** Rule factory: value must match a regular expression. */
export function pattern(regex: RegExp, msg?: string): ValidationRule;
/** Run a value through a rule list; returns the first failing message or null. */
export function validateValue(value: any, rules?: ValidationRule[]): string | null;
