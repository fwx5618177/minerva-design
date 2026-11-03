# Quadrant chart

A four-quadrant matrix (priority, Eisenhower, BCG...) with tinted, titled quadrants and labelled dots.

Package: minerva-design@1.19.3

Renderer: taro

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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

Cartesian charts drawn on a Canvas 2D node by the DOM-free engine (minerva-design/charts presets): the web component props mapped to the same engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset, H5 mouse hover; ref exposes resetZoom/getView/setView/getInstance/resize. No WebGPU / WebGL renderer (one Canvas 2D path), no keyboard navigation and no React tooltip content: tooltip.render may only return text. QuadrantChart accessible points: a visually hidden list of the points (role / aria-role, aria-label with name, quadrant and values; a tap is onPointClick) with 'Move to …' buttons calling onPointDrop with the center of the neighbouring quadrant. Mini-program views take no keyboard focus, so there is no focus ring nor Shift + arrow moves, and no live region: the move is announced (role=status) on H5 only. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "QuadrantChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "disableScroll",
    "source": "packages/taro/src/charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Keeps the page from scrolling while a finger moves on the chart"
  },
  {
    "name": "accessiblePoints",
    "source": "packages/taro/src/charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Renders a visually hidden list of the points for the screen readers: one button per point (its name, quadrant and values; a tap is `onPointClick`) and, with `onPointDrop`, \"Move to …\" buttons moving it to the neighbouring quadrants (`onPointDrop` with the quadrant center)"
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
    "name": "id",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the `<Canvas>` (generated by default)"
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
  }
]
```

### events

```json
[
  {
    "name": "onPointClick",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((point: QuadrantPoint, index: number) => void) | undefined",
    "typeRef": "type:b27cb5a6c62cedbcb19c",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint",
        "typeRef": "type:a8f1c3191391a02e50c1"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the tapped point and its index"
  },
  {
    "name": "onQuadrantClick",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((quadrant: keyof QuadrantRegions, position: { x: number; y: number; }) => void) | undefined",
    "typeRef": "type:cb94967d1b76f3d5d1ef",
    "parameters": [
      {
        "name": "quadrant",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "keyof QuadrantRegions",
        "typeRef": "type:3619c943e5fcb3ed927b"
      },
      {
        "name": "position",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "{ x: number; y: number; }",
        "typeRef": "type:f25076a54fb3857c6296"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the empty area of a quadrant is tapped"
  },
  {
    "name": "onPointDrop",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((point: QuadrantPoint, index: number, target: QuadrantDropTarget) => void) | undefined",
    "typeRef": "type:998f2ad059dd3b686f96",
    "parameters": [
      {
        "name": "point",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "QuadrantPoint",
        "typeRef": "type:a8f1c3191391a02e50c1"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      },
      {
        "name": "target",
        "position": 2,
        "required": true,
        "rest": false,
        "typeText": "QuadrantDropTarget",
        "typeRef": "type:26428457314664a883f3"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a dragged point is released; the dots become draggable when it is set (the chart does not move them: update `points`)"
  },
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
