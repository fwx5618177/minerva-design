# 板ヒートマップ

Bookmap 風の流動性ヒートマップ：時間と価格ごとの指値量を GPU で描画し、最良気配ライン、出来高に応じた約定バブル、現在の板のプロファイルを重ねます。ズーム・パン・十字カーソルでの読み取りに対応。ストリームは間隔ごとに列を追加し、スライドするウィンドウで表示します。

Package: minerva-design@1.19.3

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 読み方

ヒートマップは板の録画です。各列はある瞬間の板のスナップショットで、左から右へ並び、右端が現在です。

横軸は時刻（右が最新）、縦軸は価格です。任意の位置にホバーすると、クロスヘアがその時刻・価格の注文量を表示します。

セルの色はその時刻・価格に置かれている注文量です。暗いほどほとんど注文がなく、明るいほど（青 → シアン → 黄 → 白）注文が多くなります。左上の凡例が色に対応する数量の範囲と単位を示します。

明るい水平線は板に残り続ける大口注文（壁）です。線が途切れた所で注文は取り消されたか約定しました。価格線が壁の終点に届いていれば約定です。

価格に沿う赤と緑の線は最良売り気配と最良買い気配で、その間がスプレッドです。価格軸の塗りつぶした赤・緑のタグは現在の最良売り・買い気配、枠線のタグは直近の約定価格です。

点は約定です。緑は成行買い（売り注文を取る）、赤は成行売り（買い注文に当てる）で、面積はその列の出来高に比例し、大きなバブルは大口約定です。colorConvention="red-up" で 2 色が入れ替わります。

右側のバーは現在の板です。上の赤が売り注文、下の緑が買い注文で、長いほど数量が多く、下の目盛りが数量です。

#### 注目するパターン

支持と抵抗：価格が明るい線に何度も触れて反転するなら、大口注文が価格を受け止めています。

取り消し（見せ板）：価格が近づくと明るい線が消え、そこに約定バブルがない場合、注文は約定ではなく取り消されています。

スイープ：大きなバブルが連続して複数の価格を横切り、価格線が跳ね、通り道の流動性が暗くなります。

薄い流動性：価格の近くの広い暗い領域は注文が少ないことを示し、価格はそこを素早く通過できます。

BTC/USDT の流動性ヒートマップ

レンダラー：{{value}}

WebGPU

WebGL 2

WebGL

Canvas 2D

相場に追従中

自由表示（ズーム・パン済み）

相場に追従

カラースケール

対数

平方根

線形

コントラスト

×{{value}}

色の慣習

赤が上昇・緑が下落

緑が上昇・赤が下落

ホバー中の列：買い {{buys}} BTC、売り {{sells}} BTC

列にホバーすると出来高を表示します。

行の高さ

価格範囲

{{value}} USDT

自動

板に合わせる

{{time}} · {{price}} · {{size}} BTC {{side}} · 買い {{buys}} BTC、売り {{sells}} BTC

{{low}} – {{high}}

（買い側）

（売り側）

（スプレッド内）

セルにカーソルを合わせると詳細を表示します。

時間窓

ライブフィード

履歴をクリア

{{time}} に一時停止しました。

{{time}} に再開しました。

{{time}} に履歴をクリアしました。

保持している {{history}} のうち {{window}} を表示中。

BTC/USDT

現在値 {{value}}

スプレッド {{value}}

歩み値 {{value}} 件

BTC/USDT の板

BTC/USDT の歩み値

BTC-USD 無期限先物

1枚 = {{value}} BTC

資金調達率 {{rate}}

資金調達率 {{rate}}、{{time}} まで残り {{countdown}}

枚

板

テイカー買い

テイカー売り

BTC-USD 無期限先物の流動性ヒートマップ

{{price}}：板 {{contracts}} 枚（≈ {{notional}}）

ヒートマップにカーソルを合わせると板の枚数と金額を表示します。

