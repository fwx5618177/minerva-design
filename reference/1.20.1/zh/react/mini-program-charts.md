# 小程序图表

minerva-design/charts 中由画布引擎绘制的全部图表——Chart、LineChart、AreaChart、BarChart、HorizontalBarChart、ScatterChart、QuadrantChart、CandlestickChart、HeatmapChart、Sparkline、RangeAreaChart、MixedChart、BubbleChart、HistogramChart、BoxPlotChart、WaterfallChart、GanttChart，以及形状图表 PieChart、DonutChart、RadarChart、GaugeChart、FunnelChart、TreemapChart、SankeyChart、SunburstChart、RadialBarChart、CalendarHeatmap、BulletChart、ChordChart 和 ShapeChart——适用于 Taro、uni-app 与原生微信小程序，绘制在 canvas type="2d" 上，选项与 Web 图表一致。

Package: minerva-design@1.20.1

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### 工作原理

小程序图表使用 Minerva 图表引擎的画布渲染器，把整张图表（坐标轴、数据、图例、提示框、标注）绘制在一个  上。它们接受 minerva-design/charts 中 Web 图表的选项和预设，可用于微信、支付宝、抖音等小程序以及 H5。只打包引擎的 2D 画布部分，不含 WebGPU 或 WebGL 代码。

它们基于 createCanvasChart 与 createCanvasShapeChart 构建；在其他画布宿主中可直接从 minerva-design/charts/core 使用它们（参见图表引擎）。

### Taro（React）

从 minerva-design/taro 引入图表。props 和回调与 Web 组件一致；图表默认占满父元素宽度（width 默认为 100%），height 默认为 320 px。

ref 提供 resetZoom()、getView()、setView(view)、getInstance()（画布图表实例）和 resize()。画布 id 自动生成，可通过 id 指定。

### uni-app（Vue）

从 minerva-design/uni 引入单文件组件。props 与 Web 一致（模板中使用 kebab-case）；height 接受任意 CSS 长度，包括 rpx。更新图表时请替换 series / points（或某个系列的 data 数组）：原地修改的数组不会被重新读取。

事件：hover、point-click、plot-click 和 zoom。QuadrantChart 改为触发 point-click(point, index)、quadrant-click(quadrant, { x, y }) 和 point-drop(point, index, { x, y, quadrant })（监听 point-drop 时点可拖动），并支持放在各象限上方的 topLeft / topRight / bottomLeft / bottomRight 插槽。模板 ref 提供 resetZoom()、getView()、setView(view)、getRenderer()、getInstance() 和 resize()。

### 原生微信小程序

npm install 并在微信开发者工具中构建 npm 后，在 usingComponents 中注册组件（chart、line-chart、area-chart、bar-chart……即每个图表的 kebab-case 名称，见“全部图表组件”）。属性使用 kebab-case，通过 setData 传递；函数（坐标轴格式化、提示框文本）通过 selectComponent 返回实例的 configure() 传入。

事件（event.detail）：所有图表都会触发 hover（{ items, x, xLabel }）、zoom（{ x, y } 可见范围）和 layout（绘图区矩形，px）。系列图表还会触发 pointclick、plotclick（{ x, y }）以及 pointdrag / pointdrop（{ item, x, y }，需 interaction.dragPoints）；quadrant-chart 触发 pointclick（{ point, index }）、quadrantclick（{ quadrant, x, y }）以及 pointdrag / pointdrop（{ point, index, target: { x, y, quadrant } }）。

实例方法：configure({ xAxis: { format }, yAxis: { format }, renderTooltip })（quadrant-chart 为 renderTooltip(point, index)），返回带 \n 换行的文本，或返回 null 隐藏提示框；以及 resize()、resetZoom()、getView()、setView(view)、getPlotRect()、toPixel(x, y) 和 fromPixel(x, y)。类型位于 minerva-design/weapp/types（NativeChartInstance、NativeQuadrantChartEvents…）。

### 属性与事件

所有图表：height（默认 320，数字为 px）、width（默认 100%）、legend、tooltip、crosshair、annotations、interaction、padding、palette、ariaLabel 和 disableScroll。

