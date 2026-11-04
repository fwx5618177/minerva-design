# ウォーターフォールチャート

一連の増減が値を始点から終点へ運ぶ様子を、小計と合計とともに示します：損益ブリッジ、キャッシュフロー、差異分析。細い破線が各棒を次の棒につなぎます。

Package: minerva-design@1.20.5

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

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

Native Angular: MnWaterfallChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnWaterfallChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "steps",
    "typeText": "readonly WaterfallStep[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "upColor",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "downColor",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "totalColor",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "start",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "connector",
    "typeText": "boolean | ChartConnectorOptions | undefined",
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

## Example: 損益ブリッジ

売上から純利益まで：各増減は前の棒の終点から始まり、小計と合計の棒はゼロからの累計を示します。ラベルには増減が表示されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnWaterfallChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnWaterfallChart],
  template: `
@let s = steps[language()];
<mn-waterfall-chart
  [steps]="[
    { label: s[0], value: 420 },
    { label: s[1], value: -180 },
    { label: s[2], kind: 'subtotal' },
    { label: s[3], value: -130 },
    { label: s[4], value: 25 },
    { label: s[5], value: -34 },
    { label: s[6], kind: 'total' }
  ]"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  steps = {
  "en": ["Revenue", "Cost of sales", "Gross profit", "Operating costs", "Other income", "Taxes", "Net income"],
  "zh": ["营业收入", "销售成本", "毛利润", "运营费用", "其他收入", "税费", "净利润"],
  "ja": ["売上高", "売上原価", "売上総利益", "営業費用", "その他収益", "税金", "純利益"],
  "fr": ["Chiffre d’affaires", "Coût des ventes", "Marge brute", "Charges d’exploitation", "Autres produits", "Impôts", "Résultat net"]
};
}

```

## Example: キャッシュフロー

start で期首残高を指定し、最初の小計がそれを示します。各月の純キャッシュフローを加え、期末残高で終わります。yAxis.min で増減部分を拡大します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnWaterfallChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnWaterfallChart],
  template: `
@let t = labels[language()];
@let m = months[language()];
<mn-waterfall-chart
  [steps]="[
    { label: t.opening, value: 120 },
    { label: m[0], value: 18 },
    { label: m[1], value: -12 },
    { label: m[2], value: 25 },
    { label: m[3], value: -30 },
    { label: m[4], value: 14 },
    { label: m[5], value: 9 },
    { label: t.closing, kind: 'total' }
  ]"
  [labels]="false"
  orientation="horizontal"
  [height]="360"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "opening": "Opening",
    "closing": "Closing"
  },
  "zh": {
    "opening": "期初",
    "closing": "期末"
  },
  "ja": {
    "opening": "期首",
    "closing": "期末"
  },
  "fr": {
    "opening": "Ouverture",
    "closing": "Clôture"
  }
};
  months = {
  "en": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  "zh": ["1月", "2月", "3月", "4月", "5月", "6月"],
  "ja": ["1月", "2月", "3月", "4月", "5月", "6月"],
  "fr": ["janv.", "févr.", "mars", "avr.", "mai", "juin"]
};
}

```
