# Gauge

A single value on an arc, against a range and optional colored thresholds: KPIs, usage, scores. Changing value animates the arc (and the needle) from its current position.

Package: minerva-design@1.23.0

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

CPU

Memory

Disk

{{metric}} usage

Net Promoter Score

Requests / s

Requests per second, updated live

Pause updates

Resume updates

Speed

Speedometer: {{speed}}

Brake

Accelerate

Storage

API calls

Seats

Build minutes

{{used}} of {{limit}}

{{quota}}: {{share}} of the quota used

Availability, 30 days

Objective: {{value}}

Availability over 30 days against the objective

Error budget left

{{used}} of downtime out of {{budget}} allowed

Error budget left this month

Temperature unit

°C

°F

target

Room: {{value}}

Thermostat target temperature

Lower the target temperature

Raise the target temperature

Heating to {{target}} (room: {{room}})

Cooling to {{target}} (room: {{room}})

Holding {{target}} (room: {{room}})

Applicant

credit score

Poor

Fair

Good

Very good

Exceptional

{{share}} of the way up the scale

Credit score of {{name}}

{{name}}: {{score}}. {{advice}}

Most lenders will decline the application.

Approval is possible, at a higher rate.

Eligible for most loans at standard rates.

Eligible for better than average rates.

Eligible for the best rates on offer.

charged

Range: {{range}}

Battery charge of the car

Plugged in

Reset

Fully charged

Unplugged

Fast charging

Slow charging above 80 %

80 % in {{minutes}}

{{value}} rpm

{{value}} MW

Dark panel

Rotor speed

Power output

Nacelle temperature

{{reading}} of the wind turbine: {{value}}

## GaugeChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "GaugeChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number",
    "typeRef": "type:7d1137535c313783dadd",
    "required": true,
    "description": "Value shown by the arc (clamped to `min` - `max` for the drawing)"
  },
  {
    "name": "min",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Value at the start of the arc"
  },
  {
    "name": "max",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 100,
    "required": false,
    "description": "Value at the end of the arc"
  },
  {
    "name": "label",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Caption under the value"
  },
  {
    "name": "sweep",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 240,
    "required": false,
    "description": "Total angle of the arc, degrees"
  },
  {
    "name": "thickness",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.16,
    "required": false,
    "description": "Thickness of the arc as a fraction of the radius"
  },
  {
    "name": "bands",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly GaugeBand[] | undefined",
    "typeRef": "type:d2cd036beaf1add471a3",
    "required": false,
    "description": "Colored ranges of the track; the value arc takes the color of its band"
  },
  {
    "name": "color",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Color of the value arc (when there are no bands)"
  },
  {
    "name": "needle",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Draws a needle in addition to the value arc"
  },
  {
    "name": "ticks",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Tick labels at the ends (and at the band bounds)"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/shapes.tsx",
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
    "required": false,
    "description": "Backend of the shapes: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software; text is always drawn with Canvas2D, above the shapes"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "typeRef": "type:b3cd5c49d86fb91effb3",
    "required": false,
    "description": "Legend; clicking an item hides / shows its slice, stage, series, node, bar, row or level"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "typeRef": "type:9441d8fe0edba7239796",
    "default": true,
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "format",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:f12d9d0b7c053d4d65a6",
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
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((share: number) => string) | undefined",
    "typeRef": "type:5bfc1184b082171dcbfd",
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
    "name": "locale",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the chart writes (tooltip rows, accessible names, number and percent formats, calendar dates); built-in texts in English, Chinese, Japanese and French (English otherwise)"
  },
  {
    "name": "texts",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "object",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "typeRef": "type:2ef787a978af6750b6c8",
    "required": false,
    "description": "Replaces built-in texts of the `locale` (tooltip rows, accessible names, \"No data\")"
  },
  {
    "name": "hidden",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar levels, by index. Makes the visibility controlled: legend clicks then only call `onToggle`, whose `hiddenIndexes` should be stored and passed back. Leave undefined to let the legend hide / show entries by itself."
  },
  {
    "name": "animation",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Entry and update animations (skipped when the user prefers reduced motion)"
  },
  {
    "name": "padding",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the drawing, in pixels"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "renderTooltip",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "node",
    "typeText": "((event: ShapeHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:599537a71f6aca3767b8",
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
  }
]
```

### events

```json
[
  {
    "name": "onToggle",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:c5e11f23fbce8c1aa9a2",
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
    "description": "Called when a legend item is clicked (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
  },
  {
    "name": "onHover",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:4d7c0df4667f26938fe6",
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
    "description": "Called when the hovered (or keyboard-focused) mark changes"
  },
  {
    "name": "onClick",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:e40dbbb538ff7cd7dda5",
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
    "description": "Called when a mark is clicked, tapped or activated with Enter"
  }
]
```

## API

```json
{
  "GaugeChartProps": {
    "source": "charts/src/react/shapes.tsx",
    "description": "Props of GaugeChart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Value shown by the arc (clamped to `min` - `max` for the drawing)"
      },
      {
        "name": "min",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Value at the start of the arc"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "default": "100",
        "description": "Value at the end of the arc"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Caption under the value"
      },
      {
        "name": "sweep",
        "type": "number",
        "required": false,
        "default": "240",
        "description": "Total angle of the arc, degrees"
      },
      {
        "name": "thickness",
        "type": "number",
        "required": false,
        "default": "0.16",
        "description": "Thickness of the arc as a fraction of the radius"
      },
      {
        "name": "bands",
        "type": "readonly GaugeBand[]",
        "required": false,
        "description": "Colored ranges of the track; the value arc takes the color of its band"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "default": "the first palette color",
        "description": "Color of the value arc (when there are no bands)"
      },
      {
        "name": "needle",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Draws a needle in addition to the value arc"
      },
      {
        "name": "ticks",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Tick labels at the ends (and at the band bounds)"
      }
    ]
  },
  "GaugeBand": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "A colored range of a gauge",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "to",
        "type": "number",
        "required": true,
        "description": "Upper bound of the band (the previous band's bound, or `min`, is the lower one)"
      },
      {
        "name": "color",
        "type": "string",
        "required": true
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Bands and needle

bands colors the track by range (red, amber, green) and the value arc takes the color of its band; needle points at the value, min can be negative.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/demos/bands.tsx

```tsx
import { useTranslation } from "react-i18next";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

// Net Promoter Score: -100 (everyone detracts) to +100 (everyone promotes)
const bands: GaugeBand[] = [
  { to: 0, color: "var(--danger-color)" },
  { to: 30, color: "var(--warning-color)" },
  { to: 100, color: "var(--success-color)" },
];

export default function BandsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  // "+42", "−12"...
  const signed = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 0,
    signDisplay: "exceptZero",
  });
  const format = (value: number) => signed.format(value);

  return (
    <GaugeChart
      value={42}
      min={-100}
      max={100}
      bands={bands}
      needle
      label={t("nps")}
      format={format}
      renderTooltip={(event) => (
        <span>
          {t("nps")} · {format(event.value)}
        </span>
      )}
      height={280}
      ariaLabel={t("nps")}
    />
  );
}

```

## Example: Basic

Three small gauges with their own color, label and format.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/demos/basic.tsx

```tsx
import { useTranslation } from "react-i18next";
import { GaugeChart } from "minerva-design/charts";

// Resource usage of a server, in percent
const metrics = [
  { key: "cpu", value: 68, color: "var(--primary-color)" },
  { key: "memory", value: 82, color: "var(--warning-color)" },
  { key: "disk", value: 41, color: "var(--success-color)" },
];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  // "68%", "68 %"...: the values are percents, Intl expects ratios
  const percent = new Intl.NumberFormat(i18n.language, { style: "percent" });
  const format = (value: number) => percent.format(value / 100);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {metrics.map((metric) => (
        <GaugeChart
          key={metric.key}
          value={metric.value}
          label={t(`metrics.${metric.key}`)}
          color={metric.color}
          format={format}
          renderTooltip={(event) => (
            <span>
              {t(`metrics.${metric.key}`)} · {format(event.value)}
            </span>
          )}
          height={200}
          ariaLabel={t("usageAria", { metric: t(`metrics.${metric.key}`) })}
        />
      ))}
    </div>
  );
}

```

## Example: Electric car charging

A half gauge (sweep={180}) fills every 400 ms while plugged in, more slowly above 80 %; the interval stops when unplugged, full or unmounted. Only the charging phase is announced; the range and the time to 80 % come from Intl.NumberFormat units.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/demos/battery.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack, Switch } from "minerva-design";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

