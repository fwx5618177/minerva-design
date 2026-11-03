# レンダラー比較

4 つのチャートバックエンドの違い、お使いのブラウザーで動くバックエンド、そしてこのデバイスでの比較。フレームレート、フレーム時間、メインスレッドの負荷、起動時間、100 点満点のスコアをライブで計測します。

Package: minerva-design@1.20.1

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

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

## Example: ベンチマークとスコア

負荷（折れ線、散布図、棒）、規模、時間を選んで実行すると、各バックエンドが同じデータを同じズーム経路で順番に描画します。表にはフレームレート、フレーム時間の中央値と 95 パーセンタイル、1 フレームのメインスレッド時間、最初のフレームまでの時間を、カードと棒グラフにはスコアとその内訳を示します。結果は Markdown の表としてコピーして共有できます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chart-renderers/demos/benchmark.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Switch,
  Table,
  type TableColumn,
} from "minerva-design";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";
import { probeBackends, type BackendsSupport } from "../../../renderer/support";
import { fpsClass, scoreClass, useBenchFormat } from "../bench/format";
import { useBenchQueue } from "../bench/queue";
import { BACKENDS, WEIGHTS, gradeOf, type BenchResult } from "../bench/score";
import { BenchStage } from "../bench/stage";
import { COUNTS, WORKLOADS, type Workload } from "../bench/workloads";
import styles from "../bench/bench.module.scss";

const DURATIONS = [2000, 3000, 5000];
const PARTS = ["smooth", "stability", "headroom", "startup"] as const;

export default function BenchmarkDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const text = useBenchFormat();
  const [workload, setWorkload] = useState<Workload>("line");
  const [count, setCount] = useState(1_000_000);
  const [duration, setDuration] = useState(3000);
  const [software, setSoftware] = useState(false);
  const [skipped, setSkipped] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const bench = useBenchQueue((kind, index) => t(`series.${kind}`, { index }));
  const { active, results, refresh, running, planned } = bench;

  const run = async () => {
    const support: BackendsSupport = await probeBackends();
    const skip = software
      ? []
      : BACKENDS.filter((kind) => support[kind] === "software");
    setSkipped(skip.map(text.renderer));
    setCopied(false);
    void bench.start(
      BACKENDS.filter((kind) => !skip.includes(kind)).map((backend) => ({
        backend,
        workload,
        count,
        duration,
      })),
    );
  };

  const name = (result: BenchResult) =>
    result.drawn && result.drawn !== result.job.backend
      ? t("fellBack", {
          requested: text.renderer(result.job.backend),
          backend: text.renderer(result.drawn),
        })
      : text.renderer(result.job.backend);

  const best = results.reduce<BenchResult | null>(
    (top, result) =>
      !top || result.score.total > top.score.total ? result : top,
    null,
  );
  const canvas = results.find(
    (result) => result.job.backend === "canvas2d" && result.status === "ok",
  );

  const columns: TableColumn<BenchResult>[] = [
    { key: "backend", header: t("col.backend"), render: (r) => name(r) },
    {
      key: "score",
      header: t("col.score"),
      align: "right",
      render: (r) => (
        <span className={`${styles.mono} ${scoreClass(r.score.total)}`}>
          {r.score.total}
        </span>
      ),
    },
    {
      key: "fps",
      header: t("col.fps"),
      align: "right",
      render: (r) => (
        <span className={`${styles.mono} ${fpsClass(r.fps)}`}>
          {text.count(r.fps)}
        </span>
      ),
    },
    {
      key: "p50",
      header: t("col.p50"),
      align: "right",
      render: (r) => <span className={styles.mono}>{text.ms(r.p50)}</span>,
    },
    {
      key: "p95",
      header: t("col.p95"),
      align: "right",
      render: (r) => <span className={styles.mono}>{text.ms(r.p95)}</span>,
    },
    {
      key: "work",
      header: t("col.work"),
      align: "right",
      render: (r) => <span className={styles.mono}>{text.ms(r.work)}</span>,
    },
    {
      key: "startup",
      header: t("col.startup"),
      align: "right",
      render: (r) => <span className={styles.mono}>{text.ms(r.startup)}</span>,
    },
    {
      key: "status",
      header: t("col.status"),
      render: (r) => t(`status.${r.status}`),
    },
  ];

  // the score of each backend, split into its weighted parts
  const breakdown: ChartSeries[] = PARTS.map((part) => ({
    name: t(`parts.${part}`, { weight: WEIGHTS[part] * 100 }),
    data: results.map(
      (r) =>
        [
          name(r),
          Math.round(r.score[part] * WEIGHTS[part] * 1000) / 10,
        ] as const,
    ),
  }));

  const copy = () => {
    const header = `| ${columns.map((c) => c.header).join(" | ")} |`;
    const rule = `|${columns.map(() => " --- |").join("")}`;
    const lines = results.map(
      (r) =>
        `| ${name(r)} | ${r.score.total} | ${text.count(r.fps)} | ${text.ms(r.p50)} | ${text.ms(r.p95)} | ${text.ms(r.work)} | ${text.ms(r.startup)} | ${t(`status.${r.status}`)} |`,
    );
    const title = t("copyTitle", {
      workload: t(`workloads.${workload}`),
      count: text.compact(count),
      refresh,
    });
    void navigator.clipboard
      ?.writeText([title, "", header, rule, ...lines].join("\n"))
      .then(() => setCopied(true));
  };

  return (
    <div className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("workload")}
          direction="horizontal"
          size="small"
          value={workload}
          disabled={running}
          onChange={(value) => {
            const next = value as Workload;
            setWorkload(next);
            setCount(COUNTS[next][2] ?? COUNTS[next][0]!);
          }}
        >
          {WORKLOADS.map((kind) => (
            <Radio key={kind} value={kind} label={t(`workloads.${kind}`)} />
          ))}
        </RadioGroup>
        <Select
          size="small"
          style={{ width: 150 }}
          aria-label={t("points")}
          value={String(count)}
          disabled={running}
          onChange={(value) => setCount(Number(value))}
        >
          {COUNTS[workload].map((value) => (
            <SelectItem key={value} value={String(value)}>
              {t("pointsValue", { value: text.compact(value) })}
            </SelectItem>
          ))}
        </Select>
        <Select
          size="small"
          style={{ width: 120 }}
          aria-label={t("duration")}
          value={String(duration)}
          disabled={running}
          onChange={(value) => setDuration(Number(value))}
        >
          {DURATIONS.map((value) => (
            <SelectItem key={value} value={String(value)}>
              {t("seconds", { value: value / 1000 })}
            </SelectItem>
          ))}
        </Select>
        <Switch
          size="small"
          checked={software}
          disabled={running}
          onChange={setSoftware}
          label={t("includeSoftware")}
        />
        <span className={styles.spacer} />
        {running ? (
          <Button size="small" variant="outline" onClick={bench.stop}>
            {t("stop")}
          </Button>
        ) : (
          <Button size="small" onClick={() => void run()}>
            {t("runAll")}
          </Button>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.live}>
          {active ? (
            <BenchStage
              key={active.run}
              job={active.job}
              series={active.series}
              startedAt={active.startedAt}
              refresh={refresh}
              height={260}
              ariaLabel={t("liveAria", {
                backend: text.renderer(active.job.backend),
                count: text.compact(active.job.count),
              })}
              onDone={bench.onDone}
            />
          ) : (
            <div className={styles.placeholder}>
              {running
                ? t("between")
                : results.length
                  ? t("doneHint")
                  : t("idle")}
            </div>
          )}
        </div>

        {results.length > 0 && (
          <>
            <dl className={styles.cards}>
              {results.map((r) => (
                <div
                  key={r.job.backend}
                  className={`${styles.card} ${!running && r === best ? styles.cardBest : ""}`}
                >
                  <dt>{name(r)}</dt>
                  <dd className={scoreClass(r.score.total)}>
                    {t("scoreValue", { value: r.score.total })}
                  </dd>
                  <small>
                    {t(`grades.${gradeOf(r.score.total)}`)}
                    {canvas && r !== canvas && r.work > 0
                      ? ` · ${t("vsCanvas", { value: text.percent(r.work / canvas.work) })}`
                      : ""}
                  </small>
                </div>
              ))}
            </dl>
            <Table
              aria-label={t("tableAria")}
              size="small"
              columns={columns}
              data={results}
              rowKey={(r) => r.job.backend}
            />
            {!running && (
              <HorizontalBarChart
                series={breakdown}
                stacked
                renderer="canvas2d"
                yAxis={{ min: 0, max: 100 }}
                height={60 + results.length * 44}
                ariaLabel={t("breakdownAria")}
              />
            )}
          </>
        )}
      </div>

      <div className={styles.footer}>
        <p role="status">
          {active
            ? t("measuring", {
                backend: text.renderer(active.job.backend),
                index: results.length + 1,
                total: planned,
              })
            : running
              ? t("preparing")
              : results.length
                ? copied
                  ? t("copied")
                  : t("done")
                : t("ready")}
          {skipped.length > 0 &&
            ` ${t("skippedNote", { backends: skipped.join(", ") })}`}
        </p>
        <p className={styles.hint}>
          {t("refreshNote", {
            value: refresh,
            budget: text.decimal(1000 / refresh),
          })}
        </p>
        {!running && results.length > 0 && (
          <Button size="xsmall" variant="outline" onClick={copy}>
            {t("copy")}
          </Button>
        )}
      </div>
    </div>
  );
}

```

### apps/docs/src/docs/renderer/support.ts

```tsx
// What each forced backend would run on, probed before a benchmark: a GPU
// backend forced onto a software rasterizer (SwiftShader, llvmpipe… in VMs,
// CI and headless browsers) takes seconds per frame with a million points
// and would freeze the page.
import type { ChartRendererKind } from "minerva-design/charts/core";

/**
 * - `hardware`: the backend starts on a real GPU (Canvas2D always does)
 * - `software`: it would start on a software rasterizer
 * - `missing`: it cannot start; a forced chart falls back to the next
 *   hardware-accelerated backend, or to Canvas2D
 */
export type BackendSupport = "hardware" | "software" | "missing";

export type BackendsSupport = Record<ChartRendererKind, BackendSupport>;

/** Same test as the chart engine (renderers/gl.ts) */
const SOFTWARE_RENDERER =
  /swiftshader|llvmpipe|softpipe|software|basic render driver|microsoft basic/i;

const probeGl = (kind: "webgl2" | "webgl"): BackendSupport => {
  if (typeof document === "undefined") return "missing";
  let gl: WebGLRenderingContextBase | null;
  try {
    const canvas = document.createElement("canvas");
    gl =
      kind === "webgl2"
        ? canvas.getContext("webgl2")
        : canvas.getContext("webgl");
  } catch {
    gl = null;
  }
  if (!gl) return "missing";
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const name: unknown = info
    ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL)
    : gl.getParameter(gl.RENDERER);
  // releases the context right away (browsers cap the live contexts)
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return SOFTWARE_RENDERER.test(String(name ?? "")) ? "software" : "hardware";
};

interface ProbedAdapter {
  isFallbackAdapter?: boolean;
  info?: {
    isFallbackAdapter?: boolean;
    vendor?: string;
    architecture?: string;
    description?: string;
  };
}

interface GpuNavigator {
  gpu?: { requestAdapter: () => Promise<ProbedAdapter | null> };
}

const probeWebGpu = async (): Promise<BackendSupport> => {
  const gpu =
    typeof navigator === "undefined"
      ? undefined
      : (navigator as GpuNavigator).gpu;
  if (!gpu) return "missing";
  let adapter: ProbedAdapter | null;
  try {
    adapter = await gpu.requestAdapter();
  } catch {
    adapter = null;
  }
  if (!adapter) return "missing";
  const info = adapter.info;
  const name = [info?.vendor, info?.architecture, info?.description].join(" ");
  return adapter.isFallbackAdapter ||
    info?.isFallbackAdapter ||
    SOFTWARE_RENDERER.test(name)
    ? "software"
    : "hardware";
};

let probed: Promise<BackendsSupport> | null = null;

/**
 * The backend `renderer: "auto"` starts on: the first hardware-accelerated
 * one (auto skips software GPUs), else Canvas2D
 */
export const autoPick = (support: BackendsSupport): ChartRendererKind =>
  (["webgpu", "webgl2", "webgl"] as const).find(
    (kind) => support[kind] === "hardware",
  ) ?? "canvas2d";

/** Probes the backends once per page load */
export const probeBackends = (): Promise<BackendsSupport> => {
  if (!probed) {
    probed = probeWebGpu().then((webgpu) => ({
      webgpu,
      webgl2: probeGl("webgl2"),
      webgl: probeGl("webgl"),
      canvas2d: "hardware" as const,
    }));
  }
  return probed;
};

/** Forgets the probe (tests) */
export const resetBackendsProbe = () => {
  probed = null;
};

```

### apps/docs/src/docs/pages/chart-renderers/bench/format.ts

```tsx
import { useTranslation } from "react-i18next";
import type {
  ChartRendererKind,
  ChartRendererPreference,
} from "minerva-design/charts";
import { gradeOf } from "./score";
import styles from "./bench.module.scss";

/** Color class of a score out of 100 */
export const scoreClass = (score: number) =>
  ({
    excellent: styles.excellent,
    good: styles.good,
    fair: styles.fair,
    poor: styles.poor,
  })[gradeOf(score)];

/** Color class of a frame rate */
export const fpsClass = (fps: number) =>
  fps >= 50 ? styles.good : fps >= 25 ? styles.fair : styles.poor;

