import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useTerminalMarket } from "../useTerminalMarket";
import styles from "../market.module.scss";

export default function CandlesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const host = useRef<HTMLDivElement>(null);
  const heatmap = useRef<OrderBookHeatmapHandle>(null);
  const [candles, setCandles] = useState(true);
  useTerminalMarket(host, heatmap);
  return (
    <div ref={host} className={styles.demo} data-testid="heatmap-candles-demo">
      <div className={styles.controls}>
        <span className={styles.badge}>{t("simulated")}</span>
        <Switch
          checked={candles}
          onChange={setCandles}
          label={t("showCandles")}
        />
      </div>
      <OrderBookHeatmap
        ref={heatmap}
        candles={candles}
        lastPriceLine
        height={420}
        interval={250}
        window={60_000}
        maxColumns={720}
        maxBars={180}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("candlesAria")}
      />
      <p className={styles.caption}>{t("executionsOnly")}</p>
    </div>
  );
}
