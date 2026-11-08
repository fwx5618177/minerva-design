# 径向条形图

用同心圆环展示进度：活动圆环、OKR 完成度、销售额与配额对比。每个条形按数值与最大值之比填充所在圆环，带有着色的背景轨道和圆角端点；标签位于圆的空白处，中心可显示汇总文字。悬停圆环或使用方向键可查看其数值、最大值和进度。

Package: minerva-design@1.23.1

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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
  "specifier": "minerva-design/charts",
  "exports": [
    "RadialBarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly RadialBarDatum[]",
    "typeRef": "type:b44e5b77c8884c754c38",
    "required": true,
    "description": "Bars, from the outermost ring inward: a name, a value, an optional `max` and color"
  },
  {
    "name": "max",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Value of a full bar for the data without `max`"
  },
  {
    "name": "innerRadius",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.3,
    "required": false,
    "description": "Radius of the innermost ring's inner edge, as a fraction of the outer radius"
  },
  {
    "name": "startAngle",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Angle where the bars start, degrees clockwise from 12 o'clock"
  },
  {
    "name": "sweep",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 270,
    "required": false,
    "description": "Angle of a full bar, degrees (360 = full rings)"
  },
  {
    "name": "gap",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.28,
    "required": false,
    "description": "Gap between the rings, as a fraction of a ring's slot (0-0.9)"
  },
  {
    "name": "track",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Background tracks behind the bars"
  },
  {
    "name": "rounded",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Rounded bar ends"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Labels before the start of the bars (in the empty part of the circle)"
  },
  {
    "name": "labelContent",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly (\"name\" | \"value\" | \"percent\")[] | undefined",
    "typeRef": "type:9681660344634a074ea8",
    "required": false,
    "description": "What a label shows: name, value, percent of the bar's max (combinable)"
  },
  {
    "name": "centerValue",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Big text in the center (e.g. the overall completion)"
  },
  {
    "name": "centerLabel",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Small text under `centerValue`"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "enum",
    "values": [
      "auto",
      "canvas2d",
      "webgl",
      "webgl2",
      "webgpu"
    ],
    "typeText": "ChartRendererPreference | undefined",
    "typeRef": "type:dc7d7e6f384ddec86e04",
    "required": false,
    "description": "Backend of the shapes: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software; text is always drawn with Canvas2D, above the shapes"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "typeRef": "type:b3cd5c49d86fb91effb3",
    "required": false,
    "description": "Legend; clicking an item hides / shows its slice, stage, series, node, bar, row or level"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "typeRef": "type:9441d8fe0edba7239796",
    "default": true,
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "format",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:f12d9d0b7c053d4d65a6",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the values of the labels and the tooltip"
  },
  {
    "name": "percentFormat",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((share: number) => string) | undefined",
    "typeRef": "type:5bfc1184b082171dcbfd",
    "parameters": [
      {
        "name": "share",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the chart writes (tooltip rows, accessible names, number and percent formats, calendar dates); built-in texts in English, Chinese, Japanese and French (English otherwise)"
  },
  {
    "name": "texts",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "object",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "typeRef": "type:2ef787a978af6750b6c8",
    "required": false,
    "description": "Replaces built-in texts of the `locale` (tooltip rows, accessible names, \"No data\")"
  },
  {
    "name": "hidden",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar levels, by index. Makes the visibility controlled: legend clicks then only call `onToggle`, whose `hiddenIndexes` should be stored and passed back. Leave undefined to let the legend hide / show entries by itself."
  },
  {
    "name": "animation",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Entry and update animations (skipped when the user prefers reduced motion)"
  },
  {
    "name": "padding",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the drawing, in pixels"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "renderTooltip",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "node",
    "typeText": "((event: ShapeHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:599537a71f6aca3767b8",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
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
    "name": "onToggle",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:c5e11f23fbce8c1aa9a2",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeToggleEvent",
        "typeRef": "type:4b4244045a32e66c0a25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a legend item is clicked (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
  },
  {
    "name": "onHover",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:4d7c0df4667f26938fe6",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent | null",
        "typeRef": "type:5ce60fcc1021d329ffba"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the hovered (or keyboard-focused) mark changes"
  },
  {
    "name": "onClick",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:e40dbbb538ff7cd7dda5",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a mark is clicked, tapped or activated with Enter"
  }
]
```

## API

```json
{
  "RadialBarChartProps": {
    "source": "charts/src/react/shapes.tsx",
    "description": "Props of RadialBarChart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "data",
        "type": "readonly RadialBarDatum[]",
        "required": true,
        "description": "Bars, from the outermost ring inward: a name, a value, an optional `max` and color"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "default": "the largest value",
        "description": "Value of a full bar for the data without `max`"
      },
      {
        "name": "innerRadius",
        "type": "number",
        "required": false,
        "default": "0.3",
        "description": "Radius of the innermost ring's inner edge, as a fraction of the outer radius"
      },
      {
        "name": "startAngle",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Angle where the bars start, degrees clockwise from 12 o'clock"
      },
      {
        "name": "sweep",
        "type": "number",
        "required": false,
        "default": "270",
        "description": "Angle of a full bar, degrees (360 = full rings)"
      },
      {
        "name": "gap",
        "type": "number",
        "required": false,
        "default": "0.28",
        "description": "Gap between the rings, as a fraction of a ring's slot (0-0.9)"
      },
      {
        "name": "track",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Background tracks behind the bars"
      },
      {
        "name": "rounded",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Rounded bar ends"
      },
      {
        "name": "labels",
        "type": "boolean",
        "required": false,
        "default": "true when `sweep` leaves room for them (up to 300°)",
        "description": "Labels before the start of the bars (in the empty part of the circle)"
      },
      {
        "name": "labelContent",
        "type": "readonly (\"name\" | \"value\" | \"percent\")[]",
        "required": false,
        "default": "[\"name\", \"value\"]",
        "description": "What a label shows: name, value, percent of the bar's max (combinable)"
      },
      {
        "name": "centerValue",
        "type": "string",
        "required": false,
        "description": "Big text in the center (e.g. the overall completion)"
      },
      {
        "name": "centerLabel",
        "type": "string",
        "required": false,
        "description": "Small text under `centerValue`"
      }
    ]
  },
  "RadialBarDatum": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "A bar of a radial bar chart",
    "kind": "interface",
    "extends": [
      "ShapeDatum"
    ],
    "props": [
      {
        "name": "max",
        "type": "number",
        "required": false,
        "description": "Value of a full bar (e.g. a goal); the chart's `max` when omitted"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 活动圆环

完整圆环（sweep={360}）分别表示活动、锻炼和站立，各自对照每日目标（max）。切换日期时圆环会以动画过渡；由于没有空间放置标签，改由图例标出各圆环。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/radial-bar-chart/demos/activity.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

type Ring = "move" | "exercise" | "stand";

// Daily goals and a week of activity: Move in kcal, Exercise in minutes,
// Stand in hours with at least one minute of standing
const GOALS: Record<Ring, number> = { move: 600, exercise: 30, stand: 12 };
const COLORS: Record<Ring, string> = {
  move: "#fa114f",
  exercise: "#92e82a",
  stand: "#1eeaef",
};
const WEEK: Record<Ring, number>[] = [
  { move: 520, exercise: 34, stand: 11 },
  { move: 610, exercise: 41, stand: 12 },
  { move: 380, exercise: 12, stand: 8 },
  { move: 705, exercise: 55, stand: 13 },
  { move: 450, exercise: 28, stand: 10 },
  { move: 820, exercise: 72, stand: 9 },
  { move: 290, exercise: 6, stand: 6 },
];
const RINGS: Ring[] = ["move", "exercise", "stand"];
const percent = (share: number) => `${Math.round(share * 100)}%`;

export default function ActivityDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const [day, setDay] = useState(0);
  const locale = i18n.language;

  // Monday to Sunday, in the reader's language (2026-03-02 is a Monday)
  const days = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, {
      weekday: "short",
      timeZone: "UTC",
    });
    return WEEK.map((_, i) => format.format(Date.UTC(2026, 2, 2 + i)));
  }, [locale]);

  const values = WEEK[day];
  const data = useMemo(
    (): RadialBarDatum[] =>
      RINGS.map((ring) => ({
        name: t(`rings.${ring}`),
        value: values[ring],
        max: GOALS[ring],
        color: COLORS[ring],
      })),
    [t, values],
  );
  const closed = RINGS.filter((ring) => values[ring] >= GOALS[ring]).length;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("dayLabel")}
        direction="horizontal"
        value={day}
        onChange={(value) => setDay(Number(value))}
      >
        {days.map((name, i) => (
          <Radio key={name} value={i} label={name} />
        ))}
      </RadioGroup>
      <RadialBarChart
        data={data}
        sweep={360}
        innerRadius={0.34}
        gap={0.12}
        centerValue={`${closed}/3`}
        centerLabel={t("closed")}
        percentFormat={percent}
        height={320}
        ariaLabel={t("activityAria")}
      />
    </div>
  );
}

