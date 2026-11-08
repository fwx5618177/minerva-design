# 柱状图

并排分组或堆叠的柱状图，可叠加折线。

Package: minerva-design@1.23.1

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

第{{n}}季度

已关闭工单

每季度关闭的支持工单数

订单

7 日均值

天

每日订单数及其 7 日均值

2025 与 2026 年的季度收入

推荐者

被动者

贬损者

北美

欧洲

亚太

拉丁美洲

中东

各地区推荐者、被动者与贬损者的占比

网站

移动应用

合作伙伴

按渠道堆叠的每月订单数

销量

每季度销量

{{quarter}}：{{units}} 件

点按一根柱子

堆叠

分组

按渠道和月份的订单数

伦敦

东京

巴黎

伦敦、东京与巴黎的月平均降水量

净利润

每月净利润，盈利在零线以上，亏损在零线以下

销量

各国线上销量，从高到低

新客户

第{{n}}周

每周目标

每周新客户数与每周目标对比

{{total}} 周中有 {{reached}} 周达标（{{rate}}）。

收入

{{month}}：{{value}}

返回季度

点击某个季度查看其各月数据。

{{quarter}}：合计 {{value}}。点击某个月份查看其收入。

2026 年各季度收入；点击某个季度查看其各月数据

2026 年 {{quarter}} 各月收入

工程

产品

设计

销售

市场

支持

去年

今年

变化

与去年对比

各部门今年与去年的招聘人数

成功

已回滚

变更冻结

八周内每天的生产部署次数，分为成功与回滚

每个工作日 {{perDay}} 次部署，变更失败率 {{failure}}。

低谷

平段

高峰

充电

日均价

充电时长

{{energy}} kWh · {{duration}}

建议在 {{start}} 至 {{end}} 充电，费用 {{cost}}，比 {{plugIn}} 插上电立即充电节省 {{saving}}。

每 MWh 电价

明天每小时的日前电价，并突出显示电动车最便宜的充电时段

## BarChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "BarChart"
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
    "description": "Series drawn as bars unless they set a `type` (e.g. a `line` overlay)"
  },
  {
    "name": "stacked",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Stacks the bars of every series (otherwise they are grouped side by side)"
  },
  {
    "name": "percent",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Scales the stacks to 100% (implies `stacked`)"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Writes the value above every bar"
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
    "description": "`horizontal` draws the bars from the left, the categories down the left side"
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
    "name": "legend",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name"
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
  }
]
```

### events

```json
[
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
  "BarChartProps": {
    "source": "charts/src/react/types.ts",
    "description": "Props of BarChart (`labels` writes the values: override the tooltip texts with `tooltip.labels`)",
    "kind": "interface",
    "extends": [
      "Omit<ChartCommonProps, \"labels\">"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly ChartSeries[]",
        "required": true,
        "description": "Series drawn as bars unless they set a `type` (e.g. a `line` overlay)"
      },
      {
        "name": "stacked",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Stacks the bars of every series (otherwise they are grouped side by side)"
      },
      {
        "name": "percent",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Scales the stacks to 100% (implies `stacked`)"
      },
      {
        "name": "labels",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Writes the value above every bar"
      },
      {
        "name": "orientation",
        "type": "ChartOrientation",
        "required": false,
        "default": "\"vertical\"",
        "description": "`horizontal` draws the bars from the left, the categories down the left side"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础

一个由 [类目, 值] 元组组成的系列；y 轴始终包含零。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

const closed = [320, 410, 385, 470];

export default function BasicDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.bar-chart.data" });

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("ticketsClosed"),
        // "Q1", "第1季度", "T1"...
        data: closed.map(
          (value, i) => [t("quarter", { n: i + 1 }), value] as const,
        ),
      },
    ],
    [t],
  );

  return <BarChart series={series} height={280} ariaLabel={t("ticketsAria")} />;
}

