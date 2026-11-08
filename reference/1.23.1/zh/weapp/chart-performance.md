# 图表性能

图表引擎如何在数百万个数据点下保持流畅，并附实时演示：渲染器选择与回退、数据格式、哪些开销随可见范围变化、降采样、命中检测、React 与流式更新技巧，以及小程序和 React Native 的绘制预算。

Package: minerva-design@1.23.1

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### 概览

引擎对每个数据集只做一次昂贵的处理，之后的每一步都只与屏幕上可见的内容成正比。数据数组会被规范化为 Float64Array 列，再转换成 GPU 缓冲区；只要你传入的是同一个引用，它们就会被复用。悬停、缩放和平移只涉及可见的点或一次变换。本页说明哪些操作很快、哪些操作需要完整遍历数据，以及如何让图表始终走在快速路径上。

各项配置见 Chart（React）和 图表引擎（不依赖框架）。四种后端的并排对比、实时基准测试和评分见渲染器对比。

### 渲染器与回退

直角坐标系图表（折线、面积、柱状、散点、K 线、热力图、迷你图、四象限）用 GPU 绘制数据，用 DOM 绘制文字（坐标轴、标签、图例、提示框）。renderer 选项用于选择后端。

auto（默认）依次尝试 WebGPU、WebGL2、WebGL、Canvas2D，并使用第一个成功启动的后端。ready Promise 会以所选类型 resolve，onRendererChange / renderer 事件也会报告它。

WebGL（1）是旧 GPU、旧驱动以及不支持 WebGL2 的浏览器的兜底方案：标记、颜色和抗锯齿完全相同，使用 GLSL ES 1.0 着色器，并通过 ANGLE_instanced_arrays 扩展（几乎所有环境都支持）进行实例化绘制。缺少该扩展时，图表会继续回退到 Canvas2D。

在 auto 模式下会跳过软件 GPU，因为它们比 Canvas2D 还慢：WebGPU 拒绝回退适配器（fallback adapter）；WebGL2 和 WebGL 以 failIfMajorPerformanceCaveat 创建，若渲染器名称表明是软件光栅化器（SwiftShader、llvmpipe、softpipe、Microsoft Basic Render Driver 等）也会被拒绝。因此虚拟机和无头浏览器通常会落到 Canvas2D。

renderer: "webgpu"、"webgl2"、"webgl" 或 "canvas2d" 会强制使用某个后端，软件 GPU 也允许；如果无法启动，则使用链路中的下一个后端。Canvas2D 适合小图表和截图；数据点达到数万个以上时 GPU 更有优势。

当 GPU 丢失（驱动重置、上下文过多）时，图表会回退到下一个后端、重新绘制，并再次触发 renderer 事件。浏览器会限制同时存在的 WebGL 上下文数量（约 16 个）：包含几十个 GPU 图表的仪表盘应销毁移出屏幕的图表，或对小图表使用 Canvas2D。

### 为所有图表统一设置渲染器

setDefaultChartRenderer() 为所有未设置 renderer 或设置为 "auto" 的图表指定后端，适用于所有框架：该默认值保存在 globalThis 上，因此 React 组件、Vue 和 Angular 封装以及 Web Components 共享同一设置，即使页面打包了多份引擎副本也是如此。已显示的图表会实时跟随更改：它们就地重建渲染器，保留数据、缩放和状态。subscribeDefaultChartRenderer() 可以监听变化，例如让选择器保持同步。

图表自身的 renderer 选项始终优先。通过默认值强制指定的后端视为强制：它可以运行在软件 GPU 上，无法启动时回退到下一个后端。设为 "auto" 即恢复自动检测。

本文档图表页面顶部的渲染器栏正是这样实现的：在那里选择 Canvas2D 或 WebGL，页面上的所有图表都会切换到该后端，每个示例下方的徽标显示实际使用的后端。在本页中，每个展示的“自动”选项会跟随它。

### 实时演示

下面的示例会在你的浏览器中绘制多达一百万个标记。数据在示例接近屏幕时，用带种子的随机数生成器一次性生成到类型化数组中；示例移出屏幕时动画会暂停。选择一个后端即可强制使用它——图表会显示实际启动的是哪一个——然后让镜头巡游自动缩放，或者用鼠标亲自操作。

FPS 与帧时间：图表运动时页面的绘制频率。显示器每秒刷新 60 次或更多；低于 30 时动画会显得卡顿。

主线程：每一帧的 JavaScript、样式、布局和绘制时间，包含图表的绘制调用（GPU 本身并行工作）。数值越低，留给页面其余部分的余量越大。

首帧：从把数据（或新的后端）交给图表，到第一帧绘制完成的时间——包括规范化列、构建 GPU 缓冲区和绘制。

渲染器

自动

WebGPU

WebGL2

WebGL

Canvas2D

页面（{{backend}}）

镜头巡游

数据流

渲染器

FPS

帧时间

主线程

首帧

数据点

单元格

K 线

写入速率

{{value}} ms

{{value}} fps

{{value}}/秒

{{value}} dB

正在生成 {{value}} 个数据点…

