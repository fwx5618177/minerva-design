# 日历热力图

在日历上展示每日数值，类似贡献图：代码提交、学习打卡、运动、订单等。每天是一个按等级着色的格子；月份和星期名称、提示框中的日期以及每周第一天都遵循 locale。图例可隐藏 / 显示某个等级；方向键可按天和按周移动，提示框会显示日期。

Package: minerva-design@1.20.3

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

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

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly CalendarDatum[]",
    "typeRef": "type:5f1af2a4d17fe1cfc728",
    "required": true,
    "description": "Daily values (several entries of the same day add up)"
  },
  {
    "name": "range",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "number | readonly [CalendarDate, CalendarDate] | undefined",
    "typeRef": "type:4b12d2b81062a2b776c5",
    "required": false,
    "description": "Days shown: a year (`2026`) or an inclusive `[start, end]` range"
  },
  {
    "name": "layout",
    "source": "packages/native/src/components/ShapeChart/types.ts",
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
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "First day of the week, 0 = Sunday … 6 = Saturday"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "BCP 47 locale of the month and weekday names, of the tooltip dates and of the default `weekStart`"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Color of the highest level (lower levels are lighter)"
  },
  {
    "name": "colors",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the levels, lowest first (replaces `color` and sets the number of levels)"
  },
  {
    "name": "levels",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 4,
    "required": false,
    "description": "Number of color levels above the empty days"
  },
  {
    "name": "thresholds",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Upper bounds of the levels but the last, ascending (`[2, 5, 10]`: 1-2, 3-5, 6-10, more); an even split of the largest value by default"
  },
  {
    "name": "gap",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 3,
    "required": false,
    "description": "Gap between the cells, in pixels"
  },
  {
    "name": "radius",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 2,
    "required": false,
    "description": "Corner radius of the cells, in pixels"
  },
  {
    "name": "maxCellSize",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Largest cell size, in pixels (cells shrink to fit the width)"
  },
  {
    "name": "monthLabels",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Month names (and years) around the cells"
  },
  {
    "name": "weekdayLabels",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Weekday names beside (weeks) or above (months) the cells"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
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
    "typeRef": "type:9b11f9b3b1a7e709603e",
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
  "native:CalendarHeatmapProps": {
    "source": "native/src/components/ShapeChart/types.ts",
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
        "default": "the runtime's default locale",
        "description": "BCP 47 locale of the month and weekday names, of the tooltip dates and of the default `weekStart`"
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
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/calendar-heatmap/native/basic.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  CalendarHeatmap,
  useTheme,
  type CalendarDatum,
  type ShapeHoverEvent,
} from "minerva-design/native";

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

// A developer's commits over the last four months (a phone fits ~17 weeks):
// busy weekdays, quiet weekends and a release crunch every few weeks
const END = Date.UTC(2026, 9, 24);
const START = END - 118 * DAY;
const random = mulberry32(7);
const COMMITS: CalendarDatum[] = [];
for (let time = START; time <= END; time += DAY) {
  const weekday = new Date(time).getUTCDay();
  const weekend = weekday === 0 || weekday === 6;
  const crunch = ((time - START) / DAY) % 40 < 5;
  if (random() < (weekend ? 0.2 : 0.82))
    COMMITS.push({
      date: iso(time),
      value: Math.max(
        1,
        Math.round(random() * (weekend ? 4 : 9) * (crunch ? 2.2 : 1)),
      ),
    });
}
const RANGE = [iso(START), iso(END)] as const;

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap",
  });
  const { colors } = useTheme();
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const total = useMemo(() => COMMITS.reduce((sum, d) => sum + d.value, 0), []);
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <Text style={{ color: colors["text-color"] }}>
        {t("native.data.total", { total })}
      </Text>
      <CalendarHeatmap
        data={COMMITS}
        range={RANGE}
        locale={i18n.language}
        color="#2da44e"
        onClick={setSelected}
        ariaLabel={t("data.commitsAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {selected
          ? t("data.commitsDay", {
              date: selected.name,
              value: selected.value,
            })
          : t("native.data.tapDay")}
      </Text>
    </View>
  );
}

```
