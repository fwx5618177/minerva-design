import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CandlestickChart, type ChartSeries } from "minerva-design/charts";
import {
  CANDLE_COUNT,
  CANDLE_TARGETS,
  fitY,
  loadCandles,
  tour,
  type Candles,
} from "../showcase/data";
import { Showcase, type ShowcaseChartProps } from "../showcase/Showcase";

// from 200,000 candles (about 140 days) down to two hours of one-minute candles
const candleTour = tour({ zoom: 1600, period: 14, targets: CANDLE_TARGETS });

function Market({
  data,
  chartRef,
  renderer,
  onRendererChange,
  onZoom,
}: ShowcaseChartProps<Candles>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  // OHLC columns: y holds the closes
  const series = useMemo(
    (): ChartSeries[] => [
      {
        id: "candles",
        name: t("market"),
        data: {
          x: data.x,
          y: data.close,
          open: data.open,
          high: data.high,
          low: data.low,
        },
      },
    ],
    [data, t],
  );
  return (
    <CandlestickChart
      ref={chartRef}
      series={series}
      renderer={renderer}
      onRendererChange={onRendererChange}
      onZoom={onZoom}
      xAxis={{ type: "time" }}
      yAxis={{ title: t("price") }}
      interaction={{ zoom: "x" }}
      legend={false}
      height={380}
      ariaLabel={t("candlesAria")}
    />
  );
}

export default function CandlesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  return (
    <Showcase
      load={loadCandles}
      chart={Market}
      count={CANDLE_COUNT}
      countLabel={t("stats.candles")}
      height={380}
      motionLabel={t("tour")}
      hint={t("hintX")}
      tour={(data, time, base) => candleTour(time, base)}
      fit={fitY}
    />
  );
}
