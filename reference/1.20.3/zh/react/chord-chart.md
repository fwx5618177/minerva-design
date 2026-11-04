# 弦图

展示围绕圆周排列的各组之间的流量：每组是一段弧，长度取决于其流量；每条流量是连接两段弧的弦带。无向模式下，一条弦带连接一对组，宽度为两组之间双向流量之和（对称矩阵中每个关系只计一次），因此只有流入的组也有自己的弧；有向模式下，每个方向各有一条带箭头的弦带。悬停某组可高亮其弦带，悬停弦带可查看双向数值；图例可隐藏 / 显示组，方向键依次遍历各组和弦带。

Package: minerva-design@1.20.3

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
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
    "name": "groups",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly (string | ChordGroup)[] | undefined",
    "typeRef": "type:a2dc79840661498eae07",
    "required": false,
    "description": "Groups (names or `{ name, color }`), in their order around the circle; groups only named by `links` are appended. With `matrix`, unnamed rows are numbered from 1."
  },
  {
    "name": "matrix",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly (readonly number[])[] | undefined",
    "typeRef": "type:14cda7081cd30af85dad",
    "required": false,
    "description": "Square flow matrix: `matrix[i][j]` flows from group `i` to group `j` (used when `links` is absent)"
  },
  {
    "name": "links",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly ChordLink[] | undefined",
    "typeRef": "type:2c67592f3a0996019a5b",
    "required": false,
    "description": "Flows as a list (by group name or index); takes precedence over `matrix`"
  },
  {
    "name": "directed",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "`false`: one ribbon per pair of groups, as wide as the flows between them in both directions (a symmetric matrix counts each relation once). `true`: one ribbon per direction, arcs sized by the outgoing plus the incoming flows (self flows ignored)"
  },
  {
    "name": "arrows",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Arrowheads at the target end of the ribbons"
  },
  {
    "name": "padAngle",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 2,
    "required": false,
    "description": "Gap between the groups, in degrees"
  },
  {
    "name": "startAngle",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Angle of the first group, degrees clockwise from 12 o'clock"
  },
  {
    "name": "sortGroups",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "enum",
    "values": [
      "ascending",
      "descending",
      "none"
    ],
    "typeText": "\"none\" | \"ascending\" | \"descending\" | undefined",
    "typeRef": "type:36d9ac8380d45cabf9fa",
    "required": false,
    "description": "Order of the groups around the circle"
  },
  {
    "name": "sortSubgroups",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "enum",
    "values": [
      "ascending",
      "auto",
      "descending",
      "none"
    ],
    "typeText": "\"none\" | \"auto\" | \"ascending\" | \"descending\" | undefined",
    "typeRef": "type:7ef254cdf5e46456250c",
    "default": "auto",
    "required": false,
    "description": "Order of the ribbon ends along an arc: `auto` minimizes the crossings; otherwise the order of the groups, or by value"
  },
  {
    "name": "ribbonColor",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "enum",
    "values": [
      "gradient",
      "neutral",
      "source",
      "target"
    ],
    "typeText": "\"neutral\" | \"target\" | \"source\" | \"gradient\" | undefined",
    "typeRef": "type:455388a12bfe376d2148",
    "default": "gradient",
    "required": false,
    "description": "Color of the ribbons without `color`: a gradient from the source to the target color, one of the two, or a neutral gray"
  },
  {
    "name": "ribbonOpacity",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.65,
    "required": false,
    "description": "Opacity of the ribbons, 0-1 (hovered ribbons are more opaque)"
  },
  {
    "name": "arcWidth",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Thickness of the group arcs, in pixels"
  },
  {
    "name": "ticks",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "number | boolean | undefined",
    "typeRef": "type:11d9d08024b0b84c460e",
    "required": false,
    "description": "Value ticks outside the arcs (labelled where there is room); a number sets the step between ticks"
  },
  {
    "name": "tickFormat",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:e40570f9ba1cae6e721f",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the tick labels"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "enum",
    "values": [
      "auto",
      "none",
      "radial",
      "tangential"
    ],
    "typeText": "\"none\" | \"auto\" | \"tangential\" | \"radial\" | undefined",
    "typeRef": "type:450a54e2e59f3bb532d3",
    "default": "auto",
    "required": false,
    "description": "Group labels along the arc (`tangential`) or the radius (`radial`); `auto` picks tangential when every name fits; colliding labels are shortened or skipped"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "enum",
    "values": [
      "auto",
      "canvas2d",
      "webgl",
      "webgl2",
      "webgpu"
    ],
    "typeText": "ChartRendererPreference | undefined",
    "typeRef": "type:dc7d7e6f384ddec86e04",
    "required": false,
    "description": "Backend of the shapes: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software; text is always drawn with Canvas2D, above the shapes"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "typeRef": "type:b3cd5c49d86fb91effb3",
    "required": false,
    "description": "Legend; clicking an item hides / shows its slice, stage, series, node, bar, row or level"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "typeRef": "type:9441d8fe0edba7239796",
    "default": true,
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "format",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:f12d9d0b7c053d4d65a6",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the values of the labels and the tooltip"
  },
  {
    "name": "percentFormat",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((share: number) => string) | undefined",
    "typeRef": "type:5bfc1184b082171dcbfd",
    "parameters": [
      {
        "name": "share",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the chart writes (tooltip rows, accessible names, number and percent formats, calendar dates); built-in texts in English, Chinese, Japanese and French (English otherwise)"
  },
  {
    "name": "texts",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "object",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "typeRef": "type:2ef787a978af6750b6c8",
    "required": false,
    "description": "Replaces built-in texts of the `locale` (tooltip rows, accessible names, \"No data\")"
  },
  {
    "name": "hidden",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar levels, by index. Makes the visibility controlled: legend clicks then only call `onToggle`, whose `hiddenIndexes` should be stored and passed back. Leave undefined to let the legend hide / show entries by itself."
  },
  {
    "name": "animation",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Entry and update animations (skipped when the user prefers reduced motion)"
  },
  {
    "name": "padding",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the drawing, in pixels"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "renderTooltip",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "node",
    "typeText": "((event: ShapeHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:599537a71f6aca3767b8",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip (replaces the default content)"
  }
]
```

### events

```json
[
  {
    "name": "onToggle",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:c5e11f23fbce8c1aa9a2",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeToggleEvent",
        "typeRef": "type:4b4244045a32e66c0a25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a legend item is clicked (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
  },
  {
    "name": "onHover",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:4d7c0df4667f26938fe6",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent | null",
        "typeRef": "type:5ce60fcc1021d329ffba"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the hovered (or keyboard-focused) mark changes"
  },
  {
    "name": "onClick",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:e40dbbb538ff7cd7dda5",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a mark is clicked, tapped or activated with Enter"
  }
]
```

## API

```json
{
  "ChordChartProps": {
    "source": "charts/src/react/shapes.tsx",
    "description": "Props of ChordChart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "groups",
        "type": "readonly (string | ChordGroup)[]",
        "required": false,
        "description": "Groups (names or `{ name, color }`), in their order around the circle; groups only named by `links` are appended. With `matrix`, unnamed rows are numbered from 1."
      },
      {
        "name": "matrix",
        "type": "readonly (readonly number[])[]",
        "required": false,
        "description": "Square flow matrix: `matrix[i][j]` flows from group `i` to group `j` (used when `links` is absent)"
      },
      {
        "name": "links",
        "type": "readonly ChordLink[]",
        "required": false,
        "description": "Flows as a list (by group name or index); takes precedence over `matrix`"
      },
      {
        "name": "directed",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "`false`: one ribbon per pair of groups, as wide as the flows between them in both directions (a symmetric matrix counts each relation once). `true`: one ribbon per direction, arcs sized by the outgoing plus the incoming flows (self flows ignored)"
      },
      {
        "name": "arrows",
        "type": "boolean",
        "required": false,
        "default": "true when `directed`",
        "description": "Arrowheads at the target end of the ribbons"
      },
      {
        "name": "padAngle",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "Gap between the groups, in degrees"
      },
      {
        "name": "startAngle",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Angle of the first group, degrees clockwise from 12 o'clock"
      },
      {
        "name": "sortGroups",
        "type": "\"none\" | \"ascending\" | \"descending\"",
        "required": false,
        "default": "\"none\" (data order)",
        "description": "Order of the groups around the circle"
      },
      {
        "name": "sortSubgroups",
        "type": "\"auto\" | \"none\" | \"ascending\" | \"descending\"",
        "required": false,
        "default": "\"auto\"",
        "description": "Order of the ribbon ends along an arc: `auto` minimizes the crossings; otherwise the order of the groups, or by value"
      },
      {
        "name": "ribbonColor",
        "type": "\"gradient\" | \"source\" | \"target\" | \"neutral\"",
        "required": false,
        "default": "\"gradient\"",
        "description": "Color of the ribbons without `color`: a gradient from the source to the target color, one of the two, or a neutral gray"
      },
      {
        "name": "ribbonOpacity",
        "type": "number",
        "required": false,
        "default": "0.65",
        "description": "Opacity of the ribbons, 0-1 (hovered ribbons are more opaque)"
      },
      {
        "name": "arcWidth",
        "type": "number",
        "required": false,
        "default": "6% of the radius (8-18 px)",
        "description": "Thickness of the group arcs, in pixels"
      },
      {
        "name": "ticks",
        "type": "boolean | number",
        "required": false,
        "default": "true when the diagram is large enough",
        "description": "Value ticks outside the arcs (labelled where there is room); a number sets the step between ticks"
      },
      {
        "name": "tickFormat",
        "type": "(value: number) => string",
        "required": false,
        "default": "compact numbers of the `locale` (not `format`, whose units would crowd the ticks)",
        "description": "Formats the tick labels"
      },
      {
        "name": "labels",
        "type": "\"auto\" | \"tangential\" | \"radial\" | \"none\"",
        "required": false,
        "default": "\"auto\"",
        "description": "Group labels along the arc (`tangential`) or the radius (`radial`); `auto` picks tangential when every name fits; colliding labels are shortened or skipped"
      }
    ]
  },
  "ChordGroup": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "A group (arc) of a chord diagram",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name shown in the label, the legend and the tooltip; links refer to the group by this name (or by index)"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color of the arc (and of the ribbons' ends); the palette when omitted"
      }
    ]
  },
  "ChordLink": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "A flow between two groups of a chord diagram",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "source",
        "type": "string | number",
        "required": true,
        "description": "Source group: its name, or its index in `groups`"
      },
      {
        "name": "target",
        "type": "string | number",
        "required": true,
        "description": "Target group: its name, or its index in `groups`"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Size of the flow (negative values count as 0; flows between the same ends add up)"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color of the ribbon; follows `ribbonColor` when omitted"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

传入方阵和各行名称：matrix[i][j] 表示从组 i 流向组 j 的量，这里是四个团队一周内互发的消息数。图表足够大时，弧外会显示数值刻度。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/demos/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChordChart } from "minerva-design/charts";

