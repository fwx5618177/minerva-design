# Graph chart

Relationship networks: people, organizations, services or any entities and the links between them. A force-directed layout (Barnes–Hut, in a Web Worker for large graphs) or circular and arc diagrams place the nodes; nodes and edges are drawn on the GPU (WebGPU, WebGL2, WebGL, Canvas2D fallback), so tens of thousands of nodes stay smooth. Hover a node to highlight its neighbors, drag it, toggle groups in the legend, and walk through the graph with the keyboard.

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
  "referenceSourceDigest": "sha256:c2b9c6e66069aa1acd454efc20d52cde92c1a1c820c1b3ab5302d01929cb4c39"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

#### Overview

GraphChart takes nodes, edges and optional groups. Groups give the colors and the legend, node values size the circles, and edge labels name the relationships.

Layouts: force (default) with link, many-body, gravity and collision forces and a deterministic seed; circular (grouped, with edges bundled through the center); arc diagram; dag and tree layouts are also available (see Dependency graph and Tree chart). The layouts are exported as pure functions for workers and mini-programs.

Rendering goes through the same GPU backends as the other charts, with an automatic WebGPU → WebGL2 → WebGL → Canvas2D fallback; the renderer in use is reported by onRendererChange and the data-renderer attribute.

Labels avoid each other: when zoomed out only the most important nodes keep their label, and edge labels appear when zooming in or when an edge is highlighted.

#### Interaction and accessibility

Drag the background to pan, Ctrl / ⌘ + wheel or pinch to zoom, drag a node to move it (the simulation follows), click to select (Ctrl / ⌘ + click adds), double click the background to fit. The buttons in the corner zoom and fit.

Focus the chart and use the arrow keys to move from node to node; Enter selects, + and - zoom, 0 fits, Esc clears. Focused nodes are announced with their group and number of links.

Built-in texts (summary, announcements, tooltip rows, buttons) exist in English, Chinese, Japanese and French and follow the page language; colors follow the light and dark themes.

Liu Bei

Guan Yu

Zhang Fei

Zhuge Liang

Zhao Yun

Ma Chao

Huang Zhong

Pang Tong

Jiang Wei

Liu Shan

Wei Yan

Fa Zheng

Cao Cao

Cao Pi

Sima Yi

Xiahou Dun

Xiahou Yuan

Zhang Liao

Xu Chu

Guo Jia

Xun Yu

Dian Wei

Cao Zhi

Sima Zhao

Deng Ai

Sun Quan

Sun Ce

Sun Jian

Zhou Yu

Lu Su

Lü Meng

Lu Xun

Gan Ning

Huang Gai

Xiao Qiao

Da Qiao

Sun Shangxiang

Lü Bu

Dong Zhuo

Diaochan

Yuan Shao

Emperor Xian

Wang Yun

Shu Han

Cao Wei

Eastern Wu

Warlords and Han court

Sworn brothers

Serves

Father and son

Married

Siblings

Rivals

Mentor

Adoptive father

Alliance

Defeated

Sworn friends

Relationships between the characters of Romance of the Three Kingdoms, by faction

Hover a character or a relationship, click to select; Ctrl / ⌘ + scroll zooms.

Selected: {{name}}

{{source}} → {{target}}: {{relation}}

, 

Member {{id}}

Community {{n}}

Generated network of 10,000 members in 40 communities

{{nodes}} nodes · {{edges}} links · renderer: {{renderer}} ·

simulating in a Web Worker…

layout done in {{seconds}} s

Edge

Commerce

Identity

Data

Bundle the edges through the center

Calls between microservices, grouped by domain

Systems

Functional

Object-oriented

Scripting

Influenced

Influences between programming languages

Force

Circular

Arc diagram

Layout

Click a character to center it.

{{name}}: {{links}} relationships

Layout: {{layout}}

Cart

Awaiting payment

Paid

Shipped

Delivered

Refunded

Cancelled

checkout

edit cart

pay

retry payment

timeout

cancel

payment reversed

ship

refund

tracking update

deliver

returned to sender

return

review

Open

Fulfilment

Closed

