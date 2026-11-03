# 3D 散点图

可环绕旋转的 3D 坐标盒中的点云：在 GPU 上绘制数十万到上百万个点，可按系列、按点或通过色阶着色，支持悬停拾取、图例和色条。Line3DChart 用于绘制 3D 轨迹。

Package: minerva-design@1.19.3

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:c2b9c6e66069aa1acd454efc20d52cde92c1a1c820c1b3ab5302d01929cb4c39"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

山鸢尾

变色鸢尾

维吉尼亚鸢尾

萼片长度（cm）

萼片宽度（cm）

花瓣长度（cm）

三种花按萼片长度、萼片宽度和花瓣长度绘制的 3D 散点图

核球与棒

老年星盘

年轻恒星

HII 区

星系晕

{{value}} kpc

由一百万颗恒星组成的棒旋星系：核球、年轻恒星构成的旋臂、HII 区与尘带、星盘和星系晕

曝光

曝光 ×{{value}}

传感器

传感器 {{id}} · 湿度 {{humidity}}%

{{value}} °C

长度（m）

宽度（m）

高度（m）

温度

仓库中 300 个传感器按位置和高度显示的温度

主链 1

主链 2

碱基对

自动旋转

投影

透视

正交

旋转的 DNA 双螺旋

环面纽结

环绕环面纽结的 200,000 个点，按高度着色

后端

自动

WebGPU

WebGL2

WebGL

Canvas2D

正在启动…

当前后端：{{backend}}

此处不支持 {{requested}}：改用 {{backend}} 绘制

轨迹

时间

{{value}} 秒

按时间着色的洛伦兹吸引子轨迹

瑞士卷

卷上的位置

正视

侧视

俯视

复位

方位角 {{azimuth}}°，仰角 {{elevation}}°，缩放 ×{{zoom}}

拖动旋转，Shift + 拖动平移，Ctrl / ⌘ + 滚轮缩放，双击复位。

按卷上位置着色的瑞士卷点云

体育

政治

科技

健康

财经

旅游

{{topic}}文章 #{{n}}

最近邻

主成分 {{n}}（{{variance}}）

新闻文章向量在前三个主成分上的分布，按主题区分

与{{doc}}最接近：{{list}}。

{{doc}}（{{distance}}）

点击一篇文章，查找与它最近的邻居。

激光雷达回波

着色依据

高度

强度

深色主题

包含建筑、树木和停放车辆的街道激光雷达点云

共 {{points}} 个点。悬停在点云上可读取回波。

高度 {{height}}，强度 {{intensity}}。

{{shell}} {{n}}

宽带（低轨）

对地成像（极轨）

导航（中轨）

地球静止轨道

地球

播放

千公里

四个轨道层的卫星环绕地球运行

{{shell}}：高度 {{altitude}}，速度 {{speed}}，每 {{period}}绕行一周。

悬停在卫星上查看其轨道。

科技

医疗

能源

金融

消费

{{ticker}} · {{cap}}

正交视图

波动率

贝塔系数

年化收益

按波动率、贝塔系数和年化收益分布的股票，点的大小表示市值

{{ticker}}（{{sector}}）：收益 {{ret}}，波动率 {{volatility}}，贝塔 {{beta}}，夏普比率 {{sharpe}}，市值 {{cap}}。

点击股票以固定显示其数据。

## Line3DChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
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
    "name": "series",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "array",
    "typeText": "readonly Line3DSeries[]",
    "typeRef": "type:24fd01a47c6879a3eee6",
    "required": true,
    "description": "3D polylines (trajectories)"
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

