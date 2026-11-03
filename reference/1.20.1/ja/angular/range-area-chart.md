# 範囲面グラフ

下端と上端の間を塗る帯：信頼区間、予測、最小・最大の範囲、パーセンタイルのファンチャートに。

Package: minerva-design@1.20.1

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

95% 区間

80% 区間

実績

予測

注文数

今日

月間注文数と 12 か月の予測、その信頼区間

最低 – 最高

平年値

1 年間の日ごとの最低・最高気温

5 – 95 パーセンタイル

25 – 75 パーセンタイル

中央値

1 日の応答時間のパーセンタイル

安値 – 高値

終値

6 か月間の日ごとの値幅と終値

予測値 ± {{k}}σ

実測値

異常

感度

{{k}}σ の帯

1 分あたりのリクエスト数

1 週間の 1 分あたり API リクエスト数。予測の帯とその外側の異常を表示

帯の外にある点はありません。

異常：{{n}} 件。最新は {{latest}}。

買値 – 売値

仲値

一時停止

再開

買値 {{bid}} ・ 売値 {{ask}}

スプレッド {{value}} bp

通貨ペアの直近 1 分間のリアルタイムの買値と売値、および仲値

低排出（SSP1-2.6）

低排出、可能性の高い範囲

非常に高い排出（SSP5-8.5）

非常に高い排出、可能性の高い範囲

観測値

{{value}} の上限

1850〜1900 年比の気温上昇

1950 年以降に観測された地球温暖化と、低排出および非常に高い排出シナリオでの 2100 年までの予測

低排出では中央値が {{low}} 年ごろに {{lowLimit}} を超え、{{peak}} で横ばいになります。非常に高い排出では {{high}} 年ごろに {{highLimit}} を超えます。

{{level}} 信頼区間

リフト

差なし

有意

信頼水準

テスト日数

A に対する B のコンバージョンリフト

28 日間のテストにおけるバリアント A に対するバリアント B の累積コンバージョンリフトと信頼区間

B は {{lift}} 上回っていますが、{{level}} 区間はまだゼロを含んでいます。

B のコンバージョンは {{lift}} 高く（{{level}} 区間で {{low}}〜{{high}}）、{{day}} 日目から有意です。

## RangeAreaChart

Support: beta

Native Angular: MnRangeAreaChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnRangeAreaChart"
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
    "name": "curve",
    "typeText": "ChartCurve",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 信頼区間付きの予測

面の各点が y0 で下端を指定します。80% と 95% の区間は予測期間とともに広がり、実績と予測は折れ線です。lineWidth: 0 で帯の縁を隠します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRangeAreaChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRangeAreaChart],
  template: `
@let t = labels[language()];
@let m = months[language()];
<mn-range-area-chart
  [series]="[
    { name: t.band, data: [{ x: m[5], y0: 158, y: 158 }, { x: m[6], y0: 159, y: 167 }, { x: m[7], y0: 161, y: 177 }, { x: m[8], y0: 160, y: 184 }, { x: m[9], y0: 162, y: 194 }, { x: m[10], y0: 165, y: 205 }, { x: m[11], y0: 166, y: 214 }] },
    { name: t.actual, type: 'line', data: [{ x: m[0], y: 120 }, { x: m[1], y: 132 }, { x: m[2], y: 128 }, { x: m[3], y: 141 }, { x: m[4], y: 150 }, { x: m[5], y: 158 }] },
    { name: t.forecast, type: 'line', lineWidth: 1, data: [{ x: m[5], y: 158 }, { x: m[6], y: 163 }, { x: m[7], y: 169 }, { x: m[8], y: 172 }, { x: m[9], y: 178 }, { x: m[10], y: 185 }, { x: m[11], y: 190 }] }
  ]"
  [xAxis]="{ type: 'category', categories: m }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "actual": "Actual",
    "forecast": "Forecast",
    "band": "80 % interval"
  },
  "zh": {
    "actual": "实际",
    "forecast": "预测",
    "band": "80% 置信区间"
  },
  "ja": {
    "actual": "実績",
    "forecast": "予測",
    "band": "80% 予測区間"
  },
  "fr": {
    "actual": "Réel",
    "forecast": "Prévision",
    "band": "Intervalle à 80 %"
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

## Example: 日ごとの最低・最高気温

1 年分の日ごとの気温の幅と平年値：ツールチップに帯の両端が表示され、Ctrl / ⌘ + ホイールで 1 日単位まで拡大できます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRangeAreaChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRangeAreaChart],
  template: `
@let t = labels[language()];
@let d = days[language()];
<mn-range-area-chart
  [series]="[
    { name: t.range, data: [{ x: d[0], y0: 8, y: 16 }, { x: d[1], y0: 9, y: 18 }, { x: d[2], y0: 7, y: 15 }, { x: d[3], y0: 11, y: 21 }, { x: d[4], y0: 13, y: 24 }, { x: d[5], y0: 12, y: 22 }, { x: d[6], y0: 10, y: 19 }] },
    { name: t.mean, type: 'line', data: [{ x: d[0], y: 12 }, { x: d[1], y: 13.5 }, { x: d[2], y: 11 }, { x: d[3], y: 16 }, { x: d[4], y: 18.5 }, { x: d[5], y: 17 }, { x: d[6], y: 14.5 }] }
  ]"
  curve="linear"
  [xAxis]="{ type: 'category' }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "range": "Min – max",
    "mean": "Average"
  },
  "zh": {
    "range": "最低 – 最高",
    "mean": "平均"
  },
  "ja": {
    "range": "最低 – 最高",
    "mean": "平均"
  },
  "fr": {
    "range": "Min – max",
    "mean": "Moyenne"
  }
};
  days = {
  "en": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  "zh": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  "ja": ["月", "火", "水", "木", "金", "土", "日"],
  "fr": ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."]
};
}

```
