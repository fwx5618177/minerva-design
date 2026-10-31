import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Switch } from "minerva-design";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

const EARTH_RADIUS = 6371; // km
const MU = 398600; // km³/s², gravitational parameter of the Earth
const STEP_SECONDS = 60; // simulated time per tick
const EPOCH = Date.UTC(2026, 9, 31);

interface Shell {
  id: "broadband" | "imaging" | "navigation" | "geostationary";
  altitude: number; // km
  inclination: number; // degrees
  planes: number;
  perPlane: number;
}

const SHELLS: Shell[] = [
  {
    id: "broadband",
    altitude: 550,
    inclination: 53,
    planes: 6,
    perPlane: 12,
  },
  { id: "imaging", altitude: 700, inclination: 97.6, planes: 4, perPlane: 8 },
  {
    id: "navigation",
    altitude: 20200,
    inclination: 55,
    planes: 6,
    perPlane: 4,
  },
  {
    id: "geostationary",
    altitude: 35786,
    inclination: 0,
    planes: 1,
    perPlane: 12,
  },
];

const radiusOf = (shell: Shell) => EARTH_RADIUS + shell.altitude;
const motionOf = (shell: Shell) => Math.sqrt(MU / radiusOf(shell) ** 3); // rad/s

/** Positions (thousands of km) of the satellites of a shell at time `seconds` */
const positions = (shell: Shell, seconds: number) => {
  const count = shell.planes * shell.perPlane;
  const x = new Float32Array(count);
  const y = new Float32Array(count);
  const z = new Float32Array(count);
  const r = radiusOf(shell) / 1000;
  const inc = (shell.inclination * Math.PI) / 180;
  for (let p = 0; p < shell.planes; p++) {
    const node = (2 * Math.PI * p) / shell.planes; // right ascension of the plane
    for (let s = 0; s < shell.perPlane; s++) {
      // neighboring planes are phased so the satellites do not line up
      const u =
        (2 * Math.PI * (s + p / shell.planes)) / shell.perPlane +
        motionOf(shell) * seconds;
      const i = p * shell.perPlane + s;
      x[i] =
        r *
        (Math.cos(node) * Math.cos(u) -
          Math.sin(node) * Math.sin(u) * Math.cos(inc));
      y[i] =
        r *
        (Math.sin(node) * Math.cos(u) +
          Math.cos(node) * Math.sin(u) * Math.cos(inc));
      z[i] = r * Math.sin(u) * Math.sin(inc);
    }
  }
  return { x, y, z };
};

// the Earth: 500 points spread evenly on a sphere (Fibonacci lattice)
const EARTH = (() => {
  const count = 500;
  const r = EARTH_RADIUS / 1000;
  const x = new Float32Array(count);
  const y = new Float32Array(count);
  const z = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const h = 1 - (2 * (i + 0.5)) / count;
    const a = i * Math.PI * (3 - Math.sqrt(5));
    const ring = Math.sqrt(1 - h * h);
    x[i] = r * ring * Math.cos(a);
    y[i] = r * ring * Math.sin(a);
    z[i] = r * h;
  }
  return { x, y, z };
})();

const LIMIT = 44; // thousands of km

export default function SatellitesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [playing, setPlaying] = useState(true);
  const [tick, setTick] = useState(0);
  const [hovered, setHovered] = useState<Shell | null>(null);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setTick((n) => n + 1), 100);
    return () => window.clearInterval(timer);
  }, [playing]);

  const formats = useMemo(
    () => ({
      km: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "kilometer",
        maximumFractionDigits: 0,
      }),
      speed: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "kilometer-per-second",
        maximumFractionDigits: 1,
      }),
      hours: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "hour",
        maximumFractionDigits: 1,
      }),
      clock: new Intl.DateTimeFormat(i18n.language, {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
        timeZoneName: "short",
      }),
    }),
    [i18n.language],
  );
  const labels = useMemo(
    () =>
      SHELLS.map((shell) =>
        Array.from({ length: shell.planes * shell.perPlane }, (_, i) =>
          t("satName", { shell: t(`shells.${shell.id}`), n: i + 1 }),
        ),
      ),
    [t],
  );

  const series = useMemo((): Scatter3DSeries[] => {
    const seconds = tick * STEP_SECONDS;
    return [
      {
        id: "earth",
        name: t("earth"),
        data: EARTH,
        color: "var(--info-color, #0ea5e9)",
        pointStyle: "disc",
        pointSize: 3,
        opacity: 0.45,
      },
      ...SHELLS.map((shell, i): Scatter3DSeries => ({
        id: shell.id,
        name: t(`shells.${shell.id}`),
        data: { ...positions(shell, seconds), label: labels[i] },
        pointSize: 6,
      })),
    ];
  }, [t, tick, labels]);

  const axis = (title: string) => ({ title, min: -LIMIT, max: LIMIT });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={16} wrap align="center">
        <Switch
          size="small"
          checked={playing}
          label={t("play")}
          onChange={setPlaying}
        />
        <span style={{ color: "var(--text-secondary-color)" }}>
          {formats.clock.format(EPOCH + tick * STEP_SECONDS * 1000)}
        </span>
      </HStack>
      <Scatter3DChart
        series={series}
        aspect={[1, 1, 1]}
        xAxis={axis(t("thousandKm"))}
        yAxis={axis(t("thousandKm"))}
        zAxis={axis(t("thousandKm"))}
        camera={{ azimuth: 35, elevation: 25 }}
        height={460}
        ariaLabel={t("satellitesAria")}
        onHover={(event) =>
          setHovered(
            SHELLS.find((shell) => shell.id === event?.seriesId) ?? null,
          )
        }
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {hovered
          ? t("satHover", {
              shell: t(`shells.${hovered.id}`),
              altitude: formats.km.format(hovered.altitude),
              speed: formats.speed.format(Math.sqrt(MU / radiusOf(hovered))),
              period: formats.hours.format(
                (2 * Math.PI) / motionOf(hovered) / 3600,
              ),
            })
          : t("satellitesHint")}
      </output>
    </div>
  );
}