const TEAMS = ["design", "engineering", "product", "marketing"] as const;

// Messages sent in a week: row = sender, column = recipient
const MATRIX = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0],
];

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const groups = useMemo(() => TEAMS.map((team) => t(`teams.${team}`)), [t]);

  return (
    <ChordChart groups={groups} matrix={MATRIX} ariaLabel={t("teamsAria")} />
  );
}

```

## Example: 品牌转换

用户在各移动运营商之间的转网情况，每年一个矩阵。directed 为每个方向绘制一条带，ribbonColor="target" 按赢得用户的运营商着色；净增用户数由同一矩阵计算得出。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/demos/brand-switching.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { ChordChart, type ChordGroup } from "minerva-design/charts";

// Mobile operators (brand names are not translated) and the "other" bucket
const CARRIERS = ["Telora", "Vexa", "Mobix", "Airlink"] as const;
const COLORS = [
  "var(--chart-series-1)",
  "var(--chart-series-2)",
  "var(--chart-series-3)",
  "var(--chart-series-4)",
  "var(--text-muted-color)",
];

// Subscribers who switched operator, in thousands: row = operator left,
// column = operator joined
const YEARS: Record<number, number[][]> = {
  2023: [
    [0, 84, 52, 31, 12],
    [61, 0, 38, 22, 9],
    [44, 41, 0, 18, 7],
    [26, 19, 21, 0, 5],
    [10, 8, 9, 4, 0],
  ],
  2024: [
    [0, 112, 48, 35, 14],
    [52, 0, 34, 25, 8],
    [40, 58, 0, 21, 6],
    [24, 31, 19, 0, 6],
    [9, 12, 8, 5, 0],
  ],
  2025: [
    [0, 96, 41, 62, 13],
    [58, 0, 30, 49, 9],
    [37, 44, 0, 38, 7],
    [21, 27, 16, 0, 4],
    [8, 10, 7, 11, 0],
  ],
};
const YEAR_LIST = Object.keys(YEARS).map(Number);

export default function BrandSwitchingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const [year, setYear] = useState(2025);
  const matrix = YEARS[year]!;

  const names = useMemo(() => [...CARRIERS, t("switching.other")], [t]);
  const groups = useMemo(
    (): ChordGroup[] => names.map((name, i) => ({ name, color: COLORS[i] })),
    [names],
  );
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language, {
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => number.format(value * 1000);
  }, [i18n.language]);
  const signed = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language, {
      notation: "compact",
      maximumFractionDigits: 1,
      signDisplay: "exceptZero",
    });
    return (value: number) => number.format(value * 1000);
  }, [i18n.language]);

  // net switchers: subscribers won minus subscribers lost
  const net = names
    .map((name, i) => {
      const won = matrix.reduce((sum, row) => sum + row[i]!, 0);
      const lost = matrix[i]!.reduce((sum, value) => sum + value, 0);
      return { name, net: won - lost };
    })
    .sort((a, b) => b.net - a.net);
  const winner = net[0]!;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("switching.yearLabel")}
        direction="horizontal"
        value={year}
        onChange={(value) => setYear(Number(value))}
      >
        {YEAR_LIST.map((value) => (
          <Radio
            key={value}
            value={value}
            label={t("switching.year", { year: value })}
          />
        ))}
      </RadioGroup>
      <ChordChart
        groups={groups}
        matrix={matrix}
        directed
        ribbonColor="target"
        format={format}
        padAngle={3}
        height={420}
        ariaLabel={t("switching.aria", { year })}
      />
      <output aria-live="polite">
        {t("switching.summary", {
          name: winner.name,
          value: signed(winner.net),
          list: new Intl.ListFormat(i18n.language, { type: "unit" }).format(
            net.map((item) =>
              t("switching.net", { name: item.name, value: signed(item.net) }),
            ),
          ),
        })}
      </output>
    </div>
  );
}

```

