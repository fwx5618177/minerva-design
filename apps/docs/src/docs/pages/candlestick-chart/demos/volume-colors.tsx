import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TradingChart } from "minerva-design/charts";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 240,
  timeframe: HOUR,
  seed: 4_096,
  price: 63_200,
  volatility: 0.0045,
  volume: 260,
});

export default function VolumeColorsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const [layout, setLayout] = useState("pane");
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        label={t("volumeLayout")}
        direction="horizontal"
        value={layout}
        onChange={(value) => setLayout(String(value))}
      >
        <Radio value="pane" label={t("volumePane")} />
        <Radio value="overlay" label={t("volumeOverlay")} />
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="1H"
        symbol={t("btc")}
        indicators={[
          {
            type: "volume",
            maPeriod: 20,
            overlay: layout === "overlay",
            height: 110,
          },
        ]}
        ariaLabel={t("volumeColorsAria")}
        height={420}
      />
    </div>
  );
}
