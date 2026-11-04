# 散布図

2 つの値で配置する点。ポイントごとにサイズ、色、ラベルを指定でき、両軸でズームできます。

Package: minerva-design@1.20.1

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

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

Native Angular: MnScatterChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnScatterChart"
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

## Example: Two clusters

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnScatterChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnScatterChart],
  template: `
@let t = labels[language()];
<mn-scatter-chart
  [series]="[
    { name: t.teamA, data: teamA },
    { name: t.teamB, data: teamB }
  ]"
  [xAxis]="{ title: t.hours }"
  [yAxis]="{ title: t.score }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  teamA = [
  {
    "x": 17.05,
    "y": 66.86
  },
  {
    "x": 11.05,
    "y": 53.86
  },
  {
    "x": 8.21,
    "y": 59.23
  },
  {
    "x": 17.99,
    "y": 70.85
  },
  {
    "x": 7.8,
    "y": 62.49
  },
  {
    "x": 11.6,
    "y": 53.03
  },
  {
    "x": 16.73,
    "y": 63.83
  },
  {
    "x": 6.1,
    "y": 70.5
  },
  {
    "x": 15.14,
    "y": 57.98
  },
  {
    "x": 13.72,
    "y": 54.53
  },
  {
    "x": 6.57,
    "y": 67.94
  },
  {
    "x": 17.52,
    "y": 67.94
  },
  {
    "x": 10.08,
    "y": 54.53
  },
  {
    "x": 9.04,
    "y": 57.99
  },
  {
    "x": 17.86,
    "y": 70.51
  },
  {
    "x": 7.15,
    "y": 63.82
  }
];
  teamB = [
  {
    "x": 21.46,
    "y": 74.12
  },
  {
    "x": 26.1,
    "y": 87.51
  },
  {
    "x": 30.41,
    "y": 83.95
  },
  {
    "x": 20.03,
    "y": 71.47
  },
  {
    "x": 29.55,
    "y": 78.25
  },
  {
    "x": 27.24,
    "y": 88.98
  },
  {
    "x": 20.8,
    "y": 79.43
  },
  {
    "x": 31.69,
    "y": 71.17
  },
  {
    "x": 23.61,
    "y": 82.84
  },
  {
    "x": 23.48,
    "y": 88.1
  },
  {
    "x": 31.74,
    "y": 75.07
  },
  {
    "x": 20.87,
    "y": 73.17
  },
  {
    "x": 27.1,
    "y": 86.69
  },
  {
    "x": 29.67,
    "y": 85.11
  },
  {
    "x": 20.02,
    "y": 71.99
  },
  {
    "x": 30.31,
    "y": 76.96
  }
];
  labels = {
  "en": {
    "teamA": "Team A",
    "teamB": "Team B",
    "hours": "Hours",
    "score": "Score"
  },
  "zh": {
    "teamA": "A 组",
    "teamB": "B 组",
    "hours": "小时",
    "score": "得分"
  },
  "ja": {
    "teamA": "チームA",
    "teamB": "チームB",
    "hours": "時間",
    "score": "スコア"
  },
  "fr": {
    "teamA": "Équipe A",
    "teamB": "Équipe B",
    "hours": "Heures",
    "score": "Score"
  }
};
}

```

## Example: Clicked point

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnScatterChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnScatterChart],
  template: `
@let t = labels[language()];
<mn-scatter-chart
  [series]="[{ name: t.cities, pointSize: 12, data: [
    { x: 20.5, y: 31, label: t.names[0] },
    { x: 10.9, y: 17, label: t.names[1] },
    { x: 6.8, y: 15, label: t.names[2] },
    { x: 4.9, y: 15, label: t.names[3] },
    { x: 4.8, y: 21, label: t.names[4] },
    { x: 5.2, y: 16, label: t.names[5] }
  ] }]"
  [xAxis]="{ title: t.density }"
  [yAxis]="{ title: t.rent }"
  [height]="280"
  (pointClick)="selected = $event.items[0]?.label + ': ' + $event.items[0]?.x + ' · ' + $event.items[0]?.y + ' €/m²'"
/>
<output aria-live="polite">{{ selected || t.hint }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  selected = "";
  labels = {
  "en": {
    "cities": "Cities",
    "density": "Density (k/km²)",
    "rent": "Rent (€/m²)",
    "hint": "Click a city",
    "names": ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"]
  },
  "zh": {
    "cities": "城市",
    "density": "人口密度（千人/km²）",
    "rent": "租金（欧元/m²）",
    "hint": "点击一个城市",
    "names": ["巴黎", "里昂", "里尔", "南特", "尼斯", "波尔多"]
  },
  "ja": {
    "cities": "都市",
    "density": "人口密度（千人/km²）",
    "rent": "家賃（€/m²）",
    "hint": "都市をクリックします",
    "names": ["パリ", "リヨン", "リール", "ナント", "ニース", "ボルドー"]
  },
  "fr": {
    "cities": "Villes",
    "density": "Densité (k/km²)",
    "rent": "Loyer (€/m²)",
    "hint": "Cliquez sur une ville",
    "names": ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"]
  }
};
}

```
