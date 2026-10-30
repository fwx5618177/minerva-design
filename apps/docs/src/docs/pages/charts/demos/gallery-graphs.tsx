import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ChordChart,
  DependencyGraph,
  GraphChart,
  TreeChart,
  type GraphEdge,
  type GraphGroup,
  type GraphNode,
} from "minerva-design/charts";
import { GalleryCard, GalleryGrid } from "../gallery-card";

// microservices: [id, tier, requests per second]
const services: [string, string, number][] = [
  ["gateway", "edge", 1200],
  ["web", "edge", 640],
  ["auth", "core", 520],
  ["users", "core", 380],
  ["orders", "core", 300],
  ["payments", "core", 160],
  ["search", "core", 420],
  ["inventory", "core", 220],
  ["database", "data", 900],
  ["cache", "data", 1100],
  ["queue", "data", 260],
];
const calls: [string, string][] = [
  ["web", "gateway"],
  ["gateway", "auth"],
  ["gateway", "users"],
  ["gateway", "orders"],
  ["gateway", "search"],
  ["orders", "payments"],
  ["orders", "inventory"],
  ["orders", "queue"],
  ["auth", "cache"],
  ["users", "database"],
  ["users", "cache"],
  ["orders", "database"],
  ["search", "cache"],
  ["inventory", "database"],
  ["payments", "queue"],
];
const tiers = ["edge", "core", "data"];

// support topics and how often they show up in the same ticket
const topics = ["login", "billing", "export", "mobile", "speed", "alerts"];
const together: [string, string, number][] = [
  ["login", "mobile", 9],
  ["login", "alerts", 3],
  ["billing", "export", 5],
  ["billing", "login", 4],
  ["export", "speed", 7],
  ["mobile", "speed", 6],
  ["mobile", "alerts", 8],
  ["speed", "alerts", 2],
];

// data pipeline: [step, duration in minutes] and dependencies
const steps: [string, number][] = [
  ["extract", 12],
  ["clean", 8],
  ["enrich", 15],
  ["join", 6],
  ["train", 25],
  ["report", 4],
  ["publish", 3],
];
const needs: [string, string][] = [
  ["extract", "clean"],
  ["extract", "enrich"],
  ["clean", "join"],
  ["enrich", "join"],
  ["join", "train"],
  ["join", "report"],
  ["train", "publish"],
  ["report", "publish"],
];
// tight spacing: the box labels stay readable once the graph is fitted
const pipelineLayout = { layerGap: 28, nodeGap: 12 };

// org chart: [role, manager]
const roles: [string, string | null][] = [
  ["ceo", null],
  ["cto", "ceo"],
  ["cfo", "ceo"],
  ["coo", "ceo"],
  ["platform", "cto"],
  ["product", "cto"],
  ["finance", "cfo"],
  ["sales", "coo"],
  ["support", "coo"],
];
const orgLayout = {
  cardSize: [104, 34],
  levelGap: 28,
  siblingGap: 10,
} as const;

// mind map of a trip: branch → ideas
const trip: Record<string, string[]> = {
  transport: ["train", "rentalCar"],
  stay: ["hotel", "camping"],
  food: ["market", "restaurants"],
  activities: ["museum", "hiking", "beach"],
};
const mindMapLayout = { levelGap: 24, siblingGap: 6 };

// customers moving between plans in a quarter: row = from, column = to
const plans = ["free", "starter", "pro", "enterprise"];
const moves = [
  [0, 120, 40, 4],
  [30, 0, 90, 12],
  [10, 25, 0, 36],
  [2, 4, 14, 0],
];

