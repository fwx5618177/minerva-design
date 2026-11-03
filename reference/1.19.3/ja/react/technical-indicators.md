# テクニカル指標

移動平均、ボリンジャーバンド、VWAP、MACD、RSI、KDJ、ATR、平均足：TradingChart に 1 行で宣言するか、通常の配列や Float64Array の列に対して純粋関数で計算します。

Package: minerva-design@1.19.3

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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

## API

```json
{
  "TradingMovingAverageIndicator": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Moving average of a price over the price bars",
    "kind": "interface",
    "extends": [
      "TradingIndicatorBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"ma\" | \"ema\" | \"wma\"",
        "required": true,
        "description": "`ma` simple, `ema` exponential, `wma` linearly weighted"
      },
      {
        "name": "period",
        "type": "number",
        "required": true,
        "description": "Number of bars averaged"
      },
      {
        "name": "source",
        "type": "TradingPriceSource",
        "required": false,
        "default": "\"close\"",
        "description": "Price averaged"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Line color (any CSS color); a theme color by default"
      },
      {
        "name": "lineWidth",
        "type": "number",
        "required": false,
        "default": "1.5",
        "description": "Line width in pixels"
      }
    ]
  },
  "TradingBollingerIndicator": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Bollinger bands: a moving average and bands a number of standard deviations away",
    "kind": "interface",
    "extends": [
      "TradingIndicatorBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"boll\"",
        "required": true,
        "description": "Bollinger bands"
      },
      {
        "name": "period",
        "type": "number",
        "required": false,
        "default": "20",
        "description": "Number of bars of the average and of the deviation"
      },
      {
        "name": "multiplier",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "Distance of the bands, in standard deviations"
      },
      {
        "name": "colors",
        "type": "readonly string[]",
        "required": false,
        "description": "Colors of the middle, upper and lower lines"
      },
      {
        "name": "fill",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Fills the space between the bands"
      }
    ]
  },
  "TradingVwapIndicator": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Volume-weighted average price, reset at the start of each period",
    "kind": "interface",
    "extends": [
      "TradingIndicatorBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"vwap\"",
        "required": true,
        "description": "Volume-weighted average price"
      },
      {
        "name": "reset",
        "type": "\"day\" | \"week\" | \"month\" | \"none\"",
        "required": false,
        "default": "\"day\"",
        "description": "Period after which the average starts again"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Line color"
      }
    ]
  },
  "TradingVolumeIndicator": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Volume bars colored like their bars, with an optional moving average",
    "kind": "interface",
    "extends": [
      "TradingPaneIndicatorBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"volume\"",
        "required": true,
        "description": "Volume"
      },
      {
        "name": "maPeriod",
        "type": "number",
        "required": false,
        "description": "Period of a moving average of the volume drawn over the bars"
      },
      {
        "name": "overlay",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Draws the volume at the bottom of the price pane instead of its own pane"
      }
    ]
  },
  "TradingMacdIndicator": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Moving average convergence / divergence with its signal line and histogram",
    "kind": "interface",
    "extends": [
      "TradingPaneIndicatorBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"macd\"",
        "required": true,
        "description": "MACD"
      },
      {
        "name": "fast",
        "type": "number",
        "required": false,
        "default": "12",
        "description": "Period of the fast exponential average"
      },
      {
        "name": "slow",
        "type": "number",
        "required": false,
        "default": "26",
        "description": "Period of the slow exponential average"
      },
      {
        "name": "signal",
        "type": "number",
        "required": false,
        "default": "9",
        "description": "Period of the signal line (average of the MACD line)"
      },
      {
        "name": "colors",
        "type": "readonly string[]",
        "required": false,
        "description": "Colors of the MACD and signal lines"
      }
    ]
  },
  "TradingRsiIndicator": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Relative strength index (Wilder), with overbought / oversold bands",
    "kind": "interface",
    "extends": [
      "TradingPaneIndicatorBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"rsi\"",
        "required": true,
        "description": "Relative strength index"
      },
      {
        "name": "period",
        "type": "number",
        "required": false,
        "default": "14",
        "description": "Number of bars"
      },
      {
        "name": "overbought",
        "type": "number",
        "required": false,
        "default": "70",
        "description": "Upper band"
      },
      {
        "name": "oversold",
        "type": "number",
        "required": false,
        "default": "30",
        "description": "Lower band"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Line color"
      }
    ]
  },
  "TradingKdjIndicator": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Stochastic KDJ: K, D and J lines",
    "kind": "interface",
    "extends": [
      "TradingPaneIndicatorBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"kdj\"",
        "required": true,
        "description": "KDJ stochastic"
      },
      {
        "name": "period",
        "type": "number",
        "required": false,
        "default": "9",
        "description": "Bars of the highest high / lowest low window"
      },
      {
        "name": "kPeriod",
        "type": "number",
        "required": false,
        "default": "3",
        "description": "Smoothing of K"
      },
      {
        "name": "dPeriod",
        "type": "number",
        "required": false,
        "default": "3",
        "description": "Smoothing of D"
      },
      {
        "name": "colors",
        "type": "readonly string[]",
        "required": false,
        "description": "Colors of the K, D and J lines"
      }
    ]
  },
  "TradingAtrIndicator": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Average true range (Wilder): the volatility in price units",
    "kind": "interface",
    "extends": [
      "TradingPaneIndicatorBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"atr\"",
        "required": true,
        "description": "Average true range"
      },
      {
        "name": "period",
        "type": "number",
        "required": false,
        "default": "14",
        "description": "Number of bars"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Line color"
      }
    ]
  },
  "TradingParabolicSarIndicator": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Parabolic stop and reverse: dots under rising bars, over falling ones",
    "kind": "interface",
    "extends": [
      "TradingIndicatorBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"psar\"",
        "required": true,
        "description": "Parabolic SAR"
      },
      {
        "name": "start",
        "type": "number",
        "required": false,
        "default": "0.02",
        "description": "Initial acceleration factor"
      },
      {
        "name": "increment",
        "type": "number",
        "required": false,
        "default": "0.02",
        "description": "Increase of the factor at each new extreme"
      },
      {
        "name": "maximum",
        "type": "number",
        "required": false,
        "default": "0.2",
        "description": "Largest acceleration factor"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color of the dots; the up / down colors by trend by default"
      }
    ]
  },
  "TradingIchimokuIndicator": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Ichimoku cloud: conversion and base lines, lagging span and the cloud between the leading spans",
    "kind": "interface",
    "extends": [
      "TradingIndicatorBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"ichimoku\"",
        "required": true,
        "description": "Ichimoku Kinkō Hyō"
      },
      {
        "name": "conversionPeriod",
        "type": "number",
        "required": false,
        "default": "9",
        "description": "Bars of the conversion line (Tenkan-sen)"
      },
      {
        "name": "basePeriod",
        "type": "number",
        "required": false,
        "default": "26",
        "description": "Bars of the base line (Kijun-sen)"
      },
      {
        "name": "spanBPeriod",
        "type": "number",
        "required": false,
        "default": "52",
        "description": "Bars of the leading span B (Senkou span B)"
      },
      {
        "name": "displacement",
        "type": "number",
        "required": false,
        "default": "26",
        "description": "Shift of the leading spans (ahead) and of the lagging span (back), in bars"
      },
      {
        "name": "colors",
        "type": "readonly string[]",
        "required": false,
        "description": "Colors of the conversion, base, lagging, leading A and leading B lines"
      },
      {
        "name": "cloud",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Fills the cloud between the leading spans: the up color while span A is above span B, the down color otherwise"
      }
    ]
  },
  "TradingSupertrendIndicator": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "SuperTrend: a trailing band of average true ranges that flips with the trend",
    "kind": "interface",
    "extends": [
      "TradingIndicatorBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"supertrend\"",
        "required": true,
        "description": "SuperTrend"
      },
      {
        "name": "period",
        "type": "number",
        "required": false,
        "default": "10",
        "description": "Bars of the average true range"
      },
      {
        "name": "multiplier",
        "type": "number",
        "required": false,
        "default": "3",
        "description": "Distance of the band, in average true ranges"
      },
      {
        "name": "upColor",
        "type": "string",
        "required": false,
        "description": "Color of the band in an uptrend; the up color by default"
      },
      {
        "name": "downColor",
        "type": "string",
        "required": false,
        "description": "Color of the band in a downtrend; the down color by default"
      }
    ]
  },
  "TradingKeltnerIndicator": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Keltner channel: an exponential average ± a multiple of the average true range",
    "kind": "interface",
    "extends": [
      "TradingIndicatorBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"keltner\"",
        "required": true,
        "description": "Keltner channel"
      },
      {
        "name": "period",
        "type": "number",
        "required": false,
        "default": "20",
        "description": "Bars of the exponential average"
      },
      {
        "name": "multiplier",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "Distance of the bands, in average true ranges"
      },
      {
        "name": "atrPeriod",
        "type": "number",
        "required": false,
        "default": "10",
        "description": "Bars of the average true range"
      },
      {
        "name": "colors",
        "type": "readonly string[]",
        "required": false,
        "description": "Colors of the middle, upper and lower lines"
      },
      {
        "name": "fill",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Fills the channel"
      }
    ]
  },
  "TradingDonchianIndicator": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Donchian channel: the highest high and lowest low of a window, and their midpoint",
    "kind": "interface",
    "extends": [
      "TradingIndicatorBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"donchian\"",
        "required": true,
        "description": "Donchian channel"
      },
      {
        "name": "period",
        "type": "number",
        "required": false,
        "default": "20",
        "description": "Number of bars"
      },
      {
        "name": "colors",
        "type": "readonly string[]",
        "required": false,
        "description": "Colors of the middle, upper and lower lines"
      },
      {
        "name": "fill",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Fills the channel"
      }
    ]
  },
  "TradingObvIndicator": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "On-balance volume: the running volume of up closes minus down closes",
    "kind": "interface",
    "extends": [
      "TradingPaneIndicatorBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"obv\"",
        "required": true,
        "description": "On-balance volume"
      },
      {
        "name": "maPeriod",
        "type": "number",
        "required": false,
        "description": "Period of a moving average drawn over the line"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Line color"
      }
    ]
  },
  "TradingCciIndicator": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Commodity channel index, with ±100 bands",
    "kind": "interface",
    "extends": [
      "TradingPaneIndicatorBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"cci\"",
        "required": true,
        "description": "Commodity channel index"
      },
      {
        "name": "period",
        "type": "number",
        "required": false,
        "default": "20",
        "description": "Number of bars"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Line color"
      }
    ]
  },
  "TradingStochRsiIndicator": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Stochastic RSI: K and D lines between 0 and 100, with 20 / 80 bands",
    "kind": "interface",
    "extends": [
      "TradingPaneIndicatorBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"stochRsi\"",
        "required": true,
        "description": "Stochastic RSI"
      },
      {
        "name": "rsiPeriod",
        "type": "number",
        "required": false,
        "default": "14",
        "description": "Bars of the RSI"
      },
      {
        "name": "stochPeriod",
        "type": "number",
        "required": false,
        "default": "14",
        "description": "Bars of the stochastic of the RSI"
      },
      {
        "name": "kPeriod",
        "type": "number",
        "required": false,
        "default": "3",
        "description": "Smoothing of K"
      },
      {
        "name": "dPeriod",
        "type": "number",
        "required": false,
        "default": "3",
        "description": "Smoothing of D"
      },
      {
        "name": "colors",
        "type": "readonly string[]",
        "required": false,
        "description": "Colors of the K and D lines"
      }
    ]
  },
  "TradingDmiIndicator": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Directional movement index: +DI, −DI and ADX (trend strength)",
    "kind": "interface",
    "extends": [
      "TradingPaneIndicatorBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"dmi\"",
        "required": true,
        "description": "Directional movement index"
      },
      {
        "name": "period",
        "type": "number",
        "required": false,
        "default": "14",
        "description": "Bars of the directional indicators"
      },
      {
        "name": "adxPeriod",
        "type": "number",
        "required": false,
        "default": "14",
        "description": "Smoothing of the ADX"
      },
      {
        "name": "colors",
        "type": "readonly string[]",
        "required": false,
        "description": "Colors of the +DI, −DI and ADX lines"
      }
    ]
  },
  "TradingWilliamsRIndicator": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Williams %R (−100 to 0), with −80 / −20 bands",
    "kind": "interface",
    "extends": [
      "TradingPaneIndicatorBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"williamsR\"",
        "required": true,
        "description": "Williams %R"
      },
      {
        "name": "period",
        "type": "number",
        "required": false,
        "default": "14",
        "description": "Number of bars"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Line color"
      }
    ]
  },
  "TradingMfiIndicator": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Money flow index (0-100): a volume-weighted RSI, with 20 / 80 bands",
    "kind": "interface",
    "extends": [
      "TradingPaneIndicatorBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"mfi\"",
        "required": true,
        "description": "Money flow index"
      },
      {
        "name": "period",
        "type": "number",
        "required": false,
        "default": "14",
        "description": "Number of bars"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Line color"
      }
    ]
  },
  "TradingIndicatorBase": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Options shared by every indicator",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "Identifies the indicator in the legend, the events and the pane sizes; defaults to the type and its parameters (`\"ma:7\"`, `\"macd:12:26:9\"`)"
      },
      {
        "name": "visible",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Draws the indicator; hidden indicators keep their legend entry, which shows them again"
      }
    ]
  },
  "TradingPaneIndicatorBase": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Options shared by the indicators drawn in their own pane",
    "kind": "interface",
    "extends": [
      "TradingIndicatorBase"
    ],
    "props": [
      {
        "name": "height",
        "type": "number",
        "required": false,
        "default": "110",
        "description": "Height of the pane in pixels (the panes can be resized by dragging their separators)"
      }
    ]
  },
  "TradingVolumeProfile": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Volume by price of a range of bars, as computed by `volumeProfile`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Price at the bottom of the first row"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "Price at the top of the last row"
      },
      {
        "name": "step",
        "type": "number",
        "required": true,
        "description": "Height of a row, in price"
      },
      {
        "name": "up",
        "type": "Float64Array",
        "required": true,
        "description": "Volume of rising bars per row, bottom row first"
      },
      {
        "name": "down",
        "type": "Float64Array",
        "required": true,
        "description": "Volume of falling bars per row"
      },
      {
        "name": "total",
        "type": "number",
        "required": true,
        "description": "Total volume"
      },
      {
        "name": "poc",
        "type": "number",
        "required": true,
        "description": "Row of the point of control (the largest volume); −1 without volume"
      },
      {
        "name": "valueAreaFrom",
        "type": "number",
        "required": true,
        "description": "First row of the value area"
      },
      {
        "name": "valueAreaTo",
        "type": "number",
        "required": true,
        "description": "Last row of the value area"
      }
    ]
  },
  "TradingChartInstance": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "A trading chart mounted by `createTradingChart`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "setOptions",
        "type": "(options: TradingChartOptions) => void",
        "required": true,
        "description": "Replaces the options (bars, drawings, ... are replaced only when their reference changed)"
      },
      {
        "name": "setBars",
        "type": "(bars: TradingBarsInput) => void",
        "required": true,
        "description": "Replaces the bars"
      },
      {
        "name": "update",
        "type": "(bar: TradingBar) => void",
        "required": true,
        "description": "Streams a bar: the same time as the last bar replaces it, a later time appends it. Cheap: call it on every tick."
      },
      {
        "name": "appendBars",
        "type": "(bars: TradingBarsInput) => void",
        "required": true,
        "description": "Appends bars newer than the last one"
      },
      {
        "name": "prependBars",
        "type": "(bars: TradingBarsInput) => void",
        "required": true,
        "description": "Inserts older bars before the first one; the view stays on the same bars"
      },
      {
        "name": "getBarCount",
        "type": "() => number",
        "required": true,
        "description": "Number of bars"
      },
      {
        "name": "getBar",
        "type": "(index: number) => TradingBar | null",
        "required": true,
        "description": "Bar at an index, `null` outside the data"
      },
      {
        "name": "scrollToRealtime",
        "type": "(animate?: boolean) => void",
        "required": true,
        "description": "Scrolls to the latest bar"
      },
      {
        "name": "fitContent",
        "type": "() => void",
        "required": true,
        "description": "Shows every bar"
      },
      {
        "name": "getVisibleRange",
        "type": "() => TradingVisibleRange",
        "required": true,
        "description": "Visible bars"
      },
      {
        "name": "setVisibleRange",
        "type": "(range: { from: number; to: number }) => void",
        "required": true,
        "description": "Shows the bars between two logical indices"
      },
      {
        "name": "getVisibleTimeRange",
        "type": "() => { from: number; to: number }",
        "required": true,
        "description": "Times at the edges of the plot (interpolated between bars)"
      },
      {
        "name": "setVisibleTimeRange",
        "type": "(range: { from: number; to: number }) => void",
        "required": true,
        "description": "Shows the bars between two times"
      },
      {
        "name": "setCrosshair",
        "type": "(time: number | null, price?: number) => void",
        "required": true,
        "description": "Shows the crosshair at a time (and a price), as if the pointer were there; `null` hides it. Does not emit `crosshairMove`."
      },
      {
        "name": "setScaleMode",
        "type": "(mode: TradingScaleMode) => void",
        "required": true,
        "description": "Sets the price scale of the price pane"
      },
      {
        "name": "resetPriceScales",
        "type": "() => void",
        "required": true,
        "description": "Fits every price scale to the visible bars again"
      },
      {
        "name": "setDrawingTool",
        "type": "(tool: TradingDrawingTool) => void",
        "required": true,
        "description": "Activates a drawing tool"
      },
      {
        "name": "getDrawingTool",
        "type": "() => TradingDrawingTool",
        "required": true,
        "description": "Active drawing tool"
      },
      {
        "name": "getDrawings",
        "type": "() => readonly TradingDrawing[]",
        "required": true,
        "description": "Current drawings"
      },
      {
        "name": "setDrawings",
        "type": "(drawings: readonly TradingDrawing[]) => void",
        "required": true,
        "description": "Replaces the drawings"
      },
      {
        "name": "removeDrawing",
        "type": "(id: string) => void",
        "required": true,
        "description": "Deletes a drawing"
      },
      {
        "name": "updateDrawing",
        "type": "(id: string, patch: TradingDrawingPatch) => void",
        "required": true,
        "description": "Changes the style or the content of a drawing (undoable)"
      },
      {
        "name": "selectDrawing",
        "type": "(id: string | null) => void",
        "required": true,
        "description": "Selects a drawing (`null` clears the selection)"
      },
      {
        "name": "undo",
        "type": "() => void",
        "required": true,
        "description": "Undoes the last change of the drawings (also Ctrl / ⌘ + Z)"
      },
      {
        "name": "redo",
        "type": "() => void",
        "required": true,
        "description": "Redoes the last undone change (also Ctrl / ⌘ + Shift + Z)"
      },
      {
        "name": "getUndoState",
        "type": "() => TradingUndoState",
        "required": true,
        "description": "Whether the drawings can be undone or redone"
      },
      {
        "name": "startReplay",
        "type": "(time?: number) => void",
        "required": true,
        "description": "Starts a bar replay: the bars after `time` are hidden, then added back by `replayStep` or `replayPlay`. Without `time`, the user picks the first bar with a click."
      },
      {
        "name": "replayStep",
        "type": "(count?: number) => void",
        "required": true,
        "description": "Shows the next bars of the replay"
      },
      {
        "name": "replayPlay",
        "type": "(speed?: number) => void",
        "required": true,
        "description": "Adds `speed` bars per second (the current speed by default)"
      },
      {
        "name": "replayPause",
        "type": "() => void",
        "required": true,
        "description": "Pauses the replay"
      },
      {
        "name": "stopReplay",
        "type": "() => void",
        "required": true,
        "description": "Ends the replay and shows every bar"
      },
      {
        "name": "getReplayState",
        "type": "() => TradingReplayState",
        "required": true,
        "description": "State of the bar replay"
      },
      {
        "name": "toDataURL",
        "type": "(type?: string, quality?: number) => string",
        "required": true,
        "default": "\"image/png\"",
        "description": "Image of the chart (bars, axes, drawings and legends) as a data URL"
      },
      {
        "name": "toBlob",
        "type": "(type?: string, quality?: number) => Promise<Blob | null>",
        "required": true,
        "description": "Image of the chart as a blob (`null` without canvas support)"
      },
      {
        "name": "requestFullscreen",
        "type": "() => Promise<void>",
        "required": true,
        "description": "Shows the chart full screen"
      },
      {
        "name": "exitFullscreen",
        "type": "() => Promise<void>",
        "required": true,
        "description": "Leaves full screen"
      },
      {
        "name": "isFullscreen",
        "type": "() => boolean",
        "required": true,
        "description": "Whether the chart is full screen"
      },
      {
        "name": "setIndicatorVisible",
        "type": "(id: string, visible: boolean) => void",
        "required": true,
        "description": "Shows or hides an indicator"
      },
      {
        "name": "getRenderer",
        "type": "() => ChartRendererKind | null",
        "required": true,
        "description": "Backend in use (`null` until ready or without canvas support)"
      },
      {
        "name": "ready",
        "type": "Promise<ChartRendererKind | null>",
        "required": true,
        "description": "Resolves with the backend once the first frame can be drawn"
      },
      {
        "name": "refreshTheme",
        "type": "() => void",
        "required": true,
        "description": "Reads the CSS variables again (theme changes are detected automatically)"
      },
      {
        "name": "resize",
        "type": "() => void",
        "required": true,
        "description": "Draws again at the container size (resizes are detected automatically)"
      },
      {
        "name": "on",
        "type": "(type: K, listener: (event: TradingChartEventMap[K]) => void) => () => void",
        "required": true,
        "description": "Subscribes to an event; returns the unsubscribe function"
      },
      {
        "name": "destroy",
        "type": "() => void",
        "required": true,
        "description": "Removes the chart and frees the GPU resources"
      }
    ]
  },
  "TradingChartEventMap": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Events of a trading chart",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "renderer",
        "type": "ChartRendererKind",
        "required": true,
        "description": "The backend in use (again when it changes after a GPU loss)"
      },
      {
        "name": "crosshairMove",
        "type": "TradingCrosshairEvent | null",
        "required": true,
        "description": "The crosshair moved; `null` when it left the chart"
      },
      {
        "name": "click",
        "type": "TradingClickEvent",
        "required": true,
        "description": "A pane was clicked (not while drawing)"
      },
      {
        "name": "visibleRangeChange",
        "type": "TradingVisibleRange",
        "required": true,
        "description": "The visible bars changed (scroll, zoom, resize, new bars)"
      },
      {
        "name": "orderMove",
        "type": "TradingOrderMoveEvent",
        "required": true,
        "description": "A draggable price line was dropped"
      },
      {
        "name": "orderCreate",
        "type": "TradingOrderCreateEvent",
        "required": true,
        "description": "The \"+\" order entry button was clicked"
      },
      {
        "name": "orderCancel",
        "type": "TradingOrderCancelEvent",
        "required": true,
        "description": "The close button of a price line was clicked"
      },
      {
        "name": "drawingsChange",
        "type": "readonly TradingDrawing[]",
        "required": true,
        "description": "Drawings were added, moved, restyled, deleted, undone or redone"
      },
      {
        "name": "drawingSelect",
        "type": "string | null",
        "required": true,
        "description": "The selected drawing changed"
      },
      {
        "name": "drawingToolChange",
        "type": "TradingDrawingTool",
        "required": true,
        "description": "The drawing tool changed (back to `cursor` after a drawing)"
      },
      {
        "name": "undoChange",
        "type": "TradingUndoState",
        "required": true,
        "description": "Undo / redo became possible or impossible"
      },
      {
        "name": "indicatorToggle",
        "type": "TradingIndicatorToggleEvent",
        "required": true,
        "description": "An indicator was shown or hidden from the legend"
      },
      {
        "name": "historyRequest",
        "type": "TradingHistoryRequestEvent",
        "required": true,
        "description": "The oldest bar came into view (see `prependBars`)"
      },
      {
        "name": "replayChange",
        "type": "TradingReplayState",
        "required": true,
        "description": "The bar replay started, stepped, played, paused or stopped"
      },
      {
        "name": "fullscreenChange",
        "type": "boolean",
        "required": true,
        "description": "The chart entered (`true`) or left full screen"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: ATR

ATR（平均真の値幅）はボラティリティを価格の単位で測ります。純粋関数 atr() で現在値から 2 ATR 離れた位置に損切りラインを引いています。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/demos/atr.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TradingChart, type TradingPriceLine } from "minerva-design/charts";
import { atr } from "minerva-design/charts/core";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 360,
  timeframe: HOUR,
  seed: 61,
  price: 2_330,
  volatility: 0.0035,
  volume: 1.2e4,
});

