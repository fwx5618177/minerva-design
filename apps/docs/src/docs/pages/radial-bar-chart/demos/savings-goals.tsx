import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

// Savings goals of a household, in euros: saved so far, the goal and the
// monthly transfer to each pot
const GOALS: [key: string, saved: number, goal: number, monthly: number][] = [
  ["emergency", 7400, 9000, 400],
  ["holiday", 1850, 3200, 250],
  ["laptop", 1100, 1600, 150],
  ["deposit", 12600, 40000, 900],
];

const labelContent = ["name", "percent"] as const;

export default function SavingsGoalsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<number | null>(null);

  const data = useMemo(
    (): RadialBarDatum[] =>
      GOALS.map(([key, saved, goal]) => ({
        name: t(`savings.goals.${key}`),
        value: saved,
        max: goal,
      })),
    [t],
  );
  const money = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    [locale],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const saved = GOALS.reduce((sum, [, value]) => sum + value, 0);
  const goal = GOALS.reduce((sum, [, , value]) => sum + value, 0);

  const detail = () => {
    if (selected === null) return t("savings.hint");
    const [, value, target, monthly] = GOALS[selected];
    const remaining = target - value;
    return t("savings.detail", {
      goal: data[selected].name,
      saved: money.format(value),
      target: money.format(target),
      remaining: money.format(remaining),
      months: number.format(Math.ceil(remaining / monthly)),
      monthly: money.format(monthly),
    });
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadialBarChart
        data={data}
        innerRadius={0.36}
        labelContent={labelContent}
        format={(value) => money.format(value)}
        percentFormat={(share) => percent.format(share)}
        centerValue={percent.format(saved / goal)}
        centerLabel={t("savings.overall")}
        onClick={(event) => setSelected(event.index)}
        height={340}
        ariaLabel={t("savings.aria")}
      />
      <output aria-live="polite">{detail()}</output>
    </div>
  );
}
