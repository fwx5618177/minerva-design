import { describe, expect, it, vi } from "vitest";
import {
  createCheckboxMachine,
  createRadioGroupMachine,
  createSwitchMachine,
  getCheckboxAriaChecked,
  getRadioGroupTabStop,
  type RadioGroupItem,
} from "./toggle";

describe("checkbox machine", () => {
  it("toggles and sets", () => {
    const onCheckedChange = vi.fn();
    const machine = createCheckboxMachine({ onCheckedChange });
    expect(getCheckboxAriaChecked(machine.getState())).toBe("false");
    machine.send({ type: "TOGGLE" });
    expect(getCheckboxAriaChecked(machine.getState())).toBe("true");
    machine.send({ type: "SET", checked: true }); // no-op
    machine.send({ type: "SET", checked: false });
    expect(onCheckedChange.mock.calls).toEqual([[true], [false]]);
  });

  it("an indeterminate box becomes checked", () => {
    const onCheckedChange = vi.fn();
    const onIndeterminateChange = vi.fn();
    const machine = createCheckboxMachine({
      defaultIndeterminate: true,
      defaultChecked: true,
      onCheckedChange,
      onIndeterminateChange,
    });
    expect(getCheckboxAriaChecked(machine.getState())).toBe("mixed");
    machine.send({ type: "TOGGLE" });
    expect(machine.getState()).toEqual({ checked: true, indeterminate: false });
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(onIndeterminateChange).toHaveBeenCalledWith(false);
  });

  it("controlled checked / indeterminate; disabled and read-only", () => {
    const onCheckedChange = vi.fn();
    const machine = createCheckboxMachine({
      checked: false,
      indeterminate: true,
      onCheckedChange,
    });
    machine.send({ type: "TOGGLE" });
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(machine.getState()).toEqual({ checked: false, indeterminate: true });
    machine.setProps({ checked: true, indeterminate: false });
    expect(machine.getState()).toEqual({ checked: true, indeterminate: false });
    for (const props of [{ disabled: true }, { readOnly: true }]) {
      const locked = createCheckboxMachine(props);
      locked.send({ type: "TOGGLE" });
      expect(locked.getState().checked).toBe(false);
    }
  });
});

describe("switch machine", () => {
  it("toggles, sets, honors disabled / read-only and controlled state", () => {
    const onCheckedChange = vi.fn();
    const machine = createSwitchMachine({ onCheckedChange });
    machine.send({ type: "TOGGLE" });
    machine.send({ type: "SET", checked: true });
    machine.send({ type: "SET", checked: false });
    expect(onCheckedChange.mock.calls).toEqual([[true], [false]]);
    const disabled = createSwitchMachine({
      defaultChecked: true,
      disabled: true,
    });
    disabled.send({ type: "TOGGLE" });
    expect(disabled.getState().checked).toBe(true);
    const controlled = createSwitchMachine({ checked: true, onCheckedChange });
    controlled.send({ type: "TOGGLE" });
    expect(controlled.getState().checked).toBe(true);
    expect(onCheckedChange).toHaveBeenLastCalledWith(false);
  });
});

describe("radio group machine", () => {
  const items: RadioGroupItem[] = [
    { value: "a" },
    { value: "b", disabled: true },
    { value: "c" },
  ];

  it("tab stop", () => {
    expect(getRadioGroupTabStop(items, "c")?.value).toBe("c");
    expect(getRadioGroupTabStop(items, "b")?.value).toBe("a");
    expect(getRadioGroupTabStop(items, null)?.value).toBe("a");
  });

  it("selects enabled options", () => {
    const onValueChange = vi.fn();
    const machine = createRadioGroupMachine({ items, onValueChange });
    expect(machine.getState().value).toBeNull();
    machine.send({ type: "SELECT", value: "b" });
    machine.send({ type: "SELECT", value: "c" });
    machine.send({ type: "SELECT", value: "c" });
    expect(machine.getState().value).toBe("c");
    expect(onValueChange.mock.calls).toEqual([["c"]]);
  });

  it("arrows move the focus and check (skipping disabled options)", () => {
    const machine = createRadioGroupMachine({ items, defaultValue: "a" });
    machine.send({ type: "FOCUS", value: "a" });
    machine.send({ type: "FOCUS", value: "a" });
    machine.send({ type: "NAVIGATE", key: "ArrowDown" });
    expect(machine.getState()).toEqual({ value: "c", focusedValue: "c" });
    machine.send({ type: "NAVIGATE", key: "ArrowRight" });
    expect(machine.getState().value).toBe("a");
    machine.send({ type: "NAVIGATE", key: "Home" });
    machine.send({ type: "NAVIGATE", key: "End" });
    machine.send({ type: "NAVIGATE", key: "x" });
    expect(machine.getState().value).toBe("a");
    machine.send({ type: "BLUR" });
    machine.send({ type: "BLUR" });
    expect(machine.getState().focusedValue).toBeNull();
    // from the checked value, with the given items
    machine.send({
      type: "NAVIGATE",
      key: "ArrowLeft",
      items: [{ value: "a" }, { value: "z" }],
    });
    expect(machine.getState().value).toBe("z");
    machine.send({ type: "UNKNOWN" } as never);
  });

  it("read-only moves the focus only; disabled ignores everything", () => {
    const readOnly = createRadioGroupMachine({
      items,
      defaultValue: "a",
      readOnly: true,
      loop: false,
      orientation: "vertical",
      dir: "rtl",
    });
    readOnly.send({ type: "NAVIGATE", key: "ArrowDown" });
    expect(readOnly.getState()).toEqual({ value: "a", focusedValue: "c" });
    readOnly.send({ type: "SELECT", value: "c" });
    expect(readOnly.getState().value).toBe("a");
    const disabled = createRadioGroupMachine({ disabled: true, items });
    disabled.send({ type: "NAVIGATE", key: "ArrowDown" });
    disabled.send({ type: "SELECT", value: "a" });
    expect(disabled.getState().value).toBeNull();
    const empty = createRadioGroupMachine();
    empty.send({ type: "NAVIGATE", key: "ArrowDown" });
    expect(empty.getState().focusedValue).toBeNull();
  });

  it("controlled value", () => {
    const onValueChange = vi.fn();
    const machine = createRadioGroupMachine({
      items,
      value: "a",
      onValueChange,
    });
    machine.send({ type: "SELECT", value: "c" });
    expect(machine.getState().value).toBe("a");
    expect(onValueChange).toHaveBeenCalledWith("c");
  });
});
