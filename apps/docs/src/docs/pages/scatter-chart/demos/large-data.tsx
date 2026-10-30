import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScatterChart,
  type ChartRendererKind,
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

const PER_CLUSTER = 100_000;

export default function LargeDataDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);

  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(1);
    // Box-Muller: normally distributed values
    const gaussian = () =>
      Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
    const cluster = (name: string, cx: number, cy: number, spread: number) => {
      const x = new Float64Array(PER_CLUSTER);
      const y = new Float64Array(PER_CLUSTER);
      for (let i = 0; i < PER_CLUSTER; i++) {
        x[i] = cx + gaussian() * spread;
        y[i] = cy + gaussian() * spread;
      }
      return { name, data: { x, y }, pointSize: 3, opacity: 0.5 };
    };
    return [
      cluster(t("cluster", { name: "A" }), -2, -1, 1.2),
      cluster(t("cluster", { name: "B" }), 2.5, 1.5, 0.9),
    ];
  }, [t]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <ScatterChart
        series={series}
        onRendererChange={setRenderer}
        height={320}
        ariaLabel={t("clustersAria")}
      />
      <p role="status">
        {t("largeStatus", {
          points: new Intl.NumberFormat(i18n.language).format(PER_CLUSTER * 2),
          renderer: renderer ?? "…",
        })}
      </p>
    </div>
  );
}
