# 日历热力图

在日历上展示每日数值，类似贡献图：代码提交、学习打卡、运动、订单等。每天是一个按等级着色的格子；月份和星期名称、提示框中的日期以及每周第一天都遵循 locale。图例可隐藏 / 显示某个等级；方向键可按天和按周移动，提示框会显示日期。

Package: minerva-design@1.20.1

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

过去一年共 {{total}} 次提交

过去一年每天的代码提交次数

{{date}}：{{value}} 次提交

点击某一天（或聚焦图表后用方向键移动并按 Enter）即可选中

{{value}} 分钟

当前连续 {{current}} 天 · 最长连续 {{longest}} 天

2026 年每天的语言练习分钟数

{{date}}：练习 {{value}}

{{date}}：未练习

点击某一天查看练习时长

{{value}} 公里

2024 至 2026 年每天的跑步距离

{{year}} 年：{{value}}

每周第一天

跟随语言区域

2026 年每天的线上订单数，按月显示

语言区域

2026 年上半年每天的部署次数

{{value}} 千瓦时

仅看高用电

显示全部

2025 年每日用电量

显示 {{days}} 天，共 {{value}}（占全年 {{share}}）

无记录

比目标 {{goal}} {{value}}

平均每晚 {{average}} · {{nights}} 晚中有 {{reached}} 晚达到 {{goal}} 的目标

2026 年 5 月至 10 月每晚的睡眠时长

年份

{{year}} 年：{{total}} 起事故，{{quiet}} 天无事故

{{value}} 起事故

{{year}} 年每日生产事故

{{date}}：{{value}} 起事故

{{date}}：无事故

{{date}}：尚未到来

悬停在某一天上查看其事故

锻炼 {{done}} 次（占 {{share}} 的天数）· 当前连续 {{streak}} 天

重置

已完成

未完成

2026 年 8 月至 10 月每日的锻炼记录

{{date}} 已标记为完成

{{date}} 已标记为未完成

点击某一天（或在其上按 Enter）来记录或取消一次锻炼

