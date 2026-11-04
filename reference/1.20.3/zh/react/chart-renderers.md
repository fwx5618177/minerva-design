# 渲染器对比

四种图表后端有何不同、你的浏览器运行的是哪一种，以及它们在这台设备上的对比：实时基准测试，给出帧率、帧时间、主线程开销、启动耗时和百分制评分。

Package: minerva-design@1.20.3

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 图表如何选择后端

笛卡尔坐标系图表（折线、面积、柱状、散点、K 线、热力图、迷你图、四象限）用四种后端之一绘制数据，用 DOM 绘制文字（坐标轴、标签、图例、提示框）。四种后端画出的图形和颜色完全相同，区别在于速度、启动开销、可用性和限制。

renderer="auto"（默认）依次尝试 WebGPU、WebGL2、WebGL、Canvas2D，保留第一个能启动的。onRendererChange、renderer 事件和 ready Promise 会报告实际使用的后端。

Auto 会跳过以软件方式运行的 GPU（SwiftShader、llvmpipe、Microsoft Basic Render Driver 等）：它们比 Canvas2D 还慢，所以虚拟机和无头浏览器通常会落到 Canvas2D。

renderer="webgpu" | "webgl2" | "webgl" | "canvas2d" 强制使用某个后端，软件 GPU 也算。如果无法启动，图表沿链条向下降级，绝不向上。

GPU 丢失时（驱动重置、设备被移除、上下文被回收），图表切换到下一个后端，以相同的数据、缩放和状态重绘，并报告新的后端。

setDefaultChartRenderer() 设置所有 renderer 未设置或为 "auto" 的图表的后端，React、Vue、Angular 和 Web Components 通用；屏幕上的图表会实时切换。

### 一览

每个后端底层用的是什么、如何绘制一帧、限制在哪里。

方面

浏览器 API

WebGPU，底层为 Vulkan、Metal 或 Direct3D 12

WebGL 2.0（OpenGL ES 3.0）

WebGL 1.0（OpenGL ES 2.0）加 ANGLE_instanced_arrays 扩展

Canvas 2D 上下文，由浏览器光栅化

着色器

WGSL

GLSL ES 3.00

GLSL ES 1.00

无：由 JavaScript 绘制路径、矩形和像素

绘制一帧

每个系列一次实例化绘制，数据在 GPU 缓冲区中

每个系列一次实例化绘制，每个系列一个顶点数组对象

每个系列一次实例化绘制，每次绘制重新绑定属性（没有顶点数组对象）

每个可见图形都由 JavaScript 重新绘制

缩放与平移

只改变一个变换：不重建任何缓冲区

只改变一个变换：不重建任何缓冲区

只改变一个变换：不重建任何缓冲区

每一帧都重新绘制可见范围

数百万个折线点

绘制每一段可见线段

绘制每一段可见线段

绘制每一段可见线段

抽稀为每个像素列的最小值 / 最大值（每列最多 4 个点），轮廓不变

大型散点集

绘制每个点，每个系列一次实例化绘制

绘制每个点，每个系列一次实例化绘制

绘制每个点，每个系列一次实例化绘制

超过 20,000 个点时逐像素写入 ImageData 缓冲区：每帧仍为 O(n)

抗锯齿

在着色器中完成（不用 MSAA）

在着色器中完成（不用 MSAA）

在着色器中完成（不用 MSAA）

浏览器自带

每页上下文数

每个图表一个设备；不计入 WebGL 上限

浏览器大约保留 16 个活动 WebGL 上下文：超出后，屏幕外的图表会被挂起，滚回视野时恢复

与 WebGL2 相同的上限，且与其共享

没有上限

GPU 丢失

降级到 WebGL2

降级到 WebGL

降级到 Canvas2D

没有可丢失的

启动

异步：适配器、设备和管线

同步创建上下文，启动时编译着色器

同步创建上下文，启动时编译着色器

立即

最适合

数百万个点、实时数据、长时间缩放浏览

没有 WebGPU 时的同类场景；覆盖最广的高速路径

较旧的 GPU、驱动和不支持 WebGL2 的浏览器

小图表、单页大量图表、软件 GPU、完全没有 GPU

### 预期表现

以下趋势来自下方的实测结果，并非承诺：在本页运行基准测试来测量你的设备。

几万个点以内，每个后端都能跟上显示器刷新；Canvas2D 还完全不需要 GPU 上下文。

折线和面积图：Canvas2D 会把它们抽稀到像素列，因此在较快的 CPU 上，即使 200 万个有序点也依然流畅；GPU 后端的开销则几乎不随规模变化。

散点集是各后端拉开差距的地方：Canvas2D 每帧都要绘制每个点，主线程时间随点数增长（在示例机器上 10 万点约 8 ms、100 万点约 12 ms、200 万点约 21 ms，并跌破刷新率），而 GPU 后端保持在 1 到 3 ms 左右。

柱状图：在示例机器上，20 万根柱子以内每个后端都能跟上，其中 GPU 后端的主线程时间最少。

