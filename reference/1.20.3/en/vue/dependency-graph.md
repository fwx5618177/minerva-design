# Dependency graph

Directed acyclic graphs drawn in layers: package dependencies, build pipelines, data lineage, task plans. The Sugiyama layout breaks cycles, assigns layers, routes long edges through dummy nodes, reduces crossings and keeps long edges straight; edges are smooth splines or orthogonal connectors with arrowheads. Hover or select a node to highlight everything upstream and downstream, and show the critical path of a plan.

Package: minerva-design@1.20.3

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

#### How the layout works

DependencyGraph is GraphChart with layout="dag": boxes sized to their labels, arrows on every edge and lineage highlighting. The same layout is available as the pure function dagLayout.

Cycles are broken by reversing the back edges of a depth-first search, layers come from the longest path, then sources move next to their successors and nodes with balanced edges move to emptier layers.

Edges spanning several layers get dummy nodes; barycenter and median sweeps then reorder every layer, keep the best order, and a transposition pass swaps neighbors while it removes crossings.

Positions within a layer come from a weighted isotonic regression towards the neighbors, with long edges weighted heavily so they stay straight. TB, LR, BT and RL directions are supported.

highlight="lineage" (the default here) highlights all ancestors and descendants of the hovered, focused or selected nodes; criticalPath highlights the chain with the largest total duration (node value).

Applications

Framework packages

Libraries

Tooling

dev dependency

circular dependency

Dependencies between the packages of a monorepo

Install

Lint

Type check

Unit tests

Security scan

Build app

Build docs

E2E tests

Visual tests

Package

Deploy staging

Deploy production

Passed

Running

Failed

Pending

{{status}} · {{minutes}} min

web bundle

type declarations

retry

Highlight the critical path

CI/CD pipeline: jobs, their dependencies and their status

Critical path: {{minutes}} min — {{path}}

 → 

Revenue dashboard

Retention dashboard

Growth dashboard

Raw sources

Staging

Marts

Dashboards

Data lineage from the raw tables to the dashboards

{{name}}: {{upstream}} upstream, {{downstream}} downstream

Click a table or a dashboard to highlight its lineage.

Done

Running

Queued

{{percent}} done

{{seconds}} s

Workers

{{n}} × worker

Pause

Run

Reset

Build tasks of a monorepo, colored by state as the scheduler runs them

Build finished in {{seconds}} s on {{workers}} × worker.

{{elapsed}} s of {{seconds}} s — running: {{running}}.

nothing

No schedule can beat the critical path: {{seconds}} s.

Project brief

User research

Sitemap

Wireframes

Visual design

Copywriting

API and hosting

CMS setup

Front-end build

Content entry

QA and fixes

SEO review

Go live

Discovery

Design

Build

Launch

Website launch plan: tasks, their dependencies and the critical path

{{name}}: {{range}}, {{days}} workdays, can slip {{slack}} workdays without delaying the launch.

{{name}}: {{range}}, {{days}} workdays, on the critical path — any delay moves the launch.

{{days}} workdays, launch on {{date}}. Click a task to see its dates and slack.

Succeeded

Failed

Upstream failed

Failing task

Nightly ETL tasks, with the failed task and the tasks it blocks

{{task}} failed and blocks {{blocked}} of the {{total}} tasks: {{sinks}} will not be delivered.

{{task}} failed, but no other task depends on it.

Intro to programming

Discrete mathematics

Calculus

Data structures

Computer architecture

Linear algebra

Probability

Algorithms

Operating systems

Databases

Networks

Machine learning

Compilers

Distributed systems

Security

Deep learning

Capstone project

Year {{n}}

Flow direction

Top to bottom

Left to right

Bottom to top

Right to left

Computer science courses and their prerequisites

Prerequisites of {{course}} ({{total}}): {{list}}.

{{course}} has no prerequisite.

Unit price

Quantity

Discount (%)

Tax rate

Subtotal

Discount

Net

Tax

Shipping

Total

Cost per unit

Inputs

Formulas

Cells of an order sheet and the cells their formulas reference

{{cell}} changed: {{total}} cells recalculated ({{list}}). Total: {{value}}.

