import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DonutChart,
  PieChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Household budget per month (EUR): categories inside, items outside
const budget = [
  {
    key: "housing",
    color: "#6366f1",
    items: [
      ["rent", 1150],
      ["energy", 140],
      ["insurance", 45],
    ],
  },
  {
    key: "food",
    color: "#f59e0b",
    items: [
      ["groceries", 420],
      ["restaurants", 160],
    ],
  },
  {
    key: "transport",
    color: "#14b8a6",
    items: [
      ["transit", 86],
      ["car", 210],
    ],
  },
  {
    key: "leisure",
    color: "#ec4899",
    items: [
      ["travel", 180],
      ["subscriptions", 42],
      ["sport", 55],
    ],
  },
] as const;

/** Mixes a #rrggbb color with white: 0 = unchanged, 1 = white */
const lighten = (hex: string, amount: number) => {
  const channel = (i: number) => {
    const value = parseInt(hex.slice(i, i + 2), 16);
    return Math.round(value + (255 - value) * amount)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${channel(1)}${channel(3)}${channel(5)}`;
};

const nameOnly = ["name"] as const;
const HEIGHT = 340;
// the inner pie fills the hole of the outer donut (innerRadius 0.7)
const INNER = Math.round((HEIGHT - 16) * 0.7) - 8;

export default function NestedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  const { categories, items } = useMemo(() => {
    const categories: ShapeDatum[] = budget.map((category) => ({
      name: t(`budget.${category.key}`),
      value: category.items.reduce((sum, [, value]) => sum + value, 0),
      color: category.color,
    }));
    // the items of a category take lighter shades of its color
    const items: ShapeDatum[] = budget.flatMap((category) =>
      category.items.map(([key, value], i) => ({
        name: t(`budget.${key}`),
        value,
        color: lighten(category.color, 0.1 + i * 0.25),
      })),
    );
    return { categories, items };
  }, [t]);
  const euros = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    [locale],
  );
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
  });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div style={{ position: "relative", height: HEIGHT }}>
        <DonutChart
          data={items}
          innerRadius={0.7}
          labels="none"
          legend={false}
          tooltip={false}
          onHover={setHovered}
          height={HEIGHT}
          ariaLabel={t("itemsAria")}
        />
        {/* the clip keeps the corners of the square free for the outer ring */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: INNER,
            height: INNER,
            transform: "translate(-50%, -50%)",
            clipPath: "circle(50%)",
          }}
        >
          <PieChart
            data={categories}
            labels="inside"
            labelContent={nameOnly}
            legend={false}
            tooltip={false}
            onHover={setHovered}
            height={INNER}
            ariaLabel={t("categoriesAria")}
          />
        </div>
      </div>
      <p role="status">
        {hovered
          ? t("budgetLine", {
              name: hovered.name,
              amount: euros.format(hovered.value),
              share: percent.format(hovered.percent),
            })
          : t("hoverRing")}
      </p>
    </div>
  );
}