```

## Example: 柱与折线

type: "line" 的系列绘制在柱之上，这里是 7 日平均值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/combo.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(5);
const orders = Array.from({ length: 30 }, (_, day) =>
  Math.round(60 + day * 1.5 + random() * 40),
);
// trailing 7-day average of the bars
const average = orders.map((_, day) => {
  const week = orders.slice(Math.max(0, day - 6), day + 1);
  return Math.round(week.reduce((sum, v) => sum + v, 0) / week.length);
});

export default function ComboDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.bar-chart.data" });

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("orders"), data: orders },
      { name: t("average7"), type: "line", data: average, lineWidth: 3 },
    ],
    [t],
  );

  return (
    <BarChart
      series={series}
      xAxis={{ title: t("day") }}
      height={300}
      ariaLabel={t("ordersAria")}
    />
  );
}

```

## Example: 部署时间线

时间轴上的堆叠柱统计每天成功与回滚的部署次数；rect 标注为周末和变更冻结期加上底色，摘要给出部署频率和变更失败率。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/deployments.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  type ChartAnnotation,
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
// a Monday, local midnight: the time axis places its ticks in local time
const START = new Date(2026, 8, 7).getTime();
const DAYS = 56;
const FREEZE = [38, 43] as const; // a change freeze before a big launch

// Production deployments per day, and the ones that were rolled back
const random = mulberry32(42);
const days = Array.from({ length: DAYS }, (_, i) => {
  const time = START + i * DAY;
  const weekend = [0, 6].includes(new Date(time).getDay());
  const frozen = i >= FREEZE[0] && i <= FREEZE[1];
  const total =
    weekend || frozen
      ? random() < 0.15
        ? 1
        : 0
      : Math.round(4 + random() * 6 + i / 14);
  const failed = total > 0 && random() < 0.35 ? (random() < 0.8 ? 1 : 2) : 0;
  return { time, weekend, ok: total - Math.min(failed, total), failed };
});
const workingDays = days.filter((d) => !d.weekend).length;
const deployed = days.reduce((sum, d) => sum + d.ok + d.failed, 0);
const rolledBack = days.reduce((sum, d) => sum + d.failed, 0);

export default function DeploymentsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("deploysOk"),
        color: "var(--success-color)",
        data: days.map((d) => [d.time, d.ok] as const),
      },
      {
        name: t("deploysFailed"),
        color: "var(--danger-color)",
        data: days.map((d) => [d.time, d.failed] as const),
      },
    ],
    [t],
  );
  // every weekend, from Saturday to Monday (bars are centered on midnight)
  const annotations = useMemo((): ChartAnnotation[] => {
    const weekends: ChartAnnotation[] = days
      .filter((d) => new Date(d.time).getDay() === 6)
      .map((d) => ({
        type: "rect",
        x0: d.time - DAY / 2,
        x1: d.time + (3 * DAY) / 2,
        color: "var(--text-secondary-color)",
        opacity: 0.07,
      }));
    return [
      ...weekends,
      {
        type: "rect",
        x0: START + FREEZE[0] * DAY - DAY / 2,
        x1: START + FREEZE[1] * DAY + DAY / 2,
        color: "var(--warning-color)",
        opacity: 0.14,
        label: t("changeFreeze"),
        labelPosition: "top-right",
      },
    ];
  }, [t]);
  const formats = useMemo(
    () => ({
      decimal: new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),

      tick: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <BarChart
        series={series}
        stacked
        annotations={annotations}
        xAxis={{ type: "time", format: (x) => formats.tick.format(x) }}
        tooltip={{ mode: "axis" }}
        height={300}
        ariaLabel={t("deploysAria")}
      />
      <p style={{ margin: 0 }}>
        {t("deploysSummary", {
          perDay: formats.decimal.format(deployed / workingDays),
          failure: formats.percent.format(rolledBack / deployed),
        })}
      </p>
    </div>
  );
}

