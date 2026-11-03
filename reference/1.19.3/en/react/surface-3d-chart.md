# 3D surface chart

Surfaces z = f(x, y) over a regular grid: lighting, built-in color maps (viridis, plasma, terrain…), wireframe, contour lines projected on the floor and transparency. Drag to rotate, Ctrl / ⌘ + wheel to zoom.

Package: minerva-design@1.19.3

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
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
    "name": "series",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "array",
    "typeText": "readonly Surface3DSeries[]",
    "typeRef": "type:be73027226bf153b6d9f",
    "required": true,
    "description": "Surfaces over regular grids"
  },
  {
    "name": "wireframe",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "union",
    "typeText": "boolean | Surface3DWireframeOptions | undefined",
    "typeRef": "type:c8e7e863bd08c3ed6e73",
    "required": false,
    "description": "Wireframe of the series that do not set one"
  },
  {
    "name": "contours",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "union",
    "typeText": "boolean | Surface3DContourOptions | undefined",
    "typeRef": "type:c6b37da1b40456cc0040",
    "required": false,
    "description": "Contour lines of the series that do not set them"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 400,
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "xAxis",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "object",
    "typeText": "Chart3DAxisOptions | undefined",
    "typeRef": "type:1c821e1ee1e77dc2c4fa",
    "required": false,
    "description": "X axis (width of the box)"
  },
  {
    "name": "yAxis",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "object",
    "typeText": "Chart3DAxisOptions | undefined",
    "typeRef": "type:1c821e1ee1e77dc2c4fa",
    "required": false,
    "description": "Y axis (depth of the box)"
  },
  {
    "name": "zAxis",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "object",
    "typeText": "Chart3DAxisOptions | undefined",
    "typeRef": "type:1c821e1ee1e77dc2c4fa",
    "required": false,
    "description": "Z axis (height of the box)"
  },
  {
    "name": "camera",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "object",
    "typeText": "Chart3DCameraOptions | undefined",
    "typeRef": "type:167a8a19d9cc56b4b670",
    "required": false,
    "description": "Initial camera, also restored by a double click (changing it moves the camera)"
  },
  {
    "name": "autoRotate",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "union",
    "typeText": "number | boolean | undefined",
    "typeRef": "type:11d9d08024b0b84c460e",
    "default": false,
    "required": false,
    "description": "Turns the camera around the box: `true` at 12°/s or a speed in degrees per second; pauses while hovered, off-screen and with reduced motion"
  },
  {
    "name": "aspect",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "array",
    "typeText": "readonly [number, number, number] | undefined",
    "typeRef": "type:d7844941c1a0fb5f2288",
    "required": false,
    "description": "Proportions of the box (x, y, z)"
  },
  {
    "name": "box",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Draws the axis box: back walls, grid lines, tick labels and axis titles"
  },
  {
    "name": "colorScale",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "union",
    "typeText": "Chart3DColorScale | undefined",
    "typeRef": "type:a7f2e842d4114e5e2bc9",
    "default": "viridis",
    "required": false,
    "description": "Colors of `colorBy: \"z\"` / `\"value\"`: a built-in ramp or CSS colors"
  },
  {
    "name": "valueRange",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "array",
    "typeText": "readonly [number, number] | undefined",
    "typeRef": "type:993918f52c7908c02d32",
    "required": false,
    "description": "Values mapped to the ends of the color scale; the data range by default"
  },
  {
    "name": "colorBar",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "union",
    "typeText": "boolean | Chart3DColorBarOptions | undefined",
    "typeRef": "type:9e94487b0cf0ad8a7ae5",
    "required": false,
    "description": "Color bar; shown by default when a visible series uses the color scale"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "union",
    "typeText": "boolean | Chart3DLegendOptions | undefined",
    "typeRef": "type:1be2fbbf1e8c9fbb46a8",
    "required": false,
    "description": "Legend; shown by default when several series have a name"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "union",
    "typeText": "boolean | Chart3DTooltipOptions | undefined",
    "typeRef": "type:13329010a17ed76beece",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "interaction",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "union",
    "typeText": "boolean | Chart3DInteractionOptions | undefined",
    "typeRef": "type:a71b98bca46cdf7837aa",
    "default": true,
    "required": false,
    "description": "Drag rotates, right / Shift + drag pans, Ctrl / ⌘ + wheel and pinch zoom, double click resets, arrow keys rotate; `false` makes the chart static"
  },
  {
    "name": "lighting",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "object",
    "typeText": "Chart3DLightingOptions | undefined",
    "typeRef": "type:4f031ae37c5b79a48dcc",
    "required": false,
    "description": "Lighting of the surfaces and bars"
  },
  {
    "name": "exposure",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false,
    "description": "Brightness of the light of `blend: \"additive\"` series, tone mapped on WebGPU and WebGL2 (dense glowing regions saturate instead of turning white)"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/three-d.tsx",
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
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Language of the built-in texts (accessible summary, legend announcements, tooltip row names) and of the number formatting; built-in texts in English, Chinese, Japanese and French"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "object",
    "typeText": "Partial<Chart3DLabels> | undefined",
    "typeRef": "type:b9110f1352c8b648a88b",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "function",
    "typeText": "((event: Chart3DHoverEvent | null) => void) | undefined",
    "typeRef": "type:dfff2602865f409c9dcc",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "Chart3DHoverEvent | null",
        "typeRef": "type:774323141f428bcd99e2"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the hovered point, cell or bar changes"
  },
  {
    "name": "onPointClick",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "function",
    "typeText": "((event: Chart3DHoverEvent) => void) | undefined",
    "typeRef": "type:9703bea4561e32de9ced",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "Chart3DHoverEvent",
        "typeRef": "type:fe5f94c04c80715011c0"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a point, cell or bar is clicked"
  },
  {
    "name": "onCameraChange",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "function",
    "typeText": "((camera: Chart3DCameraState) => void) | undefined",
    "typeRef": "type:30adbc1b463ace3a9336",
    "parameters": [
      {
        "name": "camera",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "Chart3DCameraState",
        "typeRef": "type:b3764b39d8f3ce70541d"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called after the user rotated, zoomed, panned or reset the camera"
  },
  {
    "name": "onRendererChange",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "function",
    "typeText": "((renderer: ChartRendererKind) => void) | undefined",
    "typeRef": "type:fe458bf4d221b7288026",
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
    "description": "Called with the backend once it is ready (and after a fallback)"
  }
]
```

### bindings

```json
[
  {
    "prop": "camera",
    "event": "onCameraChange",
    "syntax": "camera={camera} onCameraChange={handler}"
  },
  {
    "prop": "renderer",
    "event": "onRendererChange",
    "syntax": "renderer={renderer} onRendererChange={handler}"
  }
]
```

## API

```json
{
  "Surface3DChartProps": {
    "source": "charts/src/react/three-d.tsx",
    "description": "Props of `Surface3DChart`",
    "kind": "interface",
    "extends": [
      "Chart3DCommonProps"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly Surface3DSeries[]",
        "required": true,
        "description": "Surfaces over regular grids"
      },
      {
        "name": "wireframe",
        "type": "boolean | Surface3DWireframeOptions",
        "required": false,
        "description": "Wireframe of the series that do not set one"
      },
      {
        "name": "contours",
        "type": "boolean | Surface3DContourOptions",
        "required": false,
        "description": "Contour lines of the series that do not set them"
      }
    ]
  },
  "Surface3DSeries": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "A surface over a regular grid",
    "kind": "interface",
    "extends": [
      "Chart3DSeriesBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"surface\"",
        "required": false
      },
      {
        "name": "data",
        "type": "Surface3DData",
        "required": true,
        "description": "Grid of heights"
      },
      {
        "name": "colorBy",
        "type": "Chart3DColorBy",
        "required": false,
        "default": "\"value\" when the data has values, \"z\" otherwise",
        "description": "Source of the colors: the height (`z`), the `value` grid or the series color"
      },
      {
        "name": "opacity",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Opacity of the surface, 0-1 (below 1 the surface does not hide what is behind it)"
      },
      {
        "name": "wireframe",
        "type": "boolean | Surface3DWireframeOptions",
        "required": false,
        "default": "false",
        "description": "Grid lines over the surface"
      },
      {
        "name": "contours",
        "type": "boolean | Surface3DContourOptions",
        "required": false,
        "default": "false",
        "description": "Contour lines (on the floor by default)"
      },
      {
        "name": "fill",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Draws the faces; `false` keeps only the wireframe / contours"
      }
    ]
  },
  "Surface3DData": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "Heights of a regular grid, `z = f(x, y)`: `rows × cols` values stored row by row (row `r` is `y[r]`, column `c` is `x[c]`); `NaN` leaves a hole",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "rows",
        "type": "number",
        "required": true,
        "description": "Number of rows (y samples), 2 or more"
      },
      {
        "name": "cols",
        "type": "number",
        "required": true,
        "description": "Number of columns (x samples), 2 or more"
      },
      {
        "name": "z",
        "type": "ArrayLike<number>",
        "required": true,
        "description": "`rows × cols` heights, row-major (`Float32Array` recommended)"
      },
      {
        "name": "x",
        "type": "ArrayLike<number>",
        "required": false,
        "description": "X coordinates of the columns (`cols` values); `0 … cols - 1` when omitted"
      },
      {
        "name": "y",
        "type": "ArrayLike<number>",
        "required": false,
        "description": "Y coordinates of the rows (`rows` values); `0 … rows - 1` when omitted"
      },
      {
        "name": "value",
        "type": "ArrayLike<number>",
        "required": false,
        "description": "`rows × cols` values mapped to the color scale instead of the heights (`colorBy: \"value\"`)"
      }
    ]
  },
  "Surface3DWireframeOptions": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "Wireframe drawn over a surface",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Line color (any CSS color); a contrasting tint of the text color when omitted"
      },
      {
        "name": "step",
        "type": "number",
        "required": false,
        "default": "1 (a line every 64 rows / columns at most)",
        "description": "Draws every n-th grid line"
      },
      {
        "name": "width",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Line width in CSS pixels"
      }
    ]
  },
  "Surface3DContourOptions": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "Contour lines of a surface",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "count",
        "type": "number",
        "required": false,
        "default": "10",
        "description": "Number of levels, spread over the height range (ignored with `levels`)"
      },
      {
        "name": "levels",
        "type": "readonly number[]",
        "required": false,
        "description": "Heights of the lines"
      },
      {
        "name": "floor",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Projects the lines on the floor of the axis box"
      },
      {
        "name": "surface",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Draws the lines on the surface itself"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Line color (any CSS color); each level takes its color-scale color when omitted"
      },
      {
        "name": "width",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Line width in CSS pixels"
      }
    ]
  },
  "Chart3DLightingOptions": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "Lighting of the surfaces and bars",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "ambient",
        "type": "number",
        "required": false,
        "default": "0.5",
        "description": "Light reaching every face, 0-1"
      },
      {
        "name": "diffuse",
        "type": "number",
        "required": false,
        "default": "0.6",
        "description": "Strength of the directional light (Lambert), 0-1"
      },
      {
        "name": "specular",
        "type": "number",
        "required": false,
        "default": "0.25",
        "description": "Strength of the highlights (Blinn-Phong), 0-1"
      },
      {
        "name": "shininess",
        "type": "number",
        "required": false,
        "default": "32",
        "description": "Sharpness of the highlights"
      }
    ]
  },
  "Chart3DCommonProps": {
    "source": "charts/src/react/three-d.tsx",
    "description": "Props shared by every 3D chart component",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "height",
        "type": "number | string",
        "required": false,
        "default": "400",
        "description": "Height of the chart (the legend included); numbers are pixels"
      },
      {
        "name": "width",
        "type": "number | string",
        "required": false,
        "default": "\"100%\"",
        "description": "Width of the chart; numbers are pixels"
      },
      {
        "name": "xAxis",
        "type": "Chart3DAxisOptions",
        "required": false,
        "description": "X axis (width of the box)"
      },
      {
        "name": "yAxis",
        "type": "Chart3DAxisOptions",
        "required": false,
        "description": "Y axis (depth of the box)"
      },
      {
        "name": "zAxis",
        "type": "Chart3DAxisOptions",
        "required": false,
        "description": "Z axis (height of the box)"
      },
      {
        "name": "camera",
        "type": "Chart3DCameraOptions",
        "required": false,
        "description": "Initial camera, also restored by a double click (changing it moves the camera)"
      },
      {
        "name": "autoRotate",
        "type": "boolean | number",
        "required": false,
        "default": "false",
        "description": "Turns the camera around the box: `true` at 12°/s or a speed in degrees per second; pauses while hovered, off-screen and with reduced motion"
      },
      {
        "name": "aspect",
        "type": "readonly [number, number, number]",
        "required": false,
        "default": "[1, 1, 0.7]",
        "description": "Proportions of the box (x, y, z)"
      },
      {
        "name": "box",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Draws the axis box: back walls, grid lines, tick labels and axis titles"
      },
      {
        "name": "colorScale",
        "type": "Chart3DColorScale",
        "required": false,
        "default": "\"viridis\"",
        "description": "Colors of `colorBy: \"z\"` / `\"value\"`: a built-in ramp or CSS colors"
      },
      {
        "name": "valueRange",
        "type": "readonly [number, number]",
        "required": false,
        "description": "Values mapped to the ends of the color scale; the data range by default"
      },
      {
        "name": "colorBar",
        "type": "boolean | Chart3DColorBarOptions",
        "required": false,
        "description": "Color bar; shown by default when a visible series uses the color scale"
      },
      {
        "name": "legend",
        "type": "boolean | Chart3DLegendOptions",
        "required": false,
        "description": "Legend; shown by default when several series have a name"
      },
      {
        "name": "tooltip",
        "type": "boolean | Chart3DTooltipOptions",
        "required": false,
        "description": "Tooltip; `false` disables it"
      },
      {
        "name": "interaction",
        "type": "boolean | Chart3DInteractionOptions",
        "required": false,
        "default": "true",
        "description": "Drag rotates, right / Shift + drag pans, Ctrl / ⌘ + wheel and pinch zoom, double click resets, arrow keys rotate; `false` makes the chart static"
      },
      {
        "name": "lighting",
        "type": "Chart3DLightingOptions",
        "required": false,
        "description": "Lighting of the surfaces and bars"
      },
      {
        "name": "exposure",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Brightness of the light of `blend: \"additive\"` series, tone mapped on WebGPU and WebGL2 (dense glowing regions saturate instead of turning white)"
      },
      {
        "name": "renderer",
        "type": "ChartRendererPreference",
        "required": false,
        "default": "\"auto\"",
        "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software"
      },
      {
        "name": "palette",
        "type": "readonly string[]",
        "required": false,
        "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "required": false,
        "description": "Accessible name of the chart"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "default": "the page language (`<html lang>`), then the browser language",
        "description": "Language of the built-in texts (accessible summary, legend announcements, tooltip row names) and of the number formatting; built-in texts in English, Chinese, Japanese and French"
      },
      {
        "name": "labels",
        "type": "Partial<Chart3DLabels>",
        "required": false,
        "description": "Overrides of the built-in texts of the `locale`"
      },
      {
        "name": "onHover",
        "type": "(event: Chart3DHoverEvent | null) => void",
        "required": false,
        "description": "Called when the hovered point, cell or bar changes"
      },
      {
        "name": "onPointClick",
        "type": "(event: Chart3DHoverEvent) => void",
        "required": false,
        "description": "Called when a point, cell or bar is clicked"
      },
      {
        "name": "onCameraChange",
        "type": "(camera: Chart3DCameraState) => void",
        "required": false,
        "description": "Called after the user rotated, zoomed, panned or reset the camera"
      },
      {
        "name": "onRendererChange",
        "type": "(renderer: ChartRendererKind) => void",
        "required": false,
        "description": "Called with the backend once it is ready (and after a fallback)"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Class of the outer element"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Style of the outer element"
      },
      {
        "name": "ref",
        "type": "Ref<Chart3DHandle>",
        "required": false,
        "description": "Imperative handle"
      }
    ]
  },
  "Chart3DSeriesBase": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "Options shared by every 3D series",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "Stable identifier (defaults to the index)"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Name shown in the legend and the tooltip"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Series color (any CSS color, `var(--x)` included); the palette when omitted"
      },
      {
        "name": "hidden",
        "type": "boolean",
        "required": false,
        "description": "Hides the series (it stays in the legend)"
      },
      {
        "name": "format",
        "type": "(value: number) => string",
        "required": false,
        "description": "Formats the `value` of the hovered item in the tooltip (its height when the data has no values); the axis formats by default"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Math functions

sinc, MATLAB's peaks and a saddle sampled on a grid, colored by height with the default viridis ramp.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/surface-3d-chart/demos/functions.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  Surface3DChart,
  type Surface3DData,
  type Surface3DSeries,
} from "minerva-design/charts";

