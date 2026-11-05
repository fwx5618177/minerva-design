# 旭日图

用同心圆环展示层级结构：每一圈是一个层级，每个扇区是其父节点的一部分。点击父节点（或在其上按 Enter）可下钻，点击中心（或按 Backspace）返回上一级，切换时角度和圆环会以动画过渡。悬停扇区会高亮其祖先和后代，标签会根据空间沿弧线或沿半径排布。

Package: minerva-design@1.21.1

Renderer: uni

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

Macintosh HD

应用程序

文稿

项目

归档

PDF 文件

电子表格

照片

开发

包缓存

模拟器

系统

音乐

其他应用

{{value}} GB

按文件夹统计的磁盘占用，单位为 GB

当前显示 {{path}}。点击中心返回上一级。

点击文件夹即可下钻。

研发

平台

基础设施

安全

开发者工具

产品研发

Web

移动端

支付

数据

数据分析

机器学习

销售

欧洲、中东和非洲

美洲

亚太

客户成功

客服

客户上手

市场

品牌

增长

内容

运营

财务

人力资源

法务

IT

{{value}} 人

按部门、小组和团队统计的人数

全部商品

数码电子

手机

旗舰机

中端机

配件

笔记本电脑

音频

耳机

音箱

家居

厨房

家具

装饰

服饰

男装

女装

童装

运动

户外

健身

类目路径

按商品类目统计的季度收入

亚洲

非洲

欧洲

美洲

大洋洲

其他国家

{{value}} 百万

标签方式

自动

沿弧线

沿半径

不显示

按大洲和国家统计的世界人口，单位为百万

教育

医疗

交通

公共安全

环境

行政

中小学

大学

图书馆

医院

疾病预防

公共交通

道路

自行车道

警务

消防

公园

垃圾清运

供水

{{path}}：{{amount}}，占预算的 {{share}}，占{{area}}的 {{areaShare}}。

{{path}}：{{amount}}，占预算的 {{share}}。

按政策领域和项目划分的城市年度预算

年度预算：{{total}}。点击某个扇区查看其占比。

连锁面包店

牙科诊所

语言学校

内部

网站

品牌设计

预约系统

移动应用

行政事务

培训

设计

开发

会议

评审

支持

学习

时间段

本周

本月

{{hours}} · 占记录工时的 {{share}}

按客户、项目和活动划分的工时（{{period}}）

可计费：{{billable}}，共 {{total}}（{{share}}）。

结账

搜索

账户

商品目录

购物车

支付

配送

查询

搜索建议

登录

个人资料

商品页

评价

{{value}} 次/分钟

按服务和端点划分的每分钟 API 请求数，实时更新

暂停

继续

总计：{{value}}

最繁忙的服务：{{service}}

可再生能源

核能

化石燃料

风能

太阳能

水电

生物质能

天然气

煤炭

石油

{{value}} 太瓦时

隐藏化石燃料

按能源和燃料划分的年度发电量

已隐藏可再生能源：显示 {{total}}。

可再生能源：占所显示 {{total}} 的 {{share}}。

## SunburstChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events and the sunburst drill event; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "SunburstChart"
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
    "name": "drill",
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
    "name": "data",
    "typeText": "readonly TreemapNode[]",
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
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "levels",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "drillPath",
    "typeText": "readonly string[] | undefined",
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
  },
  {
    "name": "drill",
    "typeText": "[event: ShapeDrillEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeDrillEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
