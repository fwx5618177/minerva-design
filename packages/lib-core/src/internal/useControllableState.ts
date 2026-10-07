import { useCallback, useLayoutEffect, useRef, useState } from "react";

type SetStateAction<T> = T | ((prev: T) => T);

export interface UseControllableStateOptions<T> {
  /** Controlled value. `undefined` means "uncontrolled". */
  value?: T;
  /** Initial value used while uncontrolled. */
  defaultValue: T | (() => T);
  /** Called with the next value whenever it changes (controlled or not). */
  onChange?: (value: T) => void;
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
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [T, (next: SetStateAction<T>) => void] {
  const [internal, setInternal] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
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
