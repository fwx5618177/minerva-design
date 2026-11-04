# ローソク足チャート

期間ごとの始値・高値・安値・終値を表すローソク足チャート。株式や暗号資産など、あらゆる OHLC データに使えます。陽線と陰線は別々の色で描かれ、移動平均などの折れ線系列を重ねられます。長い履歴でも GPU によりズームやパンがなめらかです。

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

始値

高値

安値

終値

騰落率

ローソク足の色

上昇は緑、下落は赤

上昇は赤、下落は緑

ACME の 60 営業日の日足

MA{{days}}

NOVA の 120 営業日の日足と 5 日・20 日移動平均

50,000 本の 1 分足

{{candles}} 本 · {{renderer}} で描画 · Ctrl / ⌘ + ホイールでズーム、ドラッグでパン、ダブルクリックでリセット

出来高

ORBT の 90 営業日の日足

ORBT の日次出来高

VWAP

業績見通しの下方修正

ORBT の 1 セッションの 5 分足と VWAP

日足のバーチャート

日足のローソク足

日足の中抜きローソク足

バーチャート

ローソク足

中抜きローソク足

始値と終値を横線で

始値から終値までの実体

終値が高いと中抜き

ETH/USDT

8 本の指数移動平均付き ETH/USDT 4 時間足チャート

出来高の表示

専用ペイン

価格の下に重ねる

BTC/USDT

ローソク足の色の出来高付き BTC/USDT 1 時間足チャート

CATL 300750

陽線が赤の CATL 日足チャート

決

配

分

予↓

決算

配当

株式分割

業績予想の下方修正

ORBT

決算・配当・株式分割付きの ORBT 日足チャート

一時停止

再開

リアルタイム：毎秒 10 件の約定

一時停止中

ADA/USDT

5 秒

リアルタイムで更新される ADA/USDT 5 秒足

ナスダック 100

ダークテーマのナスダック 100 30 分足（中抜きローソク足）

パターン

すべて

十字線

カラカサ

流れ星

包み足

十

カ

流

包↑

包↓

十字線

カラカサ

流れ星

陽の包み足

陰の包み足

始値と終値がほぼ同じ、迷い

下落後の長い下ヒゲ、買いが入った

上昇後の長い上ヒゲ、売りが入った

陽線の実体が前の陰線を包む

陰線の実体が前の陽線を包む

{{name}}：{{value}}

{{date}} の{{name}}：{{meaning}}。

マークの付いた足にカーソルを合わせるとパターン名を表示します。

ローソク足パターンを示した ORBT の日足チャート

BTC/USD

AAPL

EUR/USD

金 (XAU/USD)

48 時間

30 日

{{name}} のローソク足、期間の騰落率 {{change}}

R1

P

S1

EUR/USD

日次ピボットを示した EUR/USD の1時間足

{{time}} · 値幅 {{range}} pips · 実体 {{body}} pips · 変化 {{change}} pips · カーソルは現在値から {{distance}} pips

金曜日のピボット：P {{pivot}}、R1 {{r1}}、S1 {{s1}}。足にカーソルを合わせると pips で測ります。

## CandlestickChart

Support: beta

Native Angular: MnCandlestickChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCandlestickChart"
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

