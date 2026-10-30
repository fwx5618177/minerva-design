import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Issues of the current milestone per team: done, in review, to do
const teams = {
  platform: [42, 6, 12],
  payments: [18, 9, 21],
  mobile: [30, 4, 4],
  growth: [11, 7, 26],
  design: [24, 2, 3],
};

export default function ProgressDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });

  const series = useMemo((): ChartSeries[] => {
    const keys = Object.keys(teams) as (keyof typeof teams)[];
    const status = [
      { key: "done", color: "var(--success-color, #16a34a)" },
      { key: "review", color: "var(--warning-color, #f59e0b)" },
      { key: "todo", color: "var(--border-color, #cbd5e1)" },
    ] as const;
    return status.map((s, k) => ({
      name: t(`status.${s.key}`),
      color: s.color,
      data: keys.map(
        (team) => [t(`teams.${team}`), teams[team][k] ?? 0] as const,
      ),
    }));
  }, [t]);

  // percent: every team fills the width; the tooltip keeps the counts
  return (
    <HorizontalBarChart
      series={series}
      percent
      height={280}
      ariaLabel={t("progressAria")}
    />
  );
}
