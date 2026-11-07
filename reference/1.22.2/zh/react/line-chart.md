# 折线图

基于数字、日期或类目的折线或填充面积图。借助 GPU 可处理百万级数据点。

Package: minerva-design@1.22.2

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

本周

上周

本周与上周每日访客数

已用存储

天

60 天内的存储用量

里斯本

奥斯陆

曲线

直线

平滑

阶梯

里斯本与奥斯陆的月平均气温

计算

存储

网络

数据库

堆叠方式

堆叠

按服务堆叠的每月云支出

页面浏览量

会话数

2026 年上半年每日页面浏览量与会话数

传感器

一百万条传感器读数

{{points}} 个点 · 使用 {{renderer}} 绘制 · Ctrl / ⌘ + 滚轮缩放，拖动平移，双击重置

访客

产品发布

服务故障

90 天内的每日访客数，含一次产品发布和一次故障

室内

室外

每小时室内外温度，含缺失读数

传感器离线了几个小时：线条在此断开，而不是凭空猜测。

中位数

第 95 百分位

临界

目标 {{value}}

六小时内的 API 延迟：中位数与第 95 百分位

收盘价

周期

1 个月

3 个月

6 个月

1 年

全部

两年内的每日收盘价

步数

每日步数

{{day}}：{{steps}} 步

点按或在线条上滑动

CPU

内存

{{hour}} 时

一天内的 CPU 与内存使用率

双指缩放，双击重置；点按图例可隐藏系列。

冷冻柜温度

高于 {{value}} 报警

暂停

继续

报警：门未关？

正常

最新读数 {{value}}（{{time}}）

最近一分钟超限读数：{{readings}}

最近一分钟的冷冻柜温度，每秒更新

野生型

突变株

加入抗生素

指数生长期

对数刻度

接种后时间

CFU / mL

三种细菌培养物 24 小时的生长曲线

直线段表示增长率恒定：野生型大约每 {{minutes}} 翻一番。

在线性刻度下，数量较少的培养物看起来几乎是平的：切回对数刻度即可比较。

投资组合市值

点击一个点开始测量，再点击第二个点。

起点 {{date}}（{{value}}）：请点击第二个点。

{{from}} → {{to}}：{{change}}（{{percent}}），历时 {{days}}

清除

2026 年投资组合每日市值；点击两个点测量变化

股票

债券

黄金

房地产

基期 = 100

四类资产以 100 为基期的表现，2021 至 2026 年

{{value}} µg/m³

德里

北京

巴黎

墨西哥城

东京

圣保罗

11 月细颗粒物（PM2.5）日均浓度；虚线为世卫组织指导值 {{value}}。

超标 {{days}}/{{total}} 天

{{city}} 30 天的每日 PM2.5

## LineChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "LineChart"
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
    "description": "Series drawn as lines (or areas with `area`) unless they set a `type`"
  },
  {
    "name": "area",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Fills the area under the lines"
  },
  {
    "name": "curve",
    "source": "packages/charts/src/react/types.ts",
    "kind": "enum",
    "values": [
      "linear",
      "smooth",
      "step"
    ],
    "typeText": "ChartCurve | undefined",
    "typeRef": "type:9a03680a65f827285385",
    "default": "linear",
    "required": false,
    "description": "Shape of the lines: straight, smooth (monotone) or steps"
  },
  {
    "name": "stacked",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Stacks the series on top of each other"
  },
  {
    "name": "percent",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Scales the stacks to 100% (with `stacked`)"
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
  "LineChartProps": {
    "source": "charts/src/react/types.ts",
    "description": "Props of LineChart",
    "kind": "interface",
    "extends": [
      "ChartCommonProps"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly ChartSeries[]",
        "required": true,
        "description": "Series drawn as lines (or areas with `area`) unless they set a `type`"
      },
      {
        "name": "area",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Fills the area under the lines"
      },
      {
        "name": "curve",
        "type": "ChartCurve",
        "required": false,
        "default": "\"linear\"",
        "description": "Shape of the lines: straight, smooth (monotone) or steps"
      },
      {
        "name": "stacked",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Stacks the series on top of each other"
      },
      {
        "name": "percent",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Scales the stacks to 100% (with `stacked`)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 面积图

area 会填充折线下方的区域；系列的 opacity 决定填充。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/demos/area.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LineChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function AreaDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(3);
    const data: number[] = [];
    let used = 120;
    for (let day = 0; day < 60; day++) {
      used += random() * 12;
      data.push(Math.round(used));
    }
    return [{ name: t("storage"), data, opacity: 0.25 }];
  }, [t]);
  // "512 GB", "512 Go", ...
  const gigabytes = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "gigabyte" }),
    [locale],
  );

  return (
    <LineChart
      series={series}
      area
      xAxis={{ title: t("day") }}
      yAxis={{ zero: true, format: (value) => gigabytes.format(value) }}
      height={280}
      ariaLabel={t("storageAria")}
    />
  );
}

