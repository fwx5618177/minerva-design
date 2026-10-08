import { useId, useLayoutEffect, useMemo, useState } from "react";
import { cn } from "../../utils/cn";
import {
  FormControlContext,
  useFormControlContext,
  type FormControlContextValue,
} from "./context";
import type {
  FormControlProps,
  FormErrorMessageProps,
  FormFieldProps,
  FormHelperTextProps,
  FormLabelProps,
} from "./types";
import { hooks } from "../../internal/stylingHooks";
import styles from "./formControl.module.scss";

/**
 * FormControl: field container that shares id / invalid / required /
 * disabled / read-only state with its label, control, helper text and error
 * message. Controls inside read it with `useFormControlProps`.
 */
export const FormControl = ({
  invalid = false,
  required = false,
  disabled = false,
  readOnly = false,
  id: idProp,
  className,
  children,
  ref,
  ...rest
}: FormControlProps) => {
  const autoId = useId();
  const id = idProp ?? `field-${autoId}`;
  const [hasHelperText, registerHelperText] = useState(false);
  const [hasErrorMessage, registerErrorMessage] = useState(false);

  const ctx = useMemo<FormControlContextValue>(
    () => ({
      id,
      labelId: `${id}-label`,
      helperId: `${id}-helper`,
      errorId: `${id}-error`,
      invalid,
      required,
      disabled,
      readOnly,
      hasHelperText,
      hasErrorMessage,
      registerHelperText,
      registerErrorMessage,
    }),
    [id, invalid, required, disabled, readOnly, hasHelperText, hasErrorMessage],
  );

  return (
    <FormControlContext.Provider value={ctx}>
      <div
        ref={ref}
        className={cn(styles.root, className)}
        {...rest}
        {...hooks("form-control", "root", {
          disabled,
          invalid,
          readonly: readOnly,
          required,
        })}
      >
        {children}
      </div>
    </FormControlContext.Provider>
  );
};

/** Label of the closest FormControl's control, with a required indicator. */
export const FormLabel = ({
  requiredIndicator = "*",
  className,
  children,
  htmlFor,
  ref,
  ...rest
}: FormLabelProps) => {
  const ctx = useFormControlContext();
  return (
    <label
      ref={ref}
      id={ctx?.labelId}
      htmlFor={htmlFor ?? ctx?.id}
      className={cn(styles.label, className)}
      {...rest}
      {...hooks("form-control", "label")}
    >
      {children}
      {ctx?.required && (
        <span
          className={styles.required}
          aria-hidden="true"
          {...hooks("form-control", "required-indicator")}
        >
          {requiredIndicator}
        </span>
      )}
    </label>
  );
};

/**
 * Registers a rendered helper / error element so aria-describedby only
 * references ids that exist (layout effect: correct before paint).
 */
function useRegistration(
  register: ((present: boolean) => void) | undefined,
  present: boolean,
) {
  useLayoutEffect(() => {
    if (!register || !present) return;
    register(true);
    return () => register(false);
  }, [register, present]);
}

/** Help text of the field; replaced by FormErrorMessage while invalid. */
export const FormHelperText = ({
  className,
  children,
  ref,
  ...rest
}: FormHelperTextProps) => {
  const ctx = useFormControlContext();
  const visible = !ctx?.invalid;
  useRegistration(ctx?.registerHelperText, visible);
  if (!visible) return null;
  return (
    <div
      ref={ref}
      id={ctx?.helperId}
      className={cn(styles.helper, className)}
      {...rest}
      {...hooks("form-control", "helper-text")}
    >
      {children}
    </div>
  );
};

/** Error message of the field; only rendered while the FormControl is invalid. */
export const FormErrorMessage = ({
  className,
  children,
  ref,
  ...rest
}: FormErrorMessageProps) => {
  const ctx = useFormControlContext();
  const visible = Boolean(ctx?.invalid);
  useRegistration(ctx?.registerErrorMessage, visible);
  if (!ctx || !visible) return null;
  return (
    <div
      ref={ref}
      id={ctx.errorId}
      role="alert"
      className={cn(styles.error, className)}
      {...rest}
      {...hooks("form-control", "error-message")}
    >
      {children}
    </div>
  );
};

/** FormControl + FormLabel + helper text + error message in one component. */
export const FormField = ({
  label,
  helperText,
  errorMessage,
  children,
  invalid = Boolean(errorMessage),
  ...rest
}: FormFieldProps) => (
  <FormControl invalid={invalid} {...rest}>
    <FormLabel>{label}</FormLabel>
    {children}
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
    {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
  </FormControl>
);

export default FormControl;
