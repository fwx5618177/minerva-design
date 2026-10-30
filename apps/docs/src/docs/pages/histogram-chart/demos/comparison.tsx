import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Chart,
  histogramSeries,
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

// Session duration (minutes) of an A/B test: the new onboarding keeps the
// users a little longer
const sample = (seed: number, scale: number) => {
  const random = mulberry32(seed);
  return Float64Array.from(
    { length: 8000 },
    () => -Math.log(1 - random()) * scale,
  );
};
const control = sample(1, 6);
const variant = sample(2, 7.4);

export default function ComparisonDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });

  // the same domain and bin count: both samples get the same bins, and the
  // bars of each bin sit side by side
  const series = useMemo((): ChartSeries[] => {
    const options = { domain: [0, 30] as const, bins: 15 };
    return [
      {
        ...histogramSeries(control, { ...options, name: t("control") }),
        id: "a",
      },
      {
        ...histogramSeries(variant, { ...options, name: t("variant") }),
        id: "b",
        color: "var(--chart-series-3, #f59e0b)",
      },
    ];
  }, [t]);

  return (
    <Chart
      series={series}
      xAxis={{ title: t("minutes") }}
      height={300}
      ariaLabel={t("abAria")}
    />
  );
}
