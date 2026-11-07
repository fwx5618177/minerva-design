# チャートのパフォーマンス

数百万点でもチャートエンジンが高速に動く仕組みを、ライブデモとともに解説します：レンダラーの選択とフォールバック、データ形式、表示範囲に比例する処理、間引き、ヒットテスト、React とストリーミングのコツ、ミニプログラムと React Native の描画予算。

Package: minerva-design@1.22.0

Renderer: weapp

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

### 概要

エンジンは重い処理をデータセットごとに一度だけ行い、その後の処理はすべて画面に表示されている内容に比例するようにしています。データ配列は Float64Array の列に正規化されて GPU バッファーに変換され、同じ参照を渡している限り再利用されます。ホバー、ズーム、パンは表示中の点か変換行列だけを扱います。このページでは、何が高速で何がデータ全体の走査を伴うのか、そしてチャートを高速な経路に保つ方法を説明します。

オプションは Chart（React）と チャートエンジン（フレームワーク非依存）で説明しています。4 つのバックエンドの比較、ライブベンチマーク、スコアはレンダラー比較にあります。

### レンダラーとフォールバック

直交座標系のチャート（折れ線、面グラフ、棒、散布図、ローソク足、ヒートマップ、スパークライン、象限）は、データを GPU で、テキスト（軸、ラベル、凡例、ツールチップ）を DOM で描画します。バックエンドは renderer オプションで選びます。

auto（既定）は WebGPU、WebGL2、WebGL、Canvas2D の順に試し、最初に起動できたものを使います。ready の Promise は選ばれた種類で解決され、onRendererChange / renderer イベントでも通知されます。

WebGL（1）は、古い GPU やドライバー、WebGL2 に対応していないブラウザーのためのセーフティネットです。マーク、色、アンチエイリアスはまったく同じで、GLSL ES 1.0 のシェーダーと ANGLE_instanced_arrays 拡張（ほぼすべての環境で利用可能）によるインスタンス描画を使います。この拡張がない場合は Canvas2D に進みます。

auto では Canvas2D より遅いソフトウェア GPU をスキップします。WebGPU はフォールバックアダプターを拒否し、WebGL2 と WebGL は failIfMajorPerformanceCaveat 付きで作成され、レンダラー名がソフトウェアラスタライザー（SwiftShader、llvmpipe、softpipe、Microsoft Basic Render Driver など）を示す場合も拒否されます。そのため仮想マシンやヘッドレスブラウザーでは通常 Canvas2D になります。

renderer: "webgpu"、"webgl2"、"webgl"、"canvas2d" を指定するとそのバックエンドを強制し、ソフトウェア GPU も許可されます。起動できない場合はチェーンの次のバックエンドが使われます。Canvas2D は小さなチャートやスクリーンショットに向いており、数万点を超えると GPU が有利です。

GPU が失われた場合（ドライバーのリセット、コンテキストの過多など）、チャートは次のバックエンドにフォールバックして再描画し、renderer イベントを再度発火します。ブラウザーは同時に存在できる WebGL コンテキスト数を制限しています（約 16）。GPU チャートを何十個も並べるダッシュボードでは、画面外に出たチャートを破棄するか、小さなものには Canvas2D を使ってください。

### すべてのチャートに 1 つのレンダラー

setDefaultChartRenderer() は、renderer が未指定または "auto" のすべてのチャートのバックエンドを、フレームワークを問わず設定します。既定値は globalThis に保持されるため、React コンポーネント、Vue と Angular のラッパー、Web Components で共有され、ページにエンジンの複数のコピーがバンドルされていても同じです。表示中のチャートは変更にライブで追従し、データ・ズーム・状態を保ったままその場でレンダラーを作り直します。変更は subscribeDefaultChartRenderer() で受け取れます（ピッカーの同期など）。

チャート自身の renderer オプションが常に優先されます。既定値で強制したバックエンドは強制扱いとなり、ソフトウェア GPU でも動作し、起動できない場合は次のバックエンドにフォールバックします。"auto" で自動検出に戻ります。

このドキュメントのチャートページ上部にあるレンダラーバーがまさにこれを行います。そこで Canvas2D や WebGL を選ぶとページ上のすべてのチャートがそのバックエンドに切り替わり、各デモの下のバッジに実際に使用中のバックエンドが表示されます。このページでは、各ショーケースの「自動」がこれに従います。

### ライブデモ

