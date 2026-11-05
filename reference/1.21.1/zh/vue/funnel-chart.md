# 漏斗图

展示流程中逐级流失的各个阶段（注册、销售管道、结账），并显示每一阶段到下一阶段的转化率。悬停或使用方向键高亮阶段；点击图例项可将其隐藏。

Package: minerva-design@1.21.1

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

价格页

开始注册

验证邮箱

创建项目

邀请同事

升级为付费

{{users}} 位用户

占访客的 {{share}}

自“{{stage}}”以来流失 {{users}} 位

注册漏斗

告警

仪表板

集成

报表

开放 API

排序方式

降序

升序

数据顺序

每周 {{users}} 位用户

各功能的周活跃用户

访问

商品页

加入购物车

结账

支付

下单成功

阶段

访客

流失率

占第一阶段的 {{share}}

网店的结账漏斗

各阶段之间的流失率

投递

简历筛选

技术面试

现场面试

发放 Offer

录用

{{candidates}} 位候选人

该阶段典型耗时：{{days}}

工程岗位的招聘流程

{{stage}}：{{candidates}} 位候选人（占投递者的 {{share}}）

{{rate}} 的投递者被录用，平均耗时 {{days}}

桌面端

移动端

转化率 {{rate}}

{{device}}的结账漏斗

曝光

点击

线索

合格线索

客户

全部渠道

搜索广告

社交媒体

电子邮件

合作伙伴

渠道

上一阶段的 {{share}}

单次结果成本：{{cost}}

本月营销漏斗：{{channel}}

花费：{{spend}} · 客户：{{customers}} · 获客成本：每位客户 {{cac}}

访问

加入购物车

结账

已付款订单

根据转化率计算的月度结账漏斗

{{from}} → {{to}}

降低 {{step}} 的转化率

提高 {{step}} 的转化率

恢复为当前转化率

每月 {{orders}} 笔订单（{{ordersDelta}}）· 收入 {{revenue}}（{{revenueDelta}}）

访客

查看商品

加入购物车

结账

订单

实时更新的限时抢购漏斗

暂停

继续

重新开始

{{time}} · {{orders}} 笔订单 · 占访客的 {{rate}}

抢购已结束：共 {{orders}} 笔订单。

线索

已确认

演示

报价

谈判

{{deals}} 个商机 · {{amount}}

赢单概率：{{share}}

按管道阶段划分的未结商机金额

{{stage}}：{{deals}} 个未结商机

加权预测：{{amount}}

点击某个阶段列出其商机。

## FunnelChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "FunnelChart"
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
    "name": "conversion",
    "type": "boolean",
    "required": false,
    "description": "Shows the conversion rate from the previous stage (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "sort",
    "type": "\"none\" | \"ascending\" | \"descending\"",
    "required": false,
    "description": "Order of the stages (default `none`: the data order)",
    "typeText": "\"none\" | \"ascending\" | \"descending\""
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
    "name": "shape",
    "type": "\"bar\" | \"trapezoid\"",
    "required": false,
    "description": "Shape of the stages: trapezoids narrowing to the next stage, or centered bars (default `trapezoid`)",
    "typeText": "\"bar\" | \"trapezoid\""
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
    "description": "Stages: a name, a value and an optional color",
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
    "name": "gap",
    "type": "number",
    "required": false,
    "description": "Vertical gap between the stages, in pixels (default 4)",
    "typeText": "number"
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

## Example: bars

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/vue/bars.vue

```vue
<script setup lang="ts">
// `shape="bar"` draws centered bars, `sort="descending"` orders the stages
// by value.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { FunnelChart } from "minerva-design/vue/charts";

const TEXT = {
  en: ["Interviews", "Applications", "Offers", "Screenings", "Hires"],
  zh: ["面试", "申请", "录用通知", "筛选", "入职"],
  ja: ["面接", "応募", "内定", "書類選考", "採用"],
  fr: ["Entretiens", "Candidatures", "Offres", "Présélections", "Embauches"],
};

const { language } = useI18n();
const data = computed(() =>
  [180, 940, 42, 410, 31].map((value, i) => ({
    name: (TEXT[language.value] ?? TEXT.en)[i],
    value,
  })),
);
</script>

<template>
  <FunnelChart :data="data" shape="bar" sort="descending" :height="300" />
</template>

```

## Example: conversion

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/vue/conversion.vue

```vue
<script setup lang="ts">
// Stages narrow to the next one; the labels show the conversion rate from
// the previous stage.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { FunnelChart } from "minerva-design/vue/charts";

const TEXT = {
  en: ["Visits", "Sign-ups", "Trials", "Purchases"],
  zh: ["访问", "注册", "试用", "购买"],
  ja: ["訪問", "登録", "トライアル", "購入"],
  fr: ["Visites", "Inscriptions", "Essais", "Achats"],
};

const { language } = useI18n();
const data = computed(() =>
  [12000, 4800, 2100, 860].map((value, i) => ({
    name: (TEXT[language.value] ?? TEXT.en)[i],
    value,
  })),
);
</script>

<template>
  <FunnelChart :data="data" :height="300" />
</template>

```
