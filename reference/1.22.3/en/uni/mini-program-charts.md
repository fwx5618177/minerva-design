# Mini-program charts

Every chart of minerva-design/charts drawn by the canvas engine — Chart, LineChart, AreaChart, BarChart, HorizontalBarChart, ScatterChart, QuadrantChart, CandlestickChart, HeatmapChart, Sparkline, RangeAreaChart, MixedChart, BubbleChart, HistogramChart, BoxPlotChart, WaterfallChart, GanttChart and the shape charts PieChart, DonutChart, RadarChart, GaugeChart, FunnelChart, TreemapChart, SankeyChart, SunburstChart, RadialBarChart, CalendarHeatmap, BulletChart, ChordChart and ShapeChart — for Taro, uni-app and native WeChat mini-programs, drawn on a canvas type="2d" with the same options as the web charts.

Package: minerva-design@1.22.3

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### How they work

The mini-program charts draw the whole chart (axes, data, legend, tooltip, annotations) on one  with the canvas renderer of the Minerva chart engine. They take the options and presets of the web charts of minerva-design/charts, and work on WeChat, Alipay, ByteDance and other mini-programs as well as H5. Only the 2D canvas part of the engine is bundled: no WebGPU or WebGL code.

They are built on createCanvasChart and createCanvasShapeChart; use them directly from minerva-design/charts/core for another canvas host (see the Chart engine).

### Taro (React)

Import the charts from minerva-design/taro. Props and callbacks are those of the web components; the chart fills the width of its parent (width defaults to 100%) and height defaults to 320 px.

ref exposes resetZoom(), getView(), setView(view), getInstance() (the canvas chart) and resize(). The canvas id is generated; pass id to set it.

### uni-app (Vue)

