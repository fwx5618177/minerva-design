# 3D 棒グラフ

x × y のカテゴリ格子上の棒：ライティングされた箱、系列ごとの色、系列をまたぐ積み上げ、高さや別の値によるカラースケールの色、凡例とカラーバー。

Package: minerva-design@1.22.2

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

売上

地域

月

北部

南部

東部

西部

中部

5 地域の月別売上

四半期

第1四半期

第2四半期

第3四半期

第4四半期

市場

米州

欧州

アジア

オセアニア

ハードウェア

ソフトウェア

サービス

売上高

4 市場における 3 製品ラインの四半期売上高（積み上げ）

女性

男性

年齢

{{from}}〜{{to}} 歳

{{from}} 歳以上

調査年

人口

{{value}} 百万人

4 回の国勢調査における年齢層・性別ごとの人口

訪問数

時刻

曜日

曜日・時間帯別のウェブサイト訪問数

製品

ノート PC

スマートフォン

タブレット

腕時計

オーディオ

利益率

4 市場における 5 製品の売上高と利益率

在庫あり

在庫僅少

{{value}} 個

ライブ更新

通路

通路 {{id}}

棚段

{{n}} 段目

数量

通路と棚段ごとの倉庫ロケーションの残り数量（ライブ更新）

在庫 {{total}} 個 · 僅少ロケーション: {{low}} / {{bins}} · 補充済み: {{restocked}}。

継続率

登録からの月数

{{n}} か月目

登録月

登録からの月数ごとの月次登録コホートの継続率

{{cohort}}コホートの {{n}} か月目: {{retention}} が継続中（{{total}} 人中 {{users}} 人）。

棒をクリックするとコホートの継続率を表示します。

開発

営業

マーケティング

オペレーション

サポート

経理

実績支出

会計年度

予算差異

部門

{{year}} 年度の 6 部門の四半期支出と予算差異

{{department}}・{{quarter}}: 予算 {{budget}} に対し支出 {{actual}}（{{variance}}）。

{{year}} 年度: 予算 {{budget}} に対し支出 {{actual}}（{{variance}}）。最大の超過: {{department}}・{{quarter}}（{{worst}}）。

{{value}} kW

吸気温度

ダークテーマ

3D 表示

平面図

ラック

列

{{id}} 列

消費電力

列と位置ごとのサーバーラック（高さは消費電力、色は吸気温度）

ラック {{rack}}: {{power}}、吸気 {{inlet}}、上限 {{limit}} を超えています。

ラック {{rack}}: {{power}}、吸気 {{inlet}}、上限 {{limit}} 以内です。

吸気温度が {{limit}} を超えるラック: {{total}} 台中 {{hot}} 台（{{racks}}）。ラックをクリックすると測定値を表示します。

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