正在启动渲染器…

自动选择了 {{backend}}，这是当前环境下最好的后端。

自动选择了 {{backend}}：当前环境没有可用的硬件加速 GPU（软件 GPU 会被跳过）。

按要求使用 {{backend}} 绘制。

{{requested}} 无法在此启动，已回退到 {{backend}}。

镜头巡游已暂停：使用此后端时每帧占用主线程 {{ms}}。可以重新开启，或换一个后端。

使用页面所选的渲染器 {{backend}} 绘制。

页面所选的 {{requested}} 在此设备上运行于软件 GPU：为保持页面流畅，此示例改用 {{backend}}。在此示例中选择 {{requested}} 可强制使用。

Ctrl / ⌘ + 滚轮或双指捏合缩放，拖动平移，双击复位。y 轴随可见范围自动适配。

Ctrl / ⌘ + 滚轮或双指捏合同时缩放两个轴，拖动平移，双击复位。

新样本到达时，最旧的样本移出窗口；悬停可读取某个通道的数值。

传感器 {{index}}

温度（°C）

四个传感器，1,000,000 个读数

簇 {{index}}

十个簇，1,000,000 个点

指数

价格

200,000 根一分钟 K 线

电平

时间（秒）

频率（Hz）

1,000 × 1,000 单元格的声谱图

通道 {{index}}

{{value}} 个实时数据流通道

{{backend}}：同一数据集

数据集

折线 · 100 万点

散点 · 100 万点

运行基准测试

→ {{backend}}（回退）

测量中…

每帧主线程时间（越短越好）与帧率

正在测量 {{backend}}…

完成：相同的数据、相同的缩放路径，每次只运行一个后端。

运行基准测试，在这台设备上测量每个后端。

每次运行只挂载一个包含全部数据点的图表 3 秒，结束后恢复预览。

{{requested}} → {{backend}}

预览：使用 Canvas2D 绘制 {{value}}个点。运行基准测试以绘制一百万个点。

{{backend}}：数据集预览

实时：使用 {{backend}} 绘制 {{value}}个点

软件 GPU：已跳过（会阻塞页面）

仍然运行

已跳过

已跳过（软件 GPU）：{{backends}}。

### 数据格式（由快到慢）

每个系列只会被规范化为列一次。这一遍的开销取决于你提供的格式：

类型化数组列（{ x: Float64Array, y: Float32Array }）：通过一次 set() 复制，无需逐点转换。以 Float64Array 提供的 open / high / low / value 列会被直接使用。最适合 10 万个以上的数据点。

普通数组列（{ x: number[], y: number[] }）：一次数值复制循环；分类值和 Date 会在这里转换。

[x, y] 元组：每个点读取一个小数组。

{ x, y, … } 对象：最灵活（size、color、label、open/high/low、value），也最慢，因为每个点的每个字段都要读取。几千个点以内没有问题。

规范化后的数据按系列 id（或索引）和数组引用缓存：再次传入同一个数组不产生任何开销，而原地修改过的数组不会被重新读取。当系列顺序可能变化时请为系列设置 id，并让 x 升序排列：有序数据才能启用下文的二分查找。

### 哪些开销随可见范围变化

完成第一遍处理后，每一帧的工作量取决于可见内容，而不是数据集的大小：

x 有序的折线、面积和柱状图：通过二分查找定位可见范围，只绘制并命中检测这些点。悬停查找为 O(log n)。

散点、K 线和热力图系列会被完整绘制（在 GPU 上只是一次实例化绘制调用）；无序的折线也是如此。

Canvas2D 会把折线和面积降采样为每个像素列的最小值 / 最大值（每列最多 4 个点），因此一百万个点只需绘制几千条线段，轮廓保持不变。

Canvas2D 会把超过 20,000 个点的散点系列直接光栅化到 ImageData 缓冲区，而不是绘制路径；没有离屏画布的环境（小程序）则在每个被占用的网格单元中绘制一个方块。

散点命中检测使用均匀网格索引（每个单元约 4 个点，按需构建并按数据数组缓存），因此在 10 万个点上悬停也低于 1 毫秒。

DOM 只在发生变化时更新：图例仅在条目变化时重建，指针停留在同一组点上时复用提示框和悬停标记，解析后的主题颜色会缓存到主题变化为止。

### 缩放与平移

在 WebGPU、WebGL2 和 WebGL 上，缩放和平移只改变一个变换 uniform：无论有多少点都不会重建缓冲区。缓冲区以 float32 存储相对于某个原点的位置；当你在远离原点处放大超过约 2000 倍时，图表会重新定位原点并重建一次缓冲区，以保持亚像素精度。

在 Canvas2D 上，每一帧都会按像素列降采样并重绘可见范围：开销随可见点数增长，对有序的折线和面积而言上限由绘图区宽度决定。大型散点集在这里每帧仍为 O(n)；交互式散点图请优先使用 GPU 后端或减少点数。

### 能承载多少数据

以下数据来自引擎的基准测试（Node，类 CI 环境；你的硬件结果会有所不同）：

