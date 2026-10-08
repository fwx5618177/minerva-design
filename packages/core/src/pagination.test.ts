import { describe, expect, it } from "vitest";
import {
  getCompactPageItems,
  getPageRange,
  PAGINATION_JUMP_SIZE,
} from "./pagination";

describe("getPageRange", () => {
  it("centers a window of 5 pages on the current page", () => {
    expect(getPageRange(10, 20)).toEqual([8, 9, 10, 11, 12]);
  });

  it("clamps the window to the first and last pages", () => {
    expect(getPageRange(1, 20)).toEqual([1, 2, 3, 4, 5]);
    expect(getPageRange(20, 20)).toEqual([16, 17, 18, 19, 20]);
    expect(getPageRange(2, 3)).toEqual([1, 2, 3]);
    expect(getPageRange(1, 0)).toEqual([]);
  });

  it("accepts another window size", () => {
    expect(getPageRange(5, 10, 3)).toEqual([4, 5, 6]);
  });

  it("jumps by 5 pages", () => {
    expect(PAGINATION_JUMP_SIZE).toBe(5);
  });
});

describe("getCompactPageItems", () => {
  it("lists every page when they fit", () => {
    expect(getCompactPageItems(7, 4, 1, 1)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("shows a gap after the start cluster", () => {
    expect(getCompactPageItems(20, 2, 1, 1)).toEqual([
      1,
      2,
      3,
      4,
      5,
      "ellipsis-end",
      20,
    ]);
  });

  it("shows a gap before the end cluster", () => {
    expect(getCompactPageItems(20, 19, 1, 1)).toEqual([
      1,
      "ellipsis-start",
      16,
      17,
      18,
      19,
      20,
    ]);
  });

  it("shows gaps on both sides of the current page", () => {
    expect(getCompactPageItems(20, 10, 1, 1)).toEqual([
      1,
      "ellipsis-start",
      9,
      10,
      11,
      "ellipsis-end",
      20,
    ]);
    expect(getCompactPageItems(30, 15, 2, 2)).toEqual([
      1,
      2,
      "ellipsis-start",
      13,
      14,
      15,
      16,
      17,
      "ellipsis-end",
      29,
      30,
    ]);
  });
});
