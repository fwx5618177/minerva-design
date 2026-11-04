# 雷达图

在多个量纲不同的指标上比较一个或少数几个对象（技能评估、产品评测、风味特征）。悬停多边形可高亮它及最近的指标；方向键在系列和指标之间移动，Esc 清除；点击图例项可隐藏系列。

Package: minerva-design@1.20.4

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

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

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "RadarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "animation",
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
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "dots",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"circle\" | \"polygon\" | undefined",
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
    "name": "series",
    "typeText": "readonly RadarSeries[]",
    "required": true
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "indicators",
    "typeText": "readonly RadarIndicator[]",
    "required": true
  },
  {
    "name": "levels",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "click",
    "typeText": "[event: ShapeHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ShapeHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "toggle",
    "typeText": "[event: ShapeToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