## Example: Daily candles

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCandlestickChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCandlestickChart],
  template: `
@let t = labels[language()];
<mn-candlestick-chart
  [series]="[{ name: t.price, data: candles }]"
  [xAxis]="{ title: t.day }"
  [yAxis]="{ zero: false }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  candles = [
  {
    "x": 1,
    "open": 100,
    "y": 100,
    "high": 101.5,
    "low": 98.5
  },
  {
    "x": 2,
    "open": 101.98,
    "y": 105.76,
    "high": 107.26,
    "low": 100.48
  },
  {
    "x": 3,
    "open": 103.84,
    "y": 101.39,
    "high": 105.34,
    "low": 99.89
  },
  {
    "x": 4,
    "open": 105.45,
    "y": 103.25,
    "high": 106.95,
    "low": 101.75
  },
  {
    "x": 5,
    "open": 106.73,
    "y": 110.6,
    "high": 112.1,
    "low": 105.23
  },
  {
    "x": 6,
    "open": 107.59,
    "y": 107.29,
    "high": 109.09,
    "low": 105.79
  },
  {
    "x": 7,
    "open": 107.98,
    "y": 104.3,
    "high": 109.48,
    "low": 102.8
  },
  {
    "x": 8,
    "open": 107.87,
    "y": 110.55,
    "high": 112.05,
    "low": 106.37
  },
  {
    "x": 9,
    "open": 107.27,
    "y": 109.22,
    "high": 110.72,
    "low": 105.77
  },
  {
    "x": 10,
    "open": 106.22,
    "y": 102.29,
    "high": 107.72,
    "low": 100.79
  },
  {
    "x": 11,
    "open": 104.79,
    "y": 105.39,
    "high": 106.89,
    "low": 103.29
  },
  {
    "x": 12,
    "open": 103.05,
    "y": 106.6,
    "high": 108.1,
    "low": 101.55
  },
  {
    "x": 13,
    "open": 101.13,
    "y": 98.23,
    "high": 102.63,
    "low": 96.73
  },
  {
    "x": 14,
    "open": 99.13,
    "y": 97.46,
    "high": 100.63,
    "low": 95.96
  },
  {
    "x": 15,
    "open": 97.19,
    "y": 101.17,
    "high": 102.67,
    "low": 95.69
  },
  {
    "x": 16,
    "open": 95.43,
    "y": 94.53,
    "high": 96.93,
    "low": 93.03
  },
  {
    "x": 17,
    "open": 93.95,
    "y": 90.55,
    "high": 95.45,
    "low": 89.05
  },
  {
    "x": 18,
    "open": 92.84,
    "y": 95.93,
    "high": 97.43,
    "low": 91.34
  },
  {
    "x": 19,
    "open": 92.18,
    "y": 93.58,
    "high": 95.08,
    "low": 90.68
  },
  {
    "x": 20,
    "open": 92.01,
    "y": 88.01,
    "high": 93.51,
    "low": 86.51
  },
  {
    "x": 21,
    "open": 92.33,
    "y": 93.51,
    "high": 95.01,
    "low": 90.83
  },
  {
    "x": 22,
    "open": 93.13,
    "y": 96.36,
    "high": 97.86,
    "low": 91.63
  },
  {
    "x": 23,
    "open": 94.36,
    "y": 91.08,
    "high": 95.86,
    "low": 89.58
  },
  {
    "x": 24,
    "open": 95.93,
    "y": 94.82,
    "high": 97.43,
    "low": 93.32
  }
];
  labels = {
  "en": {
    "price": "Price",
    "day": "Day"
  },
  "zh": {
    "price": "价格",
    "day": "天"
  },
  "ja": {
    "price": "価格",
    "day": "日"
  },
  "fr": {
    "price": "Cours",
    "day": "Jour"
  }
};
}

```

## Example: 移動平均

