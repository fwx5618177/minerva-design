# 箱线图

用中位数、四分位数、须线和离群值比较分布，可基于原始样本或已计算的统计量。离群值显示为系列颜色的空心圆环，悬停即可查看其数值和所属分组。

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

网关

认证

搜索

结账

推荐

图片

响应时间

最大值

上四分位数

中位数

下四分位数

最小值

离群值

各服务响应时间的分布

年薪

初级开发

开发工程师

高级开发

技术负责人

研发经理

各职位的薪资分布

工作日

周末

巴黎

里昂

马赛

里尔

配送时长（小时）

各城市工作日与周末的配送时长

日最高气温

平均值

每月日最高气温的分布

代码检查

单元测试

集成测试

端到端测试

发布

须线范围

1.5 × IQR

3 × IQR

最小 – 最大

离群值形状

空心

实心

{{value}} 次构建显示为离群值

构建时长

各 CI 流水线构建时长的分布

点击箱体或离群值。

{{day}}：一位患者等待了 {{value}}。

{{day}}：等待时间中位数 {{median}}，一半患者等待 {{q1}} 至 {{q3}}，离群值 {{outliers}} 个。

等待时间

四小时目标

急诊室每周各天等待时间的分布

样式表

脚本

字体

图片

视频

对数刻度

{{value}} 个文件超过 {{budget}} 的预算。

文件大小

预算

网站文件大小按类型的分布

美国东部

美国西部

欧洲西部

亚太南部

南美东部

暂停

继续

{{regions}} 的 SLA 存在风险

所有区域均满足 SLA

延迟

SLA

各区域请求延迟的实时分布

## BoxPlotChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "BoxPlotChart"
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
    "name": "name",
    "type": "string",
    "default": "\"Values\"",
    "required": false,
    "description": "Name of the series built from `groups`",
    "typeText": "string"
  },
  {
    "name": "groups",
    "type": "readonly BoxplotGroup[]",
    "required": false,
    "description": "Raw samples, one box each (an alternative to `series`)",
    "typeText": "readonly BoxplotGroup[]"
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
    "required": false,
    "description": "Series of box plots: data points with `low`, `q1`, `y` (the median), `q3`, `high` and `outliers`",
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
    "name": "outlierSize",
    "type": "number",
    "required": false,
    "description": "Diameter of the outliers in CSS pixels (default 7)",
    "typeText": "number"
  },
  {
    "name": "whisker",
    "type": "number | \"minmax\"",
    "required": false,
    "description": "Reach of the whiskers in interquartile ranges beyond the box (Tukey: 1.5); `minmax` extends them to the extremes",
    "typeText": "number | \"minmax\""
  },
  {
    "name": "outlierShape",
    "type": "\"hollow\" | \"filled\"",
    "required": false,
    "description": "Outliers drawn as rings of the series color or as filled dots; series may set their own (default `hollow`)",
    "typeText": "\"hollow\" | \"filled\""
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

## Example: horizontal

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/vue/horizontal.vue

```vue
<script setup lang="ts">
// `orientation="horizontal"` lays the boxes out in rows; `whisker="minmax"`
// extends the whiskers to the extremes (no outliers).
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { BoxPlotChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { score: "Score", classes: ["Class A", "Class B", "Class C"] },
  zh: { score: "分数", classes: ["一班", "二班", "三班"] },
  ja: { score: "得点", classes: ["A 組", "B 組", "C 組"] },
  fr: { score: "Note", classes: ["Classe A", "Classe B", "Classe C"] },
};

const SCORES = [
  [55, 61, 64, 68, 70, 72, 75, 78, 81, 86, 92],
  [40, 52, 58, 63, 66, 71, 73, 77, 84, 95],
  [62, 66, 69, 70, 72, 74, 75, 77, 79, 83],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const groups = computed(() =>
  text.value.classes.map((x, i) => ({ x, values: SCORES[i] })),
);
</script>

<template>
  <BoxPlotChart
    :groups="groups"
    :name="text.score"
    orientation="horizontal"
    whisker="minmax"
    :x-axis="{ type: 'category' }"
    :y-axis="{ min: 0, max: 100 }"
    :height="240"
  />
</template>

```

## Example: services

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/vue/services.vue

```vue
<script setup lang="ts">
// Raw samples per service (`groups`): the component computes the
// quartiles, Tukey whiskers (1.5 IQR) and draws the outliers as dots.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { BoxPlotChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    time: "Response time (ms)",
    services: ["Search", "Checkout", "Profile", "Images"],
  },
  zh: {
    time: "响应时间（毫秒）",
    services: ["搜索", "结账", "个人资料", "图片"],
  },
  ja: {
    time: "応答時間（ms）",
    services: ["検索", "決済", "プロフィール", "画像"],
  },
  fr: {
    time: "Temps de réponse (ms)",
    services: ["Recherche", "Paiement", "Profil", "Images"],
  },
};

// response times (ms) sampled per service
const SAMPLES = [
  [42, 48, 51, 55, 57, 60, 62, 66, 70, 75, 140],
  [120, 135, 150, 160, 168, 175, 190, 210, 230, 380],
  [30, 32, 35, 36, 38, 40, 41, 43, 47, 52],
  [60, 75, 88, 96, 105, 118, 126, 140, 160, 190, 260],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const groups = computed(() =>
  text.value.services.map((x, i) => ({ x, values: SAMPLES[i] })),
);
</script>

<template>
  <BoxPlotChart
    :groups="groups"
    :name="text.time"
    :x-axis="{ type: 'category' }"
    :y-axis="{ title: text.time }"
    :height="300"
  />
</template>

```
