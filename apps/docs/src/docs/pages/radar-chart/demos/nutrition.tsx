import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Nutrients of three breakfasts, with the reference daily values: the axes
// show the percent of the daily value, the tooltip the amounts
const NUTRIENTS = [
  { key: "protein", unit: "gram", daily: 50 },
  { key: "fiber", unit: "gram", daily: 28 },
  { key: "sugar", unit: "gram", daily: 50 },
  { key: "fat", unit: "gram", daily: 78 },
  { key: "sodium", unit: "mg", daily: 2300 },
  { key: "calcium", unit: "mg", daily: 1300 },
] as const;
const MEALS = [
  { key: "oatmeal", amounts: [10, 8, 12, 6, 120, 180], color: "#d97706" },
  { key: "eggs", amounts: [19, 3, 2, 15, 520, 110], color: "#2563eb" },
  { key: "yogurt", amounts: [17, 4, 24, 9, 140, 300], color: "#db2777" },
];

export default function NutritionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const locale = i18n.language;

  // every axis from 0 to 50% of the daily value
  const indicators = useMemo(
    (): RadarIndicator[] =>
      NUTRIENTS.map(({ key }) => ({
        name: t(`nutrition.nutrients.${key}`),
        max: 50,
      })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] =>
      MEALS.map(({ key, amounts, color }) => ({
        name: t(`nutrition.meals.${key}`),
        values: amounts.map((amount, i) => (amount / NUTRIENTS[i].daily) * 100),
        color,
        opacity: 0.12,
      })),
    [t],
  );
  const formats = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 0,
    });
    // Intl has no milligram unit: "mg" is the same symbol in every language
    const number = new Intl.NumberFormat(locale);
    const grams = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "gram",
    });
    const amounts = NUTRIENTS.map(({ unit }) =>
      unit === "gram"
        ? (value: number) => grams.format(value)
        : (value: number) => `${number.format(value)} mg`,
    );
    return {
      dailyValue: (value: number) =>
        t("nutrition.dailyValue", { value: percent.format(value / 100) }),
      amount: (nutrient: number, value: number) => amounts[nutrient](value),
    };
  }, [locale, t]);

  // one row per breakfast for the nutrient under the pointer
  const tooltip = (event: ShapeHoverEvent) => {
    const nutrient = event.indicator ?? 0;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{indicators[nutrient].name}</strong>
        {MEALS.map((meal, i) => (
          <span
            key={meal.key}
            style={{
              fontWeight: series[i].name === event.name ? 600 : undefined,
            }}
          >
            {t("nutrition.row", {
              meal: series[i].name,
              amount: formats.amount(nutrient, meal.amounts[nutrient]),
              share: formats.dailyValue(series[i].values[nutrient]),
            })}
          </span>
        ))}
      </div>
    );
  };

  return (
    <RadarChart
      indicators={indicators}
      series={series}
      shape="circle"
      levels={5}
      format={formats.dailyValue}
      renderTooltip={tooltip}
      height={380}
      ariaLabel={t("nutrition.aria")}
    />
  );
}
