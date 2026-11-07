# 桑基图

展示各阶段之间的流量：能源平衡、用户路径、预算分配。节点按列排布，连线粗细与流量成正比，并通过迭代松弛调整节点顺序，让流向更平直、交叉更少。悬停节点会高亮其全部流向，悬停连线可查看它占来源节点的比例；方向键可在节点和连线之间切换。

Package: minerva-design@1.22.2

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/sankey-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "align",
    "typeText": "\"justify\" | \"left\" | \"right\" | \"center\"",
    "attribute": "align",
    "required": false
  },
  {
    "name": "linkColor",
    "typeText": "\"gradient\" | \"source\" | \"target\" | \"neutral\"",
    "attribute": "link-color",
    "required": false
  },
  {
    "name": "hideLabels",
    "typeText": "boolean",
    "attribute": "hide-labels",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "nodes",
    "typeText": "readonly SankeyNode[] | undefined",
    "required": false
  },
  {
    "name": "links",
    "typeText": "readonly SankeyLink[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<SankeyChartOptions, \"type\">> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered (or keyboard-focused) mark changed; detail: { index, name, value, share }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-click",
    "typeText": "CustomEvent",
    "description": "A mark was clicked, tapped or activated with Enter; detail: { index, name, value, share }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A legend item was clicked (or `toggle()` called); detail: { index, hidden, hiddenIndexes }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 能源流向

从能源来源经电网流向用途；连线粗细表示流量，颜色从来源渐变到去向。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/wc/energy.html

```html
<minerva-sankey-chart id="energy"></minerva-sankey-chart>

```

### apps/docs/src/docs/pages/sankey-chart/wc/energy.ts

```tsx
// Energy flows from the sources to the uses through the grid: link
// thickness is the flow, colored from the source to the target.
import type { MinervaSankeyChart } from "minerva-design/web-components/chart";

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
];

export function setup(root: HTMLElement) {
  const names =
    NODES[document.documentElement.lang as keyof typeof NODES] ?? NODES.en;
  const chart = root.querySelector<MinervaSankeyChart>("#energy")!;
  chart.nodes = names.map((name) => ({ name }));
  chart.links = LINKS.map(([source, target, value]) => ({
    source,
    target,
    value,
  }));
  chart.options = { format: (value) => `${value} TWh` };
}

```

## Example: 带流失的用户路径

访客在页面间的流转以及离开的用户；步骤左对齐，流量颜色与来源一致。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/wc/journey.html

```html
<minerva-sankey-chart
  id="journey"
  align="left"
  link-color="source"
></minerva-sankey-chart>

```

### apps/docs/src/docs/pages/sankey-chart/wc/journey.ts

```tsx
// A user journey with drop-offs: `align="left"` keeps every step in its
// column, `link-color="source"` colors a flow like the page it leaves.
import type { MinervaSankeyChart } from "minerva-design/web-components/chart";

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
];

export function setup(root: HTMLElement) {
  const steps =
    STEPS[document.documentElement.lang as keyof typeof STEPS] ?? STEPS.en;
  const chart = root.querySelector<MinervaSankeyChart>("#journey")!;
  chart.nodes = steps.map((name, i) => ({
    name,
    ...(i === 5 ? { color: "var(--text-secondary-color, #9ca3af)" } : {}),
  }));
  chart.links = FLOWS.map(([source, target, value]) => ({
    source,
    target,
    value,
  }));
}

```
