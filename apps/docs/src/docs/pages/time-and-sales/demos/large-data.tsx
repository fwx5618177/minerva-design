import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  createTimeAndSales,
  type TimeAndSalesInstance,
  type MarketTrade,
} from "minerva-design/charts/core";
import { mulberry32 } from "../../order-book/feed";

/** `count` trades ending now: a random walk, sweeps sharing their millisecond */
function generate(
  count: number,
  seed: number,
  end = Date.now(),
): MarketTrade[] {
  const random = mulberry32(seed);
  const trades: MarketTrade[] = new Array(count);
  let price = 64000;
  let time = end - count * 12;
  for (let i = 0; i < count; i++) {
    if (random() > 0.3) time += Math.floor(random() * 24);
    price = Math.max(1, price + Math.round((random() - 0.5) * 3) / 10);
    const whale = random() < 0.004;
    trades[i] = {
      time,
      price: Math.round(price * 10) / 10,
      size:
        Math.round(
          (whale ? 2 + random() * 20 : 0.0005 + random() ** 4 * 1.5) * 1e4,
        ) / 1e4,
      side: random() < 0.5 ? "buy" : "sell",
    };
  }
  return trades;
}

export default function LargeDataDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const tapeRef = useRef<TimeAndSalesInstance | null>(null);
  const [stats, setStats] = useState({ count: 0, ms: 0 });
  const options = {
    capacity: 500_000,
    columns: ["time", "price", "size", "side"] as const,
    largeTradeThreshold: 2,
    pricePrecision: 1,
    sizePrecision: 4,
    ariaLabel: t("aria"),
  };
  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  });

  // the framework-free engine (minerva-design/charts/core): typed-array
  // rings, only the visible rows are drawn
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const tape = createTimeAndSales(container, optionsRef.current);
    tapeRef.current = tape;
    const trades = generate(100_000, 38);
    const start = performance.now();
    tape.setTrades(trades);
    setStats({ count: tape.getCount(), ms: performance.now() - start });
    return () => {
      tape.destroy();
      tapeRef.current = null;
    };
  }, []);

  // the built-in texts and number formats follow the page language
  // (<html lang>): apply the options again after a language switch
  useEffect(() => {
    tapeRef.current?.setOptions(optionsRef.current);
  }, [i18n.language]);

  const add = () => {
    const tape = tapeRef.current;
    if (!tape) return;
    const trades = generate(100_000, stats.count + 1);
    const start = performance.now();
    tape.addTrades(trades);
    setStats({ count: tape.getCount(), ms: performance.now() - start });
  };

  const number = new Intl.NumberFormat(i18n.language);
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
          fontSize: 13,
          color: "var(--text-secondary-color)",
        }}
      >
        <Button size="small" variant="outline" onClick={add}>
          {t("add", { value: number.format(100_000) })}
        </Button>
        <span>
          {t("loaded", {
            rows: number.format(stats.count),
            ms: number.format(Math.round(stats.ms)),
          })}
        </span>
      </div>
      <div ref={containerRef} style={{ height: 380, width: "100%" }} />
    </div>
  );
}
