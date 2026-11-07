# 面积图

用填充面积展示随时间变化的量：默认平滑，可相互重叠、堆叠成总量，或显示为 100% 占比。悬停可查看同一 x 处的所有系列；按住 Ctrl / ⌘ 滚动滚轮或双指捏合即可缩放。

Package: minerva-design@1.22.2

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

日活跃用户

2026 年 4 月至 6 月的日活跃用户

其他

2016 至 2026 年各厂商的市场份额

自然搜索

直接访问

外链引荐

社交媒体

按流量来源堆叠的每月访问量

运行中的实例

配额

一天内自动扩缩容启动的实例数

核能

水电

风电

光伏

燃气

{{value}} 吉瓦

功率

一天内按能源类型堆叠的发电量

实际

计划

本年度累计销售额与计划对比

下载

上传

两小时内的服务器带宽，下载在零线以上，上传在零线以下

太阳能发电量

{{value}} kWh

2026 年屋顶太阳能装置的每日发电量

重置缩放

{{from}} – {{to}}：合计 {{total}}，日均 {{average}}

按住 Ctrl / ⌘ 滚动滚轮或双指缩放来放大某个季节，拖动可平移。

工程

销售

客户支持

运营

财务与人力

2025 至 2026 年各部门每月人数

所选月份的人数

{{value}} 名员工

去年

今年

黑色星期五

网络星期一

最后发货日

11 月和 12 月的每日订单，今年与去年对比

本季共 {{total}} 笔订单，同比 {{change}}。

已用

趋势

{{value}} GB

容量 {{value}}

卷

数据库

日志

用户上传

约 {{days}} 后写满（{{date}} 前后）

未来 {{days}}内不会写满

60 天的磁盘用量及其到容量上限的趋势

## AreaChart

Support: beta

Chart whose untyped series are areas: smooth by default (`curve`), `stacked` or 100% (`percent`). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/area-chart/index",
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
  },
  {
    "name": "stacked",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "percent",
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