以下の例は、ブラウザー上で最大 100 万個のマークを描画します。データは例が画面に近づいたときに、シード付き乱数で型付き配列へ一度だけ生成され、例が画面外にある間はアニメーションが止まります。バックエンドを選ぶと強制でき（実際に起動したものが表示されます）、カメラツアーに拡大・縮小を任せることも、マウスで操作することもできます。

FPS とフレーム時間：チャートが動いている間にページが描画される頻度です。ディスプレイは毎秒 60 回以上更新され、30 を下回ると動きが重く感じられます。

メインスレッド：各フレームの JavaScript、スタイル、レイアウト、ペイントの時間で、チャートの描画呼び出しを含みます（GPU 自体は並行して動作します）。低いほどページの他の処理に余裕が残ります。

最初のフレーム：データ（または新しいバックエンド）をチャートに渡してから、最初のフレームが描画されるまでの時間です。列の正規化、GPU バッファーの構築、描画を含みます。

レンダラー

自動

WebGPU

WebGL2

WebGL

Canvas2D

ページ（{{backend}}）

カメラツアー

ストリーム

レンダラー

FPS

フレーム時間

メインスレッド

最初のフレーム

点数

セル数

ローソク足

取り込み

{{value}} ms

{{value}} fps

{{value}}/秒

{{value}} dB

{{value}} 個のデータ点を生成しています…

レンダラーを起動しています…

自動で {{backend}} を選びました。この環境で使える最良のバックエンドです。

自動で {{backend}} を選びました。この環境にはハードウェアアクセラレーション対応の GPU がありません（ソフトウェア GPU はスキップされます）。

指定どおり {{backend}} で描画しています。

{{requested}} はこの環境では起動できないため、{{backend}} にフォールバックしました。

カメラツアーを一時停止しました：このバックエンドでは 1 フレームにメインスレッドを {{ms}} 使います。再度オンにするか、別のバックエンドを選んでください。

ページで選択したレンダラー {{backend}} で描画しています。

ページで選択した {{requested}} はここではソフトウェア GPU で動作するため、ページの応答性を保つためにこのデモでは {{backend}} を使用します。強制するには、このデモで {{requested}} を選択してください。

Ctrl / ⌘ + ホイールまたはピンチでズーム、ドラッグでパン、ダブルクリックでリセット。y 軸は表示範囲に追従します。

Ctrl / ⌘ + ホイールまたはピンチで両軸をズーム、ドラッグでパン、ダブルクリックでリセット。

新しいサンプルが届くと、古いサンプルはウィンドウから外れます。ホバーするとチャンネルの値を読めます。

センサー {{index}}

温度（°C）

4 つのセンサー、1,000,000 件の測定値

クラスター {{index}}

10 個のクラスター、1,000,000 点

指数

価格

200,000 本の 1 分足ローソク足

レベル

時間（秒）

周波数（Hz）

1,000 × 1,000 セルのスペクトログラム

チャンネル {{index}}

リアルタイムでストリーミングする {{value}} チャンネル

{{backend}}：同じデータセット

データセット

折れ線 · 100 万点

散布図 · 100 万点

ベンチマークを実行

→ {{backend}}（フォールバック）

計測中…

フレームあたりのメインスレッド時間（短いほど良い）とフレームレート

{{backend}} を計測しています…

完了：同じデータ、同じズーム経路で、バックエンドを 1 つずつ計測しました。

ベンチマークを実行して、このデバイスで各バックエンドを計測します。

1 回の実行では全点を持つチャートを 1 つだけ 3 秒間マウントし、終了後はプレビューに戻します。

{{requested}} → {{backend}}

プレビュー：Canvas2D で {{value}}点を描画。ベンチマークを実行すると 100 万点を描画します。

{{backend}}：データセットのプレビュー

ライブ：{{backend}} で {{value}}点を描画中

ソフトウェア GPU：スキップ（ページがブロックされるため）

それでも実行

スキップ

スキップ（ソフトウェア GPU）：{{backends}}。

### データ形式（速い順）

各系列は一度だけ列に正規化されます。その処理コストは渡す形式によって決まります。

型付き配列の列（{ x: Float64Array, y: Float32Array }）：1 回の set() でコピーされ、点ごとの変換はありません。Float64Array で渡した open / high / low / value の列はそのまま使われます。10 万点以上に最適です。

通常の配列の列（{ x: number[], y: number[] }）：数値をコピーするループが 1 回だけ。カテゴリーや Date はここで変換されます。

