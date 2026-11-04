# Scatter chart

Dots positioned by two values, with per-point size, color and label. Zooms on both axes.

Package: minerva-design@1.20.4

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

Starter

Business

Seats

Monthly bill

Monthly bill by number of seats, per plan

Countries

GDP per capita

Life expectancy

Life expectancy by GDP per capita; dot size is the population

Cluster {{name}}

Two clusters of 100,000 points each

{{points}} points · drawn with {{renderer}}

Session length against pages viewed

Minutes

Pages

Free

Pro

{{plan}}: {{minutes}} min, {{pages}} pages

Tap a dot

Campaigns

Trend

Ad spend per week

Revenue per week

R² = {{r2}} · +{{slope}} of revenue per dollar spent

Revenue against ad spend for 60 campaigns, with a trend line

Adélie

Chinstrap

Gentoo

Flipper length

Body mass

Flipper length against body mass of three penguin species

Requests

Outlier

Expected

Payload size

Response time

Response time against payload size, outliers in red

{{slow}} of {{total}} requests took more than twice the expected time.

Readings

Cool nights

Growing range

Hot afternoons

Show all

Temperature

Relative humidity

Growing range

Temperature and humidity readings of the greenhouse sensors

Visible: {{t0}} – {{t1}}, humidity {{h0}} – {{h1}} · readings in view: {{points}}

Pick a region, or zoom with Ctrl / ⌘ + wheel

Engineering

Sales

Support

Tenure

Review score (1–5)

Company average

Tenure and review score of 90 employees by department

{{id}} · {{department}} · {{tenure}} · score {{score}} · {{salary}} a year

Click a dot to select an employee, click the empty plot to clear the selection

Players

League average

Efficient scorers

Volume shooters

{{value}} points per game

Usage rate: {{value}}

True shooting: {{value}}

Usage rate

True shooting

Usage rate against shooting efficiency of 16 players; the dot size is the points per game

Normal

Alarm

Latest

{{value}} mm/s

Pause

Resume

Latest sample: {{rpm}} rpm, {{value}} · alarms on screen: {{alarms}}

Speed (rpm)

Vibration

Alarm limit

Live vibration of a motor against its speed

Mammals

Shrew

Mouse

Rat

Rabbit

Cat

Dog

Human

Pig

Horse

Cow

Giraffe

Elephant

Power-law fit

{{value}} kg

{{value}} W

Body mass

Basal metabolic rate

Metabolic rate ∝ mass^{{exponent}} (Kleiber's law)

Basal metabolic rate against body mass of 12 mammals, on log-log axes

## ScatterChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "ScatterChart"
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
    "description": "Series drawn as dots unless they set a `type`"
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
  "ScatterChartProps": {
    "source": "charts/src/react/types.ts",
    "description": "Props of ScatterChart",
    "kind": "interface",
    "extends": [
      "ChartCommonProps"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly ChartSeries[]",
        "required": true,
        "description": "Series drawn as dots unless they set a `type`"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic

Two series of [x, y] tuples with axis titles; the tooltip shows the nearest dot.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-chart/demos/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Customers of two plans: seats against monthly bill (USD)
const random = mulberry32(9);
const plan = (price: number, slope: number) =>
  Array.from({ length: 40 }, () => {
    const seats = 1 + Math.round(random() * 49);
    return [
      seats,
      Math.round(price + seats * slope * (0.8 + random() * 0.4)),
    ] as const;
  });
const starter = plan(20, 9);
const business = plan(60, 14);

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("starter"), data: starter },
      { name: t("business"), data: business },
    ],
    [t],
  );
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  return (
    <ScatterChart
      series={series}
      xAxis={{ title: t("seats") }}
      yAxis={{ title: t("monthlyBill"), format: (value) => usd.format(value) }}
      height={300}
      ariaLabel={t("billAria")}
    />
  );
}

