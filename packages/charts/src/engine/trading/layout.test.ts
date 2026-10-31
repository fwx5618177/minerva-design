import { describe, expect, it } from "vitest";
import { boxesOverlap, firstFree, placeTags, stackLabels } from "./layout";

/** Whether laid-out labels overlap (`gap` pixels apart at least) */
const overlapping = (tops: (number | null)[], heights: number[], gap = 1) => {
  const spans = tops
    .map((top, k) => (top == null ? null : [top, top + (heights[k] ?? 0)]))
    .filter((span): span is number[] => span !== null)
    .sort((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
  return spans.some(
    (span, k) => k > 0 && (span[0] ?? 0) < (spans[k - 1]?.[1] ?? 0) + gap,
  );
};

describe("stackLabels", () => {
  it("keeps labels that do not overlap where they are", () => {
    expect(
      stackLabels(
        [
          { top: 10, height: 18 },
          { top: 60, height: 18 },
        ],
        0,
        200,
      ),
    ).toEqual([10, 60]);
  });

  it("spreads overlapping labels around their wished positions", () => {
    const tops = stackLabels(
      [
        { top: 100, height: 18 },
        { top: 104, height: 18 },
      ],
      0,
      200,
    );
    expect(overlapping(tops, [18, 18])).toBe(false);
    // centred: one moves up, the other down, by the same amount
    expect(tops[0]).toBeLessThan(100);
    expect(tops[1]).toBeGreaterThan(104);
    expect((tops[0] ?? 0) + (tops[1] ?? 0)).toBeCloseTo(204, 6);
  });

  it("merges chains of overlaps and keeps the input order of the result", () => {
    const labels = [
      { top: 52, height: 18 },
      { top: 50, height: 32 },
      { top: 48, height: 18 },
      { top: 120, height: 18 },
    ];
    const tops = stackLabels(labels, 0, 300);
    expect(overlapping(tops, [18, 32, 18, 18])).toBe(false);
    // the label wished highest stays on top
    expect(tops[2]).toBeLessThan(tops[1] ?? 0);
    expect(tops[1]).toBeLessThan(tops[0] ?? 0);
  });

  it("stays inside the range", () => {
    const tops = stackLabels(
      [
        { top: 190, height: 18 },
        { top: 195, height: 18 },
        { top: -20, height: 18 },
      ],
      0,
      200,
    );
    expect(Math.max(...tops.map((top) => (top ?? 0) + 18))).toBeLessThanOrEqual(
      200,
    );
    expect(Math.min(...tops.map((top) => top ?? 0))).toBeGreaterThanOrEqual(0);
    expect(overlapping(tops, [18, 18, 18])).toBe(false);
  });

  it("drops the labels of lowest priority when they cannot all fit", () => {
    const tops = stackLabels(
      [
        { top: 10, height: 18, priority: 1 },
        { top: 10, height: 18, priority: 5 },
        { top: 10, height: 18, priority: 0 },
      ],
      0,
      40,
    );
    expect(tops[2]).toBeNull();
    expect(tops[0]).not.toBeNull();
    expect(tops[1]).not.toBeNull();
    expect(overlapping(tops, [18, 18, 18])).toBe(false);
  });

  it("ignores labels without position or size", () => {
    expect(
      stackLabels(
        [
          { top: NaN, height: 18 },
          { top: 5, height: 0 },
          { top: 5, height: 18 },
        ],
        0,
        100,
      ),
    ).toEqual([null, null, 5]);
  });
});

describe("placeTags", () => {
  it("moves a tag at the same height left of the previous one", () => {
    const [a, b, c] = placeTags(
      [
        { right: 500, top: 100, width: 80, height: 18 },
        { right: 500, top: 105, width: 60, height: 18 },
        { right: 500, top: 300, width: 60, height: 18 },
      ],
      [],
      6,
    );
    expect(a).toBe(420);
    expect(b).toBe(420 - 6 - 60);
    expect(c).toBe(440);
  });

  it("keeps clear of fixed boxes", () => {
    const [left] = placeTags(
      [{ right: 500, top: 100, width: 50, height: 18 }],
      [{ left: 400, top: 95, right: 510, bottom: 117 }],
      4,
    );
    expect((left ?? 0) + 50).toBeLessThanOrEqual(400 - 4);
  });
});

describe("boxes", () => {
  const box = { left: 0, top: 0, right: 10, bottom: 10 };

  it("detects overlaps, with a margin", () => {
    expect(boxesOverlap(box, { left: 5, top: 5, right: 20, bottom: 20 })).toBe(
      true,
    );
    expect(boxesOverlap(box, { left: 12, top: 0, right: 20, bottom: 10 })).toBe(
      false,
    );
    expect(
      boxesOverlap(box, { left: 12, top: 0, right: 20, bottom: 10 }, 3),
    ).toBe(true);
  });

  it("finds the first candidate clear of the obstacles", () => {
    const obstacles = [{ left: 0, top: 0, right: 100, bottom: 20 }];
    expect(
      firstFree(
        [
          { left: 10, top: 5, right: 40, bottom: 15 },
          { left: 10, top: 30, right: 40, bottom: 40 },
        ],
        obstacles,
      ),
    ).toBe(1);
    expect(
      firstFree([{ left: 10, top: 5, right: 40, bottom: 15 }], obstacles),
    ).toBe(-1);
  });
});
