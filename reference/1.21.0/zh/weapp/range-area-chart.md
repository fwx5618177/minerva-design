# 范围面积图

在下边界与上边界之间填充的带状区域：适合置信区间、预测、最小-最大范围和百分位扇形图。

Package: minerva-design@1.21.0

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

95% 区间

80% 区间

实际

预测

订单

今天

月度订单及未来 12 个月的预测和置信区间

最低 – 最高

季节常年值

一年中每天的最低和最高气温

第 5 – 95 百分位

第 25 – 75 百分位

中位数

一天中响应时间的百分位

最低 – 最高

收盘价

六个月内每日交易区间与收盘价

预期值 ± {{k}}σ

实测值

异常

灵敏度

{{k}}σ 区间

每分钟请求数

一周内每分钟的 API 请求数，含预期区间及其之外的异常点

没有落在区间外的点。

异常：{{n}} 个，最近一次在 {{latest}}。

买价 – 卖价

中间价

暂停

继续

买价 {{bid}} · 卖价 {{ask}}

价差 {{value}} 个基点

某货币对过去一分钟的实时买价和卖价，以及中间价

低排放（SSP1-2.6）

低排放，可能范围

极高排放（SSP5-8.5）

极高排放，可能范围

观测值

{{value}} 限值

相对 1850–1900 年的升温

1950 年以来观测到的全球升温，以及低排放和极高排放情景下到 2100 年的预测

在低排放情景下，中位值约在 {{low}} 年超过 {{lowLimit}}，并稳定在 {{peak}}；在极高排放情景下，约在 {{high}} 年超过 {{highLimit}}。

{{level}} 置信区间

提升

无差异

显著

置信水平

测试天数

B 相对 A 的转化率提升

28 天测试期间变体 B 相对变体 A 的累计转化率提升及其置信区间

B 领先 {{lift}}，但 {{level}} 置信区间仍包含零。

B 的转化率高出 {{lift}}（{{level}} 置信区间为 {{low}} 至 {{high}}），自第 {{day}} 天起显著。

## RangeAreaChart

Support: beta

Chart whose untyped series are bands between `y0` and `y` (smooth by default). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/range-area-chart/index",
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
    "name": "curve",
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