Filled arrowheads

Order states and the events between them

Healthy

Degraded

Critical

p95 {{value}} ms

{{value}} req/s

Live updates

Service map of an online store with the live health of every service

Click a service to read its metrics.

{{name}}: {{status}} · p95 {{latency}} ms · errors {{errors}} · {{rps}} req/s.

{{healthy}} healthy, {{degraded}} degraded, {{critical}} critical · updated at {{time}}

Marie Curie

Pierre Curie

Albert Einstein

Max Planck

Niels Bohr

Werner Heisenberg

Lise Meitner

Otto Hahn

Emmy Noether

Paris

Warsaw

Vienna

Berlin

Zurich

Copenhagen

Sorbonne

Kaiser Wilhelm Society

ETH Zurich

Niels Bohr Institute

Radioactivity

Relativity

Quantum theory

Uncertainty principle

Nuclear fission

Noether's theorem

born in

worked at

studied at

married to

contributed to

located in

influenced

part of

collaborated with

related to

People

Places

Institutions

Ideas

Search a person, a place or an idea…

Search the knowledge graph

No entity matches this search.

Knowledge graph of physicists, the places and institutions linked to them and their discoveries

Search an entity or click a node to list what the graph knows about it.

{{name}}: {{total}} facts — {{facts}}

→ {{name}} ({{relation}})

← {{name}} ({{relation}})

University friends

Colleagues

Climbing club

Book club

Friendships between 24 people in four circles

People {{name}} may know: {{list}}.

{{name}} (mutual friends: {{mutual}})

{{name}} already knows every friend of a friend.

Click another person to update the suggestions.

Device {{id}}

Card •••• {{last4}}

Account {{id}}

logged in from

paid with

Accounts

Flagged accounts

Devices

Cards

low

medium

high

Dark theme

Accounts, devices and payment cards, with two fraud rings sharing devices and cards

Cluster: {{accounts}} accounts, {{devices}} devices, {{cards}} cards · risk: {{risk}}

Click an account, a device or a card to select its whole cluster.

## GraphChart

Support: beta

Native Angular: MnGraphChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnGraphChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "layout",
    "typeText": "GraphLayoutType",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "direction",
    "typeText": "GraphDirection | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "force",
    "typeText": "GraphForceOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "circular",
    "typeText": "GraphCircularOptions | undefined",
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
    "name": "tree",
    "typeText": "GraphTreeOptions | undefined",
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

