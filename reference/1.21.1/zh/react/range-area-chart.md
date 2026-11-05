# 范围面积图

在下边界与上边界之间填充的带状区域：适合置信区间、预测、最小-最大范围和百分位扇形图。

Package: minerva-design@1.21.1

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

95% 区间

80% 区间

实际

预测

订单

今天

月度订单及未来 12 个月的预测和置信区间

最低 – 最高

季节常年值

一年中每天的最低和最高气温

第 5 – 95 百分位

第 25 – 75 百分位

中位数

一天中响应时间的百分位

最低 – 最高

收盘价

六个月内每日交易区间与收盘价

预期值 ± {{k}}σ

实测值

异常

灵敏度

{{k}}σ 区间

每分钟请求数

一周内每分钟的 API 请求数，含预期区间及其之外的异常点

没有落在区间外的点。

异常：{{n}} 个，最近一次在 {{latest}}。

买价 – 卖价

中间价

暂停

继续

买价 {{bid}} · 卖价 {{ask}}

价差 {{value}} 个基点

某货币对过去一分钟的实时买价和卖价，以及中间价

低排放（SSP1-2.6）

低排放，可能范围

极高排放（SSP5-8.5）

极高排放，可能范围

观测值

{{value}} 限值

相对 1850–1900 年的升温

1950 年以来观测到的全球升温，以及低排放和极高排放情景下到 2100 年的预测

在低排放情景下，中位值约在 {{low}} 年超过 {{lowLimit}}，并稳定在 {{peak}}；在极高排放情景下，约在 {{high}} 年超过 {{highLimit}}。

{{level}} 置信区间

提升

无差异

显著

置信水平

测试天数

B 相对 A 的转化率提升

28 天测试期间变体 B 相对变体 A 的累计转化率提升及其置信区间

B 领先 {{lift}}，但 {{level}} 置信区间仍包含零。

B 的转化率高出 {{lift}}（{{level}} 置信区间为 {{low}} 至 {{high}}），自第 {{day}} 天起显著。

## RangeAreaChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "RangeAreaChart"
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
    "description": "Bands between `y0` (lower edge) and `y` (upper edge) of every point, unless a series sets a `type` (e.g. a `line` for the forecast itself)"
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
    "default": "smooth",
    "required": false,
    "description": "Shape of the edges: straight, smooth (monotone) or steps"
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
  "RangeAreaChartProps": {
    "source": "charts/src/react/types.ts",
    "description": "Props of RangeAreaChart",
    "kind": "interface",
    "extends": [
      "ChartCommonProps"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly ChartSeries[]",
        "required": true,
        "description": "Bands between `y0` (lower edge) and `y` (upper edge) of every point, unless a series sets a `type` (e.g. a `line` for the forecast itself)"
      },
      {
        "name": "curve",
        "type": "ChartCurve",
        "required": false,
        "default": "\"smooth\"",
        "description": "Shape of the edges: straight, smooth (monotone) or steps"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: A/B 测试置信区间

逐日显示变体 B 相对 A 的累计提升及其置信区间。RadioGroup 切换置信水平，y 轴参考线标出零值，rect 标注为区间持续高于零之后的日期加上底色。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/range-area-chart/demos/ab-test.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  RangeAreaChart,
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

const DAYS = 28;
const VISITORS = 1200; // per variant and per day
// two-sided z values of the confidence levels
const Z = { "80": 1.2816, "90": 1.6449, "95": 1.96, "99": 2.5758 } as const;
type Level = keyof typeof Z;

// A checkout test: variant B converts about 15% better than A. Cumulative
// conversions per day, with a roughly normal daily noise
const random = mulberry32(15);
const noise = () => random() + random() + random() - 1.5;
const days = (() => {
  let a = 0;
  let b = 0;
  return Array.from({ length: DAYS }, (_, i) => {
    a += Math.round(VISITORS * 0.04 + noise() * 13);
    b += Math.round(VISITORS * 0.046 + noise() * 14);
    const n = VISITORS * (i + 1);
    // relative lift B / A - 1 and the standard error of its logarithm
    const lift = b / a - 1;
    const se = Math.sqrt(1 / a - 1 / n + 1 / b - 1 / n);
    return { day: i + 1, lift, se };
  });
})();

export default function AbTestDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const [level, setLevel] = useState<Level>("95");

  const intervals = useMemo(
    () =>
      days.map((d) => {
        const log = Math.log(1 + d.lift);
        return {
          day: d.day,
          lift: d.lift,
          low: Math.exp(log - Z[level] * d.se) - 1,
          high: Math.exp(log + Z[level] * d.se) - 1,
        };
      }),
    [level],
  );
  // first day from which the whole interval stays above zero
  const significantFrom = useMemo(() => {
    let from: number | undefined;
    for (const d of intervals) {
      if (d.low > 0) from ??= d.day;
      else from = undefined;
    }
    return from;
  }, [intervals]);

  const formats = useMemo(
    () => ({
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
      level: new Intl.NumberFormat(locale, { style: "percent" }),
      day: new Intl.NumberFormat(locale),
    }),
    [locale],
  );
  const confidence = formats.level.format(Number(level) / 100);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("confidenceInterval", { level: confidence }),
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.2,
        lineWidth: 0,
        data: intervals.map((d) => ({ x: d.day, y0: d.low, y: d.high })),
      },
      {
        name: t("lift"),
        type: "line",
        color: "var(--chart-series-1, #4f46e5)",
        data: intervals.map((d) => [d.day, d.lift] as const),
      },
    ],
    [t, intervals, confidence],
  );
  const annotations = useMemo((): ChartAnnotation[] => {
    const zero: ChartAnnotation = {
      type: "line",
      axis: "y",
      value: 0,
      color: "var(--text-secondary-color)",
      label: t("noDifference"),
    };
    if (significantFrom === undefined) return [zero];
    return [
      zero,
      {
        type: "rect",
        x0: significantFrom,
        color: "var(--success-color)",
        opacity: 0.08,
        label: t("significant"),
        labelPosition: "top-right",
      },
    ];
  }, [t, significantFrom]);

  const last = intervals[intervals.length - 1];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("confidenceLevel")}
        direction="horizontal"
        value={level}
        onChange={(value) => setLevel(value as Level)}
      >
        {(Object.keys(Z) as Level[]).map((key) => (
          <Radio key={key} value={key}>
            {formats.level.format(Number(key) / 100)}
          </Radio>
        ))}
      </RadioGroup>
      <RangeAreaChart
        series={series}
        curve="linear"
        annotations={annotations}
        tooltip={{ mode: "axis" }}
        xAxis={{
          title: t("testDay"),
          format: (x) => formats.day.format(x),
        }}
        yAxis={{
          title: t("liftOfB"),
          format: (y) => formats.percent.format(y),
        }}
        height={300}
        ariaLabel={t("abTestAria")}
      />
      {last && (
        <output aria-live="polite">
          {significantFrom === undefined
            ? t("notSignificant", {
                lift: formats.percent.format(last.lift),
                level: confidence,
              })
            : t("significantSince", {
                lift: formats.percent.format(last.lift),
                low: formats.percent.format(last.low),
                high: formats.percent.format(last.high),
                level: confidence,
                day: formats.day.format(significantFrom),
              })}
        </output>
      )}
    </div>
  );
}

