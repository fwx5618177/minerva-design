# Box plot

Medians, quartiles, whiskers and outliers to compare distributions, from raw samples or computed statistics. Outliers are rings of the series color: hover one to read its value and group.

Package: minerva-design@1.22.0

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Gateway

Auth

Search

Checkout

Recommendations

Images

Response time

Max

Q3

Median

Q1

Min

Outliers

Distribution of the response time of each service

Yearly salary

Junior developer

Developer

Senior developer

Tech lead

Engineering manager

Distribution of the salaries per role

Weekdays

Weekends

Paris

Lyon

Marseille

Lille

Delivery time (hours)

Delivery times per city on weekdays and weekends

Daily high

Mean

Distribution of the daily high temperatures per month

Lint

Unit tests

Integration

End-to-end

Release

Whisker reach

1.5 × IQR

3 × IQR

Min – max

Outlier shape

Hollow

Filled

{{value}} runs drawn as outliers

Build time

Distribution of the build durations of each CI pipeline

Click a box or an outlier.

{{day}}: a patient waited {{value}}.

{{day}}: median wait {{median}}, half of the patients waited between {{q1}} and {{q3}}, {{outliers}} outliers.

Wait

Four-hour target

Distribution of the emergency room waits per day of the week

Style sheets

Scripts

Fonts

Images

Videos

Log scale

{{value}} files are over the budget of {{budget}}.

File size

Budget

Distribution of the file sizes of a website by type

US East

US West

EU West

Asia Pacific South

South America East

Pause

Resume

SLA at risk in {{regions}}

Every region is within the SLA

Latency

SLA

Live distribution of the request latency in each region

## BoxPlotChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "BoxPlotChart"
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
    "typeText": "readonly ChartSeries[] | undefined",
    "typeRef": "type:f8b682a7983af505585d",
    "required": false,
    "description": "Series of box plots: data points with `low`, `q1`, `y` (the median), `q3`, `high` and `outliers` (see `boxplotData` / `boxplotStats`)"
  },
  {
    "name": "groups",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly BoxplotGroup[] | undefined",
    "typeRef": "type:8c03c4dd37e605ff7493",
    "required": false,
    "description": "Raw samples, one box each (an alternative to `series`)"
  },
  {
    "name": "name",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "Values",
    "required": false,
    "description": "Name of the series built from `groups`"
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
    "description": "`horizontal` lays the boxes out in rows"
  },
  {
    "name": "outlierShape",
    "source": "packages/charts/src/react/types.ts",
    "kind": "enum",
    "values": [
      "filled",
      "hollow"
    ],
    "typeText": "\"filled\" | \"hollow\" | undefined",
    "typeRef": "type:de3eb4c626f217cc19bd",
    "default": "hollow",
    "required": false,
    "description": "Outliers drawn as rings of the series color or as filled dots (series may set their own `outlierShape`)"
  },
  {
    "name": "outlierSize",
    "source": "packages/charts/src/react/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 7,
    "required": false,
    "description": "Diameter of the outliers in CSS pixels"
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
    "name": "whisker",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "union",
    "typeText": "number | \"minmax\" | undefined",
    "typeRef": "type:85f720dbd65dfdb3ee25",
    "default": 1.5,
    "required": false,
    "description": "Reach of the whiskers in interquartile ranges beyond the box (Tukey: 1.5); `\"minmax\"` extends them to the extremes (no outliers)"
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
  "BoxPlotChartProps": {
    "source": "charts/src/react/types.ts",
    "description": "Props of BoxPlotChart",
    "kind": "interface",
    "extends": [
      "ChartCommonProps",
      "BoxplotStatsOptions"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly ChartSeries[]",
        "required": false,
        "description": "Series of box plots: data points with `low`, `q1`, `y` (the median), `q3`, `high` and `outliers` (see `boxplotData` / `boxplotStats`)"
      },
      {
        "name": "groups",
        "type": "readonly BoxplotGroup[]",
        "required": false,
        "description": "Raw samples, one box each (an alternative to `series`)"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "\"Values\"",
        "description": "Name of the series built from `groups`"
      },
      {
        "name": "orientation",
        "type": "ChartOrientation",
        "required": false,
        "default": "\"vertical\"",
        "description": "`horizontal` lays the boxes out in rows"
      },
      {
        "name": "outlierShape",
        "type": "\"hollow\" | \"filled\"",
        "required": false,
        "default": "\"hollow\"",
        "description": "Outliers drawn as rings of the series color or as filled dots (series may set their own `outlierShape`)"
      },
      {
        "name": "outlierSize",
        "type": "number",
        "required": false,
        "default": "7",
        "description": "Diameter of the outliers in CSS pixels"
      }
    ]
  },
  "BoxplotGroup": {
    "source": "charts/src/engine/presets.ts",
    "description": "A sample of a box plot",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "x",
        "type": "ChartXValue",
        "required": true,
        "description": "Category (or position) of the box"
      },
      {
        "name": "values",
        "type": "ArrayLike<number>",
        "required": true,
        "description": "Raw values: their quartiles, whiskers and outliers are computed"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color of the box (any CSS color)"
      }
    ]
  },
  "BoxplotStats": {
    "source": "charts/src/engine/presets.ts",
    "description": "Five-number summary of a sample, with the outliers",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Lower whisker: the smallest value within reach"
      },
      {
        "name": "q1",
        "type": "number",
        "required": true,
        "description": "First quartile"
      },
      {
        "name": "median",
        "type": "number",
        "required": true
      },
      {
        "name": "q3",
        "type": "number",
        "required": true,
        "description": "Third quartile"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "Upper whisker: the largest value within reach"
      },
      {
        "name": "outliers",
        "type": "number[]",
        "required": true,
        "description": "Values beyond the whiskers"
      },
      {
        "name": "min",
        "type": "number",
        "required": true
      },
      {
        "name": "max",
        "type": "number",
        "required": true
      },
      {
        "name": "mean",
        "type": "number",
        "required": true
      },
      {
        "name": "count",
        "type": "number",
        "required": true,
        "description": "Number of finite values"
      }
    ]
  },
  "BoxplotStatsOptions": {
    "source": "charts/src/engine/presets.ts",
    "description": "Options of `boxplotStats`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "whisker",
        "type": "number | \"minmax\"",
        "required": false,
        "default": "1.5",
        "description": "Reach of the whiskers in interquartile ranges beyond the box (Tukey: 1.5); `\"minmax\"` extends them to the extremes (no outliers)"
      }
    ]
  },
  "ChartTooltipLabels": {
    "source": "charts/src/engine/types.ts",
    "description": "Row names of the default tooltip (candlesticks, box plots, ranges, bubbles)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "open",
        "type": "string",
        "required": false,
        "default": "\"Open\""
      },
      {
        "name": "high",
        "type": "string",
        "required": false,
        "default": "\"High\""
      },
      {
        "name": "low",
        "type": "string",
        "required": false,
        "default": "\"Low\""
      },
      {
        "name": "close",
        "type": "string",
        "required": false,
        "default": "\"Close\""
      },
      {
        "name": "max",
        "type": "string",
        "required": false,
        "default": "\"Max\"",
        "description": "Box plot upper whisker"
      },
      {
        "name": "q3",
        "type": "string",
        "required": false,
        "default": "\"Q3\""
      },
      {
        "name": "median",
        "type": "string",
        "required": false,
        "default": "\"Median\""
      },
      {
        "name": "q1",
        "type": "string",
        "required": false,
        "default": "\"Q1\""
      },
      {
        "name": "min",
        "type": "string",
        "required": false,
        "default": "\"Min\"",
        "description": "Box plot lower whisker"
      },
      {
        "name": "outliers",
        "type": "string",
        "required": false,
        "default": "\"Outliers\"",
        "description": "Number of outliers"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "default": "\"Value\"",
        "description": "Scatter `value` (bubbles) when the series has no `valueName`"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Log scale

File sizes from a few kilobytes to tens of megabytes: yAxis.type: "log" keeps every box readable, while on a linear axis the small files are crushed against zero. The format switches from kB to MB and a line marks the size budget.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/demos/asset-sizes.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { BoxPlotChart, type BoxplotGroup } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BUDGET = 500; // kB per file

// Size (kB) of the files a website serves, by type: from 1 kB icons to
// 40 MB videos, log-normal in every type
const types = [
  ["styles", 18, 0.9],
  ["scripts", 45, 1.1],
  ["fonts", 60, 0.5],
  ["images", 140, 1.2],
  ["videos", 6000, 0.9],
] as const;
const sizes = types.map(([, median, spread], i) => {
  const random = mulberry32(300 + i);
  return Float64Array.from({ length: 250 }, () => {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    return median * Math.exp(spread * z);
  });
});

export default function AssetSizesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const [log, setLog] = useState(true);

  // kilobytes below 1,000 kB, megabytes above
  const bytes = useMemo(() => {
    const kb = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "kilobyte",
      maximumSignificantDigits: 3,
    });
    const mb = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "megabyte",
      maximumSignificantDigits: 3,
    });
    return (value: number) =>
      value >= 1000 ? mb.format(value / 1000) : kb.format(value);
  }, [locale]);
  const groups = useMemo(
    (): BoxplotGroup[] =>
      types.map(([key], i) => ({
        x: t(`assetTypes.${key}`),
        values: sizes[i] ?? [],
      })),
    [t],
  );
  const overBudget = useMemo(
    () =>
      sizes.flatMap((values) => [...values]).filter((v) => v > BUDGET).length,
    [],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Switch checked={log} onChange={setLog} label={t("logScale")} />
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)" }}
        >
          {t("overBudget", {
            value: new Intl.NumberFormat(locale).format(overBudget),
            budget: bytes(BUDGET),
          })}
        </output>
      </div>
      <BoxPlotChart
        groups={groups}
        name={t("fileSize")}
        // on a linear axis the small files are crushed against zero
        yAxis={
          log
            ? { type: "log", min: 0.5, max: 100_000, format: bytes }
            : { min: 0, format: bytes }
        }
        annotations={[
          {
            type: "line",
            axis: "y",
            value: BUDGET,
            color: "var(--warning-color)",
            dash: [4, 4],
            label: t("budget"),
          },
        ]}
        height={340}
        ariaLabel={t("assetsAria")}
      />
    </div>
  );
}

