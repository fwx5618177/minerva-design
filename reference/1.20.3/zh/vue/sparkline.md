# 迷你图

没有坐标轴和图例、只有文字大小的迷你图，在数字旁展示趋势走向：用于 KPI 卡片、表格单元格或列表中。悬停即可读取数值。

Package: minerva-design@1.20.3

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

订单

每周订单，{{variant}}

收入

活跃用户

注册数

p95 延迟

{{metric}}，最近 30 天

服务

API 网关

身份认证

搜索

支付

通知

请求数 / 分钟

p95 延迟（30 天）

{{service}}最近 30 天的 p95 延迟

今日

变化

服务延迟

代码

Acme 集团

Nova 生物科技

Orbit 航天

Kite 机器人

Luma 能源

{{symbol}} 今日价格

价格

自选股

最近 14 天的访问量：

访问量

最近 14 天的访问量

第 7 天部署后错误数激增，随后恢复正常：

错误

最近 14 天每天的错误数

这两周的午后气温：

气温

最近 14 天的午后气温

CPU

{{server}} 的 CPU 使用率

告警

正常

日活跃用户

最近一天：{{date}}

{{date}} · 自 9 月 1 日以来 {{change}}

9 月 1 日至 10 月 31 日的日活跃用户

{{value}} 步

完成目标的 {{value}}

{{days}} 天中有 {{reached}} 天达到 {{goal}} 步的目标

步数

四周内每天的步数及每日目标

雷克雅未克

蒙特利尔

东京

开罗

新加坡

悉尼

最高 {{max}}（{{maxMonth}}）· 最低 {{min}}（{{minMonth}}）

{{city}} 每月平均日最高气温

时段

7 天

30 天

90 天

后半段对比前半段

对比上一时段

最近 {{period}} 的每日营收

## Sparkline

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Sparkline"
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
    "name": "tooltip",
    "type": "boolean | ChartTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it",
    "typeText": "boolean | ChartTooltipOptions"
  },
  {
    "name": "color",
    "type": "string",
    "required": false,
    "description": "Color (any CSS color); the first palette color by default",
    "typeText": "string"
  },
  {
    "name": "type",
    "type": "\"line\" | \"bar\" | \"area\"",
    "required": false,
    "description": "How the values are drawn (default `line`)",
    "typeText": "\"line\" | \"bar\" | \"area\""
  },
  {
    "name": "labels",
    "type": "Partial<ChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<ChartLabels>"
  },
  {
    "name": "curve",
    "type": "ChartCurve",
    "required": false,
    "description": "Shape of the line (default `smooth`)",
    "typeText": "ChartCurve"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the data layer (default `auto`)",
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
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Colors (defaults to the `--chart-series-1..8` CSS variables)",
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
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip, accessible name); the page language by default",
    "typeText": "string"
  },
  {
    "name": "name",
    "type": "string",
    "required": false,
    "description": "Name shown in the tooltip",
    "typeText": "string"
  },
  {
    "name": "data",
    "type": "ChartSeriesData",
    "required": true,
    "description": "Values (or `[x, y]` pairs, typed arrays, ...)",
    "typeText": "ChartSeriesData"
  },
  {
    "name": "format",
    "type": "((value: number) => string)",
    "required": false,
    "description": "Formats the value in the tooltip",
    "typeText": "((value: number) => string)"
  },
  {
    "name": "reference",
    "type": "number",
    "required": false,
    "description": "Draws a reference line at this value (e.g. a target or the average)",
    "typeText": "number"
  }
]
```

### events

```json
[
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
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: kpi

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/vue/kpi.vue

```vue
<script setup lang="ts">
// Word-sized trends (48px high by default) drawn as a line, an area or bars.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { Sparkline } from "minerva-design/vue/charts";

const TEXT = {
  en: { orders: "Orders", revenue: "Revenue", signups: "Sign-ups" },
  zh: { orders: "订单", revenue: "收入", signups: "注册" },
  ja: { orders: "注文", revenue: "売上", signups: "登録" },
  fr: {
    orders: "Commandes",
    revenue: "Chiffre d'affaires",
    signups: "Inscriptions",
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
</script>

<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
    "
  >
    <div style="display: grid; gap: 4px">
      <span>{{ text.orders }}</span>
      <strong>1,284</strong>
      <Sparkline
        :data="[32, 41, 38, 52, 49, 61, 58, 70, 66, 74]"
        :name="text.orders"
      />
    </div>
    <div style="display: grid; gap: 4px">
      <span>{{ text.revenue }}</span>
      <strong>€48.2k</strong>
      <Sparkline
        type="area"
        :data="[3.1, 3.4, 3.2, 3.9, 4.4, 4.1, 4.6, 4.8, 4.5, 4.9]"
        :name="text.revenue"
      />
    </div>
    <div style="display: grid; gap: 4px">
      <span>{{ text.signups }}</span>
      <strong>312</strong>
      <Sparkline
        type="bar"
        :data="[12, 18, 9, 22, 30, 25, 19, 28, 33, 31]"
        :name="text.signups"
      />
    </div>
  </div>
</template>

```

## Example: reference

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/vue/reference.vue

```vue
<script setup lang="ts">
// `reference` draws a dashed target line; @hover reports the value under the
// pointer (null when it leaves).
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { Sparkline, type ChartHoverEvent } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    latency: "p95 latency",
    target: "target 200 ms",
    hint: "Hover the line",
  },
  zh: {
    latency: "p95 延迟",
    target: "目标 200 毫秒",
    hint: "将指针悬停在折线上",
  },
  ja: {
    latency: "p95 レイテンシ",
    target: "目標 200 ms",
    hint: "線にカーソルを合わせます",
  },
  fr: {
    latency: "Latence p95",
    target: "objectif 200 ms",
    hint: "Survolez la courbe",
  },
};

const data = [182, 175, 190, 214, 230, 205, 188, 176, 169, 181, 196, 172];
const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const hovered = ref<number | null>(null);
const onHover = (event: ChartHoverEvent | null) => {
  hovered.value = event?.items[0]?.y ?? null;
};
const format = (ms: number) => `${ms} ms`;
</script>

<template>
  <div style="display: grid; gap: 8px">
    <Sparkline
      :data="data"
      :reference="200"
      :name="text.latency"
      :format="format"
      :height="64"
      @hover="onHover"
    />
    <output aria-live="polite">{{
      hovered === null
        ? text.hint
        : `${text.latency}: ${hovered} ms (${text.target})`
    }}</output>
  </div>
</template>

```
