# 四象限图

四象限矩阵（优先级、艾森豪威尔、BCG……），象限带底色和标题，点带标签。

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

深色模式

单点登录

CSV 导出

离线同步

新图标

插件 API

自定义字体

提示框

重写

搜索

速赢

大投入

填空

耗时项

无底洞

投入

影响

功能

按投入和影响排列的功能

{{feature}}：投入 {{effort}}，影响 {{impact}}

点按一个功能

修复登录故障

报税

季度规划

辅导新人

预订差旅

大部分会议

清空收件箱

社交媒体

立即做

计划做

委派

删除

紧急程度

重要程度

任务

任务的艾森豪威尔矩阵

{{task}}：紧急程度 {{urgency}}，重要程度 {{importance}}

点击一个任务

任务 {{n}}

已将{{task}}添加到“{{quadrant}}”

向“{{quadrant}}”添加任务

重要

不重要

紧急

不紧急

已将{{task}}移到“{{quadrant}}”

正在将{{task}}移到“{{quadrant}}”

已保存{{task}}，位于“{{quadrant}}”

已删除{{task}}

编辑{{task}}

任务名称

象限

保存

取消

删除

紧急程度 {{urgency}} · 重要程度 {{importance}}

任务矩阵：在象限之间拖动任务

把任务拖到另一个象限，双击编辑，或点击空白处添加任务

点按了“{{quadrant}}”

把任务拖到另一个象限

立即做

安排时间

交给别人

不做

{{count}} 项 · {{time}}

{{count}} 项 · {{time}}

已选中：{{task}}

点击任务即可选中，也可以拖动。键盘：Tab 到任务后按 Shift + 方向键移到其他象限

点击 + 向象限添加任务，点击任务即可选中

今日任务的艾森豪威尔矩阵（含预估时长）

云托管

数据分析

移动 SDK

本地部署许可

支持服务

硬件

培训

明星

问题

金牛

瘦狗

相对市场份额

市场增长率（%）

产品

产品组合的波士顿矩阵

关键人员离职

供应商延期

数据泄露

范围蔓延

预算削减

新法规

云服务中断

办公室搬迁

监控

立即处理

接受

缓解

可能性

影响

风险

已选中：{{risk}}

点击一个风险

按可能性和影响排列的项目风险矩阵

{{name}}（我们）

高性价比

高端

低价

定价过高

高质量

低质量

低价格

高价格

品牌

按价格和感知质量排列的品牌

批量编辑

SAML 单点登录

离线模式

新手引导

AI 摘要

配色主题

审计日志

聊天提醒

公开 API v2

CSV 导入

按信心度加权

工作量（人月）

覆盖人数 × 影响力（千用户）

覆盖 {{reach}} 千 · 影响力 {{impact}} · 信心度 {{confidence}} · 工作量 {{effort}} 人月

RICE 得分：{{score}}

RICE 得分前三：{{list}}

按 RICE 排序的待办事项：工作量与覆盖人数 × 影响力

优势

劣势

机会

威胁

内部

外部

有利

不利

忠实客户

自研平台

低流失率

销售团队规模小

老旧计费系统

仅覆盖单一地区

中小企业市场增长

经销商合作

AI 功能

资金雄厚的新进入者

新的数据法规

价格战

{{n}} 个因素

{{quadrant}}：{{items}}

{{factor}}（{{quadrant}}）

点击象限列出其中的因素，或点击某个因素将其选中

SWOT 分析：优势、劣势、机会与威胁

价格亲民度

功能深度

易用性

支持质量

集成能力

横轴

纵轴

{{name}}（我们）

两项都强

两项都弱

{{dimension}} {{score}}

{{name}}：{{scores}}。在 {{total}} 个维度中有 {{ahead}} 个领先我们。

{{name}}（我们）：{{scores}}。

选择两个维度，然后点击某个厂商查看其画像

按{{x}}和{{y}}比较的竞品

后端负责人

产品设计师

数据分析师

测试工程师

移动端开发

产品经理

客服主管

初级开发

未来领导者

璞玉

稳健贡献者

需要支持

绩效

潜力

{{person}}：绩效 {{performance}}，潜力 {{potential}} → {{quadrant}}

{{person}} 已放入“{{quadrant}}”

{{person}} 已恢复初始评级

所有评级已恢复初始值

全部重置

已校准 {{n}} / {{total}} 人

拖动某人以重新校准，双击撤销

人才校准：绩效与潜力

认证

搜索

结算

商品目录

支付

通知

推荐

媒体

健康

缓慢

报错

严重

p95 延迟（毫秒）

错误率（%）

p95 {{latency}} · 错误率 {{errors}}

同时超出两项 SLO：{{list}}

没有服务同时超出两项 SLO

暂停

继续

实时服务健康度：p95 延迟与错误率

## QuadrantChart

Support: beta

