import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack, Tag } from "minerva-design";
import {
  Surface3DChart,
  type Chart3DHandle,
  type Surface3DSeries,
} from "minerva-design/charts";

// A 30 × 20 m office floor sampled every 0.5 m
const COLS = 61;
const ROWS = 41;
const STEP = 0.5;
const X = Float64Array.from({ length: COLS }, (_, i) => i * STEP);
const Y = Float64Array.from({ length: ROWS }, (_, i) => i * STEP);
const FLOOR = -95; // dBm, no usable signal
const GOOD = -67; // dBm, enough for video calls
const USABLE = -75;

type AccessPoint = "lobby" | "openSpace" | "meetingRooms" | "kitchen";
const ACCESS_POINTS: [AccessPoint, number, number][] = [
  ["lobby", 4, 4],
  ["openSpace", 16, 12],
  ["meetingRooms", 26, 16],
  ["kitchen", 25, 3],
];

// interior walls (x1, y1, x2, y2); each one crossed costs 6 dB
const WALLS: [number, number, number, number][] = [
  [10, 0, 10, 8],
  [20, 9, 30, 9],
  [21, 9, 21, 20],
  [0, 14, 10, 14],
  [18, 0, 18, 6],
];

const crosses = (
  ax: number,
  ay: number,
  bx: number,
  by: number,
  [cx, cy, dx, dy]: [number, number, number, number],
) => {
  const side = (
    px: number,
    py: number,
    qx: number,
    qy: number,
    rx: number,
    ry: number,
  ) => Math.sign((qx - px) * (ry - py) - (qy - py) * (rx - px));
  return (
    side(ax, ay, bx, by, cx, cy) !== side(ax, ay, bx, by, dx, dy) &&
    side(cx, cy, dx, dy, ax, ay) !== side(cx, cy, dx, dy, bx, by)
  );
};

/** Strongest signal over the floor, log-distance path loss plus wall losses */
const coverage = (enabled: ReadonlySet<AccessPoint>) => {
  const z = new Float32Array(ROWS * COLS);
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let best = FLOOR;
      for (const [id, ax, ay] of ACCESS_POINTS) {
        if (!enabled.has(id)) continue;
        const [x, y] = [X[c]!, Y[r]!];
        const walls = WALLS.filter((wall) =>
          crosses(ax, ay, x, y, wall),
        ).length;
        const distance = Math.max(1, Math.hypot(x - ax, y - ay));
        best = Math.max(best, -32 - 30 * Math.log10(distance) - 6 * walls);
      }
      z[r * COLS + c] = best;
    }
  }
  return { rows: ROWS, cols: COLS, x: X, y: Y, z };
};

export default function WifiSignalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const ref = useRef<Chart3DHandle>(null);
  const [enabled, setEnabled] = useState<ReadonlySet<AccessPoint>>(
    () => new Set<AccessPoint>(["lobby", "openSpace", "meetingRooms"]),
  );
  const [topView, setTopView] = useState(false);
  const data = useMemo(() => coverage(enabled), [enabled]);
  const percent = useMemo(
    () => new Intl.NumberFormat(i18n.language, { style: "percent" }),
    [i18n.language],
  );
  const dbm = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: 0,
    });
    return (value: number) => t("dbm", { value: number.format(value) });
  }, [t, i18n.language]);

  const series = useMemo(
    (): Surface3DSeries[] => [
      {
        name: t("signal"),
        data,
        contours: {
          levels: [USABLE, GOOD],
          floor: true,
          surface: true,
          width: 1.5,
        },
        format: dbm,
      },
    ],
    [t, data, dbm],
  );
  const share = (threshold: number) =>
    data.z.filter((value) => value >= threshold).length / data.z.length;

  const toggle = (id: AccessPoint) => {
    const next = new Set(enabled);
    if (!next.delete(id)) next.add(id);
    setEnabled(next);
  };
  const switchView = () => {
    if (topView) ref.current?.resetCamera();
    else
      ref.current?.setCamera({
        azimuth: 0,
        elevation: 89,
        zoom: 1,
        pan: [0, 0],
        projection: "orthographic",
      });
    setTopView(!topView);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} wrap align="center">
        <span>{t("accessPoints")}</span>
        {ACCESS_POINTS.map(([id]) => (
          <Tag
            key={id}
            size="small"
            clickable
            pressed={enabled.has(id)}
            onClick={() => toggle(id)}
          >
            {t(`rooms.${id}`)}
          </Tag>
        ))}
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={switchView}
        >
          {topView ? t("perspectiveView") : t("topView")}
        </Button>
      </HStack>
      <Surface3DChart
        ref={ref}
        series={series}
        xAxis={{ title: t("distanceM") }}
        yAxis={{ title: t("distanceM") }}
        zAxis={{ min: FLOOR, max: -30, title: t("signal"), format: dbm }}
        valueRange={[FLOOR, -30]}
        colorScale="spectral"
        colorBar={{ title: t("signal"), format: dbm }}
        aspect={[30, 20, 8]}
        camera={{ azimuth: 25, elevation: 40 }}
        height={440}
        ariaLabel={t("wifiAria")}
        onCameraChange={(camera) =>
          setTopView(
            camera.projection === "orthographic" && camera.elevation > 80,
          )
        }
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {enabled.size
          ? t("wifiCoverage", {
              good: percent.format(share(GOOD)),
              goodLevel: dbm(GOOD),
              usable: percent.format(share(USABLE)),
              usableLevel: dbm(USABLE),
            })
          : t("wifiNone")}
      </output>
    </div>
  );
}
