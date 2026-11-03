# Renderer comparison

How the four chart backends differ, which one your browser runs, and how they compare on this device: live benchmarks with frame rates, frame times, main-thread cost, startup and a score out of 100.

Package: minerva-design@1.19.3

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### How a chart picks its backend

Cartesian charts (line, area, bar, scatter, candlestick, heatmap, sparkline, quadrant) draw their data with one of four backends and their text (axes, labels, legend, tooltip) with the DOM. All four draw the same marks with the same colors; they differ in speed, startup cost, availability and limits.

renderer="auto" (default) tries WebGPU, then WebGL2, then WebGL, then Canvas2D, and keeps the first one that starts. onRendererChange, the renderer event and the ready promise report the backend in use.

Auto skips GPUs that run in software (SwiftShader, llvmpipe, Microsoft Basic Render Driver…): they are slower than Canvas2D, so virtual machines and headless browsers usually end up on Canvas2D.

renderer="webgpu" | "webgl2" | "webgl" | "canvas2d" forces a backend, software GPUs included. If it cannot start, the chart moves down the chain, never up.

When the GPU is lost (driver reset, device removed, context evicted), the chart moves to the next backend, redraws with the same data, zoom and state, and reports the new backend.

setDefaultChartRenderer() sets the backend of every chart whose renderer is unset or "auto", in React, Vue, Angular and Web Components; charts on screen switch live.

### At a glance

What each backend uses underneath, how it draws a frame and where its limits are.

Aspect

Browser API

WebGPU, on top of Vulkan, Metal or Direct3D 12

WebGL 2.0 (OpenGL ES 3.0)

WebGL 1.0 (OpenGL ES 2.0) with the ANGLE_instanced_arrays extension

The Canvas 2D context, rasterized by the browser

Shaders

WGSL

GLSL ES 3.00

GLSL ES 1.00

None: paths, rectangles and pixels drawn from JavaScript

Drawing a frame

One instanced draw per series from GPU buffers

One instanced draw per series, one vertex array per series

One instanced draw per series, attributes bound again for each draw (no vertex arrays)

Every visible mark is drawn again by JavaScript

Zoom and pan

Only a transform changes: no buffer is rebuilt

Only a transform changes: no buffer is rebuilt

Only a transform changes: no buffer is rebuilt

The visible range is drawn again on each frame

Millions of line points

Every visible segment is drawn

Every visible segment is drawn

Every visible segment is drawn

Decimated to the min / max of each pixel column (at most 4 points per column), same silhouette

Large scatter sets

Every dot, one instanced draw per series

Every dot, one instanced draw per series

Every dot, one instanced draw per series

Above 20,000 points, written pixel by pixel into an ImageData buffer: still O(n) per frame

Antialiasing

In the shaders (no MSAA)

In the shaders (no MSAA)

In the shaders (no MSAA)

The browser's own

Contexts per page

One device per chart; not counted in the WebGL limit

Browsers keep about 16 live WebGL contexts: past that, off-screen charts are suspended and restored when they scroll back

Same limit as WebGL2, shared with it

No limit

GPU lost

Falls back to WebGL2

Falls back to WebGL

Falls back to Canvas2D

Nothing to lose

Startup

Asynchronous: adapter, device and pipelines

Synchronous context, shaders compiled at start

Synchronous context, shaders compiled at start

Instant

Best for

Millions of points, live data, long zoom sessions

The same workloads where WebGPU is missing; the most widely available fast path

Older GPUs, drivers and browsers without WebGL2

Small charts, many charts per page, software GPUs, no GPU at all

### What to expect

Trends from the measurements below, not promises: run the benchmarks on this page to measure your device.

Up to tens of thousands of points, every backend keeps up with the display; Canvas2D needs no GPU context at all.

Lines and areas: Canvas2D decimates them to the pixel columns, so even 2 million sorted points stay smooth on a fast CPU, and the GPU backends cost about the same whatever the size.