```

## Example: 基础

类目轴上的两个系列；提示框显示悬停 x 处的所有系列。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/demos/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LineChart, type ChartSeries } from "minerva-design/charts";

const thisWeek = [1200, 1350, 1280, 1490, 1610, 980, 870];
const lastWeek = [1100, 1180, 1250, 1300, 1420, 1010, 760];

/** Short weekday names in the reader's language, Monday first */
const weekdays = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
  // 5 January 2026 is a Monday
  return Array.from({ length: 7 }, (_, i) =>
    format.format(new Date(2026, 0, 5 + i)),
  );
};

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const days = weekdays(locale);
    return [
      {
        name: t("thisWeek"),
        data: days.map((day, i) => [day, thisWeek[i]] as const),
      },
      {
        name: t("lastWeek"),
        data: days.map((day, i) => [day, lastWeek[i]] as const),
      },
    ];
  }, [t, locale]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <LineChart
      series={series}
      yAxis={{ format: (value) => number.format(value) }}
      height={280}
      ariaLabel={t("visitorsAria")}
    />
  );
}

```

## Example: 曲线形状

curve 决定点与点之间的形状：linear 用直线段相连，smooth 绘制不会超出数据的单调曲线，step 让每个值保持到下一个点。单个系列也可以设置自己的 curve。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/demos/curves.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  LineChart,
  type ChartCurve,
  type ChartSeries,
} from "minerva-design/charts";

// Average monthly temperatures (°C), January to December
const lisbon = [
  11.6, 12.6, 14.9, 16.2, 18.8, 21.9, 23.6, 24.0, 22.6, 19.4, 15.3, 12.7,
];
const oslo = [
  -4.3, -4.0, -0.2, 4.5, 10.8, 15.2, 16.4, 15.2, 10.8, 5.0, 0.6, -3.2,
];

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

const CURVES: ChartCurve[] = ["linear", "smooth", "step"];

export default function CurvesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const [curve, setCurve] = useState<ChartCurve>("smooth");

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    return [
      {
        name: t("lisbon"),
        data: months.map((m, i) => [m, lisbon[i]] as const),
      },
      { name: t("oslo"), data: months.map((m, i) => [m, oslo[i]] as const) },
    ];
  }, [t, locale]);
  // "12 °C" with the reader's decimal separator
  const celsius = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("curve")}
        direction="horizontal"
        value={curve}
        onChange={(value) => setCurve(value as ChartCurve)}
      >
        {CURVES.map((value) => (
          <Radio key={value} value={value} label={t(`curves.${value}`)} />
        ))}
      </RadioGroup>
      <LineChart
        series={series}
        curve={curve}
        yAxis={{ format: (value) => celsius.format(value) }}
        height={280}
        ariaLabel={t("temperatureAria")}
      />
    </div>
  );
}

```

## Example: 缺失数据

y 为 null 时线条断开，而不是在缺失的读数之间画出误导性的连线。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/demos/gaps.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LineChart, type ChartSeries } from "minerva-design/charts";

// Hourly temperatures (°C); `null` = no reading, the line is interrupted
const indoor = [
  20.8,
  20.6,
  20.4,
  20.3,
  20.1,
  20.0,
  20.4,
  21.0,
  21.6,
  21.9,
  null,
  null,
  null,
  22.8,
  23.0,
  23.1,
  22.9,
  22.6,
  22.3,
  22.0,
  21.7,
  21.4,
  21.2,
  21.0,
];
const outdoor = [
  9.1,
  8.7,
  8.2,
  7.9,
  7.6,
  7.4,
  8.0,
  9.3,
  11.2,
  13.0,
  14.6,
  15.9,
  16.8,
  17.4,
  17.6,
  17.2,
  null,
  null,
  14.1,
  12.8,
  11.7,
  10.9,
  10.2,
  9.6,
];
const hours = Array.from({ length: 24 }, (_, hour) => hour);

export default function GapsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    // the time of day in the reader's language: "14:00", "2 PM"...
    const time = new Intl.DateTimeFormat(locale, { hour: "numeric" });
    const label = (hour: number) => time.format(new Date(2026, 0, 1, hour));
    return [
      {
        name: t("indoor"),
        data: hours.map((hour) => [label(hour), indoor[hour]] as const),
      },
      {
        name: t("outdoor"),
        data: hours.map((hour) => [label(hour), outdoor[hour]] as const),
      },
    ];
  }, [t, locale]);
  const celsius = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <LineChart
        series={series}
        curve="smooth"
        yAxis={{ format: (value) => celsius.format(value) }}
        height={280}
        ariaLabel={t("gapsAria")}
      />
      <p>{t("gapsNote")}</p>
    </div>
  );
}

```