```

## Example: Categories

One series per category gives each group its own color and a legend entry that toggles it; here three penguin species by flipper length and body mass.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-chart/demos/categories.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(3);
const gaussian = () =>
  Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());

// Flipper length (mm) and body mass (g) of three penguin species
const species = (flipper: number, mass: number, count: number) =>
  Array.from({ length: count }, () => {
    const size = gaussian();
    return [
      Math.round(flipper + size * 6 + gaussian() * 2),
      Math.round(mass + size * 380 + gaussian() * 160),
    ] as const;
  });
const adelie = species(190, 3700, 70);
const chinstrap = species(196, 3730, 45);
const gentoo = species(217, 5080, 60);

export default function CategoriesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  // one series per category: its own color, legend entry and toggle
  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("penguins.adelie"), data: adelie, opacity: 0.8 },
      { name: t("penguins.chinstrap"), data: chinstrap, opacity: 0.8 },
      { name: t("penguins.gentoo"), data: gentoo, opacity: 0.8 },
    ],
    [t],
  );
  const mm = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "millimeter" }),
    [locale],
  );
  const kg = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "kilogram",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <ScatterChart
      series={series}
      xAxis={{ title: t("flipper"), format: (value) => mm.format(value) }}
      yAxis={{ title: t("mass"), format: (value) => kg.format(value / 1000) }}
      height={320}
      ariaLabel={t("penguinsAria")}
    />
  );
}

```

## Example: Labels and sizes

Point objects carry a label and a size; showLabels draws the labels, skipping overlaps.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-chart/demos/labels.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

// Country code, GDP per capita (k$), life expectancy (years), population (millions)
const countries: [string, number, number, number][] = [
  ["JP", 34, 84.5, 124],
  ["DE", 52, 81.2, 84],
  ["FR", 44, 82.5, 68],
  ["US", 80, 78.4, 335],
  ["BR", 10, 75.9, 216],
  ["IN", 2.5, 70.8, 1430],
  ["CN", 12.6, 78.6, 1410],
  ["NG", 1.6, 54.5, 224],
  ["MX", 13.9, 75.1, 128],
  ["ID", 4.9, 71.9, 278],
];

export default function LabelsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    // country names in the reader's language
    const names = new Intl.DisplayNames([locale], { type: "region" });
    return [
      {
        name: t("countries"),
        showLabels: true,
        opacity: 0.7,
        data: countries.map(([code, x, y, population]) => ({
          x,
          y,
          label: names.of(code) ?? code,
          size: 6 + Math.sqrt(population) * 0.6,
        })),
      },
    ];
  }, [t, locale]);
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
    [locale],
  );
  const years = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "year",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <ScatterChart
      series={series}
      xAxis={{
        title: t("gdp"),
        format: (value) => usd.format(value * 1000),
      }}
      yAxis={{
        title: t("lifeExpectancy"),
        format: (value) => years.format(value),
      }}
      height={320}
      ariaLabel={t("countriesAria")}
    />
  );
}

```

## Example: 200,000 points

Two Gaussian clusters as typed-array columns; hit testing uses a spatial index.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-chart/demos/large-data.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScatterChart,
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

const PER_CLUSTER = 100_000;

export default function LargeDataDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);

  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(1);
    // Box-Muller: normally distributed values
    const gaussian = () =>
      Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
    const cluster = (name: string, cx: number, cy: number, spread: number) => {
      const x = new Float64Array(PER_CLUSTER);
      const y = new Float64Array(PER_CLUSTER);
      for (let i = 0; i < PER_CLUSTER; i++) {
        x[i] = cx + gaussian() * spread;
        y[i] = cy + gaussian() * spread;
      }
      return { name, data: { x, y }, pointSize: 3, opacity: 0.5 };
    };
    return [
      cluster(t("cluster", { name: "A" }), -2, -1, 1.2),
      cluster(t("cluster", { name: "B" }), 2.5, 1.5, 0.9),
    ];
  }, [t]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <ScatterChart
        series={series}
        onRendererChange={setRenderer}
        height={320}
        ariaLabel={t("clustersAria")}
      />
      <p role="status">
        {t("largeStatus", {
          points: new Intl.NumberFormat(i18n.language).format(PER_CLUSTER * 2),
          renderer: renderer ?? "…",
        })}
      </p>
    </div>
  );
}

```

## Example: Live sensor stream

