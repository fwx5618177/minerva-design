# 径向条形图

用同心圆环展示进度：活动圆环、OKR 完成度、销售额与配额对比。每个条形按数值与最大值之比填充所在圆环，带有着色的背景轨道和圆角端点；标签位于圆的空白处，中心可显示汇总文字。悬停圆环或使用方向键可查看其数值、最大值和进度。

Package: minerva-design@1.20.1

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

活动

锻炼

站立

星期

个圆环已合拢

所选日期的活动圆环：活动、锻炼和站立与目标的对比

激活率

第 4 周留存

NPS 高于 50

p95 延迟

流失率降低

平均完成度

本季度关键结果的完成度

华北

华南

华东

西部

配额达成

各区域季度销售额与配额的对比

CPU

内存

磁盘

网络

形状

四分之三圆

整圆

半圆

圆角端点

背景轨道

服务器资源使用率，占容量的百分比

应急资金

暑假旅行

新笔记本电脑

购房首付

点击某个目标，查看还需要多长时间。

{{goal}}：已存 {{saved}}，目标 {{target}}。还差 {{remaining}}，按每月 {{monthly}} 约需 {{months}} 个月。

全部目标

各储蓄目标的已存金额与目标对比

席尔瓦

科瓦尔斯基

奥卡福

莫罗

田中

延森

进球

助攻

排名依据

第 {{rank}} 名 {{name}}

{{stat}}：{{games}} 场 {{value}} 个

场均 {{ratio}}

本赛季联赛{{stat}}排行

领先者：{{name}}（{{stat}}：{{value}}）

发布会视频

活动照片

演示文稿

数据库备份

已上传

各文件的上传进度

重新开始

所有文件均已上传（{{size}}）。

已上传 {{done}}/{{files}} 个文件

我感到被重视

我的目标很明确

我在这里能成长

工作与生活平衡

我的经理支持我

我会推荐来这里工作

排序

问卷顺序

同意率从高到低

同意率从低到高

平均同意率

{{answered}} 位受访者中有 {{agree}} 位同意（{{share}}）

同意各调查陈述的员工比例

## RadialBarChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/radial-bar-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "max",
    "typeText": "number | undefined",
    "attribute": "max",
    "required": false
  },
  {
    "name": "innerRadius",
    "typeText": "number",
    "attribute": "inner-radius",
    "required": false
  },
  {
    "name": "sweep",
    "typeText": "number",
    "attribute": "sweep",
    "required": false
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "attribute": "center-value",
    "required": false
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
    "attribute": "center-label",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly RadialBarDatum[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<RadialBarChartOptions, \"type\">> | undefined",
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
    "description": "The hovered (or keyboard-focused) mark changed; detail: { index, name, value, share }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-click",
    "typeText": "CustomEvent",
    "description": "A mark was clicked, tapped or activated with Enter; detail: { index, name, value, share }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A legend item was clicked (or `toggle()` called); detail: { index, hidden, hiddenIndexes }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 活动圆环

三个完整圆环，各自有目标值（max）；中心显示当天汇总。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radial-bar-chart/wc/activity.html

```html
<minerva-radial-bar-chart
  id="activity"
  sweep="360"
  center-value="78 %"
></minerva-radial-bar-chart>

```

### apps/docs/src/docs/pages/radial-bar-chart/wc/activity.ts

```tsx
// Activity rings: each bar has its own `max` (the goal), `sweep="360"` makes
// full rings and the center texts summarize them.
import type { MinervaRadialBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { rings: ["Move", "Exercise", "Stand"], today: "of today’s goals" },
  zh: { rings: ["活动", "锻炼", "站立"], today: "今日目标" },
  ja: { rings: ["ムーブ", "エクササイズ", "スタンド"], today: "今日の目標" },
  fr: {
    rings: ["Bouger", "M’entraîner", "Me lever"],
    today: "des objectifs du jour",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaRadialBarChart>("#activity")!;
  chart.data = [
    { name: text.rings[0], value: 420, max: 500, color: "#ef4444" },
    { name: text.rings[1], value: 24, max: 30, color: "#22c55e" },
    { name: text.rings[2], value: 9, max: 12, color: "#06b6d4" },
  ];
  chart.centerLabel = text.today;
  chart.options = { labelContent: ["name", "percent"] };
}

```

## Example: 关键结果完成度

五个关键结果在同一刻度上的完成度；标签位于 270° 扫角留下的空白象限。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/radial-bar-chart/wc/okr.html

```html
<minerva-radial-bar-chart
  id="okr"
  max="100"
  inner-radius="0.2"
></minerva-radial-bar-chart>

```

### apps/docs/src/docs/pages/radial-bar-chart/wc/okr.ts

```tsx
// Key results completion on one scale (`max="100"`): the labels sit before
// the start of the bars, in the empty quarter left by the 270° sweep.
import type { MinervaRadialBarChart } from "minerva-design/web-components/chart";

const OKR = {
  en: ["Revenue", "New customers", "Retention", "NPS", "Hiring"],
  zh: ["营收", "新客户", "留存率", "净推荐值", "招聘"],
  ja: ["売上", "新規顧客", "継続率", "NPS", "採用"],
  fr: [
    "Chiffre d’affaires",
    "Nouveaux clients",
    "Rétention",
    "NPS",
    "Recrutement",
  ],
};

const DONE = [92, 74, 61, 48, 35];

export function setup(root: HTMLElement) {
  const names =
    OKR[document.documentElement.lang as keyof typeof OKR] ?? OKR.en;
  const chart = root.querySelector<MinervaRadialBarChart>("#okr")!;
  chart.data = names.map((name, i) => ({ name, value: DONE[i] }));
  chart.options = { format: (value) => `${value} %` };
}

```