WebGPU、WebGL2 和 WebGL 之间往往只差一两毫秒，与多次运行之间的波动相当。集成显卡、较旧的 GPU 和手机会拉大差距；较慢的 CPU 会让 Canvas2D 更早落后。

首帧需要几十毫秒，并随需要上传的数据量增长（示例机器上 200 万个点约 100 ms）。

### 示例结果

在一台 Apple M3 Max 笔记本上运行一次基准测试示例的结果：macOS 上的 Chrome 156，60 Hz 显示器，像素比 1，每个后端 3 秒。每个单元格给出评分和每帧主线程时间，帧率低于显示器刷新率时另外标出。

负载

{{workload}} · {{count}}个点

数据来自一台机器的一次运行：几分或一毫秒的差异都在波动范围内。运行上面的基准测试即可得到你自己的结果。

### 评分如何计算

每次运行结束时给出百分制评分，只根据实测结果计算，并以本显示器的刷新率为基准（运行前测量）。共四项，每项介于 0 和 1 之间：

流畅度（40%）：每秒帧数除以刷新率。

稳定性（20%）：帧预算（1000 ms / 刷新率）除以第 95 百分位帧间隔，因此即使平均值不错，长帧也会扣分。

余量（25%）：1 减去每帧主线程时间除以帧预算，也就是每帧还剩多少时间留给你的应用。

启动（15%）：1 减去从挂载图表到首帧绘制完成的时间除以一秒。

等级：85 及以上为优秀，65 及以上为良好，40 及以上为一般，低于 40 为较差。评分用于在同一设备、同一负载下比较后端，不能跨机器比较。

### 测量方法与注意事项

基准测试一次只挂载一个图表，强制使用某个后端，数据和镜头路径完全相同：

数据：带种子的 TypedArray 列，在计时开始前生成一次，所有后端共用。镜头从完整数据集（最重的一帧）缩放到最深处再返回，同时横向漂移，每个动画帧调用一次 setView。

主线程时间：从动画帧开始到该帧内发送的一条消息被处理为止，这条消息在该帧渲染完成后才运行；其中包括图表的 JavaScript 与绘制调用、样式计算、布局和绘制。

帧率受显示器上限约束：两个都达到刷新率的后端在流畅度上打平，差别体现在余量上。

绘制调用之后的 GPU 时间对 JavaScript 不可见：提交很快但让 GPU 满载的后端，会表现为帧率下降和帧间隔变长。

结果会随电源模式、过热降频、其他标签页和浏览器扩展而变化。运行期间请保持标签页在前台，并运行两次进行比较。

### 浏览器支持

各后端在哪些地方可用。版本号为默认开启该功能的首个稳定版；是否支持还取决于 GPU 及其驱动。

浏览器

WebGPU 只能在安全上下文（HTTPS 或 localhost）中运行。浏览器会屏蔽部分 GPU 和驱动，此时图表会自动降级。上方的「你的设备」示例展示了当前浏览器实际提供的能力。

Chrome、Edge（桌面）

113+，Windows、macOS 和 ChromeOS

Chrome 56+，Edge 79+

支持

支持

Firefox（桌面）

Windows 上 141+；其他平台陆续推出

51+

支持

支持

Safari（macOS）

26+

15+

支持

支持

iOS 和 iPadOS（所有浏览器）

26+

15+

支持

支持

Android 版 Chrome

121+，Android 12+ 且 GPU 受支持

支持

支持

支持

Linux 上的 Chrome

取决于版本和 GPU 驱动

支持

支持

支持

### 该用哪一个

生产环境中保持 renderer 为 "auto"：每位访客都会得到其设备能以硬件运行的最快后端，GPU 丢失也会自动处理。

只在测试或比较时强制使用 WebGPU；当它能以硬件运行时，auto 已经会优先选择它。

当 WebGPU 驱动在你的目标设备上表现异常，或希望在 WebGPU 上线时间不同的浏览器之间保持一致渲染时，强制使用 WebGL2。

需要复现旧设备上的效果时，强制使用 WebGL。

小图表、缩略图和迷你图，包含几十个图表的页面（没有上下文上限），以及没有 GPU 的环境，强制使用 Canvas2D。

包含大量图表的仪表盘：大型或可交互的图表保持 auto，小图表使用 Canvas2D，或者销毁离开屏幕的图表。

数据格式、流式更新和百万级数据展示见图表性能；不依赖框架的 API 见图表引擎。

自动

WebGPU

WebGL2

WebGL

Canvas2D

{{value}} ms

{{value}} fps

信号 {{index}}

簇 {{index}}

数值

正在探测各后端…

后端

自动

状态

CPU

硬件 GPU

软件 GPU

不可用

GPU / 设备

由浏览器绘制，无需 GPU 上下文

API 版本

上限

纹理最大 {{value}} px

缓冲区最大 {{value}}

不支持实例化：降级到 Canvas2D

