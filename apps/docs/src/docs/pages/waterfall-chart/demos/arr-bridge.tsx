import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// Annual recurring revenue of a SaaS company (M$): every quarter opens at
// the closing ARR of the previous one
const OPENING = 12.4;
const QUARTERS = [
  { newBusiness: 1.8, expansion: 0.9, contraction: -0.3, churn: -0.6 },
  { newBusiness: 2.1, expansion: 1.1, contraction: -0.4, churn: -0.5 },
  { newBusiness: 1.6, expansion: 1.3, contraction: -0.2, churn: -0.9 },
  { newBusiness: 2.6, expansion: 1.5, contraction: -0.5, churn: -0.7 },
];
const MOVES = ["newBusiness", "expansion", "contraction", "churn"] as const;

// opening ARR of every quarter
const openings = QUARTERS.reduce<number[]>(
  (list, q, i) => [
    ...list,
    i === 0
      ? OPENING
      : list[i - 1] + MOVES.reduce((sum, key) => sum + QUARTERS[i - 1][key], 0),
  ],
  [],
);

export default function ArrBridgeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const [quarter, setQuarter] = useState(3);

  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  const moves = QUARTERS[quarter];
  const opening = openings[quarter];
  const steps = useMemo(
    (): WaterfallStep[] => [
      { label: t("arr.opening"), kind: "subtotal" },
      ...MOVES.map((key) => ({ label: t(`arr.${key}`), value: moves[key] })),
      { label: t("arr.closing"), kind: "total" },
    ],
    [t, moves],
  );

  const net = MOVES.reduce((sum, key) => sum + moves[key], 0);
  // what the customers of the opening ARR pay at the end of the quarter
  const retention =
    (opening + moves.expansion + moves.contraction + moves.churn) / opening;
  const quarterName = t("arr.quarter", { n: quarter + 1 });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("arr.quarterLabel")}
        direction="horizontal"
        value={quarter}
        onChange={(value) => setQuarter(Number(value))}
      >
        {QUARTERS.map((_, i) => (
          <Radio key={i} value={i} label={t("arr.quarter", { n: i + 1 })} />
        ))}
      </RadioGroup>
      <WaterfallChart
        steps={steps}
        start={opening}
        name={t("arr.name")}
        format={usd}
        yAxis={{ format: usd, min: Math.floor(opening * 0.8) }}
        height={320}
        ariaLabel={t("arr.aria", { quarter: quarterName })}
      />
      <output aria-live="polite" style={{ color: "var(--text-muted-color)" }}>
        {t("arr.summary", {
          quarter: quarterName,
          net: usd(net),
          nrr: percent.format(retention),
        })}
      </output>
    </div>
  );
}
