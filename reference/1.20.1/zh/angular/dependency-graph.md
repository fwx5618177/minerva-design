# 依赖图

以分层方式绘制的有向无环图：包依赖、构建流水线、数据血缘、任务计划。Sugiyama 布局会打破环、分配层级、为跨层的边插入虚拟节点、减少交叉并让长边保持笔直；边可以是平滑样条或带箭头的正交连线。悬停或选中节点即可高亮其全部上游和下游，还能显示计划的关键路径。

Package: minerva-design@1.20.1

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Native Angular: MnDependencyGraph. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDependencyGraph"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "direction",
    "typeText": "GraphDirection",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "dag",
    "typeText": "GraphDagOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/graph.ts"
  },
  {
    "name": "criticalPath",
    "typeText": "boolean | readonly string[] | undefined",
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

## Example: CI/CD 流水线

从左到右的构建流水线，使用正交连线。分组按状态为任务着色（可在图例中隐藏），节点 value 为耗时，criticalPath 高亮最长的任务链，下方摘要用 criticalPath() 重新计算。构建应用到打包之间传递两个产物（平行边各走各的路线），失败的视觉测试会重试自身（自环）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, computed } from '@angular/core';
import { MnDependencyGraph, MnSwitch, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDependencyGraph, MnSwitch],
  template: `
@let t = text[language()];
<mn-switch [(checked)]="critical" [label]="t.critical" />
<mn-dependency-graph
  [nodes]="nodes()"
  [edges]="edges"
  direction="LR"
  edgeStyle="orthogonal"
  [criticalPath]="critical"
  [height]="380"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  critical = true;
  text = {
  "en": {
    "jobs": ["Install dependencies", "Lint", "Type check", "Unit tests", "Build", "E2E tests", "Package", "Deploy"],
    "minutes": "{n} min",
    "critical": "Critical path"
  },
  "zh": {
    "jobs": ["安装依赖", "代码检查", "类型检查", "单元测试", "构建", "端到端测试", "打包", "部署"],
    "minutes": "{n} 分钟",
    "critical": "关键路径"
  },
  "ja": {
    "jobs": ["依存関係のインストール", "Lint", "型チェック", "単体テスト", "ビルド", "E2E テスト", "パッケージ化", "デプロイ"],
    "minutes": "{n} 分",
    "critical": "クリティカルパス"
  },
  "fr": {
    "jobs": ["Installer les dépendances", "Analyse statique", "Vérification des types", "Tests unitaires", "Compilation", "Tests E2E", "Empaquetage", "Déploiement"],
    "minutes": "{n} min",
    "critical": "Chemin critique"
  }
};
  minutes = [3, 2, 3, 6, 5, 9, 2, 4];
  edges = [
  {
    "source": "j0",
    "target": "j1"
  },
  {
    "source": "j0",
    "target": "j2"
  },
  {
    "source": "j0",
    "target": "j3"
  },
  {
    "source": "j2",
    "target": "j4"
  },
  {
    "source": "j4",
    "target": "j5"
  },
  {
    "source": "j1",
    "target": "j6"
  },
  {
    "source": "j3",
    "target": "j6"
  },
  {
    "source": "j4",
    "target": "j6"
  },
  {
    "source": "j6",
    "target": "j7"
  },
  {
    "source": "j5",
    "target": "j7"
  }
];
  nodes = computed(() => {
    const t = this.text[this.language()];
    return t.jobs.map((label, i) => ({
      id: `j${i}`,
      label,
      subtitle: t.minutes.replace("{n}", String(this.minutes[i])),
      value: this.minutes[i],
    }));
  });
}

```

## Example: Module lineage

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, signal, computed } from '@angular/core';
import { MnDependencyGraph, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDependencyGraph],
  template: `
<mn-dependency-graph
  [nodes]="nodes()"
  [edges]="edges"
  [groups]="groups()"
  highlight="lineage"
  [locale]="language()"
  [height]="460"
  (selectionChange)="selection.set($event)"
/>
<output aria-live="polite">{{ status() }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  selection = signal<string[]>([]);
  text = {
  "en": {
    "modules": ["Utilities", "HTTP", "Translations", "UI components", "Charts", "API client", "Authentication", "State store", "Router", "Dashboard", "Reports", "Application"],
    "layers": ["Shared", "Core", "Features", "Application"],
    "hint": "Click a module to highlight its dependencies",
    "selected": "Selected: "
  },
  "zh": {
    "modules": ["工具函数", "HTTP", "多语言", "UI 组件", "图表", "API 客户端", "认证", "状态管理", "路由", "仪表盘", "报表", "应用"],
    "layers": ["共享", "核心", "功能", "应用"],
    "hint": "点击一个模块以高亮其依赖",
    "selected": "已选择："
  },
  "ja": {
    "modules": ["ユーティリティ", "HTTP", "翻訳", "UI コンポーネント", "チャート", "API クライアント", "認証", "状態管理", "ルーター", "ダッシュボード", "レポート", "アプリ"],
    "layers": ["共有", "コア", "機能", "アプリ"],
    "hint": "モジュールをクリックすると依存関係が強調表示されます",
    "selected": "選択中: "
  },
  "fr": {
    "modules": ["Utilitaires", "HTTP", "Traductions", "Composants UI", "Graphiques", "Client API", "Authentification", "Gestion d'état", "Routeur", "Tableau de bord", "Rapports", "Application"],
    "layers": ["Partagé", "Cœur", "Fonctionnalités", "Application"],
    "hint": "Cliquez sur un module pour mettre en évidence ses dépendances",
    "selected": "Sélection : "
  }
};
  layer = [0, 1, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3];
  edges = [
  {
    "source": "m0",
    "target": "m1"
  },
  {
    "source": "m1",
    "target": "m5"
  },
  {
    "source": "m5",
    "target": "m6"
  },
  {
    "source": "m5",
    "target": "m7"
  },
  {
    "source": "m6",
    "target": "m8"
  },
  {
    "source": "m0",
    "target": "m4"
  },
  {
    "source": "m2",
    "target": "m3"
  },
  {
    "source": "m3",
    "target": "m9"
  },
  {
    "source": "m3",
    "target": "m10"
  },
  {
    "source": "m4",
    "target": "m9"
  },
  {
    "source": "m4",
    "target": "m10"
  },
  {
    "source": "m5",
    "target": "m9"
  },
  {
    "source": "m5",
    "target": "m10"
  },
  {
    "source": "m7",
    "target": "m9"
  },
  {
    "source": "m7",
    "target": "m10"
  },
  {
    "source": "m8",
    "target": "m11"
  },
  {
    "source": "m9",
    "target": "m11"
  },
  {
    "source": "m10",
    "target": "m11"
  },
  {
    "source": "m6",
    "target": "m11"
  },
  {
    "source": "m2",
    "target": "m11"
  }
];
  nodes = computed(() =>
    this.text[this.language()].modules.map((label, i) => ({
      id: `m${i}`,
      label,
      group: `l${this.layer[i]}`,
    })),
  );
  groups = computed(() =>
    this.text[this.language()].layers.map((name, i) => ({ id: `l${i}`, name })),
  );
  status = computed(() => {
    const t = this.text[this.language()];
    const ids = this.selection();
    return ids.length
      ? t.selected + ids.map((id) => t.modules[Number(id.slice(1))]).join(", ")
      : t.hint;
  });
}

```