系列图表（Chart、LineChart、AreaChart、BarChart、HorizontalBarChart、ScatterChart、CandlestickChart、RangeAreaChart、MixedChart、BubbleChart）增加 series、xAxis 和 yAxis，以及对应 Web 组件的属性（area、curve、stacked、percent、labels、yAxis2、stackMode、orientation、minSize / maxSize……）。HeatmapChart、Sparkline、HistogramChart、BoxPlotChart、WaterfallChart 和 GanttChart 接受各自的数据属性（data、values、groups、steps、tasks……）。Chart 接受任意 type 的系列，包括 K 线和热力图。

QuadrantChart 接受四象限设置：points、xDomain、yDomain、xSplit、ySplit、quadrants、xLabel、yLabel、axisLabels、showTicks、reverseX、showLabels、pointSize、name 和 draggable。

事件与 Web 回调对应：悬停、点击点、点击绘图区（点击空白处）和缩放；QuadrantChart 报告点击点（point, index）、点击象限（quadrant, { x, y }）和放下点（point, index, { x, y, quadrant }）。图表不会自行移动点：请更新 points。

### 语言与区域

在 Web 端，图表读取页面语言（）。小程序没有 ：未传 locale 时，文本和数字跟随运行环境的 navigator.language（若存在），否则使用英文（Taro 与 uni-app 的 H5 构建与 Web 一样读取 ）。请为每个图表通过 locale 属性传入应用语言；微信返回的语言形如 zh_CN，把下划线替换为连字符（zh-CN）后数字和日期也会按该语言格式化。

labels 覆盖坐标系图表的内置文本（ChartLabels：K 线的开盘 / 收盘行、箱线图各行、甘特图各行、默认系列名称……），texts 覆盖形状图表的内置文本（ShapeChartLabels：noData、value、share……）。在 HorizontalBarChart 与 WaterfallChart 上，labels 仍是显示数值的布尔值，因此它们的文本只跟随 locale。

未传 locale 时，图表使用最近的 ConfigProvider（原生微信中为 config-provider）的 locale，因此一个 provider 即可本地化整个页面的图表；图表自身的 locale 仍然优先。无障碍名称（aria-label）同样会本地化：英文为 “Chart: Revenue, Costs”，中文为 “图表：营收、成本”，笛卡尔图表由系列名称组成；形状图表以其类型命名，例如 “Pie chart” / “饼图”、“Chord diagram” / “弦图”（仪表盘为 “仪表盘：CPU”）；ariaLabel 可替换它。

修改 locale、labels 或 texts 会重绘图表：用户切换应用语言时重新设置即可（原生微信中使用 setData）。

应用的语言：小程序没有 

函数通过 configure() 传入：弦图刻度的标签

开盘

收盘

暂无流量

应用

网页

商店

### 手势

点击显示提示框并报告该点，手指沿图表拖动可移动高亮，双指缩放，单指平移已缩放的图表，双击重置缩放，点击图例项可隐藏对应系列。可拖动的象限点会跟随手指。H5 和桌面端小程序也支持鼠标。

### 主题

颜色和字体来自外层 ConfigProvider / ThemeProvider（微信中为 config-provider / theme-provider）的 Minerva 令牌：亮色和暗色模式、调色板和自定义令牌主题都会生效，并在 provider 变化时更新；没有 provider 时使用亮色令牌。选项中的颜色可以是 var(--token, fallback) 字符串，--chart-series-1..8 令牌用于设置系列调色板。

### 限制

需要 。无法选择渲染器：不支持 WebGPU 或 WebGL2。

提示框和叠加内容都绘制在画布上：tooltip 的 render / renderTooltip 返回文本，而不是组件。带 React 内容的 renderTooltip 和 quadrantContent 仅在 Web 和 React Native 中可用。uni-app 可通过插槽在象限上方放置视图；微信中可使用 layout 事件和 toPixel() 定位自己的视图。

不支持滚轮缩放（uni-app H5 的 Ctrl / ⌘ + 滚轮除外），也不支持键盘导航。