/** Localized numbers, durations and backend names of the benchmarks */
export const useBenchFormat = () => {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const number = new Intl.NumberFormat(i18n.language);
  const compact = new Intl.NumberFormat(i18n.language, {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  const decimal = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const bytes = new Intl.NumberFormat(i18n.language, {
    style: "unit",
    unit: "gigabyte",
    maximumFractionDigits: 1,
  });
  const percent = new Intl.NumberFormat(i18n.language, {
    style: "percent",
    maximumFractionDigits: 0,
  });
  return {
    count: (value: number) => number.format(Math.round(value)),
    compact: (value: number) => compact.format(value),
    decimal: (value: number) => decimal.format(value),
    ms: (value: number) =>
      t("ms", {
        value:
          value < 100
            ? decimal.format(value)
            : number.format(Math.round(value)),
      }),
    fps: (value: number) =>
      t("fps", { value: number.format(Math.round(value)) }),
    gigabytes: (value: number) => bytes.format(value / 1024 ** 3),
    percent: (value: number) => percent.format(value),
    renderer: (kind: ChartRendererPreference | ChartRendererKind) =>
      t(`renderers.${kind}`),
  };
};

```

### apps/docs/src/docs/pages/chart-renderers/bench/score.ts

```tsx
// Scores of the renderer benchmarks: what a run measures and how it turns
// into a score out of 100, relative to the display refresh rate.
import type { ChartRendererKind } from "minerva-design/charts";
import type { Workload } from "./workloads";

export const BACKENDS: readonly ChartRendererKind[] = [
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

export interface BenchJob {
  backend: ChartRendererKind;
  workload: Workload;
  count: number;
  /** Measured part of the run, in ms */
  duration: number;
}

export interface Measures {
  /** From mounting the chart to its first painted frame, in ms */
  startup: number;
  /** Frames per second over the run */
  fps: number;
  /** Median interval between two frames, in ms */
  p50: number;
  /** 95th percentile of the frame intervals, in ms */
  p95: number;
  /** Average main-thread time of a frame, in ms */
  work: number;
  frames: number;
}

/** Each part between 0 and 1, `total` out of 100 */
export interface Score {
  smooth: number;
  stability: number;
  headroom: number;
  startup: number;
  total: number;
}

export interface BenchResult extends Measures {
  job: BenchJob;
  /** Backend that drew the chart (another one after a fallback) */
  drawn: ChartRendererKind | null;
  /** `slow`: a frame took over 2 s, `timeout`: the backend never started */
  status: "ok" | "slow" | "timeout";
  /** Display refresh rate the score is relative to, in Hz */
  refresh: number;
  score: Score;
}

/** Weights of the score (they add up to 1) */
export const WEIGHTS = {
  smooth: 0.4,
  stability: 0.2,
  headroom: 0.25,
  startup: 0.15,
} as const;

/** A startup at or above this scores 0, in ms */
export const STARTUP_LIMIT = 1000;

const clamp = (value: number) =>
  Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;

/**
 * - smooth: frame rate / refresh rate
 * - stability: frame budget / 95th percentile frame interval
 * - headroom: 1 - main-thread time per frame / frame budget
 * - startup: 1 - time to first frame / 1 s
 */
export const scoreOf = (measures: Measures, refresh: number): Score => {
  const budget = 1000 / refresh;
  const parts = {
    smooth: clamp(measures.fps / refresh),
    stability: clamp(budget / measures.p95),
    headroom: clamp(1 - measures.work / budget),
    startup: clamp(1 - measures.startup / STARTUP_LIMIT),
  };
  const total =
    parts.smooth * WEIGHTS.smooth +
    parts.stability * WEIGHTS.stability +
    parts.headroom * WEIGHTS.headroom +
    parts.startup * WEIGHTS.startup;
  return { ...parts, total: Math.round(total * 100) };
};

export type Grade = "excellent" | "good" | "fair" | "poor";

export const gradeOf = (score: number): Grade =>
  score >= 85
    ? "excellent"
    : score >= 65
      ? "good"
      : score >= 40
        ? "fair"
        : "poor";

/** Display refresh rate: median of 24 idle animation-frame intervals, in Hz */
export const measureRefresh = (): Promise<number> =>
  new Promise((resolve) => {
    const times: number[] = [];
    const step = (time: number) => {
      times.push(time);
      if (times.length < 25) {
        requestAnimationFrame(step);
        return;
      }
      const deltas = times
        .slice(1)
        .map((t, i) => t - times[i]!)
        .sort((a, b) => a - b);
      const median = deltas[deltas.length >> 1] ?? 1000 / 60;
      resolve(Math.min(240, Math.max(30, Math.round(1000 / median))));
    };
    requestAnimationFrame(step);
  });

export const percentile = (sorted: readonly number[], p: number) =>
  sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))] ?? 0;

```

### apps/docs/src/docs/pages/chart-renderers/bench/workloads.ts

```tsx
// Workloads of the renderer benchmarks: seeded typed-array columns (every
// visit draws the same picture) and the camera path that zooms in and out
// of them while the frames are measured.
import type { ChartSeries, ChartView } from "minerva-design/charts";

export type Workload = "line" | "scatter" | "bars";

export const WORKLOADS: readonly Workload[] = ["line", "scatter", "bars"];

/** Point counts offered per workload (bars stay lower: one shape each) */
export const COUNTS: Record<Workload, readonly number[]> = {
  line: [10_000, 100_000, 1_000_000, 2_000_000],
  scatter: [10_000, 100_000, 1_000_000, 2_000_000],
  bars: [1_000, 10_000, 100_000, 200_000],
};

/** Seeded PRNG (mulberry32): uniform numbers in [0, 1) */
export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LINES = 4;
const CLUSTERS = 8;
const START = Date.UTC(2026, 0, 1);

/** Four signals sharing one x column (one sample per second) */
const lineSeries = (count: number, name: (index: number) => string) => {
  const length = Math.max(2, Math.round(count / LINES));
  const random = mulberry32(11);
  const x = new Float64Array(length);
  for (let i = 0; i < length; i++) x[i] = START + i * 1000;
  return Array.from({ length: LINES }, (_, s): ChartSeries => {
    const y = new Float64Array(length);
    let walk = 0;
    for (let i = 0; i < length; i++) {
      walk += (random() - 0.5) * 0.6;
      walk *= 0.999;
      y[i] = 20 + s * 12 + walk + 4 * Math.sin((i / length) * 18 + s);
    }
    return {
      id: `signal-${s}`,
      name: name(s + 1),
      data: { x, y },
      lineWidth: 1,
    };
  });
};

/** Eight Gaussian clusters */
const scatterSeries = (count: number, name: (index: number) => string) => {
  const random = mulberry32(23);
  const normal = () =>
    Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
  const per = Math.max(1, Math.round(count / CLUSTERS));
  const pointSize = count > 200_000 ? 2 : count > 20_000 ? 3 : 5;
  return Array.from({ length: CLUSTERS }, (_, c): ChartSeries => {
    const angle = (c / CLUSTERS) * 2 * Math.PI;
    const cx = 50 + 28 * Math.cos(angle);
    const cy = 50 + 28 * Math.sin(angle);
    const spread = 4 + (c % 3) * 2;
    const x = new Float64Array(per);
    const y = new Float64Array(per);
    for (let i = 0; i < per; i++) {
      x[i] = cx + normal() * spread;
      y[i] = cy + normal() * spread;
    }
    return {
      id: `cluster-${c}`,
      name: name(c + 1),
      type: "scatter",
      data: { x, y },
      pointSize,
      opacity: 0.6,
    };
  });
};

/** One bar per index */
const barSeries = (count: number, name: (index: number) => string) => {
  const random = mulberry32(37);
  const x = new Float64Array(count);
  const y = new Float64Array(count);
  for (let i = 0; i < count; i++) {
    x[i] = i;
    y[i] = 40 + 30 * Math.sin((i / count) * 12) + random() * 25;
  }
  return [
    { id: "bars", name: name(1), type: "bar", data: { x, y } },
  ] as ChartSeries[];
};

/** The series of a workload; `name` labels series `index` (from 1) */
export const makeSeries = (
  workload: Workload,
  count: number,
  name: (index: number) => string,
): ChartSeries[] =>
  workload === "line"
    ? lineSeries(count, name)
    : workload === "scatter"
      ? scatterSeries(count, name)
      : barSeries(count, name);

/** Deepest zoom of the camera path, per workload */
const ZOOM: Record<Workload, number> = { line: 200, scatter: 20, bars: 100 };

/**
 * The view at `seconds` into a run of `period` seconds: from the whole data
 * set (the hardest frame) down to the deepest zoom and back, drifting
 * sideways so that new data enters the window on every frame.
 */
export const cameraAt = (
  workload: Workload,
  seconds: number,
  period: number,
  base: ChartView,
): ChartView => {
  const phase = (seconds / period) * 2 * Math.PI;
  const zoom = 1 + ((ZOOM[workload] - 1) * (1 - Math.cos(phase))) / 2;
  const axis = (
    [from, to]: [number, number],
    drift: number,
  ): [number, number] => {
    const width = (to - from) / zoom;
    const room = (to - from - width) / 2;
    const center = (from + to) / 2 + room * 0.8 * drift;
    return [center - width / 2, center + width / 2];
  };
  return {
    x: axis(base.x, Math.sin(phase * 1.5)),
    y: workload === "scatter" ? axis(base.y, Math.cos(phase * 1.5)) : base.y,
  };
};

```

### apps/docs/src/docs/pages/chart-renderers/bench/bench.module.scss

```scss
.stage {
  width: 100%;
  min-width: 0;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--surface-color);
  overflow: hidden;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-color);
}

.spacer {
  flex: 1;
}

.body {
  display: grid;
  gap: 12px;
  padding: 12px 14px;
}

.live {
  position: relative;
  min-height: 260px;
}

.placeholder {
  display: grid;
  place-items: center;
  height: 260px;
  padding: 0 24px;
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-md);
  font-size: 13px;
  text-align: center;
  color: var(--text-muted-color);
}

.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 16px;
  padding: 8px 14px 12px;
  border-top: 1px solid var(--border-color);
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary-color);

  p {
    margin: 0;
  }
}

.hint {
  color: var(--text-muted-color);
}

.mono {
  font-family: var(--font-family-mono);
  font-variant-numeric: tabular-nums;
}

.excellent {
  color: var(--success-color);
  font-weight: 600;
}

.good {
  color: var(--success-color);
}

.fair {
  color: var(--warning-color);
}

.poor {
  color: var(--danger-color);
}

.fallback {
  color: var(--warning-color);
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px;
  margin: 0;
}

.card {
  display: grid;
  gap: 2px;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--surface-subtle-color);

  dt {
    font-size: 12px;
    color: var(--text-muted-color);
  }

  dd {
    margin: 0;
    font-family: var(--font-family-mono);
    font-size: 22px;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
  }

  small {
    font-size: 12px;
    color: var(--text-secondary-color);
  }
}

.cardBest {
  border-color: var(--primary-color);
}

.log {
  display: grid;
  gap: 4px;
  max-height: 168px;
  margin: 0;
  padding: 8px 12px;
  overflow: auto;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--surface-subtle-color);
  font-family: var(--font-family-mono);
  font-size: 12px;
  list-style: none;
  color: var(--text-secondary-color);
}

.wrap {
  overflow-wrap: anywhere;
}

```

### apps/docs/src/docs/pages/chart-renderers/bench/queue.ts

```tsx
// Runs benchmark jobs one after the other, one mounted chart at a time.
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChartSeries } from "minerva-design/charts";
import { measureRefresh, type BenchJob, type BenchResult } from "./score";
import { makeSeries, type Workload } from "./workloads";

interface Active {
  job: BenchJob;
  series: ChartSeries[];
  startedAt: number;
  run: number;
}

/**
 * Runs jobs one after the other. The data of a workload is generated once
 * (before the clock starts) and shared by the backends.
 */
export function useBenchQueue(
  name: (workload: Workload, index: number) => string,
) {
  const [active, setActive] = useState<Active | null>(null);
  const [results, setResults] = useState<BenchResult[]>([]);
  const [refresh, setRefresh] = useState(60);
  const [running, setRunning] = useState(false);
  const [planned, setPlanned] = useState(0);
  const queue = useRef<BenchJob[]>([]);
  const cache = useRef(new Map<string, ChartSeries[]>());
  const runs = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const nameRef = useRef(name);
  useEffect(() => {
    nameRef.current = name;
  });
  useEffect(
    () => () => {
      clearTimeout(timer.current);
      queue.current = [];
    },
    [],
  );

  const next = useCallback(() => {
    const job = queue.current.shift();
    if (!job) {
      setActive(null);
      setRunning(false);
      return;
    }
    const key = `${job.workload}:${job.count}`;
    let series = cache.current.get(key);
    if (!series) {
      series = makeSeries(job.workload, job.count, (index) =>
        nameRef.current(job.workload, index),
      );
      cache.current.set(key, series);
    }
    setActive({
      job,
      series,
      startedAt: performance.now(),
      run: ++runs.current,
    });
  }, []);

  const start = useCallback(
    async (jobs: BenchJob[]) => {
      clearTimeout(timer.current);
      setResults([]);
      setRunning(true);
      setPlanned(jobs.length);
      queue.current = [...jobs];
      setRefresh(await measureRefresh());
      next();
    },
    [next],
  );

  const stop = useCallback(() => {
    clearTimeout(timer.current);
    queue.current = [];
    setActive(null);
    setRunning(false);
  }, []);

  /** Unmounts the chart, lets the GPU release it, then starts the next job */
  const onDone = useCallback(
    (result: BenchResult) => {
      setResults((previous) => [...previous, result]);
      setActive(null);
      timer.current = setTimeout(next, 300);
    },
    [next],
  );

  return {
    active,
    results,
    refresh,
    running,
    planned,
    start,
    stop,
    onDone,
  };
}

```

### apps/docs/src/docs/pages/chart-renderers/bench/stage.tsx

```tsx
// Measures one backend at a time: mounts a chart forced onto the backend,
// waits for its first frame, warms up, then moves the camera on every
// animation frame for a fixed time and records the frame intervals and the
// main-thread time of each frame.
import { useEffect, useRef } from "react";
import {
  Chart,
  type ChartHandle,
  type ChartRendererKind,
  type ChartSeries,
  type ChartView,
} from "minerva-design/charts";
import {
  percentile,
  scoreOf,
  type BenchJob,
  type BenchResult,
  type Measures,
} from "./score";
import { cameraAt } from "./workloads";

/** A started backend gets this long to draw its first frame, in ms */
const START_TIMEOUT = 15_000;
/** Frames skipped after the first one (uploads, shader compilation) */
const WARMUP = 5;
/** A frame interval above this ends the run (the backend is too slow), in ms */
const SLOW_FRAME = 2000;

interface StageProps {
  job: BenchJob;
  series: ChartSeries[];
  /** performance.now() when the job was mounted */
  startedAt: number;
  refresh: number;
  height: number;
  ariaLabel: string;
  onDrawn?: (backend: ChartRendererKind) => void;
  onDone: (result: BenchResult) => void;
}

