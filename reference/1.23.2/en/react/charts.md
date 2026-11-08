# Charts

GPU-accelerated charts (WebGPU, WebGL2 or WebGL, with a Canvas2D fallback) that stay at 60 fps with millions of points: trends, comparisons, statistics, parts of a whole, hierarchies and flows, networks, dependencies and trees, finance and trading, and 3D. Chart mixes line, area, bar, scatter, candlestick and heatmap series; every other component is a preset for one chart type. Start with the galleries below: a live thumbnail of every chart type, each linking to its page.

Package: minerva-design@1.23.2

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
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
    "name": "series",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly ChartSeries[]",
    "typeRef": "type:deda0bcb88251b63a5de",
    "required": true,
    "description": "Data series; each sets its own `type`"
  },
  {
    "name": "stackMode",
    "source": "packages/charts/src/react/types.ts",
    "kind": "enum",
    "values": [
      "normal",
      "percent"
    ],
    "typeText": "\"normal\" | \"percent\" | undefined",
    "typeRef": "type:2d2343824f816d71127f",
    "default": "normal",
    "required": false,
    "description": "`percent` scales every stack to 100% at each x"
  },
  {
    "name": "yAxis2",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Right value axis of the series with `yAxis: \"right\"`; its range is aligned on the left ticks (vertical charts)"
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
    "description": "`horizontal` puts the x axis (categories) down the left side and the values along the bottom"
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

## ShapeChart

Support: n/a

Generic shape chart configured by the engine options (any type); React has the named components (PieChart, RadarChart, SankeyChart…) and createShapeChart of minerva-design/charts/core.

## API

```json
{
  "ChartProps": {
    "source": "charts/src/react/types.ts",
    "description": "Props of Chart: any mix of line, area, bar, scatter, candlestick, heatmap and box plot series",
    "kind": "interface",
    "extends": [
      "ChartCommonProps"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly ChartSeries[]",
        "required": true,
        "description": "Data series; each sets its own `type`"
      },
      {
        "name": "stackMode",
        "type": "\"normal\" | \"percent\"",
        "required": false,
        "default": "\"normal\"",
        "description": "`percent` scales every stack to 100% at each x"
      },
      {
        "name": "yAxis2",
        "type": "ChartAxisOptions",
        "required": false,
        "description": "Right value axis of the series with `yAxis: \"right\"`; its range is aligned on the left ticks (vertical charts)"
      },
      {
        "name": "orientation",
        "type": "ChartOrientation",
        "required": false,
        "default": "\"vertical\"",
        "description": "`horizontal` puts the x axis (categories) down the left side and the values along the bottom"
      }
    ]
  },
  "ChartCommonProps": {
    "source": "charts/src/react/types.ts",
    "description": "Props shared by every chart component",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "height",
        "type": "number | string",
        "required": false,
        "default": "320",
        "description": "Height of the chart (the legend included); numbers are pixels"
      },
      {
        "name": "width",
        "type": "number | string",
        "required": false,
        "default": "\"100%\"",
        "description": "Width of the chart; numbers are pixels"
      },
      {
        "name": "xAxis",
        "type": "ChartAxisOptions",
        "required": false,
        "description": "X axis"
      },
      {
        "name": "yAxis",
        "type": "ChartAxisOptions",
        "required": false,
        "description": "Y axis"
      },
      {
        "name": "renderer",
        "type": "ChartRendererPreference",
        "required": false,
        "default": "\"auto\"",
        "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D"
      },
      {
        "name": "legend",
        "type": "boolean | ChartLegendOptions",
        "required": false,
        "description": "Legend; shown by default when several series have a name"
      },
      {
        "name": "tooltip",
        "type": "boolean | ChartTooltipOptions",
        "required": false,
        "description": "Tooltip; `false` disables it"
      },
      {
        "name": "crosshair",
        "type": "boolean",
        "required": false,
        "description": "Vertical guide line following the pointer"
      },
      {
        "name": "annotations",
        "type": "readonly ChartAnnotation[]",
        "required": false,
        "description": "Background areas and reference lines"
      },
      {
        "name": "interaction",
        "type": "boolean | ChartInteractionOptions",
        "required": false,
        "default": "true",
        "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static"
      },
      {
        "name": "padding",
        "type": "ChartPadding",
        "required": false,
        "description": "Space around the plot area, in pixels"
      },
      {
        "name": "palette",
        "type": "readonly string[]",
        "required": false,
        "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "required": false,
        "description": "Accessible name of the chart"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "default": "the page language (`<html lang>`), else the browser language",
        "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
      },
      {
        "name": "labels",
        "type": "Partial<ChartLabels>",
        "required": false,
        "description": "Overrides of the built-in texts of the `locale`"
      },
      {
        "name": "onHover",
        "type": "(event: ChartHoverEvent | null) => void",
        "required": false,
        "description": "Called when the hovered (or keyboard-focused) points change"
      },
      {
        "name": "onPointClick",
        "type": "(event: ChartHoverEvent) => void",
        "required": false,
        "description": "Called when a point (or bar) is clicked"
      },
      {
        "name": "onPlotClick",
        "type": "(event: ChartPlotClickEvent) => void",
        "required": false,
        "description": "Called when the plot area is clicked where there is no point"
      },
      {
        "name": "renderTooltip",
        "type": "(event: ChartHoverEvent) => ReactNode",
        "required": false,
        "description": "React content of the tooltip (replaces the default content)"
      },
      {
        "name": "onZoom",
        "type": "(view: ChartView) => void",
        "required": false,
        "description": "Called when the user zooms or pans"
      },
      {
        "name": "onRendererChange",
        "type": "(renderer: ChartRendererKind) => void",
        "required": false,
        "description": "Called with the backend once it is ready (and when it falls back after a GPU loss)"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name of the root element"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of the root element"
      },
      {
        "name": "ref",
        "type": "Ref<ChartHandle>",
        "required": false,
        "description": "Imperative handle"
      }
    ]
  },
  "ChartHandle": {
    "source": "charts/src/react/types.ts",
    "description": "Imperative handle of the chart components (`ref`)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "resetZoom",
        "type": "() => void",
        "required": true,
        "description": "Shows the whole data range"
      },
      {
        "name": "getView",
        "type": "() => ChartView | null",
        "required": true,
        "description": "Visible range"
      },
      {
        "name": "setView",
        "type": "(view: Partial<ChartView>) => void",
        "required": true,
        "description": "Sets the visible range"
      },
      {
        "name": "getRenderer",
        "type": "() => ChartRendererKind | null",
        "required": true,
        "description": "Backend in use, `null` until ready"
      },
      {
        "name": "getInstance",
        "type": "() => ChartInstance | null",
        "required": true,
        "description": "The underlying engine instance (minerva-design/charts/core)"
      }
    ]
  },
  "ChartSeries": {
    "source": "charts/src/engine/types.ts",
    "description": "A data series",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "Stable identifier (defaults to the index)"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Name shown in the legend and the tooltip"
      },
      {
        "name": "type",
        "type": "ChartSeriesType",
        "required": false,
        "default": "\"line\"",
        "description": "How the series is drawn"
      },
      {
        "name": "data",
        "type": "ChartSeriesData",
        "required": true,
        "description": "Data points"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Series color (any CSS color, `var(--x)` included); the palette when omitted"
      },
      {
        "name": "lineWidth",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "Line width in CSS pixels (line / area)"
      },
      {
        "name": "pointSize",
        "type": "number",
        "required": false,
        "default": "8",
        "description": "Dot diameter in CSS pixels (scatter)"
      },
      {
        "name": "opacity",
        "type": "number",
        "required": false,
        "description": "Fill opacity (area, scatter), 0-1"
      },
      {
        "name": "stack",
        "type": "string",
        "required": false,
        "description": "Series with the same stack id are stacked (bars, areas and lines; see `stackMode` for 100% stacks)"
      },
      {
        "name": "hidden",
        "type": "boolean",
        "required": false,
        "description": "Hides the series (it stays in the legend)"
      },
      {
        "name": "showLabels",
        "type": "boolean | \"inside\"",
        "required": false,
        "description": "Draws the `label` of each point next to it (scatter) or the value above each bar (bar); `\"inside\"` writes the label (or value) of each bar inside it, cut with an ellipsis to fit, in a color contrasting with the bar (skipped when the bar is too small)"
      },
      {
        "name": "labelCells",
        "type": "{ x?: number; y?: number }",
        "required": false,
        "description": "Scatter labels (`showLabels`): cuts the plot at these values and keeps the label of each point inside the cell of its point (the quadrants of a quadrant chart): on the side of the dot with more room in the cell, cut with an ellipsis when it still does not fit"
      },
      {
        "name": "curve",
        "type": "ChartCurve",
        "required": false,
        "default": "\"linear\"",
        "description": "Shape of the line between the points: straight, smooth (monotone, never overshoots the data) or steps (line / area)"
      },
      {
        "name": "upColor",
        "type": "string",
        "required": false,
        "description": "Candlestick: color of the rising candles (close >= open); `--success-color` by default"
      },
      {
        "name": "downColor",
        "type": "string",
        "required": false,
        "description": "Candlestick: color of the falling candles; `--danger-color` by default"
      },
      {
        "name": "colorScale",
        "type": "readonly string[] | ChartColorScheme",
        "required": false,
        "default": "\"sequential\"",
        "description": "Heatmap: colors from the lowest to the highest value (two or more, interpolated in OKLab) or a built-in theme-aware scheme"
      },
      {
        "name": "valueRange",
        "type": "readonly [number, number]",
        "required": false,
        "description": "Heatmap: values mapped to the ends of `colorScale`; the data range by default"
      },
      {
        "name": "colorMidpoint",
        "type": "number",
        "required": false,
        "default": "0 for `diverging` ramps spanning it, else the middle of the range",
        "description": "Heatmap: value at the middle of the color scale (diverging data such as correlations or changes); each half of the ramp covers one side"
      },
      {
        "name": "radius",
        "type": "number",
        "required": false,
        "description": "Bar / heatmap: corner radius in CSS pixels (bars: 3, heatmap cells: 2)"
      },
      {
        "name": "format",
        "type": "(value: number) => string",
        "required": false,
        "description": "Formats the values of this series in the tooltip (the y axis format by default)"
      },
      {
        "name": "yAxis",
        "type": "\"left\" | \"right\"",
        "required": false,
        "default": "\"left\"",
        "description": "Value axis of the series: `right` plots it against `yAxis2` (dual axis charts; vertical orientation only)"
      },
      {
        "name": "barWidth",
        "type": "number",
        "required": false,
        "default": "0.62 (one series), 0.78 (groups)",
        "description": "Bars / box plots: share of the space of a category taken by the bars, 0-1 (`1` makes them touch, e.g. histograms); the widest value of the visible series is used"
      },
      {
        "name": "valueName",
        "type": "string",
        "required": false,
        "description": "Scatter: name of the `value` of the points in the tooltip (bubble charts)"
      },
      {
        "name": "tooltip",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "`false` leaves the series out of hit tests and tooltips (decorations, overlays such as the progress of Gantt tasks)"
      },
      {
        "name": "stroke",
        "type": "number",
        "required": false,
        "default": "1.25 (up to 5000 dots, 0 beyond)",
        "description": "Scatter: width in CSS pixels of the ring drawn around every dot in its color; with `opacity: 0` the dots are hollow rings (selection rings)"
      },
      {
        "name": "outlierShape",
        "type": "\"hollow\" | \"filled\"",
        "required": false,
        "default": "\"hollow\"",
        "description": "Box plot: outliers drawn as rings of the series color or as filled dots"
      },
      {
        "name": "outlierSize",
        "type": "number",
        "required": false,
        "default": "7",
        "description": "Box plot: diameter of the outliers in CSS pixels"
      },
      {
        "name": "connector",
        "type": "boolean | ChartConnectorOptions",
        "required": false,
        "default": "false",
        "description": "Bars: thin lines from the end of every bar to the next bar (waterfall charts); `true` uses dashed lines of the secondary text color"
      }
    ]
  },
  "ChartPointDatum": {
    "source": "charts/src/engine/types.ts",
    "description": "One datum written as an object",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "x",
        "type": "ChartXValue",
        "required": false,
        "description": "X value; the datum index when omitted"
      },
      {
        "name": "y",
        "type": "number | string | null",
        "required": true,
        "description": "Y value; `null` leaves a gap. Candlesticks: the close. Heatmaps: the row (a number, or a category name of a `category` y axis)"
      },
      {
        "name": "y0",
        "type": "number | Date | null",
        "required": false,
        "description": "Start of a floating bar (waterfall steps, Gantt tasks) or lower edge of a range area (confidence bands, min-max ranges); dates are timestamps"
      },
      {
        "name": "size",
        "type": "number",
        "required": false,
        "description": "Diameter of the dot in CSS pixels (scatter)"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color of the dot or bar (scatter, bar); any CSS color"
      },
      {
        "name": "opacity",
        "type": "number",
        "required": false,
        "description": "Bar: opacity of the fill of this bar, 0-1; the series `opacity` by default (e.g. solid Gantt tasks among translucent ones)"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Text drawn next to the dot (scatter with `showLabels`) or at the end of the bar instead of its value (bar with `showLabels`; inside it with `showLabels: \"inside\"`), and shown in the tooltip"
      },
      {
        "name": "open",
        "type": "number",
        "required": false,
        "description": "Candlestick: opening value"
      },
      {
        "name": "high",
        "type": "number",
        "required": false,
        "description": "Candlestick: highest value; box plot: upper whisker (the maximum)"
      },
      {
        "name": "low",
        "type": "number",
        "required": false,
        "description": "Candlestick: lowest value; box plot: lower whisker (the minimum)"
      },
      {
        "name": "q1",
        "type": "number",
        "required": false,
        "description": "Box plot: first quartile (bottom of the box; `y` is the median)"
      },
      {
        "name": "q3",
        "type": "number",
        "required": false,
        "description": "Box plot: third quartile (top of the box)"
      },
      {
        "name": "outliers",
        "type": "readonly number[]",
        "required": false,
        "description": "Box plot: values beyond the whiskers, drawn as dots"
      },
      {
        "name": "value",
        "type": "number | null",
        "required": false,
        "description": "Heatmap: value of the cell, mapped to `colorScale`; scatter (bubbles): a value shown in the tooltip"
      },
      {
        "name": "details",
        "type": "readonly ChartTooltipDetail[]",
        "required": false,
        "description": "Extra rows of the default tooltip of this point, after its values"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "Identifier of the point, referenced by the `dependencies` of the chart (Gantt tasks sharing a row); unique across the series"
      }
    ]
  },
  "ChartColumnData": {
    "source": "charts/src/engine/types.ts",
    "description": "Column-oriented data: the fastest form for large data sets (typed arrays are used as is)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "x",
        "type": "ArrayLike<number> | readonly ChartXValue[]",
        "required": false,
        "description": "X values; the index when omitted"
      },
      {
        "name": "y",
        "type": "ArrayLike<number> | readonly (number | string | null)[]",
        "required": true,
        "description": "Y values (`NaN` / `null` leave a gap); candlesticks: the closes; heatmaps: the rows"
      },
      {
        "name": "y0",
        "type": "ArrayLike<number> | readonly (number | null)[]",
        "required": false,
        "description": "Starts of floating bars / lower edges of range areas (`NaN` / `null`: from zero)"
      },
      {
        "name": "size",
        "type": "ArrayLike<number>",
        "required": false,
        "description": "Per-point diameters in CSS pixels (scatter)"
      },
      {
        "name": "open",
        "type": "ArrayLike<number>",
        "required": false,
        "description": "Candlestick: opening values"
      },
      {
        "name": "high",
        "type": "ArrayLike<number>",
        "required": false,
        "description": "Candlestick: highest values; box plots: the maximums"
      },
      {
        "name": "low",
        "type": "ArrayLike<number>",
        "required": false,
        "description": "Candlestick: lowest values; box plots: the minimums"
      },
      {
        "name": "q1",
        "type": "ArrayLike<number>",
        "required": false,
        "description": "Box plots: first quartiles"
      },
      {
        "name": "q3",
        "type": "ArrayLike<number>",
        "required": false,
        "description": "Box plots: third quartiles"
      },
      {
        "name": "value",
        "type": "ArrayLike<number> | readonly (number | null)[]",
        "required": false,
        "description": "Heatmap: values of the cells; scatter: values shown in the tooltip"
      }
    ]
  },
  "ChartAxisOptions": {
    "source": "charts/src/engine/types.ts",
    "description": "Options of an axis",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "type",
        "type": "ChartAxisType",
        "required": false,
        "default": "\"linear\"",
        "description": "Scale of the axis: `linear` numbers, `log` base-10 logarithms (positive values; on `x` too), `time` timestamps / dates, `category` names (x axis, and y axis of heatmaps)"
      },
      {
        "name": "min",
        "type": "number",
        "required": false,
        "description": "Lower bound; computed from the data when omitted"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "description": "Upper bound; computed from the data when omitted"
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Axis title"
      },
      {
        "name": "categories",
        "type": "readonly string[]",
        "required": false,
        "description": "Category names (`category` axis); collected from the data when omitted"
      },
      {
        "name": "format",
        "type": "(value: number) => string",
        "required": false,
        "description": "Formats a tick / tooltip value"
      },
      {
        "name": "tickCount",
        "type": "number",
        "required": false,
        "default": "5 (y), computed from the width (x)",
        "description": "Approximate number of ticks"
      },
      {
        "name": "grid",
        "type": "boolean",
        "required": false,
        "default": "true for y, false for x",
        "description": "Draws grid lines at the ticks"
      },
      {
        "name": "visible",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the axis line, ticks and labels"
      },
      {
        "name": "zero",
        "type": "boolean",
        "required": false,
        "description": "Keeps zero inside the automatic range (always on for bars)"
      },
      {
        "name": "reverse",
        "type": "boolean",
        "required": false,
        "description": "Reverses the direction of the axis"
      },
      {
        "name": "nice",
        "type": "boolean",
        "required": false,
        "description": "Rounds the automatic range to tick values; on by default except for category axes. Log axes: whole decades on y, the closest 1, 2 or 5 × 10^k bounds around the data on x"
      },
      {
        "name": "timeZone",
        "type": "ChartTimeZone",
        "required": false,
        "default": "\"local\"",
        "description": "Calendar of a `time` axis: steps and labels of the ticks and tooltips in local time or in UTC (UTC data aligned on UTC midnights / months)"
      }
    ]
  },
  "ChartRectAnnotation": {
    "source": "charts/src/engine/types.ts",
    "description": "Area annotation: a rectangle in data coordinates (omitted bounds extend to the plot edges)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "type",
        "type": "\"rect\"",
        "required": true
      },
      {
        "name": "x0",
        "type": "number",
        "required": false
      },
      {
        "name": "x1",
        "type": "number",
        "required": false
      },
      {
        "name": "y0",
        "type": "number",
        "required": false
      },
      {
        "name": "y1",
        "type": "number",
        "required": false
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Fill color (any CSS color)"
      },
      {
        "name": "opacity",
        "type": "number",
        "required": false,
        "description": "Fill opacity, 0-1 (default 0.08)"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Text drawn inside the area"
      },
      {
        "name": "labelPosition",
        "type": "ChartLabelPosition",
        "required": false,
        "description": "Where the label goes (default `top-left`)"
      },
      {
        "name": "labelColor",
        "type": "string",
        "required": false,
        "description": "Label color (defaults to `color`)"
      },
      {
        "name": "badge",
        "type": "string",
        "required": false,
        "description": "Short code drawn in a pill before the label (e.g. \"Q1\")"
      },
      {
        "name": "detail",
        "type": "string",
        "required": false,
        "description": "Secondary text drawn after the label, in the muted text color (e.g. a count)"
      },
      {
        "name": "description",
        "type": "string",
        "required": false,
        "description": "Second line under the label, in the muted text color (cut with … when too long)"
      }
    ]
  },
  "ChartLineAnnotation": {
    "source": "charts/src/engine/types.ts",
    "description": "Reference line annotation at a value of the x or y axis (`y` lines are vertical in horizontal charts)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "type",
        "type": "\"line\"",
        "required": true
      },
      {
        "name": "axis",
        "type": "\"x\" | \"y\"",
        "required": true
      },
      {
        "name": "value",
        "type": "number",
        "required": true
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Line color (any CSS color)"
      },
      {
        "name": "width",
        "type": "number",
        "required": false,
        "description": "Line width in CSS pixels (default 1)"
      },
      {
        "name": "dash",
        "type": "readonly number[]",
        "required": false,
        "description": "Dash pattern, e.g. `[4, 4]`"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Text drawn at the end of the line"
      }
    ]
  },
  "ChartTextAnnotation": {
    "source": "charts/src/engine/types.ts",
    "description": "Text placed at a data position (omitted coordinates center it on the plot)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "type",
        "type": "\"text\"",
        "required": true
      },
      {
        "name": "x",
        "type": "number",
        "required": false
      },
      {
        "name": "y",
        "type": "number",
        "required": false
      },
      {
        "name": "text",
        "type": "string",
        "required": true
      },
      {
        "name": "anchor",
        "type": "\"center\" | \"top\" | \"bottom\" | \"left\" | \"right\"",
        "required": false,
        "default": "\"center\"",
        "description": "Side of the text that touches the position: `top` hangs the text below it, `left` starts it there, ...; the text always stays inside the plot"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Text color (defaults to the secondary text color)"
      },
      {
        "name": "weight",
        "type": "number",
        "required": false,
        "default": "500",
        "description": "Font weight"
      }
    ]
  },
  "ChartInteractionOptions": {
    "source": "charts/src/engine/types.ts",
    "description": "Zoom / pan / keyboard options",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "zoom",
        "type": "boolean | \"x\" | \"y\" | \"xy\"",
        "required": false,
        "default": "true",
        "description": "Axes that zoom and pan; `true` = x for line / area / bar charts, both for scatter charts"
      },
      {
        "name": "wheel",
        "type": "\"modifier\" | \"always\"",
        "required": false,
        "default": "\"modifier\"",
        "description": "Wheel zoom: only with Ctrl / ⌘ (and trackpad pinch) or always"
      },
      {
        "name": "pan",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Drag to pan (when zoomed)"
      },
      {
        "name": "keyboard",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Arrow keys move the highlight, +/- zoom, 0 resets, Esc clears"
      },
      {
        "name": "dragPoints",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Scatter points can be dragged: `drag` events follow the pointer and a `drop` event ends the gesture (the data is not changed by the chart)"
      },
      {
        "name": "dropTargets",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "While a point is dragged, the area annotation (`type: \"rect\"`) under the pointer is highlighted: where the point would land (the quadrants of a quadrant matrix)"
      },
      {
        "name": "dragLabel",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "The label of a dragged point follows it in a pill; `false` leaves it out (a host showing its own card next to the point)"
      },
      {
        "name": "hoverLabel",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "The label of a hovered dot is highlighted in a chip; `false` leaves it as drawn (a host showing its own card on the point)"
      }
    ]
  },
  "ChartTooltipOptions": {
    "source": "charts/src/engine/types.ts",
    "description": "Tooltip options",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "mode",
        "type": "\"nearest\" | \"axis\" | \"item\"",
        "required": false,
        "default": "\"axis\" (\"nearest\" when every series is a scatter, \"item\" for range bars on a time axis such as Gantt charts)",
        "description": "`nearest` shows the closest point, `axis` all the series at the closest x, `item` only the shape under the pointer (bar, box, cell or dot; nothing over empty space)"
      },
      {
        "name": "render",
        "type": "(event: ChartHoverEvent) => string | Node | null",
        "required": false,
        "description": "Renders the tooltip content (a string is set as text)"
      },
      {
        "name": "labels",
        "type": "ChartTooltipLabels",
        "required": false,
        "description": "Names of the rows of the default tooltip; alias of the matching `ChartOptions.labels` (which win)"
      }
    ]
  },
  "ChartLegendOptions": {
    "source": "charts/src/engine/types.ts",
    "description": "Legend options",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "position",
        "type": "\"top\" | \"bottom\"",
        "required": false,
        "default": "\"top\"",
        "description": "Legend position"
      },
      {
        "name": "toggle",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Clicking an item toggles its series"
      }
    ]
  },
  "ChartPadding": {
    "source": "charts/src/engine/types.ts",
    "description": "Inner space around the plot area, in CSS pixels",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "top",
        "type": "number",
        "required": false
      },
      {
        "name": "right",
        "type": "number",
        "required": false
      },
      {
        "name": "bottom",
        "type": "number",
        "required": false
      },
      {
        "name": "left",
        "type": "number",
        "required": false
      }
    ]
  },
  "ChartHoverEvent": {
    "source": "charts/src/engine/types.ts",
    "description": "Hover / click payload",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "items",
        "type": "ChartHoverItem[]",
        "required": true,
        "description": "Points under the pointer (several in `axis` mode)"
      },
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X value of the first item"
      },
      {
        "name": "xLabel",
        "type": "string",
        "required": true,
        "description": "Formatted x value"
      }
    ]
  },
  "ChartHoverItem": {
    "source": "charts/src/engine/types.ts",
    "description": "A point under the pointer",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "seriesIndex",
        "type": "number",
        "required": true
      },
      {
        "name": "seriesId",
        "type": "string",
        "required": true
      },
      {
        "name": "seriesName",
        "type": "string",
        "required": true
      },
      {
        "name": "index",
        "type": "number",
        "required": true,
        "description": "Index of the point in the series data"
      },
      {
        "name": "x",
        "type": "number",
        "required": true
      },
      {
        "name": "y",
        "type": "number",
        "required": true
      },
      {
        "name": "color",
        "type": "string",
        "required": true,
        "description": "Resolved color of the point"
      },
      {
        "name": "label",
        "type": "string",
        "required": false
      },
      {
        "name": "open",
        "type": "number",
        "required": false,
        "description": "Candlestick: open / high / low (`y` is the close)"
      },
      {
        "name": "high",
        "type": "number",
        "required": false
      },
      {
        "name": "low",
        "type": "number",
        "required": false
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Heatmap: value of the cell; scatter: the `value` of the point (bubbles)"
      },
      {
        "name": "y0",
        "type": "number",
        "required": false,
        "description": "Floating bars / range areas: the start (or lower edge); `y` is the end"
      },
      {
        "name": "q1",
        "type": "number",
        "required": false,
        "description": "Box plot: first quartile (`y` is the median, `low` / `high` the whiskers)"
      },
      {
        "name": "q3",
        "type": "number",
        "required": false,
        "description": "Box plot: third quartile"
      },
      {
        "name": "outliers",
        "type": "number",
        "required": false,
        "description": "Box plot: number of outliers"
      },
      {
        "name": "outlier",
        "type": "number",
        "required": false,
        "description": "Box plot: value of the hovered outlier (the pointer is on an outlier)"
      }
    ]
  },
  "ChartPlotClickEvent": {
    "source": "charts/src/engine/types.ts",
    "description": "A click (or tap) on the plot area outside the points",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Data coordinates of the click"
      },
      {
        "name": "y",
        "type": "number",
        "required": true
      }
    ]
  },
  "ChartView": {
    "source": "charts/src/engine/types.ts",
    "description": "Visible range of the axes, in values of the axes (not logarithms on log axes)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "x",
        "type": "[number, number]",
        "required": true,
        "description": "Range of the x axis (category axes: indexes)"
      },
      {
        "name": "y",
        "type": "[number, number]",
        "required": true,
        "description": "Range of the (left) y axis"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Standalone recipes

- [React trading chart with local data](/minerva-design/reference/1.23.2/recipes/trading-chart/README.md) — react; verified package 1.23.2

## Example: Annotations

A dashed reference line, a horizontal band (rect with only y0 / y1) and an x range, each with a label.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/charts/demos/annotations.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Chart,
  type ChartAnnotation,
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

// p95 latency (ms) per minute, with an incident during a deploy
const random = mulberry32(42);
const latency = Array.from({ length: 120 }, (_, minute) => {
  const incident = minute >= 70 && minute <= 82 ? 90 : 0;
  return [minute, 105 + random() * 40 + incident] as const;
});

export default function AnnotationsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const ms = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "millisecond",
        maximumFractionDigits: 0,
      }),
    [locale],
  );
  const series = useMemo(
    (): ChartSeries[] => [{ name: t("p95"), data: latency }],
    [t],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        y0: 80,
        y1: 150,
        color: "var(--success-color)",
        label: t("normalRange"),
      },
      {
        type: "rect",
        x0: 70,
        x1: 82,
        color: "var(--warning-color)",
        opacity: 0.12,
        label: t("deploy"),
        labelPosition: "top-right",
      },
      {
        type: "line",
        axis: "y",
        value: 200,
        color: "var(--danger-color)",
        dash: [4, 4],
        label: t("slo", { value: ms.format(200) }),
      },
    ],
    [t, ms],
  );

  return (
    <Chart
      series={series}
      annotations={annotations}
      xAxis={{ title: t("minutes") }}
      yAxis={{ min: 0, max: 260, format: (value) => ms.format(value) }}
      height={300}
      ariaLabel={t("latencyAria")}
    />
  );
}

