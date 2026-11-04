# デプスチャート

板の累積深度：仲値を挟んだ階段状の買い・売りエリア、ホバーすると両側の数量・金額・平均価格を鏡映表示し、仲値を中心にズームでき、毎秒数百件の差分更新もなめらかに補間します。

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

BTC/USDT の板の深度

リアルタイム配信

表示範囲

自動

±{{value}}

累積方法

数量 (BTC)

金額 (USDT)

曲線

階段

直線

Ctrl/⌘ + ホイールまたはピンチで仲値を中心にズーム、ダブルクリックで戻します。

{{value}} にズーム中

自分の買い

自分の売り

清算価格

色の慣習

赤が上昇・緑が下落

緑が上昇・赤が下落

{{amount}} BTC（{{total}}）を買うと {{price}} までの売り板を約定し、仲値より {{slippage}} 上、平均価格は {{average}} です。

{{amount}} BTC（{{total}}）を売ると {{price}} までの買い板を約定し、仲値より {{slippage}} 下、平均価格は {{average}} です。

曲線にホバーして成行注文のコストを見積もります。

売買

成行買い

成行売り

注文数量

{{value}} BTC

平均約定

最終約定

{{size}} BTC は {{levels}} 段で約定：平均 {{average}}、最終約定 {{worst}}、合計 {{cost}}、仲値から {{slippage}} bp。

このサイドには {{filled}} BTC しかありません（注文は {{size}} BTC）。{{levels}} 段すべてを {{worst}} まで食い尽くします。

集計範囲

{{band}} 以内：買い {{bids}} BTC、売り {{asks}} BTC、偏り {{imbalance}} · スプレッド {{spread}}（{{spreadBp}} bp）

最初の読み取りを待っています…

金額を累積（価格 × 株数）

金額（USD）

株数

ACME 株の板の深さ

統合

取引所 {{name}}

取引所

最良買い気配

最良売り気配

±0.1% 以内の BTC

{{value}}（{{share}}）

BTC/USDT の深さ、{{name}}

取引所別の最良気配と流動性

## DepthChart

Support: beta

Native Angular: MnDepthChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDepthChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "book",
    "typeText": "OrderBookSnapshot | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
  {
    "name": "options",
    "typeText": "O | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "DepthChartHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "DepthChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "depthClick",
    "typeText": "DepthChartHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "DepthChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rangeChange",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "number",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Cumulative depth

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDepthChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDepthChart],
  template: `
@let t = labels[language()];
<mn-depth-chart [book]="book" (hover)="hovered = $event ? t.price + ' ' + $event.price + ' · ' + t.total + ' ' + $event.amount : ''" />
<output aria-live="polite">{{ hovered || t.hint }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  hovered = "";
  book = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of a book around 100, generated deterministically: columns of
  // prices and sizes, a large order every 9 levels
  const side = (sign: number, seed: number) => ({
    price: Array.from({ length: 40 }, (_, i) => round(100 + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 40 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 9 === 8 ? 60 : 0)),
    ),
  });
  return { bids: side(-1, 1), asks: side(1, 2) };
})();
  labels = {
  "en": {
    "price": "Price",
    "total": "Total",
    "hint": "Hover the curves"
  },
  "zh": {
    "price": "价格",
    "total": "累计",
    "hint": "将指针悬停在曲线上"
  },
  "ja": {
    "price": "価格",
    "total": "累計",
    "hint": "曲線にカーソルを合わせます"
  },
  "fr": {
    "price": "Prix",
    "total": "Cumul",
    "hint": "Survolez les courbes"
  }
};
}

```

## Example: リアルタイム

シミュレーションのマッチングエンジンから毎秒約 100 件の差分を ref ハンドル（applyDeltas：価格 → 数量、0 で気配を削除）に送ります。React は再レンダリングしません。チャートが 1 フレームにまとめて描画し、曲線と目盛りを補間します。画面外では描画を止めます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MnDepthChart } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDepthChart],
  template: `
<mn-depth-chart [book]="book()" [options]="{ range: 0.012 }" [height]="280" />
  `,
})
export class Example {
  book = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of a book around 100, generated deterministically: columns of
  // prices and sizes, a large order every 9 levels
  const side = (sign: number, seed: number) => ({
    price: Array.from({ length: 40 }, (_, i) => round(100 + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 40 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 9 === 8 ? 60 : 0)),
    ),
  });
  const book = signal({ bids: side(-1, 3), asks: side(1, 4) });
  let tick = 0;
  const timer = setInterval(() => {
    tick += 1;
    book.set({ bids: side(-1, 3 + tick), asks: side(1, 4 + tick) });
  }, 1000);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return book;
})();
}

```
