# 气泡图

用点的大小表示第三个数值的散点图：气泡面积与数值成正比。

Package: minerva-design@1.22.1

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

亚洲

欧洲

美洲

非洲

人口

人均 GDP

预期寿命（岁）

各国人均 GDP、预期寿命与人口

产品

收入

云存储

数据分析

移动 SDK

支付

桌面应用

硬件

咨询

相对市场份额

市场增长率

市场领先

高增长

各产品的市场份额、增长率与收入

已确认

方案

谈判

金额

商机 #{{id}}

在管道中的天数

赢单概率

{{deal}}（{{stage}}）：{{amount}}

点击一个气泡

按时长、赢单概率和金额展示的进行中商机

人均 GDP（对数坐标）

高收入

对数坐标下的人均 GDP 与预期寿命，气泡大小表示人口

可见收入范围：{{from}} – {{to}}

缩放后显示以美元计的可见范围

基础设施

安全

人员

预算

敞口

停电

硬件交付延迟

网络割接

数据泄露

权限审查积压

关键人员离职

供应商技能不足

培训缺口

许可费用上涨

汇率波动

可接受

严重

可能性 {{likelihood}} × 影响 {{impact}} = {{score}}

敞口：{{value}}

可能性

影响

按可能性、影响和成本敞口排列的项目风险

搜索

社交

视频

邮件

预算

上线于 {{date}}

上线日期

广告支出回报率

盈亏平衡

按上线日期、广告支出回报率和预算排列的营销活动

北区

南区

东区

西区

中区

两个图表使用相同的大小比例

两个图表都用最大的气泡表示 {{value}}。

每个图表都用最大的气泡表示自身的最高营收。

每平方米销售额

利润率

{{year}} 年各门店区域的每平方米销售额、利润率和营收

播放

暂停

重播

重新开始

年份：{{year}}

生育率（每名女性生育子女数）

1990 年至 2025 年各国的生育率、预期寿命和人口

## BubbleChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "BubbleChart"
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
    "description": "Series of points with a `value` sizing their bubble (area ∝ value)"
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
  },
  {
    "name": "minSize",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 6,
    "required": false,
    "description": "Diameter in pixels of the smallest bubbles"
  },
  {
    "name": "maxSize",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 48,
    "required": false,
    "description": "Diameter in pixels of the largest value"
  },
  {
    "name": "maxValue",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Value drawn with `maxSize` (share a scale between charts); the largest value by default"
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
  "BubbleChartProps": {
    "source": "charts/src/react/types.ts",
    "description": "Props of BubbleChart",
    "kind": "interface",
    "extends": [
      "ChartCommonProps",
      "BubbleOptions"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly ChartSeries[]",
        "required": true,
        "description": "Series of points with a `value` sizing their bubble (area ∝ value)"
      }
    ]
  },
  "BubbleOptions": {
    "source": "charts/src/engine/presets.ts",
    "description": "Options of `bubbleSeries`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "minSize",
        "type": "number",
        "required": false,
        "default": "6",
        "description": "Diameter in pixels of the smallest bubbles"
      },
      {
        "name": "maxSize",
        "type": "number",
        "required": false,
        "default": "48",
        "description": "Diameter in pixels of the largest value"
      },
      {
        "name": "maxValue",
        "type": "number",
        "required": false,
        "description": "Value drawn with `maxSize` (share a scale between charts); the largest value by default"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 营销活动

营销活动按上线日期（xAxis.type: "time"）和广告支出回报率排列，气泡大小表示预算，每个渠道一个系列；line 标注标出盈亏平衡线，点击图例项可切换渠道。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bubble-chart/demos/campaigns.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BubbleChart, type ChartSeries } from "minerva-design/charts";

// Marketing campaigns of 2026: launch (month, day), return on ad spend and
// budget (k$), by channel
const campaigns = {
  search: [
    [0, 12, 3.4, 42],
    [2, 3, 2.9, 55],
    [4, 20, 3.8, 38],
    [7, 8, 3.1, 61],
    [9, 15, 4.2, 47],
  ],
  social: [
    [1, 6, 1.6, 70],
    [3, 18, 0.8, 85],
    [5, 2, 1.9, 52],
    [8, 11, 2.3, 64],
    [10, 24, 1.2, 90],
  ],
  video: [
    [2, 22, 0.6, 120],
    [6, 1, 1.4, 140],
    [9, 4, 0.9, 110],
  ],
  email: [
    [0, 28, 5.6, 8],
    [3, 9, 4.8, 12],
    [5, 27, 6.3, 6],
    [8, 2, 5.1, 10],
    [11, 1, 7.2, 14],
  ],
} as const;
type Channel = keyof typeof campaigns;

