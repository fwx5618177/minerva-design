# 甘特图

在时间轴上以条形表示任务，显示进度、分组、里程碑和今日线；可沿时间缩放和平移。

Package: minerva-design@1.21.0

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

用户研究

干系人访谈

项目启动

线框图

视觉设计

设计系统

前端开发

后端与 CMS

内容迁移

测试与无障碍

上线

调研

设计

开发

上线

今天

进度

里程碑

网站改版的项目计划

移动端改版

离线同步

桌面小组件

搜索 v2

多区域部署

开放 API

新版引导

推荐计划

价格页面

移动端

平台

增长

按团队划分的年度产品路线图

登录页

重置密码

个人资料 API

头像上传

邮件模板

通知

端到端测试

安娜

本

陈

达拉

{{task}}（{{owner}}）：{{start}} – {{end}}，已完成 {{progress}}%

点击一个任务

按开发者划分的迭代任务

需求规格

开发

翻译

公开测试

发布

中文（zh-CN）

法语（fr-FR）

发布计划，{{locale}}

启动

产品规格

同步 API

应用界面

联调集成

安全评审

应用商店素材

Beta 测试

上架发布

产品

后端

移动端

依赖箭头

移动应用发布计划及任务之间的依赖关系

场地清理

基坑开挖

钢筋笼加工

基础浇筑

回填

地坪

一层钢结构

楼承板

二层钢结构

基础验收

主体结构验收

土方队

钢结构队

混凝土队

质检员

基础工程

主体结构

验收

按施工队排列的施工计划及任务之间的依赖关系

Atlas 团队

Borealis 团队

Comet 团队

结账改版

支付重试

数字钱包

搜索筛选

索引升级

推荐

可观测性

推送通知

特性

使能项

迭代 {{n}}

IP 迭代

系统演示 {{n}}

系统演示

火车活动

按团队划分的发布火车项目增量

签订租约

装修工程

安装货架

部署 WMS

招聘员工

员工培训

试运行

正式启用

关键

有浮动时间

突出显示关键路径

{{days}}后正式启用；关键路径：{{path}}。点击任务查看其浮动时间。

{{task}}可以推迟{{slack}}而不影响启用

{{task}}是关键任务：任何延误都会推迟启用

带关键路径的仓库启用计划

Ana

Ben

Chen

Dara

Eli

Apollo

Borealis

Cassini

休假

项目

所有项目

{{person}}：{{weeks}} 周内已分配 {{share}}

{{person}}超额分配：{{weeks}} 周内 {{share}}

悬停在某一行上查看此人的负荷

按人员和项目划分的团队资源计划

检出代码

构建

单元测试

代码检查

集成测试

部署到预发布

冒烟测试

金丝雀发布

生产发布

构建

测试

发布

当前

运行中：{{stages}} · 已用 {{elapsed}}

流水线完成，用时 {{elapsed}}

重新运行

暂停

继续

部署流水线运行的各阶段，实时更新

合同与手续

订购笔记本电脑

创建账号

欢迎会

入职培训

与导师午餐

```tsx
代码库导览
```

第一个工单

合规培训

第一个项目

第一天

30 天面谈

60 天评估

人力资源

IT

经理

导师

负责人：{{owner}}

已完成

进行中

未开始

面谈

按负责人划分的新员工入职计划

高

中

低

工作

学习

生活

站会

专注工作

模拟考试

邮件

代码评审

背单词

午饭

健身

阅读

现在

按优先级排列的今日日程

## GanttChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/gantt-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "taskName",
    "typeText": "string | undefined",
    "attribute": "task-name",
    "required": false
  },
  {
    "name": "progressName",
    "typeText": "string | undefined",
    "attribute": "progress-name",
    "required": false
  },
  {
    "name": "milestoneName",
    "typeText": "string | undefined",
    "attribute": "milestone-name",
    "required": false
  },
  {
    "name": "dependenciesName",
    "typeText": "string | undefined",
    "attribute": "dependencies-name",
    "required": false
  },
  {
    "name": "hideDependencyArrows",
    "typeText": "boolean",
    "attribute": "hide-dependency-arrows",
    "required": false
  },
  {
    "name": "dependencyColor",
    "typeText": "string | undefined",
    "attribute": "dependency-color",
    "required": false
  },
  {
    "name": "barLabels",
    "typeText": "boolean | \"inside\" | \"auto\"",
    "attribute": "bar-labels",
    "required": false
  },
  {
    "name": "todayLabel",
    "typeText": "string | undefined",
    "attribute": "today-label",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "tasks",
    "typeText": "readonly GanttTask[] | undefined",
    "required": false
  },
  {
    "name": "colors",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "formatProgress",
    "typeText": "(share: number) => string | undefined",
    "required": false
  },
  {
    "name": "today",
    "typeText": "boolean | number | Date",
    "required": false
  },
  {
    "name": "options",
    "typeText": "ChartBaseOptions | undefined",
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
    "description": "The hovered (or keyboard-focused) points changed; detail: { x, xLabel, items }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-point-click",
    "typeText": "CustomEvent",
    "description": "A point or a bar was clicked; detail: { x, xLabel, items }"
  },
  {
    "name": "minerva-plot-click",
    "typeText": "CustomEvent",
    "description": "The plot area was clicked where there is no point; detail: { x, y }"
  },
  {
    "name": "minerva-zoom",
    "typeText": "CustomEvent",
    "description": "The user zoomed or panned; detail: { x, y } (the visible ranges)"
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

## Example: 泳道：一天的日程

按优先级分泳道，每条泳道有多个任务（row），任务名写在条形内部（bar-labels），单日范围使用时:分刻度，today 标出当前时间；没有 progress 的任务画成实心条。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/wc/daily.html

```html
<minerva-gantt-chart
  id="daily"
  height="260"
  bar-labels="auto"
></minerva-gantt-chart>

```

### apps/docs/src/docs/pages/gantt-chart/wc/daily.ts

```tsx
// A one-day schedule in priority lanes: several tasks share each row
// (`row`, their names written inside the bars by `bar-labels="auto"`), the
// time axis shows hours and minutes for an intra-day range and `today`
// marks the current time. Tasks without a `progress` are drawn solid; the
// code review in progress shows what is left.
import type { MinervaGanttChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    lanes: ["High", "Medium", "Low"],
    groups: { work: "Work", study: "Study", life: "Life" },
    tasks: [
      "Standup",
      "Deep work",
      "Mock exam",
      "Email",
      "Code review",
      "Flashcards",
      "Lunch",
      "Gym",
      "Reading",
    ],
    now: "Now",
  },
  zh: {
    lanes: ["高", "中", "低"],
    groups: { work: "工作", study: "学习", life: "生活" },
    tasks: [
      "站会",
      "专注工作",
      "模拟考试",
      "邮件",
      "代码评审",
      "背单词",
      "午饭",
      "健身",
      "阅读",
    ],
    now: "现在",
  },
  ja: {
    lanes: ["高", "中", "低"],
    groups: { work: "仕事", study: "学習", life: "生活" },
    tasks: [
      "朝会",
      "集中作業",
      "模擬試験",
      "メール",
      "コードレビュー",
      "単語カード",
      "昼食",
      "ジム",
      "読書",
    ],
    now: "現在",
  },
  fr: {
    lanes: ["Haute", "Moyenne", "Basse"],
    groups: { work: "Travail", study: "Études", life: "Perso" },
    tasks: [
      "Point d’équipe",
      "Travail de fond",
      "Examen blanc",
      "E-mails",
      "Revue de code",
      "Fiches",
      "Déjeuner",
      "Sport",
      "Lecture",
    ],
    now: "Maintenant",
  },
};

const at = (hours: number, minutes = 0) =>
  new Date(2026, 10, 2, hours, minutes).getTime();

// lane (0 high, 1 medium, 2 low), group, start, end
const PLAN = [
  [0, "work", at(9), at(9, 30)],
  [0, "work", at(10), at(12)],
  [0, "study", at(16), at(17, 30)],
  [1, "work", at(8), at(8, 45)],
  [1, "work", at(13, 30), at(15)],
  [1, "study", at(20), at(21)],
  [2, "life", at(12), at(13)],
  [2, "life", at(18), at(19, 30)],
  [2, "study", at(21, 15), at(22)],
] as const;
/** Index of the task in progress (the code review) */
const IN_PROGRESS = 4;

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaGanttChart>("#daily")!;
  chart.tasks = PLAN.map(([lane, group, start, end], i) => ({
    id: `task-${i}`,
    name: text.tasks[i],
    row: text.lanes[lane],
    group: text.groups[group],
    start,
    end,
    ...(i === IN_PROGRESS ? { progress: 0.6 } : {}),
  }));
  chart.today = at(14, 30);
  chart.todayLabel = text.now;
}

```

## Example: 按阶段划分的项目计划

任务按阶段分组（每组一种颜色），显示进度和上线里程碑；可沿时间轴缩放。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/wc/project.html

```html
<minerva-gantt-chart id="project" height="320"></minerva-gantt-chart>

```

### apps/docs/src/docs/pages/gantt-chart/wc/project.ts

```tsx
// Tasks grouped by phase (one color and legend entry each), their progress
// drawn over the bars and a milestone as a dot; zoom and pan along the time.
import type { MinervaGanttChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    phases: ["Design", "Build", "Launch"],
    tasks: [
      "Research",
      "Wireframes",
      "Visual design",
      "Frontend",
      "Backend",
      "Testing",
      "Release",
    ],
    progress: "Progress",
    milestones: "Milestones",
  },
  zh: {
    phases: ["设计", "开发", "发布"],
    tasks: ["用户调研", "线框图", "视觉设计", "前端", "后端", "测试", "上线"],
    progress: "进度",
    milestones: "里程碑",
  },
  ja: {
    phases: ["設計", "開発", "リリース"],
    tasks: [
      "リサーチ",
      "ワイヤーフレーム",
      "ビジュアルデザイン",
      "フロントエンド",
      "バックエンド",
      "テスト",
      "公開",
    ],
    progress: "進捗",
    milestones: "マイルストーン",
  },
  fr: {
    phases: ["Conception", "Développement", "Lancement"],
    tasks: [
      "Recherche",
      "Maquettes",
      "Design visuel",
      "Front-end",
      "Back-end",
      "Tests",
      "Mise en ligne",
    ],
    progress: "Avancement",
    milestones: "Jalons",
  },
};

const DAY = 86_400_000;
const START = Date.UTC(2026, 2, 2);
// phase, first day, duration (days), share done
const PLAN = [
  [0, 0, 6, 1],
  [0, 4, 6, 1],
  [0, 8, 8, 0.7],
  [1, 12, 14, 0.4],
  [1, 12, 16, 0.3],
  [2, 26, 6, 0],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaGanttChart>("#project")!;
  chart.tasks = [
    ...PLAN.map(([phase, day, days, progress], i) => ({
      name: text.tasks[i],
      group: text.phases[phase],
      start: START + day * DAY,
      end: START + (day + days) * DAY,
      progress,
    })),
    { name: text.tasks[6], start: START + 33 * DAY, milestone: true },
  ];
  chart.progressName = text.progress;
  chart.milestoneName = text.milestones;
}

```

## Example: 带“今天”标记线的冲刺

为期两周的冲刺：未分组的任务使用同一种颜色，虚线标出今天。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/wc/sprint.html

```html
<minerva-gantt-chart id="sprint" height="260"></minerva-gantt-chart>

```

### apps/docs/src/docs/pages/gantt-chart/wc/sprint.ts

```tsx
// A two-week sprint: tasks without a group share one color; `today` draws
// a dashed line with its label (`today-label`).
import type { MinervaGanttChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    tasks: [
      "Login page",
      "Password reset",
      "Email templates",
      "Audit log",
      "Release notes",
    ],
    today: "Today",
  },
  zh: {
    tasks: ["登录页", "重置密码", "邮件模板", "审计日志", "发布说明"],
    today: "今天",
  },
  ja: {
    tasks: [
      "ログイン画面",
      "パスワード再設定",
      "メールテンプレート",
      "監査ログ",
      "リリースノート",
    ],
    today: "今日",
  },
  fr: {
    tasks: [
      "Page de connexion",
      "Mot de passe oublié",
      "Modèles d’e-mail",
      "Journal d’audit",
      "Notes de version",
    ],
    today: "Aujourd’hui",
  },
};

const DAY = 86_400_000;
const START = Date.UTC(2026, 9, 19);
// first day, duration (days), share done
const PLAN = [
  [0, 3, 1],
  [1, 4, 0.8],
  [3, 5, 0.5],
  [5, 4, 0.1],
  [8, 2, 0],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaGanttChart>("#sprint")!;
  chart.tasks = PLAN.map(([day, days, progress], i) => ({
    name: text.tasks[i],
    start: START + day * DAY,
    end: START + (day + days) * DAY,
    progress,
  }));
  chart.today = START + 6.5 * DAY;
  chart.todayLabel = text.today;
}

```
