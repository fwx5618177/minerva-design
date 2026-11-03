# Chart performance

How the chart engine stays fast with millions of points, with live showcases: renderer selection and fallback, data formats, what scales with the visible range, decimation, hit testing, React and streaming tips, and the budgets of mini-programs and React Native.

Package: minerva-design@1.20.0

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Overview

The engine does the expensive work once per data set and keeps every later step proportional to what is on screen. Data arrays are normalized into Float64Array columns, turned into GPU buffers, and reused as long as you pass the same references; hovering, zooming and panning then only touch the visible points or a transform. This page explains what is fast, what costs a full pass over the data, and how to keep your charts in the fast path.

The options are documented on Chart (React) and Chart engine (framework-free). The four backends are compared side by side, with live benchmarks and scores, on Renderer comparison.

### Renderers and fallback

Cartesian charts (line, area, bar, scatter, candlestick, heatmap, sparkline, quadrant) draw their data with the GPU and their text (axes, labels, legend, tooltip) with the DOM. The renderer option chooses the backend.

auto (default) tries WebGPU, then WebGL2, then WebGL, then Canvas2D, and keeps the first one that starts. The ready promise resolves with the chosen kind, and onRendererChange / the renderer event reports it.

WebGL (1) is the safety net for older GPUs and drivers and for browsers without WebGL2: the same marks, colors and antialiasing, drawn with GLSL ES 1.0 shaders and instanced through the ANGLE_instanced_arrays extension (available virtually everywhere). Without that extension the chart moves on to Canvas2D.

With auto, software GPUs are skipped because they are slower than Canvas2D: WebGPU rejects fallback adapters, and WebGL2 and WebGL are created with failIfMajorPerformanceCaveat and rejected when the renderer name reveals a software rasterizer (SwiftShader, llvmpipe, softpipe, Microsoft Basic Render Driver…). Virtual machines and headless browsers therefore usually end up on Canvas2D.

renderer: "webgpu", "webgl2", "webgl" or "canvas2d" forces a backend, software GPUs included; if it cannot start, the next one in the chain is used. Canvas2D is a good choice for small charts and screenshots; GPUs win from tens of thousands of points.

When the GPU is lost (driver reset, too many contexts), the chart falls back to the next backend, redraws, and fires the renderer event again. Browsers limit live WebGL contexts (about 16): a dashboard with dozens of GPU charts should destroy the ones that leave the screen or use Canvas2D for the small ones.

### One renderer for every chart

setDefaultChartRenderer() sets the backend of every chart whose renderer is unset or "auto", in every framework: the default lives on globalThis, so the React components, the Vue and Angular wrappers and the Web Components share it, even when a page bundles several copies of the engine. Charts already on screen follow a change live: they recreate their renderer in place, keeping their data, zoom and state. subscribeDefaultChartRenderer() tells you about changes, e.g. to keep a picker in sync.

A chart's own renderer option always wins. A backend forced through the default counts as forced: it may run on a software GPU, and falls back to the next backend when it cannot start. "auto" restores the automatic detection.

The renderer bar at the top of the chart pages of these docs does exactly that: pick Canvas2D or WebGL there and every chart of the page switches to it, with a badge under each demo showing the backend actually in use. Here, the Auto option of each showcase follows it.

### Live showcases

The examples below draw up to a million marks in your browser. Their data is generated once, into typed arrays with a seeded random generator, when the example comes near the screen, and each animation stops while its example is off screen. Pick a backend to force it — the chart tells which one actually started — and let the camera tour zoom in and out, or take over with the mouse.

FPS and frame time: how often the page paints while the chart moves. Displays refresh 60 times per second or more; below 30 the motion feels sluggish.

Main thread: the JavaScript, style, layout and paint time of each frame, the chart's draw calls included (the GPU itself works in parallel). The lower, the more room is left for the rest of the page.

First frame: from handing the data (or a new backend) to the chart to the first painted frame — normalizing the columns, building the GPU buffers and drawing.

Renderer

Auto

WebGPU

WebGL2

WebGL

Canvas2D

Page ({{backend}})

Camera tour

Stream

Renderer

FPS

Frame time

Main thread

First frame

Points

Cells

Candles

Ingest

{{value}} ms

{{value}} fps

{{value}}/s

{{value}} dB

Generating {{value}} data points…

Starting the renderer…

Auto picked {{backend}}, the best backend available here.

Auto picked {{backend}}: no hardware-accelerated GPU is available here (software GPUs are skipped).

Drawn with {{backend}}, as requested.