```

## Example: Analytics dashboard

Several charts working together on 30 days of a web shop: KPI cards with sparklines, stacked areas of new and returning visitors, a donut of devices with the total in the hole and the top pages as labelled bars.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/charts/demos/dashboard.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader } from "minerva-design";
import {
  AreaChart,
  BarChart,
  DonutChart,
  Sparkline,
  type ChartSeries,
  type ShapeDatum,
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

const DAY = 24 * 60 * 60 * 1000;
const START = new Date(2026, 9, 1).getTime();

// 30 days of a web shop: visitors (new / returning), orders and revenue
const random = mulberry32(30);
const days = Array.from({ length: 30 }, (_, i) => {
  const weekend = [0, 6].includes(new Date(START + i * DAY).getDay());
  const base = (weekend ? 0.75 : 1) * (1 + i / 60);
  const fresh = Math.round(2400 * base * (0.9 + random() * 0.2));
  const returning = Math.round(1700 * base * (0.9 + random() * 0.2));
  const orders = Math.round((fresh + returning) * (0.028 + random() * 0.006));
  return {
    time: START + i * DAY,
    fresh,
    returning,
    orders,
    revenue: orders * 64,
  };
});
const sum = (key: "fresh" | "returning" | "orders" | "revenue") =>
  days.reduce((total, day) => total + day[key], 0);

const devices = [
  { key: "mobile", value: 58 },
  { key: "desktop", value: 35 },
  { key: "tablet", value: 7 },
];
const pages = [
  { path: "/", views: 41_200 },
  { path: "/sale", views: 26_900 },
  { path: "/shoes", views: 18_300 },
  { path: "/bags", views: 12_700 },
  { path: "/checkout", views: 9_800 },
];

export default function DashboardDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const formats = useMemo(
    () => ({
      number: new Intl.NumberFormat(locale),
      compact: new Intl.NumberFormat(locale, { notation: "compact" }),
      usd: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
      date: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    }),
    [locale],
  );
  const traffic = useMemo(
    (): ChartSeries[] => [
      {
        name: t("newVisitors"),
        data: days.map((d) => [d.time, d.fresh] as const),
      },
      {
        name: t("returningVisitors"),
        data: days.map((d) => [d.time, d.returning] as const),
      },
    ],
    [t],
  );
  const deviceData = useMemo(
    (): ShapeDatum[] =>
      devices.map(({ key, value }) => ({ name: t(`devices.${key}`), value })),
    [t],
  );
  const pageSeries = useMemo(
    (): ChartSeries[] => [
      {
        name: t("pageViews"),
        data: pages.map(({ path, views }) => [path, views] as const),
      },
    ],
    [t],
  );

  const visitors = sum("fresh") + sum("returning");
  const kpis = [
    {
      label: t("visitors"),
      value: formats.compact.format(visitors),
      data: days.map((d) => d.fresh + d.returning),
    },
    {
      label: t("ordersLabel"),
      value: formats.number.format(sum("orders")),
      data: days.map((d) => d.orders),
    },
    {
      label: t("revenueLabel"),
      value: formats.usd.format(sum("revenue")),
      data: days.map((d) => d.revenue),
    },
    {
      label: t("conversion"),
      value: formats.percent.format(sum("orders") / visitors),
      data: days.map((d) => d.orders / (d.fresh + d.returning)),
    },
  ];

  return (
    <div style={{ display: "grid", gap: 16, width: "100%" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 12,
        }}
      >
        {kpis.map((kpi) => (
          <Card key={kpi.label} padding="small">
            <CardHeader>
              <CardDescription>{kpi.label}</CardDescription>
              <strong style={{ fontSize: 22 }}>{kpi.value}</strong>
            </CardHeader>
            <CardContent>
              <Sparkline
                data={kpi.data}
                type="area"
                height={36}
                name={kpi.label}
                tooltip={false}
                ariaLabel={t("last30Aria", { metric: kpi.label })}
              />
            </CardContent>
          </Card>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        <AreaChart
          series={traffic}
          stacked
          xAxis={{
            type: "time",
            format: (value) => formats.date.format(value),
            tickCount: 5,
          }}
          yAxis={{ format: (value) => formats.compact.format(value) }}
          legend={{ position: "bottom" }}
          height={260}
          ariaLabel={t("trafficAria")}
        />
        <DonutChart
          data={deviceData}
          labels="none"
          centerValue={formats.compact.format(visitors)}
          centerLabel={t("visitors")}
          format={(value) => formats.percent.format(value / 100)}
          renderTooltip={(slice) => (
            <span>
              {slice.name} · {formats.percent.format(slice.percent)}
            </span>
          )}
          legend={{ position: "bottom" }}
          height={260}
          ariaLabel={t("devicesAria")}
        />
      </div>
      <BarChart
        series={pageSeries}
        labels
        yAxis={{ format: (value) => formats.compact.format(value) }}
        legend={false}
        height={220}
        ariaLabel={t("topPagesAria")}
      />
    </div>
  );
}

```

