import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

// Open B2B deals by pipeline stage (amounts in USD) and the win
// probability of each stage, used for the weighted forecast
const PIPELINE: {
  key: string;
  probability: number;
  deals: [string, number][];
}[] = [
  {
    key: "lead",
    probability: 0.1,
    deals: [
      ["Acme Corp", 12_000],
      ["Brightline", 8_000],
      ["Cobalt Labs", 15_000],
      ["Dunmore", 6_000],
      ["Evergreen", 9_000],
      ["Fieldstone", 11_000],
      ["Granite & Co", 7_000],
    ],
  },
  {
    key: "qualified",
    probability: 0.25,
    deals: [
      ["Harbor Health", 14_000],
      ["Ironwood", 18_000],
      ["Juniper", 9_000],
      ["Keystone", 12_000],
      ["Lakeside", 7_000],
    ],
  },
  {
    key: "demo",
    probability: 0.4,
    deals: [
      ["Meridian", 21_000],
      ["Northwind", 16_000],
      ["Oakridge", 11_000],
    ],
  },
  {
    key: "proposal",
    probability: 0.6,
    deals: [
      ["Pinnacle", 24_000],
      ["Quarry Works", 13_000],
    ],
  },
  {
    key: "negotiation",
    probability: 0.8,
    deals: [
      ["Redwood", 19_000],
      ["Summit Bank", 9_000],
    ],
  },
];

const amountOf = (deals: [string, number][]) =>
  deals.reduce((sum, [, amount]) => sum + amount, 0);
const FORECAST = PIPELINE.reduce(
  (sum, stage) => sum + amountOf(stage.deals) * stage.probability,
  0,
);

export default function SalesPipelineDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const [stage, setStage] = useState<number | null>(null);

  const data = useMemo(
    (): ShapeDatum[] =>
      PIPELINE.map(({ key, deals }) => ({
        name: t(`pipeline.stages.${key}`),
        value: amountOf(deals),
      })),
    [t],
  );
  const formats = useMemo(() => {
    const compact = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    const full = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    const percent = new Intl.NumberFormat(locale, { style: "percent" });
    return {
      compact: (value: number) => compact.format(value),
      full: (value: number) => full.format(value),
      percent: (share: number) => percent.format(share),
    };
  }, [locale]);

  const open = stage === null ? null : PIPELINE[stage];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 16,
        alignItems: "start",
        width: "100%",
      }}
    >
      {/* the stages hold different deals: a conversion rate between them
          would be misleading, so it is hidden */}
      <FunnelChart
        data={data}
        conversion={false}
        legend={false}
        format={formats.compact}
        renderTooltip={(event) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{event.name}</strong>
            <span>
              {t("pipeline.dealsAmount", {
                deals: PIPELINE[event.index].deals.length,
                amount: formats.full(event.value),
              })}
            </span>
            <span>
              {t("pipeline.probability", {
                share: formats.percent(PIPELINE[event.index].probability),
              })}
            </span>
          </div>
        )}
        onClick={(event) => setStage(event.index)}
        height={320}
        ariaLabel={t("pipeline.aria")}
      />
      <section aria-live="polite" style={{ display: "grid", gap: 8 }}>
        <strong>
          {open && stage !== null
            ? t("pipeline.stageTitle", {
                stage: data[stage].name,
                deals: open.deals.length,
              })
            : t("pipeline.forecast", { amount: formats.full(FORECAST) })}
        </strong>
        {open ? (
          <ul style={{ margin: 0, paddingInlineStart: 20 }}>
            {[...open.deals]
              .sort((a, b) => b[1] - a[1])
              .map(([company, amount]) => (
                <li key={company}>
                  {company} · {formats.full(amount)}
                </li>
              ))}
          </ul>
        ) : (
          <span style={{ color: "var(--text-secondary-color)" }}>
            {t("pipeline.hint")}
          </span>
        )}
      </section>
    </div>
  );
}
