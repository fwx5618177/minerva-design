import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Input, Tag } from "minerva-design";
import {
  TreeChart,
  type GraphChartHandle,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

// category → parent; "catalog" is the root
const CATEGORIES: [string, string | null][] = [
  ["catalog", null],
  ["electronics", "catalog"],
  ["home", "catalog"],
  ["fashion", "catalog"],
  ["sports", "catalog"],
  ["computers", "electronics"],
  ["phones", "electronics"],
  ["audio", "electronics"],
  ["laptops", "computers"],
  ["desktops", "computers"],
  ["tablets", "computers"],
  ["smartphones", "phones"],
  ["phoneCases", "phones"],
  ["chargers", "phones"],
  ["headphones", "audio"],
  ["speakers", "audio"],
  ["kitchen", "home"],
  ["furniture", "home"],
  ["garden", "home"],
  ["cookware", "kitchen"],
  ["coffeeMachines", "kitchen"],
  ["knives", "kitchen"],
  ["sofas", "furniture"],
  ["desks", "furniture"],
  ["officeChairs", "furniture"],
  ["gardenTools", "garden"],
  ["plants", "garden"],
  ["clothing", "fashion"],
  ["shoes", "fashion"],
  ["accessories", "fashion"],
  ["jackets", "clothing"],
  ["dresses", "clothing"],
  ["sneakers", "shoes"],
  ["boots", "shoes"],
  ["bags", "accessories"],
  ["watches", "accessories"],
  ["outdoor", "sports"],
  ["fitness", "sports"],
  ["cycling", "sports"],
  ["tents", "outdoor"],
  ["hikingBoots", "outdoor"],
  ["yogaMats", "fitness"],
  ["dumbbells", "fitness"],
  ["bikes", "cycling"],
  ["helmets", "cycling"],
];

const PARENT = new Map(CATEGORIES);
const DEPARTMENTS = CATEGORIES.filter(([, parent]) => parent === "catalog").map(
  ([id]) => id,
);
const HAS_CHILDREN = new Set(CATEGORIES.map(([, parent]) => parent));

/** The category and its ancestors, from the root down */
const pathTo = (id: string) => {
  const path: string[] = [];
  for (let at: string | null | undefined = id; at; at = PARENT.get(at)) {
    path.unshift(at);
  }
  return path;
};
const departmentOf = (id: string) => pathTo(id)[1] ?? "catalog";

export default function TaxonomySearchDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.tree-chart.data",
  });
  const ref = useRef<GraphChartHandle>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);

  const nodes = useMemo(
    (): GraphNode[] =>
      CATEGORIES.map(([id]) => ({
        id,
        label: t(`taxonomy.${id}`),
        group: departmentOf(id),
        // second-level categories start collapsed
        collapsed: HAS_CHILDREN.has(id) && pathTo(id).length === 3,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      CATEGORIES.filter(([, parent]) => parent).map(([id, parent]) => ({
        source: parent!,
        target: id,
      })),
    [],
  );
  const groups = useMemo(
    () => [
      { id: "catalog", name: t("taxonomy.catalog") },
      ...DEPARTMENTS.map((id) => ({ id, name: t(`taxonomy.${id}`) })),
    ],
    [t],
  );

  const matches = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(i18n.language);
    if (!needle) return [];
    return nodes.filter((node) =>
      String(node.label).toLocaleLowerCase(i18n.language).includes(needle),
    );
  }, [nodes, query, i18n.language]);
  const selected = useMemo(() => matches.map((node) => node.id), [matches]);

  const reveal = (id: string) => {
    setActive(id);
    // focusNode expands the collapsed ancestors before centering the node
    ref.current?.focusNode(id, { zoom: 1.2 });
  };
  const breadcrumb = (id: string) =>
    pathTo(id)
      .map((at) => t(`taxonomy.${at}`))
      .join(t("breadcrumbSeparator"));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Input
        value={query}
        clearable
        aria-label={t("taxonomySearch")}
        placeholder={t("taxonomySearch")}
        onClear={() => {
          setQuery("");
          setActive(null);
        }}
        onChange={(event) => {
          setQuery(event.target.value);
          setActive(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && matches[0]) reveal(matches[0].id);
        }}
      />
      {matches.length > 0 && (
        <HStack gap={6} wrap>
          {matches.map((node) => (
            <Tag
              key={node.id}
              size="small"
              clickable
              pressed={node.id === active}
              onClick={() => reveal(node.id)}
            >
              {node.label}
            </Tag>
          ))}
        </HStack>
      )}
      <TreeChart
        ref={ref}
        nodes={nodes}
        edges={edges}
        groups={groups}
        layout="tree"
        direction="LR"
        nodeSize={10}
        highlight="lineage"
        selected={selected}
        interaction={{ select: false }}
        height={460}
        ariaLabel={t("taxonomyAria")}
        onItemClick={(event) => {
          if (event.type === "node" && event.id) setActive(event.id);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {active
          ? breadcrumb(active)
          : query.trim()
            ? t("taxonomyMatches", { total: matches.length })
            : t("taxonomyHint")}
      </output>
    </div>
  );
}
