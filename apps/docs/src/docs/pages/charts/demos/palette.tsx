import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  BarChart,
  DonutChart,
  type ChartSeries,
  type ShapeDatum,
} from "minerva-design/charts";

// Palettes: undefined = the theme (--chart-series-1..8, then theme colors)
const PALETTES = {
  theme: undefined,
  // Okabe-Ito: distinguishable with the common color vision deficiencies
  colorblind: ["#0072B2", "#E69F00", "#009E73", "#CC79A7", "#56B4E9"],
  blues: ["#08306b", "#2171b5", "#4292c6", "#6baed6", "#9ecae1"],
  warm: ["#7f1d1d", "#c2410c", "#f59e0b", "#facc15", "#fde68a"],
} as const;
type PaletteName = keyof typeof PALETTES;

// Support requests per quarter by channel
const channels = {
  email: [420, 380, 410, 360],
  chat: [310, 360, 420, 480],
  phone: [180, 170, 150, 140],
  social: [60, 80, 95, 120],
  community: [40, 55, 70, 90],
};
type Channel = keyof typeof channels;

export default function PaletteDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const [name, setName] = useState<PaletteName>("colorblind");
  const palette = PALETTES[name];

  const { bars, shares } = useMemo(() => {
    const keys = Object.keys(channels) as Channel[];
    const bars: ChartSeries[] = keys.map((key) => ({
      name: t(`channels.${key}`),
      data: channels[key].map(
        (y, i) => [t("quarter", { n: i + 1 }), y] as const,
      ),
    }));
    const shares: ShapeDatum[] = keys.map((key) => ({
      name: t(`channels.${key}`),
      value: channels[key].reduce((sum, v) => sum + v, 0),
    }));
    return { bars, shares };
  }, [t]);
  const percent = new Intl.NumberFormat(i18n.language, { style: "percent" });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("palette")}
        direction="horizontal"
        value={name}
        onChange={(value) => setName(value as PaletteName)}
      >
        {(Object.keys(PALETTES) as PaletteName[]).map((key) => (
          <Radio key={key} value={key} label={t(`palettes.${key}`)} />
        ))}
      </RadioGroup>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        <BarChart
          series={bars}
          stacked
          palette={palette}
          legend={{ position: "bottom" }}
          height={280}
          ariaLabel={t("requestsAria")}
        />
        <DonutChart
          data={shares}
          palette={palette}
          labels="none"
          legend={{ position: "bottom" }}
          renderTooltip={(slice) => (
            <span>
              {slice.name} · {percent.format(slice.percent)}
            </span>
          )}
          height={280}
          ariaLabel={t("channelsAria")}
        />
      </div>
    </div>
  );
}
