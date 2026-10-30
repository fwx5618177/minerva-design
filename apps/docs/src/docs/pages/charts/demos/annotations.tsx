import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Chart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// p95 latency (ms) per minute, with an incident during a deploy
const random = mulberry32(42);
const latency = Array.from({ length: 120 }, (_, minute) => {
  const incident = minute >= 70 && minute <= 82 ? 90 : 0;
  return [minute, 105 + random() * 40 + incident] as const;
});

export default function AnnotationsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const ms = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "millisecond",
        maximumFractionDigits: 0,
      }),
    [locale],
  );
  const series = useMemo(
    (): ChartSeries[] => [{ name: t("p95"), data: latency }],
    [t],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        y0: 80,
        y1: 150,
        color: "var(--success-color)",
        label: t("normalRange"),
      },
      {
        type: "rect",
        x0: 70,
        x1: 82,
        color: "var(--warning-color)",
        opacity: 0.12,
        label: t("deploy"),
        labelPosition: "top-right",
      },
      {
        type: "line",
        axis: "y",
        value: 200,
        color: "var(--danger-color)",
        dash: [4, 4],
        label: t("slo", { value: ms.format(200) }),
      },
    ],
    [t, ms],
  );

  return (
    <Chart
      series={series}
      annotations={annotations}
      xAxis={{ title: t("minutes") }}
      yAxis={{ min: 0, max: 260, format: (value) => ms.format(value) }}
      height={300}
      ariaLabel={t("latencyAria")}
    />
  );
}
