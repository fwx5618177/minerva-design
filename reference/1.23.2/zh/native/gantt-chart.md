# 甘特图

在时间轴上以条形表示任务，显示进度、分组、里程碑和今日线；可沿时间缩放和平移。

Package: minerva-design@1.23.2

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

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

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "GanttChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "tasks",
    "source": "packages/native/src/components/Charts/types.ts",
    "kind": "array",
    "typeText": "readonly GanttTask[]",
    "typeRef": "type:791e8e1c53f83b4ec740",
    "required": true,
    "description": "Tasks and milestones, from top to bottom"
  },
  {
    "name": "today",
    "source": "packages/native/src/components/Charts/types.ts",
    "kind": "union",
    "typeText": "number | boolean | Date | undefined",
    "typeRef": "type:dbbc7339a861a5b4f401",
    "default": false,
    "required": false,
    "description": "Draws a line at this date (`true`: now)"
  },
  {
    "name": "todayLabel",
    "source": "packages/native/src/components/Charts/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Label of the today line"
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Test identifier of the root view"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip shown on tap / while scrubbing; `false` disables it"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "xAxis",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "X axis"
  },
  {
    "name": "yAxis",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Y axis"
  },
  {
    "name": "legend",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name (tap toggles a series)"
  },
  {
    "name": "annotations",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas, reference lines and texts"
  },
  {
    "name": "interaction",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Pinch to zoom, drag to pan when zoomed, double tap to reset; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  },
  {
    "name": "renderTooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "node",
    "typeText": "((event: ChartHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:66d650d38e6b7d308d32",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip (replaces the default content)"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:170f27b8f07028fffd08",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent | null",
        "typeRef": "type:92ec77c4587c7e27430b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the highlighted points change"
  },
  {
    "name": "onPointClick",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent) => void) | undefined",
    "typeRef": "type:d586363317763d2fd3f3",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a point (or bar) is tapped"
  },
  {
    "name": "onPlotClick",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartPlotClickEvent) => void) | undefined",
    "typeRef": "type:3ab7d8ab926fce010082",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartPlotClickEvent",
        "typeRef": "type:db60e2cf00fabb558740"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the plot area is tapped where there is no point"
  },
  {
    "name": "onZoom",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:e6c98e88ed542ed60f34",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartView",
        "typeRef": "type:f1de933b453f8db86ff3"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the user zooms or pans"
  }
]
```

## API

```json
{
  "native:GanttChartProps": {
    "source": "native/src/components/Charts/types.ts",
    "description": "Props of GanttChart",
    "kind": "interface",
    "extends": [
      "Omit<ChartCommonProps, \"crosshair\">",
      "GanttOptions"
    ],
    "props": [
      {
        "name": "tasks",
        "type": "readonly GanttTask[]",
        "required": true,
        "description": "Tasks and milestones, from top to bottom"
      },
      {
        "name": "today",
        "type": "boolean | number | Date",
        "required": false,
        "default": "false",
        "description": "Draws a line at this date (`true`: now)"
      },
      {
        "name": "todayLabel",
        "type": "string",
        "required": false,
        "description": "Label of the today line"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/native/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/native";

const day = (month: number, date: number) => new Date(2026, month - 1, date);

// Relaunch of a website: tasks by phase with their progress, and the launch
const plan = [
  ["research", "discovery", day(3, 2), day(3, 13), 1],
  ["wireframes", "design", day(3, 23), day(4, 7), 1],
  ["visualDesign", "design", day(4, 1), day(4, 24), 0.7],
  ["frontend", "build", day(4, 20), day(5, 29), 0.2],
  ["qa", "launch", day(5, 25), day(6, 12), 0],
] as const;

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const tasks = useMemo(
    (): GanttTask[] => [
      ...plan.map(([key, phase, start, end, progress]) => ({
        name: t(`tasks.${key}`),
        group: t(`phases.${phase}`),
        start,
        end,
        progress,
      })),
      { name: t("tasks.launch"), start: day(6, 15), milestone: true },
    ],
    [t],
  );
  return (
    <GanttChart
      height={300}
      locale={i18n.language}
      tasks={tasks}
      progressName={t("progress")}
      milestoneName={t("milestones")}
      legend={{ position: "bottom" }}
      ariaLabel={t("projectAria")}
    />
  );
}

```

## Example: 泳道：一天的日程

按优先级分泳道的单日日程：row 相同的任务共用一条泳道，时间范围对齐到整点（08:00–22:00）并以时:分显示刻度，group 按类型为任务着色，today 画出当前时间。由于每条泳道有多个任务，barLabels（默认 "auto"）会把任务名写在条形内部，过长时以省略号截断，并使用与条形对比明显的文字颜色。没有 progress 的任务画成实心条；进行中的代码评审以半透明显示剩余部分。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/native/daily.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/native";

const at = (hours: number, minutes = 0) =>
  new Date(2026, 10, 2, hours, minutes);

// A one-day schedule in priority lanes: several tasks per row (their names
// inside the bars), hour ticks and the current time
const plan = [
  ["standup", "high", "work", at(9), at(9, 30)],
  ["deepWork", "high", "work", at(10), at(12)],
  ["exam", "high", "study", at(16), at(17, 30)],
  ["email", "medium", "work", at(8), at(8, 45)],
  ["review", "medium", "work", at(13, 30), at(15)],
  ["flashcards", "medium", "study", at(20), at(21)],
  ["lunch", "low", "life", at(12), at(13)],
  ["gym", "low", "life", at(18), at(19, 30)],
  ["reading", "low", "study", at(21, 15), at(22)],
] as const;
const progress: Partial<Record<(typeof plan)[number][0], number>> = {
  review: 0.6,
};

export default function Daily() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const tasks = useMemo(
    (): GanttTask[] =>
      plan.map(([key, lane, group, start, end]) => ({
        id: key,
        name: t(`daily.tasks.${key}`),
        row: t(`daily.lanes.${lane}`),
        group: t(`daily.groups.${group}`),
        start,
        end,
        progress: progress[key],
      })),
    [t],
  );
  return (
    <GanttChart
      height={260}
      locale={i18n.language}
      tasks={tasks}
      barLabels="auto"
      today={at(14, 30)}
      todayLabel={t("daily.now")}
      legend={{ position: "bottom" }}
      ariaLabel={t("daily.aria")}
    />
  );
}

```
