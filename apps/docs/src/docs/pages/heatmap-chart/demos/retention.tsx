import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

const COHORTS = 9;
const PERIODS = 9;

// Share of each monthly signup cohort still active N months later; the
// newest cohorts have fewer months (null leaves the cell empty)
const retention = (cohort: number, month: number) => {
  if (month === 0) return 1;
  if (cohort + month >= COHORTS) return null;
  // onboarding improvements: later cohorts keep more users
  const floor = 0.18 + cohort * 0.015;
  return floor + (1 - floor) * Math.exp(-month / 1.6) * 0.62;
};

export default function RetentionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;

  const { cohorts, periods, data } = useMemo(() => {
    const date = new Intl.DateTimeFormat(locale, {
      month: "short",
      year: "numeric",
    });
    const cohorts = Array.from({ length: COHORTS }, (_, c) =>
      date.format(new Date(2026, c, 1)),
    );
    const periods = Array.from({ length: PERIODS }, (_, m) =>
      t("monthN", { n: m }),
    );
    const data: HeatmapCell[] = cohorts.flatMap((cohort, c) =>
      periods.map((period, m) => ({
        x: period,
        y: cohort,
        value: retention(c, m),
      })),
    );
    return { cohorts, periods, data };
  }, [t, locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  return (
    <HeatmapChart
      data={data}
      xCategories={periods}
      // oldest cohort at the top
      yCategories={[...cohorts].reverse()}
      colorScale={["var(--background-color)", "var(--primary-color)"]}
      valueRange={[0, 1]}
      name={t("retained")}
      format={(value) => percent.format(value)}
      height={340}
      ariaLabel={t("retentionAria")}
    />
  );
}