[x, y] のタプル：点ごとに小さな配列を 1 つ読み取ります。

{ x, y, … } オブジェクト：最も柔軟（size、color、label、open/high/low、value）ですが、点ごとにすべてのフィールドを読むため最も遅い形式です。数千点までなら問題ありません。

正規化済みデータは系列の id（またはインデックス）と配列の参照でキャッシュされます。同じ配列を再度渡してもコストはかかりませんが、その場で書き換えた配列は再読み込みされません。系列の順序が変わる可能性がある場合は id を付け、x を昇順に並べてください。ソート済みデータで以下の二分探索が有効になります。

### 表示範囲に比例する処理

最初の処理の後、1 フレームの処理量はデータセットの大きさではなく表示内容で決まります。

x がソートされた折れ線・面グラフ・棒：表示範囲を二分探索で求め、その点だけを描画・ヒットテストします。ホバーの検索は O(log n) です。

散布図、ローソク足、ヒートマップの系列はすべて描画されます（GPU では 1 回のインスタンス描画呼び出し）。ソートされていない折れ線も同様です。

Canvas2D は折れ線と面グラフをピクセル列ごとの最小値 / 最大値に間引きます（1 列あたり最大 4 点）。100 万点でも数千本の線分で同じ輪郭が描かれます。

Canvas2D では 20,000 点を超える散布図をパスではなく ImageData バッファーに直接ラスタライズします。作業用キャンバスがない環境（ミニプログラム）では、点のあるセルごとに四角形を 1 つ描きます。

散布図のヒットテストには均一グリッドのインデックス（1 セルあたり約 4 点、必要時に構築しデータ配列ごとにキャッシュ）を使うため、10 万点の上でもホバーは 1 ミリ秒未満です。

DOM は変化があったときだけ更新されます。凡例は項目が変わったときだけ再構築され、ポインターが同じ点の上にある間はツールチップとホバーマーカーが再利用され、解決済みのテーマカラーはテーマが変わるまでキャッシュされます。

### ズームとパン

WebGPU、WebGL2、WebGL では、ズームとパンは変換用の uniform を変えるだけで、点の数に関係なくバッファーは再構築されません。バッファーは原点からの相対位置を float32 で保持するため、原点から離れた位置で約 2000 倍を超えて拡大すると、サブピクセル精度を保つために原点を置き直してバッファーを一度だけ再構築します。

Canvas2D では毎フレーム、表示範囲をピクセル列ごとに間引いて再描画します。コストは表示点数に比例し、ソート済みの折れ線と面グラフではプロット幅が上限になります。大きな散布図はここではフレームごとに O(n) のままなので、インタラクティブな散布図には GPU バックエンドを使うか点数を減らしてください。

### どこまで扱えるか

エンジンのベンチマークでの計測値（Node、CI 相当の環境。お使いのハードウェアでは異なります）：

100 万点の折れ線：モデルと GPU 描画アイテムの構築に約 15 ms。

10 万点の散布図：構築と 1,000 回のヒットテストで約 13 ms。

同一オプションでの setOptions：約 0.03 ms で何も再構築しません。同じ点の上でのツールチップ移動：約 0.03 ms。

目安：GPU では、数百万点のソート済み（型付き配列の）折れ線や面グラフもインタラクティブに動きます。散布図は GPU で 10 万〜50 万点程度、Canvas2D で 2 万〜5 万点程度に抑えてください。棒とローソク足は表示マークが数千個までなら読みやすいので、それ以上は集計（日足、月別の棒）してから描画します。ヒートマップは数万セルまで扱えます。

### React でのコツ

データの参照を安定させてください。series とそのデータは useMemo で（またはコンポーネントの外で）作成し、依存するデータをキーにします。新しいデータ配列は新しいデータセットとして全体を処理し直します。

setOptions を呼ぶ前に props は浅く比較されます。トップレベルのオプションは参照または 1 階層まで、各系列のフィールドは参照で比較されます。yAxis={{ min: 0 }} や series={[{ name, data }]} のようなインラインオブジェクトも、data 自体が安定していれば問題なく、同一の再レンダリングはコストゼロです。

レンダリングのたびに型付き配列を作り直さないでください（レンダー関数内での new Float64Array(…)）。データが届いたときに確保し、state か ref に保持します。