{{requested}} could not start here: fell back to {{backend}}.

Tour paused: a frame takes {{ms}} of main thread with this backend. Turn it back on or pick another backend.

Drawn with {{backend}}, the renderer selected for the page.

{{requested}}, selected for the page, runs on a software GPU here: this demo uses {{backend}} so that the page stays responsive. Pick {{requested}} in this demo to force it.

Ctrl / ⌘ + wheel or pinch to zoom, drag to pan, double-click to reset. The y axis follows the visible range.

Ctrl / ⌘ + wheel or pinch to zoom both axes, drag to pan, double-click to reset.

The oldest samples leave the window as new ones arrive; hover to read a channel.

Sensor {{index}}

Temperature (°C)

Four sensors, 1,000,000 readings

Cluster {{index}}

Ten clusters, 1,000,000 points

Index

Price

200,000 one-minute candlesticks

Level

Time (s)

Frequency (Hz)

Spectrogram of 1,000 × 1,000 cells

Channel {{index}}

{{value}} channels streaming in real time

{{backend}}: the same data set

Data set

Line · 1M points

Scatter · 1M points

Run benchmark

→ {{backend}} (fallback)

Measuring…

Main-thread time per frame (shorter is better) and frame rate

Measuring {{backend}}…

Done: the same zoom path on the same data, one backend at a time.

Run the benchmark to measure each backend on this device.

Each run mounts one chart with all the points for 3 s, then puts its preview back.

{{requested}} → {{backend}}

Preview: {{value}} points drawn with Canvas2D. Run the benchmark to draw the million.

{{backend}}: preview of the data set

Live: {{value}} points drawn with {{backend}}

Software GPU: skipped (would block the page)

Run anyway

Skipped

Skipped (software GPU): {{backends}}.

### Data formats, fastest first

Every series is normalized into columns once. The cost of that pass depends on the format you give:

Typed-array columns ({ x: Float64Array, y: Float32Array }): copied with a single set() call, no per-point conversion. open / high / low / value columns given as Float64Array are used as they are. Best for 100k+ points.

Plain-array columns ({ x: number[], y: number[] }): one loop of numeric copies; categories and Date values are converted here.

[x, y] tuples: one small array read per point.

{ x, y, … } objects: the most flexible (size, color, label, open/high/low, value) and the slowest, every field being read per point. Fine for a few thousand points.

Normalized data is cached by series id (or index) and array identity: passing the same array again costs nothing, while an array mutated in place is not read again. Give series an id when their order may change, and sort x ascending: sorted data unlocks the binary searches below.

### What scales with the visible range

After the first pass, the work of a frame depends on what is visible rather than on the size of the data set:

Lines, areas and bars with sorted x: the visible range is found by binary search, so only those points are drawn and hit tested. Hover lookups are O(log n).

Scatter, candlestick and heatmap series are drawn entirely (on the GPU this is one instanced draw call); unsorted lines too.

Canvas2D decimates lines and areas to the min / max of each pixel column (at most 4 points per column), so a million points draw as a few thousand segments with the same silhouette.

Canvas2D rasterizes scatter series above 20,000 points straight into an ImageData buffer instead of drawing paths; canvases without a scratch canvas (mini-programs) draw one square per occupied cell.

Scatter hit testing uses a uniform grid index (about four points per cell, built lazily and cached per data array), so hovering 100k dots stays below a millisecond.

The DOM is updated only on change: the legend is rebuilt when its entries change, the tooltip and hover markers are reused while the pointer stays on the same points, and resolved theme colors are cached until the theme changes.

### Zoom and pan

On WebGPU, WebGL2 and WebGL, zooming and panning only change a transform uniform: no buffer is rebuilt, whatever the number of points. Buffers store positions relative to an origin in float32; when you zoom in more than about 2000× far from that origin, the chart re-centers and rebuilds the buffers once to keep sub-pixel precision.

On Canvas2D every frame redraws the visible range, decimated per pixel column: cost grows with the visible points, capped by the plot width for sorted lines and areas. Large scatter sets stay O(n) per frame there; prefer a GPU backend or fewer points for interactive scatter plots.

### How far it goes

Measured by the engine's benchmark suite (Node, CI-like machine; your hardware will differ):

1,000,000-point line: building the model and the GPU items takes about 15 ms.

100,000-point scatter: building it and running 1,000 hit tests takes about 13 ms.

setOptions with identical options: about 0.03 ms, nothing rebuilt; moving the tooltip over the same points: about 0.03 ms.

