import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SunburstChart,
  type ShapeHoverEvent,
  type TreemapNode,
} from "minerva-design/charts";

type Area = [key: string, programs: [string, number][] | number];

// Yearly budget of a city, in million euros: policy areas and programs
const BUDGET: Area[] = [
  [
    "education",
    [
      ["schools", 412],
      ["universities", 96],
      ["libraries", 38],
    ],
  ],
  [
    "health",
    [
      ["hospitals", 288],
      ["prevention", 64],
    ],
  ],
  [
    "transport",
    [
      ["transit", 236],
      ["roads", 118],
      ["cycling", 42],
    ],
  ],
  [
    "safety",
    [
      ["police", 154],
      ["fire", 87],
    ],
  ],
  [
    "environment",
    [
      ["parks", 71],
      ["waste", 109],
      ["water", 83],
    ],
  ],
  ["administration", 132],
];

const TOTAL = BUDGET.reduce(
  (sum, [, programs]) =>
    sum +
    (typeof programs === "number"
      ? programs
      : programs.reduce((s, [, value]) => s + value, 0)),
  0,
);

export default function CityBudgetDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const { data, areaTotals } = useMemo(() => {
    const areaTotals = new Map<string, number>();
    const data: TreemapNode[] = BUDGET.map(([key, programs]) => {
      const name = t(`budget.areas.${key}`);
      if (typeof programs === "number") {
        areaTotals.set(name, programs);
        return { name, value: programs };
      }
      areaTotals.set(
        name,
        programs.reduce((sum, [, value]) => sum + value, 0),
      );
      return {
        name,
        children: programs.map(([program, value]) => ({
          name: t(`budget.programs.${program}`),
          value,
        })),
      };
    });
    return { data, areaTotals };
  }, [t]);
  const format = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => money.format(value * 1_000_000);
  }, [locale]);
  const percentFormat = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return (share: number) => percent.format(share);
  }, [locale]);

  // share of the city budget, and of the policy area for a program
  const describe = (node: ShapeHoverEvent) => {
    const path = node.path ?? [node.name];
    const area = path.length > 1 ? path[0] : null;
    return {
      path: path.join(" › "),
      amount: format(node.value),
      share: percentFormat(node.value / TOTAL),
      area,
      areaShare: area
        ? percentFormat(node.value / (areaTotals.get(area) ?? node.value))
        : null,
    };
  };

  const line = (node: ShapeHoverEvent) => {
    const d = describe(node);
    return d.area
      ? t("budget.programLine", d)
      : t("budget.areaLine", {
          path: d.path,
          amount: d.amount,
          share: d.share,
        });
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      {/* drill is off: a click selects a sector instead of zooming in */}
      <SunburstChart
        data={data}
        drill={false}
        innerRadius={0.32}
        format={format}
        percentFormat={percentFormat}

        renderTooltip={(node) => <span>{line(node)}</span>}
        onClick={setSelected}
        height={400}
        ariaLabel={t("budget.aria")}
      />
      <p role="status" style={{ margin: 0 }}>
        {selected ? line(selected) : t("budget.hint", { total: format(TOTAL) })}
      </p>
    </div>
  );
}