/** The chart under test; reports once, then the host unmounts it */
export function BenchStage({
  job,
  series,
  startedAt,
  refresh,
  height,
  ariaLabel,
  onDrawn,
  onDone,
}: StageProps) {
  const handle = useRef<ChartHandle>(null);
  const drawn = useRef<ChartRendererKind | null>(null);
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  });

  useEffect(() => {
    let id = 0;
    let finished = false;
    let firstFrame = 0;
    let warmup = 0;
    let base: ChartView | null = null;
    let start = 0;
    let last = 0;
    const intervals: number[] = [];
    let work = 0;
    let works = 0;
    const channel = new MessageChannel();
    // messages run once the frame they were posted in is rendered
    channel.port1.onmessage = (event: MessageEvent<[number, boolean]>) => {
      const [posted, first] = event.data;
      const now = performance.now();
      if (first) firstFrame = now - startedAt;
      else {
        work += now - posted;
        works++;
      }
    };

    const finish = (status: BenchResult["status"]) => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(id);
      const elapsed = last - start;
      const sorted = [...intervals].sort((a, b) => a - b);
      const measures: Measures = {
        startup: firstFrame,
        fps: elapsed > 0 ? (intervals.length * 1000) / elapsed : 0,
        p50: percentile(sorted, 0.5),
        p95: percentile(sorted, 0.95),
        work: works ? work / works : 0,
        frames: intervals.length,
      };
      // the last work message arrives after this frame
      setTimeout(() => {
        done.current({
          ...measures,
          job,
          drawn: drawn.current,
          status,
          refresh,
          score:
            status === "timeout"
              ? { smooth: 0, stability: 0, headroom: 0, startup: 0, total: 0 }
              : scoreOf(measures, refresh),
        });
      }, 0);
    };

    const loop = (time: number) => {
      id = requestAnimationFrame(loop);
      const instance = handle.current?.getInstance();
      if (!drawn.current || !instance) {
        if (performance.now() - startedAt > START_TIMEOUT) finish("timeout");
        return;
      }
      if (!firstFrame && warmup === 0) {
        channel.port2.postMessage([time, true]);
        warmup++;
        return;
      }
      if (warmup < WARMUP) {
        warmup++;
        return;
      }
      if (!base) {
        instance.resetZoom();
        base = instance.getView();
        start = time;
        last = time;
        return;
      }
      intervals.push(time - last);
      const slow = time - last > SLOW_FRAME;
      last = time;
      channel.port2.postMessage([time, false]);
      instance.setView(
        cameraAt(
          job.workload,
          (time - start) / 1000,
          job.duration / 1000,
          base,
        ),
      );
      if (slow) finish("slow");
      else if (time - start >= job.duration) finish("ok");
    };
    id = requestAnimationFrame(loop);
    return () => {
      finished = true;
      cancelAnimationFrame(id);
      channel.port1.close();
      channel.port2.close();
    };
  }, [job, startedAt, refresh]);

  return (
    <Chart
      ref={handle}
      series={series}
      renderer={job.backend}
      onRendererChange={(kind) => {
        drawn.current = kind;
        onDrawn?.(kind);
      }}
      legend={false}
      tooltip={false}
      interaction={false}
      xAxis={job.workload === "line" ? { type: "time" } : undefined}
      height={height}
      ariaLabel={ariaLabel}
    />
  );
}

```

## Example: お使いのデバイス

エンジンと同じ方法で各バックエンドを調べます。ハードウェア GPU で起動するか、ソフトウェア GPU でしか動かないか、まったく起動しないか、ブラウザーが報告する GPU と API のバージョン、いくつかの上限、そしてここで renderer="auto" が選ぶバックエンドを表示します。調査に使ったコンテキストはすぐに解放します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chart-renderers/demos/environment.tsx

```tsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoadingState, Table, Tag, type TableColumn } from "minerva-design";
import type { ChartRendererKind } from "minerva-design/charts";
import {
  autoPick,
  probeBackends,
  type BackendSupport,
  type BackendsSupport,
} from "../../../renderer/support";
import { probeDetails, type DetailsByBackend } from "../bench/detect";
import { useBenchFormat } from "../bench/format";
import { BACKENDS } from "../bench/score";
import styles from "../bench/bench.module.scss";

interface Row {
  kind: ChartRendererKind;
  support: BackendSupport;
}

const TAG_COLOR = {
  hardware: "success",
  software: "warning",
  missing: "neutral",
} as const;

export default function EnvironmentDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const text = useBenchFormat();
  const [support, setSupport] = useState<BackendsSupport | null>(null);
  const [details, setDetails] = useState<DetailsByBackend | null>(null);

  useEffect(() => {
    let cancelled = false;
    void Promise.all([probeBackends(), probeDetails()]).then(
      ([probed, found]) => {
        if (cancelled) return;
        setSupport(probed);
        setDetails(found);
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  if (!support || !details) {
    return (
      <LoadingState
        size="small"
        style={{ height: 240 }}
        label={t("env.probing")}
      />
    );
  }

  const auto = autoPick(support);
  const rows: Row[] = BACKENDS.map((kind) => ({
    kind,
    support: support[kind],
  }));
  const columns: TableColumn<Row>[] = [
    {
      key: "backend",
      header: t("env.backend"),
      render: (row) => (
        <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
          <strong>{text.renderer(row.kind)}</strong>
          {row.kind === auto && (
            <Tag size="small" color="primary" variant="solid">
              {t("env.autoTag")}
            </Tag>
          )}
        </span>
      ),
    },
    {
      key: "status",
      header: t("env.status"),
      render: (row) => (
        <Tag size="small" color={TAG_COLOR[row.support]}>
          {row.kind === "canvas2d"
            ? t("env.cpu")
            : t(`env.support.${row.support}`)}
        </Tag>
      ),
    },
    {
      key: "device",
      header: t("env.device"),
      render: (row) => (
        <span className={styles.wrap}>
          {row.kind === "canvas2d"
            ? t("env.cpuDevice")
            : (details[row.kind]?.device ?? "–")}
        </span>
      ),
    },
    {
      key: "version",
      header: t("env.version"),
      render: (row) => (
        <span className={styles.wrap}>{details[row.kind]?.version ?? "–"}</span>
      ),
    },
    {
      key: "limits",
      header: t("env.limits"),
      render: (row) => {
        const found = details[row.kind];
        if (!found) return "–";
        const parts: string[] = [];
        if (found.maxTexture)
          parts.push(
            t("env.maxTexture", { value: text.count(found.maxTexture) }),
          );
        if (found.maxBuffer)
          parts.push(
            t("env.maxBuffer", { value: text.gigabytes(found.maxBuffer) }),
          );
        if (found.instancing === false) parts.push(t("env.noInstancing"));
        return parts.length ? parts.join(" · ") : "–";
      },
    },
  ];

  const secure = typeof isSecureContext === "boolean" ? isSecureContext : false;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <dl className={styles.cards}>
        <div className={`${styles.card} ${styles.cardBest}`}>
          <dt>{t("env.autoPick")}</dt>
          <dd>{text.renderer(auto)}</dd>
          <small>{t(`env.autoWhy.${auto}`)}</small>
        </div>
        <div className={styles.card}>
          <dt>{t("env.secure")}</dt>
          <dd>{secure ? t("env.yes") : t("env.no")}</dd>
          <small>{t("env.secureNote")}</small>
        </div>
        <div className={styles.card}>
          <dt>{t("env.dpr")}</dt>
          <dd>{text.decimal(window.devicePixelRatio || 1)}</dd>
          <small>{t("env.dprNote")}</small>
        </div>
        <div className={styles.card}>
          <dt>{t("env.threads")}</dt>
          <dd>{navigator.hardwareConcurrency || "–"}</dd>
          <small>{t("env.threadsNote")}</small>
        </div>
      </dl>
      <Table
        aria-label={t("env.tableAria")}
        size="small"
        columns={columns}
        data={rows}
        rowKey={(row) => row.kind}
      />
      <p className={styles.hint} style={{ margin: 0, fontSize: 13 }}>
        {t("env.note")}
      </p>
    </div>
  );
}

```

### apps/docs/src/docs/renderer/support.ts

```tsx
// What each forced backend would run on, probed before a benchmark: a GPU
// backend forced onto a software rasterizer (SwiftShader, llvmpipe… in VMs,
// CI and headless browsers) takes seconds per frame with a million points
// and would freeze the page.
import type { ChartRendererKind } from "minerva-design/charts/core";

/**
 * - `hardware`: the backend starts on a real GPU (Canvas2D always does)
 * - `software`: it would start on a software rasterizer
 * - `missing`: it cannot start; a forced chart falls back to the next
 *   hardware-accelerated backend, or to Canvas2D
 */
export type BackendSupport = "hardware" | "software" | "missing";

export type BackendsSupport = Record<ChartRendererKind, BackendSupport>;

/** Same test as the chart engine (renderers/gl.ts) */
const SOFTWARE_RENDERER =
  /swiftshader|llvmpipe|softpipe|software|basic render driver|microsoft basic/i;

const probeGl = (kind: "webgl2" | "webgl"): BackendSupport => {
  if (typeof document === "undefined") return "missing";
  let gl: WebGLRenderingContextBase | null;
  try {
    const canvas = document.createElement("canvas");
    gl =
      kind === "webgl2"
        ? canvas.getContext("webgl2")
        : canvas.getContext("webgl");
  } catch {
    gl = null;
  }
  if (!gl) return "missing";
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const name: unknown = info
    ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL)
    : gl.getParameter(gl.RENDERER);
  // releases the context right away (browsers cap the live contexts)
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return SOFTWARE_RENDERER.test(String(name ?? "")) ? "software" : "hardware";
};

interface ProbedAdapter {
  isFallbackAdapter?: boolean;
  info?: {
    isFallbackAdapter?: boolean;
    vendor?: string;
    architecture?: string;
    description?: string;
  };
}

interface GpuNavigator {
  gpu?: { requestAdapter: () => Promise<ProbedAdapter | null> };
}

const probeWebGpu = async (): Promise<BackendSupport> => {
  const gpu =
    typeof navigator === "undefined"
      ? undefined
      : (navigator as GpuNavigator).gpu;
  if (!gpu) return "missing";
  let adapter: ProbedAdapter | null;
  try {
    adapter = await gpu.requestAdapter();
  } catch {
    adapter = null;
  }
  if (!adapter) return "missing";
  const info = adapter.info;
  const name = [info?.vendor, info?.architecture, info?.description].join(" ");
  return adapter.isFallbackAdapter ||
    info?.isFallbackAdapter ||
    SOFTWARE_RENDERER.test(name)
    ? "software"
    : "hardware";
};

let probed: Promise<BackendsSupport> | null = null;

/**
 * The backend `renderer: "auto"` starts on: the first hardware-accelerated
 * one (auto skips software GPUs), else Canvas2D
 */
export const autoPick = (support: BackendsSupport): ChartRendererKind =>
  (["webgpu", "webgl2", "webgl"] as const).find(
    (kind) => support[kind] === "hardware",
  ) ?? "canvas2d";

/** Probes the backends once per page load */
export const probeBackends = (): Promise<BackendsSupport> => {
  if (!probed) {
    probed = probeWebGpu().then((webgpu) => ({
      webgpu,
      webgl2: probeGl("webgl2"),
      webgl: probeGl("webgl"),
      canvas2d: "hardware" as const,
    }));
  }
  return probed;
};

/** Forgets the probe (tests) */
export const resetBackendsProbe = () => {
  probed = null;
};

```

### apps/docs/src/docs/pages/chart-renderers/bench/detect.ts

```tsx
// What the browser offers for each backend: the GPU behind it, the API
// version and a few limits. Every probe releases its context right away
// (browsers cap the live WebGL contexts of a page).
import type { ChartRendererKind } from "minerva-design/charts";

export interface BackendDetails {
  /** GPU (or driver) name, when the browser exposes it */
  device: string | null;
  /** API and shading language versions */
  version: string | null;
  /** Largest 2D texture, in pixels */
  maxTexture: number | null;
  /** WebGPU: largest buffer, in bytes */
  maxBuffer: number | null;
  /** WebGL 1: whether instancing (ANGLE_instanced_arrays) is there */
  instancing: boolean | null;
}

const empty: BackendDetails = {
  device: null,
  version: null,
  maxTexture: null,
  maxBuffer: null,
  instancing: null,
};

const glDetails = (kind: "webgl2" | "webgl"): BackendDetails | null => {
  let gl: WebGLRenderingContext | WebGL2RenderingContext | null;
  try {
    const canvas = document.createElement("canvas");
    gl =
      kind === "webgl2"
        ? canvas.getContext("webgl2")
        : canvas.getContext("webgl");
  } catch {
    gl = null;
  }
  if (!gl) return null;
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const device: unknown = info
    ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL)
    : gl.getParameter(gl.RENDERER);
  const details: BackendDetails = {
    ...empty,
    device: device ? String(device) : null,
    version: `${String(gl.getParameter(gl.VERSION))} · ${String(
      gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
    )}`,
    maxTexture: Number(gl.getParameter(gl.MAX_TEXTURE_SIZE)) || null,
    instancing:
      kind === "webgl" ? !!gl.getExtension("ANGLE_instanced_arrays") : true,
  };
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return details;
};

interface Adapter {
  info?: { vendor?: string; architecture?: string; description?: string };
  limits?: { maxTextureDimension2D?: number; maxBufferSize?: number };
}

const webGpuDetails = async (): Promise<BackendDetails | null> => {
  const gpu = (
    navigator as Navigator & {
      gpu?: { requestAdapter: () => Promise<Adapter | null> };
    }
  ).gpu;
  if (!gpu) return null;
  let adapter: Adapter | null;
  try {
    adapter = await gpu.requestAdapter();
  } catch {
    adapter = null;
  }
  if (!adapter) return null;
  const { vendor, architecture, description } = adapter.info ?? {};
  const name = [vendor, architecture].filter(Boolean).join(" · ");
  return {
    ...empty,
    device: description || name || null,
    version: "WebGPU · WGSL",
    maxTexture: adapter.limits?.maxTextureDimension2D ?? null,
    maxBuffer: adapter.limits?.maxBufferSize ?? null,
  };
};

export type DetailsByBackend = Record<ChartRendererKind, BackendDetails | null>;

let probed: Promise<DetailsByBackend> | null = null;