形状チャート（円、ドーナツ、レーダー、ゲージ、ファネル、ツリーマップ）もオプションをメモ化しますが、変更のたびにアニメーションします。アニメーションの再生を避けるため、data、padding、palette を安定させてください。

### ストリーミング更新

点を追加するときは新しい配列（または新しい型付き配列）を渡して setOptions を呼びます。変更された系列は O(n) で再正規化され、他の系列は再利用されます。スライディングウィンドウ（例：直近 50,000 点）を保ち、コストに上限を設けてください。

サンプルはまとめて処理し、メッセージごとではなくフレームごと（requestAnimationFrame）またはタイマーで最大 1 回更新します。型付き配列を使う高頻度のデータでは、大きめのバッファーを事前に確保し、埋まった部分の subarray() ビューを渡します。新しいビューは新しい参照になりますが、メモリは再利用されます。

### 形状チャートか直交座標チャートか

円、ドーナツ、ローズ、レーダー、ゲージ、ファネル、ツリーマップ、サンキー、サンバースト、コードなどの形状チャートは、ほかのチャートと同じ GPU バックエンド（WebGPU → WebGL2 → WebGL → Canvas2D。renderer オプションまたは setDefaultChartRenderer で選択）を使います。円弧・多角形・リボンは三角形に分割されて 4x MSAA で描画され、凸でない塗りはステンシルバッファ（非ゼロ回転規則）で処理され、文字はシェイプの上に重ねた 2D キャンバスに描画されます。GPU バックエンドが起動できない場合は Canvas2D にフォールバックし、ミニプログラム（createCanvasShapeChart）では常に Canvas2D です。

点が多い、ズームやパンが必要、あるいはライブデータを扱うなら直交座標チャート（折れ線、面グラフ、棒、散布図、ローソク足、ヒートマップ）を選びます。

構成比、プロファイル、単一の KPI、階層構造には形状チャートを選びます（数十〜数百個のマーク）。それを超える場合は、何千もの扇形より集計データのツリーマップやヒートマップのほうが読みやすくなります。小さな形状チャートを 1 ページにたくさん置いても低コストです。WebGPU では 1 つのデバイスを共有し、WebGL ではチャートごとにコンテキストを使いますが、ブラウザーの上限（約 16）を超えると、最も長く描画されていない画面外のチャートが一時停止され、スクロールで戻ったときに復元されます。renderer="canvas2d" なら GPU コンテキストをまったく使いません。

### ミニプログラムと React Native

ミニプログラムのチャート は canvas type="2d" 上で createCanvasChart（形状チャートは createCanvasShapeChart）を使います。常に Canvas2D で、JavaScript エンジンも低速です。ピクセル単位の間引きで折れ線は高速に保たれますが、目安は数百万点ではなく数万点です。大きな配列を setData で渡すのは避け（シリアライズされます）、散布図は数千点に抑えてください。

React Native ではチャートを View だけで描画するため、図形の数に上限があります。折れ線は全体で約 1,200 点、散布図は系列ごとに 800 点（全体で 2,000 点）、棒は系列ごとに 600 本（全体で 1,500 個の矩形。ローソク足は 1 本で 2 個、ヒートマップのセルは 1 個として数える）、面グラフは 1 つにつき 200 本の縦帯です。予算を超えると点はセルごとに、棒はピクセル列ごとに統合されます。全体像は正しく保たれますが細部は失われ、データは JavaScript で処理されるため、先に集計してください。

独自のレンダラーでは、createChartController と scenePrimitives で同じ予算を使えます。scenePrimitives(scene, { maxDots, maxBars, columnWidth, dotCell }) は間引き済みの図形を返します（既定値：系列ごとに 4000 点と 2000 本、列幅 1 px）。

### 高頻度ホバー：フレーム内で集約

公開エンジンに同一フレームで240回の交互ポインター移動を送り、最後の位置だけを判定・描画します。押下・ドラッグ・解放は同期処理を維持します。数値は実ブラウザーの測定で、すべてのデータ量でのFPSを保証しません。

240回移動を実行

ポインター移動

ホバー通知

ツールチップ描画

送信とフレーム待機（ms）

最後の点

ホバー集約ベンチマーク

```ts
import { createChart } from "minerva-design/charts/core";

// "auto" (default): WebGPU, then WebGL2, then WebGL, then Canvas2D
const chart = createChart(container, { series, renderer: "auto" });
chart.ready.then((kind) => showRenderer(kind)); // "webgpu" | "webgl2" | "webgl" | "canvas2d" | null
// fired again when the GPU is lost and the chart falls back
chart.on("renderer", (kind) => showRenderer(kind));

// force a backend (also accepted on every React chart: renderer="webgl")
createChart(other, { series, renderer: "canvas2d" });
```

