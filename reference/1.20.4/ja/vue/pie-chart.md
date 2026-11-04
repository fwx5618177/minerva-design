# 円グラフ / ドーナツグラフ

全体に対する各部分の割合を示します：円グラフ、ドーナツグラフ（中央に合計を表示可能）、ナイチンゲールのローズチャート。正確な比較よりも構成比が重要な、少数（目安として 8 個まで）のカテゴリに適しています。ホバーまたは矢印キーでスライスをハイライトし、Esc で解除します。凡例の項目をクリックするとスライスを非表示にできます。

Package: minerva-design@1.20.4

Renderer: vue

Locale: ja

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

自然検索

ダイレクト

ソーシャル

有料広告

参照元サイト

メール

{{sessions}} セッション · {{share}}

過去 30 日間の流入元別ウェブサイトセッション

{{source}}：{{sessions}} セッション（トラフィックの {{share}}）

スライスをクリック（またはチャートにフォーカスして Enter）して流入元を選択してください

エンタープライズ

ビジネス

プロ

スターター

月間売上

プラン別の月間経常収益

メール

ライブチャット

Web フォーム

電話

SNS

コミュニティ

ラベルの位置

外側

内側

なし

ラベルの内容

名前

値

割合

{{tickets}} 件 · {{share}}

チャネル別のサポートチケット

月平均降水量

その他

出荷台数

{{units}} 台 · {{share}}

ベンダー別のスマートフォン市場シェア

住居

食費

交通

娯楽

家賃

光熱費

保険

食料品

外食

公共交通

自動車

旅行

サブスクリプション

スポーツ

項目別の月間予算

カテゴリ別の月間予算

{{name}}：{{amount}}（{{share}}）

リングにホバーしてカテゴリや項目を表示します

アジア太平洋

ヨーロッパ

北米

中南米

モバイル

デスクトップ

タブレット

{{region}}のデバイス別セッション

米国株式

外国株式

債券

不動産

コモディティ

現金

表示する資産クラス

すべて表示

選択中

評価額合計

ポートフォリオの {{share}}

資産クラス別の投資ポートフォリオ

{{total}} 資産クラス中 {{shown}} を表示：{{value}}（ポートフォリオの {{share}}）。

ダークモード

オフラインモード

公開 API

連携の追加

カスタムレポート

次に開発すべき機能はどれですか？

票

{{votes}} 票 · {{share}}

回答別のライブ投票結果

一時停止

再開

リセット

首位：{{answer}}

コンピューティング

データベース

ストレージ

ネットワーク

仮想マシン

Kubernetes

サーバーレス関数

SQL データベース

NoSQL データベース

インメモリキャッシュ

オブジェクトストレージ

ブロックストレージ

バックアップ

データ転送

CDN

ロードバランサー

クラウド請求

すべてのカテゴリ

クリックしてサービスを表示

サービス別の{{category}}費用

カテゴリ別の月間クラウド請求

{{service}}：{{amount}}（{{category}}の {{share}}）。

{{category}}：{{amount}}（請求の {{share}}）。サービスをクリックすると割合を表示します。

月間請求額：{{total}}。カテゴリをクリックするとサービスを表示します。

とても不満

不満

どちらでもない

満足

とても満足

第{{n}}四半期

四半期

CSAT

{{answers}} 件の回答 · {{share}}

{{quarter}}の顧客満足度の回答

CSAT {{csat}}（回答者 {{respondents}} 人）。

CSAT {{csat}}、{{previous}}から {{delta}} ポイント（回答者 {{respondents}} 人）。

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
