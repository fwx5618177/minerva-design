# サンキー図

段階間の流れを示します：エネルギー収支、ユーザー動線、予算配分など。ノードは列に並び、リンクの太さは流量に比例します。ノードの並びは反復的な緩和で調整され、流れがまっすぐになり交差が減ります。ノードにホバーするとそのすべての流れが強調され、リンクにホバーすると流出元に対する割合を確認できます。矢印キーでノードとリンクを移動できます。

Package: minerva-design@1.22.1

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

太陽光

風力

水力

原子力

天然ガス

石炭

石油

電力

地域熱供給

石油製品

家庭

産業

業務

運輸

損失

{{value}} TWh

エネルギー収支：一次エネルギー、エネルギーキャリア、最終用途（テラワット時/年）

検索広告

自然検索

ニュースレター

ソーシャル

トップページ

料金ページ

ブログ

登録フォーム

離脱

トライアル開始

登録中断

有料プラン

トライアル終了

1 週間のセッション：流入チャネルから契約まで

{{source}} → {{target}}：{{value}} セッション（{{source}} の {{share}}%）

{{name}}：{{value}} セッション

ステップや経路をクリック（またはチャートにフォーカスして Enter）すると選択できます

ライセンス

サブスクリプション

サービス

助成金

年間予算

研究開発

営業・マーケティング

運用

管理部門

プラットフォーム

モバイルアプリ

AI 研究

キャンペーン

営業チーム

インフラ

カスタマーサポート

財務・法務

オフィス

年間予算：収益源、部門、プログラム

メール

チャット

電話

チャットボット

一次対応

二次対応

開発チーム

解決

返金

不具合登録

1 か月のサポートチケット：チャネルから結果まで

ノードの配置

両端揃え

左揃え

右揃え

中央

リンクの色

グラデーション

流出元

流入先

ニュートラル

ラベルに値を表示

クラウド

ライセンス

ハードウェア

サービス

売上高

売上原価

売上総利益

研究開発費

販売・マーケティング費

一般管理費

営業利益

法人税等

当期純利益

四半期の損益計算書：売上セグメント、コスト、利益

売上総利益率 {{gross}} ・ 営業利益率 {{operating}} ・ 純利益率 {{net}}

ブラジル

コロンビア

エチオピア

ベトナム

ハンブルク焙煎所

ロッテルダム焙煎所

北倉庫

中央倉庫

南倉庫

カフェ

スーパーマーケット

オンラインショップ

{{value}} t

1 か月に出荷されたコーヒー：産地から焙煎所と倉庫を経て販売チャネルまで

拠点をクリックするとそこを通るすべての流れを追跡し、出荷ルートをクリックするとそのルートを選択します

{{name}}：{{from}} 拠点から {{inbound}} を入荷、{{to}} 拠点へ {{outbound}} を出荷

{{source}} → {{target}}：{{value}}（{{source}} の出荷量の {{share}}）

選択を解除

社員紹介

求人サイト

ビジネス SNS

人材紹介会社

新卒採用

応募

書類選考で不合格

電話面談

電話面談で不合格

面接

面接で不合格

内定

内定辞退

入社

離脱を表示

1 年間の採用ファネル：応募経路から入社まで

応募 {{applied}} 件、採用 {{hired}} 名（{{rate}}）。電話面談を受けた候補者の {{interview}} が面接に進み、内定の {{accepted}} が承諾されています。

Web アプリ

iOS アプリ

Android アプリ

パートナー API

API ゲートウェイ

認証

カタログ

検索

決済

2xx 成功

4xx クライアントエラー

5xx サーバーエラー

{{value}} req/s

合計：{{total}}。

サーバーエラー率：{{rate}}

サーバーエラー率：{{rate}}、決済サービスで障害発生

一時停止

再開

リアルタイム API トラフィック（秒間リクエスト数）：クライアントからサービスとステータスコードまで

PET ボトル・トレー

HDPE 容器

PP カップ・キャップ

LDPE フィルム

その他のポリマー

市場に出た包装材

リサイクル回収

焼却

埋立

自然環境への流出

リサイクル

選別残渣

新しい包装材

低品位製品

{{value}} Mt

{{source}} の {{share}}

包装材全体の {{share}}

1 年間のプラスチック包装材（メガトン）：ポリマー、廃棄経路、リサイクル

## SankeyChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "SankeyChart"
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
    "name": "labels",
    "type": "boolean",
    "required": false,
    "description": "Node labels (name and value; default `true`)",
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
    "name": "labelValues",
    "type": "boolean",
    "required": false,
    "description": "Shows the value after the name in the labels (default `true`)",
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
    "name": "links",
    "type": "readonly SankeyLink[]",
    "required": true,
    "description": "Flows between the nodes (by name or index); links closing a cycle are ignored",
    "typeText": "readonly SankeyLink[]"
  },
  {
    "name": "nodes",
    "type": "readonly SankeyNode[]",
    "required": false,
    "description": "Nodes, in their initial order; nodes only named by a link are appended",
    "typeText": "readonly SankeyNode[]"
  },
  {
    "name": "align",
    "type": "\"left\" | \"right\" | \"center\" | \"justify\"",
    "required": false,
    "description": "Column of the nodes without a `column` (default `justify`)",
    "typeText": "\"left\" | \"right\" | \"center\" | \"justify\""
  },
  {
    "name": "nodeWidth",
    "type": "number",
    "required": false,
    "description": "Width of the node bars, in pixels (default 12)",
    "typeText": "number"
  },
  {
    "name": "nodePadding",
    "type": "number",
    "required": false,
    "description": "Vertical gap between the nodes of a column, in pixels (default 12)",
    "typeText": "number"
  },
  {
    "name": "iterations",
    "type": "number",
    "required": false,
    "description": "Relaxation passes that straighten the flows and reduce crossings (default 32)",
    "typeText": "number"
  },
  {
    "name": "linkOpacity",
    "type": "number",
    "required": false,
    "description": "Opacity of the links, 0-1 (default 0.4)",
    "typeText": "number"
  },
  {
    "name": "linkColor",
    "type": "\"neutral\" | \"target\" | \"gradient\" | \"source\"",
    "required": false,
    "description": "Color of the links without `color` (default `gradient`)",
    "typeText": "\"neutral\" | \"target\" | \"gradient\" | \"source\""
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

## Example: energy

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/vue/energy.vue

```vue
<script setup lang="ts">
// Energy flows from the sources to the uses through the grid: link
// thickness is the flow, colored from the source to the target.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { SankeyChart } from "minerva-design/vue/charts";

const NODES = {
  en: [
    "Solar",
    "Wind",
    "Gas",
    "Grid",
    "Homes",
    "Industry",
    "Transport",
    "Losses",
  ],
  zh: ["太阳能", "风能", "天然气", "电网", "居民", "工业", "交通", "损耗"],
  ja: ["太陽光", "風力", "ガス", "送電網", "家庭", "産業", "運輸", "損失"],
  fr: [
    "Solaire",
    "Éolien",
    "Gaz",
    "Réseau",
    "Foyers",
    "Industrie",
    "Transports",
    "Pertes",
  ],
};

// source, target (node indexes), TWh
const LINKS = [
  [0, 3, 32],
  [1, 3, 48],
  [2, 3, 70],
  [3, 4, 52],
  [3, 5, 61],
  [3, 6, 22],
  [3, 7, 15],
].map(([source, target, value]) => ({ source, target, value }));

const { language } = useI18n();
const nodes = computed(() =>
  (NODES[language.value] ?? NODES.en).map((name) => ({ name })),
);
const format = (value: number) => `${value} TWh`;
</script>

<template>
  <SankeyChart :nodes="nodes" :links="LINKS" :format="format" />
</template>

```

## Example: journey

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/vue/journey.vue

```vue
<script setup lang="ts">
// A user journey with drop-offs: `align="left"` keeps every step in its
// column, `link-color="source"` colors a flow like the page it leaves.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { SankeyChart } from "minerva-design/vue/charts";

const STEPS = {
  en: ["Home page", "Search", "Product page", "Cart", "Checkout", "Left"],
  zh: ["首页", "搜索", "商品页", "购物车", "结账", "离开"],
  ja: ["トップページ", "検索", "商品ページ", "カート", "購入手続き", "離脱"],
  fr: ["Accueil", "Recherche", "Fiche produit", "Panier", "Paiement", "Départ"],
};

// from, to (step indexes), visitors
const FLOWS = [
  [0, 1, 420],
  [0, 2, 310],
  [0, 5, 270],
  [1, 2, 330],
  [1, 5, 90],
  [2, 3, 380],
  [2, 5, 260],
  [3, 4, 240],
  [3, 5, 140],
].map(([source, target, value]) => ({ source, target, value }));

const { language } = useI18n();
const nodes = computed(() =>
  (STEPS[language.value] ?? STEPS.en).map((name, i) => ({
    name,
    ...(i === 5 ? { color: "var(--text-secondary-color, #9ca3af)" } : {}),
  })),
);
</script>

<template>
  <SankeyChart :nodes="nodes" :links="FLOWS" align="left" link-color="source" />
</template>

```
