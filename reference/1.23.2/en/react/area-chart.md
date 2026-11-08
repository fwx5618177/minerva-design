# Area chart

Filled areas that show a volume over time: smooth by default, overlapping, stacked into a total or as 100% shares. Hover to read every series at one x; zoom with Ctrl / ⌘ + wheel or a pinch.

Package: minerva-design@1.23.2

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

Daily active users

Daily active users, April to June 2026

Others

Market share by vendor, 2016 to 2026

Organic search

Direct

Referral

Social

Monthly visits by traffic source, stacked

Running instances

Quota

Instances started by the autoscaler over one day

Nuclear

Hydro

Wind

Solar

Gas

{{value}} GW

Power

Electricity generation by source over one day, stacked

Actual

Plan

Cumulative sales of the year against the plan

Download

Upload

Server bandwidth over two hours, download above zero and upload below

Solar production

{{value}} kWh

Daily energy of a rooftop solar installation in 2026

Reset zoom

{{from}} – {{to}}: {{total}} in total, {{average}} per day on average

Ctrl / ⌘ + wheel or pinch to zoom on a season, drag to pan.

Engineering

Sales

Customer support

Operations

Finance & HR

Headcount per department, monthly, 2025 and 2026

Headcount of the selected month

{{value}} employees

Last year

This year

Black Friday

Cyber Monday

Last shipping day

Daily orders in November and December, this year against last year

{{total}} orders this season, {{change}} against last year.

Used

Trend

{{value}} GB

Capacity {{value}}

Volume

Database

Logs

User uploads

Full in about {{days}}, around {{date}}

Not full within the next {{days}}

Disk usage over 60 days with its trend up to the capacity

## AreaChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "AreaChart"
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
    "description": "Series drawn as areas unless they set a `type`"
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
    "name": "stacked",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Stacks the areas on top of each other"
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
  "AreaChartProps": {
    "source": "charts/src/react/types.ts",
    "description": "Props of AreaChart",
    "kind": "interface",
    "extends": [
      "ChartCommonProps"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly ChartSeries[]",
        "required": true,
        "description": "Series drawn as areas unless they set a `type`"
      },
      {
        "name": "curve",
        "type": "ChartCurve",
        "required": false,
        "default": "\"smooth\"",
        "description": "Shape of the edges: straight, smooth (monotone) or steps"
      },
      {
        "name": "stacked",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Stacks the areas on top of each other"
      },
      {
        "name": "percent",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Scales the stacks to 100% (implies `stacked`)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic

One series over Date x values: the edge is a smooth (monotone) curve that never overshoots the data.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/area-chart/demos/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

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
const START = new Date(2026, 3, 1).getTime();

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(21);
    const data: [Date, number][] = [];
    let level = 18_000;
    for (let i = 0; i < 90; i++) {
      level *= 1.004 + (random() - 0.5) * 0.01;
      const seasonal = 1 + 0.04 * Math.sin(i / 9);
      const value = level * seasonal * (0.985 + random() * 0.03);
      data.push([new Date(START + i * DAY), Math.round(value)]);
    }
    return [{ name: t("dau"), data }];
  }, [t]);
  const compact = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
    [locale],
  );
  const date = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    [locale],
  );

  return (
    <AreaChart
      series={series}
      xAxis={{ type: "time", format: (value) => date.format(value) }}
      yAxis={{ format: (value) => compact.format(value) }}
      height={280}
      ariaLabel={t("dauAria")}
    />
  );
}

