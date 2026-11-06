import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "minerva-design";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useTerminalMarket } from "../useTerminalMarket";
import styles from "../market.module.scss";

export default function IntensityFilterDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const host = useRef<HTMLDivElement>(null);
  const heatmap = useRef<OrderBookHeatmapHandle>(null);
  const [range, setRange] = useState<[number, number]>([0.25, 1]);
  useTerminalMarket(host, heatmap);
  return (
    <div
      ref={host}
      className={styles.demo}
      data-testid="heatmap-intensity-demo"
    >
      <span className={styles.badge}>{t("simulated")}</span>
      <label className={styles.control}>
        {t("intensityFilter")}
        <Slider
          range
          aria-label={t("intensityFilter")}
          min={0}
          max={1}
          step={0.05}
          value={range}
          onChange={(value) => setRange(value as [number, number])}
          formatValue={(value) => `${Math.round(value * 100)}%`}
          showValue
        />
      </label>
      <OrderBookHeatmap
        ref={heatmap}
        intensityRange={range}
        candles
        lastPriceLine
        height={400}
        interval={250}
        window={60_000}
        maxColumns={720}
        maxBars={180}
        pricePrecision={1}
        sizeUnit="BTC"
        ariaLabel={t("filterAria")}
      />
      <p className={styles.caption}>{t("filterHint")}</p>
    </div>
  );
}
