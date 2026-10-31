import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TradingChart, type TradingDrawing } from "minerva-design/charts";
import { rsi } from "minerva-design/charts/core";
import { HOUR, generateBars } from "../../trading-chart/data";

type Kind = "bullish" | "bearish";
type Filter = "all" | Kind;

const bars = generateBars({
  count: 400,
  timeframe: 4 * HOUR,
  seed: 311,
  price: 142,
  volatility: 0.012,
  volume: 1e5,
});
const strength = rsi(
  bars.map((bar) => bar.close),
  14,
);

/** Swing points: the highest high (lowest low) of the 5 bars on each side */
const WING = 5;
const swings = (kind: "high" | "low") => {
  const found: number[] = [];
  for (let i = WING; i < bars.length - WING; i++) {
    let swing = Number.isFinite(strength[i]);
    for (let j = i - WING; j <= i + WING && swing; j++)
      if (
        j !== i &&
        (kind === "high"
          ? bars[j].high >= bars[i].high
          : bars[j].low <= bars[i].low)
      )
        swing = false;
    if (swing) found.push(i);
  }
  return found;
};

interface Divergence {
  kind: Kind;
  from: number;
  to: number;
}

// regular divergences between two neighbouring swings at most 40 bars
// apart: a lower low with a higher RSI low (bullish), a higher high with a
// lower RSI high (bearish)
const DIVERGENCES: Divergence[] = [];
const pairs = (list: number[], kind: Kind) => {
  for (let k = 1; k < list.length; k++) {
    const [from, to] = [list[k - 1], list[k]];
    if (to - from > 40) continue;
    const priceDiverges =
      kind === "bullish"
        ? bars[to].low < bars[from].low
        : bars[to].high > bars[from].high;
    const rsiDiverges =
      kind === "bullish"
        ? strength[to] > strength[from]
        : strength[to] < strength[from];
    if (priceDiverges && rsiDiverges) DIVERGENCES.push({ kind, from, to });
  }
};
pairs(swings("low"), "bullish");
pairs(swings("high"), "bearish");
DIVERGENCES.sort((a, b) => a.to - b.to);

const COLORS: Record<Kind, string> = {
  bullish: "var(--success-color)",
  bearish: "var(--danger-color)",
};

export default function DivergenceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const locale = i18n.language;
  const [filter, setFilter] = useState<Filter>("all");

  // each divergence is a pair of locked trend lines: one on the price
  // pane, one on the RSI pane (its indicator id)
  const drawings = useMemo(
    (): TradingDrawing[] =>
      DIVERGENCES.filter(
        (divergence) => filter === "all" || divergence.kind === filter,
      ).flatMap(({ kind, from, to }) => {
        const price = (i: number) =>
          kind === "bullish" ? bars[i].low : bars[i].high;
        const style = {
          type: "trendLine" as const,
          color: COLORS[kind],
          lineWidth: 2,
          locked: true,
        };
        return [
          {
            ...style,
            id: `price-${from}`,
            pane: "price",
            points: [
              { time: bars[from].time, price: price(from) },
              { time: bars[to].time, price: price(to) },
            ],
          },
          {
            ...style,
            id: `rsi-${from}`,
            pane: "rsi:14",
            points: [
              { time: bars[from].time, price: strength[from] },
              { time: bars[to].time, price: strength[to] },
            ],
          },
        ];
      }),
    [filter],
  );

  const integer = new Intl.NumberFormat(locale);
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
  const count = (kind: Kind) =>
    integer.format(DIVERGENCES.filter((d) => d.kind === kind).length);
  const latest = DIVERGENCES.filter(
    (divergence) => filter === "all" || divergence.kind === filter,
  ).at(-1);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("divergenceKind")}
        direction="horizontal"
        value={filter}
        onChange={(value) => setFilter(value as Filter)}
      >
        <Radio value="all" label={t("divergenceKinds.all")} />
        <Radio value="bullish" label={t("divergenceKinds.bullish")} />
        <Radio value="bearish" label={t("divergenceKinds.bearish")} />
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="4H"
        symbol={t("sol")}
        indicators={[{ type: "rsi", id: "rsi:14", period: 14, height: 120 }]}
        drawings={drawings}
        ariaLabel={t("divergenceAria")}
        height={460}
      />
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
        }}
      >
        {t("divergenceSummary", {
          bullish: count("bullish"),
          bearish: count("bearish"),
        })}
        {latest &&
          ` ${t("divergenceLatest", {
            kind: t(`divergenceKinds.${latest.kind}`),
            date: date.format(bars[latest.to].time),
          })}`}
      </span>
    </div>
  );
}
