# Graph chart

Relationship networks: people, organizations, services or any entities and the links between them. A force-directed layout (Barnes–Hut, in a Web Worker for large graphs) or circular and arc diagrams place the nodes; nodes and edges are drawn on the GPU (WebGPU, WebGL2, WebGL, Canvas2D fallback), so tens of thousands of nodes stay smooth. Hover a node to highlight its neighbors, drag it, toggle groups in the legend, and walk through the graph with the keyboard.

Package: minerva-design@1.23.2

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/graph-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "layout",
    "typeText": "GraphLayoutType",
    "attribute": "layout",
    "required": false
  },
  {
    "name": "direction",
    "typeText": "GraphDirection | undefined",
    "attribute": "direction",
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

## Example: Circular layout and selection

The same routes on a circle grouped by region, edges tinted with the color of their source; clicking cities (Ctrl / ⌘ + click to add) reports the selection.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/wc/circular.html

```html
<div style="display: grid; gap: 8px; width: 100%">
  <minerva-graph-chart
    id="circle"
    layout="circular"
    edge-color="source"
    height="440"
  ></minerva-graph-chart>
  <output id="selection" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/graph-chart/wc/circular.ts

```tsx
// The same routes on a circle, grouped by region, edges tinted with the
// color of their source; click cities (Ctrl / ⌘ + click to add) and
// minerva-selection-change lists the selection.
import type { MinervaGraphChart } from "minerva-design/web-components/graph";

const CITIES = {
  en: [
    "Beijing",
    "Shanghai",
    "Tokyo",
    "Seoul",
    "Singapore",
    "Dubai",
    "Sydney",
    "London",
    "Paris",
    "Frankfurt",
    "New York",
    "Chicago",
    "Los Angeles",
    "São Paulo",
  ],
  zh: [
    "北京",
    "上海",
    "东京",
    "首尔",
    "新加坡",
    "迪拜",
    "悉尼",
    "伦敦",
    "巴黎",
    "法兰克福",
    "纽约",
    "芝加哥",
    "洛杉矶",
    "圣保罗",
  ],
  ja: [
    "北京",
    "上海",
    "東京",
    "ソウル",
    "シンガポール",
    "ドバイ",
    "シドニー",
    "ロンドン",
    "パリ",
    "フランクフルト",
    "ニューヨーク",
    "シカゴ",
    "ロサンゼルス",
    "サンパウロ",
  ],
  fr: [
    "Pékin",
    "Shanghai",
    "Tokyo",
    "Séoul",
    "Singapour",
    "Dubaï",
    "Sydney",
    "Londres",
    "Paris",
    "Francfort",
    "New York",
    "Chicago",
    "Los Angeles",
    "São Paulo",
  ],
};
const REGIONS = {
  en: ["Asia", "Oceania", "Europe", "Americas"],
  zh: ["亚洲", "大洋洲", "欧洲", "美洲"],
  ja: ["アジア", "オセアニア", "ヨーロッパ", "南北アメリカ"],
  fr: ["Asie", "Océanie", "Europe", "Amériques"],
};
const TEXT = {
  en: { hint: "Click a city to see its routes", selected: "Selected: " },
  zh: { hint: "点击一个城市查看其航线", selected: "已选择：" },
  ja: { hint: "都市をクリックすると路線が表示されます", selected: "選択中: " },
  fr: {
    hint: "Cliquez sur une ville pour voir ses liaisons",
    selected: "Sélection : ",
  },
};
// region (index in REGIONS) of each city of CITIES
const REGION_OF = [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 3, 3, 3, 3];
// weekly flights between two cities (indexes in CITIES)
const ROUTES = [
  [0, 1, 120],
  [0, 2, 40],
  [1, 2, 55],
  [2, 3, 60],
  [1, 3, 35],
  [1, 4, 30],
  [4, 6, 28],
  [2, 6, 14],
  [4, 5, 25],
  [5, 7, 42],
  [5, 8, 21],
  [5, 9, 20],
  [7, 8, 70],
  [7, 9, 50],
  [8, 9, 35],
  [7, 10, 80],
  [8, 10, 40],
  [9, 11, 14],
  [10, 11, 90],
  [10, 12, 85],
  [11, 12, 60],
  [12, 2, 28],
  [12, 6, 14],
  [10, 13, 21],
  [12, 1, 18],
  [0, 9, 12],
  [4, 7, 21],
];

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof CITIES;
  const names = CITIES[lang] ?? CITIES.en;
  const text = TEXT[lang] ?? TEXT.en;
  const chart = root.querySelector<MinervaGraphChart>("#circle")!;
  const output = root.querySelector<HTMLOutputElement>("#selection")!;
  chart.nodes = names.map((label, i) => ({
    id: `c${i}`,
    label,
    group: `r${REGION_OF[i]}`,
  }));
  chart.edges = ROUTES.map(([a, b, flights]) => ({
    source: `c${a}`,
    target: `c${b}`,
    value: flights,
  }));
  chart.groups = (REGIONS[lang] ?? REGIONS.en).map((name, i) => ({
    id: `r${i}`,
    name,
  }));
  output.textContent = text.hint;
  const onSelect = (event: Event) => {
    const { ids } = (event as CustomEvent<{ ids: string[] }>).detail;
    output.textContent = ids.length
      ? text.selected + ids.map((id) => names[Number(id.slice(1))]).join(", ")
      : text.hint;
  };
  chart.addEventListener("minerva-selection-change", onSelect);
  return () => chart.removeEventListener("minerva-selection-change", onSelect);
}

