# Sparkline

A word-sized chart without axes or legend that shows the shape of a trend next to a number: in KPI cards, table cells or lists. Hover it to read a value.

Package: minerva-design@1.20.6

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/sparkline",
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
    "name": "type",
    "typeText": "\"line\" | \"area\" | \"bar\"",
    "attribute": "type",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "attribute": "color",
    "required": false
  },
  {
    "name": "curve",
    "typeText": "\"linear\" | \"smooth\" | \"step\"",
    "attribute": "curve",
    "required": false
  },
  {
    "name": "reference",
    "typeText": "number | undefined",
    "attribute": "reference",
    "required": false
  },
  {
    "name": "valueName",
    "typeText": "string | undefined",
    "attribute": "value-name",
    "required": false
  },
  {
    "name": "data",
    "typeText": "ChartSeries[\"data\"] | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "(value: number) => string | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "ChartBaseOptions | undefined",
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: KPI cards

Word-sized trends under key figures, drawn as a line, an area and bars.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/wc/kpi.html

```html
<div
  style="
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
  "
>
  <div style="display: grid; gap: 4px">
    <span id="orders-label"></span>
    <strong>1,284</strong>
    <minerva-sparkline id="orders"></minerva-sparkline>
  </div>
  <div style="display: grid; gap: 4px">
    <span id="revenue-label"></span>
    <strong>€48.2k</strong>
    <minerva-sparkline id="revenue" type="area"></minerva-sparkline>
  </div>
  <div style="display: grid; gap: 4px">
    <span id="signups-label"></span>
    <strong>312</strong>
    <minerva-sparkline id="signups" type="bar"></minerva-sparkline>
  </div>
</div>

```

### apps/docs/src/docs/pages/sparkline/wc/kpi.ts

```tsx
// Word-sized trends (48px high by default) drawn as a line, an area or bars.
import type { MinervaSparkline } from "minerva-design/web-components/chart";

const TEXT = {
  en: { orders: "Orders", revenue: "Revenue", signups: "Sign-ups" },
  zh: { orders: "订单", revenue: "收入", signups: "注册" },
  ja: { orders: "注文", revenue: "売上", signups: "登録" },
  fr: {
    orders: "Commandes",
    revenue: "Chiffre d'affaires",
    signups: "Inscriptions",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const ordersLabel = root.querySelector<HTMLElement>("#orders-label")!;
  const revenueLabel = root.querySelector<HTMLElement>("#revenue-label")!;
  const signupsLabel = root.querySelector<HTMLElement>("#signups-label")!;
  const orders = root.querySelector<MinervaSparkline>("#orders")!;
  const revenue = root.querySelector<MinervaSparkline>("#revenue")!;
  const signups = root.querySelector<MinervaSparkline>("#signups")!;
  ordersLabel.textContent = text.orders;
  revenueLabel.textContent = text.revenue;
  signupsLabel.textContent = text.signups;
  orders.data = [32, 41, 38, 52, 49, 61, 58, 70, 66, 74];
  orders.valueName = text.orders;
  revenue.data = [3.1, 3.4, 3.2, 3.9, 4.4, 4.1, 4.6, 4.8, 4.5, 4.9];
  revenue.valueName = text.revenue;
  signups.data = [12, 18, 9, 22, 30, 25, 19, 28, 33, 31];
  signups.valueName = text.signups;
}

```

## Example: Target line and hover

reference draws a dashed target line; hovering shows the value under the pointer.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/wc/reference.html

```html
<div style="display: grid; gap: 8px">
  <minerva-sparkline
    id="latency"
    reference="200"
    height="64"
  ></minerva-sparkline>
  <output id="value" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/sparkline/wc/reference.ts

```tsx
// `reference` draws a dashed target line; minerva-hover reports the value
// under the pointer (null when it leaves).
import type {
  ChartHoverEvent,
  MinervaSparkline,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    latency: "p95 latency",
    target: "target 200 ms",
    hint: "Hover the line",
  },
  zh: {
    latency: "p95 延迟",
    target: "目标 200 毫秒",
    hint: "将指针悬停在折线上",
  },
  ja: {
    latency: "p95 レイテンシ",
    target: "目標 200 ms",
    hint: "線にカーソルを合わせます",
  },
  fr: {
    latency: "Latence p95",
    target: "objectif 200 ms",
    hint: "Survolez la courbe",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const latency = root.querySelector<MinervaSparkline>("#latency")!;
  const value = root.querySelector<HTMLOutputElement>("#value")!;
  latency.data = [182, 175, 190, 214, 230, 205, 188, 176, 169, 181, 196, 172];
  latency.valueName = text.latency;
  latency.format = (ms) => `${ms} ms`;
  value.textContent = text.hint;
  const onHover = (event: Event) => {
    const hover = (event as CustomEvent<ChartHoverEvent | null>).detail;
    const y = hover?.items[0]?.y;
    value.textContent =
      y === undefined ? text.hint : `${text.latency}: ${y} ms (${text.target})`;
  };
  latency.addEventListener("minerva-hover", onHover);
  return () => latency.removeEventListener("minerva-hover", onHover);
}

```