/** Details of every backend (null: it cannot start here), probed once */
export const probeDetails = (): Promise<DetailsByBackend> => {
  if (!probed) {
    probed = webGpuDetails().then((webgpu) => ({
      webgpu,
      webgl2: glDetails("webgl2"),
      webgl: glDetails("webgl"),
      canvas2d: { ...empty, version: "CanvasRenderingContext2D" },
    }));
  }
  return probed;
};

```

### apps/docs/src/docs/pages/chart-renderers/bench/format.ts

```tsx
import { useTranslation } from "react-i18next";
import type {
  ChartRendererKind,
  ChartRendererPreference,
} from "minerva-design/charts";
import { gradeOf } from "./score";
import styles from "./bench.module.scss";

/** Color class of a score out of 100 */
export const scoreClass = (score: number) =>
  ({
    excellent: styles.excellent,
    good: styles.good,
    fair: styles.fair,
    poor: styles.poor,
  })[gradeOf(score)];

/** Color class of a frame rate */
export const fpsClass = (fps: number) =>
  fps >= 50 ? styles.good : fps >= 25 ? styles.fair : styles.poor;

/** Localized numbers, durations and backend names of the benchmarks */
export const useBenchFormat = () => {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const number = new Intl.NumberFormat(i18n.language);
  const compact = new Intl.NumberFormat(i18n.language, {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  const decimal = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const bytes = new Intl.NumberFormat(i18n.language, {
    style: "unit",
    unit: "gigabyte",
    maximumFractionDigits: 1,
  });
  const percent = new Intl.NumberFormat(i18n.language, {
    style: "percent",
    maximumFractionDigits: 0,
  });
  return {
    count: (value: number) => number.format(Math.round(value)),
    compact: (value: number) => compact.format(value),
    decimal: (value: number) => decimal.format(value),
    ms: (value: number) =>
      t("ms", {
        value:
          value < 100
            ? decimal.format(value)
            : number.format(Math.round(value)),
      }),
    fps: (value: number) =>
      t("fps", { value: number.format(Math.round(value)) }),
    gigabytes: (value: number) => bytes.format(value / 1024 ** 3),
    percent: (value: number) => percent.format(value),
    renderer: (kind: ChartRendererPreference | ChartRendererKind) =>
      t(`renderers.${kind}`),
  };
};

```

### apps/docs/src/docs/pages/chart-renderers/bench/score.ts

```tsx
// Scores of the renderer benchmarks: what a run measures and how it turns
// into a score out of 100, relative to the display refresh rate.
import type { ChartRendererKind } from "minerva-design/charts";
import type { Workload } from "./workloads";

export const BACKENDS: readonly ChartRendererKind[] = [
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

export interface BenchJob {
  backend: ChartRendererKind;
  workload: Workload;
  count: number;
  /** Measured part of the run, in ms */
  duration: number;
}

export interface Measures {
  /** From mounting the chart to its first painted frame, in ms */
  startup: number;
  /** Frames per second over the run */
  fps: number;
  /** Median interval between two frames, in ms */
  p50: number;
  /** 95th percentile of the frame intervals, in ms */
  p95: number;
  /** Average main-thread time of a frame, in ms */
  work: number;
  frames: number;
}

/** Each part between 0 and 1, `total` out of 100 */
export interface Score {
  smooth: number;
  stability: number;
  headroom: number;
  startup: number;
  total: number;
}

export interface BenchResult extends Measures {
  job: BenchJob;
  /** Backend that drew the chart (another one after a fallback) */
  drawn: ChartRendererKind | null;
  /** `slow`: a frame took over 2 s, `timeout`: the backend never started */
  status: "ok" | "slow" | "timeout";
  /** Display refresh rate the score is relative to, in Hz */
  refresh: number;
  score: Score;
}

/** Weights of the score (they add up to 1) */
export const WEIGHTS = {
  smooth: 0.4,
  stability: 0.2,
  headroom: 0.25,
  startup: 0.15,
} as const;

/** A startup at or above this scores 0, in ms */
export const STARTUP_LIMIT = 1000;

const clamp = (value: number) =>
  Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;

/**
 * - smooth: frame rate / refresh rate
 * - stability: frame budget / 95th percentile frame interval
 * - headroom: 1 - main-thread time per frame / frame budget
 * - startup: 1 - time to first frame / 1 s
 */
export const scoreOf = (measures: Measures, refresh: number): Score => {
  const budget = 1000 / refresh;
  const parts = {
    smooth: clamp(measures.fps / refresh),
    stability: clamp(budget / measures.p95),
    headroom: clamp(1 - measures.work / budget),
    startup: clamp(1 - measures.startup / STARTUP_LIMIT),
  };
  const total =
    parts.smooth * WEIGHTS.smooth +
    parts.stability * WEIGHTS.stability +
    parts.headroom * WEIGHTS.headroom +
    parts.startup * WEIGHTS.startup;
  return { ...parts, total: Math.round(total * 100) };
};

export type Grade = "excellent" | "good" | "fair" | "poor";

export const gradeOf = (score: number): Grade =>
  score >= 85
    ? "excellent"
    : score >= 65
      ? "good"
      : score >= 40
        ? "fair"
        : "poor";

/** Display refresh rate: median of 24 idle animation-frame intervals, in Hz */
export const measureRefresh = (): Promise<number> =>
  new Promise((resolve) => {
    const times: number[] = [];
    const step = (time: number) => {
      times.push(time);
      if (times.length < 25) {
        requestAnimationFrame(step);
        return;
      }
      const deltas = times
        .slice(1)
        .map((t, i) => t - times[i]!)
        .sort((a, b) => a - b);
      const median = deltas[deltas.length >> 1] ?? 1000 / 60;
      resolve(Math.min(240, Math.max(30, Math.round(1000 / median))));
    };
    requestAnimationFrame(step);
  });

export const percentile = (sorted: readonly number[], p: number) =>
  sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))] ?? 0;

```

### apps/docs/src/docs/pages/chart-renderers/bench/workloads.ts

```tsx
// Workloads of the renderer benchmarks: seeded typed-array columns (every
// visit draws the same picture) and the camera path that zooms in and out
// of them while the frames are measured.
import type { ChartSeries, ChartView } from "minerva-design/charts";

export type Workload = "line" | "scatter" | "bars";

export const WORKLOADS: readonly Workload[] = ["line", "scatter", "bars"];

/** Point counts offered per workload (bars stay lower: one shape each) */
export const COUNTS: Record<Workload, readonly number[]> = {
  line: [10_000, 100_000, 1_000_000, 2_000_000],
  scatter: [10_000, 100_000, 1_000_000, 2_000_000],
  bars: [1_000, 10_000, 100_000, 200_000],
};

/** Seeded PRNG (mulberry32): uniform numbers in [0, 1) */
export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LINES = 4;
const CLUSTERS = 8;
const START = Date.UTC(2026, 0, 1);

/** Four signals sharing one x column (one sample per second) */
const lineSeries = (count: number, name: (index: number) => string) => {
  const length = Math.max(2, Math.round(count / LINES));
  const random = mulberry32(11);
  const x = new Float64Array(length);
  for (let i = 0; i < length; i++) x[i] = START + i * 1000;
  return Array.from({ length: LINES }, (_, s): ChartSeries => {
    const y = new Float64Array(length);
    let walk = 0;
    for (let i = 0; i < length; i++) {
      walk += (random() - 0.5) * 0.6;
      walk *= 0.999;
      y[i] = 20 + s * 12 + walk + 4 * Math.sin((i / length) * 18 + s);
    }
    return {
      id: `signal-${s}`,
      name: name(s + 1),
      data: { x, y },
      lineWidth: 1,
    };
  });
};

/** Eight Gaussian clusters */
const scatterSeries = (count: number, name: (index: number) => string) => {
  const random = mulberry32(23);
  const normal = () =>
    Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
  const per = Math.max(1, Math.round(count / CLUSTERS));
  const pointSize = count > 200_000 ? 2 : count > 20_000 ? 3 : 5;
  return Array.from({ length: CLUSTERS }, (_, c): ChartSeries => {
    const angle = (c / CLUSTERS) * 2 * Math.PI;
    const cx = 50 + 28 * Math.cos(angle);
    const cy = 50 + 28 * Math.sin(angle);
    const spread = 4 + (c % 3) * 2;
    const x = new Float64Array(per);
    const y = new Float64Array(per);
    for (let i = 0; i < per; i++) {
      x[i] = cx + normal() * spread;
      y[i] = cy + normal() * spread;
    }
    return {
      id: `cluster-${c}`,
      name: name(c + 1),
      type: "scatter",
      data: { x, y },
      pointSize,
      opacity: 0.6,
    };
  });
};

/** One bar per index */
const barSeries = (count: number, name: (index: number) => string) => {
  const random = mulberry32(37);
  const x = new Float64Array(count);
  const y = new Float64Array(count);
  for (let i = 0; i < count; i++) {
    x[i] = i;
    y[i] = 40 + 30 * Math.sin((i / count) * 12) + random() * 25;
  }
  return [
    { id: "bars", name: name(1), type: "bar", data: { x, y } },
  ] as ChartSeries[];
};

/** The series of a workload; `name` labels series `index` (from 1) */
export const makeSeries = (
  workload: Workload,
  count: number,
  name: (index: number) => string,
): ChartSeries[] =>
  workload === "line"
    ? lineSeries(count, name)
    : workload === "scatter"
      ? scatterSeries(count, name)
      : barSeries(count, name);

/** Deepest zoom of the camera path, per workload */
const ZOOM: Record<Workload, number> = { line: 200, scatter: 20, bars: 100 };

/**
 * The view at `seconds` into a run of `period` seconds: from the whole data
 * set (the hardest frame) down to the deepest zoom and back, drifting
 * sideways so that new data enters the window on every frame.
 */
export const cameraAt = (
  workload: Workload,
  seconds: number,
  period: number,
  base: ChartView,
): ChartView => {
  const phase = (seconds / period) * 2 * Math.PI;
  const zoom = 1 + ((ZOOM[workload] - 1) * (1 - Math.cos(phase))) / 2;
  const axis = (
    [from, to]: [number, number],
    drift: number,
  ): [number, number] => {
    const width = (to - from) / zoom;
    const room = (to - from - width) / 2;
    const center = (from + to) / 2 + room * 0.8 * drift;
    return [center - width / 2, center + width / 2];
  };
  return {
    x: axis(base.x, Math.sin(phase * 1.5)),
    y: workload === "scatter" ? axis(base.y, Math.cos(phase * 1.5)) : base.y,
  };
};

```

### apps/docs/src/docs/pages/chart-renderers/bench/bench.module.scss

```scss
.stage {
  width: 100%;
  min-width: 0;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--surface-color);
  overflow: hidden;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-color);
}

.spacer {
  flex: 1;
}

.body {
  display: grid;
  gap: 12px;
  padding: 12px 14px;
}

.live {
  position: relative;
  min-height: 260px;
}

.placeholder {
  display: grid;
  place-items: center;
  height: 260px;
  padding: 0 24px;
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-md);
  font-size: 13px;
  text-align: center;
  color: var(--text-muted-color);
}

.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 16px;
  padding: 8px 14px 12px;
  border-top: 1px solid var(--border-color);
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary-color);

  p {
    margin: 0;
  }
}

.hint {
  color: var(--text-muted-color);
}

.mono {
  font-family: var(--font-family-mono);
  font-variant-numeric: tabular-nums;
}

.excellent {
  color: var(--success-color);
  font-weight: 600;
}

.good {
  color: var(--success-color);
}

.fair {
  color: var(--warning-color);
}

.poor {
  color: var(--danger-color);
}

.fallback {
  color: var(--warning-color);
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px;
  margin: 0;
}

.card {
  display: grid;
  gap: 2px;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--surface-subtle-color);

  dt {
    font-size: 12px;
    color: var(--text-muted-color);
  }

  dd {
    margin: 0;
    font-family: var(--font-family-mono);
    font-size: 22px;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
  }

  small {
    font-size: 12px;
    color: var(--text-secondary-color);
  }
}

.cardBest {
  border-color: var(--primary-color);
}

.log {
  display: grid;
  gap: 4px;
  max-height: 168px;
  margin: 0;
  padding: 8px 12px;
  overflow: auto;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--surface-subtle-color);
  font-family: var(--font-family-mono);
  font-size: 12px;
  list-style: none;
  color: var(--text-secondary-color);
}

.wrap {
  overflow-wrap: anywhere;
}

```

## Example: GPU の喪失

使用中のバックエンドで GPU の喪失をシミュレートします（WebGL は WEBGL_lose_context、WebGPU はデバイスの破棄）。チャートは次のバックエンドに移って再描画し、最後は Canvas2D に至ります。ログには各復旧にかかった時間が表示されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chart-renderers/demos/fallback.tsx

```tsx
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Tag } from "minerva-design";
import { Chart, type ChartRendererKind } from "minerva-design/charts";
import { useBenchFormat } from "../bench/format";
import { BACKENDS } from "../bench/score";
import { makeSeries } from "../bench/workloads";
import styles from "../bench/bench.module.scss";

const POINTS = 100_000;

interface Entry {
  id: number;
  text: string;
}

interface ConfiguredContext {
  getConfiguration?: () => { device?: { destroy(): void } } | null;
}

/**
 * Loses the GPU of the chart's data canvas the way a driver reset would:
 * WEBGL_lose_context for WebGL, destroying the device for WebGPU
 */
const loseGpu = (root: HTMLElement | null, kind: ChartRendererKind) => {
  const canvas = root?.querySelector<HTMLCanvasElement>(
    "canvas.minerva-chart-data",
  );
  if (!canvas) return false;
  if (kind === "webgpu") {
    // returns the context the chart configured (getConfiguration: recent browsers)
    const context = canvas.getContext("webgpu") as ConfiguredContext | null;
    const device = context?.getConfiguration?.()?.device;
    if (!device) return false;
    device.destroy();
    return true;
  }
  if (kind === "webgl2" || kind === "webgl") {
    const gl = canvas.getContext(kind) as WebGLRenderingContext | null;
    const ext = gl?.getExtension("WEBGL_lose_context");
    if (!ext) return false;
    ext.loseContext();
    return true;
  }
  return false;
};

