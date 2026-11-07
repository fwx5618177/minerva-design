# 板情報

Canvas で描く価格ラダー：スプレッド行の上に売り、下に買い。深度バー、価格のまとめ表示、変化した気配の点滅、大口注文の強調、ホバー時の累計サマリーを備えます。毎秒数百件の更新もフレームごとに 1 回の描画で済みます。

Package: minerva-design@1.22.3

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/order-book",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "lastPrice",
    "typeText": "number | null | undefined",
    "attribute": "last-price",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "options",
    "typeText": "O | undefined",
    "required": false
  },
  {
    "name": "book",
    "typeText": "OrderBookSnapshot | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "A row is hovered; detail: { side, index, price, size, sum, notional, average }, `null` when the pointer left"
  },
  {
    "name": "minerva-level-click",
    "typeText": "CustomEvent",
    "description": "A row was clicked, tapped or activated with Enter; detail: { side, index, price, size, sum, notional, average }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 板（ラダー）

スプレッド行の上に売り、下に買いを表示し、大口注文を強調します。行をクリックすると価格と数量を表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/order-book/wc/ladder.html

```html
<div style="display: grid; gap: 8px">
  <minerva-order-book
    id="ladder"
    last-price="100.02"
    height="380"
  ></minerva-order-book>
  <output id="level" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/order-book/wc/ladder.ts

```tsx
// <minerva-order-book>: asks above the spread row, bids below, depth bars
// and a large order highlight; minerva-level-click reports the clicked row
// (e.g. to fill a price in an order form).
import type {
  MinervaOrderBook,
  OrderBookLevelEvent,
} from "minerva-design/web-components/order-book";

const TEXT = {
  en: { price: "Price", size: "Size", hint: "Click a row" },
  zh: { price: "价格", size: "数量", hint: "点击一行" },
  ja: { price: "価格", size: "数量", hint: "行をクリックします" },
  fr: { price: "Prix", size: "Quantité", hint: "Cliquez sur une ligne" },
};

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// a side of a book around 100, generated deterministically: columns of
// prices and sizes, a large order every 9 levels
const side = (sign: number, seed: number) => ({
  price: Array.from({ length: 40 }, (_, i) =>
    round(100 + sign * 0.05 * (i + 1)),
  ),
  size: Array.from({ length: 40 }, (_, i) =>
    Math.round(
      2 +
        fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
        (i % 9 === 8 ? 60 : 0),
    ),
  ),
});

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const ladder = root.querySelector<MinervaOrderBook>("#ladder")!;
  const level = root.querySelector<HTMLOutputElement>("#level")!;
  ladder.book = { bids: side(-1, 1), asks: side(1, 2) };
  ladder.options = { largeOrderThreshold: 50 };
  level.textContent = text.hint;
  const onClick = (event: Event) => {
    const row = (event as CustomEvent<OrderBookLevelEvent>).detail;
    level.textContent = `${text.price} ${row.price} · ${text.size} ${row.size}`;
  };
  ladder.addEventListener("minerva-level-click", onClick);
  return () => ladder.removeEventListener("minerva-level-click", onClick);
}

```

## Example: リアルタイムの板

更新された数量が点滅し、最終価格でスプレッド行が動きます。価格帯は 0.1 単位でまとめています。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/order-book/wc/live.html

```html
<minerva-order-book id="live" height="380"></minerva-order-book>

```

### apps/docs/src/docs/pages/order-book/wc/live.ts

```tsx
// A live ladder: `applyDeltas` changes levels (the changed sizes flash),
// `setLastPrice` moves the spread row (colored by its last move); levels
// grouped by 0.1 (`grouping`).
import type { MinervaOrderBook } from "minerva-design/web-components/order-book";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// a side of a book around 100, generated deterministically: columns of
// prices and sizes, a large order every 9 levels
const side = (sign: number, seed: number) => ({
  price: Array.from({ length: 40 }, (_, i) =>
    round(100 + sign * 0.05 * (i + 1)),
  ),
  size: Array.from({ length: 40 }, (_, i) =>
    Math.round(
      2 +
        fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
        (i % 9 === 8 ? 60 : 0),
    ),
  ),
});

// every 400 ms, new sizes for a level of each side (size 0 would remove it)
const delta = (tick: number) => ({
  bids: {
    price: [round(100 - 0.05 * (1 + (tick % 20)))],
    size: [Math.round(2 + fraction(Math.sin(tick * 3.1) * 43758.5453) * 30)],
  },
  asks: {
    price: [round(100 + 0.05 * (1 + ((tick * 7) % 20)))],
    size: [Math.round(2 + fraction(Math.sin(tick * 5.7) * 43758.5453) * 30)],
  },
});

export function setup(root: HTMLElement) {
  const ladder = root.querySelector<MinervaOrderBook>("#live")!;
  ladder.book = { bids: side(-1, 3), asks: side(1, 4) };
  ladder.options = { grouping: 0.1, columns: ["price", "size", "total"] };
  let tick = 0;
  let timer = 0;
  timer = window.setInterval(() => {
    tick += 1;
    ladder.applyDeltas(delta(tick));
    ladder.setLastPrice(round(100 + Math.sin(tick / 5) / 20));
  }, 400);
  return () => window.clearInterval(timer);
}

```
