// Form field state and validation: value, touched / dirty, sync validators
// (required, min / max, minLength / maxLength, pattern, email, custom) and
// optional async ones, with error messages translated from the
// `validation.*` keys of the message bundles (en / zh / ja / fr).
import { createTranslator, type TranslateFunction } from "../i18n/translate";
import { messages } from "../i18n";
import { createMachine, type Machine } from "./store";

/** A validation failure: an i18n key, its interpolation values and the message. */
export interface FieldError {
  /** Message key, e.g. "validation.valueMissing". */
  key: string;
  /** Interpolation values of the message (`{{min}}`...). */
  params?: Record<string, unknown>;
  /** Translated message (filled by the machine). */
  message: string;
}

/** What a validator reports: `null` / `undefined` when the value is valid. */
export type FieldValidationResult = Omit<FieldError, "message"> & {
  message?: string;
};

/** A synchronous validator. */
export type FieldValidator<V> = (
  value: V,
) => FieldValidationResult | null | undefined;

/** An asynchronous validator (runs once every sync validator passed). */
export type FieldAsyncValidator<V> = (
  value: V,
) => Promise<FieldValidationResult | null | undefined>;

/** "Empty" for the validators: `undefined`, `null`, `""`, `[]` or `false`. */
export const isEmptyFieldValue = (value: unknown): boolean =>
  value === undefined ||
  value === null ||
  value === "" ||
  value === false ||
  (Array.isArray(value) && value.length === 0);

const lengthOf = (value: unknown): number | undefined =>
  typeof value === "string" || Array.isArray(value) ? value.length : undefined;

// Same rule as the HTML input type="email" (WHATWG)
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Built-in validators. Every one but `required` accepts empty values (combine
 * with `required`). `key` overrides the message key.
 */
export const fieldValidators = {
  /** Fails on empty values ("validation.valueMissing"). */
  required:
    (key = "validation.valueMissing"): FieldValidator<unknown> =>
    (value) =>
      isEmptyFieldValue(value) ? { key } : null,
  /** Number below `min` ("validation.rangeUnderflow"). */
  min:
    (min: number, key = "validation.rangeUnderflow"): FieldValidator<unknown> =>
    (value) =>
      typeof value === "number" && value < min
        ? { key, params: { min } }
        : null,
  /** Number above `max` ("validation.rangeOverflow"). */
  max:
    (max: number, key = "validation.rangeOverflow"): FieldValidator<unknown> =>
    (value) =>
      typeof value === "number" && value > max
        ? { key, params: { max } }
        : null,
  /** Text / list shorter than `min` ("validation.tooShort"). */
  minLength:
    (min: number, key = "validation.tooShort"): FieldValidator<unknown> =>
    (value) => {
      const length = lengthOf(value);
      return length !== undefined && length > 0 && length < min
        ? { key, params: { min } }
        : null;
    },
  /** Text / list longer than `max` ("validation.tooLong"). */
  maxLength:
    (max: number, key = "validation.tooLong"): FieldValidator<unknown> =>
    (value) => {
      const length = lengthOf(value);
      return length !== undefined && length > max
        ? { key, params: { max } }
        : null;
    },
  /** Text not fully matching `pattern` ("validation.patternMismatch"). */
  pattern: (
    pattern: RegExp | string,
    key = "validation.patternMismatch",
  ): FieldValidator<unknown> => {
    const source = typeof pattern === "string" ? pattern : pattern.source;
    const flags = typeof pattern === "string" ? "" : pattern.flags;
    // Whole-value match, like the HTML `pattern` attribute (no `g` state)
    const re = new RegExp(`^(?:${source})$`, flags.replace(/[gy]/g, ""));
    return (value) =>
      typeof value === "string" && value !== "" && !re.test(value)
        ? { key }
        : null;
  },
  /** Text that is not an email address ("validation.emailMismatch"). */
  email:
    (key = "validation.emailMismatch"): FieldValidator<unknown> =>
    (value) =>
      typeof value === "string" && value !== "" && !EMAIL_RE.test(value)
        ? { key }
        : null,
  /**
   * Custom rule: `test` returns whether the value is valid
   * ("validation.badInput" unless `key` / `message` is given).
   */
  custom:
    <V>(
      test: (value: V) => boolean,
      options: { key?: string; message?: string } = {},
    ): FieldValidator<V> =>
    (value) =>
      test(value)
        ? null
        : {
            key: options.key ?? "validation.badInput",
            message: options.message,
          },
};

/** When validation runs. */
export type FieldValidateOn = "change" | "blur" | "submit";

/** Validation status. */
export type FieldStatus = "idle" | "validating" | "valid" | "invalid";

export interface FieldProps<V> {
  /** Controlled value (`undefined`: uncontrolled). */
  value?: V;
  /** Initial value (and the RESET target). */
  defaultValue: V;
  /** Sync validators, run in order (every failure is reported). */
  validators?: readonly FieldValidator<V>[];
  /** Async validators, run once the sync ones pass (stale results are dropped). */
  asyncValidators?: readonly FieldAsyncValidator<V>[];
  /**
   * First validation: on every CHANGE, on BLUR, or only on VALIDATE (submit).
   * Once validated, every change re-validates. @default "blur"
   */
  validateOn?: FieldValidateOn;
  /** Translates the error keys. @default English messages */
  translate?: TranslateFunction;
  /** Value equality (dirty check). @default Object.is */
  equals?: (a: V, b: V) => boolean;
  /** Called with the requested value (controlled or not). */
  onValueChange?: (value: V) => void;
}

