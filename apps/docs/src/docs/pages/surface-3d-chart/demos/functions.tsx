import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  Surface3DChart,
  type Surface3DData,
  type Surface3DSeries,
} from "minerva-design/charts";

/** Samples z = f(x, y) on a size × size grid over [-extent, extent]² */
function sample(
  extent: number,
  size: number,
  f: (x: number, y: number) => number,
): Surface3DData {
  const axis = Float64Array.from(
    { length: size },
    (_, i) => -extent + (2 * extent * i) / (size - 1),
  );
  const z = new Float32Array(size * size);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) z[r * size + c] = f(axis[c]!, axis[r]!);
  }
  return { rows: size, cols: size, x: axis, y: axis, z };
}

const FUNCTIONS = {
  // sin(r) / r: ripples fading away from a central peak
  sinc: sample(10, 90, (x, y) => {
    const r = Math.hypot(x, y);
    return r === 0 ? 1 : Math.sin(r) / r;
  }),
  // MATLAB's peaks: three peaks and two pits
  peaks: sample(
    3,
    90,
    (x, y) =>
      3 * (1 - x) ** 2 * Math.exp(-(x ** 2) - (y + 1) ** 2) -
      10 * (x / 5 - x ** 3 - y ** 5) * Math.exp(-(x ** 2) - y ** 2) -
      Math.exp(-((x + 1) ** 2) - y ** 2) / 3,
  ),
  // a hyperbolic paraboloid
  saddle: sample(1, 60, (x, y) => x * x - y * y),
};
type FunctionKey = keyof typeof FUNCTIONS;

export default function FunctionsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [key, setKey] = useState<FunctionKey>("sinc");
  const series = useMemo(
    (): Surface3DSeries[] => [
      { name: t(`functions.${key}`), data: FUNCTIONS[key] },
    ],
    [t, key],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("function")}
        direction="horizontal"
        size="small"
        value={key}
        onChange={(value) => setKey(value as FunctionKey)}
      >
        {(Object.keys(FUNCTIONS) as FunctionKey[]).map((name) => (
          <Radio key={name} value={name} label={t(`functions.${name}`)} />
        ))}
      </RadioGroup>
      <Surface3DChart
        series={series}
        xAxis={{ title: t("x") }}
        yAxis={{ title: t("y") }}
        zAxis={{ title: t("z") }}
        height={420}
        ariaLabel={t("functionsAria", { name: t(`functions.${key}`) })}
      />
    </div>
  );
}
