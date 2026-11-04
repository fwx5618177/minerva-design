# 面グラフ

時間とともに変化する量を塗りつぶした面で表します。既定でなめらかな曲線になり、重ねて表示するほか、合計として積み上げたり 100% の構成比として表示したりできます。ホバーすると同じ x の全系列を読み取れ、Ctrl / ⌘ + ホイールやピンチでズームできます。

Package: minerva-design@1.20.6

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

デイリーアクティブユーザー

2026 年 4 月〜6 月のデイリーアクティブユーザー

その他

2016〜2026 年のベンダー別市場シェア

自然検索

ダイレクト

参照元サイト

ソーシャル

流入元別の月間訪問数（積み上げ）

稼働中のインスタンス

上限

1 日にオートスケーラーが起動したインスタンス数

原子力

水力

風力

太陽光

ガス

{{value}} GW

出力

1 日の電源別発電量（積み上げ）

実績

計画

年間の売上累計と計画の比較

ダウンロード

アップロード

2 時間のサーバー帯域幅。ダウンロードはゼロの上、アップロードは下

太陽光発電量

{{value}} kWh

2026 年の屋根置き太陽光発電の日次発電量

ズームをリセット

{{from}} – {{to}}：合計 {{total}}、1 日平均 {{average}}

Ctrl / ⌘ + ホイールまたはピンチで季節を拡大し、ドラッグで移動します。

エンジニアリング

営業

カスタマーサポート

オペレーション

財務・人事

2025〜2026 年の部門別の月次人数

選択した月の人数

従業員 {{value}} 人

昨年

今年

ブラックフライデー

サイバーマンデー

最終発送日

11 月と 12 月の日次注文数（今年と昨年の比較）

今シーズンの注文は {{total}} 件、前年比 {{change}}。

使用量

傾向

{{value}} GB

容量 {{value}}

ボリューム

データベース

ログ

ユーザーのアップロード

約 {{days}}後（{{date}} ごろ）に満杯

今後 {{days}}は満杯になりません

60 日間のディスク使用量と容量までの傾向

## AreaChart

Support: beta

Native Angular: MnAreaChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnAreaChart"
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
    "name": "curve",
    "typeText": "ChartCurve",
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

## Example: 積み上げ

stacked で面を積み重ね、上端が合計を表します。各要素の和に意味があるときに使います。凡例の項目をクリックすると流入元を非表示にし、残りを積み直します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnAreaChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnAreaChart],
  template: `
@let t = labels[language()];
<mn-area-chart
  [series]="[
    { name: t.organic, data: organic },
    { name: t.paid, data: paid },
    { name: t.referral, data: referral }
  ]"
  stacked
  [xAxis]="{ type: 'category', categories: t.months }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  organic = [320, 332, 301, 334, 390, 430];
  paid = [120, 132, 101, 134, 190, 230];
  referral = [60, 72, 71, 74, 90, 110];
  labels = {
  "en": {
    "organic": "Organic",
    "paid": "Paid",
    "referral": "Referral",
    "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  },
  "zh": {
    "organic": "自然流量",
    "paid": "付费流量",
    "referral": "推荐流量",
    "months": ["1月", "2月", "3月", "4月", "5月", "6月"]
  },
  "ja": {
    "organic": "オーガニック",
    "paid": "有料",
    "referral": "参照元",
    "months": ["1月", "2月", "3月", "4月", "5月", "6月"]
  },
  "fr": {
    "organic": "Naturel",
    "paid": "Payant",
    "referral": "Référents",
    "months": ["janv.", "févr.", "mars", "avr.", "mai", "juin"]
  }
};
}

```

## Example: 100% 積み上げ

percent は各 x を 100% に揃え、量ではなく構成比（市場シェアなど）を比較します。ツールチップには各値とその比率が表示されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnAreaChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnAreaChart],
  template: `
@let t = labels[language()];
<mn-area-chart
  [series]="[
    { name: t.solar, data: solar },
    { name: t.wind, data: wind },
    { name: t.hydro, data: hydro }
  ]"
  percent
  curve="linear"
  [xAxis]="{ type: 'category', categories: t.hours }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  solar = [0, 5, 40, 62, 35, 2];
  wind = [48, 52, 30, 22, 38, 55];
  hydro = [30, 30, 28, 26, 28, 30];
  labels = {
  "en": {
    "solar": "Solar",
    "wind": "Wind",
    "hydro": "Hydro",
    "hours": ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]
  },
  "zh": {
    "solar": "太阳能",
    "wind": "风能",
    "hydro": "水电",
    "hours": ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]
  },
  "ja": {
    "solar": "太陽光",
    "wind": "風力",
    "hydro": "水力",
    "hours": ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"]
  },
  "fr": {
    "solar": "Solaire",
    "wind": "Éolien",
    "hydro": "Hydraulique",
    "hours": ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"]
  }
};
}

```
