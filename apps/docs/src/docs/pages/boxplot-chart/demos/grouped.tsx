import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  BoxPlotChart,
  boxplotData,
  type ChartSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Delivery times (hours) per city, on weekdays and on weekends
const cities = ["paris", "lyon", "marseille", "lille"] as const;
const sample = (seed: number, mean: number) => {
  const random = mulberry32(seed);
  return Array.from(
    { length: 400 },
    () => mean * (0.5 + random() + random() ** 6 * 1.5),
  );
};

export default function GroupedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const hours = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "hour",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  // boxplotData turns raw samples into box plot data: one series per period
  const series = useMemo(
    (): ChartSeries[] =>
      (["weekdays", "weekends"] as const).map((period, p) => ({
        name: t(`periods.${period}`),
        format: hours,
        data: boxplotData(
          cities.map((city, c) => ({
            x: t(`cities.${city}`),
            values: sample(c * 10 + p, p ? 31 : 22 + c * 3),
          })),
        ),
      })),
    [t, hours],
  );

  return (
    <BoxPlotChart
      series={series}
      yAxis={{ title: t("hours"), zero: true }}
      height={320}
      ariaLabel={t("deliveryAria")}
    />
  );
}