## Example: Gallery: 3D charts

Clusters in a slowly rotating 3D scatter, a spiral trajectory, a ripple surface, sales per region and quarter as 3D bars and a spiral galaxy of 24,000 glowing stars blended additively. Drag to rotate; they render only while visible.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-router

Documentation context imports: none

### apps/docs/src/docs/pages/charts/demos/gallery-3d.tsx

```tsx
import { useMemo, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import {
  Bar3DChart,
  Line3DChart,
  Scatter3DChart,
  Surface3DChart,
  type Bar3DSeries,
  type Line3DSeries,
  type Scatter3DSeries,
  type Surface3DData,
  type Surface3DSeries,
} from "minerva-design/charts";
import { GalleryCard, GalleryGrid } from "../gallery-card";

/** Small deterministic pseudo-random generator (same picture on every load) */
const random = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

// three clusters of 60 points
const clusters = (() => {
  const next = random(5);
  const centers = [
    [2, 2, 2],
    [6, 3, 5],
    [4, 7, 3],
  ];
  return centers.map(([cx, cy, cz]) =>
    Array.from(
      { length: 60 },
      () =>
        [
          cx + (next() - 0.5) * 2.5,
          cy + (next() - 0.5) * 2.5,
          cz + (next() - 0.5) * 2.5,
        ] as const,
    ),
  );
})();

// a rising spiral, colored by time
const spiral = (() => {
  const n = 600;
  const time = Float64Array.from(
    { length: n },
    (_, i) => (i / n) * 6 * Math.PI,
  );
  return {
    x: time.map((a) => Math.cos(a) * (1 + a / 10)),
    y: time.map((a) => Math.sin(a) * (1 + a / 10)),
    z: time.map((a) => a / 4),
    value: time,
  };
})();

// z = sin(r) / r sampled on a 48 × 48 grid
const ripple: Surface3DData = (() => {
  const size = 48;
  const axis = Float64Array.from(
    { length: size },
    (_, i) => -10 + (20 * i) / (size - 1),
  );
  const z = new Float32Array(size * size);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const d = Math.hypot(axis[c], axis[r]);
      z[r * size + c] = d === 0 ? 1 : Math.sin(d) / d;
    }
  }
  return { rows: size, cols: size, x: axis, y: axis, z };
})();

// sales (k$) per region and quarter: [region, quarter, sales]
const regions = ["north", "south", "east", "west"] as const;
const sales = (() => {
  const next = random(8);
  return regions.flatMap((_, r) =>
    [0, 1, 2, 3].map(
      (q) => [r, q, Math.round(60 + r * 12 + q * 18 + next() * 30)] as const,
    ),
  );
})();

// a two-armed spiral galaxy: a warm core and blue arms (columns of floats)
const galaxy = (() => {
  const next = random(11);
  const gauss = () =>
    Math.sqrt(-2 * Math.log(1 - next())) * Math.cos(2 * Math.PI * next());
  const cloud = (count: number, place: (i: number) => number[]) => {
    const x = new Float32Array(count);
    const y = new Float32Array(count);
    const z = new Float32Array(count);
    for (let i = 0; i < count; i++) [x[i], y[i], z[i]] = place(i);
    return { x, y, z };
  };
  const core = cloud(6000, () => {
    const r = Math.abs(gauss()) * 1.4;
    const angle = 2 * Math.PI * next();
    return [r * Math.cos(angle), r * Math.sin(angle), gauss() * 0.5];
  });
  const arms = cloud(18000, (i) => {
    const r = 1.5 + 10 * next() ** 0.7;
    // logarithmic arms, scattered more and more outwards
    const angle = (i % 2) * Math.PI + Math.log(r) * 2.6 + gauss() * 0.22;
    return [r * Math.cos(angle), r * Math.sin(angle), gauss() * 0.25];
  });
  return { core, arms };
})();

/** Night-sky colors of the galaxy card (the chart theme reads them) */
const space = {
  background: "radial-gradient(ellipse at 50% 45%, #0e1430 0%, #05070f 70%)",
  borderRadius: 8,
  "--surface-color": "#05070f",
  "--text-color": "#e6e9f2",
  "--text-secondary-color": "#9aa3b8",
  "--border-color": "#2a3247",
} as CSSProperties;
const galaxyCamera = { azimuth: 20, elevation: 40, zoom: 1.6 };
const flatAspect = [1, 1, 0.35] as const;

export default function Gallery3DDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    // values in thousands of dollars
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  const data = useMemo(() => {
    const scatter: Scatter3DSeries[] = clusters.map((points, i) => ({
      name: t("cluster", { name: "ABC"[i] }),
      data: points,
      pointSize: 6,
    }));
    const line: Line3DSeries[] = [
      { name: t("trajectory"), data: spiral, lineWidth: 2 },
    ];
    const surface: Surface3DSeries[] = [{ name: t("ripple"), data: ripple }];
    const bars: Bar3DSeries[] = [{ name: t("sales"), data: sales }];
    // glowing dots whose light adds up where the stars are dense
    const stars: Scatter3DSeries[] = [
      {
        name: t("galaxyCore"),
        data: galaxy.core,
        color: "#ffc477",
        pointSize: 2,
        opacity: 0.16,
        pointStyle: "glow",
        blend: "additive",
      },
      {
        name: t("galaxyArms"),
        data: galaxy.arms,
        color: "#9cc4ff",
        pointSize: 2,
        opacity: 0.1,
        pointStyle: "glow",
        blend: "additive",
      },
    ];
    const regionNames = regions.map((key) => t(`regions.${key}`));
    const quarters = [1, 2, 3, 4].map((n) => t("quarter", { n }));
    return { scatter, line, surface, bars, stars, regionNames, quarters };
  }, [t]);

  // the 3D charts pause their rendering and auto-rotation off screen
  return (
    <GalleryGrid>
      <GalleryCard
        title={t("cards.scatter3d.title")}
        component="Scatter3DChart"
        page="scatter-3d-chart"
        description={t("cards.scatter3d.description")}
      >
        <Scatter3DChart
          series={data.scatter}
          legend={false}
          autoRotate
          locale={locale}
          height="100%"
          ariaLabel={t("cards.scatter3d.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.line3d.title")}
        component="Line3DChart"
        page="scatter-3d-chart"
        description={t("cards.line3d.description")}
      >
        <Line3DChart
          series={data.line}
          colorScale="plasma"
          colorBar={false}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.line3d.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.surface3d.title")}
        component="Surface3DChart"
        page="surface-3d-chart"
        description={t("cards.surface3d.description")}
      >
        <Surface3DChart
          series={data.surface}
          colorBar={false}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.surface3d.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.bar3d.title")}
        component="Bar3DChart"
        page="bar-3d-chart"
        description={t("cards.bar3d.description")}
      >
        <Bar3DChart
          series={data.bars}
          xAxis={{ categories: data.regionNames }}
          yAxis={{ categories: data.quarters }}
          zAxis={{ format: usd }}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.bar3d.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.galaxy.title")}
        component="Scatter3DChart"
        page="scatter-3d-chart"
        description={t("cards.galaxy.description")}
      >
        <Scatter3DChart
          series={data.stars}
          legend={false}
          box={false}
          aspect={flatAspect}
          camera={galaxyCamera}
          autoRotate={6}
          locale={locale}
          height="100%"
          style={space}
          ariaLabel={t("cards.galaxy.aria")}
        />
      </GalleryCard>
    </GalleryGrid>
  );
}

```

### apps/docs/src/docs/pages/charts/gallery-card.tsx

```tsx
// Cards of the chart gallery demos: a localized caption linking to the
// chart's page and a fixed-height thumbnail (the charts use height="100%").
// The thumbnail is mounted only while its card is near the viewport: the
// gallery shows dozens of live charts, and each GPU chart holds its own
// WebGPU / WebGL context, which browsers limit (about 16 WebGL contexts).
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
  TextLink,
} from "minerva-design";

/** Responsive grid: as many 240 px columns as fit, one on narrow screens */
export function GalleryGrid({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

/** `true` while the element is within 400 px of the viewport */
function useNearViewport() {
  const ref = useRef<HTMLDivElement>(null);
  // without IntersectionObserver (old browsers, tests) everything is mounted
  const [near, setNear] = useState(
    () => typeof IntersectionObserver !== "function",
  );
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver !== "function") return;
    const observer = new IntersectionObserver(
      (entries) => setNear(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: "400px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, near] as const;
}

export function GalleryCard({
  title,
  page,
  component,
  description,
  children,
}: {
  /** Localized name of the chart type */
  title: string;
  /** Id of the docs page (its route) */
  page: string;
  /** Component name, shown in code style */
  component: string;
  /** Localized use case */
  description: string;
  /** The chart, with height="100%" */
  children: ReactNode;
}) {
  const [ref, near] = useNearViewport();
  return (
    <Card padding="small" style={{ minWidth: 0 }}>
      <CardHeader>
        <CardTitle>
          <TextLink asChild>
            <Link to={`/${page}`}>{title}</Link>
          </TextLink>
        </CardTitle>
        <CardDescription>
          <code>{component}</code> · {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={ref} style={{ height: 180, minWidth: 0 }}>
          {near ? (
            children
          ) : (
            <Skeleton variant="rounded" decorative width="100%" height="100%" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

```

## Example: Gallery: finance and trading

Candlesticks, the trading chart with a moving average, volume and a volume profile, SuperTrend with MACD, and the order book widgets (depth chart, price ladder, liquidity heatmap and time & sales) streaming a simulated market. They mount when scrolled into view; Ctrl / ⌘ + wheel zooms.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-router

Documentation context imports: none

### apps/docs/src/docs/pages/charts/demos/gallery-finance.tsx

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CandlestickChart,
  DepthChart,
  OrderBook,
  OrderBookHeatmap,
  TimeAndSales,
  TradingChart,
  type ChartSeries,
  type DepthChartHandle,
  type OrderBookHandle,
  type OrderBookHeatmapHandle,
  type TimeAndSalesHandle,
  type TradingIndicator,
  type TradingVolumeProfileOptions,
} from "minerva-design/charts";
import { GalleryCard, GalleryGrid } from "../gallery-card";
// simulated markets shared with the trading and order book pages
import { DAY, HOUR, generateBars } from "../../trading-chart/data";
import {
  createHistory,
  createMarketFeed,
  useFeedLoop,
} from "../../order-book/feed";

// 36 daily candles (local dates)
const candles = generateBars({ count: 36, timeframe: DAY, seed: 42 }).map(
  (bar, i) => ({
    x: new Date(2026, 8, 1 + i),
    open: bar.open,
    high: bar.high,
    low: bar.low,
    y: bar.close,
  }),
);
// hourly bars of a crypto pair, daily bars for the indicators
const hourly = generateBars({
  count: 240,
  timeframe: HOUR,
  seed: 7,
  price: 64_000,
  volatility: 0.006,
  volume: 400,
});
const daily = generateBars({
  count: 200,
  timeframe: DAY,
  seed: 36,
  price: 58_000,
  volatility: 0.024,
  volume: 3e4,
});
const hourlyIndicators: TradingIndicator[] = [
  { type: "ma", period: 20 },
  { type: "volume", overlay: true },
];
// traded volume per price level of the visible bars
const hourlyProfile: TradingVolumeProfileOptions = { rows: 24 };
const dailyIndicators: TradingIndicator[] = [
  { type: "supertrend", period: 10, multiplier: 3 },
  { type: "macd", height: 50 },
];