## CalendarHeatmap

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "CalendarHeatmap"
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
    "typeText": "readonly CalendarDatum[]",
    "typeRef": "type:5f1af2a4d17fe1cfc728",
    "required": true,
    "description": "Daily values (several entries of the same day add up)"
  },
  {
    "name": "range",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "number | readonly [CalendarDate, CalendarDate] | undefined",
    "typeRef": "type:4b12d2b81062a2b776c5",
    "required": false,
    "description": "Days shown: a year (`2026`) or an inclusive `[start, end]` range"
  },
  {
    "name": "layout",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "enum",
    "values": [
      "months",
      "weeks"
    ],
    "typeText": "\"weeks\" | \"months\" | undefined",
    "typeRef": "type:b873a466717fc9913cac",
    "default": "weeks",
    "required": false,
    "description": "`weeks`: a column per week and a row per weekday (one strip per year when the range spans several years); `months`: a small calendar per month"
  },
  {
    "name": "weekStart",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "First day of the week, 0 = Sunday … 6 = Saturday"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "BCP 47 locale of the month and weekday names, of the tooltip dates, of the default `weekStart` and of the built-in texts"
  },
  {
    "name": "color",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Color of the highest level (lower levels are lighter)"
  },
  {
    "name": "colors",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the levels, lowest first (replaces `color` and sets the number of levels)"
  },
  {
    "name": "levels",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 4,
    "required": false,
    "description": "Number of color levels above the empty days"
  },
  {
    "name": "thresholds",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Upper bounds of the levels but the last, ascending (`[2, 5, 10]`: 1-2, 3-5, 6-10, more); an even split of the largest value by default"
  },
  {
    "name": "gap",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 3,
    "required": false,
    "description": "Gap between the cells, in pixels"
  },
  {
    "name": "radius",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 2,
    "required": false,
    "description": "Corner radius of the cells, in pixels"
  },
  {
    "name": "maxCellSize",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Largest cell size, in pixels (cells shrink to fit the width)"
  },
  {
    "name": "monthLabels",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Month names (and years) around the cells"
  },
  {
    "name": "weekdayLabels",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Weekday names beside (weeks) or above (months) the cells"
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
  "CalendarHeatmapProps": {
    "source": "charts/src/react/shapes.tsx",
    "description": "Props of CalendarHeatmap",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "data",
        "type": "readonly CalendarDatum[]",
        "required": true,
        "description": "Daily values (several entries of the same day add up)"
      },
      {
        "name": "range",
        "type": "number | readonly [CalendarDate, CalendarDate]",
        "required": false,
        "default": "the 53 weeks ending on the last day of the data",
        "description": "Days shown: a year (`2026`) or an inclusive `[start, end]` range"
      },
      {
        "name": "layout",
        "type": "\"weeks\" | \"months\"",
        "required": false,
        "default": "\"weeks\"",
        "description": "`weeks`: a column per week and a row per weekday (one strip per year when the range spans several years); `months`: a small calendar per month"
      },
      {
        "name": "weekStart",
        "type": "number",
        "required": false,
        "default": "from `locale`",
        "description": "First day of the week, 0 = Sunday … 6 = Saturday"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "default": "the page language (`<html lang>`), else the browser language",
        "description": "BCP 47 locale of the month and weekday names, of the tooltip dates, of the default `weekStart` and of the built-in texts"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "default": "the first palette color",
        "description": "Color of the highest level (lower levels are lighter)"
      },
      {
        "name": "colors",
        "type": "readonly string[]",
        "required": false,
        "description": "Colors of the levels, lowest first (replaces `color` and sets the number of levels)"
      },
      {
        "name": "levels",
        "type": "number",
        "required": false,
        "default": "4",
        "description": "Number of color levels above the empty days"
      },
      {
        "name": "thresholds",
        "type": "readonly number[]",
        "required": false,
        "description": "Upper bounds of the levels but the last, ascending (`[2, 5, 10]`: 1-2, 3-5, 6-10, more); an even split of the largest value by default"
      },
      {
        "name": "gap",
        "type": "number",
        "required": false,
        "default": "3",
        "description": "Gap between the cells, in pixels"
      },
      {
        "name": "radius",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "Corner radius of the cells, in pixels"
      },
      {
        "name": "maxCellSize",
        "type": "number",
        "required": false,
        "default": "16 (weeks), 28 (months)",
        "description": "Largest cell size, in pixels (cells shrink to fit the width)"
      },
      {
        "name": "monthLabels",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Month names (and years) around the cells"
      },
      {
        "name": "weekdayLabels",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Weekday names beside (weeks) or above (months) the cells"
      }
    ]
  },
  "CalendarDatum": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "Value of a day of a calendar heatmap",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "date",
        "type": "CalendarDate",
        "required": true,
        "description": "Day of the value (several entries of the same day add up)"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Value of the day (negative values count as 0)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 一年的贡献

不设置 range 时，图表显示截止到数据最后一天的 53 周。color 设置最高等级的颜色（较低等级更浅，在浅色和深色主题下都适用）；onClick 返回所点击的日期，name 为格式化后的日期，date 为 YYYY-MM-DD 格式。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/calendar-heatmap/demos/contributions.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CalendarHeatmap,
  type CalendarDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 24 * 60 * 60 * 1000;
const iso = (time: number) => new Date(time).toISOString().slice(0, 10);

// A developer's commits over the last year: busy weekdays, quiet weekends,
// a two-week holiday and a few release crunches
const random = mulberry32(7);
const END = Date.UTC(2026, 9, 24);
const COMMITS: CalendarDatum[] = [];
for (let i = 364; i >= 0; i--) {
  const time = END - i * DAY;
  const weekday = new Date(time).getUTCDay();
  const weekend = weekday === 0 || weekday === 6;
  const holiday = i > 290 && i < 305;
  const crunch = i % 61 < 6;
  const chance = holiday ? 0.05 : weekend ? 0.2 : 0.82;
  if (random() < chance)
    COMMITS.push({
      date: iso(time),
      value: Math.max(
        1,
        Math.round(random() * (weekend ? 4 : 9) * (crunch ? 2.2 : 1)),
      ),
    });
}

