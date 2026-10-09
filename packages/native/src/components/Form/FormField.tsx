import {
  cloneElement,
  isValidElement,
  useContext,
  useEffect,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  Text,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import {
  createFieldMachine,
  fieldValidators,
  type FieldAsyncValidator,
  type FieldError,
  type FieldMachine,
  type FieldStatus,
  type FieldValidateOn,
  type FieldValidationResult,
  type FieldValidator,
} from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { getFormControlBinding } from "../../internal/formControl";
import { part } from "../../internal/parts";
import { textStyle, weight } from "../../internal/styles";
import { useMachine } from "../../internal/useMachine";
import { FormContext } from "./Form";

/** What a custom rule returns: `true` / nothing = valid, `false` = invalid, a string = the error message */
export type FormRuleResult = boolean | string | null | undefined;

/** Validation rules of a field (messages from the `validation.*` i18n keys) */
export interface FormFieldRules {
  /** Must not be empty (`""`, `null`, `false`, `[]`); a string is the message */
  required?: boolean | string;
  /** Must be an email address; a string is the message */
  email?: boolean | string;
  /** Smallest number */
  min?: number;
  /** Largest number */
  max?: number;
  /** Fewest characters / items */
  minLength?: number;
  /** Most characters / items */
  maxLength?: number;
  /** Whole-value pattern */
  pattern?: RegExp | string;
  /** Custom synchronous rule */
  validate?: (value: unknown) => FormRuleResult;
  /** Custom asynchronous rule (runs once the sync rules pass) */
  validateAsync?: (value: unknown) => Promise<FormRuleResult>;
}

/** Props given to the control (spread them on it) */
export interface FormFieldControlProps {
  /** The value, under `valuePropName` ("value" / "checked") */
  [prop: string]: unknown;
  onBlur: () => void;
  invalid: boolean;
}

/** State of the field given to a render-function child */
export interface FormFieldMeta {
  name?: string;
  /** First error message (`undefined`: valid) */
  error?: string;
  errors: readonly FieldError[];
  status: FieldStatus;
  touched: boolean;
  dirty: boolean;
}

export interface FormFieldProps extends Omit<ViewProps, "style" | "children"> {
  /** Name of the field in the Form values (required inside a Form) */
  name?: string;
  /** Label of the field */
  label?: ReactNode;
  /** Help text below the control (hidden while the field is invalid) */
  helperText?: ReactNode;
  /** Error message; makes the field invalid unless `invalid` is set */
  errorMessage?: ReactNode;
  /**
   * Forces the invalid state on / off (unset: invalid while a rule fails or
   * `errorMessage` is set)
   */
  invalid?: boolean;
  /**
   * Marks the field as required (indicator on the label, "required" for
   * screen readers) and adds the `required` rule
   * @default false
   */
  required?: boolean;
  /**
   * Disables the control (also set by a disabled Form)
   * @default false
   */
  disabled?: boolean;
  /**
   * Makes the control read-only (also set by a read-only Form)
   * @default false
   */
  readOnly?: boolean;
  /** Validation rules */
  rules?: FormFieldRules;
  /**
   * First validation on every change, on blur or only on submit (then
   * every change re-validates)
   * @default "blur"
   */
  validateOn?: FieldValidateOn;
  /**
   * Initial value @default the Form's `initialValues[name]`, else the
   * control's empty value ("", `false` for checked controls, `null` for
   * NumberInput / RadioGroup, `[]` for CheckboxGroup)
   */
  defaultValue?: unknown;
  /** Prop of the control holding the value @default the control's ("value" / "checked") */
  valuePropName?: string;
  /** Change callback of the control (first argument = new value) @default "onChange" */
  trigger?: string;
  /**
   * The control: one element (wired automatically: value, onChange,
   * onBlur, invalid, disabled, accessibility label) or a render function
   * receiving the control props and the field state
   */
  children:
    | ReactElement
    | ((control: FormFieldControlProps, meta: FormFieldMeta) => ReactNode);
  /** Style of the root view */
  style?: StyleProp<ViewStyle>;
}

const withMessage =
  <V,>(validate: FieldValidator<V>, message?: string): FieldValidator<V> =>
  (value) => {
    const result = validate(value);
    return result && message ? { ...result, message } : result;
  };

const ruleResult = (result: FormRuleResult): FieldValidationResult | null =>
  result === false
    ? { key: "validation.badInput" }
    : typeof result === "string"
      ? { key: "validation.badInput", message: result }
      : null;

function buildValidators(
  rules: FormFieldRules,
  required: boolean,
  requiredKey: string,
): FieldValidator<unknown>[] {
  const list: FieldValidator<unknown>[] = [];
  if (required || rules.required) {
    list.push(
      withMessage(
        fieldValidators.required(requiredKey),
        typeof rules.required === "string" ? rules.required : undefined,
      ),
    );
  }
  if (rules.email) {
    list.push(
      withMessage(
        fieldValidators.email(),
        typeof rules.email === "string" ? rules.email : undefined,
      ),
    );
  }
  if (rules.min !== undefined) list.push(fieldValidators.min(rules.min));
  if (rules.max !== undefined) list.push(fieldValidators.max(rules.max));
  if (rules.minLength !== undefined) {
    list.push(fieldValidators.minLength(rules.minLength));
  }
  if (rules.maxLength !== undefined) {
    list.push(fieldValidators.maxLength(rules.maxLength));
  }
  if (rules.pattern !== undefined) {
    list.push(fieldValidators.pattern(rules.pattern));
  }
  const custom = rules.validate;
  if (custom) list.push((value) => ruleResult(custom(value)));
  return list;
}

/**
 * A form field: label (with the required indicator), the control, helper
 * text and the error message (a polite live region). Validation runs on
 * the field machine of @minerva/core (`rules`, messages translated with
 * the current language); inside a `Form` the field registers under its
 * `name` and is validated / submitted / reset with the form.
 *
 *   <FormField name="email" label="Email" rules={{ required: true, email: true }}>
 *     <Input />
 *   </FormField>
 */
export function FormField({
  name,
  label,
  helperText,
  errorMessage,
  invalid: invalidProp,
  required = false,
  disabled = false,
  readOnly = false,
  rules = {},
  validateOn,
  defaultValue,
  valuePropName: valuePropNameProp,
  trigger: triggerProp,
  children,
  style,
  ...rest
}: FormFieldProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const form = useContext(FormContext);
  const element = isValidElement(children)
    ? (children as ReactElement<Record<string, unknown>>)
    : null;
  const binding = element ? getFormControlBinding(element.type) : {};
  const valuePropName = valuePropNameProp ?? binding.valuePropName ?? "value";
  const trigger = triggerProp ?? binding.trigger ?? "onChange";
  const emptyValue =
    "emptyValue" in binding
      ? binding.emptyValue
      : valuePropName === "checked"
        ? false
        : "";
  const initialValue =
    defaultValue !== undefined
      ? defaultValue
      : name !== undefined && form?.initialValues?.[name] !== undefined
        ? form.initialValues[name]
        : emptyValue;
  const isRequired = required || !!rules.required;
  const validateAsync = rules.validateAsync;
  const asyncValidators: FieldAsyncValidator<unknown>[] = validateAsync
    ? [async (value) => ruleResult(await validateAsync(value))]
    : [];
  const mode = validateOn ?? form?.validateOn ?? "blur";

  const [state, send, machine] = useMachine(createFieldMachine<unknown>, {
    defaultValue: initialValue,
    validators: buildValidators(
      rules,
      required,
      binding.requiredKey ?? "validation.valueMissing",
    ),
    asyncValidators,
    validateOn: mode,
    translate,
  });

  const store = form?.store;
  useEffect(() => {
    if (!store || name === undefined) return;
    return store.register(name, machine as FieldMachine<unknown>);
  }, [store, name, machine]);

  const message =
    errorMessage !== undefined && errorMessage !== null
      ? errorMessage
      : state.errors[0]?.message;
  const invalid =
    invalidProp ??
    ((errorMessage !== undefined && errorMessage !== null) ||
      state.errors.length > 0);
  const isDisabled = disabled || !!form?.disabled;
  const isReadOnly = readOnly || !!form?.readOnly;
  const textLabel = typeof label === "string" ? label : undefined;
  const hint = typeof message === "string" && invalid ? message : undefined;

  const change = (value: unknown) => {
    send({ type: "CHANGE", value });
    if (binding.commitOnChange && mode === "blur") send({ type: "BLUR" });
  };
  const blur = () => send({ type: "BLUR" });

  let control: ReactNode;
  if (element) {
    const own = element.props;
    const injected: Record<string, unknown> = {
      [valuePropName]: state.value,
      [trigger]: (...args: unknown[]) => {
        change(args[0]);
        (own[trigger] as ((...a: unknown[]) => void) | undefined)?.(...args);
      },
    };
    if (!binding.commitOnChange) {
      injected.onBlur = (...args: unknown[]) => {
        blur();
        (own.onBlur as ((...a: unknown[]) => void) | undefined)?.(...args);
      };
    }
    const invalidPropName =
      binding.invalidPropName === undefined
        ? "invalid"
        : binding.invalidPropName;
    if (invalidPropName && invalid) injected[invalidPropName] = true;
    if (isDisabled) injected.disabled = true;
    if (isReadOnly) injected.readOnly = true;
    if (
      textLabel !== undefined &&
      own.accessibilityLabel === undefined &&
      own.label === undefined
    ) {
      injected.accessibilityLabel = textLabel;
    }
    if (hint !== undefined && own.accessibilityHint === undefined) {
      injected.accessibilityHint = hint;
    }
    control = cloneElement(element, injected);
  } else if (typeof children === "function") {
    const props: FormFieldControlProps = {
      [valuePropName]: state.value,
      [trigger]: change,
      onBlur: blur,
      invalid,
    };
    if (isDisabled) props.disabled = true;
    if (isReadOnly) props.readOnly = true;
    control = children(props, {
      name,
      error: state.errors[0]?.message,
      errors: state.errors,
      status: state.status,
      touched: state.touched,
      dirty: state.dirty,
    });
  }

  return (
    <View
      {...part("form-field", "root", {
        invalid,
        required: isRequired,
        disabled: isDisabled,
        status: state.status,
      })}
      {...rest}
      style={[{ gap: t.space["1-5"] }, style]}
    >
      {label !== undefined && label !== null ? (
        <Text
          accessibilityLabel={
            textLabel !== undefined && isRequired
              ? `${textLabel}, ${translate("form.required")}`
              : undefined
          }
          style={{
            ...textStyle(t, "sm", fonts.sans),
            color: t.colors["text-secondary-color"],
            fontWeight: weight(t, "medium"),
          }}
          {...part("form-field", "label")}
        >
          {label}
          {isRequired ? (
            <Text
              style={{ color: t.colors["danger-color"] }}
              {...part("form-field", "required-indicator")}
            >
              {" *"}
            </Text>
          ) : null}
        </Text>
      ) : null}
      {control}
      {invalid && message !== undefined ? (
        <Text
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          aria-live="polite"
          style={{
            ...textStyle(t, "xs", fonts.sans),
            color: t.colors["danger-color"],
          }}
          {...part("form-field", "error")}
        >
          {message}
        </Text>
      ) : helperText !== undefined && helperText !== null ? (
        <Text
          style={{
            ...textStyle(t, "xs", fonts.sans),
            color: t.colors["text-muted-color"],
          }}
          {...part("form-field", "helper")}
        >
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}
