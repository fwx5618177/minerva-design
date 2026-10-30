import { useTranslation } from "react-i18next";
import { TradingChart, type TradingIndicator } from "minerva-design/charts";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 360,
  timeframe: 4 * HOUR,
  seed: 3_141,
  price: 2_480,
  volatility: 0.008,
  volume: 900,
});

// eight exponential averages, warm (fast) to cool (slow)
const RIBBON = [
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#14b8a6",
  "#0ea5e9",
  "#6366f1",
];
const indicators: TradingIndicator[] = RIBBON.map((color, i) => ({
  type: "ema",
  period: 10 + i * 10,
  color,
  lineWidth: 1.25,
}));

export default function MaRibbonDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  return (
    <TradingChart
      bars={bars}
      timeframe="4H"
      symbol={t("eth")}
      indicators={indicators}
      ariaLabel={t("ribbonAria")}
      height={440}
    />
  );
}