```

## Example: Whisker rules

CI build durations per pipeline. whisker sets how far the whiskers reach (1.5 or 3 interquartile ranges, or "minmax" for no outliers), and outlierShape and outlierSize change how the slow runs are drawn; boxplotStats with the same rule counts them.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/demos/build-times.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  BoxPlotChart,
  boxplotStats,
  type BoxplotGroup,
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

// 300 CI runs (minutes) of every pipeline over a month: a typical duration,
// a spread, and a share of runs that miss the cache and take much longer
const pipelines = [
  ["lint", 2.1, 0.3, 0.02],
  ["unit", 6.5, 0.9, 0.04],
  ["integration", 14, 2.2, 0.06],
  ["e2e", 22, 4, 0.08],
  ["release", 11, 1.2, 0.12],
] as const;
const runs = pipelines.map(([, typical, spread, misses], p) => {
  const random = mulberry32(500 + p);
  return Float64Array.from({ length: 300 }, () => {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    const miss = random() < misses ? typical * (0.8 + random()) : 0;
    return Math.max(0.5, typical + spread * z + miss);
  });
});

const whiskers = { tukey: 1.5, wide: 3, minmax: "minmax" } as const;
type Whisker = keyof typeof whiskers;

export default function BuildTimesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const [whisker, setWhisker] = useState<Whisker>("tukey");
  const [shape, setShape] = useState<"hollow" | "filled">("hollow");

  const minutes = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "minute",
      unitDisplay: "short",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const groups = useMemo(
    (): BoxplotGroup[] =>
      pipelines.map(([key], i) => ({
        x: t(`pipelines.${key}`),
        values: runs[i] ?? [],
      })),
    [t],
  );
  // the same rule as the chart, to count the runs drawn as outliers
  const outliers = useMemo(
    () =>
      runs.reduce(
        (n, values) =>
          n +
          boxplotStats(values, { whisker: whiskers[whisker] }).outliers.length,
        0,
      ),
    [whisker],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadioGroup
        aria-label={t("whiskerRule")}
        direction="horizontal"
        value={whisker}
        onChange={(value) => setWhisker(value as Whisker)}
      >
        <Radio value="tukey" label={t("whiskers.tukey")} />
        <Radio value="wide" label={t("whiskers.wide")} />
        <Radio value="minmax" label={t("whiskers.minmax")} />
      </RadioGroup>
      <RadioGroup
        aria-label={t("outlierShape")}
        direction="horizontal"
        value={shape}
        onChange={(value) => setShape(value as "hollow" | "filled")}
      >
        <Radio value="hollow" label={t("shapes.hollow")} />
        <Radio value="filled" label={t("shapes.filled")} />
      </RadioGroup>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("outlierRuns", {
          value: new Intl.NumberFormat(locale).format(outliers),
        })}
      </output>
      <BoxPlotChart
        groups={groups}
        name={t("buildTime")}
        whisker={whiskers[whisker]}
        outlierShape={shape}
        outlierSize={shape === "filled" ? 5 : 8}
        yAxis={{ format: minutes, min: 0 }}
        height={340}
        ariaLabel={t("buildsAria")}
      />
    </div>
  );
}

```

