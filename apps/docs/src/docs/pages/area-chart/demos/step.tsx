import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const QUARTER_HOUR = 15 * 60 * 1000;
// local midnight, so the time axis reads 00:00 → 24:00 in every time zone
const START = new Date(2026, 5, 15).getTime();
const QUOTA = 14;

export default function StepDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  // Instances started by an autoscaler: the count holds until the next change
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(8);
    const data: [Date, number][] = [];
    let instances = 3;
    for (let i = 0; i < 96; i++) {
      const hour = i / 4;
      const load = 3 + 9 * Math.exp(-((hour - 14) ** 2) / 18) + random() * 2;
      const target = Math.min(QUOTA, Math.max(2, Math.round(load)));
      // scale out quickly, scale in one instance at a time
      if (target > instances) instances = target;
      else if (target < instances && random() < 0.5) instances -= 1;
      data.push([new Date(START + i * QUARTER_HOUR), instances]);
    }
    return [{ name: t("instances"), data }];
  }, [t]);
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }),
    [locale],
  );

  return (
    <AreaChart
      series={series}
      curve="step"
      xAxis={{ type: "time", format: (value) => time.format(value) }}
      yAxis={{ zero: true, max: QUOTA + 2 }}
      annotations={[
        {
          type: "line",
          axis: "y",
          value: QUOTA,
          dash: [4, 4],
          color: "var(--danger-color)",
          label: t("quota"),
        },
      ]}
      height={280}
      ariaLabel={t("instancesAria")}
    />
  );
}