/** Samples z = f(x, y) on a size × size grid over [-extent, extent]² */
function sample(
  extent: number,
  size: number,
  f: (x: number, y: number) => number,
): Surface3DData {
  const axis = Float64Array.from(
    { length: size },
    (_, i) => -extent + (2 * extent * i) / (size - 1),
  );
  const z = new Float32Array(size * size);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) z[r * size + c] = f(axis[c]!, axis[r]!);
  }
  return { rows: size, cols: size, x: axis, y: axis, z };
}

const FUNCTIONS = {
  // sin(r) / r: ripples fading away from a central peak
  sinc: sample(10, 90, (x, y) => {
    const r = Math.hypot(x, y);
    return r === 0 ? 1 : Math.sin(r) / r;
  }),
  // MATLAB's peaks: three peaks and two pits
  peaks: sample(
    3,
    90,
    (x, y) =>
      3 * (1 - x) ** 2 * Math.exp(-(x ** 2) - (y + 1) ** 2) -
      10 * (x / 5 - x ** 3 - y ** 5) * Math.exp(-(x ** 2) - y ** 2) -
      Math.exp(-((x + 1) ** 2) - y ** 2) / 3,
  ),
  // a hyperbolic paraboloid
  saddle: sample(1, 60, (x, y) => x * x - y * y),
};
type FunctionKey = keyof typeof FUNCTIONS;

