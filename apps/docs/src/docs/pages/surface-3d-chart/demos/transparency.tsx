import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Surface3DChart,
  type Surface3DData,
  type Surface3DSeries,
} from "minerva-design/charts";

const SIZE = 60;
const axis = Float64Array.from(
  { length: SIZE },
  (_, i) => -2 + (4 * i) / (SIZE - 1),
);
const grid = (f: (x: number, y: number) => number): Surface3DData => {
  const z = new Float32Array(SIZE * SIZE);
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) z[r * SIZE + c] = f(axis[c]!, axis[r]!);
  }
  return { rows: SIZE, cols: SIZE, x: axis, y: axis, z };
};
// a bowl crossed by a tilted plane: transparency shows where they meet
const bowl = grid((x, y) => (x * x + y * y) / 2);
const plane = grid((x, y) => 1.4 + 0.6 * x - 0.3 * y);

export default function TransparencyDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const series = useMemo(
    (): Surface3DSeries[] => [
      { name: t("bowl"), data: bowl, colorBy: "series", opacity: 0.7 },
      {
        name: t("plane"),
        data: plane,
        colorBy: "series",
        opacity: 0.55,
        wireframe: { step: 6 },
      },
    ],
    [t],
  );

  return (
    <Surface3DChart
      series={series}
      xAxis={{ title: t("x") }}
      yAxis={{ title: t("y") }}
      zAxis={{ title: t("z") }}
      camera={{ azimuth: -30, elevation: 22 }}
      height={420}
      ariaLabel={t("transparencyAria")}
    />
  );
}
