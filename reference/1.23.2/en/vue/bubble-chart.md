# Bubble chart

Scatter charts with a third value drawn as the size of the dots: the area of a bubble is proportional to its value.

Package: minerva-design@1.23.2

Renderer: vue

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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "BubbleChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "deep",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also follows in-place mutations of nested data (`series[0].data.push()`);\nby default the chart updates when a prop is replaced (cheaper on large data)",
    "typeText": "boolean"
  },
  {
    "name": "legend",
    "type": "boolean | ChartLegendOptions",
    "required": false,
    "description": "Legend; shown by default when several series have a name",
    "typeText": "boolean | ChartLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | ChartTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it",
    "typeText": "boolean | ChartTooltipOptions"
  },
  {
    "name": "crosshair",
    "type": "boolean",
    "required": false,
    "description": "Vertical guide line following the pointer",
    "typeText": "boolean"
  },
  {
    "name": "interaction",
    "type": "boolean | ChartInteractionOptions",
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static (default `true`)",
    "typeText": "boolean | ChartInteractionOptions"
  },
  {
    "name": "labels",
    "type": "Partial<ChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<ChartLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D (default `auto`)",
    "typeText": "ChartRendererPreference"
  },
  {
    "name": "width",
    "type": "string | number",
    "required": false,
    "description": "Width of the chart; numbers are pixels (default `100%`)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels, strings any CSS length",
    "typeText": "string | number"
  },
  {
    "name": "series",
    "type": "readonly ChartSeries[]",
    "required": true,
    "description": "Data series (replace the array or a `data` array to update the chart)",
    "typeText": "readonly ChartSeries[]"
  },
  {
    "name": "xAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "X axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "yAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "Y axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "annotations",
    "type": "readonly ChartAnnotation[]",
    "required": false,
    "description": "Background areas and reference lines",
    "typeText": "readonly ChartAnnotation[]"
  },
  {
    "name": "padding",
    "type": "ChartPadding",
    "required": false,
    "description": "Space around the plot area, in pixels",
    "typeText": "ChartPadding"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip, axes, accessible names); the page language by default",
    "typeText": "string"
  },
  {
    "name": "minSize",
    "type": "number",
    "required": false,
    "description": "Diameter in pixels of the smallest bubbles (default 6)",
    "typeText": "number"
  },
  {
    "name": "maxSize",
    "type": "number",
    "required": false,
    "description": "Diameter in pixels of the largest value (default 48)",
    "typeText": "number"
  },
  {
    "name": "maxValue",
    "type": "number",
    "required": false,
    "description": "Value drawn with `maxSize` (share a scale between charts); the largest value by default",
    "typeText": "number"
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "type": "[view: ChartView]",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "type": "[event: ChartHoverEvent | null]",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "type": "[event: ChartPlotClickEvent]",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "type": "[event: ChartHoverEvent]",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "type": "[renderer: ChartRendererKind]",
    "typeText": "[renderer: ChartRendererKind]",
    "parameters": [
      {
        "name": "renderer",
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

## Example: countries

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/bubble-chart/vue/countries.vue

```vue
<script setup lang="ts">
// Three values per point: wealth (x), life expectancy (y) and population
// (`value`, the area of the bubble); the country is the point label.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { BubbleChart } from "minerva-design/vue/charts";

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

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [
  {
    name: text.value.life,
    showLabels: true,
    data: COUNTRIES.map(([x, y, value], i) => ({
      x,
      y,
      value,
      label: text.value.names[i],
    })),
  },
]);
</script>

<template>
  <BubbleChart
    :series="series"
    :x-axis="{ title: text.gdp }"
    :y-axis="{ title: text.life, min: 50 }"
    :max-size="64"
    :height="320"
  />
</template>

```

## Example: portfolio

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/bubble-chart/vue/portfolio.vue

```vue
<script setup lang="ts">
// A portfolio: risk against return, bubbles sized by the share of each
// asset; @point-click reports the clicked asset.
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { BubbleChart, type ChartHoverEvent } from "minerva-design/vue/charts";

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

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() =>
  text.value.assets.map((name, i) => ({
    name,
    data: [{ x: ASSETS[i][0], y: ASSETS[i][1], value: ASSETS[i][2] }],
  })),
);
const selected = ref("");
const onClick = (event: ChartHoverEvent) => {
  const item = event.items[0];
  if (item) selected.value = `${item.seriesName}: ${item.value} %`;
};
</script>

<template>
  <div style="display: grid; gap: 8px">
    <BubbleChart
      :series="series"
      :x-axis="{ title: text.risk }"
      :y-axis="{ title: text.return }"
      :height="300"
      @point-click="onClick"
    />
    <output aria-live="polite">{{ selected || text.hint }}</output>
  </div>
</template>

```
