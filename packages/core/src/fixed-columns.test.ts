import { describe, expect, it } from "vitest";
import { computeFixedColumnLayout } from "./fixed-columns";

describe("computeFixedColumnLayout", () => {
  it("accumulates left offsets from the start and right offsets from the end", () => {
    const layout = computeFixedColumnLayout([
      { key: "id", width: 80, fixed: "left" },
      { key: "name", width: "120px", fixed: "left" },
      { key: "status", width: 100 },
      { key: "actions", width: 60, fixed: "right" },
      { key: "more", width: 40, fixed: "right" },
    ]);
    expect(layout).toEqual({
      leftOffsets: { id: 0, name: 80 },
      rightOffsets: { more: 0, actions: 40 },
      lastLeftFixedKey: "name",
      firstRightFixedKey: "actions",
    });
  });

  it("counts missing or non-numeric widths as 0", () => {
    const layout = computeFixedColumnLayout([
      { key: "a", fixed: "left" },
      { key: "b", width: "auto", fixed: "left" },
      { key: "c", width: "10rem", fixed: "left" },
      { key: "d" },
    ]);
    expect(layout.leftOffsets).toEqual({ a: 0, b: 0, c: 0 });
  });

  it("stops the edge keys at the first non-fixed column", () => {
    const layout = computeFixedColumnLayout([
      { key: "a", width: 10, fixed: "left" },
      { key: "b" },
      { key: "c", width: 10, fixed: "left" },
      { key: "d", width: 10, fixed: "right" },
      { key: "e" },
      { key: "f", width: 10, fixed: "right" },
    ]);
    expect(layout.lastLeftFixedKey).toBe("a");
    expect(layout.firstRightFixedKey).toBe("f");
    expect(layout.leftOffsets).toEqual({ a: 0, c: 10 });
    expect(layout.rightOffsets).toEqual({ f: 0, d: 10 });
  });

  it("has no edge keys without fixed columns", () => {
    expect(computeFixedColumnLayout([{ key: "a" }])).toEqual({
      leftOffsets: {},
      rightOffsets: {},
      lastLeftFixedKey: undefined,
      firstRightFixedKey: undefined,
    });
  });
});
