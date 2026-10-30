import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Department =
  "executive" | "engineering" | "finance" | "operations" | "marketing";

// person, department, manager
const PEOPLE: [string, Department, string | null][] = [
  ["ceo", "executive", null],
  ["cto", "engineering", "ceo"],
  ["cfo", "finance", "ceo"],
  ["coo", "operations", "ceo"],
  ["cmo", "marketing", "ceo"],
  ["frontend", "engineering", "cto"],
  ["backend", "engineering", "cto"],
  ["web1", "engineering", "frontend"],
  ["web2", "engineering", "frontend"],
  ["api1", "engineering", "backend"],
  ["api2", "engineering", "backend"],
  ["api3", "engineering", "backend"],
  ["controller", "finance", "cfo"],
  ["analyst", "finance", "cfo"],
  ["support", "operations", "coo"],
  ["logistics", "operations", "coo"],
  ["brand", "marketing", "cmo"],
  ["growth", "marketing", "cmo"],
];

const DEPARTMENTS: Department[] = [
  "executive",
  "engineering",
  "finance",
  "operations",
  "marketing",
];

export default function OrgChartDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const [status, setStatus] = useState("");
  const nodes = useMemo(
    (): GraphNode[] =>
      PEOPLE.map(([id, department]) => ({
        id,
        label: t(`people.${id}`),
        subtitle: t(`roles.${id}`),
        group: department,
        // the backend team starts collapsed
        collapsed: id === "backend",
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      PEOPLE.filter(([, , manager]) => manager).map(([id, , manager]) => ({
        source: manager!,
        target: id,
      })),
    [],
  );
  const groups = useMemo(
    () => DEPARTMENTS.map((id) => ({ id, name: t(`departments.${id}`) })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <TreeChart
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="org"
        height={560}
        ariaLabel={t("orgAria")}
        onToggle={(event) =>
          setStatus(
            t(event.collapsed ? "teamCollapsed" : "teamExpanded", {
              name: t(`people.${event.id}`),
            }),
          )
        }
      />
      <span role="status" style={{ color: "var(--text-secondary-color)" }}>
        {status || t("orgHint")}
      </span>
    </div>
  );
}
