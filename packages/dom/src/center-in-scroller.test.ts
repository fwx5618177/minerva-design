import { describe, expect, it } from "vitest";
import { centerInScroller } from "./center-in-scroller";

const rect = (left: number, width: number) =>
  ({
    left,
    width,
    right: left + width,
    top: 0,
    bottom: 20,
    height: 20,
  }) as DOMRect;

/** A 200px-wide row of 1000px content, with an item at `itemX` (content x). */
function setup(itemX: number, dir?: "rtl") {
  const scroller = document.createElement("div");
  if (dir) scroller.setAttribute("dir", dir);
  const item = document.createElement("button");
  scroller.append(item);
  Object.defineProperty(scroller, "clientWidth", { value: 200 });
  Object.defineProperty(scroller, "scrollWidth", { value: 1000 });
  scroller.getBoundingClientRect = () => rect(0, 200);
  // RTL content starts at the right edge: scrollLeft 0 shows its end
  item.getBoundingClientRect = () =>
    rect(
      dir ? itemX - 800 - scroller.scrollLeft : itemX - scroller.scrollLeft,
      20,
    );
  return { scroller, item };
}

describe("centerInScroller", () => {
  it("centers the item in the row", () => {
    const { scroller, item } = setup(500);
    centerInScroller(scroller, item);
    // item center 510 - row center 100
    expect(scroller.scrollLeft).toBe(410);
    centerInScroller(scroller, item);
    expect(scroller.scrollLeft).toBe(410);
  });

  it("clamps to the scrollable range", () => {
    const start = setup(20);
    start.scroller.scrollLeft = 300;
    centerInScroller(start.scroller, start.item);
    expect(start.scroller.scrollLeft).toBe(0);
    const end = setup(970);
    centerInScroller(end.scroller, end.item);
    expect(end.scroller.scrollLeft).toBe(800);
  });

  it("clamps to the negative range in RTL", () => {
    const { scroller, item } = setup(20, "rtl");
    centerInScroller(scroller, item);
    expect(scroller.scrollLeft).toBe(-800);
    const middle = setup(500, "rtl");
    centerInScroller(middle.scroller, middle.item);
    expect(middle.scroller.scrollLeft).toBe(-390);
  });

  it("leaves rows that do not overflow alone", () => {
    const scroller = document.createElement("div");
    const item = document.createElement("button");
    scroller.append(item);
    centerInScroller(scroller, item);
    expect(scroller.scrollLeft).toBe(0);
  });
});
