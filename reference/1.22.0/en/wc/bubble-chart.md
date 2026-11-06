# Bubble chart

Scatter charts with a third value drawn as the size of the dots: the area of a bubble is proportional to its value.

Package: minerva-design@1.22.0

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Asia

Europe

Americas

Africa

Population

GDP per capita

Life expectancy (years)

GDP per capita, life expectancy and population of countries

Products

Revenue

Cloud storage

Analytics

Mobile SDK

Payments

Desktop app

Hardware

Consulting

Relative market share

Market growth

Market leader

High growth

Market share, growth and revenue of the products

Qualified

Proposal

Negotiation

Amount

Deal #{{id}}

Days in the pipeline

Win probability

{{deal}} ({{stage}}): {{amount}}

Click a bubble

Open deals by age, win probability and amount

GDP per capita (log scale)

High income

Life expectancy against GDP per capita on a log scale, sized by population

Visible incomes: {{from}} – {{to}}

Zoom to see the visible range in dollars

Infrastructure

Security

People

Budget

Exposure

Power outage

Hardware delivery delay

Network cutover

Data leak

Access review backlog

Key person leaves

Vendor skills shortage

Training gap

License cost increase

Exchange rate

Acceptable

Critical

Likelihood {{likelihood}} × impact {{impact}} = {{score}}

Exposure: {{value}}

Likelihood

Impact

Project risks by likelihood, impact and cost exposure

Search

Social

Video

Email

Budget

Launched on {{date}}

Launch date

Return on ad spend

Break-even

Marketing campaigns by launch date, return on ad spend and budget

North

South

East

West

Center

Same size scale in both charts

Both charts draw {{value}} with the largest bubble.

Each chart draws its own largest revenue with the largest bubble.

Sales per m²

Margin

Sales per square meter, margin and revenue of the store regions in {{year}}

Play

Pause

Replay

Restart

Year: {{year}}

Fertility (children per woman)

Fertility, life expectancy and population of countries from 1990 to 2025

## BubbleChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/bubble-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "minSize",
    "typeText": "number",
    "attribute": "min-size",
    "required": false
  },
  {
    "name": "maxSize",
    "typeText": "number",
    "attribute": "max-size",
    "required": false
  },
  {
    "name": "maxValue",
    "typeText": "number | undefined",
    "attribute": "max-value",
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

## Example: Wealth, health and population

GDP per capita against life expectancy, bubbles sized by population (area proportional to the value).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bubble-chart/wc/countries.html

```html
<minerva-bubble-chart
  id="countries"
  max-size="64"
  height="320"
></minerva-bubble-chart>

```

### apps/docs/src/docs/pages/bubble-chart/wc/countries.ts

```tsx
// Three values per point: wealth (x), life expectancy (y) and population
// (`value`, the area of the bubble); the country is the point label.
import type { MinervaBubbleChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    gdp: "GDP per capita (k$)",
    life: "Life expectancy",
    names: [
      "Japan",
      "France",
      "China",
      "Brazil",
      "India",
      "Nigeria",
      "Germany",
      "Mexico",
    ],
  },
  zh: {
    gdp: "人均 GDP（千美元）",
    life: "预期寿命",
    names: [
      "日本",
      "法国",
      "中国",
      "巴西",
      "印度",
      "尼日利亚",
      "德国",
      "墨西哥",
    ],
  },
  ja: {
    gdp: "1 人あたり GDP（千ドル）",
    life: "平均寿命",
    names: [
      "日本",
      "フランス",
      "中国",
      "ブラジル",
      "インド",
      "ナイジェリア",
      "ドイツ",
      "メキシコ",
    ],
  },
  fr: {
    gdp: "PIB par habitant (k$)",
    life: "Espérance de vie",
    names: [
      "Japon",
      "France",
      "Chine",
      "Brésil",
      "Inde",
      "Nigeria",
      "Allemagne",
      "Mexique",
    ],
  },
};

// GDP per capita (k$), life expectancy (years), population (millions)
const COUNTRIES = [
  [34, 84.5, 124],
  [44, 82.5, 68],
  [12.6, 78.6, 1410],
  [9, 75.9, 216],
  [2.5, 70.8, 1430],
  [2.2, 53.6, 224],
  [52, 81.2, 84],
  [11.5, 75, 128],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBubbleChart>("#countries")!;
  chart.series = [
    {
      name: text.life,
      showLabels: true,
      data: COUNTRIES.map(([x, y, value], i) => ({
        x,
        y,
        value,
        label: text.names[i],
      })),
    },
  ];
  chart.options = {
    xAxis: { title: text.gdp },
    yAxis: { title: text.life, min: 50 },
  };
}

```

## Example: Portfolio risk and return

One series per asset, sized by its share of the portfolio; clicking a bubble reports the asset.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bubble-chart/wc/portfolio.html

```html
<div style="display: grid; gap: 8px">
  <minerva-bubble-chart id="portfolio" height="300"></minerva-bubble-chart>
  <output id="asset" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/bubble-chart/wc/portfolio.ts

```tsx
// A portfolio: risk against return, bubbles sized by the share of each
// asset; minerva-point-click reports the clicked asset.
import type {
  ChartHoverEvent,
  MinervaBubbleChart,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    risk: "Risk (volatility %)",
    return: "Expected return %",
    hint: "Click a bubble",
    assets: [
      "Bonds",
      "Index fund",
      "Real estate",
      "Tech stocks",
      "Gold",
      "Start-ups",
    ],
  },
  zh: {
    risk: "风险（波动率 %）",
    return: "预期收益 %",
    hint: "点击一个气泡",
    assets: ["债券", "指数基金", "房地产", "科技股", "黄金", "初创企业"],
  },
  ja: {
    risk: "リスク（ボラティリティ %）",
    return: "期待リターン %",
    hint: "バブルをクリックします",
    assets: [
      "債券",
      "インデックスファンド",
      "不動産",
      "ハイテク株",
      "金",
      "スタートアップ",
    ],
  },
  fr: {
    risk: "Risque (volatilité %)",
    return: "Rendement attendu %",
    hint: "Cliquez sur une bulle",
    assets: [
      "Obligations",
      "Fonds indiciel",
      "Immobilier",
      "Actions tech",
      "Or",
      "Start-up",
    ],
  },
};

// risk, return, share of the portfolio (%)
const ASSETS = [
  [4, 3, 30],
  [15, 7, 25],
  [12, 6, 20],
  [28, 12, 15],
  [16, 4, 5],
  [45, 18, 5],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBubbleChart>("#portfolio")!;
  const asset = root.querySelector<HTMLOutputElement>("#asset")!;
  chart.series = text.assets.map((name, i) => ({
    name,
    data: [{ x: ASSETS[i][0], y: ASSETS[i][1], value: ASSETS[i][2] }],
  }));
  chart.options = {
    xAxis: { title: text.risk },
    yAxis: { title: text.return },
  };
  asset.textContent = text.hint;
  const onClick = (event: Event) => {
    const item = (event as CustomEvent<ChartHoverEvent>).detail.items[0];
    if (item) asset.textContent = `${item.seriesName}: ${item.value} %`;
  };
  chart.addEventListener("minerva-point-click", onClick);
  return () => chart.removeEventListener("minerva-point-click", onClick);
}

```
