# 径向条形图

用同心圆环展示进度：活动圆环、OKR 完成度、销售额与配额对比。每个条形按数值与最大值之比填充所在圆环，带有着色的背景轨道和圆角端点；标签位于圆的空白处，中心可显示汇总文字。悬停圆环或使用方向键可查看其数值、最大值和进度。

Package: minerva-design@1.20.5

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

活动

锻炼

站立

星期

个圆环已合拢

所选日期的活动圆环：活动、锻炼和站立与目标的对比

激活率

第 4 周留存

NPS 高于 50

p95 延迟

流失率降低

平均完成度

本季度关键结果的完成度

华北

华南

华东

西部

配额达成

各区域季度销售额与配额的对比

CPU

内存

磁盘

网络

形状

四分之三圆

整圆

半圆

圆角端点

背景轨道

服务器资源使用率，占容量的百分比

应急资金

暑假旅行

新笔记本电脑

购房首付

点击某个目标，查看还需要多长时间。

{{goal}}：已存 {{saved}}，目标 {{target}}。还差 {{remaining}}，按每月 {{monthly}} 约需 {{months}} 个月。

全部目标

各储蓄目标的已存金额与目标对比

席尔瓦

科瓦尔斯基

奥卡福

莫罗

田中

延森

进球

助攻

排名依据

第 {{rank}} 名 {{name}}

{{stat}}：{{games}} 场 {{value}} 个

场均 {{ratio}}

本赛季联赛{{stat}}排行

领先者：{{name}}（{{stat}}：{{value}}）

发布会视频

活动照片

演示文稿

数据库备份

已上传

各文件的上传进度

重新开始

所有文件均已上传（{{size}}）。

已上传 {{done}}/{{files}} 个文件

我感到被重视

我的目标很明确

我在这里能成长

工作与生活平衡

我的经理支持我

我会推荐来这里工作

排序

问卷顺序

同意率从高到低

同意率从低到高

平均同意率

{{answered}} 位受访者中有 {{agree}} 位同意（{{share}}）

同意各调查陈述的员工比例

## RadialBarChart

Support: beta

Radial bar chart: concentric progress rings with tracks, rounded ends, labels and center texts. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/radial-bar-chart/index",
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
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
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
    "name": "hidden",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "animation",
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
    "name": "texts",
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
    "name": "max",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "innerRadius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "startAngle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "sweep",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "gap",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "track",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "rounded",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "labelContent",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "centerValue",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "centerLabel",
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
    "typeText": "NativeShapeHoverEvent",
    "description": "Highlighted mark after a tap (index -1 when cleared)."
  },
  {
    "name": "click",
    "typeText": "NativeShapeHoverEvent",
    "description": "A mark was tapped."
  },
  {
    "name": "toggle",
    "typeText": "{ index: number; hidden: boolean; hiddenIndexes: number[] }",
    "description": "A legend item was tapped (or toggle() called); controlled charts must publish hiddenIndexes through hidden."
  },
  {
    "name": "drill",
    "typeText": "{ path: string[] }",
    "description": "Sunburst: a parent or the center was tapped (or drill() called); controlled charts must publish path through drillPath."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