当手指在图表上平移、缩放或拖动时页面不应滚动，请设置 disableScroll（微信中为 disable-scroll）；在 Taro 和 uni-app 中，可拖动的四象限图默认开启。

微信的属性通过 setData 传递：数据必须是 JSON（时间轴使用时间戳而不是 Date，不支持类型化数组），且每次更新都会复制数据，因此超大数据集比 Web 慢。

在微信中组件无法得知是否绑定了 pointdrop 处理函数：需要显式设置 draggable 才能拖动。

挂载时处于隐藏状态的图表测得的尺寸为 0 px：显示后请调用 resize()（Taro 会重试约两秒）。

各平台可用的组件列于平台支持；如需在移动端使用 React 富文本提示框，请使用 React Native 图表。

### 全部图表组件

minerva-design/charts 中由画布引擎绘制的每个图表，在 Taro 与 uni-app 上都有同名组件，在原生微信小程序上有对应的 kebab-case 组件（AreaChart → area-chart）。它们的属性映射到与 Web 组件相同的引擎预设，因此图表在 Web 与小程序中的外观和行为一致。

分组

Taro 与 uni-app

微信（usingComponents）

坐标轴图表

形状图表

小程序不支持

属性与 Web 组件一致：AreaChart 接受 curve、stacked 和 percent；HorizontalBarChart 接受 stacked、percent 和 labels；HistogramChart 接受 values 和 bins；BoxPlotChart 接受 groups 或 series；WaterfallChart 接受 steps；GanttChart 接受 tasks、today 和 todayLabel；HeatmapChart 接受 data 和分类；Sparkline 接受 data 和 type（默认高 48 px）。

以文件夹名注册所用组件。Date 对象无法经过 setData：请传时间戳（甘特图任务、时间轴）。函数选项通过 configure() 传入：format（heatmap-chart、sparkline、waterfall-chart）、formatBin（histogram-chart）、formatProgress（gantt-chart）、坐标轴格式和 renderTooltip。

SunburstChart 轻触父节点即可放大，轻触中心返回上一级：Taro 使用 onDrill，uni-app 与微信使用 drill 事件（bind:drill），实例上有 drill(path) 与 getDrillPath()；设置 drillPath 可使下钻受控。

TradingChart、DepthChart、OrderBook、OrderBookHeatmap、TimeAndSales 以及 3D 图表（Scatter3DChart、Surface3DChart、Bar3DChart、Line3DChart）需要 DOM 与 WebGPU / WebGL，因此没有小程序组件。请改用 web-view 页面展示 Web 组件。

Web 组件的预设选项同样可用：WaterfallChart 的 connector（true、false 或 { color, dash, width }）、HeatmapChart 的 colorScale（"sequential"、"diverging" 或颜色数组）与 colorMidpoint、GanttChart 的 dependenciesName、dependencyArrows（从前置任务画出的折线箭头，默认开启）与 dependencyColor（配合任务的 dependencies）、BoxPlotChart 的 outlierShape 与 outlierSize。

### K 线、热力图、曲线与堆叠

系列会原样传给引擎，因此新的系列功能在所有小程序图表上都可用：通过 Chart 使用 type "candlestick"（数据点为 { x, open, high, low, y }，y 为收盘价）和 type "heatmap"（单元格为 { x, y, value }），在折线和面积系列上设置 curve: "smooth" 或 "step" 以及 stack，用 showLabels 显示柱的数值，并为每根柱单独设置 color。

minerva-design/charts/core 中的 heatmapChartOptions({ data, xCategories, yCategories }) 会返回热力图的系列、类目坐标轴以及图例、提示框和交互设置：把它们传给 Chart 即可。

AreaChart、CandlestickChart、HeatmapChart、Sparkline 等具名组件现已在所有小程序平台提供（见“全部图表组件”）；需要混合多种类型时仍可使用带 type 系列的 Chart。在原生微信小程序中，系列通过 setData 传递，因此必须是纯 JSON（不能为单个系列传 format 函数：坐标轴格式、数值格式和提示框请用 configure()）。

