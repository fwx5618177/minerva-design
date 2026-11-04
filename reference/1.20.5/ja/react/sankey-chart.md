# サンキー図

段階間の流れを示します：エネルギー収支、ユーザー動線、予算配分など。ノードは列に並び、リンクの太さは流量に比例します。ノードの並びは反復的な緩和で調整され、流れがまっすぐになり交差が減ります。ノードにホバーするとそのすべての流れが強調され、リンクにホバーすると流出元に対する割合を確認できます。矢印キーでノードとリンクを移動できます。

Package: minerva-design@1.20.5

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
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
    "name": "nodes",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly SankeyNode[] | undefined",
    "typeRef": "type:abbae3a275f8cae80221",
    "required": false,
    "description": "Nodes, in their initial order; nodes only named by a link are appended"
  },
  {
    "name": "links",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly SankeyLink[]",
    "typeRef": "type:9b7445fd57ca5be620e0",
    "required": true,
    "description": "Flows between the nodes (by name or index); links closing a cycle are ignored"
  },
  {
    "name": "nodeWidth",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 12,
    "required": false,
    "description": "Width of the node bars, in pixels"
  },
  {
    "name": "nodePadding",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 12,
    "required": false,
    "description": "Vertical gap between the nodes of a column, in pixels (reduced when space is short)"
  },
  {
    "name": "align",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "enum",
    "values": [
      "center",
      "justify",
      "left",
      "right"
    ],
    "typeText": "\"center\" | \"left\" | \"right\" | \"justify\" | undefined",
    "typeRef": "type:57f0ccb646e05fa470d8",
    "default": "justify",
    "required": false,
    "description": "Column of the nodes without a `column`: `justify` puts the sinks in the last column, `left` / `right` align on the sources / sinks, `center` puts the sources next to their first target"
  },
  {
    "name": "iterations",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 32,
    "required": false,
    "description": "Relaxation passes that straighten the flows and reduce crossings"
  },
  {
    "name": "linkColor",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "enum",
    "values": [
      "gradient",
      "neutral",
      "source",
      "target"
    ],
    "typeText": "\"neutral\" | \"target\" | \"source\" | \"gradient\" | undefined",
    "typeRef": "type:455388a12bfe376d2148",
    "default": "gradient",
    "required": false,
    "description": "Color of the links without `color`: a gradient from the source to the target color, one of the two, or a neutral gray"
  },
  {
    "name": "linkOpacity",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.4,
    "required": false,
    "description": "Opacity of the links, 0-1 (hovered flows are more opaque)"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Node labels (name and value); overlapping labels are skipped"
  },
  {
    "name": "labelValues",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the value after the name in the labels"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "enum",
    "values": [
      "auto",
      "canvas2d",
      "webgl",
      "webgl2",
      "webgpu"
    ],
    "typeText": "ChartRendererPreference | undefined",
    "typeRef": "type:dc7d7e6f384ddec86e04",
    "required": false,
    "description": "Backend of the shapes: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software; text is always drawn with Canvas2D, above the shapes"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "typeRef": "type:b3cd5c49d86fb91effb3",
    "required": false,
    "description": "Legend; clicking an item hides / shows its slice, stage, series, node, bar, row or level"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "typeRef": "type:9441d8fe0edba7239796",
    "default": true,
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "format",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:f12d9d0b7c053d4d65a6",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the values of the labels and the tooltip"
  },
  {
    "name": "percentFormat",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((share: number) => string) | undefined",
    "typeRef": "type:5bfc1184b082171dcbfd",
    "parameters": [
      {
        "name": "share",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the chart writes (tooltip rows, accessible names, number and percent formats, calendar dates); built-in texts in English, Chinese, Japanese and French (English otherwise)"
  },
  {
    "name": "texts",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "object",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "typeRef": "type:2ef787a978af6750b6c8",
    "required": false,
    "description": "Replaces built-in texts of the `locale` (tooltip rows, accessible names, \"No data\")"
  },
  {
    "name": "hidden",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar levels, by index. Makes the visibility controlled: legend clicks then only call `onToggle`, whose `hiddenIndexes` should be stored and passed back. Leave undefined to let the legend hide / show entries by itself."
  },
  {
    "name": "animation",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Entry and update animations (skipped when the user prefers reduced motion)"
  },
  {
    "name": "padding",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the drawing, in pixels"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "renderTooltip",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "node",
    "typeText": "((event: ShapeHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:599537a71f6aca3767b8",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip (replaces the default content)"
  }
]
```

### events

```json
[
  {
    "name": "onToggle",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:c5e11f23fbce8c1aa9a2",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeToggleEvent",
        "typeRef": "type:4b4244045a32e66c0a25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a legend item is clicked (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
  },
  {
    "name": "onHover",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:4d7c0df4667f26938fe6",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent | null",
        "typeRef": "type:5ce60fcc1021d329ffba"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the hovered (or keyboard-focused) mark changes"
  },
  {
    "name": "onClick",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:e40dbbb538ff7cd7dda5",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a mark is clicked, tapped or activated with Enter"
  }
]
```

## API

```json
{
  "SankeyChartProps": {
    "source": "charts/src/react/shapes.tsx",
    "description": "Props of SankeyChart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "nodes",
        "type": "readonly SankeyNode[]",
        "required": false,
        "description": "Nodes, in their initial order; nodes only named by a link are appended"
      },
      {
        "name": "links",
        "type": "readonly SankeyLink[]",
        "required": true,
        "description": "Flows between the nodes (by name or index); links closing a cycle are ignored"
      },
      {
        "name": "nodeWidth",
        "type": "number",
        "required": false,
        "default": "12",
        "description": "Width of the node bars, in pixels"
      },
      {
        "name": "nodePadding",
        "type": "number",
        "required": false,
        "default": "12",
        "description": "Vertical gap between the nodes of a column, in pixels (reduced when space is short)"
      },
      {
        "name": "align",
        "type": "\"justify\" | \"left\" | \"right\" | \"center\"",
        "required": false,
        "default": "\"justify\"",
        "description": "Column of the nodes without a `column`: `justify` puts the sinks in the last column, `left` / `right` align on the sources / sinks, `center` puts the sources next to their first target"
      },
      {
        "name": "iterations",
        "type": "number",
        "required": false,
        "default": "32",
        "description": "Relaxation passes that straighten the flows and reduce crossings"
      },
      {
        "name": "linkColor",
        "type": "\"gradient\" | \"source\" | \"target\" | \"neutral\"",
        "required": false,
        "default": "\"gradient\"",
        "description": "Color of the links without `color`: a gradient from the source to the target color, one of the two, or a neutral gray"
      },
      {
        "name": "linkOpacity",
        "type": "number",
        "required": false,
        "default": "0.4",
        "description": "Opacity of the links, 0-1 (hovered flows are more opaque)"
      },
      {
        "name": "labels",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Node labels (name and value); overlapping labels are skipped"
      },
      {
        "name": "labelValues",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the value after the name in the labels"
      }
    ]
  },
  "SankeyNode": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "A node of a sankey diagram",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name shown in the label and the tooltip; links refer to the node by this name (or by index)"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color of the node (and of the ends of its links); the palette when omitted"
      },
      {
        "name": "column",
        "type": "number",
        "required": false,
        "description": "Column of the node, 0 = leftmost; computed from the links when omitted"
      }
    ]
  },
  "SankeyLink": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "A flow between two nodes of a sankey diagram",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "source",
        "type": "string | number",
        "required": true,
        "description": "Source node: its `name`, or its index in `nodes`"
      },
      {
        "name": "target",
        "type": "string | number",
        "required": true,
        "description": "Target node: its `name`, or its index in `nodes`"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Size of the flow (negative values count as 0)"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color of the flow; follows `linkColor` when omitted"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 予算配分

収益源が年間予算になり、部門とプログラムに配分されます。linkColor="target" で各フローを配分先の色で塗り、閲覧者のロケールの短縮通貨表記で金額を簡潔に表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/demos/budget.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Item =
  | "licenses"
  | "subscriptions"
  | "services"
  | "grants"
  | "budget"
  | "rnd"
  | "sales"
  | "operations"
  | "admin"
  | "platform"
  | "mobile"
  | "ai"
  | "campaigns"
  | "salesTeam"
  | "infrastructure"
  | "support"
  | "finance"
  | "offices";

// Yearly budget of a software company, in millions of dollars: where the
// money comes from, then how it is split between departments and programs
const ITEMS: { key: Item; color?: string }[] = [
  { key: "licenses" },
  { key: "subscriptions" },
  { key: "services" },
  { key: "grants" },
  { key: "budget", color: "#64748b" },
  { key: "rnd", color: "#6366f1" },
  { key: "sales", color: "#f59e0b" },
  { key: "operations", color: "#10b981" },
  { key: "admin", color: "#ec4899" },
  { key: "platform", color: "#818cf8" },
  { key: "mobile", color: "#818cf8" },
  { key: "ai", color: "#818cf8" },
  { key: "campaigns", color: "#fbbf24" },
  { key: "salesTeam", color: "#fbbf24" },
  { key: "infrastructure", color: "#34d399" },
  { key: "support", color: "#34d399" },
  { key: "finance", color: "#f472b6" },
  { key: "offices", color: "#f472b6" },
];

const ALLOCATIONS: [Item, Item, number][] = [
  ["licenses", "budget", 18.4],
  ["subscriptions", "budget", 42.6],
  ["services", "budget", 9.2],
  ["grants", "budget", 2.8],
  ["budget", "rnd", 29.5],
  ["budget", "sales", 21.3],
  ["budget", "operations", 13.7],
  ["budget", "admin", 8.5],
  ["rnd", "platform", 12.8],
  ["rnd", "mobile", 7.9],
  ["rnd", "ai", 8.8],
  ["sales", "campaigns", 9.6],
  ["sales", "salesTeam", 11.7],
  ["operations", "infrastructure", 8.1],
  ["operations", "support", 5.6],
  ["admin", "finance", 4.4],
  ["admin", "offices", 4.1],
];

const keys = ITEMS.map((item) => item.key);

export default function BudgetDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const locale = i18n.language;

  const nodes = useMemo(
    (): SankeyNode[] =>
      ITEMS.map(({ key, color }) => ({
        name: t(`budget.${key}`),
        ...(color ? { color } : {}),
      })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      ALLOCATIONS.map(([from, to, value]) => ({
        source: keys.indexOf(from),
        target: keys.indexOf(to),
        value,
      })),
    [],
  );
  // millions of dollars, in the reader's number format
  const format = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => money.format(value * 1e6);
  }, [locale]);

  return (
    <SankeyChart
      nodes={nodes}
      links={links}
      format={format}
      linkColor="target"
      linkOpacity={0.35}
      nodeWidth={10}
      height={440}
      ariaLabel={t("budgetAria")}
    />
  );
}

