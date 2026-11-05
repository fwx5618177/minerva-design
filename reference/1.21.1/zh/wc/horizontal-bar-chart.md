# 条形图

从左侧生长的水平条形，类别沿左侧排列：适合排名、长名称、发散型调查和进度展示。

Package: minerva-design@1.21.1

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

开发者

使用各编程语言的开发者占比

我在这里看得到职业发展路径

我的工作量是可控的

我拥有所需的工具

我的经理支持我

我的薪酬是公平的

非常不同意

不同意

同意

非常同意

员工调查结果，左侧为不同意，右侧为同意

已完成

评审中

待办

平台

支付

移动端

增长

设计

各团队里程碑任务的状态

票数

所有页面和邮件支持深色模式

移动设备离线模式

将报表连同图表导出为 PDF

支持 SAML 和 OIDC 单点登录

日历双向同步

批量编辑多条记录

所有对象支持自定义字段

最受期待功能的票数

预算

实际

研发

市场

销售

客服

财务

各部门的预算与实际支出

变化

北美

欧洲

亚太

拉丁美洲

中东

非洲

各地区月活跃用户的变化

用户

信息

照片

地图

音乐

备忘录

各应用的月活跃用户

{{app}}：{{users}} 百万用户

点击一个条形

收入

销量

无线耳机

智能手表

蓝牙音箱

机械键盘

快速充电器

高清摄像头

无线鼠标

平板电脑

USB-C 数据线

笔记本支架

排序依据

显示行数

前 {{n}} 名

全部商品

上月最畅销的商品，从高到低排列

这 {{n}} 件商品占总量的 {{share}}。

{{value}} GW

光伏装机容量

播放

暂停

重新播放

回到开头

{{year}} 年底光伏装机容量最多的国家

薪资区间

初级

中级

高级

资深

首席

总监

报价

最低

中位值

最高

报价 / 中位值

报价 −{{step}}

报价 +{{step}}

{{offer}} 的报价落在{{levels}}区间内。

{{offer}} 的报价不在任何区间内。

各职级的年薪区间，报价以竖线表示

剩余错误预算

发布冻结

过去 30 天各服务剩余的错误预算，从最差开始排列

SLO {{slo}}，实测可用性 {{availability}}

在允许的 {{allowed}} 中还剩 {{minutes}} 可停机时间。

预算已超支 {{minutes}}。

点击某个服务查看其预算。

## HorizontalBarChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/horizontal-bar-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "stacked",
    "typeText": "boolean",
    "attribute": "stacked",
    "required": false
  },
  {
    "name": "percent",
    "typeText": "boolean",
    "attribute": "percent",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "boolean",
    "attribute": "labels",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[] | undefined",
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

## Example: 访问最多的页面

类别沿左侧排列，较长的名称也清晰可读；labels 在每根柱子末端写出数值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/horizontal-bar-chart/wc/ranking.html

```html
<minerva-horizontal-bar-chart
  id="pages"
  labels
  height="300"
></minerva-horizontal-bar-chart>

```

### apps/docs/src/docs/pages/horizontal-bar-chart/wc/ranking.ts

```tsx
// <minerva-horizontal-bar-chart>: categories down the left side, long names
// stay readable; `labels` writes the value at the end of every bar.
import type { MinervaHorizontalBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    views: "Page views",
    pages: ["Home", "Pricing", "Documentation", "Blog", "Careers", "Contact"],
  },
  zh: {
    views: "浏览量",
    pages: ["首页", "价格", "文档", "博客", "招聘", "联系我们"],
  },
  ja: {
    views: "ページビュー",
    pages: [
      "ホーム",
      "料金",
      "ドキュメント",
      "ブログ",
      "採用情報",
      "お問い合わせ",
    ],
  },
  fr: {
    views: "Pages vues",
    pages: [
      "Accueil",
      "Tarifs",
      "Documentation",
      "Blog",
      "Carrières",
      "Contact",
    ],
  },
};

const VIEWS = [48200, 31900, 27400, 15800, 9100, 4300];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHorizontalBarChart>("#pages")!;
  chart.series = [
    {
      name: text.views,
      data: VIEWS.map((y, i) => ({ x: text.pages[i], y })),
    },
  ];
  chart.options = { xAxis: { type: "category" } };
}

```

## Example: 问卷结果（100% 堆叠）

stacked 与 percent：每行合计 100%；点击图例可隐藏某个选项。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/horizontal-bar-chart/wc/survey.html

```html
<minerva-horizontal-bar-chart
  id="survey"
  stacked
  percent
  height="260"
></minerva-horizontal-bar-chart>

```

### apps/docs/src/docs/pages/horizontal-bar-chart/wc/survey.ts

```tsx
// `stacked percent`: every row adds up to 100 %, a survey answered on a
// three-point scale; the legend toggles an answer.
import type { MinervaHorizontalBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    answers: ["Agree", "Neutral", "Disagree"],
    questions: [
      "Easy to set up",
      "Good documentation",
      "Fast enough",
      "Would recommend",
    ],
  },
  zh: {
    answers: ["同意", "中立", "不同意"],
    questions: ["易于上手", "文档完善", "速度够快", "愿意推荐"],
  },
  ja: {
    answers: ["そう思う", "どちらでもない", "そう思わない"],
    questions: [
      "導入が簡単",
      "ドキュメントが充実",
      "十分に速い",
      "人に勧めたい",
    ],
  },
  fr: {
    answers: ["D’accord", "Neutre", "Pas d’accord"],
    questions: [
      "Facile à installer",
      "Bonne documentation",
      "Assez rapide",
      "Je recommande",
    ],
  },
};

// answers per question: agree, neutral, disagree
const ANSWERS = [
  [72, 18, 10],
  [58, 27, 15],
  [64, 21, 15],
  [81, 12, 7],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHorizontalBarChart>("#survey")!;
  chart.series = text.answers.map((name, k) => ({
    name,
    data: text.questions.map((x, i) => ({ x, y: ANSWERS[i][k] })),
  }));
  chart.options = {
    xAxis: { type: "category" },
    palette: [
      "var(--success-color, #16a34a)",
      "var(--text-secondary-color, #9ca3af)",
      "var(--danger-color, #dc2626)",
    ],
  };
}

```
