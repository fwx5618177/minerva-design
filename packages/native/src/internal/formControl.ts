// How `FormField` wires a control it wraps: each form control declares its
// value prop ("value" / "checked"), its empty value, its error prop and its
// "required" message as a static `formControl` binding, so
// `<FormField name="x"><Switch /></FormField>` just works.

/** Form wiring of a control component */
export interface FormControlBinding {
  /** Prop holding the value @default "value" */
  valuePropName?: string;
  /** Change callback (first argument = the new value) @default "onChange" */
  trigger?: string;
  /** Value of an empty field (initial value / reset target) @default "" */
  emptyValue?: unknown;
  /**
   * A change is a commit (no text editing / blur): toggles, groups, rating.
   * The field then validates on change like it would on blur.
   * @default false
   */
  commitOnChange?: boolean;
  /** Prop showing the error state (`null`: none) @default "invalid" */
  invalidPropName?: string | null;
  /** Message key of the `required` rule @default "validation.valueMissing" */
  requiredKey?: string;
}

/** Attaches a form binding to a component (returns the component) */
export function bindFormControl<C extends object>(
  component: C,
  binding: FormControlBinding,
): C {
  (component as { formControl?: FormControlBinding }).formControl = binding;
  return component;
}

/** The form binding of a component type (`{}` when it declares none) */
export function getFormControlBinding(type: unknown): FormControlBinding {
  if ((typeof type === "function" || typeof type === "object") && type) {
    return (type as { formControl?: FormControlBinding }).formControl ?? {};
  }
  return {};
}
