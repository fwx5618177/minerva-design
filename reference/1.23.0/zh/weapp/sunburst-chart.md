# 旭日图

用同心圆环展示层级结构：每一圈是一个层级，每个扇区是其父节点的一部分。点击父节点（或在其上按 Enter）可下钻，点击中心（或按 Backspace）返回上一级，切换时角度和圆环会以动画过渡。悬停扇区会高亮其祖先和后代，标签会根据空间沿弧线或沿半径排布。

Package: minerva-design@1.23.0

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

Sunburst: hierarchy as rings, sector labels, tap a parent to drill in and the center to go back (`drill` event, drill() / getDrillPath(), controlled drillPath). Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/sunburst-chart/index",
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
    "name": "innerRadius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "levels",
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
    "name": "padAngle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "cornerRadius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "labels",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "drill",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "drillPath",
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
