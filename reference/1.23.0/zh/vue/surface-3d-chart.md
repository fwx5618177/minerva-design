# 3D 曲面图

规则网格上的曲面 z = f(x, y)：光照、内置色带（viridis、plasma、terrain…）、线框、投影到底面的等高线以及透明度。拖动旋转，Ctrl / ⌘ + 滚轮缩放。

Package: minerva-design@1.23.0

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

sinc

Peaks

马鞍面

函数

{{name}} 函数的 3D 曲面

x

y

z

岛屿

{{value}} km

{{value}} 米

东向

北向

海拔

宽 20 公里的岛屿地形

隐含波动率

{{value}}%

行权价（现价的 %）

距到期天数

{{value}} 天

按行权价和到期时间的隐含波动率曲面

面

线框

底面等高线

曲面等高线

带线框和等高线的 peaks 曲面

碗面

倾斜平面

透明碗面与透明倾斜平面相交

波

播放动画

振幅

从中心扩散的动画涟漪

金属板

重置

厘米

温度

被点热源加热的金属板温度

热源：{{sources}} 个 · 最高温度 {{max}} · 平均温度 {{mean}}。点击金属板可添加或移除热源。

国债收益率

期限

月份

收益率

24 个月内各期限国债收益率

{{date}} {{maturity}}期收益率：{{yield}}。

悬停在曲面上读取收益率。

{{date}}收益率曲线倒挂（10 年期 − 2 年期：{{spread}}）。

{{date}}收益率曲线向上倾斜（10 年期 − 2 年期：{{spread}}）。

损失

({{x}}, {{y}})

色阶

Viridis

Plasma

Magma

Cividis

Turbo

权重 1

权重 2

log₁₀(1 + 损失)

有四个极小值的 Himmelblau 函数损失曲面

从 {{start}}（损失 {{loss}}）出发，梯度下降经过 {{steps}} 步到达位于 {{minimum}} 的第 {{n}} 个极小值。

点击曲面，从该处开始梯度下降。

{{value}} dBm

信号

接入点

大堂

开放办公区

会议室

茶水间

3D 视图

俯视图

米

办公楼层的 Wi-Fi 信号强度

{{good}} 的区域信号不低于 {{goodLevel}}（可视频通话），{{usable}} 的区域不低于 {{usableLevel}}。

所有接入点均已关闭：无覆盖。

