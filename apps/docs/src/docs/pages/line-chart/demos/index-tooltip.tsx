import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
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

const MONTHS = 61; // January 2021 to January 2026
const month = (i: number) => new Date(2021, i, 1).getTime();

/** Monthly random walk rebased to 100 at the first month */
const rebased = (seed: number, drift: number, volatility: number) => {
  const random = mulberry32(seed);
  let level = 100;
  return Array.from({ length: MONTHS }, (_, i) => {
    if (i > 0) level *= 1 + drift + (random() - 0.5) * volatility;
    return [month(i), Math.round(level * 10) / 10] as const;
  });
};

const assets = {
  equities: rebased(3, 0.008, 0.09),
  bonds: rebased(8, -0.0005, 0.03),
  gold: rebased(12, 0.009, 0.07),
  realEstate: rebased(21, 0.002, 0.06),
};

export default function IndexTooltipDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const names = {
      equities: t("assets.equities"),
      bonds: t("assets.bonds"),
      gold: t("assets.gold"),
      realEstate: t("assets.realEstate"),
    };
    return (Object.keys(assets) as (keyof typeof assets)[]).map((key) => ({
      name: names[key],
      data: assets[key],
    }));
  }, [t]);
  const formats = useMemo(
    () => ({
      index: new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
      change: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
      month: new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
      }),
    }),
    [locale],
  );

  // every asset at the hovered month, best performer first
  const renderTooltip = (event: ChartHoverEvent) => {
    const items = [...event.items].sort((a, b) => b.y - a.y);
    return (
      <div style={{ display: "grid", gap: 4, minWidth: 200 }}>
        <strong>{formats.month.format(event.x)}</strong>
        {items.map((item, rank) => (
          <div
            key={item.seriesId}
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto auto",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: item.color,
              }}
            />
            <span style={{ fontWeight: rank === 0 ? 600 : undefined }}>
              {item.seriesName}
            </span>
            <span style={{ textAlign: "end" }}>
              {formats.index.format(item.y)}
            </span>
            <span
              style={{
                textAlign: "end",
                color:
                  item.y >= 100
                    ? "var(--success-color)"
                    : "var(--danger-color)",
              }}
            >
              {formats.change.format(item.y / 100 - 1)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <LineChart
      series={series}
      renderTooltip={renderTooltip}
      crosshair
      annotations={[
        {
          type: "line",
          axis: "y",
          value: 100,
          dash: [4, 4],
          label: t("baseIndex"),
        },
      ]}
      xAxis={{ type: "time", format: (x) => formats.month.format(x) }}
      yAxis={{ format: (y) => formats.index.format(y) }}
      height={320}
      ariaLabel={t("assetsAria")}
    />
  );
}