// Electric car charging session: one tick is one simulated minute; the
// charger slows down above 80% to protect the battery
const START = 18;
const FAST = 0.8; // % per minute below 80%
const SLOW = 0.3; // % per minute above 80%
const RANGE = 420; // km on a full battery
const bands: GaugeBand[] = [
  { to: 20, color: "var(--danger-color)" },
  { to: 50, color: "var(--warning-color)" },
  { to: 100, color: "var(--success-color)" },
];

export default function BatteryDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const locale = i18n.language;
  const [charge, setCharge] = useState(START);
  const [plugged, setPlugged] = useState(true);
  const charging = plugged && charge < 100;

  useEffect(() => {
    if (!charging) return;
    const timer = window.setInterval(() => {
      setCharge((current) =>
        Math.min(100, current + (current < 80 ? FAST : SLOW)),
      );
    }, 400);
    return () => window.clearInterval(timer);
  }, [charging]);

  const formats = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 0,
    });
    const km = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "kilometer",
      maximumFractionDigits: 0,
    });
    const minutes = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "minute",
      unitDisplay: "long",
      maximumFractionDigits: 0,
    });
    return {
      percent: (value: number) => percent.format(value / 100),
      km: (value: number) => km.format(value),
      minutes: (value: number) => minutes.format(value),
    };
  }, [locale]);

  const level = Math.floor(charge);
  const phase =
    level >= 100
      ? "full"
      : !plugged
        ? "unplugged"
        : level < 80
          ? "charging"
          : "topping";

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <GaugeChart
        value={charge}
        bands={bands}
        sweep={180}
        thickness={0.22}
        label={t("battery.label")}
        format={formats.percent}
        renderTooltip={() => (
          <span>
            {t("battery.range", { range: formats.km((charge / 100) * RANGE) })}
          </span>
        )}
        height={240}
        ariaLabel={t("battery.aria")}
      />
      <HStack gap={12} wrap align="center" justify="center">
        <Switch
          checked={plugged}
          onChange={setPlugged}
          label={t("battery.plugged")}
        />
        <Button size="small" variant="ghost" onClick={() => setCharge(START)}>
          {t("battery.reset")}
        </Button>
      </HStack>
      <p style={{ margin: 0, textAlign: "center" }}>
        {/* only the phase is announced, not every simulated minute */}
        <output aria-live="polite">{t(`battery.phases.${phase}`)}</output>
        {" · "}
        {t("battery.range", { range: formats.km((level / 100) * RANGE) })}
        {phase === "charging" &&
          ` · ${t("battery.toEighty", {
            minutes: formats.minutes(Math.ceil((80 - charge) / FAST)),
          })}`}
      </p>
    </div>
  );
}

