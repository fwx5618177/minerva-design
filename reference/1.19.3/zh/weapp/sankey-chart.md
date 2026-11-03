# 桑基图

展示各阶段之间的流量：能源平衡、用户路径、预算分配。节点按列排布，连线粗细与流量成正比，并通过迭代松弛调整节点顺序，让流向更平直、交叉更少。悬停节点会高亮其全部流向，悬停连线可查看它占来源节点的比例；方向键可在节点和连线之间切换。

Package: minerva-design@1.19.3

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

太阳能

风能

水电

核能

天然气

煤炭

石油

电力

集中供热

成品油

居民

工业

服务业

交通

损耗

{{value}} 太瓦时

能源平衡：一次能源、能源载体和终端用途，单位为太瓦时每年

搜索广告

自然搜索

邮件订阅

社交媒体

首页

价格页

博客

注册表单

离开网站

开始试用

放弃注册

付费套餐

试用到期

一周的会话，从获客渠道到订阅

{{source}} → {{target}}：{{value}} 次会话（占 {{source}} 的 {{share}}%）

{{name}}：{{value}} 次会话

点击某个步骤或路径（或聚焦图表后按 Enter）即可选中

软件授权

订阅

服务

补贴

年度预算

研发

销售与市场

运营

综合管理

平台

移动应用

AI 研究

营销活动

销售团队

基础设施

客户支持

财务与法务

办公场地

年度预算：收入来源、部门和项目

邮件

在线聊天

电话

聊天机器人

一线客服

二线客服

研发团队

已解决

已退款

已提缺陷

一个月的客服工单，从渠道到处理结果

节点对齐

两端对齐

左对齐

右对齐

居中

连线颜色

渐变

来源

目标

中性

标签显示数值

云服务

软件授权

硬件

专业服务

总收入

营业成本

毛利润

研发

销售与市场

管理费用

营业利润

所得税

净利润

季度利润表：收入板块、成本与利润

毛利率 {{gross}} · 营业利润率 {{operating}} · 净利率 {{net}}

巴西

哥伦比亚

埃塞俄比亚

越南

汉堡烘焙厂

鹿特丹烘焙厂

北部仓库

中部仓库

南部仓库

咖啡馆

超市

网店

{{value}} 吨

一个月的咖啡运输量：从产地经烘焙厂和仓库到各销售渠道

点击一个站点以追踪经过它的全部流量，或点击一条运输线路将其选中

{{name}}：从 {{from}} 个站点运入 {{inbound}}，向 {{to}} 个站点运出 {{outbound}}

{{source}} → {{target}}：{{value}}（占 {{source}} 发货量的 {{share}}）

清除选择

内部推荐

招聘网站

职业社交网络

猎头机构

校园招聘

收到申请

简历未通过

电话初筛

初筛未通过

面试

面试未通过

发放录用

拒绝录用

已入职

显示流失

一年的招聘漏斗：从候选人来源到入职

共 {{applied}} 份申请，录用 {{hired}} 人（{{rate}}）。通过初筛的候选人中有 {{interview}} 进入面试，{{accepted}} 的录用通知被接受。

Web 应用

iOS 应用

Android 应用

合作伙伴 API

API 网关

认证

商品目录

搜索

结算

2xx 成功

4xx 客户端错误

5xx 服务端错误

{{value}} 次/秒

总计：{{total}}。

服务端错误率：{{rate}}

服务端错误率：{{rate}}，结算服务故障

暂停

继续

实时 API 流量（每秒请求数）：从客户端到各服务及其状态码

PET 瓶与托盘

HDPE 容器

PP 杯盒与瓶盖

LDPE 薄膜

其他聚合物

投放市场的包装

回收收集

焚烧

填埋

泄漏到自然环境

再生利用

分拣废料

新包装

降级产品

{{value}} 百万吨

占{{source}}的 {{share}}

占全部包装的 {{share}}

一年的塑料包装（百万吨）：聚合物、废弃处理途径与再生利用

## SankeyChart

Support: beta

Sankey diagram: nodes in columns and links with thickness proportional to the flow, alignment, link colors / opacity, labels. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/sankey-chart/index",
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
    "name": "nodes",
    "typeText": "array",
    "required": false
  },
  {
    "name": "links",
    "typeText": "array",
    "required": false
  },
  {
    "name": "nodeWidth",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "nodePadding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "align",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "iterations",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "linkColor",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "linkOpacity",
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
    "name": "labelValues",
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
