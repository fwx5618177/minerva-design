# 日历热力图

在日历上展示每日数值，类似贡献图：代码提交、学习打卡、运动、订单等。每天是一个按等级着色的格子；月份和星期名称、提示框中的日期以及每周第一天都遵循 locale。图例可隐藏 / 显示某个等级；方向键可按天和按周移动，提示框会显示日期。

Package: minerva-design@1.22.0

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
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
    "name": "animation",
    "type": "boolean",
    "required": false,
    "description": "Entry and update animations, skipped when the user prefers reduced motion (default `true`)",
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
    "name": "legend",
    "type": "boolean | ShapeLegendOptions",
    "required": false,
    "description": "Legend; clicking an item hides / shows its slice, stage or series (shown by default for pie, donut, funnel and multi-series radar charts)",
    "typeText": "boolean | ShapeLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | ShapeTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it (default `true`)",
    "typeText": "boolean | ShapeTooltipOptions"
  },
  {
    "name": "monthLabels",
    "type": "boolean",
    "required": false,
    "description": "Month names (and years) around the cells (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "weekdayLabels",
    "type": "boolean",
    "required": false,
    "description": "Weekday names beside (weeks) or above (months) the cells (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "color",
    "type": "string",
    "required": false,
    "description": "Color of the highest level (lower levels are lighter; default: the first palette color)",
    "typeText": "string"
  },
  {
    "name": "layout",
    "type": "\"weeks\" | \"months\"",
    "required": false,
    "description": "`weeks`: a column per week and a row per weekday; `months`: a small calendar per month (default `weeks`)",
    "typeText": "\"weeks\" | \"months\""
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the shapes: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software; text is always drawn with Canvas2D (default `auto`, see `setDefaultChartRenderer`)",
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
    "name": "padding",
    "type": "ChartPadding",
    "required": false,
    "description": "Space around the drawing, in pixels (default 8 on every side)",
    "typeText": "ChartPadding"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart (default: the chart type, e.g. \"Donut chart\")",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip rows, accessible names, compact numbers); the page language by default",
    "typeText": "string"
  },
  {
    "name": "range",
    "type": "number | readonly [CalendarDate, CalendarDate]",
    "required": false,
    "description": "Days shown: a year (`2026`) or an inclusive `[start, end]` range (default: the 53 weeks ending on the last day of the data)",
    "typeText": "number | readonly [CalendarDate, CalendarDate]"
  },
  {
    "name": "hidden",
    "type": "readonly number[]",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap nodes, by\nindex. Makes the visibility controlled: legend clicks then only emit\n`toggle`, whose `hiddenIndexes` should be stored and passed back.",
    "typeText": "readonly number[]"
  },
  {
    "name": "texts",
    "type": "Partial<ShapeChartLabels>",
    "required": false,
    "description": "Replaces built-in texts of the `locale` (tooltip rows, accessible names, \"No data\")",
    "typeText": "Partial<ShapeChartLabels>"
  },
  {
    "name": "data",
    "type": "readonly CalendarDatum[]",
    "required": true,
    "description": "Daily values (several entries of the same day add up)",
    "typeText": "readonly CalendarDatum[]"
  },
  {
    "name": "format",
    "type": "((value: number) => string)",
    "required": false,
    "description": "Formats the values of the labels and the tooltip (default: compact numbers, 1.2k, 3.4M)",
    "typeText": "((value: number) => string)"
  },
  {
    "name": "percentFormat",
    "type": "((share: number) => string)",
    "required": false,
    "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1 (default: one decimal, \"40.0%\")",
    "typeText": "((share: number) => string)"
  },
  {
    "name": "weekStart",
    "type": "number",
    "required": false,
    "description": "First day of the week, 0 = Sunday … 6 = Saturday (default: from `locale`)",
    "typeText": "number"
  },
  {
    "name": "levels",
    "type": "number",
    "required": false,
    "description": "Number of color levels above the empty days (default 4)",
    "typeText": "number"
  },
  {
    "name": "gap",
    "type": "number",
    "required": false,
    "description": "Gap between the cells, in pixels (default 3)",
    "typeText": "number"
  },
  {
    "name": "radius",
    "type": "number",
    "required": false,
    "description": "Corner radius of the cells, in pixels (default 2)",
    "typeText": "number"
  },
  {
    "name": "maxCellSize",
    "type": "number",
    "required": false,
    "description": "Largest cell size, in pixels (default 16 weeks, 28 months)",
    "typeText": "number"
  },
  {
    "name": "colors",
    "type": "readonly string[]",
    "required": false,
    "description": "Colors of the levels, lowest first (replaces `color` and sets the number of levels)",
    "typeText": "readonly string[]"
  },
  {
    "name": "thresholds",
    "type": "readonly number[]",
    "required": false,
    "description": "Upper bounds of the levels but the last, ascending; an even split of the largest value by default",
    "typeText": "readonly number[]"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[event: ShapeHoverEvent | null]",
    "typeText": "[event: ShapeHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "click",
    "type": "[event: ShapeHoverEvent]",
    "typeText": "[event: ShapeHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "toggle",
    "type": "[event: ShapeToggleEvent]",
    "typeText": "[event: ShapeToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: contributions

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/calendar-heatmap/vue/contributions.vue

```vue
<script setup lang="ts">
// A year of daily values, contributions-style: the month and weekday names
// and the first day of the week follow `locale` (the page language here).
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { CalendarHeatmap } from "minerva-design/vue/charts";

const TEXT = {
  en: { locale: "en-US", unit: "contributions" },
  zh: { locale: "zh-CN", unit: "次贡献" },
  ja: { locale: "ja-JP", unit: "件のコントリビューション" },
  fr: { locale: "fr-FR", unit: "contributions" },
};

// one value per day of 2025: busier on weekdays, deterministic
const fraction = (value: number) => value - Math.floor(value);
const DAYS = Array.from({ length: 365 }, (_, i) => ({
  date: Date.UTC(2025, 0, 1 + i),
  value: Math.floor(
    fraction(Math.sin(i * 12.9898) * 43758.5453) * (i % 7 < 5 ? 9 : 3),
  ),
}));

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const format = (value: number) => `${value} ${text.value.unit}`;
</script>

<template>
  <CalendarHeatmap
    :data="DAYS"
    :range="2025"
    :locale="text.locale"
    :format="format"
  />
</template>

```

## Example: months

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/calendar-heatmap/vue/months.vue

```vue
<script setup lang="ts">
// `layout="months"`: a small calendar per month; `levels` sets the number
// of color steps above the empty days, `thresholds` their bounds.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { CalendarHeatmap } from "minerva-design/vue/charts";

const TEXT = {
  en: { locale: "en-US" },
  zh: { locale: "zh-CN" },
  ja: { locale: "ja-JP" },
  fr: { locale: "fr-FR" },
};

// steps walked every day of the first half of 2026, deterministic
const fraction = (value: number) => value - Math.floor(value);
const STEPS = Array.from({ length: 181 }, (_, i) => ({
  date: Date.UTC(2026, 0, 1 + i),
  value: Math.round(3000 + fraction(Math.sin(i * 78.233) * 43758.5453) * 9000),
}));

const { language } = useI18n();
const locale = computed(() => (TEXT[language.value] ?? TEXT.en).locale);
</script>

<template>
  <CalendarHeatmap
    :data="STEPS"
    :range="['2026-01-01', '2026-06-30']"
    layout="months"
    :levels="5"
    :thresholds="[4000, 6000, 8000, 10000]"
    color="var(--success-color, #16a34a)"
    :locale="locale"
    :height="420"
  />
</template>

```
