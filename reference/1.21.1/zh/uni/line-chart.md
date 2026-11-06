# 折线图

基于数字、日期或类目的折线或填充面积图。借助 GPU 可处理百万级数据点。

Package: minerva-design@1.21.1

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

本周

上周

本周与上周每日访客数

已用存储

天

60 天内的存储用量

里斯本

奥斯陆

曲线

直线

平滑

阶梯

里斯本与奥斯陆的月平均气温

计算

存储

网络

数据库

堆叠方式

堆叠

按服务堆叠的每月云支出

页面浏览量

会话数

2026 年上半年每日页面浏览量与会话数

传感器

一百万条传感器读数

{{points}} 个点 · 使用 {{renderer}} 绘制 · Ctrl / ⌘ + 滚轮缩放，拖动平移，双击重置

访客

产品发布

服务故障

90 天内的每日访客数，含一次产品发布和一次故障

室内

室外

每小时室内外温度，含缺失读数

传感器离线了几个小时：线条在此断开，而不是凭空猜测。

中位数

第 95 百分位

临界

目标 {{value}}

六小时内的 API 延迟：中位数与第 95 百分位

收盘价

周期

1 个月

3 个月

6 个月

1 年

全部

两年内的每日收盘价

步数

每日步数

{{day}}：{{steps}} 步

点按或在线条上滑动

CPU

内存

{{hour}} 时

一天内的 CPU 与内存使用率

双指缩放，双击重置；点按图例可隐藏系列。

冷冻柜温度

高于 {{value}} 报警

暂停

继续

报警：门未关？

正常

最新读数 {{value}}（{{time}}）

最近一分钟超限读数：{{readings}}

最近一分钟的冷冻柜温度，每秒更新

野生型

突变株

加入抗生素

指数生长期

对数刻度

接种后时间

CFU / mL

三种细菌培养物 24 小时的生长曲线

直线段表示增长率恒定：野生型大约每 {{minutes}} 翻一番。

在线性刻度下，数量较少的培养物看起来几乎是平的：切回对数刻度即可比较。

投资组合市值

点击一个点开始测量，再点击第二个点。

起点 {{date}}（{{value}}）：请点击第二个点。

{{from}} → {{to}}：{{change}}（{{percent}}），历时 {{days}}

清除

2026 年投资组合每日市值；点击两个点测量变化

股票

债券

黄金

房地产

基期 = 100

四类资产以 100 为基期的表现，2021 至 2026 年

{{value}} µg/m³

德里

北京

巴黎

墨西哥城

东京

圣保罗

11 月细颗粒物（PM2.5）日均浓度；虚线为世卫组织指导值 {{value}}。

超标 {{days}}/{{total}} 天

{{city}} 30 天的每日 PM2.5

## LineChart

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "LineChart"
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
    "name": "area",
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
