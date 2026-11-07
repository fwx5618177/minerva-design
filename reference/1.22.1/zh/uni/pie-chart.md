# 饼图 / 环形图

展示整体中各部分的占比：饼图、环形图（中心可显示总计）和南丁格尔玫瑰图。适合少量类别（建议不超过 8 个）、更关注占比而非精确比较的场景。悬停或使用方向键高亮扇区，Esc 清除；点击图例项可隐藏对应扇区。

Package: minerva-design@1.22.1

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

自然搜索

直接访问

社交媒体

付费广告

外链引荐

电子邮件

{{sessions}} 次会话 · {{share}}

最近 30 天按流量来源统计的网站会话

{{source}}：{{sessions}} 次会话（占流量的 {{share}}）

点击一个扇区（或聚焦图表后按 Enter）以选择来源

企业版

商业版

专业版

入门版

月收入

按套餐统计的月度经常性收入

电子邮件

在线客服

网页表单

电话

社交媒体

社区

标签位置

外部

内部

无

标签内容

名称

数值

百分比

{{tickets}} 个工单 · {{share}}

按渠道统计的支持工单

月平均降水量

其他

出货量

{{units}} 台 · {{share}}

各厂商的智能手机市场份额

居住

饮食

交通

休闲

房租

水电燃气

保险

食品杂货

餐馆

公共交通

汽车

旅行

订阅

运动

按明细项统计的月度预算

按类别统计的月度预算

{{name}}：{{amount}}（{{share}}）

悬停在环上查看类别或明细项

亚太

欧洲

北美

拉丁美洲

手机

桌面

平板

{{region}}按设备统计的会话

美国股票

国际股票

债券

房地产

大宗商品

现金

显示的资产类别

全部显示

所选

总市值

占投资组合的 {{share}}

按资产类别划分的投资组合

显示 {{total}} 个资产类别中的 {{shown}} 个：{{value}}，占投资组合的 {{share}}。

深色模式

离线模式

公开 API

更多集成

自定义报表

我们接下来应该开发哪个功能？

票

{{votes}} 票 · {{share}}

按选项划分的实时投票结果

暂停

继续

重置

领先：{{answer}}

计算

数据库

存储

网络

虚拟机

Kubernetes

无服务器函数

SQL 数据库

NoSQL 数据库

内存缓存

对象存储

块存储

备份

数据传输

CDN

负载均衡器

云账单

全部类别

点击查看其服务

按服务划分的{{category}}费用

按类别划分的月度云账单

{{service}}：{{amount}}，占{{category}}的 {{share}}。

{{category}}：{{amount}}，占账单的 {{share}}。点击某项服务查看其占比。

月度账单：{{total}}。点击某个类别查看其服务。

非常不满意

不满意

一般

满意

非常满意

第 {{n}} 季度

季度

CSAT

{{answers}} 份回答 · {{share}}

{{quarter}}的客户满意度回答

CSAT 为 {{csat}}，共 {{respondents}} 位受访者。

CSAT 为 {{csat}}，较{{previous}}变化 {{delta}} 个百分点，共 {{respondents}} 位受访者。

## DonutChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "DonutChart"
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
    "name": "rose",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "\"none\" | \"inside\" | \"outside\" | undefined",
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
    "name": "data",
    "typeText": "readonly ShapeDatum[]",
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
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "startAngle",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "padAngle",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "cornerRadius",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "labelContent",
    "typeText": "readonly (\"value\" | \"name\" | \"percent\")[] | undefined",
    "required": false
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
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

## PieChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "PieChart"
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
    "name": "rose",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "\"none\" | \"inside\" | \"outside\" | undefined",
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
    "name": "data",
    "typeText": "readonly ShapeDatum[]",
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
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "startAngle",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "padAngle",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "cornerRadius",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "labelContent",
    "typeText": "readonly (\"value\" | \"name\" | \"percent\")[] | undefined",
    "required": false
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
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
