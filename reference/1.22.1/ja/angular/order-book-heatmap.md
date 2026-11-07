# 板ヒートマップ

Bookmap 風の流動性ヒートマップ：時間と価格ごとの指値量を GPU で描画し、最良気配ライン、出来高に応じた約定バブル、現在の板のプロファイルを重ねます。ズーム・パン・十字カーソルでの読み取りに対応。ストリームは間隔ごとに列を追加し、スライドするウィンドウで表示します。

Package: minerva-design@1.22.1

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

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

ローソク足：実際の OHLC データを、同じミリ秒時刻軸と価格軸に渡します。欠損区間は空白を保ち、注文板から架空の約定を生成しません。最新価格線は新しい約定または新しい足の終値を使います。

履歴ナビゲーション：ズーム・パンで追従を停止します。保持された時間範囲をナビゲーターで選び、リセットで最新市場に戻ります。getView / setView と viewChange は同じビューポートを共有します。

強度フィルター：intensityRange は色変換後の 0–1 表示区間です。元の指値量、ツールチップの値、自動色基準は変わりません。

データの意味

このコンポーネントは指値流動性と提供された約定 OHLC を表示します。例は再現可能な模擬マッチングです。清算ヒートマップには独立した清算データが必要で、指値量を清算量とはみなしません。

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

シミュレーション市場

約定ローソク足

2秒足は固定シードのマッチングエンジンの約定を集計します。約定のない期間は補完せず、指値注文を足に変換しません。

表示する強度範囲

板の流動性の正規化された色強度を絞り込みます。表示だけが変わり、注文数量や約定量は変わりません。

保持した約定履歴

範囲ハンドルで保持した履歴を確認できます。市場に追従すると最新時刻と価格の自動中央表示に戻ります。

流動性ターミナル

最新約定価格

買い板の厚さ

売り板の厚さ

板の偏り

最大買い注文

最大売り注文

パレット

オーシャン

エンバー

表示をリセット

現在の注文板

固定シードのシミュレーションであり、外部取引所の配信ではありません。6つの指標、約定足、板は同じマッチングエンジンを使用します。指標は毎秒更新し、板は独立して更新します。

約定足付きの模擬流動性

強度フィルター付きの模擬流動性

操作可能な模擬流動性履歴

模擬 BTC USDT 流動性ターミナル

現在の模擬 BTC USDT 注文板

## OrderBookHeatmap

Support: beta

Native Angular: MnOrderBookHeatmap. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnOrderBookHeatmap"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "bars",
    "typeText": "TradingBarsInput | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
  {
    "name": "trades",
    "typeText": "readonly MarketTrade[] | undefined",
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
    "typeText": "OrderBookHeatmapHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "OrderBookHeatmapHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "followChange",
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
  },
  {
    "name": "viewChange",
    "typeText": "OrderBookHeatmapViewData",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "OrderBookHeatmapViewData",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: ローソク足と履歴ナビゲーション

約定をOHLC足に集計し、板の流動性に重ねます。保持した履歴を選び、市場への追従に戻せます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, viewChild, effect, untracked } from '@angular/core';
import { MnOrderBookHeatmap, MnButton, MnSlider, injectMinerva } from 'minerva-design/angular';
import { MarketTrade, OrderBookSnapshot, TradingBar } from 'minerva-design/charts/core';

