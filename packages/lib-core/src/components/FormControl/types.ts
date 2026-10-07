import type {
  HTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  Ref,
} from "react";

export interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
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
  /** Field content: FormLabel, a control, FormHelperText, FormErrorMessage */
  children?: ReactNode;
  /** Ref to the container <div> */
  ref?: Ref<HTMLDivElement>;
}

export interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Indicator shown after the text when the field is required (hidden from
   * assistive technology, which gets aria-required instead)
   * @default "*"
   */
  requiredIndicator?: ReactNode;
  /** Ref to the <label> element */
  ref?: Ref<HTMLLabelElement>;
}

export interface FormHelperTextProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref to the helper <div> */
  ref?: Ref<HTMLDivElement>;
}

export interface FormErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref to the error <div> */
  ref?: Ref<HTMLDivElement>;
}

export interface FormFieldProps extends FormControlProps {
  /** Label of the field */
  label: ReactNode;
  /** Help text below the control (hidden while the field is invalid) */
  helperText?: ReactNode;
  /**
   * Error message; makes the field invalid unless `invalid` is set explicitly
   */
  errorMessage?: ReactNode;
}