// the order book widgets stream a simulated market (paused off screen)
function LiveDepthChart({ ariaLabel }: { ariaLabel: string }) {
  const { i18n } = useTranslation();
  const chartRef = useRef<DepthChartHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [feed] = useState(() => createMarketFeed({ seed: 5 }));
  const [book] = useState(() => feed.snapshot());
  useFeedLoop(boxRef, (elapsed) =>
    chartRef.current?.applyDeltas(feed.step(elapsed).delta),
  );
  return (
    <div ref={boxRef} style={{ height: "100%" }}>
      <DepthChart
        ref={chartRef}
        book={book}
        range={0.003}
        legend={false}
        fontSize={10}
        pricePrecision={1}
        sizePrecision={3}
        locale={i18n.language}
        height="100%"
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

function LiveOrderBook({ ariaLabel }: { ariaLabel: string }) {
  const { i18n } = useTranslation();
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [feed] = useState(() => createMarketFeed({ seed: 9 }));
  const [book] = useState(() => feed.snapshot());
  useFeedLoop(boxRef, (elapsed) => {
    const { delta, trades } = feed.step(elapsed);
    bookRef.current?.applyDeltas(delta);
    if (trades.length) bookRef.current?.setLastPrice(feed.last());
  });
  return (
    <div ref={boxRef} style={{ height: "100%" }}>
      <OrderBook
        ref={bookRef}
        book={book}
        rowHeight={16}
        fontSize={11}
        imbalance={false}
        pricePrecision={1}
        sizePrecision={3}
        locale={i18n.language}
        height="100%"
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

function LiveOrderBookHeatmap({ ariaLabel }: { ariaLabel: string }) {
  const { i18n } = useTranslation();
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // 30 s of history, then live
  const [market] = useState(() => createHistory({ seed: 25 }, 30_000));
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    heatmap.setBook(market.snapshot);
    for (const { delta, trades } of market.updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
  }, [market]);
  useFeedLoop(boxRef, (elapsed) => {
    const { delta, trades } = market.feed.step(elapsed);
    heatmapRef.current?.applyDeltas(delta);
    heatmapRef.current?.addTrades(trades);
  });
  return (
    <div ref={boxRef} style={{ height: "100%" }}>
      <OrderBookHeatmap
        ref={heatmapRef}
        interval={150}
        window={30_000}
        profile={false}
        bubbleSize={12}
        fontSize={10}
        pricePrecision={1}
        sizePrecision={3}
        locale={i18n.language}
        height="100%"
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

function LiveTimeAndSales({ ariaLabel }: { ariaLabel: string }) {
  const { i18n } = useTranslation();
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // 10 s of trades, then live
  const [market] = useState(() => createHistory({ seed: 36 }, 10_000));
  const [history] = useState(() =>
    market.updates.flatMap((update) => update.trades),
  );
  useFeedLoop(boxRef, (elapsed) => {
    const { trades } = market.feed.step(elapsed);
    if (trades.length) tapeRef.current?.addTrades(trades);
  });
  return (
    <div ref={boxRef} style={{ height: "100%" }}>
      <TimeAndSales
        ref={tapeRef}
        trades={history}
        rowHeight={16}
        fontSize={11}
        milliseconds={false}
        aggregate
        pricePrecision={1}
        sizePrecision={3}
        locale={i18n.language}
        height="100%"
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

export default function GalleryFinanceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const candleSeries = useMemo(
    (): ChartSeries[] => [{ name: t("price"), data: candles }],
    [t],
  );
  const ohlcLabels = useMemo(
    () => ({
      open: t("ohlcLabels.open"),
      high: t("ohlcLabels.high"),
      low: t("ohlcLabels.low"),
      close: t("ohlcLabels.close"),
    }),
    [t],
  );

  // wheel="modifier": the page scrolls over the thumbnails, Ctrl / ⌘ + wheel zooms
  return (
    <GalleryGrid>
      <GalleryCard
        title={t("cards.candlestick.title")}
        component="CandlestickChart"
        page="candlestick-chart"
        description={t("cards.candlestick.description")}
      >
        <CandlestickChart
          series={candleSeries}
          tooltip={{ labels: ohlcLabels }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.candlestick.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.trading.title")}
        component="TradingChart"
        page="trading-chart"
        description={t("cards.trading.description")}
      >
        <TradingChart
          bars={hourly}
          timeframe="1H"
          symbol="BTC/USDT"
          indicators={hourlyIndicators}
          volumeProfile={hourlyProfile}
          legend={false}
          highLowMarkers={false}
          barSpacing={5}
          wheel="modifier"
          locale={locale}
          height="100%"
          ariaLabel={t("cards.trading.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.indicators.title")}
        component="TradingChart"
        page="technical-indicators"
        description={t("cards.indicators.description")}
      >
        <TradingChart
          bars={daily}
          timeframe="1D"
          symbol="BTC/USDT"
          indicators={dailyIndicators}
          legend={false}
          highLowMarkers={false}
          barSpacing={4}
          wheel="modifier"
          locale={locale}
          height="100%"
          ariaLabel={t("cards.indicators.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.depth.title")}
        component="DepthChart"
        page="depth-chart"
        description={t("cards.depth.description")}
      >
        <LiveDepthChart ariaLabel={t("cards.depth.aria")} />
      </GalleryCard>

      <GalleryCard
        title={t("cards.orderBook.title")}
        component="OrderBook"
        page="order-book"
        description={t("cards.orderBook.description")}
      >
        <LiveOrderBook ariaLabel={t("cards.orderBook.aria")} />
      </GalleryCard>

      <GalleryCard
        title={t("cards.orderBookHeatmap.title")}
        component="OrderBookHeatmap"
        page="order-book-heatmap"
        description={t("cards.orderBookHeatmap.description")}
      >
        <LiveOrderBookHeatmap ariaLabel={t("cards.orderBookHeatmap.aria")} />
      </GalleryCard>

      <GalleryCard
        title={t("cards.timeSales.title")}
        component="TimeAndSales"
        page="time-and-sales"
        description={t("cards.timeSales.description")}
      >
        <LiveTimeAndSales ariaLabel={t("cards.timeSales.aria")} />
      </GalleryCard>
    </GalleryGrid>
  );
}

```

### apps/docs/src/docs/pages/charts/gallery-card.tsx

```tsx
// Cards of the chart gallery demos: a localized caption linking to the
// chart's page and a fixed-height thumbnail (the charts use height="100%").
// The thumbnail is mounted only while its card is near the viewport: the
// gallery shows dozens of live charts, and each GPU chart holds its own
// WebGPU / WebGL context, which browsers limit (about 16 WebGL contexts).
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
  TextLink,
} from "minerva-design";

/** Responsive grid: as many 240 px columns as fit, one on narrow screens */
export function GalleryGrid({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

/** `true` while the element is within 400 px of the viewport */
function useNearViewport() {
  const ref = useRef<HTMLDivElement>(null);
  // without IntersectionObserver (old browsers, tests) everything is mounted
  const [near, setNear] = useState(
    () => typeof IntersectionObserver !== "function",
  );
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver !== "function") return;
    const observer = new IntersectionObserver(
      (entries) => setNear(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: "400px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, near] as const;
}

export function GalleryCard({
  title,
  page,
  component,
  description,
  children,
}: {
  /** Localized name of the chart type */
  title: string;
  /** Id of the docs page (its route) */
  page: string;
  /** Component name, shown in code style */
  component: string;
  /** Localized use case */
  description: string;
  /** The chart, with height="100%" */
  children: ReactNode;
}) {
  const [ref, near] = useNearViewport();
  return (
    <Card padding="small" style={{ minWidth: 0 }}>
      <CardHeader>
        <CardTitle>
          <TextLink asChild>
            <Link to={`/${page}`}>{title}</Link>
          </TextLink>
        </CardTitle>
        <CardDescription>
          <code>{component}</code> · {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={ref} style={{ height: 180, minWidth: 0 }}>
          {near ? (
            children
          ) : (
            <Skeleton variant="rounded" decorative width="100%" height="100%" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

### apps/docs/src/docs/pages/order-book/feed.ts

```tsx
// Simulated market for the order book demos: a seeded matching engine
// (limit orders, cancels and market orders sweeping the book) producing a
// snapshot, incremental deltas and trades like an exchange WebSocket feed,
// plus a loop hook that stops on unmount and while the demo is off screen.
// The resting liquidity looks like a real book: a smooth landscape over
// price that drifts over time, clusters at round prices, a thicker zone at
// the touch, and a few large walls with a life of their own (added, pulled
// before the price gets there, or eaten by block trades).
// Not a demo itself: only `demos/*.tsx` files are collected.

import { useEffect, useRef, type RefObject } from "react";
import type {
  OrderBookDelta,
  OrderBookHeatmapHandle,
  OrderBookLevel,
  OrderBookSnapshot,
  MarketTrade,
} from "minerva-design/charts";

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface FeedOptions {
  /** Seed of the random generator (same seed, same market) */
  seed?: number;
  /** Starting price */
  price?: number;
  /** Price increment */
  tick?: number;
  /** Levels kept on each side */
  levels?: number;
  /** Order book events per second */
  activity?: number;
  /** Probability that an order is a large one (walls, block trades) */
  whales?: number;
  /** Clock of the first update (ms since epoch) */
  start?: number;
}

export interface FeedUpdate {
  /** Levels changed by the update (size 0 removes a level) */
  delta: OrderBookDelta & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
    time: number;
  };
  /** Trades of the update, oldest first */
  trades: MarketTrade[];
}

export interface MarketFeed {
  readonly tick: number;
  /** Full book, best levels first */
  snapshot(): OrderBookSnapshot & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
  };
  /** Advances the market by `ms` milliseconds */
  step(ms: number): FeedUpdate;
  /** Price of the last trade */
  last(): number;
  /** Clock of the market (ms since epoch) */
  time(): number;
}

type Side = "bid" | "ask";

/** A large resting order with a life of its own */
interface Wall {
  /** Size it added to its level */
  size: number;
  /** Clock at which it is pulled (unless the price is already there) */
  until: number;
  /** Pulled as soon as the price comes close (spoofing) */
  spoof: boolean;
}

/** Smoothstep */
const smooth = (t: number) => t * t * (3 - 2 * t);

export function createMarketFeed(options: FeedOptions = {}): MarketFeed {
  const seed = options.seed ?? 7;
  const random = mulberry32(seed);
  const tick = options.tick ?? 0.1;
  const decimals = Math.max(0, Math.round(-Math.log10(tick)));
  const depth = options.levels ?? 1500;
  const activity = options.activity ?? 140;
  const whales = options.whales ?? 0.006;
  /** Walls compared with the default market */
  const wallRate = whales / 0.006;
  let time = options.start ?? Date.now();
  /** Time since the start (drives the liquidity landscape) */
  let elapsed = 0;
  // prices are integers of ticks: no rounding drift
  const center = Math.round((options.price ?? 64000) / tick);
  const books: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const walls: Record<Side, Map<number, Wall>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const best: Record<Side, number> = { bid: center - 1, ask: center };
  let last = center * tick;
  /** Hidden fair value (ticks): a random walk the quotes and orders chase */
  let fair = center - 0.5;
  let momentum = 0;

  const gauss = () => {
    const u = Math.max(1e-9, random());
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
  };
  const lognormal = (median: number, sigma: number) =>
    median * Math.exp(sigma * gauss());
  const round = (size: number) =>
    Math.max(0.0001, Math.round(size * 1e4) / 1e4);
  const priceOf = (index: number) => +(index * tick).toFixed(decimals);
  const sign = (side: Side) => (side === "bid" ? -1 : 1);
  const at = (side: Side, distance: number) =>
    best[side] + sign(side) * distance;
  /** Distance of a price from its side's best (negative: crossed) */
  const distanceOf = (side: Side, index: number) =>
    side === "bid" ? best.bid - index : index - best.ask;

  /** Seeded lattice hash in [0, 1) (stateless: the landscape is a field) */
  const hash = (i: number, j: number, octave: number) => {
    let h =
      Math.imul(i | 0, 0x27d4eb2d) ^
      Math.imul(j | 0, 0x165667b1) ^
      Math.imul((seed + octave * 7919) | 0, 0x9e3779b1);
    h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  /** Smooth value noise in [-1, 1] over (price, time) lattice units */
  const noise = (x: number, y: number, octave: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = smooth(x - xi);
    const fy = smooth(y - yi);
    const a = hash(xi, yi, octave);
    const b = hash(xi + 1, yi, octave);
    const c = hash(xi, yi + 1, octave);
    const d = hash(xi + 1, yi + 1, octave);
    return (
      2 * (a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy) - 1
    );
  };
  /**
   * Typical size of a level: thicker at the touch (makers refresh it) and
   * slowly deeper in the book, times a smooth landscape over price (zones
   * of 3 to 12 USD at the default tick) that drifts within a minute, times
   * the clustering at round prices (every 1, 5 and 10 USD)
   */
  const target = (side: Side, index: number) => {
    const d = Math.max(0, distanceOf(side, index));
    const landscape = Math.exp(
      1.05 *
        (0.7 * noise(index / 120, elapsed / 22_000, 1) +
          0.45 * noise(index / 35, elapsed / 9_000, 2)),
    );
    const roundness =
      index % 100 === 0 ? 3 : index % 50 === 0 ? 2 : index % 10 === 0 ? 1.3 : 1;
    return (
      (0.08 + 0.0004 * d) *
      (1 + 1.4 * Math.exp(-d / 15)) *
      landscape *
      roundness
    );
  };
  /** Resting size of a new level: its typical size with noise */
  const levelSize = (side: Side, index: number) =>
    round(target(side, index) * Math.exp(0.7 * gauss()));
  /** Far from the touch, fewer prices hold orders */
  const emptiness = (distance: number) =>
    distance > 3 ? Math.min(0.6, 0.05 + distance / 2500) : 0;

  let touched: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const set = (side: Side, index: number, size: number) => {
    if (size > 0.00005) books[side].set(index, round(size));
    else books[side].delete(index);
    touched[side].set(index, size > 0.00005 ? round(size) : 0);
  };

  /** Adds a wall (or grows one) living until `until` */
  const addWall = (
    side: Side,
    index: number,
    size: number,
    until: number,
    spoof: boolean,
  ) => {
    set(side, index, (books[side].get(index) ?? 0) + size);
    const wall = walls[side].get(index);
    if (wall) {
      wall.size += size;
      wall.until = Math.max(wall.until, until);
    } else walls[side].set(index, { size, until, spoof });
  };
  /** Size of a wall: a few times a typical level (3 to 12 here) */
  const wallSize = () => lognormal(3.2, 0.5);

  for (const side of ["bid", "ask"] as const) {
    for (let d = 0; d < depth; d++) {
      if (random() < emptiness(d)) continue;
      const index = at(side, d);
      books[side].set(index, levelSize(side, index));
      // a few walls from the start (most at round prices), with varied
      // lives: some end early, a few outlast the window
      const p =
        0.003 *
        wallRate *
        (index % 100 === 0
          ? 8
          : index % 50 === 0
            ? 5
            : index % 10 === 0
              ? 2
              : 1);
      if (d > 8 && random() < p)
        addWall(
          side,
          index,
          wallSize(),
          time + 5_000 + random() * 90_000,
          random() < 0.3,
        );
    }
  }

  /** Best level again after a removal (scans away from the spread) */
  const rescan = (side: Side) => {
    const book = books[side];
    if (book.has(best[side])) return;
    for (let d = 1; d < depth * 3; d++) {
      const index = best[side] + sign(side) * d;
      if (book.has(index)) {
        best[side] = index;
        return;
      }
    }
    // empty side: a fresh level next to the other one
    best[side] = side === "bid" ? best.ask - 1 : best.bid + 1;
    set(side, best[side], levelSize(side, best[side]));
  };

  const limit = (side: Side) => {
    const spread = best.ask - best.bid;
    let index: number;
    if (spread > 1 && random() < (spread > 4 ? 0.95 : 0.6)) {
      // improve the price inside the spread; after a sweep, makers quote
      // back into the gap (up to half of it at once): it closes in ms
      const jump =
        1 + Math.floor(random() * Math.max(1, Math.floor((spread - 1) / 2)));
      index = side === "bid" ? best.bid + jump : best.ask - jump;
    } else {
      index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 7));
    }
    if (side === "bid" && index >= best.ask) index = best.ask - 1;
    if (side === "ask" && index <= best.bid) index = best.bid + 1;
    if (random() < whales * 0.3) {
      // a large passive order at the touch: absorbs the flow for a while
      addWall(
        side,
        index,
        lognormal(5, 0.5),
        time + 5_000 + random() * 25_000,
        false,
      );
    } else {
      // makers refresh the liquidity near the touch
      const d = Math.max(0, distanceOf(side, index));
      const size = lognormal(0.12 * (1 + 1.2 * Math.exp(-d / 15)), 0.6);
      set(side, index, (books[side].get(index) ?? 0) + size);
    }
    if (side === "bid" ? index > best.bid : index < best.ask)
      best[side] = index;
  };

  const cancel = (side: Side) => {
    const index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 9));
    const size = books[side].get(index);
    // walls leave on their own schedule
    if (size === undefined || walls[side].has(index)) return;
    set(side, index, random() < 0.4 ? 0 : size * (0.2 + random() * 0.6));
    rescan(side);
  };

  /** Pulls the best level (a stale quote) */
  const cancelTouch = (side: Side) => {
    const size = books[side].get(best[side]);
    if (size === undefined) return rescan(side);
    if (walls[side].has(best[side])) return;
    set(side, best[side], random() < 0.6 ? 0 : size * 0.3);
    rescan(side);
  };

  const market = (
    buy: boolean,
    trades: MarketTrade[],
    now: number,
    amount?: number,
  ) => {
    const side: Side = buy ? "ask" : "bid";
    let remaining =
      amount ??
      (random() < whales ? lognormal(6, 0.6) : lognormal(0.035, 1.35));
    remaining = round(remaining);
    for (let sweep = 0; sweep < 40 && remaining > 0.00005; sweep++) {
      const index = best[side];
      const size = books[side].get(index) ?? 0;
      if (size <= 0) {
        rescan(side);
        continue;
      }
      const fill = round(Math.min(size, remaining));
      trades.push({
        time: now,
        price: priceOf(index),
        size: fill,
        side: buy ? "buy" : "sell",
      });
      last = priceOf(index);
      remaining -= fill;
      set(side, index, size - fill > 0.00005 ? size - fill : 0);
      rescan(side);
    }
  };

  /**
   * Life of the walls: spoofs are pulled when the price comes close, real
   * ones at the touch are eaten by block trades, the others are pulled at
   * the end of their life; new ones appear away from the touch
   */
  const liveWalls = (ms: number, trades: MarketTrade[], now: number) => {
    for (const side of ["bid", "ask"] as const) {
      for (const [index, wall] of [...walls[side]]) {
        const current = books[side].get(index) ?? 0;
        const d = distanceOf(side, index);
        if (d < 0 || current < wall.size * 0.15) {
          walls[side].delete(index);
        } else if (wall.spoof && d <= 15) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
          rescan(side);
        } else if (d === 0) {
          // absorbed by aggressive orders: large bubbles
          if (random() < ms / 1500)
            market(
              side === "ask",
              trades,
              now,
              current * (0.3 + random() * 0.5),
            );
        } else if (time >= wall.until && d > 3) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
        }
      }
    }
    if (random() < (ms / 8000) * wallRate) {
      const side: Side = random() < 0.5 ? "bid" : "ask";
      let d = 10 + Math.floor(random() * 140);
      let index = at(side, d);
      if (random() < 0.6) {
        // at a round price (1 USD at the default tick), away from the touch
        index =
          side === "bid"
            ? Math.floor(index / 10) * 10
            : Math.ceil(index / 10) * 10;
        d = distanceOf(side, index);
      }
      if (d >= 8)
        addWall(
          side,
          index,
          wallSize(),
          time + 10_000 + random() * 50_000,
          random() < 0.3,
        );
    }
  };

  /**
   * Deep in the book orders come and go: levels drift slowly toward the
   * landscape (horizontal lines change intensity over time), holes fill
   * and levels vanish so the density stays put, far levels are dropped
   */
  const drift = (ms: number) => {
    const visits = Math.ceil((depth * ms) / 900);
    for (const side of ["bid", "ask"] as const) {
      for (let k = 0; k < visits; k++) {
        const d = 4 + Math.floor(random() * depth);
        const index = at(side, d);
        if (walls[side].has(index)) continue;
        const size = books[side].get(index);
        const empty = emptiness(d);
        if (size === undefined) {
          if (random() < (1 - empty) * 0.1)
            set(side, index, levelSize(side, index));
          continue;
        }
        if (random() < empty * 0.1) {
          set(side, index, 0);
          continue;
        }
        if (random() < 0.05) {
          // a stale order is pulled and re-added at the current depth: no
          // liquidity line runs unchanged through the whole history
          set(side, index, 0);
          if (random() > empty) set(side, index, levelSize(side, index));
          continue;
        }
        const log = Math.log(size);
        const goal = Math.log(target(side, index));
        set(side, index, Math.exp(log + 0.1 * gauss() + 0.16 * (goal - log)));
      }
      if (random() < 0.05) {
        for (const index of books[side].keys()) {
          if (Math.abs(index - best[side]) > depth * 1.3) {
            set(side, index, 0);
            walls[side].delete(index);
          }
        }
      }
    }
  };

  const levels = (side: Side): OrderBookLevel[] =>
    [...books[side].entries()]
      .sort((a, b) => (side === "bid" ? b[0] - a[0] : a[0] - b[0]))
      .map(([index, size]) => [priceOf(index), size]);

  /**
   * Safety net of the invariant best bid < best ask: any level at or
   * through the other side's best is removed (the matching engine never
   * produces one, this keeps the feed sound whatever the parameters)
   */
  const uncross = () => {
    for (let guard = 0; guard < 64; guard++) {
      const bid = Math.max(-Infinity, ...books.bid.keys());
      const ask = Math.min(Infinity, ...books.ask.keys());
      if (bid < ask) {
        if (Number.isFinite(bid)) best.bid = bid;
        if (Number.isFinite(ask)) best.ask = ask;
        return;
      }
      // the older side wins: drop the level that crossed it
      if (best.bid >= ask) set("bid", bid, 0);
      else set("ask", ask, 0);
    }
  };

  return {
    tick,
    snapshot: () => ({ bids: levels("bid"), asks: levels("ask"), time }),
    step(ms) {
      touched = { bid: new Map(), ask: new Map() };
      const trades: MarketTrade[] = [];
      const start = time;
      const span = Math.max(0, ms);
      time += span;
      elapsed += span;
      // the fair value wanders (with some momentum); orders chase it
      const seconds = span / 1000;
      momentum =
        momentum * Math.exp(-seconds / 20) + gauss() * Math.sqrt(seconds) * 0.6;
      fair += momentum * seconds * 3 + gauss() * Math.sqrt(seconds) * 15;
      const mid = (best.bid + best.ask) / 2;
      const pull = Math.max(-0.38, Math.min(0.38, (fair - mid) / 25));
      const expected = (activity * span) / 1000;
      const events = Math.floor(expected * (0.4 + random() * 1.2) + random());
      for (let e = 0; e < events; e++) {
        const now = Math.round(
          start + ((e + 1) * (time - start)) / (events + 1),
        );
        const r = random();
        const bias = 0.5 + pull;
        if (r < 0.5) limit(random() < bias ? "bid" : "ask");
        else if (r < 0.76) cancel(random() < 1 - bias ? "bid" : "ask");
        else if (r < 0.86) {
          // stale quotes on the wrong side of the fair value are pulled
          if (best.bid > fair + 1) cancelTouch("bid");
          else if (best.ask < fair - 1) cancelTouch("ask");
          else cancel(random() < 0.5 ? "bid" : "ask");
        } else market(random() < bias, trades, now);
      }
      liveWalls(span, trades, time);
      drift(span);
      uncross();
      const tuples = (side: Side): OrderBookLevel[] =>
        [...touched[side]].map(([index, size]) => [priceOf(index), size]);
      return {
        delta: { bids: tuples("bid"), asks: tuples("ask"), time },
        trades,
      };
    },
    last: () => last,
    time: () => time,
  };
}

/**
 * A market with `ms` of history: the book at `now - ms` and the updates
 * since then, every `step` ms (backfills a heatmap); `feed` goes on live.
 */
export function createHistory(
  options: FeedOptions,
  ms: number,
  step = 100,
): { feed: MarketFeed; snapshot: OrderBookSnapshot; updates: FeedUpdate[] } {
  const now = Date.now();
  const feed = createMarketFeed({ ...options, start: now - ms });
  const snapshot = feed.snapshot();
  const updates: FeedUpdate[] = [];
  while (feed.time() < now) updates.push(feed.step(step));
  return { feed, snapshot, updates };
}

/**
 * Calls `onTick(elapsed ms)` every `interval` ms while `running`, the
 * element is on screen and the page visible; stops on unmount.
 */
export function useFeedLoop(
  targetRef: RefObject<HTMLElement | null>,
  onTick: (elapsed: number) => void,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const tickRef = useRef(onTick);
  useEffect(() => {
    tickRef.current = onTick;
  });
  useEffect(() => {
    if (!running) return;
    let visible = true;
    const target = targetRef.current;
    const observer =
      target && typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
          })
        : null;
    if (target) observer?.observe(target);
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      // after a pause the market resumes where it was (no catch-up burst)
      const elapsed = Math.min(100, now - last);
      last = now;
      if (!visible || document.hidden) return;
      tickRef.current(elapsed);
    }, interval);
    return () => {
      clearInterval(id);
      observer?.disconnect();
    };
  }, [targetRef, interval, running]);
}

type HeatmapSink = Pick<
  OrderBookHeatmapHandle,
  "clear" | "setBook" | "applyDeltas" | "addTrades"
>;

/** Where a market stream goes (usually the handles of the widgets) */
export interface MarketSink {
  /**
   * A fresh market starts (mount, remount): load its whole state, e.g.
   * `setBook(feed.snapshot())` (live deltas only make sense on that book)
   */
  load(feed: MarketFeed): void;
  /** One live update of the market */
  update(update: FeedUpdate, feed: MarketFeed): void;
  /** The market stops (unmount): forget its state */
  reset?(): void;
}

/**
 * Streams a simulated market into `sink` every `interval` ms (see
 * `useFeedLoop`). The market is created inside the effect and loaded
 * whole first: a remount (StrictMode, hot reload) starts again from a
 * fresh, consistent book instead of applying live deltas to a stale
 * snapshot (which crosses the ladder). `options` are read on mount.
 */
export function useMarketStream(
  targetRef: RefObject<HTMLElement | null>,
  options: FeedOptions,
  sink: MarketSink,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const optionsRef = useRef(options);
  const sinkRef = useRef(sink);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    sinkRef.current = sink;
  });
  useEffect(() => {
    const feed = createMarketFeed(optionsRef.current);
    marketRef.current = feed;
    sinkRef.current.load(feed);
    return () => {
      marketRef.current = null;
      sinkRef.current.reset?.();
    };
  }, []);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      if (feed) sinkRef.current.update(feed.step(elapsed), feed);
    },
    { interval, running },
  );
}

