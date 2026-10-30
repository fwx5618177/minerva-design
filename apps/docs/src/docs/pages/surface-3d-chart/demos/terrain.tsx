import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Surface3DChart, type Surface3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A 20 × 20 km island: fractal value noise (6 octaves) under a radial
// falloff, the sea clamped at 0 m
const SIZE = 180;
const KM = 20;
const random = mulberry32(2026);
const LATTICE = 64;
const lattice = Float64Array.from({ length: LATTICE * LATTICE }, () =>
  random(),
);
const smooth = (t: number) => t * t * (3 - 2 * t);
const noise = (x: number, y: number) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const fx = smooth(x - xi);
  const fy = smooth(y - yi);
  const at = (i: number, j: number) =>
    lattice[((j & (LATTICE - 1)) * LATTICE + (i & (LATTICE - 1))) | 0]!;
  const top = at(xi, yi) + (at(xi + 1, yi) - at(xi, yi)) * fx;
  const bottom = at(xi, yi + 1) + (at(xi + 1, yi + 1) - at(xi, yi + 1)) * fx;
  return top + (bottom - top) * fy;
};
const coords = Float64Array.from(
  { length: SIZE },
  (_, i) => Math.round(((i * KM) / (SIZE - 1)) * 100) / 100,
);
const heights = new Float32Array(SIZE * SIZE);
for (let r = 0; r < SIZE; r++) {
  for (let c = 0; c < SIZE; c++) {
    let h = 0;
    let amplitude = 1;
    let frequency = 5 / SIZE;
    for (let octave = 0; octave < 6; octave++) {
      h += noise(c * frequency, r * frequency) * amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }
    const dx = c / (SIZE - 1) - 0.5;
    const dy = r / (SIZE - 1) - 0.5;
    const falloff = 1 - Math.min(1, Math.hypot(dx, dy) * 2.1);
    heights[r * SIZE + c] = Math.max(0, (h * 0.9 - 1.0 + falloff * 1.3) * 1400);
  }
}
const island = { rows: SIZE, cols: SIZE, x: coords, y: coords, z: heights };

export default function TerrainDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const series = useMemo(
    (): Surface3DSeries[] => [{ name: t("island"), data: island }],
    [t],
  );
  const km = (value: number) => t("km", { value });
  const meters = (value: number) => t("meters", { value: Math.round(value) });

  return (
    <Surface3DChart
      series={series}
      aspect={[1, 1, 0.28]}
      colorScale="terrain"
      xAxis={{ title: t("east"), format: km }}
      yAxis={{ title: t("north"), format: km }}
      zAxis={{ title: t("elevation"), format: meters }}
      colorBar={{ title: t("elevation"), format: meters }}
      lighting={{ ambient: 0.35, diffuse: 0.8, specular: 0.08 }}
      camera={{ azimuth: 30, elevation: 38 }}
      height={440}
      ariaLabel={t("terrainAria")}
    />
  );
}
