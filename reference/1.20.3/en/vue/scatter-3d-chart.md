# 3D scatter chart

Point clouds in a 3D box you can orbit: hundreds of thousands to millions of points on the GPU, colored per series, per point or through a color scale, with hover picking, legend and color bar. Line3DChart draws 3D trajectories.

Package: minerva-design@1.20.3

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Setosa

Versicolor

Virginica

Sepal length (cm)

Sepal width (cm)

Petal length (cm)

3D scatter chart of three flower species by sepal length, sepal width and petal length

Bulge and bar

Old disk

Young stars

HII regions

Halo

{{value}} kpc

A barred spiral galaxy of one million stars: bulge, spiral arms with young stars, HII regions and dust lanes, disk and halo

Exposure

Exposure ×{{value}}

Sensors

Sensor {{id}} · humidity {{humidity}}%

{{value}} °C

Length (m)

Width (m)

Height (m)

Temperature

Temperature of 300 sensors in a warehouse, by position and height

Backbone 1

Backbone 2

Base pairs

Auto rotate

Projection

Perspective

Orthographic

Rotating DNA double helix

Torus knot

200,000 points around a torus knot, colored by height

Backend

Auto

WebGPU

WebGL2

WebGL

Canvas2D

Starting…

Backend in use: {{backend}}

{{requested}} is not available here: drawing with {{backend}}

Trajectory

Time

{{value}} s

Trajectory of the Lorenz attractor, colored by time

Swiss roll

Position on the roll

Front

Side

Top

Reset

Azimuth {{azimuth}}°, elevation {{elevation}}°, zoom ×{{zoom}}

Drag to rotate, Shift + drag to pan, Ctrl / ⌘ + wheel to zoom, double-click to reset.

Swiss roll point cloud colored by the position along the roll

Sports

Politics

Technology

Health

Finance

Travel

{{topic}} article #{{n}}

Nearest neighbours

Component {{n}} ({{variance}})

News article embeddings on their first three principal components, by topic

Closest to {{doc}}: {{list}}.

{{doc}} ({{distance}})

Click an article to find its nearest neighbours.

Lidar returns

Color by

Height

Intensity

Dark theme

Lidar point cloud of a street with buildings, trees and parked cars

{{points}} points. Hover the cloud to read a return.

Height {{height}}, intensity {{intensity}}.

{{shell}} {{n}}

Broadband (LEO)

Earth imaging (polar)

Navigation (MEO)

Geostationary

Earth

Play

Thousands of km

Satellites of four orbital shells moving around the Earth

{{shell}}: altitude {{altitude}}, speed {{speed}}, one orbit every {{period}}.

Hover a satellite to read its orbit.

Technology

Healthcare

Energy

Financials

Consumer

{{ticker}} · {{cap}}

Orthographic view

Volatility

Beta

Annual return

Stocks by volatility, beta and annual return, sized by market capitalization

{{ticker}} ({{sector}}): return {{ret}}, volatility {{volatility}}, beta {{beta}}, Sharpe ratio {{sharpe}}, market cap {{cap}}.

Click a stock to pin its figures.

## Line3DChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Line3DChart"
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
    "type": "readonly Line3DSeries[]",
    "required": true,
    "description": "3D polylines (trajectories)",
    "typeText": "readonly Line3DSeries[]"
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

## Scatter3DChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Scatter3DChart"
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
    "type": "readonly Scatter3DSeries[]",
    "required": true,
    "description": "Point clouds (objects, `[x, y, z]` tuples or typed-array columns)",
    "typeText": "readonly Scatter3DSeries[]"
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

## Example: clusters

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-3d-chart/vue/clusters.vue

```vue
<script setup lang="ts">
// <Scatter3DChart>: three customer segments as point clouds (columns of
// x, y, z); drag to rotate, Ctrl / ⌘ + wheel to zoom, double-click to
// reset the camera.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { Scatter3DChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    segments: ["Students", "Professionals", "Retirees"],
    axes: ["Age", "Income (k€)", "Spending (k€)"],
  },
  zh: {
    segments: ["学生", "职场人士", "退休人员"],
    axes: ["年龄", "收入（千欧元）", "消费（千欧元）"],
  },
  ja: {
    segments: ["学生", "社会人", "退職者"],
    axes: ["年齢", "収入（千ユーロ）", "支出（千ユーロ）"],
  },
  fr: {
    segments: ["Étudiants", "Actifs", "Retraités"],
    axes: ["Âge", "Revenu (k€)", "Dépenses (k€)"],
  },
};

const fraction = (value: number) => value - Math.floor(value);
// a cloud of 400 customers around a center (age, income, spending),
// generated deterministically, as columns
const cloud = (age: number, income: number, spending: number, seed: number) => {
  const noise = (i: number, k: number) =>
    fraction(Math.sin((i + seed * 1000) * (12.9898 + k)) * 43758.5453) - 0.5;
  return {
    x: Array.from({ length: 400 }, (_, i) => age + noise(i, 0) * 12),
    y: Array.from({ length: 400 }, (_, i) => income + noise(i, 1) * 20),
    z: Array.from({ length: 400 }, (_, i) => spending + noise(i, 2) * 10),
  };
};
const CLOUDS = [
  cloud(22, 18, 9, 1),
  cloud(40, 62, 24, 2),
  cloud(70, 35, 15, 3),
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() =>
  text.value.segments.map((name, i) => ({
    name,
    data: CLOUDS[i],
    pointSize: 5,
  })),
);
</script>

<template>
  <Scatter3DChart
    :series="series"
    :x-axis="{ title: text.axes[0] }"
    :y-axis="{ title: text.axes[1] }"
    :z-axis="{ title: text.axes[2] }"
    :height="420"
  />
</template>

```

## Example: trajectory

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-3d-chart/vue/trajectory.vue

```vue
<script setup lang="ts">
// <Line3DChart>: a trajectory colored along its height (`colorBy: "z"` with
// the color scale, shown in the color bar); the camera turns slowly around
// it (`auto-rotate`).
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { Line3DChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    path: "Flight path",
    axes: ["East (km)", "North (km)", "Altitude (km)"],
  },
  zh: { path: "飞行轨迹", axes: ["东（公里）", "北（公里）", "高度（公里）"] },
  ja: { path: "飛行経路", axes: ["東（km）", "北（km）", "高度（km）"] },
  fr: { path: "Trajectoire", axes: ["Est (km)", "Nord (km)", "Altitude (km)"] },
};

// a climbing spiral of 600 points, as columns
const t = Array.from({ length: 600 }, (_, i) => i / 30);
const PATH = {
  x: t.map((a) => Math.cos(a) * (4 + a / 4)),
  y: t.map((a) => Math.sin(a) * (4 + a / 4)),
  z: t.map((a) => a / 2),
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [
  { name: text.value.path, data: PATH, colorBy: "z" as const, lineWidth: 3 },
]);
</script>

<template>
  <Line3DChart
    :series="series"
    color-scale="turbo"
    auto-rotate
    :x-axis="{ title: text.axes[0] }"
    :y-axis="{ title: text.axes[1] }"
    :z-axis="{ title: text.axes[2] }"
    :height="420"
  />
</template>

```