```

## Example: Cumulative vs plan

Running total of sales against an evenly growing plan drawn as a line series; null values leave the months still to come empty.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/area-chart/demos/cumulative.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

// Monthly sales (thousand USD) of the first 10 months, and the yearly plan
const sales = [182, 164, 210, 225, 198, 241, 233, 219, 262, 280];
const PLAN = 2_700;
// running total of the months already closed
const runningTotal = sales.map((_, i) =>
  sales.slice(0, i + 1).reduce((sum, value) => sum + value, 0),
);

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function CumulativeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    // the remaining months are unknown (null)
    const actual = months.map(
      (month, i) => [month, runningTotal[i] ?? null] as const,
    );
    // the plan grows evenly through the year
    const plan = months.map(
      (month, i) => [month, Math.round((PLAN * (i + 1)) / 12)] as const,
    );
    return [
      { name: t("actual"), data: actual },
      {
        name: t("plan"),
        type: "line",
        data: plan,
        color: "var(--text-secondary-color)",
        lineWidth: 1.5,
      },
    ];
  }, [t, locale]);
  // values are in thousands of dollars
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <AreaChart
      series={series}
      curve="linear"
      yAxis={{ zero: true, format: usd }}
      height={300}
      ariaLabel={t("cumulativeAria")}
    />
  );
}

```

## Example: Capacity forecast

Disk usage as an area and a line series extending the trend of the last 30 days up to the capacity, marked by a y annotation; a rect shades the future and the readout gives the day the volume fills up.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/area-chart/demos/disk-forecast.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import {
  AreaChart,
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
const HISTORY = 60;
const HORIZON = 120; // days of forecast at most
// local midnight: the time axis places its ticks in local time
const START = new Date(2026, 8, 1).getTime();
const TODAY = START + (HISTORY - 1) * DAY;

// Disk usage (GB) of three volumes over the last 60 days
const volumes = {
  database: { capacity: 500, start: 310, growth: 2.1, seed: 1 },
  logs: { capacity: 200, start: 120, growth: 0.6, seed: 2 },
  uploads: { capacity: 1000, start: 420, growth: 1.2, seed: 3 },
} as const;
type Volume = keyof typeof volumes;

const usage = (key: Volume) => {
  const { start, growth, seed } = volumes[key];
  const random = mulberry32(seed);
  return Array.from({ length: HISTORY }, (_, i) => {
    // logs are rotated every week: a sawtooth on top of the trend
    const rotation = key === "logs" ? ((i % 7) - 3) * 4 : 0;
    const value = start + growth * i + rotation + (random() - 0.5) * 6;
    return Math.round(value * 10) / 10;
  });
};

/** Least-squares line through the last 30 days */
const trend = (values: number[]) => {
  const recent = values.slice(-30);
  const n = recent.length;
  const mx = (n - 1) / 2;
  const my = recent.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let den = 0;
  recent.forEach((y, i) => {
    num += (i - mx) * (y - my);
    den += (i - mx) ** 2;
  });
  const slope = num / den;
  // value of the line today (the last day)
  return { slope, today: my + slope * (n - 1 - mx) };
};

export default function DiskForecastDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;
  const [volume, setVolume] = useState<Volume>("database");
  const { capacity } = volumes[volume];

  const model = useMemo(() => {
    const used = usage(volume);
    const { slope, today } = trend(used);
    const daysLeft = slope > 0 ? (capacity - today) / slope : Infinity;
    const days = Math.min(HORIZON, Math.ceil(daysLeft));
    const forecast = Array.from({ length: days + 1 }, (_, k) => {
      const value = Math.min(capacity, today + slope * k);
      return [TODAY + k * DAY, Math.round(value * 10) / 10] as const;
    });
    return { used, forecast, daysLeft };
  }, [volume, capacity]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("diskUsed"),
        data: model.used.map((value, i) => [START + i * DAY, value] as const),
      },
      {
        name: t("diskForecast"),
        type: "line",
        lineWidth: 1.5,
        color: "var(--text-secondary-color)",
        data: model.forecast,
      },
    ],
    [t, model],
  );
  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    return {
      gb: (value: number) => t("gb", { value: number.format(value) }),
      days: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "day",
        unitDisplay: "long",
      }),
      date: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
      long: new Intl.DateTimeFormat(locale, { dateStyle: "long" }),
    };
  }, [t, locale]);
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        x0: TODAY,
        color: "var(--text-secondary-color)",
        opacity: 0.05,
      },
      {
        type: "line",
        axis: "y",
        value: capacity,
        color: "var(--danger-color)",
        dash: [4, 4],
        label: t("capacity", { value: formats.gb(capacity) }),
      },
    ],
    [t, capacity, formats],
  );

  const full = model.daysLeft <= HORIZON;
  const fullDate = TODAY + Math.ceil(model.daysLeft) * DAY;

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
          aria-label={t("volume")}
          value={volume}
          onChange={(value) => setVolume(value as Volume)}
        >
          {(Object.keys(volumes) as Volume[]).map((key) => (
            <SelectItem key={key} value={key}>
              {t(`volumes.${key}`)}
            </SelectItem>
          ))}
        </Select>
        <output
          aria-live="polite"
          style={{ color: full ? "var(--danger-color)" : undefined }}
        >
          {full
            ? t("fullIn", {
                days: formats.days.format(Math.ceil(model.daysLeft)),
                date: formats.long.format(fullDate),
              })
            : t("notFull", { days: formats.days.format(HORIZON) })}
        </output>
      </div>
      <AreaChart
        series={series}
        curve="linear"
        annotations={annotations}
        xAxis={{ type: "time", format: (x) => formats.date.format(x) }}
        yAxis={{ zero: true, max: capacity * 1.1, format: formats.gb }}
        height={300}
        ariaLabel={t("diskAria")}
      />
    </div>
  );
}

