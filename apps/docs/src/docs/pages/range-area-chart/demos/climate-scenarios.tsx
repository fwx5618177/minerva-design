import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  RangeAreaChart,
  type ChartAnnotation,
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

// Global warming above the 1850-1900 average, in °C: an illustrative
// observed record, then two emission scenarios with their likely ranges
const LAST_OBSERVED = 2024;
const random = mulberry32(1850);
const observed = Array.from({ length: LAST_OBSERVED - 1950 + 1 }, (_, i) => {
  const year = 1950 + i;
  const trend = 0.28 + 0.97 * (i / (LAST_OBSERVED - 1950)) ** 1.9;
  return [year, trend + (random() - 0.5) * 0.2] as const;
});
const now = 0.28 + 0.97;

// median and likely range of a scenario: a curve from today's warming to its
// level in 2100, with an uncertainty growing with the horizon
const scenario = (end: number, bend: number, spread: number) =>
  Array.from({ length: (2100 - LAST_OBSERVED) / 4 + 1 }, (_, k) => {
    const year = LAST_OBSERVED + k * 4;
    const f = (year - LAST_OBSERVED) / (2100 - LAST_OBSERVED);
    const median = now + (end - now) * (1 - (1 - f) ** bend);
    const half = spread * f ** 0.8;
    return { year, median, low: median - half * 0.8, high: median + half };
  });
const low = scenario(1.8, 3.2, 0.55);
const high = scenario(4.4, 1.15, 1.25);
const crossing = (path: typeof low, level: number) =>
  path.find((p) => p.median >= level)?.year;

export default function ClimateScenariosDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const band = (path: typeof low) =>
      path.map((p) => ({ x: p.year, y0: p.low, y: p.high }));
    const median = (path: typeof low) =>
      path.map((p) => [p.year, p.median] as const);
    return [
      {
        id: "ssp585-range",
        name: t("ssp585Range"),
        color: "var(--danger-color)",
        opacity: 0.18,
        lineWidth: 0,
        data: band(high),
      },
      {
        id: "ssp126-range",
        name: t("ssp126Range"),
        color: "var(--chart-series-5, #0ea5e9)",
        opacity: 0.22,
        lineWidth: 0,
        data: band(low),
      },
      {
        id: "ssp585",
        name: t("ssp585"),
        type: "line",
        color: "var(--danger-color)",
        data: median(high),
      },
      {
        id: "ssp126",
        name: t("ssp126"),
        type: "line",
        color: "var(--chart-series-5, #0ea5e9)",
        data: median(low),
      },
      {
        id: "observed",
        name: t("observed"),
        type: "line",
        curve: "linear",
        color: "var(--text-color, #1f2937)",
        lineWidth: 1.25,
        data: observed,
      },
    ];
  }, [t]);
  const formats = useMemo(
    () => ({
      degrees: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
      year: new Intl.NumberFormat(locale, { useGrouping: false }),
    }),
    [locale],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] =>
      [1.5, 2].map((level) => ({
        type: "line",
        axis: "y",
        value: level,
        dash: [4, 4],
        color: "var(--warning-color)",
        label: t("parisLimit", { value: formats.degrees.format(level) }),
      })),
    [t, formats],
  );

  const year = (value: number | undefined) =>
    value === undefined ? "–" : formats.year.format(value);
  const peak = Math.max(...low.map((p) => p.median));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RangeAreaChart
        series={series}
        annotations={annotations}
        tooltip={{ mode: "axis" }}
        xAxis={{ format: (x) => formats.year.format(x) }}
        yAxis={{
          title: t("warming"),
          format: (y) => formats.degrees.format(y),
        }}
        height={340}
        ariaLabel={t("climateAria")}
      />
      <p style={{ margin: 0, color: "var(--text-secondary-color)" }}>
        {t("crossings", {
          lowLimit: formats.degrees.format(1.5),
          low: year(crossing(low, 1.5)),
          peak: formats.degrees.format(peak),
          highLimit: formats.degrees.format(2),
          high: year(crossing(high, 2)),
        })}
      </p>
    </div>
  );
}