export default function CampaignsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;

  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const month = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, {
      month: "short",
      timeZone: "UTC",
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const roas = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) => `${format.format(value)}×`;
  }, [locale]);

  const series = useMemo((): ChartSeries[] => {
    const day = new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
    return (Object.keys(campaigns) as Channel[]).map((channel) => ({
      name: t(`channels.${channel}`),
      valueName: t("budget"),
      format: usd,
      data: campaigns[channel].map(([m, d, ratio, budget]) => {
        const launch = Date.UTC(2026, m, d);
        return {
          x: launch,
          y: ratio,
          value: budget,
          label: t("launchedOn", { date: day.format(launch) }),
        };
      }),
    }));
  }, [t, locale, usd]);

  // click the legend items to hide or show a channel
  return (
    <BubbleChart
      series={series}
      minSize={8}
      maxSize={48}
      legend={{ position: "bottom", toggle: true }}
      xAxis={{
        type: "time",
        min: Date.UTC(2025, 11, 15),
        max: Date.UTC(2026, 11, 20),
        format: month,
        title: t("launch"),
      }}
      yAxis={{ title: t("roas"), min: 0, max: 8, format: roas }}
      annotations={[
        {
          type: "rect",
          y1: 1,
          color: "var(--danger-color)",
          opacity: 0.08,
        },
        {
          type: "line",
          axis: "y",
          value: 1,
          color: "var(--danger-color)",
          dash: [4, 4],
          label: t("breakEven"),
        },
      ]}
      height={380}
      ariaLabel={t("campaignsAria")}
    />
  );
}

```

## Example: 国家对比

人均 GDP 与预期寿命，气泡大小表示人口，颜色区分大洲；valueName 和 format 设置提示框中数值的名称和格式。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bubble-chart/demos/countries.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BubbleChart, type ChartSeries } from "minerva-design/charts";

// GDP per capita (k$, PPP), life expectancy (years) and population
// (millions) of a few countries, by continent
const countries = {
  asia: [
    ["CN", 23.3, 78.6, 1410],
    ["IN", 9.2, 70.8, 1430],
    ["JP", 47.0, 84.7, 124],
    ["ID", 15.0, 71.9, 278],
    ["KR", 51.0, 83.7, 52],
  ],
  europe: [
    ["DE", 66.0, 81.0, 84],
    ["FR", 58.0, 82.8, 68],
    ["GB", 54.0, 81.3, 68],
    ["PL", 45.0, 78.6, 37],
  ],
  americas: [
    ["US", 80.0, 77.5, 335],
    ["BR", 20.0, 75.9, 216],
    ["MX", 23.0, 75.1, 129],
    ["CA", 58.0, 82.6, 40],
  ],
  africa: [
    ["NG", 5.9, 54.5, 224],
    ["EG", 17.0, 71.6, 113],
    ["ZA", 15.0, 64.9, 60],
    ["ET", 3.0, 66.6, 127],
  ],
} as const;

export default function CountriesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const names = new Intl.DisplayNames([locale], { type: "region" });
    const millions = new Intl.NumberFormat(locale, { notation: "compact" });
    return (Object.keys(countries) as (keyof typeof countries)[]).map((c) => ({
      name: t(`continents.${c}`),
      valueName: t("population"),
      format: (value: number) => millions.format(value * 1e6),
      data: countries[c].map(([code, gdp, life, population]) => ({
        x: gdp,
        y: life,
        value: population,
        label: names.of(code) ?? code,
      })),
    }));
  }, [t, locale]);
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  // the bubble areas are proportional to the populations
  return (
    <BubbleChart
      series={series}
      maxSize={64}
      xAxis={{ title: t("gdp"), format: usd, min: 0, max: 90 }}
      yAxis={{ title: t("lifeExpectancy") }}
      height={380}
      ariaLabel={t("countriesAria")}
    />
  );
}

```

## Example: 对数坐标

