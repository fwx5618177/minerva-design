import { describe, expect, it, vi } from "vitest";
import { createDisclosureMachine, isDisclosurePresent } from "./disclosure";

describe("disclosure machine", () => {
  it("starts settled (no enter animation on mount)", () => {
    expect(createDisclosureMachine().getState()).toEqual({
      open: false,
      phase: "closed",
    });
    expect(createDisclosureMachine({ defaultOpen: true }).getState()).toEqual({
      open: true,
      phase: "open",
    });
    expect(createDisclosureMachine({ open: true }).getState().phase).toBe(
      "open",
    );
  });

  it("goes closed -> opening -> open -> closing -> closed", () => {
    const onOpenChange = vi.fn();
    const machine = createDisclosureMachine({ onOpenChange });
    const phases: string[] = [];
    machine.subscribe((s) => phases.push(s.phase));
    machine.send({ type: "OPEN" });
    expect(isDisclosurePresent(machine.getState())).toBe(true);
    machine.send({ type: "ANIMATION_END" });
    machine.send({ type: "CLOSE" });
    machine.send({ type: "SKIP_ANIMATION" });
    expect(phases).toEqual(["opening", "open", "closing", "closed"]);
    expect(isDisclosurePresent(machine.getState())).toBe(false);
    expect(onOpenChange.mock.calls).toEqual([[true], [false]]);
  });

  it("toggles and re-opens while closing", () => {
    const machine = createDisclosureMachine();
    machine.send({ type: "TOGGLE" });
    expect(machine.getState()).toEqual({ open: true, phase: "opening" });
    machine.send({ type: "TOGGLE" });
    expect(machine.getState()).toEqual({ open: false, phase: "closing" });
    machine.send({ type: "OPEN" });
    expect(machine.getState()).toEqual({ open: true, phase: "opening" });
  });

  it("ignores redundant events and animation ends of settled phases", () => {
    const listener = vi.fn();
    const machine = createDisclosureMachine();
    machine.subscribe(listener);
    machine.send({ type: "CLOSE" });
    machine.send({ type: "ANIMATION_END" });
    machine.send({ type: "UNKNOWN" } as never);
    expect(listener).not.toHaveBeenCalled();
  });

  it("jumps straight between open and closed without animation", () => {
    const machine = createDisclosureMachine({ animated: false });
    machine.send({ type: "OPEN" });
    expect(machine.getState().phase).toBe("open");
    machine.send({ type: "CLOSE" });
    expect(machine.getState().phase).toBe("closed");
    // turning the animation off settles a running transition
    const animated = createDisclosureMachine();
    animated.send({ type: "OPEN" });
    animated.setProps({ animated: false });
    expect(animated.getState().phase).toBe("open");
  });

  it("ignores user events while disabled", () => {
    const onOpenChange = vi.fn();
    const machine = createDisclosureMachine({ disabled: true, onOpenChange });
    machine.send({ type: "OPEN" });
    machine.send({ type: "TOGGLE" });
    expect(machine.getState().open).toBe(false);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("controlled: reports requests, follows the prop", () => {
    const onOpenChange = vi.fn();
    const machine = createDisclosureMachine({ open: false, onOpenChange });
    machine.send({ type: "OPEN" });
    expect(onOpenChange).toHaveBeenCalledWith(true);
    // rejected: no transition started
    expect(machine.getState()).toEqual({ open: false, phase: "closed" });
    machine.setProps({ open: true });
    expect(machine.getState()).toEqual({ open: true, phase: "opening" });
    machine.send({ type: "ANIMATION_END" });
    machine.setProps({ open: false });
    expect(machine.getState().phase).toBe("closing");
  });
});