## Example: 指数化表现

四类资产以起点为 100 重新定基；renderTooltip 用 React 列表替换默认内容，按表现从好到差排序，并显示每个系列的颜色及相对基期的涨跌。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/demos/index-tooltip.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
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

const MONTHS = 61; // January 2021 to January 2026
const month = (i: number) => new Date(2021, i, 1).getTime();

/** Monthly random walk rebased to 100 at the first month */
const rebased = (seed: number, drift: number, volatility: number) => {
  const random = mulberry32(seed);
  let level = 100;
  return Array.from({ length: MONTHS }, (_, i) => {
    if (i > 0) level *= 1 + drift + (random() - 0.5) * volatility;
    return [month(i), Math.round(level * 10) / 10] as const;
  });
};

const assets = {
  equities: rebased(3, 0.008, 0.09),
  bonds: rebased(8, -0.0005, 0.03),
  gold: rebased(12, 0.009, 0.07),
  realEstate: rebased(21, 0.002, 0.06),
};

export default function IndexTooltipDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const names = {
      equities: t("assets.equities"),
      bonds: t("assets.bonds"),
      gold: t("assets.gold"),
      realEstate: t("assets.realEstate"),
    };
    return (Object.keys(assets) as (keyof typeof assets)[]).map((key) => ({
      name: names[key],
      data: assets[key],
    }));
  }, [t]);
  const formats = useMemo(
    () => ({
      index: new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
      change: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
      month: new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
      }),
    }),
    [locale],
  );

  // every asset at the hovered month, best performer first
  const renderTooltip = (event: ChartHoverEvent) => {
    const items = [...event.items].sort((a, b) => b.y - a.y);
    return (
      <div style={{ display: "grid", gap: 4, minWidth: 200 }}>
        <strong>{formats.month.format(event.x)}</strong>
        {items.map((item, rank) => (
          <div
            key={item.seriesId}
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto auto",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: item.color,
              }}
            />
            <span style={{ fontWeight: rank === 0 ? 600 : undefined }}>
              {item.seriesName}
            </span>
            <span style={{ textAlign: "end" }}>
              {formats.index.format(item.y)}
            </span>
            <span
              style={{
                textAlign: "end",
                color:
                  item.y >= 100
                    ? "var(--success-color)"
                    : "var(--danger-color)",
              }}
            >
              {formats.change.format(item.y / 100 - 1)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <LineChart
      series={series}
      renderTooltip={renderTooltip}
      crosshair
      annotations={[
        {
          type: "line",
          axis: "y",
          value: 100,
          dash: [4, 4],
          label: t("baseIndex"),
        },
      ]}
      xAxis={{ type: "time", format: (x) => formats.month.format(x) }}
      yAxis={{ format: (y) => formats.index.format(y) }}
      height={320}
      ariaLabel={t("assetsAria")}
    />
  );
}

```

## Example: 1,000,000 个点

时间戳有序的类型化数组列：只绘制可见范围。Ctrl / ⌘ + 滚轮缩放。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/demos/large-data.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  type ChartRendererKind,
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

const COUNT = 1_000_000;
const START = Date.UTC(2026, 0, 1);

export default function LargeDataDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);

  // Columns of typed arrays: no per-point objects, sorted x (one sample per second)
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(2026);
    const x = new Float64Array(COUNT);
    const y = new Float64Array(COUNT);
    let value = 100;
    for (let i = 0; i < COUNT; i++) {
      value += (random() - 0.5) * 0.4;
      x[i] = START + i * 1000;
      y[i] = value;
    }
    return [{ name: t("sensor"), data: { x, y }, lineWidth: 1 }];
  }, [t]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <LineChart
        series={series}
        xAxis={{ type: "time" }}
        onRendererChange={setRenderer}
        height={300}
        ariaLabel={t("sensorAria")}
      />
      <p role="status">
        {t("largeStatus", {
          points: new Intl.NumberFormat(i18n.language).format(COUNT),
          renderer: renderer ?? "…",
        })}
      </p>
    </div>
  );
}

```

## Example: 实时传感器

冷冻柜探头每秒推送一个读数：setInterval 追加新点并移除最旧的点，时间轴始终滑动显示最近一分钟；暂停或卸载时会清除定时器。rect 与虚线 y 标注标出报警区域，屏幕阅读器只播报报警状态。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/demos/live-sensor.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Tag } from "minerva-design";
import {
  LineChart,
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

const SECOND = 1000;
const WINDOW = 60; // one minute of readings
const ALARM = -15; // °C

/** Freezer temperature of reading `i`: sensor noise and a door opened every 45 s */
const reading = (i: number) => {
  const phase = i % 45;
  const door = phase < 12 ? 5.6 * Math.sin((phase / 12) * Math.PI) : 0;
  const noise = (mulberry32(i * 7919)() - 0.5) * 0.6;
  return Math.round((-18.6 + 0.4 * Math.sin(i / 7) + door + noise) * 10) / 10;
};

type Point = readonly [number, number];

/** The last minute of readings, ending now */
const initial = () => {
  const now = Math.floor(Date.now() / SECOND) * SECOND;
  const points: Point[] = Array.from({ length: WINDOW }, (_, i) => [
    now - (WINDOW - 1 - i) * SECOND,
    reading(i + 20),
  ]);
  return { tick: WINDOW + 20, points };
};

export default function LiveSensorDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const [running, setRunning] = useState(true);
  const [feed, setFeed] = useState(initial);

  // one reading a second; the oldest one leaves the window
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setFeed(({ tick, points }) => {
        const last = points[points.length - 1]?.[0] ?? Date.now();
        return {
          tick: tick + 1,
          points: [...points.slice(1), [last + SECOND, reading(tick)]],
        };
      });
    }, SECOND);
    return () => clearInterval(timer);
  }, [running]);

  const series = useMemo(
    (): ChartSeries[] => [{ name: t("freezer"), data: feed.points }],
    [t, feed.points],
  );
  const celsius = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    [locale],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        y0: ALARM,
        color: "var(--danger-color)",
        opacity: 0.08,
      },
      {
        type: "line",
        axis: "y",
        value: ALARM,
        color: "var(--danger-color)",
        dash: [4, 4],
        label: t("alarmLimit", { value: celsius.format(ALARM) }),
      },
    ],
    [t, celsius],
  );

  const [lastTime, lastValue] = feed.points[feed.points.length - 1] ?? [0, 0];
  const above = feed.points.filter(([, value]) => value > ALARM).length;
  const alarm = lastValue > ALARM;

  return (
    <div style={{ display: "grid", gap: 10, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
        {/* only the state is announced, not every reading */}
        <output aria-live="polite">
          <Tag color={alarm ? "danger" : "success"} size="small">
            {alarm ? t("sensorAlarm") : t("sensorNormal")}
          </Tag>
        </output>
        <span style={{ fontSize: 13, color: "var(--text-secondary-color)" }}>
          {t("lastReading", {
            value: celsius.format(lastValue),
            time: time.format(lastTime),
          })}
          {" · "}
          {t("aboveLimit", { readings: above })}
        </span>
      </div>
      <LineChart
        series={series}
        annotations={annotations}
        curve="smooth"
        xAxis={{ type: "time", format: (value) => time.format(value) }}
        yAxis={{ min: -22, max: -10, format: (value) => celsius.format(value) }}
        legend={false}
        height={280}
        ariaLabel={t("freezerAria")}
      />
    </div>
  );
}

```

## Example: 对数刻度

yAxis={{ type: "log" }} 让指数增长呈现为直线，几小时的迟滞期和从 10³ 到 10⁹ 的菌量都能同时看清；用开关可与线性刻度对比。刻度由 notation: "scientific" 的 Intl.NumberFormat 生成。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/demos/log-scale.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  LineChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

/**
 * Bacteria (colony-forming units per mL) after `hour` hours: a lag phase,
 * then logistic growth from `start` up to the `capacity` of the medium
 */
const growth = (
  hour: number,
  start: number,
  capacity: number,
  rate: number,
  lag: number,
) =>
  hour <= lag
    ? start
    : capacity / (1 + (capacity / start - 1) * Math.exp(-rate * (hour - lag)));

const hours = Array.from({ length: 49 }, (_, i) => i / 2);
const strains = {
  wild: { capacity: 2e9, rate: 1.4, lag: 2 },
  mutant: { capacity: 6e8, rate: 0.9, lag: 3 },
  antibiotic: { capacity: 4e5, rate: 0.55, lag: 5 },
};
const START = 1e3;

export default function LogScaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const [log, setLog] = useState(true);

  const series = useMemo((): ChartSeries[] => {
    const names = {
      wild: t("strains.wild"),
      mutant: t("strains.mutant"),
      antibiotic: t("strains.antibiotic"),
    };
    return (Object.keys(strains) as (keyof typeof strains)[]).map((key) => {
      const { capacity, rate, lag } = strains[key];
      return {
        name: names[key],
        data: hours.map(
          (hour) => [hour, growth(hour, START, capacity, rate, lag)] as const,
        ),
      };
    });
  }, [t]);
  // "1E9", "1E3"...: the same notation on both scales
  const scientific = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        notation: "scientific",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const hourUnit = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "hour",
        unitDisplay: "narrow",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        x0: 3,
        x1: 12,
        color: "var(--primary-color)",
        opacity: 0.06,
        label: t("exponentialPhase"),
      },
    ],
    [t],
  );
  // doubling time of the wild type while it grows exponentially
  const doubling = (Math.LN2 / strains.wild.rate) * 60;
  const minutes = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "minute",
    unitDisplay: "long",
    maximumFractionDigits: 0,
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch checked={log} onChange={setLog} label={t("logScale")} />
      <LineChart
        series={series}
        annotations={annotations}
        curve="smooth"
        xAxis={{
          title: t("elapsed"),
          format: (value) => hourUnit.format(value),
        }}
        yAxis={{
          type: log ? "log" : "linear",
          title: t("cfu"),
          format: (value) => scientific.format(value),
        }}
        height={320}
        ariaLabel={t("growthAria")}
      />
      <p style={{ margin: 0, color: "var(--text-secondary-color)" }}>
        {log
          ? t("logNote", { minutes: minutes.format(doubling) })
          : t("linearNote")}
      </p>
    </div>
  );
}

```

## Example: 两点间测量

onPointClick 最多固定两天，下方读数显示两者之间的变化；x 方向参考线和绿色或红色的 rect 标出该区间，点击空白处触发 onPlotClick 清除测量。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/demos/measure.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  LineChart,
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
// local midnight: the time axis places its ticks in local time
const START = new Date(2026, 0, 1).getTime();

// Value of a portfolio (EUR) at the end of every day of 2026
const random = mulberry32(64);
let value = 250_000;
const portfolio = Array.from({ length: 300 }, (_, i) => {
  value *= 1 + (random() - 0.47) * 0.018 + Math.sin(i / 40) * 0.002;
  return [START + i * DAY, Math.round(value)] as const;
});

interface Pin {
  x: number;
  y: number;
}

export default function MeasureDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  // up to two clicked points; a third click starts a new measurement
  const [pins, setPins] = useState<Pin[]>([]);

  const series = useMemo(
    (): ChartSeries[] => [{ name: t("portfolio"), data: portfolio }],
    [t],
  );
  const formats = useMemo(
    () => ({
      eur: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
      compact: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        notation: "compact",
      }),
      change: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
        signDisplay: "exceptZero",
      }),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 2,
        signDisplay: "exceptZero",
      }),
      days: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "day",
        unitDisplay: "long",
      }),
      date: new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
      }),
    }),
    [locale],
  );

  const onPointClick = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return;
    setPins((current) => [
      ...(current.length >= 2 ? [] : current),
      { x: item.x, y: item.y },
    ]);
  };

  // the two pins in time order
  const [from, to] = [...pins].sort((a, b) => a.x - b.x);
  const rising = from && to ? to.y >= from.y : true;
  const annotations = useMemo((): ChartAnnotation[] => {
    const lines: ChartAnnotation[] = pins.map((pin) => ({
      type: "line",
      axis: "x",
      value: pin.x,
      color: "var(--primary-color)",
      dash: [4, 4],
      label: formats.date.format(pin.x),
    }));
    if (!from || !to) return lines;
    return [
      {
        type: "rect",
        x0: from.x,
        x1: to.x,
        color: rising ? "var(--success-color)" : "var(--danger-color)",
        opacity: 0.1,
      },
      ...lines,
    ];
  }, [pins, from, to, rising, formats]);

  let summary = t("measureHint");
  if (from && to) {
    summary = t("measureResult", {
      from: formats.date.format(from.x),
      to: formats.date.format(to.x),
      change: formats.change.format(to.y - from.y),
      percent: formats.percent.format(to.y / from.y - 1),
      days: formats.days.format(Math.round((to.x - from.x) / DAY)),
    });
  } else if (from) {
    summary = t("measureStart", {
      date: formats.date.format(from.x),
      value: formats.eur.format(from.y),
    });
  }

  return (
    <div style={{ display: "grid", gap: 10, width: "100%" }}>
      <LineChart
        series={series}
        annotations={annotations}
        onPointClick={onPointClick}
        onPlotClick={() => setPins([])}
        tooltip={{ mode: "nearest" }}
        crosshair
        xAxis={{ type: "time", format: (x) => formats.date.format(x) }}
        yAxis={{ format: (y) => formats.compact.format(y) }}
        legend={false}
        height={300}
        ariaLabel={t("portfolioAria")}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Button
          size="small"
          variant="outline"
          disabled={pins.length === 0}
          onClick={() => setPins([])}
        >
          {t("clear")}
        </Button>
        <output
          aria-live="polite"
          style={{
            color:
              from && to
                ? rising
                  ? "var(--success-color)"
                  : "var(--danger-color)"
                : undefined,
          }}
        >
          {summary}
        </output>
      </div>
    </div>
  );
}

