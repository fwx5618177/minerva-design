import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Radio, RadioGroup, Switch } from "minerva-design";
import {
  SankeyChart,
  type SankeyChartProps,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Align = NonNullable<SankeyChartProps["align"]>;
type LinkColor = NonNullable<SankeyChartProps["linkColor"]>;
type Stage =
  | "email"
  | "chat"
  | "phone"
  | "bot"
  | "tier1"
  | "tier2"
  | "engineering"
  | "solved"
  | "refunded"
  | "escalated";

const STAGES: Stage[] = [
  "email",
  "chat",
  "phone",
  "bot",
  "tier1",
  "tier2",
  "engineering",
  "solved",
  "refunded",
  "escalated",
];

// Support tickets of a month: the chatbot solves some directly, which skips
// a column; that is where `align` makes a difference
const ROUTES: [Stage, Stage, number][] = [
  ["email", "tier1", 820],
  ["chat", "bot", 1400],
  ["phone", "tier1", 520],
  ["bot", "solved", 760],
  ["bot", "tier1", 640],
  ["tier1", "solved", 1310],
  ["tier1", "refunded", 210],
  ["tier1", "tier2", 460],
  ["tier2", "solved", 280],
  ["tier2", "engineering", 180],
  ["engineering", "escalated", 180],
];

const ALIGNS: Align[] = ["justify", "left", "right", "center"];
const COLORS: LinkColor[] = ["gradient", "source", "target", "neutral"];

export default function OptionsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [align, setAlign] = useState<Align>("justify");
  const [linkColor, setLinkColor] = useState<LinkColor>("gradient");
  const [labelValues, setLabelValues] = useState(true);

  const nodes = useMemo(
    (): SankeyNode[] =>
      STAGES.map((stage) => ({ name: t(`support.${stage}`) })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      ROUTES.map(([from, to, value]) => ({
        source: STAGES.indexOf(from),
        target: STAGES.indexOf(to),
        value,
      })),
    [],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("alignLabel")}
        direction="horizontal"
        value={align}
        onChange={(value) => setAlign(value as Align)}
      >
        {ALIGNS.map((value) => (
          <Radio key={value} value={value} label={t(`align.${value}`)} />
        ))}
      </RadioGroup>
      <HStack gap={16} wrap align="center">
        <RadioGroup
          aria-label={t("linkColorLabel")}
          direction="horizontal"
          value={linkColor}
          onChange={(value) => setLinkColor(value as LinkColor)}
        >
          {COLORS.map((value) => (
            <Radio key={value} value={value} label={t(`linkColor.${value}`)} />
          ))}
        </RadioGroup>
        <Switch
          checked={labelValues}
          onChange={setLabelValues}
          label={t("labelValues")}
        />
      </HStack>
      <SankeyChart
        nodes={nodes}
        links={links}
        align={align}
        linkColor={linkColor}
        labelValues={labelValues}
        height={340}
        ariaLabel={t("supportAria")}
      />
    </div>
  );
}
