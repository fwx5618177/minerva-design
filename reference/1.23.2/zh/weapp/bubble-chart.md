# 气泡图

用点的大小表示第三个数值的散点图：气泡面积与数值成正比。

Package: minerva-design@1.23.2

Renderer: weapp

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

亚洲

欧洲

美洲

非洲

人口

人均 GDP

预期寿命（岁）

各国人均 GDP、预期寿命与人口

产品

收入

云存储

数据分析

移动 SDK

支付

桌面应用

硬件

咨询

相对市场份额

市场增长率

市场领先

高增长

各产品的市场份额、增长率与收入

已确认

方案

谈判

金额

商机 #{{id}}

在管道中的天数

赢单概率

{{deal}}（{{stage}}）：{{amount}}

点击一个气泡

按时长、赢单概率和金额展示的进行中商机

人均 GDP（对数坐标）

高收入

对数坐标下的人均 GDP 与预期寿命，气泡大小表示人口

可见收入范围：{{from}} – {{to}}

缩放后显示以美元计的可见范围

基础设施

安全

人员

预算

敞口

停电

硬件交付延迟

网络割接

数据泄露

权限审查积压

关键人员离职

供应商技能不足

培训缺口

许可费用上涨

汇率波动

可接受

严重

可能性 {{likelihood}} × 影响 {{impact}} = {{score}}

敞口：{{value}}

可能性

影响

按可能性、影响和成本敞口排列的项目风险

搜索

社交

视频

邮件

预算

上线于 {{date}}

上线日期

广告支出回报率

盈亏平衡

按上线日期、广告支出回报率和预算排列的营销活动

北区

南区

东区

西区

中区

两个图表使用相同的大小比例

两个图表都用最大的气泡表示 {{value}}。

每个图表都用最大的气泡表示自身的最高营收。

每平方米销售额

利润率

{{year}} 年各门店区域的每平方米销售额、利润率和营收

播放

暂停

重播

重新开始

年份：{{year}}

生育率（每名女性生育子女数）

1990 年至 2025 年各国的生育率、预期寿命和人口

## BubbleChart

Support: beta

Scatter series sized by `value` (√value diameters, minSize / maxSize / maxValue). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/bubble-chart/index",
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
    "name": "minSize",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "maxSize",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "maxValue",
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
