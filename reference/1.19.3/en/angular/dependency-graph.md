# Dependency graph

Directed acyclic graphs drawn in layers: package dependencies, build pipelines, data lineage, task plans. The Sugiyama layout breaks cycles, assigns layers, routes long edges through dummy nodes, reduces crossings and keeps long edges straight; edges are smooth splines or orthogonal connectors with arrowheads. Hover or select a node to highlight everything upstream and downstream, and show the critical path of a plan.

Package: minerva-design@1.19.3

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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

Native Angular: MnDependencyGraph. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDependencyGraph"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "direction",
    "typeText": "GraphDirection",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "dag",
    "typeText": "GraphDagOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "criticalPath",
    "typeText": "boolean | readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "nodes",
    "typeText": "readonly GraphNode[]",
    "required": true,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edges",
    "typeText": "readonly GraphEdge[]",
    "required": true,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "groups",
    "typeText": "readonly GraphGroup[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "nodeShape",
    "typeText": "GraphNodeShape | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "nodeSize",
    "typeText": "number | readonly [number, number] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edgeStyle",
    "typeText": "GraphEdgeStyle | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edgeWidth",
    "typeText": "number | readonly [number, number] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edgeColor",
    "typeText": "\"neutral\" | \"source\" | \"target\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "arrows",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "arrowStyle",
    "typeText": "\"open\" | \"filled\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "nodeLabels",
    "typeText": "boolean | \"auto\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edgeLabels",
    "typeText": "boolean | \"auto\" | \"hover\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "highlight",
    "typeText": "\"none\" | \"neighbors\" | \"lineage\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "selected",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "animation",
    "typeText": "number | boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "fitPadding",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "controls",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | GraphLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | GraphTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "interaction",
    "typeText": "boolean | GraphInteractionOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "labels",
    "typeText": "Partial<GraphChartLabels> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "GraphHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "itemClick",
    "typeText": "GraphHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "selectionChange",
    "typeText": "string[]",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "string[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "nodeToggle",
    "typeText": "GraphToggleEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "groupToggle",
    "typeText": "GraphGroupToggleEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphGroupToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "layoutEnd",
    "typeText": "GraphLayoutEndEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphLayoutEndEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: CI/CD pipeline

A build pipeline from left to right with orthogonal connectors. Groups color the jobs by status (the legend can hide some), the node value is the duration, and criticalPath highlights the longest chain of jobs, computed again with criticalPath() for the summary. Two artifacts go from the app build to the package job (parallel edges get their own routes), and the failed visual tests retry themselves (a self-loop).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, computed } from '@angular/core';
import { MnDependencyGraph, MnSwitch, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDependencyGraph, MnSwitch],
  template: `
@let t = text[language()];
<mn-switch [(checked)]="critical" [label]="t.critical" />
<mn-dependency-graph
  [nodes]="nodes()"
  [edges]="edges"
  direction="LR"
  edgeStyle="orthogonal"
  [criticalPath]="critical"
  [height]="380"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  critical = true;
  text = {
  "en": {
    "jobs": ["Install dependencies", "Lint", "Type check", "Unit tests", "Build", "E2E tests", "Package", "Deploy"],
    "minutes": "{n} min",
    "critical": "Critical path"
  },
  "zh": {
    "jobs": ["安装依赖", "代码检查", "类型检查", "单元测试", "构建", "端到端测试", "打包", "部署"],
    "minutes": "{n} 分钟",
    "critical": "关键路径"
  },
  "ja": {
    "jobs": ["依存関係のインストール", "Lint", "型チェック", "単体テスト", "ビルド", "E2E テスト", "パッケージ化", "デプロイ"],
    "minutes": "{n} 分",
    "critical": "クリティカルパス"
  },
  "fr": {
    "jobs": ["Installer les dépendances", "Analyse statique", "Vérification des types", "Tests unitaires", "Compilation", "Tests E2E", "Empaquetage", "Déploiement"],
    "minutes": "{n} min",
    "critical": "Chemin critique"
  }
};
  minutes = [3, 2, 3, 6, 5, 9, 2, 4];
  edges = [
  {
    "source": "j0",
    "target": "j1"
  },
  {
    "source": "j0",
    "target": "j2"
  },
  {
    "source": "j0",
    "target": "j3"
  },
  {
    "source": "j2",
    "target": "j4"
  },
  {
    "source": "j4",
    "target": "j5"
  },
  {
    "source": "j1",
    "target": "j6"
  },
  {
    "source": "j3",
    "target": "j6"
  },
  {
    "source": "j4",
    "target": "j6"
  },
  {
    "source": "j6",
    "target": "j7"
  },
  {
    "source": "j5",
    "target": "j7"
  }
];
  nodes = computed(() => {
    const t = this.text[this.language()];
    return t.jobs.map((label, i) => ({
      id: `j${i}`,
      label,
      subtitle: t.minutes.replace("{n}", String(this.minutes[i])),
      value: this.minutes[i],
    }));
  });
}

```

