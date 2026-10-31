import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Input, Tag } from "minerva-design";
import {
  GraphChart,
  type GraphChartHandle,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Kind = "person" | "place" | "institution" | "concept";

const ENTITIES: [string, Kind][] = [
  ["curie", "person"],
  ["pierre", "person"],
  ["einstein", "person"],
  ["planck", "person"],
  ["bohr", "person"],
  ["heisenberg", "person"],
  ["meitner", "person"],
  ["hahn", "person"],
  ["noether", "person"],
  ["paris", "place"],
  ["warsaw", "place"],
  ["vienna", "place"],
  ["berlin", "place"],
  ["zurich", "place"],
  ["copenhagen", "place"],
  ["sorbonne", "institution"],
  ["kwg", "institution"],
  ["eth", "institution"],
  ["nbi", "institution"],
  ["radioactivity", "concept"],
  ["relativity", "concept"],
  ["quantum", "concept"],
  ["uncertainty", "concept"],
  ["fission", "concept"],
  ["symmetry", "concept"],
];

// subject, object, predicate: the triples of the knowledge graph
const TRIPLES: [string, string, string][] = [
  ["curie", "warsaw", "bornIn"],
  ["curie", "sorbonne", "workedAt"],
  ["curie", "pierre", "marriedTo"],
  ["curie", "radioactivity", "contributedTo"],
  ["pierre", "sorbonne", "workedAt"],
  ["pierre", "radioactivity", "contributedTo"],
  ["sorbonne", "paris", "locatedIn"],
  ["einstein", "eth", "studiedAt"],
  ["einstein", "kwg", "workedAt"],
  ["einstein", "relativity", "contributedTo"],
  ["einstein", "quantum", "contributedTo"],
  ["planck", "kwg", "workedAt"],
  ["planck", "quantum", "contributedTo"],
  ["planck", "einstein", "influenced"],
  ["eth", "zurich", "locatedIn"],
  ["kwg", "berlin", "locatedIn"],
  ["bohr", "nbi", "workedAt"],
  ["bohr", "quantum", "contributedTo"],
  ["bohr", "heisenberg", "influenced"],
  ["heisenberg", "nbi", "workedAt"],
  ["heisenberg", "uncertainty", "contributedTo"],
  ["uncertainty", "quantum", "partOf"],
  ["nbi", "copenhagen", "locatedIn"],
  ["meitner", "vienna", "bornIn"],
  ["meitner", "kwg", "workedAt"],
  ["meitner", "hahn", "collaborated"],
  ["meitner", "fission", "contributedTo"],
  ["hahn", "kwg", "workedAt"],
  ["hahn", "fission", "contributedTo"],
  ["noether", "symmetry", "contributedTo"],
  ["symmetry", "relativity", "relatedTo"],
];

const KINDS: Kind[] = ["person", "place", "institution", "concept"];

export default function KnowledgeGraphDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.graph-chart.data",
  });
  const locale = i18n.language;
  const chart = useRef<GraphChartHandle>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const nodes = useMemo(
    (): GraphNode[] =>
      ENTITIES.map(([id, kind]) => ({
        id,
        label: t(`entities.${id}`),
        group: kind,
        value: TRIPLES.filter(([s, o]) => s === id || o === id).length,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      TRIPLES.map(([source, target, predicate]) => ({
        source,
        target,
        directed: true,
        label: t(`predicates.${predicate}`),
      })),
    [t],
  );
  const groups = useMemo(
    () => KINDS.map((id) => ({ id, name: t(`entityKinds.${id}`) })),
    [t],
  );

  const name = (id: string) => nodes.find((node) => node.id === id)?.label;
  const needle = query.trim().toLocaleLowerCase(locale);
  const matches = needle
    ? nodes.filter((node) =>
        node.label!.toLocaleLowerCase(locale).includes(needle),
      )
    : [];

  // select the entity and center it in the view
  const focus = (id: string) => {
    setSelected([id]);
    chart.current?.focusNode(id, { zoom: 1.6 });
  };

  const current = selected[0];
  const list = new Intl.ListFormat(locale, { style: "narrow", type: "unit" });
  const facts = current
    ? TRIPLES.filter(([s, o]) => s === current || o === current).map(
        ([s, o, predicate]) =>
          s === current
            ? t("factOut", {
                relation: t(`predicates.${predicate}`),
                name: name(o),
              })
            : t("factIn", {
                relation: t(`predicates.${predicate}`),
                name: name(s),
              }),
      )
    : [];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Input
        value={query}
        clearable
        onClear={() => setQuery("")}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && matches[0]) focus(matches[0].id);
        }}
        placeholder={t("searchPlaceholder")}
        aria-label={t("searchLabel")}
        style={{ maxWidth: 320 }}
      />
      {needle && (
        <HStack gap={6} wrap>
          {matches.length ? (
            matches.slice(0, 8).map((node) => (
              <Tag
                key={node.id}
                size="small"
                clickable
                pressed={current === node.id}
                onClick={() => focus(node.id)}
              >
                {node.label}
              </Tag>
            ))
          ) : (
            <span style={{ color: "var(--text-secondary-color)" }}>
              {t("noMatch")}
            </span>
          )}
        </HStack>
      )}
      <GraphChart
        ref={chart}
        nodes={nodes}
        edges={edges}
        groups={groups}
        selected={selected}
        nodeSize={[12, 32]}
        arrows
        edgeLabels="auto"
        force={{ linkDistance: 70, charge: -520, seed: 7 }}
        height={500}
        ariaLabel={t("knowledgeAria")}
        onSelectionChange={setSelected}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {current
          ? t("factsReadout", {
              name: name(current),
              total: facts.length,
              facts: list.format(facts),
            })
          : t("knowledgeHint")}
      </output>
    </div>
  );
}