Guidance: lines and areas up to several million sorted points (typed arrays) stay interactive on a GPU; keep scatter plots around 100k–500k points on the GPU and 20k–50k on Canvas2D; bars and candlesticks are readable up to a few thousand visible marks, so aggregate (daily candles, monthly bars) before drawing more; heatmaps up to tens of thousands of cells.

### React tips

Keep data references stable: build series and their data with useMemo (or outside the component), keyed on the data they depend on. A new data array is a new data set and costs a full pass.

Props are compared shallowly before calling setOptions: top-level options by identity or one level deep, and every series field by identity. Inline objects such as yAxis={{ min: 0 }} or series={[{ name, data }]} are fine as long as data itself is stable; an identical render then costs nothing.

Do not recreate typed arrays on every render (new Float64Array(…) in the render body): allocate them when the data arrives and keep them in state or a ref.

Shape charts (pie, donut, radar, gauge, funnel, treemap) memoize their options too, but every change animates: keep data, padding and palette stable to avoid replaying the animation.

### Streaming updates

To append points, pass a new array (or new typed arrays) and call setOptions: the changed series is normalized again in O(n), the others are reused. Keep a sliding window (e.g. the last 50,000 points) so the cost stays bounded.

Batch samples and update at most once per frame (requestAnimationFrame) or on a timer, rather than once per message. For very fast feeds with typed arrays, preallocate a larger buffer and pass subarray() views of the filled part: a new view is a new identity but the memory is reused.

### Shape charts or cartesian charts

Pie, donut, rose, radar, gauge, funnel, treemap, Sankey, sunburst, chord and the other shape charts use the same GPU backends as the other charts (WebGPU → WebGL2 → WebGL → Canvas2D, chosen by the renderer option or setDefaultChartRenderer): their arcs, polygons and ribbons are tessellated into triangles and drawn with 4x MSAA, non-convex fills go through the stencil buffer (nonzero winding), and the text is drawn on a 2D canvas above the shapes. Canvas2D remains the fallback when no GPU backend starts, and the only backend in mini-programs (createCanvasShapeChart).

Choose a cartesian chart (line, area, bar, scatter, candlestick, heatmap) for many points, zooming and panning, or live data.

Choose a shape chart for parts of a whole, profiles, a single KPI or hierarchies — dozens to a few hundred marks. Beyond that, a treemap or a heatmap of aggregated data reads better than thousands of slices. Many small shape charts on one page stay cheap: on WebGPU they share one device; on WebGL each holds a context, and past the browser limit (about 16) the least recently drawn off-screen ones are suspended and restored when they scroll back. renderer="canvas2d" uses no GPU context at all.

### Mini-programs and React Native

Mini-program charts use createCanvasChart (and createCanvasShapeChart for shape charts) on a canvas type="2d": always Canvas2D, on slower JavaScript engines. Per-pixel decimation keeps lines fast, but aim for tens of thousands of points rather than millions, avoid passing large arrays through setData (it serializes them), and keep scatter plots to a few thousand dots.

On React Native the charts are drawn with Views only, so the number of shapes is capped: about 1,200 line points in total, 800 dots per series (2,000 in total) and 600 bars per series (1,500 rects in total, candlesticks counting two each, heatmap cells one), 200 strips per area. Above these budgets dots are merged per cell and bars per pixel column — the picture stays right but details are lost, and the data is still processed in JavaScript, so aggregate first.

