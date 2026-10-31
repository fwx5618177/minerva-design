import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ChordChart,
  type ChordLink,
  type ShapeHoverEvent,
} from "minerva-design/charts";

const CATEGORIES = [
  "coffee",
  "milk",
  "bread",
  "pastries",
  "fruit",
  "cereal",
  "yogurt",
  "juice",
] as const;
type Category = (typeof CATEGORIES)[number];

// Baskets of a month where two categories were bought together, out of
// 48,000 baskets
const BASKETS = 48000;
const TOGETHER: [Category, Category, number][] = [
  ["coffee", "milk", 3120],
  ["coffee", "pastries", 2460],
  ["coffee", "bread", 980],
  ["milk", "cereal", 2780],
  ["milk", "bread", 1640],
  ["milk", "yogurt", 920],
  ["bread", "pastries", 610],
  ["bread", "fruit", 740],
  ["fruit", "yogurt", 1980],
  ["fruit", "juice", 1210],
  ["fruit", "cereal", 860],
  ["cereal", "yogurt", 1130],
  ["juice", "pastries", 540],
  ["juice", "cereal", 420],
];

export default function CoPurchaseDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const groups = useMemo(
    () => CATEGORIES.map((category) => t(`basket.categories.${category}`)),
    [t],
  );
  const links = useMemo(
    (): ChordLink[] =>
      TOGETHER.map(([a, b, value]) => ({
        source: CATEGORIES.indexOf(a),
        target: CATEGORIES.indexOf(b),
        value,
      })),
    [],
  );
  const { number, compact, percent } = useMemo(
    () => ({
      number: new Intl.NumberFormat(i18n.language),
      compact: new Intl.NumberFormat(i18n.language, {
        notation: "compact",
        maximumFractionDigits: 1,
      }),
      percent: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    }),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) => number.format(value),
    [number],
  );
  const tickFormat = useMemo(
    () => (value: number) => compact.format(value),
    [compact],
  );

  const tooltip = (event: ShapeHoverEvent) =>
    event.source && event.target ? (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>
          {t("basket.pair", { a: event.source, b: event.target })}
        </strong>
        <span>
          {t("basket.together", {
            value: number.format(event.value),
            share: percent.format(event.value / BASKETS),
          })}
        </span>
      </div>
    ) : (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{event.name}</strong>
        <span>
          {t("basket.withOthers", { value: number.format(event.value) })}
        </span>
      </div>
    );

  return (
    <ChordChart
      groups={groups}
      links={links}
      sortGroups="descending"
      sortSubgroups="descending"
      ticks={1000}
      tickFormat={tickFormat}
      format={format}
      renderTooltip={tooltip}
      legend={false}
      height={440}
      ariaLabel={t("basket.aria")}
    />
  );
}
