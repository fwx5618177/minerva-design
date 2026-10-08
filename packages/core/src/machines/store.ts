// Base of the headless state machines: a tiny immutable store and a
// props-aware machine (controlled / uncontrolled values, `SYNC` events) that
// every renderer drives the same way (React `useSyncExternalStore`, Lit
// reactive controllers, Vue refs, Angular signals, mini-program `setData`).
// Platform-neutral: no DOM, timers go through an injectable `Scheduler`.

/** Called after every state change with the new and the previous state. */
export type StoreListener<S> = (state: S, prev: S) => void;

/** Read / subscribe half shared by every store and machine. */
export interface ReadableStore<S> {
  /** Current state (a new object after every change, never mutated). */
  getState(): S;
  /** Listens to changes; returns the unsubscribe function. */
  subscribe(listener: StoreListener<S>): () => void;
}

/** The common shape of a machine: state, events and change listeners. */
export interface Store<S, E> extends ReadableStore<S> {
  /** Sends an event; listeners run only when the state actually changed. */
  send(event: E): void;
}

/** A writable store (the building block of the machines). */
export interface WritableStore<S> extends ReadableStore<S> {
  /** Replaces the state (or derives it); no-op when equal to the current one. */
  setState(next: S | ((prev: S) => S)): void;
}

export interface CreateStoreOptions<S> {
  /**
   * Equality deciding whether a new state is a change.
   * @default shallowEqual (same keys, `Object.is` values)
   */
  equals?: (a: S, b: S) => boolean;
}

/** Same own keys with `Object.is` values (or the same value). */
export function shallowEqual<T>(a: T, b: T): boolean {
  if (Object.is(a, b)) return true;
  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    a === null ||
    b === null ||
    Array.isArray(a) !== Array.isArray(b)
  ) {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (
      !Object.prototype.hasOwnProperty.call(b, key) ||
      !Object.is(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key],
      )
    ) {
      return false;
    }
  }
  return true;
}

/**
 * Minimal immutable store: `setState` with an equal state (see `equals`) is a
 * no-op, listeners receive `(state, prev)` and may unsubscribe while being
 * notified. `getState` / `subscribe` are bound (safe to pass around, e.g. to
 * `useSyncExternalStore`).
 */