A new vibration sample every 400 ms (a setInterval cleared on pause and on unmount), split into a normal and an alarm series around a reference line; fixed min and max keep the axes still while the data streams in.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-chart/demos/live-stream.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WINDOW = 160; // samples kept on screen
const LIMIT = 7.1; // mm/s, the alarm limit of the vibration velocity

/**
 * Sample number `tick` of a motor's sensor: speed (rpm) and vibration (mm/s).
 * Derived from the tick alone, so the stream is deterministic.
 */
const sampleAt = (tick: number) => {
  const random = mulberry32(tick * 7919);
  const rpm = 2100 + 800 * Math.sin(tick / 23) + (random() - 0.5) * 300;
  // a worn bearing: bursts of strong vibration every 90 samples
  const fault = tick % 90 > 80 ? 4 + random() * 3 : 0;
  const vibration = 0.8 + (rpm / 1000) * 1.4 + (random() - 0.5) * 1.6 + fault;
  return { rpm: Math.round(rpm), vibration: Math.round(vibration * 100) / 100 };
};

export default function LiveStreamDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;
  const [tick, setTick] = useState(WINDOW);
  const [running, setRunning] = useState(true);

  // a new sample every 400 ms, the oldest one drops out
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setTick((value) => value + 1), 400);
    return () => clearInterval(timer);
  }, [running]);

  const samples = useMemo(
    () => Array.from({ length: WINDOW }, (_, i) => sampleAt(tick - WINDOW + i)),
    [tick],
  );
  const latest = samples[samples.length - 1];
  const alarms = samples.filter((s) => s.vibration > LIMIT).length;

  const series = useMemo((): ChartSeries[] => {
    const point = (s: { rpm: number; vibration: number }) =>
      [s.rpm, s.vibration] as const;
    return [
      {
        name: t("normal"),
        data: samples.filter((s) => s.vibration <= LIMIT).map(point),
        pointSize: 6,
        opacity: 0.55,
      },
      {
        name: t("alarm"),
        data: samples.filter((s) => s.vibration > LIMIT).map(point),
        color: "var(--danger-color)",
        pointSize: 8,
      },
      {
        // the newest sample, ringed by a bigger dot
        name: t("latest"),
        data: latest ? [point(latest)] : [],
        color: "var(--text-color)",
        pointSize: 12,
        opacity: 0.35,
      },
    ];
  }, [t, samples, latest]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const velocity = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) => t("mmPerSecond", { value: format.format(value) });
  }, [locale, t]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)" }}
        >
          {latest &&
            t("vibrationStatus", {
              rpm: number.format(latest.rpm),
              value: velocity(latest.vibration),
              alarms: number.format(alarms),
            })}
        </output>
      </div>
      <ScatterChart
        series={series}
        // fixed ranges: the axes do not jump while the data streams in
        xAxis={{
          title: t("speed"),
          min: 1000,
          max: 3200,
          format: (value) => number.format(value),
        }}
        yAxis={{ title: t("vibration"), min: 0, max: 14, format: velocity }}
        annotations={[
          {
            type: "line",
            axis: "y",
            value: LIMIT,
            color: "var(--danger-color)",
            dash: [4, 4],
            label: t("alarmLimit"),
          },
        ]}
        height={320}
        ariaLabel={t("vibrationAria")}
      />
    </div>
  );
}

