# 四象限图

四象限矩阵（优先级、艾森豪威尔、BCG……），象限带底色和标题，点带标签。

Package: minerva-design@1.22.2

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

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

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "QuadrantChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "deep",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also follows in-place mutations of nested data (`series[0].data.push()`);\nby default the chart updates when a prop is replaced (cheaper on large data)",
    "typeText": "boolean"
  },
  {
    "name": "legend",
    "type": "boolean | ChartLegendOptions",
    "required": false,
    "description": "Legend; shown by default when several series have a name",
    "typeText": "boolean | ChartLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | ChartTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it",
    "typeText": "boolean | ChartTooltipOptions"
  },
  {
    "name": "crosshair",
    "type": "boolean",
    "required": false,
    "description": "Vertical guide line following the pointer",
    "typeText": "boolean"
  },
  {
    "name": "interaction",
    "type": "boolean | ChartInteractionOptions",
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static (default `true`)",
    "typeText": "boolean | ChartInteractionOptions"
  },
  {
    "name": "draggable",
    "type": "boolean",
    "required": false,
    "description": "Lets the user drag the dots (default: when a `pointDrop` listener is set)",
    "typeText": "boolean"
  },
  {
    "name": "showCounts",
    "type": "boolean | ((count: number, points: readonly QuadrantPoint[]) => string)",
    "required": false,
    "description": "Shows the number of points of each quadrant after its title; a function returns the text",
    "typeText": "boolean | ((count: number, points: readonly QuadrantPoint[]) => string)"
  },
  {
    "name": "showTicks",
    "type": "boolean",
    "required": false,
    "description": "Shows the numeric ticks of the axes (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "reverseX",
    "type": "boolean",
    "required": false,
    "description": "Reverses the horizontal axis (e.g. \"urgent\" on the left)",
    "typeText": "boolean"
  },
  {
    "name": "showLabels",
    "type": "boolean",
    "required": false,
    "description": "Draws the labels next to the dots (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "selectedIndex",
    "type": "number | null",
    "required": false,
    "description": "Index of the selected point, drawn with a ring (`null`: none)",
    "typeText": "number | null"
  },
  {
    "name": "accessiblePoints",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Renders a visually hidden list of the points per quadrant: screen\nreaders can reach every point; arrows move between them, Enter clicks\nand Shift + arrows move the focused point to the neighbouring quadrant\n(`pointDrop`, with a `pointDrop` listener)",
    "typeText": "boolean"
  },
  {
    "name": "labels",
    "type": "Partial<ChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<ChartLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D (default `auto`)",
    "typeText": "ChartRendererPreference"
  },
  {
    "name": "width",
    "type": "string | number",
    "required": false,
    "description": "Width of the chart; numbers are pixels (default `100%`)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels, strings any CSS length",
    "typeText": "string | number"
  },
  {
    "name": "annotations",
    "type": "readonly ChartAnnotation[]",
    "required": false,
    "description": "Background areas and reference lines",
    "typeText": "readonly ChartAnnotation[]"
  },
  {
    "name": "padding",
    "type": "ChartPadding",
    "required": false,
    "description": "Space around the plot area, in pixels",
    "typeText": "ChartPadding"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip, axes, accessible names); the page language by default",
    "typeText": "string"
  },
  {
    "name": "name",
    "type": "string",
    "required": false,
    "description": "Name of the points in the tooltip",
    "typeText": "string"
  },
  {
    "name": "points",
    "type": "readonly QuadrantPoint[]",
    "required": true,
    "description": "Points to place (replace the array to update the chart)",
    "typeText": "readonly QuadrantPoint[]"
  },
  {
    "name": "xDomain",
    "type": "[number, number]",
    "required": false,
    "description": "Range of the horizontal axis (default `[0, 10]`)",
    "typeText": "[number, number]"
  },
  {
    "name": "yDomain",
    "type": "[number, number]",
    "required": false,
    "description": "Range of the vertical axis (default `[0, 10]`)",
    "typeText": "[number, number]"
  },
  {
    "name": "xSplit",
    "type": "number",
    "required": false,
    "description": "X value of the vertical divider (the middle of `xDomain` by default)",
    "typeText": "number"
  },
  {
    "name": "ySplit",
    "type": "number",
    "required": false,
    "description": "Y value of the horizontal divider (the middle of `yDomain` by default)",
    "typeText": "number"
  },
  {
    "name": "quadrants",
    "type": "QuadrantRegions",
    "required": false,
    "description": "Titles and colors of the quadrants",
    "typeText": "QuadrantRegions"
  },
  {
    "name": "xLabel",
    "type": "string",
    "required": false,
    "description": "Title of the horizontal axis",
    "typeText": "string"
  },
  {
    "name": "yLabel",
    "type": "string",
    "required": false,
    "description": "Title of the vertical axis",
    "typeText": "string"
  },
  {
    "name": "axisLabels",
    "type": "QuadrantAxisLabels",
    "required": false,
    "description": "Texts at the ends of the dividers, drawn inside the plot",
    "typeText": "QuadrantAxisLabels"
  },
  {
    "name": "pointSize",
    "type": "number",
    "required": false,
    "description": "Dot diameter in pixels (default 12)",
    "typeText": "number"
  },
  {
    "name": "selectedIndices",
    "type": "readonly number[]",
    "required": false,
    "description": "Indices of the selected points",
    "typeText": "readonly number[]"
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "type": "[view: ChartView]",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "type": "[event: ChartHoverEvent | null]",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "type": "[point: QuadrantPoint, index: number]",
    "typeText": "[point: QuadrantPoint, index: number]",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "typeText": "QuadrantPoint",
        "required": true,
        "rest": false
      },
      {
        "name": "index",
        "position": 1,
        "typeText": "number",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "type": "[renderer: ChartRendererKind]",
    "typeText": "[renderer: ChartRendererKind]",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointDoubleClick",
    "type": "[point: QuadrantPoint, index: number]",
    "typeText": "[point: QuadrantPoint, index: number]",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "typeText": "QuadrantPoint",
        "required": true,
        "rest": false
      },
      {
        "name": "index",
        "position": 1,
        "typeText": "number",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointDrag",
    "type": "[point: QuadrantPoint, index: number, target: QuadrantDropTarget]",
    "typeText": "[point: QuadrantPoint, index: number, target: QuadrantDropTarget]",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "typeText": "QuadrantPoint",
        "required": true,
        "rest": false
      },
      {
        "name": "index",
        "position": 1,
        "typeText": "number",
        "required": true,
        "rest": false
      },
      {
        "name": "target",
        "position": 2,
        "typeText": "QuadrantDropTarget",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "quadrantClick",
    "type": "[quadrant: keyof QuadrantRegions, position: { x: number; y: number; }]",
    "typeText": "[quadrant: keyof QuadrantRegions, position: { x: number; y: number; }]",
    "parameters": [
      {
        "name": "quadrant",
        "position": 0,
        "typeText": "keyof QuadrantRegions",
        "required": true,
        "rest": false
      },
      {
        "name": "position",
        "position": 1,
        "typeText": "{ x: number; y: number; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointDrop",
    "type": "[point: QuadrantPoint, index: number, target: QuadrantDropTarget]",
    "typeText": "[point: QuadrantPoint, index: number, target: QuadrantDropTarget]",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "typeText": "QuadrantPoint",
        "required": true,
        "rest": false
      },
      {
        "name": "index",
        "position": 1,
        "typeText": "number",
        "required": true,
        "rest": false
      },
      {
        "name": "target",
        "position": 2,
        "typeText": "QuadrantDropTarget",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "point-actions",
    "type": "{ point: QuadrantPoint; index: number; }",
    "description": "Actions of a point (e.g. compact edit / delete buttons), shown in the\npoint card of the hovered or focused point, else of the `selectedIndex`\npoint (with this slot, the selected point keeps its card); they receive\npointer events",
    "typeText": "{ point: QuadrantPoint; index: number; }"
  },
  {
    "name": "quadrant-header",
    "type": "{ corner: keyof QuadrantRegions; info: QuadrantHeaderInfo; }",
    "description": "Header of each quadrant, in its outer corner (top edge for the top\nquadrants, bottom edge for the bottom ones, aligned to the outer side);\nreplaces the drawn title, badge, description and count. The header\nreceives pointer events (e.g. an add button)",
    "typeText": "{ corner: keyof QuadrantRegions; info: QuadrantHeaderInfo; }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: point-click

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/vue/point-click.vue

```vue
<script setup lang="ts">
// @point-click gives the clicked point, @quadrant-click the quadrant of a
// click on the empty area (`reverse-x`: urgent on the left).
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import {
  QuadrantChart,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/vue/charts";

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

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const points = computed(() =>
  SCORES.map(([x, y], i) => ({ x, y, label: text.value.tasks[i] })),
);
const quadrants = computed(() => ({
  topLeft: { label: text.value.corners.topLeft },
  topRight: { label: text.value.corners.topRight },
  bottomLeft: { label: text.value.corners.bottomLeft },
  bottomRight: { label: text.value.corners.bottomRight },
}));
const selected = ref("");
const onPointClick = (point: QuadrantPoint) => {
  selected.value = `${point.label}`;
};
const onQuadrantClick = (quadrant: QuadrantCorner) => {
  selected.value = text.value.corners[quadrant];
};
</script>

<template>
  <div style="display: grid; gap: 8px">
    <QuadrantChart
      :points="points"
      :quadrants="quadrants"
      :x-label="text.urgency"
      :y-label="text.importance"
      reverse-x
      :height="320"
      @point-click="onPointClick"
      @quadrant-click="onQuadrantClick"
    />
    <output aria-live="polite">{{ selected || text.hint }}</output>
  </div>
</template>

```

## Example: priorities

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/vue/priorities.vue

```vue
<script setup lang="ts">
// Points, quadrant titles and axis titles; dots are placed without
// overlapping labels.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { QuadrantChart } from "minerva-design/vue/charts";

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

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const points = computed(() =>
  SCORES.map(([x, y], i) => ({ x, y, label: text.value.features[i] })),
);
const quadrants = computed(() => ({
  topLeft: { label: text.value.quickWins },
  topRight: { label: text.value.bigBets },
  bottomLeft: { label: text.value.fillIns },
  bottomRight: { label: text.value.timeSinks },
}));
</script>

<template>
  <QuadrantChart
    :points="points"
    :quadrants="quadrants"
    :x-label="text.effort"
    :y-label="text.impact"
    :height="340"
  />
</template>

```

## Example: triage

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/vue/triage.vue

```vue
<script setup lang="ts">
// Badges ("Q1"), a second line per quadrant and the number of tasks after
// each title are drawn by the chart; `selected-index` rings the clicked task
// and @point-drop moves it (update `points`).
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import {
  QuadrantChart,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/vue/charts";

const TEXT = {
  en: {
    hint: "Click a task to select it, drag it to another quadrant",
    moved: "moved to",
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
    moved: "已移到",
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
    moved: "→",
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
    moved: "déplacée vers",
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

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const scores = ref<[number, number][]>([
  [9, 8.5],
  [7, 7],
  [2.5, 9],
  [8, 3],
  [2, 2.5],
]);
const points = computed(() =>
  scores.value.map(([x, y], i) => ({ x, y, label: text.value.tasks[i] })),
);
const quadrants = computed(() =>
  Object.fromEntries(
    (Object.keys(BADGES) as QuadrantCorner[]).map((corner) => [
      corner,
      {
        badge: BADGES[corner],
        label: text.value.corners[corner][0],
        description: text.value.corners[corner][1],
      },
    ]),
  ),
);
const showCounts = (count: number) => text.value.count(count);
const selected = ref<number | null>(null);
const status = ref("");
const onPointClick = (point: QuadrantPoint, index: number) => {
  selected.value = index;
  status.value = `${point.label}`;
};
const onPointDrop = (
  point: QuadrantPoint,
  index: number,
  target: { x: number; y: number; quadrant: QuadrantCorner },
) => {
  scores.value = scores.value.map((score, i) =>
    i === index ? [target.x, target.y] : score,
  );
  selected.value = index;
  status.value = `${point.label} ${text.value.moved} ${text.value.corners[target.quadrant][0]}`;
};
</script>

<template>
  <div style="display: grid; gap: 8px">
    <QuadrantChart
      :points="points"
      :quadrants="quadrants"
      :show-counts="showCounts"
      :selected-index="selected"
      reverse-x
      :show-ticks="false"
      :height="360"
      @point-click="onPointClick"
      @point-drop="onPointDrop"
    />
    <output aria-live="polite">{{ status || text.hint }}</output>
  </div>
</template>

```