人均收入从 900 美元到 14 万美元：xAxis.type: "log" 让它们均匀分布（在任何位置 ×10 的距离都相同），刻度位于每个数量级的 1、2、5。默认范围不再取整个数量级，而是对齐到包含数据的最近 1、2、5 × 10^k 边界（500 美元至 20 万美元），xAxis.min / max 可覆盖；标注和提示框使用美元数值，onZoom 报告的可见范围也是美元而不是对数（Ctrl / ⌘ + 滚轮或双指缩放）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bubble-chart/demos/log-scale.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BubbleChart,
  type ChartSeries,
  type ChartView,
} from "minerva-design/charts";

// GDP per capita (US$, PPP), life expectancy (years) and population
// (millions): incomes span two orders of magnitude, a log axis spreads them
const countries = {
  africa: [
    ["BI", 900, 62.0, 13],
    ["CD", 1_500, 59.7, 102],
    ["ET", 3_000, 66.6, 127],
    ["NG", 5_900, 54.5, 224],
    ["KE", 6_000, 62.7, 55],
    ["MA", 9_800, 75.0, 37],
    ["ZA", 15_000, 64.9, 60],
    ["EG", 17_000, 71.6, 113],
  ],
  asia: [
    ["PK", 6_400, 66.4, 240],
    ["BD", 8_600, 73.7, 173],
    ["IN", 9_200, 70.8, 1430],
    ["ID", 15_000, 71.9, 278],
    ["CN", 23_300, 78.6, 1410],
    ["JP", 47_000, 84.7, 124],
    ["SG", 133_000, 83.7, 6],
  ],
  europe: [
    ["UA", 15_000, 73.0, 37],
    ["PL", 45_000, 78.6, 37],
    ["FR", 58_000, 82.8, 68],
    ["DE", 66_000, 81.0, 84],
    ["NO", 90_000, 83.2, 5.5],
    ["LU", 140_000, 83.0, 0.7],
  ],
  americas: [
    ["HT", 3_200, 63.7, 12],
    ["BR", 20_000, 75.9, 216],
    ["MX", 23_000, 75.1, 129],
    ["AR", 27_000, 76.1, 46],
    ["CA", 58_000, 82.6, 40],
    ["US", 80_000, 77.5, 335],
  ],
} as const;

export default function LogScaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;
  const [view, setView] = useState<ChartView | null>(null);

  const series = useMemo((): ChartSeries[] => {
    const names = new Intl.DisplayNames([locale], { type: "region" });
    const people = new Intl.NumberFormat(locale, { notation: "compact" });
    return (Object.keys(countries) as (keyof typeof countries)[]).map((c) => ({
      name: t(`continents.${c}`),
      valueName: t("population"),
      format: (value: number) => people.format(value * 1e6),
      data: countries[c].map(([code, gdp, life, population]) => ({
        x: gdp,
        y: life,
        value: population,
        label: names.of(code) ?? code,
      })),
    }));
  }, [t, locale]);
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value);
  }, [locale]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <BubbleChart
        series={series}
        maxSize={56}
        // ×10 income = the same distance anywhere on the axis
        xAxis={{
          type: "log",
          title: t("gdpLog"),
          format: usd,
          grid: true,
        }}
        yAxis={{ title: t("lifeExpectancy") }}
        annotations={[
          {
            type: "line",
            axis: "x",
            value: 13_845,
            label: t("highIncome"),
          },
        ]}
        // the view is in dollars, not in logarithms
        onZoom={setView}
        height={400}
        ariaLabel={t("logAria")}
      />
      <span style={{ fontSize: 13, color: "var(--text-secondary-color)" }}>
        {view
          ? t("visibleIncomes", { from: usd(view.x[0]), to: usd(view.x[1]) })
          : t("zoomHint")}
      </span>
    </div>
  );
}