```

## Example: 小多图

在 CSS 网格中为每个城市放一个小型 LineChart，所有图表使用相同的 yAxis min 和 max，便于一眼比较；interaction={false} 让它们保持静态，虚线 y 参考线标出世卫组织的指导值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/demos/small-multiples.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
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
const START = new Date(2026, 10, 1).getTime();
const GUIDELINE = 15; // µg/m³, daily guideline of the World Health Organization
const MAX = 120; // one y range for every panel, so they compare at a glance

// Daily mean of fine particles (PM2.5) over 30 days in six cities
const cities = [
  { key: "delhi", base: 78, swing: 30 },
  { key: "beijing", base: 42, swing: 28 },
  { key: "paris", base: 14, swing: 8 },
  { key: "mexicoCity", base: 24, swing: 10 },
  { key: "tokyo", base: 10, swing: 5 },
  { key: "saoPaulo", base: 17, swing: 7 },
] as const;
const readings = cities.map(({ key, base, swing }, c) => {
  const random = mulberry32(100 + c);
  const data = Array.from({ length: 30 }, (_, i) => {
    const weather = Math.sin(i / 3.2 + c) * 0.6 + (random() - 0.5) * 0.8;
    const value = Math.max(3, base + swing * weather);
    return [START + i * DAY, Math.round(value)] as const;
  });
  return { key, data };
});

export default function SmallMultiplesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const date = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const micrograms = useMemo(
    () => (value: number) => t("micrograms", { value: number.format(value) }),
    [t, number],
  );

  const panels = useMemo(
    () =>
      readings.map(({ key, data }) => {
        const name = t(`cities.${key}`);
        // the unit in the tooltip, bare numbers on the small axes
        const series: ChartSeries[] = [
          { name, data, opacity: 0.18, format: micrograms },
        ];
        const above = data.filter(([, value]) => value > GUIDELINE).length;
        return { key, name, series, above };
      }),
    [t, micrograms],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "line",
        axis: "y",
        value: GUIDELINE,
        color: "var(--warning-color)",
        dash: [3, 3],
      },
    ],
    [],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <p style={{ margin: 0, color: "var(--text-secondary-color)" }}>
        {t("guidelineNote", { value: micrograms(GUIDELINE) })}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {panels.map((panel) => (
          <figure key={panel.key} style={{ margin: 0, minWidth: 0 }}>
            <figcaption
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
                fontSize: 13,
              }}
            >
              <strong>{panel.name}</strong>
              <span style={{ color: "var(--text-secondary-color)" }}>
                {t("daysAbove", { days: panel.above, total: 30 })}
              </span>
            </figcaption>
            <LineChart
              series={panel.series}
              area
              curve="smooth"
              annotations={annotations}
              interaction={false}
              legend={false}
              xAxis={{
                type: "time",
                tickCount: 3,
                format: (x) => date.format(x),
              }}
              yAxis={{
                min: 0,
                max: MAX,
                tickCount: 3,
                format: (y) => number.format(y),
              }}
              height={150}
              ariaLabel={t("pmAria", { city: panel.name })}
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

```