### 形状图表

PieChart、DonutChart、RadarChart、GaugeChart、FunnelChart、TreemapChart、SankeyChart、SunburstChart、RadialBarChart、CalendarHeatmap 和 BulletChart 接受 Web 形状图表的属性（data、innerRadius、centerValue、indicators、bands、sort、headers、links、drillPath、range、ranges……，以及 palette、legend、tooltip、format、percentFormat、hidden、animation、padding 和 ariaLabel），并通过 createCanvasShapeChart 在一个  上绘制标签、图例与提示框。ShapeChart 接受任意形状类型的引擎选项（带 type 的 options），因此引擎新增的类型无需新组件。轻触可高亮图形并显示提示框，轻触图例项可将其隐藏；默认高度与 Web 组件一致（GaugeChart 240 px，RadialBarChart 300 px，SankeyChart 与 SunburstChart 360 px，CalendarHeatmap 与 BulletChart 按数据计算，其余 320 px）。

从 minerva-design/taro 导入。回调为 onHover、onClick、onToggle（配合 hidden 实现受控图例），SunburstChart 与 ShapeChart 还有 onDrill；ref 提供 getInstance()（toggle、getHidden、clearHover、drill、getDrillPath……）和 resize()。提示框是画布文本：tooltip.render 可返回字符串，不支持 renderTooltip。

从 minerva-design/uni（或 minerva-design/uni/PieChart.vue……）导入。事件为 hover、click、toggle 和 drill（旭日图）；height 支持 rpx；模板 ref 提供 getInstance() 和 resize()。替换 data 数组即可更新图表。

在 usingComponents 中注册 pie-chart、donut-chart、radar-chart、gauge-chart、funnel-chart、treemap-chart、sankey-chart、sunburst-chart、radial-bar-chart、calendar-heatmap、bullet-chart 或 shape-chart。属性使用 kebab-case 的 JSON 值；format、percentFormat 与提示框文本（renderTooltip）通过 configure() 传入。

事件（event.detail）：hover（高亮的图形：index、name、value、percent、color、path；取消高亮时 index 为 -1）、click（被轻触的图形）、toggle（{ index, hidden, hiddenIndexes }）和 drill（{ path }，旭日图）。方法：configure(config)、resize()、toggle(index)、getHidden()、clearHover()、drill(path) 和 getDrillPath()。类型：minerva-design/weapp/types 中的 NativeShapeChartInstance、NativeShapeChartEvents 以及各 *ChartProperties 接口。

在自己的画布上使用引擎

在任意 2D 画布上用 createCanvasShapeChart（以及 createCanvasChart）绘图。原生微信项目在“构建 npm”后 require("minerva-design/charts/core")：包的小程序目录以 charts/core.js 提供不依赖 DOM 的引擎，图表组件共用同一模块（不额外增加体积）。Taro 与 uni-app 中从 minerva-design/charts/core 导入。

转发触摸事件（小程序画布的触点带有相对画布的 x / y；H5 上用 clientX / clientY 减去画布位置），尺寸变化时调用 resize(width, height)，页面卸载时调用 destroy()。主题是普通值：在 theme.variables 中传入所需的 Minerva CSS 变量。

ChordChart 绘制弦图：分组（名称或 { name, color }）沿圆周排列，弦带来自矩阵或连接列表，支持有向箭头、排序、按来源 / 目标 / 渐变着色以及数值刻度——与 Web 组件的属性一致。默认高度 420 px；在原生微信中，tickFormat 通过 configure() 传入。