export default function ContributionsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const total = useMemo(() => COMMITS.reduce((sum, d) => sum + d.value, 0), []);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <p style={{ margin: 0 }}>{t("commitsTotal", { total })}</p>
      <CalendarHeatmap
        data={COMMITS}
        locale={i18n.language}
        color="#2da44e"
        onClick={setSelected}
        ariaLabel={t("commitsAria")}
      />
      <p role="status" style={{ margin: 0 }}>
        {selected
          ? t("commitsDay", { date: selected.name, value: selected.value })
          : t("commitsHint")}
      </p>
    </div>
  );
}

```

## Example: 筛选级别

每日用电量，使用四种自定义颜色和阈值。hidden 让图例变为受控：onToggle 返回需要保存的 hiddenIndexes，因此按钮也能隐藏级别，读数汇总仍显示的天数。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/calendar-heatmap/demos/energy.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { CalendarHeatmap, type CalendarDatum } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 24 * 60 * 60 * 1000;
// kWh: up to 8, 8-14, 14-20, more than 20
const THRESHOLDS = [8, 14, 20];
const COLORS = [
  "var(--success-color)",
  "var(--primary-color)",
  "var(--warning-color)",
  "var(--danger-color)",
];

// Electricity used by a home each day of 2025 (kWh): heating in winter, air
// conditioning in the summer heat waves, more at weekends
const random = mulberry32(55);
const START = Date.UTC(2025, 0, 1);
const USAGE: CalendarDatum[] = Array.from({ length: 365 }, (_, i) => {
  const time = START + i * DAY;
  const weekday = new Date(time).getUTCDay();
  const winter = 9 * Math.max(0, Math.cos((2 * Math.PI * (i - 15)) / 365));
  const heatWave = (i > 180 && i < 196) || (i > 216 && i < 226) ? 9 : 0;
  const weekend = weekday === 0 || weekday === 6 ? 2.5 : 0;
  const value = 5 + winter + heatWave + weekend + random() * 4;
  return {
    date: new Date(time).toISOString().slice(0, 10),
    value: Math.round(value * 10) / 10,
  };
});

/** Level of a value, as the chart computes it from THRESHOLDS */
const levelOf = (value: number) => {
  const k = THRESHOLDS.findIndex((bound) => value <= bound);
  return k < 0 ? THRESHOLDS.length : k;
};

export default function EnergyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const locale = i18n.language;
  // controlled legend: the hidden levels live in the state
  const [hidden, setHidden] = useState<number[]>([]);

  const kwh = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) => t("kwh", { value: format.format(value) });
  }, [locale, t]);
  const visible = useMemo(
    () => USAGE.filter((d) => !hidden.includes(levelOf(d.value))),
    [hidden],
  );
  const used = visible.reduce((sum, d) => sum + d.value, 0);
  const total = USAGE.reduce((sum, d) => sum + d.value, 0);
  const number = new Intl.NumberFormat(locale);
  const percent = new Intl.NumberFormat(locale, { style: "percent" });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Button
          size="small"
          variant="outline"
          onClick={() => setHidden([0, 1])}
        >
          {t("highUseOnly")}
        </Button>
        <Button
          size="small"
          variant="ghost"
          disabled={!hidden.length}
          onClick={() => setHidden([])}
        >
          {t("showAll")}
        </Button>
      </div>
      <CalendarHeatmap
        data={USAGE}
        range={2025}
        colors={COLORS}
        thresholds={THRESHOLDS}
        format={kwh}
        locale={locale}
        legend={{ position: "top" }}
        hidden={hidden}
        onToggle={(event) => setHidden(event.hiddenIndexes)}
        ariaLabel={t("energyAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("visibleDays", {
          days: number.format(visible.length),
          value: kwh(used),
          share: percent.format(used / total),
        })}
      </output>
    </div>
  );
}

```

## Example: 点击记录一天

使用 layout="months" 和单一级别（levels={1}）的锻炼日志：onClick 提供被点击日期，将其加入或移出为 data 提供数据的状态。连续天数和读数随之更新。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/calendar-heatmap/demos/habit-toggle.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  CalendarHeatmap,
  type CalendarDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 24 * 60 * 60 * 1000;
const FIRST = Date.UTC(2026, 7, 1);
const LAST = Date.UTC(2026, 9, 31);
const iso = (time: number) => new Date(time).toISOString().slice(0, 10);
const ALL_DAYS: string[] = [];
for (let time = FIRST; time <= LAST; time += DAY) ALL_DAYS.push(iso(time));

