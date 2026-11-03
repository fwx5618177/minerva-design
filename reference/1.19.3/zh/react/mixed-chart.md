# 组合图 / 双轴图

在一张图中组合柱、线和面积，可使用一个或两个数值轴：收入与增长率、降雨量与气温、帕累托图。

Package: minerva-design@1.19.3

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:c2b9c6e66069aa1acd454efc20d52cde92c1a1c820c1b3ab5302d01929cb4c39"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

{{year}} 年第 {{n}} 季度

收入

同比增长

季度收入及其同比增长

降雨量

气温

东京每月降雨量和气温

访问量

转化率

营销活动

两个月内每日访问量与转化率

退货

累计占比

尺码不合适

商品损坏

与描述不符

送达过晚

改变主意

发错商品

其他

按原因统计的退货及其累计占比

页面浏览量

中文（zh-CN）

法语（fr-FR）

每日页面浏览量与转化率，{{locale}}

营收

用户数

用户数（对数）

2016 至 2025 年的年营收与对数轴上的用户数

{{value}} kWh

光伏发电

用电量

电池电量

夜间

{{value}} 电池

两天内自给率为 {{share}}，从电网购电 {{imported}}。

每小时电量

某住宅两天内每小时的光伏发电量和用电量，以及电池电量

库存水平

到货

促销

安全库存

再订货点

点击某一天或某次到货。

{{id}}：{{ordered}} 订购 {{quantity}} 件，经过 {{lead}} 于 {{arrived}} 到货。

{{date}} 库存 {{units}} 件。

{{date}} 库存仅 {{units}} 件，低于安全库存。

件数

某商品三个月内的每日库存水平，含到货、再订货点和安全库存

请求数

错误率

发布

每 30 分钟请求数

某 Web API 一天内的请求数和错误率，以及发布记录

发布 {{version}} 后，错误率于 {{time}} 达到峰值 {{peak}}，直到回滚至 {{rollback}}。

{{value}} 点

开始

剩余工作量

已完成

理想进度

新增 {{value}}

理想：剩余 {{value}}

剩余 {{value}}

当天完成 {{value}}

落后理想进度 {{value}}

领先理想进度 {{value}}

故事点

迭代燃尽图：十个工作日内的剩余工作量、每日完成点数和理想燃尽线

剩余 {{left}}，按每天 {{velocity}} 的速度，迭代结束时约有 {{forecast}} 无法完成。

剩余 {{left}}，按每天 {{velocity}} 的速度，迭代进度正常。

## MixedChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "MixedChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly ChartSeries[]",
    "typeRef": "type:deda0bcb88251b63a5de",
    "required": true,
    "description": "Bars, lines, areas and dots, each with its `type`; `yAxis: \"right\"` plots a series against `yAxis2`"
  },
  {
    "name": "stackMode",
    "source": "packages/charts/src/react/types.ts",
    "kind": "enum",
    "values": [
      "normal",
      "percent"
    ],
    "typeText": "\"normal\" | \"percent\" | undefined",
    "typeRef": "type:2d2343824f816d71127f",
    "default": "normal",
    "required": false,
    "description": "`percent` scales every stack to 100% at each x"
  },
  {
    "name": "yAxis2",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Right value axis of the series with `yAxis: \"right\"`; its range is aligned on the left ticks (vertical charts)"
  },
  {
    "name": "orientation",
    "source": "packages/charts/src/react/types.ts",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "ChartOrientation | undefined",
    "typeRef": "type:872af3679a2d7fcf3d26",
    "default": "vertical",
    "required": false,
    "description": "`horizontal` puts the x axis (categories) down the left side and the values along the bottom"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "xAxis",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "X axis"
  },
  {
    "name": "yAxis",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Y axis"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/types.ts",
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
    "default": "auto",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "crosshair",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the pointer"
  },
  {
    "name": "annotations",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas and reference lines"
  },
  {
    "name": "interaction",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "renderTooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "node",
    "typeText": "((event: ChartHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:018692c396245c230316",
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
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:7f639ac6d9481ff0bde9",
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
    "description": "Called when the hovered (or keyboard-focused) points change"
  },
  {
    "name": "onPointClick",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent) => void) | undefined",
    "typeRef": "type:677083ee0328d7ee4253",
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
    "description": "Called when a point (or bar) is clicked"
  },
  {
    "name": "onPlotClick",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartPlotClickEvent) => void) | undefined",
    "typeRef": "type:0256cf20d9a3f1b1c88a",
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
    "description": "Called when the plot area is clicked where there is no point"
  },
  {
    "name": "onZoom",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:ee073556f18eb3ee4cae",
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
  },
  {
    "name": "onRendererChange",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((renderer: ChartRendererKind) => void) | undefined",
    "typeRef": "type:167734f7bd5dd7f686a6",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartRendererKind",
        "typeRef": "type:3439f360c8a2b0649d25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the backend once it is ready (and when it falls back after a GPU loss)"
  }
]
```

### bindings

```json
[
  {
    "prop": "renderer",
    "event": "onRendererChange",
    "syntax": "renderer={renderer} onRendererChange={handler}"
  }
]
```

## API

```json
{
  "MixedChartProps": {
    "source": "charts/src/react/types.ts",
    "description": "Props of MixedChart",
    "kind": "interface",
    "extends": [
      "ChartProps"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly ChartSeries[]",
        "required": true,
        "description": "Bars, lines, areas and dots, each with its `type`; `yAxis: \"right\"` plots a series against `yAxis2`"
      }
    ]
  },
  "ChartProps": {
    "source": "charts/src/react/types.ts",
    "description": "Props of Chart: any mix of line, area, bar, scatter, candlestick, heatmap and box plot series",
    "kind": "interface",
    "extends": [
      "ChartCommonProps"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly ChartSeries[]",
        "required": true,
        "description": "Data series; each sets its own `type`"
      },
      {
        "name": "stackMode",
        "type": "\"normal\" | \"percent\"",
        "required": false,
        "default": "\"normal\"",
        "description": "`percent` scales every stack to 100% at each x"
      },
      {
        "name": "yAxis2",
        "type": "ChartAxisOptions",
        "required": false,
        "description": "Right value axis of the series with `yAxis: \"right\"`; its range is aligned on the left ticks (vertical charts)"
      },
      {
        "name": "orientation",
        "type": "ChartOrientation",
        "required": false,
        "default": "\"vertical\"",
        "description": "`horizontal` puts the x axis (categories) down the left side and the values along the bottom"
      }
    ]
  },
  "ChartLabels": {
    "source": "charts/src/engine/types.ts",
    "description": "Texts the engine writes itself, built in for English, Chinese, Japanese and French (the language of `locale`); override any of them with `ChartOptions.labels`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "open",
        "type": "string",
        "required": true,
        "default": "\"Open\"",
        "description": "Candlestick open"
      },
      {
        "name": "high",
        "type": "string",
        "required": true,
        "default": "\"High\"",
        "description": "Candlestick high"
      },
      {
        "name": "low",
        "type": "string",
        "required": true,
        "default": "\"Low\"",
        "description": "Candlestick low"
      },
      {
        "name": "close",
        "type": "string",
        "required": true,
        "default": "\"Close\"",
        "description": "Candlestick close"
      },
      {
        "name": "max",
        "type": "string",
        "required": true,
        "default": "\"Max\"",
        "description": "Box plot upper whisker"
      },
      {
        "name": "q3",
        "type": "string",
        "required": true,
        "default": "\"Q3\"",
        "description": "Box plot third quartile"
      },
      {
        "name": "median",
        "type": "string",
        "required": true,
        "default": "\"Median\"",
        "description": "Box plot median"
      },
      {
        "name": "q1",
        "type": "string",
        "required": true,
        "default": "\"Q1\"",
        "description": "Box plot first quartile"
      },
      {
        "name": "min",
        "type": "string",
        "required": true,
        "default": "\"Min\"",
        "description": "Box plot lower whisker"
      },
      {
        "name": "outliers",
        "type": "string",
        "required": true,
        "default": "\"Outliers\"",
        "description": "Number of outliers of a box"
      },
      {
        "name": "value",
        "type": "string",
        "required": true,
        "default": "\"Value\"",
        "description": "Scatter `value` (bubbles) when the series has no `valueName`"
      },
      {
        "name": "x",
        "type": "string",
        "required": true,
        "default": "\"x\"",
        "description": "Tooltip row of the x of a scatter point when the axis has no title"
      },
      {
        "name": "y",
        "type": "string",
        "required": true,
        "default": "\"y\"",
        "description": "Tooltip row of the y of a scatter point when the axis has no title"
      },
      {
        "name": "series",
        "type": "string",
        "required": true,
        "default": "\"Series\"",
        "description": "Default series names: `\"Series 1\"`, `\"Series 2\"`..."
      },
      {
        "name": "chart",
        "type": "string",
        "required": true,
        "default": "\"Chart\"",
        "description": "Accessible name of a chart without named series"
      },
      {
        "name": "chartOf",
        "type": "string",
        "required": true,
        "default": "\"Chart: {series}\"",
        "description": "Accessible name of a chart; `{series}` is the list of the series names"
      },
      {
        "name": "start",
        "type": "string",
        "required": true,
        "default": "\"Start\"",
        "description": "Start of a range bar on a time axis (Gantt tasks)"
      },
      {
        "name": "end",
        "type": "string",
        "required": true,
        "default": "\"End\"",
        "description": "End of a range bar on a time axis"
      },
      {
        "name": "duration",
        "type": "string",
        "required": true,
        "default": "\"Duration\"",
        "description": "Length of a range bar on a time axis (`4 weeks`, `26 days`)"
      },
      {
        "name": "progress",
        "type": "string",
        "required": true,
        "default": "\"Progress\"",
        "description": "Done share of a Gantt task"
      },
      {
        "name": "dependencies",
        "type": "string",
        "required": true,
        "default": "\"Depends on\"",
        "description": "Tasks a Gantt task waits for"
      },
      {
        "name": "outlier",
        "type": "string",
        "required": true,
        "default": "\"Outlier\"",
        "description": "A hovered box plot outlier"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 迭代燃尽图

在显式指定的 xAxis 分类上，以面积显示剩余工作量、以柱形显示每日完成的点数、以折线显示理想燃尽；text 标注标出范围变更。renderTooltip 显示每天相对理想线超前或落后多少。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/demos/burndown.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  MixedChart,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// A two-week sprint of 10 working days, 7 of them done: story points
// completed each day and a scope change on day 4
const COMMITTED = 80;
const SPRINT_DAYS = 10;
const completed = [0, 5, 8, 3, 6, 9, 4, 11];
const added = [0, 0, 0, 0, 8, 0, 0, 0];
const remaining = completed.reduce<number[]>((list, done, day) => {
  const before = list[day - 1] ?? COMMITTED;
  return [...list, before - done + (added[day] ?? 0)];
}, []);
const ideal = (day: number) => COMMITTED * (1 - day / SPRINT_DAYS);
// end of each working day: Monday 19 October 2026, weekends skipped
const workingDays = Array.from(
  { length: SPRINT_DAYS },
  (_, k) => new Date(2026, 9, 19 + k + (k >= 5 ? 2 : 0)),
);

export default function BurndownDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;

  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return {
      points: (value: number) => t("points", { value: number.format(value) }),
      day: new Intl.DateTimeFormat(locale, {
        weekday: "short",
        day: "numeric",
      }),
    };
  }, [locale, t]);
  const labels = useMemo(
    () => [t("sprintStart"), ...workingDays.map((d) => formats.day.format(d))],
    [t, formats],
  );

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("remainingWork"),
        type: "area",
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.18,
        format: formats.points,
        data: remaining.map((y, day) => [labels[day] ?? "", y] as const),
      },
      {
        name: t("completedPerDay"),
        type: "bar",
        color: "var(--success-color)",
        format: formats.points,
        data: completed.map((y, day) => [labels[day] ?? "", y] as const),
      },
      {
        name: t("idealBurn"),
        type: "line",
        color: "var(--text-secondary-color)",
        lineWidth: 1.5,
        format: formats.points,
        data: labels.map((label, day) => [label, ideal(day)] as const),
      },
    ],
    [t, formats, labels],
  );
  const scopeDay = added.findIndex((points) => points > 0);
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "text",
        x: scopeDay,
        y: (remaining[scopeDay] ?? 0) + 6,
        anchor: "bottom",
        text: t("scopeAdded", {
          value: formats.points(added[scopeDay] ?? 0),
        }),
        color: "var(--warning-color)",
        weight: 600,
      },
    ],
    [t, formats, scopeDay],
  );

  // where the sprint stands on the hovered day compared with the ideal line
  const renderTooltip = (event: ChartHoverEvent) => {
    const day = event.items[0]?.index ?? -1;
    const left = remaining[day];
    const label = labels[day];
    if (label === undefined) return null;
    if (left === undefined) {
      return (
        <div>
          <strong>{label}</strong>
          <div>{t("idealLeft", { value: formats.points(ideal(day)) })}</div>
        </div>
      );
    }
    const gap = left - ideal(day);
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{label}</strong>
        <span>{t("remainingLeft", { value: formats.points(left) })}</span>
        <span>
          {t("doneThatDay", { value: formats.points(completed[day] ?? 0) })}
        </span>
        <span
          style={{
            color: gap > 0 ? "var(--danger-color)" : "var(--success-color)",
          }}
        >
          {gap > 0
            ? t("behindBy", { value: formats.points(gap) })
            : t("aheadBy", { value: formats.points(-gap) })}
        </span>
      </div>
    );
  };

  const today = remaining.length - 1;
  const velocity = completed.slice(1).reduce((sum, p) => sum + p, 0) / today;
  const left = remaining[today] ?? 0;
  const forecast = left - velocity * (SPRINT_DAYS - today);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <MixedChart
        series={series}
        annotations={annotations}
        renderTooltip={renderTooltip}
        xAxis={{ type: "category", categories: labels }}
        yAxis={{ title: t("storyPoints"), format: formats.points }}
        height={320}
        ariaLabel={t("burndownAria")}
      />
      <p style={{ margin: 0 }}>
        {forecast > 0
          ? t("burndownLate", {
              left: formats.points(left),
              velocity: formats.points(velocity),
              forecast: formats.points(forecast),
            })
          : t("burndownOnTrack", {
              left: formats.points(left),
              velocity: formats.points(velocity),
            })}
      </p>
    </div>
  );
}

