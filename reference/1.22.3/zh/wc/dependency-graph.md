# 依赖图

以分层方式绘制的有向无环图：包依赖、构建流水线、数据血缘、任务计划。Sugiyama 布局会打破环、分配层级、为跨层的边插入虚拟节点、减少交叉并让长边保持笔直；边可以是平滑样条或带箭头的正交连线。悬停或选中节点即可高亮其全部上游和下游，还能显示计划的关键路径。

Package: minerva-design@1.22.3

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

#### 布局原理

DependencyGraph 即 layout="dag" 的 GraphChart：方框按标签自适应大小，每条边带箭头，并高亮上下游。同一布局也以纯函数 dagLayout 导出。

通过反转深度优先搜索中的回边来打破环；层级由最长路径确定，随后把源节点移到其后继旁边，并把出入边数相等的节点移到较空的层。

跨越多层的边会插入虚拟节点；再通过重心法和中位数法的多轮上下扫描重排每一层并保留最佳顺序，最后用相邻交换消除剩余交叉。

层内位置由朝向邻居的加权保序回归求得，长边权重很高，因此保持笔直。支持 TB、LR、BT 和 RL 四个方向。

highlight="lineage"（此处的默认值）会高亮悬停、聚焦或选中节点的全部祖先和后代；criticalPath 高亮总时长（节点 value）最长的链路。

应用

框架包

基础库

工具链

开发依赖

循环依赖

单体仓库中各个包之间的依赖关系

安装依赖

代码检查

类型检查

单元测试

安全扫描

构建应用

构建文档

端到端测试

视觉测试

打包

部署预发

部署生产

成功

运行中

失败

等待中

{{status}} · {{minutes}} 分钟

Web 产物

类型声明

重试

高亮关键路径

CI/CD 流水线：任务、依赖关系及其状态

关键路径：{{minutes}} 分钟 —— {{path}}

 → 

收入看板

留存看板

增长看板

原始数据

清洗层

数据集市

看板

从原始表到看板的数据血缘

{{name}}：上游 {{upstream}} 个，下游 {{downstream}} 个

点击数据表或看板以高亮其血缘。

已完成

运行中

排队中

已完成 {{percent}}

{{seconds}} 秒

Worker 数量

{{n}} 个 worker

暂停

运行

重置

monorepo 的构建任务，按调度器执行状态着色

构建完成，{{workers}} 个 worker 共用时 {{seconds}} 秒。

{{elapsed}} / {{seconds}} 秒 — 运行中：{{running}}。

无

任何调度都快不过关键路径：{{seconds}} 秒。

项目简报

用户研究

站点地图

线框图

视觉设计

文案撰写

API 与托管

CMS 配置

前端开发

内容录入

测试与修复

SEO 检查

正式上线

调研

设计

开发

上线

网站上线计划：任务、依赖关系与关键路径

{{name}}：{{range}}，{{days}} 个工作日，可推迟 {{slack}} 个工作日而不影响上线。

{{name}}：{{range}}，{{days}} 个工作日，位于关键路径上——任何延误都会推迟上线。

共 {{days}} 个工作日，{{date}} 上线。点击任务查看其日期与浮动时间。

成功

失败

上游失败

失败的任务

夜间 ETL 任务，标出失败的任务及其阻塞的任务

{{task}} 失败：{{total}} 个任务中有 {{blocked}} 个被阻塞，{{sinks}} 将无法交付。

{{task}} 失败，但没有其他任务依赖它。

程序设计导论

离散数学

微积分

数据结构

计算机体系结构

线性代数

概率论

算法

操作系统

数据库

计算机网络

机器学习

编译原理

分布式系统

信息安全

深度学习

毕业设计

第 {{n}} 学年

流向

从上到下

从左到右

从下到上

从右到左

计算机专业课程及其先修关系

修读{{course}}之前需完成 {{total}} 门课程：{{list}}。

{{course}}没有先修课程。

