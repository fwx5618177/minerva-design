# 散点图

由两个值定位的点，每个点可设置大小、颜色和标签。两个轴均可缩放。

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
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

入门版

商业版

席位数

月度账单

各套餐的月度账单与席位数关系

国家

人均 GDP

预期寿命

预期寿命与人均 GDP 的关系；点的大小表示人口

簇 {{name}}

两个各含 100,000 个点的簇

{{points}} 个点 · 使用 {{renderer}} 绘制

会话时长与浏览页数的关系

分钟

页数

免费版

专业版

{{plan}}：{{minutes}} 分钟，{{pages}} 页

点按一个点

广告活动

趋势

每周广告支出

每周收入

R² = {{r2}} · 每投入 1 美元带来 +{{slope}} 收入

60 个广告活动的收入与广告支出关系，含趋势线

阿德利企鹅

帽带企鹅

巴布亚企鹅

鳍肢长度

体重

三种企鹅的鳍肢长度与体重

请求

异常值

预期

负载大小

响应时间

响应时间与负载大小的关系，异常值为红色

{{total}} 个请求中有 {{slow}} 个耗时超过预期的两倍。

读数

凉爽夜间

适宜生长区间

炎热午后

显示全部

温度

相对湿度

适宜生长区间

温室传感器的温度与湿度读数

可见范围：{{t0}} – {{t1}}，湿度 {{h0}} – {{h1}} · 视图内读数：{{points}}

选择一个区域，或使用 Ctrl / ⌘ + 滚轮缩放

工程

销售

客服

司龄

绩效评分（1–5）

公司平均

按部门划分的 90 名员工的司龄与绩效评分

{{id}} · {{department}} · {{tenure}} · 评分 {{score}} · 年薪 {{salary}}

点击圆点选中一名员工，点击空白绘图区清除选择

球员

联盟平均

高效得分手

高出手低效率

场均 {{value}} 分

球权使用率：{{value}}

真实命中率：{{value}}

球权使用率

真实命中率

16 名球员的球权使用率与投篮效率；圆点大小表示场均得分

正常

告警

最新

{{value}} mm/s

暂停

继续

最新样本：{{rpm}} rpm，{{value}} · 屏幕上的告警：{{alarms}}

转速（rpm）

振动

告警阈值

电机振动随转速变化的实时数据

哺乳动物

鼩鼱

小鼠

大鼠

兔

猫

狗

人

猪

马

牛

长颈鹿

大象

幂律拟合

{{value}} kg

{{value}} W

体重

基础代谢率

代谢率 ∝ 体重^{{exponent}}（克莱伯定律）

12 种哺乳动物的基础代谢率与体重，双对数坐标轴

## ScatterChart

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "ScatterChart"
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