## Example: 堆叠

stacked 将各系列逐层堆叠，最上方的线即为总量；percent 则把堆叠换算为 100% 的占比。y 轴的 format 会替换百分比刻度，因此只在显示金额时设置。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/demos/stacked.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { LineChart, type ChartSeries } from "minerva-design/charts";

// Monthly cloud spend by service (USD), January to December
const spend = {
  compute: [
    18_400, 19_100, 20_600, 21_000, 22_800, 24_100, 23_500, 25_900, 27_200,
    28_000, 29_400, 31_800,
  ],
  storage: [
    6_200, 6_500, 6_900, 7_400, 7_800, 8_300, 8_900, 9_400, 9_800, 10_500,
    11_100, 11_900,
  ],
  network: [
    3_100, 2_900, 3_600, 4_200, 3_800, 4_600, 5_300, 4_900, 5_200, 5_800, 6_400,
    7_100,
  ],
  databases: [
    9_800, 9_900, 10_200, 10_100, 10_800, 11_200, 11_000, 11_600, 12_100,
    12_400, 12_300, 12_900,
  ],
};

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function StackedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const [mode, setMode] = useState("stacked");
  const percent = mode === "percent";

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    // full amounts in the tooltip, also in 100% mode
    const amount = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    const names = {
      compute: t("services.compute"),
      storage: t("services.storage"),
      network: t("services.network"),
      databases: t("services.databases"),
    };
    return (Object.keys(spend) as (keyof typeof spend)[]).map((key) => ({
      name: names[key],
      format: (value: number) => amount.format(value),
      data: months.map((month, i) => [month, spend[key][i]] as const),
    }));
  }, [t, locale]);
  // "$32K", "32 k $US", "3.2万 US$"... depending on the language
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("stackMode")}
        direction="horizontal"
        value={mode}
        onChange={(value) => setMode(String(value))}
      >
        <Radio value="stacked" label={t("stacked")} />
        <Radio value="percent" label="100%" />
      </RadioGroup>
      <LineChart
        series={series}
        area
        stacked
        percent={percent}
        // a y format replaces the percent ticks: only set it for amounts
        yAxis={percent ? undefined : { format: (v) => usd.format(v) }}
        height={300}
        ariaLabel={t("spendAria")}
      />
    </div>
  );
}

