# Chord diagram

Flows between groups placed around a circle: each group is an arc sized by its flows, each flow a ribbon between two arcs. Undirected, a ribbon joins a pair of groups and is as wide as the flows between them in both directions (a symmetric matrix counts each relation once), so a group that only receives flows keeps its arc; directed, every direction has its own ribbon with an arrowhead. Hover a group to highlight its ribbons, hover a ribbon to read both directions; the legend hides / shows groups and the arrow keys walk through groups then ribbons.

Package: minerva-design@1.23.0

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Design

Engineering

Product

Marketing

Messages exchanged between four teams in a week

North America

Latin America

Europe

Africa

West Asia

South Asia

East Asia

Oceania

{{value}}M people

Migration flows between world regions over five years

app

router

store

ui-kit

api-client

auth

i18n

utils

Imports between the modules of a codebase

United States

China

European Union

Mexico

Canada

Japan

South Korea

Goods trade between major economies in a year

Home

Search

Category

Product

Cart

Checkout

{{value}}k visits

Hover a page or a ribbon

{{source}} → {{target}}: {{value}} (the other way: {{reverse}})

{{name}}: {{value}} in and out

Navigation between the pages of a shop app in a day

US East

US West

EU Central

Asia Pacific SE

Asia Pacific NE

South America

{{value}} Gbit/s

Replication traffic between data centers

Labels

Auto

Tangential

Radial

None

Group order

Data order

Largest first

Smallest first

Ribbon color

Gradient

Source

Target

Neutral

Directed

Ticks

Other operators

Year

{{year}}

{{name}} {{value}}

{{name}} won the most subscribers ({{value}} net). Net change: {{list}}.

Subscribers switching mobile operator in {{year}}

Physics

Chemistry

Biology

Medicine

Computer science

Mathematics

Economics

Engineering

Click a faculty to focus on its collaborations, or a ribbon to see a pair

{{name}}: {{total}} co-authored papers, mostly with {{partners}}

{{name}} ({{value}})

{{a}} and {{b}}: {{value}} co-authored papers

Clear

Papers co-authored by the faculties of a university over five years

Coffee

Milk

Bread

Pastries

Fruit

Cereal

Yogurt

Juice

{{a}} + {{b}}

Bought together in {{value}} baskets ({{share}} of all baskets)

{{value}} pairings with other categories

Product categories bought together in the same basket over a month

Gateway

Users

Orders

Inventory

Payments

Notifications

{{value}} calls/s

Total: {{total}}. Busiest: {{from}} → {{to}} ({{value}})

Pause

Resume

Live calls per second between microservices

London

Paris

Frankfurt

Istanbul

Dubai

Singapore

Tokyo

New York

{{value}}M passengers

Show all hubs

Eastern hubs

Western hubs

Show at least two hubs to see the routes between them

{{shown}} of {{total}} hubs shown: {{routes}} routes, {{passengers}} a year

Yearly passengers between major airport hubs

## ChordChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/chord-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "directed",
    "typeText": "boolean",
    "attribute": "directed",
    "required": false
  },
  {
    "name": "ribbonColor",
    "typeText": "\"gradient\" | \"source\" | \"target\" | \"neutral\"",
    "attribute": "ribbon-color",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "\"auto\" | \"tangential\" | \"radial\" | \"none\"",
    "attribute": "labels",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "groups",
    "typeText": "readonly (string | ChordGroup)[] | undefined",
    "required": false
  },
  {
    "name": "matrix",
    "typeText": "readonly (readonly number[])[] | undefined",
    "required": false
  },
  {
    "name": "links",
    "typeText": "readonly ChordLink[] | undefined",
    "required": false
  },
  {
    "name": "tickFormat",
    "typeText": "(value: number) => string | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<ChordChartOptions, \"type\">> | undefined",
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
    "description": "The hovered (or keyboard-focused) mark changed; detail: { index, name, value, share }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-click",
    "typeText": "CustomEvent",
    "description": "A mark was clicked, tapped or activated with Enter; detail: { index, name, value, share }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A legend item was clicked (or `toggle()` called); detail: { index, hidden, hiddenIndexes }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Directed flows in both directions

Moves between regions as a list of links, one ribbon per direction with arrowheads; the hover event gives both directions of a ribbon (value and reverseValue).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/wc/migration.html

```html
<div style="display: grid; gap: 8px; width: 100%">
  <minerva-chord-chart
    id="migration"
    directed
    ribbon-color="source"
  ></minerva-chord-chart>
  <output id="flow" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/chord-chart/wc/migration.ts

```tsx
// Moves between regions in a year (thousands of people), one ribbon per
// direction with arrowheads; minerva-hover reads both directions of a
// ribbon (`value` and `reverseValue`).
import type {
  MinervaChordChart,
  ShapeHoverEvent,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    regions: ["North", "South", "East", "West", "Center"],
    hint: "Hover a ribbon to compare both directions",
    flow: "{source} → {target}: {value}k · back: {reverse}k",
    group: "{name}: {value}k",
  },
  zh: {
    regions: ["北部", "南部", "东部", "西部", "中部"],
    hint: "悬停在流带上以比较两个方向",
    flow: "{source} → {target}：{value} 千人 · 反向：{reverse} 千人",
    group: "{name}：{value} 千人",
  },
  ja: {
    regions: ["北部", "南部", "東部", "西部", "中部"],
    hint: "リボンにカーソルを合わせると両方向を比較できます",
    flow: "{source} → {target}: {value} 千人 · 逆方向: {reverse} 千人",
    group: "{name}: {value} 千人",
  },
  fr: {
    regions: ["Nord", "Sud", "Est", "Ouest", "Centre"],
    hint: "Survolez un ruban pour comparer les deux sens",
    flow: "{source} → {target} : {value} k · retour : {reverse} k",
    group: "{name} : {value} k",
  },
};
// from, to (indexes in TEXT.regions), thousands of people
const MOVES = [
  [0, 1, 32],
  [1, 0, 18],
  [0, 4, 45],
  [4, 0, 22],
  [1, 4, 38],
  [4, 1, 30],
  [2, 4, 51],
  [4, 2, 26],
  [3, 4, 29],
  [4, 3, 35],
  [2, 3, 14],
  [3, 2, 21],
  [1, 2, 12],
  [2, 1, 9],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaChordChart>("#migration")!;
  const output = root.querySelector<HTMLOutputElement>("#flow")!;
  chart.groups = text.regions;
  chart.links = MOVES.map(([from, to, value]) => ({
    source: from,
    target: to,
    value,
  }));
  output.textContent = text.hint;
  const onHover = (event: Event) => {
    const hovered = (event as CustomEvent<ShapeHoverEvent | null>).detail;
    if (!hovered) output.textContent = text.hint;
    else if (hovered.source === undefined)
      output.textContent = text.group
        .replace("{name}", hovered.name)
        .replace("{value}", String(hovered.value));
    else
      output.textContent = text.flow
        .replace("{source}", hovered.source)
        .replace("{target}", hovered.target ?? "")
        .replace("{value}", String(hovered.value))
        .replace("{reverse}", String(hovered.reverseValue ?? 0));
  };
  chart.addEventListener("minerva-hover", onHover);
  return () => chart.removeEventListener("minerva-hover", onHover);
}

```

## Example: Messages between teams

A square matrix of the messages sent in a week (row: the sender, column: the recipient); hovering a team highlights its ribbons.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/wc/teams.html

```html
<minerva-chord-chart id="teams"></minerva-chord-chart>

```

### apps/docs/src/docs/pages/chord-chart/wc/teams.ts

```tsx
// Messages sent between teams in a week, from a square matrix (row: the
// sender, column: the recipient); hovering a team highlights its ribbons.
import type { MinervaChordChart } from "minerva-design/web-components/chart";

const TEAMS = {
  en: ["Design", "Engineering", "Product", "Marketing"],
  zh: ["设计", "研发", "产品", "市场"],
  ja: ["デザイン", "エンジニアリング", "プロダクト", "マーケティング"],
  fr: ["Design", "Ingénierie", "Produit", "Marketing"],
};
const MATRIX = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0],
];

export function setup(root: HTMLElement) {
  const chart = root.querySelector<MinervaChordChart>("#teams")!;
  chart.groups =
    TEAMS[document.documentElement.lang as keyof typeof TEAMS] ?? TEAMS.en;
  chart.matrix = MATRIX;
}

```
