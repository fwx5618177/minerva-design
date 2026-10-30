import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { Surface3DChart, type Surface3DSeries } from "minerva-design/charts";

// MATLAB's peaks function on a 120 × 120 grid
const SIZE = 120;
const axis = Float64Array.from(
  { length: SIZE },
  (_, i) => -3 + (6 * i) / (SIZE - 1),
);
const z = new Float32Array(SIZE * SIZE);
for (let r = 0; r < SIZE; r++) {
  for (let c = 0; c < SIZE; c++) {
    const x = axis[c]!;
    const y = axis[r]!;
    z[r * SIZE + c] =
      3 * (1 - x) ** 2 * Math.exp(-(x ** 2) - (y + 1) ** 2) -
      10 * (x / 5 - x ** 3 - y ** 5) * Math.exp(-(x ** 2) - y ** 2) -
      Math.exp(-((x + 1) ** 2) - y ** 2) / 3;
  }
}
const peaks = { rows: SIZE, cols: SIZE, x: axis, y: axis, z };

export default function WireframeContoursDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [fill, setFill] = useState(true);
  const [wireframe, setWireframe] = useState(true);
  const [floor, setFloor] = useState(true);
  const [onSurface, setOnSurface] = useState(false);

  const series = useMemo(
    (): Surface3DSeries[] => [
      {
        name: t("functions.peaks"),
        data: peaks,
        fill,
        opacity: 0.92,
        wireframe: wireframe && { step: 4 },
        contours: (floor || onSurface) && {
          count: 14,
          floor,
          surface: onSurface,
          width: 1.25,
        },
      },
    ],
    [t, fill, wireframe, floor, onSurface],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <Switch
          size="small"
          checked={fill}
          label={t("fill")}
          onChange={setFill}
        />
        <Switch
          size="small"
          checked={wireframe}
          label={t("wireframe")}
          onChange={setWireframe}
        />
        <Switch
          size="small"
          checked={floor}
          label={t("floorContours")}
          onChange={setFloor}
        />
        <Switch
          size="small"
          checked={onSurface}
          label={t("surfaceContours")}
          onChange={setOnSurface}
        />
      </div>
      <Surface3DChart
        series={series}
        colorScale="viridis"
        camera={{ azimuth: -50, elevation: 30 }}
        height={440}
        ariaLabel={t("contoursAria")}
      />
    </div>
  );
}
