import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LineChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function AreaDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(3);
    const data: number[] = [];
    let used = 120;
    for (let day = 0; day < 60; day++) {
      used += random() * 12;
      data.push(Math.round(used));
    }
    return [{ name: t("storage"), data, opacity: 0.25 }];
  }, [t]);
  // "512 GB", "512 Go", ...
  const gigabytes = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "gigabyte" }),
    [locale],
  );

  return (
    <LineChart
      series={series}
      area
      xAxis={{ title: t("day") }}
      yAxis={{ zero: true, format: (value) => gigabytes.format(value) }}
      height={280}
      ariaLabel={t("storageAria")}
    />
  );
}