```ts
import {
  createChart,
  getDefaultChartRenderer,
  setDefaultChartRenderer,
  subscribeDefaultChartRenderer,
} from "minerva-design/charts/core";

// every chart with renderer unset or "auto" (React, Vue, Angular,
// Web Components) switches to WebGL2, including the charts on screen
setDefaultChartRenderer("webgl2");
getDefaultChartRenderer(); // "webgl2"

// e.g. keep a renderer picker in sync
const unsubscribe = subscribeDefaultChartRenderer((preference) => {
  picker.value = preference;
});

// a chart's own option still wins
createChart(container, { series, renderer: "canvas2d" });

setDefaultChartRenderer("auto"); // back to WebGPU -> WebGL2 -> WebGL -> Canvas2D
```

```ts
const n = 1_000_000;
const x = new Float64Array(n); // timestamps or indexes, sorted
const y = new Float32Array(n);
// ...fill x and y once

// fastest: typed-array columns, copied in one go (no per-point conversion)
const fast = [{ id: "signal", name: "Signal", data: { x, y } }];

// slower: plain arrays in columns, then [x, y] tuples,
// then { x, y } objects (converted point by point)
const slow = [{ name: "Signal", data: points.map((p) => ({ x: p.t, y: p.v })) }];
```

```tsx
import { useMemo } from "react";
import { LineChart } from "minerva-design/charts";

function Telemetry({ samples }: { samples: Samples }) {
  // build the columns once per data set, not on every render
  const series = useMemo(
    () => [{ id: "cpu", name: "CPU", data: { x: samples.time, y: samples.cpu } }],
    [samples],
  );
  // inline props are fine: they are compared shallowly and skip setOptions
  return <LineChart series={series} yAxis={{ min: 0, max: 100 }} height={320} />;
}
```

```ts
let data: [number, number][] = [];
let queued: [number, number][] = [];

socket.onmessage = (event) => {
  queued.push(JSON.parse(event.data));
};

// one update per frame, however many samples arrived
function flush() {
  if (queued.length) {
    // a new array: arrays mutated in place are not read again
    data = [...data, ...queued].slice(-50_000);
    queued = [];
    chart.setOptions({ ...base, series: [{ id: "cpu", name: "CPU", data }] });
  }
  requestAnimationFrame(flush);
}
requestAnimationFrame(flush);
```

```ts
import {
  createChartController,
  scenePrimitives,
} from "minerva-design/charts/core";

const controller = createChartController({
  options,
  measureText: (text, font) => measure(text, font),
  onInvalidate: () => draw(),
});
controller.setSize(360, 240);

function draw() {
  const scene = controller.getScene();
  if (!scene) return;
  // fewer, coarser shapes for a slow host (e.g. one native view per shape)
  const shapes = scenePrimitives(scene, {
    maxDots: 1500, // per series: then merged per cell
    maxBars: 600, // per series: then merged per pixel column
    columnWidth: 3, // lines: at most 4 points per 3 px column
  });
  paint(shapes);
}
```

## CandlestickChart

Support: beta

Chart whose untyped series are OHLC candles (`open`, `high`, `low`, `y`). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/candlestick-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": 320
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## Chart

Support: beta

Mixed line/area/bar/scatter series on a <canvas type="2d"> (DOM-free canvas engine): axes, legend with tap-to-toggle, tooltip, crosshair, annotations, tap/scrub hover, pan when zoomed, pinch zoom, double-tap reset, point dragging, Minerva theme/palette/design tokens from the nearest provider. Properties are serialized by setData: data must be JSON (timestamps instead of Date, no typed arrays) and large data sets cost a copy per update. Function options (axis format, tooltip text) use configure(); tooltips are canvas text, not ReactNode content. No renderer choice, wheel or keyboard navigation. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": 320
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis2",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "stackMode",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "orientation",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## LineChart

Support: beta

Chart whose untyped series are lines, or areas with `area`. Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/line-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": 320
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "area",
    "typeText": "boolean",
    "required": false,
    "default": false
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## ScatterChart

Support: beta

Chart whose untyped series are dots, zooming on both axes. Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/scatter-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": 320
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