// days a workout was logged since August, before any click
const INITIAL = (() => {
  const random = mulberry32(31);
  return ALL_DAYS.filter(() => random() < 0.6);
})();

/** Days in a row up to the last day */
const currentStreak = (done: ReadonlySet<string>) => {
  let run = 0;
  for (let i = ALL_DAYS.length - 1; i >= 0 && done.has(ALL_DAYS[i] ?? ""); i--)
    run++;
  return run;
};

export default function HabitToggleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const locale = i18n.language;
  const [done, setDone] = useState<ReadonlySet<string>>(() => new Set(INITIAL));
  const [last, setLast] = useState<{ name: string; done: boolean } | null>(
    null,
  );

  // the chart only draws the data it gets: a click updates the state
  const data = useMemo(
    (): CalendarDatum[] => [...done].map((date) => ({ date, value: 1 })),
    [done],
  );
  const toggle = (event: ShapeHoverEvent) => {
    const date = event.date;
    if (!date) return;
    const next = new Set(done);
    const nowDone = !next.has(date);
    if (nowDone) next.add(date);
    else next.delete(date);
    setDone(next);
    setLast({ name: event.name, done: nowDone });
  };
  const number = new Intl.NumberFormat(locale);
  const percent = new Intl.NumberFormat(locale, { style: "percent" });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span>
          {t("habitSummary", {
            done: number.format(done.size),
            share: percent.format(done.size / ALL_DAYS.length),
            streak: number.format(currentStreak(done)),
          })}
        </span>
        <Button
          size="small"
          variant="ghost"
          onClick={() => {
            setDone(new Set(INITIAL));
            setLast(null);
          }}
        >
          {t("reset")}
        </Button>
      </div>
      <CalendarHeatmap
        data={data}
        range={[iso(FIRST), iso(LAST)]}
        layout="months"
        levels={1}
        color="var(--success-color)"
        legend={false}
        format={(value) => (value ? t("workoutDone") : t("workoutMissed"))}
        locale={locale}
        onClick={toggle}
        height={280}
        ariaLabel={t("habitAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {last
          ? last.done
            ? t("markedDone", { date: last.name })
            : t("markedMissed", { date: last.name })
          : t("habitHint")}
      </output>
    </div>
  );
}

```

## Example: 选择年份与悬停

同一份三年的生产事故数据：RadioGroup 只改变 range，从而选择要绘制的年份。onHover 在图表下方报告悬停的日期（指针离开时为 null），尚未到来的日期显示单独的提示。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/calendar-heatmap/demos/incidents.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  CalendarHeatmap,
  type CalendarDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 24 * 60 * 60 * 1000;
const YEARS = [2024, 2025, 2026] as const;
const LAST_DAY = "2026-10-31";
type Year = (typeof YEARS)[number];

// Production incidents per day, from 2024 to Oct 31, 2026: fewer every year
// as the on-call team automates, with bad weeks after big releases
const random = mulberry32(404);
const INCIDENTS: CalendarDatum[] = [];
for (
  let time = Date.UTC(2024, 0, 1);
  time <= Date.UTC(2026, 9, 31);
  time += DAY
) {
  const year = new Date(time).getUTCFullYear();
  const rate = year === 2024 ? 0.55 : year === 2025 ? 0.35 : 0.2;
  const dayOfYear = Math.floor((time - Date.UTC(year, 0, 1)) / DAY);
  const release = dayOfYear % 91 < 5 ? 3 : 1;
  let n = 0;
  while (random() < rate * release * 0.6 && n < 8) n++;
  if (n)
    INCIDENTS.push({
      date: new Date(time).toISOString().slice(0, 10),
      value: n,
    });
}

export default function IncidentsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const locale = i18n.language;
  const [year, setYear] = useState<Year>(2026);
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const yearName = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { useGrouping: false });
    return (value: number) => format.format(value);
  }, [locale]);
  const days = useMemo(
    () => INCIDENTS.filter((d) => String(d.date).startsWith(`${year}-`)),
    [year],
  );
  const total = days.reduce((sum, d) => sum + d.value, 0);
  const quiet = (year === 2026 ? 304 : year === 2024 ? 366 : 365) - days.length;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadioGroup
        aria-label={t("year")}
        direction="horizontal"
        value={String(year)}
        onChange={(value) => {
          setYear(Number(value) as Year);
          setHovered(null);
        }}
      >
        {YEARS.map((y) => (
          <Radio key={y} value={String(y)} label={yearName(y)} />
        ))}
      </RadioGroup>
      <p style={{ margin: 0 }}>
        {t("incidentsYear", {
          year: yearName(year),
          total: number.format(total),
          quiet: number.format(quiet),
        })}
      </p>
      <CalendarHeatmap
        data={INCIDENTS}
        // the range picks the year shown out of the same data
        range={year}
        thresholds={[1, 2, 4]}
        color="var(--danger-color)"
        format={(value) => t("incidentsN", { value: number.format(value) })}
        locale={locale}
        onHover={setHovered}
        ariaLabel={t("incidentsAria", { year: yearName(year) })}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {hovered
          ? (hovered.date ?? "") > LAST_DAY
            ? t("futureDay", { date: hovered.name })
            : hovered.value
              ? t("incidentsDay", {
                  date: hovered.name,
                  value: number.format(hovered.value),
                })
              : t("quietDay", { date: hovered.name })
          : t("hoverDay")}
      </output>
    </div>
  );
}

```

