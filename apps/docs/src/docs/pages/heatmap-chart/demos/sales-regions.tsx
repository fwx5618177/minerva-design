import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

const regions = ["north", "south", "east", "west", "central"];
const quarters = [1, 2, 3, 4];
// revenue (M€) of 2025 and 2026 and gross margin (%) of 2026, per region
// (rows) and quarter (columns)
const revenue2025 = [
  [4.1, 4.4, 4.0, 5.2],
  [3.2, 3.6, 3.9, 4.4],
  [5.6, 5.1, 4.8, 6.0],
  [2.4, 2.6, 2.9, 3.3],
  [6.8, 7.0, 6.6, 7.9],
];
const revenue2026 = [
  [4.5, 4.9, 4.6, 5.9],
  [3.0, 3.3, 3.5, 4.0],
  [6.4, 6.0, 5.9, 7.3],
  [3.1, 3.5, 3.9, 4.6],
  [6.7, 6.8, 6.3, 7.4],
];
const margin2026 = [
  [31, 33, 30, 35],
  [24, 26, 27, 29],
  [38, 36, 35, 40],
  [19, 22, 25, 27],
  [34, 33, 31, 36],
];

type Metric = "revenue" | "growth" | "margin";

export default function SalesRegionsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const [metric, setMetric] = useState<Metric>("revenue");

  // each metric brings its own values, color scale and format
  const settings = useMemo(() => {
    const euros = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    const signed = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
      signDisplay: "exceptZero",
    });
    const percent = new Intl.NumberFormat(locale, { style: "percent" });
    const value = (r: number, q: number) => {
      const before = revenue2025[r]?.[q] ?? 0;
      const now = revenue2026[r]?.[q] ?? 0;
      if (metric === "growth") return now / before - 1;
      if (metric === "margin") return (margin2026[r]?.[q] ?? 0) / 100;
      return now;
    };
    const values = regions.flatMap((_, r) =>
      quarters.map((_, q) => value(r, q)),
    );
    if (metric === "growth") {
      // diverging around zero: red for a decline, primary for growth
      return {
        values,
        colorScale: "diverging" as const,
        valueRange: [-0.3, 0.3] as const,
        format: (v: number) => signed.format(v),
      };
    }
    if (metric === "margin") {
      return {
        values,
        colorScale: [
          "var(--danger-color)",
          "var(--warning-color)",
          "var(--success-color)",
        ],
        valueRange: [0.15, 0.4] as const,
        format: (v: number) => percent.format(v),
      };
    }
    return {
      values,
      colorScale: "sequential" as const,
      valueRange: undefined,
      format: (v: number) => euros.format(v * 1e6),
    };
  }, [metric, locale]);

  const regionNames = useMemo(
    () => regions.map((key) => t(`regions.${key}`)),
    [t],
  );
  const quarterNames = useMemo(
    () => quarters.map((n) => t("quarterN", { n })),
    [t],
  );
  const data = useMemo(
    (): HeatmapCell[] =>
      regions.flatMap((_, r) =>
        quarters.map((_, q) => ({
          x: quarterNames[q] ?? "",
          y: regionNames[r] ?? "",
          value: settings.values[r * quarters.length + q] ?? null,
        })),
      ),
    [settings, regionNames, quarterNames],
  );
  const best = settings.values.indexOf(Math.max(...settings.values));
  const worst = settings.values.indexOf(Math.min(...settings.values));
  const cellName = (i: number) =>
    t("regionQuarter", {
      region: regionNames[Math.floor(i / quarters.length)],
      quarter: quarterNames[i % quarters.length],
    });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadioGroup
        aria-label={t("metric")}
        direction="horizontal"
        value={metric}
        onChange={(value) => setMetric(value as Metric)}
      >
        <Radio value="revenue" label={t("salesMetrics.revenue")} />
        <Radio value="growth" label={t("salesMetrics.growth")} />
        <Radio value="margin" label={t("salesMetrics.margin")} />
      </RadioGroup>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("bestWorst", {
          best: cellName(best),
          bestValue: settings.format(settings.values[best] ?? 0),
          worst: cellName(worst),
          worstValue: settings.format(settings.values[worst] ?? 0),
        })}
      </output>
      <HeatmapChart
        data={data}
        xCategories={quarterNames}
        yCategories={[...regionNames].reverse()}
        colorScale={settings.colorScale}
        valueRange={settings.valueRange}
        name={t(`salesMetrics.${metric}`)}
        format={settings.format}
        radius={4}
        height={320}
        ariaLabel={t("salesAria")}
      />
    </div>
  );
}