For your own renderer, createChartController and scenePrimitives give the same budgets: scenePrimitives(scene, { maxDots, maxBars, columnWidth, dotCell }) returns decimated shapes (defaults: 4000 dots and 2000 bars per series, 1 px columns).

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

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "CandlestickChart"
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
    "type": "boolean | ChartLegendOptions",
    "required": false,
    "description": "Legend; shown by default when several series have a name",
    "typeText": "boolean | ChartLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | ChartTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it",
    "typeText": "boolean | ChartTooltipOptions"
  },
  {
    "name": "crosshair",
    "type": "boolean",
    "required": false,
    "description": "Vertical guide line following the pointer",
    "typeText": "boolean"
  },
  {
    "name": "interaction",
    "type": "boolean | ChartInteractionOptions",
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static (default `true`)",
    "typeText": "boolean | ChartInteractionOptions"
  },
  {
    "name": "labels",
    "type": "Partial<ChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<ChartLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D (default `auto`)",
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
    "name": "series",
    "type": "readonly ChartSeries[]",
    "required": true,
    "description": "Data series (replace the array or a `data` array to update the chart)",
    "typeText": "readonly ChartSeries[]"
  },
  {
    "name": "xAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "X axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "yAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "Y axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "annotations",
    "type": "readonly ChartAnnotation[]",
    "required": false,
    "description": "Background areas and reference lines",
    "typeText": "readonly ChartAnnotation[]"
  },
  {
    "name": "padding",
    "type": "ChartPadding",
    "required": false,
    "description": "Space around the plot area, in pixels",
    "typeText": "ChartPadding"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip, axes, accessible names); the page language by default",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "type": "[view: ChartView]",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "type": "[event: ChartHoverEvent | null]",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "type": "[event: ChartPlotClickEvent]",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "type": "[event: ChartHoverEvent]",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
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
  }
]
```

## Chart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Chart"
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
    "type": "boolean | ChartLegendOptions",
    "required": false,
    "description": "Legend; shown by default when several series have a name",
    "typeText": "boolean | ChartLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | ChartTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it",
    "typeText": "boolean | ChartTooltipOptions"
  },
  {
    "name": "crosshair",
    "type": "boolean",
    "required": false,
    "description": "Vertical guide line following the pointer",
    "typeText": "boolean"
  },
  {
    "name": "interaction",
    "type": "boolean | ChartInteractionOptions",
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static (default `true`)",
    "typeText": "boolean | ChartInteractionOptions"
  },
  {
    "name": "labels",
    "type": "Partial<ChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<ChartLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D (default `auto`)",
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
    "name": "series",
    "type": "readonly ChartSeries[]",
    "required": true,
    "description": "Data series (replace the array or a `data` array to update the chart)",
    "typeText": "readonly ChartSeries[]"
  },
  {
    "name": "xAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "X axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "yAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "Y axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "annotations",
    "type": "readonly ChartAnnotation[]",
    "required": false,
    "description": "Background areas and reference lines",
    "typeText": "readonly ChartAnnotation[]"
  },
  {
    "name": "padding",
    "type": "ChartPadding",
    "required": false,
    "description": "Space around the plot area, in pixels",
    "typeText": "ChartPadding"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip, axes, accessible names); the page language by default",
    "typeText": "string"
  },
  {
    "name": "orientation",
    "type": "ChartOrientation",
    "required": false,
    "description": "`horizontal` puts the x axis (categories) down the left side and the values along the bottom (default `vertical`)",
    "typeText": "ChartOrientation"
  },
  {
    "name": "stackMode",
    "type": "\"percent\" | \"normal\"",
    "required": false,
    "description": "`percent` scales every stack to 100% at each x (default `normal`)",
    "typeText": "\"percent\" | \"normal\""
  },
  {
    "name": "yAxis2",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "Right value axis of the series with `yAxis: \"right\"`; its range is aligned on the left ticks (vertical charts)",
    "typeText": "ChartAxisOptions"
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "type": "[view: ChartView]",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "type": "[event: ChartHoverEvent | null]",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "type": "[event: ChartPlotClickEvent]",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "type": "[event: ChartHoverEvent]",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
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
  }
]
```

## LineChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "LineChart"
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
    "name": "stacked",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Stacks the series on top of each other (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "percent",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Scales the stacks to 100% (implies `stacked`; default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "legend",
    "type": "boolean | ChartLegendOptions",
    "required": false,
    "description": "Legend; shown by default when several series have a name",
    "typeText": "boolean | ChartLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | ChartTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it",
    "typeText": "boolean | ChartTooltipOptions"
  },
  {
    "name": "crosshair",
    "type": "boolean",
    "required": false,
    "description": "Vertical guide line following the pointer",
    "typeText": "boolean"
  },
  {
    "name": "interaction",
    "type": "boolean | ChartInteractionOptions",
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static (default `true`)",
    "typeText": "boolean | ChartInteractionOptions"
  },
  {
    "name": "area",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Fills the area under the lines (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "labels",
    "type": "Partial<ChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<ChartLabels>"
  },
  {
    "name": "curve",
    "type": "ChartCurve",
    "required": false,
    "description": "Shape of the lines: straight, smooth (monotone) or steps",
    "typeText": "ChartCurve"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D (default `auto`)",
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
    "name": "series",
    "type": "readonly ChartSeries[]",
    "required": true,
    "description": "Data series (replace the array or a `data` array to update the chart)",
    "typeText": "readonly ChartSeries[]"
  },
  {
    "name": "xAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "X axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "yAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "Y axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "annotations",
    "type": "readonly ChartAnnotation[]",
    "required": false,
    "description": "Background areas and reference lines",
    "typeText": "readonly ChartAnnotation[]"
  },
  {
    "name": "padding",
    "type": "ChartPadding",
    "required": false,
    "description": "Space around the plot area, in pixels",
    "typeText": "ChartPadding"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip, axes, accessible names); the page language by default",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "type": "[view: ChartView]",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "type": "[event: ChartHoverEvent | null]",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "type": "[event: ChartPlotClickEvent]",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "type": "[event: ChartHoverEvent]",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
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
  }
]
```

## ScatterChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ScatterChart"
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
    "type": "boolean | ChartLegendOptions",
    "required": false,
    "description": "Legend; shown by default when several series have a name",
    "typeText": "boolean | ChartLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | ChartTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it",
    "typeText": "boolean | ChartTooltipOptions"
  },
  {
    "name": "crosshair",
    "type": "boolean",
    "required": false,
    "description": "Vertical guide line following the pointer",
    "typeText": "boolean"
  },
  {
    "name": "interaction",
    "type": "boolean | ChartInteractionOptions",
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static (default `true`)",
    "typeText": "boolean | ChartInteractionOptions"
  },
  {
    "name": "labels",
    "type": "Partial<ChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<ChartLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D (default `auto`)",
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
    "name": "series",
    "type": "readonly ChartSeries[]",
    "required": true,
    "description": "Data series (replace the array or a `data` array to update the chart)",
    "typeText": "readonly ChartSeries[]"
  },
  {
    "name": "xAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "X axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "yAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "Y axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "annotations",
    "type": "readonly ChartAnnotation[]",
    "required": false,
    "description": "Background areas and reference lines",
    "typeText": "readonly ChartAnnotation[]"
  },
  {
    "name": "padding",
    "type": "ChartPadding",
    "required": false,
    "description": "Space around the plot area, in pixels",
    "typeText": "ChartPadding"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip, axes, accessible names); the page language by default",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "type": "[view: ChartView]",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "type": "[event: ChartHoverEvent | null]",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "type": "[event: ChartPlotClickEvent]",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "type": "[event: ChartHoverEvent]",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
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
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: million

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/chart-performance/vue/million.vue

```vue
<script setup lang="ts">
// One million points in a typed array (`data: { y }`: the x values are the
// indexes): decimated on the GPU at every zoom level. Ctrl / ⌘ + wheel or
// pinch to zoom down to single samples.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { LineChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { signal: "Sensor (1,000,000 samples)" },
  zh: { signal: "传感器（1,000,000 个采样点）" },
  ja: { signal: "センサー（1,000,000 サンプル）" },
  fr: { signal: "Capteur (1 000 000 d’échantillons)" },
};

// a million samples as typed-array columns: no objects, no copies
const COUNT = 1_000_000;
const y = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  y[i] =
    50 +
    30 * Math.sin(i / 20_000) +
    8 * Math.sin(i / 700) +
    3 * Math.sin(i * 1.7);
}
const SAMPLES = { y };

const { language } = useI18n();
const series = computed(() => [
  { name: (TEXT[language.value] ?? TEXT.en).signal, data: SAMPLES },
]);
</script>

<template>
  <LineChart
    :series="series"
    :interaction="{ zoom: 'x' }"
    crosshair
    :height="320"
  />
</template>

```

## Example: scatter

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/chart-performance/vue/scatter.vue

```vue
<script setup lang="ts">
// 200,000 dots from typed arrays (`data: { x, y }`): drawn by the GPU,
// hovered through a spatial index; zoom on both axes.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { ScatterChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { points: "Measurements (200,000 points)" },
  zh: { points: "测量值（200,000 个点）" },
  ja: { points: "測定値（200,000 点）" },
  fr: { points: "Mesures (200 000 points)" },
};

// 200,000 points in two typed-array columns, generated deterministically
const COUNT = 200_000;
const x = new Float32Array(COUNT);
const y = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  const angle = (i * 2.399963) % (2 * Math.PI);
  const radius = Math.sqrt(i / COUNT) * 40;
  x[i] = 50 + radius * Math.cos(angle) + 6 * Math.sin(i * 0.37);
  y[i] = 50 + radius * Math.sin(angle) * 0.6 + 6 * Math.cos(i * 0.53);
}
const POINTS = { x, y };

const { language } = useI18n();
const series = computed(() => [
  {
    name: (TEXT[language.value] ?? TEXT.en).points,
    data: POINTS,
    pointSize: 2,
    opacity: 0.4,
  },
]);
</script>

<template>
  <ScatterChart :series="series" :height="360" />
</template>

```
