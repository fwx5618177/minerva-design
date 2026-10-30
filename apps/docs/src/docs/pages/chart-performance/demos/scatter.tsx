import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";
import {
  CLUSTER_COUNT,
  CLUSTER_SIZE,
  loadClusters,
  tour,
  type Clusters,
} from "../showcase/data";
import { Showcase, type ShowcaseChartProps } from "../showcase/Showcase";

const PALETTE = [
  "#4f6bed",
  "#e8590c",
  "#2f9e44",
  "#c2255c",
  "#0c8599",
  "#f59f00",
  "#7048e8",
  "#5c940d",
  "#d6336c",
  "#1971c2",
];

function ClusterChart({
  data,
  chartRef,
  renderer,
  onRendererChange,
}: ShowcaseChartProps<Clusters>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  // one series (one color) per cluster, 100,000 typed-array points each
  const series = useMemo(
    (): ChartSeries[] =>
      data.clusters.map((cluster, index) => ({
        id: `cluster-${index}`,
        name: t("cluster", { index: index + 1 }),
        data: cluster,
        pointSize: 2,
        opacity: 0.55,
      })),
    [data, t],
  );
  return (
    <ScatterChart
      ref={chartRef}
      series={series}
      palette={PALETTE}
      renderer={renderer}
      onRendererChange={onRendererChange}
      legend={{ position: "bottom" }}
      height={420}
      ariaLabel={t("scatterAria")}
    />
  );
}

export default function ScatterDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  return (
    <Showcase
      load={loadClusters}
      chart={ClusterChart}
      count={CLUSTER_COUNT * CLUSTER_SIZE}
      countLabel={t("stats.points")}
      height={420}
      motionLabel={t("tour")}
      hint={t("hintXY")}
      tour={(data, time, base) =>
        // zooms into one cluster after the other, on both axes
        tour({ zoom: 12, period: 10, targets: data.centers, y: true })(
          time,
          base,
        )
      }
    />
  );
}
