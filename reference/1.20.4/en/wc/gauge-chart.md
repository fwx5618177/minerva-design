# Gauge

A single value on an arc, against a range and optional colored thresholds: KPIs, usage, scores. Changing value animates the arc (and the needle) from its current position.

Package: minerva-design@1.20.4

Renderer: wc

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
  "specifier": "minerva-design/web-components/gauge-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "number",
    "attribute": "value",
    "required": false
  },
  {
    "name": "min",
    "typeText": "number",
    "attribute": "min",
    "required": false
  },
  {
    "name": "max",
    "typeText": "number",
    "attribute": "max",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "attribute": "label",
    "required": false
  },
  {
    "name": "needle",
    "typeText": "boolean",
    "attribute": "needle",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "bands",
    "typeText": "readonly GaugeBand[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<GaugeChartOptions, \"type\">> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered (or keyboard-focused) mark changed; detail: { index, name, value, share }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-click",
    "typeText": "CustomEvent",
    "description": "A mark was clicked, tapped or activated with Enter; detail: { index, name, value, share }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A legend item was clicked (or `toggle()` called); detail: { index, hidden, hiddenIndexes }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Colored bands

Three bands split the track; the value arc takes the color of the band it ends in.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/wc/bands.html

```html
<minerva-gauge-chart id="cpu" value="72"></minerva-gauge-chart>

```

### apps/docs/src/docs/pages/gauge-chart/wc/bands.ts

```tsx
// Colored bands split the track; the value arc takes the color of its band.
import type { MinervaGaugeChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: "CPU load",
  zh: "CPU 负载",
  ja: "CPU 負荷",
  fr: "Charge CPU",
};

export function setup(root: HTMLElement) {
  const gauge = root.querySelector<MinervaGaugeChart>("#cpu")!;
  gauge.label =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  gauge.bands = [
    { to: 60, color: "var(--success-color, #16a34a)" },
    { to: 85, color: "var(--warning-color, #f59e0b)" },
    { to: 100, color: "var(--danger-color, #dc2626)" },
  ];
  gauge.options = { format: (value) => `${value}%` };
}

```

## Example: Needle and custom scale

A needle over a 0–200 scale, with a wider sweep and a thinner arc.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/wc/needle.html

```html
<minerva-gauge-chart
  id="speed"
  value="128"
  max="200"
  needle
  height="260"
></minerva-gauge-chart>

```

### apps/docs/src/docs/pages/gauge-chart/wc/needle.ts

```tsx
// `needle` adds a pointer to the arc; `min` / `max` set the scale and the
// options a wider sweep and thinner arc.
import type { MinervaGaugeChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: "Speed (km/h)",
  zh: "速度（公里/小时）",
  ja: "速度（km/h）",
  fr: "Vitesse (km/h)",
};

export function setup(root: HTMLElement) {
  const gauge = root.querySelector<MinervaGaugeChart>("#speed")!;
  gauge.label =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  gauge.options = { sweep: 270, thickness: 0.1 };
}

```
