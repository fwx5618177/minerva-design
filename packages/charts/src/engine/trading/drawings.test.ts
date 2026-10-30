import { describe, expect, it } from "vitest";
import {
  anchorCount,
  handlePoints,
  hitDrawing,
  isFillable,
  moveHandle,
  paintDrawing,
  type DrawingMapper,
  type DrawingPaintContext,
} from "./drawings";
import { fill } from "./labels";
import type { TradingDrawing, TradingDrawingTool } from "./types";

// one bar per 10 px, one price unit per px (y grows downward)
const mapper: DrawingMapper = {
  x: (index) => index * 10,
  y: (price) => 500 - price,
  index: (time) => time,
  left: 0,
  right: 800,
  top: 0,
  bottom: 500,
};

const at = (time: number, price: number) => ({ time, price });

const drawing = (
  type: TradingDrawing["type"],
  points: TradingDrawing["points"],
  extra: Partial<TradingDrawing> = {},
): TradingDrawing => ({ id: type, type, points, ...extra });

/** A 2D context recording the calls, with measured text 6 px per character */
const recorder = () => {
  const calls: string[] = [];
  const ctx = new Proxy({} as Record<string | symbol, unknown>, {
    get(target, key) {
      if (key in target) return target[key];
      if (key === "measureText")
        return (text: string) => ({ width: text.length * 6 });
      return (...args: unknown[]) => {
        calls.push(
          `${String(key)}${key === "fillText" ? `:${String(args[0])}` : ""}`,
        );
      };
    },
    set(target, key, value) {
      target[key] = value;
      return true;
    },
  }) as unknown as CanvasRenderingContext2D;
  return { ctx, calls };
};

const context: DrawingPaintContext = {
  color: "#2962ff",
  text: "#111",
  background: "#fff",
  up: "#089981",
  down: "#f23645",
  font: "12px sans-serif",
  fontFamily: "sans-serif",
  formatPrice: (price) => price.toFixed(2),
  formatPercent: (value) => `${value.toFixed(2)}%`,
  formatSpan: (bars) => `${bars} bars`,
  textOn: () => "#fff",
  defaultText: "Text",
  position: {
    target: "Target {price} ({change})",
    stop: "Stop {price} ({change})",
    riskReward: "R:R {ratio}",
    profit: "P&L {value}",
    long: "Long",
    short: "Short",
  },
  last: 110,
  fill,
};

