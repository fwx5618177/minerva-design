# サンキー図

段階間の流れを示します：エネルギー収支、ユーザー動線、予算配分など。ノードは列に並び、リンクの太さは流量に比例します。ノードの並びは反復的な緩和で調整され、流れがまっすぐになり交差が減ります。ノードにホバーするとそのすべての流れが強調され、リンクにホバーすると流出元に対する割合を確認できます。矢印キーでノードとリンクを移動できます。

Package: minerva-design@1.20.4

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

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

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly SankeyNode[] | undefined",
    "typeRef": "type:abbae3a275f8cae80221",
    "required": false,
    "description": "Nodes, in their initial order; nodes only named by a link are appended"
  },
  {
    "name": "links",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly SankeyLink[]",
    "typeRef": "type:9b7445fd57ca5be620e0",
    "required": true,
    "description": "Flows between the nodes (by name or index); links closing a cycle are ignored"
  },
  {
    "name": "nodeWidth",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 12,
    "required": false,
    "description": "Width of the node bars, in pixels"
  },
  {
    "name": "nodePadding",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 12,
    "required": false,
    "description": "Vertical gap between the nodes of a column, in pixels (reduced when space is short)"
  },
  {
    "name": "align",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "enum",
    "values": [
      "center",
      "justify",
      "left",
      "right"
    ],
    "typeText": "\"right\" | \"left\" | \"center\" | \"justify\" | undefined",
    "typeRef": "type:2d132ecb25497b49ed29",
    "default": "justify",
    "required": false,
    "description": "Column of the nodes without a `column`: `justify` puts the sinks in the last column, `left` / `right` align on the sources / sinks, `center` puts the sources next to their first target"
  },
  {
    "name": "iterations",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 32,
    "required": false,
    "description": "Relaxation passes that straighten the flows and reduce crossings"
  },
  {
    "name": "linkColor",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "enum",
    "values": [
      "gradient",
      "neutral",
      "source",
      "target"
    ],
    "typeText": "\"neutral\" | \"target\" | \"gradient\" | \"source\" | undefined",
    "typeRef": "type:f280eddf1871945519d6",
    "default": "gradient",
    "required": false,
    "description": "Color of the links without `color`: a gradient from the source to the target color, one of the two, or a neutral gray"
  },
  {
    "name": "linkOpacity",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.4,
    "required": false,
    "description": "Opacity of the links, 0-1 (pressed flows are more opaque)"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Node labels (name and value); overlapping labels are skipped"
  },
  {
    "name": "labelValues",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the value after the name in the labels"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "legend",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "typeRef": "type:b3cd5c49d86fb91effb3",
    "required": false,
    "description": "Legend; tapping an item hides / shows its slice, stage, series, node, bar, row or level"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "typeRef": "type:9441d8fe0edba7239796",
    "default": true,
    "required": false,
    "description": "Tooltip shown while a mark is pressed; `false` disables it"
  },
  {
    "name": "format",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:541b024ed1104992e34e",
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
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((share: number) => string) | undefined",
    "typeRef": "type:d92c3cd66b7afc0213bc",
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
    "name": "hidden",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar levels, by index. Makes the visibility controlled: legend taps then only call `onToggle`, whose `hiddenIndexes` should be stored and passed back."
  },
  {
    "name": "animation",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Entry and update animations (skipped when the theme reduces motion)"
  },
  {
    "name": "padding",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the drawing, in pixels"
  },
  {
    "name": "ariaLabel",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "BCP 47 locale of the built-in texts (tooltip rows, accessible names, \"No data\") and of the numbers"
  },
  {
    "name": "texts",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "object",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "typeRef": "type:2ef787a978af6750b6c8",
    "required": false,
    "description": "Replaces built-in texts of the `locale`"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false,
    "description": "Height of the chart (the legend included)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "renderTooltip",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "node",
    "typeText": "((event: ShapeHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:9333c89b3161f5ff3652",
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
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Test identifier of the root view"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:fa632874a08b24956e5f",
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
    "description": "Called when the highlighted mark changes (press and drag over the chart)"
  },
  {
    "name": "onClick",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:8504b594a968c22eaac5",
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
    "description": "Called when a mark is tapped"
  },
  {
    "name": "onToggle",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:d096120cd0ab66afae24",
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
    "description": "Called when a legend item is tapped (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
  }
]
```

## API

```json
{
  "native:SankeyChartProps": {
    "source": "native/src/components/ShapeChart/types.ts",
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
        "description": "Opacity of the links, 0-1 (pressed flows are more opaque)"
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
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/native/basic.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  SankeyChart,
  useTheme,
  type SankeyLink,
  type ShapeHoverEvent,
} from "minerva-design/native";

// Yearly budget of a software company, in millions of dollars: revenue
// streams, then the departments it is split between
const ALLOCATIONS: [string, string, number][] = [
  ["licenses", "budget", 18.4],
  ["subscriptions", "budget", 42.6],
  ["services", "budget", 9.2],
  ["grants", "budget", 2.8],
  ["budget", "rnd", 29.5],
  ["budget", "sales", 21.3],
  ["budget", "operations", 13.7],
  ["budget", "admin", 8.5],
];

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart",
  });
  const { colors } = useTheme();
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const money = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      ALLOCATIONS.map(([source, target, value]) => ({
        source: t(`data.budget.${source}`),
        target: t(`data.budget.${target}`),
        value: value * 1e6,
      })),
    [t],
  );
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <SankeyChart
        links={links}
        nodeWidth={10}
        labelValues={false}
        format={(value) => money.format(value)}
        onClick={setSelected}
        height={320}
        ariaLabel={t("data.budgetAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {selected
          ? selected.source && selected.target
            ? `${selected.source} → ${selected.target}: ${money.format(selected.value)}`
            : `${selected.name}: ${money.format(selected.value)}`
          : t("native.data.tapHint")}
      </Text>
    </View>
  );
}

```
