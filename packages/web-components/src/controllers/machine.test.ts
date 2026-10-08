import { describe, expect, it, vi } from "vitest";
import type { ReactiveController, ReactiveControllerHost } from "lit";
import { createSwitchMachine } from "@minerva/core";
import { MachineController } from "./machine";

const createHost = () => {
  const controllers: ReactiveController[] = [];
  const host = {
    addController: (c: ReactiveController) => controllers.push(c),
    removeController: () => {},
    requestUpdate: vi.fn(),
    updateComplete: Promise.resolve(true),
  } satisfies ReactiveControllerHost;
  return { host, controllers };
};

describe("MachineController", () => {
  it("re-renders the host on state changes while connected", () => {
    const { host, controllers } = createHost();
    const controller = new MachineController(host, createSwitchMachine());
    expect(controllers).toEqual([controller]);
    // not connected yet: no update
    controller.send({ type: "TOGGLE" });
    expect(host.requestUpdate).not.toHaveBeenCalled();
    controller.hostConnected();
    controller.hostConnected(); // subscribes once
    controller.send({ type: "TOGGLE" });
    expect(controller.state.checked).toBe(false);
    expect(host.requestUpdate).toHaveBeenCalledTimes(1);
    controller.sync({ checked: true });
    expect(controller.state.checked).toBe(true);
    expect(host.requestUpdate).toHaveBeenCalledTimes(2);
    controller.hostDisconnected();
    controller.sync({ checked: false });
    expect(host.requestUpdate).toHaveBeenCalledTimes(2);
  });

  it("filters updates with shouldUpdate", () => {
    const { host } = createHost();
    const shouldUpdate = vi.fn(() => false);
    const controller = new MachineController(
      host,
      createSwitchMachine(),
      shouldUpdate,
    );
    controller.hostConnected();
    controller.send({ type: "TOGGLE" });
    expect(shouldUpdate).toHaveBeenCalledWith(
      { checked: true },
      { checked: false },
    );
    expect(host.requestUpdate).not.toHaveBeenCalled();
  });
});
