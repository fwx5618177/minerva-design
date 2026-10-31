import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { FunnelChart, type ShapeDatum } from "minerva-design/charts";

// What-if model of a checkout: monthly visits, today's conversion rate of
// each step and the average order value (USD)
const VISITS = 50_000;
const ORDER_VALUE = 68;
const STAGES = ["visits", "cart", "checkout", "paid"];
const BASE_RATES = [12, 55, 62]; // in percent, changed one point at a time

const ordersOf = (rates: number[]) =>
  rates.reduce((count, rate) => (count * rate) / 100, VISITS);

export default function WhatIfDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.data",
  });
  const locale = i18n.language;
  const [rates, setRates] = useState(BASE_RATES);

  const data = useMemo((): ShapeDatum[] => {
    // each stage keeps its rate of the previous one
    const counts = [VISITS];
    for (let i = 1; i < STAGES.length; i++) {
      counts.push((counts[i - 1] * rates[i - 1]) / 100);
    }
    return STAGES.map((stage, i) => ({
      name: t(`whatIf.stages.${stage}`),
      value: Math.round(counts[i]),
    }));
  }, [rates, t]);
  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    const signed = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
      signDisplay: "exceptZero",
    });
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    const signedMoney = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
      signDisplay: "exceptZero",
    });
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return {
      number: (value: number) => number.format(value),
      signed: (value: number) => signed.format(value),
      money: (value: number) => money.format(value),
      signedMoney: (value: number) => signedMoney.format(value),
      percent: (share: number) => percent.format(share),
    };
  }, [locale]);

  const change = (step: number, delta: number) =>
    setRates((current) =>
      current.map((rate, i) =>
        i === step ? Math.min(95, Math.max(1, rate + delta)) : rate,
      ),
    );
  const orders = ordersOf(rates);
  const baseOrders = ordersOf(BASE_RATES);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 16,
        alignItems: "center",
        width: "100%",
      }}
    >
      <FunnelChart
        data={data}
        legend={false}
        format={formats.number}
        percentFormat={formats.percent}
        height={320}
        ariaLabel={t("whatIf.aria")}
      />
      <div style={{ display: "grid", gap: 12 }}>
        {rates.map((rate, i) => {
          const step = t("whatIf.step", {
            from: data[i].name,
            to: data[i + 1].name,
          });
          return (
            <HStack key={STAGES[i]} gap={8} align="center" justify="between">
              <span>
                {step}: <strong>{formats.percent(rate / 100)}</strong>
              </span>
              <HStack gap={4}>
                <Button
                  size="small"
                  variant="outline"
                  aria-label={t("whatIf.lower", { step })}
                  onClick={() => change(i, -1)}
                >
                  −1
                </Button>
                <Button
                  size="small"
                  variant="outline"
                  aria-label={t("whatIf.raise", { step })}
                  onClick={() => change(i, 1)}
                >
                  +1
                </Button>
              </HStack>
            </HStack>
          );
        })}
        <Button
          size="small"
          variant="ghost"
          disabled={rates.every((rate, i) => rate === BASE_RATES[i])}
          onClick={() => setRates(BASE_RATES)}
        >
          {t("whatIf.reset")}
        </Button>
        <output aria-live="polite">
          {t("whatIf.summary", {
            orders: formats.number(orders),
            ordersDelta: formats.signed(orders - baseOrders),
            revenue: formats.money(orders * ORDER_VALUE),
            revenueDelta: formats.signedMoney(
              (orders - baseOrders) * ORDER_VALUE,
            ),
          })}
        </output>
      </div>
    </div>
  );
}