## Scatter3DChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
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
    "name": "series",
    "source": "packages/charts/src/react/three-d.tsx",
    "kind": "array",
    "typeText": "readonly Scatter3DSeries[]",
    "typeRef": "type:fd4e095d127632147f49",
    "required": true,
    "description": "Point clouds (objects, `[x, y, z]` tuples or typed-array columns)"
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
  "Scatter3DChartProps": {
    "source": "charts/src/react/three-d.tsx",
    "description": "Props of `Scatter3DChart`",
    "kind": "interface",
    "extends": [
      "Chart3DCommonProps"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly Scatter3DSeries[]",
        "required": true,
        "description": "Point clouds (objects, `[x, y, z]` tuples or typed-array columns)"
      }
    ]
  },
  "Line3DChartProps": {
    "source": "charts/src/react/three-d.tsx",
    "description": "Props of `Line3DChart`",
    "kind": "interface",
    "extends": [
      "Chart3DCommonProps"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly Line3DSeries[]",
        "required": true,
        "description": "3D polylines (trajectories)"
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
  "Chart3DHandle": {
    "source": "charts/src/react/three-d.tsx",
    "description": "Imperative handle of the 3D chart components (`ref`)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "resetCamera",
        "type": "() => void",
        "required": true,
        "description": "Restores the camera of the `camera` prop"
      },
      {
        "name": "getCamera",
        "type": "() => Chart3DCameraState | null",
        "required": true,
        "description": "Current camera, `null` before mount"
      },
      {
        "name": "setCamera",
        "type": "(camera: Partial<Chart3DCameraState>) => void",
        "required": true,
        "description": "Moves the camera"
      },
      {
        "name": "getRenderer",
        "type": "() => ChartRendererKind | null",
        "required": true,
        "description": "Backend in use, `null` until ready"
      },
      {
        "name": "getInstance",
        "type": "() => Chart3DInstance | null",
        "required": true,
        "description": "The underlying engine instance (minerva-design/charts/core)"
      }
    ]
  },
  "Scatter3DSeries": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "A cloud of 3D points",
    "kind": "interface",
    "extends": [
      "Chart3DSeriesBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"scatter\"",
        "required": false,
        "default": "\"scatter\"",
        "description": "Set by the chart components; `createChart3D` treats series without a type as scatter series"
      },
      {
        "name": "data",
        "type": "Chart3DPointData",
        "required": true,
        "description": "The points"
      },
      {
        "name": "pointSize",
        "type": "number",
        "required": false,
        "default": "6",
        "description": "Dot diameter in CSS pixels (per-point `size` wins)"
      },
      {
        "name": "opacity",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Opacity of the dots, 0-1"
      },
      {
        "name": "colorBy",
        "type": "Chart3DColorBy",
        "required": false,
        "default": "\"value\" when the data has values, \"series\" otherwise",
        "description": "Source of the dot colors"
      },
      {
        "name": "perspectiveSize",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Scales the dots with their distance (perspective projection only)"
      },
      {
        "name": "pointStyle",
        "type": "Scatter3DPointStyle",
        "required": false,
        "default": "\"sphere\"",
        "description": "Look of the dots: shaded spheres, flat discs or glowing discs"
      },
      {
        "name": "blend",
        "type": "Scatter3DBlend",
        "required": false,
        "default": "\"normal\"",
        "description": "Blending of the dots: `\"additive\"` accumulates light (dark backgrounds)"
      }
    ]
  },
  "Line3DSeries": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "A 3D polyline (trajectory); `NaN` coordinates break the line",
    "kind": "interface",
    "extends": [
      "Chart3DSeriesBase"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"line\"",
        "required": false
      },
      {
        "name": "data",
        "type": "Chart3DPointData",
        "required": true,
        "description": "The vertices, in drawing order"
      },
      {
        "name": "lineWidth",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "Line width in CSS pixels"
      },
      {
        "name": "opacity",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Opacity of the line, 0-1"
      },
      {
        "name": "colorBy",
        "type": "Chart3DColorBy",
        "required": false,
        "default": "\"value\" when the data has values, \"series\" otherwise",
        "description": "Source of the line color (a gradient along the line for `z` / `value`)"
      },
      {
        "name": "pointSize",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Diameter of a dot drawn at every vertex, in CSS pixels (0: no dots)"
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
  "Chart3DPoint": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "One 3D datum written as an object",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "x",
        "type": "number",
        "required": true
      },
      {
        "name": "y",
        "type": "number",
        "required": true
      },
      {
        "name": "z",
        "type": "number",
        "required": true,
        "description": "Height (vertical axis)"
      },
      {
        "name": "size",
        "type": "number",
        "required": false,
        "description": "Diameter of the dot in CSS pixels (scatter)"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color of the dot (any CSS color); wins over the series color and the color scale"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Value mapped to the color scale (`colorBy: \"value\"`)"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Text shown in the tooltip"
      }
    ]
  },
  "Chart3DColumnData": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "Column-oriented 3D data: the fastest form for large data sets (typed arrays are used as is, `NaN` skips a point)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "x",
        "type": "ArrayLike<number>",
        "required": true
      },
      {
        "name": "y",
        "type": "ArrayLike<number>",
        "required": true
      },
      {
        "name": "z",
        "type": "ArrayLike<number>",
        "required": true,
        "description": "Heights (vertical axis)"
      },
      {
        "name": "size",
        "type": "ArrayLike<number>",
        "required": false,
        "description": "Per-point diameters in CSS pixels (scatter)"
      },
      {
        "name": "value",
        "type": "ArrayLike<number>",
        "required": false,
        "description": "Per-point values mapped to the color scale (`colorBy: \"value\"`)"
      },
      {
        "name": "color",
        "type": "ArrayLike<number>",
        "required": false,
        "description": "Per-point colors as `0xRRGGBB` numbers (a `Uint32Array` for large clouds); win over the series color and the color scale"
      },
      {
        "name": "label",
        "type": "readonly string[]",
        "required": false,
        "description": "Per-point texts shown in the tooltip"
      }
    ]
  },
  "Chart3DAxisOptions": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "Options of a 3D axis",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Axis title"
      },
      {
        "name": "min",
        "type": "number",
        "required": false,
        "description": "Lower bound; computed from the data when omitted"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "description": "Upper bound; computed from the data when omitted"
      },
      {
        "name": "categories",
        "type": "readonly string[]",
        "required": false,
        "description": "Category names (x / y axes of bar charts); collected from the data when omitted. Setting them makes the axis a category axis."
      },
      {
        "name": "format",
        "type": "(value: number) => string",
        "required": false,
        "description": "Formats a tick / tooltip value (category axes: the category index)"
      },
      {
        "name": "tickCount",
        "type": "number",
        "required": false,
        "default": "5",
        "description": "Approximate number of ticks"
      },
      {
        "name": "grid",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Draws grid lines at the ticks on the walls of the box"
      },
      {
        "name": "visible",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the tick labels and the title"
      },
      {
        "name": "nice",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Rounds the automatic range to tick values"
      }
    ]
  },
  "Chart3DCameraOptions": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "Camera position around the center of the box",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "azimuth",
        "type": "number",
        "required": false,
        "default": "35",
        "description": "Horizontal angle in degrees, counterclockwise seen from above (0 looks along the y axis)"
      },
      {
        "name": "elevation",
        "type": "number",
        "required": false,
        "default": "24",
        "description": "Height angle in degrees (-89 … 89; positive looks from above)"
      },
      {
        "name": "zoom",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Zoom: 1 fits the box, 2 shows it twice as large"
      },
      {
        "name": "projection",
        "type": "Chart3DProjection",
        "required": false,
        "default": "\"perspective\"",
        "description": "Perspective (vanishing lines) or orthographic (parallel lines)"
      },
      {
        "name": "fov",
        "type": "number",
        "required": false,
        "default": "32",
        "description": "Vertical field of view in degrees (perspective)"
      }
    ]
  },
  "Chart3DCameraState": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "Current camera, reported by `camera` events and `getCamera()`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "azimuth",
        "type": "number",
        "required": true,
        "description": "Horizontal angle in degrees"
      },
      {
        "name": "elevation",
        "type": "number",
        "required": true,
        "description": "Height angle in degrees"
      },
      {
        "name": "zoom",
        "type": "number",
        "required": true,
        "description": "Zoom factor (1 fits the box)"
      },
      {
        "name": "pan",
        "type": "[number, number]",
        "required": true,
        "description": "Shift of the box center in screen space, as fractions of the plot height"
      },
      {
        "name": "projection",
        "type": "Chart3DProjection",
        "required": true
      }
    ]
  },
  "Chart3DInteractionOptions": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "Rotation / zoom / pan options",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "rotate",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Drag (one finger) rotates the camera"
      },
      {
        "name": "zoom",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Wheel and pinch zoom"
      },
      {
        "name": "wheel",
        "type": "\"modifier\" | \"always\"",
        "required": false,
        "default": "\"modifier\"",
        "description": "Wheel zoom: only with Ctrl / ⌘ (and trackpad pinch) or always"
      },
      {
        "name": "pan",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Right-drag, Shift + drag and two-finger drag pan the view"
      },
      {
        "name": "keyboard",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Arrow keys rotate, +/- zoom, 0 resets, Esc clears the highlight"
      }
    ]
  },
  "Chart3DColorBarOptions": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "Color bar of the color scale",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Title above the bar"
      },
      {
        "name": "format",
        "type": "(value: number) => string",
        "required": false,
        "description": "Formats the values of the bar (the z axis format by default)"
      }
    ]
  },
  "Chart3DHoverEvent": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "The point, surface cell or bar under the pointer",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "seriesIndex",
        "type": "number",
        "required": true
      },
      {
        "name": "seriesId",
        "type": "string",
        "required": true
      },
      {
        "name": "seriesName",
        "type": "string",
        "required": true
      },
      {
        "name": "type",
        "type": "Chart3DSeriesType",
        "required": true,
        "description": "Type of the series"
      },
      {
        "name": "index",
        "type": "number",
        "required": true,
        "description": "Index of the point / bar in the series data; surfaces: `row * cols + col`"
      },
      {
        "name": "row",
        "type": "number",
        "required": false,
        "description": "Surfaces: row of the grid vertex"
      },
      {
        "name": "col",
        "type": "number",
        "required": false,
        "description": "Surfaces: column of the grid vertex"
      },
      {
        "name": "x",
        "type": "number",
        "required": true
      },
      {
        "name": "y",
        "type": "number",
        "required": true
      },
      {
        "name": "z",
        "type": "number",
        "required": true
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Color-scale value (`value` of the data)"
      },
      {
        "name": "xCategory",
        "type": "string",
        "required": false,
        "description": "Bars: category names"
      },
      {
        "name": "yCategory",
        "type": "string",
        "required": false
      },
      {
        "name": "color",
        "type": "string",
        "required": true,
        "description": "Resolved color of the point / cell / bar"
      },
      {
        "name": "label",
        "type": "string",
        "required": false
      },
      {
        "name": "clientX",
        "type": "number",
        "required": true,
        "description": "Position of the item in CSS pixels, relative to the chart's container"
      },
      {
        "name": "clientY",
        "type": "number",
        "required": true
      }
    ]
  },
  "Chart3DLabels": {
    "source": "charts/src/engine/three-d/types.ts",
    "description": "Built-in texts of the 3D charts. Templates replace `{name}`-style placeholders.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "chart",
        "type": "string",
        "required": true,
        "default": "\"3D chart\"",
        "description": "Role description and accessible name of an unnamed chart"
      },
      {
        "name": "chartNamed",
        "type": "string",
        "required": true,
        "default": "\"3D chart: {names}\"",
        "description": "Accessible name when series are named; `{names}`"
      },
      {
        "name": "series",
        "type": "string",
        "required": true,
        "default": "\"Series {n}\"",
        "description": "Name of an unnamed series; `{n}` is its 1-based position"
      },
      {
        "name": "seriesCount",
        "type": "string",
        "required": true,
        "default": "\"{count} series.\"",
        "description": "Summary: number of series; `{count}`"
      },
      {
        "name": "seriesSummary",
        "type": "string",
        "required": true,
        "default": "\"{name} ({type}): {size}.\"",
        "description": "Summary of a series; `{name}`, `{type}`, `{size}`"
      },
      {
        "name": "seriesSummaryHidden",
        "type": "string",
        "required": true,
        "default": "\"{name} ({type}): {size}, hidden.\"",
        "description": "Summary of a hidden series; `{name}`, `{type}`, `{size}`"
      },
      {
        "name": "scatter",
        "type": "string",
        "required": true,
        "default": "\"scatter\"",
        "description": "Type name of scatter series"
      },
      {
        "name": "line",
        "type": "string",
        "required": true,
        "default": "\"line\"",
        "description": "Type name of line series"
      },
      {
        "name": "surface",
        "type": "string",
        "required": true,
        "default": "\"surface\"",
        "description": "Type name of surface series"
      },
      {
        "name": "bar",
        "type": "string",
        "required": true,
        "default": "\"bar\"",
        "description": "Type name of bar series"
      },
      {
        "name": "points",
        "type": "string",
        "required": true,
        "default": "\"{count} points\"",
        "description": "Size of a scatter series; `{count}`"
      },
      {
        "name": "vertices",
        "type": "string",
        "required": true,
        "default": "\"{count} vertices\"",
        "description": "Size of a line series; `{count}`"
      },
      {
        "name": "grid",
        "type": "string",
        "required": true,
        "default": "\"{rows} × {cols} grid\"",
        "description": "Size of a surface series; `{rows}`, `{cols}`"
      },
      {
        "name": "bars",
        "type": "string",
        "required": true,
        "default": "\"{count} bars\"",
        "description": "Size of a bar series; `{count}`"
      },
      {
        "name": "axis",
        "type": "string",
        "required": true,
        "default": "\"{axis} axis: {range}.\"",
        "description": "Summary of an axis without title; `{axis}`, `{range}`"
      },
      {
        "name": "axisTitled",
        "type": "string",
        "required": true,
        "default": "\"{axis} axis ({title}): {range}.\"",
        "description": "Summary of an axis with a title; `{axis}`, `{title}`, `{range}`"
      },
      {
        "name": "range",
        "type": "string",
        "required": true,
        "default": "\"{min} to {max}\"",
        "description": "Range of a numeric axis; `{min}`, `{max}`"
      },
      {
        "name": "listSeparator",
        "type": "string",
        "required": true,
        "default": "\", \"",
        "description": "Separator of the lists (series names, categories)"
      },
      {
        "name": "shown",
        "type": "string",
        "required": true,
        "default": "\"{name}: shown\"",
        "description": "Announcement when the legend shows a series; `{name}`"
      },
      {
        "name": "hidden",
        "type": "string",
        "required": true,
        "default": "\"{name}: hidden\"",
        "description": "Announcement when the legend hides a series; `{name}`"
      },
      {
        "name": "value",
        "type": "string",
        "required": true,
        "default": "\"value\"",
        "description": "Tooltip row of the `value` (when the color bar has no title)"
      },
      {
        "name": "x",
        "type": "string",
        "required": true,
        "default": "\"x\"",
        "description": "Tooltip row of x when the axis has no title"
      },
      {
        "name": "y",
        "type": "string",
        "required": true,
        "default": "\"y\"",
        "description": "Tooltip row of y when the axis has no title"
      },
      {
        "name": "z",
        "type": "string",
        "required": true,
        "default": "\"z\"",
        "description": "Tooltip row of z when the axis has no title"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 自动旋转

DNA 双螺旋以 autoRotate 每秒 24° 旋转。指针位于图表上、图表离开屏幕或开启“减少动态效果”时暂停；可在透视和正交投影之间切换。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-3d-chart/demos/auto-rotate.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Switch } from "minerva-design";
import {
  Scatter3DChart,
  type Chart3DProjection,
  type Scatter3DSeries,
} from "minerva-design/charts";

