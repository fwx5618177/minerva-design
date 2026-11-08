# ヒートマップ

値に応じて色分けしたセルのグリッド。両軸ともカテゴリまたは数値を使えます。曜日×時間帯のアクティビティ、相関行列、指標の分布マップなどに。セルにホバーするとセルが浮き上がり、行と列が強調され、カラー凡例に値が示されます。

Package: minerva-design@1.23.2

Renderer: vue

Locale: ja

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

セッション

曜日と時間帯別のセッション数

偏差

1995〜2024 年の月別気温偏差

信号強度

200 × 100 m のフロアの Wi-Fi 信号強度

{{cells}} セル · {{renderer}} で描画 · Ctrl / ⌘ + ホイールでズーム、ドラッグでパン、ダブルクリックでリセット

コントリビューション

1 年間の日別コントリビューション数

過去 1 年間で {{total}} 件のコントリビューション

セッション

ページビュー

登録数

売上

解約

サポートチケット

相関係数

6 つの製品指標の相関行列

{{n}} か月目

継続率

月別登録コホートの継続率

デスクトップ

モバイル

タブレット

自然検索

有料検索

ソーシャル

メール

参照元サイト

直接

{{source}} × {{device}}: {{sessions}} セッションから {{orders}} 件の注文、{{rate}}:

平均 {{value}} を上回る

平均 {{value}} を下回る

セルをクリックすると、セッション数と注文数を表示します。

コンバージョン率

流入元とデバイス別のコンバージョン率

ラック {{n}}

センサー {{n}}

一時停止

再開

最高温: {{rack}} の {{sensor}}、{{value}} · {{limit}} 超えのセンサー {{alarms}} 個

吸気温度

10 台のサーバーラックのセンサーのライブ吸気温度

猫

犬

鳥

乗用車

トラック

実際: {{actual}}、予測: {{predicted}}

{{value}} 枚（クラスの {{share}}）

再現率: {{value}}

適合率: {{value}}

誤分類

正解率: テスト画像 {{images}} 枚中 {{value}}

クラス内の割合

予測クラス

実際のクラス

5 クラスの画像分類器の混同行列

北部

南部

東部

西部

中部

第 {{n}} 四半期

指標

売上

2025 年比の成長率

粗利益率

{{region}}・{{quarter}}

最高: {{best}}（{{bestValue}}）· 最低: {{worst}}（{{worstValue}}）

地域と四半期別の 2026 年の販売指標

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
