# ウォーターフォールチャート

一連の増減が値を始点から終点へ運ぶ様子を、小計と合計とともに示します：損益ブリッジ、キャッシュフロー、差異分析。細い破線が各棒を次の棒につなぎます。

Package: minerva-design@1.20.2

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

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

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "name": "steps",
    "source": "packages/native/src/components/Charts/types.ts",
    "kind": "array",
    "typeText": "readonly WaterfallStep[]",
    "typeRef": "type:3873f9105900201e8357",
    "required": true,
    "description": "Changes, subtotals and totals, in order"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/Charts/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Writes the change (or the total) at the end of every bar"
  },
  {
    "name": "orientation",
    "source": "packages/native/src/components/Charts/types.ts",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "ChartOrientation | undefined",
    "typeRef": "type:872af3679a2d7fcf3d26",
    "default": "vertical",
    "required": false,
    "description": "`horizontal` lays the steps out in rows"
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
  "native:WaterfallChartProps": {
    "source": "native/src/components/Charts/types.ts",
    "description": "Props of WaterfallChart",
    "kind": "interface",
    "extends": [
      "Omit<ChartCommonProps, \"crosshair\" | \"labels\">",
      "Omit<WaterfallOptions, \"labels\">"
    ],
    "props": [
      {
        "name": "steps",
        "type": "readonly WaterfallStep[]",
        "required": true,
        "description": "Changes, subtotals and totals, in order"
      },
      {
        "name": "labels",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Writes the change (or the total) at the end of every bar"
      },
      {
        "name": "orientation",
        "type": "ChartOrientation",
        "required": false,
        "default": "\"vertical\"",
        "description": "`horizontal` lays the steps out in rows"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/native/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/native";

// Income statement of the year (M$), from the revenue to the net income
const lines = [
  ["revenue", "subtotal"],
  ["costOfSales", -191],
  ["grossProfit", "subtotal"],
  ["research", -74],
  ["marketing", -63],
  ["admin", -38],
  ["operatingIncome", "subtotal"],
  ["tax", -27],
  ["netIncome", "total"],
] as const;

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const steps = useMemo(
    (): WaterfallStep[] =>
      lines.map(([key, value]) =>
        typeof value === "number"
          ? { label: t(`pnl.${key}`), value }
          : { label: t(`pnl.${key}`), kind: value },
      ),
    [t],
  );
  return (
    <WaterfallChart
      height={300}
      locale={i18n.language}
      steps={steps}
      start={482}
      name={t("amount")}
      orientation="horizontal"
      ariaLabel={t("pnlAria")}
    />
  );
}

```