export default function FallbackDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const text = useBenchFormat();
  const rootRef = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(0);
  const [drawn, setDrawn] = useState<ChartRendererKind | null>(null);
  const [lost, setLost] = useState<ChartRendererKind[]>([]);
  const [log, setLog] = useState<Entry[]>([]);
  const [blocked, setBlocked] = useState(false);
  const lostAt = useRef(0);

  const series = useMemo(
    () => makeSeries("line", POINTS, (index) => t("series.line", { index })),
    [t],
  );

  const add = (line: string) =>
    setLog((previous) =>
      [{ id: (previous[0]?.id ?? 0) + 1, text: line }, ...previous].slice(0, 8),
    );

  const lose = () => {
    if (!drawn || drawn === "canvas2d") return;
    lostAt.current = performance.now();
    if (!loseGpu(rootRef.current, drawn)) {
      setBlocked(true);
      return;
    }
    setLost((previous) => [...previous, drawn]);
    add(t("lostEntry", { backend: text.renderer(drawn) }));
  };

  const restart = () => {
    setRun((value) => value + 1);
    setDrawn(null);
    setLost([]);
    setLog([]);
    setBlocked(false);
  };

  return (
    <div className={styles.stage} ref={rootRef}>
      <div className={styles.toolbar}>
        <span style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {BACKENDS.map((kind) => (
            <Tag
              key={kind}
              size="small"
              color={
                kind === drawn
                  ? "success"
                  : lost.includes(kind)
                    ? "danger"
                    : "neutral"
              }
              variant={kind === drawn ? "solid" : "subtle"}
            >
              {lost.includes(kind)
                ? t("chainLost", { backend: text.renderer(kind) })
                : text.renderer(kind)}
            </Tag>
          ))}
        </span>
        <span className={styles.spacer} />
        <Button
          size="small"
          disabled={!drawn || drawn === "canvas2d"}
          onClick={lose}
        >
          {t("loseGpu")}
        </Button>
        <Button size="small" variant="outline" onClick={restart}>
          {t("restart")}
        </Button>
      </div>
      <div className={styles.body}>
        <Chart
          key={run}
          series={series}
          // forced: the chain starts at WebGPU and only moves down
          renderer="webgpu"
          onRendererChange={(kind) => {
            setDrawn(kind);
            add(
              lostAt.current
                ? t("fallbackEntry", {
                    backend: text.renderer(kind),
                    ms: text.ms(performance.now() - lostAt.current),
                  })
                : t("startEntry", { backend: text.renderer(kind) }),
            );
            lostAt.current = 0;
          }}
          legend={false}
          xAxis={{ type: "time" }}
          height={240}
          ariaLabel={t("fallbackAria", { count: text.compact(POINTS) })}
        />
        <ol className={styles.log} aria-label={t("fallbackLog")}>
          {log.map((entry) => (
            <li key={entry.id}>{entry.text}</li>
          ))}
        </ol>
      </div>
      <div className={styles.footer}>
        <p role="status">
          {blocked
            ? t("cannotLose", { backend: drawn ? text.renderer(drawn) : "" })
            : drawn === "canvas2d"
              ? t("chainEnd")
              : drawn
                ? t("fallbackStatus", { backend: text.renderer(drawn) })
                : t("starting")}
        </p>
        <p className={styles.hint}>{t("fallbackHint")}</p>
      </div>
    </div>
  );
}

```

### apps/docs/src/docs/pages/chart-renderers/bench/format.ts

```tsx
import { useTranslation } from "react-i18next";
import type {
  ChartRendererKind,
  ChartRendererPreference,
} from "minerva-design/charts";
import { gradeOf } from "./score";
import styles from "./bench.module.scss";

/** Color class of a score out of 100 */
export const scoreClass = (score: number) =>
  ({
    excellent: styles.excellent,
    good: styles.good,
    fair: styles.fair,
    poor: styles.poor,
  })[gradeOf(score)];

/** Color class of a frame rate */
export const fpsClass = (fps: number) =>
  fps >= 50 ? styles.good : fps >= 25 ? styles.fair : styles.poor;

/** Localized numbers, durations and backend names of the benchmarks */
export const useBenchFormat = () => {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const number = new Intl.NumberFormat(i18n.language);
  const compact = new Intl.NumberFormat(i18n.language, {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  const decimal = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const bytes = new Intl.NumberFormat(i18n.language, {
    style: "unit",
    unit: "gigabyte",
    maximumFractionDigits: 1,
  });
  const percent = new Intl.NumberFormat(i18n.language, {
    style: "percent",
    maximumFractionDigits: 0,
  });
  return {
    count: (value: number) => number.format(Math.round(value)),
    compact: (value: number) => compact.format(value),
    decimal: (value: number) => decimal.format(value),
    ms: (value: number) =>
      t("ms", {
        value:
          value < 100
            ? decimal.format(value)
            : number.format(Math.round(value)),
      }),
    fps: (value: number) =>
      t("fps", { value: number.format(Math.round(value)) }),
    gigabytes: (value: number) => bytes.format(value / 1024 ** 3),
    percent: (value: number) => percent.format(value),
    renderer: (kind: ChartRendererPreference | ChartRendererKind) =>
      t(`renderers.${kind}`),
  };
};

```

### apps/docs/src/docs/pages/chart-renderers/bench/score.ts

```tsx
// Scores of the renderer benchmarks: what a run measures and how it turns
// into a score out of 100, relative to the display refresh rate.
import type { ChartRendererKind } from "minerva-design/charts";
import type { Workload } from "./workloads";

export const BACKENDS: readonly ChartRendererKind[] = [
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

export interface BenchJob {
  backend: ChartRendererKind;
  workload: Workload;
  count: number;
  /** Measured part of the run, in ms */
  duration: number;
}

export interface Measures {
  /** From mounting the chart to its first painted frame, in ms */
  startup: number;
  /** Frames per second over the run */
  fps: number;
  /** Median interval between two frames, in ms */
  p50: number;
  /** 95th percentile of the frame intervals, in ms */
  p95: number;
  /** Average main-thread time of a frame, in ms */
  work: number;
  frames: number;
}

/** Each part between 0 and 1, `total` out of 100 */
export interface Score {
  smooth: number;
  stability: number;
  headroom: number;
  startup: number;
  total: number;
}

export interface BenchResult extends Measures {
  job: BenchJob;
  /** Backend that drew the chart (another one after a fallback) */
  drawn: ChartRendererKind | null;
  /** `slow`: a frame took over 2 s, `timeout`: the backend never started */
  status: "ok" | "slow" | "timeout";
  /** Display refresh rate the score is relative to, in Hz */
  refresh: number;
  score: Score;
}

/** Weights of the score (they add up to 1) */
export const WEIGHTS = {
  smooth: 0.4,
  stability: 0.2,
  headroom: 0.25,
  startup: 0.15,
} as const;

/** A startup at or above this scores 0, in ms */
export const STARTUP_LIMIT = 1000;

const clamp = (value: number) =>
  Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;

/**
 * - smooth: frame rate / refresh rate
 * - stability: frame budget / 95th percentile frame interval
 * - headroom: 1 - main-thread time per frame / frame budget
 * - startup: 1 - time to first frame / 1 s
 */
export const scoreOf = (measures: Measures, refresh: number): Score => {
  const budget = 1000 / refresh;
  const parts = {
    smooth: clamp(measures.fps / refresh),
    stability: clamp(budget / measures.p95),
    headroom: clamp(1 - measures.work / budget),
    startup: clamp(1 - measures.startup / STARTUP_LIMIT),
  };
  const total =
    parts.smooth * WEIGHTS.smooth +
    parts.stability * WEIGHTS.stability +
    parts.headroom * WEIGHTS.headroom +
    parts.startup * WEIGHTS.startup;
  return { ...parts, total: Math.round(total * 100) };
};

export type Grade = "excellent" | "good" | "fair" | "poor";

export const gradeOf = (score: number): Grade =>
  score >= 85
    ? "excellent"
    : score >= 65
      ? "good"
      : score >= 40
        ? "fair"
        : "poor";

/** Display refresh rate: median of 24 idle animation-frame intervals, in Hz */
export const measureRefresh = (): Promise<number> =>
  new Promise((resolve) => {
    const times: number[] = [];
    const step = (time: number) => {
      times.push(time);
      if (times.length < 25) {
        requestAnimationFrame(step);
        return;
      }
      const deltas = times
        .slice(1)
        .map((t, i) => t - times[i]!)
        .sort((a, b) => a - b);
      const median = deltas[deltas.length >> 1] ?? 1000 / 60;
      resolve(Math.min(240, Math.max(30, Math.round(1000 / median))));
    };
    requestAnimationFrame(step);
  });

export const percentile = (sorted: readonly number[], p: number) =>
  sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))] ?? 0;

```

### apps/docs/src/docs/pages/chart-renderers/bench/workloads.ts

```tsx
// Workloads of the renderer benchmarks: seeded typed-array columns (every
// visit draws the same picture) and the camera path that zooms in and out
// of them while the frames are measured.
import type { ChartSeries, ChartView } from "minerva-design/charts";

export type Workload = "line" | "scatter" | "bars";

export const WORKLOADS: readonly Workload[] = ["line", "scatter", "bars"];

/** Point counts offered per workload (bars stay lower: one shape each) */
export const COUNTS: Record<Workload, readonly number[]> = {
  line: [10_000, 100_000, 1_000_000, 2_000_000],
  scatter: [10_000, 100_000, 1_000_000, 2_000_000],
  bars: [1_000, 10_000, 100_000, 200_000],
};

/** Seeded PRNG (mulberry32): uniform numbers in [0, 1) */
export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LINES = 4;
const CLUSTERS = 8;
const START = Date.UTC(2026, 0, 1);

/** Four signals sharing one x column (one sample per second) */
const lineSeries = (count: number, name: (index: number) => string) => {
  const length = Math.max(2, Math.round(count / LINES));
  const random = mulberry32(11);
  const x = new Float64Array(length);
  for (let i = 0; i < length; i++) x[i] = START + i * 1000;
  return Array.from({ length: LINES }, (_, s): ChartSeries => {
    const y = new Float64Array(length);
    let walk = 0;
    for (let i = 0; i < length; i++) {
      walk += (random() - 0.5) * 0.6;
      walk *= 0.999;
      y[i] = 20 + s * 12 + walk + 4 * Math.sin((i / length) * 18 + s);
    }
    return {
      id: `signal-${s}`,
      name: name(s + 1),
      data: { x, y },
      lineWidth: 1,
    };
  });
};

/** Eight Gaussian clusters */
const scatterSeries = (count: number, name: (index: number) => string) => {
  const random = mulberry32(23);
  const normal = () =>
    Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
  const per = Math.max(1, Math.round(count / CLUSTERS));
  const pointSize = count > 200_000 ? 2 : count > 20_000 ? 3 : 5;
  return Array.from({ length: CLUSTERS }, (_, c): ChartSeries => {
    const angle = (c / CLUSTERS) * 2 * Math.PI;
    const cx = 50 + 28 * Math.cos(angle);
    const cy = 50 + 28 * Math.sin(angle);
    const spread = 4 + (c % 3) * 2;
    const x = new Float64Array(per);
    const y = new Float64Array(per);
    for (let i = 0; i < per; i++) {
      x[i] = cx + normal() * spread;
      y[i] = cy + normal() * spread;
    }
    return {
      id: `cluster-${c}`,
      name: name(c + 1),
      type: "scatter",
      data: { x, y },
      pointSize,
      opacity: 0.6,
    };
  });
};

/** One bar per index */
const barSeries = (count: number, name: (index: number) => string) => {
  const random = mulberry32(37);
  const x = new Float64Array(count);
  const y = new Float64Array(count);
  for (let i = 0; i < count; i++) {
    x[i] = i;
    y[i] = 40 + 30 * Math.sin((i / count) * 12) + random() * 25;
  }
  return [
    { id: "bars", name: name(1), type: "bar", data: { x, y } },
  ] as ChartSeries[];
};

/** The series of a workload; `name` labels series `index` (from 1) */
export const makeSeries = (
  workload: Workload,
  count: number,
  name: (index: number) => string,
): ChartSeries[] =>
  workload === "line"
    ? lineSeries(count, name)
    : workload === "scatter"
      ? scatterSeries(count, name)
      : barSeries(count, name);

/** Deepest zoom of the camera path, per workload */
const ZOOM: Record<Workload, number> = { line: 200, scatter: 20, bars: 100 };

/**
 * The view at `seconds` into a run of `period` seconds: from the whole data
 * set (the hardest frame) down to the deepest zoom and back, drifting
 * sideways so that new data enters the window on every frame.
 */
export const cameraAt = (
  workload: Workload,
  seconds: number,
  period: number,
  base: ChartView,
): ChartView => {
  const phase = (seconds / period) * 2 * Math.PI;
  const zoom = 1 + ((ZOOM[workload] - 1) * (1 - Math.cos(phase))) / 2;
  const axis = (
    [from, to]: [number, number],
    drift: number,
  ): [number, number] => {
    const width = (to - from) / zoom;
    const room = (to - from - width) / 2;
    const center = (from + to) / 2 + room * 0.8 * drift;
    return [center - width / 2, center + width / 2];
  };
  return {
    x: axis(base.x, Math.sin(phase * 1.5)),
    y: workload === "scatter" ? axis(base.y, Math.cos(phase * 1.5)) : base.y,
  };
};

```

### apps/docs/src/docs/pages/chart-renderers/bench/bench.module.scss

```scss
.stage {
  width: 100%;
  min-width: 0;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--surface-color);
  overflow: hidden;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-color);
}

.spacer {
  flex: 1;
}

.body {
  display: grid;
  gap: 12px;
  padding: 12px 14px;
}

.live {
  position: relative;
  min-height: 260px;
}

.placeholder {
  display: grid;
  place-items: center;
  height: 260px;
  padding: 0 24px;
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-md);
  font-size: 13px;
  text-align: center;
  color: var(--text-muted-color);
}

.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 16px;
  padding: 8px 14px 12px;
  border-top: 1px solid var(--border-color);
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary-color);

  p {
    margin: 0;
  }
}

.hint {
  color: var(--text-muted-color);
}

.mono {
  font-family: var(--font-family-mono);
  font-variant-numeric: tabular-nums;
}

.excellent {
  color: var(--success-color);
  font-weight: 600;
}

.good {
  color: var(--success-color);
}

.fair {
  color: var(--warning-color);
}

.poor {
  color: var(--danger-color);
}

.fallback {
  color: var(--warning-color);
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px;
  margin: 0;
}

