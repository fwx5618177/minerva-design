import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { createMarketFeed, useFeedLoop } from "../feed";

export default function LiveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [rate, setRate] = useState(50);
  // the simulated exchange: one snapshot, then a stream of deltas
  const [feed] = useState(() => createMarketFeed({ seed: 2 }));
  const [book] = useState(() => feed.snapshot());
  const [stats, setStats] = useState({ updates: 0, levels: 0 });
  const counter = useRef({ updates: 0, levels: 0, since: 0 });

  // every message goes straight to the ladder: it draws once per frame
  useFeedLoop(
    boxRef,
    (elapsed) => {
      const { delta, trades } = feed.step(elapsed);
      bookRef.current?.applyDeltas(delta);
      if (trades.length) bookRef.current?.setLastPrice(feed.last());
      const c = counter.current;
      c.updates++;
      c.levels += delta.bids.length + delta.asks.length;
      const now = performance.now();
      if (now - c.since >= 1000) {
        const seconds = c.since ? (now - c.since) / 1000 : 1;
        setStats({
          updates: Math.round(c.updates / seconds),
          levels: Math.round(c.levels / seconds),
        });
        counter.current = { updates: 0, levels: 0, since: now };
      }
    },
    { interval: 1000 / rate },
  );

  const number = new Intl.NumberFormat(i18n.language);
  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("updateRate")}
        direction="horizontal"
        value={rate}
        onChange={(value) => setRate(Number(value))}
      >
        {[10, 50, 200].map((value) => (
          <Radio key={value} value={value} label={t("perSecond", { value })} />
        ))}
      </RadioGroup>
      <OrderBook
        ref={bookRef}
        book={book}
        height={440}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {t("liveStats", {
          updates: number.format(stats.updates),
          levels: number.format(stats.levels),
        })}
      </span>
    </div>
  );
}