## Example: 语言区域

locale 会翻译月份和星期名称以及提示框中的日期，并决定每周第一天（美国和日本为周日，法国和德国为周一，埃及为周六）。maxCellSize 让格子在宽屏上也保持较小。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/calendar-heatmap/demos/locale.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { CalendarHeatmap, type CalendarDatum } from "minerva-design/charts";

const DAY = 24 * 60 * 60 * 1000;

// Deploys of a team during the first half of 2026 (none on weekends)
const DEPLOYS: CalendarDatum[] = [];
for (
  let time = Date.UTC(2026, 0, 1);
  time <= Date.UTC(2026, 5, 30);
  time += DAY
) {
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) continue;
  const day = date.getUTCDate();
  DEPLOYS.push({
    date: date.toISOString().slice(0, 10),
    value: (day * 7 + weekday * 3) % 9,
  });
}

const LOCALES = ["en-US", "fr-FR", "de-DE", "ja-JP", "zh-CN", "ar-EG"];

export default function LocaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const [locale, setLocale] = useState("en-US");

  // locale names in the reader's language
  const names = useMemo(
    () => new Intl.DisplayNames([i18n.language], { type: "language" }),
    [i18n.language],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("localeLabel")}
        direction="horizontal"
        value={locale}
        onChange={(value) => setLocale(String(value))}
      >
        {LOCALES.map((tag) => (
          <Radio key={tag} value={tag} label={names.of(tag) ?? tag} />
        ))}
      </RadioGroup>
      <CalendarHeatmap
        data={DEPLOYS}
        range={["2026-01-01", "2026-06-30"]}
        locale={locale}
        color="#0ea5e9"
        maxCellSize={20}
        legend={false}
        ariaLabel={t("deploysAria")}
      />
    </div>
  );
}

```

## Example: 月历

layout="months" 为每个月绘制一个小日历，并选择能让格子最大的网格排布。weekStart 会覆盖 locale 决定的每周第一天；没有订单的日子（每周一店休）保持为空。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/calendar-heatmap/demos/months.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { CalendarHeatmap, type CalendarDatum } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 24 * 60 * 60 * 1000;

// Orders of a bakery's online shop in 2026: busier weekends and holidays
const random = mulberry32(11);
const ORDERS: CalendarDatum[] = [];
for (
  let time = Date.UTC(2026, 0, 1);
  time <= Date.UTC(2026, 11, 31);
  time += DAY
) {
  const date = new Date(time);
  const weekday = date.getUTCDay();
  const month = date.getUTCMonth();
  const weekend = weekday === 0 || weekday === 6;
  const closed = weekday === 1;
  const festive = month === 11 || (month === 1 && date.getUTCDate() <= 14);
  if (closed) continue;
  ORDERS.push({
    date: date.toISOString().slice(0, 10),
    value: Math.round(
      (12 + random() * 18) * (weekend ? 1.8 : 1) * (festive ? 1.6 : 1),
    ),
  });
}

type Start = "locale" | "0" | "1" | "6";
const STARTS: Start[] = ["locale", "0", "1", "6"];

export default function MonthsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const [start, setStart] = useState<Start>("locale");
  const locale = i18n.language;

  // the reader's names of Sunday, Monday and Saturday (2026-03-01 is a Sunday)
  const names = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, {
      weekday: "long",
      timeZone: "UTC",
    });
    return (day: number) => format.format(Date.UTC(2026, 2, 1 + day));
  }, [locale]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("weekStartLabel")}
        direction="horizontal"
        value={start}
        onChange={(value) => setStart(value as Start)}
      >
        {STARTS.map((value) => (
          <Radio
            key={value}
            value={value}
            label={value === "locale" ? t("fromLocale") : names(Number(value))}
          />
        ))}
      </RadioGroup>
      <CalendarHeatmap
        data={ORDERS}
        range={2026}
        layout="months"
        weekStart={start === "locale" ? undefined : Number(start)}
        locale={locale}
        color="#d97706"
        levels={5}
        height={600}
        ariaLabel={t("ordersAria")}
      />
    </div>
  );
}

```

