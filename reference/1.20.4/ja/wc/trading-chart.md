# トレーディングチャート

プロ向け取引端末のチャート：隙間のない時間軸上のローソク足、インジケーターペイン、描画ツール、注文ライン、リアルタイム配信を GPU で描画し、100 万本の足でも滑らかに動きます。

Package: minerva-design@1.20.4

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

#### 概要

TradingChart は OHLCV の足（オブジェクト、または長い履歴向けの型付き配列の列）を受け取り、チャートエンジンの GPU バックエンドで描画します。軸、ラベル、描画、クロスヘアは Canvas2D のオーバーレイに描かれます。

時間軸は足の番号で並びます。週末、夜間、祝日に空白はできず、ラベルは時間足に合わせて変わります（新しい日や月は太字）。

移動平均、ボリンジャー・ケルトナー・ドンチャンの各チャネル、VWAP、パラボリック SAR、一目均衡表、スーパートレンドは価格に重ねて、出来高・MACD・RSI・KDJ・ATR・OBV・CCI・ストキャスティクス RSI・DMI・ウィリアムズ %R・MFI はそれぞれのペインに描かれ、ズームとクロスヘアを共有します。区切り線をドラッグするとペインの高さを変えられます。

足確定までのカウントダウン付き現在値ライン、表示範囲の高値・安値、売買マーカー、表示範囲の価格帯別出来高（POC とバリューエリア）、ドラッグ・取消・価格軸からの新規作成ができる注文・建玉・利確・損切・アラートの各ライン。

トレンドライン、レイ、矢印、水平線・垂直線、平行チャネル、アンドリューズ・ピッチフォーク、長方形、フィボナッチ・リトレースメント、テキストメモ、ロング / ショートのポジションツール、計測ツールを、価格ペインにもインジケーターペインにも描けます。選択した描画はフローティングツールバーでスタイルを変更でき、Ctrl / ⌘ + Z で元に戻せます。描画はただのデータで、drawings と onDrawingsChange で保存・復元できます。

#### ストリーミング

ティックごとに ref の update(bar) を呼びます。最後の足と同じ時刻なら置き換え、より新しい時刻なら追加します。最新の足が表示されている間はチャートが追従し、過去を見ているときは位置を保ったまま最新の足に戻るボタンを表示します。

ティックごとに再計算するのは最後の足のインジケーターだけで、GPU に送るのも最後の足だけ、描画は次のアニメーションフレームです。毎秒 50 回の更新もほとんど負荷になりません。縮小時は足をピクセル列ごとに集約するので、100 万本も 1000 本と同じ速さで描けます。

#### 操作

ホイールでポインター位置を中心にズーム（Shift または横スワイプでスクロール）、ドラッグで慣性付きのパン。

価格軸のドラッグで縦方向にズーム、時間軸のドラッグで足の幅を変更。軸をダブルクリックするとリセットします。

チャートにフォーカスすると、矢印キーでクロスヘアを一本ずつ移動して価格を読み上げ（Shift で十本ずつ）、+ / − でズーム、Home / End で最初 / 最新の足へ移動、Delete で選択中の描画を削除、Ctrl / ⌘ + Z で描画の変更を元に戻し、Ctrl / ⌘ + Shift + Z でやり直し、Escape で取り消します。

orderEntry 有効時：B / S でクロスヘア価格（または直近価格）に買い / 売り注文を準備し、↑ / ↓ で 1 ティックずつ（Shift：10 ティック）移動、Enter で発注、Esc で破棄します。種類は価格で決まり、直近価格より下の買い・上の売りは指値、上の買い・下の売りは逆指値です。Alt+B / Alt+S で指値と逆指値を切り替えられます。O / Shift + O でドラッグ・取消可能なラインを順に選んで同様に移動し、Delete で選んだ注文を取り消します。各操作は種類も含めて読み上げられ、ポインター操作と同じイベント（orderType 付きの orderCreate、orderMove、orderCancel）を発行します。

タッチ操作：ドラッグでパン、ピンチでズーム。

#### 言語

チャート自身が描く文字（四本値の名前、注文・アラートラインのタイトル、カウントダウン、計測ツール、アクセシブルな名前）は英語・中国語・日本語・フランス語を内蔵し、ページの言語（）に従い、切り替えにも追従します。出来高はその言語の単位（日本語では万 / 億）で表示します。別の言語は locale で、個々の文字は labels で指定できます。

