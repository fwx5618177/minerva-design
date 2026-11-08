# 3D 柱状图

x × y 类别网格上的柱体：带光照的立方体、按系列着色、跨系列堆叠、按高度或其他值通过色阶着色，并支持图例和色条。

Package: minerva-design@1.23.1

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

销售额

地区

月份

北部

南部

东部

西部

中部

五个地区的月度销售额

季度

第一季度

第二季度

第三季度

第四季度

市场

美洲

欧洲

亚洲

大洋洲

硬件

软件

服务

收入

三条产品线在四个市场的季度收入（堆叠）

女性

男性

年龄

{{from}}–{{to}} 岁

{{from}} 岁以上

普查年份

人口

{{value}} 百万

四个普查年份按年龄组和性别划分的人口

访问量

小时

星期

网站每周各小时的访问量

产品

笔记本电脑

手机

平板电脑

手表

音频设备

利润率

五种产品在四个市场的收入与利润率

库存充足

库存不足

{{value}} 件

实时更新

通道

{{id}} 通道

货架层

第 {{n}} 层

件数

按通道和货架层统计的仓库货位剩余件数，实时更新

库存 {{total}} 件 · 不足货位：{{low}} / {{bins}} · 已补货货位：{{restocked}}。

留存率

注册后月数

第 {{n}} 月

注册月份

按注册后月数统计的各月注册同期群留存率

{{cohort}}同期群，第 {{n}} 个月：{{retention}} 仍活跃（{{total}} 位用户中的 {{users}} 位）。

点击柱子查看同期群的留存率。

研发

销售

市场

运营

客服

财务

实际支出

财年

预算差异

部门

{{year}} 年六个部门的季度支出及预算差异

{{department}}，{{quarter}}：支出 {{actual}}，预算 {{budget}}（{{variance}}）。

{{year}} 年：支出 {{actual}}，预算 {{budget}}（{{variance}}）。超支最多：{{department}}，{{quarter}}（{{worst}}）。

{{value}} kW

进风温度

深色主题

3D 视图

平面图

机柜

排

{{id}} 排

功耗

按排和位置排列的服务器机柜，柱高为功耗，颜色为进风温度

机柜 {{rack}}：{{power}}，进风 {{inlet}}，超过 {{limit}} 上限。

机柜 {{rack}}：{{power}}，进风 {{inlet}}，未超过 {{limit}} 上限。

进风温度超过 {{limit}} 的机柜：{{total}} 个中有 {{hot}} 个（{{racks}}）。点击机柜查看读数。

## Bar3DChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "Bar3DChart"
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
    "typeText": "readonly Bar3DSeries[]",
    "typeRef": "type:d3b5b1b2d9d80229448b",
    "required": true,
    "description": "Bars over the x × y category grid (bars of the same cell are stacked)"
  },
  {
    "name": "barWidth",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.7,
    "required": false,
    "description": "Width of the bars of the series that do not set one, as a fraction of a cell"
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
  "Bar3DChartProps": {
    "source": "charts/src/react/three-d.tsx",
    "description": "Props of `Bar3DChart`",
    "kind": "interface",
    "extends": [
      "Chart3DCommonProps"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly Bar3DSeries[]",
        "required": true,
        "description": "Bars over the x × y category grid (bars of the same cell are stacked)"
      },
      {
        "name": "barWidth",
        "type": "number",
        "required": false,
        "default": "0.7",
        "description": "Width of the bars of the series that do not set one, as a fraction of a cell"
      }
    ]
  },
  "Bar3DSeries": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "Bars over an x × y category grid; bars of several series in the same cell are stacked",
    "kind": "interface",
    "extends": [
      "Chart3DSeriesBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"bar\"",
        "required": false
      },
      {
        "name": "data",
        "type": "readonly Bar3DDatum[] | readonly (readonly [string | number, string | number, number | null])[]",
        "required": true,
        "description": "The bars: objects or `[x, y, z]` tuples"
      },
      {
        "name": "colorBy",
        "type": "Chart3DColorBy",
        "required": false,
        "default": "\"series\"",
        "description": "Source of the bar colors"
      },
      {
        "name": "opacity",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Opacity of the bars, 0-1"
      },
      {
        "name": "barWidth",
        "type": "number",
        "required": false,
        "default": "0.7",
        "description": "Width of the bars as a fraction of a cell, 0-1"
      }
    ]
  },
  "Bar3DDatum": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "One bar: a cell of the x × y category grid and its height",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "x",
        "type": "string | number",
        "required": true,
        "description": "X category (a name, or its index)"
      },
      {
        "name": "y",
        "type": "string | number",
        "required": true,
        "description": "Y category (a name, or its index)"
      },
      {
        "name": "z",
        "type": "number | null",
        "required": true,
        "description": "Height; `null` leaves the cell empty"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Bar color (any CSS color); wins over the series color and the color scale"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Value mapped to the color scale (`colorBy: \"value\"`); the height by default"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Text shown in the tooltip"
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
  },
  "Chart3DLegendOptions": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "Legend options",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "position",
        "type": "\"top\" | \"bottom\"",
        "required": false,
        "default": "\"top\"",
        "description": "Legend position"
      },
      {
        "name": "toggle",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Clicking an item toggles its series"
      }
    ]
  },
  "Chart3DTooltipOptions": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "Tooltip options",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "render",
        "type": "(event: Chart3DHoverEvent) => string | Node | null",
        "required": false,
        "description": "Renders the tooltip content (a string is set as text)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 预算差异