Native Angular: MnQuadrantChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnQuadrantChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "points",
    "typeText": "readonly QuadrantPoint[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "xDomain",
    "typeText": "[number, number] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "yDomain",
    "typeText": "[number, number] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "xSplit",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "ySplit",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "quadrants",
    "typeText": "QuadrantRegions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "xLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "yLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "axisLabels",
    "typeText": "QuadrantAxisLabels | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "showTicks",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "reverseX",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "showLabels",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "pointSize",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "draggable",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "showCounts",
    "typeText": "boolean | ((count: number, points: readonly QuadrantPoint[]) => string)",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "selectedIndex",
    "typeText": "number | null | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "selectedIndices",
    "typeText": "readonly number[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "accessiblePoints",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "quadrantHeader",
    "typeText": "TemplateRef<QuadrantHeaderContext> | null | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "pointActions",
    "typeText": "TemplateRef<QuadrantPointActionsContext> | null | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  }
]
```

### events

```json
[
  {
    "name": "pointClick",
    "typeText": "{ point: QuadrantPoint; index: number; }",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ point: QuadrantPoint; index: number; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointDoubleClick",
    "typeText": "{ point: QuadrantPoint; index: number; }",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ point: QuadrantPoint; index: number; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "quadrantClick",
    "typeText": "{ quadrant: keyof QuadrantRegions; x: number; y: number; }",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ quadrant: keyof QuadrantRegions; x: number; y: number; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointDrag",
    "typeText": "QuadrantPointDrop",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "QuadrantPointDrop",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointDrop",
    "typeText": "QuadrantPointDrop",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "QuadrantPointDrop",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "ChartHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "zoom",
    "typeText": "ChartView",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
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

## Example: Priority matrix

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnQuadrantChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnQuadrantChart],
  template: `
@let t = labels[language()];
<mn-quadrant-chart
  [points]="[
    { x: 2, y: 7.5, label: t.features[0] },
    { x: 7.5, y: 8.5, label: t.features[1] },
    { x: 6, y: 6.5, label: t.features[2] },
    { x: 3, y: 3, label: t.features[3] },
    { x: 4, y: 8, label: t.features[4] },
    { x: 8.5, y: 3.5, label: t.features[5] }
  ]"
  [quadrants]="{
    topLeft: { label: t.quickWins },
    topRight: { label: t.bigBets },
    bottomLeft: { label: t.fillIns },
    bottomRight: { label: t.timeSinks }
  }"
  [xLabel]="t.effort"
  [yLabel]="t.impact"
  [height]="340"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "effort": "Effort",
    "impact": "Impact",
    "quickWins": "Quick wins",
    "bigBets": "Big bets",
    "fillIns": "Fill-ins",
    "timeSinks": "Time sinks",
    "features": ["Dark mode", "SSO", "Search", "Export", "Onboarding", "Billing"]
  },
  "zh": {
    "effort": "投入",
    "impact": "影响",
    "quickWins": "速赢",
    "bigBets": "重点投入",
    "fillIns": "补充项",
    "timeSinks": "低效项",
    "features": ["深色模式", "单点登录", "搜索", "导出", "新手引导", "计费"]
  },
  "ja": {
    "effort": "工数",
    "impact": "効果",
    "quickWins": "クイックウィン",
    "bigBets": "大型施策",
    "fillIns": "穴埋め",
    "timeSinks": "時間の浪費",
    "features": ["ダークモード", "SSO", "検索", "エクスポート", "オンボーディング", "課金"]
  },
  "fr": {
    "effort": "Effort",
    "impact": "Impact",
    "quickWins": "Gains rapides",
    "bigBets": "Paris majeurs",
    "fillIns": "Bouche-trous",
    "timeSinks": "Pertes de temps",
    "features": ["Mode sombre", "SSO", "Recherche", "Export", "Accueil", "Facturation"]
  }
};
}

```

## Example: Clicked task and quadrant

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnQuadrantChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnQuadrantChart],
  template: `
@let t = labels[language()];
<mn-quadrant-chart
  [points]="[
    { x: 9, y: 8.5, label: t.tasks[0] },
    { x: 2.5, y: 9, label: t.tasks[1] },
    { x: 8, y: 3, label: t.tasks[2] },
    { x: 2, y: 2.5, label: t.tasks[3] },
    { x: 6.5, y: 7, label: t.tasks[4] }
  ]"
  [quadrants]="{
    topLeft: { label: t.corners.topLeft },
    topRight: { label: t.corners.topRight },
    bottomLeft: { label: t.corners.bottomLeft },
    bottomRight: { label: t.corners.bottomRight }
  }"
  [xLabel]="t.urgency"
  [yLabel]="t.importance"
  reverseX
  [height]="320"
  (pointClick)="selected = $event.point.label ?? ''"
  (quadrantClick)="selected = t.corners[$event.quadrant]"
/>
<output aria-live="polite">{{ selected || t.hint }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  selected = "";
  labels = {
  "en": {
    "urgency": "Urgency",
    "importance": "Importance",
    "hint": "Click a task or a quadrant",
    "corners": {
      "topLeft": "Do first",
      "topRight": "Schedule",
      "bottomLeft": "Delegate",
      "bottomRight": "Eliminate"
    },
    "tasks": ["Bug fix", "Roadmap", "Email", "Newsletter", "Interview"]
  },
  "zh": {
    "urgency": "紧急程度",
    "importance": "重要程度",
    "hint": "点击任务或象限",
    "corners": {
      "topLeft": "立即处理",
      "topRight": "计划安排",
      "bottomLeft": "委派他人",
      "bottomRight": "放弃"
    },
    "tasks": ["修复缺陷", "路线图", "邮件", "简报", "面试"]
  },
  "ja": {
    "urgency": "緊急度",
    "importance": "重要度",
    "hint": "タスクまたは象限をクリックします",
    "corners": {
      "topLeft": "すぐ実行",
      "topRight": "計画",
      "bottomLeft": "委任",
      "bottomRight": "削除"
    },
    "tasks": ["バグ修正", "ロードマップ", "メール", "ニュースレター", "面接"]
  },
  "fr": {
    "urgency": "Urgence",
    "importance": "Importance",
    "hint": "Cliquez sur une tâche ou un quadrant",
    "corners": {
      "topLeft": "À faire",
      "topRight": "À planifier",
      "bottomLeft": "À déléguer",
      "bottomRight": "À abandonner"
    },
    "tasks": ["Correctif", "Feuille de route", "E-mails", "Newsletter", "Entretien"]
  }
};
}

```

