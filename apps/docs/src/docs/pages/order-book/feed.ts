// Simulated market for the order book demos: a seeded matching engine
// (limit orders, cancels and market orders sweeping the book) producing a
// snapshot, incremental deltas and trades like an exchange WebSocket feed,
// plus a loop hook that stops on unmount and while the demo is off screen.
// The resting liquidity looks like a real book: a smooth landscape over
// price that drifts over time, clusters at round prices, a thicker zone at
// the touch, and a few large walls with a life of their own (added, pulled
// before the price gets there, or eaten by block trades).
// Not a demo itself: only `demos/*.tsx` files are collected.

import { useEffect, useRef, type RefObject } from "react";
import type {
  OrderBookDelta,
  OrderBookHeatmapHandle,
  OrderBookLevel,
  OrderBookSnapshot,
  MarketTrade,
} from "minerva-design/charts";

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface FeedOptions {
  /** Seed of the random generator (same seed, same market) */
  seed?: number;
  /** Starting price */
  price?: number;
  /** Price increment */
  tick?: number;
  /** Levels kept on each side */
  levels?: number;
  /** Order book events per second */
  activity?: number;
  /** Probability that an order is a large one (walls, block trades) */
  whales?: number;
  /** Clock of the first update (ms since epoch) */
  start?: number;
}

export interface FeedUpdate {
  /** Levels changed by the update (size 0 removes a level) */
  delta: OrderBookDelta & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
    time: number;
  };
  /** Trades of the update, oldest first */
  trades: MarketTrade[];
}

export interface MarketFeed {
  readonly tick: number;
  /** Full book, best levels first */
  snapshot(): OrderBookSnapshot & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
  };
  /** Advances the market by `ms` milliseconds */
  step(ms: number): FeedUpdate;
  /** Price of the last trade */
  last(): number;
  /** Clock of the market (ms since epoch) */
  time(): number;
}

type Side = "bid" | "ask";

/** A large resting order with a life of its own */
interface Wall {
  /** Size it added to its level */
  size: number;
  /** Clock at which it is pulled (unless the price is already there) */
  until: number;
  /** Pulled as soon as the price comes close (spoofing) */
  spoof: boolean;
}

/** Smoothstep */
const smooth = (t: number) => t * t * (3 - 2 * t);

