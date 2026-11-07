# 热力图

按数值着色的单元格网格，两个轴都可以是类目或数字：按星期和小时的活跃度、相关性矩阵、某项指标的分布图等。悬停单元格会将其浮起、高亮所在行列，并在色例上标出其数值。

Package: minerva-design@1.22.2

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

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

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "HeatmapChart"
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
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "radius",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly HeatmapCell[]",
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
    "name": "xCategories",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "yCategories",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "colorScale",
    "typeText": "readonly string[] | ChartColorScheme | undefined",
    "required": false
  },
  {
    "name": "valueRange",
    "typeText": "readonly [number, number] | undefined",
    "required": false
  },
  {
    "name": "colorMidpoint",
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
