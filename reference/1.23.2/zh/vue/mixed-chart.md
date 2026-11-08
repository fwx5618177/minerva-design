# 组合图 / 双轴图

在一张图中组合柱、线和面积，可使用一个或两个数值轴：收入与增长率、降雨量与气温、帕累托图。

Package: minerva-design@1.23.2

Renderer: vue

Locale: zh

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

{{year}} 年第 {{n}} 季度

收入

同比增长

季度收入及其同比增长

降雨量

气温

东京每月降雨量和气温

访问量

转化率

营销活动

两个月内每日访问量与转化率

退货

累计占比

尺码不合适

商品损坏

与描述不符

送达过晚

改变主意

发错商品

其他

按原因统计的退货及其累计占比

页面浏览量

中文（zh-CN）

法语（fr-FR）

每日页面浏览量与转化率，{{locale}}

营收

用户数

用户数（对数）

2016 至 2025 年的年营收与对数轴上的用户数

{{value}} kWh

光伏发电

用电量

电池电量

夜间

{{value}} 电池

两天内自给率为 {{share}}，从电网购电 {{imported}}。

每小时电量

某住宅两天内每小时的光伏发电量和用电量，以及电池电量

库存水平

到货

促销

安全库存

再订货点

点击某一天或某次到货。

{{id}}：{{ordered}} 订购 {{quantity}} 件，经过 {{lead}} 于 {{arrived}} 到货。

{{date}} 库存 {{units}} 件。

{{date}} 库存仅 {{units}} 件，低于安全库存。

件数

某商品三个月内的每日库存水平，含到货、再订货点和安全库存

请求数

错误率

发布

每 30 分钟请求数

某 Web API 一天内的请求数和错误率，以及发布记录

发布 {{version}} 后，错误率于 {{time}} 达到峰值 {{peak}}，直到回滚至 {{rollback}}。

{{value}} 点

开始

剩余工作量

已完成

理想进度

新增 {{value}}

理想：剩余 {{value}}

剩余 {{value}}

当天完成 {{value}}

落后理想进度 {{value}}

领先理想进度 {{value}}

故事点

迭代燃尽图：十个工作日内的剩余工作量、每日完成点数和理想燃尽线

剩余 {{left}}，按每天 {{velocity}} 的速度，迭代结束时约有 {{forecast}} 无法完成。

剩余 {{left}}，按每天 {{velocity}} 的速度，迭代进度正常。

## MixedChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "MixedChart"
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
    "name": "orientation",
    "type": "ChartOrientation",
    "required": false,
    "description": "`horizontal` puts the x axis (categories) down the left side and the values along the bottom (default `vertical`)",
    "typeText": "ChartOrientation"
  },
  {
    "name": "stackMode",
    "type": "\"percent\" | \"normal\"",
    "required": false,
    "description": "`percent` scales every stack to 100% at each x (default `normal`)",
    "typeText": "\"percent\" | \"normal\""
  },
  {
    "name": "yAxis2",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "Right value axis of the series with `yAxis: \"right\"`; its range is aligned on the left ticks (vertical charts)",
    "typeText": "ChartAxisOptions"
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

## Example: climate

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/vue/climate.vue

```vue
<script setup lang="ts">
// A climate chart: monthly precipitation as bars, the mean temperature as
// a smooth line on the right axis; the crosshair reads both.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { MixedChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { rain: "Precipitation (mm)", temperature: "Temperature (°C)" },
  zh: { rain: "降水量（毫米）", temperature: "气温（°C）" },
  ja: { rain: "降水量（mm）", temperature: "気温（°C）" },
  fr: { rain: "Précipitations (mm)", temperature: "Température (°C)" },
};
const MONTHS = {
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  zh: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  ja: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  fr: [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ],
};

const RAIN = [52, 41, 48, 55, 68, 71, 64, 62, 55, 64, 63, 60];
const TEMPERATURE = [
  3.5, 4.2, 7.6, 10.7, 14.5, 17.6, 19.8, 19.6, 16.4, 12.3, 7.6, 4.4,
];

const { language } = useI18n();
const series = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  const months = MONTHS[language.value] ?? MONTHS.en;
  return [
    {
      name: text.rain,
      type: "bar" as const,
      color: "var(--chart-series-2, #0ea5e9)",
      data: RAIN.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.temperature,
      type: "line" as const,
      curve: "smooth" as const,
      yAxis: "right" as const,
      color: "var(--chart-series-4, #ef4444)",
      data: TEMPERATURE.map((y, i) => ({ x: months[i], y })),
    },
  ];
});
</script>

<template>
  <MixedChart
    :series="series"
    :x-axis="{ type: 'category' }"
    crosshair
    :height="300"
  />
</template>

```

## Example: revenue-growth

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/vue/revenue-growth.vue

```vue
<script setup lang="ts">
// Bars and a line on two value axes: the series with `yAxis: "right"` use
// `yAxis2` (its ticks are aligned on the left grid).
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { MixedChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { revenue: "Revenue (k€)", growth: "Growth" },
  zh: { revenue: "收入（千欧元）", growth: "增长率" },
  ja: { revenue: "売上（千ユーロ）", growth: "成長率" },
  fr: { revenue: "Chiffre d’affaires (k€)", growth: "Croissance" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const REVENUE = [182, 196, 214, 205, 238, 261];
// month-over-month growth, %
const GROWTH = REVENUE.map((y, i) =>
  i ? Math.round((y / REVENUE[i - 1] - 1) * 1000) / 10 : 0,
);

const { language } = useI18n();
const series = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  const months = MONTHS[language.value] ?? MONTHS.en;
  return [
    {
      name: text.revenue,
      type: "bar" as const,
      data: REVENUE.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.growth,
      type: "line" as const,
      curve: "smooth" as const,
      yAxis: "right" as const,
      data: GROWTH.map((y, i) => ({ x: months[i], y })),
    },
  ];
});
const yAxis2 = { format: (value: number) => `${value} %` };
</script>

<template>
  <MixedChart
    :series="series"
    :x-axis="{ type: 'category' }"
    :y-axis2="yAxis2"
    :height="300"
  />
</template>

```
