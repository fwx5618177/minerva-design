# 四象限图

四象限矩阵（优先级、艾森豪威尔、BCG……），象限带底色和标题，点带标签。

Package: minerva-design@1.20.6

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/quadrant-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "xLabel",
    "typeText": "string | undefined",
    "attribute": "x-label",
    "required": false
  },
  {
    "name": "yLabel",
    "typeText": "string | undefined",
    "attribute": "y-label",
    "required": false
  },
  {
    "name": "xSplit",
    "typeText": "number | undefined",
    "attribute": "x-split",
    "required": false
  },
  {
    "name": "ySplit",
    "typeText": "number | undefined",
    "attribute": "y-split",
    "required": false
  },
  {
    "name": "reverseX",
    "typeText": "boolean",
    "attribute": "reverse-x",
    "required": false
  },
  {
    "name": "hideTicks",
    "typeText": "boolean",
    "attribute": "hide-ticks",
    "required": false
  },
  {
    "name": "hideLabels",
    "typeText": "boolean",
    "attribute": "hide-labels",
    "required": false
  },
  {
    "name": "pointSize",
    "typeText": "number",
    "attribute": "point-size",
    "required": false
  },
  {
    "name": "dragPoints",
    "typeText": "boolean",
    "attribute": "drag-points",
    "required": false
  },
  {
    "name": "showCounts",
    "typeText": "QuadrantConfig[\"showCounts\"]",
    "attribute": "show-counts",
    "required": false
  },
  {
    "name": "selectedIndex",
    "typeText": "number | null | undefined",
    "attribute": "selected-index",
    "required": false
  },
  {
    "name": "noAccessiblePoints",
    "typeText": "boolean",
    "attribute": "no-accessible-points",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "points",
    "typeText": "readonly QuadrantPoint[] | undefined",
    "required": false
  },
  {
    "name": "quadrants",
    "typeText": "QuadrantRegions | undefined",
    "required": false
  },
  {
    "name": "axisLabels",
    "typeText": "QuadrantAxisLabels | undefined",
    "required": false
  },
  {
    "name": "xDomain",
    "typeText": "[number, number] | undefined",
    "required": false
  },
  {
    "name": "yDomain",
    "typeText": "[number, number] | undefined",
    "required": false
  },
  {
    "name": "selectedIndices",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Omit<ChartOptions, \"series\"> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-point-click",
    "typeText": "CustomEvent",
    "description": "A dot was clicked; detail: { point, index }"
  },
  {
    "name": "minerva-point-double-click",
    "typeText": "CustomEvent",
    "description": "The same dot was clicked twice in quick succession; detail: { point, index }"
  },
  {
    "name": "minerva-quadrant-click",
    "typeText": "CustomEvent",
    "description": "The empty area of a quadrant was clicked; detail: { quadrant, x, y }"
  },
  {
    "name": "minerva-point-drag",
    "typeText": "CustomEvent",
    "description": "A dot is being dragged (on every move); detail: { point, index, x, y, quadrant }"
  },
  {
    "name": "minerva-point-drop",
    "typeText": "CustomEvent",
    "description": "A dragged dot was released, or the focused dot was moved with Shift + an arrow key; detail: { point, index, x, y, quadrant }"
  },
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered (or keyboard-focused) dot changed; detail: { x, xLabel, items }, `null` when nothing is hovered"
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

### slots

```json
[
  {
    "name": "quadrant-header-top-left",
    "description": "Header of the top left quadrant (replaces its drawn title and count)"
  },
  {
    "name": "quadrant-header-top-right",
    "description": "Header of the top right quadrant"
  },
  {
    "name": "quadrant-header-bottom-left",
    "description": "Header of the bottom left quadrant"
  },
  {
    "name": "quadrant-header-bottom-right",
    "description": "Header of the bottom right quadrant"
  },
  {
    "name": "point-actions",
    "description": "Actions shown in the point card of the active dot, beside its name (e.g. compact edit / delete buttons); the card then also stays on the selected dot"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 点击任务和象限

艾森豪威尔矩阵，紧急任务位于左侧（反转 x 轴）：点击任务或象限的空白区域。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/wc/point-click.html

```html
<div style="display: grid; gap: 8px">
  <minerva-quadrant-chart
    id="tasks"
    reverse-x
    height="320"
  ></minerva-quadrant-chart>
  <output id="task" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/quadrant-chart/wc/point-click.ts