```

## Example: エネルギーフロー

国のエネルギー収支における一次エネルギー、エネルギーキャリア、最終用途。ノードごとに色があり、リンクは流出元の色から流入先の色へグラデーションします。format でラベルとツールチップに単位を付けます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/demos/energy.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Key =
  | "solar"
  | "wind"
  | "hydro"
  | "nuclear"
  | "gas"
  | "coal"
  | "oil"
  | "electricity"
  | "heat"
  | "fuels"
  | "homes"
  | "industry"
  | "services"
  | "transport"
  | "losses";

// A national energy balance, in TWh per year (rounded): primary sources,
// carriers, then end uses. Every carrier gives out what it receives.
const NODES: { key: Key; color: string }[] = [
  { key: "solar", color: "#f59e0b" },
  { key: "wind", color: "#38bdf8" },
  { key: "hydro", color: "#0284c7" },
  { key: "nuclear", color: "#a855f7" },
  { key: "gas", color: "#f97316" },
  { key: "coal", color: "#64748b" },
  { key: "oil", color: "#92400e" },
  { key: "electricity", color: "#eab308" },
  { key: "heat", color: "#ef4444" },
  { key: "fuels", color: "#b45309" },
  { key: "homes", color: "#10b981" },
  { key: "industry", color: "#6366f1" },
  { key: "services", color: "#14b8a6" },
  { key: "transport", color: "#ec4899" },
  { key: "losses", color: "#94a3b8" },
];

const FLOWS: [Key, Key, number][] = [
  ["solar", "electricity", 62],
  ["wind", "electricity", 138],
  ["hydro", "electricity", 54],
  ["nuclear", "electricity", 182],
  ["gas", "electricity", 96],
  ["coal", "electricity", 48],
  ["gas", "heat", 58],
  ["gas", "homes", 142],
  ["gas", "industry", 104],
  ["coal", "industry", 36],
  ["oil", "fuels", 420],
  ["electricity", "homes", 168],
  ["electricity", "industry", 152],
  ["electricity", "services", 124],
  ["electricity", "transport", 22],
  ["electricity", "losses", 114],
  ["heat", "homes", 36],
  ["heat", "services", 22],
  ["fuels", "transport", 348],
  ["fuels", "industry", 42],
  ["fuels", "losses", 30],
];

const index = (key: Key) => NODES.findIndex((n) => n.key === key);

export default function EnergyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const locale = i18n.language;

  // translated names; the links refer to the nodes by index
  const nodes = useMemo(
    (): SankeyNode[] =>
      NODES.map(({ key, color }) => ({ name: t(`energy.${key}`), color })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      FLOWS.map(([source, target, value]) => ({
        source: index(source),
        target: index(target),
        value,
      })),
    [],
  );
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    return (value: number) => t("twh", { value: number.format(value) });
  }, [locale, t]);

  return (
    <SankeyChart
      nodes={nodes}
      links={links}
      format={format}
      height={420}
      ariaLabel={t("energyAria")}
    />
  );
}

```

