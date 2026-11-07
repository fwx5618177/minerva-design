# 歩み値

歩み値：最新の約定が上から滑り込んで点滅し、大口約定は太字と色で強調、同一ミリ秒のスイープはまとめられ、数量でのフィルターやホバー中の一時停止に対応します。型付き配列のリングバッファに 20 万件を保持し、見えている行だけを描画します。

Package: minerva-design@1.22.0

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

BTC/USDT の歩み値

{{price}} で {{size}} BTC の買い

{{price}} で {{size}} BTC の売り

ホバー中は一時停止：ポインターを外す（またはバッジをクリック）と再開します。

ホバーで一時停止、行をクリックで約定を選択します。

大口約定のしきい値

≥ {{value}} BTC

最小数量

すべて

同一ミリ秒のスイープをまとめる

ティックで価格を色分け

保持中の行：{{value}}

色の慣習

赤が上昇・緑が下落

緑が上昇・赤が下落

約定を {{value}} 件追加

{{rows}} 件、直近のバッチは {{ms}} ms

ローリング期間

直近 {{value}}

VWAP

買いの比率

買い

売り

{{value}} BTC

約定数 / 秒

最大の約定

買い {{size}}（{{price}}）

売り {{size}}（{{price}}）

買い手が売り気配を買い上がっています。

売り手が買い気配に売り込んでいます。

買いと売りの流れは均衡しています。

約定を待っています…

タイムゾーン

ローカル

UTC

ニューヨーク

東京

時刻（{{zone}}）

{{value}} BTC 以上の大口約定

クリア

開始から {{value}} 件の大口約定

大口約定を待っています…

買い

売り

{{time}} · {{size}} BTC、平均 {{price}}、≈ {{notional}}

{{value}} 件

{{count}} 件 · {{size}} BTC

買い

売り

BTC/USDT の買い約定

BTC/USDT の売り約定

ネットフロー：{{value}} BTC（買い − 売り）

## TimeAndSales

Support: beta

Native Angular: MnTimeAndSales. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTimeAndSales"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "trades",
    "typeText": "readonly MarketTrade[] | undefined",
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
    "typeText": "TimeAndSalesOptions | undefined",
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
    "typeText": "TimeAndSalesRowEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "TimeAndSalesRowEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "tradeClick",
    "typeText": "TimeAndSalesRowEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "TimeAndSalesRowEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pause",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Live tape

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MnTimeAndSales } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTimeAndSales],
  template: `
<mn-time-and-sales [trades]="trades()" [options]="{ largeTradeThreshold: 20 }" [height]="320" />
  `,
})
export class Example {
  trades = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // the trade of a tick: around 100, mostly small, sometimes large
  const trade = (tick: number) => ({
    time: Date.UTC(2026, 9, 30, 9, 30) + tick * 250,
    price: round(100 + Math.sin(tick / 30) / 4 + fraction(Math.sin(tick * 3.3) * 999) / 20),
    size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) ** 4 * 40),
    side: fraction(Math.sin(tick * 4.7) * 43758.5453) > 0.45 ? ("buy" as const) : ("sell" as const),
  });
  const trades = signal(Array.from({ length: 40 }, (_, i) => trade(i)));
  const timer = setInterval(() => {
    trades.update((list) => [...list, trade(list.length)]);
  }, 250);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return trades;
})();
}

```

## Example: 大口約定

largeTradeThreshold に達した約定は太字と色で表示し、しきい値の 8 倍まで色が濃くなります。aggregate は複数の気配をまとめて約定させた 1 つの注文（同じ売買方向・同じミリ秒）を 1 行にまとめます：数量の合計、最後の価格、約定件数。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTimeAndSales, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTimeAndSales],
  template: `
@let t = labels[language()];
<mn-time-and-sales
  [trades]="trades"
  [options]="{ aggregate: true, minSize: 2, largeTradeThreshold: 25, columns: ['time', 'side', 'price', 'size'] }"
  [height]="300"
  (tradeClick)="clicked = $event.trade.price + ' × ' + $event.trade.size + ' ' + t.size + ' (' + $event.count + ')'"
/>
<output aria-live="polite">{{ clicked || t.hint }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  clicked = "";
  trades = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // the trade of a tick: around 100, mostly small, sometimes large
  const trade = (tick: number) => ({
    time: Date.UTC(2026, 9, 30, 9, 30) + tick * 250,
    price: round(100 + Math.sin(tick / 30) / 4 + fraction(Math.sin(tick * 3.3) * 999) / 20),
    size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) ** 4 * 40),
    side: fraction(Math.sin(tick * 4.7) * 43758.5453) > 0.45 ? ("buy" as const) : ("sell" as const),
  });
  return Array.from({ length: 2000 }, (_, i) => trade(i));
})();
  labels = {
  "en": {
    "hint": "Click a trade",
    "size": "lots"
  },
  "zh": {
    "hint": "点击一笔成交",
    "size": "手"
  },
  "ja": {
    "hint": "約定をクリックします",
    "size": "ロット"
  },
  "fr": {
    "hint": "Cliquez sur une transaction",
    "size": "lots"
  }
};
}

```
