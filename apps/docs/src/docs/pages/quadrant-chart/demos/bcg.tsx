import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  QuadrantChart,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/charts";

// BCG matrix of a product portfolio. x: relative market share (our share /
// the leader's share, 1 = leader), y: market growth (% per year), revenue in
// million USD sets the size of the dots
const products = [
  { key: "cloud", share: 1.6, growth: 18, revenue: 420 },
  { key: "analytics", share: 0.45, growth: 22, revenue: 95 },
  { key: "mobile", share: 0.3, growth: 14, revenue: 60 },
  { key: "licenses", share: 1.8, growth: 3, revenue: 610 },
  { key: "support", share: 1.2, growth: 5, revenue: 280 },
  { key: "hardware", share: 0.4, growth: -2, revenue: 70 },
  { key: "training", share: 0.6, growth: 4, revenue: 40 },
];

export default function BcgDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });

  const points = useMemo(
    (): QuadrantPoint[] =>
      products.map(({ key, share, growth, revenue }) => ({
        label: t(`products.${key}`),
        x: share,
        y: growth,
        size: 8 + Math.sqrt(revenue) * 1.2,
      })),
    [t],
  );
  // reverseX: by convention the high shares are on the left
  const quadrants = useMemo(
    (): QuadrantRegions => ({
      topLeft: { label: t("stars"), color: "var(--success-color)" },
      topRight: { label: t("questionMarks"), color: "var(--warning-color)" },
      bottomLeft: { label: t("cashCows"), color: "var(--primary-color)" },
      bottomRight: { label: t("dogs"), color: "var(--danger-color)" },
    }),
    [t],
  );

  return (
    <QuadrantChart
      points={points}
      quadrants={quadrants}
      xDomain={[0, 2]}
      xSplit={1}
      yDomain={[-5, 25]}
      ySplit={10}
      reverseX
      xLabel={t("relativeShare")}
      yLabel={t("marketGrowth")}
      name={t("product")}
      height={360}
      ariaLabel={t("bcgAria")}
    />
  );
}
