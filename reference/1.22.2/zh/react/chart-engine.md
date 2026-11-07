# 图表引擎

React 图表背后不依赖框架的引擎：createChart 将图表挂载到任意元素，createCanvasChart 可在任意 2D 画布上绘制（小程序、OffscreenCanvas），createChartController 则为没有画布的宿主计算场景。createShapeChart 和 createCanvasShapeChart 以同样的方式绘制饼图、环形图、雷达图、仪表盘、漏斗图、矩形树图、旭日图、桑基图、弦图、径向条形图、子弹图和日历热力图。其他图表家族有各自的引擎：createTradingChart、createDepthChart / createOrderBook / createOrderBookHeatmap / createTimeAndSales、createChart3D 和 createGraphChart；setDefaultChartRenderer() 可设置所有 GPU 图表的渲染后端。

Package: minerva-design@1.22.2

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

#### 选择哪个入口？

三个入口共享相同的选项、布局、命中检测和手势，区别在于它们对宿主环境的要求：

createChart(container, options)：网页。将图表挂载到 DOM 元素，依次尝试 WebGPU、WebGL2、WebGL、Canvas2D 绘制数据，渲染可访问的 DOM 提示框和图例，从 CSS 变量读取主题，并自行处理滚轮、指针和键盘输入。

createCanvasChart({ canvas, width, height, pixelRatio, options, theme })：任意 2D 画布，完全不需要 DOM（微信 / Taro / uni-app 的 canvas type="2d"、OffscreenCanvas、普通 ）。所有内容（包括提示框和图例）都绘制在画布上；宿主转发触摸或指针事件，并以普通值传入主题。小程序图表即基于它实现。

createChartController({ options, measureText })：完全不需要画布。它计算场景（布局、刻度、图例、提示框、高亮）并处理手势；scenePrimitives(scene) 将数据转换为数量有上限的像素图形列表，供用视图或 SVG 绘制的宿主使用。React Native 图表即基于它实现。

#### 四象限辅助函数

quadrantChartOptions(config) 为任意入口生成 QuadrantChart 的引擎选项；quadrantOf(config, x, y) 返回某个数据位置在屏幕上所处的象限（考虑 reverseX），quadrantCenter(config, corner) 返回象限中心，例如用于放置新增或拖放的点。quadrantGroups(config) 列出每个象限的点及其索引，quadrantCountText(showCounts, points, locale) 生成象限计数文本，quadrantLabels(locale) 返回无障碍点层的内置文案。createQuadrantPointLayer(host, options) 在任意 DOM 渲染器中挂载该层（每个象限一个点按钮列表，方向键在点之间切换，Shift + 方向键把聚焦的点移到相邻象限，并通过实时区域播报）； createQuadrantPointCard(host, options) 在任意 DOM 渲染器中挂载矩阵的点卡片（悬停、聚焦或拖动的点，或看板上选中的点共用一张玻璃卡片：圆点落在点上，显示名称、所在象限与宿主的操作），withQuadrantCard(options) 关闭其旁边的引擎提示框、标签气泡与拖动标签；QUADRANT_CARD_LINGER_MS 是指针离开圆点后卡片停留的时长；quadrantKeyTarget(event, corner) 返回 Shift + 方向键对应的目标象限，quadrantAccessibleGroups(config, locale) 为没有 DOM 的宿主返回各点的名称、标签和移动操作。任务看板（各渲染器的 QuadrantTaskBoard）也共享同一套逻辑：QUADRANT_CORNERS 列出四个角，quadrantTaskLabels(locale, overrides) 返回按钮和面板的本地化文案，newQuadrantTaskDraft / editQuadrantTaskDraft 生成添加 / 编辑面板的内容，canSaveQuadrantTask 和 applyQuadrantTaskDraft 负责校验并应用它，moveQuadrantTask 和 removeQuadrantTask 返回新的点列表，selectionAfterRemove 给出删除后的选中项，quadrantTaskDeleteText 生成删除确认文案，QUADRANT_TASK_ICONS 是添加、编辑、删除图标的路径，placeQuadrantTaskPanel(anchor, panel, board) 计算就地添加 / 编辑 / 删除面板在锚点旁的位置（优先在下方，空间不足时在上方，并保持在看板内），quadrantTaskColor(quadrants, corner) 返回象限的颜色，quadrantTaskIconUri(kind, color) 把这些图标生成 base64 SVG data URI，供用图片绘制图标的宿主（小程序）使用。

下载量

各版本的下载量

不支持

{{release}}：{{downloads}} 次下载

点击一根柱子

渲染器：{{renderer}}

访问量

注册数（×10）

每月访问量与注册数

点击一个点

搜索

直接访问

社交媒体

电子邮件

外链引荐

访问

注册

试用

客户

按来源统计的访问量

次访问

转化漏斗

饼图

环形图

漏斗图

{{name}}：{{value}}（{{share}}）

点击一个扇区或阶段

CPU

秒

实时 CPU 使用率

继续

暂停

已暂停 · 已接收 {{points}} 个点

接收中 · 已接收 {{points}} 个点

## API

