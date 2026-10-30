import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  TradingChart,
  type TradingColorConvention,
} from "minerva-design/charts";
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

const CONVENTIONS: TradingColorConvention[] = ["redUp", "auto", "greenUp"];

export default function RedUpDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  // "auto": red up when the page is in Chinese or Japanese
  const [convention, setConvention] = useState<TradingColorConvention>("redUp");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("colorConvention")}
        direction="horizontal"
        value={convention}
        onChange={(value) => setConvention(value as TradingColorConvention)}
      >
        {CONVENTIONS.map((value) => (
          <Radio key={value} value={value} label={t(`conventions.${value}`)} />
        ))}
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="1D"
        symbol={t("moutai")}
        colorConvention={convention}
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
    </div>
  );
}