```

## Example: 下钻

在季度上触发的 onPointClick 会把系列替换为该季度的三个月，Button 可返回季度视图；点击某个月份时，其收入会写入 aria-live 输出区域。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/drilldown.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  BarChart,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Monthly revenue of 2026 in thousands of dollars, January to December
const monthly = [412, 389, 455, 470, 498, 463, 441, 429, 517, 552, 648, 731];
const quarterTotal = (q: number) =>
  monthly.slice(q * 3, q * 3 + 3).reduce((sum, value) => sum + value, 0);

export default function DrilldownDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;
  // `null`: the four quarters; a number: the months of that quarter
  const [quarter, setQuarter] = useState<number | null>(null);
  const [picked, setPicked] = useState<string | null>(null);

  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const series = useMemo((): ChartSeries[] => {
    if (quarter === null) {
      return [
        {
          name: t("revenue"),
          data: [0, 1, 2, 3].map(
            (q) => [t("quarter", { n: q + 1 }), quarterTotal(q)] as const,
          ),
        },
      ];
    }
    const month = new Intl.DateTimeFormat(locale, { month: "long" });
    return [
      {
        name: t("revenue"),
        color: "var(--chart-series-2, #10b981)",
        data: [0, 1, 2].map((m) => {
          const index = quarter * 3 + m;
          return [
            month.format(new Date(2026, index, 1)),
            monthly[index] ?? 0,
          ] as const;
        }),
      },
    ];
  }, [t, locale, quarter]);

  const onPointClick = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return;
    if (quarter === null) {
      setQuarter(item.index);
      setPicked(null);
    } else {
      setPicked(t("pickedMonth", { month: event.xLabel, value: usd(item.y) }));
    }
  };
  const back = () => {
    setQuarter(null);
    setPicked(null);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
          minHeight: 32,
        }}
      >
        {quarter !== null && (
          <Button size="small" variant="outline" onClick={back}>
            {t("backToQuarters")}
          </Button>
        )}
        <output aria-live="polite">
          {quarter === null
            ? t("drillHint")
            : (picked ??
              t("quarterDetail", {
                quarter: t("quarter", { n: quarter + 1 }),
                value: usd(quarterTotal(quarter)),
              }))}
        </output>
      </div>
      <BarChart
        series={series}
        labels
        onPointClick={onPointClick}
        tooltip={{ mode: "item" }}
        yAxis={{ format: usd }}
        legend={false}
        height={300}
        ariaLabel={
          quarter === null
            ? t("quartersAria")
            : t("monthsAria", { quarter: t("quarter", { n: quarter + 1 }) })
        }
      />
    </div>
  );
}

```

## Example: 最便宜的充电时段

