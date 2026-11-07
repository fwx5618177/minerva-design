# Waterfall chart

How a series of increases and decreases takes a value from a start to an end, with subtotals and totals: P&L bridges, cash flow, variances. Thin dashed connectors join every bar to the next one.

Package: minerva-design@1.23.0

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Revenue

Cost of sales

Gross profit

R&D

Marketing

G&A

Operating income

Interest

Tax

Net income

Amount

Income statement from revenue to net income

Opening

Closing

Net cash flow

Monthly net cash flows from the opening to the closing balance

Budget

Actual

Volume

Price

Product mix

Exchange rates

Raw materials

Savings

Variance

Drivers of the variance between the budgeted and the actual margin

Start of year

End of year

Hires

Transfers in

Resignations

Transfers out

Retirements

People

Headcount changes over the year

Opening ARR

New business

Expansion

Contraction

Churn

Closing ARR

ARR

Quarter

Q{{n}}

{{quarter}}: net new ARR {{net}} · net revenue retention {{nrr}}

ARR bridge of {{quarter}}

List price

Dealer discount

Promotions

Invoice price

Payment terms

Freight

Volume rebates

Pocket price

Price per unit

Click a bar to compare it with the list price

{{step}}: {{value}}, {{share}} of the list price

Price waterfall from the list price to the pocket price

2019 baseline

Business growth

Energy efficiency

Renewable power

Electric fleet

Refrigerants

Acquisition

2025

2030 target

{{value}} kt CO₂e

Emissions

Change: {{value}}

From {{from}} to {{to}}

{{value}} above the 2030 target

Emissions bridge from the 2019 baseline to 2025

Order entry

Credit check

Picking

Quality check

Waiting for carrier

Transit

Customs

Lead time

Duration

Work

Waiting

work takes {{work}} of the {{total}} ({{share}})

Lead time of an order by stage

Earlier

Now

Balance

Customer payment

Supplier invoice

Payroll

Card fees

Refund

Latest: {{time}} · {{kind}} {{amount}}

Pause

Resume

Cash position of the day, updated live

Committed

Added

Removed

Re-estimated

Carried over

Completed

Story points

Orientation

Vertical

Horizontal

Labels

Connectors

Sprint scope from committed to completed story points

## WaterfallChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "WaterfallChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "steps",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly WaterfallStep[]",
    "typeRef": "type:3873f9105900201e8357",
    "required": true,
    "description": "Changes, subtotals and totals, in order"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Writes the change (or the total) at the end of every bar"
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
    "description": "`horizontal` lays the steps out in rows"
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
    "name": "name",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name of the series (tooltip)"
  },
  {
    "name": "start",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Value the first change starts from"
  },
  {
    "name": "upColor",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Color of the increases"
  },
  {
    "name": "downColor",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Color of the decreases"
  },
  {
    "name": "totalColor",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Color of the totals and subtotals"
  },
  {
    "name": "format",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:056255422d4257181649",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the values (labels, tooltip)"
  },
  {
    "name": "connector",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "union",
    "typeText": "boolean | ChartConnectorOptions | undefined",
    "typeRef": "type:17c313f2365f0d54bbec",
    "required": false,
    "description": "Thin lines from the end of every bar to the next one; an object styles them"
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
  "WaterfallChartProps": {
    "source": "charts/src/react/types.ts",
    "description": "Props of WaterfallChart",
    "kind": "interface",
    "extends": [
      "Omit<ChartCommonProps, \"crosshair\" | \"labels\">",
      "Omit<WaterfallOptions, \"labels\">"
    ],
    "props": [
      {
        "name": "steps",
        "type": "readonly WaterfallStep[]",
        "required": true,
        "description": "Changes, subtotals and totals, in order"
      },
      {
        "name": "labels",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Writes the change (or the total) at the end of every bar"
      },
      {
        "name": "orientation",
        "type": "ChartOrientation",
        "required": false,
        "default": "\"vertical\"",
        "description": "`horizontal` lays the steps out in rows"
      }
    ]
  },
  "WaterfallStep": {
    "source": "charts/src/engine/presets.ts",
    "description": "A bar of a waterfall chart",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category name of the bar"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Change (positive or negative); ignored by totals"
      },
      {
        "name": "kind",
        "type": "\"change\" | \"subtotal\" | \"total\"",
        "required": false,
        "default": "\"change\"",
        "description": "`subtotal` and `total` bars show the running total, from zero"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color of this bar (any CSS color)"
      }
    ]
  },
  "WaterfallOptions": {
    "source": "charts/src/engine/presets.ts",
    "description": "Options of `waterfallSeries`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Name of the series (tooltip)"
      },
      {
        "name": "upColor",
        "type": "string",
        "required": false,
        "default": "the success color",
        "description": "Color of the increases"
      },
      {
        "name": "downColor",
        "type": "string",
        "required": false,
        "default": "the danger color",
        "description": "Color of the decreases"
      },
      {
        "name": "totalColor",
        "type": "string",
        "required": false,
        "default": "the primary color",
        "description": "Color of the totals and subtotals"
      },
      {
        "name": "start",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Value the first change starts from"
      },
      {
        "name": "labels",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Writes the change (or the total) at the end of every bar"
      },
      {
        "name": "format",
        "type": "(value: number) => string",
        "required": false,
        "description": "Formats the values (labels, tooltip)"
      },
      {
        "name": "connector",
        "type": "boolean | ChartConnectorOptions",
        "required": false,
        "default": "true (dashed, secondary text color)",
        "description": "Thin lines from the end of every bar to the next one; an object styles them"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "default": "the page language",
        "description": "Locale of the default name"
      }
    ]
  },
  "ChartConnectorOptions": {
    "source": "charts/src/engine/types.ts",
    "description": "Lines joining the end of every bar to the start of the next one",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "color",
        "type": "string",
        "required": false,
        "default": "the secondary text color",
        "description": "Line color (any CSS color)"
      },
      {
        "name": "dash",
        "type": "readonly number[]",
        "required": false,
        "default": "[3, 3]",
        "description": "Dash pattern in CSS pixels; `[]` draws solid lines"
      },
      {
        "name": "width",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Line width in CSS pixels"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: ARR bridge by quarter

Annual recurring revenue from the opening to the closing ARR of a quarter: new business, expansion, contraction and churn. A RadioGroup switches the quarter, start takes the previous closing ARR and yAxis.min zooms on the changes; the line below computes the net new ARR and the net revenue retention.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/demos/arr-bridge.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// Annual recurring revenue of a SaaS company (M$): every quarter opens at
// the closing ARR of the previous one
const OPENING = 12.4;
const QUARTERS = [
  { newBusiness: 1.8, expansion: 0.9, contraction: -0.3, churn: -0.6 },
  { newBusiness: 2.1, expansion: 1.1, contraction: -0.4, churn: -0.5 },
  { newBusiness: 1.6, expansion: 1.3, contraction: -0.2, churn: -0.9 },
  { newBusiness: 2.6, expansion: 1.5, contraction: -0.5, churn: -0.7 },
];
const MOVES = ["newBusiness", "expansion", "contraction", "churn"] as const;

// opening ARR of every quarter
const openings = QUARTERS.reduce<number[]>(
  (list, q, i) => [
    ...list,
    i === 0
      ? OPENING
      : list[i - 1] + MOVES.reduce((sum, key) => sum + QUARTERS[i - 1][key], 0),
  ],
  [],
);

export default function ArrBridgeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const [quarter, setQuarter] = useState(3);

  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  const moves = QUARTERS[quarter];
  const opening = openings[quarter];
  const steps = useMemo(
    (): WaterfallStep[] => [
      { label: t("arr.opening"), kind: "subtotal" },
      ...MOVES.map((key) => ({ label: t(`arr.${key}`), value: moves[key] })),
      { label: t("arr.closing"), kind: "total" },
    ],
    [t, moves],
  );

  const net = MOVES.reduce((sum, key) => sum + moves[key], 0);
  // what the customers of the opening ARR pay at the end of the quarter
  const retention =
    (opening + moves.expansion + moves.contraction + moves.churn) / opening;
  const quarterName = t("arr.quarter", { n: quarter + 1 });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("arr.quarterLabel")}
        direction="horizontal"
        value={quarter}
        onChange={(value) => setQuarter(Number(value))}
      >
        {QUARTERS.map((_, i) => (
          <Radio key={i} value={i} label={t("arr.quarter", { n: i + 1 })} />
        ))}
      </RadioGroup>
      <WaterfallChart
        steps={steps}
        start={opening}
        name={t("arr.name")}
        format={usd}
        yAxis={{ format: usd, min: Math.floor(opening * 0.8) }}
        height={320}
        ariaLabel={t("arr.aria", { quarter: quarterName })}
      />
      <output aria-live="polite" style={{ color: "var(--text-muted-color)" }}>
        {t("arr.summary", {
          quarter: quarterName,
          net: usd(net),
          nrr: percent.format(retention),
        })}
      </output>
    </div>
  );
}