## Example: 购物篮分析

在同一购物篮中一起购买的品类。sortGroups 与 sortSubgroups="descending" 让最大的品类和组合排在前面，ticks={1000} 设置刻度步长并配合紧凑的 tickFormat，renderTooltip 将组合显示为占全部购物篮的比例。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/demos/co-purchase.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ChordChart,
  type ChordLink,
  type ShapeHoverEvent,
} from "minerva-design/charts";

const CATEGORIES = [
  "coffee",
  "milk",
  "bread",
  "pastries",
  "fruit",
  "cereal",
  "yogurt",
  "juice",
] as const;
type Category = (typeof CATEGORIES)[number];

// Baskets of a month where two categories were bought together, out of
// 48,000 baskets
const BASKETS = 48000;
const TOGETHER: [Category, Category, number][] = [
  ["coffee", "milk", 3120],
  ["coffee", "pastries", 2460],
  ["coffee", "bread", 980],
  ["milk", "cereal", 2780],
  ["milk", "bread", 1640],
  ["milk", "yogurt", 920],
  ["bread", "pastries", 610],
  ["bread", "fruit", 740],
  ["fruit", "yogurt", 1980],
  ["fruit", "juice", 1210],
  ["fruit", "cereal", 860],
  ["cereal", "yogurt", 1130],
  ["juice", "pastries", 540],
  ["juice", "cereal", 420],
];