## Example: Air routes between hubs

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, computed } from '@angular/core';
import { MnGraphChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnGraphChart],
  template: `
<mn-graph-chart
  [nodes]="nodes()"
  [edges]="edges"
  [groups]="groups()"
  [nodeSize]="[10, 34]"
  [locale]="language()"
  [height]="440"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  cities = {
  "en": ["Beijing", "Shanghai", "Tokyo", "Seoul", "Singapore", "Dubai", "Sydney", "London", "Paris", "Frankfurt", "New York", "Chicago", "Los Angeles", "São Paulo"],
  "zh": ["北京", "上海", "东京", "首尔", "新加坡", "迪拜", "悉尼", "伦敦", "巴黎", "法兰克福", "纽约", "芝加哥", "洛杉矶", "圣保罗"],
  "ja": ["北京", "上海", "東京", "ソウル", "シンガポール", "ドバイ", "シドニー", "ロンドン", "パリ", "フランクフルト", "ニューヨーク", "シカゴ", "ロサンゼルス", "サンパウロ"],
  "fr": ["Pékin", "Shanghai", "Tokyo", "Séoul", "Singapour", "Dubaï", "Sydney", "Londres", "Paris", "Francfort", "New York", "Chicago", "Los Angeles", "São Paulo"]
};
  regions = {
  "en": ["Asia", "Oceania", "Europe", "Americas"],
  "zh": ["亚洲", "大洋洲", "欧洲", "美洲"],
  "ja": ["アジア", "オセアニア", "ヨーロッパ", "南北アメリカ"],
  "fr": ["Asie", "Océanie", "Europe", "Amériques"]
};
  hubs = [
  [0, 8],
  [0, 9],
  [0, 9],
  [0, 6],
  [0, 8],
  [0, 7],
  [1, 5],
  [2, 9],
  [2, 8],
  [2, 7],
  [3, 9],
  [3, 6],
  [3, 7],
  [3, 5]
];
  edges = [
  {
    "source": "c0",
    "target": "c1",
    "value": 120
  },
  {
    "source": "c0",
    "target": "c2",
    "value": 40
  },
  {
    "source": "c1",
    "target": "c2",
    "value": 55
  },
  {
    "source": "c2",
    "target": "c3",
    "value": 60
  },
  {
    "source": "c1",
    "target": "c3",
    "value": 35
  },
  {
    "source": "c1",
    "target": "c4",
    "value": 30
  },
  {
    "source": "c4",
    "target": "c6",
    "value": 28
  },
  {
    "source": "c2",
    "target": "c6",
    "value": 14
  },
  {
    "source": "c4",
    "target": "c5",
    "value": 25
  },
  {
    "source": "c5",
    "target": "c7",
    "value": 42
  },
  {
    "source": "c5",
    "target": "c8",
    "value": 21
  },
  {
    "source": "c5",
    "target": "c9",
    "value": 20
  },
  {
    "source": "c7",
    "target": "c8",
    "value": 70
  },
  {
    "source": "c7",
    "target": "c9",
    "value": 50
  },
  {
    "source": "c8",
    "target": "c9",
    "value": 35
  },
  {
    "source": "c7",
    "target": "c10",
    "value": 80
  },
  {
    "source": "c8",
    "target": "c10",
    "value": 40
  },
  {
    "source": "c9",
    "target": "c11",
    "value": 14
  },
  {
    "source": "c10",
    "target": "c11",
    "value": 90
  },
  {
    "source": "c10",
    "target": "c12",
    "value": 85
  },
  {
    "source": "c11",
    "target": "c12",
    "value": 60
  },
  {
    "source": "c12",
    "target": "c2",
    "value": 28
  },
  {
    "source": "c12",
    "target": "c6",
    "value": 14
  },
  {
    "source": "c10",
    "target": "c13",
    "value": 21
  },
  {
    "source": "c12",
    "target": "c1",
    "value": 18
  },
  {
    "source": "c0",
    "target": "c9",
    "value": 12
  },
  {
    "source": "c4",
    "target": "c7",
    "value": 21
  }
];
  nodes = computed(() =>
    this.cities[this.language()].map((label, i) => ({
      id: `c${i}`,
      label,
      group: `r${this.hubs[i][0]}`,
      value: this.hubs[i][1],
    })),
  );
  groups = computed(() =>
    this.regions[this.language()].map((name, i) => ({ id: `r${i}`, name })),
  );
}

```

## Example: Circular layout