单价

数量

折扣 (%)

税率

小计

折扣额

净额

税额

运费

总计

单位成本

输入

公式

订单表的单元格及其公式引用的单元格

{{cell}}已修改：重算了 {{total}} 个单元格（{{list}}）。总计：{{value}}。

## DependencyGraph

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/dependency-graph",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "direction",
    "typeText": "GraphDirection",
    "attribute": "direction",
    "required": false
  },
  {
    "name": "criticalPath",
    "typeText": "boolean | readonly string[] | undefined",
    "attribute": "critical-path",
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

## Example: 模块依赖链

按层级排列的 Web 应用模块；悬停或点击模块会高亮它依赖的全部模块以及依赖它的全部模块，并在下方显示当前选择。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/dependency-graph/wc/modules.html

```html
<div style="display: grid; gap: 8px; width: 100%">
  <minerva-dependency-graph
    id="modules"
    highlight="lineage"
    height="460"
  ></minerva-dependency-graph>
  <output id="module-selection" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/dependency-graph/wc/modules.ts

```tsx
// Modules of a web application, from the shared code at the top to the
// application at the bottom: hovering or clicking a module highlights its
// whole lineage (what it needs and what needs it).
import type { MinervaDependencyGraph } from "minerva-design/web-components/graph";

const TEXT = {
  en: {
    modules: [
      "Utilities",
      "HTTP",
      "Translations",
      "UI components",
      "Charts",
      "API client",
      "Authentication",
      "State store",
      "Router",
      "Dashboard",
      "Reports",
      "Application",
    ],
    layers: ["Shared", "Core", "Features", "Application"],
    hint: "Click a module to highlight its dependencies",
    selected: "Selected: ",
  },
  zh: {
    modules: [
      "工具函数",
      "HTTP",
      "多语言",
      "UI 组件",
      "图表",
      "API 客户端",
      "认证",
      "状态管理",
      "路由",
      "仪表盘",
      "报表",
      "应用",
    ],
    layers: ["共享", "核心", "功能", "应用"],
    hint: "点击一个模块以高亮其依赖",
    selected: "已选择：",
  },
  ja: {
    modules: [
      "ユーティリティ",
      "HTTP",
      "翻訳",
      "UI コンポーネント",
      "チャート",
      "API クライアント",
      "認証",
      "状態管理",
      "ルーター",
      "ダッシュボード",
      "レポート",
      "アプリ",
    ],
    layers: ["共有", "コア", "機能", "アプリ"],
    hint: "モジュールをクリックすると依存関係が強調表示されます",
    selected: "選択中: ",
  },
  fr: {
    modules: [
      "Utilitaires",
      "HTTP",
      "Traductions",
      "Composants UI",
      "Graphiques",
      "Client API",
      "Authentification",
      "Gestion d'état",
      "Routeur",
      "Tableau de bord",
      "Rapports",
      "Application",
    ],
    layers: ["Partagé", "Cœur", "Fonctionnalités", "Application"],
    hint: "Cliquez sur un module pour mettre en évidence ses dépendances",
    selected: "Sélection : ",
  },
};
// layer (index in TEXT.layers) of each module of TEXT.modules
const LAYER = [0, 1, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3];
// dependency → dependent (indexes in TEXT.modules)
const USES = [
  [0, 1],
  [1, 5],
  [5, 6],
  [5, 7],
  [6, 8],
  [0, 4],
  [2, 3],
  [3, 9],
  [3, 10],
  [4, 9],
  [4, 10],
  [5, 9],
  [5, 10],
  [7, 9],
  [7, 10],
  [8, 11],
  [9, 11],
  [10, 11],
  [6, 11],
  [2, 11],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaDependencyGraph>("#modules")!;
  const output = root.querySelector<HTMLOutputElement>("#module-selection")!;
  chart.nodes = text.modules.map((label, i) => ({
    id: `m${i}`,
    label,
    group: `l${LAYER[i]}`,
  }));
  chart.edges = USES.map(([a, b]) => ({ source: `m${a}`, target: `m${b}` }));
  chart.groups = text.layers.map((name, i) => ({ id: `l${i}`, name }));
  output.textContent = text.hint;
  const onSelect = (event: Event) => {
    const { ids } = (event as CustomEvent<{ ids: string[] }>).detail;
    output.textContent = ids.length
      ? text.selected +
        ids.map((id) => text.modules[Number(id.slice(1))]).join(", ")
      : text.hint;
  };
  chart.addEventListener("minerva-selection-change", onSelect);
  return () => chart.removeEventListener("minerva-selection-change", onSelect);
}

```

## Example: CI 流水线与关键路径

任务从左到右排列，使用直角连线；任务时长即其数值，因此最长的任务链会被高亮，开关可将其关闭。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/dependency-graph/wc/pipeline.html

```html
<div style="display: grid; gap: 12px; width: 100%">
  <minerva-switch id="critical" checked></minerva-switch>
  <minerva-dependency-graph
    id="pipeline"
    direction="LR"
    edge-style="orthogonal"
    critical-path
    height="380"
  ></minerva-dependency-graph>
</div>

```

### apps/docs/src/docs/pages/dependency-graph/wc/pipeline.ts

```tsx
// A CI pipeline left to right: the duration of a job is its value, so the
// critical path (the longest chain of jobs) is highlighted and can be
// switched off.
import type { MinervaSwitch } from "minerva-design/web-components";
import type { MinervaDependencyGraph } from "minerva-design/web-components/graph";

const TEXT = {
  en: {
    jobs: [
      "Install dependencies",
      "Lint",
      "Type check",
      "Unit tests",
      "Build",
      "E2E tests",
      "Package",
      "Deploy",
    ],
    minutes: "{n} min",
    critical: "Critical path",
  },
  zh: {
    jobs: [
      "安装依赖",
      "代码检查",
      "类型检查",
      "单元测试",
      "构建",
      "端到端测试",
      "打包",
      "部署",
    ],
    minutes: "{n} 分钟",
    critical: "关键路径",
  },
  ja: {
    jobs: [
      "依存関係のインストール",
      "Lint",
      "型チェック",
      "単体テスト",
      "ビルド",
      "E2E テスト",
      "パッケージ化",
      "デプロイ",
    ],
    minutes: "{n} 分",
    critical: "クリティカルパス",
  },
  fr: {
    jobs: [
      "Installer les dépendances",
      "Analyse statique",
      "Vérification des types",
      "Tests unitaires",
      "Compilation",
      "Tests E2E",
      "Empaquetage",
      "Déploiement",
    ],
    minutes: "{n} min",
    critical: "Chemin critique",
  },
};
// duration of each job of TEXT.jobs, in minutes
const MINUTES = [3, 2, 3, 6, 5, 9, 2, 4];
// job → the jobs that need it (indexes in TEXT.jobs)
const NEEDS = [
  [0, 1],
  [0, 2],
  [0, 3],
  [2, 4],
  [4, 5],
  [1, 6],
  [3, 6],
  [4, 6],
  [6, 7],
  [5, 7],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const toggle = root.querySelector<MinervaSwitch>("#critical")!;
  const chart = root.querySelector<MinervaDependencyGraph>("#pipeline")!;
  toggle.label = text.critical;
  chart.nodes = text.jobs.map((label, i) => ({
    id: `j${i}`,
    label,
    subtitle: text.minutes.replace("{n}", String(MINUTES[i])),
    value: MINUTES[i],
  }));
  chart.edges = NEEDS.map(([a, b]) => ({ source: `j${a}`, target: `j${b}` }));
  const onChange = () => {
    chart.criticalPath = toggle.checked;
  };
  toggle.addEventListener("minerva-change", onChange);
  return () => toggle.removeEventListener("minerva-change", onChange);
}

```