## Example: 採用ファネル

応募経路から採用までの候補者と、各段階での離脱です。リンクはノードを名前で参照するので、スイッチは離脱ノードとそのリンクを除くだけで済みます。align="left" により各離脱ノードは対応する段階のすぐ隣に置かれます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/demos/hiring-funnel.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { SankeyChart, type SankeyLink } from "minerva-design/charts";

type Stage =
  | "referrals"
  | "jobBoards"
  | "linkedin"
  | "agencies"
  | "campus"
  | "applied"
  | "cvRejected"
  | "screen"
  | "screenOut"
  | "interview"
  | "interviewOut"
  | "offer"
  | "declined"
  | "hired";

const DROP_OFFS = new Set<Stage>([
  "cvRejected",
  "screenOut",
  "interviewOut",
  "declined",
]);
const SOURCES: Stage[] = [
  "referrals",
  "jobBoards",
  "linkedin",
  "agencies",
  "campus",
];

// Candidates of one hiring year, from the source to the outcome
const MOVES: [Stage, Stage, number][] = [
  ["referrals", "applied", 210],
  ["jobBoards", "applied", 1480],
  ["linkedin", "applied", 860],
  ["agencies", "applied", 190],
  ["campus", "applied", 540],
  ["applied", "cvRejected", 2150],
  ["applied", "screen", 1130],
  ["screen", "screenOut", 690],
  ["screen", "interview", 440],
  ["interview", "interviewOut", 362],
  ["interview", "offer", 78],
  ["offer", "declined", 14],
  ["offer", "hired", 64],
];

