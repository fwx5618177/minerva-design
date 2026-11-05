# 热力图

按数值着色的单元格网格，两个轴都可以是类目或数字：按星期和小时的活跃度、相关性矩阵、某项指标的分布图等。悬停单元格会将其浮起、高亮所在行列，并在色例上标出其数值。

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

会话数

按星期和小时统计的会话数

距平

1995 至 2024 年的月气温距平

信号

200 × 100 米楼层内的 Wi-Fi 信号强度

{{cells}} 个单元格 · 使用 {{renderer}} 绘制 · Ctrl / ⌘ + 滚轮缩放，拖动平移，双击重置

贡献

一年内每天的贡献次数

过去一年共 {{total}} 次贡献

会话数

页面浏览量

注册数

收入

流失

支持工单

相关系数

六项产品指标的相关系数矩阵

第 {{n}} 个月

留存

各月注册用户群的留存率

桌面端

移动端

平板

自然搜索

付费搜索

社交媒体

邮件

外链推荐

直接访问

{{source}} · {{device}}：{{sessions}} 次会话产生 {{orders}} 笔订单，转化率 {{rate}}：

高于平均值 {{value}}

低于平均值 {{value}}

点击单元格查看其会话数和订单数。

转化率

按流量来源和设备划分的转化率

机柜 {{n}}

传感器 {{n}}

暂停

继续

最热：{{rack}} {{sensor}}，{{value}} · {{alarms}} 个传感器超过 {{limit}}

进风温度

十个服务器机柜传感器的实时进风温度

猫

狗

鸟

汽车

卡车

实际为{{actual}}，预测为{{predicted}}

{{value}} 张图片（占该类别 {{share}}）

召回率：{{value}}

精确率：{{value}}

分类错误

准确率：{{images}} 张测试图片中的 {{value}}

类别占比

预测类别

实际类别

五个类别的图像分类器混淆矩阵

北区

南区

东区

西区

中区

第 {{n}} 季度

指标

营收

较 2025 年增长

毛利率

{{region}}{{quarter}}

最好：{{best}}（{{bestValue}}）· 最弱：{{worst}}（{{worstValue}}）

2026 年按区域和季度划分的销售指标

## HeatmapChart

Support: beta

Grid of cells colored by value from `data` cells (categories or numbers on both axes), colorScale / valueRange / radius; format() through configure(). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/heatmap-chart/index",
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
    "name": "data",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xCategories",
    "typeText": "array",
    "required": false
  },
  {
    "name": "yCategories",
    "typeText": "array",
    "required": false
  },
  {
    "name": "colorScale",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "valueRange",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "colorMidpoint",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "radius",
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