export interface FieldState<V> {
  value: V;
  /** The field lost focus at least once (or was submitted). */
  touched: boolean;
  /** The value differs from `defaultValue`. */
  dirty: boolean;
  /** Validation ran at least once since the last reset. */
  validated: boolean;
  status: FieldStatus;
  errors: readonly FieldError[];
  /** Id of the latest validation run (async results of older runs are dropped). */
  run: number;
}

export type FieldEvent<V> =
  | { type: "CHANGE"; value: V }
  | { type: "BLUR" }
  /** Validates now (e.g. on submit) and marks the field touched. */
  | { type: "VALIDATE" }
  /** Back to `value` (default: `defaultValue`), untouched, no errors. */
  | { type: "RESET"; value?: V }
  /** Result of the async validators of run `run` (sent by the machine). */
  | { type: "ASYNC_RESULT"; run: number; errors: readonly FieldError[] };

export interface FieldMachine<V> extends Machine<
  FieldState<V>,
  FieldEvent<V>,
  FieldProps<V>
> {
  /** Resolves once the validation in flight (if any) settled. */
  whenSettled(): Promise<FieldState<V>>;
}

const englishTranslator = /* @__PURE__ */ createTranslator({
  messages,
  language: "en",
});

/** Translates a validator result into a `FieldError`. */
export const toFieldError = (
  result: FieldValidationResult,
  translate: TranslateFunction = englishTranslator,
): FieldError => ({
  ...result,
  message:
    result.message ??
    translate(result.key, { ...result.params, defaultValue: result.key }),
});

/** Whether the field currently has validation errors. */
export const isFieldInvalid = <V>(state: FieldState<V>): boolean =>
  state.errors.length > 0;

/** Creates a field machine. */
export function createFieldMachine<V>(props: FieldProps<V>): FieldMachine<V> {
  const runSync = (value: V, p: FieldProps<V>): FieldError[] => {
    const errors: FieldError[] = [];
    for (const validate of p.validators ?? []) {
      const result = validate(value);
      if (result) errors.push(toFieldError(result, p.translate));
    }
    return errors;
  };

  const validate = (state: FieldState<V>, p: FieldProps<V>): FieldState<V> => {
    const errors = runSync(state.value, p);
    const pending = errors.length === 0 && (p.asyncValidators?.length ?? 0) > 0;
    return {
      ...state,
      validated: true,
      errors,
      status: pending ? "validating" : errors.length ? "invalid" : "valid",
      run: state.run + 1,
    };
  };

  const machine = createMachine<FieldState<V>, FieldEvent<V>, FieldProps<V>>(
    {
      controlled: ["value"],
      initial: (p) => ({
        value: p.value !== undefined ? p.value : p.defaultValue,
        touched: false,
        dirty: false,
        validated: false,
        status: "idle",
        errors: [],
        run: 0,
      }),
      reduce(state, event, p) {
        const validateOn = p.validateOn ?? "blur";
        switch (event.type) {
          case "CHANGE": {
            if (Object.is(event.value, state.value)) return state;
            const next = { ...state, value: event.value };
            return validateOn === "change" || state.validated
              ? validate(next, p)
              : next;
          }
          case "BLUR": {
            const next = state.touched ? state : { ...state, touched: true };
            return validateOn === "submit" && !state.validated
              ? next
              : validate(next, p);
          }
          case "VALIDATE":
            return validate({ ...state, touched: true }, p);
          case "RESET":
            return {
              ...state,
              value: event.value !== undefined ? event.value : p.defaultValue,
              touched: false,
              validated: false,
              status: "idle",
              errors: [],
              run: state.run + 1,
            };
          case "ASYNC_RESULT":
            if (event.run !== state.run || state.status !== "validating") {
              return state;
            }
            return {
              ...state,
              errors: event.errors,
              status: event.errors.length ? "invalid" : "valid",
            };
          default:
            return state;
        }
      },
      normalize(state, p) {
        const equals = p.equals ?? Object.is;
        const dirty = !equals(state.value, p.defaultValue);
        return dirty === state.dirty ? state : { ...state, dirty };
      },
      changed(requested, prev, p) {
        if (!Object.is(requested.value, prev.value)) {
          p.onValueChange?.(requested.value);
        }
      },
    },
    props,
  );

  let inFlight: Promise<void> | null = null;

  const startAsync = (state: FieldState<V>) => {
    const p = machine.getProps();
    const { run, value } = state;
    const current = Promise.all(
      (p.asyncValidators ?? []).map((validate) => validate(value)),
    ).then(
      (results) => {
        const errors = results
          .filter((r): r is FieldValidationResult => !!r)
          .map((r) => toFieldError(r, machine.getProps().translate));
        machine.send({ type: "ASYNC_RESULT", run, errors });
      },
      () => {
        // A failing async validator counts as an invalid value
        machine.send({
          type: "ASYNC_RESULT",
          run,
          errors: [
            toFieldError(
              { key: "validation.badInput" },
              machine.getProps().translate,
            ),
          ],
        });
      },
    );
    inFlight = current;
    current.then(() => {
      if (inFlight === current) inFlight = null;
    });
  };

  machine.subscribe((state, prev) => {
    if (state.status === "validating" && state.run !== prev.run) {
      startAsync(state);
    }
  });

  return {
    ...machine,
    async whenSettled() {
      while (inFlight) await inFlight;
      return machine.getState();
    },
  };
}