export default function CoPurchaseDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const groups = useMemo(
    () => CATEGORIES.map((category) => t(`basket.categories.${category}`)),
    [t],
  );
  const links = useMemo(
    (): ChordLink[] =>
      TOGETHER.map(([a, b, value]) => ({
        source: CATEGORIES.indexOf(a),
        target: CATEGORIES.indexOf(b),
        value,
      })),
    [],
  );
  const { number, compact, percent } = useMemo(
    () => ({
      number: new Intl.NumberFormat(i18n.language),
      compact: new Intl.NumberFormat(i18n.language, {
        notation: "compact",
        maximumFractionDigits: 1,
      }),
      percent: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    }),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) => number.format(value),
    [number],
  );
  const tickFormat = useMemo(
    () => (value: number) => compact.format(value),
    [compact],
  );

  const tooltip = (event: ShapeHoverEvent) =>
    event.source && event.target ? (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>
          {t("basket.pair", { a: event.source, b: event.target })}
        </strong>
        <span>
          {t("basket.together", {
            value: number.format(event.value),
            share: percent.format(event.value / BASKETS),
          })}
        </span>
      </div>
    ) : (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{event.name}</strong>
        <span>
          {t("basket.withOthers", { value: number.format(event.value) })}
        </span>
      </div>
    );

  return (
    <ChordChart
      groups={groups}
      links={links}
      sortGroups="descending"
      sortSubgroups="descending"
      ticks={1000}
      tickFormat={tickFormat}
      format={format}
      renderTooltip={tooltip}
      legend={false}
      height={440}
      ariaLabel={t("basket.aria")}
    />
  );
}

```

## Example: 深色控制台

图表从容器的 CSS 变量读取颜色，这里是一个深色运维控制台，搭配霓虹色板、更细的弧（arcWidth）和更透明的弦带（ribbonOpacity）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/demos/dark.tsx

```tsx
import { useMemo, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { ChordChart } from "minerva-design/charts";

// a dark operations-console palette, read by the chart from these variables
const CONSOLE = {
  "--background-color": "#0b1020",
  "--surface-color": "#0b1020",
  "--surface-elevated-color": "#141b2e",
  "--text-color": "#e2e8f0",
  "--text-secondary-color": "#8a94ad",
  "--border-color": "#1f2a44",
  background: "#0b1020",
  color: "#e2e8f0",
  borderRadius: 12,
  padding: 12,
  width: "100%",
  boxSizing: "border-box",
} as CSSProperties;

const NEON = ["#22d3ee", "#a78bfa", "#f472b6", "#facc15", "#34d399", "#fb923c"];

const REGIONS = [
  "usEast",
  "usWest",
  "euCentral",
  "apSoutheast",
  "apNortheast",
  "saEast",
] as const;

// Replication traffic between data centers, in Gbit/s (average of a day)
const TRAFFIC = [
  [0, 42, 36, 12, 14, 9],
  [38, 0, 11, 18, 22, 3],
  [31, 9, 0, 14, 7, 4],
  [10, 16, 12, 0, 26, 1],
  [12, 20, 6, 24, 0, 1],
  [8, 2, 3, 1, 1, 0],
];

export default function DarkDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const locale = i18n.language;

  const groups = useMemo(
    () => REGIONS.map((region) => t(`datacenters.${region}`)),
    [t],
  );
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) => t("gbps", { value: number.format(value) });
  }, [locale, t]);

  return (
    <div style={CONSOLE}>
      <ChordChart
        groups={groups}
        matrix={TRAFFIC}
        palette={NEON}
        format={format}
        padAngle={4}
        arcWidth={10}
        ribbonOpacity={0.55}
        height={440}
        ariaLabel={t("datacentersAria")}
      />
    </div>
  );
}