type: "line" の系列はローソク足の上に描かれます。ここでは 5 日・20 日移動平均で、期間がそろうまでは null です。日にちにホバーすると OHLC、騰落率、両方の平均値を確認できます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCandlestickChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCandlestickChart],
  template: `
@let t = labels[language()];
<mn-candlestick-chart
  [series]="[
    { name: t.price, data: candles },
    { name: t.average, type: 'line', curve: 'smooth', data: average }
  ]"
  [yAxis]="{ zero: false }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  candles = [
  {
    "x": 1,
    "open": 80,
    "y": 80,
    "high": 81.5,
    "low": 78.5
  },
  {
    "x": 2,
    "open": 82.78,
    "y": 86.56,
    "high": 88.06,
    "low": 81.28
  },
  {
    "x": 3,
    "open": 85.44,
    "y": 82.99,
    "high": 86.94,
    "low": 81.49
  },
  {
    "x": 4,
    "open": 87.85,
    "y": 85.65,
    "high": 89.35,
    "low": 84.15
  },
  {
    "x": 5,
    "open": 89.93,
    "y": 93.8,
    "high": 95.3,
    "low": 88.43
  },
  {
    "x": 6,
    "open": 91.59,
    "y": 91.29,
    "high": 93.09,
    "low": 89.79
  },
  {
    "x": 7,
    "open": 92.78,
    "y": 89.1,
    "high": 94.28,
    "low": 87.6
  },
  {
    "x": 8,
    "open": 93.47,
    "y": 96.15,
    "high": 97.65,
    "low": 91.97
  },
  {
    "x": 9,
    "open": 93.67,
    "y": 95.62,
    "high": 97.12,
    "low": 92.17
  },
  {
    "x": 10,
    "open": 93.42,
    "y": 89.49,
    "high": 94.92,
    "low": 87.99
  },
  {
    "x": 11,
    "open": 92.79,
    "y": 93.39,
    "high": 94.89,
    "low": 91.29
  },
  {
    "x": 12,
    "open": 91.85,
    "y": 95.4,
    "high": 96.9,
    "low": 90.35
  },
  {
    "x": 13,
    "open": 90.73,
    "y": 87.83,
    "high": 92.23,
    "low": 86.33
  },
  {
    "x": 14,
    "open": 89.53,
    "y": 87.86,
    "high": 91.03,
    "low": 86.36
  },
  {
    "x": 15,
    "open": 88.39,
    "y": 92.37,
    "high": 93.87,
    "low": 86.89
  },
  {
    "x": 16,
    "open": 87.43,
    "y": 86.53,
    "high": 88.93,
    "low": 85.03
  },
  {
    "x": 17,
    "open": 86.75,
    "y": 83.35,
    "high": 88.25,
    "low": 81.85
  },
  {
    "x": 18,
    "open": 86.44,
    "y": 89.53,
    "high": 91.03,
    "low": 84.94
  },
  {
    "x": 19,
    "open": 86.58,
    "y": 87.98,
    "high": 89.48,
    "low": 85.08
  },
  {
    "x": 20,
    "open": 87.21,
    "y": 83.21,
    "high": 88.71,
    "low": 81.71
  },
  {
    "x": 21,
    "open": 88.33,
    "y": 89.51,
    "high": 91.01,
    "low": 86.83
  },
  {
    "x": 22,
    "open": 89.93,
    "y": 93.16,
    "high": 94.66,
    "low": 88.43
  },
  {
    "x": 23,
    "open": 91.96,
    "y": 88.68,
    "high": 93.46,
    "low": 87.18
  },
  {
    "x": 24,
    "open": 94.33,
    "y": 93.22,
    "high": 95.83,
    "low": 91.72
  }
];
  average = [
  {
    "x": 1,
    "y": 80
  },
  {
    "x": 2,
    "y": 83.28
  },
  {
    "x": 3,
    "y": 83.18
  },
  {
    "x": 4,
    "y": 83.8
  },
  {
    "x": 5,
    "y": 85.8
  },
  {
    "x": 6,
    "y": 88.06
  },
  {
    "x": 7,
    "y": 88.57
  },
  {
    "x": 8,
    "y": 91.2
  },
  {
    "x": 9,
    "y": 93.19
  },
  {
    "x": 10,
    "y": 92.33
  },
  {
    "x": 11,
    "y": 92.75
  },
  {
    "x": 12,
    "y": 94.01
  },
  {
    "x": 13,
    "y": 92.35
  },
  {
    "x": 14,
    "y": 90.79
  },
  {
    "x": 15,
    "y": 91.37
  },
  {
    "x": 16,
    "y": 90
  },
  {
    "x": 17,
    "y": 87.59
  },
  {
    "x": 18,
    "y": 87.93
  },
  {
    "x": 19,
    "y": 87.95
  },
  {
    "x": 20,
    "y": 86.12
  },
  {
    "x": 21,
    "y": 86.72
  },
  {
    "x": 22,
    "y": 88.68
  },
  {
    "x": 23,
    "y": 88.51
  },
  {
    "x": 24,
    "y": 89.56
  }
];
  labels = {
  "en": {
    "price": "Price",
    "average": "5-day average"
  },
  "zh": {
    "price": "价格",
    "average": "5 日均线"
  },
  "ja": {
    "price": "価格",
    "average": "5日移動平均"
  },
  "fr": {
    "price": "Cours",
    "average": "Moyenne 5 jours"
  }
};
}

```
