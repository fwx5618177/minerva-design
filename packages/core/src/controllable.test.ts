import { describe, expect, it, vi } from "vitest";
import { createControllableState } from "./controllable";

describe("createControllableState", () => {
  it("stores the value when uncontrolled and calls onChange once per change", () => {
    const onChange = vi.fn();
    const state = createControllableState({ defaultValue: 1, onChange });
    const listener = vi.fn();
    state.subscribe(listener);

    expect(state.isControlled()).toBe(false);
    expect(state.get()).toBe(1);
    state.set(2);
    state.set(2);
    state.set((prev) => prev + 1);

    expect(state.get()).toBe(3);
    expect(onChange.mock.calls).toEqual([[2], [3]]);
    expect(listener.mock.calls).toEqual([[2], [3]]);
  });

  it("does not store when controlled, only reports the request", () => {
    const onChange = vi.fn();
    const state = createControllableState({
      value: "a",
      defaultValue: "z",
      onChange,
    });
    const listener = vi.fn();
    state.subscribe(listener);

    state.set("b");
    expect(state.isControlled()).toBe(true);
    expect(state.get()).toBe("a");
    expect(onChange).toHaveBeenCalledExactlyOnceWith("b");
    expect(listener).not.toHaveBeenCalled();

    state.setControlledValue("b");
    expect(state.get()).toBe("b");
    expect(listener).toHaveBeenCalledExactlyOnceWith("b");
    // setControlledValue never calls onChange
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("updaters receive the controlled value", () => {
    const onChange = vi.fn();
    const state = createControllableState({
      value: 10,
      defaultValue: 0,
      onChange,
    });
    state.set((prev) => prev + 1);
    expect(onChange).toHaveBeenCalledWith(11);
    state.set(10);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("switches between controlled and uncontrolled", () => {
    const state = createControllableState({ defaultValue: 0 });
    const listener = vi.fn();
    const unsubscribe = state.subscribe(listener);

    state.setControlledValue(5);
    expect(state.isControlled()).toBe(true);
    expect(state.get()).toBe(5);

    state.setControlledValue(undefined);
    expect(state.isControlled()).toBe(false);
    // keeps the last controlled value
    expect(state.get()).toBe(5);
    expect(listener.mock.calls).toEqual([[5]]);

    unsubscribe();
    state.set(6);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(state.get()).toBe(6);
  });

  it("supports a custom equality check", () => {
    const onChange = vi.fn();
    const state = createControllableState({
      defaultValue: { id: 1 },
      onChange,
      equals: (a, b) => a.id === b.id,
    });
    state.set({ id: 1 });
    expect(onChange).not.toHaveBeenCalled();
    state.set({ id: 2 });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
