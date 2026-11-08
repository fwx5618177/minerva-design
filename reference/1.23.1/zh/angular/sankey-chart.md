# 桑基图

展示各阶段之间的流量：能源平衡、用户路径、预算分配。节点按列排布，连线粗细与流量成正比，并通过迭代松弛调整节点顺序，让流向更平直、交叉更少。悬停节点会高亮其全部流向，悬停连线可查看它占来源节点的比例；方向键可在节点和连线之间切换。

Package: minerva-design@1.23.1

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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

Native Angular: MnSankeyChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSankeyChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "nodes",
    "typeText": "readonly SankeyNode[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "links",
    "typeText": "readonly SankeyLink[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "nodeWidth",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "nodePadding",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "align",
    "typeText": "\"right\" | \"left\" | \"center\" | \"justify\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "linkColor",
    "typeText": "\"neutral\" | \"gradient\" | \"source\" | \"target\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "linkOpacity",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 能源流向

一个国家能源平衡中的一次能源、能源载体和终端用途。每个节点有各自的颜色，连线从来源颜色渐变到目标颜色；format 为标签和提示框加上单位。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSankeyChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSankeyChart],
  template: `
@let n = names[language()];
<mn-sankey-chart
  [nodes]="[{ name: n[0] }, { name: n[1] }, { name: n[2] }, { name: n[3] }, { name: n[4] }, { name: n[5] }, { name: n[6] }, { name: n[7] }]"
  [links]="links"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  links = [
  {
    "source": 0,
    "target": 3,
    "value": 32
  },
  {
    "source": 1,
    "target": 3,
    "value": 48
  },
  {
    "source": 2,
    "target": 3,
    "value": 70
  },
  {
    "source": 3,
    "target": 4,
    "value": 52
  },
  {
    "source": 3,
    "target": 5,
    "value": 61
  },
  {
    "source": 3,
    "target": 6,
    "value": 22
  },
  {
    "source": 3,
    "target": 7,
    "value": 15
  }
];
  names = {
  "en": ["Solar", "Wind", "Gas", "Grid", "Homes", "Industry", "Transport", "Losses"],
  "zh": ["太阳能", "风能", "天然气", "电网", "居民", "工业", "交通", "损耗"],
  "ja": ["太陽光", "風力", "ガス", "送電網", "家庭", "産業", "運輸", "損失"],
  "fr": ["Solaire", "Éolien", "Gaz", "Réseau", "Foyers", "Industrie", "Transports", "Pertes"]
};
}

```

## Example: 用户路径

一周的会话从哪里来、在哪里结束。align="left" 让离开的访客停在离开时所在页面的旁边，linkColor="source" 按渠道为路径着色，onClick 返回所点击的节点或连线（含来源和目标）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSankeyChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSankeyChart],
  template: `
@let s = steps[language()];
<mn-sankey-chart
  [nodes]="[{ name: s[0] }, { name: s[1] }, { name: s[2] }, { name: s[3] }, { name: s[4] }, { name: s[5], color: 'var(--text-secondary-color, #9ca3af)' }]"
  [links]="links"
  align="left"
  linkColor="source"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  links = [
  {
    "source": 0,
    "target": 1,
    "value": 420
  },
  {
    "source": 0,
    "target": 2,
    "value": 310
  },
  {
    "source": 0,
    "target": 5,
    "value": 270
  },
  {
    "source": 1,
    "target": 2,
    "value": 330
  },
  {
    "source": 1,
    "target": 5,
    "value": 90
  },
  {
    "source": 2,
    "target": 3,
    "value": 380
  },
  {
    "source": 2,
    "target": 5,
    "value": 260
  },
  {
    "source": 3,
    "target": 4,
    "value": 240
  },
  {
    "source": 3,
    "target": 5,
    "value": 140
  }
];
  steps = {
  "en": ["Home page", "Search", "Product page", "Cart", "Checkout", "Left"],
  "zh": ["首页", "搜索", "商品页", "购物车", "结账", "离开"],
  "ja": ["トップページ", "検索", "商品ページ", "カート", "購入手続き", "離脱"],
  "fr": ["Accueil", "Recherche", "Fiche produit", "Panier", "Paiement", "Départ"]
};
}

```
