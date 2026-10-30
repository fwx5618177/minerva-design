import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Chart, type ChartSeries } from "minerva-design/charts";
import {
  SPECTRUM_BINS,
  SPECTRUM_STEPS,
  SPECTRUM_TARGETS,
  loadSpectrogram,
  tour,
  type Spectrogram,
} from "../showcase/data";
import { Showcase, type ShowcaseChartProps } from "../showcase/Showcase";

const MAGMA = [
  "#000004",
  "#2c115f",
  "#721f81",
  "#b73779",
  "#f1605d",
  "#feb078",
  "#fcfdbf",
];

// zooms until single cells (20 ms × 8 Hz) are a few pixels wide
const spectrumTour = tour({
  zoom: 40,
  period: 12,
  targets: SPECTRUM_TARGETS,
  y: true,
});

function Spectrum({
  data,
  chartRef,
  renderer,
  onRendererChange,
}: ShowcaseChartProps<Spectrogram>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  // 1,000,000 cells in three typed-array columns: time, frequency, level
  const series = useMemo(
    (): ChartSeries[] => [
      {
        id: "spectrogram",
        name: t("level"),
        type: "heatmap",
        data: { x: data.x, y: data.y, value: data.value },
        colorScale: MAGMA,
        valueRange: [-70, 0],
        radius: 0,
        format: (value) => t("db", { value: value.toFixed(1) }),
      },
    ],
    [data, t],
  );
  return (
    <Chart
      ref={chartRef}
      series={series}
      renderer={renderer}
      onRendererChange={onRendererChange}
      xAxis={{ title: t("time") }}
      yAxis={{ type: "linear", title: t("frequency") }}
      interaction={{ zoom: "xy" }}
      legend={false}
      height={420}
      ariaLabel={t("heatmapAria")}
    />
  );
}

export default function HeatmapDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  return (
    <Showcase
      load={loadSpectrogram}
      chart={Spectrum}
      count={SPECTRUM_STEPS * SPECTRUM_BINS}
      countLabel={t("stats.cells")}
      height={420}
      motionLabel={t("tour")}
      hint={t("hintXY")}
      tour={(data, time, base) => spectrumTour(time, base)}
    />
  );
}
