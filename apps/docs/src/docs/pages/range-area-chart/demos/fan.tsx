import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

// Percentiles of the response time of an API (ms) every 10 minutes over a
// day: busy hours widen the distribution
const points = Array.from({ length: 144 }, (_, i) => {
  const hour = i / 6;
  const load =
    Math.exp(-((hour - 11) ** 2) / 8) + 0.7 * Math.exp(-((hour - 19) ** 2) / 5);
  const p50 = 42 + 30 * load + 2 * Math.sin(i / 2.3);
  return {
    x: new Date(2026, 2, 12, 0, i * 10),
    p5: p50 * 0.55,
    p25: p50 * 0.8,
    p50,
    p75: p50 * (1.3 + 0.2 * load),
    p95: p50 * (2 + 1.4 * load),
  };
});

export default function FanDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const ms = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  // nested bands: the outer one first, the median line on top
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("p5p95"),
        color: "var(--chart-series-5, #0ea5e9)",
        opacity: 0.16,
        lineWidth: 0,
        format: ms,
        data: points.map((p) => ({ x: p.x, y0: p.p5, y: p.p95 })),
      },
      {
        name: t("p25p75"),
        color: "var(--chart-series-5, #0ea5e9)",
        opacity: 0.32,
        lineWidth: 0,
        format: ms,
        data: points.map((p) => ({ x: p.x, y0: p.p25, y: p.p75 })),
      },
      {
        name: t("median"),
        type: "line",
        color: "var(--chart-series-5, #0ea5e9)",
        format: ms,
        data: points.map((p) => [p.x, p.p50] as const),
      },
    ],
    [t, ms],
  );

  return (
    <RangeAreaChart
      series={series}
      yAxis={{ format: ms, zero: true }}
      height={300}
      ariaLabel={t("latencyAria")}
    />
  );
}
