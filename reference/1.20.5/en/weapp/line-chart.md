# Line chart

Lines or filled areas over numbers, dates or categories. Handles millions of points on the GPU.

Package: minerva-design@1.20.5

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

This week

Last week

Visitors per day, this week and last week

Storage used

Day

Storage used over 60 days

Lisbon

Oslo

Curve

Linear

Smooth

Step

Average monthly temperatures in Lisbon and Oslo

Compute

Storage

Network

Databases

Stack mode

Stacked

Monthly cloud spend by service, stacked

Page views

Sessions

Daily page views and sessions, first half of 2026

Sensor

One million sensor readings

{{points}} points · drawn with {{renderer}} · Ctrl / ⌘ + wheel to zoom, drag to pan, double-click to reset

Visitors

Product launch

Outage

Daily visitors over 90 days with a product launch and an outage

Indoor

Outdoor

Hourly indoor and outdoor temperatures with missing readings

The sensors were offline for a few hours: the line stops instead of guessing.

Median

95th percentile

Critical

Target {{value}}

API latency over six hours, median and 95th percentile

Close

Period

1M

3M

6M

1Y

All

Daily closing price over two years

Steps

Steps per day

{{day}}: {{steps}} steps

Tap or scrub the line

CPU

Memory

{{hour}}h

CPU and memory usage over the day

Pinch to zoom, double tap to reset; tap the legend to hide a series.

Freezer temperature

Alarm above {{value}}

Pause

Resume

Alarm: door open?

Normal

Last reading {{value}} at {{time}}

Above the limit in the last minute: {{readings}}

Freezer temperature over the last minute, updated every second

Wild type

Mutant

With antibiotic

Exponential phase

Logarithmic scale

Time since inoculation

CFU / mL

Growth curves of three bacterial cultures over 24 hours

Straight segments mean a constant growth rate: the wild type doubles about every {{minutes}}.

On a linear scale the small cultures look flat: switch back to the logarithmic scale to compare them.

Portfolio value

Click a point to start a measurement, then a second one.

From {{date}} ({{value}}): click a second point.

{{from}} → {{to}}: {{change}} ({{percent}}) over {{days}}

Clear

Daily value of a portfolio in 2026; click two points to measure the change

Equities

Bonds

Gold

Real estate

Base 100

Performance of four asset classes rebased to 100, 2021 to 2026

{{value}} µg/m³

Delhi

Beijing

Paris

Mexico City

Tokyo

São Paulo

Daily mean of fine particles (PM2.5) in November; the dashed line is the WHO guideline of {{value}}.

{{days}}/{{total}} days above

Daily PM2.5 in {{city}} over 30 days

## LineChart

Support: beta

Chart whose untyped series are lines, or areas with `area`. Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/line-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": 320
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "area",
    "typeText": "boolean",
    "required": false,
    "default": false
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