明天每小时的电价被拆分为三个堆叠系列，使每根柱子呈现其价格档位的颜色。rect 标注会随 Select 中所选充电时长标出最便宜的连续时段，输出区域将其费用与到家即充的费用进行对比。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/ev-charging.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import {
  BarChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

// Day-ahead electricity price per hour of tomorrow, in euros per MWh: low at
// night, a morning and an evening peak, and a dip at noon when solar floods in
const prices = Array.from({ length: 24 }, (_, hour) => {
  const morning = 38 * Math.exp(-((hour - 8) ** 2) / 4);
  const evening = 62 * Math.exp(-((hour - 19) ** 2) / 5);
  const solar = -46 * Math.exp(-((hour - 13) ** 2) / 6);
  return (
    Math.round((72 + morning + evening + solar + 6 * Math.sin(hour)) * 10) / 10
  );
});
const sorted = [...prices].sort((a, b) => a - b);
const CHEAP = sorted[5] ?? 0; // the 6 cheapest hours
const PEAK = sorted[18] ?? 0; // the 6 most expensive hours
const AVERAGE = prices.reduce((sum, p) => sum + p, 0) / prices.length;
const POWER = 11; // kW, a home wallbox
const PLUG_IN = 18; // the car is plugged in when coming home

const windowCost = (start: number, hours: number) =>
  prices
    .slice(start, start + hours)
    .reduce((sum, price) => sum + (price / 1000) * POWER, 0);

export default function EvChargingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;
  const [hours, setHours] = useState(3);

  // the cheapest run of `hours` consecutive hours
  const best = useMemo(() => {
    let start = 0;
    for (let s = 1; s + hours <= prices.length; s++) {
      if (windowCost(s, hours) < windowCost(start, hours)) start = s;
    }
    return start;
  }, [hours]);

  const formats = useMemo(() => {
    const hour = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return {
      hour: (h: number) => hour.format(new Date(2026, 10, 1, h)),
      price: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
      cost: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
      }),
    };
  }, [locale]);

  // one series per price tier, stacked so that each hour shows a single bar
  const series = useMemo((): ChartSeries[] => {
    const tiers = [
      {
        name: t("offPeak"),
        color: "var(--success-color)",
        test: (p: number) => p <= CHEAP,
      },
      {
        name: t("standard"),
        color: "var(--primary-color)",
        test: (p: number) => p > CHEAP && p < PEAK,
      },
      {
        name: t("peak"),
        color: "var(--danger-color)",
        test: (p: number) => p >= PEAK,
      },
    ];
    return tiers.map((tier) => ({
      name: tier.name,
      color: tier.color,
      data: prices.map(
        (price, h) => [formats.hour(h), tier.test(price) ? price : 0] as const,
      ),
    }));
  }, [t, formats]);
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        // category axes place the bars at their index
        x0: best - 0.5,
        x1: best + hours - 0.5,
        color: "var(--success-color)",
        opacity: 0.12,
        label: t("chargeHere"),
        labelPosition: "top-left",
      },
      {
        type: "line",
        axis: "y",
        value: AVERAGE,
        dash: [4, 4],
        color: "var(--text-secondary-color)",
        label: t("dailyAverage"),
      },
    ],
    [t, best, hours],
  );

  const cost = windowCost(best, hours);
  const onArrival = windowCost(PLUG_IN, hours);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Select
          size="small"
          style={{ width: 200 }}
          aria-label={t("chargingTime")}
          value={String(hours)}
          onChange={(value) => setHours(Number(value))}
        >
          {[2, 3, 4, 5].map((h) => (
            <SelectItem key={h} value={String(h)}>
              {t("chargeFor", {
                energy: new Intl.NumberFormat(locale).format(h * POWER),
                duration: new Intl.NumberFormat(locale, {
                  style: "unit",
                  unit: "hour",
                  unitDisplay: "long",
                }).format(h),
              })}
            </SelectItem>
          ))}
        </Select>
        <output aria-live="polite">
          {t("chargeAdvice", {
            start: formats.hour(best),
            end: formats.hour((best + hours) % 24),
            cost: formats.cost.format(cost),
            saving: formats.cost.format(onArrival - cost),
            plugIn: formats.hour(PLUG_IN),
          })}
        </output>
      </div>
      <BarChart
        series={series}
        stacked
        annotations={annotations}
        tooltip={{ mode: "item" }}
        yAxis={{
          title: t("pricePerMwh"),
          format: (y) => formats.price.format(y),
        }}
        height={300}
        ariaLabel={t("pricesAria")}
      />
    </div>
  );
}

```

## Example: 分组

未设置 stacked 时，多个系列在每个类目中并排显示，这里是三座城市的月降水量；单位由 Intl.NumberFormat 书写。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/grouped.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

// Average monthly rainfall (mm), January to December
const rainfall = {
  london: [55, 41, 41, 44, 49, 45, 45, 50, 49, 69, 59, 55],
  tokyo: [52, 56, 118, 125, 138, 168, 154, 168, 210, 198, 93, 51],
  paris: [51, 41, 48, 52, 63, 50, 63, 53, 48, 61, 51, 58],
};

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function GroupedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  // several series without `stacked`: the bars of each month sit side by side
  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    return (Object.keys(rainfall) as (keyof typeof rainfall)[]).map((key) => ({
      name: t(`cities.${key}`),
      data: months.map((month, i) => [month, rainfall[key][i]] as const),
    }));
  }, [t, locale]);
  const millimeters = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "millimeter" }),
    [locale],
  );

  return (
    <BarChart
      series={series}
      yAxis={{ format: (value) => millimeters.format(value) }}
      height={300}
      ariaLabel={t("rainfallAria")}
    />
  );
}

```

## Example: 数值标签

labels 在每根柱子上方写出数值（使用 y 轴的 format），并在最高的柱子上方预留空间。适合柱子不多、需要精确数值的场景。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/labels.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

// Revenue in thousands of dollars, Q1 to Q4
const revenue = {
  "2025": [312, 348, 365, 421],
  "2026": [356, 402, 431, 488],
};