所选财年六个部门的季度支出：柱高为实际支出，颜色为与预算的差异。colorBy: "value" 配合发散型 coolwarm 色阶和对称的 valueRange，使符合预算的单元格保持中性色，超支偏暖色，节支偏冷色。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-3d-chart/demos/budget-variance.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Select, SelectItem } from "minerva-design";
import {
  Bar3DChart,
  type Bar3DDatum,
  type Bar3DSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DEPARTMENTS = [
  "engineering",
  "sales",
  "marketing",
  "operations",
  "support",
  "finance",
] as const;
const QUARTERS = ["q1", "q2", "q3", "q4"] as const;
const YEARS = ["2024", "2025", "2026"] as const;
type Year = (typeof YEARS)[number];
// quarterly budget of each department, in USD
const BUDGET = [820e3, 540e3, 410e3, 360e3, 220e3, 150e3];
const LIMIT = 0.25;

interface Cell {
  department: number;
  quarter: number;
  budget: number;
  actual: number;
  variance: number; // (actual − budget) / budget
}

/** Budget and actual spend of a year: the budget grows, the variance is random */
const yearOf = (year: Year): Cell[] => {
  const random = mulberry32(Number(year));
  const growth = 1 + 0.06 * (Number(year) - 2024);
  return DEPARTMENTS.flatMap((_, department) =>
    QUARTERS.map((_, quarter) => {
      const budget = BUDGET[department]! * growth;
      // marketing overspends late in the year, support runs lean
      const bias =
        department === 2 ? quarter * 0.04 : department === 4 ? -0.06 : 0;
      const variance = Math.max(
        -LIMIT,
        Math.min(LIMIT, bias + (random() - 0.5) * 0.24),
      );
      return {
        department,
        quarter,
        budget,
        actual: budget * (1 + variance),
        variance,
      };
    }),
  );
};

export default function BudgetVarianceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const [year, setYear] = useState<Year>("2025");
  const [picked, setPicked] = useState<Cell | null>(null);
  const cells = useMemo(() => yearOf(year), [year]);
  const formats = useMemo(
    () => ({
      usd: new Intl.NumberFormat(i18n.language, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
      variance: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    }),
    [i18n.language],
  );

  const series = useMemo((): Bar3DSeries[] => {
    const data: Bar3DDatum[] = cells.map((cell) => ({
      x: cell.quarter,
      y: cell.department,
      z: cell.actual,
      value: cell.variance,
    }));
    return [
      {
        name: t("actualSpend"),
        data,
        colorBy: "value",
        format: (value) => formats.variance.format(value),
      },
    ];
  }, [t, cells, formats]);

  const name = (cell: Cell) => ({
    department: t(`departments.${DEPARTMENTS[cell.department]}`),
    quarter: t(`quarters.${QUARTERS[cell.quarter]}`),
  });
  const budget = cells.reduce((sum, cell) => sum + cell.budget, 0);
  const actual = cells.reduce((sum, cell) => sum + cell.actual, 0);
  const worst = cells.reduce((a, b) => (b.variance > a.variance ? b : a));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} align="center">
        <span>{t("fiscalYear")}</span>
        <Select
          aria-label={t("fiscalYear")}
          size="small"
          value={year}
          onChange={(value) => {
            setYear(value as Year);
            setPicked(null);
          }}
        >
          {YEARS.map((id) => (
            <SelectItem key={id} value={id}>
              {id}
            </SelectItem>
          ))}
        </Select>
      </HStack>
      <Bar3DChart
        series={series}
        xAxis={{
          title: t("quarter"),
          categories: QUARTERS.map((id) => t(`quarters.${id}`)),
        }}
        yAxis={{
          title: t("department"),
          categories: DEPARTMENTS.map((id) => t(`departments.${id}`)),
        }}
        zAxis={{
          title: t("actualSpend"),
          format: (value) => formats.usd.format(value),
        }}
        colorScale="coolwarm"
        // symmetric around zero: on budget is the neutral middle color
        valueRange={[-LIMIT, LIMIT]}
        colorBar={{
          title: t("varianceToBudget"),
          format: (value) => formats.variance.format(value),
        }}
        camera={{ azimuth: 35, elevation: 26 }}
        height={460}
        ariaLabel={t("budgetAria", { year })}
        onPointClick={(event) => setPicked(cells[event.index] ?? null)}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {picked
          ? t("varianceDetail", {
              ...name(picked),
              actual: formats.usd.format(picked.actual),
              budget: formats.usd.format(picked.budget),
              variance: formats.variance.format(picked.variance),
            })
          : t("budgetSummary", {
              year,
              actual: formats.usd.format(actual),
              budget: formats.usd.format(budget),
              variance: formats.variance.format((actual - budget) / budget),
              ...name(worst),
              worst: formats.variance.format(worst.variance),
            })}
      </output>
    </div>
  );
}

