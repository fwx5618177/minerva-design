import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import {
  FunnelChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

type Channel = "search" | "social" | "email" | "partners";

// Marketing funnel of one month per acquisition channel, with its spend (USD)
const STAGES = ["impressions", "clicks", "leads", "qualified", "customers"];
const CHANNELS: Record<Channel, { values: number[]; spend: number }> = {
  search: { values: [420_000, 18_900, 2_270, 910, 182], spend: 48_000 },
  social: { values: [1_250_000, 21_300, 1_490, 450, 63], spend: 36_000 },
  email: { values: [86_000, 9_460, 1_700, 820, 148], spend: 6_500 },
  partners: { values: [64_000, 3_840, 960, 510, 121], spend: 21_000 },
};
const KEYS = Object.keys(CHANNELS) as Channel[];
const ALL = {
  values: STAGES.map((_, i) =>
    KEYS.reduce((sum, key) => sum + CHANNELS[key].values[i], 0),
  ),
  spend: KEYS.reduce((sum, key) => sum + CHANNELS[key].spend, 0),
};

export default function CampaignsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const [channel, setChannel] = useState<Channel | "all">("all");

  const { values, spend } = channel === "all" ? ALL : CHANNELS[channel];
  const data = useMemo(
    (): ShapeDatum[] =>
      STAGES.map((stage, i) => ({
        name: t(`campaigns.stages.${stage}`),
        value: values[i],
      })),
    [t, values],
  );
  const formats = useMemo(() => {
    const compact = new Intl.NumberFormat(locale, { notation: "compact" });
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 2,
    });
    const budget = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    return {
      number: (value: number) => compact.format(value),
      money: (value: number) => money.format(value),
      budget: (value: number) => budget.format(value),
      percent: (share: number) => percent.format(share),
    };
  }, [locale]);

  // conversion from the previous stage and cost of each result
  const tooltip = (event: ShapeHoverEvent) => (
    <div style={{ display: "grid", gap: 2 }}>
      <strong>{event.name}</strong>
      <span>{formats.number(event.value)}</span>
      {event.index > 0 && (
        <span>
          {t("campaigns.fromPrevious", {
            share: formats.percent(event.value / values[event.index - 1]),
          })}
        </span>
      )}
      <span>
        {t("campaigns.costPer", { cost: formats.money(spend / event.value) })}
      </span>
    </div>
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        size="small"
        style={{ width: 200 }}
        aria-label={t("campaigns.channel")}
        value={channel}
        onChange={(value) => setChannel(value as Channel | "all")}
      >
        <SelectItem value="all">{t("campaigns.channels.all")}</SelectItem>
        {KEYS.map((key) => (
          <SelectItem key={key} value={key}>
            {t(`campaigns.channels.${key}`)}
          </SelectItem>
        ))}
      </Select>
      <FunnelChart
        data={data}
        legend={false}
        format={formats.number}
        percentFormat={formats.percent}
        renderTooltip={tooltip}
        height={340}
        ariaLabel={t("campaigns.aria", {
          channel: t(`campaigns.channels.${channel}`),
        })}
      />
      <output aria-live="polite">
        {t("campaigns.summary", {
          spend: formats.budget(spend),
          customers: formats.number(values[values.length - 1]),
          cac: formats.money(spend / values[values.length - 1]),
        })}
      </output>
    </div>
  );
}
