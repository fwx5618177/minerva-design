# ツリーマップ

値に比例した面積の入れ子の長方形で階層データを表し、どこが最も大きいかをひと目で示します（ディスク使用量、予算、ポートフォリオ）。ホバーまたは矢印キーでセルをハイライトすると、ツールチップにそのパスが表示されます。

Package: minerva-design@1.19.3

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

メディア

ビデオ

写真

ミュージック

アプリケーション

プロジェクト

システム

ライブラリ

キャッシュ

ログ

ダウンロード

インストーラー

アーカイブ

フォルダー別のディスク使用量

{{path}}：{{size}}（ディスクの {{share}}）

セルをクリックすると場所を表示します

エンジニアリング

営業

マーケティング

カスタマーサクセス

オペレーション

経理

人事

法務

部門別の年間予算

テクノロジー

金融

ヘルスケア

エネルギー

消費財

時価総額：{{value}}

セクター別・当日の騰落率で色分けした株式マーケットマップ

バンドルの {{share}}

モジュール別の JavaScript バンドルサイズ

合計 {{size}}。100 KB を超える依存関係：{{modules}}。

家電

ホーム

ファッション

スポーツ

スマートフォン

ノート PC

オーディオ

キッチン

家具

インテリア雑貨

レディース

メンズ

キッズ

アウトドア

フィットネス

カタログのパス

すべてのカテゴリ

カテゴリ・サブカテゴリ・ブランド別の四半期売上

サブカテゴリ・ブランド別の{{category}}の売上

{{path}}：{{revenue}}（カテゴリの {{share}}）。

カテゴリをクリックすると開きます。

ブランドをクリックすると売上を表示します。

コンピューティング

データベース

ストレージ

ネットワーク

オブザーバビリティ

請求の {{share}}

サービス・リソース別の月間クラウドコスト

表示中：{{visible}}（請求額 {{total}} の {{share}}）。

月間請求額：{{total}}。

すべて表示

ライブ更新

{{used}} / {{limit}}（{{share}}）

名前空間別のクラスタ Pod のメモリ使用量

メモリ上限の {{threshold}} を超えた Pod：{{pods}}

すべての Pod がメモリ上限の {{threshold}} 未満です。

ヨーロッパ

南北アメリカ

アジア太平洋

指標

売上

注文数

利益

合計の {{share}}（{{metric}}）

地域・国別の年間販売：{{metric}}

## TreemapChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TreemapChart"
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
    "name": "headers",
    "type": "boolean",
    "required": false,
    "description": "Draws the names of the parents above their children (default `true`)",
    "typeText": "boolean"
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
    "type": "readonly TreemapNode[]",
    "required": true,
    "description": "Nodes `{ name, value, children }`: leaves carry a value, parents sum their children",
    "typeText": "readonly TreemapNode[]"
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
    "description": "Gap between the cells, in pixels (default 2)",
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

## Example: flat

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/treemap-chart/vue/flat.vue

```vue
<script setup lang="ts">
// A flat list: one rectangle per node, its area proportional to the value.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { TreemapChart } from "minerva-design/vue/charts";

const TEXT = {
  en: ["Asia", "Europe", "North America", "South America", "Africa", "Oceania"],
  zh: ["亚洲", "欧洲", "北美洲", "南美洲", "非洲", "大洋洲"],
  ja: ["アジア", "ヨーロッパ", "北米", "南米", "アフリカ", "オセアニア"],
  fr: [
    "Asie",
    "Europe",
    "Amérique du Nord",
    "Amérique du Sud",
    "Afrique",
    "Océanie",
  ],
};

const { language } = useI18n();
const data = computed(() =>
  [4750, 745, 600, 440, 1460, 46].map((value, i) => ({
    name: (TEXT[language.value] ?? TEXT.en)[i],
    value,
  })),
);
const format = (millions: number) => `${millions}M`;
</script>

<template>
  <TreemapChart :data="data" :gap="4" :format="format" :height="300" />
</template>

```

## Example: nested

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/treemap-chart/vue/nested.vue

```vue
<script setup lang="ts">
// Parents sum their children and draw their name above them.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { TreemapChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    media: "Media",
    documents: "Documents",
    apps: "Apps",
    photos: "Photos",
    videos: "Videos",
    music: "Music",
    work: "Work",
    personal: "Personal",
    tools: "Tools",
    games: "Games",
  },
  zh: {
    media: "媒体",
    documents: "文档",
    apps: "应用",
    photos: "照片",
    videos: "视频",
    music: "音乐",
    work: "工作",
    personal: "个人",
    tools: "工具",
    games: "游戏",
  },
  ja: {
    media: "メディア",
    documents: "書類",
    apps: "アプリ",
    photos: "写真",
    videos: "動画",
    music: "音楽",
    work: "仕事",
    personal: "個人",
    tools: "ツール",
    games: "ゲーム",
  },
  fr: {
    media: "Médias",
    documents: "Documents",
    apps: "Applications",
    photos: "Photos",
    videos: "Vidéos",
    music: "Musique",
    work: "Travail",
    personal: "Personnel",
    tools: "Outils",
    games: "Jeux",
  },
};

const { language } = useI18n();
const data = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  return [
    {
      name: text.media,
      children: [
        { name: text.photos, value: 48 },
        { name: text.videos, value: 96 },
        { name: text.music, value: 22 },
      ],
    },
    {
      name: text.documents,
      children: [
        { name: text.work, value: 31 },
        { name: text.personal, value: 12 },
      ],
    },
    {
      name: text.apps,
      children: [
        { name: text.tools, value: 40 },
        { name: text.games, value: 64 },
      ],
    },
  ];
});
const format = (gb: number) => `${gb} GB`;
</script>

<template>
  <TreemapChart :data="data" :format="format" :height="320" />
</template>

```
