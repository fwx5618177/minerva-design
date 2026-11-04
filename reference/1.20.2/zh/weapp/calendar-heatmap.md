# 日历热力图

在日历上展示每日数值，类似贡献图：代码提交、学习打卡、运动、订单等。每天是一个按等级着色的格子；月份和星期名称、提示框中的日期以及每周第一天都遵循 locale。图例可隐藏 / 显示某个等级；方向键可按天和按周移动，提示框会显示日期。

Package: minerva-design@1.20.2

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

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

Calendar heatmap: daily values in weeks or months layouts, color levels / thresholds, month and weekday labels, locale. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/calendar-heatmap/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "hidden",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "animation",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "texts",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "data",
    "typeText": "array",
    "required": false
  },
  {
    "name": "range",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "layout",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "weekStart",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "colors",
    "typeText": "array",
    "required": false
  },
  {
    "name": "levels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "thresholds",
    "typeText": "array",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "radius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "maxCellSize",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "monthLabels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "weekdayLabels",
    "typeText": "unknown",
    "required": false,
    "default": null
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "NativeShapeHoverEvent",
    "description": "Highlighted mark after a tap (index -1 when cleared)."
  },
  {
    "name": "click",
    "typeText": "NativeShapeHoverEvent",
    "description": "A mark was tapped."
  },
  {
    "name": "toggle",
    "typeText": "{ index: number; hidden: boolean; hiddenIndexes: number[] }",
    "description": "A legend item was tapped (or toggle() called); controlled charts must publish hiddenIndexes through hidden."
  },
  {
    "name": "drill",
    "typeText": "{ path: string[] }",
    "description": "Sunburst: a parent or the center was tapped (or drill() called); controlled charts must publish path through drillPath."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
