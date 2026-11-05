# 迷你图

没有坐标轴和图例、只有文字大小的迷你图，在数字旁展示趋势走向：用于 KPI 卡片、表格单元格或列表中。悬停即可读取数值。

Package: minerva-design@1.21.0

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

订单

每周订单，{{variant}}

收入

活跃用户

注册数

p95 延迟

{{metric}}，最近 30 天

服务

API 网关

身份认证

搜索

支付

通知

请求数 / 分钟

p95 延迟（30 天）

{{service}}最近 30 天的 p95 延迟

今日

变化

服务延迟

代码

Acme 集团

Nova 生物科技

Orbit 航天

Kite 机器人

Luma 能源

{{symbol}} 今日价格

价格

自选股

最近 14 天的访问量：

访问量

最近 14 天的访问量

第 7 天部署后错误数激增，随后恢复正常：

错误

最近 14 天每天的错误数

这两周的午后气温：

气温

最近 14 天的午后气温

CPU

{{server}} 的 CPU 使用率

告警

正常

日活跃用户

最近一天：{{date}}

{{date}} · 自 9 月 1 日以来 {{change}}

9 月 1 日至 10 月 31 日的日活跃用户

{{value}} 步

完成目标的 {{value}}

{{days}} 天中有 {{reached}} 天达到 {{goal}} 步的目标

步数

四周内每天的步数及每日目标

雷克雅未克

蒙特利尔

东京

开罗

新加坡

悉尼

最高 {{max}}（{{maxMonth}}）· 最低 {{min}}（{{minMonth}}）

{{city}} 每月平均日最高气温

时段

7 天

30 天

90 天

后半段对比前半段

对比上一时段

最近 {{period}} 的每日营收

## Sparkline

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Sparkline"
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
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "type",
    "typeText": "\"bar\" | \"line\" | \"area\" | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Partial<ChartLabels> | undefined",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "data",
    "typeText": "ChartSeriesData",
    "required": true
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "curve",
    "typeText": "\"step\" | \"linear\" | \"smooth\" | undefined",
    "required": false
  },
  {
    "name": "reference",
    "typeText": "number | undefined",
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
