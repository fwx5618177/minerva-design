# Charts

GPU-accelerated charts (WebGPU, WebGL2 or WebGL, with a Canvas2D fallback) that stay at 60 fps with millions of points: trends, comparisons, statistics, parts of a whole, hierarchies and flows, networks, dependencies and trees, finance and trading, and 3D. Chart mixes line, area, bar, scatter, candlestick and heatmap series; every other component is a preset for one chart type. Start with the galleries below: a live thumbnail of every chart type, each linking to its page.

Package: minerva-design@1.20.3

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

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
  "specifier": "minerva-design/web-components/chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "options",
    "typeText": "ChartOptions | undefined",
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
    "description": "The hovered (or keyboard-focused) points changed; detail: { x, xLabel, items }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-point-click",
    "typeText": "CustomEvent",
    "description": "A point or a bar was clicked; detail: { x, xLabel, items }"
  },
  {
    "name": "minerva-plot-click",
    "typeText": "CustomEvent",
    "description": "The plot area was clicked where there is no point; detail: { x, y }"
  },
  {
    "name": "minerva-zoom",
    "typeText": "CustomEvent",
    "description": "The user zoomed or panned; detail: { x, y } (the visible ranges)"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend is ready (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## ShapeChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/shape-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "options",
    "typeText": "ShapeChartOptions | undefined",
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

## Example: Engine events

Hover and click a point: the engine events (hover, point click, zoom, renderer) reach the framework with the engine's payload.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/charts/wc/events.html

```html
<div style="display: grid; gap: 8px">
  <minerva-chart id="chart" height="260"></minerva-chart>
  <output id="readout" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/charts/wc/events.ts

```tsx
// The engine events are DOM events: minerva-hover (null when the pointer
// leaves), minerva-point-click, minerva-zoom... with the engine's payload.
import type {
  ChartHoverEvent,
  MinervaChart,
} from "minerva-design/web-components/chart";

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaChart>("#chart")!;
  const readout = root.querySelector<HTMLOutputElement>("#readout")!;
  chart.options = {
    series: [
      { name: text.latency, type: "line", data: [42, 38, 65, 120, 96, 54] },
    ],
    xAxis: { type: "category", categories: text.hours },
    crosshair: true,
  };
  readout.textContent = text.hint;
  const describe = (event: ChartHoverEvent) =>
    `${event.xLabel} · ${event.items[0]?.seriesName}: ${event.items[0]?.y}`;
  const onHover = (event: Event) => {
    const hover = (event as CustomEvent<ChartHoverEvent | null>).detail;
    readout.textContent = hover ? describe(hover) : text.hint;
  };
  const onClick = (event: Event) => {
    const click = (event as CustomEvent<ChartHoverEvent>).detail;
    readout.textContent = `${text.clicked} — ${describe(click)}`;
  };
  chart.addEventListener("minerva-hover", onHover);
  chart.addEventListener("minerva-point-click", onClick);
  return () => {
    chart.removeEventListener("minerva-hover", onHover);
    chart.removeEventListener("minerva-point-click", onClick);
  };
}

```

## Example: Bars and a line

The engine options as one object: series of several types (here bars and a smooth line) on shared category axes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/charts/wc/mixed-series.html

```html
<minerva-chart id="mixed" height="300"></minerva-chart>

```

### apps/docs/src/docs/pages/charts/wc/mixed-series.ts

```tsx
// <minerva-chart> takes the engine options as its `options` property: any
// mix of series types (here bars and a line) on shared axes.
import type { MinervaChart } from "minerva-design/web-components/chart";

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaChart>("#mixed")!;
  chart.options = {
    series: [
      { name: text.revenue, type: "bar", data: [42, 51, 48, 63, 72, 80] },
      {
        name: text.target,
        type: "line",
        curve: "smooth",
        data: [45, 50, 55, 60, 65, 70],
      },
    ],
    xAxis: { type: "category", categories: text.months },
    yAxis: { format: (value) => `${value}k` },
  };
}

```
