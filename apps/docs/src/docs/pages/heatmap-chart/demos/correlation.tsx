import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

// Correlation between product metrics (symmetric, 1 on the diagonal)
const metrics = [
  "sessions",
  "pageViews",
  "signups",
  "revenue",
  "churn",
  "tickets",
];
const matrix = [
  [1, 0.92, 0.71, 0.64, -0.18, 0.35],
  [0.92, 1, 0.66, 0.58, -0.12, 0.31],
  [0.71, 0.66, 1, 0.83, -0.41, 0.22],
  [0.64, 0.58, 0.83, 1, -0.57, 0.08],
  [-0.18, -0.12, -0.41, -0.57, 1, 0.46],
  [0.35, 0.31, 0.22, 0.08, 0.46, 1],
];

export default function CorrelationDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;

  const names = useMemo(() => metrics.map((key) => t(`metrics.${key}`)), [t]);
  const data = useMemo(
    (): HeatmapCell[] =>
      matrix.flatMap((row, i) =>
        row.map((value, j) => ({ x: names[j], y: names[i], value })),
      ),
    [names],
  );
  const coefficient = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        signDisplay: "exceptZero",
      }),
    [locale],
  );

  return (
    <HeatmapChart
      data={data}
      xCategories={names}
      // first metric at the top, like a table
      yCategories={[...names].reverse()}
      // built-in theme-aware ramp: danger color below 0, primary above
      colorScale="diverging"
      colorMidpoint={0}
      valueRange={[-1, 1]}
      name={t("correlation")}
      format={(value) => coefficient.format(value)}
      height={360}
      ariaLabel={t("correlationAria")}
    />
  );
}
