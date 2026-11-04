# Horizontal bar chart

Bars growing from the left with the categories down the side: rankings, long names, diverging surveys and progress.

Package: minerva-design@1.20.6

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

Developers

Share of developers using each programming language

I see a career path here

My workload is manageable

I have the tools I need

My manager supports me

I am paid fairly

Strongly disagree

Disagree

Agree

Strongly agree

Employee survey answers, disagreement on the left and agreement on the right

Done

In review

To do

Platform

Payments

Mobile

Growth

Design

Status of the milestone issues of each team

Votes

Dark mode for every page and email

Offline mode on mobile devices

Export reports as PDF with charts

Single sign-on with SAML and OIDC

Two-way calendar synchronization

Edit many records at once

Custom fields on every object

Votes of the most requested features

Budget

Actual

Engineering

Marketing

Sales

Support

Finance

Budget and actual spend per department

Change

North America

Europe

Asia Pacific

Latin America

Middle East

Africa

Change of the monthly active users per region

Users

Messages

Photos

Maps

Music

Notes

Monthly active users per app

{{app}}: {{users}} M users

Tap a bar

Revenue

Units sold

Wireless headphones

Smartwatch

Bluetooth speaker

Mechanical keyboard

Fast charger

HD webcam

Wireless mouse

Tablet

USB-C cable

Laptop stand

Rank by

Rows shown

Top {{n}}

All products

Best-selling products of last month, from highest to lowest

These {{n}} products make {{share}} of the total.

{{value}} GW

Solar capacity

Play

Pause

Play again

Back to the start

Countries with the most installed solar capacity at the end of {{year}}

Salary band

Junior

Intermediate

Senior

Staff

Principal

Director

Offer

Minimum

Midpoint

Maximum

Offer / midpoint

Offer −{{step}}

Offer +{{step}}

An offer of {{offer}} fits the {{levels}} bands.

An offer of {{offer}} is outside every band.

Yearly salary band of each job level, with the offer as a vertical line

Error budget left

Release freeze

Error budget left to each service over the last 30 days, worst first

SLO {{slo}}, measured availability {{availability}}

{{minutes}} of downtime left out of {{allowed}}.

Budget overspent by {{minutes}}.

Click a service to see its budget.

## HorizontalBarChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/horizontal-bar-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "stacked",
    "typeText": "boolean",
    "attribute": "stacked",
    "required": false
  },
  {
    "name": "percent",
    "typeText": "boolean",
    "attribute": "percent",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "boolean",
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
    "name": "series",
    "typeText": "readonly ChartSeries[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "ChartBaseOptions | undefined",
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
    "description": "The hovered (or keyboard-focused) points changed; detail: { x, xLabel, items }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-point-click",
    "typeText": "CustomEvent",
    "description": "A point or a bar was clicked; detail: { x, xLabel, items }"
  },
  {
    "name": "minerva-plot-click",
    "typeText": "CustomEvent",
    "description": "The plot area was clicked where there is no point; detail: { x, y }"
  },
  {
    "name": "minerva-zoom",
    "typeText": "CustomEvent",
    "description": "The user zoomed or panned; detail: { x, y } (the visible ranges)"
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

## Example: Most visited pages

Categories down the left side keep long names readable; labels write the value at the end of every bar.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/horizontal-bar-chart/wc/ranking.html

```html
<minerva-horizontal-bar-chart
  id="pages"
  labels
  height="300"
></minerva-horizontal-bar-chart>

```

### apps/docs/src/docs/pages/horizontal-bar-chart/wc/ranking.ts

```tsx
// <minerva-horizontal-bar-chart>: categories down the left side, long names
// stay readable; `labels` writes the value at the end of every bar.
import type { MinervaHorizontalBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    views: "Page views",
    pages: ["Home", "Pricing", "Documentation", "Blog", "Careers", "Contact"],
  },
  zh: {
    views: "浏览量",
    pages: ["首页", "价格", "文档", "博客", "招聘", "联系我们"],
  },
  ja: {
    views: "ページビュー",
    pages: [
      "ホーム",
      "料金",
      "ドキュメント",
      "ブログ",
      "採用情報",
      "お問い合わせ",
    ],
  },
  fr: {
    views: "Pages vues",
    pages: [
      "Accueil",
      "Tarifs",
      "Documentation",
      "Blog",
      "Carrières",
      "Contact",
    ],
  },
};

const VIEWS = [48200, 31900, 27400, 15800, 9100, 4300];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHorizontalBarChart>("#pages")!;
  chart.series = [
    {
      name: text.views,
      data: VIEWS.map((y, i) => ({ x: text.pages[i], y })),
    },
  ];
  chart.options = { xAxis: { type: "category" } };
}

```

## Example: Survey answers, 100 % stacked

Stacked and percent: every row adds up to 100 %; click a legend item to hide an answer.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/horizontal-bar-chart/wc/survey.html

```html
<minerva-horizontal-bar-chart
  id="survey"
  stacked
  percent
  height="260"
></minerva-horizontal-bar-chart>

```

### apps/docs/src/docs/pages/horizontal-bar-chart/wc/survey.ts

```tsx
// `stacked percent`: every row adds up to 100 %, a survey answered on a
// three-point scale; the legend toggles an answer.
import type { MinervaHorizontalBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    answers: ["Agree", "Neutral", "Disagree"],
    questions: [
      "Easy to set up",
      "Good documentation",
      "Fast enough",
      "Would recommend",
    ],
  },
  zh: {
    answers: ["同意", "中立", "不同意"],
    questions: ["易于上手", "文档完善", "速度够快", "愿意推荐"],
  },
  ja: {
    answers: ["そう思う", "どちらでもない", "そう思わない"],
    questions: [
      "導入が簡単",
      "ドキュメントが充実",
      "十分に速い",
      "人に勧めたい",
    ],
  },
  fr: {
    answers: ["D’accord", "Neutre", "Pas d’accord"],
    questions: [
      "Facile à installer",
      "Bonne documentation",
      "Assez rapide",
      "Je recommande",
    ],
  },
};

// answers per question: agree, neutral, disagree
const ANSWERS = [
  [72, 18, 10],
  [58, 27, 15],
  [64, 21, 15],
  [81, 12, 7],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHorizontalBarChart>("#survey")!;
  chart.series = text.answers.map((name, k) => ({
    name,
    data: text.questions.map((x, i) => ({ x, y: ANSWERS[i][k] })),
  }));
  chart.options = {
    xAxis: { type: "category" },
    palette: [
      "var(--success-color, #16a34a)",
      "var(--text-secondary-color, #9ca3af)",
      "var(--danger-color, #dc2626)",
    ],
  };
}

```
