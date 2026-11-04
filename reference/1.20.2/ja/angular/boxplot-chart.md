# 箱ひげ図

中央値、四分位数、ひげ、外れ値で分布を比較。生のサンプルからも、計算済みの統計量からも描けます。外れ値は系列色の中抜きの円で、ホバーすると値とグループを確認できます。

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

ゲートウェイ

認証

検索

決済

レコメンド

画像

応答時間

最大

第 3 四分位

中央値

第 1 四分位

最小

外れ値

サービスごとの応答時間の分布

年収

ジュニア開発者

開発者

シニア開発者

テックリード

エンジニアリングマネージャー

職種ごとの給与の分布

平日

週末

パリ

リヨン

マルセイユ

リール

配達時間（時間）

都市ごとの平日と週末の配達時間

日最高気温

平均

月ごとの日最高気温の分布

Lint

単体テスト

結合テスト

E2E テスト

リリース

ひげの範囲

1.5 × IQR

3 × IQR

最小 – 最大

外れ値の形

中抜き

塗りつぶし

{{value}} 件の実行を外れ値として表示

ビルド時間

CI パイプラインごとのビルド時間の分布

箱または外れ値をクリックしてください。

{{day}}: ある患者は {{value}} 待ちました。

{{day}}: 待ち時間の中央値 {{median}}、半数の患者は {{q1}} から {{q3}} 待ち、外れ値 {{outliers}} 件。

待ち時間

4 時間目標

曜日ごとの救急外来の待ち時間の分布

スタイルシート

スクリプト

フォント

画像

動画

対数スケール

{{value}} 個のファイルが予算 {{budget}} を超えています。

ファイルサイズ

予算

Web サイトのファイルサイズの種類別の分布

米国東部

米国西部

欧州西部

アジア太平洋南部

南米東部

一時停止

再開

{{regions}} で SLA 違反のおそれ

すべてのリージョンが SLA 内です

レイテンシ

SLA

リージョンごとのリクエストレイテンシのライブ分布

## BoxPlotChart

Support: beta

Native Angular: MnBoxPlotChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBoxPlotChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "typeText": "readonly ChartSeries[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "groups",
    "typeText": "readonly BoxplotGroup[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "whisker",
    "typeText": "number | \"minmax\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "outlierShape",
    "typeText": "\"filled\" | \"hollow\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "outlierSize",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "orientation",
    "typeText": "ChartOrientation | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: サービスごとの応答時間

groups に各箱の生のサンプルを渡すと、四分位数、ひげ（四分位範囲の 1.5 倍）、外れ値が計算されます。tooltip.labels でツールチップの行名を翻訳します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBoxPlotChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBoxPlotChart],
  template: `
@let t = labels[language()];
<mn-box-plot-chart
  [groups]="[
    { x: t.services[0], values: samples[0] },
    { x: t.services[1], values: samples[1] },
    { x: t.services[2], values: samples[2] },
    { x: t.services[3], values: samples[3] }
  ]"
  [name]="t.time"
  [xAxis]="{ type: 'category' }"
  [yAxis]="{ title: t.time }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  samples = [
  [42, 48, 51, 55, 57, 60, 62, 66, 70, 75, 140],
  [120, 135, 150, 160, 168, 175, 190, 210, 230, 380],
  [30, 32, 35, 36, 38, 40, 41, 43, 47, 52],
  [60, 75, 88, 96, 105, 118, 126, 140, 160, 190, 260]
];
  labels = {
  "en": {
    "time": "Response time (ms)",
    "services": ["Search", "Checkout", "Profile", "Images"]
  },
  "zh": {
    "time": "响应时间（毫秒）",
    "services": ["搜索", "结账", "个人资料", "图片"]
  },
  "ja": {
    "time": "応答時間（ms）",
    "services": ["検索", "決済", "プロフィール", "画像"]
  },
  "fr": {
    "time": "Temps de réponse (ms)",
    "services": ["Recherche", "Paiement", "Profil", "Images"]
  }
};
}

```

## Example: 横向き

計算済みの統計量（箱ごとに low、q1、中央値としての y、q3、high、outliers を持つ 1 データ）を orientation: "horizontal" で行に並べます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBoxPlotChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBoxPlotChart],
  template: `
@let t = labels[language()];
<mn-box-plot-chart
  [groups]="[
    { x: t.classes[0], values: scores[0] },
    { x: t.classes[1], values: scores[1] },
    { x: t.classes[2], values: scores[2] }
  ]"
  [name]="t.score"
  orientation="horizontal"
  whisker="minmax"
  [xAxis]="{ type: 'category' }"
  [yAxis]="{ min: 0, max: 100 }"
  [height]="240"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  scores = [
  [55, 61, 64, 68, 70, 72, 75, 78, 81, 86, 92],
  [40, 52, 58, 63, 66, 71, 73, 77, 84, 95],
  [62, 66, 69, 70, 72, 74, 75, 77, 79, 83]
];
  labels = {
  "en": {
    "score": "Score",
    "classes": ["Class A", "Class B", "Class C"]
  },
  "zh": {
    "score": "分数",
    "classes": ["一班", "二班", "三班"]
  },
  "ja": {
    "score": "得点",
    "classes": ["A 組", "B 組", "C 組"]
  },
  "fr": {
    "score": "Note",
    "classes": ["Classe A", "Classe B", "Classe C"]
  }
};
}

```
