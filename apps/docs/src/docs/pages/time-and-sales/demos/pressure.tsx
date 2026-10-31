import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  TimeAndSales,
  type MarketTrade,
  type TimeAndSalesHandle,
} from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

/** Rolling windows, in ms */
const WINDOWS = [10_000, 30_000, 60_000];

interface Stats {
  vwap: number;
  bought: number;
  sold: number;
  count: number;
  largest: MarketTrade | null;
}

/** Tape statistics of the trades within `span` ms of the latest one */
function measure(trades: MarketTrade[], span: number): Stats {
  const stats: Stats = {
    vwap: NaN,
    bought: 0,
    sold: 0,
    count: 0,
    largest: null,
  };
  const end = trades.at(-1)?.time ?? 0;
  let notional = 0;
  for (let i = trades.length - 1; i >= 0; i--) {
    const trade = trades[i];
    if (trade.time < end - span) break;
    stats.count++;
    notional += trade.price * trade.size;
    if (trade.side === "buy") stats.bought += trade.size;
    else stats.sold += trade.size;
    if (!stats.largest || trade.size > stats.largest.size)
      stats.largest = trade;
  }
  const volume = stats.bought + stats.sold;
  if (volume) stats.vwap = notional / volume;
  return stats;
}

export default function PressureDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const locale = i18n.language;
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [span, setSpan] = useState(30_000);
  const [stats, setStats] = useState<Stats | null>(null);
  // the last minute of trades, for the statistics (the tape keeps its own)
  const recent = useRef<MarketTrade[]>([]);
  const measuredAt = useRef(0);
  const spanRef = useRef(span);

  useMarketStream(
    boxRef,
    { seed: 37, activity: 200 },
    {
      load: () => {
        tapeRef.current?.clear();
        recent.current = [];
      },
      update: ({ trades }) => {
        if (trades.length) {
          tapeRef.current?.addTrades(trades);
          const list = recent.current;
          list.push(...trades);
          const from = list.findIndex(
            (trade) => trade.time >= trades[0].time - 60_000,
          );
          if (from > 0) list.splice(0, from);
        }
        // twice a second is plenty for a human
        const now = performance.now();
        if (now - measuredAt.current < 500) return;
        measuredAt.current = now;
        setStats(measure(recent.current, spanRef.current));
      },
    },
  );

  const usd = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 3 });
  const rate = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  const percent = new Intl.NumberFormat(locale, { style: "percent" });
  const seconds = (ms: number) =>
    new Intl.NumberFormat(locale, { style: "unit", unit: "second" }).format(
      ms / 1000,
    );
  const volume = stats ? stats.bought + stats.sold : 0;
  const share = volume ? (stats?.bought ?? 0) / volume : 0.5;
  const cell = (label: string, value: string) => (
    <div style={{ display: "grid", gap: 2 }}>
      <span style={{ color: "var(--text-secondary-color)", fontSize: 12 }}>
        {label}
      </span>
      <strong style={{ fontVariantNumeric: "tabular-nums" }}>{value}</strong>
    </div>
  );

  return (
    <div
      ref={boxRef}
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        width: "100%",
      }}
    >
      <TimeAndSales
        ref={tapeRef}
        height={360}
        aggregate
        largeTradeThreshold={1}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
        <RadioGroup
          aria-label={t("rollingWindow")}
          direction="horizontal"
          value={span}
          onChange={(value) => {
            setSpan(Number(value));
            spanRef.current = Number(value);
            setStats(measure(recent.current, Number(value)));
          }}
        >
          {WINDOWS.map((value) => (
            <Radio
              key={value}
              value={value}
              label={t("lastWindow", { value: seconds(value) })}
            />
          ))}
        </RadioGroup>
        {/* share of the volume bought by aggressive buyers */}
        <div
          aria-hidden="true"
          style={{
            display: "flex",
            height: 8,
            borderRadius: 4,
            overflow: "hidden",
            background: "var(--border-color)",
          }}
        >
          <div
            style={{
              width: `${share * 100}%`,
              background: "var(--success-color)",
              transition: "width 0.4s",
            }}
          />
          <div style={{ flex: 1, background: "var(--danger-color)" }} />
        </div>
        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          }}
        >
          {cell(t("vwap"), stats && volume ? usd.format(stats.vwap) : "…")}
          {cell(t("buyShare"), stats && volume ? percent.format(share) : "…")}
          {cell(
            t("bought"),
            stats ? t("btcValue", { value: btc.format(stats.bought) }) : "…",
          )}
          {cell(
            t("sold"),
            stats ? t("btcValue", { value: btc.format(stats.sold) }) : "…",
          )}
          {cell(
            t("tradesPerSecond"),
            stats ? rate.format(stats.count / (span / 1000)) : "…",
          )}
          {cell(
            t("largest"),
            stats?.largest
              ? t(stats.largest.side === "buy" ? "largestBuy" : "largestSell", {
                  size: btc.format(stats.largest.size),
                  price: usd.format(stats.largest.price),
                })
              : "…",
          )}
        </div>
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)", fontSize: 13 }}
        >
          {stats && volume
            ? t(
                share >= 0.6
                  ? "pressureBuy"
                  : share <= 0.4
                    ? "pressureSell"
                    : "pressureBalanced",
              )
            : t("pressureWaiting")}
        </output>
      </div>
    </div>
  );
}
