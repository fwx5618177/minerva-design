import { describe, expect, it, vi } from "vitest";
import {
  createRatingMachine,
  getRatingDisplayStars,
  getRatingKeyValue,
  getRatingPickValue,
  getRatingStarFills,
} from "./rating";

describe("rating helpers", () => {
  it("key values: half-star steps, whole-star pages, clamped", () => {
    expect(getRatingKeyValue("ArrowRight", 5, 10)).toBe(6);
    expect(getRatingKeyValue("ArrowUp", 10, 10)).toBe(10);
    expect(getRatingKeyValue("ArrowLeft", 0.5, 10)).toBe(0);
    expect(getRatingKeyValue("ArrowDown", 3, 5)).toBe(2.5);
    expect(getRatingKeyValue("PageUp", 9, 10)).toBe(10);
    expect(getRatingKeyValue("PageDown", 2, 5)).toBe(1);
    expect(getRatingKeyValue("Home", 4, 5)).toBe(0);
    expect(getRatingKeyValue("End", 4, 5)).toBe(5);
    expect(getRatingKeyValue("Enter", 4, 5)).toBeNull();
    expect(getRatingKeyValue("ArrowRight", 3, 5, false)).toBe(4);
  });

  it("pick values", () => {
    expect(getRatingPickValue(2, false, 10)).toBe(6);
    expect(getRatingPickValue(3, true, 5)).toBe(3.5);
    expect(getRatingPickValue(3, true, 5, false)).toBe(4);
  });

  it("display stars and fills", () => {
    const state = { value: 7, hoverStars: null };
    expect(getRatingDisplayStars(state, 10)).toBe(3.5);
    expect(getRatingStarFills(state, 10)).toEqual([
      "full",
      "full",
      "full",
      "half",
      "empty",
    ]);
    expect(getRatingDisplayStars({ value: 7, hoverStars: 1 }, 10)).toBe(1);
  });
});

describe("rating machine", () => {
  it("hover previews, picks, keys", () => {
    const onValueChange = vi.fn();
    const machine = createRatingMachine({ onValueChange });
    machine.send({ type: "HOVER", index: 2 });
    machine.send({ type: "HOVER", index: 2 }); // no-op
    expect(machine.getState().hoverStars).toBe(3);
    machine.send({ type: "HOVER", index: 2, half: true });
    expect(machine.getState().hoverStars).toBe(2.5);
    machine.send({ type: "HOVER_END" });
    machine.send({ type: "HOVER_END" });
    expect(machine.getState().hoverStars).toBeNull();
    machine.send({ type: "PICK", index: 2, half: true });
    expect(machine.getState().value).toBe(5);
    machine.send({ type: "PICK", index: 2, half: true }); // same: no change
    machine.send({ type: "KEY", key: "ArrowRight" });
    machine.send({ type: "KEY", key: "x" });
    machine.send({ type: "SET", value: 99 });
    machine.send({ type: "CLEAR" });
    expect(onValueChange.mock.calls).toEqual([[5], [6], [10], [0]]);
    machine.send({ type: "UNKNOWN" } as never);
  });

  it("clearable: picking the current score clears it", () => {
    const machine = createRatingMachine({ defaultValue: 6, clearable: true });
    machine.send({ type: "PICK", index: 2 });
    expect(machine.getState().value).toBe(0);
    machine.send({ type: "SET", value: -3 });
    expect(machine.getState().value).toBe(0);
  });

  it("half steps can be turned off", () => {
    const machine = createRatingMachine({ max: 5, allowHalf: false });
    machine.send({ type: "HOVER", index: 1, half: true });
    expect(machine.getState().hoverStars).toBe(2);
    machine.send({ type: "KEY", key: "ArrowUp" });
    expect(machine.getState().value).toBe(1);
  });

  it("read-only ignores events and drops the preview", () => {
    const onValueChange = vi.fn();
    const machine = createRatingMachine({ onValueChange });
    machine.send({ type: "HOVER", index: 4 });
    machine.setProps({ readOnly: true });
    expect(machine.getState().hoverStars).toBeNull();
    machine.send({ type: "HOVER", index: 1 });
    machine.send({ type: "KEY", key: "End" });
    expect(machine.getState()).toEqual({ value: 0, hoverStars: null });
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("controlled value", () => {
    const onValueChange = vi.fn();
    const machine = createRatingMachine({ value: 4, max: 5, onValueChange });
    machine.send({ type: "KEY", key: "PageUp" });
    expect(onValueChange).toHaveBeenCalledWith(5);
    expect(machine.getState().value).toBe(4);
  });
});