```

## Example: 销售管道

在管道中的天数与赢单概率，气泡大小表示金额；onPointClick 接收被点击气泡的数值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bubble-chart/demos/pipeline.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BubbleChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const stages = ["qualified", "proposal", "negotiation"] as const;

// Open deals of a sales team: days in the pipeline, win probability and
// amount (k$)
const deals = (() => {
  const random = mulberry32(3);
  return stages.map((stage, s) =>
    Array.from({ length: 14 }, (_, i) => ({
      id: `${stage}-${i}`,
      days: Math.round(5 + random() * 40 + s * 18),
      probability: Math.min(95, Math.round(15 + s * 25 + random() * 25)),
      amount: Math.round(8 + random() ** 2 * 180),
    })),
  );
})();

export default function PipelineDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<string | null>(null);
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] =>
      stages.map((stage, s) => ({
        name: t(`stages.${stage}`),
        valueName: t("amount"),
        format: usd,
        data: (deals[s] ?? []).map((d) => ({
          x: d.days,
          y: d.probability,
          value: d.amount,
          label: t("deal", { id: d.id.split("-")[1] }),
        })),
      })),
    [t, usd],
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <BubbleChart
        series={series}
        maxSize={44}
        xAxis={{ title: t("daysInPipeline") }}
        yAxis={{
          title: t("winProbability"),
          format: (v) => `${v}%`,
          min: 0,
          max: 100,
        }}
        onPointClick={(event) => {
          const item = event.items[0];
          if (item?.value !== undefined)
            setSelected(
              t("dealStatus", {
                deal: item.label,
                stage: item.seriesName,
                amount: usd(item.value),
              }),
            );
        }}
        height={340}
        ariaLabel={t("pipelineAria")}
      />
      <div role="status" style={{ color: "var(--text-secondary-color)" }}>
        {selected ?? t("clickBubble")}
      </div>
    </div>
  );
}

```

## Example: 逐年动画

1990 年至 2025 年的生育率与预期寿命，用 setInterval 逐年播放（暂停和卸载时清除）。固定的坐标轴范围和恒定的 maxValue 让各帧可以比较，text 标注显示年份。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bubble-chart/demos/playback.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { BubbleChart, type ChartSeries } from "minerva-design/charts";

const START = 1990;
const END = 2025;

// Fertility (children per woman), life expectancy (years) and population
// (millions) in 1990 and 2025, approximate, by continent
const countries = {
  asia: [
    ["CN", 2.5, 1.0, 69, 78, 1135, 1410],
    ["IN", 4.0, 2.0, 58, 72, 870, 1450],
    ["BD", 4.5, 2.0, 58, 74, 107, 175],
    ["JP", 1.5, 1.2, 79, 85, 124, 123],
  ],
  europe: [
    ["DE", 1.5, 1.4, 75, 81, 79, 84],
    ["IT", 1.3, 1.2, 77, 84, 57, 59],
    ["PL", 2.0, 1.2, 71, 78, 38, 37],
  ],
  americas: [
    ["US", 2.1, 1.6, 75, 79, 250, 345],
    ["BR", 2.8, 1.6, 66, 76, 150, 212],
    ["MX", 3.4, 1.8, 70, 75, 84, 131],
  ],
  africa: [
    ["NG", 6.4, 4.5, 46, 55, 95, 233],
    ["ET", 7.1, 3.9, 47, 67, 48, 132],
    ["EG", 4.4, 2.7, 64, 72, 57, 117],
    ["KE", 6.0, 3.2, 57, 64, 24, 57],
  ],
} as const;
type Continent = keyof typeof countries;
const largest = Math.max(
  ...Object.values(countries).flatMap((rows) => rows.map((row) => row[6])),
);

/** Smooth interpolation between the 1990 and the 2025 values */
const between = (from: number, to: number, year: number) => {
  const p = (year - START) / (END - START);
  return from + (to - from) * (p * p * (3 - 2 * p));
};

