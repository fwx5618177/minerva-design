import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Table, Tag, type TableColumn } from "minerva-design";
import { TradingChart, type TradingBar } from "minerva-design/charts";
import { atr, macd, rsi, sma } from "minerva-design/charts/core";
import { DAY, generateBars } from "../../trading-chart/data";

type SymbolId = "aapl" | "msft" | "nvda" | "xom" | "btc" | "eth";
type Signal = "overbought" | "oversold" | "uptrend" | "downtrend" | "neutral";

interface Row {
  id: SymbolId;
  bars: TradingBar[];
  close: number;
  change: number;
  rsi: number;
  histogram: number;
  atrPercent: number;
  fromSma: number;
  signal: Signal;
}

const UNIVERSE: [SymbolId, number, number, number, "stock" | "crypto"][] = [
  // id, seed, price, daily volatility, market
  ["aapl", 507, 228, 0.014, "stock"],
  ["msft", 552, 415, 0.012, "stock"],
  ["nvda", 512, 138, 0.026, "stock"],
  ["xom", 516, 118, 0.011, "stock"],
  ["btc", 502, 64_000, 0.028, "crypto"],
  ["eth", 500, 3_350, 0.034, "crypto"],
];

const last = (values: Float64Array) => values[values.length - 1];

/** The last values of the indicators, from the pure functions */
const ROWS: Row[] = UNIVERSE.map(([id, seed, price, volatility, market]) => {
  const bars = generateBars({
    count: 220,
    timeframe: DAY,
    seed,
    price,
    volatility,
    volume: 1e6,
    market,
  });
  const close = bars.map((bar) => bar.close);
  const high = bars.map((bar) => bar.high);
  const low = bars.map((bar) => bar.low);
  const now = close[close.length - 1];
  const strength = last(rsi(close, 14));
  const histogram = last(macd(close).histogram);
  const fromSma = now / last(sma(close, 50)) - 1;
  const signal: Signal =
    strength >= 70
      ? "overbought"
      : strength <= 30
        ? "oversold"
        : histogram > 0 && fromSma > 0
          ? "uptrend"
          : histogram < 0 && fromSma < 0
            ? "downtrend"
            : "neutral";
  return {
    id,
    bars,
    close: now,
    change: now / close[close.length - 2] - 1,
    rsi: strength,
    histogram,
    atrPercent: last(atr(high, low, close, 14)) / now,
    fromSma,
    signal,
  };
});

const SIGNAL_COLORS = {
  overbought: "warning",
  oversold: "info",
  uptrend: "success",
  downtrend: "danger",
  neutral: "neutral",
} as const;

export default function ScreenerDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<SymbolId>("aapl");
  const row = ROWS.find((item) => item.id === selected) ?? ROWS[0];

  const { columns, percent } = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
      signDisplay: "exceptZero",
    });
    const plain = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    const one = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    const price = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const signed = new Intl.NumberFormat(locale, {
      maximumSignificantDigits: 3,
      signDisplay: "exceptZero",
    });
    const tone = (value: number) =>
      value > 0 ? "var(--success-color)" : "var(--danger-color)";
    const columns: TableColumn<Row>[] = [
      {
        key: "symbol",
        header: t("screenSymbol"),
        render: (item) => (
          <Button
            size="small"
            variant={item.id === selected ? "solid" : "ghost"}
            aria-pressed={item.id === selected}
            onClick={() => setSelected(item.id)}
          >
            {t(item.id)}
          </Button>
        ),
      },
      {
        key: "close",
        header: t("screenClose"),
        align: "right",
        render: (item) => price.format(item.close),
      },
      {
        key: "change",
        header: t("screenChange"),
        align: "right",
        sortable: (a, b) => a.change - b.change,
        render: (item) => (
          <span style={{ color: tone(item.change) }}>
            {percent.format(item.change)}
          </span>
        ),
      },
      {
        key: "rsi",
        header: t("screenRsi"),
        align: "right",
        sortable: (a, b) => a.rsi - b.rsi,
        render: (item) => one.format(item.rsi),
      },
      {
        key: "histogram",
        header: t("screenMacd"),
        align: "right",
        sortable: (a, b) => a.histogram / a.close - b.histogram / b.close,
        render: (item) => (
          <span style={{ color: tone(item.histogram) }}>
            {signed.format(item.histogram)}
          </span>
        ),
      },
      {
        key: "atr",
        header: t("screenAtr"),
        align: "right",
        sortable: (a, b) => a.atrPercent - b.atrPercent,
        render: (item) => plain.format(item.atrPercent),
      },
      {
        key: "sma",
        header: t("screenSma"),
        align: "right",
        sortable: (a, b) => a.fromSma - b.fromSma,
        render: (item) => (
          <span style={{ color: tone(item.fromSma) }}>
            {percent.format(item.fromSma)}
          </span>
        ),
      },
      {
        key: "signal",
        header: t("screenSignal"),
        sortable: (a, b) => a.signal.localeCompare(b.signal),
        render: (item) => (
          <Tag color={SIGNAL_COLORS[item.signal]} size="small">
            {t(`screenSignals.${item.signal}`)}
          </Tag>
        ),
      },
    ];
    return { columns, percent };
  }, [locale, selected, t]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Table
        aria-label={t("screenTable")}
        columns={columns}
        data={ROWS}
        rowKey={(item) => item.id}
        size="small"
        scroll={{ x: "max-content" }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)", fontSize: 13 }}
      >
        {t("screenShowing", {
          name: t(row.id),
          signal: t(`screenSignals.${row.signal}`),
          distance: percent.format(row.fromSma),
        })}
      </output>
      <TradingChart
        bars={row.bars}
        timeframe="1D"
        symbol={t(row.id)}
        indicators={[
          { type: "ma", period: 50, color: "#f59e0b" },
          { type: "rsi", period: 14, height: 90 },
          { type: "macd", height: 90 },
        ]}
        ariaLabel={t("screenChartAria", { name: t(row.id) })}
        height={460}
      />
    </div>
  );
}
