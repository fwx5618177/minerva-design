# 饼图 / 环形图

展示整体中各部分的占比：饼图、环形图（中心可显示总计）和南丁格尔玫瑰图。适合少量类别（建议不超过 8 个）、更关注占比而非精确比较的场景。悬停或使用方向键高亮扇区，Esc 清除；点击图例项可隐藏对应扇区。

Package: minerva-design@1.23.1

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
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
    "name": "innerRadius",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.62,
    "required": false,
    "description": "Inner radius as a fraction of the outer radius"
  },
  {
    "name": "data",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly ShapeDatum[]",
    "typeRef": "type:f31ad238ea16881a8684",
    "required": true,
    "description": "Slices: a name, a value (negative values count as 0) and an optional color"
  },
  {
    "name": "startAngle",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Angle of the first slice, degrees clockwise from 12 o'clock"
  },
  {
    "name": "padAngle",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Gap between the slices, in pixels"
  },
  {
    "name": "cornerRadius",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Corner radius of the slices, in pixels"
  },
  {
    "name": "rose",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Nightingale rose: the radius (instead of the angle) shows the value"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "enum",
    "values": [
      "inside",
      "none",
      "outside"
    ],
    "typeText": "\"none\" | \"inside\" | \"outside\" | undefined",
    "typeRef": "type:fe5514373836d63e89d5",
    "required": false,
    "description": "Slice labels: `outside` with leader lines, `inside` the slices, or none"
  },
  {
    "name": "labelContent",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly (\"name\" | \"value\" | \"percent\")[] | undefined",
    "typeRef": "type:9681660344634a074ea8",
    "required": false,
    "description": "What a label shows: name, value, percent (combinable)"
  },
  {
    "name": "centerValue",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Big text in the hole of a donut (e.g. the total)"
  },
  {
    "name": "centerLabel",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Small text under `centerValue`"
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

## PieChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
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
    "name": "data",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly ShapeDatum[]",
    "typeRef": "type:f31ad238ea16881a8684",
    "required": true,
    "description": "Slices: a name, a value (negative values count as 0) and an optional color"
  },
  {
    "name": "innerRadius",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Inner radius as a fraction of the outer radius: 0 = pie, 0.6 = donut"
  },
  {
    "name": "startAngle",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Angle of the first slice, degrees clockwise from 12 o'clock"
  },
  {
    "name": "padAngle",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Gap between the slices, in pixels"
  },
  {
    "name": "cornerRadius",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Corner radius of the slices, in pixels"
  },
  {
    "name": "rose",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Nightingale rose: the radius (instead of the angle) shows the value"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "enum",
    "values": [
      "inside",
      "none",
      "outside"
    ],
    "typeText": "\"none\" | \"inside\" | \"outside\" | undefined",
    "typeRef": "type:fe5514373836d63e89d5",
    "required": false,
    "description": "Slice labels: `outside` with leader lines, `inside` the slices, or none"
  },
  {
    "name": "labelContent",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly (\"name\" | \"value\" | \"percent\")[] | undefined",
    "typeRef": "type:9681660344634a074ea8",
    "required": false,
    "description": "What a label shows: name, value, percent (combinable)"
  },
  {
    "name": "centerValue",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Big text in the hole of a donut (e.g. the total)"
  },
  {
    "name": "centerLabel",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Small text under `centerValue`"
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
  "PieChartProps": {
    "source": "charts/src/react/shapes.tsx",
    "description": "Props of PieChart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "data",
        "type": "readonly ShapeDatum[]",
        "required": true,
        "description": "Slices: a name, a value (negative values count as 0) and an optional color"
      },
      {
        "name": "innerRadius",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Inner radius as a fraction of the outer radius: 0 = pie, 0.6 = donut"
      },
      {
        "name": "startAngle",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Angle of the first slice, degrees clockwise from 12 o'clock"
      },
      {
        "name": "padAngle",
        "type": "number",
        "required": false,
        "default": "1 (pie), 2 (donut)",
        "description": "Gap between the slices, in pixels"
      },
      {
        "name": "cornerRadius",
        "type": "number",
        "required": false,
        "default": "0 (pie), 4 (donut)",
        "description": "Corner radius of the slices, in pixels"
      },
      {
        "name": "rose",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Nightingale rose: the radius (instead of the angle) shows the value"
      },
      {
        "name": "labels",
        "type": "\"outside\" | \"inside\" | \"none\"",
        "required": false,
        "default": "\"outside\" (up to 12 slices), \"none\" otherwise",
        "description": "Slice labels: `outside` with leader lines, `inside` the slices, or none"
      },
      {
        "name": "labelContent",
        "type": "readonly (\"name\" | \"value\" | \"percent\")[]",
        "required": false,
        "default": "[\"name\", \"percent\"]",
        "description": "What a label shows: name, value, percent (combinable)"
      },
      {
        "name": "centerValue",
        "type": "string",
        "required": false,
        "description": "Big text in the hole of a donut (e.g. the total)"
      },
      {
        "name": "centerLabel",
        "type": "string",
        "required": false,
        "description": "Small text under `centerValue`"
      }
    ]
  },
  "DonutChartProps": {
    "source": "charts/src/react/shapes.tsx",
    "description": "Props of DonutChart: a PieChart with a hole",
    "kind": "interface",
    "extends": [
      "PieChartProps"
    ],
    "props": [
      {
        "name": "innerRadius",
        "type": "number",
        "required": false,
        "default": "0.62",
        "description": "Inner radius as a fraction of the outer radius"
      }
    ]
  },
  "ShapeChartCommonProps": {
    "source": "charts/src/react/shapes.tsx",
    "description": "Props shared by PieChart, DonutChart, RadarChart, GaugeChart, FunnelChart, TreemapChart, SankeyChart, SunburstChart, RadialBarChart, CalendarHeatmap, BulletChart and ChordChart",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "height",
        "type": "number | string",
        "required": false,
        "default": "320 (GaugeChart: 240, RadialBarChart: 300, ChordChart: 420, CalendarHeatmap and BulletChart: from the data)",
        "description": "Height of the chart (the legend included); numbers are pixels"
      },
      {
        "name": "width",
        "type": "number | string",
        "required": false,
        "default": "\"100%\"",
        "description": "Width of the chart; numbers are pixels"
      },
      {
        "name": "renderer",
        "type": "ChartRendererPreference",
        "required": false,
        "default": "\"auto\" (the global default, see `setDefaultChartRenderer`)",
        "description": "Backend of the shapes: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software; text is always drawn with Canvas2D, above the shapes"
      },
      {
        "name": "palette",
        "type": "readonly string[]",
        "required": false,
        "description": "Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
      },
      {
        "name": "legend",
        "type": "boolean | ShapeLegendOptions",
        "required": false,
        "default": "shown for pie, donut, funnel, multi-series radar charts, calendar heatmaps and radial bar charts without labels",
        "description": "Legend; clicking an item hides / shows its slice, stage, series, node, bar, row or level"
      },
      {
        "name": "tooltip",
        "type": "boolean | ShapeTooltipOptions",
        "required": false,
        "default": "true",
        "description": "Tooltip; `false` disables it"
      },
      {
        "name": "format",
        "type": "(value: number) => string",
        "required": false,
        "default": "compact numbers of the `locale` (1.2k, 3.4M; 1.2万 in Chinese and Japanese)",
        "description": "Formats the values of the labels and the tooltip"
      },
      {
        "name": "percentFormat",
        "type": "(share: number) => string",
        "required": false,
        "default": "a percent of the `locale` with one decimal, e.g. \"40.0%\", \"40,0 %\"",
        "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "default": "the page language (`<html lang>`, followed when it changes), else the browser language",
        "description": "BCP 47 locale of the texts and numbers the chart writes (tooltip rows, accessible names, number and percent formats, calendar dates); built-in texts in English, Chinese, Japanese and French (English otherwise)"
      },
      {
        "name": "texts",
        "type": "Partial<ShapeChartLabels>",
        "required": false,
        "description": "Replaces built-in texts of the `locale` (tooltip rows, accessible names, \"No data\")"
      },
      {
        "name": "hidden",
        "type": "readonly number[]",
        "required": false,
        "description": "Hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar levels, by index. Makes the visibility controlled: legend clicks then only call `onToggle`, whose `hiddenIndexes` should be stored and passed back. Leave undefined to let the legend hide / show entries by itself."
      },
      {
        "name": "onToggle",
        "type": "(event: ShapeToggleEvent) => void",
        "required": false,
        "description": "Called when a legend item is clicked (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
      },
      {
        "name": "animation",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Entry and update animations (skipped when the user prefers reduced motion)"
      },
      {
        "name": "padding",
        "type": "ChartPadding",
        "required": false,
        "default": "8 on every side",
        "description": "Space around the drawing, in pixels"
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "required": false,
        "default": "the chart type in the `locale`, e.g. \"Donut chart\"",
        "description": "Accessible name of the chart"
      },
      {
        "name": "onHover",
        "type": "(event: ShapeHoverEvent | null) => void",
        "required": false,
        "description": "Called when the hovered (or keyboard-focused) mark changes"
      },
      {
        "name": "onClick",
        "type": "(event: ShapeHoverEvent) => void",
        "required": false,
        "description": "Called when a mark is clicked, tapped or activated with Enter"
      },
      {
        "name": "renderTooltip",
        "type": "(event: ShapeHoverEvent) => ReactNode",
        "required": false,
        "description": "React content of the tooltip (replaces the default content)"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name of the root element"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of the root element"
      },
      {
        "name": "ref",
        "type": "Ref<ShapeChartHandle>",
        "required": false,
        "description": "Imperative handle"
      }
    ]
  },
  "ShapeDatum": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "A named value (pie slice, funnel stage)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name shown in the legend, the labels and the tooltip"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Value (negative values count as 0)"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color (any CSS color, `var(--x)` included); the palette when omitted"
      }
    ]
  },
  "ShapeHoverEvent": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "What the pointer is over",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "index",
        "type": "number",
        "required": true,
        "description": "Index of the slice / stage / series / leaf (treemap: in the flattened leaves; sunburst: of the node, in depth-first order; sankey: of the node, or the number of nodes + the link index for a link; calendar heatmap: days since the first day shown; radial bar / bullet: of the datum; chord: of the group, or the number of groups × (1 + source index) + target index for a ribbon)"
      },
      {
        "name": "indicator",
        "type": "number",
        "required": false,
        "description": "Radar: index of the indicator closest to the pointer"
      },
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name of the mark (sankey link: \"source → target\"; calendar heatmap: the formatted date)"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Value of the mark"
      },
      {
        "name": "percent",
        "type": "number",
        "required": true,
        "description": "Share, 0-1 (pie: of the visible total, funnel: of the first stage, treemap / sunburst: of the root, gauge: of the range, radial bar: of the bar's max, bullet: of the target (else of the scale), sankey: of the flow entering the diagram (links: of the source node), calendar heatmap: of the largest day, chord: of all the flows)"
      },
      {
        "name": "color",
        "type": "string",
        "required": true,
        "description": "Resolved CSS color of the mark"
      },
      {
        "name": "path",
        "type": "string[]",
        "required": false,
        "description": "Treemap / sunburst: names from the root to the node"
      },
      {
        "name": "date",
        "type": "string",
        "required": false,
        "description": "Calendar heatmap: day of the cell, `YYYY-MM-DD`"
      },
      {
        "name": "source",
        "type": "string",
        "required": false,
        "description": "Sankey / chord: name of the source node / group of the hovered link or ribbon"
      },
      {
        "name": "target",
        "type": "string",
        "required": false,
        "description": "Sankey / chord: name of the target node / group of the hovered link or ribbon"
      },
      {
        "name": "reverseValue",
        "type": "number",
        "required": false,
        "description": "Chord: flow from the target back to the source of the hovered ribbon"
      }
    ]
  },
  "ShapeLegendOptions": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "Legend of a shape chart",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "position",
        "type": "\"top\" | \"bottom\"",
        "required": false,
        "default": "\"bottom\"",
        "description": "Legend position"
      },
      {
        "name": "toggle",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Clicking an item hides / shows its slice, stage or series"
      }
    ]
  },
  "ShapeTooltipOptions": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "Tooltip of a shape chart",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "render",
        "type": "(event: ShapeHoverEvent) => string | Node | null",
        "required": false,
        "description": "Renders the tooltip content (a string is set as text)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础

