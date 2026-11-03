# 图表

GPU 加速的图表（WebGPU、WebGL2 或 WebGL，并以 Canvas2D 兜底），百万级数据点下仍保持 60 fps：趋势、对比、统计、占比、层级与流向、关系网络、依赖与树、金融与交易，以及 3D 图表。Chart 可混合折线、面积、柱状、散点、K 线和热力图系列；其余组件都是针对单一图表类型的预设。可以先浏览下方的图表一览：每种图表类型都有一个实时缩略图，并链接到对应页面。

Package: minerva-design@1.19.3

Renderer: uni

Locale: zh

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

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Partial<ChartLabels> | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## ShapeChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events and the sunburst drill event; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "ShapeChartOptions",
    "required": true
  }
]
```

### events

```json
[
  {
    "name": "click",
    "typeText": "[event: ShapeHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ShapeHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "toggle",
    "typeText": "[event: ShapeToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "drill",
    "typeText": "[event: ShapeDrillEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeDrillEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
