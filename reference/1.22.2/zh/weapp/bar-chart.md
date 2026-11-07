# 柱状图

并排分组或堆叠的柱状图，可叠加折线。

Package: minerva-design@1.22.2

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

第{{n}}季度

已关闭工单

每季度关闭的支持工单数

订单

7 日均值

天

每日订单数及其 7 日均值

2025 与 2026 年的季度收入

推荐者

被动者

贬损者

北美

欧洲

亚太

拉丁美洲

中东

各地区推荐者、被动者与贬损者的占比

网站

移动应用

合作伙伴

按渠道堆叠的每月订单数

销量

每季度销量

{{quarter}}：{{units}} 件

点按一根柱子

堆叠

分组

按渠道和月份的订单数

伦敦

东京

巴黎

伦敦、东京与巴黎的月平均降水量

净利润

每月净利润，盈利在零线以上，亏损在零线以下

销量

各国线上销量，从高到低

新客户

第{{n}}周

每周目标

每周新客户数与每周目标对比

{{total}} 周中有 {{reached}} 周达标（{{rate}}）。

收入

{{month}}：{{value}}

返回季度

点击某个季度查看其各月数据。

{{quarter}}：合计 {{value}}。点击某个月份查看其收入。

2026 年各季度收入；点击某个季度查看其各月数据

2026 年 {{quarter}} 各月收入

工程

产品

设计

销售

市场

支持

去年

今年

变化

与去年对比

各部门今年与去年的招聘人数

成功

已回滚

变更冻结

八周内每天的生产部署次数，分为成功与回滚

每个工作日 {{perDay}} 次部署，变更失败率 {{failure}}。

低谷

平段

高峰

充电

日均价

充电时长

{{energy}} kWh · {{duration}}

建议在 {{start}} 至 {{end}} 充电，费用 {{cost}}，比 {{plugIn}} 插上电立即充电节省 {{saving}}。

每 MWh 电价

明天每小时的日前电价，并突出显示电动车最便宜的充电时段

## BarChart

Support: beta

Chart whose untyped series are bars, grouped or `stacked`. Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/bar-chart/index",
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
    "name": "stacked",
    "typeText": "boolean",
    "required": false,
    "default": false
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
