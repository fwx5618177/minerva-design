import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HistogramChart } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Ages of 20,000 customers, in an Int32Array (any array of numbers works)
const ages = (() => {
  const random = mulberry32(21);
  const out = new Int32Array(20_000);
  for (let i = 0; i < out.length; i++) {
    const r = random();
    out[i] = Math.round(
      r < 0.6 ? 22 + random() * 18 + random() * 6 : 35 + random() * 40,
    );
  }
  return out;
})();

export default function AgesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const locale = i18n.language;
  const years = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "year",
      unitDisplay: "long",
    });
    return (value: number) => format.format(value);
  }, [locale]);

  // a fixed domain and 14 bins: one bin per 5 years from 15 to 85
  return (
    <HistogramChart
      values={ages}
      domain={[15, 85]}
      bins={14}
      name={t("customers")}
      color="var(--chart-series-2, #10b981)"
      formatBin={years}
      xAxis={{ title: t("age") }}
      height={280}
      ariaLabel={t("agesAria")}
    />
  );
}
