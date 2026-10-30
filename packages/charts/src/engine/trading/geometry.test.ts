import { describe, expect, it } from "vitest";
import { GAP } from "../renderers/types";
import { LineBuffer, TrendBuffer } from "./geometry";

/** Runs of points of a line buffer, split at its gaps */
const runs = (buffer: LineBuffer): number[][][] => {
  const { points, count } = buffer.item("", 0, [0, 0, 0, 1], 1);
  const result: number[][][] = [];
  let run: number[][] = [];
  for (let i = 0; i < count; i++) {
    const x = points[i * 2] ?? 0;
    const y = points[i * 2 + 1] ?? 0;
    if (x === GAP || y >= 1e37) {
      if (run.length) result.push(run);
      run = [];
    } else run.push([x, y]);
  }
  if (run.length) result.push(run);
  return result;
};

describe("trend line buffer", () => {
  it("joins the runs of each color where the trend flips", () => {
    const line = new TrendBuffer(0, 100);
    line.push(0, 10, true);
    line.push(10, 20, true);
    line.push(20, 80, false);
    line.push(30, 70, false);
    line.push(40, 30, true);
    // each run starts at the last point of the previous one
    expect(runs(line.up)).toEqual([
      [
        [0, 10],
        [10, 20],
      ],
      [
        [30, 70],
        [40, 30],
      ],
    ]);
    expect(runs(line.down)).toEqual([
      [
        [10, 20],
        [20, 80],
        [30, 70],
      ],
    ]);
  });

  it("breaks on missing values", () => {
    const line = new TrendBuffer(0, 100);
    line.push(0, 10, true);
    line.push(10, 20, true);
    line.push(20, NaN, true);
    line.push(30, 70, false);
    line.push(40, 60, false);
    expect(runs(line.up)).toEqual([
      [
        [0, 10],
        [10, 20],
      ],
    ]);
    // no join across the gap
    expect(runs(line.down)).toEqual([
      [
        [30, 70],
        [40, 60],
      ],
    ]);
  });
});