export default function PlaybackDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;
  const [year, setYear] = useState(START);
  const [playing, setPlaying] = useState(false);
  const atEnd = year >= END;

  // one year every 300 ms, stops on the last year
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(
      () => setYear((value) => Math.min(value + 1, END)),
      300,
    );
    return () => clearInterval(timer);
  }, [playing]);

  const series = useMemo((): ChartSeries[] => {
    const names = new Intl.DisplayNames([locale], { type: "region" });
    const people = new Intl.NumberFormat(locale, { notation: "compact" });
    return (Object.keys(countries) as Continent[]).map((continent) => ({
      name: t(`continents.${continent}`),
      valueName: t("population"),
      format: (value: number) => people.format(value * 1e6),
      data: countries[continent].map(
        ([code, f0, f1, life0, life1, pop0, pop1]) => ({
          x: between(f0, f1, year),
          y: between(life0, life1, year),
          value: between(pop0, pop1, year),
          label: names.of(code) ?? code,
        }),
      ),
    }));
  }, [t, locale, year]);
  const yearText = new Intl.NumberFormat(locale, {
    useGrouping: false,
  }).format(year);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Button
          size="small"
          variant="outline"
          onClick={() => {
            if (atEnd) setYear(START);
            setPlaying(atEnd || !playing);
          }}
        >
          {atEnd ? t("replay") : playing ? t("pause") : t("play")}
        </Button>
        <Button
          size="small"
          variant="ghost"
          onClick={() => {
            setPlaying(false);
            setYear(START);
          }}
        >
          {t("restart")}
        </Button>
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)" }}
        >
          {t("yearStatus", { year: yearText })}
        </output>
      </div>
      <BubbleChart
        series={series}
        minSize={6}
        maxSize={64}
        // constant maxValue: a bubble grows only when its population does
        maxValue={largest}
        // fixed ranges, so the bubbles move and the axes stay still
        xAxis={{ title: t("fertility"), min: 0.5, max: 8 }}
        yAxis={{ title: t("lifeExpectancy"), min: 40, max: 90 }}
        annotations={[
          {
            type: "text",
            x: 7.8,
            y: 88,
            text: yearText,
            anchor: "right",
            weight: 700,
          },
        ]}
        height={380}
        ariaLabel={t("playbackAria")}
      />
    </div>
  );
}

```

## Example: 产品组合

各产品的市场份额、市场增长率和收入，两条参考线把图分成四个象限；showLabels 在气泡周围写出名称。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bubble-chart/demos/portfolio.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BubbleChart, type ChartSeries } from "minerva-design/charts";

// Product portfolio: relative market share (x), market growth (y, %) and
// yearly revenue (M€, the bubbles), split in four quadrants
const products = [
  ["cloudStorage", 1.8, 14, 120],
  ["analytics", 0.6, 18, 45],
  ["mobileSdk", 0.3, 11, 12],
  ["payments", 2.4, 4, 210],
  ["desktop", 1.2, 1.5, 95],
  ["hardware", 0.4, -2, 30],
  ["consulting", 0.8, 6, 38],
] as const;

export default function PortfolioDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("products"),
        valueName: t("revenue"),
        format: euros,
        showLabels: true,
        data: products.map(([key, share, growth, revenue]) => ({
          x: share,
          y: growth,
          value: revenue,
          label: t(`portfolio.${key}`),
        })),
      },
    ],
    [t, euros],
  );

  return (
    <BubbleChart
      series={series}
      minSize={10}
      maxSize={70}
      xAxis={{ title: t("marketShare"), min: 0, max: 3 }}
      yAxis={{ title: t("marketGrowth"), format: (v) => `${v}%` }}
      annotations={[
        { type: "line", axis: "x", value: 1, label: t("leader") },
        { type: "line", axis: "y", value: 8, label: t("highGrowth") },
      ]}
      legend={false}
      height={380}
      ariaLabel={t("portfolioAria")}
    />
  );
}

```

## Example: 风险矩阵

项目风险按可能性和影响程度放在 5 × 5 网格上，气泡大小表示成本敞口；不设边界的 rect 标注为低风险区和高风险区着色，renderTooltip 计算风险分值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bubble-chart/demos/risk-matrix.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  BubbleChart,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Risk register of a data-center migration: likelihood and impact (1-5) and
// the cost exposure (k€) of each risk, by owning team
const risks = {
  infrastructure: [
    ["powerOutage", 1.9, 4.6, 420],
    ["hardwareDelay", 3.7, 3.2, 180],
    ["networkCutover", 3.1, 4.1, 260],
  ],
  security: [
    ["dataLeak", 1.6, 4.9, 650],
    ["accessReview", 3.9, 2.2, 45],
  ],
  people: [
    ["keyPerson", 2.6, 3.4, 120],
    ["vendorSkills", 4.2, 2.8, 90],
    ["trainingGap", 4.4, 1.6, 30],
  ],
  budget: [
    ["licenseCost", 3.4, 2.6, 140],
    ["exchangeRate", 2.2, 1.8, 60],
  ],
} as const;
type Team = keyof typeof risks;

