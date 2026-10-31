import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Tag } from "minerva-design";
import {
  TradingChart,
  type TradingBar,
  type TradingCrosshairEvent,
  type TradingMarker,
} from "minerva-design/charts";
import { DAY, generateBars } from "../../trading-chart/data";

type Pattern =
  "doji" | "hammer" | "shootingStar" | "bullishEngulfing" | "bearishEngulfing";

type Filter = "all" | "doji" | "hammer" | "shootingStar" | "engulfing";

const FILTERS: Filter[] = [
  "all",
  "doji",
  "hammer",
  "shootingStar",
  "engulfing",
];
const PATTERNS: Pattern[] = [
  "doji",
  "hammer",
  "shootingStar",
  "bullishEngulfing",
  "bearishEngulfing",
];
const BULLISH = new Set<Pattern>(["hammer", "bullishEngulfing"]);

const bars = generateBars({
  count: 180,
  timeframe: DAY,
  seed: 707,
  price: 96,
  volatility: 0.018,
  volume: 2e7,
  market: "stock",
});

/**
 * Classic single and two-candle patterns; a hammer needs a decline before
 * it, a shooting star a rise (closes 5 bars earlier)
 */
function detect(list: readonly TradingBar[], i: number): Pattern | null {
  const bar = list[i];
  const prev = list[i - 1];
  if (!prev || i < 5) return null;
  const range = bar.high - bar.low;
  if (range <= 0) return null;
  const body = Math.abs(bar.close - bar.open);
  const upper = bar.high - Math.max(bar.open, bar.close);
  const lower = Math.min(bar.open, bar.close) - bar.low;
  const trend = bar.close - list[i - 5].close;
  if (
    prev.close < prev.open &&
    bar.close > bar.open &&
    bar.open <= prev.close &&
    bar.close >= prev.open
  )
    return "bullishEngulfing";
  if (
    prev.close > prev.open &&
    bar.close < bar.open &&
    bar.open >= prev.close &&
    bar.close <= prev.open
  )
    return "bearishEngulfing";
  if (body <= range * 0.35 && lower >= body * 2 && upper <= range * 0.15)
    return trend < 0 ? "hammer" : null;
  if (body <= range * 0.35 && upper >= body * 2 && lower <= range * 0.15)
    return trend > 0 ? "shootingStar" : null;
  if (body <= range * 0.06) return "doji";
  return null;
}

const found = bars.map((_, i) => detect(bars, i));

const COLORS: Record<Pattern, string> = {
  doji: "var(--warning-color)",
  hammer: "var(--success-color)",
  shootingStar: "var(--danger-color)",
  bullishEngulfing: "var(--primary-color)",
  bearishEngulfing: "#a855f7",
};

const matches = (pattern: Pattern, filter: Filter) =>
  filter === "all" ||
  pattern === filter ||
  (filter === "engulfing" && pattern.endsWith("Engulfing"));

export default function PatternsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;
  const [filter, setFilter] = useState<Filter>("all");
  const [hovered, setHovered] = useState<{
    pattern: Pattern;
    time: number;
  } | null>(null);

  const markers = useMemo(
    (): TradingMarker[] =>
      bars.flatMap((bar, i) => {
        const pattern = found[i];
        if (!pattern || !matches(pattern, filter)) return [];
        // bullish patterns below the candle, the others above it
        return [
          {
            id: `${pattern}-${i}`,
            time: bar.time,
            side: BULLISH.has(pattern) ? "buy" : "sell",
            color: COLORS[pattern],
            text: t(`patternCodes.${pattern}`),
          },
        ];
      }),
    [filter, t],
  );
  const counts = useMemo(() => {
    const result = Object.fromEntries(PATTERNS.map((p) => [p, 0])) as Record<
      Pattern,
      number
    >;
    for (const pattern of found) if (pattern) result[pattern]++;
    return result;
  }, []);

  const onCrosshairMove = (event: TradingCrosshairEvent | null) => {
    const pattern = event ? found[event.index] : null;
    setHovered(
      event && pattern && matches(pattern, filter)
        ? { pattern, time: event.time }
        : null,
    );
  };

  const date = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeZone: "UTC",
  });
  const integer = new Intl.NumberFormat(locale);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("patternFilter")}
        direction="horizontal"
        value={filter}
        onChange={(value) => setFilter(value as Filter)}
      >
        {FILTERS.map((value) => (
          <Radio
            key={value}
            value={value}
            label={t(`patternFilters.${value}`)}
          />
        ))}
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="1D"
        symbol={t("orbt")}
        markers={markers}
        onCrosshairMove={onCrosshairMove}
        ariaLabel={t("patternsAria")}
        height={400}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {PATTERNS.map((pattern) => (
          <Tag key={pattern} color="neutral" variant="outline">
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                marginInlineEnd: 6,
                borderRadius: 2,
                background: COLORS[pattern],
              }}
            />
            {t("patternCount", {
              name: t(`patternNames.${pattern}`),
              value: integer.format(counts[pattern]),
            })}
          </Tag>
        ))}
      </div>
      <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
        {hovered
          ? t("patternAt", {
              name: t(`patternNames.${hovered.pattern}`),
              date: date.format(hovered.time),
              meaning: t(`patternMeanings.${hovered.pattern}`),
            })
          : t("patternHint")}
      </span>
    </div>
  );
}
