import { describe, expect, it, vi } from "vitest";
import {
  canDecrementStepper,
  canIncrementStepper,
  createNumberStepperMachine,
  getNumberStepperText,
  normalizeStepperValue,
} from "./number-stepper";

describe("number stepper helpers", () => {
  it("normalizes to the precision and range", () => {
    expect(normalizeStepperValue(0.1 + 0.2, { step: 0.1 })).toBe(0.3);
    expect(normalizeStepperValue(12, { max: 10 })).toBe(10);
    expect(normalizeStepperValue(1.26, { precision: 1 })).toBe(1.3);
  });

  it("text, can increment / decrement", () => {
    expect(
      getNumberStepperText({ value: 1.5, draft: null }, { step: 0.25 }),
    ).toBe("1.50");
    expect(getNumberStepperText({ value: null, draft: null }, {})).toBe("");
    expect(getNumberStepperText({ value: 1, draft: "1." }, {})).toBe("1.");
    const p = { min: 0, max: 2 };
    expect(canIncrementStepper({ value: 2, draft: null }, p)).toBe(false);
    expect(canIncrementStepper({ value: 1, draft: null }, p)).toBe(true);
    expect(canIncrementStepper({ value: null, draft: null }, p)).toBe(true);
    expect(canIncrementStepper({ value: 1, draft: null }, {})).toBe(true);
    expect(canDecrementStepper({ value: 0, draft: null }, p)).toBe(false);
    expect(canDecrementStepper({ value: 1, draft: null }, p)).toBe(true);
    expect(canDecrementStepper({ value: 1, draft: null }, {})).toBe(true);
    expect(
      canIncrementStepper({ value: 1, draft: null }, { ...p, disabled: true }),
    ).toBe(false);
    expect(
      canDecrementStepper({ value: 1, draft: null }, { ...p, readOnly: true }),
    ).toBe(false);
  });
});

describe("number stepper machine", () => {
  it("steps with precision and clamps", () => {
    const onValueChange = vi.fn();
    const machine = createNumberStepperMachine({
      defaultValue: 0.1,
      step: 0.1,
      max: 0.3,
      onValueChange,
    });
    machine.send({ type: "INCREMENT" });
    expect(machine.getState().value).toBe(0.2);
    machine.send({ type: "INCREMENT", multiplier: 5 });
    expect(machine.getState().value).toBe(0.3);
    machine.send({ type: "INCREMENT" }); // at max
    machine.send({ type: "DECREMENT" });
    machine.send({ type: "DECREMENT", multiplier: 2 });
    expect(onValueChange.mock.calls).toEqual([[0.2], [0.3], [0.2], [0]]);
  });

  it("starts empty steps at 0 or the nearest bound", () => {
    const machine = createNumberStepperMachine();
    expect(machine.getState().value).toBeNull();
    machine.send({ type: "INCREMENT" });
    expect(machine.getState().value).toBe(0);
    const bounded = createNumberStepperMachine({ min: 5 });
    bounded.send({ type: "DECREMENT" });
    expect(bounded.getState().value).toBe(5);
  });

  it("keys", () => {
    const machine = createNumberStepperMachine({
      defaultValue: 50,
      min: 0,
      max: 100,
      step: 2,
    });
    const press = (key: string) => {
      machine.send({ type: "KEY", key });
      return machine.getState().value;
    };
    expect(press("ArrowUp")).toBe(52);
    expect(press("ArrowDown")).toBe(50);
    expect(press("PageUp")).toBe(70);
    expect(press("PageDown")).toBe(50);
    expect(press("Home")).toBe(0);
    expect(press("End")).toBe(100);
    expect(press("x")).toBe(100);
    const open = createNumberStepperMachine({
      defaultValue: 1,
      pageMultiplier: 3,
    });
    open.send({ type: "KEY", key: "Home" });
    open.send({ type: "KEY", key: "End" });
    expect(open.getState().value).toBe(1);
    open.send({ type: "KEY", key: "PageUp" });
    expect(open.getState().value).toBe(4);
  });

  it("drafts are committed: parsed, rounded, clamped; invalid text reverts", () => {
    const machine = createNumberStepperMachine({
      defaultValue: 5,
      min: 0,
      max: 10,
      precision: 1,
    });
    machine.send({ type: "INPUT", text: "12.34" });
    machine.send({ type: "INPUT", text: "12.34" }); // no-op
    expect(getNumberStepperText(machine.getState(), {})).toBe("12.34");
    machine.send({ type: "COMMIT" });
    expect(machine.getState()).toEqual({ value: 10, draft: null });
    machine.send({ type: "COMMIT" }); // nothing to commit
    machine.send({ type: "INPUT", text: "abc" });
    machine.send({ type: "COMMIT" });
    expect(machine.getState()).toEqual({ value: 10, draft: null });
    machine.send({ type: "INPUT", text: "  " });
    machine.send({ type: "COMMIT" });
    expect(machine.getState()).toEqual({ value: null, draft: null });
    // committing the same value only clears the draft
    machine.send({ type: "SET", value: 3 });
    machine.send({ type: "INPUT", text: "3" });
    machine.send({ type: "COMMIT" });
    expect(machine.getState()).toEqual({ value: 3, draft: null });
  });

  it("keeps out-of-range text without clampOnBlur", () => {
    const machine = createNumberStepperMachine({ max: 10, clampOnBlur: false });
    machine.send({ type: "INPUT", text: "42" });
    machine.send({ type: "COMMIT" });
    expect(machine.getState().value).toBe(42);
  });

  it("SET normalizes; null / NaN empty the value", () => {
    const machine = createNumberStepperMachine({ min: 1 });
    machine.send({ type: "SET", value: -5 });
    expect(machine.getState().value).toBe(1);
    machine.send({ type: "SET", value: NaN });
    expect(machine.getState().value).toBeNull();
    machine.send({ type: "SET", value: null });
    machine.send({ type: "UNKNOWN" } as never);
    expect(machine.getState().value).toBeNull();
  });

  it("disabled / read-only ignore events; controlled value", () => {
    const disabled = createNumberStepperMachine({
      defaultValue: 1,
      disabled: true,
    });
    disabled.send({ type: "INCREMENT" });
    expect(disabled.getState().value).toBe(1);
    const onValueChange = vi.fn();
    const controlled = createNumberStepperMachine({ value: 1, onValueChange });
    controlled.send({ type: "INCREMENT" });
    expect(onValueChange).toHaveBeenCalledWith(2);
    expect(controlled.getState().value).toBe(1);
    controlled.setProps({ value: null });
    expect(controlled.getState().value).toBeNull();
  });
});