```

## Example: Cash flow

start sets the opening balance shown by the first subtotal, the months add their net flows and the closing balance ends the chart; yAxis.min zooms on the changes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/demos/cash-flow.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// Net cash flow of every month (k€) from an opening balance of 250 k€
const flows = [38, -22, 54, -61, 12, 47, -15, 66, -40, 29, 18, -9];

export default function CashFlowDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
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

  const steps = useMemo((): WaterfallStep[] => {
    const month = new Intl.DateTimeFormat(locale, { month: "short" });
    return [
      // start: the first bar shows the opening balance from zero
      { label: t("opening"), kind: "subtotal" },
      ...flows.map((value, m) => ({
        label: month.format(new Date(2026, m, 1)),
        value,
      })),
      { label: t("closing"), kind: "total" },
    ];
  }, [t, locale]);

  return (
    <WaterfallChart
      steps={steps}
      start={250}
      labels={false}
      name={t("cashFlow")}
      format={euros}
      totalColor="var(--chart-series-5, #0ea5e9)"
      yAxis={{ format: euros, min: 200 }}
      height={320}
      ariaLabel={t("cashAria")}
    />
  );
}

```

## Example: Emissions bridge

Emissions from the 2019 baseline to 2025: upColor and downColor are swapped so that increases are red and reductions green, a line annotation marks the 2030 target, and renderTooltip shows each change, where it starts and ends, and the gap to the target.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/demos/emissions.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// Greenhouse gas emissions of a manufacturer (kt CO₂e), from the 2019
// baseline to 2025, against the 2030 reduction target
const BASELINE = 5.2;
const TARGET = 2.6;
const DRIVERS = [
  ["growth", 0.9],
  ["efficiency", -0.7],
  ["renewables", -1.1],
  ["fleet", -0.4],
  ["refrigerants", -0.2],
  ["acquisition", 0.3],
] as const;

