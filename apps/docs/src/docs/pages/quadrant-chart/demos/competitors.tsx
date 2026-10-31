import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Select, SelectItem } from "minerva-design";
import { QuadrantChart, type QuadrantPoint } from "minerva-design/charts";

type Dimension = "price" | "features" | "ease" | "support" | "integrations";

const DIMENSIONS: Dimension[] = [
  "price",
  "features",
  "ease",
  "support",
  "integrations",
];

// Analyst scores out of 10 (price: 10 = most affordable); the first row is us
const VENDORS: { name: string; ours?: boolean; scores: number[] }[] = [
  { name: "Northwind", ours: true, scores: [7.2, 6.4, 8.6, 7.8, 5.1] },
  { name: "Contoso", scores: [3.1, 9.2, 5.4, 8.1, 8.8] },
  { name: "Fabrikam", scores: [8.4, 4.2, 7.1, 4.6, 3.9] },
  { name: "Tailspin", scores: [5.6, 7.4, 4.1, 6.2, 7.6] },
  { name: "Litware", scores: [9.1, 3.1, 8.9, 3.4, 2.8] },
  { name: "Adatum", scores: [2.4, 8.1, 6.6, 9.1, 9.3] },
  { name: "Proseware", scores: [6.3, 5.6, 3.2, 5.1, 6.4] },
];

export default function CompetitorsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [x, setX] = useState<Dimension>("ease");
  const [y, setY] = useState<Dimension>("features");
  const [selected, setSelected] = useState<number | null>(null);
  const decimal = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );

  const xi = DIMENSIONS.indexOf(x);
  const yi = DIMENSIONS.indexOf(y);
  const points = useMemo(
    (): QuadrantPoint[] =>
      VENDORS.map(({ name, ours, scores }) => ({
        label: ours ? t("comp.us", { name }) : name,
        x: scores[xi]!,
        y: scores[yi]!,
        ...(ours
          ? { color: "var(--primary-color)", size: 18 }
          : { color: "var(--text-secondary-color)" }),
      })),
    [xi, yi, t],
  );

  const picker = (
    label: string,
    value: Dimension,
    onChange: (value: Dimension) => void,
  ) => (
    <Select
      aria-label={label}
      value={value}
      onChange={(next) => {
        onChange(next as Dimension);
        setSelected(null);
      }}
      style={{ minWidth: 180 }}
    >
      {DIMENSIONS.map((dimension) => (
        <SelectItem key={dimension} value={dimension}>
          {t(`comp.dimensions.${dimension}`)}
        </SelectItem>
      ))}
    </Select>
  );

  let profile = t("comp.hint");
  if (selected !== null) {
    const vendor = VENDORS[selected]!;
    const us = VENDORS[0]!;
    const ahead = vendor.scores.filter((s, i) => s > us.scores[i]!).length;
    profile = t(vendor.ours ? "comp.ourProfile" : "comp.profile", {
      name: vendor.name,
      scores: new Intl.ListFormat(i18n.language, { type: "unit" }).format(
        DIMENSIONS.map((dimension, i) =>
          t("comp.score", {
            dimension: t(`comp.dimensions.${dimension}`),
            score: decimal.format(vendor.scores[i]!),
          }),
        ),
      ),
      ahead,
      total: DIMENSIONS.length,
    });
  }

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={12} wrap align="center">
        {picker(t("comp.xAxis"), x, setX)}
        {picker(t("comp.yAxis"), y, setY)}
      </HStack>
      <QuadrantChart
        points={points}
        quadrants={{
          topLeft: { color: "var(--chart-series-2)" },
          topRight: {
            label: t("comp.strongBoth"),
            color: "var(--success-color)",
          },
          bottomLeft: {
            label: t("comp.weakBoth"),
            color: "var(--text-muted-color)",
          },
          bottomRight: { color: "var(--chart-series-2)" },
        }}
        xLabel={t(`comp.dimensions.${x}`)}
        yLabel={t(`comp.dimensions.${y}`)}
        onPointClick={(_point, index) => setSelected(index)}
        onQuadrantClick={() => setSelected(null)}
        height={380}
        ariaLabel={t("comp.aria", {
          x: t(`comp.dimensions.${x}`),
          y: t(`comp.dimensions.${y}`),
        })}
      />
      <output aria-live="polite">{profile}</output>
    </div>
  );
}
