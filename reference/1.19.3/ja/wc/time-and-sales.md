# 歩み値

歩み値：最新の約定が上から滑り込んで点滅し、大口約定は太字と色で強調、同一ミリ秒のスイープはまとめられ、数量でのフィルターやホバー中の一時停止に対応します。型付き配列のリングバッファに 20 万件を保持し、見えている行だけを描画します。

Package: minerva-design@1.19.3

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/time-and-sales",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "trades",
    "typeText": "Trades | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "TimeAndSalesOptions | undefined",
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
    "description": "A row is hovered; detail: { trade, count, index }, `null` when the pointer left"
  },
  {
    "name": "minerva-trade-click",
    "typeText": "CustomEvent",
    "description": "A row was clicked, tapped or activated with Enter; detail: { trade, count, index }"
  },
  {
    "name": "minerva-pause",
    "typeText": "CustomEvent",
    "description": "The tape paused (pointer over it, scrolled down) or resumed; detail: { paused }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 集約した歩み値・大口約定

2,000 件の約定のうち同じ方向・価格の連続約定を集約し、小口を非表示にします。行をクリックしてください。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/wc/large-trades.html

```html
<div style="display: grid; gap: 8px">
  <minerva-time-and-sales id="trades" height="300"></minerva-time-and-sales>
  <output id="trade" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/time-and-sales/wc/large-trades.ts

```tsx
// 2,000 trades, virtualized: consecutive trades of the same side and price
// are merged (`aggregate`), small ones hidden (`minSize`), large ones
// highlighted; minerva-trade-click reports the clicked row.
import type {
  MinervaTimeAndSales,
  TimeAndSalesRowEvent,
} from "minerva-design/web-components/order-book";

const TEXT = {
  en: { hint: "Click a trade", size: "lots" },
  zh: { hint: "点击一笔成交", size: "手" },
  ja: { hint: "約定をクリックします", size: "ロット" },
  fr: { hint: "Cliquez sur une transaction", size: "lots" },
};

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// the trade of a tick: around 100, mostly small, sometimes large
const trade = (tick: number) => ({
  time: Date.UTC(2026, 9, 30, 9, 30) + tick * 250,
  price: round(
    100 + Math.sin(tick / 30) / 4 + fraction(Math.sin(tick * 3.3) * 999) / 20,
  ),
  size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) ** 4 * 40),
  side:
    fraction(Math.sin(tick * 4.7) * 43758.5453) > 0.45
      ? ("buy" as const)
      : ("sell" as const),
});

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const tape = root.querySelector<MinervaTimeAndSales>("#trades")!;
  const output = root.querySelector<HTMLOutputElement>("#trade")!;
  tape.trades = Array.from({ length: 2000 }, (_, i) => trade(i));
  tape.options = {
    aggregate: true,
    minSize: 2,
    largeTradeThreshold: 25,
    columns: ["time", "side", "price", "size"],
  };
  output.textContent = text.hint;
  const onClick = (event: Event) => {
    const row = (event as CustomEvent<TimeAndSalesRowEvent>).detail;
    output.textContent = `${row.trade.price} × ${row.trade.size} ${text.size} (${row.count})`;
  };
  tape.addEventListener("minerva-trade-click", onClick);
  return () => tape.removeEventListener("minerva-trade-click", onClick);
}

```

## Example: リアルタイムの歩み値

250 ms ごとの約定が上に追加され、大口約定を強調します。カーソルを合わせると一時停止し、新しい約定を数えます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/wc/tape.html

```html
<minerva-time-and-sales id="tape" height="320"></minerva-time-and-sales>

```

### apps/docs/src/docs/pages/time-and-sales/wc/tape.ts

```tsx
// <minerva-time-and-sales>: the newest trade on top (`addTrades`), large
// trades highlighted; hovering pauses the tape, new trades are counted.
import type { MinervaTimeAndSales } from "minerva-design/web-components/order-book";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// the trade of a tick: around 100, mostly small, sometimes large
const trade = (tick: number) => ({
  time: Date.UTC(2026, 9, 30, 9, 30) + tick * 250,
  price: round(
    100 + Math.sin(tick / 30) / 4 + fraction(Math.sin(tick * 3.3) * 999) / 20,
  ),
  size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) ** 4 * 40),
  side:
    fraction(Math.sin(tick * 4.7) * 43758.5453) > 0.45
      ? ("buy" as const)
      : ("sell" as const),
});

export function setup(root: HTMLElement) {
  const tape = root.querySelector<MinervaTimeAndSales>("#tape")!;
  tape.trades = Array.from({ length: 40 }, (_, i) => trade(i));
  tape.options = { largeTradeThreshold: 20 };
  let tick = 40;
  let timer = 0;
  timer = window.setInterval(() => {
    tick += 1;
    tape.addTrades(trade(tick));
  }, 250);
  return () => window.clearInterval(timer);
}

```