```

## Example: 气候图

降雨量柱使用左轴，气温曲线使用右轴；zero: true 让右轴范围包含零。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/demos/climate.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// Climate of Tokyo: average rainfall (mm) and temperature (°C) per month
const rainfall = [52, 56, 118, 125, 138, 168, 154, 168, 210, 198, 93, 51];
const temperature = [
  5.4, 6.1, 9.4, 14.3, 18.8, 21.9, 25.7, 26.9, 23.3, 18.0, 12.5, 7.7,
];

export default function ClimateDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const mm = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millimeter",
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const celsius = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const series = useMemo((): ChartSeries[] => {
    const months = Array.from({ length: 12 }, (_, m) =>
      new Intl.DateTimeFormat(locale, { month: "short" }).format(
        new Date(2026, m, 1),
      ),
    );
    return [
      {
        name: t("rainfall"),
        type: "bar",
        color: "var(--chart-series-5, #0ea5e9)",
        format: mm,
        data: months.map((m, i) => [m, rainfall[i] ?? 0] as const),
      },
      {
        name: t("temperature"),
        type: "line",
        curve: "smooth",
        yAxis: "right",
        color: "var(--chart-series-4, #ef4444)",
        data: months.map((m, i) => [m, temperature[i] ?? 0] as const),
      },
    ];
  }, [t, locale, mm]);

  return (
    <MixedChart
      series={series}
      yAxis={{ format: mm }}
      yAxis2={{ format: celsius, zero: true }}
      height={300}
      ariaLabel={t("climateAria")}
    />
  );
}

```