// A DNA double helix: two backbones and the base pairs between them
const TURNS = 4;
const STEPS = 10 * TURNS;
const strandA: [number, number, number][] = [];
const strandB: [number, number, number][] = [];
const pairs: [number, number, number][] = [];
for (let i = 0; i <= STEPS * 6; i++) {
  const t = i / 6;
  const angle = (t / 10) * Math.PI * 2;
  const z = t * 0.34;
  strandA.push([Math.cos(angle), Math.sin(angle), z]);
  strandB.push([Math.cos(angle + 2.4), Math.sin(angle + 2.4), z]);
  if (i % 6 === 0) {
    for (let k = 1; k < 8; k++) {
      const a = angle + (2.4 * k) / 8;
      const r = 1 - 0.25 * Math.sin((Math.PI * k) / 8);
      pairs.push([r * Math.cos(a), r * Math.sin(a), z]);
    }
  }
}

export default function AutoRotateDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [rotate, setRotate] = useState(true);
  const [projection, setProjection] =
    useState<Chart3DProjection>("perspective");

  const series = useMemo(
    (): Scatter3DSeries[] => [
      { name: t("backbone1"), data: strandA, pointSize: 9 },
      { name: t("backbone2"), data: strandB, pointSize: 9 },
      {
        name: t("basePairs"),
        data: pairs,
        pointSize: 5,
        color: "var(--text-secondary-color, #94a3b8)",
      },
    ],
    [t],
  );
  const camera = useMemo(
    () => ({ elevation: 12, zoom: 1.15, projection }),
    [projection],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <Switch
          size="small"
          checked={rotate}
          label={t("autoRotate")}
          onChange={setRotate}
        />
        <RadioGroup
          aria-label={t("projection")}
          direction="horizontal"
          size="small"
          value={projection}
          onChange={(value) => setProjection(value as Chart3DProjection)}
        >
          <Radio value="perspective" label={t("perspective")} />
          <Radio value="orthographic" label={t("orthographic")} />
        </RadioGroup>
      </div>
      <Scatter3DChart
        series={series}
        autoRotate={rotate ? 24 : false}
        aspect={[0.5, 0.5, 1]}
        box={false}
        camera={camera}
        height={420}
        ariaLabel={t("helixAria")}
      />
    </div>
  );
}

```

## Example: 相机控制

预设视角按钮通过图表 ref 调用 setCamera，“复位”调用 resetCamera；每次旋转、缩放或平移后，onCameraChange 报告当前角度。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-3d-chart/demos/camera.tsx

```tsx
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  Scatter3DChart,
  type Chart3DCameraState,
  type Chart3DHandle,
  type Scatter3DSeries,
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

// A "Swiss roll": a sheet rolled up in 3D, colored by its position along
// the roll (the classic test set of manifold learning)
const COUNT = 4000;
const random = mulberry32(21);
const x = new Float64Array(COUNT);
const y = new Float64Array(COUNT);
const z = new Float64Array(COUNT);
const along = new Float64Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  const t = 1.5 * Math.PI * (1 + 2 * random());
  x[i] = t * Math.cos(t);
  y[i] = random() * 21;
  z[i] = t * Math.sin(t);
  along[i] = t;
}

const VIEWS = {
  front: { azimuth: 0, elevation: 0 },
  side: { azimuth: 90, elevation: 0 },
  top: { azimuth: 0, elevation: 89 },
} as const;

export default function CameraDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const chart = useRef<Chart3DHandle>(null);
  const [camera, setCamera] = useState<Chart3DCameraState | null>(null);

  const series = useMemo(
    (): Scatter3DSeries[] => [
      {
        name: t("roll"),
        data: { x, y, z, value: along },
        pointSize: 4,
        format: (value) => value.toFixed(2),
      },
    ],
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {(Object.keys(VIEWS) as (keyof typeof VIEWS)[]).map((view) => (
          <Button
            key={view}
            size="small"
            color="neutral"
            variant="outline"
            onClick={() =>
              chart.current?.setCamera({ ...VIEWS[view], zoom: 1, pan: [0, 0] })
            }
          >
            {t(`views.${view}`)}
          </Button>
        ))}
        <Button
          size="small"
          color="neutral"
          variant="outline"
          onClick={() => chart.current?.resetCamera()}
        >
          {t("views.reset")}
        </Button>
      </div>
      <Scatter3DChart
        ref={chart}
        series={series}
        colorScale="spectral"
        colorBar={{ title: t("position") }}
        aspect={[1, 1, 1]}
        onCameraChange={setCamera}
        height={420}
        ariaLabel={t("rollAria")}
      />
      <p
        aria-live="polite"
        style={{ margin: 0, color: "var(--text-secondary-color)" }}
      >
        {camera
          ? t("cameraState", {
              azimuth: Math.round(camera.azimuth),
              elevation: Math.round(camera.elevation),
              zoom: camera.zoom.toFixed(2),
            })
          : t("cameraHint")}
      </p>
    </div>
  );
}

```

## Example: 聚类

类似鸢尾花数据集的三个品种，每个样本测量三个特征：每类一个系列，可通过图例切换。拖动旋转，Shift + 拖动平移，双击复位。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-3d-chart/demos/clusters.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Three flower species measured on three features (an iris-like data set):
// mean and spread of the sepal length, sepal width and petal length, in cm
const SPECIES = [
  { key: "setosa", mean: [5.0, 3.4, 1.5], spread: [0.35, 0.38, 0.17] },
  { key: "versicolor", mean: [5.9, 2.8, 4.3], spread: [0.52, 0.31, 0.47] },
  { key: "virginica", mean: [6.6, 3.0, 5.6], spread: [0.64, 0.32, 0.55] },
] as const;

const random = mulberry32(11);
// Box-Muller transform: normally distributed samples
const normal = () =>
  Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
const round = (value: number) => Math.round(value * 10) / 10;
const flowers = SPECIES.map(({ mean, spread }) =>
  Array.from(
    { length: 60 },
    () =>
      [
        round(mean[0] + normal() * spread[0]),
        round(mean[1] + normal() * spread[1]),
        round(mean[2] + normal() * spread[2]),
      ] as const,
  ),
);

export default function ClustersDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });

  const series = useMemo(
    (): Scatter3DSeries[] =>
      SPECIES.map(({ key }, i) => ({
        name: t(`species.${key}`),
        data: flowers[i] ?? [],
        pointSize: 8,
      })),
    [t],
  );

  return (
    <Scatter3DChart
      series={series}
      xAxis={{ title: t("sepalLength") }}
      yAxis={{ title: t("sepalWidth") }}
      zAxis={{ title: t("petalLength") }}
      height={420}
      ariaLabel={t("clustersAria")}
    />
  );
}

```

