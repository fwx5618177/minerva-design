import { useEffect, useRef, useState, type RefObject } from "react";
import type {
  OrderBookHandle,
  OrderBookHeatmapHandle,
  OrderBookHeatmapViewData,
} from "minerva-design/charts";
import {
  createHistory,
  useFeedLoop,
  type MarketFeed,
} from "../order-book/feed";
import { createTradeBars } from "./market";

export interface MarketSummary {
  latest: number;
  bidDepth: number;
  askDepth: number;
  imbalance: number;
  bidWall: number;
  askWall: number;
  start: number;
  end: number;
  closes: number[];
  viewport: OrderBookHeatmapViewData | null;
}

/** One seeded matching engine supplies the heatmap, execution candles and ladder. */
export function useTerminalMarket(
  target: RefObject<HTMLDivElement | null>,
  heatmap: RefObject<OrderBookHeatmapHandle | null>,
  ladder?: RefObject<OrderBookHandle | null>,
  running = true,
) {
  const market = useRef<MarketFeed | null>(null);
  const candles = useRef(createTradeBars(2000, 180));
  const lastSummary = useRef(0);
  const startTime = useRef(0);
  const [summary, setSummary] = useState<MarketSummary | null>(null);
  const publish = (feed: MarketFeed) => {
    const book = feed.snapshot();
    const bidDepth = book.bids.reduce((sum, level) => sum + level[1], 0);
    const askDepth = book.asks.reduce((sum, level) => sum + level[1], 0);
    setSummary({
      latest: feed.last(),
      bidDepth,
      askDepth,
      imbalance: (bidDepth - askDepth) / (bidDepth + askDepth || 1),
      bidWall: Math.max(0, ...book.bids.map((level) => level[1])),
      askWall: Math.max(0, ...book.asks.map((level) => level[1])),
      start: Math.max(startTime.current, feed.time() - 180_000),
      end: feed.time(),
      closes: candles.current.values().map((bar) => bar.close),
      viewport: heatmap.current?.getView() ?? null,
    });
    lastSummary.current = performance.now();
  };
  const publishRef = useRef(publish);
  useEffect(() => {
    publishRef.current = publish;
  });
  useEffect(() => {
    const mountedHeatmap = heatmap.current;
    let stopped = false;
    let initialized = false;
    const initialize = () => {
      if (initialized || stopped || !heatmap.current) return;
      initialized = true;
      const history = createHistory(
        {
          seed: 71,
          price: 76000,
          tick: 1,
          levels: 180,
          activity: 90,
          whales: 0.01,
        },
        90_000,
        250,
      );
      candles.current = createTradeBars(2000, 180);
      startTime.current = history.snapshot.time ?? history.feed.time() - 90_000;
      const sink = heatmap.current;
      sink.clear();
      sink.setBook(history.snapshot);
      for (const update of history.updates) {
        sink.applyDeltas(update.delta);
        sink.addTrades(update.trades);
        candles.current.add(update.trades);
      }
      sink.setBars(candles.current.values());
      market.current = history.feed;
      ladder?.current?.setBook(history.feed.snapshot());
      ladder?.current?.setLastPrice(history.feed.last());
      publishRef.current(history.feed);
    };
    const observer =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) initialize();
          })
        : null;
    if (target.current && observer) observer.observe(target.current);
    else initialize();
    return () => {
      stopped = true;
      observer?.disconnect();
      market.current = null;
      mountedHeatmap?.clear();
    };
  }, [target, heatmap, ladder]);
  useFeedLoop(
    target,
    (elapsed) => {
      const feed = market.current;
      const sink = heatmap.current;
      if (!feed || !sink) return;
      const update = feed.step(elapsed);
      sink.applyDeltas(update.delta);
      sink.addTrades(update.trades);
      candles.current.add(update.trades);
      const bars = candles.current.values();
      if (bars.length) sink.updateBar(bars[bars.length - 1]);
      ladder?.current?.applyDeltas(update.delta);
      ladder?.current?.setLastPrice(feed.last());
      if (performance.now() - lastSummary.current >= 1000)
        publishRef.current(feed);
    },
    { interval: 50, running },
  );
  return summary;
}
