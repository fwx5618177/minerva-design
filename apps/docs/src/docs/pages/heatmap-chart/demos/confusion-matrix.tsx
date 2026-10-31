import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  HeatmapChart,
  type ChartHoverEvent,
  type HeatmapCell,
} from "minerva-design/charts";

// Test set of an image classifier: rows are the actual classes, columns
// the predicted ones (cats and dogs, cars and trucks get confused)
const classes = ["cat", "dog", "bird", "car", "truck"];
const matrix = [
  [412, 61, 18, 2, 1],
  [48, 431, 9, 4, 3],
  [22, 14, 455, 6, 2],
  [1, 2, 3, 447, 52],
  [2, 1, 1, 71, 418],
];
const actualTotals = matrix.map((row) => row.reduce((a, b) => a + b, 0));
const predictedTotals = classes.map((_, j) =>
  matrix.reduce((sum, row) => sum + (row[j] ?? 0), 0),
);
const total = actualTotals.reduce((a, b) => a + b, 0);
const correct = matrix.reduce((sum, row, i) => sum + (row[i] ?? 0), 0);
// the cells in the order of `data`: row by row
const cells = matrix.flatMap((row, i) =>
  row.map((n, j) => ({ actual: i, predicted: j, n })),
);

export default function ConfusionMatrixDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;

  const names = useMemo(() => classes.map((key) => t(`classes.${key}`)), [t]);
  // share of the actual class in each cell: rows add up to 100 %
  const data = useMemo(
    (): HeatmapCell[] =>
      cells.map(({ actual, predicted, n }) => ({
        x: names[predicted] ?? "",
        y: names[actual] ?? "",
        value: n / (actualTotals[actual] ?? 1),
      })),
    [names],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items[0];
    const cell = item ? cells[item.index] : undefined;
    if (!cell) return null;
    const { actual, predicted, n } = cell;
    const hit = actual === predicted;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>
          {t("actualPredicted", {
            actual: names[actual],
            predicted: names[predicted],
          })}
        </strong>
        <span>
          {t("imagesShare", {
            value: number.format(n),
            share: percent.format(n / (actualTotals[actual] ?? 1)),
          })}
        </span>
        {hit ? (
          <>
            <span style={{ color: "var(--success-color)" }}>
              {t("recall", {
                value: percent.format(n / (actualTotals[actual] ?? 1)),
              })}
            </span>
            <span style={{ color: "var(--success-color)" }}>
              {t("precision", {
                value: percent.format(n / (predictedTotals[predicted] ?? 1)),
              })}
            </span>
          </>
        ) : (
          <span style={{ color: "var(--danger-color)" }}>
            {t("misclassified")}
          </span>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("accuracy", {
          value: percent.format(correct / total),
          images: number.format(total),
        })}
      </output>
      <HeatmapChart
        data={data}
        xCategories={names}
        // first class at the top, like a table
        yCategories={[...names].reverse()}
        valueRange={[0, 1]}
        name={t("shareOfClass")}
        format={(value) => percent.format(value)}
        xAxis={{ title: t("predicted") }}
        yAxis={{ title: t("actual") }}
        renderTooltip={tooltip}
        height={360}
        ariaLabel={t("confusionAria")}
      />
    </div>
  );
}
