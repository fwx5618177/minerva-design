# 饼图 / 环形图

展示整体中各部分的占比：饼图、环形图（中心可显示总计）和南丁格尔玫瑰图。适合少量类别（建议不超过 8 个）、更关注占比而非精确比较的场景。悬停或使用方向键高亮扇区，Esc 清除；点击图例项可隐藏对应扇区。

Package: minerva-design@1.19.3

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

自然搜索

直接访问

社交媒体

付费广告

外链引荐

电子邮件

{{sessions}} 次会话 · {{share}}

最近 30 天按流量来源统计的网站会话

{{source}}：{{sessions}} 次会话（占流量的 {{share}}）

点击一个扇区（或聚焦图表后按 Enter）以选择来源

企业版

商业版

专业版

入门版

月收入

按套餐统计的月度经常性收入

电子邮件

在线客服

网页表单

电话

社交媒体

社区

标签位置

外部

内部

无

标签内容

名称

数值

百分比

{{tickets}} 个工单 · {{share}}

按渠道统计的支持工单

月平均降水量

其他

出货量

{{units}} 台 · {{share}}

各厂商的智能手机市场份额

居住

饮食

交通

休闲

房租

水电燃气

保险

食品杂货

餐馆

公共交通

汽车

旅行

订阅

运动

按明细项统计的月度预算

按类别统计的月度预算

{{name}}：{{amount}}（{{share}}）

悬停在环上查看类别或明细项

亚太

欧洲

北美

拉丁美洲

手机

桌面

平板

{{region}}按设备统计的会话

美国股票

国际股票

债券

房地产

大宗商品

现金

显示的资产类别

全部显示

所选

总市值

占投资组合的 {{share}}

按资产类别划分的投资组合

显示 {{total}} 个资产类别中的 {{shown}} 个：{{value}}，占投资组合的 {{share}}。

深色模式

离线模式

公开 API

更多集成

自定义报表

我们接下来应该开发哪个功能？

票

{{votes}} 票 · {{share}}

按选项划分的实时投票结果

暂停

继续

重置

领先：{{answer}}

计算

数据库

存储

网络

虚拟机

Kubernetes

无服务器函数

SQL 数据库

NoSQL 数据库

内存缓存

对象存储

块存储

备份

数据传输

CDN

负载均衡器

云账单

全部类别

点击查看其服务

按服务划分的{{category}}费用

按类别划分的月度云账单

{{service}}：{{amount}}，占{{category}}的 {{share}}。

{{category}}：{{amount}}，占账单的 {{share}}。点击某项服务查看其占比。

月度账单：{{total}}。点击某个类别查看其服务。

非常不满意

不满意

一般

满意

非常满意

第 {{n}} 季度

季度

CSAT

{{answers}} 份回答 · {{share}}

{{quarter}}的客户满意度回答

CSAT 为 {{csat}}，共 {{respondents}} 位受访者。

CSAT 为 {{csat}}，较{{previous}}变化 {{delta}} 个百分点，共 {{respondents}} 位受访者。

## DonutChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "DonutChart"
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
    "name": "rose",
    "type": "boolean",
    "required": false,
    "description": "Nightingale rose: the radius (instead of the angle) shows the value",
    "typeText": "boolean"
  },
  {
    "name": "labels",
    "type": "\"none\" | \"outside\" | \"inside\"",
    "required": false,
    "description": "Slice labels: `outside` with leader lines, `inside` the slices, or none (default `outside` up to 12 slices)",
    "typeText": "\"none\" | \"outside\" | \"inside\""
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
    "name": "texts",
    "type": "Partial<ShapeChartLabels>",
    "required": false,
    "description": "Replaces built-in texts of the `locale` (tooltip rows, accessible names, \"No data\")",
    "typeText": "Partial<ShapeChartLabels>"
  },
  {
    "name": "data",
    "type": "readonly ShapeDatum[]",
    "required": true,
    "description": "Slices: a name, a value (negative values count as 0) and an optional color",
    "typeText": "readonly ShapeDatum[]"
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
  },
  {
    "name": "padAngle",
    "type": "number",
    "required": false,
    "description": "Gap between the slices, in pixels (default 1, donut 2)",
    "typeText": "number"
  },
  {
    "name": "startAngle",
    "type": "number",
    "required": false,
    "description": "Angle of the first slice, degrees clockwise from 12 o'clock (default 0)",
    "typeText": "number"
  },
  {
    "name": "innerRadius",
    "type": "number",
    "required": false,
    "description": "Inner radius as a fraction of the outer radius: 0 = pie, 0.6 = donut (default 0, DonutChart 0.62)",
    "typeText": "number"
  },
  {
    "name": "cornerRadius",
    "type": "number",
    "required": false,
    "description": "Corner radius of the slices, in pixels (default 0, donut 4)",
    "typeText": "number"
  },
  {
    "name": "labelContent",
    "type": "readonly (\"percent\" | \"value\" | \"name\")[]",
    "required": false,
    "description": "What a label shows: name, value, percent (default `[\"name\", \"percent\"]`)",
    "typeText": "readonly (\"percent\" | \"value\" | \"name\")[]"
  },
  {
    "name": "centerValue",
    "type": "string",
    "required": false,
    "description": "Big text in the hole of a donut (e.g. the total)",
    "typeText": "string"
  },
  {
    "name": "centerLabel",
    "type": "string",
    "required": false,
    "description": "Small text under `centerValue`",
    "typeText": "string"
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

## PieChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "PieChart"
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
    "name": "rose",
    "type": "boolean",
    "required": false,
    "description": "Nightingale rose: the radius (instead of the angle) shows the value",
    "typeText": "boolean"
  },
  {
    "name": "labels",
    "type": "\"none\" | \"outside\" | \"inside\"",
    "required": false,
    "description": "Slice labels: `outside` with leader lines, `inside` the slices, or none (default `outside` up to 12 slices)",
    "typeText": "\"none\" | \"outside\" | \"inside\""
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
    "name": "texts",
    "type": "Partial<ShapeChartLabels>",
    "required": false,
    "description": "Replaces built-in texts of the `locale` (tooltip rows, accessible names, \"No data\")",
    "typeText": "Partial<ShapeChartLabels>"
  },
  {
    "name": "data",
    "type": "readonly ShapeDatum[]",
    "required": true,
    "description": "Slices: a name, a value (negative values count as 0) and an optional color",
    "typeText": "readonly ShapeDatum[]"
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
  },
  {
    "name": "padAngle",
    "type": "number",
    "required": false,
    "description": "Gap between the slices, in pixels (default 1, donut 2)",
    "typeText": "number"
  },
  {
    "name": "startAngle",
    "type": "number",
    "required": false,
    "description": "Angle of the first slice, degrees clockwise from 12 o'clock (default 0)",
    "typeText": "number"
  },
  {
    "name": "innerRadius",
    "type": "number",
    "required": false,
    "description": "Inner radius as a fraction of the outer radius: 0 = pie, 0.6 = donut (default 0, DonutChart 0.62)",
    "typeText": "number"
  },
  {
    "name": "cornerRadius",
    "type": "number",
    "required": false,
    "description": "Corner radius of the slices, in pixels (default 0, donut 4)",
    "typeText": "number"
  },
  {
    "name": "labelContent",
    "type": "readonly (\"percent\" | \"value\" | \"name\")[]",
    "required": false,
    "description": "What a label shows: name, value, percent (default `[\"name\", \"percent\"]`)",
    "typeText": "readonly (\"percent\" | \"value\" | \"name\")[]"
  },
  {
    "name": "centerValue",
    "type": "string",
    "required": false,
    "description": "Big text in the hole of a donut (e.g. the total)",
    "typeText": "string"
  },
  {
    "name": "centerLabel",
    "type": "string",
    "required": false,
    "description": "Small text under `centerValue`",
    "typeText": "string"
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

## Example: donut

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/pie-chart/vue/donut.vue

```vue
<script setup lang="ts">
// <DonutChart>: a pie with a hole and center texts; @click reports the
// clicked slice.
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { DonutChart, type ShapeHoverEvent } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    total: "monthly revenue",
    hint: "Click a slice",
    plans: ["Free", "Starter", "Pro", "Enterprise"],
  },
  zh: {
    total: "月收入",
    hint: "点击一个扇区",
    plans: ["免费版", "入门版", "专业版", "企业版"],
  },
  ja: {
    total: "月間売上",
    hint: "スライスをクリックします",
    plans: ["無料", "スターター", "プロ", "エンタープライズ"],
  },
  fr: {
    total: "revenu mensuel",
    hint: "Cliquez sur une part",
    plans: ["Gratuit", "Starter", "Pro", "Entreprise"],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const data = computed(() =>
  [2, 18, 46, 34].map((value, i) => ({ name: text.value.plans[i], value })),
);
const selected = ref("");
const onClick = (slice: ShapeHoverEvent) => {
  selected.value = `${slice.name}: €${slice.value}k`;
};
const format = (value: number) => `€${value}k`;
</script>

<template>
  <div style="display: grid; gap: 8px">
    <DonutChart
      :data="data"
      center-value="€100k"
      :center-label="text.total"
      :format="format"
      :height="300"
      @click="onClick"
    />
    <output aria-live="polite">{{ selected || text.hint }}</output>
  </div>
</template>

```

## Example: pie

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/pie-chart/vue/pie.vue

```vue
<script setup lang="ts">
// Slices are { name, value }; outside labels show the name and the share,
// legend clicks hide / show a slice.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { PieChart } from "minerva-design/vue/charts";

const TEXT = {
  en: ["Search", "Direct", "Social", "Email", "Referral"],
  zh: ["搜索", "直接访问", "社交媒体", "邮件", "推荐"],
  ja: ["検索", "ダイレクト", "ソーシャル", "メール", "参照元"],
  fr: ["Recherche", "Direct", "Réseaux sociaux", "E-mail", "Référents"],
};

const { language } = useI18n();
const data = computed(() =>
  [1048, 735, 580, 484, 300].map((value, i) => ({
    name: (TEXT[language.value] ?? TEXT.en)[i],
    value,
  })),
);
</script>

<template>
  <PieChart :data="data" :height="300" />
</template>

```
