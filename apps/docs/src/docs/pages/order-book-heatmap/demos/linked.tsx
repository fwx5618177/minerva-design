import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBook,
  OrderBookHeatmap,
  TimeAndSales,
  type OrderBookHandle,
  type OrderBookHeatmapHandle,
  type TimeAndSalesHandle,
} from "minerva-design/charts";
import {
  createHistory,
  useFeedLoop,
  type MarketFeed,
} from "../../order-book/feed";

export default function LinkedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const locale = i18n.language;
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const bookRef = useRef<OrderBookHandle>(null);
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<MarketFeed | null>(null);
  const [quote, setQuote] = useState({ last: NaN, spread: NaN, trades: 0 });
  const quotedAt = useRef(0);

  // one recorded minute: the heatmap replays it column by column, the tape
  // gets its trades at once, the ladder only needs the book of now
  useEffect(() => {
    const heatmap = heatmapRef.current;
    const tape = tapeRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory({ seed: 34 }, 60_000);
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    tape?.setTrades(updates.flatMap((update) => update.trades));
    bookRef.current?.setBook(feed.snapshot());
    bookRef.current?.setLastPrice(feed.last());
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
      tape?.clear();
    };
  }, []);

  // then every message goes to the three widgets, like one WebSocket
  useFeedLoop(boxRef, (elapsed) => {
    const feed = marketRef.current;
    if (!feed) return;
    const { delta, trades } = feed.step(elapsed);
    heatmapRef.current?.applyDeltas(delta);
    heatmapRef.current?.addTrades(trades);
    bookRef.current?.applyDeltas(delta);
    if (trades.length) {
      bookRef.current?.setLastPrice(feed.last());
      tapeRef.current?.addTrades(trades);
    }
    const now = performance.now();
    if (now - quotedAt.current < 250) return;
    quotedAt.current = now;
    const store = heatmapRef.current?.getInstance()?.getStore();
    setQuote({
      last: feed.last(),
      spread: store ? store.spread() : NaN,
      trades: tapeRef.current?.getInstance()?.getCount() ?? 0,
    });
  });

  const usd = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const integer = new Intl.NumberFormat(locale);

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px 16px",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <strong>{t("pair")}</strong>
        <span>
          {t("lastPrice", {
            value: Number.isNaN(quote.last) ? "…" : usd.format(quote.last),
          })}
        </span>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {t("spreadIs", {
            value: Number.isNaN(quote.spread) ? "…" : usd.format(quote.spread),
          })}
        </span>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {t("tradesOnTape", { value: integer.format(quote.trades) })}
        </span>
      </div>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={320}
        interval={250}
        window={60_000}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("aria")}
      />
      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        <OrderBook
          ref={bookRef}
          height={300}
          pricePrecision={1}
          sizePrecision={4}
          ariaLabel={t("bookAria")}
        />
        <TimeAndSales
          ref={tapeRef}
          height={300}
          aggregate
          largeTradeThreshold={1}
          pricePrecision={1}
          sizePrecision={4}
          ariaLabel={t("tapeAria")}
        />
      </div>
    </div>
  );
}
