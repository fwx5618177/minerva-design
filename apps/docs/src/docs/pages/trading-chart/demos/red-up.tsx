import { useTranslation } from "react-i18next";
import { TradingChart } from "minerva-design/charts";
import { DAY, generateBars } from "../data";

// daily bars of a Shanghai-listed stock (no trading on weekends)
const bars = generateBars({
  count: 300,
  timeframe: DAY,
  seed: 600_519,
  price: 1_688,
  volatility: 0.017,
  volume: 3.2e6,
  market: "stock",
  start: Date.UTC(2024, 8, 2),
});

export default function RedUpDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  return (
    <TradingChart
      bars={bars}
      timeframe="1D"
      symbol={t("moutai")}
      // rising bars in red, falling bars in green
      colorConvention="redUp"
      // China Standard Time (UTC+8)
      utcOffset={480}
      indicators={[
        { type: "ma", period: 5 },
        { type: "ma", period: 10 },
        { type: "ma", period: 20 },
        { type: "ma", period: 60 },
        { type: "volume", maPeriod: 5, height: 90 },
        { type: "kdj", height: 100 },
      ]}
      barSpacing={7}
      ariaLabel={t("redUpAria")}
      height={540}
    />
  );
}