```

## Example: 异常检测

以预期流量 ± k 个标准差作为区间带，实测值为折线，落在区间外的点作为 type: "scatter" 系列以危险色显示。RadioGroup 设置 k，输出区域统计异常数量。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/range-area-chart/demos/anomaly-band.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const HOUR = 60 * 60 * 1000;
const START = new Date(2026, 9, 19).getTime(); // a Monday, local midnight
const HOURS = 7 * 24;
// incidents injected into the data: hour index and relative change
const INCIDENTS = new Map([
  [31, 0.55],
  [58, -0.42],
  [104, -0.6],
  [105, -0.5],
  [139, 0.48],
]);

// Requests per minute of an API: a daily cycle (busy afternoons, quiet nights,
// calmer weekends), measured values with noise and a few incidents
const random = mulberry32(2026);
const points = Array.from({ length: HOURS }, (_, i) => {
  const time = START + i * HOUR;
  const date = new Date(time);
  const hour = date.getHours();
  const weekend = [0, 6].includes(date.getDay());
  const daily = Math.max(0, Math.sin(((hour - 7) / 24) * 2 * Math.PI));
  const expected = (weekend ? 0.65 : 1) * (1200 + 3400 * daily ** 1.5);
  const sigma = 60 + expected * 0.05;
  // roughly normal noise: the sum of 3 uniforms has a standard deviation of 0.5
  const noise = (random() + random() + random() - 1.5) * 2;
  const actual = expected + noise * sigma + expected * (INCIDENTS.get(i) ?? 0);
  return { time, expected, sigma, actual };
});

export default function AnomalyBandDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const [k, setK] = useState("3");

  const anomalies = useMemo(
    () =>
      points.filter(
        (p) => Math.abs(p.actual - p.expected) > Number(k) * p.sigma,
      ),
    [k],
  );
  const series = useMemo((): ChartSeries[] => {
    const width = Number(k);
    return [
      {
        name: t("expectedBand", { k: width }),
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.18,
        lineWidth: 0,
        data: points.map((p) => ({
          x: p.time,
          y0: p.expected - width * p.sigma,
          y: p.expected + width * p.sigma,
        })),
      },
      {
        name: t("measured"),
        type: "line",
        color: "var(--text-color, #1f2937)",
        lineWidth: 1.25,
        data: points.map((p) => [p.time, Math.round(p.actual)] as const),
      },
      {
        name: t("anomalies"),
        type: "scatter",
        color: "var(--danger-color)",
        pointSize: 8,
        data: anomalies.map((p) => [p.time, Math.round(p.actual)] as const),
      },
    ];
  }, [t, k, anomalies]);

  const formats = useMemo(
    () => ({
      number: new Intl.NumberFormat(locale, { notation: "compact" }),
      date: new Intl.DateTimeFormat(locale, {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("sensitivity")}
        direction="horizontal"
        value={k}
        onChange={(value) => setK(String(value))}
      >
        <Radio value="2">{t("sigmaOption", { k: 2 })}</Radio>
        <Radio value="3">{t("sigmaOption", { k: 3 })}</Radio>
      </RadioGroup>
      <RangeAreaChart
        series={series}
        curve="linear"
        tooltip={{ mode: "axis" }}
        xAxis={{ type: "time" }}
        yAxis={{
          title: t("requestsPerMinute"),
          format: (y) => formats.number.format(y),
        }}
        locale={locale}
        height={320}
        ariaLabel={t("anomalyAria")}
      />
      <output aria-live="polite">
        {anomalies.length === 0
          ? t("noAnomaly")
          : t("anomalyCount", {
              n: anomalies.length,
              latest: formats.date.format(
                anomalies[anomalies.length - 1]?.time ?? START,
              ),
            })}
      </output>
    </div>
  );
}

```

## Example: 实时买卖价差

setInterval 每 500 毫秒向一分钟的窗口中添加一个报价，并在暂停和卸载时清除。区间带以 curve="step" 从买价延伸到卖价，中间价为折线，输出区域以基点显示最新价差。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/range-area-chart/demos/bid-ask.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Quote {
  i: number;
  mid: number;
  spread: number;
}
const TICK = 500; // ms between two quotes
const WINDOW = 120; // quotes kept on screen: one minute
const START = new Date(2026, 9, 30, 15, 59, 0).getTime();

// next quote of a currency pair: a random walk of the mid price and a spread
// that widens now and then when liquidity dries up; seeded by the index so
// that the stream is the same on every visit
const next = (quote: Quote): Quote => {
  const random = mulberry32(quote.i + 1);
  const mid = quote.mid + (random() - 0.5) * 0.0004;
  const shock = random() < 0.04 ? 0.0006 + random() * 0.0006 : 0;
  const spread = Math.max(0.00008, quote.spread * 0.8 + 0.00002 + shock);
  return { i: quote.i + 1, mid, spread };
};
const initial = (() => {
  const quotes: Quote[] = [{ i: 0, mid: 1.0842, spread: 0.0001 }];
  for (let k = 1; k < WINDOW; k++) {
    const last = quotes[quotes.length - 1];
    if (last) quotes.push(next(last));
  }
  return quotes;
})();

