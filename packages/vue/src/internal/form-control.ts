import {
  computed,
  inject,
  type ComputedRef,
  type InjectionKey,
  type Ref,
} from "vue";

/**
 * State of the closest `FormControl` (provided by FormControl.vue): ids and
 * flags the field components (Input, Select, Switch...) wire into their
 * control, exactly like the React `FormControlContext`.
 */
export interface FormControlContext {
  id: ComputedRef<string>;
  labelId: ComputedRef<string>;
  helperId: ComputedRef<string>;
  errorId: ComputedRef<string>;
  invalid: ComputedRef<boolean>;
  required: ComputedRef<boolean>;
  disabled: ComputedRef<boolean>;
  readOnly: ComputedRef<boolean>;
  /** Number of mounted helper texts / error messages */
  helperTexts: Ref<number>;
  errorMessages: Ref<number>;
}

export const FORM_CONTROL_KEY: InjectionKey<FormControlContext> = Symbol(
  "minerva-form-control",
);

export const useFormControlContext = (): FormControlContext | null =>
  inject(FORM_CONTROL_KEY, null);

/** Whether an `aria-invalid` value announces an error (`"false"` does not). */
export const isAriaInvalid = (value: unknown): boolean =>
  value !== undefined && value !== null && value !== false && value !== "false";

/** Own props / attributes of a field control, before the FormControl wiring */
export interface ControlInput {
  id?: string;
  disabled?: boolean;
  readOnly?: boolean;
  "aria-describedby"?: string;
  "aria-invalid"?: unknown;
}

/** Attributes of a field control after the FormControl wiring */
export interface WiredControl {
  id: string | undefined;
  disabled: boolean;
  readOnly: boolean;
  "aria-describedby": string | undefined;
  "aria-invalid": boolean | "true" | "grammar" | "spelling" | undefined;
  "aria-required": true | undefined;
  "aria-readonly": true | undefined;
}

/**
 * Wires a field control into the closest `FormControl` (id, `aria-*`,
 * disabled / read-only), like `useFormControlProps` of React: the error
 * message describes the control while invalid, the helper text otherwise.
 * Outside of a FormControl the input passes through.
 */
export function useFormControlProps(
  input: () => ControlInput,
): ComputedRef<WiredControl> {
  const ctx = useFormControlContext();
  return computed<WiredControl>(() => {
    const own = input();
    const ownInvalid = own["aria-invalid"] as WiredControl["aria-invalid"];
    if (!ctx) {
      return {
        id: own.id,
        disabled: !!own.disabled,
        readOnly: !!own.readOnly,
        "aria-describedby": own["aria-describedby"],
        "aria-invalid": ownInvalid === ("false" as never) ? false : ownInvalid,
        "aria-required": undefined,
        "aria-readonly": undefined,
      };
    }
    const describedBy = [
      ctx.invalid.value && ctx.errorMessages.value > 0
        ? ctx.errorId.value
        : null,
      !ctx.invalid.value && ctx.helperTexts.value > 0
        ? ctx.helperId.value
        : null,
      own["aria-describedby"],
    ]
      .filter(Boolean)
      .join(" ");
    return {
      id: own.id ?? ctx.id.value,
      disabled: ctx.disabled.value || !!own.disabled,
      readOnly: ctx.readOnly.value || !!own.readOnly,
      "aria-describedby": describedBy || undefined,
      "aria-invalid": ctx.invalid.value
        ? true
        : ownInvalid === ("false" as never)
          ? false
          : ownInvalid,
      "aria-required": ctx.required.value ? true : undefined,
      "aria-readonly": ctx.readOnly.value ? true : undefined,
    };
  });
}