```

## Example: 同期群留存

每个月注册的同期群在 n 个月后仍活跃的比例；较新的同期群历史较短，空缺单元格使用 z: null。同期群名称来自 Intl.DateTimeFormat，柱子按高度着色（colorBy: "z"），点击可查看该单元格的留存率和活跃用户数。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-3d-chart/demos/cohort-retention.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Bar3DChart,
  type Bar3DDatum,
  type Bar3DSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Monthly signup cohorts from November 2025 to October 2026 and the share
// of each cohort still active n months later. Recent cohorts have fewer
// months of history (empty cells), and retain better after an onboarding
// redesign in May 2026.
const COHORTS = 12;
const FIRST = Date.UTC(2025, 10, 1);
const REDESIGN = 6;

interface Cell {
  cohort: number;
  month: number;
  retention: number | null;
}

const { CELLS, SIZES } = (() => {
  const random = mulberry32(12);
  const sizes = Array.from({ length: COHORTS }, () =>
    Math.round(900 + random() * 700),
  );
  const cells: Cell[] = [];
  for (let cohort = 0; cohort < COHORTS; cohort++) {
    const floor = cohort >= REDESIGN ? 0.34 : 0.24;
    for (let month = 0; month < COHORTS; month++) {
      const observed = month < COHORTS - cohort;
      const share =
        month === 0
          ? 1
          : floor +
            (1 - floor) * Math.exp(-month / 2.2) +
            (random() - 0.5) * 0.03;
      cells.push({ cohort, month, retention: observed ? share : null });
    }
  }
  return { CELLS: cells, SIZES: sizes };
})();

const cohortDate = (cohort: number) => {
  const date = new Date(FIRST);
  date.setUTCMonth(date.getUTCMonth() + cohort);
  return date;
};

export default function CohortRetentionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const [picked, setPicked] = useState<Cell | null>(null);
  const formats = useMemo(
    () => ({
      cohort: new Intl.DateTimeFormat(i18n.language, {
        month: "short",
        year: "2-digit",
        timeZone: "UTC",
      }),
      longCohort: new Intl.DateTimeFormat(i18n.language, {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }),
      percent: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
      integer: new Intl.NumberFormat(i18n.language),
    }),
    [i18n.language],
  );

  const series = useMemo((): Bar3DSeries[] => {
    const data: Bar3DDatum[] = CELLS.map((cell) => ({
      x: cell.month,
      y: cell.cohort,
      z: cell.retention === null ? null : cell.retention * 100,
    }));
    return [
      {
        name: t("retention"),
        data,
        colorBy: "z",
        format: (value) => formats.percent.format(value / 100),
      },
    ];
  }, [t, formats]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Bar3DChart
        series={series}
        xAxis={{
          title: t("monthsSinceSignup"),
          categories: Array.from({ length: COHORTS }, (_, n) =>
            t("monthIndex", { n }),
          ),
        }}
        yAxis={{
          title: t("signupCohort"),
          categories: Array.from({ length: COHORTS }, (_, n) =>
            formats.cohort.format(cohortDate(n)),
          ),
        }}
        zAxis={{
          title: t("retention"),
          min: 0,
          max: 100,
          format: (value) => formats.percent.format(value / 100),
        }}
        colorScale="viridis"
        colorBar={{
          title: t("retention"),
          format: (value) => formats.percent.format(value / 100),
        }}
        barWidth={0.75}
        camera={{ azimuth: 40, elevation: 30 }}
        height={460}
        ariaLabel={t("cohortAria")}
        onPointClick={(event) => setPicked(CELLS[event.index] ?? null)}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {picked && picked.retention !== null
          ? t("cohortReadout", {
              cohort: formats.longCohort.format(cohortDate(picked.cohort)),
              n: picked.month,
              retention: formats.percent.format(picked.retention),
              users: formats.integer.format(
                Math.round(picked.retention * SIZES[picked.cohort]!),
              ),
              total: formats.integer.format(SIZES[picked.cohort]!),
            })
          : t("cohortHint")}
      </output>
    </div>
  );
}

```