## Example: Grouped

boxplotData turns samples into box plot data: one series per period, the boxes of each city side by side.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/demos/grouped.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  BoxPlotChart,
  boxplotData,
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

// Delivery times (hours) per city, on weekdays and on weekends
const cities = ["paris", "lyon", "marseille", "lille"] as const;
const sample = (seed: number, mean: number) => {
  const random = mulberry32(seed);
  return Array.from(
    { length: 400 },
    () => mean * (0.5 + random() + random() ** 6 * 1.5),
  );
};

export default function GroupedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const hours = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "hour",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  // boxplotData turns raw samples into box plot data: one series per period
  const series = useMemo(
    (): ChartSeries[] =>
      (["weekdays", "weekends"] as const).map((period, p) => ({
        name: t(`periods.${period}`),
        format: hours,
        data: boxplotData(
          cities.map((city, c) => ({
            x: t(`cities.${city}`),
            values: sample(c * 10 + p, p ? 31 : 22 + c * 3),
          })),
        ),
      })),
    [t, hours],
  );

  return (
    <BoxPlotChart
      series={series}
      yAxis={{ title: t("hours"), zero: true }}
      height={320}
      ariaLabel={t("deliveryAria")}
    />
  );
}

```

## Example: Horizontal

Statistics already computed (one datum with low, q1, y as the median, q3, high and outliers per box) in rows with orientation: "horizontal".

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/demos/horizontal.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BoxPlotChart, type ChartSeries } from "minerva-design/charts";

// Yearly salaries (k€) per role, from a public salary survey: the summary
// statistics are already computed, one datum per box
const roles = [
  ["junior", 38, 42, 46, 51, 58, [66, 71]],
  ["developer", 45, 52, 58, 64, 76, [88]],
  ["senior", 58, 66, 72, 80, 95, [110, 118]],
  ["lead", 70, 78, 86, 95, 112, []],
  ["manager", 72, 84, 92, 104, 128, [145]],
] as const;

export default function HorizontalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("salary"),
        color: "var(--chart-series-6, #8b5cf6)",
        format: euros,
        data: roles.map(([key, low, q1, median, q3, high, outliers]) => ({
          x: t(`roles.${key}`),
          low,
          q1,
          y: median,
          q3,
          high,
          outliers,
        })),
      },
    ],
    [t, euros],
  );

  // orientation="horizontal": one row per role, the values along the bottom
  return (
    <BoxPlotChart
      series={series}
      orientation="horizontal"
      yAxis={{ format: euros }}
      height={300}
      ariaLabel={t("salariesAria")}
    />
  );
}

```

## Example: Live latency per region

Every second a setInterval (cleared on pause and unmount) slides a window over the latest requests of each region. The color of a group turns red when its third quartile exceeds the SLA line, and the y axis range is fixed so the boxes stay comparable.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/demos/live-regions.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  BoxPlotChart,
  boxplotStats,
  type BoxplotGroup,
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

const WINDOW = 200; // requests kept per region
const PER_TICK = 20; // requests per region every second
const SLA = 300; // ms

const regions = [
  ["usEast", 120],
  ["usWest", 140],
  ["euWest", 110],
  ["apSouth", 190],
  ["saEast", 170],
] as const;

/**
 * Latency (ms) of request `n` of region `r`, derived from both alone so the
 * stream is deterministic; every region has a slow period now and then
 */
const latencyOf = (r: number, n: number) => {
  const random = mulberry32(r * 1_000_003 + n * 7919);
  const z =
    Math.sqrt(-2 * Math.log(random() || 1e-12)) *
    Math.cos(2 * Math.PI * random());
  const base = regions[r]?.[1] ?? 100;
  const degraded = Math.sin(n / 90 + r * 1.7) > 0.8 ? 2.4 : 1;
  return base * degraded * Math.exp(0.35 * z);
};