```

## Example: Log-log axes

xAxis and yAxis with type: "log" turn the power law of the metabolic rates (Kleiber's law) into a straight line across six orders of magnitude; the fit is a two-point line series with tooltip: false.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-chart/demos/log-log.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

// Body mass (kg) and basal metabolic rate (W) of mammals: six orders of
// magnitude of mass, only log axes show them all
const animals: [string, number, number][] = [
  ["shrew", 0.004, 0.06],
  ["mouse", 0.025, 0.21],
  ["rat", 0.3, 1.45],
  ["rabbit", 2.5, 6.7],
  ["cat", 4, 9.8],
  ["dog", 20, 35],
  ["human", 70, 83],
  ["pig", 150, 138],
  ["horse", 500, 380],
  ["cow", 600, 420],
  ["giraffe", 1_200, 640],
  ["elephant", 4_000, 1_700],
];

// Least-squares fit of log B = log a + b · log M: Kleiber's law, b ≈ 3/4
const logs = animals.map(([, m, b]) => [Math.log10(m), Math.log10(b)]);
const n = logs.length;
const mx = logs.reduce((s, [x]) => s + x, 0) / n;
const my = logs.reduce((s, [, y]) => s + y, 0) / n;
const exponent =
  logs.reduce((s, [x, y]) => s + (x - mx) * (y - my), 0) /
  logs.reduce((s, [x]) => s + (x - mx) ** 2, 0);
const coefficient = 10 ** (my - exponent * mx);
const fit = (mass: number) => coefficient * mass ** exponent;

export default function LogLogDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("mammals"),
        showLabels: true,
        pointSize: 9,
        data: animals.map(([key, mass, rate]) => ({
          x: mass,
          y: rate,
          label: t(`animals.${key}`),
        })),
      },
      {
        // a power law is a straight line on log-log axes: two points draw it
        name: t("powerLaw"),
        type: "line",
        lineWidth: 1.5,
        color: "var(--text-secondary-color)",
        tooltip: false,
        data: [
          [0.002, fit(0.002)],
          [8_000, fit(8_000)],
        ],
      },
    ],
    [t],
  );
  const compact = useMemo(
    () => new Intl.NumberFormat(locale, { maximumSignificantDigits: 3 }),
    [locale],
  );
  const kg = (value: number) => t("kg", { value: compact.format(value) });
  const watts = (value: number) => t("watts", { value: compact.format(value) });

  return (
    <ScatterChart
      series={series}
      xAxis={{ type: "log", title: t("bodyMass"), format: kg, grid: true }}
      yAxis={{ type: "log", title: t("metabolicRate"), format: watts }}
      annotations={[
        {
          type: "text",
          x: 0.004,
          y: 1_000,
          anchor: "left",
          text: t("kleiber", {
            exponent: new Intl.NumberFormat(locale, {
              maximumFractionDigits: 2,
            }).format(exponent),
          }),
        },
      ]}
      height={360}
      ariaLabel={t("kleiberAria")}
    />
  );
}

```

## Example: Outliers

Per-point color, size and label flag the requests much slower than expected for their payload; the expected time is a line series.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-chart/demos/outliers.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Expected response time (ms) for a payload size (KB)
const expected = (size: number) => 40 + size * 0.6;
const TOLERANCE = 2; // slower than 2× the expected time = outlier

const random = mulberry32(17);
const requests = Array.from({ length: 300 }, (_, i) => {
  const size = Math.round(5 + random() * 495);
  const slow = i % 37 === 0 ? 2.4 + random() * 2 : 1;
  const time = expected(size) * (0.75 + random() * 0.5) * slow;
  return { size, time: Math.round(time) };
});
const isOutlier = ({ size, time }: { size: number; time: number }) =>
  time > expected(size) * TOLERANCE;
const outlierCount = requests.filter(isOutlier).length;

export default function OutliersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("requests"),
        // outliers are bigger and red
        data: requests.map((request) =>
          isOutlier(request)
            ? {
                x: request.size,
                y: request.time,
                color: "var(--danger-color)",
                size: 11,
                label: t("outlier"),
              }
            : { x: request.size, y: request.time },
        ),
        opacity: 0.6,
        pointSize: 6,
      },
      {
        name: t("expected"),
        type: "line",
        lineWidth: 1.5,
        color: "var(--text-secondary-color)",
        data: [
          [0, expected(0)],
          [500, expected(500)],
        ],
      },
    ],
    [t],
  );
  const kb = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "kilobyte" }),
    [locale],
  );
  const ms = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "millisecond" }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <ScatterChart
        series={series}
        xAxis={{ title: t("payload"), format: (value) => kb.format(value) }}
        yAxis={{
          title: t("responseTime"),
          format: (value) => ms.format(value),
        }}
        height={320}
        ariaLabel={t("outliersAria")}
      />
      <p>
        {t("outliersSummary", { slow: outlierCount, total: requests.length })}
      </p>
    </div>
  );
}