describe("drawing tools", () => {
  it("knows how many clicks make each drawing", () => {
    const counts: Partial<Record<TradingDrawingTool, number>> = {
      horizontalLine: 1,
      text: 1,
      longPosition: 1,
      parallelChannel: 3,
      pitchfork: 3,
      arrow: 2,
      fibRetracement: 2,
    };
    for (const [tool, count] of Object.entries(counts))
      expect(anchorCount(tool as TradingDrawing["type"])).toBe(count);
    expect(isFillable("rectangle")).toBe(true);
    expect(isFillable("trendLine")).toBe(false);
  });

  it("gives positions four handles: entry, target, stop and the end", () => {
    const long = drawing("longPosition", [
      at(10, 100),
      at(30, 120),
      at(30, 90),
    ]);
    expect(handlePoints(long, mapper)).toEqual([
      { x: 100, y: 400 },
      { x: 100, y: 380 },
      { x: 100, y: 410 },
      { x: 300, y: 400 },
    ]);
    expect(moveHandle(long, 1, at(12, 130))).toEqual([
      at(10, 100),
      at(30, 130),
      at(30, 90),
    ]);
    expect(moveHandle(long, 2, at(12, 80))[2]).toEqual(at(30, 80));
    expect(moveHandle(long, 3, at(40, 0))).toEqual([
      at(10, 100),
      at(40, 120),
      at(40, 90),
    ]);
    expect(moveHandle(long, 0, at(5, 101))[0]).toEqual(at(5, 101));
    // a click inside the box hits its body, a handle its handle
    expect(hitDrawing(long, mapper, { x: 200, y: 395 })).toEqual({
      part: "body",
    });
    expect(hitDrawing(long, mapper, { x: 300, y: 401 })).toEqual({
      part: "handle",
      index: 3,
    });
    expect(hitDrawing(long, mapper, { x: 500, y: 395 })).toBeNull();
  });

  it("hits channels inside, pitchforks along their tines, arrows on their shaft", () => {
    const channel = drawing("parallelChannel", [
      at(0, 100),
      at(40, 140),
      at(20, 150),
    ]);
    // the third handle sits on the parallel line
    expect(handlePoints(channel, mapper)[2]).toEqual({ x: 200, y: 350 });
    expect(hitDrawing(channel, mapper, { x: 200, y: 365 })).toEqual({
      part: "body",
    });
    expect(hitDrawing(channel, mapper, { x: 200, y: 450 })).toBeNull();
    expect(moveHandle(channel, 2, at(25, 160))[2]).toEqual(at(25, 160));

    const fork = drawing("pitchfork", [at(0, 100), at(20, 140), at(20, 60)]);
    // the median goes through (200, 400) and on
    expect(hitDrawing(fork, mapper, { x: 300, y: 401 })).toEqual({
      part: "body",
    });
    expect(hitDrawing(fork, mapper, { x: 100, y: 300 })).toBeNull();

    const arrow = drawing("arrow", [at(0, 100), at(20, 120)]);
    expect(hitDrawing(arrow, mapper, { x: 100, y: 390 })).toEqual({
      part: "body",
    });
  });

  it("hits text notes in their measured box", () => {
    const note = drawing("text", [at(10, 100)], { text: "Breakout" });
    const box = { x: 100, y: 400, w: 80, h: 24 };
    expect(hitDrawing(note, mapper, { x: 150, y: 410 }, 6, box)).toEqual({
      part: "body",
    });
    expect(hitDrawing(note, mapper, { x: 250, y: 410 }, 6, box)).toBeNull();
    expect(handlePoints(note, mapper, box)).toEqual([{ x: 100, y: 400 }]);
  });

  it("paints every tool, with the labels of positions and the box of texts", () => {
    const all: TradingDrawing[] = [
      drawing("trendLine", [at(0, 100), at(10, 120)]),
      drawing("ray", [at(0, 100), at(10, 120)]),
      drawing("extendedLine", [at(0, 100), at(10, 120)]),
      drawing("arrow", [at(0, 100), at(10, 120)], { lineStyle: "dashed" }),
      drawing("horizontalLine", [at(0, 100)]),
      drawing("verticalLine", [at(5, 100)]),
      drawing("rectangle", [at(0, 100), at(10, 120)], { fill: false }),
      drawing("parallelChannel", [at(0, 100), at(10, 120), at(5, 140)]),
      drawing("pitchfork", [at(0, 100), at(10, 120), at(10, 80)]),
      drawing("fibRetracement", [at(-10, 100), at(10, 120)]),
      drawing("measure", [at(0, 100), at(10, 90)]),
      drawing("shortPosition", [at(0, 100), at(20, 90), at(20, 105)], {
        quantity: 2,
      }),
    ];
    for (const d of all) {
      const { ctx, calls } = recorder();
      expect(
        paintDrawing(ctx, d, mapper, context, {
          selected: true,
          hovered: true,
        }),
      ).toBeNull();
      expect(calls.length).toBeGreaterThan(3);
    }
    const { ctx, calls } = recorder();
    paintDrawing(
      ctx,
      drawing("longPosition", [at(0, 100), at(20, 120), at(20, 90)]),
      mapper,
      context,
      { selected: false, hovered: false },
    );
    expect(calls).toContain("fillText:Target 120.00 (20.00%)");
    expect(calls).toContain("fillText:Stop 90.00 (-10.00%)");
    expect(calls).toContain("fillText:Long  ·  R:R 2.00  ·  P&L 10.00%");

    const text = recorder();
    const box = paintDrawing(
      text.ctx,
      drawing("text", [at(10, 100)], { text: "a\nbcd" }),
      mapper,
      context,
      { selected: false, hovered: false },
    );
    expect(box).toEqual({ x: 100, y: 400, w: 18 + 18, h: 2 * 18 + 10 });
    expect(text.calls).toContain("fillText:bcd");
    // an empty text shows the default text
    const empty = recorder();
    paintDrawing(empty.ctx, drawing("text", [at(10, 100)]), mapper, context, {
      selected: false,
      hovered: false,
    });
    expect(empty.calls).toContain("fillText:Text");
  });
});