外部标签通过引导线显示名称和占比；onClick（或在高亮扇区上按 Enter）返回所选的流量来源。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/pie-chart/demos/basic.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  PieChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Website sessions over the last 30 days, by traffic source
const sessions = [
  { key: "organic", value: 48200 },
  { key: "direct", value: 23100 },
  { key: "social", value: 16400 },
  { key: "paid", value: 12700 },
  { key: "referral", value: 9800 },
  { key: "email", value: 6100 },
];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const data = useMemo(
    (): ShapeDatum[] =>
      sessions.map(({ key, value }) => ({ name: t(`sources.${key}`), value })),
    [t],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <PieChart
        data={data}
        format={(value) => number.format(value)}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>
              {t("sessionsShare", {
                sessions: number.format(slice.value),
                share: percent.format(slice.percent),
              })}
            </span>
          </div>
        )}
        onClick={setSelected}
        height={320}
        ariaLabel={t("sessionsAria")}
      />
      <p role="status">
        {selected
          ? t("selectedSource", {
              source: selected.name,
              sessions: number.format(selected.value),
              share: percent.format(selected.percent),
            })
          : t("clickSlice")}
      </p>
    </div>
  );
}

```

## Example: 带总计的环形图

centerValue 和 centerLabel 在中心显示总计；onHover 将其替换为当前悬停的套餐，因此关闭了提示框。legend.toggle 设为 false，保证总计始终与可见扇区一致。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/pie-chart/demos/donut.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DonutChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Monthly recurring revenue by plan, in US dollars
const revenue = [
  { key: "enterprise", value: 48200 },
  { key: "business", value: 31500 },
  { key: "pro", value: 22800 },
  { key: "starter", value: 9400 },
];
const total = revenue.reduce((sum, d) => sum + d.value, 0);

const labelContent = ["name", "value"] as const;
// The total in the hole always covers every plan, so slices stay visible
const legend = { toggle: false } as const;

export default function DonutDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  // The hovered (or keyboard-highlighted) plan replaces the total in the hole
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  const data = useMemo(
    (): ShapeDatum[] =>
      revenue.map(({ key, value }) => ({ name: t(`plans.${key}`), value })),
    [t],
  );
  const currency = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const percent = new Intl.NumberFormat(locale, { style: "percent" });
  const format = (value: number) => currency.format(value);

  return (
    <DonutChart
      data={data}
      format={format}
      centerValue={format(hovered ? hovered.value : total)}
      centerLabel={
        hovered
          ? `${hovered.name} · ${percent.format(hovered.percent)}`
          : t("monthlyRevenue")
      }
      onHover={setHovered}
      tooltip={false}
      legend={legend}
      labelContent={labelContent}
      height={320}
      ariaLabel={t("mrrAria")}
    />
  );
}

```

