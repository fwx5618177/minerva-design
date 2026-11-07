# Quadrant chart

A four-quadrant matrix (priority, Eisenhower, BCG...) with tinted, titled quadrants and labelled dots.

Package: minerva-design@1.22.1

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Dark mode

Single sign-on

CSV export

Offline sync

New icons

Plugin API

Custom fonts

Tooltips

Rewrite

Search

Quick wins

Big bets

Fill-ins

Time sinks

Money pits

Effort

Impact

Feature

Features by effort and impact

{{feature}}: effort {{effort}}, impact {{impact}}

Tap a feature

Fix login outage

Tax filing

Quarterly planning

Mentoring

Book travel

Most meetings

Inbox zero

Social media

Do first

Schedule

Delegate

Eliminate

Urgency

Importance

Task

Eisenhower matrix of tasks

{{task}}: urgency {{urgency}}, importance {{importance}}

Click a task

Task {{n}}

{{task}} added to “{{quadrant}}”

Add a task to “{{quadrant}}”

Important

Not important

Urgent

Not urgent

{{task}} moved to “{{quadrant}}”

Moving {{task}} to “{{quadrant}}”

{{task}} saved in “{{quadrant}}”

{{task}} deleted

Edit {{task}}

Task name

Quadrant

Save

Cancel

Delete

Urgency {{urgency}} · Importance {{importance}}

Task matrix: drag tasks between quadrants

Drag a task to another quadrant, double-click it to edit, or click an empty area to add one

“{{quadrant}}” tapped

Drag a task to another quadrant

Do it now

Plan a time

Hand it off

Drop it

{{count}} task · {{time}}

{{count}} tasks · {{time}}

{{task}} selected

Click a task to select it, or drag it. Keyboard: Tab to a task, then Shift + arrow keys move it to another quadrant

Click + to add a task to a quadrant, click a task to select it

Eisenhower matrix of today's tasks with their estimates

Cloud hosting

Analytics

Mobile SDK

On-premise licenses

Support plans

Hardware

Training

Stars

Question marks

Cash cows

Dogs

Relative market share

Market growth (%)

Product

BCG matrix of the product portfolio

Key person leaves

Vendor delay

Data breach

Scope creep

Budget cut

New regulation

Cloud outage

Office move

Monitor

Act now

Accept

Mitigate

Likelihood

Impact

Risk

Selected: {{risk}}

Click a risk

Risk matrix of the project by likelihood and impact

{{name}} (us)

Best value

Premium

Budget

Overpriced

High quality

Low quality

Low price

High price

Brand

Brands by price and perceived quality

Bulk edit

SAML single sign-on

Offline mode

Onboarding tour

AI summaries

Color themes

Audit log

Chat alerts

Public API v2

CSV import

Weight by confidence

Effort (person-months)

Reach × impact (thousand users)

Reach {{reach}}k · impact {{impact}} · confidence {{confidence}} · effort {{effort}} person-months

RICE score: {{score}}

Top 3 by RICE score: {{list}}

Backlog prioritized with RICE: effort against reach times impact

Strengths

Weaknesses

Opportunities

Threats

Internal

External

Helpful

Harmful

Loyal customers

In-house platform

Low churn

Small sales team

Legacy billing

Single region

Growing SMB market

Reseller partnerships

AI features

Well-funded entrant

New data rules

Price war

{{n}} factors

{{quadrant}}: {{items}}

{{factor}} ({{quadrant}})

Click a quadrant to list its factors, or a factor to select it

SWOT analysis: strengths, weaknesses, opportunities and threats

Affordability

Feature depth

Ease of use

Support quality

Integrations

Horizontal axis

Vertical axis

{{name}} (us)

Strong on both

Weak on both

{{dimension}} {{score}}

{{name}}: {{scores}}. Ahead of us on {{ahead}} of {{total}} dimensions.

{{name}} (us): {{scores}}.

Choose two dimensions, then click a vendor to see its profile

Competitors by {{x}} and {{y}}

Backend lead

Product designer

Data analyst

QA engineer

Mobile developer

Product manager

Support lead

Junior developer

Future leaders

Rough diamonds

Solid performers

Needs support

Performance

Potential

{{person}}: performance {{performance}}, potential {{potential}} → {{quadrant}}

{{person}} placed in “{{quadrant}}”

{{person}} is back to the initial rating

All ratings are back to their initial values

Reset all

{{n}} of {{total}} recalibrated

Drag a person to recalibrate them, double-click to undo

Talent calibration: performance against potential

Auth

Search

Checkout

Catalog

Payments

Notifications

Recommendations

Media

Healthy

Slow

Erroring

Critical

p95 latency (ms)

Error rate (%)

p95 {{latency}} · errors {{errors}}

Over both SLOs: {{list}}

No service is over both SLOs

Pause

Resume

Live service health: p95 latency against error rate

## QuadrantChart

Support: beta

Quadrant matrix with the web props (points, domains, splits, quadrants with badge/description, axis labels, showTicks, reverseX, labels, pointSize, showCounts, selectedIndex/selectedIndices rings); pointclick, quadrantclick and pointdrag/pointdrop events. quadrantContent (ReactNode overlays) has no canvas equivalent: place host views with the layout event and toPixel(). renderQuadrantHeader and getPointProps are React-only; showCounts takes no formatting function. Accessible points (accessiblePoints): a visually hidden list of the points (aria-role / aria-label with name, quadrant and values; a tap emits pointclick) with 'Move to …' buttons emitting pointdrop with the center of the neighbouring quadrant (when draggable). Mini-program views take no keyboard focus and have no live region: no focus ring, no Shift + arrow moves, and the move is not announced. Dragging is enabled by the draggable property (a native host cannot detect a bound pointdrop handler). Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/quadrant-chart/index",
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
    "name": "points",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xDomain",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yDomain",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "xSplit",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "ySplit",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "quadrants",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "xLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "yLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "axisLabels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "showTicks",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "reverseX",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "showLabels",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "pointSize",
    "typeText": "number",
    "required": false,
    "default": 12
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "draggable",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "showCounts",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "selectedIndex",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "selectedIndices",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "accessiblePoints",
    "typeText": "boolean",
    "required": false,
    "default": true
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
    "typeText": "{ point: NativeQuadrantPoint; index: number }",
    "description": "A dot was tapped."
  },
  {
    "name": "quadrantclick",
    "typeText": "{ quadrant: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'; x: number; y: number }",
    "description": "The empty area of a quadrant was tapped."
  },
  {
    "name": "pointdrag",
    "typeText": "{ point: NativeQuadrantPoint; index: number; target: NativeQuadrantDropTarget }",
    "description": "A dot is dragged (draggable)."
  },
  {
    "name": "pointdrop",
    "typeText": "{ point: NativeQuadrantPoint; index: number; target: NativeQuadrantDropTarget }",
    "description": "A dragged dot was released; update points to move it."
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
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