const STAGE_COLOR: Partial<Record<Stage, string>> = {
  hired: "var(--success-color)",
  cvRejected: "var(--text-muted-color)",
  screenOut: "var(--text-muted-color)",
  interviewOut: "var(--text-muted-color)",
  declined: "var(--text-muted-color)",
};

const total = (from: Stage) =>
  MOVES.filter(([source]) => source === from).reduce(
    (sum, [, , value]) => sum + value,
    0,
  );

export default function HiringFunnelDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [dropOffs, setDropOffs] = useState(true);
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) => number.format(value),
    [number],
  );

  // nodes and links refer to each other by name, so hiding the drop-offs
  // only means leaving them out of both lists
  const visible = useMemo(
    () => MOVES.filter(([, to]) => dropOffs || !DROP_OFFS.has(to)),
    [dropOffs],
  );
  const nodes = useMemo(() => {
    const stages = [...new Set(visible.flatMap(([from, to]) => [from, to]))];
    return stages.map((stage) => ({
      name: t(`hiring.${stage}`),
      ...(STAGE_COLOR[stage] ? { color: STAGE_COLOR[stage] } : {}),
    }));
  }, [visible, t]);
  const links = useMemo(
    (): SankeyLink[] =>
      visible.map(([from, to, value]) => ({
        source: t(`hiring.${from}`),
        target: t(`hiring.${to}`),
        value,
      })),
    [visible, t],
  );

  const applied = SOURCES.reduce((sum, source) => sum + total(source), 0);
  const hired = MOVES.find(([, to]) => to === "hired")![2];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={dropOffs}
        onChange={setDropOffs}
        label={t("hiring.showDropOffs")}
      />
      <SankeyChart
        nodes={nodes}
        links={links}
        format={format}
        align="left"
        linkColor={dropOffs ? "target" : "source"}
        labelValues
        height={400}
        ariaLabel={t("hiring.aria")}
      />
      <output aria-live="polite">
        {t("hiring.summary", {
          applied: number.format(applied),
          hired: number.format(hired),
          rate: percent.format(hired / applied),
          interview: percent.format(total("interview") / total("screen")),
          accepted: percent.format(hired / total("offer")),
        })}
      </output>
    </div>
  );
}

```

## Example: 損益計算書

事業セグメントが売上高に集まり、コストと利益に分かれて当期純利益まで流れます。各リンクは自身の color で着色し（利益は緑、コストは赤）、セグメントは linkColor="source" のままです。コンパクトな通貨書式で金額を短く表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/demos/income-statement.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Line =
  | "cloud"
  | "licenses"
  | "hardware"
  | "services"
  | "revenue"
  | "cogs"
  | "gross"
  | "rnd"
  | "sales"
  | "admin"
  | "operating"
  | "tax"
  | "net";

const PROFIT = "var(--success-color)";
const COST = "var(--danger-color)";

// Quarterly income statement, in millions of dollars
const LINES: { key: Line; color?: string }[] = [
  { key: "cloud", color: "var(--chart-series-1)" },
  { key: "licenses", color: "var(--chart-series-2)" },
  { key: "hardware", color: "var(--chart-series-3)" },
  { key: "services", color: "var(--chart-series-4)" },
  { key: "revenue", color: "var(--text-secondary-color)" },
  { key: "cogs", color: COST },
  { key: "gross", color: PROFIT },
  { key: "rnd", color: COST },
  { key: "sales", color: COST },
  { key: "admin", color: COST },
  { key: "operating", color: PROFIT },
  { key: "tax", color: COST },
  { key: "net", color: PROFIT },
];

const SEGMENTS: [Line, number][] = [
  ["cloud", 412],
  ["licenses", 186],
  ["hardware", 94],
  ["services", 58],
];
const COGS = 268;
const OPEX: [Line, number][] = [
  ["rnd", 141],
  ["sales", 98],
  ["admin", 47],
];
const TAX_RATE = 0.21;

const keys = LINES.map((line) => line.key);

function statement() {
  const revenue = SEGMENTS.reduce((sum, [, value]) => sum + value, 0);
  const gross = revenue - COGS;
  const operating = gross - OPEX.reduce((sum, [, value]) => sum + value, 0);
  const tax = Math.round(operating * TAX_RATE);
  const flows: [Line, Line, number, "profit" | "cost" | "in"][] = [
    ...SEGMENTS.map(
      ([key, value]) =>
        [key, "revenue", value, "in"] as [Line, Line, number, "in"],
    ),
    ["revenue", "cogs", COGS, "cost"],
    ["revenue", "gross", gross, "profit"],
    ...OPEX.map(
      ([key, value]) =>
        ["gross", key, value, "cost"] as [Line, Line, number, "cost"],
    ),
    ["gross", "operating", operating, "profit"],
    ["operating", "tax", tax, "cost"],
    ["operating", "net", operating - tax, "profit"],
  ];
  return { revenue, gross, operating, net: operating - tax, flows };
}
const STATEMENT = statement();

export default function IncomeStatementDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const locale = i18n.language;
  const { revenue, gross, operating, net, flows } = STATEMENT;

  const nodes = useMemo(
    (): SankeyNode[] =>
      LINES.map(({ key, color }) => ({ name: t(`pnl.${key}`), color })),
    [t],
  );
  // profits are green and costs red; revenue streams keep their own color
  const links = useMemo(
    (): SankeyLink[] =>
      flows.map(([from, to, value, kind]) => ({
        source: keys.indexOf(from),
        target: keys.indexOf(to),
        value,
        ...(kind === "profit" ? { color: PROFIT } : {}),
        ...(kind === "cost" ? { color: COST } : {}),
      })),
    [flows],
  );
  const money = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const format = useMemo(
    () => (value: number) => money.format(value * 1e6),
    [money],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <SankeyChart
        nodes={nodes}
        links={links}
        format={format}
        linkColor="source"
        linkOpacity={0.4}
        nodeWidth={14}
        height={420}
        ariaLabel={t("pnl.aria")}
      />
      <p
        style={{
          margin: 0,
          color: "var(--text-secondary-color)",
          fontSize: 14,
        }}
      >
        {t("pnl.margins", {
          gross: percent.format(gross / revenue),
          operating: percent.format(operating / revenue),
          net: percent.format(net / revenue),
        })}
      </p>
    </div>
  );
}

```

