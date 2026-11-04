# 子弹图

紧凑的 KPI 条形图（Stephen Few）：每一行用条形表示实际值，背后是定性区间（不同深浅的灰色，越差越深），并用标记表示目标，每行使用各自的刻度。不同行可以使用不同单位，因此仪表盘能在很小的空间内展示许多 KPI。悬停某一行或使用方向键可查看其数值、目标和所在区间。

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

收入

千美元

利润率

占收入的 %

平均订单金额

美元

新客户

人数

满意度

满分 5 分

差

中

好

违约

有风险

健康

本季度至今的销售 KPI 与目标对比

结算

搜索

移动端

平台

增长

数据

各团队交付的故事点与承诺值的对比

可用性

请求成功率 %

Apdex

得分，0–1

吞吐量

请求 / 秒

错误预算

剩余 %

本月 API 的服务等级目标

访客

千人

注册

账号数

激活率

占注册的 %

月经常性收入

千美元

月份

所选月份的增长 KPI 与目标对比

企业客户在签约后 30 天内完成上线部署的比例

新客户占比 %

优先级工单在一个工作小时内得到首次响应的比例

工单占比 %

未引发任何客户可感知故障的生产环境发布占比

发布占比 %

年度订阅合同的净收入留存率（含扩容与流失）

比率

名称较长的运营 KPI 与目标对比

市场

研发

销售

人力资源

行政后勤

差旅

年度预算：{{budget}}

宽裕

紧张

超出计划

有 {{over}} 个部门支出快于计划。点击某行查看其偏差。

{{department}}超出计划：截至第三季度末偏差 {{variance}}，已使用年度预算的 {{share}}，剩余 {{left}}。

{{department}}在计划之内：截至第三季度末偏差 {{variance}}，已使用年度预算的 {{share}}，剩余 {{left}}。

第三季度末各部门支出与当期计划预算的对比

进风温度

湿度

功耗

风扇转速

°C

相对湿度 %

每机柜 kW

最大转速的 %

正常

警告

严重

实时读数

机房传感器读数与设定值及阈值的对比

需要关注：{{sensors}}

所有传感器均在限值范围内。

周跑量

长距离跑

累计爬升

训练次数

睡眠

计划：{{plan}}

低于计划

符合计划

高于计划

跑者

阿玛拉

卢卡斯

小美

{{value}}，计划 {{plan}}（{{share}}）

{{runner}} 的每周训练与计划对比

{{runner}} 完成了 {{metrics}} 项每周目标中的 {{met}} 项。

研发

销售

客户支持

市场

产品

财务

今年计划 {{plan}} 人

落后

追赶中

按计划

排序

计划顺序

最落后的在前

最领先的在前

各团队招聘人数与年度编制计划的对比

所显示的 {{teams}} 个团队已招聘 {{hired}} 人，计划 {{planned}} 人（{{share}}）。

未显示任何团队。

## BulletChart

Support: beta

Bullet chart: value bars against qualitative ranges and a target marker, horizontal or vertical, scale ticks. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/bullet-chart/index",
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
    "name": "orientation",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "ranges",
    "typeText": "array",
    "required": false
  },
  {
    "name": "rangeLabels",
    "typeText": "array",
    "required": false
  },
  {
    "name": "rangeColors",
    "typeText": "array",
    "required": false
  },
  {
    "name": "barSize",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "targetColor",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "ticks",
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
