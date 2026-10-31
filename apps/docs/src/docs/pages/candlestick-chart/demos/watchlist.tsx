import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  CandlestickChart,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";
import { DAY, HOUR, generateBars } from "../../trading-chart/data";

type AssetId = "btc" | "aapl" | "eurusd" | "gold";

interface Asset {
  id: AssetId;
  /** Intraday assets show hours, the others dates */
  intraday: boolean;
  decimals: number;
  /** ISO currency of the quote, or none for a rate */
  currency?: string;
  candles: { x: number; open: number; high: number; low: number; y: number }[];
}

const candles = (
  options: Parameters<typeof generateBars>[0],
  decimals: number,
) =>
  generateBars(options, decimals).map((bar) => ({
    x: bar.time,
    open: bar.open,
    high: bar.high,
    low: bar.low,
    y: bar.close,
  }));

// two days of hourly candles for the 24-hour markets, six weeks of daily
// candles for the others
const ASSETS: Asset[] = [
  {
    id: "btc",
    intraday: true,
    decimals: 0,
    currency: "USD",
    candles: candles(
      {
        count: 48,
        timeframe: HOUR,
        seed: 81,
        price: 64_000,
        volatility: 0.006,
      },
      0,
    ),
  },
  {
    id: "aapl",
    intraday: false,
    decimals: 2,
    currency: "USD",
    candles: candles(
      {
        count: 30,
        timeframe: DAY,
        seed: 82,
        price: 228,
        volatility: 0.014,
        market: "stock",
      },
      2,
    ),
  },
  {
    id: "eurusd",
    intraday: true,
    decimals: 5,
    candles: candles(
      {
        count: 48,
        timeframe: HOUR,
        seed: 83,
        price: 1.0854,
        volatility: 0.0012,
      },
      5,
    ),
  },
  {
    id: "gold",
    intraday: false,
    decimals: 2,
    currency: "USD",
    candles: candles(
      {
        count: 30,
        timeframe: DAY,
        seed: 84,
        price: 2_640,
        volatility: 0.009,
        market: "stock",
      },
      2,
    ),
  },
];

function AssetCard({ asset }: { asset: Asset }) {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;
  const first = asset.candles[0].open;
  const last = asset.candles[asset.candles.length - 1].y;
  const change = last / first - 1;

  const { price, when } = useMemo(
    () => ({
      price: new Intl.NumberFormat(locale, {
        ...(asset.currency
          ? { style: "currency", currency: asset.currency }
          : {}),
        minimumFractionDigits: asset.decimals,
        maximumFractionDigits: asset.decimals,
      }),
      when: new Intl.DateTimeFormat(
        locale,
        asset.intraday
          ? {
              weekday: "short",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "UTC",
            }
          : { dateStyle: "medium", timeZone: "UTC" },
      ),
    }),
    [locale, asset],
  );
  const series = useMemo(
    (): ChartSeries[] => [
      { name: t(`assets.${asset.id}`), data: asset.candles },
    ],
    [asset, t],
  );
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  });

  // a one-line tooltip fits a small card
  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return null;
    return (
      <span style={{ whiteSpace: "nowrap" }}>
        {when.format(event.x)} · {price.format(item.y)}
      </span>
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gap: 4,
        padding: 12,
        border: "1px solid var(--border-color)",
        borderRadius: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 8,
        }}
      >
        <strong>{t(`assets.${asset.id}`)}</strong>
        <span style={{ color: "var(--text-secondary-color)", fontSize: 12 }}>
          {asset.intraday ? t("lastHours") : t("lastDays")}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 600 }}>
          {price.format(last)}
        </span>
        <span
          style={{
            fontSize: 13,
            color: change >= 0 ? "var(--success-color)" : "var(--danger-color)",
          }}
        >
          {percent.format(change)}
        </span>
      </div>
      <CandlestickChart
        series={series}
        // the dashed line is where the period opened
        annotations={[
          {
            type: "line",
            axis: "y",
            value: first,
            dash: [3, 3],
            color: "var(--text-secondary-color)",
          },
        ]}
        xAxis={{ type: "time", visible: false }}
        yAxis={{ visible: false }}
        legend={false}
        padding={{ top: 4, right: 4, bottom: 4, left: 4 }}
        renderTooltip={tooltip}
        height={120}
        ariaLabel={t("watchAria", {
          name: t(`assets.${asset.id}`),
          change: percent.format(change),
        })}
      />
    </div>
  );
}

export default function WatchlistDemo() {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        width: "100%",
      }}
    >
      {ASSETS.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
}