## Example: 徽标、计数与键盘移动

象限显示徽标、说明与计数。悬停或聚焦任务时，在圆点旁显示一张独立的半透明卡片，展示名称、所在象限及操作。圆点保持原来的大小与坐标；卡片与圆点分离，空间不足时自动避让。原标签让位于卡片；指针离开、按 Escape 或点击任务以外的区域时卡片消失。选中的任务保留选中环。拖动任务时卡片跟随，并显示将要落入的象限。Tab 进入任务列表，Enter 选中，Shift + 方向键在象限之间移动任务，并实时播报。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnQuadrantChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnQuadrantChart],
  template: `
@let t = labels[language()];
<mn-quadrant-chart
  [points]="[
    { x: 9, y: 8.5, label: t.tasks[0] },
    { x: 7, y: 7, label: t.tasks[1] },
    { x: 2.5, y: 9, label: t.tasks[2] },
    { x: 8, y: 3, label: t.tasks[3] },
    { x: 2, y: 2.5, label: t.tasks[4] }
  ]"
  [quadrants]="{
    topLeft: { badge: 'Q1', label: t.corners[0], description: t.hints[0] },
    topRight: { badge: 'Q2', label: t.corners[1], description: t.hints[1] },
    bottomLeft: { badge: 'Q3', label: t.corners[2], description: t.hints[2] },
    bottomRight: { badge: 'Q4', label: t.corners[3], description: t.hints[3] }
  }"
  reverseX
  [showTicks]="false"
  showCounts
  [selectedIndex]="selected"
  [height]="360"
  (pointClick)="selected = $event.index"
/>
<output aria-live="polite">{{ selected < 0 ? t.hint : t.tasks[selected] }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  selected = -1;
  labels = {
  "en": {
    "hint": "Click a task to select it",
    "corners": ["Do first", "Schedule", "Delegate", "Eliminate"],
    "hints": ["Do it now", "Plan a time", "Hand it off", "Drop it"],
    "tasks": ["Bug fix", "Tax filing", "Roadmap", "Email", "Newsletter"]
  },
  "zh": {
    "hint": "点击任务以选中",
    "corners": ["立即处理", "计划安排", "委派他人", "放弃"],
    "hints": ["立即做", "安排时间", "交给别人", "不做"],
    "tasks": ["修复缺陷", "报税", "路线图", "邮件", "简报"]
  },
  "ja": {
    "hint": "タスクをクリックして選択します",
    "corners": ["すぐ実行", "計画", "委任", "削除"],
    "hints": ["今すぐやる", "時間を確保", "人に任せる", "やらない"],
    "tasks": ["バグ修正", "確定申告", "ロードマップ", "メール", "ニュースレター"]
  },
  "fr": {
    "hint": "Cliquez sur une tâche pour la sélectionner",
    "corners": ["À faire", "À planifier", "À déléguer", "À abandonner"],
    "hints": ["Maintenant", "Réserver un créneau", "Confier", "Laisser tomber"],
    "tasks": ["Correctif", "Impôts", "Feuille de route", "E-mails", "Newsletter"]
  }
};
}

```
