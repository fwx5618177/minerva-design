import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  TradingChart,
  resampleBars,
  type TradingTimeframe,
} from "minerva-design/charts";
import { MINUTE, generateBars } from "../data";

const TIMEFRAMES: TradingTimeframe[] = ["15m", "1H", "4H"];

// ten days of 15-minute bars; the longer timeframes are aggregated from them
const base = generateBars({
  count: 960,
  timeframe: 15 * MINUTE,
  seed: 1_480,
  price: 148,
  volatility: 0.004,
  volume: 52_000,
});

export default function MobileDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const locale = i18n.language;
  const [timeframe, setTimeframe] = useState<TradingTimeframe>("1H");
  const [hovered, setHovered] = useState<number | null>(null);
  const bars = useMemo(
    () => (timeframe === "15m" ? base : resampleBars(base, timeframe)),
    [timeframe],
  );

  // the header replaces the legend: the hovered bar, or the last one
  const index =
    hovered !== null && hovered >= 0 && hovered < bars.length
      ? hovered
      : bars.length - 1;
  const bar = bars[index];
  const previous = bars[index - 1] ?? bar;
  const change = bar.close / previous.close - 1;
  const last = bars[bars.length - 1].close;
  const dayChange = last / base[base.length - 97].close - 1;

  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  });
  const compact = new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  const when = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const tone = (value: number) =>
    value >= 0 ? "var(--success-color)" : "var(--danger-color)";

  return (
    <div
      style={{
        display: "grid",
        gap: 8,
        width: "100%",
        maxWidth: 380,
        padding: 12,
        border: "1px solid var(--border-color)",
        borderRadius: 12,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "grid", gap: 2 }}>
        <span style={{ color: "var(--text-secondary-color)", fontSize: 12 }}>
          {t("sol")}
        </span>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <strong
            style={{
              fontSize: 24,
              color: tone(dayChange),
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {price.format(last)}
          </strong>
          <span style={{ fontSize: 13, color: tone(dayChange) }}>
            {t("dayChange", { value: percent.format(dayChange) })}
          </span>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, auto)",
          justifyContent: "space-between",
          gap: "2px 8px",
          fontSize: 12,
          fontVariantNumeric: "tabular-nums",
          color: "var(--text-secondary-color)",
        }}
      >
        <span style={{ gridColumn: "1 / -1" }}>
          {when.format(bar.time)}
          {" · "}
          <span style={{ color: tone(change) }}>{percent.format(change)}</span>
        </span>
        <span>{t("ohlcOpen", { value: price.format(bar.open) })}</span>
        <span>{t("ohlcHigh", { value: price.format(bar.high) })}</span>
        <span>
          {t("ohlcVolume", { value: compact.format(bar.volume ?? 0) })}
        </span>
        <span>{t("ohlcClose", { value: price.format(bar.close) })}</span>
        <span>{t("ohlcLow", { value: price.format(bar.low) })}</span>
      </div>
      <RadioGroup
        aria-label={t("timeframe")}
        direction="horizontal"
        value={timeframe}
        onChange={(value) => {
          setTimeframe(value as TradingTimeframe);
          setHovered(null);
        }}
      >
        {TIMEFRAMES.map((value) => (
          <Radio key={value} value={value} label={t(`timeframes.${value}`)} />
        ))}
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe={timeframe}
        symbol={t("sol")}
        indicators={[{ type: "volume", overlay: true }]}
        onCrosshairMove={(event) => setHovered(event?.bar ? event.index : null)}
        // a phone: no legend nor grid, and the page scrolls under the finger
        // or the wheel (zoom with a pinch, or Ctrl / ⌘ + wheel)
        legend={false}
        grid={false}
        highLowMarkers={false}
        wheel="modifier"
        rightOffset={3}
        barSpacing={6}
        ariaLabel={t("mobileAria")}
        height={300}
      />
    </div>
  );
}