## Example: 下钻云账单

点击某个类别（onClick）会将数据替换为其下的服务；面包屑可返回总览。提示框提示可以点击，图表下方的文字描述所选的类别或服务。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/pie-chart/demos/drill-down.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  PieChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Monthly cloud bill (USD): categories, then the services of each
const BILL = [
  {
    key: "compute",
    color: "#6366f1",
    services: [
      ["vms", 8200],
      ["kubernetes", 5400],
      ["serverless", 1300],
    ],
  },
  {
    key: "databases",
    color: "#10b981",
    services: [
      ["sql", 4300],
      ["nosql", 2100],
      ["cache", 900],
    ],
  },
  {
    key: "storage",
    color: "#0ea5e9",
    services: [
      ["objects", 3100],
      ["blocks", 1900],
      ["backups", 800],
    ],
  },
  {
    key: "network",
    color: "#f59e0b",
    services: [
      ["egress", 2600],
      ["cdn", 1400],
      ["loadBalancers", 600],
    ],
  },
] as const;

const sumOf = (services: readonly (readonly [string, number])[]) =>
  services.reduce((sum, [, value]) => sum + value, 0);
const TOTAL = BILL.reduce((sum, category) => sum + sumOf(category.services), 0);

/** Mixes a #rrggbb color with white: 0 = unchanged, 1 = white */
const lighten = (hex: string, amount: number) => {
  const channel = (i: number) => {
    const value = parseInt(hex.slice(i, i + 2), 16);
    return Math.round(value + (255 - value) * amount)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${channel(1)}${channel(3)}${channel(5)}`;
};

export default function DrillDownDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  // index of the opened category, null on the overview
  const [category, setCategory] = useState<number | null>(null);
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const data = useMemo((): ShapeDatum[] => {
    if (category === null)
      return BILL.map((c) => ({
        name: t(`cloud.categories.${c.key}`),
        value: sumOf(c.services),
        color: c.color,
      }));
    // the services take shades of their category's color
    const { color, services } = BILL[category];
    return services.map(([key, value], i) => ({
      name: t(`cloud.services.${key}`),
      value,
      color: lighten(color, i * 0.3),
    }));
  }, [category, t]);
  const format = useMemo(() => {
    const currency = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    return (value: number) => currency.format(value);
  }, [locale]);
  const percentFormat = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return (share: number) => percent.format(share);
  }, [locale]);

  const open = (index: number | null) => {
    setCategory(index);
    setSelected(null);
  };
  const onClick = (event: ShapeHoverEvent) =>
    category === null ? open(event.index) : setSelected(event);

  const categoryName =
    category === null ? null : t(`cloud.categories.${BILL[category].key}`);
  const categoryTotal = category === null ? 0 : sumOf(BILL[category].services);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <HStack
        gap={4}
        align="center"
        wrap
        as="nav"
        aria-label={t("cloud.breadcrumb")}
      >
        <Button
          size="small"
          variant={category === null ? "solid" : "ghost"}
          aria-current={category === null ? "location" : undefined}
          onClick={() => open(null)}
        >
          {t("cloud.all")}
        </Button>
        {categoryName && (
          <>
            <span aria-hidden>/</span>
            <strong aria-current="location">{categoryName}</strong>
          </>
        )}
      </HStack>
      <PieChart
        data={data}
        legend={false}
        format={format}
        percentFormat={percentFormat}
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>
              {format(slice.value)} · {percentFormat(slice.percent)}
            </span>
            {category === null && <span>{t("cloud.clickToOpen")}</span>}
          </div>
        )}
        onClick={onClick}
        height={320}
        ariaLabel={
          categoryName
            ? t("cloud.servicesAria", { category: categoryName })
            : t("cloud.aria")
        }
      />
      <p role="status" style={{ margin: 0 }}>
        {selected && categoryName
          ? t("cloud.serviceLine", {
              service: selected.name,
              amount: format(selected.value),
              share: percentFormat(selected.percent),
              category: categoryName,
            })
          : categoryName
            ? t("cloud.categoryLine", {
                category: categoryName,
                amount: format(categoryTotal),
                share: percentFormat(categoryTotal / TOTAL),
              })
            : t("cloud.hint", { total: format(TOTAL) })}
      </p>
    </div>
  );
}

```

## Example: 标签

labels 将标签放在外部（带引导线）、扇区内部或不显示；labelContent 可组合名称、数值和百分比。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/pie-chart/demos/labels.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox, HStack, Radio, RadioGroup } from "minerva-design";
import { PieChart, type ShapeDatum } from "minerva-design/charts";

type Placement = "outside" | "inside" | "none";
type Part = "name" | "value" | "percent";

// Support tickets opened this quarter, by channel
const tickets = [
  { key: "email", value: 1240 },
  { key: "chat", value: 980 },
  { key: "form", value: 610 },
  { key: "phone", value: 430 },
  { key: "social", value: 150 },
  { key: "community", value: 90 },
];

const PARTS: Part[] = ["name", "value", "percent"];
const PLACEMENTS: Placement[] = ["outside", "inside", "none"];

export default function LabelsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  const [labels, setLabels] = useState<Placement>("outside");
  const [parts, setParts] = useState<Part[]>(["name", "percent"]);

  const data = useMemo(
    (): ShapeDatum[] =>
      tickets.map(({ key, value }) => ({ name: t(`channels.${key}`), value })),
    [t],
  );
  // Keep the array stable between renders: a new one would redraw the labels
  const labelContent = useMemo(
    () => PARTS.filter((part) => parts.includes(part)),
    [parts],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  const togglePart = (part: Part, checked: boolean) =>
    setParts((current) =>
      checked ? [...current, part] : current.filter((p) => p !== part),
    );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("labelPlacement")}
        direction="horizontal"
        value={labels}
        onChange={(value) => setLabels(value as Placement)}
      >
        {PLACEMENTS.map((placement) => (
          <Radio
            key={placement}
            value={placement}
            label={t(`placements.${placement}`)}
          />
        ))}
      </RadioGroup>
      <HStack gap={16} role="group" aria-label={t("labelContent")}>
        {PARTS.map((part) => (
          <Checkbox
            key={part}
            label={t(`parts.${part}`)}
            checked={parts.includes(part)}
            // at least one part stays selected
            disabled={
              labels === "none" || (parts.length === 1 && parts[0] === part)
            }
            onChange={(checked) => togglePart(part, checked)}
          />
        ))}
      </HStack>
      <PieChart
        data={data}
        labels={labels}
        labelContent={labelContent}
        format={(value) => number.format(value)}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>
              {t("ticketsShare", {
                tickets: number.format(slice.value),
                share: percent.format(slice.percent),
              })}
            </span>
          </div>
        )}
        height={340}
        ariaLabel={t("ticketsAria")}
      />
    </div>
  );
}

