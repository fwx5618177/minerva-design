# Charts

GPU-accelerated charts (WebGPU, WebGL2 or WebGL, with a Canvas2D fallback) that stay at 60 fps with millions of points: trends, comparisons, statistics, parts of a whole, hierarchies and flows, networks, dependencies and trees, finance and trading, and 3D. Chart mixes line, area, bar, scatter, candlestick and heatmap series; every other component is a preset for one chart type. Start with the galleries below: a live thumbnail of every chart type, each linking to its page.

Package: minerva-design@1.23.1

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

#### How it renders

The data layer is drawn with WebGPU, falling back to WebGL2, WebGL, then Canvas2D (renderer="auto"); the root element gets data-renderer once ready. A chart stacks four layers:

Canvas2D background: grid, axes and annotation areas

GPU data layer: lines, areas, bars and dots

Canvas2D overlay: tick labels, point labels, highlight

DOM: tooltip and legend (selectable, accessible text)

#### Large data

Pass large series as columns of typed arrays ({ x: Float64Array, y: Float64Array }): no per-point objects are created. When x is sorted, hit testing is a binary search and only the visible range is drawn, so a 1M-point line or scatter stays at 60 fps on WebGPU, WebGL2 and WebGL.

#### Interaction and keyboard

Ctrl / ⌘ + wheel or a trackpad pinch zooms (a plain wheel scrolls the page), drag pans when zoomed and double-click resets.

Focus the chart: ← / → move the highlighted point (announced to screen readers), + / - zoom, 0 resets and Esc clears.

#### Theming and the engine

Colors come from the Minerva CSS variables: --chart-series-1..8 when defined, else the theme colors (--primary-color, --success-color...). Theme switches are picked up automatically.

minerva-design/charts/core is the same engine without React: createChart(container, options) works in any framework.

#### Chart families

Every chart type is shown below as a live thumbnail, grouped in six galleries; each caption links to the page of the chart:

Basic 2D: line, area, range area, bar, horizontal bar, combination / dual axis, scatter, bubble charts and sparklines.

Statistics, KPIs and planning: histogram, box plot, waterfall, heatmap, calendar heatmap, gauge, bullet, radial bar and Gantt charts.

Parts of a whole, hierarchies and flows: pie and donut, radar, funnel, quadrant, treemap, sunburst and Sankey charts.

Relationships and hierarchies: network graphs (force, circular and arc layouts, GPU-drawn up to tens of thousands of nodes), dependency graphs (layered DAGs with the critical path), trees (tidy and radial trees, mind maps, org charts) and chord diagrams.

Finance and trading: candlesticks, the trading chart (volume profile, drawing tools, bar replay, synchronized charts and order entry) with 21 built-in technical indicators (MA / EMA / WMA, Bollinger, VWAP, volume, MACD, RSI, KDJ, ATR, Parabolic SAR, Ichimoku, SuperTrend, Keltner, Donchian, OBV, CCI, Stochastic RSI, DMI, Williams %R, MFI), the depth chart, order book, order book heatmap and time & sales.

3D: 3D scatter and 3D line (glowing, additively blended point clouds included), 3D surface and 3D bar charts.

The thumbnails are mounted only while they are near the viewport (IntersectionObserver): the page stays fast and never holds more GPU contexts than the browser allows. The order book widgets stream a simulated market and pause off screen.

The GPU charts pick their backend in four tiers, WebGPU → WebGL2 → WebGL → Canvas2D, so they render in every browser and survive a GPU loss. setDefaultChartRenderer() changes the default backend of every chart at once: the renderer selector pinned on the chart pages of these docs uses it. See the chart engine and performance pages.

Revenue

Target

Monthly revenue against target

p95 latency

Normal range

Deploy

SLO {{value}}

Minutes

p95 latency with the SLO and the normal range

{{month}}: {{value}} ({{series}})

Tap a bar or the line

Random walk

Renderer

Random walk of 50,000 points

Requested: {{requested}} · drawn with: {{active}}

