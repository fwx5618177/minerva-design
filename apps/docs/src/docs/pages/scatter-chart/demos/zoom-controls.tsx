import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  ScatterChart,
  type ChartHandle,
  type ChartSeries,
  type ChartView,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 900 readings of greenhouse sensors: temperature (°C) and relative humidity
// (%), in three regimes: cool humid nights, mild days, hot dry afternoons
const random = mulberry32(64);
const gaussian = () =>
  Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
const readings = Array.from({ length: 900 }, (_, i) => {
  const [temp, humidity] =
    i % 9 === 0 ? [33, 38] : i % 3 === 0 ? [15, 84] : [23, 63];
  const t = temp + gaussian() * 2.2;
  const h = humidity - (t - temp) * 2 + gaussian() * 5;
  return [
    Math.round(t * 10) / 10,
    Math.round(Math.min(100, Math.max(5, h)) * 10) / 10,
  ] as const;
});

// the growing range of the crop
const COMFORT = { x0: 18, x1: 28, y0: 50, y1: 75 };

const PRESETS = {
  night: { x: [8, 22], y: [65, 100] },
  comfort: { x: [16, 30], y: [45, 80] },
  heat: { x: [26, 42], y: [15, 60] },
} satisfies Record<string, ChartView>;
type Preset = keyof typeof PRESETS;

export default function ZoomControlsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;
  const chart = useRef<ChartHandle>(null);
  const [view, setView] = useState<ChartView | null>(null);

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("readings"), data: readings, pointSize: 5, opacity: 0.55 },
    ],
    [t],
  );
  const celsius = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  // setView does not call onZoom: read the view back from the handle
  const zoomTo = (preset: Preset) => {
    chart.current?.setView(PRESETS[preset]);
    setView(chart.current?.getView() ?? PRESETS[preset]);
  };
  const inView = view
    ? readings.filter(
        ([x, y]) =>
          x >= view.x[0] && x <= view.x[1] && y >= view.y[0] && y <= view.y[1],
      ).length
    : readings.length;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {(Object.keys(PRESETS) as Preset[]).map((preset) => (
          <Button
            key={preset}
            size="small"
            variant="outline"
            onClick={() => zoomTo(preset)}
          >
            {t(`zoomPresets.${preset}`)}
          </Button>
        ))}
        <Button
          size="small"
          variant="ghost"
          onClick={() => chart.current?.resetZoom()}
        >
          {t("showAll")}
        </Button>
      </div>
      <ScatterChart
        ref={chart}
        series={series}
        xAxis={{
          title: t("temperature"),
          format: (value) => celsius.format(value),
        }}
        yAxis={{
          title: t("humidity"),
          format: (value) => percent.format(value / 100),
        }}
        annotations={[
          {
            type: "rect",
            ...COMFORT,
            color: "var(--success-color)",
            opacity: 0.1,
            label: t("growingRange"),
          },
        ]}
        onZoom={setView}
        height={320}
        ariaLabel={t("greenhouseAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {view
          ? t("greenhouseView", {
              t0: celsius.format(view.x[0]),
              t1: celsius.format(view.x[1]),
              h0: percent.format(view.y[0] / 100),
              h1: percent.format(view.y[1] / 100),
              points: new Intl.NumberFormat(locale).format(inView),
            })
          : t("greenhouseHint")}
      </output>
    </div>
  );
}