色は既定では言語に従いません。日本語のページで米国株を表示することもあるためです。上昇を赤で示す市場では colorConvention="redUp" を指定するか、colorConvention="auto" でロケールから選びます：中国本土・台湾・日本・韓国（zh-CN、zh-TW、ja-JP、ko-KR、または地域なしの zh / ja / ko）は赤が上昇、それ以外（香港を含む）は緑が上昇です。

#### ワークフロー

マルチチャートレイアウト：syncCharts で複数のチャートがクロスヘアの時刻と表示時間範囲を共有します（時間足が違っても同期します）。

バーリプレイ：startReplay である時点以降の足を隠し、replayStep と replayPlay で選んだ速度で一本ずつ戻します。インジケーターはリアルタイムと同じように再計算されます。

タイムゾーンとセッション：timeZone で時間軸・セッション区切り・VWAP の期間に使う時計を指定します（夏時間にも対応）。

画像と全画面：toDataURL と toBlob はすべてのレイヤー（足、軸、描画、凡例）を一枚の画像に合成します。requestFullscreen でチャートを全画面表示します。

チャート設定

BTC/USDT

チャートスタイル

1分

5分

15分

1時間

4時間

日足

週足

ローソク足

中抜きローソク足

平均足

バー

ライン

エリア

ベースライン

MA

BOLL

出来高

MACD

RSI

KDJ

一目均衡表

スーパートレンド

価格帯別出来高

自動

%

対数

出来高、MACD、RSI のペインを持つ BTC/USDT のトレーディングチャート

ETH/USDT

SOL/USDT

Apple AAPL

ユーロ/ドル

ナスダック先物 NQ

貴州茅台 600519

BTCUSDT 無期限

一時停止

再開

一時停止中：配信が再開するまで最後の足はそのままです。

毎秒 {{rate}} 回更新 · 現在値 {{price}}

リアルタイムで更新される ETH/USDT の 1 分足チャート

約定 {{trades}} 件

SOL/USDT の全約定をリアルタイムで表示

Apple の日足

描画ツール

カーソル

トレンドライン

レイ

延長線

水平線

垂直線

長方形

フィボナッチ・リトレースメント

計測

矢印

平行チャネル

アンドリューズ・ピッチフォーク

テキストメモ

ロングポジション

ショートポジション

描画モードを維持

描画をスケールに収める

すべて削除

描画：{{count}}

描画付きの ETH/USDT 4 時間足チャート

買い建玉

利確

損切り

指値買い

指値売り

アラート

逆指値買い

逆指値売り

買 {{quantity}}

売 {{quantity}}

ポジション、注文、約定を表示した BTC/USDT の 1 時間足チャート

ポジションと注文

{{name}} を {{from}} から {{to}} に移動しました

チャート上の破線をドラッグすると注文を移動できます。

価格スケール

パーセント

対数

線形

BTC、ETH、SOL の 1 年間の値動きをパーセントで比較

古い足を必要に応じて読み込むユーロ/ドルの 1 時間足チャート

古い足を読み込み中…

{{total}} 本中 {{loaded}} 本を読み込み済み：左へスクロールすると続きを読み込みます

すべて表示

最新

{{bars}} 本 · {{renderer}} で描画

ナスダック先物の 1 分足 100 万本

上昇を赤で表示した貴州茅台の日足

24 時間の騰落

24 時間の高値

24 時間の安値

24 時間の出来高

ダーク端末の BTCUSDT 無期限 15 分足チャート

元に戻す

やり直す

画像をダウンロード

全画面

スナップショット

NVDA 日足チャートのスナップショット

toDataURL で合成：足・軸・凡例・ウォーターマークが 1 枚の PNG に。

50 日・200 日移動平均付きの NVDA 日足チャート

エヌビディア NVDA

価格帯別出来高

価格帯の数

表示位置

右

左

POC {{poc}} · バリューエリア {{low}} – {{high}}（出来高の 70%）

表示中の足の価格帯別出来高付き BTC/USDT 15 分足チャート

クロスヘアを同期

時間範囲を同期

{{symbol}} {{timeframe}} チャート

リプレイの操作

リプレイ開始

開始点を選び直す

再生

次の足

速度

終了

リプレイを開始し、戻りたい足をクリックしてください。

足をクリックすると、それ以降の足が隠れます。

{{total}} 本中 {{index}} 本目

バーリプレイ用の ETH/USDT 1 時間足チャート

{{price}} に指値買いを発注

{{price}} に指値売りを発注

注文を {{from}} から {{to}} に変更

{{price}} の注文を取消

チャート注文ができる BTCUSDT 無期限 5 分足チャート

チャートにカーソルを合わせ、右側の + をクリックすると指値注文（Alt で逆指値）、またはチャートにフォーカスして B / S を押します。ラインをドラッグで移動、× で取消。

