# 瀑布图

展示一系列增减如何把数值从起点带到终点，并带有小计和合计：利润桥、现金流、差异分析。细虚线连接每根柱子与下一根柱子。

Package: minerva-design@1.23.2

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

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

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "WaterfallChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "labels",
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
    "name": "connector",
    "typeText": "boolean | ChartConnectorOptions | undefined",
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
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "start",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "orientation",
    "typeText": "ChartOrientation | undefined",
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
    "name": "steps",
    "typeText": "readonly WaterfallStep[]",
    "required": true
  },
  {
    "name": "upColor",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "downColor",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "totalColor",
    "typeText": "string | undefined",
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