```

## Example: 赛季排行榜

通过 RadioGroup 按进球或助攻对球员排名；领先者位于最外圈并决定量程，前三名通过每个数据项的 color 获得金、银、铜色。renderTooltip 补充排名、出场次数和场均数据。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/radial-bar-chart/demos/leaderboard.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

type Stat = "goals" | "assists";

// Season statistics of a football league's top players
const PLAYERS: [key: string, goals: number, assists: number, games: number][] =
  [
    ["silva", 24, 7, 33],
    ["kowalski", 19, 12, 34],
    ["okafor", 17, 4, 30],
    ["moreau", 11, 15, 32],
    ["tanaka", 9, 13, 31],
    ["jensen", 14, 9, 28],
  ];
const STATS: Stat[] = ["goals", "assists"];
// gold, silver and bronze for the podium, a neutral color for the others
const PODIUM = ["#d4a72c", "#9ca3af", "#b4713d"];
const OTHERS = "#64748b";

export default function LeaderboardDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const locale = i18n.language;
  const [stat, setStat] = useState<Stat>("goals");

  const ranked = useMemo(() => {
    const column = stat === "goals" ? 1 : 2;
    return [...PLAYERS].sort((a, b) => b[column] - a[column]);
  }, [stat]);
  // the leader is the outermost ring, and the scale is the leader's tally
  const data = useMemo(
    (): RadialBarDatum[] =>
      ranked.map(([key, goals, assists], rank) => ({
        name: t(`leaderboard.players.${key}`),
        value: stat === "goals" ? goals : assists,
        color: PODIUM[rank] ?? OTHERS,
      })),
    [ranked, stat, t],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const ratio = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [locale],
  );

  const statName = t(`leaderboard.stats.${stat}`);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("leaderboard.stat")}
        direction="horizontal"
        value={stat}
        onChange={(value) => setStat(value as Stat)}
      >
        {STATS.map((key) => (
          <Radio key={key} value={key} label={t(`leaderboard.stats.${key}`)} />
        ))}
      </RadioGroup>
      <RadialBarChart
        data={data}
        startAngle={-90}
        sweep={270}
        innerRadius={0.25}
        gap={0.18}
        format={(value) => number.format(value)}
        renderTooltip={(bar) => {
          const games = ranked[bar.index][3];
          return (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>
                {t("leaderboard.rank", {
                  rank: number.format(bar.index + 1),
                  name: bar.name,
                })}
              </strong>
              <span>
                {t("leaderboard.tally", {
                  value: number.format(bar.value),
                  stat: statName,
                  games: number.format(games),
                })}
              </span>
              <span>
                {t("leaderboard.perGame", {
                  ratio: ratio.format(bar.value / games),
                })}
              </span>
            </div>
          );
        }}
        height={360}
        ariaLabel={t("leaderboard.aria", { stat: statName })}
      />
      <output aria-live="polite">
        {t("leaderboard.leader", {
          name: data[0].name,
          value: number.format(data[0].value),
          stat: statName,
        })}
      </output>
    </div>
  );
}

```

