import {
  createContext,
  useContext,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type Ref,
} from "react";
import {
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import type { FieldValidateOn } from "@minerva/core";
import { useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import {
  createFormStore,
  type FormApi,
  type FormErrors,
  type FormSnapshot,
  type FormStore,
  type FormValues,
} from "./formStore";

/** A form handle: the imperative API, its reactive state and its registry */
export interface FormInstance extends FormApi, FormSnapshot {
  /** The field registry (pass the whole instance to `<Form form>`) */
  store: FormStore;
}

export interface FormContextValue {
  store: FormStore;
  initialValues?: FormValues;
  validateOn?: FieldValidateOn;
  disabled: boolean;
  readOnly: boolean;
}

export const FormContext = createContext<FormContextValue | null>(null);

/**
 * Creates a form handle for `<Form form={form}>`: `submit()`, `reset()`,
 * `validate()`, `setFieldValue()` and the reactive `values`, `errors`,
 * `isValid`, `isSubmitting`... (the component re-renders on changes).
 */
export function useForm(): FormInstance {
  const [store] = useState(createFormStore);
  const snapshot = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot,
  );
  return useMemo(
    () => ({ ...store.api, ...snapshot, store }),
    [store, snapshot],
  );
}

/** The API of the enclosing Form (`null` outside a Form) */
export function useFormContext(): FormApi | null {
  return useContext(FormContext)?.store.api ?? null;
}

export interface FormProps extends Omit<ViewProps, "style"> {
  /** A handle from `useForm()` (else the form keeps its own) */
  form?: FormInstance;
  /** Initial values of the fields, by name */
  initialValues?: FormValues;
  /** Called with the values on a submit where every field is valid */
  onSubmit?: (values: FormValues) => void | Promise<void>;
  /** Called with the errors on a submit where a field is invalid */
  onSubmitFailed?: (errors: FormErrors) => void;
  /**
   * When the fields validate first (each FormField may override it)
   * @default "blur"
   */
  validateOn?: FieldValidateOn;
  /**
   * Disables every field
   * @default false
   */
  disabled?: boolean;
  /**
   * Makes every field read-only
   * @default false
   */
  readOnly?: boolean;
  /** FormFields and any other content (e.g. a submit Button) */
  children?: ReactNode;
  /** Style of the root view */
  style?: StyleProp<ViewStyle>;
  /** The form API (submit, reset, validate...) */
  ref?: Ref<FormApi>;
}

/**
 * A form: a registry of `FormField`s (validated by the field machine of
 * @minerva/core). `submit()` (from `useForm()`, the `ref` or
 * `useFormContext()`) validates every field, awaits the async validators,
 * then calls `onSubmit(values)` or `onSubmitFailed(errors)`.
 */
export function Form({
  form,
  initialValues,
  onSubmit,
  onSubmitFailed,
  validateOn,
  disabled = false,
  readOnly = false,
  children,
  style,
  ref,
  ...rest
}: FormProps) {
  const { tokens: t } = useTheme();
  const [ownStore] = useState(createFormStore);
  const store = form?.store ?? ownStore;
  useLayoutEffect(() => {
    store.setHandlers({ onSubmit, onSubmitFailed });
  });
  useImperativeHandle(ref, () => store.api, [store]);
  const context = useMemo(
    () => ({ store, initialValues, validateOn, disabled, readOnly }),
    [store, initialValues, validateOn, disabled, readOnly],
  );

  return (
    <FormContext.Provider value={context}>
      <View
        role="form"
        {...part("form", "root", { disabled })}
        {...rest}
        style={[{ gap: t.space["4"] }, style]}
      >
        {children}
      </View>
    </FormContext.Provider>
  );
}
