import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DepthChart,
  OrderBook,
  TimeAndSales,
  type DepthChartHandle,
  type OrderBookHandle,
  type TimeAndSalesHandle,
} from "minerva-design/charts";
import { useMarketStream } from "../feed";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

export default function TerminalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const locale = i18n.language;
  const bookRef = useRef<OrderBookHandle>(null);
  const depthRef = useRef<DepthChartHandle>(null);
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // one market for the three widgets, like one exchange WebSocket; a
  // fresh one on every mount (snapshot first, then the stream)
  const [ticker, setTicker] = useState<{ last: number; open: number } | null>(
    null,
  );
  const [limit, setLimit] = useState<number | null>(null);
  const shownAt = useRef(0);

  useMarketStream(
    boxRef,
    { seed: 10 },
    {
      load: (feed) => {
        const book = feed.snapshot();
        bookRef.current?.setBook(book);
        bookRef.current?.setLastPrice(feed.last());
        depthRef.current?.setBook(book);
        tapeRef.current?.clear();
        setTicker({ last: feed.last(), open: feed.last() });
      },
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        depthRef.current?.applyDeltas(delta);
        if (!trades.length) return;
        tapeRef.current?.addTrades(trades);
        bookRef.current?.setLastPrice(feed.last());
        // React only renders the header, four times a second
        const now = performance.now();
        if (now - shownAt.current > 250) {
          shownAt.current = now;
          setTicker(
            (previous) => previous && { ...previous, last: feed.last() },
          );
        }
      },
    },
  );

  const limitLabel = t("limit");
  const limitLines = useMemo(
    () => (limit === null ? [] : [{ price: limit, label: limitLabel }]),
    [limit, limitLabel],
  );
  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 2,
    signDisplay: "always",
  });
  const change = ticker ? ticker.last / ticker.open - 1 : 0;
  const common = {
    pricePrecision: 1,
    sizePrecision: 4,
    fontFamily: MONO,
  };
  const panel = {
    border: "1px solid var(--border-color)",
    borderRadius: 10,
    padding: "8px 4px 4px",
    minWidth: 0,
  };
  const heading = {
    margin: "0 10px 6px",
    fontSize: 12,
    fontWeight: 600,
    color: "var(--text-secondary-color)",
  };

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          gap: "4px 16px",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <strong style={{ fontSize: 16 }}>{t("pair")}</strong>
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            fontFamily: MONO,
            color: change >= 0 ? "var(--success-color)" : "var(--danger-color)",
          }}
        >
          {ticker ? price.format(ticker.last) : "\u2014"}
        </span>
        <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
          {t("sessionChange", { value: percent.format(change) })}
        </span>
        <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
          {limit === null
            ? t("pickHint")
            : t("limitAt", { price: price.format(limit) })}
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        <section style={panel} aria-label={t("title")}>
          <h4 style={heading}>{t("title")}</h4>
          <OrderBook
            ref={bookRef}
            height={472}
            onLevelClick={(level) => setLimit(level.price)}
            labels={{ price: t("price"), size: t("size"), total: t("total") }}
            ariaLabel={t("aria")}
            {...common}
          />
        </section>
        <div style={{ display: "grid", gap: 12, minWidth: 0 }}>
          <section style={panel} aria-label={t("depth")}>
            <h4 style={heading}>{t("depth")}</h4>
            <DepthChart
              ref={depthRef}
              height={200}
              range={0.002}
              legend={false}
              // the price picked in the ladder
              priceLines={limitLines}
              ariaLabel={t("depthAria")}
              {...common}
            />
          </section>
          <section style={panel} aria-label={t("trades")}>
            <h4 style={heading}>{t("trades")}</h4>
            <TimeAndSales
              ref={tapeRef}
              height={220}
              largeTradeThreshold={1}
              ariaLabel={t("tradesAria")}
              {...common}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