```

## Example: 模块依赖矩阵

代码库各模块之间的导入关系。directed 为每个方向绘制一条弦带，并在被导入的模块一端加箭头；ribbonColor="source" 按导入方着色，循环依赖（同一对模块之间的两个箭头）一眼可见。labels="radial" 沿半径方向书写名称。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/demos/dependencies.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChordChart } from "minerva-design/charts";

const MODULES = [
  "app",
  "router",
  "store",
  "uiKit",
  "apiClient",
  "auth",
  "i18n",
  "utils",
] as const;

// Import statements of a front-end codebase: row = importing module,
// column = imported module. store ⇄ apiClient and auth ⇄ apiClient are
// import cycles: their ribbons have both a value and a reverse value.
const IMPORTS = [
  [0, 12, 9, 24, 6, 5, 7, 10],
  [0, 0, 2, 3, 0, 4, 1, 5],
  [0, 0, 0, 0, 14, 3, 0, 8],
  [0, 1, 4, 0, 0, 0, 9, 16],
  [0, 0, 2, 0, 0, 7, 0, 11],
  [0, 2, 3, 2, 6, 0, 1, 6],
  [0, 0, 0, 0, 0, 0, 0, 4],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

export default function DependenciesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const groups = useMemo(
    () => MODULES.map((module) => t(`modules.${module}`)),
    [t],
  );

  return (
    <ChordChart
      groups={groups}
      matrix={IMPORTS}
      directed
      ribbonColor="source"
      sortGroups="descending"
      labels="radial"
      ticks={false}
      height={440}
      ariaLabel={t("modulesAria")}
    />
  );
}

```

## Example: 带箭头的有向流量

购物应用各页面之间的跳转。弧长为每个页面的流出与流入访问之和；onHover 返回悬停弦带的 source、target、value 和 reverseValue，显示在下方的说明文字中。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/demos/directed.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChordChart, type ShapeHoverEvent } from "minerva-design/charts";

const PAGES = [
  "home",
  "search",
  "category",
  "product",
  "cart",
  "checkout",
] as const;

// Page-to-page navigations of a shop app in a day, in thousands: row = page
// left, column = page opened next
const NAVIGATIONS = [
  [0, 18.4, 12.6, 6.2, 1.4, 0],
  [2.8, 0, 3.1, 21.5, 0.6, 0],
  [3.4, 2.2, 0, 14.8, 0.4, 0],
  [4.1, 6.3, 5.2, 0, 9.6, 0.8],
  [1.2, 0.5, 0.3, 3.9, 0, 6.4],
  [0.9, 0, 0, 0.2, 1.6, 0],
];

export default function DirectedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const locale = i18n.language;
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  const groups = useMemo(() => PAGES.map((page) => t(`pages.${page}`)), [t]);
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) => t("visits", { value: number.format(value) });
  }, [locale, t]);

  const caption = !hovered
    ? t("navHint")
    : hovered.source !== undefined && hovered.target !== undefined
      ? t("navFlow", {
          source: hovered.source,
          target: hovered.target,
          value: format(hovered.value),
          reverse: format(hovered.reverseValue ?? 0),
        })
      : t("navPage", { name: hovered.name, value: format(hovered.value) });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <ChordChart
        groups={groups}
        matrix={NAVIGATIONS}
        directed
        format={format}
        ribbonOpacity={0.7}
        padAngle={3}
        height={440}
        onHover={setHovered}
        ariaLabel={t("navAria")}
      />
      <div
        aria-live="polite"
        style={{
          minHeight: 22,
          textAlign: "center",
          color: "var(--text-secondary-color)",
          fontSize: 13,
        }}
      >
        {caption}
      </div>
    </div>
  );
}

```

## Example: 聚焦某个分组

各学院之间合著的论文。onClick 点击弧段后保留该学院的带，其余带通过连线的 color 变为中性色，并列出其主要合作方；点击带则显示这一对学院。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/demos/focus.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  ChordChart,
  type ChordLink,
  type ShapeHoverEvent,
} from "minerva-design/charts";

const FACULTIES = [
  "physics",
  "chemistry",
  "biology",
  "medicine",
  "computing",
  "mathematics",
  "economics",
  "engineering",
] as const;
type Faculty = (typeof FACULTIES)[number];

// Papers co-authored by two faculties over five years
const PAIRS: [Faculty, Faculty, number][] = [
  ["physics", "chemistry", 142],
  ["physics", "mathematics", 118],
  ["physics", "engineering", 164],
  ["physics", "computing", 71],
  ["chemistry", "biology", 96],
  ["chemistry", "medicine", 58],
  ["chemistry", "engineering", 83],
  ["biology", "medicine", 186],
  ["biology", "computing", 64],
  ["medicine", "computing", 77],
  ["medicine", "economics", 29],
  ["computing", "mathematics", 132],
  ["computing", "engineering", 121],
  ["computing", "economics", 46],
  ["mathematics", "economics", 54],
  ["engineering", "economics", 18],
];

export default function FocusDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const [focus, setFocus] = useState<Faculty | null>(null);
  const [pair, setPair] = useState<[string, string, number] | null>(null);
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) => number.format(value),
    [number],
  );
  const name = (faculty: Faculty) => t(`research.faculties.${faculty}`);

  const groups = useMemo(
    () => FACULTIES.map((f) => t(`research.faculties.${f}`)),
    [t],
  );
  // ribbons of the focused faculty keep their gradient, the others fade out
  const links = useMemo(
    (): ChordLink[] =>
      PAIRS.map(([a, b, value]) => ({
        source: FACULTIES.indexOf(a),
        target: FACULTIES.indexOf(b),
        value,
        ...(focus && a !== focus && b !== focus
          ? { color: "var(--border-color)" }
          : {}),
      })),
    [focus],
  );

  const onClick = (event: ShapeHoverEvent) => {
    if (event.index < FACULTIES.length) {
      const faculty = FACULTIES[event.index]!;
      setFocus((current) => (current === faculty ? null : faculty));
      setPair(null);
    } else if (event.source && event.target) {
      setPair([event.source, event.target, event.value]);
    }
  };

  let readout = t("research.hint");
  if (pair) {
    readout = t("research.pair", {
      a: pair[0],
      b: pair[1],
      value: number.format(pair[2]),
    });
  } else if (focus) {
    const partners = PAIRS.filter(([a, b]) => a === focus || b === focus)
      .map(([a, b, value]) => ({ partner: a === focus ? b : a, value }))
      .sort((x, y) => y.value - x.value);
    readout = t("research.focus", {
      name: name(focus),
      total: number.format(partners.reduce((sum, p) => sum + p.value, 0)),
      partners: new Intl.ListFormat(i18n.language, {
        type: "conjunction",
      }).format(
        partners.slice(0, 3).map((p) =>
          t("research.partner", {
            name: name(p.partner),
            value: number.format(p.value),
          }),
        ),
      ),
    });
  }

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <ChordChart
        groups={groups}
        links={links}
        format={format}
        legend={false}
        onClick={onClick}
        height={440}
        ariaLabel={t("research.aria")}
      />
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite">{readout}</output>
        <Button
          variant="outline"
          size="small"
          disabled={!focus && !pair}
          onClick={() => {
            setFocus(null);
            setPair(null);
          }}
        >
          {t("research.clear")}
        </Button>
      </HStack>
    </div>
  );
}

```

