# Radar chart

Compares one or a few items over several indicators with different scales (skills, product reviews, flavor profiles). Hover a polygon to highlight it and its nearest indicator; the arrow keys move between series and indicators, Esc clears; click a legend item to hide a series.

Package: minerva-design@1.23.1

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Problem solving

Coding

System design

Communication

Collaboration

Ownership

Candidate

{{value}} / {{max}}

Interview scorecard of a candidate

Aroma

Acidity

Sweetness

Body

Bitterness

Aftertaste

Ethiopia Yirgacheffe

Sumatra Mandheling

Flavor profiles of two coffees

Performance

Battery

Camera

Display

Value for money

Build quality

Review scores of three phones

Hover a polygon or use the arrow keys to compare the phones

Pace

Shooting

Passing

Dribbling

Defending

Physical

Attributes of two football players

Security

Integrations

Reporting

Mobile

Automation

Support

Pricing

Our product

Main competitor

Market average

Products to compare

Capability ratings of our product, a competitor and the market

Protein

Fiber

Sugar

Fat

Sodium

Calcium

Oatmeal with fruit

Eggs on toast

Yogurt with granola

{{value}} DV

{{meal}}: {{amount}} ({{share}})

Nutrients of three breakfasts, in percent of the daily value

CPU

Memory

Disk I/O

Network

Latency

Errors

Last hour average

Now

Live updates

Alert: {{metric}} is above {{threshold}} of its capacity.

Busiest metric: {{metric}}.

Current load of the service against the last hour's average

Communication

Delivery

Expertise

Collaboration

Mentoring

Initiative

Team average

Person

360° review ratings of {{name}} against the team average

Strongest: {{strength}} ({{strengthGap}} vs. the team). To develop: {{growth}} ({{growthGap}}).

Revenue

Deals won

Win rate

Avg. deal size

Calls

NPS

Target

Actual

{{kpi}}: {{actual}} for a target of {{target}} ({{attainment}}).

Quarterly KPIs of a sales rep against their targets

Click near an axis to read its KPI.

## RadarChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/radar-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "shape",
    "typeText": "\"polygon\" | \"circle\"",
    "attribute": "shape",
    "required": false
  },
  {
    "name": "levels",
    "typeText": "number",
    "attribute": "levels",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "indicators",
    "typeText": "readonly RadarIndicator[] | undefined",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly RadarSeries[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<RadarChartOptions, \"type\">> | undefined",
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

## Example: Circular grid

shape circle draws round grid rings, levels sets how many.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/wc/circle.html

```html
<minerva-radar-chart
  id="skills"
  shape="circle"
  levels="5"
  height="320"
></minerva-radar-chart>

```

### apps/docs/src/docs/pages/radar-chart/wc/circle.ts

```tsx
// `shape="circle"` draws round grid rings, `levels` sets how many.
import type { MinervaRadarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    profile: "Profile",
    skills: ["Frontend", "Backend", "Design", "Testing", "DevOps", "Data"],
  },
  zh: {
    profile: "能力画像",
    skills: ["前端", "后端", "设计", "测试", "运维", "数据"],
  },
  ja: {
    profile: "プロフィール",
    skills: [
      "フロントエンド",
      "バックエンド",
      "デザイン",
      "テスト",
      "DevOps",
      "データ",
    ],
  },
  fr: {
    profile: "Profil",
    skills: ["Front-end", "Back-end", "Design", "Tests", "DevOps", "Données"],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaRadarChart>("#skills")!;
  chart.indicators = text.skills.map((name) => ({ name, max: 10 }));
  chart.series = [{ name: text.profile, values: [9, 6, 7, 8, 5, 6] }];
}

```

## Example: Compare two series

Two models over five indicators; the legend hides or shows a series.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/wc/compare.html

```html
<minerva-radar-chart id="products" height="320"></minerva-radar-chart>

```

### apps/docs/src/docs/pages/radar-chart/wc/compare.ts

```tsx
// One polygon per series, one value per indicator (axes clockwise from 12
// o'clock); the legend hides / shows a series.
import type { MinervaRadarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    current: "Current model",
    next: "Next model",
    axes: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
  },
  zh: {
    current: "当前型号",
    next: "新型号",
    axes: ["速度", "可靠性", "舒适性", "安全性", "能效"],
  },
  ja: {
    current: "現行モデル",
    next: "次期モデル",
    axes: ["速度", "信頼性", "快適性", "安全性", "効率"],
  },
  fr: {
    current: "Modèle actuel",
    next: "Nouveau modèle",
    axes: ["Vitesse", "Fiabilité", "Confort", "Sécurité", "Efficacité"],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaRadarChart>("#products")!;
  chart.indicators = text.axes.map((name) => ({ name, max: 100 }));
  chart.series = [
    { name: text.current, values: [72, 85, 64, 90, 58] },
    { name: text.next, values: [88, 80, 78, 92, 81] },
  ];
}

```
