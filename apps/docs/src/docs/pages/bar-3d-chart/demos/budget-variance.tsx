import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Select, SelectItem } from "minerva-design";
import {
  Bar3DChart,
  type Bar3DDatum,
  type Bar3DSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DEPARTMENTS = [
  "engineering",
  "sales",
  "marketing",
  "operations",
  "support",
  "finance",
] as const;
const QUARTERS = ["q1", "q2", "q3", "q4"] as const;
const YEARS = ["2024", "2025", "2026"] as const;
type Year = (typeof YEARS)[number];
// quarterly budget of each department, in USD
const BUDGET = [820e3, 540e3, 410e3, 360e3, 220e3, 150e3];
const LIMIT = 0.25;

interface Cell {
  department: number;
  quarter: number;
  budget: number;
  actual: number;
  variance: number; // (actual − budget) / budget
}

/** Budget and actual spend of a year: the budget grows, the variance is random */
const yearOf = (year: Year): Cell[] => {
  const random = mulberry32(Number(year));
  const growth = 1 + 0.06 * (Number(year) - 2024);
  return DEPARTMENTS.flatMap((_, department) =>
    QUARTERS.map((_, quarter) => {
      const budget = BUDGET[department]! * growth;
      // marketing overspends late in the year, support runs lean
      const bias =
        department === 2 ? quarter * 0.04 : department === 4 ? -0.06 : 0;
      const variance = Math.max(
        -LIMIT,
        Math.min(LIMIT, bias + (random() - 0.5) * 0.24),
      );
      return {
        department,
        quarter,
        budget,
        actual: budget * (1 + variance),
        variance,
      };
    }),
  );
};

export default function BudgetVarianceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const [year, setYear] = useState<Year>("2025");
  const [picked, setPicked] = useState<Cell | null>(null);
  const cells = useMemo(() => yearOf(year), [year]);
  const formats = useMemo(
    () => ({
      usd: new Intl.NumberFormat(i18n.language, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
      variance: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    }),
    [i18n.language],
  );

  const series = useMemo((): Bar3DSeries[] => {
    const data: Bar3DDatum[] = cells.map((cell) => ({
      x: cell.quarter,
      y: cell.department,
      z: cell.actual,
      value: cell.variance,
    }));
    return [
      {
        name: t("actualSpend"),
        data,
        colorBy: "value",
        format: (value) => formats.variance.format(value),
      },
    ];
  }, [t, cells, formats]);

  const name = (cell: Cell) => ({
    department: t(`departments.${DEPARTMENTS[cell.department]}`),
    quarter: t(`quarters.${QUARTERS[cell.quarter]}`),
  });
  const budget = cells.reduce((sum, cell) => sum + cell.budget, 0);
  const actual = cells.reduce((sum, cell) => sum + cell.actual, 0);
  const worst = cells.reduce((a, b) => (b.variance > a.variance ? b : a));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} align="center">
        <span>{t("fiscalYear")}</span>
        <Select
          aria-label={t("fiscalYear")}
          size="small"
          value={year}
          onChange={(value) => {
            setYear(value as Year);
            setPicked(null);
          }}
        >
          {YEARS.map((id) => (
            <SelectItem key={id} value={id}>
              {id}
            </SelectItem>
          ))}
        </Select>
      </HStack>
      <Bar3DChart
        series={series}
        xAxis={{
          title: t("quarter"),
          categories: QUARTERS.map((id) => t(`quarters.${id}`)),
        }}
        yAxis={{
          title: t("department"),
          categories: DEPARTMENTS.map((id) => t(`departments.${id}`)),
        }}
        zAxis={{
          title: t("actualSpend"),
          format: (value) => formats.usd.format(value),
        }}
        colorScale="coolwarm"
        // symmetric around zero: on budget is the neutral middle color
        valueRange={[-LIMIT, LIMIT]}
        colorBar={{
          title: t("varianceToBudget"),
          format: (value) => formats.variance.format(value),
        }}
        camera={{ azimuth: 35, elevation: 26 }}
        height={460}
        ariaLabel={t("budgetAria", { year })}
        onPointClick={(event) => setPicked(cells[event.index] ?? null)}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {picked
          ? t("varianceDetail", {
              ...name(picked),
              actual: formats.usd.format(picked.actual),
              budget: formats.usd.format(picked.budget),
              variance: formats.variance.format(picked.variance),
            })
          : t("budgetSummary", {
              year,
              actual: formats.usd.format(actual),
              budget: formats.usd.format(budget),
              variance: formats.variance.format((actual - budget) / budget),
              ...name(worst),
              worst: formats.variance.format(worst.variance),
            })}
      </output>
    </div>
  );
}