## Example: 受控图例

各机场枢纽之间的旅客量。legend={{ position: "top" }} 用于切换枢纽，配合 hidden + onToggle 将隐藏列表保存在页面中，因此按钮可以应用预设，说明文字统计仍可见的航线。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/demos/legend.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { ChordChart, type ShapeToggleEvent } from "minerva-design/charts";

const HUBS = [
  "london",
  "paris",
  "frankfurt",
  "istanbul",
  "dubai",
  "singapore",
  "tokyo",
  "newYork",
] as const;
const EAST = new Set<string>(["dubai", "singapore", "tokyo", "istanbul"]);

// Yearly passengers between airport hubs, in millions (both directions)
const ROUTES: [number, number, number][] = [
  [0, 1, 2.1],
  [0, 2, 1.6],
  [0, 3, 1.9],
  [0, 4, 3.4],
  [0, 5, 1.2],
  [0, 6, 0.9],
  [0, 7, 3.9],
  [1, 2, 1.1],
  [1, 3, 1.4],
  [1, 4, 1.8],
  [1, 5, 0.8],
  [1, 6, 1.0],
  [1, 7, 2.6],
  [2, 3, 1.7],
  [2, 4, 1.5],
  [2, 5, 0.9],
  [2, 6, 0.8],
  [2, 7, 1.9],
  [3, 4, 1.3],
  [3, 7, 0.7],
  [4, 5, 1.6],
  [4, 6, 0.9],
  [4, 7, 1.1],
  [5, 6, 1.4],
  [6, 7, 1.2],
];

export default function LegendDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const [hidden, setHidden] = useState<readonly number[]>([]);
  const groups = useMemo(() => HUBS.map((hub) => t(`hubs.${hub}`)), [t]);
  const links = useMemo(
    () => ROUTES.map(([source, target, value]) => ({ source, target, value })),
    [],
  );
  const decimal = useMemo(
    () => new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 1 }),
    [i18n.language],
  );
  const format = useMemo(
    () => (value: number) =>
      t("hubs.millions", { value: decimal.format(value) }),
    [decimal, t],
  );

  // the legend only reports the toggle: the hidden list lives here
  const onToggle = (event: ShapeToggleEvent) => setHidden(event.hiddenIndexes);

  const shown = HUBS.length - hidden.length;
  const visible = ROUTES.filter(
    ([a, b]) => !hidden.includes(a) && !hidden.includes(b),
  );
  const passengers = visible.reduce((sum, [, , value]) => sum + value, 0);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} wrap align="center">
        <Button
          variant="outline"
          size="small"
          disabled={hidden.length === 0}
          onClick={() => setHidden([])}
        >
          {t("hubs.showAll")}
        </Button>
        <Button
          variant="outline"
          size="small"
          onClick={() =>
            setHidden(HUBS.flatMap((hub, i) => (EAST.has(hub) ? [] : [i])))
          }
        >
          {t("hubs.eastOnly")}
        </Button>
        <Button
          variant="outline"
          size="small"
          onClick={() =>
            setHidden(HUBS.flatMap((hub, i) => (EAST.has(hub) ? [i] : [])))
          }
        >
          {t("hubs.westOnly")}
        </Button>
      </HStack>
      <ChordChart
        groups={groups}
        links={links}
        legend={{ position: "top" }}
        hidden={hidden}
        onToggle={onToggle}
        format={format}
        padAngle={2}
        height={460}
        ariaLabel={t("hubs.aria")}
      />
      <output aria-live="polite">
        {shown < 2
          ? t("hubs.tooFew")
          : t("hubs.summary", {
              shown,
              total: HUBS.length,
              routes: visible.length,
              passengers: format(passengers),
            })}
      </output>
    </div>
  );
}

