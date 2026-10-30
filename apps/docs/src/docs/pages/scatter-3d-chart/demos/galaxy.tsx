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

const COUNT = 1_000_000;

/** A two-armed spiral galaxy: a bulge, a thin disk and dust between the arms */
function galaxy() {
  const random = mulberry32(42);
  const normal = () =>
    Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
  const x = new Float32Array(COUNT);
  const y = new Float32Array(COUNT);
  const z = new Float32Array(COUNT);
  const distance = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    let px: number;
    let py: number;
    let pz: number;
    if (i % 7 === 0) {
      // bulge: a flattened ball of old stars
      px = normal() * 1.1;
      py = normal() * 1.1;
      pz = normal() * 0.6;
    } else {
      // disk: stars around two logarithmic spiral arms
      const r = Math.min(15, -Math.log(1 - random()) * 4 + 0.5);
      const arm = (i % 2) * Math.PI;
      const angle = arm + Math.log(r) * 2.4 + normal() * (0.32 + 0.6 / r);
      px = r * Math.cos(angle) + normal() * 0.25;
      py = r * Math.sin(angle) + normal() * 0.25;
      pz = normal() * 0.25 * Math.exp(-r / 8);
    }
    x[i] = px;
    y[i] = py;
    z[i] = pz;
    distance[i] = Math.hypot(px, py, pz);
  }
  return { x, y, z, value: distance };
}

export default function GalaxyDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  // ~60 ms: generated once, when the demo mounts
  const data = useMemo(() => galaxy(), []);
  const series = useMemo(
    (): Scatter3DSeries[] => [
      { name: t("stars"), data, pointSize: 1.25, opacity: 0.7 },
    ],
    [t, data],
  );

  return (
    <Scatter3DChart
      series={series}
      box={false}
      aspect={[1, 1, 0.3]}
      xAxis={{ min: -16, max: 16 }}
      yAxis={{ min: -16, max: 16 }}
      zAxis={{ min: -5, max: 5 }}
      camera={{ elevation: 38, zoom: 1.25 }}
      colorScale={["#fff4d6", "#ffb067", "#ef5da8", "#7c6cff", "#3a7bd5"]}
      valueRange={[0, 14]}
      colorBar={{
        title: t("distance"),
        format: (value) => t("kiloparsecs", { value }),
      }}
      height={460}
      ariaLabel={t("galaxyAria")}
    />
  );
}
