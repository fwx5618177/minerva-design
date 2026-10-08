import { useLayoutEffect, useState, useSyncExternalStore } from "react";
import type { Machine } from "@minerva/core";

/**
 * Runs a headless @minerva/core machine in a component (same contract as
 * the React DOM renderer): created once from the first props, the latest
 * props synced after every commit (handlers see current controlled values
 * and callbacks), the state read through `useSyncExternalStore` and
 * projected with the render's props (controlled values show at once).
 */
export function useMachine<S extends object, E, P extends object>(
  create: (props: P) => Machine<S, E, P>,
  props: P,
): [state: S, send: Machine<S, E, P>["send"], machine: Machine<S, E, P>] {
  const [machine] = useState(() => create(props));
  useLayoutEffect(() => {
    machine.setProps(props);
  });
  const snapshot = useSyncExternalStore(
    machine.subscribe,
    machine.getState,
    machine.getState,
  );
  return [machine.project(snapshot, props), machine.send, machine];
}
