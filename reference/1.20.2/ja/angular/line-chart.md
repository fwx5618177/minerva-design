# 折れ線グラフ

数値、日付、カテゴリに対する折れ線または塗りつぶした面。GPU で数百万ポイントを扱えます。

Package: minerva-design@1.20.2

Renderer: angular

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

今週

先週

今週と先週の日別訪問者数

使用容量

日

60 日間のストレージ使用量

リスボン

オスロ

曲線

直線

なめらか

ステップ

リスボンとオスロの月平均気温

コンピューティング

ストレージ

ネットワーク

データベース

積み上げ方法

積み上げ

サービス別の月間クラウド費用（積み上げ）

ページビュー

セッション

2026 年上半期の日別ページビューとセッション

センサー

100 万件のセンサー測定値

{{points}} ポイント · {{renderer}} で描画 · Ctrl / ⌘ + ホイールでズーム、ドラッグでパン、ダブルクリックでリセット

訪問者

製品リリース

障害

製品リリースと障害を含む 90 日間の日別訪問者数

室内

屋外

欠損を含む 1 時間ごとの室内と屋外の気温

センサーが数時間オフラインでした。推測で埋めずに線を途切れさせています。

中央値

95 パーセンタイル

危険

目標 {{value}}

6 時間の API レイテンシ（中央値と 95 パーセンタイル）

終値

期間

1か月

3か月

6か月

1年

すべて

2 年間の日次終値

歩数

1 日の歩数

{{day}}：{{steps}} 歩

線をタップまたはなぞってください

CPU

メモリ

{{hour}}時

1 日の CPU とメモリの使用率

ピンチでズーム、ダブルタップでリセット。凡例をタップすると系列を非表示にできます。

冷凍庫の温度

{{value}} 超で警報

一時停止

再開

警報：扉が開いている？

正常

最新の値 {{value}}（{{time}}）

直近 1 分間の上限超過：{{readings}} 件

直近 1 分間の冷凍庫の温度（毎秒更新）

野生型

変異株

抗生物質あり

対数増殖期

対数スケール

接種後の経過時間

CFU / mL

3 種類の細菌培養の 24 時間の増殖曲線

直線部分は増殖率が一定であることを示します。野生型は約 {{minutes}} ごとに倍増します。

線形スケールでは菌数の少ない培養が平らに見えます。対数スケールに戻すと比較できます。

ポートフォリオ評価額

点をクリックして計測を開始し、続けて 2 点目をクリックします。

始点 {{date}}（{{value}}）：2 点目をクリックしてください。

{{from}} → {{to}}：{{change}}（{{percent}}）、期間 {{days}}

クリア

2026 年のポートフォリオの日次評価額。2 点をクリックすると変化を計測します

株式

債券

金

不動産

基準 = 100

100 を基準に指数化した 4 つの資産クラスのパフォーマンス（2021〜2026 年）

{{value}} µg/m³

デリー

北京

パリ

メキシコシティ

東京

サンパウロ

11 月の微小粒子状物質（PM2.5）の日平均値。破線は WHO の指針値 {{value}} です。

超過 {{days}}/{{total}} 日

{{city}} の 30 日間の日次 PM2.5

## LineChart

Support: beta

Native Angular: MnLineChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnLineChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "area",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "curve",
    "typeText": "ChartCurve | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "stacked",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "percent",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  }
]
```

### events

```json
[
  {
    "name": "pointClick",
    "typeText": "ChartHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "ChartPlotClickEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "ChartHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "zoom",
    "typeText": "ChartView",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
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

## Example: Weekly trend

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnLineChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnLineChart],
  template: `
@let t = labels[language()];
<mn-line-chart
  [series]="[
    { name: t.thisWeek, data: thisWeek },
    { name: t.lastWeek, data: lastWeek }
  ]"
  curve="smooth"
  [xAxis]="{ type: 'category', categories: t.days }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  thisWeek = [820, 932, 901, 934, 1290, 1330, 1320];
  lastWeek = [620, 732, 701, 834, 1090, 1130, 1020];
  labels = {
  "en": {
    "thisWeek": "This week",
    "lastWeek": "Last week",
    "days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  "zh": {
    "thisWeek": "本周",
    "lastWeek": "上周",
    "days": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
  },
  "ja": {
    "thisWeek": "今週",
    "lastWeek": "先週",
    "days": ["月", "火", "水", "木", "金", "土", "日"]
  },
  "fr": {
    "thisWeek": "Cette semaine",
    "lastWeek": "Semaine dernière",
    "days": ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."]
  }
};
}

```

## Example: Zoom and reset

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnLineChart, MnButton, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnLineChart, MnButton],
  template: `
@let t = labels[language()];
<mn-line-chart
  #chart
  [series]="[{ name: t.sensor, data: sensor }]"
  crosshair
  [interaction]="{ zoom: 'x' }"
  [height]="260"
/>
<button mnButton variant="outline" size="small" (click)="chart.resetZoom()">{{ t.reset }}</button>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  sensor = [50, 58, 64, 69, 71, 70, 68, 66, 64, 64, 66, 70, 75, 81, 86, 89, 90, 88, 83, 78, 72, 67, 64, 64, 65, 67, 70, 71, 70, 67, 61, 53, 45, 38, 33, 30, 29, 31, 33, 35, 36, 35, 32, 27, 21, 16, 12, 10, 11, 15, 20, 26, 31, 35, 36, 36, 34, 31, 29, 29, 32, 37, 43, 51, 59, 65, 69, 71, 70, 68, 65, 64, 64, 66, 71, 76, 82, 87, 90, 90, 87, 82, 77, 71, 66, 64, 64, 65, 68, 70, 71, 70, 66, 60, 52, 44, 37, 32, 29, 29, 31, 34, 36, 36, 35, 31, 26, 20, 15, 11, 10, 11, 15, 21, 27, 32, 35, 36, 36, 33];
  labels = {
  "en": {
    "sensor": "Sensor",
    "reset": "Reset zoom"
  },
  "zh": {
    "sensor": "传感器",
    "reset": "重置缩放"
  },
  "ja": {
    "sensor": "センサー",
    "reset": "ズームをリセット"
  },
  "fr": {
    "sensor": "Capteur",
    "reset": "Réinitialiser le zoom"
  }
};
}

```
