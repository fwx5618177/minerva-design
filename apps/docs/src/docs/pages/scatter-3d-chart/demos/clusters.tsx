import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Three flower species measured on three features (an iris-like data set):
// mean and spread of the sepal length, sepal width and petal length, in cm
const SPECIES = [
  { key: "setosa", mean: [5.0, 3.4, 1.5], spread: [0.35, 0.38, 0.17] },
  { key: "versicolor", mean: [5.9, 2.8, 4.3], spread: [0.52, 0.31, 0.47] },
  { key: "virginica", mean: [6.6, 3.0, 5.6], spread: [0.64, 0.32, 0.55] },
] as const;

const random = mulberry32(11);
// Box-Muller transform: normally distributed samples
const normal = () =>
  Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
const round = (value: number) => Math.round(value * 10) / 10;
const flowers = SPECIES.map(({ mean, spread }) =>
  Array.from(
    { length: 60 },
    () =>
      [
        round(mean[0] + normal() * spread[0]),
        round(mean[1] + normal() * spread[1]),
        round(mean[2] + normal() * spread[2]),
      ] as const,
  ),
);

export default function ClustersDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });

  const series = useMemo(
    (): Scatter3DSeries[] =>
      SPECIES.map(({ key }, i) => ({
        name: t(`species.${key}`),
        data: flowers[i] ?? [],
        pointSize: 8,
      })),
    [t],
  );

  return (
    <Scatter3DChart
      series={series}
      xAxis={{ title: t("sepalLength") }}
      yAxis={{ title: t("sepalWidth") }}
      zAxis={{ title: t("petalLength") }}
      height={420}
      ariaLabel={t("clustersAria")}
    />
  );
}