export default function EmissionsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;

  const kt = useMemo(() => {
    const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    return (value: number) =>
      t("emissions.kt", { value: number.format(value) });
  }, [locale, t]);
  const signed = useMemo(() => {
    const number = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 1,
      signDisplay: "exceptZero",
    });
    return (value: number) =>
      t("emissions.kt", { value: number.format(value) });
  }, [locale, t]);

  const steps = useMemo(
    (): WaterfallStep[] => [
      { label: t("emissions.baseline"), kind: "subtotal" },
      ...DRIVERS.map(([key, value]) => ({
        label: t(`emissions.${key}`),
        value,
      })),
      { label: t("emissions.current"), kind: "total" },
    ],
    [t],
  );

  // more emissions are bad news: increases in red, reductions in green
  return (
    <WaterfallChart
      steps={steps}
      start={BASELINE}
      name={t("emissions.name")}
      format={kt}
      upColor="var(--danger-color, #dc2626)"
      downColor="var(--success-color, #16a34a)"
      totalColor="var(--text-secondary-color, #64748b)"
      yAxis={{ format: kt, min: 0 }}
      annotations={[
        {
          type: "line",
          axis: "y",
          value: TARGET,
          color: "var(--success-color, #16a34a)",
          dash: [6, 4],
          label: t("emissions.target"),
        },
      ]}
      renderTooltip={(event) => {
        const item = event.items[0];
        if (!item) return null;
        const step = steps[item.index];
        const change = item.y0 === undefined ? null : item.y - item.y0;
        return (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{step?.label ?? event.xLabel}</strong>
            {change === null ? (
              <span>{kt(item.y)}</span>
            ) : (
              <>
                <span>{t("emissions.change", { value: signed(change) })}</span>
                <span>
                  {t("emissions.range", {
                    from: kt(item.y0 ?? 0),
                    to: kt(item.y),
                  })}
                </span>
              </>
            )}
            <span style={{ color: "var(--text-muted-color)" }}>
              {t("emissions.gap", { value: kt(item.y - TARGET) })}
            </span>
          </div>
        );
      }}
      height={340}
      ariaLabel={t("emissions.aria")}
    />
  );
}

```

## Example: Headcount bridge

upColor, downColor and totalColor replace the default colors, here arrivals in blue and departures in amber.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/demos/headcount.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// Headcount of the engineering department over the year
const movements = [
  ["hires", 46],
  ["internalIn", 9],
  ["resignations", -21],
  ["internalOut", -7],
  ["retirements", -3],
] as const;

export default function HeadcountDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const integer = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { signDisplay: "auto" });
    return (value: number) => format.format(value);
  }, [locale]);

  const steps = useMemo(
    (): WaterfallStep[] => [
      { label: t("startOfYear"), kind: "subtotal" },
      ...movements.map(([key, value]) => ({
        label: t(`movements.${key}`),
        value,
      })),
      { label: t("endOfYear"), kind: "total" },
    ],
    [t],
  );

  // custom colors: arrivals in blue, departures in amber
  return (
    <WaterfallChart
      steps={steps}
      start={212}
      name={t("people")}
      format={integer}
      upColor="var(--chart-series-1, #4f46e5)"
      downColor="var(--warning-color, #f59e0b)"
      totalColor="var(--text-secondary-color, #64748b)"
      yAxis={{ min: 150 }}
      height={300}
      ariaLabel={t("headcountAria")}
    />
  );
}

```

## Example: Lead time breakdown

Every stage of an order adds its duration and a total bar gives the lead time. Each step sets its own color (work or waiting), format writes days with the unit style of Intl.NumberFormat and connector draws solid lines.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/demos/lead-time.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

const WORK = "var(--chart-series-1, #4f46e5)";
const WAIT = "var(--warning-color, #f59e0b)";

// Order-to-delivery lead time (days): each stage adds its duration; the
// stages where the order only waits get their own color
const STAGES = [
  ["orderEntry", 0.5, "work"],
  ["creditCheck", 1, "wait"],
  ["picking", 1.5, "work"],
  ["quality", 0.5, "work"],
  ["carrierWait", 2, "wait"],
  ["transit", 3.5, "work"],
  ["customs", 1, "wait"],
] as const;

const TOTAL = STAGES.reduce((sum, [, days]) => sum + days, 0);
const WORKING = STAGES.reduce(
  (sum, [, days, kind]) => (kind === "work" ? sum + days : sum),
  0,
);

