# 图表引擎

React 图表背后不依赖框架的引擎：createChart 将图表挂载到任意元素，createCanvasChart 可在任意 2D 画布上绘制（小程序、OffscreenCanvas），createChartController 则为没有画布的宿主计算场景。createShapeChart 和 createCanvasShapeChart 以同样的方式绘制饼图、环形图、雷达图、仪表盘、漏斗图、矩形树图、旭日图、桑基图、弦图、径向条形图、子弹图和日历热力图。其他图表家族有各自的引擎：createTradingChart、createDepthChart / createOrderBook / createOrderBookHeatmap / createTimeAndSales、createChart3D 和 createGraphChart；setDefaultChartRenderer() 可设置所有 GPU 图表的渲染后端。

Package: minerva-design@1.23.1

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
