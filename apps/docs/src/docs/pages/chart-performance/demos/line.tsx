import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LineChart, type ChartSeries } from "minerva-design/charts";
import {
  SIGNAL_LENGTH,
  SIGNAL_SERIES,
  SIGNAL_TARGETS,
  fitY,
  loadSignals,
  tour,
  type Signals,
} from "../showcase/data";
import { Showcase, type ShowcaseChartProps } from "../showcase/Showcase";

// zooms from the 1,000,000 points down to ~3 minutes of one sensor
const lineTour = tour({ zoom: 1200, period: 14, targets: SIGNAL_TARGETS });

function Sensors({
  data,
  chartRef,
  renderer,
  onRendererChange,
  onZoom,
}: ShowcaseChartProps<Signals>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  // typed-array columns sharing one x column: no per-point objects
  const series = useMemo(
    (): ChartSeries[] =>
      data.y.map((y, index) => ({
        id: `sensor-${index}`,
        name: t("sensor", { index: index + 1 }),
        data: { x: data.x, y },
        lineWidth: 1,
      })),
    [data, t],
  );
  return (
    <LineChart
      ref={chartRef}
      series={series}
      renderer={renderer}
      onRendererChange={onRendererChange}
      onZoom={onZoom}
      xAxis={{ type: "time" }}
      yAxis={{ title: t("temperature") }}
      interaction={{ zoom: "x" }}
      height={360}
      ariaLabel={t("lineAria")}
    />
  );
}

export default function LineDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  return (
    <Showcase
      load={loadSignals}
      chart={Sensors}
      count={SIGNAL_SERIES * SIGNAL_LENGTH}
      countLabel={t("stats.points")}
      height={360}
      motionLabel={t("tour")}
      hint={t("hintX")}
      tour={(data, time, base) => lineTour(time, base)}
      fit={fitY}
    />
  );
}
