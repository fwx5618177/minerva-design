# テクニカル指標

移動平均、ボリンジャーバンド、VWAP、MACD、RSI、KDJ、ATR、平均足：TradingChart に 1 行で宣言するか、通常の配列や Float64Array の列に対して純粋関数で計算します。

Package: minerva-design@1.20.0

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

#### 宣言的なインジケーター

indicators オプションにインジケーターを順に並べます。移動平均、ボリンジャー・ケルトナー・ドンチャンの各チャネル、VWAP、パラボリック SAR、一目均衡表、スーパートレンドは価格に重ね、出来高（overlay 以外）・MACD・RSI・KDJ・ATR・OBV・CCI・ストキャスティクス RSI・DMI・ウィリアムズ %R・MFI はその下にそれぞれのペインを持ちます。凡例はクロスヘア位置の値を示し、インジケーター名をクリックすると非表示になります。

インジケーターは id を指定しない限り種類とパラメーター（"ma:7"、"macd:12:26:9"）で識別され、indicatorToggle と setIndicatorVisible で使われます。一覧を変えても、変わらなかったインジケーターの計算結果は保持されます。

#### 純粋関数

同じ計算が minerva-design/charts/core からエクスポートされています。通常の配列や型付き配列を受け取り、ウィンドウが埋まるまで NaN の Float64Array を返します。シグナル、スクリーナー、バックテスト、サーバーで、チャートが描くのと同じ値を使えます。

#### 計算の決まり

MA は単純平均、WMA は最新の足に最も重みを置き、EMA は 2 / (期間 + 1) を使い、TradingView と同じく最初のウィンドウの単純平均から始めます。

RSI と ATR はワイルダーの平滑化（1 / 期間）、ボリンジャーバンドは母標準偏差を使います。

KDJ は K と D を 50 から始め、既定では 3 本で平滑化します。J = 3K − 2D は 0〜100 の範囲を外れることがあります。

VWAP は timeZone または utcOffset のタイムゾーンで、毎日（または毎週・毎月・リセットなし）計算し直されます。

ティックごとにチャートが再計算するのは最後の足の値だけなので、100 本でも 100 万本でも更新のコストは同じです。

縮小表示でもインジケーターは全ての足で計算され、ピクセル列ごとの最小値と最大値で描かれるため、100 万本の足でもスパイクが見えます。

一目均衡表の先行スパンは displacement − 1 本先（最新の足の後ろの余白）に、遅行スパンは同じ本数だけ前に描かれます。純粋関数 ichimoku はずらす前の値を返します。

期間

{{period}} 本

Microsoft MSFT

単純・指数・加重移動平均付きの日足チャート

バンドの幅

{{value}} σ

ETH/USDT

ボリンジャーバンド付きの 1 時間足チャート

NVIDIA NVDA

VWAP と出来高付きの 5 営業日分の 5 分足チャート

BTC/USDT

MACD ペイン付きの日足チャート

買われすぎ / 売られすぎ

70 / 30

80 / 20

SOL/USDT

14 本と 6 本の RSI 付きの 4 時間足チャート

CATL 300750

KDJ ペイン付きの日足チャート

買いの損切り · 2 ATR

売りの損切り · 2 ATR

金 XAU/USD

ATR とボラティリティ損切り付きの金の 1 時間足チャート

チャートスタイル

平均足

ローソク足

ADA/USDT

平均足の 4 時間足チャート

上昇トレンドが {{count}} 本継続中

上昇トレンドが {{count}} 本継続中

下降トレンドが {{count}} 本継続中

下降トレンドが {{count}} 本継続中

買

売

EMA クロスのシグナルと RSI 付きの 1 時間足チャート

決済済み {{trades}} 件 · 勝ち {{wins}} 件 · 合計 {{result}}

エクソンモービル XOM

createTradingChart で描いた日足チャート

50 日平均を計算するには足がまだ足りません

終値は 50 日平均より {{value}} 上

終値は 50 日平均より {{value}} 下

雲

日経平均

一目均衡表付きの日経平均日足チャート

バンドの距離

{{value}} ATR

パラボリック SAR

スーパートレンドと反転点付きの SOL/USDT 4 時間足チャート

チャネル

ケルトナー

ドンチャン

ボリンジャー

ユーロ/ドル

価格チャネル付きの EUR/USD 1 時間足チャート

オシレーター

ストキャス RSI

CCI

ウィリアムズ %R

MFI

オシレーターのペイン付き BTC/USDT 4 時間足チャート

ADX {{adx}}：強いトレンド、{{direction}}

ADX {{adx}}：トレンドは弱く、現在は{{direction}}

上昇（+DI が −DI より上）

下落（−DI が +DI より上）

DMI ペイン付きの MSFT 日足チャート

アップル AAPL

出来高と OBV 付きの AAPL 日足チャート

トレンド転換：{{count}} 回

ダイバージェンス

すべて

強気

弱気

RSI ダイバージェンスを描いた SOL/USDT の4時間足チャート

強気 {{bullish}} 件、弱気 {{bearish}} 件のダイバージェンス。

最新：{{kind}}、{{date}}。

EMA {{period}} · {{frame}}

1時間足、4時間足、日足の20本 EMA を示した ETH/USDT の1時間足チャート

{{time}} · 終値 {{close}}

{{frame}}：{{value}} より上

{{frame}}：{{value}} より下

{{frame}}：足が不足

すべての時間足が上向き

すべての時間足が下向き

時間足の方向が一致しない

インジケーター・スクリーナー

銘柄

終値

1日

RSI 14

MACD ヒスト

ATR %

SMA 50 比

シグナル

買われ過ぎ

売られ過ぎ

上昇トレンド

下降トレンド

中立

