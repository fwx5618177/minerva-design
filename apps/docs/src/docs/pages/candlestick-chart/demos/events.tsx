import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TradingChart, type TradingMarker } from "minerva-design/charts";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 260,
  timeframe: DAY,
  seed: 2_026,
  price: 182,
  volatility: 0.015,
  volume: 5e7,
  market: "stock",
});

/** Corporate events: bar index, kind */
const EVENTS: [number, "earnings" | "dividend" | "split" | "guidance"][] = [
  [38, "earnings"],
  [64, "dividend"],
  [101, "earnings"],
  [128, "dividend"],
  [150, "split"],
  [164, "earnings"],
  [192, "dividend"],
  [226, "earnings"],
  [240, "guidance"],
];

const COLORS = {
  earnings: "var(--primary-color)",
  dividend: "#a855f7",
  split: "var(--warning-color)",
  guidance: "var(--danger-color)",
};

export default function EventsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const markers = useMemo(
    (): TradingMarker[] =>
      EVENTS.map(([index, kind]) => ({
        id: `${kind}-${index}`,
        time: bars[index].time,
        // events above the bars, the cut guidance below
        side: kind === "guidance" ? "buy" : "sell",
        color: COLORS[kind],
        text: t(`events.${kind}`),
      })),
    [t],
  );
  return (
    <div style={{ display: "grid", gap: 10, width: "100%" }}>
      <TradingChart
        bars={bars}
        timeframe="1D"
        symbol={t("orbt")}
        markers={markers}
        indicators={[{ type: "ma", period: 50 }]}
        ariaLabel={t("eventsAria")}
        height={420}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          fontSize: 13,
          color: "var(--text-secondary-color)",
        }}
      >
        {(Object.keys(COLORS) as (keyof typeof COLORS)[]).map((kind) => (
          <span key={kind} style={{ display: "inline-flex", gap: 6 }}>
            <span
              aria-hidden="true"
              style={{
                width: 10,
                height: 10,
                marginTop: 4,
                borderRadius: 2,
                background: COLORS[kind],
              }}
            />
            {t(`eventNames.${kind}`)}
          </span>
        ))}
      </div>
    </div>
  );
}
