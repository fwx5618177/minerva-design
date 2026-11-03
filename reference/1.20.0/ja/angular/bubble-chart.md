# バブルチャート

3 つ目の値を点の大きさで表す散布図：バブルの面積が値に比例します。

Package: minerva-design@1.20.0

Renderer: angular

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

アジア

ヨーロッパ

アメリカ大陸

アフリカ

人口

1 人あたり GDP

平均寿命（年）

各国の 1 人あたり GDP、平均寿命、人口

製品

売上

クラウドストレージ

分析

モバイル SDK

決済

デスクトップアプリ

ハードウェア

コンサルティング

相対市場シェア

市場成長率

市場リーダー

高成長

製品の市場シェア、成長率、売上

見込み確定

提案

交渉

金額

案件 #{{id}}

パイプライン滞留日数

受注確率

{{deal}}（{{stage}}）：{{amount}}

バブルをクリックしてください

経過日数、受注確率、金額別の進行中案件

1 人あたり GDP（対数スケール）

高所得

対数スケールの 1 人あたり GDP と平均寿命、バブルの大きさは人口

表示中の所得：{{from}} – {{to}}

ズームすると表示範囲がドルで表示されます

インフラ

セキュリティ

人員

予算

エクスポージャー

停電

ハードウェアの納期遅延

ネットワーク切り替え

データ漏えい

アクセス権レビューの滞留

キーパーソンの退職

ベンダーのスキル不足

研修不足

ライセンス費用の上昇

為替変動

許容範囲

重大

発生可能性 {{likelihood}} × 影響度 {{impact}} = {{score}}

エクスポージャー: {{value}}

発生可能性

影響度

発生可能性、影響度、コストエクスポージャー別のプロジェクトリスク

検索

ソーシャル

動画

メール

予算

{{date}} 開始

開始日

広告費用対効果

損益分岐点

開始日、広告費用対効果、予算別のマーケティングキャンペーン

北部

南部

東部

西部

中部

両方のチャートで同じサイズスケールを使う

両方のチャートで {{value}} を最大のバブルで描きます。

各チャートが自身の最大売上を最大のバブルで描きます。

1 m² あたりの売上

利益率

{{year}} 年の店舗地域別の 1 m² あたり売上、利益率、売上高

再生

一時停止

もう一度再生

最初から

年: {{year}}

出生率（女性 1 人あたりの子どもの数）

1990 年から 2025 年までの国別の出生率、平均寿命、人口

## BubbleChart

Support: beta

Native Angular: MnBubbleChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBubbleChart"
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
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "minSize",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "maxSize",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "maxValue",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 国の比較

1 人あたり GDP と平均寿命。バブルの大きさは人口、色は大陸です。valueName と format でツールチップの値の名前と書式を指定します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBubbleChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBubbleChart],
  template: `
@let t = labels[language()];
<mn-bubble-chart
  [series]="[{ name: t.life, showLabels: true, data: [
    { x: 34, y: 84.5, value: 124, label: t.names[0] },
    { x: 44, y: 82.5, value: 68, label: t.names[1] },
    { x: 12.6, y: 78.6, value: 1410, label: t.names[2] },
    { x: 9, y: 75.9, value: 216, label: t.names[3] },
    { x: 2.5, y: 70.8, value: 1430, label: t.names[4] },
    { x: 2.2, y: 53.6, value: 224, label: t.names[5] },
    { x: 52, y: 81.2, value: 84, label: t.names[6] },
    { x: 11.5, y: 75, value: 128, label: t.names[7] }
  ] }]"
  [xAxis]="{ title: t.gdp }"
  [yAxis]="{ title: t.life, min: 50 }"
  [maxSize]="64"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "gdp": "GDP per capita (k$)",
    "life": "Life expectancy",
    "names": ["Japan", "France", "China", "Brazil", "India", "Nigeria", "Germany", "Mexico"]
  },
  "zh": {
    "gdp": "人均 GDP（千美元）",
    "life": "预期寿命",
    "names": ["日本", "法国", "中国", "巴西", "印度", "尼日利亚", "德国", "墨西哥"]
  },
  "ja": {
    "gdp": "1 人あたり GDP（千ドル）",
    "life": "平均寿命",
    "names": ["日本", "フランス", "中国", "ブラジル", "インド", "ナイジェリア", "ドイツ", "メキシコ"]
  },
  "fr": {
    "gdp": "PIB par habitant (k$)",
    "life": "Espérance de vie",
    "names": ["Japon", "France", "Chine", "Brésil", "Inde", "Nigeria", "Allemagne", "Mexique"]
  }
};
}

```

## Example: 製品ポートフォリオ

製品の市場シェア、市場成長率、売上を 2 本の参照線で 4 象限に分けます。showLabels でバブルの周りに名前を書きます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBubbleChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBubbleChart],
  template: `
@let t = labels[language()];
<mn-bubble-chart
  [series]="[
    { name: t.assets[0], data: [{ x: 4, y: 3, value: 30 }] },
    { name: t.assets[1], data: [{ x: 15, y: 7, value: 25 }] },
    { name: t.assets[2], data: [{ x: 12, y: 6, value: 20 }] },
    { name: t.assets[3], data: [{ x: 28, y: 12, value: 15 }] },
    { name: t.assets[4], data: [{ x: 16, y: 4, value: 5 }] },
    { name: t.assets[5], data: [{ x: 45, y: 18, value: 5 }] }
  ]"
  [xAxis]="{ title: t.risk }"
  [yAxis]="{ title: t.return }"
  [height]="300"
  (pointClick)="selected = $event.items[0] ? $event.items[0].seriesName + ': ' + $event.items[0].value + ' %' : selected"
/>
<output aria-live="polite">{{ selected || t.hint }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  selected = "";
  labels = {
  "en": {
    "risk": "Risk (volatility %)",
    "return": "Expected return %",
    "hint": "Click a bubble",
    "assets": ["Bonds", "Index fund", "Real estate", "Tech stocks", "Gold", "Start-ups"]
  },
  "zh": {
    "risk": "风险（波动率 %）",
    "return": "预期收益 %",
    "hint": "点击一个气泡",
    "assets": ["债券", "指数基金", "房地产", "科技股", "黄金", "初创企业"]
  },
  "ja": {
    "risk": "リスク（ボラティリティ %）",
    "return": "期待リターン %",
    "hint": "バブルをクリックします",
    "assets": ["債券", "インデックスファンド", "不動産", "ハイテク株", "金", "スタートアップ"]
  },
  "fr": {
    "risk": "Risque (volatilité %)",
    "return": "Rendement attendu %",
    "hint": "Cliquez sur une bulle",
    "assets": ["Obligations", "Fonds indiciel", "Immobilier", "Actions tech", "Or", "Start-up"]
  }
};
}

```
