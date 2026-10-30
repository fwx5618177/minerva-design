import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LineChart, type ChartSeries } from "minerva-design/charts";

const thisWeek = [1200, 1350, 1280, 1490, 1610, 980, 870];
const lastWeek = [1100, 1180, 1250, 1300, 1420, 1010, 760];

/** Short weekday names in the reader's language, Monday first */
const weekdays = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
  // 5 January 2026 is a Monday
  return Array.from({ length: 7 }, (_, i) =>
    format.format(new Date(2026, 0, 5 + i)),
  );
};

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const days = weekdays(locale);
    return [
      {
        name: t("thisWeek"),
        data: days.map((day, i) => [day, thisWeek[i]] as const),
      },
      {
        name: t("lastWeek"),
        data: days.map((day, i) => [day, lastWeek[i]] as const),
      },
    ];
  }, [t, locale]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <LineChart
      series={series}
      yAxis={{ format: (value) => number.format(value) }}
      height={280}
      ariaLabel={t("visitorsAria")}
    />
  );
}
