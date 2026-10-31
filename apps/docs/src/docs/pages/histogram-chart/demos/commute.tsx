import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  HistogramChart,
  binValues,
  type ChartAnnotation,
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

const DOMAIN = [0, 90] as const;
const BINS = 18;

// One-way commute (minutes) of 1,200 employees: walkers and cyclists around
// a quarter of an hour, train commuters around 45 minutes
const commutes = (() => {
  const random = mulberry32(2026);
  return Float64Array.from({ length: 1200 }, () => {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    const value = random() < 0.45 ? 16 + 6 * z : 46 + 12 * z;
    return Math.min(89.9, Math.max(2, value));
  });
})();

// the same options as the chart: the same bins, with their edges
const bins = binValues(commutes, { domain: DOMAIN, bins: BINS });
// share of the employees at or below the upper edge of every bin
const cumulative = bins.counts.map(
  (_, k) => bins.counts.slice(0, k + 1).reduce((a, b) => a + b, 0) / bins.total,
);

export default function CommuteDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<number | null>(null);

  const minutes = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "minute",
      unitDisplay: "short",
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const annotations = useMemo((): ChartAnnotation[] => {
    if (selected === null) return [];
    const edge = bins.edges[selected + 1] ?? 0;
    return [
      {
        type: "rect",
        x1: edge,
        color: "var(--primary-color)",
        opacity: 0.1,
        label: t("withinShare", {
          share: percent.format(cumulative[selected] ?? 0),
        }),
      },
      { type: "line", axis: "x", value: edge, color: "var(--primary-color)" },
    ];
  }, [selected, percent, t]);

  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items.find((i) => i.seriesIndex === 0);
    if (!item) return null;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{item.label}</strong>
        <span>
          {t("employeesInBin", {
            value: number.format(item.y),
            share: percent.format(item.y / bins.total),
          })}
        </span>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {t("clickForCumulative")}
        </span>
      </div>
    );
  };

  const edge = selected === null ? 0 : (bins.edges[selected + 1] ?? 0);
  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {selected === null
          ? t("clickBin")
          : t("cumulativeStatus", {
              share: percent.format(cumulative[selected] ?? 0),
              employees: number.format(
                Math.round((cumulative[selected] ?? 0) * bins.total),
              ),
              limit: minutes(edge),
            })}
      </output>
      <HistogramChart
        values={commutes}
        domain={DOMAIN}
        bins={BINS}
        name={t("employees")}
        formatBin={minutes}
        xAxis={{ title: t("commute"), format: minutes }}
        annotations={annotations}
        renderTooltip={tooltip}
        // the index of a bar is the index of its bin
        onPointClick={(event) => {
          const item = event.items.find((i) => i.seriesIndex === 0);
          if (item) setSelected(item.index);
        }}
        onPlotClick={() => setSelected(null)}
        height={320}
        ariaLabel={t("commuteAria")}
      />
    </div>
  );
}
