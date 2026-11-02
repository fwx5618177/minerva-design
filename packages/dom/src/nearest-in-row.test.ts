import { describe, expect, it } from "vitest";
import { nearestInRow } from "./nearest-in-row";

const box = (left: number, top: number, width = 20, height = 20) => {
  const element = document.createElement("button");
  element.getBoundingClientRect = () =>
    ({
      left,
      top,
      width,
      height,
      right: left + width,
      bottom: top + height,
    }) as DOMRect;
  return element;
};

describe("nearestInRow", () => {
  // row 0: 0 30 60 90; row 1: 0 30; row 2: 0
  const items = [
    box(0, 0),
    box(30, 0),
    box(60, 0),
    box(90, 0),
    box(0, 30),
    box(30, 30),
    box(0, 60),
  ];

  it("finds the closest item of the next row", () => {
    expect(nearestInRow(items, items[1], 1)).toBe(items[5]);
    expect(nearestInRow(items, items[3], 1)).toBe(items[5]);
    expect(nearestInRow(items, items[5], 1)).toBe(items[6]);
    expect(nearestInRow(items, items[5], -1)).toBe(items[1]);
    expect(nearestInRow(items, items[6], -1)).toBe(items[4]);
  });

  it("returns null at the edges or without layout", () => {
    expect(nearestInRow(items, items[0], -1)).toBeNull();
    expect(nearestInRow(items, items[6], 1)).toBeNull();
    const flat = [box(0, 0, 0, 0), box(0, 0, 0, 0)];
    expect(nearestInRow(flat, flat[0], 1)).toBeNull();
  });
});