```

## Example: Credit score

A needle on five rating bands from 300 to 850, with min and max set to the scale of the score. A Select switches applicants and the needle sweeps to the new score; renderTooltip names the rating and event.percent gives the position on the scale.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/demos/credit-score.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Select, SelectItem, Tag } from "minerva-design";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

type Rating = "poor" | "fair" | "good" | "veryGood" | "exceptional";

// Credit scores range from 300 to 850; five rating bands
const MIN = 300;
const MAX = 850;
const RATINGS: {
  key: Rating;
  to: number;
  color: string;
  tag: "danger" | "warning" | "info" | "success" | "primary";
}[] = [
  { key: "poor", to: 580, color: "var(--danger-color)", tag: "danger" },
  { key: "fair", to: 670, color: "var(--warning-color)", tag: "warning" },
  { key: "good", to: 740, color: "#84cc16", tag: "info" },
  { key: "veryGood", to: 800, color: "var(--success-color)", tag: "success" },
  { key: "exceptional", to: MAX, color: "#0d9488", tag: "primary" },
];
const BANDS: GaugeBand[] = RATINGS.map(({ to, color }) => ({ to, color }));
const APPLICANTS: [name: string, score: number][] = [
  ["Nora Lind", 812],
  ["Theo Martin", 724],
  ["Ada Okoye", 651],
  ["Ravi Patel", 548],
];

const ratingOf = (score: number) =>
  RATINGS.find((rating) => score < rating.to) ?? RATINGS[RATINGS.length - 1];

export default function CreditScoreDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const [applicant, setApplicant] = useState(0);
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language, { useGrouping: false });
    return (value: number) => number.format(Math.round(value));
  }, [i18n.language]);

  const [name, score] = APPLICANTS[applicant];
  const rating = ratingOf(score);
  // event.percent: position of the score within the 300-850 range
  const percent = new Intl.NumberFormat(i18n.language, { style: "percent" });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        size="small"
        style={{ width: 200 }}
        aria-label={t("credit.applicant")}
        value={String(applicant)}
        onChange={(value) => setApplicant(Number(value))}
      >
        {APPLICANTS.map(([applicantName], i) => (
          <SelectItem key={applicantName} value={String(i)}>
            {applicantName}
          </SelectItem>
        ))}
      </Select>
      <GaugeChart
        value={score}
        min={MIN}
        max={MAX}
        bands={BANDS}
        needle
        thickness={0.2}
        label={t("credit.score")}
        format={format}
        renderTooltip={(event) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{t(`credit.ratings.${ratingOf(event.value).key}`)}</strong>
            <span>
              {t("credit.position", { share: percent.format(event.percent) })}
            </span>
          </div>
        )}
        height={260}
        ariaLabel={t("credit.aria", { name })}
      />
      <HStack gap={8} align="center" justify="center" wrap>
        <Tag color={rating.tag} variant="subtle">
          {t(`credit.ratings.${rating.key}`)}
        </Tag>
        <output aria-live="polite">
          {t("credit.result", {
            name,
            score: format(score),
            advice: t(`credit.advice.${rating.key}`),
          })}
        </output>
      </HStack>
    </div>
  );
}

```

## Example: Dark control panel

Three needle gauges on a panel whose CSS variables switch to a dark theme. The charts only watch <html> and <body>, so after restyling the container the demo calls refreshTheme() on each chart through its ref.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/demos/dark-panel.tsx

```tsx
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  GaugeChart,
  type GaugeBand,
  type ShapeChartHandle,
} from "minerva-design/charts";

// a dark control-room theme, read by the charts from these variables
const DARK = {
  "--background-color": "#0b1020",
  "--surface-color": "#0b1020",
  "--text-color": "#e2e8f0",
  "--text-secondary-color": "#8a94ad",
  "--border-color": "#1f2a44",
  background: "#0b1020",
  color: "#e2e8f0",
} as CSSProperties;
const PANEL: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
  gap: 16,
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--border-color)",
  width: "100%",
  boxSizing: "border-box",
};

// Live readings of a wind turbine
const GAUGES: {
  key: "rotor" | "power" | "nacelle";
  value: number;
  max: number;
  bands: GaugeBand[];
}[] = [
  {
    key: "rotor",
    value: 14.2,
    max: 20,
    bands: [
      { to: 16, color: "#22d3ee" },
      { to: 20, color: "#f472b6" },
    ],
  },
  {
    key: "power",
    value: 3.1,
    max: 4.2,
    bands: [{ to: 4.2, color: "#34d399" }],
  },
  {
    key: "nacelle",
    value: 58,
    max: 90,
    bands: [
      { to: 60, color: "#34d399" },
      { to: 75, color: "#facc15" },
      { to: 90, color: "#fb7185" },
    ],
  },
];

export default function DarkPanelDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const locale = i18n.language;
  const [dark, setDark] = useState(true);
  const charts = useRef<(ShapeChartHandle | null)[]>([]);

  // the charts watch <html> and <body> only: after restyling their
  // container, ask them to read the CSS variables again
  useEffect(() => {
    charts.current.forEach((chart) => chart?.getInstance()?.refreshTheme());
  }, [dark]);

  const formats = useMemo(() => {
    const decimal = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    const celsius = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
      maximumFractionDigits: 0,
    });
    return {
      rotor: (value: number) =>
        t("turbine.rpm", { value: decimal.format(value) }),
      power: (value: number) =>
        t("turbine.mw", { value: decimal.format(value) }),
      nacelle: (value: number) => celsius.format(value),
    };
  }, [locale, t]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch checked={dark} onChange={setDark} label={t("turbine.dark")} />
      <div style={dark ? { ...PANEL, ...DARK } : PANEL}>
        {GAUGES.map((gauge, i) => (
          <GaugeChart
            key={gauge.key}
            ref={(handle) => {
              charts.current[i] = handle;
            }}
            value={gauge.value}
            max={gauge.max}
            bands={gauge.bands}
            thickness={0.1}
            needle
            label={t(`turbine.${gauge.key}`)}
            format={formats[gauge.key]}
            renderTooltip={(event) => (
              <span>
                {t(`turbine.${gauge.key}`)} · {formats[gauge.key](event.value)}
              </span>
            )}
            height={200}
            ariaLabel={t("turbine.aria", {
              reading: t(`turbine.${gauge.key}`),
              value: formats[gauge.key](gauge.value),
            })}
          />
        ))}
      </div>
    </div>
  );
}

```