```tsx
// minerva-point-click gives the clicked point, minerva-quadrant-click the
// quadrant of a click on the empty area (`reverse-x`: urgent on the left).
import type {
  MinervaQuadrantChart,
  QuadrantCorner,
  QuadrantPoint,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    urgency: "Urgency",
    importance: "Importance",
    hint: "Click a task or a quadrant",
    corners: {
      topLeft: "Do first",
      topRight: "Schedule",
      bottomLeft: "Delegate",
      bottomRight: "Eliminate",
    },
    tasks: ["Bug fix", "Roadmap", "Email", "Newsletter", "Interview"],
  },
  zh: {
    urgency: "紧急程度",
    importance: "重要程度",
    hint: "点击任务或象限",
    corners: {
      topLeft: "立即处理",
      topRight: "计划安排",
      bottomLeft: "委派他人",
      bottomRight: "放弃",
    },
    tasks: ["修复缺陷", "路线图", "邮件", "简报", "面试"],
  },
  ja: {
    urgency: "緊急度",
    importance: "重要度",
    hint: "タスクまたは象限をクリックします",
    corners: {
      topLeft: "すぐ実行",
      topRight: "計画",
      bottomLeft: "委任",
      bottomRight: "削除",
    },
    tasks: ["バグ修正", "ロードマップ", "メール", "ニュースレター", "面接"],
  },
  fr: {
    urgency: "Urgence",
    importance: "Importance",
    hint: "Cliquez sur une tâche ou un quadrant",
    corners: {
      topLeft: "À faire",
      topRight: "À planifier",
      bottomLeft: "À déléguer",
      bottomRight: "À abandonner",
    },
    tasks: [
      "Correctif",
      "Feuille de route",
      "E-mails",
      "Newsletter",
      "Entretien",
    ],
  },
};

const SCORES: [number, number][] = [
  [9, 8.5],
  [2.5, 9],
  [8, 3],
  [2, 2.5],
  [6.5, 7],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaQuadrantChart>("#tasks")!;
  const task = root.querySelector<HTMLOutputElement>("#task")!;
  chart.points = SCORES.map(([x, y], i) => ({ x, y, label: text.tasks[i] }));
  chart.quadrants = {
    topLeft: { label: text.corners.topLeft },
    topRight: { label: text.corners.topRight },
    bottomLeft: { label: text.corners.bottomLeft },
    bottomRight: { label: text.corners.bottomRight },
  };
  chart.xLabel = text.urgency;
  chart.yLabel = text.importance;
  task.textContent = text.hint;
  const onPoint = (event: Event) => {
    const { point } = (event as CustomEvent<{ point: QuadrantPoint }>).detail;
    task.textContent = `${point.label}`;
  };
  const onQuadrant = (event: Event) => {
    const { quadrant } = (event as CustomEvent<{ quadrant: QuadrantCorner }>)
      .detail;
    task.textContent = text.corners[quadrant];
  };
  chart.addEventListener("minerva-point-click", onPoint);
  chart.addEventListener("minerva-quadrant-click", onQuadrant);
  return () => {
    chart.removeEventListener("minerva-point-click", onPoint);
    chart.removeEventListener("minerva-quadrant-click", onQuadrant);
  };
}

```

## Example: 优先级矩阵

按投入和影响放置功能，每个象限都有标题，标签互不重叠。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/wc/priorities.html

```html
<minerva-quadrant-chart id="matrix" height="340"></minerva-quadrant-chart>

```

### apps/docs/src/docs/pages/quadrant-chart/wc/priorities.ts

```tsx
// Points, quadrant titles and axis titles are properties; dots are placed
// without overlapping labels.
import type { MinervaQuadrantChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    effort: "Effort",
    impact: "Impact",
    quickWins: "Quick wins",
    bigBets: "Big bets",
    fillIns: "Fill-ins",
    timeSinks: "Time sinks",
    features: ["Dark mode", "SSO", "Search", "Export", "Onboarding", "Billing"],
  },
  zh: {
    effort: "投入",
    impact: "影响",
    quickWins: "速赢",
    bigBets: "重点投入",
    fillIns: "补充项",
    timeSinks: "低效项",
    features: ["深色模式", "单点登录", "搜索", "导出", "新手引导", "计费"],
  },
  ja: {
    effort: "工数",
    impact: "効果",
    quickWins: "クイックウィン",
    bigBets: "大型施策",
    fillIns: "穴埋め",
    timeSinks: "時間の浪費",
    features: [
      "ダークモード",
      "SSO",
      "検索",
      "エクスポート",
      "オンボーディング",
      "課金",
    ],
  },
  fr: {
    effort: "Effort",
    impact: "Impact",
    quickWins: "Gains rapides",
    bigBets: "Paris majeurs",
    fillIns: "Bouche-trous",
    timeSinks: "Pertes de temps",
    features: [
      "Mode sombre",
      "SSO",
      "Recherche",
      "Export",
      "Accueil",
      "Facturation",
    ],
  },
};

const SCORES: [number, number][] = [
  [2, 7.5],
  [7.5, 8.5],
  [6, 6.5],
  [3, 3],
  [4, 8],
  [8.5, 3.5],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaQuadrantChart>("#matrix")!;
  chart.points = SCORES.map(([x, y], i) => ({ x, y, label: text.features[i] }));
  chart.quadrants = {
    topLeft: { label: text.quickWins },
    topRight: { label: text.bigBets },
    bottomLeft: { label: text.fillIns },
    bottomRight: { label: text.timeSinks },
  };
  chart.xLabel = text.effort;
  chart.yLabel = text.impact;
}

```

## Example: 徽标、计数与选中

象限中的 badge 与 description、show-counts 属性（或 showCounts 函数）、在 minerva-point-click 中设置 selectedIndex，以及用 minerva-point-drop 移动任务。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/wc/triage.html