// the same ATR as the pane, computed with the pure function for the stops
const range = atr(
  bars.map((bar) => bar.high),
  bars.map((bar) => bar.low),
  bars.map((bar) => bar.close),
  14,
);
const last = bars[bars.length - 1].close;
const volatility = range[range.length - 1];

export default function AtrDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  // volatility stops: 2 ATR under the price for a long, 2 ATR above for a short
  const priceLines = useMemo(
    (): TradingPriceLine[] => [
      {
        id: "long",
        kind: "stopLoss",
        price: last - 2 * volatility,
        title: t("longStop"),
      },
      {
        id: "short",
        kind: "stopLoss",
        side: "sell",
        price: last + 2 * volatility,
        title: t("shortStop"),
        color: "#a855f7",
      },
    ],
    [t],
  );
  return (
    <TradingChart
      bars={bars}
      timeframe="1H"
      symbol={t("gold")}
      indicators={[{ type: "atr", period: 14, height: 120 }]}
      priceLines={priceLines}
      ariaLabel={t("atrAria")}
      height={440}
    />
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: ボリンジャーバンド

20 本の平均と、標準偏差の倍数だけ離れたバンド、その間の薄い塗りつぶし。ボラティリティが上がるとバンドが広がります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/demos/bollinger.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TradingChart } from "minerva-design/charts";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 500,
  timeframe: HOUR,
  seed: 14,
  price: 3_150,
  volatility: 0.006,
  volume: 800,
});