.card {
  display: grid;
  gap: 2px;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--surface-subtle-color);

  dt {
    font-size: 12px;
    color: var(--text-muted-color);
  }

  dd {
    margin: 0;
    font-family: var(--font-family-mono);
    font-size: 22px;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
  }

  small {
    font-size: 12px;
    color: var(--text-secondary-color);
  }
}

.cardBest {
  border-color: var(--primary-color);
}

.log {
  display: grid;
  gap: 4px;
  max-height: 168px;
  margin: 0;
  padding: 8px 12px;
  overflow: auto;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--surface-subtle-color);
  font-family: var(--font-family-mono);
  font-size: 12px;
  list-style: none;
  color: var(--text-secondary-color);
}

.wrap {
  overflow-wrap: anywhere;
}

```

## Example: 点数によるスケーリング

ハードウェアで動く各バックエンドで 10K、100K、1M、2M 点を各 1.5 秒描画し、フレームレートと 1 フレームのメインスレッド時間を規模に対して対数軸にプロットします。GPU の曲線は平らなまま、Canvas2D は上昇します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chart-renderers/demos/scaling.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Radio, RadioGroup } from "minerva-design";
import { LineChart, type ChartSeries } from "minerva-design/charts";
import { probeBackends } from "../../../renderer/support";
import { useBenchFormat } from "../bench/format";
import { useBenchQueue } from "../bench/queue";
import { BACKENDS } from "../bench/score";
import { BenchStage } from "../bench/stage";
import { COUNTS, type Workload } from "../bench/workloads";
import styles from "../bench/bench.module.scss";

/** Shorter runs: four sizes per backend */
const DURATION = 1500;

export default function ScalingDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const text = useBenchFormat();
  const [workload, setWorkload] = useState<Workload>("line");
  const [measured, setMeasured] = useState<Workload>("line");
  const bench = useBenchQueue((kind, index) => t(`series.${kind}`, { index }));
  const { active, results, running, planned } = bench;

  const run = async () => {
    const support = await probeBackends();
    const backends = BACKENDS.filter((kind) => support[kind] !== "software");
    setMeasured(workload);
    void bench.start(
      backends.flatMap((backend) =>
        COUNTS[workload].map((count) => ({
          backend,
          workload,
          count,
          duration: DURATION,
        })),
      ),
    );
  };

  /** One line per backend, one point per size */
  const curve = (value: (fps: number, work: number) => number) =>
    BACKENDS.map((kind): ChartSeries | null => {
      const runs = results.filter(
        (r) => r.job.backend === kind && r.status !== "timeout",
      );
      if (!runs.length) return null;
      return {
        id: kind,
        name: text.renderer(kind),
        data: runs.map((r) => [r.job.count, value(r.fps, r.work)] as const),
      };
    }).filter((series): series is ChartSeries => series !== null);

  const xAxis = {
    type: "log" as const,
    title: t("pointsAxis"),
    format: (value: number) => text.compact(value),
  };

  return (
    <div className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("workload")}
          direction="horizontal"
          size="small"
          value={workload}
          disabled={running}
          onChange={(value) => setWorkload(value as Workload)}
        >
          <Radio value="line" label={t("workloads.line")} />
          <Radio value="scatter" label={t("workloads.scatter")} />
        </RadioGroup>
        <span className={styles.spacer} />
        {running ? (
          <Button size="small" variant="outline" onClick={bench.stop}>
            {t("stop")}
          </Button>
        ) : (
          <Button size="small" onClick={() => void run()}>
            {t("runScaling")}
          </Button>
        )}
      </div>

      <div className={styles.body}>
        {running && (
          <div className={styles.live} style={{ minHeight: 180 }}>
            {active ? (
              <BenchStage
                key={active.run}
                job={active.job}
                series={active.series}
                startedAt={active.startedAt}
                refresh={bench.refresh}
                height={180}
                ariaLabel={t("liveAria", {
                  backend: text.renderer(active.job.backend),
                  count: text.compact(active.job.count),
                })}
                onDone={bench.onDone}
              />
            ) : (
              <div className={styles.placeholder} style={{ height: 180 }}>
                {t("between")}
              </div>
            )}
          </div>
        )}
        {!running && results.length === 0 && (
          <div className={styles.placeholder}>{t("scalingIdle")}</div>
        )}
        {results.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 12,
            }}
          >
            <LineChart
              series={curve((fps) => Math.round(fps))}
              renderer="canvas2d"
              xAxis={xAxis}
              yAxis={{ min: 0, title: t("fpsAxis") }}
              height={260}
              ariaLabel={t("scalingFpsAria", {
                workload: t(`workloads.${measured}`),
              })}
            />
            <LineChart
              series={curve((_, work) => Math.max(0.1, work))}
              renderer="canvas2d"
              xAxis={xAxis}
              yAxis={{
                type: "log",
                title: t("workAxis"),
                format: (value) => text.ms(value),
              }}
              height={260}
              ariaLabel={t("scalingWorkAria", {
                workload: t(`workloads.${measured}`),
              })}
            />
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <p role="status">
          {active
            ? t("scalingMeasuring", {
                backend: text.renderer(active.job.backend),
                count: text.compact(active.job.count),
                index: results.length + 1,
                total: planned,
              })
            : running
              ? t("preparing")
              : results.length
                ? t("scalingDone")
                : t("ready")}
        </p>
        <p className={styles.hint}>{t("scalingHint")}</p>
      </div>
    </div>
  );
}

```

### apps/docs/src/docs/renderer/support.ts

```tsx
// What each forced backend would run on, probed before a benchmark: a GPU
// backend forced onto a software rasterizer (SwiftShader, llvmpipe… in VMs,
// CI and headless browsers) takes seconds per frame with a million points
// and would freeze the page.
import type { ChartRendererKind } from "minerva-design/charts/core";

/**
 * - `hardware`: the backend starts on a real GPU (Canvas2D always does)
 * - `software`: it would start on a software rasterizer
 * - `missing`: it cannot start; a forced chart falls back to the next
 *   hardware-accelerated backend, or to Canvas2D
 */
export type BackendSupport = "hardware" | "software" | "missing";

export type BackendsSupport = Record<ChartRendererKind, BackendSupport>;

/** Same test as the chart engine (renderers/gl.ts) */
const SOFTWARE_RENDERER =
  /swiftshader|llvmpipe|softpipe|software|basic render driver|microsoft basic/i;

const probeGl = (kind: "webgl2" | "webgl"): BackendSupport => {
  if (typeof document === "undefined") return "missing";
  let gl: WebGLRenderingContextBase | null;
  try {
    const canvas = document.createElement("canvas");
    gl =
      kind === "webgl2"
        ? canvas.getContext("webgl2")
        : canvas.getContext("webgl");
  } catch {
    gl = null;
  }
  if (!gl) return "missing";
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const name: unknown = info
    ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL)
    : gl.getParameter(gl.RENDERER);
  // releases the context right away (browsers cap the live contexts)
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return SOFTWARE_RENDERER.test(String(name ?? "")) ? "software" : "hardware";
};

interface ProbedAdapter {
  isFallbackAdapter?: boolean;
  info?: {
    isFallbackAdapter?: boolean;
    vendor?: string;
    architecture?: string;
    description?: string;
  };
}

interface GpuNavigator {
  gpu?: { requestAdapter: () => Promise<ProbedAdapter | null> };
}

const probeWebGpu = async (): Promise<BackendSupport> => {
  const gpu =
    typeof navigator === "undefined"
      ? undefined
      : (navigator as GpuNavigator).gpu;
  if (!gpu) return "missing";
  let adapter: ProbedAdapter | null;
  try {
    adapter = await gpu.requestAdapter();
  } catch {
    adapter = null;
  }
  if (!adapter) return "missing";
  const info = adapter.info;
  const name = [info?.vendor, info?.architecture, info?.description].join(" ");
  return adapter.isFallbackAdapter ||
    info?.isFallbackAdapter ||
    SOFTWARE_RENDERER.test(name)
    ? "software"
    : "hardware";
};

let probed: Promise<BackendsSupport> | null = null;

/**
 * The backend `renderer: "auto"` starts on: the first hardware-accelerated
 * one (auto skips software GPUs), else Canvas2D
 */
export const autoPick = (support: BackendsSupport): ChartRendererKind =>
  (["webgpu", "webgl2", "webgl"] as const).find(
    (kind) => support[kind] === "hardware",
  ) ?? "canvas2d";

/** Probes the backends once per page load */
export const probeBackends = (): Promise<BackendsSupport> => {
  if (!probed) {
    probed = probeWebGpu().then((webgpu) => ({
      webgpu,
      webgl2: probeGl("webgl2"),
      webgl: probeGl("webgl"),
      canvas2d: "hardware" as const,
    }));
  }
  return probed;
};

/** Forgets the probe (tests) */
export const resetBackendsProbe = () => {
  probed = null;
};

```

### apps/docs/src/docs/pages/chart-renderers/bench/format.ts

```tsx
import { useTranslation } from "react-i18next";
import type {
  ChartRendererKind,
  ChartRendererPreference,
} from "minerva-design/charts";
import { gradeOf } from "./score";
import styles from "./bench.module.scss";

/** Color class of a score out of 100 */
export const scoreClass = (score: number) =>
  ({
    excellent: styles.excellent,
    good: styles.good,
    fair: styles.fair,
    poor: styles.poor,
  })[gradeOf(score)];

/** Color class of a frame rate */
export const fpsClass = (fps: number) =>
  fps >= 50 ? styles.good : fps >= 25 ? styles.fair : styles.poor;

/** Localized numbers, durations and backend names of the benchmarks */
export const useBenchFormat = () => {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const number = new Intl.NumberFormat(i18n.language);
  const compact = new Intl.NumberFormat(i18n.language, {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  const decimal = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const bytes = new Intl.NumberFormat(i18n.language, {
    style: "unit",
    unit: "gigabyte",
    maximumFractionDigits: 1,
  });
  const percent = new Intl.NumberFormat(i18n.language, {
    style: "percent",
    maximumFractionDigits: 0,
  });
  return {
    count: (value: number) => number.format(Math.round(value)),
    compact: (value: number) => compact.format(value),
    decimal: (value: number) => decimal.format(value),
    ms: (value: number) =>
      t("ms", {
        value:
          value < 100
            ? decimal.format(value)
            : number.format(Math.round(value)),
      }),
    fps: (value: number) =>
      t("fps", { value: number.format(Math.round(value)) }),
    gigabytes: (value: number) => bytes.format(value / 1024 ** 3),
    percent: (value: number) => percent.format(value),
    renderer: (kind: ChartRendererPreference | ChartRendererKind) =>
      t(`renderers.${kind}`),
  };
};

```

### apps/docs/src/docs/pages/chart-renderers/bench/score.ts

```tsx
// Scores of the renderer benchmarks: what a run measures and how it turns
// into a score out of 100, relative to the display refresh rate.
import type { ChartRendererKind } from "minerva-design/charts";
import type { Workload } from "./workloads";

export const BACKENDS: readonly ChartRendererKind[] = [
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

export interface BenchJob {
  backend: ChartRendererKind;
  workload: Workload;
  count: number;
  /** Measured part of the run, in ms */
  duration: number;
}

export interface Measures {
  /** From mounting the chart to its first painted frame, in ms */
  startup: number;
  /** Frames per second over the run */
  fps: number;
  /** Median interval between two frames, in ms */
  p50: number;
  /** 95th percentile of the frame intervals, in ms */
  p95: number;
  /** Average main-thread time of a frame, in ms */
  work: number;
  frames: number;
}

/** Each part between 0 and 1, `total` out of 100 */
export interface Score {
  smooth: number;
  stability: number;
  headroom: number;
  startup: number;
  total: number;
}

export interface BenchResult extends Measures {
  job: BenchJob;
  /** Backend that drew the chart (another one after a fallback) */
  drawn: ChartRendererKind | null;
  /** `slow`: a frame took over 2 s, `timeout`: the backend never started */
  status: "ok" | "slow" | "timeout";
  /** Display refresh rate the score is relative to, in Hz */
  refresh: number;
  score: Score;
}

/** Weights of the score (they add up to 1) */
export const WEIGHTS = {
  smooth: 0.4,
  stability: 0.2,
  headroom: 0.25,
  startup: 0.15,
} as const;

/** A startup at or above this scores 0, in ms */
export const STARTUP_LIMIT = 1000;

const clamp = (value: number) =>
  Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;

/**
 * - smooth: frame rate / refresh rate
 * - stability: frame budget / 95th percentile frame interval
 * - headroom: 1 - main-thread time per frame / frame budget
 * - startup: 1 - time to first frame / 1 s
 */
export const scoreOf = (measures: Measures, refresh: number): Score => {
  const budget = 1000 / refresh;
  const parts = {
    smooth: clamp(measures.fps / refresh),
    stability: clamp(budget / measures.p95),
    headroom: clamp(1 - measures.work / budget),
    startup: clamp(1 - measures.startup / STARTUP_LIMIT),
  };
  const total =
    parts.smooth * WEIGHTS.smooth +
    parts.stability * WEIGHTS.stability +
    parts.headroom * WEIGHTS.headroom +
    parts.startup * WEIGHTS.startup;
  return { ...parts, total: Math.round(total * 100) };
};

export type Grade = "excellent" | "good" | "fair" | "poor";

export const gradeOf = (score: number): Grade =>
  score >= 85
    ? "excellent"
    : score >= 65
      ? "good"
      : score >= 40
        ? "fair"
        : "poor";

/** Display refresh rate: median of 24 idle animation-frame intervals, in Hz */
export const measureRefresh = (): Promise<number> =>
  new Promise((resolve) => {
    const times: number[] = [];
    const step = (time: number) => {
      times.push(time);
      if (times.length < 25) {
        requestAnimationFrame(step);
        return;
      }
      const deltas = times
        .slice(1)
        .map((t, i) => t - times[i]!)
        .sort((a, b) => a - b);
      const median = deltas[deltas.length >> 1] ?? 1000 / 60;
      resolve(Math.min(240, Math.max(30, Math.round(1000 / median))));
    };
    requestAnimationFrame(step);
  });

export const percentile = (sorted: readonly number[], p: number) =>
  sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))] ?? 0;

```

### apps/docs/src/docs/pages/chart-renderers/bench/workloads.ts

