# 板情報

Canvas で描く価格ラダー：スプレッド行の上に売り、下に買い。深度バー、価格のまとめ表示、変化した気配の点滅、大口注文の強調、ホバー時の累計サマリーを備えます。毎秒数百件の更新もフレームごとに 1 回の描画で済みます。

Package: minerva-design@1.21.0

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

BTC/USDT の板

### 板情報

BTC/USDT

価格 (USDT)

数量 (BTC)

累計 (BTC)

更新頻度

{{value}} 回/秒

{{updates}} メッセージ/秒 · 気配の変化 {{levels}} 件/秒

価格の刻み

深度バー

累計

気配ごと

大口注文のしきい値

≥ {{value}} BTC

買い {{price}}：{{size}} BTC、ここまでの累計 {{sum}} BTC

売り {{price}}：{{size}} BTC、ここまでの累計 {{sum}} BTC

気配をクリックして価格を選びます。

表示

両方

買い

売り

色の慣習

赤が上昇・緑が下落

緑が上昇・赤が下落

始値から {{value}}

指値：{{price}}

指値

デプス

BTC/USDT の深度

歩み値

BTC/USDT の歩み値

市場

暗号資産 · BTC/USDT

価格 (USDT)

数量 (BTC)

累計 (BTC)

BTC/USDT の板

株式 · AAPL

価格 (USD)

株数

累計

AAPL の板

FX · EUR/USD

レート

数量 (EUR)

累計 (EUR)

EUR/USD の板

先物 · ES

価格（ポイント）

枚数

累計

E-mini S&P 500 先物の板

{{value}} pips

{{value}} セント

{{value}} ティック

{{value}} USDT

呼値 {{tick}} · スプレッド {{spread}} · {{large}} 以上を強調

大口の壁

新規

取消

約定

{{size}} BTC 以上の壁：待機 {{resting}}、約定 {{filled}}、取消 {{pulled}}（取消率 {{ratio}}）

板の大口の壁を監視中…

買いの壁 {{price}}：{{size}} BTC

売りの壁 {{price}}：{{size}} BTC

{{value}} 後

指値注文

売買

買い

売り

指値 (USDT)

数量 (BTC)

価格と数量を入力するか、気配をクリックしてください。

{{filled}} BTC が即座に約定、平均 {{average}}。

{{filled}} BTC が即座に約定（平均 {{average}}）、残り {{rest}} BTC は {{price}} で待機。

{{price}} で待機、前に {{ahead}} BTC。

{{side}}

{{side}} {{size}} BTC（{{price}}）を発注しました。

{{price}} の注文を取り消しました。

{{side}} {{size}} @ {{price}}

未約定の注文はありません。

注文を取り消す

## OrderBook

Support: beta

Native Angular: MnOrderBook. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnOrderBook"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "lastPrice",
    "typeText": "number | null | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
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
    "typeText": "OrderBookLevelEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "OrderBookLevelEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "levelClick",
    "typeText": "OrderBookLevelEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "OrderBookLevelEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Order book ladder

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnOrderBook, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnOrderBook],
  template: `
@let t = labels[language()];
<mn-order-book
  [book]="book"
  [lastPrice]="100.02"
  [options]="{ largeOrderThreshold: 50 }"
  [height]="380"
  (levelClick)="clicked = t.price + ' ' + $event.price + ' · ' + t.size + ' ' + $event.size"
/>
<output aria-live="polite">{{ clicked || t.hint }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  clicked = "";
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
    "size": "Size",
    "hint": "Click a row"
  },
  "zh": {
    "price": "价格",
    "size": "数量",
    "hint": "点击一行"
  },
  "ja": {
    "price": "価格",
    "size": "数量",
    "hint": "行をクリックします"
  },
  "fr": {
    "price": "Prix",
    "size": "Quantité",
    "hint": "Cliquez sur une ligne"
  }
};
}

```

## Example: 高頻度ストリーム

シミュレーションのマッチングエンジンが毎秒 10〜200 件のメッセージを ref ハンドルに送ります：板は applyDeltas、約定は setLastPrice。変化した気配は点滅します（増加はその側の色、減少はグレー）。各メッセージは配列への書き込み数回だけで、ラダーはフレームごとに 1 回描画し、画面外では止まります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MnOrderBook } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnOrderBook],
  template: `
<mn-order-book
  [book]="feed().book"
  [lastPrice]="feed().last"
  [options]="{ grouping: 0.1 }"
  [height]="380"
/>
  `,
})
export class Example {
  feed = (() => {
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
  const feed = signal({ book: { bids: side(-1, 3), asks: side(1, 4) }, last: 100 });
  let tick = 0;
  const timer = setInterval(() => {
    tick += 1;
    feed.set({
      book: { bids: side(-1, 3 + tick), asks: side(1, 4 + tick) },
      last: round(100 + Math.sin(tick / 5) / 20),
    });
  }, 1000);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return feed;
})();
}

```