## Example: 机房热力图

机房中的机柜，柱高为功耗，颜色为 inferno 色阶上的进风温度。开关在深色 ConfigProvider 中重新挂载图表，按钮调用 ref 上的 setCamera() 切换为正交平面图（onCameraChange 保持按钮状态同步），摘要列出进风温度超过建议值的机柜。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-3d-chart/demos/datacenter.tsx

```tsx
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ConfigProvider, HStack, Switch } from "minerva-design";
import {
  Bar3DChart,
  type Bar3DDatum,
  type Bar3DSeries,
  type Chart3DHandle,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A server room of 6 rows × 10 racks: the bar height is the power draw,
// the color the inlet temperature. The cooling units stand at rack 1, so the
// far end of the room runs warmer, worst where dense GPU racks sit.
const ROWS = ["A", "B", "C", "D", "E", "F"];
const RACKS = 10;
const MAX_INLET = 27; // °C, upper end of the recommended inlet range

interface Rack {
  name: string;
  power: number; // kW
  inlet: number; // °C
}

const RACK_LIST: Rack[] = (() => {
  const random = mulberry32(77);
  return ROWS.flatMap((row, r) =>
    Array.from({ length: RACKS }, (_, c) => {
      const gpu = (r === 2 || r === 3) && c >= 6;
      const power = gpu ? 11 + random() * 4 : 3 + random() * 5;
      const inlet =
        18 + c * 0.75 + (power - 3) * 0.35 + (r === 0 ? 1 : 0) + random();
      return {
        name: `${row}${String(c + 1).padStart(2, "0")}`,
        power: Math.round(power * 10) / 10,
        inlet: Math.round(inlet * 10) / 10,
      };
    }),
  );
})();

export default function DatacenterDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const ref = useRef<Chart3DHandle>(null);
  const [dark, setDark] = useState(true);
  const [topView, setTopView] = useState(false);
  const [picked, setPicked] = useState<Rack | null>(null);
  const formats = useMemo(() => {
    const decimal = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: 1,
    });
    return {
      // kilowatts are not an Intl unit: a translated template
      kw: {
        format: (value: number) => t("kw", { value: decimal.format(value) }),
      },
      celsius: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
      }),
    };
  }, [t, i18n.language]);

  const series = useMemo((): Bar3DSeries[] => {
    const data: Bar3DDatum[] = RACK_LIST.map((rack, i) => ({
      x: i % RACKS,
      y: Math.floor(i / RACKS),
      z: rack.power,
      value: rack.inlet,
      label: rack.name,
    }));
    return [
      {
        name: t("inletTemperature"),
        data,
        colorBy: "value",
        format: (value) => formats.celsius.format(value),
      },
    ];
  }, [t, formats]);
  const hot = RACK_LIST.filter((rack) => rack.inlet > MAX_INLET);

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
    <ConfigProvider theme={dark ? "dark" : "light"}>
      <div
        style={{
          display: "grid",
          gap: 12,
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "1px solid var(--border-color)",
          background: "var(--background-color)",
          color: "var(--text-color)",
        }}
      >
        <HStack gap={16} wrap align="center">
          <Switch
            size="small"
            checked={dark}
            label={t("darkTheme")}
            onChange={(value) => {
              setDark(value);
              // the chart is created again with the camera of its props
              setTopView(false);
            }}
          />
          <Button
            size="small"
            variant="outline"
            color="neutral"
            onClick={switchView}
          >
            {topView ? t("perspectiveView") : t("topView")}
          </Button>
        </HStack>
        <Bar3DChart
          // the chart reads the theme of its scope when it is created
          key={dark ? "dark" : "light"}
          ref={ref}
          series={series}
          xAxis={{
            title: t("rackPosition"),
            categories: Array.from({ length: RACKS }, (_, n) => String(n + 1)),
          }}
          yAxis={{
            title: t("rackRow"),
            categories: ROWS.map((id) => t("rowLabel", { id })),
          }}
          zAxis={{
            title: t("powerDraw"),
            format: (value) => formats.kw.format(value),
          }}
          colorScale="inferno"
          valueRange={[18, 32]}
          colorBar={{
            title: t("inletTemperature"),
            format: (value) => formats.celsius.format(value),
          }}
          barWidth={0.8}
          camera={{ azimuth: 30, elevation: 32 }}
          height={440}
          ariaLabel={t("datacenterAria")}
          onPointClick={(event) => setPicked(RACK_LIST[event.index] ?? null)}
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
          {picked
            ? t(picked.inlet > MAX_INLET ? "rackHot" : "rackOk", {
                rack: picked.name,
                power: formats.kw.format(picked.power),
                inlet: formats.celsius.format(picked.inlet),
                limit: formats.celsius.format(MAX_INLET),
              })
            : t("datacenterSummary", {
                hot: hot.length,
                total: RACK_LIST.length,
                limit: formats.celsius.format(MAX_INLET),
                racks: new Intl.ListFormat(i18n.language).format(
                  hot.map((rack) => rack.name),
                ),
              })}
        </output>
      </div>
    </ConfigProvider>
  );
}

```