```

## Example: 阈值

服务器延迟分位数，虚线表示目标值，红色区域表示超过临界值的范围，超标情况一目了然。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/demos/thresholds.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

const MINUTE = 60 * 1000;
// 08:00 local time: the time axis places its ticks in local time
const START = new Date(2026, 9, 12, 8).getTime();
const TARGET = 300; // ms, p95 objective
const CRITICAL = 450; // ms

// API latency every 5 minutes over 6 hours, with an incident around 11:00
const latency = (base: number, spread: number) =>
  Array.from({ length: 72 }, (_, i) => {
    const incident = Math.max(0, 1 - Math.abs(i - 36) / 6);
    const noise = Math.sin(i * 1.3) * 0.08 + Math.cos(i * 0.7) * 0.05;
    return [
      START + i * 5 * MINUTE,
      Math.round(base * (1 + noise) + spread * incident),
    ] as const;
  });
const p50 = latency(120, 140);
const p95 = latency(240, 330);

export default function ThresholdsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("median"), data: p50 },
      { name: t("p95"), data: p95 },
    ],
    [t],
  );
  const ms = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "millisecond" }),
    [locale],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        y0: CRITICAL,
        color: "var(--danger-color)",
        opacity: 0.1,
        label: t("critical"),
      },
      {
        type: "line",
        axis: "y",
        value: TARGET,
        color: "var(--warning-color)",
        dash: [6, 4],
        label: t("target", { value: ms.format(TARGET) }),
      },
    ],
    [t, ms],
  );
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [locale],
  );

  return (
    <LineChart
      series={series}
      annotations={annotations}
      crosshair
      xAxis={{ type: "time", format: (value) => time.format(value) }}
      yAxis={{ min: 0, max: 700, format: (value) => ms.format(value) }}
      height={300}
      ariaLabel={t("latencyAria")}
    />
  );
}

```

