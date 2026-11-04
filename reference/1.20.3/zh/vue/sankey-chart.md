# 桑基图

展示各阶段之间的流量：能源平衡、用户路径、预算分配。节点按列排布，连线粗细与流量成正比，并通过迭代松弛调整节点顺序，让流向更平直、交叉更少。悬停节点会高亮其全部流向，悬停连线可查看它占来源节点的比例；方向键可在节点和连线之间切换。

Package: minerva-design@1.20.3

Renderer: vue

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

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "SankeyChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "animation",
    "type": "boolean",
    "required": false,
    "description": "Entry and update animations, skipped when the user prefers reduced motion (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "labels",
    "type": "boolean",
    "required": false,
    "description": "Node labels (name and value; default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "deep",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also follows in-place mutations of nested data (`series[0].data.push()`);\nby default the chart updates when a prop is replaced (cheaper on large data)",
    "typeText": "boolean"
  },
  {
    "name": "legend",
    "type": "boolean | ShapeLegendOptions",
    "required": false,
    "description": "Legend; clicking an item hides / shows its slice, stage or series (shown by default for pie, donut, funnel and multi-series radar charts)",
    "typeText": "boolean | ShapeLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | ShapeTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it (default `true`)",
    "typeText": "boolean | ShapeTooltipOptions"
  },
  {
    "name": "labelValues",
    "type": "boolean",
    "required": false,
    "description": "Shows the value after the name in the labels (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the shapes: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software; text is always drawn with Canvas2D (default `auto`, see `setDefaultChartRenderer`)",
    "typeText": "ChartRendererPreference"
  },
  {
    "name": "width",
    "type": "string | number",
    "required": false,
    "description": "Width of the chart; numbers are pixels (default `100%`)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels, strings any CSS length",
    "typeText": "string | number"
  },
  {
    "name": "padding",
    "type": "ChartPadding",
    "required": false,
    "description": "Space around the drawing, in pixels (default 8 on every side)",
    "typeText": "ChartPadding"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart (default: the chart type, e.g. \"Donut chart\")",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip rows, accessible names, compact numbers); the page language by default",
    "typeText": "string"
  },
  {
    "name": "hidden",
    "type": "readonly number[]",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap nodes, by\nindex. Makes the visibility controlled: legend clicks then only emit\n`toggle`, whose `hiddenIndexes` should be stored and passed back.",
    "typeText": "readonly number[]"
  },
  {
    "name": "texts",
    "type": "Partial<ShapeChartLabels>",
    "required": false,
    "description": "Replaces built-in texts of the `locale` (tooltip rows, accessible names, \"No data\")",
    "typeText": "Partial<ShapeChartLabels>"
  },
  {
    "name": "format",
    "type": "((value: number) => string)",
    "required": false,
    "description": "Formats the values of the labels and the tooltip (default: compact numbers, 1.2k, 3.4M)",
    "typeText": "((value: number) => string)"
  },
  {
    "name": "percentFormat",
    "type": "((share: number) => string)",
    "required": false,
    "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1 (default: one decimal, \"40.0%\")",
    "typeText": "((share: number) => string)"
  },
  {
    "name": "links",
    "type": "readonly SankeyLink[]",
    "required": true,
    "description": "Flows between the nodes (by name or index); links closing a cycle are ignored",
    "typeText": "readonly SankeyLink[]"
  },
  {
    "name": "nodes",
    "type": "readonly SankeyNode[]",
    "required": false,
    "description": "Nodes, in their initial order; nodes only named by a link are appended",
    "typeText": "readonly SankeyNode[]"
  },
  {
    "name": "align",
    "type": "\"left\" | \"right\" | \"center\" | \"justify\"",
    "required": false,
    "description": "Column of the nodes without a `column` (default `justify`)",
    "typeText": "\"left\" | \"right\" | \"center\" | \"justify\""
  },
  {
    "name": "nodeWidth",
    "type": "number",
    "required": false,
    "description": "Width of the node bars, in pixels (default 12)",
    "typeText": "number"
  },
  {
    "name": "nodePadding",
    "type": "number",
    "required": false,
    "description": "Vertical gap between the nodes of a column, in pixels (default 12)",
    "typeText": "number"
  },
  {
    "name": "iterations",
    "type": "number",
    "required": false,
    "description": "Relaxation passes that straighten the flows and reduce crossings (default 32)",
    "typeText": "number"
  },
  {
    "name": "linkOpacity",
    "type": "number",
    "required": false,
    "description": "Opacity of the links, 0-1 (default 0.4)",
    "typeText": "number"
  },
  {
    "name": "linkColor",
    "type": "\"neutral\" | \"target\" | \"gradient\" | \"source\"",
    "required": false,
    "description": "Color of the links without `color` (default `gradient`)",
    "typeText": "\"neutral\" | \"target\" | \"gradient\" | \"source\""
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[event: ShapeHoverEvent | null]",
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
    "name": "click",
    "type": "[event: ShapeHoverEvent]",
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
    "name": "toggle",
    "type": "[event: ShapeToggleEvent]",
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

## Example: energy

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/vue/energy.vue

```vue
<script setup lang="ts">
// Energy flows from the sources to the uses through the grid: link
// thickness is the flow, colored from the source to the target.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { SankeyChart } from "minerva-design/vue/charts";

const NODES = {
  en: [
    "Solar",
    "Wind",
    "Gas",
    "Grid",
    "Homes",
    "Industry",
    "Transport",
    "Losses",
  ],
  zh: ["太阳能", "风能", "天然气", "电网", "居民", "工业", "交通", "损耗"],
  ja: ["太陽光", "風力", "ガス", "送電網", "家庭", "産業", "運輸", "損失"],
  fr: [
    "Solaire",
    "Éolien",
    "Gaz",
    "Réseau",
    "Foyers",
    "Industrie",
    "Transports",
    "Pertes",
  ],
};

// source, target (node indexes), TWh
const LINKS = [
  [0, 3, 32],
  [1, 3, 48],
  [2, 3, 70],
  [3, 4, 52],
  [3, 5, 61],
  [3, 6, 22],
  [3, 7, 15],
].map(([source, target, value]) => ({ source, target, value }));

const { language } = useI18n();
const nodes = computed(() =>
  (NODES[language.value] ?? NODES.en).map((name) => ({ name })),
);
const format = (value: number) => `${value} TWh`;
</script>

<template>
  <SankeyChart :nodes="nodes" :links="LINKS" :format="format" />
</template>

```

## Example: journey

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/vue/journey.vue

```vue
<script setup lang="ts">
// A user journey with drop-offs: `align="left"` keeps every step in its
// column, `link-color="source"` colors a flow like the page it leaves.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { SankeyChart } from "minerva-design/vue/charts";

const STEPS = {
  en: ["Home page", "Search", "Product page", "Cart", "Checkout", "Left"],
  zh: ["首页", "搜索", "商品页", "购物车", "结账", "离开"],
  ja: ["トップページ", "検索", "商品ページ", "カート", "購入手続き", "離脱"],
  fr: ["Accueil", "Recherche", "Fiche produit", "Panier", "Paiement", "Départ"],
};

// from, to (step indexes), visitors
const FLOWS = [
  [0, 1, 420],
  [0, 2, 310],
  [0, 5, 270],
  [1, 2, 330],
  [1, 5, 90],
  [2, 3, 380],
  [2, 5, 260],
  [3, 4, 240],
  [3, 5, 140],
].map(([source, target, value]) => ({ source, target, value }));

const { language } = useI18n();
const nodes = computed(() =>
  (STEPS[language.value] ?? STEPS.en).map((name, i) => ({
    name,
    ...(i === 5 ? { color: "var(--text-secondary-color, #9ca3af)" } : {}),
  })),
);
</script>

<template>
  <SankeyChart :nodes="nodes" :links="FLOWS" align="left" link-color="source" />
</template>

```
