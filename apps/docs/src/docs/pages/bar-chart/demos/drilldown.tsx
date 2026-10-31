import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  BarChart,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Monthly revenue of 2026 in thousands of dollars, January to December
const monthly = [412, 389, 455, 470, 498, 463, 441, 429, 517, 552, 648, 731];
const quarterTotal = (q: number) =>
  monthly.slice(q * 3, q * 3 + 3).reduce((sum, value) => sum + value, 0);

export default function DrilldownDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;
  // `null`: the four quarters; a number: the months of that quarter
  const [quarter, setQuarter] = useState<number | null>(null);
  const [picked, setPicked] = useState<string | null>(null);

  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const series = useMemo((): ChartSeries[] => {
    if (quarter === null) {
      return [
        {
          name: t("revenue"),
          data: [0, 1, 2, 3].map(
            (q) => [t("quarter", { n: q + 1 }), quarterTotal(q)] as const,
          ),
        },
      ];
    }
    const month = new Intl.DateTimeFormat(locale, { month: "long" });
    return [
      {
        name: t("revenue"),
        color: "var(--chart-series-2, #10b981)",
        data: [0, 1, 2].map((m) => {
          const index = quarter * 3 + m;
          return [
            month.format(new Date(2026, index, 1)),
            monthly[index] ?? 0,
          ] as const;
        }),
      },
    ];
  }, [t, locale, quarter]);

  const onPointClick = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return;
    if (quarter === null) {
      setQuarter(item.index);
      setPicked(null);
    } else {
      setPicked(t("pickedMonth", { month: event.xLabel, value: usd(item.y) }));
    }
  };
  const back = () => {
    setQuarter(null);
    setPicked(null);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
          minHeight: 32,
        }}
      >
        {quarter !== null && (
          <Button size="small" variant="outline" onClick={back}>
            {t("backToQuarters")}
          </Button>
        )}
        <output aria-live="polite">
          {quarter === null
            ? t("drillHint")
            : (picked ??
              t("quarterDetail", {
                quarter: t("quarter", { n: quarter + 1 }),
                value: usd(quarterTotal(quarter)),
              }))}
        </output>
      </div>
      <BarChart
        series={series}
        labels
        onPointClick={onPointClick}
        tooltip={{ mode: "item" }}
        yAxis={{ format: usd }}
        legend={false}
        height={300}
        ariaLabel={
          quarter === null
            ? t("quartersAria")
            : t("monthsAria", { quarter: t("quarter", { n: quarter + 1 }) })
        }
      />
    </div>
  );
}