export default function BollingerDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const [multiplier, setMultiplier] = useState("2");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("multiplier")}
        direction="horizontal"
        value={multiplier}
        onChange={(value) => setMultiplier(String(value))}
      >
        {["1.5", "2", "2.5"].map((value) => (
          <Radio key={value} value={value} label={t("deviations", { value })} />
        ))}
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="1H"
        symbol={t("eth")}
        indicators={[
          { type: "boll", period: 20, multiplier: Number(multiplier) },
        ]}
        ariaLabel={t("bollAria")}
        height={380}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: ケルトナーとドンチャンのチャネル

ケルトナー・チャネルは EMA の上下に ATR の倍数、ドンチャン・チャネルは最高値と最安値、ボリンジャーバンドは標準偏差を使います。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/demos/channels.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TradingChart, type TradingIndicator } from "minerva-design/charts";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars(
  {
    count: 360,
    timeframe: HOUR,
    seed: 1_717,
    price: 1.0842,
    volatility: 0.0012,
    volume: 9e3,
  },
  5,
);

const CHANNELS: Record<string, TradingIndicator> = {
  keltner: { type: "keltner", period: 20, multiplier: 2 },
  donchian: { type: "donchian", period: 20 },
  boll: { type: "boll", period: 20 },
};

export default function ChannelsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const [channel, setChannel] = useState("keltner");
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        label={t("channel")}
        direction="horizontal"
        value={channel}
        onChange={(value) => setChannel(String(value))}
      >
        {Object.keys(CHANNELS).map((key) => (
          <Radio key={key} value={key} label={t(`channels.${key}`)} />
        ))}
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="1H"
        symbol={t("eurusd")}
        indicators={[CHANNELS[channel]]}
        ariaLabel={t("channelsAria")}
        height={420}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: RSI ダイバージェンス

