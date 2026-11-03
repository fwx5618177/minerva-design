# 图表

GPU 加速的图表（WebGPU、WebGL2 或 WebGL，并以 Canvas2D 兜底），百万级数据点下仍保持 60 fps：趋势、对比、统计、占比、层级与流向、关系网络、依赖与树、金融与交易，以及 3D 图表。Chart 可混合折线、面积、柱状、散点、K 线和热力图系列；其余组件都是针对单一图表类型的预设。可以先浏览下方的图表一览：每种图表类型都有一个实时缩略图，并链接到对应页面。

Package: minerva-design@1.19.3

Renderer: native

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

#### 渲染方式

数据层使用 WebGPU 绘制，依次回退到 WebGL2、WebGL 和 Canvas2D（renderer="auto"）；就绪后根元素会带上 data-renderer。图表由四层叠加而成：

Canvas2D 背景层：网格、坐标轴和标注区域

GPU 数据层：折线、面积、柱和散点

Canvas2D 覆盖层：刻度标签、数据点标签、高亮

DOM：提示框和图例（可选中、无障碍的文本）

#### 大数据量

将大型系列以类型化数组的列形式传入（{ x: Float64Array, y: Float64Array }）：不会为每个点创建对象。x 有序时，命中检测使用二分查找且只绘制可见范围，因此百万点的折线图或散点图在 WebGPU、WebGL2 和 WebGL 上仍保持 60 fps。

#### 交互与键盘

Ctrl / ⌘ + 滚轮或触控板双指捏合可缩放（普通滚轮滚动页面），缩放后可拖拽平移，双击重置。

聚焦图表后：← / → 移动高亮点（会播报给屏幕阅读器），+ / - 缩放，0 重置，Esc 清除。

#### 主题与引擎

颜色来自 Minerva 的 CSS 变量：定义了 --chart-series-1..8 时使用它们，否则使用主题色（--primary-color、--success-color……）。切换主题会自动生效。

minerva-design/charts/core 是不依赖 React 的同一引擎：createChart(container, options) 可用于任意框架。

#### 图表家族

下方按六个分组展示了每种图表类型的实时缩略图，每个标题都链接到对应图表的页面：

基础 2D：折线图、面积图、范围面积图、柱状图、条形图、组合图 / 双轴图、散点图、气泡图和迷你图。

统计、KPI 与计划：直方图、箱线图、瀑布图、热力图、日历热力图、仪表盘、子弹图、径向条形图和甘特图。

占比、层级与流向：饼图与环形图、雷达图、漏斗图、四象限图、矩形树图、旭日图和桑基图。

关系与层级图：关系图（力导向、环形和弧线布局，GPU 绘制，可达数万个节点）、依赖图（分层 DAG，可高亮关键路径）、树图（整齐树、径向树、思维导图、组织架构图）和弦图。

金融与交易：K 线图、专业交易图表（成交量分布、画线工具、K 线回放、多图联动和下单）及其 21 种内置技术指标（MA / EMA / WMA、布林带、VWAP、成交量、MACD、RSI、KDJ、ATR、抛物线 SAR、一目均衡表、SuperTrend、肯特纳通道、唐奇安通道、OBV、CCI、随机 RSI、DMI、威廉指标、MFI），以及深度图、订单簿、订单簿热力图和逐笔成交。

3D：3D 散点图与 3D 折线图（支持发光、叠加混合的点云）、3D 曲面图和3D 柱状图。

缩略图只在接近可视区域时才挂载（IntersectionObserver）：页面保持流畅，同时占用的 GPU 上下文也不会超过浏览器的上限。订单簿类组件播放模拟行情，离开屏幕时自动暂停。

GPU 图表按四级选择渲染后端：WebGPU → WebGL2 → WebGL → Canvas2D，因此能在所有浏览器中渲染，并能在 GPU 丢失后继续工作。setDefaultChartRenderer() 可一次性修改所有图表的默认后端：本文档图表页面顶部固定的渲染器选择器就是用它实现的。详见图表引擎和性能页面。

收入

目标

每月收入与目标对比

p95 延迟

正常范围

部署

SLO {{value}}

分钟

p95 延迟，含 SLO 与正常范围

{{month}}：{{value}}（{{series}}）

点按柱子或折线

随机游走

渲染器

50,000 个点的随机游走

请求：{{requested}} · 实际绘制：{{active}}

访问量

注册数

网页

订单

第{{n}}季度

团队 {{name}}

免费版

专业版

团队版

速度

质量

成本

支持

规模

供应商 {{name}}

访问

注册

激活

付费

产品

设计

研发

市场推广

销售

市场

发布

路线图

邮件

清理

计划

立即做

放弃

委派

##### 折线图

趋势

每月访问量与注册数

##### 面积图

平滑、堆叠

各平台用户数（堆叠）

