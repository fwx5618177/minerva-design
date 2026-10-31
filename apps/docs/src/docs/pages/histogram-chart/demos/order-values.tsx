import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  HistogramChart,
  quantiles,
  type ChartAnnotation,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FREE_SHIPPING = 50; // $

// 40,000 orders of an online shop ($): most baskets are small, a few
// business orders reach thousands of dollars
const orders = (() => {
  const random = mulberry32(7);
  const values = new Float64Array(40_000);
  for (let i = 0; i < values.length; i++) {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    const business = random() < 0.04;
    values[i] = business ? Math.exp(6.2 + 0.7 * z) : Math.exp(3.6 + 0.65 * z);
  }
  return values;
})();
// binned on log10($): every bin is the same ratio wide (×1.26)
const logOrders = orders.map(Math.log10);

export default function OrderValuesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const locale = i18n.language;

  // the bins and the axis are in log10($): format them back to dollars
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumSignificantDigits: 2,
    });
    return (log: number) => format.format(10 ** log);
  }, [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  const [median, p99] = useMemo(() => quantiles(orders, [0.5, 0.99]), []);
  const eligible = useMemo(
    () =>
      orders.filter((value) => value >= FREE_SHIPPING).length / orders.length,
    [],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        x0: Math.log10(FREE_SHIPPING),
        color: "var(--success-color)",
        opacity: 0.08,
        label: t("freeShipping"),
        labelPosition: "top-right",
      },
      {
        type: "line",
        axis: "x",
        value: Math.log10(median ?? 1),
        dash: [4, 4],
        label: t("medianOrder", { value: usd(Math.log10(median ?? 1)) }),
      },
      {
        type: "line",
        axis: "x",
        value: Math.log10(p99 ?? 1),
        dash: [4, 4],
        color: "var(--warning-color)",
        label: t("p99Order", { value: usd(Math.log10(p99 ?? 1)) }),
      },
    ],
    [t, usd, median, p99],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("eligibleShare", {
          share: percent.format(eligible),
          threshold: usd(Math.log10(FREE_SHIPPING)),
        })}
      </output>
      <HistogramChart
        values={logOrders}
        domain={[0.5, 4]}
        bins={35}
        nice={false}
        name={t("orders")}
        formatBin={usd}
        xAxis={{ title: t("orderValue"), format: usd, tickCount: 8 }}
        annotations={annotations}
        height={320}
        ariaLabel={t("ordersAria")}
      />
    </div>
  );
}