## Example: Live value

A timer updates value every 1.5 s and the gauge animates to it; sweep={180} draws a half circle and thickness widens the arc. The timer is cleared when paused or unmounted.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/demos/live.tsx

```tsx
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

/** Small seeded random generator: the same "traffic" on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MAX = 1200;
const bands: GaugeBand[] = [
  { to: 800, color: "var(--primary-color)" },
  { to: 1000, color: "var(--warning-color)" },
  { to: MAX, color: "var(--danger-color)" },
];

export default function LiveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const [value, setValue] = useState(640);
  const [running, setRunning] = useState(true);
  const random = useRef(mulberry32(42));

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      // random walk that drifts back toward ~650 requests / s
      setValue((current) => {
        const step = (random.current() - 0.5) * 360 + (650 - current) * 0.2;
        return Math.min(MAX, Math.max(0, current + step));
      });
    }, 1500);
    return () => window.clearInterval(timer);
  }, [running]);

  const number = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 0,
  });
  const rps = (requests: number) => number.format(requests);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <GaugeChart
        value={value}
        max={MAX}
        bands={bands}
        sweep={180}
        thickness={0.22}
        needle
        label={t("requestsPerSecond")}
        format={rps}
        renderTooltip={(event) => (
          <span>
            {t("requestsPerSecond")} · {rps(event.value)}
          </span>
        )}
        height={260}
        ariaLabel={t("liveAria")}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outline"
          size="small"
          onClick={() => setRunning((r) => !r)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
      </div>
    </div>
  );
}

```

## Example: Quota usage

One gauge per plan quota with bands at 75% and 90% of each limit, ticks={false} and a caption with the used and allowed amounts.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/demos/quota.tsx

```tsx
import { useTranslation } from "react-i18next";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

// Usage of the plan's quotas this month
const quotas = [
  { key: "storage", used: 412, limit: 500, unit: "gigabyte" },
  { key: "apiCalls", used: 1_840_000, limit: 5_000_000 },
  { key: "seats", used: 48, limit: 50 },
  { key: "minutes", used: 2_310, limit: 3_000, unit: "minute" },
];

// the arc turns orange at 75% and red at 90% of the quota
const bandsFor = (limit: number): GaugeBand[] => [
  { to: limit * 0.75, color: "var(--success-color)" },
  { to: limit * 0.9, color: "var(--warning-color)" },
  { to: limit, color: "var(--danger-color)" },
];

export default function QuotaDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const locale = i18n.language;
  const percent = new Intl.NumberFormat(locale, { style: "percent" });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {quotas.map((quota) => {
        // "412 GB", "1.8M", "2.3K min"...
        const amount = quota.unit
          ? new Intl.NumberFormat(locale, {
              style: "unit",
              unit: quota.unit,
              notation: "compact",
            })
          : new Intl.NumberFormat(locale, { notation: "compact" });
        const label = t(`quotas.${quota.key}`);
        return (
          <figure key={quota.key} style={{ margin: 0, textAlign: "center" }}>
            <GaugeChart
              value={quota.used}
              max={quota.limit}
              bands={bandsFor(quota.limit)}
              label={label}
              // the center shows the share of the quota
              format={(value) => percent.format(value / quota.limit)}
              ticks={false}
              renderTooltip={() => (
                <span>
                  {t("quotaUsed", {
                    used: amount.format(quota.used),
                    limit: amount.format(quota.limit),
                  })}
                </span>
              )}
              height={180}
              ariaLabel={t("quotaAria", {
                quota: label,
                share: percent.format(quota.used / quota.limit),
              })}
            />
            <figcaption
              style={{ fontSize: 12, color: "var(--text-secondary-color)" }}
            >
              {t("quotaUsed", {
                used: amount.format(quota.used),
                limit: amount.format(quota.limit),
              })}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

```

