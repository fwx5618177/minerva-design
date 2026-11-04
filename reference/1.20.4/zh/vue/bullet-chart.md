# 子弹图

紧凑的 KPI 条形图（Stephen Few）：每一行用条形表示实际值，背后是定性区间（不同深浅的灰色，越差越深），并用标记表示目标，每行使用各自的刻度。不同行可以使用不同单位，因此仪表盘能在很小的空间内展示许多 KPI。悬停某一行或使用方向键可查看其数值、目标和所在区间。

Package: minerva-design@1.20.4

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

收入

千美元

利润率

占收入的 %

平均订单金额

美元

新客户

人数

满意度

满分 5 分

差

中

好

违约

有风险

健康

本季度至今的销售 KPI 与目标对比

结算

搜索

移动端

平台

增长

数据

各团队交付的故事点与承诺值的对比

可用性

请求成功率 %

Apdex

得分，0–1

吞吐量

请求 / 秒

错误预算

剩余 %

本月 API 的服务等级目标

访客

千人

注册

账号数

激活率

占注册的 %

月经常性收入

千美元

月份

所选月份的增长 KPI 与目标对比

企业客户在签约后 30 天内完成上线部署的比例

新客户占比 %

优先级工单在一个工作小时内得到首次响应的比例

工单占比 %

未引发任何客户可感知故障的生产环境发布占比

发布占比 %

年度订阅合同的净收入留存率（含扩容与流失）

比率

名称较长的运营 KPI 与目标对比

市场

研发

销售

人力资源

行政后勤

差旅

年度预算：{{budget}}

宽裕

紧张

超出计划

有 {{over}} 个部门支出快于计划。点击某行查看其偏差。

{{department}}超出计划：截至第三季度末偏差 {{variance}}，已使用年度预算的 {{share}}，剩余 {{left}}。

{{department}}在计划之内：截至第三季度末偏差 {{variance}}，已使用年度预算的 {{share}}，剩余 {{left}}。

第三季度末各部门支出与当期计划预算的对比

进风温度

湿度

功耗

风扇转速

°C

相对湿度 %

每机柜 kW

最大转速的 %

正常

警告

严重

实时读数

机房传感器读数与设定值及阈值的对比

需要关注：{{sensors}}

所有传感器均在限值范围内。

周跑量

长距离跑

累计爬升

训练次数

睡眠

计划：{{plan}}

低于计划

符合计划

高于计划

跑者

阿玛拉

卢卡斯

小美

{{value}}，计划 {{plan}}（{{share}}）

{{runner}} 的每周训练与计划对比

{{runner}} 完成了 {{metrics}} 项每周目标中的 {{met}} 项。

研发

销售

客户支持

市场

产品

财务

今年计划 {{plan}} 人

落后

追赶中

按计划

排序

计划顺序

最落后的在前

最领先的在前

各团队招聘人数与年度编制计划的对比

所显示的 {{teams}} 个团队已招聘 {{hired}} 人，计划 {{planned}} 人（{{share}}）。

未显示任何团队。

## BulletChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "BulletChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "animation",
    "type": "boolean",
    "required": false,
    "description": "Entry and update animations, skipped when the user prefers reduced motion (default `true`)",
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
    "type": "boolean | ShapeLegendOptions",
    "required": false,
    "description": "Legend; clicking an item hides / shows its slice, stage or series (shown by default for pie, donut, funnel and multi-series radar charts)",
    "typeText": "boolean | ShapeLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | ShapeTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it (default `true`)",
    "typeText": "boolean | ShapeTooltipOptions"
  },
  {
    "name": "ticks",
    "type": "boolean",
    "required": false,
    "description": "Tick labels of the scales, when there is room (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the shapes: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software; text is always drawn with Canvas2D (default `auto`, see `setDefaultChartRenderer`)",
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
    "name": "padding",
    "type": "ChartPadding",
    "required": false,
    "description": "Space around the drawing, in pixels (default 8 on every side)",
    "typeText": "ChartPadding"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart (default: the chart type, e.g. \"Donut chart\")",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip rows, accessible names, compact numbers); the page language by default",
    "typeText": "string"
  },
  {
    "name": "hidden",
    "type": "readonly number[]",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap nodes, by\nindex. Makes the visibility controlled: legend clicks then only emit\n`toggle`, whose `hiddenIndexes` should be stored and passed back.",
    "typeText": "readonly number[]"
  },
  {
    "name": "orientation",
    "type": "\"vertical\" | \"horizontal\"",
    "required": false,
    "description": "Horizontal rows or vertical columns (default `horizontal`)",
    "typeText": "\"vertical\" | \"horizontal\""
  },
  {
    "name": "texts",
    "type": "Partial<ShapeChartLabels>",
    "required": false,
    "description": "Replaces built-in texts of the `locale` (tooltip rows, accessible names, \"No data\")",
    "typeText": "Partial<ShapeChartLabels>"
  },
  {
    "name": "barSize",
    "type": "number",
    "required": false,
    "description": "Thickness of the value bar as a fraction of the ranges' thickness (default 0.4)",
    "typeText": "number"
  },
  {
    "name": "targetColor",
    "type": "string",
    "required": false,
    "description": "Color of the target markers (default: the text color)",
    "typeText": "string"
  },
  {
    "name": "data",
    "type": "readonly BulletDatum[]",
    "required": true,
    "description": "Rows (columns when vertical): name, value, target, ranges and scale",
    "typeText": "readonly BulletDatum[]"
  },
  {
    "name": "ranges",
    "type": "readonly number[]",
    "required": false,
    "description": "Qualitative ranges of the rows without `ranges`: upper bounds, ascending",
    "typeText": "readonly number[]"
  },
  {
    "name": "rangeLabels",
    "type": "readonly string[]",
    "required": false,
    "description": "Names of the qualitative ranges, lowest first (tooltip)",
    "typeText": "readonly string[]"
  },
  {
    "name": "rangeColors",
    "type": "readonly string[]",
    "required": false,
    "description": "Colors of the qualitative ranges, lowest first; shades of gray by default",
    "typeText": "readonly string[]"
  },
  {
    "name": "format",
    "type": "((value: number) => string)",
    "required": false,
    "description": "Formats the values of the labels and the tooltip (default: compact numbers, 1.2k, 3.4M)",
    "typeText": "((value: number) => string)"
  },
  {
    "name": "percentFormat",
    "type": "((share: number) => string)",
    "required": false,
    "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1 (default: one decimal, \"40.0%\")",
    "typeText": "((share: number) => string)"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[event: ShapeHoverEvent | null]",
    "typeText": "[event: ShapeHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "click",
    "type": "[event: ShapeHoverEvent]",
    "typeText": "[event: ShapeHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "toggle",
    "type": "[event: ShapeToggleEvent]",
    "typeText": "[event: ShapeToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: kpis

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/bullet-chart/vue/kpis.vue

```vue
<script setup lang="ts">
// One row per KPI: the bar is the value, the marker the target, the gray
// bands qualitative ranges (named by `range-labels` in the tooltip).
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { BulletChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    kpis: ["Revenue (k€)", "Profit (%)", "Orders", "Satisfaction"],
    ranges: ["Poor", "Fair", "Good"],
  },
  zh: {
    kpis: ["营收（千欧元）", "利润率（%）", "订单数", "满意度"],
    ranges: ["差", "一般", "良好"],
  },
  ja: {
    kpis: ["売上（千ユーロ）", "利益率（%）", "注文数", "満足度"],
    ranges: ["不良", "普通", "良好"],
  },
  fr: {
    kpis: ["Chiffre d’affaires (k€)", "Marge (%)", "Commandes", "Satisfaction"],
    ranges: ["Faible", "Correct", "Bon"],
  },
};

// value, target, upper bounds of the ranges
const KPIS = [
  [270, 250, [150, 225, 300]],
  [22.5, 26, [20, 25, 30]],
  [1650, 2100, [1000, 2000, 2500]],
  [4.4, 4.5, [3.5, 4.25, 5]],
] as const;

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const data = computed(() =>
  KPIS.map(([value, target, ranges], i) => ({
    name: text.value.kpis[i],
    value,
    target,
    ranges,
  })),
);
</script>

<template>
  <BulletChart :data="data" :range-labels="text.ranges" />
</template>

```

## Example: vertical

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/bullet-chart/vue/vertical.vue

```vue
<script setup lang="ts">
// `orientation="vertical"`: columns sharing the ranges of the component
// (`ranges`), the targets in the danger color.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { BulletChart } from "minerva-design/vue/charts";

const QUARTERS = {
  en: ["Q1", "Q2", "Q3", "Q4"],
  zh: ["第一季度", "第二季度", "第三季度", "第四季度"],
  ja: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  fr: ["T1", "T2", "T3", "T4"],
};

const SALES = [82, 95, 71, 104];
const TARGETS = [90, 90, 100, 100];

const { language } = useI18n();
const data = computed(() =>
  (QUARTERS[language.value] ?? QUARTERS.en).map((name, i) => ({
    name,
    value: SALES[i],
    target: TARGETS[i],
  })),
);
</script>

<template>
  <BulletChart
    :data="data"
    orientation="vertical"
    :ranges="[60, 90, 120]"
    target-color="var(--danger-color, #dc2626)"
  />
</template>

```
