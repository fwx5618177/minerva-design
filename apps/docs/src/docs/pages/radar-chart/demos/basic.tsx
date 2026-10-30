import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Interview scorecard of one candidate, each skill rated out of 10
const skills = [
  "problemSolving",
  "coding",
  "systemDesign",
  "communication",
  "collaboration",
  "ownership",
];
const scores = [8.5, 9, 6.5, 7, 8, 9];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const locale = i18n.language;

  const indicators = useMemo(
    (): RadarIndicator[] =>
      skills.map((skill) => ({ name: t(`skills.${skill}`), max: 10 })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] => [{ name: t("candidate"), values: scores }],
    [t],
  );
  const decimal = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <RadarChart
      indicators={indicators}
      series={series}
      format={(value) => t("outOf", { value: decimal.format(value), max: 10 })}
      height={340}
      ariaLabel={t("scorecardAria")}
    />
  );
}
