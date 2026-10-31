import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Radio, RadioGroup } from "minerva-design";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Kind = "question" | "approved" | "review" | "declined";
type Credit = "high" | "fair" | "poor";
type Answer = "yes" | "no";

interface Applicant {
  credit: Credit;
  income: Answer;
  /** debt-to-income ratio below 35% */
  debt: Answer;
  employment: Answer;
}

// node, kind, translation key of its text
const NODES: [string, Kind, string][] = [
  ["credit", "question", "credit"],
  ["income", "question", "income"],
  ["employment", "question", "employment"],
  ["debtA", "question", "debt"],
  ["debtB", "question", "debt"],
  ["approve", "approved", "approved"],
  ["approveLower", "approved", "approvedLower"],
  ["approveRate", "approved", "approvedRate"],
  ["reviewA", "review", "review"],
  ["reviewB", "review", "review"],
  ["declineA", "declined", "declined"],
  ["declineB", "declined", "declined"],
];

// parent, child, translation key of the branch label
const BRANCHES: [string, string, string][] = [
  ["credit", "income", "creditHigh"],
  ["credit", "employment", "creditFair"],
  ["credit", "declineB", "creditPoor"],
  ["income", "approve", "yes"],
  ["income", "debtA", "no"],
  ["debtA", "approveLower", "yes"],
  ["debtA", "reviewA", "no"],
  ["employment", "debtB", "yes"],
  ["employment", "reviewB", "no"],
  ["debtB", "approveRate", "yes"],
  ["debtB", "declineA", "no"],
];

const CREDIT_BRANCH: Record<Credit, string> = {
  high: "creditHigh",
  fair: "creditFair",
  poor: "creditPoor",
};
const KINDS: Kind[] = ["question", "approved", "review", "declined"];
const COLORS: Record<Kind, string> = {
  question: "var(--chart-series-1, #4f46e5)",
  approved: "var(--success-color, #16a34a)",
  review: "var(--warning-color, #d97706)",
  declined: "var(--danger-color, #dc2626)",
};

/** Follows the branches that match the applicant, from the root to a leaf */
const decide = (applicant: Applicant) => {
  const answer: Record<string, string> = {
    credit: CREDIT_BRANCH[applicant.credit],
    income: applicant.income,
    debtA: applicant.debt,
    debtB: applicant.debt,
    employment: applicant.employment,
  };
  const path = ["credit"];
  for (;;) {
    const current = path[path.length - 1];
    const next = BRANCHES.find(
      ([parent, , label]) => parent === current && label === answer[current],
    );
    if (!next) return path;
    path.push(next[1]);
  }
};

export default function DecisionTreeDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const [applicant, setApplicant] = useState<Applicant>({
    credit: "fair",
    income: "yes",
    debt: "yes",
    employment: "yes",
  });
  const path = decide(applicant);
  const leaf = path[path.length - 1];

  const nodes = useMemo(
    (): GraphNode[] =>
      NODES.map(([id, kind, text]) => ({
        id,
        label: t(`decision.${text}`),
        group: kind,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      BRANCHES.map(([source, target, label]) => ({
        source,
        target,
        label: t(`branches.${label}`),
      })),
    [t],
  );
  const groups = useMemo(
    () =>
      KINDS.map((id) => ({
        id,
        name: t(`decisionKinds.${id}`),
        color: COLORS[id],
      })),
    [t],
  );
  const set = <K extends keyof Applicant>(key: K, value: Applicant[K]) =>
    setApplicant({ ...applicant, [key]: value });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={16} wrap align="center">
        <HStack gap={8} align="center">
          <span>{t("decision.credit")}</span>
          <RadioGroup
            aria-label={t("decision.credit")}
            direction="horizontal"
            value={applicant.credit}
            onChange={(value) => set("credit", value as Credit)}
          >
            {(Object.keys(CREDIT_BRANCH) as Credit[]).map((id) => (
              <Radio
                key={id}
                value={id}
                label={t(`branches.${CREDIT_BRANCH[id]}`)}
              />
            ))}
          </RadioGroup>
        </HStack>
        {(["income", "debt", "employment"] as const).map((key) => (
          <HStack key={key} gap={8} align="center">
            <span>{t(`decision.${key}`)}</span>
            <RadioGroup
              aria-label={t(`decision.${key}`)}
              direction="horizontal"
              value={applicant[key]}
              onChange={(value) => set(key, value as Answer)}
            >
              <Radio value="yes" label={t("branches.yes")} />
              <Radio value="no" label={t("branches.no")} />
            </RadioGroup>
          </HStack>
        ))}
      </HStack>
      <TreeChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="org"
        tree={{ collapsible: false, compact: false, cardSize: [150, 52] }}
        edgeLabels
        highlight="lineage"
        selected={[leaf]}
        interaction={{ select: false }}
        height={460}
        ariaLabel={t("decisionAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("decisionResult", {
          outcome: t(`decision.${NODES.find(([id]) => id === leaf)![2]}`),
          questions: path.length - 1,
        })}
      </output>
    </div>
  );
}