## Example: ユーザージャーニー

1 週間のセッションがどこから来て、どこで終わるか。align="left" で離脱したユーザーを離脱元のページの隣に置き、linkColor="source" で経路を流入チャネルの色で塗り、onClick でクリックしたノードやリンク（流出元と流入先を含む）を受け取ります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/demos/journey.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
  type ShapeHoverEvent,
} from "minerva-design/charts";

type Step =
  | "searchAds"
  | "organic"
  | "newsletter"
  | "social"
  | "home"
  | "pricing"
  | "blog"
  | "signup"
  | "left"
  | "trial"
  | "abandoned"
  | "paid"
  | "expired";

const STEPS: Step[] = [
  "searchAds",
  "organic",
  "newsletter",
  "social",
  "home",
  "pricing",
  "blog",
  "signup",
  "left",
  "trial",
  "abandoned",
  "paid",
  "expired",
];

// Sessions of one week, from the acquisition channel to the subscription
const PATHS: [Step, Step, number][] = [
  ["searchAds", "home", 4200],
  ["searchAds", "pricing", 2600],
  ["organic", "home", 3800],
  ["organic", "blog", 5200],
  ["newsletter", "blog", 1900],
  ["newsletter", "pricing", 900],
  ["social", "blog", 2400],
  ["social", "home", 1100],
  ["home", "signup", 3100],
  ["home", "left", 6000],
  ["pricing", "signup", 2100],
  ["pricing", "left", 1400],
  ["blog", "signup", 1300],
  ["blog", "left", 8200],
  ["signup", "trial", 4700],
  ["signup", "abandoned", 1800],
  ["trial", "paid", 1300],
  ["trial", "expired", 3400],
];

export default function JourneyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) => number.format(value),
    [number],
  );

  const nodes = useMemo(
    (): SankeyNode[] => STEPS.map((step) => ({ name: t(`journey.${step}`) })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      PATHS.map(([from, to, value]) => ({
        source: STEPS.indexOf(from),
        target: STEPS.indexOf(to),
        value,
      })),
    [],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <SankeyChart
        nodes={nodes}
        links={links}
        align="left"
        linkColor="source"
        format={format}
        onClick={setSelected}
        height={400}
        ariaLabel={t("journeyAria")}
      />
      <p role="status" style={{ margin: 0 }}>
        {selected
          ? selected.source && selected.target
            ? t("journeyLink", {
                source: selected.source,
                target: selected.target,
                value: number.format(selected.value),
                share: (selected.percent * 100).toFixed(1),
              })
            : t("journeyNode", {
                name: selected.name,
                value: number.format(selected.value),
              })
          : t("journeyHint")}
      </p>
    </div>
  );
}

