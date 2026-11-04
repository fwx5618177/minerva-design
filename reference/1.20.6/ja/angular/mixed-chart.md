# 複合グラフ

棒・折れ線・面を 1 つのグラフに、1 本または 2 本の値軸で：売上と成長率、降水量と気温、パレート図。

Package: minerva-design@1.20.6

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "99b9ad1465abc6ea97d2a8c008f3026645edb983",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:d66e13eea732bfeb1a6aaa7461bf92ea0d54944072977e762c106b87e877d062"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

{{year}} 年 Q{{n}}

売上

前年同期比

四半期売上と前年同期比の成長率

降水量

気温

東京の月ごとの降水量と気温

セッション

コンバージョン率

キャンペーン

2 か月間の日ごとのセッション数とコンバージョン率

返品

累積比率

サイズ違い

破損

説明と異なる

配達遅延

気が変わった

誤配送

その他

原因別の返品数とその累積比率

ページビュー

中国語（zh-CN）

フランス語（fr-FR）

日別ページビューとコンバージョン率、{{locale}}

売上

ユーザー数

ユーザー数（対数）

2016〜2025 年の年間売上と対数軸のユーザー数

{{value}} kWh

太陽光発電量

消費量

蓄電池の充電率

夜間

{{value}} の蓄電池

2 日間の自給率は {{share}}、系統からの購入は {{imported}} です。

1 時間あたりの電力量

ある住宅の 2 日間の時間ごとの太陽光発電量と消費量、および蓄電池の充電率

在庫水準

入荷

販促期間

安全在庫

発注点

日付または入荷をクリックしてください。

{{id}}：{{ordered}} に {{quantity}} 個を発注し、{{lead}} 後の {{arrived}} に入荷。

{{date}} の在庫は {{units}} 個。

{{date}} の在庫は {{units}} 個のみで、安全在庫を下回っています。

個数

ある商品の 3 か月間の日別在庫水準。入荷、発注点、安全在庫を表示

リクエスト数

エラー率

リリース

30 分あたりのリクエスト数

ある Web API の 1 日のリクエスト数とエラー率、およびリリース

{{version}} のリリース後、エラー率は {{time}} に {{peak}} でピークに達し、{{rollback}} へのロールバックまで続きました。

{{value}} pt

開始

残作業

完了

理想ペース

{{value}} 追加

理想：残り {{value}}

残り {{value}}

当日の完了 {{value}}

理想より {{value}} 遅れ

理想より {{value}} 先行

ストーリーポイント

スプリントのバーンダウン：10 稼働日の残作業、日ごとの完了ポイント、理想の消化ペース

残り {{left}}、1 日 {{velocity}} のペースでは、スプリント終了時に約 {{forecast}} が未完了になります。

残り {{left}}、1 日 {{velocity}} のペースで、スプリントは順調です。

## MixedChart

Support: beta

Native Angular: MnMixedChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnMixedChart"
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
    "name": "yAxis2",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "stackMode",
    "typeText": "\"normal\" | \"percent\" | undefined",
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

## Example: 売上と成長率

成長率の折れ線は yAxis: "right" を指定し、独自の書式で yAxis2 に対して描かれます。右軸の範囲は左軸の目盛りに揃うため、グリッドが両方の軸に合います。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnMixedChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnMixedChart],
  template: `
@let t = labels[language()];
@let m = months[language()];
<mn-mixed-chart
  [series]="[
    { name: t.revenue, type: 'bar', data: [{ x: m[0], y: 182 }, { x: m[1], y: 196 }, { x: m[2], y: 214 }, { x: m[3], y: 205 }, { x: m[4], y: 238 }, { x: m[5], y: 261 }] },
    { name: t.growth, type: 'line', curve: 'smooth', yAxis: 'right', data: [{ x: m[0], y: 0 }, { x: m[1], y: 7.7 }, { x: m[2], y: 9.2 }, { x: m[3], y: -4.2 }, { x: m[4], y: 16.1 }, { x: m[5], y: 9.7 }] }
  ]"
  [xAxis]="{ type: 'category' }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "revenue": "Revenue (k€)",
    "growth": "Growth"
  },
  "zh": {
    "revenue": "收入（千欧元）",
    "growth": "增长率"
  },
  "ja": {
    "revenue": "売上（千ユーロ）",
    "growth": "成長率"
  },
  "fr": {
    "revenue": "Chiffre d’affaires (k€)",
    "growth": "Croissance"
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

## Example: 雨温図

降水量の棒を左軸、気温の曲線を右軸に。zero: true で右軸の範囲にゼロを含めます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnMixedChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnMixedChart],
  template: `
@let t = labels[language()];
@let m = months[language()];
<mn-mixed-chart
  [series]="[
    { name: t.rain, type: 'bar', color: 'var(--chart-series-2, #0ea5e9)', data: [{ x: m[0], y: 52 }, { x: m[1], y: 41 }, { x: m[2], y: 48 }, { x: m[3], y: 55 }, { x: m[4], y: 68 }, { x: m[5], y: 71 }, { x: m[6], y: 64 }, { x: m[7], y: 62 }, { x: m[8], y: 55 }, { x: m[9], y: 64 }, { x: m[10], y: 63 }, { x: m[11], y: 60 }] },
    { name: t.temperature, type: 'line', curve: 'smooth', yAxis: 'right', color: 'var(--chart-series-4, #ef4444)', data: [{ x: m[0], y: 3.5 }, { x: m[1], y: 4.2 }, { x: m[2], y: 7.6 }, { x: m[3], y: 10.7 }, { x: m[4], y: 14.5 }, { x: m[5], y: 17.6 }, { x: m[6], y: 19.8 }, { x: m[7], y: 19.6 }, { x: m[8], y: 16.4 }, { x: m[9], y: 12.3 }, { x: m[10], y: 7.6 }, { x: m[11], y: 4.4 }] }
  ]"
  [xAxis]="{ type: 'category' }"
  crosshair
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "rain": "Precipitation (mm)",
    "temperature": "Temperature (°C)"
  },
  "zh": {
    "rain": "降水量（毫米）",
    "temperature": "气温（°C）"
  },
  "ja": {
    "rain": "降水量（mm）",
    "temperature": "気温（°C）"
  },
  "fr": {
    "rain": "Précipitations (mm)",
    "temperature": "Température (°C)"
  }
};
  months = {
  "en": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  "zh": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  "ja": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  "fr": ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
};
}

```
