import { useTranslation } from "react-i18next";
import { TradingChart } from "minerva-design/charts";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 240,
  timeframe: DAY,
  seed: 300_750,
  price: 186,
  volatility: 0.019,
  volume: 2.6e7,
  market: "stock",
});

export default function AShareDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  // the defaults of Chinese terminals: MA 5 / 10 / 20 / 60, volume and MACD
  return (
    <TradingChart
      bars={bars}
      timeframe="1D"
      symbol={t("catl")}
      colorConvention="redUp"
      indicators={[
        { type: "ma", period: 5 },
        { type: "ma", period: 10 },
        { type: "ma", period: 20 },
        { type: "ma", period: 60 },
        { type: "volume", maPeriod: 5, height: 90 },
        { type: "macd", height: 110 },
      ]}
      ariaLabel={t("aShareAria")}
      height={540}
    />
  );
}