/** Empty book: what a ladder or depth chart shows once its market stopped */
export const EMPTY_BOOK: OrderBookSnapshot = { bids: [], asks: [] };

/**
 * Backfills a heatmap with `history` ms of recorded market, then streams
 * the same market live. The market is created inside the effect and the
 * heatmap cleared first: a remount (StrictMode, hot reload) starts again
 * from a fresh, consistent book, never applying live deltas to a stale one.
 */
export function useHeatmapReplay(
  targetRef: RefObject<HTMLElement | null>,
  heatmapRef: RefObject<HeatmapSink | null>,
  options: FeedOptions,
  history: number,
  { step = 100, interval = 20 }: { step?: number; interval?: number } = {},
) {
  const optionsRef = useRef(options);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory(
      optionsRef.current,
      history,
      step,
    );
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
    };
  }, [heatmapRef, history, step]);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      const heatmap = heatmapRef.current;
      if (!feed || !heatmap) return;
      const { delta, trades } = feed.step(elapsed);
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    },
    { interval },
  );
}

```

## Example: Gallery: networks, dependencies and trees

Calls between microservices as a force-directed network, support topics in an arc diagram, a data pipeline as a DAG with its critical path, an org chart, a trip mind map and customers moving between plans in a chord diagram. Hover a node to highlight its neighbors; Ctrl / ⌘ + wheel zooms.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-router

Documentation context imports: none

### apps/docs/src/docs/pages/charts/demos/gallery-graphs.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ChordChart,
  DependencyGraph,
  GraphChart,
  TreeChart,
  type GraphEdge,
  type GraphGroup,
  type GraphNode,
} from "minerva-design/charts";
import { GalleryCard, GalleryGrid } from "../gallery-card";

// microservices: [id, tier, requests per second]
const services: [string, string, number][] = [
  ["gateway", "edge", 1200],
  ["web", "edge", 640],
  ["auth", "core", 520],
  ["users", "core", 380],
  ["orders", "core", 300],
  ["payments", "core", 160],
  ["search", "core", 420],
  ["inventory", "core", 220],
  ["database", "data", 900],
  ["cache", "data", 1100],
  ["queue", "data", 260],
];
const calls: [string, string][] = [
  ["web", "gateway"],
  ["gateway", "auth"],
  ["gateway", "users"],
  ["gateway", "orders"],
  ["gateway", "search"],
  ["orders", "payments"],
  ["orders", "inventory"],
  ["orders", "queue"],
  ["auth", "cache"],
  ["users", "database"],
  ["users", "cache"],
  ["orders", "database"],
  ["search", "cache"],
  ["inventory", "database"],
  ["payments", "queue"],
];
const tiers = ["edge", "core", "data"];

// support topics and how often they show up in the same ticket
const topics = ["login", "billing", "export", "mobile", "speed", "alerts"];
const together: [string, string, number][] = [
  ["login", "mobile", 9],
  ["login", "alerts", 3],
  ["billing", "export", 5],
  ["billing", "login", 4],
  ["export", "speed", 7],
  ["mobile", "speed", 6],
  ["mobile", "alerts", 8],
  ["speed", "alerts", 2],
];

// data pipeline: [step, duration in minutes] and dependencies
const steps: [string, number][] = [
  ["extract", 12],
  ["clean", 8],
  ["enrich", 15],
  ["join", 6],
  ["train", 25],
  ["report", 4],
  ["publish", 3],
];
const needs: [string, string][] = [
  ["extract", "clean"],
  ["extract", "enrich"],
  ["clean", "join"],
  ["enrich", "join"],
  ["join", "train"],
  ["join", "report"],
  ["train", "publish"],
  ["report", "publish"],
];
// tight spacing: the box labels stay readable once the graph is fitted
const pipelineLayout = { layerGap: 28, nodeGap: 12 };

// org chart: [role, manager]
const roles: [string, string | null][] = [
  ["ceo", null],
  ["cto", "ceo"],
  ["cfo", "ceo"],
  ["coo", "ceo"],
  ["platform", "cto"],
  ["product", "cto"],
  ["finance", "cfo"],
  ["sales", "coo"],
  ["support", "coo"],
];
const orgLayout = {
  cardSize: [104, 34],
  levelGap: 28,
  siblingGap: 10,
} as const;

// mind map of a trip: branch → ideas
const trip: Record<string, string[]> = {
  transport: ["train", "rentalCar"],
  stay: ["hotel", "camping"],
  food: ["market", "restaurants"],
  activities: ["museum", "hiking", "beach"],
};
const mindMapLayout = { levelGap: 24, siblingGap: 6 };

// customers moving between plans in a quarter: row = from, column = to
const plans = ["free", "starter", "pro", "enterprise"];
const moves = [
  [0, 120, 40, 4],
  [30, 0, 90, 12],
  [10, 25, 0, 36],
  [2, 4, 14, 0],
];

export default function GalleryGraphsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const data = useMemo(() => {
    const serviceNodes: GraphNode[] = services.map(([id, tier, rps]) => ({
      id,
      label: t(`graph.services.${id}`),
      group: tier,
      value: rps,
    }));
    const serviceEdges: GraphEdge[] = calls.map(([source, target]) => ({
      source,
      target,
      directed: true,
    }));
    const serviceGroups: GraphGroup[] = tiers.map((id) => ({
      id,
      name: t(`graph.tiers.${id}`),
    }));
    const topicNodes: GraphNode[] = topics.map((id) => ({
      id,
      label: t(`graph.topics.${id}`),
      group: id,
    }));
    const topicEdges: GraphEdge[] = together.map(([source, target, value]) => ({
      source,
      target,
      value,
    }));
    const stepNodes: GraphNode[] = steps.map(([id, minutes]) => ({
      id,
      label: t(`graph.steps.${id}`),
      value: minutes,
    }));
    const stepEdges: GraphEdge[] = needs.map(([source, target]) => ({
      source,
      target,
    }));
    const roleNodes: GraphNode[] = roles.map(([id]) => ({
      id,
      label: t(`graph.roles.${id}`),
    }));
    const roleEdges: GraphEdge[] = roles.flatMap(([id, manager]) =>
      manager ? [{ source: manager, target: id }] : [],
    );
    const tripNodes: GraphNode[] = [
      { id: "trip", label: t("graph.trip.trip") },
    ];
    const tripEdges: GraphEdge[] = [];
    for (const [branch, ideas] of Object.entries(trip)) {
      tripNodes.push({ id: branch, label: t(`graph.trip.${branch}`) });
      tripEdges.push({ source: "trip", target: branch });
      for (const idea of ideas) {
        tripNodes.push({ id: idea, label: t(`graph.trip.${idea}`) });
        tripEdges.push({ source: branch, target: idea });
      }
    }
    const planNames = plans.map((id) => t(`graph.plans.${id}`));
    return {
      serviceNodes,
      serviceEdges,
      serviceGroups,
      topicNodes,
      topicEdges,
      stepNodes,
      stepEdges,
      roleNodes,
      roleEdges,
      tripNodes,
      tripEdges,
      planNames,
    };
  }, [t]);

  const customers = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    return (value: number) => t("customers", { value: number.format(value) });
  }, [t, locale]);

  // controls={false}: no zoom buttons in the thumbnails (Ctrl / ⌘ + wheel still zooms);
  // nodeLabels: labels even when the graph is zoomed out to fit
  return (
    <GalleryGrid>
      <GalleryCard
        title={t("cards.network.title")}
        component="GraphChart"
        page="graph-chart"
        description={t("cards.network.description")}
      >
        <GraphChart
          nodes={data.serviceNodes}
          edges={data.serviceEdges}
          groups={data.serviceGroups}
          nodeSize={[10, 24]}
          edgeColor="source"
          force={{ linkDistance: 50, charge: -260 }}
          legend={false}
          controls={false}
          fitPadding={12}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.network.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.arc.title")}
        component="GraphChart"
        page="graph-chart"
        description={t("cards.arc.description")}
      >
        <GraphChart
          nodes={data.topicNodes}
          edges={data.topicEdges}
          layout="arc"
          edgeColor="source"
          edgeWidth={[1, 5]}
          edgeLabels={false}
          legend={false}
          controls={false}
          fitPadding={12}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.arc.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.dag.title")}
        component="DependencyGraph"
        page="dependency-graph"
        description={t("cards.dag.description")}
      >
        <DependencyGraph
          nodes={data.stepNodes}
          edges={data.stepEdges}
          direction="LR"
          edgeStyle="orthogonal"
          criticalPath
          dag={pipelineLayout}
          nodeLabels
          legend={false}
          controls={false}
          fitPadding={12}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.dag.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.org.title")}
        component="TreeChart"
        page="tree-chart"
        description={t("cards.org.description")}
      >
        <TreeChart
          nodes={data.roleNodes}
          edges={data.roleEdges}
          layout="org"
          tree={orgLayout}
          nodeLabels
          legend={false}
          controls={false}
          fitPadding={12}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.org.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.mindMap.title")}
        component="TreeChart"
        page="tree-chart"
        description={t("cards.mindMap.description")}
      >
        <TreeChart
          nodes={data.tripNodes}
          edges={data.tripEdges}
          layout="mindmap"
          tree={mindMapLayout}
          nodeLabels
          legend={false}
          controls={false}
          fitPadding={12}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.mindMap.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.chord.title")}
        component="ChordChart"
        page="chord-chart"
        description={t("cards.chord.description")}
      >
        <ChordChart
          groups={data.planNames}
          matrix={moves}
          directed
          format={customers}
          legend={false}
          locale={locale}
          height="100%"
          ariaLabel={t("cards.chord.aria")}
        />
      </GalleryCard>
    </GalleryGrid>
  );
}

```

