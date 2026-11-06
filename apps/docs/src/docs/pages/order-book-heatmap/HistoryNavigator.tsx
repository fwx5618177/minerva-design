import { useEffect, useState, type RefObject } from "react";
import { useTranslation } from "react-i18next";
import { Button, Slider } from "minerva-design";
import type {
  OrderBookHeatmapHandle,
  OrderBookHeatmapViewData,
} from "minerva-design/charts";
import type { MarketSummary } from "./useTerminalMarket";
import styles from "./market.module.scss";

export function HistoryNavigator({
  heatmap,
  summary,
}: {
  heatmap: RefObject<OrderBookHeatmapHandle | null>;
  summary: MarketSummary | null;
}) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const [navigation, setNavigation] = useState<{
    range: [number, number];
    follow: boolean;
    ready: boolean;
  }>({ range: [0, 100], follow: true, ready: false });
  useEffect(() => {
    const instance = heatmap.current?.getInstance();
    if (!instance) return;
    const update = (data: OrderBookHeatmapViewData) => {
      const available = data.availableTime;
      const ready = !!available && available[1] > available[0];
      const range = ready
        ? (data.view.time.map((time) =>
            Math.max(
              0,
              Math.min(
                100,
                Math.round(
                  ((time - available![0]) / (available![1] - available![0])) *
                    100,
                ),
              ),
            ),
          ) as [number, number])
        : ([0, 100] as [number, number]);
      setNavigation((previous) =>
        previous.ready === ready &&
        previous.follow === data.view.follow &&
        previous.range[0] === range[0] &&
        previous.range[1] === range[1]
          ? previous
          : { range, follow: data.view.follow, ready },
      );
    };
    const unsubscribe = instance.on("view", update);
    const frame = requestAnimationFrame(() => update(instance.getView()));
    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
    };
  }, [heatmap]);
  const { range, follow, ready } = navigation;
  const closes = summary?.closes ?? [];
  const low = Math.min(...closes);
  const high = Math.max(...closes);
  const path = closes
    .map(
      (close, i) =>
        `${(i * 100) / Math.max(1, closes.length - 1)},${40 - ((close - low) / (high - low || 1)) * 34}`,
    )
    .join(" ");
  return (
    <div
      className={styles.navigator}
      data-testid="heatmap-history-navigator"
      data-follow={follow}
    >
      <div className={styles.navigatorHeader}>
        <span>{t("historyNavigator")}</span>
        <Button
          size="small"
          data-testid="heatmap-follow"
          onClick={() => {
            heatmap.current?.resetView();
          }}
        >
          {t("followMarket")}
        </Button>
      </div>
      <svg viewBox="0 0 100 44" preserveAspectRatio="none" aria-hidden="true">
        <polyline
          points={path}
          fill="none"
          stroke="var(--success-color, #30d6a3)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <Slider
        range
        disabled={!ready}
        aria-label={t("historyNavigator")}
        min={0}
        max={100}
        step={1}
        value={range}
        onChange={(value) => {
          const next = value as [number, number];
          const available = heatmap.current?.getView()?.availableTime;
          if (!available || next[1] <= next[0]) return;
          setNavigation((previous) => ({
            ...previous,
            range: next,
            follow: false,
          }));
          const span = available[1] - available[0];
          heatmap.current?.setView({
            time: [
              available[0] + (span * next[0]) / 100,
              available[0] + (span * next[1]) / 100,
            ],
          });
        }}
      />
      <p className={styles.caption}>{t(follow ? "following" : "panned")}</p>
    </div>
  );
}