## Example: OKR 完成度

各关键结果按目标的百分比显示（max={100}），每个条形起点前标出名称和百分比；中心显示平均完成度。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/radial-bar-chart/demos/okr.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

// Key results of a quarter's objective, in percent of their target
const KEY_RESULTS: [key: string, progress: number][] = [
  ["activation", 82],
  ["retention", 64],
  ["nps", 91],
  ["latency", 47],
  ["churn", 58],
];

const percent = (share: number) => `${Math.round(share * 100)}%`;

export default function OkrDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });

  const data = useMemo(
    (): RadialBarDatum[] =>
      KEY_RESULTS.map(([key, progress]) => ({
        name: t(`okr.${key}`),
        value: progress,
      })),
    [t],
  );
  const average = Math.round(
    KEY_RESULTS.reduce((sum, [, progress]) => sum + progress, 0) /
      KEY_RESULTS.length,
  );

  return (
    <RadialBarChart
      data={data}
      max={100}
      innerRadius={0.4}
      labelContent={["name", "percent"]}
      percentFormat={percent}
      centerValue={`${average}%`}
      centerLabel={t("average")}
      height={340}
      ariaLabel={t("okrAria")}
    />
  );
}

```

## Example: 销售额与配额

半圆（sweep={180}、startAngle={-90}）只占一半高度；每个区域以各自的配额作为 max。labels={false} 改为显示图例，中心给出整体达成率。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/radial-bar-chart/demos/quota.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

// Quarterly sales against each region's quota, in thousands of dollars
const REGIONS: [key: string, sales: number, quota: number][] = [
  ["north", 1840, 2000],
  ["south", 1260, 1100],
  ["east", 980, 1400],
  ["west", 1520, 1600],
];

export default function QuotaDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const locale = i18n.language;

  const data = useMemo(
    (): RadialBarDatum[] =>
      REGIONS.map(([key, sales, quota]) => ({
        name: t(`regions.${key}`),
        value: sales,
        max: quota,
      })),
    [t],
  );
  const format = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    });
    return (value: number) => money.format(value * 1000);
  }, [locale]);
  const total = REGIONS.reduce((sum, [, sales]) => sum + sales, 0);
  const quota = REGIONS.reduce((sum, [, , q]) => sum + q, 0);

  return (
    <RadialBarChart
      data={data}
      sweep={180}
      startAngle={-90}
      innerRadius={0.45}
      gap={0.2}
      labels={false}
      format={format}
      centerValue={`${Math.round((total / quota) * 100)}%`}
      centerLabel={t("ofQuota")}
      padding={{ top: 8, bottom: 0, left: 8, right: 8 }}
      height={300}
      ariaLabel={t("quotaAria")}
    />
  );
}

```

