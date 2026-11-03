# 弦图

展示围绕圆周排列的各组之间的流量：每组是一段弧，长度取决于其流量；每条流量是连接两段弧的弦带。无向模式下，一条弦带连接一对组，宽度为两组之间双向流量之和（对称矩阵中每个关系只计一次），因此只有流入的组也有自己的弧；有向模式下，每个方向各有一条带箭头的弦带。悬停某组可高亮其弦带，悬停弦带可查看双向数值；图例可隐藏 / 显示组，方向键依次遍历各组和弦带。

Package: minerva-design@1.20.0

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

设计

研发

产品

市场

四个团队一周内互发的消息数

北美

拉丁美洲

欧洲

非洲

西亚

南亚

东亚

大洋洲

{{value}} 百万人

五年间世界各地区之间的人口迁移

app

router

store

ui-kit

api-client

auth

i18n

utils

代码库各模块之间的导入关系

美国

中国

欧盟

墨西哥

加拿大

日本

韩国

主要经济体一年内的货物贸易

首页

搜索

分类

商品

购物车

结算

{{value}} 千次访问

悬停页面或弦带查看详情

{{source}} → {{target}}：{{value}}（反向：{{reverse}}）

{{name}}：流入与流出共 {{value}}

购物应用一天内各页面之间的跳转

美国东部

美国西部

欧洲中部

亚太东南

亚太东北

南美

{{value}} Gbit/s

数据中心之间的复制流量

标签

自动

切向

径向

无

组的顺序

数据顺序

从大到小

从小到大

弦带颜色

渐变

源

目标

中性

有向

刻度

其他运营商

年份

{{year}} 年

{{name}} {{value}}

{{name}} 赢得的用户最多（净增 {{value}}）。净变化：{{list}}。

{{year}} 年移动运营商之间的用户转网

物理

化学

生物

医学

计算机科学

数学

经济

工程

点击某个学院聚焦其合作关系，或点击一条带查看这一对学院

{{name}}：合著论文 {{total}} 篇，主要合作方为 {{partners}}

{{name}}（{{value}}）

{{a}}与{{b}}：合著论文 {{value}} 篇

清除

一所大学各学院五年间合著的论文

咖啡

牛奶

面包

糕点

水果

麦片

酸奶

果汁

{{a}} + {{b}}

在 {{value}} 个购物篮中一起购买（占全部购物篮的 {{share}}）

与其他品类组合 {{value}} 次

一个月内在同一购物篮中一起购买的商品品类

网关

用户

订单

库存

支付

通知

{{value}} 次/秒

总计：{{total}}。最繁忙：{{from}} → {{to}}（{{value}}）

暂停

继续

微服务之间的实时每秒调用次数

伦敦

巴黎

法兰克福

伊斯坦布尔

迪拜

新加坡

东京

纽约

{{value}} 百万人次

显示全部枢纽

东部枢纽

西部枢纽

至少显示两个枢纽才能看到它们之间的航线

显示 {{total}} 个枢纽中的 {{shown}} 个：{{routes}} 条航线，每年 {{passengers}}

主要机场枢纽之间的年旅客量

## ChordChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: group arcs and ribbons, legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "ChordChart"
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
    "name": "ticks",
    "typeText": "number | boolean | undefined",
    "required": false
  },
  {
    "name": "directed",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "arrows",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "\"none\" | \"auto\" | \"tangential\" | \"radial\" | undefined",
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
    "name": "groups",
    "typeText": "readonly (string | ChordGroup)[] | undefined",
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
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "links",
    "typeText": "readonly ChordLink[] | undefined",
    "required": false
  },
  {
    "name": "matrix",
    "typeText": "readonly (readonly number[])[] | undefined",
    "required": false
  },
  {
    "name": "sortGroups",
    "typeText": "\"none\" | \"descending\" | \"ascending\" | undefined",
    "required": false
  },
  {
    "name": "sortSubgroups",
    "typeText": "\"none\" | \"auto\" | \"descending\" | \"ascending\" | undefined",
    "required": false
  },
  {
    "name": "ribbonColor",
    "typeText": "\"neutral\" | \"target\" | \"gradient\" | \"source\" | undefined",
    "required": false
  },
  {
    "name": "ribbonOpacity",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "arcWidth",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "tickFormat",
    "typeText": "((value: number) => string) | undefined",
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
