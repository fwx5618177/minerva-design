# 径向条形图

用同心圆环展示进度：活动圆环、OKR 完成度、销售额与配额对比。每个条形按数值与最大值之比填充所在圆环，带有着色的背景轨道和圆角端点；标签位于圆的空白处，中心可显示汇总文字。悬停圆环或使用方向键可查看其数值、最大值和进度。

Package: minerva-design@1.19.3

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly RadialBarDatum[]",
    "typeRef": "type:7150dd40768d42bb3623",
    "required": true,
    "description": "Bars, from the outermost ring inward: a name, a value, an optional `max` and color"
  },
  {
    "name": "max",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Value of a full bar for the data without `max`"
  },
  {
    "name": "innerRadius",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.3,
    "required": false,
    "description": "Radius of the innermost ring's inner edge, as a fraction of the outer radius"
  },
  {
    "name": "startAngle",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Angle where the bars start, degrees clockwise from 12 o'clock"
  },
  {
    "name": "sweep",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 270,
    "required": false,
    "description": "Angle of a full bar, degrees (360 = full rings)"
  },
  {
    "name": "gap",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.28,
    "required": false,
    "description": "Gap between the rings, as a fraction of a ring's slot (0-0.9)"
  },
  {
    "name": "track",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Background tracks behind the bars"
  },
  {
    "name": "rounded",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Rounded bar ends"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Labels before the start of the bars (in the empty part of the circle)"
  },
  {
    "name": "labelContent",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly (\"value\" | \"percent\" | \"name\")[] | undefined",
    "typeRef": "type:33c7f9c5e38399332f9d",
    "required": false,
    "description": "What a label shows: name, value, percent of the bar's max (combinable)"
  },
  {
    "name": "centerValue",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Big text in the center (e.g. the overall completion)"
  },
  {
    "name": "centerLabel",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Small text under `centerValue`"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:3c1d4f0e2c96bafd8005",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "legend",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "typeRef": "type:b3cd5c49d86fb91effb3",
    "required": false,
    "description": "Legend; tapping an item hides / shows its slice, stage, series, node, bar, row or level"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "typeRef": "type:9441d8fe0edba7239796",
    "default": true,
    "required": false,
    "description": "Tooltip shown while a mark is pressed; `false` disables it"
  },
  {
    "name": "format",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:541b024ed1104992e34e",
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
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((share: number) => string) | undefined",
    "typeRef": "type:d92c3cd66b7afc0213bc",
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
    "name": "hidden",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:2efc21c063c671bd9177",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar levels, by index. Makes the visibility controlled: legend taps then only call `onToggle`, whose `hiddenIndexes` should be stored and passed back."
  },
  {
    "name": "animation",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Entry and update animations (skipped when the theme reduces motion)"
  },
  {
    "name": "padding",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the drawing, in pixels"
  },
  {
    "name": "ariaLabel",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "BCP 47 locale of the built-in texts (tooltip rows, accessible names, \"No data\") and of the numbers"
  },
  {
    "name": "texts",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "object",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "typeRef": "type:2ef787a978af6750b6c8",
    "required": false,
    "description": "Replaces built-in texts of the `locale`"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false,
    "description": "Height of the chart (the legend included)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "renderTooltip",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "node",
    "typeText": "((event: ShapeHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:9333c89b3161f5ff3652",
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
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Test identifier of the root view"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:fa632874a08b24956e5f",
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
    "description": "Called when the highlighted mark changes (press and drag over the chart)"
  },
  {
    "name": "onClick",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:8504b594a968c22eaac5",
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
    "description": "Called when a mark is tapped"
  },
  {
    "name": "onToggle",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:d096120cd0ab66afae24",
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
    "description": "Called when a legend item is tapped (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
  }
]
```

## API

```json
{
  "native:RadialBarChartProps": {
    "source": "native/src/components/ShapeChart/types.ts",
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
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/radial-bar-chart/native/basic.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import {
  RadialBarChart,
  Tabs,
  type RadialBarDatum,
} from "minerva-design/native";

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

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const [day, setDay] = useState("0");
  const locale = i18n.language;
  // Monday to Sunday, in the reader's language (2026-03-02 is a Monday)
  const days = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, {
      weekday: "narrow",
      timeZone: "UTC",
    });
    return WEEK.map((_, i) => ({
      value: String(i),
      label: format.format(Date.UTC(2026, 2, 2 + i)),
    }));
  }, [locale]);
  const values = WEEK[Number(day)] ?? GOALS;
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
    <View style={{ width: "100%", gap: 12 }}>
      <Tabs
        variant="pills"
        listLabel={t("dayLabel")}
        items={days}
        value={day}
        onChange={setDay}
      />
      <RadialBarChart
        data={data}
        labelContent={["name", "percent"]}
        percentFormat={percent}
        centerValue={`${closed}/3`}
        centerLabel={t("closed")}
        height={300}
        ariaLabel={t("activityAria")}
      />
    </View>
  );
}

```
