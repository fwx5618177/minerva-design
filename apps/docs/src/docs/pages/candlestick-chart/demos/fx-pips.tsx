import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TradingChart,
  type TradingCrosshairEvent,
  type TradingPriceLine,
} from "minerva-design/charts";
import { HOUR, generateBars } from "../../trading-chart/data";

/** One pip of EUR/USD */
const PIP = 0.0001;

// Monday to Friday, hourly, in UTC like most FX platforms
const bars = generateBars(
  {
    count: 120,
    timeframe: HOUR,
    seed: 1_085,
    price: 1.0854,
    volatility: 0.0011,
    volume: 4_000,
    start: Date.UTC(2026, 9, 26),
  },
  5,
);

// classic floor pivots of Thursday, the levels traded on Friday
const thursday = bars.slice(72, 96);
const high = Math.max(...thursday.map((bar) => bar.high));
const low = Math.min(...thursday.map((bar) => bar.low));
const close = thursday[thursday.length - 1].close;
const pivot = (high + low + close) / 3;
const PIVOTS = {
  r1: 2 * pivot - low,
  pivot,
  s1: 2 * pivot - high,
};

export default function FxPipsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;
  const [hover, setHover] = useState<TradingCrosshairEvent | null>(null);

  const formatPrice = useMemo(() => {
    const rate = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    });
    return (value: number) => rate.format(value);
  }, [locale]);
  const priceLines = useMemo(
    (): TradingPriceLine[] =>
      (Object.keys(PIVOTS) as (keyof typeof PIVOTS)[]).map((key) => ({
        id: key,
        price: PIVOTS[key],
        title: t(`pivots.${key}`),
        color:
          key === "r1"
            ? "var(--danger-color)"
            : key === "s1"
              ? "var(--success-color)"
              : "var(--warning-color)",
        lineStyle: "dashed",
      })),
    [t],
  );

  const pips = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    signDisplay: "exceptZero",
  });
  const unsigned = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const clock = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });
  const bar = hover?.bar;
  const previous = hover && hover.index > 0 ? bars[hover.index - 1] : null;
  const last = bars[bars.length - 1].close;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <TradingChart
        bars={bars}
        timeframe="1H"
        symbol={t("eurusd")}
        formatPrice={formatPrice}
        timeZone="UTC"
        sessionBreaks
        priceLines={priceLines}
        onCrosshairMove={setHover}
        ariaLabel={t("fxAria")}
        height={400}
      />
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {bar && hover
          ? t("pipReadout", {
              time: clock.format(bar.time),
              range: unsigned.format((bar.high - bar.low) / PIP),
              body: pips.format((bar.close - bar.open) / PIP),
              change: previous
                ? pips.format((bar.close - previous.close) / PIP)
                : "…",
              distance: pips.format((hover.price - last) / PIP),
            })
          : t("pipHint", {
              pivot: formatPrice(PIVOTS.pivot),
              r1: formatPrice(PIVOTS.r1),
              s1: formatPrice(PIVOTS.s1),
            })}
      </span>
    </div>
  );
}
