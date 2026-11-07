# Charts

GPU-accelerated charts (WebGPU, WebGL2 or WebGL, with a Canvas2D fallback) that stay at 60 fps with millions of points: trends, comparisons, statistics, parts of a whole, hierarchies and flows, networks, dependencies and trees, finance and trading, and 3D. Chart mixes line, area, bar, scatter, candlestick and heatmap series; every other component is a preset for one chart type. Start with the galleries below: a live thumbnail of every chart type, each linking to its page.

Package: minerva-design@1.22.2

Renderer: taro

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

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

Cartesian charts drawn on a Canvas 2D node by the DOM-free engine (minerva-design/charts presets): the web component props mapped to the same engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset, H5 mouse hover; ref exposes resetZoom/getView/setView/getInstance/resize. No WebGPU / WebGL renderer (one Canvas 2D path), no keyboard navigation and no React tooltip content: tooltip.render may only return text. QuadrantChart accessible points: a visually hidden list of the points (role / aria-role, aria-label with name, quadrant and values; a tap is onPointClick) with 'Move to …' buttons calling onPointDrop with the center of the neighbouring quadrant. Mini-program views take no keyboard focus, so there is no focus ring nor Shift + arrow moves, and no live region: the move is announced (role=status) on H5 only. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "source": "packages/taro/src/charts.tsx",
    "kind": "array",
    "typeText": "readonly ChartSeries[]",
    "typeRef": "type:deda0bcb88251b63a5de",
    "required": true,
    "description": "Data series; each sets its own `type`"
  },
  {
    "name": "yAxis2",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Right value axis of the series with `yAxis: \"right\"` (dual axis charts)"
  },
  {
    "name": "stackMode",
    "source": "packages/taro/src/charts.tsx",
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
    "name": "orientation",
    "source": "packages/taro/src/charts.tsx",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "ChartOrientation | undefined",
    "typeRef": "type:872af3679a2d7fcf3d26",
    "default": "vertical",
    "required": false,
    "description": "`horizontal` puts the x axis (categories) down the left side"
  },
  {
    "name": "height",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "xAxis",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "X axis"
  },
  {
    "name": "yAxis",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Y axis"
  },
  {
    "name": "legend",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name (tap toggles a series)"
  },
  {
    "name": "tooltip",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "crosshair",
    "source": "packages/taro/src/charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the finger"
  },
  {
    "name": "annotations",
    "source": "packages/taro/src/charts.tsx",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas and reference lines"
  },
  {
    "name": "interaction",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Pinch zoom, pan (drag when zoomed) and double-tap reset; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/taro/src/charts.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes). Mini-programs have no `<html lang>`: pass the app language"
  },
  {
    "name": "labels",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "disableScroll",
    "source": "packages/taro/src/charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Keeps the page from scrolling while a finger moves on the chart (needed to pan a zoomed chart or drag points)"
  },
  {
    "name": "id",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the `<Canvas>` (generated by default)"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:980cbee566a575ab834d",
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
    "description": "Called when the touched (or hovered) points change"
  },
  {
    "name": "onPointClick",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent) => void) | undefined",
    "typeRef": "type:054b6d565969c517cbb1",
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
    "description": "Called when a point (or bar) is tapped"
  },
  {
    "name": "onPlotClick",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((event: ChartPlotClickEvent) => void) | undefined",
    "typeRef": "type:02c2f014ba9839a6e936",
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
    "description": "Called when the plot area is tapped where there is no point"
  },
  {
    "name": "onZoom",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:6871f590139907a5872c",
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
  }
]
```

## ShapeChart

Support: beta

Shape charts drawn on a Canvas 2D node by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, entry / update animations, sunburst drill-down with onDrill, and a generic ShapeChart taking any shape type's options. No keyboard navigation and no React tooltip content: tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "name": "options",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "union",
    "typeText": "ShapeChartOptions",
    "typeRef": "type:54137e999ba8be2bca01",
    "required": true,
    "description": "Options of the chart, by `type` (every shape type of the engine)"
  },
  {
    "name": "height",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "disableScroll",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Keeps the page from scrolling while a finger moves on the chart"
  },
  {
    "name": "id",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the `<Canvas>` (generated by default)"
  }
]
```

### events

```json
[
  {
    "name": "onDrill",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "function",
    "typeText": "((event: ShapeDrillEvent) => void) | undefined",
    "typeRef": "type:db725d51ab265e055e94",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeDrillEvent",
        "typeRef": "type:2f6344534a4b788a1925"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a sunburst drills into a parent or back up"
  },
  {
    "name": "onHover",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:348e97229a786720de93",
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
    "description": "Called when the highlighted mark changes (tap, or the mouse on H5)"
  },
  {
    "name": "onClick",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:2f0a619712ca66b7ac75",
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
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:5e77e83d29468fb39c06",
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