## Example: 按值着色

仓库传感器：颜色表示温度（value 列、colorScale "coolwarm" 和色条），大小表示湿度（size 列）。悬停在传感器上查看读数。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-3d-chart/demos/color-by-value.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 300 sensors in a 40 × 24 × 9 m warehouse: warmer under the roof and
// around a heater; the dot size shows the relative humidity
const COUNT = 300;
const random = mulberry32(5);
const x = new Float64Array(COUNT);
const y = new Float64Array(COUNT);
const z = new Float64Array(COUNT);
const temperature = new Float64Array(COUNT);
const size = new Float64Array(COUNT);
const humidity: number[] = [];
for (let i = 0; i < COUNT; i++) {
  x[i] = Math.round(random() * 400) / 10;
  y[i] = Math.round(random() * 240) / 10;
  z[i] = Math.round((0.5 + random() * 8.5) * 10) / 10;
  const heater = Math.hypot(x[i]! - 30, y[i]! - 6, z[i]! - 1.5);
  temperature[i] =
    Math.round(
      (14 + z[i]! * 0.9 + 9 * Math.exp(-(heater * heater) / 60) + random()) *
        10,
    ) / 10;
  const rh = Math.round(70 - temperature[i]! * 1.2 + random() * 8);
  humidity.push(rh);
  size[i] = 4 + (rh - 35) / 4;
}

export default function ColorByValueDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });

  const series = useMemo((): Scatter3DSeries[] => {
    const label = humidity.map((rh, i) =>
      t("sensorLabel", { id: i + 1, humidity: rh }),
    );
    return [
      {
        name: t("sensors"),
        data: { x, y, z, value: temperature, size, label },
        colorBy: "value",
        format: (value) => t("celsius", { value }),
      },
    ];
  }, [t]);

  return (
    <Scatter3DChart
      series={series}
      aspect={[40, 24, 9]}
      xAxis={{ title: t("lengthM") }}
      yAxis={{ title: t("widthM") }}
      zAxis={{ title: t("heightM") }}
      colorScale="coolwarm"
      colorBar={{
        title: t("temperature"),
        format: (value) => t("celsius", { value }),
      }}
      camera={{ azimuth: 25, elevation: 28 }}
      height={420}
      ariaLabel={t("sensorsAria")}
    />
  );
}

```

## Example: 文档向量

600 篇新闻文章的向量投影到前三个主成分上，每个主题一个系列，坐标轴标题中标出解释方差。点击一篇文章：onPointClick 找出与它最近的五个邻居，作为额外的系列绘制在淡化的点云之上，并在下方列出。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-3d-chart/demos/embeddings.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TOPICS = [
  "sports",
  "politics",
  "technology",
  "health",
  "finance",
  "travel",
] as const;
type Topic = (typeof TOPICS)[number];

// center of each topic in the space of the first three principal components
const CENTERS: Record<Topic, [number, number, number]> = {
  sports: [-3.2, 1.6, 0.4],
  politics: [2.6, 2.4, -0.8],
  technology: [1.4, -2.6, 1.6],
  health: [-1.8, -1.8, -1.4],
  finance: [3.4, -0.4, 0.2],
  travel: [-2.4, 2.8, -2.2],
};
// share of the variance explained by each component
const VARIANCE = [0.41, 0.23, 0.12];
const PER_TOPIC = 100;

interface Doc {
  topic: Topic;
  n: number;
  x: number;
  y: number;
  z: number;
}

// 600 article embeddings projected on 3 components, 100 per topic
const DOCS: Doc[] = (() => {
  const random = mulberry32(17);
  const gauss = () =>
    Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
  return TOPICS.flatMap((topic) =>
    Array.from({ length: PER_TOPIC }, (_, n) => {
      const [cx, cy, cz] = CENTERS[topic];
      return {
        topic,
        n: n + 1,
        x: cx + gauss() * 0.75,
        y: cy + gauss() * 0.6,
        z: cz + gauss() * 0.5,
      };
    }),
  );
})();

/** The k documents closest to `doc` (Euclidean distance) */
const nearest = (doc: Doc, k: number) =>
  DOCS.filter((other) => other !== doc)
    .map((other) => ({
      doc: other,
      distance: Math.hypot(other.x - doc.x, other.y - doc.y, other.z - doc.z),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, k);

export default function EmbeddingsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [picked, setPicked] = useState<Doc | null>(null);
  const neighbours = useMemo(
    () => (picked ? nearest(picked, 5) : []),
    [picked],
  );
  const decimal = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [i18n.language],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(i18n.language, { style: "percent" }),
    [i18n.language],
  );
  const title = (doc: Doc) =>
    t("docLabel", { topic: t(`topics.${doc.topic}`), n: doc.n });

  const topicData = useMemo(
    () =>
      TOPICS.map((topic) =>
        DOCS.filter((doc) => doc.topic === topic).map((doc) => ({
          x: doc.x,
          y: doc.y,
          z: doc.z,
          label: t("docLabel", { topic: t(`topics.${topic}`), n: doc.n }),
        })),
      ),
    [t],
  );

  const series = useMemo((): Scatter3DSeries[] => {
    const topics = TOPICS.map((topic, i): Scatter3DSeries => ({
      id: topic,
      name: t(`topics.${topic}`),
      data: topicData[i]!,
      pointSize: 5,
      opacity: picked ? 0.35 : 0.9,
    }));
    if (!picked) return topics;
    // the picked article and its neighbours, drawn on top in a larger size
    return [
      ...topics,
      {
        id: "neighbours",
        name: t("neighbours"),
        color: "var(--danger-color, #dc2626)",
        pointSize: 10,
        data: [picked, ...neighbours.map((item) => item.doc)].map((doc) => ({
          x: doc.x,
          y: doc.y,
          z: doc.z,
          label: t("docLabel", { topic: t(`topics.${doc.topic}`), n: doc.n }),
        })),
      },
    ];
  }, [t, topicData, picked, neighbours]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Scatter3DChart
        series={series}
        xAxis={{
          title: t("component", {
            n: 1,
            variance: percent.format(VARIANCE[0]),
          }),
        }}
        yAxis={{
          title: t("component", {
            n: 2,
            variance: percent.format(VARIANCE[1]),
          }),
        }}
        zAxis={{
          title: t("component", {
            n: 3,
            variance: percent.format(VARIANCE[2]),
          }),
        }}
        aspect={[1, 1, 0.7]}
        camera={{ azimuth: 30, elevation: 22 }}
        height={460}
        ariaLabel={t("embeddingsAria")}
        onPointClick={(event) => {
          if (event.seriesId === "neighbours") {
            if (event.index === 0) return setPicked(null);
            return setPicked(neighbours[event.index - 1]!.doc);
          }
          const topic = event.seriesId as Topic;
          setPicked(DOCS[TOPICS.indexOf(topic) * PER_TOPIC + event.index]!);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {picked
          ? t("neighboursOf", {
              doc: title(picked),
              list: new Intl.ListFormat(i18n.language).format(
                neighbours.map((item) =>
                  t("neighbourItem", {
                    doc: title(item.doc),
                    distance: decimal.format(item.distance),
                  }),
                ),
              ),
            })
          : t("embeddingsHint")}
      </output>
    </div>
  );
}

```

## Example: 1,000,000 颗恒星

用带种子的随机数生成器生成的一百万颗恒星的棒旋星系：暖色核球、由年轻蓝色恒星和粉色 HII 区构成的对数旋臂、旋臂内侧的暗尘带、薄星盘和暗淡的星系晕。每颗恒星通过 0xRRGGBB 颜色列获得黑体颜色；pointStyle "glow" 与 blend "additive" 让密集区域发光，exposure 调节这些光的亮度，并经过色调映射，使核心饱和而不发白。图例可切换各个星族。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-3d-chart/demos/galaxy.tsx

