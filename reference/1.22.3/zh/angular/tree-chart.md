# 树图

以整洁树、径向树、思维导图和组织架构图展示层级结构：组织、文件系统、分类体系、计划。整洁树（Buchheim / Reingold–Tilford 算法）保证节点不重叠，并让每个父节点居中于其子节点之上；子树可通过点击、键盘或 API 带动画地折叠和展开。

Package: minerva-design@1.22.3

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

#### 概览

TreeChart 接收节点和父 → 子的边；没有父节点的节点即为根（可用 tree.root 指定）。会形成环或第二个父节点的边会被忽略。

整洁树算法为线性时间，并考虑每个节点的尺寸：标签不会重叠，父节点居中于子节点之上，相同的子树形状一致。

layout="tree"（默认从左到右，可设任意方向）、"radial"（围绕根节点的同心圆，标签沿半径方向）、"mindmap"（分支在两侧均衡分布，每个分支一种颜色）以及 "org"（带标题和副标题的卡片、正交连线，叶子团队按列堆叠）。

点击有子节点的节点、在其上按 Enter，或调用 expand / collapse / toggle：其子树会带动画地收拢进该节点，并以徽标显示隐藏的节点数。节点设置 collapsed 可初始折叠。

林晓

陈子航

王思远

赵敏

孙悦

李明轩

周杰

郑雨涵

冯浩然

何俊

许婷

高翔

马丽

罗斌

梁晨

宋凯

唐诗雨

韩磊

首席执行官

首席技术官

首席财务官

首席运营官

首席营销官

前端负责人

后端负责人

前端工程师

前端工程师

后端工程师

后端工程师

站点可靠性工程师

财务总监

财务分析师

客服经理

物流经理

品牌经理

增长经理

管理层

技术部

财务部

运营部

市场部

公司组织架构图

点击负责人以折叠或展开其团队。

{{name}} 的团队已折叠

{{name}} 的团队已展开

产品发布

目标

1 万付费用户

品牌知名度

90% 留存

目标用户

产品团队

自由职业者

学生

推广渠道

发布会

邮件简报

合作伙伴

社交媒体

时间线

内测

媒体资料包

发布日

风险

延期

定价反馈

预算

广告

线下活动

产品发布计划思维导图

输入

导航

反馈

数据展示

布局

图表

设计系统的组件，按类别分组

文件夹

```tsx
代码
```

样式

数据

文档

全部展开

全部折叠

适应视图

项目文件

信用评分

收入 ≥ 3 × 月供？

在职满 2 年？

负债收入比 < 35%？

批准

批准，降低额度

批准，提高利率

人工审核

拒绝

700 及以上

600–699

低于 600

是

否

问题

批准

审核

拒绝

贷款审批决策树，高亮当前申请人的决策路径

结论：{{outcome}}，共回答 {{questions}} 个问题。

全部商品

电子产品

家居

服饰

运动

电脑

手机

音频

笔记本电脑

台式机

平板电脑

智能手机

手机壳

充电器

耳机

音箱

厨房

家具

园艺

锅具

咖啡机

刀具

沙发

书桌

办公椅

园艺工具

绿植

服装

鞋履

配饰

夹克

连衣裙

运动鞋

靴子

包袋

手表

户外

健身

骑行

帐篷

登山鞋

瑜伽垫

哑铃

自行车

头盔

 › 

搜索类目

商店的商品类目体系

{{total}} 个匹配的类目。按 Enter 或点击标签定位。

搜索类目，例如“靴子”或“书桌”。

Macintosh HD

系统

应用程序

媒体

文稿

缓存与备份

布局

树形

径向

按文件夹统计的磁盘占用，节点大小对应字节数

{{name}}：{{size}} —— 占 {{parent}} 的 {{parentShare}}，占磁盘的 {{share}}。

{{name}}：已使用 {{size}}。

App 2.0 版本

新用户引导

注册

邮箱验证

社交账号登录

产品导览

导览页面

跳过与恢复

支付

结账

银行卡表单

钱包支付

账单

发票

退款

平台

离线模式

同步队列

冲突处理

质量

崩溃报告

性能预算

{{points}} 点

{{points}} 点 · 已完成 {{done}}

汇总

已完成

进行中

待办

细节层级

交付物

功能

工作包

计划显示到：{{level}}。