## Example: Module lineage

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, signal, computed } from '@angular/core';
import { MnDependencyGraph, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDependencyGraph],
  template: `
<mn-dependency-graph
  [nodes]="nodes()"
  [edges]="edges"
  [groups]="groups()"
  highlight="lineage"
  [locale]="language()"
  [height]="460"
  (selectionChange)="selection.set($event)"
/>
<output aria-live="polite">{{ status() }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  selection = signal<string[]>([]);
  text = {
  "en": {
    "modules": ["Utilities", "HTTP", "Translations", "UI components", "Charts", "API client", "Authentication", "State store", "Router", "Dashboard", "Reports", "Application"],
    "layers": ["Shared", "Core", "Features", "Application"],
    "hint": "Click a module to highlight its dependencies",
    "selected": "Selected: "
  },
  "zh": {
    "modules": ["工具函数", "HTTP", "多语言", "UI 组件", "图表", "API 客户端", "认证", "状态管理", "路由", "仪表盘", "报表", "应用"],
    "layers": ["共享", "核心", "功能", "应用"],
    "hint": "点击一个模块以高亮其依赖",
    "selected": "已选择："
  },
  "ja": {
    "modules": ["ユーティリティ", "HTTP", "翻訳", "UI コンポーネント", "チャート", "API クライアント", "認証", "状態管理", "ルーター", "ダッシュボード", "レポート", "アプリ"],
    "layers": ["共有", "コア", "機能", "アプリ"],
    "hint": "モジュールをクリックすると依存関係が強調表示されます",
    "selected": "選択中: "
  },
  "fr": {
    "modules": ["Utilitaires", "HTTP", "Traductions", "Composants UI", "Graphiques", "Client API", "Authentification", "Gestion d'état", "Routeur", "Tableau de bord", "Rapports", "Application"],
    "layers": ["Partagé", "Cœur", "Fonctionnalités", "Application"],
    "hint": "Cliquez sur un module pour mettre en évidence ses dépendances",
    "selected": "Sélection : "
  }
};
  layer = [0, 1, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3];
  edges = [
  {
    "source": "m0",
    "target": "m1"
  },
  {
    "source": "m1",
    "target": "m5"
  },
  {
    "source": "m5",
    "target": "m6"
  },
  {
    "source": "m5",
    "target": "m7"
  },
  {
    "source": "m6",
    "target": "m8"
  },
  {
    "source": "m0",
    "target": "m4"
  },
  {
    "source": "m2",
    "target": "m3"
  },
  {
    "source": "m3",
    "target": "m9"
  },
  {
    "source": "m3",
    "target": "m10"
  },
  {
    "source": "m4",
    "target": "m9"
  },
  {
    "source": "m4",
    "target": "m10"
  },
  {
    "source": "m5",
    "target": "m9"
  },
  {
    "source": "m5",
    "target": "m10"
  },
  {
    "source": "m7",
    "target": "m9"
  },
  {
    "source": "m7",
    "target": "m10"
  },
  {
    "source": "m8",
    "target": "m11"
  },
  {
    "source": "m9",
    "target": "m11"
  },
  {
    "source": "m10",
    "target": "m11"
  },
  {
    "source": "m6",
    "target": "m11"
  },
  {
    "source": "m2",
    "target": "m11"
  }
];
  nodes = computed(() =>
    this.text[this.language()].modules.map((label, i) => ({
      id: `m${i}`,
      label,
      group: `l${this.layer[i]}`,
    })),
  );
  groups = computed(() =>
    this.text[this.language()].layers.map((name, i) => ({ id: `l${i}`, name })),
  );
  status = computed(() => {
    const t = this.text[this.language()];
    const ids = this.selection();
    return ids.length
      ? t.selected + ids.map((id) => t.modules[Number(id.slice(1))]).join(", ")
      : t.hint;
  });
}

```