```

## Example: Air routes between hubs

A force-directed network of hub cities: node size from the size of the hub, edge width from the weekly flights, colors by region; names follow the page language.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/graph-chart/wc/routes.html

```html
<minerva-graph-chart id="routes" height="440"></minerva-graph-chart>

```

### apps/docs/src/docs/pages/graph-chart/wc/routes.ts

```tsx
// Air routes between hub cities: a force-directed network, node size from
// the size of the hub, edge width from the weekly flights, colored by region.
import type { MinervaGraphChart } from "minerva-design/web-components/graph";

const CITIES = {
  en: [
    "Beijing",
    "Shanghai",
    "Tokyo",
    "Seoul",
    "Singapore",
    "Dubai",
    "Sydney",
    "London",
    "Paris",
    "Frankfurt",
    "New York",
    "Chicago",
    "Los Angeles",
    "São Paulo",
  ],
  zh: [
    "北京",
    "上海",
    "东京",
    "首尔",
    "新加坡",
    "迪拜",
    "悉尼",
    "伦敦",
    "巴黎",
    "法兰克福",
    "纽约",
    "芝加哥",
    "洛杉矶",
    "圣保罗",
  ],
  ja: [
    "北京",
    "上海",
    "東京",
    "ソウル",
    "シンガポール",
    "ドバイ",
    "シドニー",
    "ロンドン",
    "パリ",
    "フランクフルト",
    "ニューヨーク",
    "シカゴ",
    "ロサンゼルス",
    "サンパウロ",
  ],
  fr: [
    "Pékin",
    "Shanghai",
    "Tokyo",
    "Séoul",
    "Singapour",
    "Dubaï",
    "Sydney",
    "Londres",
    "Paris",
    "Francfort",
    "New York",
    "Chicago",
    "Los Angeles",
    "São Paulo",
  ],
};
const REGIONS = {
  en: ["Asia", "Oceania", "Europe", "Americas"],
  zh: ["亚洲", "大洋洲", "欧洲", "美洲"],
  ja: ["アジア", "オセアニア", "ヨーロッパ", "南北アメリカ"],
  fr: ["Asie", "Océanie", "Europe", "Amériques"],
};
// region (index in REGIONS) and size of the hub, in the order of CITIES
const HUBS = [
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
  [3, 5],
];
// weekly flights between two cities (indexes in CITIES)
const ROUTES = [
  [0, 1, 120],
  [0, 2, 40],
  [1, 2, 55],
  [2, 3, 60],
  [1, 3, 35],
  [1, 4, 30],
  [4, 6, 28],
  [2, 6, 14],
  [4, 5, 25],
  [5, 7, 42],
  [5, 8, 21],
  [5, 9, 20],
  [7, 8, 70],
  [7, 9, 50],
  [8, 9, 35],
  [7, 10, 80],
  [8, 10, 40],
  [9, 11, 14],
  [10, 11, 90],
  [10, 12, 85],
  [11, 12, 60],
  [12, 2, 28],
  [12, 6, 14],
  [10, 13, 21],
  [12, 1, 18],
  [0, 9, 12],
  [4, 7, 21],
];

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof CITIES;
  const names = CITIES[lang] ?? CITIES.en;
  const chart = root.querySelector<MinervaGraphChart>("#routes")!;
  chart.nodes = HUBS.map(([region, size], i) => ({
    id: `c${i}`,
    label: names[i],
    group: `r${region}`,
    value: size,
  }));
  chart.edges = ROUTES.map(([a, b, flights]) => ({
    source: `c${a}`,
    target: `c${b}`,
    value: flights,
  }));
  chart.groups = (REGIONS[lang] ?? REGIONS.en).map((name, i) => ({
    id: `r${i}`,
    name,
  }));
  chart.options = { nodeSize: [10, 34] };
}

```