```

## Example: 实时投票

每秒都有新投票（setInterval，在卸载或暂停时清除），扇区以动画过渡到新的占比。renderTooltip 显示票数，centerValue 显示累计总数，只有领先选项变化时才会向屏幕阅读器播报。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/pie-chart/demos/live-poll.tsx

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { DonutChart, type ShapeDatum } from "minerva-design/charts";

/** Small seeded random generator: the same "votes" on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Answers of a live product poll; each new vote picks an answer with
// these probabilities
const ANSWERS = ["darkMode", "offline", "api", "integrations", "reports"];
const WEIGHTS = [0.31, 0.18, 0.22, 0.17, 0.12];
const START = [42, 25, 31, 22, 16];
const SEED = 7;

const labelContent = ["percent"] as const;
const legend = { toggle: false } as const;

export default function LivePollDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  const [votes, setVotes] = useState(START);
  const [running, setRunning] = useState(true);
  const random = useRef(mulberry32(SEED));

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      // 1 to 4 new votes per tick, drawn outside the state updater
      const added = ANSWERS.map(() => 0);
      const batch = 1 + Math.floor(random.current() * 4);
      for (let n = 0; n < batch; n++) {
        let r = random.current();
        let i = 0;
        while (i < WEIGHTS.length - 1 && r >= WEIGHTS[i]) {
          r -= WEIGHTS[i];
          i++;
        }
        added[i] += 1;
      }
      setVotes((current) => current.map((value, i) => value + added[i]));
    }, 1200);
    return () => window.clearInterval(timer);
  }, [running]);

  const data = useMemo(
    (): ShapeDatum[] =>
      ANSWERS.map((key, i) => ({
        name: t(`poll.answers.${key}`),
        value: votes[i],
      })),
    [t, votes],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const total = votes.reduce((sum, value) => sum + value, 0);
  const leader = votes.indexOf(Math.max(...votes));

  const reset = () => {
    random.current = mulberry32(SEED);
    setVotes(START);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <strong>{t("poll.question")}</strong>
      <DonutChart
        data={data}
        labelContent={labelContent}
        legend={legend}
        percentFormat={(share) => percent.format(share)}
        centerValue={number.format(total)}
        centerLabel={t("poll.votes")}
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>
              {t("poll.votesShare", {
                votes: number.format(slice.value),
                share: percent.format(slice.percent),
              })}
            </span>
          </div>
        )}
        height={340}
        ariaLabel={t("poll.aria")}
      />
      <HStack gap={8} wrap align="center">
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((current) => !current)}
        >
          {running ? t("poll.pause") : t("poll.resume")}
        </Button>
        <Button size="small" variant="ghost" onClick={reset}>
          {t("poll.reset")}
        </Button>
        {/* only the leader is announced, not every new vote */}
        <output aria-live="polite">
          {t("poll.leading", { answer: data[leader].name })}
        </output>
      </HStack>
    </div>
  );
}

```