export function createMarketFeed(options: FeedOptions = {}): MarketFeed {
  const seed = options.seed ?? 7;
  const random = mulberry32(seed);
  const tick = options.tick ?? 0.1;
  const decimals = Math.max(0, Math.round(-Math.log10(tick)));
  const depth = options.levels ?? 1500;
  const activity = options.activity ?? 140;
  const whales = options.whales ?? 0.006;
  /** Walls compared with the default market */
  const wallRate = whales / 0.006;
  let time = options.start ?? Date.now();
  /** Time since the start (drives the liquidity landscape) */
  let elapsed = 0;
  // prices are integers of ticks: no rounding drift
  const center = Math.round((options.price ?? 64000) / tick);
  const books: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const walls: Record<Side, Map<number, Wall>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const best: Record<Side, number> = { bid: center - 1, ask: center };
  let last = center * tick;
  /** Hidden fair value (ticks): a random walk the quotes and orders chase */
  let fair = center - 0.5;
  let momentum = 0;

  const gauss = () => {
    const u = Math.max(1e-9, random());
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
  };
  const lognormal = (median: number, sigma: number) =>
    median * Math.exp(sigma * gauss());
  const round = (size: number) =>
    Math.max(0.0001, Math.round(size * 1e4) / 1e4);
  const priceOf = (index: number) => +(index * tick).toFixed(decimals);
  const sign = (side: Side) => (side === "bid" ? -1 : 1);
  const at = (side: Side, distance: number) =>
    best[side] + sign(side) * distance;
  /** Distance of a price from its side's best (negative: crossed) */
  const distanceOf = (side: Side, index: number) =>
    side === "bid" ? best.bid - index : index - best.ask;

  /** Seeded lattice hash in [0, 1) (stateless: the landscape is a field) */
  const hash = (i: number, j: number, octave: number) => {
    let h =
      Math.imul(i | 0, 0x27d4eb2d) ^
      Math.imul(j | 0, 0x165667b1) ^
      Math.imul((seed + octave * 7919) | 0, 0x9e3779b1);
    h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  /** Smooth value noise in [-1, 1] over (price, time) lattice units */
  const noise = (x: number, y: number, octave: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = smooth(x - xi);
    const fy = smooth(y - yi);
    const a = hash(xi, yi, octave);
    const b = hash(xi + 1, yi, octave);
    const c = hash(xi, yi + 1, octave);
    const d = hash(xi + 1, yi + 1, octave);
    return (
      2 * (a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy) - 1
    );
  };
  /**
   * Typical size of a level: thicker at the touch (makers refresh it) and
   * slowly deeper in the book, times a smooth landscape over price (zones
   * of 3 to 12 USD at the default tick) that drifts within a minute, times
   * the clustering at round prices (every 1, 5 and 10 USD)
   */
  const target = (side: Side, index: number) => {
    const d = Math.max(0, distanceOf(side, index));
    const landscape = Math.exp(
      1.05 *
        (0.7 * noise(index / 120, elapsed / 22_000, 1) +
          0.45 * noise(index / 35, elapsed / 9_000, 2)),
    );
    const roundness =
      index % 100 === 0 ? 3 : index % 50 === 0 ? 2 : index % 10 === 0 ? 1.3 : 1;
    return (
      (0.08 + 0.0004 * d) *
      (1 + 1.4 * Math.exp(-d / 15)) *
      landscape *
      roundness
    );
  };
  /** Resting size of a new level: its typical size with noise */
  const levelSize = (side: Side, index: number) =>
    round(target(side, index) * Math.exp(0.7 * gauss()));
  /** Far from the touch, fewer prices hold orders */
  const emptiness = (distance: number) =>
    distance > 3 ? Math.min(0.6, 0.05 + distance / 2500) : 0;

  let touched: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const set = (side: Side, index: number, size: number) => {
    if (size > 0.00005) books[side].set(index, round(size));
    else books[side].delete(index);
    touched[side].set(index, size > 0.00005 ? round(size) : 0);
  };

  /** Adds a wall (or grows one) living until `until` */
  const addWall = (
    side: Side,
    index: number,
    size: number,
    until: number,
    spoof: boolean,
  ) => {
    set(side, index, (books[side].get(index) ?? 0) + size);
    const wall = walls[side].get(index);
    if (wall) {
      wall.size += size;
      wall.until = Math.max(wall.until, until);
    } else walls[side].set(index, { size, until, spoof });
  };
  /** Size of a wall: a few times a typical level (3 to 12 here) */
  const wallSize = () => lognormal(3.2, 0.5);

  for (const side of ["bid", "ask"] as const) {
    for (let d = 0; d < depth; d++) {
      if (random() < emptiness(d)) continue;
      const index = at(side, d);
      books[side].set(index, levelSize(side, index));
      // a few walls from the start (most at round prices), with varied
      // lives: some end early, a few outlast the window
      const p =
        0.003 *
        wallRate *
        (index % 100 === 0
          ? 8
          : index % 50 === 0
            ? 5
            : index % 10 === 0
              ? 2
              : 1);
      if (d > 8 && random() < p)
        addWall(
          side,
          index,
          wallSize(),
          time + 5_000 + random() * 90_000,
          random() < 0.3,
        );
    }
  }

  /** Best level again after a removal (scans away from the spread) */
  const rescan = (side: Side) => {
    const book = books[side];
    if (book.has(best[side])) return;
    for (let d = 1; d < depth * 3; d++) {
      const index = best[side] + sign(side) * d;
      if (book.has(index)) {
        best[side] = index;
        return;
      }
    }
    // empty side: a fresh level next to the other one
    best[side] = side === "bid" ? best.ask - 1 : best.bid + 1;
    set(side, best[side], levelSize(side, best[side]));
  };

  const limit = (side: Side) => {
    const spread = best.ask - best.bid;
    let index: number;
    if (spread > 1 && random() < (spread > 4 ? 0.95 : 0.6)) {
      // improve the price inside the spread; after a sweep, makers quote
      // back into the gap (up to half of it at once): it closes in ms
      const jump =
        1 + Math.floor(random() * Math.max(1, Math.floor((spread - 1) / 2)));
      index = side === "bid" ? best.bid + jump : best.ask - jump;
    } else {
      index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 7));
    }
    if (side === "bid" && index >= best.ask) index = best.ask - 1;
    if (side === "ask" && index <= best.bid) index = best.bid + 1;
    if (random() < whales * 0.3) {
      // a large passive order at the touch: absorbs the flow for a while
      addWall(
        side,
        index,
        lognormal(5, 0.5),
        time + 5_000 + random() * 25_000,
        false,
      );
    } else {
      // makers refresh the liquidity near the touch
      const d = Math.max(0, distanceOf(side, index));
      const size = lognormal(0.12 * (1 + 1.2 * Math.exp(-d / 15)), 0.6);
      set(side, index, (books[side].get(index) ?? 0) + size);
    }
    if (side === "bid" ? index > best.bid : index < best.ask)
      best[side] = index;
  };

  const cancel = (side: Side) => {
    const index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 9));
    const size = books[side].get(index);
    // walls leave on their own schedule
    if (size === undefined || walls[side].has(index)) return;
    set(side, index, random() < 0.4 ? 0 : size * (0.2 + random() * 0.6));
    rescan(side);
  };

  /** Pulls the best level (a stale quote) */
  const cancelTouch = (side: Side) => {
    const size = books[side].get(best[side]);
    if (size === undefined) return rescan(side);
    if (walls[side].has(best[side])) return;
    set(side, best[side], random() < 0.6 ? 0 : size * 0.3);
    rescan(side);
  };

  const market = (
    buy: boolean,
    trades: MarketTrade[],
    now: number,
    amount?: number,
  ) => {
    const side: Side = buy ? "ask" : "bid";
    let remaining =
      amount ??
      (random() < whales ? lognormal(6, 0.6) : lognormal(0.035, 1.35));
    remaining = round(remaining);
    for (let sweep = 0; sweep < 40 && remaining > 0.00005; sweep++) {
      const index = best[side];
      const size = books[side].get(index) ?? 0;
      if (size <= 0) {
        rescan(side);
        continue;
      }
      const fill = round(Math.min(size, remaining));
      trades.push({
        time: now,
        price: priceOf(index),
        size: fill,
        side: buy ? "buy" : "sell",
      });
      last = priceOf(index);
      remaining -= fill;
      set(side, index, size - fill > 0.00005 ? size - fill : 0);
      rescan(side);
    }
  };

  /**
   * Life of the walls: spoofs are pulled when the price comes close, real
   * ones at the touch are eaten by block trades, the others are pulled at
   * the end of their life; new ones appear away from the touch
   */
  const liveWalls = (ms: number, trades: MarketTrade[], now: number) => {
    for (const side of ["bid", "ask"] as const) {
      for (const [index, wall] of [...walls[side]]) {
        const current = books[side].get(index) ?? 0;
        const d = distanceOf(side, index);
        if (d < 0 || current < wall.size * 0.15) {
          walls[side].delete(index);
        } else if (wall.spoof && d <= 15) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
          rescan(side);
        } else if (d === 0) {
          // absorbed by aggressive orders: large bubbles
          if (random() < ms / 1500)
            market(
              side === "ask",
              trades,
              now,
              current * (0.3 + random() * 0.5),
            );
        } else if (time >= wall.until && d > 3) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
        }
      }
    }
    if (random() < (ms / 8000) * wallRate) {
      const side: Side = random() < 0.5 ? "bid" : "ask";
      let d = 10 + Math.floor(random() * 140);
      let index = at(side, d);
      if (random() < 0.6) {
        // at a round price (1 USD at the default tick), away from the touch
        index =
          side === "bid"
            ? Math.floor(index / 10) * 10
            : Math.ceil(index / 10) * 10;
        d = distanceOf(side, index);
      }
      if (d >= 8)
        addWall(
          side,
          index,
          wallSize(),
          time + 10_000 + random() * 50_000,
          random() < 0.3,
        );
    }
  };

  /**
   * Deep in the book orders come and go: levels drift slowly toward the
   * landscape (horizontal lines change intensity over time), holes fill
   * and levels vanish so the density stays put, far levels are dropped
   */
  const drift = (ms: number) => {
    const visits = Math.ceil((depth * ms) / 900);
    for (const side of ["bid", "ask"] as const) {
      for (let k = 0; k < visits; k++) {
        const d = 4 + Math.floor(random() * depth);
        const index = at(side, d);
        if (walls[side].has(index)) continue;
        const size = books[side].get(index);
        const empty = emptiness(d);
        if (size === undefined) {
          if (random() < (1 - empty) * 0.1)
            set(side, index, levelSize(side, index));
          continue;
        }
        if (random() < empty * 0.1) {
          set(side, index, 0);
          continue;
        }
        if (random() < 0.05) {
          // a stale order is pulled and re-added at the current depth: no
          // liquidity line runs unchanged through the whole history
          set(side, index, 0);
          if (random() > empty) set(side, index, levelSize(side, index));
          continue;
        }
        const log = Math.log(size);
        const goal = Math.log(target(side, index));
        set(side, index, Math.exp(log + 0.1 * gauss() + 0.16 * (goal - log)));
      }
      if (random() < 0.05) {
        for (const index of books[side].keys()) {
          if (Math.abs(index - best[side]) > depth * 1.3) {
            set(side, index, 0);
            walls[side].delete(index);
          }
        }
      }
    }
  };

  const levels = (side: Side): OrderBookLevel[] =>
    [...books[side].entries()]
      .sort((a, b) => (side === "bid" ? b[0] - a[0] : a[0] - b[0]))
      .map(([index, size]) => [priceOf(index), size]);

  /**
   * Safety net of the invariant best bid < best ask: any level at or
   * through the other side's best is removed (the matching engine never
   * produces one, this keeps the feed sound whatever the parameters)
   */
  const uncross = () => {
    for (let guard = 0; guard < 64; guard++) {
      const bid = Math.max(-Infinity, ...books.bid.keys());
      const ask = Math.min(Infinity, ...books.ask.keys());
      if (bid < ask) {
        if (Number.isFinite(bid)) best.bid = bid;
        if (Number.isFinite(ask)) best.ask = ask;
        return;
      }
      // the older side wins: drop the level that crossed it
      if (best.bid >= ask) set("bid", bid, 0);
      else set("ask", ask, 0);
    }
  };

  return {
    tick,
    snapshot: () => ({ bids: levels("bid"), asks: levels("ask"), time }),
    step(ms) {
      touched = { bid: new Map(), ask: new Map() };
      const trades: MarketTrade[] = [];
      const start = time;
      const span = Math.max(0, ms);
      time += span;
      elapsed += span;
      // the fair value wanders (with some momentum); orders chase it
      const seconds = span / 1000;
      momentum =
        momentum * Math.exp(-seconds / 20) + gauss() * Math.sqrt(seconds) * 0.6;
      fair += momentum * seconds * 3 + gauss() * Math.sqrt(seconds) * 15;
      const mid = (best.bid + best.ask) / 2;
      const pull = Math.max(-0.38, Math.min(0.38, (fair - mid) / 25));
      const expected = (activity * span) / 1000;
      const events = Math.floor(expected * (0.4 + random() * 1.2) + random());
      for (let e = 0; e < events; e++) {
        const now = Math.round(
          start + ((e + 1) * (time - start)) / (events + 1),
        );
        const r = random();
        const bias = 0.5 + pull;
        if (r < 0.5) limit(random() < bias ? "bid" : "ask");
        else if (r < 0.76) cancel(random() < 1 - bias ? "bid" : "ask");
        else if (r < 0.86) {
          // stale quotes on the wrong side of the fair value are pulled
          if (best.bid > fair + 1) cancelTouch("bid");
          else if (best.ask < fair - 1) cancelTouch("ask");
          else cancel(random() < 0.5 ? "bid" : "ask");
        } else market(random() < bias, trades, now);
      }
      liveWalls(span, trades, time);
      drift(span);
      uncross();
      const tuples = (side: Side): OrderBookLevel[] =>
        [...touched[side]].map(([index, size]) => [priceOf(index), size]);
      return {
        delta: { bids: tuples("bid"), asks: tuples("ask"), time },
        trades,
      };
    },
    last: () => last,
    time: () => time,
  };
}

