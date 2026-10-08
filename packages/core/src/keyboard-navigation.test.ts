import { describe, expect, it, vi } from "vitest";
import { getNextIndex, type GetNextIndexOptions } from "./keyboard-navigation";
import { createTypeahead } from "./typeahead";

const next = (
  key: string,
  currentIndex: number,
  rest: Partial<GetNextIndexOptions> = {},
) => getNextIndex({ key, currentIndex, count: 5, ...rest });

describe("getNextIndex", () => {
  it("moves vertically and ignores Left/Right", () => {
    expect(next("ArrowDown", 0)).toBe(1);
    expect(next("ArrowUp", 2)).toBe(1);
    expect(next("ArrowRight", 0)).toBeNull();
    expect(next("ArrowLeft", 0)).toBeNull();
    expect(next("Enter", 0)).toBeNull();
  });

  it("moves horizontally and ignores Up/Down", () => {
    const h = { orientation: "horizontal" as const };
    expect(next("ArrowRight", 0, h)).toBe(1);
    expect(next("ArrowLeft", 1, h)).toBe(0);
    expect(next("ArrowDown", 0, h)).toBeNull();
    expect(next("ArrowUp", 0, h)).toBeNull();
  });

  it("swaps Left/Right in RTL", () => {
    const rtl = { orientation: "horizontal" as const, dir: "rtl" as const };
    expect(next("ArrowLeft", 0, rtl)).toBe(1);
    expect(next("ArrowRight", 1, rtl)).toBe(0);
  });

  it("handles both orientations", () => {
    const both = { orientation: "both" as const };
    expect(next("ArrowDown", 0, both)).toBe(1);
    expect(next("ArrowRight", 0, both)).toBe(1);
  });

  it("loops or stops at the edges", () => {
    expect(next("ArrowDown", 4)).toBe(0);
    expect(next("ArrowUp", 0)).toBe(4);
    expect(next("ArrowDown", 4, { loop: false })).toBeNull();
    expect(next("ArrowUp", 0, { loop: false })).toBeNull();
  });

  it("skips disabled items", () => {
    const isDisabled = (i: number) => i === 1 || i === 4;
    expect(next("ArrowDown", 0, { isDisabled })).toBe(2);
    expect(next("ArrowDown", 3, { isDisabled })).toBe(0);
    expect(next("Home", 3, { isDisabled: (i) => i === 0 })).toBe(1);
    expect(next("End", 0, { isDisabled })).toBe(3);
    expect(next("ArrowDown", 0, { isDisabled: (i) => i !== 0 })).toBeNull();
    expect(next("Home", 0, { isDisabled: () => true })).toBeNull();
  });

  it("starts from the edges without a current item", () => {
    expect(next("ArrowDown", -1)).toBe(0);
    expect(next("ArrowUp", -1)).toBe(4);
  });

  it("supports PageUp / PageDown with a page size", () => {
    expect(next("PageDown", 0)).toBeNull();
    const opts = { pageSize: 3, count: 10 };
    expect(next("PageDown", 0, opts)).toBe(3);
    expect(next("PageDown", 8, opts)).toBe(9);
    expect(next("PageUp", 5, opts)).toBe(2);
    expect(next("PageUp", 1, opts)).toBe(0);
    expect(next("PageUp", 0, opts)).toBeNull();
    expect(next("PageDown", -1, opts)).toBe(2);
    expect(next("PageUp", -1, opts)).toBe(7);
    // disabled target: nearest enabled one before it
    expect(next("PageDown", 0, { ...opts, isDisabled: (i) => i === 3 })).toBe(
      2,
    );
  });

  it("returns null for empty lists", () => {
    expect(
      getNextIndex({ key: "ArrowDown", currentIndex: -1, count: 0 }),
    ).toBeNull();
  });
});

describe("createTypeahead", () => {
  const items = ["Apple", "Banana", "apricot", "Blueberry", "Cherry"].map(
    (text) => ({ text }),
  );

  it("matches case-insensitively, accumulating characters", () => {
    const t = createTypeahead();
    expect(t.search("a", items, -1)).toBe(0);
    expect(t.search("p", items, 0)).toBe(0);
    expect(t.search("r", items, 0)).toBe(2);
    expect(t.getBuffer()).toBe("apr");
  });

  it("cycles through matches when repeating the same character", () => {
    const t = createTypeahead();
    expect(t.search("b", items, 0)).toBe(1);
    expect(t.search("b", items, 1)).toBe(3);
    expect(t.search("b", items, 3)).toBe(1);
  });

  it("starts after the current item for single characters", () => {
    const t = createTypeahead();
    expect(t.search("a", items, 0)).toBe(2);
  });

  it("resets after the timeout and on reset()", () => {
    vi.useFakeTimers();
    try {
      const t = createTypeahead({ timeout: 500 });
      expect(t.search("b", items, -1)).toBe(1);
      vi.advanceTimersByTime(600);
      expect(t.search("c", items, 1)).toBe(4);
      t.reset();
      expect(t.getBuffer()).toBe("");
    } finally {
      vi.useRealTimers();
    }
  });

  it("ignores non-printable keys, leading spaces and disabled items", () => {
    const t = createTypeahead();
    expect(t.search("Enter", items, 0)).toBe(-1);
    expect(t.search(" ", items, 0)).toBe(-1);
    const withDisabled = [
      { text: "Alpha", disabled: true },
      { text: "Avocado" },
    ];
    expect(t.search("a", withDisabled, -1)).toBe(1);
    t.reset();
    expect(t.search("z", items, 0)).toBe(-1);
  });

  it("allows spaces inside a search", () => {
    const t = createTypeahead();
    const list = [{ text: "New York" }, { text: "New Delhi" }];
    t.search("n", list, -1);
    t.search("e", list, 0);
    t.search("w", list, 0);
    t.search(" ", list, 0);
    expect(t.search("d", list, 0)).toBe(1);
  });

  it("returns -1 when only the current item matches a single character", () => {
    const t = createTypeahead();
    expect(t.search("c", items, 4)).toBe(-1);
  });
});