```

## Example: リアルタイム API トラフィック

クライアントからサービス、そしてステータスコードまでの秒間リクエスト数を 1.5 秒ごとに更新します。流量は上流から下流へ計算されるため各ノードの流入と流出が一致し、iterations={0} で更新の間もノードの位置が変わりません。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/demos/live-traffic.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Client = "web" | "ios" | "android" | "partners";
type Service = "auth" | "catalog" | "search" | "checkout";
type Status = "ok" | "clientError" | "serverError";

const CLIENTS: [Client, number][] = [
  ["web", 620],
  ["ios", 380],
  ["android", 310],
  ["partners", 140],
];
const SERVICES: [Service, number][] = [
  ["auth", 0.18],
  ["catalog", 0.38],
  ["search", 0.29],
  ["checkout", 0.15],
];
const STATUSES: [Status, string][] = [
  ["ok", "var(--success-color)"],
  ["clientError", "var(--warning-color)"],
  ["serverError", "var(--danger-color)"],
];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let r = Math.imul(a ^ (a >>> 15), 1 | a);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// Requests per second at a given tick: a slow wave plus seeded noise, then
// split downstream so every node receives exactly what it sends
function traffic(tick: number) {
  const random = mulberry32(tick * 7919 + 17);
  const flows: [string, string, number][] = [];
  let total = 0;
  for (const [client, base] of CLIENTS) {
    const rps =
      base * (1 + 0.15 * Math.sin(tick / 6 + base) + 0.08 * (random() - 0.5));
    flows.push([`client.${client}`, "gateway", rps]);
    total += rps;
  }
  let serverErrors = 0;
  for (const [service, share] of SERVICES) {
    const rps = total * share * (1 + 0.1 * (random() - 0.5));
    flows.push(["gateway", `service.${service}`, rps]);
    // checkout has an incident every 20 ticks
    const incident = service === "checkout" && tick % 20 >= 14;
    const server = rps * (incident ? 0.12 : 0.004 + 0.006 * random());
    const client = rps * (0.02 + 0.03 * random());
    flows.push([`service.${service}`, "status.ok", rps - server - client]);
    flows.push([`service.${service}`, "status.clientError", client]);
    flows.push([`service.${service}`, "status.serverError", server]);
    serverErrors += server;
  }
  const routed = flows
    .filter(([from]) => from === "gateway")
    .reduce((sum, [, , value]) => sum + value, 0);
  return { flows, total: routed, serverErrors };
}

export default function LiveTrafficDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((n) => n + 1), 1500);
    return () => clearInterval(id);
  }, [running]);

  const { flows, total, serverErrors } = useMemo(() => traffic(tick), [tick]);
  const rps = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: 0,
    });
    return (value: number) => t("traffic.rps", { value: number.format(value) });
  }, [i18n.language, t]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 2,
      }),
    [i18n.language],
  );

  const nodes = useMemo(
    (): SankeyNode[] => [
      ...CLIENTS.map(([client]) => ({ name: t(`traffic.client.${client}`) })),
      { name: t("traffic.gateway"), color: "var(--text-secondary-color)" },
      ...SERVICES.map(([service]) => ({
        name: t(`traffic.service.${service}`),
      })),
      ...STATUSES.map(([status, color]) => ({
        name: t(`traffic.status.${status}`),
        color,
      })),
    ],
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      flows.map(([from, to, value]) => ({
        source: t(`traffic.${from}`),
        target: t(`traffic.${to}`),
        value,
      })),
    [flows, t],
  );
  const errorRate = serverErrors / total;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite">
          {t("traffic.summary", { total: rps(total) })}{" "}
          <span
            style={{
              color:
                errorRate > 0.01
                  ? "var(--danger-color)"
                  : "var(--success-color)",
            }}
          >
            {t(errorRate > 0.01 ? "traffic.incident" : "traffic.healthy", {
              rate: percent.format(errorRate),
            })}
          </span>
        </output>
        <Button
          variant="outline"
          size="small"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("traffic.pause") : t("traffic.resume")}
        </Button>
      </HStack>
      <SankeyChart
        nodes={nodes}
        links={links}
        format={rps}
        linkColor="target"
        linkOpacity={0.35}
        // no relaxation: the nodes keep their order between updates
        iterations={0}
        height={380}
        ariaLabel={t("traffic.aria")}
      />
    </div>
  );
}

```

## Example: 配置と配色

