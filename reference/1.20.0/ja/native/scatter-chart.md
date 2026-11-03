# 散布図

2 つの値で配置する点。ポイントごとにサイズ、色、ラベルを指定でき、両軸でズームできます。

Package: minerva-design@1.20.0

Renderer: native

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

スターター

ビジネス

シート数

月額料金

プラン別のシート数と月額料金

国

1 人あたり GDP

平均寿命

1 人あたり GDP と平均寿命。点の大きさは人口

クラスター {{name}}

それぞれ 100,000 点からなる 2 つのクラスター

{{points}} ポイント · {{renderer}} で描画

セッション時間と閲覧ページ数

分

ページ

無料

プロ

{{plan}}：{{minutes}} 分、{{pages}} ページ

点をタップしてください

キャンペーン

傾向線

週間広告費

週間売上

R² = {{r2}} · 広告費 1 ドルあたり売上 +{{slope}}

60 件のキャンペーンの広告費と売上、傾向線付き

アデリーペンギン

ヒゲペンギン

ジェンツーペンギン

フリッパー長

体重

3 種のペンギンのフリッパー長と体重

リクエスト

外れ値

想定

ペイロードサイズ

応答時間

ペイロードサイズと応答時間。外れ値は赤

{{total}} 件中 {{slow}} 件のリクエストが想定の 2 倍以上かかりました。

測定値

涼しい夜間

生育適温域

暑い午後

すべて表示

温度

相対湿度

生育適温域

温室センサーの温度と湿度の測定値

表示範囲：{{t0}} – {{t1}}、湿度 {{h0}} – {{h1}} · 表示中の測定値：{{points}}

領域を選ぶか、Ctrl / ⌘ + ホイールでズームしてください

エンジニアリング

営業

サポート

勤続年数

評価スコア（1–5）

全社平均

部署別の社員 90 名の勤続年数と評価スコア

{{id}} · {{department}} · {{tenure}} · スコア {{score}} · 年収 {{salary}}

点をクリックすると社員を選択し、空いたプロット領域をクリックすると選択を解除します

選手

リーグ平均

効率の良いスコアラー

試投数の多いシューター

1 試合平均 {{value}} 得点

使用率：{{value}}

TS%：{{value}}

使用率

TS%（真のシュート成功率）

選手 16 人の使用率とシュート効率。点の大きさは 1 試合平均得点

正常

アラーム

最新

{{value}} mm/s

一時停止

再開

最新サンプル：{{rpm}} rpm、{{value}} · 画面上のアラーム：{{alarms}}

回転数（rpm）

振動

アラーム閾値

モーターの回転数に対する振動のライブデータ

哺乳類

トガリネズミ

マウス

ラット

ウサギ

ネコ

イヌ

ヒト

ブタ

ウマ

ウシ

キリン

ゾウ

べき乗則の近似

{{value}} kg

{{value}} W

体重

基礎代謝率

代謝率 ∝ 体重^{{exponent}}（クライバーの法則）

哺乳類 12 種の基礎代謝率と体重（両対数軸）

## ScatterChart

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "ScatterChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly ChartSeries[]",
    "typeRef": "type:deda0bcb88251b63a5de",
    "required": true,
    "description": "Series drawn as dots unless they set a `type`"
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
    "name": "tooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip shown on tap / while scrubbing; `false` disables it"
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
    "name": "labels",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
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
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/Chart/types.ts",
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
  "native:ScatterChartProps": {
    "source": "native/src/components/Chart/types.ts",
    "description": "Props of ScatterChart",
    "kind": "interface",
    "extends": [
      "ChartCommonProps"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly ChartSeries[]",
        "required": true,
        "description": "Series drawn as dots unless they set a `type`"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本

軸タイトル付きの [x, y] タプルの 2 系列。ツールチップは最も近い点を表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-chart/native/basic.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { ScatterChart, useTheme } from "minerva-design/native";

// Deterministic pseudo-random clusters
const cluster = (cx: number, cy: number, seed: number) =>
  Array.from({ length: 40 }, (_, i) => {
    const a = Math.sin(seed * 97 + i * 12.9898) * 43758.5453;
    const b = Math.sin(seed * 31 + i * 78.233) * 12543.123;
    return [
      Math.round((cx + (a - Math.floor(a) - 0.5) * 20) * 10) / 10,
      Math.round((cy + (b - Math.floor(b) - 0.5) * 20) * 10) / 10,
    ] as const;
  });

export default function Basic() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const { colors } = useTheme();
  const [status, setStatus] = useState<string | null>(null);
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <ScatterChart
        height={240}
        ariaLabel={t("sessionAria")}
        xAxis={{ title: t("minutes") }}
        yAxis={{ title: t("pages") }}
        series={[
          { name: t("free"), data: cluster(20, 25, 1) },
          { name: t("pro"), data: cluster(45, 50, 2) },
        ]}
        onPointClick={(event) => {
          const item = event.items[0];
          if (item)
            setStatus(
              t("sessionStatus", {
                plan: item.seriesName,
                minutes: event.xLabel,
                pages: item.y,
              }),
            );
        }}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status ?? t("tapDot")}
      </Text>
    </View>
  );
}

```
