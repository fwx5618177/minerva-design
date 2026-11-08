# ヒストグラム

生のサンプルを等幅のビンに分けた分布。数百から数百万の値まで扱えます。

Package: minerva-design@1.23.1

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

リクエスト数

100 万件のリクエストのレイテンシ分布と p50、p95、p99

ビン分けのルール

自動

Sturges

10 ビン

40 ビン

学生

得点

試験の得点分布

顧客

年齢

顧客の年齢分布

対照群

新しいオンボーディング

セッション時間（分）

A/B テストの 2 群のセッション時間

正規分布の当てはめ

下限規格

上限規格

基準値

工具調整済み

平均 {{mean}}、σ {{sd}}、Cpk {{cpk}}、公差外 {{ppm}} ppm:

工程能力あり

工程能力不足

部品

直径

規格限界と当てはめた正規曲線を含むシャフト直径の分布

送料無料

中央値 {{value}}

p99 {{value}}

注文の {{share}} が送料無料の基準 {{threshold}} に達しています。

注文

注文金額（対数スケール）

対数スケールでの注文金額の分布

一時停止

再開

リセット

{{share}} の電話に {{target}} 以内で応答、p90 は {{p90}}:

目標達成

目標未達

電話

待ち時間

目標

p90

直近 600 件のサポート電話の待ち時間のライブ分布

従業員の {{share}}

従業員 {{value}} 人（{{share}}）

クリックで累積割合を表示

棒をクリックすると、通勤時間がそれ以下の従業員の割合を表示します。

従業員の {{share}}（{{employees}} 人）の通勤時間は {{limit}} 以下です。

従業員

片道の通勤時間

従業員の通勤時間の分布

## HistogramChart

Support: beta

Native Angular: MnHistogramChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnHistogramChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "values",
    "typeText": "ArrayLike<number>",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "bins",
    "typeText": "HistogramBinning | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "domain",
    "typeText": "readonly [number, number] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "nice",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "formatBin",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: レイテンシの分布

100 万件のリクエストのレイテンシを数ミリ秒でビン分け。quantiles で正確な p50、p95、p99 を求め、x の参照線として描きます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHistogramChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHistogramChart],
  template: `
@let t = labels[language()];
<mn-histogram-chart
  [values]="latency"
  [name]="t.requests"
  [xAxis]="{ title: t.ms }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  latency = Array.from({ length: 5000 }, (_, i) => Math.round(Math.exp(4.8 + 0.35 * Math.sqrt(-2 * Math.log(1 - (Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1))) * Math.cos(2 * Math.PI * (Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1)))));
  labels = {
  "en": {
    "requests": "Requests",
    "ms": "Response time (ms)"
  },
  "zh": {
    "requests": "请求数",
    "ms": "响应时间（毫秒）"
  },
  "ja": {
    "requests": "リクエスト数",
    "ms": "応答時間（ms）"
  },
  "fr": {
    "requests": "Requêtes",
    "ms": "Temps de réponse (ms)"
  }
};
}

```

## Example: ビン分けのルール

bins には数またはルールを指定：auto（外れ値に強い Freedman-Diaconis）、sturges（log2 n + 1）、固定数。ビンが十分あると 2 つの水準の群が見えます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHistogramChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHistogramChart],
  template: `
@let t = labels[language()];
<div style="display: flex; gap: 8px; align-items: center">
  <span>{{ t.bins }}</span>
  <button type="button" (click)="bins = 'sturges'">Sturges</button>
  <button type="button" (click)="bins = 10">10</button>
  <button type="button" (click)="bins = 40">40</button>
</div>
<mn-histogram-chart
  [values]="ages"
  [bins]="bins"
  [name]="t.count"
  [xAxis]="{ title: t.age }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  bins: number | 'sturges' = "sturges";
  ages = Array.from({ length: 2000 }, (_, i) => Math.round((i % 3 ? 42 : 22) + ((Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1) + (Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1) - 1) * (i % 3 ? 16 : 6)));
  labels = {
  "en": {
    "count": "Count",
    "bins": "Bins:",
    "age": "Age"
  },
  "zh": {
    "count": "人数",
    "bins": "分箱：",
    "age": "年龄"
  },
  "ja": {
    "count": "人数",
    "bins": "ビン：",
    "age": "年齢"
  },
  "fr": {
    "count": "Effectif",
    "bins": "Classes :",
    "age": "Âge"
  }
};
}

```
