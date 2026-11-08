# 矩形树图

以面积与数值成正比的嵌套矩形展示层级数据，一眼看出哪些部分占用最多（磁盘占用、预算、投资组合）。悬停或使用方向键高亮单元格；提示框会显示其路径。

Package: minerva-design@1.23.1

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

媒体

视频

照片

音乐

应用程序

项目

系统

资源库

缓存

日志

下载

安装包

压缩包

按文件夹统计的磁盘用量

{{path}}：{{size}}（占磁盘的 {{share}}）

点击一个单元格查看它的位置

研发

销售

市场

客户成功

运营

财务

人力资源

法务

各部门的年度预算

科技

金融

医疗

能源

消费

市值：{{value}}

按板块分组、按当日涨跌着色的股市热力图

占打包体积的 {{share}}

按模块统计的 JavaScript 打包体积

总计 {{size}}；超过 100 KB 的依赖：{{modules}}。

电子产品

家居

服饰

运动

手机

笔记本电脑

音频

厨房

家具

装饰

女装

男装

童装

户外

健身

目录路径

全部类别

按类别、子类别和品牌划分的季度收入

按子类别和品牌划分的{{category}}收入

{{path}}：{{revenue}}，占该类别的 {{share}}。

点击某个类别将其展开。

点击某个品牌查看其收入。

计算

数据库

存储

网络

可观测性

占账单的 {{share}}

按服务和资源划分的月度云成本

显示：{{visible}}，占 {{total}} 账单的 {{share}}。

月度账单：{{total}}。

全部显示

实时更新

{{used}} / {{limit}}（{{share}}）

按命名空间划分的集群 Pod 内存使用量

超过内存上限 {{threshold}} 的 Pod：{{pods}}

所有 Pod 均低于内存上限的 {{threshold}}。

欧洲

美洲

亚太

指标

收入

订单数

利润

占总计的 {{share}}（{{metric}}）

按地区和国家划分的年度销售：{{metric}}

## TreemapChart

Support: beta

Treemap: nested nodes (squarified), parent headers, gap, path in the events. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/treemap-chart/index",
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
    "name": "gap",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "headers",
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
