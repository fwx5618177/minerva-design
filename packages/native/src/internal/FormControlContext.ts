import { createContext, useContext } from "react";
export interface FormControlContextValue {
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  label?: string;
  description?: string;
  id?: string;
}
export const FormControlContext = createContext<FormControlContextValue | null>(
  null,
);
export const useFormControlContext = () => useContext(FormControlContext);
/** Explicit control props win; surrounding field supplies omitted accessibility and state props. */
export function useFormControlProps<
  T extends {
    disabled?: boolean;
    readOnly?: boolean;
    invalid?: boolean;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    nativeID?: string;
  },
>(props: T): T {
  const field = useFormControlContext();
  if (!field) return props;
  return {
    ...props,
    disabled: props.disabled ?? field.disabled,
    readOnly: props.readOnly ?? field.readOnly,
    invalid: props.invalid ?? field.invalid,
    accessibilityLabel: props.accessibilityLabel ?? field.label,
    accessibilityHint:
      [
        props.accessibilityHint,
        field.description,
        field.required ? "Required" : undefined,
      ]
        .filter(Boolean)
        .join(". ") || undefined,
    nativeID: props.nativeID ?? field.id,
  };
}