## Example: 多年数据

超过一年的范围会按年分成多条，每条旁边标注年份；默认高度会随条数增加。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/calendar-heatmap/demos/multi-year.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CalendarHeatmap, type CalendarDatum } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 24 * 60 * 60 * 1000;

// Three years of running, in km per day: long runs on Sundays, more running
// in spring and autumn, a winter break and a marathon block in 2025
const random = mulberry32(42);
const RUNS: CalendarDatum[] = [];
for (
  let time = Date.UTC(2024, 0, 1);
  time <= Date.UTC(2026, 11, 31);
  time += DAY
) {
  const date = new Date(time);
  const month = date.getUTCMonth();
  const sunday = date.getUTCDay() === 0;
  const season =
    month === 0 || month === 11 ? 0.25 : month >= 6 && month <= 7 ? 0.5 : 0.65;
  const marathon = date.getUTCFullYear() === 2025 && month >= 7 && month <= 9;
  if (random() < season + (marathon ? 0.2 : 0))
    RUNS.push({
      date: date.toISOString().slice(0, 10),
      value:
        Math.round(
          (sunday ? 14 + random() * 14 : 4 + random() * 8) *
            (marathon ? 1.3 : 1) *
            10,
        ) / 10,
    });
}

const TOTALS = RUNS.reduce<Record<string, number>>((totals, run) => {
  const year = String(run.date).slice(0, 4);
  totals[year] = (totals[year] ?? 0) + run.value;
  return totals;
}, {});

export default function MultiYearDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const locale = i18n.language;
  const number = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
    [locale],
  );
  const format = useMemo(
    () => (value: number) => t("km", { value: number.format(value) }),
    [number, t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <CalendarHeatmap
        data={RUNS}
        range={["2024-01-01", "2026-12-31"]}
        thresholds={[6, 10, 16]}
        color="#f97316"
        format={format}
        locale={locale}
        ariaLabel={t("runsAria")}
      />
      <p style={{ margin: 0 }}>
        {Object.entries(TOTALS)
          .map(([year, km]) => t("runsYear", { year, value: format(km) }))
          .join(" · ")}
      </p>
    </div>
  );
}

