# Heatmap

A grid of cells colored by value, over categories or numbers on both axes: activity by weekday and hour, correlation matrices, maps of a measure. Hover a cell to lift it, highlight its row and column and mark its value on the color legend.

Package: minerva-design@1.20.4

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

Sessions

Sessions by weekday and hour of the day

Anomaly

Monthly temperature anomaly, 1995 to 2024

Signal

Wi-Fi signal strength over a 200 by 100 meter floor

{{cells}} cells · drawn with {{renderer}} · Ctrl / ⌘ + wheel to zoom, drag to pan, double-click to reset

Contributions

Contributions per day over one year

{{total}} contributions in the last year

Sessions

Page views

Sign-ups

Revenue

Churn

Support tickets

Correlation

Correlation matrix of six product metrics

Month {{n}}

Retained

Retention of monthly signup cohorts

Desktop

Mobile

Tablet

Organic search

Paid search

Social

Email

Referral

Direct

{{source}} on {{device}}: {{orders}} orders from {{sessions}} sessions, {{rate}}:

above the average of {{value}}

below the average of {{value}}

Click a cell to see its sessions and orders.

Conversion rate

Conversion rate by traffic source and device

Rack {{n}}

Sensor {{n}}

Pause

Resume

Hottest: {{rack}}, {{sensor}} at {{value}} · {{alarms}} sensors above {{limit}}

Inlet temperature

Live inlet temperatures of the sensors of ten server racks

Cat

Dog

Bird

Car

Truck

Actual {{actual}}, predicted {{predicted}}

{{value}} images ({{share}} of the class)

Recall: {{value}}

Precision: {{value}}

Misclassified

Accuracy: {{value}} of {{images}} test images

Share of the class

Predicted class

Actual class

Confusion matrix of an image classifier over five classes

North

South

East

West

Central

Q{{n}}

Metric

Revenue

Growth over 2025

Gross margin

{{region}} in {{quarter}}

Best: {{best}} ({{bestValue}}) · weakest: {{worst}} ({{worstValue}})

Sales metrics of 2026 by region and quarter

## HeatmapChart

Support: beta

Grid of cells colored by value from `data` cells (categories or numbers on both axes), colorScale / valueRange / radius; format() through configure(). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/heatmap-chart/index",
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
    "name": "data",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xCategories",
    "typeText": "array",
    "required": false
  },
  {
    "name": "yCategories",
    "typeText": "array",
    "required": false
  },
  {
    "name": "colorScale",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "valueRange",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "colorMidpoint",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "radius",
    "typeText": "unknown",
    "required": false,
    "default": null
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
