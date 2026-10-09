import { computed, signal, untracked, type Signal } from "@angular/core";

/** A value owned by the parent when bound, by the component otherwise */
export interface Controllable<T> {
  /** The displayed value */
  readonly value: Signal<T>;
  /**
   * A user change: emits it (`xChange`); the displayed value only changes
   * when the component owns it (uncontrolled). When the parent binds the
   * value, it decides: `[(x)]` accepts it, a one-way `[x]` that keeps its
   * value rejects it (React's controlled mode).
   */
  set(next: T): void;
}

/**
 * React's controlled / uncontrolled value for a component without a core
 * machine: `bound()` is the parent's value (`undefined`: not bound, the
 * component keeps its own state starting at `initial()`).
 * Call in an injection context or a field initializer.
 */
export function controllable<T>(options: {
  bound: () => T | undefined;
  initial: () => T;
  emit: (value: T) => void;
  equal?: (a: T, b: T) => boolean;
}): Controllable<T> {
  const own = signal<{ value: T } | null>(null);
  const equal = options.equal ?? Object.is;
  const value = computed(() => {
    const bound = options.bound();
    if (bound !== undefined) return bound;
    return own()?.value ?? options.initial();
  });
  return {
    value,
    set(next) {
      if (equal(next, untracked(value))) return;
      if (untracked(options.bound) === undefined) own.set({ value: next });
      options.emit(next);
    },
  };
}
