import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  Scatter3DChart,
  type Chart3DCameraState,
  type Chart3DHandle,
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

// A "Swiss roll": a sheet rolled up in 3D, colored by its position along
// the roll (the classic test set of manifold learning)
const COUNT = 4000;
const random = mulberry32(21);
const x = new Float64Array(COUNT);
const y = new Float64Array(COUNT);
const z = new Float64Array(COUNT);
const along = new Float64Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  const t = 1.5 * Math.PI * (1 + 2 * random());
  x[i] = t * Math.cos(t);
  y[i] = random() * 21;
  z[i] = t * Math.sin(t);
  along[i] = t;
}

const VIEWS = {
  front: { azimuth: 0, elevation: 0 },
  side: { azimuth: 90, elevation: 0 },
  top: { azimuth: 0, elevation: 89 },
} as const;

export default function CameraDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const chart = useRef<Chart3DHandle>(null);
  const [camera, setCamera] = useState<Chart3DCameraState | null>(null);

  const series = useMemo(
    (): Scatter3DSeries[] => [
      {
        name: t("roll"),
        data: { x, y, z, value: along },
        pointSize: 4,
        format: (value) => value.toFixed(2),
      },
    ],
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {(Object.keys(VIEWS) as (keyof typeof VIEWS)[]).map((view) => (
          <Button
            key={view}
            size="small"
            color="neutral"
            variant="outline"
            onClick={() =>
              chart.current?.setCamera({ ...VIEWS[view], zoom: 1, pan: [0, 0] })
            }
          >
            {t(`views.${view}`)}
          </Button>
        ))}
        <Button
          size="small"
          color="neutral"
          variant="outline"
          onClick={() => chart.current?.resetCamera()}
        >
          {t("views.reset")}
        </Button>
      </div>
      <Scatter3DChart
        ref={chart}
        series={series}
        colorScale="spectral"
        colorBar={{ title: t("position") }}
        aspect={[1, 1, 1]}
        onCameraChange={setCamera}
        height={420}
        ariaLabel={t("rollAria")}
      />
      <p
        aria-live="polite"
        style={{ margin: 0, color: "var(--text-secondary-color)" }}
      >
        {camera
          ? t("cameraState", {
              azimuth: Math.round(camera.azimuth),
              elevation: Math.round(camera.elevation),
              zoom: camera.zoom.toFixed(2),
            })
          : t("cameraHint")}
      </p>
    </div>
  );
}
