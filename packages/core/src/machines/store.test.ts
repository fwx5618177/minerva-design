import { afterEach, describe, expect, it, vi } from "vitest";
import {
  changedKey,
  createMachine,
  createStore,
  defaultScheduler,
  shallowEqual,
} from "./store";

describe("shallowEqual", () => {
  it("compares own keys with Object.is", () => {
    const shared = {};
    expect(shallowEqual({ a: 1, b: shared }, { a: 1, b: shared })).toBe(true);
    expect(shallowEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(shallowEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    expect(shallowEqual({ a: 1, b: undefined }, { a: 1, c: undefined })).toBe(
      false,
    );
    expect(shallowEqual({ a: NaN }, { a: NaN })).toBe(true);
    expect(shallowEqual({ a: {} }, { a: {} })).toBe(false);
  });

  it("handles primitives, null and arrays", () => {
    expect(shallowEqual(1, 1)).toBe(true);
    expect(shallowEqual<unknown>(1, "1")).toBe(false);
    expect(shallowEqual<unknown>(null, {})).toBe(false);
    expect(shallowEqual<unknown>({}, null)).toBe(false);
    expect(shallowEqual([1, 2], [1, 2])).toBe(true);
    expect(shallowEqual<unknown>([1], { 0: 1 })).toBe(false);
  });
});

describe("createStore", () => {
  it("notifies (state, prev) on change and skips equal states", () => {
    const store = createStore({ count: 0 });
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);
    store.setState({ count: 0 });
    expect(listener).not.toHaveBeenCalled();
    store.setState((s) => ({ count: s.count + 1 }));
    expect(store.getState()).toEqual({ count: 1 });
    expect(listener).toHaveBeenCalledWith({ count: 1 }, { count: 0 });
    unsubscribe();
    store.setState({ count: 2 });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("accepts a custom equality and unsubscribing while notifying", () => {
    const store = createStore({ n: 0 }, { equals: Object.is });
    const second = vi.fn();
    const first = vi.fn(() => unsubscribeSecond());
    store.subscribe(first);
    const unsubscribeSecond = store.subscribe(second);
    store.setState({ n: 0 }); // a new object: a change with Object.is
    expect(first).toHaveBeenCalledTimes(1);
    // the snapshot of listeners still includes the second one
    expect(second).toHaveBeenCalledTimes(1);
    store.setState({ n: 1 });
    expect(second).toHaveBeenCalledTimes(1);
  });
});

describe("defaultScheduler", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("reads the engine timers at call time (fake timers apply)", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const before = defaultScheduler.now();
    const handle = defaultScheduler.setTimeout(fn, 100);
    vi.advanceTimersByTime(99);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(defaultScheduler.now() - before).toBe(100);
    const cancelled = vi.fn();
    const other = defaultScheduler.setTimeout(cancelled, 10);
    defaultScheduler.clearTimeout(other);
    defaultScheduler.clearTimeout(handle);
    vi.advanceTimersByTime(20);
    expect(cancelled).not.toHaveBeenCalled();
  });
});

interface CounterState {
  count: number;
  hovered: boolean;
}
interface CounterProps {
  count?: number;
  max?: number;
  onCountChange?: (count: number) => void;
}
type CounterEvent = { type: "INC" } | { type: "HOVER" } | { type: "NOOP" };

const createCounter = (props: CounterProps = {}, normalize = true) =>
  createMachine<CounterState, CounterEvent, CounterProps>(
    {
      controlled: ["count"],
      initial: () => ({ count: 0, hovered: false }),
      reduce(state, event) {
        if (event.type === "INC") return { ...state, count: state.count + 1 };
        if (event.type === "HOVER") return { ...state, hovered: true };
        return state;
      },
      normalize: normalize
        ? (state, p) =>
            p.max !== undefined && state.count > p.max
              ? { ...state, count: p.max }
              : state
        : undefined,
      changed(requested, prev, p) {
        if (changedKey(requested, prev, "count")) {
          p.onCountChange?.(requested.count);
        }
      },
    },
    props,
  );

describe("createMachine", () => {
  it("runs uncontrolled: commits, notifies, then reports the change", () => {
    const calls: string[] = [];
    const machine = createCounter({
      onCountChange: (n) => calls.push(`change ${n}`),
    });
    machine.subscribe((s) => calls.push(`state ${s.count}`));
    machine.send({ type: "INC" });
    expect(machine.getState().count).toBe(1);
    expect(calls).toEqual(["state 1", "change 1"]);
  });

  it("ignores events reducing to the same state", () => {
    const listener = vi.fn();
    const onCountChange = vi.fn();
    const machine = createCounter({ onCountChange });
    machine.subscribe(listener);
    machine.send({ type: "NOOP" });
    expect(listener).not.toHaveBeenCalled();
    expect(onCountChange).not.toHaveBeenCalled();
  });

  it("keeps controlled values and only reports requested changes", () => {
    const onCountChange = vi.fn();
    const machine = createCounter({ count: 5, onCountChange });
    expect(machine.getState().count).toBe(5);
    machine.send({ type: "INC" });
    expect(onCountChange).toHaveBeenCalledWith(6);
    expect(machine.getState().count).toBe(5);
    // other fields still change
    machine.send({ type: "HOVER" });
    expect(machine.getState()).toEqual({ count: 5, hovered: true });
    // the owner accepts
    machine.send({ type: "SYNC", props: { count: 6 } });
    expect(machine.getState().count).toBe(6);
    expect(onCountChange).toHaveBeenCalledTimes(1);
  });

  it("switches back to uncontrolled keeping the last value", () => {
    const machine = createCounter({ count: 3 });
    machine.setProps({ count: undefined });
    expect(machine.getProps().count).toBeUndefined();
    machine.send({ type: "INC" });
    expect(machine.getState().count).toBe(4);
  });

  it("normalizes after events and props changes", () => {
    const onCountChange = vi.fn();
    const machine = createCounter({ max: 1, onCountChange });
    machine.send({ type: "INC" });
    machine.send({ type: "INC" });
    expect(machine.getState().count).toBe(1);
    expect(onCountChange).toHaveBeenCalledTimes(1);
    machine.setProps({ max: 0 });
    expect(machine.getState().count).toBe(0);
  });

  it("projects props without committing", () => {
    const machine = createCounter({});
    const state = machine.getState();
    expect(machine.project(state, { count: 9 })).toEqual({
      count: 9,
      hovered: false,
    });
    expect(machine.project(state)).toBe(state);
    expect(machine.getState().count).toBe(0);
  });

  it("works without normalize / changed", () => {
    const machine = createMachine<{ n: number }, { type: "ADD" }, object>(
      {
        initial: () => ({ n: 0 }),
        reduce: (s) => ({ n: s.n + 1 }),
      },
      {},
    );
    machine.send({ type: "ADD" });
    machine.setProps({});
    expect(machine.getState().n).toBe(1);
    const counter = createCounter({}, false);
    counter.send({ type: "INC" });
    expect(counter.getState().count).toBe(1);
  });
});
