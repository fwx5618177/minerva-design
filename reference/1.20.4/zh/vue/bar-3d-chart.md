# 3D 柱状图

x × y 类别网格上的柱体：带光照的立方体、按系列着色、跨系列堆叠、按高度或其他值通过色阶着色，并支持图例和色条。

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

销售额

地区

月份

北部

南部

东部

西部

中部

五个地区的月度销售额

季度

第一季度

第二季度

第三季度

第四季度

市场

美洲

欧洲

亚洲

大洋洲

硬件

软件

服务

收入

三条产品线在四个市场的季度收入（堆叠）

女性

男性

年龄

{{from}}–{{to}} 岁

{{from}} 岁以上

普查年份

人口

{{value}} 百万

四个普查年份按年龄组和性别划分的人口

访问量

小时

星期

网站每周各小时的访问量

产品

笔记本电脑

手机

平板电脑

手表

音频设备

利润率

五种产品在四个市场的收入与利润率

库存充足

库存不足

{{value}} 件

实时更新

通道

{{id}} 通道

货架层

第 {{n}} 层

件数

按通道和货架层统计的仓库货位剩余件数，实时更新

库存 {{total}} 件 · 不足货位：{{low}} / {{bins}} · 已补货货位：{{restocked}}。

留存率

注册后月数

第 {{n}} 月

注册月份

按注册后月数统计的各月注册同期群留存率

{{cohort}}同期群，第 {{n}} 个月：{{retention}} 仍活跃（{{total}} 位用户中的 {{users}} 位）。

点击柱子查看同期群的留存率。

研发

销售

市场

运营

客服

财务

实际支出

财年

预算差异

部门

{{year}} 年六个部门的季度支出及预算差异

{{department}}，{{quarter}}：支出 {{actual}}，预算 {{budget}}（{{variance}}）。

{{year}} 年：支出 {{actual}}，预算 {{budget}}（{{variance}}）。超支最多：{{department}}，{{quarter}}（{{worst}}）。

{{value}} kW

进风温度

深色主题

3D 视图

平面图

机柜

排

{{id}} 排

功耗

按排和位置排列的服务器机柜，柱高为功耗，颜色为进风温度

机柜 {{rack}}：{{power}}，进风 {{inlet}}，超过 {{limit}} 上限。

机柜 {{rack}}：{{power}}，进风 {{inlet}}，未超过 {{limit}} 上限。

进风温度超过 {{limit}} 的机柜：{{total}} 个中有 {{hot}} 个（{{racks}}）。点击机柜查看读数。

