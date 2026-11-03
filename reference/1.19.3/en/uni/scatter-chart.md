# Scatter chart

Dots positioned by two values, with per-point size, color and label. Zooms on both axes.

Package: minerva-design@1.19.3

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Partial<ChartLabels> | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