```

## Example: Energy mix

Electricity generation by source over a day, stacked: the top edge is the total demand and the solar bump shows when the other sources ramp down. Each series sets its own color.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/area-chart/demos/energy-mix.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

const hours = Array.from({ length: 24 }, (_, hour) => hour);

// Electricity generation of a grid over one spring day, in gigawatts
const generation = {
  nuclear: hours.map(() => 38),
  hydro: hours.map((h) => 6 + 3 * Math.exp(-((h - 19) ** 2) / 6)),
  wind: hours.map((h) => 9 + 4 * Math.sin((h + 3) / 4)),
  solar: hours.map((h) => Math.max(0, 22 * Math.sin(((h - 6) / 14) * Math.PI))),
  gas: hours.map((h) => 4 + 6 * Math.exp(-((h - 20) ** 2) / 5)),
};
const colors = {
  nuclear: "#8b5cf6",
  hydro: "#0ea5e9",
  wind: "#14b8a6",
  solar: "#f59e0b",
  gas: "#94a3b8",
};

export default function EnergyMixDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const time = new Intl.DateTimeFormat(locale, { hour: "numeric" });
    const label = (hour: number) => time.format(new Date(2026, 3, 20, hour));
    const names = {
      nuclear: t("energy.nuclear"),
      hydro: t("energy.hydro"),
      wind: t("energy.wind"),
      solar: t("energy.solar"),
      gas: t("energy.gas"),
    };
    return (Object.keys(generation) as (keyof typeof generation)[]).map(
      (key) => ({
        name: names[key],
        color: colors[key],
        data: hours.map((h) => [label(h), generation[key][h]] as const),
      }),
    );
  }, [t, locale]);
  const gigawatts = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) => t("gw", { value: number.format(value) });
  }, [t, locale]);

  return (
    <AreaChart
      series={series}
      stacked
      yAxis={{ format: gigawatts, title: t("power") }}
      height={320}
      ariaLabel={t("energyAria")}
    />
  );
}

```

## Example: Readout panel

tooltip={false} with crosshair and onHover: a side panel lists the headcount of every department at the hovered month, largest first, and shows the latest month when the pointer leaves.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/area-chart/demos/hover-panel.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AreaChart,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

const MONTHS = 24;
const month = (i: number) => new Date(2025, i, 1).getTime();

