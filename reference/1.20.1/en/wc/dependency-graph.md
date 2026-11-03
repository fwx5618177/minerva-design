# Dependency graph

Directed acyclic graphs drawn in layers: package dependencies, build pipelines, data lineage, task plans. The Sugiyama layout breaks cycles, assigns layers, routes long edges through dummy nodes, reduces crossings and keeps long edges straight; edges are smooth splines or orthogonal connectors with arrowheads. Hover or select a node to highlight everything upstream and downstream, and show the critical path of a plan.

Package: minerva-design@1.20.1

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/dependency-graph",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "direction",
    "typeText": "GraphDirection",
    "attribute": "direction",
    "required": false
  },
  {
    "name": "criticalPath",
    "typeText": "boolean | readonly string[] | undefined",
    "attribute": "critical-path",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "nodeShape",
    "typeText": "GraphNodeShape | undefined",
    "attribute": "node-shape",
    "required": false
  },
  {
    "name": "edgeStyle",
    "typeText": "GraphEdgeStyle | undefined",
    "attribute": "edge-style",
    "required": false
  },
  {
    "name": "edgeColor",
    "typeText": "\"neutral\" | \"source\" | \"target\"",
    "attribute": "edge-color",
    "required": false
  },
  {
    "name": "arrowStyle",
    "typeText": "\"open\" | \"filled\"",
    "attribute": "arrow-style",
    "required": false
  },
  {
    "name": "highlight",
    "typeText": "\"neighbors\" | \"lineage\" | \"none\" | undefined",
    "attribute": "highlight",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "attribute": "locale",
    "required": false
  },
  {
    "name": "nodes",
    "typeText": "readonly GraphNode[] | undefined",
    "required": false
  },
  {
    "name": "edges",
    "typeText": "readonly GraphEdge[] | undefined",
    "required": false
  },
  {
    "name": "groups",
    "typeText": "readonly GraphGroup[] | undefined",
    "required": false
  },
  {
    "name": "selected",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "GraphBaseOptions | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered (or keyboard-focused) node / edge changed; detail: { type, id, node, edge, index, group, color, degree, clientX, clientY }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-item-click",
    "typeText": "CustomEvent",
    "description": "A node or an edge was clicked (or a node activated with Enter); detail: { type, id, node, edge, index, group, color, degree, clientX, clientY }"
  },
  {
    "name": "minerva-selection-change",
    "typeText": "CustomEvent",
    "description": "The selection changed; detail: { ids }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A tree node was collapsed or expanded; detail: { id, collapsed }"
  },
  {
    "name": "minerva-group-toggle",
    "typeText": "CustomEvent",
    "description": "The legend showed / hid a group; detail: { group, hidden }"
  },
  {
    "name": "minerva-layout-end",
    "typeText": "CustomEvent",
    "description": "The layout is done (the force simulation cooled down); detail: { layout }"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend is ready (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Module lineage

Modules of a web application by layer; hovering or clicking a module highlights everything it needs and everything that needs it, and the selection is reported below.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/dependency-graph/wc/modules.html

```html
<div style="display: grid; gap: 8px; width: 100%">
  <minerva-dependency-graph
    id="modules"
    highlight="lineage"
    height="460"
  ></minerva-dependency-graph>
  <output id="module-selection" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/dependency-graph/wc/modules.ts

```tsx
// Modules of a web application, from the shared code at the top to the
// application at the bottom: hovering or clicking a module highlights its
// whole lineage (what it needs and what needs it).
import type { MinervaDependencyGraph } from "minerva-design/web-components/graph";

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaDependencyGraph>("#modules")!;
  const output = root.querySelector<HTMLOutputElement>("#module-selection")!;
  chart.nodes = text.modules.map((label, i) => ({
    id: `m${i}`,
    label,
    group: `l${LAYER[i]}`,
  }));
  chart.edges = USES.map(([a, b]) => ({ source: `m${a}`, target: `m${b}` }));
  chart.groups = text.layers.map((name, i) => ({ id: `l${i}`, name }));
  output.textContent = text.hint;
  const onSelect = (event: Event) => {
    const { ids } = (event as CustomEvent<{ ids: string[] }>).detail;
    output.textContent = ids.length
      ? text.selected +
        ids.map((id) => text.modules[Number(id.slice(1))]).join(", ")
      : text.hint;
  };
  chart.addEventListener("minerva-selection-change", onSelect);
  return () => chart.removeEventListener("minerva-selection-change", onSelect);
}

```

## Example: CI pipeline and critical path

Jobs from left to right with orthogonal edges; the duration of a job is its value, so the longest chain of jobs is highlighted, and the switch turns it off.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/dependency-graph/wc/pipeline.html

```html
<div style="display: grid; gap: 12px; width: 100%">
  <minerva-switch id="critical" checked></minerva-switch>
  <minerva-dependency-graph
    id="pipeline"
    direction="LR"
    edge-style="orthogonal"
    critical-path
    height="380"
  ></minerva-dependency-graph>
</div>

```

### apps/docs/src/docs/pages/dependency-graph/wc/pipeline.ts

```tsx
// A CI pipeline left to right: the duration of a job is its value, so the
// critical path (the longest chain of jobs) is highlighted and can be
// switched off.
import type { MinervaSwitch } from "minerva-design/web-components";
import type { MinervaDependencyGraph } from "minerva-design/web-components/graph";

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const toggle = root.querySelector<MinervaSwitch>("#critical")!;
  const chart = root.querySelector<MinervaDependencyGraph>("#pipeline")!;
  toggle.label = text.critical;
  chart.nodes = text.jobs.map((label, i) => ({
    id: `j${i}`,
    label,
    subtitle: text.minutes.replace("{n}", String(MINUTES[i])),
    value: MINUTES[i],
  }));
  chart.edges = NEEDS.map(([a, b]) => ({ source: `j${a}`, target: `j${b}` }));
  const onChange = () => {
    chart.criticalPath = toggle.checked;
  };
  toggle.addEventListener("minerva-change", onChange);
  return () => toggle.removeEventListener("minerva-change", onChange);
}

```