## Example: 流量与转化率

每日访问量面积图，转化率在右轴上，并用 rect 标注突出显示一次营销活动。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/demos/conversion.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// Daily sessions of an online shop over two months, and the share of them
// ending with an order: the weekly rhythm and a campaign in the middle
const days = Array.from({ length: 61 }, (_, d) => {
  const weekend = [0, 6].includes(new Date(2026, 3, 1 + d).getDay());
  const campaign = d >= 30 && d < 37 ? 1 : 0;
  return {
    x: new Date(2026, 3, 1 + d),
    sessions: Math.round(
      (weekend ? 21000 : 15500) * (1 + d / 400) * (1 + campaign * 0.6),
    ),
    rate:
      (weekend ? 0.031 : 0.024) + campaign * 0.009 + Math.sin(d * 1.7) * 0.0015,
  };
});

export default function ConversionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const compact = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(value);
  }, [locale]);
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("sessions"),
        type: "area",
        curve: "smooth",
        data: days.map((d) => [d.x, d.sessions] as const),
      },
      {
        name: t("conversionRate"),
        type: "line",
        yAxis: "right",
        color: "var(--chart-series-2, #10b981)",
        data: days.map((d) => [d.x, d.rate] as const),
      },
    ],
    [t],
  );

  return (
    <MixedChart
      series={series}
      yAxis={{ format: compact }}
      yAxis2={{ format: percent, zero: true }}
      annotations={[
        {
          type: "rect",
          x0: new Date(2026, 4, 1).getTime(),
          x1: new Date(2026, 4, 8).getTime(),
          label: t("campaign"),
          color: "var(--warning-color, #f59e0b)",
        },
      ]}
      height={320}
      ariaLabel={t("conversionAria")}
    />
  );
}

