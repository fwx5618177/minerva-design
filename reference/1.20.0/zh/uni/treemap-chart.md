# 矩形树图

以面积与数值成正比的嵌套矩形展示层级数据，一眼看出哪些部分占用最多（磁盘占用、预算、投资组合）。悬停或使用方向键高亮单元格；提示框会显示其路径。

Package: minerva-design@1.20.0

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

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

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "TreemapChart"
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
    "name": "headers",
    "typeText": "boolean | undefined",
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
    "typeText": "readonly TreemapNode[]",
    "required": true
  },
  {
    "name": "gap",
    "typeText": "number | undefined",
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
    "name": "palette",
    "typeText": "readonly string[] | undefined",
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