```tsx
import { useMemo, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Color of a black body at `kelvin` (0-255 channels, Tanner Helland's fit) */
function blackbody(kelvin: number): [number, number, number] {
  const t = kelvin / 100;
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = t <= 66 ? 255 : 329.698727446 * Math.pow(t - 60, -0.1332047592);
  const g =
    t <= 66
      ? 99.4708025861 * Math.log(t) - 161.1195681661
      : 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  const b =
    t >= 66
      ? 255
      : t <= 19
        ? 0
        : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  return [clamp(r), clamp(g), clamp(b)];
}

/** `0xRRGGBB` of a color scaled by a brightness (additive light) */
function rgb([r, g, b]: [number, number, number], brightness: number) {
  const k = Math.max(0, Math.min(1, brightness));
  return (
    (Math.round(r * k) << 16) | (Math.round(g * k) << 8) | Math.round(b * k)
  );
}

interface Population {
  x: Float32Array;
  y: Float32Array;
  z: Float32Array;
  size: Float32Array;
  color: Uint32Array;
}

const population = (count: number): Population => ({
  x: new Float32Array(count),
  y: new Float32Array(count),
  z: new Float32Array(count),
  size: new Float32Array(count),
  color: new Uint32Array(count),
});

/** Two logarithmic arms (kpc): pitch angle and radius where they start */
const PITCH = (16 * Math.PI) / 180;
const WIND = 1 / Math.tan(PITCH);
const ARM_START = 2.2;
/** Angle of arm `k` (0 or 1) at radius `r` */
const armAngle = (k: number, r: number) =>
  k * Math.PI + Math.log(r / ARM_START) * WIND;
/**
 * Signed distance (kpc) to the nearest arm across it; positive on the
 * inner (concave) side, where the dust lanes lie
 */
const armOffset = (r: number, angle: number) => {
  let d = (angle - armAngle(0, r)) % Math.PI;
  if (d > Math.PI / 2) d -= Math.PI;
  if (d < -Math.PI / 2) d += Math.PI;
  return d * r * Math.sin(PITCH);
};

/**
 * A barred spiral galaxy of 1,000,000 stars (deterministic): a warm bulge,
 * an old disk, young blue stars and pink HII regions along two logarithmic
 * arms, dust lanes on the inner edge of the arms, and a faint halo.
 */
function galaxy() {
  const random = mulberry32(7);
  const normal = () =>
    Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
  // two-sided exponential (thin disk heights)
  const laplace = (h: number) =>
    (random() < 0.5 ? -h : h) * Math.log(1 - random());
  const between = (a: number, b: number) => a + (b - a) * random();
  /** Draws until `accept` takes the value (rejection sampling) */
  const sample = (draw: () => number, accept: (value: number) => boolean) => {
    for (;;) {
      const value = draw();
      if (accept(value)) return value;
    }
  };
  /** Dust absorption (0-1) at a radius, offset to the arm and height */
  const dust = (r: number, offset: number, z: number) =>
    r < 1.6
      ? 0
      : Math.exp(-(((offset - 0.2) / 0.14) ** 2)) *
        Math.exp(-Math.abs(z) / 0.2) *
        Math.min(1, (r - 1.6) / 1.5) *
        0.95;
  const place = (
    p: Population,
    i: number,
    x: number,
    y: number,
    z: number,
    size: number,
    kelvin: number,
    brightness: number,
  ) => {
    p.x[i] = x;
    p.y[i] = y;
    p.z[i] = z;
    p.size[i] = size;
    p.color[i] = rgb(blackbody(kelvin), brightness);
  };
  /** A disk star: dimmed and reddened inside a dust lane */
  const diskStar = (
    p: Population,
    i: number,
    r: number,
    angle: number,
    z: number,
    size: number,
    kelvin: number,
    brightness: number,
  ) => {
    const a = dust(r, armOffset(r, angle), z);
    place(
      p,
      i,
      r * Math.cos(angle),
      r * Math.sin(angle),
      z,
      size,
      kelvin * (1 - 0.5 * a),
      brightness * (1 - a),
    );
  };

  // bulge and bar: old K / G stars
  const bulge = population(160_000);
  const bar = (25 * Math.PI) / 180;
  for (let i = 0; i < 160_000; i++) {
    const r = -0.42 * Math.log(random() * random());
    const u = 2 * random() - 1;
    const phi = 2 * Math.PI * random();
    const s = Math.sqrt(1 - u * u);
    let x = r * s * Math.cos(phi);
    let y = r * s * Math.sin(phi);
    if (i % 2 === 0) {
      // the bar: stretched along its axis
      x *= 2.1;
      y *= 0.75;
    }
    place(
      bulge,
      i,
      x * Math.cos(bar) - y * Math.sin(bar),
      x * Math.sin(bar) + y * Math.cos(bar),
      r * u * 0.55,
      1.1,
      between(3000, 4600),
      between(0.4, 0.85),
    );
  }

  // old disk: exponential, slightly crowded on the arms
  const disk = population(480_000);
  for (let i = 0; i < 480_000; i++) {
    const r = sample(
      () => -3 * Math.log(random() * random()),
      (v) => v >= 0.6 && v <= 16,
    );
    const angle = sample(
      () => 2 * Math.PI * random(),
      (a) => random() <= 0.5 + 0.5 * Math.exp(-((armOffset(r, a) / 0.7) ** 2)),
    );
    const z = laplace(0.18 + r * 0.012);
    const giant = random() < 0.01;
    diskStar(
      disk,
      i,
      r,
      angle,
      z,
      giant ? 2 : 1,
      giant ? between(3200, 4200) : between(3800, 6500),
      giant ? 0.9 : between(0.3, 0.7),
    );
  }

  // young stars along the arms: blue-white, a very thin disk, mostly in
  // associations (knots) strung along the arms
  const young = population(260_000);
  let knot = { x: 0, y: 0, spread: 0, left: 0 };
  for (let i = 0; i < 260_000; i++) {
    let r = ARM_START + 0.8 + 12.5 * random() ** 0.8;
    let angle: number;
    if (i % 20 < 9) {
      if (knot.left <= 0) {
        const across = normal() * (0.3 + 0.025 * r);
        const center =
          armAngle(i % 2, r) + across / (r * Math.sin(PITCH)) + normal() * 0.04;
        knot = {
          x: r * Math.cos(center),
          y: r * Math.sin(center),
          spread: between(0.12, 0.45),
          left: 20 + Math.floor(random() * 120),
        };
      }
      knot.left--;
      const kx = knot.x + normal() * knot.spread;
      const ky = knot.y + normal() * knot.spread;
      r = Math.hypot(kx, ky);
      angle = Math.atan2(ky, kx);
    } else {
      const across = normal() * (0.4 + 0.03 * r);
      angle =
        armAngle(i % 2, r) + across / (r * Math.sin(PITCH)) + normal() * 0.03;
    }
    const bright = random() < 0.04;
    diskStar(
      young,
      i,
      r,
      angle,
      laplace(0.06),
      bright ? 2.4 : 1.2,
      9000 + 21000 * random() ** 1.5,
      bright ? 1 : between(0.4, 0.8),
    );
  }

  // HII regions: pink clumps just outside the dust lanes
  const nebulae = population(40_000);
  const pink: [number, number, number] = [255, 70, 150];
  const rose: [number, number, number] = [255, 130, 190];
  for (let c = 0; c < 500; c++) {
    const r = 3.2 + 10.5 * random() ** 0.85;
    const across = -0.1 + normal() * 0.35;
    const center = armAngle(c % 2, r) + across / (r * Math.sin(PITCH));
    const cx = r * Math.cos(center);
    const cy = r * Math.sin(center);
    const spread = between(0.04, 0.12);
    for (let k = 0; k < 80; k++) {
      const i = c * 80 + k;
      const mix = random();
      nebulae.x[i] = cx + normal() * spread;
      nebulae.y[i] = cy + normal() * spread;
      nebulae.z[i] = normal() * spread * 0.4;
      nebulae.size[i] = 1.8;
      nebulae.color[i] = rgb(
        [
          pink[0] + (rose[0] - pink[0]) * mix,
          pink[1] + (rose[1] - pink[1]) * mix,
          pink[2] + (rose[2] - pink[2]) * mix,
        ],
        between(0.5, 1),
      );
    }
  }

  // halo: a faint sphere of old stars
  const halo = population(60_000);
  for (let i = 0; i < 60_000; i++) {
    const r = sample(
      () => -4.5 * Math.log(random() * random()),
      (v) => v <= 22,
    );
    const u = 2 * random() - 1;
    const phi = 2 * Math.PI * random();
    const s = Math.sqrt(1 - u * u);
    place(
      halo,
      i,
      r * s * Math.cos(phi),
      r * s * Math.sin(phi),
      r * u * 0.8,
      1.1,
      between(3800, 5600),
      between(0.2, 0.45),
    );
  }

  return { bulge, disk, young, nebulae, halo };
}

/** Night-sky colors of the chart (its theme reads these variables) */
const SPACE = {
  background: "radial-gradient(ellipse at 50% 45%, #0e1430 0%, #05070f 70%)",
  borderRadius: 12,
  "--surface-color": "#05070f",
  "--surface-elevated-color": "#111729",
  "--text-color": "#e6e9f2",
  "--text-secondary-color": "#9aa3b8",
  "--border-color": "#2a3247",
} as CSSProperties;

/** Exposures offered (the light of the additive stars, tone mapped) */
const EXPOSURES = [0.5, 1, 2, 4] as const;

export default function GalaxyDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [exposure, setExposure] = useState(1);
  // ~150 ms: generated once, when the demo mounts
  const stars = useMemo(() => galaxy(), []);
  const series = useMemo((): Scatter3DSeries[] => {
    const common = {
      pointStyle: "glow",
      blend: "additive",
    } as const;
    return [
      {
        ...common,
        name: t("galaxy.bulge"),
        color: "#ffc477",
        data: stars.bulge,
        opacity: 0.11,
      },
      {
        ...common,
        name: t("galaxy.disk"),
        color: "#ffe2b8",
        data: stars.disk,
        opacity: 0.08,
      },
      {
        ...common,
        name: t("galaxy.arms"),
        color: "#9cc4ff",
        data: stars.young,
        opacity: 0.1,
      },
      {
        ...common,
        name: t("galaxy.nebulae"),
        color: "#ff6aa9",
        data: stars.nebulae,
        opacity: 0.14,
      },
      {
        ...common,
        name: t("galaxy.halo"),
        color: "#c9a77f",
        data: stars.halo,
        opacity: 0.5,
      },
    ];
  }, [t, stars]);

  const kpc = (value: number) => t("kiloparsecs", { value: value.toFixed(1) });
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("exposure")}
        direction="horizontal"
        size="small"
        value={String(exposure)}
        onChange={(value) => setExposure(Number(value))}
      >
        {EXPOSURES.map((value) => (
          <Radio
            key={value}
            value={String(value)}
            label={t("exposureValue", { value })}
          />
        ))}
      </RadioGroup>
      <Scatter3DChart
        series={series}
        box={false}
        aspect={[1, 1, 0.35]}
        xAxis={{ min: -16, max: 16, format: kpc }}
        yAxis={{ min: -16, max: 16, format: kpc }}
        zAxis={{ min: -5.6, max: 5.6, format: kpc }}
        camera={{ azimuth: 20, elevation: 34, zoom: 1.75, fov: 28 }}
        autoRotate={4}
        exposure={exposure}
        height={500}
        style={SPACE}
        ariaLabel={t("galaxyAria")}
      />
    </div>
  );
}

```