```

## Example: 库存与到货

以阶梯面积图显示库存水平，配合到货柱形、再订货点参考线和安全库存 rect 标注。onPointClick 用 x 轴参考线标出所点日期，并在输出区域显示其采购订单或库存；onPlotClick 将其清除。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/demos/inventory.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MixedChart,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartSeries,
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
const START = new Date(2026, 6, 1).getTime();
const DAYS = 90;
const REORDER_POINT = 520;
const SAFETY_STOCK = 200;
const ORDER_QUANTITY = 1400;
const PROMO = [52, 58] as const; // a promotion doubles the demand

interface PurchaseOrder {
  id: string;
  ordered: number;
  arrives: number;
  quantity: number;
}

// Stock of one item at the end of each day: the warehouse orders a fixed
// quantity when the stock falls under the reorder point, and the supplier
// delivers after a lead time of 5 to 9 days
const random = mulberry32(7);
const { stock, orders } = (() => {
  const levels: number[] = [];
  const placed: PurchaseOrder[] = [];
  let level = 1250;
  for (let day = 0; day < DAYS; day++) {
    const promo = day >= PROMO[0] && day <= PROMO[1];
    const demand = Math.round((promo ? 95 : 48) * (0.7 + random() * 0.6));
    level += placed
      .filter((po) => po.arrives === day)
      .reduce((sum, po) => sum + po.quantity, 0);
    level = Math.max(0, level - demand);
    const pending = placed.some((po) => po.arrives > day);
    if (level <= REORDER_POINT && !pending) {
      placed.push({
        id: `PO-${4180 + placed.length * 7}`,
        ordered: day,
        arrives: day + 5 + Math.floor(random() * 5),
        quantity: ORDER_QUANTITY,
      });
    }
    levels.push(level);
  }
  return {
    stock: levels,
    orders: placed.filter((po) => po.arrives < DAYS),
  };
})();
const time = (day: number) => START + day * DAY;

export default function InventoryDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const [picked, setPicked] = useState<number | null>(null);

  const formats = useMemo(
    () => ({
      units: new Intl.NumberFormat(locale),
      date: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
      days: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "day",
        unitDisplay: "long",
      }),
    }),
    [locale],
  );

  const series = useMemo(
    (): ChartSeries[] => [
      {
        id: "stock",
        name: t("stockLevel"),
        type: "area",
        curve: "step",
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.18,
        data: stock.map((units, day) => [time(day), units] as const),
      },
      {
        id: "deliveries",
        name: t("deliveries"),
        type: "bar",
        color: "var(--success-color)",
        data: orders.map((po) => [time(po.arrives), po.quantity] as const),
      },
    ],
    [t],
  );
  const annotations = useMemo((): ChartAnnotation[] => {
    const promo: ChartAnnotation = {
      type: "rect",
      x0: time(PROMO[0]),
      x1: time(PROMO[1]),
      color: "var(--warning-color)",
      opacity: 0.1,
      label: t("promotion"),
      labelPosition: "top-right",
    };
    return [
      {
        type: "rect",
        y0: 0,
        y1: SAFETY_STOCK,
        color: "var(--danger-color)",
        opacity: 0.08,
        label: t("safetyStock"),
        labelPosition: "bottom-right",
      },
      {
        type: "line",
        axis: "y",
        value: REORDER_POINT,
        dash: [4, 4],
        color: "var(--warning-color)",
        label: t("reorderPoint"),
      },
      promo,
      ...(picked === null
        ? []
        : [
            {
              type: "line" as const,
              axis: "x" as const,
              value: time(picked),
              color: "var(--primary-color)",
            },
          ]),
    ];
  }, [t, picked]);

  const onPointClick = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return;
    setPicked(Math.round((item.x - START) / DAY));
  };

  const readout = () => {
    if (picked === null) return t("inventoryHint");
    const delivery = orders.find((po) => po.arrives === picked);
    if (delivery) {
      return t("deliveryDetails", {
        id: delivery.id,
        quantity: formats.units.format(delivery.quantity),
        ordered: formats.date.format(time(delivery.ordered)),
        arrived: formats.date.format(time(delivery.arrives)),
        lead: formats.days.format(delivery.arrives - delivery.ordered),
      });
    }
    const units = stock[picked] ?? 0;
    const values = {
      date: formats.date.format(time(picked)),
      units: formats.units.format(units),
    };
    return units <= SAFETY_STOCK ? t("stockLow", values) : t("stockOn", values);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <MixedChart
        series={series}
        annotations={annotations}
        onPointClick={onPointClick}
        onPlotClick={() => setPicked(null)}
        tooltip={{ mode: "axis" }}
        xAxis={{ type: "time" }}
        yAxis={{
          title: t("unitsInStock"),
          format: (y) => formats.units.format(y),
        }}
        locale={locale}
        height={320}
        ariaLabel={t("inventoryAria")}
      />
      <output aria-live="polite">{readout()}</output>
    </div>
  );
}

```

## Example: 多语言

同一图表分别设置 locale="zh-CN" 和 locale="fr-FR"：引擎按语言区域输出紧凑单位（万 / k）、分隔符、时间轴的月份名称以及提示框中的日期。不设置 locale 时，图表跟随页面语言（<html lang>）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/demos/locale.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// 90 days of page views (hundreds of thousands) and the conversion rate (%)
const DAY = 86_400_000;
const start = new Date(2026, 0, 1).getTime();
const days = Array.from({ length: 90 }, (_, i) => {
  const weekly = Math.sin((i / 7) * Math.PI * 2) * 0.12;
  const trend = 1 + i / 120;
  return {
    x: start + i * DAY,
    views: Math.round(186_000 * trend * (1 + weekly) + ((i * 7919) % 21_000)),
    rate: Number(
      (2.4 + Math.sin(i / 11) * 0.45 + ((i * 31) % 7) / 25).toFixed(2),
    ),
  };
});

// The same chart in two locales: compact units (万 / k), separators and dates
const LOCALES = [
  { locale: "zh-CN", key: "chinese" },
  { locale: "fr-FR", key: "french" },
] as const;

export default function LocaleDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("pageViews"),
        type: "bar",
        data: days.map((d) => ({ x: d.x, y: d.views })),
      },
      {
        name: t("conversionRate"),
        type: "line",
        yAxis: "right",
        color: "var(--chart-series-3, #f59e0b)",
        lineWidth: 2,
        data: days.map((d) => ({ x: d.x, y: d.rate })),
      },
    ],
    [t],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {LOCALES.map(({ locale, key }) => (
        <figure key={locale} style={{ margin: 0, minWidth: 0 }}>
          <figcaption
            style={{
              marginBottom: 4,
              fontSize: 13,
              color: "var(--text-secondary-color)",
            }}
          >
            {t(`locales.${key}`)}
          </figcaption>
          <MixedChart
            locale={locale}
            series={series}
            xAxis={{ type: "time" }}
            yAxis2={{ zero: true }}
            legend={{ position: "bottom" }}
            height={280}
            ariaLabel={t("localeAria", { locale: t(`locales.${key}`) })}
          />
        </figure>
      ))}
    </div>
  );
}