移动应用版本的工作分解结构，含故事点

已折叠{{name}}：{{points}} 点，剩余 {{remaining}} 点。

已展开{{name}}：{{points}} 点，剩余 {{remaining}} 点。

共 {{points}} 个故事点，已完成 {{done}}。点击条目可折叠或展开。

四分之一决赛

半决赛

决赛

待进行

{{winner}}–{{loser}}

{{n}} 号种子

未进行

胜者

仍在比赛

已淘汰

冠军

下一轮

重新开始

重新模拟

从四分之一决赛到决赛的淘汰赛对阵图

{{team}}夺得冠军！

{{round}}胜者：{{teams}}。

八支球队按实力排定种子。进行下一轮以揭晓结果。

## TreeChart

Support: beta

Native Angular: MnTreeChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTreeChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "layout",
    "typeText": "\"radial\" | \"tree\" | \"mindmap\" | \"org\"",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "direction",
    "typeText": "GraphDirection | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "tree",
    "typeText": "GraphTreeOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "nodes",
    "typeText": "readonly GraphNode[]",
    "required": true,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edges",
    "typeText": "readonly GraphEdge[]",
    "required": true,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "groups",
    "typeText": "readonly GraphGroup[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "nodeShape",
    "typeText": "GraphNodeShape | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "nodeSize",
    "typeText": "number | readonly [number, number] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edgeStyle",
    "typeText": "GraphEdgeStyle | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edgeWidth",
    "typeText": "number | readonly [number, number] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edgeColor",
    "typeText": "\"neutral\" | \"source\" | \"target\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "arrows",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "arrowStyle",
    "typeText": "\"open\" | \"filled\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "nodeLabels",
    "typeText": "boolean | \"auto\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "edgeLabels",
    "typeText": "boolean | \"auto\" | \"hover\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "highlight",
    "typeText": "\"none\" | \"neighbors\" | \"lineage\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "selected",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "animation",
    "typeText": "number | boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "fitPadding",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "controls",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | GraphLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | GraphTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "interaction",
    "typeText": "boolean | GraphInteractionOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "labels",
    "typeText": "Partial<GraphChartLabels> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "GraphHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "itemClick",
    "typeText": "GraphHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "selectionChange",
    "typeText": "string[]",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "string[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "nodeToggle",
    "typeText": "GraphToggleEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "groupToggle",
    "typeText": "GraphGroupToggleEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphGroupToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "layoutEnd",
    "typeText": "GraphLayoutEndEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "GraphLayoutEndEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Org chart with collapsible teams

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, signal, computed } from '@angular/core';
import { MnTreeChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTreeChart],
  template: `
<mn-tree-chart
  [nodes]="nodes()"
  [edges]="edges"
  [groups]="groups()"
  layout="org"
  [locale]="language()"
  [height]="460"
  (nodeToggle)="toggled.set($event)"
/>
<output aria-live="polite">{{ status() }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  toggled = signal<{ id: string; collapsed: boolean } | null>(null);
  text = {
  "en": {
    "roles": ["Chief executive", "Technology", "Finance", "Operations", "Web team", "Mobile team", "Platform team", "Accounting", "Treasury", "Customer support", "Logistics"],
    "departments": ["Executive", "Engineering", "Finance", "Operations"],
    "hint": "Click a manager to collapse or expand the team",
    "collapsed": "{name}: collapsed",
    "expanded": "{name}: expanded"
  },
  "zh": {
    "roles": ["首席执行官", "技术", "财务", "运营", "Web 团队", "移动团队", "平台团队", "会计", "资金管理", "客户支持", "物流"],
    "departments": ["管理层", "研发", "财务", "运营"],
    "hint": "点击管理者以折叠或展开团队",
    "collapsed": "{name}：已折叠",
    "expanded": "{name}：已展开"
  },
  "ja": {
    "roles": ["最高経営責任者", "技術", "財務", "運営", "Web チーム", "モバイルチーム", "プラットフォームチーム", "経理", "資金管理", "カスタマーサポート", "物流"],
    "departments": ["経営", "エンジニアリング", "財務", "運営"],
    "hint": "マネージャーをクリックするとチームを折りたたみ / 展開します",
    "collapsed": "{name}: 折りたたみ",
    "expanded": "{name}: 展開"
  },
  "fr": {
    "roles": ["Direction générale", "Technique", "Finance", "Opérations", "Équipe web", "Équipe mobile", "Équipe plateforme", "Comptabilité", "Trésorerie", "Support client", "Logistique"],
    "departments": ["Direction", "Ingénierie", "Finance", "Opérations"],
    "hint": "Cliquez sur un responsable pour replier ou déplier l'équipe",
    "collapsed": "{name} : replié",
    "expanded": "{name} : déplié"
  }
};
  people = [
  [-1, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 1],
  [1, 1],
  [1, 1],
  [2, 2],
  [2, 2],
  [3, 3],
  [3, 3]
];
  edges = [
  {
    "source": "p0",
    "target": "p1"
  },
  {
    "source": "p0",
    "target": "p2"
  },
  {
    "source": "p0",
    "target": "p3"
  },
  {
    "source": "p1",
    "target": "p4"
  },
  {
    "source": "p1",
    "target": "p5"
  },
  {
    "source": "p1",
    "target": "p6"
  },
  {
    "source": "p2",
    "target": "p7"
  },
  {
    "source": "p2",
    "target": "p8"
  },
  {
    "source": "p3",
    "target": "p9"
  },
  {
    "source": "p3",
    "target": "p10"
  }
];
  nodes = computed(() =>
    this.text[this.language()].roles.map((label, i) => ({
      id: `p${i}`,
      label,
      group: `d${this.people[i][1]}`,
    })),
  );
  groups = computed(() =>
    this.text[this.language()].departments.map((name, i) => ({ id: `d${i}`, name })),
  );
  status = computed(() => {
    const t = this.text[this.language()];
    const toggled = this.toggled();
    return toggled
      ? (toggled.collapsed ? t.collapsed : t.expanded).replace(
          "{name}",
          t.roles[Number(toggled.id.slice(1))],
        )
      : t.hint;
  });
}

```

