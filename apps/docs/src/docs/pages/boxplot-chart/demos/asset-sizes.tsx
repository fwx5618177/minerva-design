import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
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

const BUDGET = 500; // kB per file

// Size (kB) of the files a website serves, by type: from 1 kB icons to
// 40 MB videos, log-normal in every type
const types = [
  ["styles", 18, 0.9],
  ["scripts", 45, 1.1],
  ["fonts", 60, 0.5],
  ["images", 140, 1.2],
  ["videos", 6000, 0.9],
] as const;
const sizes = types.map(([, median, spread], i) => {
  const random = mulberry32(300 + i);
  return Float64Array.from({ length: 250 }, () => {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    return median * Math.exp(spread * z);
  });
});

export default function AssetSizesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const [log, setLog] = useState(true);

  // kilobytes below 1,000 kB, megabytes above
  const bytes = useMemo(() => {
    const kb = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "kilobyte",
      maximumSignificantDigits: 3,
    });
    const mb = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "megabyte",
      maximumSignificantDigits: 3,
    });
    return (value: number) =>
      value >= 1000 ? mb.format(value / 1000) : kb.format(value);
  }, [locale]);
  const groups = useMemo(
    (): BoxplotGroup[] =>
      types.map(([key], i) => ({
        x: t(`assetTypes.${key}`),
        values: sizes[i] ?? [],
      })),
    [t],
  );
  const overBudget = useMemo(
    () =>
      sizes.flatMap((values) => [...values]).filter((v) => v > BUDGET).length,
    [],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Switch checked={log} onChange={setLog} label={t("logScale")} />
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)" }}
        >
          {t("overBudget", {
            value: new Intl.NumberFormat(locale).format(overBudget),
            budget: bytes(BUDGET),
          })}
        </output>
      </div>
      <BoxPlotChart
        groups={groups}
        name={t("fileSize")}
        // on a linear axis the small files are crushed against zero
        yAxis={
          log
            ? { type: "log", min: 0.5, max: 100_000, format: bytes }
            : { min: 0, format: bytes }
        }
        annotations={[
          {
            type: "line",
            axis: "y",
            value: BUDGET,
            color: "var(--warning-color)",
            dash: [4, 4],
            label: t("budget"),
          },
        ]}
        height={340}
        ariaLabel={t("assetsAria")}
      />
    </div>
  );
}