タイムゾーン

ニューヨーク

ロンドン

上海

東京

UTC

セッション区切り

VWAP 付き AAPL 5 分足チャート（10 セッション）

上昇チャネル：押し目を待つ

未約定の注文

{{count}} 段

{{count}} 本 / 秒

配色

赤が上昇

言語に従う

緑が上昇

#### キーボード

B S

買い / 売り注文を用意

↑ ↓

価格を調整（Shift：×10）

Enter

発注・変更を確定

Esc

破棄

O

次の注文を選択

Delete

選択中の注文を取消

Alt+B Alt+S

指値と逆指値を切り替え

{{price}} に逆指値買いを発注しました

{{price}} に逆指値売りを発注しました

チャートをクリックしてアラートを追加。ドラッグで移動、× で削除します。

▲ アラート

▼ アラート

🔔

アラートは最大 {{value}} 件です。先に1件削除してください。

{{price}} にアラートを設定しました。

アラートを {{price}} に移動しました。

{{price}} のアラートを削除しました。

有効なアラート {{active}} 件、発動 {{fired}} 件。

{{time}}：価格が {{price}} まで上昇しました。

{{time}}：価格が {{price}} まで下落しました。

価格アラート付きの AAPL 1分足チャート

ES（E-mini S&P 500）

#{{id}}

×

売買

買い

売り

エントリー

エグジット

ポイント

損益

{{price}} · {{time}}

表示

取引 {{id}} をチャートに表示

純損益

勝率

{{rate}}（{{total}} 件中 {{wins}} 件）

プロフィットファクター

平均利益

平均損失

日誌の取引を示した E-mini S&P 500 の15分足チャート

決済済みの取引

表で取引を選ぶとチャートに表示します。

取引 {{id}}：{{side}} {{contracts}} 枚、{{pnl}}。

24時間 {{value}}

始 {{value}}

高 {{value}}

安 {{value}}

終 {{value}}

出来高 {{value}}

時間足

スマートフォンサイズの SOL/USDT チャート

## TradingChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/trading-chart",
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
    "name": "symbol",
    "typeText": "string | undefined",
    "attribute": "symbol",
    "required": false
  },
  {
    "name": "timeframe",
    "typeText": "TradingTimeframe | undefined",
    "attribute": "timeframe",
    "required": false
  },
  {
    "name": "chartStyle",
    "typeText": "TradingChartStyle",
    "attribute": "chart-style",
    "required": false
  },
  {
    "name": "bars",
    "typeText": "TradingBarsInput | undefined",
    "required": false
  },
  {
    "name": "indicators",
    "typeText": "readonly TradingIndicator[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<TradingChartOptions> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-crosshair-move",
    "typeText": "CustomEvent",
    "description": "The crosshair moved; detail: { time, index, bar, price, pane, x, y }, `null` when it left the chart"
  },
  {
    "name": "minerva-click",
    "typeText": "CustomEvent",
    "description": "A pane was clicked; detail: { time, index, price, pane }"
  },
  {
    "name": "minerva-visible-range-change",
    "typeText": "CustomEvent",
    "description": "The visible bars changed; detail: { from, to, fromTime, toTime }"
  },
  {
    "name": "minerva-order-move",
    "typeText": "CustomEvent",
    "description": "A draggable price line was dropped; detail: { id, price, previousPrice, line }"
  },
  {
    "name": "minerva-order-create",
    "typeText": "CustomEvent",
    "description": "The \"+\" order entry button was clicked (option `orderEntry`); detail: { price, side }"
  },
  {
    "name": "minerva-order-cancel",
    "typeText": "CustomEvent",
    "description": "The close button of a `cancellable` price line was clicked; detail: { id, line }"
  },
  {
    "name": "minerva-drawings-change",
    "typeText": "CustomEvent",
    "description": "The user added, moved or deleted drawings; detail: { drawings }"
  },
  {
    "name": "minerva-drawing-select",
    "typeText": "CustomEvent",
    "description": "The selected drawing changed; detail: { id }"
  },
  {
    "name": "minerva-drawing-tool-change",
    "typeText": "CustomEvent",
    "description": "The drawing tool changed (back to `cursor` after a drawing); detail: { tool }"
  },
  {
    "name": "minerva-undo-change",
    "typeText": "CustomEvent",
    "description": "Undo / redo of the drawings became possible or impossible; detail: { canUndo, canRedo }"
  },
  {
    "name": "minerva-replay-change",
    "typeText": "CustomEvent",
    "description": "The bar replay started, stepped, played, paused or stopped; detail: { active, picking, playing, speed, index, total, time }"
  },
  {
    "name": "minerva-fullscreen-change",
    "typeText": "CustomEvent",
    "description": "The chart entered or left full screen; detail: { fullscreen }"
  },
  {
    "name": "minerva-indicator-toggle",
    "typeText": "CustomEvent",
    "description": "An indicator was shown or hidden from its legend; detail: { id, visible }"
  },
  {
    "name": "minerva-history-request",
    "typeText": "CustomEvent",
    "description": "The oldest bar came into view (load older bars with `prependBars`); detail: { firstTime, count }"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend is ready (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: ローソク足・移動平均・サブチャート

日足に 2 本の移動平均と出来高・RSI のペインを表示します。テキストと日付はページの言語に従います。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/wc/candles.html

```html
<minerva-trading-chart
  id="candles"
  symbol="ACME"
  timeframe="1D"
></minerva-trading-chart>

```

### apps/docs/src/docs/pages/trading-chart/wc/candles.ts

```tsx
// <minerva-trading-chart>: candles on a gap-free time axis with moving
// averages over the price, volume and RSI panes below; the texts, numbers
// and dates follow the page language.
import type { MinervaTradingChart } from "minerva-design/web-components/trading-chart";

const TEXT = {
  en: { watermark: "ACME · 1D" },
  zh: { watermark: "ACME · 日线" },
  ja: { watermark: "ACME · 日足" },
  fr: { watermark: "ACME · 1 J" },
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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaTradingChart>("#candles")!;
  chart.bars = BARS;
  chart.indicators = [
    { type: "ma", period: 20 },
    { type: "ma", period: 50 },
    { type: "volume" },
    { type: "rsi", period: 14 },
  ];
  chart.options = { watermark: text.watermark };
}

```

## Example: リアルタイム配信

500 ms ごとのティックで最後のバーを更新し、10 回ごとに新しいバーを開きます。データ全体を渡し直す必要はありません。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/wc/streaming.html

```html
<minerva-trading-chart
  id="live"
  symbol="ACME"
  timeframe="1m"
  height="400"
></minerva-trading-chart>

```

### apps/docs/src/docs/pages/trading-chart/wc/streaming.ts

```tsx
// Real-time streaming: `updateBar(bar)` replaces the last bar (same time)
// or appends one (a later time) on every tick, without passing the whole
// data set again; the countdown shows when the current bar closes.
import type {
  MinervaTradingChart,
  TradingBar,
} from "minerva-design/web-components/trading-chart";

const TEXT = {
  en: { watermark: "ACME · 1m · live" },
  zh: { watermark: "ACME · 1 分钟 · 实时" },
  ja: { watermark: "ACME · 1 分足 · ライブ" },
  fr: { watermark: "ACME · 1 min · direct" },
};

// 120 one-minute bars, generated deterministically
const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
let close = 100;
const BARS = Array.from({ length: 120 }, (_, i) => {
  const open = close;
  close = round(
    open + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.5) / 2,
  );
  return {
    time: Date.UTC(2026, 9, 30, 9) + i * 60_000,
    open,
    high: round(Math.max(open, close) + 0.1),
    low: round(Math.min(open, close) - 0.1),
    close,
    volume: Math.round(200 + fraction(Math.sin(i * 3.7) * 9999) * 600),
  };
});

// the next state of the last bar: a tick moves its close, every 10th
// tick opens a new bar (a later time is appended by `update`)
const nextBar = (last: TradingBar, tick: number): TradingBar => {
  const close = round(
    last.close + (fraction(Math.sin(tick * 7.13) * 43758.5453) - 0.5) / 4,
  );
  return tick % 10 === 0
    ? {
        time: last.time + 60_000,
        open: last.close,
        high: Math.max(last.close, close),
        low: Math.min(last.close, close),
        close,
        volume: 40,
      }
    : {
        ...last,
        high: Math.max(last.high, close),
        low: Math.min(last.low, close),
        close,
        volume: (last.volume ?? 0) + 25,
      };
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaTradingChart>("#live")!;
  chart.bars = BARS;
  chart.indicators = [{ type: "ema", period: 9 }, { type: "volume" }];
  chart.options = { countdown: true, watermark: text.watermark };
  let last: TradingBar = BARS[BARS.length - 1];
  let tick = 0;
  let timer = 0;
  timer = window.setInterval(() => {
    tick += 1;
    last = nextBar(last, tick);
    chart.updateBar(last);
  }, 500);
  return () => window.clearInterval(timer);
}

```