/**
 * A market with `ms` of history: the book at `now - ms` and the updates
 * since then, every `step` ms (backfills a heatmap); `feed` goes on live.
 */
export function createHistory(
  options: FeedOptions,
  ms: number,
  step = 100,
): { feed: MarketFeed; snapshot: OrderBookSnapshot; updates: FeedUpdate[] } {
  const now = Date.now();
  const feed = createMarketFeed({ ...options, start: now - ms });
  const snapshot = feed.snapshot();
  const updates: FeedUpdate[] = [];
  while (feed.time() < now) updates.push(feed.step(step));
  return { feed, snapshot, updates };
}

/**
 * Calls `onTick(elapsed ms)` every `interval` ms while `running`, the
 * element is on screen and the page visible; stops on unmount.
 */
export function useFeedLoop(
  targetRef: RefObject<HTMLElement | null>,
  onTick: (elapsed: number) => void,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const tickRef = useRef(onTick);
  useEffect(() => {
    tickRef.current = onTick;
  });
  useEffect(() => {
    if (!running) return;
    let visible = true;
    const target = targetRef.current;
    const observer =
      target && typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
          })
        : null;
    if (target) observer?.observe(target);
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      // after a pause the market resumes where it was (no catch-up burst)
      const elapsed = Math.min(100, now - last);
      last = now;
      if (!visible || document.hidden) return;
      tickRef.current(elapsed);
    }, interval);
    return () => {
      clearInterval(id);
      observer?.disconnect();
    };
  }, [targetRef, interval, running]);
}