```

## Example: Custom tooltip and regions

renderTooltip replaces the tooltip with React content built from the demo data. The league averages are dashed reference lines, and rect annotations with open bounds shade two corners up to the edges of the plot.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-chart/demos/players.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ScatterChart,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Basketball league: usage rate (% of the team's plays a player finishes),
// true shooting (%) and points per game of 16 (fictional) players
const players: [string, number, number, number][] = [
  ["A. Okafor", 31.5, 61.2, 29.8],
  ["L. Moreau", 29.8, 55.1, 27.1],
  ["K. Tanaka", 27.2, 63.4, 24.6],
  ["D. Silva", 33.1, 53.2, 28.4],
  ["M. Novak", 18.4, 66.8, 14.2],
  ["J. Reyes", 21.6, 59.7, 17.9],
  ["T. Brooks", 24.9, 52.4, 19.6],
  ["S. Ivanov", 16.2, 62.1, 10.4],
  ["R. Chen", 22.8, 57.3, 18.1],
  ["P. Mensah", 14.9, 54.8, 8.7],
  ["E. Larsen", 26.4, 58.9, 22.3],
  ["H. Kim", 19.7, 51.6, 12.9],
  ["F. Rossi", 28.6, 60.4, 25.7],
  ["O. Haddad", 17.3, 57.8, 11.6],
  ["N. Dubois", 23.5, 64.2, 20.2],
  ["C. Walker", 30.2, 57.9, 26.8],
];
const LEAGUE_USAGE = 20;
const LEAGUE_TS = 57.5;

export default function PlayersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;
  const decimal = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value / 100);
  }, [locale]);

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("players"),
        showLabels: true,
        // the dot grows with the points per game
        data: players.map(([name, usage, ts, points]) => ({
          x: usage,
          y: ts,
          label: name,
          size: 4 + points / 2.5,
        })),
        opacity: 0.8,
      },
    ],
    [t],
  );
  // league averages split the plot; a caption names each corner
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      { type: "line", axis: "x", value: LEAGUE_USAGE, dash: [4, 4] },
      {
        type: "line",
        axis: "y",
        value: LEAGUE_TS,
        dash: [4, 4],
        label: t("leagueAverage"),
      },
      {
        type: "rect",
        x0: LEAGUE_USAGE,
        y0: LEAGUE_TS,
        color: "var(--success-color)",
        opacity: 0.08,
        label: t("efficientScorers"),
        labelPosition: "top-right",
      },
      {
        type: "rect",
        x0: LEAGUE_USAGE,
        y1: LEAGUE_TS,
        color: "var(--warning-color)",
        opacity: 0.08,
        label: t("volumeShooters"),
        labelPosition: "bottom-right",
      },
    ],
    [t],
  );

  // a rich tooltip from the demo data (the hovered index is the player's)
  const tooltip = (event: ChartHoverEvent) => {
    const player = players[event.items[0]?.index ?? -1];
    if (!player) return null;
    const [name, usage, ts, points] = player;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{name}</strong>
        <span>{t("pointsPerGame", { value: decimal.format(points) })}</span>
        <span>{t("usageRow", { value: percent(usage) })}</span>
        <span>{t("trueShootingRow", { value: percent(ts) })}</span>
      </div>
    );
  };

  return (
    <ScatterChart
      series={series}
      annotations={annotations}
      xAxis={{ title: t("usageRate"), format: percent, min: 12, max: 36 }}
      yAxis={{ title: t("trueShooting"), format: percent, min: 50, max: 68 }}
      renderTooltip={tooltip}
      legend={false}
      height={360}
      ariaLabel={t("playersAria")}
    />
  );
}

```

## Example: Click to select

onPointClick gives the series and the index of the clicked dot: the selected employee gets a bigger dot and a label, and their details appear below. onPlotClick, called on the empty plot, clears the selection.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-chart/demos/selection.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const departments = ["engineering", "sales", "support"] as const;

interface Employee {
  id: string;
  /** Years in the company */
  tenure: number;
  /** Last review, 1-5 */
  score: number;
  /** Yearly salary, USD */
  salary: number;
}

