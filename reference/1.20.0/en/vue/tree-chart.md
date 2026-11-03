# Tree chart

Hierarchies drawn as tidy trees, radial trees, mind maps and org charts: organizations, file systems, taxonomies, plans. The tidy tree (Buchheim / Reingold–Tilford) never overlaps and centers every parent over its children; subtrees collapse and expand with an animation, from a click, the keyboard or the API.

Package: minerva-design@1.20.0

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

#### Overview

TreeChart takes nodes and parent → child edges; nodes without a parent are roots (tree.root picks one). Edges that would create a cycle or a second parent are ignored.

The tidy tree runs in linear time and takes the size of every node into account: labels never overlap, parents are centered over their children and identical subtrees look the same.

layout="tree" (left to right by default, any direction), "radial" (rings around the root, labels along the radius), "mindmap" (branches balanced on both sides, colored per branch) and "org" (cards with a title and a subtitle, orthogonal connectors, leaf teams stacked in columns).

Click a node with children, press Enter on it, or call expand / collapse / toggle: its subtree folds into it with an animation and a badge counts the hidden nodes. collapsed on a node starts it folded.

Olivia Bennett

Daniel Park

Sophie Laurent

Marcus Reed

Ava Thompson

Liam Carter

Noah Kim

Mia Rossi

Lucas Silva

Ethan Brooks

Chloe Martin

Ryan Patel

Grace Hall

Owen Price

Zoe Turner

Jack Evans

Lily Moore

Henry Ward

Chief Executive Officer

Chief Technology Officer

Chief Financial Officer

Chief Operating Officer

Chief Marketing Officer

Frontend Lead

Backend Lead

Frontend Engineer

Frontend Engineer

Backend Engineer

Backend Engineer

Site Reliability Engineer

Financial Controller

Financial Analyst

Support Manager

Logistics Manager

Brand Manager

Growth Manager

Executive

Engineering

Finance

Operations

Marketing

Organization chart of the company

Click a manager to fold or unfold the team.

{{name}}'s team collapsed

{{name}}'s team expanded

Product launch

Goals

10k paying users

Brand awareness

90% retention

Audience

Product teams

Freelancers

Students

Channels

Launch event

Newsletter

Partners

Social media

Timeline

Private beta

Press kit

Launch day

Risks

Delays

Pricing feedback

Budget

Ads

Events

Mind map of a product launch plan

Inputs

Navigation

Feedback

Data display

Layout

Charts

Components of the design system by category

Folders

```tsx
Code
```

Styles

Data

Docs

Expand all

Collapse all

Fit to view

Files of a project

Credit score

Income ≥ 3 × payment?

Employed 2+ years?

Debt-to-income < 35%?

Approved

Approved, lower amount

Approved, higher rate

Manual review

Declined

700 or more

600–699

Below 600

Yes

No

Question

Approved

Review

Declined

Loan approval decision tree, with the path of the current applicant highlighted

Outcome: {{outcome}} (questions asked: {{questions}}).

All products

Electronics

Home

Fashion

Sports

Computers

Phones

Audio

Laptops

Desktops

Tablets

Smartphones

Phone cases

Chargers

Headphones

Speakers

Kitchen

Furniture

Garden

Cookware

Coffee machines

Knives

Sofas

Desks

Office chairs

Garden tools

Plants

Clothing

Shoes

Accessories

Jackets

Dresses

Sneakers

Boots

Bags

Watches

Outdoor

Fitness

Cycling

Tents

Hiking boots

Yoga mats

Dumbbells

Bikes

Helmets

 › 

Search categories

Product category taxonomy of a store

Matching categories: {{total}}. Press Enter or pick a tag to reveal one.

Search for a category, for example “boots” or “desk”.

Macintosh HD

System

Applications

Media

Documents

Caches and backups

Layout

Tree

Radial

Disk usage by folder, sized by the bytes they hold

{{name}}: {{size}} — {{parentShare}} of {{parent}}, {{share}} of the disk.

{{name}}: {{size}} in use.

App 2.0 release

Onboarding

Sign-up

Email verification

Social login

Product tour

Tour screens

Skip and resume

Payments

Checkout

Card form

Wallet payments

Billing

Invoices

Refunds

Platform

Offline mode

Sync queue

Conflict resolution

Quality

Crash reports

Performance budget

{{points}} pts

{{points}} pts · {{done}} done

Summary

Done

In progress

To do

Detail level

Deliverables

Features

Work packages

Showing the plan down to: {{level}}.

Work breakdown structure of a mobile app release, with story points