export default function FunctionsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [key, setKey] = useState<FunctionKey>("sinc");
  const series = useMemo(
    (): Surface3DSeries[] => [
      { name: t(`functions.${key}`), data: FUNCTIONS[key] },
    ],
    [t, key],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("function")}
        direction="horizontal"
        size="small"
        value={key}
        onChange={(value) => setKey(value as FunctionKey)}
      >
        {(Object.keys(FUNCTIONS) as FunctionKey[]).map((name) => (
          <Radio key={name} value={name} label={t(`functions.${name}`)} />
        ))}
      </RadioGroup>
      <Surface3DChart
        series={series}
        xAxis={{ title: t("x") }}
        yAxis={{ title: t("y") }}
        zAxis={{ title: t("z") }}
        height={420}
        ariaLabel={t("functionsAria", { name: t(`functions.${key}`) })}
      />
    </div>
  );
}

```

## Example: Heat diffusion

A metal plate simulated with the heat equation: a setInterval (cleaned up on unmount) runs a few finite-difference steps and sets a new data object. onPointClick gives the row and col of the clicked vertex to add or remove a heat source; zAxis and valueRange are fixed so the inferno scale does not rescale while the plate warms up.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/surface-3d-chart/demos/heat-diffusion.tsx

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack, Switch } from "minerva-design";
import {
  Surface3DChart,
  type Surface3DData,
  type Surface3DSeries,
} from "minerva-design/charts";

// A 40 × 40 cm metal plate whose edges are kept at room temperature;
// heat sources hold their cell at 100 °C and the heat spreads by diffusion.
const SIZE = 41;
const AMBIENT = 20;
const SOURCE = 100;
const RATE = 0.2; // diffusion number of the explicit scheme (stable below 0.25)
const AXIS = Float64Array.from({ length: SIZE }, (_, i) => i);
const INITIAL_SOURCES = [[12, 14]];

const sourceKey = (row: number, col: number) => row * SIZE + col;

const ambient = () => new Float32Array(SIZE * SIZE).fill(AMBIENT);

/** Runs `steps` explicit finite-difference steps of the heat equation */
const diffuse = (grid: Float32Array, sources: Set<number>, steps: number) => {
  let current = grid;
  for (let step = 0; step < steps; step++) {
    const next = new Float32Array(current);
    for (let r = 1; r < SIZE - 1; r++) {
      for (let c = 1; c < SIZE - 1; c++) {
        const i = r * SIZE + c;
        next[i] =
          current[i]! +
          RATE *
            (current[i - 1]! +
              current[i + 1]! +
              current[i - SIZE]! +
              current[i + SIZE]! -
              4 * current[i]!);
      }
    }
    for (const i of sources) next[i] = SOURCE;
    current = next;
  }
  return current;
};

const toData = (z: Float32Array): Surface3DData => ({
  rows: SIZE,
  cols: SIZE,
  x: AXIS,
  y: AXIS,
  z,
});

export default function HeatDiffusionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [playing, setPlaying] = useState(true);
  const [sourceCount, setSourceCount] = useState(INITIAL_SOURCES.length);
  const [data, setData] = useState(() => toData(ambient()));
  const sources = useRef(
    new Set(INITIAL_SOURCES.map(([r, c]) => sourceKey(r!, c!))),
  );

  // 8 diffusion steps every 80 ms, only while playing
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setData((previous) =>
        toData(diffuse(previous.z as Float32Array, sources.current, 8)),
      );
    }, 80);
    return () => window.clearInterval(timer);
  }, [playing]);

  const series = useMemo(
    (): Surface3DSeries[] => [{ name: t("plate"), data }],
    [t, data],
  );
  const stats = useMemo(() => {
    let max = -Infinity;
    let sum = 0;
    for (let i = 0; i < data.z.length; i++) {
      max = Math.max(max, data.z[i]!);
      sum += data.z[i]!;
    }
    return { max, mean: sum / data.z.length };
  }, [data]);
  const celsius = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );

  const reset = () => {
    sources.current = new Set(
      INITIAL_SOURCES.map(([r, c]) => sourceKey(r!, c!)),
    );
    setSourceCount(sources.current.size);
    setData(toData(ambient()));
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={12} wrap align="center">
        <Switch
          size="small"
          checked={playing}
          label={t("play")}
          onChange={setPlaying}
        />
        <Button size="small" variant="outline" color="neutral" onClick={reset}>
          {t("reset")}
        </Button>
      </HStack>
      <Surface3DChart
        series={series}
        xAxis={{ title: t("cm") }}
        yAxis={{ title: t("cm") }}
        zAxis={{
          min: AMBIENT,
          max: SOURCE,
          title: t("temperature"),
          format: (value) => celsius.format(value),
        }}
        valueRange={[AMBIENT, SOURCE]}
        colorScale="inferno"
        colorBar={{
          title: t("temperature"),
          format: (value) => celsius.format(value),
        }}
        aspect={[1, 1, 0.5]}
        camera={{ azimuth: 30, elevation: 38 }}
        height={440}
        ariaLabel={t("heatAria")}
        onPointClick={(event) => {
          if (event.row === undefined || event.col === undefined) return;
          // clicking near a source removes it, clicking elsewhere adds one
          const row = Math.min(SIZE - 2, Math.max(1, event.row));
          const col = Math.min(SIZE - 2, Math.max(1, event.col));
          const near = [...sources.current].find(
            (key) =>
              Math.abs(Math.floor(key / SIZE) - row) <= 2 &&
              Math.abs((key % SIZE) - col) <= 2,
          );
          if (near === undefined) sources.current.add(sourceKey(row, col));
          else sources.current.delete(near);
          setSourceCount(sources.current.size);
          setPlaying(true);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("heatStatus", {
          sources: sourceCount,
          max: celsius.format(stats.max),
          mean: celsius.format(stats.mean),
        })}
      </output>
    </div>
  );
}

```