```

## Example: 实时服务调用

微服务之间的每秒调用次数，每 2 秒刷新并带有过渡动画。directed 配合 ribbonColor="source" 显示谁在调用谁；说明文字给出总量和最繁忙的调用。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/demos/live.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { ChordChart } from "minerva-design/charts";

const SERVICES = [
  "gateway",
  "users",
  "orders",
  "inventory",
  "payments",
  "notifications",
] as const;

// Typical calls per second: row = caller, column = callee
const BASE = [
  [0, 420, 360, 180, 0, 0],
  [0, 0, 40, 0, 0, 90],
  [0, 120, 0, 260, 210, 150],
  [0, 0, 30, 0, 0, 20],
  [0, 60, 80, 0, 0, 110],
  [0, 30, 0, 0, 0, 0],
];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let r = Math.imul(a ^ (a >>> 15), 1 | a);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// The call matrix at a given tick: a traffic wave plus seeded noise; every
// 12 ticks a checkout campaign doubles the order and payment calls for a while
function calls(tick: number) {
  const random = mulberry32(tick * 2654435761);
  const wave = 1 + 0.25 * Math.sin(tick / 4);
  const campaign = tick % 12 >= 8;
  return BASE.map((row) =>
    row.map((value, j) => {
      if (!value) return 0;
      const boost =
        campaign && (SERVICES[j] === "orders" || SERVICES[j] === "payments")
          ? 2
          : 1;
      return Math.round(value * wave * boost * (0.85 + 0.3 * random()));
    }),
  );
}

export default function LiveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((n) => n + 1), 2000);
    return () => clearInterval(id);
  }, [running]);

  const matrix = useMemo(() => calls(tick), [tick]);
  const groups = useMemo(
    () => SERVICES.map((service) => t(`calls.services.${service}`)),
    [t],
  );
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language);
    return (value: number) =>
      t("calls.perSecond", { value: number.format(value) });
  }, [i18n.language, t]);

  let total = 0;
  let busiest = { from: 0, to: 0, value: 0 };
  matrix.forEach((row, i) =>
    row.forEach((value, j) => {
      total += value;
      if (value > busiest.value) busiest = { from: i, to: j, value };
    }),
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite">
          {t("calls.summary", {
            total: format(total),
            from: groups[busiest.from],
            to: groups[busiest.to],
            value: format(busiest.value),
          })}
        </output>
        <Button
          variant="outline"
          size="small"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("calls.pause") : t("calls.resume")}
        </Button>
      </HStack>
      <ChordChart
        groups={groups}
        matrix={matrix}
        directed
        ribbonColor="source"
        format={format}
        ticks={false}
        legend={false}
        height={420}
        ariaLabel={t("calls.aria")}
      />
    </div>
  );
}

```

## Example: 地区间人口迁移

每个地区的弧长是迁出与迁入人数之和；弦带宽度为两个地区之间的双向迁移人数，提示框分别列出两个方向（数值、反向）。对角线（地区内部迁移）绘制为一个回环。groups 设置颜色，format 设置单位，padAngle 加大间隙。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/demos/migration.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChordChart, type ChordGroup } from "minerva-design/charts";

const REGIONS = [
  { key: "northAmerica", color: "#3b82f6" },
  { key: "latinAmerica", color: "#10b981" },
  { key: "europe", color: "#8b5cf6" },
  { key: "africa", color: "#f59e0b" },
  { key: "westAsia", color: "#ef4444" },
  { key: "southAsia", color: "#ec4899" },
  { key: "eastAsia", color: "#06b6d4" },
  { key: "oceania", color: "#84cc16" },
];

// Migrants over five years, in millions (rounded, illustrative): row = region
// of origin, column = region of destination; the diagonal is migration
// within a region, drawn as a loop
const MATRIX = [
  [0.4, 0.6, 0.5, 0.1, 0.1, 0.2, 0.4, 0.1],
  [3.2, 0.9, 1.1, 0, 0, 0, 0.1, 0.1],
  [0.8, 0.3, 2.6, 0.3, 0.4, 0.1, 0.2, 0.3],
  [0.5, 0, 2.2, 1.8, 1.4, 0, 0.1, 0.1],
  [0.4, 0, 1.9, 0.2, 1.2, 0.1, 0, 0.1],
  [1.1, 0, 1, 0.1, 4.6, 0.6, 0.2, 0.4],
  [1.2, 0.1, 0.6, 0.1, 0.2, 0.1, 0.9, 0.5],
  [0.1, 0, 0.2, 0, 0, 0, 0.1, 0.1],
];

export default function MigrationDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const locale = i18n.language;

  const groups = useMemo(
    (): ChordGroup[] =>
      REGIONS.map(({ key, color }) => ({
        name: t(`regions.${key}`),
        color,
      })),
    [t],
  );
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) =>
      t("migrationValue", { value: number.format(value) });
  }, [locale, t]);

  return (
    <ChordChart
      groups={groups}
      matrix={MATRIX}
      format={format}
      padAngle={3}
      height={460}
      ariaLabel={t("migrationAria")}
    />
  );
}

