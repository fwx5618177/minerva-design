# Chart performance

How the chart engine stays fast with millions of points, with live showcases: renderer selection and fallback, data formats, what scales with the visible range, decimation, hit testing, React and streaming tips, and the budgets of mini-programs and React Native.

Package: minerva-design@1.20.1

Renderer: react

Locale: en

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
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
    "name": "series",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly ChartSeries[]",
    "typeRef": "type:deda0bcb88251b63a5de",
    "required": true,
    "description": "Series drawn as candles unless they set a `type` (e.g. a moving average `line`); data points carry `open`, `high`, `low` and `y` (the close)"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "xAxis",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "X axis"
  },
  {
    "name": "yAxis",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Y axis"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/types.ts",
    "kind": "enum",
    "values": [
      "auto",
      "canvas2d",
      "webgl",
      "webgl2",
      "webgpu"
    ],
    "typeText": "ChartRendererPreference | undefined",
    "typeRef": "type:dc7d7e6f384ddec86e04",
    "default": "auto",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "crosshair",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the pointer"
  },
  {
    "name": "annotations",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas and reference lines"
  },
  {
    "name": "interaction",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "renderTooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "node",
    "typeText": "((event: ChartHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:018692c396245c230316",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip (replaces the default content)"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:7f639ac6d9481ff0bde9",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent | null",
        "typeRef": "type:92ec77c4587c7e27430b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the hovered (or keyboard-focused) points change"
  },
  {
    "name": "onPointClick",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent) => void) | undefined",
    "typeRef": "type:677083ee0328d7ee4253",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a point (or bar) is clicked"
  },
  {
    "name": "onPlotClick",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartPlotClickEvent) => void) | undefined",
    "typeRef": "type:0256cf20d9a3f1b1c88a",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartPlotClickEvent",
        "typeRef": "type:db60e2cf00fabb558740"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the plot area is clicked where there is no point"
  },
  {
    "name": "onZoom",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:ee073556f18eb3ee4cae",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartView",
        "typeRef": "type:f1de933b453f8db86ff3"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the user zooms or pans"
  },
  {
    "name": "onRendererChange",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((renderer: ChartRendererKind) => void) | undefined",
    "typeRef": "type:167734f7bd5dd7f686a6",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartRendererKind",
        "typeRef": "type:3439f360c8a2b0649d25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the backend once it is ready (and when it falls back after a GPU loss)"
  }
]
```

### bindings

```json
[
  {
    "prop": "renderer",
    "event": "onRendererChange",
    "syntax": "renderer={renderer} onRendererChange={handler}"
  }
]
```

## Chart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
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
    "name": "series",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly ChartSeries[]",
    "typeRef": "type:deda0bcb88251b63a5de",
    "required": true,
    "description": "Data series; each sets its own `type`"
  },
  {
    "name": "stackMode",
    "source": "packages/charts/src/react/types.ts",
    "kind": "enum",
    "values": [
      "normal",
      "percent"
    ],
    "typeText": "\"normal\" | \"percent\" | undefined",
    "typeRef": "type:2d2343824f816d71127f",
    "default": "normal",
    "required": false,
    "description": "`percent` scales every stack to 100% at each x"
  },
  {
    "name": "yAxis2",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Right value axis of the series with `yAxis: \"right\"`; its range is aligned on the left ticks (vertical charts)"
  },
  {
    "name": "orientation",
    "source": "packages/charts/src/react/types.ts",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "ChartOrientation | undefined",
    "typeRef": "type:872af3679a2d7fcf3d26",
    "default": "vertical",
    "required": false,
    "description": "`horizontal` puts the x axis (categories) down the left side and the values along the bottom"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "xAxis",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "X axis"
  },
  {
    "name": "yAxis",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Y axis"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/types.ts",
    "kind": "enum",
    "values": [
      "auto",
      "canvas2d",
      "webgl",
      "webgl2",
      "webgpu"
    ],
    "typeText": "ChartRendererPreference | undefined",
    "typeRef": "type:dc7d7e6f384ddec86e04",
    "default": "auto",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "crosshair",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the pointer"
  },
  {
    "name": "annotations",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas and reference lines"
  },
  {
    "name": "interaction",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "renderTooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "node",
    "typeText": "((event: ChartHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:018692c396245c230316",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip (replaces the default content)"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:7f639ac6d9481ff0bde9",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent | null",
        "typeRef": "type:92ec77c4587c7e27430b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the hovered (or keyboard-focused) points change"
  },
  {
    "name": "onPointClick",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent) => void) | undefined",
    "typeRef": "type:677083ee0328d7ee4253",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a point (or bar) is clicked"
  },
  {
    "name": "onPlotClick",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartPlotClickEvent) => void) | undefined",
    "typeRef": "type:0256cf20d9a3f1b1c88a",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartPlotClickEvent",
        "typeRef": "type:db60e2cf00fabb558740"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the plot area is clicked where there is no point"
  },
  {
    "name": "onZoom",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:ee073556f18eb3ee4cae",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartView",
        "typeRef": "type:f1de933b453f8db86ff3"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the user zooms or pans"
  },
  {
    "name": "onRendererChange",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((renderer: ChartRendererKind) => void) | undefined",
    "typeRef": "type:167734f7bd5dd7f686a6",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartRendererKind",
        "typeRef": "type:3439f360c8a2b0649d25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the backend once it is ready (and when it falls back after a GPU loss)"
  }
]
```

### bindings

```json
[
  {
    "prop": "renderer",
    "event": "onRendererChange",
    "syntax": "renderer={renderer} onRendererChange={handler}"
  }
]
```

## LineChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
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
    "name": "series",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly ChartSeries[]",
    "typeRef": "type:deda0bcb88251b63a5de",
    "required": true,
    "description": "Series drawn as lines (or areas with `area`) unless they set a `type`"
  },
  {
    "name": "area",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Fills the area under the lines"
  },
  {
    "name": "curve",
    "source": "packages/charts/src/react/types.ts",
    "kind": "enum",
    "values": [
      "linear",
      "smooth",
      "step"
    ],
    "typeText": "ChartCurve | undefined",
    "typeRef": "type:9a03680a65f827285385",
    "default": "linear",
    "required": false,
    "description": "Shape of the lines: straight, smooth (monotone) or steps"
  },
  {
    "name": "stacked",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Stacks the series on top of each other"
  },
  {
    "name": "percent",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Scales the stacks to 100% (with `stacked`)"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "xAxis",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "X axis"
  },
  {
    "name": "yAxis",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Y axis"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/types.ts",
    "kind": "enum",
    "values": [
      "auto",
      "canvas2d",
      "webgl",
      "webgl2",
      "webgpu"
    ],
    "typeText": "ChartRendererPreference | undefined",
    "typeRef": "type:dc7d7e6f384ddec86e04",
    "default": "auto",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "crosshair",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the pointer"
  },
  {
    "name": "annotations",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas and reference lines"
  },
  {
    "name": "interaction",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "renderTooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "node",
    "typeText": "((event: ChartHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:018692c396245c230316",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip (replaces the default content)"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:7f639ac6d9481ff0bde9",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent | null",
        "typeRef": "type:92ec77c4587c7e27430b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the hovered (or keyboard-focused) points change"
  },
  {
    "name": "onPointClick",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent) => void) | undefined",
    "typeRef": "type:677083ee0328d7ee4253",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a point (or bar) is clicked"
  },
  {
    "name": "onPlotClick",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartPlotClickEvent) => void) | undefined",
    "typeRef": "type:0256cf20d9a3f1b1c88a",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartPlotClickEvent",
        "typeRef": "type:db60e2cf00fabb558740"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the plot area is clicked where there is no point"
  },
  {
    "name": "onZoom",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:ee073556f18eb3ee4cae",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartView",
        "typeRef": "type:f1de933b453f8db86ff3"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the user zooms or pans"
  },
  {
    "name": "onRendererChange",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((renderer: ChartRendererKind) => void) | undefined",
    "typeRef": "type:167734f7bd5dd7f686a6",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartRendererKind",
        "typeRef": "type:3439f360c8a2b0649d25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the backend once it is ready (and when it falls back after a GPU loss)"
  }
]
```

### bindings

```json
[
  {
    "prop": "renderer",
    "event": "onRendererChange",
    "syntax": "renderer={renderer} onRendererChange={handler}"
  }
]
```

## ScatterChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
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
    "name": "series",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly ChartSeries[]",
    "typeRef": "type:deda0bcb88251b63a5de",
    "required": true,
    "description": "Series drawn as dots unless they set a `type`"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "xAxis",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "X axis"
  },
  {
    "name": "yAxis",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Y axis"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/types.ts",
    "kind": "enum",
    "values": [
      "auto",
      "canvas2d",
      "webgl",
      "webgl2",
      "webgpu"
    ],
    "typeText": "ChartRendererPreference | undefined",
    "typeRef": "type:dc7d7e6f384ddec86e04",
    "default": "auto",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "crosshair",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the pointer"
  },
  {
    "name": "annotations",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas and reference lines"
  },
  {
    "name": "interaction",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "renderTooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "node",
    "typeText": "((event: ChartHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:018692c396245c230316",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip (replaces the default content)"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:7f639ac6d9481ff0bde9",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent | null",
        "typeRef": "type:92ec77c4587c7e27430b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the hovered (or keyboard-focused) points change"
  },
  {
    "name": "onPointClick",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent) => void) | undefined",
    "typeRef": "type:677083ee0328d7ee4253",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a point (or bar) is clicked"
  },
  {
    "name": "onPlotClick",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartPlotClickEvent) => void) | undefined",
    "typeRef": "type:0256cf20d9a3f1b1c88a",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartPlotClickEvent",
        "typeRef": "type:db60e2cf00fabb558740"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the plot area is clicked where there is no point"
  },
  {
    "name": "onZoom",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:ee073556f18eb3ee4cae",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartView",
        "typeRef": "type:f1de933b453f8db86ff3"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the user zooms or pans"
  },
  {
    "name": "onRendererChange",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((renderer: ChartRendererKind) => void) | undefined",
    "typeRef": "type:167734f7bd5dd7f686a6",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartRendererKind",
        "typeRef": "type:3439f360c8a2b0649d25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the backend once it is ready (and when it falls back after a GPU loss)"
  }
]
```

### bindings

```json
[
  {
    "prop": "renderer",
    "event": "onRendererChange",
    "syntax": "renderer={renderer} onRendererChange={handler}"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 200,000 candlesticks

One-minute OHLC candles over about 140 days, as open / high / low / close columns. Zoom from the whole history down to single candles; wicks and bodies are two instanced bar draws.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chart-performance/demos/candles.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CandlestickChart, type ChartSeries } from "minerva-design/charts";
import {
  CANDLE_COUNT,
  CANDLE_TARGETS,
  fitY,
  loadCandles,
  tour,
  type Candles,
} from "../showcase/data";
import { Showcase, type ShowcaseChartProps } from "../showcase/Showcase";

// from 200,000 candles (about 140 days) down to two hours of one-minute candles
const candleTour = tour({ zoom: 1600, period: 14, targets: CANDLE_TARGETS });

function Market({
  data,
  chartRef,
  renderer,
  onRendererChange,
  onZoom,
}: ShowcaseChartProps<Candles>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  // OHLC columns: y holds the closes
  const series = useMemo(
    (): ChartSeries[] => [
      {
        id: "candles",
        name: t("market"),
        data: {
          x: data.x,
          y: data.close,
          open: data.open,
          high: data.high,
          low: data.low,
        },
      },
    ],
    [data, t],
  );
  return (
    <CandlestickChart
      ref={chartRef}
      series={series}
      renderer={renderer}
      onRendererChange={onRendererChange}
      onZoom={onZoom}
      xAxis={{ type: "time" }}
      yAxis={{ title: t("price") }}
      interaction={{ zoom: "x" }}
      legend={false}
      height={380}
      ariaLabel={t("candlesAria")}
    />
  );
}

export default function CandlesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  return (
    <Showcase
      load={loadCandles}
      chart={Market}
      count={CANDLE_COUNT}
      countLabel={t("stats.candles")}
      height={380}
      motionLabel={t("tour")}
      hint={t("hintX")}
      tour={(data, time, base) => candleTour(time, base)}
      fit={fitY}
    />
  );
}

```

### apps/docs/src/docs/pages/chart-performance/showcase/data.ts

```tsx
// Data sets of the performance showcases: typed-array columns generated once
// (seeded, so every visit draws the same picture) and shared by the demos of
// the page, plus the camera "tours" that zoom in and out of them.
import type { ChartView } from "minerva-design/charts";

export type Range = [number, number];

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

/** Standard normal numbers (Box-Muller, both values of a pair are used) */
export function gaussian(random: () => number) {
  let spare = NaN;
  return () => {
    if (!Number.isNaN(spare)) {
      const value = spare;
      spare = NaN;
      return value;
    }
    const r = Math.sqrt(-2 * Math.log(1 - random()));
    const a = 2 * Math.PI * random();
    spare = r * Math.sin(a);
    return r * Math.cos(a);
  };
}

/**
 * Generates a data set on first use, one frame later so that a loading
 * state paints first; later calls share the result.
 */
const cached = <T>(generate: () => T) => {
  let promise: Promise<T> | null = null;
  return (): Promise<T> => {
    if (!promise) {
      promise = new Promise<T>((resolve) => {
        const run = () => setTimeout(() => resolve(generate()), 0);
        if (typeof requestAnimationFrame === "function")
          requestAnimationFrame(run);
        else run();
      });
    }
    return promise;
  };
};

const BLOCK = 512;

/**
 * Min / max of index ranges over several columns in O(BLOCK + n / BLOCK):
 * used to fit the y axis to the visible x range on every frame.
 */
export function rangeIndex(
  lows: readonly Float64Array[],
  highs: readonly Float64Array[],
) {
  const n = lows[0]?.length ?? 0;
  const blocks = Math.ceil(n / BLOCK);
  const blockMin = new Float64Array(blocks).fill(Infinity);
  const blockMax = new Float64Array(blocks).fill(-Infinity);
  for (const column of lows) {
    for (let i = 0; i < n; i++) {
      const b = (i / BLOCK) | 0;
      if (column[i] < blockMin[b]) blockMin[b] = column[i];
    }
  }
  for (const column of highs) {
    for (let i = 0; i < n; i++) {
      const b = (i / BLOCK) | 0;
      if (column[i] > blockMax[b]) blockMax[b] = column[i];
    }
  }
  return (from: number, to: number): Range | null => {
    let i = Math.max(0, Math.floor(from));
    const end = Math.min(n - 1, Math.ceil(to));
    if (i > end) return null;
    let lo = Infinity;
    let hi = -Infinity;
    const scan = (index: number) => {
      for (const column of lows) if (column[index] < lo) lo = column[index];
      for (const column of highs) if (column[index] > hi) hi = column[index];
    };
    for (; i <= end && i % BLOCK; i++) scan(i);
    for (; i + BLOCK - 1 <= end; i += BLOCK) {
      const b = i / BLOCK;
      if (blockMin[b] < lo) lo = blockMin[b];
      if (blockMax[b] > hi) hi = blockMax[b];
    }
    for (; i <= end; i++) scan(i);
    return lo <= hi ? [lo, hi] : null;
  };
}

/** Evenly sampled columns: the y range of the samples inside an x range */
export interface Sampled {
  start: number;
  step: number;
  range: (from: number, to: number) => Range | null;
}

/** The y range to show for an x range, with some padding */
export const fitY = (data: Sampled, x: Range): Range | null => {
  const r = data.range(
    (x[0] - data.start) / data.step - 1,
    (x[1] - data.start) / data.step + 1,
  );
  if (!r) return null;
  const pad = (r[1] - r[0]) * 0.08 || 1;
  return [r[0] - pad, r[1] + pad];
};

export interface TourOptions {
  /** Deepest magnification */
  zoom: number;
  /** Seconds of one zoom in / zoom out cycle */
  period?: number;
  /** Data positions to zoom into, one per cycle */
  targets: readonly (readonly [number, number])[];
  /** Zooms the y axis too (scatter, heatmap) */
  y?: boolean;
}

/**
 * A camera path for `setView`: zooms from the whole data set into a target,
 * drifts a little there and zooms out again, then moves to the next target.
 */
export const tour =
  ({ zoom, period = 12, targets, y = false }: TourOptions) =>
  (time: number, base: ChartView): Partial<ChartView> => {
    const cycle = Math.floor(time / period);
    const phase = (time % period) / period;
    const p = (1 - Math.cos(2 * Math.PI * phase)) / 2;
    const target = targets[cycle % targets.length] ?? [NaN, NaN];
    const scale = Math.pow(1 / zoom, p);
    const axis = (range: Range, to: number, drift: number): Range => {
      const full = range[1] - range[0];
      const width = full * scale;
      const mid = (range[0] + range[1]) / 2;
      const goal = Number.isFinite(to) ? to : mid;
      const center = mid + (goal - mid) * p + width * 0.25 * drift * p;
      const start = Math.min(
        Math.max(center - width / 2, range[0]),
        range[1] - width,
      );
      return [start, start + width];
    };
    const x = axis(base.x, target[0], Math.sin(time * 0.7));
    return y ? { x, y: axis(base.y, target[1], Math.cos(time * 0.6)) } : { x };
  };

// ------------------------------------------------------------------ line

export const SIGNAL_SERIES = 4;
export const SIGNAL_LENGTH = 250_000;
const SIGNAL_START = Date.UTC(2026, 0, 1);
const SIGNAL_STEP = 1000;

export interface Signals extends Sampled {
  /** Timestamps, one per second */
  x: Float64Array;
  /** One column per sensor */
  y: Float64Array[];
}

/** 4 sensors × 250,000 samples: daily cycles, drift and noise */
export const loadSignals = cached((): Signals => {
  const normal = gaussian(mulberry32(2026));
  const x = new Float64Array(SIGNAL_LENGTH);
  for (let i = 0; i < SIGNAL_LENGTH; i++) x[i] = SIGNAL_START + i * SIGNAL_STEP;
  const y: Float64Array[] = [];
  for (let s = 0; s < SIGNAL_SERIES; s++) {
    const column = new Float64Array(SIGNAL_LENGTH);
    const level = 18 + s * 14;
    const swing = 3 + s * 1.5;
    let drift = 0;
    for (let i = 0; i < SIGNAL_LENGTH; i++) {
      drift = drift * 0.9995 + normal() * 0.06;
      const day = Math.sin((2 * Math.PI * i) / 86_400 + s * 1.3);
      const fast = Math.sin((2 * Math.PI * i) / (600 + s * 170));
      column[i] = level + day * swing + fast * 0.6 + drift + normal() * 0.25;
    }
    y.push(column);
  }
  return {
    x,
    y,
    start: SIGNAL_START,
    step: SIGNAL_STEP,
    range: rangeIndex(y, y),
  };
});

/** Moments of the signals worth zooming into */
export const SIGNAL_TARGETS: readonly (readonly [number, number])[] = [
  0.22, 0.68, 0.41, 0.87,
].map((f) => [SIGNAL_START + f * SIGNAL_LENGTH * SIGNAL_STEP, NaN] as const);

// --------------------------------------------------------------- scatter

export const CLUSTER_COUNT = 10;
export const CLUSTER_SIZE = 100_000;

export interface Clusters {
  clusters: { x: Float64Array; y: Float64Array }[];
  /** Centers of the clusters (tour targets) */
  centers: (readonly [number, number])[];
}

/** 10 clusters × 100,000 points: blobs, rings and spiral arms */
export const loadClusters = cached((): Clusters => {
  const random = mulberry32(42);
  const normal = gaussian(random);
  const clusters: Clusters["clusters"] = [];
  const centers: Clusters["centers"] = [];
  for (let c = 0; c < CLUSTER_COUNT; c++) {
    const angle = (2 * Math.PI * c) / CLUSTER_COUNT + random() * 0.4;
    const radius = c % 3 === 0 ? 14 : 34;
    const cx = 50 + Math.cos(angle) * radius;
    const cy = 50 + Math.sin(angle) * radius;
    const sx = 2 + random() * 4;
    const sy = 1.5 + random() * 3;
    const rotation = random() * Math.PI;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const x = new Float64Array(CLUSTER_SIZE);
    const y = new Float64Array(CLUSTER_SIZE);
    for (let i = 0; i < CLUSTER_SIZE; i++) {
      let u: number;
      let v: number;
      if (c % 3 === 1) {
        // ring
        const a = random() * 2 * Math.PI;
        const r = 5 + normal() * 0.6;
        u = Math.cos(a) * r;
        v = Math.sin(a) * r;
      } else if (c % 3 === 2) {
        // spiral arm
        const t = random() * 3 * Math.PI;
        u = Math.cos(t) * t * 0.9 + normal() * 0.35;
        v = Math.sin(t) * t * 0.9 + normal() * 0.35;
      } else {
        u = normal() * sx;
        v = normal() * sy;
      }
      x[i] = cx + u * cos - v * sin;
      y[i] = cy + u * sin + v * cos;
    }
    clusters.push({ x, y });
    centers.push([cx, cy]);
  }
  return { clusters, centers };
});

// --------------------------------------------------------------- candles

export const CANDLE_COUNT = 200_000;
const CANDLE_START = Date.UTC(2026, 0, 5);
const CANDLE_STEP = 60_000;

export interface Candles extends Sampled {
  x: Float64Array;
  open: Float64Array;
  high: Float64Array;
  low: Float64Array;
  close: Float64Array;
}

/** 200,000 one-minute candles: a random walk with changing volatility */
export const loadCandles = cached((): Candles => {
  const random = mulberry32(7);
  const normal = gaussian(random);
  const x = new Float64Array(CANDLE_COUNT);
  const open = new Float64Array(CANDLE_COUNT);
  const high = new Float64Array(CANDLE_COUNT);
  const low = new Float64Array(CANDLE_COUNT);
  const close = new Float64Array(CANDLE_COUNT);
  let price = 120;
  for (let i = 0; i < CANDLE_COUNT; i++) {
    const sigma = 0.0012 * (1 + 0.7 * Math.sin(i / 9000) ** 2);
    const o = price;
    const c = o * Math.exp(normal() * sigma + 0.000002);
    x[i] = CANDLE_START + i * CANDLE_STEP;
    open[i] = o;
    close[i] = c;
    high[i] = Math.max(o, c) * (1 + Math.abs(normal()) * sigma * 0.7);
    low[i] = Math.min(o, c) * (1 - Math.abs(normal()) * sigma * 0.7);
    price = c;
  }
  return {
    x,
    open,
    high,
    low,
    close,
    start: CANDLE_START,
    step: CANDLE_STEP,
    range: rangeIndex([low], [high]),
  };
});

export const CANDLE_TARGETS: readonly (readonly [number, number])[] = [
  0.31, 0.74, 0.12, 0.55,
].map((f) => [CANDLE_START + f * CANDLE_COUNT * CANDLE_STEP, NaN] as const);

// --------------------------------------------------------------- heatmap

export const SPECTRUM_STEPS = 1000;
export const SPECTRUM_BINS = 1000;
/** Seconds per time step */
const DT = 0.02;
/** Hz per frequency bin */
const DF = 8;

export interface Spectrogram {
  /** Time of each cell (sorted: the cells go column by column) */
  x: Float64Array;
  /** Frequency of each cell */
  y: Float64Array;
  /** Level in dB */
  value: Float64Array;
}

/**
 * 1,000 time steps × 1,000 frequency bins: a chirp and its harmonics, a
 * warbling tone, periodic clicks and a pink noise floor
 */
export const loadSpectrogram = cached((): Spectrogram => {
  const normal = gaussian(mulberry32(1000));
  const n = SPECTRUM_STEPS * SPECTRUM_BINS;
  const x = new Float64Array(n);
  const y = new Float64Array(n);
  const value = new Float64Array(n);
  const duration = SPECTRUM_STEPS * DT;
  const tones: [number, number, number][] = [];
  for (let step = 0; step < SPECTRUM_STEPS; step++) {
    const t = step * DT;
    const chirp = 400 + 1500 * (t / duration) + 250 * Math.sin(t * 0.9);
    tones.length = 0;
    for (let h = 1; h <= 4; h++) tones.push([chirp * h, 40 * h, 1 / h ** 1.6]);
    tones.push([5200 + 700 * Math.sin((2 * Math.PI * t) / 4), 60, 0.35]);
    const click = Math.exp(-(((t % 2.5) - 1.2) ** 2) / 0.002) * 0.08;
    for (let bin = 0; bin < SPECTRUM_BINS; bin++) {
      const f = bin * DF;
      let power = 1e-7 / (1 + f / 300) + click / (1 + f / 4000);
      for (const [fc, width, amp] of tones) {
        const d = (f - fc) / width;
        if (d > -5 && d < 5) power += amp * Math.exp(-d * d);
      }
      const i = step * SPECTRUM_BINS + bin;
      x[i] = t;
      y[i] = f;
      value[i] = 10 * Math.log10(power) + normal() * 1.5;
    }
  }
  return { x, y, value };
});

export const SPECTRUM_TARGETS: readonly (readonly [number, number])[] = [
  [6, 1200],
  [3, 5200],
  [12.2, 2500],
  [17, 3900],
];

```

### apps/docs/src/docs/pages/chart-performance/showcase/Showcase.tsx

```tsx
import {
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type RefObject,
} from "react";
import { useTranslation } from "react-i18next";
import { LoadingState, Radio, RadioGroup, Switch } from "minerva-design";
import type {
  ChartHandle,
  ChartRendererKind,
  ChartRendererPreference,
  ChartView,
} from "minerva-design/charts";
import { ChartRendererContext } from "../../../renderer/context";
import {
  autoPick,
  probeBackends,
  type BackendsSupport,
} from "../../../renderer/support";
import type { Range } from "./data";
import {
  afterNextPaint,
  prefersReducedMotion,
  useFrameLoop,
  useInView,
} from "./meter";
import { RENDERERS, fpsClass, useShowcaseFormat } from "./text";
import styles from "./showcase.module.scss";

/** Stops the tour when a frame takes longer than this (ms of main thread) */
const SLOW_FRAME = 250;

/** Props a showcase gives to its chart component */
export interface ShowcaseChartProps<T> {
  /** The generated data set */
  data: T;
  /** Chart handle (the camera tour moves the view through it) */
  chartRef: RefObject<ChartHandle | null>;
  /** Backend picked in the selector */
  renderer: ChartRendererPreference;
  /** Reports the backend that actually started */
  onRendererChange: (kind: ChartRendererKind) => void;
  /** Fits the y axis to the zoomed x range */
  onZoom: (view: ChartView) => void;
  /** On screen and not paused (streaming demos run while true) */
  running: boolean;
}

export interface ShowcaseProps<T> {
  /** Loads the data set (generated once, when the showcase nears the screen) */
  load: () => Promise<T>;
  /** Draws the data set */
  chart: ComponentType<ShowcaseChartProps<T>>;
  /** Number of marks drawn */
  count: number;
  /** What `count` counts ("Points", "Cells", ...) */
  countLabel: string;
  /** Height of the chart in px */
  height: number;
  /** Label of the motion switch (camera tour, stream) */
  motionLabel: string;
  /** Interaction hint under the chart */
  hint: string;
  /** Camera path: the view at `time` seconds into the tour */
  tour?: (data: T, time: number, base: ChartView) => Partial<ChartView>;
  /** The y range to show for an x range (zoomable x only) */
  fit?: (data: T, x: Range) => Range | null;
  /** One more statistic */
  extra?: { label: string; value: string };
}

/**
 * A chart under test: renderer selector, live statistics (frame rate,
 * frame time, main-thread time, marks, time to first frame), a camera tour
 * and the backend that actually started. The data is generated when the
 * showcase nears the screen; the loop only runs while it is visible.
 */
export function Showcase<T>({
  load,
  chart: Plot,
  count,
  countLabel,
  height,
  motionLabel,
  hint,
  tour,
  fit,
  extra,
}: ShowcaseProps<T>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  const text = useShowcaseFormat();
  const rootRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartHandle>(null);
  const near = useInView(rootRef, "300px");
  const visible = useInView(rootRef);
  const [data, setData] = useState<{ value: T } | null>(null);
  const [renderer, setRenderer] = useState<ChartRendererPreference>("auto");
  const [actual, setActual] = useState<ChartRendererKind | null>(null);
  const [motion, setMotion] = useState(() => !prefersReducedMotion());
  const [slow, setSlow] = useState<number | null>(null);
  const [startup, setStartup] = useState<number | null>(null);
  /** When the data was handed to the chart or the backend was switched */
  const startRef = useRef(0);
  const tourRef = useRef<{ start: number; base: ChartView } | null>(null);
  /** Consecutive slow frames of the tour */
  const slowFramesRef = useRef(0);
  // the renderer of the page bar: what "auto" means here
  const page = useContext(ChartRendererContext) ?? "auto";
  const [support, setSupport] = useState<BackendsSupport | null>(null);

  useEffect(() => {
    let cancelled = false;
    void probeBackends().then((result) => {
      if (!cancelled) setSupport(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // A GPU backend forced for the whole page may run on a software GPU here,
  // which takes seconds per frame with these data sets: "auto" then uses
  // the best hardware backend instead (picking it in this demo still forces it)
  const pageSoftware = page !== "auto" && support?.[page] === "software";
  const probing = page !== "auto" && page !== "canvas2d" && !support;
  const chartRenderer: ChartRendererPreference =
    renderer === "auto" && pageSoftware && support
      ? autoPick(support)
      : renderer;
  const requested = renderer === "auto" ? page : renderer;

  useEffect(() => {
    if (!near || data) return;
    let cancelled = false;
    void load().then((value) => {
      if (cancelled) return;
      startRef.current = performance.now();
      setData({ value });
    });
    return () => {
      cancelled = true;
    };
  }, [near, data, load]);

  // the tour stops as soon as the user zooms, pans or uses the keyboard
  useEffect(() => {
    const plot = plotRef.current;
    if (!plot) return;
    const stop = () => setMotion(false);
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) stop();
    };
    const onKey = (event: KeyboardEvent) => {
      if (/^(Arrow|\+|-|=|0|Home|End)/.test(event.key)) stop();
    };
    plot.addEventListener("pointerdown", stop);
    plot.addEventListener("wheel", onWheel, { passive: true });
    plot.addEventListener("keydown", onKey);
    return () => {
      plot.removeEventListener("pointerdown", stop);
      plot.removeEventListener("wheel", onWheel);
      plot.removeEventListener("keydown", onKey);
    };
  }, []);

  const animating = motion && slow === null;
  const running = visible && !!data;

  const stats = useFrameLoop(running, {
    onFrame: (time) => {
      const instance = chartRef.current?.getInstance();
      // starts once the first frame (the costly one: buffers) is painted
      if (!tour || !animating || !data || startup === null || !instance) {
        tourRef.current = null;
        return;
      }
      let state = tourRef.current;
      if (!state) {
        instance.resetZoom();
        state = { start: time, base: instance.getView() };
        tourRef.current = state;
        slowFramesRef.current = 0;
      }
      const view = tour(data.value, (time - state.start) / 1000, state.base);
      if (fit && view.x && !view.y) {
        const y = fit(data.value, view.x);
        if (y) view.y = y;
      }
      instance.setView(view);
    },
    onWork: (ms) => {
      if (!tourRef.current) return;
      // two slow frames in a row (or a very slow one): this backend cannot
      // animate the data set here
      slowFramesRef.current = ms > SLOW_FRAME ? slowFramesRef.current + 1 : 0;
      if (slowFramesRef.current >= 2 || ms > SLOW_FRAME * 4) {
        tourRef.current = null;
        setSlow(ms);
      }
    },
  });

  const onRendererChange = (kind: ChartRendererKind) => {
    setActual(kind);
    afterNextPaint(() => setStartup(performance.now() - startRef.current));
  };
  const onZoom = (view: ChartView) => {
    if (!fit || !data) return;
    const y = fit(data.value, view.x);
    if (y) chartRef.current?.setView({ y });
  };

  let status: ReactNode = t("status.starting");
  if (slow !== null) {
    status = (
      <span className={styles.fallback}>
        {t("status.slow", { ms: text.ms(slow) })}
      </span>
    );
  } else if (actual && renderer === "auto" && pageSoftware) {
    status = (
      <span className={styles.fallback}>
        {t("status.pageSoftware", {
          requested: text.renderer(page),
          backend: text.renderer(actual),
        })}
      </span>
    );
  } else if (actual && requested === "auto") {
    status =
      actual === "canvas2d"
        ? t("status.autoCanvas", { backend: text.renderer(actual) })
        : t("status.auto", { backend: text.renderer(actual) });
  } else if (actual && actual === requested) {
    status =
      renderer === "auto"
        ? t("status.page", { backend: text.renderer(actual) })
        : t("status.forced", { backend: text.renderer(actual) });
  } else if (actual) {
    status = (
      <span className={styles.fallback}>
        {t("status.fallback", {
          requested: text.renderer(requested),
          backend: text.renderer(actual),
        })}
      </span>
    );
  }

  return (
    <div ref={rootRef} className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("renderer")}
          direction="horizontal"
          size="small"
          value={renderer}
          onChange={(value) => {
            startRef.current = performance.now();
            setRenderer(value as ChartRendererPreference);
            setActual(null);
            setStartup(null);
            setSlow(null);
          }}
        >
          {RENDERERS.map((kind) => (
            <Radio
              key={kind}
              value={kind}
              label={
                kind === "auto" && page !== "auto"
                  ? t("renderers.page", { backend: text.renderer(page) })
                  : text.renderer(kind)
              }
            />
          ))}
        </RadioGroup>
        <Switch
          size="small"
          checked={motion}
          label={motionLabel}
          onChange={(checked) => {
            setMotion(checked);
            setSlow(null);
          }}
        />
      </div>

      <dl className={styles.hud}>
        <div className={styles.stat}>
          <dt>{t("stats.renderer")}</dt>
          <dd>{actual ? text.renderer(actual) : "…"}</dd>
        </div>
        <div className={styles.stat}>
          <dt>{t("stats.fps")}</dt>
          <dd className={stats ? fpsClass(stats.fps) : undefined}>
            {stats ? text.count(stats.fps) : "–"}
          </dd>
        </div>
        <div className={styles.stat}>
          <dt>{t("stats.frame")}</dt>
          <dd>{stats ? text.ms(stats.frame) : "–"}</dd>
        </div>
        <div className={styles.stat}>
          <dt>{t("stats.work")}</dt>
          <dd>{stats ? text.ms(stats.work) : "–"}</dd>
        </div>
        <div className={styles.stat}>
          <dt>{countLabel}</dt>
          <dd title={text.count(count)}>{text.compact(count)}</dd>
        </div>
        {extra && (
          <div className={styles.stat}>
            <dt>{extra.label}</dt>
            <dd>{extra.value}</dd>
          </div>
        )}
        <div className={styles.stat}>
          <dt>{t("stats.startup")}</dt>
          <dd>{startup !== null ? text.ms(startup) : "–"}</dd>
        </div>
      </dl>

      <div ref={plotRef} className={styles.chart}>
        {data && !probing ? (
          <Plot
            data={data.value}
            chartRef={chartRef}
            renderer={chartRenderer}
            onRendererChange={onRendererChange}
            onZoom={onZoom}
            running={running && motion}
          />
        ) : (
          <LoadingState
            className={styles.loading}
            style={{ height }}
            size="small"
            label={t("loading", { value: text.count(count) })}
          />
        )}
      </div>

      <div className={styles.footer}>
        <p role="status">{status}</p>
        <p className={styles.hint}>{hint}</p>
      </div>
    </div>
  );
}

```

### apps/docs/src/docs/renderer/context.ts

```tsx
// Kept free of engine imports: DemoBlock (on every page) reads the context,
// the engine is only loaded by the lazy RendererScope of chart pages.
import { createContext } from "react";
import type { ChartRendererPreference } from "minerva-design/charts/core";
import type { DocCategory } from "../registry";

/** Categories whose pages get the renderer bar and the per-demo badges */
export const RENDERER_CATEGORIES: readonly DocCategory[] = [
  "charts",
  "financeCharts",
  "charts3d",
  "graphCharts",
  "chartEngine",
  "icons",
];

/**
 * What the bar of a page switches: the charts, or the canvas icons (icon
 * pages; the same stored choice drives both, see store.ts)
 */
export type RendererTopic = "charts" | "icons";

export const RendererTopicContext = createContext<RendererTopic>("charts");

/**
 * The page-wide chart renderer (null outside chart pages), shown by the demo
 * badges. The charts follow it by themselves through the engine's default.
 */
export const ChartRendererContext =
  createContext<ChartRendererPreference | null>(null);

```

### apps/docs/src/docs/registry.ts

```tsx
/**
 * Single source of truth for the documentation site.
 *
 * Plain data only (no React / JSX) so tests can import it in Node:
 * - the router builds one lazily-loaded route per page from this list
 * - the sidebar groups pages by `category`
 * - `src/docs/docs.test.ts` checks that every public export of the libraries
 *   is documented, that every `api` entry exists in `api.generated.json`,
 *   that every demo file exists and that all locales contain the page strings.
 *
 * Page content lives in `src/docs/pages/<id>/index.tsx` (+ `demos/<demo>.tsx`)
 * and its strings in `src/i18n/locales/<lng>/docs/<id>.json`.
 */

export type DocCategory =
  | "gettingStarted"
  | "theming"
  | "configuration"
  | "general"
  | "layout"
  | "dataEntry"
  | "dataDisplay"
  | "feedback"
  | "navigation"
  | "overlays"
  | "editors"
  | "charts"
  | "financeCharts"
  | "charts3d"
  | "graphCharts"
  | "chartEngine"
  | "icons"
  | "mobile"
  | "webComponents";

export interface DocPageMeta {
  /** Route path and folder name under src/docs/pages */
  id: string;
  category: DocCategory;
  /** Runtime exports of the package documented on this page */
  exports?: string[];
  /** Package the exports come from */
  package?:
    | "minerva-design"
    | "minerva-design/web-components"
    | "minerva-design/charts"
    | "minerva-design/charts/core"
    | "minerva-design/icons"
    | "minerva-design/icons/core";
  /** Interfaces from api.generated.json rendered as API tables */
  api?: string[];
  /** Demo ids, in display order; each maps to `pages/<id>/demos/<demo>.tsx` */
  demos?: string[];
  /**
   * Component folders of minerva-design whose CSS custom properties
   * (`// @css-var` comments in their SCSS) are listed in a "CSS variables"
   * section
   */
  cssVars?: string[];
  /**
   * Web Component counterpart shown in the page's "Web Components" tab:
   * the define entry (`minerva-design/web-components/<entry>`), the custom
   * elements documented on the page (API tables from custom-elements.json)
   * and the demo ids (`pages/<id>/wc/<demo>.html` + optional `<demo>.ts`)
   */
  wc?: WcMeta;
  /**
   * React Native counterpart shown in the page's "React Native" tab
   * (minerva-design/native): exports, API interfaces of
   * api.native.generated.json (without the `native:` prefix) and demo ids
   * (`pages/<id>/native/<demo>.tsx`, rendered through react-native-web in a
   * phone frame). A page with `native` only (no `exports`) is a mobile
   * component: the React Native content is the whole page.
   */
  native?: NativeMeta;
}

export interface NativeMeta {
  /** Exports of minerva-design/native documented on the page */
  exports: string[];
  /** Entry the exports come from @default "minerva-design/native" */
  package?: string;
  /** Interfaces rendered as API tables (`ButtonProps` = `native:ButtonProps`) */
  api: string[];
  /** Demo ids, in display order */
  demos: string[];
}

export interface WcMeta {
  /** Define entry: `minerva-design/web-components/<entry>` */
  entry: string;
  /** Tag names documented on the page, in display order */
  tags: string[];
  /** Demo ids, in display order */
  demos: string[];
}

export const categories: DocCategory[] = [
  "gettingStarted",
  "theming",
  "configuration",
  "webComponents",
  "general",
  "layout",
  "dataEntry",
  "dataDisplay",
  "feedback",
  "overlays",
  "navigation",
  "editors",
  "mobile",
  "charts",
  "financeCharts",
  "charts3d",
  "graphCharts",
  "chartEngine",
  "icons",
];

/** Top-level parts of the site, each with its own sidebar */
export type DocSection = "docs" | "components" | "charts" | "icons";

export interface DocSectionMeta {
  id: DocSection;
  /** Page the top navigation link opens */
  home: string;
  categories: readonly DocCategory[];
}

export const sections: readonly DocSectionMeta[] = [
  {
    id: "docs",
    home: "overview",
    categories: ["gettingStarted", "theming", "configuration", "webComponents"],
  },
  {
    id: "components",
    home: "button",
    categories: [
      "general",
      "layout",
      "dataEntry",
      "dataDisplay",
      "feedback",
      "overlays",
      "navigation",
      "editors",
      "mobile",
    ],
  },
  {
    id: "charts",
    home: "charts",
    categories: [
      "charts",
      "financeCharts",
      "charts3d",
      "graphCharts",
      "chartEngine",
    ],
  },
  {
    id: "icons",
    home: "icons",
    categories: ["icons"],
  },
];

/** Section of a category (every category belongs to exactly one) */
export const sectionOf = (category: DocCategory): DocSection =>
  sections.find((section) => section.categories.includes(category))?.id ??
  "docs";

export const docPages: DocPageMeta[] = [
  // Getting started
  { id: "overview", category: "gettingStarted" },
  { id: "installation", category: "gettingStarted" },
  { id: "introduction", category: "gettingStarted" },
  { id: "architecture", category: "gettingStarted" },
  { id: "platform-support", category: "gettingStarted" },
  { id: "rsc-guide", category: "gettingStarted" },
  { id: "vue", category: "gettingStarted" },
  { id: "angular", category: "gettingStarted" },
  { id: "react-native", category: "gettingStarted" },
  { id: "theming", category: "gettingStarted", demos: ["scoped-theme"] },
  {
    id: "styling",
    category: "gettingStarted",
    demos: [
      "restyle-button",
      "restyle-modal",
      "restyle-tabs",
      "restyle-table",
      "items-menu",
      "items-select",
      "items-pagination",
      "items-table",
      "items-toast",
    ],
  },
  { id: "changelog", category: "gettingStarted" },

  // Configuration: ConfigProvider, hooks and theme utilities
  {
    id: "config-provider",
    category: "configuration",
    exports: ["ConfigProvider", "useConfig", "ConfigContext"],
    api: ["ConfigContextProviderProps", "ConfigContextProps", "Locale"],
    demos: ["use-config", "custom-theme", "locale", "palette", "brand-color"],
    wc: {
      entry: "config",
      tags: ["minerva-config"],
      demos: ["basic", "palette-design", "locale", "nested", "brand-color"],
    },
    native: {
      exports: [
        "MinervaProvider",
        "ConfigProvider",
        "useTheme",
        "useTokens",
        "useI18n",
        "useInsets",
      ],
      api: [
        "MinervaProviderProps",
        "MinervaTheme",
        "MinervaI18n",
        "NativeLocale",
        "NativeFonts",
      ],
      demos: ["switching", "use-theme"],
    },
  },
  {
    id: "hooks",
    category: "configuration",
    exports: ["useAutoTheme", "useLocale", "useI18n", "useDisclosure", "cn"],
    demos: ["use-auto-theme", "use-locale", "use-disclosure"],
  },
  {
    id: "theme-utils",
    category: "configuration",
    exports: [
      "applyThemeStyles",
      "generateCSSVariables",
      "getSystemTheme",
      "isBilingualTheme",
      "resolveTheme",
      "themes",
      "light",
      "dark",
      "githubDark",
    ],
    api: ["ThemeProps", "SemanticThemeProps", "ComponentThemeProps"],
    demos: ["theme-swatches", "resolve-theme", "scoped-preview"],
  },

  // General
  {
    id: "button",
    cssVars: ["Button"],
    category: "general",
    exports: ["Button"],
    api: ["ButtonProps"],
    demos: [
      "basic",
      "colors",
      "variants",
      "sizes",
      "shapes",
      "states",
      "with-icon",
      "icons-loading",
      "form",
    ],
    wc: {
      entry: "button",
      tags: ["minerva-button"],
      demos: ["basic", "colors-variants", "sizes-shapes", "states", "form"],
    },
    native: {
      exports: ["Button"],
      api: ["ButtonProps"],
      demos: [
        "basic",
        "colors",
        "variants",
        "sizes",
        "shapes",
        "states",
        "with-icon",
        "icons-loading",
        "form",
      ],
    },
  },
  {
    id: "icon-button",
    cssVars: ["IconButton"],
    category: "general",
    exports: ["IconButton"],
    api: ["IconButtonProps"],
    demos: [
      "basic",
      "colors",
      "variants",
      "sizes-and-shapes",
      "states",
      "toggle",
      "search",
      "custom-colors",
      "tooltip",
      "label",
    ],
    wc: {
      entry: "icon-button",
      tags: ["minerva-icon-button"],
      demos: ["basic", "sizes-shapes", "toggle", "states"],
    },
    native: {
      exports: ["IconButton"],
      api: ["IconButtonProps"],
      demos: ["basic", "toggle", "variants-sizes"],
    },
  },

  // Layout
  {
    id: "divider",
    cssVars: ["Divider"],
    category: "layout",
    exports: ["Divider"],
    api: ["DividerProps"],
    demos: [
      "basic",
      "variants",
      "with-text",
      "vertical",
      "flex-item",
      "custom-style",
    ],
    wc: {
      entry: "divider",
      tags: ["minerva-divider"],
      demos: [
        "basic",
        "variants",
        "with-text",
        "vertical",
        "flex-item",
        "custom-style",
      ],
    },
    native: {
      exports: ["Divider"],
      api: ["DividerProps"],
      demos: ["basic", "vertical", "with-text"],
    },
  },
  {
    id: "card",
    cssVars: ["Card"],
    category: "layout",
    exports: [
      "Card",
      "CardHeader",
      "CardTitle",
      "CardDescription",
      "CardContent",
      "CardFooter",
    ],
    api: [
      "CardProps",
      "CardHeaderProps",
      "CardTitleProps",
      "CardDescriptionProps",
      "CardContentProps",
      "CardFooterProps",
    ],
    demos: [
      "basic",
      "variants",
      "padded",
      "interactive",
      "custom-colors",
      "animation",
    ],
    wc: {
      entry: "card",
      tags: [
        "minerva-card",
        "minerva-card-header",
        "minerva-card-content",
        "minerva-card-footer",
        "minerva-card-title",
        "minerva-card-description",
      ],
      demos: ["basic", "variants", "padded", "interactive"],
    },
    native: {
      exports: [
        "Card",
        "CardHeader",
        "CardTitle",
        "CardDescription",
        "CardContent",
        "CardFooter",
      ],
      api: ["CardProps"],
      demos: ["basic", "product", "variants"],
    },
  },
  {
    id: "virtual-list",
    cssVars: ["VirtualList"],
    category: "layout",
    exports: ["VirtualList"],
    api: ["VirtualListProps", "VirtualListItem"],
    demos: [
      "basic",
      "auto-height",
      "infinite-scroll",
      "high-performance",
      "clickable-rows",
    ],
    wc: {
      entry: "virtual-list",
      tags: ["minerva-virtual-list"],
      demos: ["basic", "clickable-rows", "infinite-scroll"],
    },
    native: {
      exports: ["VirtualList"],
      api: ["VirtualListProps"],
      demos: ["basic"],
    },
  },

  // Data entry
  {
    id: "checkbox",
    cssVars: ["Checkbox"],
    category: "dataEntry",
    exports: ["Checkbox"],
    api: ["CheckboxProps"],
    demos: [
      "basic",
      "controlled",
      "indeterminate",
      "sizes-and-shapes",
      "label-placement",
      "states",
      "custom-style",
      "error",
      "colors-and-form-control",
    ],
    native: {
      exports: ["Checkbox"],
      api: ["CheckboxProps"],
      demos: ["basic", "controlled", "indeterminate"],
    },
    wc: {
      entry: "checkbox",
      tags: ["minerva-checkbox"],
      demos: ["basic", "select-all", "styles-states", "form"],
    },
  },
  {
    id: "radio",
    cssVars: ["Radio"],
    category: "dataEntry",
    exports: ["Radio", "RadioGroup"],
    api: ["RadioProps", "RadioGroupProps"],
    demos: [
      "basic",
      "controlled",
      "horizontal",
      "sizes",
      "colors",
      "disabled",
      "validation",
    ],
    native: {
      exports: ["Radio", "RadioGroup"],
      api: ["RadioProps", "RadioGroupProps"],
      demos: ["basic", "controlled", "disabled"],
    },
    wc: {
      entry: "radio",
      tags: ["minerva-radio", "minerva-radio-group"],
      demos: ["basic", "styles-states", "form"],
    },
  },
  {
    id: "switch",
    cssVars: ["Switch"],
    native: {
      exports: ["Switch"],
      api: ["SwitchProps"],
      demos: [
        "basic",
        "controlled",
        "sizes",
        "colors",
        "label-placement",
        "states",
      ],
    },
    category: "dataEntry",
    exports: ["Switch"],
    api: ["SwitchProps"],
    demos: [
      "basic",
      "controlled",
      "sizes",
      "colors",
      "label-placement",
      "states",
      "icons",
      "custom-style",
      "bilateral-and-segmented",
    ],
    wc: {
      entry: "switch",
      tags: ["minerva-switch"],
      demos: ["basic", "styles-states", "side-labels", "form"],
    },
  },
  {
    id: "auto-complete",
    cssVars: ["AutoComplete"],
    category: "dataEntry",
    exports: ["AutoComplete"],
    api: ["AutoCompleteProps", "AutoCompleteOption"],
    demos: [
      "basic",
      "controlled",
      "rich-options",
      "custom-render",
      "grouped",
      "filter-sort",
      "async-loading",
      "appearance",
      "search-box",
    ],
    wc: {
      entry: "autocomplete",
      tags: ["minerva-autocomplete"],
      demos: ["basic", "rich-options", "custom-render", "async-loading"],
    },
    native: {
      exports: ["AutoComplete"],
      api: ["AutoCompleteProps"],
      demos: ["basic"],
    },
  },
  {
    id: "cascader",
    cssVars: ["Cascader"],
    category: "dataEntry",
    exports: ["Cascader"],
    api: ["CascaderProps", "CascaderOption"],
    demos: [
      "basic",
      "default-value",
      "controlled",
      "hover",
      "search",
      "display-render",
      "disabled",
      "lazy-load",
      "custom-option",
    ],
    wc: {
      entry: "cascader",
      tags: ["minerva-cascader"],
      demos: ["basic", "search-hover", "lazy", "form"],
    },
    native: { exports: ["Cascader"], api: ["CascaderProps"], demos: ["basic"] },
  },
  {
    id: "time-picker",
    cssVars: ["TimePicker"],
    category: "dataEntry",
    exports: ["TimePicker"],
    api: ["TimePickerProps"],
    demos: [
      "basic",
      "default-value",
      "controlled",
      "formats",
      "twelve-hour",
      "steps",
      "time-range",
      "sizes",
      "disabled",
    ],
    wc: {
      entry: "time-picker",
      tags: ["minerva-time-picker"],
      demos: ["basic", "formats", "range-steps", "form"],
    },
    native: {
      exports: ["TimePicker"],
      api: ["TimePickerProps"],
      demos: ["basic"],
    },
  },
  {
    id: "date-picker",
    cssVars: ["DatePicker"],
    category: "dataEntry",
    exports: ["DatePicker"],
    api: ["DatePickerProps"],
    demos: [
      "basic",
      "default-value",
      "controlled",
      "min-max",
      "sizes",
      "disabled",
      "form-control",
    ],
    wc: {
      entry: "date-picker",
      tags: ["minerva-date-picker"],
      demos: ["basic"],
    },
    native: {
      exports: ["DatePicker"],
      api: ["DatePickerProps"],
      demos: ["basic"],
    },
  },

  // Data display
  {
    id: "avatar",
    cssVars: ["Avatar"],
    category: "dataDisplay",
    exports: ["Avatar", "AvatarGroup"],
    api: ["AvatarProps", "AvatarGroupProps"],
    demos: ["basic", "shapes", "sizes", "group", "fallback"],
    wc: {
      entry: "avatar",
      tags: ["minerva-avatar", "minerva-avatar-group"],
      demos: ["basic", "shapes-sizes", "group", "fallback"],
    },
    native: {
      exports: ["Avatar", "AvatarGroup"],
      api: ["AvatarProps", "AvatarGroupProps"],
      demos: ["basic", "group", "sizes-shapes"],
    },
  },
  {
    id: "badge",
    cssVars: ["Badge"],
    category: "dataDisplay",
    exports: ["Badge"],
    api: ["BadgeProps"],
    demos: [
      "basic",
      "colors",
      "variants",
      "positions",
      "sizes",
      "dot",
      "with-icon",
      "custom-style",
      "status",
    ],
    wc: {
      entry: "badge",
      tags: ["minerva-badge"],
      demos: ["basic", "colors-variants", "positions", "slots"],
    },
    native: {
      exports: ["Badge"],
      api: ["BadgeProps"],
      demos: ["basic", "colors-variants", "dot-max"],
    },
  },
  {
    id: "tag",
    cssVars: ["Tag"],
    category: "dataDisplay",
    exports: ["Tag"],
    api: ["TagProps"],
    demos: [
      "colors",
      "variants",
      "sizes-shapes",
      "with-icon",
      "closable",
      "clickable",
      "avatar-loading",
      "custom-colors",
      "disabled",
    ],
    wc: {
      entry: "tag",
      tags: ["minerva-tag"],
      demos: ["basic", "variants-sizes", "closable", "toggle"],
    },
    native: {
      exports: ["Tag"],
      api: ["TagProps"],
      demos: ["closable", "colors-variants", "selectable"],
    },
  },
  {
    id: "empty",
    cssVars: ["Empty"],
    category: "dataDisplay",
    exports: ["Empty"],
    api: ["EmptyProps"],
    demos: ["basic", "svg", "custom-icon", "with-action", "sizes", "styled"],
    wc: {
      entry: "empty",
      tags: ["minerva-empty"],
      demos: ["basic", "actions", "sizes-styles"],
    },
    native: { exports: ["Empty"], api: ["EmptyProps"], demos: ["basic"] },
  },
  {
    id: "tooltip",
    cssVars: ["Tooltip"],
    category: "dataDisplay",
    exports: ["Tooltip", "TooltipProvider"],
    api: ["TooltipProps", "TooltipRef", "TooltipProviderProps"],
    demos: [
      "basic",
      "placements",
      "colors",
      "variants",
      "shapes",
      "animations",
      "custom-colors",
      "delays",
      "follow-cursor",
      "controlled",
      "events",
      "as-child",
      "provider",
    ],
    wc: {
      entry: "tooltip",
      tags: ["minerva-tooltip-provider", "minerva-tooltip"],
      demos: ["basic", "styles", "provider", "controlled"],
    },
    native: {
      exports: ["Tooltip", "TooltipProvider"],
      api: ["TooltipProps", "TooltipProviderProps"],
      demos: ["basic"],
    },
  },

  // Feedback
  {
    id: "alert",
    cssVars: ["Alert"],
    category: "feedback",
    exports: ["Alert"],
    api: ["AlertProps"],
    demos: [
      "colors",
      "variants",
      "with-title",
      "sizes",
      "closable",
      "with-action",
      "collapsible",
      "banner",
      "appearance",
      "animations",
      "return-focus",
    ],
    wc: {
      entry: "alert",
      tags: ["minerva-alert"],
      demos: ["basic", "variants-sizes", "closable", "collapsible"],
    },
    native: { exports: ["Alert"], api: ["AlertProps"], demos: ["basic"] },
  },
  {
    id: "progress",
    cssVars: ["ProgressIndicator"],
    category: "feedback",
    exports: ["ProgressIndicator"],
    api: ["ProgressIndicatorProps"],
    demos: [
      "variants",
      "sizes",
      "colors",
      "label",
      "width",
      "with-icon",
      "determinate",
    ],
    wc: {
      entry: "progress",
      tags: ["minerva-progress"],
      demos: ["basic", "sizes-colors", "label-width", "determinate"],
    },
    native: {
      exports: ["ProgressIndicator"],
      api: ["ProgressProps"],
      demos: ["basic"],
    },
  },
  {
    id: "skeleton",
    cssVars: ["Skeleton"],
    category: "feedback",
    exports: ["Skeleton", "SkeletonText"],
    api: ["SkeletonProps", "SkeletonTextProps"],
    demos: [
      "basic",
      "variants",
      "animations",
      "composition",
      "card",
      "loading",
      "decorative",
      "skeleton-text",
    ],
    wc: {
      entry: "skeleton",
      tags: ["minerva-skeleton", "minerva-skeleton-text"],
      demos: ["basic", "variants", "loading", "composition"],
    },
    native: {
      exports: ["Skeleton", "SkeletonText"],
      api: ["SkeletonProps", "SkeletonTextProps"],
      demos: ["basic"],
    },
  },

  // Navigation
  {
    id: "pagination",
    cssVars: ["Pagination"],
    category: "navigation",
    exports: ["Pagination"],
    api: ["PaginationProps", "PaginationLabels"],
    demos: [
      "basic",
      "many-pages",
      "total-and-jumper",
      "size-changer",
      "sizes",
      "shapes-and-variants",
      "simple",
      "custom-render",
      "disabled",
      "responsive",
      "compact",
    ],
    wc: {
      entry: "pagination",
      tags: ["minerva-pagination"],
      demos: ["basic", "total-and-jumper", "appearance", "simple"],
    },
    native: {
      exports: ["Pagination"],
      api: ["PaginationProps"],
      demos: ["basic", "simple"],
    },
  },

  // Layout
  {
    id: "box",
    category: "layout",
    exports: ["Box"],
    api: ["BoxProps"],
    demos: ["basic", "sizing", "polymorphic"],
    wc: {
      entry: "box",
      tags: ["minerva-box"],
      demos: ["basic", "spacing-sizing", "surfaces"],
    },
    native: { exports: ["Box"], api: ["BoxProps"], demos: ["basic"] },
  },
  {
    id: "stack",
    cssVars: ["Stack"],
    category: "layout",
    exports: ["Stack", "HStack", "VStack"],
    api: ["StackProps"],
    demos: ["basic", "horizontal", "gap", "wrap", "separator", "attached"],
    wc: {
      entry: "stack",
      tags: ["minerva-stack", "minerva-hstack", "minerva-vstack"],
      demos: ["basic", "hstack-vstack", "wrap-separator", "attached"],
    },
    native: {
      exports: ["Stack", "HStack", "VStack"],
      api: ["StackProps", "HStackProps", "VStackProps"],
      demos: ["basic"],
    },
  },
  {
    id: "responsive-grid",
    cssVars: ["ResponsiveGrid"],
    category: "layout",
    exports: ["ResponsiveGrid", "GridItem"],
    api: ["ResponsiveGridProps", "GridItemProps"],
    demos: ["basic", "full-width"],
    wc: {
      entry: "responsive-grid",
      tags: ["minerva-responsive-grid", "minerva-grid-item"],
      demos: ["basic", "container", "full-width"],
    },
    native: {
      exports: ["ResponsiveGrid", "GridItem"],
      api: ["ResponsiveGridProps", "GridItemProps"],
      demos: ["basic"],
    },
  },
  {
    id: "split-layout",
    cssVars: ["SplitLayout"],
    category: "layout",
    exports: ["SplitLayout"],
    api: ["SplitLayoutProps"],
    demos: ["basic", "options"],
    wc: {
      entry: "split-layout",
      tags: ["minerva-split-layout"],
      demos: ["basic", "options"],
    },
    native: {
      exports: ["SplitLayout"],
      api: ["SplitLayoutProps"],
      demos: ["basic"],
    },
  },
  {
    id: "page",
    cssVars: ["Page"],
    category: "layout",
    exports: ["Page", "PageHeader", "PageSection", "StatCard", "Toolbar"],
    api: [
      "PageProps",
      "PageHeaderProps",
      "PageSectionProps",
      "StatCardProps",
      "ToolbarProps",
    ],
    demos: ["basic", "stat-cards", "toolbar"],
    wc: {
      entry: "page",
      tags: [
        "minerva-page",
        "minerva-page-header",
        "minerva-page-section",
        "minerva-toolbar",
        "minerva-stat-card",
      ],
      demos: ["basic", "stat-cards", "toolbar"],
    },
    native: {
      exports: ["Page", "PageHeader", "PageSection", "StatCard", "Toolbar"],
      api: [
        "PageProps",
        "PageHeaderProps",
        "PageSectionProps",
        "StatCardProps",
        "ToolbarProps",
      ],
      demos: ["basic"],
    },
  },
  {
    id: "app-shell",
    cssVars: ["AppShell"],
    category: "layout",
    exports: ["AppShell"],
    api: ["AppShellProps", "AppShellNavigationState", "AppShellLabels"],
    demos: ["basic", "controlled", "skip-link"],
    wc: {
      entry: "app-shell",
      tags: ["minerva-app-shell"],
      demos: ["basic", "sidebar-modes", "controlled"],
    },
    native: { exports: ["AppShell"], api: ["AppShellProps"], demos: ["basic"] },
  },

  // Overlays
  {
    id: "modal",
    cssVars: ["Modal"],
    category: "overlays",
    exports: [
      "Modal",
      "ModalRoot",
      "ModalTrigger",
      "ModalClose",
      "ModalContent",
      "ModalHeader",
      "ModalBody",
      "ModalFooter",
    ],
    api: [
      "ModalProps",
      "ModalRootProps",
      "ModalTriggerProps",
      "ModalContentProps",
    ],
    demos: ["basic", "uncontrolled", "sizes", "form", "compound"],
    wc: {
      entry: "modal",
      tags: ["minerva-modal"],
      demos: ["basic", "sizes", "form", "events"],
    },
    native: {
      exports: [
        "Dialog",
        "Modal",
        "ModalRoot",
        "ModalTrigger",
        "ModalClose",
        "ModalContent",
        "ModalHeader",
        "ModalBody",
        "ModalFooter",
      ],
      api: ["DialogProps", "ModalRootProps", "ModalTriggerProps"],
      demos: ["basic", "form", "confirm", "custom-footer"],
    },
  },
  {
    id: "confirm",
    category: "overlays",
    exports: ["ConfirmDialog", "ConfirmProvider", "confirm", "useConfirm"],
    api: ["ConfirmDialogProps", "ConfirmOptions", "ConfirmProviderProps"],
    demos: ["imperative", "colors", "provider", "declarative", "scoped"],
    wc: {
      entry: "confirm",
      tags: ["minerva-confirm-dialog", "minerva-confirm-provider"],
      demos: ["basic", "async", "imperative", "scoped"],
    },
    native: {
      exports: ["ConfirmDialog", "ConfirmProvider"],
      api: ["ConfirmDialogProps", "ConfirmProviderProps"],
      demos: ["basic"],
    },
  },
  {
    id: "drawer",
    cssVars: ["Drawer"],
    category: "overlays",
    exports: [
      "Drawer",
      "DrawerRoot",
      "DrawerTrigger",
      "DrawerClose",
      "DrawerContent",
      "DrawerHeader",
      "DrawerBody",
      "DrawerFooter",
    ],
    api: ["DrawerProps", "DrawerRootProps", "DrawerContentProps"],
    demos: ["basic", "sides", "compound"],
    wc: {
      entry: "drawer",
      tags: ["minerva-drawer"],
      demos: ["basic", "sides", "non-modal"],
    },
    native: {
      exports: [
        "Drawer",
        "DrawerRoot",
        "DrawerTrigger",
        "DrawerClose",
        "DrawerContent",
        "DrawerHeader",
        "DrawerBody",
        "DrawerFooter",
      ],
      api: ["PopupProps"],
      demos: ["basic"],
    },
  },
  {
    id: "command",
    cssVars: ["Command"],
    category: "overlays",
    exports: ["CommandDialog", "normalizeShortcuts", "matchesShortcut"],
    api: ["CommandDialogProps", "CommandItem"],
    demos: ["basic", "shortcut", "custom-filter", "site-search"],
    wc: {
      entry: "command",
      tags: ["minerva-command-dialog"],
      demos: ["basic", "shortcut", "custom-filter"],
    },
    native: {
      exports: ["CommandDialog"],
      api: ["CommandDialogProps"],
      demos: ["basic"],
    },
  },
  {
    id: "popover",
    cssVars: ["Popover"],
    category: "overlays",
    exports: [
      "Popover",
      "PopoverTrigger",
      "PopoverAnchor",
      "PopoverClose",
      "PopoverContent",
    ],
    api: ["PopoverProps", "PopoverContentProps", "PopoverTriggerProps"],
    demos: ["basic", "placement", "controlled"],
    wc: {
      entry: "popover",
      tags: ["minerva-popover"],
      demos: ["basic", "placement", "anchor"],
    },
    native: {
      exports: [
        "Popover",
        "PopoverTrigger",
        "PopoverAnchor",
        "PopoverClose",
        "PopoverContent",
      ],
      api: ["PopoverProps", "PopoverTriggerProps", "PopoverContentProps"],
      demos: ["basic"],
    },
  },

  {
    id: "menu",
    cssVars: ["Menu"],
    category: "overlays",
    exports: ["Menu", "ContextMenu"],
    api: [
      "MenuProps",
      "ContextMenuProps",
      "MenuAction",
      "MenuCheckboxEntry",
      "MenuRadioGroupEntry",
      "MenuRadioItem",
      "MenuSeparatorEntry",
      "MenuGroupEntry",
    ],
    demos: [
      "basic",
      "triggers",
      "groups",
      "submenus",
      "checkbox-radio",
      "placement",
      "disabled",
      "context-menu",
      "controlled",
    ],
    wc: {
      entry: "menu",
      tags: [
        "minerva-context-menu",
        "minerva-menu-item",
        "minerva-menu-checkbox-item",
        "minerva-menu-radio-item",
        "minerva-menu-group",
        "minerva-menu-separator",
        "minerva-menu-label",
        "minerva-menu",
      ],
      demos: ["basic", "checkbox-radio", "items", "context-menu"],
    },
    native: {
      exports: ["Menu", "ContextMenu"],
      api: ["MenuProps", "ContextMenuProps"],
      demos: ["basic"],
    },
  },
  {
    id: "toast",
    cssVars: ["Toast"],
    category: "feedback",
    exports: ["ToastProvider", "toast", "useToast"],
    api: [
      "ToastOptions",
      "ToastAction",
      "ToastProviderProps",
      "ToastApi",
      "ToastPromiseMessages",
    ],
    demos: [
      "basic",
      "colors",
      "options",
      "loading",
      "action",
      "dedupe",
      "scoped",
      "keyboard",
    ],
    native: {
      exports: ["ToastProvider", "toast", "useToast"],
      api: ["ToastOptions", "ToastApi", "ToastProviderProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "toast",
      tags: ["minerva-toast-region"],
      demos: ["basic", "options", "loading"],
    },
  },
  {
    id: "page-tabs",
    cssVars: ["PageTabs"],
    category: "navigation",
    exports: ["PageTabs", "PageTab"],
    api: ["PageTabsProps", "PageTabProps"],
    demos: ["basic", "context-menu", "overflow"],
    wc: {
      entry: "page-tabs",
      tags: ["minerva-page-tabs", "minerva-page-tab"],
      demos: ["basic", "actions", "overflow"],
    },
    native: {
      exports: ["PageTabs", "PageTab"],
      api: ["PageTabsProps", "PageTabProps"],
      demos: ["basic"],
    },
  },

  // Forms
  {
    id: "form-control",
    cssVars: ["FormControl"],
    category: "dataEntry",
    exports: [
      "FormControl",
      "FormLabel",
      "FormHelperText",
      "FormErrorMessage",
      "FormField",
      "useFormControlContext",
      "useFormControlProps",
    ],
    api: ["FormControlProps", "FormLabelProps", "FormFieldProps"],
    demos: ["basic", "form-field", "states", "custom-control"],
    wc: {
      entry: "form-control",
      tags: ["minerva-form-control"],
      demos: ["basic", "states", "slots", "form"],
    },
    native: {
      exports: [
        "FormControl",
        "FormLabel",
        "FormHelperText",
        "FormErrorMessage",
        "FormField",
      ],
      api: ["FormControlProps", "FormFieldProps"],
      demos: ["basic"],
    },
  },
  {
    id: "form-layout",
    cssVars: ["FormLayout"],
    category: "dataEntry",
    exports: ["FormLayout"],
    api: ["FormLayoutProps"],
    demos: ["basic", "gaps"],
    wc: {
      entry: "form-layout",
      tags: ["minerva-form-layout"],
      demos: ["basic", "gaps"],
    },
    native: {
      exports: ["FormLayout"],
      api: ["FormLayoutProps"],
      demos: ["basic"],
    },
  },
  {
    id: "input",
    cssVars: ["Input"],
    native: {
      exports: ["Input"],
      api: ["InputProps"],
      demos: ["basic", "states", "sizes-variants", "clearable-and-count"],
    },
    category: "dataEntry",
    exports: ["Input"],
    api: ["InputProps"],
    demos: [
      "basic",
      "sizes-variants",
      "addons",
      "clearable-and-count",
      "password",
      "states",
      "validation",
    ],
    wc: {
      entry: "input",
      tags: ["minerva-input"],
      demos: ["basic", "sizes-variants", "addons", "form"],
    },
  },
  {
    id: "textarea",
    cssVars: ["Textarea"],
    category: "dataEntry",
    exports: ["Textarea"],
    api: ["TextareaProps"],
    demos: ["basic", "sizes-variants", "form-control"],
    wc: {
      entry: "textarea",
      tags: ["minerva-textarea"],
      demos: ["basic", "sizes-variants", "form"],
    },
    native: { exports: ["Textarea"], api: ["TextareaProps"], demos: ["basic"] },
  },
  {
    id: "number-input",
    cssVars: ["NumberInput"],
    category: "dataEntry",
    exports: ["NumberInput"],
    api: ["NumberInputProps"],
    demos: ["basic", "stepper-precision", "form-control"],
    wc: {
      entry: "number-input",
      tags: ["minerva-number-input"],
      demos: ["basic", "precision", "form"],
    },
    native: {
      exports: ["NumberInput"],
      api: ["NumberInputProps"],
      demos: ["basic"],
    },
  },
  {
    id: "json-field",
    cssVars: ["JsonField"],
    category: "dataEntry",
    exports: ["JsonField"],
    api: ["JsonFieldProps"],
    demos: ["basic", "indent", "form-control"],
    wc: {
      entry: "json-field",
      tags: ["minerva-json-field"],
      demos: ["basic", "options", "form"],
    },
    native: {
      exports: ["JsonField"],
      api: ["JsonFieldProps"],
      demos: ["basic"],
    },
  },
  {
    id: "key-value-editor",
    cssVars: ["KeyValueEditor"],
    category: "dataEntry",
    exports: ["KeyValueEditor"],
    api: ["KeyValueEditorProps", "KeyValueEntry", "KeyValueEntryErrors"],
    demos: ["basic", "errors"],
    wc: {
      entry: "key-value-editor",
      tags: ["minerva-key-value-editor"],
      demos: ["basic", "errors", "form"],
    },
    native: {
      exports: ["KeyValueEditor"],
      api: ["KeyValueEditorProps"],
      demos: ["basic"],
    },
  },
  {
    id: "tag-input",
    cssVars: ["TagInput"],
    category: "dataEntry",
    exports: ["TagInput"],
    api: ["TagInputProps"],
    demos: ["basic", "form-control", "separators"],
    wc: {
      entry: "tag-input",
      tags: ["minerva-tag-input"],
      demos: ["basic", "separators", "states", "form"],
    },
    native: { exports: ["TagInput"], api: ["TagInputProps"], demos: ["basic"] },
  },

  {
    id: "loading-state",
    cssVars: ["LoadingState"],
    category: "feedback",
    exports: ["LoadingState"],
    api: ["LoadingStateProps"],
    demos: ["basic", "sizes"],
    wc: {
      entry: "loading-state",
      tags: ["minerva-loading-state"],
      demos: ["basic", "sizes", "section"],
    },
    native: {
      exports: ["LoadingState"],
      api: ["LoadingProps"],
      demos: ["basic"],
    },
  },
  {
    id: "text-link",
    cssVars: ["TextLink"],
    category: "dataDisplay",
    exports: ["TextLink"],
    api: ["TextLinkProps"],
    demos: ["variants", "as-child"],
    wc: {
      entry: "text-link",
      tags: ["minerva-text-link"],
      demos: ["basic", "variants", "styling"],
    },
    native: { exports: ["TextLink"], api: ["TextLinkProps"], demos: ["basic"] },
  },
  {
    id: "description-list",
    cssVars: ["DescriptionList"],
    category: "dataDisplay",
    exports: ["DescriptionList"],
    api: ["DescriptionListProps", "DescriptionListItem"],
    demos: ["basic", "variants"],
    wc: {
      entry: "description-list",
      tags: ["minerva-description-item", "minerva-description-list"],
      demos: ["basic", "items", "variants", "styling"],
    },
    native: {
      exports: ["DescriptionList"],
      api: ["DescriptionListProps"],
      demos: ["basic"],
    },
  },
  {
    id: "list",
    cssVars: ["List"],
    category: "dataDisplay",
    exports: ["List", "ListItem"],
    api: ["ListProps", "ListItemProps"],
    demos: ["basic", "compact", "bordered"],
    wc: {
      entry: "list",
      tags: ["minerva-list", "minerva-list-item"],
      demos: ["basic", "slots", "density", "bordered"],
    },
    native: {
      exports: ["Cell", "CellGroup", "List", "ListItem"],
      api: ["CellProps", "CellGroupProps", "ListProps", "ListItemProps"],
      demos: ["basic", "inset-groups", "rich-rows"],
    },
  },
  {
    id: "code-block",
    cssVars: ["CodeBlock"],
    category: "dataDisplay",
    exports: ["CodeBlock"],
    api: ["CodeBlockProps"],
    demos: [
      "basic",
      "languages",
      "auto-language",
      "line-numbers",
      "no-wrap",
      "copyable",
      "marks",
    ],
    wc: {
      entry: "code-block",
      tags: ["minerva-code-block"],
      demos: [
        "basic",
        "languages",
        "auto-language",
        "line-numbers",
        "copy",
        "overflow",
        "marks",
      ],
    },
    native: {
      exports: ["CodeBlock"],
      api: ["CodeBlockProps"],
      demos: ["basic", "marks"],
    },
  },
  {
    id: "prose",
    cssVars: ["Prose"],
    category: "dataDisplay",
    exports: ["Prose"],
    api: ["ProseProps"],
    demos: ["basic", "as-child"],
    wc: {
      entry: "prose",
      tags: ["minerva-prose"],
      demos: ["basic", "rich-content", "scopes"],
    },
    native: { exports: ["Prose"], api: ["ProseProps"], demos: ["basic"] },
  },
  {
    id: "design-presets",
    category: "theming",
    api: ["DesignOptions"],
    demos: ["presets", "axes"],
  },
  {
    id: "theme-palette",
    cssVars: ["ThemeToggle"],
    category: "theming",
    exports: [
      "ThemeProvider",
      "useTheme",
      "ThemeToggle",
      "PaletteToggle",
      "palettes",
    ],
    api: [
      "ThemeProviderProps",
      "ThemeContextValue",
      "ThemeToggleProps",
      "PaletteToggleProps",
    ],
    demos: ["toggles", "palette-swatches", "use-theme"],
    wc: {
      entry: "theme-toggle",
      tags: ["minerva-theme-toggle", "minerva-palette-toggle"],
      demos: ["basic", "palette", "events"],
    },
    native: {
      exports: [
        "ThemeToggle",
        "PaletteToggle",
        "PresetToggle",
        "ThemeProvider",
      ],
      api: [
        "ThemeToggleProps",
        "PaletteToggleProps",
        "PresetToggleProps",
        "MinervaProviderProps",
      ],
      demos: ["preset", "toggles"],
    },
  },
  {
    id: "table",
    cssVars: ["Table"],
    category: "dataDisplay",
    exports: [
      "Table",
      "TableRoot",
      "TableHead",
      "TableBody",
      "TableRow",
      "TableHeader",
      "TableCell",
      "TableCellContent",
      "DataTable",
      "computeFixedColumnLayout",
    ],
    api: [
      "TableProps",
      "TableColumn",
      "DataTableProps",
      "TableRootProps",
      "TableScrollConfig",
      "TableSortState",
      "TableRowSelection",
      "TableCellContentProps",
      "FixedColumnLayout",
    ],
    demos: [
      "basic",
      "variants",
      "fixed-columns",
      "states",
      "data-table",
      "compound",
      "cell-content",
      "sorting",
      "selection",
    ],
    wc: {
      entry: "data-table",
      tags: ["minerva-data-table", "minerva-table-cell-content"],
      demos: ["basic", "pagination", "selection", "sorting"],
    },
    native: {
      exports: [
        "Table",
        "TableRoot",
        "TableHead",
        "TableBody",
        "TableRow",
        "TableHeader",
        "TableCell",
        "TableCellContent",
        "DataTable",
      ],
      api: ["TableProps", "TableCellContentProps", "DataTableProps"],
      demos: ["basic"],
    },
  },
  {
    id: "nav-tree",
    cssVars: ["NavTree"],
    category: "navigation",
    exports: ["NavTree"],
    api: ["NavTreeProps", "NavTreeSection", "NavTreeItem", "NavTreeItemState"],
    demos: ["basic", "collapsed", "custom-link"],
    wc: {
      entry: "nav-tree",
      tags: ["minerva-nav-tree"],
      demos: ["basic", "collapsed", "expansion"],
    },
    native: { exports: ["NavTree"], api: ["NavTreeProps"], demos: ["basic"] },
  },
  {
    id: "tabs",
    cssVars: ["Tabs"],
    category: "navigation",
    exports: ["Tabs", "TabList", "Tab", "TabPanel"],
    api: ["TabsProps", "TabListProps", "TabProps", "TabPanelProps"],
    demos: ["basic", "variants", "colors", "vertical"],
    wc: {
      entry: "tabs",
      tags: ["minerva-tabs", "minerva-tab", "minerva-tab-panel"],
      demos: ["basic", "variants", "vertical", "controlled", "panels"],
    },
    native: {
      exports: ["Tabs", "TabList", "Tab", "TabPanel"],
      api: [
        "TabsProps",
        "TabListProps",
        "TabProps",
        "TabPanelProps",
        "TabsItemData",
      ],
      demos: ["basic", "compound", "scrollable", "variants"],
    },
  },
  {
    id: "html-preview",
    cssVars: ["HtmlPreview"],
    category: "dataDisplay",
    exports: ["HtmlPreview"],
    api: ["HtmlPreviewProps"],
    demos: ["basic", "viewports"],
    wc: {
      entry: "html-preview",
      tags: ["minerva-html-preview"],
      demos: ["basic", "viewport", "sanitized"],
    },
    native: {
      exports: ["HtmlPreview"],
      api: ["HtmlPreviewProps"],
      demos: ["basic"],
    },
  },
  {
    id: "monaco-code-editor",
    cssVars: ["MonacoCodeEditor"],
    category: "editors",
    api: ["MonacoCodeEditorProps"],
    demos: ["basic"],
    wc: {
      // optional entry (not in the all-in-one entry nor the CDN bundle)
      entry: "code-editor",
      tags: ["minerva-code-editor"],
      demos: ["basic", "fallback"],
    },
    native: {
      exports: ["CodeEditor"],
      api: ["CodeEditorProps"],
      demos: ["basic"],
    },
  },
  {
    id: "steps",
    cssVars: ["Steps"],
    category: "navigation",
    exports: ["Steps"],
    api: ["StepsProps", "StepsItem"],
    demos: ["basic", "read-only", "styling"],
    wc: {
      entry: "steps",
      tags: ["minerva-steps"],
      demos: ["basic", "navigable", "styling"],
    },
    native: {
      exports: ["Steps"],
      api: ["StepsProps", "StepsItem"],
      demos: ["basic", "vertical"],
    },
  },
  {
    id: "answer-sheet",
    cssVars: ["AnswerSheet"],
    category: "navigation",
    exports: ["AnswerSheet"],
    api: ["AnswerSheetProps", "AnswerSheetItem", "AnswerSheetGroup"],
    demos: ["basic", "groups", "scroll", "sizes"],
    wc: {
      entry: "answer-sheet",
      tags: ["minerva-answer-sheet"],
      demos: ["basic", "groups", "scroll", "sizes"],
    },
    native: {
      exports: ["AnswerSheet"],
      api: ["AnswerSheetProps", "AnswerSheetItem"],
      demos: ["basic"],
    },
  },
  {
    id: "upload",
    cssVars: ["Upload"],
    category: "dataEntry",
    exports: ["Upload"],
    api: ["UploadProps", "UploadItem", "UploadLabels"],
    demos: ["basic", "multiple"],
    wc: {
      entry: "upload",
      tags: ["minerva-upload"],
      demos: ["basic", "transfer", "form"],
    },
    native: { exports: ["Upload"], api: ["UploadProps"], demos: ["basic"] },
  },
  {
    id: "select",
    cssVars: ["Select"],
    category: "dataEntry",
    exports: [
      "Select",
      "SelectItem",
      "SelectGroup",
      "SelectLabel",
      "SelectSeparator",
    ],
    api: [
      "SelectProps",
      "SelectItemProps",
      "SelectGroupProps",
      "SelectLabelProps",
      "SelectSeparatorProps",
    ],
    demos: ["basic", "groups", "sizes-and-states"],
    native: {
      exports: [
        "Select",
        "SelectItem",
        "SelectGroup",
        "SelectLabel",
        "SelectSeparator",
      ],
      api: [
        "SelectSingleProps",
        "SelectMultipleProps",
        "SelectOption",
        "SelectProps",
        "SelectItemProps",
        "SelectGroupProps",
      ],
      demos: ["basic"],
    },
    wc: {
      entry: "select",
      tags: [
        "minerva-option",
        "minerva-option-group",
        "minerva-select-label",
        "minerva-select-separator",
        "minerva-select",
      ],
      demos: ["basic", "groups", "options-property", "form"],
    },
  },
  {
    id: "rating",
    cssVars: ["Rating"],
    category: "dataEntry",
    exports: ["Rating", "RatingScale"],
    api: ["RatingProps", "RatingScaleProps", "RatingDimension"],
    demos: ["basic", "interactive", "scale"],
    wc: {
      entry: "rating",
      tags: ["minerva-rating", "minerva-rating-scale"],
      demos: ["basic", "interactive", "form", "scale"],
    },
    native: {
      exports: ["Rating", "RatingScale"],
      api: ["RatingProps", "RatingScaleProps"],
      demos: ["basic"],
    },
  },
  {
    id: "slider",
    cssVars: ["Slider"],
    category: "dataEntry",
    exports: ["Slider"],
    api: ["SliderProps"],
    demos: ["basic", "range", "marks", "sizes-colors", "committed", "disabled"],
    wc: {
      entry: "slider",
      tags: ["minerva-slider"],
      demos: [
        "basic",
        "range",
        "marks",
        "sizes-colors",
        "committed",
        "disabled",
      ],
    },
    native: {
      exports: ["Slider"],
      api: ["SliderProps"],
      demos: ["basic", "vertical"],
    },
  },
  {
    id: "segmented-control",
    cssVars: ["SegmentedControl"],
    category: "dataEntry",
    exports: ["SegmentedControl"],
    api: ["SegmentedControlProps", "SegmentedControlOptionObject"],
    demos: ["basic", "icons", "sizes", "full-width", "colors"],
    wc: {
      entry: "segmented-control",
      tags: ["minerva-segmented-control"],
      demos: ["basic", "icons", "sizes", "full-width", "colors"],
    },
    native: {
      exports: ["SegmentedControl"],
      api: ["SegmentedControlProps"],
      demos: ["basic"],
    },
  },
  {
    id: "month-calendar",
    cssVars: ["MonthCalendar"],
    category: "dataDisplay",
    exports: ["MonthCalendar"],
    api: ["MonthCalendarProps", "MonthCalendarEvent"],
    demos: ["basic", "sizes", "range"],
    wc: {
      entry: "month-calendar",
      tags: ["minerva-month-calendar"],
      demos: ["basic", "events", "sizes", "range", "localized"],
    },
    native: {
      exports: ["MonthCalendar"],
      api: ["CalendarProps"],
      demos: ["basic"],
    },
  },
  {
    id: "week-strip",
    cssVars: ["WeekStrip"],
    category: "dataDisplay",
    exports: ["WeekStrip"],
    api: ["WeekStripProps"],
    demos: ["basic", "markers", "navigation", "sizes"],
    wc: {
      entry: "week-strip",
      tags: ["minerva-week-strip"],
      demos: ["basic", "markers", "navigation", "sizes"],
    },
    native: {
      exports: ["WeekStrip"],
      api: ["WeekStripProps"],
      demos: ["basic"],
    },
  },
  {
    id: "media-player",
    cssVars: ["MediaPlayer"],
    category: "dataDisplay",
    exports: ["MediaPlayer"],
    api: ["MediaPlayerProps", "MediaPlayerHandle", "MediaPlayerTrack"],
    demos: ["video", "audio", "resume", "rates-skip", "captions"],
    wc: {
      entry: "media-player",
      tags: ["minerva-media-player"],
      demos: ["video", "audio", "resume", "rates-skip", "captions"],
    },
    native: {
      exports: ["MediaControls"],
      api: ["MediaControlsProps"],
      demos: ["basic", "captions"],
    },
  },
  {
    id: "dashboard-columns",
    cssVars: ["DashboardColumns"],
    category: "dataDisplay",
    exports: ["DashboardColumns", "DashboardColumn", "DashboardCard"],
    api: [
      "DashboardColumnsProps",
      "DashboardColumnProps",
      "DashboardCardProps",
    ],
    demos: ["basic", "colors", "empty-actions", "fixed-height", "drag-drop"],
    wc: {
      entry: "dashboard-columns",
      tags: [
        "minerva-dashboard-columns",
        "minerva-dashboard-column",
        "minerva-dashboard-card",
      ],
      demos: ["basic", "colors", "empty-actions", "fixed-height", "drag-drop"],
    },
    native: {
      exports: ["DashboardColumns", "DashboardColumn", "DashboardCard"],
      api: [
        "DashboardColumnsProps",
        "DashboardColumnProps",
        "DashboardCardProps",
      ],
      demos: ["basic", "drag-drop"],
    },
  },
  {
    id: "flashcard",
    cssVars: ["Flashcard"],
    category: "dataDisplay",
    exports: ["Flashcard"],
    api: ["FlashcardProps"],
    demos: ["basic", "controlled", "axis-variants", "reduced-disabled"],
    wc: {
      entry: "flashcard",
      tags: ["minerva-flashcard"],
      demos: ["basic", "controlled", "axis-variants", "reduced-disabled"],
    },
    native: {
      exports: ["Flashcard"],
      api: ["FlashcardProps"],
      demos: ["basic"],
    },
  },

  // Charts (minerva-design/charts: GPU engine + React components)
  {
    id: "charts",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["Chart"],
    api: [
      "ChartProps",
      "ChartCommonProps",
      "ChartHandle",
      "ChartSeries",
      "ChartPointDatum",
      "ChartColumnData",
      "ChartAxisOptions",
      "ChartRectAnnotation",
      "ChartLineAnnotation",
      "ChartTextAnnotation",
      "ChartInteractionOptions",
      "ChartTooltipOptions",
      "ChartLegendOptions",
      "ChartPadding",
      "ChartHoverEvent",
      "ChartHoverItem",
      "ChartPlotClickEvent",
      "ChartView",
    ],
    demos: [
      "gallery",
      "gallery-statistics",
      "gallery-relations",
      "gallery-graphs",
      "gallery-finance",
      "gallery-3d",
      "mixed",
      "dashboard",
      "renderers",
      "annotations",
      "palette",
    ],
    native: {
      exports: ["Chart"],
      api: ["ChartProps", "ChartCommonProps", "ChartHandle"],
      demos: ["mixed"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-chart", "minerva-shape-chart"],
      demos: ["mixed-series", "events"],
    },
  },
  {
    id: "line-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["LineChart"],
    api: ["LineChartProps"],
    demos: [
      "basic",
      "area",
      "curves",
      "stacked",
      "time-series",
      "traffic-events",
      "gaps",
      "thresholds",
      "zoom",
      "large-data",
      "live-sensor",
      "log-scale",
      "measure",
      "index-tooltip",
      "small-multiples",
    ],
    native: {
      exports: ["LineChart"],
      api: ["LineChartProps"],
      demos: ["basic", "area"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-line-chart"],
      demos: ["trend", "reset-zoom"],
    },
  },
  {
    id: "area-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["AreaChart"],
    api: ["AreaChartProps"],
    demos: [
      "basic",
      "stacked",
      "percent",
      "step",
      "energy-mix",
      "cumulative",
      "mirrored",
      "zoom-total",
      "hover-panel",
      "year-over-year",
      "disk-forecast",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-area-chart"],
      demos: ["stacked", "percent"],
    },
    native: {
      exports: ["AreaChart"],
      api: ["AreaChartProps"],
      demos: ["basic"],
    },
  },
  {
    id: "range-area-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["RangeAreaChart"],
    api: ["RangeAreaChartProps"],
    demos: [
      "forecast",
      "temperature",
      "fan",
      "price-range",
      "anomaly-band",
      "bid-ask",
      "climate-scenarios",
      "ab-test",
    ],
    native: {
      exports: ["RangeAreaChart"],
      api: ["RangeAreaChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-range-area-chart"],
      demos: ["forecast", "temperature"],
    },
  },
  {
    id: "bar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BarChart"],
    api: ["BarChartProps"],
    demos: [
      "basic",
      "stacked",
      "labels",
      "percent",
      "combo",
      "grouped",
      "profit-loss",
      "ranking",
      "target",
      "drilldown",
      "period-compare",
      "deployments",
      "ev-charging",
    ],
    native: {
      exports: ["BarChart"],
      api: ["BarChartProps"],
      demos: ["basic", "stacked"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-bar-chart"],
      demos: ["grouped", "stacked"],
    },
  },
  {
    id: "horizontal-bar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["HorizontalBarChart"],
    api: ["HorizontalBarChartProps"],
    demos: [
      "basic",
      "diverging",
      "progress",
      "long-labels",
      "grouped",
      "negative",
      "top-n",
      "race",
      "salary-bands",
      "error-budget",
    ],
    native: {
      exports: ["HorizontalBarChart"],
      api: ["HorizontalBarChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-horizontal-bar-chart"],
      demos: ["ranking", "survey"],
    },
  },
  {
    id: "mixed-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["MixedChart"],
    api: ["MixedChartProps", "ChartProps", "ChartLabels"],
    demos: [
      "revenue-growth",
      "climate",
      "conversion",
      "pareto",
      "log-scale",
      "locale",
      "solar-battery",
      "inventory",
      "ops-overview",
      "burndown",
    ],
    native: {
      exports: ["MixedChart"],
      api: ["MixedChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-mixed-chart"],
      demos: ["revenue-growth", "climate"],
    },
  },
  {
    id: "scatter-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["ScatterChart"],
    api: ["ScatterChartProps"],
    demos: [
      "basic",
      "labels",
      "trend",
      "categories",
      "outliers",
      "large-data",
      "zoom-controls",
      "selection",
      "players",
      "live-stream",
      "log-log",
    ],
    native: {
      exports: ["ScatterChart"],
      api: ["ScatterChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-scatter-chart"],
      demos: ["clusters", "point-click"],
    },
  },
  {
    id: "bubble-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BubbleChart", "bubbleSeries"],
    api: ["BubbleChartProps", "BubbleOptions"],
    demos: [
      "countries",
      "log-scale",
      "portfolio",
      "pipeline",
      "risk-matrix",
      "campaigns",
      "shared-scale",
      "playback",
    ],
    native: {
      exports: ["BubbleChart"],
      api: ["BubbleChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-bubble-chart"],
      demos: ["countries", "portfolio"],
    },
  },
  {
    id: "quadrant-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["QuadrantChart"],
    api: [
      "QuadrantChartProps",
      "QuadrantConfig",
      "QuadrantDropTarget",
      "QuadrantHeaderInfo",
      "QuadrantPoint",
      "QuadrantRegions",
      "QuadrantRegion",
      "QuadrantAxisLabels",
    ],
    demos: [
      "basic",
      "eisenhower",
      "draggable",
      "triage",
      "quadrant-header",
      "bcg",
      "risk",
      "positioning",
      "rice",
      "swot",
      "competitors",
      "talent",
      "live-services",
    ],
    native: {
      exports: ["QuadrantChart"],
      api: ["QuadrantChartProps", "QuadrantConfig", "QuadrantDropTarget"],
      demos: ["basic", "draggable", "triage"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-quadrant-chart"],
      demos: ["priorities", "point-click", "triage"],
    },
  },
  {
    // exported by minerva-design (it renders Modal, Input, Select...), built
    // on the quadrant chart of minerva-design/charts
    id: "quadrant-task-board",
    category: "charts",
    cssVars: ["QuadrantTaskBoard"],
    exports: ["QuadrantTaskBoard"],
    api: ["QuadrantTaskBoardProps", "QuadrantTaskLabels", "QuadrantConfig"],
    demos: ["basic", "custom-labels"],
    wc: {
      entry: "quadrant-task-board",
      tags: ["minerva-quadrant-task-board"],
      demos: ["basic"],
    },
    native: {
      exports: ["QuadrantTaskBoard"],
      api: ["QuadrantTaskBoardProps"],
      demos: ["basic"],
    },
  },
  {
    id: "histogram-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["HistogramChart", "binValues", "histogramSeries", "quantiles"],
    api: ["HistogramChartProps", "BinOptions", "HistogramBins"],
    demos: [
      "latency",
      "binning",
      "ages",
      "comparison",
      "quality-control",
      "order-values",
      "live-samples",
      "commute",
    ],
    native: {
      exports: ["HistogramChart"],
      api: ["HistogramChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-histogram-chart"],
      demos: ["latency", "binning"],
    },
  },
  {
    id: "boxplot-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BoxPlotChart", "boxplotStats", "boxplotData"],
    api: [
      "BoxPlotChartProps",
      "BoxplotGroup",
      "BoxplotStats",
      "BoxplotStatsOptions",
      "ChartTooltipLabels",
    ],
    demos: [
      "services",
      "horizontal",
      "grouped",
      "temperatures",
      "build-times",
      "wait-times",
      "asset-sizes",
      "live-regions",
    ],
    native: {
      exports: ["BoxPlotChart"],
      api: ["BoxPlotChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-box-plot-chart"],
      demos: ["services", "horizontal"],
    },
  },
  {
    id: "waterfall-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["WaterfallChart", "waterfallSeries"],
    api: [
      "WaterfallChartProps",
      "WaterfallStep",
      "WaterfallOptions",
      "ChartConnectorOptions",
    ],
    demos: [
      "pnl",
      "cash-flow",
      "variance",
      "headcount",
      "arr-bridge",
      "price-bridge",
      "emissions",
      "lead-time",
      "live-balance",
      "options",
    ],
    native: {
      exports: ["WaterfallChart"],
      api: ["WaterfallChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-waterfall-chart"],
      demos: ["pnl", "cash-flow"],
    },
  },
  {
    id: "gantt-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["GanttChart", "ganttSeries"],
    api: ["GanttChartProps", "GanttTask", "GanttOptions"],
    demos: [
      "project",
      "dependencies",
      "crews",
      "roadmap",
      "sprint",
      "locale",
      "release-train",
      "critical-path",
      "resources",
      "live-deploy",
      "onboarding",
      "daily",
    ],
    native: {
      exports: ["GanttChart"],
      api: ["GanttChartProps"],
      demos: ["basic", "daily"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-gantt-chart"],
      demos: ["project", "sprint", "daily"],
    },
  },
  {
    id: "heatmap-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["HeatmapChart"],
    api: ["HeatmapChartProps", "HeatmapConfig", "HeatmapCell"],
    demos: [
      "basic",
      "color-scale",
      "activity",
      "correlation",
      "retention",
      "large-grid",
      "conversion",
      "rack-temperatures",
      "confusion-matrix",
      "sales-regions",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-heatmap-chart"],
      demos: ["weekly-activity", "color-scale"],
    },
    native: {
      exports: ["HeatmapChart"],
      api: ["HeatmapChartProps"],
      demos: ["basic"],
    },
  },
  {
    id: "calendar-heatmap",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["CalendarHeatmap"],
    api: ["CalendarHeatmapProps", "CalendarDatum"],
    demos: [
      "contributions",
      "streak",
      "multi-year",
      "months",
      "locale",
      "energy",
      "sleep",
      "incidents",
      "habit-toggle",
    ],
    native: {
      exports: ["CalendarHeatmap"],
      api: ["CalendarHeatmapProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-calendar-heatmap"],
      demos: ["contributions", "months"],
    },
  },
  {
    id: "sparkline",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["Sparkline"],
    api: ["SparklineProps", "SparklineConfig"],
    demos: [
      "basic",
      "kpi-cards",
      "table",
      "watchlist",
      "inline",
      "servers",
      "hover-value",
      "step-goal",
      "weather",
      "periods",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-sparkline"],
      demos: ["kpi", "reference"],
    },
    native: {
      exports: ["Sparkline"],
      api: ["SparklineProps"],
      demos: ["basic"],
    },
  },
  {
    id: "pie-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["PieChart", "DonutChart"],
    api: [
      "PieChartProps",
      "DonutChartProps",
      "ShapeChartCommonProps",
      "ShapeDatum",
      "ShapeHoverEvent",
      "ShapeLegendOptions",
      "ShapeTooltipOptions",
    ],
    demos: [
      "basic",
      "donut",
      "rose",
      "labels",
      "market-share",
      "nested",
      "small-multiples",
      "portfolio",
      "live-poll",
      "drill-down",
      "survey-quarters",
    ],
    native: {
      exports: ["PieChart", "DonutChart"],
      api: [
        "PieChartProps",
        "DonutChartProps",
        "ShapeChartCommonProps",
        "ShapeChartFrameProps",
        "ShapeChartHandle",
      ],
      demos: ["basic", "donut"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-pie-chart", "minerva-donut-chart"],
      demos: ["pie", "donut"],
    },
  },
  {
    id: "radial-bar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["RadialBarChart"],
    api: ["RadialBarChartProps", "RadialBarDatum"],
    demos: [
      "activity",
      "okr",
      "quota",
      "styles",
      "savings-goals",
      "leaderboard",
      "uploads",
      "survey",
    ],
    native: {
      exports: ["RadialBarChart"],
      api: ["RadialBarChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-radial-bar-chart"],
      demos: ["activity", "okr"],
    },
  },
  {
    id: "radar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["RadarChart"],
    api: ["RadarChartProps", "RadarIndicator", "RadarSeries"],
    demos: [
      "basic",
      "compare",
      "circle",
      "players",
      "capabilities",
      "nutrition",
      "live-monitor",
      "review-360",
      "sales-targets",
    ],
    native: {
      exports: ["RadarChart"],
      api: ["RadarChartProps"],
      demos: ["basic", "compare"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-radar-chart"],
      demos: ["compare", "circle"],
    },
  },
  {
    id: "gauge-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["GaugeChart"],
    api: ["GaugeChartProps", "GaugeBand"],
    demos: [
      "basic",
      "bands",
      "live",
      "speedometer",
      "quota",
      "slo",
      "thermostat",
      "credit-score",
      "battery",
      "dark-panel",
    ],
    native: {
      exports: ["GaugeChart"],
      api: ["GaugeChartProps"],
      demos: ["basic", "bands"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-gauge-chart"],
      demos: ["bands", "needle"],
    },
  },
  {
    id: "bullet-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BulletChart"],
    api: ["BulletChartProps", "BulletDatum"],
    demos: [
      "sales",
      "vertical",
      "traffic-lights",
      "monthly",
      "long-names",
      "budget-tracker",
      "live-sensors",
      "training",
      "hiring-plan",
    ],
    native: {
      exports: ["BulletChart"],
      api: ["BulletChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-bullet-chart"],
      demos: ["kpis", "vertical"],
    },
  },
  {
    id: "funnel-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["FunnelChart"],
    api: ["FunnelChartProps"],
    demos: [
      "basic",
      "bars",
      "ecommerce",
      "recruiting",
      "compare",
      "campaigns",
      "what-if",
      "live-sale",
      "sales-pipeline",
    ],
    native: {
      exports: ["FunnelChart"],
      api: ["FunnelChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-funnel-chart"],
      demos: ["conversion", "bars"],
    },
  },
  {
    id: "treemap-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["TreemapChart"],
    api: ["TreemapChartProps", "TreemapNode"],
    demos: [
      "basic",
      "flat",
      "market-map",
      "bundle",
      "drill-down",
      "cloud-costs",
      "live-cluster",
      "metric-switch",
    ],
    native: {
      exports: ["TreemapChart"],
      api: ["TreemapChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-treemap-chart"],
      demos: ["nested", "flat"],
    },
  },
  {
    id: "sunburst-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["SunburstChart"],
    api: ["SunburstChartProps", "TreemapNode", "ShapeDrillEvent"],
    demos: [
      "disk-usage",
      "drill-down",
      "org",
      "labels",
      "city-budget",
      "time-tracking",
      "live-requests",
      "energy-mix",
    ],
    native: {
      exports: ["SunburstChart"],
      api: ["SunburstChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-sunburst-chart"],
      demos: ["disk-usage", "drill-down"],
    },
  },
  {
    id: "sankey-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["SankeyChart"],
    api: ["SankeyChartProps", "SankeyNode", "SankeyLink"],
    demos: [
      "energy",
      "journey",
      "budget",
      "options",
      "income-statement",
      "supply-chain",
      "hiring-funnel",
      "live-traffic",
      "plastic",
    ],
    native: {
      exports: ["SankeyChart"],
      api: ["SankeyChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-sankey-chart"],
      demos: ["energy", "journey"],
    },
  },

  // Finance and trading charts
  {
    id: "candlestick-chart",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["CandlestickChart"],
    api: ["CandlestickChartProps"],
    demos: [
      "basic",
      "bar-styles",
      "moving-average",
      "ma-ribbon",
      "volume",
      "volume-colors",
      "a-share",
      "events",
      "intraday",
      "live",
      "large-data",
      "dark",
      "patterns",
      "watchlist",
      "fx-pips",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-candlestick-chart"],
      demos: ["ohlc", "moving-average"],
    },
    native: {
      exports: ["CandlestickChart"],
      api: ["CandlestickChartProps"],
      demos: ["basic"],
    },
  },
  {
    id: "trading-chart",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["TradingChart"],
    api: [
      "TradingChartProps",
      "TradingChartOptions",
      "TradingChartHandle",
      "TradingBar",
      "TradingBarColumns",
      "TradingPriceLine",
      "TradingMarker",
      "TradingCompareSeries",
      "TradingDrawing",
      "TradingDrawingPoint",
      "TradingChartLabels",
      "TradingCrosshairEvent",
      "TradingClickEvent",
      "TradingOrderMoveEvent",
      "TradingVisibleRange",
      "TradingIndicatorToggleEvent",
      "TradingHistoryRequestEvent",
      "TradingVolumeProfileOptions",
      "TradingOrderCreateEvent",
      "TradingOrderCancelEvent",
      "TradingReplayState",
      "TradingUndoState",
      "TradingSyncOptions",
    ],
    demos: [
      "pro-terminal",
      "streaming",
      "tick-chart",
      "chart-styles",
      "drawing-tools",
      "volume-profile",
      "orders",
      "order-entry",
      "multi-chart",
      "replay",
      "compare",
      "sessions",
      "history",
      "million-bars",
      "export",
      "red-up",
      "dark-terminal",
      "price-alerts",
      "trade-journal",
      "mobile",
    ],
    wc: {
      entry: "trading-chart",
      tags: ["minerva-trading-chart"],
      demos: ["candles", "streaming"],
    },
  },
  {
    id: "technical-indicators",
    category: "financeCharts",
    package: "minerva-design/charts/core",
    exports: [
      "createTradingChart",
      "sma",
      "ema",
      "wma",
      "bollinger",
      "macd",
      "rsi",
      "kdj",
      "atr",
      "vwap",
      "heikinAshi",
      "psar",
      "ichimoku",
      "supertrend",
      "keltner",
      "donchian",
      "obv",
      "cci",
      "stochRsi",
      "dmi",
      "williamsR",
      "mfi",
      "volumeProfile",
      "resampleBars",
      "syncCharts",
    ],
    api: [
      "TradingMovingAverageIndicator",
      "TradingBollingerIndicator",
      "TradingVwapIndicator",
      "TradingVolumeIndicator",
      "TradingMacdIndicator",
      "TradingRsiIndicator",
      "TradingKdjIndicator",
      "TradingAtrIndicator",
      "TradingParabolicSarIndicator",
      "TradingIchimokuIndicator",
      "TradingSupertrendIndicator",
      "TradingKeltnerIndicator",
      "TradingDonchianIndicator",
      "TradingObvIndicator",
      "TradingCciIndicator",
      "TradingStochRsiIndicator",
      "TradingDmiIndicator",
      "TradingWilliamsRIndicator",
      "TradingMfiIndicator",
      "TradingIndicatorBase",
      "TradingPaneIndicatorBase",
      "TradingVolumeProfile",
      "TradingChartInstance",
      "TradingChartEventMap",
    ],
    demos: [
      "moving-averages",
      "bollinger",
      "channels",
      "ichimoku",
      "supertrend",
      "vwap",
      "macd",
      "rsi",
      "oscillators",
      "kdj",
      "dmi",
      "atr",
      "obv",
      "heikin-ashi",
      "signals",
      "vanilla",
      "divergence",
      "multi-timeframe",
      "screener",
    ],
    wc: {
      entry: "trading-chart",
      tags: [],
      demos: ["bollinger", "panes"],
    },
  },
  {
    id: "depth-chart",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["DepthChart"],
    api: [
      "DepthChartProps",
      "DepthChartHandle",
      "DepthChartOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "DepthChartLabels",
      "DepthChartPriceLine",
      "DepthPoint",
      "OrderBookSnapshot",
      "OrderBookDelta",
    ],
    demos: [
      "basic",
      "live",
      "range",
      "walls",
      "dark",
      "compact",
      "red-up",
      "slippage",
      "imbalance",
      "equity",
      "venues",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-depth-chart"],
      demos: ["book", "live"],
    },
  },
  {
    id: "order-book",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["OrderBook"],
    api: [
      "OrderBookProps",
      "OrderBookHandle",
      "OrderBookOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "OrderBookLabels",
      "OrderBookLevelEvent",
      "OrderBookSnapshot",
      "OrderBookDelta",
      "OrderBookLevelColumns",
    ],
    demos: [
      "basic",
      "live",
      "grouping",
      "large-orders",
      "modes",
      "terminal",
      "dark",
      "compact",
      "red-up",
      "markets",
      "wall-watch",
      "order-ticket",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-order-book"],
      demos: ["ladder", "live"],
    },
  },
  {
    id: "order-book-heatmap",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["OrderBookHeatmap"],
    api: [
      "OrderBookHeatmapProps",
      "OrderBookHeatmapHandle",
      "OrderBookHeatmapOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "OrderBookHeatmapLabels",
      "OrderBookHeatmapHoverEvent",
      "MarketTrade",
    ],
    demos: [
      "basic",
      "live",
      "color-scale",
      "large-trades",
      "dark",
      "compact",
      "red-up",
      "price-resolution",
      "time-window",
      "linked",
      "perpetual",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-order-book-heatmap"],
      demos: ["liquidity", "red-up"],
    },
  },
  {
    id: "time-and-sales",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["TimeAndSales"],
    api: [
      "TimeAndSalesProps",
      "TimeAndSalesHandle",
      "TimeAndSalesOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "TimeAndSalesLabels",
      "TimeAndSalesRowEvent",
      "MarketTrade",
      "TimeAndSalesInstance",
    ],
    demos: [
      "basic",
      "live",
      "large-trades",
      "filters",
      "large-data",
      "dark",
      "compact",
      "red-up",
      "pressure",
      "clock",
      "block-alerts",
      "split",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-time-and-sales"],
      demos: ["tape", "large-trades"],
    },
  },

  // 3D charts
  {
    id: "scatter-3d-chart",
    category: "charts3d",
    package: "minerva-design/charts",
    exports: ["Scatter3DChart", "Line3DChart"],
    api: [
      "Scatter3DChartProps",
      "Line3DChartProps",
      "Chart3DCommonProps",
      "Chart3DHandle",
      "Scatter3DSeries",
      "Line3DSeries",
      "Chart3DSeriesBase",
      "Chart3DPoint",
      "Chart3DColumnData",
      "Chart3DAxisOptions",
      "Chart3DCameraOptions",
      "Chart3DCameraState",
      "Chart3DInteractionOptions",
      "Chart3DColorBarOptions",
      "Chart3DHoverEvent",
      "Chart3DLabels",
    ],
    demos: [
      "clusters",
      "galaxy",
      "color-by-value",
      "auto-rotate",
      "camera",
      "trajectory",
      "renderer",
      "embeddings",
      "lidar",
      "satellites",
      "portfolio-risk",
    ],
    wc: {
      entry: "chart-3d",
      tags: ["minerva-scatter-3d-chart", "minerva-line-3d-chart"],
      demos: ["clusters", "trajectory"],
    },
  },
  {
    id: "surface-3d-chart",
    category: "charts3d",
    package: "minerva-design/charts",
    exports: ["Surface3DChart"],
    api: [
      "Surface3DChartProps",
      "Surface3DSeries",
      "Surface3DData",
      "Surface3DWireframeOptions",
      "Surface3DContourOptions",
      "Chart3DLightingOptions",
      "Chart3DCommonProps",
      "Chart3DSeriesBase",
    ],
    demos: [
      "functions",
      "terrain",
      "volatility",
      "wireframe-contours",
      "transparency",
      "live-wave",
      "heat-diffusion",
      "yield-curve",
      "loss-landscape",
      "wifi-signal",
    ],
    wc: {
      entry: "chart-3d",
      tags: ["minerva-surface-3d-chart"],
      demos: ["ripple", "terrain"],
    },
  },
  {
    id: "bar-3d-chart",
    category: "charts3d",
    package: "minerva-design/charts",
    exports: ["Bar3DChart"],
    api: [
      "Bar3DChartProps",
      "Bar3DSeries",
      "Bar3DDatum",
      "Chart3DCommonProps",
      "Chart3DSeriesBase",
      "Chart3DLegendOptions",
      "Chart3DTooltipOptions",
    ],
    demos: [
      "sales",
      "stacked",
      "pyramid",
      "traffic",
      "margin",
      "inventory-live",
      "cohort-retention",
      "budget-variance",
      "datacenter",
    ],
    wc: {
      entry: "chart-3d",
      tags: ["minerva-bar-3d-chart"],
      demos: ["sales", "stacked"],
    },
  },

  // Relationship and hierarchy charts
  // @graph-pages: graph-chart, dependency-graph, tree-chart (engine/graph)
  {
    id: "graph-chart",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["GraphChart"],
    api: [
      "GraphChartProps",
      "GraphCommonProps",
      "GraphChartHandle",
      "GraphNode",
      "GraphEdge",
      "GraphGroup",
      "GraphForceOptions",
      "GraphCircularOptions",
      "GraphInteractionOptions",
      "GraphLegendOptions",
      "GraphTooltipOptions",
      "GraphHoverEvent",
      "GraphChartLabels",
      "GraphChartOptions",
      "GraphChartInstance",
      "GraphChartEventMap",
      "GraphForceLayoutOptions",
      "GraphForceSimulation",
    ],
    demos: [
      "characters",
      "large-network",
      "transitions",
      "circular",
      "arc",
      "vanilla",
      "service-map",
      "knowledge-graph",
      "friend-suggestions",
      "fraud-ring",
    ],
    wc: {
      entry: "graph",
      tags: ["minerva-graph-chart"],
      demos: ["routes", "circular"],
    },
  },
  {
    id: "dependency-graph",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["DependencyGraph"],
    api: [
      "DependencyGraphProps",
      "GraphDagOptions",
      "GraphCriticalPath",
      "GraphDagLayoutOptions",
      "GraphDagLayoutResult",
    ],
    demos: [
      "packages",
      "pipeline",
      "lineage",
      "build-scheduler",
      "project-plan",
      "impact-analysis",
      "course-prerequisites",
      "spreadsheet",
    ],
    wc: {
      entry: "graph",
      tags: ["minerva-dependency-graph"],
      demos: ["pipeline", "modules"],
    },
  },
  {
    id: "tree-chart",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["TreeChart"],
    api: [
      "TreeChartProps",
      "GraphTreeOptions",
      "GraphToggleEvent",
      "GraphTreeLayoutOptions",
      "GraphTreeLayoutResult",
    ],
    demos: [
      "org-chart",
      "mind-map",
      "radial",
      "file-tree",
      "decision-tree",
      "taxonomy-search",
      "disk-usage",
      "wbs",
      "bracket",
    ],
    wc: {
      entry: "graph",
      tags: ["minerva-tree-chart"],
      demos: ["org", "mind-map"],
    },
  },
  // @chord-pages: chord-chart (shape engine)
  {
    id: "chord-chart",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["ChordChart"],
    api: ["ChordChartProps", "ChordGroup", "ChordLink"],
    demos: [
      "basic",
      "migration",
      "dependencies",
      "trade",
      "directed",
      "dark",
      "options",
      "brand-switching",
      "focus",
      "co-purchase",
      "live",
      "legend",
    ],
    native: {
      exports: ["ChordChart"],
      api: ["ChordChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-chord-chart"],
      demos: ["teams", "migration"],
    },
  },

  // Chart engine, performance and the other platforms
  {
    id: "chart-engine",
    category: "chartEngine",
    package: "minerva-design/charts/core",
    exports: [
      "createChart",
      "createCanvasChart",
      "createChartController",
      "scenePrimitives",
      "createShapeChart",
      "createCanvasShapeChart",
      "quadrantChartOptions",
      "quadrantOf",
      "quadrantCenter",
      "quadrantGroups",
      "quadrantLabels",
      "quadrantCountText",
      "quadrantAccessibleGroups",
      "quadrantKeyTarget",
      "createQuadrantPointLayer",
      "createQuadrantPointCard",
      "withQuadrantCard",
      "QUADRANT_CARD_LINGER_MS",
      "QUADRANT_CORNERS",
      "quadrantTaskLabels",
      "newQuadrantTaskDraft",
      "editQuadrantTaskDraft",
      "canSaveQuadrantTask",
      "applyQuadrantTaskDraft",
      "moveQuadrantTask",
      "removeQuadrantTask",
      "selectionAfterRemove",
      "quadrantTaskDeleteText",
      "placeQuadrantTaskPanel",
      "quadrantTaskColor",
      "quadrantTaskIconUri",
      "QUADRANT_TASK_ICONS",
      "heatmapChartOptions",
      "sparklineOptions",
      "formatCompact",
      "binValues",
      "histogramSeries",
      "quantiles",
      "boxplotStats",
      "boxplotData",
      "bubbleSeries",
      "waterfallSeries",
      "ganttSeries",
      "createTradingChart",
      "createDepthChart",
      "createOrderBook",
      "createOrderBookHeatmap",
      "createTimeAndSales",
      "createOrderBookStore",
      "createChart3D",
      "withSeriesType",
      "lineSeries",
      "areaSeries",
      "rangeAreaSeries",
      "barSeries",
      "scatterSeries",
      "candlestickSeries",
      "boxplotSeries",
      "formatDuration",
      "createGraphChart",
      "createForceSimulation",
      "forceLayout",
      "dagLayout",
      "countCrossings",
      "criticalPath",
      "treeLayout",
      "circularLayout",
      "arcLayout",
      "getDefaultChartRenderer",
      "setDefaultChartRenderer",
      "subscribeDefaultChartRenderer",
      "formatValue",
    ],
    api: [
      "ChartOptions",
      "ChartInstance",
      "ChartEventMap",
      "ChartDragEvent",
      "ChartDragEndEvent",
      "ChartRect",
      "CanvasChartConfig",
      "CanvasChartInstance",
      "ChartCanvas",
      "ChartTouch",
      "ChartPointerOptions",
      "ChartThemeInput",
      "ChartControllerConfig",
      "ChartController",
      "ChartPrimitiveOptions",
      "ChartLinePrimitive",
      "ChartAreaPrimitive",
      "ChartBarPrimitive",
      "ChartDotPrimitive",
      "ShapeChartInstance",
      "ShapeChartEventMap",
      "PieChartOptions",
      "RadarChartOptions",
      "GaugeChartOptions",
      "FunnelChartOptions",
      "TreemapChartOptions",
      "ShapeChartCommonOptions",
      "CanvasShapeChartConfig",
      "CanvasShapeChartInstance",
    ],
    demos: ["basic", "streaming", "canvas", "shapes"],
  },
  {
    id: "chart-performance",
    category: "chartEngine",
    package: "minerva-design/charts",
    exports: ["LineChart", "ScatterChart", "CandlestickChart", "Chart"],
    demos: ["line", "scatter", "candles", "heatmap", "streaming", "compare"],
    wc: {
      entry: "chart",
      tags: [],
      demos: ["million", "scatter"],
    },
  },
  {
    id: "chart-renderers",
    category: "chartEngine",
    demos: ["environment", "benchmark", "scaling", "switching", "fallback"],
  },
  { id: "mini-program-charts", category: "chartEngine" },

  // Web Components (guides; every component page has a "Web Components" tab)
  {
    id: "web-components",
    category: "webComponents",
    package: "minerva-design/web-components",
    // Utilities of the package (the elements are documented on their pages)
    exports: [
      "defineElement",
      "emit",
      "MinervaElement",
      "hostStyles",
      "FormAssociatedElement",
      "LocaleController",
      "resolveLanguage",
      "AriaController",
      "HasSlotController",
      "AnchoredPositionController",
      "DismissableLayerController",
      "FocusScopeController",
      "ModalController",
      "RovingFocusController",
      "TypeaheadController",
      "FloatingLayerController",
      "popoverResetStyles",
      // helpers re-exported next to their elements
      "matchesShortcut",
      "normalizeShortcuts",
      "computeFixedColumnLayout",
      "SUBMENU_OPEN_DELAY",
      "LONG_PRESS_DELAY",
      "MinervaContextMenu",
      // imperative confirmation (documented on the Confirm page)
      "confirm",
      "confirmFor",
      "confirmScopeOf",
    ],
    demos: ["react"],
  },
  { id: "wc-plain-html", category: "webComponents" },
  { id: "wc-vue", category: "webComponents" },
  { id: "wc-angular", category: "webComponents" },
  { id: "wc-svelte", category: "webComponents" },
  { id: "wc-forms", category: "webComponents" },
  { id: "wc-theming", category: "webComponents" },
  {
    id: "nav-bar",
    category: "mobile",
    native: {
      exports: ["NavBar"],
      api: ["NavBarProps"],
      demos: ["actions", "basic"],
    },
  },
  {
    id: "tab-bar",
    category: "mobile",
    native: {
      exports: ["TabBar", "TabBarItem"],
      api: ["TabBarProps", "TabBarItemProps"],
      demos: ["badges", "basic"],
    },
  },
  {
    id: "pull-refresh",
    category: "mobile",
    native: {
      exports: ["PullRefresh", "usePullRefresh"],
      api: [
        "PullRefreshProps",
        "UsePullRefreshOptions",
        "UsePullRefreshResult",
      ],
      demos: ["basic", "use-pull-refresh"],
    },
  },
  {
    id: "swipe-cell",
    category: "mobile",
    native: {
      exports: ["SwipeCell"],
      api: ["SwipeCellProps", "SwipeCellAction", "SwipeCellHandle"],
      demos: ["basic", "custom-actions"],
    },
  },
  {
    id: "collapse",
    category: "mobile",
    native: {
      exports: ["Collapse", "CollapseItem"],
      api: ["CollapseProps", "CollapseItemProps"],
      demos: ["accordion", "basic"],
    },
  },
  {
    id: "grid",
    category: "mobile",
    native: {
      exports: ["Grid", "GridItem"],
      api: ["GridProps", "GridItemProps"],
      demos: ["basic", "square-columns"],
    },
  },
  {
    id: "image-preview",
    category: "mobile",
    native: {
      exports: ["ImagePreview"],
      api: ["ImagePreviewProps"],
      demos: ["basic", "controlled"],
    },
  },

  // Icons (minerva-design/icons: custom SVG icons, also drawn by the GPU)
  {
    id: "icons",
    category: "icons",
    package: "minerva-design/icons/core",
    exports: ["icons", "iconCategories", "getIcon", "searchIcons"],
    demos: ["gallery"],
  },
  {
    id: "icon",
    category: "icons",
    package: "minerva-design/icons",
    exports: ["Icon", "createIcon", "DynamicIcon"],
    api: ["IconProps", "DynamicIconProps"],
    demos: [
      "basic",
      "size-color",
      "stroke",
      "accessibility",
      "custom",
      "dynamic",
      "canvas",
    ],
    wc: {
      entry: "icon",
      tags: ["minerva-icon"],
      demos: ["basic", "canvas"],
    },
    native: {
      package: "minerva-design/native/icons",
      exports: ["Icon", "createIcon", "DynamicIcon", "SearchIcon"],
      api: ["IconProps", "DynamicIconProps"],
      demos: ["basic"],
    },
  },
  {
    id: "icon-canvas",
    category: "icons",
    package: "minerva-design/icons",
    exports: ["IconCanvas"],
    api: ["IconCanvasProps", "IconCanvasItem", "IconStyle", "IconCanvasHandle"],
    demos: ["basic", "thousands", "renderers"],
    wc: {
      entry: "icon",
      tags: ["minerva-icon-canvas"],
      demos: ["basic"],
    },
  },
  {
    id: "icons-core",
    category: "icons",
    package: "minerva-design/icons/core",
    exports: [
      "toSvg",
      "toSvgDataUri",
      "toSvgBase64DataUri",
      "iconPathData",
      "drawIcon",
      "defineIcon",
      "createIconCanvas",
      "createIconSurface",
      "setDefaultIconRenderer",
      "getDefaultIconRenderer",
      "subscribeDefaultIconRenderer",
      "ICON_RENDERER_PREFERENCES",
      "ICON_RENDERER_ORDER",
      "iconRendererCandidates",
      "parseIconPath",
      "flattenIconPath",
      "tessellateIcon",
    ],
    api: [
      "IconDefinition",
      "IconSvgOptions",
      "DrawIconOptions",
      "IconCanvasOptions",
      "IconCanvasController",
      "IconSurfaceOptions",
      "IconSurface",
      "IconMeshOptions",
      "IconPolyline",
    ],
    demos: ["svg-string", "canvas2d", "controller", "geometry"],
  },
];

export const getDocPage = (id: string) => docPages.find((p) => p.id === id);

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

### apps/docs/src/docs/pages/chart-performance/showcase/meter.ts

```tsx
import { useEffect, useRef, useState, type RefObject } from "react";

/** Measured over the last half second */
export interface FrameStats {
  /** Frames per second */
  fps: number;
  /** Average time between two frames, in ms */
  frame: number;
  /**
   * Average main-thread time of a frame, in ms: animation callbacks (the
   * chart's draw calls included), style, layout and paint
   */
  work: number;
}

/** Whether the element is on screen (or within `margin` of it) */
export function useInView(
  ref: RefObject<Element | null>,
  margin = "0px",
): boolean {
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(!!entry?.isIntersecting),
      { rootMargin: margin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, margin]);
  return inView;
}

export interface FrameLoopHandlers {
  /** Every animation frame (move the camera here) */
  onFrame?: (time: number) => void;
  /** Main-thread time of each frame, once the frame is painted */
  onWork?: (ms: number) => void;
  /** Every half second */
  onStats?: (stats: FrameStats) => void;
}

/**
 * Runs an animation-frame loop while `running` and measures it. The
 * main-thread time of a frame is read from a message posted during the
 * frame: messages run after the frame's rendering work.
 */
export function useFrameLoop(
  running: boolean,
  handlers: FrameLoopHandlers = {},
): FrameStats | null {
  const [stats, setStats] = useState<FrameStats | null>(null);
  const handlersRef = useRef(handlers);
  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    if (!running) return;
    let id = 0;
    let windowStart = 0;
    let frames = 0;
    let work = 0;
    let works = 0;
    const channel = new MessageChannel();
    channel.port1.onmessage = (event: MessageEvent<number>) => {
      const ms = performance.now() - event.data;
      work += ms;
      works++;
      handlersRef.current.onWork?.(ms);
    };
    const loop = (time: number) => {
      id = requestAnimationFrame(loop);
      channel.port2.postMessage(time);
      if (windowStart) frames++;
      else windowStart = time;
      handlersRef.current.onFrame?.(time);
      const elapsed = time - windowStart;
      if (elapsed >= 500 && frames > 0) {
        const next = {
          fps: (frames * 1000) / elapsed,
          frame: elapsed / frames,
          work: works ? work / works : 0,
        };
        setStats(next);
        handlersRef.current.onStats?.(next);
        windowStart = time;
        frames = 0;
        work = 0;
        works = 0;
      }
    };
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      channel.port1.close();
      channel.port2.close();
    };
  }, [running]);

  return stats;
}

/** Calls `callback` once the next frame has been painted */
export function afterNextPaint(callback: () => void) {
  requestAnimationFrame(() => setTimeout(callback, 0));
}

/** Whether the user asked for reduced motion */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

```

### apps/docs/src/docs/pages/chart-performance/showcase/text.ts

```tsx
import { useTranslation } from "react-i18next";
import type { ChartRendererPreference } from "minerva-design/charts";
import styles from "./showcase.module.scss";

export const RENDERERS: readonly ChartRendererPreference[] = [
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

/** Color of a frame rate */
export const fpsClass = (fps: number) =>
  fps >= 50 ? styles.good : fps >= 25 ? styles.fair : styles.poor;

/** Localized numbers, durations and backend names of the showcases */
export const useShowcaseFormat = () => {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
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
  return {
    count: (value: number) => number.format(Math.round(value)),
    /** 1M, 240K, 100万… */
    compact: (value: number) => compact.format(value),
    ms: (value: number) =>
      t("ms", {
        value:
          value < 100
            ? decimal.format(value)
            : number.format(Math.round(value)),
      }),
    renderer: (kind: ChartRendererPreference) => t(`renderers.${kind}`),
  };
};

```

### apps/docs/src/docs/pages/chart-performance/showcase/showcase.module.scss

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
  justify-content: space-between;
  gap: 8px 16px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-color);
}

.hud {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(92px, 1fr));
  gap: 1px;
  margin: 0;
  border-bottom: 1px solid var(--border-color);
  background: var(--border-color);
}

.stat {
  min-width: 0;
  padding: 8px 10px;
  background: var(--surface-subtle-color);

  dt {
    overflow: hidden;
    font-size: 11px;
    letter-spacing: 0.02em;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
    color: var(--text-muted-color);
  }

  dd {
    margin: 2px 0 0;
    overflow: hidden;
    font-family: var(--font-family-mono);
    font-size: 16px;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-color);
  }
}

.good {
  color: var(--success-color) !important;
}

.fair {
  color: var(--warning-color) !important;
}

.poor {
  color: var(--danger-color) !important;
}

.chart {
  position: relative;
  padding: 8px 8px 0;
}

.loading {
  display: grid;
  place-items: center;
  height: 100%;
}

.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 16px;
  padding: 8px 14px 12px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary-color);

  p {
    margin: 0;
  }
}

.fallback {
  color: var(--warning-color);
}

.hint {
  color: var(--text-muted-color);
}

// ------------------------------------------------------------ comparison

.compareGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1px;
  background: var(--border-color);
}

.panel {
  min-width: 0;
  padding: 10px 12px 8px;
  background: var(--surface-color);
}

.panelActive {
  box-shadow: inset 0 0 0 2px var(--primary-color);
}

.panelNote {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
  min-height: 28px;
  padding-top: 4px;
  font-size: 12px;
  line-height: 1.4;
  color: var(--text-secondary-color);
}

.panelHeader {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 4px 8px;
  margin-bottom: 4px;
  font-size: 13px;

  strong {
    font-size: 14px;
    color: var(--text-color);
  }
}

.result {
  font-family: var(--font-family-mono);
  font-variant-numeric: tabular-nums;
  color: var(--text-secondary-color);
}

.results {
  padding: 12px 14px;
  border-top: 1px solid var(--border-color);
}

.bars {
  display: grid;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 13px;
}

.barsTitle {
  margin: 0 0 8px;
  font-size: 12px;
  color: var(--text-muted-color);
}

.bar {
  display: grid;
  grid-template-columns: minmax(84px, 120px) 1fr minmax(120px, auto);
  align-items: center;
  gap: 10px;
  color: var(--text-secondary-color);
}

.barTrack {
  display: block;
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--surface-muted-color);
  overflow: hidden;
}

.barFill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--primary-color);
  transition: width 0.4s ease;
}

```

## Example: Renderer comparison

The same million points on the four backends. Until you run the benchmark, each panel shows a light Canvas2D preview; the run then mounts the full data set on one backend at a time, follows the same zoom path for three seconds and compares the frame rates and the main-thread time per frame. A GPU backend that would run on a software GPU here is skipped (it would block the page), and a backend that cannot start shows the one it fell back to.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chart-performance/demos/compare.tsx

```tsx
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, LoadingState, Radio, RadioGroup } from "minerva-design";
import {
  Chart,
  type ChartHandle,
  type ChartRendererKind,
  type ChartSeries,
  type ChartView,
} from "minerva-design/charts";
import {
  fitY,
  loadClusters,
  loadSignals,
  tour,
  type Clusters,
  type Signals,
} from "../showcase/data";
import { probeBackends, type BackendsSupport } from "../../../renderer/support";
import { useFrameLoop, useInView } from "../showcase/meter";
import { fpsClass, useShowcaseFormat } from "../showcase/text";
import styles from "../showcase/showcase.module.scss";

const BACKENDS: readonly ChartRendererKind[] = [
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];
/** Duration of the run of each backend, in ms */
const RUN = 3000;
/** A backend that has not started after this long is given up, in ms */
const START_TIMEOUT = 15_000;
/** The previews draw one sample out of PREVIEW_STRIDE */
const PREVIEW_STRIDE = 100;

type Dataset = "line" | "scatter";

interface Result {
  fps: number;
  work: number;
}

interface Run {
  /** Backends of this run, in order */
  queue: readonly ChartRendererKind[];
  index: number;
  /** The chart under test has started its renderer */
  ready: boolean;
  /** Frames skipped after the start (the first draw uploads the data) */
  warmup: number;
  created: number;
  start: number;
  frames: number;
  work: number;
  works: number;
  base: ChartView | null;
}

const newRun = (queue: readonly ChartRendererKind[], index = 0): Run => ({
  queue,
  index,
  ready: false,
  warmup: 0,
  created: 0,
  start: 0,
  frames: 0,
  work: 0,
  works: 0,
  base: null,
});

/** One zoom in / zoom out per run, into the middle of the data */
const runTour = (dataset: Dataset, signals: Signals | null) =>
  dataset === "line"
    ? tour({
        zoom: 400,
        period: RUN / 1000,
        targets: [[signals?.x[signals.x.length >> 1] ?? NaN, NaN]],
      })
    : tour({ zoom: 20, period: RUN / 1000, targets: [[50, 50]], y: true });

/** Every PREVIEW_STRIDE-th value of a column */
const decimate = (column: Float64Array) => {
  const out = new Float64Array(Math.ceil(column.length / PREVIEW_STRIDE));
  for (let i = 0, j = 0; i < column.length; i += PREVIEW_STRIDE, j++)
    out[j] = column[i] ?? NaN;
  return out;
};

export default function CompareDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  const text = useShowcaseFormat();
  const rootRef = useRef<HTMLDivElement>(null);
  const resultsId = useId();
  const near = useInView(rootRef, "300px");
  const visible = useInView(rootRef);
  const [dataset, setDataset] = useState<Dataset>("line");
  const [signals, setSignals] = useState<Signals | null>(null);
  const [clusters, setClusters] = useState<Clusters | null>(null);
  const [support, setSupport] = useState<BackendsSupport | null>(null);
  const [actual, setActual] = useState<
    Partial<Record<ChartRendererKind, ChartRendererKind>>
  >({});
  const [results, setResults] = useState<
    Partial<Record<ChartRendererKind, Result>>
  >({});
  const [skipped, setSkipped] = useState<readonly ChartRendererKind[]>([]);
  const [testing, setTesting] = useState<ChartRendererKind | null>(null);
  const handles = useRef<Partial<Record<ChartRendererKind, ChartHandle>>>({});
  const runRef = useRef<Run | null>(null);

  // the same arrays as the demos above: generated once for the page
  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    if (dataset === "line")
      void loadSignals().then((data) => !cancelled && setSignals(data));
    else void loadClusters().then((data) => !cancelled && setClusters(data));
    return () => {
      cancelled = true;
    };
  }, [near, dataset]);

  // which GPU backends would run in software (and block the page)
  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    void probeBackends().then((probed) => !cancelled && setSupport(probed));
    return () => {
      cancelled = true;
    };
  }, [near]);

  const [series, preview] = useMemo(() => {
    const make = (light: boolean): ChartSeries[] | null => {
      const column = light ? decimate : (c: Float64Array) => c;
      if (dataset === "line")
        return (
          signals?.y.map((y, index) => ({
            id: `sensor-${index}`,
            name: t("sensor", { index: index + 1 }),
            data: { x: column(signals.x), y: column(y) },
            lineWidth: 1,
          })) ?? null
        );
      return (
        clusters?.clusters.map(({ x, y }, index) => ({
          id: `cluster-${index}`,
          name: t("cluster", { index: index + 1 }),
          type: "scatter",
          data: { x: column(x), y: column(y) },
          pointSize: 2,
          opacity: light ? 0.7 : 0.55,
        })) ?? null
      );
    };
    // the previews are a light copy, drawn with Canvas2D until a run
    return [make(false), make(true)];
  }, [dataset, signals, clusters, t]);
  const previewPoints =
    dataset === "line"
      ? (signals?.y.length ?? 0) *
        Math.ceil((signals?.x.length ?? 0) / PREVIEW_STRIDE)
      : (clusters?.clusters ?? []).reduce(
          (sum, { x }) => sum + Math.ceil(x.length / PREVIEW_STRIDE),
          0,
        );

  const finish = (run: Run, kind: ChartRendererKind, result: Result | null) => {
    if (result) setResults((previous) => ({ ...previous, [kind]: result }));
    const next = run.queue[run.index + 1];
    runRef.current = next ? newRun(run.queue, run.index + 1) : null;
    setTesting(next ?? null);
  };

  /** Every backend in turn: the same camera path for RUN ms */
  useFrameLoop(visible && testing !== null, {
    onFrame: (time) => {
      const run = runRef.current;
      const kind = run?.queue[run.index];
      if (!run || !kind) return;
      if (!run.created) run.created = time;
      const instance = handles.current[kind]?.getInstance();
      if (!run.ready || !instance) {
        if (time - run.created > START_TIMEOUT) finish(run, kind, null);
        return;
      }
      if (run.warmup < 1) {
        run.warmup++;
        return;
      }
      if (!run.base) {
        instance.resetZoom();
        run.base = instance.getView();
        run.start = time;
        return;
      }
      const elapsed = time - run.start;
      run.frames++;
      const view = runTour(dataset, signals)(elapsed / 1000, run.base);
      if (dataset === "line" && signals && view.x) {
        const y = fitY(signals, view.x);
        if (y) view.y = y;
      }
      instance.setView(view);
      if (elapsed < RUN) return;
      finish(run, kind, {
        fps: (run.frames * 1000) / elapsed,
        work: run.works ? run.work / run.works : 0,
      });
    },
    onWork: (ms) => {
      const run = runRef.current;
      if (run?.base) {
        run.work += ms;
        run.works++;
      }
    },
  });

  /** Runs the backends that have a hardware GPU (or none: they fall back) */
  const start = () => {
    if (!support) return;
    const queue = BACKENDS.filter((kind) => support[kind] !== "software");
    setSkipped(BACKENDS.filter((kind) => support[kind] === "software"));
    setResults({});
    runRef.current = newRun(queue);
    setTesting(queue[0] ?? null);
  };

  /** Runs a single backend, even on a software GPU */
  const runAnyway = (kind: ChartRendererKind) => {
    setSkipped((previous) => previous.filter((k) => k !== kind));
    runRef.current = newRun([kind]);
    setTesting(kind);
  };

  /** Bars are relative to the slowest backend (main-thread time) */
  const slowest = Math.max(1, ...Object.values(results).map((r) => r.work));
  const label = (kind: ChartRendererKind) => {
    const drawn = actual[kind];
    return drawn && drawn !== kind
      ? t("compare.fellBack", {
          requested: text.renderer(kind),
          backend: text.renderer(drawn),
        })
      : text.renderer(kind);
  };
  const ran = Object.keys(results).length > 0 || skipped.length > 0;

  return (
    <div ref={rootRef} className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("compare.dataset")}
          direction="horizontal"
          size="small"
          value={dataset}
          disabled={testing !== null}
          onChange={(value) => {
            setDataset(value as Dataset);
            setResults({});
            setSkipped([]);
          }}
        >
          <Radio value="line" label={t("compare.line")} />
          <Radio value="scatter" label={t("compare.scatter")} />
        </RadioGroup>
        <Button
          size="small"
          disabled={!series || !support || testing !== null}
          onClick={start}
        >
          {t("compare.run")}
        </Button>
      </div>

      {series && preview ? (
        <div className={styles.compareGrid}>
          {BACKENDS.map((kind) => {
            const result = results[kind];
            const drawn = actual[kind];
            const software = support?.[kind] === "software";
            return (
              <div
                key={kind}
                className={`${styles.panel} ${testing === kind ? styles.panelActive : ""}`}
              >
                <div className={styles.panelHeader}>
                  <span>
                    <strong>{text.renderer(kind)}</strong>
                    {drawn && drawn !== kind && (
                      <span className={styles.fallback}>
                        {" "}
                        {t("compare.fallback", {
                          backend: text.renderer(drawn),
                        })}
                      </span>
                    )}
                  </span>
                  <span className={styles.result}>
                    {result ? (
                      <>
                        <span className={fpsClass(result.fps)}>
                          {t("fps", { value: text.count(result.fps) })}
                        </span>
                        {" · "}
                        {text.ms(result.work)}
                      </>
                    ) : testing === kind ? (
                      t("compare.measuring")
                    ) : skipped.includes(kind) ? (
                      t("compare.skipped")
                    ) : (
                      "–"
                    )}
                  </span>
                </div>
                {testing === kind ? (
                  // the full data set, only for the run of this backend
                  <Chart
                    key="run"
                    ref={(handle) => {
                      if (handle) handles.current[kind] = handle;
                      else delete handles.current[kind];
                    }}
                    series={series}
                    renderer={kind}
                    onRendererChange={(drawnWith) => {
                      const run = runRef.current;
                      if (run && run.queue[run.index] === kind)
                        run.ready = true;
                      setActual((previous) => ({
                        ...previous,
                        [kind]: drawnWith,
                      }));
                    }}
                    legend={false}
                    xAxis={dataset === "line" ? { type: "time" } : undefined}
                    height={220}
                    ariaLabel={t("compareAria", {
                      backend: text.renderer(kind),
                    })}
                  />
                ) : (
                  <Chart
                    key="preview"
                    series={preview}
                    renderer="canvas2d"
                    legend={false}
                    xAxis={dataset === "line" ? { type: "time" } : undefined}
                    height={220}
                    ariaLabel={t("compare.previewAria", {
                      backend: text.renderer(kind),
                    })}
                  />
                )}
                <div className={styles.panelNote}>
                  {testing === kind ? (
                    <span>
                      {t("compare.live", {
                        backend: text.renderer(drawn ?? kind),
                        value: text.compact(1_000_000),
                      })}
                    </span>
                  ) : software && !result ? (
                    <>
                      <span className={styles.fallback}>
                        {t("compare.software")}
                      </span>
                      <Button
                        size="xsmall"
                        variant="outline"
                        disabled={testing !== null}
                        onClick={() => runAnyway(kind)}
                      >
                        {t("compare.runAnyway")}
                      </Button>
                    </>
                  ) : (
                    <span className={styles.hint}>
                      {t("compare.preview", {
                        value: text.compact(previewPoints),
                      })}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <LoadingState
          className={styles.loading}
          style={{ height: 480 }}
          size="small"
          label={t("loading", { value: text.count(1_000_000) })}
        />
      )}

      {Object.keys(results).length > 0 && (
        <div className={styles.results}>
          <p className={styles.barsTitle} id={resultsId}>
            {t("compare.results")}
          </p>
          <ol className={styles.bars} aria-labelledby={resultsId}>
            {BACKENDS.map((kind) => {
              const result = results[kind];
              if (!result) return null;
              return (
                <li key={kind} className={styles.bar}>
                  <span>{label(kind)}</span>
                  <span className={styles.barTrack}>
                    <span
                      className={styles.barFill}
                      style={{ width: `${(result.work / slowest) * 100}%` }}
                    />
                  </span>
                  <span className={styles.result}>
                    {text.ms(result.work)} ·{" "}
                    <span className={fpsClass(result.fps)}>
                      {t("fps", { value: text.count(result.fps) })}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      <div className={styles.footer}>
        <p role="status">
          {testing
            ? t("compare.running", { backend: text.renderer(testing) })
            : ran
              ? skipped.length
                ? `${t("compare.done")} ${t("compare.skippedNote", {
                    backends: skipped.map(text.renderer).join(", "),
                  })}`
                : t("compare.done")
              : t("compare.idle")}
        </p>
        <p className={styles.hint}>{t("compare.hint")}</p>
      </div>
    </div>
  );
}

```

### apps/docs/src/docs/pages/chart-performance/showcase/data.ts

```tsx
// Data sets of the performance showcases: typed-array columns generated once
// (seeded, so every visit draws the same picture) and shared by the demos of
// the page, plus the camera "tours" that zoom in and out of them.
import type { ChartView } from "minerva-design/charts";

export type Range = [number, number];

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

/** Standard normal numbers (Box-Muller, both values of a pair are used) */
export function gaussian(random: () => number) {
  let spare = NaN;
  return () => {
    if (!Number.isNaN(spare)) {
      const value = spare;
      spare = NaN;
      return value;
    }
    const r = Math.sqrt(-2 * Math.log(1 - random()));
    const a = 2 * Math.PI * random();
    spare = r * Math.sin(a);
    return r * Math.cos(a);
  };
}

/**
 * Generates a data set on first use, one frame later so that a loading
 * state paints first; later calls share the result.
 */
const cached = <T>(generate: () => T) => {
  let promise: Promise<T> | null = null;
  return (): Promise<T> => {
    if (!promise) {
      promise = new Promise<T>((resolve) => {
        const run = () => setTimeout(() => resolve(generate()), 0);
        if (typeof requestAnimationFrame === "function")
          requestAnimationFrame(run);
        else run();
      });
    }
    return promise;
  };
};

const BLOCK = 512;

/**
 * Min / max of index ranges over several columns in O(BLOCK + n / BLOCK):
 * used to fit the y axis to the visible x range on every frame.
 */
export function rangeIndex(
  lows: readonly Float64Array[],
  highs: readonly Float64Array[],
) {
  const n = lows[0]?.length ?? 0;
  const blocks = Math.ceil(n / BLOCK);
  const blockMin = new Float64Array(blocks).fill(Infinity);
  const blockMax = new Float64Array(blocks).fill(-Infinity);
  for (const column of lows) {
    for (let i = 0; i < n; i++) {
      const b = (i / BLOCK) | 0;
      if (column[i] < blockMin[b]) blockMin[b] = column[i];
    }
  }
  for (const column of highs) {
    for (let i = 0; i < n; i++) {
      const b = (i / BLOCK) | 0;
      if (column[i] > blockMax[b]) blockMax[b] = column[i];
    }
  }
  return (from: number, to: number): Range | null => {
    let i = Math.max(0, Math.floor(from));
    const end = Math.min(n - 1, Math.ceil(to));
    if (i > end) return null;
    let lo = Infinity;
    let hi = -Infinity;
    const scan = (index: number) => {
      for (const column of lows) if (column[index] < lo) lo = column[index];
      for (const column of highs) if (column[index] > hi) hi = column[index];
    };
    for (; i <= end && i % BLOCK; i++) scan(i);
    for (; i + BLOCK - 1 <= end; i += BLOCK) {
      const b = i / BLOCK;
      if (blockMin[b] < lo) lo = blockMin[b];
      if (blockMax[b] > hi) hi = blockMax[b];
    }
    for (; i <= end; i++) scan(i);
    return lo <= hi ? [lo, hi] : null;
  };
}

/** Evenly sampled columns: the y range of the samples inside an x range */
export interface Sampled {
  start: number;
  step: number;
  range: (from: number, to: number) => Range | null;
}

/** The y range to show for an x range, with some padding */
export const fitY = (data: Sampled, x: Range): Range | null => {
  const r = data.range(
    (x[0] - data.start) / data.step - 1,
    (x[1] - data.start) / data.step + 1,
  );
  if (!r) return null;
  const pad = (r[1] - r[0]) * 0.08 || 1;
  return [r[0] - pad, r[1] + pad];
};

export interface TourOptions {
  /** Deepest magnification */
  zoom: number;
  /** Seconds of one zoom in / zoom out cycle */
  period?: number;
  /** Data positions to zoom into, one per cycle */
  targets: readonly (readonly [number, number])[];
  /** Zooms the y axis too (scatter, heatmap) */
  y?: boolean;
}

/**
 * A camera path for `setView`: zooms from the whole data set into a target,
 * drifts a little there and zooms out again, then moves to the next target.
 */
export const tour =
  ({ zoom, period = 12, targets, y = false }: TourOptions) =>
  (time: number, base: ChartView): Partial<ChartView> => {
    const cycle = Math.floor(time / period);
    const phase = (time % period) / period;
    const p = (1 - Math.cos(2 * Math.PI * phase)) / 2;
    const target = targets[cycle % targets.length] ?? [NaN, NaN];
    const scale = Math.pow(1 / zoom, p);
    const axis = (range: Range, to: number, drift: number): Range => {
      const full = range[1] - range[0];
      const width = full * scale;
      const mid = (range[0] + range[1]) / 2;
      const goal = Number.isFinite(to) ? to : mid;
      const center = mid + (goal - mid) * p + width * 0.25 * drift * p;
      const start = Math.min(
        Math.max(center - width / 2, range[0]),
        range[1] - width,
      );
      return [start, start + width];
    };
    const x = axis(base.x, target[0], Math.sin(time * 0.7));
    return y ? { x, y: axis(base.y, target[1], Math.cos(time * 0.6)) } : { x };
  };

// ------------------------------------------------------------------ line

export const SIGNAL_SERIES = 4;
export const SIGNAL_LENGTH = 250_000;
const SIGNAL_START = Date.UTC(2026, 0, 1);
const SIGNAL_STEP = 1000;

export interface Signals extends Sampled {
  /** Timestamps, one per second */
  x: Float64Array;
  /** One column per sensor */
  y: Float64Array[];
}

/** 4 sensors × 250,000 samples: daily cycles, drift and noise */
export const loadSignals = cached((): Signals => {
  const normal = gaussian(mulberry32(2026));
  const x = new Float64Array(SIGNAL_LENGTH);
  for (let i = 0; i < SIGNAL_LENGTH; i++) x[i] = SIGNAL_START + i * SIGNAL_STEP;
  const y: Float64Array[] = [];
  for (let s = 0; s < SIGNAL_SERIES; s++) {
    const column = new Float64Array(SIGNAL_LENGTH);
    const level = 18 + s * 14;
    const swing = 3 + s * 1.5;
    let drift = 0;
    for (let i = 0; i < SIGNAL_LENGTH; i++) {
      drift = drift * 0.9995 + normal() * 0.06;
      const day = Math.sin((2 * Math.PI * i) / 86_400 + s * 1.3);
      const fast = Math.sin((2 * Math.PI * i) / (600 + s * 170));
      column[i] = level + day * swing + fast * 0.6 + drift + normal() * 0.25;
    }
    y.push(column);
  }
  return {
    x,
    y,
    start: SIGNAL_START,
    step: SIGNAL_STEP,
    range: rangeIndex(y, y),
  };
});

/** Moments of the signals worth zooming into */
export const SIGNAL_TARGETS: readonly (readonly [number, number])[] = [
  0.22, 0.68, 0.41, 0.87,
].map((f) => [SIGNAL_START + f * SIGNAL_LENGTH * SIGNAL_STEP, NaN] as const);

// --------------------------------------------------------------- scatter

export const CLUSTER_COUNT = 10;
export const CLUSTER_SIZE = 100_000;

export interface Clusters {
  clusters: { x: Float64Array; y: Float64Array }[];
  /** Centers of the clusters (tour targets) */
  centers: (readonly [number, number])[];
}

/** 10 clusters × 100,000 points: blobs, rings and spiral arms */
export const loadClusters = cached((): Clusters => {
  const random = mulberry32(42);
  const normal = gaussian(random);
  const clusters: Clusters["clusters"] = [];
  const centers: Clusters["centers"] = [];
  for (let c = 0; c < CLUSTER_COUNT; c++) {
    const angle = (2 * Math.PI * c) / CLUSTER_COUNT + random() * 0.4;
    const radius = c % 3 === 0 ? 14 : 34;
    const cx = 50 + Math.cos(angle) * radius;
    const cy = 50 + Math.sin(angle) * radius;
    const sx = 2 + random() * 4;
    const sy = 1.5 + random() * 3;
    const rotation = random() * Math.PI;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const x = new Float64Array(CLUSTER_SIZE);
    const y = new Float64Array(CLUSTER_SIZE);
    for (let i = 0; i < CLUSTER_SIZE; i++) {
      let u: number;
      let v: number;
      if (c % 3 === 1) {
        // ring
        const a = random() * 2 * Math.PI;
        const r = 5 + normal() * 0.6;
        u = Math.cos(a) * r;
        v = Math.sin(a) * r;
      } else if (c % 3 === 2) {
        // spiral arm
        const t = random() * 3 * Math.PI;
        u = Math.cos(t) * t * 0.9 + normal() * 0.35;
        v = Math.sin(t) * t * 0.9 + normal() * 0.35;
      } else {
        u = normal() * sx;
        v = normal() * sy;
      }
      x[i] = cx + u * cos - v * sin;
      y[i] = cy + u * sin + v * cos;
    }
    clusters.push({ x, y });
    centers.push([cx, cy]);
  }
  return { clusters, centers };
});

// --------------------------------------------------------------- candles

export const CANDLE_COUNT = 200_000;
const CANDLE_START = Date.UTC(2026, 0, 5);
const CANDLE_STEP = 60_000;

export interface Candles extends Sampled {
  x: Float64Array;
  open: Float64Array;
  high: Float64Array;
  low: Float64Array;
  close: Float64Array;
}

/** 200,000 one-minute candles: a random walk with changing volatility */
export const loadCandles = cached((): Candles => {
  const random = mulberry32(7);
  const normal = gaussian(random);
  const x = new Float64Array(CANDLE_COUNT);
  const open = new Float64Array(CANDLE_COUNT);
  const high = new Float64Array(CANDLE_COUNT);
  const low = new Float64Array(CANDLE_COUNT);
  const close = new Float64Array(CANDLE_COUNT);
  let price = 120;
  for (let i = 0; i < CANDLE_COUNT; i++) {
    const sigma = 0.0012 * (1 + 0.7 * Math.sin(i / 9000) ** 2);
    const o = price;
    const c = o * Math.exp(normal() * sigma + 0.000002);
    x[i] = CANDLE_START + i * CANDLE_STEP;
    open[i] = o;
    close[i] = c;
    high[i] = Math.max(o, c) * (1 + Math.abs(normal()) * sigma * 0.7);
    low[i] = Math.min(o, c) * (1 - Math.abs(normal()) * sigma * 0.7);
    price = c;
  }
  return {
    x,
    open,
    high,
    low,
    close,
    start: CANDLE_START,
    step: CANDLE_STEP,
    range: rangeIndex([low], [high]),
  };
});

export const CANDLE_TARGETS: readonly (readonly [number, number])[] = [
  0.31, 0.74, 0.12, 0.55,
].map((f) => [CANDLE_START + f * CANDLE_COUNT * CANDLE_STEP, NaN] as const);

// --------------------------------------------------------------- heatmap

export const SPECTRUM_STEPS = 1000;
export const SPECTRUM_BINS = 1000;
/** Seconds per time step */
const DT = 0.02;
/** Hz per frequency bin */
const DF = 8;

export interface Spectrogram {
  /** Time of each cell (sorted: the cells go column by column) */
  x: Float64Array;
  /** Frequency of each cell */
  y: Float64Array;
  /** Level in dB */
  value: Float64Array;
}

/**
 * 1,000 time steps × 1,000 frequency bins: a chirp and its harmonics, a
 * warbling tone, periodic clicks and a pink noise floor
 */
export const loadSpectrogram = cached((): Spectrogram => {
  const normal = gaussian(mulberry32(1000));
  const n = SPECTRUM_STEPS * SPECTRUM_BINS;
  const x = new Float64Array(n);
  const y = new Float64Array(n);
  const value = new Float64Array(n);
  const duration = SPECTRUM_STEPS * DT;
  const tones: [number, number, number][] = [];
  for (let step = 0; step < SPECTRUM_STEPS; step++) {
    const t = step * DT;
    const chirp = 400 + 1500 * (t / duration) + 250 * Math.sin(t * 0.9);
    tones.length = 0;
    for (let h = 1; h <= 4; h++) tones.push([chirp * h, 40 * h, 1 / h ** 1.6]);
    tones.push([5200 + 700 * Math.sin((2 * Math.PI * t) / 4), 60, 0.35]);
    const click = Math.exp(-(((t % 2.5) - 1.2) ** 2) / 0.002) * 0.08;
    for (let bin = 0; bin < SPECTRUM_BINS; bin++) {
      const f = bin * DF;
      let power = 1e-7 / (1 + f / 300) + click / (1 + f / 4000);
      for (const [fc, width, amp] of tones) {
        const d = (f - fc) / width;
        if (d > -5 && d < 5) power += amp * Math.exp(-d * d);
      }
      const i = step * SPECTRUM_BINS + bin;
      x[i] = t;
      y[i] = f;
      value[i] = 10 * Math.log10(power) + normal() * 1.5;
    }
  }
  return { x, y, value };
});

export const SPECTRUM_TARGETS: readonly (readonly [number, number])[] = [
  [6, 1200],
  [3, 5200],
  [12.2, 2500],
  [17, 3900],
];

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

### apps/docs/src/docs/pages/chart-performance/showcase/meter.ts

```tsx
import { useEffect, useRef, useState, type RefObject } from "react";

/** Measured over the last half second */
export interface FrameStats {
  /** Frames per second */
  fps: number;
  /** Average time between two frames, in ms */
  frame: number;
  /**
   * Average main-thread time of a frame, in ms: animation callbacks (the
   * chart's draw calls included), style, layout and paint
   */
  work: number;
}

/** Whether the element is on screen (or within `margin` of it) */
export function useInView(
  ref: RefObject<Element | null>,
  margin = "0px",
): boolean {
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(!!entry?.isIntersecting),
      { rootMargin: margin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, margin]);
  return inView;
}

export interface FrameLoopHandlers {
  /** Every animation frame (move the camera here) */
  onFrame?: (time: number) => void;
  /** Main-thread time of each frame, once the frame is painted */
  onWork?: (ms: number) => void;
  /** Every half second */
  onStats?: (stats: FrameStats) => void;
}

/**
 * Runs an animation-frame loop while `running` and measures it. The
 * main-thread time of a frame is read from a message posted during the
 * frame: messages run after the frame's rendering work.
 */
export function useFrameLoop(
  running: boolean,
  handlers: FrameLoopHandlers = {},
): FrameStats | null {
  const [stats, setStats] = useState<FrameStats | null>(null);
  const handlersRef = useRef(handlers);
  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    if (!running) return;
    let id = 0;
    let windowStart = 0;
    let frames = 0;
    let work = 0;
    let works = 0;
    const channel = new MessageChannel();
    channel.port1.onmessage = (event: MessageEvent<number>) => {
      const ms = performance.now() - event.data;
      work += ms;
      works++;
      handlersRef.current.onWork?.(ms);
    };
    const loop = (time: number) => {
      id = requestAnimationFrame(loop);
      channel.port2.postMessage(time);
      if (windowStart) frames++;
      else windowStart = time;
      handlersRef.current.onFrame?.(time);
      const elapsed = time - windowStart;
      if (elapsed >= 500 && frames > 0) {
        const next = {
          fps: (frames * 1000) / elapsed,
          frame: elapsed / frames,
          work: works ? work / works : 0,
        };
        setStats(next);
        handlersRef.current.onStats?.(next);
        windowStart = time;
        frames = 0;
        work = 0;
        works = 0;
      }
    };
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      channel.port1.close();
      channel.port2.close();
    };
  }, [running]);

  return stats;
}

/** Calls `callback` once the next frame has been painted */
export function afterNextPaint(callback: () => void) {
  requestAnimationFrame(() => setTimeout(callback, 0));
}

/** Whether the user asked for reduced motion */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

```

### apps/docs/src/docs/pages/chart-performance/showcase/text.ts

```tsx
import { useTranslation } from "react-i18next";
import type { ChartRendererPreference } from "minerva-design/charts";
import styles from "./showcase.module.scss";

export const RENDERERS: readonly ChartRendererPreference[] = [
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

/** Color of a frame rate */
export const fpsClass = (fps: number) =>
  fps >= 50 ? styles.good : fps >= 25 ? styles.fair : styles.poor;

/** Localized numbers, durations and backend names of the showcases */
export const useShowcaseFormat = () => {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
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
  return {
    count: (value: number) => number.format(Math.round(value)),
    /** 1M, 240K, 100万… */
    compact: (value: number) => compact.format(value),
    ms: (value: number) =>
      t("ms", {
        value:
          value < 100
            ? decimal.format(value)
            : number.format(Math.round(value)),
      }),
    renderer: (kind: ChartRendererPreference) => t(`renderers.${kind}`),
  };
};

```

### apps/docs/src/docs/pages/chart-performance/showcase/showcase.module.scss

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
  justify-content: space-between;
  gap: 8px 16px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-color);
}

.hud {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(92px, 1fr));
  gap: 1px;
  margin: 0;
  border-bottom: 1px solid var(--border-color);
  background: var(--border-color);
}

.stat {
  min-width: 0;
  padding: 8px 10px;
  background: var(--surface-subtle-color);

  dt {
    overflow: hidden;
    font-size: 11px;
    letter-spacing: 0.02em;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
    color: var(--text-muted-color);
  }

  dd {
    margin: 2px 0 0;
    overflow: hidden;
    font-family: var(--font-family-mono);
    font-size: 16px;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-color);
  }
}

.good {
  color: var(--success-color) !important;
}

.fair {
  color: var(--warning-color) !important;
}

.poor {
  color: var(--danger-color) !important;
}

.chart {
  position: relative;
  padding: 8px 8px 0;
}

.loading {
  display: grid;
  place-items: center;
  height: 100%;
}

.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 16px;
  padding: 8px 14px 12px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary-color);

  p {
    margin: 0;
  }
}

.fallback {
  color: var(--warning-color);
}

.hint {
  color: var(--text-muted-color);
}

// ------------------------------------------------------------ comparison

.compareGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1px;
  background: var(--border-color);
}

.panel {
  min-width: 0;
  padding: 10px 12px 8px;
  background: var(--surface-color);
}

.panelActive {
  box-shadow: inset 0 0 0 2px var(--primary-color);
}

.panelNote {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
  min-height: 28px;
  padding-top: 4px;
  font-size: 12px;
  line-height: 1.4;
  color: var(--text-secondary-color);
}

.panelHeader {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 4px 8px;
  margin-bottom: 4px;
  font-size: 13px;

  strong {
    font-size: 14px;
    color: var(--text-color);
  }
}

.result {
  font-family: var(--font-family-mono);
  font-variant-numeric: tabular-nums;
  color: var(--text-secondary-color);
}

.results {
  padding: 12px 14px;
  border-top: 1px solid var(--border-color);
}

.bars {
  display: grid;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 13px;
}

.barsTitle {
  margin: 0 0 8px;
  font-size: 12px;
  color: var(--text-muted-color);
}

.bar {
  display: grid;
  grid-template-columns: minmax(84px, 120px) 1fr minmax(120px, auto);
  align-items: center;
  gap: 10px;
  color: var(--text-secondary-color);
}

.barTrack {
  display: block;
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--surface-muted-color);
  overflow: hidden;
}

.barFill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--primary-color);
  transition: width 0.4s ease;
}

```

## Example: 1,000,000-cell heatmap

A 1000 × 1000 spectrogram (time × frequency, level in dB): a chirp and its harmonics, a warbling tone and periodic clicks. Cells keep their gaps while they are large and merge seamlessly once they are smaller than a pixel.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chart-performance/demos/heatmap.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Chart, type ChartSeries } from "minerva-design/charts";
import {
  SPECTRUM_BINS,
  SPECTRUM_STEPS,
  SPECTRUM_TARGETS,
  loadSpectrogram,
  tour,
  type Spectrogram,
} from "../showcase/data";
import { Showcase, type ShowcaseChartProps } from "../showcase/Showcase";

const MAGMA = [
  "#000004",
  "#2c115f",
  "#721f81",
  "#b73779",
  "#f1605d",
  "#feb078",
  "#fcfdbf",
];

// zooms until single cells (20 ms × 8 Hz) are a few pixels wide
const spectrumTour = tour({
  zoom: 40,
  period: 12,
  targets: SPECTRUM_TARGETS,
  y: true,
});

function Spectrum({
  data,
  chartRef,
  renderer,
  onRendererChange,
}: ShowcaseChartProps<Spectrogram>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  // 1,000,000 cells in three typed-array columns: time, frequency, level
  const series = useMemo(
    (): ChartSeries[] => [
      {
        id: "spectrogram",
        name: t("level"),
        type: "heatmap",
        data: { x: data.x, y: data.y, value: data.value },
        colorScale: MAGMA,
        valueRange: [-70, 0],
        radius: 0,
        format: (value) => t("db", { value: value.toFixed(1) }),
      },
    ],
    [data, t],
  );
  return (
    <Chart
      ref={chartRef}
      series={series}
      renderer={renderer}
      onRendererChange={onRendererChange}
      xAxis={{ title: t("time") }}
      yAxis={{ type: "linear", title: t("frequency") }}
      interaction={{ zoom: "xy" }}
      legend={false}
      height={420}
      ariaLabel={t("heatmapAria")}
    />
  );
}

export default function HeatmapDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  return (
    <Showcase
      load={loadSpectrogram}
      chart={Spectrum}
      count={SPECTRUM_STEPS * SPECTRUM_BINS}
      countLabel={t("stats.cells")}
      height={420}
      motionLabel={t("tour")}
      hint={t("hintXY")}
      tour={(data, time, base) => spectrumTour(time, base)}
    />
  );
}

```

### apps/docs/src/docs/pages/chart-performance/showcase/data.ts

```tsx
// Data sets of the performance showcases: typed-array columns generated once
// (seeded, so every visit draws the same picture) and shared by the demos of
// the page, plus the camera "tours" that zoom in and out of them.
import type { ChartView } from "minerva-design/charts";

export type Range = [number, number];

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

/** Standard normal numbers (Box-Muller, both values of a pair are used) */
export function gaussian(random: () => number) {
  let spare = NaN;
  return () => {
    if (!Number.isNaN(spare)) {
      const value = spare;
      spare = NaN;
      return value;
    }
    const r = Math.sqrt(-2 * Math.log(1 - random()));
    const a = 2 * Math.PI * random();
    spare = r * Math.sin(a);
    return r * Math.cos(a);
  };
}

/**
 * Generates a data set on first use, one frame later so that a loading
 * state paints first; later calls share the result.
 */
const cached = <T>(generate: () => T) => {
  let promise: Promise<T> | null = null;
  return (): Promise<T> => {
    if (!promise) {
      promise = new Promise<T>((resolve) => {
        const run = () => setTimeout(() => resolve(generate()), 0);
        if (typeof requestAnimationFrame === "function")
          requestAnimationFrame(run);
        else run();
      });
    }
    return promise;
  };
};

const BLOCK = 512;

/**
 * Min / max of index ranges over several columns in O(BLOCK + n / BLOCK):
 * used to fit the y axis to the visible x range on every frame.
 */
export function rangeIndex(
  lows: readonly Float64Array[],
  highs: readonly Float64Array[],
) {
  const n = lows[0]?.length ?? 0;
  const blocks = Math.ceil(n / BLOCK);
  const blockMin = new Float64Array(blocks).fill(Infinity);
  const blockMax = new Float64Array(blocks).fill(-Infinity);
  for (const column of lows) {
    for (let i = 0; i < n; i++) {
      const b = (i / BLOCK) | 0;
      if (column[i] < blockMin[b]) blockMin[b] = column[i];
    }
  }
  for (const column of highs) {
    for (let i = 0; i < n; i++) {
      const b = (i / BLOCK) | 0;
      if (column[i] > blockMax[b]) blockMax[b] = column[i];
    }
  }
  return (from: number, to: number): Range | null => {
    let i = Math.max(0, Math.floor(from));
    const end = Math.min(n - 1, Math.ceil(to));
    if (i > end) return null;
    let lo = Infinity;
    let hi = -Infinity;
    const scan = (index: number) => {
      for (const column of lows) if (column[index] < lo) lo = column[index];
      for (const column of highs) if (column[index] > hi) hi = column[index];
    };
    for (; i <= end && i % BLOCK; i++) scan(i);
    for (; i + BLOCK - 1 <= end; i += BLOCK) {
      const b = i / BLOCK;
      if (blockMin[b] < lo) lo = blockMin[b];
      if (blockMax[b] > hi) hi = blockMax[b];
    }
    for (; i <= end; i++) scan(i);
    return lo <= hi ? [lo, hi] : null;
  };
}

/** Evenly sampled columns: the y range of the samples inside an x range */
export interface Sampled {
  start: number;
  step: number;
  range: (from: number, to: number) => Range | null;
}

/** The y range to show for an x range, with some padding */
export const fitY = (data: Sampled, x: Range): Range | null => {
  const r = data.range(
    (x[0] - data.start) / data.step - 1,
    (x[1] - data.start) / data.step + 1,
  );
  if (!r) return null;
  const pad = (r[1] - r[0]) * 0.08 || 1;
  return [r[0] - pad, r[1] + pad];
};

export interface TourOptions {
  /** Deepest magnification */
  zoom: number;
  /** Seconds of one zoom in / zoom out cycle */
  period?: number;
  /** Data positions to zoom into, one per cycle */
  targets: readonly (readonly [number, number])[];
  /** Zooms the y axis too (scatter, heatmap) */
  y?: boolean;
}

/**
 * A camera path for `setView`: zooms from the whole data set into a target,
 * drifts a little there and zooms out again, then moves to the next target.
 */
export const tour =
  ({ zoom, period = 12, targets, y = false }: TourOptions) =>
  (time: number, base: ChartView): Partial<ChartView> => {
    const cycle = Math.floor(time / period);
    const phase = (time % period) / period;
    const p = (1 - Math.cos(2 * Math.PI * phase)) / 2;
    const target = targets[cycle % targets.length] ?? [NaN, NaN];
    const scale = Math.pow(1 / zoom, p);
    const axis = (range: Range, to: number, drift: number): Range => {
      const full = range[1] - range[0];
      const width = full * scale;
      const mid = (range[0] + range[1]) / 2;
      const goal = Number.isFinite(to) ? to : mid;
      const center = mid + (goal - mid) * p + width * 0.25 * drift * p;
      const start = Math.min(
        Math.max(center - width / 2, range[0]),
        range[1] - width,
      );
      return [start, start + width];
    };
    const x = axis(base.x, target[0], Math.sin(time * 0.7));
    return y ? { x, y: axis(base.y, target[1], Math.cos(time * 0.6)) } : { x };
  };

// ------------------------------------------------------------------ line

export const SIGNAL_SERIES = 4;
export const SIGNAL_LENGTH = 250_000;
const SIGNAL_START = Date.UTC(2026, 0, 1);
const SIGNAL_STEP = 1000;

export interface Signals extends Sampled {
  /** Timestamps, one per second */
  x: Float64Array;
  /** One column per sensor */
  y: Float64Array[];
}

/** 4 sensors × 250,000 samples: daily cycles, drift and noise */
export const loadSignals = cached((): Signals => {
  const normal = gaussian(mulberry32(2026));
  const x = new Float64Array(SIGNAL_LENGTH);
  for (let i = 0; i < SIGNAL_LENGTH; i++) x[i] = SIGNAL_START + i * SIGNAL_STEP;
  const y: Float64Array[] = [];
  for (let s = 0; s < SIGNAL_SERIES; s++) {
    const column = new Float64Array(SIGNAL_LENGTH);
    const level = 18 + s * 14;
    const swing = 3 + s * 1.5;
    let drift = 0;
    for (let i = 0; i < SIGNAL_LENGTH; i++) {
      drift = drift * 0.9995 + normal() * 0.06;
      const day = Math.sin((2 * Math.PI * i) / 86_400 + s * 1.3);
      const fast = Math.sin((2 * Math.PI * i) / (600 + s * 170));
      column[i] = level + day * swing + fast * 0.6 + drift + normal() * 0.25;
    }
    y.push(column);
  }
  return {
    x,
    y,
    start: SIGNAL_START,
    step: SIGNAL_STEP,
    range: rangeIndex(y, y),
  };
});

/** Moments of the signals worth zooming into */
export const SIGNAL_TARGETS: readonly (readonly [number, number])[] = [
  0.22, 0.68, 0.41, 0.87,
].map((f) => [SIGNAL_START + f * SIGNAL_LENGTH * SIGNAL_STEP, NaN] as const);

// --------------------------------------------------------------- scatter

export const CLUSTER_COUNT = 10;
export const CLUSTER_SIZE = 100_000;

export interface Clusters {
  clusters: { x: Float64Array; y: Float64Array }[];
  /** Centers of the clusters (tour targets) */
  centers: (readonly [number, number])[];
}

/** 10 clusters × 100,000 points: blobs, rings and spiral arms */
export const loadClusters = cached((): Clusters => {
  const random = mulberry32(42);
  const normal = gaussian(random);
  const clusters: Clusters["clusters"] = [];
  const centers: Clusters["centers"] = [];
  for (let c = 0; c < CLUSTER_COUNT; c++) {
    const angle = (2 * Math.PI * c) / CLUSTER_COUNT + random() * 0.4;
    const radius = c % 3 === 0 ? 14 : 34;
    const cx = 50 + Math.cos(angle) * radius;
    const cy = 50 + Math.sin(angle) * radius;
    const sx = 2 + random() * 4;
    const sy = 1.5 + random() * 3;
    const rotation = random() * Math.PI;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const x = new Float64Array(CLUSTER_SIZE);
    const y = new Float64Array(CLUSTER_SIZE);
    for (let i = 0; i < CLUSTER_SIZE; i++) {
      let u: number;
      let v: number;
      if (c % 3 === 1) {
        // ring
        const a = random() * 2 * Math.PI;
        const r = 5 + normal() * 0.6;
        u = Math.cos(a) * r;
        v = Math.sin(a) * r;
      } else if (c % 3 === 2) {
        // spiral arm
        const t = random() * 3 * Math.PI;
        u = Math.cos(t) * t * 0.9 + normal() * 0.35;
        v = Math.sin(t) * t * 0.9 + normal() * 0.35;
      } else {
        u = normal() * sx;
        v = normal() * sy;
      }
      x[i] = cx + u * cos - v * sin;
      y[i] = cy + u * sin + v * cos;
    }
    clusters.push({ x, y });
    centers.push([cx, cy]);
  }
  return { clusters, centers };
});

// --------------------------------------------------------------- candles

export const CANDLE_COUNT = 200_000;
const CANDLE_START = Date.UTC(2026, 0, 5);
const CANDLE_STEP = 60_000;

export interface Candles extends Sampled {
  x: Float64Array;
  open: Float64Array;
  high: Float64Array;
  low: Float64Array;
  close: Float64Array;
}

/** 200,000 one-minute candles: a random walk with changing volatility */
export const loadCandles = cached((): Candles => {
  const random = mulberry32(7);
  const normal = gaussian(random);
  const x = new Float64Array(CANDLE_COUNT);
  const open = new Float64Array(CANDLE_COUNT);
  const high = new Float64Array(CANDLE_COUNT);
  const low = new Float64Array(CANDLE_COUNT);
  const close = new Float64Array(CANDLE_COUNT);
  let price = 120;
  for (let i = 0; i < CANDLE_COUNT; i++) {
    const sigma = 0.0012 * (1 + 0.7 * Math.sin(i / 9000) ** 2);
    const o = price;
    const c = o * Math.exp(normal() * sigma + 0.000002);
    x[i] = CANDLE_START + i * CANDLE_STEP;
    open[i] = o;
    close[i] = c;
    high[i] = Math.max(o, c) * (1 + Math.abs(normal()) * sigma * 0.7);
    low[i] = Math.min(o, c) * (1 - Math.abs(normal()) * sigma * 0.7);
    price = c;
  }
  return {
    x,
    open,
    high,
    low,
    close,
    start: CANDLE_START,
    step: CANDLE_STEP,
    range: rangeIndex([low], [high]),
  };
});

export const CANDLE_TARGETS: readonly (readonly [number, number])[] = [
  0.31, 0.74, 0.12, 0.55,
].map((f) => [CANDLE_START + f * CANDLE_COUNT * CANDLE_STEP, NaN] as const);

// --------------------------------------------------------------- heatmap

export const SPECTRUM_STEPS = 1000;
export const SPECTRUM_BINS = 1000;
/** Seconds per time step */
const DT = 0.02;
/** Hz per frequency bin */
const DF = 8;

export interface Spectrogram {
  /** Time of each cell (sorted: the cells go column by column) */
  x: Float64Array;
  /** Frequency of each cell */
  y: Float64Array;
  /** Level in dB */
  value: Float64Array;
}

/**
 * 1,000 time steps × 1,000 frequency bins: a chirp and its harmonics, a
 * warbling tone, periodic clicks and a pink noise floor
 */
export const loadSpectrogram = cached((): Spectrogram => {
  const normal = gaussian(mulberry32(1000));
  const n = SPECTRUM_STEPS * SPECTRUM_BINS;
  const x = new Float64Array(n);
  const y = new Float64Array(n);
  const value = new Float64Array(n);
  const duration = SPECTRUM_STEPS * DT;
  const tones: [number, number, number][] = [];
  for (let step = 0; step < SPECTRUM_STEPS; step++) {
    const t = step * DT;
    const chirp = 400 + 1500 * (t / duration) + 250 * Math.sin(t * 0.9);
    tones.length = 0;
    for (let h = 1; h <= 4; h++) tones.push([chirp * h, 40 * h, 1 / h ** 1.6]);
    tones.push([5200 + 700 * Math.sin((2 * Math.PI * t) / 4), 60, 0.35]);
    const click = Math.exp(-(((t % 2.5) - 1.2) ** 2) / 0.002) * 0.08;
    for (let bin = 0; bin < SPECTRUM_BINS; bin++) {
      const f = bin * DF;
      let power = 1e-7 / (1 + f / 300) + click / (1 + f / 4000);
      for (const [fc, width, amp] of tones) {
        const d = (f - fc) / width;
        if (d > -5 && d < 5) power += amp * Math.exp(-d * d);
      }
      const i = step * SPECTRUM_BINS + bin;
      x[i] = t;
      y[i] = f;
      value[i] = 10 * Math.log10(power) + normal() * 1.5;
    }
  }
  return { x, y, value };
});

export const SPECTRUM_TARGETS: readonly (readonly [number, number])[] = [
  [6, 1200],
  [3, 5200],
  [12.2, 2500],
  [17, 3900],
];

```

### apps/docs/src/docs/pages/chart-performance/showcase/Showcase.tsx

```tsx
import {
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type RefObject,
} from "react";
import { useTranslation } from "react-i18next";
import { LoadingState, Radio, RadioGroup, Switch } from "minerva-design";
import type {
  ChartHandle,
  ChartRendererKind,
  ChartRendererPreference,
  ChartView,
} from "minerva-design/charts";
import { ChartRendererContext } from "../../../renderer/context";
import {
  autoPick,
  probeBackends,
  type BackendsSupport,
} from "../../../renderer/support";
import type { Range } from "./data";
import {
  afterNextPaint,
  prefersReducedMotion,
  useFrameLoop,
  useInView,
} from "./meter";
import { RENDERERS, fpsClass, useShowcaseFormat } from "./text";
import styles from "./showcase.module.scss";

/** Stops the tour when a frame takes longer than this (ms of main thread) */
const SLOW_FRAME = 250;

/** Props a showcase gives to its chart component */
export interface ShowcaseChartProps<T> {
  /** The generated data set */
  data: T;
  /** Chart handle (the camera tour moves the view through it) */
  chartRef: RefObject<ChartHandle | null>;
  /** Backend picked in the selector */
  renderer: ChartRendererPreference;
  /** Reports the backend that actually started */
  onRendererChange: (kind: ChartRendererKind) => void;
  /** Fits the y axis to the zoomed x range */
  onZoom: (view: ChartView) => void;
  /** On screen and not paused (streaming demos run while true) */
  running: boolean;
}

export interface ShowcaseProps<T> {
  /** Loads the data set (generated once, when the showcase nears the screen) */
  load: () => Promise<T>;
  /** Draws the data set */
  chart: ComponentType<ShowcaseChartProps<T>>;
  /** Number of marks drawn */
  count: number;
  /** What `count` counts ("Points", "Cells", ...) */
  countLabel: string;
  /** Height of the chart in px */
  height: number;
  /** Label of the motion switch (camera tour, stream) */
  motionLabel: string;
  /** Interaction hint under the chart */
  hint: string;
  /** Camera path: the view at `time` seconds into the tour */
  tour?: (data: T, time: number, base: ChartView) => Partial<ChartView>;
  /** The y range to show for an x range (zoomable x only) */
  fit?: (data: T, x: Range) => Range | null;
  /** One more statistic */
  extra?: { label: string; value: string };
}

/**
 * A chart under test: renderer selector, live statistics (frame rate,
 * frame time, main-thread time, marks, time to first frame), a camera tour
 * and the backend that actually started. The data is generated when the
 * showcase nears the screen; the loop only runs while it is visible.
 */
export function Showcase<T>({
  load,
  chart: Plot,
  count,
  countLabel,
  height,
  motionLabel,
  hint,
  tour,
  fit,
  extra,
}: ShowcaseProps<T>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  const text = useShowcaseFormat();
  const rootRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartHandle>(null);
  const near = useInView(rootRef, "300px");
  const visible = useInView(rootRef);
  const [data, setData] = useState<{ value: T } | null>(null);
  const [renderer, setRenderer] = useState<ChartRendererPreference>("auto");
  const [actual, setActual] = useState<ChartRendererKind | null>(null);
  const [motion, setMotion] = useState(() => !prefersReducedMotion());
  const [slow, setSlow] = useState<number | null>(null);
  const [startup, setStartup] = useState<number | null>(null);
  /** When the data was handed to the chart or the backend was switched */
  const startRef = useRef(0);
  const tourRef = useRef<{ start: number; base: ChartView } | null>(null);
  /** Consecutive slow frames of the tour */
  const slowFramesRef = useRef(0);
  // the renderer of the page bar: what "auto" means here
  const page = useContext(ChartRendererContext) ?? "auto";
  const [support, setSupport] = useState<BackendsSupport | null>(null);

  useEffect(() => {
    let cancelled = false;
    void probeBackends().then((result) => {
      if (!cancelled) setSupport(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // A GPU backend forced for the whole page may run on a software GPU here,
  // which takes seconds per frame with these data sets: "auto" then uses
  // the best hardware backend instead (picking it in this demo still forces it)
  const pageSoftware = page !== "auto" && support?.[page] === "software";
  const probing = page !== "auto" && page !== "canvas2d" && !support;
  const chartRenderer: ChartRendererPreference =
    renderer === "auto" && pageSoftware && support
      ? autoPick(support)
      : renderer;
  const requested = renderer === "auto" ? page : renderer;

  useEffect(() => {
    if (!near || data) return;
    let cancelled = false;
    void load().then((value) => {
      if (cancelled) return;
      startRef.current = performance.now();
      setData({ value });
    });
    return () => {
      cancelled = true;
    };
  }, [near, data, load]);

  // the tour stops as soon as the user zooms, pans or uses the keyboard
  useEffect(() => {
    const plot = plotRef.current;
    if (!plot) return;
    const stop = () => setMotion(false);
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) stop();
    };
    const onKey = (event: KeyboardEvent) => {
      if (/^(Arrow|\+|-|=|0|Home|End)/.test(event.key)) stop();
    };
    plot.addEventListener("pointerdown", stop);
    plot.addEventListener("wheel", onWheel, { passive: true });
    plot.addEventListener("keydown", onKey);
    return () => {
      plot.removeEventListener("pointerdown", stop);
      plot.removeEventListener("wheel", onWheel);
      plot.removeEventListener("keydown", onKey);
    };
  }, []);

  const animating = motion && slow === null;
  const running = visible && !!data;

  const stats = useFrameLoop(running, {
    onFrame: (time) => {
      const instance = chartRef.current?.getInstance();
      // starts once the first frame (the costly one: buffers) is painted
      if (!tour || !animating || !data || startup === null || !instance) {
        tourRef.current = null;
        return;
      }
      let state = tourRef.current;
      if (!state) {
        instance.resetZoom();
        state = { start: time, base: instance.getView() };
        tourRef.current = state;
        slowFramesRef.current = 0;
      }
      const view = tour(data.value, (time - state.start) / 1000, state.base);
      if (fit && view.x && !view.y) {
        const y = fit(data.value, view.x);
        if (y) view.y = y;
      }
      instance.setView(view);
    },
    onWork: (ms) => {
      if (!tourRef.current) return;
      // two slow frames in a row (or a very slow one): this backend cannot
      // animate the data set here
      slowFramesRef.current = ms > SLOW_FRAME ? slowFramesRef.current + 1 : 0;
      if (slowFramesRef.current >= 2 || ms > SLOW_FRAME * 4) {
        tourRef.current = null;
        setSlow(ms);
      }
    },
  });

  const onRendererChange = (kind: ChartRendererKind) => {
    setActual(kind);
    afterNextPaint(() => setStartup(performance.now() - startRef.current));
  };
  const onZoom = (view: ChartView) => {
    if (!fit || !data) return;
    const y = fit(data.value, view.x);
    if (y) chartRef.current?.setView({ y });
  };

  let status: ReactNode = t("status.starting");
  if (slow !== null) {
    status = (
      <span className={styles.fallback}>
        {t("status.slow", { ms: text.ms(slow) })}
      </span>
    );
  } else if (actual && renderer === "auto" && pageSoftware) {
    status = (
      <span className={styles.fallback}>
        {t("status.pageSoftware", {
          requested: text.renderer(page),
          backend: text.renderer(actual),
        })}
      </span>
    );
  } else if (actual && requested === "auto") {
    status =
      actual === "canvas2d"
        ? t("status.autoCanvas", { backend: text.renderer(actual) })
        : t("status.auto", { backend: text.renderer(actual) });
  } else if (actual && actual === requested) {
    status =
      renderer === "auto"
        ? t("status.page", { backend: text.renderer(actual) })
        : t("status.forced", { backend: text.renderer(actual) });
  } else if (actual) {
    status = (
      <span className={styles.fallback}>
        {t("status.fallback", {
          requested: text.renderer(requested),
          backend: text.renderer(actual),
        })}
      </span>
    );
  }

  return (
    <div ref={rootRef} className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("renderer")}
          direction="horizontal"
          size="small"
          value={renderer}
          onChange={(value) => {
            startRef.current = performance.now();
            setRenderer(value as ChartRendererPreference);
            setActual(null);
            setStartup(null);
            setSlow(null);
          }}
        >
          {RENDERERS.map((kind) => (
            <Radio
              key={kind}
              value={kind}
              label={
                kind === "auto" && page !== "auto"
                  ? t("renderers.page", { backend: text.renderer(page) })
                  : text.renderer(kind)
              }
            />
          ))}
        </RadioGroup>
        <Switch
          size="small"
          checked={motion}
          label={motionLabel}
          onChange={(checked) => {
            setMotion(checked);
            setSlow(null);
          }}
        />
      </div>

      <dl className={styles.hud}>
        <div className={styles.stat}>
          <dt>{t("stats.renderer")}</dt>
          <dd>{actual ? text.renderer(actual) : "…"}</dd>
        </div>
        <div className={styles.stat}>
          <dt>{t("stats.fps")}</dt>
          <dd className={stats ? fpsClass(stats.fps) : undefined}>
            {stats ? text.count(stats.fps) : "–"}
          </dd>
        </div>
        <div className={styles.stat}>
          <dt>{t("stats.frame")}</dt>
          <dd>{stats ? text.ms(stats.frame) : "–"}</dd>
        </div>
        <div className={styles.stat}>
          <dt>{t("stats.work")}</dt>
          <dd>{stats ? text.ms(stats.work) : "–"}</dd>
        </div>
        <div className={styles.stat}>
          <dt>{countLabel}</dt>
          <dd title={text.count(count)}>{text.compact(count)}</dd>
        </div>
        {extra && (
          <div className={styles.stat}>
            <dt>{extra.label}</dt>
            <dd>{extra.value}</dd>
          </div>
        )}
        <div className={styles.stat}>
          <dt>{t("stats.startup")}</dt>
          <dd>{startup !== null ? text.ms(startup) : "–"}</dd>
        </div>
      </dl>

      <div ref={plotRef} className={styles.chart}>
        {data && !probing ? (
          <Plot
            data={data.value}
            chartRef={chartRef}
            renderer={chartRenderer}
            onRendererChange={onRendererChange}
            onZoom={onZoom}
            running={running && motion}
          />
        ) : (
          <LoadingState
            className={styles.loading}
            style={{ height }}
            size="small"
            label={t("loading", { value: text.count(count) })}
          />
        )}
      </div>

      <div className={styles.footer}>
        <p role="status">{status}</p>
        <p className={styles.hint}>{hint}</p>
      </div>
    </div>
  );
}

```

### apps/docs/src/docs/renderer/context.ts

```tsx
// Kept free of engine imports: DemoBlock (on every page) reads the context,
// the engine is only loaded by the lazy RendererScope of chart pages.
import { createContext } from "react";
import type { ChartRendererPreference } from "minerva-design/charts/core";
import type { DocCategory } from "../registry";

/** Categories whose pages get the renderer bar and the per-demo badges */
export const RENDERER_CATEGORIES: readonly DocCategory[] = [
  "charts",
  "financeCharts",
  "charts3d",
  "graphCharts",
  "chartEngine",
  "icons",
];

/**
 * What the bar of a page switches: the charts, or the canvas icons (icon
 * pages; the same stored choice drives both, see store.ts)
 */
export type RendererTopic = "charts" | "icons";

export const RendererTopicContext = createContext<RendererTopic>("charts");

/**
 * The page-wide chart renderer (null outside chart pages), shown by the demo
 * badges. The charts follow it by themselves through the engine's default.
 */
export const ChartRendererContext =
  createContext<ChartRendererPreference | null>(null);

```

### apps/docs/src/docs/registry.ts

```tsx
/**
 * Single source of truth for the documentation site.
 *
 * Plain data only (no React / JSX) so tests can import it in Node:
 * - the router builds one lazily-loaded route per page from this list
 * - the sidebar groups pages by `category`
 * - `src/docs/docs.test.ts` checks that every public export of the libraries
 *   is documented, that every `api` entry exists in `api.generated.json`,
 *   that every demo file exists and that all locales contain the page strings.
 *
 * Page content lives in `src/docs/pages/<id>/index.tsx` (+ `demos/<demo>.tsx`)
 * and its strings in `src/i18n/locales/<lng>/docs/<id>.json`.
 */

export type DocCategory =
  | "gettingStarted"
  | "theming"
  | "configuration"
  | "general"
  | "layout"
  | "dataEntry"
  | "dataDisplay"
  | "feedback"
  | "navigation"
  | "overlays"
  | "editors"
  | "charts"
  | "financeCharts"
  | "charts3d"
  | "graphCharts"
  | "chartEngine"
  | "icons"
  | "mobile"
  | "webComponents";

export interface DocPageMeta {
  /** Route path and folder name under src/docs/pages */
  id: string;
  category: DocCategory;
  /** Runtime exports of the package documented on this page */
  exports?: string[];
  /** Package the exports come from */
  package?:
    | "minerva-design"
    | "minerva-design/web-components"
    | "minerva-design/charts"
    | "minerva-design/charts/core"
    | "minerva-design/icons"
    | "minerva-design/icons/core";
  /** Interfaces from api.generated.json rendered as API tables */
  api?: string[];
  /** Demo ids, in display order; each maps to `pages/<id>/demos/<demo>.tsx` */
  demos?: string[];
  /**
   * Component folders of minerva-design whose CSS custom properties
   * (`// @css-var` comments in their SCSS) are listed in a "CSS variables"
   * section
   */
  cssVars?: string[];
  /**
   * Web Component counterpart shown in the page's "Web Components" tab:
   * the define entry (`minerva-design/web-components/<entry>`), the custom
   * elements documented on the page (API tables from custom-elements.json)
   * and the demo ids (`pages/<id>/wc/<demo>.html` + optional `<demo>.ts`)
   */
  wc?: WcMeta;
  /**
   * React Native counterpart shown in the page's "React Native" tab
   * (minerva-design/native): exports, API interfaces of
   * api.native.generated.json (without the `native:` prefix) and demo ids
   * (`pages/<id>/native/<demo>.tsx`, rendered through react-native-web in a
   * phone frame). A page with `native` only (no `exports`) is a mobile
   * component: the React Native content is the whole page.
   */
  native?: NativeMeta;
}

export interface NativeMeta {
  /** Exports of minerva-design/native documented on the page */
  exports: string[];
  /** Entry the exports come from @default "minerva-design/native" */
  package?: string;
  /** Interfaces rendered as API tables (`ButtonProps` = `native:ButtonProps`) */
  api: string[];
  /** Demo ids, in display order */
  demos: string[];
}

export interface WcMeta {
  /** Define entry: `minerva-design/web-components/<entry>` */
  entry: string;
  /** Tag names documented on the page, in display order */
  tags: string[];
  /** Demo ids, in display order */
  demos: string[];
}

export const categories: DocCategory[] = [
  "gettingStarted",
  "theming",
  "configuration",
  "webComponents",
  "general",
  "layout",
  "dataEntry",
  "dataDisplay",
  "feedback",
  "overlays",
  "navigation",
  "editors",
  "mobile",
  "charts",
  "financeCharts",
  "charts3d",
  "graphCharts",
  "chartEngine",
  "icons",
];

/** Top-level parts of the site, each with its own sidebar */
export type DocSection = "docs" | "components" | "charts" | "icons";

export interface DocSectionMeta {
  id: DocSection;
  /** Page the top navigation link opens */
  home: string;
  categories: readonly DocCategory[];
}

export const sections: readonly DocSectionMeta[] = [
  {
    id: "docs",
    home: "overview",
    categories: ["gettingStarted", "theming", "configuration", "webComponents"],
  },
  {
    id: "components",
    home: "button",
    categories: [
      "general",
      "layout",
      "dataEntry",
      "dataDisplay",
      "feedback",
      "overlays",
      "navigation",
      "editors",
      "mobile",
    ],
  },
  {
    id: "charts",
    home: "charts",
    categories: [
      "charts",
      "financeCharts",
      "charts3d",
      "graphCharts",
      "chartEngine",
    ],
  },
  {
    id: "icons",
    home: "icons",
    categories: ["icons"],
  },
];

/** Section of a category (every category belongs to exactly one) */
export const sectionOf = (category: DocCategory): DocSection =>
  sections.find((section) => section.categories.includes(category))?.id ??
  "docs";

export const docPages: DocPageMeta[] = [
  // Getting started
  { id: "overview", category: "gettingStarted" },
  { id: "installation", category: "gettingStarted" },
  { id: "introduction", category: "gettingStarted" },
  { id: "architecture", category: "gettingStarted" },
  { id: "platform-support", category: "gettingStarted" },
  { id: "rsc-guide", category: "gettingStarted" },
  { id: "vue", category: "gettingStarted" },
  { id: "angular", category: "gettingStarted" },
  { id: "react-native", category: "gettingStarted" },
  { id: "theming", category: "gettingStarted", demos: ["scoped-theme"] },
  {
    id: "styling",
    category: "gettingStarted",
    demos: [
      "restyle-button",
      "restyle-modal",
      "restyle-tabs",
      "restyle-table",
      "items-menu",
      "items-select",
      "items-pagination",
      "items-table",
      "items-toast",
    ],
  },
  { id: "changelog", category: "gettingStarted" },

  // Configuration: ConfigProvider, hooks and theme utilities
  {
    id: "config-provider",
    category: "configuration",
    exports: ["ConfigProvider", "useConfig", "ConfigContext"],
    api: ["ConfigContextProviderProps", "ConfigContextProps", "Locale"],
    demos: ["use-config", "custom-theme", "locale", "palette", "brand-color"],
    wc: {
      entry: "config",
      tags: ["minerva-config"],
      demos: ["basic", "palette-design", "locale", "nested", "brand-color"],
    },
    native: {
      exports: [
        "MinervaProvider",
        "ConfigProvider",
        "useTheme",
        "useTokens",
        "useI18n",
        "useInsets",
      ],
      api: [
        "MinervaProviderProps",
        "MinervaTheme",
        "MinervaI18n",
        "NativeLocale",
        "NativeFonts",
      ],
      demos: ["switching", "use-theme"],
    },
  },
  {
    id: "hooks",
    category: "configuration",
    exports: ["useAutoTheme", "useLocale", "useI18n", "useDisclosure", "cn"],
    demos: ["use-auto-theme", "use-locale", "use-disclosure"],
  },
  {
    id: "theme-utils",
    category: "configuration",
    exports: [
      "applyThemeStyles",
      "generateCSSVariables",
      "getSystemTheme",
      "isBilingualTheme",
      "resolveTheme",
      "themes",
      "light",
      "dark",
      "githubDark",
    ],
    api: ["ThemeProps", "SemanticThemeProps", "ComponentThemeProps"],
    demos: ["theme-swatches", "resolve-theme", "scoped-preview"],
  },

  // General
  {
    id: "button",
    cssVars: ["Button"],
    category: "general",
    exports: ["Button"],
    api: ["ButtonProps"],
    demos: [
      "basic",
      "colors",
      "variants",
      "sizes",
      "shapes",
      "states",
      "with-icon",
      "icons-loading",
      "form",
    ],
    wc: {
      entry: "button",
      tags: ["minerva-button"],
      demos: ["basic", "colors-variants", "sizes-shapes", "states", "form"],
    },
    native: {
      exports: ["Button"],
      api: ["ButtonProps"],
      demos: [
        "basic",
        "colors",
        "variants",
        "sizes",
        "shapes",
        "states",
        "with-icon",
        "icons-loading",
        "form",
      ],
    },
  },
  {
    id: "icon-button",
    cssVars: ["IconButton"],
    category: "general",
    exports: ["IconButton"],
    api: ["IconButtonProps"],
    demos: [
      "basic",
      "colors",
      "variants",
      "sizes-and-shapes",
      "states",
      "toggle",
      "search",
      "custom-colors",
      "tooltip",
      "label",
    ],
    wc: {
      entry: "icon-button",
      tags: ["minerva-icon-button"],
      demos: ["basic", "sizes-shapes", "toggle", "states"],
    },
    native: {
      exports: ["IconButton"],
      api: ["IconButtonProps"],
      demos: ["basic", "toggle", "variants-sizes"],
    },
  },

  // Layout
  {
    id: "divider",
    cssVars: ["Divider"],
    category: "layout",
    exports: ["Divider"],
    api: ["DividerProps"],
    demos: [
      "basic",
      "variants",
      "with-text",
      "vertical",
      "flex-item",
      "custom-style",
    ],
    wc: {
      entry: "divider",
      tags: ["minerva-divider"],
      demos: [
        "basic",
        "variants",
        "with-text",
        "vertical",
        "flex-item",
        "custom-style",
      ],
    },
    native: {
      exports: ["Divider"],
      api: ["DividerProps"],
      demos: ["basic", "vertical", "with-text"],
    },
  },
  {
    id: "card",
    cssVars: ["Card"],
    category: "layout",
    exports: [
      "Card",
      "CardHeader",
      "CardTitle",
      "CardDescription",
      "CardContent",
      "CardFooter",
    ],
    api: [
      "CardProps",
      "CardHeaderProps",
      "CardTitleProps",
      "CardDescriptionProps",
      "CardContentProps",
      "CardFooterProps",
    ],
    demos: [
      "basic",
      "variants",
      "padded",
      "interactive",
      "custom-colors",
      "animation",
    ],
    wc: {
      entry: "card",
      tags: [
        "minerva-card",
        "minerva-card-header",
        "minerva-card-content",
        "minerva-card-footer",
        "minerva-card-title",
        "minerva-card-description",
      ],
      demos: ["basic", "variants", "padded", "interactive"],
    },
    native: {
      exports: [
        "Card",
        "CardHeader",
        "CardTitle",
        "CardDescription",
        "CardContent",
        "CardFooter",
      ],
      api: ["CardProps"],
      demos: ["basic", "product", "variants"],
    },
  },
  {
    id: "virtual-list",
    cssVars: ["VirtualList"],
    category: "layout",
    exports: ["VirtualList"],
    api: ["VirtualListProps", "VirtualListItem"],
    demos: [
      "basic",
      "auto-height",
      "infinite-scroll",
      "high-performance",
      "clickable-rows",
    ],
    wc: {
      entry: "virtual-list",
      tags: ["minerva-virtual-list"],
      demos: ["basic", "clickable-rows", "infinite-scroll"],
    },
    native: {
      exports: ["VirtualList"],
      api: ["VirtualListProps"],
      demos: ["basic"],
    },
  },

  // Data entry
  {
    id: "checkbox",
    cssVars: ["Checkbox"],
    category: "dataEntry",
    exports: ["Checkbox"],
    api: ["CheckboxProps"],
    demos: [
      "basic",
      "controlled",
      "indeterminate",
      "sizes-and-shapes",
      "label-placement",
      "states",
      "custom-style",
      "error",
      "colors-and-form-control",
    ],
    native: {
      exports: ["Checkbox"],
      api: ["CheckboxProps"],
      demos: ["basic", "controlled", "indeterminate"],
    },
    wc: {
      entry: "checkbox",
      tags: ["minerva-checkbox"],
      demos: ["basic", "select-all", "styles-states", "form"],
    },
  },
  {
    id: "radio",
    cssVars: ["Radio"],
    category: "dataEntry",
    exports: ["Radio", "RadioGroup"],
    api: ["RadioProps", "RadioGroupProps"],
    demos: [
      "basic",
      "controlled",
      "horizontal",
      "sizes",
      "colors",
      "disabled",
      "validation",
    ],
    native: {
      exports: ["Radio", "RadioGroup"],
      api: ["RadioProps", "RadioGroupProps"],
      demos: ["basic", "controlled", "disabled"],
    },
    wc: {
      entry: "radio",
      tags: ["minerva-radio", "minerva-radio-group"],
      demos: ["basic", "styles-states", "form"],
    },
  },
  {
    id: "switch",
    cssVars: ["Switch"],
    native: {
      exports: ["Switch"],
      api: ["SwitchProps"],
      demos: [
        "basic",
        "controlled",
        "sizes",
        "colors",
        "label-placement",
        "states",
      ],
    },
    category: "dataEntry",
    exports: ["Switch"],
    api: ["SwitchProps"],
    demos: [
      "basic",
      "controlled",
      "sizes",
      "colors",
      "label-placement",
      "states",
      "icons",
      "custom-style",
      "bilateral-and-segmented",
    ],
    wc: {
      entry: "switch",
      tags: ["minerva-switch"],
      demos: ["basic", "styles-states", "side-labels", "form"],
    },
  },
  {
    id: "auto-complete",
    cssVars: ["AutoComplete"],
    category: "dataEntry",
    exports: ["AutoComplete"],
    api: ["AutoCompleteProps", "AutoCompleteOption"],
    demos: [
      "basic",
      "controlled",
      "rich-options",
      "custom-render",
      "grouped",
      "filter-sort",
      "async-loading",
      "appearance",
      "search-box",
    ],
    wc: {
      entry: "autocomplete",
      tags: ["minerva-autocomplete"],
      demos: ["basic", "rich-options", "custom-render", "async-loading"],
    },
    native: {
      exports: ["AutoComplete"],
      api: ["AutoCompleteProps"],
      demos: ["basic"],
    },
  },
  {
    id: "cascader",
    cssVars: ["Cascader"],
    category: "dataEntry",
    exports: ["Cascader"],
    api: ["CascaderProps", "CascaderOption"],
    demos: [
      "basic",
      "default-value",
      "controlled",
      "hover",
      "search",
      "display-render",
      "disabled",
      "lazy-load",
      "custom-option",
    ],
    wc: {
      entry: "cascader",
      tags: ["minerva-cascader"],
      demos: ["basic", "search-hover", "lazy", "form"],
    },
    native: { exports: ["Cascader"], api: ["CascaderProps"], demos: ["basic"] },
  },
  {
    id: "time-picker",
    cssVars: ["TimePicker"],
    category: "dataEntry",
    exports: ["TimePicker"],
    api: ["TimePickerProps"],
    demos: [
      "basic",
      "default-value",
      "controlled",
      "formats",
      "twelve-hour",
      "steps",
      "time-range",
      "sizes",
      "disabled",
    ],
    wc: {
      entry: "time-picker",
      tags: ["minerva-time-picker"],
      demos: ["basic", "formats", "range-steps", "form"],
    },
    native: {
      exports: ["TimePicker"],
      api: ["TimePickerProps"],
      demos: ["basic"],
    },
  },
  {
    id: "date-picker",
    cssVars: ["DatePicker"],
    category: "dataEntry",
    exports: ["DatePicker"],
    api: ["DatePickerProps"],
    demos: [
      "basic",
      "default-value",
      "controlled",
      "min-max",
      "sizes",
      "disabled",
      "form-control",
    ],
    wc: {
      entry: "date-picker",
      tags: ["minerva-date-picker"],
      demos: ["basic"],
    },
    native: {
      exports: ["DatePicker"],
      api: ["DatePickerProps"],
      demos: ["basic"],
    },
  },

  // Data display
  {
    id: "avatar",
    cssVars: ["Avatar"],
    category: "dataDisplay",
    exports: ["Avatar", "AvatarGroup"],
    api: ["AvatarProps", "AvatarGroupProps"],
    demos: ["basic", "shapes", "sizes", "group", "fallback"],
    wc: {
      entry: "avatar",
      tags: ["minerva-avatar", "minerva-avatar-group"],
      demos: ["basic", "shapes-sizes", "group", "fallback"],
    },
    native: {
      exports: ["Avatar", "AvatarGroup"],
      api: ["AvatarProps", "AvatarGroupProps"],
      demos: ["basic", "group", "sizes-shapes"],
    },
  },
  {
    id: "badge",
    cssVars: ["Badge"],
    category: "dataDisplay",
    exports: ["Badge"],
    api: ["BadgeProps"],
    demos: [
      "basic",
      "colors",
      "variants",
      "positions",
      "sizes",
      "dot",
      "with-icon",
      "custom-style",
      "status",
    ],
    wc: {
      entry: "badge",
      tags: ["minerva-badge"],
      demos: ["basic", "colors-variants", "positions", "slots"],
    },
    native: {
      exports: ["Badge"],
      api: ["BadgeProps"],
      demos: ["basic", "colors-variants", "dot-max"],
    },
  },
  {
    id: "tag",
    cssVars: ["Tag"],
    category: "dataDisplay",
    exports: ["Tag"],
    api: ["TagProps"],
    demos: [
      "colors",
      "variants",
      "sizes-shapes",
      "with-icon",
      "closable",
      "clickable",
      "avatar-loading",
      "custom-colors",
      "disabled",
    ],
    wc: {
      entry: "tag",
      tags: ["minerva-tag"],
      demos: ["basic", "variants-sizes", "closable", "toggle"],
    },
    native: {
      exports: ["Tag"],
      api: ["TagProps"],
      demos: ["closable", "colors-variants", "selectable"],
    },
  },
  {
    id: "empty",
    cssVars: ["Empty"],
    category: "dataDisplay",
    exports: ["Empty"],
    api: ["EmptyProps"],
    demos: ["basic", "svg", "custom-icon", "with-action", "sizes", "styled"],
    wc: {
      entry: "empty",
      tags: ["minerva-empty"],
      demos: ["basic", "actions", "sizes-styles"],
    },
    native: { exports: ["Empty"], api: ["EmptyProps"], demos: ["basic"] },
  },
  {
    id: "tooltip",
    cssVars: ["Tooltip"],
    category: "dataDisplay",
    exports: ["Tooltip", "TooltipProvider"],
    api: ["TooltipProps", "TooltipRef", "TooltipProviderProps"],
    demos: [
      "basic",
      "placements",
      "colors",
      "variants",
      "shapes",
      "animations",
      "custom-colors",
      "delays",
      "follow-cursor",
      "controlled",
      "events",
      "as-child",
      "provider",
    ],
    wc: {
      entry: "tooltip",
      tags: ["minerva-tooltip-provider", "minerva-tooltip"],
      demos: ["basic", "styles", "provider", "controlled"],
    },
    native: {
      exports: ["Tooltip", "TooltipProvider"],
      api: ["TooltipProps", "TooltipProviderProps"],
      demos: ["basic"],
    },
  },

  // Feedback
  {
    id: "alert",
    cssVars: ["Alert"],
    category: "feedback",
    exports: ["Alert"],
    api: ["AlertProps"],
    demos: [
      "colors",
      "variants",
      "with-title",
      "sizes",
      "closable",
      "with-action",
      "collapsible",
      "banner",
      "appearance",
      "animations",
      "return-focus",
    ],
    wc: {
      entry: "alert",
      tags: ["minerva-alert"],
      demos: ["basic", "variants-sizes", "closable", "collapsible"],
    },
    native: { exports: ["Alert"], api: ["AlertProps"], demos: ["basic"] },
  },
  {
    id: "progress",
    cssVars: ["ProgressIndicator"],
    category: "feedback",
    exports: ["ProgressIndicator"],
    api: ["ProgressIndicatorProps"],
    demos: [
      "variants",
      "sizes",
      "colors",
      "label",
      "width",
      "with-icon",
      "determinate",
    ],
    wc: {
      entry: "progress",
      tags: ["minerva-progress"],
      demos: ["basic", "sizes-colors", "label-width", "determinate"],
    },
    native: {
      exports: ["ProgressIndicator"],
      api: ["ProgressProps"],
      demos: ["basic"],
    },
  },
  {
    id: "skeleton",
    cssVars: ["Skeleton"],
    category: "feedback",
    exports: ["Skeleton", "SkeletonText"],
    api: ["SkeletonProps", "SkeletonTextProps"],
    demos: [
      "basic",
      "variants",
      "animations",
      "composition",
      "card",
      "loading",
      "decorative",
      "skeleton-text",
    ],
    wc: {
      entry: "skeleton",
      tags: ["minerva-skeleton", "minerva-skeleton-text"],
      demos: ["basic", "variants", "loading", "composition"],
    },
    native: {
      exports: ["Skeleton", "SkeletonText"],
      api: ["SkeletonProps", "SkeletonTextProps"],
      demos: ["basic"],
    },
  },

  // Navigation
  {
    id: "pagination",
    cssVars: ["Pagination"],
    category: "navigation",
    exports: ["Pagination"],
    api: ["PaginationProps", "PaginationLabels"],
    demos: [
      "basic",
      "many-pages",
      "total-and-jumper",
      "size-changer",
      "sizes",
      "shapes-and-variants",
      "simple",
      "custom-render",
      "disabled",
      "responsive",
      "compact",
    ],
    wc: {
      entry: "pagination",
      tags: ["minerva-pagination"],
      demos: ["basic", "total-and-jumper", "appearance", "simple"],
    },
    native: {
      exports: ["Pagination"],
      api: ["PaginationProps"],
      demos: ["basic", "simple"],
    },
  },

  // Layout
  {
    id: "box",
    category: "layout",
    exports: ["Box"],
    api: ["BoxProps"],
    demos: ["basic", "sizing", "polymorphic"],
    wc: {
      entry: "box",
      tags: ["minerva-box"],
      demos: ["basic", "spacing-sizing", "surfaces"],
    },
    native: { exports: ["Box"], api: ["BoxProps"], demos: ["basic"] },
  },
  {
    id: "stack",
    cssVars: ["Stack"],
    category: "layout",
    exports: ["Stack", "HStack", "VStack"],
    api: ["StackProps"],
    demos: ["basic", "horizontal", "gap", "wrap", "separator", "attached"],
    wc: {
      entry: "stack",
      tags: ["minerva-stack", "minerva-hstack", "minerva-vstack"],
      demos: ["basic", "hstack-vstack", "wrap-separator", "attached"],
    },
    native: {
      exports: ["Stack", "HStack", "VStack"],
      api: ["StackProps", "HStackProps", "VStackProps"],
      demos: ["basic"],
    },
  },
  {
    id: "responsive-grid",
    cssVars: ["ResponsiveGrid"],
    category: "layout",
    exports: ["ResponsiveGrid", "GridItem"],
    api: ["ResponsiveGridProps", "GridItemProps"],
    demos: ["basic", "full-width"],
    wc: {
      entry: "responsive-grid",
      tags: ["minerva-responsive-grid", "minerva-grid-item"],
      demos: ["basic", "container", "full-width"],
    },
    native: {
      exports: ["ResponsiveGrid", "GridItem"],
      api: ["ResponsiveGridProps", "GridItemProps"],
      demos: ["basic"],
    },
  },
  {
    id: "split-layout",
    cssVars: ["SplitLayout"],
    category: "layout",
    exports: ["SplitLayout"],
    api: ["SplitLayoutProps"],
    demos: ["basic", "options"],
    wc: {
      entry: "split-layout",
      tags: ["minerva-split-layout"],
      demos: ["basic", "options"],
    },
    native: {
      exports: ["SplitLayout"],
      api: ["SplitLayoutProps"],
      demos: ["basic"],
    },
  },
  {
    id: "page",
    cssVars: ["Page"],
    category: "layout",
    exports: ["Page", "PageHeader", "PageSection", "StatCard", "Toolbar"],
    api: [
      "PageProps",
      "PageHeaderProps",
      "PageSectionProps",
      "StatCardProps",
      "ToolbarProps",
    ],
    demos: ["basic", "stat-cards", "toolbar"],
    wc: {
      entry: "page",
      tags: [
        "minerva-page",
        "minerva-page-header",
        "minerva-page-section",
        "minerva-toolbar",
        "minerva-stat-card",
      ],
      demos: ["basic", "stat-cards", "toolbar"],
    },
    native: {
      exports: ["Page", "PageHeader", "PageSection", "StatCard", "Toolbar"],
      api: [
        "PageProps",
        "PageHeaderProps",
        "PageSectionProps",
        "StatCardProps",
        "ToolbarProps",
      ],
      demos: ["basic"],
    },
  },
  {
    id: "app-shell",
    cssVars: ["AppShell"],
    category: "layout",
    exports: ["AppShell"],
    api: ["AppShellProps", "AppShellNavigationState", "AppShellLabels"],
    demos: ["basic", "controlled", "skip-link"],
    wc: {
      entry: "app-shell",
      tags: ["minerva-app-shell"],
      demos: ["basic", "sidebar-modes", "controlled"],
    },
    native: { exports: ["AppShell"], api: ["AppShellProps"], demos: ["basic"] },
  },

  // Overlays
  {
    id: "modal",
    cssVars: ["Modal"],
    category: "overlays",
    exports: [
      "Modal",
      "ModalRoot",
      "ModalTrigger",
      "ModalClose",
      "ModalContent",
      "ModalHeader",
      "ModalBody",
      "ModalFooter",
    ],
    api: [
      "ModalProps",
      "ModalRootProps",
      "ModalTriggerProps",
      "ModalContentProps",
    ],
    demos: ["basic", "uncontrolled", "sizes", "form", "compound"],
    wc: {
      entry: "modal",
      tags: ["minerva-modal"],
      demos: ["basic", "sizes", "form", "events"],
    },
    native: {
      exports: [
        "Dialog",
        "Modal",
        "ModalRoot",
        "ModalTrigger",
        "ModalClose",
        "ModalContent",
        "ModalHeader",
        "ModalBody",
        "ModalFooter",
      ],
      api: ["DialogProps", "ModalRootProps", "ModalTriggerProps"],
      demos: ["basic", "form", "confirm", "custom-footer"],
    },
  },
  {
    id: "confirm",
    category: "overlays",
    exports: ["ConfirmDialog", "ConfirmProvider", "confirm", "useConfirm"],
    api: ["ConfirmDialogProps", "ConfirmOptions", "ConfirmProviderProps"],
    demos: ["imperative", "colors", "provider", "declarative", "scoped"],
    wc: {
      entry: "confirm",
      tags: ["minerva-confirm-dialog", "minerva-confirm-provider"],
      demos: ["basic", "async", "imperative", "scoped"],
    },
    native: {
      exports: ["ConfirmDialog", "ConfirmProvider"],
      api: ["ConfirmDialogProps", "ConfirmProviderProps"],
      demos: ["basic"],
    },
  },
  {
    id: "drawer",
    cssVars: ["Drawer"],
    category: "overlays",
    exports: [
      "Drawer",
      "DrawerRoot",
      "DrawerTrigger",
      "DrawerClose",
      "DrawerContent",
      "DrawerHeader",
      "DrawerBody",
      "DrawerFooter",
    ],
    api: ["DrawerProps", "DrawerRootProps", "DrawerContentProps"],
    demos: ["basic", "sides", "compound"],
    wc: {
      entry: "drawer",
      tags: ["minerva-drawer"],
      demos: ["basic", "sides", "non-modal"],
    },
    native: {
      exports: [
        "Drawer",
        "DrawerRoot",
        "DrawerTrigger",
        "DrawerClose",
        "DrawerContent",
        "DrawerHeader",
        "DrawerBody",
        "DrawerFooter",
      ],
      api: ["PopupProps"],
      demos: ["basic"],
    },
  },
  {
    id: "command",
    cssVars: ["Command"],
    category: "overlays",
    exports: ["CommandDialog", "normalizeShortcuts", "matchesShortcut"],
    api: ["CommandDialogProps", "CommandItem"],
    demos: ["basic", "shortcut", "custom-filter", "site-search"],
    wc: {
      entry: "command",
      tags: ["minerva-command-dialog"],
      demos: ["basic", "shortcut", "custom-filter"],
    },
    native: {
      exports: ["CommandDialog"],
      api: ["CommandDialogProps"],
      demos: ["basic"],
    },
  },
  {
    id: "popover",
    cssVars: ["Popover"],
    category: "overlays",
    exports: [
      "Popover",
      "PopoverTrigger",
      "PopoverAnchor",
      "PopoverClose",
      "PopoverContent",
    ],
    api: ["PopoverProps", "PopoverContentProps", "PopoverTriggerProps"],
    demos: ["basic", "placement", "controlled"],
    wc: {
      entry: "popover",
      tags: ["minerva-popover"],
      demos: ["basic", "placement", "anchor"],
    },
    native: {
      exports: [
        "Popover",
        "PopoverTrigger",
        "PopoverAnchor",
        "PopoverClose",
        "PopoverContent",
      ],
      api: ["PopoverProps", "PopoverTriggerProps", "PopoverContentProps"],
      demos: ["basic"],
    },
  },

  {
    id: "menu",
    cssVars: ["Menu"],
    category: "overlays",
    exports: ["Menu", "ContextMenu"],
    api: [
      "MenuProps",
      "ContextMenuProps",
      "MenuAction",
      "MenuCheckboxEntry",
      "MenuRadioGroupEntry",
      "MenuRadioItem",
      "MenuSeparatorEntry",
      "MenuGroupEntry",
    ],
    demos: [
      "basic",
      "triggers",
      "groups",
      "submenus",
      "checkbox-radio",
      "placement",
      "disabled",
      "context-menu",
      "controlled",
    ],
    wc: {
      entry: "menu",
      tags: [
        "minerva-context-menu",
        "minerva-menu-item",
        "minerva-menu-checkbox-item",
        "minerva-menu-radio-item",
        "minerva-menu-group",
        "minerva-menu-separator",
        "minerva-menu-label",
        "minerva-menu",
      ],
      demos: ["basic", "checkbox-radio", "items", "context-menu"],
    },
    native: {
      exports: ["Menu", "ContextMenu"],
      api: ["MenuProps", "ContextMenuProps"],
      demos: ["basic"],
    },
  },
  {
    id: "toast",
    cssVars: ["Toast"],
    category: "feedback",
    exports: ["ToastProvider", "toast", "useToast"],
    api: [
      "ToastOptions",
      "ToastAction",
      "ToastProviderProps",
      "ToastApi",
      "ToastPromiseMessages",
    ],
    demos: [
      "basic",
      "colors",
      "options",
      "loading",
      "action",
      "dedupe",
      "scoped",
      "keyboard",
    ],
    native: {
      exports: ["ToastProvider", "toast", "useToast"],
      api: ["ToastOptions", "ToastApi", "ToastProviderProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "toast",
      tags: ["minerva-toast-region"],
      demos: ["basic", "options", "loading"],
    },
  },
  {
    id: "page-tabs",
    cssVars: ["PageTabs"],
    category: "navigation",
    exports: ["PageTabs", "PageTab"],
    api: ["PageTabsProps", "PageTabProps"],
    demos: ["basic", "context-menu", "overflow"],
    wc: {
      entry: "page-tabs",
      tags: ["minerva-page-tabs", "minerva-page-tab"],
      demos: ["basic", "actions", "overflow"],
    },
    native: {
      exports: ["PageTabs", "PageTab"],
      api: ["PageTabsProps", "PageTabProps"],
      demos: ["basic"],
    },
  },

  // Forms
  {
    id: "form-control",
    cssVars: ["FormControl"],
    category: "dataEntry",
    exports: [
      "FormControl",
      "FormLabel",
      "FormHelperText",
      "FormErrorMessage",
      "FormField",
      "useFormControlContext",
      "useFormControlProps",
    ],
    api: ["FormControlProps", "FormLabelProps", "FormFieldProps"],
    demos: ["basic", "form-field", "states", "custom-control"],
    wc: {
      entry: "form-control",
      tags: ["minerva-form-control"],
      demos: ["basic", "states", "slots", "form"],
    },
    native: {
      exports: [
        "FormControl",
        "FormLabel",
        "FormHelperText",
        "FormErrorMessage",
        "FormField",
      ],
      api: ["FormControlProps", "FormFieldProps"],
      demos: ["basic"],
    },
  },
  {
    id: "form-layout",
    cssVars: ["FormLayout"],
    category: "dataEntry",
    exports: ["FormLayout"],
    api: ["FormLayoutProps"],
    demos: ["basic", "gaps"],
    wc: {
      entry: "form-layout",
      tags: ["minerva-form-layout"],
      demos: ["basic", "gaps"],
    },
    native: {
      exports: ["FormLayout"],
      api: ["FormLayoutProps"],
      demos: ["basic"],
    },
  },
  {
    id: "input",
    cssVars: ["Input"],
    native: {
      exports: ["Input"],
      api: ["InputProps"],
      demos: ["basic", "states", "sizes-variants", "clearable-and-count"],
    },
    category: "dataEntry",
    exports: ["Input"],
    api: ["InputProps"],
    demos: [
      "basic",
      "sizes-variants",
      "addons",
      "clearable-and-count",
      "password",
      "states",
      "validation",
    ],
    wc: {
      entry: "input",
      tags: ["minerva-input"],
      demos: ["basic", "sizes-variants", "addons", "form"],
    },
  },
  {
    id: "textarea",
    cssVars: ["Textarea"],
    category: "dataEntry",
    exports: ["Textarea"],
    api: ["TextareaProps"],
    demos: ["basic", "sizes-variants", "form-control"],
    wc: {
      entry: "textarea",
      tags: ["minerva-textarea"],
      demos: ["basic", "sizes-variants", "form"],
    },
    native: { exports: ["Textarea"], api: ["TextareaProps"], demos: ["basic"] },
  },
  {
    id: "number-input",
    cssVars: ["NumberInput"],
    category: "dataEntry",
    exports: ["NumberInput"],
    api: ["NumberInputProps"],
    demos: ["basic", "stepper-precision", "form-control"],
    wc: {
      entry: "number-input",
      tags: ["minerva-number-input"],
      demos: ["basic", "precision", "form"],
    },
    native: {
      exports: ["NumberInput"],
      api: ["NumberInputProps"],
      demos: ["basic"],
    },
  },
  {
    id: "json-field",
    cssVars: ["JsonField"],
    category: "dataEntry",
    exports: ["JsonField"],
    api: ["JsonFieldProps"],
    demos: ["basic", "indent", "form-control"],
    wc: {
      entry: "json-field",
      tags: ["minerva-json-field"],
      demos: ["basic", "options", "form"],
    },
    native: {
      exports: ["JsonField"],
      api: ["JsonFieldProps"],
      demos: ["basic"],
    },
  },
  {
    id: "key-value-editor",
    cssVars: ["KeyValueEditor"],
    category: "dataEntry",
    exports: ["KeyValueEditor"],
    api: ["KeyValueEditorProps", "KeyValueEntry", "KeyValueEntryErrors"],
    demos: ["basic", "errors"],
    wc: {
      entry: "key-value-editor",
      tags: ["minerva-key-value-editor"],
      demos: ["basic", "errors", "form"],
    },
    native: {
      exports: ["KeyValueEditor"],
      api: ["KeyValueEditorProps"],
      demos: ["basic"],
    },
  },
  {
    id: "tag-input",
    cssVars: ["TagInput"],
    category: "dataEntry",
    exports: ["TagInput"],
    api: ["TagInputProps"],
    demos: ["basic", "form-control", "separators"],
    wc: {
      entry: "tag-input",
      tags: ["minerva-tag-input"],
      demos: ["basic", "separators", "states", "form"],
    },
    native: { exports: ["TagInput"], api: ["TagInputProps"], demos: ["basic"] },
  },

  {
    id: "loading-state",
    cssVars: ["LoadingState"],
    category: "feedback",
    exports: ["LoadingState"],
    api: ["LoadingStateProps"],
    demos: ["basic", "sizes"],
    wc: {
      entry: "loading-state",
      tags: ["minerva-loading-state"],
      demos: ["basic", "sizes", "section"],
    },
    native: {
      exports: ["LoadingState"],
      api: ["LoadingProps"],
      demos: ["basic"],
    },
  },
  {
    id: "text-link",
    cssVars: ["TextLink"],
    category: "dataDisplay",
    exports: ["TextLink"],
    api: ["TextLinkProps"],
    demos: ["variants", "as-child"],
    wc: {
      entry: "text-link",
      tags: ["minerva-text-link"],
      demos: ["basic", "variants", "styling"],
    },
    native: { exports: ["TextLink"], api: ["TextLinkProps"], demos: ["basic"] },
  },
  {
    id: "description-list",
    cssVars: ["DescriptionList"],
    category: "dataDisplay",
    exports: ["DescriptionList"],
    api: ["DescriptionListProps", "DescriptionListItem"],
    demos: ["basic", "variants"],
    wc: {
      entry: "description-list",
      tags: ["minerva-description-item", "minerva-description-list"],
      demos: ["basic", "items", "variants", "styling"],
    },
    native: {
      exports: ["DescriptionList"],
      api: ["DescriptionListProps"],
      demos: ["basic"],
    },
  },
  {
    id: "list",
    cssVars: ["List"],
    category: "dataDisplay",
    exports: ["List", "ListItem"],
    api: ["ListProps", "ListItemProps"],
    demos: ["basic", "compact", "bordered"],
    wc: {
      entry: "list",
      tags: ["minerva-list", "minerva-list-item"],
      demos: ["basic", "slots", "density", "bordered"],
    },
    native: {
      exports: ["Cell", "CellGroup", "List", "ListItem"],
      api: ["CellProps", "CellGroupProps", "ListProps", "ListItemProps"],
      demos: ["basic", "inset-groups", "rich-rows"],
    },
  },
  {
    id: "code-block",
    cssVars: ["CodeBlock"],
    category: "dataDisplay",
    exports: ["CodeBlock"],
    api: ["CodeBlockProps"],
    demos: [
      "basic",
      "languages",
      "auto-language",
      "line-numbers",
      "no-wrap",
      "copyable",
      "marks",
    ],
    wc: {
      entry: "code-block",
      tags: ["minerva-code-block"],
      demos: [
        "basic",
        "languages",
        "auto-language",
        "line-numbers",
        "copy",
        "overflow",
        "marks",
      ],
    },
    native: {
      exports: ["CodeBlock"],
      api: ["CodeBlockProps"],
      demos: ["basic", "marks"],
    },
  },
  {
    id: "prose",
    cssVars: ["Prose"],
    category: "dataDisplay",
    exports: ["Prose"],
    api: ["ProseProps"],
    demos: ["basic", "as-child"],
    wc: {
      entry: "prose",
      tags: ["minerva-prose"],
      demos: ["basic", "rich-content", "scopes"],
    },
    native: { exports: ["Prose"], api: ["ProseProps"], demos: ["basic"] },
  },
  {
    id: "design-presets",
    category: "theming",
    api: ["DesignOptions"],
    demos: ["presets", "axes"],
  },
  {
    id: "theme-palette",
    cssVars: ["ThemeToggle"],
    category: "theming",
    exports: [
      "ThemeProvider",
      "useTheme",
      "ThemeToggle",
      "PaletteToggle",
      "palettes",
    ],
    api: [
      "ThemeProviderProps",
      "ThemeContextValue",
      "ThemeToggleProps",
      "PaletteToggleProps",
    ],
    demos: ["toggles", "palette-swatches", "use-theme"],
    wc: {
      entry: "theme-toggle",
      tags: ["minerva-theme-toggle", "minerva-palette-toggle"],
      demos: ["basic", "palette", "events"],
    },
    native: {
      exports: [
        "ThemeToggle",
        "PaletteToggle",
        "PresetToggle",
        "ThemeProvider",
      ],
      api: [
        "ThemeToggleProps",
        "PaletteToggleProps",
        "PresetToggleProps",
        "MinervaProviderProps",
      ],
      demos: ["preset", "toggles"],
    },
  },
  {
    id: "table",
    cssVars: ["Table"],
    category: "dataDisplay",
    exports: [
      "Table",
      "TableRoot",
      "TableHead",
      "TableBody",
      "TableRow",
      "TableHeader",
      "TableCell",
      "TableCellContent",
      "DataTable",
      "computeFixedColumnLayout",
    ],
    api: [
      "TableProps",
      "TableColumn",
      "DataTableProps",
      "TableRootProps",
      "TableScrollConfig",
      "TableSortState",
      "TableRowSelection",
      "TableCellContentProps",
      "FixedColumnLayout",
    ],
    demos: [
      "basic",
      "variants",
      "fixed-columns",
      "states",
      "data-table",
      "compound",
      "cell-content",
      "sorting",
      "selection",
    ],
    wc: {
      entry: "data-table",
      tags: ["minerva-data-table", "minerva-table-cell-content"],
      demos: ["basic", "pagination", "selection", "sorting"],
    },
    native: {
      exports: [
        "Table",
        "TableRoot",
        "TableHead",
        "TableBody",
        "TableRow",
        "TableHeader",
        "TableCell",
        "TableCellContent",
        "DataTable",
      ],
      api: ["TableProps", "TableCellContentProps", "DataTableProps"],
      demos: ["basic"],
    },
  },
  {
    id: "nav-tree",
    cssVars: ["NavTree"],
    category: "navigation",
    exports: ["NavTree"],
    api: ["NavTreeProps", "NavTreeSection", "NavTreeItem", "NavTreeItemState"],
    demos: ["basic", "collapsed", "custom-link"],
    wc: {
      entry: "nav-tree",
      tags: ["minerva-nav-tree"],
      demos: ["basic", "collapsed", "expansion"],
    },
    native: { exports: ["NavTree"], api: ["NavTreeProps"], demos: ["basic"] },
  },
  {
    id: "tabs",
    cssVars: ["Tabs"],
    category: "navigation",
    exports: ["Tabs", "TabList", "Tab", "TabPanel"],
    api: ["TabsProps", "TabListProps", "TabProps", "TabPanelProps"],
    demos: ["basic", "variants", "colors", "vertical"],
    wc: {
      entry: "tabs",
      tags: ["minerva-tabs", "minerva-tab", "minerva-tab-panel"],
      demos: ["basic", "variants", "vertical", "controlled", "panels"],
    },
    native: {
      exports: ["Tabs", "TabList", "Tab", "TabPanel"],
      api: [
        "TabsProps",
        "TabListProps",
        "TabProps",
        "TabPanelProps",
        "TabsItemData",
      ],
      demos: ["basic", "compound", "scrollable", "variants"],
    },
  },
  {
    id: "html-preview",
    cssVars: ["HtmlPreview"],
    category: "dataDisplay",
    exports: ["HtmlPreview"],
    api: ["HtmlPreviewProps"],
    demos: ["basic", "viewports"],
    wc: {
      entry: "html-preview",
      tags: ["minerva-html-preview"],
      demos: ["basic", "viewport", "sanitized"],
    },
    native: {
      exports: ["HtmlPreview"],
      api: ["HtmlPreviewProps"],
      demos: ["basic"],
    },
  },
  {
    id: "monaco-code-editor",
    cssVars: ["MonacoCodeEditor"],
    category: "editors",
    api: ["MonacoCodeEditorProps"],
    demos: ["basic"],
    wc: {
      // optional entry (not in the all-in-one entry nor the CDN bundle)
      entry: "code-editor",
      tags: ["minerva-code-editor"],
      demos: ["basic", "fallback"],
    },
    native: {
      exports: ["CodeEditor"],
      api: ["CodeEditorProps"],
      demos: ["basic"],
    },
  },
  {
    id: "steps",
    cssVars: ["Steps"],
    category: "navigation",
    exports: ["Steps"],
    api: ["StepsProps", "StepsItem"],
    demos: ["basic", "read-only", "styling"],
    wc: {
      entry: "steps",
      tags: ["minerva-steps"],
      demos: ["basic", "navigable", "styling"],
    },
    native: {
      exports: ["Steps"],
      api: ["StepsProps", "StepsItem"],
      demos: ["basic", "vertical"],
    },
  },
  {
    id: "answer-sheet",
    cssVars: ["AnswerSheet"],
    category: "navigation",
    exports: ["AnswerSheet"],
    api: ["AnswerSheetProps", "AnswerSheetItem", "AnswerSheetGroup"],
    demos: ["basic", "groups", "scroll", "sizes"],
    wc: {
      entry: "answer-sheet",
      tags: ["minerva-answer-sheet"],
      demos: ["basic", "groups", "scroll", "sizes"],
    },
    native: {
      exports: ["AnswerSheet"],
      api: ["AnswerSheetProps", "AnswerSheetItem"],
      demos: ["basic"],
    },
  },
  {
    id: "upload",
    cssVars: ["Upload"],
    category: "dataEntry",
    exports: ["Upload"],
    api: ["UploadProps", "UploadItem", "UploadLabels"],
    demos: ["basic", "multiple"],
    wc: {
      entry: "upload",
      tags: ["minerva-upload"],
      demos: ["basic", "transfer", "form"],
    },
    native: { exports: ["Upload"], api: ["UploadProps"], demos: ["basic"] },
  },
  {
    id: "select",
    cssVars: ["Select"],
    category: "dataEntry",
    exports: [
      "Select",
      "SelectItem",
      "SelectGroup",
      "SelectLabel",
      "SelectSeparator",
    ],
    api: [
      "SelectProps",
      "SelectItemProps",
      "SelectGroupProps",
      "SelectLabelProps",
      "SelectSeparatorProps",
    ],
    demos: ["basic", "groups", "sizes-and-states"],
    native: {
      exports: [
        "Select",
        "SelectItem",
        "SelectGroup",
        "SelectLabel",
        "SelectSeparator",
      ],
      api: [
        "SelectSingleProps",
        "SelectMultipleProps",
        "SelectOption",
        "SelectProps",
        "SelectItemProps",
        "SelectGroupProps",
      ],
      demos: ["basic"],
    },
    wc: {
      entry: "select",
      tags: [
        "minerva-option",
        "minerva-option-group",
        "minerva-select-label",
        "minerva-select-separator",
        "minerva-select",
      ],
      demos: ["basic", "groups", "options-property", "form"],
    },
  },
  {
    id: "rating",
    cssVars: ["Rating"],
    category: "dataEntry",
    exports: ["Rating", "RatingScale"],
    api: ["RatingProps", "RatingScaleProps", "RatingDimension"],
    demos: ["basic", "interactive", "scale"],
    wc: {
      entry: "rating",
      tags: ["minerva-rating", "minerva-rating-scale"],
      demos: ["basic", "interactive", "form", "scale"],
    },
    native: {
      exports: ["Rating", "RatingScale"],
      api: ["RatingProps", "RatingScaleProps"],
      demos: ["basic"],
    },
  },
  {
    id: "slider",
    cssVars: ["Slider"],
    category: "dataEntry",
    exports: ["Slider"],
    api: ["SliderProps"],
    demos: ["basic", "range", "marks", "sizes-colors", "committed", "disabled"],
    wc: {
      entry: "slider",
      tags: ["minerva-slider"],
      demos: [
        "basic",
        "range",
        "marks",
        "sizes-colors",
        "committed",
        "disabled",
      ],
    },
    native: {
      exports: ["Slider"],
      api: ["SliderProps"],
      demos: ["basic", "vertical"],
    },
  },
  {
    id: "segmented-control",
    cssVars: ["SegmentedControl"],
    category: "dataEntry",
    exports: ["SegmentedControl"],
    api: ["SegmentedControlProps", "SegmentedControlOptionObject"],
    demos: ["basic", "icons", "sizes", "full-width", "colors"],
    wc: {
      entry: "segmented-control",
      tags: ["minerva-segmented-control"],
      demos: ["basic", "icons", "sizes", "full-width", "colors"],
    },
    native: {
      exports: ["SegmentedControl"],
      api: ["SegmentedControlProps"],
      demos: ["basic"],
    },
  },
  {
    id: "month-calendar",
    cssVars: ["MonthCalendar"],
    category: "dataDisplay",
    exports: ["MonthCalendar"],
    api: ["MonthCalendarProps", "MonthCalendarEvent"],
    demos: ["basic", "sizes", "range"],
    wc: {
      entry: "month-calendar",
      tags: ["minerva-month-calendar"],
      demos: ["basic", "events", "sizes", "range", "localized"],
    },
    native: {
      exports: ["MonthCalendar"],
      api: ["CalendarProps"],
      demos: ["basic"],
    },
  },
  {
    id: "week-strip",
    cssVars: ["WeekStrip"],
    category: "dataDisplay",
    exports: ["WeekStrip"],
    api: ["WeekStripProps"],
    demos: ["basic", "markers", "navigation", "sizes"],
    wc: {
      entry: "week-strip",
      tags: ["minerva-week-strip"],
      demos: ["basic", "markers", "navigation", "sizes"],
    },
    native: {
      exports: ["WeekStrip"],
      api: ["WeekStripProps"],
      demos: ["basic"],
    },
  },
  {
    id: "media-player",
    cssVars: ["MediaPlayer"],
    category: "dataDisplay",
    exports: ["MediaPlayer"],
    api: ["MediaPlayerProps", "MediaPlayerHandle", "MediaPlayerTrack"],
    demos: ["video", "audio", "resume", "rates-skip", "captions"],
    wc: {
      entry: "media-player",
      tags: ["minerva-media-player"],
      demos: ["video", "audio", "resume", "rates-skip", "captions"],
    },
    native: {
      exports: ["MediaControls"],
      api: ["MediaControlsProps"],
      demos: ["basic", "captions"],
    },
  },
  {
    id: "dashboard-columns",
    cssVars: ["DashboardColumns"],
    category: "dataDisplay",
    exports: ["DashboardColumns", "DashboardColumn", "DashboardCard"],
    api: [
      "DashboardColumnsProps",
      "DashboardColumnProps",
      "DashboardCardProps",
    ],
    demos: ["basic", "colors", "empty-actions", "fixed-height", "drag-drop"],
    wc: {
      entry: "dashboard-columns",
      tags: [
        "minerva-dashboard-columns",
        "minerva-dashboard-column",
        "minerva-dashboard-card",
      ],
      demos: ["basic", "colors", "empty-actions", "fixed-height", "drag-drop"],
    },
    native: {
      exports: ["DashboardColumns", "DashboardColumn", "DashboardCard"],
      api: [
        "DashboardColumnsProps",
        "DashboardColumnProps",
        "DashboardCardProps",
      ],
      demos: ["basic", "drag-drop"],
    },
  },
  {
    id: "flashcard",
    cssVars: ["Flashcard"],
    category: "dataDisplay",
    exports: ["Flashcard"],
    api: ["FlashcardProps"],
    demos: ["basic", "controlled", "axis-variants", "reduced-disabled"],
    wc: {
      entry: "flashcard",
      tags: ["minerva-flashcard"],
      demos: ["basic", "controlled", "axis-variants", "reduced-disabled"],
    },
    native: {
      exports: ["Flashcard"],
      api: ["FlashcardProps"],
      demos: ["basic"],
    },
  },

  // Charts (minerva-design/charts: GPU engine + React components)
  {
    id: "charts",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["Chart"],
    api: [
      "ChartProps",
      "ChartCommonProps",
      "ChartHandle",
      "ChartSeries",
      "ChartPointDatum",
      "ChartColumnData",
      "ChartAxisOptions",
      "ChartRectAnnotation",
      "ChartLineAnnotation",
      "ChartTextAnnotation",
      "ChartInteractionOptions",
      "ChartTooltipOptions",
      "ChartLegendOptions",
      "ChartPadding",
      "ChartHoverEvent",
      "ChartHoverItem",
      "ChartPlotClickEvent",
      "ChartView",
    ],
    demos: [
      "gallery",
      "gallery-statistics",
      "gallery-relations",
      "gallery-graphs",
      "gallery-finance",
      "gallery-3d",
      "mixed",
      "dashboard",
      "renderers",
      "annotations",
      "palette",
    ],
    native: {
      exports: ["Chart"],
      api: ["ChartProps", "ChartCommonProps", "ChartHandle"],
      demos: ["mixed"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-chart", "minerva-shape-chart"],
      demos: ["mixed-series", "events"],
    },
  },
  {
    id: "line-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["LineChart"],
    api: ["LineChartProps"],
    demos: [
      "basic",
      "area",
      "curves",
      "stacked",
      "time-series",
      "traffic-events",
      "gaps",
      "thresholds",
      "zoom",
      "large-data",
      "live-sensor",
      "log-scale",
      "measure",
      "index-tooltip",
      "small-multiples",
    ],
    native: {
      exports: ["LineChart"],
      api: ["LineChartProps"],
      demos: ["basic", "area"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-line-chart"],
      demos: ["trend", "reset-zoom"],
    },
  },
  {
    id: "area-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["AreaChart"],
    api: ["AreaChartProps"],
    demos: [
      "basic",
      "stacked",
      "percent",
      "step",
      "energy-mix",
      "cumulative",
      "mirrored",
      "zoom-total",
      "hover-panel",
      "year-over-year",
      "disk-forecast",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-area-chart"],
      demos: ["stacked", "percent"],
    },
    native: {
      exports: ["AreaChart"],
      api: ["AreaChartProps"],
      demos: ["basic"],
    },
  },
  {
    id: "range-area-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["RangeAreaChart"],
    api: ["RangeAreaChartProps"],
    demos: [
      "forecast",
      "temperature",
      "fan",
      "price-range",
      "anomaly-band",
      "bid-ask",
      "climate-scenarios",
      "ab-test",
    ],
    native: {
      exports: ["RangeAreaChart"],
      api: ["RangeAreaChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-range-area-chart"],
      demos: ["forecast", "temperature"],
    },
  },
  {
    id: "bar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BarChart"],
    api: ["BarChartProps"],
    demos: [
      "basic",
      "stacked",
      "labels",
      "percent",
      "combo",
      "grouped",
      "profit-loss",
      "ranking",
      "target",
      "drilldown",
      "period-compare",
      "deployments",
      "ev-charging",
    ],
    native: {
      exports: ["BarChart"],
      api: ["BarChartProps"],
      demos: ["basic", "stacked"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-bar-chart"],
      demos: ["grouped", "stacked"],
    },
  },
  {
    id: "horizontal-bar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["HorizontalBarChart"],
    api: ["HorizontalBarChartProps"],
    demos: [
      "basic",
      "diverging",
      "progress",
      "long-labels",
      "grouped",
      "negative",
      "top-n",
      "race",
      "salary-bands",
      "error-budget",
    ],
    native: {
      exports: ["HorizontalBarChart"],
      api: ["HorizontalBarChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-horizontal-bar-chart"],
      demos: ["ranking", "survey"],
    },
  },
  {
    id: "mixed-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["MixedChart"],
    api: ["MixedChartProps", "ChartProps", "ChartLabels"],
    demos: [
      "revenue-growth",
      "climate",
      "conversion",
      "pareto",
      "log-scale",
      "locale",
      "solar-battery",
      "inventory",
      "ops-overview",
      "burndown",
    ],
    native: {
      exports: ["MixedChart"],
      api: ["MixedChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-mixed-chart"],
      demos: ["revenue-growth", "climate"],
    },
  },
  {
    id: "scatter-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["ScatterChart"],
    api: ["ScatterChartProps"],
    demos: [
      "basic",
      "labels",
      "trend",
      "categories",
      "outliers",
      "large-data",
      "zoom-controls",
      "selection",
      "players",
      "live-stream",
      "log-log",
    ],
    native: {
      exports: ["ScatterChart"],
      api: ["ScatterChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-scatter-chart"],
      demos: ["clusters", "point-click"],
    },
  },
  {
    id: "bubble-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BubbleChart", "bubbleSeries"],
    api: ["BubbleChartProps", "BubbleOptions"],
    demos: [
      "countries",
      "log-scale",
      "portfolio",
      "pipeline",
      "risk-matrix",
      "campaigns",
      "shared-scale",
      "playback",
    ],
    native: {
      exports: ["BubbleChart"],
      api: ["BubbleChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-bubble-chart"],
      demos: ["countries", "portfolio"],
    },
  },
  {
    id: "quadrant-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["QuadrantChart"],
    api: [
      "QuadrantChartProps",
      "QuadrantConfig",
      "QuadrantDropTarget",
      "QuadrantHeaderInfo",
      "QuadrantPoint",
      "QuadrantRegions",
      "QuadrantRegion",
      "QuadrantAxisLabels",
    ],
    demos: [
      "basic",
      "eisenhower",
      "draggable",
      "triage",
      "quadrant-header",
      "bcg",
      "risk",
      "positioning",
      "rice",
      "swot",
      "competitors",
      "talent",
      "live-services",
    ],
    native: {
      exports: ["QuadrantChart"],
      api: ["QuadrantChartProps", "QuadrantConfig", "QuadrantDropTarget"],
      demos: ["basic", "draggable", "triage"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-quadrant-chart"],
      demos: ["priorities", "point-click", "triage"],
    },
  },
  {
    // exported by minerva-design (it renders Modal, Input, Select...), built
    // on the quadrant chart of minerva-design/charts
    id: "quadrant-task-board",
    category: "charts",
    cssVars: ["QuadrantTaskBoard"],
    exports: ["QuadrantTaskBoard"],
    api: ["QuadrantTaskBoardProps", "QuadrantTaskLabels", "QuadrantConfig"],
    demos: ["basic", "custom-labels"],
    wc: {
      entry: "quadrant-task-board",
      tags: ["minerva-quadrant-task-board"],
      demos: ["basic"],
    },
    native: {
      exports: ["QuadrantTaskBoard"],
      api: ["QuadrantTaskBoardProps"],
      demos: ["basic"],
    },
  },
  {
    id: "histogram-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["HistogramChart", "binValues", "histogramSeries", "quantiles"],
    api: ["HistogramChartProps", "BinOptions", "HistogramBins"],
    demos: [
      "latency",
      "binning",
      "ages",
      "comparison",
      "quality-control",
      "order-values",
      "live-samples",
      "commute",
    ],
    native: {
      exports: ["HistogramChart"],
      api: ["HistogramChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-histogram-chart"],
      demos: ["latency", "binning"],
    },
  },
  {
    id: "boxplot-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BoxPlotChart", "boxplotStats", "boxplotData"],
    api: [
      "BoxPlotChartProps",
      "BoxplotGroup",
      "BoxplotStats",
      "BoxplotStatsOptions",
      "ChartTooltipLabels",
    ],
    demos: [
      "services",
      "horizontal",
      "grouped",
      "temperatures",
      "build-times",
      "wait-times",
      "asset-sizes",
      "live-regions",
    ],
    native: {
      exports: ["BoxPlotChart"],
      api: ["BoxPlotChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-box-plot-chart"],
      demos: ["services", "horizontal"],
    },
  },
  {
    id: "waterfall-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["WaterfallChart", "waterfallSeries"],
    api: [
      "WaterfallChartProps",
      "WaterfallStep",
      "WaterfallOptions",
      "ChartConnectorOptions",
    ],
    demos: [
      "pnl",
      "cash-flow",
      "variance",
      "headcount",
      "arr-bridge",
      "price-bridge",
      "emissions",
      "lead-time",
      "live-balance",
      "options",
    ],
    native: {
      exports: ["WaterfallChart"],
      api: ["WaterfallChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-waterfall-chart"],
      demos: ["pnl", "cash-flow"],
    },
  },
  {
    id: "gantt-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["GanttChart", "ganttSeries"],
    api: ["GanttChartProps", "GanttTask", "GanttOptions"],
    demos: [
      "project",
      "dependencies",
      "crews",
      "roadmap",
      "sprint",
      "locale",
      "release-train",
      "critical-path",
      "resources",
      "live-deploy",
      "onboarding",
      "daily",
    ],
    native: {
      exports: ["GanttChart"],
      api: ["GanttChartProps"],
      demos: ["basic", "daily"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-gantt-chart"],
      demos: ["project", "sprint", "daily"],
    },
  },
  {
    id: "heatmap-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["HeatmapChart"],
    api: ["HeatmapChartProps", "HeatmapConfig", "HeatmapCell"],
    demos: [
      "basic",
      "color-scale",
      "activity",
      "correlation",
      "retention",
      "large-grid",
      "conversion",
      "rack-temperatures",
      "confusion-matrix",
      "sales-regions",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-heatmap-chart"],
      demos: ["weekly-activity", "color-scale"],
    },
    native: {
      exports: ["HeatmapChart"],
      api: ["HeatmapChartProps"],
      demos: ["basic"],
    },
  },
  {
    id: "calendar-heatmap",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["CalendarHeatmap"],
    api: ["CalendarHeatmapProps", "CalendarDatum"],
    demos: [
      "contributions",
      "streak",
      "multi-year",
      "months",
      "locale",
      "energy",
      "sleep",
      "incidents",
      "habit-toggle",
    ],
    native: {
      exports: ["CalendarHeatmap"],
      api: ["CalendarHeatmapProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-calendar-heatmap"],
      demos: ["contributions", "months"],
    },
  },
  {
    id: "sparkline",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["Sparkline"],
    api: ["SparklineProps", "SparklineConfig"],
    demos: [
      "basic",
      "kpi-cards",
      "table",
      "watchlist",
      "inline",
      "servers",
      "hover-value",
      "step-goal",
      "weather",
      "periods",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-sparkline"],
      demos: ["kpi", "reference"],
    },
    native: {
      exports: ["Sparkline"],
      api: ["SparklineProps"],
      demos: ["basic"],
    },
  },
  {
    id: "pie-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["PieChart", "DonutChart"],
    api: [
      "PieChartProps",
      "DonutChartProps",
      "ShapeChartCommonProps",
      "ShapeDatum",
      "ShapeHoverEvent",
      "ShapeLegendOptions",
      "ShapeTooltipOptions",
    ],
    demos: [
      "basic",
      "donut",
      "rose",
      "labels",
      "market-share",
      "nested",
      "small-multiples",
      "portfolio",
      "live-poll",
      "drill-down",
      "survey-quarters",
    ],
    native: {
      exports: ["PieChart", "DonutChart"],
      api: [
        "PieChartProps",
        "DonutChartProps",
        "ShapeChartCommonProps",
        "ShapeChartFrameProps",
        "ShapeChartHandle",
      ],
      demos: ["basic", "donut"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-pie-chart", "minerva-donut-chart"],
      demos: ["pie", "donut"],
    },
  },
  {
    id: "radial-bar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["RadialBarChart"],
    api: ["RadialBarChartProps", "RadialBarDatum"],
    demos: [
      "activity",
      "okr",
      "quota",
      "styles",
      "savings-goals",
      "leaderboard",
      "uploads",
      "survey",
    ],
    native: {
      exports: ["RadialBarChart"],
      api: ["RadialBarChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-radial-bar-chart"],
      demos: ["activity", "okr"],
    },
  },
  {
    id: "radar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["RadarChart"],
    api: ["RadarChartProps", "RadarIndicator", "RadarSeries"],
    demos: [
      "basic",
      "compare",
      "circle",
      "players",
      "capabilities",
      "nutrition",
      "live-monitor",
      "review-360",
      "sales-targets",
    ],
    native: {
      exports: ["RadarChart"],
      api: ["RadarChartProps"],
      demos: ["basic", "compare"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-radar-chart"],
      demos: ["compare", "circle"],
    },
  },
  {
    id: "gauge-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["GaugeChart"],
    api: ["GaugeChartProps", "GaugeBand"],
    demos: [
      "basic",
      "bands",
      "live",
      "speedometer",
      "quota",
      "slo",
      "thermostat",
      "credit-score",
      "battery",
      "dark-panel",
    ],
    native: {
      exports: ["GaugeChart"],
      api: ["GaugeChartProps"],
      demos: ["basic", "bands"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-gauge-chart"],
      demos: ["bands", "needle"],
    },
  },
  {
    id: "bullet-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BulletChart"],
    api: ["BulletChartProps", "BulletDatum"],
    demos: [
      "sales",
      "vertical",
      "traffic-lights",
      "monthly",
      "long-names",
      "budget-tracker",
      "live-sensors",
      "training",
      "hiring-plan",
    ],
    native: {
      exports: ["BulletChart"],
      api: ["BulletChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-bullet-chart"],
      demos: ["kpis", "vertical"],
    },
  },
  {
    id: "funnel-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["FunnelChart"],
    api: ["FunnelChartProps"],
    demos: [
      "basic",
      "bars",
      "ecommerce",
      "recruiting",
      "compare",
      "campaigns",
      "what-if",
      "live-sale",
      "sales-pipeline",
    ],
    native: {
      exports: ["FunnelChart"],
      api: ["FunnelChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-funnel-chart"],
      demos: ["conversion", "bars"],
    },
  },
  {
    id: "treemap-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["TreemapChart"],
    api: ["TreemapChartProps", "TreemapNode"],
    demos: [
      "basic",
      "flat",
      "market-map",
      "bundle",
      "drill-down",
      "cloud-costs",
      "live-cluster",
      "metric-switch",
    ],
    native: {
      exports: ["TreemapChart"],
      api: ["TreemapChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-treemap-chart"],
      demos: ["nested", "flat"],
    },
  },
  {
    id: "sunburst-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["SunburstChart"],
    api: ["SunburstChartProps", "TreemapNode", "ShapeDrillEvent"],
    demos: [
      "disk-usage",
      "drill-down",
      "org",
      "labels",
      "city-budget",
      "time-tracking",
      "live-requests",
      "energy-mix",
    ],
    native: {
      exports: ["SunburstChart"],
      api: ["SunburstChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-sunburst-chart"],
      demos: ["disk-usage", "drill-down"],
    },
  },
  {
    id: "sankey-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["SankeyChart"],
    api: ["SankeyChartProps", "SankeyNode", "SankeyLink"],
    demos: [
      "energy",
      "journey",
      "budget",
      "options",
      "income-statement",
      "supply-chain",
      "hiring-funnel",
      "live-traffic",
      "plastic",
    ],
    native: {
      exports: ["SankeyChart"],
      api: ["SankeyChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-sankey-chart"],
      demos: ["energy", "journey"],
    },
  },

  // Finance and trading charts
  {
    id: "candlestick-chart",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["CandlestickChart"],
    api: ["CandlestickChartProps"],
    demos: [
      "basic",
      "bar-styles",
      "moving-average",
      "ma-ribbon",
      "volume",
      "volume-colors",
      "a-share",
      "events",
      "intraday",
      "live",
      "large-data",
      "dark",
      "patterns",
      "watchlist",
      "fx-pips",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-candlestick-chart"],
      demos: ["ohlc", "moving-average"],
    },
    native: {
      exports: ["CandlestickChart"],
      api: ["CandlestickChartProps"],
      demos: ["basic"],
    },
  },
  {
    id: "trading-chart",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["TradingChart"],
    api: [
      "TradingChartProps",
      "TradingChartOptions",
      "TradingChartHandle",
      "TradingBar",
      "TradingBarColumns",
      "TradingPriceLine",
      "TradingMarker",
      "TradingCompareSeries",
      "TradingDrawing",
      "TradingDrawingPoint",
      "TradingChartLabels",
      "TradingCrosshairEvent",
      "TradingClickEvent",
      "TradingOrderMoveEvent",
      "TradingVisibleRange",
      "TradingIndicatorToggleEvent",
      "TradingHistoryRequestEvent",
      "TradingVolumeProfileOptions",
      "TradingOrderCreateEvent",
      "TradingOrderCancelEvent",
      "TradingReplayState",
      "TradingUndoState",
      "TradingSyncOptions",
    ],
    demos: [
      "pro-terminal",
      "streaming",
      "tick-chart",
      "chart-styles",
      "drawing-tools",
      "volume-profile",
      "orders",
      "order-entry",
      "multi-chart",
      "replay",
      "compare",
      "sessions",
      "history",
      "million-bars",
      "export",
      "red-up",
      "dark-terminal",
      "price-alerts",
      "trade-journal",
      "mobile",
    ],
    wc: {
      entry: "trading-chart",
      tags: ["minerva-trading-chart"],
      demos: ["candles", "streaming"],
    },
  },
  {
    id: "technical-indicators",
    category: "financeCharts",
    package: "minerva-design/charts/core",
    exports: [
      "createTradingChart",
      "sma",
      "ema",
      "wma",
      "bollinger",
      "macd",
      "rsi",
      "kdj",
      "atr",
      "vwap",
      "heikinAshi",
      "psar",
      "ichimoku",
      "supertrend",
      "keltner",
      "donchian",
      "obv",
      "cci",
      "stochRsi",
      "dmi",
      "williamsR",
      "mfi",
      "volumeProfile",
      "resampleBars",
      "syncCharts",
    ],
    api: [
      "TradingMovingAverageIndicator",
      "TradingBollingerIndicator",
      "TradingVwapIndicator",
      "TradingVolumeIndicator",
      "TradingMacdIndicator",
      "TradingRsiIndicator",
      "TradingKdjIndicator",
      "TradingAtrIndicator",
      "TradingParabolicSarIndicator",
      "TradingIchimokuIndicator",
      "TradingSupertrendIndicator",
      "TradingKeltnerIndicator",
      "TradingDonchianIndicator",
      "TradingObvIndicator",
      "TradingCciIndicator",
      "TradingStochRsiIndicator",
      "TradingDmiIndicator",
      "TradingWilliamsRIndicator",
      "TradingMfiIndicator",
      "TradingIndicatorBase",
      "TradingPaneIndicatorBase",
      "TradingVolumeProfile",
      "TradingChartInstance",
      "TradingChartEventMap",
    ],
    demos: [
      "moving-averages",
      "bollinger",
      "channels",
      "ichimoku",
      "supertrend",
      "vwap",
      "macd",
      "rsi",
      "oscillators",
      "kdj",
      "dmi",
      "atr",
      "obv",
      "heikin-ashi",
      "signals",
      "vanilla",
      "divergence",
      "multi-timeframe",
      "screener",
    ],
    wc: {
      entry: "trading-chart",
      tags: [],
      demos: ["bollinger", "panes"],
    },
  },
  {
    id: "depth-chart",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["DepthChart"],
    api: [
      "DepthChartProps",
      "DepthChartHandle",
      "DepthChartOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "DepthChartLabels",
      "DepthChartPriceLine",
      "DepthPoint",
      "OrderBookSnapshot",
      "OrderBookDelta",
    ],
    demos: [
      "basic",
      "live",
      "range",
      "walls",
      "dark",
      "compact",
      "red-up",
      "slippage",
      "imbalance",
      "equity",
      "venues",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-depth-chart"],
      demos: ["book", "live"],
    },
  },
  {
    id: "order-book",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["OrderBook"],
    api: [
      "OrderBookProps",
      "OrderBookHandle",
      "OrderBookOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "OrderBookLabels",
      "OrderBookLevelEvent",
      "OrderBookSnapshot",
      "OrderBookDelta",
      "OrderBookLevelColumns",
    ],
    demos: [
      "basic",
      "live",
      "grouping",
      "large-orders",
      "modes",
      "terminal",
      "dark",
      "compact",
      "red-up",
      "markets",
      "wall-watch",
      "order-ticket",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-order-book"],
      demos: ["ladder", "live"],
    },
  },
  {
    id: "order-book-heatmap",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["OrderBookHeatmap"],
    api: [
      "OrderBookHeatmapProps",
      "OrderBookHeatmapHandle",
      "OrderBookHeatmapOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "OrderBookHeatmapLabels",
      "OrderBookHeatmapHoverEvent",
      "MarketTrade",
    ],
    demos: [
      "basic",
      "live",
      "color-scale",
      "large-trades",
      "dark",
      "compact",
      "red-up",
      "price-resolution",
      "time-window",
      "linked",
      "perpetual",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-order-book-heatmap"],
      demos: ["liquidity", "red-up"],
    },
  },
  {
    id: "time-and-sales",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["TimeAndSales"],
    api: [
      "TimeAndSalesProps",
      "TimeAndSalesHandle",
      "TimeAndSalesOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "TimeAndSalesLabels",
      "TimeAndSalesRowEvent",
      "MarketTrade",
      "TimeAndSalesInstance",
    ],
    demos: [
      "basic",
      "live",
      "large-trades",
      "filters",
      "large-data",
      "dark",
      "compact",
      "red-up",
      "pressure",
      "clock",
      "block-alerts",
      "split",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-time-and-sales"],
      demos: ["tape", "large-trades"],
    },
  },

  // 3D charts
  {
    id: "scatter-3d-chart",
    category: "charts3d",
    package: "minerva-design/charts",
    exports: ["Scatter3DChart", "Line3DChart"],
    api: [
      "Scatter3DChartProps",
      "Line3DChartProps",
      "Chart3DCommonProps",
      "Chart3DHandle",
      "Scatter3DSeries",
      "Line3DSeries",
      "Chart3DSeriesBase",
      "Chart3DPoint",
      "Chart3DColumnData",
      "Chart3DAxisOptions",
      "Chart3DCameraOptions",
      "Chart3DCameraState",
      "Chart3DInteractionOptions",
      "Chart3DColorBarOptions",
      "Chart3DHoverEvent",
      "Chart3DLabels",
    ],
    demos: [
      "clusters",
      "galaxy",
      "color-by-value",
      "auto-rotate",
      "camera",
      "trajectory",
      "renderer",
      "embeddings",
      "lidar",
      "satellites",
      "portfolio-risk",
    ],
    wc: {
      entry: "chart-3d",
      tags: ["minerva-scatter-3d-chart", "minerva-line-3d-chart"],
      demos: ["clusters", "trajectory"],
    },
  },
  {
    id: "surface-3d-chart",
    category: "charts3d",
    package: "minerva-design/charts",
    exports: ["Surface3DChart"],
    api: [
      "Surface3DChartProps",
      "Surface3DSeries",
      "Surface3DData",
      "Surface3DWireframeOptions",
      "Surface3DContourOptions",
      "Chart3DLightingOptions",
      "Chart3DCommonProps",
      "Chart3DSeriesBase",
    ],
    demos: [
      "functions",
      "terrain",
      "volatility",
      "wireframe-contours",
      "transparency",
      "live-wave",
      "heat-diffusion",
      "yield-curve",
      "loss-landscape",
      "wifi-signal",
    ],
    wc: {
      entry: "chart-3d",
      tags: ["minerva-surface-3d-chart"],
      demos: ["ripple", "terrain"],
    },
  },
  {
    id: "bar-3d-chart",
    category: "charts3d",
    package: "minerva-design/charts",
    exports: ["Bar3DChart"],
    api: [
      "Bar3DChartProps",
      "Bar3DSeries",
      "Bar3DDatum",
      "Chart3DCommonProps",
      "Chart3DSeriesBase",
      "Chart3DLegendOptions",
      "Chart3DTooltipOptions",
    ],
    demos: [
      "sales",
      "stacked",
      "pyramid",
      "traffic",
      "margin",
      "inventory-live",
      "cohort-retention",
      "budget-variance",
      "datacenter",
    ],
    wc: {
      entry: "chart-3d",
      tags: ["minerva-bar-3d-chart"],
      demos: ["sales", "stacked"],
    },
  },

  // Relationship and hierarchy charts
  // @graph-pages: graph-chart, dependency-graph, tree-chart (engine/graph)
  {
    id: "graph-chart",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["GraphChart"],
    api: [
      "GraphChartProps",
      "GraphCommonProps",
      "GraphChartHandle",
      "GraphNode",
      "GraphEdge",
      "GraphGroup",
      "GraphForceOptions",
      "GraphCircularOptions",
      "GraphInteractionOptions",
      "GraphLegendOptions",
      "GraphTooltipOptions",
      "GraphHoverEvent",
      "GraphChartLabels",
      "GraphChartOptions",
      "GraphChartInstance",
      "GraphChartEventMap",
      "GraphForceLayoutOptions",
      "GraphForceSimulation",
    ],
    demos: [
      "characters",
      "large-network",
      "transitions",
      "circular",
      "arc",
      "vanilla",
      "service-map",
      "knowledge-graph",
      "friend-suggestions",
      "fraud-ring",
    ],
    wc: {
      entry: "graph",
      tags: ["minerva-graph-chart"],
      demos: ["routes", "circular"],
    },
  },
  {
    id: "dependency-graph",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["DependencyGraph"],
    api: [
      "DependencyGraphProps",
      "GraphDagOptions",
      "GraphCriticalPath",
      "GraphDagLayoutOptions",
      "GraphDagLayoutResult",
    ],
    demos: [
      "packages",
      "pipeline",
      "lineage",
      "build-scheduler",
      "project-plan",
      "impact-analysis",
      "course-prerequisites",
      "spreadsheet",
    ],
    wc: {
      entry: "graph",
      tags: ["minerva-dependency-graph"],
      demos: ["pipeline", "modules"],
    },
  },
  {
    id: "tree-chart",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["TreeChart"],
    api: [
      "TreeChartProps",
      "GraphTreeOptions",
      "GraphToggleEvent",
      "GraphTreeLayoutOptions",
      "GraphTreeLayoutResult",
    ],
    demos: [
      "org-chart",
      "mind-map",
      "radial",
      "file-tree",
      "decision-tree",
      "taxonomy-search",
      "disk-usage",
      "wbs",
      "bracket",
    ],
    wc: {
      entry: "graph",
      tags: ["minerva-tree-chart"],
      demos: ["org", "mind-map"],
    },
  },
  // @chord-pages: chord-chart (shape engine)
  {
    id: "chord-chart",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["ChordChart"],
    api: ["ChordChartProps", "ChordGroup", "ChordLink"],
    demos: [
      "basic",
      "migration",
      "dependencies",
      "trade",
      "directed",
      "dark",
      "options",
      "brand-switching",
      "focus",
      "co-purchase",
      "live",
      "legend",
    ],
    native: {
      exports: ["ChordChart"],
      api: ["ChordChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-chord-chart"],
      demos: ["teams", "migration"],
    },
  },

  // Chart engine, performance and the other platforms
  {
    id: "chart-engine",
    category: "chartEngine",
    package: "minerva-design/charts/core",
    exports: [
      "createChart",
      "createCanvasChart",
      "createChartController",
      "scenePrimitives",
      "createShapeChart",
      "createCanvasShapeChart",
      "quadrantChartOptions",
      "quadrantOf",
      "quadrantCenter",
      "quadrantGroups",
      "quadrantLabels",
      "quadrantCountText",
      "quadrantAccessibleGroups",
      "quadrantKeyTarget",
      "createQuadrantPointLayer",
      "createQuadrantPointCard",
      "withQuadrantCard",
      "QUADRANT_CARD_LINGER_MS",
      "QUADRANT_CORNERS",
      "quadrantTaskLabels",
      "newQuadrantTaskDraft",
      "editQuadrantTaskDraft",
      "canSaveQuadrantTask",
      "applyQuadrantTaskDraft",
      "moveQuadrantTask",
      "removeQuadrantTask",
      "selectionAfterRemove",
      "quadrantTaskDeleteText",
      "placeQuadrantTaskPanel",
      "quadrantTaskColor",
      "quadrantTaskIconUri",
      "QUADRANT_TASK_ICONS",
      "heatmapChartOptions",
      "sparklineOptions",
      "formatCompact",
      "binValues",
      "histogramSeries",
      "quantiles",
      "boxplotStats",
      "boxplotData",
      "bubbleSeries",
      "waterfallSeries",
      "ganttSeries",
      "createTradingChart",
      "createDepthChart",
      "createOrderBook",
      "createOrderBookHeatmap",
      "createTimeAndSales",
      "createOrderBookStore",
      "createChart3D",
      "withSeriesType",
      "lineSeries",
      "areaSeries",
      "rangeAreaSeries",
      "barSeries",
      "scatterSeries",
      "candlestickSeries",
      "boxplotSeries",
      "formatDuration",
      "createGraphChart",
      "createForceSimulation",
      "forceLayout",
      "dagLayout",
      "countCrossings",
      "criticalPath",
      "treeLayout",
      "circularLayout",
      "arcLayout",
      "getDefaultChartRenderer",
      "setDefaultChartRenderer",
      "subscribeDefaultChartRenderer",
      "formatValue",
    ],
    api: [
      "ChartOptions",
      "ChartInstance",
      "ChartEventMap",
      "ChartDragEvent",
      "ChartDragEndEvent",
      "ChartRect",
      "CanvasChartConfig",
      "CanvasChartInstance",
      "ChartCanvas",
      "ChartTouch",
      "ChartPointerOptions",
      "ChartThemeInput",
      "ChartControllerConfig",
      "ChartController",
      "ChartPrimitiveOptions",
      "ChartLinePrimitive",
      "ChartAreaPrimitive",
      "ChartBarPrimitive",
      "ChartDotPrimitive",
      "ShapeChartInstance",
      "ShapeChartEventMap",
      "PieChartOptions",
      "RadarChartOptions",
      "GaugeChartOptions",
      "FunnelChartOptions",
      "TreemapChartOptions",
      "ShapeChartCommonOptions",
      "CanvasShapeChartConfig",
      "CanvasShapeChartInstance",
    ],
    demos: ["basic", "streaming", "canvas", "shapes"],
  },
  {
    id: "chart-performance",
    category: "chartEngine",
    package: "minerva-design/charts",
    exports: ["LineChart", "ScatterChart", "CandlestickChart", "Chart"],
    demos: ["line", "scatter", "candles", "heatmap", "streaming", "compare"],
    wc: {
      entry: "chart",
      tags: [],
      demos: ["million", "scatter"],
    },
  },
  {
    id: "chart-renderers",
    category: "chartEngine",
    demos: ["environment", "benchmark", "scaling", "switching", "fallback"],
  },
  { id: "mini-program-charts", category: "chartEngine" },

  // Web Components (guides; every component page has a "Web Components" tab)
  {
    id: "web-components",
    category: "webComponents",
    package: "minerva-design/web-components",
    // Utilities of the package (the elements are documented on their pages)
    exports: [
      "defineElement",
      "emit",
      "MinervaElement",
      "hostStyles",
      "FormAssociatedElement",
      "LocaleController",
      "resolveLanguage",
      "AriaController",
      "HasSlotController",
      "AnchoredPositionController",
      "DismissableLayerController",
      "FocusScopeController",
      "ModalController",
      "RovingFocusController",
      "TypeaheadController",
      "FloatingLayerController",
      "popoverResetStyles",
      // helpers re-exported next to their elements
      "matchesShortcut",
      "normalizeShortcuts",
      "computeFixedColumnLayout",
      "SUBMENU_OPEN_DELAY",
      "LONG_PRESS_DELAY",
      "MinervaContextMenu",
      // imperative confirmation (documented on the Confirm page)
      "confirm",
      "confirmFor",
      "confirmScopeOf",
    ],
    demos: ["react"],
  },
  { id: "wc-plain-html", category: "webComponents" },
  { id: "wc-vue", category: "webComponents" },
  { id: "wc-angular", category: "webComponents" },
  { id: "wc-svelte", category: "webComponents" },
  { id: "wc-forms", category: "webComponents" },
  { id: "wc-theming", category: "webComponents" },
  {
    id: "nav-bar",
    category: "mobile",
    native: {
      exports: ["NavBar"],
      api: ["NavBarProps"],
      demos: ["actions", "basic"],
    },
  },
  {
    id: "tab-bar",
    category: "mobile",
    native: {
      exports: ["TabBar", "TabBarItem"],
      api: ["TabBarProps", "TabBarItemProps"],
      demos: ["badges", "basic"],
    },
  },
  {
    id: "pull-refresh",
    category: "mobile",
    native: {
      exports: ["PullRefresh", "usePullRefresh"],
      api: [
        "PullRefreshProps",
        "UsePullRefreshOptions",
        "UsePullRefreshResult",
      ],
      demos: ["basic", "use-pull-refresh"],
    },
  },
  {
    id: "swipe-cell",
    category: "mobile",
    native: {
      exports: ["SwipeCell"],
      api: ["SwipeCellProps", "SwipeCellAction", "SwipeCellHandle"],
      demos: ["basic", "custom-actions"],
    },
  },
  {
    id: "collapse",
    category: "mobile",
    native: {
      exports: ["Collapse", "CollapseItem"],
      api: ["CollapseProps", "CollapseItemProps"],
      demos: ["accordion", "basic"],
    },
  },
  {
    id: "grid",
    category: "mobile",
    native: {
      exports: ["Grid", "GridItem"],
      api: ["GridProps", "GridItemProps"],
      demos: ["basic", "square-columns"],
    },
  },
  {
    id: "image-preview",
    category: "mobile",
    native: {
      exports: ["ImagePreview"],
      api: ["ImagePreviewProps"],
      demos: ["basic", "controlled"],
    },
  },

  // Icons (minerva-design/icons: custom SVG icons, also drawn by the GPU)
  {
    id: "icons",
    category: "icons",
    package: "minerva-design/icons/core",
    exports: ["icons", "iconCategories", "getIcon", "searchIcons"],
    demos: ["gallery"],
  },
  {
    id: "icon",
    category: "icons",
    package: "minerva-design/icons",
    exports: ["Icon", "createIcon", "DynamicIcon"],
    api: ["IconProps", "DynamicIconProps"],
    demos: [
      "basic",
      "size-color",
      "stroke",
      "accessibility",
      "custom",
      "dynamic",
      "canvas",
    ],
    wc: {
      entry: "icon",
      tags: ["minerva-icon"],
      demos: ["basic", "canvas"],
    },
    native: {
      package: "minerva-design/native/icons",
      exports: ["Icon", "createIcon", "DynamicIcon", "SearchIcon"],
      api: ["IconProps", "DynamicIconProps"],
      demos: ["basic"],
    },
  },
  {
    id: "icon-canvas",
    category: "icons",
    package: "minerva-design/icons",
    exports: ["IconCanvas"],
    api: ["IconCanvasProps", "IconCanvasItem", "IconStyle", "IconCanvasHandle"],
    demos: ["basic", "thousands", "renderers"],
    wc: {
      entry: "icon",
      tags: ["minerva-icon-canvas"],
      demos: ["basic"],
    },
  },
  {
    id: "icons-core",
    category: "icons",
    package: "minerva-design/icons/core",
    exports: [
      "toSvg",
      "toSvgDataUri",
      "toSvgBase64DataUri",
      "iconPathData",
      "drawIcon",
      "defineIcon",
      "createIconCanvas",
      "createIconSurface",
      "setDefaultIconRenderer",
      "getDefaultIconRenderer",
      "subscribeDefaultIconRenderer",
      "ICON_RENDERER_PREFERENCES",
      "ICON_RENDERER_ORDER",
      "iconRendererCandidates",
      "parseIconPath",
      "flattenIconPath",
      "tessellateIcon",
    ],
    api: [
      "IconDefinition",
      "IconSvgOptions",
      "DrawIconOptions",
      "IconCanvasOptions",
      "IconCanvasController",
      "IconSurfaceOptions",
      "IconSurface",
      "IconMeshOptions",
      "IconPolyline",
    ],
    demos: ["svg-string", "canvas2d", "controller", "geometry"],
  },
];

export const getDocPage = (id: string) => docPages.find((p) => p.id === id);

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

### apps/docs/src/docs/pages/chart-performance/showcase/meter.ts

```tsx
import { useEffect, useRef, useState, type RefObject } from "react";

/** Measured over the last half second */
export interface FrameStats {
  /** Frames per second */
  fps: number;
  /** Average time between two frames, in ms */
  frame: number;
  /**
   * Average main-thread time of a frame, in ms: animation callbacks (the
   * chart's draw calls included), style, layout and paint
   */
  work: number;
}

/** Whether the element is on screen (or within `margin` of it) */
export function useInView(
  ref: RefObject<Element | null>,
  margin = "0px",
): boolean {
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(!!entry?.isIntersecting),
      { rootMargin: margin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, margin]);
  return inView;
}

export interface FrameLoopHandlers {
  /** Every animation frame (move the camera here) */
  onFrame?: (time: number) => void;
  /** Main-thread time of each frame, once the frame is painted */
  onWork?: (ms: number) => void;
  /** Every half second */
  onStats?: (stats: FrameStats) => void;
}

/**
 * Runs an animation-frame loop while `running` and measures it. The
 * main-thread time of a frame is read from a message posted during the
 * frame: messages run after the frame's rendering work.
 */
export function useFrameLoop(
  running: boolean,
  handlers: FrameLoopHandlers = {},
): FrameStats | null {
  const [stats, setStats] = useState<FrameStats | null>(null);
  const handlersRef = useRef(handlers);
  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    if (!running) return;
    let id = 0;
    let windowStart = 0;
    let frames = 0;
    let work = 0;
    let works = 0;
    const channel = new MessageChannel();
    channel.port1.onmessage = (event: MessageEvent<number>) => {
      const ms = performance.now() - event.data;
      work += ms;
      works++;
      handlersRef.current.onWork?.(ms);
    };
    const loop = (time: number) => {
      id = requestAnimationFrame(loop);
      channel.port2.postMessage(time);
      if (windowStart) frames++;
      else windowStart = time;
      handlersRef.current.onFrame?.(time);
      const elapsed = time - windowStart;
      if (elapsed >= 500 && frames > 0) {
        const next = {
          fps: (frames * 1000) / elapsed,
          frame: elapsed / frames,
          work: works ? work / works : 0,
        };
        setStats(next);
        handlersRef.current.onStats?.(next);
        windowStart = time;
        frames = 0;
        work = 0;
        works = 0;
      }
    };
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      channel.port1.close();
      channel.port2.close();
    };
  }, [running]);

  return stats;
}

/** Calls `callback` once the next frame has been painted */
export function afterNextPaint(callback: () => void) {
  requestAnimationFrame(() => setTimeout(callback, 0));
}

/** Whether the user asked for reduced motion */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

```

### apps/docs/src/docs/pages/chart-performance/showcase/text.ts

```tsx
import { useTranslation } from "react-i18next";
import type { ChartRendererPreference } from "minerva-design/charts";
import styles from "./showcase.module.scss";

export const RENDERERS: readonly ChartRendererPreference[] = [
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

/** Color of a frame rate */
export const fpsClass = (fps: number) =>
  fps >= 50 ? styles.good : fps >= 25 ? styles.fair : styles.poor;

/** Localized numbers, durations and backend names of the showcases */
export const useShowcaseFormat = () => {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
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
  return {
    count: (value: number) => number.format(Math.round(value)),
    /** 1M, 240K, 100万… */
    compact: (value: number) => compact.format(value),
    ms: (value: number) =>
      t("ms", {
        value:
          value < 100
            ? decimal.format(value)
            : number.format(Math.round(value)),
      }),
    renderer: (kind: ChartRendererPreference) => t(`renderers.${kind}`),
  };
};

```

### apps/docs/src/docs/pages/chart-performance/showcase/showcase.module.scss

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
  justify-content: space-between;
  gap: 8px 16px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-color);
}

.hud {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(92px, 1fr));
  gap: 1px;
  margin: 0;
  border-bottom: 1px solid var(--border-color);
  background: var(--border-color);
}

.stat {
  min-width: 0;
  padding: 8px 10px;
  background: var(--surface-subtle-color);

  dt {
    overflow: hidden;
    font-size: 11px;
    letter-spacing: 0.02em;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
    color: var(--text-muted-color);
  }

  dd {
    margin: 2px 0 0;
    overflow: hidden;
    font-family: var(--font-family-mono);
    font-size: 16px;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-color);
  }
}

.good {
  color: var(--success-color) !important;
}

.fair {
  color: var(--warning-color) !important;
}

.poor {
  color: var(--danger-color) !important;
}

.chart {
  position: relative;
  padding: 8px 8px 0;
}

.loading {
  display: grid;
  place-items: center;
  height: 100%;
}

.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 16px;
  padding: 8px 14px 12px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary-color);

  p {
    margin: 0;
  }
}

.fallback {
  color: var(--warning-color);
}

.hint {
  color: var(--text-muted-color);
}

// ------------------------------------------------------------ comparison

.compareGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1px;
  background: var(--border-color);
}

.panel {
  min-width: 0;
  padding: 10px 12px 8px;
  background: var(--surface-color);
}

.panelActive {
  box-shadow: inset 0 0 0 2px var(--primary-color);
}

.panelNote {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
  min-height: 28px;
  padding-top: 4px;
  font-size: 12px;
  line-height: 1.4;
  color: var(--text-secondary-color);
}

.panelHeader {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 4px 8px;
  margin-bottom: 4px;
  font-size: 13px;

  strong {
    font-size: 14px;
    color: var(--text-color);
  }
}

.result {
  font-family: var(--font-family-mono);
  font-variant-numeric: tabular-nums;
  color: var(--text-secondary-color);
}

.results {
  padding: 12px 14px;
  border-top: 1px solid var(--border-color);
}

.bars {
  display: grid;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 13px;
}

.barsTitle {
  margin: 0 0 8px;
  font-size: 12px;
  color: var(--text-muted-color);
}

.bar {
  display: grid;
  grid-template-columns: minmax(84px, 120px) 1fr minmax(120px, auto);
  align-items: center;
  gap: 10px;
  color: var(--text-secondary-color);
}

.barTrack {
  display: block;
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--surface-muted-color);
  overflow: hidden;
}

.barFill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--primary-color);
  transition: width 0.4s ease;
}

```

## Example: 1,000,000-point line

Four sensors sampled every second for almost three days: 4 × 250,000 points in typed-array columns sharing one x column. The tour zooms from the whole data set down to a few minutes, and the y axis follows the visible range (onZoom + setView).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chart-performance/demos/line.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LineChart, type ChartSeries } from "minerva-design/charts";
import {
  SIGNAL_LENGTH,
  SIGNAL_SERIES,
  SIGNAL_TARGETS,
  fitY,
  loadSignals,
  tour,
  type Signals,
} from "../showcase/data";
import { Showcase, type ShowcaseChartProps } from "../showcase/Showcase";

// zooms from the 1,000,000 points down to ~3 minutes of one sensor
const lineTour = tour({ zoom: 1200, period: 14, targets: SIGNAL_TARGETS });

function Sensors({
  data,
  chartRef,
  renderer,
  onRendererChange,
  onZoom,
}: ShowcaseChartProps<Signals>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  // typed-array columns sharing one x column: no per-point objects
  const series = useMemo(
    (): ChartSeries[] =>
      data.y.map((y, index) => ({
        id: `sensor-${index}`,
        name: t("sensor", { index: index + 1 }),
        data: { x: data.x, y },
        lineWidth: 1,
      })),
    [data, t],
  );
  return (
    <LineChart
      ref={chartRef}
      series={series}
      renderer={renderer}
      onRendererChange={onRendererChange}
      onZoom={onZoom}
      xAxis={{ type: "time" }}
      yAxis={{ title: t("temperature") }}
      interaction={{ zoom: "x" }}
      height={360}
      ariaLabel={t("lineAria")}
    />
  );
}

export default function LineDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  return (
    <Showcase
      load={loadSignals}
      chart={Sensors}
      count={SIGNAL_SERIES * SIGNAL_LENGTH}
      countLabel={t("stats.points")}
      height={360}
      motionLabel={t("tour")}
      hint={t("hintX")}
      tour={(data, time, base) => lineTour(time, base)}
      fit={fitY}
    />
  );
}

```

### apps/docs/src/docs/pages/chart-performance/showcase/data.ts

```tsx
// Data sets of the performance showcases: typed-array columns generated once
// (seeded, so every visit draws the same picture) and shared by the demos of
// the page, plus the camera "tours" that zoom in and out of them.
import type { ChartView } from "minerva-design/charts";

export type Range = [number, number];

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

/** Standard normal numbers (Box-Muller, both values of a pair are used) */
export function gaussian(random: () => number) {
  let spare = NaN;
  return () => {
    if (!Number.isNaN(spare)) {
      const value = spare;
      spare = NaN;
      return value;
    }
    const r = Math.sqrt(-2 * Math.log(1 - random()));
    const a = 2 * Math.PI * random();
    spare = r * Math.sin(a);
    return r * Math.cos(a);
  };
}

/**
 * Generates a data set on first use, one frame later so that a loading
 * state paints first; later calls share the result.
 */
const cached = <T>(generate: () => T) => {
  let promise: Promise<T> | null = null;
  return (): Promise<T> => {
    if (!promise) {
      promise = new Promise<T>((resolve) => {
        const run = () => setTimeout(() => resolve(generate()), 0);
        if (typeof requestAnimationFrame === "function")
          requestAnimationFrame(run);
        else run();
      });
    }
    return promise;
  };
};

const BLOCK = 512;

/**
 * Min / max of index ranges over several columns in O(BLOCK + n / BLOCK):
 * used to fit the y axis to the visible x range on every frame.
 */
export function rangeIndex(
  lows: readonly Float64Array[],
  highs: readonly Float64Array[],
) {
  const n = lows[0]?.length ?? 0;
  const blocks = Math.ceil(n / BLOCK);
  const blockMin = new Float64Array(blocks).fill(Infinity);
  const blockMax = new Float64Array(blocks).fill(-Infinity);
  for (const column of lows) {
    for (let i = 0; i < n; i++) {
      const b = (i / BLOCK) | 0;
      if (column[i] < blockMin[b]) blockMin[b] = column[i];
    }
  }
  for (const column of highs) {
    for (let i = 0; i < n; i++) {
      const b = (i / BLOCK) | 0;
      if (column[i] > blockMax[b]) blockMax[b] = column[i];
    }
  }
  return (from: number, to: number): Range | null => {
    let i = Math.max(0, Math.floor(from));
    const end = Math.min(n - 1, Math.ceil(to));
    if (i > end) return null;
    let lo = Infinity;
    let hi = -Infinity;
    const scan = (index: number) => {
      for (const column of lows) if (column[index] < lo) lo = column[index];
      for (const column of highs) if (column[index] > hi) hi = column[index];
    };
    for (; i <= end && i % BLOCK; i++) scan(i);
    for (; i + BLOCK - 1 <= end; i += BLOCK) {
      const b = i / BLOCK;
      if (blockMin[b] < lo) lo = blockMin[b];
      if (blockMax[b] > hi) hi = blockMax[b];
    }
    for (; i <= end; i++) scan(i);
    return lo <= hi ? [lo, hi] : null;
  };
}

/** Evenly sampled columns: the y range of the samples inside an x range */
export interface Sampled {
  start: number;
  step: number;
  range: (from: number, to: number) => Range | null;
}

/** The y range to show for an x range, with some padding */
export const fitY = (data: Sampled, x: Range): Range | null => {
  const r = data.range(
    (x[0] - data.start) / data.step - 1,
    (x[1] - data.start) / data.step + 1,
  );
  if (!r) return null;
  const pad = (r[1] - r[0]) * 0.08 || 1;
  return [r[0] - pad, r[1] + pad];
};

export interface TourOptions {
  /** Deepest magnification */
  zoom: number;
  /** Seconds of one zoom in / zoom out cycle */
  period?: number;
  /** Data positions to zoom into, one per cycle */
  targets: readonly (readonly [number, number])[];
  /** Zooms the y axis too (scatter, heatmap) */
  y?: boolean;
}

/**
 * A camera path for `setView`: zooms from the whole data set into a target,
 * drifts a little there and zooms out again, then moves to the next target.
 */
export const tour =
  ({ zoom, period = 12, targets, y = false }: TourOptions) =>
  (time: number, base: ChartView): Partial<ChartView> => {
    const cycle = Math.floor(time / period);
    const phase = (time % period) / period;
    const p = (1 - Math.cos(2 * Math.PI * phase)) / 2;
    const target = targets[cycle % targets.length] ?? [NaN, NaN];
    const scale = Math.pow(1 / zoom, p);
    const axis = (range: Range, to: number, drift: number): Range => {
      const full = range[1] - range[0];
      const width = full * scale;
      const mid = (range[0] + range[1]) / 2;
      const goal = Number.isFinite(to) ? to : mid;
      const center = mid + (goal - mid) * p + width * 0.25 * drift * p;
      const start = Math.min(
        Math.max(center - width / 2, range[0]),
        range[1] - width,
      );
      return [start, start + width];
    };
    const x = axis(base.x, target[0], Math.sin(time * 0.7));
    return y ? { x, y: axis(base.y, target[1], Math.cos(time * 0.6)) } : { x };
  };

// ------------------------------------------------------------------ line

export const SIGNAL_SERIES = 4;
export const SIGNAL_LENGTH = 250_000;
const SIGNAL_START = Date.UTC(2026, 0, 1);
const SIGNAL_STEP = 1000;

export interface Signals extends Sampled {
  /** Timestamps, one per second */
  x: Float64Array;
  /** One column per sensor */
  y: Float64Array[];
}

/** 4 sensors × 250,000 samples: daily cycles, drift and noise */
export const loadSignals = cached((): Signals => {
  const normal = gaussian(mulberry32(2026));
  const x = new Float64Array(SIGNAL_LENGTH);
  for (let i = 0; i < SIGNAL_LENGTH; i++) x[i] = SIGNAL_START + i * SIGNAL_STEP;
  const y: Float64Array[] = [];
  for (let s = 0; s < SIGNAL_SERIES; s++) {
    const column = new Float64Array(SIGNAL_LENGTH);
    const level = 18 + s * 14;
    const swing = 3 + s * 1.5;
    let drift = 0;
    for (let i = 0; i < SIGNAL_LENGTH; i++) {
      drift = drift * 0.9995 + normal() * 0.06;
      const day = Math.sin((2 * Math.PI * i) / 86_400 + s * 1.3);
      const fast = Math.sin((2 * Math.PI * i) / (600 + s * 170));
      column[i] = level + day * swing + fast * 0.6 + drift + normal() * 0.25;
    }
    y.push(column);
  }
  return {
    x,
    y,
    start: SIGNAL_START,
    step: SIGNAL_STEP,
    range: rangeIndex(y, y),
  };
});

/** Moments of the signals worth zooming into */
export const SIGNAL_TARGETS: readonly (readonly [number, number])[] = [
  0.22, 0.68, 0.41, 0.87,
].map((f) => [SIGNAL_START + f * SIGNAL_LENGTH * SIGNAL_STEP, NaN] as const);

// --------------------------------------------------------------- scatter

export const CLUSTER_COUNT = 10;
export const CLUSTER_SIZE = 100_000;

export interface Clusters {
  clusters: { x: Float64Array; y: Float64Array }[];
  /** Centers of the clusters (tour targets) */
  centers: (readonly [number, number])[];
}

/** 10 clusters × 100,000 points: blobs, rings and spiral arms */
export const loadClusters = cached((): Clusters => {
  const random = mulberry32(42);
  const normal = gaussian(random);
  const clusters: Clusters["clusters"] = [];
  const centers: Clusters["centers"] = [];
  for (let c = 0; c < CLUSTER_COUNT; c++) {
    const angle = (2 * Math.PI * c) / CLUSTER_COUNT + random() * 0.4;
    const radius = c % 3 === 0 ? 14 : 34;
    const cx = 50 + Math.cos(angle) * radius;
    const cy = 50 + Math.sin(angle) * radius;
    const sx = 2 + random() * 4;
    const sy = 1.5 + random() * 3;
    const rotation = random() * Math.PI;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const x = new Float64Array(CLUSTER_SIZE);
    const y = new Float64Array(CLUSTER_SIZE);
    for (let i = 0; i < CLUSTER_SIZE; i++) {
      let u: number;
      let v: number;
      if (c % 3 === 1) {
        // ring
        const a = random() * 2 * Math.PI;
        const r = 5 + normal() * 0.6;
        u = Math.cos(a) * r;
        v = Math.sin(a) * r;
      } else if (c % 3 === 2) {
        // spiral arm
        const t = random() * 3 * Math.PI;
        u = Math.cos(t) * t * 0.9 + normal() * 0.35;
        v = Math.sin(t) * t * 0.9 + normal() * 0.35;
      } else {
        u = normal() * sx;
        v = normal() * sy;
      }
      x[i] = cx + u * cos - v * sin;
      y[i] = cy + u * sin + v * cos;
    }
    clusters.push({ x, y });
    centers.push([cx, cy]);
  }
  return { clusters, centers };
});

// --------------------------------------------------------------- candles

export const CANDLE_COUNT = 200_000;
const CANDLE_START = Date.UTC(2026, 0, 5);
const CANDLE_STEP = 60_000;

export interface Candles extends Sampled {
  x: Float64Array;
  open: Float64Array;
  high: Float64Array;
  low: Float64Array;
  close: Float64Array;
}

/** 200,000 one-minute candles: a random walk with changing volatility */
export const loadCandles = cached((): Candles => {
  const random = mulberry32(7);
  const normal = gaussian(random);
  const x = new Float64Array(CANDLE_COUNT);
  const open = new Float64Array(CANDLE_COUNT);
  const high = new Float64Array(CANDLE_COUNT);
  const low = new Float64Array(CANDLE_COUNT);
  const close = new Float64Array(CANDLE_COUNT);
  let price = 120;
  for (let i = 0; i < CANDLE_COUNT; i++) {
    const sigma = 0.0012 * (1 + 0.7 * Math.sin(i / 9000) ** 2);
    const o = price;
    const c = o * Math.exp(normal() * sigma + 0.000002);
    x[i] = CANDLE_START + i * CANDLE_STEP;
    open[i] = o;
    close[i] = c;
    high[i] = Math.max(o, c) * (1 + Math.abs(normal()) * sigma * 0.7);
    low[i] = Math.min(o, c) * (1 - Math.abs(normal()) * sigma * 0.7);
    price = c;
  }
  return {
    x,
    open,
    high,
    low,
    close,
    start: CANDLE_START,
    step: CANDLE_STEP,
    range: rangeIndex([low], [high]),
  };
});

export const CANDLE_TARGETS: readonly (readonly [number, number])[] = [
  0.31, 0.74, 0.12, 0.55,
].map((f) => [CANDLE_START + f * CANDLE_COUNT * CANDLE_STEP, NaN] as const);

// --------------------------------------------------------------- heatmap

export const SPECTRUM_STEPS = 1000;
export const SPECTRUM_BINS = 1000;
/** Seconds per time step */
const DT = 0.02;
/** Hz per frequency bin */
const DF = 8;

export interface Spectrogram {
  /** Time of each cell (sorted: the cells go column by column) */
  x: Float64Array;
  /** Frequency of each cell */
  y: Float64Array;
  /** Level in dB */
  value: Float64Array;
}

/**
 * 1,000 time steps × 1,000 frequency bins: a chirp and its harmonics, a
 * warbling tone, periodic clicks and a pink noise floor
 */
export const loadSpectrogram = cached((): Spectrogram => {
  const normal = gaussian(mulberry32(1000));
  const n = SPECTRUM_STEPS * SPECTRUM_BINS;
  const x = new Float64Array(n);
  const y = new Float64Array(n);
  const value = new Float64Array(n);
  const duration = SPECTRUM_STEPS * DT;
  const tones: [number, number, number][] = [];
  for (let step = 0; step < SPECTRUM_STEPS; step++) {
    const t = step * DT;
    const chirp = 400 + 1500 * (t / duration) + 250 * Math.sin(t * 0.9);
    tones.length = 0;
    for (let h = 1; h <= 4; h++) tones.push([chirp * h, 40 * h, 1 / h ** 1.6]);
    tones.push([5200 + 700 * Math.sin((2 * Math.PI * t) / 4), 60, 0.35]);
    const click = Math.exp(-(((t % 2.5) - 1.2) ** 2) / 0.002) * 0.08;
    for (let bin = 0; bin < SPECTRUM_BINS; bin++) {
      const f = bin * DF;
      let power = 1e-7 / (1 + f / 300) + click / (1 + f / 4000);
      for (const [fc, width, amp] of tones) {
        const d = (f - fc) / width;
        if (d > -5 && d < 5) power += amp * Math.exp(-d * d);
      }
      const i = step * SPECTRUM_BINS + bin;
      x[i] = t;
      y[i] = f;
      value[i] = 10 * Math.log10(power) + normal() * 1.5;
    }
  }
  return { x, y, value };
});

export const SPECTRUM_TARGETS: readonly (readonly [number, number])[] = [
  [6, 1200],
  [3, 5200],
  [12.2, 2500],
  [17, 3900],
];

```

### apps/docs/src/docs/pages/chart-performance/showcase/Showcase.tsx

```tsx
import {
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type RefObject,
} from "react";
import { useTranslation } from "react-i18next";
import { LoadingState, Radio, RadioGroup, Switch } from "minerva-design";
import type {
  ChartHandle,
  ChartRendererKind,
  ChartRendererPreference,
  ChartView,
} from "minerva-design/charts";
import { ChartRendererContext } from "../../../renderer/context";
import {
  autoPick,
  probeBackends,
  type BackendsSupport,
} from "../../../renderer/support";
import type { Range } from "./data";
import {
  afterNextPaint,
  prefersReducedMotion,
  useFrameLoop,
  useInView,
} from "./meter";
import { RENDERERS, fpsClass, useShowcaseFormat } from "./text";
import styles from "./showcase.module.scss";

/** Stops the tour when a frame takes longer than this (ms of main thread) */
const SLOW_FRAME = 250;

/** Props a showcase gives to its chart component */
export interface ShowcaseChartProps<T> {
  /** The generated data set */
  data: T;
  /** Chart handle (the camera tour moves the view through it) */
  chartRef: RefObject<ChartHandle | null>;
  /** Backend picked in the selector */
  renderer: ChartRendererPreference;
  /** Reports the backend that actually started */
  onRendererChange: (kind: ChartRendererKind) => void;
  /** Fits the y axis to the zoomed x range */
  onZoom: (view: ChartView) => void;
  /** On screen and not paused (streaming demos run while true) */
  running: boolean;
}

export interface ShowcaseProps<T> {
  /** Loads the data set (generated once, when the showcase nears the screen) */
  load: () => Promise<T>;
  /** Draws the data set */
  chart: ComponentType<ShowcaseChartProps<T>>;
  /** Number of marks drawn */
  count: number;
  /** What `count` counts ("Points", "Cells", ...) */
  countLabel: string;
  /** Height of the chart in px */
  height: number;
  /** Label of the motion switch (camera tour, stream) */
  motionLabel: string;
  /** Interaction hint under the chart */
  hint: string;
  /** Camera path: the view at `time` seconds into the tour */
  tour?: (data: T, time: number, base: ChartView) => Partial<ChartView>;
  /** The y range to show for an x range (zoomable x only) */
  fit?: (data: T, x: Range) => Range | null;
  /** One more statistic */
  extra?: { label: string; value: string };
}

/**
 * A chart under test: renderer selector, live statistics (frame rate,
 * frame time, main-thread time, marks, time to first frame), a camera tour
 * and the backend that actually started. The data is generated when the
 * showcase nears the screen; the loop only runs while it is visible.
 */
export function Showcase<T>({
  load,
  chart: Plot,
  count,
  countLabel,
  height,
  motionLabel,
  hint,
  tour,
  fit,
  extra,
}: ShowcaseProps<T>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  const text = useShowcaseFormat();
  const rootRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartHandle>(null);
  const near = useInView(rootRef, "300px");
  const visible = useInView(rootRef);
  const [data, setData] = useState<{ value: T } | null>(null);
  const [renderer, setRenderer] = useState<ChartRendererPreference>("auto");
  const [actual, setActual] = useState<ChartRendererKind | null>(null);
  const [motion, setMotion] = useState(() => !prefersReducedMotion());
  const [slow, setSlow] = useState<number | null>(null);
  const [startup, setStartup] = useState<number | null>(null);
  /** When the data was handed to the chart or the backend was switched */
  const startRef = useRef(0);
  const tourRef = useRef<{ start: number; base: ChartView } | null>(null);
  /** Consecutive slow frames of the tour */
  const slowFramesRef = useRef(0);
  // the renderer of the page bar: what "auto" means here
  const page = useContext(ChartRendererContext) ?? "auto";
  const [support, setSupport] = useState<BackendsSupport | null>(null);

  useEffect(() => {
    let cancelled = false;
    void probeBackends().then((result) => {
      if (!cancelled) setSupport(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // A GPU backend forced for the whole page may run on a software GPU here,
  // which takes seconds per frame with these data sets: "auto" then uses
  // the best hardware backend instead (picking it in this demo still forces it)
  const pageSoftware = page !== "auto" && support?.[page] === "software";
  const probing = page !== "auto" && page !== "canvas2d" && !support;
  const chartRenderer: ChartRendererPreference =
    renderer === "auto" && pageSoftware && support
      ? autoPick(support)
      : renderer;
  const requested = renderer === "auto" ? page : renderer;

  useEffect(() => {
    if (!near || data) return;
    let cancelled = false;
    void load().then((value) => {
      if (cancelled) return;
      startRef.current = performance.now();
      setData({ value });
    });
    return () => {
      cancelled = true;
    };
  }, [near, data, load]);

  // the tour stops as soon as the user zooms, pans or uses the keyboard
  useEffect(() => {
    const plot = plotRef.current;
    if (!plot) return;
    const stop = () => setMotion(false);
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) stop();
    };
    const onKey = (event: KeyboardEvent) => {
      if (/^(Arrow|\+|-|=|0|Home|End)/.test(event.key)) stop();
    };
    plot.addEventListener("pointerdown", stop);
    plot.addEventListener("wheel", onWheel, { passive: true });
    plot.addEventListener("keydown", onKey);
    return () => {
      plot.removeEventListener("pointerdown", stop);
      plot.removeEventListener("wheel", onWheel);
      plot.removeEventListener("keydown", onKey);
    };
  }, []);

  const animating = motion && slow === null;
  const running = visible && !!data;

  const stats = useFrameLoop(running, {
    onFrame: (time) => {
      const instance = chartRef.current?.getInstance();
      // starts once the first frame (the costly one: buffers) is painted
      if (!tour || !animating || !data || startup === null || !instance) {
        tourRef.current = null;
        return;
      }
      let state = tourRef.current;
      if (!state) {
        instance.resetZoom();
        state = { start: time, base: instance.getView() };
        tourRef.current = state;
        slowFramesRef.current = 0;
      }
      const view = tour(data.value, (time - state.start) / 1000, state.base);
      if (fit && view.x && !view.y) {
        const y = fit(data.value, view.x);
        if (y) view.y = y;
      }
      instance.setView(view);
    },
    onWork: (ms) => {
      if (!tourRef.current) return;
      // two slow frames in a row (or a very slow one): this backend cannot
      // animate the data set here
      slowFramesRef.current = ms > SLOW_FRAME ? slowFramesRef.current + 1 : 0;
      if (slowFramesRef.current >= 2 || ms > SLOW_FRAME * 4) {
        tourRef.current = null;
        setSlow(ms);
      }
    },
  });

  const onRendererChange = (kind: ChartRendererKind) => {
    setActual(kind);
    afterNextPaint(() => setStartup(performance.now() - startRef.current));
  };
  const onZoom = (view: ChartView) => {
    if (!fit || !data) return;
    const y = fit(data.value, view.x);
    if (y) chartRef.current?.setView({ y });
  };

  let status: ReactNode = t("status.starting");
  if (slow !== null) {
    status = (
      <span className={styles.fallback}>
        {t("status.slow", { ms: text.ms(slow) })}
      </span>
    );
  } else if (actual && renderer === "auto" && pageSoftware) {
    status = (
      <span className={styles.fallback}>
        {t("status.pageSoftware", {
          requested: text.renderer(page),
          backend: text.renderer(actual),
        })}
      </span>
    );
  } else if (actual && requested === "auto") {
    status =
      actual === "canvas2d"
        ? t("status.autoCanvas", { backend: text.renderer(actual) })
        : t("status.auto", { backend: text.renderer(actual) });
  } else if (actual && actual === requested) {
    status =
      renderer === "auto"
        ? t("status.page", { backend: text.renderer(actual) })
        : t("status.forced", { backend: text.renderer(actual) });
  } else if (actual) {
    status = (
      <span className={styles.fallback}>
        {t("status.fallback", {
          requested: text.renderer(requested),
          backend: text.renderer(actual),
        })}
      </span>
    );
  }

  return (
    <div ref={rootRef} className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("renderer")}
          direction="horizontal"
          size="small"
          value={renderer}
          onChange={(value) => {
            startRef.current = performance.now();
            setRenderer(value as ChartRendererPreference);
            setActual(null);
            setStartup(null);
            setSlow(null);
          }}
        >
          {RENDERERS.map((kind) => (
            <Radio
              key={kind}
              value={kind}
              label={
                kind === "auto" && page !== "auto"
                  ? t("renderers.page", { backend: text.renderer(page) })
                  : text.renderer(kind)
              }
            />
          ))}
        </RadioGroup>
        <Switch
          size="small"
          checked={motion}
          label={motionLabel}
          onChange={(checked) => {
            setMotion(checked);
            setSlow(null);
          }}
        />
      </div>

      <dl className={styles.hud}>
        <div className={styles.stat}>
          <dt>{t("stats.renderer")}</dt>
          <dd>{actual ? text.renderer(actual) : "…"}</dd>
        </div>
        <div className={styles.stat}>
          <dt>{t("stats.fps")}</dt>
          <dd className={stats ? fpsClass(stats.fps) : undefined}>
            {stats ? text.count(stats.fps) : "–"}
          </dd>
        </div>
        <div className={styles.stat}>
          <dt>{t("stats.frame")}</dt>
          <dd>{stats ? text.ms(stats.frame) : "–"}</dd>
        </div>
        <div className={styles.stat}>
          <dt>{t("stats.work")}</dt>
          <dd>{stats ? text.ms(stats.work) : "–"}</dd>
        </div>
        <div className={styles.stat}>
          <dt>{countLabel}</dt>
          <dd title={text.count(count)}>{text.compact(count)}</dd>
        </div>
        {extra && (
          <div className={styles.stat}>
            <dt>{extra.label}</dt>
            <dd>{extra.value}</dd>
          </div>
        )}
        <div className={styles.stat}>
          <dt>{t("stats.startup")}</dt>
          <dd>{startup !== null ? text.ms(startup) : "–"}</dd>
        </div>
      </dl>

      <div ref={plotRef} className={styles.chart}>
        {data && !probing ? (
          <Plot
            data={data.value}
            chartRef={chartRef}
            renderer={chartRenderer}
            onRendererChange={onRendererChange}
            onZoom={onZoom}
            running={running && motion}
          />
        ) : (
          <LoadingState
            className={styles.loading}
            style={{ height }}
            size="small"
            label={t("loading", { value: text.count(count) })}
          />
        )}
      </div>

      <div className={styles.footer}>
        <p role="status">{status}</p>
        <p className={styles.hint}>{hint}</p>
      </div>
    </div>
  );
}

```

### apps/docs/src/docs/renderer/context.ts

```tsx
// Kept free of engine imports: DemoBlock (on every page) reads the context,
// the engine is only loaded by the lazy RendererScope of chart pages.
import { createContext } from "react";
import type { ChartRendererPreference } from "minerva-design/charts/core";
import type { DocCategory } from "../registry";

/** Categories whose pages get the renderer bar and the per-demo badges */
export const RENDERER_CATEGORIES: readonly DocCategory[] = [
  "charts",
  "financeCharts",
  "charts3d",
  "graphCharts",
  "chartEngine",
  "icons",
];

/**
 * What the bar of a page switches: the charts, or the canvas icons (icon
 * pages; the same stored choice drives both, see store.ts)
 */
export type RendererTopic = "charts" | "icons";

export const RendererTopicContext = createContext<RendererTopic>("charts");

/**
 * The page-wide chart renderer (null outside chart pages), shown by the demo
 * badges. The charts follow it by themselves through the engine's default.
 */
export const ChartRendererContext =
  createContext<ChartRendererPreference | null>(null);

```

### apps/docs/src/docs/registry.ts

```tsx
/**
 * Single source of truth for the documentation site.
 *
 * Plain data only (no React / JSX) so tests can import it in Node:
 * - the router builds one lazily-loaded route per page from this list
 * - the sidebar groups pages by `category`
 * - `src/docs/docs.test.ts` checks that every public export of the libraries
 *   is documented, that every `api` entry exists in `api.generated.json`,
 *   that every demo file exists and that all locales contain the page strings.
 *
 * Page content lives in `src/docs/pages/<id>/index.tsx` (+ `demos/<demo>.tsx`)
 * and its strings in `src/i18n/locales/<lng>/docs/<id>.json`.
 */

export type DocCategory =
  | "gettingStarted"
  | "theming"
  | "configuration"
  | "general"
  | "layout"
  | "dataEntry"
  | "dataDisplay"
  | "feedback"
  | "navigation"
  | "overlays"
  | "editors"
  | "charts"
  | "financeCharts"
  | "charts3d"
  | "graphCharts"
  | "chartEngine"
  | "icons"
  | "mobile"
  | "webComponents";

export interface DocPageMeta {
  /** Route path and folder name under src/docs/pages */
  id: string;
  category: DocCategory;
  /** Runtime exports of the package documented on this page */
  exports?: string[];
  /** Package the exports come from */
  package?:
    | "minerva-design"
    | "minerva-design/web-components"
    | "minerva-design/charts"
    | "minerva-design/charts/core"
    | "minerva-design/icons"
    | "minerva-design/icons/core";
  /** Interfaces from api.generated.json rendered as API tables */
  api?: string[];
  /** Demo ids, in display order; each maps to `pages/<id>/demos/<demo>.tsx` */
  demos?: string[];
  /**
   * Component folders of minerva-design whose CSS custom properties
   * (`// @css-var` comments in their SCSS) are listed in a "CSS variables"
   * section
   */
  cssVars?: string[];
  /**
   * Web Component counterpart shown in the page's "Web Components" tab:
   * the define entry (`minerva-design/web-components/<entry>`), the custom
   * elements documented on the page (API tables from custom-elements.json)
   * and the demo ids (`pages/<id>/wc/<demo>.html` + optional `<demo>.ts`)
   */
  wc?: WcMeta;
  /**
   * React Native counterpart shown in the page's "React Native" tab
   * (minerva-design/native): exports, API interfaces of
   * api.native.generated.json (without the `native:` prefix) and demo ids
   * (`pages/<id>/native/<demo>.tsx`, rendered through react-native-web in a
   * phone frame). A page with `native` only (no `exports`) is a mobile
   * component: the React Native content is the whole page.
   */
  native?: NativeMeta;
}

export interface NativeMeta {
  /** Exports of minerva-design/native documented on the page */
  exports: string[];
  /** Entry the exports come from @default "minerva-design/native" */
  package?: string;
  /** Interfaces rendered as API tables (`ButtonProps` = `native:ButtonProps`) */
  api: string[];
  /** Demo ids, in display order */
  demos: string[];
}

export interface WcMeta {
  /** Define entry: `minerva-design/web-components/<entry>` */
  entry: string;
  /** Tag names documented on the page, in display order */
  tags: string[];
  /** Demo ids, in display order */
  demos: string[];
}

export const categories: DocCategory[] = [
  "gettingStarted",
  "theming",
  "configuration",
  "webComponents",
  "general",
  "layout",
  "dataEntry",
  "dataDisplay",
  "feedback",
  "overlays",
  "navigation",
  "editors",
  "mobile",
  "charts",
  "financeCharts",
  "charts3d",
  "graphCharts",
  "chartEngine",
  "icons",
];

/** Top-level parts of the site, each with its own sidebar */
export type DocSection = "docs" | "components" | "charts" | "icons";

export interface DocSectionMeta {
  id: DocSection;
  /** Page the top navigation link opens */
  home: string;
  categories: readonly DocCategory[];
}

export const sections: readonly DocSectionMeta[] = [
  {
    id: "docs",
    home: "overview",
    categories: ["gettingStarted", "theming", "configuration", "webComponents"],
  },
  {
    id: "components",
    home: "button",
    categories: [
      "general",
      "layout",
      "dataEntry",
      "dataDisplay",
      "feedback",
      "overlays",
      "navigation",
      "editors",
      "mobile",
    ],
  },
  {
    id: "charts",
    home: "charts",
    categories: [
      "charts",
      "financeCharts",
      "charts3d",
      "graphCharts",
      "chartEngine",
    ],
  },
  {
    id: "icons",
    home: "icons",
    categories: ["icons"],
  },
];

/** Section of a category (every category belongs to exactly one) */
export const sectionOf = (category: DocCategory): DocSection =>
  sections.find((section) => section.categories.includes(category))?.id ??
  "docs";

export const docPages: DocPageMeta[] = [
  // Getting started
  { id: "overview", category: "gettingStarted" },
  { id: "installation", category: "gettingStarted" },
  { id: "introduction", category: "gettingStarted" },
  { id: "architecture", category: "gettingStarted" },
  { id: "platform-support", category: "gettingStarted" },
  { id: "rsc-guide", category: "gettingStarted" },
  { id: "vue", category: "gettingStarted" },
  { id: "angular", category: "gettingStarted" },
  { id: "react-native", category: "gettingStarted" },
  { id: "theming", category: "gettingStarted", demos: ["scoped-theme"] },
  {
    id: "styling",
    category: "gettingStarted",
    demos: [
      "restyle-button",
      "restyle-modal",
      "restyle-tabs",
      "restyle-table",
      "items-menu",
      "items-select",
      "items-pagination",
      "items-table",
      "items-toast",
    ],
  },
  { id: "changelog", category: "gettingStarted" },

  // Configuration: ConfigProvider, hooks and theme utilities
  {
    id: "config-provider",
    category: "configuration",
    exports: ["ConfigProvider", "useConfig", "ConfigContext"],
    api: ["ConfigContextProviderProps", "ConfigContextProps", "Locale"],
    demos: ["use-config", "custom-theme", "locale", "palette", "brand-color"],
    wc: {
      entry: "config",
      tags: ["minerva-config"],
      demos: ["basic", "palette-design", "locale", "nested", "brand-color"],
    },
    native: {
      exports: [
        "MinervaProvider",
        "ConfigProvider",
        "useTheme",
        "useTokens",
        "useI18n",
        "useInsets",
      ],
      api: [
        "MinervaProviderProps",
        "MinervaTheme",
        "MinervaI18n",
        "NativeLocale",
        "NativeFonts",
      ],
      demos: ["switching", "use-theme"],
    },
  },
  {
    id: "hooks",
    category: "configuration",
    exports: ["useAutoTheme", "useLocale", "useI18n", "useDisclosure", "cn"],
    demos: ["use-auto-theme", "use-locale", "use-disclosure"],
  },
  {
    id: "theme-utils",
    category: "configuration",
    exports: [
      "applyThemeStyles",
      "generateCSSVariables",
      "getSystemTheme",
      "isBilingualTheme",
      "resolveTheme",
      "themes",
      "light",
      "dark",
      "githubDark",
    ],
    api: ["ThemeProps", "SemanticThemeProps", "ComponentThemeProps"],
    demos: ["theme-swatches", "resolve-theme", "scoped-preview"],
  },

  // General
  {
    id: "button",
    cssVars: ["Button"],
    category: "general",
    exports: ["Button"],
    api: ["ButtonProps"],
    demos: [
      "basic",
      "colors",
      "variants",
      "sizes",
      "shapes",
      "states",
      "with-icon",
      "icons-loading",
      "form",
    ],
    wc: {
      entry: "button",
      tags: ["minerva-button"],
      demos: ["basic", "colors-variants", "sizes-shapes", "states", "form"],
    },
    native: {
      exports: ["Button"],
      api: ["ButtonProps"],
      demos: [
        "basic",
        "colors",
        "variants",
        "sizes",
        "shapes",
        "states",
        "with-icon",
        "icons-loading",
        "form",
      ],
    },
  },
  {
    id: "icon-button",
    cssVars: ["IconButton"],
    category: "general",
    exports: ["IconButton"],
    api: ["IconButtonProps"],
    demos: [
      "basic",
      "colors",
      "variants",
      "sizes-and-shapes",
      "states",
      "toggle",
      "search",
      "custom-colors",
      "tooltip",
      "label",
    ],
    wc: {
      entry: "icon-button",
      tags: ["minerva-icon-button"],
      demos: ["basic", "sizes-shapes", "toggle", "states"],
    },
    native: {
      exports: ["IconButton"],
      api: ["IconButtonProps"],
      demos: ["basic", "toggle", "variants-sizes"],
    },
  },

  // Layout
  {
    id: "divider",
    cssVars: ["Divider"],
    category: "layout",
    exports: ["Divider"],
    api: ["DividerProps"],
    demos: [
      "basic",
      "variants",
      "with-text",
      "vertical",
      "flex-item",
      "custom-style",
    ],
    wc: {
      entry: "divider",
      tags: ["minerva-divider"],
      demos: [
        "basic",
        "variants",
        "with-text",
        "vertical",
        "flex-item",
        "custom-style",
      ],
    },
    native: {
      exports: ["Divider"],
      api: ["DividerProps"],
      demos: ["basic", "vertical", "with-text"],
    },
  },
  {
    id: "card",
    cssVars: ["Card"],
    category: "layout",
    exports: [
      "Card",
      "CardHeader",
      "CardTitle",
      "CardDescription",
      "CardContent",
      "CardFooter",
    ],
    api: [
      "CardProps",
      "CardHeaderProps",
      "CardTitleProps",
      "CardDescriptionProps",
      "CardContentProps",
      "CardFooterProps",
    ],
    demos: [
      "basic",
      "variants",
      "padded",
      "interactive",
      "custom-colors",
      "animation",
    ],
    wc: {
      entry: "card",
      tags: [
        "minerva-card",
        "minerva-card-header",
        "minerva-card-content",
        "minerva-card-footer",
        "minerva-card-title",
        "minerva-card-description",
      ],
      demos: ["basic", "variants", "padded", "interactive"],
    },
    native: {
      exports: [
        "Card",
        "CardHeader",
        "CardTitle",
        "CardDescription",
        "CardContent",
        "CardFooter",
      ],
      api: ["CardProps"],
      demos: ["basic", "product", "variants"],
    },
  },
  {
    id: "virtual-list",
    cssVars: ["VirtualList"],
    category: "layout",
    exports: ["VirtualList"],
    api: ["VirtualListProps", "VirtualListItem"],
    demos: [
      "basic",
      "auto-height",
      "infinite-scroll",
      "high-performance",
      "clickable-rows",
    ],
    wc: {
      entry: "virtual-list",
      tags: ["minerva-virtual-list"],
      demos: ["basic", "clickable-rows", "infinite-scroll"],
    },
    native: {
      exports: ["VirtualList"],
      api: ["VirtualListProps"],
      demos: ["basic"],
    },
  },

  // Data entry
  {
    id: "checkbox",
    cssVars: ["Checkbox"],
    category: "dataEntry",
    exports: ["Checkbox"],
    api: ["CheckboxProps"],
    demos: [
      "basic",
      "controlled",
      "indeterminate",
      "sizes-and-shapes",
      "label-placement",
      "states",
      "custom-style",
      "error",
      "colors-and-form-control",
    ],
    native: {
      exports: ["Checkbox"],
      api: ["CheckboxProps"],
      demos: ["basic", "controlled", "indeterminate"],
    },
    wc: {
      entry: "checkbox",
      tags: ["minerva-checkbox"],
      demos: ["basic", "select-all", "styles-states", "form"],
    },
  },
  {
    id: "radio",
    cssVars: ["Radio"],
    category: "dataEntry",
    exports: ["Radio", "RadioGroup"],
    api: ["RadioProps", "RadioGroupProps"],
    demos: [
      "basic",
      "controlled",
      "horizontal",
      "sizes",
      "colors",
      "disabled",
      "validation",
    ],
    native: {
      exports: ["Radio", "RadioGroup"],
      api: ["RadioProps", "RadioGroupProps"],
      demos: ["basic", "controlled", "disabled"],
    },
    wc: {
      entry: "radio",
      tags: ["minerva-radio", "minerva-radio-group"],
      demos: ["basic", "styles-states", "form"],
    },
  },
  {
    id: "switch",
    cssVars: ["Switch"],
    native: {
      exports: ["Switch"],
      api: ["SwitchProps"],
      demos: [
        "basic",
        "controlled",
        "sizes",
        "colors",
        "label-placement",
        "states",
      ],
    },
    category: "dataEntry",
    exports: ["Switch"],
    api: ["SwitchProps"],
    demos: [
      "basic",
      "controlled",
      "sizes",
      "colors",
      "label-placement",
      "states",
      "icons",
      "custom-style",
      "bilateral-and-segmented",
    ],
    wc: {
      entry: "switch",
      tags: ["minerva-switch"],
      demos: ["basic", "styles-states", "side-labels", "form"],
    },
  },
  {
    id: "auto-complete",
    cssVars: ["AutoComplete"],
    category: "dataEntry",
    exports: ["AutoComplete"],
    api: ["AutoCompleteProps", "AutoCompleteOption"],
    demos: [
      "basic",
      "controlled",
      "rich-options",
      "custom-render",
      "grouped",
      "filter-sort",
      "async-loading",
      "appearance",
      "search-box",
    ],
    wc: {
      entry: "autocomplete",
      tags: ["minerva-autocomplete"],
      demos: ["basic", "rich-options", "custom-render", "async-loading"],
    },
    native: {
      exports: ["AutoComplete"],
      api: ["AutoCompleteProps"],
      demos: ["basic"],
    },
  },
  {
    id: "cascader",
    cssVars: ["Cascader"],
    category: "dataEntry",
    exports: ["Cascader"],
    api: ["CascaderProps", "CascaderOption"],
    demos: [
      "basic",
      "default-value",
      "controlled",
      "hover",
      "search",
      "display-render",
      "disabled",
      "lazy-load",
      "custom-option",
    ],
    wc: {
      entry: "cascader",
      tags: ["minerva-cascader"],
      demos: ["basic", "search-hover", "lazy", "form"],
    },
    native: { exports: ["Cascader"], api: ["CascaderProps"], demos: ["basic"] },
  },
  {
    id: "time-picker",
    cssVars: ["TimePicker"],
    category: "dataEntry",
    exports: ["TimePicker"],
    api: ["TimePickerProps"],
    demos: [
      "basic",
      "default-value",
      "controlled",
      "formats",
      "twelve-hour",
      "steps",
      "time-range",
      "sizes",
      "disabled",
    ],
    wc: {
      entry: "time-picker",
      tags: ["minerva-time-picker"],
      demos: ["basic", "formats", "range-steps", "form"],
    },
    native: {
      exports: ["TimePicker"],
      api: ["TimePickerProps"],
      demos: ["basic"],
    },
  },
  {
    id: "date-picker",
    cssVars: ["DatePicker"],
    category: "dataEntry",
    exports: ["DatePicker"],
    api: ["DatePickerProps"],
    demos: [
      "basic",
      "default-value",
      "controlled",
      "min-max",
      "sizes",
      "disabled",
      "form-control",
    ],
    wc: {
      entry: "date-picker",
      tags: ["minerva-date-picker"],
      demos: ["basic"],
    },
    native: {
      exports: ["DatePicker"],
      api: ["DatePickerProps"],
      demos: ["basic"],
    },
  },

  // Data display
  {
    id: "avatar",
    cssVars: ["Avatar"],
    category: "dataDisplay",
    exports: ["Avatar", "AvatarGroup"],
    api: ["AvatarProps", "AvatarGroupProps"],
    demos: ["basic", "shapes", "sizes", "group", "fallback"],
    wc: {
      entry: "avatar",
      tags: ["minerva-avatar", "minerva-avatar-group"],
      demos: ["basic", "shapes-sizes", "group", "fallback"],
    },
    native: {
      exports: ["Avatar", "AvatarGroup"],
      api: ["AvatarProps", "AvatarGroupProps"],
      demos: ["basic", "group", "sizes-shapes"],
    },
  },
  {
    id: "badge",
    cssVars: ["Badge"],
    category: "dataDisplay",
    exports: ["Badge"],
    api: ["BadgeProps"],
    demos: [
      "basic",
      "colors",
      "variants",
      "positions",
      "sizes",
      "dot",
      "with-icon",
      "custom-style",
      "status",
    ],
    wc: {
      entry: "badge",
      tags: ["minerva-badge"],
      demos: ["basic", "colors-variants", "positions", "slots"],
    },
    native: {
      exports: ["Badge"],
      api: ["BadgeProps"],
      demos: ["basic", "colors-variants", "dot-max"],
    },
  },
  {
    id: "tag",
    cssVars: ["Tag"],
    category: "dataDisplay",
    exports: ["Tag"],
    api: ["TagProps"],
    demos: [
      "colors",
      "variants",
      "sizes-shapes",
      "with-icon",
      "closable",
      "clickable",
      "avatar-loading",
      "custom-colors",
      "disabled",
    ],
    wc: {
      entry: "tag",
      tags: ["minerva-tag"],
      demos: ["basic", "variants-sizes", "closable", "toggle"],
    },
    native: {
      exports: ["Tag"],
      api: ["TagProps"],
      demos: ["closable", "colors-variants", "selectable"],
    },
  },
  {
    id: "empty",
    cssVars: ["Empty"],
    category: "dataDisplay",
    exports: ["Empty"],
    api: ["EmptyProps"],
    demos: ["basic", "svg", "custom-icon", "with-action", "sizes", "styled"],
    wc: {
      entry: "empty",
      tags: ["minerva-empty"],
      demos: ["basic", "actions", "sizes-styles"],
    },
    native: { exports: ["Empty"], api: ["EmptyProps"], demos: ["basic"] },
  },
  {
    id: "tooltip",
    cssVars: ["Tooltip"],
    category: "dataDisplay",
    exports: ["Tooltip", "TooltipProvider"],
    api: ["TooltipProps", "TooltipRef", "TooltipProviderProps"],
    demos: [
      "basic",
      "placements",
      "colors",
      "variants",
      "shapes",
      "animations",
      "custom-colors",
      "delays",
      "follow-cursor",
      "controlled",
      "events",
      "as-child",
      "provider",
    ],
    wc: {
      entry: "tooltip",
      tags: ["minerva-tooltip-provider", "minerva-tooltip"],
      demos: ["basic", "styles", "provider", "controlled"],
    },
    native: {
      exports: ["Tooltip", "TooltipProvider"],
      api: ["TooltipProps", "TooltipProviderProps"],
      demos: ["basic"],
    },
  },

  // Feedback
  {
    id: "alert",
    cssVars: ["Alert"],
    category: "feedback",
    exports: ["Alert"],
    api: ["AlertProps"],
    demos: [
      "colors",
      "variants",
      "with-title",
      "sizes",
      "closable",
      "with-action",
      "collapsible",
      "banner",
      "appearance",
      "animations",
      "return-focus",
    ],
    wc: {
      entry: "alert",
      tags: ["minerva-alert"],
      demos: ["basic", "variants-sizes", "closable", "collapsible"],
    },
    native: { exports: ["Alert"], api: ["AlertProps"], demos: ["basic"] },
  },
  {
    id: "progress",
    cssVars: ["ProgressIndicator"],
    category: "feedback",
    exports: ["ProgressIndicator"],
    api: ["ProgressIndicatorProps"],
    demos: [
      "variants",
      "sizes",
      "colors",
      "label",
      "width",
      "with-icon",
      "determinate",
    ],
    wc: {
      entry: "progress",
      tags: ["minerva-progress"],
      demos: ["basic", "sizes-colors", "label-width", "determinate"],
    },
    native: {
      exports: ["ProgressIndicator"],
      api: ["ProgressProps"],
      demos: ["basic"],
    },
  },
  {
    id: "skeleton",
    cssVars: ["Skeleton"],
    category: "feedback",
    exports: ["Skeleton", "SkeletonText"],
    api: ["SkeletonProps", "SkeletonTextProps"],
    demos: [
      "basic",
      "variants",
      "animations",
      "composition",
      "card",
      "loading",
      "decorative",
      "skeleton-text",
    ],
    wc: {
      entry: "skeleton",
      tags: ["minerva-skeleton", "minerva-skeleton-text"],
      demos: ["basic", "variants", "loading", "composition"],
    },
    native: {
      exports: ["Skeleton", "SkeletonText"],
      api: ["SkeletonProps", "SkeletonTextProps"],
      demos: ["basic"],
    },
  },

  // Navigation
  {
    id: "pagination",
    cssVars: ["Pagination"],
    category: "navigation",
    exports: ["Pagination"],
    api: ["PaginationProps", "PaginationLabels"],
    demos: [
      "basic",
      "many-pages",
      "total-and-jumper",
      "size-changer",
      "sizes",
      "shapes-and-variants",
      "simple",
      "custom-render",
      "disabled",
      "responsive",
      "compact",
    ],
    wc: {
      entry: "pagination",
      tags: ["minerva-pagination"],
      demos: ["basic", "total-and-jumper", "appearance", "simple"],
    },
    native: {
      exports: ["Pagination"],
      api: ["PaginationProps"],
      demos: ["basic", "simple"],
    },
  },

  // Layout
  {
    id: "box",
    category: "layout",
    exports: ["Box"],
    api: ["BoxProps"],
    demos: ["basic", "sizing", "polymorphic"],
    wc: {
      entry: "box",
      tags: ["minerva-box"],
      demos: ["basic", "spacing-sizing", "surfaces"],
    },
    native: { exports: ["Box"], api: ["BoxProps"], demos: ["basic"] },
  },
  {
    id: "stack",
    cssVars: ["Stack"],
    category: "layout",
    exports: ["Stack", "HStack", "VStack"],
    api: ["StackProps"],
    demos: ["basic", "horizontal", "gap", "wrap", "separator", "attached"],
    wc: {
      entry: "stack",
      tags: ["minerva-stack", "minerva-hstack", "minerva-vstack"],
      demos: ["basic", "hstack-vstack", "wrap-separator", "attached"],
    },
    native: {
      exports: ["Stack", "HStack", "VStack"],
      api: ["StackProps", "HStackProps", "VStackProps"],
      demos: ["basic"],
    },
  },
  {
    id: "responsive-grid",
    cssVars: ["ResponsiveGrid"],
    category: "layout",
    exports: ["ResponsiveGrid", "GridItem"],
    api: ["ResponsiveGridProps", "GridItemProps"],
    demos: ["basic", "full-width"],
    wc: {
      entry: "responsive-grid",
      tags: ["minerva-responsive-grid", "minerva-grid-item"],
      demos: ["basic", "container", "full-width"],
    },
    native: {
      exports: ["ResponsiveGrid", "GridItem"],
      api: ["ResponsiveGridProps", "GridItemProps"],
      demos: ["basic"],
    },
  },
  {
    id: "split-layout",
    cssVars: ["SplitLayout"],
    category: "layout",
    exports: ["SplitLayout"],
    api: ["SplitLayoutProps"],
    demos: ["basic", "options"],
    wc: {
      entry: "split-layout",
      tags: ["minerva-split-layout"],
      demos: ["basic", "options"],
    },
    native: {
      exports: ["SplitLayout"],
      api: ["SplitLayoutProps"],
      demos: ["basic"],
    },
  },
  {
    id: "page",
    cssVars: ["Page"],
    category: "layout",
    exports: ["Page", "PageHeader", "PageSection", "StatCard", "Toolbar"],
    api: [
      "PageProps",
      "PageHeaderProps",
      "PageSectionProps",
      "StatCardProps",
      "ToolbarProps",
    ],
    demos: ["basic", "stat-cards", "toolbar"],
    wc: {
      entry: "page",
      tags: [
        "minerva-page",
        "minerva-page-header",
        "minerva-page-section",
        "minerva-toolbar",
        "minerva-stat-card",
      ],
      demos: ["basic", "stat-cards", "toolbar"],
    },
    native: {
      exports: ["Page", "PageHeader", "PageSection", "StatCard", "Toolbar"],
      api: [
        "PageProps",
        "PageHeaderProps",
        "PageSectionProps",
        "StatCardProps",
        "ToolbarProps",
      ],
      demos: ["basic"],
    },
  },
  {
    id: "app-shell",
    cssVars: ["AppShell"],
    category: "layout",
    exports: ["AppShell"],
    api: ["AppShellProps", "AppShellNavigationState", "AppShellLabels"],
    demos: ["basic", "controlled", "skip-link"],
    wc: {
      entry: "app-shell",
      tags: ["minerva-app-shell"],
      demos: ["basic", "sidebar-modes", "controlled"],
    },
    native: { exports: ["AppShell"], api: ["AppShellProps"], demos: ["basic"] },
  },

  // Overlays
  {
    id: "modal",
    cssVars: ["Modal"],
    category: "overlays",
    exports: [
      "Modal",
      "ModalRoot",
      "ModalTrigger",
      "ModalClose",
      "ModalContent",
      "ModalHeader",
      "ModalBody",
      "ModalFooter",
    ],
    api: [
      "ModalProps",
      "ModalRootProps",
      "ModalTriggerProps",
      "ModalContentProps",
    ],
    demos: ["basic", "uncontrolled", "sizes", "form", "compound"],
    wc: {
      entry: "modal",
      tags: ["minerva-modal"],
      demos: ["basic", "sizes", "form", "events"],
    },
    native: {
      exports: [
        "Dialog",
        "Modal",
        "ModalRoot",
        "ModalTrigger",
        "ModalClose",
        "ModalContent",
        "ModalHeader",
        "ModalBody",
        "ModalFooter",
      ],
      api: ["DialogProps", "ModalRootProps", "ModalTriggerProps"],
      demos: ["basic", "form", "confirm", "custom-footer"],
    },
  },
  {
    id: "confirm",
    category: "overlays",
    exports: ["ConfirmDialog", "ConfirmProvider", "confirm", "useConfirm"],
    api: ["ConfirmDialogProps", "ConfirmOptions", "ConfirmProviderProps"],
    demos: ["imperative", "colors", "provider", "declarative", "scoped"],
    wc: {
      entry: "confirm",
      tags: ["minerva-confirm-dialog", "minerva-confirm-provider"],
      demos: ["basic", "async", "imperative", "scoped"],
    },
    native: {
      exports: ["ConfirmDialog", "ConfirmProvider"],
      api: ["ConfirmDialogProps", "ConfirmProviderProps"],
      demos: ["basic"],
    },
  },
  {
    id: "drawer",
    cssVars: ["Drawer"],
    category: "overlays",
    exports: [
      "Drawer",
      "DrawerRoot",
      "DrawerTrigger",
      "DrawerClose",
      "DrawerContent",
      "DrawerHeader",
      "DrawerBody",
      "DrawerFooter",
    ],
    api: ["DrawerProps", "DrawerRootProps", "DrawerContentProps"],
    demos: ["basic", "sides", "compound"],
    wc: {
      entry: "drawer",
      tags: ["minerva-drawer"],
      demos: ["basic", "sides", "non-modal"],
    },
    native: {
      exports: [
        "Drawer",
        "DrawerRoot",
        "DrawerTrigger",
        "DrawerClose",
        "DrawerContent",
        "DrawerHeader",
        "DrawerBody",
        "DrawerFooter",
      ],
      api: ["PopupProps"],
      demos: ["basic"],
    },
  },
  {
    id: "command",
    cssVars: ["Command"],
    category: "overlays",
    exports: ["CommandDialog", "normalizeShortcuts", "matchesShortcut"],
    api: ["CommandDialogProps", "CommandItem"],
    demos: ["basic", "shortcut", "custom-filter", "site-search"],
    wc: {
      entry: "command",
      tags: ["minerva-command-dialog"],
      demos: ["basic", "shortcut", "custom-filter"],
    },
    native: {
      exports: ["CommandDialog"],
      api: ["CommandDialogProps"],
      demos: ["basic"],
    },
  },
  {
    id: "popover",
    cssVars: ["Popover"],
    category: "overlays",
    exports: [
      "Popover",
      "PopoverTrigger",
      "PopoverAnchor",
      "PopoverClose",
      "PopoverContent",
    ],
    api: ["PopoverProps", "PopoverContentProps", "PopoverTriggerProps"],
    demos: ["basic", "placement", "controlled"],
    wc: {
      entry: "popover",
      tags: ["minerva-popover"],
      demos: ["basic", "placement", "anchor"],
    },
    native: {
      exports: [
        "Popover",
        "PopoverTrigger",
        "PopoverAnchor",
        "PopoverClose",
        "PopoverContent",
      ],
      api: ["PopoverProps", "PopoverTriggerProps", "PopoverContentProps"],
      demos: ["basic"],
    },
  },

  {
    id: "menu",
    cssVars: ["Menu"],
    category: "overlays",
    exports: ["Menu", "ContextMenu"],
    api: [
      "MenuProps",
      "ContextMenuProps",
      "MenuAction",
      "MenuCheckboxEntry",
      "MenuRadioGroupEntry",
      "MenuRadioItem",
      "MenuSeparatorEntry",
      "MenuGroupEntry",
    ],
    demos: [
      "basic",
      "triggers",
      "groups",
      "submenus",
      "checkbox-radio",
      "placement",
      "disabled",
      "context-menu",
      "controlled",
    ],
    wc: {
      entry: "menu",
      tags: [
        "minerva-context-menu",
        "minerva-menu-item",
        "minerva-menu-checkbox-item",
        "minerva-menu-radio-item",
        "minerva-menu-group",
        "minerva-menu-separator",
        "minerva-menu-label",
        "minerva-menu",
      ],
      demos: ["basic", "checkbox-radio", "items", "context-menu"],
    },
    native: {
      exports: ["Menu", "ContextMenu"],
      api: ["MenuProps", "ContextMenuProps"],
      demos: ["basic"],
    },
  },
  {
    id: "toast",
    cssVars: ["Toast"],
    category: "feedback",
    exports: ["ToastProvider", "toast", "useToast"],
    api: [
      "ToastOptions",
      "ToastAction",
      "ToastProviderProps",
      "ToastApi",
      "ToastPromiseMessages",
    ],
    demos: [
      "basic",
      "colors",
      "options",
      "loading",
      "action",
      "dedupe",
      "scoped",
      "keyboard",
    ],
    native: {
      exports: ["ToastProvider", "toast", "useToast"],
      api: ["ToastOptions", "ToastApi", "ToastProviderProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "toast",
      tags: ["minerva-toast-region"],
      demos: ["basic", "options", "loading"],
    },
  },
  {
    id: "page-tabs",
    cssVars: ["PageTabs"],
    category: "navigation",
    exports: ["PageTabs", "PageTab"],
    api: ["PageTabsProps", "PageTabProps"],
    demos: ["basic", "context-menu", "overflow"],
    wc: {
      entry: "page-tabs",
      tags: ["minerva-page-tabs", "minerva-page-tab"],
      demos: ["basic", "actions", "overflow"],
    },
    native: {
      exports: ["PageTabs", "PageTab"],
      api: ["PageTabsProps", "PageTabProps"],
      demos: ["basic"],
    },
  },

  // Forms
  {
    id: "form-control",
    cssVars: ["FormControl"],
    category: "dataEntry",
    exports: [
      "FormControl",
      "FormLabel",
      "FormHelperText",
      "FormErrorMessage",
      "FormField",
      "useFormControlContext",
      "useFormControlProps",
    ],
    api: ["FormControlProps", "FormLabelProps", "FormFieldProps"],
    demos: ["basic", "form-field", "states", "custom-control"],
    wc: {
      entry: "form-control",
      tags: ["minerva-form-control"],
      demos: ["basic", "states", "slots", "form"],
    },
    native: {
      exports: [
        "FormControl",
        "FormLabel",
        "FormHelperText",
        "FormErrorMessage",
        "FormField",
      ],
      api: ["FormControlProps", "FormFieldProps"],
      demos: ["basic"],
    },
  },
  {
    id: "form-layout",
    cssVars: ["FormLayout"],
    category: "dataEntry",
    exports: ["FormLayout"],
    api: ["FormLayoutProps"],
    demos: ["basic", "gaps"],
    wc: {
      entry: "form-layout",
      tags: ["minerva-form-layout"],
      demos: ["basic", "gaps"],
    },
    native: {
      exports: ["FormLayout"],
      api: ["FormLayoutProps"],
      demos: ["basic"],
    },
  },
  {
    id: "input",
    cssVars: ["Input"],
    native: {
      exports: ["Input"],
      api: ["InputProps"],
      demos: ["basic", "states", "sizes-variants", "clearable-and-count"],
    },
    category: "dataEntry",
    exports: ["Input"],
    api: ["InputProps"],
    demos: [
      "basic",
      "sizes-variants",
      "addons",
      "clearable-and-count",
      "password",
      "states",
      "validation",
    ],
    wc: {
      entry: "input",
      tags: ["minerva-input"],
      demos: ["basic", "sizes-variants", "addons", "form"],
    },
  },
  {
    id: "textarea",
    cssVars: ["Textarea"],
    category: "dataEntry",
    exports: ["Textarea"],
    api: ["TextareaProps"],
    demos: ["basic", "sizes-variants", "form-control"],
    wc: {
      entry: "textarea",
      tags: ["minerva-textarea"],
      demos: ["basic", "sizes-variants", "form"],
    },
    native: { exports: ["Textarea"], api: ["TextareaProps"], demos: ["basic"] },
  },
  {
    id: "number-input",
    cssVars: ["NumberInput"],
    category: "dataEntry",
    exports: ["NumberInput"],
    api: ["NumberInputProps"],
    demos: ["basic", "stepper-precision", "form-control"],
    wc: {
      entry: "number-input",
      tags: ["minerva-number-input"],
      demos: ["basic", "precision", "form"],
    },
    native: {
      exports: ["NumberInput"],
      api: ["NumberInputProps"],
      demos: ["basic"],
    },
  },
  {
    id: "json-field",
    cssVars: ["JsonField"],
    category: "dataEntry",
    exports: ["JsonField"],
    api: ["JsonFieldProps"],
    demos: ["basic", "indent", "form-control"],
    wc: {
      entry: "json-field",
      tags: ["minerva-json-field"],
      demos: ["basic", "options", "form"],
    },
    native: {
      exports: ["JsonField"],
      api: ["JsonFieldProps"],
      demos: ["basic"],
    },
  },
  {
    id: "key-value-editor",
    cssVars: ["KeyValueEditor"],
    category: "dataEntry",
    exports: ["KeyValueEditor"],
    api: ["KeyValueEditorProps", "KeyValueEntry", "KeyValueEntryErrors"],
    demos: ["basic", "errors"],
    wc: {
      entry: "key-value-editor",
      tags: ["minerva-key-value-editor"],
      demos: ["basic", "errors", "form"],
    },
    native: {
      exports: ["KeyValueEditor"],
      api: ["KeyValueEditorProps"],
      demos: ["basic"],
    },
  },
  {
    id: "tag-input",
    cssVars: ["TagInput"],
    category: "dataEntry",
    exports: ["TagInput"],
    api: ["TagInputProps"],
    demos: ["basic", "form-control", "separators"],
    wc: {
      entry: "tag-input",
      tags: ["minerva-tag-input"],
      demos: ["basic", "separators", "states", "form"],
    },
    native: { exports: ["TagInput"], api: ["TagInputProps"], demos: ["basic"] },
  },

  {
    id: "loading-state",
    cssVars: ["LoadingState"],
    category: "feedback",
    exports: ["LoadingState"],
    api: ["LoadingStateProps"],
    demos: ["basic", "sizes"],
    wc: {
      entry: "loading-state",
      tags: ["minerva-loading-state"],
      demos: ["basic", "sizes", "section"],
    },
    native: {
      exports: ["LoadingState"],
      api: ["LoadingProps"],
      demos: ["basic"],
    },
  },
  {
    id: "text-link",
    cssVars: ["TextLink"],
    category: "dataDisplay",
    exports: ["TextLink"],
    api: ["TextLinkProps"],
    demos: ["variants", "as-child"],
    wc: {
      entry: "text-link",
      tags: ["minerva-text-link"],
      demos: ["basic", "variants", "styling"],
    },
    native: { exports: ["TextLink"], api: ["TextLinkProps"], demos: ["basic"] },
  },
  {
    id: "description-list",
    cssVars: ["DescriptionList"],
    category: "dataDisplay",
    exports: ["DescriptionList"],
    api: ["DescriptionListProps", "DescriptionListItem"],
    demos: ["basic", "variants"],
    wc: {
      entry: "description-list",
      tags: ["minerva-description-item", "minerva-description-list"],
      demos: ["basic", "items", "variants", "styling"],
    },
    native: {
      exports: ["DescriptionList"],
      api: ["DescriptionListProps"],
      demos: ["basic"],
    },
  },
  {
    id: "list",
    cssVars: ["List"],
    category: "dataDisplay",
    exports: ["List", "ListItem"],
    api: ["ListProps", "ListItemProps"],
    demos: ["basic", "compact", "bordered"],
    wc: {
      entry: "list",
      tags: ["minerva-list", "minerva-list-item"],
      demos: ["basic", "slots", "density", "bordered"],
    },
    native: {
      exports: ["Cell", "CellGroup", "List", "ListItem"],
      api: ["CellProps", "CellGroupProps", "ListProps", "ListItemProps"],
      demos: ["basic", "inset-groups", "rich-rows"],
    },
  },
  {
    id: "code-block",
    cssVars: ["CodeBlock"],
    category: "dataDisplay",
    exports: ["CodeBlock"],
    api: ["CodeBlockProps"],
    demos: [
      "basic",
      "languages",
      "auto-language",
      "line-numbers",
      "no-wrap",
      "copyable",
      "marks",
    ],
    wc: {
      entry: "code-block",
      tags: ["minerva-code-block"],
      demos: [
        "basic",
        "languages",
        "auto-language",
        "line-numbers",
        "copy",
        "overflow",
        "marks",
      ],
    },
    native: {
      exports: ["CodeBlock"],
      api: ["CodeBlockProps"],
      demos: ["basic", "marks"],
    },
  },
  {
    id: "prose",
    cssVars: ["Prose"],
    category: "dataDisplay",
    exports: ["Prose"],
    api: ["ProseProps"],
    demos: ["basic", "as-child"],
    wc: {
      entry: "prose",
      tags: ["minerva-prose"],
      demos: ["basic", "rich-content", "scopes"],
    },
    native: { exports: ["Prose"], api: ["ProseProps"], demos: ["basic"] },
  },
  {
    id: "design-presets",
    category: "theming",
    api: ["DesignOptions"],
    demos: ["presets", "axes"],
  },
  {
    id: "theme-palette",
    cssVars: ["ThemeToggle"],
    category: "theming",
    exports: [
      "ThemeProvider",
      "useTheme",
      "ThemeToggle",
      "PaletteToggle",
      "palettes",
    ],
    api: [
      "ThemeProviderProps",
      "ThemeContextValue",
      "ThemeToggleProps",
      "PaletteToggleProps",
    ],
    demos: ["toggles", "palette-swatches", "use-theme"],
    wc: {
      entry: "theme-toggle",
      tags: ["minerva-theme-toggle", "minerva-palette-toggle"],
      demos: ["basic", "palette", "events"],
    },
    native: {
      exports: [
        "ThemeToggle",
        "PaletteToggle",
        "PresetToggle",
        "ThemeProvider",
      ],
      api: [
        "ThemeToggleProps",
        "PaletteToggleProps",
        "PresetToggleProps",
        "MinervaProviderProps",
      ],
      demos: ["preset", "toggles"],
    },
  },
  {
    id: "table",
    cssVars: ["Table"],
    category: "dataDisplay",
    exports: [
      "Table",
      "TableRoot",
      "TableHead",
      "TableBody",
      "TableRow",
      "TableHeader",
      "TableCell",
      "TableCellContent",
      "DataTable",
      "computeFixedColumnLayout",
    ],
    api: [
      "TableProps",
      "TableColumn",
      "DataTableProps",
      "TableRootProps",
      "TableScrollConfig",
      "TableSortState",
      "TableRowSelection",
      "TableCellContentProps",
      "FixedColumnLayout",
    ],
    demos: [
      "basic",
      "variants",
      "fixed-columns",
      "states",
      "data-table",
      "compound",
      "cell-content",
      "sorting",
      "selection",
    ],
    wc: {
      entry: "data-table",
      tags: ["minerva-data-table", "minerva-table-cell-content"],
      demos: ["basic", "pagination", "selection", "sorting"],
    },
    native: {
      exports: [
        "Table",
        "TableRoot",
        "TableHead",
        "TableBody",
        "TableRow",
        "TableHeader",
        "TableCell",
        "TableCellContent",
        "DataTable",
      ],
      api: ["TableProps", "TableCellContentProps", "DataTableProps"],
      demos: ["basic"],
    },
  },
  {
    id: "nav-tree",
    cssVars: ["NavTree"],
    category: "navigation",
    exports: ["NavTree"],
    api: ["NavTreeProps", "NavTreeSection", "NavTreeItem", "NavTreeItemState"],
    demos: ["basic", "collapsed", "custom-link"],
    wc: {
      entry: "nav-tree",
      tags: ["minerva-nav-tree"],
      demos: ["basic", "collapsed", "expansion"],
    },
    native: { exports: ["NavTree"], api: ["NavTreeProps"], demos: ["basic"] },
  },
  {
    id: "tabs",
    cssVars: ["Tabs"],
    category: "navigation",
    exports: ["Tabs", "TabList", "Tab", "TabPanel"],
    api: ["TabsProps", "TabListProps", "TabProps", "TabPanelProps"],
    demos: ["basic", "variants", "colors", "vertical"],
    wc: {
      entry: "tabs",
      tags: ["minerva-tabs", "minerva-tab", "minerva-tab-panel"],
      demos: ["basic", "variants", "vertical", "controlled", "panels"],
    },
    native: {
      exports: ["Tabs", "TabList", "Tab", "TabPanel"],
      api: [
        "TabsProps",
        "TabListProps",
        "TabProps",
        "TabPanelProps",
        "TabsItemData",
      ],
      demos: ["basic", "compound", "scrollable", "variants"],
    },
  },
  {
    id: "html-preview",
    cssVars: ["HtmlPreview"],
    category: "dataDisplay",
    exports: ["HtmlPreview"],
    api: ["HtmlPreviewProps"],
    demos: ["basic", "viewports"],
    wc: {
      entry: "html-preview",
      tags: ["minerva-html-preview"],
      demos: ["basic", "viewport", "sanitized"],
    },
    native: {
      exports: ["HtmlPreview"],
      api: ["HtmlPreviewProps"],
      demos: ["basic"],
    },
  },
  {
    id: "monaco-code-editor",
    cssVars: ["MonacoCodeEditor"],
    category: "editors",
    api: ["MonacoCodeEditorProps"],
    demos: ["basic"],
    wc: {
      // optional entry (not in the all-in-one entry nor the CDN bundle)
      entry: "code-editor",
      tags: ["minerva-code-editor"],
      demos: ["basic", "fallback"],
    },
    native: {
      exports: ["CodeEditor"],
      api: ["CodeEditorProps"],
      demos: ["basic"],
    },
  },
  {
    id: "steps",
    cssVars: ["Steps"],
    category: "navigation",
    exports: ["Steps"],
    api: ["StepsProps", "StepsItem"],
    demos: ["basic", "read-only", "styling"],
    wc: {
      entry: "steps",
      tags: ["minerva-steps"],
      demos: ["basic", "navigable", "styling"],
    },
    native: {
      exports: ["Steps"],
      api: ["StepsProps", "StepsItem"],
      demos: ["basic", "vertical"],
    },
  },
  {
    id: "answer-sheet",
    cssVars: ["AnswerSheet"],
    category: "navigation",
    exports: ["AnswerSheet"],
    api: ["AnswerSheetProps", "AnswerSheetItem", "AnswerSheetGroup"],
    demos: ["basic", "groups", "scroll", "sizes"],
    wc: {
      entry: "answer-sheet",
      tags: ["minerva-answer-sheet"],
      demos: ["basic", "groups", "scroll", "sizes"],
    },
    native: {
      exports: ["AnswerSheet"],
      api: ["AnswerSheetProps", "AnswerSheetItem"],
      demos: ["basic"],
    },
  },
  {
    id: "upload",
    cssVars: ["Upload"],
    category: "dataEntry",
    exports: ["Upload"],
    api: ["UploadProps", "UploadItem", "UploadLabels"],
    demos: ["basic", "multiple"],
    wc: {
      entry: "upload",
      tags: ["minerva-upload"],
      demos: ["basic", "transfer", "form"],
    },
    native: { exports: ["Upload"], api: ["UploadProps"], demos: ["basic"] },
  },
  {
    id: "select",
    cssVars: ["Select"],
    category: "dataEntry",
    exports: [
      "Select",
      "SelectItem",
      "SelectGroup",
      "SelectLabel",
      "SelectSeparator",
    ],
    api: [
      "SelectProps",
      "SelectItemProps",
      "SelectGroupProps",
      "SelectLabelProps",
      "SelectSeparatorProps",
    ],
    demos: ["basic", "groups", "sizes-and-states"],
    native: {
      exports: [
        "Select",
        "SelectItem",
        "SelectGroup",
        "SelectLabel",
        "SelectSeparator",
      ],
      api: [
        "SelectSingleProps",
        "SelectMultipleProps",
        "SelectOption",
        "SelectProps",
        "SelectItemProps",
        "SelectGroupProps",
      ],
      demos: ["basic"],
    },
    wc: {
      entry: "select",
      tags: [
        "minerva-option",
        "minerva-option-group",
        "minerva-select-label",
        "minerva-select-separator",
        "minerva-select",
      ],
      demos: ["basic", "groups", "options-property", "form"],
    },
  },
  {
    id: "rating",
    cssVars: ["Rating"],
    category: "dataEntry",
    exports: ["Rating", "RatingScale"],
    api: ["RatingProps", "RatingScaleProps", "RatingDimension"],
    demos: ["basic", "interactive", "scale"],
    wc: {
      entry: "rating",
      tags: ["minerva-rating", "minerva-rating-scale"],
      demos: ["basic", "interactive", "form", "scale"],
    },
    native: {
      exports: ["Rating", "RatingScale"],
      api: ["RatingProps", "RatingScaleProps"],
      demos: ["basic"],
    },
  },
  {
    id: "slider",
    cssVars: ["Slider"],
    category: "dataEntry",
    exports: ["Slider"],
    api: ["SliderProps"],
    demos: ["basic", "range", "marks", "sizes-colors", "committed", "disabled"],
    wc: {
      entry: "slider",
      tags: ["minerva-slider"],
      demos: [
        "basic",
        "range",
        "marks",
        "sizes-colors",
        "committed",
        "disabled",
      ],
    },
    native: {
      exports: ["Slider"],
      api: ["SliderProps"],
      demos: ["basic", "vertical"],
    },
  },
  {
    id: "segmented-control",
    cssVars: ["SegmentedControl"],
    category: "dataEntry",
    exports: ["SegmentedControl"],
    api: ["SegmentedControlProps", "SegmentedControlOptionObject"],
    demos: ["basic", "icons", "sizes", "full-width", "colors"],
    wc: {
      entry: "segmented-control",
      tags: ["minerva-segmented-control"],
      demos: ["basic", "icons", "sizes", "full-width", "colors"],
    },
    native: {
      exports: ["SegmentedControl"],
      api: ["SegmentedControlProps"],
      demos: ["basic"],
    },
  },
  {
    id: "month-calendar",
    cssVars: ["MonthCalendar"],
    category: "dataDisplay",
    exports: ["MonthCalendar"],
    api: ["MonthCalendarProps", "MonthCalendarEvent"],
    demos: ["basic", "sizes", "range"],
    wc: {
      entry: "month-calendar",
      tags: ["minerva-month-calendar"],
      demos: ["basic", "events", "sizes", "range", "localized"],
    },
    native: {
      exports: ["MonthCalendar"],
      api: ["CalendarProps"],
      demos: ["basic"],
    },
  },
  {
    id: "week-strip",
    cssVars: ["WeekStrip"],
    category: "dataDisplay",
    exports: ["WeekStrip"],
    api: ["WeekStripProps"],
    demos: ["basic", "markers", "navigation", "sizes"],
    wc: {
      entry: "week-strip",
      tags: ["minerva-week-strip"],
      demos: ["basic", "markers", "navigation", "sizes"],
    },
    native: {
      exports: ["WeekStrip"],
      api: ["WeekStripProps"],
      demos: ["basic"],
    },
  },
  {
    id: "media-player",
    cssVars: ["MediaPlayer"],
    category: "dataDisplay",
    exports: ["MediaPlayer"],
    api: ["MediaPlayerProps", "MediaPlayerHandle", "MediaPlayerTrack"],
    demos: ["video", "audio", "resume", "rates-skip", "captions"],
    wc: {
      entry: "media-player",
      tags: ["minerva-media-player"],
      demos: ["video", "audio", "resume", "rates-skip", "captions"],
    },
    native: {
      exports: ["MediaControls"],
      api: ["MediaControlsProps"],
      demos: ["basic", "captions"],
    },
  },
  {
    id: "dashboard-columns",
    cssVars: ["DashboardColumns"],
    category: "dataDisplay",
    exports: ["DashboardColumns", "DashboardColumn", "DashboardCard"],
    api: [
      "DashboardColumnsProps",
      "DashboardColumnProps",
      "DashboardCardProps",
    ],
    demos: ["basic", "colors", "empty-actions", "fixed-height", "drag-drop"],
    wc: {
      entry: "dashboard-columns",
      tags: [
        "minerva-dashboard-columns",
        "minerva-dashboard-column",
        "minerva-dashboard-card",
      ],
      demos: ["basic", "colors", "empty-actions", "fixed-height", "drag-drop"],
    },
    native: {
      exports: ["DashboardColumns", "DashboardColumn", "DashboardCard"],
      api: [
        "DashboardColumnsProps",
        "DashboardColumnProps",
        "DashboardCardProps",
      ],
      demos: ["basic", "drag-drop"],
    },
  },
  {
    id: "flashcard",
    cssVars: ["Flashcard"],
    category: "dataDisplay",
    exports: ["Flashcard"],
    api: ["FlashcardProps"],
    demos: ["basic", "controlled", "axis-variants", "reduced-disabled"],
    wc: {
      entry: "flashcard",
      tags: ["minerva-flashcard"],
      demos: ["basic", "controlled", "axis-variants", "reduced-disabled"],
    },
    native: {
      exports: ["Flashcard"],
      api: ["FlashcardProps"],
      demos: ["basic"],
    },
  },

  // Charts (minerva-design/charts: GPU engine + React components)
  {
    id: "charts",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["Chart"],
    api: [
      "ChartProps",
      "ChartCommonProps",
      "ChartHandle",
      "ChartSeries",
      "ChartPointDatum",
      "ChartColumnData",
      "ChartAxisOptions",
      "ChartRectAnnotation",
      "ChartLineAnnotation",
      "ChartTextAnnotation",
      "ChartInteractionOptions",
      "ChartTooltipOptions",
      "ChartLegendOptions",
      "ChartPadding",
      "ChartHoverEvent",
      "ChartHoverItem",
      "ChartPlotClickEvent",
      "ChartView",
    ],
    demos: [
      "gallery",
      "gallery-statistics",
      "gallery-relations",
      "gallery-graphs",
      "gallery-finance",
      "gallery-3d",
      "mixed",
      "dashboard",
      "renderers",
      "annotations",
      "palette",
    ],
    native: {
      exports: ["Chart"],
      api: ["ChartProps", "ChartCommonProps", "ChartHandle"],
      demos: ["mixed"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-chart", "minerva-shape-chart"],
      demos: ["mixed-series", "events"],
    },
  },
  {
    id: "line-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["LineChart"],
    api: ["LineChartProps"],
    demos: [
      "basic",
      "area",
      "curves",
      "stacked",
      "time-series",
      "traffic-events",
      "gaps",
      "thresholds",
      "zoom",
      "large-data",
      "live-sensor",
      "log-scale",
      "measure",
      "index-tooltip",
      "small-multiples",
    ],
    native: {
      exports: ["LineChart"],
      api: ["LineChartProps"],
      demos: ["basic", "area"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-line-chart"],
      demos: ["trend", "reset-zoom"],
    },
  },
  {
    id: "area-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["AreaChart"],
    api: ["AreaChartProps"],
    demos: [
      "basic",
      "stacked",
      "percent",
      "step",
      "energy-mix",
      "cumulative",
      "mirrored",
      "zoom-total",
      "hover-panel",
      "year-over-year",
      "disk-forecast",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-area-chart"],
      demos: ["stacked", "percent"],
    },
    native: {
      exports: ["AreaChart"],
      api: ["AreaChartProps"],
      demos: ["basic"],
    },
  },
  {
    id: "range-area-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["RangeAreaChart"],
    api: ["RangeAreaChartProps"],
    demos: [
      "forecast",
      "temperature",
      "fan",
      "price-range",
      "anomaly-band",
      "bid-ask",
      "climate-scenarios",
      "ab-test",
    ],
    native: {
      exports: ["RangeAreaChart"],
      api: ["RangeAreaChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-range-area-chart"],
      demos: ["forecast", "temperature"],
    },
  },
  {
    id: "bar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BarChart"],
    api: ["BarChartProps"],
    demos: [
      "basic",
      "stacked",
      "labels",
      "percent",
      "combo",
      "grouped",
      "profit-loss",
      "ranking",
      "target",
      "drilldown",
      "period-compare",
      "deployments",
      "ev-charging",
    ],
    native: {
      exports: ["BarChart"],
      api: ["BarChartProps"],
      demos: ["basic", "stacked"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-bar-chart"],
      demos: ["grouped", "stacked"],
    },
  },
  {
    id: "horizontal-bar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["HorizontalBarChart"],
    api: ["HorizontalBarChartProps"],
    demos: [
      "basic",
      "diverging",
      "progress",
      "long-labels",
      "grouped",
      "negative",
      "top-n",
      "race",
      "salary-bands",
      "error-budget",
    ],
    native: {
      exports: ["HorizontalBarChart"],
      api: ["HorizontalBarChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-horizontal-bar-chart"],
      demos: ["ranking", "survey"],
    },
  },
  {
    id: "mixed-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["MixedChart"],
    api: ["MixedChartProps", "ChartProps", "ChartLabels"],
    demos: [
      "revenue-growth",
      "climate",
      "conversion",
      "pareto",
      "log-scale",
      "locale",
      "solar-battery",
      "inventory",
      "ops-overview",
      "burndown",
    ],
    native: {
      exports: ["MixedChart"],
      api: ["MixedChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-mixed-chart"],
      demos: ["revenue-growth", "climate"],
    },
  },
  {
    id: "scatter-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["ScatterChart"],
    api: ["ScatterChartProps"],
    demos: [
      "basic",
      "labels",
      "trend",
      "categories",
      "outliers",
      "large-data",
      "zoom-controls",
      "selection",
      "players",
      "live-stream",
      "log-log",
    ],
    native: {
      exports: ["ScatterChart"],
      api: ["ScatterChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-scatter-chart"],
      demos: ["clusters", "point-click"],
    },
  },
  {
    id: "bubble-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BubbleChart", "bubbleSeries"],
    api: ["BubbleChartProps", "BubbleOptions"],
    demos: [
      "countries",
      "log-scale",
      "portfolio",
      "pipeline",
      "risk-matrix",
      "campaigns",
      "shared-scale",
      "playback",
    ],
    native: {
      exports: ["BubbleChart"],
      api: ["BubbleChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-bubble-chart"],
      demos: ["countries", "portfolio"],
    },
  },
  {
    id: "quadrant-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["QuadrantChart"],
    api: [
      "QuadrantChartProps",
      "QuadrantConfig",
      "QuadrantDropTarget",
      "QuadrantHeaderInfo",
      "QuadrantPoint",
      "QuadrantRegions",
      "QuadrantRegion",
      "QuadrantAxisLabels",
    ],
    demos: [
      "basic",
      "eisenhower",
      "draggable",
      "triage",
      "quadrant-header",
      "bcg",
      "risk",
      "positioning",
      "rice",
      "swot",
      "competitors",
      "talent",
      "live-services",
    ],
    native: {
      exports: ["QuadrantChart"],
      api: ["QuadrantChartProps", "QuadrantConfig", "QuadrantDropTarget"],
      demos: ["basic", "draggable", "triage"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-quadrant-chart"],
      demos: ["priorities", "point-click", "triage"],
    },
  },
  {
    // exported by minerva-design (it renders Modal, Input, Select...), built
    // on the quadrant chart of minerva-design/charts
    id: "quadrant-task-board",
    category: "charts",
    cssVars: ["QuadrantTaskBoard"],
    exports: ["QuadrantTaskBoard"],
    api: ["QuadrantTaskBoardProps", "QuadrantTaskLabels", "QuadrantConfig"],
    demos: ["basic", "custom-labels"],
    wc: {
      entry: "quadrant-task-board",
      tags: ["minerva-quadrant-task-board"],
      demos: ["basic"],
    },
    native: {
      exports: ["QuadrantTaskBoard"],
      api: ["QuadrantTaskBoardProps"],
      demos: ["basic"],
    },
  },
  {
    id: "histogram-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["HistogramChart", "binValues", "histogramSeries", "quantiles"],
    api: ["HistogramChartProps", "BinOptions", "HistogramBins"],
    demos: [
      "latency",
      "binning",
      "ages",
      "comparison",
      "quality-control",
      "order-values",
      "live-samples",
      "commute",
    ],
    native: {
      exports: ["HistogramChart"],
      api: ["HistogramChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-histogram-chart"],
      demos: ["latency", "binning"],
    },
  },
  {
    id: "boxplot-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BoxPlotChart", "boxplotStats", "boxplotData"],
    api: [
      "BoxPlotChartProps",
      "BoxplotGroup",
      "BoxplotStats",
      "BoxplotStatsOptions",
      "ChartTooltipLabels",
    ],
    demos: [
      "services",
      "horizontal",
      "grouped",
      "temperatures",
      "build-times",
      "wait-times",
      "asset-sizes",
      "live-regions",
    ],
    native: {
      exports: ["BoxPlotChart"],
      api: ["BoxPlotChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-box-plot-chart"],
      demos: ["services", "horizontal"],
    },
  },
  {
    id: "waterfall-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["WaterfallChart", "waterfallSeries"],
    api: [
      "WaterfallChartProps",
      "WaterfallStep",
      "WaterfallOptions",
      "ChartConnectorOptions",
    ],
    demos: [
      "pnl",
      "cash-flow",
      "variance",
      "headcount",
      "arr-bridge",
      "price-bridge",
      "emissions",
      "lead-time",
      "live-balance",
      "options",
    ],
    native: {
      exports: ["WaterfallChart"],
      api: ["WaterfallChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-waterfall-chart"],
      demos: ["pnl", "cash-flow"],
    },
  },
  {
    id: "gantt-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["GanttChart", "ganttSeries"],
    api: ["GanttChartProps", "GanttTask", "GanttOptions"],
    demos: [
      "project",
      "dependencies",
      "crews",
      "roadmap",
      "sprint",
      "locale",
      "release-train",
      "critical-path",
      "resources",
      "live-deploy",
      "onboarding",
      "daily",
    ],
    native: {
      exports: ["GanttChart"],
      api: ["GanttChartProps"],
      demos: ["basic", "daily"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-gantt-chart"],
      demos: ["project", "sprint", "daily"],
    },
  },
  {
    id: "heatmap-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["HeatmapChart"],
    api: ["HeatmapChartProps", "HeatmapConfig", "HeatmapCell"],
    demos: [
      "basic",
      "color-scale",
      "activity",
      "correlation",
      "retention",
      "large-grid",
      "conversion",
      "rack-temperatures",
      "confusion-matrix",
      "sales-regions",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-heatmap-chart"],
      demos: ["weekly-activity", "color-scale"],
    },
    native: {
      exports: ["HeatmapChart"],
      api: ["HeatmapChartProps"],
      demos: ["basic"],
    },
  },
  {
    id: "calendar-heatmap",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["CalendarHeatmap"],
    api: ["CalendarHeatmapProps", "CalendarDatum"],
    demos: [
      "contributions",
      "streak",
      "multi-year",
      "months",
      "locale",
      "energy",
      "sleep",
      "incidents",
      "habit-toggle",
    ],
    native: {
      exports: ["CalendarHeatmap"],
      api: ["CalendarHeatmapProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-calendar-heatmap"],
      demos: ["contributions", "months"],
    },
  },
  {
    id: "sparkline",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["Sparkline"],
    api: ["SparklineProps", "SparklineConfig"],
    demos: [
      "basic",
      "kpi-cards",
      "table",
      "watchlist",
      "inline",
      "servers",
      "hover-value",
      "step-goal",
      "weather",
      "periods",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-sparkline"],
      demos: ["kpi", "reference"],
    },
    native: {
      exports: ["Sparkline"],
      api: ["SparklineProps"],
      demos: ["basic"],
    },
  },
  {
    id: "pie-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["PieChart", "DonutChart"],
    api: [
      "PieChartProps",
      "DonutChartProps",
      "ShapeChartCommonProps",
      "ShapeDatum",
      "ShapeHoverEvent",
      "ShapeLegendOptions",
      "ShapeTooltipOptions",
    ],
    demos: [
      "basic",
      "donut",
      "rose",
      "labels",
      "market-share",
      "nested",
      "small-multiples",
      "portfolio",
      "live-poll",
      "drill-down",
      "survey-quarters",
    ],
    native: {
      exports: ["PieChart", "DonutChart"],
      api: [
        "PieChartProps",
        "DonutChartProps",
        "ShapeChartCommonProps",
        "ShapeChartFrameProps",
        "ShapeChartHandle",
      ],
      demos: ["basic", "donut"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-pie-chart", "minerva-donut-chart"],
      demos: ["pie", "donut"],
    },
  },
  {
    id: "radial-bar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["RadialBarChart"],
    api: ["RadialBarChartProps", "RadialBarDatum"],
    demos: [
      "activity",
      "okr",
      "quota",
      "styles",
      "savings-goals",
      "leaderboard",
      "uploads",
      "survey",
    ],
    native: {
      exports: ["RadialBarChart"],
      api: ["RadialBarChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-radial-bar-chart"],
      demos: ["activity", "okr"],
    },
  },
  {
    id: "radar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["RadarChart"],
    api: ["RadarChartProps", "RadarIndicator", "RadarSeries"],
    demos: [
      "basic",
      "compare",
      "circle",
      "players",
      "capabilities",
      "nutrition",
      "live-monitor",
      "review-360",
      "sales-targets",
    ],
    native: {
      exports: ["RadarChart"],
      api: ["RadarChartProps"],
      demos: ["basic", "compare"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-radar-chart"],
      demos: ["compare", "circle"],
    },
  },
  {
    id: "gauge-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["GaugeChart"],
    api: ["GaugeChartProps", "GaugeBand"],
    demos: [
      "basic",
      "bands",
      "live",
      "speedometer",
      "quota",
      "slo",
      "thermostat",
      "credit-score",
      "battery",
      "dark-panel",
    ],
    native: {
      exports: ["GaugeChart"],
      api: ["GaugeChartProps"],
      demos: ["basic", "bands"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-gauge-chart"],
      demos: ["bands", "needle"],
    },
  },
  {
    id: "bullet-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BulletChart"],
    api: ["BulletChartProps", "BulletDatum"],
    demos: [
      "sales",
      "vertical",
      "traffic-lights",
      "monthly",
      "long-names",
      "budget-tracker",
      "live-sensors",
      "training",
      "hiring-plan",
    ],
    native: {
      exports: ["BulletChart"],
      api: ["BulletChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-bullet-chart"],
      demos: ["kpis", "vertical"],
    },
  },
  {
    id: "funnel-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["FunnelChart"],
    api: ["FunnelChartProps"],
    demos: [
      "basic",
      "bars",
      "ecommerce",
      "recruiting",
      "compare",
      "campaigns",
      "what-if",
      "live-sale",
      "sales-pipeline",
    ],
    native: {
      exports: ["FunnelChart"],
      api: ["FunnelChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-funnel-chart"],
      demos: ["conversion", "bars"],
    },
  },
  {
    id: "treemap-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["TreemapChart"],
    api: ["TreemapChartProps", "TreemapNode"],
    demos: [
      "basic",
      "flat",
      "market-map",
      "bundle",
      "drill-down",
      "cloud-costs",
      "live-cluster",
      "metric-switch",
    ],
    native: {
      exports: ["TreemapChart"],
      api: ["TreemapChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-treemap-chart"],
      demos: ["nested", "flat"],
    },
  },
  {
    id: "sunburst-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["SunburstChart"],
    api: ["SunburstChartProps", "TreemapNode", "ShapeDrillEvent"],
    demos: [
      "disk-usage",
      "drill-down",
      "org",
      "labels",
      "city-budget",
      "time-tracking",
      "live-requests",
      "energy-mix",
    ],
    native: {
      exports: ["SunburstChart"],
      api: ["SunburstChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-sunburst-chart"],
      demos: ["disk-usage", "drill-down"],
    },
  },
  {
    id: "sankey-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["SankeyChart"],
    api: ["SankeyChartProps", "SankeyNode", "SankeyLink"],
    demos: [
      "energy",
      "journey",
      "budget",
      "options",
      "income-statement",
      "supply-chain",
      "hiring-funnel",
      "live-traffic",
      "plastic",
    ],
    native: {
      exports: ["SankeyChart"],
      api: ["SankeyChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-sankey-chart"],
      demos: ["energy", "journey"],
    },
  },

  // Finance and trading charts
  {
    id: "candlestick-chart",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["CandlestickChart"],
    api: ["CandlestickChartProps"],
    demos: [
      "basic",
      "bar-styles",
      "moving-average",
      "ma-ribbon",
      "volume",
      "volume-colors",
      "a-share",
      "events",
      "intraday",
      "live",
      "large-data",
      "dark",
      "patterns",
      "watchlist",
      "fx-pips",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-candlestick-chart"],
      demos: ["ohlc", "moving-average"],
    },
    native: {
      exports: ["CandlestickChart"],
      api: ["CandlestickChartProps"],
      demos: ["basic"],
    },
  },
  {
    id: "trading-chart",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["TradingChart"],
    api: [
      "TradingChartProps",
      "TradingChartOptions",
      "TradingChartHandle",
      "TradingBar",
      "TradingBarColumns",
      "TradingPriceLine",
      "TradingMarker",
      "TradingCompareSeries",
      "TradingDrawing",
      "TradingDrawingPoint",
      "TradingChartLabels",
      "TradingCrosshairEvent",
      "TradingClickEvent",
      "TradingOrderMoveEvent",
      "TradingVisibleRange",
      "TradingIndicatorToggleEvent",
      "TradingHistoryRequestEvent",
      "TradingVolumeProfileOptions",
      "TradingOrderCreateEvent",
      "TradingOrderCancelEvent",
      "TradingReplayState",
      "TradingUndoState",
      "TradingSyncOptions",
    ],
    demos: [
      "pro-terminal",
      "streaming",
      "tick-chart",
      "chart-styles",
      "drawing-tools",
      "volume-profile",
      "orders",
      "order-entry",
      "multi-chart",
      "replay",
      "compare",
      "sessions",
      "history",
      "million-bars",
      "export",
      "red-up",
      "dark-terminal",
      "price-alerts",
      "trade-journal",
      "mobile",
    ],
    wc: {
      entry: "trading-chart",
      tags: ["minerva-trading-chart"],
      demos: ["candles", "streaming"],
    },
  },
  {
    id: "technical-indicators",
    category: "financeCharts",
    package: "minerva-design/charts/core",
    exports: [
      "createTradingChart",
      "sma",
      "ema",
      "wma",
      "bollinger",
      "macd",
      "rsi",
      "kdj",
      "atr",
      "vwap",
      "heikinAshi",
      "psar",
      "ichimoku",
      "supertrend",
      "keltner",
      "donchian",
      "obv",
      "cci",
      "stochRsi",
      "dmi",
      "williamsR",
      "mfi",
      "volumeProfile",
      "resampleBars",
      "syncCharts",
    ],
    api: [
      "TradingMovingAverageIndicator",
      "TradingBollingerIndicator",
      "TradingVwapIndicator",
      "TradingVolumeIndicator",
      "TradingMacdIndicator",
      "TradingRsiIndicator",
      "TradingKdjIndicator",
      "TradingAtrIndicator",
      "TradingParabolicSarIndicator",
      "TradingIchimokuIndicator",
      "TradingSupertrendIndicator",
      "TradingKeltnerIndicator",
      "TradingDonchianIndicator",
      "TradingObvIndicator",
      "TradingCciIndicator",
      "TradingStochRsiIndicator",
      "TradingDmiIndicator",
      "TradingWilliamsRIndicator",
      "TradingMfiIndicator",
      "TradingIndicatorBase",
      "TradingPaneIndicatorBase",
      "TradingVolumeProfile",
      "TradingChartInstance",
      "TradingChartEventMap",
    ],
    demos: [
      "moving-averages",
      "bollinger",
      "channels",
      "ichimoku",
      "supertrend",
      "vwap",
      "macd",
      "rsi",
      "oscillators",
      "kdj",
      "dmi",
      "atr",
      "obv",
      "heikin-ashi",
      "signals",
      "vanilla",
      "divergence",
      "multi-timeframe",
      "screener",
    ],
    wc: {
      entry: "trading-chart",
      tags: [],
      demos: ["bollinger", "panes"],
    },
  },
  {
    id: "depth-chart",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["DepthChart"],
    api: [
      "DepthChartProps",
      "DepthChartHandle",
      "DepthChartOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "DepthChartLabels",
      "DepthChartPriceLine",
      "DepthPoint",
      "OrderBookSnapshot",
      "OrderBookDelta",
    ],
    demos: [
      "basic",
      "live",
      "range",
      "walls",
      "dark",
      "compact",
      "red-up",
      "slippage",
      "imbalance",
      "equity",
      "venues",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-depth-chart"],
      demos: ["book", "live"],
    },
  },
  {
    id: "order-book",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["OrderBook"],
    api: [
      "OrderBookProps",
      "OrderBookHandle",
      "OrderBookOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "OrderBookLabels",
      "OrderBookLevelEvent",
      "OrderBookSnapshot",
      "OrderBookDelta",
      "OrderBookLevelColumns",
    ],
    demos: [
      "basic",
      "live",
      "grouping",
      "large-orders",
      "modes",
      "terminal",
      "dark",
      "compact",
      "red-up",
      "markets",
      "wall-watch",
      "order-ticket",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-order-book"],
      demos: ["ladder", "live"],
    },
  },
  {
    id: "order-book-heatmap",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["OrderBookHeatmap"],
    api: [
      "OrderBookHeatmapProps",
      "OrderBookHeatmapHandle",
      "OrderBookHeatmapOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "OrderBookHeatmapLabels",
      "OrderBookHeatmapHoverEvent",
      "MarketTrade",
    ],
    demos: [
      "basic",
      "live",
      "color-scale",
      "large-trades",
      "dark",
      "compact",
      "red-up",
      "price-resolution",
      "time-window",
      "linked",
      "perpetual",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-order-book-heatmap"],
      demos: ["liquidity", "red-up"],
    },
  },
  {
    id: "time-and-sales",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["TimeAndSales"],
    api: [
      "TimeAndSalesProps",
      "TimeAndSalesHandle",
      "TimeAndSalesOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "TimeAndSalesLabels",
      "TimeAndSalesRowEvent",
      "MarketTrade",
      "TimeAndSalesInstance",
    ],
    demos: [
      "basic",
      "live",
      "large-trades",
      "filters",
      "large-data",
      "dark",
      "compact",
      "red-up",
      "pressure",
      "clock",
      "block-alerts",
      "split",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-time-and-sales"],
      demos: ["tape", "large-trades"],
    },
  },

  // 3D charts
  {
    id: "scatter-3d-chart",
    category: "charts3d",
    package: "minerva-design/charts",
    exports: ["Scatter3DChart", "Line3DChart"],
    api: [
      "Scatter3DChartProps",
      "Line3DChartProps",
      "Chart3DCommonProps",
      "Chart3DHandle",
      "Scatter3DSeries",
      "Line3DSeries",
      "Chart3DSeriesBase",
      "Chart3DPoint",
      "Chart3DColumnData",
      "Chart3DAxisOptions",
      "Chart3DCameraOptions",
      "Chart3DCameraState",
      "Chart3DInteractionOptions",
      "Chart3DColorBarOptions",
      "Chart3DHoverEvent",
      "Chart3DLabels",
    ],
    demos: [
      "clusters",
      "galaxy",
      "color-by-value",
      "auto-rotate",
      "camera",
      "trajectory",
      "renderer",
      "embeddings",
      "lidar",
      "satellites",
      "portfolio-risk",
    ],
    wc: {
      entry: "chart-3d",
      tags: ["minerva-scatter-3d-chart", "minerva-line-3d-chart"],
      demos: ["clusters", "trajectory"],
    },
  },
  {
    id: "surface-3d-chart",
    category: "charts3d",
    package: "minerva-design/charts",
    exports: ["Surface3DChart"],
    api: [
      "Surface3DChartProps",
      "Surface3DSeries",
      "Surface3DData",
      "Surface3DWireframeOptions",
      "Surface3DContourOptions",
      "Chart3DLightingOptions",
      "Chart3DCommonProps",
      "Chart3DSeriesBase",
    ],
    demos: [
      "functions",
      "terrain",
      "volatility",
      "wireframe-contours",
      "transparency",
      "live-wave",
      "heat-diffusion",
      "yield-curve",
      "loss-landscape",
      "wifi-signal",
    ],
    wc: {
      entry: "chart-3d",
      tags: ["minerva-surface-3d-chart"],
      demos: ["ripple", "terrain"],
    },
  },
  {
    id: "bar-3d-chart",
    category: "charts3d",
    package: "minerva-design/charts",
    exports: ["Bar3DChart"],
    api: [
      "Bar3DChartProps",
      "Bar3DSeries",
      "Bar3DDatum",
      "Chart3DCommonProps",
      "Chart3DSeriesBase",
      "Chart3DLegendOptions",
      "Chart3DTooltipOptions",
    ],
    demos: [
      "sales",
      "stacked",
      "pyramid",
      "traffic",
      "margin",
      "inventory-live",
      "cohort-retention",
      "budget-variance",
      "datacenter",
    ],
    wc: {
      entry: "chart-3d",
      tags: ["minerva-bar-3d-chart"],
      demos: ["sales", "stacked"],
    },
  },

  // Relationship and hierarchy charts
  // @graph-pages: graph-chart, dependency-graph, tree-chart (engine/graph)
  {
    id: "graph-chart",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["GraphChart"],
    api: [
      "GraphChartProps",
      "GraphCommonProps",
      "GraphChartHandle",
      "GraphNode",
      "GraphEdge",
      "GraphGroup",
      "GraphForceOptions",
      "GraphCircularOptions",
      "GraphInteractionOptions",
      "GraphLegendOptions",
      "GraphTooltipOptions",
      "GraphHoverEvent",
      "GraphChartLabels",
      "GraphChartOptions",
      "GraphChartInstance",
      "GraphChartEventMap",
      "GraphForceLayoutOptions",
      "GraphForceSimulation",
    ],
    demos: [
      "characters",
      "large-network",
      "transitions",
      "circular",
      "arc",
      "vanilla",
      "service-map",
      "knowledge-graph",
      "friend-suggestions",
      "fraud-ring",
    ],
    wc: {
      entry: "graph",
      tags: ["minerva-graph-chart"],
      demos: ["routes", "circular"],
    },
  },
  {
    id: "dependency-graph",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["DependencyGraph"],
    api: [
      "DependencyGraphProps",
      "GraphDagOptions",
      "GraphCriticalPath",
      "GraphDagLayoutOptions",
      "GraphDagLayoutResult",
    ],
    demos: [
      "packages",
      "pipeline",
      "lineage",
      "build-scheduler",
      "project-plan",
      "impact-analysis",
      "course-prerequisites",
      "spreadsheet",
    ],
    wc: {
      entry: "graph",
      tags: ["minerva-dependency-graph"],
      demos: ["pipeline", "modules"],
    },
  },
  {
    id: "tree-chart",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["TreeChart"],
    api: [
      "TreeChartProps",
      "GraphTreeOptions",
      "GraphToggleEvent",
      "GraphTreeLayoutOptions",
      "GraphTreeLayoutResult",
    ],
    demos: [
      "org-chart",
      "mind-map",
      "radial",
      "file-tree",
      "decision-tree",
      "taxonomy-search",
      "disk-usage",
      "wbs",
      "bracket",
    ],
    wc: {
      entry: "graph",
      tags: ["minerva-tree-chart"],
      demos: ["org", "mind-map"],
    },
  },
  // @chord-pages: chord-chart (shape engine)
  {
    id: "chord-chart",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["ChordChart"],
    api: ["ChordChartProps", "ChordGroup", "ChordLink"],
    demos: [
      "basic",
      "migration",
      "dependencies",
      "trade",
      "directed",
      "dark",
      "options",
      "brand-switching",
      "focus",
      "co-purchase",
      "live",
      "legend",
    ],
    native: {
      exports: ["ChordChart"],
      api: ["ChordChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-chord-chart"],
      demos: ["teams", "migration"],
    },
  },

  // Chart engine, performance and the other platforms
  {
    id: "chart-engine",
    category: "chartEngine",
    package: "minerva-design/charts/core",
    exports: [
      "createChart",
      "createCanvasChart",
      "createChartController",
      "scenePrimitives",
      "createShapeChart",
      "createCanvasShapeChart",
      "quadrantChartOptions",
      "quadrantOf",
      "quadrantCenter",
      "quadrantGroups",
      "quadrantLabels",
      "quadrantCountText",
      "quadrantAccessibleGroups",
      "quadrantKeyTarget",
      "createQuadrantPointLayer",
      "createQuadrantPointCard",
      "withQuadrantCard",
      "QUADRANT_CARD_LINGER_MS",
      "QUADRANT_CORNERS",
      "quadrantTaskLabels",
      "newQuadrantTaskDraft",
      "editQuadrantTaskDraft",
      "canSaveQuadrantTask",
      "applyQuadrantTaskDraft",
      "moveQuadrantTask",
      "removeQuadrantTask",
      "selectionAfterRemove",
      "quadrantTaskDeleteText",
      "placeQuadrantTaskPanel",
      "quadrantTaskColor",
      "quadrantTaskIconUri",
      "QUADRANT_TASK_ICONS",
      "heatmapChartOptions",
      "sparklineOptions",
      "formatCompact",
      "binValues",
      "histogramSeries",
      "quantiles",
      "boxplotStats",
      "boxplotData",
      "bubbleSeries",
      "waterfallSeries",
      "ganttSeries",
      "createTradingChart",
      "createDepthChart",
      "createOrderBook",
      "createOrderBookHeatmap",
      "createTimeAndSales",
      "createOrderBookStore",
      "createChart3D",
      "withSeriesType",
      "lineSeries",
      "areaSeries",
      "rangeAreaSeries",
      "barSeries",
      "scatterSeries",
      "candlestickSeries",
      "boxplotSeries",
      "formatDuration",
      "createGraphChart",
      "createForceSimulation",
      "forceLayout",
      "dagLayout",
      "countCrossings",
      "criticalPath",
      "treeLayout",
      "circularLayout",
      "arcLayout",
      "getDefaultChartRenderer",
      "setDefaultChartRenderer",
      "subscribeDefaultChartRenderer",
      "formatValue",
    ],
    api: [
      "ChartOptions",
      "ChartInstance",
      "ChartEventMap",
      "ChartDragEvent",
      "ChartDragEndEvent",
      "ChartRect",
      "CanvasChartConfig",
      "CanvasChartInstance",
      "ChartCanvas",
      "ChartTouch",
      "ChartPointerOptions",
      "ChartThemeInput",
      "ChartControllerConfig",
      "ChartController",
      "ChartPrimitiveOptions",
      "ChartLinePrimitive",
      "ChartAreaPrimitive",
      "ChartBarPrimitive",
      "ChartDotPrimitive",
      "ShapeChartInstance",
      "ShapeChartEventMap",
      "PieChartOptions",
      "RadarChartOptions",
      "GaugeChartOptions",
      "FunnelChartOptions",
      "TreemapChartOptions",
      "ShapeChartCommonOptions",
      "CanvasShapeChartConfig",
      "CanvasShapeChartInstance",
    ],
    demos: ["basic", "streaming", "canvas", "shapes"],
  },
  {
    id: "chart-performance",
    category: "chartEngine",
    package: "minerva-design/charts",
    exports: ["LineChart", "ScatterChart", "CandlestickChart", "Chart"],
    demos: ["line", "scatter", "candles", "heatmap", "streaming", "compare"],
    wc: {
      entry: "chart",
      tags: [],
      demos: ["million", "scatter"],
    },
  },
  {
    id: "chart-renderers",
    category: "chartEngine",
    demos: ["environment", "benchmark", "scaling", "switching", "fallback"],
  },
  { id: "mini-program-charts", category: "chartEngine" },

  // Web Components (guides; every component page has a "Web Components" tab)
  {
    id: "web-components",
    category: "webComponents",
    package: "minerva-design/web-components",
    // Utilities of the package (the elements are documented on their pages)
    exports: [
      "defineElement",
      "emit",
      "MinervaElement",
      "hostStyles",
      "FormAssociatedElement",
      "LocaleController",
      "resolveLanguage",
      "AriaController",
      "HasSlotController",
      "AnchoredPositionController",
      "DismissableLayerController",
      "FocusScopeController",
      "ModalController",
      "RovingFocusController",
      "TypeaheadController",
      "FloatingLayerController",
      "popoverResetStyles",
      // helpers re-exported next to their elements
      "matchesShortcut",
      "normalizeShortcuts",
      "computeFixedColumnLayout",
      "SUBMENU_OPEN_DELAY",
      "LONG_PRESS_DELAY",
      "MinervaContextMenu",
      // imperative confirmation (documented on the Confirm page)
      "confirm",
      "confirmFor",
      "confirmScopeOf",
    ],
    demos: ["react"],
  },
  { id: "wc-plain-html", category: "webComponents" },
  { id: "wc-vue", category: "webComponents" },
  { id: "wc-angular", category: "webComponents" },
  { id: "wc-svelte", category: "webComponents" },
  { id: "wc-forms", category: "webComponents" },
  { id: "wc-theming", category: "webComponents" },
  {
    id: "nav-bar",
    category: "mobile",
    native: {
      exports: ["NavBar"],
      api: ["NavBarProps"],
      demos: ["actions", "basic"],
    },
  },
  {
    id: "tab-bar",
    category: "mobile",
    native: {
      exports: ["TabBar", "TabBarItem"],
      api: ["TabBarProps", "TabBarItemProps"],
      demos: ["badges", "basic"],
    },
  },
  {
    id: "pull-refresh",
    category: "mobile",
    native: {
      exports: ["PullRefresh", "usePullRefresh"],
      api: [
        "PullRefreshProps",
        "UsePullRefreshOptions",
        "UsePullRefreshResult",
      ],
      demos: ["basic", "use-pull-refresh"],
    },
  },
  {
    id: "swipe-cell",
    category: "mobile",
    native: {
      exports: ["SwipeCell"],
      api: ["SwipeCellProps", "SwipeCellAction", "SwipeCellHandle"],
      demos: ["basic", "custom-actions"],
    },
  },
  {
    id: "collapse",
    category: "mobile",
    native: {
      exports: ["Collapse", "CollapseItem"],
      api: ["CollapseProps", "CollapseItemProps"],
      demos: ["accordion", "basic"],
    },
  },
  {
    id: "grid",
    category: "mobile",
    native: {
      exports: ["Grid", "GridItem"],
      api: ["GridProps", "GridItemProps"],
      demos: ["basic", "square-columns"],
    },
  },
  {
    id: "image-preview",
    category: "mobile",
    native: {
      exports: ["ImagePreview"],
      api: ["ImagePreviewProps"],
      demos: ["basic", "controlled"],
    },
  },

  // Icons (minerva-design/icons: custom SVG icons, also drawn by the GPU)
  {
    id: "icons",
    category: "icons",
    package: "minerva-design/icons/core",
    exports: ["icons", "iconCategories", "getIcon", "searchIcons"],
    demos: ["gallery"],
  },
  {
    id: "icon",
    category: "icons",
    package: "minerva-design/icons",
    exports: ["Icon", "createIcon", "DynamicIcon"],
    api: ["IconProps", "DynamicIconProps"],
    demos: [
      "basic",
      "size-color",
      "stroke",
      "accessibility",
      "custom",
      "dynamic",
      "canvas",
    ],
    wc: {
      entry: "icon",
      tags: ["minerva-icon"],
      demos: ["basic", "canvas"],
    },
    native: {
      package: "minerva-design/native/icons",
      exports: ["Icon", "createIcon", "DynamicIcon", "SearchIcon"],
      api: ["IconProps", "DynamicIconProps"],
      demos: ["basic"],
    },
  },
  {
    id: "icon-canvas",
    category: "icons",
    package: "minerva-design/icons",
    exports: ["IconCanvas"],
    api: ["IconCanvasProps", "IconCanvasItem", "IconStyle", "IconCanvasHandle"],
    demos: ["basic", "thousands", "renderers"],
    wc: {
      entry: "icon",
      tags: ["minerva-icon-canvas"],
      demos: ["basic"],
    },
  },
  {
    id: "icons-core",
    category: "icons",
    package: "minerva-design/icons/core",
    exports: [
      "toSvg",
      "toSvgDataUri",
      "toSvgBase64DataUri",
      "iconPathData",
      "drawIcon",
      "defineIcon",
      "createIconCanvas",
      "createIconSurface",
      "setDefaultIconRenderer",
      "getDefaultIconRenderer",
      "subscribeDefaultIconRenderer",
      "ICON_RENDERER_PREFERENCES",
      "ICON_RENDERER_ORDER",
      "iconRendererCandidates",
      "parseIconPath",
      "flattenIconPath",
      "tessellateIcon",
    ],
    api: [
      "IconDefinition",
      "IconSvgOptions",
      "DrawIconOptions",
      "IconCanvasOptions",
      "IconCanvasController",
      "IconSurfaceOptions",
      "IconSurface",
      "IconMeshOptions",
      "IconPolyline",
    ],
    demos: ["svg-string", "canvas2d", "controller", "geometry"],
  },
];

export const getDocPage = (id: string) => docPages.find((p) => p.id === id);

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

### apps/docs/src/docs/pages/chart-performance/showcase/meter.ts

```tsx
import { useEffect, useRef, useState, type RefObject } from "react";

/** Measured over the last half second */
export interface FrameStats {
  /** Frames per second */
  fps: number;
  /** Average time between two frames, in ms */
  frame: number;
  /**
   * Average main-thread time of a frame, in ms: animation callbacks (the
   * chart's draw calls included), style, layout and paint
   */
  work: number;
}

/** Whether the element is on screen (or within `margin` of it) */
export function useInView(
  ref: RefObject<Element | null>,
  margin = "0px",
): boolean {
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(!!entry?.isIntersecting),
      { rootMargin: margin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, margin]);
  return inView;
}

export interface FrameLoopHandlers {
  /** Every animation frame (move the camera here) */
  onFrame?: (time: number) => void;
  /** Main-thread time of each frame, once the frame is painted */
  onWork?: (ms: number) => void;
  /** Every half second */
  onStats?: (stats: FrameStats) => void;
}

/**
 * Runs an animation-frame loop while `running` and measures it. The
 * main-thread time of a frame is read from a message posted during the
 * frame: messages run after the frame's rendering work.
 */
export function useFrameLoop(
  running: boolean,
  handlers: FrameLoopHandlers = {},
): FrameStats | null {
  const [stats, setStats] = useState<FrameStats | null>(null);
  const handlersRef = useRef(handlers);
  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    if (!running) return;
    let id = 0;
    let windowStart = 0;
    let frames = 0;
    let work = 0;
    let works = 0;
    const channel = new MessageChannel();
    channel.port1.onmessage = (event: MessageEvent<number>) => {
      const ms = performance.now() - event.data;
      work += ms;
      works++;
      handlersRef.current.onWork?.(ms);
    };
    const loop = (time: number) => {
      id = requestAnimationFrame(loop);
      channel.port2.postMessage(time);
      if (windowStart) frames++;
      else windowStart = time;
      handlersRef.current.onFrame?.(time);
      const elapsed = time - windowStart;
      if (elapsed >= 500 && frames > 0) {
        const next = {
          fps: (frames * 1000) / elapsed,
          frame: elapsed / frames,
          work: works ? work / works : 0,
        };
        setStats(next);
        handlersRef.current.onStats?.(next);
        windowStart = time;
        frames = 0;
        work = 0;
        works = 0;
      }
    };
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      channel.port1.close();
      channel.port2.close();
    };
  }, [running]);

  return stats;
}

/** Calls `callback` once the next frame has been painted */
export function afterNextPaint(callback: () => void) {
  requestAnimationFrame(() => setTimeout(callback, 0));
}

/** Whether the user asked for reduced motion */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

```

### apps/docs/src/docs/pages/chart-performance/showcase/text.ts

```tsx
import { useTranslation } from "react-i18next";
import type { ChartRendererPreference } from "minerva-design/charts";
import styles from "./showcase.module.scss";

export const RENDERERS: readonly ChartRendererPreference[] = [
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

/** Color of a frame rate */
export const fpsClass = (fps: number) =>
  fps >= 50 ? styles.good : fps >= 25 ? styles.fair : styles.poor;

/** Localized numbers, durations and backend names of the showcases */
export const useShowcaseFormat = () => {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
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
  return {
    count: (value: number) => number.format(Math.round(value)),
    /** 1M, 240K, 100万… */
    compact: (value: number) => compact.format(value),
    ms: (value: number) =>
      t("ms", {
        value:
          value < 100
            ? decimal.format(value)
            : number.format(Math.round(value)),
      }),
    renderer: (kind: ChartRendererPreference) => t(`renderers.${kind}`),
  };
};

```

### apps/docs/src/docs/pages/chart-performance/showcase/showcase.module.scss

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
  justify-content: space-between;
  gap: 8px 16px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-color);
}

.hud {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(92px, 1fr));
  gap: 1px;
  margin: 0;
  border-bottom: 1px solid var(--border-color);
  background: var(--border-color);
}

.stat {
  min-width: 0;
  padding: 8px 10px;
  background: var(--surface-subtle-color);

  dt {
    overflow: hidden;
    font-size: 11px;
    letter-spacing: 0.02em;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
    color: var(--text-muted-color);
  }

  dd {
    margin: 2px 0 0;
    overflow: hidden;
    font-family: var(--font-family-mono);
    font-size: 16px;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-color);
  }
}

.good {
  color: var(--success-color) !important;
}

.fair {
  color: var(--warning-color) !important;
}

.poor {
  color: var(--danger-color) !important;
}

.chart {
  position: relative;
  padding: 8px 8px 0;
}

.loading {
  display: grid;
  place-items: center;
  height: 100%;
}

.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 16px;
  padding: 8px 14px 12px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary-color);

  p {
    margin: 0;
  }
}

.fallback {
  color: var(--warning-color);
}

.hint {
  color: var(--text-muted-color);
}

// ------------------------------------------------------------ comparison

.compareGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1px;
  background: var(--border-color);
}

.panel {
  min-width: 0;
  padding: 10px 12px 8px;
  background: var(--surface-color);
}

.panelActive {
  box-shadow: inset 0 0 0 2px var(--primary-color);
}

.panelNote {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
  min-height: 28px;
  padding-top: 4px;
  font-size: 12px;
  line-height: 1.4;
  color: var(--text-secondary-color);
}

.panelHeader {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 4px 8px;
  margin-bottom: 4px;
  font-size: 13px;

  strong {
    font-size: 14px;
    color: var(--text-color);
  }
}

.result {
  font-family: var(--font-family-mono);
  font-variant-numeric: tabular-nums;
  color: var(--text-secondary-color);
}

.results {
  padding: 12px 14px;
  border-top: 1px solid var(--border-color);
}

.bars {
  display: grid;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 13px;
}

.barsTitle {
  margin: 0 0 8px;
  font-size: 12px;
  color: var(--text-muted-color);
}

.bar {
  display: grid;
  grid-template-columns: minmax(84px, 120px) 1fr minmax(120px, auto);
  align-items: center;
  gap: 10px;
  color: var(--text-secondary-color);
}

.barTrack {
  display: block;
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--surface-muted-color);
  overflow: hidden;
}

.barFill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--primary-color);
  transition: width 0.4s ease;
}

```

## Example: 1,000,000-point scatter

Ten clusters of 100,000 points (blobs, rings, spiral arms), one color each. Every dot is drawn on each frame — one instanced draw call per cluster on the GPU. Hover a dot to see the spatial index at work, click the legend to hide clusters.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chart-performance/demos/scatter.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";
import {
  CLUSTER_COUNT,
  CLUSTER_SIZE,
  loadClusters,
  tour,
  type Clusters,
} from "../showcase/data";
import { Showcase, type ShowcaseChartProps } from "../showcase/Showcase";

const PALETTE = [
  "#4f6bed",
  "#e8590c",
  "#2f9e44",
  "#c2255c",
  "#0c8599",
  "#f59f00",
  "#7048e8",
  "#5c940d",
  "#d6336c",
  "#1971c2",
];

function ClusterChart({
  data,
  chartRef,
  renderer,
  onRendererChange,
}: ShowcaseChartProps<Clusters>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  // one series (one color) per cluster, 100,000 typed-array points each
  const series = useMemo(
    (): ChartSeries[] =>
      data.clusters.map((cluster, index) => ({
        id: `cluster-${index}`,
        name: t("cluster", { index: index + 1 }),
        data: cluster,
        pointSize: 2,
        opacity: 0.55,
      })),
    [data, t],
  );
  return (
    <ScatterChart
      ref={chartRef}
      series={series}
      palette={PALETTE}
      renderer={renderer}
      onRendererChange={onRendererChange}
      legend={{ position: "bottom" }}
      height={420}
      ariaLabel={t("scatterAria")}
    />
  );
}

export default function ScatterDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  return (
    <Showcase
      load={loadClusters}
      chart={ClusterChart}
      count={CLUSTER_COUNT * CLUSTER_SIZE}
      countLabel={t("stats.points")}
      height={420}
      motionLabel={t("tour")}
      hint={t("hintXY")}
      tour={(data, time, base) =>
        // zooms into one cluster after the other, on both axes
        tour({ zoom: 12, period: 10, targets: data.centers, y: true })(
          time,
          base,
        )
      }
    />
  );
}

```

### apps/docs/src/docs/pages/chart-performance/showcase/data.ts

```tsx
// Data sets of the performance showcases: typed-array columns generated once
// (seeded, so every visit draws the same picture) and shared by the demos of
// the page, plus the camera "tours" that zoom in and out of them.
import type { ChartView } from "minerva-design/charts";

export type Range = [number, number];

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

/** Standard normal numbers (Box-Muller, both values of a pair are used) */
export function gaussian(random: () => number) {
  let spare = NaN;
  return () => {
    if (!Number.isNaN(spare)) {
      const value = spare;
      spare = NaN;
      return value;
    }
    const r = Math.sqrt(-2 * Math.log(1 - random()));
    const a = 2 * Math.PI * random();
    spare = r * Math.sin(a);
    return r * Math.cos(a);
  };
}

/**
 * Generates a data set on first use, one frame later so that a loading
 * state paints first; later calls share the result.
 */
const cached = <T>(generate: () => T) => {
  let promise: Promise<T> | null = null;
  return (): Promise<T> => {
    if (!promise) {
      promise = new Promise<T>((resolve) => {
        const run = () => setTimeout(() => resolve(generate()), 0);
        if (typeof requestAnimationFrame === "function")
          requestAnimationFrame(run);
        else run();
      });
    }
    return promise;
  };
};

const BLOCK = 512;

/**
 * Min / max of index ranges over several columns in O(BLOCK + n / BLOCK):
 * used to fit the y axis to the visible x range on every frame.
 */
export function rangeIndex(
  lows: readonly Float64Array[],
  highs: readonly Float64Array[],
) {
  const n = lows[0]?.length ?? 0;
  const blocks = Math.ceil(n / BLOCK);
  const blockMin = new Float64Array(blocks).fill(Infinity);
  const blockMax = new Float64Array(blocks).fill(-Infinity);
  for (const column of lows) {
    for (let i = 0; i < n; i++) {
      const b = (i / BLOCK) | 0;
      if (column[i] < blockMin[b]) blockMin[b] = column[i];
    }
  }
  for (const column of highs) {
    for (let i = 0; i < n; i++) {
      const b = (i / BLOCK) | 0;
      if (column[i] > blockMax[b]) blockMax[b] = column[i];
    }
  }
  return (from: number, to: number): Range | null => {
    let i = Math.max(0, Math.floor(from));
    const end = Math.min(n - 1, Math.ceil(to));
    if (i > end) return null;
    let lo = Infinity;
    let hi = -Infinity;
    const scan = (index: number) => {
      for (const column of lows) if (column[index] < lo) lo = column[index];
      for (const column of highs) if (column[index] > hi) hi = column[index];
    };
    for (; i <= end && i % BLOCK; i++) scan(i);
    for (; i + BLOCK - 1 <= end; i += BLOCK) {
      const b = i / BLOCK;
      if (blockMin[b] < lo) lo = blockMin[b];
      if (blockMax[b] > hi) hi = blockMax[b];
    }
    for (; i <= end; i++) scan(i);
    return lo <= hi ? [lo, hi] : null;
  };
}

/** Evenly sampled columns: the y range of the samples inside an x range */
export interface Sampled {
  start: number;
  step: number;
  range: (from: number, to: number) => Range | null;
}

/** The y range to show for an x range, with some padding */
export const fitY = (data: Sampled, x: Range): Range | null => {
  const r = data.range(
    (x[0] - data.start) / data.step - 1,
    (x[1] - data.start) / data.step + 1,
  );
  if (!r) return null;
  const pad = (r[1] - r[0]) * 0.08 || 1;
  return [r[0] - pad, r[1] + pad];
};

export interface TourOptions {
  /** Deepest magnification */
  zoom: number;
  /** Seconds of one zoom in / zoom out cycle */
  period?: number;
  /** Data positions to zoom into, one per cycle */
  targets: readonly (readonly [number, number])[];
  /** Zooms the y axis too (scatter, heatmap) */
  y?: boolean;
}

/**
 * A camera path for `setView`: zooms from the whole data set into a target,
 * drifts a little there and zooms out again, then moves to the next target.
 */
export const tour =
  ({ zoom, period = 12, targets, y = false }: TourOptions) =>
  (time: number, base: ChartView): Partial<ChartView> => {
    const cycle = Math.floor(time / period);
    const phase = (time % period) / period;
    const p = (1 - Math.cos(2 * Math.PI * phase)) / 2;
    const target = targets[cycle % targets.length] ?? [NaN, NaN];
    const scale = Math.pow(1 / zoom, p);
    const axis = (range: Range, to: number, drift: number): Range => {
      const full = range[1] - range[0];
      const width = full * scale;
      const mid = (range[0] + range[1]) / 2;
      const goal = Number.isFinite(to) ? to : mid;
      const center = mid + (goal - mid) * p + width * 0.25 * drift * p;
      const start = Math.min(
        Math.max(center - width / 2, range[0]),
        range[1] - width,
      );
      return [start, start + width];
    };
    const x = axis(base.x, target[0], Math.sin(time * 0.7));
    return y ? { x, y: axis(base.y, target[1], Math.cos(time * 0.6)) } : { x };
  };

// ------------------------------------------------------------------ line

export const SIGNAL_SERIES = 4;
export const SIGNAL_LENGTH = 250_000;
const SIGNAL_START = Date.UTC(2026, 0, 1);
const SIGNAL_STEP = 1000;

export interface Signals extends Sampled {
  /** Timestamps, one per second */
  x: Float64Array;
  /** One column per sensor */
  y: Float64Array[];
}

/** 4 sensors × 250,000 samples: daily cycles, drift and noise */
export const loadSignals = cached((): Signals => {
  const normal = gaussian(mulberry32(2026));
  const x = new Float64Array(SIGNAL_LENGTH);
  for (let i = 0; i < SIGNAL_LENGTH; i++) x[i] = SIGNAL_START + i * SIGNAL_STEP;
  const y: Float64Array[] = [];
  for (let s = 0; s < SIGNAL_SERIES; s++) {
    const column = new Float64Array(SIGNAL_LENGTH);
    const level = 18 + s * 14;
    const swing = 3 + s * 1.5;
    let drift = 0;
    for (let i = 0; i < SIGNAL_LENGTH; i++) {
      drift = drift * 0.9995 + normal() * 0.06;
      const day = Math.sin((2 * Math.PI * i) / 86_400 + s * 1.3);
      const fast = Math.sin((2 * Math.PI * i) / (600 + s * 170));
      column[i] = level + day * swing + fast * 0.6 + drift + normal() * 0.25;
    }
    y.push(column);
  }
  return {
    x,
    y,
    start: SIGNAL_START,
    step: SIGNAL_STEP,
    range: rangeIndex(y, y),
  };
});

/** Moments of the signals worth zooming into */
export const SIGNAL_TARGETS: readonly (readonly [number, number])[] = [
  0.22, 0.68, 0.41, 0.87,
].map((f) => [SIGNAL_START + f * SIGNAL_LENGTH * SIGNAL_STEP, NaN] as const);

// --------------------------------------------------------------- scatter

export const CLUSTER_COUNT = 10;
export const CLUSTER_SIZE = 100_000;

export interface Clusters {
  clusters: { x: Float64Array; y: Float64Array }[];
  /** Centers of the clusters (tour targets) */
  centers: (readonly [number, number])[];
}

/** 10 clusters × 100,000 points: blobs, rings and spiral arms */
export const loadClusters = cached((): Clusters => {
  const random = mulberry32(42);
  const normal = gaussian(random);
  const clusters: Clusters["clusters"] = [];
  const centers: Clusters["centers"] = [];
  for (let c = 0; c < CLUSTER_COUNT; c++) {
    const angle = (2 * Math.PI * c) / CLUSTER_COUNT + random() * 0.4;
    const radius = c % 3 === 0 ? 14 : 34;
    const cx = 50 + Math.cos(angle) * radius;
    const cy = 50 + Math.sin(angle) * radius;
    const sx = 2 + random() * 4;
    const sy = 1.5 + random() * 3;
    const rotation = random() * Math.PI;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const x = new Float64Array(CLUSTER_SIZE);
    const y = new Float64Array(CLUSTER_SIZE);
    for (let i = 0; i < CLUSTER_SIZE; i++) {
      let u: number;
      let v: number;
      if (c % 3 === 1) {
        // ring
        const a = random() * 2 * Math.PI;
        const r = 5 + normal() * 0.6;
        u = Math.cos(a) * r;
        v = Math.sin(a) * r;
      } else if (c % 3 === 2) {
        // spiral arm
        const t = random() * 3 * Math.PI;
        u = Math.cos(t) * t * 0.9 + normal() * 0.35;
        v = Math.sin(t) * t * 0.9 + normal() * 0.35;
      } else {
        u = normal() * sx;
        v = normal() * sy;
      }
      x[i] = cx + u * cos - v * sin;
      y[i] = cy + u * sin + v * cos;
    }
    clusters.push({ x, y });
    centers.push([cx, cy]);
  }
  return { clusters, centers };
});

// --------------------------------------------------------------- candles

export const CANDLE_COUNT = 200_000;
const CANDLE_START = Date.UTC(2026, 0, 5);
const CANDLE_STEP = 60_000;

export interface Candles extends Sampled {
  x: Float64Array;
  open: Float64Array;
  high: Float64Array;
  low: Float64Array;
  close: Float64Array;
}

/** 200,000 one-minute candles: a random walk with changing volatility */
export const loadCandles = cached((): Candles => {
  const random = mulberry32(7);
  const normal = gaussian(random);
  const x = new Float64Array(CANDLE_COUNT);
  const open = new Float64Array(CANDLE_COUNT);
  const high = new Float64Array(CANDLE_COUNT);
  const low = new Float64Array(CANDLE_COUNT);
  const close = new Float64Array(CANDLE_COUNT);
  let price = 120;
  for (let i = 0; i < CANDLE_COUNT; i++) {
    const sigma = 0.0012 * (1 + 0.7 * Math.sin(i / 9000) ** 2);
    const o = price;
    const c = o * Math.exp(normal() * sigma + 0.000002);
    x[i] = CANDLE_START + i * CANDLE_STEP;
    open[i] = o;
    close[i] = c;
    high[i] = Math.max(o, c) * (1 + Math.abs(normal()) * sigma * 0.7);
    low[i] = Math.min(o, c) * (1 - Math.abs(normal()) * sigma * 0.7);
    price = c;
  }
  return {
    x,
    open,
    high,
    low,
    close,
    start: CANDLE_START,
    step: CANDLE_STEP,
    range: rangeIndex([low], [high]),
  };
});

export const CANDLE_TARGETS: readonly (readonly [number, number])[] = [
  0.31, 0.74, 0.12, 0.55,
].map((f) => [CANDLE_START + f * CANDLE_COUNT * CANDLE_STEP, NaN] as const);

// --------------------------------------------------------------- heatmap

export const SPECTRUM_STEPS = 1000;
export const SPECTRUM_BINS = 1000;
/** Seconds per time step */
const DT = 0.02;
/** Hz per frequency bin */
const DF = 8;

export interface Spectrogram {
  /** Time of each cell (sorted: the cells go column by column) */
  x: Float64Array;
  /** Frequency of each cell */
  y: Float64Array;
  /** Level in dB */
  value: Float64Array;
}

/**
 * 1,000 time steps × 1,000 frequency bins: a chirp and its harmonics, a
 * warbling tone, periodic clicks and a pink noise floor
 */
export const loadSpectrogram = cached((): Spectrogram => {
  const normal = gaussian(mulberry32(1000));
  const n = SPECTRUM_STEPS * SPECTRUM_BINS;
  const x = new Float64Array(n);
  const y = new Float64Array(n);
  const value = new Float64Array(n);
  const duration = SPECTRUM_STEPS * DT;
  const tones: [number, number, number][] = [];
  for (let step = 0; step < SPECTRUM_STEPS; step++) {
    const t = step * DT;
    const chirp = 400 + 1500 * (t / duration) + 250 * Math.sin(t * 0.9);
    tones.length = 0;
    for (let h = 1; h <= 4; h++) tones.push([chirp * h, 40 * h, 1 / h ** 1.6]);
    tones.push([5200 + 700 * Math.sin((2 * Math.PI * t) / 4), 60, 0.35]);
    const click = Math.exp(-(((t % 2.5) - 1.2) ** 2) / 0.002) * 0.08;
    for (let bin = 0; bin < SPECTRUM_BINS; bin++) {
      const f = bin * DF;
      let power = 1e-7 / (1 + f / 300) + click / (1 + f / 4000);
      for (const [fc, width, amp] of tones) {
        const d = (f - fc) / width;
        if (d > -5 && d < 5) power += amp * Math.exp(-d * d);
      }
      const i = step * SPECTRUM_BINS + bin;
      x[i] = t;
      y[i] = f;
      value[i] = 10 * Math.log10(power) + normal() * 1.5;
    }
  }
  return { x, y, value };
});

export const SPECTRUM_TARGETS: readonly (readonly [number, number])[] = [
  [6, 1200],
  [3, 5200],
  [12.2, 2500],
  [17, 3900],
];

```

### apps/docs/src/docs/pages/chart-performance/showcase/Showcase.tsx

```tsx
import {
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type RefObject,
} from "react";
import { useTranslation } from "react-i18next";
import { LoadingState, Radio, RadioGroup, Switch } from "minerva-design";
import type {
  ChartHandle,
  ChartRendererKind,
  ChartRendererPreference,
  ChartView,
} from "minerva-design/charts";
import { ChartRendererContext } from "../../../renderer/context";
import {
  autoPick,
  probeBackends,
  type BackendsSupport,
} from "../../../renderer/support";
import type { Range } from "./data";
import {
  afterNextPaint,
  prefersReducedMotion,
  useFrameLoop,
  useInView,
} from "./meter";
import { RENDERERS, fpsClass, useShowcaseFormat } from "./text";
import styles from "./showcase.module.scss";

/** Stops the tour when a frame takes longer than this (ms of main thread) */
const SLOW_FRAME = 250;

/** Props a showcase gives to its chart component */
export interface ShowcaseChartProps<T> {
  /** The generated data set */
  data: T;
  /** Chart handle (the camera tour moves the view through it) */
  chartRef: RefObject<ChartHandle | null>;
  /** Backend picked in the selector */
  renderer: ChartRendererPreference;
  /** Reports the backend that actually started */
  onRendererChange: (kind: ChartRendererKind) => void;
  /** Fits the y axis to the zoomed x range */
  onZoom: (view: ChartView) => void;
  /** On screen and not paused (streaming demos run while true) */
  running: boolean;
}

export interface ShowcaseProps<T> {
  /** Loads the data set (generated once, when the showcase nears the screen) */
  load: () => Promise<T>;
  /** Draws the data set */
  chart: ComponentType<ShowcaseChartProps<T>>;
  /** Number of marks drawn */
  count: number;
  /** What `count` counts ("Points", "Cells", ...) */
  countLabel: string;
  /** Height of the chart in px */
  height: number;
  /** Label of the motion switch (camera tour, stream) */
  motionLabel: string;
  /** Interaction hint under the chart */
  hint: string;
  /** Camera path: the view at `time` seconds into the tour */
  tour?: (data: T, time: number, base: ChartView) => Partial<ChartView>;
  /** The y range to show for an x range (zoomable x only) */
  fit?: (data: T, x: Range) => Range | null;
  /** One more statistic */
  extra?: { label: string; value: string };
}

/**
 * A chart under test: renderer selector, live statistics (frame rate,
 * frame time, main-thread time, marks, time to first frame), a camera tour
 * and the backend that actually started. The data is generated when the
 * showcase nears the screen; the loop only runs while it is visible.
 */
export function Showcase<T>({
  load,
  chart: Plot,
  count,
  countLabel,
  height,
  motionLabel,
  hint,
  tour,
  fit,
  extra,
}: ShowcaseProps<T>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  const text = useShowcaseFormat();
  const rootRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartHandle>(null);
  const near = useInView(rootRef, "300px");
  const visible = useInView(rootRef);
  const [data, setData] = useState<{ value: T } | null>(null);
  const [renderer, setRenderer] = useState<ChartRendererPreference>("auto");
  const [actual, setActual] = useState<ChartRendererKind | null>(null);
  const [motion, setMotion] = useState(() => !prefersReducedMotion());
  const [slow, setSlow] = useState<number | null>(null);
  const [startup, setStartup] = useState<number | null>(null);
  /** When the data was handed to the chart or the backend was switched */
  const startRef = useRef(0);
  const tourRef = useRef<{ start: number; base: ChartView } | null>(null);
  /** Consecutive slow frames of the tour */
  const slowFramesRef = useRef(0);
  // the renderer of the page bar: what "auto" means here
  const page = useContext(ChartRendererContext) ?? "auto";
  const [support, setSupport] = useState<BackendsSupport | null>(null);

  useEffect(() => {
    let cancelled = false;
    void probeBackends().then((result) => {
      if (!cancelled) setSupport(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // A GPU backend forced for the whole page may run on a software GPU here,
  // which takes seconds per frame with these data sets: "auto" then uses
  // the best hardware backend instead (picking it in this demo still forces it)
  const pageSoftware = page !== "auto" && support?.[page] === "software";
  const probing = page !== "auto" && page !== "canvas2d" && !support;
  const chartRenderer: ChartRendererPreference =
    renderer === "auto" && pageSoftware && support
      ? autoPick(support)
      : renderer;
  const requested = renderer === "auto" ? page : renderer;

  useEffect(() => {
    if (!near || data) return;
    let cancelled = false;
    void load().then((value) => {
      if (cancelled) return;
      startRef.current = performance.now();
      setData({ value });
    });
    return () => {
      cancelled = true;
    };
  }, [near, data, load]);

  // the tour stops as soon as the user zooms, pans or uses the keyboard
  useEffect(() => {
    const plot = plotRef.current;
    if (!plot) return;
    const stop = () => setMotion(false);
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) stop();
    };
    const onKey = (event: KeyboardEvent) => {
      if (/^(Arrow|\+|-|=|0|Home|End)/.test(event.key)) stop();
    };
    plot.addEventListener("pointerdown", stop);
    plot.addEventListener("wheel", onWheel, { passive: true });
    plot.addEventListener("keydown", onKey);
    return () => {
      plot.removeEventListener("pointerdown", stop);
      plot.removeEventListener("wheel", onWheel);
      plot.removeEventListener("keydown", onKey);
    };
  }, []);

  const animating = motion && slow === null;
  const running = visible && !!data;

  const stats = useFrameLoop(running, {
    onFrame: (time) => {
      const instance = chartRef.current?.getInstance();
      // starts once the first frame (the costly one: buffers) is painted
      if (!tour || !animating || !data || startup === null || !instance) {
        tourRef.current = null;
        return;
      }
      let state = tourRef.current;
      if (!state) {
        instance.resetZoom();
        state = { start: time, base: instance.getView() };
        tourRef.current = state;
        slowFramesRef.current = 0;
      }
      const view = tour(data.value, (time - state.start) / 1000, state.base);
      if (fit && view.x && !view.y) {
        const y = fit(data.value, view.x);
        if (y) view.y = y;
      }
      instance.setView(view);
    },
    onWork: (ms) => {
      if (!tourRef.current) return;
      // two slow frames in a row (or a very slow one): this backend cannot
      // animate the data set here
      slowFramesRef.current = ms > SLOW_FRAME ? slowFramesRef.current + 1 : 0;
      if (slowFramesRef.current >= 2 || ms > SLOW_FRAME * 4) {
        tourRef.current = null;
        setSlow(ms);
      }
    },
  });

  const onRendererChange = (kind: ChartRendererKind) => {
    setActual(kind);
    afterNextPaint(() => setStartup(performance.now() - startRef.current));
  };
  const onZoom = (view: ChartView) => {
    if (!fit || !data) return;
    const y = fit(data.value, view.x);
    if (y) chartRef.current?.setView({ y });
  };

  let status: ReactNode = t("status.starting");
  if (slow !== null) {
    status = (
      <span className={styles.fallback}>
        {t("status.slow", { ms: text.ms(slow) })}
      </span>
    );
  } else if (actual && renderer === "auto" && pageSoftware) {
    status = (
      <span className={styles.fallback}>
        {t("status.pageSoftware", {
          requested: text.renderer(page),
          backend: text.renderer(actual),
        })}
      </span>
    );
  } else if (actual && requested === "auto") {
    status =
      actual === "canvas2d"
        ? t("status.autoCanvas", { backend: text.renderer(actual) })
        : t("status.auto", { backend: text.renderer(actual) });
  } else if (actual && actual === requested) {
    status =
      renderer === "auto"
        ? t("status.page", { backend: text.renderer(actual) })
        : t("status.forced", { backend: text.renderer(actual) });
  } else if (actual) {
    status = (
      <span className={styles.fallback}>
        {t("status.fallback", {
          requested: text.renderer(requested),
          backend: text.renderer(actual),
        })}
      </span>
    );
  }

  return (
    <div ref={rootRef} className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("renderer")}
          direction="horizontal"
          size="small"
          value={renderer}
          onChange={(value) => {
            startRef.current = performance.now();
            setRenderer(value as ChartRendererPreference);
            setActual(null);
            setStartup(null);
            setSlow(null);
          }}
        >
          {RENDERERS.map((kind) => (
            <Radio
              key={kind}
              value={kind}
              label={
                kind === "auto" && page !== "auto"
                  ? t("renderers.page", { backend: text.renderer(page) })
                  : text.renderer(kind)
              }
            />
          ))}
        </RadioGroup>
        <Switch
          size="small"
          checked={motion}
          label={motionLabel}
          onChange={(checked) => {
            setMotion(checked);
            setSlow(null);
          }}
        />
      </div>

      <dl className={styles.hud}>
        <div className={styles.stat}>
          <dt>{t("stats.renderer")}</dt>
          <dd>{actual ? text.renderer(actual) : "…"}</dd>
        </div>
        <div className={styles.stat}>
          <dt>{t("stats.fps")}</dt>
          <dd className={stats ? fpsClass(stats.fps) : undefined}>
            {stats ? text.count(stats.fps) : "–"}
          </dd>
        </div>
        <div className={styles.stat}>
          <dt>{t("stats.frame")}</dt>
          <dd>{stats ? text.ms(stats.frame) : "–"}</dd>
        </div>
        <div className={styles.stat}>
          <dt>{t("stats.work")}</dt>
          <dd>{stats ? text.ms(stats.work) : "–"}</dd>
        </div>
        <div className={styles.stat}>
          <dt>{countLabel}</dt>
          <dd title={text.count(count)}>{text.compact(count)}</dd>
        </div>
        {extra && (
          <div className={styles.stat}>
            <dt>{extra.label}</dt>
            <dd>{extra.value}</dd>
          </div>
        )}
        <div className={styles.stat}>
          <dt>{t("stats.startup")}</dt>
          <dd>{startup !== null ? text.ms(startup) : "–"}</dd>
        </div>
      </dl>

      <div ref={plotRef} className={styles.chart}>
        {data && !probing ? (
          <Plot
            data={data.value}
            chartRef={chartRef}
            renderer={chartRenderer}
            onRendererChange={onRendererChange}
            onZoom={onZoom}
            running={running && motion}
          />
        ) : (
          <LoadingState
            className={styles.loading}
            style={{ height }}
            size="small"
            label={t("loading", { value: text.count(count) })}
          />
        )}
      </div>

      <div className={styles.footer}>
        <p role="status">{status}</p>
        <p className={styles.hint}>{hint}</p>
      </div>
    </div>
  );
}

```

### apps/docs/src/docs/renderer/context.ts

```tsx
// Kept free of engine imports: DemoBlock (on every page) reads the context,
// the engine is only loaded by the lazy RendererScope of chart pages.
import { createContext } from "react";
import type { ChartRendererPreference } from "minerva-design/charts/core";
import type { DocCategory } from "../registry";

/** Categories whose pages get the renderer bar and the per-demo badges */
export const RENDERER_CATEGORIES: readonly DocCategory[] = [
  "charts",
  "financeCharts",
  "charts3d",
  "graphCharts",
  "chartEngine",
  "icons",
];

/**
 * What the bar of a page switches: the charts, or the canvas icons (icon
 * pages; the same stored choice drives both, see store.ts)
 */
export type RendererTopic = "charts" | "icons";

export const RendererTopicContext = createContext<RendererTopic>("charts");

/**
 * The page-wide chart renderer (null outside chart pages), shown by the demo
 * badges. The charts follow it by themselves through the engine's default.
 */
export const ChartRendererContext =
  createContext<ChartRendererPreference | null>(null);

```

### apps/docs/src/docs/registry.ts

```tsx
/**
 * Single source of truth for the documentation site.
 *
 * Plain data only (no React / JSX) so tests can import it in Node:
 * - the router builds one lazily-loaded route per page from this list
 * - the sidebar groups pages by `category`
 * - `src/docs/docs.test.ts` checks that every public export of the libraries
 *   is documented, that every `api` entry exists in `api.generated.json`,
 *   that every demo file exists and that all locales contain the page strings.
 *
 * Page content lives in `src/docs/pages/<id>/index.tsx` (+ `demos/<demo>.tsx`)
 * and its strings in `src/i18n/locales/<lng>/docs/<id>.json`.
 */

export type DocCategory =
  | "gettingStarted"
  | "theming"
  | "configuration"
  | "general"
  | "layout"
  | "dataEntry"
  | "dataDisplay"
  | "feedback"
  | "navigation"
  | "overlays"
  | "editors"
  | "charts"
  | "financeCharts"
  | "charts3d"
  | "graphCharts"
  | "chartEngine"
  | "icons"
  | "mobile"
  | "webComponents";

export interface DocPageMeta {
  /** Route path and folder name under src/docs/pages */
  id: string;
  category: DocCategory;
  /** Runtime exports of the package documented on this page */
  exports?: string[];
  /** Package the exports come from */
  package?:
    | "minerva-design"
    | "minerva-design/web-components"
    | "minerva-design/charts"
    | "minerva-design/charts/core"
    | "minerva-design/icons"
    | "minerva-design/icons/core";
  /** Interfaces from api.generated.json rendered as API tables */
  api?: string[];
  /** Demo ids, in display order; each maps to `pages/<id>/demos/<demo>.tsx` */
  demos?: string[];
  /**
   * Component folders of minerva-design whose CSS custom properties
   * (`// @css-var` comments in their SCSS) are listed in a "CSS variables"
   * section
   */
  cssVars?: string[];
  /**
   * Web Component counterpart shown in the page's "Web Components" tab:
   * the define entry (`minerva-design/web-components/<entry>`), the custom
   * elements documented on the page (API tables from custom-elements.json)
   * and the demo ids (`pages/<id>/wc/<demo>.html` + optional `<demo>.ts`)
   */
  wc?: WcMeta;
  /**
   * React Native counterpart shown in the page's "React Native" tab
   * (minerva-design/native): exports, API interfaces of
   * api.native.generated.json (without the `native:` prefix) and demo ids
   * (`pages/<id>/native/<demo>.tsx`, rendered through react-native-web in a
   * phone frame). A page with `native` only (no `exports`) is a mobile
   * component: the React Native content is the whole page.
   */
  native?: NativeMeta;
}

export interface NativeMeta {
  /** Exports of minerva-design/native documented on the page */
  exports: string[];
  /** Entry the exports come from @default "minerva-design/native" */
  package?: string;
  /** Interfaces rendered as API tables (`ButtonProps` = `native:ButtonProps`) */
  api: string[];
  /** Demo ids, in display order */
  demos: string[];
}

export interface WcMeta {
  /** Define entry: `minerva-design/web-components/<entry>` */
  entry: string;
  /** Tag names documented on the page, in display order */
  tags: string[];
  /** Demo ids, in display order */
  demos: string[];
}

export const categories: DocCategory[] = [
  "gettingStarted",
  "theming",
  "configuration",
  "webComponents",
  "general",
  "layout",
  "dataEntry",
  "dataDisplay",
  "feedback",
  "overlays",
  "navigation",
  "editors",
  "mobile",
  "charts",
  "financeCharts",
  "charts3d",
  "graphCharts",
  "chartEngine",
  "icons",
];

/** Top-level parts of the site, each with its own sidebar */
export type DocSection = "docs" | "components" | "charts" | "icons";

export interface DocSectionMeta {
  id: DocSection;
  /** Page the top navigation link opens */
  home: string;
  categories: readonly DocCategory[];
}

export const sections: readonly DocSectionMeta[] = [
  {
    id: "docs",
    home: "overview",
    categories: ["gettingStarted", "theming", "configuration", "webComponents"],
  },
  {
    id: "components",
    home: "button",
    categories: [
      "general",
      "layout",
      "dataEntry",
      "dataDisplay",
      "feedback",
      "overlays",
      "navigation",
      "editors",
      "mobile",
    ],
  },
  {
    id: "charts",
    home: "charts",
    categories: [
      "charts",
      "financeCharts",
      "charts3d",
      "graphCharts",
      "chartEngine",
    ],
  },
  {
    id: "icons",
    home: "icons",
    categories: ["icons"],
  },
];

/** Section of a category (every category belongs to exactly one) */
export const sectionOf = (category: DocCategory): DocSection =>
  sections.find((section) => section.categories.includes(category))?.id ??
  "docs";

export const docPages: DocPageMeta[] = [
  // Getting started
  { id: "overview", category: "gettingStarted" },
  { id: "installation", category: "gettingStarted" },
  { id: "introduction", category: "gettingStarted" },
  { id: "architecture", category: "gettingStarted" },
  { id: "platform-support", category: "gettingStarted" },
  { id: "rsc-guide", category: "gettingStarted" },
  { id: "vue", category: "gettingStarted" },
  { id: "angular", category: "gettingStarted" },
  { id: "react-native", category: "gettingStarted" },
  { id: "theming", category: "gettingStarted", demos: ["scoped-theme"] },
  {
    id: "styling",
    category: "gettingStarted",
    demos: [
      "restyle-button",
      "restyle-modal",
      "restyle-tabs",
      "restyle-table",
      "items-menu",
      "items-select",
      "items-pagination",
      "items-table",
      "items-toast",
    ],
  },
  { id: "changelog", category: "gettingStarted" },

  // Configuration: ConfigProvider, hooks and theme utilities
  {
    id: "config-provider",
    category: "configuration",
    exports: ["ConfigProvider", "useConfig", "ConfigContext"],
    api: ["ConfigContextProviderProps", "ConfigContextProps", "Locale"],
    demos: ["use-config", "custom-theme", "locale", "palette", "brand-color"],
    wc: {
      entry: "config",
      tags: ["minerva-config"],
      demos: ["basic", "palette-design", "locale", "nested", "brand-color"],
    },
    native: {
      exports: [
        "MinervaProvider",
        "ConfigProvider",
        "useTheme",
        "useTokens",
        "useI18n",
        "useInsets",
      ],
      api: [
        "MinervaProviderProps",
        "MinervaTheme",
        "MinervaI18n",
        "NativeLocale",
        "NativeFonts",
      ],
      demos: ["switching", "use-theme"],
    },
  },
  {
    id: "hooks",
    category: "configuration",
    exports: ["useAutoTheme", "useLocale", "useI18n", "useDisclosure", "cn"],
    demos: ["use-auto-theme", "use-locale", "use-disclosure"],
  },
  {
    id: "theme-utils",
    category: "configuration",
    exports: [
      "applyThemeStyles",
      "generateCSSVariables",
      "getSystemTheme",
      "isBilingualTheme",
      "resolveTheme",
      "themes",
      "light",
      "dark",
      "githubDark",
    ],
    api: ["ThemeProps", "SemanticThemeProps", "ComponentThemeProps"],
    demos: ["theme-swatches", "resolve-theme", "scoped-preview"],
  },

  // General
  {
    id: "button",
    cssVars: ["Button"],
    category: "general",
    exports: ["Button"],
    api: ["ButtonProps"],
    demos: [
      "basic",
      "colors",
      "variants",
      "sizes",
      "shapes",
      "states",
      "with-icon",
      "icons-loading",
      "form",
    ],
    wc: {
      entry: "button",
      tags: ["minerva-button"],
      demos: ["basic", "colors-variants", "sizes-shapes", "states", "form"],
    },
    native: {
      exports: ["Button"],
      api: ["ButtonProps"],
      demos: [
        "basic",
        "colors",
        "variants",
        "sizes",
        "shapes",
        "states",
        "with-icon",
        "icons-loading",
        "form",
      ],
    },
  },
  {
    id: "icon-button",
    cssVars: ["IconButton"],
    category: "general",
    exports: ["IconButton"],
    api: ["IconButtonProps"],
    demos: [
      "basic",
      "colors",
      "variants",
      "sizes-and-shapes",
      "states",
      "toggle",
      "search",
      "custom-colors",
      "tooltip",
      "label",
    ],
    wc: {
      entry: "icon-button",
      tags: ["minerva-icon-button"],
      demos: ["basic", "sizes-shapes", "toggle", "states"],
    },
    native: {
      exports: ["IconButton"],
      api: ["IconButtonProps"],
      demos: ["basic", "toggle", "variants-sizes"],
    },
  },

  // Layout
  {
    id: "divider",
    cssVars: ["Divider"],
    category: "layout",
    exports: ["Divider"],
    api: ["DividerProps"],
    demos: [
      "basic",
      "variants",
      "with-text",
      "vertical",
      "flex-item",
      "custom-style",
    ],
    wc: {
      entry: "divider",
      tags: ["minerva-divider"],
      demos: [
        "basic",
        "variants",
        "with-text",
        "vertical",
        "flex-item",
        "custom-style",
      ],
    },
    native: {
      exports: ["Divider"],
      api: ["DividerProps"],
      demos: ["basic", "vertical", "with-text"],
    },
  },
  {
    id: "card",
    cssVars: ["Card"],
    category: "layout",
    exports: [
      "Card",
      "CardHeader",
      "CardTitle",
      "CardDescription",
      "CardContent",
      "CardFooter",
    ],
    api: [
      "CardProps",
      "CardHeaderProps",
      "CardTitleProps",
      "CardDescriptionProps",
      "CardContentProps",
      "CardFooterProps",
    ],
    demos: [
      "basic",
      "variants",
      "padded",
      "interactive",
      "custom-colors",
      "animation",
    ],
    wc: {
      entry: "card",
      tags: [
        "minerva-card",
        "minerva-card-header",
        "minerva-card-content",
        "minerva-card-footer",
        "minerva-card-title",
        "minerva-card-description",
      ],
      demos: ["basic", "variants", "padded", "interactive"],
    },
    native: {
      exports: [
        "Card",
        "CardHeader",
        "CardTitle",
        "CardDescription",
        "CardContent",
        "CardFooter",
      ],
      api: ["CardProps"],
      demos: ["basic", "product", "variants"],
    },
  },
  {
    id: "virtual-list",
    cssVars: ["VirtualList"],
    category: "layout",
    exports: ["VirtualList"],
    api: ["VirtualListProps", "VirtualListItem"],
    demos: [
      "basic",
      "auto-height",
      "infinite-scroll",
      "high-performance",
      "clickable-rows",
    ],
    wc: {
      entry: "virtual-list",
      tags: ["minerva-virtual-list"],
      demos: ["basic", "clickable-rows", "infinite-scroll"],
    },
    native: {
      exports: ["VirtualList"],
      api: ["VirtualListProps"],
      demos: ["basic"],
    },
  },

  // Data entry
  {
    id: "checkbox",
    cssVars: ["Checkbox"],
    category: "dataEntry",
    exports: ["Checkbox"],
    api: ["CheckboxProps"],
    demos: [
      "basic",
      "controlled",
      "indeterminate",
      "sizes-and-shapes",
      "label-placement",
      "states",
      "custom-style",
      "error",
      "colors-and-form-control",
    ],
    native: {
      exports: ["Checkbox"],
      api: ["CheckboxProps"],
      demos: ["basic", "controlled", "indeterminate"],
    },
    wc: {
      entry: "checkbox",
      tags: ["minerva-checkbox"],
      demos: ["basic", "select-all", "styles-states", "form"],
    },
  },
  {
    id: "radio",
    cssVars: ["Radio"],
    category: "dataEntry",
    exports: ["Radio", "RadioGroup"],
    api: ["RadioProps", "RadioGroupProps"],
    demos: [
      "basic",
      "controlled",
      "horizontal",
      "sizes",
      "colors",
      "disabled",
      "validation",
    ],
    native: {
      exports: ["Radio", "RadioGroup"],
      api: ["RadioProps", "RadioGroupProps"],
      demos: ["basic", "controlled", "disabled"],
    },
    wc: {
      entry: "radio",
      tags: ["minerva-radio", "minerva-radio-group"],
      demos: ["basic", "styles-states", "form"],
    },
  },
  {
    id: "switch",
    cssVars: ["Switch"],
    native: {
      exports: ["Switch"],
      api: ["SwitchProps"],
      demos: [
        "basic",
        "controlled",
        "sizes",
        "colors",
        "label-placement",
        "states",
      ],
    },
    category: "dataEntry",
    exports: ["Switch"],
    api: ["SwitchProps"],
    demos: [
      "basic",
      "controlled",
      "sizes",
      "colors",
      "label-placement",
      "states",
      "icons",
      "custom-style",
      "bilateral-and-segmented",
    ],
    wc: {
      entry: "switch",
      tags: ["minerva-switch"],
      demos: ["basic", "styles-states", "side-labels", "form"],
    },
  },
  {
    id: "auto-complete",
    cssVars: ["AutoComplete"],
    category: "dataEntry",
    exports: ["AutoComplete"],
    api: ["AutoCompleteProps", "AutoCompleteOption"],
    demos: [
      "basic",
      "controlled",
      "rich-options",
      "custom-render",
      "grouped",
      "filter-sort",
      "async-loading",
      "appearance",
      "search-box",
    ],
    wc: {
      entry: "autocomplete",
      tags: ["minerva-autocomplete"],
      demos: ["basic", "rich-options", "custom-render", "async-loading"],
    },
    native: {
      exports: ["AutoComplete"],
      api: ["AutoCompleteProps"],
      demos: ["basic"],
    },
  },
  {
    id: "cascader",
    cssVars: ["Cascader"],
    category: "dataEntry",
    exports: ["Cascader"],
    api: ["CascaderProps", "CascaderOption"],
    demos: [
      "basic",
      "default-value",
      "controlled",
      "hover",
      "search",
      "display-render",
      "disabled",
      "lazy-load",
      "custom-option",
    ],
    wc: {
      entry: "cascader",
      tags: ["minerva-cascader"],
      demos: ["basic", "search-hover", "lazy", "form"],
    },
    native: { exports: ["Cascader"], api: ["CascaderProps"], demos: ["basic"] },
  },
  {
    id: "time-picker",
    cssVars: ["TimePicker"],
    category: "dataEntry",
    exports: ["TimePicker"],
    api: ["TimePickerProps"],
    demos: [
      "basic",
      "default-value",
      "controlled",
      "formats",
      "twelve-hour",
      "steps",
      "time-range",
      "sizes",
      "disabled",
    ],
    wc: {
      entry: "time-picker",
      tags: ["minerva-time-picker"],
      demos: ["basic", "formats", "range-steps", "form"],
    },
    native: {
      exports: ["TimePicker"],
      api: ["TimePickerProps"],
      demos: ["basic"],
    },
  },
  {
    id: "date-picker",
    cssVars: ["DatePicker"],
    category: "dataEntry",
    exports: ["DatePicker"],
    api: ["DatePickerProps"],
    demos: [
      "basic",
      "default-value",
      "controlled",
      "min-max",
      "sizes",
      "disabled",
      "form-control",
    ],
    wc: {
      entry: "date-picker",
      tags: ["minerva-date-picker"],
      demos: ["basic"],
    },
    native: {
      exports: ["DatePicker"],
      api: ["DatePickerProps"],
      demos: ["basic"],
    },
  },

  // Data display
  {
    id: "avatar",
    cssVars: ["Avatar"],
    category: "dataDisplay",
    exports: ["Avatar", "AvatarGroup"],
    api: ["AvatarProps", "AvatarGroupProps"],
    demos: ["basic", "shapes", "sizes", "group", "fallback"],
    wc: {
      entry: "avatar",
      tags: ["minerva-avatar", "minerva-avatar-group"],
      demos: ["basic", "shapes-sizes", "group", "fallback"],
    },
    native: {
      exports: ["Avatar", "AvatarGroup"],
      api: ["AvatarProps", "AvatarGroupProps"],
      demos: ["basic", "group", "sizes-shapes"],
    },
  },
  {
    id: "badge",
    cssVars: ["Badge"],
    category: "dataDisplay",
    exports: ["Badge"],
    api: ["BadgeProps"],
    demos: [
      "basic",
      "colors",
      "variants",
      "positions",
      "sizes",
      "dot",
      "with-icon",
      "custom-style",
      "status",
    ],
    wc: {
      entry: "badge",
      tags: ["minerva-badge"],
      demos: ["basic", "colors-variants", "positions", "slots"],
    },
    native: {
      exports: ["Badge"],
      api: ["BadgeProps"],
      demos: ["basic", "colors-variants", "dot-max"],
    },
  },
  {
    id: "tag",
    cssVars: ["Tag"],
    category: "dataDisplay",
    exports: ["Tag"],
    api: ["TagProps"],
    demos: [
      "colors",
      "variants",
      "sizes-shapes",
      "with-icon",
      "closable",
      "clickable",
      "avatar-loading",
      "custom-colors",
      "disabled",
    ],
    wc: {
      entry: "tag",
      tags: ["minerva-tag"],
      demos: ["basic", "variants-sizes", "closable", "toggle"],
    },
    native: {
      exports: ["Tag"],
      api: ["TagProps"],
      demos: ["closable", "colors-variants", "selectable"],
    },
  },
  {
    id: "empty",
    cssVars: ["Empty"],
    category: "dataDisplay",
    exports: ["Empty"],
    api: ["EmptyProps"],
    demos: ["basic", "svg", "custom-icon", "with-action", "sizes", "styled"],
    wc: {
      entry: "empty",
      tags: ["minerva-empty"],
      demos: ["basic", "actions", "sizes-styles"],
    },
    native: { exports: ["Empty"], api: ["EmptyProps"], demos: ["basic"] },
  },
  {
    id: "tooltip",
    cssVars: ["Tooltip"],
    category: "dataDisplay",
    exports: ["Tooltip", "TooltipProvider"],
    api: ["TooltipProps", "TooltipRef", "TooltipProviderProps"],
    demos: [
      "basic",
      "placements",
      "colors",
      "variants",
      "shapes",
      "animations",
      "custom-colors",
      "delays",
      "follow-cursor",
      "controlled",
      "events",
      "as-child",
      "provider",
    ],
    wc: {
      entry: "tooltip",
      tags: ["minerva-tooltip-provider", "minerva-tooltip"],
      demos: ["basic", "styles", "provider", "controlled"],
    },
    native: {
      exports: ["Tooltip", "TooltipProvider"],
      api: ["TooltipProps", "TooltipProviderProps"],
      demos: ["basic"],
    },
  },

  // Feedback
  {
    id: "alert",
    cssVars: ["Alert"],
    category: "feedback",
    exports: ["Alert"],
    api: ["AlertProps"],
    demos: [
      "colors",
      "variants",
      "with-title",
      "sizes",
      "closable",
      "with-action",
      "collapsible",
      "banner",
      "appearance",
      "animations",
      "return-focus",
    ],
    wc: {
      entry: "alert",
      tags: ["minerva-alert"],
      demos: ["basic", "variants-sizes", "closable", "collapsible"],
    },
    native: { exports: ["Alert"], api: ["AlertProps"], demos: ["basic"] },
  },
  {
    id: "progress",
    cssVars: ["ProgressIndicator"],
    category: "feedback",
    exports: ["ProgressIndicator"],
    api: ["ProgressIndicatorProps"],
    demos: [
      "variants",
      "sizes",
      "colors",
      "label",
      "width",
      "with-icon",
      "determinate",
    ],
    wc: {
      entry: "progress",
      tags: ["minerva-progress"],
      demos: ["basic", "sizes-colors", "label-width", "determinate"],
    },
    native: {
      exports: ["ProgressIndicator"],
      api: ["ProgressProps"],
      demos: ["basic"],
    },
  },
  {
    id: "skeleton",
    cssVars: ["Skeleton"],
    category: "feedback",
    exports: ["Skeleton", "SkeletonText"],
    api: ["SkeletonProps", "SkeletonTextProps"],
    demos: [
      "basic",
      "variants",
      "animations",
      "composition",
      "card",
      "loading",
      "decorative",
      "skeleton-text",
    ],
    wc: {
      entry: "skeleton",
      tags: ["minerva-skeleton", "minerva-skeleton-text"],
      demos: ["basic", "variants", "loading", "composition"],
    },
    native: {
      exports: ["Skeleton", "SkeletonText"],
      api: ["SkeletonProps", "SkeletonTextProps"],
      demos: ["basic"],
    },
  },

  // Navigation
  {
    id: "pagination",
    cssVars: ["Pagination"],
    category: "navigation",
    exports: ["Pagination"],
    api: ["PaginationProps", "PaginationLabels"],
    demos: [
      "basic",
      "many-pages",
      "total-and-jumper",
      "size-changer",
      "sizes",
      "shapes-and-variants",
      "simple",
      "custom-render",
      "disabled",
      "responsive",
      "compact",
    ],
    wc: {
      entry: "pagination",
      tags: ["minerva-pagination"],
      demos: ["basic", "total-and-jumper", "appearance", "simple"],
    },
    native: {
      exports: ["Pagination"],
      api: ["PaginationProps"],
      demos: ["basic", "simple"],
    },
  },

  // Layout
  {
    id: "box",
    category: "layout",
    exports: ["Box"],
    api: ["BoxProps"],
    demos: ["basic", "sizing", "polymorphic"],
    wc: {
      entry: "box",
      tags: ["minerva-box"],
      demos: ["basic", "spacing-sizing", "surfaces"],
    },
    native: { exports: ["Box"], api: ["BoxProps"], demos: ["basic"] },
  },
  {
    id: "stack",
    cssVars: ["Stack"],
    category: "layout",
    exports: ["Stack", "HStack", "VStack"],
    api: ["StackProps"],
    demos: ["basic", "horizontal", "gap", "wrap", "separator", "attached"],
    wc: {
      entry: "stack",
      tags: ["minerva-stack", "minerva-hstack", "minerva-vstack"],
      demos: ["basic", "hstack-vstack", "wrap-separator", "attached"],
    },
    native: {
      exports: ["Stack", "HStack", "VStack"],
      api: ["StackProps", "HStackProps", "VStackProps"],
      demos: ["basic"],
    },
  },
  {
    id: "responsive-grid",
    cssVars: ["ResponsiveGrid"],
    category: "layout",
    exports: ["ResponsiveGrid", "GridItem"],
    api: ["ResponsiveGridProps", "GridItemProps"],
    demos: ["basic", "full-width"],
    wc: {
      entry: "responsive-grid",
      tags: ["minerva-responsive-grid", "minerva-grid-item"],
      demos: ["basic", "container", "full-width"],
    },
    native: {
      exports: ["ResponsiveGrid", "GridItem"],
      api: ["ResponsiveGridProps", "GridItemProps"],
      demos: ["basic"],
    },
  },
  {
    id: "split-layout",
    cssVars: ["SplitLayout"],
    category: "layout",
    exports: ["SplitLayout"],
    api: ["SplitLayoutProps"],
    demos: ["basic", "options"],
    wc: {
      entry: "split-layout",
      tags: ["minerva-split-layout"],
      demos: ["basic", "options"],
    },
    native: {
      exports: ["SplitLayout"],
      api: ["SplitLayoutProps"],
      demos: ["basic"],
    },
  },
  {
    id: "page",
    cssVars: ["Page"],
    category: "layout",
    exports: ["Page", "PageHeader", "PageSection", "StatCard", "Toolbar"],
    api: [
      "PageProps",
      "PageHeaderProps",
      "PageSectionProps",
      "StatCardProps",
      "ToolbarProps",
    ],
    demos: ["basic", "stat-cards", "toolbar"],
    wc: {
      entry: "page",
      tags: [
        "minerva-page",
        "minerva-page-header",
        "minerva-page-section",
        "minerva-toolbar",
        "minerva-stat-card",
      ],
      demos: ["basic", "stat-cards", "toolbar"],
    },
    native: {
      exports: ["Page", "PageHeader", "PageSection", "StatCard", "Toolbar"],
      api: [
        "PageProps",
        "PageHeaderProps",
        "PageSectionProps",
        "StatCardProps",
        "ToolbarProps",
      ],
      demos: ["basic"],
    },
  },
  {
    id: "app-shell",
    cssVars: ["AppShell"],
    category: "layout",
    exports: ["AppShell"],
    api: ["AppShellProps", "AppShellNavigationState", "AppShellLabels"],
    demos: ["basic", "controlled", "skip-link"],
    wc: {
      entry: "app-shell",
      tags: ["minerva-app-shell"],
      demos: ["basic", "sidebar-modes", "controlled"],
    },
    native: { exports: ["AppShell"], api: ["AppShellProps"], demos: ["basic"] },
  },

  // Overlays
  {
    id: "modal",
    cssVars: ["Modal"],
    category: "overlays",
    exports: [
      "Modal",
      "ModalRoot",
      "ModalTrigger",
      "ModalClose",
      "ModalContent",
      "ModalHeader",
      "ModalBody",
      "ModalFooter",
    ],
    api: [
      "ModalProps",
      "ModalRootProps",
      "ModalTriggerProps",
      "ModalContentProps",
    ],
    demos: ["basic", "uncontrolled", "sizes", "form", "compound"],
    wc: {
      entry: "modal",
      tags: ["minerva-modal"],
      demos: ["basic", "sizes", "form", "events"],
    },
    native: {
      exports: [
        "Dialog",
        "Modal",
        "ModalRoot",
        "ModalTrigger",
        "ModalClose",
        "ModalContent",
        "ModalHeader",
        "ModalBody",
        "ModalFooter",
      ],
      api: ["DialogProps", "ModalRootProps", "ModalTriggerProps"],
      demos: ["basic", "form", "confirm", "custom-footer"],
    },
  },
  {
    id: "confirm",
    category: "overlays",
    exports: ["ConfirmDialog", "ConfirmProvider", "confirm", "useConfirm"],
    api: ["ConfirmDialogProps", "ConfirmOptions", "ConfirmProviderProps"],
    demos: ["imperative", "colors", "provider", "declarative", "scoped"],
    wc: {
      entry: "confirm",
      tags: ["minerva-confirm-dialog", "minerva-confirm-provider"],
      demos: ["basic", "async", "imperative", "scoped"],
    },
    native: {
      exports: ["ConfirmDialog", "ConfirmProvider"],
      api: ["ConfirmDialogProps", "ConfirmProviderProps"],
      demos: ["basic"],
    },
  },
  {
    id: "drawer",
    cssVars: ["Drawer"],
    category: "overlays",
    exports: [
      "Drawer",
      "DrawerRoot",
      "DrawerTrigger",
      "DrawerClose",
      "DrawerContent",
      "DrawerHeader",
      "DrawerBody",
      "DrawerFooter",
    ],
    api: ["DrawerProps", "DrawerRootProps", "DrawerContentProps"],
    demos: ["basic", "sides", "compound"],
    wc: {
      entry: "drawer",
      tags: ["minerva-drawer"],
      demos: ["basic", "sides", "non-modal"],
    },
    native: {
      exports: [
        "Drawer",
        "DrawerRoot",
        "DrawerTrigger",
        "DrawerClose",
        "DrawerContent",
        "DrawerHeader",
        "DrawerBody",
        "DrawerFooter",
      ],
      api: ["PopupProps"],
      demos: ["basic"],
    },
  },
  {
    id: "command",
    cssVars: ["Command"],
    category: "overlays",
    exports: ["CommandDialog", "normalizeShortcuts", "matchesShortcut"],
    api: ["CommandDialogProps", "CommandItem"],
    demos: ["basic", "shortcut", "custom-filter", "site-search"],
    wc: {
      entry: "command",
      tags: ["minerva-command-dialog"],
      demos: ["basic", "shortcut", "custom-filter"],
    },
    native: {
      exports: ["CommandDialog"],
      api: ["CommandDialogProps"],
      demos: ["basic"],
    },
  },
  {
    id: "popover",
    cssVars: ["Popover"],
    category: "overlays",
    exports: [
      "Popover",
      "PopoverTrigger",
      "PopoverAnchor",
      "PopoverClose",
      "PopoverContent",
    ],
    api: ["PopoverProps", "PopoverContentProps", "PopoverTriggerProps"],
    demos: ["basic", "placement", "controlled"],
    wc: {
      entry: "popover",
      tags: ["minerva-popover"],
      demos: ["basic", "placement", "anchor"],
    },
    native: {
      exports: [
        "Popover",
        "PopoverTrigger",
        "PopoverAnchor",
        "PopoverClose",
        "PopoverContent",
      ],
      api: ["PopoverProps", "PopoverTriggerProps", "PopoverContentProps"],
      demos: ["basic"],
    },
  },

  {
    id: "menu",
    cssVars: ["Menu"],
    category: "overlays",
    exports: ["Menu", "ContextMenu"],
    api: [
      "MenuProps",
      "ContextMenuProps",
      "MenuAction",
      "MenuCheckboxEntry",
      "MenuRadioGroupEntry",
      "MenuRadioItem",
      "MenuSeparatorEntry",
      "MenuGroupEntry",
    ],
    demos: [
      "basic",
      "triggers",
      "groups",
      "submenus",
      "checkbox-radio",
      "placement",
      "disabled",
      "context-menu",
      "controlled",
    ],
    wc: {
      entry: "menu",
      tags: [
        "minerva-context-menu",
        "minerva-menu-item",
        "minerva-menu-checkbox-item",
        "minerva-menu-radio-item",
        "minerva-menu-group",
        "minerva-menu-separator",
        "minerva-menu-label",
        "minerva-menu",
      ],
      demos: ["basic", "checkbox-radio", "items", "context-menu"],
    },
    native: {
      exports: ["Menu", "ContextMenu"],
      api: ["MenuProps", "ContextMenuProps"],
      demos: ["basic"],
    },
  },
  {
    id: "toast",
    cssVars: ["Toast"],
    category: "feedback",
    exports: ["ToastProvider", "toast", "useToast"],
    api: [
      "ToastOptions",
      "ToastAction",
      "ToastProviderProps",
      "ToastApi",
      "ToastPromiseMessages",
    ],
    demos: [
      "basic",
      "colors",
      "options",
      "loading",
      "action",
      "dedupe",
      "scoped",
      "keyboard",
    ],
    native: {
      exports: ["ToastProvider", "toast", "useToast"],
      api: ["ToastOptions", "ToastApi", "ToastProviderProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "toast",
      tags: ["minerva-toast-region"],
      demos: ["basic", "options", "loading"],
    },
  },
  {
    id: "page-tabs",
    cssVars: ["PageTabs"],
    category: "navigation",
    exports: ["PageTabs", "PageTab"],
    api: ["PageTabsProps", "PageTabProps"],
    demos: ["basic", "context-menu", "overflow"],
    wc: {
      entry: "page-tabs",
      tags: ["minerva-page-tabs", "minerva-page-tab"],
      demos: ["basic", "actions", "overflow"],
    },
    native: {
      exports: ["PageTabs", "PageTab"],
      api: ["PageTabsProps", "PageTabProps"],
      demos: ["basic"],
    },
  },

  // Forms
  {
    id: "form-control",
    cssVars: ["FormControl"],
    category: "dataEntry",
    exports: [
      "FormControl",
      "FormLabel",
      "FormHelperText",
      "FormErrorMessage",
      "FormField",
      "useFormControlContext",
      "useFormControlProps",
    ],
    api: ["FormControlProps", "FormLabelProps", "FormFieldProps"],
    demos: ["basic", "form-field", "states", "custom-control"],
    wc: {
      entry: "form-control",
      tags: ["minerva-form-control"],
      demos: ["basic", "states", "slots", "form"],
    },
    native: {
      exports: [
        "FormControl",
        "FormLabel",
        "FormHelperText",
        "FormErrorMessage",
        "FormField",
      ],
      api: ["FormControlProps", "FormFieldProps"],
      demos: ["basic"],
    },
  },
  {
    id: "form-layout",
    cssVars: ["FormLayout"],
    category: "dataEntry",
    exports: ["FormLayout"],
    api: ["FormLayoutProps"],
    demos: ["basic", "gaps"],
    wc: {
      entry: "form-layout",
      tags: ["minerva-form-layout"],
      demos: ["basic", "gaps"],
    },
    native: {
      exports: ["FormLayout"],
      api: ["FormLayoutProps"],
      demos: ["basic"],
    },
  },
  {
    id: "input",
    cssVars: ["Input"],
    native: {
      exports: ["Input"],
      api: ["InputProps"],
      demos: ["basic", "states", "sizes-variants", "clearable-and-count"],
    },
    category: "dataEntry",
    exports: ["Input"],
    api: ["InputProps"],
    demos: [
      "basic",
      "sizes-variants",
      "addons",
      "clearable-and-count",
      "password",
      "states",
      "validation",
    ],
    wc: {
      entry: "input",
      tags: ["minerva-input"],
      demos: ["basic", "sizes-variants", "addons", "form"],
    },
  },
  {
    id: "textarea",
    cssVars: ["Textarea"],
    category: "dataEntry",
    exports: ["Textarea"],
    api: ["TextareaProps"],
    demos: ["basic", "sizes-variants", "form-control"],
    wc: {
      entry: "textarea",
      tags: ["minerva-textarea"],
      demos: ["basic", "sizes-variants", "form"],
    },
    native: { exports: ["Textarea"], api: ["TextareaProps"], demos: ["basic"] },
  },
  {
    id: "number-input",
    cssVars: ["NumberInput"],
    category: "dataEntry",
    exports: ["NumberInput"],
    api: ["NumberInputProps"],
    demos: ["basic", "stepper-precision", "form-control"],
    wc: {
      entry: "number-input",
      tags: ["minerva-number-input"],
      demos: ["basic", "precision", "form"],
    },
    native: {
      exports: ["NumberInput"],
      api: ["NumberInputProps"],
      demos: ["basic"],
    },
  },
  {
    id: "json-field",
    cssVars: ["JsonField"],
    category: "dataEntry",
    exports: ["JsonField"],
    api: ["JsonFieldProps"],
    demos: ["basic", "indent", "form-control"],
    wc: {
      entry: "json-field",
      tags: ["minerva-json-field"],
      demos: ["basic", "options", "form"],
    },
    native: {
      exports: ["JsonField"],
      api: ["JsonFieldProps"],
      demos: ["basic"],
    },
  },
  {
    id: "key-value-editor",
    cssVars: ["KeyValueEditor"],
    category: "dataEntry",
    exports: ["KeyValueEditor"],
    api: ["KeyValueEditorProps", "KeyValueEntry", "KeyValueEntryErrors"],
    demos: ["basic", "errors"],
    wc: {
      entry: "key-value-editor",
      tags: ["minerva-key-value-editor"],
      demos: ["basic", "errors", "form"],
    },
    native: {
      exports: ["KeyValueEditor"],
      api: ["KeyValueEditorProps"],
      demos: ["basic"],
    },
  },
  {
    id: "tag-input",
    cssVars: ["TagInput"],
    category: "dataEntry",
    exports: ["TagInput"],
    api: ["TagInputProps"],
    demos: ["basic", "form-control", "separators"],
    wc: {
      entry: "tag-input",
      tags: ["minerva-tag-input"],
      demos: ["basic", "separators", "states", "form"],
    },
    native: { exports: ["TagInput"], api: ["TagInputProps"], demos: ["basic"] },
  },

  {
    id: "loading-state",
    cssVars: ["LoadingState"],
    category: "feedback",
    exports: ["LoadingState"],
    api: ["LoadingStateProps"],
    demos: ["basic", "sizes"],
    wc: {
      entry: "loading-state",
      tags: ["minerva-loading-state"],
      demos: ["basic", "sizes", "section"],
    },
    native: {
      exports: ["LoadingState"],
      api: ["LoadingProps"],
      demos: ["basic"],
    },
  },
  {
    id: "text-link",
    cssVars: ["TextLink"],
    category: "dataDisplay",
    exports: ["TextLink"],
    api: ["TextLinkProps"],
    demos: ["variants", "as-child"],
    wc: {
      entry: "text-link",
      tags: ["minerva-text-link"],
      demos: ["basic", "variants", "styling"],
    },
    native: { exports: ["TextLink"], api: ["TextLinkProps"], demos: ["basic"] },
  },
  {
    id: "description-list",
    cssVars: ["DescriptionList"],
    category: "dataDisplay",
    exports: ["DescriptionList"],
    api: ["DescriptionListProps", "DescriptionListItem"],
    demos: ["basic", "variants"],
    wc: {
      entry: "description-list",
      tags: ["minerva-description-item", "minerva-description-list"],
      demos: ["basic", "items", "variants", "styling"],
    },
    native: {
      exports: ["DescriptionList"],
      api: ["DescriptionListProps"],
      demos: ["basic"],
    },
  },
  {
    id: "list",
    cssVars: ["List"],
    category: "dataDisplay",
    exports: ["List", "ListItem"],
    api: ["ListProps", "ListItemProps"],
    demos: ["basic", "compact", "bordered"],
    wc: {
      entry: "list",
      tags: ["minerva-list", "minerva-list-item"],
      demos: ["basic", "slots", "density", "bordered"],
    },
    native: {
      exports: ["Cell", "CellGroup", "List", "ListItem"],
      api: ["CellProps", "CellGroupProps", "ListProps", "ListItemProps"],
      demos: ["basic", "inset-groups", "rich-rows"],
    },
  },
  {
    id: "code-block",
    cssVars: ["CodeBlock"],
    category: "dataDisplay",
    exports: ["CodeBlock"],
    api: ["CodeBlockProps"],
    demos: [
      "basic",
      "languages",
      "auto-language",
      "line-numbers",
      "no-wrap",
      "copyable",
      "marks",
    ],
    wc: {
      entry: "code-block",
      tags: ["minerva-code-block"],
      demos: [
        "basic",
        "languages",
        "auto-language",
        "line-numbers",
        "copy",
        "overflow",
        "marks",
      ],
    },
    native: {
      exports: ["CodeBlock"],
      api: ["CodeBlockProps"],
      demos: ["basic", "marks"],
    },
  },
  {
    id: "prose",
    cssVars: ["Prose"],
    category: "dataDisplay",
    exports: ["Prose"],
    api: ["ProseProps"],
    demos: ["basic", "as-child"],
    wc: {
      entry: "prose",
      tags: ["minerva-prose"],
      demos: ["basic", "rich-content", "scopes"],
    },
    native: { exports: ["Prose"], api: ["ProseProps"], demos: ["basic"] },
  },
  {
    id: "design-presets",
    category: "theming",
    api: ["DesignOptions"],
    demos: ["presets", "axes"],
  },
  {
    id: "theme-palette",
    cssVars: ["ThemeToggle"],
    category: "theming",
    exports: [
      "ThemeProvider",
      "useTheme",
      "ThemeToggle",
      "PaletteToggle",
      "palettes",
    ],
    api: [
      "ThemeProviderProps",
      "ThemeContextValue",
      "ThemeToggleProps",
      "PaletteToggleProps",
    ],
    demos: ["toggles", "palette-swatches", "use-theme"],
    wc: {
      entry: "theme-toggle",
      tags: ["minerva-theme-toggle", "minerva-palette-toggle"],
      demos: ["basic", "palette", "events"],
    },
    native: {
      exports: [
        "ThemeToggle",
        "PaletteToggle",
        "PresetToggle",
        "ThemeProvider",
      ],
      api: [
        "ThemeToggleProps",
        "PaletteToggleProps",
        "PresetToggleProps",
        "MinervaProviderProps",
      ],
      demos: ["preset", "toggles"],
    },
  },
  {
    id: "table",
    cssVars: ["Table"],
    category: "dataDisplay",
    exports: [
      "Table",
      "TableRoot",
      "TableHead",
      "TableBody",
      "TableRow",
      "TableHeader",
      "TableCell",
      "TableCellContent",
      "DataTable",
      "computeFixedColumnLayout",
    ],
    api: [
      "TableProps",
      "TableColumn",
      "DataTableProps",
      "TableRootProps",
      "TableScrollConfig",
      "TableSortState",
      "TableRowSelection",
      "TableCellContentProps",
      "FixedColumnLayout",
    ],
    demos: [
      "basic",
      "variants",
      "fixed-columns",
      "states",
      "data-table",
      "compound",
      "cell-content",
      "sorting",
      "selection",
    ],
    wc: {
      entry: "data-table",
      tags: ["minerva-data-table", "minerva-table-cell-content"],
      demos: ["basic", "pagination", "selection", "sorting"],
    },
    native: {
      exports: [
        "Table",
        "TableRoot",
        "TableHead",
        "TableBody",
        "TableRow",
        "TableHeader",
        "TableCell",
        "TableCellContent",
        "DataTable",
      ],
      api: ["TableProps", "TableCellContentProps", "DataTableProps"],
      demos: ["basic"],
    },
  },
  {
    id: "nav-tree",
    cssVars: ["NavTree"],
    category: "navigation",
    exports: ["NavTree"],
    api: ["NavTreeProps", "NavTreeSection", "NavTreeItem", "NavTreeItemState"],
    demos: ["basic", "collapsed", "custom-link"],
    wc: {
      entry: "nav-tree",
      tags: ["minerva-nav-tree"],
      demos: ["basic", "collapsed", "expansion"],
    },
    native: { exports: ["NavTree"], api: ["NavTreeProps"], demos: ["basic"] },
  },
  {
    id: "tabs",
    cssVars: ["Tabs"],
    category: "navigation",
    exports: ["Tabs", "TabList", "Tab", "TabPanel"],
    api: ["TabsProps", "TabListProps", "TabProps", "TabPanelProps"],
    demos: ["basic", "variants", "colors", "vertical"],
    wc: {
      entry: "tabs",
      tags: ["minerva-tabs", "minerva-tab", "minerva-tab-panel"],
      demos: ["basic", "variants", "vertical", "controlled", "panels"],
    },
    native: {
      exports: ["Tabs", "TabList", "Tab", "TabPanel"],
      api: [
        "TabsProps",
        "TabListProps",
        "TabProps",
        "TabPanelProps",
        "TabsItemData",
      ],
      demos: ["basic", "compound", "scrollable", "variants"],
    },
  },
  {
    id: "html-preview",
    cssVars: ["HtmlPreview"],
    category: "dataDisplay",
    exports: ["HtmlPreview"],
    api: ["HtmlPreviewProps"],
    demos: ["basic", "viewports"],
    wc: {
      entry: "html-preview",
      tags: ["minerva-html-preview"],
      demos: ["basic", "viewport", "sanitized"],
    },
    native: {
      exports: ["HtmlPreview"],
      api: ["HtmlPreviewProps"],
      demos: ["basic"],
    },
  },
  {
    id: "monaco-code-editor",
    cssVars: ["MonacoCodeEditor"],
    category: "editors",
    api: ["MonacoCodeEditorProps"],
    demos: ["basic"],
    wc: {
      // optional entry (not in the all-in-one entry nor the CDN bundle)
      entry: "code-editor",
      tags: ["minerva-code-editor"],
      demos: ["basic", "fallback"],
    },
    native: {
      exports: ["CodeEditor"],
      api: ["CodeEditorProps"],
      demos: ["basic"],
    },
  },
  {
    id: "steps",
    cssVars: ["Steps"],
    category: "navigation",
    exports: ["Steps"],
    api: ["StepsProps", "StepsItem"],
    demos: ["basic", "read-only", "styling"],
    wc: {
      entry: "steps",
      tags: ["minerva-steps"],
      demos: ["basic", "navigable", "styling"],
    },
    native: {
      exports: ["Steps"],
      api: ["StepsProps", "StepsItem"],
      demos: ["basic", "vertical"],
    },
  },
  {
    id: "answer-sheet",
    cssVars: ["AnswerSheet"],
    category: "navigation",
    exports: ["AnswerSheet"],
    api: ["AnswerSheetProps", "AnswerSheetItem", "AnswerSheetGroup"],
    demos: ["basic", "groups", "scroll", "sizes"],
    wc: {
      entry: "answer-sheet",
      tags: ["minerva-answer-sheet"],
      demos: ["basic", "groups", "scroll", "sizes"],
    },
    native: {
      exports: ["AnswerSheet"],
      api: ["AnswerSheetProps", "AnswerSheetItem"],
      demos: ["basic"],
    },
  },
  {
    id: "upload",
    cssVars: ["Upload"],
    category: "dataEntry",
    exports: ["Upload"],
    api: ["UploadProps", "UploadItem", "UploadLabels"],
    demos: ["basic", "multiple"],
    wc: {
      entry: "upload",
      tags: ["minerva-upload"],
      demos: ["basic", "transfer", "form"],
    },
    native: { exports: ["Upload"], api: ["UploadProps"], demos: ["basic"] },
  },
  {
    id: "select",
    cssVars: ["Select"],
    category: "dataEntry",
    exports: [
      "Select",
      "SelectItem",
      "SelectGroup",
      "SelectLabel",
      "SelectSeparator",
    ],
    api: [
      "SelectProps",
      "SelectItemProps",
      "SelectGroupProps",
      "SelectLabelProps",
      "SelectSeparatorProps",
    ],
    demos: ["basic", "groups", "sizes-and-states"],
    native: {
      exports: [
        "Select",
        "SelectItem",
        "SelectGroup",
        "SelectLabel",
        "SelectSeparator",
      ],
      api: [
        "SelectSingleProps",
        "SelectMultipleProps",
        "SelectOption",
        "SelectProps",
        "SelectItemProps",
        "SelectGroupProps",
      ],
      demos: ["basic"],
    },
    wc: {
      entry: "select",
      tags: [
        "minerva-option",
        "minerva-option-group",
        "minerva-select-label",
        "minerva-select-separator",
        "minerva-select",
      ],
      demos: ["basic", "groups", "options-property", "form"],
    },
  },
  {
    id: "rating",
    cssVars: ["Rating"],
    category: "dataEntry",
    exports: ["Rating", "RatingScale"],
    api: ["RatingProps", "RatingScaleProps", "RatingDimension"],
    demos: ["basic", "interactive", "scale"],
    wc: {
      entry: "rating",
      tags: ["minerva-rating", "minerva-rating-scale"],
      demos: ["basic", "interactive", "form", "scale"],
    },
    native: {
      exports: ["Rating", "RatingScale"],
      api: ["RatingProps", "RatingScaleProps"],
      demos: ["basic"],
    },
  },
  {
    id: "slider",
    cssVars: ["Slider"],
    category: "dataEntry",
    exports: ["Slider"],
    api: ["SliderProps"],
    demos: ["basic", "range", "marks", "sizes-colors", "committed", "disabled"],
    wc: {
      entry: "slider",
      tags: ["minerva-slider"],
      demos: [
        "basic",
        "range",
        "marks",
        "sizes-colors",
        "committed",
        "disabled",
      ],
    },
    native: {
      exports: ["Slider"],
      api: ["SliderProps"],
      demos: ["basic", "vertical"],
    },
  },
  {
    id: "segmented-control",
    cssVars: ["SegmentedControl"],
    category: "dataEntry",
    exports: ["SegmentedControl"],
    api: ["SegmentedControlProps", "SegmentedControlOptionObject"],
    demos: ["basic", "icons", "sizes", "full-width", "colors"],
    wc: {
      entry: "segmented-control",
      tags: ["minerva-segmented-control"],
      demos: ["basic", "icons", "sizes", "full-width", "colors"],
    },
    native: {
      exports: ["SegmentedControl"],
      api: ["SegmentedControlProps"],
      demos: ["basic"],
    },
  },
  {
    id: "month-calendar",
    cssVars: ["MonthCalendar"],
    category: "dataDisplay",
    exports: ["MonthCalendar"],
    api: ["MonthCalendarProps", "MonthCalendarEvent"],
    demos: ["basic", "sizes", "range"],
    wc: {
      entry: "month-calendar",
      tags: ["minerva-month-calendar"],
      demos: ["basic", "events", "sizes", "range", "localized"],
    },
    native: {
      exports: ["MonthCalendar"],
      api: ["CalendarProps"],
      demos: ["basic"],
    },
  },
  {
    id: "week-strip",
    cssVars: ["WeekStrip"],
    category: "dataDisplay",
    exports: ["WeekStrip"],
    api: ["WeekStripProps"],
    demos: ["basic", "markers", "navigation", "sizes"],
    wc: {
      entry: "week-strip",
      tags: ["minerva-week-strip"],
      demos: ["basic", "markers", "navigation", "sizes"],
    },
    native: {
      exports: ["WeekStrip"],
      api: ["WeekStripProps"],
      demos: ["basic"],
    },
  },
  {
    id: "media-player",
    cssVars: ["MediaPlayer"],
    category: "dataDisplay",
    exports: ["MediaPlayer"],
    api: ["MediaPlayerProps", "MediaPlayerHandle", "MediaPlayerTrack"],
    demos: ["video", "audio", "resume", "rates-skip", "captions"],
    wc: {
      entry: "media-player",
      tags: ["minerva-media-player"],
      demos: ["video", "audio", "resume", "rates-skip", "captions"],
    },
    native: {
      exports: ["MediaControls"],
      api: ["MediaControlsProps"],
      demos: ["basic", "captions"],
    },
  },
  {
    id: "dashboard-columns",
    cssVars: ["DashboardColumns"],
    category: "dataDisplay",
    exports: ["DashboardColumns", "DashboardColumn", "DashboardCard"],
    api: [
      "DashboardColumnsProps",
      "DashboardColumnProps",
      "DashboardCardProps",
    ],
    demos: ["basic", "colors", "empty-actions", "fixed-height", "drag-drop"],
    wc: {
      entry: "dashboard-columns",
      tags: [
        "minerva-dashboard-columns",
        "minerva-dashboard-column",
        "minerva-dashboard-card",
      ],
      demos: ["basic", "colors", "empty-actions", "fixed-height", "drag-drop"],
    },
    native: {
      exports: ["DashboardColumns", "DashboardColumn", "DashboardCard"],
      api: [
        "DashboardColumnsProps",
        "DashboardColumnProps",
        "DashboardCardProps",
      ],
      demos: ["basic", "drag-drop"],
    },
  },
  {
    id: "flashcard",
    cssVars: ["Flashcard"],
    category: "dataDisplay",
    exports: ["Flashcard"],
    api: ["FlashcardProps"],
    demos: ["basic", "controlled", "axis-variants", "reduced-disabled"],
    wc: {
      entry: "flashcard",
      tags: ["minerva-flashcard"],
      demos: ["basic", "controlled", "axis-variants", "reduced-disabled"],
    },
    native: {
      exports: ["Flashcard"],
      api: ["FlashcardProps"],
      demos: ["basic"],
    },
  },

  // Charts (minerva-design/charts: GPU engine + React components)
  {
    id: "charts",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["Chart"],
    api: [
      "ChartProps",
      "ChartCommonProps",
      "ChartHandle",
      "ChartSeries",
      "ChartPointDatum",
      "ChartColumnData",
      "ChartAxisOptions",
      "ChartRectAnnotation",
      "ChartLineAnnotation",
      "ChartTextAnnotation",
      "ChartInteractionOptions",
      "ChartTooltipOptions",
      "ChartLegendOptions",
      "ChartPadding",
      "ChartHoverEvent",
      "ChartHoverItem",
      "ChartPlotClickEvent",
      "ChartView",
    ],
    demos: [
      "gallery",
      "gallery-statistics",
      "gallery-relations",
      "gallery-graphs",
      "gallery-finance",
      "gallery-3d",
      "mixed",
      "dashboard",
      "renderers",
      "annotations",
      "palette",
    ],
    native: {
      exports: ["Chart"],
      api: ["ChartProps", "ChartCommonProps", "ChartHandle"],
      demos: ["mixed"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-chart", "minerva-shape-chart"],
      demos: ["mixed-series", "events"],
    },
  },
  {
    id: "line-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["LineChart"],
    api: ["LineChartProps"],
    demos: [
      "basic",
      "area",
      "curves",
      "stacked",
      "time-series",
      "traffic-events",
      "gaps",
      "thresholds",
      "zoom",
      "large-data",
      "live-sensor",
      "log-scale",
      "measure",
      "index-tooltip",
      "small-multiples",
    ],
    native: {
      exports: ["LineChart"],
      api: ["LineChartProps"],
      demos: ["basic", "area"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-line-chart"],
      demos: ["trend", "reset-zoom"],
    },
  },
  {
    id: "area-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["AreaChart"],
    api: ["AreaChartProps"],
    demos: [
      "basic",
      "stacked",
      "percent",
      "step",
      "energy-mix",
      "cumulative",
      "mirrored",
      "zoom-total",
      "hover-panel",
      "year-over-year",
      "disk-forecast",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-area-chart"],
      demos: ["stacked", "percent"],
    },
    native: {
      exports: ["AreaChart"],
      api: ["AreaChartProps"],
      demos: ["basic"],
    },
  },
  {
    id: "range-area-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["RangeAreaChart"],
    api: ["RangeAreaChartProps"],
    demos: [
      "forecast",
      "temperature",
      "fan",
      "price-range",
      "anomaly-band",
      "bid-ask",
      "climate-scenarios",
      "ab-test",
    ],
    native: {
      exports: ["RangeAreaChart"],
      api: ["RangeAreaChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-range-area-chart"],
      demos: ["forecast", "temperature"],
    },
  },
  {
    id: "bar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BarChart"],
    api: ["BarChartProps"],
    demos: [
      "basic",
      "stacked",
      "labels",
      "percent",
      "combo",
      "grouped",
      "profit-loss",
      "ranking",
      "target",
      "drilldown",
      "period-compare",
      "deployments",
      "ev-charging",
    ],
    native: {
      exports: ["BarChart"],
      api: ["BarChartProps"],
      demos: ["basic", "stacked"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-bar-chart"],
      demos: ["grouped", "stacked"],
    },
  },
  {
    id: "horizontal-bar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["HorizontalBarChart"],
    api: ["HorizontalBarChartProps"],
    demos: [
      "basic",
      "diverging",
      "progress",
      "long-labels",
      "grouped",
      "negative",
      "top-n",
      "race",
      "salary-bands",
      "error-budget",
    ],
    native: {
      exports: ["HorizontalBarChart"],
      api: ["HorizontalBarChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-horizontal-bar-chart"],
      demos: ["ranking", "survey"],
    },
  },
  {
    id: "mixed-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["MixedChart"],
    api: ["MixedChartProps", "ChartProps", "ChartLabels"],
    demos: [
      "revenue-growth",
      "climate",
      "conversion",
      "pareto",
      "log-scale",
      "locale",
      "solar-battery",
      "inventory",
      "ops-overview",
      "burndown",
    ],
    native: {
      exports: ["MixedChart"],
      api: ["MixedChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-mixed-chart"],
      demos: ["revenue-growth", "climate"],
    },
  },
  {
    id: "scatter-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["ScatterChart"],
    api: ["ScatterChartProps"],
    demos: [
      "basic",
      "labels",
      "trend",
      "categories",
      "outliers",
      "large-data",
      "zoom-controls",
      "selection",
      "players",
      "live-stream",
      "log-log",
    ],
    native: {
      exports: ["ScatterChart"],
      api: ["ScatterChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-scatter-chart"],
      demos: ["clusters", "point-click"],
    },
  },
  {
    id: "bubble-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BubbleChart", "bubbleSeries"],
    api: ["BubbleChartProps", "BubbleOptions"],
    demos: [
      "countries",
      "log-scale",
      "portfolio",
      "pipeline",
      "risk-matrix",
      "campaigns",
      "shared-scale",
      "playback",
    ],
    native: {
      exports: ["BubbleChart"],
      api: ["BubbleChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-bubble-chart"],
      demos: ["countries", "portfolio"],
    },
  },
  {
    id: "quadrant-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["QuadrantChart"],
    api: [
      "QuadrantChartProps",
      "QuadrantConfig",
      "QuadrantDropTarget",
      "QuadrantHeaderInfo",
      "QuadrantPoint",
      "QuadrantRegions",
      "QuadrantRegion",
      "QuadrantAxisLabels",
    ],
    demos: [
      "basic",
      "eisenhower",
      "draggable",
      "triage",
      "quadrant-header",
      "bcg",
      "risk",
      "positioning",
      "rice",
      "swot",
      "competitors",
      "talent",
      "live-services",
    ],
    native: {
      exports: ["QuadrantChart"],
      api: ["QuadrantChartProps", "QuadrantConfig", "QuadrantDropTarget"],
      demos: ["basic", "draggable", "triage"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-quadrant-chart"],
      demos: ["priorities", "point-click", "triage"],
    },
  },
  {
    // exported by minerva-design (it renders Modal, Input, Select...), built
    // on the quadrant chart of minerva-design/charts
    id: "quadrant-task-board",
    category: "charts",
    cssVars: ["QuadrantTaskBoard"],
    exports: ["QuadrantTaskBoard"],
    api: ["QuadrantTaskBoardProps", "QuadrantTaskLabels", "QuadrantConfig"],
    demos: ["basic", "custom-labels"],
    wc: {
      entry: "quadrant-task-board",
      tags: ["minerva-quadrant-task-board"],
      demos: ["basic"],
    },
    native: {
      exports: ["QuadrantTaskBoard"],
      api: ["QuadrantTaskBoardProps"],
      demos: ["basic"],
    },
  },
  {
    id: "histogram-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["HistogramChart", "binValues", "histogramSeries", "quantiles"],
    api: ["HistogramChartProps", "BinOptions", "HistogramBins"],
    demos: [
      "latency",
      "binning",
      "ages",
      "comparison",
      "quality-control",
      "order-values",
      "live-samples",
      "commute",
    ],
    native: {
      exports: ["HistogramChart"],
      api: ["HistogramChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-histogram-chart"],
      demos: ["latency", "binning"],
    },
  },
  {
    id: "boxplot-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BoxPlotChart", "boxplotStats", "boxplotData"],
    api: [
      "BoxPlotChartProps",
      "BoxplotGroup",
      "BoxplotStats",
      "BoxplotStatsOptions",
      "ChartTooltipLabels",
    ],
    demos: [
      "services",
      "horizontal",
      "grouped",
      "temperatures",
      "build-times",
      "wait-times",
      "asset-sizes",
      "live-regions",
    ],
    native: {
      exports: ["BoxPlotChart"],
      api: ["BoxPlotChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-box-plot-chart"],
      demos: ["services", "horizontal"],
    },
  },
  {
    id: "waterfall-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["WaterfallChart", "waterfallSeries"],
    api: [
      "WaterfallChartProps",
      "WaterfallStep",
      "WaterfallOptions",
      "ChartConnectorOptions",
    ],
    demos: [
      "pnl",
      "cash-flow",
      "variance",
      "headcount",
      "arr-bridge",
      "price-bridge",
      "emissions",
      "lead-time",
      "live-balance",
      "options",
    ],
    native: {
      exports: ["WaterfallChart"],
      api: ["WaterfallChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-waterfall-chart"],
      demos: ["pnl", "cash-flow"],
    },
  },
  {
    id: "gantt-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["GanttChart", "ganttSeries"],
    api: ["GanttChartProps", "GanttTask", "GanttOptions"],
    demos: [
      "project",
      "dependencies",
      "crews",
      "roadmap",
      "sprint",
      "locale",
      "release-train",
      "critical-path",
      "resources",
      "live-deploy",
      "onboarding",
      "daily",
    ],
    native: {
      exports: ["GanttChart"],
      api: ["GanttChartProps"],
      demos: ["basic", "daily"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-gantt-chart"],
      demos: ["project", "sprint", "daily"],
    },
  },
  {
    id: "heatmap-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["HeatmapChart"],
    api: ["HeatmapChartProps", "HeatmapConfig", "HeatmapCell"],
    demos: [
      "basic",
      "color-scale",
      "activity",
      "correlation",
      "retention",
      "large-grid",
      "conversion",
      "rack-temperatures",
      "confusion-matrix",
      "sales-regions",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-heatmap-chart"],
      demos: ["weekly-activity", "color-scale"],
    },
    native: {
      exports: ["HeatmapChart"],
      api: ["HeatmapChartProps"],
      demos: ["basic"],
    },
  },
  {
    id: "calendar-heatmap",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["CalendarHeatmap"],
    api: ["CalendarHeatmapProps", "CalendarDatum"],
    demos: [
      "contributions",
      "streak",
      "multi-year",
      "months",
      "locale",
      "energy",
      "sleep",
      "incidents",
      "habit-toggle",
    ],
    native: {
      exports: ["CalendarHeatmap"],
      api: ["CalendarHeatmapProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-calendar-heatmap"],
      demos: ["contributions", "months"],
    },
  },
  {
    id: "sparkline",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["Sparkline"],
    api: ["SparklineProps", "SparklineConfig"],
    demos: [
      "basic",
      "kpi-cards",
      "table",
      "watchlist",
      "inline",
      "servers",
      "hover-value",
      "step-goal",
      "weather",
      "periods",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-sparkline"],
      demos: ["kpi", "reference"],
    },
    native: {
      exports: ["Sparkline"],
      api: ["SparklineProps"],
      demos: ["basic"],
    },
  },
  {
    id: "pie-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["PieChart", "DonutChart"],
    api: [
      "PieChartProps",
      "DonutChartProps",
      "ShapeChartCommonProps",
      "ShapeDatum",
      "ShapeHoverEvent",
      "ShapeLegendOptions",
      "ShapeTooltipOptions",
    ],
    demos: [
      "basic",
      "donut",
      "rose",
      "labels",
      "market-share",
      "nested",
      "small-multiples",
      "portfolio",
      "live-poll",
      "drill-down",
      "survey-quarters",
    ],
    native: {
      exports: ["PieChart", "DonutChart"],
      api: [
        "PieChartProps",
        "DonutChartProps",
        "ShapeChartCommonProps",
        "ShapeChartFrameProps",
        "ShapeChartHandle",
      ],
      demos: ["basic", "donut"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-pie-chart", "minerva-donut-chart"],
      demos: ["pie", "donut"],
    },
  },
  {
    id: "radial-bar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["RadialBarChart"],
    api: ["RadialBarChartProps", "RadialBarDatum"],
    demos: [
      "activity",
      "okr",
      "quota",
      "styles",
      "savings-goals",
      "leaderboard",
      "uploads",
      "survey",
    ],
    native: {
      exports: ["RadialBarChart"],
      api: ["RadialBarChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-radial-bar-chart"],
      demos: ["activity", "okr"],
    },
  },
  {
    id: "radar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["RadarChart"],
    api: ["RadarChartProps", "RadarIndicator", "RadarSeries"],
    demos: [
      "basic",
      "compare",
      "circle",
      "players",
      "capabilities",
      "nutrition",
      "live-monitor",
      "review-360",
      "sales-targets",
    ],
    native: {
      exports: ["RadarChart"],
      api: ["RadarChartProps"],
      demos: ["basic", "compare"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-radar-chart"],
      demos: ["compare", "circle"],
    },
  },
  {
    id: "gauge-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["GaugeChart"],
    api: ["GaugeChartProps", "GaugeBand"],
    demos: [
      "basic",
      "bands",
      "live",
      "speedometer",
      "quota",
      "slo",
      "thermostat",
      "credit-score",
      "battery",
      "dark-panel",
    ],
    native: {
      exports: ["GaugeChart"],
      api: ["GaugeChartProps"],
      demos: ["basic", "bands"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-gauge-chart"],
      demos: ["bands", "needle"],
    },
  },
  {
    id: "bullet-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BulletChart"],
    api: ["BulletChartProps", "BulletDatum"],
    demos: [
      "sales",
      "vertical",
      "traffic-lights",
      "monthly",
      "long-names",
      "budget-tracker",
      "live-sensors",
      "training",
      "hiring-plan",
    ],
    native: {
      exports: ["BulletChart"],
      api: ["BulletChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-bullet-chart"],
      demos: ["kpis", "vertical"],
    },
  },
  {
    id: "funnel-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["FunnelChart"],
    api: ["FunnelChartProps"],
    demos: [
      "basic",
      "bars",
      "ecommerce",
      "recruiting",
      "compare",
      "campaigns",
      "what-if",
      "live-sale",
      "sales-pipeline",
    ],
    native: {
      exports: ["FunnelChart"],
      api: ["FunnelChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-funnel-chart"],
      demos: ["conversion", "bars"],
    },
  },
  {
    id: "treemap-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["TreemapChart"],
    api: ["TreemapChartProps", "TreemapNode"],
    demos: [
      "basic",
      "flat",
      "market-map",
      "bundle",
      "drill-down",
      "cloud-costs",
      "live-cluster",
      "metric-switch",
    ],
    native: {
      exports: ["TreemapChart"],
      api: ["TreemapChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-treemap-chart"],
      demos: ["nested", "flat"],
    },
  },
  {
    id: "sunburst-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["SunburstChart"],
    api: ["SunburstChartProps", "TreemapNode", "ShapeDrillEvent"],
    demos: [
      "disk-usage",
      "drill-down",
      "org",
      "labels",
      "city-budget",
      "time-tracking",
      "live-requests",
      "energy-mix",
    ],
    native: {
      exports: ["SunburstChart"],
      api: ["SunburstChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-sunburst-chart"],
      demos: ["disk-usage", "drill-down"],
    },
  },
  {
    id: "sankey-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["SankeyChart"],
    api: ["SankeyChartProps", "SankeyNode", "SankeyLink"],
    demos: [
      "energy",
      "journey",
      "budget",
      "options",
      "income-statement",
      "supply-chain",
      "hiring-funnel",
      "live-traffic",
      "plastic",
    ],
    native: {
      exports: ["SankeyChart"],
      api: ["SankeyChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-sankey-chart"],
      demos: ["energy", "journey"],
    },
  },

  // Finance and trading charts
  {
    id: "candlestick-chart",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["CandlestickChart"],
    api: ["CandlestickChartProps"],
    demos: [
      "basic",
      "bar-styles",
      "moving-average",
      "ma-ribbon",
      "volume",
      "volume-colors",
      "a-share",
      "events",
      "intraday",
      "live",
      "large-data",
      "dark",
      "patterns",
      "watchlist",
      "fx-pips",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-candlestick-chart"],
      demos: ["ohlc", "moving-average"],
    },
    native: {
      exports: ["CandlestickChart"],
      api: ["CandlestickChartProps"],
      demos: ["basic"],
    },
  },
  {
    id: "trading-chart",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["TradingChart"],
    api: [
      "TradingChartProps",
      "TradingChartOptions",
      "TradingChartHandle",
      "TradingBar",
      "TradingBarColumns",
      "TradingPriceLine",
      "TradingMarker",
      "TradingCompareSeries",
      "TradingDrawing",
      "TradingDrawingPoint",
      "TradingChartLabels",
      "TradingCrosshairEvent",
      "TradingClickEvent",
      "TradingOrderMoveEvent",
      "TradingVisibleRange",
      "TradingIndicatorToggleEvent",
      "TradingHistoryRequestEvent",
      "TradingVolumeProfileOptions",
      "TradingOrderCreateEvent",
      "TradingOrderCancelEvent",
      "TradingReplayState",
      "TradingUndoState",
      "TradingSyncOptions",
    ],
    demos: [
      "pro-terminal",
      "streaming",
      "tick-chart",
      "chart-styles",
      "drawing-tools",
      "volume-profile",
      "orders",
      "order-entry",
      "multi-chart",
      "replay",
      "compare",
      "sessions",
      "history",
      "million-bars",
      "export",
      "red-up",
      "dark-terminal",
      "price-alerts",
      "trade-journal",
      "mobile",
    ],
    wc: {
      entry: "trading-chart",
      tags: ["minerva-trading-chart"],
      demos: ["candles", "streaming"],
    },
  },
  {
    id: "technical-indicators",
    category: "financeCharts",
    package: "minerva-design/charts/core",
    exports: [
      "createTradingChart",
      "sma",
      "ema",
      "wma",
      "bollinger",
      "macd",
      "rsi",
      "kdj",
      "atr",
      "vwap",
      "heikinAshi",
      "psar",
      "ichimoku",
      "supertrend",
      "keltner",
      "donchian",
      "obv",
      "cci",
      "stochRsi",
      "dmi",
      "williamsR",
      "mfi",
      "volumeProfile",
      "resampleBars",
      "syncCharts",
    ],
    api: [
      "TradingMovingAverageIndicator",
      "TradingBollingerIndicator",
      "TradingVwapIndicator",
      "TradingVolumeIndicator",
      "TradingMacdIndicator",
      "TradingRsiIndicator",
      "TradingKdjIndicator",
      "TradingAtrIndicator",
      "TradingParabolicSarIndicator",
      "TradingIchimokuIndicator",
      "TradingSupertrendIndicator",
      "TradingKeltnerIndicator",
      "TradingDonchianIndicator",
      "TradingObvIndicator",
      "TradingCciIndicator",
      "TradingStochRsiIndicator",
      "TradingDmiIndicator",
      "TradingWilliamsRIndicator",
      "TradingMfiIndicator",
      "TradingIndicatorBase",
      "TradingPaneIndicatorBase",
      "TradingVolumeProfile",
      "TradingChartInstance",
      "TradingChartEventMap",
    ],
    demos: [
      "moving-averages",
      "bollinger",
      "channels",
      "ichimoku",
      "supertrend",
      "vwap",
      "macd",
      "rsi",
      "oscillators",
      "kdj",
      "dmi",
      "atr",
      "obv",
      "heikin-ashi",
      "signals",
      "vanilla",
      "divergence",
      "multi-timeframe",
      "screener",
    ],
    wc: {
      entry: "trading-chart",
      tags: [],
      demos: ["bollinger", "panes"],
    },
  },
  {
    id: "depth-chart",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["DepthChart"],
    api: [
      "DepthChartProps",
      "DepthChartHandle",
      "DepthChartOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "DepthChartLabels",
      "DepthChartPriceLine",
      "DepthPoint",
      "OrderBookSnapshot",
      "OrderBookDelta",
    ],
    demos: [
      "basic",
      "live",
      "range",
      "walls",
      "dark",
      "compact",
      "red-up",
      "slippage",
      "imbalance",
      "equity",
      "venues",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-depth-chart"],
      demos: ["book", "live"],
    },
  },
  {
    id: "order-book",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["OrderBook"],
    api: [
      "OrderBookProps",
      "OrderBookHandle",
      "OrderBookOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "OrderBookLabels",
      "OrderBookLevelEvent",
      "OrderBookSnapshot",
      "OrderBookDelta",
      "OrderBookLevelColumns",
    ],
    demos: [
      "basic",
      "live",
      "grouping",
      "large-orders",
      "modes",
      "terminal",
      "dark",
      "compact",
      "red-up",
      "markets",
      "wall-watch",
      "order-ticket",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-order-book"],
      demos: ["ladder", "live"],
    },
  },
  {
    id: "order-book-heatmap",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["OrderBookHeatmap"],
    api: [
      "OrderBookHeatmapProps",
      "OrderBookHeatmapHandle",
      "OrderBookHeatmapOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "OrderBookHeatmapLabels",
      "OrderBookHeatmapHoverEvent",
      "MarketTrade",
    ],
    demos: [
      "basic",
      "live",
      "color-scale",
      "large-trades",
      "dark",
      "compact",
      "red-up",
      "price-resolution",
      "time-window",
      "linked",
      "perpetual",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-order-book-heatmap"],
      demos: ["liquidity", "red-up"],
    },
  },
  {
    id: "time-and-sales",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["TimeAndSales"],
    api: [
      "TimeAndSalesProps",
      "TimeAndSalesHandle",
      "TimeAndSalesOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "TimeAndSalesLabels",
      "TimeAndSalesRowEvent",
      "MarketTrade",
      "TimeAndSalesInstance",
    ],
    demos: [
      "basic",
      "live",
      "large-trades",
      "filters",
      "large-data",
      "dark",
      "compact",
      "red-up",
      "pressure",
      "clock",
      "block-alerts",
      "split",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-time-and-sales"],
      demos: ["tape", "large-trades"],
    },
  },

  // 3D charts
  {
    id: "scatter-3d-chart",
    category: "charts3d",
    package: "minerva-design/charts",
    exports: ["Scatter3DChart", "Line3DChart"],
    api: [
      "Scatter3DChartProps",
      "Line3DChartProps",
      "Chart3DCommonProps",
      "Chart3DHandle",
      "Scatter3DSeries",
      "Line3DSeries",
      "Chart3DSeriesBase",
      "Chart3DPoint",
      "Chart3DColumnData",
      "Chart3DAxisOptions",
      "Chart3DCameraOptions",
      "Chart3DCameraState",
      "Chart3DInteractionOptions",
      "Chart3DColorBarOptions",
      "Chart3DHoverEvent",
      "Chart3DLabels",
    ],
    demos: [
      "clusters",
      "galaxy",
      "color-by-value",
      "auto-rotate",
      "camera",
      "trajectory",
      "renderer",
      "embeddings",
      "lidar",
      "satellites",
      "portfolio-risk",
    ],
    wc: {
      entry: "chart-3d",
      tags: ["minerva-scatter-3d-chart", "minerva-line-3d-chart"],
      demos: ["clusters", "trajectory"],
    },
  },
  {
    id: "surface-3d-chart",
    category: "charts3d",
    package: "minerva-design/charts",
    exports: ["Surface3DChart"],
    api: [
      "Surface3DChartProps",
      "Surface3DSeries",
      "Surface3DData",
      "Surface3DWireframeOptions",
      "Surface3DContourOptions",
      "Chart3DLightingOptions",
      "Chart3DCommonProps",
      "Chart3DSeriesBase",
    ],
    demos: [
      "functions",
      "terrain",
      "volatility",
      "wireframe-contours",
      "transparency",
      "live-wave",
      "heat-diffusion",
      "yield-curve",
      "loss-landscape",
      "wifi-signal",
    ],
    wc: {
      entry: "chart-3d",
      tags: ["minerva-surface-3d-chart"],
      demos: ["ripple", "terrain"],
    },
  },
  {
    id: "bar-3d-chart",
    category: "charts3d",
    package: "minerva-design/charts",
    exports: ["Bar3DChart"],
    api: [
      "Bar3DChartProps",
      "Bar3DSeries",
      "Bar3DDatum",
      "Chart3DCommonProps",
      "Chart3DSeriesBase",
      "Chart3DLegendOptions",
      "Chart3DTooltipOptions",
    ],
    demos: [
      "sales",
      "stacked",
      "pyramid",
      "traffic",
      "margin",
      "inventory-live",
      "cohort-retention",
      "budget-variance",
      "datacenter",
    ],
    wc: {
      entry: "chart-3d",
      tags: ["minerva-bar-3d-chart"],
      demos: ["sales", "stacked"],
    },
  },

  // Relationship and hierarchy charts
  // @graph-pages: graph-chart, dependency-graph, tree-chart (engine/graph)
  {
    id: "graph-chart",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["GraphChart"],
    api: [
      "GraphChartProps",
      "GraphCommonProps",
      "GraphChartHandle",
      "GraphNode",
      "GraphEdge",
      "GraphGroup",
      "GraphForceOptions",
      "GraphCircularOptions",
      "GraphInteractionOptions",
      "GraphLegendOptions",
      "GraphTooltipOptions",
      "GraphHoverEvent",
      "GraphChartLabels",
      "GraphChartOptions",
      "GraphChartInstance",
      "GraphChartEventMap",
      "GraphForceLayoutOptions",
      "GraphForceSimulation",
    ],
    demos: [
      "characters",
      "large-network",
      "transitions",
      "circular",
      "arc",
      "vanilla",
      "service-map",
      "knowledge-graph",
      "friend-suggestions",
      "fraud-ring",
    ],
    wc: {
      entry: "graph",
      tags: ["minerva-graph-chart"],
      demos: ["routes", "circular"],
    },
  },
  {
    id: "dependency-graph",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["DependencyGraph"],
    api: [
      "DependencyGraphProps",
      "GraphDagOptions",
      "GraphCriticalPath",
      "GraphDagLayoutOptions",
      "GraphDagLayoutResult",
    ],
    demos: [
      "packages",
      "pipeline",
      "lineage",
      "build-scheduler",
      "project-plan",
      "impact-analysis",
      "course-prerequisites",
      "spreadsheet",
    ],
    wc: {
      entry: "graph",
      tags: ["minerva-dependency-graph"],
      demos: ["pipeline", "modules"],
    },
  },
  {
    id: "tree-chart",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["TreeChart"],
    api: [
      "TreeChartProps",
      "GraphTreeOptions",
      "GraphToggleEvent",
      "GraphTreeLayoutOptions",
      "GraphTreeLayoutResult",
    ],
    demos: [
      "org-chart",
      "mind-map",
      "radial",
      "file-tree",
      "decision-tree",
      "taxonomy-search",
      "disk-usage",
      "wbs",
      "bracket",
    ],
    wc: {
      entry: "graph",
      tags: ["minerva-tree-chart"],
      demos: ["org", "mind-map"],
    },
  },
  // @chord-pages: chord-chart (shape engine)
  {
    id: "chord-chart",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["ChordChart"],
    api: ["ChordChartProps", "ChordGroup", "ChordLink"],
    demos: [
      "basic",
      "migration",
      "dependencies",
      "trade",
      "directed",
      "dark",
      "options",
      "brand-switching",
      "focus",
      "co-purchase",
      "live",
      "legend",
    ],
    native: {
      exports: ["ChordChart"],
      api: ["ChordChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-chord-chart"],
      demos: ["teams", "migration"],
    },
  },

  // Chart engine, performance and the other platforms
  {
    id: "chart-engine",
    category: "chartEngine",
    package: "minerva-design/charts/core",
    exports: [
      "createChart",
      "createCanvasChart",
      "createChartController",
      "scenePrimitives",
      "createShapeChart",
      "createCanvasShapeChart",
      "quadrantChartOptions",
      "quadrantOf",
      "quadrantCenter",
      "quadrantGroups",
      "quadrantLabels",
      "quadrantCountText",
      "quadrantAccessibleGroups",
      "quadrantKeyTarget",
      "createQuadrantPointLayer",
      "createQuadrantPointCard",
      "withQuadrantCard",
      "QUADRANT_CARD_LINGER_MS",
      "QUADRANT_CORNERS",
      "quadrantTaskLabels",
      "newQuadrantTaskDraft",
      "editQuadrantTaskDraft",
      "canSaveQuadrantTask",
      "applyQuadrantTaskDraft",
      "moveQuadrantTask",
      "removeQuadrantTask",
      "selectionAfterRemove",
      "quadrantTaskDeleteText",
      "placeQuadrantTaskPanel",
      "quadrantTaskColor",
      "quadrantTaskIconUri",
      "QUADRANT_TASK_ICONS",
      "heatmapChartOptions",
      "sparklineOptions",
      "formatCompact",
      "binValues",
      "histogramSeries",
      "quantiles",
      "boxplotStats",
      "boxplotData",
      "bubbleSeries",
      "waterfallSeries",
      "ganttSeries",
      "createTradingChart",
      "createDepthChart",
      "createOrderBook",
      "createOrderBookHeatmap",
      "createTimeAndSales",
      "createOrderBookStore",
      "createChart3D",
      "withSeriesType",
      "lineSeries",
      "areaSeries",
      "rangeAreaSeries",
      "barSeries",
      "scatterSeries",
      "candlestickSeries",
      "boxplotSeries",
      "formatDuration",
      "createGraphChart",
      "createForceSimulation",
      "forceLayout",
      "dagLayout",
      "countCrossings",
      "criticalPath",
      "treeLayout",
      "circularLayout",
      "arcLayout",
      "getDefaultChartRenderer",
      "setDefaultChartRenderer",
      "subscribeDefaultChartRenderer",
      "formatValue",
    ],
    api: [
      "ChartOptions",
      "ChartInstance",
      "ChartEventMap",
      "ChartDragEvent",
      "ChartDragEndEvent",
      "ChartRect",
      "CanvasChartConfig",
      "CanvasChartInstance",
      "ChartCanvas",
      "ChartTouch",
      "ChartPointerOptions",
      "ChartThemeInput",
      "ChartControllerConfig",
      "ChartController",
      "ChartPrimitiveOptions",
      "ChartLinePrimitive",
      "ChartAreaPrimitive",
      "ChartBarPrimitive",
      "ChartDotPrimitive",
      "ShapeChartInstance",
      "ShapeChartEventMap",
      "PieChartOptions",
      "RadarChartOptions",
      "GaugeChartOptions",
      "FunnelChartOptions",
      "TreemapChartOptions",
      "ShapeChartCommonOptions",
      "CanvasShapeChartConfig",
      "CanvasShapeChartInstance",
    ],
    demos: ["basic", "streaming", "canvas", "shapes"],
  },
  {
    id: "chart-performance",
    category: "chartEngine",
    package: "minerva-design/charts",
    exports: ["LineChart", "ScatterChart", "CandlestickChart", "Chart"],
    demos: ["line", "scatter", "candles", "heatmap", "streaming", "compare"],
    wc: {
      entry: "chart",
      tags: [],
      demos: ["million", "scatter"],
    },
  },
  {
    id: "chart-renderers",
    category: "chartEngine",
    demos: ["environment", "benchmark", "scaling", "switching", "fallback"],
  },
  { id: "mini-program-charts", category: "chartEngine" },

  // Web Components (guides; every component page has a "Web Components" tab)
  {
    id: "web-components",
    category: "webComponents",
    package: "minerva-design/web-components",
    // Utilities of the package (the elements are documented on their pages)
    exports: [
      "defineElement",
      "emit",
      "MinervaElement",
      "hostStyles",
      "FormAssociatedElement",
      "LocaleController",
      "resolveLanguage",
      "AriaController",
      "HasSlotController",
      "AnchoredPositionController",
      "DismissableLayerController",
      "FocusScopeController",
      "ModalController",
      "RovingFocusController",
      "TypeaheadController",
      "FloatingLayerController",
      "popoverResetStyles",
      // helpers re-exported next to their elements
      "matchesShortcut",
      "normalizeShortcuts",
      "computeFixedColumnLayout",
      "SUBMENU_OPEN_DELAY",
      "LONG_PRESS_DELAY",
      "MinervaContextMenu",
      // imperative confirmation (documented on the Confirm page)
      "confirm",
      "confirmFor",
      "confirmScopeOf",
    ],
    demos: ["react"],
  },
  { id: "wc-plain-html", category: "webComponents" },
  { id: "wc-vue", category: "webComponents" },
  { id: "wc-angular", category: "webComponents" },
  { id: "wc-svelte", category: "webComponents" },
  { id: "wc-forms", category: "webComponents" },
  { id: "wc-theming", category: "webComponents" },
  {
    id: "nav-bar",
    category: "mobile",
    native: {
      exports: ["NavBar"],
      api: ["NavBarProps"],
      demos: ["actions", "basic"],
    },
  },
  {
    id: "tab-bar",
    category: "mobile",
    native: {
      exports: ["TabBar", "TabBarItem"],
      api: ["TabBarProps", "TabBarItemProps"],
      demos: ["badges", "basic"],
    },
  },
  {
    id: "pull-refresh",
    category: "mobile",
    native: {
      exports: ["PullRefresh", "usePullRefresh"],
      api: [
        "PullRefreshProps",
        "UsePullRefreshOptions",
        "UsePullRefreshResult",
      ],
      demos: ["basic", "use-pull-refresh"],
    },
  },
  {
    id: "swipe-cell",
    category: "mobile",
    native: {
      exports: ["SwipeCell"],
      api: ["SwipeCellProps", "SwipeCellAction", "SwipeCellHandle"],
      demos: ["basic", "custom-actions"],
    },
  },
  {
    id: "collapse",
    category: "mobile",
    native: {
      exports: ["Collapse", "CollapseItem"],
      api: ["CollapseProps", "CollapseItemProps"],
      demos: ["accordion", "basic"],
    },
  },
  {
    id: "grid",
    category: "mobile",
    native: {
      exports: ["Grid", "GridItem"],
      api: ["GridProps", "GridItemProps"],
      demos: ["basic", "square-columns"],
    },
  },
  {
    id: "image-preview",
    category: "mobile",
    native: {
      exports: ["ImagePreview"],
      api: ["ImagePreviewProps"],
      demos: ["basic", "controlled"],
    },
  },

  // Icons (minerva-design/icons: custom SVG icons, also drawn by the GPU)
  {
    id: "icons",
    category: "icons",
    package: "minerva-design/icons/core",
    exports: ["icons", "iconCategories", "getIcon", "searchIcons"],
    demos: ["gallery"],
  },
  {
    id: "icon",
    category: "icons",
    package: "minerva-design/icons",
    exports: ["Icon", "createIcon", "DynamicIcon"],
    api: ["IconProps", "DynamicIconProps"],
    demos: [
      "basic",
      "size-color",
      "stroke",
      "accessibility",
      "custom",
      "dynamic",
      "canvas",
    ],
    wc: {
      entry: "icon",
      tags: ["minerva-icon"],
      demos: ["basic", "canvas"],
    },
    native: {
      package: "minerva-design/native/icons",
      exports: ["Icon", "createIcon", "DynamicIcon", "SearchIcon"],
      api: ["IconProps", "DynamicIconProps"],
      demos: ["basic"],
    },
  },
  {
    id: "icon-canvas",
    category: "icons",
    package: "minerva-design/icons",
    exports: ["IconCanvas"],
    api: ["IconCanvasProps", "IconCanvasItem", "IconStyle", "IconCanvasHandle"],
    demos: ["basic", "thousands", "renderers"],
    wc: {
      entry: "icon",
      tags: ["minerva-icon-canvas"],
      demos: ["basic"],
    },
  },
  {
    id: "icons-core",
    category: "icons",
    package: "minerva-design/icons/core",
    exports: [
      "toSvg",
      "toSvgDataUri",
      "toSvgBase64DataUri",
      "iconPathData",
      "drawIcon",
      "defineIcon",
      "createIconCanvas",
      "createIconSurface",
      "setDefaultIconRenderer",
      "getDefaultIconRenderer",
      "subscribeDefaultIconRenderer",
      "ICON_RENDERER_PREFERENCES",
      "ICON_RENDERER_ORDER",
      "iconRendererCandidates",
      "parseIconPath",
      "flattenIconPath",
      "tessellateIcon",
    ],
    api: [
      "IconDefinition",
      "IconSvgOptions",
      "DrawIconOptions",
      "IconCanvasOptions",
      "IconCanvasController",
      "IconSurfaceOptions",
      "IconSurface",
      "IconMeshOptions",
      "IconPolyline",
    ],
    demos: ["svg-string", "canvas2d", "controller", "geometry"],
  },
];

export const getDocPage = (id: string) => docPages.find((p) => p.id === id);

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

### apps/docs/src/docs/pages/chart-performance/showcase/meter.ts

```tsx
import { useEffect, useRef, useState, type RefObject } from "react";

/** Measured over the last half second */
export interface FrameStats {
  /** Frames per second */
  fps: number;
  /** Average time between two frames, in ms */
  frame: number;
  /**
   * Average main-thread time of a frame, in ms: animation callbacks (the
   * chart's draw calls included), style, layout and paint
   */
  work: number;
}

/** Whether the element is on screen (or within `margin` of it) */
export function useInView(
  ref: RefObject<Element | null>,
  margin = "0px",
): boolean {
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(!!entry?.isIntersecting),
      { rootMargin: margin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, margin]);
  return inView;
}

export interface FrameLoopHandlers {
  /** Every animation frame (move the camera here) */
  onFrame?: (time: number) => void;
  /** Main-thread time of each frame, once the frame is painted */
  onWork?: (ms: number) => void;
  /** Every half second */
  onStats?: (stats: FrameStats) => void;
}

/**
 * Runs an animation-frame loop while `running` and measures it. The
 * main-thread time of a frame is read from a message posted during the
 * frame: messages run after the frame's rendering work.
 */
export function useFrameLoop(
  running: boolean,
  handlers: FrameLoopHandlers = {},
): FrameStats | null {
  const [stats, setStats] = useState<FrameStats | null>(null);
  const handlersRef = useRef(handlers);
  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    if (!running) return;
    let id = 0;
    let windowStart = 0;
    let frames = 0;
    let work = 0;
    let works = 0;
    const channel = new MessageChannel();
    channel.port1.onmessage = (event: MessageEvent<number>) => {
      const ms = performance.now() - event.data;
      work += ms;
      works++;
      handlersRef.current.onWork?.(ms);
    };
    const loop = (time: number) => {
      id = requestAnimationFrame(loop);
      channel.port2.postMessage(time);
      if (windowStart) frames++;
      else windowStart = time;
      handlersRef.current.onFrame?.(time);
      const elapsed = time - windowStart;
      if (elapsed >= 500 && frames > 0) {
        const next = {
          fps: (frames * 1000) / elapsed,
          frame: elapsed / frames,
          work: works ? work / works : 0,
        };
        setStats(next);
        handlersRef.current.onStats?.(next);
        windowStart = time;
        frames = 0;
        work = 0;
        works = 0;
      }
    };
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      channel.port1.close();
      channel.port2.close();
    };
  }, [running]);

  return stats;
}

/** Calls `callback` once the next frame has been painted */
export function afterNextPaint(callback: () => void) {
  requestAnimationFrame(() => setTimeout(callback, 0));
}

/** Whether the user asked for reduced motion */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

```

### apps/docs/src/docs/pages/chart-performance/showcase/text.ts

```tsx
import { useTranslation } from "react-i18next";
import type { ChartRendererPreference } from "minerva-design/charts";
import styles from "./showcase.module.scss";

export const RENDERERS: readonly ChartRendererPreference[] = [
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

/** Color of a frame rate */
export const fpsClass = (fps: number) =>
  fps >= 50 ? styles.good : fps >= 25 ? styles.fair : styles.poor;

/** Localized numbers, durations and backend names of the showcases */
export const useShowcaseFormat = () => {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
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
  return {
    count: (value: number) => number.format(Math.round(value)),
    /** 1M, 240K, 100万… */
    compact: (value: number) => compact.format(value),
    ms: (value: number) =>
      t("ms", {
        value:
          value < 100
            ? decimal.format(value)
            : number.format(Math.round(value)),
      }),
    renderer: (kind: ChartRendererPreference) => t(`renderers.${kind}`),
  };
};

```

### apps/docs/src/docs/pages/chart-performance/showcase/showcase.module.scss

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
  justify-content: space-between;
  gap: 8px 16px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-color);
}

.hud {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(92px, 1fr));
  gap: 1px;
  margin: 0;
  border-bottom: 1px solid var(--border-color);
  background: var(--border-color);
}

.stat {
  min-width: 0;
  padding: 8px 10px;
  background: var(--surface-subtle-color);

  dt {
    overflow: hidden;
    font-size: 11px;
    letter-spacing: 0.02em;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
    color: var(--text-muted-color);
  }

  dd {
    margin: 2px 0 0;
    overflow: hidden;
    font-family: var(--font-family-mono);
    font-size: 16px;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-color);
  }
}

.good {
  color: var(--success-color) !important;
}

.fair {
  color: var(--warning-color) !important;
}

.poor {
  color: var(--danger-color) !important;
}

.chart {
  position: relative;
  padding: 8px 8px 0;
}

.loading {
  display: grid;
  place-items: center;
  height: 100%;
}

.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 16px;
  padding: 8px 14px 12px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary-color);

  p {
    margin: 0;
  }
}

.fallback {
  color: var(--warning-color);
}

.hint {
  color: var(--text-muted-color);
}

// ------------------------------------------------------------ comparison

.compareGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1px;
  background: var(--border-color);
}

.panel {
  min-width: 0;
  padding: 10px 12px 8px;
  background: var(--surface-color);
}

.panelActive {
  box-shadow: inset 0 0 0 2px var(--primary-color);
}

.panelNote {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
  min-height: 28px;
  padding-top: 4px;
  font-size: 12px;
  line-height: 1.4;
  color: var(--text-secondary-color);
}

.panelHeader {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 4px 8px;
  margin-bottom: 4px;
  font-size: 13px;

  strong {
    font-size: 14px;
    color: var(--text-color);
  }
}

.result {
  font-family: var(--font-family-mono);
  font-variant-numeric: tabular-nums;
  color: var(--text-secondary-color);
}

.results {
  padding: 12px 14px;
  border-top: 1px solid var(--border-color);
}

.bars {
  display: grid;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 13px;
}

.barsTitle {
  margin: 0 0 8px;
  font-size: 12px;
  color: var(--text-muted-color);
}

.bar {
  display: grid;
  grid-template-columns: minmax(84px, 120px) 1fr minmax(120px, auto);
  align-items: center;
  gap: 10px;
  color: var(--text-secondary-color);
}

.barTrack {
  display: block;
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--surface-muted-color);
  overflow: hidden;
}

.barFill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--primary-color);
  transition: width 0.4s ease;
}

```

## Example: Real-time streaming

Twelve channels receiving 2,000 samples per second each (24,000 points/s) in a 10-second sliding window: preallocated typed arrays, subarray() views and one setOptions per frame, with the framework-free createChart.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chart-performance/demos/streaming.tsx

```tsx
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  createChart,
  type ChartInstance,
  type ChartOptions,
  type ChartRendererPreference,
} from "minerva-design/charts/core";
import { Showcase, type ShowcaseChartProps } from "../showcase/Showcase";
import { useShowcaseFormat } from "../showcase/text";

const CHANNELS = 12;
/** Samples per channel and per second */
const RATE = 2_000;
/** Samples per channel on screen: a 10 s sliding window */
const WINDOW = 20_000;
/** Preallocated: the window slides inside, then is copied back to the start */
const CAPACITY = WINDOW * 4;
const STEP = 1000 / RATE;

interface Stream {
  x: Float64Array;
  y: Float64Array[];
  /** End of the filled part */
  end: number;
  /** Samples written so far */
  samples: number;
  start: number;
  random: () => number;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Appends `count` samples to every channel */
function append(stream: Stream, count: number) {
  const { x, y, random } = stream;
  if (stream.end + count > CAPACITY) {
    // slide: keep the last window, reuse the same memory
    const from = stream.end - WINDOW;
    x.copyWithin(0, from, stream.end);
    for (const column of y) column.copyWithin(0, from, stream.end);
    stream.end = WINDOW;
  }
  for (let i = 0; i < count; i++) {
    x[stream.end + i] = stream.start + (stream.samples + i) * STEP;
  }
  y.forEach((column, c) => {
    for (let i = 0; i < count; i++) {
      const t = (stream.samples + i) / RATE;
      const burst = Math.sin(t * 0.7 + c) > 0.85 ? 2.4 : 0;
      column[stream.end + i] =
        (CHANNELS - 1 - c) * 10 +
        Math.sin(2 * Math.PI * (1.5 + c * 0.6) * t) * 2.2 +
        Math.sin(2 * Math.PI * 0.25 * t + c) * 1.2 +
        Math.sin(2 * Math.PI * 23 * t) * burst +
        (random() - 0.5) * 1.6;
    }
  });
  stream.end += count;
  stream.samples += count;
}

function createStream(): Stream {
  const stream: Stream = {
    x: new Float64Array(CAPACITY),
    y: Array.from({ length: CHANNELS }, () => new Float64Array(CAPACITY)),
    end: 0,
    samples: 0,
    start: Date.now() - WINDOW * STEP,
    random: mulberry32(12),
  };
  append(stream, WINDOW);
  return stream;
}

interface Labels {
  channel: (index: number) => string;
  aria: string;
}

/** New subarray views of the filled part: a new identity, the same memory */
function optionsOf(
  stream: Stream,
  renderer: ChartRendererPreference,
  labels: Labels,
): ChartOptions {
  const from = Math.max(0, stream.end - WINDOW);
  const x = stream.x.subarray(from, stream.end);
  return {
    series: stream.y.map((column, c) => ({
      id: `channel-${c}`,
      name: labels.channel(c + 1),
      data: { x, y: column.subarray(from, stream.end) },
      lineWidth: 1,
    })),
    renderer,
    xAxis: { type: "time" },
    yAxis: { min: -6, max: CHANNELS * 10 - 4, visible: false },
    legend: false,
    tooltip: { mode: "nearest" },
    interaction: false,
    ariaLabel: labels.aria,
  };
}

function Channels({
  renderer,
  running,
  onRendererChange,
}: ShowcaseChartProps<boolean>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<ChartInstance | null>(null);
  const streamRef = useRef<Stream | null>(null);
  const labels: Labels = {
    channel: (index) => t("channel", { index }),
    aria: t("streamAria", { value: CHANNELS }),
  };
  const latest = useRef({ labels, renderer, onRendererChange });
  useEffect(() => {
    latest.current = { labels, renderer, onRendererChange };
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const stream = createStream();
    streamRef.current = stream;
    const { renderer: initial, labels: initialLabels } = latest.current;
    const instance = createChart(
      container,
      optionsOf(stream, initial, initialLabels),
    );
    instanceRef.current = instance;
    const off = instance.on("renderer", (kind) =>
      latest.current.onRendererChange(kind),
    );
    return () => {
      off();
      instance.destroy();
      instanceRef.current = null;
      streamRef.current = null;
    };
  }, []);

  // a new backend: the chart starts it and redraws
  useEffect(() => {
    const stream = streamRef.current;
    if (stream)
      instanceRef.current?.setOptions(
        optionsOf(stream, renderer, latest.current.labels),
      );
  }, [renderer]);

  // one setOptions per frame, however many samples arrived
  useEffect(() => {
    if (!running) return;
    let id = 0;
    let last = 0;
    let pending = 0;
    const tick = (time: number) => {
      id = requestAnimationFrame(tick);
      const stream = streamRef.current;
      const instance = instanceRef.current;
      if (!stream || !instance) return;
      pending += (Math.min(100, last ? time - last : 16) * RATE) / 1000;
      last = time;
      const count = Math.floor(pending);
      if (!count) return;
      pending -= count;
      append(stream, count);
      const { renderer: current, labels: names } = latest.current;
      instance.setOptions(optionsOf(stream, current, names));
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [running]);

  return <div ref={containerRef} style={{ height: 400, width: "100%" }} />;
}

const ready = () => Promise.resolve(true);

export default function StreamingDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  const { compact } = useShowcaseFormat();
  return (
    <Showcase
      load={ready}
      chart={Channels}
      count={CHANNELS * WINDOW}
      countLabel={t("stats.points")}
      height={400}
      motionLabel={t("stream")}
      hint={t("hintStream")}
      extra={{
        label: t("stats.ingest"),
        value: t("perSecond", { value: compact(CHANNELS * RATE) }),
      }}
    />
  );
}

```

### apps/docs/src/docs/pages/chart-performance/showcase/Showcase.tsx

```tsx
import {
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type RefObject,
} from "react";
import { useTranslation } from "react-i18next";
import { LoadingState, Radio, RadioGroup, Switch } from "minerva-design";
import type {
  ChartHandle,
  ChartRendererKind,
  ChartRendererPreference,
  ChartView,
} from "minerva-design/charts";
import { ChartRendererContext } from "../../../renderer/context";
import {
  autoPick,
  probeBackends,
  type BackendsSupport,
} from "../../../renderer/support";
import type { Range } from "./data";
import {
  afterNextPaint,
  prefersReducedMotion,
  useFrameLoop,
  useInView,
} from "./meter";
import { RENDERERS, fpsClass, useShowcaseFormat } from "./text";
import styles from "./showcase.module.scss";

/** Stops the tour when a frame takes longer than this (ms of main thread) */
const SLOW_FRAME = 250;

/** Props a showcase gives to its chart component */
export interface ShowcaseChartProps<T> {
  /** The generated data set */
  data: T;
  /** Chart handle (the camera tour moves the view through it) */
  chartRef: RefObject<ChartHandle | null>;
  /** Backend picked in the selector */
  renderer: ChartRendererPreference;
  /** Reports the backend that actually started */
  onRendererChange: (kind: ChartRendererKind) => void;
  /** Fits the y axis to the zoomed x range */
  onZoom: (view: ChartView) => void;
  /** On screen and not paused (streaming demos run while true) */
  running: boolean;
}

export interface ShowcaseProps<T> {
  /** Loads the data set (generated once, when the showcase nears the screen) */
  load: () => Promise<T>;
  /** Draws the data set */
  chart: ComponentType<ShowcaseChartProps<T>>;
  /** Number of marks drawn */
  count: number;
  /** What `count` counts ("Points", "Cells", ...) */
  countLabel: string;
  /** Height of the chart in px */
  height: number;
  /** Label of the motion switch (camera tour, stream) */
  motionLabel: string;
  /** Interaction hint under the chart */
  hint: string;
  /** Camera path: the view at `time` seconds into the tour */
  tour?: (data: T, time: number, base: ChartView) => Partial<ChartView>;
  /** The y range to show for an x range (zoomable x only) */
  fit?: (data: T, x: Range) => Range | null;
  /** One more statistic */
  extra?: { label: string; value: string };
}

/**
 * A chart under test: renderer selector, live statistics (frame rate,
 * frame time, main-thread time, marks, time to first frame), a camera tour
 * and the backend that actually started. The data is generated when the
 * showcase nears the screen; the loop only runs while it is visible.
 */
export function Showcase<T>({
  load,
  chart: Plot,
  count,
  countLabel,
  height,
  motionLabel,
  hint,
  tour,
  fit,
  extra,
}: ShowcaseProps<T>) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  const text = useShowcaseFormat();
  const rootRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartHandle>(null);
  const near = useInView(rootRef, "300px");
  const visible = useInView(rootRef);
  const [data, setData] = useState<{ value: T } | null>(null);
  const [renderer, setRenderer] = useState<ChartRendererPreference>("auto");
  const [actual, setActual] = useState<ChartRendererKind | null>(null);
  const [motion, setMotion] = useState(() => !prefersReducedMotion());
  const [slow, setSlow] = useState<number | null>(null);
  const [startup, setStartup] = useState<number | null>(null);
  /** When the data was handed to the chart or the backend was switched */
  const startRef = useRef(0);
  const tourRef = useRef<{ start: number; base: ChartView } | null>(null);
  /** Consecutive slow frames of the tour */
  const slowFramesRef = useRef(0);
  // the renderer of the page bar: what "auto" means here
  const page = useContext(ChartRendererContext) ?? "auto";
  const [support, setSupport] = useState<BackendsSupport | null>(null);

  useEffect(() => {
    let cancelled = false;
    void probeBackends().then((result) => {
      if (!cancelled) setSupport(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // A GPU backend forced for the whole page may run on a software GPU here,
  // which takes seconds per frame with these data sets: "auto" then uses
  // the best hardware backend instead (picking it in this demo still forces it)
  const pageSoftware = page !== "auto" && support?.[page] === "software";
  const probing = page !== "auto" && page !== "canvas2d" && !support;
  const chartRenderer: ChartRendererPreference =
    renderer === "auto" && pageSoftware && support
      ? autoPick(support)
      : renderer;
  const requested = renderer === "auto" ? page : renderer;

  useEffect(() => {
    if (!near || data) return;
    let cancelled = false;
    void load().then((value) => {
      if (cancelled) return;
      startRef.current = performance.now();
      setData({ value });
    });
    return () => {
      cancelled = true;
    };
  }, [near, data, load]);

  // the tour stops as soon as the user zooms, pans or uses the keyboard
  useEffect(() => {
    const plot = plotRef.current;
    if (!plot) return;
    const stop = () => setMotion(false);
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) stop();
    };
    const onKey = (event: KeyboardEvent) => {
      if (/^(Arrow|\+|-|=|0|Home|End)/.test(event.key)) stop();
    };
    plot.addEventListener("pointerdown", stop);
    plot.addEventListener("wheel", onWheel, { passive: true });
    plot.addEventListener("keydown", onKey);
    return () => {
      plot.removeEventListener("pointerdown", stop);
      plot.removeEventListener("wheel", onWheel);
      plot.removeEventListener("keydown", onKey);
    };
  }, []);

  const animating = motion && slow === null;
  const running = visible && !!data;

  const stats = useFrameLoop(running, {
    onFrame: (time) => {
      const instance = chartRef.current?.getInstance();
      // starts once the first frame (the costly one: buffers) is painted
      if (!tour || !animating || !data || startup === null || !instance) {
        tourRef.current = null;
        return;
      }
      let state = tourRef.current;
      if (!state) {
        instance.resetZoom();
        state = { start: time, base: instance.getView() };
        tourRef.current = state;
        slowFramesRef.current = 0;
      }
      const view = tour(data.value, (time - state.start) / 1000, state.base);
      if (fit && view.x && !view.y) {
        const y = fit(data.value, view.x);
        if (y) view.y = y;
      }
      instance.setView(view);
    },
    onWork: (ms) => {
      if (!tourRef.current) return;
      // two slow frames in a row (or a very slow one): this backend cannot
      // animate the data set here
      slowFramesRef.current = ms > SLOW_FRAME ? slowFramesRef.current + 1 : 0;
      if (slowFramesRef.current >= 2 || ms > SLOW_FRAME * 4) {
        tourRef.current = null;
        setSlow(ms);
      }
    },
  });

  const onRendererChange = (kind: ChartRendererKind) => {
    setActual(kind);
    afterNextPaint(() => setStartup(performance.now() - startRef.current));
  };
  const onZoom = (view: ChartView) => {
    if (!fit || !data) return;
    const y = fit(data.value, view.x);
    if (y) chartRef.current?.setView({ y });
  };

  let status: ReactNode = t("status.starting");
  if (slow !== null) {
    status = (
      <span className={styles.fallback}>
        {t("status.slow", { ms: text.ms(slow) })}
      </span>
    );
  } else if (actual && renderer === "auto" && pageSoftware) {
    status = (
      <span className={styles.fallback}>
        {t("status.pageSoftware", {
          requested: text.renderer(page),
          backend: text.renderer(actual),
        })}
      </span>
    );
  } else if (actual && requested === "auto") {
    status =
      actual === "canvas2d"
        ? t("status.autoCanvas", { backend: text.renderer(actual) })
        : t("status.auto", { backend: text.renderer(actual) });
  } else if (actual && actual === requested) {
    status =
      renderer === "auto"
        ? t("status.page", { backend: text.renderer(actual) })
        : t("status.forced", { backend: text.renderer(actual) });
  } else if (actual) {
    status = (
      <span className={styles.fallback}>
        {t("status.fallback", {
          requested: text.renderer(requested),
          backend: text.renderer(actual),
        })}
      </span>
    );
  }

  return (
    <div ref={rootRef} className={styles.stage}>
      <div className={styles.toolbar}>
        <RadioGroup
          aria-label={t("renderer")}
          direction="horizontal"
          size="small"
          value={renderer}
          onChange={(value) => {
            startRef.current = performance.now();
            setRenderer(value as ChartRendererPreference);
            setActual(null);
            setStartup(null);
            setSlow(null);
          }}
        >
          {RENDERERS.map((kind) => (
            <Radio
              key={kind}
              value={kind}
              label={
                kind === "auto" && page !== "auto"
                  ? t("renderers.page", { backend: text.renderer(page) })
                  : text.renderer(kind)
              }
            />
          ))}
        </RadioGroup>
        <Switch
          size="small"
          checked={motion}
          label={motionLabel}
          onChange={(checked) => {
            setMotion(checked);
            setSlow(null);
          }}
        />
      </div>

      <dl className={styles.hud}>
        <div className={styles.stat}>
          <dt>{t("stats.renderer")}</dt>
          <dd>{actual ? text.renderer(actual) : "…"}</dd>
        </div>
        <div className={styles.stat}>
          <dt>{t("stats.fps")}</dt>
          <dd className={stats ? fpsClass(stats.fps) : undefined}>
            {stats ? text.count(stats.fps) : "–"}
          </dd>
        </div>
        <div className={styles.stat}>
          <dt>{t("stats.frame")}</dt>
          <dd>{stats ? text.ms(stats.frame) : "–"}</dd>
        </div>
        <div className={styles.stat}>
          <dt>{t("stats.work")}</dt>
          <dd>{stats ? text.ms(stats.work) : "–"}</dd>
        </div>
        <div className={styles.stat}>
          <dt>{countLabel}</dt>
          <dd title={text.count(count)}>{text.compact(count)}</dd>
        </div>
        {extra && (
          <div className={styles.stat}>
            <dt>{extra.label}</dt>
            <dd>{extra.value}</dd>
          </div>
        )}
        <div className={styles.stat}>
          <dt>{t("stats.startup")}</dt>
          <dd>{startup !== null ? text.ms(startup) : "–"}</dd>
        </div>
      </dl>

      <div ref={plotRef} className={styles.chart}>
        {data && !probing ? (
          <Plot
            data={data.value}
            chartRef={chartRef}
            renderer={chartRenderer}
            onRendererChange={onRendererChange}
            onZoom={onZoom}
            running={running && motion}
          />
        ) : (
          <LoadingState
            className={styles.loading}
            style={{ height }}
            size="small"
            label={t("loading", { value: text.count(count) })}
          />
        )}
      </div>

      <div className={styles.footer}>
        <p role="status">{status}</p>
        <p className={styles.hint}>{hint}</p>
      </div>
    </div>
  );
}

```

### apps/docs/src/docs/renderer/context.ts

```tsx
// Kept free of engine imports: DemoBlock (on every page) reads the context,
// the engine is only loaded by the lazy RendererScope of chart pages.
import { createContext } from "react";
import type { ChartRendererPreference } from "minerva-design/charts/core";
import type { DocCategory } from "../registry";

/** Categories whose pages get the renderer bar and the per-demo badges */
export const RENDERER_CATEGORIES: readonly DocCategory[] = [
  "charts",
  "financeCharts",
  "charts3d",
  "graphCharts",
  "chartEngine",
  "icons",
];

/**
 * What the bar of a page switches: the charts, or the canvas icons (icon
 * pages; the same stored choice drives both, see store.ts)
 */
export type RendererTopic = "charts" | "icons";

export const RendererTopicContext = createContext<RendererTopic>("charts");

/**
 * The page-wide chart renderer (null outside chart pages), shown by the demo
 * badges. The charts follow it by themselves through the engine's default.
 */
export const ChartRendererContext =
  createContext<ChartRendererPreference | null>(null);

```

### apps/docs/src/docs/registry.ts

```tsx
/**
 * Single source of truth for the documentation site.
 *
 * Plain data only (no React / JSX) so tests can import it in Node:
 * - the router builds one lazily-loaded route per page from this list
 * - the sidebar groups pages by `category`
 * - `src/docs/docs.test.ts` checks that every public export of the libraries
 *   is documented, that every `api` entry exists in `api.generated.json`,
 *   that every demo file exists and that all locales contain the page strings.
 *
 * Page content lives in `src/docs/pages/<id>/index.tsx` (+ `demos/<demo>.tsx`)
 * and its strings in `src/i18n/locales/<lng>/docs/<id>.json`.
 */

export type DocCategory =
  | "gettingStarted"
  | "theming"
  | "configuration"
  | "general"
  | "layout"
  | "dataEntry"
  | "dataDisplay"
  | "feedback"
  | "navigation"
  | "overlays"
  | "editors"
  | "charts"
  | "financeCharts"
  | "charts3d"
  | "graphCharts"
  | "chartEngine"
  | "icons"
  | "mobile"
  | "webComponents";

export interface DocPageMeta {
  /** Route path and folder name under src/docs/pages */
  id: string;
  category: DocCategory;
  /** Runtime exports of the package documented on this page */
  exports?: string[];
  /** Package the exports come from */
  package?:
    | "minerva-design"
    | "minerva-design/web-components"
    | "minerva-design/charts"
    | "minerva-design/charts/core"
    | "minerva-design/icons"
    | "minerva-design/icons/core";
  /** Interfaces from api.generated.json rendered as API tables */
  api?: string[];
  /** Demo ids, in display order; each maps to `pages/<id>/demos/<demo>.tsx` */
  demos?: string[];
  /**
   * Component folders of minerva-design whose CSS custom properties
   * (`// @css-var` comments in their SCSS) are listed in a "CSS variables"
   * section
   */
  cssVars?: string[];
  /**
   * Web Component counterpart shown in the page's "Web Components" tab:
   * the define entry (`minerva-design/web-components/<entry>`), the custom
   * elements documented on the page (API tables from custom-elements.json)
   * and the demo ids (`pages/<id>/wc/<demo>.html` + optional `<demo>.ts`)
   */
  wc?: WcMeta;
  /**
   * React Native counterpart shown in the page's "React Native" tab
   * (minerva-design/native): exports, API interfaces of
   * api.native.generated.json (without the `native:` prefix) and demo ids
   * (`pages/<id>/native/<demo>.tsx`, rendered through react-native-web in a
   * phone frame). A page with `native` only (no `exports`) is a mobile
   * component: the React Native content is the whole page.
   */
  native?: NativeMeta;
}

export interface NativeMeta {
  /** Exports of minerva-design/native documented on the page */
  exports: string[];
  /** Entry the exports come from @default "minerva-design/native" */
  package?: string;
  /** Interfaces rendered as API tables (`ButtonProps` = `native:ButtonProps`) */
  api: string[];
  /** Demo ids, in display order */
  demos: string[];
}

export interface WcMeta {
  /** Define entry: `minerva-design/web-components/<entry>` */
  entry: string;
  /** Tag names documented on the page, in display order */
  tags: string[];
  /** Demo ids, in display order */
  demos: string[];
}

export const categories: DocCategory[] = [
  "gettingStarted",
  "theming",
  "configuration",
  "webComponents",
  "general",
  "layout",
  "dataEntry",
  "dataDisplay",
  "feedback",
  "overlays",
  "navigation",
  "editors",
  "mobile",
  "charts",
  "financeCharts",
  "charts3d",
  "graphCharts",
  "chartEngine",
  "icons",
];

/** Top-level parts of the site, each with its own sidebar */
export type DocSection = "docs" | "components" | "charts" | "icons";

export interface DocSectionMeta {
  id: DocSection;
  /** Page the top navigation link opens */
  home: string;
  categories: readonly DocCategory[];
}

export const sections: readonly DocSectionMeta[] = [
  {
    id: "docs",
    home: "overview",
    categories: ["gettingStarted", "theming", "configuration", "webComponents"],
  },
  {
    id: "components",
    home: "button",
    categories: [
      "general",
      "layout",
      "dataEntry",
      "dataDisplay",
      "feedback",
      "overlays",
      "navigation",
      "editors",
      "mobile",
    ],
  },
  {
    id: "charts",
    home: "charts",
    categories: [
      "charts",
      "financeCharts",
      "charts3d",
      "graphCharts",
      "chartEngine",
    ],
  },
  {
    id: "icons",
    home: "icons",
    categories: ["icons"],
  },
];

/** Section of a category (every category belongs to exactly one) */
export const sectionOf = (category: DocCategory): DocSection =>
  sections.find((section) => section.categories.includes(category))?.id ??
  "docs";

export const docPages: DocPageMeta[] = [
  // Getting started
  { id: "overview", category: "gettingStarted" },
  { id: "installation", category: "gettingStarted" },
  { id: "introduction", category: "gettingStarted" },
  { id: "architecture", category: "gettingStarted" },
  { id: "platform-support", category: "gettingStarted" },
  { id: "rsc-guide", category: "gettingStarted" },
  { id: "vue", category: "gettingStarted" },
  { id: "angular", category: "gettingStarted" },
  { id: "react-native", category: "gettingStarted" },
  { id: "theming", category: "gettingStarted", demos: ["scoped-theme"] },
  {
    id: "styling",
    category: "gettingStarted",
    demos: [
      "restyle-button",
      "restyle-modal",
      "restyle-tabs",
      "restyle-table",
      "items-menu",
      "items-select",
      "items-pagination",
      "items-table",
      "items-toast",
    ],
  },
  { id: "changelog", category: "gettingStarted" },

  // Configuration: ConfigProvider, hooks and theme utilities
  {
    id: "config-provider",
    category: "configuration",
    exports: ["ConfigProvider", "useConfig", "ConfigContext"],
    api: ["ConfigContextProviderProps", "ConfigContextProps", "Locale"],
    demos: ["use-config", "custom-theme", "locale", "palette", "brand-color"],
    wc: {
      entry: "config",
      tags: ["minerva-config"],
      demos: ["basic", "palette-design", "locale", "nested", "brand-color"],
    },
    native: {
      exports: [
        "MinervaProvider",
        "ConfigProvider",
        "useTheme",
        "useTokens",
        "useI18n",
        "useInsets",
      ],
      api: [
        "MinervaProviderProps",
        "MinervaTheme",
        "MinervaI18n",
        "NativeLocale",
        "NativeFonts",
      ],
      demos: ["switching", "use-theme"],
    },
  },
  {
    id: "hooks",
    category: "configuration",
    exports: ["useAutoTheme", "useLocale", "useI18n", "useDisclosure", "cn"],
    demos: ["use-auto-theme", "use-locale", "use-disclosure"],
  },
  {
    id: "theme-utils",
    category: "configuration",
    exports: [
      "applyThemeStyles",
      "generateCSSVariables",
      "getSystemTheme",
      "isBilingualTheme",
      "resolveTheme",
      "themes",
      "light",
      "dark",
      "githubDark",
    ],
    api: ["ThemeProps", "SemanticThemeProps", "ComponentThemeProps"],
    demos: ["theme-swatches", "resolve-theme", "scoped-preview"],
  },

  // General
  {
    id: "button",
    cssVars: ["Button"],
    category: "general",
    exports: ["Button"],
    api: ["ButtonProps"],
    demos: [
      "basic",
      "colors",
      "variants",
      "sizes",
      "shapes",
      "states",
      "with-icon",
      "icons-loading",
      "form",
    ],
    wc: {
      entry: "button",
      tags: ["minerva-button"],
      demos: ["basic", "colors-variants", "sizes-shapes", "states", "form"],
    },
    native: {
      exports: ["Button"],
      api: ["ButtonProps"],
      demos: [
        "basic",
        "colors",
        "variants",
        "sizes",
        "shapes",
        "states",
        "with-icon",
        "icons-loading",
        "form",
      ],
    },
  },
  {
    id: "icon-button",
    cssVars: ["IconButton"],
    category: "general",
    exports: ["IconButton"],
    api: ["IconButtonProps"],
    demos: [
      "basic",
      "colors",
      "variants",
      "sizes-and-shapes",
      "states",
      "toggle",
      "search",
      "custom-colors",
      "tooltip",
      "label",
    ],
    wc: {
      entry: "icon-button",
      tags: ["minerva-icon-button"],
      demos: ["basic", "sizes-shapes", "toggle", "states"],
    },
    native: {
      exports: ["IconButton"],
      api: ["IconButtonProps"],
      demos: ["basic", "toggle", "variants-sizes"],
    },
  },

  // Layout
  {
    id: "divider",
    cssVars: ["Divider"],
    category: "layout",
    exports: ["Divider"],
    api: ["DividerProps"],
    demos: [
      "basic",
      "variants",
      "with-text",
      "vertical",
      "flex-item",
      "custom-style",
    ],
    wc: {
      entry: "divider",
      tags: ["minerva-divider"],
      demos: [
        "basic",
        "variants",
        "with-text",
        "vertical",
        "flex-item",
        "custom-style",
      ],
    },
    native: {
      exports: ["Divider"],
      api: ["DividerProps"],
      demos: ["basic", "vertical", "with-text"],
    },
  },
  {
    id: "card",
    cssVars: ["Card"],
    category: "layout",
    exports: [
      "Card",
      "CardHeader",
      "CardTitle",
      "CardDescription",
      "CardContent",
      "CardFooter",
    ],
    api: [
      "CardProps",
      "CardHeaderProps",
      "CardTitleProps",
      "CardDescriptionProps",
      "CardContentProps",
      "CardFooterProps",
    ],
    demos: [
      "basic",
      "variants",
      "padded",
      "interactive",
      "custom-colors",
      "animation",
    ],
    wc: {
      entry: "card",
      tags: [
        "minerva-card",
        "minerva-card-header",
        "minerva-card-content",
        "minerva-card-footer",
        "minerva-card-title",
        "minerva-card-description",
      ],
      demos: ["basic", "variants", "padded", "interactive"],
    },
    native: {
      exports: [
        "Card",
        "CardHeader",
        "CardTitle",
        "CardDescription",
        "CardContent",
        "CardFooter",
      ],
      api: ["CardProps"],
      demos: ["basic", "product", "variants"],
    },
  },
  {
    id: "virtual-list",
    cssVars: ["VirtualList"],
    category: "layout",
    exports: ["VirtualList"],
    api: ["VirtualListProps", "VirtualListItem"],
    demos: [
      "basic",
      "auto-height",
      "infinite-scroll",
      "high-performance",
      "clickable-rows",
    ],
    wc: {
      entry: "virtual-list",
      tags: ["minerva-virtual-list"],
      demos: ["basic", "clickable-rows", "infinite-scroll"],
    },
    native: {
      exports: ["VirtualList"],
      api: ["VirtualListProps"],
      demos: ["basic"],
    },
  },

  // Data entry
  {
    id: "checkbox",
    cssVars: ["Checkbox"],
    category: "dataEntry",
    exports: ["Checkbox"],
    api: ["CheckboxProps"],
    demos: [
      "basic",
      "controlled",
      "indeterminate",
      "sizes-and-shapes",
      "label-placement",
      "states",
      "custom-style",
      "error",
      "colors-and-form-control",
    ],
    native: {
      exports: ["Checkbox"],
      api: ["CheckboxProps"],
      demos: ["basic", "controlled", "indeterminate"],
    },
    wc: {
      entry: "checkbox",
      tags: ["minerva-checkbox"],
      demos: ["basic", "select-all", "styles-states", "form"],
    },
  },
  {
    id: "radio",
    cssVars: ["Radio"],
    category: "dataEntry",
    exports: ["Radio", "RadioGroup"],
    api: ["RadioProps", "RadioGroupProps"],
    demos: [
      "basic",
      "controlled",
      "horizontal",
      "sizes",
      "colors",
      "disabled",
      "validation",
    ],
    native: {
      exports: ["Radio", "RadioGroup"],
      api: ["RadioProps", "RadioGroupProps"],
      demos: ["basic", "controlled", "disabled"],
    },
    wc: {
      entry: "radio",
      tags: ["minerva-radio", "minerva-radio-group"],
      demos: ["basic", "styles-states", "form"],
    },
  },
  {
    id: "switch",
    cssVars: ["Switch"],
    native: {
      exports: ["Switch"],
      api: ["SwitchProps"],
      demos: [
        "basic",
        "controlled",
        "sizes",
        "colors",
        "label-placement",
        "states",
      ],
    },
    category: "dataEntry",
    exports: ["Switch"],
    api: ["SwitchProps"],
    demos: [
      "basic",
      "controlled",
      "sizes",
      "colors",
      "label-placement",
      "states",
      "icons",
      "custom-style",
      "bilateral-and-segmented",
    ],
    wc: {
      entry: "switch",
      tags: ["minerva-switch"],
      demos: ["basic", "styles-states", "side-labels", "form"],
    },
  },
  {
    id: "auto-complete",
    cssVars: ["AutoComplete"],
    category: "dataEntry",
    exports: ["AutoComplete"],
    api: ["AutoCompleteProps", "AutoCompleteOption"],
    demos: [
      "basic",
      "controlled",
      "rich-options",
      "custom-render",
      "grouped",
      "filter-sort",
      "async-loading",
      "appearance",
      "search-box",
    ],
    wc: {
      entry: "autocomplete",
      tags: ["minerva-autocomplete"],
      demos: ["basic", "rich-options", "custom-render", "async-loading"],
    },
    native: {
      exports: ["AutoComplete"],
      api: ["AutoCompleteProps"],
      demos: ["basic"],
    },
  },
  {
    id: "cascader",
    cssVars: ["Cascader"],
    category: "dataEntry",
    exports: ["Cascader"],
    api: ["CascaderProps", "CascaderOption"],
    demos: [
      "basic",
      "default-value",
      "controlled",
      "hover",
      "search",
      "display-render",
      "disabled",
      "lazy-load",
      "custom-option",
    ],
    wc: {
      entry: "cascader",
      tags: ["minerva-cascader"],
      demos: ["basic", "search-hover", "lazy", "form"],
    },
    native: { exports: ["Cascader"], api: ["CascaderProps"], demos: ["basic"] },
  },
  {
    id: "time-picker",
    cssVars: ["TimePicker"],
    category: "dataEntry",
    exports: ["TimePicker"],
    api: ["TimePickerProps"],
    demos: [
      "basic",
      "default-value",
      "controlled",
      "formats",
      "twelve-hour",
      "steps",
      "time-range",
      "sizes",
      "disabled",
    ],
    wc: {
      entry: "time-picker",
      tags: ["minerva-time-picker"],
      demos: ["basic", "formats", "range-steps", "form"],
    },
    native: {
      exports: ["TimePicker"],
      api: ["TimePickerProps"],
      demos: ["basic"],
    },
  },
  {
    id: "date-picker",
    cssVars: ["DatePicker"],
    category: "dataEntry",
    exports: ["DatePicker"],
    api: ["DatePickerProps"],
    demos: [
      "basic",
      "default-value",
      "controlled",
      "min-max",
      "sizes",
      "disabled",
      "form-control",
    ],
    wc: {
      entry: "date-picker",
      tags: ["minerva-date-picker"],
      demos: ["basic"],
    },
    native: {
      exports: ["DatePicker"],
      api: ["DatePickerProps"],
      demos: ["basic"],
    },
  },

  // Data display
  {
    id: "avatar",
    cssVars: ["Avatar"],
    category: "dataDisplay",
    exports: ["Avatar", "AvatarGroup"],
    api: ["AvatarProps", "AvatarGroupProps"],
    demos: ["basic", "shapes", "sizes", "group", "fallback"],
    wc: {
      entry: "avatar",
      tags: ["minerva-avatar", "minerva-avatar-group"],
      demos: ["basic", "shapes-sizes", "group", "fallback"],
    },
    native: {
      exports: ["Avatar", "AvatarGroup"],
      api: ["AvatarProps", "AvatarGroupProps"],
      demos: ["basic", "group", "sizes-shapes"],
    },
  },
  {
    id: "badge",
    cssVars: ["Badge"],
    category: "dataDisplay",
    exports: ["Badge"],
    api: ["BadgeProps"],
    demos: [
      "basic",
      "colors",
      "variants",
      "positions",
      "sizes",
      "dot",
      "with-icon",
      "custom-style",
      "status",
    ],
    wc: {
      entry: "badge",
      tags: ["minerva-badge"],
      demos: ["basic", "colors-variants", "positions", "slots"],
    },
    native: {
      exports: ["Badge"],
      api: ["BadgeProps"],
      demos: ["basic", "colors-variants", "dot-max"],
    },
  },
  {
    id: "tag",
    cssVars: ["Tag"],
    category: "dataDisplay",
    exports: ["Tag"],
    api: ["TagProps"],
    demos: [
      "colors",
      "variants",
      "sizes-shapes",
      "with-icon",
      "closable",
      "clickable",
      "avatar-loading",
      "custom-colors",
      "disabled",
    ],
    wc: {
      entry: "tag",
      tags: ["minerva-tag"],
      demos: ["basic", "variants-sizes", "closable", "toggle"],
    },
    native: {
      exports: ["Tag"],
      api: ["TagProps"],
      demos: ["closable", "colors-variants", "selectable"],
    },
  },
  {
    id: "empty",
    cssVars: ["Empty"],
    category: "dataDisplay",
    exports: ["Empty"],
    api: ["EmptyProps"],
    demos: ["basic", "svg", "custom-icon", "with-action", "sizes", "styled"],
    wc: {
      entry: "empty",
      tags: ["minerva-empty"],
      demos: ["basic", "actions", "sizes-styles"],
    },
    native: { exports: ["Empty"], api: ["EmptyProps"], demos: ["basic"] },
  },
  {
    id: "tooltip",
    cssVars: ["Tooltip"],
    category: "dataDisplay",
    exports: ["Tooltip", "TooltipProvider"],
    api: ["TooltipProps", "TooltipRef", "TooltipProviderProps"],
    demos: [
      "basic",
      "placements",
      "colors",
      "variants",
      "shapes",
      "animations",
      "custom-colors",
      "delays",
      "follow-cursor",
      "controlled",
      "events",
      "as-child",
      "provider",
    ],
    wc: {
      entry: "tooltip",
      tags: ["minerva-tooltip-provider", "minerva-tooltip"],
      demos: ["basic", "styles", "provider", "controlled"],
    },
    native: {
      exports: ["Tooltip", "TooltipProvider"],
      api: ["TooltipProps", "TooltipProviderProps"],
      demos: ["basic"],
    },
  },

  // Feedback
  {
    id: "alert",
    cssVars: ["Alert"],
    category: "feedback",
    exports: ["Alert"],
    api: ["AlertProps"],
    demos: [
      "colors",
      "variants",
      "with-title",
      "sizes",
      "closable",
      "with-action",
      "collapsible",
      "banner",
      "appearance",
      "animations",
      "return-focus",
    ],
    wc: {
      entry: "alert",
      tags: ["minerva-alert"],
      demos: ["basic", "variants-sizes", "closable", "collapsible"],
    },
    native: { exports: ["Alert"], api: ["AlertProps"], demos: ["basic"] },
  },
  {
    id: "progress",
    cssVars: ["ProgressIndicator"],
    category: "feedback",
    exports: ["ProgressIndicator"],
    api: ["ProgressIndicatorProps"],
    demos: [
      "variants",
      "sizes",
      "colors",
      "label",
      "width",
      "with-icon",
      "determinate",
    ],
    wc: {
      entry: "progress",
      tags: ["minerva-progress"],
      demos: ["basic", "sizes-colors", "label-width", "determinate"],
    },
    native: {
      exports: ["ProgressIndicator"],
      api: ["ProgressProps"],
      demos: ["basic"],
    },
  },
  {
    id: "skeleton",
    cssVars: ["Skeleton"],
    category: "feedback",
    exports: ["Skeleton", "SkeletonText"],
    api: ["SkeletonProps", "SkeletonTextProps"],
    demos: [
      "basic",
      "variants",
      "animations",
      "composition",
      "card",
      "loading",
      "decorative",
      "skeleton-text",
    ],
    wc: {
      entry: "skeleton",
      tags: ["minerva-skeleton", "minerva-skeleton-text"],
      demos: ["basic", "variants", "loading", "composition"],
    },
    native: {
      exports: ["Skeleton", "SkeletonText"],
      api: ["SkeletonProps", "SkeletonTextProps"],
      demos: ["basic"],
    },
  },

  // Navigation
  {
    id: "pagination",
    cssVars: ["Pagination"],
    category: "navigation",
    exports: ["Pagination"],
    api: ["PaginationProps", "PaginationLabels"],
    demos: [
      "basic",
      "many-pages",
      "total-and-jumper",
      "size-changer",
      "sizes",
      "shapes-and-variants",
      "simple",
      "custom-render",
      "disabled",
      "responsive",
      "compact",
    ],
    wc: {
      entry: "pagination",
      tags: ["minerva-pagination"],
      demos: ["basic", "total-and-jumper", "appearance", "simple"],
    },
    native: {
      exports: ["Pagination"],
      api: ["PaginationProps"],
      demos: ["basic", "simple"],
    },
  },

  // Layout
  {
    id: "box",
    category: "layout",
    exports: ["Box"],
    api: ["BoxProps"],
    demos: ["basic", "sizing", "polymorphic"],
    wc: {
      entry: "box",
      tags: ["minerva-box"],
      demos: ["basic", "spacing-sizing", "surfaces"],
    },
    native: { exports: ["Box"], api: ["BoxProps"], demos: ["basic"] },
  },
  {
    id: "stack",
    cssVars: ["Stack"],
    category: "layout",
    exports: ["Stack", "HStack", "VStack"],
    api: ["StackProps"],
    demos: ["basic", "horizontal", "gap", "wrap", "separator", "attached"],
    wc: {
      entry: "stack",
      tags: ["minerva-stack", "minerva-hstack", "minerva-vstack"],
      demos: ["basic", "hstack-vstack", "wrap-separator", "attached"],
    },
    native: {
      exports: ["Stack", "HStack", "VStack"],
      api: ["StackProps", "HStackProps", "VStackProps"],
      demos: ["basic"],
    },
  },
  {
    id: "responsive-grid",
    cssVars: ["ResponsiveGrid"],
    category: "layout",
    exports: ["ResponsiveGrid", "GridItem"],
    api: ["ResponsiveGridProps", "GridItemProps"],
    demos: ["basic", "full-width"],
    wc: {
      entry: "responsive-grid",
      tags: ["minerva-responsive-grid", "minerva-grid-item"],
      demos: ["basic", "container", "full-width"],
    },
    native: {
      exports: ["ResponsiveGrid", "GridItem"],
      api: ["ResponsiveGridProps", "GridItemProps"],
      demos: ["basic"],
    },
  },
  {
    id: "split-layout",
    cssVars: ["SplitLayout"],
    category: "layout",
    exports: ["SplitLayout"],
    api: ["SplitLayoutProps"],
    demos: ["basic", "options"],
    wc: {
      entry: "split-layout",
      tags: ["minerva-split-layout"],
      demos: ["basic", "options"],
    },
    native: {
      exports: ["SplitLayout"],
      api: ["SplitLayoutProps"],
      demos: ["basic"],
    },
  },
  {
    id: "page",
    cssVars: ["Page"],
    category: "layout",
    exports: ["Page", "PageHeader", "PageSection", "StatCard", "Toolbar"],
    api: [
      "PageProps",
      "PageHeaderProps",
      "PageSectionProps",
      "StatCardProps",
      "ToolbarProps",
    ],
    demos: ["basic", "stat-cards", "toolbar"],
    wc: {
      entry: "page",
      tags: [
        "minerva-page",
        "minerva-page-header",
        "minerva-page-section",
        "minerva-toolbar",
        "minerva-stat-card",
      ],
      demos: ["basic", "stat-cards", "toolbar"],
    },
    native: {
      exports: ["Page", "PageHeader", "PageSection", "StatCard", "Toolbar"],
      api: [
        "PageProps",
        "PageHeaderProps",
        "PageSectionProps",
        "StatCardProps",
        "ToolbarProps",
      ],
      demos: ["basic"],
    },
  },
  {
    id: "app-shell",
    cssVars: ["AppShell"],
    category: "layout",
    exports: ["AppShell"],
    api: ["AppShellProps", "AppShellNavigationState", "AppShellLabels"],
    demos: ["basic", "controlled", "skip-link"],
    wc: {
      entry: "app-shell",
      tags: ["minerva-app-shell"],
      demos: ["basic", "sidebar-modes", "controlled"],
    },
    native: { exports: ["AppShell"], api: ["AppShellProps"], demos: ["basic"] },
  },

  // Overlays
  {
    id: "modal",
    cssVars: ["Modal"],
    category: "overlays",
    exports: [
      "Modal",
      "ModalRoot",
      "ModalTrigger",
      "ModalClose",
      "ModalContent",
      "ModalHeader",
      "ModalBody",
      "ModalFooter",
    ],
    api: [
      "ModalProps",
      "ModalRootProps",
      "ModalTriggerProps",
      "ModalContentProps",
    ],
    demos: ["basic", "uncontrolled", "sizes", "form", "compound"],
    wc: {
      entry: "modal",
      tags: ["minerva-modal"],
      demos: ["basic", "sizes", "form", "events"],
    },
    native: {
      exports: [
        "Dialog",
        "Modal",
        "ModalRoot",
        "ModalTrigger",
        "ModalClose",
        "ModalContent",
        "ModalHeader",
        "ModalBody",
        "ModalFooter",
      ],
      api: ["DialogProps", "ModalRootProps", "ModalTriggerProps"],
      demos: ["basic", "form", "confirm", "custom-footer"],
    },
  },
  {
    id: "confirm",
    category: "overlays",
    exports: ["ConfirmDialog", "ConfirmProvider", "confirm", "useConfirm"],
    api: ["ConfirmDialogProps", "ConfirmOptions", "ConfirmProviderProps"],
    demos: ["imperative", "colors", "provider", "declarative", "scoped"],
    wc: {
      entry: "confirm",
      tags: ["minerva-confirm-dialog", "minerva-confirm-provider"],
      demos: ["basic", "async", "imperative", "scoped"],
    },
    native: {
      exports: ["ConfirmDialog", "ConfirmProvider"],
      api: ["ConfirmDialogProps", "ConfirmProviderProps"],
      demos: ["basic"],
    },
  },
  {
    id: "drawer",
    cssVars: ["Drawer"],
    category: "overlays",
    exports: [
      "Drawer",
      "DrawerRoot",
      "DrawerTrigger",
      "DrawerClose",
      "DrawerContent",
      "DrawerHeader",
      "DrawerBody",
      "DrawerFooter",
    ],
    api: ["DrawerProps", "DrawerRootProps", "DrawerContentProps"],
    demos: ["basic", "sides", "compound"],
    wc: {
      entry: "drawer",
      tags: ["minerva-drawer"],
      demos: ["basic", "sides", "non-modal"],
    },
    native: {
      exports: [
        "Drawer",
        "DrawerRoot",
        "DrawerTrigger",
        "DrawerClose",
        "DrawerContent",
        "DrawerHeader",
        "DrawerBody",
        "DrawerFooter",
      ],
      api: ["PopupProps"],
      demos: ["basic"],
    },
  },
  {
    id: "command",
    cssVars: ["Command"],
    category: "overlays",
    exports: ["CommandDialog", "normalizeShortcuts", "matchesShortcut"],
    api: ["CommandDialogProps", "CommandItem"],
    demos: ["basic", "shortcut", "custom-filter", "site-search"],
    wc: {
      entry: "command",
      tags: ["minerva-command-dialog"],
      demos: ["basic", "shortcut", "custom-filter"],
    },
    native: {
      exports: ["CommandDialog"],
      api: ["CommandDialogProps"],
      demos: ["basic"],
    },
  },
  {
    id: "popover",
    cssVars: ["Popover"],
    category: "overlays",
    exports: [
      "Popover",
      "PopoverTrigger",
      "PopoverAnchor",
      "PopoverClose",
      "PopoverContent",
    ],
    api: ["PopoverProps", "PopoverContentProps", "PopoverTriggerProps"],
    demos: ["basic", "placement", "controlled"],
    wc: {
      entry: "popover",
      tags: ["minerva-popover"],
      demos: ["basic", "placement", "anchor"],
    },
    native: {
      exports: [
        "Popover",
        "PopoverTrigger",
        "PopoverAnchor",
        "PopoverClose",
        "PopoverContent",
      ],
      api: ["PopoverProps", "PopoverTriggerProps", "PopoverContentProps"],
      demos: ["basic"],
    },
  },

  {
    id: "menu",
    cssVars: ["Menu"],
    category: "overlays",
    exports: ["Menu", "ContextMenu"],
    api: [
      "MenuProps",
      "ContextMenuProps",
      "MenuAction",
      "MenuCheckboxEntry",
      "MenuRadioGroupEntry",
      "MenuRadioItem",
      "MenuSeparatorEntry",
      "MenuGroupEntry",
    ],
    demos: [
      "basic",
      "triggers",
      "groups",
      "submenus",
      "checkbox-radio",
      "placement",
      "disabled",
      "context-menu",
      "controlled",
    ],
    wc: {
      entry: "menu",
      tags: [
        "minerva-context-menu",
        "minerva-menu-item",
        "minerva-menu-checkbox-item",
        "minerva-menu-radio-item",
        "minerva-menu-group",
        "minerva-menu-separator",
        "minerva-menu-label",
        "minerva-menu",
      ],
      demos: ["basic", "checkbox-radio", "items", "context-menu"],
    },
    native: {
      exports: ["Menu", "ContextMenu"],
      api: ["MenuProps", "ContextMenuProps"],
      demos: ["basic"],
    },
  },
  {
    id: "toast",
    cssVars: ["Toast"],
    category: "feedback",
    exports: ["ToastProvider", "toast", "useToast"],
    api: [
      "ToastOptions",
      "ToastAction",
      "ToastProviderProps",
      "ToastApi",
      "ToastPromiseMessages",
    ],
    demos: [
      "basic",
      "colors",
      "options",
      "loading",
      "action",
      "dedupe",
      "scoped",
      "keyboard",
    ],
    native: {
      exports: ["ToastProvider", "toast", "useToast"],
      api: ["ToastOptions", "ToastApi", "ToastProviderProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "toast",
      tags: ["minerva-toast-region"],
      demos: ["basic", "options", "loading"],
    },
  },
  {
    id: "page-tabs",
    cssVars: ["PageTabs"],
    category: "navigation",
    exports: ["PageTabs", "PageTab"],
    api: ["PageTabsProps", "PageTabProps"],
    demos: ["basic", "context-menu", "overflow"],
    wc: {
      entry: "page-tabs",
      tags: ["minerva-page-tabs", "minerva-page-tab"],
      demos: ["basic", "actions", "overflow"],
    },
    native: {
      exports: ["PageTabs", "PageTab"],
      api: ["PageTabsProps", "PageTabProps"],
      demos: ["basic"],
    },
  },

  // Forms
  {
    id: "form-control",
    cssVars: ["FormControl"],
    category: "dataEntry",
    exports: [
      "FormControl",
      "FormLabel",
      "FormHelperText",
      "FormErrorMessage",
      "FormField",
      "useFormControlContext",
      "useFormControlProps",
    ],
    api: ["FormControlProps", "FormLabelProps", "FormFieldProps"],
    demos: ["basic", "form-field", "states", "custom-control"],
    wc: {
      entry: "form-control",
      tags: ["minerva-form-control"],
      demos: ["basic", "states", "slots", "form"],
    },
    native: {
      exports: [
        "FormControl",
        "FormLabel",
        "FormHelperText",
        "FormErrorMessage",
        "FormField",
      ],
      api: ["FormControlProps", "FormFieldProps"],
      demos: ["basic"],
    },
  },
  {
    id: "form-layout",
    cssVars: ["FormLayout"],
    category: "dataEntry",
    exports: ["FormLayout"],
    api: ["FormLayoutProps"],
    demos: ["basic", "gaps"],
    wc: {
      entry: "form-layout",
      tags: ["minerva-form-layout"],
      demos: ["basic", "gaps"],
    },
    native: {
      exports: ["FormLayout"],
      api: ["FormLayoutProps"],
      demos: ["basic"],
    },
  },
  {
    id: "input",
    cssVars: ["Input"],
    native: {
      exports: ["Input"],
      api: ["InputProps"],
      demos: ["basic", "states", "sizes-variants", "clearable-and-count"],
    },
    category: "dataEntry",
    exports: ["Input"],
    api: ["InputProps"],
    demos: [
      "basic",
      "sizes-variants",
      "addons",
      "clearable-and-count",
      "password",
      "states",
      "validation",
    ],
    wc: {
      entry: "input",
      tags: ["minerva-input"],
      demos: ["basic", "sizes-variants", "addons", "form"],
    },
  },
  {
    id: "textarea",
    cssVars: ["Textarea"],
    category: "dataEntry",
    exports: ["Textarea"],
    api: ["TextareaProps"],
    demos: ["basic", "sizes-variants", "form-control"],
    wc: {
      entry: "textarea",
      tags: ["minerva-textarea"],
      demos: ["basic", "sizes-variants", "form"],
    },
    native: { exports: ["Textarea"], api: ["TextareaProps"], demos: ["basic"] },
  },
  {
    id: "number-input",
    cssVars: ["NumberInput"],
    category: "dataEntry",
    exports: ["NumberInput"],
    api: ["NumberInputProps"],
    demos: ["basic", "stepper-precision", "form-control"],
    wc: {
      entry: "number-input",
      tags: ["minerva-number-input"],
      demos: ["basic", "precision", "form"],
    },
    native: {
      exports: ["NumberInput"],
      api: ["NumberInputProps"],
      demos: ["basic"],
    },
  },
  {
    id: "json-field",
    cssVars: ["JsonField"],
    category: "dataEntry",
    exports: ["JsonField"],
    api: ["JsonFieldProps"],
    demos: ["basic", "indent", "form-control"],
    wc: {
      entry: "json-field",
      tags: ["minerva-json-field"],
      demos: ["basic", "options", "form"],
    },
    native: {
      exports: ["JsonField"],
      api: ["JsonFieldProps"],
      demos: ["basic"],
    },
  },
  {
    id: "key-value-editor",
    cssVars: ["KeyValueEditor"],
    category: "dataEntry",
    exports: ["KeyValueEditor"],
    api: ["KeyValueEditorProps", "KeyValueEntry", "KeyValueEntryErrors"],
    demos: ["basic", "errors"],
    wc: {
      entry: "key-value-editor",
      tags: ["minerva-key-value-editor"],
      demos: ["basic", "errors", "form"],
    },
    native: {
      exports: ["KeyValueEditor"],
      api: ["KeyValueEditorProps"],
      demos: ["basic"],
    },
  },
  {
    id: "tag-input",
    cssVars: ["TagInput"],
    category: "dataEntry",
    exports: ["TagInput"],
    api: ["TagInputProps"],
    demos: ["basic", "form-control", "separators"],
    wc: {
      entry: "tag-input",
      tags: ["minerva-tag-input"],
      demos: ["basic", "separators", "states", "form"],
    },
    native: { exports: ["TagInput"], api: ["TagInputProps"], demos: ["basic"] },
  },

  {
    id: "loading-state",
    cssVars: ["LoadingState"],
    category: "feedback",
    exports: ["LoadingState"],
    api: ["LoadingStateProps"],
    demos: ["basic", "sizes"],
    wc: {
      entry: "loading-state",
      tags: ["minerva-loading-state"],
      demos: ["basic", "sizes", "section"],
    },
    native: {
      exports: ["LoadingState"],
      api: ["LoadingProps"],
      demos: ["basic"],
    },
  },
  {
    id: "text-link",
    cssVars: ["TextLink"],
    category: "dataDisplay",
    exports: ["TextLink"],
    api: ["TextLinkProps"],
    demos: ["variants", "as-child"],
    wc: {
      entry: "text-link",
      tags: ["minerva-text-link"],
      demos: ["basic", "variants", "styling"],
    },
    native: { exports: ["TextLink"], api: ["TextLinkProps"], demos: ["basic"] },
  },
  {
    id: "description-list",
    cssVars: ["DescriptionList"],
    category: "dataDisplay",
    exports: ["DescriptionList"],
    api: ["DescriptionListProps", "DescriptionListItem"],
    demos: ["basic", "variants"],
    wc: {
      entry: "description-list",
      tags: ["minerva-description-item", "minerva-description-list"],
      demos: ["basic", "items", "variants", "styling"],
    },
    native: {
      exports: ["DescriptionList"],
      api: ["DescriptionListProps"],
      demos: ["basic"],
    },
  },
  {
    id: "list",
    cssVars: ["List"],
    category: "dataDisplay",
    exports: ["List", "ListItem"],
    api: ["ListProps", "ListItemProps"],
    demos: ["basic", "compact", "bordered"],
    wc: {
      entry: "list",
      tags: ["minerva-list", "minerva-list-item"],
      demos: ["basic", "slots", "density", "bordered"],
    },
    native: {
      exports: ["Cell", "CellGroup", "List", "ListItem"],
      api: ["CellProps", "CellGroupProps", "ListProps", "ListItemProps"],
      demos: ["basic", "inset-groups", "rich-rows"],
    },
  },
  {
    id: "code-block",
    cssVars: ["CodeBlock"],
    category: "dataDisplay",
    exports: ["CodeBlock"],
    api: ["CodeBlockProps"],
    demos: [
      "basic",
      "languages",
      "auto-language",
      "line-numbers",
      "no-wrap",
      "copyable",
      "marks",
    ],
    wc: {
      entry: "code-block",
      tags: ["minerva-code-block"],
      demos: [
        "basic",
        "languages",
        "auto-language",
        "line-numbers",
        "copy",
        "overflow",
        "marks",
      ],
    },
    native: {
      exports: ["CodeBlock"],
      api: ["CodeBlockProps"],
      demos: ["basic", "marks"],
    },
  },
  {
    id: "prose",
    cssVars: ["Prose"],
    category: "dataDisplay",
    exports: ["Prose"],
    api: ["ProseProps"],
    demos: ["basic", "as-child"],
    wc: {
      entry: "prose",
      tags: ["minerva-prose"],
      demos: ["basic", "rich-content", "scopes"],
    },
    native: { exports: ["Prose"], api: ["ProseProps"], demos: ["basic"] },
  },
  {
    id: "design-presets",
    category: "theming",
    api: ["DesignOptions"],
    demos: ["presets", "axes"],
  },
  {
    id: "theme-palette",
    cssVars: ["ThemeToggle"],
    category: "theming",
    exports: [
      "ThemeProvider",
      "useTheme",
      "ThemeToggle",
      "PaletteToggle",
      "palettes",
    ],
    api: [
      "ThemeProviderProps",
      "ThemeContextValue",
      "ThemeToggleProps",
      "PaletteToggleProps",
    ],
    demos: ["toggles", "palette-swatches", "use-theme"],
    wc: {
      entry: "theme-toggle",
      tags: ["minerva-theme-toggle", "minerva-palette-toggle"],
      demos: ["basic", "palette", "events"],
    },
    native: {
      exports: [
        "ThemeToggle",
        "PaletteToggle",
        "PresetToggle",
        "ThemeProvider",
      ],
      api: [
        "ThemeToggleProps",
        "PaletteToggleProps",
        "PresetToggleProps",
        "MinervaProviderProps",
      ],
      demos: ["preset", "toggles"],
    },
  },
  {
    id: "table",
    cssVars: ["Table"],
    category: "dataDisplay",
    exports: [
      "Table",
      "TableRoot",
      "TableHead",
      "TableBody",
      "TableRow",
      "TableHeader",
      "TableCell",
      "TableCellContent",
      "DataTable",
      "computeFixedColumnLayout",
    ],
    api: [
      "TableProps",
      "TableColumn",
      "DataTableProps",
      "TableRootProps",
      "TableScrollConfig",
      "TableSortState",
      "TableRowSelection",
      "TableCellContentProps",
      "FixedColumnLayout",
    ],
    demos: [
      "basic",
      "variants",
      "fixed-columns",
      "states",
      "data-table",
      "compound",
      "cell-content",
      "sorting",
      "selection",
    ],
    wc: {
      entry: "data-table",
      tags: ["minerva-data-table", "minerva-table-cell-content"],
      demos: ["basic", "pagination", "selection", "sorting"],
    },
    native: {
      exports: [
        "Table",
        "TableRoot",
        "TableHead",
        "TableBody",
        "TableRow",
        "TableHeader",
        "TableCell",
        "TableCellContent",
        "DataTable",
      ],
      api: ["TableProps", "TableCellContentProps", "DataTableProps"],
      demos: ["basic"],
    },
  },
  {
    id: "nav-tree",
    cssVars: ["NavTree"],
    category: "navigation",
    exports: ["NavTree"],
    api: ["NavTreeProps", "NavTreeSection", "NavTreeItem", "NavTreeItemState"],
    demos: ["basic", "collapsed", "custom-link"],
    wc: {
      entry: "nav-tree",
      tags: ["minerva-nav-tree"],
      demos: ["basic", "collapsed", "expansion"],
    },
    native: { exports: ["NavTree"], api: ["NavTreeProps"], demos: ["basic"] },
  },
  {
    id: "tabs",
    cssVars: ["Tabs"],
    category: "navigation",
    exports: ["Tabs", "TabList", "Tab", "TabPanel"],
    api: ["TabsProps", "TabListProps", "TabProps", "TabPanelProps"],
    demos: ["basic", "variants", "colors", "vertical"],
    wc: {
      entry: "tabs",
      tags: ["minerva-tabs", "minerva-tab", "minerva-tab-panel"],
      demos: ["basic", "variants", "vertical", "controlled", "panels"],
    },
    native: {
      exports: ["Tabs", "TabList", "Tab", "TabPanel"],
      api: [
        "TabsProps",
        "TabListProps",
        "TabProps",
        "TabPanelProps",
        "TabsItemData",
      ],
      demos: ["basic", "compound", "scrollable", "variants"],
    },
  },
  {
    id: "html-preview",
    cssVars: ["HtmlPreview"],
    category: "dataDisplay",
    exports: ["HtmlPreview"],
    api: ["HtmlPreviewProps"],
    demos: ["basic", "viewports"],
    wc: {
      entry: "html-preview",
      tags: ["minerva-html-preview"],
      demos: ["basic", "viewport", "sanitized"],
    },
    native: {
      exports: ["HtmlPreview"],
      api: ["HtmlPreviewProps"],
      demos: ["basic"],
    },
  },
  {
    id: "monaco-code-editor",
    cssVars: ["MonacoCodeEditor"],
    category: "editors",
    api: ["MonacoCodeEditorProps"],
    demos: ["basic"],
    wc: {
      // optional entry (not in the all-in-one entry nor the CDN bundle)
      entry: "code-editor",
      tags: ["minerva-code-editor"],
      demos: ["basic", "fallback"],
    },
    native: {
      exports: ["CodeEditor"],
      api: ["CodeEditorProps"],
      demos: ["basic"],
    },
  },
  {
    id: "steps",
    cssVars: ["Steps"],
    category: "navigation",
    exports: ["Steps"],
    api: ["StepsProps", "StepsItem"],
    demos: ["basic", "read-only", "styling"],
    wc: {
      entry: "steps",
      tags: ["minerva-steps"],
      demos: ["basic", "navigable", "styling"],
    },
    native: {
      exports: ["Steps"],
      api: ["StepsProps", "StepsItem"],
      demos: ["basic", "vertical"],
    },
  },
  {
    id: "answer-sheet",
    cssVars: ["AnswerSheet"],
    category: "navigation",
    exports: ["AnswerSheet"],
    api: ["AnswerSheetProps", "AnswerSheetItem", "AnswerSheetGroup"],
    demos: ["basic", "groups", "scroll", "sizes"],
    wc: {
      entry: "answer-sheet",
      tags: ["minerva-answer-sheet"],
      demos: ["basic", "groups", "scroll", "sizes"],
    },
    native: {
      exports: ["AnswerSheet"],
      api: ["AnswerSheetProps", "AnswerSheetItem"],
      demos: ["basic"],
    },
  },
  {
    id: "upload",
    cssVars: ["Upload"],
    category: "dataEntry",
    exports: ["Upload"],
    api: ["UploadProps", "UploadItem", "UploadLabels"],
    demos: ["basic", "multiple"],
    wc: {
      entry: "upload",
      tags: ["minerva-upload"],
      demos: ["basic", "transfer", "form"],
    },
    native: { exports: ["Upload"], api: ["UploadProps"], demos: ["basic"] },
  },
  {
    id: "select",
    cssVars: ["Select"],
    category: "dataEntry",
    exports: [
      "Select",
      "SelectItem",
      "SelectGroup",
      "SelectLabel",
      "SelectSeparator",
    ],
    api: [
      "SelectProps",
      "SelectItemProps",
      "SelectGroupProps",
      "SelectLabelProps",
      "SelectSeparatorProps",
    ],
    demos: ["basic", "groups", "sizes-and-states"],
    native: {
      exports: [
        "Select",
        "SelectItem",
        "SelectGroup",
        "SelectLabel",
        "SelectSeparator",
      ],
      api: [
        "SelectSingleProps",
        "SelectMultipleProps",
        "SelectOption",
        "SelectProps",
        "SelectItemProps",
        "SelectGroupProps",
      ],
      demos: ["basic"],
    },
    wc: {
      entry: "select",
      tags: [
        "minerva-option",
        "minerva-option-group",
        "minerva-select-label",
        "minerva-select-separator",
        "minerva-select",
      ],
      demos: ["basic", "groups", "options-property", "form"],
    },
  },
  {
    id: "rating",
    cssVars: ["Rating"],
    category: "dataEntry",
    exports: ["Rating", "RatingScale"],
    api: ["RatingProps", "RatingScaleProps", "RatingDimension"],
    demos: ["basic", "interactive", "scale"],
    wc: {
      entry: "rating",
      tags: ["minerva-rating", "minerva-rating-scale"],
      demos: ["basic", "interactive", "form", "scale"],
    },
    native: {
      exports: ["Rating", "RatingScale"],
      api: ["RatingProps", "RatingScaleProps"],
      demos: ["basic"],
    },
  },
  {
    id: "slider",
    cssVars: ["Slider"],
    category: "dataEntry",
    exports: ["Slider"],
    api: ["SliderProps"],
    demos: ["basic", "range", "marks", "sizes-colors", "committed", "disabled"],
    wc: {
      entry: "slider",
      tags: ["minerva-slider"],
      demos: [
        "basic",
        "range",
        "marks",
        "sizes-colors",
        "committed",
        "disabled",
      ],
    },
    native: {
      exports: ["Slider"],
      api: ["SliderProps"],
      demos: ["basic", "vertical"],
    },
  },
  {
    id: "segmented-control",
    cssVars: ["SegmentedControl"],
    category: "dataEntry",
    exports: ["SegmentedControl"],
    api: ["SegmentedControlProps", "SegmentedControlOptionObject"],
    demos: ["basic", "icons", "sizes", "full-width", "colors"],
    wc: {
      entry: "segmented-control",
      tags: ["minerva-segmented-control"],
      demos: ["basic", "icons", "sizes", "full-width", "colors"],
    },
    native: {
      exports: ["SegmentedControl"],
      api: ["SegmentedControlProps"],
      demos: ["basic"],
    },
  },
  {
    id: "month-calendar",
    cssVars: ["MonthCalendar"],
    category: "dataDisplay",
    exports: ["MonthCalendar"],
    api: ["MonthCalendarProps", "MonthCalendarEvent"],
    demos: ["basic", "sizes", "range"],
    wc: {
      entry: "month-calendar",
      tags: ["minerva-month-calendar"],
      demos: ["basic", "events", "sizes", "range", "localized"],
    },
    native: {
      exports: ["MonthCalendar"],
      api: ["CalendarProps"],
      demos: ["basic"],
    },
  },
  {
    id: "week-strip",
    cssVars: ["WeekStrip"],
    category: "dataDisplay",
    exports: ["WeekStrip"],
    api: ["WeekStripProps"],
    demos: ["basic", "markers", "navigation", "sizes"],
    wc: {
      entry: "week-strip",
      tags: ["minerva-week-strip"],
      demos: ["basic", "markers", "navigation", "sizes"],
    },
    native: {
      exports: ["WeekStrip"],
      api: ["WeekStripProps"],
      demos: ["basic"],
    },
  },
  {
    id: "media-player",
    cssVars: ["MediaPlayer"],
    category: "dataDisplay",
    exports: ["MediaPlayer"],
    api: ["MediaPlayerProps", "MediaPlayerHandle", "MediaPlayerTrack"],
    demos: ["video", "audio", "resume", "rates-skip", "captions"],
    wc: {
      entry: "media-player",
      tags: ["minerva-media-player"],
      demos: ["video", "audio", "resume", "rates-skip", "captions"],
    },
    native: {
      exports: ["MediaControls"],
      api: ["MediaControlsProps"],
      demos: ["basic", "captions"],
    },
  },
  {
    id: "dashboard-columns",
    cssVars: ["DashboardColumns"],
    category: "dataDisplay",
    exports: ["DashboardColumns", "DashboardColumn", "DashboardCard"],
    api: [
      "DashboardColumnsProps",
      "DashboardColumnProps",
      "DashboardCardProps",
    ],
    demos: ["basic", "colors", "empty-actions", "fixed-height", "drag-drop"],
    wc: {
      entry: "dashboard-columns",
      tags: [
        "minerva-dashboard-columns",
        "minerva-dashboard-column",
        "minerva-dashboard-card",
      ],
      demos: ["basic", "colors", "empty-actions", "fixed-height", "drag-drop"],
    },
    native: {
      exports: ["DashboardColumns", "DashboardColumn", "DashboardCard"],
      api: [
        "DashboardColumnsProps",
        "DashboardColumnProps",
        "DashboardCardProps",
      ],
      demos: ["basic", "drag-drop"],
    },
  },
  {
    id: "flashcard",
    cssVars: ["Flashcard"],
    category: "dataDisplay",
    exports: ["Flashcard"],
    api: ["FlashcardProps"],
    demos: ["basic", "controlled", "axis-variants", "reduced-disabled"],
    wc: {
      entry: "flashcard",
      tags: ["minerva-flashcard"],
      demos: ["basic", "controlled", "axis-variants", "reduced-disabled"],
    },
    native: {
      exports: ["Flashcard"],
      api: ["FlashcardProps"],
      demos: ["basic"],
    },
  },

  // Charts (minerva-design/charts: GPU engine + React components)
  {
    id: "charts",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["Chart"],
    api: [
      "ChartProps",
      "ChartCommonProps",
      "ChartHandle",
      "ChartSeries",
      "ChartPointDatum",
      "ChartColumnData",
      "ChartAxisOptions",
      "ChartRectAnnotation",
      "ChartLineAnnotation",
      "ChartTextAnnotation",
      "ChartInteractionOptions",
      "ChartTooltipOptions",
      "ChartLegendOptions",
      "ChartPadding",
      "ChartHoverEvent",
      "ChartHoverItem",
      "ChartPlotClickEvent",
      "ChartView",
    ],
    demos: [
      "gallery",
      "gallery-statistics",
      "gallery-relations",
      "gallery-graphs",
      "gallery-finance",
      "gallery-3d",
      "mixed",
      "dashboard",
      "renderers",
      "annotations",
      "palette",
    ],
    native: {
      exports: ["Chart"],
      api: ["ChartProps", "ChartCommonProps", "ChartHandle"],
      demos: ["mixed"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-chart", "minerva-shape-chart"],
      demos: ["mixed-series", "events"],
    },
  },
  {
    id: "line-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["LineChart"],
    api: ["LineChartProps"],
    demos: [
      "basic",
      "area",
      "curves",
      "stacked",
      "time-series",
      "traffic-events",
      "gaps",
      "thresholds",
      "zoom",
      "large-data",
      "live-sensor",
      "log-scale",
      "measure",
      "index-tooltip",
      "small-multiples",
    ],
    native: {
      exports: ["LineChart"],
      api: ["LineChartProps"],
      demos: ["basic", "area"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-line-chart"],
      demos: ["trend", "reset-zoom"],
    },
  },
  {
    id: "area-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["AreaChart"],
    api: ["AreaChartProps"],
    demos: [
      "basic",
      "stacked",
      "percent",
      "step",
      "energy-mix",
      "cumulative",
      "mirrored",
      "zoom-total",
      "hover-panel",
      "year-over-year",
      "disk-forecast",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-area-chart"],
      demos: ["stacked", "percent"],
    },
    native: {
      exports: ["AreaChart"],
      api: ["AreaChartProps"],
      demos: ["basic"],
    },
  },
  {
    id: "range-area-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["RangeAreaChart"],
    api: ["RangeAreaChartProps"],
    demos: [
      "forecast",
      "temperature",
      "fan",
      "price-range",
      "anomaly-band",
      "bid-ask",
      "climate-scenarios",
      "ab-test",
    ],
    native: {
      exports: ["RangeAreaChart"],
      api: ["RangeAreaChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-range-area-chart"],
      demos: ["forecast", "temperature"],
    },
  },
  {
    id: "bar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BarChart"],
    api: ["BarChartProps"],
    demos: [
      "basic",
      "stacked",
      "labels",
      "percent",
      "combo",
      "grouped",
      "profit-loss",
      "ranking",
      "target",
      "drilldown",
      "period-compare",
      "deployments",
      "ev-charging",
    ],
    native: {
      exports: ["BarChart"],
      api: ["BarChartProps"],
      demos: ["basic", "stacked"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-bar-chart"],
      demos: ["grouped", "stacked"],
    },
  },
  {
    id: "horizontal-bar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["HorizontalBarChart"],
    api: ["HorizontalBarChartProps"],
    demos: [
      "basic",
      "diverging",
      "progress",
      "long-labels",
      "grouped",
      "negative",
      "top-n",
      "race",
      "salary-bands",
      "error-budget",
    ],
    native: {
      exports: ["HorizontalBarChart"],
      api: ["HorizontalBarChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-horizontal-bar-chart"],
      demos: ["ranking", "survey"],
    },
  },
  {
    id: "mixed-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["MixedChart"],
    api: ["MixedChartProps", "ChartProps", "ChartLabels"],
    demos: [
      "revenue-growth",
      "climate",
      "conversion",
      "pareto",
      "log-scale",
      "locale",
      "solar-battery",
      "inventory",
      "ops-overview",
      "burndown",
    ],
    native: {
      exports: ["MixedChart"],
      api: ["MixedChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-mixed-chart"],
      demos: ["revenue-growth", "climate"],
    },
  },
  {
    id: "scatter-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["ScatterChart"],
    api: ["ScatterChartProps"],
    demos: [
      "basic",
      "labels",
      "trend",
      "categories",
      "outliers",
      "large-data",
      "zoom-controls",
      "selection",
      "players",
      "live-stream",
      "log-log",
    ],
    native: {
      exports: ["ScatterChart"],
      api: ["ScatterChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-scatter-chart"],
      demos: ["clusters", "point-click"],
    },
  },
  {
    id: "bubble-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BubbleChart", "bubbleSeries"],
    api: ["BubbleChartProps", "BubbleOptions"],
    demos: [
      "countries",
      "log-scale",
      "portfolio",
      "pipeline",
      "risk-matrix",
      "campaigns",
      "shared-scale",
      "playback",
    ],
    native: {
      exports: ["BubbleChart"],
      api: ["BubbleChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-bubble-chart"],
      demos: ["countries", "portfolio"],
    },
  },
  {
    id: "quadrant-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["QuadrantChart"],
    api: [
      "QuadrantChartProps",
      "QuadrantConfig",
      "QuadrantDropTarget",
      "QuadrantHeaderInfo",
      "QuadrantPoint",
      "QuadrantRegions",
      "QuadrantRegion",
      "QuadrantAxisLabels",
    ],
    demos: [
      "basic",
      "eisenhower",
      "draggable",
      "triage",
      "quadrant-header",
      "bcg",
      "risk",
      "positioning",
      "rice",
      "swot",
      "competitors",
      "talent",
      "live-services",
    ],
    native: {
      exports: ["QuadrantChart"],
      api: ["QuadrantChartProps", "QuadrantConfig", "QuadrantDropTarget"],
      demos: ["basic", "draggable", "triage"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-quadrant-chart"],
      demos: ["priorities", "point-click", "triage"],
    },
  },
  {
    // exported by minerva-design (it renders Modal, Input, Select...), built
    // on the quadrant chart of minerva-design/charts
    id: "quadrant-task-board",
    category: "charts",
    cssVars: ["QuadrantTaskBoard"],
    exports: ["QuadrantTaskBoard"],
    api: ["QuadrantTaskBoardProps", "QuadrantTaskLabels", "QuadrantConfig"],
    demos: ["basic", "custom-labels"],
    wc: {
      entry: "quadrant-task-board",
      tags: ["minerva-quadrant-task-board"],
      demos: ["basic"],
    },
    native: {
      exports: ["QuadrantTaskBoard"],
      api: ["QuadrantTaskBoardProps"],
      demos: ["basic"],
    },
  },
  {
    id: "histogram-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["HistogramChart", "binValues", "histogramSeries", "quantiles"],
    api: ["HistogramChartProps", "BinOptions", "HistogramBins"],
    demos: [
      "latency",
      "binning",
      "ages",
      "comparison",
      "quality-control",
      "order-values",
      "live-samples",
      "commute",
    ],
    native: {
      exports: ["HistogramChart"],
      api: ["HistogramChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-histogram-chart"],
      demos: ["latency", "binning"],
    },
  },
  {
    id: "boxplot-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BoxPlotChart", "boxplotStats", "boxplotData"],
    api: [
      "BoxPlotChartProps",
      "BoxplotGroup",
      "BoxplotStats",
      "BoxplotStatsOptions",
      "ChartTooltipLabels",
    ],
    demos: [
      "services",
      "horizontal",
      "grouped",
      "temperatures",
      "build-times",
      "wait-times",
      "asset-sizes",
      "live-regions",
    ],
    native: {
      exports: ["BoxPlotChart"],
      api: ["BoxPlotChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-box-plot-chart"],
      demos: ["services", "horizontal"],
    },
  },
  {
    id: "waterfall-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["WaterfallChart", "waterfallSeries"],
    api: [
      "WaterfallChartProps",
      "WaterfallStep",
      "WaterfallOptions",
      "ChartConnectorOptions",
    ],
    demos: [
      "pnl",
      "cash-flow",
      "variance",
      "headcount",
      "arr-bridge",
      "price-bridge",
      "emissions",
      "lead-time",
      "live-balance",
      "options",
    ],
    native: {
      exports: ["WaterfallChart"],
      api: ["WaterfallChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-waterfall-chart"],
      demos: ["pnl", "cash-flow"],
    },
  },
  {
    id: "gantt-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["GanttChart", "ganttSeries"],
    api: ["GanttChartProps", "GanttTask", "GanttOptions"],
    demos: [
      "project",
      "dependencies",
      "crews",
      "roadmap",
      "sprint",
      "locale",
      "release-train",
      "critical-path",
      "resources",
      "live-deploy",
      "onboarding",
      "daily",
    ],
    native: {
      exports: ["GanttChart"],
      api: ["GanttChartProps"],
      demos: ["basic", "daily"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-gantt-chart"],
      demos: ["project", "sprint", "daily"],
    },
  },
  {
    id: "heatmap-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["HeatmapChart"],
    api: ["HeatmapChartProps", "HeatmapConfig", "HeatmapCell"],
    demos: [
      "basic",
      "color-scale",
      "activity",
      "correlation",
      "retention",
      "large-grid",
      "conversion",
      "rack-temperatures",
      "confusion-matrix",
      "sales-regions",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-heatmap-chart"],
      demos: ["weekly-activity", "color-scale"],
    },
    native: {
      exports: ["HeatmapChart"],
      api: ["HeatmapChartProps"],
      demos: ["basic"],
    },
  },
  {
    id: "calendar-heatmap",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["CalendarHeatmap"],
    api: ["CalendarHeatmapProps", "CalendarDatum"],
    demos: [
      "contributions",
      "streak",
      "multi-year",
      "months",
      "locale",
      "energy",
      "sleep",
      "incidents",
      "habit-toggle",
    ],
    native: {
      exports: ["CalendarHeatmap"],
      api: ["CalendarHeatmapProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-calendar-heatmap"],
      demos: ["contributions", "months"],
    },
  },
  {
    id: "sparkline",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["Sparkline"],
    api: ["SparklineProps", "SparklineConfig"],
    demos: [
      "basic",
      "kpi-cards",
      "table",
      "watchlist",
      "inline",
      "servers",
      "hover-value",
      "step-goal",
      "weather",
      "periods",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-sparkline"],
      demos: ["kpi", "reference"],
    },
    native: {
      exports: ["Sparkline"],
      api: ["SparklineProps"],
      demos: ["basic"],
    },
  },
  {
    id: "pie-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["PieChart", "DonutChart"],
    api: [
      "PieChartProps",
      "DonutChartProps",
      "ShapeChartCommonProps",
      "ShapeDatum",
      "ShapeHoverEvent",
      "ShapeLegendOptions",
      "ShapeTooltipOptions",
    ],
    demos: [
      "basic",
      "donut",
      "rose",
      "labels",
      "market-share",
      "nested",
      "small-multiples",
      "portfolio",
      "live-poll",
      "drill-down",
      "survey-quarters",
    ],
    native: {
      exports: ["PieChart", "DonutChart"],
      api: [
        "PieChartProps",
        "DonutChartProps",
        "ShapeChartCommonProps",
        "ShapeChartFrameProps",
        "ShapeChartHandle",
      ],
      demos: ["basic", "donut"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-pie-chart", "minerva-donut-chart"],
      demos: ["pie", "donut"],
    },
  },
  {
    id: "radial-bar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["RadialBarChart"],
    api: ["RadialBarChartProps", "RadialBarDatum"],
    demos: [
      "activity",
      "okr",
      "quota",
      "styles",
      "savings-goals",
      "leaderboard",
      "uploads",
      "survey",
    ],
    native: {
      exports: ["RadialBarChart"],
      api: ["RadialBarChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-radial-bar-chart"],
      demos: ["activity", "okr"],
    },
  },
  {
    id: "radar-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["RadarChart"],
    api: ["RadarChartProps", "RadarIndicator", "RadarSeries"],
    demos: [
      "basic",
      "compare",
      "circle",
      "players",
      "capabilities",
      "nutrition",
      "live-monitor",
      "review-360",
      "sales-targets",
    ],
    native: {
      exports: ["RadarChart"],
      api: ["RadarChartProps"],
      demos: ["basic", "compare"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-radar-chart"],
      demos: ["compare", "circle"],
    },
  },
  {
    id: "gauge-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["GaugeChart"],
    api: ["GaugeChartProps", "GaugeBand"],
    demos: [
      "basic",
      "bands",
      "live",
      "speedometer",
      "quota",
      "slo",
      "thermostat",
      "credit-score",
      "battery",
      "dark-panel",
    ],
    native: {
      exports: ["GaugeChart"],
      api: ["GaugeChartProps"],
      demos: ["basic", "bands"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-gauge-chart"],
      demos: ["bands", "needle"],
    },
  },
  {
    id: "bullet-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["BulletChart"],
    api: ["BulletChartProps", "BulletDatum"],
    demos: [
      "sales",
      "vertical",
      "traffic-lights",
      "monthly",
      "long-names",
      "budget-tracker",
      "live-sensors",
      "training",
      "hiring-plan",
    ],
    native: {
      exports: ["BulletChart"],
      api: ["BulletChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-bullet-chart"],
      demos: ["kpis", "vertical"],
    },
  },
  {
    id: "funnel-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["FunnelChart"],
    api: ["FunnelChartProps"],
    demos: [
      "basic",
      "bars",
      "ecommerce",
      "recruiting",
      "compare",
      "campaigns",
      "what-if",
      "live-sale",
      "sales-pipeline",
    ],
    native: {
      exports: ["FunnelChart"],
      api: ["FunnelChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-funnel-chart"],
      demos: ["conversion", "bars"],
    },
  },
  {
    id: "treemap-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["TreemapChart"],
    api: ["TreemapChartProps", "TreemapNode"],
    demos: [
      "basic",
      "flat",
      "market-map",
      "bundle",
      "drill-down",
      "cloud-costs",
      "live-cluster",
      "metric-switch",
    ],
    native: {
      exports: ["TreemapChart"],
      api: ["TreemapChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-treemap-chart"],
      demos: ["nested", "flat"],
    },
  },
  {
    id: "sunburst-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["SunburstChart"],
    api: ["SunburstChartProps", "TreemapNode", "ShapeDrillEvent"],
    demos: [
      "disk-usage",
      "drill-down",
      "org",
      "labels",
      "city-budget",
      "time-tracking",
      "live-requests",
      "energy-mix",
    ],
    native: {
      exports: ["SunburstChart"],
      api: ["SunburstChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-sunburst-chart"],
      demos: ["disk-usage", "drill-down"],
    },
  },
  {
    id: "sankey-chart",
    category: "charts",
    package: "minerva-design/charts",
    exports: ["SankeyChart"],
    api: ["SankeyChartProps", "SankeyNode", "SankeyLink"],
    demos: [
      "energy",
      "journey",
      "budget",
      "options",
      "income-statement",
      "supply-chain",
      "hiring-funnel",
      "live-traffic",
      "plastic",
    ],
    native: {
      exports: ["SankeyChart"],
      api: ["SankeyChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-sankey-chart"],
      demos: ["energy", "journey"],
    },
  },

  // Finance and trading charts
  {
    id: "candlestick-chart",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["CandlestickChart"],
    api: ["CandlestickChartProps"],
    demos: [
      "basic",
      "bar-styles",
      "moving-average",
      "ma-ribbon",
      "volume",
      "volume-colors",
      "a-share",
      "events",
      "intraday",
      "live",
      "large-data",
      "dark",
      "patterns",
      "watchlist",
      "fx-pips",
    ],
    wc: {
      entry: "chart",
      tags: ["minerva-candlestick-chart"],
      demos: ["ohlc", "moving-average"],
    },
    native: {
      exports: ["CandlestickChart"],
      api: ["CandlestickChartProps"],
      demos: ["basic"],
    },
  },
  {
    id: "trading-chart",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["TradingChart"],
    api: [
      "TradingChartProps",
      "TradingChartOptions",
      "TradingChartHandle",
      "TradingBar",
      "TradingBarColumns",
      "TradingPriceLine",
      "TradingMarker",
      "TradingCompareSeries",
      "TradingDrawing",
      "TradingDrawingPoint",
      "TradingChartLabels",
      "TradingCrosshairEvent",
      "TradingClickEvent",
      "TradingOrderMoveEvent",
      "TradingVisibleRange",
      "TradingIndicatorToggleEvent",
      "TradingHistoryRequestEvent",
      "TradingVolumeProfileOptions",
      "TradingOrderCreateEvent",
      "TradingOrderCancelEvent",
      "TradingReplayState",
      "TradingUndoState",
      "TradingSyncOptions",
    ],
    demos: [
      "pro-terminal",
      "streaming",
      "tick-chart",
      "chart-styles",
      "drawing-tools",
      "volume-profile",
      "orders",
      "order-entry",
      "multi-chart",
      "replay",
      "compare",
      "sessions",
      "history",
      "million-bars",
      "export",
      "red-up",
      "dark-terminal",
      "price-alerts",
      "trade-journal",
      "mobile",
    ],
    wc: {
      entry: "trading-chart",
      tags: ["minerva-trading-chart"],
      demos: ["candles", "streaming"],
    },
  },
  {
    id: "technical-indicators",
    category: "financeCharts",
    package: "minerva-design/charts/core",
    exports: [
      "createTradingChart",
      "sma",
      "ema",
      "wma",
      "bollinger",
      "macd",
      "rsi",
      "kdj",
      "atr",
      "vwap",
      "heikinAshi",
      "psar",
      "ichimoku",
      "supertrend",
      "keltner",
      "donchian",
      "obv",
      "cci",
      "stochRsi",
      "dmi",
      "williamsR",
      "mfi",
      "volumeProfile",
      "resampleBars",
      "syncCharts",
    ],
    api: [
      "TradingMovingAverageIndicator",
      "TradingBollingerIndicator",
      "TradingVwapIndicator",
      "TradingVolumeIndicator",
      "TradingMacdIndicator",
      "TradingRsiIndicator",
      "TradingKdjIndicator",
      "TradingAtrIndicator",
      "TradingParabolicSarIndicator",
      "TradingIchimokuIndicator",
      "TradingSupertrendIndicator",
      "TradingKeltnerIndicator",
      "TradingDonchianIndicator",
      "TradingObvIndicator",
      "TradingCciIndicator",
      "TradingStochRsiIndicator",
      "TradingDmiIndicator",
      "TradingWilliamsRIndicator",
      "TradingMfiIndicator",
      "TradingIndicatorBase",
      "TradingPaneIndicatorBase",
      "TradingVolumeProfile",
      "TradingChartInstance",
      "TradingChartEventMap",
    ],
    demos: [
      "moving-averages",
      "bollinger",
      "channels",
      "ichimoku",
      "supertrend",
      "vwap",
      "macd",
      "rsi",
      "oscillators",
      "kdj",
      "dmi",
      "atr",
      "obv",
      "heikin-ashi",
      "signals",
      "vanilla",
      "divergence",
      "multi-timeframe",
      "screener",
    ],
    wc: {
      entry: "trading-chart",
      tags: [],
      demos: ["bollinger", "panes"],
    },
  },
  {
    id: "depth-chart",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["DepthChart"],
    api: [
      "DepthChartProps",
      "DepthChartHandle",
      "DepthChartOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "DepthChartLabels",
      "DepthChartPriceLine",
      "DepthPoint",
      "OrderBookSnapshot",
      "OrderBookDelta",
    ],
    demos: [
      "basic",
      "live",
      "range",
      "walls",
      "dark",
      "compact",
      "red-up",
      "slippage",
      "imbalance",
      "equity",
      "venues",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-depth-chart"],
      demos: ["book", "live"],
    },
  },
  {
    id: "order-book",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["OrderBook"],
    api: [
      "OrderBookProps",
      "OrderBookHandle",
      "OrderBookOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "OrderBookLabels",
      "OrderBookLevelEvent",
      "OrderBookSnapshot",
      "OrderBookDelta",
      "OrderBookLevelColumns",
    ],
    demos: [
      "basic",
      "live",
      "grouping",
      "large-orders",
      "modes",
      "terminal",
      "dark",
      "compact",
      "red-up",
      "markets",
      "wall-watch",
      "order-ticket",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-order-book"],
      demos: ["ladder", "live"],
    },
  },
  {
    id: "order-book-heatmap",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["OrderBookHeatmap"],
    api: [
      "OrderBookHeatmapProps",
      "OrderBookHeatmapHandle",
      "OrderBookHeatmapOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "OrderBookHeatmapLabels",
      "OrderBookHeatmapHoverEvent",
      "MarketTrade",
    ],
    demos: [
      "basic",
      "live",
      "color-scale",
      "large-trades",
      "dark",
      "compact",
      "red-up",
      "price-resolution",
      "time-window",
      "linked",
      "perpetual",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-order-book-heatmap"],
      demos: ["liquidity", "red-up"],
    },
  },
  {
    id: "time-and-sales",
    category: "financeCharts",
    package: "minerva-design/charts",
    exports: ["TimeAndSales"],
    api: [
      "TimeAndSalesProps",
      "TimeAndSalesHandle",
      "TimeAndSalesOptions",
      "OrderBookCommonOptions",
      "OrderBookWidgetProps",
      "TimeAndSalesLabels",
      "TimeAndSalesRowEvent",
      "MarketTrade",
      "TimeAndSalesInstance",
    ],
    demos: [
      "basic",
      "live",
      "large-trades",
      "filters",
      "large-data",
      "dark",
      "compact",
      "red-up",
      "pressure",
      "clock",
      "block-alerts",
      "split",
    ],
    wc: {
      entry: "order-book",
      tags: ["minerva-time-and-sales"],
      demos: ["tape", "large-trades"],
    },
  },

  // 3D charts
  {
    id: "scatter-3d-chart",
    category: "charts3d",
    package: "minerva-design/charts",
    exports: ["Scatter3DChart", "Line3DChart"],
    api: [
      "Scatter3DChartProps",
      "Line3DChartProps",
      "Chart3DCommonProps",
      "Chart3DHandle",
      "Scatter3DSeries",
      "Line3DSeries",
      "Chart3DSeriesBase",
      "Chart3DPoint",
      "Chart3DColumnData",
      "Chart3DAxisOptions",
      "Chart3DCameraOptions",
      "Chart3DCameraState",
      "Chart3DInteractionOptions",
      "Chart3DColorBarOptions",
      "Chart3DHoverEvent",
      "Chart3DLabels",
    ],
    demos: [
      "clusters",
      "galaxy",
      "color-by-value",
      "auto-rotate",
      "camera",
      "trajectory",
      "renderer",
      "embeddings",
      "lidar",
      "satellites",
      "portfolio-risk",
    ],
    wc: {
      entry: "chart-3d",
      tags: ["minerva-scatter-3d-chart", "minerva-line-3d-chart"],
      demos: ["clusters", "trajectory"],
    },
  },
  {
    id: "surface-3d-chart",
    category: "charts3d",
    package: "minerva-design/charts",
    exports: ["Surface3DChart"],
    api: [
      "Surface3DChartProps",
      "Surface3DSeries",
      "Surface3DData",
      "Surface3DWireframeOptions",
      "Surface3DContourOptions",
      "Chart3DLightingOptions",
      "Chart3DCommonProps",
      "Chart3DSeriesBase",
    ],
    demos: [
      "functions",
      "terrain",
      "volatility",
      "wireframe-contours",
      "transparency",
      "live-wave",
      "heat-diffusion",
      "yield-curve",
      "loss-landscape",
      "wifi-signal",
    ],
    wc: {
      entry: "chart-3d",
      tags: ["minerva-surface-3d-chart"],
      demos: ["ripple", "terrain"],
    },
  },
  {
    id: "bar-3d-chart",
    category: "charts3d",
    package: "minerva-design/charts",
    exports: ["Bar3DChart"],
    api: [
      "Bar3DChartProps",
      "Bar3DSeries",
      "Bar3DDatum",
      "Chart3DCommonProps",
      "Chart3DSeriesBase",
      "Chart3DLegendOptions",
      "Chart3DTooltipOptions",
    ],
    demos: [
      "sales",
      "stacked",
      "pyramid",
      "traffic",
      "margin",
      "inventory-live",
      "cohort-retention",
      "budget-variance",
      "datacenter",
    ],
    wc: {
      entry: "chart-3d",
      tags: ["minerva-bar-3d-chart"],
      demos: ["sales", "stacked"],
    },
  },

  // Relationship and hierarchy charts
  // @graph-pages: graph-chart, dependency-graph, tree-chart (engine/graph)
  {
    id: "graph-chart",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["GraphChart"],
    api: [
      "GraphChartProps",
      "GraphCommonProps",
      "GraphChartHandle",
      "GraphNode",
      "GraphEdge",
      "GraphGroup",
      "GraphForceOptions",
      "GraphCircularOptions",
      "GraphInteractionOptions",
      "GraphLegendOptions",
      "GraphTooltipOptions",
      "GraphHoverEvent",
      "GraphChartLabels",
      "GraphChartOptions",
      "GraphChartInstance",
      "GraphChartEventMap",
      "GraphForceLayoutOptions",
      "GraphForceSimulation",
    ],
    demos: [
      "characters",
      "large-network",
      "transitions",
      "circular",
      "arc",
      "vanilla",
      "service-map",
      "knowledge-graph",
      "friend-suggestions",
      "fraud-ring",
    ],
    wc: {
      entry: "graph",
      tags: ["minerva-graph-chart"],
      demos: ["routes", "circular"],
    },
  },
  {
    id: "dependency-graph",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["DependencyGraph"],
    api: [
      "DependencyGraphProps",
      "GraphDagOptions",
      "GraphCriticalPath",
      "GraphDagLayoutOptions",
      "GraphDagLayoutResult",
    ],
    demos: [
      "packages",
      "pipeline",
      "lineage",
      "build-scheduler",
      "project-plan",
      "impact-analysis",
      "course-prerequisites",
      "spreadsheet",
    ],
    wc: {
      entry: "graph",
      tags: ["minerva-dependency-graph"],
      demos: ["pipeline", "modules"],
    },
  },
  {
    id: "tree-chart",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["TreeChart"],
    api: [
      "TreeChartProps",
      "GraphTreeOptions",
      "GraphToggleEvent",
      "GraphTreeLayoutOptions",
      "GraphTreeLayoutResult",
    ],
    demos: [
      "org-chart",
      "mind-map",
      "radial",
      "file-tree",
      "decision-tree",
      "taxonomy-search",
      "disk-usage",
      "wbs",
      "bracket",
    ],
    wc: {
      entry: "graph",
      tags: ["minerva-tree-chart"],
      demos: ["org", "mind-map"],
    },
  },
  // @chord-pages: chord-chart (shape engine)
  {
    id: "chord-chart",
    category: "graphCharts",
    package: "minerva-design/charts",
    exports: ["ChordChart"],
    api: ["ChordChartProps", "ChordGroup", "ChordLink"],
    demos: [
      "basic",
      "migration",
      "dependencies",
      "trade",
      "directed",
      "dark",
      "options",
      "brand-switching",
      "focus",
      "co-purchase",
      "live",
      "legend",
    ],
    native: {
      exports: ["ChordChart"],
      api: ["ChordChartProps"],
      demos: ["basic"],
    },
    wc: {
      entry: "chart",
      tags: ["minerva-chord-chart"],
      demos: ["teams", "migration"],
    },
  },

  // Chart engine, performance and the other platforms
  {
    id: "chart-engine",
    category: "chartEngine",
    package: "minerva-design/charts/core",
    exports: [
      "createChart",
      "createCanvasChart",
      "createChartController",
      "scenePrimitives",
      "createShapeChart",
      "createCanvasShapeChart",
      "quadrantChartOptions",
      "quadrantOf",
      "quadrantCenter",
      "quadrantGroups",
      "quadrantLabels",
      "quadrantCountText",
      "quadrantAccessibleGroups",
      "quadrantKeyTarget",
      "createQuadrantPointLayer",
      "createQuadrantPointCard",
      "withQuadrantCard",
      "QUADRANT_CARD_LINGER_MS",
      "QUADRANT_CORNERS",
      "quadrantTaskLabels",
      "newQuadrantTaskDraft",
      "editQuadrantTaskDraft",
      "canSaveQuadrantTask",
      "applyQuadrantTaskDraft",
      "moveQuadrantTask",
      "removeQuadrantTask",
      "selectionAfterRemove",
      "quadrantTaskDeleteText",
      "placeQuadrantTaskPanel",
      "quadrantTaskColor",
      "quadrantTaskIconUri",
      "QUADRANT_TASK_ICONS",
      "heatmapChartOptions",
      "sparklineOptions",
      "formatCompact",
      "binValues",
      "histogramSeries",
      "quantiles",
      "boxplotStats",
      "boxplotData",
      "bubbleSeries",
      "waterfallSeries",
      "ganttSeries",
      "createTradingChart",
      "createDepthChart",
      "createOrderBook",
      "createOrderBookHeatmap",
      "createTimeAndSales",
      "createOrderBookStore",
      "createChart3D",
      "withSeriesType",
      "lineSeries",
      "areaSeries",
      "rangeAreaSeries",
      "barSeries",
      "scatterSeries",
      "candlestickSeries",
      "boxplotSeries",
      "formatDuration",
      "createGraphChart",
      "createForceSimulation",
      "forceLayout",
      "dagLayout",
      "countCrossings",
      "criticalPath",
      "treeLayout",
      "circularLayout",
      "arcLayout",
      "getDefaultChartRenderer",
      "setDefaultChartRenderer",
      "subscribeDefaultChartRenderer",
      "formatValue",
    ],
    api: [
      "ChartOptions",
      "ChartInstance",
      "ChartEventMap",
      "ChartDragEvent",
      "ChartDragEndEvent",
      "ChartRect",
      "CanvasChartConfig",
      "CanvasChartInstance",
      "ChartCanvas",
      "ChartTouch",
      "ChartPointerOptions",
      "ChartThemeInput",
      "ChartControllerConfig",
      "ChartController",
      "ChartPrimitiveOptions",
      "ChartLinePrimitive",
      "ChartAreaPrimitive",
      "ChartBarPrimitive",
      "ChartDotPrimitive",
      "ShapeChartInstance",
      "ShapeChartEventMap",
      "PieChartOptions",
      "RadarChartOptions",
      "GaugeChartOptions",
      "FunnelChartOptions",
      "TreemapChartOptions",
      "ShapeChartCommonOptions",
      "CanvasShapeChartConfig",
      "CanvasShapeChartInstance",
    ],
    demos: ["basic", "streaming", "canvas", "shapes"],
  },
  {
    id: "chart-performance",
    category: "chartEngine",
    package: "minerva-design/charts",
    exports: ["LineChart", "ScatterChart", "CandlestickChart", "Chart"],
    demos: ["line", "scatter", "candles", "heatmap", "streaming", "compare"],
    wc: {
      entry: "chart",
      tags: [],
      demos: ["million", "scatter"],
    },
  },
  {
    id: "chart-renderers",
    category: "chartEngine",
    demos: ["environment", "benchmark", "scaling", "switching", "fallback"],
  },
  { id: "mini-program-charts", category: "chartEngine" },

  // Web Components (guides; every component page has a "Web Components" tab)
  {
    id: "web-components",
    category: "webComponents",
    package: "minerva-design/web-components",
    // Utilities of the package (the elements are documented on their pages)
    exports: [
      "defineElement",
      "emit",
      "MinervaElement",
      "hostStyles",
      "FormAssociatedElement",
      "LocaleController",
      "resolveLanguage",
      "AriaController",
      "HasSlotController",
      "AnchoredPositionController",
      "DismissableLayerController",
      "FocusScopeController",
      "ModalController",
      "RovingFocusController",
      "TypeaheadController",
      "FloatingLayerController",
      "popoverResetStyles",
      // helpers re-exported next to their elements
      "matchesShortcut",
      "normalizeShortcuts",
      "computeFixedColumnLayout",
      "SUBMENU_OPEN_DELAY",
      "LONG_PRESS_DELAY",
      "MinervaContextMenu",
      // imperative confirmation (documented on the Confirm page)
      "confirm",
      "confirmFor",
      "confirmScopeOf",
    ],
    demos: ["react"],
  },
  { id: "wc-plain-html", category: "webComponents" },
  { id: "wc-vue", category: "webComponents" },
  { id: "wc-angular", category: "webComponents" },
  { id: "wc-svelte", category: "webComponents" },
  { id: "wc-forms", category: "webComponents" },
  { id: "wc-theming", category: "webComponents" },
  {
    id: "nav-bar",
    category: "mobile",
    native: {
      exports: ["NavBar"],
      api: ["NavBarProps"],
      demos: ["actions", "basic"],
    },
  },
  {
    id: "tab-bar",
    category: "mobile",
    native: {
      exports: ["TabBar", "TabBarItem"],
      api: ["TabBarProps", "TabBarItemProps"],
      demos: ["badges", "basic"],
    },
  },
  {
    id: "pull-refresh",
    category: "mobile",
    native: {
      exports: ["PullRefresh", "usePullRefresh"],
      api: [
        "PullRefreshProps",
        "UsePullRefreshOptions",
        "UsePullRefreshResult",
      ],
      demos: ["basic", "use-pull-refresh"],
    },
  },
  {
    id: "swipe-cell",
    category: "mobile",
    native: {
      exports: ["SwipeCell"],
      api: ["SwipeCellProps", "SwipeCellAction", "SwipeCellHandle"],
      demos: ["basic", "custom-actions"],
    },
  },
  {
    id: "collapse",
    category: "mobile",
    native: {
      exports: ["Collapse", "CollapseItem"],
      api: ["CollapseProps", "CollapseItemProps"],
      demos: ["accordion", "basic"],
    },
  },
  {
    id: "grid",
    category: "mobile",
    native: {
      exports: ["Grid", "GridItem"],
      api: ["GridProps", "GridItemProps"],
      demos: ["basic", "square-columns"],
    },
  },
  {
    id: "image-preview",
    category: "mobile",
    native: {
      exports: ["ImagePreview"],
      api: ["ImagePreviewProps"],
      demos: ["basic", "controlled"],
    },
  },

  // Icons (minerva-design/icons: custom SVG icons, also drawn by the GPU)
  {
    id: "icons",
    category: "icons",
    package: "minerva-design/icons/core",
    exports: ["icons", "iconCategories", "getIcon", "searchIcons"],
    demos: ["gallery"],
  },
  {
    id: "icon",
    category: "icons",
    package: "minerva-design/icons",
    exports: ["Icon", "createIcon", "DynamicIcon"],
    api: ["IconProps", "DynamicIconProps"],
    demos: [
      "basic",
      "size-color",
      "stroke",
      "accessibility",
      "custom",
      "dynamic",
      "canvas",
    ],
    wc: {
      entry: "icon",
      tags: ["minerva-icon"],
      demos: ["basic", "canvas"],
    },
    native: {
      package: "minerva-design/native/icons",
      exports: ["Icon", "createIcon", "DynamicIcon", "SearchIcon"],
      api: ["IconProps", "DynamicIconProps"],
      demos: ["basic"],
    },
  },
  {
    id: "icon-canvas",
    category: "icons",
    package: "minerva-design/icons",
    exports: ["IconCanvas"],
    api: ["IconCanvasProps", "IconCanvasItem", "IconStyle", "IconCanvasHandle"],
    demos: ["basic", "thousands", "renderers"],
    wc: {
      entry: "icon",
      tags: ["minerva-icon-canvas"],
      demos: ["basic"],
    },
  },
  {
    id: "icons-core",
    category: "icons",
    package: "minerva-design/icons/core",
    exports: [
      "toSvg",
      "toSvgDataUri",
      "toSvgBase64DataUri",
      "iconPathData",
      "drawIcon",
      "defineIcon",
      "createIconCanvas",
      "createIconSurface",
      "setDefaultIconRenderer",
      "getDefaultIconRenderer",
      "subscribeDefaultIconRenderer",
      "ICON_RENDERER_PREFERENCES",
      "ICON_RENDERER_ORDER",
      "iconRendererCandidates",
      "parseIconPath",
      "flattenIconPath",
      "tessellateIcon",
    ],
    api: [
      "IconDefinition",
      "IconSvgOptions",
      "DrawIconOptions",
      "IconCanvasOptions",
      "IconCanvasController",
      "IconSurfaceOptions",
      "IconSurface",
      "IconMeshOptions",
      "IconPolyline",
    ],
    demos: ["svg-string", "canvas2d", "controller", "geometry"],
  },
];

export const getDocPage = (id: string) => docPages.find((p) => p.id === id);

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

### apps/docs/src/docs/pages/chart-performance/showcase/data.ts

```tsx
// Data sets of the performance showcases: typed-array columns generated once
// (seeded, so every visit draws the same picture) and shared by the demos of
// the page, plus the camera "tours" that zoom in and out of them.
import type { ChartView } from "minerva-design/charts";

export type Range = [number, number];

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

/** Standard normal numbers (Box-Muller, both values of a pair are used) */
export function gaussian(random: () => number) {
  let spare = NaN;
  return () => {
    if (!Number.isNaN(spare)) {
      const value = spare;
      spare = NaN;
      return value;
    }
    const r = Math.sqrt(-2 * Math.log(1 - random()));
    const a = 2 * Math.PI * random();
    spare = r * Math.sin(a);
    return r * Math.cos(a);
  };
}

/**
 * Generates a data set on first use, one frame later so that a loading
 * state paints first; later calls share the result.
 */
const cached = <T>(generate: () => T) => {
  let promise: Promise<T> | null = null;
  return (): Promise<T> => {
    if (!promise) {
      promise = new Promise<T>((resolve) => {
        const run = () => setTimeout(() => resolve(generate()), 0);
        if (typeof requestAnimationFrame === "function")
          requestAnimationFrame(run);
        else run();
      });
    }
    return promise;
  };
};

const BLOCK = 512;

/**
 * Min / max of index ranges over several columns in O(BLOCK + n / BLOCK):
 * used to fit the y axis to the visible x range on every frame.
 */
export function rangeIndex(
  lows: readonly Float64Array[],
  highs: readonly Float64Array[],
) {
  const n = lows[0]?.length ?? 0;
  const blocks = Math.ceil(n / BLOCK);
  const blockMin = new Float64Array(blocks).fill(Infinity);
  const blockMax = new Float64Array(blocks).fill(-Infinity);
  for (const column of lows) {
    for (let i = 0; i < n; i++) {
      const b = (i / BLOCK) | 0;
      if (column[i] < blockMin[b]) blockMin[b] = column[i];
    }
  }
  for (const column of highs) {
    for (let i = 0; i < n; i++) {
      const b = (i / BLOCK) | 0;
      if (column[i] > blockMax[b]) blockMax[b] = column[i];
    }
  }
  return (from: number, to: number): Range | null => {
    let i = Math.max(0, Math.floor(from));
    const end = Math.min(n - 1, Math.ceil(to));
    if (i > end) return null;
    let lo = Infinity;
    let hi = -Infinity;
    const scan = (index: number) => {
      for (const column of lows) if (column[index] < lo) lo = column[index];
      for (const column of highs) if (column[index] > hi) hi = column[index];
    };
    for (; i <= end && i % BLOCK; i++) scan(i);
    for (; i + BLOCK - 1 <= end; i += BLOCK) {
      const b = i / BLOCK;
      if (blockMin[b] < lo) lo = blockMin[b];
      if (blockMax[b] > hi) hi = blockMax[b];
    }
    for (; i <= end; i++) scan(i);
    return lo <= hi ? [lo, hi] : null;
  };
}

/** Evenly sampled columns: the y range of the samples inside an x range */
export interface Sampled {
  start: number;
  step: number;
  range: (from: number, to: number) => Range | null;
}

/** The y range to show for an x range, with some padding */
export const fitY = (data: Sampled, x: Range): Range | null => {
  const r = data.range(
    (x[0] - data.start) / data.step - 1,
    (x[1] - data.start) / data.step + 1,
  );
  if (!r) return null;
  const pad = (r[1] - r[0]) * 0.08 || 1;
  return [r[0] - pad, r[1] + pad];
};

export interface TourOptions {
  /** Deepest magnification */
  zoom: number;
  /** Seconds of one zoom in / zoom out cycle */
  period?: number;
  /** Data positions to zoom into, one per cycle */
  targets: readonly (readonly [number, number])[];
  /** Zooms the y axis too (scatter, heatmap) */
  y?: boolean;
}

/**
 * A camera path for `setView`: zooms from the whole data set into a target,
 * drifts a little there and zooms out again, then moves to the next target.
 */
export const tour =
  ({ zoom, period = 12, targets, y = false }: TourOptions) =>
  (time: number, base: ChartView): Partial<ChartView> => {
    const cycle = Math.floor(time / period);
    const phase = (time % period) / period;
    const p = (1 - Math.cos(2 * Math.PI * phase)) / 2;
    const target = targets[cycle % targets.length] ?? [NaN, NaN];
    const scale = Math.pow(1 / zoom, p);
    const axis = (range: Range, to: number, drift: number): Range => {
      const full = range[1] - range[0];
      const width = full * scale;
      const mid = (range[0] + range[1]) / 2;
      const goal = Number.isFinite(to) ? to : mid;
      const center = mid + (goal - mid) * p + width * 0.25 * drift * p;
      const start = Math.min(
        Math.max(center - width / 2, range[0]),
        range[1] - width,
      );
      return [start, start + width];
    };
    const x = axis(base.x, target[0], Math.sin(time * 0.7));
    return y ? { x, y: axis(base.y, target[1], Math.cos(time * 0.6)) } : { x };
  };

// ------------------------------------------------------------------ line

export const SIGNAL_SERIES = 4;
export const SIGNAL_LENGTH = 250_000;
const SIGNAL_START = Date.UTC(2026, 0, 1);
const SIGNAL_STEP = 1000;

export interface Signals extends Sampled {
  /** Timestamps, one per second */
  x: Float64Array;
  /** One column per sensor */
  y: Float64Array[];
}

/** 4 sensors × 250,000 samples: daily cycles, drift and noise */
export const loadSignals = cached((): Signals => {
  const normal = gaussian(mulberry32(2026));
  const x = new Float64Array(SIGNAL_LENGTH);
  for (let i = 0; i < SIGNAL_LENGTH; i++) x[i] = SIGNAL_START + i * SIGNAL_STEP;
  const y: Float64Array[] = [];
  for (let s = 0; s < SIGNAL_SERIES; s++) {
    const column = new Float64Array(SIGNAL_LENGTH);
    const level = 18 + s * 14;
    const swing = 3 + s * 1.5;
    let drift = 0;
    for (let i = 0; i < SIGNAL_LENGTH; i++) {
      drift = drift * 0.9995 + normal() * 0.06;
      const day = Math.sin((2 * Math.PI * i) / 86_400 + s * 1.3);
      const fast = Math.sin((2 * Math.PI * i) / (600 + s * 170));
      column[i] = level + day * swing + fast * 0.6 + drift + normal() * 0.25;
    }
    y.push(column);
  }
  return {
    x,
    y,
    start: SIGNAL_START,
    step: SIGNAL_STEP,
    range: rangeIndex(y, y),
  };
});

/** Moments of the signals worth zooming into */
export const SIGNAL_TARGETS: readonly (readonly [number, number])[] = [
  0.22, 0.68, 0.41, 0.87,
].map((f) => [SIGNAL_START + f * SIGNAL_LENGTH * SIGNAL_STEP, NaN] as const);

// --------------------------------------------------------------- scatter

export const CLUSTER_COUNT = 10;
export const CLUSTER_SIZE = 100_000;

export interface Clusters {
  clusters: { x: Float64Array; y: Float64Array }[];
  /** Centers of the clusters (tour targets) */
  centers: (readonly [number, number])[];
}

/** 10 clusters × 100,000 points: blobs, rings and spiral arms */
export const loadClusters = cached((): Clusters => {
  const random = mulberry32(42);
  const normal = gaussian(random);
  const clusters: Clusters["clusters"] = [];
  const centers: Clusters["centers"] = [];
  for (let c = 0; c < CLUSTER_COUNT; c++) {
    const angle = (2 * Math.PI * c) / CLUSTER_COUNT + random() * 0.4;
    const radius = c % 3 === 0 ? 14 : 34;
    const cx = 50 + Math.cos(angle) * radius;
    const cy = 50 + Math.sin(angle) * radius;
    const sx = 2 + random() * 4;
    const sy = 1.5 + random() * 3;
    const rotation = random() * Math.PI;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const x = new Float64Array(CLUSTER_SIZE);
    const y = new Float64Array(CLUSTER_SIZE);
    for (let i = 0; i < CLUSTER_SIZE; i++) {
      let u: number;
      let v: number;
      if (c % 3 === 1) {
        // ring
        const a = random() * 2 * Math.PI;
        const r = 5 + normal() * 0.6;
        u = Math.cos(a) * r;
        v = Math.sin(a) * r;
      } else if (c % 3 === 2) {
        // spiral arm
        const t = random() * 3 * Math.PI;
        u = Math.cos(t) * t * 0.9 + normal() * 0.35;
        v = Math.sin(t) * t * 0.9 + normal() * 0.35;
      } else {
        u = normal() * sx;
        v = normal() * sy;
      }
      x[i] = cx + u * cos - v * sin;
      y[i] = cy + u * sin + v * cos;
    }
    clusters.push({ x, y });
    centers.push([cx, cy]);
  }
  return { clusters, centers };
});

// --------------------------------------------------------------- candles

export const CANDLE_COUNT = 200_000;
const CANDLE_START = Date.UTC(2026, 0, 5);
const CANDLE_STEP = 60_000;

export interface Candles extends Sampled {
  x: Float64Array;
  open: Float64Array;
  high: Float64Array;
  low: Float64Array;
  close: Float64Array;
}

/** 200,000 one-minute candles: a random walk with changing volatility */
export const loadCandles = cached((): Candles => {
  const random = mulberry32(7);
  const normal = gaussian(random);
  const x = new Float64Array(CANDLE_COUNT);
  const open = new Float64Array(CANDLE_COUNT);
  const high = new Float64Array(CANDLE_COUNT);
  const low = new Float64Array(CANDLE_COUNT);
  const close = new Float64Array(CANDLE_COUNT);
  let price = 120;
  for (let i = 0; i < CANDLE_COUNT; i++) {
    const sigma = 0.0012 * (1 + 0.7 * Math.sin(i / 9000) ** 2);
    const o = price;
    const c = o * Math.exp(normal() * sigma + 0.000002);
    x[i] = CANDLE_START + i * CANDLE_STEP;
    open[i] = o;
    close[i] = c;
    high[i] = Math.max(o, c) * (1 + Math.abs(normal()) * sigma * 0.7);
    low[i] = Math.min(o, c) * (1 - Math.abs(normal()) * sigma * 0.7);
    price = c;
  }
  return {
    x,
    open,
    high,
    low,
    close,
    start: CANDLE_START,
    step: CANDLE_STEP,
    range: rangeIndex([low], [high]),
  };
});

export const CANDLE_TARGETS: readonly (readonly [number, number])[] = [
  0.31, 0.74, 0.12, 0.55,
].map((f) => [CANDLE_START + f * CANDLE_COUNT * CANDLE_STEP, NaN] as const);

// --------------------------------------------------------------- heatmap

export const SPECTRUM_STEPS = 1000;
export const SPECTRUM_BINS = 1000;
/** Seconds per time step */
const DT = 0.02;
/** Hz per frequency bin */
const DF = 8;

export interface Spectrogram {
  /** Time of each cell (sorted: the cells go column by column) */
  x: Float64Array;
  /** Frequency of each cell */
  y: Float64Array;
  /** Level in dB */
  value: Float64Array;
}

/**
 * 1,000 time steps × 1,000 frequency bins: a chirp and its harmonics, a
 * warbling tone, periodic clicks and a pink noise floor
 */
export const loadSpectrogram = cached((): Spectrogram => {
  const normal = gaussian(mulberry32(1000));
  const n = SPECTRUM_STEPS * SPECTRUM_BINS;
  const x = new Float64Array(n);
  const y = new Float64Array(n);
  const value = new Float64Array(n);
  const duration = SPECTRUM_STEPS * DT;
  const tones: [number, number, number][] = [];
  for (let step = 0; step < SPECTRUM_STEPS; step++) {
    const t = step * DT;
    const chirp = 400 + 1500 * (t / duration) + 250 * Math.sin(t * 0.9);
    tones.length = 0;
    for (let h = 1; h <= 4; h++) tones.push([chirp * h, 40 * h, 1 / h ** 1.6]);
    tones.push([5200 + 700 * Math.sin((2 * Math.PI * t) / 4), 60, 0.35]);
    const click = Math.exp(-(((t % 2.5) - 1.2) ** 2) / 0.002) * 0.08;
    for (let bin = 0; bin < SPECTRUM_BINS; bin++) {
      const f = bin * DF;
      let power = 1e-7 / (1 + f / 300) + click / (1 + f / 4000);
      for (const [fc, width, amp] of tones) {
        const d = (f - fc) / width;
        if (d > -5 && d < 5) power += amp * Math.exp(-d * d);
      }
      const i = step * SPECTRUM_BINS + bin;
      x[i] = t;
      y[i] = f;
      value[i] = 10 * Math.log10(power) + normal() * 1.5;
    }
  }
  return { x, y, value };
});

export const SPECTRUM_TARGETS: readonly (readonly [number, number])[] = [
  [6, 1200],
  [3, 5200],
  [12.2, 2500],
  [17, 3900],
];

```

### apps/docs/src/docs/pages/chart-performance/showcase/meter.ts

```tsx
import { useEffect, useRef, useState, type RefObject } from "react";

/** Measured over the last half second */
export interface FrameStats {
  /** Frames per second */
  fps: number;
  /** Average time between two frames, in ms */
  frame: number;
  /**
   * Average main-thread time of a frame, in ms: animation callbacks (the
   * chart's draw calls included), style, layout and paint
   */
  work: number;
}

/** Whether the element is on screen (or within `margin` of it) */
export function useInView(
  ref: RefObject<Element | null>,
  margin = "0px",
): boolean {
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(!!entry?.isIntersecting),
      { rootMargin: margin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, margin]);
  return inView;
}

export interface FrameLoopHandlers {
  /** Every animation frame (move the camera here) */
  onFrame?: (time: number) => void;
  /** Main-thread time of each frame, once the frame is painted */
  onWork?: (ms: number) => void;
  /** Every half second */
  onStats?: (stats: FrameStats) => void;
}

/**
 * Runs an animation-frame loop while `running` and measures it. The
 * main-thread time of a frame is read from a message posted during the
 * frame: messages run after the frame's rendering work.
 */
export function useFrameLoop(
  running: boolean,
  handlers: FrameLoopHandlers = {},
): FrameStats | null {
  const [stats, setStats] = useState<FrameStats | null>(null);
  const handlersRef = useRef(handlers);
  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    if (!running) return;
    let id = 0;
    let windowStart = 0;
    let frames = 0;
    let work = 0;
    let works = 0;
    const channel = new MessageChannel();
    channel.port1.onmessage = (event: MessageEvent<number>) => {
      const ms = performance.now() - event.data;
      work += ms;
      works++;
      handlersRef.current.onWork?.(ms);
    };
    const loop = (time: number) => {
      id = requestAnimationFrame(loop);
      channel.port2.postMessage(time);
      if (windowStart) frames++;
      else windowStart = time;
      handlersRef.current.onFrame?.(time);
      const elapsed = time - windowStart;
      if (elapsed >= 500 && frames > 0) {
        const next = {
          fps: (frames * 1000) / elapsed,
          frame: elapsed / frames,
          work: works ? work / works : 0,
        };
        setStats(next);
        handlersRef.current.onStats?.(next);
        windowStart = time;
        frames = 0;
        work = 0;
        works = 0;
      }
    };
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      channel.port1.close();
      channel.port2.close();
    };
  }, [running]);

  return stats;
}

/** Calls `callback` once the next frame has been painted */
export function afterNextPaint(callback: () => void) {
  requestAnimationFrame(() => setTimeout(callback, 0));
}

/** Whether the user asked for reduced motion */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

```

### apps/docs/src/docs/pages/chart-performance/showcase/text.ts

```tsx
import { useTranslation } from "react-i18next";
import type { ChartRendererPreference } from "minerva-design/charts";
import styles from "./showcase.module.scss";

export const RENDERERS: readonly ChartRendererPreference[] = [
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

/** Color of a frame rate */
export const fpsClass = (fps: number) =>
  fps >= 50 ? styles.good : fps >= 25 ? styles.fair : styles.poor;

/** Localized numbers, durations and backend names of the showcases */
export const useShowcaseFormat = () => {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
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
  return {
    count: (value: number) => number.format(Math.round(value)),
    /** 1M, 240K, 100万… */
    compact: (value: number) => compact.format(value),
    ms: (value: number) =>
      t("ms", {
        value:
          value < 100
            ? decimal.format(value)
            : number.format(Math.round(value)),
      }),
    renderer: (kind: ChartRendererPreference) => t(`renderers.${kind}`),
  };
};

```

### apps/docs/src/docs/pages/chart-performance/showcase/showcase.module.scss

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
  justify-content: space-between;
  gap: 8px 16px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-color);
}

.hud {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(92px, 1fr));
  gap: 1px;
  margin: 0;
  border-bottom: 1px solid var(--border-color);
  background: var(--border-color);
}

.stat {
  min-width: 0;
  padding: 8px 10px;
  background: var(--surface-subtle-color);

  dt {
    overflow: hidden;
    font-size: 11px;
    letter-spacing: 0.02em;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
    color: var(--text-muted-color);
  }

  dd {
    margin: 2px 0 0;
    overflow: hidden;
    font-family: var(--font-family-mono);
    font-size: 16px;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-color);
  }
}

.good {
  color: var(--success-color) !important;
}

.fair {
  color: var(--warning-color) !important;
}

.poor {
  color: var(--danger-color) !important;
}

.chart {
  position: relative;
  padding: 8px 8px 0;
}

.loading {
  display: grid;
  place-items: center;
  height: 100%;
}

.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 16px;
  padding: 8px 14px 12px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary-color);

  p {
    margin: 0;
  }
}

.fallback {
  color: var(--warning-color);
}

.hint {
  color: var(--text-muted-color);
}

// ------------------------------------------------------------ comparison

.compareGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1px;
  background: var(--border-color);
}

.panel {
  min-width: 0;
  padding: 10px 12px 8px;
  background: var(--surface-color);
}

.panelActive {
  box-shadow: inset 0 0 0 2px var(--primary-color);
}

.panelNote {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
  min-height: 28px;
  padding-top: 4px;
  font-size: 12px;
  line-height: 1.4;
  color: var(--text-secondary-color);
}

.panelHeader {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 4px 8px;
  margin-bottom: 4px;
  font-size: 13px;

  strong {
    font-size: 14px;
    color: var(--text-color);
  }
}

.result {
  font-family: var(--font-family-mono);
  font-variant-numeric: tabular-nums;
  color: var(--text-secondary-color);
}

.results {
  padding: 12px 14px;
  border-top: 1px solid var(--border-color);
}

.bars {
  display: grid;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 13px;
}

.barsTitle {
  margin: 0 0 8px;
  font-size: 12px;
  color: var(--text-muted-color);
}

.bar {
  display: grid;
  grid-template-columns: minmax(84px, 120px) 1fr minmax(120px, auto);
  align-items: center;
  gap: 10px;
  color: var(--text-secondary-color);
}

.barTrack {
  display: block;
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--surface-muted-color);
  overflow: hidden;
}

.barFill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--primary-color);
  transition: width 0.4s ease;
}

```