// Headcount per department at the start of every month of a growing company
const departments = [
  {
    key: "engineering",
    color: "var(--chart-series-1, #4f46e5)",
    start: 48,
    hires: 2.6,
  },
  {
    key: "sales",
    color: "var(--chart-series-2, #10b981)",
    start: 22,
    hires: 1.4,
  },
  {
    key: "support",
    color: "var(--chart-series-3, #f59e0b)",
    start: 14,
    hires: 0.9,
  },
  {
    key: "operations",
    color: "var(--chart-series-4, #ef4444)",
    start: 9,
    hires: 0.5,
  },
  {
    key: "admin",
    color: "var(--chart-series-5, #0ea5e9)",
    start: 7,
    hires: 0.25,
  },
] as const;
const headcount = departments.map(({ start, hires }, d) =>
  Array.from({ length: MONTHS }, (_, i) =>
    // hiring slows down during a freeze in the summer of 2025
    Math.round(start + hires * i - (i > 5 && i < 9 ? (i - 5) * hires : 0) + d),
  ),
);

interface Row {
  name: string;
  color: string;
  value: number;
}

export default function HoverPanelDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;
  // the hovered month, `null` shows the latest one
  const [hovered, setHovered] = useState<ChartHoverEvent | null>(null);

  const series = useMemo(
    (): ChartSeries[] =>
      departments.map(({ key, color }, d) => ({
        name: t(`departments.${key}`),
        color,
        data: (headcount[d] ?? []).map(
          (value, i) => [month(i), value] as const,
        ),
      })),
    [t],
  );
  const formats = useMemo(
    () => ({
      number: new Intl.NumberFormat(locale),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
      }),
      month: new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
      }),
      tick: new Intl.DateTimeFormat(locale, {
        year: "2-digit",
        month: "short",
      }),
    }),
    [locale],
  );

  // the panel lists every department of the month, largest first
  const last = MONTHS - 1;
  const time = hovered?.x ?? month(last);
  const rows: Row[] = hovered
    ? hovered.items.map((item) => ({
        name: item.seriesName,
        color: item.color,
        value: item.y,
      }))
    : series.map((s, d) => ({
        name: s.name ?? "",
        color: s.color ?? "",
        value: headcount[d]?.[last] ?? 0,
      }));
  rows.sort((a, b) => b.value - a.value);
  const total = rows.reduce((sum, row) => sum + row.value, 0);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        width: "100%",
      }}
    >
      <div style={{ flex: "1 1 420px", minWidth: 0 }}>
        <AreaChart
          series={series}
          stacked
          curve="step"
          tooltip={false}
          crosshair
          onHover={setHovered}
          xAxis={{ type: "time", format: (x) => formats.tick.format(x) }}
          legend={false}
          height={300}
          ariaLabel={t("headcountAria")}
        />
      </div>
      <section
        aria-label={t("headcountPanel")}
        style={{
          display: "grid",
          alignContent: "start",
          gap: 8,
          flex: "0 1 240px",
        }}
      >
        <div>
          <div style={{ fontSize: 13, color: "var(--text-secondary-color)" }}>
            {formats.month.format(time)}
          </div>
          <strong style={{ fontSize: 22 }}>
            {t("employees", { value: formats.number.format(total) })}
          </strong>
        </div>
        {rows.map((row) => (
          <div
            key={row.name}
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto auto",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: row.color,
              }}
            />
            <span>{row.name}</span>
            <strong>{formats.number.format(row.value)}</strong>
            <span style={{ color: "var(--text-secondary-color)" }}>
              {formats.percent.format(row.value / total)}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}

