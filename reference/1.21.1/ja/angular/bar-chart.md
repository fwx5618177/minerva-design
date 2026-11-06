# 棒グラフ

横に並べるか積み上げた棒グラフ。折れ線を重ねることもできます。

Package: minerva-design@1.21.1

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

第{{n}}四半期

完了したチケット

四半期ごとに完了したサポートチケット

注文

7 日平均

日

日別の注文数と 7 日平均

2025 年と 2026 年の四半期売上

推奨者

中立者

批判者

北米

ヨーロッパ

アジア太平洋

中南米

中東

地域別の推奨者・中立者・批判者の割合

Web

モバイルアプリ

パートナー

チャネル別の月間注文数（積み上げ）

販売数

四半期ごとの販売数

{{quarter}}：{{units}} 個

棒をタップしてください

積み上げ

グループ化

チャネル別・月別の注文数

ロンドン

東京

パリ

ロンドン、東京、パリの月平均降水量

純損益

月別の純損益。利益はゼロの上、損失は下

販売数

国別のオンライン販売数（多い順）

新規顧客

第{{n}}週

週間目標

週ごとの新規顧客数と週間目標の比較

{{total}} 週中 {{reached}} 週で目標を達成（{{rate}}）。

売上

{{month}}：{{value}}

四半期に戻る

四半期をクリックすると月別に表示します。

{{quarter}}：合計 {{value}}。月をクリックすると売上を表示します。

2026 年の四半期別売上。四半期をクリックすると月別に表示します

2026 年 {{quarter}} の月別売上

エンジニアリング

プロダクト

デザイン

営業

マーケティング

サポート

前年

今年

増減

前年と比較

部門別の採用数（今年と前年）

成功

ロールバック

変更凍結

8 週間の日別本番デプロイ数（成功とロールバック）

稼働日あたり {{perDay}} 回のデプロイ、変更失敗率 {{failure}}。

オフピーク

通常

ピーク

充電

日平均

充電時間

{{energy}} kWh・{{duration}}

{{start}}〜{{end}} に充電すると {{cost}}。{{plugIn}} の接続直後に充電するより {{saving}} 安くなります。

MWh あたりの価格

明日の各時間の前日市場電力価格。電気自動車の充電に最も安い時間帯を強調表示

## BarChart

Support: beta

Native Angular: MnBarChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBarChart"
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
    "name": "labels",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "orientation",
    "typeText": "ChartOrientation | undefined",
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

## Example: グループ化

stacked を付けない複数の系列は、各カテゴリで横に並びます。ここでは 3 都市の月間降水量で、単位は Intl.NumberFormat が表記します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBarChart],
  template: `
@let t = labels[language()];
<mn-bar-chart
  [series]="[
    { name: t.lastYear, data: lastYear },
    { name: t.thisYear, data: thisYear }
  ]"
  labels
  [xAxis]="{ type: 'category', categories: t.regions }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  lastYear = [38, 52, 61, 45];
  thisYear = [44, 58, 72, 49];
  labels = {
  "en": {
    "lastYear": "2024",
    "thisYear": "2025",
    "regions": ["North", "South", "East", "West"]
  },
  "zh": {
    "lastYear": "2024 年",
    "thisYear": "2025 年",
    "regions": ["华北", "华南", "华东", "西部"]
  },
  "ja": {
    "lastYear": "2024年",
    "thisYear": "2025年",
    "regions": ["北部", "南部", "東部", "西部"]
  },
  "fr": {
    "lastYear": "2024",
    "thisYear": "2025",
    "regions": ["Nord", "Sud", "Est", "Ouest"]
  }
};
}

```

## Example: 積み上げ

stacked で系列を積み重ねます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBarChart],
  template: `
@let t = labels[language()];
<mn-bar-chart
  [series]="[
    { name: t.desktop, data: desktop },
    { name: t.mobile, data: mobile },
    { name: t.tablet, data: tablet }
  ]"
  stacked
  [xAxis]="{ type: 'category', categories: t.days }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  desktop = [320, 302, 341, 374, 390, 210, 180];
  mobile = [420, 432, 401, 454, 490, 630, 610];
  tablet = [80, 72, 71, 84, 90, 130, 120];
  labels = {
  "en": {
    "desktop": "Desktop",
    "mobile": "Mobile",
    "tablet": "Tablet",
    "days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  "zh": {
    "desktop": "桌面端",
    "mobile": "移动端",
    "tablet": "平板",
    "days": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
  },
  "ja": {
    "desktop": "デスクトップ",
    "mobile": "モバイル",
    "tablet": "タブレット",
    "days": ["月", "火", "水", "木", "金", "土", "日"]
  },
  "fr": {
    "desktop": "Ordinateur",
    "mobile": "Mobile",
    "tablet": "Tablette",
    "days": ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."]
  }
};
}

```