Scatter sets are where the backends part ways: Canvas2D draws every dot on every frame, so its main-thread time grows with the dots (about 8 ms at 100K, 12 ms at 1M and 21 ms at 2M on the sample machine, where it drops below the refresh rate), while the GPU backends stay around 1 to 3 ms.

Bars: up to 200K bars every backend kept up on the sample machine, the GPU backends with the least main-thread time.

WebGPU, WebGL2 and WebGL are often within a millisecond or two of each other, about the size of the run-to-run noise. Integrated graphics, older GPUs and phones widen the gaps; slower CPUs make Canvas2D fall behind sooner.

The first frame takes tens of milliseconds and grows with the data to upload (about 100 ms for 2 million dots on the sample machine).

### Sample results

One run of the benchmark demo on an Apple M3 Max laptop, Chrome 156 on macOS, 60 Hz display, pixel ratio 1, 3 s per backend. Each cell gives the score and the main-thread time per frame, plus the frame rate when it fell below the display's.

Workload

{{workload}} · {{count}} points

Numbers from one machine and one run: differences of a few points or a millisecond are within the noise. Run the benchmark above to get your own.

### How the score is computed

Each run ends with a score out of 100, computed only from what was measured, relative to this display's refresh rate (measured before the run). Four parts, each between 0 and 1:

Smoothness (40%): frames per second divided by the refresh rate.

Stability (20%): the frame budget (1000 ms / refresh rate) divided by the 95th percentile frame interval, so long frames cost points even when the average is fine.

Headroom (25%): one minus the main-thread time of a frame divided by the frame budget, i.e. how much of each frame is left for your application.

Startup (15%): one minus the time from mounting the chart to its first painted frame divided by one second.

Grades: 85 and above excellent, 65 and above good, 40 and above fair, below 40 poor. A score compares backends on one device and one workload; it is not comparable across machines.

### Methodology and caveats

The benchmark mounts one chart at a time, forced onto a backend, with the same data and the same camera path:

Data: seeded typed-array columns generated once before the clock starts and shared by every backend. The camera zooms from the whole data set (the heaviest frame) to the deepest zoom and back while drifting sideways, with setView on every animation frame.

Main-thread time: from the start of an animation frame to a message posted in it, which runs once the frame is rendered; it includes the chart's JavaScript and draw calls, style, layout and paint.

Frame rates are capped by the display: two backends at the refresh rate tie on smoothness and differ in headroom.

GPU time after the draw calls is not visible to JavaScript: a backend that submits quickly but saturates the GPU shows it through a lower frame rate and longer frame intervals.

Results vary with power mode, thermal throttling, other tabs and browser extensions. Keep the tab in front during a run, and run it twice to compare.

### Browser support

Where each backend is available. Versions are the first stable releases with the feature on by default; support also depends on the GPU and its driver.

Browser

WebGPU only runs in secure contexts (HTTPS or localhost). Browsers block some GPUs and drivers, in which case the chart falls back automatically. The Your device demo above shows what this browser actually offers.

Chrome, Edge (desktop)

113+ on Windows, macOS and ChromeOS

Chrome 56+, Edge 79+

Yes

Yes

Firefox (desktop)

141+ on Windows; other platforms rolling out

51+

Yes

Yes

Safari (macOS)

26+

15+

Yes

Yes

iOS and iPadOS (every browser)

26+

15+

Yes

Yes

Chrome for Android

121+ on Android 12+ with supported GPUs

Yes

Yes

Yes

Chrome on Linux

Depends on the version and the GPU driver

Yes

Yes

Yes

### Which one to use

Leave renderer on "auto" in production: every visitor gets the fastest backend their device runs in hardware, and losses are handled for you.

Force WebGPU only to test it or to compare it; auto already picks it first when it runs in hardware.

Force WebGL2 when a WebGPU driver misbehaves on the devices you target, or to keep identical rendering across browsers that ship WebGPU at different times.