Visits

Sign-ups

Web

Orders

Q{{n}}

Team {{name}}

Free

Pro

Team

Speed

Quality

Cost

Support

Scale

Vendor {{name}}

Visited

Signed up

Activated

Paid

Product

Design

Engineering

Go to market

Sales

Marketing

Release

Roadmap

Emails

Cleanup

Plan

Do first

Drop

Delegate

##### Line chart

Trends

Visits and sign-ups per month

##### Area chart

Smooth, stacked

Users per platform, stacked

##### Bar chart

Value labels, per-bar color

Orders per quarter

##### Scatter chart

Correlations, clusters

Two clusters of measurements

##### Candlestick chart

Open, high, low, close

Daily prices

##### Heatmap

Values on a grid

Load by weekday and hour

##### Sparkline

Word-sized trends

##### Pie chart

Shares

Browser share

##### Donut chart

Shares with a total

Users per plan

##### Radar chart

Profiles over several axes

Vendor comparison

##### Gauge

One value against a target

##### Funnel chart

Stages and conversion

Sign-up funnel

##### Treemap

Hierarchical parts of a whole

Budget per department

##### Quadrant chart

Priority matrix

Tasks by urgency and importance

##### Range area chart

Min–max bands, forecasts

Average daily low and high temperature per month

##### Horizontal bar chart

Rankings, long labels

Share of developers using each language

##### Combination chart

Bars and a line on two axes

Revenue and growth per quarter

##### Bubble chart

A third value as the size

Campaigns by cost, sign-ups and reach

##### Histogram

Distributions

Distribution of the response times

##### Box plot

Quartiles and outliers

Response times per service

##### Waterfall chart

Contributions to a total

Annual recurring revenue bridge

##### Calendar heatmap

Daily activity

Commits per day

##### Bullet chart

KPIs against targets

Quarterly KPIs against their targets

##### Radial bar chart

Progress rings

Progress of the quarterly objectives

##### Gantt chart

Schedules and progress

Release plan

##### Sunburst chart

Nested hierarchies

Headcount per department and team

##### Sankey diagram

Flows between stages

Visits from each source to sign-ups

##### Trading chart

Candles, volume profile, pan and zoom

Hourly BTC/USDT price with a moving average, volume and a volume profile

##### Technical indicators

21 indicators

Daily BTC/USDT price with SuperTrend and MACD

##### Depth chart

Cumulative bids and asks

Live market depth

##### Order book

Live price ladder

Live order book

##### Order book heatmap

Liquidity over time

Liquidity heatmap of the last 30 seconds

##### Time & sales

Trade tape

Latest trades

##### 3D scatter chart

Clusters in three dimensions

Three clusters of points in 3D

##### 3D line chart

Trajectories

Spiral trajectory in 3D

##### 3D surface chart

z = f(x, y), terrains

Ripple surface

##### 3D bar chart

Values on a category grid

Sales per region and quarter

##### Network graph

Calls between services

Network of microservices and the calls between them

##### Arc diagram

Topics raised together

Support topics linked by how often they appear in the same ticket

##### Dependency graph

Pipeline and critical path

Data pipeline steps and their dependencies, with the critical path

##### Org chart

Reporting lines

Organization chart from the CEO to the teams

##### Mind map

Ideas around a topic

Mind map of a summer trip

##### Chord diagram

Flows between groups

Customers moving between plans in a quarter

##### Glowing 3D points

Additive glow

Spiral galaxy of glowing stars

Load

Revenue

Revenue trend

Errors

Errors trend

Users

Uptime score

Urgency

Importance

New visitors

Returning visitors

Mobile

Desktop

Tablet

Page views

Visitors

Orders

Conversion rate

{{metric}}, last 30 days

New and returning visitors per day, stacked

Visitors by device

Most viewed pages

Email

Chat

Phone

Social media

Community

Palette

Theme

Colorblind-safe

Blues

Warm

Support requests per quarter by channel

Share of the support requests by channel