チャットボットはサポート階層を経ずにチケットを解決するため、その流れは 1 列を飛ばします。align は column を指定していないノードの列を、linkColor はリンクの塗り方を、labelValues はラベルに値を表示するかを決めます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/demos/options.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Radio, RadioGroup, Switch } from "minerva-design";
import {
  SankeyChart,
  type SankeyChartProps,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Align = NonNullable<SankeyChartProps["align"]>;
type LinkColor = NonNullable<SankeyChartProps["linkColor"]>;
type Stage =
  | "email"
  | "chat"
  | "phone"
  | "bot"
  | "tier1"
  | "tier2"
  | "engineering"
  | "solved"
  | "refunded"
  | "escalated";

const STAGES: Stage[] = [
  "email",
  "chat",
  "phone",
  "bot",
  "tier1",
  "tier2",
  "engineering",
  "solved",
  "refunded",
  "escalated",
];

// Support tickets of a month: the chatbot solves some directly, which skips
// a column; that is where `align` makes a difference
const ROUTES: [Stage, Stage, number][] = [
  ["email", "tier1", 820],
  ["chat", "bot", 1400],
  ["phone", "tier1", 520],
  ["bot", "solved", 760],
  ["bot", "tier1", 640],
  ["tier1", "solved", 1310],
  ["tier1", "refunded", 210],
  ["tier1", "tier2", 460],
  ["tier2", "solved", 280],
  ["tier2", "engineering", 180],
  ["engineering", "escalated", 180],
];

const ALIGNS: Align[] = ["justify", "left", "right", "center"];
const COLORS: LinkColor[] = ["gradient", "source", "target", "neutral"];

export default function OptionsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [align, setAlign] = useState<Align>("justify");
  const [linkColor, setLinkColor] = useState<LinkColor>("gradient");
  const [labelValues, setLabelValues] = useState(true);

  const nodes = useMemo(
    (): SankeyNode[] =>
      STAGES.map((stage) => ({ name: t(`support.${stage}`) })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      ROUTES.map(([from, to, value]) => ({
        source: STAGES.indexOf(from),
        target: STAGES.indexOf(to),
        value,
      })),
    [],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("alignLabel")}
        direction="horizontal"
        value={align}
        onChange={(value) => setAlign(value as Align)}
      >
        {ALIGNS.map((value) => (
          <Radio key={value} value={value} label={t(`align.${value}`)} />
        ))}
      </RadioGroup>
      <HStack gap={16} wrap align="center">
        <RadioGroup
          aria-label={t("linkColorLabel")}
          direction="horizontal"
          value={linkColor}
          onChange={(value) => setLinkColor(value as LinkColor)}
        >
          {COLORS.map((value) => (
            <Radio key={value} value={value} label={t(`linkColor.${value}`)} />
          ))}
        </RadioGroup>
        <Switch
          checked={labelValues}
          onChange={setLabelValues}
          label={t("labelValues")}
        />
      </HStack>
      <SankeyChart
        nodes={nodes}
        links={links}
        align={align}
        linkColor={linkColor}
        labelValues={labelValues}
        height={340}
        ariaLabel={t("supportAria")}
      />
    </div>
  );
}

```

## Example: プラスチック包装のマテリアルフロー

市場に出たポリマーと、包装材の行き先です。renderTooltip はリンクを送り元に対する割合（percent）として、ノードを包装材全体に対する割合として表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/demos/plastic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
  type ShapeHoverEvent,
} from "minerva-design/charts";

type Stage =
  | "pet"
  | "hdpe"
  | "pp"
  | "film"
  | "other"
  | "market"
  | "collected"
  | "incinerated"
  | "landfill"
  | "leaked"
  | "recycled"
  | "rejected"
  | "closedLoop"
  | "downcycled";

const STAGES: { key: Stage; color?: string }[] = [
  { key: "pet" },
  { key: "hdpe" },
  { key: "pp" },
  { key: "film" },
  { key: "other" },
  { key: "market", color: "var(--text-secondary-color)" },
  { key: "collected", color: "var(--chart-series-1)" },
  { key: "incinerated", color: "var(--warning-color)" },
  { key: "landfill", color: "var(--text-muted-color)" },
  { key: "leaked", color: "var(--danger-color)" },
  { key: "recycled", color: "var(--success-color)" },
  { key: "rejected", color: "var(--text-muted-color)" },
  { key: "closedLoop", color: "var(--success-color)" },
  { key: "downcycled", color: "var(--chart-series-3)" },
];

// Plastic packaging of a region over a year, in megatonnes
const FLOWS: [Stage, Stage, number][] = [
  ["pet", "market", 4.1],
  ["hdpe", "market", 2.6],
  ["pp", "market", 3.4],
  ["film", "market", 5.2],
  ["other", "market", 1.7],
  ["market", "collected", 6.8],
  ["market", "incinerated", 5.1],
  ["market", "landfill", 4.4],
  ["market", "leaked", 0.7],
  ["collected", "recycled", 4.6],
  ["collected", "rejected", 2.2],
  ["rejected", "incinerated", 2.2],
  ["recycled", "closedLoop", 1.3],
  ["recycled", "downcycled", 3.3],
];

const keys = STAGES.map((stage) => stage.key);

export default function PlasticDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const number = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) => t("plastic.mt", { value: number.format(value) }),
    [number, t],
  );

  const nodes = useMemo(
    (): SankeyNode[] =>
      STAGES.map(({ key, color }) => ({
        name: t(`plastic.${key}`),
        ...(color ? { color } : {}),
      })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      FLOWS.map(([from, to, value]) => ({
        source: keys.indexOf(from),
        target: keys.indexOf(to),
        value,
      })),
    [],
  );

  // links: percent is the share of the source node; nodes: of all the
  // packaging entering the diagram
  const tooltip = (event: ShapeHoverEvent) => (
    <div style={{ display: "grid", gap: 2, maxWidth: 240 }}>
      <strong>
        {event.source && event.target
          ? `${event.source} → ${event.target}`
          : event.name}
      </strong>
      <span>{format(event.value)}</span>
      <span style={{ color: "var(--text-secondary-color)" }}>
        {event.source
          ? t("plastic.shareOfSource", {
              share: percent.format(event.percent),
              source: event.source,
            })
          : t("plastic.shareOfTotal", { share: percent.format(event.percent) })}
      </span>
    </div>
  );

  return (
    <SankeyChart
      nodes={nodes}
      links={links}
      format={format}
      renderTooltip={tooltip}
      linkColor="target"
      nodePadding={16}
      height={420}
      ariaLabel={t("plastic.aria")}
    />
  );
}

```

