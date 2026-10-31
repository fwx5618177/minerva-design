import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Select, SelectItem } from "minerva-design";
import {
  Surface3DChart,
  type Chart3DColorMap,
  type Surface3DSeries,
} from "minerva-design/charts";

// Himmelblau's function: four global minima of equal depth, a classic
// test landscape for optimizers. The surface shows log10(1 + loss).
const SIZE = 90;
const RANGE = 5;
const AXIS = Float64Array.from(
  { length: SIZE },
  (_, i) => -RANGE + (2 * RANGE * i) / (SIZE - 1),
);
const loss = (x: number, y: number) =>
  (x * x + y - 11) ** 2 + (x + y * y - 7) ** 2;
const gradient = (x: number, y: number): [number, number] => [
  4 * x * (x * x + y - 11) + 2 * (x + y * y - 7),
  2 * (x * x + y - 11) + 4 * y * (x + y * y - 7),
];

const DATA = (() => {
  const z = new Float32Array(SIZE * SIZE);
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      z[r * SIZE + c] = Math.log10(1 + loss(AXIS[c]!, AXIS[r]!));
    }
  }
  return { rows: SIZE, cols: SIZE, x: AXIS, y: AXIS, z };
})();

const MINIMA: [number, number][] = [
  [3, 2],
  [-2.805, 3.131],
  [-3.779, -3.283],
  [3.584, -1.848],
];

/** Plain gradient descent from (x, y): the minimum it ends in and the steps */
const descend = (x0: number, y0: number) => {
  let [x, y] = [x0, y0];
  let steps = 0;
  for (; steps < 5000; steps++) {
    const [gx, gy] = gradient(x, y);
    if (Math.hypot(gx, gy) < 1e-4) break;
    // a small step with clipping keeps the descent stable on the steep walls
    const scale = Math.min(0.01, 0.5 / Math.hypot(gx, gy));
    x -= scale * gx;
    y -= scale * gy;
  }
  const minimum = MINIMA.reduce(
    (best, m, i) =>
      Math.hypot(m[0] - x, m[1] - y) <
      Math.hypot(MINIMA[best]![0] - x, MINIMA[best]![1] - y)
        ? i
        : best,
    0,
  );
  return { minimum, steps };
};

const COLOR_MAPS: Chart3DColorMap[] = [
  "viridis",
  "plasma",
  "magma",
  "cividis",
  "turbo",
];

export default function LossLandscapeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [colorMap, setColorMap] = useState<Chart3DColorMap>("viridis");
  const [start, setStart] = useState<[number, number] | null>(null);
  const formats = useMemo(
    () => ({
      coordinate: new Intl.NumberFormat(i18n.language, {
        maximumFractionDigits: 2,
      }),
      loss: new Intl.NumberFormat(i18n.language, {
        maximumSignificantDigits: 3,
      }),
      integer: new Intl.NumberFormat(i18n.language),
    }),
    [i18n.language],
  );
  const series = useMemo(
    (): Surface3DSeries[] => [
      {
        name: t("loss"),
        data: DATA,
        contours: { count: 14, floor: true },
        format: (value) => formats.loss.format(10 ** value - 1),
      },
    ],
    [t, formats],
  );
  const result = useMemo(() => (start ? descend(...start) : null), [start]);
  const point = (x: number, y: number) =>
    t("point", {
      x: formats.coordinate.format(x),
      y: formats.coordinate.format(y),
    });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} align="center">
        <span>{t("colorMap")}</span>
        <Select
          aria-label={t("colorMap")}
          size="small"
          value={colorMap}
          onChange={(value) => setColorMap(value as Chart3DColorMap)}
        >
          {COLOR_MAPS.map((id) => (
            <SelectItem key={id} value={id}>
              {t(`colorMaps.${id}`)}
            </SelectItem>
          ))}
        </Select>
      </HStack>
      <Surface3DChart
        series={series}
        xAxis={{ title: t("weight1") }}
        yAxis={{ title: t("weight2") }}
        zAxis={{ title: t("logLoss") }}
        colorScale={colorMap}
        colorBar={{ title: t("logLoss") }}
        aspect={[1, 1, 0.55]}
        camera={{ azimuth: 20, elevation: 40 }}
        height={460}
        ariaLabel={t("lossAria")}
        onPointClick={(event) => setStart([event.x, event.y])}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {start && result
          ? t("descentResult", {
              start: point(...start),
              loss: formats.loss.format(loss(...start)),
              steps: formats.integer.format(result.steps),
              n: result.minimum + 1,
              minimum: point(...MINIMA[result.minimum]!),
            })
          : t("lossHint")}
      </output>
    </div>
  );
}