## Example: 实时仓库库存

仓库各货位（通道 × 货架层）的剩余件数，由带种子的 setInterval 每秒更新，卸载时清理。低于容量 20% 的货位移到使用危险色的第二个系列，因此每个单元格只在一个系列中有柱（另一个系列中 z: null），空货位会被补货。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-3d-chart/demos/inventory-live.tsx

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  Bar3DChart,
  type Bar3DDatum,
  type Bar3DSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Units in the bins of a warehouse: 6 aisles × 5 shelf levels. Every
// second a few orders are picked; a bin below 20% of its capacity is low,
// and an empty bin is restocked.
const AISLES = ["A", "B", "C", "D", "E", "F"];
const SHELVES = 5;
const CAPACITY = 120;
const LOW = CAPACITY * 0.2;

const initialStock = () => {
  const random = mulberry32(8);
  return Array.from({ length: AISLES.length * SHELVES }, () =>
    Math.round(CAPACITY * (0.35 + random() * 0.65)),
  );
};

export default function InventoryLiveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const [playing, setPlaying] = useState(true);
  const [stock, setStock] = useState(initialStock);
  const [restocked, setRestocked] = useState(0);
  // one generator for the whole session, so the picks follow a fixed sequence
  const random = useRef(mulberry32(31));

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      const next = random.current;
      // draw the picks outside the state updater, which must stay pure
      const picks = Array.from({ length: 6 }, () => {
        // the lower shelves are picked more often
        const aisle = Math.floor(next() * AISLES.length);
        const shelf = Math.floor(next() ** 1.6 * SHELVES);
        return [aisle * SHELVES + shelf, 1 + Math.floor(next() * 8)] as const;
      });
      setStock((previous) => {
        const bins = [...previous];
        for (const [i, units] of picks) bins[i] = Math.max(0, bins[i]! - units);
        return bins;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing]);

  // empty bins are refilled on the next update
  useEffect(() => {
    if (!stock.includes(0)) return;
    const timer = window.setTimeout(() => {
      setStock((previous) =>
        previous.map((units) => (units === 0 ? CAPACITY : units)),
      );
      setRestocked((n) => n + stock.filter((units) => units === 0).length);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [stock]);

  const integer = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  const series = useMemo((): Bar3DSeries[] => {
    // one series per state: a bin has a bar in exactly one of them
    const binsOf = (lowStock: boolean): Bar3DDatum[] =>
      stock.map((units, i) => ({
        x: Math.floor(i / SHELVES),
        y: i % SHELVES,
        z: units < LOW === lowStock ? units : null,
      }));
    const format = (value: number) =>
      t("unitsValue", { value: integer.format(value) });
    return [
      {
        name: t("inStock"),
        data: binsOf(false),
        color: "var(--chart-series-1, #4f46e5)",
        format,
      },
      {
        name: t("lowStock"),
        data: binsOf(true),
        color: "var(--danger-color, #dc2626)",
        format,
      },
    ];
  }, [t, stock, integer]);
  const low = stock.filter((units) => units < LOW).length;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        size="small"
        checked={playing}
        label={t("liveUpdates")}
        onChange={setPlaying}
      />
      <Bar3DChart
        series={series}
        xAxis={{
          title: t("aisle"),
          categories: AISLES.map((id) => t("aisleLabel", { id })),
        }}
        yAxis={{
          title: t("shelf"),
          categories: Array.from({ length: SHELVES }, (_, n) =>
            t("shelfLabel", { n: n + 1 }),
          ),
        }}
        zAxis={{ title: t("units"), min: 0, max: CAPACITY }}
        barWidth={0.6}
        camera={{ azimuth: 32, elevation: 26 }}
        height={420}
        ariaLabel={t("inventoryAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("inventoryStatus", {
          total: integer.format(stock.reduce((sum, units) => sum + units, 0)),
          low,
          bins: stock.length,
          restocked,
        })}
      </output>
    </div>
  );
}

