// Registry of the fields of a Form: every FormField registers its field
// machine (@minerva/core) under its name; the store derives the values /
// errors snapshot, validates everything on submit (awaiting the async
// validators) and resets the fields.
import {
  isFieldInvalid,
  type FieldError,
  type FieldMachine,
} from "@minerva/core";

/** Values of the registered fields, by name */
export type FormValues = Record<string, unknown>;

/** Errors of the invalid fields, by name */
export type FormErrors = Record<string, FieldError[]>;

/** Reactive state of a form */
export interface FormSnapshot {
  /** Values of the registered fields */
  values: FormValues;
  /** Errors of the fields that failed validation */
  errors: FormErrors;
  /** No field currently has errors (fields not validated yet count as valid) */
  isValid: boolean;
  /** An async validator is running */
  isValidating: boolean;
  /** `submit()` is waiting for the validators / `onSubmit` */
  isSubmitting: boolean;
  /** A field value differs from its initial value */
  isDirty: boolean;
}

/** Imperative API of a form (`useForm()`, the Form `ref`, `useFormContext()`) */
export interface FormApi {
  /**
   * Validates every field (marking them touched), then calls `onSubmit`
   * with the values when all are valid, else `onSubmitFailed` with the
   * errors. Resolves with the validity.
   */
  submit: () => Promise<boolean>;
  /** Validates every field without submitting; resolves with the validity */
  validate: () => Promise<boolean>;
  /** Back to the initial values (or `values`), untouched, no errors */
  reset: (values?: FormValues) => void;
  /** Sets the value of a field (validated per its `validateOn`) */
  setFieldValue: (name: string, value: unknown) => void;
  /** Current values */
  getValues: () => FormValues;
  /** Current errors */
  getErrors: () => FormErrors;
}

export interface FormHandlers {
  onSubmit?: (values: FormValues) => void | Promise<void>;
  onSubmitFailed?: (errors: FormErrors) => void;
}

/** The registry behind a form */
export interface FormStore {
  api: FormApi;
  /** Adds a field; returns its removal */
  register: (name: string, machine: FieldMachine<unknown>) => () => void;
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => FormSnapshot;
  /** The submit callbacks of the Form currently rendering the store */
  setHandlers: (handlers: FormHandlers) => void;
}

export function createFormStore(): FormStore {
  const fields = new Map<string, FieldMachine<unknown>>();
  const listeners = new Set<() => void>();
  let handlers: FormHandlers = {};
  let submitting = false;

  const getValues = (): FormValues => {
    const values: FormValues = {};
    for (const [name, machine] of fields)
      values[name] = machine.getState().value;
    return values;
  };
  const getErrors = (): FormErrors => {
    const errors: FormErrors = {};
    for (const [name, machine] of fields) {
      const state = machine.getState();
      if (isFieldInvalid(state)) errors[name] = [...state.errors];
    }
    return errors;
  };
  const compute = (): FormSnapshot => {
    const errors = getErrors();
    const states = [...fields.values()].map((m) => m.getState());
    return {
      values: getValues(),
      errors,
      isValid: Object.keys(errors).length === 0,
      isValidating: states.some((s) => s.status === "validating"),
      isSubmitting: submitting,
      isDirty: states.some((s) => s.dirty),
    };
  };
  let snapshot = compute();
  const notify = () => {
    snapshot = compute();
    for (const listener of [...listeners]) listener();
  };

  const validate = async (): Promise<boolean> => {
    const machines = [...fields.values()];
    for (const machine of machines) machine.send({ type: "VALIDATE" });
    await Promise.all(machines.map((machine) => machine.whenSettled()));
    return Object.keys(getErrors()).length === 0;
  };

  const api: FormApi = {
    validate,
    async submit() {
      submitting = true;
      notify();
      try {
        const valid = await validate();
        if (valid) await handlers.onSubmit?.(getValues());
        else handlers.onSubmitFailed?.(getErrors());
        return valid;
      } finally {
        submitting = false;
        notify();
      }
    },
    reset(values) {
      for (const [name, machine] of fields) {
        machine.send(
          values && name in values
            ? { type: "RESET", value: values[name] }
            : { type: "RESET" },
        );
      }
    },
    setFieldValue(name, value) {
      fields.get(name)?.send({ type: "CHANGE", value });
    },
    getValues,
    getErrors,
  };

  return {
    api,
    register(name, machine) {
      fields.set(name, machine);
      const unsubscribe = machine.subscribe(notify);
      notify();
      return () => {
        unsubscribe();
        if (fields.get(name) === machine) fields.delete(name);
        notify();
      };
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot: () => snapshot,
    setHandlers(next) {
      handlers = next;
    },
  };
}
