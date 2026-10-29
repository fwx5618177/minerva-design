# @minerva/weapp (private workspace)

Native WeChat component definitions for Minerva forms, selection, navigation, overlays, layout and data display. Composition parts are expressed through parent properties, named slots or instance methods where documented; see `src/manifest.ts` and the [platform guide](https://fwx5618177.github.io/minerva-design/#/platform-support). The assembled package writes native assets to `packages/minerva-design/dist/weapp`. This private workspace package is not published separately.

Use native `event.detail` payloads and `selectComponent` for public instance methods. Function-valued configuration belongs in the component's `configure(options)` API, not WXML properties. Native file selection depends on supported WeChat picker APIs; view and rich-text implementations follow the documented host contract. Monaco and browser DOM focus/iframe/portal behavior cannot run in the native WeChat component host. Taro and uni-app expose their own optional H5 Monaco entries; that does not add Monaco to native WeApp.

Unit and contract tests cover the documented component state, events, translations and tokens. `spike/device` is an app using the built native component assets. On 2026-10-09, WeChat DevTools Stable 2.01.2510280 with base library 3.17.2 exercised button/retry actions, disabled choices, committed selection, modal opening and scoped theme changes. Screenshots and exact observations are in `spike/device/evidence/verification.json` and its adjacent PNGs.

These are **developer-tool simulator results, not physical-device results**. The tourist-account runtime reported `webapi_getwxaasyncsecinfo:fail` and restricted platform API behavior. Official `miniprogram-automator` connected but page RPC timed out; `verify.cjs` fails after 45 seconds instead of claiming a pass. The 19:17 recheck verified native keyboard input with uppercase controlled owner feedback (`hello` → `HELLO`). Deprecated system-info calls now use focused SDK APIs when available, and provider styles import component-safe token selectors; both component warning categories disappeared on recompilation. Physical devices, authenticated platform APIs and complete API/visual equivalence remain unverified.

```sh
pnpm --filter @minerva/weapp typecheck
pnpm exec vitest run --project weapp
pnpm --filter @minerva/weapp build
npm ci --prefix packages/weapp/spike/device
npm run prepare:fixture --prefix packages/weapp/spike/device
npm run verify --prefix packages/weapp/spike/device
```

Build shared core token artifacts first. The fixture README documents CLI selection, reuse of an existing automation connection and the manual interaction flow. The CI `mini-sdk-build` job separately compiles the Taro and uni-app WeChat target fixtures; it does not run DevTools or validate all WeApp APIs. No upload or publication is performed. The fixture, its dependencies and simulator screenshots are outside the npm package's `files` allowlist.

## Charts

`chart`, `line-chart`, `bar-chart`, `scatter-chart` and `quadrant-chart` draw the Minerva chart engine on a `<canvas type="2d">`. They take the same props as the web components and use the same gestures. You get axes, legend, tooltip, annotations, tap and scrub highlighting, pinch zoom, panning when zoomed, double-tap reset, and point dragging. The WebGPU and WebGL renderers of the web build are not included.

```json
{
  "usingComponents": {
    "mn-line-chart": "minerva-design/line-chart/index",
    "mn-quadrant-chart": "minerva-design/quadrant-chart/index"
  }
}
```

```xml
<mn-line-chart id="visits" series="{{series}}" x-axis="{{xAxis}}" area height="240" bind:pointclick="onPoint" />
<mn-quadrant-chart points="{{tasks}}" quadrants="{{regions}}" axis-labels="{{ends}}" draggable disable-scroll bind:pointdrop="onDrop" bind:quadrantclick="onQuadrant" />
```

```js
Page({
  data: {
    series: [
      {
        name: "Visits",
        data: [
          ["Mon", 3],
          ["Tue", 5],
        ],
      },
    ],
    xAxis: { type: "category" },
    tasks: [{ x: 8, y: 9, label: "Release" }],
    regions: { topRight: { label: "Do first" } },
    ends: { top: "Important" },
  },
  onReady() {
    this.selectComponent("#visits").configure({
      yAxis: { format: (value) => `${value}k` },
      renderTooltip: (event) => `${event.xLabel}: ${event.items[0].y}k`,
    });
  },
  onDrop(event) {
    const { index, target } = event.detail; // move tasks[index] to target.x / target.y
  },
});
```

- **Properties.** All charts take `width` (default `"100%"`), `height` (default `320`; numbers are px), `legend`, `tooltip` (`{ mode }` or `false`), `crosshair`, `annotations`, `interaction` (`false`, or `{ zoom, pan, dragPoints }`), `padding`, `palette`, `aria-label` and `disable-scroll` (stops page scrolling while the canvas is touched, so pan, pinch and drag work).
- **Series charts.** `chart`, `line-chart`, `bar-chart` and `scatter-chart` add `series`, `x-axis` and `y-axis`. `line-chart` adds `area`, and `bar-chart` adds `stacked`.
- **Quadrant chart.** `quadrant-chart` adds `points`, `x-domain`, `y-domain`, `x-split`, `y-split`, `quadrants`, `x-label`, `y-label`, `axis-labels`, `show-ticks`, `reverse-x`, `show-labels`, `point-size`, `name` and `draggable`.
- **Events (`event.detail`).** All charts emit `hover` (`{ items, x, xLabel }`; `items` is empty when cleared), `zoom` (`{ x, y }` visible ranges) and `layout` (plot rectangle in px).
  - Series charts also emit `pointclick` (the hover payload), `plotclick` (`{ x, y }` data coordinates of an empty tap), and `pointdrag` / `pointdrop` (`{ item, x, y }`, with `interaction.dragPoints`).
  - `quadrant-chart` also emits `pointclick` (`{ point, index }`), `quadrantclick` (`{ quadrant, x, y }`), and `pointdrag` / `pointdrop` (`{ point, index, target: { x, y, quadrant } }`). The chart does not move points; update `points` to move them.
- **Instance methods (`selectComponent`).** `configure()` takes the function options. Series charts accept `xAxis.format`, `yAxis.format` and `renderTooltip(event)`. `quadrant-chart` accepts `renderTooltip(point, index)`. Both return text with `\n` line breaks, or `null` to hide the tooltip. The other methods are `resize()`, `resetZoom()`, `getView()`, `setView(view)`, `getPlotRect()`, `toPixel(x, y)` and `fromPixel(x, y)`. Types are in `minerva-design/weapp/types` (`NativeChartInstance`, `NativeQuadrantChartEvents`, ...).
- **Theming.** Colors and fonts come from the resolved Minerva tokens of the nearest `config-provider` / `theme-provider`: mode, palette, design, `github-dark` and custom token themes. They update when the provider changes. Without a provider, the light tokens are used. Colors in options may be `var(--token, fallback)` strings.

Limitations:

- **Serialized data.** Properties go through `setData`, so data must be JSON. Use timestamps on `time` axes instead of `Date` objects. Typed arrays are not supported. Every update copies the data, so very large data sets are slower than on the web.
- **Canvas-only content.** Tooltips are canvas text, not custom views. `quadrantContent` has no equivalent; position your own views with the `layout` event and `toPixel()`.
- **Input and renderer.** There is no `renderer` choice and no wheel or keyboard navigation.
- **Draggable must be explicit.** A native host cannot tell whether a `pointdrop` handler is bound, so set `draggable` to enable dragging.
- **Measuring.** A chart that is hidden when it becomes ready measures 0 px; call `resize()` once it is visible.
- **Testing.** The chart engine is bundled in the shared `controls.js`. Behavior is covered by simulator unit tests with a fake canvas; real devices are unverified.
