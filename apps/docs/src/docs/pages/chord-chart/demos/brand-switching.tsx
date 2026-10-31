import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { ChordChart, type ChordGroup } from "minerva-design/charts";

// Mobile operators (brand names are not translated) and the "other" bucket
const CARRIERS = ["Telora", "Vexa", "Mobix", "Airlink"] as const;
const COLORS = [
  "var(--chart-series-1)",
  "var(--chart-series-2)",
  "var(--chart-series-3)",
  "var(--chart-series-4)",
  "var(--text-muted-color)",
];

// Subscribers who switched operator, in thousands: row = operator left,
// column = operator joined
const YEARS: Record<number, number[][]> = {
  2023: [
    [0, 84, 52, 31, 12],
    [61, 0, 38, 22, 9],
    [44, 41, 0, 18, 7],
    [26, 19, 21, 0, 5],
    [10, 8, 9, 4, 0],
  ],
  2024: [
    [0, 112, 48, 35, 14],
    [52, 0, 34, 25, 8],
    [40, 58, 0, 21, 6],
    [24, 31, 19, 0, 6],
    [9, 12, 8, 5, 0],
  ],
  2025: [
    [0, 96, 41, 62, 13],
    [58, 0, 30, 49, 9],
    [37, 44, 0, 38, 7],
    [21, 27, 16, 0, 4],
    [8, 10, 7, 11, 0],
  ],
};
const YEAR_LIST = Object.keys(YEARS).map(Number);

export default function BrandSwitchingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const [year, setYear] = useState(2025);
  const matrix = YEARS[year]!;

  const names = useMemo(() => [...CARRIERS, t("switching.other")], [t]);
  const groups = useMemo(
    (): ChordGroup[] => names.map((name, i) => ({ name, color: COLORS[i] })),
    [names],
  );
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language, {
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => number.format(value * 1000);
  }, [i18n.language]);
  const signed = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language, {
      notation: "compact",
      maximumFractionDigits: 1,
      signDisplay: "exceptZero",
    });
    return (value: number) => number.format(value * 1000);
  }, [i18n.language]);

  // net switchers: subscribers won minus subscribers lost
  const net = names
    .map((name, i) => {
      const won = matrix.reduce((sum, row) => sum + row[i]!, 0);
      const lost = matrix[i]!.reduce((sum, value) => sum + value, 0);
      return { name, net: won - lost };
    })
    .sort((a, b) => b.net - a.net);
  const winner = net[0]!;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("switching.yearLabel")}
        direction="horizontal"
        value={year}
        onChange={(value) => setYear(Number(value))}
      >
        {YEAR_LIST.map((value) => (
          <Radio
            key={value}
            value={value}
            label={t("switching.year", { year: value })}
          />
        ))}
      </RadioGroup>
      <ChordChart
        groups={groups}
        matrix={matrix}
        directed
        ribbonColor="target"
        format={format}
        padAngle={3}
        height={420}
        ariaLabel={t("switching.aria", { year })}
      />
      <output aria-live="polite">
        {t("switching.summary", {
          name: winner.name,
          value: signed(winner.net),
          list: new Intl.ListFormat(i18n.language, { type: "unit" }).format(
            net.map((item) =>
              t("switching.net", { name: item.name, value: signed(item.net) }),
            ),
          ),
        })}
      </output>
    </div>
  );
}
