# レンダラー比較

4 つのチャートバックエンドの違い、お使いのブラウザーで動くバックエンド、そしてこのデバイスでの比較。フレームレート、フレーム時間、メインスレッドの負荷、起動時間、100 点満点のスコアをライブで計測します。

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

### チャートがバックエンドを選ぶしくみ

直交座標系のチャート（折れ線、面、棒、散布図、ローソク足、ヒートマップ、スパークライン、四象限）は、データを 4 つのバックエンドのいずれかで、テキスト（軸、ラベル、凡例、ツールチップ）を DOM で描画します。4 つとも同じ図形を同じ色で描き、違いは速度、起動コスト、利用可否、制約にあります。

renderer="auto"（既定）は WebGPU、WebGL2、WebGL、Canvas2D の順に試し、最初に起動できたものを使います。使用中のバックエンドは onRendererChange、renderer イベント、ready Promise で通知されます。

Auto はソフトウェアで動作する GPU（SwiftShader、llvmpipe、Microsoft Basic Render Driver など）をスキップします。Canvas2D より遅いため、仮想マシンやヘッドレスブラウザーでは通常 Canvas2D になります。

renderer="webgpu" | "webgl2" | "webgl" | "canvas2d" でバックエンドを強制できます（ソフトウェア GPU も含む）。起動できない場合はチェーンを下に進み、上に戻ることはありません。

GPU が失われると（ドライバーのリセット、デバイスの取り外し、コンテキストの破棄）、チャートは次のバックエンドに移り、同じデータ・ズーム・状態で再描画して、新しいバックエンドを通知します。

setDefaultChartRenderer() は renderer が未指定または "auto" のすべてのチャートのバックエンドを設定します。React、Vue、Angular、Web Components 共通で、画面上のチャートもその場で切り替わります。

### 早見表

各バックエンドが内部で使うもの、1 フレームの描き方、制約。

項目

ブラウザー API

WebGPU（Vulkan、Metal、Direct3D 12 の上で動作）

WebGL 2.0（OpenGL ES 3.0）

WebGL 1.0（OpenGL ES 2.0）と ANGLE_instanced_arrays 拡張

Canvas 2D コンテキスト（ブラウザーがラスタライズ）

シェーダー

WGSL

GLSL ES 3.00

GLSL ES 1.00

なし：JavaScript からパス、矩形、ピクセルを描画

1 フレームの描画

系列ごとに GPU バッファーからインスタンス描画 1 回

系列ごとにインスタンス描画 1 回、系列ごとに頂点配列オブジェクト 1 つ

系列ごとにインスタンス描画 1 回、描画のたびに属性を再バインド（頂点配列オブジェクトなし）

表示中のすべての図形を JavaScript で描き直す

ズームとパン

変換だけが変わり、バッファーは再構築しない

変換だけが変わり、バッファーは再構築しない

変換だけが変わり、バッファーは再構築しない

毎フレーム表示範囲を描き直す

数百万点の折れ線

表示中の線分をすべて描画

表示中の線分をすべて描画

表示中の線分をすべて描画

ピクセル列ごとの最小値 / 最大値に間引き（1 列最大 4 点）、輪郭は同じ

大規模な散布図

すべての点を描画、系列ごとにインスタンス描画 1 回

すべての点を描画、系列ごとにインスタンス描画 1 回

すべての点を描画、系列ごとにインスタンス描画 1 回

20,000 点を超えると ImageData バッファーに 1 ピクセルずつ書き込む：1 フレームあたり O(n) のまま

アンチエイリアス

シェーダー内で処理（MSAA なし）

シェーダー内で処理（MSAA なし）

シェーダー内で処理（MSAA なし）

ブラウザー標準

ページあたりのコンテキスト数

チャートごとにデバイス 1 つ。WebGL の上限には数えない

ブラウザーが保持する WebGL コンテキストは約 16 個まで。超えると画面外のチャートを一時停止し、スクロールで戻ったときに復元

WebGL2 と同じ上限を共有

上限なし

GPU の喪失

WebGL2 にフォールバック

WebGL にフォールバック

Canvas2D にフォールバック

