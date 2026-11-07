# 横棒グラフ

カテゴリを左側に並べ、左から伸びる横棒：ランキング、長い名前、発散型アンケート、進捗に最適です。

Package: minerva-design@1.22.1

Renderer: native

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

開発者

各プログラミング言語を使う開発者の割合

ここでのキャリアパスが見える

仕事量は適切だ

必要なツールがそろっている

上司が支えてくれる

給与は公正だ

強く反対

反対

賛成

強く賛成

従業員アンケートの回答（左が反対、右が賛成）

完了

レビュー中

未着手

プラットフォーム

決済

モバイル

グロース

デザイン

各チームのマイルストーン課題の状態

票数

すべてのページとメールでダークモード

モバイル端末でのオフラインモード

グラフ付きレポートの PDF 出力

SAML と OIDC によるシングルサインオン

カレンダーの双方向同期

複数レコードの一括編集

すべてのオブジェクトにカスタム項目

要望の多い機能の票数

予算

実績

開発

マーケティング

営業

サポート

経理

部門ごとの予算と実績

増減

北米

ヨーロッパ

アジア太平洋

中南米

中東

アフリカ

地域ごとの月間アクティブユーザーの増減

ユーザー

メッセージ

写真

マップ

ミュージック

メモ

アプリごとの月間アクティブユーザー

{{app}}：{{users}} 百万ユーザー

棒をタップしてください

売上

販売数

ワイヤレスヘッドホン

スマートウォッチ

Bluetooth スピーカー

メカニカルキーボード

急速充電器

HD ウェブカメラ

ワイヤレスマウス

タブレット

USB-C ケーブル

ノートパソコンスタンド

ランキング基準

表示件数

上位 {{n}} 件

すべての商品

先月の売れ筋商品（多い順）

この {{n}} 商品で全体の {{share}} を占めます。

{{value}} GW

太陽光発電容量

再生

一時停止

もう一度再生

最初に戻る

{{year}} 年末時点で太陽光発電の設備容量が多い国

給与レンジ

ジュニア

ミドル

シニア

スタッフ

プリンシパル

ディレクター

オファー

最低額

中央値

最高額

オファー / 中央値

オファー −{{step}}

オファー +{{step}}

{{offer}} のオファーは {{levels}} のレンジに収まります。

{{offer}} のオファーはどのレンジにも収まりません。

各職位の年間給与レンジ。オファー額を縦線で表示

残りエラーバジェット

リリース凍結

過去 30 日間の各サービスの残りエラーバジェット（悪い順）

SLO {{slo}}、実測の可用性 {{availability}}

許容される {{allowed}} のうち、残りのダウンタイムは {{minutes}} です。

バジェットを {{minutes}} 超過しています。

サービスをクリックするとバジェットを表示します。

## HorizontalBarChart

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "HorizontalBarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "labels",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Writes the value at the end of every bar"
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Test identifier of the root view"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip shown on tap / while scrubbing; `false` disables it"
  },
  {
    "name": "series",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly ChartSeries[]",
    "typeRef": "type:deda0bcb88251b63a5de",
    "required": true,
    "description": "Series drawn as bars unless they set a `type` (e.g. a `line` overlay)"
  },
  {
    "name": "stacked",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Stacks the bars of every series (otherwise they are grouped side by side)"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "xAxis",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "X axis"
  },
  {
    "name": "yAxis",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Y axis"
  },
  {
    "name": "legend",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name (tap toggles a series)"
  },
  {
    "name": "crosshair",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the finger"
  },
  {
    "name": "annotations",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas, reference lines and texts"
  },
  {
    "name": "interaction",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Pinch to zoom, drag to pan when zoomed, double tap to reset; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  },
  {
    "name": "renderTooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "node",
    "typeText": "((event: ChartHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:66d650d38e6b7d308d32",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
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
    "name": "onHover",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:170f27b8f07028fffd08",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent | null",
        "typeRef": "type:92ec77c4587c7e27430b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the highlighted points change"
  },
  {
    "name": "onPointClick",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent) => void) | undefined",
    "typeRef": "type:d586363317763d2fd3f3",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a point (or bar) is tapped"
  },
  {
    "name": "onPlotClick",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartPlotClickEvent) => void) | undefined",
    "typeRef": "type:3ab7d8ab926fce010082",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartPlotClickEvent",
        "typeRef": "type:db60e2cf00fabb558740"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the plot area is tapped where there is no point"
  },
  {
    "name": "onZoom",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:e6c98e88ed542ed60f34",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartView",
        "typeRef": "type:f1de933b453f8db86ff3"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the user zooms or pans"
  }
]
```

## API

```json
{
  "native:HorizontalBarChartProps": {
    "source": "native/src/components/Chart/types.ts",
    "description": "Props of HorizontalBarChart",
    "kind": "interface",
    "extends": [
      "Omit<BarChartProps, \"labels\">"
    ],
    "props": [
      {
        "name": "labels",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Writes the value at the end of every bar"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: ランキング

カテゴリはデータ順に上から下へ並ぶため、並べ替えたリストがそのままランキングになります。labels で各棒の先端に値を表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/horizontal-bar-chart/native/basic.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { HorizontalBarChart, useTheme } from "minerva-design/native";

// Monthly active users per app (millions)
const apps = [
  ["messages", 48],
  ["photos", 35],
  ["maps", 27],
  ["music", 19],
  ["notes", 12],
] as const;

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const { colors } = useTheme();
  const [status, setStatus] = useState<string | null>(null);
  const number = new Intl.NumberFormat(i18n.language);
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <HorizontalBarChart
        height={260}
        labels
        ariaLabel={t("appsAria")}
        series={[
          {
            name: t("activeUsers"),
            data: apps.map(
              ([key, value]) => [t(`apps.${key}`), value] as const,
            ),
          },
        ]}
        onPointClick={(event) => {
          const item = event.items[0];
          if (item)
            setStatus(
              t("usersStatus", {
                app: event.xLabel,
                users: number.format(item.y),
              }),
            );
        }}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status ?? t("tapBar")}
      </Text>
    </View>
  );
}

```
