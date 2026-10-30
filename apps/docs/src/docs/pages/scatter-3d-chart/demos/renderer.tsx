import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  Scatter3DChart,
  type ChartRendererKind,
  type ChartRendererPreference,
  type Scatter3DSeries,
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

const PREFERENCES: ChartRendererPreference[] = [
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

// 200,000 points scattered around a (3, 7) torus knot
const COUNT = 200_000;
const random = mulberry32(9);
const x = new Float32Array(COUNT);
const y = new Float32Array(COUNT);
const z = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  const t = random() * Math.PI * 2;
  const r = 2 + Math.cos(7 * t);
  const spread = 0.18 * Math.sqrt(-2 * Math.log(1 - random()));
  const a = random() * Math.PI * 2;
  x[i] = r * Math.cos(3 * t) + spread * Math.cos(a);
  y[i] = r * Math.sin(3 * t) + spread * Math.sin(a);
  z[i] = Math.sin(7 * t) + spread * Math.cos(a + 1);
}

export default function RendererDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [preference, setPreference] = useState<ChartRendererPreference>("auto");
  const [actual, setActual] = useState<ChartRendererKind | null>(null);

  const series = useMemo(
    (): Scatter3DSeries[] => [
      { name: t("knot"), data: { x, y, z }, colorBy: "z", pointSize: 2 },
    ],
    [t],
  );

  let status = t("starting");
  if (actual) {
    const backend = t(`renderers.${actual}`);
    status =
      preference === "auto" || preference === actual
        ? t("rendererInUse", { backend })
        : t("rendererFallback", {
            requested: t(`renderers.${preference}`),
            backend,
          });
  }

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("renderer")}
        direction="horizontal"
        size="small"
        value={preference}
        onChange={(value) => {
          setPreference(value as ChartRendererPreference);
          setActual(null);
        }}
      >
        {PREFERENCES.map((kind) => (
          <Radio key={kind} value={kind} label={t(`renderers.${kind}`)} />
        ))}
      </RadioGroup>
      <Scatter3DChart
        series={series}
        renderer={preference}
        onRendererChange={setActual}
        colorScale="turbo"
        aspect={[1, 1, 0.45]}
        height={400}
        ariaLabel={t("knotAria")}
      />
      <p
        role="status"
        style={{ margin: 0, color: "var(--text-secondary-color)" }}
      >
        {status}
      </p>
    </div>
  );
}
