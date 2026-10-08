/** Props of `FormControl` (same names and defaults as the React `FormControlProps`). */
export interface FormControlProps {
  /**
   * Marks the field as invalid: the control gets aria-invalid and the error
   * message replaces the helper text
   * @default false
   */
  invalid?: boolean;
  /**
   * Marks the field as required (aria-required on the control, indicator on the label)
   * @default false
   */
  required?: boolean;
  /**
   * Disables the control inside the field
   * @default false
   */
  disabled?: boolean;
  /**
   * Makes the control inside the field read-only
   * @default false
   */
  readOnly?: boolean;
  /**
   * Id of the control; the label, helper and error ids derive from it
   * (`${id}-label`, `${id}-helper`, `${id}-error`). Generated when omitted
   */
  id?: string;
}

/** Props of `FormLabel`. Other attributes go to the `<label>`. */
export interface FormLabelProps {
  /**
   * Indicator shown after the text when the field is required (hidden from
   * assistive technology, which gets aria-required instead); or the
   * `required-indicator` slot
   * @default "*"
   */
  requiredIndicator?: string;
  /** `for` of the label (defaults to the FormControl's control id) */
  htmlFor?: string;
}

/** Props of `FormField`: a FormControl with its label, helper and error. */
export interface FormFieldProps extends FormControlProps {
  /** Label of the field (or the `label` slot) */
  label?: string;
  /** Help text below the control, hidden while invalid (or the `helper-text` slot) */
  helperText?: string;
  /**
   * Error message (or the `error-message` slot); makes the field invalid
   * unless `invalid` is set explicitly
   */
  errorMessage?: string;
}
