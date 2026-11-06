import {
  useLayoutEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { Machine } from "@minerva/core";

type MachineResult<S, E, P, Selected> = [
  state: Selected,
  send: Machine<S, E, P>["send"],
  machine: Machine<S, E, P>,
];

// Each render owns its selection cache, so concurrent renders cannot overwrite
// another render's projection. Mutation stays inside the external-store getter.
function createSnapshotGetter<S extends object, E, P extends object, Selected>(
  machine: Machine<S, E, P>,
  props: P,
  select: ((state: S) => Selected) | undefined,
  equals: (a: Selected, b: Selected) => boolean,
) {
  let initialized = false;
  let previous: S;
  let selected: Selected;
  return () => {
    const state = machine.getState();
    if (!initialized || state !== previous) {
      const projected = machine.project(state, props);
      // The overload without a selector always returns S.
      const next = select
        ? select(projected)
        : (projected as unknown as Selected);
      if (!initialized || !equals(selected, next)) selected = next;
      previous = state;
      initialized = true;
    }
    return selected;
  };
}

export function useMachine<S extends object, E, P extends object>(
  create: (props: P) => Machine<S, E, P>,
  props: P,
): MachineResult<S, E, P, S>;
export function useMachine<S extends object, E, P extends object, Selected>(
  create: (props: P) => Machine<S, E, P>,
  props: P,
  select: (state: S) => Selected,
  equals?: (a: Selected, b: Selected) => boolean,
): MachineResult<S, E, P, Selected>;
/**
 * Runs one headless machine per component. Current props are projected during
 * render and synced after commit, preserving controlled values and callbacks.
 * An optional selector keeps unrelated machine updates out of the component;
 * equal selections retain their identity for useSyncExternalStore. Snapshots
 * are cached even when project/select creates an object, including on SSR.
 */
export function useMachine<S extends object, E, P extends object, Selected = S>(
  create: (props: P) => Machine<S, E, P>,
  props: P,
  select?: (state: S) => Selected,
  equals: (a: Selected, b: Selected) => boolean = Object.is,
): MachineResult<S, E, P, Selected> {
  const [machine] = useState(() => create(props));
  useLayoutEffect(() => {
    machine.setProps(props);
  });
  const getSnapshot = useMemo(
    () => createSnapshotGetter(machine, props, select, equals),
    [machine, props, select, equals],
  );
  const snapshot = useSyncExternalStore(
    machine.subscribe,
    getSnapshot,
    getSnapshot,
  );
  return [snapshot, machine.send, machine];
}