## Example: Availability and error budget

A zoomed gauge (min 99.5, max 100) shows the availability against its objective, a second one the error budget left; renderTooltip gives the details.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/demos/slo.tsx

```tsx
import { useTranslation } from "react-i18next";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

// 30-day availability of a service against its 99.9% objective
const OBJECTIVE = 99.9;
const AVAILABILITY = 99.94;
const MINUTES = 30 * 24 * 60;
// error budget: the downtime the objective allows over 30 days
const BUDGET = MINUTES * (1 - OBJECTIVE / 100);
const DOWNTIME = MINUTES * (1 - AVAILABILITY / 100);

// a zoomed scale from 99.5% to 100%: red below the objective
const bands: GaugeBand[] = [
  { to: OBJECTIVE, color: "var(--danger-color)" },
  { to: 99.95, color: "var(--warning-color)" },
  { to: 100, color: "var(--success-color)" },
];

export default function SloDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const locale = i18n.language;
  const availability = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 2,
  });
  const minutes = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "minute",
    maximumFractionDigits: 0,
  });
  const share = new Intl.NumberFormat(locale, { style: "percent" });
  const left = 1 - DOWNTIME / BUDGET;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      <GaugeChart
        value={AVAILABILITY}
        min={99.5}
        max={100}
        bands={bands}
        needle
        // the band bounds would crowd the zoomed scale
        ticks={false}
        label={t("availability")}
        format={(value) => availability.format(value / 100)}
        renderTooltip={() => (
          <span>
            {t("objective", { value: availability.format(OBJECTIVE / 100) })}
          </span>
        )}
        height={240}
        ariaLabel={t("availabilityAria")}
      />
      <GaugeChart
        value={left * 100}
        bands={[
          { to: 25, color: "var(--danger-color)" },
          { to: 50, color: "var(--warning-color)" },
          { to: 100, color: "var(--success-color)" },
        ]}
        label={t("budgetLeft")}
        format={(value) => share.format(value / 100)}
        renderTooltip={() => (
          <span>
            {t("budgetDetail", {
              used: minutes.format(DOWNTIME),
              budget: minutes.format(BUDGET),
            })}
          </span>
        )}
        height={240}
        ariaLabel={t("budgetAria")}
      />
    </div>
  );
}

```

## Example: Speedometer

A thin arc with a needle; hold the buttons (or Space / Enter) to accelerate or brake. animation={false} lets the needle follow the state directly, and the unit comes from Intl.NumberFormat.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/demos/speedometer.tsx

```tsx
import { useEffect, useState, type KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

const MAX = 240; // km/h
const bands: GaugeBand[] = [
  { to: 130, color: "var(--primary-color)" },
  { to: 180, color: "var(--warning-color)" },
  { to: MAX, color: "var(--danger-color)" },
];

export default function SpeedometerDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const [speed, setSpeed] = useState(0);
  const [pedal, setPedal] = useState<"accelerate" | "brake" | null>(null);

  // while a pedal is held, the speed changes every 50 ms
  useEffect(() => {
    if (!pedal) return;
    const timer = window.setInterval(() => {
      setSpeed((current) =>
        pedal === "accelerate"
          ? Math.min(MAX, current + Math.max(1, (MAX - current) / 40))
          : Math.max(0, current - 6),
      );
    }, 50);
    return () => window.clearInterval(timer);
  }, [pedal]);

  // "120 km/h" with the reader's conventions
  const kmh = new Intl.NumberFormat(i18n.language, {
    style: "unit",
    unit: "kilometer-per-hour",
    maximumFractionDigits: 0,
  });
  // press and hold, with the pointer or with Space / Enter
  const hold = (next: "accelerate" | "brake") => ({
    onPointerDown: () => setPedal(next),
    onPointerUp: () => setPedal(null),
    onPointerLeave: () => setPedal(null),
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key === " " || event.key === "Enter") setPedal(next);
    },
    onKeyUp: () => setPedal(null),
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <GaugeChart
        value={speed}
        max={MAX}
        bands={bands}
        thickness={0.1}
        needle
        label={t("speed")}
        format={(value) => kmh.format(value)}
        // the needle follows the state: no entry animation on every change
        animation={false}
        tooltip={false}
        height={300}
        ariaLabel={t("speedAria", { speed: kmh.format(speed) })}
      />
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <Button variant="outline" {...hold("brake")}>
          {t("brake")}
        </Button>
        <Button {...hold("accelerate")}>{t("accelerate")}</Button>
      </div>
    </div>
  );
}

```