```

## Example: 自定义提示框

用 [start, end] 范围显示六个月的睡眠。renderTooltip 在 name 中收到格式化后的日期，在 value 中收到时长，并与八小时目标比较；没有数据的夜晚显示单独的提示。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/calendar-heatmap/demos/sleep.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  CalendarHeatmap,
  type CalendarDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 24 * 60 * 60 * 1000;
const GOAL = 8; // hours
const FIRST = "2026-05-01";
const LAST = "2026-10-31";

// Hours of sleep recorded by a watch each night: shorter on weeknights,
// catching up at weekends, a few nights without the watch
const random = mulberry32(88);
const START = Date.UTC(2026, 4, 1);
const NIGHTS: CalendarDatum[] = [];
for (let i = 0; i < 184; i++) {
  const time = START + i * DAY;
  const weekday = new Date(time).getUTCDay();
  if (random() < 0.06) continue;
  const weekend = weekday === 0 || weekday === 6;
  const hours = (weekend ? 8.2 : 6.9) + (random() - 0.5) * 1.8;
  NIGHTS.push({
    date: new Date(time).toISOString().slice(0, 10),
    value: Math.round(hours * 4) / 4,
  });
}

export default function SleepDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const locale = i18n.language;

  const hours = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "hour",
      unitDisplay: "short",
      maximumFractionDigits: 2,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const signedHours = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "hour",
      unitDisplay: "short",
      maximumFractionDigits: 2,
      signDisplay: "exceptZero",
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const average = NIGHTS.reduce((sum, d) => sum + d.value, 0) / NIGHTS.length;
  const reached = NIGHTS.filter((d) => d.value >= GOAL).length;

  // the date in `name` is already formatted in the locale; value is the
  // total of the day (0 for the nights without data)
  const tooltip = (event: ShapeHoverEvent) => {
    if (!event.value) {
      return (
        <div style={{ display: "grid", gap: 2 }}>
          <strong>{event.name}</strong>
          <span>{t("noRecord")}</span>
        </div>
      );
    }
    const delta = event.value - GOAL;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{event.name}</strong>
        <span>{hours(event.value)}</span>
        <span
          style={{
            color: delta >= 0 ? "var(--success-color)" : "var(--danger-color)",
          }}
        >
          {t("vsGoal", { value: signedHours(delta), goal: hours(GOAL) })}
        </span>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("sleepSummary", {
          average: hours(Math.round(average * 10) / 10),
          reached: new Intl.NumberFormat(locale).format(reached),
          nights: new Intl.NumberFormat(locale).format(NIGHTS.length),
          goal: hours(GOAL),
        })}
      </output>
      <CalendarHeatmap
        data={NIGHTS}
        range={[FIRST, LAST]}
        // under 6 h, 6-7 h, 7-8 h, 8 h or more
        thresholds={[6, 7, 7.75]}
        color="var(--chart-series-3)"
        format={hours}
        locale={locale}
        renderTooltip={tooltip}
        ariaLabel={t("sleepAria")}
      />
    </div>
  );
}

```

## Example: 学习打卡

range={2026} 显示全年，包括未来的日期。thresholds 设置各等级的上限（1–15、16–30、31–60 以及超过 60 分钟），format 决定等级名称的格式；连续天数由同一份数据计算得出。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/calendar-heatmap/demos/streak.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CalendarHeatmap,
  type CalendarDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 24 * 60 * 60 * 1000;

// Minutes spent learning a language each day of 2026, up to Oct 24: the
// habit gets stronger over the year, with a few missed days
const random = mulberry32(2026);
const START = Date.UTC(2026, 0, 1);
const DAYS = 297;
const minutes: number[] = [];
for (let i = 0; i < DAYS; i++) {
  const habit = 0.55 + (0.4 * i) / DAYS;
  minutes.push(random() < habit ? Math.round(5 + random() * (20 + i / 4)) : 0);
}
const LESSONS: CalendarDatum[] = minutes.map((value, i) => ({
  date: new Date(START + i * DAY).toISOString().slice(0, 10),
  value,
}));

/** Longest and current runs of days with some practice */
const streaks = (values: number[]) => {
  let longest = 0;
  let run = 0;
  for (const v of values) {
    run = v > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  return { longest, current: run };
};

// 1-15, 16-30, 31-60 and more than 60 minutes
const THRESHOLDS = [15, 30, 60];

export default function StreakDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap.data",
  });
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const { longest, current } = useMemo(() => streaks(minutes), []);
  const format = useMemo(() => (value: number) => t("minutes", { value }), [t]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <p style={{ margin: 0 }}>{t("streaks", { current, longest })}</p>
      <CalendarHeatmap
        data={LESSONS}
        range={2026}
        thresholds={THRESHOLDS}
        color="#8b5cf6"
        format={format}
        locale={i18n.language}
        legend={{ position: "top" }}
        onClick={setSelected}
        ariaLabel={t("lessonsAria")}
      />
      <p role="status" style={{ margin: 0 }}>
        {selected
          ? selected.value > 0
            ? t("lessonDay", {
                date: selected.name,
                value: format(selected.value),
              })
            : t("missedDay", { date: selected.name })
          : t("lessonsHint")}
      </p>
    </div>
  );
}

```
