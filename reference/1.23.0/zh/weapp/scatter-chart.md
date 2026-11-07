# 散点图

由两个值定位的点，每个点可设置大小、颜色和标签。两个轴均可缩放。

Package: minerva-design@1.23.0

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

Chart whose untyped series are dots, zooming on both axes. Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/scatter-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": 320
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