rsi() と足のスイングの高値・安値から通常のダイバージェンスを見つけます：安値更新で RSI の安値が切り上がる（強気）、高値更新で RSI の高値が切り下がる（弱気）。それぞれロックされた2本の trendLine 描画になり、価格ペインと RSI ペイン（pane: "rsi:14"）に引かれます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/demos/divergence.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TradingChart, type TradingDrawing } from "minerva-design/charts";
import { rsi } from "minerva-design/charts/core";
import { HOUR, generateBars } from "../../trading-chart/data";

type Kind = "bullish" | "bearish";
type Filter = "all" | Kind;

const bars = generateBars({
  count: 400,
  timeframe: 4 * HOUR,
  seed: 311,
  price: 142,
  volatility: 0.012,
  volume: 1e5,
});
const strength = rsi(
  bars.map((bar) => bar.close),
  14,
);

/** Swing points: the highest high (lowest low) of the 5 bars on each side */
const WING = 5;
const swings = (kind: "high" | "low") => {
  const found: number[] = [];
  for (let i = WING; i < bars.length - WING; i++) {
    let swing = Number.isFinite(strength[i]);
    for (let j = i - WING; j <= i + WING && swing; j++)
      if (
        j !== i &&
        (kind === "high"
          ? bars[j].high >= bars[i].high
          : bars[j].low <= bars[i].low)
      )
        swing = false;
    if (swing) found.push(i);
  }
  return found;
};

interface Divergence {
  kind: Kind;
  from: number;
  to: number;
}

// regular divergences between two neighbouring swings at most 40 bars
// apart: a lower low with a higher RSI low (bullish), a higher high with a
// lower RSI high (bearish)
const DIVERGENCES: Divergence[] = [];
const pairs = (list: number[], kind: Kind) => {
  for (let k = 1; k < list.length; k++) {
    const [from, to] = [list[k - 1], list[k]];
    if (to - from > 40) continue;
    const priceDiverges =
      kind === "bullish"
        ? bars[to].low < bars[from].low
        : bars[to].high > bars[from].high;
    const rsiDiverges =
      kind === "bullish"
        ? strength[to] > strength[from]
        : strength[to] < strength[from];
    if (priceDiverges && rsiDiverges) DIVERGENCES.push({ kind, from, to });
  }
};
pairs(swings("low"), "bullish");
pairs(swings("high"), "bearish");
DIVERGENCES.sort((a, b) => a.to - b.to);

const COLORS: Record<Kind, string> = {
  bullish: "var(--success-color)",
  bearish: "var(--danger-color)",
};

