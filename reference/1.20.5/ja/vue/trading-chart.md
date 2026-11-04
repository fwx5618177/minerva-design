# トレーディングチャート

プロ向け取引端末のチャート：隙間のない時間軸上のローソク足、インジケーターペイン、描画ツール、注文ライン、リアルタイム配信を GPU で描画し、100 万本の足でも滑らかに動きます。

Package: minerva-design@1.20.5

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TradingChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "deep",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also follows in-place mutations of nested data (`series[0].data.push()`);\nby default the chart updates when a prop is replaced (cheaper on large data)",
    "typeText": "boolean"
  },
  {
    "name": "legend",
    "type": "boolean",
    "required": false,
    "description": "Legends with the values at the crosshair and the indicator toggles (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "grid",
    "type": "boolean",
    "required": false,
    "description": "Grid lines (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "sessionBreaks",
    "type": "boolean",
    "required": false,
    "description": "Dashed vertical lines where a day starts (intraday bars; default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "lastPriceLine",
    "type": "boolean",
    "required": false,
    "description": "Line and axis label at the last price (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "countdown",
    "type": "boolean",
    "required": false,
    "description": "Time left until the current bar closes, under the last price label (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "highLowMarkers",
    "type": "boolean",
    "required": false,
    "description": "Marks the highest and lowest prices of the visible bars (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "orderEntry",
    "type": "boolean",
    "required": false,
    "description": "A \"+\" button at the crosshair price reporting a limit order (`orderCreate`); with the chart focused, `B` / `S` arm a keyboard order (arrows move it, Enter confirms, Escape cancels; default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "volumeProfile",
    "type": "boolean | TradingVolumeProfileOptions",
    "required": false,
    "description": "Volume by price of the visible bars, with its point of control and value area (`true` for the defaults; default `false`)",
    "typeText": "boolean | TradingVolumeProfileOptions"
  },
  {
    "name": "keepDrawingMode",
    "type": "boolean",
    "required": false,
    "description": "Keeps the drawing tool after a drawing is made (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "drawingToolbar",
    "type": "boolean",
    "required": false,
    "description": "Floating toolbar over the selected drawing: color, width, style, fill, lock, delete (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "autoscaleIncludesDrawings",
    "type": "boolean",
    "required": false,
    "description": "The automatic price scale also fits the visible drawings of each pane (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "kineticScroll",
    "type": "boolean",
    "required": false,
    "description": "Keeps panning after a quick drag (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "symbol",
    "type": "string",
    "required": false,
    "description": "Name shown in the legend and the accessible label (`\"BTC/USDT\"`)",
    "typeText": "string"
  },
  {
    "name": "labels",
    "type": "Partial<TradingChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<TradingChartLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the bars and lines: WebGPU, then WebGL2, WebGL, Canvas2D (default `auto`)",
    "typeText": "ChartRendererPreference"
  },
  {
    "name": "width",
    "type": "string | number",
    "required": false,
    "description": "Width of the chart; numbers are pixels (default `100%`)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels, strings any CSS length",
    "typeText": "string | number"
  },
  {
    "name": "crosshair",
    "type": "TradingCrosshairMode",
    "required": false,
    "description": "Crosshair behaviour (default `magnet`)",
    "typeText": "TradingCrosshairMode"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label; built from the symbol by default",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "Locale of the texts, numbers and dates (`\"zh-CN\"`); the page language by default",
    "typeText": "string"
  },
  {
    "name": "bars",
    "type": "TradingBarsInput",
    "required": false,
    "description": "Bars, oldest first; replaced when a new array / object is passed (stream with the handle's `update`)",
    "typeText": "TradingBarsInput"
  },
  {
    "name": "priceLines",
    "type": "readonly TradingPriceLine[]",
    "required": false,
    "description": "Order, position, take profit / stop loss and alert lines",
    "typeText": "readonly TradingPriceLine[]"
  },
  {
    "name": "upColor",
    "type": "string",
    "required": false,
    "description": "Color of rising bars (any CSS color, `var(--x)` included)",
    "typeText": "string"
  },
  {
    "name": "downColor",
    "type": "string",
    "required": false,
    "description": "Color of falling bars",
    "typeText": "string"
  },
  {
    "name": "colorConvention",
    "type": "TradingColorConvention",
    "required": false,
    "description": "Colors of rising / falling bars: `redUp` swaps the defaults, `auto` follows the market convention of the `locale` (red up for CN, TW, JP, KR; default `greenUp`)",
    "typeText": "TradingColorConvention"
  },
  {
    "name": "formatPrice",
    "type": "((price: number) => string)",
    "required": false,
    "description": "Formats the prices (axis, legend, labels); overrides `precision`",
    "typeText": "((price: number) => string)"
  },
  {
    "name": "precision",
    "type": "number",
    "required": false,
    "description": "Decimals of the prices; detected from the data by default",
    "typeText": "number"
  },
  {
    "name": "timeZone",
    "type": "string",
    "required": false,
    "description": "Time zone of the time axis, the session breaks and the VWAP periods (IANA name such as `\"America/New_York\"`, or `\"UTC\"`); local time by default",
    "typeText": "string"
  },
  {
    "name": "indicators",
    "type": "readonly TradingIndicator[]",
    "required": false,
    "description": "Indicators, over the price or in panes below it, in this order",
    "typeText": "readonly TradingIndicator[]"
  },
  {
    "name": "timeframe",
    "type": "TradingTimeframe",
    "required": false,
    "description": "Duration of a bar; inferred from the bar times by default",
    "typeText": "TradingTimeframe"
  },
  {
    "name": "chartStyle",
    "type": "TradingChartStyle",
    "required": false,
    "description": "How the bars are drawn (default `candles`)",
    "typeText": "TradingChartStyle"
  },
  {
    "name": "scaleMode",
    "type": "TradingScaleMode",
    "required": false,
    "description": "Price scale of the price pane (default `linear`)",
    "typeText": "TradingScaleMode"
  },
  {
    "name": "utcOffset",
    "type": "number",
    "required": false,
    "description": "Offset of the displayed times from UTC, in minutes (`480` for UTC+8); overrides `timeZone`",
    "typeText": "number"
  },
  {
    "name": "markers",
    "type": "readonly TradingMarker[]",
    "required": false,
    "description": "Buy / sell markers",
    "typeText": "readonly TradingMarker[]"
  },
  {
    "name": "compare",
    "type": "readonly TradingCompareSeries[]",
    "required": false,
    "description": "Comparison series (best read with `scaleMode: \"percent\"`)",
    "typeText": "readonly TradingCompareSeries[]"
  },
  {
    "name": "drawings",
    "type": "readonly TradingDrawing[]",
    "required": false,
    "description": "Drawings; replaced when a new array is passed (see the `drawingsChange` event)",
    "typeText": "readonly TradingDrawing[]"
  },
  {
    "name": "drawingMode",
    "type": "TradingDrawingTool",
    "required": false,
    "description": "Active drawing tool (default `cursor`)",
    "typeText": "TradingDrawingTool"
  },
  {
    "name": "baselinePrice",
    "type": "number",
    "required": false,
    "description": "Price of the `baseline` style; the close of the first visible bar by default",
    "typeText": "number"
  },
  {
    "name": "rightOffset",
    "type": "number",
    "required": false,
    "description": "Empty space after the last bar, in bars (default 8)",
    "typeText": "number"
  },
  {
    "name": "barSpacing",
    "type": "number",
    "required": false,
    "description": "Initial width of a bar, in pixels (default 8)",
    "typeText": "number"
  },
  {
    "name": "wheel",
    "type": "\"zoom\" | \"none\" | \"modifier\"",
    "required": false,
    "description": "Mouse wheel: `zoom`, `modifier` (zoom with Ctrl / ⌘ only) or `none` (default `zoom`)",
    "typeText": "\"zoom\" | \"none\" | \"modifier\""
  },
  {
    "name": "watermark",
    "type": "string",
    "required": false,
    "description": "Large faint text behind the bars (`\"BTCUSDT · 1H\"`)",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "click",
    "type": "[event: TradingClickEvent]",
    "typeText": "[event: TradingClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "type": "[renderer: ChartRendererKind]",
    "typeText": "[renderer: ChartRendererKind]",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "crosshairMove",
    "type": "[event: TradingCrosshairEvent | null]",
    "typeText": "[event: TradingCrosshairEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingCrosshairEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "visibleRangeChange",
    "type": "[range: TradingVisibleRange]",
    "typeText": "[range: TradingVisibleRange]",
    "parameters": [
      {
        "name": "range",
        "position": 0,
        "typeText": "TradingVisibleRange",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "orderMove",
    "type": "[event: TradingOrderMoveEvent]",
    "typeText": "[event: TradingOrderMoveEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingOrderMoveEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "orderCreate",
    "type": "[event: TradingOrderCreateEvent]",
    "typeText": "[event: TradingOrderCreateEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingOrderCreateEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "orderCancel",
    "type": "[event: TradingOrderCancelEvent]",
    "typeText": "[event: TradingOrderCancelEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingOrderCancelEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "drawingsChange",
    "type": "[drawings: readonly TradingDrawing[]]",
    "typeText": "[drawings: readonly TradingDrawing[]]",
    "parameters": [
      {
        "name": "drawings",
        "position": 0,
        "typeText": "readonly TradingDrawing[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "drawingSelect",
    "type": "[id: string | null]",
    "typeText": "[id: string | null]",
    "parameters": [
      {
        "name": "id",
        "position": 0,
        "typeText": "string | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "drawingToolChange",
    "type": "[tool: TradingDrawingTool]",
    "typeText": "[tool: TradingDrawingTool]",
    "parameters": [
      {
        "name": "tool",
        "position": 0,
        "typeText": "TradingDrawingTool",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "undoChange",
    "type": "[state: TradingUndoState]",
    "typeText": "[state: TradingUndoState]",
    "parameters": [
      {
        "name": "state",
        "position": 0,
        "typeText": "TradingUndoState",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "replayChange",
    "type": "[state: TradingReplayState]",
    "typeText": "[state: TradingReplayState]",
    "parameters": [
      {
        "name": "state",
        "position": 0,
        "typeText": "TradingReplayState",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "fullscreenChange",
    "type": "[fullscreen: boolean]",
    "typeText": "[fullscreen: boolean]",
    "parameters": [
      {
        "name": "fullscreen",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "indicatorToggle",
    "type": "[event: TradingIndicatorToggleEvent]",
    "typeText": "[event: TradingIndicatorToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingIndicatorToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "historyRequest",
    "type": "[event: TradingHistoryRequestEvent]",
    "typeText": "[event: TradingHistoryRequestEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingHistoryRequestEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: candles

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/vue/candles.vue

```vue
<script setup lang="ts">
// <TradingChart>: candles on a gap-free time axis with moving averages over
// the price, volume and RSI panes below; the texts, numbers and dates
// follow the page language.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { TradingChart } from "minerva-design/vue/charts";

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

const indicators = [
  { type: "ma", period: 20 },
  { type: "ma", period: 50 },
  { type: "volume" },
  { type: "rsi", period: 14 },
] as const;

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
</script>

<template>
  <TradingChart
    :bars="BARS"
    symbol="ACME"
    timeframe="1D"
    :indicators="indicators"
    :watermark="text.watermark"
  />
</template>

```

## Example: streaming

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/vue/streaming.vue

```vue
<script setup lang="ts">
// Real-time streaming: the handle's `update(bar)` replaces the last bar
// (same time) or appends one (a later time) on every tick, without passing
// the whole data set again; the countdown shows when the bar closes.
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import {
  TradingChart,
  type TradingBar,
  type TradingChartHandle,
} from "minerva-design/vue/charts";

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

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const chart = ref<TradingChartHandle>();
let last: TradingBar = BARS[BARS.length - 1];
let tick = 0;
let timer = 0;
onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    last = nextBar(last, tick);
    chart.value?.update(last);
  }, 500);
});
onBeforeUnmount(() => window.clearInterval(timer));
</script>

<template>
  <TradingChart
    ref="chart"
    :bars="BARS"
    symbol="ACME"
    timeframe="1m"
    :indicators="[{ type: 'ema', period: 9 }, { type: 'volume' }]"
    countdown
    :watermark="text.watermark"
    :height="400"
  />
</template>

```