100 万个点的折线：构建模型和 GPU 绘制项约需 15 毫秒。

10 万个点的散点：构建并执行 1,000 次命中检测约需 13 毫秒。

以相同配置调用 setOptions：约 0.03 毫秒，不重建任何内容；在同一组点上移动提示框：约 0.03 毫秒。

建议：在 GPU 上，数百万个有序点（类型化数组）的折线和面积图仍可流畅交互；散点图在 GPU 上控制在 10 万～50 万个点左右，在 Canvas2D 上控制在 2 万～5 万个点；柱状图和 K 线在可见标记达到几千个以内时仍易于阅读，更多时请先聚合（日 K、月度柱）；热力图可达数万个单元格。

### React 使用建议

保持数据引用稳定：用 useMemo（或在组件外部）构建 series 及其数据，并以它们依赖的数据作为依赖项。新的数据数组意味着新的数据集，需要完整处理一遍。

调用 setOptions 之前会对 props 做浅比较：顶层配置按引用或向下一层比较，每个系列的字段按引用比较。像 yAxis={{ min: 0 }} 或 series={[{ name, data }]} 这样的内联对象没有问题，只要 data 本身稳定，相同的渲染就不产生任何开销。

不要在每次渲染时重新创建类型化数组（在渲染函数中 new Float64Array(…)）：在数据到达时分配，并保存在 state 或 ref 中。

形状图表（饼图、环形图、雷达图、仪表盘、漏斗图、矩形树图）同样会记忆化配置，但每次变化都会播放动画：保持 data、padding 和 palette 稳定，以免重复播放动画。

### 流式更新

追加数据点时，请传入新的数组（或新的类型化数组）并调用 setOptions：变化的系列会以 O(n) 重新规范化，其他系列会被复用。保持一个滑动窗口（例如最近 50,000 个点），让开销有上限。

将样本批量处理，每帧（requestAnimationFrame）或按定时器最多更新一次，而不是每条消息更新一次。对于使用类型化数组的高频数据，可以预先分配更大的缓冲区，并传入已填充部分的 subarray() 视图：新视图是新的引用，但内存得以复用。

### 形状图表还是直角坐标图表

饼图、环形图、玫瑰图、雷达图、仪表盘、漏斗图、矩形树图、桑基图、旭日图、和弦图等形状图表与其他图表使用相同的 GPU 后端（WebGPU → WebGL2 → WebGL → Canvas2D，由 renderer 选项或 setDefaultChartRenderer 选择）：圆弧、多边形和条带被细分为三角形并以 4x MSAA 绘制，非凸填充借助模板缓冲（stencil，非零环绕规则）完成，文字则绘制在图形上方的 2D 画布上。没有 GPU 后端能够启动时回退到 Canvas2D，小程序中（createCanvasShapeChart）也始终使用 Canvas2D。

数据点多、需要缩放和平移或展示实时数据时，选择直角坐标图表（折线、面积、柱状、散点、K 线、热力图）。

展示占比、多维画像、单个 KPI 或层级结构时，选择形状图表——几十到几百个标记。超出这个规模时，对聚合后的数据使用矩形树图或热力图，比成千上万个扇区更易读。一个页面上放很多小的形状图表开销依然很低：在 WebGPU 上它们共享一个设备；在 WebGL 上每个图表占用一个上下文，超过浏览器上限（约 16 个）时，最久未绘制的屏幕外图表会被挂起，滚动回来时再恢复。renderer="canvas2d" 则完全不占用 GPU 上下文。

### 小程序与 React Native

小程序图表 在 canvas type="2d" 上使用 createCanvasChart（形状图表使用 createCanvasShapeChart）：始终是 Canvas2D，且运行在较慢的 JavaScript 引擎上。按像素降采样能让折线保持流畅，但目标应是数万个点而不是数百万个；避免通过 setData 传递大数组（会被序列化），散点图控制在几千个点以内。

在 React Native 上，图表只用 View 绘制，因此图形数量有上限：所有折线合计约 1,200 个点，每个系列 800 个散点（合计 2,000 个），每个系列 600 根柱（合计 1,500 个矩形，每根 K 线计为 2 个，每个热力图单元格计为 1 个），每个面积 200 个竖条。超出预算后，散点按单元格合并、柱按像素列合并——图形整体仍然正确，但细节会丢失；而且数据仍在 JavaScript 中处理，因此请先聚合。

自定义渲染器可以通过 createChartController 和 scenePrimitives 使用相同的预算：scenePrimitives(scene, { maxDots, maxBars, columnWidth, dotCell }) 返回降采样后的图形（默认每个系列 4000 个点和 2000 根柱，列宽 1 px）。

### 高频悬停：同帧合并

通过公开引擎在同一帧发送 240 次交替移动，仅对最终位置做命中检测和提示框渲染。按下、拖动、松开仍走同步交互路径。计数来自实际浏览器，不代表所有数据规模的帧率保证。

运行 240 次移动

指针移动次数

悬停通知次数

提示框渲染次数

事件派发与等待帧（毫秒）

最终命中点

悬停帧合并性能测试

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