export default function GalleryGraphsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const data = useMemo(() => {
    const serviceNodes: GraphNode[] = services.map(([id, tier, rps]) => ({
      id,
      label: t(`graph.services.${id}`),
      group: tier,
      value: rps,
    }));
    const serviceEdges: GraphEdge[] = calls.map(([source, target]) => ({
      source,
      target,
      directed: true,
    }));
    const serviceGroups: GraphGroup[] = tiers.map((id) => ({
      id,
      name: t(`graph.tiers.${id}`),
    }));
    const topicNodes: GraphNode[] = topics.map((id) => ({
      id,
      label: t(`graph.topics.${id}`),
      group: id,
    }));
    const topicEdges: GraphEdge[] = together.map(([source, target, value]) => ({
      source,
      target,
      value,
    }));
    const stepNodes: GraphNode[] = steps.map(([id, minutes]) => ({
      id,
      label: t(`graph.steps.${id}`),
      value: minutes,
    }));
    const stepEdges: GraphEdge[] = needs.map(([source, target]) => ({
      source,
      target,
    }));
    const roleNodes: GraphNode[] = roles.map(([id]) => ({
      id,
      label: t(`graph.roles.${id}`),
    }));
    const roleEdges: GraphEdge[] = roles.flatMap(([id, manager]) =>
      manager ? [{ source: manager, target: id }] : [],
    );
    const tripNodes: GraphNode[] = [
      { id: "trip", label: t("graph.trip.trip") },
    ];
    const tripEdges: GraphEdge[] = [];
    for (const [branch, ideas] of Object.entries(trip)) {
      tripNodes.push({ id: branch, label: t(`graph.trip.${branch}`) });
      tripEdges.push({ source: "trip", target: branch });
      for (const idea of ideas) {
        tripNodes.push({ id: idea, label: t(`graph.trip.${idea}`) });
        tripEdges.push({ source: branch, target: idea });
      }
    }
    const planNames = plans.map((id) => t(`graph.plans.${id}`));
    return {
      serviceNodes,
      serviceEdges,
      serviceGroups,
      topicNodes,
      topicEdges,
      stepNodes,
      stepEdges,
      roleNodes,
      roleEdges,
      tripNodes,
      tripEdges,
      planNames,
    };
  }, [t]);

  const customers = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    return (value: number) => t("customers", { value: number.format(value) });
  }, [t, locale]);

  // controls={false}: no zoom buttons in the thumbnails (Ctrl / ⌘ + wheel still zooms);
  // nodeLabels: labels even when the graph is zoomed out to fit
  return (
    <GalleryGrid>
      <GalleryCard
        title={t("cards.network.title")}
        component="GraphChart"
        page="graph-chart"
        description={t("cards.network.description")}
      >
        <GraphChart
          nodes={data.serviceNodes}
          edges={data.serviceEdges}
          groups={data.serviceGroups}
          nodeSize={[10, 24]}
          edgeColor="source"
          force={{ linkDistance: 50, charge: -260 }}
          legend={false}
          controls={false}
          fitPadding={12}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.network.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.arc.title")}
        component="GraphChart"
        page="graph-chart"
        description={t("cards.arc.description")}
      >
        <GraphChart
          nodes={data.topicNodes}
          edges={data.topicEdges}
          layout="arc"
          edgeColor="source"
          edgeWidth={[1, 5]}
          edgeLabels={false}
          legend={false}
          controls={false}
          fitPadding={12}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.arc.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.dag.title")}
        component="DependencyGraph"
        page="dependency-graph"
        description={t("cards.dag.description")}
      >
        <DependencyGraph
          nodes={data.stepNodes}
          edges={data.stepEdges}
          direction="LR"
          edgeStyle="orthogonal"
          criticalPath
          dag={pipelineLayout}
          nodeLabels
          legend={false}
          controls={false}
          fitPadding={12}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.dag.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.org.title")}
        component="TreeChart"
        page="tree-chart"
        description={t("cards.org.description")}
      >
        <TreeChart
          nodes={data.roleNodes}
          edges={data.roleEdges}
          layout="org"
          tree={orgLayout}
          nodeLabels
          legend={false}
          controls={false}
          fitPadding={12}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.org.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.mindMap.title")}
        component="TreeChart"
        page="tree-chart"
        description={t("cards.mindMap.description")}
      >
        <TreeChart
          nodes={data.tripNodes}
          edges={data.tripEdges}
          layout="mindmap"
          tree={mindMapLayout}
          nodeLabels
          legend={false}
          controls={false}
          fitPadding={12}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.mindMap.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.chord.title")}
        component="ChordChart"
        page="chord-chart"
        description={t("cards.chord.description")}
      >
        <ChordChart
          groups={data.planNames}
          matrix={moves}
          directed
          format={customers}
          legend={false}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.chord.aria")}
        />
      </GalleryCard>
    </GalleryGrid>
  );
}
