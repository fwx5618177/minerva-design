import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Line3DChart, type Line3DSeries } from "minerva-design/charts";

// The Lorenz attractor (σ = 10, ρ = 28, β = 8/3), integrated with RK4
const STEPS = 12_000;
const DT = 0.006;
const x = new Float64Array(STEPS);
const y = new Float64Array(STEPS);
const z = new Float64Array(STEPS);
const time = new Float64Array(STEPS);
const derivative = (p: readonly [number, number, number]) =>
  [
    10 * (p[1] - p[0]),
    p[0] * (28 - p[2]) - p[1],
    p[0] * p[1] - (8 / 3) * p[2],
  ] as const;
let p: [number, number, number] = [1, 1, 1];
for (let i = 0; i < STEPS; i++) {
  const k1 = derivative(p);
  const k2 = derivative([
    p[0] + (k1[0] * DT) / 2,
    p[1] + (k1[1] * DT) / 2,
    p[2] + (k1[2] * DT) / 2,
  ]);
  const k3 = derivative([
    p[0] + (k2[0] * DT) / 2,
    p[1] + (k2[1] * DT) / 2,
    p[2] + (k2[2] * DT) / 2,
  ]);
  const k4 = derivative([
    p[0] + k3[0] * DT,
    p[1] + k3[1] * DT,
    p[2] + k3[2] * DT,
  ]);
  p = [
    p[0] + ((k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]) * DT) / 6,
    p[1] + ((k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]) * DT) / 6,
    p[2] + ((k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]) * DT) / 6,
  ];
  x[i] = p[0];
  y[i] = p[1];
  z[i] = p[2];
  time[i] = i * DT;
}

export default function TrajectoryDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });

  const series = useMemo(
    (): Line3DSeries[] => [
      {
        name: t("trajectory"),
        data: { x, y, z, value: time },
        lineWidth: 1.5,
        format: (value) => t("seconds", { value: value.toFixed(2) }),
      },
    ],
    [t],
  );

  return (
    <Line3DChart
      series={series}
      colorScale="plasma"
      colorBar={{
        title: t("time"),
        format: (value) => t("seconds", { value }),
      }}
      camera={{ azimuth: 20, elevation: 18 }}
      height={440}
      ariaLabel={t("lorenzAria")}
    />
  );
}
