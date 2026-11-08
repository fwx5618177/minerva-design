# Quadrant chart

A four-quadrant matrix (priority, Eisenhower, BCG...) with tinted, titled quadrants and labelled dots.

Package: minerva-design@1.23.1

Renderer: wc

Locale: en

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

Dark mode

Single sign-on

CSV export

Offline sync

New icons

Plugin API

Custom fonts

Tooltips

Rewrite

Search

Quick wins

Big bets

Fill-ins

Time sinks

Money pits

Effort

Impact

Feature

Features by effort and impact

{{feature}}: effort {{effort}}, impact {{impact}}

Tap a feature

Fix login outage

Tax filing

Quarterly planning

Mentoring

Book travel

Most meetings

Inbox zero

Social media

Do first

Schedule

Delegate

Eliminate

Urgency

Importance

Task

Eisenhower matrix of tasks

{{task}}: urgency {{urgency}}, importance {{importance}}

Click a task

Task {{n}}

{{task}} added to “{{quadrant}}”

Add a task to “{{quadrant}}”

Important

Not important

Urgent

Not urgent

{{task}} moved to “{{quadrant}}”

Moving {{task}} to “{{quadrant}}”

{{task}} saved in “{{quadrant}}”

{{task}} deleted

Edit {{task}}

Task name

Quadrant

Save

Cancel

Delete

Urgency {{urgency}} · Importance {{importance}}

Task matrix: drag tasks between quadrants

Drag a task to another quadrant, double-click it to edit, or click an empty area to add one

“{{quadrant}}” tapped

Drag a task to another quadrant

Do it now

Plan a time

Hand it off

Drop it

{{count}} task · {{time}}

{{count}} tasks · {{time}}

{{task}} selected

Click a task to select it, or drag it. Keyboard: Tab to a task, then Shift + arrow keys move it to another quadrant

Click + to add a task to a quadrant, click a task to select it

Eisenhower matrix of today's tasks with their estimates

Cloud hosting

Analytics

Mobile SDK

On-premise licenses

Support plans

Hardware

Training

Stars

Question marks

Cash cows

Dogs

Relative market share

Market growth (%)

Product

BCG matrix of the product portfolio

Key person leaves

Vendor delay

Data breach

Scope creep

Budget cut

New regulation

Cloud outage

Office move

Monitor

Act now

Accept

Mitigate

Likelihood

Impact

Risk

Selected: {{risk}}

Click a risk

Risk matrix of the project by likelihood and impact

{{name}} (us)

Best value

Premium

Budget

Overpriced

High quality

Low quality

Low price

High price

Brand

Brands by price and perceived quality

Bulk edit

SAML single sign-on

Offline mode

Onboarding tour

AI summaries

Color themes

Audit log

Chat alerts

Public API v2

CSV import

Weight by confidence

Effort (person-months)

Reach × impact (thousand users)

Reach {{reach}}k · impact {{impact}} · confidence {{confidence}} · effort {{effort}} person-months

RICE score: {{score}}

Top 3 by RICE score: {{list}}

Backlog prioritized with RICE: effort against reach times impact

Strengths

Weaknesses

Opportunities

Threats

Internal

External

Helpful

Harmful

Loyal customers

In-house platform

Low churn

Small sales team

Legacy billing

Single region

Growing SMB market

Reseller partnerships

AI features

Well-funded entrant

New data rules

Price war

{{n}} factors

{{quadrant}}: {{items}}

{{factor}} ({{quadrant}})

Click a quadrant to list its factors, or a factor to select it

SWOT analysis: strengths, weaknesses, opportunities and threats

Affordability

Feature depth

Ease of use

Support quality

Integrations

Horizontal axis

Vertical axis

{{name}} (us)

Strong on both

Weak on both

{{dimension}} {{score}}

{{name}}: {{scores}}. Ahead of us on {{ahead}} of {{total}} dimensions.

{{name}} (us): {{scores}}.

Choose two dimensions, then click a vendor to see its profile

Competitors by {{x}} and {{y}}

Backend lead

Product designer

Data analyst

QA engineer

Mobile developer

Product manager

Support lead

Junior developer

Future leaders

Rough diamonds

Solid performers

Needs support

Performance

Potential

{{person}}: performance {{performance}}, potential {{potential}} → {{quadrant}}

{{person}} placed in “{{quadrant}}”

{{person}} is back to the initial rating

All ratings are back to their initial values

Reset all

{{n}} of {{total}} recalibrated

Drag a person to recalibrate them, double-click to undo

Talent calibration: performance against potential

Auth

Search

Checkout

Catalog

Payments

Notifications

Recommendations

Media

Healthy

Slow

Erroring

Critical

p95 latency (ms)

Error rate (%)

p95 {{latency}} · errors {{errors}}

Over both SLOs: {{list}}

No service is over both SLOs

Pause

Resume

Live service health: p95 latency against error rate

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

## Example: Clicked task and quadrant

An Eisenhower matrix with the urgent tasks on the left (reversed x axis): click a task or the empty area of a quadrant.

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

## Example: Priority matrix

Features placed by effort and impact, with a title per quadrant and labels that never overlap.

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

## Example: Badges, counts and selection

badge and description in the quadrants, the show-counts attribute (or a showCounts function), selectedIndex set on minerva-point-click, and minerva-point-drop to move a task.

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