### apps/docs/src/docs/pages/charts/gallery-card.tsx

```tsx
// Cards of the chart gallery demos: a localized caption linking to the
// chart's page and a fixed-height thumbnail (the charts use height="100%").
// The thumbnail is mounted only while its card is near the viewport: the
// gallery shows dozens of live charts, and each GPU chart holds its own
// WebGPU / WebGL context, which browsers limit (about 16 WebGL contexts).
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
  TextLink,
} from "minerva-design";

/** Responsive grid: as many 240 px columns as fit, one on narrow screens */
export function GalleryGrid({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

/** `true` while the element is within 400 px of the viewport */
function useNearViewport() {
  const ref = useRef<HTMLDivElement>(null);
  // without IntersectionObserver (old browsers, tests) everything is mounted
  const [near, setNear] = useState(
    () => typeof IntersectionObserver !== "function",
  );
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver !== "function") return;
    const observer = new IntersectionObserver(
      (entries) => setNear(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: "400px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, near] as const;
}

export function GalleryCard({
  title,
  page,
  component,
  description,
  children,
}: {
  /** Localized name of the chart type */
  title: string;
  /** Id of the docs page (its route) */
  page: string;
  /** Component name, shown in code style */
  component: string;
  /** Localized use case */
  description: string;
  /** The chart, with height="100%" */
  children: ReactNode;
}) {
  const [ref, near] = useNearViewport();
  return (
    <Card padding="small" style={{ minWidth: 0 }}>
      <CardHeader>
        <CardTitle>
          <TextLink asChild>
            <Link to={`/${page}`}>{title}</Link>
          </TextLink>
        </CardTitle>
        <CardDescription>
          <code>{component}</code> · {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={ref} style={{ height: 180, minWidth: 0 }}>
          {near ? (
            children
          ) : (
            <Skeleton variant="rounded" decorative width="100%" height="100%" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

```

## Example: Gallery: parts of a whole, hierarchies and flows

Browser shares in a pie, users per plan in a donut with the total, a vendor radar, a sign-up funnel, a priority quadrant, a budget treemap, a headcount sunburst and a Sankey diagram from traffic sources to sign-ups.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-router

Documentation context imports: none

### apps/docs/src/docs/pages/charts/demos/gallery-relations.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  DonutChart,
  FunnelChart,
  PieChart,
  QuadrantChart,
  RadarChart,
  SankeyChart,
  SunburstChart,
  TreemapChart,
  type QuadrantPoint,
  type QuadrantRegions,
  type RadarIndicator,
  type RadarSeries,
  type SankeyLink,
  type SankeyNode,
  type ShapeDatum,
  type TreemapNode,
} from "minerva-design/charts";
import { GalleryCard, GalleryGrid } from "../gallery-card";

const browsers: ShapeDatum[] = [
  { name: "Chrome", value: 64 },
  { name: "Safari", value: 19 },
  { name: "Edge", value: 9 },
  { name: "Firefox", value: 8 },
];

type Unit = [key: string, headcount: number | Unit[]];
// headcount per department and team
const org: Unit[] = [
  [
    "engineering",
    [
      ["platform", 18],
      ["web", 24],
      ["mobile", 16],
    ],
  ],
  [
    "sales",
    [
      ["emea", 22],
      ["americas", 31],
    ],
  ],
  [
    "operations",
    [
      ["support", 26],
      ["finance", 8],
    ],
  ],
];

// visits from each source to the site, then sign-ups or exits (thousands)
const flowNodes = ["search", "social", "email", "site", "signedUp", "left"];
const flowLinks: SankeyLink[] = [
  { source: 0, target: 3, value: 52 },
  { source: 1, target: 3, value: 31 },
  { source: 2, target: 3, value: 17 },
  { source: 3, target: 4, value: 23 },
  { source: 3, target: 5, value: 77 },
];

export default function GalleryRelationsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    const compact = new Intl.NumberFormat(locale, { notation: "compact" });
    const percent = new Intl.NumberFormat(locale, { style: "percent" });
    return {
      number: (value: number) => number.format(value),
      compact: (value: number) => compact.format(value),
      percent: (share: number) => percent.format(share),
      // values given in percent (64 = 64%)
      percentOf100: (value: number) => percent.format(value / 100),
    };
  }, [locale]);

  const data = useMemo(() => {
    const plans: ShapeDatum[] = [
      { name: t("plans.free"), value: 5400 },
      { name: t("plans.pro"), value: 2100 },
      { name: t("plans.team"), value: 860 },
    ];
    const criteria: RadarIndicator[] = [
      "speed",
      "quality",
      "cost",
      "support",
      "scale",
    ].map((key) => ({ name: t(`criteria.${key}`), max: 10 }));
    const vendors: RadarSeries[] = [
      { name: t("vendor", { name: "A" }), values: [8, 6, 7, 5, 9] },
      { name: t("vendor", { name: "B" }), values: [5, 9, 6, 8, 6] },
    ];
    const stages: ShapeDatum[] = [
      { name: t("stages.visited"), value: 12000 },
      { name: t("stages.signedUp"), value: 4800 },
      { name: t("stages.activated"), value: 2600 },
      { name: t("stages.paid"), value: 900 },
    ];
    const tasks: QuadrantPoint[] = [
      { x: 8, y: 8.5, label: t("tasks.release") },
      { x: 3, y: 7.5, label: t("tasks.roadmap") },
      { x: 7, y: 3, label: t("tasks.emails") },
      { x: 2, y: 2, label: t("tasks.cleanup") },
    ];
    const regions: QuadrantRegions = {
      topLeft: { label: t("quadrants.plan") },
      topRight: { label: t("quadrants.doFirst") },
      bottomLeft: { label: t("quadrants.drop") },
      bottomRight: { label: t("quadrants.delegate") },
    };
    const budget: TreemapNode[] = [
      {
        name: t("budget.product"),
        children: [
          { name: t("budget.design"), value: 18 },
          { name: t("budget.engineering"), value: 42 },
        ],
      },
      {
        name: t("budget.goToMarket"),
        children: [
          { name: t("budget.sales"), value: 24 },
          { name: t("budget.marketing"), value: 16 },
        ],
      },
    ];
    const toNodes = (units: Unit[]): TreemapNode[] =>
      units.map(([key, size]) =>
        typeof size === "number"
          ? { name: t(`org.${key}`), value: size }
          : { name: t(`org.${key}`), children: toNodes(size) },
      );
    const nodes: SankeyNode[] = flowNodes.map((key) => ({
      name: t(`flow.${key}`),
    }));
    return {
      plans,
      criteria,
      vendors,
      stages,
      tasks,
      regions,
      budget,
      org: toNodes(org),
      nodes,
    };
  }, [t]);

  const people = useMemo(() => (value: number) => t("people", { value }), [t]);
  const thousands = useMemo(
    () => (value: number) => formats.compact(value * 1000),
    [formats],
  );

  return (
    <GalleryGrid>
      <GalleryCard
        title={t("cards.pie.title")}
        component="PieChart"
        page="pie-chart"
        description={t("cards.pie.description")}
      >
        <PieChart
          data={browsers}
          height="100%"
          legend={false}
          format={formats.percentOf100}
          percentFormat={formats.percent}
          ariaLabel={t("cards.pie.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.donut.title")}
        component="DonutChart"
        page="pie-chart"
        description={t("cards.donut.description")}
      >
        <DonutChart
          data={data.plans}
          height="100%"
          labels="none"
          centerValue={formats.compact(8360)}
          centerLabel={t("users")}
          legend={{ position: "bottom" }}
          format={formats.number}
          percentFormat={formats.percent}
          ariaLabel={t("cards.donut.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.radar.title")}
        component="RadarChart"
        page="radar-chart"
        description={t("cards.radar.description")}
      >
        <RadarChart
          indicators={data.criteria}
          series={data.vendors}
          height="100%"
          legend={false}
          format={formats.number}
          ariaLabel={t("cards.radar.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.funnel.title")}
        component="FunnelChart"
        page="funnel-chart"
        description={t("cards.funnel.description")}
      >
        <FunnelChart
          data={data.stages}
          height="100%"
          legend={false}
          format={formats.compact}
          percentFormat={formats.percent}
          ariaLabel={t("cards.funnel.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.quadrant.title")}
        component="QuadrantChart"
        page="quadrant-chart"
        description={t("cards.quadrant.description")}
      >
        <QuadrantChart
          points={data.tasks}
          quadrants={data.regions}
          showTicks={false}
          xLabel={t("urgency")}
          yLabel={t("importance")}
          height="100%"
          ariaLabel={t("cards.quadrant.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.treemap.title")}
        component="TreemapChart"
        page="treemap-chart"
        description={t("cards.treemap.description")}
      >
        <TreemapChart
          data={data.budget}
          height="100%"
          format={formats.percentOf100}
          percentFormat={formats.percent}
          ariaLabel={t("cards.treemap.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.sunburst.title")}
        component="SunburstChart"
        page="sunburst-chart"
        description={t("cards.sunburst.description")}
      >
        <SunburstChart
          data={data.org}
          innerRadius={0.3}
          format={people}
          percentFormat={formats.percent}
          height="100%"
          ariaLabel={t("cards.sunburst.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.sankey.title")}
        component="SankeyChart"
        page="sankey-chart"
        description={t("cards.sankey.description")}
      >
        <SankeyChart
          nodes={data.nodes}
          links={flowLinks}
          format={thousands}
          linkColor="source"
          nodeWidth={8}
          height="100%"
          ariaLabel={t("cards.sankey.aria")}
        />
      </GalleryCard>
    </GalleryGrid>
  );
}