失うものなし

起動

非同期：アダプター、デバイス、パイプライン

同期的にコンテキスト作成、起動時にシェーダーをコンパイル

同期的にコンテキスト作成、起動時にシェーダーをコンパイル

即時

向いている用途

数百万点、ライブデータ、長時間のズーム操作

WebGPU がない環境での同様の用途。最も広く使える高速経路

古い GPU やドライバー、WebGL2 のないブラウザー

小さなチャート、1 ページに多数のチャート、ソフトウェア GPU、GPU なし

### 目安

下の実測から読み取れる傾向で、保証ではありません。お使いのデバイスはこのページのベンチマークで計測してください。

数万点までなら、どのバックエンドもディスプレイのリフレッシュに追いつきます。Canvas2D は GPU コンテキストもまったく必要ありません。

折れ線と面：Canvas2D はピクセル列単位に間引くため、高速な CPU なら 200 万点のソート済みデータでも滑らかです。GPU バックエンドのコストは規模によらずほぼ一定です。

差が開くのは散布図です。Canvas2D は毎フレームすべての点を描くため、メインスレッド時間は点の数とともに増えます（サンプル機で 10 万点約 8 ms、100 万点約 12 ms、200 万点約 21 ms で、リフレッシュレートを下回ります）。一方 GPU バックエンドは 1〜3 ms 前後にとどまります。

棒グラフ：サンプル機では 20 万本まで、どのバックエンドも追いつき、メインスレッド時間が最も少ないのは GPU バックエンドでした。

WebGPU、WebGL2、WebGL の差は 1〜2 ms 程度に収まることが多く、実行ごとのばらつきと同程度です。内蔵 GPU、古い GPU、スマートフォンでは差が広がり、CPU が遅いと Canvas2D が早く遅れをとります。

最初のフレームには数十ミリ秒かかり、アップロードするデータ量とともに増えます（サンプル機で 200 万点に約 100 ms）。

### 計測例

Apple M3 Max のノートパソコンでベンチマークのデモを 1 回実行した結果です。macOS の Chrome 156、60 Hz ディスプレイ、ピクセル比 1、バックエンドごとに 3 秒。各セルはスコアと 1 フレームのメインスレッド時間で、フレームレートがディスプレイを下回った場合はそれも示します。

負荷

{{workload}} · {{count}}点

1 台のマシンで 1 回実行した数値です。数点や 1 ms 程度の差はばらつきの範囲内です。ご自身の結果は上のベンチマークで計測してください。

### スコアの計算方法

各実行の最後に 100 点満点のスコアを出します。計測値だけから計算し、このディスプレイのリフレッシュレート（実行前に計測）を基準にします。4 つの項目はそれぞれ 0 から 1 の値です。

滑らかさ（40%）：毎秒フレーム数 ÷ リフレッシュレート。

安定性（20%）：フレーム予算（1000 ms ÷ リフレッシュレート）÷ フレーム間隔の 95 パーセンタイル。平均が良くても長いフレームは減点されます。

余裕（25%）：1 − 1 フレームのメインスレッド時間 ÷ フレーム予算。つまり各フレームでアプリに残る時間の割合です。

起動（15%）：1 − チャートのマウントから最初のフレームが描画されるまでの時間 ÷ 1 秒。

評価：85 以上は優秀、65 以上は良好、40 以上は普通、40 未満は不十分。スコアは同じデバイス・同じ負荷でバックエンドを比べるためのもので、別のマシンとは比較できません。

### 計測方法と注意点

ベンチマークはチャートを 1 つずつ、バックエンドを強制してマウントし、同じデータと同じカメラ経路を使います。

データ：シード付きの TypedArray 列を計測開始前に一度だけ生成し、すべてのバックエンドで共有します。カメラはデータ全体（最も重いフレーム）から最大ズームまで寄って戻りながら横にも移動し、アニメーションフレームごとに setView を呼びます。

メインスレッド時間：アニメーションフレームの開始から、そのフレーム内で送ったメッセージが処理されるまで。このメッセージはフレームの描画後に実行されるため、チャートの JavaScript と描画呼び出し、スタイル計算、レイアウト、ペイントが含まれます。