```tsx
// Workloads of the renderer benchmarks: seeded typed-array columns (every
// visit draws the same picture) and the camera path that zooms in and out
// of them while the frames are measured.
import type { ChartSeries, ChartView } from "minerva-design/charts";

export type Workload = "line" | "scatter" | "bars";

export const WORKLOADS: readonly Workload[] = ["line", "scatter", "bars"];

/** Point counts offered per workload (bars stay lower: one shape each) */
export const COUNTS: Record<Workload, readonly number[]> = {
  line: [10_000, 100_000, 1_000_000, 2_000_000],
  scatter: [10_000, 100_000, 1_000_000, 2_000_000],
  bars: [1_000, 10_000, 100_000, 200_000],
};

/** Seeded PRNG (mulberry32): uniform numbers in [0, 1) */
export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LINES = 4;
const CLUSTERS = 8;
const START = Date.UTC(2026, 0, 1);

/** Four signals sharing one x column (one sample per second) */
const lineSeries = (count: number, name: (index: number) => string) => {
  const length = Math.max(2, Math.round(count / LINES));
  const random = mulberry32(11);
  const x = new Float64Array(length);
  for (let i = 0; i < length; i++) x[i] = START + i * 1000;
  return Array.from({ length: LINES }, (_, s): ChartSeries => {
    const y = new Float64Array(length);
    let walk = 0;
    for (let i = 0; i < length; i++) {
      walk += (random() - 0.5) * 0.6;
      walk *= 0.999;
      y[i] = 20 + s * 12 + walk + 4 * Math.sin((i / length) * 18 + s);
    }
    return {
      id: `signal-${s}`,
      name: name(s + 1),
      data: { x, y },
      lineWidth: 1,
    };
  });
};

/** Eight Gaussian clusters */
const scatterSeries = (count: number, name: (index: number) => string) => {
  const random = mulberry32(23);
  const normal = () =>
    Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
  const per = Math.max(1, Math.round(count / CLUSTERS));
  const pointSize = count > 200_000 ? 2 : count > 20_000 ? 3 : 5;
  return Array.from({ length: CLUSTERS }, (_, c): ChartSeries => {
    const angle = (c / CLUSTERS) * 2 * Math.PI;
    const cx = 50 + 28 * Math.cos(angle);
    const cy = 50 + 28 * Math.sin(angle);
    const spread = 4 + (c % 3) * 2;
    const x = new Float64Array(per);
    const y = new Float64Array(per);
    for (let i = 0; i < per; i++) {
      x[i] = cx + normal() * spread;
      y[i] = cy + normal() * spread;
    }
    return {
      id: `cluster-${c}`,
      name: name(c + 1),
      type: "scatter",
      data: { x, y },
      pointSize,
      opacity: 0.6,
    };
  });
};

/** One bar per index */
const barSeries = (count: number, name: (index: number) => string) => {
  const random = mulberry32(37);
  const x = new Float64Array(count);
  const y = new Float64Array(count);
  for (let i = 0; i < count; i++) {
    x[i] = i;
    y[i] = 40 + 30 * Math.sin((i / count) * 12) + random() * 25;
  }
  return [
    { id: "bars", name: name(1), type: "bar", data: { x, y } },
  ] as ChartSeries[];
};

/** The series of a workload; `name` labels series `index` (from 1) */
export const makeSeries = (
  workload: Workload,
  count: number,
  name: (index: number) => string,
): ChartSeries[] =>
  workload === "line"
    ? lineSeries(count, name)
    : workload === "scatter"
      ? scatterSeries(count, name)
      : barSeries(count, name);

/** Deepest zoom of the camera path, per workload */
const ZOOM: Record<Workload, number> = { line: 200, scatter: 20, bars: 100 };

/**
 * The view at `seconds` into a run of `period` seconds: from the whole data
 * set (the hardest frame) down to the deepest zoom and back, drifting
 * sideways so that new data enters the window on every frame.
 */
export const cameraAt = (
  workload: Workload,
  seconds: number,
  period: number,
  base: ChartView,
): ChartView => {
  const phase = (seconds / period) * 2 * Math.PI;
  const zoom = 1 + ((ZOOM[workload] - 1) * (1 - Math.cos(phase))) / 2;
  const axis = (
    [from, to]: [number, number],
    drift: number,
  ): [number, number] => {
    const width = (to - from) / zoom;
    const room = (to - from - width) / 2;
    const center = (from + to) / 2 + room * 0.8 * drift;
    return [center - width / 2, center + width / 2];
  };
  return {
    x: axis(base.x, Math.sin(phase * 1.5)),
    y: workload === "scatter" ? axis(base.y, Math.cos(phase * 1.5)) : base.y,
  };
};

```

### apps/docs/src/docs/pages/chart-renderers/bench/bench.module.scss

```scss
.stage {
  width: 100%;
  min-width: 0;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--surface-color);
  overflow: hidden;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-color);
}

.spacer {
  flex: 1;
}

.body {
  display: grid;
  gap: 12px;
  padding: 12px 14px;
}

.live {
  position: relative;
  min-height: 260px;
}

.placeholder {
  display: grid;
  place-items: center;
  height: 260px;
  padding: 0 24px;
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-md);
  font-size: 13px;
  text-align: center;
  color: var(--text-muted-color);
}

.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 16px;
  padding: 8px 14px 12px;
  border-top: 1px solid var(--border-color);
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary-color);

  p {
    margin: 0;
  }
}

.hint {
  color: var(--text-muted-color);
}

.mono {
  font-family: var(--font-family-mono);
  font-variant-numeric: tabular-nums;
}

.excellent {
  color: var(--success-color);
  font-weight: 600;
}

.good {
  color: var(--success-color);
}

.fair {
  color: var(--warning-color);
}

.poor {
  color: var(--danger-color);
}

.fallback {
  color: var(--warning-color);
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px;
  margin: 0;
}

.card {
  display: grid;
  gap: 2px;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--surface-subtle-color);

  dt {
    font-size: 12px;
    color: var(--text-muted-color);
  }

  dd {
    margin: 0;
    font-family: var(--font-family-mono);
    font-size: 22px;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
  }

  small {
    font-size: 12px;
    color: var(--text-secondary-color);
  }
}

.cardBest {
  border-color: var(--primary-color);
}

.log {
  display: grid;
  gap: 4px;
  max-height: 168px;
  margin: 0;
  padding: 8px 12px;
  overflow: auto;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--surface-subtle-color);
  font-family: var(--font-family-mono);
  font-size: 12px;
  list-style: none;
  color: var(--text-secondary-color);
}

.wrap {
  overflow-wrap: anywhere;
}

```

### apps/docs/src/docs/pages/chart-renderers/bench/queue.ts

```tsx
// Runs benchmark jobs one after the other, one mounted chart at a time.
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChartSeries } from "minerva-design/charts";
import { measureRefresh, type BenchJob, type BenchResult } from "./score";
import { makeSeries, type Workload } from "./workloads";

interface Active {
  job: BenchJob;
  series: ChartSeries[];
  startedAt: number;
  run: number;
}

/**
 * Runs jobs one after the other. The data of a workload is generated once
 * (before the clock starts) and shared by the backends.
 */
export function useBenchQueue(
  name: (workload: Workload, index: number) => string,
) {
  const [active, setActive] = useState<Active | null>(null);
  const [results, setResults] = useState<BenchResult[]>([]);
  const [refresh, setRefresh] = useState(60);
  const [running, setRunning] = useState(false);
  const [planned, setPlanned] = useState(0);
  const queue = useRef<BenchJob[]>([]);
  const cache = useRef(new Map<string, ChartSeries[]>());
  const runs = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const nameRef = useRef(name);
  useEffect(() => {
    nameRef.current = name;
  });
  useEffect(
    () => () => {
      clearTimeout(timer.current);
      queue.current = [];
    },
    [],
  );

  const next = useCallback(() => {
    const job = queue.current.shift();
    if (!job) {
      setActive(null);
      setRunning(false);
      return;
    }
    const key = `${job.workload}:${job.count}`;
    let series = cache.current.get(key);
    if (!series) {
      series = makeSeries(job.workload, job.count, (index) =>
        nameRef.current(job.workload, index),
      );
      cache.current.set(key, series);
    }
    setActive({
      job,
      series,
      startedAt: performance.now(),
      run: ++runs.current,
    });
  }, []);

  const start = useCallback(
    async (jobs: BenchJob[]) => {
      clearTimeout(timer.current);
      setResults([]);
      setRunning(true);
      setPlanned(jobs.length);
      queue.current = [...jobs];
      setRefresh(await measureRefresh());
      next();
    },
    [next],
  );

  const stop = useCallback(() => {
    clearTimeout(timer.current);
    queue.current = [];
    setActive(null);
    setRunning(false);
  }, []);

  /** Unmounts the chart, lets the GPU release it, then starts the next job */
  const onDone = useCallback(
    (result: BenchResult) => {
      setResults((previous) => [...previous, result]);
      setActive(null);
      timer.current = setTimeout(next, 300);
    },
    [next],
  );

  return {
    active,
    results,
    refresh,
    running,
    planned,
    start,
    stop,
    onDone,
  };
}

```

### apps/docs/src/docs/pages/chart-renderers/bench/stage.tsx

```tsx
// Measures one backend at a time: mounts a chart forced onto the backend,
// waits for its first frame, warms up, then moves the camera on every
// animation frame for a fixed time and records the frame intervals and the
// main-thread time of each frame.
import { useEffect, useRef } from "react";
import {
  Chart,
  type ChartHandle,
  type ChartRendererKind,
  type ChartSeries,
  type ChartView,
} from "minerva-design/charts";
import {
  percentile,
  scoreOf,
  type BenchJob,
  type BenchResult,
  type Measures,
} from "./score";
import { cameraAt } from "./workloads";

/** A started backend gets this long to draw its first frame, in ms */
const START_TIMEOUT = 15_000;
/** Frames skipped after the first one (uploads, shader compilation) */
const WARMUP = 5;
/** A frame interval above this ends the run (the backend is too slow), in ms */
const SLOW_FRAME = 2000;

interface StageProps {
  job: BenchJob;
  series: ChartSeries[];
  /** performance.now() when the job was mounted */
  startedAt: number;
  refresh: number;
  height: number;
  ariaLabel: string;
  onDrawn?: (backend: ChartRendererKind) => void;
  onDone: (result: BenchResult) => void;
}

/** The chart under test; reports once, then the host unmounts it */
export function BenchStage({
  job,
  series,
  startedAt,
  refresh,
  height,
  ariaLabel,
  onDrawn,
  onDone,
}: StageProps) {
  const handle = useRef<ChartHandle>(null);
  const drawn = useRef<ChartRendererKind | null>(null);
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  });

  useEffect(() => {
    let id = 0;
    let finished = false;
    let firstFrame = 0;
    let warmup = 0;
    let base: ChartView | null = null;
    let start = 0;
    let last = 0;
    const intervals: number[] = [];
    let work = 0;
    let works = 0;
    const channel = new MessageChannel();
    // messages run once the frame they were posted in is rendered
    channel.port1.onmessage = (event: MessageEvent<[number, boolean]>) => {
      const [posted, first] = event.data;
      const now = performance.now();
      if (first) firstFrame = now - startedAt;
      else {
        work += now - posted;
        works++;
      }
    };

    const finish = (status: BenchResult["status"]) => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(id);
      const elapsed = last - start;
      const sorted = [...intervals].sort((a, b) => a - b);
      const measures: Measures = {
        startup: firstFrame,
        fps: elapsed > 0 ? (intervals.length * 1000) / elapsed : 0,
        p50: percentile(sorted, 0.5),
        p95: percentile(sorted, 0.95),
        work: works ? work / works : 0,
        frames: intervals.length,
      };
      // the last work message arrives after this frame
      setTimeout(() => {
        done.current({
          ...measures,
          job,
          drawn: drawn.current,
          status,
          refresh,
          score:
            status === "timeout"
              ? { smooth: 0, stability: 0, headroom: 0, startup: 0, total: 0 }
              : scoreOf(measures, refresh),
        });
      }, 0);
    };

    const loop = (time: number) => {
      id = requestAnimationFrame(loop);
      const instance = handle.current?.getInstance();
      if (!drawn.current || !instance) {
        if (performance.now() - startedAt > START_TIMEOUT) finish("timeout");
        return;
      }
      if (!firstFrame && warmup === 0) {
        channel.port2.postMessage([time, true]);
        warmup++;
        return;
      }
      if (warmup < WARMUP) {
        warmup++;
        return;
      }
      if (!base) {
        instance.resetZoom();
        base = instance.getView();
        start = time;
        last = time;
        return;
      }
      intervals.push(time - last);
      const slow = time - last > SLOW_FRAME;
      last = time;
      channel.port2.postMessage([time, false]);
      instance.setView(
        cameraAt(
          job.workload,
          (time - start) / 1000,
          job.duration / 1000,
          base,
        ),
      );
      if (slow) finish("slow");
      else if (time - start >= job.duration) finish("ok");
    };
    id = requestAnimationFrame(loop);
    return () => {
      finished = true;
      cancelAnimationFrame(id);
      channel.port1.close();
      channel.port2.close();
    };
  }, [job, startedAt, refresh]);

  return (
    <Chart
      ref={handle}
      series={series}
      renderer={job.backend}
      onRendererChange={(kind) => {
        drawn.current = kind;
        onDrawn?.(kind);
      }}
      legend={false}
      tooltip={false}
      interaction={false}
      xAxis={job.workload === "line" ? { type: "time" } : undefined}
      height={height}
      ariaLabel={ariaLabel}
    />
  );
}

```

## Example: バックエンドのライブ切り替え

renderer プロパティで画面上のチャートのバックエンドを変えられます。チャートはその場でレンダラーを作り直し、データとズームを保ちます。ログには実際に描画したバックエンドと起動にかかった時間が表示されます。起動できない強制バックエンドはチェーンを下に進みます。Auto はページ上部のレンダラーバーに従います。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chart-renderers/demos/switching.tsx

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  Chart,
  type ChartRendererKind,
  type ChartRendererPreference,
} from "minerva-design/charts";
import { useBenchFormat } from "../bench/format";
import { makeSeries } from "../bench/workloads";
import styles from "../bench/bench.module.scss";

const PREFERENCES: readonly ChartRendererPreference[] = [
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];
const POINTS = 200_000;

interface Entry {
  id: number;
  requested: ChartRendererPreference;
  drawn: ChartRendererKind;
  ms: number;
}