{{name}}：{{signal}}、50日平均から {{distance}}。

50日平均、RSI、MACD を示した {{name}} の日足チャート

```tsx
<TradingChart
  bars={bars}
  indicators={[
    { type: "ma", period: 7 },          // over the price
    { type: "boll", period: 20, multiplier: 2 },
    { type: "volume", maPeriod: 20 },   // panes below, in this order
    { type: "macd", fast: 12, slow: 26, signal: 9 },
    { type: "rsi", period: 14, overbought: 70, oversold: 30 },
  ]}
/>
```

```tsx
import { ema, macd, rsi, resampleBars } from "minerva-design/charts/core";

const close = bars.map((bar) => bar.close);  // or a Float64Array column
const fast = ema(close, 9);                   // Float64Array, NaN while warming up
const { histogram } = macd(close, 12, 26, 9);
const hourly = resampleBars(minuteBars, "1H");
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 純粋関数で求めるボリンジャーバンド

minerva-design/charts/core の bollinger() と ema() で系列を計算し、レンジエリアチャートで描画します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/wc/bollinger.html

```html
<minerva-range-area-chart
  id="bands"
  curve="linear"
  height="320"
></minerva-range-area-chart>

```

### apps/docs/src/docs/pages/technical-indicators/wc/bollinger.ts

```tsx
// The indicator functions of minerva-design/charts/core are pure: any
// chart can draw them. Bollinger bands as a range area, the moving
// averages and the close as lines.
import { bollinger, ema } from "minerva-design/charts/core";
import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    close: "Close",
    band: "Bollinger (20, 2)",
    middle: "SMA 20",
    slow: "EMA 50",
  },
  zh: {
    close: "收盘价",
    band: "布林带 (20, 2)",
    middle: "SMA 20",
    slow: "EMA 50",
  },
  ja: {
    close: "終値",
    band: "ボリンジャーバンド (20, 2)",
    middle: "SMA 20",
    slow: "EMA 50",
  },
  fr: {
    close: "Clôture",
    band: "Bollinger (20, 2)",
    middle: "MMS 20",
    slow: "MME 50",
  },
};

// 200 daily closes, generated deterministically
const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
let price = 100;
const TIMES: number[] = [];
const CLOSES = Array.from({ length: 200 }, (_, i) => {
  TIMES.push(Date.UTC(2025, 2, 3) + i * 86_400_000);
  price = round(
    price * (1 + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.48) / 25),
  );
  return price;
});

const BANDS = bollinger(CLOSES, 20, 2);
const SLOW = ema(CLOSES, 50);
// the first values of an indicator are NaN (not enough data yet): no point
const points = (values: ArrayLike<number>) =>
  TIMES.map((x, i) => ({
    x,
    y: Number.isNaN(values[i]) ? null : round(values[i]),
  }));

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaRangeAreaChart>("#bands")!;
  chart.series = [
    {
      name: text.band,
      opacity: 0.18,
      data: TIMES.map((x, i) =>
        Number.isNaN(BANDS.upper[i])
          ? { x, y: null }
          : { x, y0: round(BANDS.lower[i]), y: round(BANDS.upper[i]) },
      ),
    },
    { name: text.close, type: "line", data: points(CLOSES) },
    {
      name: text.middle,
      type: "line",
      lineWidth: 1,
      data: points(BANDS.middle),
    },
    { name: text.slow, type: "line", lineWidth: 1, data: points(SLOW) },
  ];
  chart.options = { xAxis: { type: "time" }, crosshair: true };
}

```

## Example: インジケーターのペイン

トレーディングチャートがボリンジャーバンド・MACD・RSI を計算し、macd() でチャート外に最新値を表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/wc/panes.html

```html
<div style="display: grid; gap: 8px">
  <minerva-trading-chart
    id="panes"
    symbol="ACME"
    height="440"
  ></minerva-trading-chart>
  <output id="last" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/technical-indicators/wc/panes.ts

```tsx
// The same indicators computed by the trading chart itself (`indicators`):
// Bollinger bands over the price, MACD and RSI in panes; `macd()` of
// minerva-design/charts/core gives the last values outside of the chart.
import { macd } from "minerva-design/charts/core";
import type { MinervaTradingChart } from "minerva-design/web-components/trading-chart";

const TEXT = {
  en: { macd: "MACD (12, 26, 9)" },
  zh: { macd: "MACD 指标 (12, 26, 9)" },
  ja: { macd: "MACD (12, 26, 9)" },
  fr: { macd: "MACD (12, 26, 9)" },
};

// 240 daily bars: a random walk, generated deterministically
const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
let close = 100;
const BARS = Array.from({ length: 240 }, (_, i) => {
  const open = close;
  close = round(
    open * (1 + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.48) / 25),
  );
  const spread = (open * fraction(Math.sin(i * 78.233) * 43758.5453)) / 60;
  return {
    time: Date.UTC(2025, 2, 3) + i * 86_400_000,
    open,
    high: round(Math.max(open, close) + spread),
    low: round(Math.min(open, close) - spread),
    close,
    volume: Math.round(1000 + fraction(Math.sin(i * 3.7) * 9999) * 4000),
  };
});

const MACD = macd(BARS.map((bar) => bar.close));
const LAST = BARS.length - 1;

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaTradingChart>("#panes")!;
  const last = root.querySelector<HTMLOutputElement>("#last")!;
  chart.bars = BARS;
  chart.indicators = [
    { type: "boll", period: 20, multiplier: 2 },
    { type: "macd" },
    { type: "rsi", period: 14 },
  ];
  last.textContent = `${text.macd}: ${MACD.macd[LAST].toFixed(2)} / ${MACD.signal[LAST].toFixed(2)}`;
}

```
