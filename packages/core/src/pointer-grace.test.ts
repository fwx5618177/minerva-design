import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createPointerGrace,
  getGraceArea,
  isPointInPolygon,
  type GraceRect,
} from "./pointer-grace";

const square = [
  { x: 0, y: 0 },
  { x: 10, y: 0 },
  { x: 10, y: 10 },
  { x: 0, y: 10 },
];

// a submenu to the right of the exit point
const rect: GraceRect = { left: 100, right: 200, top: 0, bottom: 100 };

afterEach(() => {
  vi.useRealTimers();
});

describe("isPointInPolygon", () => {
  it("detects points inside / outside", () => {
    expect(isPointInPolygon({ x: 5, y: 5 }, square)).toBe(true);
    expect(isPointInPolygon({ x: 15, y: 5 }, square)).toBe(false);
    expect(isPointInPolygon({ x: -1, y: -1 }, square)).toBe(false);
  });
});

describe("getGraceArea", () => {
  it("builds a triangle-ish polygon towards the target (right)", () => {
    const area = getGraceArea({ x: 90, y: 50 }, rect, "right");
    expect(area[0]).toEqual({ x: 85, y: 50 });
    // heading towards the submenu
    expect(isPointInPolygon({ x: 95, y: 50 }, area)).toBe(true);
    expect(isPointInPolygon({ x: 98, y: 20 }, area)).toBe(true);
    // moving away (down past the triangle)
    expect(isPointInPolygon({ x: 92, y: 95 }, area)).toBe(false);
    // behind the exit point
    expect(isPointInPolygon({ x: 80, y: 50 }, area)).toBe(false);
  });

  it("supports every side", () => {
    const left = getGraceArea({ x: 210, y: 50 }, rect, "left", 2);
    expect(left[0]).toEqual({ x: 212, y: 50 });
    expect(isPointInPolygon({ x: 205, y: 50 }, left)).toBe(true);

    const below = { left: 0, right: 100, top: 100, bottom: 200 };
    const bottom = getGraceArea({ x: 50, y: 90 }, below, "bottom");
    expect(isPointInPolygon({ x: 50, y: 95 }, bottom)).toBe(true);

    const above = { left: 0, right: 100, top: 0, bottom: 50 };
    const top = getGraceArea({ x: 50, y: 60 }, above, "top");
    expect(isPointInPolygon({ x: 50, y: 55 }, top)).toBe(true);
    expect(isPointInPolygon({ x: 50, y: 70 }, top)).toBe(false);
  });
});

describe("createPointerGrace", () => {
  it("tracks the grace area until cleared", () => {
    const grace = createPointerGrace();
    expect(grace.isInGraceArea({ x: 95, y: 50 })).toBe(false);
    expect(grace.getArea()).toBeNull();
    grace.start({ x: 90, y: 50 }, rect, "right");
    expect(grace.getArea()).toHaveLength(5);
    expect(grace.isInGraceArea({ x: 95, y: 50 })).toBe(true);
    expect(grace.isInGraceArea({ x: 50, y: 50 })).toBe(false);
    grace.clear();
    expect(grace.isInGraceArea({ x: 95, y: 50 })).toBe(false);
  });

  it("expires after the timeout", () => {
    vi.useFakeTimers();
    const grace = createPointerGrace({ timeout: 300, padding: 3 });
    grace.start({ x: 90, y: 50 }, rect, "right");
    vi.advanceTimersByTime(301);
    expect(grace.getArea()).toBeNull();
    grace.start({ x: 90, y: 50 }, rect, "right");
    vi.advanceTimersByTime(301);
    expect(grace.isInGraceArea({ x: 95, y: 50 })).toBe(false);
  });

  it("never expires with timeout 0", () => {
    vi.useFakeTimers();
    const grace = createPointerGrace({ timeout: 0 });
    grace.start({ x: 90, y: 50 }, rect, "right");
    vi.advanceTimersByTime(10_000);
    expect(grace.isInGraceArea({ x: 95, y: 50 })).toBe(true);
  });
});
