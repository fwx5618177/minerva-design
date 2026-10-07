/** A new value, or an updater receiving the current value. */
export type SetStateAction<T> = T | ((prev: T) => T);

export interface ControllableStateOptions<T> {
  /**
   * Controlled value. When not `undefined` the state is controlled: `set()`
   * only notifies `onChange` and the owner is expected to feed the new value
   * back through `setControlledValue()`.
   */
  value?: T;
  /** Initial value used while uncontrolled. */
  defaultValue: T;
  /** Called once per actual change (not when setting an equal value). */
  onChange?: (value: T) => void;
  /** Equality check used to skip no-op updates. @default Object.is */
  equals?: (a: T, b: T) => boolean;
}

export interface ControllableState<T> {
  /** Current value (controlled value if controlled, else the stored one). */
  get(): T;
  /** Requests a change; fires `onChange` once if the value differs. */
  set(next: SetStateAction<T>): void;
  /**
   * Updates the controlled value (pass `undefined` to switch to uncontrolled
   * mode; the last controlled value then becomes the stored value).
   * Does NOT call `onChange` (the owner already knows), but notifies
   * subscribers when the visible value changes.
   */
  setControlledValue(value: T | undefined): void;
  /** Whether the state is currently controlled. */
  isControlled(): boolean;
  /**
   * Subscribes to visible value changes. Returns an unsubscribe function.
   * In controlled mode subscribers only fire on `setControlledValue`.
   */
  subscribe(listener: (value: T) => void): () => void;
}

/**
 * Framework-neutral "controlled / uncontrolled" state, the vanilla
 * equivalent of a `useControllableState` hook.
 *
 * - Uncontrolled: `set()` stores the value, notifies subscribers and calls
 *   `onChange`.
 * - Controlled (`value !== undefined`): `set()` never stores, it only calls
 *   `onChange` with the requested value; the owner decides whether to accept
 *   it via `setControlledValue()`.
 *
 * @example
 * const open = createControllableState({ defaultValue: false, onChange: console.log });
 * open.set((v) => !v); // logs `true`
 */
export function createControllableState<T>(
  options: ControllableStateOptions<T>,
): ControllableState<T> {
  const { onChange, equals = Object.is } = options;
  let controlled: T | undefined = options.value;
  let stored: T = options.defaultValue;
  const listeners = new Set<(value: T) => void>();

  const isControlled = () => controlled !== undefined;
  const get = (): T => (isControlled() ? (controlled as T) : stored);
  const emit = (value: T) => {
    for (const listener of [...listeners]) listener(value);
  };

  return {
    get,
    isControlled,
    set(next) {
      const prev = get();
      const value =
        typeof next === "function" ? (next as (prev: T) => T)(prev) : next;
      if (equals(prev, value)) return;
      if (!isControlled()) {
        stored = value;
        emit(value);
      }
      onChange?.(value);
    },
    setControlledValue(value) {
      const prev = get();
      if (value === undefined && controlled !== undefined) {
        // keep showing the last controlled value once uncontrolled
        stored = controlled;
      }
      controlled = value;
      const current = get();
      if (!equals(prev, current)) emit(current);
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
