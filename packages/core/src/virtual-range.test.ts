import { describe, expect, it } from "vitest";
import { getVirtualRange } from "./virtual-range";

const base = { viewportHeight: 100, itemHeight: 20, itemCount: 1000 };

describe("getVirtualRange", () => {
  it("covers the viewport rows", () => {
    expect(getVirtualRange({ ...base, scrollTop: 0 })).toEqual({
      start: 0,
      end: 5,
      visibleCount: 5,
    });
    expect(getVirtualRange({ ...base, scrollTop: 210 })).toEqual({
      start: 10,
      end: 15,
      visibleCount: 5,
    });
  });

  it("adds the overscan on both sides, clamped to the list", () => {
    expect(getVirtualRange({ ...base, scrollTop: 200, overscan: 2 })).toEqual({
      start: 8,
      end: 17,
      visibleCount: 9,
    });
    expect(getVirtualRange({ ...base, scrollTop: 0, overscan: 2 }).start).toBe(
      0,
    );
    expect(
      getVirtualRange({ ...base, itemCount: 3, scrollTop: 0, overscan: 2 }).end,
    ).toBe(3);
  });

  it("treats a negative or NaN overscan as 0", () => {
    for (const overscan of [-3, NaN]) {
      expect(getVirtualRange({ ...base, scrollTop: 200, overscan })).toEqual({
        start: 10,
        end: 15,
        visibleCount: 5,
      });
    }
  });

  it("renders nothing without a row height", () => {
    expect(getVirtualRange({ ...base, itemHeight: 0, scrollTop: 0 })).toEqual({
      start: 0,
      end: 0,
      visibleCount: 0,
    });
  });
});
