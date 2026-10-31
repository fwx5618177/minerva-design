import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  AreaChart,
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

const DAY = 24 * 60 * 60 * 1000;
// local midnight: the time axis places its ticks in local time
const START = new Date(2026, 0, 1).getTime();

// Daily energy of a rooftop solar installation (kWh): long summer days,
// short winter days and cloudy spells
const random = mulberry32(365);
const production = Array.from({ length: 365 }, (_, day) => {
  const season = 0.55 + 0.45 * Math.sin(((day - 80) / 365) * 2 * Math.PI);
  const clouds = 0.35 + 0.65 * random() ** 0.5;
  return [
    START + day * DAY,
    Math.round(32 * season * clouds * 10) / 10,
  ] as const;
});

/** Total and daily average of the days inside [from, to] */
const stats = (from: number, to: number) => {
  const days = production.filter(([time]) => time >= from && time <= to);
  const total = days.reduce((sum, [, kwh]) => sum + kwh, 0);
  return { total, average: days.length ? total / days.length : 0, from, to };
};
const ALL = stats(START, START + 364 * DAY);

export default function ZoomTotalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;
  const chart = useRef<ChartHandle>(null);
  const [visible, setVisible] = useState(ALL);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("solarProduction"),
        color: "var(--warning-color)",
        data: production,
      },
    ],
    [t],
  );
  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return {
      kwh: (value: number) => t("kwh", { value: number.format(value) }),
      date: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    };
  }, [t, locale]);

  // onZoom reports the visible x range after every zoom and pan
  const onZoom = (view: ChartView) => setVisible(stats(view.x[0], view.x[1]));
  const reset = () => {
    chart.current?.resetZoom();
    setVisible(ALL);
  };

  return (
    <div style={{ display: "grid", gap: 10, width: "100%" }}>
      <AreaChart
        ref={chart}
        series={series}
        curve="linear"
        onZoom={onZoom}
        xAxis={{ type: "time", format: (x) => formats.date.format(x) }}
        yAxis={{ format: formats.kwh }}
        legend={false}
        height={280}
        ariaLabel={t("solarAria")}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Button
          size="small"
          variant="outline"
          disabled={visible === ALL}
          onClick={reset}
        >
          {t("resetZoom")}
        </Button>
        <output aria-live="polite">
          {t("visibleTotal", {
            from: formats.date.format(visible.from),
            to: formats.date.format(visible.to),
            total: formats.kwh(visible.total),
            average: formats.kwh(visible.average),
          })}
        </output>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 13,
          color: "var(--text-secondary-color)",
        }}
      >
        {t("zoomHint")}
      </p>
    </div>
  );
}
