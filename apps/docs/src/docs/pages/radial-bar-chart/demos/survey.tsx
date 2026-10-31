import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

type Order = "survey" | "highest" | "lowest";

// Employee engagement survey: respondents who agree with each statement,
// out of those who answered it
const STATEMENTS: [key: string, agree: number, answered: number][] = [
  ["valued", 312, 418],
  ["goals", 351, 420],
  ["growth", 226, 409],
  ["balance", 268, 415],
  ["manager", 334, 412],
  ["recommend", 297, 417],
];
const ORDERS: Order[] = ["survey", "highest", "lowest"];
const share = ([, agree, answered]: (typeof STATEMENTS)[number]) =>
  agree / answered;

const labelContent = ["name", "percent"] as const;

export default function SurveyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const locale = i18n.language;
  const [order, setOrder] = useState<Order>("survey");

  const rows = useMemo(() => {
    if (order === "survey") return STATEMENTS;
    const sign = order === "highest" ? -1 : 1;
    return [...STATEMENTS].sort((a, b) => sign * (share(a) - share(b)));
  }, [order]);
  const data = useMemo(
    (): RadialBarDatum[] =>
      rows.map(([key, agree, answered]) => ({
        name: t(`survey.statements.${key}`),
        value: agree,
        max: answered,
      })),
    [rows, t],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const average =
    STATEMENTS.reduce((sum, row) => sum + share(row), 0) / STATEMENTS.length;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        size="small"
        style={{ width: 220 }}
        aria-label={t("survey.order")}
        value={order}
        onChange={(value) => setOrder(value as Order)}
      >
        {ORDERS.map((key) => (
          <SelectItem key={key} value={key}>
            {t(`survey.orders.${key}`)}
          </SelectItem>
        ))}
      </Select>
      <RadialBarChart
        data={data}
        innerRadius={0.3}
        gap={0.22}
        labelContent={labelContent}
        percentFormat={(value) => percent.format(value)}
        centerValue={percent.format(average)}
        centerLabel={t("survey.average")}
        renderTooltip={(bar) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{bar.name}</strong>
            <span>
              {t("survey.agree", {
                agree: number.format(bar.value),
                answered: number.format(rows[bar.index][2]),
                share: percent.format(bar.percent),
              })}
            </span>
          </div>
        )}
        height={360}
        ariaLabel={t("survey.aria")}
      />
    </div>
  );
}