フレームレートはディスプレイが上限です。両方ともリフレッシュレートに達したバックエンドは滑らかさで同点になり、差は余裕に現れます。

描画呼び出し後の GPU 時間は JavaScript からは見えません。素早く送信しても GPU を飽和させるバックエンドは、フレームレートの低下とフレーム間隔の伸びとして現れます。

結果は電源モード、サーマルスロットリング、ほかのタブ、ブラウザー拡張によって変わります。実行中はタブを前面に保ち、2 回実行して比べてください。

### ブラウザー対応

各バックエンドが使える環境。バージョンは機能が既定で有効になった最初の安定版です。対応状況は GPU とドライバーにも左右されます。

ブラウザー

WebGPU は安全なコンテキスト（HTTPS または localhost）でのみ動作します。ブラウザーは一部の GPU やドライバーをブロックすることがあり、その場合チャートは自動でフォールバックします。このブラウザーで実際に使えるものは、上の「お使いのデバイス」デモで確認できます。

Chrome、Edge（デスクトップ）

113 以降（Windows、macOS、ChromeOS）

Chrome 56 以降、Edge 79 以降

対応

対応

Firefox（デスクトップ）

Windows で 141 以降。ほかのプラットフォームは順次対応

51 以降

対応

対応

Safari（macOS）

26 以降

15 以降

対応

対応

iOS と iPadOS（全ブラウザー）

26 以降

15 以降

対応

対応

Android 版 Chrome

121 以降、Android 12 以降かつ対応 GPU

対応

対応

対応

Linux 版 Chrome

バージョンと GPU ドライバーによる

対応

対応

対応

### どれを使うべきか

本番環境では renderer を "auto" のままにしてください。訪問者ごとに、そのデバイスがハードウェアで動かせる最速のバックエンドが選ばれ、GPU の喪失も自動で処理されます。

WebGPU の強制はテストや比較のときだけにしてください。ハードウェアで動く場合、auto はすでに最初に選びます。

対象デバイスで WebGPU ドライバーに問題がある場合や、WebGPU の提供時期が異なるブラウザー間で描画を揃えたい場合は WebGL2 を強制します。

古いデバイスでの表示を再現したいときは WebGL を強制します。

小さなチャート、サムネイル、スパークライン、数十個のチャートを並べるページ（コンテキスト上限なし）、GPU のない環境では Canvas2D を強制します。

チャートの多いダッシュボードでは、大きなものや操作するものは auto のままにして小さなものは Canvas2D にするか、画面外に出たチャートを破棄してください。

データ形式、ストリーミング、100 万点のデモはチャートのパフォーマンスに、フレームワークに依存しない API はチャートエンジンにあります。

自動

WebGPU

WebGL2

WebGL

Canvas2D

{{value}} ms

{{value}} fps

信号 {{index}}

クラスター {{index}}

値

バックエンドを調べています…

バックエンド

自動

状態

CPU

ハードウェア GPU

ソフトウェア GPU

利用不可

GPU / デバイス

ブラウザーが描画、GPU コンテキスト不要

API バージョン

上限

テクスチャー最大 {{value}} px

バッファー最大 {{value}}

インスタンス描画なし：Canvas2D にフォールバック

Auto の選択

ここでは WebGPU がハードウェア GPU で動作します。

ここにはハードウェアの WebGPU がなく、WebGL2 が最適です。

ここにはハードウェアの WebGPU も WebGL2 もなく、WebGL が最適です。

ここにはハードウェア GPU のバックエンドがありません。ソフトウェア GPU より Canvas2D のほうが高速です。

安全なコンテキスト

はい

いいえ

WebGPU には HTTPS または localhost が必要です。

ピクセル比

CSS ピクセルあたりのデバイスピクセル：塗る画素が増えます。

CPU スレッド

ブラウザーが報告する論理コア数。

このデバイスのチャートバックエンド

GPU 名は一般的な名称になったり表示されなかったりします。ブラウザーはプライバシーのために隠したり丸めたりすることがあります。

負荷

折れ線

散布図

棒

点の数

{{value}}点