// 30 employees per department: tenure against the last performance review
const staff: Employee[][] = departments.map((_, d) => {
  const random = mulberry32(300 + d);
  return Array.from({ length: 30 }, (_, i) => {
    const tenure = Math.round(random() ** 1.4 * 14 * 10) / 10;
    const score = Math.min(
      5,
      Math.max(1, 2.6 + tenure * 0.08 + (random() - 0.4) * 2),
    );
    return {
      id: `E-${1000 + d * 100 + i}`,
      tenure,
      score: Math.round(score * 10) / 10,
      salary: Math.round((52 + d * 6 + tenure * 3.2 + random() * 18) * 1000),
    };
  });
});
const all = staff.flat();
const averageScore = all.reduce((sum, e) => sum + e.score, 0) / all.length;

interface Selection {
  department: number;
  index: number;
}

export default function SelectionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<Selection | null>(null);

  // the selected dot is bigger and labelled (showLabels draws the points
  // that have a label)
  const series = useMemo(
    (): ChartSeries[] =>
      departments.map((key, d) => ({
        name: t(`departments.${key}`),
        showLabels: true,
        opacity: 0.75,
        data: (staff[d] ?? []).map((e, i) =>
          selected?.department === d && selected.index === i
            ? { x: e.tenure, y: e.score, size: 16, label: e.id }
            : { x: e.tenure, y: e.score },
        ),
      })),
    [t, selected],
  );
  const years = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "year",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const decimal = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
    [locale],
  );
  const usd = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  const employee = selected
    ? staff[selected.department]?.[selected.index]
    : undefined;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <ScatterChart
        series={series}
        xAxis={{ title: t("tenure"), format: (value) => years.format(value) }}
        yAxis={{ title: t("reviewScore"), min: 1, max: 5 }}
        annotations={[
          {
            type: "line",
            axis: "y",
            value: averageScore,
            dash: [4, 4],
            label: t("companyAverage"),
          },
        ]}
        onPointClick={(event) => {
          const item = event.items[0];
          if (item)
            setSelected({ department: item.seriesIndex, index: item.index });
        }}
        // a click on the empty plot clears the selection
        onPlotClick={() => setSelected(null)}
        height={320}
        ariaLabel={t("staffAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {employee && selected
          ? t("employeeStatus", {
              id: employee.id,
              department: t(`departments.${departments[selected.department]}`),
              tenure: years.format(employee.tenure),
              score: decimal.format(employee.score),
              salary: usd.format(employee.salary),
            })
          : t("employeeHint")}
      </output>
    </div>
  );
}

```

## Example: Correlation and trend

A least-squares trend line (a line series computed in the demo) over the campaigns, with a text annotation giving R² and the slope.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-chart/demos/trend.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScatterChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Weekly ad spend against revenue (thousand USD) for 60 campaigns
const random = mulberry32(42);
const campaigns = Array.from({ length: 60 }, () => {
  const spend = 2 + random() * 28;
  return [spend, 15 + spend * 3.1 + (random() - 0.5) * 30] as const;
});

// Least-squares fit y = a + b·x and the coefficient of determination
const n = campaigns.length;
const meanX = campaigns.reduce((sum, [x]) => sum + x, 0) / n;
const meanY = campaigns.reduce((sum, [, y]) => sum + y, 0) / n;
const sxy = campaigns.reduce((s, [x, y]) => s + (x - meanX) * (y - meanY), 0);
const sxx = campaigns.reduce((s, [x]) => s + (x - meanX) ** 2, 0);
const syy = campaigns.reduce((s, [, y]) => s + (y - meanY) ** 2, 0);
const slope = sxy / sxx;
const intercept = meanY - slope * meanX;
const r2 = (sxy * sxy) / (sxx * syy);
const top = Math.max(...campaigns.map(([, y]) => y));

export default function TrendDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("campaigns"), data: campaigns, opacity: 0.75 },
      {
        name: t("trend"),
        type: "line",
        lineWidth: 2,
        color: "var(--danger-color)",
        data: [
          [0, intercept],
          [32, intercept + slope * 32],
        ],
      },
    ],
    [t],
  );
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const decimal = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });

  return (
    <ScatterChart
      series={series}
      xAxis={{ title: t("adSpend"), min: 0, max: 32, format: usd }}
      yAxis={{ title: t("revenue"), format: usd }}
      annotations={[
        {
          type: "text",
          x: 1,
          y: top,
          anchor: "left",
          text: t("fit", {
            r2: decimal.format(r2),
            slope: decimal.format(slope),
          }),
        },
      ]}
      height={320}
      ariaLabel={t("trendAria")}
    />
  );
}

```