## Example: 思维导图

围绕中心主题的发布计划。分支按想法数量在两侧均衡分布，每个分支一种颜色，连线离中心越远越细。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, computed } from '@angular/core';
import { MnTreeChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTreeChart],
  template: `
<mn-tree-chart
  [nodes]="nodes()"
  [edges]="edges"
  layout="mindmap"
  [legend]="false"
  [locale]="language()"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  topics = {
  "en": ["Product launch", "Research", "User interviews", "Market analysis", "Design", "Prototype", "Usability tests", "Development", "Web app", "Mobile app", "Marketing", "Ad campaign", "Press release"],
  "zh": ["产品发布", "调研", "用户访谈", "市场分析", "设计", "原型", "可用性测试", "开发", "网页应用", "移动应用", "市场营销", "广告投放", "新闻稿"],
  "ja": ["製品ローンチ", "リサーチ", "ユーザーインタビュー", "市場分析", "デザイン", "プロトタイプ", "ユーザビリティテスト", "開発", "Web アプリ", "モバイルアプリ", "マーケティング", "広告キャンペーン", "プレスリリース"],
  "fr": ["Lancement produit", "Recherche", "Entretiens utilisateurs", "Analyse du marché", "Conception", "Prototype", "Tests d'utilisabilité", "Développement", "Application web", "Application mobile", "Marketing", "Campagne publicitaire", "Communiqué de presse"]
};
  branch = [0, 1, 1, 1, 4, 4, 4, 7, 7, 7, 10, 10, 10];
  edges = [
  {
    "source": "t0",
    "target": "t1"
  },
  {
    "source": "t1",
    "target": "t2"
  },
  {
    "source": "t1",
    "target": "t3"
  },
  {
    "source": "t0",
    "target": "t4"
  },
  {
    "source": "t4",
    "target": "t5"
  },
  {
    "source": "t4",
    "target": "t6"
  },
  {
    "source": "t0",
    "target": "t7"
  },
  {
    "source": "t7",
    "target": "t8"
  },
  {
    "source": "t7",
    "target": "t9"
  },
  {
    "source": "t0",
    "target": "t10"
  },
  {
    "source": "t10",
    "target": "t11"
  },
  {
    "source": "t10",
    "target": "t12"
  }
];
  nodes = computed(() =>
    this.topics[this.language()].map((label, i) => ({
      id: `t${i}`,
      label,
      group: `b${this.branch[i]}`,
    })),
  );
}

```
