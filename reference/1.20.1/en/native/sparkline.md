# Sparkline

A word-sized chart without axes or legend that shows the shape of a trend next to a number: in KPI cards, table cells or lists. Hover it to read a value.

Package: minerva-design@1.20.1

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Orders

Weekly orders, {{variant}}

Revenue

Active users

Sign-ups

p95 latency

{{metric}}, last 30 days

Service

API gateway

Authentication

Search

Payments

Notifications

Requests / min

p95 latency, 30 days

{{service}} p95 latency over 30 days

Today

Change

Service latency

Symbol

Acme Corporation

Nova Biotech

Orbit Aerospace

Kite Robotics

Luma Energy

{{symbol}} price today

Price

Watchlist

Visits over the last 14 days:

Visits

Visits over the last 14 days

Errors spiked after the deployment of day 7, then went back to normal:

Errors

Errors per day over the last 14 days

Afternoon temperature these two weeks:

Temperature

Afternoon temperature over the last 14 days

CPU

CPU usage of {{server}}

Alert

Healthy

Daily active users

Latest: {{date}}

{{date}} · {{change}} since September 1

Daily active users from September 1 to October 31

{{value}} steps

{{value}} of the goal

Goal of {{goal}} steps reached on {{reached}} of {{days}} days

Steps

Steps per day over four weeks, with the daily goal

Reykjavík

Montreal

Tokyo

Cairo

Singapore

Sydney

High {{max}} ({{maxMonth}}) · low {{min}} ({{minMonth}})

Average daily high of each month in {{city}}

Period

7 days

30 days

90 days

second half against the first

against the previous period

Daily revenue over the last {{period}}

## Sparkline

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Sparkline"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "height",
    "source": "packages/native/src/components/Charts/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": 48,
    "required": false,
    "description": "Height of the sparkline"
  },
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
  }
]
```

## API

```json
{
  "native:SparklineProps": {
    "source": "native/src/components/Charts/types.ts",
    "description": "Props of Sparkline",
    "kind": "interface",
    "extends": [
      "Pick<ChartCommonProps, | \"width\" | \"tooltip\" | \"palette\" | \"ariaLabel\" | \"locale\" | \"labels\" | \"onHover\" | \"renderTooltip\" | \"style\" | \"testID\" | \"ref\">",
      "SparklineConfig"
    ],
    "props": [
      {
        "name": "height",
        "type": "DimensionValue",
        "required": false,
        "default": "48",
        "description": "Height of the sparkline"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic

The same values as a smooth line, an area and bars; reference draws a dashed line at a value such as the average or a target.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/native/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  Sparkline,
  useTheme,
  type SparklineProps,
} from "minerva-design/native";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 30 daily values drifting from `from` to `to`, with some day-to-day wobble */
const trend = (seed: number, from: number, to: number, noise: number) => {
  const random = mulberry32(seed);
  const values: number[] = [];
  let wobble = 0;
  for (let i = 0; i < 30; i++) {
    wobble = wobble * 0.6 + (random() - 0.5) * noise;
    values.push(Math.round((from + ((to - from) * i) / 29) * (1 + wobble)));
  }
  return values;
};

// KPI rows of a dashboard: the value of today and the trend of 30 days
export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const { colors } = useTheme();
  const locale = i18n.language;
  const rows = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    const compact = new Intl.NumberFormat(locale, { notation: "compact" });
    const ms = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
    });
    const kpis: {
      label: string;
      data: number[];
      format: Intl.NumberFormat;
      spark: Partial<SparklineProps>;
    }[] = [
      {
        label: t("activeUsers"),
        data: trend(2, 9_800, 12_600, 0.1),
        format: compact,
        spark: { type: "area" },
      },
      {
        label: t("signups"),
        data: trend(3, 180, 240, 0.4),
        format: number,
        spark: { type: "bar" },
      },
      {
        label: t("p95"),
        data: trend(4, 240, 205, 0.15),
        format: ms,
        spark: { color: "var(--success-color)" },
      },
    ];
    return kpis;
  }, [t, locale]);
  return (
    <View style={{ width: "100%", gap: 16 }}>
      {rows.map(({ label, data, format, spark }) => (
        <View
          key={label}
          style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
        >
          <View style={{ width: 120 }}>
            <Text style={{ color: colors["text-secondary-color"] }}>
              {label}
            </Text>
            <Text
              style={{
                color: colors["text-color"],
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              {format.format(data[data.length - 1] ?? 0)}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Sparkline
              data={data}
              name={label}
              locale={locale}
              format={(value) => format.format(value)}
              height={44}
              ariaLabel={t("last30Aria", { metric: label })}
              {...spark}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

```