##### 柱状图

数值标签、逐柱颜色

每季度订单数

##### 散点图

相关性、聚类

两组测量值

##### K 线图

开盘、最高、最低、收盘

日线行情

##### 热力图

网格上的数值

按星期和时段的负载

##### 迷你图

文字大小的趋势

##### 饼图

占比

浏览器份额

##### 环形图

带总数的占比

各套餐用户数

##### 雷达图

多维度画像

供应商对比

##### 仪表盘

单个数值与目标

##### 漏斗图

阶段与转化

注册漏斗

##### 矩形树图

层级结构的占比

各部门预算

##### 四象限图

优先级矩阵

按紧急和重要程度排列的任务

##### 范围面积图

最小–最大区间、预测

每月日均最低与最高气温

##### 条形图

排名、长标签

各编程语言的开发者使用比例

##### 组合图

双轴上的柱与折线

各季度营收与增长率

##### 气泡图

用大小表示第三个数值

各营销活动的成本、注册数与触达人数

##### 直方图

分布

响应时间分布

##### 箱线图

四分位数与异常值

各服务的响应时间

##### 瀑布图

各项对总量的贡献

年度经常性收入桥接

##### 日历热力图

每日活跃度

每日提交次数

##### 子弹图

KPI 与目标对比

季度 KPI 与目标

##### 径向条形图

进度环

季度目标完成进度

##### 甘特图

排期与进度

发布计划

##### 旭日图

多层级结构

各部门及团队人数

##### 桑基图

阶段之间的流量

各来源访问到注册的流向

##### 专业交易图表

K 线、成交量分布、平移与缩放

BTC/USDT 小时价格、均线、成交量与成交量分布

##### 技术指标

21 种指标

BTC/USDT 日线价格、SuperTrend 与 MACD

##### 深度图

买卖盘累计量

实时市场深度

##### 订单簿

实时价格档位

实时订单簿

##### 订单簿热力图

流动性随时间的变化

最近 30 秒的流动性热力图

##### 逐笔成交

成交明细

最新成交

##### 3D 散点图

三维空间中的聚类

三维空间中的三组点

##### 3D 折线图

运动轨迹

三维螺旋轨迹

##### 3D 曲面图

z = f(x, y)、地形

波纹曲面

##### 3D 柱状图

类别网格上的数值

各地区各季度销售额

##### 关系图

服务之间的调用

微服务及其相互调用的网络

##### 弧线图

同时出现的话题

按同一工单中同时出现的频率连接的客服话题

##### 依赖图

流水线与关键路径

数据流水线的步骤及其依赖关系，并标出关键路径

##### 组织架构图

汇报关系

从首席执行官到各团队的组织架构图

##### 思维导图

围绕主题的想法

暑期旅行的思维导图

##### 弦图

分组之间的流动

一个季度内客户在各套餐之间的迁移

##### 发光 3D 散点

叠加发光效果

由发光恒星组成的旋涡星系

负载

收入

收入趋势

错误

错误趋势

用户

可用性评分

紧急程度

重要程度

新访客

回访访客

手机

桌面

平板

页面浏览量

访客

订单

转化率

{{metric}}，最近 30 天

每日新访客与回访访客（堆叠）

按设备统计的访客

浏览量最高的页面

电子邮件

在线聊天

电话

社交媒体

社区

调色板

主题

色盲友好

蓝色系

暖色系

按渠道统计的每季度支持请求

各渠道支持请求的占比

气温

开发者

增长率

触达人数

网关

搜索

结账

图片

去年

新客户

增购

流失

调价

今年

营收（千美元）

利润率（%）

满意度

营收

活跃用户

留存率

调研

设计

开发

测试

差

一般

良好

最大值

上四分位数

中位数

下四分位数

最小值

异常值

请求数

响应时间

金额

今天

任务

进度

研发

平台

Web

移动端

销售

欧洲、中东和非洲

美洲

运营

客服

财务

搜索

社交媒体

邮件

网站

已注册

离开

{{value}} 人

价格

开盘

最高

最低

收盘

簇 {{name}}

轨迹

波纹

销售额

北区

南区

东区

西区

{{value}} 位客户

核心

旋臂

API 网关

Web 应用

认证

用户

订单

支付

搜索

库存

数据库

缓存

消息队列

接入层

服务层

数据层

登录

账单

导出

移动端

速度

通知

抽取

清洗

补全

关联

训练

报表

发布

首席执行官

首席技术官

首席财务官

首席运营官

平台

产品

财务

销售

客服

暑期旅行

交通

住宿

美食

活动

火车

租车

酒店

露营

集市

餐厅

博物馆

徒步

海滩

免费版

入门版

专业版

企业版