```

## Example: Mirrored in / out

Download above zero and upload below it on the same scale, a common layout for network monitoring; the y format drops the sign.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/area-chart/demos/mirrored.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

const MINUTE = 60 * 1000;
const START = new Date(2026, 9, 30, 9).getTime();

// Bandwidth of a server every minute for two hours (Mbit/s)
const minutes = Array.from({ length: 120 }, (_, i) => i);
const download = minutes.map(
  (i) =>
    [
      START + i * MINUTE,
      Math.round(420 + 180 * Math.sin(i / 11) + 90 * Math.sin(i / 2.3)),
    ] as const,
);
// upload is drawn below zero: same scale, mirrored
const upload = minutes.map(
  (i) =>
    [
      START + i * MINUTE,
      -Math.round(160 + 60 * Math.sin(i / 7 + 1) + 40 * Math.cos(i / 1.7)),
    ] as const,
);

export default function MirroredDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("download"), data: download },
      { name: t("upload"), data: upload },
    ],
    [t],
  );
  // "420 Mb/s", "420 Mbit/s"...: the sign only says the direction
  const bandwidth = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "megabit-per-second",
    });
    return (value: number) => format.format(Math.abs(value));
  }, [locale]);
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }),
    [locale],
  );

  return (
    <AreaChart
      series={series}
      curve="linear"
      xAxis={{ type: "time", format: (value) => time.format(value) }}
      yAxis={{ format: bandwidth }}
      annotations={[{ type: "line", axis: "y", value: 0 }]}
      height={300}
      ariaLabel={t("bandwidthAria")}
    />
  );
}

```

## Example: 100% stacked

percent scales every x to 100% to compare shares rather than amounts, such as a market share; the tooltip shows each value and its share.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/area-chart/demos/percent.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

const years = Array.from({ length: 11 }, (_, i) => String(2016 + i));

// Units shipped (millions) by vendor; `percent` turns them into shares
const vendors = {
  aurora: [38, 41, 47, 52, 58, 66, 71, 74, 79, 83, 88],
  borealis: [52, 50, 49, 47, 44, 43, 41, 40, 38, 37, 35],
  cobalt: [12, 16, 21, 27, 31, 34, 36, 41, 44, 49, 54],
  others: [44, 42, 39, 36, 33, 30, 28, 25, 23, 21, 19],
};

export default function PercentDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const names = {
      aurora: "Aurora",
      borealis: "Borealis",
      cobalt: "Cobalt",
      others: t("others"),
    };
    // "88 million units" in the tooltip
    const units = new Intl.NumberFormat(locale, { notation: "compact" });
    return (Object.keys(vendors) as (keyof typeof vendors)[]).map((key) => ({
      name: names[key],
      format: (value: number) => units.format(value * 1_000_000),
      data: years.map((year, i) => [year, vendors[key][i]] as const),
    }));
  }, [t, locale]);

  return (
    <AreaChart
      series={series}
      percent
      height={300}
      ariaLabel={t("shareAria")}
    />
  );
}

```

## Example: Stacked

stacked piles the areas so the top edge is the total; use it when the parts add up to a meaningful whole. Click a legend item to hide a source and restack the others.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/area-chart/demos/stacked.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

// Monthly visits by traffic source, January to December
const sources = {
  organic: [
    42_000, 44_500, 47_800, 46_900, 51_200, 54_000, 52_300, 55_800, 60_100,
    63_400, 66_200, 70_500,
  ],
  direct: [
    21_000, 21_800, 22_400, 23_900, 24_100, 25_600, 26_000, 25_200, 27_300,
    28_800, 29_500, 31_200,
  ],
  referral: [
    9_800, 10_400, 12_900, 11_700, 12_300, 14_800, 13_900, 14_200, 15_600,
    17_400, 16_900, 18_300,
  ],
  social: [
    6_200, 7_900, 7_100, 8_800, 11_400, 10_200, 9_600, 12_700, 13_100, 12_400,
    15_800, 17_900,
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
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    const names = {
      organic: t("sources.organic"),
      direct: t("sources.direct"),
      referral: t("sources.referral"),
      social: t("sources.social"),
    };
    return (Object.keys(sources) as (keyof typeof sources)[]).map((key) => ({
      name: names[key],
      data: months.map((month, i) => [month, sources[key][i]] as const),
    }));
  }, [t, locale]);
  const compact = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
    [locale],
  );

  return (
    <AreaChart
      series={series}
      stacked
      yAxis={{ format: (value) => compact.format(value) }}
      height={300}
      ariaLabel={t("visitsAria")}
    />
  );
}

```