## Example: Live wave

Ripples recomputed about 30 times per second: a new data object each frame updates the chart. The animation stops when the demo leaves the screen or the tab is hidden.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/surface-3d-chart/demos/live-wave.tsx

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  Surface3DChart,
  type Surface3DData,
  type Surface3DSeries,
} from "minerva-design/charts";

// Ripples spreading from the center, recomputed ~30 times per second
const SIZE = 100;
const axis = Float64Array.from(
  { length: SIZE },
  (_, i) => -6 + (12 * i) / (SIZE - 1),
);
const radius = new Float32Array(SIZE * SIZE);
for (let r = 0; r < SIZE; r++) {
  for (let c = 0; c < SIZE; c++)
    radius[r * SIZE + c] = Math.hypot(axis[c]!, axis[r]!);
}
const wave = (time: number): Surface3DData => {
  const z = new Float32Array(SIZE * SIZE);
  for (let i = 0; i < z.length; i++) {
    const d = radius[i]!;
    z[i] = Math.sin(d * 2.2 - time * 3) * Math.exp(-d * 0.22);
  }
  // a new object every frame: the chart only re-processes changed data
  return { rows: SIZE, cols: SIZE, x: axis, y: axis, z };
};

export default function LiveWaveDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [playing, setPlaying] = useState(true);
  const [data, setData] = useState(() => wave(0));
  const host = useRef<HTMLDivElement>(null);

  // the animation runs only while playing, on-screen and in a visible tab
  useEffect(() => {
    const element = host.current;
    if (!playing || !element) return;
    let frame = 0;
    let visible = false;
    let last = 0;
    let time = 0;
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      if (now - last >= 33) {
        time += last ? Math.min(0.1, (now - last) / 1000) : 0;
        last = now;
        setData(wave(time));
      }
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!frame && visible && !document.hidden) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      start();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", start);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", start);
      cancelAnimationFrame(frame);
    };
  }, [playing]);

  const series = useMemo(
    (): Surface3DSeries[] => [{ name: t("wave"), data }],
    [t, data],
  );

  return (
    <div ref={host} style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        size="small"
        checked={playing}
        label={t("play")}
        onChange={setPlaying}
      />
      <Surface3DChart
        series={series}
        zAxis={{ min: -1, max: 1, title: t("amplitude") }}
        valueRange={[-1, 1]}
        colorScale="coolwarm"
        colorBar={false}
        aspect={[1, 1, 0.45]}
        camera={{ elevation: 32 }}
        height={420}
        ariaLabel={t("waveAria")}
      />
    </div>
  );
}