## Bar3DChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Bar3DChart"
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
    "type": "boolean | Chart3DLegendOptions",
    "required": false,
    "description": "Legend; shown by default when several series have a name",
    "typeText": "boolean | Chart3DLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | Chart3DTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it",
    "typeText": "boolean | Chart3DTooltipOptions"
  },
  {
    "name": "interaction",
    "type": "boolean | Chart3DInteractionOptions",
    "required": false,
    "description": "Drag rotates, right / Shift + drag pans, Ctrl / ⌘ + wheel and pinch zoom; `false` makes the chart static (default `true`)",
    "typeText": "boolean | Chart3DInteractionOptions"
  },
  {
    "name": "barWidth",
    "type": "number",
    "default": "0.7",
    "required": false,
    "description": "Width of the bars of the series that do not set one, as a fraction of a cell",
    "typeText": "number"
  },
  {
    "name": "autoRotate",
    "type": "number | boolean",
    "required": false,
    "description": "Turns the camera around the box: `true` at 12°/s or a speed in degrees per second (default `false`)",
    "typeText": "number | boolean"
  },
  {
    "name": "box",
    "type": "boolean",
    "required": false,
    "description": "Draws the axis box: back walls, grid lines, tick labels and axis titles (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "colorBar",
    "type": "boolean | Chart3DColorBarOptions",
    "required": false,
    "description": "Color bar; shown by default when a visible series uses the color scale",
    "typeText": "boolean | Chart3DColorBarOptions"
  },
  {
    "name": "labels",
    "type": "Partial<Chart3DLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<Chart3DLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the data layer: WebGPU, then WebGL2, WebGL, Canvas2D (default `auto`)",
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
    "type": "readonly Bar3DSeries[]",
    "required": true,
    "description": "Bars over the x × y category grid (bars of the same cell are stacked)",
    "typeText": "readonly Bar3DSeries[]"
  },
  {
    "name": "xAxis",
    "type": "Chart3DAxisOptions",
    "required": false,
    "description": "X axis (width of the box)",
    "typeText": "Chart3DAxisOptions"
  },
  {
    "name": "yAxis",
    "type": "Chart3DAxisOptions",
    "required": false,
    "description": "Y axis (depth of the box)",
    "typeText": "Chart3DAxisOptions"
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
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip, axes); the page language by default",
    "typeText": "string"
  },
  {
    "name": "exposure",
    "type": "number",
    "required": false,
    "description": "Brightness of the light of `blend: \"additive\"` series, tone mapped on WebGPU and WebGL2 (default 1)",
    "typeText": "number"
  },
  {
    "name": "camera",
    "type": "Chart3DCameraOptions",
    "required": false,
    "description": "Initial camera, also restored by a double click (changing it moves the camera)",
    "typeText": "Chart3DCameraOptions"
  },
  {
    "name": "zAxis",
    "type": "Chart3DAxisOptions",
    "required": false,
    "description": "Z axis (height of the box)",
    "typeText": "Chart3DAxisOptions"
  },
  {
    "name": "aspect",
    "type": "readonly [number, number, number]",
    "required": false,
    "description": "Proportions of the box (x, y, z; default `[1, 1, 0.7]`)",
    "typeText": "readonly [number, number, number]"
  },
  {
    "name": "colorScale",
    "type": "Chart3DColorScale",
    "required": false,
    "description": "Colors of `colorBy: \"z\"` / `\"value\"`: a built-in ramp or CSS colors (default `viridis`)",
    "typeText": "Chart3DColorScale"
  },
  {
    "name": "valueRange",
    "type": "readonly [number, number]",
    "required": false,
    "description": "Values mapped to the ends of the color scale; the data range by default",
    "typeText": "readonly [number, number]"
  },
  {
    "name": "lighting",
    "type": "Chart3DLightingOptions",
    "required": false,
    "description": "Lighting of the surfaces and bars",
    "typeText": "Chart3DLightingOptions"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[event: Chart3DHoverEvent | null]",
    "typeText": "[event: Chart3DHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "Chart3DHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "type": "[event: Chart3DHoverEvent]",
    "typeText": "[event: Chart3DHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "Chart3DHoverEvent",
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
  },
  {
    "name": "cameraChange",
    "type": "[camera: Chart3DCameraState]",
    "typeText": "[camera: Chart3DCameraState]",
    "parameters": [
      {
        "name": "camera",
        "position": 0,
        "typeText": "Chart3DCameraState",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: sales

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/bar-3d-chart/vue/sales.vue

```vue
<script setup lang="ts">
// <Bar3DChart>: a bar per region × quarter cell, colored by height
// (`colorBy: "z"`); the axes name the categories.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { Bar3DChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    sales: "Sales (k€)",
    regions: ["North", "South", "East", "West"],
    quarters: ["Q1", "Q2", "Q3", "Q4"],
  },
  zh: {
    sales: "销售额（千欧元）",
    regions: ["华北", "华南", "华东", "华西"],
    quarters: ["第一季度", "第二季度", "第三季度", "第四季度"],
  },
  ja: {
    sales: "売上（千ユーロ）",
    regions: ["北部", "南部", "東部", "西部"],
    quarters: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  },
  fr: {
    sales: "Ventes (k€)",
    regions: ["Nord", "Sud", "Est", "Ouest"],
    quarters: ["T1", "T2", "T3", "T4"],
  },
};

// sales per region (rows) and quarter (columns), k€
const SALES = [
  [120, 135, 150, 180],
  [90, 110, 105, 130],
  [160, 170, 190, 220],
  [70, 85, 95, 100],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [
  {
    name: text.value.sales,
    colorBy: "z" as const,
    data: SALES.flatMap((row, i) =>
      row.map((z, j) => ({
        x: text.value.regions[i],
        y: text.value.quarters[j],
        z,
      })),
    ),
  },
]);
</script>

<template>
  <Bar3DChart
    :series="series"
    :x-axis="{ categories: text.regions }"
    :y-axis="{ categories: text.quarters }"
    :z-axis="{ title: text.sales }"
    :height="420"
  />
</template>

```

## Example: stacked

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/bar-3d-chart/vue/stacked.vue

```vue
<script setup lang="ts">
// Two series on the same cells are stacked: sales in stores and online per
// product and year; `bar-width` thins the bars, the legend toggles a channel.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { Bar3DChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    channels: ["Stores", "Online"],
    years: ["2023", "2024", "2025"],
    products: ["Shoes", "Bags", "Watches"],
  },
  zh: {
    channels: ["门店", "线上"],
    years: ["2023", "2024", "2025"],
    products: ["鞋子", "包袋", "手表"],
  },
  ja: {
    channels: ["店舗", "オンライン"],
    years: ["2023", "2024", "2025"],
    products: ["靴", "バッグ", "時計"],
  },
  fr: {
    channels: ["Magasins", "En ligne"],
    years: ["2023", "2024", "2025"],
    products: ["Chaussures", "Sacs", "Montres"],
  },
};

// per channel: products (rows) × years (columns), k units
const CHANNELS = [
  [
    [40, 38, 35],
    [22, 24, 20],
    [15, 14, 12],
  ],
  [
    [18, 27, 36],
    [9, 14, 21],
    [6, 9, 13],
  ],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() =>
  text.value.channels.map((name, c) => ({
    name,
    data: CHANNELS[c].flatMap((row, i) =>
      row.map((z, j) => ({ x: i, y: j, z })),
    ),
  })),
);
</script>

<template>
  <Bar3DChart
    :series="series"
    :bar-width="0.55"
    :x-axis="{ categories: text.products }"
    :y-axis="{ categories: text.years }"
    :height="420"
  />
</template>

```