## Example: 储蓄目标

每个储蓄罐以自己的目标作为 max，labelContent 显示名称和已存百分比。onClick 选择一个目标：下方文字给出剩余金额，以及按每月转入金额还需要几个月。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/radial-bar-chart/demos/savings-goals.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

// Savings goals of a household, in euros: saved so far, the goal and the
// monthly transfer to each pot
const GOALS: [key: string, saved: number, goal: number, monthly: number][] = [
  ["emergency", 7400, 9000, 400],
  ["holiday", 1850, 3200, 250],
  ["laptop", 1100, 1600, 150],
  ["deposit", 12600, 40000, 900],
];

const labelContent = ["name", "percent"] as const;

export default function SavingsGoalsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<number | null>(null);

  const data = useMemo(
    (): RadialBarDatum[] =>
      GOALS.map(([key, saved, goal]) => ({
        name: t(`savings.goals.${key}`),
        value: saved,
        max: goal,
      })),
    [t],
  );
  const money = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    [locale],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const saved = GOALS.reduce((sum, [, value]) => sum + value, 0);
  const goal = GOALS.reduce((sum, [, , value]) => sum + value, 0);

  const detail = () => {
    if (selected === null) return t("savings.hint");
    const [, value, target, monthly] = GOALS[selected];
    const remaining = target - value;
    return t("savings.detail", {
      goal: data[selected].name,
      saved: money.format(value),
      target: money.format(target),
      remaining: money.format(remaining),
      months: number.format(Math.ceil(remaining / monthly)),
      monthly: money.format(monthly),
    });
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadialBarChart
        data={data}
        innerRadius={0.36}
        labelContent={labelContent}
        format={(value) => money.format(value)}
        percentFormat={(share) => percent.format(share)}
        centerValue={percent.format(saved / goal)}
        centerLabel={t("savings.overall")}
        onClick={(event) => setSelected(event.index)}
        height={340}
        ariaLabel={t("savings.aria")}
      />
      <output aria-live="polite">{detail()}</output>
    </div>
  );
}

