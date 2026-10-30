import { useMemo, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import {
  Bar3DChart,
  Line3DChart,
  Scatter3DChart,
  Surface3DChart,
  type Bar3DSeries,
  type Line3DSeries,
  type Scatter3DSeries,
  type Surface3DData,
  type Surface3DSeries,
} from "minerva-design/charts";
import { GalleryCard, GalleryGrid } from "../gallery-card";

/** Small deterministic pseudo-random generator (same picture on every load) */
const random = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

// three clusters of 60 points
const clusters = (() => {
  const next = random(5);
  const centers = [
    [2, 2, 2],
    [6, 3, 5],
    [4, 7, 3],
  ];
  return centers.map(([cx, cy, cz]) =>
    Array.from(
      { length: 60 },
      () =>
        [
          cx + (next() - 0.5) * 2.5,
          cy + (next() - 0.5) * 2.5,
          cz + (next() - 0.5) * 2.5,
        ] as const,
    ),
  );
})();

// a rising spiral, colored by time
const spiral = (() => {
  const n = 600;
  const time = Float64Array.from(
    { length: n },
    (_, i) => (i / n) * 6 * Math.PI,
  );
  return {
    x: time.map((a) => Math.cos(a) * (1 + a / 10)),
    y: time.map((a) => Math.sin(a) * (1 + a / 10)),
    z: time.map((a) => a / 4),
    value: time,
  };
})();

// z = sin(r) / r sampled on a 48 × 48 grid
const ripple: Surface3DData = (() => {
  const size = 48;
  const axis = Float64Array.from(
    { length: size },
    (_, i) => -10 + (20 * i) / (size - 1),
  );
  const z = new Float32Array(size * size);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const d = Math.hypot(axis[c], axis[r]);
      z[r * size + c] = d === 0 ? 1 : Math.sin(d) / d;
    }
  }
  return { rows: size, cols: size, x: axis, y: axis, z };
})();

// sales (k$) per region and quarter: [region, quarter, sales]
const regions = ["north", "south", "east", "west"] as const;
const sales = (() => {
  const next = random(8);
  return regions.flatMap((_, r) =>
    [0, 1, 2, 3].map(
      (q) => [r, q, Math.round(60 + r * 12 + q * 18 + next() * 30)] as const,
    ),
  );
})();

// a two-armed spiral galaxy: a warm core and blue arms (columns of floats)
const galaxy = (() => {
  const next = random(11);
  const gauss = () =>
    Math.sqrt(-2 * Math.log(1 - next())) * Math.cos(2 * Math.PI * next());
  const cloud = (count: number, place: (i: number) => number[]) => {
    const x = new Float32Array(count);
    const y = new Float32Array(count);
    const z = new Float32Array(count);
    for (let i = 0; i < count; i++) [x[i], y[i], z[i]] = place(i);
    return { x, y, z };
  };
  const core = cloud(6000, () => {
    const r = Math.abs(gauss()) * 1.4;
    const angle = 2 * Math.PI * next();
    return [r * Math.cos(angle), r * Math.sin(angle), gauss() * 0.5];
  });
  const arms = cloud(18000, (i) => {
    const r = 1.5 + 10 * next() ** 0.7;
    // logarithmic arms, scattered more and more outwards
    const angle = (i % 2) * Math.PI + Math.log(r) * 2.6 + gauss() * 0.22;
    return [r * Math.cos(angle), r * Math.sin(angle), gauss() * 0.25];
  });
  return { core, arms };
})();

/** Night-sky colors of the galaxy card (the chart theme reads them) */
const space = {
  background: "radial-gradient(ellipse at 50% 45%, #0e1430 0%, #05070f 70%)",
  borderRadius: 8,
  "--surface-color": "#05070f",
  "--text-color": "#e6e9f2",
  "--text-secondary-color": "#9aa3b8",
  "--border-color": "#2a3247",
} as CSSProperties;
const galaxyCamera = { azimuth: 20, elevation: 40, zoom: 1.6 };
const flatAspect = [1, 1, 0.35] as const;

export default function Gallery3DDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    // values in thousands of dollars
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  const data = useMemo(() => {
    const scatter: Scatter3DSeries[] = clusters.map((points, i) => ({
      name: t("cluster", { name: "ABC"[i] }),
      data: points,
      pointSize: 6,
    }));
    const line: Line3DSeries[] = [
      { name: t("trajectory"), data: spiral, lineWidth: 2 },
    ];
    const surface: Surface3DSeries[] = [{ name: t("ripple"), data: ripple }];
    const bars: Bar3DSeries[] = [{ name: t("sales"), data: sales }];
    // glowing dots whose light adds up where the stars are dense
    const stars: Scatter3DSeries[] = [
      {
        name: t("galaxyCore"),
        data: galaxy.core,
        color: "#ffc477",
        pointSize: 2,
        opacity: 0.16,
        pointStyle: "glow",
        blend: "additive",
      },
      {
        name: t("galaxyArms"),
        data: galaxy.arms,
        color: "#9cc4ff",
        pointSize: 2,
        opacity: 0.1,
        pointStyle: "glow",
        blend: "additive",
      },
    ];
    const regionNames = regions.map((key) => t(`regions.${key}`));
    const quarters = [1, 2, 3, 4].map((n) => t("quarter", { n }));
    return { scatter, line, surface, bars, stars, regionNames, quarters };
  }, [t]);

  // the 3D charts pause their rendering and auto-rotation off screen
  return (
    <GalleryGrid>
      <GalleryCard
        title={t("cards.scatter3d.title")}
        component="Scatter3DChart"
        page="scatter-3d-chart"
        description={t("cards.scatter3d.description")}
      >
        <Scatter3DChart
          series={data.scatter}
          legend={false}
          autoRotate
          locale={locale}
          height="100%"
          ariaLabel={t("cards.scatter3d.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.line3d.title")}
        component="Line3DChart"
        page="scatter-3d-chart"
        description={t("cards.line3d.description")}
      >
        <Line3DChart
          series={data.line}
          colorScale="plasma"
          colorBar={false}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.line3d.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.surface3d.title")}
        component="Surface3DChart"
        page="surface-3d-chart"
        description={t("cards.surface3d.description")}
      >
        <Surface3DChart
          series={data.surface}
          colorBar={false}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.surface3d.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.bar3d.title")}
        component="Bar3DChart"
        page="bar-3d-chart"
        description={t("cards.bar3d.description")}
      >
        <Bar3DChart
          series={data.bars}
          xAxis={{ categories: data.regionNames }}
          yAxis={{ categories: data.quarters }}
          zAxis={{ format: usd }}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.bar3d.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.galaxy.title")}
        component="Scatter3DChart"
        page="scatter-3d-chart"
        description={t("cards.galaxy.description")}
      >
        <Scatter3DChart
          series={data.stars}
          legend={false}
          box={false}
          aspect={flatAspect}
          camera={galaxyCamera}
          autoRotate={6}
          locale={locale}
          height="100%"
          style={space}
          ariaLabel={t("cards.galaxy.aria")}
        />
      </GalleryCard>
    </GalleryGrid>
  );
}