export default function BidAskDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const [quotes, setQuotes] = useState(initial);
  const [paused, setPaused] = useState(false);

  // a new quote every 500 ms, the oldest one drops out; cleared on pause and
  // on unmount
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setQuotes((current) => {
        const last = current[current.length - 1];
        return last ? [...current.slice(1), next(last)] : current;
      });
    }, TICK);
    return () => window.clearInterval(id);
  }, [paused]);

  const series = useMemo((): ChartSeries[] => {
    const time = (q: Quote) => START + q.i * TICK;
    return [
      {
        name: t("bidAsk"),
        color: "var(--chart-series-5, #0ea5e9)",
        opacity: 0.3,
        lineWidth: 1,
        data: quotes.map((q) => ({
          x: time(q),
          y0: q.mid - q.spread / 2,
          y: q.mid + q.spread / 2,
        })),
      },
      {
        name: t("mid"),
        type: "line",
        color: "var(--text-color, #1f2937)",
        lineWidth: 1.25,
        data: quotes.map((q) => [time(q), q.mid] as const),
      },
    ];
  }, [t, quotes]);
  const formats = useMemo(
    () => ({
      price: new Intl.NumberFormat(locale, {
        minimumFractionDigits: 5,
        maximumFractionDigits: 5,
      }),
      bps: new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
      time: new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    }),
    [locale],
  );

  const last = quotes[quotes.length - 1] ?? initial[0];
  const spreadBps = last ? (last.spread / last.mid) * 10000 : 0;
  const wide = spreadBps > 3;

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
        <Button
          size="small"
          variant="outline"
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? t("resume") : t("pause")}
        </Button>
        {last && (
          <output
            aria-live="off"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {t("quote", {
              bid: formats.price.format(last.mid - last.spread / 2),
              ask: formats.price.format(last.mid + last.spread / 2),
            })}
            {" · "}
            <span
              style={{
                color: wide ? "var(--danger-color)" : "var(--success-color)",
              }}
            >
              {t("spreadBps", { value: formats.bps.format(spreadBps) })}
            </span>
          </output>
        )}
      </div>
      <RangeAreaChart
        series={series}
        curve="step"
        xAxis={{ type: "time", format: (x) => formats.time.format(x) }}
        yAxis={{ zero: false, format: (y) => formats.price.format(y) }}
        tooltip={{ mode: "axis" }}
        height={300}
        ariaLabel={t("bidAskAria")}
      />
    </div>
  );
}

```

## Example: 排放情景

两个相互重叠的区间带及其中位线承接观测记录一直延伸到 2100 年；y 轴参考线标注 1.5 °C 和 2 °C 的限值，点击图例项可隐藏对应系列。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/range-area-chart/demos/climate-scenarios.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  RangeAreaChart,
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

// Global warming above the 1850-1900 average, in °C: an illustrative
// observed record, then two emission scenarios with their likely ranges
const LAST_OBSERVED = 2024;
const random = mulberry32(1850);
const observed = Array.from({ length: LAST_OBSERVED - 1950 + 1 }, (_, i) => {
  const year = 1950 + i;
  const trend = 0.28 + 0.97 * (i / (LAST_OBSERVED - 1950)) ** 1.9;
  return [year, trend + (random() - 0.5) * 0.2] as const;
});
const now = 0.28 + 0.97;

// median and likely range of a scenario: a curve from today's warming to its
// level in 2100, with an uncertainty growing with the horizon
const scenario = (end: number, bend: number, spread: number) =>
  Array.from({ length: (2100 - LAST_OBSERVED) / 4 + 1 }, (_, k) => {
    const year = LAST_OBSERVED + k * 4;
    const f = (year - LAST_OBSERVED) / (2100 - LAST_OBSERVED);
    const median = now + (end - now) * (1 - (1 - f) ** bend);
    const half = spread * f ** 0.8;
    return { year, median, low: median - half * 0.8, high: median + half };
  });
const low = scenario(1.8, 3.2, 0.55);
const high = scenario(4.4, 1.15, 1.25);
const crossing = (path: typeof low, level: number) =>
  path.find((p) => p.median >= level)?.year;

export default function ClimateScenariosDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const band = (path: typeof low) =>
      path.map((p) => ({ x: p.year, y0: p.low, y: p.high }));
    const median = (path: typeof low) =>
      path.map((p) => [p.year, p.median] as const);
    return [
      {
        id: "ssp585-range",
        name: t("ssp585Range"),
        color: "var(--danger-color)",
        opacity: 0.18,
        lineWidth: 0,
        data: band(high),
      },
      {
        id: "ssp126-range",
        name: t("ssp126Range"),
        color: "var(--chart-series-5, #0ea5e9)",
        opacity: 0.22,
        lineWidth: 0,
        data: band(low),
      },
      {
        id: "ssp585",
        name: t("ssp585"),
        type: "line",
        color: "var(--danger-color)",
        data: median(high),
      },
      {
        id: "ssp126",
        name: t("ssp126"),
        type: "line",
        color: "var(--chart-series-5, #0ea5e9)",
        data: median(low),
      },
      {
        id: "observed",
        name: t("observed"),
        type: "line",
        curve: "linear",
        color: "var(--text-color, #1f2937)",
        lineWidth: 1.25,
        data: observed,
      },
    ];
  }, [t]);
  const formats = useMemo(
    () => ({
      degrees: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
      year: new Intl.NumberFormat(locale, { useGrouping: false }),
    }),
    [locale],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] =>
      [1.5, 2].map((level) => ({
        type: "line",
        axis: "y",
        value: level,
        dash: [4, 4],
        color: "var(--warning-color)",
        label: t("parisLimit", { value: formats.degrees.format(level) }),
      })),
    [t, formats],
  );

  const year = (value: number | undefined) =>
    value === undefined ? "–" : formats.year.format(value);
  const peak = Math.max(...low.map((p) => p.median));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RangeAreaChart
        series={series}
        annotations={annotations}
        tooltip={{ mode: "axis" }}
        xAxis={{ format: (x) => formats.year.format(x) }}
        yAxis={{
          title: t("warming"),
          format: (y) => formats.degrees.format(y),
        }}
        height={340}
        ariaLabel={t("climateAria")}
      />
      <p style={{ margin: 0, color: "var(--text-secondary-color)" }}>
        {t("crossings", {
          lowLimit: formats.degrees.format(1.5),
          low: year(crossing(low, 1.5)),
          peak: formats.degrees.format(peak),
          highLimit: formats.degrees.format(2),
          high: year(crossing(high, 2)),
        })}
      </p>
    </div>
  );
}

```