## Example: 激光雷达街景扫描

一条街道约 13,000 个激光雷达回波点，以类型化数组列的形式传入，绘制为平面圆点（pointStyle: "disc"）。单选按钮把 value 列映射为高度或回波强度，并使用不同的 colorScale；开关在深色 ConfigProvider 中重新挂载图表，onHover 读取指针下的点。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-3d-chart/demos/lidar.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ConfigProvider,
  HStack,
  Radio,
  RadioGroup,
  Switch,
} from "minerva-design";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type ColorMode = "height" | "intensity";

// A 60 m street scanned by a lidar: road with lane markings, sidewalks,
// facades with windows, trees, parked cars and lamp posts (~13k returns).
// Intensity is the strength of the return: markings and metal reflect most.
const scan = () => {
  const random = mulberry32(42);
  const xs: number[] = [];
  const ys: number[] = [];
  const zs: number[] = [];
  const intensity: number[] = [];
  const add = (x: number, y: number, z: number, i: number) => {
    xs.push(x);
    ys.push(y);
    zs.push(z + (random() - 0.5) * 0.04);
    intensity.push(Math.min(1, Math.max(0, i + (random() - 0.5) * 0.1)));
  };
  // ground: road, lane markings and raised sidewalks
  for (let n = 0; n < 5200; n++) {
    const x = random() * 60;
    const y = -7 + random() * 14;
    const sidewalk = Math.abs(y) > 4;
    const marking = Math.abs(y) < 0.12 && x % 6 < 3;
    add(x, y, sidewalk ? 0.15 : 0, marking ? 0.9 : sidewalk ? 0.35 : 0.15);
  }
  // facades on both sides, glass windows return little light
  for (let n = 0; n < 4200; n++) {
    const x = random() * 60;
    const z = random() * 12;
    const side = n % 2 ? 1 : -1;
    const window = x % 4 > 1 && x % 4 < 3 && z % 3.5 > 1 && z % 3.5 < 2.6;
    add(x, side * (8 + random() * 0.08), z, window ? 0.08 : 0.45);
  }
  // trees: trunk and a round canopy
  for (let tree = 0; tree < 6; tree++) {
    const cx = 6 + (tree % 3) * 20 + (tree > 2 ? 10 : 0);
    const cy = tree > 2 ? 5.5 : -5.5;
    for (let n = 0; n < 60; n++) {
      const a = random() * Math.PI * 2;
      add(cx + Math.cos(a) * 0.2, cy + Math.sin(a) * 0.2, random() * 2.6, 0.4);
    }
    for (let n = 0; n < 320; n++) {
      const a = random() * Math.PI * 2;
      const b = Math.acos(2 * random() - 1);
      const r = 1.6 + random() * 0.6;
      add(
        cx + r * Math.sin(b) * Math.cos(a),
        cy + r * Math.sin(b) * Math.sin(a),
        4 + r * 0.8 * Math.cos(b),
        0.55,
      );
    }
  }
  // parked cars: the visible top and sides of a box
  for (let car = 0; car < 5; car++) {
    const cx = 4 + car * 12 + (car % 2) * 3;
    const cy = car % 2 ? 3 : -3;
    for (let n = 0; n < 300; n++) {
      const u = random();
      const v = random();
      const face = n % 3;
      const x = cx + (u - 0.5) * 4.4;
      const y = face === 1 ? cy + (car % 2 ? -0.9 : 0.9) : cy + (v - 0.5) * 1.8;
      const z = face === 0 ? 1.45 : 0.3 + v * 1.1;
      add(x, y, z, 0.7);
    }
  }
  // lamp posts
  for (let post = 0; post < 4; post++) {
    for (let n = 0; n < 80; n++) {
      add(10 + post * 14, post % 2 ? 6.5 : -6.5, random() * 7, 0.8);
    }
  }
  return {
    x: Float32Array.from(xs),
    y: Float32Array.from(ys),
    z: Float32Array.from(zs),
    intensity: Float32Array.from(intensity),
  };
};
const CLOUD = scan();

export default function LidarDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [dark, setDark] = useState(true);
  const [mode, setMode] = useState<ColorMode>("height");
  const [hovered, setHovered] = useState<number | null>(null);
  const formats = useMemo(
    () => ({
      meters: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "meter",
        maximumFractionDigits: 2,
      }),
      percent: new Intl.NumberFormat(i18n.language, { style: "percent" }),
      integer: new Intl.NumberFormat(i18n.language),
    }),
    [i18n.language],
  );

  const series = useMemo(
    (): Scatter3DSeries[] => [
      {
        name: t("lidarReturns"),
        data: {
          x: CLOUD.x,
          y: CLOUD.y,
          z: CLOUD.z,
          value: mode === "height" ? CLOUD.z : CLOUD.intensity,
        },
        colorBy: "value",
        pointStyle: "disc",
        pointSize: 2.5,
      },
    ],
    [t, mode],
  );

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
          <RadioGroup
            aria-label={t("lidarColor")}
            direction="horizontal"
            value={mode}
            onChange={(value) => setMode(value as ColorMode)}
          >
            <Radio value="height" label={t("lidarModes.height")} />
            <Radio value="intensity" label={t("lidarModes.intensity")} />
          </RadioGroup>
          <Switch
            size="small"
            checked={dark}
            onChange={setDark}
            label={t("darkTheme")}
          />
        </HStack>
        <Scatter3DChart
          // the chart reads the theme of its scope when it is created
          key={dark ? "dark" : "light"}
          series={series}
          aspect={[60, 16, 12]}
          xAxis={{ title: t("lengthM") }}
          yAxis={{ title: t("widthM") }}
          zAxis={{ title: t("heightM") }}
          colorScale={mode === "height" ? "turbo" : "inferno"}
          colorBar={{
            title: t(`lidarModes.${mode}`),
            format: (value) =>
              mode === "height"
                ? formats.meters.format(value)
                : formats.percent.format(value),
          }}
          tooltip={false}
          camera={{ azimuth: -30, elevation: 30, zoom: 1.1 }}
          height={440}
          ariaLabel={t("lidarAria")}
          onHover={(event) => setHovered(event ? event.index : null)}
        />
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)" }}
        >
          {hovered === null
            ? t("lidarSummary", {
                points: formats.integer.format(CLOUD.x.length),
              })
            : t("lidarHover", {
                height: formats.meters.format(CLOUD.z[hovered]!),
                intensity: formats.percent.format(CLOUD.intensity[hovered]!),
              })}
        </output>
      </div>
    </ConfigProvider>
  );
}

