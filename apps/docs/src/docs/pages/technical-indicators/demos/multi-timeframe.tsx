import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tag } from "minerva-design";
import {
  TradingChart,
  resampleBars,
  type TradingBar,
  type TradingCompareSeries,
} from "minerva-design/charts";
import { ema } from "minerva-design/charts/core";
import { DAY, HOUR, generateBars } from "../../trading-chart/data";

const PERIOD = 20;

// two months of hourly bars
const bars = generateBars({
  count: 1_440,
  timeframe: HOUR,
  seed: 2_420,
  price: 3_350,
  volatility: 0.006,
  volume: 2_400,
});
const closes = (list: readonly TradingBar[]) => list.map((bar) => bar.close);

/**
 * EMA of a higher timeframe, seen from each hourly bar: the value of the
 * last higher bar already closed when the hourly bar closes (no look-ahead,
 * so the line steps once per 4 hours or per day)
 */
function higher(timeframe: "4H" | "1D", duration: number) {
  const coarse = resampleBars(bars, timeframe);
  const average = ema(closes(coarse), PERIOD);
  const values = new Float64Array(bars.length).fill(NaN);
  let j = -1;
  bars.forEach((bar, i) => {
    while (
      j + 1 < coarse.length &&
      coarse[j + 1].time + duration <= bar.time + HOUR
    )
      j++;
    if (j >= 0) values[i] = average[j];
  });
  return values;
}

const LINES = {
  "1H": ema(closes(bars), PERIOD),
  "4H": higher("4H", 4 * HOUR),
  "1D": higher("1D", DAY),
};
type Frame = keyof typeof LINES;
const FRAMES = Object.keys(LINES) as Frame[];
const COLORS: Record<Frame, string> = {
  "1H": "#0ea5e9",
  "4H": "#f59e0b",
  "1D": "#a855f7",
};

export default function MultiTimeframeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const locale = i18n.language;
  const [hovered, setHovered] = useState<number | null>(null);

  // the higher timeframes are comparison lines on the same price scale
  const compare = useMemo(
    (): TradingCompareSeries[] =>
      (["4H", "1D"] as const).map((frame) => ({
        id: frame,
        name: t("emaOn", { period: PERIOD, frame }),
        color: COLORS[frame],
        data: bars.flatMap((bar, i) =>
          Number.isNaN(LINES[frame][i])
            ? []
            : [{ time: bar.time, value: LINES[frame][i] }],
        ),
      })),
    [t],
  );

  const index =
    hovered !== null && hovered >= 0 && hovered < bars.length
      ? hovered
      : bars.length - 1;
  const close = bars[index].close;
  const sides = FRAMES.map((frame) => {
    const value = LINES[frame][index];
    return {
      frame,
      value,
      above: Number.isNaN(value) ? null : close > value,
    };
  });
  const verdict = sides.every((side) => side.above === true)
    ? "alignedUp"
    : sides.every((side) => side.above === false)
      ? "alignedDown"
      : "mixed";

  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const when = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <TradingChart
        bars={bars}
        timeframe="1H"
        symbol={t("eth")}
        indicators={[
          { type: "ema", period: PERIOD, color: COLORS["1H"], lineWidth: 1.5 },
        ]}
        compare={compare}
        onCrosshairMove={(event) => setHovered(event?.bar ? event.index : null)}
        ariaLabel={t("mtfAria")}
        height={420}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span style={{ color: "var(--text-secondary-color)" }}>
          {t("mtfAt", {
            time: when.format(bars[index].time),
            close: price.format(close),
          })}
        </span>
        {sides.map((side) => (
          <Tag
            key={side.frame}
            color={
              side.above === null
                ? "neutral"
                : side.above
                  ? "success"
                  : "danger"
            }
          >
            {t(
              side.above === null
                ? "mtfWarmup"
                : side.above
                  ? "mtfAbove"
                  : "mtfBelow",
              {
                frame: side.frame,
                value: Number.isNaN(side.value) ? "" : price.format(side.value),
              },
            )}
          </Tag>
        ))}
        <strong>{t(`mtfVerdict.${verdict}`)}</strong>
      </div>
    </div>
  );
}
