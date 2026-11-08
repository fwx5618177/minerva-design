# 仪表盘

在弧线上展示单个数值及其所处的量程，可配合彩色阈值区间：KPI、资源使用率、评分等。value 变化时，弧线（和指针）会从当前位置平滑过渡。

Package: minerva-design@1.23.0

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

CPU

内存

磁盘

{{metric}}使用率

净推荐值

请求数 / 秒

实时更新的每秒请求数

暂停更新

继续更新

车速

速度表：{{speed}}

刹车

加速

存储

API 调用

席位

构建分钟数

{{used}} / {{limit}}

{{quota}}：已使用配额的 {{share}}

30 天可用性

目标：{{value}}

30 天可用性与目标对比

剩余错误预算

停机 {{used}}，允许 {{budget}}

本月剩余的错误预算

温度单位

°C

°F

目标

室温：{{value}}

温控器目标温度

降低目标温度

提高目标温度

正在制热至 {{target}}（室温：{{room}}）

正在制冷至 {{target}}（室温：{{room}}）

保持 {{target}}（室温：{{room}}）

申请人

信用评分

差

一般

良好

很好

优秀

位于量程的 {{share}} 处

{{name}} 的信用评分

{{name}}：{{score}}。{{advice}}

大多数贷款机构会拒绝申请。

可能获批，但利率较高。

可按标准利率申请大多数贷款。

可获得优于平均水平的利率。

可获得最优惠的利率。

已充电

续航：{{range}}

汽车电池电量

已插电

重置

已充满

已拔出

快速充电中

超过 80%，慢速充电中

{{minutes}}后达到 80%

{{value}} 转/分

{{value}} 兆瓦

深色面板

转子转速

输出功率

机舱温度

风力发电机的{{reading}}：{{value}}

## GaugeChart

Support: beta

Gauge: value arc on a track, min / max, sweep, thickness, colored bands, needle, end / band ticks; animates to new values. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/gauge-chart/index",
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
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
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
    "name": "hidden",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "animation",
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
    "name": "texts",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "value",
    "typeText": "number",
    "required": false,
    "default": 0
  },
  {
    "name": "min",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "max",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "sweep",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "thickness",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "bands",
    "typeText": "array",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "needle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "ticks",
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
    "typeText": "NativeShapeHoverEvent",
    "description": "Highlighted mark after a tap (index -1 when cleared)."
  },
  {
    "name": "click",
    "typeText": "NativeShapeHoverEvent",
    "description": "A mark was tapped."
  },
  {
    "name": "toggle",
    "typeText": "{ index: number; hidden: boolean; hiddenIndexes: number[] }",
    "description": "A legend item was tapped (or toggle() called); controlled charts must publish hiddenIndexes through hidden."
  },
  {
    "name": "drill",
    "typeText": "{ path: string[] }",
    "description": "Sunburst: a parent or the center was tapped (or drill() called); controlled charts must publish path through drillPath."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