```

## Example: 投资组合风险

四十只股票按波动率、贝塔系数和年化收益分布，每个行业一个系列，点的大小随市值变化。坐标轴用 Intl.NumberFormat 格式化百分比，点击可在下方固定显示股票及其夏普比率，开关将 camera.projection 切换为正交投影，便于无畸变地比较。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-3d-chart/demos/portfolio-risk.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Sector =
  "technology" | "healthcare" | "energy" | "financials" | "consumer";

// fictional tickers, with the typical volatility, beta and return of the sector
const SECTORS: [Sector, string[], number, number, number][] = [
  [
    "technology",
    ["NOVA", "QBIT", "LUMN", "SYNK", "DATA", "CHIP", "CLDX", "ORBI"],
    0.34,
    1.3,
    0.16,
  ],
  [
    "healthcare",
    ["GENE", "MEDX", "CURA", "VITL", "BIOM", "PULS", "THRX", "NEUR"],
    0.26,
    0.8,
    0.09,
  ],
  [
    "energy",
    ["PETR", "SOLR", "WNDY", "GRID", "FUEL", "HYDR", "VOLT", "CRUD"],
    0.31,
    1.0,
    0.07,
  ],
  [
    "financials",
    ["BANK", "LEND", "PAYX", "INSR", "FUND", "COIN", "TRST", "BRKR"],
    0.24,
    1.1,
    0.1,
  ],
  [
    "consumer",
    ["SHOP", "MEAL", "WEAR", "HOME", "PETS", "TOYS", "BREW", "TRVL"],
    0.21,
    0.9,
    0.08,
  ],
];
const RISK_FREE = 0.035;

interface Stock {
  ticker: string;
  sector: Sector;
  volatility: number;
  beta: number;
  ret: number;
  cap: number; // market capitalization, USD
}

const STOCKS: Stock[] = (() => {
  const random = mulberry32(2024);
  return SECTORS.flatMap(([sector, tickers, vol, beta, ret]) =>
    tickers.map((ticker) => {
      const volatility = vol * (0.7 + random() * 0.6);
      return {
        ticker,
        sector,
        volatility,
        beta: Math.round(beta * (0.7 + random() * 0.6) * 100) / 100,
        // riskier names of a sector earn a little more on average
        ret: ret + (volatility - vol) * 0.4 + (random() - 0.5) * 0.08,
        cap: 10 ** (9.5 + random() * 2.7),
      };
    }),
  );
})();

export default function PortfolioRiskDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [pinned, setPinned] = useState<string | null>("NOVA");
  const [orthographic, setOrthographic] = useState(false);
  const formats = useMemo(
    () => ({
      percent: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
      cap: new Intl.NumberFormat(i18n.language, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
      decimal: new Intl.NumberFormat(i18n.language, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    }),
    [i18n.language],
  );

  const series = useMemo(
    (): Scatter3DSeries[] =>
      SECTORS.map(([sector]) => ({
        id: sector,
        name: t(`sectors.${sector}`),
        data: STOCKS.filter((stock) => stock.sector === sector).map(
          (stock) => ({
            x: stock.volatility,
            y: stock.beta,
            z: stock.ret,
            // dot size follows the market capitalization (log scale)
            size:
              (5 + Math.log10(stock.cap / 1e9) * 5) *
              (stock.ticker === pinned ? 1.6 : 1),
            label: t("stockLabel", {
              ticker: stock.ticker,
              cap: formats.cap.format(stock.cap),
            }),
          }),
        ),
        opacity: 0.85,
      })),
    [t, formats, pinned],
  );

  const stock = STOCKS.find((item) => item.ticker === pinned);
  const percentAxis = (title: string) => ({
    title,
    format: (value: number) => formats.percent.format(value),
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        size="small"
        checked={orthographic}
        label={t("orthographicView")}
        onChange={setOrthographic}
      />
      <Scatter3DChart
        series={series}
        xAxis={percentAxis(t("annualVolatility"))}
        yAxis={{ title: t("beta") }}
        zAxis={percentAxis(t("annualReturn"))}
        camera={{
          azimuth: 28,
          elevation: 20,
          projection: orthographic ? "orthographic" : "perspective",
        }}
        height={460}
        ariaLabel={t("portfolioAria")}
        onPointClick={(event) => {
          const sector = SECTORS.findIndex(([id]) => id === event.seriesId);
          const ticker = SECTORS[sector]?.[1][event.index];
          setPinned(ticker === pinned ? null : (ticker ?? null));
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {stock
          ? t("stockReadout", {
              ticker: stock.ticker,
              sector: t(`sectors.${stock.sector}`),
              ret: formats.percent.format(stock.ret),
              volatility: formats.percent.format(stock.volatility),
              beta: formats.decimal.format(stock.beta),
              sharpe: formats.decimal.format(
                (stock.ret - RISK_FREE) / stock.volatility,
              ),
              cap: formats.cap.format(stock.cap),
            })
          : t("portfolioHint")}
      </output>
    </div>
  );
}

```

## Example: 渲染后端

选择数据层的后端：auto 依次尝试 WebGPU、WebGL2、WebGL 和 Canvas2D（CPU 投影并抽稀），并跳过软件模拟的 GPU；onRendererChange 报告实际使用的后端。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-3d-chart/demos/renderer.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  Scatter3DChart,
  type ChartRendererKind,
  type ChartRendererPreference,
  type Scatter3DSeries,
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

const PREFERENCES: ChartRendererPreference[] = [
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

// 200,000 points scattered around a (3, 7) torus knot
const COUNT = 200_000;
const random = mulberry32(9);
const x = new Float32Array(COUNT);
const y = new Float32Array(COUNT);
const z = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  const t = random() * Math.PI * 2;
  const r = 2 + Math.cos(7 * t);
  const spread = 0.18 * Math.sqrt(-2 * Math.log(1 - random()));
  const a = random() * Math.PI * 2;
  x[i] = r * Math.cos(3 * t) + spread * Math.cos(a);
  y[i] = r * Math.sin(3 * t) + spread * Math.sin(a);
  z[i] = Math.sin(7 * t) + spread * Math.cos(a + 1);
}

export default function RendererDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [preference, setPreference] = useState<ChartRendererPreference>("auto");
  const [actual, setActual] = useState<ChartRendererKind | null>(null);

  const series = useMemo(
    (): Scatter3DSeries[] => [
      { name: t("knot"), data: { x, y, z }, colorBy: "z", pointSize: 2 },
    ],
    [t],
  );

  let status = t("starting");
  if (actual) {
    const backend = t(`renderers.${actual}`);
    status =
      preference === "auto" || preference === actual
        ? t("rendererInUse", { backend })
        : t("rendererFallback", {
            requested: t(`renderers.${preference}`),
            backend,
          });
  }

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("renderer")}
        direction="horizontal"
        size="small"
        value={preference}
        onChange={(value) => {
          setPreference(value as ChartRendererPreference);
          setActual(null);
        }}
      >
        {PREFERENCES.map((kind) => (
          <Radio key={kind} value={kind} label={t(`renderers.${kind}`)} />
        ))}
      </RadioGroup>
      <Scatter3DChart
        series={series}
        renderer={preference}
        onRendererChange={setActual}
        colorScale="turbo"
        aspect={[1, 1, 0.45]}
        height={400}
        ariaLabel={t("knotAria")}
      />
      <p
        role="status"
        style={{ margin: 0, color: "var(--text-secondary-color)" }}
      >
        {status}
      </p>
    </div>
  );
}

