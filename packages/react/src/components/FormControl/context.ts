import { createContext, useContext, type AriaAttributes } from "react";

/**
 * Field state shared by `FormControl` with the control inside it (Input,
 * Textarea, Select, Checkbox, ...). Controls call `useFormControlProps` to get
 * the id / aria wiring automatically.
 *
 * CONTRACT (used across component groups): the shape of this value and the
 * signature of `useFormControlProps` are stable.
 */
export interface FormControlContextValue {
  /** id of the control (the label's `htmlFor`). */
  id: string;
  /** id of the helper text element. */
  helperId: string;
  /** id of the error message element. */
  errorId: string;
  /** id of the label element. */
  labelId: string;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
  readOnly: boolean;
  /** Whether a helper / error element is currently rendered (aria-describedby only references existing ids). */
  hasHelperText: boolean;
  hasErrorMessage: boolean;
  registerHelperText: (present: boolean) => void;
  registerErrorMessage: (present: boolean) => void;
}

export const FormControlContext = createContext<FormControlContextValue | null>(
  null,
);

/** Field state of the closest `FormControl`, or `null` outside one. */
export function useFormControlContext(): FormControlContextValue | null {
  return useContext(FormControlContext);
}

type ControlProps = {
  id?: string;
  disabled?: boolean;
  readOnly?: boolean;
  "aria-describedby"?: string;
  "aria-invalid"?: AriaAttributes["aria-invalid"];
};

export type FormControlWiredProps<P> = P & {
  "aria-describedby"?: string;
  "aria-invalid"?: AriaAttributes["aria-invalid"];
  "aria-required"?: true;
  "aria-readonly"?: true;
  readOnly?: boolean;
  disabled?: boolean;
};

/**
 * Merge the closest `FormControl` state into a control's props: `id`,
 * `aria-describedby` (error when invalid, helper otherwise, plus any incoming
 * value), `aria-invalid`, `aria-required`, `aria-readonly`, `readOnly` and
 * `disabled`. Returns `props` unchanged outside a `FormControl`.
 */
export function useFormControlProps<P extends ControlProps>(
  props: P,
): FormControlWiredProps<P> {
  const ctx = useFormControlContext();
  if (!ctx) return props;

  const describedBy = [
    ctx.invalid && ctx.hasErrorMessage ? ctx.errorId : null,
    !ctx.invalid && ctx.hasHelperText ? ctx.helperId : null,
    props["aria-describedby"],
  ]
    .filter(Boolean)
    .join(" ");
  const incomingInvalid = props["aria-invalid"];

  return {
    ...props,
    id: props.id ?? ctx.id,
    "aria-describedby": describedBy || undefined,
    "aria-invalid": ctx.invalid
      ? true
      : incomingInvalid === "false"
        ? false
        : incomingInvalid,
    "aria-required": (ctx.required || undefined) as true | undefined,
    "aria-readonly": (ctx.readOnly || undefined) as true | undefined,
    // Only the native readOnly prevents editing; aria-readonly is a hint.
    readOnly: ctx.readOnly || props.readOnly,
    disabled: ctx.disabled || props.disabled,
  };
}