```

## Example: 形状与样式

sweep 和 startAngle 决定圆环形状，rounded 决定条形端点是否为圆角，track 决定是否绘制背景轨道。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/radial-bar-chart/demos/styles.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Radio, RadioGroup, Switch } from "minerva-design";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

type Shape = "threeQuarter" | "full" | "half";

// Use of a server's resources, in percent of their capacity
const RESOURCES: [key: string, used: number][] = [
  ["cpu", 72],
  ["memory", 58],
  ["disk", 86],
  ["network", 31],
];

const SHAPES: Record<Shape, { sweep: number; startAngle: number }> = {
  threeQuarter: { sweep: 270, startAngle: 0 },
  full: { sweep: 360, startAngle: 0 },
  half: { sweep: 180, startAngle: -90 },
};

const percent = (value: number) => `${value}%`;

export default function StylesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const [shape, setShape] = useState<Shape>("threeQuarter");
  const [rounded, setRounded] = useState(true);
  const [track, setTrack] = useState(true);

  const data = useMemo(
    (): RadialBarDatum[] =>
      RESOURCES.map(([key, used]) => ({
        name: t(`resources.${key}`),
        value: used,
      })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={16} wrap align="center">
        <RadioGroup
          aria-label={t("shapeLabel")}
          direction="horizontal"
          value={shape}
          onChange={(value) => setShape(value as Shape)}
        >
          {(Object.keys(SHAPES) as Shape[]).map((key) => (
            <Radio key={key} value={key} label={t(`shapes.${key}`)} />
          ))}
        </RadioGroup>
        <Switch checked={rounded} onChange={setRounded} label={t("rounded")} />
        <Switch checked={track} onChange={setTrack} label={t("track")} />
      </HStack>
      <RadialBarChart
        data={data}
        max={100}
        {...SHAPES[shape]}
        rounded={rounded}
        track={track}
        labelContent={["name", "value"]}
        format={percent}
        height={320}
        ariaLabel={t("resourcesAria")}
      />
    </div>
  );
}

```

## Example: 敬业度调查

每条陈述的 max 是回答该题的人数，因此进度条显示表示同意的比例。通过 Select 按问卷顺序或得分重新排列圆环，percentFormat 格式化百分比，renderTooltip 给出具体人数。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/radial-bar-chart/demos/survey.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

type Order = "survey" | "highest" | "lowest";

// Employee engagement survey: respondents who agree with each statement,
// out of those who answered it
const STATEMENTS: [key: string, agree: number, answered: number][] = [
  ["valued", 312, 418],
  ["goals", 351, 420],
  ["growth", 226, 409],
  ["balance", 268, 415],
  ["manager", 334, 412],
  ["recommend", 297, 417],
];
const ORDERS: Order[] = ["survey", "highest", "lowest"];
const share = ([, agree, answered]: (typeof STATEMENTS)[number]) =>
  agree / answered;

const labelContent = ["name", "percent"] as const;

