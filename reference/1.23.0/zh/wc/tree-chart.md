# 树图

以整洁树、径向树、思维导图和组织架构图展示层级结构：组织、文件系统、分类体系、计划。整洁树（Buchheim / Reingold–Tilford 算法）保证节点不重叠，并让每个父节点居中于其子节点之上；子树可通过点击、键盘或 API 带动画地折叠和展开。

Package: minerva-design@1.23.0

Renderer: wc

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/tree-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "layout",
    "typeText": "\"tree\" | \"radial\" | \"mindmap\" | \"org\"",
    "attribute": "layout",
    "required": false
  },
  {
    "name": "direction",
    "typeText": "GraphDirection",
    "attribute": "direction",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "nodeShape",
    "typeText": "GraphNodeShape | undefined",
    "attribute": "node-shape",
    "required": false
  },
  {
    "name": "edgeStyle",
    "typeText": "GraphEdgeStyle | undefined",
    "attribute": "edge-style",
    "required": false
  },
  {
    "name": "edgeColor",
    "typeText": "\"neutral\" | \"source\" | \"target\"",
    "attribute": "edge-color",
    "required": false
  },
  {
    "name": "arrowStyle",
    "typeText": "\"open\" | \"filled\"",
    "attribute": "arrow-style",
    "required": false
  },
  {
    "name": "highlight",
    "typeText": "\"neighbors\" | \"lineage\" | \"none\" | undefined",
    "attribute": "highlight",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "attribute": "locale",
    "required": false
  },
  {
    "name": "nodes",
    "typeText": "readonly GraphNode[] | undefined",
    "required": false
  },
  {
    "name": "edges",
    "typeText": "readonly GraphEdge[] | undefined",
    "required": false
  },
  {
    "name": "groups",
    "typeText": "readonly GraphGroup[] | undefined",
    "required": false
  },
  {
    "name": "selected",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "GraphBaseOptions | undefined",
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
    "description": "The hovered (or keyboard-focused) node / edge changed; detail: { type, id, node, edge, index, group, color, degree, clientX, clientY }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-item-click",
    "typeText": "CustomEvent",
    "description": "A node or an edge was clicked (or a node activated with Enter); detail: { type, id, node, edge, index, group, color, degree, clientX, clientY }"
  },
  {
    "name": "minerva-selection-change",
    "typeText": "CustomEvent",
    "description": "The selection changed; detail: { ids }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A tree node was collapsed or expanded; detail: { id, collapsed }"
  },
  {
    "name": "minerva-group-toggle",
    "typeText": "CustomEvent",
    "description": "The legend showed / hid a group; detail: { group, hidden }"
  },
  {
    "name": "minerva-layout-end",
    "typeText": "CustomEvent",
    "description": "The layout is done (the force simulation cooled down); detail: { layout }"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend is ready (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 思维导图

产品发布计划：分支分布在中心主题的两侧，每个分支使用各自的颜色；主题跟随页面语言。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/wc/mind-map.html

```html
<minerva-tree-chart
  id="launch"
  layout="mindmap"
  height="420"
></minerva-tree-chart>

```

### apps/docs/src/docs/pages/tree-chart/wc/mind-map.ts

```tsx
// A mind map of a product launch: the branches spread on both sides of the
// central topic, colored by branch.
import type { MinervaTreeChart } from "minerva-design/web-components/graph";

const TOPICS = {
  en: [
    "Product launch",
    "Research",
    "User interviews",
    "Market analysis",
    "Design",
    "Prototype",
    "Usability tests",
    "Development",
    "Web app",
    "Mobile app",
    "Marketing",
    "Ad campaign",
    "Press release",
  ],
  zh: [
    "产品发布",
    "调研",
    "用户访谈",
    "市场分析",
    "设计",
    "原型",
    "可用性测试",
    "开发",
    "网页应用",
    "移动应用",
    "市场营销",
    "广告投放",
    "新闻稿",
  ],
  ja: [
    "製品ローンチ",
    "リサーチ",
    "ユーザーインタビュー",
    "市場分析",
    "デザイン",
    "プロトタイプ",
    "ユーザビリティテスト",
    "開発",
    "Web アプリ",
    "モバイルアプリ",
    "マーケティング",
    "広告キャンペーン",
    "プレスリリース",
  ],
  fr: [
    "Lancement produit",
    "Recherche",
    "Entretiens utilisateurs",
    "Analyse du marché",
    "Conception",
    "Prototype",
    "Tests d'utilisabilité",
    "Développement",
    "Application web",
    "Application mobile",
    "Marketing",
    "Campagne publicitaire",
    "Communiqué de presse",
  ],
};
// parent of each topic of TOPICS (-1: the central topic)
const PARENT = [-1, 0, 1, 1, 0, 4, 4, 0, 7, 7, 0, 10, 10];
// branch of a topic: its ancestor just below the central topic
const branchOf = (i: number): number =>
  PARENT[i] <= 0 ? i : branchOf(PARENT[i]);

export function setup(root: HTMLElement) {
  const topics =
    TOPICS[document.documentElement.lang as keyof typeof TOPICS] ?? TOPICS.en;
  const chart = root.querySelector<MinervaTreeChart>("#launch")!;
  chart.nodes = topics.map((label, i) => ({
    id: `t${i}`,
    label,
    group: `b${branchOf(i)}`,
  }));
  chart.edges = PARENT.flatMap((parent, i) =>
    parent < 0 ? [] : [{ source: `t${parent}`, target: `t${i}` }],
  );
  chart.options = { legend: false };
}

```

## Example: 可折叠团队的组织架构图

卡片按部门着色，末级团队堆叠在其负责人下方；点击负责人可折叠或展开团队，折叠事件会显示在下方。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tree-chart/wc/org.html

```html
<div style="display: grid; gap: 8px; width: 100%">
  <minerva-tree-chart id="org" layout="org" height="460"></minerva-tree-chart>
  <output id="org-status" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/tree-chart/wc/org.ts

```tsx
// An org chart: cards grouped by department, the leaf teams stacked under
// their manager; clicking a manager collapses / expands the team and
// minerva-toggle reports it.
import type {
  GraphToggleEvent,
  MinervaTreeChart,
} from "minerva-design/web-components/graph";

const TEXT = {
  en: {
    roles: [
      "Chief executive",
      "Technology",
      "Finance",
      "Operations",
      "Web team",
      "Mobile team",
      "Platform team",
      "Accounting",
      "Treasury",
      "Customer support",
      "Logistics",
    ],
    departments: ["Executive", "Engineering", "Finance", "Operations"],
    hint: "Click a manager to collapse or expand the team",
    collapsed: "{name}: collapsed",
    expanded: "{name}: expanded",
  },
  zh: {
    roles: [
      "首席执行官",
      "技术",
      "财务",
      "运营",
      "Web 团队",
      "移动团队",
      "平台团队",
      "会计",
      "资金管理",
      "客户支持",
      "物流",
    ],
    departments: ["管理层", "研发", "财务", "运营"],
    hint: "点击管理者以折叠或展开团队",
    collapsed: "{name}：已折叠",
    expanded: "{name}：已展开",
  },
  ja: {
    roles: [
      "最高経営責任者",
      "技術",
      "財務",
      "運営",
      "Web チーム",
      "モバイルチーム",
      "プラットフォームチーム",
      "経理",
      "資金管理",
      "カスタマーサポート",
      "物流",
    ],
    departments: ["経営", "エンジニアリング", "財務", "運営"],
    hint: "マネージャーをクリックするとチームを折りたたみ / 展開します",
    collapsed: "{name}: 折りたたみ",
    expanded: "{name}: 展開",
  },
  fr: {
    roles: [
      "Direction générale",
      "Technique",
      "Finance",
      "Opérations",
      "Équipe web",
      "Équipe mobile",
      "Équipe plateforme",
      "Comptabilité",
      "Trésorerie",
      "Support client",
      "Logistique",
    ],
    departments: ["Direction", "Ingénierie", "Finance", "Opérations"],
    hint: "Cliquez sur un responsable pour replier ou déplier l'équipe",
    collapsed: "{name} : replié",
    expanded: "{name} : déplié",
  },
};
// manager (index in TEXT.roles, -1: the root) and department of each role
const PEOPLE = [
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
  [3, 3],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaTreeChart>("#org")!;
  const output = root.querySelector<HTMLOutputElement>("#org-status")!;
  chart.nodes = text.roles.map((label, i) => ({
    id: `p${i}`,
    label,
    group: `d${PEOPLE[i][1]}`,
  }));
  chart.edges = PEOPLE.flatMap(([manager], i) =>
    manager < 0 ? [] : [{ source: `p${manager}`, target: `p${i}` }],
  );
  chart.groups = text.departments.map((name, i) => ({ id: `d${i}`, name }));
  output.textContent = text.hint;
  const onToggle = (event: Event) => {
    const { id, collapsed } = (event as CustomEvent<GraphToggleEvent>).detail;
    output.textContent = text[collapsed ? "collapsed" : "expanded"].replace(
      "{name}",
      text.roles[Number(id.slice(1))],
    );
  };
  chart.addEventListener("minerva-toggle", onToggle);
  return () => chart.removeEventListener("minerva-toggle", onToggle);
}

```
