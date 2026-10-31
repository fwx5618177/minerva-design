import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ConfigProvider,
  HStack,
  Radio,
  RadioGroup,
  Switch,
} from "minerva-design";
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

type ColorMode = "height" | "intensity";

// A 60 m street scanned by a lidar: road with lane markings, sidewalks,
// facades with windows, trees, parked cars and lamp posts (~13k returns).
// Intensity is the strength of the return: markings and metal reflect most.
const scan = () => {
  const random = mulberry32(42);
  const xs: number[] = [];
  const ys: number[] = [];
  const zs: number[] = [];
  const intensity: number[] = [];
  const add = (x: number, y: number, z: number, i: number) => {
    xs.push(x);
    ys.push(y);
    zs.push(z + (random() - 0.5) * 0.04);
    intensity.push(Math.min(1, Math.max(0, i + (random() - 0.5) * 0.1)));
  };
  // ground: road, lane markings and raised sidewalks
  for (let n = 0; n < 5200; n++) {
    const x = random() * 60;
    const y = -7 + random() * 14;
    const sidewalk = Math.abs(y) > 4;
    const marking = Math.abs(y) < 0.12 && x % 6 < 3;
    add(x, y, sidewalk ? 0.15 : 0, marking ? 0.9 : sidewalk ? 0.35 : 0.15);
  }
  // facades on both sides, glass windows return little light
  for (let n = 0; n < 4200; n++) {
    const x = random() * 60;
    const z = random() * 12;
    const side = n % 2 ? 1 : -1;
    const window = x % 4 > 1 && x % 4 < 3 && z % 3.5 > 1 && z % 3.5 < 2.6;
    add(x, side * (8 + random() * 0.08), z, window ? 0.08 : 0.45);
  }
  // trees: trunk and a round canopy
  for (let tree = 0; tree < 6; tree++) {
    const cx = 6 + (tree % 3) * 20 + (tree > 2 ? 10 : 0);
    const cy = tree > 2 ? 5.5 : -5.5;
    for (let n = 0; n < 60; n++) {
      const a = random() * Math.PI * 2;
      add(cx + Math.cos(a) * 0.2, cy + Math.sin(a) * 0.2, random() * 2.6, 0.4);
    }
    for (let n = 0; n < 320; n++) {
      const a = random() * Math.PI * 2;
      const b = Math.acos(2 * random() - 1);
      const r = 1.6 + random() * 0.6;
      add(
        cx + r * Math.sin(b) * Math.cos(a),
        cy + r * Math.sin(b) * Math.sin(a),
        4 + r * 0.8 * Math.cos(b),
        0.55,
      );
    }
  }
  // parked cars: the visible top and sides of a box
  for (let car = 0; car < 5; car++) {
    const cx = 4 + car * 12 + (car % 2) * 3;
    const cy = car % 2 ? 3 : -3;
    for (let n = 0; n < 300; n++) {
      const u = random();
      const v = random();
      const face = n % 3;
      const x = cx + (u - 0.5) * 4.4;
      const y = face === 1 ? cy + (car % 2 ? -0.9 : 0.9) : cy + (v - 0.5) * 1.8;
      const z = face === 0 ? 1.45 : 0.3 + v * 1.1;
      add(x, y, z, 0.7);
    }
  }
  // lamp posts
  for (let post = 0; post < 4; post++) {
    for (let n = 0; n < 80; n++) {
      add(10 + post * 14, post % 2 ? 6.5 : -6.5, random() * 7, 0.8);
    }
  }
  return {
    x: Float32Array.from(xs),
    y: Float32Array.from(ys),
    z: Float32Array.from(zs),
    intensity: Float32Array.from(intensity),
  };
};
const CLOUD = scan();

export default function LidarDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [dark, setDark] = useState(true);
  const [mode, setMode] = useState<ColorMode>("height");
  const [hovered, setHovered] = useState<number | null>(null);
  const formats = useMemo(
    () => ({
      meters: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "meter",
        maximumFractionDigits: 2,
      }),
      percent: new Intl.NumberFormat(i18n.language, { style: "percent" }),
      integer: new Intl.NumberFormat(i18n.language),
    }),
    [i18n.language],
  );

  const series = useMemo(
    (): Scatter3DSeries[] => [
      {
        name: t("lidarReturns"),
        data: {
          x: CLOUD.x,
          y: CLOUD.y,
          z: CLOUD.z,
          value: mode === "height" ? CLOUD.z : CLOUD.intensity,
        },
        colorBy: "value",
        pointStyle: "disc",
        pointSize: 2.5,
      },
    ],
    [t, mode],
  );

  return (
    <ConfigProvider theme={dark ? "dark" : "light"}>
      <div
        style={{
          display: "grid",
          gap: 12,
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "1px solid var(--border-color)",
          background: "var(--background-color)",
          color: "var(--text-color)",
        }}
      >
        <HStack gap={16} wrap align="center">
          <RadioGroup
            aria-label={t("lidarColor")}
            direction="horizontal"
            value={mode}
            onChange={(value) => setMode(value as ColorMode)}
          >
            <Radio value="height" label={t("lidarModes.height")} />
            <Radio value="intensity" label={t("lidarModes.intensity")} />
          </RadioGroup>
          <Switch
            size="small"
            checked={dark}
            onChange={setDark}
            label={t("darkTheme")}
          />
        </HStack>
        <Scatter3DChart
          // the chart reads the theme of its scope when it is created
          key={dark ? "dark" : "light"}
          series={series}
          aspect={[60, 16, 12]}
          xAxis={{ title: t("lengthM") }}
          yAxis={{ title: t("widthM") }}
          zAxis={{ title: t("heightM") }}
          colorScale={mode === "height" ? "turbo" : "inferno"}
          colorBar={{
            title: t(`lidarModes.${mode}`),
            format: (value) =>
              mode === "height"
                ? formats.meters.format(value)
                : formats.percent.format(value),
          }}
          tooltip={false}
          camera={{ azimuth: -30, elevation: 30, zoom: 1.1 }}
          height={440}
          ariaLabel={t("lidarAria")}
          onHover={(event) => setHovered(event ? event.index : null)}
        />
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)" }}
        >
          {hovered === null
            ? t("lidarSummary", {
                points: formats.integer.format(CLOUD.x.length),
              })
            : t("lidarHover", {
                height: formats.meters.format(CLOUD.z[hovered]!),
                intensity: formats.percent.format(CLOUD.intensity[hovered]!),
              })}
        </output>
      </div>
    </ConfigProvider>
  );
}