## DependencyGraph

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "DependencyGraph"
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
    "name": "direction",
    "type": "GraphDirection",
    "default": "\"TB\"",
    "required": false,
    "description": "Flow direction (default `TB`)",
    "typeText": "GraphDirection"
  },
  {
    "name": "criticalPath",
    "type": "boolean | readonly string[]",
    "required": false,
    "description": "Highlights the longest path (node `value` = duration); `true` computes it, a list of ids sets it (default `false`)",
    "typeText": "boolean | readonly string[]"
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
    "name": "dag",
    "type": "GraphDagOptions",
    "required": false,
    "description": "Layer / node spacing, crossing reduction sweeps",
    "typeText": "GraphDagOptions"
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

## Example: modules

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/dependency-graph/vue/modules.vue

```vue
<script setup lang="ts">
// Modules of a web application, from the shared code at the top to the
// application at the bottom: hovering or clicking a module highlights its
// whole lineage (what it needs and what needs it).
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { DependencyGraph } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    modules: [
      "Utilities",
      "HTTP",
      "Translations",
      "UI components",
      "Charts",
      "API client",
      "Authentication",
      "State store",
      "Router",
      "Dashboard",
      "Reports",
      "Application",
    ],
    layers: ["Shared", "Core", "Features", "Application"],
    hint: "Click a module to highlight its dependencies",
    selected: "Selected: ",
  },
  zh: {
    modules: [
      "工具函数",
      "HTTP",
      "多语言",
      "UI 组件",
      "图表",
      "API 客户端",
      "认证",
      "状态管理",
      "路由",
      "仪表盘",
      "报表",
      "应用",
    ],
    layers: ["共享", "核心", "功能", "应用"],
    hint: "点击一个模块以高亮其依赖",
    selected: "已选择：",
  },
  ja: {
    modules: [
      "ユーティリティ",
      "HTTP",
      "翻訳",
      "UI コンポーネント",
      "チャート",
      "API クライアント",
      "認証",
      "状態管理",
      "ルーター",
      "ダッシュボード",
      "レポート",
      "アプリ",
    ],
    layers: ["共有", "コア", "機能", "アプリ"],
    hint: "モジュールをクリックすると依存関係が強調表示されます",
    selected: "選択中: ",
  },
  fr: {
    modules: [
      "Utilitaires",
      "HTTP",
      "Traductions",
      "Composants UI",
      "Graphiques",
      "Client API",
      "Authentification",
      "Gestion d'état",
      "Routeur",
      "Tableau de bord",
      "Rapports",
      "Application",
    ],
    layers: ["Partagé", "Cœur", "Fonctionnalités", "Application"],
    hint: "Cliquez sur un module pour mettre en évidence ses dépendances",
    selected: "Sélection : ",
  },
};
// layer (index in TEXT.layers) of each module of TEXT.modules
const LAYER = [0, 1, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3];
// dependency → dependent (indexes in TEXT.modules)
const USES = [
  [0, 1],
  [1, 5],
  [5, 6],
  [5, 7],
  [6, 8],
  [0, 4],
  [2, 3],
  [3, 9],
  [3, 10],
  [4, 9],
  [4, 10],
  [5, 9],
  [5, 10],
  [7, 9],
  [7, 10],
  [8, 11],
  [9, 11],
  [10, 11],
  [6, 11],
  [2, 11],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const nodes = computed(() =>
  text.value.modules.map((label, i) => ({
    id: `m${i}`,
    label,
    group: `l${LAYER[i]}`,
  })),
);
const groups = computed(() =>
  text.value.layers.map((name, i) => ({ id: `l${i}`, name })),
);
const edges = USES.map(([a, b]) => ({ source: `m${a}`, target: `m${b}` }));
const selection = ref<string[]>([]);
const status = computed(() =>
  selection.value.length
    ? text.value.selected +
      selection.value
        .map((id) => text.value.modules[Number(id.slice(1))])
        .join(", ")
    : text.value.hint,
);
</script>

<template>
  <div style="display: grid; gap: 8px; width: 100%">
    <DependencyGraph
      :nodes="nodes"
      :edges="edges"
      :groups="groups"
      highlight="lineage"
      :height="460"
      @selection-change="selection = $event"
    />
    <output aria-live="polite">{{ status }}</output>
  </div>
</template>

```

## Example: pipeline

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/dependency-graph/vue/pipeline.vue

```vue
<script setup lang="ts">
// A CI pipeline left to right: the duration of a job is its value, so the
// critical path (the longest chain of jobs) is highlighted and can be
// switched off.
import { computed, ref } from "vue";
import { Switch, useI18n } from "minerva-design/vue";
import { DependencyGraph } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    jobs: [
      "Install dependencies",
      "Lint",
      "Type check",
      "Unit tests",
      "Build",
      "E2E tests",
      "Package",
      "Deploy",
    ],
    minutes: "{n} min",
    critical: "Critical path",
  },
  zh: {
    jobs: [
      "安装依赖",
      "代码检查",
      "类型检查",
      "单元测试",
      "构建",
      "端到端测试",
      "打包",
      "部署",
    ],
    minutes: "{n} 分钟",
    critical: "关键路径",
  },
  ja: {
    jobs: [
      "依存関係のインストール",
      "Lint",
      "型チェック",
      "単体テスト",
      "ビルド",
      "E2E テスト",
      "パッケージ化",
      "デプロイ",
    ],
    minutes: "{n} 分",
    critical: "クリティカルパス",
  },
  fr: {
    jobs: [
      "Installer les dépendances",
      "Analyse statique",
      "Vérification des types",
      "Tests unitaires",
      "Compilation",
      "Tests E2E",
      "Empaquetage",
      "Déploiement",
    ],
    minutes: "{n} min",
    critical: "Chemin critique",
  },
};
// duration of each job of TEXT.jobs, in minutes
const MINUTES = [3, 2, 3, 6, 5, 9, 2, 4];
// job → the jobs that need it (indexes in TEXT.jobs)
const NEEDS = [
  [0, 1],
  [0, 2],
  [0, 3],
  [2, 4],
  [4, 5],
  [1, 6],
  [3, 6],
  [4, 6],
  [6, 7],
  [5, 7],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const nodes = computed(() =>
  text.value.jobs.map((label, i) => ({
    id: `j${i}`,
    label,
    subtitle: text.value.minutes.replace("{n}", String(MINUTES[i])),
    value: MINUTES[i],
  })),
);
const edges = NEEDS.map(([a, b]) => ({ source: `j${a}`, target: `j${b}` }));
const critical = ref(true);
</script>

<template>
  <div style="display: grid; gap: 12px; width: 100%">
    <Switch v-model="critical" :label="text.critical" />
    <DependencyGraph
      :nodes="nodes"
      :edges="edges"
      direction="LR"
      edge-style="orthogonal"
      :critical-path="critical"
      :height="380"
    />
  </div>
</template>

```
