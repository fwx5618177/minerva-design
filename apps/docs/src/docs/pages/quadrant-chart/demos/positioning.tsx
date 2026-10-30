import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { QuadrantChart, type QuadrantPoint } from "minerva-design/charts";

// Perceptual map from a customer survey. x: price, y: perceived quality (0-10)
const brands = [
  { name: "Northwind", x: 3.5, y: 7.6, ours: true },
  { name: "Contoso", x: 8, y: 8.5 },
  { name: "Fabrikam", x: 6.5, y: 5.5 },
  { name: "Tailspin", x: 2, y: 3 },
  { name: "Litware", x: 4.5, y: 4 },
  { name: "Adatum", x: 8.8, y: 6.2 },
  { name: "Proseware", x: 1.5, y: 5.2 },
];

export default function PositioningDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });

  // our brand gets its own color and a bigger dot
  const points = useMemo(
    (): QuadrantPoint[] =>
      brands.map(({ name, x, y, ours }) =>
        ours
          ? {
              label: t("ourBrand", { name }),
              x,
              y,
              color: "var(--primary-color)",
              size: 18,
            }
          : { label: name, x, y, color: "var(--text-secondary-color)" },
      ),
    [t],
  );

  return (
    <QuadrantChart
      points={points}
      quadrants={{
        topLeft: { label: t("bestValue") },
        topRight: { label: t("premium") },
        bottomLeft: { label: t("budget") },
        bottomRight: { label: t("overpriced") },
      }}
      showTicks={false}
      axisLabels={{
        top: t("highQuality"),
        bottom: t("lowQuality"),
        left: t("lowPrice"),
        right: t("highPrice"),
      }}
      name={t("brand")}
      height={340}
      ariaLabel={t("positioningAria")}
    />
  );
}
