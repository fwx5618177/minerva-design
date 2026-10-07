import { describe, expect, it, vi } from "vitest";
import { composeEventHandlers } from "./composeEventHandlers";

const makeEvent = () => {
  const event = {
    defaultPrevented: false,
    preventDefault() {
      event.defaultPrevented = true;
    },
  };
  return event;
};

describe("composeEventHandlers", () => {
  it("runs the external handler before the internal one", () => {
    const order: string[] = [];
    const handler = composeEventHandlers(
      () => order.push("external"),
      () => order.push("internal"),
    );
    const event = makeEvent();
    handler(event);
    expect(order).toEqual(["external", "internal"]);
  });

  it("passes the same event to both handlers", () => {
    const external = vi.fn();
    const internal = vi.fn();
    const event = makeEvent();
    composeEventHandlers(external, internal)(event);
    expect(external).toHaveBeenCalledWith(event);
    expect(internal).toHaveBeenCalledWith(event);
  });

  it("skips the internal handler when the external one prevents default", () => {
    const internal = vi.fn();
    composeEventHandlers(
      (e: ReturnType<typeof makeEvent>) => e.preventDefault(),
      internal,
    )(makeEvent());
    expect(internal).not.toHaveBeenCalled();
  });

  it("skips the internal handler for an already-prevented event", () => {
    const internal = vi.fn();
    const event = makeEvent();
    event.preventDefault();
    composeEventHandlers(undefined, internal)(event);
    expect(internal).not.toHaveBeenCalled();
  });

  it("still runs the internal handler when checkForDefaultPrevented is false", () => {
    const internal = vi.fn();
    composeEventHandlers(
      (e: ReturnType<typeof makeEvent>) => e.preventDefault(),
      internal,
      { checkForDefaultPrevented: false },
    )(makeEvent());
    expect(internal).toHaveBeenCalledTimes(1);
  });

  it("tolerates missing handlers on either side", () => {
    const external = vi.fn();
    const internal = vi.fn();
    const event = makeEvent();
    expect(() =>
      composeEventHandlers(undefined, undefined)(event),
    ).not.toThrow();
    composeEventHandlers(external, undefined)(event);
    composeEventHandlers(undefined, internal)(event);
    expect(external).toHaveBeenCalledTimes(1);
    expect(internal).toHaveBeenCalledTimes(1);
  });

  it("works with non-event payloads (e.g. open-change values)", () => {
    const internal = vi.fn();
    composeEventHandlers<boolean>(undefined, internal)(true);
    expect(internal).toHaveBeenCalledWith(true);
  });
});