```json
{
  "ChartOptions": {
    "source": "charts/src/engine/types.ts",
    "description": "Options of `createChart`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "series",
        "type": "readonly ChartSeries[]",
        "required": true,
        "description": "Data series"
      },
      {
        "name": "xAxis",
        "type": "ChartAxisOptions",
        "required": false,
        "description": "X axis"
      },
      {
        "name": "yAxis",
        "type": "ChartAxisOptions",
        "required": false,
        "description": "Y axis"
      },
      {
        "name": "yAxis2",
        "type": "ChartAxisOptions",
        "required": false,
        "description": "Second value axis on the right, for the series with `yAxis: \"right\"`; its range is aligned on the ticks of the left axis (the grid follows the left axis). Ignored by horizontal charts"
      },
      {
        "name": "orientation",
        "type": "ChartOrientation",
        "required": false,
        "default": "\"vertical\"",
        "description": "`horizontal` swaps the axes: the x axis (categories) runs down the left side, the values along the bottom (horizontal bars, Gantt charts)"
      },
      {
        "name": "renderer",
        "type": "ChartRendererPreference",
        "required": false,
        "default": "\"auto\"",
        "description": "Backend of the data layer"
      },
      {
        "name": "legend",
        "type": "boolean | ChartLegendOptions",
        "required": false,
        "description": "Legend; shown by default when there are several named series"
      },
      {
        "name": "tooltip",
        "type": "boolean | ChartTooltipOptions",
        "required": false,
        "description": "Tooltip; `false` disables it"
      },
      {
        "name": "crosshair",
        "type": "boolean",
        "required": false,
        "description": "Guide line following the pointer across the x axis (default on for `axis` tooltips of lines / areas)"
      },
      {
        "name": "annotations",
        "type": "readonly ChartAnnotation[]",
        "required": false,
        "description": "Background areas and reference lines"
      },
      {
        "name": "dependencies",
        "type": "readonly ChartDependency[]",
        "required": false,
        "description": "Arrows between bars, e.g. the dependencies of a Gantt chart: from the end of a bar to the start of another, matched by point `id` (or by category); hidden or missing points are skipped"
      },
      {
        "name": "interaction",
        "type": "boolean | ChartInteractionOptions",
        "required": false,
        "description": "Zoom / pan / keyboard; `false` makes the chart static"
      },
      {
        "name": "padding",
        "type": "ChartPadding",
        "required": false,
        "description": "Space around the plot area"
      },
      {
        "name": "palette",
        "type": "readonly string[]",
        "required": false,
        "description": "Colors of the series without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
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
        "default": "the page language (`<html lang>`), else the browser language",
        "description": "Locale of the texts and numbers the engine writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes); resolved at every options update"
      },
      {
        "name": "labels",
        "type": "Partial<ChartLabels>",
        "required": false,
        "description": "Overrides of the built-in texts of the `locale`"
      },
      {
        "name": "stackMode",
        "type": "\"normal\" | \"percent\"",
        "required": false,
        "default": "\"normal\"",
        "description": "`percent` scales every stack to 100% at each x (the axis shows percents, the tooltip the actual values)"
      }
    ]
  },
  "ChartInstance": {
    "source": "charts/src/engine/types.ts",
    "description": "Chart created by `createChart`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "setOptions",
        "type": "(options: ChartOptions) => void",
        "required": true,
        "description": "Replaces the options (unchanged data arrays are not processed again)"
      },
      {
        "name": "resize",
        "type": "() => void",
        "required": true,
        "description": "Measures the container again (a ResizeObserver does it automatically)"
      },
      {
        "name": "resetZoom",
        "type": "() => void",
        "required": true,
        "description": "Shows the whole data range"
      },
      {
        "name": "getView",
        "type": "() => ChartView",
        "required": true,
        "description": "Visible range"
      },
      {
        "name": "setView",
        "type": "(view: Partial<ChartView>) => void",
        "required": true,
        "description": "Sets the visible range"
      },
      {
        "name": "getPlotRect",
        "type": "() => ChartRect | null",
        "required": true,
        "description": "Plot area in CSS pixels of the container (`null` before the first frame)"
      },
      {
        "name": "toPixel",
        "type": "(x: number, y: number) => { x: number; y: number } | null",
        "required": true,
        "description": "Data coordinates -> CSS pixels of the container (`null` before the first frame)"
      },
      {
        "name": "fromPixel",
        "type": "(x: number, y: number) => { x: number; y: number } | null",
        "required": true,
        "description": "CSS pixels of the container -> data coordinates (`null` before the first frame)"
      },
      {
        "name": "getRenderer",
        "type": "() => ChartRendererKind | null",
        "required": true,
        "description": "Backend in use, `null` until ready"
      },
      {
        "name": "ready",
        "type": "Promise<ChartRendererKind | null>",
        "required": true,
        "description": "Resolves with the backend once the first frame can be drawn (`null` when the browser has no canvas support)"
      },
      {
        "name": "refreshTheme",
        "type": "() => void",
        "required": true,
        "description": "Reads the CSS variables again (theme changes on `<html>` / `<body>` are detected automatically)"
      },
      {
        "name": "setLabelHidden",
        "type": "(point: { seriesIndex: number; index: number } | null) => void",
        "required": true,
        "description": "Hides the drawn label of a point while a host card names it; the other labels keep their places. `null` draws it again"
      },
      {
        "name": "on",
        "type": "(type: K, listener: (event: ChartEventMap[K]) => void) => () => void",
        "required": true,
        "description": "Subscribes to an event; returns the unsubscribe function"
      },
      {
        "name": "destroy",
        "type": "() => void",
        "required": true,
        "description": "Removes the DOM and frees the GPU resources"
      }
    ]
  },
  "ChartEventMap": {
    "source": "charts/src/engine/types.ts",
    "description": "Events of a chart instance",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "hover",
        "type": "ChartHoverEvent | null",
        "required": true
      },
      {
        "name": "click",
        "type": "ChartHoverEvent",
        "required": true
      },
      {
        "name": "plotClick",
        "type": "ChartPlotClickEvent",
        "required": true,
        "description": "Click on the plot area where there is no point"
      },
      {
        "name": "zoom",
        "type": "ChartView",
        "required": true
      },
      {
        "name": "renderer",
        "type": "ChartRendererKind",
        "required": true
      },
      {
        "name": "layout",
        "type": "ChartRect",
        "required": true,
        "description": "The plot area moved or was resized"
      },
      {
        "name": "dragStart",
        "type": "ChartDragEvent",
        "required": true,
        "description": "A point starts moving with the pointer (`interaction.dragPoints`)"
      },
      {
        "name": "drag",
        "type": "ChartDragEvent",
        "required": true,
        "description": "A point is dragged, on every pointer move: the chart already draws it under the pointer (no need to update the options while dragging)"
      },
      {
        "name": "drop",
        "type": "ChartDragEvent",
        "required": true,
        "description": "A dragged point was released (the chart does not move it: update the data)"
      },
      {
        "name": "dragEnd",
        "type": "ChartDragEndEvent",
        "required": true,
        "description": "The drag is over (after `drop`, or cancelled with Escape)"
      }
    ]
  },
  "ChartDragEvent": {
    "source": "charts/src/engine/types.ts",
    "description": "A dragged point (`dragStart` / `drag` / `drop` events)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "item",
        "type": "ChartHoverItem",
        "required": true,
        "description": "The point being dragged"
      },
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Data coordinates under the pointer"
      },
      {
        "name": "y",
        "type": "number",
        "required": true
      }
    ]
  },
  "ChartDragEndEvent": {
    "source": "charts/src/engine/types.ts",
    "description": "End of a point drag (`dragEnd`), after the `drop` or without one",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "item",
        "type": "ChartHoverItem",
        "required": true,
        "description": "The point that was dragged"
      },
      {
        "name": "cancelled",
        "type": "boolean",
        "required": true,
        "description": "Escape, a cancelled pointer or a release outside the chart: no `drop`"
      }
    ]
  },
  "ChartRect": {
    "source": "charts/src/engine/types.ts",
    "description": "Rectangle in CSS pixels, relative to the chart's container",
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
        "name": "width",
        "type": "number",
        "required": true
      },
      {
        "name": "height",
        "type": "number",
        "required": true
      }
    ]
  },
  "CanvasChartConfig": {
    "source": "charts/src/engine/canvas.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "canvas",
        "type": "ChartCanvas",
        "required": true
      },
      {
        "name": "width",
        "type": "number",
        "required": true,
        "description": "Size of the canvas in CSS pixels (rpx converted by the host)"
      },
      {
        "name": "height",
        "type": "number",
        "required": true
      },
      {
        "name": "pixelRatio",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Device pixel ratio (`wx.getWindowInfo().pixelRatio` in mini-programs)"
      },
      {
        "name": "options",
        "type": "ChartOptions",
        "required": true
      },
      {
        "name": "theme",
        "type": "ChartThemeInput",
        "required": false,
        "description": "Colors and fonts: values of the Minerva CSS variables"
      }
    ]
  },
  "CanvasChartInstance": {
    "source": "charts/src/engine/canvas.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "setOptions",
        "type": "(options: ChartOptions) => void",
        "required": true
      },
      {
        "name": "setTheme",
        "type": "(theme: ChartThemeInput | undefined) => void",
        "required": true
      },
      {
        "name": "resize",
        "type": "(width: number, height: number, pixelRatio?: number) => void",
        "required": true,
        "description": "New CSS size (and pixel ratio) of the canvas"
      },
      {
        "name": "render",
        "type": "() => void",
        "required": true,
        "description": "Draws now (frames are otherwise scheduled automatically)"
      },
      {
        "name": "touchStart",
        "type": "(touches: readonly ChartTouch[]) => void",
        "required": true,
        "description": "Touch handlers: pass the `touches` / `changedTouches` of the event"
      },
      {
        "name": "touchMove",
        "type": "(touches: readonly ChartTouch[]) => void",
        "required": true
      },
      {
        "name": "touchEnd",
        "type": "(changedTouches: readonly ChartTouch[]) => void",
        "required": true
      },
      {
        "name": "touchCancel",
        "type": "(changedTouches?: readonly ChartTouch[]) => void",
        "required": true
      },
      {
        "name": "pointerDown",
        "type": "(x: number, y: number, options?: ChartPointerOptions) => void",
        "required": true,
        "description": "Mouse / pen handlers (H5, desktop mini-programs)"
      },
      {
        "name": "pointerMove",
        "type": "(x: number, y: number, options?: ChartPointerOptions) => void",
        "required": true
      },
      {
        "name": "pointerUp",
        "type": "(x: number, y: number, options?: ChartPointerOptions) => void",
        "required": true
      },
      {
        "name": "pointerLeave",
        "type": "() => void",
        "required": true
      },
      {
        "name": "zoomAt",
        "type": "(x: number, y: number, factor: number) => void",
        "required": true,
        "description": "Zooms around a pixel (factor < 1 zooms in)"
      },
      {
        "name": "resetZoom",
        "type": "() => void",
        "required": true
      },
      {
        "name": "getView",
        "type": "() => ChartView",
        "required": true
      },
      {
        "name": "setView",
        "type": "(view: Partial<ChartView>) => void",
        "required": true
      },
      {
        "name": "toggleSeries",
        "type": "(id: string) => void",
        "required": true
      },
      {
        "name": "clearHover",
        "type": "() => void",
        "required": true
      },
      {
        "name": "getPlotRect",
        "type": "() => ChartRect | null",
        "required": true
      },
      {
        "name": "toPixel",
        "type": "(x: number, y: number) => { x: number; y: number } | null",
        "required": true
      },
      {
        "name": "fromPixel",
        "type": "(x: number, y: number) => { x: number; y: number } | null",
        "required": true
      },
      {
        "name": "getController",
        "type": "() => ChartController",
        "required": true,
        "description": "The platform-free controller (scene, gestures)"
      },
      {
        "name": "on",
        "type": "(type: K, listener: (event: ChartControllerEventMap[K]) => void) => () => void",
        "required": true
      },
      {
        "name": "destroy",
        "type": "() => void",
        "required": true
      }
    ]
  },
  "ChartCanvas": {
    "source": "charts/src/engine/canvas.ts",
    "description": "The canvas a chart draws on: a browser `HTMLCanvasElement`, an `OffscreenCanvas` or the node of a mini-program `<canvas type=\"2d\">` (`SelectorQuery.fields({ node: true })`)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "width",
        "type": "number",
        "required": true
      },
      {
        "name": "height",
        "type": "number",
        "required": true
      },
      {
        "name": "getContext",
        "type": "(type: \"2d\") => unknown",
        "required": true
      },
      {
        "name": "requestAnimationFrame",
        "type": "(callback: () => void) => number",
        "required": false,
        "description": "Mini-program canvases schedule their frames themselves"
      },
      {
        "name": "cancelAnimationFrame",
        "type": "(id: number) => void",
        "required": false
      }
    ]
  },
  "ChartTouch": {
    "source": "charts/src/engine/canvas.ts",
    "description": "A touch point relative to the canvas (`x` / `y`) with its identifier",
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
        "name": "identifier",
        "type": "number",
        "required": false
      }
    ]
  },
  "ChartPointerOptions": {
    "source": "charts/src/engine/controller.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "number",
        "required": false,
        "description": "Pointer id (touch identifier); 0 by default"
      },
      {
        "name": "touch",
        "type": "boolean",
        "required": false,
        "description": "Touch input: the tooltip follows the finger and stays after a tap"
      }
    ]
  },
  "ChartThemeInput": {
    "source": "charts/src/engine/theme.ts",
    "description": "Theme of the charts drawn without a DOM (mini-programs, React Native)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "variables",
        "type": "Readonly<Record<string, string>>",
        "required": false,
        "description": "Values of the Minerva CSS variables (`--primary-color`, `--text-color`, `--chart-series-1`, ...) used for the theme colors and to resolve `var(--name)` colors of the options"
      },
      {
        "name": "palette",
        "type": "readonly string[]",
        "required": false,
        "description": "Series colors (hex / rgb)"
      },
      {
        "name": "fontFamily",
        "type": "string",
        "required": false,
        "description": "Font family of the labels"
      },
      {
        "name": "fontSize",
        "type": "number",
        "required": false,
        "default": "11",
        "description": "Font size of the tick labels, in pixels"
      }
    ]
  },
  "ChartControllerConfig": {
    "source": "charts/src/engine/controller.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "options",
        "type": "ChartOptions",
        "required": true
      },
      {
        "name": "theme",
        "type": "ChartThemeInput",
        "required": false,
        "description": "Colors and fonts (Minerva variables); light defaults when omitted"
      },
      {
        "name": "measureText",
        "type": "(text: string, font: string) => number",
        "required": true,
        "description": "Width in pixels of `text` drawn with the CSS `font`"
      },
      {
        "name": "onInvalidate",
        "type": "() => void",
        "required": false,
        "description": "Called when the scene changed and must be drawn again"
      }
    ]
  },
  "ChartController": {
    "source": "charts/src/engine/controller.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "setOptions",
        "type": "(options: ChartOptions) => void",
        "required": true
      },
      {
        "name": "setTheme",
        "type": "(theme: ChartThemeInput | undefined) => void",
        "required": true
      },
      {
        "name": "setSize",
        "type": "(width: number, height: number) => void",
        "required": true,
        "description": "Size of the chart in CSS pixels"
      },
      {
        "name": "getScene",
        "type": "() => ChartScene | null",
        "required": true,
        "description": "What to draw (`null` until the size is known)"
      },
      {
        "name": "pointerDown",
        "type": "(x: number, y: number, options?: ChartPointerOptions) => void",
        "required": true
      },
      {
        "name": "pointerMove",
        "type": "(x: number, y: number, options?: ChartPointerOptions) => void",
        "required": true
      },
      {
        "name": "pointerUp",
        "type": "(x: number, y: number, options?: ChartPointerOptions) => void",
        "required": true
      },
      {
        "name": "pointerCancel",
        "type": "(options?: ChartPointerOptions) => void",
        "required": true
      },
      {
        "name": "pointerLeave",
        "type": "() => void",
        "required": true,
        "description": "The mouse left the chart"
      },
      {
        "name": "zoomAt",
        "type": "(x: number, y: number, factor: number) => void",
        "required": true,
        "description": "Zooms around a pixel (factor < 1 zooms in)"
      },
      {
        "name": "resetZoom",
        "type": "() => void",
        "required": true
      },
      {
        "name": "getView",
        "type": "() => ChartView",
        "required": true
      },
      {
        "name": "setView",
        "type": "(view: Partial<ChartView>) => void",
        "required": true
      },
      {
        "name": "toggleSeries",
        "type": "(id: string) => void",
        "required": true,
        "description": "Shows / hides a series (like a legend click)"
      },
      {
        "name": "clearHover",
        "type": "() => void",
        "required": true,
        "description": "Hides the tooltip"
      },
      {
        "name": "getPlotRect",
        "type": "() => ChartRect | null",
        "required": true
      },
      {
        "name": "toPixel",
        "type": "(x: number, y: number) => { x: number; y: number } | null",
        "required": true
      },
      {
        "name": "fromPixel",
        "type": "(x: number, y: number) => { x: number; y: number } | null",
        "required": true
      },
      {
        "name": "on",
        "type": "(type: K, listener: (event: ChartControllerEventMap[K]) => void) => () => void",
        "required": true
      },
      {
        "name": "destroy",
        "type": "() => void",
        "required": true
      }
    ]
  },
  "ChartPrimitiveOptions": {
    "source": "charts/src/engine/controller.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "maxDots",
        "type": "number",
        "required": false,
        "default": "4000",
        "description": "Upper bound of the dots drawn per series: above it the dots are merged into one per occupied cell of their size"
      },
      {
        "name": "maxBars",
        "type": "number",
        "required": false,
        "default": "2000",
        "description": "Upper bound of the bars drawn per series: above it neighboring bars sharing a pixel column are merged"
      },
      {
        "name": "columnWidth",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Width in pixels of the columns lines are decimated to (at most four points per column); larger values mean fewer shapes"
      },
      {
        "name": "dotCell",
        "type": "number",
        "required": false,
        "description": "Size of the cells dots are merged into (the dot size by default)"
      }
    ]
  },
  "ChartLinePrimitive": {
    "source": "charts/src/engine/controller.ts",
    "description": "A polyline (pixels of the chart): interleaved x, y",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "kind",
        "type": "\"line\"",
        "required": true
      },
      {
        "name": "seriesIndex",
        "type": "number",
        "required": true
      },
      {
        "name": "color",
        "type": "string",
        "required": true
      },
      {
        "name": "width",
        "type": "number",
        "required": true
      },
      {
        "name": "segments",
        "type": "number[][]",
        "required": true,
        "description": "Runs of points without gaps"
      }
    ]
  },
  "ChartAreaPrimitive": {
    "source": "charts/src/engine/controller.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "kind",
        "type": "\"area\"",
        "required": true
      },
      {
        "name": "seriesIndex",
        "type": "number",
        "required": true
      },
      {
        "name": "color",
        "type": "string",
        "required": true
      },
      {
        "name": "opacity",
        "type": "number",
        "required": true
      },
      {
        "name": "baseline",
        "type": "number",
        "required": true,
        "description": "Y pixel of the baseline (x pixel when `horizontal`)"
      },
      {
        "name": "segments",
        "type": "number[][]",
        "required": true
      },
      {
        "name": "bottoms",
        "type": "number[][]",
        "required": false,
        "description": "Stacked and range areas: y pixel (x pixel when `horizontal`) of the bottom edge under every point of `segments`"
      },
      {
        "name": "horizontal",
        "type": "boolean",
        "required": false,
        "description": "Horizontal charts: the area is filled toward the left edge (`baseline` / `bottoms` are x pixels)"
      }
    ]
  },
  "ChartBarPrimitive": {
    "source": "charts/src/engine/controller.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "kind",
        "type": "\"bars\"",
        "required": true
      },
      {
        "name": "seriesIndex",
        "type": "number",
        "required": true
      },
      {
        "name": "color",
        "type": "string",
        "required": true
      },
      {
        "name": "rects",
        "type": "number[]",
        "required": true,
        "description": "Interleaved x, y, width, height"
      },
      {
        "name": "colors",
        "type": "string[]",
        "required": false,
        "description": "CSS color of every rect (candlesticks, heatmap cells, colored bars); `color` otherwise"
      },
      {
        "name": "radius",
        "type": "number",
        "required": false,
        "description": "Corner radius in pixels"
      },
      {
        "name": "opacity",
        "type": "number",
        "required": false,
        "description": "Opacity of the fill (box plot boxes, translucent bars)"
      }
    ]
  },
  "ChartDotPrimitive": {
    "source": "charts/src/engine/controller.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "kind",
        "type": "\"dots\"",
        "required": true
      },
      {
        "name": "seriesIndex",
        "type": "number",
        "required": true
      },
      {
        "name": "opacity",
        "type": "number",
        "required": true,
        "description": "Opacity of the fill (0: rings only)"
      },
      {
        "name": "dots",
        "type": "number[]",
        "required": true,
        "description": "Interleaved x, y, diameter"
      },
      {
        "name": "colors",
        "type": "string[]",
        "required": true,
        "description": "CSS color of every dot"
      },
      {
        "name": "stroke",
        "type": "number",
        "required": false,
        "description": "Width of a ring of the dot color around every dot, CSS pixels"
      }
    ]
  },
  "ShapeChartInstance": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "Shape chart created by `createShapeChart`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "setOptions",
        "type": "(options: ShapeChartOptions) => void",
        "required": true,
        "description": "Replaces the options (animates from the previous values)"
      },
      {
        "name": "resize",
        "type": "() => void",
        "required": true,
        "description": "Measures the container again (a ResizeObserver does it automatically)"
      },
      {
        "name": "refreshTheme",
        "type": "() => void",
        "required": true,
        "description": "Reads the CSS variables again (theme changes on `<html>` / `<body>` are detected automatically)"
      },
      {
        "name": "toggle",
        "type": "(index: number) => void",
        "required": true,
        "description": "Hides / shows a slice, stage, radar series or top-level treemap node by index and emits `toggle` (with the `hidden` option: only emits `toggle`)"
      },
      {
        "name": "getHidden",
        "type": "() => number[]",
        "required": true,
        "description": "Indexes of the hidden entries, ascending"
      },
      {
        "name": "drill",
        "type": "(path: readonly string[]) => void",
        "required": true,
        "description": "Sunburst: zooms into the node at `path` (names from the root, `[]` = the root) and emits `drill` (with the `drillPath` option: only emits `drill`)"
      },
      {
        "name": "getDrillPath",
        "type": "() => string[]",
        "required": true,
        "description": "Sunburst: names from the root to the focused node (`[]` = the root)"
      },
      {
        "name": "getRenderer",
        "type": "() => ChartRendererKind | null",
        "required": true,
        "description": "Backend drawing the shapes; `null` until it is chosen (the first frames are drawn with Canvas2D meanwhile)"
      },
      {
        "name": "on",
        "type": "(type: K, listener: (event: ShapeChartEventMap[K]) => void) => () => void",
        "required": true,
        "description": "Subscribes to an event; returns the unsubscribe function"
      },
      {
        "name": "destroy",
        "type": "() => void",
        "required": true,
        "description": "Removes the DOM"
      }
    ]
  },
  "ShapeChartEventMap": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "Events of a shape chart",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "hover",
        "type": "ShapeHoverEvent | null",
        "required": true
      },
      {
        "name": "click",
        "type": "ShapeHoverEvent",
        "required": true
      },
      {
        "name": "toggle",
        "type": "ShapeToggleEvent",
        "required": true,
        "description": "Legend click or `toggle()` call. Uncontrolled charts emit it after hiding / showing the entry; with the `hidden` option nothing changes until the new `hiddenIndexes` are passed back."
      },
      {
        "name": "drill",
        "type": "ShapeDrillEvent",
        "required": true,
        "description": "Sunburst: a parent or the center was clicked (or `drill()` was called). Uncontrolled charts emit it after zooming; with the `drillPath` option nothing changes until the new `path` is passed back."
      }
    ]
  },
  "PieChartOptions": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "Pie / donut chart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonOptions"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"pie\"",
        "required": true
      },
      {
        "name": "data",
        "type": "readonly ShapeDatum[]",
        "required": true
      },
      {
        "name": "innerRadius",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Inner radius as a fraction of the outer radius: 0 = pie, 0.6 = donut"
      },
      {
        "name": "startAngle",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Angle of the first slice, degrees clockwise from 12 o'clock"
      },
      {
        "name": "padAngle",
        "type": "number",
        "required": false,
        "default": "1 (pie), 2 (donut)",
        "description": "Gap between the slices, in pixels"
      },
      {
        "name": "cornerRadius",
        "type": "number",
        "required": false,
        "default": "0 (pie), 4 (donut)",
        "description": "Corner radius of the slices, in pixels"
      },
      {
        "name": "rose",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Nightingale rose: the radius (instead of the angle) shows the value"
      },
      {
        "name": "labels",
        "type": "\"outside\" | \"inside\" | \"none\"",
        "required": false,
        "default": "\"outside\" (up to 12 slices), \"none\" otherwise",
        "description": "Slice labels: `outside` with leader lines, `inside` the slices, or none"
      },
      {
        "name": "labelContent",
        "type": "readonly (\"name\" | \"value\" | \"percent\")[]",
        "required": false,
        "description": "What a label shows: name, value, percent (combinable)"
      },
      {
        "name": "centerValue",
        "type": "string",
        "required": false,
        "description": "Big text in the hole of a donut (e.g. the total)"
      },
      {
        "name": "centerLabel",
        "type": "string",
        "required": false,
        "description": "Small text under `centerValue`"
      }
    ]
  },
  "RadarChartOptions": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "Radar (spider) chart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonOptions"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"radar\"",
        "required": true
      },
      {
        "name": "indicators",
        "type": "readonly RadarIndicator[]",
        "required": true
      },
      {
        "name": "series",
        "type": "readonly RadarSeries[]",
        "required": true
      },
      {
        "name": "shape",
        "type": "\"polygon\" | \"circle\"",
        "required": false,
        "default": "\"polygon\"",
        "description": "Grid shape"
      },
      {
        "name": "levels",
        "type": "number",
        "required": false,
        "default": "4",
        "description": "Number of grid rings"
      },
      {
        "name": "dots",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Dots on the vertices"
      }
    ]
  },
  "GaugeChartOptions": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "Gauge (speedometer) chart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonOptions"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"gauge\"",
        "required": true
      },
      {
        "name": "value",
        "type": "number",
        "required": true
      },
      {
        "name": "min",
        "type": "number",
        "required": false,
        "default": "0"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "default": "100"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Caption under the value"
      },
      {
        "name": "sweep",
        "type": "number",
        "required": false,
        "default": "240",
        "description": "Total angle of the arc, degrees"
      },
      {
        "name": "thickness",
        "type": "number",
        "required": false,
        "default": "0.16",
        "description": "Thickness of the arc as a fraction of the radius"
      },
      {
        "name": "bands",
        "type": "readonly GaugeBand[]",
        "required": false,
        "description": "Colored ranges of the track; the value arc takes the color of its band"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color of the value arc (when there are no bands); the first palette color by default"
      },
      {
        "name": "needle",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Draws a needle in addition to the value arc"
      },
      {
        "name": "ticks",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Tick labels at the ends (and at the band bounds)"
      }
    ]
  },
  "FunnelChartOptions": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "Funnel chart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonOptions"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"funnel\"",
        "required": true
      },
      {
        "name": "data",
        "type": "readonly ShapeDatum[]",
        "required": true
      },
      {
        "name": "sort",
        "type": "\"descending\" | \"ascending\" | \"none\"",
        "required": false,
        "default": "\"none\" (data order)",
        "description": "Order of the stages"
      },
      {
        "name": "gap",
        "type": "number",
        "required": false,
        "default": "4",
        "description": "Vertical gap between the stages, in pixels"
      },
      {
        "name": "conversion",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the conversion rate from the previous stage"
      },
      {
        "name": "shape",
        "type": "\"trapezoid\" | \"bar\"",
        "required": false,
        "default": "\"trapezoid\"",
        "description": "Shape of the stages: trapezoids that narrow to the next stage, or centered bars"
      }
    ]
  },
  "TreemapChartOptions": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "Treemap chart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonOptions"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"treemap\"",
        "required": true
      },
      {
        "name": "data",
        "type": "readonly TreemapNode[]",
        "required": true
      },
      {
        "name": "gap",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "Gap between the cells, in pixels"
      },
      {
        "name": "headers",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Draws the names of the parents above their children"
      }
    ]
  },
  "ShapeChartCommonOptions": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "Options shared by every shape chart",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "palette",
        "type": "readonly string[]",
        "required": false,
        "description": "Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
      },
      {
        "name": "legend",
        "type": "boolean | ShapeLegendOptions",
        "required": false,
        "description": "Legend; shown by default for pie, funnel and multi-series radar charts"
      },
      {
        "name": "tooltip",
        "type": "boolean | ShapeTooltipOptions",
        "required": false,
        "description": "Tooltip; `false` disables it"
      },
      {
        "name": "format",
        "type": "(value: number) => string",
        "required": false,
        "default": "compact numbers of the `locale` (1.2k, 3.4M; 1.2万 in Chinese and Japanese)",
        "description": "Formats the values (labels, tooltip)"
      },
      {
        "name": "percentFormat",
        "type": "(share: number) => string",
        "required": false,
        "default": "a percent of the `locale` with one decimal, e.g. \"40.0%\", \"40,0 %\"",
        "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "default": "the page language (`<html lang>`), else the browser language",
        "description": "BCP 47 locale of the texts and numbers the chart writes (tooltip rows, accessible names, number and percent formats, calendar dates); built-in texts in English, Chinese, Japanese and French (English otherwise)"
      },
      {
        "name": "texts",
        "type": "Partial<ShapeChartLabels>",
        "required": false,
        "description": "Replaces built-in texts of the `locale` (tooltip rows, accessible names, \"No data\")"
      },
      {
        "name": "hidden",
        "type": "readonly number[]",
        "required": false,
        "description": "Indexes of the hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar heatmap levels / chord groups. When set, the chart is controlled: this list wins over the legend state, and legend clicks (or `toggle()`) only emit the `toggle` event, whose `hiddenIndexes` should be passed back here."
      },
      {
        "name": "animation",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Entry / update animation (skipped when the user prefers reduced motion)"
      },
      {
        "name": "padding",
        "type": "ChartPadding",
        "required": false,
        "description": "Space around the drawing, in CSS pixels"
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "required": false,
        "description": "Accessible name of the chart"
      },
      {
        "name": "renderer",
        "type": "ChartRendererPreference",
        "required": false,
        "default": "\"auto\" (the global default, see `setDefaultChartRenderer`)",
        "description": "Backend of the shapes: `auto` tries WebGPU, then WebGL2, then WebGL (1), then Canvas2D, and skips GPU backends that run in software. Text is always drawn with Canvas2D, above the shapes."
      }
    ]
  },
  "CanvasShapeChartConfig": {
    "source": "charts/src/engine/shapes/canvas.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "canvas",
        "type": "ChartCanvas",
        "required": true,
        "description": "Canvas to draw on (`HTMLCanvasElement`, `OffscreenCanvas` or a mini-program canvas node)"
      },
      {
        "name": "width",
        "type": "number",
        "required": true,
        "description": "Width of the canvas in CSS pixels (rpx converted by the host)"
      },
      {
        "name": "height",
        "type": "number",
        "required": true,
        "description": "Height of the canvas in CSS pixels"
      },
      {
        "name": "pixelRatio",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Device pixel ratio (`wx.getWindowInfo().pixelRatio` in mini-programs)"
      },
      {
        "name": "options",
        "type": "ShapeChartOptions",
        "required": true,
        "description": "Chart options"
      },
      {
        "name": "theme",
        "type": "ChartThemeInput",
        "required": false,
        "description": "Colors and fonts: values of the Minerva CSS variables"
      }
    ]
  },
  "CanvasShapeChartInstance": {
    "source": "charts/src/engine/shapes/canvas.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "setOptions",
        "type": "(options: ShapeChartOptions) => void",
        "required": true,
        "description": "Replaces the options (animates from the previous values)"
      },
      {
        "name": "setTheme",
        "type": "(theme: ChartThemeInput | undefined) => void",
        "required": true,
        "description": "Replaces the theme input"
      },
      {
        "name": "resize",
        "type": "(width: number, height: number, pixelRatio?: number) => void",
        "required": true,
        "description": "New CSS size (and pixel ratio) of the canvas"
      },
      {
        "name": "render",
        "type": "() => void",
        "required": true,
        "description": "Draws now (frames are otherwise scheduled automatically)"
      },
      {
        "name": "touchStart",
        "type": "(touches: readonly ChartTouch[]) => void",
        "required": true,
        "description": "Touch handlers: pass the `touches` / `changedTouches` of the event"
      },
      {
        "name": "touchMove",
        "type": "(touches: readonly ChartTouch[]) => void",
        "required": true
      },
      {
        "name": "touchEnd",
        "type": "(changedTouches: readonly ChartTouch[]) => void",
        "required": true
      },
      {
        "name": "touchCancel",
        "type": "(changedTouches?: readonly ChartTouch[]) => void",
        "required": true
      },
      {
        "name": "pointerDown",
        "type": "(x: number, y: number) => void",
        "required": true,
        "description": "Mouse / pen handlers (H5, desktop mini-programs)"
      },
      {
        "name": "pointerMove",
        "type": "(x: number, y: number) => void",
        "required": true
      },
      {
        "name": "pointerUp",
        "type": "(x: number, y: number) => void",
        "required": true
      },
      {
        "name": "pointerLeave",
        "type": "() => void",
        "required": true
      },
      {
        "name": "toggle",
        "type": "(index: number) => void",
        "required": true,
        "description": "Hides / shows a slice, stage, radar series or top-level treemap node and emits `toggle` (with the `hidden` option: only emits `toggle`)"
      },
      {
        "name": "getHidden",
        "type": "() => number[]",
        "required": true,
        "description": "Indexes of the hidden entries, ascending"
      },
      {
        "name": "drill",
        "type": "(path: readonly string[]) => void",
        "required": true,
        "description": "Sunburst: zooms into the node at `path` (names from the root, `[]` = the root) and emits `drill` (with the `drillPath` option: only emits `drill`)"
      },
      {
        "name": "getDrillPath",
        "type": "() => string[]",
        "required": true,
        "description": "Sunburst: names from the root to the focused node (`[]` = the root)"
      },
      {
        "name": "clearHover",
        "type": "() => void",
        "required": true,
        "description": "Removes the hover (and the tooltip)"
      },
      {
        "name": "on",
        "type": "(type: K, listener: (event: ShapeChartEventMap[K]) => void) => () => void",
        "required": true,
        "description": "Subscribes to an event; returns the unsubscribe function"
      },
      {
        "name": "destroy",
        "type": "() => void",
        "required": true,
        "description": "Stops the animations and the listeners"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础

在 effect 中调用 createChart，清理时调用 destroy()；ready 以后端 resolve，on("click") 报告被点击的柱。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chart-engine/demos/basic.tsx

```tsx
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { createChart, type ChartHoverEvent } from "minerva-design/charts/core";

const releases = ["v1.0", "v1.1", "v1.2", "v2.0", "v2.1", "v2.2", "v3.0"];
const downloads = [120e3, 185e3, 240e3, 610e3, 720e3, 830e3, 1.42e6];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-engine.data",
  });
  const locale = i18n.language;
  const ref = useRef<HTMLDivElement>(null);
  const [renderer, setRenderer] = useState("…");
  const [clicked, setClicked] = useState<ChartHoverEvent | null>(null);
  const compact = new Intl.NumberFormat(locale, { notation: "compact" });

  // the chart is created again when the language changes
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    const chart = createChart(container, {
      series: [
        {
          name: t("downloads"),
          type: "bar",
          data: releases.map((release, i) => [release, downloads[i]] as const),
        },
      ],
      yAxis: { format: (value) => format.format(value) },
      ariaLabel: t("downloadsAria"),
    });
    let active = true;
    void chart.ready.then((kind) => {
      if (active) setRenderer(kind ?? t("unsupported"));
    });
    const off = chart.on("click", setClicked);
    return () => {
      active = false;
      off();
      chart.destroy();
    };
  }, [t, locale]);

  const item = clicked?.items[0];
  const result =
    clicked && item
      ? t("downloadsStatus", {
          release: clicked.xLabel,
          downloads: compact.format(item.y),
        })
      : t("clickBar");
  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div ref={ref} style={{ height: 300 }} />
      <p role="status">
        {t("rendererLabel", { renderer })} · {result}
      </p>
    </div>
  );
}

```

## Example: 无 DOM 的画布

在普通 <canvas> 上使用 createCanvasChart：按 devicePixelRatio 设置尺寸，由 ResizeObserver 调整大小，通过 pointerDown / Move / Up / Leave 转发指针事件，从 CSS 变量读取一次主题，并在卸载时调用 destroy()。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chart-engine/demos/canvas.tsx

```tsx
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useTranslation } from "react-i18next";
import {
  createCanvasChart,
  type ChartThemeInput,
} from "minerva-design/charts/core";

// January to August
const visits = [4200, 5100, 4800, 6900, 7400, 8800, 8100, 9600];
const signups = [310, 420, 380, 560, 610, 790, 720, 880];

const THEME_VARIABLES = [
  "--primary-color",
  "--success-color",
  "--warning-color",
  "--danger-color",
  "--info-color",
  "--text-color",
  "--text-secondary-color",
  "--border-color",
  "--surface-color",
  "--background-color",
  "--font-family-sans",
];

// createCanvasChart never reads the DOM: hand it the variable values
const readTheme = (element: Element): ChartThemeInput => {
  const style = getComputedStyle(element);
  const variables: Record<string, string> = {};
  for (const name of THEME_VARIABLES) {
    const value = style.getPropertyValue(name).trim();
    if (value) variables[name] = value;
  }
  return { variables };
};

export default function CanvasDemo() {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<ReturnType<typeof createCanvasChart> | null>(null);
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-engine.data",
  });
  const locale = i18n.language;
  const [status, setStatus] = useState<string | null>(null);

  // the chart is created again when the language changes
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const monthFormat = new Intl.DateTimeFormat(locale, { month: "short" });
    const months = visits.map((_, m) =>
      monthFormat.format(new Date(2026, m, 1)),
    );
    const compact = new Intl.NumberFormat(locale, { notation: "compact" });
    const size = () => canvas.getBoundingClientRect();
    const chart = createCanvasChart({
      canvas,
      width: size().width,
      height: size().height,
      pixelRatio: window.devicePixelRatio || 1,
      theme: readTheme(canvas),
      options: {
        series: [
          {
            name: t("visits"),
            type: "area",
            data: months.map((month, i) => [month, visits[i]] as const),
          },
          {
            name: t("signupsTimes10"),
            type: "line",
            data: months.map((month, i) => [month, signups[i] * 10] as const),
          },
        ],
        yAxis: { format: (value) => compact.format(value) },
        crosshair: true,
        ariaLabel: t("visitsAria"),
      },
    });
    chartRef.current = chart;

    const offClick = chart.on("click", (event) => {
      const item = event.items[0];
      if (item)
        setStatus(
          `${event.xLabel}: ${compact.format(item.y)} (${item.seriesName})`,
        );
    });
    const offPlot = chart.on("plotClick", () => setStatus(null));

    const resizer = new ResizeObserver(() => {
      const { width, height } = size();
      chart.resize(width, height, window.devicePixelRatio || 1);
    });
    resizer.observe(canvas);

    // The canvas chart does not watch the page: re-read the colors when
    // the docs switch between light and dark
    const themer = new MutationObserver(() =>
      chart.setTheme(readTheme(canvas)),
    );
    themer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    });

    return () => {
      offClick();
      offPlot();
      resizer.disconnect();
      themer.disconnect();
      chart.destroy();
      chartRef.current = null;
    };
  }, [t, locale]);

  // Pixel position and pointer kind of an event, as the chart expects them
  const at = (event: PointerEvent<HTMLCanvasElement>) =>
    [
      event.nativeEvent.offsetX,
      event.nativeEvent.offsetY,
      { id: event.pointerId, touch: event.pointerType === "touch" },
    ] as const;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <canvas
        ref={ref}
        role="img"
        aria-label={t("visitsAria")}
        style={{ width: "100%", height: 280, touchAction: "none" }}
        onPointerDown={(event) => chartRef.current?.pointerDown(...at(event))}
        onPointerMove={(event) => chartRef.current?.pointerMove(...at(event))}
        onPointerUp={(event) => chartRef.current?.pointerUp(...at(event))}
        onPointerLeave={() => chartRef.current?.pointerLeave()}
      />
      <p role="status">{status ?? t("clickPoint")}</p>
    </div>
  );
}

```

## Example: 形状图表

在 effect 中调用 createShapeChart：按钮通过 setOptions 在饼图、带中心总数的环形图和漏斗图之间切换（图形从先前的值过渡动画），on("click") 报告被点击的扇区或阶段，卸载时调用 destroy()。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chart-engine/demos/shapes.tsx

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  createShapeChart,
  type ShapeChartInstance,
  type ShapeChartOptions,
  type ShapeHoverEvent,
} from "minerva-design/charts/core";

