import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

// Key results of a quarter's objective, in percent of their target
const KEY_RESULTS: [key: string, progress: number][] = [
  ["activation", 82],
  ["retention", 64],
  ["nps", 91],
  ["latency", 47],
  ["churn", 58],
];

const percent = (share: number) => `${Math.round(share * 100)}%`;

export default function OkrDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });

  const data = useMemo(
    (): RadialBarDatum[] =>
      KEY_RESULTS.map(([key, progress]) => ({
        name: t(`okr.${key}`),
        value: progress,
      })),
    [t],
  );
  const average = Math.round(
    KEY_RESULTS.reduce((sum, [, progress]) => sum + progress, 0) /
      KEY_RESULTS.length,
  );

  return (
    <RadialBarChart
      data={data}
      max={100}
      innerRadius={0.4}
      labelContent={["name", "percent"]}
      percentFormat={percent}
      centerValue={`${average}%`}
      centerLabel={t("average")}
      height={340}
      ariaLabel={t("okrAria")}
    />
  );
}