## Example: 时间序列

x 为日期时切换为时间轴；Intl.DateTimeFormat 与 Intl.NumberFormat 按读者的语言书写日期和紧凑的 y 轴刻度。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/demos/time-series.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LineChart, type ChartSeries } from "minerva-design/charts";

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
// local midnight: the time axis places its ticks in local time
const START = new Date(2026, 0, 1).getTime();

export default function TimeSeriesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(11);
    const daily = (base: number) =>
      Array.from({ length: 180 }, (_, i) => {
        const weekend = new Date(START + i * DAY).getDay() % 6 === 0;
        const trend = base * (1 + i / 300);
        const value = trend * (weekend ? 0.6 : 1) * (0.9 + random() * 0.2);
        return [new Date(START + i * DAY), Math.round(value)] as const;
      });
    return [
      { name: t("pageViews"), data: daily(42_000) },
      { name: t("sessions"), data: daily(18_000) },
    ];
  }, [t]);

  const compact = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
    [locale],
  );
  // "12 Mar", "3月12日", "12 mars"...: used by the ticks and the tooltip
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
      }),
    [locale],
  );

  return (
    <LineChart
      series={series}
      xAxis={{ type: "time", format: (value) => date.format(value) }}
      yAxis={{ format: (value) => compact.format(value) }}
      height={300}
      ariaLabel={t("trafficAria")}
    />
  );
}