```tsx
import { useState } from "react";
import { Text, View } from "@tarojs/components";
import {
  LineChart,
  QuadrantChart,
  miniTokenClassNames,
  type QuadrantPoint,
} from "minerva-design/taro";
import "minerva-design/tokens.mini.css";
import "minerva-design/taro/style.css";

export default function Dashboard() {
  const [picked, setPicked] = useState("");
  const [tasks, setTasks] = useState<QuadrantPoint[]>([
    { x: 8, y: 9, label: "Release" },
    { x: 3, y: 7, label: "Planning" },
  ]);

  return (
    <View className={miniTokenClassNames()}>
      <LineChart
        height={240}
        series={[{ name: "Sales", data: [12, 18, 9, 24] }]}
        xAxis={{ title: "Month" }}
        tooltip={{ render: (event) => `Sales: ${event.items[0]?.y}` }}
        onPointClick={(event) => setPicked(event.xLabel)}
      />
      <Text>{picked}</Text>
      <QuadrantChart
        points={tasks}
        reverseX
        showTicks={false}
        quadrants={{ topLeft: { label: "Do first" } }}
        axisLabels={{ top: "Important", left: "Urgent" }}
        onQuadrantClick={(quadrant, at) =>
          setTasks((list) => [...list, { ...at, label: "New task" }])
        }
        onPointDrop={(task, index, target) =>
          setTasks((list) =>
            list.map((p, i) => (i === index ? { ...p, x: target.x, y: target.y } : p)),
          )
        }
      />
    </View>
  );
}
```

```html
<script setup lang="ts">
import { ref } from "vue";
import {
  LineChart,
  QuadrantChart,
  miniTokenClassNames,
  type ChartHandle,
  type ChartHoverEvent,
  type QuadrantDropTarget,
  type QuadrantPoint,
} from "minerva-design/uni";
import "minerva-design/tokens.mini.css";
import "minerva-design/uni/style.css";

const series = ref([{ name: "Sales", data: [12, 18, 9, 24] }]);
const tasks = ref<QuadrantPoint[]>([{ x: 8, y: 9, label: "Release" }]);
const picked = ref("");
const chart = ref<ChartHandle>(); // chart.value?.resize(), resetZoom()...

const show = (event: ChartHoverEvent) => (picked.value = event.xLabel);
function move(point: QuadrantPoint, index: number, target: QuadrantDropTarget) {
  // replace the array: arrays mutated in place are not read again
  tasks.value = tasks.value.map((p, i) =>
    i === index ? { ...p, x: target.x, y: target.y } : p,
  );
}
function add() {
  tasks.value = [...tasks.value, { x: 7.5, y: 7.5, label: "New task" }];
}
</script>

<template>
  <view :class="miniTokenClassNames()">
    <LineChart ref="chart" :series="series" height="480rpx" area @point-click="show" />
    <text>{{ picked }}</text>
    <QuadrantChart
      :points="tasks"
      :quadrants="{ topRight: { label: 'Do first' } }"
      :axis-labels="{ top: 'Important' }"
      @point-drop="move"
    >
      <template #topRight>
        <button size="mini" @click="add">+</button>
      </template>
    </QuadrantChart>
  </view>
</template>
```

```json
{
  "usingComponents": {
    "mn-line-chart": "minerva-design/line-chart/index",
    "mn-quadrant-chart": "minerva-design/quadrant-chart/index"
  }
}
```

```html
<mn-line-chart
  id="visits"
  series="{{series}}"
  x-axis="{{xAxis}}"
  area
  height="240"
  bind:pointclick="onPoint"
/>
<mn-quadrant-chart
  points="{{tasks}}"
  quadrants="{{regions}}"
  axis-labels="{{ends}}"
  draggable
  disable-scroll
  bind:pointdrop="onDrop"
  bind:quadrantclick="onQuadrant"
/>
```

```js
Page({
  data: {
    series: [{ name: "Visits", data: [["Mon", 3], ["Tue", 5], ["Wed", 4]] }],
    xAxis: { type: "category" },
    tasks: [{ x: 8, y: 9, label: "Release" }],
    regions: { topRight: { label: "Do first" } },
    ends: { top: "Important" },
  },
  onReady() {
    // functions cannot go through setData: pass them with configure()
    this.selectComponent("#visits").configure({
      yAxis: { format: (value) => `${value}k` },
      renderTooltip: (event) => `${event.xLabel}\n${event.items[0].y}k visits`,
    });
  },
  onPoint(event) {
    wx.showToast({ title: event.detail.xLabel, icon: "none" });
  },
  onDrop(event) {
    const { index, target } = event.detail;
    // the chart does not move points: update them
    this.setData({
      [`tasks[${index}].x`]: target.x,
      [`tasks[${index}].y`]: target.y,
    });
  },
  onQuadrant(event) {
    const { x, y } = event.detail;
    this.setData({ tasks: [...this.data.tasks, { x, y, label: "New task" }] });
  },
});
```

