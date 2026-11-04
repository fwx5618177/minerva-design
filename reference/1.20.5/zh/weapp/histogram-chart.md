# 直方图

把原始样本按等宽区间统计分布，从几百个值到数百万个值都适用。

Package: minerva-design@1.20.5

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

请求数

一百万个请求延迟的分布及 p50、p95 和 p99

分箱规则

自动

Sturges

10 个分箱

40 个分箱

学生

分数

考试分数的分布

客户

年龄

客户的年龄分布

对照组

新版引导

会话时长（分钟）

A/B 测试两组的会话时长

正态拟合

规格下限

规格上限

名义值

已调整刀具

均值 {{mean}}，σ {{sd}}，Cpk {{cpk}}，超差 {{ppm}} ppm：

能力充足

能力不足

零件

直径

轴直径分布，含规格界限和拟合的正态曲线

包邮

中位数 {{value}}

p99 {{value}}

{{share}} 的订单达到 {{threshold}} 的包邮门槛。

订单

订单金额（对数刻度）

对数刻度下的订单金额分布

暂停

继续

重置

{{share}} 的电话在 {{target}} 内接听，p90 为 {{p90}}：

达到目标

未达目标

电话

等待时间

目标

p90

最近 600 通客服电话等待时间的实时分布

{{share}} 的员工

{{value}} 名员工（{{share}}）

点击查看累计占比

点击柱子，查看通勤时间更短的员工占比。

{{share}} 的员工（{{employees}} 人）通勤时间不超过 {{limit}}。

员工

单程通勤时间

员工通勤时间分布

## HistogramChart

Support: beta

Histogram of the raw `values` (bins rule or count, domain, nice), extra series over the bins; formatBin() through configure(). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/histogram-chart/index",
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
    "name": "values",
    "typeText": "array",
    "required": false
  },
  {
    "name": "bins",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "domain",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "nice",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "color",
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
