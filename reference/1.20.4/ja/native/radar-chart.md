# レーダーチャート

尺度の異なる複数の指標で、1 つまたは少数の対象を比較します（スキル評価、製品レビュー、風味のプロファイルなど）。多角形にホバーすると、その多角形と最も近い指標がハイライトされます。矢印キーで系列と指標の間を移動し、Esc で解除します。凡例の項目をクリックすると系列を非表示にできます。

Package: minerva-design@1.20.4

Renderer: native

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

問題解決

コーディング

システム設計

コミュニケーション

協調性

当事者意識

候補者

{{value}} / {{max}}

候補者の面接評価シート

香り

酸味

甘み

コク

苦味

余韻

エチオピア イルガチェフェ

スマトラ マンデリン

2 種類のコーヒーの風味

性能

バッテリー

カメラ

ディスプレイ

コストパフォーマンス

質感

3 機種のスマートフォンのレビュースコア

多角形にホバーするか矢印キーで機種を比較します

スピード

シュート

パス

ドリブル

守備

フィジカル

2 人のサッカー選手の能力値

セキュリティ

連携

レポート

モバイル

自動化

サポート

価格

自社製品

主要競合

市場平均

比較する製品

自社製品、競合、市場平均の機能評価

たんぱく質

食物繊維

糖質

脂質

ナトリウム

カルシウム

フルーツ入りオートミール

卵のトースト

グラノーラ入りヨーグルト

基準量の {{value}}

{{meal}}：{{amount}}（{{share}}）

3 種類の朝食の栄養成分（1 日の基準量に対する割合）

CPU

メモリ

ディスク I/O

ネットワーク

レイテンシ

エラー

直近 1 時間の平均

現在

ライブ更新

アラート：{{metric}} が容量の {{threshold}} を超えています。

最も負荷の高い指標：{{metric}}。

サービスの現在の負荷と直近 1 時間の平均

コミュニケーション

成果の提供

専門性

協働

育成

主体性

チーム平均

対象者

{{name}} の 360 度評価とチーム平均

強み：{{strength}}（チーム比 {{strengthGap}}）。伸ばす点：{{growth}}（{{growthGap}}）。

売上

受注件数

成約率

平均案件規模

通話数

NPS

目標

実績

{{kpi}}：{{actual}}（目標 {{target}}、達成率 {{attainment}}）。

営業担当者の四半期 KPI と目標

軸の近くをクリックすると KPI を表示します。

## RadarChart

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "RadarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "indicators",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly RadarIndicator[]",
    "typeRef": "type:34b3e299c8b6bc4719af",
    "required": true,
    "description": "Axes of the chart, clockwise from 12 o'clock"
  },
  {
    "name": "series",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly RadarSeries[]",
    "typeRef": "type:a583c277e67444a20bfd",
    "required": true,
    "description": "Polygons: one value per indicator"
  },
  {
    "name": "shape",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "enum",
    "values": [
      "circle",
      "polygon"
    ],
    "typeText": "\"circle\" | \"polygon\" | undefined",
    "typeRef": "type:527066bd3cb0cb309fbf",
    "default": "polygon",
    "required": false,
    "description": "Grid shape"
  },
  {
    "name": "levels",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 4,
    "required": false,
    "description": "Number of grid rings"
  },
  {
    "name": "dots",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Dots on the vertices"
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
  "native:RadarChartProps": {
    "source": "native/src/components/ShapeChart/types.ts",
    "description": "Props of RadarChart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "indicators",
        "type": "readonly RadarIndicator[]",
        "required": true,
        "description": "Axes of the chart, clockwise from 12 o'clock"
      },
      {
        "name": "series",
        "type": "readonly RadarSeries[]",
        "required": true,
        "description": "Polygons: one value per indicator"
      },
      {
        "name": "shape",
        "type": "\"polygon\" | \"circle\"",
        "required": false,
        "default": "\"polygon\"",
        "description": "Grid shape"
      },
      {
        "name": "levels",
        "type": "number",
        "required": false,
        "default": "4",
        "description": "Number of grid rings"
      },
      {
        "name": "dots",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Dots on the vertices"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本

6 つの指標（max: 10）に対する 1 系列。ツールチップはすべての値を一覧し、ポインター下の指標を太字にします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/native/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RadarChart } from "minerva-design/native";

// Interview scorecard of one candidate, each skill rated out of 10
const skills = [
  "problemSolving",
  "coding",
  "systemDesign",
  "communication",
  "collaboration",
  "ownership",
] as const;
const scores = [8.5, 9, 6.5, 7, 8, 9];

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.native.data",
  });
  const number = new Intl.NumberFormat(i18n.language);
  const indicators = useMemo(
    () => skills.map((key) => ({ name: t(`skills.${key}`), max: 10 })),
    [t],
  );
  const series = useMemo(() => [{ name: t("candidate"), values: scores }], [t]);
  return (
    <RadarChart
      indicators={indicators}
      series={series}
      height={300}
      format={(value) => t("outOf10", { value: number.format(value) })}
      ariaLabel={t("scorecardAria")}
    />
  );
}

```

## Example: 製品の比較

3 系列あると凡例が自動で表示されます。onHover はポインターに最も近い系列と指標を受け取ります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/native/compare.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { RadarChart, useTheme } from "minerva-design/native";

// Two phones rated out of 5 by a review site
const criteria = [
  "battery",
  "camera",
  "display",
  "performance",
  "price",
] as const;
const phones = [
  { name: "Nova X", values: [4.5, 3.5, 4, 3, 4.5] },
  { name: "Pixelon 9", values: [3.5, 5, 4.5, 4.5, 2.5] },
];

export default function Compare() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.native.data",
  });
  const { colors } = useTheme();
  const [hidden, setHidden] = useState<number[]>([]);
  const indicators = useMemo(
    () => criteria.map((key) => ({ name: t(`criteria.${key}`), max: 5 })),
    [t],
  );
  const visible = phones.filter((_, i) => !hidden.includes(i));
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <RadarChart
        indicators={indicators}
        series={phones}
        shape="circle"
        levels={5}
        height={320}
        hidden={hidden}
        onToggle={(event) => setHidden(event.hiddenIndexes)}
        ariaLabel={t("phonesAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {t("comparing", {
          phones: visible.map((phone) => phone.name).join(" · ") || "—",
        })}
      </Text>
    </View>
  );
}

```