export default function LeadTimeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;

  const days = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "day",
      unitDisplay: "short",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  });

  const steps = useMemo(
    (): WaterfallStep[] => [
      ...STAGES.map(([key, value, kind]) => ({
        label: t(`lead.${key}`),
        value,
        color: kind === "work" ? WORK : WAIT,
      })),
      { label: t("lead.total"), kind: "total" },
    ],
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <WaterfallChart
        steps={steps}
        name={t("lead.name")}
        format={days}
        totalColor="var(--text-secondary-color, #64748b)"
        connector={{ dash: [], color: "var(--border-color, #cbd5e1)" }}
        yAxis={{ format: days }}
        height={320}
        ariaLabel={t("lead.aria")}
      />
      <p style={{ margin: 0, color: "var(--text-muted-color)" }}>
        <span aria-hidden style={{ color: WORK }}>
          ■
        </span>{" "}
        {t("lead.work")}{" "}
        <span aria-hidden style={{ color: WAIT }}>
          ■
        </span>{" "}
        {t("lead.wait")} ·{" "}
        {t("lead.summary", {
          work: days(WORKING),
          total: days(TOTAL),
          share: percent.format(WORKING / TOTAL),
        })}
      </p>
    </div>
  );
}

```

## Example: Live cash position

The treasury balance during the day: a transaction arrives every two seconds (setInterval, cleared on pause and unmount), the oldest one leaves the window and is folded into start, so the first bar always shows the balance before the visible transactions.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/demos/live-balance.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

/** Small seeded random generator: the same "transactions" on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Kind = "customer" | "supplier" | "payroll" | "card" | "refund";
type Txn = { kind: Kind; amount: number; minute: number };

// amounts in k€: [kind, likelihood, min, max]
const KINDS: [Kind, number, number, number][] = [
  ["customer", 0.45, 6, 42],
  ["supplier", 0.3, -34, -5],
  ["card", 0.13, -1.6, -0.2],
  ["refund", 0.08, -4, -1],
  ["payroll", 0.04, -85, -60],
];

// transaction `i` only depends on `i`: pure, so the state updates are too
const transaction = (i: number, after: number): Txn => {
  const random = mulberry32(1000 + i);
  let roll = random();
  const [kind, , min, max] =
    KINDS.find(([, chance]) => (roll -= chance) < 0) ?? KINDS[0];
  const amount = Math.round((min + (max - min) * random()) * 10) / 10;
  return { kind, amount, minute: after + 2 + Math.floor(random() * 9) };
};

const WINDOW = 8;
const OPENING = 1240;

interface Ledger {
  count: number;
  // balance before the first transaction shown
  base: number;
  shown: Txn[];
}

const advance = (ledger: Ledger): Ledger => {
  const last = ledger.shown[ledger.shown.length - 1];
  const shown = [...ledger.shown, transaction(ledger.count, last?.minute ?? 0)];
  const dropped = shown.length > WINDOW ? shown.shift() : undefined;
  return {
    count: ledger.count + 1,
    base: ledger.base + (dropped?.amount ?? 0),
    shown,
  };
};

const initial = (): Ledger => {
  let ledger: Ledger = { count: 0, base: OPENING, shown: [] };
  for (let i = 0; i < WINDOW; i++) ledger = advance(ledger);
  return ledger;
};

// the simulated day starts at 09:00
const DAY_START = new Date(2026, 9, 30, 9, 0).getTime();

export default function LiveBalanceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const [ledger, setLedger] = useState(initial);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setLedger(advance), 2000);
    return () => window.clearInterval(timer);
  }, [running]);

  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const signed = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
      signDisplay: "exceptZero",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const clock = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }),
    [locale],
  );
  const time = (minute: number) => clock.format(DAY_START + minute * 60_000);

  const steps = useMemo(
    (): WaterfallStep[] => [
      { label: t("live.opening"), kind: "subtotal" },
      ...ledger.shown.map((txn) => ({
        label: clock.format(DAY_START + txn.minute * 60_000),
        value: txn.amount,
      })),
      { label: t("live.now"), kind: "total" },
    ],
    [t, ledger, clock],
  );

  // zoom on the changes: the lowest running total minus a margin
  const lowest = ledger.shown.reduce(
    (acc, txn) => {
      const running = acc.running + txn.amount;
      return { running, min: Math.min(acc.min, running) };
    },
    { running: ledger.base, min: ledger.base },
  ).min;
  const last = ledger.shown[ledger.shown.length - 1];

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <WaterfallChart
        steps={steps}
        start={ledger.base}
        name={t("live.name")}
        format={euros}
        labels={false}
        yAxis={{ format: euros, min: Math.floor((lowest - 120) / 50) * 50 }}
        height={320}
        ariaLabel={t("live.aria")}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <output aria-live="polite" style={{ color: "var(--text-muted-color)" }}>
          {last &&
            t("live.last", {
              time: time(last.minute),
              kind: t(`live.kinds.${last.kind}`),
              amount: signed(last.amount),
            })}
        </output>
        <Button
          variant="outline"
          size="small"
          onClick={() => setRunning((r) => !r)}
        >
          {running ? t("live.pause") : t("live.resume")}
        </Button>
      </div>
    </div>
  );
}

```