## Example: Step

curve="step" holds each value until the next one, which suits counts that change at discrete moments; an annotation marks the quota.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/area-chart/demos/step.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const QUARTER_HOUR = 15 * 60 * 1000;
// local midnight, so the time axis reads 00:00 → 24:00 in every time zone
const START = new Date(2026, 5, 15).getTime();
const QUOTA = 14;

export default function StepDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  // Instances started by an autoscaler: the count holds until the next change
  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(8);
    const data: [Date, number][] = [];
    let instances = 3;
    for (let i = 0; i < 96; i++) {
      const hour = i / 4;
      const load = 3 + 9 * Math.exp(-((hour - 14) ** 2) / 18) + random() * 2;
      const target = Math.min(QUOTA, Math.max(2, Math.round(load)));
      // scale out quickly, scale in one instance at a time
      if (target > instances) instances = target;
      else if (target < instances && random() < 0.5) instances -= 1;
      data.push([new Date(START + i * QUARTER_HOUR), instances]);
    }
    return [{ name: t("instances"), data }];
  }, [t]);
  const time = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }),
    [locale],
  );

  return (
    <AreaChart
      series={series}
      curve="step"
      xAxis={{ type: "time", format: (value) => time.format(value) }}
      yAxis={{ zero: true, max: QUOTA + 2 }}
      annotations={[
        {
          type: "line",
          axis: "y",
          value: QUOTA,
          dash: [4, 4],
          color: "var(--danger-color)",
          label: t("quota"),
        },
      ]}
      height={280}
      ariaLabel={t("instancesAria")}
    />
  );
}

```

## Example: Year over year

Last year's season drawn as a faint grey area behind this year's, on the same calendar days; text annotations name the spikes and an x line marks the last shipping day before Christmas.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/area-chart/demos/year-over-year.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  AreaChart,
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

const DAYS = 61; // November and December
const day = (i: number) => new Date(2026, 10, 1 + i).getTime();
const LAST_SHIPPING = 47; // December 18

/**
 * Daily orders of an online shop during the holiday season: Black Friday
 * and Cyber Monday spikes, then a drop after the last shipping day
 */
const season = (seed: number, scale: number, blackFriday: number) => {
  const random = mulberry32(seed);
  return Array.from({ length: DAYS }, (_, i) => {
    const spike = (at: number, height: number) =>
      height * Math.exp(-Math.abs(i - at) / 1.2);
    const lift =
      1 + i / 90 + spike(blackFriday, 2.4) + spike(blackFriday + 3, 1.5);
    const after = i > LAST_SHIPPING ? 0.45 : 1;
    const noise = 0.92 + random() * 0.16;
    return Math.round(1800 * scale * lift * after * noise);
  });
};
// both years on the same calendar days: Black Friday moves by one day
const thisYear = season(26, 1.14, 26);
const lastYear = season(25, 1, 27);
const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);

export default function YearOverYearDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("lastYear"),
        color: "var(--text-secondary-color)",
        opacity: 0.15,
        lineWidth: 1,
        data: lastYear.map((value, i) => [day(i), value] as const),
      },
      {
        name: t("thisYear"),
        opacity: 0.3,
        data: thisYear.map((value, i) => [day(i), value] as const),
      },
    ],
    [t],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "text",
        x: day(26),
        y: thisYear[26],
        text: t("blackFriday"),
        anchor: "right",
        color: "var(--text-color)",
      },
      {
        type: "text",
        x: day(29),
        y: thisYear[29],
        text: t("cyberMonday"),
        anchor: "left",
        color: "var(--text-color)",
      },
      {
        type: "line",
        axis: "x",
        value: day(LAST_SHIPPING),
        dash: [4, 4],
        color: "var(--danger-color)",
        label: t("lastShipping"),
      },
    ],
    [t],
  );
  const formats = useMemo(
    () => ({
      number: new Intl.NumberFormat(locale),
      compact: new Intl.NumberFormat(locale, { notation: "compact" }),
      change: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
      date: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    }),
    [locale],
  );
  const total = sum(thisYear);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <AreaChart
        series={series}
        annotations={annotations}
        curve="linear"
        crosshair
        xAxis={{ type: "time", format: (x) => formats.date.format(x) }}
        yAxis={{ format: (y) => formats.compact.format(y) }}
        height={320}
        ariaLabel={t("seasonAria")}
      />
      <p style={{ margin: 0 }}>
        {t("seasonSummary", {
          total: formats.number.format(total),
          change: formats.change.format(total / sum(lastYear) - 1),
        })}
      </p>
    </div>
  );
}

```