```

## Example: 对数刻度

十年间用户数增长了 6000 倍：yAxis2={{ type: "log" }} 把用户数画在对数刻度的右轴上，每个数量级一个刻度，左轴的营收柱形仍为线性；提示框显示实际数值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/demos/log-scale.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// Ten years of a software company: yearly revenue (M$) grows 160-fold, its
// users 6,000-fold; a log right axis keeps both the first years and the last
// ones readable
const years = Array.from({ length: 10 }, (_, i) => String(2016 + i));
const revenue = [0.4, 1.1, 2.6, 5.2, 9.8, 17, 26, 38, 51, 66];
const users = [
  1_200, 6_800, 31_000, 120_000, 410_000, 1_100_000, 2_300_000, 3_900_000,
  5_600_000, 7_400_000,
];

export default function LogScaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);
  const compact = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(value);
  }, [locale]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("yearlyRevenue"),
        type: "bar",
        format: usd,
        data: years.map((year, i) => [year, revenue[i] ?? 0] as const),
      },
      {
        name: t("users"),
        type: "line",
        yAxis: "right",
        color: "var(--chart-series-3, #f59e0b)",
        lineWidth: 2.5,
        format: (value) => number.format(value),
        data: years.map((year, i) => [year, users[i] ?? null] as const),
      },
    ],
    [t, usd, number],
  );

  return (
    <MixedChart
      series={series}
      yAxis={{ format: usd, title: t("yearlyRevenue") }}
      // decades: 1k, 10k, 100k, 1M, 10M
      yAxis2={{ type: "log", format: compact, title: t("usersLog") }}
      height={320}
      ariaLabel={t("logAria")}
    />
  );
}

```

## Example: 运维总览

请求量以柱形绘制在左轴，错误率绘制在右轴，发布记录作为 type: "scatter" 系列，并通过 showLabels 标出各版本号。Checkbox 取代图例，为每个系列设置 hidden。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/demos/ops-overview.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "minerva-design";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SLOT = 30 * 60 * 1000;
const START = new Date(2026, 9, 29).getTime(); // local midnight
const SLOTS = 48;
// releases of the day (slot index and version); the first one was rolled back
const DEPLOYS = [
  { slot: 20, version: "v2.14.0" },
  { slot: 22, version: "v2.13.2" },
  { slot: 31, version: "v2.14.1" },
];

// Requests (thousands per half hour) and share of 5xx answers of a web API
const random = mulberry32(503);
const slots = Array.from({ length: SLOTS }, (_, i) => {
  const hour = i / 2;
  const daily = Math.max(0, Math.sin(((hour - 6) / 24) * 2 * Math.PI));
  const requests = 40 + 260 * daily + random() * 25;
  // the faulty release (slots 20 and 21) makes the error rate jump
  const incident = i === 20 ? 0.048 : i === 21 ? 0.031 : 0;
  const errors = 0.002 + random() * 0.0015 + incident;
  return { time: START + i * SLOT, requests, errors };
});

type SeriesKey = "requests" | "errors" | "deploys";

export default function OpsOverviewDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const [visible, setVisible] = useState<Record<SeriesKey, boolean>>({
    requests: true,
    errors: true,
    deploys: true,
  });

  const formats = useMemo(
    () => ({
      requests: new Intl.NumberFormat(locale, { notation: "compact" }),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
      time: new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }),
    [locale],
  );

  const series = useMemo((): ChartSeries[] => {
    const requests = (y: number) => formats.requests.format(y * 1000);
    const percent = (y: number) => formats.percent.format(y);
    return [
      {
        id: "requests",
        name: t("requests"),
        type: "bar",
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.6,
        hidden: !visible.requests,
        format: requests,
        data: slots.map((s) => [s.time, s.requests] as const),
      },
      {
        id: "errors",
        name: t("errorRate"),
        type: "line",
        yAxis: "right",
        color: "var(--danger-color)",
        lineWidth: 2,
        hidden: !visible.errors,
        format: percent,
        data: slots.map((s) => [s.time, s.errors] as const),
      },
      {
        // one dot per release on the error rate, its version written next to it
        id: "deploys",
        name: t("releases"),
        type: "scatter",
        yAxis: "right",
        color: "var(--text-color, #1f2937)",
        pointSize: 9,
        showLabels: true,
        hidden: !visible.deploys,
        format: percent,
        data: DEPLOYS.map((d) => ({
          x: slots[d.slot]?.time ?? START,
          y: slots[d.slot]?.errors ?? 0,
          label: d.version,
        })),
      },
    ];
  }, [t, formats, visible]);

  const peak = slots.reduce((max, s) => (s.errors > max.errors ? s : max));
  const toggle = (key: SeriesKey) => (checked: boolean) =>
    setVisible((current) => ({ ...current, [key]: checked }));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <Checkbox
          checked={visible.requests}
          onChange={toggle("requests")}
          label={t("requests")}
        />
        <Checkbox
          checked={visible.errors}
          onChange={toggle("errors")}
          label={t("errorRate")}
        />
        <Checkbox
          checked={visible.deploys}
          onChange={toggle("deploys")}
          label={t("releases")}
        />
      </div>
      <MixedChart
        series={series}
        legend={false}
        tooltip={{ mode: "axis" }}
        xAxis={{ type: "time", format: (x) => formats.time.format(x) }}
        yAxis={{
          title: t("requestsPerHalfHour"),
          format: (y) => formats.requests.format(y * 1000),
        }}
        yAxis2={{
          title: t("errorRate"),
          min: 0,
          format: (y) => formats.percent.format(y),
        }}
        height={320}
        ariaLabel={t("opsAria")}
      />
      <p style={{ margin: 0, color: "var(--text-secondary-color)" }}>
        {t("incidentSummary", {
          peak: formats.percent.format(peak.errors),
          time: formats.time.format(peak.time),
          version: DEPLOYS[0]?.version ?? "",
          rollback: DEPLOYS[1]?.version ?? "",
        })}
      </p>
    </div>
  );
}