export default function SurveyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const locale = i18n.language;
  const [order, setOrder] = useState<Order>("survey");

  const rows = useMemo(() => {
    if (order === "survey") return STATEMENTS;
    const sign = order === "highest" ? -1 : 1;
    return [...STATEMENTS].sort((a, b) => sign * (share(a) - share(b)));
  }, [order]);
  const data = useMemo(
    (): RadialBarDatum[] =>
      rows.map(([key, agree, answered]) => ({
        name: t(`survey.statements.${key}`),
        value: agree,
        max: answered,
      })),
    [rows, t],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const average =
    STATEMENTS.reduce((sum, row) => sum + share(row), 0) / STATEMENTS.length;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        size="small"
        style={{ width: 220 }}
        aria-label={t("survey.order")}
        value={order}
        onChange={(value) => setOrder(value as Order)}
      >
        {ORDERS.map((key) => (
          <SelectItem key={key} value={key}>
            {t(`survey.orders.${key}`)}
          </SelectItem>
        ))}
      </Select>
      <RadialBarChart
        data={data}
        innerRadius={0.3}
        gap={0.22}
        labelContent={labelContent}
        percentFormat={(value) => percent.format(value)}
        centerValue={percent.format(average)}
        centerLabel={t("survey.average")}
        renderTooltip={(bar) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{bar.name}</strong>
            <span>
              {t("survey.agree", {
                agree: number.format(bar.value),
                answered: number.format(rows[bar.index][2]),
                share: percent.format(bar.percent),
              })}
            </span>
          </div>
        )}
        height={360}
        ariaLabel={t("survey.aria")}
      />
    </div>
  );
}

```

## Example: 文件上传

完整圆环（sweep={360}）跟踪四个上传任务，每次同时上传两个；setInterval 在全部上传完成或卸载时停止，animation={false} 让进度条跟上快速更新。labels={false} 让图例显示文件名，并且只播报已完成的文件。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/radial-bar-chart/demos/uploads.tsx

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

/** Small seeded random generator: the same upload speeds on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Files being uploaded, with their size in MB
const FILES: [key: string, size: number][] = [
  ["video", 840],
  ["photos", 420],
  ["slides", 96],
  ["backup", 1200],
];
const SEED = 3;
// at most two files are sent at the same time, in this order
const PARALLEL = 2;
const START = FILES.map(() => 0);

const legend = { toggle: false } as const;

export default function UploadsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const locale = i18n.language;
  const [sent, setSent] = useState(START);
  const random = useRef(mulberry32(SEED));

  const done = sent.filter((value, i) => value >= FILES[i][1]).length;
  const finished = done === FILES.length;

  useEffect(() => {
    if (finished) return;
    const timer = window.setInterval(() => {
      // 20 to 60 MB per tick for each file being sent
      const speeds = FILES.map(() => 20 + random.current() * 40);
      setSent((current) => {
        let slots = PARALLEL;
        return current.map((value, i) => {
          const size = FILES[i][1];
          if (value >= size || slots === 0) return value;
          slots--;
          return Math.min(size, value + speeds[i]);
        });
      });
    }, 400);
    return () => window.clearInterval(timer);
  }, [finished]);

  const data = useMemo(
    (): RadialBarDatum[] =>
      FILES.map(([key, size], i) => ({
        name: t(`uploads.files.${key}`),
        value: sent[i],
        max: size,
      })),
    [sent, t],
  );
  const megabytes = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "megabyte",
        maximumFractionDigits: 0,
      }),
    [locale],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const total = FILES.reduce((sum, [, size]) => sum + size, 0);
  const uploaded = sent.reduce((sum, value) => sum + value, 0);

  const restart = () => {
    random.current = mulberry32(SEED);
    setSent(START);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadialBarChart
        data={data}
        sweep={360}
        innerRadius={0.42}
        gap={0.2}
        labels={false}
        legend={legend}
        animation={false}
        format={(value) => megabytes.format(value)}
        percentFormat={(share) => percent.format(share)}
        centerValue={percent.format(uploaded / total)}
        centerLabel={t("uploads.uploaded")}
        height={320}
        ariaLabel={t("uploads.aria")}
      />
      <HStack gap={8} wrap align="center">
        <Button size="small" variant="outline" onClick={restart}>
          {t("uploads.restart")}
        </Button>
        {/* announced when a file completes, not on every progress tick */}
        <output aria-live="polite">
          {finished
            ? t("uploads.finished", { size: megabytes.format(total) })
            : t("uploads.progress", {
                done: number.format(done),
                files: number.format(FILES.length),
              })}
        </output>
      </HStack>
    </div>
  );
}

```