@Component({
  selector: 'app-example',
  imports: [MnOrderBookHeatmap, MnButton, MnSlider],
  template: `
@let t = labels[language()];
<div style="display:grid;gap:12px;width:100%">
<p>{{t.source}}</p>
<div style="display:flex;gap:8px;flex-wrap:wrap">
<button mnButton size="small" variant="outline" (click)="show(10)">{{t.latest}}</button>
<button mnButton size="small" variant="outline" (click)="show(30)">{{t.full}}</button>
<button mnButton size="small" (click)="heatmap.resetView()">{{t.follow}}</button>
</div>
<mn-slider [attr.aria-label]="t.minimum" [value]="minimum" (valueChange)="filter($event)" [min]="0" [max]="90" [step]="5" showValue style="max-width:320px"/>
<mn-order-book-heatmap #heatmap [height]="400" [options]="{ interval:250, window:30000, history:60000, maxBars:30, maxColumns:240, intensityRange:[minimum / 100, 1] }" (viewChange)="viewState = $event"/>
<output aria-live="polite">{{viewState?.view?.follow ? t.following : t.manual}} · {{t.minimum}} {{minimum}}% · {{viewState ? ((viewState.view.time[1] - viewState.view.time[0]) / 1000).toFixed(0) : 30}} {{t.visible}}</output>
</div>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  minimum = 0;
  labels = {
  "en": {
    "source": "Simulated resting book · 30 supplied OHLC candles aggregated from simulated executions.",
    "latest": "Latest 10s",
    "full": "Full 30s",
    "follow": "Follow market",
    "following": "Following market",
    "manual": "Manual view",
    "minimum": "Minimum liquidity intensity (%)",
    "visible": "s visible"
  },
  "zh": {
    "source": "模拟挂单簿 · 显式传入 30 根由模拟成交聚合的 OHLC K 线。",
    "latest": "最近 10 秒",
    "full": "完整 30 秒",
    "follow": "跟随行情",
    "following": "正在跟随行情",
    "manual": "手动视图",
    "minimum": "最低流动性强度（%）",
    "visible": "秒可见"
  },
  "ja": {
    "source": "模擬指値注文板 · 模擬約定から集計した OHLC ローソク足 30 本を明示的に入力。",
    "latest": "直近 10 秒",
    "full": "全 30 秒",
    "follow": "相場に追従",
    "following": "相場に追従中",
    "manual": "手動表示",
    "minimum": "流動性強度の下限（%）",
    "visible": "秒を表示"
  },
  "fr": {
    "source": "Carnet d’ordres simulé · 30 bougies OHLC fournies, agrégées à partir d’exécutions simulées.",
    "latest": "10 dernières s",
    "full": "30 s complètes",
    "follow": "Suivre le marché",
    "following": "Suivi du marché",
    "manual": "Vue manuelle",
    "minimum": "Intensité minimale de liquidité (%)",
    "visible": "s visibles"
  }
};
  viewState = null as import("minerva-design/charts/core").OrderBookHeatmapViewData | null;
  filter = (value: number | [number, number]) => { this.minimum = typeof value === 'number' ? value : value[0]; };
  chart = viewChild<import('minerva-design/angular').MnOrderBookHeatmap>('heatmap');
  history = (() => {
  const end = Math.floor(Date.now() / 1000) * 1000;
  const start = end - 30_000;
  const trades: MarketTrade[] = [];
  const books: OrderBookSnapshot[] = [];
  const bars: TradingBar[] = [];
  const round = (value: number) => Math.round(value * 100) / 100;
  for (let i = 0; i < 120; i += 1) {
    const time = start + i * 250;
    const price = round(100 + Math.sin(i / 11) * 0.7 + Math.sin(i * 1.7) * 0.12);
    const size = 1 + (i * 7 % 9);
    trades.push({ time, price, size, side: i % 3 ? "buy" : "sell" });
    const side = (sign: number) => Array.from({ length: 36 }, (_, level) =>
      [round(price + sign * (level + 1) * 0.05), 2 + ((level * 13 + i * 7) % 19) + (level % 11 === 0 ? 65 : 0)] as [number, number]);
    books.push({ time, bids: side(-1), asks: side(1) });
    const bucket = Math.floor(i / 4);
    if (i % 4 === 0) bars.push({ time: start + bucket * 1000, open: price, high: price, low: price, close: price, volume: size });
    else {
      const bar = bars[bucket];
      bar.high = Math.max(bar.high, price); bar.low = Math.min(bar.low, price);
      bar.close = price; bar.volume = (bar.volume ?? 0) + size;
    }
  }
  return { start, end, trades, books, bars };
})();
  show = (seconds: number) => this.chart()?.setView({ time: [this.history.end - seconds * 1000, this.history.end], price: [98, 102] });
  initialize = effect(() => {
  const heatmap = this.chart();
  if (!heatmap?.instance()) return;
  // instance is a public readiness signal; the engine is created after render.
  untracked(() => {
    for (const book of this.history.books) heatmap.setBook(book);
    heatmap.addTrades(this.history.trades);
    heatmap.setBars(this.history.bars);
    this.show(30);
  });
});
}

```

## Example: Live liquidity heatmap

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MnOrderBookHeatmap } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnOrderBookHeatmap],
  template: `
<mn-order-book-heatmap [book]="feed().book" [trades]="feed().trades" />
  `,
})
export class Example {
  feed = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of the book around a moving mid price, generated deterministically
  const side = (mid: number, sign: number, seed: number) => ({
    price: Array.from({ length: 60 }, (_, i) => round(mid + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 60 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 13 === 12 ? 80 : 0)),
    ),
  });
  // the book and a trade at a tick (a new tick every 200 ms)
  const snapshot = (tick: number) => {
    const mid = round(100 + Math.sin(tick / 40) * 0.6);
    return {
      book: { bids: side(mid, -1, tick % 7), asks: side(mid, 1, (tick + 3) % 7), time: Date.now() },
      trade: {
        time: Date.now(),
        price: mid,
        size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
        side: tick % 3 ? ("buy" as const) : ("sell" as const),
      },
    };
  };
  const first = snapshot(0);
  const feed = signal({ book: first.book, trades: [first.trade] });
  let tick = 0;
  const timer = setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    feed.update(({ trades }) => ({ book, trades: [...trades, trade] }));
  }, 200);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return feed;
})();
}

```

## Example: 赤が上昇

colorConvention="red-up"：買いのバブルと最良買い気配ラインを赤、売りと最良売り気配ラインを緑で表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MnOrderBookHeatmap } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnOrderBookHeatmap],
  template: `
<mn-order-book-heatmap [book]="feed().book" [trades]="feed().trades" [options]="{ colorConvention: 'red-up', colorScale: 'sqrt', profile: false }" />
  `,
})
export class Example {
  feed = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of the book around a moving mid price, generated deterministically
  const side = (mid: number, sign: number, seed: number) => ({
    price: Array.from({ length: 60 }, (_, i) => round(mid + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 60 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 13 === 12 ? 80 : 0)),
    ),
  });
  // the book and a trade at a tick (a new tick every 200 ms)
  const snapshot = (tick: number) => {
    const mid = round(100 + Math.sin(tick / 40) * 0.6);
    return {
      book: { bids: side(mid, -1, tick % 7), asks: side(mid, 1, (tick + 3) % 7), time: Date.now() },
      trade: {
        time: Date.now(),
        price: mid,
        size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
        side: tick % 3 ? ("buy" as const) : ("sell" as const),
      },
    };
  };
  const first = snapshot(0);
  const feed = signal({ book: first.book, trades: [first.trade] });
  let tick = 0;
  const timer = setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    feed.update(({ trades }) => ({ book, trades: [...trades, trade] }));
  }, 200);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return feed;
})();
}

```
