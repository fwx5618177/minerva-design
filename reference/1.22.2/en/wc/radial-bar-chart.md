# Radial bar chart

Progress as concentric rings: activity rings, OKR completion, sales against quota. Each bar fills its ring up to its value over its max, on a tinted background track, with rounded ends; labels sit in the open part of the circle and a center text can sum things up. Hover a ring or use the arrow keys to read its value, max and progress.

Package: minerva-design@1.22.2

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

Move

Exercise

Stand

Day of the week

rings closed

Activity rings of the selected day: move, exercise and stand against their goals

Activation rate

Week-4 retention

NPS above 50

p95 latency

Churn reduction

average completion

Completion of the quarter's key results

North

South

East

West

of quota

Quarterly sales of each region against its quota

CPU

Memory

Disk

Network

Shape

Three quarters

Full circle

Half circle

Rounded ends

Tracks

Server resource usage, in percent of capacity

Emergency fund

Summer holiday

New laptop

House deposit

Click a goal to see how long it will take.

{{goal}}: {{saved}} of {{target}} saved. {{remaining}} to go, about {{months}} months at {{monthly}} a month.

of all goals

Savings of each goal against its target

R. Silva

M. Kowalski

C. Okafor

L. Moreau

K. Tanaka

E. Jensen

Goals

Assists

Ranking

#{{rank}} {{name}}

{{stat}}: {{value}} in {{games}} games

{{ratio}} per game

League leaders of the season by {{stat}}

Leader: {{name}} ({{stat}}: {{value}})

Launch video

Event photos

Slides

Database backup

uploaded

Upload progress of each file

Restart

All files uploaded ({{size}}).

{{done}} of {{files}} files uploaded

I feel valued

My goals are clear

I can grow here

Work-life balance

My manager supports me

I'd recommend working here

Order

Survey order

Highest agreement first

Lowest agreement first

average agreement

{{agree}} of {{answered}} respondents agree ({{share}})

Share of employees who agree with each survey statement

## RadialBarChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/radial-bar-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "max",
    "typeText": "number | undefined",
    "attribute": "max",
    "required": false
  },
  {
    "name": "innerRadius",
    "typeText": "number",
    "attribute": "inner-radius",
    "required": false
  },
  {
    "name": "sweep",
    "typeText": "number",
    "attribute": "sweep",
    "required": false
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "attribute": "center-value",
    "required": false
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
    "attribute": "center-label",
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
    "typeText": "readonly RadialBarDatum[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<RadialBarChartOptions, \"type\">> | undefined",
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

## Example: Activity rings

Three full rings, each with its own goal (max); the center summarizes the day.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radial-bar-chart/wc/activity.html

```html
<minerva-radial-bar-chart
  id="activity"
  sweep="360"
  center-value="78 %"
></minerva-radial-bar-chart>

```

### apps/docs/src/docs/pages/radial-bar-chart/wc/activity.ts

```tsx
// Activity rings: each bar has its own `max` (the goal), `sweep="360"` makes
// full rings and the center texts summarize them.
import type { MinervaRadialBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { rings: ["Move", "Exercise", "Stand"], today: "of today’s goals" },
  zh: { rings: ["活动", "锻炼", "站立"], today: "今日目标" },
  ja: { rings: ["ムーブ", "エクササイズ", "スタンド"], today: "今日の目標" },
  fr: {
    rings: ["Bouger", "M’entraîner", "Me lever"],
    today: "des objectifs du jour",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaRadialBarChart>("#activity")!;
  chart.data = [
    { name: text.rings[0], value: 420, max: 500, color: "#ef4444" },
    { name: text.rings[1], value: 24, max: 30, color: "#22c55e" },
    { name: text.rings[2], value: 9, max: 12, color: "#06b6d4" },
  ];
  chart.centerLabel = text.today;
  chart.options = { labelContent: ["name", "percent"] };
}

```

## Example: Key results completion

Completion of five key results on one scale; the labels sit in the empty quarter of the 270° sweep.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radial-bar-chart/wc/okr.html

```html
<minerva-radial-bar-chart
  id="okr"
  max="100"
  inner-radius="0.2"
></minerva-radial-bar-chart>

```

### apps/docs/src/docs/pages/radial-bar-chart/wc/okr.ts

```tsx
// Key results completion on one scale (`max="100"`): the labels sit before
// the start of the bars, in the empty quarter left by the 270° sweep.
import type { MinervaRadialBarChart } from "minerva-design/web-components/chart";

const OKR = {
  en: ["Revenue", "New customers", "Retention", "NPS", "Hiring"],
  zh: ["营收", "新客户", "留存率", "净推荐值", "招聘"],
  ja: ["売上", "新規顧客", "継続率", "NPS", "採用"],
  fr: [
    "Chiffre d’affaires",
    "Nouveaux clients",
    "Rétention",
    "NPS",
    "Recrutement",
  ],
};

const DONE = [92, 74, 61, 48, 35];

export function setup(root: HTMLElement) {
  const names =
    OKR[document.documentElement.lang as keyof typeof OKR] ?? OKR.en;
  const chart = root.querySelector<MinervaRadialBarChart>("#okr")!;
  chart.data = names.map((name, i) => ({ name, value: DONE[i] }));
  chart.options = { format: (value) => `${value} %` };
}

```