## Chart

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Chart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly ChartSeries[]",
    "typeRef": "type:deda0bcb88251b63a5de",
    "required": true,
    "description": "Data series; each sets its own `type`"
  },
  {
    "name": "yAxis2",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Right value axis of the series with `yAxis: \"right\"` (dual axis charts)"
  },
  {
    "name": "orientation",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "ChartOrientation | undefined",
    "typeRef": "type:872af3679a2d7fcf3d26",
    "default": "vertical",
    "required": false,
    "description": "`horizontal` puts the x axis (categories) down the left side"
  },
  {
    "name": "dependencies",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly ChartDependency[] | undefined",
    "typeRef": "type:824f958ada315e58d00e",
    "required": false,
    "description": "Arrows between categories, e.g. the dependencies of a Gantt chart (`ganttSeries(...).dependencies`): elbows from the end of a bar to the start of another"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "xAxis",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "X axis"
  },
  {
    "name": "yAxis",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Y axis"
  },
  {
    "name": "legend",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name (tap toggles a series)"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip shown on tap / while scrubbing; `false` disables it"
  },
  {
    "name": "crosshair",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the finger"
  },
  {
    "name": "annotations",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas, reference lines and texts"
  },
  {
    "name": "interaction",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Pinch to zoom, drag to pan when zoomed, double tap to reset; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "renderTooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "node",
    "typeText": "((event: ChartHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:66d650d38e6b7d308d32",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip (replaces the default content)"
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Test identifier of the root view"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:170f27b8f07028fffd08",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent | null",
        "typeRef": "type:92ec77c4587c7e27430b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the highlighted points change"
  },
  {
    "name": "onPointClick",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent) => void) | undefined",
    "typeRef": "type:d586363317763d2fd3f3",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a point (or bar) is tapped"
  },
  {
    "name": "onPlotClick",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartPlotClickEvent) => void) | undefined",
    "typeRef": "type:3ab7d8ab926fce010082",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartPlotClickEvent",
        "typeRef": "type:db60e2cf00fabb558740"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the plot area is tapped where there is no point"
  },
  {
    "name": "onZoom",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:e6c98e88ed542ed60f34",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartView",
        "typeRef": "type:f1de933b453f8db86ff3"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the user zooms or pans"
  }
]
```

## ShapeChart

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "ShapeChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "options",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "ShapeChartOptions",
    "typeRef": "type:54137e999ba8be2bca01",
    "required": true,
    "description": "Options of the chart, by `type` (pie, radar, gauge, funnel, treemap and every other shape type of the engine)"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false,
    "description": "Height of the chart (the legend included)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "renderTooltip",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "node",
    "typeText": "((event: ShapeHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:9333c89b3161f5ff3652",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip (replaces the default content)"
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Test identifier of the root view"
  }
]
```

### events

```json
[
  {
    "name": "onDrill",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeDrillEvent) => void) | undefined",
    "typeRef": "type:ed8fc399a1b3c2c536fd",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeDrillEvent",
        "typeRef": "type:2f6344534a4b788a1925"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a sunburst drills into a parent or back up"
  },
  {
    "name": "onHover",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:fa632874a08b24956e5f",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent | null",
        "typeRef": "type:5ce60fcc1021d329ffba"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the highlighted mark changes (press and drag over the chart)"
  },
  {
    "name": "onClick",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:8504b594a968c22eaac5",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a mark is tapped"
  },
  {
    "name": "onToggle",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:d096120cd0ab66afae24",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeToggleEvent",
        "typeRef": "type:4b4244045a32e66c0a25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a legend item is tapped (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
  }
]
```

## API

