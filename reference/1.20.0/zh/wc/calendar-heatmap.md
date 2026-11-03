# 日历热力图

在日历上展示每日数值，类似贡献图：代码提交、学习打卡、运动、订单等。每天是一个按等级着色的格子；月份和星期名称、提示框中的日期以及每周第一天都遵循 locale。图例可隐藏 / 显示某个等级；方向键可按天和按周移动，提示框会显示日期。

Package: minerva-design@1.20.0

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

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
  "specifier": "minerva-design/web-components/calendar-heatmap",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "layout",
    "typeText": "\"weeks\" | \"months\"",
    "attribute": "layout",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "attribute": "locale",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "attribute": "color",
    "required": false
  },
  {
    "name": "levels",
    "typeText": "number",
    "attribute": "levels",
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
    "typeText": "readonly CalendarDatum[] | undefined",
    "required": false
  },
  {
    "name": "range",
    "typeText": "number | readonly [CalendarDate, CalendarDate] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<CalendarHeatmapOptions, \"type\">> | undefined",
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

## Example: 一年的贡献

2025 年每天一个数值；月份和星期名称跟随页面语言的 locale。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/calendar-heatmap/wc/contributions.html

```html
<minerva-calendar-heatmap id="contributions"></minerva-calendar-heatmap>

```

### apps/docs/src/docs/pages/calendar-heatmap/wc/contributions.ts

```tsx
// A year of daily values, contributions-style: the month and weekday names
// and the first day of the week follow `locale` (the page language here).
import type { MinervaCalendarHeatmap } from "minerva-design/web-components/chart";

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaCalendarHeatmap>("#contributions")!;
  chart.data = DAYS;
  chart.range = 2025;
  chart.locale = text.locale;
  chart.options = { format: (value) => `${value} ${text.unit}` };
}

```

## Example: 按月日历

每月一个小日历，五个颜色等级并设置明确的阈值（每日步数）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/calendar-heatmap/wc/months.html

```html
<minerva-calendar-heatmap
  id="steps"
  layout="months"
  levels="5"
  height="420"
></minerva-calendar-heatmap>

```

### apps/docs/src/docs/pages/calendar-heatmap/wc/months.ts

```tsx
// `layout="months"`: a small calendar per month; `levels` sets the number
// of color steps above the empty days, `thresholds` their bounds.
import type { MinervaCalendarHeatmap } from "minerva-design/web-components/chart";

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaCalendarHeatmap>("#steps")!;
  chart.data = STEPS;
  chart.range = ["2026-01-01", "2026-06-30"];
  chart.locale = text.locale;
  chart.options = {
    thresholds: [4000, 6000, 8000, 10000],
    color: "var(--success-color, #16a34a)",
  };
}

```