type HeatmapSink = Pick<
  OrderBookHeatmapHandle,
  "clear" | "setBook" | "applyDeltas" | "addTrades"
>;

/** Where a market stream goes (usually the handles of the widgets) */
export interface MarketSink {
  /**
   * A fresh market starts (mount, remount): load its whole state, e.g.
   * `setBook(feed.snapshot())` (live deltas only make sense on that book)
   */
  load(feed: MarketFeed): void;
  /** One live update of the market */
  update(update: FeedUpdate, feed: MarketFeed): void;
  /** The market stops (unmount): forget its state */
  reset?(): void;
}

/**
 * Streams a simulated market into `sink` every `interval` ms (see
 * `useFeedLoop`). The market is created inside the effect and loaded
 * whole first: a remount (StrictMode, hot reload) starts again from a
 * fresh, consistent book instead of applying live deltas to a stale
 * snapshot (which crosses the ladder). `options` are read on mount.
 */
export function useMarketStream(
  targetRef: RefObject<HTMLElement | null>,
  options: FeedOptions,
  sink: MarketSink,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const optionsRef = useRef(options);
  const sinkRef = useRef(sink);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    sinkRef.current = sink;
  });
  useEffect(() => {
    const feed = createMarketFeed(optionsRef.current);
    marketRef.current = feed;
    sinkRef.current.load(feed);
    return () => {
      marketRef.current = null;
      sinkRef.current.reset?.();
    };
  }, []);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      if (feed) sinkRef.current.update(feed.step(elapsed), feed);
    },
    { interval, running },
  );
}

/** Empty book: what a ladder or depth chart shows once its market stopped */
export const EMPTY_BOOK: OrderBookSnapshot = { bids: [], asks: [] };

/**
 * Backfills a heatmap with `history` ms of recorded market, then streams
 * the same market live. The market is created inside the effect and the
 * heatmap cleared first: a remount (StrictMode, hot reload) starts again
 * from a fresh, consistent book, never applying live deltas to a stale one.
 */
export function useHeatmapReplay(
  targetRef: RefObject<HTMLElement | null>,
  heatmapRef: RefObject<HeatmapSink | null>,
  options: FeedOptions,
  history: number,
  { step = 100, interval = 20 }: { step?: number; interval?: number } = {},
) {
  const optionsRef = useRef(options);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory(
      optionsRef.current,
      history,
      step,
    );
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
    };
  }, [heatmapRef, history, step]);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      const heatmap = heatmapRef.current;
      if (!feed || !heatmap) return;
      const { delta, trades } = feed.step(elapsed);
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    },
    { interval },
  );
}
