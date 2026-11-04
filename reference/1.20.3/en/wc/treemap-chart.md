# Treemap

Nested rectangles whose areas are proportional to the values: shows at a glance what takes up the most room in a hierarchy (disk usage, budgets, portfolios). Hover or use the arrow keys to highlight a cell; the tooltip shows its path.

Package: minerva-design@1.20.3

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Media

Videos

Photos

Music

Applications

Projects

System

Library

Caches

Logs

Downloads

Installers

Archives

Disk usage by folder

{{path}}: {{size}} ({{share}} of the disk)

Click a cell to see where it lives

Engineering

Sales

Marketing

Customer success

Operations

Finance

People

Legal

Annual budget by department

Technology

Finance

Health care

Energy

Consumer

Market cap: {{value}}

Stock market map by sector, colored by the change of the day

{{share}} of the bundle

JavaScript bundle size by module

Total {{size}}; dependencies over 100 KB: {{modules}}.

Electronics

Home

Fashion

Sports

Phones

Laptops

Audio

Kitchen

Furniture

Decor

Women

Men

Kids

Outdoor

Fitness

Catalog path

All categories

Quarterly revenue by category, subcategory and brand

{{category}} revenue by subcategory and brand

{{path}}: {{revenue}}, {{share}} of the category.

Click a category to open it.

Click a brand to read its revenue.

Compute

Databases

Storage

Network

Observability

{{share}} of the bill

Monthly cloud costs by service and resource

Shown: {{visible}}, {{share}} of the {{total}} bill.

Monthly bill: {{total}}.

Show all

Live updates

{{used}} of {{limit}} ({{share}})

Memory used by the pods of the cluster, by namespace

Above {{threshold}} of their memory limit: {{pods}}

Every pod is below {{threshold}} of its memory limit.

Europe

Americas

Asia-Pacific

Metric

Revenue

Orders

Profit

{{share}} of the total ({{metric}})

Yearly sales by region and country: {{metric}}

## TreemapChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/treemap-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "gap",
    "typeText": "number",
    "attribute": "gap",
    "required": false
  },
  {
    "name": "hideHeaders",
    "typeText": "boolean",
    "attribute": "hide-headers",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly TreemapNode[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<TreemapChartOptions, \"type\">> | undefined",
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

## Example: Flat list

One rectangle per region, its area proportional to the population.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/treemap-chart/wc/flat.html

```html
<minerva-treemap-chart
  id="markets"
  gap="4"
  height="300"
></minerva-treemap-chart>

```

### apps/docs/src/docs/pages/treemap-chart/wc/flat.ts

```tsx
// A flat list: one rectangle per node, its area proportional to the value.
import type { MinervaTreemapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Asia", "Europe", "North America", "South America", "Africa", "Oceania"],
  zh: ["亚洲", "欧洲", "北美洲", "南美洲", "非洲", "大洋洲"],
  ja: ["アジア", "ヨーロッパ", "北米", "南米", "アフリカ", "オセアニア"],
  fr: [
    "Asie",
    "Europe",
    "Amérique du Nord",
    "Amérique du Sud",
    "Afrique",
    "Océanie",
  ],
};

export function setup(root: HTMLElement) {
  const regions =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaTreemapChart>("#markets")!;
  chart.data = [4750, 745, 600, 440, 1460, 46].map((value, i) => ({
    name: regions[i],
    value,
  }));
  chart.options = { format: (millions) => `${millions}M` };
}

```

## Example: Nested nodes

Disk usage by folder: parents sum their children and show their name above them.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/treemap-chart/wc/nested.html

```html
<minerva-treemap-chart id="disk" height="320"></minerva-treemap-chart>

```

### apps/docs/src/docs/pages/treemap-chart/wc/nested.ts

```tsx
// Parents sum their children and draw their name above them.
import type { MinervaTreemapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    media: "Media",
    documents: "Documents",
    apps: "Apps",
    photos: "Photos",
    videos: "Videos",
    music: "Music",
    work: "Work",
    personal: "Personal",
    tools: "Tools",
    games: "Games",
  },
  zh: {
    media: "媒体",
    documents: "文档",
    apps: "应用",
    photos: "照片",
    videos: "视频",
    music: "音乐",
    work: "工作",
    personal: "个人",
    tools: "工具",
    games: "游戏",
  },
  ja: {
    media: "メディア",
    documents: "書類",
    apps: "アプリ",
    photos: "写真",
    videos: "動画",
    music: "音楽",
    work: "仕事",
    personal: "個人",
    tools: "ツール",
    games: "ゲーム",
  },
  fr: {
    media: "Médias",
    documents: "Documents",
    apps: "Applications",
    photos: "Photos",
    videos: "Vidéos",
    music: "Musique",
    work: "Travail",
    personal: "Personnel",
    tools: "Outils",
    games: "Jeux",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaTreemapChart>("#disk")!;
  chart.data = [
    {
      name: text.media,
      children: [
        { name: text.photos, value: 48 },
        { name: text.videos, value: 96 },
        { name: text.music, value: 22 },
      ],
    },
    {
      name: text.documents,
      children: [
        { name: text.work, value: 31 },
        { name: text.personal, value: 12 },
      ],
    },
    {
      name: text.apps,
      children: [
        { name: text.tools, value: 40 },
        { name: text.games, value: 64 },
      ],
    },
  ];
  chart.options = { format: (gb) => `${gb} GB` };
}

```
