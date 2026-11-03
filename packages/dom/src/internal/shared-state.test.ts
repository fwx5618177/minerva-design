import { afterEach, describe, expect, it, vi } from "vitest";
import { sharedState } from "./shared-state";

const KEY = "shared-state-test.v1";
const symbol = Symbol.for(`minerva.dom.${KEY}`);

afterEach(() => {
  delete (globalThis as Record<symbol, unknown>)[symbol];
});

describe("sharedState", () => {
  it("creates the value once and returns it to every module copy", async () => {
    const init = vi.fn(() => ({ count: 0 }));
    const first = sharedState(KEY, init);
    first.count += 1;

    vi.resetModules();
    const copy = await import("./shared-state");
    expect(copy.sharedState).not.toBe(sharedState);
    expect(copy.sharedState(KEY, init)).toBe(first);
    expect(init).toHaveBeenCalledTimes(1);
  });

  it("stores the value on globalThis under Symbol.for, non-enumerable", () => {
    const value = sharedState(KEY, () => new Map());
    expect((globalThis as Record<symbol, unknown>)[symbol]).toBe(value);
    expect(
      Object.getOwnPropertyDescriptor(globalThis, symbol)?.enumerable,
    ).toBe(false);
  });
});
