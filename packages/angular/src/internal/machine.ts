import {
  DestroyRef,
  computed,
  effect,
  inject,
  signal,
  untracked,
  type Signal,
} from "@angular/core";
import type { Machine, ReadableStore } from "@minerva/core";

/**
 * The state of a headless machine of @minerva/core as a signal (the Angular
 * adapter of `{ getState, send, subscribe }`): updated on every machine
 * change, unsubscribed when the injection context is destroyed.
 */
export function machineState<S>(store: ReadableStore<S>): Signal<S> {
  const state = signal(store.getState());
  const unsubscribe = store.subscribe((next) => state.set(next));
  inject(DestroyRef).onDestroy(unsubscribe);
  return state.asReadonly();
}

/** A machine connected to a component (see `connectMachine`) */
export interface ConnectedMachine<S, E, P> {
  /** State with the current props applied (signal) */
  readonly state: Signal<S>;
  /** Sends an event to the machine */
  send(event: E): void;
  /** The machine (created on first use) */
  readonly machine: Machine<S, E, P>;
}

/**
 * Connects a props-aware machine of @minerva/core to signal inputs.
 *
 * - `create()` builds the machine on first use (template rendering or an
 *   event), when the inputs are set, so it can read initial values
 *   (`defaultValue`, `defaultChecked`...).
 * - `props()` is synced into the machine (`setProps`, controlled values,
 *   disabled...); `state` already applies it (`project`), so the template
 *   renders controlled values without waiting for the sync.
 *
 * Call in an injection context (field initializer).
 */
export function connectMachine<S extends object, E, P extends object>(
  create: () => Machine<S, E, P>,
  props: () => Partial<P> = () => ({}),
): ConnectedMachine<S, E, P> {
  const destroyRef = inject(DestroyRef);
  const version = signal(0);
  let machine: Machine<S, E, P> | undefined;
  const ensure = () => {
    if (!machine) {
      machine = untracked(create);
      const unsubscribe = machine.subscribe(() => version.update((v) => v + 1));
      destroyRef.onDestroy(unsubscribe);
    }
    return machine;
  };
  const current = computed(props);
  effect(() => {
    const next = current();
    untracked(() => ensure().setProps(next));
  });
  const state = computed(() => {
    version();
    const m = ensure();
    return m.project(m.getState(), current());
  });
  return {
    state,
    send: (event) => ensure().send(event),
    get machine() {
      return ensure();
    },
  };
}