```

## Example: Loss landscape

Himmelblau's function, a test landscape with four minima, drawn as log10(1 + loss) with floor contours. The select switches colorScale between built-in ramps; click a point to run gradient descent from there and see which minimum it reaches.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/surface-3d-chart/demos/loss-landscape.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Select, SelectItem } from "minerva-design";
import {
  Surface3DChart,
  type Chart3DColorMap,
  type Surface3DSeries,
} from "minerva-design/charts";

// Himmelblau's function: four global minima of equal depth, a classic
// test landscape for optimizers. The surface shows log10(1 + loss).
const SIZE = 90;
const RANGE = 5;
const AXIS = Float64Array.from(
  { length: SIZE },
  (_, i) => -RANGE + (2 * RANGE * i) / (SIZE - 1),
);
const loss = (x: number, y: number) =>
  (x * x + y - 11) ** 2 + (x + y * y - 7) ** 2;
const gradient = (x: number, y: number): [number, number] => [
  4 * x * (x * x + y - 11) + 2 * (x + y * y - 7),
  2 * (x * x + y - 11) + 4 * y * (x + y * y - 7),
];

const DATA = (() => {
  const z = new Float32Array(SIZE * SIZE);
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      z[r * SIZE + c] = Math.log10(1 + loss(AXIS[c]!, AXIS[r]!));
    }
  }
  return { rows: SIZE, cols: SIZE, x: AXIS, y: AXIS, z };
})();

const MINIMA: [number, number][] = [
  [3, 2],
  [-2.805, 3.131],
  [-3.779, -3.283],
  [3.584, -1.848],
];

/** Plain gradient descent from (x, y): the minimum it ends in and the steps */
const descend = (x0: number, y0: number) => {
  let [x, y] = [x0, y0];
  let steps = 0;
  for (; steps < 5000; steps++) {
    const [gx, gy] = gradient(x, y);
    if (Math.hypot(gx, gy) < 1e-4) break;
    // a small step with clipping keeps the descent stable on the steep walls
    const scale = Math.min(0.01, 0.5 / Math.hypot(gx, gy));
    x -= scale * gx;
    y -= scale * gy;
  }
  const minimum = MINIMA.reduce(
    (best, m, i) =>
      Math.hypot(m[0] - x, m[1] - y) <
      Math.hypot(MINIMA[best]![0] - x, MINIMA[best]![1] - y)
        ? i
        : best,
    0,
  );
  return { minimum, steps };
};

const COLOR_MAPS: Chart3DColorMap[] = [
  "viridis",
  "plasma",
  "magma",
  "cividis",
  "turbo",
];

export default function LossLandscapeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [colorMap, setColorMap] = useState<Chart3DColorMap>("viridis");
  const [start, setStart] = useState<[number, number] | null>(null);
  const formats = useMemo(
    () => ({
      coordinate: new Intl.NumberFormat(i18n.language, {
        maximumFractionDigits: 2,
      }),
      loss: new Intl.NumberFormat(i18n.language, {
        maximumSignificantDigits: 3,
      }),
      integer: new Intl.NumberFormat(i18n.language),
    }),
    [i18n.language],
  );
  const series = useMemo(
    (): Surface3DSeries[] => [
      {
        name: t("loss"),
        data: DATA,
        contours: { count: 14, floor: true },
        format: (value) => formats.loss.format(10 ** value - 1),
      },
    ],
    [t, formats],
  );
  const result = useMemo(() => (start ? descend(...start) : null), [start]);
  const point = (x: number, y: number) =>
    t("point", {
      x: formats.coordinate.format(x),
      y: formats.coordinate.format(y),
    });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} align="center">
        <span>{t("colorMap")}</span>
        <Select
          aria-label={t("colorMap")}
          size="small"
          value={colorMap}
          onChange={(value) => setColorMap(value as Chart3DColorMap)}
        >
          {COLOR_MAPS.map((id) => (
            <SelectItem key={id} value={id}>
              {t(`colorMaps.${id}`)}
            </SelectItem>
          ))}
        </Select>
      </HStack>
      <Surface3DChart
        series={series}
        xAxis={{ title: t("weight1") }}
        yAxis={{ title: t("weight2") }}
        zAxis={{ title: t("logLoss") }}
        colorScale={colorMap}
        colorBar={{ title: t("logLoss") }}
        aspect={[1, 1, 0.55]}
        camera={{ azimuth: 20, elevation: 40 }}
        height={460}
        ariaLabel={t("lossAria")}
        onPointClick={(event) => setStart([event.x, event.y])}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {start && result
          ? t("descentResult", {
              start: point(...start),
              loss: formats.loss.format(loss(...start)),
              steps: formats.integer.format(result.steps),
              n: result.minimum + 1,
              minimum: point(...MINIMA[result.minimum]!),
            })
          : t("lossHint")}
      </output>
    </div>
  );
}

```

## Example: Terrain