## Example: Options

Sprint scope from the committed to the completed story points: try orientation, labels and connector.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/demos/options.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Radio, RadioGroup, Switch } from "minerva-design";
import {
  WaterfallChart,
  type WaterfallChartProps,
  type WaterfallStep,
} from "minerva-design/charts";

type Orientation = NonNullable<WaterfallChartProps["orientation"]>;

// Story points of a sprint: from the commitment to what was delivered
const CHANGES = [
  ["added", 9],
  ["removed", -6],
  ["reestimated", 3],
  ["carriedOver", -11],
] as const;
const COMMITTED = 48;
const ORIENTATIONS: Orientation[] = ["vertical", "horizontal"];

export default function OptionsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const [labels, setLabels] = useState(true);
  const [connector, setConnector] = useState(true);
  const [orientation, setOrientation] = useState<Orientation>("vertical");

  const points = useMemo(() => {
    const format = new Intl.NumberFormat(locale);
    return (value: number) => format.format(value);
  }, [locale]);

  const steps = useMemo(
    (): WaterfallStep[] => [
      { label: t("scope.committed"), kind: "subtotal" },
      ...CHANGES.map(([key, value]) => ({ label: t(`scope.${key}`), value })),
      { label: t("scope.completed"), kind: "total" },
    ],
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={16} wrap align="center">
        <RadioGroup
          aria-label={t("scope.orientation")}
          direction="horizontal"
          value={orientation}
          onChange={(value) => setOrientation(value as Orientation)}
        >
          {ORIENTATIONS.map((value) => (
            <Radio key={value} value={value} label={t(`scope.${value}`)} />
          ))}
        </RadioGroup>
        <Switch
          checked={labels}
          onChange={setLabels}
          label={t("scope.labels")}
        />
        <Switch
          checked={connector}
          onChange={setConnector}
          label={t("scope.connector")}
        />
      </HStack>
      <WaterfallChart
        steps={steps}
        start={COMMITTED}
        name={t("scope.name")}
        format={points}
        labels={labels}
        connector={connector}
        orientation={orientation}
        height={320}
        ariaLabel={t("scope.aria")}
      />
    </div>
  );
}

```

## Example: Profit and loss bridge

From revenue to net income: each change starts where the previous bar ended, subtotal and total bars show the running total from zero; the labels show the changes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/demos/pnl.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// Income statement of the year (M$): from the revenue (482 M$, the start)
// to the net income
const lines = [
  ["revenue", "subtotal"],
  ["costOfSales", -191],
  ["grossProfit", "subtotal"],
  ["research", -74],
  ["marketing", -63],
  ["admin", -38],
  ["operatingIncome", "subtotal"],
  ["interest", 6],
  ["tax", -27],
  ["netIncome", "total"],
] as const;

export default function PnlDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
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

  // changes start where the previous bar ended; subtotals and totals
  // show the running total from zero
  const steps = useMemo(
    (): WaterfallStep[] =>
      lines.map(([key, value]) =>
        typeof value === "number"
          ? { label: t(`pnl.${key}`), value }
          : { label: t(`pnl.${key}`), kind: value },
      ),
    [t],
  );

  return (
    <WaterfallChart
      steps={steps}
      start={482}
      name={t("amount")}
      format={usd}
      yAxis={{ format: usd }}
      height={340}
      ariaLabel={t("pnlAria")}
    />
  );
}

```

