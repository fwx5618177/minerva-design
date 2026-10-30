import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Switch } from "minerva-design";
import {
  Scatter3DChart,
  type Chart3DProjection,
  type Scatter3DSeries,
} from "minerva-design/charts";

// A DNA double helix: two backbones and the base pairs between them
const TURNS = 4;
const STEPS = 10 * TURNS;
const strandA: [number, number, number][] = [];
const strandB: [number, number, number][] = [];
const pairs: [number, number, number][] = [];
for (let i = 0; i <= STEPS * 6; i++) {
  const t = i / 6;
  const angle = (t / 10) * Math.PI * 2;
  const z = t * 0.34;
  strandA.push([Math.cos(angle), Math.sin(angle), z]);
  strandB.push([Math.cos(angle + 2.4), Math.sin(angle + 2.4), z]);
  if (i % 6 === 0) {
    for (let k = 1; k < 8; k++) {
      const a = angle + (2.4 * k) / 8;
      const r = 1 - 0.25 * Math.sin((Math.PI * k) / 8);
      pairs.push([r * Math.cos(a), r * Math.sin(a), z]);
    }
  }
}

export default function AutoRotateDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [rotate, setRotate] = useState(true);
  const [projection, setProjection] =
    useState<Chart3DProjection>("perspective");

  const series = useMemo(
    (): Scatter3DSeries[] => [
      { name: t("backbone1"), data: strandA, pointSize: 9 },
      { name: t("backbone2"), data: strandB, pointSize: 9 },
      {
        name: t("basePairs"),
        data: pairs,
        pointSize: 5,
        color: "var(--text-secondary-color, #94a3b8)",
      },
    ],
    [t],
  );
  const camera = useMemo(
    () => ({ elevation: 12, zoom: 1.15, projection }),
    [projection],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <Switch
          size="small"
          checked={rotate}
          label={t("autoRotate")}
          onChange={setRotate}
        />
        <RadioGroup
          aria-label={t("projection")}
          direction="horizontal"
          size="small"
          value={projection}
          onChange={(value) => setProjection(value as Chart3DProjection)}
        >
          <Radio value="perspective" label={t("perspective")} />
          <Radio value="orthographic" label={t("orthographic")} />
        </RadioGroup>
      </div>
      <Scatter3DChart
        series={series}
        autoRotate={rotate ? 24 : false}
        aspect={[0.5, 0.5, 1]}
        box={false}
        camera={camera}
        height={420}
        ariaLabel={t("helixAria")}
      />
    </div>
  );
}