```

## Example: 帕累托图

排序后的原因及其累计占比，右轴为 0-100%（min、max 和 nice: false）；造成 80% 退货的原因被突出显示。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/demos/pareto.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// Returns of the last quarter by cause: a Pareto chart sorts the causes and
// adds their cumulative share, the few causes behind 80% stand out
const causes = [
  ["wrongSize", 412],
  ["damaged", 236],
  ["notAsDescribed", 151],
  ["late", 88],
  ["changedMind", 61],
  ["wrongItem", 37],
  ["other", 23],
] as const;

export default function ParetoDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { style: "percent" });
    return (value: number) => format.format(value / 100);
  }, [locale]);

  const series = useMemo((): ChartSeries[] => {
    const total = causes.reduce((sum, [, n]) => sum + n, 0);
    const cumulative = causes.map(
      (_, i) =>
        (causes.slice(0, i + 1).reduce((sum, [, n]) => sum + n, 0) / total) *
        100,
    );
    return [
      {
        name: t("returns"),
        type: "bar",
        color: "var(--primary-color, #4f46e5)",
        data: causes.map(([key, n], i) => ({
          x: t(`causes.${key}`),
          y: n,
          // the vital few: the causes reaching 80% together
          color:
            (cumulative[i - 1] ?? 0) < 80
              ? "var(--primary-color, #4f46e5)"
              : "var(--border-color, #cbd5e1)",
        })),
      },
      {
        name: t("cumulative"),
        type: "line",
        yAxis: "right",
        color: "var(--chart-series-4, #ef4444)",
        format: percent,
        data: causes.map(
          ([key], i) => [t(`causes.${key}`), cumulative[i] ?? 0] as const,
        ),
      },
    ];
  }, [t, percent]);

  return (
    <MixedChart
      series={series}
      yAxis2={{ min: 0, max: 100, nice: false, format: percent }}
      height={320}
      ariaLabel={t("paretoAria")}
    />
  );
}

```

## Example: 收入与增长率

增长率折线设置 yAxis: "right"，以自身的格式绘制在 yAxis2 上；右轴范围与左轴刻度对齐，网格对两个轴都适用。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/demos/revenue-growth.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MixedChart, type ChartSeries } from "minerva-design/charts";

// Quarterly revenue (M$) and its growth over the same quarter of last year
const revenue = [18.2, 19.5, 21.1, 26.8, 21.4, 23.9, 25.2, 31.6];
const growth = revenue.map((value, i) =>
  i >= 4 ? value / (revenue[i - 4] ?? value) - 1 : null,
);

export default function RevenueGrowthDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const series = useMemo((): ChartSeries[] => {
    const quarters = revenue.map((_, i) =>
      t("quarter", { n: (i % 4) + 1, year: 2025 + Math.floor(i / 4) }),
    );
    return [
      {
        name: t("revenue"),
        type: "bar",
        format: usd,
        data: quarters.map((q, i) => [q, revenue[i] ?? 0] as const),
      },
      {
        name: t("growth"),
        type: "line",
        // plotted against yAxis2, formatted with its own format
        yAxis: "right",
        color: "var(--chart-series-3, #f59e0b)",
        lineWidth: 2.5,
        data: quarters.map((q, i) => [q, growth[i] ?? null] as const),
      },
    ];
  }, [t, usd]);

  return (
    <MixedChart
      series={series}
      yAxis={{ format: usd, title: t("revenue") }}
      yAxis2={{ format: percent, title: t("growth") }}
      height={320}
      ariaLabel={t("revenueAria")}
    />
  );
}

