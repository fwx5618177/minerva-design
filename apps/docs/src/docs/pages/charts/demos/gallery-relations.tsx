import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  DonutChart,
  FunnelChart,
  PieChart,
  QuadrantChart,
  RadarChart,
  SankeyChart,
  SunburstChart,
  TreemapChart,
  type QuadrantPoint,
  type QuadrantRegions,
  type RadarIndicator,
  type RadarSeries,
  type SankeyLink,
  type SankeyNode,
  type ShapeDatum,
  type TreemapNode,
} from "minerva-design/charts";
import { GalleryCard, GalleryGrid } from "../gallery-card";

const browsers: ShapeDatum[] = [
  { name: "Chrome", value: 64 },
  { name: "Safari", value: 19 },
  { name: "Edge", value: 9 },
  { name: "Firefox", value: 8 },
];

type Unit = [key: string, headcount: number | Unit[]];
// headcount per department and team
const org: Unit[] = [
  [
    "engineering",
    [
      ["platform", 18],
      ["web", 24],
      ["mobile", 16],
    ],
  ],
  [
    "sales",
    [
      ["emea", 22],
      ["americas", 31],
    ],
  ],
  [
    "operations",
    [
      ["support", 26],
      ["finance", 8],
    ],
  ],
];

// visits from each source to the site, then sign-ups or exits (thousands)
const flowNodes = ["search", "social", "email", "site", "signedUp", "left"];
const flowLinks: SankeyLink[] = [
  { source: 0, target: 3, value: 52 },
  { source: 1, target: 3, value: 31 },
  { source: 2, target: 3, value: 17 },
  { source: 3, target: 4, value: 23 },
  { source: 3, target: 5, value: 77 },
];

export default function GalleryRelationsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    const compact = new Intl.NumberFormat(locale, { notation: "compact" });
    const percent = new Intl.NumberFormat(locale, { style: "percent" });
    return {
      number: (value: number) => number.format(value),
      compact: (value: number) => compact.format(value),
      percent: (share: number) => percent.format(share),
      // values given in percent (64 = 64%)
      percentOf100: (value: number) => percent.format(value / 100),
    };
  }, [locale]);

  const data = useMemo(() => {
    const plans: ShapeDatum[] = [
      { name: t("plans.free"), value: 5400 },
      { name: t("plans.pro"), value: 2100 },
      { name: t("plans.team"), value: 860 },
    ];
    const criteria: RadarIndicator[] = [
      "speed",
      "quality",
      "cost",
      "support",
      "scale",
    ].map((key) => ({ name: t(`criteria.${key}`), max: 10 }));
    const vendors: RadarSeries[] = [
      { name: t("vendor", { name: "A" }), values: [8, 6, 7, 5, 9] },
      { name: t("vendor", { name: "B" }), values: [5, 9, 6, 8, 6] },
    ];
    const stages: ShapeDatum[] = [
      { name: t("stages.visited"), value: 12000 },
      { name: t("stages.signedUp"), value: 4800 },
      { name: t("stages.activated"), value: 2600 },
      { name: t("stages.paid"), value: 900 },
    ];
    const tasks: QuadrantPoint[] = [
      { x: 8, y: 8.5, label: t("tasks.release") },
      { x: 3, y: 7.5, label: t("tasks.roadmap") },
      { x: 7, y: 3, label: t("tasks.emails") },
      { x: 2, y: 2, label: t("tasks.cleanup") },
    ];
    const regions: QuadrantRegions = {
      topLeft: { label: t("quadrants.plan") },
      topRight: { label: t("quadrants.doFirst") },
      bottomLeft: { label: t("quadrants.drop") },
      bottomRight: { label: t("quadrants.delegate") },
    };
    const budget: TreemapNode[] = [
      {
        name: t("budget.product"),
        children: [
          { name: t("budget.design"), value: 18 },
          { name: t("budget.engineering"), value: 42 },
        ],
      },
      {
        name: t("budget.goToMarket"),
        children: [
          { name: t("budget.sales"), value: 24 },
          { name: t("budget.marketing"), value: 16 },
        ],
      },
    ];
    const toNodes = (units: Unit[]): TreemapNode[] =>
      units.map(([key, size]) =>
        typeof size === "number"
          ? { name: t(`org.${key}`), value: size }
          : { name: t(`org.${key}`), children: toNodes(size) },
      );
    const nodes: SankeyNode[] = flowNodes.map((key) => ({
      name: t(`flow.${key}`),
    }));
    return {
      plans,
      criteria,
      vendors,
      stages,
      tasks,
      regions,
      budget,
      org: toNodes(org),
      nodes,
    };
  }, [t]);

  const people = useMemo(() => (value: number) => t("people", { value }), [t]);
  const thousands = useMemo(
    () => (value: number) => formats.compact(value * 1000),
    [formats],
  );

  return (
    <GalleryGrid>
      <GalleryCard
        title={t("cards.pie.title")}
        component="PieChart"
        page="pie-chart"
        description={t("cards.pie.description")}
      >
        <PieChart
          data={browsers}
          height="100%"
          legend={false}
          format={formats.percentOf100}
          percentFormat={formats.percent}
          ariaLabel={t("cards.pie.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.donut.title")}
        component="DonutChart"
        page="pie-chart"
        description={t("cards.donut.description")}
      >
        <DonutChart
          data={data.plans}
          height="100%"
          labels="none"
          centerValue={formats.compact(8360)}
          centerLabel={t("users")}
          legend={{ position: "bottom" }}
          format={formats.number}
          percentFormat={formats.percent}
          ariaLabel={t("cards.donut.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.radar.title")}
        component="RadarChart"
        page="radar-chart"
        description={t("cards.radar.description")}
      >
        <RadarChart
          indicators={data.criteria}
          series={data.vendors}
          height="100%"
          legend={false}
          format={formats.number}
          ariaLabel={t("cards.radar.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.funnel.title")}
        component="FunnelChart"
        page="funnel-chart"
        description={t("cards.funnel.description")}
      >
        <FunnelChart
          data={data.stages}
          height="100%"
          legend={false}
          format={formats.compact}
          percentFormat={formats.percent}
          ariaLabel={t("cards.funnel.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.quadrant.title")}
        component="QuadrantChart"
        page="quadrant-chart"
        description={t("cards.quadrant.description")}
      >
        <QuadrantChart
          points={data.tasks}
          quadrants={data.regions}
          showTicks={false}
          xLabel={t("urgency")}
          yLabel={t("importance")}
          height="100%"
          ariaLabel={t("cards.quadrant.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.treemap.title")}
        component="TreemapChart"
        page="treemap-chart"
        description={t("cards.treemap.description")}
      >
        <TreemapChart
          data={data.budget}
          height="100%"
          format={formats.percentOf100}
          percentFormat={formats.percent}
          ariaLabel={t("cards.treemap.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.sunburst.title")}
        component="SunburstChart"
        page="sunburst-chart"
        description={t("cards.sunburst.description")}
      >
        <SunburstChart
          data={data.org}
          innerRadius={0.3}
          format={people}
          percentFormat={formats.percent}
          height="100%"
          ariaLabel={t("cards.sunburst.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.sankey.title")}
        component="SankeyChart"
        page="sankey-chart"
        description={t("cards.sankey.description")}
      >
        <SankeyChart
          nodes={data.nodes}
          links={flowLinks}
          format={thousands}
          linkColor="source"
          nodeWidth={8}
          height="100%"
          ariaLabel={t("cards.sankey.aria")}
        />
      </GalleryCard>
    </GalleryGrid>
  );
}