```json
{
  "native:ChartProps": {
    "source": "native/src/components/Chart/types.ts",
    "description": "Props of Chart: any mix of line, area, bar, scatter and box plot series",
    "kind": "interface",
    "extends": [
      "ChartCommonProps"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly ChartSeries[]",
        "required": true,
        "description": "Data series; each sets its own `type`"
      },
      {
        "name": "yAxis2",
        "type": "ChartAxisOptions",
        "required": false,
        "description": "Right value axis of the series with `yAxis: \"right\"` (dual axis charts)"
      },
      {
        "name": "orientation",
        "type": "ChartOrientation",
        "required": false,
        "default": "\"vertical\"",
        "description": "`horizontal` puts the x axis (categories) down the left side"
      },
      {
        "name": "dependencies",
        "type": "readonly ChartDependency[]",
        "required": false,
        "description": "Arrows between categories, e.g. the dependencies of a Gantt chart (`ganttSeries(...).dependencies`): elbows from the end of a bar to the start of another"
      }
    ]
  },
  "native:ChartCommonProps": {
    "source": "native/src/components/Chart/types.ts",
    "description": "Props shared by every chart component",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "height",
        "type": "DimensionValue",
        "required": false,
        "default": "320",
        "description": "Height of the chart (the legend included)"
      },
      {
        "name": "width",
        "type": "DimensionValue",
        "required": false,
        "default": "\"100%\"",
        "description": "Width of the chart"
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
        "name": "legend",
        "type": "boolean | ChartLegendOptions",
        "required": false,
        "description": "Legend; shown by default when several series have a name (tap toggles a series)"
      },
      {
        "name": "tooltip",
        "type": "boolean | ChartTooltipOptions",
        "required": false,
        "description": "Tooltip shown on tap / while scrubbing; `false` disables it"
      },
      {
        "name": "crosshair",
        "type": "boolean",
        "required": false,
        "description": "Vertical guide line following the finger"
      },
      {
        "name": "annotations",
        "type": "readonly ChartAnnotation[]",
        "required": false,
        "description": "Background areas, reference lines and texts"
      },
      {
        "name": "interaction",
        "type": "boolean | ChartInteractionOptions",
        "required": false,
        "default": "true",
        "description": "Pinch to zoom, drag to pan when zoomed, double tap to reset; `false` makes the chart static"
      },
      {
        "name": "padding",
        "type": "ChartPadding",
        "required": false,
        "description": "Space around the plot area, in pixels"
      },
      {
        "name": "palette",
        "type": "readonly string[]",
        "required": false,
        "description": "Series colors (defaults to the `chart-series-1..8` tokens, then the theme colors)"
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
        "default": "the device language when the runtime exposes it, else English",
        "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
      },
      {
        "name": "labels",
        "type": "Partial<ChartLabels>",
        "required": false,
        "description": "Overrides of the built-in texts of the `locale`"
      },
      {
        "name": "onHover",
        "type": "(event: ChartHoverEvent | null) => void",
        "required": false,
        "description": "Called when the highlighted points change"
      },
      {
        "name": "onPointClick",
        "type": "(event: ChartHoverEvent) => void",
        "required": false,
        "description": "Called when a point (or bar) is tapped"
      },
      {
        "name": "onPlotClick",
        "type": "(event: ChartPlotClickEvent) => void",
        "required": false,
        "description": "Called when the plot area is tapped where there is no point"
      },
      {
        "name": "renderTooltip",
        "type": "(event: ChartHoverEvent) => ReactNode",
        "required": false,
        "description": "React content of the tooltip (replaces the default content)"
      },
      {
        "name": "onZoom",
        "type": "(view: ChartView) => void",
        "required": false,
        "description": "Called when the user zooms or pans"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Styles of the root view"
      },
      {
        "name": "testID",
        "type": "string",
        "required": false,
        "description": "Test identifier of the root view"
      },
      {
        "name": "ref",
        "type": "Ref<ChartHandle>",
        "required": false,
        "description": "Imperative handle"
      }
    ]
  },
  "native:ChartHandle": {
    "source": "native/src/components/Chart/types.ts",
    "description": "Imperative handle of the chart components (`ref`)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "resetZoom",
        "type": "() => void",
        "required": true,
        "description": "Shows the whole data range"
      },
      {
        "name": "getView",
        "type": "() => ChartView | null",
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
        "description": "Plot area in pixels of the chart (`null` before the first layout)"
      },
      {
        "name": "getController",
        "type": "() => ChartController | null",
        "required": true,
        "description": "The platform-free chart controller (scene, gestures, pixel <-> data)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 混合系列

每个系列各自设置 type：柱和折线共用类目轴，图例位于底部。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/charts/native/mixed.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { Chart, useTheme } from "minerva-design/native";

// Thousand USD per month, January to June
const revenue = [42, 51, 48, 69, 74, 88];
const target = [45, 50, 55, 60, 65, 70];

export default function Mixed() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const { colors } = useTheme();
  const [status, setStatus] = useState<string | null>(null);
  const month = new Intl.DateTimeFormat(i18n.language, { month: "short" });
  const months = revenue.map((_, m) => month.format(new Date(2026, m, 1)));
  const usd = new Intl.NumberFormat(i18n.language, {
    style: "currency",
    currency: "USD",
    notation: "compact",
  });
  const format = (value: number) => usd.format(value * 1000);
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <Chart
        height={240}
        ariaLabel={t("revenueAria")}
        series={[
          {
            name: t("revenue"),
            type: "bar",
            data: months.map((m, i) => [m, revenue[i]] as const),
          },
          {
            name: t("target"),
            type: "line",
            data: months.map((m, i) => [m, target[i]] as const),
          },
        ]}
        yAxis={{ format }}
        onPointClick={(event) => {
          const item = event.items[0];
          if (item)
            setStatus(
              t("pointStatus", {
                month: event.xLabel,
                value: format(item.y),
                series: item.seriesName,
              }),
            );
        }}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status ?? t("tapHint")}
      </Text>
    </View>
  );
}

```
