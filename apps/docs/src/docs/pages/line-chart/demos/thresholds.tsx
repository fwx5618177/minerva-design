import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

const MINUTE = 60 * 1000;
// 08:00 local time: the time axis places its ticks in local time
const START = new Date(2026, 9, 12, 8).getTime();
const TARGET = 300; // ms, p95 objective
const CRITICAL = 450; // ms

// API latency every 5 minutes over 6 hours, with an incident around 11:00
const latency = (base: number, spread: number) =>
  Array.from({ length: 72 }, (_, i) => {
    const incident = Math.max(0, 1 - Math.abs(i - 36) / 6);
    const noise = Math.sin(i * 1.3) * 0.08 + Math.cos(i * 0.7) * 0.05;
    return [
      START + i * 5 * MINUTE,
      Math.round(base * (1 + noise) + spread * incident),
    ] as const;
  });
const p50 = latency(120, 140);
const p95 = latency(240, 330);

export default function ThresholdsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("median"), data: p50 },
      { name: t("p95"), data: p95 },
    ],
    [t],
  );
  const ms = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "millisecond" }),
    [locale],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        y0: CRITICAL,
        color: "var(--danger-color)",
        opacity: 0.1,
        label: t("critical"),
      },
      {
        type: "line",
        axis: "y",
        value: TARGET,
        color: "var(--warning-color)",
        dash: [6, 4],
        label: t("target", { value: ms.format(TARGET) }),
      },
    ],
    [t, ms],
  );
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [locale],
  );

  return (
    <LineChart
      series={series}
      annotations={annotations}
      crosshair
      xAxis={{ type: "time", format: (value) => time.format(value) }}
      yAxis={{ min: 0, max: 700, format: (value) => ms.format(value) }}
      height={300}
      ariaLabel={t("latencyAria")}
    />
  );
}
