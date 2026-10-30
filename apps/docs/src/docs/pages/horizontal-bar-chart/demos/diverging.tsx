import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Answers to an employee survey (% of respondents); disagreement is drawn
// to the left of zero, agreement to the right
const statements = ["career", "workload", "tools", "manager", "pay"] as const;
const answers: Record<
  (typeof statements)[number],
  [number, number, number, number]
> = {
  // strongly disagree, disagree, agree, strongly agree
  career: [12, 24, 41, 15],
  workload: [18, 30, 36, 9],
  tools: [5, 14, 49, 27],
  manager: [4, 9, 44, 39],
  pay: [21, 33, 31, 8],
};

export default function DivergingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const rows = statements.map((s) => t(`statements.${s}`));
    const scale = [
      { key: "stronglyDisagree", sign: -1, index: 0, color: "#dc2626" },
      { key: "disagree", sign: -1, index: 1, color: "#f87171" },
      { key: "agree", sign: 1, index: 2, color: "#34d399" },
      { key: "stronglyAgree", sign: 1, index: 3, color: "#059669" },
    ] as const;
    // the inner answers first, so that they touch zero
    return [scale[1], scale[0], scale[2], scale[3]].map((level) => ({
      name: t(`likert.${level.key}`),
      color: level.color,
      data: statements.map(
        (s, i) => [rows[i] ?? s, level.sign * answers[s][level.index]] as const,
      ),
    }));
  }, [t]);
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { style: "percent" });
    // both sides are positive shares
    return (value: number) => format.format(Math.abs(value) / 100);
  }, [locale]);

  return (
    <HorizontalBarChart
      series={series}
      stacked
      yAxis={{ format: percent }}
      annotations={[{ type: "line", axis: "y", value: 0, dash: [] }]}
      legend={{ position: "bottom" }}
      height={320}
      ariaLabel={t("surveyAria")}
    />
  );
}
