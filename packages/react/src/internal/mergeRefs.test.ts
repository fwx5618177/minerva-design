import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { mergeRefs } from "./mergeRefs";

describe("mergeRefs", () => {
  it("assigns object and callback refs and clears them on cleanup", () => {
    const objectRef = createRef<HTMLDivElement>();
    const callbackRef = vi.fn();
    const node = document.createElement("div");
    const cleanup = mergeRefs(objectRef, callbackRef, undefined)(node);
    expect(objectRef.current).toBe(node);
    expect(callbackRef).toHaveBeenCalledWith(node);
    (cleanup as () => void)();
    expect(objectRef.current).toBeNull();
    expect(callbackRef).toHaveBeenLastCalledWith(null);
  });

  it("runs React 19 callback-ref cleanups instead of calling with null", () => {
    const inner = vi.fn();
    const ref = vi.fn(() => inner);
    const cleanup = mergeRefs(ref)(document.createElement("span"));
    (cleanup as () => void)();
    expect(inner).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenCalledTimes(1);
  });
});
