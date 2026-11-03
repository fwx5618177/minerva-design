# 面积图

用填充面积展示随时间变化的量：默认平滑，可相互重叠、堆叠成总量，或显示为 100% 占比。悬停可查看同一 x 处的所有系列；按住 Ctrl / ⌘ 滚动滚轮或双指捏合即可缩放。

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

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "AreaChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "stacked",
    "typeText": "boolean | undefined",
    "required": false
  },
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
    "name": "percent",
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
  },
  {
    "name": "curve",
    "typeText": "\"step\" | \"linear\" | \"smooth\" | undefined",
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
