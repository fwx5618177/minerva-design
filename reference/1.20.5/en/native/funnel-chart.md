# Funnel chart

Stages of a process that lose volume along the way (sign-ups, sales pipeline, checkout), with the conversion rate from each stage to the next. Hover or use the arrow keys to highlight a stage; click a legend item to hide it.

Package: minerva-design@1.20.5

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

Pricing page

Started sign-up

Verified email

Created project

Invited teammate

Upgraded to paid

{{users}} users

{{share}} of the visitors

{{users}} dropped since “{{stage}}”

Sign-up funnel

Alerts

Dashboards

Integrations

Reports

Public API

Sort order

Descending

Ascending

Data order

{{users}} weekly users

Weekly active users per feature

Visits

Product page

Added to cart

Checkout

Payment

Order placed

Stage

Visitors

Drop-off

{{share}} of the first stage

Checkout funnel of an online shop

Drop-off between the stages

Applied

Screened

Technical interview

On-site interview

Offer

Hired

{{candidates}} candidates

Typical time in this stage: {{days}}

Hiring pipeline of an engineering role

{{stage}}: {{candidates}} candidates ({{share}} of the applicants)

{{rate}} of the applicants are hired, after {{days}} on average

Desktop

Mobile

{{rate}} conversion

Checkout funnel on {{device}}

Impressions

Clicks

Leads

Qualified leads

Customers

All channels

Search ads

Social media

Email

Partners

Channel

{{share}} of the previous stage

Cost per result: {{cost}}

Marketing funnel of this month: {{channel}}

Spend: {{spend}} · Customers: {{customers}} · Acquisition cost: {{cac}} per customer

Visits

Added to cart

Checkout

Paid orders

Monthly checkout funnel computed from the conversion rates

{{from}} → {{to}}

Lower the conversion of {{step}}

Raise the conversion of {{step}}

Reset to today's rates

{{orders}} orders ({{ordersDelta}}) · {{revenue}} revenue ({{revenueDelta}}) per month

Visitors

Viewed the deal

Added to cart

Checkout

Orders

Flash sale funnel, updated live

Pause

Resume

Restart

{{time}} · {{orders}} orders · {{rate}} of the visitors

The sale is over: {{orders}} orders.

Lead

Qualified

Demo

Proposal

Negotiation

{{deals}} deals · {{amount}}

Win probability: {{share}}

Open deals by pipeline stage, by amount

{{stage}}: {{deals}} open deals

Weighted forecast: {{amount}}

Click a stage to list its deals.

