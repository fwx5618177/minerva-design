# 气泡图

用点的大小表示第三个数值的散点图：气泡面积与数值成正比。

Package: minerva-design@1.22.1

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
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

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Charts/types.ts",
    "kind": "array",
    "typeText": "readonly ChartSeries[]",
    "typeRef": "type:deda0bcb88251b63a5de",
    "required": true,
    "description": "Series of points with a `value` sizing their bubble (area ∝ value)"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "xAxis",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "X axis"
  },
  {
    "name": "yAxis",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Y axis"
  },
  {
    "name": "legend",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name (tap toggles a series)"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip shown on tap / while scrubbing; `false` disables it"
  },
  {
    "name": "crosshair",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the finger"
  },
  {
    "name": "annotations",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas, reference lines and texts"
  },
  {
    "name": "interaction",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Pinch to zoom, drag to pan when zoomed, double tap to reset; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "renderTooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "node",
    "typeText": "((event: ChartHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:66d650d38e6b7d308d32",
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
    "name": "testID",
    "source": "packages/native/src/components/Chart/types.ts",
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
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:170f27b8f07028fffd08",
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
    "description": "Called when the highlighted points change"
  },
  {
    "name": "onPointClick",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent) => void) | undefined",
    "typeRef": "type:d586363317763d2fd3f3",
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
    "description": "Called when a point (or bar) is tapped"
  },
  {
    "name": "onPlotClick",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartPlotClickEvent) => void) | undefined",
    "typeRef": "type:3ab7d8ab926fce010082",
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
    "description": "Called when the plot area is tapped where there is no point"
  },
  {
    "name": "onZoom",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:e6c98e88ed542ed60f34",
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
  }
]
```

## API

```json
{
  "native:BubbleChartProps": {
    "source": "native/src/components/Charts/types.ts",
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
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bubble-chart/native/basic.tsx

```tsx
import { useTranslation } from "react-i18next";
import { BubbleChart } from "minerva-design/native";

// GDP per capita (k$), life expectancy (years) and population (millions)
const countries = {
  asia: [
    ["CN", 23.3, 78.6, 1410],
    ["IN", 9.2, 70.8, 1430],
    ["JP", 47.0, 84.7, 124],
  ],
  europe: [
    ["DE", 66.0, 81.0, 84],
    ["FR", 58.0, 82.8, 68],
  ],
  americas: [
    ["US", 80.0, 77.5, 335],
    ["BR", 20.0, 75.9, 216],
  ],
  africa: [
    ["NG", 5.9, 54.5, 224],
    ["EG", 17.0, 71.6, 113],
  ],
} as const;

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bubble-chart.data",
  });
  const locale = i18n.language;
  const names = new Intl.DisplayNames([locale], { type: "region" });
  return (
    <BubbleChart
      height={300}
      locale={locale}
      maxSize={44}
      ariaLabel={t("countriesAria")}
      xAxis={{ title: t("gdp"), min: 0, max: 90 }}
      yAxis={{ title: t("lifeExpectancy") }}
      legend={{ position: "bottom" }}
      series={(Object.keys(countries) as (keyof typeof countries)[]).map(
        (c) => ({
          name: t(`continents.${c}`),
          valueName: t("population"),
          data: countries[c].map(([code, gdp, life, population]) => ({
            x: gdp,
            y: life,
            value: population * 1e6,
            label: names.of(code) ?? code,
          })),
        }),
      )}
    />
  );
}

```