## Surface3DChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Surface3DChart"
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
    "type": "boolean | Chart3DLegendOptions",
    "required": false,
    "description": "Legend; shown by default when several series have a name",
    "typeText": "boolean | Chart3DLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | Chart3DTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it",
    "typeText": "boolean | Chart3DTooltipOptions"
  },
  {
    "name": "interaction",
    "type": "boolean | Chart3DInteractionOptions",
    "required": false,
    "description": "Drag rotates, right / Shift + drag pans, Ctrl / ⌘ + wheel and pinch zoom; `false` makes the chart static (default `true`)",
    "typeText": "boolean | Chart3DInteractionOptions"
  },
  {
    "name": "autoRotate",
    "type": "number | boolean",
    "required": false,
    "description": "Turns the camera around the box: `true` at 12°/s or a speed in degrees per second (default `false`)",
    "typeText": "number | boolean"
  },
  {
    "name": "box",
    "type": "boolean",
    "required": false,
    "description": "Draws the axis box: back walls, grid lines, tick labels and axis titles (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "colorBar",
    "type": "boolean | Chart3DColorBarOptions",
    "required": false,
    "description": "Color bar; shown by default when a visible series uses the color scale",
    "typeText": "boolean | Chart3DColorBarOptions"
  },
  {
    "name": "wireframe",
    "type": "boolean | Surface3DWireframeOptions",
    "required": false,
    "description": "Wireframe of the series that do not set one",
    "typeText": "boolean | Surface3DWireframeOptions"
  },
  {
    "name": "contours",
    "type": "boolean | Surface3DContourOptions",
    "required": false,
    "description": "Contour lines of the series that do not set them",
    "typeText": "boolean | Surface3DContourOptions"
  },
  {
    "name": "labels",
    "type": "Partial<Chart3DLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<Chart3DLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the data layer: WebGPU, then WebGL2, WebGL, Canvas2D (default `auto`)",
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
    "type": "readonly Surface3DSeries[]",
    "required": true,
    "description": "Surfaces over regular grids",
    "typeText": "readonly Surface3DSeries[]"
  },
  {
    "name": "xAxis",
    "type": "Chart3DAxisOptions",
    "required": false,
    "description": "X axis (width of the box)",
    "typeText": "Chart3DAxisOptions"
  },
  {
    "name": "yAxis",
    "type": "Chart3DAxisOptions",
    "required": false,
    "description": "Y axis (depth of the box)",
    "typeText": "Chart3DAxisOptions"
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
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip, axes); the page language by default",
    "typeText": "string"
  },
  {
    "name": "exposure",
    "type": "number",
    "required": false,
    "description": "Brightness of the light of `blend: \"additive\"` series, tone mapped on WebGPU and WebGL2 (default 1)",
    "typeText": "number"
  },
  {
    "name": "camera",
    "type": "Chart3DCameraOptions",
    "required": false,
    "description": "Initial camera, also restored by a double click (changing it moves the camera)",
    "typeText": "Chart3DCameraOptions"
  },
  {
    "name": "zAxis",
    "type": "Chart3DAxisOptions",
    "required": false,
    "description": "Z axis (height of the box)",
    "typeText": "Chart3DAxisOptions"
  },
  {
    "name": "aspect",
    "type": "readonly [number, number, number]",
    "required": false,
    "description": "Proportions of the box (x, y, z; default `[1, 1, 0.7]`)",
    "typeText": "readonly [number, number, number]"
  },
  {
    "name": "colorScale",
    "type": "Chart3DColorScale",
    "required": false,
    "description": "Colors of `colorBy: \"z\"` / `\"value\"`: a built-in ramp or CSS colors (default `viridis`)",
    "typeText": "Chart3DColorScale"
  },
  {
    "name": "valueRange",
    "type": "readonly [number, number]",
    "required": false,
    "description": "Values mapped to the ends of the color scale; the data range by default",
    "typeText": "readonly [number, number]"
  },
  {
    "name": "lighting",
    "type": "Chart3DLightingOptions",
    "required": false,
    "description": "Lighting of the surfaces and bars",
    "typeText": "Chart3DLightingOptions"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[event: Chart3DHoverEvent | null]",
    "typeText": "[event: Chart3DHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "Chart3DHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "type": "[event: Chart3DHoverEvent]",
    "typeText": "[event: Chart3DHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "Chart3DHoverEvent",
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
  },
  {
    "name": "cameraChange",
    "type": "[camera: Chart3DCameraState]",
    "typeText": "[camera: Chart3DCameraState]",
    "parameters": [
      {
        "name": "camera",
        "position": 0,
        "typeText": "Chart3DCameraState",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: ripple

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/surface-3d-chart/vue/ripple.vue

```vue
<script setup lang="ts">
// <Surface3DChart>: z = f(x, y) over a regular grid (`rows`, `cols`, `z`
// row by row), lit and colored by height, with contour lines projected on
// the floor.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { Surface3DChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { name: "Ripple", height: "Height" },
  zh: { name: "波纹", height: "高度" },
  ja: { name: "波紋", height: "高さ" },
  fr: { name: "Onde", height: "Hauteur" },
};

// z = sin(r) / r over a 60 × 60 grid from -10 to 10
const N = 60;
const WAVE = {
  rows: N,
  cols: N,
  x: Array.from({ length: N }, (_, i) => -10 + (20 * i) / (N - 1)),
  y: Array.from({ length: N }, (_, i) => -10 + (20 * i) / (N - 1)),
  z: Array.from({ length: N * N }, (_, k) => {
    const x = -10 + (20 * (k % N)) / (N - 1);
    const y = -10 + (20 * Math.floor(k / N)) / (N - 1);
    const r = Math.hypot(x, y) || 1e-6;
    return Math.sin(r) / r;
  }),
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [{ name: text.value.name, data: WAVE }]);
</script>

<template>
  <Surface3DChart
    :series="series"
    :contours="{ count: 10, floor: true }"
    color-scale="viridis"
    :z-axis="{ title: text.height }"
    :height="420"
  />
</template>

```

## Example: terrain

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/surface-3d-chart/vue/terrain.vue

```vue
<script setup lang="ts">
// A terrain with a wireframe (`wireframe`, every 2nd grid line) and the
// "terrain" color scale; hover a cell to read its elevation.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { Surface3DChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { name: "Terrain", axes: ["East (km)", "North (km)", "Elevation (m)"] },
  zh: { name: "地形", axes: ["东（公里）", "北（公里）", "海拔（米）"] },
  ja: { name: "地形", axes: ["東（km）", "北（km）", "標高（m）"] },
  fr: { name: "Relief", axes: ["Est (km)", "Nord (km)", "Altitude (m)"] },
};

// two hills and a valley on a 40 × 40 grid (heights in meters)
const N = 40;
const TERRAIN = {
  rows: N,
  cols: N,
  z: Array.from({ length: N * N }, (_, k) => {
    const x = (k % N) / 4;
    const y = Math.floor(k / N) / 4;
    return Math.round(
      900 * Math.exp(-((x - 3) ** 2 + (y - 4) ** 2) / 6) +
        600 * Math.exp(-((x - 7) ** 2 + (y - 7) ** 2) / 4) -
        200 * Math.exp(-((x - 6) ** 2 + (y - 2) ** 2) / 3) +
        300,
    );
  }),
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [{ name: text.value.name, data: TERRAIN }]);
</script>

<template>
  <Surface3DChart
    :series="series"
    :wireframe="{ step: 2 }"
    color-scale="terrain"
    :x-axis="{ title: text.axes[0] }"
    :y-axis="{ title: text.axes[1] }"
    :z-axis="{ title: text.axes[2] }"
    :height="420"
  />
</template>

```