```

## Example: 光伏与家用储能

每小时光伏发电量以柱形、用电量以折线绘制在左轴，电池电量以面积绘制在 yAxis2 上，并通过 min、max 和 nice: false 固定为 0–100%；rect 标注为夜间加上底色。Switch 可隐藏电池，输出区域会重新计算自给率。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/demos/solar-battery.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  MixedChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

const HOUR = 60 * 60 * 1000;
const START = new Date(2026, 5, 20).getTime(); // local midnight
const HOURS = 48;
const CAPACITY = 10; // kWh of the home battery
const MAX_RATE = 4; // kW of charge or discharge
const SUNRISE = 5.5;
const SUNSET = 21.5;

// A house with 6 kWp of solar panels over two days, the second one cloudy:
// production and consumption in kWh per hour
const hours = Array.from({ length: HOURS }, (_, i) => {
  const hour = i % 24;
  const day = Math.floor(i / 24);
  const sun = Math.max(
    0,
    Math.sin(((hour - SUNRISE) / (SUNSET - SUNRISE)) * Math.PI),
  );
  const clouds = day === 1 ? 0.4 + 0.15 * Math.sin(i * 1.7) : 1;
  const solar = 5.2 * sun ** 1.3 * clouds;
  // base load, breakfast, cooking and evening peaks
  const load =
    0.35 +
    0.9 * Math.exp(-((hour - 7.5) ** 2) / 1.5) +
    1.6 * Math.exp(-((hour - 19) ** 2) / 3) +
    0.5 * Math.exp(-((hour - 12.5) ** 2) / 2);
  return { time: START + i * HOUR, solar, load };
});

// state of charge hour by hour: surplus charges the battery, deficit drains it
const simulate = (battery: boolean) => {
  let charge = CAPACITY * 0.3;
  let imported = 0;
  const soc = hours.map((h) => {
    const balance = h.solar - h.load;
    if (!battery) {
      imported += Math.max(0, -balance);
      return 0;
    }
    if (balance > 0) {
      charge += Math.min(balance, MAX_RATE, CAPACITY - charge);
    } else {
      const drawn = Math.min(-balance, MAX_RATE, charge);
      charge -= drawn;
      imported += -balance - drawn;
    }
    return (charge / CAPACITY) * 100;
  });
  return { soc, imported };
};
const consumed = hours.reduce((sum, h) => sum + h.load, 0);

export default function SolarBatteryDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.mixed-chart.data",
  });
  const locale = i18n.language;
  const [battery, setBattery] = useState(true);

  const result = useMemo(() => simulate(battery), [battery]);
  const formats = useMemo(() => {
    const kwh = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return {
      kwh: (value: number) => t("kwh", { value: kwh.format(value) }),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
      }),
    };
  }, [locale, t]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("solarProduction"),
        type: "bar",
        color: "var(--warning-color)",
        format: formats.kwh,
        data: hours.map((h) => [h.time, h.solar] as const),
      },
      {
        name: t("consumption"),
        type: "line",
        color: "var(--text-color, #1f2937)",
        format: formats.kwh,
        data: hours.map((h) => [h.time, h.load] as const),
      },
      {
        name: t("batteryCharge"),
        type: "area",
        yAxis: "right",
        color: "var(--success-color)",
        opacity: 0.15,
        // without a battery the series stays in the legend, greyed out
        hidden: !battery,
        format: (y) => formats.percent.format(y / 100),
        data: hours.map((h, i) => [h.time, result.soc[i] ?? 0] as const),
      },
    ],
    [t, formats, battery, result],
  );
  // the nights, from sunset to the next sunrise, cut to the data range
  const annotations = useMemo((): ChartAnnotation[] => {
    const first = START - HOUR / 2;
    const last = START + (HOURS - 0.5) * HOUR;
    return [-1, 0, 1].map((day) => ({
      type: "rect" as const,
      x0: Math.max(first, START + (day * 24 + SUNSET) * HOUR),
      x1: Math.min(last, START + ((day + 1) * 24 + SUNRISE) * HOUR),
      color: "var(--text-secondary-color)",
      opacity: 0.08,
      ...(day === 0 ? { label: t("night") } : {}),
    }));
  }, [t]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Switch
          checked={battery}
          onChange={setBattery}
          label={t("withBattery", { value: formats.kwh(CAPACITY) })}
        />
        <output aria-live="polite">
          {t("selfSufficiency", {
            share: formats.percent.format(1 - result.imported / consumed),
            imported: formats.kwh(result.imported),
          })}
        </output>
      </div>
      <MixedChart
        series={series}
        annotations={annotations}
        tooltip={{ mode: "axis" }}
        xAxis={{ type: "time" }}
        yAxis={{ title: t("energyPerHour"), format: formats.kwh }}
        yAxis2={{
          title: t("batteryCharge"),
          min: 0,
          max: 100,
          nice: false,
          format: (y) => formats.percent.format(y / 100),
        }}
        locale={locale}
        height={340}
        ariaLabel={t("solarAria")}
      />
    </div>
  );
}

```