## Example: Smart thermostat

The − and + buttons move the target by half a degree; the setting is stored in °C and converted for display, so switching to °F changes value, min, max and the bands together. renderTooltip shows the room temperature and the line below whether the system heats, cools or holds.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/demos/thermostat.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack, Radio, RadioGroup } from "minerva-design";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

type Unit = "celsius" | "fahrenheit";
const UNITS: Unit[] = ["celsius", "fahrenheit"];

// Smart thermostat: the settings are stored in °C and shown in either unit
const MIN = 10;
const MAX = 30;
const STEP = 0.5;
const ROOM = 19.5;
const BANDS_C = [
  { to: 18, color: "#3b82f6" },
  { to: 23, color: "var(--success-color)" },
  { to: MAX, color: "#f97316" },
];

const convert = (celsius: number, unit: Unit) =>
  unit === "celsius" ? celsius : (celsius * 9) / 5 + 32;

export default function ThermostatDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const [target, setTarget] = useState(21);
  const [unit, setUnit] = useState<Unit>("celsius");

  // "21 °C", "69.8 °F"... in the reader's conventions
  const format = useMemo(() => {
    const temperature = new Intl.NumberFormat(i18n.language, {
      style: "unit",
      unit,
      maximumFractionDigits: 1,
    });
    return (value: number) => temperature.format(value);
  }, [i18n.language, unit]);
  const bands = useMemo(
    (): GaugeBand[] =>
      BANDS_C.map((band) => ({ ...band, to: convert(band.to, unit) })),
    [unit],
  );

  const mode =
    target > ROOM + 0.25
      ? "heating"
      : target < ROOM - 0.25
        ? "cooling"
        : "holding";
  const change = (delta: number) =>
    setTarget((current) => Math.min(MAX, Math.max(MIN, current + delta)));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("thermostat.unit")}
        direction="horizontal"
        value={unit}
        onChange={(value) => setUnit(value as Unit)}
      >
        {UNITS.map((u) => (
          <Radio key={u} value={u} label={t(`thermostat.units.${u}`)} />
        ))}
      </RadioGroup>
      <GaugeChart
        value={convert(target, unit)}
        min={convert(MIN, unit)}
        max={convert(MAX, unit)}
        bands={bands}
        sweep={270}
        thickness={0.12}
        label={t("thermostat.target")}
        format={format}
        renderTooltip={() => (
          <span>
            {t("thermostat.room", { value: format(convert(ROOM, unit)) })}
          </span>
        )}
        height={260}
        ariaLabel={t("thermostat.aria")}
      />
      <HStack gap={8} justify="center" align="center">
        <Button
          variant="outline"
          shape="circle"
          aria-label={t("thermostat.lower")}
          disabled={target <= MIN}
          onClick={() => change(-STEP)}
        >
          −
        </Button>
        <output
          aria-live="polite"
          style={{ minWidth: 220, textAlign: "center" }}
        >
          {t(`thermostat.modes.${mode}`, {
            room: format(convert(ROOM, unit)),
            target: format(convert(target, unit)),
          })}
        </output>
        <Button
          variant="outline"
          shape="circle"
          aria-label={t("thermostat.raise")}
          disabled={target >= MAX}
          onClick={() => change(STEP)}
        >
          +
        </Button>
      </HStack>
    </div>
  );
}

```