```html
<div style="display: grid; gap: 8px">
  <minerva-quadrant-chart
    id="triage"
    reverse-x
    hide-ticks
    show-counts
    drag-points
    height="360"
  ></minerva-quadrant-chart>
  <output id="triage-status" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/quadrant-chart/wc/triage.ts

```tsx
// Badges ("Q1"), a second line per quadrant and the number of tasks after
// each title are drawn by the chart; `selectedIndex` rings the clicked task
// and minerva-point-drop moves it (update `points`).
import type {
  MinervaQuadrantChart,
  QuadrantCorner,
  QuadrantPoint,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    hint: "Click a task to select it, drag it to another quadrant",
    selected: "Selected: {task}",
    moved: "{task} moved to “{quadrant}”",
    count: (n: number) => (n === 1 ? "1 task" : `${n} tasks`),
    corners: {
      topLeft: ["Do first", "Do it now"],
      topRight: ["Schedule", "Plan a time"],
      bottomLeft: ["Delegate", "Hand it off"],
      bottomRight: ["Eliminate", "Drop it"],
    },
    tasks: ["Bug fix", "Tax filing", "Roadmap", "Email", "Newsletter"],
  },
  zh: {
    hint: "点击任务以选中，拖到其他象限即可移动",
    selected: "已选中：{task}",
    moved: "{task} 已移到“{quadrant}”",
    count: (n: number) => `${n} 项`,
    corners: {
      topLeft: ["立即处理", "立即做"],
      topRight: ["计划安排", "安排时间"],
      bottomLeft: ["委派他人", "交给别人"],
      bottomRight: ["放弃", "不做"],
    },
    tasks: ["修复缺陷", "报税", "路线图", "邮件", "简报"],
  },
  ja: {
    hint: "タスクをクリックで選択、別の象限へドラッグで移動します",
    selected: "選択中：{task}",
    moved: "{task} を「{quadrant}」に移動しました",
    count: (n: number) => `${n} 件`,
    corners: {
      topLeft: ["すぐ実行", "今すぐやる"],
      topRight: ["計画", "時間を確保"],
      bottomLeft: ["委任", "人に任せる"],
      bottomRight: ["削除", "やらない"],
    },
    tasks: ["バグ修正", "確定申告", "ロードマップ", "メール", "ニュースレター"],
  },
  fr: {
    hint: "Cliquez sur une tâche pour la sélectionner, glissez-la vers un autre quadrant",
    selected: "Sélection : {task}",
    moved: "{task} déplacée vers « {quadrant} »",
    count: (n: number) => (n <= 1 ? `${n} tâche` : `${n} tâches`),
    corners: {
      topLeft: ["À faire", "Maintenant"],
      topRight: ["À planifier", "Réserver un créneau"],
      bottomLeft: ["À déléguer", "Confier"],
      bottomRight: ["À abandonner", "Laisser tomber"],
    },
    tasks: ["Correctif", "Impôts", "Feuille de route", "E-mails", "Newsletter"],
  },
};

const BADGES: Record<QuadrantCorner, string> = {
  topLeft: "Q1",
  topRight: "Q2",
  bottomLeft: "Q3",
  bottomRight: "Q4",
};

const SCORES: [number, number][] = [
  [9, 8.5],
  [7, 7],
  [2.5, 9],
  [8, 3],
  [2, 2.5],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaQuadrantChart>("#triage")!;
  const status = root.querySelector<HTMLOutputElement>("#triage-status")!;
  chart.points = SCORES.map(([x, y], i) => ({ x, y, label: text.tasks[i] }));
  chart.quadrants = Object.fromEntries(
    (Object.keys(BADGES) as QuadrantCorner[]).map((corner) => [
      corner,
      {
        badge: BADGES[corner],
        label: text.corners[corner][0],
        description: text.corners[corner][1],
      },
    ]),
  );
  // a function (property only) writes the count; the attribute shows the number
  chart.showCounts = (count) => text.count(count);
  status.textContent = text.hint;
  const onClick = (event: Event) => {
    const { point, index } = (
      event as CustomEvent<{ point: QuadrantPoint; index: number }>
    ).detail;
    chart.selectedIndex = index;
    status.textContent = text.selected.replace("{task}", `${point.label}`);
  };
  const onDrop = (event: Event) => {
    const { point, index, x, y, quadrant } = (
      event as CustomEvent<{
        point: QuadrantPoint;
        index: number;
        x: number;
        y: number;
        quadrant: QuadrantCorner;
      }>
    ).detail;
    chart.points = chart.points!.map((p, i) =>
      i === index ? { ...p, x, y } : p,
    );
    chart.selectedIndex = index;
    status.textContent = text.moved
      .replace("{task}", `${point.label}`)
      .replace("{quadrant}", text.corners[quadrant][0]);
  };
  chart.addEventListener("minerva-point-click", onClick);
  chart.addEventListener("minerva-point-drop", onDrop);
  return () => {
    chart.removeEventListener("minerva-point-click", onClick);
    chart.removeEventListener("minerva-point-drop", onDrop);
  };
}

```
