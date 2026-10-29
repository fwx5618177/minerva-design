# @minerva/uni (private workspace)

uni-app source SFC renderer for Minerva forms, selection, navigation, overlays, layout, data display and editors. See `src/manifest.ts` and the [platform guide](https://fwx5618177.github.io/minerva-design/#/platform-support) for each component's contract and host limits. The published entry is `minerva-design/uni`, assembled under `packages/minerva-design/dist/uni`. SFCs remain source files so the application's official uni-app compiler can transform native elements and platform branches.

H5 supports keyboard navigation, focus trapping/inert background/scroll locking for modal layers, optional popover portals and child composition, browser file input, and sanitized sandboxed HTML previews. `minerva-design/uni/monaco` is an optional H5 entry that mounts a real Monaco editor with an application-supplied local engine and worker configuration. It is separate from the main entry. Native mini-program hosts cannot run Monaco, DOM child cloning, iframe previews or document focus scopes; they use native views, supported picker APIs and rich-text preview where documented. Preserve the host adapters and runtime dependencies specified by each component.

Validation is separated by host:

- Renderer unit/contract tests and real Chromium H5 tests exercise the documented behavior, including the optional Monaco entry. H5 IDs keep Vue's SSR/hydration behavior; the native runtime uses its compatible instance ID path.
- `spike/device` statically registers the library SFCs, excluding the H5-only Monaco component, and compiles them with official uni-app 5.31 Vue 3 for WeChat. CI runs the fixture separately on Node 22. This proves compilation for that target, not physical-device behavior or every uni-app target/API.
- Recorded WeChat DevTools simulator interactions belong to the separate WeApp fixture; they are not a substitute for application-specific uni-app device testing.

## Charts

`Chart`, `LineChart`, `BarChart`, `ScatterChart` and `QuadrantChart` draw a whole chart (axes, data, legend, tooltip, annotations) on one `<canvas type="2d">` with the canvas renderer of the Minerva chart engine. They take the props of the web charts of `minerva-design/charts` (`series`, `xAxis`, `yAxis`, `legend`, `tooltip`, `crosshair`, `annotations`, `interaction`, `padding`, `palette`, `ariaLabel`, `height` (default 320), `width` (default `100%`), `area`, `stacked`, and for `QuadrantChart` `points`, `xDomain`, `yDomain`, `xSplit`, `ySplit`, `quadrants`, `xLabel`, `yLabel`, `axisLabels`, `showTicks`, `reverseX`, `showLabels`, `pointSize`, `name`, `draggable`).

```vue
<script setup>
import { ref } from "vue";
import { LineChart, QuadrantChart } from "minerva-design/uni";
const series = ref([{ name: "Sales", data: [12, 18, 9, 24] }]);
const tasks = ref([{ x: 8, y: 9, label: "Release" }]);
const show = (event) => console.log(event.items[0]);
function move(point, index, target) {
  tasks.value = tasks.value.map((p, i) =>
    i === index ? { ...p, x: target.x, y: target.y } : p,
  );
}
</script>
<template>
  <LineChart :series="series" height="480rpx" area @point-click="show" />
  <QuadrantChart
    :points="tasks"
    :quadrants="{ topRight: { label: 'Do first' } }"
    @point-drop="move"
  />
</template>
```

- Events: `hover` (event or `null`), `pointClick` (event), `plotClick` (`{ x, y }`) and `zoom` (view). `QuadrantChart` emits `pointClick(point, index)`, `quadrantClick(quadrant, { x, y })`, `pointDrop(point, index, { x, y, quadrant })` (dots become draggable when a `pointDrop` listener is set) instead of the generic click events, and accepts `topLeft` / `topRight` / `bottomLeft` / `bottomRight` slots placed over the quadrants.
- Gestures: tap shows the tooltip and emits the click events, two fingers pinch-zoom, a drag pans when zoomed, double tap resets the zoom, tapping a legend entry toggles its series. On H5 the mouse works too (Ctrl / ⌘ + wheel zooms). `disableScroll` keeps the page still while a finger moves on the chart (on by default for draggable quadrant charts). A template `ref` exposes `resetZoom()`, `getView()`, `setView(view)`, `getRenderer()`, `getInstance()` and `resize()`.
- Mini-programs: the canvas node and its size come from `uni.createSelectorQuery()` after mount, the pixel ratio from `uni.getWindowInfo()`, and `uni.onWindowResize` measures the chart again. H5: the chart draws on the `<canvas>` element inside uni's canvas component and follows its size with a `ResizeObserver`.
- Colors are the Minerva token values of the surrounding `ConfigProvider` / `ThemeProvider` (light without a provider), so dark mode, palettes and custom themes apply; `var(--name, fallback)` colors in options are resolved against those tokens.
- Replace `series` / `points` (or a series' `data` array) to update a chart: arrays mutated in place are not read again, so large data sets stay cheap. Tooltip `render` functions may return text; there is no rich (component) tooltip content and no WebGPU / WebGL2 renderer on uni-app.
- The charts are not part of the cross-platform component contract matrix (`src/manifest.ts`), like the web charts.

```sh
pnpm --filter @minerva/uni typecheck
pnpm exec vitest run --project uni
pnpm run test:browser:mini
pnpm --filter @minerva/uni build
npm ci --prefix packages/uni/spike/device
npm run build --prefix packages/uni/spike/device
```

Build shared core artifacts and the chart engine (`dist/charts`) before the library build, or use the assembled package build. The independent SDK fixture owns a lockfile and copies current library/core/DOM source into its source root, without consuming generated distribution files. Its pinned compiler version is recorded in `spike/device/package.json`. CI does not upload or publish the app or screenshots.

Browser verification owns its fixture server and refuses to reuse an unrelated process on its port. Set `MINERVA_UNI_BROWSER_PORT` to an available port when needed (for example, `MINERVA_UNI_BROWSER_PORT=4293 pnpm run test:browser:mini`).