## OrderBookHeatmap

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/order-book-heatmap",
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
    "description": "A cell is hovered; detail: { time, price, size, side, buyVolume, sellVolume }, `null` when the pointer left"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend is ready (or fell back after a GPU loss); detail: { renderer }"
  },
  {
    "name": "minerva-follow-change",
    "typeText": "CustomEvent",
    "description": "The view follows the market (`true`) or not after a zoom / pan (`false`); detail: { follow }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: リアルタイムの流動性ヒートマップ

200 ms ごとの新しい板で板の厚みの列を確定し、約定は出来高に応じたバブルで表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/wc/liquidity.html

```html
<minerva-order-book-heatmap id="heatmap"></minerva-order-book-heatmap>

```

### apps/docs/src/docs/pages/order-book-heatmap/wc/liquidity.ts

```tsx
// <minerva-order-book-heatmap>: resting size over time and price, drawn by
// the GPU; the book (`setBook`, with its time) closes a column, trades
// (`addTrades`) are bubbles sized by volume. Zoom or pan to stop following.
import type { MinervaOrderBookHeatmap } from "minerva-design/web-components/order-book";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// a side of the book around a moving mid price, generated deterministically
const side = (mid: number, sign: number, seed: number) => ({
  price: Array.from({ length: 60 }, (_, i) =>
    round(mid + sign * 0.05 * (i + 1)),
  ),
  size: Array.from({ length: 60 }, (_, i) =>
    Math.round(
      2 +
        fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
        (i % 13 === 12 ? 80 : 0),
    ),
  ),
});
// the book and a trade at a tick (a new tick every 200 ms)
const snapshot = (tick: number) => {
  const mid = round(100 + Math.sin(tick / 40) * 0.6);
  return {
    book: {
      bids: side(mid, -1, tick % 7),
      asks: side(mid, 1, (tick + 3) % 7),
      time: Date.now(),
    },
    trade: {
      time: Date.now(),
      price: mid,
      size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
      side: tick % 3 ? ("buy" as const) : ("sell" as const),
    },
  };
};

export function setup(root: HTMLElement) {
  const heatmap = root.querySelector<MinervaOrderBookHeatmap>("#heatmap")!;
  let tick = 0;
  let timer = 0;
  timer = window.setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    heatmap.setBook(book);
    heatmap.addTrades(trade);
  }, 200);
  return () => window.clearInterval(timer);
}

```

## Example: 赤が上昇の配色・平方根スケール

中国本土の慣習（買いが赤）、平方根のカラースケール、右側の数量プロファイルなし。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/wc/red-up.html

```html
<minerva-order-book-heatmap id="heatmap"></minerva-order-book-heatmap>

```

### apps/docs/src/docs/pages/order-book-heatmap/wc/red-up.ts

```tsx
// `colorConvention: "red-up"` (mainland China): buys in red, sells in
// green; a square-root color scale shows more of the small orders, without
// the size profile on the right.
import type { MinervaOrderBookHeatmap } from "minerva-design/web-components/order-book";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// a side of the book around a moving mid price, generated deterministically
const side = (mid: number, sign: number, seed: number) => ({
  price: Array.from({ length: 60 }, (_, i) =>
    round(mid + sign * 0.05 * (i + 1)),
  ),
  size: Array.from({ length: 60 }, (_, i) =>
    Math.round(
      2 +
        fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
        (i % 13 === 12 ? 80 : 0),
    ),
  ),
});
// the book and a trade at a tick (a new tick every 200 ms)
const snapshot = (tick: number) => {
  const mid = round(100 + Math.sin(tick / 40) * 0.6);
  return {
    book: {
      bids: side(mid, -1, tick % 7),
      asks: side(mid, 1, (tick + 3) % 7),
      time: Date.now(),
    },
    trade: {
      time: Date.now(),
      price: mid,
      size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
      side: tick % 3 ? ("buy" as const) : ("sell" as const),
    },
  };
};

export function setup(root: HTMLElement) {
  const heatmap = root.querySelector<MinervaOrderBookHeatmap>("#heatmap")!;
  heatmap.options = {
    colorConvention: "red-up",
    colorScale: "sqrt",
    profile: false,
  };
  let tick = 0;
  let timer = 0;
  timer = window.setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    heatmap.setBook(book);
    heatmap.addTrades(trade);
  }, 200);
  return () => window.clearInterval(timer);
}

```