const traffic = [
  { key: "search", value: 4200 },
  { key: "direct", value: 2600 },
  { key: "social", value: 1500 },
  { key: "email", value: 900 },
  { key: "referral", value: 600 },
];
const funnel = [
  { key: "visits", value: 9800 },
  { key: "signups", value: 3100 },
  { key: "trials", value: 1400 },
  { key: "customers", value: 520 },
];
const VIEWS = ["pie", "donut", "funnel"] as const;
type View = (typeof VIEWS)[number];

export default function ShapesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-engine.data",
  });
  const locale = i18n.language;
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ShapeChartInstance | null>(null);
  const [view, setView] = useState<View>("pie");
  const [picked, setPicked] = useState<ShapeHoverEvent | null>(null);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  // the options of each view, in the reader's language
  const views = useMemo((): Record<View, ShapeChartOptions> => {
    const compact = new Intl.NumberFormat(locale, { notation: "compact" });
    const sources = traffic.map(({ key, value }) => ({
      name: t(`sources.${key}`),
      value,
    }));
    const common = {
      format: (value: number) => number.format(value),
      percentFormat: (share: number) => percent.format(share),
    };
    return {
      pie: {
        type: "pie",
        data: sources,
        ariaLabel: t("sourcesAria"),
        ...common,
      },
      donut: {
        type: "pie",
        data: sources,
        innerRadius: 0.62,
        padAngle: 2,
        cornerRadius: 4,
        centerValue: compact.format(9800),
        centerLabel: t("visitsLabel"),
        labels: "none",
        ariaLabel: t("sourcesAria"),
        ...common,
      },
      funnel: {
        type: "funnel",
        data: funnel.map(({ key, value }) => ({
          name: t(`stages.${key}`),
          value,
        })),
        ariaLabel: t("funnelAria"),
        ...common,
      },
    };
  }, [t, locale, number, percent]);

  // created once; reading the first options from an effect keeps them current
  const viewsRef = useRef(views);
  useEffect(() => {
    viewsRef.current = views;
  });

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const chart = createShapeChart(container, viewsRef.current.pie);
    chartRef.current = chart;
    const off = chart.on("click", setPicked);
    return () => {
      off();
      chart.destroy();
      chartRef.current = null;
    };
  }, []);

  // another view, or the language changed: animates from the previous values
  useEffect(() => {
    chartRef.current?.setOptions(views[view]);
  }, [views, view]);

  const show = (next: View) => {
    setView(next);
    setPicked(null);
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div style={{ display: "flex", gap: 8 }}>
        {VIEWS.map((name) => (
          <Button
            key={name}
            size="small"
            variant={view === name ? "solid" : "outline"}
            aria-pressed={view === name}
            onClick={() => show(name)}
          >
            {t(`views.${name}`)}
          </Button>
        ))}
      </div>
      <div ref={ref} style={{ height: 300 }} />
      <p role="status">
        {picked
          ? t("picked", {
              name: picked.name,
              value: number.format(picked.value),
              share: percent.format(picked.percent),
            })
          : t("clickShape")}
      </p>
    </div>
  );
}

