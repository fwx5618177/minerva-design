# 雷达图

在多个量纲不同的指标上比较一个或少数几个对象（技能评估、产品评测、风味特征）。悬停多边形可高亮它及最近的指标；方向键在系列和指标之间移动，Esc 清除；点击图例项可隐藏系列。

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

问题解决

编码

系统设计

沟通

协作

责任心

候选人

{{value}} / {{max}}

候选人的面试评分卡

香气

酸度

甜度

醇厚度

苦味

余韵

埃塞俄比亚耶加雪菲

苏门答腊曼特宁

两款咖啡的风味轮廓

性能

续航

相机

屏幕

性价比

做工

三款手机的评测得分

悬停在多边形上或使用方向键比较各款手机

速度

射门

传球

盘带

防守

身体

两名足球运动员的能力值

安全

集成

报表

移动端

自动化

支持

价格

我们的产品

主要竞品

市场平均

要比较的产品

我们的产品、竞品与市场平均的能力评分

蛋白质

膳食纤维

糖

脂肪

钠

钙

水果燕麦粥

鸡蛋吐司

酸奶配格兰诺拉麦片

{{value}} NRV

{{meal}}：{{amount}}（{{share}}）

三种早餐的营养成分，以每日参考值的百分比表示

CPU

内存

磁盘 I/O

网络

延迟

错误

过去一小时平均

当前

实时更新

告警：{{metric}} 超过容量的 {{threshold}}。

负载最高的指标：{{metric}}。

服务当前负载与过去一小时平均值的对比

沟通

交付

专业能力

协作

指导

主动性

团队平均

人员

{{name}} 的 360 度评估评分与团队平均值的对比

最强项：{{strength}}（比团队 {{strengthGap}}）。待提升：{{growth}}（{{growthGap}}）。

收入

成交数

赢单率

平均订单金额

通话数

NPS

目标

实际

{{kpi}}：{{actual}}，目标 {{target}}（达成 {{attainment}}）。

一名销售代表的季度 KPI 与目标对比

点击某条轴附近查看对应 KPI。

## RadarChart

Support: beta

Radar chart: indicators, series, polygon / circle grid, levels, vertex dots, per-indicator tooltip, legend toggles. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/radar-chart/index",
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
    "name": "indicators",
    "typeText": "array",
    "required": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "levels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "dots",
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