## Example: 含“其他”的市场份额

把众多小厂商的长尾合并为一个中性色的“其他”扇区，让环形图只保留少量易读的扇区；中心显示总量。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/pie-chart/demos/market-share.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DonutChart, type ShapeDatum } from "minerva-design/charts";

// Smartphone shipments by vendor (millions of units); the long tail is
// grouped into "Others" so the chart keeps a handful of readable slices
const shipments: [string, number][] = [
  ["Aurora", 231],
  ["Borealis", 226],
  ["Cobalt", 146],
  ["Dynamo", 92],
  ["Ember", 87],
  ["Flux", 38],
  ["Gale", 31],
  ["Halo", 22],
  ["Ion", 17],
  ["Juno", 12],
  ["Kepler", 9],
  ["Lumen", 6],
];
const TOP = 5;

export default function MarketShareDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;

  const data = useMemo((): ShapeDatum[] => {
    const sorted = [...shipments].sort((a, b) => b[1] - a[1]);
    const others = sorted.slice(TOP).reduce((sum, [, value]) => sum + value, 0);
    return [
      ...sorted.slice(0, TOP).map(([name, value]) => ({ name, value })),
      // a neutral color: "Others" is not a competitor
      { name: t("others"), value: others, color: "var(--border-strong-color)" },
    ];
  }, [t]);
  const total = shipments.reduce((sum, [, value]) => sum + value, 0);
  // values are in millions of units
  const units = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(value * 1_000_000);
  }, [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <DonutChart
      data={data}
      format={units}
      percentFormat={(share) => percent.format(share)}
      centerValue={units(total)}
      centerLabel={t("unitsShipped")}
      renderTooltip={(slice) => (
        <div style={{ display: "grid", gap: 2 }}>
          <strong>{slice.name}</strong>
          <span>
            {t("unitsShare", {
              units: units(slice.value),
              share: percent.format(slice.percent),
            })}
          </span>
        </div>
      )}
      height={340}
      ariaLabel={t("marketAria")}
    />
  );
}

