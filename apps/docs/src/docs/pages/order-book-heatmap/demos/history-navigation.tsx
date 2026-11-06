import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useTerminalMarket } from "../useTerminalMarket";
import { HistoryNavigator } from "../HistoryNavigator";
import styles from "../market.module.scss";

export default function HistoryNavigationDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const host = useRef<HTMLDivElement>(null);
  const heatmap = useRef<OrderBookHeatmapHandle>(null);
  const summary = useTerminalMarket(host, heatmap);
  return (
    <div
      ref={host}
      className={styles.demo}
      data-testid="heatmap-navigation-demo"
    >
      <span className={styles.badge}>{t("simulated")}</span>
      <OrderBookHeatmap
        ref={heatmap}
        candles
        lastPriceLine
        height={420}
        interval={250}
        window={45_000}
        maxColumns={720}
        maxBars={180}
        pricePrecision={1}
        sizeUnit="BTC"
        ariaLabel={t("navigationAria")}
      />
      <HistoryNavigator heatmap={heatmap} summary={summary} />
      <p className={styles.caption}>{t("navigatorHint")}</p>
    </div>
  );
}
