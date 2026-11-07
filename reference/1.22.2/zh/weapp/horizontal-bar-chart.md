# 条形图

从左侧生长的水平条形，类别沿左侧排列：适合排名、长名称、发散型调查和进度展示。

Package: minerva-design@1.22.2

Renderer: weapp

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

开发者

使用各编程语言的开发者占比

我在这里看得到职业发展路径

我的工作量是可控的

我拥有所需的工具

我的经理支持我

我的薪酬是公平的

非常不同意

不同意

同意

非常同意

员工调查结果，左侧为不同意，右侧为同意

已完成

评审中

待办

平台

支付

移动端

增长

设计

各团队里程碑任务的状态

票数

所有页面和邮件支持深色模式

移动设备离线模式

将报表连同图表导出为 PDF

支持 SAML 和 OIDC 单点登录

日历双向同步

批量编辑多条记录

所有对象支持自定义字段

最受期待功能的票数

预算

实际

研发

市场

销售

客服

财务

各部门的预算与实际支出

变化

北美

欧洲

亚太

拉丁美洲

中东

非洲

各地区月活跃用户的变化

用户

信息

照片

地图

音乐

备忘录

各应用的月活跃用户

{{app}}：{{users}} 百万用户

点击一个条形

收入

销量

无线耳机

智能手表

蓝牙音箱

机械键盘

快速充电器

高清摄像头

无线鼠标

平板电脑

USB-C 数据线

笔记本支架

排序依据

显示行数

前 {{n}} 名

全部商品

上月最畅销的商品，从高到低排列

这 {{n}} 件商品占总量的 {{share}}。

{{value}} GW

光伏装机容量

播放

暂停

重新播放

回到开头

{{year}} 年底光伏装机容量最多的国家

薪资区间

初级

中级

高级

资深

首席

总监

报价

最低

中位值

最高

报价 / 中位值

报价 −{{step}}

报价 +{{step}}

{{offer}} 的报价落在{{levels}}区间内。

{{offer}} 的报价不在任何区间内。

各职级的年薪区间，报价以竖线表示

剩余错误预算

发布冻结

过去 30 天各服务剩余的错误预算，从最差开始排列

SLO {{slo}}，实测可用性 {{availability}}

在允许的 {{allowed}} 中还剩 {{minutes}} 可停机时间。

预算已超支 {{minutes}}。

点击某个服务查看其预算。

## HorizontalBarChart

Support: beta

Chart whose untyped series are bars from the left (categories down the left side), `stacked` / `percent`, value `labels`. Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/horizontal-bar-chart/index",
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
    "default": 320
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
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
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
    "name": "palette",
    "typeText": "array",
    "required": false
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
    "name": "labels",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "stacked",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "percent",
    "typeText": "boolean",
    "required": false,
    "default": false
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