export default function DivergenceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const locale = i18n.language;
  const [filter, setFilter] = useState<Filter>("all");

  // each divergence is a pair of locked trend lines: one on the price
  // pane, one on the RSI pane (its indicator id)
  const drawings = useMemo(
    (): TradingDrawing[] =>
      DIVERGENCES.filter(
        (divergence) => filter === "all" || divergence.kind === filter,
      ).flatMap(({ kind, from, to }) => {
        const price = (i: number) =>
          kind === "bullish" ? bars[i].low : bars[i].high;
        const style = {
          type: "trendLine" as const,
          color: COLORS[kind],
          lineWidth: 2,
          locked: true,
        };
        return [
          {
            ...style,
            id: `price-${from}`,
            pane: "price",
            points: [
              { time: bars[from].time, price: price(from) },
              { time: bars[to].time, price: price(to) },
            ],
          },
          {
            ...style,
            id: `rsi-${from}`,
            pane: "rsi:14",
            points: [
              { time: bars[from].time, price: strength[from] },
              { time: bars[to].time, price: strength[to] },
            ],
          },
        ];
      }),
    [filter],
  );

  const integer = new Intl.NumberFormat(locale);
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
  const count = (kind: Kind) =>
    integer.format(DIVERGENCES.filter((d) => d.kind === kind).length);
  const latest = DIVERGENCES.filter(
    (divergence) => filter === "all" || divergence.kind === filter,
  ).at(-1);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("divergenceKind")}
        direction="horizontal"
        value={filter}
        onChange={(value) => setFilter(value as Filter)}
      >
        <Radio value="all" label={t("divergenceKinds.all")} />
        <Radio value="bullish" label={t("divergenceKinds.bullish")} />
        <Radio value="bearish" label={t("divergenceKinds.bearish")} />
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="4H"
        symbol={t("sol")}
        indicators={[{ type: "rsi", id: "rsi:14", period: 14, height: 120 }]}
        drawings={drawings}
        ariaLabel={t("divergenceAria")}
        height={460}
      />
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
        }}
      >
        {t("divergenceSummary", {
          bullish: count("bullish"),
          bearish: count("bearish"),
        })}
        {latest &&
          ` ${t("divergenceLatest", {
            kind: t(`divergenceKinds.${latest.kind}`),
            date: date.format(bars[latest.to].time),
          })}`}
      </span>
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: DMI と ADX

+DI と −DI は上昇色・下落色、ADX は琥珀色で 25 のラインがあり、それを上回るとトレンドが強いことを示します。下の文は純粋関数 dmi の最新値です。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/demos/dmi.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TradingChart } from "minerva-design/charts";
import { dmi } from "minerva-design/charts/core";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 300,
  timeframe: DAY,
  seed: 3_030,
  price: 412,
  volatility: 0.017,
  volume: 2.1e7,
  market: "stock",
});

// the last values, from the pure function
const { plus, minus, adx } = dmi(
  bars.map((bar) => bar.high),
  bars.map((bar) => bar.low),
  bars.map((bar) => bar.close),
);
const last = bars.length - 1;

export default function DmiDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const summary = useMemo(() => {
    const format = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: 1,
    });
    const strength = adx[last] >= 25 ? "strong" : "weak";
    const direction = plus[last] >= minus[last] ? "up" : "down";
    return t(`dmiSummary.${strength}`, {
      adx: format.format(adx[last]),
      direction: t(`directions.${direction}`),
    });
  }, [t, i18n.language]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <TradingChart
        bars={bars}
        timeframe="1D"
        symbol={t("msft")}
        indicators={[{ type: "dmi", height: 130 }]}
        ariaLabel={t("dmiAria")}
        height={440}
      />
      <span
        role="status"
        style={{ fontSize: 13, color: "var(--text-secondary-color)" }}
      >
        {summary}
      </span>
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: 平均足

ノイズをならした足：同じ色が続くとトレンドです。純粋関数 heikinAshi() で現在のトレンドの本数を数えています。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/demos/heikin-ashi.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TradingChart, type TradingChartStyle } from "minerva-design/charts";
import { heikinAshi } from "minerva-design/charts/core";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars(
  {
    count: 300,
    timeframe: 4 * HOUR,
    seed: 90,
    price: 0.62,
    volatility: 0.011,
    volume: 2e7,
  },
  4,
);

// the pure function: how many Heikin-Ashi bars the current trend has lasted
const ha = heikinAshi({
  open: bars.map((bar) => bar.open),
  high: bars.map((bar) => bar.high),
  low: bars.map((bar) => bar.low),
  close: bars.map((bar) => bar.close),
});
const n = ha.close.length;
const rising = ha.close[n - 1] >= ha.open[n - 1];
let streak = 0;
while (
  streak < n &&
  ha.close[n - 1 - streak] >= ha.open[n - 1 - streak] === rising
)
  streak++;

export default function HeikinAshiDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const [style, setStyle] = useState<TradingChartStyle>("heikinAshi");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("chartStyle")}
        direction="horizontal"
        value={style}
        onChange={(value) => setStyle(value as TradingChartStyle)}
      >
        <Radio value="heikinAshi" label={t("heikinAshi")} />
        <Radio value="candles" label={t("candles")} />
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="4H"
        symbol={t("ada")}
        chartStyle={style}
        indicators={[{ type: "ema", period: 34 }]}
        ariaLabel={t("haAria")}
        height={400}
      />
      <span role="status" style={{ color: "var(--text-secondary-color)" }}>
        {t(rising ? "haRising" : "haFalling", { count: streak })}
      </span>
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: 一目均衡表

転換線・基準線・遅行スパンと、先行スパンの間の雲：先行スパン A が B より上なら上昇色、それ以外は下落色です。rightOffset で 26 本先に描かれる雲の余白を確保します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/demos/ichimoku.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { TradingChart } from "minerva-design/charts";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 320,
  timeframe: DAY,
  seed: 808,
  price: 38_000,
  volatility: 0.022,
  volume: 2.4e4,
});

export default function IchimokuDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const [cloud, setCloud] = useState(true);
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        size="small"
        checked={cloud}
        onChange={setCloud}
        label={t("cloud")}
      />
      <TradingChart
        bars={bars}
        timeframe="1D"
        symbol={t("nikkei")}
        indicators={[{ type: "ichimoku", cloud }]}
        // room on the right for the cloud drawn 26 bars ahead
        rightOffset={30}
        barSpacing={6}
        precision={0}
        ariaLabel={t("ichimokuAria")}
        height={440}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: KDJ

中国市場で人気のストキャスティクス K、D、J ラインを、MA5 / 20 と赤が上昇の配色で表示。J が最初に 0〜100 の範囲を外れます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/demos/kdj.tsx

```tsx
import { useTranslation } from "react-i18next";
import { TradingChart } from "minerva-design/charts";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 240,
  timeframe: DAY,
  seed: 300_750,
  price: 236,
  volatility: 0.022,
  volume: 4e6,
  market: "stock",
});

export default function KdjDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  return (
    <TradingChart
      bars={bars}
      timeframe="1D"
      symbol={t("catl")}
      colorConvention="redUp"
      utcOffset={480}
      indicators={[
        { type: "ma", period: 5 },
        { type: "ma", period: 20 },
        // J leaves the 0-100 range first: the earliest (and noisiest) signal
        { type: "kdj", period: 9, kPeriod: 3, dPeriod: 3, height: 150 },
      ]}
      barSpacing={7}
      ariaLabel={t("kdjAria")}
      height={440}
    />
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: MACD

MACD ライン（12 本 EMA − 26 本 EMA）、9 本のシグナル、両者の差のヒストグラム：拡大中は鮮やか、縮小中は淡い色になります。両 EMA も価格の上に描いています。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/demos/macd.tsx

```tsx
import { useTranslation } from "react-i18next";
import { TradingChart } from "minerva-design/charts";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 300,
  timeframe: DAY,
  seed: 36,
  price: 58_000,
  volatility: 0.024,
  volume: 3e4,
});

export default function MacdDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  return (
    <TradingChart
      bars={bars}
      timeframe="1D"
      symbol={t("btc")}
      indicators={[
        { type: "ema", period: 12, color: "#0ea5e9" },
        { type: "ema", period: 26, color: "#f59e0b" },
        // bright bars when the histogram grows, faded when it shrinks
        { type: "macd", fast: 12, slow: 26, signal: 9, height: 150 },
      ]}
      barSpacing={6}
      ariaLabel={t("macdAria")}
      height={460}
    />
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: MA・EMA・WMA

同じ期間の 3 種類の平均：指数平均と加重平均は単純平均より速く価格に追従します。期間を変えると遅れが大きくなる様子がわかります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/demos/moving-averages.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TradingChart } from "minerva-design/charts";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 400,
  timeframe: DAY,
  seed: 8,
  price: 412,
  volatility: 0.015,
  volume: 2e7,
  market: "stock",
});