export default function SwitchingDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const text = useBenchFormat();
  const [preference, setPreference] = useState<ChartRendererPreference>("auto");
  const [drawn, setDrawn] = useState<ChartRendererKind | null>(null);
  const [log, setLog] = useState<Entry[]>([]);
  // when the current preference was asked for (performance.now())
  const asked = useRef<{ requested: ChartRendererPreference; at: number }>({
    requested: "auto",
    at: 0,
  });

  const series = useMemo(
    () => makeSeries("line", POINTS, (index) => t("series.line", { index })),
    [t],
  );
  // the first backend is timed from the mount (renderers start asynchronously)
  useEffect(() => {
    asked.current.at = performance.now();
  }, []);

  return (
    <div className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("preference")}
          direction="horizontal"
          size="small"
          value={preference}
          onChange={(value) => {
            const next = value as ChartRendererPreference;
            asked.current = { requested: next, at: performance.now() };
            setPreference(next);
          }}
        >
          {PREFERENCES.map((kind) => (
            <Radio key={kind} value={kind} label={text.renderer(kind)} />
          ))}
        </RadioGroup>
      </div>
      <div className={styles.body}>
        <Chart
          series={series}
          renderer={preference}
          onRendererChange={(kind) => {
            const { requested, at } = asked.current;
            setDrawn(kind);
            setLog((previous) =>
              [
                {
                  id: (previous[0]?.id ?? 0) + 1,
                  requested,
                  drawn: kind,
                  ms: performance.now() - at,
                },
                ...previous,
              ].slice(0, 8),
            );
          }}
          legend={false}
          xAxis={{ type: "time" }}
          height={240}
          ariaLabel={t("switchAria", { count: text.compact(POINTS) })}
        />
        <ol className={styles.log} aria-label={t("switchLog")}>
          {log.map((entry) => (
            <li key={entry.id}>
              {entry.requested === entry.drawn
                ? t("switchEntry", {
                    backend: text.renderer(entry.drawn),
                    ms: text.ms(entry.ms),
                  })
                : t("switchEntryOther", {
                    requested: text.renderer(entry.requested),
                    backend: text.renderer(entry.drawn),
                    ms: text.ms(entry.ms),
                  })}
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.footer}>
        <p role="status">
          {drawn
            ? t("switchStatus", { backend: text.renderer(drawn) })
            : t("starting")}
        </p>
        <p className={styles.hint}>{t("switchHint")}</p>
      </div>
    </div>
  );
}

```

### apps/docs/src/docs/pages/chart-renderers/bench/format.ts

```tsx
import { useTranslation } from "react-i18next";
import type {
  ChartRendererKind,
  ChartRendererPreference,
} from "minerva-design/charts";
import { gradeOf } from "./score";
import styles from "./bench.module.scss";

/** Color class of a score out of 100 */
export const scoreClass = (score: number) =>
  ({
    excellent: styles.excellent,
    good: styles.good,
    fair: styles.fair,
    poor: styles.poor,
  })[gradeOf(score)];

/** Color class of a frame rate */
export const fpsClass = (fps: number) =>
  fps >= 50 ? styles.good : fps >= 25 ? styles.fair : styles.poor;

/** Localized numbers, durations and backend names of the benchmarks */
export const useBenchFormat = () => {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
  });
  const number = new Intl.NumberFormat(i18n.language);
  const compact = new Intl.NumberFormat(i18n.language, {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  const decimal = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const bytes = new Intl.NumberFormat(i18n.language, {
    style: "unit",
    unit: "gigabyte",
    maximumFractionDigits: 1,
  });
  const percent = new Intl.NumberFormat(i18n.language, {
    style: "percent",
    maximumFractionDigits: 0,
  });
  return {
    count: (value: number) => number.format(Math.round(value)),
    compact: (value: number) => compact.format(value),
    decimal: (value: number) => decimal.format(value),
    ms: (value: number) =>
      t("ms", {
        value:
          value < 100
            ? decimal.format(value)
            : number.format(Math.round(value)),
      }),
    fps: (value: number) =>
      t("fps", { value: number.format(Math.round(value)) }),
    gigabytes: (value: number) => bytes.format(value / 1024 ** 3),
    percent: (value: number) => percent.format(value),
    renderer: (kind: ChartRendererPreference | ChartRendererKind) =>
      t(`renderers.${kind}`),
  };
};

```

### apps/docs/src/docs/pages/chart-renderers/bench/score.ts

```tsx
// Scores of the renderer benchmarks: what a run measures and how it turns
// into a score out of 100, relative to the display refresh rate.
import type { ChartRendererKind } from "minerva-design/charts";
import type { Workload } from "./workloads";

export const BACKENDS: readonly ChartRendererKind[] = [
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

export interface BenchJob {
  backend: ChartRendererKind;
  workload: Workload;
  count: number;
  /** Measured part of the run, in ms */
  duration: number;
}

export interface Measures {
  /** From mounting the chart to its first painted frame, in ms */
  startup: number;
  /** Frames per second over the run */
  fps: number;
  /** Median interval between two frames, in ms */
  p50: number;
  /** 95th percentile of the frame intervals, in ms */
  p95: number;
  /** Average main-thread time of a frame, in ms */
  work: number;
  frames: number;
}

/** Each part between 0 and 1, `total` out of 100 */
export interface Score {
  smooth: number;
  stability: number;
  headroom: number;
  startup: number;
  total: number;
}

export interface BenchResult extends Measures {
  job: BenchJob;
  /** Backend that drew the chart (another one after a fallback) */
  drawn: ChartRendererKind | null;
  /** `slow`: a frame took over 2 s, `timeout`: the backend never started */
  status: "ok" | "slow" | "timeout";
  /** Display refresh rate the score is relative to, in Hz */
  refresh: number;
  score: Score;
}

/** Weights of the score (they add up to 1) */
export const WEIGHTS = {
  smooth: 0.4,
  stability: 0.2,
  headroom: 0.25,
  startup: 0.15,
} as const;

/** A startup at or above this scores 0, in ms */
export const STARTUP_LIMIT = 1000;

const clamp = (value: number) =>
  Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;

/**
 * - smooth: frame rate / refresh rate
 * - stability: frame budget / 95th percentile frame interval
 * - headroom: 1 - main-thread time per frame / frame budget
 * - startup: 1 - time to first frame / 1 s
 */
export const scoreOf = (measures: Measures, refresh: number): Score => {
  const budget = 1000 / refresh;
  const parts = {
    smooth: clamp(measures.fps / refresh),
    stability: clamp(budget / measures.p95),
    headroom: clamp(1 - measures.work / budget),
    startup: clamp(1 - measures.startup / STARTUP_LIMIT),
  };
  const total =
    parts.smooth * WEIGHTS.smooth +
    parts.stability * WEIGHTS.stability +
    parts.headroom * WEIGHTS.headroom +
    parts.startup * WEIGHTS.startup;
  return { ...parts, total: Math.round(total * 100) };
};

export type Grade = "excellent" | "good" | "fair" | "poor";

export const gradeOf = (score: number): Grade =>
  score >= 85
    ? "excellent"
    : score >= 65
      ? "good"
      : score >= 40
        ? "fair"
        : "poor";

/** Display refresh rate: median of 24 idle animation-frame intervals, in Hz */
export const measureRefresh = (): Promise<number> =>
  new Promise((resolve) => {
    const times: number[] = [];
    const step = (time: number) => {
      times.push(time);
      if (times.length < 25) {
        requestAnimationFrame(step);
        return;
      }
      const deltas = times
        .slice(1)
        .map((t, i) => t - times[i]!)
        .sort((a, b) => a - b);
      const median = deltas[deltas.length >> 1] ?? 1000 / 60;
      resolve(Math.min(240, Math.max(30, Math.round(1000 / median))));
    };
    requestAnimationFrame(step);
  });

export const percentile = (sorted: readonly number[], p: number) =>
  sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))] ?? 0;

```

### apps/docs/src/docs/pages/chart-renderers/bench/workloads.ts

```tsx
// Workloads of the renderer benchmarks: seeded typed-array columns (every
// visit draws the same picture) and the camera path that zooms in and out
// of them while the frames are measured.
import type { ChartSeries, ChartView } from "minerva-design/charts";

export type Workload = "line" | "scatter" | "bars";

export const WORKLOADS: readonly Workload[] = ["line", "scatter", "bars"];

/** Point counts offered per workload (bars stay lower: one shape each) */
export const COUNTS: Record<Workload, readonly number[]> = {
  line: [10_000, 100_000, 1_000_000, 2_000_000],
  scatter: [10_000, 100_000, 1_000_000, 2_000_000],
  bars: [1_000, 10_000, 100_000, 200_000],
};

/** Seeded PRNG (mulberry32): uniform numbers in [0, 1) */
export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LINES = 4;
const CLUSTERS = 8;
const START = Date.UTC(2026, 0, 1);

/** Four signals sharing one x column (one sample per second) */
const lineSeries = (count: number, name: (index: number) => string) => {
  const length = Math.max(2, Math.round(count / LINES));
  const random = mulberry32(11);
  const x = new Float64Array(length);
  for (let i = 0; i < length; i++) x[i] = START + i * 1000;
  return Array.from({ length: LINES }, (_, s): ChartSeries => {
    const y = new Float64Array(length);
    let walk = 0;
    for (let i = 0; i < length; i++) {
      walk += (random() - 0.5) * 0.6;
      walk *= 0.999;
      y[i] = 20 + s * 12 + walk + 4 * Math.sin((i / length) * 18 + s);
    }
    return {
      id: `signal-${s}`,
      name: name(s + 1),
      data: { x, y },
      lineWidth: 1,
    };
  });
};

/** Eight Gaussian clusters */
const scatterSeries = (count: number, name: (index: number) => string) => {
  const random = mulberry32(23);
  const normal = () =>
    Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
  const per = Math.max(1, Math.round(count / CLUSTERS));
  const pointSize = count > 200_000 ? 2 : count > 20_000 ? 3 : 5;
  return Array.from({ length: CLUSTERS }, (_, c): ChartSeries => {
    const angle = (c / CLUSTERS) * 2 * Math.PI;
    const cx = 50 + 28 * Math.cos(angle);
    const cy = 50 + 28 * Math.sin(angle);
    const spread = 4 + (c % 3) * 2;
    const x = new Float64Array(per);
    const y = new Float64Array(per);
    for (let i = 0; i < per; i++) {
      x[i] = cx + normal() * spread;
      y[i] = cy + normal() * spread;
    }
    return {
      id: `cluster-${c}`,
      name: name(c + 1),
      type: "scatter",
      data: { x, y },
      pointSize,
      opacity: 0.6,
    };
  });
};

/** One bar per index */
const barSeries = (count: number, name: (index: number) => string) => {
  const random = mulberry32(37);
  const x = new Float64Array(count);
  const y = new Float64Array(count);
  for (let i = 0; i < count; i++) {
    x[i] = i;
    y[i] = 40 + 30 * Math.sin((i / count) * 12) + random() * 25;
  }
  return [
    { id: "bars", name: name(1), type: "bar", data: { x, y } },
  ] as ChartSeries[];
};

/** The series of a workload; `name` labels series `index` (from 1) */
export const makeSeries = (
  workload: Workload,
  count: number,
  name: (index: number) => string,
): ChartSeries[] =>
  workload === "line"
    ? lineSeries(count, name)
    : workload === "scatter"
      ? scatterSeries(count, name)
      : barSeries(count, name);

/** Deepest zoom of the camera path, per workload */
const ZOOM: Record<Workload, number> = { line: 200, scatter: 20, bars: 100 };

/**
 * The view at `seconds` into a run of `period` seconds: from the whole data
 * set (the hardest frame) down to the deepest zoom and back, drifting
 * sideways so that new data enters the window on every frame.
 */
export const cameraAt = (
  workload: Workload,
  seconds: number,
  period: number,
  base: ChartView,
): ChartView => {
  const phase = (seconds / period) * 2 * Math.PI;
  const zoom = 1 + ((ZOOM[workload] - 1) * (1 - Math.cos(phase))) / 2;
  const axis = (
    [from, to]: [number, number],
    drift: number,
  ): [number, number] => {
    const width = (to - from) / zoom;
    const room = (to - from - width) / 2;
    const center = (from + to) / 2 + room * 0.8 * drift;
    return [center - width / 2, center + width / 2];
  };
  return {
    x: axis(base.x, Math.sin(phase * 1.5)),
    y: workload === "scatter" ? axis(base.y, Math.cos(phase * 1.5)) : base.y,
  };
};

```

### apps/docs/src/docs/pages/chart-renderers/bench/bench.module.scss

```scss
.stage {
  width: 100%;
  min-width: 0;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--surface-color);
  overflow: hidden;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-color);
}

.spacer {
  flex: 1;
}

.body {
  display: grid;
  gap: 12px;
  padding: 12px 14px;
}

.live {
  position: relative;
  min-height: 260px;
}

.placeholder {
  display: grid;
  place-items: center;
  height: 260px;
  padding: 0 24px;
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-md);
  font-size: 13px;
  text-align: center;
  color: var(--text-muted-color);
}

.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 16px;
  padding: 8px 14px 12px;
  border-top: 1px solid var(--border-color);
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary-color);

  p {
    margin: 0;
  }
}

.hint {
  color: var(--text-muted-color);
}

.mono {
  font-family: var(--font-family-mono);
  font-variant-numeric: tabular-nums;
}

.excellent {
  color: var(--success-color);
  font-weight: 600;
}

.good {
  color: var(--success-color);
}

.fair {
  color: var(--warning-color);
}

.poor {
  color: var(--danger-color);
}

.fallback {
  color: var(--warning-color);
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px;
  margin: 0;
}

.card {
  display: grid;
  gap: 2px;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--surface-subtle-color);

  dt {
    font-size: 12px;
    color: var(--text-muted-color);
  }

  dd {
    margin: 0;
    font-family: var(--font-family-mono);
    font-size: 22px;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
  }

  small {
    font-size: 12px;
    color: var(--text-secondary-color);
  }
}

.cardBest {
  border-color: var(--primary-color);
}

.log {
  display: grid;
  gap: 4px;
  max-height: 168px;
  margin: 0;
  padding: 8px 12px;
  overflow: auto;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--surface-subtle-color);
  font-family: var(--font-family-mono);
  font-size: 12px;
  list-style: none;
  color: var(--text-secondary-color);
}

.wrap {
  overflow-wrap: anywhere;
}

```