export default function RiskMatrixDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const decimal = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
    [locale],
  );

  const series = useMemo(
    (): ChartSeries[] =>
      (Object.keys(risks) as Team[]).map((team) => ({
        name: t(`teams.${team}`),
        valueName: t("exposure"),
        format: euros,
        data: risks[team].map(([key, likelihood, impact, exposure]) => ({
          x: likelihood,
          y: impact,
          value: exposure,
          label: t(`risks.${key}`),
        })),
      })),
    [t, euros],
  );
  // green, amber and red zones of the classic 5 × 5 matrix
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        x1: 2.5,
        y1: 2.5,
        color: "var(--success-color)",
        opacity: 0.1,
        label: t("zones.low"),
        labelPosition: "bottom-left",
      },
      {
        type: "rect",
        x0: 3.5,
        y0: 3.5,
        color: "var(--danger-color)",
        opacity: 0.12,
        label: t("zones.high"),
        labelPosition: "top-right",
      },
    ],
    [t],
  );

  // bubbles are drawn largest first: read the hovered risk from the item
  // itself (label, x, y, value) rather than from its index
  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return null;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{item.label}</strong>
        <span>{item.seriesName}</span>
        <span>
          {t("riskScore", {
            likelihood: decimal.format(item.x),
            impact: decimal.format(item.y),
            score: decimal.format(item.x * item.y),
          })}
        </span>
        <span>{t("exposureRow", { value: euros(item.value ?? 0) })}</span>
      </div>
    );
  };

  return (
    <BubbleChart
      series={series}
      minSize={10}
      maxSize={60}
      annotations={annotations}
      xAxis={{ title: t("likelihood"), min: 1, max: 5, tickCount: 5 }}
      yAxis={{ title: t("impact"), min: 1, max: 5, tickCount: 5 }}
      renderTooltip={tooltip}
      height={380}
      ariaLabel={t("riskAria")}
    />
  );
}

```

## Example: 共享大小比例

两个图表对比两年的门店区域。使用相同的 maxValue 时，相同营收在两个图表中面积相同；不设置时，每个图表按自身的最大值确定气泡大小。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bubble-chart/demos/shared-scale.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { BubbleChart, type ChartSeries } from "minerva-design/charts";

// Store regions: sales per m² (k$), margin (%) and yearly revenue (M$);
// the 2026 network is about twice as big as in 2025
const regions = ["north", "south", "east", "west", "center"] as const;
const years = {
  2025: [
    [5.2, 18, 24],
    [4.1, 22, 15],
    [6.3, 15, 31],
    [3.8, 26, 9],
    [7.0, 20, 40],
  ],
  2026: [
    [5.9, 19, 52],
    [4.6, 24, 33],
    [6.8, 14, 61],
    [4.4, 27, 22],
    [7.6, 21, 88],
  ],
} as const;
type Year = keyof typeof years;
const largest = Math.max(
  ...Object.values(years).flatMap((rows) => rows.map((row) => row[2])),
);

export default function SharedScaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;
  const [shared, setShared] = useState(true);

  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);
  const perMeter = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value / 100);
  }, [locale]);

  const seriesOf = useMemo(
    () =>
      (year: Year): ChartSeries[] =>
        regions.map((region, i) => {
          const [sales, margin, revenue] = years[year][i];
          return {
            name: t(`regions.${region}`),
            valueName: t("revenue"),
            format: usd,
            data: [{ x: sales, y: margin, value: revenue }],
          };
        }),
    [t, usd],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <Switch checked={shared} onChange={setShared} label={t("sharedScale")} />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {shared
          ? t("sharedScaleOn", { value: usd(largest) })
          : t("sharedScaleOff")}
      </output>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {(Object.keys(years) as unknown as Year[]).map((year) => (
          <figure key={year} style={{ margin: 0 }}>
            <figcaption style={{ fontWeight: 600, marginBottom: 4 }}>
              {new Intl.NumberFormat(locale, { useGrouping: false }).format(
                Number(year),
              )}
            </figcaption>
            <BubbleChart
              series={seriesOf(year)}
              maxSize={56}
              // the same maxValue draws the same revenue with the same area
              // in both charts; without it, each chart scales to its own max
              maxValue={shared ? largest : undefined}
              legend={{ position: "bottom" }}
              // same axis ranges, so the positions are comparable too
              xAxis={{
                title: t("salesPerMeter"),
                min: 3,
                max: 8.5,
                format: perMeter,
              }}
              yAxis={{ title: t("margin"), min: 10, max: 30, format: percent }}
              height={280}
              ariaLabel={t("sharedScaleAria", { year })}
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

```
