# 甘特图

在时间轴上以条形表示任务，显示进度、分组、里程碑和今日线；可沿时间缩放和平移。

Package: minerva-design@1.20.3

Renderer: angular

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

Support: beta

Native Angular: MnGanttChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnGanttChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "tasks",
    "typeText": "readonly GanttTask[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "colors",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "taskName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "progressName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "milestoneName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "formatProgress",
    "typeText": "((share: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "dependenciesName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "dependencyArrows",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "dependencyColor",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "barLabels",
    "typeText": "boolean | \"auto\" | \"inside\"",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "today",
    "typeText": "number | boolean | Date",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "todayLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 项目计划

每个分组有自己的颜色和图例项，进度以实心条覆盖在任务上，里程碑显示为圆点，today 在指定日期画一条线。悬停任务时，提示框只显示该任务：所属分组、起止日期、时长、进度和前置任务。依赖关系以箭头绘制。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnGanttChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnGanttChart],
  template: `
@let t = labels[language()];
<mn-gantt-chart
  [tasks]="[
    { name: t.tasks[0], group: t.phases[0], start: start, end: start + 6 * day, progress: 1 },
    { name: t.tasks[1], group: t.phases[0], start: start + 4 * day, end: start + 10 * day, progress: 1 },
    { name: t.tasks[2], group: t.phases[0], start: start + 8 * day, end: start + 16 * day, progress: 0.7 },
    { name: t.tasks[3], group: t.phases[1], start: start + 12 * day, end: start + 26 * day, progress: 0.4 },
    { name: t.tasks[4], group: t.phases[1], start: start + 12 * day, end: start + 28 * day, progress: 0.3 },
    { name: t.tasks[5], group: t.phases[2], start: start + 26 * day, end: start + 32 * day, progress: 0 },
    { name: t.tasks[6], start: start + 33 * day, milestone: true }
  ]"
  [progressName]="t.progress"
  [milestoneName]="t.milestones"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  day = 86400000;
  start = 1772409600000;
  labels = {
  "en": {
    "phases": ["Design", "Build", "Launch"],
    "tasks": ["Research", "Wireframes", "Visual design", "Frontend", "Backend", "Testing", "Release"],
    "progress": "Progress",
    "milestones": "Milestones"
  },
  "zh": {
    "phases": ["设计", "开发", "发布"],
    "tasks": ["用户调研", "线框图", "视觉设计", "前端", "后端", "测试", "上线"],
    "progress": "进度",
    "milestones": "里程碑"
  },
  "ja": {
    "phases": ["設計", "開発", "リリース"],
    "tasks": ["リサーチ", "ワイヤーフレーム", "ビジュアルデザイン", "フロントエンド", "バックエンド", "テスト", "公開"],
    "progress": "進捗",
    "milestones": "マイルストーン"
  },
  "fr": {
    "phases": ["Conception", "Développement", "Lancement"],
    "tasks": ["Recherche", "Maquettes", "Design visuel", "Front-end", "Back-end", "Tests", "Mise en ligne"],
    "progress": "Avancement",
    "milestones": "Jalons"
  }
};
}

```

## Example: 迭代

精确到小时的任务，每位开发者一种颜色；onPointClick 接收被点击的行并显示其详情。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnGanttChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnGanttChart],
  template: `
@let t = labels[language()];
<mn-gantt-chart
  [tasks]="[
    { name: t.tasks[0], start: start, end: start + 3 * day, progress: 1 },
    { name: t.tasks[1], start: start + day, end: start + 5 * day, progress: 0.8 },
    { name: t.tasks[2], start: start + 3 * day, end: start + 8 * day, progress: 0.5 },
    { name: t.tasks[3], start: start + 5 * day, end: start + 9 * day, progress: 0.1 },
    { name: t.tasks[4], start: start + 8 * day, end: start + 10 * day, progress: 0 }
  ]"
  [today]="start + 6.5 * day"
  [todayLabel]="t.today"
  [height]="260"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  day = 86400000;
  start = 1792368000000;
  labels = {
  "en": {
    "tasks": ["Login page", "Password reset", "Email templates", "Audit log", "Release notes"],
    "today": "Today"
  },
  "zh": {
    "tasks": ["登录页", "重置密码", "邮件模板", "审计日志", "发布说明"],
    "today": "今天"
  },
  "ja": {
    "tasks": ["ログイン画面", "パスワード再設定", "メールテンプレート", "監査ログ", "リリースノート"],
    "today": "今日"
  },
  "fr": {
    "tasks": ["Page de connexion", "Mot de passe oublié", "Modèles d’e-mail", "Journal d’audit", "Notes de version"],
    "today": "Aujourd’hui"
  }
};
}

```