export default function LabelsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] =>
      Object.entries(revenue).map(([year, values]) => ({
        name: year,
        data: values.map(
          (value, i) => [t("quarter", { n: i + 1 }), value] as const,
        ),
      })),
    [t],
  );
  // "$356K", "35.6万 US$", "356 k $US"...
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <BarChart
      series={series}
      labels
      // the labels use the y axis format
      yAxis={{ format: usd }}
      height={300}
      ariaLabel={t("revenueAria")}
    />
  );
}

```

## Example: 百分比堆叠

percent 将每个堆叠缩放为 100%，便于比较规模不同的分组的构成；提示框显示回答人数及其占比。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/percent.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

const regions = [
  "northAmerica",
  "europe",
  "asiaPacific",
  "latinAmerica",
  "middleEast",
];

// Survey answers (respondents) grouped as Net Promoter Score categories
const answers = [
  {
    key: "promoters",
    color: "var(--success-color)",
    values: [612, 540, 702, 288, 164],
  },
  {
    key: "passives",
    color: "var(--warning-color)",
    values: [254, 310, 268, 131, 92],
  },
  {
    key: "detractors",
    color: "var(--danger-color)",
    values: [134, 196, 118, 97, 61],
  },
];

export default function PercentDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.bar-chart.data" });

  const series = useMemo(
    (): ChartSeries[] =>
      answers.map(({ key, color, values }) => ({
        name: t(`nps.${key}`),
        color,
        data: regions.map(
          (region, i) => [t(`regions.${region}`), values[i]] as const,
        ),
      })),
    [t],
  );

  return (
    <BarChart series={series} percent height={300} ariaLabel={t("npsAria")} />
  );
}

```

## Example: 与去年对比

Switch 通过设置去年系列的 hidden 来显示或隐藏对比，颜色保持不变；renderTooltip 列出两年的数值及百分比变化。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/period-compare.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  BarChart,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Hires per department, last year and this year
const hires = {
  engineering: [64, 81],
  product: [12, 15],
  design: [9, 7],
  sales: [38, 52],
  marketing: [17, 13],
  support: [26, 31],
} as const;
type Department = keyof typeof hires;
const keys = Object.keys(hires) as Department[];

export default function PeriodCompareDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;
  const [compare, setCompare] = useState(true);

  const series = useMemo((): ChartSeries[] => {
    const names = keys.map((key) => t(`hiringDepartments.${key}`));
    return [
      {
        id: "previous",
        name: t("previousYear"),
        color: "var(--border-strong-color)",
        // hidden series keep their place in the legend and come back as is
        hidden: !compare,
        data: keys.map((key, i) => [names[i] ?? key, hires[key][0]] as const),
      },
      {
        id: "current",
        name: t("currentYear"),
        color: "var(--primary-color)",
        data: keys.map((key, i) => [names[i] ?? key, hires[key][1]] as const),
      },
    ];
  }, [t, compare]);
  const formats = useMemo(
    () => ({
      number: new Intl.NumberFormat(locale),
      change: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
        signDisplay: "exceptZero",
      }),
    }),
    [locale],
  );

  // both years of the hovered department and the change between them
  const renderTooltip = (event: ChartHoverEvent) => {
    const department = keys[event.items[0]?.index ?? -1];
    if (!department) return null;
    const [previous, current] = hires[department];
    const change = current / previous - 1;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "2px 16px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{event.xLabel}</strong>
        <span>{t("currentYear")}</span>
        <strong style={{ textAlign: "end" }}>
          {formats.number.format(current)}
        </strong>
        <span>{t("previousYear")}</span>
        <span style={{ textAlign: "end" }}>
          {formats.number.format(previous)}
        </span>
        <span>{t("change")}</span>
        <span
          style={{
            textAlign: "end",
            color: change >= 0 ? "var(--success-color)" : "var(--danger-color)",
          }}
        >
          {formats.change.format(change)}
        </span>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={compare}
        onChange={setCompare}
        label={t("compareLastYear")}
      />
      <BarChart
        series={series}
        renderTooltip={renderTooltip}
        yAxis={{ format: (y) => formats.number.format(y) }}
        height={300}
        ariaLabel={t("hiresAria")}
      />
    </div>
  );
}

