# 热力图

按数值着色的单元格网格，两个轴都可以是类目或数字：按星期和小时的活跃度、相关性矩阵、某项指标的分布图等。悬停单元格会将其浮起、高亮所在行列，并在色例上标出其数值。

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

会话数

按星期和小时统计的会话数

距平

1995 至 2024 年的月气温距平

信号

200 × 100 米楼层内的 Wi-Fi 信号强度

{{cells}} 个单元格 · 使用 {{renderer}} 绘制 · Ctrl / ⌘ + 滚轮缩放，拖动平移，双击重置

贡献

一年内每天的贡献次数

过去一年共 {{total}} 次贡献

会话数

页面浏览量

注册数

收入

流失

支持工单

相关系数

六项产品指标的相关系数矩阵

第 {{n}} 个月

留存

各月注册用户群的留存率

桌面端

移动端

平板

自然搜索

付费搜索

社交媒体

邮件

外链推荐

直接访问

{{source}} · {{device}}：{{sessions}} 次会话产生 {{orders}} 笔订单，转化率 {{rate}}：

高于平均值 {{value}}

低于平均值 {{value}}

点击单元格查看其会话数和订单数。

转化率

按流量来源和设备划分的转化率

机柜 {{n}}

传感器 {{n}}

暂停

继续

最热：{{rack}} {{sensor}}，{{value}} · {{alarms}} 个传感器超过 {{limit}}

进风温度

十个服务器机柜传感器的实时进风温度

猫

狗

鸟

汽车

卡车

实际为{{actual}}，预测为{{predicted}}

{{value}} 张图片（占该类别 {{share}}）

召回率：{{value}}

精确率：{{value}}

分类错误

准确率：{{images}} 张测试图片中的 {{value}}

类别占比

预测类别

实际类别

五个类别的图像分类器混淆矩阵

北区

南区

东区

西区

中区

第 {{n}} 季度

指标

营收

较 2025 年增长

毛利率

{{region}}{{quarter}}

最好：{{best}}（{{bestValue}}）· 最弱：{{worst}}（{{worstValue}}）

2026 年按区域和季度划分的销售指标

## HeatmapChart

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "HeatmapChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "testID",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Test identifier of the root view"
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
    "name": "labels",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
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
  "native:HeatmapChartProps": {
    "source": "native/src/components/Charts/types.ts",
    "description": "Props of HeatmapChart",
    "kind": "interface",
    "extends": [
      "Omit<ChartCommonProps, \"crosshair\">",
      "HeatmapConfig"
    ],
    "props": []
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 每周活跃度

类目轴上的 7 × 24 个单元格。默认色阶在 OKLab 中插值并跟随主题：浅色模式从近白色过渡到深主色，深色模式从接近背景的色调过渡到明亮的主色；色例显示其范围。yCategories 按从下到上的顺序列出行，因此星期需要倒序。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/heatmap-chart/native/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/native";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const bump = (hour: number, center: number, width: number) =>
  Math.exp(-((hour - center) ** 2) / (2 * width ** 2));

// Sessions by weekday and by 3-hour slot (a phone fits 8 columns)
const SLOTS = [0, 3, 6, 9, 12, 15, 18, 21];

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const days = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
    // 5 January 2026 is a Monday
    return Array.from({ length: 7 }, (_, i) =>
      format.format(new Date(2026, 0, 5 + i)),
    );
  }, [locale]);
  const hours = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, { hour: "numeric" });
    return SLOTS.map((h) => format.format(new Date(2026, 0, 5, h)));
  }, [locale]);
  const data = useMemo((): HeatmapCell[] => {
    const random = mulberry32(24);
    return days.flatMap((day, d) =>
      SLOTS.map((h, s) => {
        const activity =
          d >= 5
            ? 0.55 * bump(h, 13, 4) + 0.3 * bump(h, 21, 2)
            : bump(h, 10.5, 2.5) + 0.9 * bump(h, 15, 2.5);
        return {
          x: hours[s] ?? String(h),
          y: day,
          value: Math.round(Math.max(0, activity) * 1200 + 40 + random() * 90),
        };
      }),
    );
  }, [days, hours]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  return (
    <HeatmapChart
      data={data}
      xCategories={hours}
      // rows go from bottom to top: reverse them to read Monday first
      yCategories={[...days].reverse()}
      name={t("sessions")}
      format={(value) => number.format(value)}
      locale={locale}
      height={280}
      ariaLabel={t("sessionsAria")}
    />
  );
}

```