Calls between microservices, grouped by domain around a circle. Edge widths follow the call volume, edgeColor="source" tints each edge with its caller, and the tension bundles the edges through the center.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, signal, computed } from '@angular/core';
import { MnGraphChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnGraphChart],
  template: `
<mn-graph-chart
  [nodes]="nodes()"
  [edges]="edges"
  [groups]="groups()"
  layout="circular"
  edgeColor="source"
  [locale]="language()"
  [height]="440"
  (selectionChange)="selection.set($event)"
/>
<output aria-live="polite">{{ status() }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  selection = signal<string[]>([]);
  cities = {
  "en": ["Beijing", "Shanghai", "Tokyo", "Seoul", "Singapore", "Dubai", "Sydney", "London", "Paris", "Frankfurt", "New York", "Chicago", "Los Angeles", "São Paulo"],
  "zh": ["北京", "上海", "东京", "首尔", "新加坡", "迪拜", "悉尼", "伦敦", "巴黎", "法兰克福", "纽约", "芝加哥", "洛杉矶", "圣保罗"],
  "ja": ["北京", "上海", "東京", "ソウル", "シンガポール", "ドバイ", "シドニー", "ロンドン", "パリ", "フランクフルト", "ニューヨーク", "シカゴ", "ロサンゼルス", "サンパウロ"],
  "fr": ["Pékin", "Shanghai", "Tokyo", "Séoul", "Singapour", "Dubaï", "Sydney", "Londres", "Paris", "Francfort", "New York", "Chicago", "Los Angeles", "São Paulo"]
};
  regions = {
  "en": ["Asia", "Oceania", "Europe", "Americas"],
  "zh": ["亚洲", "大洋洲", "欧洲", "美洲"],
  "ja": ["アジア", "オセアニア", "ヨーロッパ", "南北アメリカ"],
  "fr": ["Asie", "Océanie", "Europe", "Amériques"]
};
  hubs = [
  [0, 8],
  [0, 9],
  [0, 9],
  [0, 6],
  [0, 8],
  [0, 7],
  [1, 5],
  [2, 9],
  [2, 8],
  [2, 7],
  [3, 9],
  [3, 6],
  [3, 7],
  [3, 5]
];
  edges = [
  {
    "source": "c0",
    "target": "c1",
    "value": 120
  },
  {
    "source": "c0",
    "target": "c2",
    "value": 40
  },
  {
    "source": "c1",
    "target": "c2",
    "value": 55
  },
  {
    "source": "c2",
    "target": "c3",
    "value": 60
  },
  {
    "source": "c1",
    "target": "c3",
    "value": 35
  },
  {
    "source": "c1",
    "target": "c4",
    "value": 30
  },
  {
    "source": "c4",
    "target": "c6",
    "value": 28
  },
  {
    "source": "c2",
    "target": "c6",
    "value": 14
  },
  {
    "source": "c4",
    "target": "c5",
    "value": 25
  },
  {
    "source": "c5",
    "target": "c7",
    "value": 42
  },
  {
    "source": "c5",
    "target": "c8",
    "value": 21
  },
  {
    "source": "c5",
    "target": "c9",
    "value": 20
  },
  {
    "source": "c7",
    "target": "c8",
    "value": 70
  },
  {
    "source": "c7",
    "target": "c9",
    "value": 50
  },
  {
    "source": "c8",
    "target": "c9",
    "value": 35
  },
  {
    "source": "c7",
    "target": "c10",
    "value": 80
  },
  {
    "source": "c8",
    "target": "c10",
    "value": 40
  },
  {
    "source": "c9",
    "target": "c11",
    "value": 14
  },
  {
    "source": "c10",
    "target": "c11",
    "value": 90
  },
  {
    "source": "c10",
    "target": "c12",
    "value": 85
  },
  {
    "source": "c11",
    "target": "c12",
    "value": 60
  },
  {
    "source": "c12",
    "target": "c2",
    "value": 28
  },
  {
    "source": "c12",
    "target": "c6",
    "value": 14
  },
  {
    "source": "c10",
    "target": "c13",
    "value": 21
  },
  {
    "source": "c12",
    "target": "c1",
    "value": 18
  },
  {
    "source": "c0",
    "target": "c9",
    "value": 12
  },
  {
    "source": "c4",
    "target": "c7",
    "value": 21
  }
];
  labels = {
  "en": {
    "hint": "Click a city to see its routes",
    "selected": "Selected: "
  },
  "zh": {
    "hint": "点击一个城市查看其航线",
    "selected": "已选择："
  },
  "ja": {
    "hint": "都市をクリックすると路線が表示されます",
    "selected": "選択中: "
  },
  "fr": {
    "hint": "Cliquez sur une ville pour voir ses liaisons",
    "selected": "Sélection : "
  }
};
  nodes = computed(() =>
    this.cities[this.language()].map((label, i) => ({
      id: `c${i}`,
      label,
      group: `r${this.hubs[i][0]}`,
    })),
  );
  groups = computed(() =>
    this.regions[this.language()].map((name, i) => ({ id: `r${i}`, name })),
  );
  status = computed(() => {
    const t = this.labels[this.language()];
    const names = this.cities[this.language()];
    const ids = this.selection();
    return ids.length
      ? t.selected + ids.map((id) => names[Number(id.slice(1))]).join(", ")
      : t.hint;
  });
}

```
