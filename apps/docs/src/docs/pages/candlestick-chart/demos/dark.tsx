import { useTranslation } from "react-i18next";
import { TradingChart } from "minerva-design/charts";
import { MINUTE, generateBars } from "../../trading-chart/data";

const bars = generateBars(
  {
    count: 300,
    timeframe: 30 * MINUTE,
    seed: 1_999,
    price: 18_420,
    volatility: 0.0032,
    volume: 3_200,
  },
  1,
);

// a night palette: the chart reads its colors from these CSS variables
const night = {
  "--background-color": "#0f1424",
  "--surface-color": "#0f1424",
  "--surface-elevated-color": "#1a2136",
  "--text-color": "#dbe1f1",
  "--text-secondary-color": "#7d87a3",
  "--border-color": "#242c44",
  "--success-color": "#26c6da",
  "--danger-color": "#ff5c8a",
  "--warning-color": "#ffb74d",
  "--primary-color": "#7c8cff",
  color: "#dbe1f1",
  background: "#0f1424",
  border: "1px solid #242c44",
  borderRadius: 12,
  overflow: "hidden",
  width: "100%",
} as React.CSSProperties;

export default function DarkDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  return (
    <div style={night}>
      <TradingChart
        bars={bars}
        timeframe="30m"
        symbol={t("nasdaq")}
        chartStyle="hollowCandles"
        indicators={[
          { type: "ema", period: 21, color: "#7c8cff" },
          { type: "volume", overlay: true },
        ]}
        watermark={t("nasdaq")}
        ariaLabel={t("darkAria")}
        height={420}
      />
    </div>
  );
}