```

## Example: 卫星星座

环绕地球的四个轨道层，从低轨宽带星座到地球静止轨道环，每 100 毫秒由 setInterval 更新一次位置，并在卸载时清理（每一步代表模拟的一分钟）。每个轨道层是一个系列，有各自的图例项；悬停卫星可查看其轨道的高度、速度和周期。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-3d-chart/demos/satellites.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Switch } from "minerva-design";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

const EARTH_RADIUS = 6371; // km
const MU = 398600; // km³/s², gravitational parameter of the Earth
const STEP_SECONDS = 60; // simulated time per tick
const EPOCH = Date.UTC(2026, 9, 31);

interface Shell {
  id: "broadband" | "imaging" | "navigation" | "geostationary";
  altitude: number; // km
  inclination: number; // degrees
  planes: number;
  perPlane: number;
}

const SHELLS: Shell[] = [
  {
    id: "broadband",
    altitude: 550,
    inclination: 53,
    planes: 6,
    perPlane: 12,
  },
  { id: "imaging", altitude: 700, inclination: 97.6, planes: 4, perPlane: 8 },
  {
    id: "navigation",
    altitude: 20200,
    inclination: 55,
    planes: 6,
    perPlane: 4,
  },
  {
    id: "geostationary",
    altitude: 35786,
    inclination: 0,
    planes: 1,
    perPlane: 12,
  },
];

const radiusOf = (shell: Shell) => EARTH_RADIUS + shell.altitude;
const motionOf = (shell: Shell) => Math.sqrt(MU / radiusOf(shell) ** 3); // rad/s

/** Positions (thousands of km) of the satellites of a shell at time `seconds` */
const positions = (shell: Shell, seconds: number) => {
  const count = shell.planes * shell.perPlane;
  const x = new Float32Array(count);
  const y = new Float32Array(count);
  const z = new Float32Array(count);
  const r = radiusOf(shell) / 1000;
  const inc = (shell.inclination * Math.PI) / 180;
  for (let p = 0; p < shell.planes; p++) {
    const node = (2 * Math.PI * p) / shell.planes; // right ascension of the plane
    for (let s = 0; s < shell.perPlane; s++) {
      // neighboring planes are phased so the satellites do not line up
      const u =
        (2 * Math.PI * (s + p / shell.planes)) / shell.perPlane +
        motionOf(shell) * seconds;
      const i = p * shell.perPlane + s;
      x[i] =
        r *
        (Math.cos(node) * Math.cos(u) -
          Math.sin(node) * Math.sin(u) * Math.cos(inc));
      y[i] =
        r *
        (Math.sin(node) * Math.cos(u) +
          Math.cos(node) * Math.sin(u) * Math.cos(inc));
      z[i] = r * Math.sin(u) * Math.sin(inc);
    }
  }
  return { x, y, z };
};

// the Earth: 500 points spread evenly on a sphere (Fibonacci lattice)
const EARTH = (() => {
  const count = 500;
  const r = EARTH_RADIUS / 1000;
  const x = new Float32Array(count);
  const y = new Float32Array(count);
  const z = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const h = 1 - (2 * (i + 0.5)) / count;
    const a = i * Math.PI * (3 - Math.sqrt(5));
    const ring = Math.sqrt(1 - h * h);
    x[i] = r * ring * Math.cos(a);
    y[i] = r * ring * Math.sin(a);
    z[i] = r * h;
  }
  return { x, y, z };
})();

const LIMIT = 44; // thousands of km

export default function SatellitesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [playing, setPlaying] = useState(true);
  const [tick, setTick] = useState(0);
  const [hovered, setHovered] = useState<Shell | null>(null);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setTick((n) => n + 1), 100);
    return () => window.clearInterval(timer);
  }, [playing]);

  const formats = useMemo(
    () => ({
      km: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "kilometer",
        maximumFractionDigits: 0,
      }),
      speed: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "kilometer-per-second",
        maximumFractionDigits: 1,
      }),
      hours: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "hour",
        maximumFractionDigits: 1,
      }),
      clock: new Intl.DateTimeFormat(i18n.language, {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
        timeZoneName: "short",
      }),
    }),
    [i18n.language],
  );
  const labels = useMemo(
    () =>
      SHELLS.map((shell) =>
        Array.from({ length: shell.planes * shell.perPlane }, (_, i) =>
          t("satName", { shell: t(`shells.${shell.id}`), n: i + 1 }),
        ),
      ),
    [t],
  );

  const series = useMemo((): Scatter3DSeries[] => {
    const seconds = tick * STEP_SECONDS;
    return [
      {
        id: "earth",
        name: t("earth"),
        data: EARTH,
        color: "var(--info-color, #0ea5e9)",
        pointStyle: "disc",
        pointSize: 3,
        opacity: 0.45,
      },
      ...SHELLS.map((shell, i): Scatter3DSeries => ({
        id: shell.id,
        name: t(`shells.${shell.id}`),
        data: { ...positions(shell, seconds), label: labels[i] },
        pointSize: 6,
      })),
    ];
  }, [t, tick, labels]);

  const axis = (title: string) => ({ title, min: -LIMIT, max: LIMIT });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={16} wrap align="center">
        <Switch
          size="small"
          checked={playing}
          label={t("play")}
          onChange={setPlaying}
        />
        <span style={{ color: "var(--text-secondary-color)" }}>
          {formats.clock.format(EPOCH + tick * STEP_SECONDS * 1000)}
        </span>
      </HStack>
      <Scatter3DChart
        series={series}
        aspect={[1, 1, 1]}
        xAxis={axis(t("thousandKm"))}
        yAxis={axis(t("thousandKm"))}
        zAxis={axis(t("thousandKm"))}
        camera={{ azimuth: 35, elevation: 25 }}
        height={460}
        ariaLabel={t("satellitesAria")}
        onHover={(event) =>
          setHovered(
            SHELLS.find((shell) => shell.id === event?.seriesId) ?? null,
          )
        }
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {hovered
          ? t("satHover", {
              shell: t(`shells.${hovered.id}`),
              altitude: formats.km.format(hovered.altitude),
              speed: formats.speed.format(Math.sqrt(MU / radiusOf(hovered))),
              period: formats.hours.format(
                (2 * Math.PI) / motionOf(hovered) / 3600,
              ),
            })
          : t("satellitesHint")}
      </output>
    </div>
  );
}

```

## Example: 3D 轨迹

Line3DChart 绘制洛伦兹吸引子（12,000 步），通过 value 列和 colorScale "plasma" 按时间着色。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-3d-chart/demos/trajectory.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Line3DChart, type Line3DSeries } from "minerva-design/charts";

// The Lorenz attractor (σ = 10, ρ = 28, β = 8/3), integrated with RK4
const STEPS = 12_000;
const DT = 0.006;
const x = new Float64Array(STEPS);
const y = new Float64Array(STEPS);
const z = new Float64Array(STEPS);
const time = new Float64Array(STEPS);
const derivative = (p: readonly [number, number, number]) =>
  [
    10 * (p[1] - p[0]),
    p[0] * (28 - p[2]) - p[1],
    p[0] * p[1] - (8 / 3) * p[2],
  ] as const;
let p: [number, number, number] = [1, 1, 1];
for (let i = 0; i < STEPS; i++) {
  const k1 = derivative(p);
  const k2 = derivative([
    p[0] + (k1[0] * DT) / 2,
    p[1] + (k1[1] * DT) / 2,
    p[2] + (k1[2] * DT) / 2,
  ]);
  const k3 = derivative([
    p[0] + (k2[0] * DT) / 2,
    p[1] + (k2[1] * DT) / 2,
    p[2] + (k2[2] * DT) / 2,
  ]);
  const k4 = derivative([
    p[0] + k3[0] * DT,
    p[1] + k3[1] * DT,
    p[2] + k3[2] * DT,
  ]);
  p = [
    p[0] + ((k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]) * DT) / 6,
    p[1] + ((k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]) * DT) / 6,
    p[2] + ((k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]) * DT) / 6,
  ];
  x[i] = p[0];
  y[i] = p[1];
  z[i] = p[2];
  time[i] = i * DT;
}

export default function TrajectoryDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });

  const series = useMemo(
    (): Line3DSeries[] => [
      {
        name: t("trajectory"),
        data: { x, y, z, value: time },
        lineWidth: 1.5,
        format: (value) => t("seconds", { value: value.toFixed(2) }),
      },
    ],
    [t],
  );

  return (
    <Line3DChart
      series={series}
      colorScale="plasma"
      colorBar={{
        title: t("time"),
        format: (value) => t("seconds", { value }),
      }}
      camera={{ azimuth: 20, elevation: 18 }}
      height={440}
      ariaLabel={t("lorenzAria")}
    />
  );
}

```