## Example: 百分位扇形图

围绕中位数的第 5–95 和第 25–75 百分位嵌套带：繁忙时段的分布更宽。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/range-area-chart/demos/fan.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

// Percentiles of the response time of an API (ms) every 10 minutes over a
// day: busy hours widen the distribution
const points = Array.from({ length: 144 }, (_, i) => {
  const hour = i / 6;
  const load =
    Math.exp(-((hour - 11) ** 2) / 8) + 0.7 * Math.exp(-((hour - 19) ** 2) / 5);
  const p50 = 42 + 30 * load + 2 * Math.sin(i / 2.3);
  return {
    x: new Date(2026, 2, 12, 0, i * 10),
    p5: p50 * 0.55,
    p25: p50 * 0.8,
    p50,
    p75: p50 * (1.3 + 0.2 * load),
    p95: p50 * (2 + 1.4 * load),
  };
});

export default function FanDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const ms = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  // nested bands: the outer one first, the median line on top
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("p5p95"),
        color: "var(--chart-series-5, #0ea5e9)",
        opacity: 0.16,
        lineWidth: 0,
        format: ms,
        data: points.map((p) => ({ x: p.x, y0: p.p5, y: p.p95 })),
      },
      {
        name: t("p25p75"),
        color: "var(--chart-series-5, #0ea5e9)",
        opacity: 0.32,
        lineWidth: 0,
        format: ms,
        data: points.map((p) => ({ x: p.x, y0: p.p25, y: p.p75 })),
      },
      {
        name: t("median"),
        type: "line",
        color: "var(--chart-series-5, #0ea5e9)",
        format: ms,
        data: points.map((p) => [p.x, p.p50] as const),
      },
    ],
    [t, ms],
  );

  return (
    <RangeAreaChart
      series={series}
      yAxis={{ format: ms, zero: true }}
      height={300}
      ariaLabel={t("latencyAria")}
    />
  );
}

```

## Example: 带置信区间的预测

面积图的每个点用 y0 设置下边界：80% 和 95% 区间随预测期变宽，历史值与预测值为折线；lineWidth: 0 隐藏带状区域的边线。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/range-area-chart/demos/forecast.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

// Monthly orders (thousands): two years of history, then a 12-month
// forecast whose uncertainty widens with the horizon
const history = [
  41, 39, 44, 47, 52, 55, 53, 51, 56, 60, 68, 74, 49, 46, 52, 55, 61, 64, 62,
  60, 66, 71, 79, 86,
];
const month = (i: number) => new Date(2024, i, 1);

export default function ForecastDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const last = history.length - 1;
    const forecast = Array.from({ length: 13 }, (_, k) => {
      const i = last + k;
      // the same month of last year, plus 12% of growth
      const mean =
        k === 0 ? (history[last] ?? 0) : (history[i - 12] ?? 0) * 1.12;
      // standard error growing like √horizon
      const sd = 2.4 * Math.sqrt(k);
      return { i, mean, sd };
    });
    return [
      {
        name: t("interval95"),
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.14,
        lineWidth: 0,
        data: forecast.map((f) => ({
          x: month(f.i),
          y0: f.mean - 1.96 * f.sd,
          y: f.mean + 1.96 * f.sd,
        })),
      },
      {
        name: t("interval80"),
        color: "var(--chart-series-1, #4f46e5)",
        opacity: 0.22,
        lineWidth: 0,
        data: forecast.map((f) => ({
          x: month(f.i),
          y0: f.mean - 1.28 * f.sd,
          y: f.mean + 1.28 * f.sd,
        })),
      },
      {
        name: t("actual"),
        type: "line",
        color: "var(--text-color, #1f2937)",
        data: history.map((y, i) => [month(i), y] as const),
      },
      {
        name: t("forecast"),
        type: "line",
        color: "var(--chart-series-1, #4f46e5)",
        data: forecast.map((f) => [month(f.i), f.mean] as const),
      },
    ];
  }, [t]);
  const thousands = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(Math.round(value) * 1000);
  }, [locale]);

  return (
    <RangeAreaChart
      series={series}
      curve="linear"
      yAxis={{ format: thousands, title: t("orders") }}
      annotations={[
        {
          type: "line",
          axis: "x",
          value: month(history.length - 1).getTime(),
          label: t("today"),
        },
      ]}
      height={320}
      ariaLabel={t("forecastAria")}
    />
  );
}

```

