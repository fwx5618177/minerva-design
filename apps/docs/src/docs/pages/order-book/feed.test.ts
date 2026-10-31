import { describe, expect, it } from "vitest";
import { createHistory, createMarketFeed } from "./feed";

describe("simulated market feed", () => {
  it("is deterministic for a seed", () => {
    const a = createMarketFeed({ seed: 3, start: 0 });
    const b = createMarketFeed({ seed: 3, start: 0 });
    for (let i = 0; i < 200; i++) {
      expect(a.step(50)).toEqual(b.step(50));
    }
    expect(a.snapshot()).toEqual(b.snapshot());
  });

  it("never crosses the book (best bid < best ask)", () => {
    for (const whales of [0.006, 0.03]) {
      const feed = createMarketFeed({ seed: 11, whales, start: 0 });
      for (let i = 0; i < 1500; i++) {
        feed.step(i % 7 === 0 ? 100 : 20);
        const { bids, asks } = feed.snapshot();
        expect(bids[0]![0]).toBeLessThan(asks[0]![0]);
      }
    }
  });

  it("keeps the levels sorted, positive and on the tick", () => {
    const { feed, updates } = createHistory({ seed: 5 }, 10_000);
    expect(updates.length).toBeGreaterThan(90);
    const { bids, asks } = feed.snapshot();
    for (const side of [bids, asks]) {
      expect(side.length).toBeGreaterThan(500);
      for (let i = 0; i < side.length; i++) {
        const [price, size] = side[i]!;
        expect(size).toBeGreaterThan(0);
        expect(Math.abs(price * 10 - Math.round(price * 10))).toBeLessThan(
          1e-6,
        );
        if (i) {
          const previous = side[i - 1]![0];
          expect(side === bids ? price < previous : price > previous).toBe(
            true,
          );
        }
      }
    }
  });

  it("has a few walls far above the typical level, which come and go", () => {
    const feed = createMarketFeed({ seed: 21, start: 0 });
    const large = (minSize: number) => {
      const { bids, asks } = feed.snapshot();
      const near = [...bids.slice(0, 600), ...asks.slice(0, 600)];
      const sizes = near.map(([, s]) => s).sort((x, y) => x - y);
      const median = sizes[Math.floor(sizes.length / 2)]!;
      return {
        median,
        walls: new Set(
          near.filter(([, s]) => s >= minSize).map(([p]) => p.toFixed(1)),
        ),
      };
    };
    const first = large(4);
    // typical levels are thin, walls stand far above them
    expect(first.median).toBeGreaterThan(0.05);
    expect(first.median).toBeLessThan(1);
    expect(first.walls.size).toBeGreaterThan(0);
    expect(first.walls.size).toBeLessThan(30);
    for (let i = 0; i < 1200; i++) feed.step(100);
    const later = large(4);
    // two minutes later some walls are gone and new ones appeared
    const kept = [...first.walls].filter((p) => later.walls.has(p)).length;
    expect(kept).toBeLessThan(first.walls.size);
    expect(later.walls.size - kept).toBeGreaterThan(0);
  });
});
