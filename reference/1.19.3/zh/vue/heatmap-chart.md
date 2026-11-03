# 热力图

按数值着色的单元格网格，两个轴都可以是类目或数字：按星期和小时的活跃度、相关性矩阵、某项指标的分布图等。悬停单元格会将其浮起、高亮所在行列，并在色例上标出其数值。

Package: minerva-design@1.19.3

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

会话数

按星期和小时统计的会话数

距平

1995 至 2024 年的月气温距平

信号

200 × 100 米楼层内的 Wi-Fi 信号强度

{{cells}} 个单元格 · 使用 {{renderer}} 绘制 · Ctrl / ⌘ + 滚轮缩放，拖动平移，双击重置

贡献

一年内每天的贡献次数

过去一年共 {{total}} 次贡献

会话数

页面浏览量

注册数

收入

流失

支持工单

相关系数

六项产品指标的相关系数矩阵

第 {{n}} 个月

留存

各月注册用户群的留存率

桌面端

移动端

平板

自然搜索

付费搜索

社交媒体

邮件

外链推荐

直接访问

{{source}} · {{device}}：{{sessions}} 次会话产生 {{orders}} 笔订单，转化率 {{rate}}：

高于平均值 {{value}}

低于平均值 {{value}}

点击单元格查看其会话数和订单数。

转化率

按流量来源和设备划分的转化率

机柜 {{n}}

传感器 {{n}}

暂停

继续

最热：{{rack}} {{sensor}}，{{value}} · {{alarms}} 个传感器超过 {{limit}}

进风温度

十个服务器机柜传感器的实时进风温度

猫

狗

鸟

汽车

卡车

实际为{{actual}}，预测为{{predicted}}

{{value}} 张图片（占该类别 {{share}}）

召回率：{{value}}

精确率：{{value}}

分类错误

准确率：{{images}} 张测试图片中的 {{value}}

类别占比

预测类别

实际类别

五个类别的图像分类器混淆矩阵

北区

南区

东区

西区

中区

第 {{n}} 季度

指标

营收

较 2025 年增长

毛利率

{{region}}{{quarter}}

最好：{{best}}（{{bestValue}}）· 最弱：{{worst}}（{{worstValue}}）

2026 年按区域和季度划分的销售指标

## HeatmapChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "HeatmapChart"
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
    "name": "name",
    "type": "string",
    "required": false,
    "description": "Name of the value in the tooltip",
    "typeText": "string"
  },
  {
    "name": "colorScale",
    "type": "readonly string[] | ChartColorScheme",
    "required": false,
    "description": "Colors from the lowest to the highest value (interpolated in OKLab), or a built-in theme-aware ramp of the first palette color (default `sequential`)",
    "typeText": "readonly string[] | ChartColorScheme"
  },
  {
    "name": "valueRange",
    "type": "readonly [number, number]",
    "required": false,
    "description": "Values at the ends of the color scale; the data range by default",
    "typeText": "readonly [number, number]"
  },
  {
    "name": "data",
    "type": "readonly HeatmapCell[]",
    "required": true,
    "description": "Cells `{ x, y, value }`",
    "typeText": "readonly HeatmapCell[]"
  },
  {
    "name": "format",
    "type": "((value: number) => string)",
    "required": false,
    "description": "Formats the values in the tooltip",
    "typeText": "((value: number) => string)"
  },
  {
    "name": "radius",
    "type": "number",
    "required": false,
    "description": "Corner radius of the cells, in pixels",
    "typeText": "number"
  },
  {
    "name": "colorMidpoint",
    "type": "number",
    "required": false,
    "description": "Value at the middle of the color scale (diverging data; default 0 for `diverging` ramps spanning it, else the middle of the range)",
    "typeText": "number"
  },
  {
    "name": "xCategories",
    "type": "readonly string[]",
    "required": false,
    "description": "Column names in order (collected from the data when omitted)",
    "typeText": "readonly string[]"
  },
  {
    "name": "yCategories",
    "type": "readonly string[]",
    "required": false,
    "description": "Row names from bottom to top (collected from the data when omitted)",
    "typeText": "readonly string[]"
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

## Example: color-scale

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/heatmap-chart/vue/color-scale.vue

```vue
<script setup lang="ts">
// A diverging color scale over a fixed value range (-1 to 1): negative
// correlations in blue, positive ones in red.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { HeatmapChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    correlation: "Correlation",
    metrics: ["Price", "Rating", "Delivery", "Returns", "Sales"],
  },
  zh: {
    correlation: "相关系数",
    metrics: ["价格", "评分", "配送", "退货", "销量"],
  },
  ja: {
    correlation: "相関係数",
    metrics: ["価格", "評価", "配送", "返品", "売上"],
  },
  fr: {
    correlation: "Corrélation",
    metrics: ["Prix", "Note", "Livraison", "Retours", "Ventes"],
  },
};

const MATRIX = [
  [1, -0.32, 0.12, 0.41, -0.58],
  [-0.32, 1, -0.44, -0.61, 0.72],
  [0.12, -0.44, 1, 0.35, -0.27],
  [0.41, -0.61, 0.35, 1, -0.49],
  [-0.58, 0.72, -0.27, -0.49, 1],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const cells = computed(() =>
  MATRIX.flatMap((row, r) =>
    row.map((value, c) => ({
      x: text.value.metrics[c],
      y: text.value.metrics[r],
      value,
    })),
  ),
);
const format = (value: number) => value.toFixed(2);
</script>

<template>
  <HeatmapChart
    :data="cells"
    :color-scale="['#2563eb', '#f8fafc', '#dc2626']"
    :value-range="[-1, 1]"
    :name="text.correlation"
    :format="format"
    :radius="4"
    :height="320"
  />
</template>

```

## Example: weekly-activity

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/heatmap-chart/vue/weekly-activity.vue

```vue
<script setup lang="ts">
// `data` holds { x, y, value } cells; categories set the order of the
// columns and rows (rows from bottom to top).
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { HeatmapChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    commits: "Commits",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    commits: "提交数",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    commits: "コミット数",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    commits: "Commits",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

const HOURS = ["0–4", "4–8", "8–12", "12–16", "16–20", "20–24"];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const cells = computed(() =>
  text.value.days.flatMap((day, d) =>
    HOURS.map((hour, h) => ({
      x: hour,
      y: day,
      value:
        d < 5 && h > 1 && h < 5
          ? 20 + ((d * 7 + h * 5) % 13)
          : (d * 3 + h * 2) % 6,
    })),
  ),
);
const rows = computed(() => [...text.value.days].reverse());
</script>

<template>
  <HeatmapChart
    :data="cells"
    :x-categories="HOURS"
    :y-categories="rows"
    :name="text.commits"
    :height="300"
  />
</template>

```
