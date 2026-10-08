import { describe, expect, it } from "vitest";
import {
  compareTableValues,
  getColumnCompare,
  nextSortState,
} from "./table-sort";

describe("compareTableValues", () => {
  it("compares numbers, dates and booleans by value", () => {
    expect(compareTableValues(2, 10)).toBeLessThan(0);
    expect(
      compareTableValues(new Date(2024, 1), new Date(2023, 1)),
    ).toBeGreaterThan(0);
    expect(compareTableValues(false, true)).toBeLessThan(0);
  });

  it("compares text numeric-aware and case-insensitively", () => {
    expect(compareTableValues("item 2", "item 10")).toBeLessThan(0);
    expect(compareTableValues("abc", "ABC")).toBe(0);
    expect(compareTableValues(5, "10")).toBeLessThan(0);
  });

  it("sorts empty values last", () => {
    expect(compareTableValues(null, 1)).toBe(1);
    expect(compareTableValues(1, undefined)).toBe(-1);
    expect(compareTableValues("", null)).toBe(0);
  });
});

describe("getColumnCompare", () => {
  const rows = [{ n: 3 }, { n: 1 }, { n: 2 }];

  it("uses a custom comparator, the default one, or none", () => {
    const custom = (a: { n: number }, b: { n: number }) => b.n - a.n;
    expect(getColumnCompare({ key: "n", sortable: custom })).toBe(custom);
    const byKey = getColumnCompare<{ n: number }>({
      key: "n",
      sortable: true,
    })!;
    expect([...rows].sort(byKey).map((r) => r.n)).toEqual([1, 2, 3]);
    expect(getColumnCompare({ key: "n" })).toBeNull();
    expect(getColumnCompare({ key: "n", sortable: false })).toBeNull();
  });
});

describe("nextSortState", () => {
  it("cycles ascend -> descend -> unsorted, restarting on another column", () => {
    expect(nextSortState(null, "a")).toEqual({ key: "a", order: "ascend" });
    expect(nextSortState({ key: "a", order: "ascend" }, "a")).toEqual({
      key: "a",
      order: "descend",
    });
    expect(nextSortState({ key: "a", order: "descend" }, "a")).toEqual({
      key: "a",
      order: null,
    });
    expect(nextSortState({ key: "a", order: null }, "a")).toEqual({
      key: "a",
      order: "ascend",
    });
    expect(nextSortState({ key: "a", order: "descend" }, "b")).toEqual({
      key: "b",
      order: "ascend",
    });
    expect(nextSortState(undefined, "a").order).toBe("ascend");
  });
});