```

## Example: 带事件标注的流量

每日访客数，用虚线标出产品发布日，用阴影区域标出故障期：标注使用与数据相同的时间戳。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/demos/traffic-events.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

const DAY = 24 * 60 * 60 * 1000;
// local midnight: the time axis places its ticks in local time
const START = new Date(2026, 2, 1).getTime();
const LAUNCH = START + 34 * DAY;
const OUTAGE = [START + 61 * DAY, START + 64 * DAY] as const;

// Daily unique visitors over 90 days: weekly rhythm, a launch spike and an outage
const visitors = Array.from({ length: 90 }, (_, i) => {
  const time = START + i * DAY;
  const weekday = new Date(time).getDay();
  const weekly = weekday === 0 || weekday === 6 ? 0.7 : 1;
  const launch = i >= 34 ? 1.35 + 1.4 * Math.exp(-(i - 34) / 3) : 1;
  const outage = time >= OUTAGE[0] && time < OUTAGE[1] ? 0.35 : 1;
  const value = 8200 * weekly * launch * outage * (1 + Math.sin(i * 1.7) / 20);
  return [time, Math.round(value)] as const;
});

export default function TrafficEventsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [{ name: t("visitors"), data: visitors }],
    [t],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "line",
        axis: "x",
        value: LAUNCH,
        color: "var(--success-color)",
        dash: [4, 4],
        label: t("launch"),
      },
      {
        type: "rect",
        x0: OUTAGE[0],
        x1: OUTAGE[1],
        color: "var(--danger-color)",
        opacity: 0.12,
        label: t("outage"),
        labelPosition: "top-right",
      },
    ],
    [t],
  );
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
      }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <LineChart
      series={series}
      annotations={annotations}
      area
      xAxis={{ type: "time", format: (value) => date.format(value) }}
      yAxis={{ format: (value) => number.format(value) }}
      height={300}
      ariaLabel={t("eventsAria")}
    />
  );
}

```

## Example: 区间选择

周期按钮调用图表 ref 的 setView，设置可见窗口，并让 y 轴范围贴合窗口内的价格；Ctrl / ⌘ + 滚轮与拖动依然可用。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/demos/zoom.tsx

```tsx
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  LineChart,
  type ChartHandle,
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
// local midnight: the time axis places its ticks in local time
const END = new Date(2026, 9, 30).getTime();
const DAYS = 2 * 365;

// Two years of daily closing prices (a random walk with a slight upward drift)
const random = mulberry32(7);
const closes: [number, number][] = [];
let price = 84;
for (let i = DAYS - 1; i >= 0; i--) {
  price *= 1 + (random() - 0.48) * 0.035;
  closes.push([END - i * DAY, Math.round(price * 100) / 100]);
}

const RANGES = { "1m": 30, "3m": 91, "6m": 182, "1y": 365, all: DAYS } as const;
type Range = keyof typeof RANGES;

export default function ZoomDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const locale = i18n.language;
  const chart = useRef<ChartHandle>(null);
  const [range, setRange] = useState<Range>("all");

  const series = useMemo(
    (): ChartSeries[] => [{ name: t("close"), data: closes }],
    [t],
  );
  const usd = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }),
    [locale],
  );
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    [locale],
  );

  const select = (next: Range) => {
    setRange(next);
    // the visible window, with the y range fitted to the prices inside it
    const from = END - (RANGES[next] - 1) * DAY;
    const visible = closes.filter(([time]) => time >= from).map(([, y]) => y);
    const low = Math.min(...visible);
    const high = Math.max(...visible);
    const margin = (high - low) * 0.08;
    chart.current?.setView({
      x: [from, END],
      y: [low - margin, high + margin],
    });
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("period")}
        direction="horizontal"
        value={range}
        onChange={(value) => select(value as Range)}
      >
        {(Object.keys(RANGES) as Range[]).map((key) => (
          <Radio key={key} value={key} label={t(`ranges.${key}`)} />
        ))}
      </RadioGroup>
      <LineChart
        ref={chart}
        series={series}
        area
        xAxis={{ type: "time", format: (value) => date.format(value) }}
        yAxis={{ format: (value) => usd.format(value) }}

        height={300}
        ariaLabel={t("priceAria")}
      />
    </div>
  );
}

```