```

## Example: 按其他值着色

收入决定高度，利润率决定颜色（每个数据的 value，配合 colorBy "value"）：最高的柱体并不是利润最高的。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-3d-chart/demos/margin.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Bar3DChart,
  type Bar3DDatum,
  type Bar3DSeries,
} from "minerva-design/charts";

// Revenue (bar height) and margin (bar color) of five products in four
// markets: the tallest bars are not the most profitable ones
const PRODUCTS = ["laptops", "phones", "tablets", "watches", "audio"] as const;
const MARKETS = ["americas", "europe", "asia", "oceania"] as const;
const REVENUE = [
  [42, 31, 38, 6],
  [55, 40, 61, 8],
  [18, 14, 22, 3],
  [12, 11, 9, 2],
  [16, 13, 15, 3],
];
const MARGIN = [
  [8, 11, 6, 12],
  [21, 24, 17, 25],
  [14, 16, 9, 18],
  [34, 31, 28, 36],
  [27, 29, 22, 30],
];

export default function MarginDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  const series = useMemo((): Bar3DSeries[] => {
    const data: Bar3DDatum[] = PRODUCTS.flatMap((_, p) =>
      MARKETS.map((_, m) => ({
        x: p,
        y: m,
        z: REVENUE[p]![m]!,
        value: MARGIN[p]![m]!,
      })),
    );
    return [
      {
        name: t("revenue"),
        data,
        colorBy: "value",
        format: (value) => percent.format(value / 100),
      },
    ];
  }, [t, percent]);

  return (
    <Bar3DChart
      series={series}
      colorScale="spectral"
      xAxis={{
        title: t("product"),
        categories: PRODUCTS.map((key) => t(`productNames.${key}`)),
      }}
      yAxis={{
        title: t("market"),
        categories: MARKETS.map((key) => t(`markets.${key}`)),
      }}
      zAxis={{
        title: t("revenue"),
        format: (value) => usd.format(value * 1e6),
      }}
      colorBar={{
        title: t("margin"),
        format: (value) => percent.format(value / 100),
      }}
      camera={{ azimuth: 38, elevation: 24 }}
      height={440}
      ariaLabel={t("marginAria")}
    />
  );
}

```

## Example: 人口金字塔

按年龄组和普查年份，女性在 0 以上、男性在 0 以下（负高度）：随时间重复的人口金字塔。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-3d-chart/demos/pyramid.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Bar3DChart, type Bar3DSeries } from "minerva-design/charts";