各実行の時間

バックエンドごとに {{value}} 秒

ソフトウェア GPU を含める

すべてのバックエンドを実行

停止

{{backend}} が {{count}} 点を描画中

ベンチマークを実行してください。各バックエンドに同じデータと同じズーム経路を順番に与えます。

前のバックエンドを解放しています…

完了。負荷や規模を変えて再実行し、比較してください。

{{requested}} → {{backend}}

バックエンド

スコア

FPS

フレーム p50

フレーム p95

メインスレッド / フレーム

最初のフレーム

実行

完了

停止：2 秒を超えるフレームがありました

起動しませんでした

滑らかさ（{{weight}}%）

安定性（{{weight}}%）

余裕（{{weight}}%）

起動（{{weight}}%）

{{value}} / 100

優秀

良好

普通

不十分

メインスレッド：Canvas2D の {{value}}

バックエンドごとのベンチマーク結果

各バックエンドのスコアの 4 項目の内訳

{{backend}} を計測中（{{total}} 件中 {{index}} 件目）…

次の実行を準備しています…

完了：同じデータ、同じカメラ経路で、バックエンドを 1 つずつ計測しました。

結果を Markdown の表としてコピーしました。

準備完了。

スキップ（ソフトウェア GPU）：{{backends}}。

ディスプレイ：{{value}} Hz、フレーム予算 {{budget}} ms

結果をコピー

{{workload}}、{{count}} 点、{{refresh}} Hz ディスプレイ

スケーリングテストを実行

テストを実行してください。ハードウェアで動く各バックエンドが 10K、100K、1M、2M 点をそれぞれ 1.5 秒描画します（約 1 分）。

点の数

毎秒フレーム数

1 フレームのメインスレッド時間

{{workload}}：点の数とバックエンド別のフレームレート

{{workload}}：点の数とバックエンド別の 1 フレームのメインスレッド時間

{{backend}} を {{count}} 点で計測中（{{total}} 件中 {{index}} 件目）…

完了。平らな曲線は画面サイズに、上昇する曲線はデータ量に比例します。

ソフトウェア GPU はスキップします。フレームレート以外の軸は対数軸です。

レンダラー

選択したバックエンドで描画した {{count}} 点の折れ線

バックエンドの変更

{{backend}} が {{ms}} で準備完了

{{requested}} を要求：{{backend}} が {{ms}} で準備完了

{{backend}} で描画中。

レンダラーを起動しています…

切り替えてもデータ、ズーム、ホバー状態は保たれます。

GPU を失わせる

WebGPU からやり直す

{{backend}}（喪失）

{{backend}} を喪失

{{backend}} で {{ms}} 後に復旧

{{backend}} で起動

GPU を失うとフォールバックする {{count}} 点の折れ線

喪失と復旧

このブラウザーではページから {{backend}} の喪失をシミュレートできません。

チェーンの終端：Canvas2D は GPU を必要としません。

{{backend}} で描画中。

実際の喪失は、ドライバーの更新、GPU のリセット、ブラウザーによるコンテキストの破棄で起こります。

```tsx
// default: the first backend that starts, best first
<LineChart series={series} />                     // renderer="auto"

// a forced backend; if it cannot start, the next one in the chain
<LineChart series={series} renderer="webgl2" />

// which backend is drawing (again after a fallback)
<LineChart
  series={series}
  onRendererChange={(kind: ChartRendererKind) => setBackend(kind)}
/>

// every chart whose renderer is unset or "auto", in every framework
setDefaultChartRenderer("canvas2d");
```

```ts
const budget = 1000 / refreshRate; // ms per frame: 16.7 at 60 Hz

const smooth = clamp(fps / refreshRate); // keeps up with the display
const stability = clamp(budget / p95FrameTime); // no long frames
const headroom = clamp(1 - mainThreadPerFrame / budget); // CPU left for the app
const startup = clamp(1 - timeToFirstFrame / 1000); // chart on screen quickly

const score = Math.round(
  100 * (0.4 * smooth + 0.2 * stability + 0.25 * headroom + 0.15 * startup),
); // clamp: between 0 and 1
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