export default function LiveRegionsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setTick((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [running]);

  // the last WINDOW requests of every region
  const samples = useMemo(() => {
    const last = WINDOW + tick * PER_TICK;
    return regions.map((_, r) =>
      Float64Array.from({ length: WINDOW }, (_, i) =>
        latencyOf(r, last - WINDOW + i),
      ),
    );
  }, [tick]);
  const breaching = useMemo(
    () =>
      samples.map((values) => {
        const stats = boxplotStats(values);
        return stats.q3 > SLA;
      }),
    [samples],
  );
  // a region turns red when a quarter of its requests exceed the SLA
  const groups = useMemo(
    (): BoxplotGroup[] =>
      regions.map(([key], r) => ({
        x: t(`regions.${key}`),
        values: samples[r] ?? [],
        color: breaching[r] ? "var(--danger-color)" : undefined,
      })),
    [t, samples, breaching],
  );
  const ms = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const names = regions
    .filter((_, r) => breaching[r])
    .map(([key]) => t(`regions.${key}`));
  const list = new Intl.ListFormat(locale, { type: "conjunction" });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
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
        <output
          aria-live="polite"
          style={{
            color: names.length
              ? "var(--danger-color)"
              : "var(--text-secondary-color)",
          }}
        >
          {names.length
            ? t("slaBreached", { regions: list.format(names) })
            : t("slaOk")}
        </output>
      </div>
      <BoxPlotChart
        groups={groups}
        name={t("latency")}
        // a fixed range keeps the boxes comparable from one second to the next
        yAxis={{ format: ms, min: 0, max: 1200 }}
        annotations={[
          {
            type: "line",
            axis: "y",
            value: SLA,
            color: "var(--danger-color)",
            dash: [4, 4],
            label: t("sla"),
          },
        ]}
        height={340}
        ariaLabel={t("regionsAria")}
      />
    </div>
  );
}

```

## Example: Response time per service

groups takes the raw samples of every box: the quartiles, the whiskers (1.5 interquartile ranges) and the outliers are computed; tooltip.labels translates the rows of the tooltip.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/demos/services.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BoxPlotChart, type BoxplotGroup } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 2,000 response times (ms) of each service over the last hour
const services = [
  ["gateway", 18, 0.35],
  ["auth", 32, 0.3],
  ["search", 95, 0.45],
  ["checkout", 140, 0.38],
  ["recommendations", 210, 0.5],
  ["images", 60, 0.6],
] as const;
const samples = services.map(([, median, spread], s) => {
  const random = mulberry32(100 + s);
  return Float64Array.from({ length: 2000 }, () => {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    return median * Math.exp(spread * z);
  });
});

export default function ServicesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
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

  // raw samples: the quartiles, whiskers (1.5 IQR) and outliers are computed
  const groups = useMemo(
    (): BoxplotGroup[] =>
      services.map(([key], i) => ({
        x: t(`services.${key}`),
        values: samples[i] ?? [],
      })),
    [t],
  );

  return (
    <BoxPlotChart
      groups={groups}
      name={t("responseTime")}
      yAxis={{ format: ms }}
      tooltip={{
        labels: {
          max: t("stats.max"),
          q3: t("stats.q3"),
          median: t("stats.median"),
          q1: t("stats.q1"),
          min: t("stats.min"),
          outliers: t("stats.outliers"),
        },
      }}
      height={340}
      ariaLabel={t("servicesAria")}
    />
  );
}

```

## Example: With a line

boxplotStats gives the five numbers and the mean of each month: whisker: "minmax" extends the whiskers to the extremes and a line joins the means.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/demos/temperatures.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  BoxPlotChart,
  boxplotStats,
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

// 30 years of daily maximum temperatures (°C) per month
const months = Array.from({ length: 12 }, (_, m) => {
  const random = mulberry32(m + 1);
  const normal = 13 - 9 * Math.cos(((m + 0.5) / 12) * Math.PI * 2);
  return Array.from(
    { length: 900 },
    () => normal + (random() + random() + random() - 1.5) * 6,
  );
});