A 180 × 180 heightmap of a fractal island with the terrain color map, a flattened box (aspect) and a stronger directional light.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/surface-3d-chart/demos/terrain.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Surface3DChart, type Surface3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A 20 × 20 km island: fractal value noise (6 octaves) under a radial
// falloff, the sea clamped at 0 m
const SIZE = 180;
const KM = 20;
const random = mulberry32(2026);
const LATTICE = 64;
const lattice = Float64Array.from({ length: LATTICE * LATTICE }, () =>
  random(),
);
const smooth = (t: number) => t * t * (3 - 2 * t);
const noise = (x: number, y: number) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const fx = smooth(x - xi);
  const fy = smooth(y - yi);
  const at = (i: number, j: number) =>
    lattice[((j & (LATTICE - 1)) * LATTICE + (i & (LATTICE - 1))) | 0]!;
  const top = at(xi, yi) + (at(xi + 1, yi) - at(xi, yi)) * fx;
  const bottom = at(xi, yi + 1) + (at(xi + 1, yi + 1) - at(xi, yi + 1)) * fx;
  return top + (bottom - top) * fy;
};
const coords = Float64Array.from(
  { length: SIZE },
  (_, i) => Math.round(((i * KM) / (SIZE - 1)) * 100) / 100,
);
const heights = new Float32Array(SIZE * SIZE);
for (let r = 0; r < SIZE; r++) {
  for (let c = 0; c < SIZE; c++) {
    let h = 0;
    let amplitude = 1;
    let frequency = 5 / SIZE;
    for (let octave = 0; octave < 6; octave++) {
      h += noise(c * frequency, r * frequency) * amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }
    const dx = c / (SIZE - 1) - 0.5;
    const dy = r / (SIZE - 1) - 0.5;
    const falloff = 1 - Math.min(1, Math.hypot(dx, dy) * 2.1);
    heights[r * SIZE + c] = Math.max(0, (h * 0.9 - 1.0 + falloff * 1.3) * 1400);
  }
}
const island = { rows: SIZE, cols: SIZE, x: coords, y: coords, z: heights };

export default function TerrainDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const series = useMemo(
    (): Surface3DSeries[] => [{ name: t("island"), data: island }],
    [t],
  );
  const km = (value: number) => t("km", { value });
  const meters = (value: number) => t("meters", { value: Math.round(value) });

  return (
    <Surface3DChart
      series={series}
      aspect={[1, 1, 0.28]}
      colorScale="terrain"
      xAxis={{ title: t("east"), format: km }}
      yAxis={{ title: t("north"), format: km }}
      zAxis={{ title: t("elevation"), format: meters }}
      colorBar={{ title: t("elevation"), format: meters }}
      lighting={{ ambient: 0.35, diffuse: 0.8, specular: 0.08 }}
      camera={{ azimuth: 30, elevation: 38 }}
      height={440}
      ariaLabel={t("terrainAria")}
    />
  );
}

```

## Example: Transparency

Two surfaces with an opacity below 1 show where a tilted plane crosses a bowl; colorBy "series" gives each one its legend color. On WebGPU and WebGL2 transparent surfaces, bars and dots blend in any order (weighted blended order-independent transparency), so intersections stay smooth; WebGL and Canvas2D sort them back to front.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/surface-3d-chart/demos/transparency.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Surface3DChart,
  type Surface3DData,
  type Surface3DSeries,
} from "minerva-design/charts";

const SIZE = 60;
const axis = Float64Array.from(
  { length: SIZE },
  (_, i) => -2 + (4 * i) / (SIZE - 1),
);
const grid = (f: (x: number, y: number) => number): Surface3DData => {
  const z = new Float32Array(SIZE * SIZE);
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) z[r * SIZE + c] = f(axis[c]!, axis[r]!);
  }
  return { rows: SIZE, cols: SIZE, x: axis, y: axis, z };
};
// a bowl crossed by a tilted plane: transparency shows where they meet
const bowl = grid((x, y) => (x * x + y * y) / 2);
const plane = grid((x, y) => 1.4 + 0.6 * x - 0.3 * y);

export default function TransparencyDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const series = useMemo(
    (): Surface3DSeries[] => [
      { name: t("bowl"), data: bowl, colorBy: "series", opacity: 0.7 },
      {
        name: t("plane"),
        data: plane,
        colorBy: "series",
        opacity: 0.55,
        wireframe: { step: 6 },
      },
    ],
    [t],
  );

  return (
    <Surface3DChart
      series={series}
      xAxis={{ title: t("x") }}
      yAxis={{ title: t("y") }}
      zAxis={{ title: t("z") }}
      camera={{ azimuth: -30, elevation: 22 }}
      height={420}
      ariaLabel={t("transparencyAria")}
    />
  );
}

```

## Example: Volatility surface

Implied volatility of index options by strike and time to expiry: the smile and the skew of short expiries, with a thin wireframe.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/surface-3d-chart/demos/volatility.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Surface3DChart, type Surface3DSeries } from "minerva-design/charts";

// Implied volatility of index options by strike (moneyness, % of spot) and
// time to expiry: a smile that is steepest for short expiries (skew towards
// low strikes) and a term structure rising from 16% to 21%
const STRIKES = Array.from({ length: 33 }, (_, i) => 60 + i * 2.5);
const EXPIRIES = [7, 14, 30, 60, 90, 120, 180, 270, 365, 540, 730];
const vol = new Float32Array(STRIKES.length * EXPIRIES.length);
EXPIRIES.forEach((days, r) => {
  const years = days / 365;
  const atm = 21 - 5 * Math.exp(-years * 1.4);
  const skew = -12 / Math.sqrt(years + 0.25);
  const smile = 25 / Math.sqrt(years + 0.25);
  STRIKES.forEach((strike, c) => {
    const k = Math.log(strike / 100);
    vol[r * STRIKES.length + c] = atm + skew * k + smile * k * k;
  });
});
const surface = {
  rows: EXPIRIES.length,
  cols: STRIKES.length,
  x: STRIKES,
  y: EXPIRIES,
  z: vol,
};

export default function VolatilityDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const series = useMemo(
    (): Surface3DSeries[] => [
      {
        name: t("impliedVol"),
        data: surface,
        wireframe: { width: 0.75 },
      },
    ],
    [t],
  );
  const percent = (value: number) => t("percent", { value: value.toFixed(1) });

  return (
    <Surface3DChart
      series={series}
      colorScale="spectral"
      xAxis={{
        title: t("strike"),
        format: (value) => t("percent", { value: Math.round(value) }),
      }}
      yAxis={{
        title: t("expiry"),
        format: (value) => t("days", { value: Math.round(value) }),
      }}
      zAxis={{ title: t("impliedVol"), format: percent }}
      colorBar={{ format: (value) => t("percent", { value }) }}
      camera={{ azimuth: -28, elevation: 24 }}
      height={440}
      ariaLabel={t("volatilityAria")}
    />
  );
}