Temperature

Developers

Growth

Reach

Gateway

Search

Checkout

Images

Last year

New customers

Expansion

Churn

Pricing

This year

Revenue (k$)

Margin (%)

Satisfaction

Revenue

Active users

Retention

Research

Design

Build

Testing

Poor

Fair

Good

Max

Q3

Median

Q1

Min

Outliers

Requests

Response time

Amount

Today

Tasks

Progress

Engineering

Platform

Web

Mobile

Sales

EMEA

Americas

Operations

Support

Finance

Search

Social

Email

Website

Signed up

Left

{{value}} people

Price

Open

High

Low

Close

Cluster {{name}}

Trajectory

Ripple

Sales

North

South

East

West

{{value}} customers

Core

Arms

API gateway

Web app

Auth

Users

Orders

Payments

Search

Inventory

Database

Cache

Queue

Edge

Services

Data

Login

Billing

Export

Mobile

Speed

Alerts

Extract

Clean

Enrich

Join

Train

Report

Publish

CEO

CTO

CFO

COO

Platform

Product

Finance

Sales

Support

Summer trip

Transport

Stay

Food

Activities

Train

Rental car

Hotel

Camping

Market

Restaurants

Museum

Hiking

Beach

Free

Starter

Pro

Enterprise

## Chart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Chart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "deep",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also follows in-place mutations of nested data (`series[0].data.push()`);\nby default the chart updates when a prop is replaced (cheaper on large data)",
    "typeText": "boolean"
  },
  {
    "name": "legend",
    "type": "boolean | ChartLegendOptions",
    "required": false,
    "description": "Legend; shown by default when several series have a name",
    "typeText": "boolean | ChartLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | ChartTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it",
    "typeText": "boolean | ChartTooltipOptions"
  },
  {
    "name": "crosshair",
    "type": "boolean",
    "required": false,
    "description": "Vertical guide line following the pointer",
    "typeText": "boolean"
  },
  {
    "name": "interaction",
    "type": "boolean | ChartInteractionOptions",
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static (default `true`)",
    "typeText": "boolean | ChartInteractionOptions"
  },
  {
    "name": "labels",
    "type": "Partial<ChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<ChartLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D (default `auto`)",
    "typeText": "ChartRendererPreference"
  },
  {
    "name": "width",
    "type": "string | number",
    "required": false,
    "description": "Width of the chart; numbers are pixels (default `100%`)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels, strings any CSS length",
    "typeText": "string | number"
  },
  {
    "name": "series",
    "type": "readonly ChartSeries[]",
    "required": true,
    "description": "Data series (replace the array or a `data` array to update the chart)",
    "typeText": "readonly ChartSeries[]"
  },
  {
    "name": "xAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "X axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "yAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "Y axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "annotations",
    "type": "readonly ChartAnnotation[]",
    "required": false,
    "description": "Background areas and reference lines",
    "typeText": "readonly ChartAnnotation[]"
  },
  {
    "name": "padding",
    "type": "ChartPadding",
    "required": false,
    "description": "Space around the plot area, in pixels",
    "typeText": "ChartPadding"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip, axes, accessible names); the page language by default",
    "typeText": "string"
  },
  {
    "name": "orientation",
    "type": "ChartOrientation",
    "required": false,
    "description": "`horizontal` puts the x axis (categories) down the left side and the values along the bottom (default `vertical`)",
    "typeText": "ChartOrientation"
  },
  {
    "name": "stackMode",
    "type": "\"percent\" | \"normal\"",
    "required": false,
    "description": "`percent` scales every stack to 100% at each x (default `normal`)",
    "typeText": "\"percent\" | \"normal\""
  },
  {
    "name": "yAxis2",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "Right value axis of the series with `yAxis: \"right\"`; its range is aligned on the left ticks (vertical charts)",
    "typeText": "ChartAxisOptions"
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "type": "[view: ChartView]",
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
    "type": "[event: ChartHoverEvent | null]",
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
    "name": "plotClick",
    "type": "[event: ChartPlotClickEvent]",
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
  },
  {
    "name": "pointClick",
    "type": "[event: ChartHoverEvent]",
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
    "name": "rendererChange",
    "type": "[renderer: ChartRendererKind]",
    "typeText": "[renderer: ChartRendererKind]",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## ShapeChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ShapeChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "deep",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also follows in-place mutations of nested data (`series[0].data.push()`);\nby default the chart updates when a prop is replaced (cheaper on large data)",
    "typeText": "boolean"
  },
  {
    "name": "width",
    "type": "string | number",
    "required": false,
    "description": "Width of the chart; numbers are pixels (default `100%`)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels, strings any CSS length",
    "typeText": "string | number"
  },
  {
    "name": "options",
    "type": "ShapeChartOptions",
    "required": true,
    "description": "Engine options, `type` included (replace the object to update the chart: it animates from the previous values)",
    "typeText": "ShapeChartOptions"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[event: ShapeHoverEvent | null]",
    "typeText": "[event: ShapeHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "click",
    "type": "[event: ShapeHoverEvent]",
    "typeText": "[event: ShapeHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "toggle",
    "type": "[event: ShapeToggleEvent]",
    "typeText": "[event: ShapeToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: events

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/charts/vue/events.vue

```vue
<script setup lang="ts">
// The engine events are emits: hover (null when the pointer leaves),
// point-click, plot-click, zoom, renderer-change.
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { Chart, type ChartHoverEvent } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    latency: "Latency (ms)",
    hint: "Hover or click a point",
    clicked: "Clicked",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  zh: {
    latency: "延迟（毫秒）",
    hint: "悬停或点击一个数据点",
    clicked: "已点击",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  ja: {
    latency: "レイテンシ（ms）",
    hint: "ポイントにカーソルを合わせるかクリックします",
    clicked: "クリック",
    hours: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"],
  },
  fr: {
    latency: "Latence (ms)",
    hint: "Survolez ou cliquez sur un point",
    clicked: "Cliqué",
    hours: ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [
  { name: text.value.latency, data: [42, 38, 65, 120, 96, 54] },
]);
const readout = ref("");
const describe = (event: ChartHoverEvent) =>
  `${event.xLabel} · ${event.items[0]?.seriesName}: ${event.items[0]?.y}`;
const onHover = (event: ChartHoverEvent | null) => {
  readout.value = event ? describe(event) : "";
};
const onPointClick = (event: ChartHoverEvent) => {
  readout.value = `${text.value.clicked} — ${describe(event)}`;
};
</script>

<template>
  <div style="display: grid; gap: 8px">
    <Chart
      :series="series"
      :x-axis="{ type: 'category', categories: text.hours }"
      crosshair
      :height="260"
      @hover="onHover"
      @point-click="onPointClick"
    />
    <output aria-live="polite">{{ readout || text.hint }}</output>
  </div>
</template>

```

## Example: mixed-series

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/charts/vue/mixed-series.vue

```vue
<script setup lang="ts">
// <Chart> mixes series types (here bars and a line) on shared axes.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { Chart, type ChartSeries } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    revenue: "Revenue",
    target: "Target",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  zh: {
    revenue: "收入",
    target: "目标",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  ja: {
    revenue: "売上",
    target: "目標",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  fr: {
    revenue: "Chiffre d'affaires",
    target: "Objectif",
    months: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed<ChartSeries[]>(() => [
  { name: text.value.revenue, type: "bar", data: [42, 51, 48, 63, 72, 80] },
  {
    name: text.value.target,
    type: "line",
    curve: "smooth",
    data: [45, 50, 55, 60, 65, 70],
  },
]);
const formatK = (value: number) => `${value}k`;
</script>

<template>
  <Chart
    :series="series"
    :x-axis="{ type: 'category', categories: text.months }"
    :y-axis="{ format: formatK }"
    :height="300"
  />
</template>

```
