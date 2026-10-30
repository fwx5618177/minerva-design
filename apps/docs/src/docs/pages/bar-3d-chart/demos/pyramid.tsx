import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Bar3DChart, type Bar3DSeries } from "minerva-design/charts";

// Population (millions) by age group in four census years: women above the
// floor, men below it (negative heights), like a population pyramid laid on
// its side and repeated over time
const YEARS = [1960, 1980, 2000, 2020];
const GROUPS = [0, 10, 20, 30, 40, 50, 60, 70, 80];
const population = (year: number, group: number, women: boolean) => {
  // births shrink over the decades while people live longer
  const birth = 4.2 - (year - 1960) * 0.025;
  const survival = Math.exp(-((group / (62 + (year - 1960) * 0.2)) ** 4));
  const shift = 1 + Math.max(0, 0.6 - Math.abs(year - 1960 - group - 10) / 25);
  const value = birth * survival * shift * (women ? 1 + group / 400 : 1);
  return Math.round(value * 100) / 100;
};

export default function PyramidDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });

  const series = useMemo(
    (): Bar3DSeries[] => [
      {
        name: t("women"),
        color: "var(--chart-series-5, #ec4899)",
        data: YEARS.flatMap((year, y) =>
          GROUPS.map(
            (group, x) => [x, y, population(year, group, true)] as const,
          ),
        ),
      },
      {
        name: t("men"),
        color: "var(--chart-series-1, #3b82f6)",
        data: YEARS.flatMap((year, y) =>
          GROUPS.map(
            (group, x) => [x, y, -population(year, group, false)] as const,
          ),
        ),
      },
    ],
    [t],
  );
  const ages = GROUPS.map((from, i) =>
    i === GROUPS.length - 1
      ? t("ageOver", { from })
      : t("ageGroup", { from, to: from + 9 }),
  );

  return (
    <Bar3DChart
      series={series}
      barWidth={0.8}
      xAxis={{ title: t("age"), categories: ages }}
      yAxis={{ title: t("year"), categories: YEARS.map(String) }}
      zAxis={{
        title: t("population"),
        format: (value) => t("millions", { value: Math.abs(value) }),
      }}
      aspect={[1.2, 0.8, 0.8]}
      camera={{ azimuth: 28, elevation: 14 }}
      height={440}
      ariaLabel={t("pyramidAria")}
    />
  );
}