```

## Example: Wi-Fi coverage

Signal strength over an office floor from log-distance path loss and wall losses, recomputed when access points are toggled with the tags. Contour levels mark the −67 and −75 dBm thresholds, and the button calls setCamera() on the ref for an orthographic top view, or resetCamera() to go back.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/surface-3d-chart/demos/wifi-signal.tsx

```tsx
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack, Tag } from "minerva-design";
import {
  Surface3DChart,
  type Chart3DHandle,
  type Surface3DSeries,
} from "minerva-design/charts";

// A 30 × 20 m office floor sampled every 0.5 m
const COLS = 61;
const ROWS = 41;
const STEP = 0.5;
const X = Float64Array.from({ length: COLS }, (_, i) => i * STEP);
const Y = Float64Array.from({ length: ROWS }, (_, i) => i * STEP);
const FLOOR = -95; // dBm, no usable signal
const GOOD = -67; // dBm, enough for video calls
const USABLE = -75;

type AccessPoint = "lobby" | "openSpace" | "meetingRooms" | "kitchen";
const ACCESS_POINTS: [AccessPoint, number, number][] = [
  ["lobby", 4, 4],
  ["openSpace", 16, 12],
  ["meetingRooms", 26, 16],
  ["kitchen", 25, 3],
];

// interior walls (x1, y1, x2, y2); each one crossed costs 6 dB
const WALLS: [number, number, number, number][] = [
  [10, 0, 10, 8],
  [20, 9, 30, 9],
  [21, 9, 21, 20],
  [0, 14, 10, 14],
  [18, 0, 18, 6],
];

const crosses = (
  ax: number,
  ay: number,
  bx: number,
  by: number,
  [cx, cy, dx, dy]: [number, number, number, number],
) => {
  const side = (
    px: number,
    py: number,
    qx: number,
    qy: number,
    rx: number,
    ry: number,
  ) => Math.sign((qx - px) * (ry - py) - (qy - py) * (rx - px));
  return (
    side(ax, ay, bx, by, cx, cy) !== side(ax, ay, bx, by, dx, dy) &&
    side(cx, cy, dx, dy, ax, ay) !== side(cx, cy, dx, dy, bx, by)
  );
};

/** Strongest signal over the floor, log-distance path loss plus wall losses */
const coverage = (enabled: ReadonlySet<AccessPoint>) => {
  const z = new Float32Array(ROWS * COLS);
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let best = FLOOR;
      for (const [id, ax, ay] of ACCESS_POINTS) {
        if (!enabled.has(id)) continue;
        const [x, y] = [X[c]!, Y[r]!];
        const walls = WALLS.filter((wall) =>
          crosses(ax, ay, x, y, wall),
        ).length;
        const distance = Math.max(1, Math.hypot(x - ax, y - ay));
        best = Math.max(best, -32 - 30 * Math.log10(distance) - 6 * walls);
      }
      z[r * COLS + c] = best;
    }
  }
  return { rows: ROWS, cols: COLS, x: X, y: Y, z };
};

export default function WifiSignalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const ref = useRef<Chart3DHandle>(null);
  const [enabled, setEnabled] = useState<ReadonlySet<AccessPoint>>(
    () => new Set<AccessPoint>(["lobby", "openSpace", "meetingRooms"]),
  );
  const [topView, setTopView] = useState(false);
  const data = useMemo(() => coverage(enabled), [enabled]);
  const percent = useMemo(
    () => new Intl.NumberFormat(i18n.language, { style: "percent" }),
    [i18n.language],
  );
  const dbm = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: 0,
    });
    return (value: number) => t("dbm", { value: number.format(value) });
  }, [t, i18n.language]);

  const series = useMemo(
    (): Surface3DSeries[] => [
      {
        name: t("signal"),
        data,
        contours: {
          levels: [USABLE, GOOD],
          floor: true,
          surface: true,
          width: 1.5,
        },
        format: dbm,
      },
    ],
    [t, data, dbm],
  );
  const share = (threshold: number) =>
    data.z.filter((value) => value >= threshold).length / data.z.length;

  const toggle = (id: AccessPoint) => {
    const next = new Set(enabled);
    if (!next.delete(id)) next.add(id);
    setEnabled(next);
  };
  const switchView = () => {
    if (topView) ref.current?.resetCamera();
    else
      ref.current?.setCamera({
        azimuth: 0,
        elevation: 89,
        zoom: 1,
        pan: [0, 0],
        projection: "orthographic",
      });
    setTopView(!topView);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} wrap align="center">
        <span>{t("accessPoints")}</span>
        {ACCESS_POINTS.map(([id]) => (
          <Tag
            key={id}
            size="small"
            clickable
            pressed={enabled.has(id)}
            onClick={() => toggle(id)}
          >
            {t(`rooms.${id}`)}
          </Tag>
        ))}
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={switchView}
        >
          {topView ? t("perspectiveView") : t("topView")}
        </Button>
      </HStack>
      <Surface3DChart
        ref={ref}
        series={series}
        xAxis={{ title: t("distanceM") }}
        yAxis={{ title: t("distanceM") }}
        zAxis={{ min: FLOOR, max: -30, title: t("signal"), format: dbm }}
        valueRange={[FLOOR, -30]}
        colorScale="spectral"
        colorBar={{ title: t("signal"), format: dbm }}
        aspect={[30, 20, 8]}
        camera={{ azimuth: 25, elevation: 40 }}
        height={440}
        ariaLabel={t("wifiAria")}
        onCameraChange={(camera) =>
          setTopView(
            camera.projection === "orthographic" && camera.elevation > 80,
          )
        }
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {enabled.size
          ? t("wifiCoverage", {
              good: percent.format(share(GOOD)),
              goodLevel: dbm(GOOD),
              usable: percent.format(share(USABLE)),
              usableLevel: dbm(USABLE),
            })
          : t("wifiNone")}
      </output>
    </div>
  );
}

