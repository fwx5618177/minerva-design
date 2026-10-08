import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { controlledSwitchMessage } from "./devWarnings";

type SetStateAction<T> = T | ((prev: T) => T);

export interface UseControllableStateOptions<T> {
  /** Controlled value. `undefined` means "uncontrolled". */
  value?: T;
  /** Initial value used while uncontrolled. */
  defaultValue: T | (() => T);
  /** Called with the next value whenever it changes (controlled or not). */
  onChange?: (value: T) => void;
  /**
   * Component name used by the development warnings, e.g. `"Tabs"`
   * (`"[minerva] Tabs: ..."`).
   */
  name?: string;
  /** Name of the controlled prop in the warnings. @default "value" */
  prop?: string;
  /**
   * Name of the uncontrolled prop in the warnings.
   * @default `default${Prop}` (e.g. "defaultValue")
   */
  defaultProp?: string;
}

const defaultPropOf = (prop: string) =>
  `default${prop.charAt(0).toUpperCase()}${prop.slice(1)}`;

/**
 * Development only: warns (once per component instance) when a component
 * switches between controlled (`isControlled`) and uncontrolled during its
 * lifetime, like React does for native inputs. Call it unconditionally; the
 * whole check is stripped from production builds.
 */
export function useControlledSwitchWarning(
  isControlled: boolean,
  component: string,
  prop = "value",
  defaultProp = defaultPropOf(prop),
): void {
  if (process.env.NODE_ENV !== "production") {
    // The condition is a build-time constant: the hooks below run in every
    // render of a development build, and never in production.
    /* eslint-disable react-hooks/rules-of-hooks */
    const initial = useRef(isControlled);
    const warned = useRef(false);
    useEffect(() => {
      if (warned.current || isControlled === initial.current) return;
      warned.current = true;
      console.error(
        controlledSwitchMessage(component, prop, defaultProp, isControlled),
      );
    }, [isControlled, component, prop, defaultProp]);
    /* eslint-enable react-hooks/rules-of-hooks */
  }
}

/**
 * Shared controlled / uncontrolled state for components.
 *
 * - When `value` is not `undefined` the component is controlled: the returned
 *   value always mirrors `value` and the setter only calls `onChange`.
 * - Otherwise the value lives in internal state seeded from `defaultValue`.
 *
 * `onChange` is invoked from the setter itself (never inside a state updater),
 * so it fires exactly once per change, also under StrictMode.
 *
 * In development it warns when `value` switches between `undefined` and a
 * defined value (pass `name` / `prop` for a helpful message).
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
  name = "Component",
  prop = "value",
  defaultProp,
}: UseControllableStateOptions<T>): [T, (next: SetStateAction<T>) => void] {
  const [internal, setInternal] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  useControlledSwitchWarning(isControlled, name, prop, defaultProp);
  const current = isControlled ? value : internal;

  // Latest value / callback, read by the stable setter. Synced after commit so
  // render stays pure.
  const currentRef = useRef(current);
  const onChangeRef = useRef(onChange);
  useLayoutEffect(() => {
    currentRef.current = current;
    onChangeRef.current = onChange;
  });

  const setValue = useCallback(
    (next: SetStateAction<T>) => {
      const prev = currentRef.current;
      const resolved =
        typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      if (Object.is(resolved, prev)) return;
      if (!isControlled) {
        // Consecutive calls in the same event see the latest value. Controlled
        // components wait for the parent: a rejected change must not stick.
        currentRef.current = resolved;
        setInternal(resolved);
      }
      onChangeRef.current?.(resolved);
    },
    [isControlled],
  );

  return [current, setValue];
}
