import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Table, type TableColumn } from "minerva-design";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

// Checkout funnel of an online shop over one week
const stages = [
  { key: "visits", value: 182_400 },
  { key: "product", value: 96_300 },
  { key: "cart", value: 21_700 },
  { key: "checkout", value: 11_900 },
  { key: "payment", value: 8_350 },
  { key: "order", value: 7_480 },
];

interface Step {
  key: string;
  value: number;
  /** Visitors lost since the previous stage, 0-1 */
  dropOff: number;
}

const steps: Step[] = stages.map((stage, i) => ({
  ...stage,
  dropOff: i === 0 ? 0 : 1 - stage.value / stages[i - 1].value,
}));
// the stage that loses the most visitors
const worst = steps.reduce((a, b) => (b.dropOff > a.dropOff ? b : a));

export default function EcommerceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const number = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  // the stage with the biggest drop-off is highlighted in red
  const data = useMemo(
    (): ShapeDatum[] =>
      steps.map((step) => ({
        name: t(`shop.${step.key}`),
        value: step.value,
        color: step === worst ? "var(--danger-color)" : undefined,
      })),
    [t],
  );
  const columns = useMemo(
    (): TableColumn<Step>[] => [
      { key: "stage", header: t("stage"), render: (s) => t(`shop.${s.key}`) },
      {
        key: "value",
        header: t("visitors"),
        align: "right",
        render: (s) => number.format(s.value),
      },
      {
        key: "dropOff",
        header: t("dropOff"),
        align: "right",
        render: (s) =>
          s.dropOff === 0 ? (
            "–"
          ) : (
            <span
              style={{
                color: s === worst ? "var(--danger-color)" : undefined,
                fontWeight: s === worst ? 600 : undefined,
              }}
            >
              {percent.format(-s.dropOff)}
            </span>
          ),
      },
    ],
    [t, number, percent],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 16,
        alignItems: "center",
        width: "100%",
      }}
    >
      <FunnelChart
        data={data}
        legend={false}
        format={(value) => number.format(value)}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(event) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{event.name}</strong>
            <span>{number.format(event.value)}</span>
            <span>
              {t("conversionOverall", { share: percent.format(event.percent) })}
            </span>
          </div>
        )}
        height={340}
        ariaLabel={t("shopAria")}
      />
      <Table
        aria-label={t("dropOffTable")}
        columns={columns}
        data={steps}
        rowKey={(s) => s.key}
        size="small"
      />
    </div>
  );
}