```

## Example: Wireframe and contours

Switch the faces, the wireframe and the contour lines (projected on the floor or drawn on the surface) of the peaks function.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/surface-3d-chart/demos/wireframe-contours.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { Surface3DChart, type Surface3DSeries } from "minerva-design/charts";

// MATLAB's peaks function on a 120 × 120 grid
const SIZE = 120;
const axis = Float64Array.from(
  { length: SIZE },
  (_, i) => -3 + (6 * i) / (SIZE - 1),
);
const z = new Float32Array(SIZE * SIZE);
for (let r = 0; r < SIZE; r++) {
  for (let c = 0; c < SIZE; c++) {
    const x = axis[c]!;
    const y = axis[r]!;
    z[r * SIZE + c] =
      3 * (1 - x) ** 2 * Math.exp(-(x ** 2) - (y + 1) ** 2) -
      10 * (x / 5 - x ** 3 - y ** 5) * Math.exp(-(x ** 2) - y ** 2) -
      Math.exp(-((x + 1) ** 2) - y ** 2) / 3;
  }
}
const peaks = { rows: SIZE, cols: SIZE, x: axis, y: axis, z };

export default function WireframeContoursDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [fill, setFill] = useState(true);
  const [wireframe, setWireframe] = useState(true);
  const [floor, setFloor] = useState(true);
  const [onSurface, setOnSurface] = useState(false);

  const series = useMemo(
    (): Surface3DSeries[] => [
      {
        name: t("functions.peaks"),
        data: peaks,
        fill,
        opacity: 0.92,
        wireframe: wireframe && { step: 4 },
        contours: (floor || onSurface) && {
          count: 14,
          floor,
          surface: onSurface,
          width: 1.25,
        },
      },
    ],
    [t, fill, wireframe, floor, onSurface],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <Switch
          size="small"
          checked={fill}
          label={t("fill")}
          onChange={setFill}
        />
        <Switch
          size="small"
          checked={wireframe}
          label={t("wireframe")}
          onChange={setWireframe}
        />
        <Switch
          size="small"
          checked={floor}
          label={t("floorContours")}
          onChange={setFloor}
        />
        <Switch
          size="small"
          checked={onSurface}
          label={t("surfaceContours")}
          onChange={setOnSurface}
        />
      </div>
      <Surface3DChart
        series={series}
        colorScale="viridis"
        camera={{ azimuth: -50, elevation: 30 }}
        height={440}
        ariaLabel={t("contoursAria")}
      />
    </div>
  );
}

```

## Example: Yield curve over time

Two years of a government yield curve, from inverted to normal, as a maturity × month surface with contour lines on the floor. Axis format callbacks turn grid indices into maturities and Intl.DateTimeFormat months, and onHover reads the yield and the 10-year minus 2-year spread of the hovered month.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/surface-3d-chart/demos/yield-curve.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Surface3DChart, type Surface3DSeries } from "minerva-design/charts";

// maturities of the curve in months, evenly spaced on the x axis
const MATURITIES = [1, 3, 6, 12, 24, 36, 60, 84, 120, 240, 360];
const MONTHS = 24;
const START = Date.UTC(2024, 10, 1); // November 2024

/**
 * Nelson-Siegel yields: the curve starts inverted (short rates above long
 * rates) and normalizes as the central bank cuts its rate month after month
 */
const yieldAt = (month: number, maturity: number) => {
  const progress = month / (MONTHS - 1);
  const level = 4.3 + 0.25 * Math.sin(month / 3.5);
  const slope = 0.9 - 1.9 * progress; // short end minus long end
  const curvature = -0.6 + 0.4 * Math.sin(month / 5);
  const tau = 2.2;
  const years = maturity / 12;
  const f = (1 - Math.exp(-years / tau)) / (years / tau);
  return level + slope * f + curvature * (f - Math.exp(-years / tau));
};

const DATA = (() => {
  const z = new Float32Array(MONTHS * MATURITIES.length);
  for (let r = 0; r < MONTHS; r++) {
    MATURITIES.forEach((maturity, c) => {
      z[r * MATURITIES.length + c] = yieldAt(r, maturity);
    });
  }
  return { rows: MONTHS, cols: MATURITIES.length, z };
})();

const dateOf = (month: number) => {
  const date = new Date(START);
  date.setUTCMonth(date.getUTCMonth() + month);
  return date;
};

export default function YieldCurveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(
    null,
  );
  const formats = useMemo(
    () => ({
      month: new Intl.DateTimeFormat(i18n.language, {
        month: "short",
        year: "2-digit",
        timeZone: "UTC",
      }),
      longMonth: new Intl.DateTimeFormat(i18n.language, {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }),
      percent: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      months: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "month",
        unitDisplay: "short",
      }),
      years: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "year",
        unitDisplay: "short",
      }),
    }),
    [i18n.language],
  );
  const maturity = (index: number) => {
    const months = MATURITIES[Math.round(index)];
    if (months === undefined) return "";
    return months < 12
      ? formats.months.format(months)
      : formats.years.format(months / 12);
  };

  const series = useMemo(
    (): Surface3DSeries[] => [
      {
        name: t("treasuryYield"),
        data: DATA,
        contours: { count: 8, floor: true },
        format: (value) => formats.percent.format(value / 100),
      },
    ],
    [t, formats],
  );

  // spread between the 10-year and the 2-year yields of the hovered month
  const row = hovered?.row ?? MONTHS - 1;
  const spread =
    DATA.z[row * MATURITIES.length + MATURITIES.indexOf(120)]! -
    DATA.z[row * MATURITIES.length + MATURITIES.indexOf(24)]!;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Surface3DChart
        series={series}
        xAxis={{
          title: t("maturity"),
          format: maturity,
          tickCount: MATURITIES.length,
          nice: false,
        }}
        yAxis={{
          title: t("month"),
          format: (value) => formats.month.format(dateOf(Math.round(value))),
          nice: false,
        }}
        zAxis={{
          title: t("yield"),
          format: (value) => formats.percent.format(value / 100),
        }}
        colorScale="spectral"
        colorBar={false}
        aspect={[1, 1.2, 0.55]}
        camera={{ azimuth: -40, elevation: 28 }}
        height={460}
        ariaLabel={t("yieldAria")}
        onHover={(event) =>
          setHovered(
            event && event.row !== undefined && event.col !== undefined
              ? { row: event.row, col: event.col }
              : null,
          )
        }
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {hovered
          ? t("yieldHover", {
              maturity: maturity(hovered.col),
              date: formats.longMonth.format(dateOf(hovered.row)),
              yield: formats.percent.format(
                DATA.z[hovered.row * MATURITIES.length + hovered.col]! / 100,
              ),
            })
          : t("yieldHint")}{" "}
        {t(spread < 0 ? "spreadInverted" : "spreadNormal", {
          date: formats.longMonth.format(dateOf(row)),
          spread: formats.percent.format(spread / 100),
        })}
      </output>
    </div>
  );
}

```
