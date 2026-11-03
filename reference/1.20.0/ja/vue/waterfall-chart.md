# ウォーターフォールチャート

一連の増減が値を始点から終点へ運ぶ様子を、小計と合計とともに示します：損益ブリッジ、キャッシュフロー、差異分析。細い破線が各棒を次の棒につなぎます。

Package: minerva-design@1.20.0

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

売上高

売上原価

売上総利益

研究開発費

マーケティング費

一般管理費

営業利益

受取利息

法人税等

純利益

金額

売上高から純利益までの損益計算書

期首

期末

純キャッシュフロー

期首残高から期末残高までの月ごとの純キャッシュフロー

予算

実績

数量

価格

製品構成

為替

原材料

コスト削減

差異

予算と実績の利益の差異要因

年初

年末

採用

社内異動（受入）

退職

社内異動（送出）

定年退職

人数

1 年間の人員の増減

期首 ARR

新規

アップセル

縮小

解約

期末 ARR

ARR

四半期

第{{n}}四半期

{{quarter}}：純新規 ARR {{net}} · 売上継続率 {{nrr}}

{{quarter}}の ARR ブリッジ

定価

販売店値引き

販促

請求価格

支払条件

運賃

数量リベート

実質手取り価格

単価

バーをクリックすると定価と比較します

{{step}}：{{value}}、定価の {{share}}

定価から実質手取り価格までの価格ウォーターフォール

2019 年基準

事業成長

省エネ

再生可能電力

EV 車両

冷媒

買収

2025 年

2030 年目標

{{value}} kt CO₂e

排出量

変化：{{value}}

{{from}} から {{to}}

2030 年目標を {{value}} 上回る

2019 年基準から 2025 年までの排出量ブリッジ

受注入力

与信審査

ピッキング

品質検査

運送業者待ち

輸送

通関

リードタイム

所要時間

作業

待ち

作業は {{total}} のうち {{work}}（{{share}}）

工程別の注文リードタイム

それ以前

現在

残高

顧客からの入金

仕入先への支払

給与

カード手数料

返金

最新：{{time}} · {{kind}} {{amount}}

一時停止

再開

当日の資金ポジション（ライブ更新）

コミット

追加

削除

再見積もり

持ち越し

完了

ストーリーポイント

向き

縦

横

ラベル

コネクタ

コミットから完了までのスプリントのストーリーポイント

## WaterfallChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "WaterfallChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "labels",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Writes the change (or the total) at the end of every bar",
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
    "name": "connector",
    "type": "boolean | ChartConnectorOptions",
    "required": false,
    "description": "Thin lines from the end of every bar to the next one; an object styles them (default `true`: dashed, secondary text color)",
    "typeText": "boolean | ChartConnectorOptions"
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
    "name": "start",
    "type": "number",
    "required": false,
    "description": "Value the first change starts from (default 0)",
    "typeText": "number"
  },
  {
    "name": "name",
    "type": "string",
    "required": false,
    "description": "Name of the series (tooltip; default \"Change\")",
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
    "name": "format",
    "type": "((value: number) => string)",
    "required": false,
    "description": "Formats the values (labels, tooltip)",
    "typeText": "((value: number) => string)"
  },
  {
    "name": "upColor",
    "type": "string",
    "required": false,
    "description": "Color of the increases (the success color by default)",
    "typeText": "string"
  },
  {
    "name": "downColor",
    "type": "string",
    "required": false,
    "description": "Color of the decreases (the danger color by default)",
    "typeText": "string"
  },
  {
    "name": "totalColor",
    "type": "string",
    "required": false,
    "description": "Color of the totals and subtotals (the primary color by default)",
    "typeText": "string"
  },
  {
    "name": "steps",
    "type": "readonly WaterfallStep[]",
    "required": true,
    "description": "Changes, subtotals and totals, in order",
    "typeText": "readonly WaterfallStep[]"
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

## Example: cash-flow

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/vue/cash-flow.vue

```vue
<script setup lang="ts">
// Monthly cash flows from an opening balance: rows instead of
// columns (`orientation="horizontal"`), values in the tooltip only.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { WaterfallChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { opening: "Opening", closing: "Closing" },
  zh: { opening: "期初", closing: "期末" },
  ja: { opening: "期首", closing: "期末" },
  fr: { opening: "Ouverture", closing: "Clôture" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const FLOWS = [18, -12, 25, -30, 14, 9];

const { language } = useI18n();
const steps = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  const months = MONTHS[language.value] ?? MONTHS.en;
  return [
    { label: text.opening, value: 120 },
    ...FLOWS.map((value, i) => ({ label: months[i], value })),
    { label: text.closing, kind: "total" as const },
  ];
});
</script>

<template>
  <WaterfallChart
    :steps="steps"
    :labels="false"
    orientation="horizontal"
    :height="360"
  />
</template>

```

## Example: pnl

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/vue/pnl.vue

```vue
<script setup lang="ts">
// A profit and loss bridge: changes float from the running total,
// `subtotal` / `total` steps start from zero; the values are written on the bars.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { WaterfallChart } from "minerva-design/vue/charts";

const STEPS = {
  en: [
    "Revenue",
    "Cost of sales",
    "Gross profit",
    "Operating costs",
    "Other income",
    "Taxes",
    "Net income",
  ],
  zh: [
    "营业收入",
    "销售成本",
    "毛利润",
    "运营费用",
    "其他收入",
    "税费",
    "净利润",
  ],
  ja: [
    "売上高",
    "売上原価",
    "売上総利益",
    "営業費用",
    "その他収益",
    "税金",
    "純利益",
  ],
  fr: [
    "Chiffre d’affaires",
    "Coût des ventes",
    "Marge brute",
    "Charges d’exploitation",
    "Autres produits",
    "Impôts",
    "Résultat net",
  ],
};

const { language } = useI18n();
const steps = computed(() => {
  const label = STEPS[language.value] ?? STEPS.en;
  return [
    { label: label[0], value: 420 },
    { label: label[1], value: -180 },
    { label: label[2], kind: "subtotal" as const },
    { label: label[3], value: -130 },
    { label: label[4], value: 25 },
    { label: label[5], value: -34 },
    { label: label[6], kind: "total" as const },
  ];
});
const format = (value: number) => `${value} k€`;
</script>

<template>
  <WaterfallChart :steps="steps" :format="format" :height="320" />
</template>

```
