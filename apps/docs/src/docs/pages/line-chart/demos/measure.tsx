import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  LineChart,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartSeries,
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

// Value of a portfolio (EUR) at the end of every day of 2026
const random = mulberry32(64);
let value = 250_000;
const portfolio = Array.from({ length: 300 }, (_, i) => {
  value *= 1 + (random() - 0.47) * 0.018 + Math.sin(i / 40) * 0.002;
  return [START + i * DAY, Math.round(value)] as const;
});

interface Pin {
  x: number;
  y: number;
}

export default function MeasureDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  // up to two clicked points; a third click starts a new measurement
  const [pins, setPins] = useState<Pin[]>([]);

  const series = useMemo(
    (): ChartSeries[] => [{ name: t("portfolio"), data: portfolio }],
    [t],
  );
  const formats = useMemo(
    () => ({
      eur: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
      compact: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        notation: "compact",
      }),
      change: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
        signDisplay: "exceptZero",
      }),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 2,
        signDisplay: "exceptZero",
      }),
      days: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "day",
        unitDisplay: "long",
      }),
      date: new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
      }),
    }),
    [locale],
  );

  const onPointClick = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return;
    setPins((current) => [
      ...(current.length >= 2 ? [] : current),
      { x: item.x, y: item.y },
    ]);
  };

  // the two pins in time order
  const [from, to] = [...pins].sort((a, b) => a.x - b.x);
  const rising = from && to ? to.y >= from.y : true;
  const annotations = useMemo((): ChartAnnotation[] => {
    const lines: ChartAnnotation[] = pins.map((pin) => ({
      type: "line",
      axis: "x",
      value: pin.x,
      color: "var(--primary-color)",
      dash: [4, 4],
      label: formats.date.format(pin.x),
    }));
    if (!from || !to) return lines;
    return [
      {
        type: "rect",
        x0: from.x,
        x1: to.x,
        color: rising ? "var(--success-color)" : "var(--danger-color)",
        opacity: 0.1,
      },
      ...lines,
    ];
  }, [pins, from, to, rising, formats]);

  let summary = t("measureHint");
  if (from && to) {
    summary = t("measureResult", {
      from: formats.date.format(from.x),
      to: formats.date.format(to.x),
      change: formats.change.format(to.y - from.y),
      percent: formats.percent.format(to.y / from.y - 1),
      days: formats.days.format(Math.round((to.x - from.x) / DAY)),
    });
  } else if (from) {
    summary = t("measureStart", {
      date: formats.date.format(from.x),
      value: formats.eur.format(from.y),
    });
  }

  return (
    <div style={{ display: "grid", gap: 10, width: "100%" }}>
      <LineChart
        series={series}
        annotations={annotations}
        onPointClick={onPointClick}
        onPlotClick={() => setPins([])}
        tooltip={{ mode: "nearest" }}
        crosshair
        xAxis={{ type: "time", format: (x) => formats.date.format(x) }}
        yAxis={{ format: (y) => formats.compact.format(y) }}
        legend={false}
        height={300}
        ariaLabel={t("portfolioAria")}
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
          disabled={pins.length === 0}
          onClick={() => setPins([])}
        >
          {t("clear")}
        </Button>
        <output
          aria-live="polite"
          style={{
            color:
              from && to
                ? rising
                  ? "var(--success-color)"
                  : "var(--danger-color)"
                : undefined,
          }}
        >
          {summary}
        </output>
      </div>
    </div>
  );
}
