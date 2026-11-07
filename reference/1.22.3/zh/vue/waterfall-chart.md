# 瀑布图

展示一系列增减如何把数值从起点带到终点，并带有小计和合计：利润桥、现金流、差异分析。细虚线连接每根柱子与下一根柱子。

Package: minerva-design@1.22.3

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

收入

销售成本

毛利

研发费用

市场费用

管理费用

营业利润

利息

税费

净利润

金额

从收入到净利润的利润表

期初

期末

净现金流

从期初余额到期末余额的每月净现金流

预算

实际

销量

价格

产品组合

汇率

原材料

节约

差异

预算利润与实际利润之间差异的因素

年初

年末

招聘

内部调入

离职

内部调出

退休

人数

全年人数变动

期初 ARR

新业务

扩展

收缩

流失

期末 ARR

ARR

季度

第{{n}}季度

{{quarter}}：净新增 ARR {{net}} · 净收入留存率 {{nrr}}

{{quarter}}的 ARR 桥图

标价

经销商折扣

促销

发票价

付款条件

运费

批量返利

到手价

单价

点击柱子与标价比较

{{step}}：{{value}}，占标价的 {{share}}

从标价到到手价的价格瀑布

2019 年基准

业务增长

能效提升

可再生电力

电动车队

制冷剂

收购

2025 年

2030 年目标

{{value}} 千吨 CO₂e

排放量

变化：{{value}}

从 {{from}} 到 {{to}}

高于 2030 年目标 {{value}}

从 2019 年基准到 2025 年的排放桥图

订单录入

信用审核

拣货

质检

等待承运商

运输

清关

交付周期

耗时

作业

等待

作业占 {{total}} 中的 {{work}}（{{share}}）

按环节划分的订单交付周期

此前

当前

余额

客户付款

供应商发票

工资发放

刷卡手续费

退款

最新：{{time}} · {{kind}} {{amount}}

暂停

继续

当天资金头寸，实时更新

已承诺

新增

移除

重新估算

顺延

已完成

故事点

方向

纵向

横向

标签

连接线

冲刺范围：从承诺到完成的故事点

## WaterfallChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "WaterfallChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "labels",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Writes the change (or the total) at the end of every bar",
    "typeText": "boolean"
  },
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
    "name": "connector",
    "type": "boolean | ChartConnectorOptions",
    "required": false,
    "description": "Thin lines from the end of every bar to the next one; an object styles them (default `true`: dashed, secondary text color)",
    "typeText": "boolean | ChartConnectorOptions"
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
    "name": "start",
    "type": "number",
    "required": false,
    "description": "Value the first change starts from (default 0)",
    "typeText": "number"
  },
  {
    "name": "name",
    "type": "string",
    "required": false,
    "description": "Name of the series (tooltip; default \"Change\")",
    "typeText": "string"
  },
  {
    "name": "orientation",
    "type": "ChartOrientation",
    "required": false,
    "description": "`horizontal` puts the x axis (categories) down the left side and the values along the bottom (default `vertical`)",
    "typeText": "ChartOrientation"
  },
  {
    "name": "format",
    "type": "((value: number) => string)",
    "required": false,
    "description": "Formats the values (labels, tooltip)",
    "typeText": "((value: number) => string)"
  },
  {
    "name": "upColor",
    "type": "string",
    "required": false,
    "description": "Color of the increases (the success color by default)",
    "typeText": "string"
  },
  {
    "name": "downColor",
    "type": "string",
    "required": false,
    "description": "Color of the decreases (the danger color by default)",
    "typeText": "string"
  },
  {
    "name": "totalColor",
    "type": "string",
    "required": false,
    "description": "Color of the totals and subtotals (the primary color by default)",
    "typeText": "string"
  },
  {
    "name": "steps",
    "type": "readonly WaterfallStep[]",
    "required": true,
    "description": "Changes, subtotals and totals, in order",
    "typeText": "readonly WaterfallStep[]"
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

## Example: cash-flow

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/vue/cash-flow.vue

```vue
<script setup lang="ts">
// Monthly cash flows from an opening balance: rows instead of
// columns (`orientation="horizontal"`), values in the tooltip only.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { WaterfallChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { opening: "Opening", closing: "Closing" },
  zh: { opening: "期初", closing: "期末" },
  ja: { opening: "期首", closing: "期末" },
  fr: { opening: "Ouverture", closing: "Clôture" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const FLOWS = [18, -12, 25, -30, 14, 9];

const { language } = useI18n();
const steps = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  const months = MONTHS[language.value] ?? MONTHS.en;
  return [
    { label: text.opening, value: 120 },
    ...FLOWS.map((value, i) => ({ label: months[i], value })),
    { label: text.closing, kind: "total" as const },
  ];
});
</script>

<template>
  <WaterfallChart
    :steps="steps"
    :labels="false"
    orientation="horizontal"
    :height="360"
  />
</template>

```

## Example: pnl

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/vue/pnl.vue

```vue
<script setup lang="ts">
// A profit and loss bridge: changes float from the running total,
// `subtotal` / `total` steps start from zero; the values are written on the bars.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { WaterfallChart } from "minerva-design/vue/charts";

const STEPS = {
  en: [
    "Revenue",
    "Cost of sales",
    "Gross profit",
    "Operating costs",
    "Other income",
    "Taxes",
    "Net income",
  ],
  zh: [
    "营业收入",
    "销售成本",
    "毛利润",
    "运营费用",
    "其他收入",
    "税费",
    "净利润",
  ],
  ja: [
    "売上高",
    "売上原価",
    "売上総利益",
    "営業費用",
    "その他収益",
    "税金",
    "純利益",
  ],
  fr: [
    "Chiffre d’affaires",
    "Coût des ventes",
    "Marge brute",
    "Charges d’exploitation",
    "Autres produits",
    "Impôts",
    "Résultat net",
  ],
};

const { language } = useI18n();
const steps = computed(() => {
  const label = STEPS[language.value] ?? STEPS.en;
  return [
    { label: label[0], value: 420 },
    { label: label[1], value: -180 },
    { label: label[2], kind: "subtotal" as const },
    { label: label[3], value: -130 },
    { label: label[4], value: 25 },
    { label: label[5], value: -34 },
    { label: label[6], kind: "total" as const },
  ];
});
const format = (value: number) => `${value} k€`;
</script>

<template>
  <WaterfallChart :steps="steps" :format="format" :height="320" />
</template>

```