// Population (millions) by age group in four census years: women above the
// floor, men below it (negative heights), like a population pyramid laid on
// its side and repeated over time
const YEARS = [1960, 1980, 2000, 2020];
const GROUPS = [0, 10, 20, 30, 40, 50, 60, 70, 80];
const population = (year: number, group: number, women: boolean) => {
  // births shrink over the decades while people live longer
  const birth = 4.2 - (year - 1960) * 0.025;
  const survival = Math.exp(-((group / (62 + (year - 1960) * 0.2)) ** 4));
  const shift = 1 + Math.max(0, 0.6 - Math.abs(year - 1960 - group - 10) / 25);
  const value = birth * survival * shift * (women ? 1 + group / 400 : 1);
  return Math.round(value * 100) / 100;
};

export default function PyramidDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });

  const series = useMemo(
    (): Bar3DSeries[] => [
      {
        name: t("women"),
        color: "var(--chart-series-5, #ec4899)",
        data: YEARS.flatMap((year, y) =>
          GROUPS.map(
            (group, x) => [x, y, population(year, group, true)] as const,
          ),
        ),
      },
      {
        name: t("men"),
        color: "var(--chart-series-1, #3b82f6)",
        data: YEARS.flatMap((year, y) =>
          GROUPS.map(
            (group, x) => [x, y, -population(year, group, false)] as const,
          ),
        ),
      },
    ],
    [t],
  );
  const ages = GROUPS.map((from, i) =>
    i === GROUPS.length - 1
      ? t("ageOver", { from })
      : t("ageGroup", { from, to: from + 9 }),
  );

  return (
    <Bar3DChart
      series={series}
      barWidth={0.8}
      xAxis={{ title: t("age"), categories: ages }}
      yAxis={{ title: t("year"), categories: YEARS.map(String) }}
      zAxis={{
        title: t("population"),
        format: (value) => t("millions", { value: Math.abs(value) }),
      }}
      aspect={[1.2, 0.8, 0.8]}
      camera={{ azimuth: 28, elevation: 14 }}
      height={440}
      ariaLabel={t("pyramidAria")}
    />
  );
}

```

## Example: 各地区月度销售额

五个地区的月度销售额：类别轴名称来自语言包，月份名称来自 Intl.DateTimeFormat，金额以紧凑货币格式显示。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-3d-chart/demos/sales.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Bar3DChart, type Bar3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const REGIONS = ["north", "south", "east", "west", "central"] as const;
// monthly sales in k$: a seasonal curve peaking in December, scaled per region
const SCALE = [1.3, 0.8, 1.1, 0.95, 0.6];
const random = mulberry32(8);
const sales = REGIONS.flatMap((_, r) =>
  Array.from({ length: 12 }, (_, month) => {
    const season = 1 + 0.35 * Math.cos(((month - 11) / 12) * Math.PI * 2);
    return [
      r,
      month,
      Math.round(120 * SCALE[r]! * season * (0.85 + random() * 0.3)),
    ] as const;
  }),
);

export default function SalesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const locale = i18n.language;
  // "Jan", "janv.", "1月", ...
  const months = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, {
      month: "short",
      timeZone: "UTC",
    });
    return Array.from({ length: 12 }, (_, m) =>
      format.format(Date.UTC(2026, m, 1)),
    );
  }, [locale]);
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
    [locale],
  );

  const series = useMemo(
    (): Bar3DSeries[] => [{ name: t("sales"), data: sales }],
    [t],
  );

  return (
    <Bar3DChart
      series={series}
      xAxis={{
        title: t("region"),
        categories: REGIONS.map((key) => t(`regions.${key}`)),
      }}
      yAxis={{ title: t("month"), categories: months }}
      zAxis={{ title: t("sales"), format: (value) => usd.format(value * 1000) }}
      aspect={[0.75, 1.2, 0.6]}
      camera={{ azimuth: 50, elevation: 28 }}
      height={440}
      ariaLabel={t("salesAria")}
    />
  );
}

```

## Example: 堆叠与图例

三条产品线在每个季度 × 市场单元格中堆叠；底部图例可切换系列，堆叠高度随之变化。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-3d-chart/demos/stacked.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Bar3DChart, type Bar3DSeries } from "minerva-design/charts";