```tsx
import { useState } from "react";
import { Text, View } from "@tarojs/components";
import {
  AreaChart,
  GanttChart,
  Sparkline,
  SunburstChart,
} from "minerva-design/taro";

const day = 86_400_000;
const start = Date.UTC(2026, 2, 2);

export default function Overview() {
  const [path, setPath] = useState<string[]>([]);
  return (
    <View>
      <Sparkline data={[42, 47, 45, 52, 58, 61]} type="area" />
      <AreaChart
        percent
        series={[
          { name: "Web", data: [["Q1", 42], ["Q2", 48], ["Q3", 51]] },
          { name: "App", data: [["Q1", 58], ["Q2", 52], ["Q3", 49]] },
        ]}
      />
      <GanttChart
        today={start + 10 * day}
        tasks={[
          { name: "Design", start, end: start + 12 * day, progress: 1 },
          { name: "Build", start: start + 9 * day, end: start + 30 * day, progress: 0.4 },
          { name: "Launch", start: start + 32 * day, milestone: true },
        ]}
      />
      <SunburstChart
        data={[
          { name: "Photos", children: [{ name: "2025", value: 22 }, { name: "2026", value: 10 }] },
          { name: "Apps", value: 18 },
        ]}
        onDrill={(event) => setPath(event.path)}
      />
      <Text>{path.join(" / ")}</Text>
    </View>
  );
}
```

```html
<script setup lang="ts">
import { ref } from "vue";
import {
  HeatmapChart,
  SankeyChart,
  SunburstChart,
  WaterfallChart,
  type ShapeDrillEvent,
} from "minerva-design/uni";

const cells = ref([
  { x: "Mon", y: "AM", value: 12 },
  { x: "Mon", y: "PM", value: 30 },
  { x: "Tue", y: "AM", value: 18 },
  { x: "Tue", y: "PM", value: 26 },
]);
const steps = ref([
  { label: "Revenue", value: 420 },
  { label: "Costs", value: -260 },
  { label: "Profit", kind: "total" as const },
]);
const links = ref([
  { source: "Ads", target: "Site", value: 60 },
  { source: "Search", target: "Site", value: 40 },
  { source: "Site", target: "Sign-up", value: 30 },
]);
const folders = ref([
  { name: "Photos", children: [{ name: "2025", value: 22 }, { name: "2026", value: 10 }] },
  { name: "Apps", value: 18 },
]);
const path = ref<string[]>([]);
const onDrill = (event: ShapeDrillEvent) => (path.value = event.path);
</script>

<template>
  <HeatmapChart :data="cells" height="400rpx" />
  <WaterfallChart :steps="steps" orientation="horizontal" />
  <SankeyChart :links="links" />
  <SunburstChart :data="folders" @drill="onDrill" />
  <text>{{ path.join(" / ") }}</text>
</template>
```

```json
{
  "usingComponents": {
    "mn-gantt-chart": "minerva-design/gantt-chart/index",
    "mn-sunburst-chart": "minerva-design/sunburst-chart/index",
    "mn-bullet-chart": "minerva-design/bullet-chart/index"
  }
}
```

```html
<mn-gantt-chart id="plan" tasks="{{tasks}}" today="{{today}}" />
<mn-sunburst-chart data="{{folders}}" bind:drill="onDrill" />
<text>{{path}}</text>
<mn-bullet-chart data="{{kpis}}" ranges="{{ranges}}" />
```

