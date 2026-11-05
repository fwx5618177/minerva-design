# 条形图

从左侧生长的水平条形，类别沿左侧排列：适合排名、长名称、发散型调查和进度展示。

Package: minerva-design@1.21.1

Renderer: vue

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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "HorizontalBarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "labels",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Writes the value at the end of every bar (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "deep",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also follows in-place mutations of nested data (`series[0].data.push()`);\nby default the chart updates when a prop is replaced (cheaper on large data)",
    "typeText": "boolean"
  },
  {
    "name": "stacked",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Stacks the series on top of each other (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "percent",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Scales the stacks to 100% (implies `stacked`; default `false`)",
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
    "name": "series",
    "type": "readonly ChartSeries[]",
    "required": true,
    "description": "Data series (replace the array or a `data` array to update the chart)",
    "typeText": "readonly ChartSeries[]"
  },
  {
    "name": "xAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "X axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "yAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "Y axis",
    "typeText": "ChartAxisOptions"
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
    "name": "plotClick",
    "type": "[event: ChartPlotClickEvent]",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "type": "[event: ChartHoverEvent]",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
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
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: ranking

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/horizontal-bar-chart/vue/ranking.vue

```vue
<script setup lang="ts">
// <HorizontalBarChart>: categories down the left side, long names stay
// readable; `labels` writes the value at the end of every bar.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { HorizontalBarChart } from "minerva-design/vue/charts";

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

const { language } = useI18n();
const series = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  return [
    {
      name: text.views,
      data: VIEWS.map((y, i) => ({ x: text.pages[i], y })),
    },
  ];
});
</script>

<template>
  <HorizontalBarChart
    :series="series"
    :x-axis="{ type: 'category' }"
    labels
    :height="300"
  />
</template>

```

## Example: survey

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/horizontal-bar-chart/vue/survey.vue

```vue
<script setup lang="ts">
// `stacked percent`: every row adds up to 100 %, a survey answered on a
// three-point scale; the legend toggles an answer.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { HorizontalBarChart } from "minerva-design/vue/charts";

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
const palette = [
  "var(--success-color, #16a34a)",
  "var(--text-secondary-color, #9ca3af)",
  "var(--danger-color, #dc2626)",
];

const { language } = useI18n();
const series = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  return text.answers.map((name, k) => ({
    name,
    data: text.questions.map((x, i) => ({ x, y: ANSWERS[i][k] })),
  }));
});
</script>

<template>
  <HorizontalBarChart
    :series="series"
    :x-axis="{ type: 'category' }"
    :palette="palette"
    stacked
    percent
    :height="260"
  />
</template>

```
