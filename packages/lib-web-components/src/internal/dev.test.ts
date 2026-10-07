// Development warnings share lib-core's channel (console.error) and format
// (`[minerva] <subject>: <message>`, core's formatDevMessage).
import { DEV_MESSAGE_PREFIX, formatDevMessage } from "@minerva/core";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DEV, devWarn, resetDevWarnings } from "./dev";
import "../elements/tabs";
import { mount } from "../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

describe("devWarn", () => {
  it("is on in tests (development build)", () => {
    expect(DEV).toBe(true);
  });

  it("logs once with console.error (never console.warn), in the shared format", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    devWarn("minerva-x", "something is off.");
    devWarn("minerva-x", "something is off.");
    expect(warn).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledTimes(1);
    expect(error).toHaveBeenCalledWith(
      formatDevMessage("<minerva-x>", "something is off."),
    );
    expect(error.mock.calls[0][0]).toBe(
      "[minerva] <minerva-x>: something is off.",
    );
    resetDevWarnings();
    devWarn("minerva-x", "something is off.");
    expect(error).toHaveBeenCalledTimes(2);
  });

  it("element warnings use the same channel and prefix as lib-core (e.g. <minerva-tabs>)", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    await mount(
      `<minerva-tabs value="missing"><minerva-tab value="a">A</minerva-tab></minerva-tabs>`,
    );
    const messages = error.mock.calls.map((args) => String(args[0]));
    expect(messages).toContainEqual(
      expect.stringMatching(/^\[minerva\] <minerva-tabs>: value "missing"/),
    );
    expect(
      messages.every((m) => m.startsWith(`${DEV_MESSAGE_PREFIX} <minerva-`)),
    ).toBe(true);
    expect(warn).not.toHaveBeenCalled();
  });
});
