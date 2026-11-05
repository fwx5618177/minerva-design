# 瀑布图

展示一系列增减如何把数值从起点带到终点，并带有小计和合计：利润桥、现金流、差异分析。细虚线连接每根柱子与下一根柱子。

Package: minerva-design@1.21.1

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

收入

销售成本

毛利

研发费用

市场费用

管理费用

营业利润

利息

税费

净利润

金额

从收入到净利润的利润表

期初

期末

净现金流

从期初余额到期末余额的每月净现金流

预算

实际

销量

价格

产品组合

汇率

原材料

节约

差异

预算利润与实际利润之间差异的因素

年初

年末

招聘

内部调入

离职

内部调出

退休

人数

全年人数变动

期初 ARR

新业务

扩展

收缩

流失

期末 ARR

ARR

季度

第{{n}}季度

{{quarter}}：净新增 ARR {{net}} · 净收入留存率 {{nrr}}

{{quarter}}的 ARR 桥图

标价

经销商折扣

促销

发票价

付款条件

运费

批量返利

到手价

单价

点击柱子与标价比较

{{step}}：{{value}}，占标价的 {{share}}

从标价到到手价的价格瀑布

2019 年基准

业务增长

能效提升

可再生电力

电动车队

制冷剂

收购

2025 年

2030 年目标

{{value}} 千吨 CO₂e

排放量

变化：{{value}}

从 {{from}} 到 {{to}}

高于 2030 年目标 {{value}}

从 2019 年基准到 2025 年的排放桥图

订单录入

信用审核

拣货

质检

等待承运商

运输

清关

交付周期

耗时

作业

等待

作业占 {{total}} 中的 {{work}}（{{share}}）

按环节划分的订单交付周期

此前

当前

余额

客户付款

供应商发票

工资发放

刷卡手续费

退款

最新：{{time}} · {{kind}} {{amount}}

暂停

继续

当天资金头寸，实时更新

已承诺

新增

移除

重新估算

顺延

已完成

故事点

方向

纵向

横向

标签

连接线

冲刺范围：从承诺到完成的故事点

## WaterfallChart

Support: beta

Waterfall of changes, subtotals and totals (`steps`), colors, start, labels, locale, orientation; format() through configure(). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/waterfall-chart/index",
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
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
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
    "name": "steps",
    "typeText": "array",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "upColor",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "downColor",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "totalColor",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "start",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "connector",
    "typeText": "unknown",
    "required": false,
    "default": null
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
