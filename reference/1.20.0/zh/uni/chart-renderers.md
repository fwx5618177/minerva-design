# 渲染器对比

四种图表后端有何不同、你的浏览器运行的是哪一种，以及它们在这台设备上的对比：实时基准测试，给出帧率、帧时间、主线程开销、启动耗时和百分制评分。

Package: minerva-design@1.20.0

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

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