## Example: Total of the visible range

onZoom reports the visible x range after every zoom and pan: the readout sums the solar energy of the days in view. The button calls resetZoom() on the chart ref.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/area-chart/demos/zoom-total.tsx

```tsx
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  AreaChart,
  type ChartHandle,
  type ChartSeries,
  type ChartView,
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

// Daily energy of a rooftop solar installation (kWh): long summer days,
// short winter days and cloudy spells
const random = mulberry32(365);
const production = Array.from({ length: 365 }, (_, day) => {
  const season = 0.55 + 0.45 * Math.sin(((day - 80) / 365) * 2 * Math.PI);
  const clouds = 0.35 + 0.65 * random() ** 0.5;
  return [
    START + day * DAY,
    Math.round(32 * season * clouds * 10) / 10,
  ] as const;
});

/** Total and daily average of the days inside [from, to] */
const stats = (from: number, to: number) => {
  const days = production.filter(([time]) => time >= from && time <= to);
  const total = days.reduce((sum, [, kwh]) => sum + kwh, 0);
  return { total, average: days.length ? total / days.length : 0, from, to };
};
const ALL = stats(START, START + 364 * DAY);

export default function ZoomTotalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.area-chart.data",
  });
  const locale = i18n.language;
  const chart = useRef<ChartHandle>(null);
  const [visible, setVisible] = useState(ALL);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("solarProduction"),
        color: "var(--warning-color)",
        data: production,
      },
    ],
    [t],
  );
  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return {
      kwh: (value: number) => t("kwh", { value: number.format(value) }),
      date: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    };
  }, [t, locale]);

  // onZoom reports the visible x range after every zoom and pan
  const onZoom = (view: ChartView) => setVisible(stats(view.x[0], view.x[1]));
  const reset = () => {
    chart.current?.resetZoom();
    setVisible(ALL);
  };

  return (
    <div style={{ display: "grid", gap: 10, width: "100%" }}>
      <AreaChart
        ref={chart}
        series={series}
        curve="linear"
        onZoom={onZoom}
        xAxis={{ type: "time", format: (x) => formats.date.format(x) }}
        yAxis={{ format: formats.kwh }}
        legend={false}
        height={280}
        ariaLabel={t("solarAria")}
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
          disabled={visible === ALL}
          onClick={reset}
        >
          {t("resetZoom")}
        </Button>
        <output aria-live="polite">
          {t("visibleTotal", {
            from: formats.date.format(visible.from),
            to: formats.date.format(visible.to),
            total: formats.kwh(visible.total),
            average: formats.kwh(visible.average),
          })}
        </output>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 13,
          color: "var(--text-secondary-color)",
        }}
      >
        {t("zoomHint")}
      </p>
    </div>
  );
}

```