// Quarterly revenue (M$) of three product lines in four markets: the bars of
// the same quarter and market are stacked
const QUARTERS = ["q1", "q2", "q3", "q4"] as const;
const MARKETS = ["americas", "europe", "asia", "oceania"] as const;
const REVENUE = {
  hardware: [
    [4.2, 3.1, 3.8, 0.9],
    [4.5, 3.0, 4.1, 1.0],
    [4.1, 2.8, 4.6, 1.1],
    [5.6, 3.9, 5.2, 1.4],
  ],
  software: [
    [2.8, 2.2, 1.6, 0.5],
    [3.1, 2.4, 1.9, 0.6],
    [3.4, 2.5, 2.3, 0.6],
    [3.9, 2.9, 2.6, 0.8],
  ],
  services: [
    [1.2, 1.4, 0.7, 0.3],
    [1.3, 1.5, 0.8, 0.3],
    [1.5, 1.6, 0.9, 0.4],
    [1.7, 1.8, 1.1, 0.4],
  ],
};
type Product = keyof typeof REVENUE;

export default function StackedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
    [locale],
  );

  const series = useMemo(
    (): Bar3DSeries[] =>
      (Object.keys(REVENUE) as Product[]).map((product) => ({
        name: t(`products.${product}`),
        data: REVENUE[product].flatMap((row, q) =>
          row.map((value, m) => [q, m, value] as const),
        ),
      })),
    [t],
  );

  return (
    <Bar3DChart
      series={series}
      barWidth={0.6}
      xAxis={{
        title: t("quarter"),
        categories: QUARTERS.map((q) => t(`quarters.${q}`)),
      }}
      yAxis={{
        title: t("market"),
        categories: MARKETS.map((m) => t(`markets.${m}`)),
      }}
      zAxis={{
        title: t("revenue"),
        format: (value) => usd.format(value * 1e6),
      }}
      legend={{ position: "bottom" }}
      camera={{ azimuth: 40, elevation: 26 }}
      height={440}
      ariaLabel={t("stackedAria")}
    />
  );
}

```

## Example: 按高度着色

网站每周各小时的访问量：colorBy "z" 使用 plasma 色带和色条按高度为 168 根柱体着色。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-3d-chart/demos/traffic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Bar3DChart, type Bar3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Visits per hour of the week on a shop website: a morning bump, an evening
// peak and busier weekends; heights and colors both show the visits
const random = mulberry32(14);
const visits = Array.from({ length: 7 }, (_, day) =>
  Array.from({ length: 24 }, (_, hour) => {
    const weekend = day >= 5 ? 1.35 : 1;
    const morning = Math.exp(-((hour - 10) ** 2) / 8) * 0.6;
    const evening = Math.exp(-((hour - 20) ** 2) / 6);
    const night = hour < 6 ? 0.08 : 0.2;
    return Math.round(
      1000 * weekend * (night + morning + evening) * (0.9 + random() * 0.2),
    );
  }),
).flatMap((hours, day) => hours.map((v, hour) => [hour, day, v] as const));

export default function TrafficDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const locale = i18n.language;
  // localized weekday names (Monday first) and hours
  const { days, hours } = useMemo(() => {
    const weekday = new Intl.DateTimeFormat(locale, {
      weekday: "short",
      timeZone: "UTC",
    });
    const hour = new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      timeZone: "UTC",
    });
    return {
      // 2026-01-05 is a Monday
      days: Array.from({ length: 7 }, (_, d) =>
        weekday.format(Date.UTC(2026, 0, 5 + d)),
      ),
      hours: Array.from({ length: 24 }, (_, h) =>
        hour.format(Date.UTC(2026, 0, 5, h)),
      ),
    };
  }, [locale]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const series = useMemo(
    (): Bar3DSeries[] => [
      { name: t("visits"), data: visits, colorBy: "z", barWidth: 0.82 },
    ],
    [t],
  );

  return (
    <Bar3DChart
      series={series}
      colorScale="plasma"
      xAxis={{ title: t("hour"), categories: hours }}
      yAxis={{ title: t("weekday"), categories: days }}
      zAxis={{ title: t("visits"), format: (value) => number.format(value) }}
      colorBar={{ title: t("visits") }}
      aspect={[1.6, 0.7, 0.45]}
      camera={{ azimuth: 20, elevation: 34 }}
      height={420}
      ariaLabel={t("trafficAria")}
    />
  );
}

```
