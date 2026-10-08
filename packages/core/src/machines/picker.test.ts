import { describe, expect, it, vi } from "vitest";
import {
  createPickerMachine,
  getPickerColumns,
  getPickerSelectedOptions,
  type PickerMachine,
  type PickerOption,
} from "./picker";

const options: PickerOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      { value: "paris", children: [{ value: "1er" }, { value: "2e" }] },
      { value: "lyon", children: [{ value: "1er" }, { value: "3e" }] },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      { value: "osaka", disabled: true },
      { value: "tokyo", children: [{ value: "shibuya" }] },
      { value: "kyoto" },
    ],
  },
  { value: "xx", disabled: true },
];

const values = (machine: PickerMachine) => machine.getState().value;

describe("getPickerColumns", () => {
  it("derives one column per level, defaulting to the first enabled option", () => {
    const columns = getPickerColumns(options, []);
    expect(columns.map((c) => c.selectedIndex)).toEqual([0, 0, 0]);
    expect(getPickerSelectedOptions(columns).map((o) => o.value)).toEqual([
      "fr",
      "paris",
      "1er",
    ]);
    const japan = getPickerColumns(options, ["jp", "osaka"]);
    expect(japan.map((c) => c.selectedIndex)).toEqual([1, 1, 0]);
    expect(getPickerColumns(options, ["xx"])[0].selectedIndex).toBe(0);
  });

  it("stops at a column without enabled options", () => {
    const columns = getPickerColumns([{ value: "a", disabled: true }], ["a"]);
    expect(columns).toEqual([
      { options: [{ value: "a", disabled: true }], selectedIndex: -1 },
    ]);
    expect(getPickerSelectedOptions(columns)).toEqual([]);
    expect(getPickerColumns([], [])).toEqual([]);
  });
});

describe("picker machine", () => {
  it("resolves the initial path", () => {
    expect(values(createPickerMachine({ options }))).toEqual([
      "fr",
      "paris",
      "1er",
    ]);
    expect(
      values(createPickerMachine({ options, defaultValue: ["jp", "kyoto"] })),
    ).toEqual(["jp", "kyoto"]);
  });

  it("changing column N recomputes the columns after it", () => {
    const onValueChange = vi.fn();
    const machine = createPickerMachine({
      options,
      defaultValue: ["fr", "lyon", "3e"],
      onValueChange,
    });
    // same level value kept when it exists below the new choice
    machine.send({ type: "SELECT", column: 1, index: 0 });
    expect(values(machine)).toEqual(["fr", "paris", "1er"]);
    machine.send({ type: "SELECT", column: 0, index: 1 });
    expect(values(machine)).toEqual(["jp", "tokyo", "shibuya"]);
    expect(onValueChange).toHaveBeenLastCalledWith(
      ["jp", "tokyo", "shibuya"],
      [
        options[1],
        options[1].children![1],
        options[1].children![1].children![0],
      ],
    );
    // disabled, missing and unchanged choices are ignored
    machine.send({ type: "SELECT", column: 1, index: 0 });
    machine.send({ type: "SELECT", column: 5, index: 0 });
    machine.send({ type: "SELECT", column: 1, index: 1 });
    expect(onValueChange).toHaveBeenCalledTimes(2);
  });

  it("STEP moves over enabled options, clamped", () => {
    const machine = createPickerMachine({ options, defaultValue: ["jp"] });
    expect(values(machine)).toEqual(["jp", "tokyo", "shibuya"]);
    machine.send({ type: "STEP", column: 1, delta: -1 });
    expect(values(machine)).toEqual(["jp", "tokyo", "shibuya"]);
    machine.send({ type: "STEP", column: 1, delta: 5 });
    expect(values(machine)).toEqual(["jp", "kyoto"]);
    machine.send({ type: "STEP", column: 0, delta: -1 });
    expect(values(machine)).toEqual(["fr", "paris", "1er"]);
    machine.send({ type: "STEP", column: 0, delta: 0 });
    machine.send({ type: "STEP", column: 9, delta: 1 });
    expect(values(machine)).toEqual(["fr", "paris", "1er"]);
  });

  it("SET resolves the given path", () => {
    const machine = createPickerMachine({ options });
    machine.send({ type: "SET", value: ["jp", "kyoto"] });
    expect(values(machine)).toEqual(["jp", "kyoto"]);
    const listener = vi.fn();
    machine.subscribe(listener);
    machine.send({ type: "SET", value: ["jp", "kyoto"] });
    machine.send({ type: "UNKNOWN" } as never);
    expect(listener).not.toHaveBeenCalled();
  });

  it("controlled value, re-resolved when the options change", () => {
    const onValueChange = vi.fn();
    const machine = createPickerMachine({
      options,
      value: ["fr", "paris", "2e"],
      onValueChange,
    });
    machine.send({ type: "SELECT", column: 2, index: 0 });
    expect(onValueChange).toHaveBeenCalledWith(
      ["fr", "paris", "1er"],
      expect.any(Array),
    );
    expect(values(machine)).toEqual(["fr", "paris", "2e"]);
    machine.setProps({ options: [{ value: "only" }] });
    expect(values(machine)).toEqual(["only"]);
  });
});
