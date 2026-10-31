import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { SankeyChart, type SankeyLink } from "minerva-design/charts";

type Stage =
  | "referrals"
  | "jobBoards"
  | "linkedin"
  | "agencies"
  | "campus"
  | "applied"
  | "cvRejected"
  | "screen"
  | "screenOut"
  | "interview"
  | "interviewOut"
  | "offer"
  | "declined"
  | "hired";

const DROP_OFFS = new Set<Stage>([
  "cvRejected",
  "screenOut",
  "interviewOut",
  "declined",
]);
const SOURCES: Stage[] = [
  "referrals",
  "jobBoards",
  "linkedin",
  "agencies",
  "campus",
];

// Candidates of one hiring year, from the source to the outcome
const MOVES: [Stage, Stage, number][] = [
  ["referrals", "applied", 210],
  ["jobBoards", "applied", 1480],
  ["linkedin", "applied", 860],
  ["agencies", "applied", 190],
  ["campus", "applied", 540],
  ["applied", "cvRejected", 2150],
  ["applied", "screen", 1130],
  ["screen", "screenOut", 690],
  ["screen", "interview", 440],
  ["interview", "interviewOut", 362],
  ["interview", "offer", 78],
  ["offer", "declined", 14],
  ["offer", "hired", 64],
];

const STAGE_COLOR: Partial<Record<Stage, string>> = {
  hired: "var(--success-color)",
  cvRejected: "var(--text-muted-color)",
  screenOut: "var(--text-muted-color)",
  interviewOut: "var(--text-muted-color)",
  declined: "var(--text-muted-color)",
};

const total = (from: Stage) =>
  MOVES.filter(([source]) => source === from).reduce(
    (sum, [, , value]) => sum + value,
    0,
  );

export default function HiringFunnelDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [dropOffs, setDropOffs] = useState(true);
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) => number.format(value),
    [number],
  );

  // nodes and links refer to each other by name, so hiding the drop-offs
  // only means leaving them out of both lists
  const visible = useMemo(
    () => MOVES.filter(([, to]) => dropOffs || !DROP_OFFS.has(to)),
    [dropOffs],
  );
  const nodes = useMemo(() => {
    const stages = [...new Set(visible.flatMap(([from, to]) => [from, to]))];
    return stages.map((stage) => ({
      name: t(`hiring.${stage}`),
      ...(STAGE_COLOR[stage] ? { color: STAGE_COLOR[stage] } : {}),
    }));
  }, [visible, t]);
  const links = useMemo(
    (): SankeyLink[] =>
      visible.map(([from, to, value]) => ({
        source: t(`hiring.${from}`),
        target: t(`hiring.${to}`),
        value,
      })),
    [visible, t],
  );

  const applied = SOURCES.reduce((sum, source) => sum + total(source), 0);
  const hired = MOVES.find(([, to]) => to === "hired")![2];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={dropOffs}
        onChange={setDropOffs}
        label={t("hiring.showDropOffs")}
      />
      <SankeyChart
        nodes={nodes}
        links={links}
        format={format}
        align="left"
        linkColor={dropOffs ? "target" : "source"}
        labelValues
        height={400}
        ariaLabel={t("hiring.aria")}
      />
      <output aria-live="polite">
        {t("hiring.summary", {
          applied: number.format(applied),
          hired: number.format(hired),
          rate: percent.format(hired / applied),
          interview: percent.format(total("interview") / total("screen")),
          accepted: percent.format(hired / total("offer")),
        })}
      </output>
    </div>
  );
}