export function createStore<S>(
  initial: S,
  options: CreateStoreOptions<S> = {},
): WritableStore<S> {
  const equals = options.equals ?? shallowEqual;
  let state = initial;
  const listeners = new Set<StoreListener<S>>();
  return {
    getState: () => state,
    setState(next) {
      const value =
        typeof next === "function" ? (next as (prev: S) => S)(state) : next;
      if (equals(value, state)) return;
      const prev = state;
      state = value;
      for (const listener of [...listeners]) listener(state, prev);
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

// ---------------------------------------------------------------------------
// Scheduler

/** Opaque timer handle of a `Scheduler`. */
export type SchedulerHandle = unknown;

/**
 * Time source of the machines with timers (toast auto-dismiss...). Inject one
 * to drive time yourself (tests, React Native / mini-program timers, a
 * paused game loop...).
 */
export interface Scheduler {
  setTimeout(callback: () => void, ms: number): SchedulerHandle;
  clearTimeout(handle: SchedulerHandle): void;
  /** Current time in milliseconds. */
  now(): number;
}

/**
 * The engine's timers, read at call time (fake timers and polyfills installed
 * after this module loaded are honored).
 */
export const defaultScheduler: Scheduler = {
  setTimeout: (callback, ms) => globalThis.setTimeout(callback, ms),
  clearTimeout: (handle) =>
    globalThis.clearTimeout(handle as ReturnType<typeof setTimeout>),
  now: () => Date.now(),
};

// ---------------------------------------------------------------------------
// Props-aware machine

/**
 * Updates the props of a machine (sent by framework adapters on every render
 * / property change). A controlled key set to `undefined` switches it back to
 * uncontrolled (its last value is kept).
 */
export interface SyncEvent<P> {
  type: "SYNC";
  props: Partial<P>;
}

/** A machine: a store driven by events and by its props. */
export interface Machine<S, E, P> extends Store<S, E | SyncEvent<P>> {
  /** Current props. */
  getProps(): Readonly<P>;
  /** Same as `send({ type: "SYNC", props })`. */
  setProps(props: Partial<P>): void;
  /**
   * The state `state` would be with `props` applied (controlled values and
   * normalization), without committing anything: lets adapters render
   * controlled values right away (before their props are synced).
   */
  project(state: S, props?: Partial<P>): S;
}

/** Definition of a machine (pure functions only). */
export interface MachineDefinition<S, E, P> {
  /** First state, from the initial props. */
  initial(props: P): S;
  /** Next state for `event` (return `state` itself when nothing changes). */
  reduce(state: S, event: E, props: P): S;
  /**
   * Keys of the state mirrored by props of the same name when those are not
   * `undefined` (controlled values).
   */
  controlled?: readonly (keyof S & keyof P)[];
  /**
   * Derived / clamped fields recomputed after every event and props change
   * (`prev`: the committed state the change starts from).
   */
  normalize?(state: S, props: P, prev: S): S;
  /**
   * Change callbacks: `requested` is the state an event asked for (before
   * controlled values are re-applied), `prev` the committed state before it.
   * Runs after the new state is committed and listeners notified.
   */
  changed?(requested: S, prev: S, props: P): void;
}

const applyControlled = <S, P>(
  state: S,
  props: P,
  keys: readonly (keyof S & keyof P)[],
): S => {
  let next = state;
  for (const key of keys) {
    const value = props[key] as unknown;
    if (value !== undefined && !Object.is(next[key], value)) {
      next = { ...next, [key]: value };
    }
  }
  return next;
};

/**
 * Builds a machine from a pure definition.
 *
 * - `send(event)`: `reduce`, then `normalize`; controlled keys keep their
 *   prop value (the change is only reported through `changed`, the owner
 *   decides by syncing the prop); the result is committed (no-op when
 *   shallowly equal) and `changed` runs.
 * - `send({ type: "SYNC", props })` / `setProps(props)`: merges the props,
 *   re-applies controlled values and `normalize`; never calls `changed`.
 */
export function createMachine<S extends object, E, P extends object>(
  definition: MachineDefinition<S, E, P>,
  initialProps: P,
): Machine<S, E, P> {
  const keys = definition.controlled ?? [];
  let props: P = { ...initialProps };
  const normalize = (state: S, p: P, prev: S) =>
    definition.normalize ? definition.normalize(state, p, prev) : state;

  const first = definition.initial(props);
  const store = createStore<S>(
    normalize(applyControlled(first, props, keys), props, first),
  );

  const project = (state: S, partial?: Partial<P>): S => {
    const p = partial ? { ...props, ...partial } : props;
    return normalize(applyControlled(state, p, keys), p, state);
  };

  const send = (event: E | SyncEvent<P>) => {
    const prev = store.getState();
    if ((event as SyncEvent<P>)?.type === "SYNC") {
      props = { ...props, ...(event as SyncEvent<P>).props };
      store.setState(project(prev));
      return;
    }
    const reduced = definition.reduce(prev, event as E, props);
    if (reduced === prev) return;
    // Controlled values are re-applied before normalizing, so derived fields
    // follow the value actually kept (a rejected change leaves no trace).
    store.setState(
      normalize(applyControlled(reduced, props, keys), props, prev),
    );
    definition.changed?.(normalize(reduced, props, prev), prev, props);
  };

  return {
    getState: store.getState,
    subscribe: store.subscribe,
    send,
    getProps: () => props,
    setProps: (partial) => send({ type: "SYNC", props: partial }),
    project,
  };
}

/** Whether the value of `key` differs between two states. */
export const changedKey = <S>(a: S, b: S, key: keyof S): boolean =>
  !Object.is(a[key], b[key]);
