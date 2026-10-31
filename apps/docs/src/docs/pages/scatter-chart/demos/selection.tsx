import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const departments = ["engineering", "sales", "support"] as const;

interface Employee {
  id: string;
  /** Years in the company */
  tenure: number;
  /** Last review, 1-5 */
  score: number;
  /** Yearly salary, USD */
  salary: number;
}

// 30 employees per department: tenure against the last performance review
const staff: Employee[][] = departments.map((_, d) => {
  const random = mulberry32(300 + d);
  return Array.from({ length: 30 }, (_, i) => {
    const tenure = Math.round(random() ** 1.4 * 14 * 10) / 10;
    const score = Math.min(
      5,
      Math.max(1, 2.6 + tenure * 0.08 + (random() - 0.4) * 2),
    );
    return {
      id: `E-${1000 + d * 100 + i}`,
      tenure,
      score: Math.round(score * 10) / 10,
      salary: Math.round((52 + d * 6 + tenure * 3.2 + random() * 18) * 1000),
    };
  });
});
const all = staff.flat();
const averageScore = all.reduce((sum, e) => sum + e.score, 0) / all.length;

interface Selection {
  department: number;
  index: number;
}

export default function SelectionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<Selection | null>(null);

  // the selected dot is bigger and labelled (showLabels draws the points
  // that have a label)
  const series = useMemo(
    (): ChartSeries[] =>
      departments.map((key, d) => ({
        name: t(`departments.${key}`),
        showLabels: true,
        opacity: 0.75,
        data: (staff[d] ?? []).map((e, i) =>
          selected?.department === d && selected.index === i
            ? { x: e.tenure, y: e.score, size: 16, label: e.id }
            : { x: e.tenure, y: e.score },
        ),
      })),
    [t, selected],
  );
  const years = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "year",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const decimal = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
    [locale],
  );
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  const employee = selected
    ? staff[selected.department]?.[selected.index]
    : undefined;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <ScatterChart
        series={series}
        xAxis={{ title: t("tenure"), format: (value) => years.format(value) }}
        yAxis={{ title: t("reviewScore"), min: 1, max: 5 }}
        annotations={[
          {
            type: "line",
            axis: "y",
            value: averageScore,
            dash: [4, 4],
            label: t("companyAverage"),
          },
        ]}
        onPointClick={(event) => {
          const item = event.items[0];
          if (item)
            setSelected({ department: item.seriesIndex, index: item.index });
        }}
        // a click on the empty plot clears the selection
        onPlotClick={() => setSelected(null)}
        height={320}
        ariaLabel={t("staffAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {employee && selected
          ? t("employeeStatus", {
              id: employee.id,
              department: t(`departments.${departments[selected.department]}`),
              tenure: years.format(employee.tenure),
              score: decimal.format(employee.score),
              salary: usd.format(employee.salary),
            })
          : t("employeeHint")}
      </output>
    </div>
  );
}
