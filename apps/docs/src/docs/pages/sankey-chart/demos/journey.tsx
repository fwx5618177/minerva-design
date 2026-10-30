import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
  type ShapeHoverEvent,
} from "minerva-design/charts";

type Step =
  | "searchAds"
  | "organic"
  | "newsletter"
  | "social"
  | "home"
  | "pricing"
  | "blog"
  | "signup"
  | "left"
  | "trial"
  | "abandoned"
  | "paid"
  | "expired";

const STEPS: Step[] = [
  "searchAds",
  "organic",
  "newsletter",
  "social",
  "home",
  "pricing",
  "blog",
  "signup",
  "left",
  "trial",
  "abandoned",
  "paid",
  "expired",
];

// Sessions of one week, from the acquisition channel to the subscription
const PATHS: [Step, Step, number][] = [
  ["searchAds", "home", 4200],
  ["searchAds", "pricing", 2600],
  ["organic", "home", 3800],
  ["organic", "blog", 5200],
  ["newsletter", "blog", 1900],
  ["newsletter", "pricing", 900],
  ["social", "blog", 2400],
  ["social", "home", 1100],
  ["home", "signup", 3100],
  ["home", "left", 6000],
  ["pricing", "signup", 2100],
  ["pricing", "left", 1400],
  ["blog", "signup", 1300],
  ["blog", "left", 8200],
  ["signup", "trial", 4700],
  ["signup", "abandoned", 1800],
  ["trial", "paid", 1300],
  ["trial", "expired", 3400],
];

export default function JourneyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) => number.format(value),
    [number],
  );

  const nodes = useMemo(
    (): SankeyNode[] => STEPS.map((step) => ({ name: t(`journey.${step}`) })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      PATHS.map(([from, to, value]) => ({
        source: STEPS.indexOf(from),
        target: STEPS.indexOf(to),
        value,
      })),
    [],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <SankeyChart
        nodes={nodes}
        links={links}
        align="left"
        linkColor="source"
        format={format}
        onClick={setSelected}
        height={400}
        ariaLabel={t("journeyAria")}
      />
      <p role="status" style={{ margin: 0 }}>
        {selected
          ? selected.source && selected.target
            ? t("journeyLink", {
                source: selected.source,
                target: selected.target,
                value: number.format(selected.value),
                share: (selected.percent * 100).toFixed(1),
              })
            : t("journeyNode", {
                name: selected.name,
                value: number.format(selected.value),
              })
          : t("journeyHint")}
      </p>
    </div>
  );
}