{{name}} folded: {{points}} points, {{remaining}} remaining.

{{name}} unfolded: {{points}} points, {{remaining}} remaining.

{{points}} story points in total, {{done}} done. Click an item to fold or unfold it.

Quarter-final

Semi-final

Final

To be played

{{winner}}–{{loser}}

Seed {{n}}

Not played

Winner

Still in

Eliminated

Champion

Next round

Restart

New simulation

Knockout tournament bracket from the quarter-finals to the final

{{team}} wins the tournament!

{{round}} winners: {{teams}}.

Eight teams, seeded by rating. Play the next round to reveal the results.

## TreeChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TreeChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "animation",
    "type": "number | boolean",
    "required": false,
    "description": "Animates layout and data changes; a number is the duration in ms (default `true`)",
    "typeText": "number | boolean"
  },
  {
    "name": "layout",
    "type": "\"radial\" | \"tree\" | \"mindmap\" | \"org\"",
    "default": "\"tree\"",
    "required": false,
    "description": "Kind of tree: tidy tree, radial tree, two-sided mind map or org chart (default `tree`)",
    "typeText": "\"radial\" | \"tree\" | \"mindmap\" | \"org\""
  },
  {
    "name": "deep",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also follows in-place mutations of nested data (`series[0].data.push()`);\nby default the chart updates when a prop is replaced (cheaper on large data)",
    "typeText": "boolean"
  },
  {
    "name": "legend",
    "type": "boolean | GraphLegendOptions",
    "required": false,
    "description": "Legend of the groups; shown by default with several groups",
    "typeText": "boolean | GraphLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | GraphTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it",
    "typeText": "boolean | GraphTooltipOptions"
  },
  {
    "name": "interaction",
    "type": "boolean | GraphInteractionOptions",
    "required": false,
    "description": "Drag pans, Ctrl / ⌘ + wheel and pinch zoom, nodes can be dragged, click selects, arrow keys move; `false` makes the chart static (default `true`)",
    "typeText": "boolean | GraphInteractionOptions"
  },
  {
    "name": "arrows",
    "type": "boolean",
    "required": false,
    "description": "Arrowheads on the edges without `directed` (on for DAGs)",
    "typeText": "boolean"
  },
  {
    "name": "nodeLabels",
    "type": "boolean | \"auto\"",
    "required": false,
    "description": "Node labels; `auto` hides minor and overlapping labels when zoomed out (default `auto`)",
    "typeText": "boolean | \"auto\""
  },
  {
    "name": "edgeLabels",
    "type": "boolean | \"auto\" | \"hover\"",
    "required": false,
    "description": "Edge labels: always, `auto` (zoomed in or highlighted), only `hover`, or never (default `auto`)",
    "typeText": "boolean | \"auto\" | \"hover\""
  },
  {
    "name": "controls",
    "type": "boolean",
    "required": false,
    "description": "Zoom buttons (zoom in, zoom out, fit; default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "groups",
    "type": "readonly GraphGroup[]",
    "required": false,
    "description": "Groups: legend order, names and colors",
    "typeText": "readonly GraphGroup[]"
  },
  {
    "name": "labels",
    "type": "Partial<GraphChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<GraphChartLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the nodes and edges: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D (default `auto`)",
    "typeText": "ChartRendererPreference"
  },
  {
    "name": "width",
    "type": "string | number",
    "required": false,
    "description": "Width of the chart; numbers are pixels (default `100%`)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels, strings any CSS length",
    "typeText": "string | number"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Group colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "Language of the built-in texts (summary, announcements, tooltip, buttons); the page language by default",
    "typeText": "string"
  },
  {
    "name": "highlight",
    "type": "\"none\" | \"neighbors\" | \"lineage\"",
    "required": false,
    "description": "What hovering / selecting a node highlights",
    "typeText": "\"none\" | \"neighbors\" | \"lineage\""
  },
  {
    "name": "direction",
    "type": "GraphDirection",
    "required": false,
    "description": "Direction of `layout=\"tree\"` (default `LR`)",
    "typeText": "GraphDirection"
  },
  {
    "name": "nodes",
    "type": "readonly GraphNode[]",
    "required": true,
    "description": "The nodes (a new array re-runs the layout; an array rebuilt with the same node objects does not)",
    "typeText": "readonly GraphNode[]"
  },
  {
    "name": "edges",
    "type": "readonly GraphEdge[]",
    "required": true,
    "description": "The edges (parent → child in trees, prerequisite → dependent in DAGs)",
    "typeText": "readonly GraphEdge[]"
  },
  {
    "name": "nodeShape",
    "type": "GraphNodeShape",
    "required": false,
    "description": "Shape of the nodes without `shape` (boxes for DAGs, org charts and mind maps, circles otherwise)",
    "typeText": "GraphNodeShape"
  },
  {
    "name": "nodeSize",
    "type": "number | readonly [number, number]",
    "required": false,
    "description": "Circle diameter in layout units, or `[min, max]` scaled by the node `value`",
    "typeText": "number | readonly [number, number]"
  },
  {
    "name": "edgeStyle",
    "type": "GraphEdgeStyle",
    "required": false,
    "description": "Edge shape; depends on the layout when omitted",
    "typeText": "GraphEdgeStyle"
  },
  {
    "name": "edgeWidth",
    "type": "number | readonly [number, number]",
    "required": false,
    "description": "Edge width in CSS pixels, or `[min, max]` scaled by the edge `value`",
    "typeText": "number | readonly [number, number]"
  },
  {
    "name": "edgeColor",
    "type": "\"neutral\" | \"target\" | \"source\"",
    "required": false,
    "description": "Edge colors: neutral or tinted with the source / target node (default `neutral`)",
    "typeText": "\"neutral\" | \"target\" | \"source\""
  },
  {
    "name": "arrowStyle",
    "type": "\"open\" | \"filled\"",
    "required": false,
    "description": "Shape of the arrowheads: `open` (a slim outlined head) or `filled` (a solid head in the edge color; default `open`)",
    "typeText": "\"open\" | \"filled\""
  },
  {
    "name": "selected",
    "type": "readonly string[]",
    "required": false,
    "description": "Ids of the selected nodes (changing it updates the selection)",
    "typeText": "readonly string[]"
  },
  {
    "name": "fitPadding",
    "type": "number",
    "required": false,
    "description": "Padding around the graph when fitting it, in CSS pixels (default 24)",
    "typeText": "number"
  },
  {
    "name": "tree",
    "type": "GraphTreeOptions",
    "required": false,
    "description": "Root, spacing, collapsing, card size",
    "typeText": "GraphTreeOptions"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[event: GraphHoverEvent | null]",
    "typeText": "[event: GraphHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "GraphHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "type": "[renderer: ChartRendererKind]",
    "typeText": "[renderer: ChartRendererKind]",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "toggle",
    "type": "[event: GraphToggleEvent]",
    "typeText": "[event: GraphToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "GraphToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "selectionChange",
    "type": "[ids: string[]]",
    "typeText": "[ids: string[]]",
    "parameters": [
      {
        "name": "ids",
        "position": 0,
        "typeText": "string[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "groupToggle",
    "type": "[event: GraphGroupToggleEvent]",
    "typeText": "[event: GraphGroupToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "GraphGroupToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "layoutEnd",
    "type": "[event: GraphLayoutEndEvent]",
    "typeText": "[event: GraphLayoutEndEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "GraphLayoutEndEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "itemClick",
    "type": "[event: GraphHoverEvent]",
    "typeText": "[event: GraphHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "GraphHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: mind-map

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/vue/mind-map.vue

```vue
<script setup lang="ts">
// A mind map of a product launch: the branches spread on both sides of the
// central topic, colored by branch.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { TreeChart } from "minerva-design/vue/charts";

const TOPICS = {
  en: [
    "Product launch",
    "Research",
    "User interviews",
    "Market analysis",
    "Design",
    "Prototype",
    "Usability tests",
    "Development",
    "Web app",
    "Mobile app",
    "Marketing",
    "Ad campaign",
    "Press release",
  ],
  zh: [
    "产品发布",
    "调研",
    "用户访谈",
    "市场分析",
    "设计",
    "原型",
    "可用性测试",
    "开发",
    "网页应用",
    "移动应用",
    "市场营销",
    "广告投放",
    "新闻稿",
  ],
  ja: [
    "製品ローンチ",
    "リサーチ",
    "ユーザーインタビュー",
    "市場分析",
    "デザイン",
    "プロトタイプ",
    "ユーザビリティテスト",
    "開発",
    "Web アプリ",
    "モバイルアプリ",
    "マーケティング",
    "広告キャンペーン",
    "プレスリリース",
  ],
  fr: [
    "Lancement produit",
    "Recherche",
    "Entretiens utilisateurs",
    "Analyse du marché",
    "Conception",
    "Prototype",
    "Tests d'utilisabilité",
    "Développement",
    "Application web",
    "Application mobile",
    "Marketing",
    "Campagne publicitaire",
    "Communiqué de presse",
  ],
};
// parent of each topic of TOPICS (-1: the central topic)
const PARENT = [-1, 0, 1, 1, 0, 4, 4, 0, 7, 7, 0, 10, 10];
// branch of a topic: its ancestor just below the central topic
const branchOf = (i: number): number =>
  PARENT[i] <= 0 ? i : branchOf(PARENT[i]);

const { language } = useI18n();
const nodes = computed(() =>
  (TOPICS[language.value] ?? TOPICS.en).map((label, i) => ({
    id: `t${i}`,
    label,
    group: `b${branchOf(i)}`,
  })),
);
const edges = PARENT.flatMap((parent, i) =>
  parent < 0 ? [] : [{ source: `t${parent}`, target: `t${i}` }],
);
</script>

<template>
  <TreeChart
    :nodes="nodes"
    :edges="edges"
    layout="mindmap"
    :legend="false"
    :height="420"
  />
</template>

```

## Example: org

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/vue/org.vue

```vue
<script setup lang="ts">
// An org chart: cards grouped by department, the leaf teams stacked under
// their manager; clicking a manager collapses / expands the team and
// @toggle reports it.
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { TreeChart, type GraphToggleEvent } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    roles: [
      "Chief executive",
      "Technology",
      "Finance",
      "Operations",
      "Web team",
      "Mobile team",
      "Platform team",
      "Accounting",
      "Treasury",
      "Customer support",
      "Logistics",
    ],
    departments: ["Executive", "Engineering", "Finance", "Operations"],
    hint: "Click a manager to collapse or expand the team",
    collapsed: "{name}: collapsed",
    expanded: "{name}: expanded",
  },
  zh: {
    roles: [
      "首席执行官",
      "技术",
      "财务",
      "运营",
      "Web 团队",
      "移动团队",
      "平台团队",
      "会计",
      "资金管理",
      "客户支持",
      "物流",
    ],
    departments: ["管理层", "研发", "财务", "运营"],
    hint: "点击管理者以折叠或展开团队",
    collapsed: "{name}：已折叠",
    expanded: "{name}：已展开",
  },
  ja: {
    roles: [
      "最高経営責任者",
      "技術",
      "財務",
      "運営",
      "Web チーム",
      "モバイルチーム",
      "プラットフォームチーム",
      "経理",
      "資金管理",
      "カスタマーサポート",
      "物流",
    ],
    departments: ["経営", "エンジニアリング", "財務", "運営"],
    hint: "マネージャーをクリックするとチームを折りたたみ / 展開します",
    collapsed: "{name}: 折りたたみ",
    expanded: "{name}: 展開",
  },
  fr: {
    roles: [
      "Direction générale",
      "Technique",
      "Finance",
      "Opérations",
      "Équipe web",
      "Équipe mobile",
      "Équipe plateforme",
      "Comptabilité",
      "Trésorerie",
      "Support client",
      "Logistique",
    ],
    departments: ["Direction", "Ingénierie", "Finance", "Opérations"],
    hint: "Cliquez sur un responsable pour replier ou déplier l'équipe",
    collapsed: "{name} : replié",
    expanded: "{name} : déplié",
  },
};
// manager (index in TEXT.roles, -1: the root) and department of each role
const PEOPLE = [
  [-1, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 1],
  [1, 1],
  [1, 1],
  [2, 2],
  [2, 2],
  [3, 3],
  [3, 3],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const nodes = computed(() =>
  text.value.roles.map((label, i) => ({
    id: `p${i}`,
    label,
    group: `d${PEOPLE[i][1]}`,
  })),
);
const groups = computed(() =>
  text.value.departments.map((name, i) => ({ id: `d${i}`, name })),
);
const edges = PEOPLE.flatMap(([manager], i) =>
  manager < 0 ? [] : [{ source: `p${manager}`, target: `p${i}` }],
);
const toggled = ref<GraphToggleEvent | null>(null);
const status = computed(() =>
  toggled.value
    ? text.value[toggled.value.collapsed ? "collapsed" : "expanded"].replace(
        "{name}",
        text.value.roles[Number(toggled.value.id.slice(1))],
      )
    : text.value.hint,
);
</script>

<template>
  <div style="display: grid; gap: 8px; width: 100%">
    <TreeChart
      :nodes="nodes"
      :edges="edges"
      :groups="groups"
      layout="org"
      :height="460"
      @toggle="toggled = $event"
    />
    <output aria-live="polite">{{ status }}</output>
  </div>
</template>

```
