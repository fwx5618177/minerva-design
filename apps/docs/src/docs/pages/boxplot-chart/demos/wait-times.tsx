import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BoxPlotChart,
  type BoxplotGroup,
  type ChartHoverEvent,
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

const TARGET = 240; // minutes: the four-hour standard of the emergency room

// Emergency room waits (minutes) over a quarter, Monday to Sunday: busier
// on Mondays and weekend nights, with a few very long waits
const typical = [150, 120, 110, 115, 125, 140, 160];
const waits = typical.map((median, day) => {
  const random = mulberry32(900 + day);
  return Float64Array.from({ length: 400 }, () => {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    return Math.round(median * Math.exp(0.42 * z));
  });
});

export default function WaitTimesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const [clicked, setClicked] = useState<{
    day: number;
    outlier?: number;
    median: number;
    q1: number;
    q3: number;
    outliers: number;
  } | null>(null);

  const minutes = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "minute",
      unitDisplay: "short",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const groups = useMemo((): BoxplotGroup[] => {
    // 1 January 2024 is a Monday
    const weekday = new Intl.DateTimeFormat(locale, {
      weekday: "long",
      timeZone: "UTC",
    });
    return waits.map((values, day) => ({
      x: weekday.format(Date.UTC(2024, 0, 1 + day)),
      values,
    }));
  }, [locale]);

  // a click on a box gives its statistics, a click on an outlier its value;
  // on the category axis, x is the index of the day
  const click = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return;
    setClicked({
      day: Math.round(event.x),
      outlier: item.outlier,
      median: item.y,
      q1: item.q1 ?? item.y,
      q3: item.q3 ?? item.y,
      outliers: item.outliers ?? 0,
    });
  };
  const day = clicked ? String(groups[clicked.day]?.x ?? "") : "";
  const status = !clicked
    ? t("clickBox")
    : clicked.outlier !== undefined
      ? t("outlierClicked", { day, value: minutes(clicked.outlier) })
      : t("boxClicked", {
          day,
          median: minutes(clicked.median),
          q1: minutes(clicked.q1),
          q3: minutes(clicked.q3),
          outliers: new Intl.NumberFormat(locale).format(clicked.outliers),
        });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {status}
      </output>
      <BoxPlotChart
        groups={groups}
        name={t("wait")}
        outlierShape="filled"
        yAxis={{ format: minutes, min: 0, title: t("wait") }}
        annotations={[
          {
            type: "rect",
            y0: TARGET,
            color: "var(--danger-color)",
            opacity: 0.06,
          },
          {
            type: "line",
            axis: "y",
            value: TARGET,
            color: "var(--danger-color)",
            dash: [4, 4],
            label: t("fourHours"),
          },
        ]}
        onPointClick={click}
        onPlotClick={() => setClicked(null)}
        height={340}
        ariaLabel={t("waitsAria")}
      />
    </div>
  );
}
