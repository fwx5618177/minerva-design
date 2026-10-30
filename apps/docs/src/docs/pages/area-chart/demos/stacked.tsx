import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

// Monthly visits by traffic source, January to December
const sources = {
  organic: [
    42_000, 44_500, 47_800, 46_900, 51_200, 54_000, 52_300, 55_800, 60_100,
    63_400, 66_200, 70_500,
  ],
  direct: [
    21_000, 21_800, 22_400, 23_900, 24_100, 25_600, 26_000, 25_200, 27_300,
    28_800, 29_500, 31_200,
  ],
  referral: [
    9_800, 10_400, 12_900, 11_700, 12_300, 14_800, 13_900, 14_200, 15_600,
    17_400, 16_900, 18_300,
  ],
  social: [
    6_200, 7_900, 7_100, 8_800, 11_400, 10_200, 9_600, 12_700, 13_100, 12_400,
    15_800, 17_900,
  ],
};

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function StackedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    const names = {
      organic: t("sources.organic"),
      direct: t("sources.direct"),
      referral: t("sources.referral"),
      social: t("sources.social"),
    };
    return (Object.keys(sources) as (keyof typeof sources)[]).map((key) => ({
      name: names[key],
      data: months.map((month, i) => [month, sources[key][i]] as const),
    }));
  }, [t, locale]);
  const compact = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
    [locale],
  );

  return (
    <AreaChart
      series={series}
      stacked
      yAxis={{ format: (value) => compact.format(value) }}
      height={300}
      ariaLabel={t("visitsAria")}
    />
  );
}
