import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

// branch → ideas (keys of the locale file)
const MAP: Record<string, string[]> = {
  goals: ["revenue", "awareness", "retention"],
  audience: ["teams", "freelancers", "students"],
  channels: ["launchEvent", "newsletter", "partners", "social"],
  timeline: ["beta", "pressKit", "launchDay"],
  risks: ["delays", "pricing"],
  budget: ["ads", "events"],
};

export default function MindMapDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const nodes = useMemo((): GraphNode[] => {
    const list: GraphNode[] = [{ id: "launch", label: t("mind.launch") }];
    for (const [branch, ideas] of Object.entries(MAP)) {
      list.push({ id: branch, label: t(`mind.${branch}`) });
      for (const idea of ideas)
        list.push({ id: idea, label: t(`mind.${idea}`) });
    }
    return list;
  }, [t]);
  const edges = useMemo((): GraphEdge[] => {
    const list: GraphEdge[] = [];
    for (const [branch, ideas] of Object.entries(MAP)) {
      list.push({ source: "launch", target: branch });
      for (const idea of ideas) list.push({ source: branch, target: idea });
    }
    return list;
  }, []);

  return (
    <TreeChart
      nodes={nodes}
      edges={edges}
      layout="mindmap"
      height={460}
      ariaLabel={t("mindAria")}
    />
  );
}