```

## Example: 嵌套环

两个图表叠放：类别的 PieChart 位于明细项 DonutChart 的中空处（clip-path 圆形裁剪让外环仍可悬停），明细项使用其类别颜色的浅色调。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/pie-chart/demos/nested.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DonutChart,
  PieChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Household budget per month (EUR): categories inside, items outside
const budget = [
  {
    key: "housing",
    color: "#6366f1",
    items: [
      ["rent", 1150],
      ["energy", 140],
      ["insurance", 45],
    ],
  },
  {
    key: "food",
    color: "#f59e0b",
    items: [
      ["groceries", 420],
      ["restaurants", 160],
    ],
  },
  {
    key: "transport",
    color: "#14b8a6",
    items: [
      ["transit", 86],
      ["car", 210],
    ],
  },
  {
    key: "leisure",
    color: "#ec4899",
    items: [
      ["travel", 180],
      ["subscriptions", 42],
      ["sport", 55],
    ],
  },
] as const;

/** Mixes a #rrggbb color with white: 0 = unchanged, 1 = white */
const lighten = (hex: string, amount: number) => {
  const channel = (i: number) => {
    const value = parseInt(hex.slice(i, i + 2), 16);
    return Math.round(value + (255 - value) * amount)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${channel(1)}${channel(3)}${channel(5)}`;
};

const nameOnly = ["name"] as const;
const HEIGHT = 340;
// the inner pie fills the hole of the outer donut (innerRadius 0.7)
const INNER = Math.round((HEIGHT - 16) * 0.7) - 8;

export default function NestedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  const { categories, items } = useMemo(() => {
    const categories: ShapeDatum[] = budget.map((category) => ({
      name: t(`budget.${category.key}`),
      value: category.items.reduce((sum, [, value]) => sum + value, 0),
      color: category.color,
    }));
    // the items of a category take lighter shades of its color
    const items: ShapeDatum[] = budget.flatMap((category) =>
      category.items.map(([key, value], i) => ({
        name: t(`budget.${key}`),
        value,
        color: lighten(category.color, 0.1 + i * 0.25),
      })),
    );
    return { categories, items };
  }, [t]);
  const euros = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    [locale],
  );
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
  });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div style={{ position: "relative", height: HEIGHT }}>
        <DonutChart
          data={items}
          innerRadius={0.7}
          labels="none"
          legend={false}
          tooltip={false}
          onHover={setHovered}
          height={HEIGHT}
          ariaLabel={t("itemsAria")}
        />
        {/* the clip keeps the corners of the square free for the outer ring */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: INNER,
            height: INNER,
            transform: "translate(-50%, -50%)",
            clipPath: "circle(50%)",
          }}
        >
          <PieChart
            data={categories}
            labels="inside"
            labelContent={nameOnly}
            legend={false}
            tooltip={false}
            onHover={setHovered}
            height={INNER}
            ariaLabel={t("categoriesAria")}
          />
        </div>
      </div>
      <p role="status">
        {hovered
          ? t("budgetLine", {
              name: hovered.name,
              amount: euros.format(hovered.value),
              share: percent.format(hovered.percent),
            })
          : t("hoverRing")}
      </p>
    </div>
  );
}

