import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { DonutChart, type ShapeDatum } from "minerva-design/charts";

// Customer satisfaction survey: answers per quarter, from "very
// dissatisfied" to "very satisfied"
const LEVELS = [
  "veryDissatisfied",
  "dissatisfied",
  "neutral",
  "satisfied",
  "verySatisfied",
];
// a diverging scale: red for the unhappy answers, green for the happy ones
const COLORS = ["#dc2626", "#f97316", "#a8a29e", "#4ade80", "#16a34a"];
const QUARTERS = [
  [62, 118, 240, 410, 170],
  [55, 104, 226, 438, 197],
  [48, 96, 214, 452, 230],
  [41, 80, 198, 470, 271],
];

/** Share of "satisfied" and "very satisfied" answers, 0-1 */
const csatOf = (answers: number[]) =>
  (answers[3] + answers[4]) / answers.reduce((sum, n) => sum + n, 0);

const labelContent = ["percent"] as const;
// the CSAT in the hole is computed on every answer
const legend = { toggle: false } as const;

export default function SurveyQuartersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  const [quarter, setQuarter] = useState(QUARTERS.length - 1);

  const answers = QUARTERS[quarter];
  // same order and colors every quarter, so the slices animate in place
  const data = useMemo(
    (): ShapeDatum[] =>
      LEVELS.map((level, i) => ({
        name: t(`survey.levels.${level}`),
        value: answers[i],
        color: COLORS[i],
      })),
    [answers, t],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const points = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    [locale],
  );

  const csat = csatOf(answers);
  const respondents = answers.reduce((sum, n) => sum + n, 0);
  const quarterName = (i: number) => t("survey.quarter", { n: i + 1 });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("survey.quarterLabel")}
        direction="horizontal"
        value={quarter}
        onChange={(value) => setQuarter(Number(value))}
      >
        {QUARTERS.map((_, i) => (
          <Radio key={i} value={i} label={quarterName(i)} />
        ))}
      </RadioGroup>
      <DonutChart
        data={data}
        startAngle={-90}
        labelContent={labelContent}
        legend={legend}
        percentFormat={(share) => percent.format(share)}
        centerValue={percent.format(csat)}
        centerLabel={t("survey.csat")}
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>
              {t("survey.answers", {
                answers: number.format(slice.value),
                share: percent.format(slice.percent),
              })}
            </span>
          </div>
        )}
        height={340}
        ariaLabel={t("survey.aria", { quarter: quarterName(quarter) })}
      />
      <output aria-live="polite">
        {quarter === 0
          ? t("survey.first", {
              csat: percent.format(csat),
              respondents: number.format(respondents),
            })
          : t("survey.change", {
              csat: percent.format(csat),
              delta: points.format(
                (csat - csatOf(QUARTERS[quarter - 1])) * 100,
              ),
              previous: quarterName(quarter - 1),
              respondents: number.format(respondents),
            })}
      </output>
    </div>
  );
}