## Example: 泳道：一天的日程

按优先级分泳道的单日日程：row 相同的任务共用一条泳道，时间范围对齐到整点（08:00–22:00）并以时:分显示刻度，group 按类型为任务着色，today 画出当前时间。由于每条泳道有多个任务，barLabels（默认 "auto"）会把任务名写在条形内部，过长时以省略号截断，并使用与条形对比明显的文字颜色。没有 progress 的任务画成实心条；进行中的代码评审以半透明显示剩余部分。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnGanttChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnGanttChart],
  template: `
@let t = labels[language()];
<mn-gantt-chart
  [tasks]="[
    { id: 'a', name: t.tasks[0], row: t.lanes[0], group: t.groups[0], start: day + 9 * hour, end: day + 9.5 * hour },
    { id: 'b', name: t.tasks[1], row: t.lanes[0], group: t.groups[0], start: day + 10 * hour, end: day + 12 * hour },
    { id: 'c', name: t.tasks[2], row: t.lanes[0], group: t.groups[1], start: day + 16 * hour, end: day + 17.5 * hour },
    { id: 'd', name: t.tasks[3], row: t.lanes[1], group: t.groups[0], start: day + 8 * hour, end: day + 8.75 * hour },
    { id: 'e', name: t.tasks[4], row: t.lanes[1], group: t.groups[0], start: day + 13.5 * hour, end: day + 15 * hour, progress: 0.6 },
    { id: 'f', name: t.tasks[5], row: t.lanes[1], group: t.groups[1], start: day + 20 * hour, end: day + 21 * hour },
    { id: 'g', name: t.tasks[6], row: t.lanes[2], group: t.groups[2], start: day + 12 * hour, end: day + 13 * hour },
    { id: 'h', name: t.tasks[7], row: t.lanes[2], group: t.groups[2], start: day + 18 * hour, end: day + 19.5 * hour },
    { id: 'i', name: t.tasks[8], row: t.lanes[2], group: t.groups[1], start: day + 21.25 * hour, end: day + 22 * hour }
  ]"
  [today]="day + 14.5 * hour"
  [todayLabel]="t.now"
  [height]="260"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  hour = 3600000;
  day = new Date(2026, 10, 2).getTime();
  labels = {
  "en": {
    "lanes": ["High", "Medium", "Low"],
    "groups": ["Work", "Study", "Life"],
    "tasks": ["Standup", "Deep work", "Mock exam", "Email", "Code review", "Flashcards", "Lunch", "Gym", "Reading"],
    "now": "Now"
  },
  "zh": {
    "lanes": ["高", "中", "低"],
    "groups": ["工作", "学习", "生活"],
    "tasks": ["站会", "专注工作", "模拟考试", "邮件", "代码评审", "背单词", "午饭", "健身", "阅读"],
    "now": "现在"
  },
  "ja": {
    "lanes": ["高", "中", "低"],
    "groups": ["仕事", "学習", "生活"],
    "tasks": ["朝会", "集中作業", "模擬試験", "メール", "コードレビュー", "単語カード", "昼食", "ジム", "読書"],
    "now": "現在"
  },
  "fr": {
    "lanes": ["Haute", "Moyenne", "Basse"],
    "groups": ["Travail", "Études", "Perso"],
    "tasks": ["Point d’équipe", "Travail de fond", "Examen blanc", "E-mails", "Revue de code", "Fiches", "Déjeuner", "Sport", "Lecture"],
    "now": "Maintenant"
  }
};
}

```