```

## Example: 带筛选标签的投资组合

图表上方的标签和图例通过 onToggle 编辑同一个受控的 hidden 列表，“全部显示”将其清空。centerValue 汇总所显示的资产类别，renderTooltip 给出每个扇区占整个投资组合（而不仅是可见扇区）的比例。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/pie-chart/demos/portfolio.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack, Tag } from "minerva-design";
import { DonutChart, type ShapeDatum } from "minerva-design/charts";

// Investment portfolio by asset class, market value in US dollars
const HOLDINGS = [
  { key: "usEquities", value: 182_400 },
  { key: "intlEquities", value: 96_300 },
  { key: "bonds", value: 121_500 },
  { key: "realEstate", value: 48_200 },
  { key: "commodities", value: 21_700 },
  { key: "cash", value: 30_900 },
];
const TOTAL = HOLDINGS.reduce((sum, holding) => sum + holding.value, 0);

export default function PortfolioDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  // controlled visibility: the filter chips and the legend share one state
  const [hidden, setHidden] = useState<number[]>([]);

  const data = useMemo(
    (): ShapeDatum[] =>
      HOLDINGS.map(({ key, value }) => ({
        name: t(`portfolio.assets.${key}`),
        value,
      })),
    [t],
  );
  const format = useMemo(() => {
    const currency = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => currency.format(value);
  }, [locale]);
  const percentFormat = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return (share: number) => percent.format(share);
  }, [locale]);

  const visible = HOLDINGS.reduce(
    (sum, holding, i) => (hidden.includes(i) ? sum : sum + holding.value),
    0,
  );
  const toggle = (index: number) =>
    setHidden((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index].sort((a, b) => a - b),
    );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} wrap align="center">
        <HStack gap={8} wrap role="group" aria-label={t("portfolio.filter")}>
          {data.map((slice, index) => (
            <Tag
              key={slice.name}
              clickable
              pressed={!hidden.includes(index)}
              onClick={() => toggle(index)}
            >
              {slice.name}
            </Tag>
          ))}
        </HStack>
        <Button
          size="small"
          variant="ghost"
          disabled={hidden.length === 0}
          onClick={() => setHidden([])}
        >
          {t("portfolio.showAll")}
        </Button>
      </HStack>
      <DonutChart
        data={data}
        hidden={hidden}
        onToggle={(event) => setHidden(event.hiddenIndexes)}
        format={format}
        percentFormat={percentFormat}
        centerValue={format(visible)}
        centerLabel={
          hidden.length ? t("portfolio.selection") : t("portfolio.total")
        }
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>{format(slice.value)}</span>
            <span>
              {t("portfolio.ofPortfolio", {
                share: percentFormat(slice.value / TOTAL),
              })}
            </span>
          </div>
        )}
        height={340}
        ariaLabel={t("portfolio.aria")}
      />
      <output aria-live="polite">
        {t("portfolio.summary", {
          shown: HOLDINGS.length - hidden.length,
          total: HOLDINGS.length,
          value: format(visible),
          share: percentFormat(visible / TOTAL),
        })}
      </output>
    </div>
  );
}

```

## Example: 南丁格尔玫瑰图

rose 让半径（而非角度）表示数值，适合月份这类周期性数据。padAngle、cornerRadius 和较小的 innerRadius 让图形更柔和；每项数据的 color 标出所属季节。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/pie-chart/demos/rose.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PieChart, type ShapeDatum } from "minerva-design/charts";

// Average rainfall per month (January to December), in millimeters
const rainfall = [78, 61, 72, 58, 49, 37, 28, 34, 52, 86, 97, 92];

// One color per season (Dec-Feb, Mar-May, Jun-Aug, Sep-Nov)
const seasons = [
  "var(--primary-color)",
  "var(--success-color)",
  "var(--warning-color)",
  "var(--danger-color)",
];

const labelContent = ["name"] as const;

export default function RoseDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;

  const data = useMemo((): ShapeDatum[] => {
    const month = new Intl.DateTimeFormat(locale, { month: "short" });
    return rainfall.map((value, i) => ({
      name: month.format(new Date(2026, i, 1)),
      value,
      color: seasons[Math.floor(((i + 1) % 12) / 3)],
    }));
  }, [locale]);
  const millimeters = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "millimeter" }),
    [locale],
  );

  return (
    <PieChart
      data={data}
      rose
      innerRadius={0.18}
      padAngle={2}
      cornerRadius={4}
      labelContent={labelContent}
      legend={false}
      format={(value) => millimeters.format(value)}
      renderTooltip={(slice) => (
        <div style={{ display: "grid", gap: 2 }}>
          <strong>{slice.name}</strong>
          <span>{millimeters.format(slice.value)}</span>
        </div>
      )}
      height={360}
      ariaLabel={t("rainfallAria")}
    />
  );
}

