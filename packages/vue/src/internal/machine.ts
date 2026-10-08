import {
  computed,
  onScopeDispose,
  shallowRef,
  watchEffect,
  type ComputedRef,
} from "vue";
import type { Machine } from "@minerva/core";

/**
 * Runs a headless @minerva/core machine in a component (the Vue counterpart
 * of React's `useMachine`): created once from the first props, the latest
 * props synced synchronously (`setProps`), the state exposed as a computed
 * projected with the current props (controlled values show up right away).
 */
export function useMachine<S extends object, E, P extends object>(
  create: (props: P) => Machine<S, E, P>,
  props: () => P,
): {
  state: ComputedRef<S>;
  send: Machine<S, E, P>["send"];
  machine: Machine<S, E, P>;
} {
  const machine = create(props());
  const snapshot = shallowRef(machine.getState());
  const unsubscribe = machine.subscribe((state) => {
    snapshot.value = state;
  });
  onScopeDispose(unsubscribe);
  watchEffect(() => machine.setProps(props()), { flush: "sync" });
  return {
    state: computed(() => machine.project(snapshot.value, props())),
    send: machine.send,
    machine,
  };
}