```js
const day = 86400000;
const start = Date.UTC(2026, 2, 2);

Page({
  data: {
    // timestamps: Date objects do not survive setData
    tasks: [
      { name: "Design", start, end: start + 12 * day, progress: 1 },
      { name: "Build", start: start + 9 * day, end: start + 30 * day, progress: 0.4 },
    ],
    today: start + 10 * day,
    folders: [
      { name: "Photos", children: [{ name: "2025", value: 22 }, { name: "2026", value: 10 }] },
      { name: "Apps", value: 18 },
    ],
    path: "",
    kpis: [{ name: "Revenue", value: 270, target: 250 }],
    ranges: [150, 225, 300],
  },
  onReady() {
    this.selectComponent("#plan").configure({
      formatProgress: (share) => `${Math.round(share * 100)}%`,
    });
  },
  onDrill(event) {
    this.setData({ path: event.detail.path.join(" / ") });
  },
});
```

```tsx
import { BarChart, Chart, LineChart } from "minerva-design/taro";
import { heatmapChartOptions } from "minerva-design/charts/core";

const prices = [
  {
    name: "ACME",
    type: "candlestick",
    data: [
      { x: 1, open: 102, high: 108, low: 99, y: 106 },
      { x: 2, open: 106, high: 107, low: 97, y: 98 },
      { x: 3, open: 98, high: 104, low: 96, y: 103 },
    ],
  },
] as const;

const load = heatmapChartOptions({
  data: [
    { x: "Mon", y: "AM", value: 12 },
    { x: "Mon", y: "PM", value: 30 },
    { x: "Tue", y: "AM", value: 18 },
    { x: "Tue", y: "PM", value: 26 },
  ],
});

export function Charts() {
  return (
    <>
      <Chart series={prices} height={220} />
      <Chart
        series={load.series}
        xAxis={load.xAxis}
        yAxis={load.yAxis}
        legend={load.legend}
        tooltip={load.tooltip}
        interaction={load.interaction}
        height={200}
      />
      {/* curve and stack are set on each series */}
      <LineChart
        area
        series={[
          { name: "Web", data: [20, 24, 30], curve: "smooth", stack: "users" },
          { name: "App", data: [12, 18, 17], curve: "smooth", stack: "users" },
        ]}
      />
      <BarChart
        series={[
          {
            name: "Orders",
            showLabels: true,
            data: [
              { x: "Q1", y: 128 },
              { x: "Q2", y: 212, color: "#16a34a" },
            ],
          },
        ]}
      />
    </>
  );
}
```

```tsx
import { useState } from "react";
import { Text, View } from "@tarojs/components";
import {
  DonutChart,
  GaugeChart,
  ShapeChart,
  type ShapeHoverEvent,
} from "minerva-design/taro";

const plans = [
  { name: "Free", value: 5400 },
  { name: "Pro", value: 2100 },
  { name: "Team", value: 860 },
];

export default function Plans() {
  const [picked, setPicked] = useState<ShapeHoverEvent | null>(null);
  const [hidden, setHidden] = useState<number[]>([]);
  return (
    <View>
      <DonutChart
        data={plans}
        height={260}
        centerValue="8.4k"
        centerLabel="users"
        percentFormat={(share) => `${Math.round(share * 100)}%`}
        hidden={hidden}
        onToggle={(event) => setHidden(event.hiddenIndexes)}
        onClick={setPicked}
      />
      <Text>{picked ? `${picked.name}: ${picked.value}` : "Tap a plan"}</Text>
      <GaugeChart value={72} label="Storage" height={200} />
      {/* any shape type of the engine, from its options */}
      <ShapeChart
        options={{
          type: "funnel",
          data: [
            { name: "Visit", value: 1200 },
            { name: "Sign up", value: 380 },
            { name: "Paid", value: 95 },
          ],
        }}
      />
    </View>
  );
}
```

```html
<script setup lang="ts">
import { ref } from "vue";
import {
  PieChart,
  RadarChart,
  type ShapeChartHandle,
  type ShapeHoverEvent,
} from "minerva-design/uni";

const sources = ref([
  { name: "Search", value: 48 },
  { name: "Direct", value: 23 },
  { name: "Social", value: 16 },
]);
const picked = ref("");
const radar = ref<ShapeChartHandle>(); // radar.value?.getInstance()?.toggle(0)
const pick = (slice: ShapeHoverEvent) => (picked.value = slice.name);
</script>

<template>
  <PieChart :data="sources" labels="inside" height="520rpx" @click="pick" />
  <text>{{ picked }}</text>
  <RadarChart
    ref="radar"
    :indicators="[{ name: 'Speed' }, { name: 'Power' }, { name: 'Range' }]"
    :series="[{ name: 'Model A', values: [3, 4, 2] }]"
    shape="circle"
  />
</template>
```

