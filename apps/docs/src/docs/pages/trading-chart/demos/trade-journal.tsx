import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Table, Tag, type TableColumn } from "minerva-design";
import {
  TradingChart,
  type TradingChartHandle,
  type TradingMarker,
} from "minerva-design/charts";
import { MINUTE, generateBars } from "../data";

/** Dollars per point of one E-mini S&P 500 contract */
const POINT_VALUE = 50;

// two weeks of 15-minute bars, 9:30 to 16:00 (exchange time)
const bars = generateBars({
  count: 260,
  timeframe: 15 * MINUTE,
  seed: 5_800,
  price: 5_820,
  volatility: 0.0016,
  volume: 40_000,
  market: "stock",
  start: Date.UTC(2026, 9, 19),
});

/** Quarter-point ticks */
const tick = (price: number) => Math.round(price * 4) / 4;

/** Entry bar, exit bar, side, contracts */
const JOURNAL: [number, number, "long" | "short", number][] = [
  [8, 20, "long", 2],
  [35, 44, "short", 1],
  [60, 75, "long", 3],
  [90, 97, "short", 2],
  [120, 140, "long", 1],
  [150, 158, "long", 2],
  [185, 200, "short", 3],
  [222, 240, "long", 2],
];

interface Trade {
  id: number;
  side: "long" | "short";
  contracts: number;
  entryIndex: number;
  exitIndex: number;
  entry: number;
  exit: number;
  points: number;
  pnl: number;
}

const TRADES: Trade[] = JOURNAL.map(
  ([entryIndex, exitIndex, side, contracts], i) => {
    const entry = tick(bars[entryIndex].close);
    const exit = tick(bars[exitIndex].close);
    const points = (exit - entry) * (side === "long" ? 1 : -1);
    return {
      id: i + 1,
      side,
      contracts,
      entryIndex,
      exitIndex,
      entry,
      exit,
      points,
      pnl: points * contracts * POINT_VALUE,
    };
  },
);

export default function TradeJournalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const locale = i18n.language;
  const chart = useRef<TradingChartHandle>(null);
  const [shown, setShown] = useState<Trade | null>(null);

  const markers = useMemo(
    (): TradingMarker[] =>
      TRADES.flatMap((trade) => [
        {
          id: `in-${trade.id}`,
          time: bars[trade.entryIndex].time,
          price: trade.entry,
          side: trade.side === "long" ? "buy" : "sell",
          text: t("entryMarker", { id: trade.id }),
        },
        {
          id: `out-${trade.id}`,
          time: bars[trade.exitIndex].time,
          price: trade.exit,
          side: trade.side === "long" ? "sell" : "buy",
          color: "var(--text-secondary-color)",
          text: t("exitMarker"),
        },
      ]),
    [t],
  );

  const points = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  });
  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const usd = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    signDisplay: "exceptZero",
  });
  const date = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
  const percent = new Intl.NumberFormat(locale, { style: "percent" });
  const decimal = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const integer = new Intl.NumberFormat(locale);

  const show = (trade: Trade) => {
    // a little context on each side of the trade
    chart.current?.setVisibleTimeRange({
      from: bars[Math.max(0, trade.entryIndex - 12)].time,
      to: bars[Math.min(bars.length - 1, trade.exitIndex + 12)].time,
    });
    chart.current?.setCrosshair(bars[trade.entryIndex].time, trade.entry);
    setShown(trade);
  };

  const wins = TRADES.filter((trade) => trade.pnl > 0);
  const losses = TRADES.filter((trade) => trade.pnl <= 0);
  const gross = (list: Trade[]) =>
    list.reduce((sum, trade) => sum + trade.pnl, 0);
  const net = gross(TRADES);
  const profitFactor = losses.length
    ? gross(wins) / Math.abs(gross(losses))
    : Infinity;
  const tone = (value: number) =>
    value > 0
      ? "var(--success-color)"
      : value < 0
        ? "var(--danger-color)"
        : undefined;

  const columns: TableColumn<Trade>[] = [
    { key: "id", header: "#", render: (trade) => trade.id },
    {
      key: "side",
      header: t("journalSide"),
      render: (trade) => (
        <Tag color={trade.side === "long" ? "success" : "danger"} size="small">
          {trade.side === "long" ? t("long") : t("short")}
        </Tag>
      ),
    },
    {
      key: "entry",
      header: t("journalEntry"),
      render: (trade) =>
        t("atTime", {
          price: price.format(trade.entry),
          time: date.format(bars[trade.entryIndex].time),
        }),
    },
    {
      key: "exit",
      header: t("journalExit"),
      render: (trade) => price.format(trade.exit),
      align: "right",
    },
    {
      key: "points",
      header: t("journalPoints"),
      align: "right",
      render: (trade) => (
        <span style={{ color: tone(trade.points) }}>
          {points.format(trade.points)}
        </span>
      ),
    },
    {
      key: "pnl",
      header: t("journalPnl"),
      align: "right",
      render: (trade) => (
        <span style={{ color: tone(trade.pnl) }}>{usd.format(trade.pnl)}</span>
      ),
    },
    {
      key: "show",
      header: "",
      align: "right",
      render: (trade) => (
        <Button
          size="small"
          variant="ghost"
          aria-label={t("showTradeLabel", { id: trade.id })}
          onClick={() => show(trade)}
        >
          {t("showTrade")}
        </Button>
      ),
    },
  ];

  const stat = (label: string, value: string, color?: string) => (
    <div style={{ display: "grid", gap: 2 }}>
      <span style={{ color: "var(--text-secondary-color)", fontSize: 12 }}>
        {label}
      </span>
      <strong style={{ color, fontVariantNumeric: "tabular-nums" }}>
        {value}
      </strong>
    </div>
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
        }}
      >
        {stat(t("netPnl"), usd.format(net), tone(net))}
        {stat(
          t("winRate"),
          t("winRateValue", {
            rate: percent.format(wins.length / TRADES.length),
            wins: integer.format(wins.length),
            total: integer.format(TRADES.length),
          }),
        )}
        {stat(
          t("profitFactor"),
          Number.isFinite(profitFactor) ? decimal.format(profitFactor) : "∞",
        )}
        {stat(
          t("averageWin"),
          wins.length ? usd.format(gross(wins) / wins.length) : "–",
        )}
        {stat(
          t("averageLoss"),
          losses.length ? usd.format(gross(losses) / losses.length) : "–",
        )}
      </div>
      <TradingChart
        ref={chart}
        bars={bars}
        timeframe="15m"
        symbol={t("es")}
        precision={2}
        timeZone="UTC"
        sessionBreaks
        markers={markers}
        ariaLabel={t("journalAria")}
        height={380}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)", fontSize: 13 }}
      >
        {shown
          ? t("showingTrade", {
              id: shown.id,
              side: shown.side === "long" ? t("long") : t("short"),
              contracts: integer.format(shown.contracts),
              pnl: usd.format(shown.pnl),
            })
          : t("journalHint")}
      </output>
      <Table
        aria-label={t("journalTable")}
        columns={columns}
        data={TRADES}
        rowKey={(trade) => trade.id}
        size="small"
      />
    </div>
  );
}