## Example: Zoom controls

Buttons zoom to regions through the ref: setView sets the visible range (it does not call onZoom, so the demo reads the view back with getView) and resetZoom shows everything again. onZoom reports the wheel and drag zooms; a rect annotation shades the growing range.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/scatter-chart/demos/zoom-controls.tsx

```tsx
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  ScatterChart,
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

// 900 readings of greenhouse sensors: temperature (°C) and relative humidity
// (%), in three regimes: cool humid nights, mild days, hot dry afternoons
const random = mulberry32(64);
const gaussian = () =>
  Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
const readings = Array.from({ length: 900 }, (_, i) => {
  const [temp, humidity] =
    i % 9 === 0 ? [33, 38] : i % 3 === 0 ? [15, 84] : [23, 63];
  const t = temp + gaussian() * 2.2;
  const h = humidity - (t - temp) * 2 + gaussian() * 5;
  return [
    Math.round(t * 10) / 10,
    Math.round(Math.min(100, Math.max(5, h)) * 10) / 10,
  ] as const;
});

// the growing range of the crop
const COMFORT = { x0: 18, x1: 28, y0: 50, y1: 75 };

const PRESETS = {
  night: { x: [8, 22], y: [65, 100] },
  comfort: { x: [16, 30], y: [45, 80] },
  heat: { x: [26, 42], y: [15, 60] },
} satisfies Record<string, ChartView>;
type Preset = keyof typeof PRESETS;

export default function ZoomControlsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-chart.data",
  });
  const locale = i18n.language;
  const chart = useRef<ChartHandle>(null);
  const [view, setView] = useState<ChartView | null>(null);

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("readings"), data: readings, pointSize: 5, opacity: 0.55 },
    ],
    [t],
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
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  // setView does not call onZoom: read the view back from the handle
  const zoomTo = (preset: Preset) => {
    chart.current?.setView(PRESETS[preset]);
    setView(chart.current?.getView() ?? PRESETS[preset]);
  };
  const inView = view
    ? readings.filter(
        ([x, y]) =>
          x >= view.x[0] && x <= view.x[1] && y >= view.y[0] && y <= view.y[1],
      ).length
    : readings.length;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {(Object.keys(PRESETS) as Preset[]).map((preset) => (
          <Button
            key={preset}
            size="small"
            variant="outline"
            onClick={() => zoomTo(preset)}
          >
            {t(`zoomPresets.${preset}`)}
          </Button>
        ))}
        <Button
          size="small"
          variant="ghost"
          onClick={() => chart.current?.resetZoom()}
        >
          {t("showAll")}
        </Button>
      </div>
      <ScatterChart
        ref={chart}
        series={series}
        xAxis={{
          title: t("temperature"),
          format: (value) => celsius.format(value),
        }}
        yAxis={{
          title: t("humidity"),
          format: (value) => percent.format(value / 100),
        }}
        annotations={[
          {
            type: "rect",
            ...COMFORT,
            color: "var(--success-color)",
            opacity: 0.1,
            label: t("growingRange"),
          },
        ]}
        onZoom={setView}
        height={320}
        ariaLabel={t("greenhouseAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {view
          ? t("greenhouseView", {
              t0: celsius.format(view.x[0]),
              t1: celsius.format(view.x[1]),
              h0: percent.format(view.y[0] / 100),
              h1: percent.format(view.y[1] / 100),
              points: new Intl.NumberFormat(locale).format(inView),
            })
          : t("greenhouseHint")}
      </output>
    </div>
  );
}

```
