import { useMemo, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
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

/** Color of a black body at `kelvin` (0-255 channels, Tanner Helland's fit) */
function blackbody(kelvin: number): [number, number, number] {
  const t = kelvin / 100;
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = t <= 66 ? 255 : 329.698727446 * Math.pow(t - 60, -0.1332047592);
  const g =
    t <= 66
      ? 99.4708025861 * Math.log(t) - 161.1195681661
      : 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  const b =
    t >= 66
      ? 255
      : t <= 19
        ? 0
        : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  return [clamp(r), clamp(g), clamp(b)];
}

/** `0xRRGGBB` of a color scaled by a brightness (additive light) */
function rgb([r, g, b]: [number, number, number], brightness: number) {
  const k = Math.max(0, Math.min(1, brightness));
  return (
    (Math.round(r * k) << 16) | (Math.round(g * k) << 8) | Math.round(b * k)
  );
}

interface Population {
  x: Float32Array;
  y: Float32Array;
  z: Float32Array;
  size: Float32Array;
  color: Uint32Array;
}

const population = (count: number): Population => ({
  x: new Float32Array(count),
  y: new Float32Array(count),
  z: new Float32Array(count),
  size: new Float32Array(count),
  color: new Uint32Array(count),
});

/** Two logarithmic arms (kpc): pitch angle and radius where they start */
const PITCH = (16 * Math.PI) / 180;
const WIND = 1 / Math.tan(PITCH);
const ARM_START = 2.2;
/** Angle of arm `k` (0 or 1) at radius `r` */
const armAngle = (k: number, r: number) =>
  k * Math.PI + Math.log(r / ARM_START) * WIND;
/**
 * Signed distance (kpc) to the nearest arm across it; positive on the
 * inner (concave) side, where the dust lanes lie
 */
const armOffset = (r: number, angle: number) => {
  let d = (angle - armAngle(0, r)) % Math.PI;
  if (d > Math.PI / 2) d -= Math.PI;
  if (d < -Math.PI / 2) d += Math.PI;
  return d * r * Math.sin(PITCH);
};

/**
 * A barred spiral galaxy of 1,000,000 stars (deterministic): a warm bulge,
 * an old disk, young blue stars and pink HII regions along two logarithmic
 * arms, dust lanes on the inner edge of the arms, and a faint halo.
 */
function galaxy() {
  const random = mulberry32(7);
  const normal = () =>
    Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
  // two-sided exponential (thin disk heights)
  const laplace = (h: number) =>
    (random() < 0.5 ? -h : h) * Math.log(1 - random());
  const between = (a: number, b: number) => a + (b - a) * random();
  /** Draws until `accept` takes the value (rejection sampling) */
  const sample = (draw: () => number, accept: (value: number) => boolean) => {
    for (;;) {
      const value = draw();
      if (accept(value)) return value;
    }
  };
  /** Dust absorption (0-1) at a radius, offset to the arm and height */
  const dust = (r: number, offset: number, z: number) =>
    r < 1.6
      ? 0
      : Math.exp(-(((offset - 0.2) / 0.14) ** 2)) *
        Math.exp(-Math.abs(z) / 0.2) *
        Math.min(1, (r - 1.6) / 1.5) *
        0.95;
  const place = (
    p: Population,
    i: number,
    x: number,
    y: number,
    z: number,
    size: number,
    kelvin: number,
    brightness: number,
  ) => {
    p.x[i] = x;
    p.y[i] = y;
    p.z[i] = z;
    p.size[i] = size;
    p.color[i] = rgb(blackbody(kelvin), brightness);
  };
  /** A disk star: dimmed and reddened inside a dust lane */
  const diskStar = (
    p: Population,
    i: number,
    r: number,
    angle: number,
    z: number,
    size: number,
    kelvin: number,
    brightness: number,
  ) => {
    const a = dust(r, armOffset(r, angle), z);
    place(
      p,
      i,
      r * Math.cos(angle),
      r * Math.sin(angle),
      z,
      size,
      kelvin * (1 - 0.5 * a),
      brightness * (1 - a),
    );
  };

  // bulge and bar: old K / G stars
  const bulge = population(160_000);
  const bar = (25 * Math.PI) / 180;
  for (let i = 0; i < 160_000; i++) {
    const r = -0.42 * Math.log(random() * random());
    const u = 2 * random() - 1;
    const phi = 2 * Math.PI * random();
    const s = Math.sqrt(1 - u * u);
    let x = r * s * Math.cos(phi);
    let y = r * s * Math.sin(phi);
    if (i % 2 === 0) {
      // the bar: stretched along its axis
      x *= 2.1;
      y *= 0.75;
    }
    place(
      bulge,
      i,
      x * Math.cos(bar) - y * Math.sin(bar),
      x * Math.sin(bar) + y * Math.cos(bar),
      r * u * 0.55,
      1.1,
      between(3000, 4600),
      between(0.4, 0.85),
    );
  }

  // old disk: exponential, slightly crowded on the arms
  const disk = population(480_000);
  for (let i = 0; i < 480_000; i++) {
    const r = sample(
      () => -3 * Math.log(random() * random()),
      (v) => v >= 0.6 && v <= 16,
    );
    const angle = sample(
      () => 2 * Math.PI * random(),
      (a) => random() <= 0.5 + 0.5 * Math.exp(-((armOffset(r, a) / 0.7) ** 2)),
    );
    const z = laplace(0.18 + r * 0.012);
    const giant = random() < 0.01;
    diskStar(
      disk,
      i,
      r,
      angle,
      z,
      giant ? 2 : 1,
      giant ? between(3200, 4200) : between(3800, 6500),
      giant ? 0.9 : between(0.3, 0.7),
    );
  }

  // young stars along the arms: blue-white, a very thin disk, mostly in
  // associations (knots) strung along the arms
  const young = population(260_000);
  let knot = { x: 0, y: 0, spread: 0, left: 0 };
  for (let i = 0; i < 260_000; i++) {
    let r = ARM_START + 0.8 + 12.5 * random() ** 0.8;
    let angle: number;
    if (i % 20 < 9) {
      if (knot.left <= 0) {
        const across = normal() * (0.3 + 0.025 * r);
        const center =
          armAngle(i % 2, r) + across / (r * Math.sin(PITCH)) + normal() * 0.04;
        knot = {
          x: r * Math.cos(center),
          y: r * Math.sin(center),
          spread: between(0.12, 0.45),
          left: 20 + Math.floor(random() * 120),
        };
      }
      knot.left--;
      const kx = knot.x + normal() * knot.spread;
      const ky = knot.y + normal() * knot.spread;
      r = Math.hypot(kx, ky);
      angle = Math.atan2(ky, kx);
    } else {
      const across = normal() * (0.4 + 0.03 * r);
      angle =
        armAngle(i % 2, r) + across / (r * Math.sin(PITCH)) + normal() * 0.03;
    }
    const bright = random() < 0.04;
    diskStar(
      young,
      i,
      r,
      angle,
      laplace(0.06),
      bright ? 2.4 : 1.2,
      9000 + 21000 * random() ** 1.5,
      bright ? 1 : between(0.4, 0.8),
    );
  }

  // HII regions: pink clumps just outside the dust lanes
  const nebulae = population(40_000);
  const pink: [number, number, number] = [255, 70, 150];
  const rose: [number, number, number] = [255, 130, 190];
  for (let c = 0; c < 500; c++) {
    const r = 3.2 + 10.5 * random() ** 0.85;
    const across = -0.1 + normal() * 0.35;
    const center = armAngle(c % 2, r) + across / (r * Math.sin(PITCH));
    const cx = r * Math.cos(center);
    const cy = r * Math.sin(center);
    const spread = between(0.04, 0.12);
    for (let k = 0; k < 80; k++) {
      const i = c * 80 + k;
      const mix = random();
      nebulae.x[i] = cx + normal() * spread;
      nebulae.y[i] = cy + normal() * spread;
      nebulae.z[i] = normal() * spread * 0.4;
      nebulae.size[i] = 1.8;
      nebulae.color[i] = rgb(
        [
          pink[0] + (rose[0] - pink[0]) * mix,
          pink[1] + (rose[1] - pink[1]) * mix,
          pink[2] + (rose[2] - pink[2]) * mix,
        ],
        between(0.5, 1),
      );
    }
  }

  // halo: a faint sphere of old stars
  const halo = population(60_000);
  for (let i = 0; i < 60_000; i++) {
    const r = sample(
      () => -4.5 * Math.log(random() * random()),
      (v) => v <= 22,
    );
    const u = 2 * random() - 1;
    const phi = 2 * Math.PI * random();
    const s = Math.sqrt(1 - u * u);
    place(
      halo,
      i,
      r * s * Math.cos(phi),
      r * s * Math.sin(phi),
      r * u * 0.8,
      1.1,
      between(3800, 5600),
      between(0.2, 0.45),
    );
  }

  return { bulge, disk, young, nebulae, halo };
}

/** Night-sky colors of the chart (its theme reads these variables) */
const SPACE = {
  background: "radial-gradient(ellipse at 50% 45%, #0e1430 0%, #05070f 70%)",
  borderRadius: 12,
  "--surface-color": "#05070f",
  "--surface-elevated-color": "#111729",
  "--text-color": "#e6e9f2",
  "--text-secondary-color": "#9aa3b8",
  "--border-color": "#2a3247",
} as CSSProperties;

/** Exposures offered (the light of the additive stars, tone mapped) */
const EXPOSURES = [0.5, 1, 2, 4] as const;

export default function GalaxyDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [exposure, setExposure] = useState(1);
  // ~150 ms: generated once, when the demo mounts
  const stars = useMemo(() => galaxy(), []);
  const series = useMemo((): Scatter3DSeries[] => {
    const common = {
      pointStyle: "glow",
      blend: "additive",
    } as const;
    return [
      {
        ...common,
        name: t("galaxy.bulge"),
        color: "#ffc477",
        data: stars.bulge,
        opacity: 0.11,
      },
      {
        ...common,
        name: t("galaxy.disk"),
        color: "#ffe2b8",
        data: stars.disk,
        opacity: 0.08,
      },
      {
        ...common,
        name: t("galaxy.arms"),
        color: "#9cc4ff",
        data: stars.young,
        opacity: 0.1,
      },
      {
        ...common,
        name: t("galaxy.nebulae"),
        color: "#ff6aa9",
        data: stars.nebulae,
        opacity: 0.14,
      },
      {
        ...common,
        name: t("galaxy.halo"),
        color: "#c9a77f",
        data: stars.halo,
        opacity: 0.5,
      },
    ];
  }, [t, stars]);

  const kpc = (value: number) => t("kiloparsecs", { value: value.toFixed(1) });
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("exposure")}
        direction="horizontal"
        size="small"
        value={String(exposure)}
        onChange={(value) => setExposure(Number(value))}
      >
        {EXPOSURES.map((value) => (
          <Radio
            key={value}
            value={String(value)}
            label={t("exposureValue", { value })}
          />
        ))}
      </RadioGroup>
      <Scatter3DChart
        series={series}
        box={false}
        aspect={[1, 1, 0.35]}
        xAxis={{ min: -16, max: 16, format: kpc }}
        yAxis={{ min: -16, max: 16, format: kpc }}
        zAxis={{ min: -5.6, max: 5.6, format: kpc }}
        camera={{ azimuth: 20, elevation: 34, zoom: 1.75, fov: 28 }}
        autoRotate={4}
        exposure={exposure}
        height={500}
        style={SPACE}
        ariaLabel={t("galaxyAria")}
      />
    </div>
  );
}
