import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  TreeChart,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

// the components of the library, by category
const CATEGORIES: Record<string, string[]> = {
  inputs: [
    "Button",
    "Input",
    "Select",
    "Checkbox",
    "Radio",
    "Switch",
    "Slider",
    "DatePicker",
    "Upload",
  ],
  navigation: ["Tabs", "Menu", "Breadcrumb", "Pagination", "Steps"],
  feedback: ["Alert", "Toast", "Modal", "Drawer", "Progress", "Skeleton"],
  display: [
    "Table",
    "List",
    "Card",
    "Avatar",
    "Badge",
    "Tag",
    "Tooltip",
    "Tree",
  ],
  layout: ["Grid", "Stack", "Divider", "AppShell"],
  charts: [
    "LineChart",
    "BarChart",
    "PieChart",
    "SankeyChart",
    "TradingChart",
    "GraphChart",
    "TreeChart",
  ],
};

const CATEGORY_COLORS = [
  "var(--chart-series-1, #4f46e5)",
  "var(--chart-series-2, #10b981)",
  "var(--chart-series-3, #f59e0b)",
  "var(--chart-series-4, #ef4444)",
  "var(--chart-series-5, #0ea5e9)",
  "var(--chart-series-6, #8b5cf6)",
];

export default function RadialDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const nodes = useMemo((): GraphNode[] => {
    const list: GraphNode[] = [{ id: "root", label: "Minerva", size: 16 }];
    Object.entries(CATEGORIES).forEach(([category, components]) => {
      list.push({
        id: category,
        label: t(`categories.${category}`),
        group: category,
        size: 12,
      });
      for (const name of components)
        list.push({ id: name, label: name, group: category });
    });
    return list;
  }, [t]);
  const edges = useMemo((): GraphEdge[] => {
    const list: GraphEdge[] = [];
    for (const [category, components] of Object.entries(CATEGORIES)) {
      list.push({ source: "root", target: category });
      for (const name of components)
        list.push({ source: category, target: name });
    }
    return list;
  }, []);
  const groups = useMemo(
    () =>
      Object.keys(CATEGORIES).map((id, i) => ({
        id,
        name: t(`categories.${id}`),
        color: CATEGORY_COLORS[i],
      })),
    [t],
  );

  return (
    <TreeChart
      nodes={nodes}
      edges={edges}
      groups={groups}
      layout="radial"
      nodeSize={8}
      legend={false}
      height={560}
      ariaLabel={t("radialAria")}
    />
  );
}