export default function MovingAveragesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const [period, setPeriod] = useState("20");
  const p = Number(period);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("period")}
        direction="horizontal"
        value={period}
        onChange={(value) => setPeriod(String(value))}
      >
        {["10", "20", "50"].map((value) => (
          <Radio
            key={value}
            value={value}
            label={t("periodValue", { period: value })}
          />
        ))}
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="1D"
        symbol={t("msft")}
        // the same period, three weightings: the EMA and WMA react faster
        indicators={[
          { type: "ma", period: p, color: "#f59e0b" },
          { type: "ema", period: p, color: "#a855f7" },
          { type: "wma", period: p, color: "#0ea5e9" },
        ]}
        barSpacing={6}
        ariaLabel={t("maAria")}
        height={380}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: マルチタイムフレーム

resampleBars が1時間足を4時間足と日足に集約し、ema() がその20本平均を計算します。各1時間足は確定済みの上位足だけを参照し（先読みなし）、compare で1時間足の EMA に重ねて描きます。onCrosshairMove で終値が3本の平均すべての上にあるかを示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/demos/multi-timeframe.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tag } from "minerva-design";
import {
  TradingChart,
  resampleBars,
  type TradingBar,
  type TradingCompareSeries,
} from "minerva-design/charts";
import { ema } from "minerva-design/charts/core";
import { DAY, HOUR, generateBars } from "../../trading-chart/data";

const PERIOD = 20;

// two months of hourly bars
const bars = generateBars({
  count: 1_440,
  timeframe: HOUR,
  seed: 2_420,
  price: 3_350,
  volatility: 0.006,
  volume: 2_400,
});
const closes = (list: readonly TradingBar[]) => list.map((bar) => bar.close);

/**
 * EMA of a higher timeframe, seen from each hourly bar: the value of the
 * last higher bar already closed when the hourly bar closes (no look-ahead,
 * so the line steps once per 4 hours or per day)
 */
function higher(timeframe: "4H" | "1D", duration: number) {
  const coarse = resampleBars(bars, timeframe);
  const average = ema(closes(coarse), PERIOD);
  const values = new Float64Array(bars.length).fill(NaN);
  let j = -1;
  bars.forEach((bar, i) => {
    while (
      j + 1 < coarse.length &&
      coarse[j + 1].time + duration <= bar.time + HOUR
    )
      j++;
    if (j >= 0) values[i] = average[j];
  });
  return values;
}

const LINES = {
  "1H": ema(closes(bars), PERIOD),
  "4H": higher("4H", 4 * HOUR),
  "1D": higher("1D", DAY),
};
type Frame = keyof typeof LINES;
const FRAMES = Object.keys(LINES) as Frame[];
const COLORS: Record<Frame, string> = {
  "1H": "#0ea5e9",
  "4H": "#f59e0b",
  "1D": "#a855f7",
};

export default function MultiTimeframeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const locale = i18n.language;
  const [hovered, setHovered] = useState<number | null>(null);

  // the higher timeframes are comparison lines on the same price scale
  const compare = useMemo(
    (): TradingCompareSeries[] =>
      (["4H", "1D"] as const).map((frame) => ({
        id: frame,
        name: t("emaOn", { period: PERIOD, frame }),
        color: COLORS[frame],
        data: bars.flatMap((bar, i) =>
          Number.isNaN(LINES[frame][i])
            ? []
            : [{ time: bar.time, value: LINES[frame][i] }],
        ),
      })),
    [t],
  );

  const index =
    hovered !== null && hovered >= 0 && hovered < bars.length
      ? hovered
      : bars.length - 1;
  const close = bars[index].close;
  const sides = FRAMES.map((frame) => {
    const value = LINES[frame][index];
    return {
      frame,
      value,
      above: Number.isNaN(value) ? null : close > value,
    };
  });
  const verdict = sides.every((side) => side.above === true)
    ? "alignedUp"
    : sides.every((side) => side.above === false)
      ? "alignedDown"
      : "mixed";

  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const when = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <TradingChart
        bars={bars}
        timeframe="1H"
        symbol={t("eth")}
        indicators={[
          { type: "ema", period: PERIOD, color: COLORS["1H"], lineWidth: 1.5 },
        ]}
        compare={compare}
        onCrosshairMove={(event) => setHovered(event?.bar ? event.index : null)}
        ariaLabel={t("mtfAria")}
        height={420}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span style={{ color: "var(--text-secondary-color)" }}>
          {t("mtfAt", {
            time: when.format(bars[index].time),
            close: price.format(close),
          })}
        </span>
        {sides.map((side) => (
          <Tag
            key={side.frame}
            color={
              side.above === null
                ? "neutral"
                : side.above
                  ? "success"
                  : "danger"
            }
          >
            {t(
              side.above === null
                ? "mtfWarmup"
                : side.above
                  ? "mtfAbove"
                  : "mtfBelow",
              {
                frame: side.frame,
                value: Number.isNaN(side.value) ? "" : price.format(side.value),
              },
            )}
          </Tag>
        ))}
        <strong>{t(`mtfVerdict.${verdict}`)}</strong>
      </div>
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: オンバランスボリューム

OBV は陽線引けの出来高を足し、陰線引けの出来高を引きます。20 本の平均で買い圧力と売り圧力のどちらが優勢かがわかります。大きな値はページの言語の単位で短く表示されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/demos/obv.tsx

