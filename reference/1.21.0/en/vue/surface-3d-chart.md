# 3D surface chart

Surfaces z = f(x, y) over a regular grid: lighting, built-in color maps (viridis, plasma, terrain…), wireframe, contour lines projected on the floor and transparency. Drag to rotate, Ctrl / ⌘ + wheel to zoom.

Package: minerva-design@1.21.0

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

sinc

Peaks

Saddle

Function

3D surface of the {{name}} function

x

y

z

Island

{{value}} km

{{value}} m

East

North

Elevation

Terrain of a 20 km wide island

Implied volatility

{{value}}%

Strike (% of spot)

Days to expiry

{{value}} d

Implied volatility surface by strike and expiry

Faces

Wireframe

Contours on the floor

Contours on the surface

Peaks surface with wireframe and contour lines

Bowl

Tilted plane

A transparent bowl crossed by a transparent tilted plane

Wave

Animate

Amplitude

Animated ripples spreading from the center

Plate

Reset

cm

Temperature

Temperature of a metal plate heated by point sources

Heat sources: {{sources}} · hottest point {{max}} · average {{mean}}. Click the plate to add or remove a source.

Government bond yield

Maturity

Month

Yield

Government bond yields by maturity over 24 months

{{maturity}} yield in {{date}}: {{yield}}.

Hover the surface to read a yield.

In {{date}} the curve is inverted (10 yr − 2 yr: {{spread}}).

In {{date}} the curve slopes upward (10 yr − 2 yr: {{spread}}).

Loss

({{x}}, {{y}})

Color scale

Viridis

Plasma

Magma

Cividis

Turbo

Weight 1

Weight 2

log₁₀(1 + loss)

Loss landscape of Himmelblau's function with four minima

From {{start}} (loss {{loss}}), gradient descent reaches minimum {{n}} at {{minimum}} in {{steps}} steps.

Click the surface to start a gradient descent there.

{{value}} dBm

Signal

Access points

Lobby

Open space

Meeting rooms

Kitchen

3D view

Top view

Meters

Wi-Fi signal strength over an office floor

{{good}} of the floor gets {{goodLevel}} or better (video calls), {{usable}} gets {{usableLevel}} or better.

Every access point is off: no coverage.

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