```json
{
  "usingComponents": {
    "mn-pie-chart": "minerva-design/pie-chart/index",
    "mn-gauge-chart": "minerva-design/gauge-chart/index",
    "mn-shape-chart": "minerva-design/shape-chart/index"
  }
}
```

```html
<mn-pie-chart
  id="sources"
  data="{{sources}}"
  inner-radius="{{0.6}}"
  center-value="87"
  bind:click="onSlice"
  bind:toggle="onToggle"
/>
<mn-gauge-chart value="{{cpu}}" label="CPU" bands="{{bands}}" needle />
<mn-shape-chart options="{{treemap}}" height="300" />
```

```js
Page({
  data: {
    sources: [
      { name: "Search", value: 48 },
      { name: "Direct", value: 23 },
      { name: "Social", value: 16 },
    ],
    cpu: 64,
    bands: [
      { to: 70, color: "var(--success-color)" },
      { to: 100, color: "var(--danger-color)" },
    ],
    // shape-chart: any shape type, options without functions
    treemap: {
      type: "treemap",
      data: [
        { name: "Photos", value: 38 },
        { name: "Apps", children: [{ name: "Games", value: 14 }, { name: "Maps", value: 3 }] },
      ],
    },
    hiddenCount: 0,
  },
  onReady() {
    // functions cannot go through setData: pass them with configure()
    this.selectComponent("#sources").configure({
      percentFormat: (share) => `${Math.round(share * 100)}%`,
      renderTooltip: (slice) => `${slice.name}\n${slice.value} visits`,
    });
  },
  onSlice(event) {
    wx.showToast({ title: event.detail.name, icon: "none" });
  },
  onToggle(event) {
    this.setData({ hiddenCount: event.detail.hiddenIndexes.length });
  },
});
```

```js
// pages/plans/index.js, with <canvas type="2d" id="plans" bindtouchstart="onTouchStart" ...>
const { createCanvasShapeChart } = require("minerva-design/charts/core");

Page({
  onReady() {
    wx.createSelectorQuery()
      .select("#plans")
      .fields({ node: true, size: true })
      .exec(([res]) => {
        this.chart = createCanvasShapeChart({
          canvas: res.node,
          width: res.width,
          height: res.height,
          pixelRatio: wx.getWindowInfo().pixelRatio,
          options: {
            type: "pie",
            innerRadius: 0.62,
            data: [
              { name: "Free", value: 5400 },
              { name: "Pro", value: 2100 },
            ],
          },
          // plain values of the Minerva CSS variables
          theme: { variables: { "--primary-color": "#4f46e5" } },
        });
        this.chart.on("click", (slice) =>
          wx.showToast({ title: slice.name, icon: "none" }),
        );
      });
  },
  // mini-program canvas touches carry x / y relative to the canvas
  onTouchStart(e) { this.chart?.touchStart(e.changedTouches); },
  onTouchMove(e) { this.chart?.touchMove(e.touches); },
  onTouchEnd(e) { this.chart?.touchEnd(e.changedTouches); },
  onTouchCancel(e) { this.chart?.touchCancel(e.changedTouches); },
  onUnload() { this.chart?.destroy(); },
});
```

```json
{
  "usingComponents": {
    "mn-candlestick-chart": "minerva-design/candlestick-chart/index",
    "mn-chord-chart": "minerva-design/chord-chart/index"
  }
}
```

```html
<mn-candlestick-chart series="{{candles}}" locale="{{locale}}" labels="{{labels}}" />
<mn-chord-chart
  id="flows"
  groups="{{groups}}"
  matrix="{{matrix}}"
  locale="{{locale}}"
  texts="{{texts}}"
/>
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