```tsx
import { useTranslation } from "react-i18next";
import { TradingChart } from "minerva-design/charts";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 260,
  timeframe: DAY,
  seed: 6_060,
  price: 182,
  volatility: 0.016,
  volume: 5.4e7,
  market: "stock",
});

export default function ObvDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  return (
    <TradingChart
      bars={bars}
      timeframe="1D"
      symbol={t("aapl")}
      indicators={[
        { type: "volume", height: 80 },
        { type: "obv", maPeriod: 20, height: 120 },
      ]}
      ariaLabel={t("obvAria")}
      height={460}
    />
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: オシレーター

ストキャスティクス RSI と MFI は 0〜100（20 / 80 のバンド）、CCI は ±100 付近、ウィリアムズ %R は −100〜0。それぞれにペインがあり、チャートは高さを増やします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/demos/oscillators.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { TradingChart, type TradingIndicator } from "minerva-design/charts";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 400,
  timeframe: 4 * HOUR,
  seed: 5_151,
  price: 63_800,
  volatility: 0.008,
  volume: 900,
});

const OSCILLATORS: Record<string, TradingIndicator> = {
  stochRsi: { type: "stochRsi", height: 100 },
  cci: { type: "cci", height: 100 },
  williamsR: { type: "williamsR", height: 100 },
  mfi: { type: "mfi", height: 100 },
};

export default function OscillatorsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const [shown, setShown] = useState(["stochRsi", "cci"]);
  const indicators = useMemo(
    () =>
      Object.keys(OSCILLATORS)
        .filter((key) => shown.includes(key))
        .map((key) => OSCILLATORS[key]),
    [shown],
  );
  const toggle = (key: string) =>
    setShown((list) =>
      list.includes(key) ? list.filter((k) => k !== key) : [...list, key],
    );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        role="group"
        aria-label={t("oscillators")}
        style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
      >
        {Object.keys(OSCILLATORS).map((key) => (
          <Button
            key={key}
            size="small"
            variant="outline"
            active={shown.includes(key)}
            aria-pressed={shown.includes(key)}
            onClick={() => toggle(key)}
          >
            {t(`oscillatorNames.${key}`)}
          </Button>
        ))}
      </div>
      <TradingChart
        bars={bars}
        timeframe="4H"
        symbol={t("btc")}
        indicators={indicators}
        precision={0}
        ariaLabel={t("oscillatorsAria")}
        height={260 + indicators.length * 100}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: RSI

14 本と速い 6 本の RSI を、それぞれ買われすぎ / 売られすぎのバンド付きペインに表示。70 / 30 と 80 / 20 を切り替えられます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/demos/rsi.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TradingChart } from "minerva-design/charts";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 400,
  timeframe: 4 * HOUR,
  seed: 44,
  price: 142,
  volatility: 0.012,
  volume: 5e5,
});

const BANDS = { "70-30": [70, 30], "80-20": [80, 20] } as const;

export default function RsiDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const [bands, setBands] = useState<keyof typeof BANDS>("70-30");
  const [overbought, oversold] = BANDS[bands];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("bands")}
        direction="horizontal"
        value={bands}
        onChange={(value) => setBands(value as keyof typeof BANDS)}
      >
        {Object.keys(BANDS).map((value) => (
          <Radio key={value} value={value} label={t(`bandValues.${value}`)} />
        ))}
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="4H"
        symbol={t("sol")}
        indicators={[
          { type: "rsi", period: 14, overbought, oversold, height: 140 },
          {
            type: "rsi",
            period: 6,
            overbought,
            oversold,
            color: "#f59e0b",
            height: 100,
          },
        ]}
        ariaLabel={t("rsiAria")}
        height={460}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: インジケーター・スクリーナー

6銘柄に rsi()、macd()、atr()、sma() を適用し、並べ替え可能な Table を作ります：RSI、MACD ヒストグラム、価格に対する ATR の比率、50日平均からの乖離、シグナル。銘柄を選ぶと同じインジケーター付きのチャートを表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/demos/screener.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Table, Tag, type TableColumn } from "minerva-design";
import { TradingChart, type TradingBar } from "minerva-design/charts";
import { atr, macd, rsi, sma } from "minerva-design/charts/core";
import { DAY, generateBars } from "../../trading-chart/data";

type SymbolId = "aapl" | "msft" | "nvda" | "xom" | "btc" | "eth";
type Signal = "overbought" | "oversold" | "uptrend" | "downtrend" | "neutral";

interface Row {
  id: SymbolId;
  bars: TradingBar[];
  close: number;
  change: number;
  rsi: number;
  histogram: number;
  atrPercent: number;
  fromSma: number;
  signal: Signal;
}

const UNIVERSE: [SymbolId, number, number, number, "stock" | "crypto"][] = [
  // id, seed, price, daily volatility, market
  ["aapl", 507, 228, 0.014, "stock"],
  ["msft", 552, 415, 0.012, "stock"],
  ["nvda", 512, 138, 0.026, "stock"],
  ["xom", 516, 118, 0.011, "stock"],
  ["btc", 502, 64_000, 0.028, "crypto"],
  ["eth", 500, 3_350, 0.034, "crypto"],
];

const last = (values: Float64Array) => values[values.length - 1];

/** The last values of the indicators, from the pure functions */
const ROWS: Row[] = UNIVERSE.map(([id, seed, price, volatility, market]) => {
  const bars = generateBars({
    count: 220,
    timeframe: DAY,
    seed,
    price,
    volatility,
    volume: 1e6,
    market,
  });
  const close = bars.map((bar) => bar.close);
  const high = bars.map((bar) => bar.high);
  const low = bars.map((bar) => bar.low);
  const now = close[close.length - 1];
  const strength = last(rsi(close, 14));
  const histogram = last(macd(close).histogram);
  const fromSma = now / last(sma(close, 50)) - 1;
  const signal: Signal =
    strength >= 70
      ? "overbought"
      : strength <= 30
        ? "oversold"
        : histogram > 0 && fromSma > 0
          ? "uptrend"
          : histogram < 0 && fromSma < 0
            ? "downtrend"
            : "neutral";
  return {
    id,
    bars,
    close: now,
    change: now / close[close.length - 2] - 1,
    rsi: strength,
    histogram,
    atrPercent: last(atr(high, low, close, 14)) / now,
    fromSma,
    signal,
  };
});

const SIGNAL_COLORS = {
  overbought: "warning",
  oversold: "info",
  uptrend: "success",
  downtrend: "danger",
  neutral: "neutral",
} as const;

export default function ScreenerDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<SymbolId>("aapl");
  const row = ROWS.find((item) => item.id === selected) ?? ROWS[0];

  const { columns, percent } = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
      signDisplay: "exceptZero",
    });
    const plain = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    const one = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    const price = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const signed = new Intl.NumberFormat(locale, {
      maximumSignificantDigits: 3,
      signDisplay: "exceptZero",
    });
    const tone = (value: number) =>
      value > 0 ? "var(--success-color)" : "var(--danger-color)";
    const columns: TableColumn<Row>[] = [
      {
        key: "symbol",
        header: t("screenSymbol"),
        render: (item) => (
          <Button
            size="small"
            variant={item.id === selected ? "solid" : "ghost"}
            aria-pressed={item.id === selected}
            onClick={() => setSelected(item.id)}
          >
            {t(item.id)}
          </Button>
        ),
      },
      {
        key: "close",
        header: t("screenClose"),
        align: "right",
        render: (item) => price.format(item.close),
      },
      {
        key: "change",
        header: t("screenChange"),
        align: "right",
        sortable: (a, b) => a.change - b.change,
        render: (item) => (
          <span style={{ color: tone(item.change) }}>
            {percent.format(item.change)}
          </span>
        ),
      },
      {
        key: "rsi",
        header: t("screenRsi"),
        align: "right",
        sortable: (a, b) => a.rsi - b.rsi,
        render: (item) => one.format(item.rsi),
      },
      {
        key: "histogram",
        header: t("screenMacd"),
        align: "right",
        sortable: (a, b) => a.histogram / a.close - b.histogram / b.close,
        render: (item) => (
          <span style={{ color: tone(item.histogram) }}>
            {signed.format(item.histogram)}
          </span>
        ),
      },
      {
        key: "atr",
        header: t("screenAtr"),
        align: "right",
        sortable: (a, b) => a.atrPercent - b.atrPercent,
        render: (item) => plain.format(item.atrPercent),
      },
      {
        key: "sma",
        header: t("screenSma"),
        align: "right",
        sortable: (a, b) => a.fromSma - b.fromSma,
        render: (item) => (
          <span style={{ color: tone(item.fromSma) }}>
            {percent.format(item.fromSma)}
          </span>
        ),
      },
      {
        key: "signal",
        header: t("screenSignal"),
        sortable: (a, b) => a.signal.localeCompare(b.signal),
        render: (item) => (
          <Tag color={SIGNAL_COLORS[item.signal]} size="small">
            {t(`screenSignals.${item.signal}`)}
          </Tag>
        ),
      },
    ];
    return { columns, percent };
  }, [locale, selected, t]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Table
        aria-label={t("screenTable")}
        columns={columns}
        data={ROWS}
        rowKey={(item) => item.id}
        size="small"
        scroll={{ x: "max-content" }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)", fontSize: 13 }}
      >
        {t("screenShowing", {
          name: t(row.id),
          signal: t(`screenSignals.${row.signal}`),
          distance: percent.format(row.fromSma),
        })}
      </output>
      <TradingChart
        bars={row.bars}
        timeframe="1D"
        symbol={t(row.id)}
        indicators={[
          { type: "ma", period: 50, color: "#f59e0b" },
          { type: "rsi", period: 14, height: 90 },
          { type: "macd", height: 90 },
        ]}
        ariaLabel={t("screenChartAria", { name: t(row.id) })}
        height={460}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: 純粋関数によるシグナル

終値に ema() と rsi() を適用：9 本 EMA が 21 本 EMA を上抜け、RSI が 50 を超えたら買い、逆の交差で売り。取引はマーカーになり、結果を下にまとめています。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/demos/signals.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TradingChart, type TradingMarker } from "minerva-design/charts";
import { ema, rsi } from "minerva-design/charts/core";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 600,
  timeframe: HOUR,
  seed: 128,
  price: 64_800,
  volatility: 0.0045,
  volume: 300,
});

// a moving average cross, filtered by RSI, with the pure functions
const close = bars.map((bar) => bar.close);
const fast = ema(close, 9);
const slow = ema(close, 21);
const strength = rsi(close, 14);

interface Signal {
  index: number;
  side: "buy" | "sell";
  price: number;
}
const signals: Signal[] = [];
for (let i = 1; i < bars.length; i++) {
  const above = fast[i] > slow[i];
  const wasAbove = fast[i - 1] > slow[i - 1];
  if (Number.isNaN(slow[i - 1]) || above === wasAbove) continue;
  const holding =
    signals.length > 0 && signals[signals.length - 1].side === "buy";
  // buy crosses only when the RSI confirms the momentum, sell crosses close the trade
  if (above && !holding && strength[i] > 50)
    signals.push({ index: i, side: "buy", price: close[i] });
  if (!above && holding)
    signals.push({ index: i, side: "sell", price: close[i] });
}

// closed trades: a buy followed by a sell
const trades = signals
  .filter((signal) => signal.side === "sell")
  .map((sell) => {
    const buy = signals[signals.indexOf(sell) - 1];
    return { buy, sell, result: sell.price / buy.price - 1 };
  });
const wins = trades.filter((trade) => trade.result > 0).length;
const total =
  trades.reduce((product, trade) => product * (1 + trade.result), 1) - 1;

export default function SignalsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const markers = useMemo(
    (): TradingMarker[] =>
      signals.map((signal) => ({
        time: bars[signal.index].time,
        side: signal.side,
        text: t(signal.side === "buy" ? "buy" : "sell"),
      })),
    [t],
  );
  const percent = new Intl.NumberFormat(i18n.language, {
    style: "percent",
    maximumFractionDigits: 1,
    signDisplay: "exceptZero",
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <TradingChart
        bars={bars}
        timeframe="1H"
        symbol={t("btc")}
        indicators={[
          { type: "ema", period: 9, color: "#0ea5e9" },
          { type: "ema", period: 21, color: "#f59e0b" },
          { type: "rsi", period: 14, height: 100 },
        ]}
        markers={markers}
        ariaLabel={t("signalsAria")}
        height={460}
      />
      <span
        role="status"
        style={{
          color: "var(--text-secondary-color)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {t("signalsSummary", {
          trades: trades.length,
          wins,
          result: percent.format(total),
        })}
      </span>
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: スーパートレンドとパラボリック SAR

トレンドとともに反転するトレーリングストップ：上昇 / 下落で色が変わるスーパートレンドのバンドと SAR のドット。売買マーカーは純粋関数 supertrend で計算した反転点です。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/demos/supertrend.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Switch } from "minerva-design";
import { TradingChart, type TradingMarker } from "minerva-design/charts";
import { supertrend } from "minerva-design/charts/core";
import { HOUR, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 420,
  timeframe: 4 * HOUR,
  seed: 4_242,
  price: 142,
  volatility: 0.011,
  volume: 6e4,
});

const high = bars.map((bar) => bar.high);
const low = bars.map((bar) => bar.low);
const close = bars.map((bar) => bar.close);

const MULTIPLIERS = [2, 3, 4] as const;

export default function SupertrendDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const [multiplier, setMultiplier] = useState(3);
  const [sar, setSar] = useState(false);

  // the flips of the trend, from the pure function: buy / sell markers
  const markers = useMemo((): TradingMarker[] => {
    const { direction } = supertrend(high, low, close, 10, multiplier);
    const flips: TradingMarker[] = [];
    for (let i = 1; i < bars.length; i++) {
      if (direction[i - 1] === -1 && direction[i] === 1)
        flips.push({ time: bars[i].time, side: "buy", text: t("buy") });
      if (direction[i - 1] === 1 && direction[i] === -1)
        flips.push({ time: bars[i].time, side: "sell", text: t("sell") });
    }
    return flips;
  }, [multiplier, t]);

  const indicators = useMemo(
    () => [
      { type: "supertrend" as const, multiplier },
      ...(sar ? [{ type: "psar" as const }] : []),
    ],
    [multiplier, sar],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 20,
          fontSize: 13,
        }}
      >
        <RadioGroup
          label={t("bandDistance")}
          direction="horizontal"
          value={String(multiplier)}
          onChange={(value) => setMultiplier(Number(value))}
        >
          {MULTIPLIERS.map((value) => (
            <Radio
              key={value}
              value={String(value)}
              label={t("atrs", { value })}
            />
          ))}
        </RadioGroup>
        <Switch
          size="small"
          checked={sar}
          onChange={setSar}
          label={t("parabolicSar")}
        />
        <span
          role="status"
          style={{
            marginInlineStart: "auto",
            color: "var(--text-secondary-color)",
          }}
        >
          {t("flips", { count: markers.length })}
        </span>
      </div>
      <TradingChart
        bars={bars}
        timeframe="4H"
        symbol={t("sol")}
        indicators={indicators}
        markers={markers}
        ariaLabel={t("supertrendAria")}
        height={440}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: React なしで

minerva-design/charts/core の createTradingChart は同じチャートを任意の要素にマウントします：オプション、on() のイベント、destroy()。ここでは sma() で、ホバー中の終値が 50 日平均からどれだけ離れているかを示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/demos/vanilla.tsx

```tsx
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { createTradingChart, sma } from "minerva-design/charts/core";
import { DAY, generateBars } from "../../trading-chart/data";