```

## Example: 盈亏

负值从零向下延伸；每个数据点设置自己的颜色，盈利为绿色、亏损为红色，y 轴格式显示正负号。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/profit-loss.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

// Net result per month (thousand EUR): losses are negative
const results = [-42, -18, 12, 35, 28, -9, 41, 66, 58, 73, 49, 92];

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function ProfitLossDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  // one color per bar: green above zero, red below
  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    return [
      {
        name: t("netResult"),
        data: results.map((y, i) => ({
          x: months[i],
          y,
          color: y >= 0 ? "var(--success-color)" : "var(--danger-color)",
        })),
      },
    ];
  }, [t, locale]);
  // "+€92K", "-42 k€"...: the sign is part of the information
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      signDisplay: "exceptZero",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <BarChart
      series={series}
      yAxis={{ format: euros }}
      annotations={[{ type: "line", axis: "y", value: 0 }]}
      legend={false}
      height={300}
      ariaLabel={t("profitAria")}
    />
  );
}

```

## Example: 排行

传入前先对数据排序即可得到排行；Intl.DisplayNames 按读者的语言给出国家名称，showLabels 写出数值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/ranking.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

// Online sales by country (thousand units), in no particular order
const salesByCountry: [string, number][] = [
  ["FR", 182],
  ["US", 541],
  ["JP", 326],
  ["DE", 248],
  ["BR", 97],
  ["CN", 463],
  ["GB", 205],
  ["IN", 151],
  ["CA", 118],
  ["KR", 134],
];

export default function RankingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    // country names in the reader's language: "Japan", "日本", "Japon"...
    const countries = new Intl.DisplayNames([locale], { type: "region" });
    const ranked = [...salesByCountry].sort((a, b) => b[1] - a[1]);
    return [
      {
        name: t("unitsSold"),
        showLabels: true,
        data: ranked.map(
          ([code, value]) => [countries.of(code) ?? code, value] as const,
        ),
      },
    ];
  }, [t, locale]);
  const thousands = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <BarChart
      series={series}
      yAxis={{ format: thousands }}
      height={320}
      ariaLabel={t("rankingAria")}
    />
  );
}

```

## Example: 堆叠

stacked 将各系列逐层堆叠。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/stacked.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

// Orders per month (January to June) by channel
const byChannel = {
  web: [120, 135, 150, 148, 170, 190],
  mobile: [80, 95, 110, 125, 140, 160],
  partners: [30, 28, 35, 42, 40, 51],
};

/** Short month names in the reader's language */
const monthNames = (locale: string, count: number) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: count }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function StackedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale, 6);
    return (Object.keys(byChannel) as (keyof typeof byChannel)[]).map(
      (key) => ({
        name: t(`channels.${key}`),
        data: months.map((month, i) => [month, byChannel[key][i]] as const),
      }),
    );
  }, [t, locale]);

  return (
    <BarChart
      series={series}
      stacked
      height={300}
      ariaLabel={t("channelsAria")}
    />
  );
}

```

## Example: 对比目标

虚线标出每周目标，达标的柱子通过数据点颜色高亮显示。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/target.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

const TARGET = 120; // new customers per week
const signups = [96, 104, 131, 118, 142, 125, 109, 137, 151, 128, 146, 163];

export default function TargetDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  // bars that reach the target are highlighted
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("newCustomers"),
        data: signups.map((y, i) => ({
          x: t("week", { n: i + 1 }),
          y,
          color:
            y >= TARGET ? "var(--primary-color)" : "var(--border-strong-color)",
        })),
      },
    ],
    [t],
  );
  const reached = signups.filter((value) => value >= TARGET).length;
  const percent = new Intl.NumberFormat(locale, { style: "percent" });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <BarChart
        series={series}
        annotations={[
          {
            type: "line",
            axis: "y",
            value: TARGET,
            color: "var(--warning-color)",
            dash: [6, 4],
            width: 2,
            label: t("weeklyTarget"),
          },
        ]}
        legend={false}
        height={300}
        ariaLabel={t("targetAria")}
      />
      <p>
        {t("targetSummary", {
          reached,
          total: signups.length,
          rate: percent.format(reached / signups.length),
        })}
      </p>
    </div>
  );
}

```
