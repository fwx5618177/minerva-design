# 组合图 / 双轴图

在一张图中组合柱、线和面积，可使用一个或两个数值轴：收入与增长率、降雨量与气温、帕累托图。

Package: minerva-design@1.20.2

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

{{year}} 年第 {{n}} 季度

收入

同比增长

季度收入及其同比增长

降雨量

气温

东京每月降雨量和气温

访问量

转化率

营销活动

两个月内每日访问量与转化率

退货

累计占比

尺码不合适

商品损坏

与描述不符

送达过晚

改变主意

发错商品

其他

按原因统计的退货及其累计占比

页面浏览量

中文（zh-CN）

法语（fr-FR）

每日页面浏览量与转化率，{{locale}}

营收

用户数

用户数（对数）

2016 至 2025 年的年营收与对数轴上的用户数

{{value}} kWh

光伏发电

用电量

电池电量

夜间

{{value}} 电池

两天内自给率为 {{share}}，从电网购电 {{imported}}。

每小时电量

某住宅两天内每小时的光伏发电量和用电量，以及电池电量

库存水平

到货

促销

安全库存

再订货点

点击某一天或某次到货。

{{id}}：{{ordered}} 订购 {{quantity}} 件，经过 {{lead}} 于 {{arrived}} 到货。

{{date}} 库存 {{units}} 件。

{{date}} 库存仅 {{units}} 件，低于安全库存。

件数

某商品三个月内的每日库存水平，含到货、再订货点和安全库存

请求数

错误率

发布

每 30 分钟请求数

某 Web API 一天内的请求数和错误率，以及发布记录

发布 {{version}} 后，错误率于 {{time}} 达到峰值 {{peak}}，直到回滚至 {{rollback}}。

{{value}} 点

开始

剩余工作量

已完成

理想进度

新增 {{value}}

理想：剩余 {{value}}

剩余 {{value}}

当天完成 {{value}}

落后理想进度 {{value}}

领先理想进度 {{value}}

故事点

迭代燃尽图：十个工作日内的剩余工作量、每日完成点数和理想燃尽线

剩余 {{left}}，按每天 {{velocity}} 的速度，迭代结束时约有 {{forecast}} 无法完成。

剩余 {{left}}，按每天 {{velocity}} 的速度，迭代进度正常。

## MixedChart

Support: beta

Bars, lines, areas and dots each with its `type`, right axis (`yAxis2`), `stackMode` and `orientation`. Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/mixed-chart/index",
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
  },
  {
    "name": "yAxis2",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "stackMode",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "orientation",
    "typeText": "string",
    "required": false,
    "default": ""
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