```

## Example: 流式数据

每 500 ms 通过 setOptions 和新的 data 数组追加一个点；可暂停和恢复数据流。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chart-engine/demos/streaming.tsx

```tsx
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  createChart,
  type ChartInstance,
  type ChartOptions,
} from "minerva-design/charts/core";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Point = readonly [number, number];

const WINDOW = 120;
// placeholder until the texts are set (the effect that sets them runs first)
const emptyLabels: Labels = {
  cpu: "",
  seconds: "",
  aria: "",
  percent: String,
};

const nextPoint = (random: () => number, previous?: Point): Point => {
  const [x, y] = previous ?? [0, 50];
  return [x + 0.5, Math.min(100, Math.max(0, y + (random() - 0.5) * 8))];
};

/** Translated texts of the chart */
interface Labels {
  cpu: string;
  seconds: string;
  aria: string;
  percent: (value: number) => string;
}

const optionsFor = (data: readonly Point[], labels: Labels): ChartOptions => ({
  series: [{ name: labels.cpu, type: "area", data, opacity: 0.2 }],
  xAxis: { title: labels.seconds },
  yAxis: { min: 0, max: 100, format: labels.percent },
  interaction: false,
  ariaLabel: labels.aria,
});

export default function StreamingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-engine.data",
  });
  const locale = i18n.language;
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartInstance | null>(null);
  const dataRef = useRef<readonly Point[]>([]);
  const randomRef = useRef(mulberry32(17));
  const [paused, setPaused] = useState(false);
  const [count, setCount] = useState(0);
  const labelsRef = useRef<Labels | null>(null);

  // texts in the reader's language, re-applied when it changes
  useEffect(() => {
    const percent = new Intl.NumberFormat(locale, { style: "percent" });
    const labels: Labels = {
      cpu: t("cpu"),
      seconds: t("seconds"),
      aria: t("cpuAria"),
      percent: (value) => percent.format(value / 100),
    };
    labelsRef.current = labels;
    chartRef.current?.setOptions(optionsFor(dataRef.current, labels));
  }, [t, locale]);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    // same sequence on every mount
    const random = mulberry32(17);
    randomRef.current = random;
    const initial: Point[] = [];
    for (let i = 0; i < 20; i++)
      initial.push(nextPoint(random, initial[i - 1]));
    dataRef.current = initial;
    const chart = createChart(
      container,
      optionsFor(initial, labelsRef.current ?? emptyLabels),
    );
    chartRef.current = chart;
    setCount(initial.length);
    return () => {
      chart.destroy();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const data = dataRef.current;
      // a new array each time: setOptions only reprocesses changed data
      const next = [
        ...data.slice(-(WINDOW - 1)),
        nextPoint(randomRef.current, data[data.length - 1]),
      ];
      dataRef.current = next;
      chartRef.current?.setOptions(
        optionsFor(next, labelsRef.current ?? emptyLabels),
      );
      setCount((value) => value + 1);
    }, 500);
    return () => clearInterval(id);
  }, [paused]);

  const number = new Intl.NumberFormat(locale);

  return (
    <div
      style={{ display: "grid", gap: 8, width: "100%", justifyItems: "start" }}
    >
      <div ref={ref} style={{ height: 300, width: "100%" }} />
      <Button variant="outline" onClick={() => setPaused((value) => !value)}>
        {paused ? t("resume") : t("pause")}
      </Button>
      <p role="status">
        {paused
          ? t("pausedStatus", { points: number.format(count) })
          : t("streamingStatus", { points: number.format(count) })}
      </p>
    </div>
  );
}

```
