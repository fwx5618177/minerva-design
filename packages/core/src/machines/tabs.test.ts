import { describe, expect, it, vi } from "vitest";
import {
  createTabsMachine,
  getTabsNavigationIndex,
  getTabsTabStop,
  type TabsItem,
} from "./tabs";

const tabs: TabsItem[] = [
  { value: "a" },
  { value: "b", disabled: true },
  { value: "c" },
  { value: "d" },
];

describe("tabs helpers", () => {
  it("navigates enabled tabs per orientation, direction and loop", () => {
    const nav = (key: string, currentIndex: number, extra = {}) =>
      getTabsNavigationIndex({ key, currentIndex, tabs, ...extra });
    expect(nav("ArrowRight", 0)).toBe(2);
    expect(nav("ArrowLeft", 0)).toBe(3);
    expect(nav("ArrowLeft", 0, { loop: false })).toBeNull();
    expect(nav("ArrowLeft", 0, { dir: "rtl" })).toBe(2);
    expect(nav("ArrowDown", 0)).toBeNull();
    expect(nav("ArrowDown", 0, { orientation: "vertical" })).toBe(2);
    expect(nav("End", 0)).toBe(3);
    expect(nav("Home", 3)).toBe(0);
    expect(nav("x", 0)).toBeNull();
  });

  it("finds the tab stop", () => {
    expect(getTabsTabStop(tabs, "c")?.value).toBe("c");
    expect(getTabsTabStop(tabs, "b")?.value).toBe("a");
    expect(getTabsTabStop(tabs, undefined)?.value).toBe("a");
    expect(getTabsTabStop([{ value: "z", disabled: true }], "z")).toBe(
      undefined,
    );
  });
});

describe("tabs machine", () => {
  it("selects enabled tabs (props or event disabled flag)", () => {
    const onValueChange = vi.fn();
    const machine = createTabsMachine({
      tabs,
      defaultValue: "a",
      onValueChange,
    });
    machine.send({ type: "SELECT", value: "b" });
    machine.send({ type: "SELECT", value: "d", disabled: true });
    machine.send({ type: "SELECT", value: "a" });
    expect(machine.getState().value).toBe("a");
    machine.send({ type: "SELECT", value: "c" });
    expect(machine.getState().value).toBe("c");
    expect(onValueChange.mock.calls).toEqual([["c"]]);
  });

  it("automatic activation selects focused tabs", () => {
    const machine = createTabsMachine({ tabs });
    machine.send({ type: "FOCUS", value: "c" });
    expect(machine.getState()).toEqual({ value: "c", focusedValue: "c" });
    machine.send({ type: "FOCUS", value: "b" });
    expect(machine.getState()).toEqual({ value: "c", focusedValue: "b" });
    machine.send({ type: "BLUR" });
    machine.send({ type: "BLUR" });
    expect(machine.getState().focusedValue).toBeUndefined();
  });

  it("manual activation only moves the focus", () => {
    const machine = createTabsMachine({
      tabs,
      value: "a",
      activationMode: "manual",
    });
    machine.send({ type: "FOCUS", value: "c" });
    expect(machine.getState()).toEqual({ value: "a", focusedValue: "c" });
  });

  it("NAVIGATE moves the focused tab from the focused / selected / given one", () => {
    const machine = createTabsMachine({ tabs, defaultValue: "a" });
    machine.send({ type: "NAVIGATE", key: "ArrowRight" });
    expect(machine.getState().focusedValue).toBe("c");
    machine.send({ type: "NAVIGATE", key: "ArrowRight" });
    expect(machine.getState().focusedValue).toBe("d");
    machine.send({ type: "NAVIGATE", key: "Enter" });
    expect(machine.getState().focusedValue).toBe("d");
    machine.send({
      type: "NAVIGATE",
      key: "ArrowRight",
      from: "x",
      tabs: [{ value: "x" }, { value: "y" }],
    });
    expect(machine.getState().focusedValue).toBe("y");
    // the selection itself follows FOCUS (sent by the renderer)
    expect(machine.getState().value).toBe("a");
    const empty = createTabsMachine({ orientation: "vertical", loop: false });
    empty.send({ type: "NAVIGATE", key: "ArrowDown" });
    expect(empty.getState().focusedValue).toBeUndefined();
  });

  it("controlled value", () => {
    const onValueChange = vi.fn();
    const machine = createTabsMachine({ value: "a", onValueChange });
    machine.send({ type: "SELECT", value: "c" });
    expect(onValueChange).toHaveBeenCalledWith("c");
    expect(machine.getState().value).toBe("a");
    machine.setProps({ value: "c" });
    expect(machine.getState().value).toBe("c");
    machine.send({ type: "UNKNOWN" } as never);
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });
});
