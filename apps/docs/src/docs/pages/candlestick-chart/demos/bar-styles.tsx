import { useTranslation } from "react-i18next";
import { TradingChart, type TradingChartStyle } from "minerva-design/charts";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 70,
  timeframe: DAY,
  seed: 128,
  price: 96,
  volatility: 0.02,
  volume: 1e6,
  market: "stock",
});

const STYLES: TradingChartStyle[] = ["bars", "candles", "hollowCandles"];

export default function BarStylesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 12,
        width: "100%",
      }}
    >
      {STYLES.map((style) => (
        <figure key={style} style={{ margin: 0, display: "grid", gap: 6 }}>
          <TradingChart
            bars={bars}
            timeframe="1D"
            chartStyle={style}
            legend={false}
            highLowMarkers={false}
            barSpacing={7}
            rightOffset={2}
            ariaLabel={t(`styleAria.${style}`)}
            height={240}
          />
          <figcaption style={{ fontSize: 13 }}>
            <strong>{t(`styleNames.${style}`)}</strong>
            <span style={{ color: "var(--text-secondary-color)" }}>
              {" · "}
              {t(`styleHints.${style}`)}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