## FunnelChart

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "FunnelChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly ShapeDatum[]",
    "typeRef": "type:f31ad238ea16881a8684",
    "required": true,
    "description": "Stages: a name, a value and an optional color"
  },
  {
    "name": "sort",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "enum",
    "values": [
      "ascending",
      "descending",
      "none"
    ],
    "typeText": "\"none\" | \"ascending\" | \"descending\" | undefined",
    "typeRef": "type:36d9ac8380d45cabf9fa",
    "required": false,
    "description": "Order of the stages"
  },
  {
    "name": "gap",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 4,
    "required": false,
    "description": "Vertical gap between the stages, in pixels"
  },
  {
    "name": "conversion",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the conversion rate from the previous stage"
  },
  {
    "name": "shape",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "enum",
    "values": [
      "bar",
      "trapezoid"
    ],
    "typeText": "\"trapezoid\" | \"bar\" | undefined",
    "typeRef": "type:2675a8a0582ff11e80f5",
    "default": "trapezoid",
    "required": false,
    "description": "Shape of the stages: trapezoids that narrow to the next stage, or centered bars"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "legend",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "typeRef": "type:b3cd5c49d86fb91effb3",
    "required": false,
    "description": "Legend; tapping an item hides / shows its slice, stage, series, node, bar, row or level"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "typeRef": "type:9441d8fe0edba7239796",
    "default": true,
    "required": false,
    "description": "Tooltip shown while a mark is pressed; `false` disables it"
  },
  {
    "name": "format",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:541b024ed1104992e34e",
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
    "description": "Formats the values of the labels and the tooltip"
  },
  {
    "name": "percentFormat",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((share: number) => string) | undefined",
    "typeRef": "type:d92c3cd66b7afc0213bc",
    "parameters": [
      {
        "name": "share",
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
    "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1"
  },
  {
    "name": "hidden",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar levels, by index. Makes the visibility controlled: legend taps then only call `onToggle`, whose `hiddenIndexes` should be stored and passed back."
  },
  {
    "name": "animation",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Entry and update animations (skipped when the theme reduces motion)"
  },
  {
    "name": "padding",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the drawing, in pixels"
  },
  {
    "name": "ariaLabel",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "BCP 47 locale of the built-in texts (tooltip rows, accessible names, \"No data\") and of the numbers"
  },
  {
    "name": "texts",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "object",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "typeRef": "type:2ef787a978af6750b6c8",
    "required": false,
    "description": "Replaces built-in texts of the `locale`"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false,
    "description": "Height of the chart (the legend included)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "renderTooltip",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "node",
    "typeText": "((event: ShapeHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:9333c89b3161f5ff3652",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
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
    "source": "packages/native/src/components/ShapeChart/types.ts",
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
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:fa632874a08b24956e5f",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent | null",
        "typeRef": "type:5ce60fcc1021d329ffba"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the highlighted mark changes (press and drag over the chart)"
  },
  {
    "name": "onClick",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:8504b594a968c22eaac5",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a mark is tapped"
  },
  {
    "name": "onToggle",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:d096120cd0ab66afae24",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeToggleEvent",
        "typeRef": "type:4b4244045a32e66c0a25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a legend item is tapped (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
  }
]
```

## API

```json
{
  "native:FunnelChartProps": {
    "source": "native/src/components/ShapeChart/types.ts",
    "description": "Props of FunnelChart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "data",
        "type": "readonly ShapeDatum[]",
        "required": true,
        "description": "Stages: a name, a value and an optional color"
      },
      {
        "name": "sort",
        "type": "\"descending\" | \"ascending\" | \"none\"",
        "required": false,
        "default": "\"none\" (data order)",
        "description": "Order of the stages"
      },
      {
        "name": "gap",
        "type": "number",
        "required": false,
        "default": "4",
        "description": "Vertical gap between the stages, in pixels"
      },
      {
        "name": "conversion",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the conversion rate from the previous stage"
      },
      {
        "name": "shape",
        "type": "\"trapezoid\" | \"bar\"",
        "required": false,
        "default": "\"trapezoid\"",
        "description": "Shape of the stages: trapezoids that narrow to the next stage, or centered bars"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic

Trapezoids narrow to the next stage and show the conversion rate; renderTooltip adds the share of visitors and the drop-off in React.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/native/basic.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  FunnelChart,
  useTheme,
  type ShapeHoverEvent,
} from "minerva-design/native";

// Sign-up funnel of a mobile app over one week
const stages = [
  { key: "install", value: 12400 },
  { key: "open", value: 9100 },
  { key: "signup", value: 4300 },
  { key: "trial", value: 1900 },
  { key: "paid", value: 640 },
] as const;

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.funnel-chart.native.data",
  });
  const { colors } = useTheme();
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const locale = i18n.language;
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const data = useMemo(
    () => stages.map(({ key, value }) => ({ name: t(`stages.${key}`), value })),
    [t],
  );
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <FunnelChart
        data={data}
        height={300}
        format={(value) => number.format(value)}
        percentFormat={(share) => percent.format(share)}
        onClick={setSelected}
        ariaLabel={t("signupAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {selected
          ? t("selectedStage", {
              stage: selected.name,
              users: number.format(selected.value),
              share: percent.format(selected.percent),
            })
          : t("tapStage")}
      </Text>
    </View>
  );
}

```