Force WebGL to reproduce what older devices see.

Force Canvas2D for small charts, thumbnails and sparklines, for pages with dozens of charts (no context limit), and for environments without a GPU.

A dashboard with many charts: keep the large or interactive ones on auto and put the small ones on Canvas2D, or destroy the charts that leave the screen.

Data formats, streaming and the million-point showcases are on Chart performance; the framework-free API is on Chart engine.

Auto

WebGPU

WebGL2

WebGL

Canvas2D

{{value}} ms

{{value}} fps

Signal {{index}}

Cluster {{index}}

Values

Probing the backends…

Backend

Auto

Status

CPU

Hardware GPU

Software GPU

Not available

GPU / device

Drawn by the browser, no GPU context

API version

Limits

Textures up to {{value}} px

buffers up to {{value}}

no instancing: falls back to Canvas2D

Auto picks

WebGPU runs on a hardware GPU here.

No hardware WebGPU here; WebGL2 is the best one that does.

No hardware WebGPU or WebGL2 here; WebGL is the best one that does.

No hardware GPU backend here: Canvas2D is faster than a software GPU.

Secure context

Yes

No

WebGPU requires HTTPS or localhost.

Pixel ratio

Device pixels per CSS pixel: more pixels to fill.

CPU threads

Logical cores reported by the browser.

Chart backends on this device

GPU names can be generic or missing: browsers may hide or round them for privacy.

Workload

Line

Scatter

Bars

Number of points

{{value}} points

Duration of each run

{{value}} s per backend

Include software GPUs

Run all backends

Stop

{{backend}} drawing {{count}} points

Run the benchmark: each backend gets the same data and the same zoom path, one after the other.

Releasing the previous backend…

Done. Change the workload or the size and run again to compare.

{{requested}} → {{backend}}

Backend

Score

FPS

Frame p50

Frame p95

Main thread / frame

First frame

Run

Complete

Stopped: a frame took over 2 s

Did not start

Smoothness ({{weight}}%)

Stability ({{weight}}%)

Headroom ({{weight}}%)

Startup ({{weight}}%)

{{value}} / 100

Excellent

Good

Fair

Poor

main thread: {{value}} of Canvas2D's

Benchmark results per backend

Score of each backend split into its four parts

Measuring {{backend}} ({{index}} of {{total}})…

Preparing the next run…

Done: same data, same camera path, one backend at a time.

Results copied as a Markdown table.

Ready.

Skipped (software GPU): {{backends}}.

Display: {{value}} Hz, frame budget {{budget}} ms

Copy results

{{workload}}, {{count}} points, {{refresh}} Hz display

Run the scaling test

Run the test: every hardware backend draws 10K, 100K, 1M and 2M points for 1.5 s each (about a minute).

Points

Frames per second

Main thread per frame

Frame rate by number of points and backend, {{workload}}

Main-thread time per frame by number of points and backend, {{workload}}

Measuring {{backend}} with {{count}} points ({{index}} of {{total}})…

Done. Flat curves scale with the screen, rising ones with the data.

Software GPUs are skipped; both axes are logarithmic except the frame rate.

Renderer

A {{count}}-point line drawn with the selected backend

Backend changes

{{backend}} ready in {{ms}}

{{requested}} requested: {{backend}} ready in {{ms}}

Drawn with {{backend}}.

Starting the renderer…

Data, zoom and hover state survive the switch.

Lose the GPU

Restart from WebGPU

{{backend}} (lost)

{{backend}} lost

Recovered on {{backend}} in {{ms}}

Started on {{backend}}

A {{count}}-point line that falls back when its GPU is lost

Losses and recoveries

This browser cannot simulate a loss of {{backend}} from a page.

End of the chain: Canvas2D needs no GPU.

Drawn with {{backend}}.

A real loss happens on driver updates, GPU resets or when the browser evicts a context.

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