Auto 选择

这里的 WebGPU 运行在硬件 GPU 上。

这里没有硬件 WebGPU；WebGL2 是可用的最佳后端。

这里没有硬件 WebGPU 或 WebGL2；WebGL 是可用的最佳后端。

这里没有硬件 GPU 后端：Canvas2D 比软件 GPU 更快。

安全上下文

是

否

WebGPU 需要 HTTPS 或 localhost。

像素比

每个 CSS 像素对应的设备像素：需要填充的像素更多。

CPU 线程

浏览器报告的逻辑核心数。

这台设备上的图表后端

GPU 名称可能很笼统或缺失：浏览器出于隐私可能会隐藏或模糊它。

负载

折线

散点

柱状

数据点数量

{{value}}个点

每次运行时长

每个后端 {{value}} 秒

包含软件 GPU

运行所有后端

停止

{{backend}} 正在绘制 {{count}} 个点

运行基准测试：各后端依次获得相同的数据和相同的缩放路径。

正在释放上一个后端…

完成。修改负载或规模后再次运行以进行比较。

{{requested}} → {{backend}}

后端

评分

FPS

帧时间 p50

帧时间 p95

每帧主线程

首帧

运行

完成

已停止：某一帧超过 2 秒

未能启动

流畅度（{{weight}}%）

稳定性（{{weight}}%）

余量（{{weight}}%）

启动（{{weight}}%）

{{value}} / 100

优秀

良好

一般

较差

主线程：Canvas2D 的 {{value}}

各后端的基准测试结果

各后端评分按四项拆分

正在测量 {{backend}}（第 {{index}} 个，共 {{total}} 个）…

正在准备下一次运行…

完成：相同的数据、相同的镜头路径，一次一个后端。

结果已复制为 Markdown 表格。

就绪。

已跳过（软件 GPU）：{{backends}}。

显示器：{{value}} Hz，帧预算 {{budget}} ms

复制结果

{{workload}}，{{count}} 个点，{{refresh}} Hz 显示器

运行规模测试

运行测试：每个硬件后端分别绘制 10K、100K、1M 和 2M 个点，每次 1.5 秒（约一分钟）。

数据点

每秒帧数

每帧主线程

{{workload}}：按数据点数量和后端划分的帧率

{{workload}}：按数据点数量和后端划分的每帧主线程时间

正在用 {{count}} 个点测量 {{backend}}（第 {{index}} 次，共 {{total}} 次）…

完成。平稳的曲线随屏幕扩展，上升的曲线随数据增长。

跳过软件 GPU；除帧率外，两条坐标轴都是对数刻度。

渲染器

用所选后端绘制的 {{count}} 点折线

后端变更

{{backend}} 就绪，耗时 {{ms}}

请求 {{requested}}：{{backend}} 就绪，耗时 {{ms}}

使用 {{backend}} 绘制。

正在启动渲染器…

切换后数据、缩放和悬停状态都会保留。

让 GPU 丢失

从 WebGPU 重新开始

{{backend}}（已丢失）

{{backend}} 已丢失

已在 {{backend}} 上恢复，耗时 {{ms}}

在 {{backend}} 上启动

GPU 丢失时会降级的 {{count}} 点折线

丢失与恢复

此浏览器无法在页面中模拟 {{backend}} 丢失。

链条末端：Canvas2D 不需要 GPU。

使用 {{backend}} 绘制。

真实的丢失发生在驱动更新、GPU 重置或浏览器回收上下文时。

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

## Example: 基准测试与评分

选择负载（折线、散点或柱状）、规模和时长后运行：各后端依次用相同的镜头路径绘制相同的数据。表格给出帧率、帧时间中位数和第 95 百分位、每帧主线程时间和首帧耗时；卡片和条形图给出评分及其组成。可以把结果复制为 Markdown 表格分享。

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

## Example: 你的设备

按引擎的方式探测每个后端：能否在硬件 GPU 上启动、是否只能用软件 GPU 或根本无法启动，浏览器报告的 GPU 和 API 版本、若干上限，以及 renderer="auto" 在这里会选择的后端。每次探测都会立即释放上下文。

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

## Example: GPU 丢失

在当前后端上模拟 GPU 丢失（WebGL 用 WEBGL_lose_context，WebGPU 销毁设备）：图表切换到下一个后端并重绘，直到 Canvas2D。日志显示每次恢复所用的时间。

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

## Example: 随数据点数量的变化

让每个硬件后端分别绘制 10K、100K、1M 和 2M 个点（每次 1.5 秒），并在对数坐标上绘出帧率和每帧主线程时间随规模的变化：GPU 曲线保持平稳，而 Canvas2D 不断攀升。

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

## Example: 实时切换后端

renderer 属性可以更换屏幕上图表的后端：图表就地重建渲染器，并保留数据和缩放。日志显示实际绘制的后端及其启动耗时；无法启动的强制后端会沿链条向下降级。Auto 跟随页面顶部的渲染器栏。

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
