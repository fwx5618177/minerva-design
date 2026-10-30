import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BubbleChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const stages = ["qualified", "proposal", "negotiation"] as const;

// Open deals of a sales team: days in the pipeline, win probability and
// amount (k$)
const deals = (() => {
  const random = mulberry32(3);
  return stages.map((stage, s) =>
    Array.from({ length: 14 }, (_, i) => ({
      id: `${stage}-${i}`,
      days: Math.round(5 + random() * 40 + s * 18),
      probability: Math.min(95, Math.round(15 + s * 25 + random() * 25)),
      amount: Math.round(8 + random() ** 2 * 180),
    })),
  );
})();

export default function PipelineDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<string | null>(null);
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] =>
      stages.map((stage, s) => ({
        name: t(`stages.${stage}`),
        valueName: t("amount"),
        format: usd,
        data: (deals[s] ?? []).map((d) => ({
          x: d.days,
          y: d.probability,
          value: d.amount,
          label: t("deal", { id: d.id.split("-")[1] }),
        })),
      })),
    [t, usd],
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <BubbleChart
        series={series}
        maxSize={44}
        xAxis={{ title: t("daysInPipeline") }}
        yAxis={{
          title: t("winProbability"),
          format: (v) => `${v}%`,
          min: 0,
          max: 100,
        }}
        onPointClick={(event) => {
          const item = event.items[0];
          if (item?.value !== undefined)
            setSelected(
              t("dealStatus", {
                deal: item.label,
                stage: item.seriesName,
                amount: usd(item.value),
              }),
            );
        }}
        height={340}
        ariaLabel={t("pipelineAria")}
      />
      <div role="status" style={{ color: "var(--text-secondary-color)" }}>
        {selected ?? t("clickBubble")}
      </div>
    </div>
  );
}
