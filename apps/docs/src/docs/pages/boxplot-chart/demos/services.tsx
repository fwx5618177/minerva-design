import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BoxPlotChart, type BoxplotGroup } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 2,000 response times (ms) of each service over the last hour
const services = [
  ["gateway", 18, 0.35],
  ["auth", 32, 0.3],
  ["search", 95, 0.45],
  ["checkout", 140, 0.38],
  ["recommendations", 210, 0.5],
  ["images", 60, 0.6],
] as const;
const samples = services.map(([, median, spread], s) => {
  const random = mulberry32(100 + s);
  return Float64Array.from({ length: 2000 }, () => {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    return median * Math.exp(spread * z);
  });
});

export default function ServicesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const ms = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  // raw samples: the quartiles, whiskers (1.5 IQR) and outliers are computed
  const groups = useMemo(
    (): BoxplotGroup[] =>
      services.map(([key], i) => ({
        x: t(`services.${key}`),
        values: samples[i] ?? [],
      })),
    [t],
  );

  return (
    <BoxPlotChart
      groups={groups}
      name={t("responseTime")}
      yAxis={{ format: ms }}
      tooltip={{
        labels: {
          max: t("stats.max"),
          q3: t("stats.q3"),
          median: t("stats.median"),
          q1: t("stats.q1"),
          min: t("stats.min"),
          outliers: t("stats.outliers"),
        },
      }}
      height={340}
      ariaLabel={t("servicesAria")}
    />
  );
}