```

## Example: 选项

尝试不同的标签模式（auto 在每个名称都能放进弧内时使用切向标签，否则使用径向标签）、组的排序、弦带颜色、有向弦带以及刻度。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/demos/options.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Radio, RadioGroup, Switch } from "minerva-design";
import { ChordChart, type ChordChartProps } from "minerva-design/charts";

type Labels = NonNullable<ChordChartProps["labels"]>;
type Sort = NonNullable<ChordChartProps["sortGroups"]>;
type RibbonColor = NonNullable<ChordChartProps["ribbonColor"]>;

const TEAMS = ["design", "engineering", "product", "marketing"] as const;
const MATRIX = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0],
];

const LABELS: Labels[] = ["auto", "tangential", "radial", "none"];
const SORTS: Sort[] = ["none", "descending", "ascending"];
const COLORS: RibbonColor[] = ["gradient", "source", "target", "neutral"];

export default function OptionsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const [labels, setLabels] = useState<Labels>("auto");
  const [sortGroups, setSortGroups] = useState<Sort>("none");
  const [ribbonColor, setRibbonColor] = useState<RibbonColor>("gradient");
  const [directed, setDirected] = useState(false);
  const [ticks, setTicks] = useState(true);

  const groups = useMemo(() => TEAMS.map((team) => t(`teams.${team}`)), [t]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={16} wrap align="center">
        <RadioGroup
          aria-label={t("labelsLabel")}
          direction="horizontal"
          value={labels}
          onChange={(value) => setLabels(value as Labels)}
        >
          {LABELS.map((value) => (
            <Radio key={value} value={value} label={t(`labels.${value}`)} />
          ))}
        </RadioGroup>
        <RadioGroup
          aria-label={t("sortLabel")}
          direction="horizontal"
          value={sortGroups}
          onChange={(value) => setSortGroups(value as Sort)}
        >
          {SORTS.map((value) => (
            <Radio key={value} value={value} label={t(`sort.${value}`)} />
          ))}
        </RadioGroup>
      </HStack>
      <HStack gap={16} wrap align="center">
        <RadioGroup
          aria-label={t("ribbonColorLabel")}
          direction="horizontal"
          value={ribbonColor}
          onChange={(value) => setRibbonColor(value as RibbonColor)}
        >
          {COLORS.map((value) => (
            <Radio
              key={value}
              value={value}
              label={t(`ribbonColor.${value}`)}
            />
          ))}
        </RadioGroup>
        <Switch
          checked={directed}
          onChange={setDirected}
          label={t("directed")}
        />
        <Switch checked={ticks} onChange={setTicks} label={t("ticks")} />
      </HStack>
      <ChordChart
        groups={groups}
        matrix={MATRIX}
        labels={labels}
        sortGroups={sortGroups}
        ribbonColor={ribbonColor}
        directed={directed}
        ticks={ticks}
        height={400}
        ariaLabel={t("teamsAria")}
      />
    </div>
  );
}

```

## Example: 经济体之间的贸易

双边货物贸易以 links 列表（{ source, target, value }）而非矩阵给出。sortGroups="descending" 让贸易额最大的经济体排在前面；弦带的提示框显示一个方向的出口（数值）和另一个方向的出口（反向），以紧凑美元格式显示。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/demos/trade.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChordChart, type ChordLink } from "minerva-design/charts";

type Economy = "us" | "china" | "eu" | "mexico" | "canada" | "japan" | "korea";

const ECONOMIES: Economy[] = [
  "us",
  "china",
  "eu",
  "mexico",
  "canada",
  "japan",
  "korea",
];

// Goods exports of a year, in billions of US$ (rounded, illustrative)
const EXPORTS: [Economy, Economy, number][] = [
  ["us", "china", 148],
  ["china", "us", 427],
  ["us", "eu", 368],
  ["eu", "us", 576],
  ["us", "mexico", 323],
  ["mexico", "us", 475],
  ["us", "canada", 354],
  ["canada", "us", 421],
  ["us", "japan", 76],
  ["japan", "us", 148],
  ["us", "korea", 65],
  ["korea", "us", 116],
  ["china", "eu", 550],
  ["eu", "china", 245],
  ["china", "japan", 158],
  ["japan", "china", 135],
  ["china", "korea", 149],
  ["korea", "china", 125],
  ["china", "mexico", 82],
  ["mexico", "china", 10],
  ["canada", "eu", 32],
  ["eu", "canada", 52],
  ["japan", "eu", 80],
  ["eu", "japan", 75],
  ["korea", "eu", 68],
  ["eu", "korea", 57],
];

export default function TradeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart.data",
  });
  const locale = i18n.language;

  const groups = useMemo(
    () => ECONOMIES.map((economy) => t(`economies.${economy}`)),
    [t],
  );
  const links = useMemo(
    (): ChordLink[] =>
      EXPORTS.map(([from, to, value]) => ({
        source: ECONOMIES.indexOf(from),
        target: ECONOMIES.indexOf(to),
        value,
      })),
    [],
  );
  const format = useMemo(() => {
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => usd.format(value * 1e9);
  }, [locale]);

  return (
    <ChordChart
      groups={groups}
      links={links}
      format={format}
      tickFormat={format}
      sortGroups="descending"
      height={460}
      ariaLabel={t("tradeAria")}
    />
  );
}

```
