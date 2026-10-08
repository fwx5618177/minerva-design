import { describe, expect, it, vi } from "vitest";
import { createSelectionMachine, isSelected } from "./selection";

describe("selection machine: single", () => {
  it("selects, replaces and toggles one value", () => {
    const onValueChange = vi.fn();
    const machine = createSelectionMachine({ onValueChange });
    expect(machine.getState().value).toEqual([]);
    machine.send({ type: "SELECT", value: "a" });
    machine.send({ type: "SELECT", value: "a" }); // no-op
    machine.send({ type: "SELECT", value: "b" });
    expect(machine.getState().value).toEqual(["b"]);
    expect(isSelected(machine.getState(), "b")).toBe(true);
    machine.send({ type: "TOGGLE", value: "b" });
    expect(machine.getState().value).toEqual([]);
    machine.send({ type: "TOGGLE", value: "c" });
    expect(onValueChange.mock.calls).toEqual([[["a"]], [["b"]], [[]], [["c"]]]);
  });

  it("can refuse an empty selection", () => {
    const machine = createSelectionMachine({
      defaultValue: ["a"],
      allowEmpty: false,
    });
    machine.send({ type: "DESELECT", value: "a" });
    machine.send({ type: "TOGGLE", value: "a" });
    machine.send({ type: "CLEAR" });
    machine.send({ type: "SET", value: [] });
    expect(machine.getState().value).toEqual(["a"]);
    machine.send({ type: "SET", value: ["b", "c"] });
    expect(machine.getState().value).toEqual(["b"]);
  });

  it("skips disabled values but lets a disabled selection be replaced", () => {
    const machine = createSelectionMachine({
      defaultValue: ["x"],
      isDisabled: (v) => v === "x" || v === "y",
    });
    machine.send({ type: "SELECT", value: "y" });
    expect(machine.getState().value).toEqual(["x"]);
    machine.send({ type: "SELECT", value: "a" });
    expect(machine.getState().value).toEqual(["a"]);
    machine.send({ type: "CLEAR" });
    expect(machine.getState().value).toEqual([]);
    machine.send({ type: "SELECT_ALL" }); // multiple only
    machine.send({ type: "DESELECT", value: "zzz" });
    expect(machine.getState().value).toEqual([]);
  });
});

describe("selection machine: multiple", () => {
  const items = ["a", "b", "c", "d"];

  it("adds and removes values in selection order", () => {
    const machine = createSelectionMachine({ mode: "multiple", items });
    machine.send({ type: "TOGGLE", value: "c" });
    machine.send({ type: "TOGGLE", value: "a" });
    expect(machine.getState().value).toEqual(["c", "a"]);
    machine.send({ type: "TOGGLE", value: "c" });
    expect(machine.getState().value).toEqual(["a"]);
    machine.send({ type: "SELECT_ALL" });
    expect(machine.getState().value).toEqual(["a", "b", "c", "d"]);
    machine.send({ type: "CLEAR" });
    expect(machine.getState().value).toEqual([]);
    // an empty multiple selection is always allowed
    machine.send({ type: "CLEAR" });
    expect(machine.getState().value).toEqual([]);
  });

  it("respects max", () => {
    const machine = createSelectionMachine({ mode: "multiple", items, max: 2 });
    machine.send({ type: "SELECT", value: "a" });
    machine.send({ type: "SELECT", value: "b" });
    machine.send({ type: "SELECT", value: "c" });
    expect(machine.getState().value).toEqual(["a", "b"]);
    machine.send({ type: "SET", value: ["d", "c", "b"] });
    expect(machine.getState().value).toEqual(["d", "c"]);
    machine.send({ type: "CLEAR" });
    machine.send({ type: "SELECT_ALL" });
    expect(machine.getState().value).toEqual(["a", "b"]);
  });

  it("keeps disabled values as they are", () => {
    const machine = createSelectionMachine({
      mode: "multiple",
      items,
      defaultValue: ["b"],
      isDisabled: (v) => v === "b" || v === "d",
    });
    machine.send({ type: "DESELECT", value: "b" });
    machine.send({ type: "TOGGLE", value: "d" });
    expect(machine.getState().value).toEqual(["b"]);
    machine.send({ type: "SELECT_ALL" });
    expect(machine.getState().value).toEqual(["b", "a", "c"]);
    machine.send({ type: "CLEAR" });
    expect(machine.getState().value).toEqual(["b"]);
    machine.send({ type: "SET", value: ["c", "c", "d"] });
    expect(machine.getState().value).toEqual(["b", "c"]);
  });

  it("controlled: reports the requested selection only", () => {
    const onValueChange = vi.fn();
    const machine = createSelectionMachine({
      mode: "multiple",
      value: ["a"],
      onValueChange,
    });
    machine.send({ type: "SELECT", value: "b" });
    expect(onValueChange).toHaveBeenCalledWith(["a", "b"]);
    expect(machine.getState().value).toEqual(["a"]);
    machine.setProps({ value: ["a", "b"] });
    expect(machine.getState().value).toEqual(["a", "b"]);
    machine.send({ type: "UNKNOWN" } as never);
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });
});