Import the single-file components from minerva-design/uni. Props are the web props (kebab-case in templates); height accepts any CSS length, rpx included. Replace series / points (or a series' data array) to update a chart: arrays mutated in place are not read again.

Events: hover, point-click, plot-click and zoom. QuadrantChart emits point-click(point, index), quadrant-click(quadrant, { x, y }) and point-drop(point, index, { x, y, quadrant }) instead (dots are draggable when a point-drop listener is set), and accepts topLeft / topRight / bottomLeft / bottomRight slots placed over the quadrants. A template ref exposes resetZoom(), getView(), setView(view), getRenderer(), getInstance() and resize().

### Native WeChat mini-program

After npm install and Build npm in WeChat DevTools, register the components (chart, line-chart, area-chart, bar-chart… — the kebab-case name of each chart, see All chart components) in usingComponents. Properties are kebab-case and go through setData; functions (axis formats, tooltip text) are passed with configure() on the instance returned by selectComponent.

Events (event.detail): every chart emits hover ({ items, x, xLabel }), zoom ({ x, y } visible ranges) and layout (plot rectangle in px). Series charts also emit pointclick, plotclick ({ x, y }) and pointdrag / pointdrop ({ item, x, y }, with interaction.dragPoints); quadrant-chart emits pointclick ({ point, index }), quadrantclick ({ quadrant, x, y }) and pointdrag / pointdrop ({ point, index, target: { x, y, quadrant } }).

Instance methods: configure({ xAxis: { format }, yAxis: { format }, renderTooltip }) (quadrant-chart: renderTooltip(point, index)), returning text with \n line breaks or null to hide the tooltip; resize(), resetZoom(), getView(), setView(view), getPlotRect(), toPixel(x, y) and fromPixel(x, y). Types are in minerva-design/weapp/types (NativeChartInstance, NativeQuadrantChartEvents...).

### Props and events

Every chart: height (default 320, numbers are px), width (default 100%), legend, tooltip, crosshair, annotations, interaction, padding, palette, ariaLabel and disableScroll.

The series charts (Chart, LineChart, AreaChart, BarChart, HorizontalBarChart, ScatterChart, CandlestickChart, RangeAreaChart, MixedChart, BubbleChart) add series, xAxis and yAxis, plus the props of their web component (area, curve, stacked, percent, labels, yAxis2, stackMode, orientation, minSize / maxSize…). HeatmapChart, Sparkline, HistogramChart, BoxPlotChart, WaterfallChart and GanttChart take their data props (data, values, groups, steps, tasks…). Chart takes series of any type, candlestick and heatmap included.

QuadrantChart takes the quadrant settings: points, xDomain, yDomain, xSplit, ySplit, quadrants, xLabel, yLabel, axisLabels, showTicks, reverseX, showLabels, pointSize, name and draggable.

Events mirror the web callbacks: hover, point click, plot click (a tap on the empty plot) and zoom; QuadrantChart reports point click (point, index), quadrant click (quadrant, { x, y }) and point drop (point, index, { x, y, quadrant }). The chart never moves points itself: update points.

### Language and locale

On the web, the charts read the page language (). Mini-programs have no : without a locale, the texts and numbers follow navigator.language when the runtime has one, else English (Taro and uni-app H5 builds read  like the web). Pass the app language with the locale prop of every chart; WeChat reports languages such as zh_CN, so replace the underscore with a hyphen (zh-CN) to format the numbers and dates too.

labels overrides built-in texts of the series charts (ChartLabels: the open / close rows of the candles, the box plot rows, the Gantt rows, the default series names…) and texts those of the shape charts (ShapeChartLabels: noData, value, share…). On HorizontalBarChart and WaterfallChart, labels stays the boolean that writes the values, so their texts follow locale only.

Without a locale prop, the charts use the locale of the closest ConfigProvider (config-provider on native WeChat), so one provider localizes every chart of a page; a locale on the chart still wins. The accessible name (aria-label) is localized too: “Chart: Revenue, Costs” in English, “图表：营收、成本” in Chinese, built from the series of a cartesian chart; a shape chart is named by its type, e.g. “Pie chart” / “饼图”, “Chord diagram” / “弦图” (a gauge: “Gauge: CPU”); ariaLabel replaces it.

Changing locale, labels or texts redraws the chart: set them again (setData on native WeChat) when the user switches the language of the app.

The language of the app: mini-programs have no 

Functions go through configure(): the labels of the chord ticks

Open

Close

No flows yet

Apps

Web

Store

### Gestures

A tap shows the tooltip and reports the point, a finger dragged along the chart scrubs the highlight, two fingers pinch-zoom, one finger pans a zoomed chart, a double tap resets the zoom and a tap on a legend entry hides its series. Draggable quadrant dots follow the finger. On H5 and desktop mini-programs the mouse works too.

### Theming

Colors and fonts come from the Minerva tokens of the surrounding ConfigProvider / ThemeProvider (config-provider / theme-provider on WeChat): light and dark modes, palettes and custom token themes apply and are picked up when the provider changes; without a provider the light tokens are used. Colors in options may be var(--token, fallback) strings, and the --chart-series-1..8 tokens set the series palette.

### Limitations

A  is required. There is no renderer choice: no WebGPU or WebGL2.

Tooltips and overlays are drawn on the canvas: tooltip render / renderTooltip return text, not components. renderTooltip and quadrantContent with React content exist only on the web and in React Native. uni-app places views over the quadrants with slots; on WeChat use the layout event and toPixel() to position your own views.

No wheel zoom (except Ctrl / ⌘ + wheel on uni-app H5) and no keyboard navigation.

Set disableScroll (disable-scroll on WeChat) when the page must not scroll while a finger pans, pinches or drags on the chart; it is on by default for draggable quadrant charts on Taro and uni-app.

WeChat properties go through setData: data must be JSON (timestamps instead of Date on time axes, no typed arrays) and every update copies it, so very large data sets are slower than on the web.

On WeChat a component cannot tell whether a pointdrop handler is bound: set draggable explicitly to enable dragging.

A chart hidden when it mounts measures 0 px: call resize() once it is visible (Taro retries for about two seconds).

The components available on each platform are listed in Platform support; for rich React tooltips on mobile, use the React Native charts.

### All chart components

Every chart of minerva-design/charts that the canvas engine draws has a component of the same name on Taro and uni-app, and a kebab-case component on native WeChat (AreaChart → area-chart). Their props are mapped to the same engine presets as the web components, so a chart looks and behaves the same on the web and in a mini-program.

Group

Taro and uni-app

WeChat (usingComponents)

Axes

Shapes

Not on mini-programs

Props mirror the web components: AreaChart takes curve, stacked and percent; HorizontalBarChart stacked, percent and labels; HistogramChart values and bins; BoxPlotChart groups or series; WaterfallChart steps; GanttChart tasks, today and todayLabel; HeatmapChart data and the categories; Sparkline data and type (48 px high by default).

Register the components you use under their folder name. Dates do not survive setData: pass timestamps (gantt tasks, time axes). Function options go through configure(): format (heatmap-chart, sparkline, waterfall-chart), formatBin (histogram-chart), formatProgress (gantt-chart), the axis formats and renderTooltip.

SunburstChart zooms into a parent on a tap and back up on the center: onDrill on Taro, the drill event on uni-app and WeChat (bind:drill), drill(path) and getDrillPath() on the instance; set drillPath to make the drill-down controlled.

TradingChart, DepthChart, OrderBook, OrderBookHeatmap, TimeAndSales and the 3D charts (Scatter3DChart, Surface3DChart, Bar3DChart, Line3DChart) need a DOM and WebGPU / WebGL: they have no mini-program component. Show the web component in a web-view page instead.

The preset options of the web components pass through: WaterfallChart connector (true, false or { color, dash, width }), HeatmapChart colorScale ("sequential", "diverging" or colors) and colorMidpoint, GanttChart dependenciesName, dependencyArrows (elbow arrows from every predecessor, on by default) and dependencyColor (with the dependencies of the tasks), BoxPlotChart outlierShape and outlierSize.

### Candlesticks, heatmaps, curves and stacks

Series are handed to the engine as they are, so the new series features work on every mini-program chart: type "candlestick" (points { x, open, high, low, y }, y being the close) and type "heatmap" (cells { x, y, value }) through Chart, curve: "smooth" or "step" and stack on line and area series, showLabels for the values of bars, and a color per bar.

heatmapChartOptions({ data, xCategories, yCategories }) from minerva-design/charts/core returns the series, the category axes and the legend, tooltip and interaction settings of a heatmap: pass them to Chart.

The named components AreaChart, CandlestickChart, HeatmapChart, Sparkline and the others now exist on every mini-program (see All chart components); Chart with typed series remains useful to mix types. On native WeChat, series go through setData, so they must be plain JSON (no format function per series: use configure() for the axis formats, the value formats and the tooltip).

### Shape charts

PieChart, DonutChart, RadarChart, GaugeChart, FunnelChart, TreemapChart, SankeyChart, SunburstChart, RadialBarChart, CalendarHeatmap and BulletChart take the props of the web shape charts (data, innerRadius, centerValue, indicators, bands, sort, headers, links, drillPath, range, ranges…, plus palette, legend, tooltip, format, percentFormat, hidden, animation, padding and ariaLabel) and draw the labels, the legend and the tooltip on one  with createCanvasShapeChart. ShapeChart takes the engine options of any shape type (options with a type), so a type added to the engine needs no new component. A tap highlights a mark and shows its tooltip, a tap on a legend entry hides it; the default heights are those of the web components (GaugeChart 240 px, RadialBarChart 300 px, SankeyChart and SunburstChart 360 px, CalendarHeatmap and BulletChart from the data, the others 320 px).

Import them from minerva-design/taro. The callbacks are onHover, onClick, onToggle (with hidden for a controlled legend) and onDrill on SunburstChart and ShapeChart; ref exposes getInstance() (toggle, getHidden, clearHover, drill, getDrillPath…) and resize(). Tooltips are canvas text: tooltip.render may return a string, there is no renderTooltip.

Import them from minerva-design/uni (or minerva-design/uni/PieChart.vue…). The events are hover, click, toggle and drill (sunburst); height accepts rpx; a template ref exposes getInstance() and resize(). Replace the data arrays to update a chart.

Register pie-chart, donut-chart, radar-chart, gauge-chart, funnel-chart, treemap-chart, sankey-chart, sunburst-chart, radial-bar-chart, calendar-heatmap, bullet-chart or shape-chart in usingComponents. Properties are kebab-case JSON values; format, percentFormat and the tooltip text (renderTooltip) go through configure().

Events (event.detail): hover (the highlighted mark: index, name, value, percent, color, path; index is -1 when cleared), click (a tapped mark), toggle ({ index, hidden, hiddenIndexes }) and drill ({ path }, sunburst). Methods: configure(config), resize(), toggle(index), getHidden(), clearHover(), drill(path) and getDrillPath(). Types: NativeShapeChartInstance, NativeShapeChartEvents and the *ChartProperties interfaces of minerva-design/weapp/types.

The engine on your own canvas

createCanvasShapeChart (and createCanvasChart) draw on any 2D canvas. In native WeChat projects, require("minerva-design/charts/core") after Build npm: the mini-program folder of the package ships the DOM-free engine as charts/core.js, a module the chart components share (no extra size). In Taro and uni-app, import it from minerva-design/charts/core.

Forward the touch events (mini-program canvas touches carry x / y relative to the canvas; on H5, subtract the canvas position from clientX / clientY), call resize(width, height) when the size changes and destroy() when the page unloads. The theme is plain values: pass the Minerva CSS variables you need in theme.variables.

ChordChart draws a chord diagram: groups (names or { name, color }) placed around a circle and ribbons from a matrix or a list of links, directed with arrows, sorted, colored by source, target or a gradient, with value ticks — the props of the web component. It is 420 px high by default; on native WeChat, pass tickFormat with configure().

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
