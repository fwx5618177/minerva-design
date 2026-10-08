import { useLayoutEffect, useState, useSyncExternalStore } from "react";
import type { Machine } from "@minerva/core";

/**
 * Runs a headless @minerva/core machine in a component.
 *
 * - The machine is created once from the first props (`create(props)`).
 * - The latest props are synced after every commit (`setProps`), so events
 *   sent from handlers see the current controlled values and callbacks.
 * - The state is read through `useSyncExternalStore` (SSR safe: the server
 *   snapshot is the same store state) and projected with the render's props,
 *   so controlled values show up in the same render, before they are synced.
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
