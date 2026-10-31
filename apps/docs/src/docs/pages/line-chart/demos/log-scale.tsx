import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  LineChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

/**
 * Bacteria (colony-forming units per mL) after `hour` hours: a lag phase,
 * then logistic growth from `start` up to the `capacity` of the medium
 */
const growth = (
  hour: number,
  start: number,
  capacity: number,
  rate: number,
  lag: number,
) =>
  hour <= lag
    ? start
    : capacity / (1 + (capacity / start - 1) * Math.exp(-rate * (hour - lag)));

const hours = Array.from({ length: 49 }, (_, i) => i / 2);
const strains = {
  wild: { capacity: 2e9, rate: 1.4, lag: 2 },
  mutant: { capacity: 6e8, rate: 0.9, lag: 3 },
  antibiotic: { capacity: 4e5, rate: 0.55, lag: 5 },
};
const START = 1e3;

export default function LogScaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const [log, setLog] = useState(true);

  const series = useMemo((): ChartSeries[] => {
    const names = {
      wild: t("strains.wild"),
      mutant: t("strains.mutant"),
      antibiotic: t("strains.antibiotic"),
    };
    return (Object.keys(strains) as (keyof typeof strains)[]).map((key) => {
      const { capacity, rate, lag } = strains[key];
      return {
        name: names[key],
        data: hours.map(
          (hour) => [hour, growth(hour, START, capacity, rate, lag)] as const,
        ),
      };
    });
  }, [t]);
  // "1E9", "1E3"...: the same notation on both scales
  const scientific = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        notation: "scientific",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const hourUnit = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "hour",
        unitDisplay: "narrow",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        x0: 3,
        x1: 12,
        color: "var(--primary-color)",
        opacity: 0.06,
        label: t("exponentialPhase"),
      },
    ],
    [t],
  );
  // doubling time of the wild type while it grows exponentially
  const doubling = (Math.LN2 / strains.wild.rate) * 60;
  const minutes = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "minute",
    unitDisplay: "long",
    maximumFractionDigits: 0,
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch checked={log} onChange={setLog} label={t("logScale")} />
      <LineChart
        series={series}
        annotations={annotations}
        curve="smooth"
        xAxis={{
          title: t("elapsed"),
          format: (value) => hourUnit.format(value),
        }}
        yAxis={{
          type: log ? "log" : "linear",
          title: t("cfu"),
          format: (value) => scientific.format(value),
        }}
        height={320}
        ariaLabel={t("growthAria")}
      />
      <p style={{ margin: 0, color: "var(--text-secondary-color)" }}>
        {log
          ? t("logNote", { minutes: minutes.format(doubling) })
          : t("linearNote")}
      </p>
    </div>
  );
}
