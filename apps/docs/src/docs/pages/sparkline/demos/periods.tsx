import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Tag } from "minerva-design";
import { Sparkline } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Daily revenue (€) of an online shop over the last 90 days: a slow
// summer, a back-to-school rise, then a dip in the last week
const revenue = (() => {
  const random = mulberry32(90);
  return Array.from({ length: 90 }, (_, i) => {
    const season = i < 40 ? 5200 : 5200 + (i - 40) * 45;
    const dip = i >= 83 ? 0.82 : 1;
    return Math.round(season * dip * (0.88 + random() * 0.24));
  });
})();

const periods = { week: 7, month: 30, quarter: 90 } as const;
type Period = keyof typeof periods;

export default function PeriodsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;
  const [period, setPeriod] = useState<Period>("month");

  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    [locale],
  );

  // the last N days, compared with the N days before (or, for the whole
  // quarter, its first half with its second)
  const { values, total, change, average } = useMemo(() => {
    const days = periods[period];
    const values = revenue.slice(-days);
    const sum = (list: number[]) => list.reduce((a, b) => a + b, 0);
    const total = sum(values);
    const change =
      days < revenue.length
        ? total / sum(revenue.slice(-2 * days, -days)) - 1
        : sum(revenue.slice(45)) / sum(revenue.slice(0, 45)) - 1;
    return { values, total, change, average: total / days };
  }, [period]);
  const up = change >= 0;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%", maxWidth: 480 }}>
      <RadioGroup
        aria-label={t("period")}
        direction="horizontal"
        value={period}
        onChange={(value) => setPeriod(value as Period)}
      >
        <Radio value="week" label={t("periods.week")} />
        <Radio value="month" label={t("periods.month")} />
        <Radio value="quarter" label={t("periods.quarter")} />
      </RadioGroup>
      <output
        aria-live="polite"
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <span style={{ fontSize: 24, fontWeight: 600 }}>{euros(total)}</span>
        <Tag size="small" color={up ? "success" : "danger"}>
          {percent.format(change)}
        </Tag>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {period === "quarter" ? t("vsFirstHalf") : t("vsPrevious")}
        </span>
      </output>
      <Sparkline
        data={values}
        type={period === "week" ? "bar" : "line"}
        color={up ? "var(--success-color)" : "var(--danger-color)"}
        name={t("revenue")}
        format={euros}
        // dashed line at the daily average of the period
        reference={average}
        height={64}
        ariaLabel={t("periodAria", { period: t(`periods.${period}`) })}
      />
    </div>
  );
}