## Example: 交易区间

用带状区域表示每个交易日的最低-最高区间，用折线表示收盘价，是 K 线图的轻量替代。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/range-area-chart/demos/price-range.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Six months of daily trading: the low-high range of each day and the close
const days = (() => {
  const random = mulberry32(42);
  const out: { x: Date; low: number; high: number; close: number }[] = [];
  let close = 182;
  for (let d = 0; out.length < 126; d++) {
    const date = new Date(2026, 0, 2 + d);
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    const open = close;
    close = Math.max(120, open * (1 + (random() - 0.48) * 0.035));
    const high = Math.max(open, close) * (1 + random() * 0.012);
    const low = Math.min(open, close) * (1 - random() * 0.012);
    out.push({ x: date, low, high, close });
  }
  return out;
})();

export default function PriceRangeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("dayRange"),
        color: "var(--chart-series-2, #10b981)",
        lineWidth: 0,
        opacity: 0.3,
        format: usd,
        data: days.map((d) => ({ x: d.x, y0: d.low, y: d.high })),
      },
      {
        name: t("close"),
        type: "line",
        color: "var(--chart-series-2, #10b981)",
        format: usd,
        data: days.map((d) => [d.x, d.close] as const),
      },
    ],
    [t, usd],
  );

  return (
    <RangeAreaChart
      series={series}
      curve="linear"
      yAxis={{ format: usd }}
      height={300}
      ariaLabel={t("priceAria")}
    />
  );
}

```

## Example: 每日最低与最高气温

一年中每天的气温范围及季节常年值：提示框显示带状区域的两端，Ctrl / ⌘ + 滚轮可放大到单日。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/range-area-chart/demos/temperature.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RangeAreaChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A year of daily minimum and maximum temperatures (°C) of a temperate city
const days = (() => {
  const random = mulberry32(7);
  return Array.from({ length: 365 }, (_, d) => {
    const season = -Math.cos(((d - 18) / 365) * Math.PI * 2);
    const weather = (random() - 0.5) * 6;
    const mean = 11.5 + season * 8.5 + weather;
    const spread = 6 + season * 2.5 + random() * 3;
    return {
      x: new Date(2025, 0, d + 1),
      low: mean - spread / 2,
      high: mean + spread / 2,
      normal: 11.5 + season * 8.5,
    };
  });
})();

export default function TemperatureDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.range-area-chart.data",
  });
  const locale = i18n.language;
  const celsius = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("dailyRange"),
        color: "var(--chart-series-4, #ef4444)",
        // many narrow days: a filled band without edges reads better
        lineWidth: 0,
        opacity: 0.45,
        format: celsius,
        data: days.map((d) => ({ x: d.x, y0: d.low, y: d.high })),
      },
      {
        name: t("normal"),
        type: "line",
        curve: "smooth",
        color: "var(--text-secondary-color, #6b7280)",
        lineWidth: 1.5,
        format: celsius,
        data: days.map((d) => [d.x, d.normal] as const),
      },
    ],
    [t, celsius],
  );

  // zoom with Ctrl / ⌘ + wheel to read single days
  return (
    <RangeAreaChart
      series={series}
      curve="linear"
      yAxis={{ format: celsius }}
      height={300}
      ariaLabel={t("temperatureAria")}
    />
  );
}

```