```

## Example: 小型多图

每个地区一个小环形图，颜色和顺序一致，因此一个图例即可通用，各地区一目了然。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/pie-chart/demos/small-multiples.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DonutChart, type ShapeDatum } from "minerva-design/charts";

// Share of sessions by device, per region
const devices = ["mobile", "desktop", "tablet"] as const;
const colors = ["var(--primary-color)", "#14b8a6", "#f59e0b"];
const regions: [string, number[]][] = [
  ["asiaPacific", [71, 24, 5]],
  ["europe", [52, 41, 7]],
  ["northAmerica", [48, 44, 8]],
  ["latinAmerica", [66, 29, 5]],
];

export default function SmallMultiplesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const percent = new Intl.NumberFormat(i18n.language, { style: "percent" });

  // the same colors and order in every chart, so one legend serves them all
  const charts = useMemo(
    () =>
      regions.map(([region, values]) => ({
        region: t(`regions.${region}`),
        mobile: values[0] / 100,
        data: devices.map((device, i): ShapeDatum => ({
          name: t(`devices.${device}`),
          value: values[i],
          color: colors[i],
        })),
      })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {devices.map((device, i) => (
          <span
            key={device}
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: colors[i],
              }}
            />
            {t(`devices.${device}`)}
          </span>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 16,
        }}
      >
        {charts.map((chart) => (
          <DonutChart
            key={chart.region}
            data={chart.data}
            labels="none"
            legend={false}
            centerValue={percent.format(chart.mobile)}
            centerLabel={chart.region}
            percentFormat={(share) => percent.format(share)}
            renderTooltip={(slice) => (
              <div style={{ display: "grid", gap: 2 }}>
                <strong>{slice.name}</strong>
                <span>{percent.format(slice.percent)}</span>
              </div>
            )}
            height={170}
            ariaLabel={t("devicesAria", { region: chart.region })}
          />
        ))}
      </div>
    </div>
  );
}

```

## Example: 按季度的满意度调查

通过每个数据项的 color 设置从红到绿的发散色阶，startAngle={-90} 让满意的回答排在前面。切换季度时扇区会以动画过渡；中心显示 CSAT，下方文字显示与上一季度相比的变化。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/pie-chart/demos/survey-quarters.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { DonutChart, type ShapeDatum } from "minerva-design/charts";

// Customer satisfaction survey: answers per quarter, from "very
// dissatisfied" to "very satisfied"
const LEVELS = [
  "veryDissatisfied",
  "dissatisfied",
  "neutral",
  "satisfied",
  "verySatisfied",
];
// a diverging scale: red for the unhappy answers, green for the happy ones
const COLORS = ["#dc2626", "#f97316", "#a8a29e", "#4ade80", "#16a34a"];
const QUARTERS = [
  [62, 118, 240, 410, 170],
  [55, 104, 226, 438, 197],
  [48, 96, 214, 452, 230],
  [41, 80, 198, 470, 271],
];

/** Share of "satisfied" and "very satisfied" answers, 0-1 */
const csatOf = (answers: number[]) =>
  (answers[3] + answers[4]) / answers.reduce((sum, n) => sum + n, 0);

const labelContent = ["percent"] as const;
// the CSAT in the hole is computed on every answer
const legend = { toggle: false } as const;

export default function SurveyQuartersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.pie-chart.data",
  });
  const locale = i18n.language;
  const [quarter, setQuarter] = useState(QUARTERS.length - 1);

  const answers = QUARTERS[quarter];
  // same order and colors every quarter, so the slices animate in place
  const data = useMemo(
    (): ShapeDatum[] =>
      LEVELS.map((level, i) => ({
        name: t(`survey.levels.${level}`),
        value: answers[i],
        color: COLORS[i],
      })),
    [answers, t],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const points = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    [locale],
  );

  const csat = csatOf(answers);
  const respondents = answers.reduce((sum, n) => sum + n, 0);
  const quarterName = (i: number) => t("survey.quarter", { n: i + 1 });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("survey.quarterLabel")}
        direction="horizontal"
        value={quarter}
        onChange={(value) => setQuarter(Number(value))}
      >
        {QUARTERS.map((_, i) => (
          <Radio key={i} value={i} label={quarterName(i)} />
        ))}
      </RadioGroup>
      <DonutChart
        data={data}
        startAngle={-90}
        labelContent={labelContent}
        legend={legend}
        percentFormat={(share) => percent.format(share)}
        centerValue={percent.format(csat)}
        centerLabel={t("survey.csat")}
        renderTooltip={(slice) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{slice.name}</strong>
            <span>
              {t("survey.answers", {
                answers: number.format(slice.value),
                share: percent.format(slice.percent),
              })}
            </span>
          </div>
        )}
        height={340}
        ariaLabel={t("survey.aria", { quarter: quarterName(quarter) })}
      />
      <output aria-live="polite">
        {quarter === 0
          ? t("survey.first", {
              csat: percent.format(csat),
              respondents: number.format(respondents),
            })
          : t("survey.change", {
              csat: percent.format(csat),
              delta: points.format(
                (csat - csatOf(QUARTERS[quarter - 1])) * 100,
              ),
              previous: quarterName(quarter - 1),
              respondents: number.format(respondents),
            })}
      </output>
    </div>
  );
}

```