## Example: Price waterfall

From the list price to the pocket price of one unit, with the invoice price as a subtotal. onPointClick receives the clicked bar (event.items[0].index): the line below gives its amount as a share of the list price.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/demos/price-bridge.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// Price waterfall of one unit (€): from the list price to the pocket price
// the company really keeps, through the on- and off-invoice leakages
const LIST_PRICE = 120;
const LINES = [
  ["listPrice", "subtotal"],
  ["dealerDiscount", -12],
  ["promotion", -6],
  ["invoicePrice", "subtotal"],
  ["paymentTerms", -2.4],
  ["freight", -3.6],
  ["rebates", -4.8],
  ["pocketPrice", "total"],
] as const;

// value shown by every bar: the change, or the running total of a subtotal
const VALUES = LINES.reduce<{ running: number; values: number[] }>(
  (acc, [, value]) =>
    typeof value === "number"
      ? {
          running: acc.running + value,
          values: [...acc.values, value],
        }
      : { running: acc.running, values: [...acc.values, acc.running] },
  { running: LIST_PRICE, values: [] },
).values;

export default function PriceBridgeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<number | null>(null);

  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 2,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  const steps = useMemo(
    (): WaterfallStep[] =>
      LINES.map(([key, value]) =>
        typeof value === "number"
          ? { label: t(`price.${key}`), value }
          : { label: t(`price.${key}`), kind: value },
      ),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <WaterfallChart
        steps={steps}
        start={LIST_PRICE}
        name={t("price.name")}
        format={euros}
        yAxis={{ format: euros, min: 60 }}
        onPointClick={(event) => {
          const index = event.items[0]?.index;
          if (index !== undefined && LINES[index]) setSelected(index);
        }}
        height={320}
        ariaLabel={t("price.aria")}
      />
      <output aria-live="polite" style={{ color: "var(--text-muted-color)" }}>
        {selected === null
          ? t("price.hint")
          : t("price.selected", {
              step: steps[selected].label,
              value: euros(VALUES[selected]),
              share: percent.format(Math.abs(VALUES[selected]) / LIST_PRICE),
            })}
      </output>
    </div>
  );
}

```

## Example: Budget variance

With orientation: "horizontal", the drivers explaining the gap between the budgeted and the actual margin are listed in rows.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/demos/variance.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { WaterfallChart, type WaterfallStep } from "minerva-design/charts";

// From the budgeted to the actual operating margin (M€): the drivers of
// the variance, one row each
const drivers = [
  ["volume", 4.2],
  ["price", 2.6],
  ["mix", -1.1],
  ["exchangeRates", -2.4],
  ["rawMaterials", -3.3],
  ["savings", 1.8],
] as const;

export default function VarianceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.waterfall-chart.data",
  });
  const locale = i18n.language;
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 1,
      notation: "compact",
    });
    return (value: number) => format.format(value * 1e6);
  }, [locale]);

  const steps = useMemo(
    (): WaterfallStep[] => [
      { label: t("budget"), kind: "subtotal" },
      ...drivers.map(([key, value]) => ({ label: t(`drivers.${key}`), value })),
      { label: t("actual"), kind: "total" },
    ],
    [t],
  );

  return (
    <WaterfallChart
      steps={steps}
      start={38}
      orientation="horizontal"
      name={t("variance")}
      format={euros}
      yAxis={{ format: euros, min: 30 }}
      height={340}
      ariaLabel={t("varianceAria")}
    />
  );
}

```