export default function TemperaturesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
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

  // boxplotStats gives the five numbers and the mean: the whiskers reach the
  // extremes ("minmax", no outliers) and a line joins the means
  const series = useMemo((): ChartSeries[] => {
    const names = Array.from({ length: 12 }, (_, m) =>
      new Intl.DateTimeFormat(locale, { month: "short" }).format(
        new Date(2026, m, 1),
      ),
    );
    const stats = months.map((values) =>
      boxplotStats(values, { whisker: "minmax" }),
    );
    return [
      {
        name: t("dailyHigh"),
        color: "var(--chart-series-4, #ef4444)",
        format: celsius,
        data: stats.map((s, m) => ({
          x: names[m],
          low: s.low,
          q1: s.q1,
          y: s.median,
          q3: s.q3,
          high: s.high,
        })),
      },
      {
        name: t("mean"),
        type: "line",
        curve: "smooth",
        color: "var(--text-secondary-color, #6b7280)",
        lineWidth: 1.5,
        format: celsius,
        data: stats.map((s, m) => [names[m] ?? "", s.mean] as const),
      },
    ];
  }, [t, locale, celsius]);

  return (
    <BoxPlotChart
      series={series}
      yAxis={{ format: celsius }}
      height={320}
      ariaLabel={t("temperaturesAria")}
    />
  );
}

```

## Example: Click a box or an outlier

Emergency room waits per weekday. onPointClick receives the median, q1, q3 and the number of outliers of the clicked box, or the value of the clicked outlier in item.outlier; on the category axis, event.x is the index of the day.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/demos/wait-times.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BoxPlotChart,
  type BoxplotGroup,
  type ChartHoverEvent,
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

const TARGET = 240; // minutes: the four-hour standard of the emergency room

// Emergency room waits (minutes) over a quarter, Monday to Sunday: busier
// on Mondays and weekend nights, with a few very long waits
const typical = [150, 120, 110, 115, 125, 140, 160];
const waits = typical.map((median, day) => {
  const random = mulberry32(900 + day);
  return Float64Array.from({ length: 400 }, () => {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    return Math.round(median * Math.exp(0.42 * z));
  });
});

export default function WaitTimesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  const locale = i18n.language;
  const [clicked, setClicked] = useState<{
    day: number;
    outlier?: number;
    median: number;
    q1: number;
    q3: number;
    outliers: number;
  } | null>(null);

  const minutes = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "minute",
      unitDisplay: "short",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const groups = useMemo((): BoxplotGroup[] => {
    // 1 January 2024 is a Monday
    const weekday = new Intl.DateTimeFormat(locale, {
      weekday: "long",
      timeZone: "UTC",
    });
    return waits.map((values, day) => ({
      x: weekday.format(Date.UTC(2024, 0, 1 + day)),
      values,
    }));
  }, [locale]);

  // a click on a box gives its statistics, a click on an outlier its value;
  // on the category axis, x is the index of the day
  const click = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return;
    setClicked({
      day: Math.round(event.x),
      outlier: item.outlier,
      median: item.y,
      q1: item.q1 ?? item.y,
      q3: item.q3 ?? item.y,
      outliers: item.outliers ?? 0,
    });
  };
  const day = clicked ? String(groups[clicked.day]?.x ?? "") : "";
  const status = !clicked
    ? t("clickBox")
    : clicked.outlier !== undefined
      ? t("outlierClicked", { day, value: minutes(clicked.outlier) })
      : t("boxClicked", {
          day,
          median: minutes(clicked.median),
          q1: minutes(clicked.q1),
          q3: minutes(clicked.q3),
          outliers: new Intl.NumberFormat(locale).format(clicked.outliers),
        });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {status}
      </output>
      <BoxPlotChart
        groups={groups}
        name={t("wait")}
        outlierShape="filled"
        yAxis={{ format: minutes, min: 0, title: t("wait") }}
        annotations={[
          {
            type: "rect",
            y0: TARGET,
            color: "var(--danger-color)",
            opacity: 0.06,
          },
          {
            type: "line",
            axis: "y",
            value: TARGET,
            color: "var(--danger-color)",
            dash: [4, 4],
            label: t("fourHours"),
          },
        ]}
        onPointClick={click}
        onPlotClick={() => setClicked(null)}
        height={340}
        ariaLabel={t("waitsAria")}
      />
    </div>
  );
}

```