const bars = generateBars({
  count: 250,
  timeframe: DAY,
  seed: 4,
  price: 96,
  volatility: 0.016,
  volume: 8e6,
  market: "stock",
});

// the 50-day average as a plain array, to report where the price stands
const average = sma(
  bars.map((bar) => bar.close),
  50,
);

export default function VanillaDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  const container = useRef<HTMLDivElement>(null);
  const status = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!container.current) return;
    // the framework-free engine: a container, options, events, destroy
    const chart = createTradingChart(container.current, {
      bars,
      timeframe: "1D",
      symbol: t("xom"),
      indicators: [
        { type: "ma", period: 50 },
        { type: "volume", maPeriod: 20 },
      ],
      locale: i18n.language,
      ariaLabel: t("vanillaAria"),
    });
    const off = chart.on("crosshairMove", (event) => {
      const i = event?.bar ? event.index : bars.length - 1;
      const distance = bars[i].close / average[i] - 1;
      if (status.current) {
        status.current.textContent = Number.isNaN(distance)
          ? t("vanillaWarmup")
          : t(distance >= 0 ? "vanillaAbove" : "vanillaBelow", {
              value: new Intl.NumberFormat(i18n.language, {
                style: "percent",
                maximumFractionDigits: 1,
              }).format(Math.abs(distance)),
            });
      }
    });
    return () => {
      off();
      chart.destroy();
    };
  }, [t, i18n.language]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div ref={container} style={{ height: 380 }} />
      <span
        ref={status}
        role="status"
        style={{ color: "var(--text-secondary-color)" }}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: VWAP

5 営業日分の 5 分足：出来高加重平均価格はセッションごとにリセットされ、下に出来高ペインがあります。utcOffset={0} で取引所の時刻をそのまま表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/demos/vwap.tsx

```tsx
import { useTranslation } from "react-i18next";
import { TradingChart } from "minerva-design/charts";
import { MINUTE, generateBars } from "../../trading-chart/data";

// five sessions of 5-minute bars, 9:30 to 16:00 exchange time
const bars = generateBars({
  count: 78 * 5,
  timeframe: 5 * MINUTE,
  seed: 21,
  price: 188,
  volatility: 0.0022,
  volume: 9e4,
  market: "stock",
  start: Date.UTC(2025, 2, 10, 9, 30),
});

export default function VwapDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.technical-indicators.data",
  });
  return (
    <TradingChart
      bars={bars}
      timeframe="5m"
      symbol={t("nvda")}
      // the times are exchange times: show them as they are
      utcOffset={0}
      indicators={[
        { type: "vwap", reset: "day" },
        { type: "volume", height: 90 },
      ]}
      barSpacing={5}
      ariaLabel={t("vwapAria")}
      height={420}
    />
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```
