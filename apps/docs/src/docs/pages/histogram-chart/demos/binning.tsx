import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { HistogramChart, type HistogramBinning } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Scores of 600 students in an exam out of 100: two groups of levels
const scores = (() => {
  const random = mulberry32(5);
  return Array.from({ length: 600 }, (_, i) => {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    const mean = i % 3 === 0 ? 48 : 71;
    return Math.max(0, Math.min(100, mean + z * 9));
  });
})();

const rules: Record<string, HistogramBinning> = {
  auto: "auto",
  sturges: "sturges",
  ten: 10,
  forty: 40,
};

export default function BinningDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const [rule, setRule] = useState("auto");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
      }}
    >
      <RadioGroup
        aria-label={t("binning")}
        direction="horizontal"
        value={rule}
        onChange={(value) => setRule(String(value))}
      >
        <Radio value="auto" label={t("rules.auto")} />
        <Radio value="sturges" label={t("rules.sturges")} />
        <Radio value="ten" label={t("rules.ten")} />
        <Radio value="forty" label={t("rules.forty")} />
      </RadioGroup>
      <HistogramChart
        values={scores}
        bins={rules[rule]}
        domain={[0, 100]}
        name={t("students")}
        color="var(--chart-series-6, #8b5cf6)"
        xAxis={{ title: t("score") }}
        height={280}
        ariaLabel={t("scoresAria")}
      />
    </div>
  );
}
