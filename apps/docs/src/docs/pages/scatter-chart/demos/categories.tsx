import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(3);
const gaussian = () =>
  Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());

// Flipper length (mm) and body mass (g) of three penguin species
const species = (flipper: number, mass: number, count: number) =>
  Array.from({ length: count }, () => {
    const size = gaussian();
    return [
      Math.round(flipper + size * 6 + gaussian() * 2),
      Math.round(mass + size * 380 + gaussian() * 160),
    ] as const;
  });
const adelie = species(190, 3700, 70);
const chinstrap = species(196, 3730, 45);
const gentoo = species(217, 5080, 60);

export default function CategoriesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  // one series per category: its own color, legend entry and toggle
  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("penguins.adelie"), data: adelie, opacity: 0.8 },
      { name: t("penguins.chinstrap"), data: chinstrap, opacity: 0.8 },
      { name: t("penguins.gentoo"), data: gentoo, opacity: 0.8 },
    ],
    [t],
  );
  const mm = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "millimeter" }),
    [locale],
  );
  const kg = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "kilogram",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <ScatterChart
      series={series}
      xAxis={{ title: t("flipper"), format: (value) => mm.format(value) }}
      yAxis={{ title: t("mass"), format: (value) => kg.format(value / 1000) }}
      height={320}
      ariaLabel={t("penguinsAria")}
    />
  );
}