## Example: サプライチェーンの追跡

産地から販売チャネルまでのコーヒーの流れです。ノードを onClick すると、そのノードを通るすべての経路が色付きのまま残り、それ以外のリンクは color でグレーになります。リンクをクリックするとそのリンクだけが選択され、送り元に対する割合が表示されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/demos/supply-chain.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
  type ShapeHoverEvent,
} from "minerva-design/charts";

type Site =
  | "brazil"
  | "colombia"
  | "ethiopia"
  | "vietnam"
  | "hamburg"
  | "rotterdam"
  | "north"
  | "central"
  | "south"
  | "cafes"
  | "supermarkets"
  | "online";

const SITES: Site[] = [
  "brazil",
  "colombia",
  "ethiopia",
  "vietnam",
  "hamburg",
  "rotterdam",
  "north",
  "central",
  "south",
  "cafes",
  "supermarkets",
  "online",
];

// Green coffee shipped in a month, in tonnes: origins, roasteries,
// warehouses and sales channels
const SHIPMENTS: [Site, Site, number][] = [
  ["brazil", "hamburg", 180],
  ["brazil", "rotterdam", 140],
  ["colombia", "hamburg", 95],
  ["colombia", "rotterdam", 70],
  ["ethiopia", "hamburg", 60],
  ["vietnam", "rotterdam", 125],
  ["hamburg", "north", 160],
  ["hamburg", "central", 120],
  ["hamburg", "south", 55],
  ["rotterdam", "central", 150],
  ["rotterdam", "south", 185],
  ["north", "cafes", 70],
  ["north", "supermarkets", 60],
  ["north", "online", 30],
  ["central", "cafes", 85],
  ["central", "supermarkets", 140],
  ["central", "online", 45],
  ["south", "cafes", 60],
  ["south", "supermarkets", 155],
  ["south", "online", 25],
];

// event.index of the selected mark: a node, or SITES.length + link index
type Selection = number;

// Links on every path through a node: walks upstream and downstream
function pathThrough(site: number) {
  const on = new Set<number>();
  const walk = (start: number, up: boolean) => {
    const queue = [start];
    while (queue.length) {
      const current = queue.shift()!;
      SHIPMENTS.forEach(([from, to], i) => {
        const near = SITES.indexOf(up ? to : from);
        if (near !== current || on.has(i)) return;
        on.add(i);
        queue.push(SITES.indexOf(up ? from : to));
      });
    }
  };
  walk(site, true);
  walk(site, false);
  return on;
}

export default function SupplyChainDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [selection, setSelection] = useState<Selection | null>(null);
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  // tonnes are not an Intl unit: the number is localized, the unit translated
  const format = useMemo(
    () => (value: number) =>
      t("supply.tonnes", { value: number.format(value) }),
    [t, number],
  );

  const highlighted = useMemo(() => {
    if (selection === null) return null;
    if (selection >= SITES.length) return new Set([selection - SITES.length]);
    return pathThrough(selection);
  }, [selection]);

  const nodes = useMemo(
    (): SankeyNode[] => SITES.map((site) => ({ name: t(`supply.${site}`) })),
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      SHIPMENTS.map(([from, to, value], i) => ({
        source: SITES.indexOf(from),
        target: SITES.indexOf(to),
        value,
        ...(highlighted && !highlighted.has(i)
          ? { color: "var(--border-color)" }
          : {}),
      })),
    [highlighted],
  );

  const onClick = (event: ShapeHoverEvent) =>
    setSelection((current) => (current === event.index ? null : event.index));

  let readout = t("supply.hint");
  if (selection !== null && selection < SITES.length) {
    const site = SITES[selection]!;
    const inbound = SHIPMENTS.filter(([, to]) => to === site);
    const outbound = SHIPMENTS.filter(([from]) => from === site);
    const sum = (list: typeof SHIPMENTS) =>
      list.reduce((total, [, , value]) => total + value, 0);
    readout = t("supply.node", {
      name: t(`supply.${site}`),
      inbound: format(sum(inbound)),
      from: number.format(inbound.length),
      outbound: format(sum(outbound)),
      to: number.format(outbound.length),
    });
  } else if (selection !== null) {
    const [from, to, value] = SHIPMENTS[selection - SITES.length]!;
    const sent = SHIPMENTS.filter(([source]) => source === from).reduce(
      (total, [, , v]) => total + v,
      0,
    );
    readout = t("supply.link", {
      source: t(`supply.${from}`),
      target: t(`supply.${to}`),
      value: format(value),
      share: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 0,
      }).format(value / sent),
    });
  }

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <SankeyChart
        nodes={nodes}
        links={links}
        format={format}
        linkColor="source"
        onClick={onClick}
        height={420}
        ariaLabel={t("supply.aria")}
      />
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite">{readout}</output>
        <Button
          variant="outline"
          size="small"
          disabled={selection === null}
          onClick={() => setSelection(null)}
        >
          {t("supply.clear")}
        </Button>
      </HStack>
    </div>
  );
}

```