```

### apps/docs/src/docs/pages/charts/gallery-card.tsx

```tsx
// Cards of the chart gallery demos: a localized caption linking to the
// chart's page and a fixed-height thumbnail (the charts use height="100%").
// The thumbnail is mounted only while its card is near the viewport: the
// gallery shows dozens of live charts, and each GPU chart holds its own
// WebGPU / WebGL context, which browsers limit (about 16 WebGL contexts).
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
  TextLink,
} from "minerva-design";

/** Responsive grid: as many 240 px columns as fit, one on narrow screens */
export function GalleryGrid({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

/** `true` while the element is within 400 px of the viewport */
function useNearViewport() {
  const ref = useRef<HTMLDivElement>(null);
  // without IntersectionObserver (old browsers, tests) everything is mounted
  const [near, setNear] = useState(
    () => typeof IntersectionObserver !== "function",
  );
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver !== "function") return;
    const observer = new IntersectionObserver(
      (entries) => setNear(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: "400px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, near] as const;
}

export function GalleryCard({
  title,
  page,
  component,
  description,
  children,
}: {
  /** Localized name of the chart type */
  title: string;
  /** Id of the docs page (its route) */
  page: string;
  /** Component name, shown in code style */
  component: string;
  /** Localized use case */
  description: string;
  /** The chart, with height="100%" */
  children: ReactNode;
}) {
  const [ref, near] = useNearViewport();
  return (
    <Card padding="small" style={{ minWidth: 0 }}>
      <CardHeader>
        <CardTitle>
          <TextLink asChild>
            <Link to={`/${page}`}>{title}</Link>
          </TextLink>
        </CardTitle>
        <CardDescription>
          <code>{component}</code> · {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={ref} style={{ height: 180, minWidth: 0 }}>
          {near ? (
            children
          ) : (
            <Skeleton variant="rounded" decorative width="100%" height="100%" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

```

## Example: Gallery: statistics, KPIs and planning

A latency histogram, box plots per service, a revenue bridge waterfall, a weekly load heatmap, a commit calendar, a gauge with bands, bullet KPIs against their targets, progress rings and a release Gantt chart.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-router

Documentation context imports: none

### apps/docs/src/docs/pages/charts/demos/gallery-statistics.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  BoxPlotChart,
  BulletChart,
  CalendarHeatmap,
  GanttChart,
  GaugeChart,
  HeatmapChart,
  HistogramChart,
  RadialBarChart,
  WaterfallChart,
  type BoxplotGroup,
  type BulletDatum,
  type CalendarDatum,
  type GanttTask,
  type HeatmapCell,
  type RadialBarDatum,
  type WaterfallStep,
} from "minerva-design/charts";
import { GalleryCard, GalleryGrid } from "../gallery-card";

/** Small deterministic pseudo-random generator (same picture on every load) */
const random = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};
/** Log-normal samples around a median (Box-Muller) */
const logNormal = (seed: number, median: number, spread: number, n: number) => {
  const next = random(seed);
  return Float64Array.from({ length: n }, () => {
    const z =
      Math.sqrt(-2 * Math.log(next() || 1e-9)) * Math.cos(2 * Math.PI * next());
    return median * Math.exp(spread * z);
  });
};

// response times (ms) of all the requests, then per service
const latencies = logNormal(1, 60, 0.45, 5000);
const services = [
  ["gateway", 20, 0.35],
  ["search", 90, 0.45],
  ["checkout", 140, 0.38],
  ["images", 60, 0.6],
] as const;
const serviceSamples = services.map(([, median, spread], i) =>
  logNormal(10 + i, median, spread, 400),
);

// annual recurring revenue bridge (M$), from last year to this year
const bridge = [
  ["lastYear", "subtotal"],
  ["newCustomers", 38],
  ["expansion", 17],
  ["churn", -21],
  ["pricing", 9],
  ["thisYear", "total"],
] as const;

// load per weekday (Monday first) and 4-hour slot
const load = (() => {
  const next = random(3);
  return Array.from({ length: 7 }, (_, d) =>
    Array.from({ length: 6 }, (_, s) =>
      Math.round((d < 5 ? 40 : 15) + (s >= 2 && s <= 4 ? 40 : 0) + next() * 20),
    ),
  );
})();

// commits per day over 20 weeks (local dates, quiet weekends)
const commits: CalendarDatum[] = (() => {
  const next = random(11);
  const days: CalendarDatum[] = [];
  for (let i = 0; i < 140; i++) {
    const date = new Date(2026, 5, 1 + i);
    const weekend = date.getDay() === 0 || date.getDay() === 6;
    if (next() < (weekend ? 0.2 : 0.85)) {
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      days.push({
        date: `${date.getFullYear()}-${month}-${day}`,
        value: 1 + Math.round(next() * (weekend ? 3 : 9)),
      });
    }
  }
  return days;
})();

const gaugeBands = [
  { to: 60, color: "var(--danger-color)" },
  { to: 85, color: "var(--warning-color)" },
  { to: 100, color: "var(--success-color)" },
];

// quarter-to-date KPIs: poor / fair / good ranges and the target
const kpis = [
  { key: "revenue", value: 270, target: 250, ranges: [150, 225, 300] },
  { key: "profit", value: 22, target: 26, ranges: [15, 22, 30] },
  { key: "satisfaction", value: 4.6, target: 4.4, ranges: [3.5, 4.2, 5] },
] as const;

// quarterly objectives: progress against each goal
const objectives = [
  ["revenue", 82, 100],
  ["users", 64, 100],
  ["retention", 91, 100],
] as const;

// a release plan (local dates)
const plan = [
  ["research", 1, 6, 1],
  ["design", 5, 13, 1],
  ["build", 10, 27, 0.6],
  ["test", 22, 31, 0.2],
] as const;
const today = new Date(2026, 10, 18);

export default function GalleryStatisticsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    const ms = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
      maximumFractionDigits: 0,
    });
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    const percent = new Intl.NumberFormat(locale, { style: "percent" });
    return {
      number: (value: number) => number.format(Math.round(value)),
      ms: (value: number) => ms.format(value),
      // values in millions of dollars
      millions: (value: number) => usd.format(value * 1e6),
      percent: (share: number) => percent.format(share),
    };
  }, [locale]);

  const data = useMemo(() => {
    const groups: BoxplotGroup[] = services.map(([key], i) => ({
      x: t(`services.${key}`),
      values: serviceSamples[i],
    }));
    const steps: WaterfallStep[] = bridge.map(([key, value]) =>
      typeof value === "number"
        ? { label: t(`bridge.${key}`), value }
        : { label: t(`bridge.${key}`), kind: value },
    );
    const dayFormat = new Intl.DateTimeFormat(locale, { weekday: "short" });
    // 5 January 2026 is a Monday
    const days = load.map((_, d) => dayFormat.format(new Date(2026, 0, 5 + d)));
    const hourFormat = new Intl.DateTimeFormat(locale, { hour: "numeric" });
    const slots = load[0].map((_, s) =>
      hourFormat.format(new Date(2026, 0, 5, s * 4)),
    );
    const cells: HeatmapCell[] = days.flatMap((day, d) =>
      slots.map((slot, s) => ({ x: day, y: slot, value: load[d][s] })),
    );
    const bullets: BulletDatum[] = kpis.map(({ key, ...kpi }) => ({
      name: t(`kpis.${key}`),
      ...kpi,
      ranges: [...kpi.ranges],
    }));
    const rings: RadialBarDatum[] = objectives.map(([key, value, max]) => ({
      name: t(`objectives.${key}`),
      value,
      max,
    }));
    const tasks: GanttTask[] = plan.map(([key, start, end, progress]) => ({
      name: t(`plan.${key}`),
      start: new Date(2026, 10, start),
      end: new Date(2026, 10, end),
      progress,
    }));
    return { groups, steps, days, slots, cells, bullets, rings, tasks };
  }, [t, locale]);

  const rangeLabels = useMemo(
    () => [t("ranges.poor"), t("ranges.fair"), t("ranges.good")],
    [t],
  );
  const boxLabels = useMemo(
    () => ({
      max: t("stats.max"),
      q3: t("stats.q3"),
      median: t("stats.median"),
      q1: t("stats.q1"),
      min: t("stats.min"),
      outliers: t("stats.outliers"),
    }),
    [t],
  );

  return (
    <GalleryGrid>
      <GalleryCard
        title={t("cards.histogram.title")}
        component="HistogramChart"
        page="histogram-chart"
        description={t("cards.histogram.description")}
      >
        <HistogramChart
          values={latencies}
          domain={[0, 200]}
          bins={40}
          name={t("requests")}
          formatBin={formats.ms}
          xAxis={{ format: formats.ms }}
          yAxis={{ format: formats.number }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.histogram.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.boxplot.title")}
        component="BoxPlotChart"
        page="boxplot-chart"
        description={t("cards.boxplot.description")}
      >
        <BoxPlotChart
          groups={data.groups}
          name={t("responseTime")}
          yAxis={{ format: formats.ms }}
          tooltip={{ labels: boxLabels }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.boxplot.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.waterfall.title")}
        component="WaterfallChart"
        page="waterfall-chart"
        description={t("cards.waterfall.description")}
      >
        <WaterfallChart
          steps={data.steps}
          start={120}
          name={t("amount")}
          format={formats.millions}
          yAxis={{ format: formats.millions }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.waterfall.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.heatmap.title")}
        component="HeatmapChart"
        page="heatmap-chart"
        description={t("cards.heatmap.description")}
      >
        <HeatmapChart
          data={data.cells}
          xCategories={data.days}
          yCategories={data.slots}
          name={t("load")}
          radius={2}
          height="100%"
          ariaLabel={t("cards.heatmap.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.calendar.title")}
        component="CalendarHeatmap"
        page="calendar-heatmap"
        description={t("cards.calendar.description")}
      >
        <CalendarHeatmap
          data={commits}
          range={["2026-06-01", "2026-10-18"]}
          locale={locale}
          format={formats.number}
          height="100%"
          ariaLabel={t("cards.calendar.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.gauge.title")}
        component="GaugeChart"
        page="gauge-chart"
        description={t("cards.gauge.description")}
      >
        <GaugeChart
          value={78}
          label={t("uptimeScore")}
          bands={gaugeBands}
          format={formats.number}
          tooltip={false}
          height="100%"
          ariaLabel={t("uptimeScore")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.bullet.title")}
        component="BulletChart"
        page="bullet-chart"
        description={t("cards.bullet.description")}
      >
        <BulletChart
          data={data.bullets}
          rangeLabels={rangeLabels}
          percentFormat={formats.percent}
          height="100%"
          ariaLabel={t("cards.bullet.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.radialBar.title")}
        component="RadialBarChart"
        page="radial-bar-chart"
        description={t("cards.radialBar.description")}
      >
        <RadialBarChart
          data={data.rings}
          sweep={270}
          innerRadius={0.3}
          percentFormat={formats.percent}
          legend={false}
          height="100%"
          ariaLabel={t("cards.radialBar.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.gantt.title")}
        component="GanttChart"
        page="gantt-chart"
        description={t("cards.gantt.description")}
      >
        <GanttChart
          tasks={data.tasks}
          today={today}
          todayLabel={t("today")}
          taskName={t("taskName")}
          progressName={t("progress")}
          height="100%"
          legend={false}
          ariaLabel={t("cards.gantt.aria")}
        />
      </GalleryCard>
    </GalleryGrid>
  );
}

```

### apps/docs/src/docs/pages/charts/gallery-card.tsx

```tsx
// Cards of the chart gallery demos: a localized caption linking to the
// chart's page and a fixed-height thumbnail (the charts use height="100%").
// The thumbnail is mounted only while its card is near the viewport: the
// gallery shows dozens of live charts, and each GPU chart holds its own
// WebGPU / WebGL context, which browsers limit (about 16 WebGL contexts).
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
  TextLink,
} from "minerva-design";

/** Responsive grid: as many 240 px columns as fit, one on narrow screens */
export function GalleryGrid({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

/** `true` while the element is within 400 px of the viewport */
function useNearViewport() {
  const ref = useRef<HTMLDivElement>(null);
  // without IntersectionObserver (old browsers, tests) everything is mounted
  const [near, setNear] = useState(
    () => typeof IntersectionObserver !== "function",
  );
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver !== "function") return;
    const observer = new IntersectionObserver(
      (entries) => setNear(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: "400px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, near] as const;
}

export function GalleryCard({
  title,
  page,
  component,
  description,
  children,
}: {
  /** Localized name of the chart type */
  title: string;
  /** Id of the docs page (its route) */
  page: string;
  /** Component name, shown in code style */
  component: string;
  /** Localized use case */
  description: string;
  /** The chart, with height="100%" */
  children: ReactNode;
}) {
  const [ref, near] = useNearViewport();
  return (
    <Card padding="small" style={{ minWidth: 0 }}>
      <CardHeader>
        <CardTitle>
          <TextLink asChild>
            <Link to={`/${page}`}>{title}</Link>
          </TextLink>
        </CardTitle>
        <CardDescription>
          <code>{component}</code> · {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={ref} style={{ height: 180, minWidth: 0 }}>
          {near ? (
            children
          ) : (
            <Skeleton variant="rounded" decorative width="100%" height="100%" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

```

## Example: Gallery: basic 2D charts

Line, stacked area, monthly temperature range, bars with value labels, a horizontal ranking, revenue bars with a growth line on a second axis, scatter, campaign bubbles sized by reach and KPI sparklines. Each caption links to the chart's page; hover the charts for their tooltips.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-router

Documentation context imports: none

### apps/docs/src/docs/pages/charts/demos/gallery.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  AreaChart,
  BarChart,
  BubbleChart,
  HorizontalBarChart,
  LineChart,
  MixedChart,
  RangeAreaChart,
  ScatterChart,
  Sparkline,
  type ChartSeries,
} from "minerva-design/charts";
import { GalleryCard, GalleryGrid } from "../gallery-card";

// The numbers live at module level; the names are translated in the
// component (memoized, so the charts only update when the language changes)

/** Small deterministic pseudo-random generator (same picture on every load) */
const random = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const visits = [32, 41, 38, 52, 49, 61, 66, 72];
const signups = [12, 15, 19, 18, 24, 27, 26, 34];
const platforms = {
  web: [20, 24, 22, 30, 34, 31, 38, 42],
  ios: [12, 14, 18, 17, 20, 24, 23, 27],
  android: [8, 11, 10, 14, 16, 15, 19, 22],
};
// average daily low and high of each month (°C)
const lows = [-1, 0, 3, 6, 10, 13, 15, 15, 12, 8, 4, 1];
const highs = [5, 7, 12, 16, 20, 24, 26, 26, 21, 16, 10, 6];
const orders = [128, 164, 212, 187];
// share of developers using each language (%)
const languages: [string, number][] = [
  ["JavaScript", 62],
  ["Python", 51],
  ["TypeScript", 43],
  ["Java", 30],
  ["Go", 18],
];
// quarterly revenue (M$) and growth over the previous quarter
const quarterRevenue = [18, 21, 24, 31];
const growth = [0.04, 0.17, 0.14, 0.29];

const scatterGroups = (() => {
  const next = random(7);
  const group = (cx: number, cy: number) =>
    Array.from({ length: 40 }, () => ({
      x: cx + (next() - 0.5) * 30,
      y: cy + (next() - 0.5) * 30,
    }));
  return [group(35, 60), group(65, 35)];
})();

// marketing campaigns: cost (k$), sign-ups and reach (people)
const campaigns = {
  email: [
    [4, 320, 12_000],
    [6, 410, 18_000],
    [9, 380, 15_000],
  ],
  social: [
    [12, 520, 90_000],
    [18, 760, 140_000],
    [25, 690, 210_000],
  ],
} as const;

const revenueTrend = [18, 22, 19, 26, 24, 31, 29, 35, 33, 41, 38, 46];
const errorTrend = [9, 7, 8, 5, 6, 4, 5, 3, 4, 2, 3, 2];

export default function GalleryDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const formats = useMemo(() => {
    const number = new Intl.NumberFormat(locale);
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 0,
    });
    const celsius = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
    });
    return {
      number: (value: number) => number.format(value),
      // values in millions of dollars
      millions: (value: number) => usd.format(value * 1e6),
      thousands: (value: number) => usd.format(value * 1e3),
      percent: (value: number) => percent.format(value),
      // values given in percent (62 = 62%)
      percentOf100: (value: number) => percent.format(value / 100),
      celsius: (value: number) => celsius.format(value),
    };
  }, [locale]);

  const data = useMemo(() => {
    // "Jan", "janv.", "1月"...
    const monthFormat = new Intl.DateTimeFormat(locale, { month: "short" });
    const months = lows.map((_, m) => monthFormat.format(new Date(2026, m, 1)));
    const pairs = (values: readonly number[]) =>
      values.map((value, i) => [months[i], value] as const);
    const quarters = quarterRevenue.map((_, i) => t("quarter", { n: i + 1 }));

    const line: ChartSeries[] = [
      { name: t("visits"), data: pairs(visits) },
      { name: t("signups"), data: pairs(signups) },
    ];
    const area: ChartSeries[] = [
      { name: t("web"), data: pairs(platforms.web) },
      { name: "iOS", data: pairs(platforms.ios) },
      { name: "Android", data: pairs(platforms.android) },
    ];
    const rangeArea: ChartSeries[] = [
      {
        name: t("temperature"),
        format: formats.celsius,
        data: months.map((x, i) => ({ x, y0: lows[i], y: highs[i] })),
      },
    ];
    const bar: ChartSeries[] = [
      {
        name: t("orders"),
        data: orders.map((y, i) => ({
          x: quarters[i],
          y,
          color: i === 2 ? "var(--success-color)" : undefined,
        })),
      },
    ];
    const horizontalBar: ChartSeries[] = [
      { name: t("developers"), format: formats.percentOf100, data: languages },
    ];
    const mixed: ChartSeries[] = [
      {
        name: t("revenue"),
        type: "bar",
        format: formats.millions,
        data: quarters.map((q, i) => [q, quarterRevenue[i]] as const),
      },
      {
        name: t("growth"),
        type: "line",
        yAxis: "right",
        format: formats.percent,
        color: "var(--chart-series-3, #f59e0b)",
        data: quarters.map((q, i) => [q, growth[i]] as const),
      },
    ];
    const scatter: ChartSeries[] = scatterGroups.map((group, i) => ({
      name: t("team", { name: i === 0 ? "A" : "B" }),
      data: group,
    }));
    const bubble: ChartSeries[] = (["email", "social"] as const).map(
      (channel) => ({
        name: t(`channels.${channel}`),
        valueName: t("reach"),
        format: (value: number) => formats.number(value),
        data: campaigns[channel].map(([x, y, value]) => ({ x, y, value })),
      }),
    );
    return {
      line,
      area,
      rangeArea,
      bar,
      horizontalBar,
      mixed,
      scatter,
      bubble,
    };
  }, [t, locale, formats]);

  return (
    <GalleryGrid>
      <GalleryCard
        title={t("cards.line.title")}
        component="LineChart"
        page="line-chart"
        description={t("cards.line.description")}
      >
        <LineChart
          series={data.line}
          height="100%"
          legend={false}
          ariaLabel={t("cards.line.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.area.title")}
        component="AreaChart"
        page="area-chart"
        description={t("cards.area.description")}
      >
        <AreaChart
          series={data.area}
          stacked
          height="100%"
          legend={false}
          ariaLabel={t("cards.area.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.rangeArea.title")}
        component="RangeAreaChart"
        page="range-area-chart"
        description={t("cards.rangeArea.description")}
      >
        <RangeAreaChart
          series={data.rangeArea}
          yAxis={{ format: formats.celsius }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.rangeArea.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.bar.title")}
        component="BarChart"
        page="bar-chart"
        description={t("cards.bar.description")}
      >
        <BarChart
          series={data.bar}
          labels
          yAxis={{ format: formats.number }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.bar.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.horizontalBar.title")}
        component="HorizontalBarChart"
        page="horizontal-bar-chart"
        description={t("cards.horizontalBar.description")}
      >
        <HorizontalBarChart
          series={data.horizontalBar}
          labels
          yAxis={{ format: formats.percentOf100 }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.horizontalBar.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.mixed.title")}
        component="MixedChart"
        page="mixed-chart"
        description={t("cards.mixed.description")}
      >
        <MixedChart
          series={data.mixed}
          yAxis={{ format: formats.millions }}
          yAxis2={{ format: formats.percent }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.mixed.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.scatter.title")}
        component="ScatterChart"
        page="scatter-chart"
        description={t("cards.scatter.description")}
      >
        <ScatterChart
          series={data.scatter}
          height="100%"
          legend={false}
          ariaLabel={t("cards.scatter.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.bubble.title")}
        component="BubbleChart"
        page="bubble-chart"
        description={t("cards.bubble.description")}
      >
        <BubbleChart
          series={data.bubble}
          maxSize={36}
          xAxis={{ format: formats.thousands }}
          yAxis={{ format: formats.number }}
          height="100%"
          legend={false}
          ariaLabel={t("cards.bubble.aria")}
        />
      </GalleryCard>

      <GalleryCard
        title={t("cards.sparkline.title")}
        component="Sparkline"
        page="sparkline"
        description={t("cards.sparkline.description")}
      >
        <div style={{ display: "grid", gap: 12 }}>
          <div>
            <strong style={{ fontSize: 22 }}>{formats.thousands(46)}</strong>{" "}
            {t("revenueLabel")}
            <Sparkline
              data={revenueTrend}
              type="area"
              reference={30}
              name={t("revenueLabel")}
              format={formats.thousands}
              ariaLabel={t("revenueTrendAria")}
            />
          </div>
          <div>
            <strong style={{ fontSize: 22 }}>{formats.number(2)}</strong>{" "}
            {t("errorsLabel")}
            <Sparkline
              data={errorTrend}
              type="bar"
              name={t("errorsLabel")}
              color="var(--danger-color)"
              ariaLabel={t("errorsTrendAria")}
            />
          </div>
        </div>
      </GalleryCard>
    </GalleryGrid>
  );
}

```

### apps/docs/src/docs/pages/charts/gallery-card.tsx

```tsx
// Cards of the chart gallery demos: a localized caption linking to the
// chart's page and a fixed-height thumbnail (the charts use height="100%").
// The thumbnail is mounted only while its card is near the viewport: the
// gallery shows dozens of live charts, and each GPU chart holds its own
// WebGPU / WebGL context, which browsers limit (about 16 WebGL contexts).
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
  TextLink,
} from "minerva-design";

/** Responsive grid: as many 240 px columns as fit, one on narrow screens */
export function GalleryGrid({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

/** `true` while the element is within 400 px of the viewport */
function useNearViewport() {
  const ref = useRef<HTMLDivElement>(null);
  // without IntersectionObserver (old browsers, tests) everything is mounted
  const [near, setNear] = useState(
    () => typeof IntersectionObserver !== "function",
  );
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver !== "function") return;
    const observer = new IntersectionObserver(
      (entries) => setNear(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: "400px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, near] as const;
}

export function GalleryCard({
  title,
  page,
  component,
  description,
  children,
}: {
  /** Localized name of the chart type */
  title: string;
  /** Id of the docs page (its route) */
  page: string;
  /** Component name, shown in code style */
  component: string;
  /** Localized use case */
  description: string;
  /** The chart, with height="100%" */
  children: ReactNode;
}) {
  const [ref, near] = useNearViewport();
  return (
    <Card padding="small" style={{ minWidth: 0 }}>
      <CardHeader>
        <CardTitle>
          <TextLink asChild>
            <Link to={`/${page}`}>{title}</Link>
          </TextLink>
        </CardTitle>
        <CardDescription>
          <code>{component}</code> · {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={ref} style={{ height: 180, minWidth: 0 }}>
          {near ? (
            children
          ) : (
            <Skeleton variant="rounded" decorative width="100%" height="100%" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

```

## Example: Mixed series

Each series sets its own type: bars and a line share the category axis, with a legend at the bottom.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/charts/demos/mixed.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Chart, type ChartSeries } from "minerva-design/charts";

// Thousand USD per month, January to December
const revenue = [42, 48, 51, 47, 58, 63, 61, 70, 74, 69, 81, 92];
const target = [45, 47, 50, 53, 56, 59, 62, 65, 68, 71, 74, 77];

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function MixedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    return [
      {
        name: t("revenue"),
        type: "bar",
        data: months.map((month, i) => [month, revenue[i]] as const),
      },
      {
        name: t("target"),
        type: "line",
        data: months.map((month, i) => [month, target[i]] as const),
      },
    ];
  }, [t, locale]);
  // "$92K", "9.2万 US$"...
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <Chart
      series={series}
      yAxis={{ format: usd }}
      legend={{ position: "bottom" }}
      height={300}
      ariaLabel={t("revenueAria")}
    />
  );
}

```

## Example: Palettes

palette replaces the series colors of any chart, GPU or shape: the theme colors, a colorblind-safe set (Okabe-Ito), a sequential blue ramp or warm tones. Leave it unset to follow --chart-series-1..8.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/charts/demos/palette.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  BarChart,
  DonutChart,
  type ChartSeries,
  type ShapeDatum,
} from "minerva-design/charts";

// Palettes: undefined = the theme (--chart-series-1..8, then theme colors)
const PALETTES = {
  theme: undefined,
  // Okabe-Ito: distinguishable with the common color vision deficiencies
  colorblind: ["#0072B2", "#E69F00", "#009E73", "#CC79A7", "#56B4E9"],
  blues: ["#08306b", "#2171b5", "#4292c6", "#6baed6", "#9ecae1"],
  warm: ["#7f1d1d", "#c2410c", "#f59e0b", "#facc15", "#fde68a"],
} as const;
type PaletteName = keyof typeof PALETTES;

// Support requests per quarter by channel
const channels = {
  email: [420, 380, 410, 360],
  chat: [310, 360, 420, 480],
  phone: [180, 170, 150, 140],
  social: [60, 80, 95, 120],
  community: [40, 55, 70, 90],
};
type Channel = keyof typeof channels;

export default function PaletteDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.charts.data",
  });
  const [name, setName] = useState<PaletteName>("colorblind");
  const palette = PALETTES[name];

  const { bars, shares } = useMemo(() => {
    const keys = Object.keys(channels) as Channel[];
    const bars: ChartSeries[] = keys.map((key) => ({
      name: t(`channels.${key}`),
      data: channels[key].map(
        (y, i) => [t("quarter", { n: i + 1 }), y] as const,
      ),
    }));
    const shares: ShapeDatum[] = keys.map((key) => ({
      name: t(`channels.${key}`),
      value: channels[key].reduce((sum, v) => sum + v, 0),
    }));
    return { bars, shares };
  }, [t]);
  const percent = new Intl.NumberFormat(i18n.language, { style: "percent" });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("palette")}
        direction="horizontal"
        value={name}
        onChange={(value) => setName(value as PaletteName)}
      >
        {(Object.keys(PALETTES) as PaletteName[]).map((key) => (
          <Radio key={key} value={key} label={t(`palettes.${key}`)} />
        ))}
      </RadioGroup>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        <BarChart
          series={bars}
          stacked
          palette={palette}
          legend={{ position: "bottom" }}
          height={280}
          ariaLabel={t("requestsAria")}
        />
        <DonutChart
          data={shares}
          palette={palette}
          labels="none"
          legend={{ position: "bottom" }}
          renderTooltip={(slice) => (
            <span>
              {slice.name} · {percent.format(slice.percent)}
            </span>
          )}
          height={280}
          ariaLabel={t("channelsAria")}
        />
      </div>
    </div>
  );
}

```

## Example: Renderers

Force a backend with renderer; onRendererChange reports the one actually used (unsupported backends fall back).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/charts/demos/renderers.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  Chart,
  type ChartRendererKind,
  type ChartRendererPreference,
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

const COUNT = 50_000;

export default function RenderersDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.charts.data" });
  const [renderer, setRenderer] = useState<ChartRendererPreference>("auto");
  const [active, setActive] = useState<ChartRendererKind | null>(null);

  const series = useMemo((): ChartSeries[] => {
    const random = mulberry32(7);
    const y = new Float64Array(COUNT);
    let value = 0;
    for (let i = 0; i < COUNT; i++) {
      value += random() - 0.5;
      y[i] = value;
    }
    return [{ name: t("randomWalk"), data: { y } }];
  }, [t]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("renderer")}
        direction="horizontal"
        value={renderer}
        onChange={(value) => setRenderer(value as ChartRendererPreference)}
      >
        <Radio value="auto" label="auto" />
        <Radio value="webgpu" label="webgpu" />
        <Radio value="webgl2" label="webgl2" />
        <Radio value="webgl" label="webgl" />
        <Radio value="canvas2d" label="canvas2d" />
      </RadioGroup>
      <Chart
        series={series}
        renderer={renderer}
        onRendererChange={setActive}
        height={280}
        ariaLabel={t("randomWalkAria")}
      />
      <p role="status">
        {t("rendererStatus", { requested: renderer, active: active ?? "…" })}
      </p>
    </div>
  );
}

```
