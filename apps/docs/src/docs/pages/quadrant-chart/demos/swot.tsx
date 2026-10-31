import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tag } from "minerva-design";
import {
  QuadrantChart,
  quadrantOf,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/charts";

type Corner = QuadrantCorner;

// x: helpful (0) to harmful (10), y: external (0) to internal (10); the
// farther from the center, the stronger the factor
const FACTORS: [string, number, number][] = [
  ["brandLoyalty", 2, 8.5],
  ["ownPlatform", 3.6, 6.8],
  ["lowChurn", 1.4, 6.4],
  ["smallSalesTeam", 7.2, 8.1],
  ["legacyBilling", 8.6, 6.6],
  ["singleRegion", 6.1, 7.4],
  ["smbMarket", 2.4, 3.1],
  ["partnerships", 4, 1.4],
  ["aiFeatures", 1.2, 1.9],
  ["newEntrant", 7.6, 2.6],
  ["regulation", 6.4, 1.2],
  ["priceWar", 8.8, 3.8],
];

const COLORS: Record<Corner, string> = {
  topLeft: "var(--success-color)",
  topRight: "var(--warning-color)",
  bottomLeft: "var(--primary-color)",
  bottomRight: "var(--danger-color)",
};
const corner = (x: number, y: number) => quadrantOf({}, x, y);

export default function SwotDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [selected, setSelected] = useState<Corner | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const title = (c: Corner) => t(`swot.${c}`);
  const list = (items: string[]) =>
    new Intl.ListFormat(i18n.language, { type: "conjunction" }).format(items);

  const counts = useMemo(() => {
    const result: Record<Corner, number> = {
      topLeft: 0,
      topRight: 0,
      bottomLeft: 0,
      bottomRight: 0,
    };
    for (const [, x, y] of FACTORS) result[corner(x, y)] += 1;
    return result;
  }, []);

  // factors outside the selected quadrant fade to the border color
  const points = useMemo(
    (): QuadrantPoint[] =>
      FACTORS.map(([key, x, y]) => ({
        label: t(`swot.factors.${key}`),
        x,
        y,
        ...(selected && corner(x, y) !== selected
          ? { color: "var(--border-color)" }
          : {}),
      })),
    [selected, t],
  );

  const selectQuadrant = (c: Corner) => {
    if (selected === c) {
      setSelected(null);
      setStatus(null);
      return;
    }
    setSelected(c);
    setStatus(
      t("swot.quadrantItems", {
        quadrant: title(c),
        items: list(
          FACTORS.filter(([, x, y]) => corner(x, y) === c).map(([key]) =>
            t(`swot.factors.${key}`),
          ),
        ),
      }),
    );
  };

  // count badge in the inner corner of each quadrant, next to the center
  const badge = (c: Corner) => {
    const top = c.startsWith("top");
    const right = c.endsWith("Right");
    return (
      <div
        style={{
          position: "absolute",
          [top ? "bottom" : "top"]: 6,
          [right ? "left" : "right"]: 8,
        }}
      >
        <Tag size="small" color={selected === c ? "primary" : "neutral"}>
          {t("swot.count", { n: counts[c] })}
        </Tag>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={{
          topLeft: { label: title("topLeft"), color: COLORS.topLeft },
          topRight: { label: title("topRight"), color: COLORS.topRight },
          bottomLeft: { label: title("bottomLeft"), color: COLORS.bottomLeft },
          bottomRight: {
            label: title("bottomRight"),
            color: COLORS.bottomRight,
          },
        }}
        showTicks={false}
        axisLabels={{
          top: t("swot.internal"),
          bottom: t("swot.external"),
          left: t("swot.helpful"),
          right: t("swot.harmful"),
        }}
        quadrantContent={{
          topLeft: badge("topLeft"),
          topRight: badge("topRight"),
          bottomLeft: badge("bottomLeft"),
          bottomRight: badge("bottomRight"),
        }}
        onQuadrantClick={selectQuadrant}
        onPointClick={(point) => {
          const c = corner(point.x, point.y);
          setStatus(
            t("swot.factor", { factor: point.label, quadrant: title(c) }),
          );
        }}
        height={380}
        ariaLabel={t("swot.aria")}
      />
      <output aria-live="polite">{status ?? t("swot.hint")}</output>
    </div>
  );
}
