# Quadrant chart

A four-quadrant matrix (priority, Eisenhower, BCG...) with tinted, titled quadrants and labelled dots.

Package: minerva-design@1.23.1

Renderer: native

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

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "name": "renderTooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "node",
    "typeText": "((point: QuadrantPoint, index: number) => ReactNode) | undefined",
    "typeRef": "type:69bd7b8ae3861328f291",
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
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip of a point"
  },
  {
    "name": "quadrantContent",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "node",
    "typeText": "Partial<Record<keyof QuadrantRegions, ReactNode>> | undefined",
    "typeRef": "type:771baa9ee9c2890c3c21",
    "required": false,
    "description": "React content placed over each quadrant (e.g. an add button); the content receives touches, the rest of the quadrant does not"
  },
  {
    "name": "renderQuadrantHeader",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "node",
    "typeText": "((corner: keyof QuadrantRegions, info: QuadrantHeaderInfo) => ReactNode) | undefined",
    "typeRef": "type:a0e014fd9b39e3c4ab89",
    "parameters": [
      {
        "name": "corner",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "keyof QuadrantRegions",
        "typeRef": "type:3619c943e5fcb3ed927b"
      },
      {
        "name": "info",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "QuadrantHeaderInfo",
        "typeRef": "type:57043c2f527242a4f04e"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React header of each quadrant, in its outer corner (top edge for the top quadrants, bottom edge for the bottom ones, aligned to the outer side); replaces the drawn title, badge, description and count. The header receives touches (e.g. an add button)"
  },
  {
    "name": "renderPointActions",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "node",
    "typeText": "((point: QuadrantPoint, index: number) => ReactNode) | undefined",
    "typeRef": "type:c698917b2dd9224285d1",
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
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content shown next to the selected point (`selectedIndex`), e.g. edit / delete buttons: above the dot (below it near the top edge), kept inside the plot area so that it receives touches"
  },
  {
    "name": "accessiblePoints",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Exposes every point to the screen readers (VoiceOver, TalkBack) as a button over its dot, labelled with its name, quadrant and values; with `onPointDrop`, its accessibility actions (\"Move to …\") move it to the neighbouring quadrants (`onPointDrop` with the quadrant center)"
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Test identifier of the root view"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip shown on tap / while scrubbing; `false` disables it"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "legend",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name (tap toggles a series)"
  },
  {
    "name": "crosshair",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the finger"
  },
  {
    "name": "annotations",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas, reference lines and texts"
  },
  {
    "name": "interaction",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Pinch to zoom, drag to pan when zoomed, double tap to reset; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  }
]
```

### events

```json
[
  {
    "name": "onPointClick",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((point: QuadrantPoint, index: number) => void) | undefined",
    "typeRef": "type:92675943891fcd1135a4",
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
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((quadrant: keyof QuadrantRegions, position: { x: number; y: number; }) => void) | undefined",
    "typeRef": "type:a4a51738528b5d04d3d9",
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
        "typeRef": "type:ede1d5412e129e3eab28"
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
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((point: QuadrantPoint, index: number, target: QuadrantDropTarget) => void) | undefined",
    "typeRef": "type:6c7fb89868015b78083f",
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
        "typeRef": "type:f976ba9466af368cfc73"
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
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:170f27b8f07028fffd08",
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
    "description": "Called when the highlighted points change"
  },
  {
    "name": "onZoom",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:e6c98e88ed542ed60f34",
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

## API

```json
{
  "native:QuadrantChartProps": {
    "source": "native/src/components/Chart/types.ts",
    "description": "Props of QuadrantChart",
    "kind": "interface",
    "extends": [
      "Omit<ChartCommonProps, \"onPointClick\" | \"onPlotClick\" | \"renderTooltip\" | \"xAxis\" | \"yAxis\">",
      "QuadrantConfig"
    ],
    "props": [
      {
        "name": "onPointClick",
        "type": "(point: QuadrantPoint, index: number) => void",
        "required": false,
        "description": "Called with the tapped point and its index"
      },
      {
        "name": "onQuadrantClick",
        "type": "(quadrant: QuadrantCorner, position: { x: number; y: number }) => void",
        "required": false,
        "description": "Called when the empty area of a quadrant is tapped"
      },
      {
        "name": "onPointDrop",
        "type": "(point: QuadrantPoint, index: number, target: QuadrantDropTarget) => void",
        "required": false,
        "description": "Called when a dragged point is released; the dots become draggable when it is set (the chart does not move them: update `points`)"
      },
      {
        "name": "renderTooltip",
        "type": "(point: QuadrantPoint, index: number) => ReactNode",
        "required": false,
        "description": "React content of the tooltip of a point"
      },
      {
        "name": "quadrantContent",
        "type": "Partial<Record<QuadrantCorner, ReactNode>>",
        "required": false,
        "description": "React content placed over each quadrant (e.g. an add button); the content receives touches, the rest of the quadrant does not"
      },
      {
        "name": "renderQuadrantHeader",
        "type": "(corner: QuadrantCorner, info: QuadrantHeaderInfo) => ReactNode",
        "required": false,
        "description": "React header of each quadrant, in its outer corner (top edge for the top quadrants, bottom edge for the bottom ones, aligned to the outer side); replaces the drawn title, badge, description and count. The header receives touches (e.g. an add button)"
      },
      {
        "name": "renderPointActions",
        "type": "(point: QuadrantPoint, index: number) => ReactNode",
        "required": false,
        "description": "React content shown next to the selected point (`selectedIndex`), e.g. edit / delete buttons: above the dot (below it near the top edge), kept inside the plot area so that it receives touches"
      },
      {
        "name": "accessiblePoints",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Exposes every point to the screen readers (VoiceOver, TalkBack) as a button over its dot, labelled with its name, quadrant and values; with `onPointDrop`, its accessibility actions (\"Move to …\") move it to the neighbouring quadrants (`onPointDrop` with the quadrant center)"
      }
    ]
  },
  "native:QuadrantConfig": {
    "source": "charts/src/engine/presets.ts",
    "description": "Settings of a quadrant matrix (the props of QuadrantChart)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "points",
        "type": "readonly QuadrantPoint[]",
        "required": true,
        "description": "Points to place"
      },
      {
        "name": "xDomain",
        "type": "[number, number]",
        "required": false,
        "default": "[0, 10]",
        "description": "Range of the horizontal axis"
      },
      {
        "name": "yDomain",
        "type": "[number, number]",
        "required": false,
        "default": "[0, 10]",
        "description": "Range of the vertical axis"
      },
      {
        "name": "xSplit",
        "type": "number",
        "required": false,
        "description": "X value of the vertical divider (the middle of `xDomain` by default)"
      },
      {
        "name": "ySplit",
        "type": "number",
        "required": false,
        "description": "Y value of the horizontal divider (the middle of `yDomain` by default)"
      },
      {
        "name": "quadrants",
        "type": "QuadrantRegions",
        "required": false,
        "description": "Titles and colors of the quadrants"
      },
      {
        "name": "xLabel",
        "type": "string",
        "required": false,
        "description": "Title of the horizontal axis"
      },
      {
        "name": "yLabel",
        "type": "string",
        "required": false,
        "description": "Title of the vertical axis"
      },
      {
        "name": "axisLabels",
        "type": "QuadrantAxisLabels",
        "required": false,
        "description": "Texts at the ends of the dividers, drawn inside the plot (e.g. \"Important\" at the top)"
      },
      {
        "name": "showTicks",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the numeric ticks of the axes; `false` keeps only the matrix"
      },
      {
        "name": "reverseX",
        "type": "boolean",
        "required": false,
        "description": "Reverses the horizontal axis (e.g. \"urgent\" on the left)"
      },
      {
        "name": "showLabels",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Draws the labels next to the dots (overlapping labels are skipped)"
      },
      {
        "name": "pointSize",
        "type": "number",
        "required": false,
        "default": "12",
        "description": "Dot diameter in pixels"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Name of the points in the tooltip"
      },
      {
        "name": "draggable",
        "type": "boolean",
        "required": false,
        "description": "Lets the user drag the dots (`drag` / `drop` events)"
      },
      {
        "name": "showCounts",
        "type": "boolean | ((count: number, points: readonly QuadrantPoint[]) => string)",
        "required": false,
        "default": "false",
        "description": "Shows the number of points of each quadrant after its title; a function returns the text instead (e.g. `(n) => `${n} tasks``)"
      },
      {
        "name": "selectedIndex",
        "type": "number | null",
        "required": false,
        "description": "Index of the selected point: drawn with a ring of its color (`null`: none)"
      },
      {
        "name": "selectedIndices",
        "type": "readonly number[]",
        "required": false,
        "description": "Indices of the selected points (several selected points)"
      }
    ]
  },
  "native:QuadrantDropTarget": {
    "source": "native/src/components/Chart/types.ts",
    "description": "Where a dragged QuadrantChart point was dropped",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Data coordinates of the drop"
      },
      {
        "name": "y",
        "type": "number",
        "required": true
      },
      {
        "name": "quadrant",
        "type": "QuadrantCorner",
        "required": true,
        "description": "Quadrant of the drop, as seen on screen"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic

Effort / impact matrix: dots take the color of their quadrant.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/native/basic.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  QuadrantChart,
  useTheme,
  type QuadrantPoint,
} from "minerva-design/native";

// x: effort, y: impact (0-10)
const features = [
  { key: "darkMode", x: 2, y: 8 },
  { key: "offlineSync", x: 8, y: 9 },
  { key: "newIcons", x: 2.5, y: 3 },
  { key: "rewrite", x: 8.5, y: 2.5 },
  { key: "search", x: 6, y: 7 },
];

export default function Basic() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const { colors } = useTheme();
  const [status, setStatus] = useState<string | null>(null);
  const points: QuadrantPoint[] = features.map(({ key, x, y }) => ({
    label: t(`features.${key}`),
    x,
    y,
  }));
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <QuadrantChart
        height={300}
        points={points}
        xLabel={t("effort")}
        yLabel={t("impact")}
        quadrants={{
          topLeft: { label: t("quickWins") },
          topRight: { label: t("bigBets") },
          bottomLeft: { label: t("fillIns") },
          bottomRight: { label: t("moneyPits") },
        }}
        ariaLabel={t("featuresAria")}
        onPointClick={(point) =>
          setStatus(
            t("featureStatus", {
              feature: point.label,
              effort: point.x,
              impact: point.y,
            }),
          )
        }
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status ?? t("tapFeature")}
      </Text>
    </View>
  );
}

```

## Example: Draggable task matrix

showTicks={false} and axisLabels turn the chart into a task board: while dragging, the status line names the target quadrant (onPointDrag), and the drop updates the position (onPointDrop); double-click a task to rename it or move it to another quadrant (onPointDoubleClick); click an empty area or the + button (quadrantContent) to add one; renderTooltip fills the card of a task.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/native/draggable.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  IconButton,
  QuadrantChart,
  useTheme,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/native";

// translation keys of the quadrant titles
const titleKeys: Record<QuadrantCorner, string> = {
  topLeft: "doFirst",
  topRight: "schedule",
  bottomLeft: "delegate",
  bottomRight: "eliminate",
};

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left,
// so the top-left quadrant holds high x values
const centers: Record<QuadrantCorner, { x: number; y: number }> = {
  topLeft: { x: 7.5, y: 7.5 },
  topRight: { x: 2.5, y: 7.5 },
  bottomLeft: { x: 7.5, y: 2.5 },
  bottomRight: { x: 2.5, y: 2.5 },
};

// task names are translated when rendered (`key`), added tasks are numbered
type Task = { key?: string; n?: number; x: number; y: number };
const initial: Task[] = [
  { key: "loginOutage", x: 9, y: 8 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "bookTravel", x: 8, y: 3 },
  { key: "inboxZero", x: 2.5, y: 2 },
];

const clamp = (value: number) => Math.min(9.5, Math.max(0.5, value));

export default function Draggable() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const { colors } = useTheme();
  const [tasks, setTasks] = useState(initial);
  const [status, setStatus] = useState<string | null>(null);
  const title = (corner: QuadrantCorner) => t(titleKeys[corner]);
  const name = (task: Task) =>
    task.key ? t(`tasks.${task.key}`) : t("newTask", { n: task.n });
  const points: QuadrantPoint[] = tasks.map((task) => ({
    label: name(task),
    x: task.x,
    y: task.y,
  }));
  const decimal = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const add = (corner: QuadrantCorner) => {
    const jitter = (tasks.length % 3) - 1;
    const task: Task = {
      n: tasks.length + 1,
      x: clamp(centers[corner].x + jitter),
      y: clamp(centers[corner].y + jitter),
    };
    setTasks((current) => [...current, task]);
    setStatus(t("taskAdded", { task: name(task), quadrant: title(corner) }));
  };

  const tint: Record<QuadrantCorner, string> = {
    topLeft: colors["danger-color"],
    topRight: colors["primary-color"],
    bottomLeft: colors["warning-color"],
    bottomRight: colors["text-secondary-color"],
  };

  // Title + add button in the outer corner of each quadrant
  const header = (corner: QuadrantCorner) => {
    const right = corner.endsWith("Right");
    const top = corner.startsWith("top");
    return (
      <View
        style={{
          position: "absolute",
          [top ? "top" : "bottom"]: 2,
          [right ? "right" : "left"]: 6,
          flexDirection: right ? "row-reverse" : "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Text style={{ color: tint[corner], fontSize: 12, fontWeight: "600" }}>
          {title(corner)}
        </Text>
        <IconButton
          size="small"
          label={t("addTask", { quadrant: title(corner) })}
          onPress={() => add(corner)}
        >
          <Text style={{ color: tint[corner], fontSize: 16 }}>+</Text>
        </IconButton>
      </View>
    );
  };

  return (
    <View style={{ width: "100%", gap: 8 }}>
      <QuadrantChart
        height={320}
        points={points}
        reverseX
        showTicks={false}
        axisLabels={{
          top: t("important"),
          bottom: t("notImportant"),
          left: t("urgent"),
          right: t("notUrgent"),
        }}
        ariaLabel={t("boardAria")}
        onPointDrop={(point, index, target) => {
          setTasks((current) =>
            current.map((task, i) =>
              i === index
                ? { ...task, x: clamp(target.x), y: clamp(target.y) }
                : task,
            ),
          );
          setStatus(
            t("taskMoved", {
              task: point.label,
              quadrant: title(target.quadrant),
            }),
          );
        }}
        onQuadrantClick={(corner) =>
          setStatus(t("quadrantTapped", { quadrant: title(corner) }))
        }
        renderTooltip={(point) => (
          <View>
            <Text style={{ color: colors["text-color"], fontWeight: "600" }}>
              {point.label}
            </Text>
            <Text style={{ color: colors["text-secondary-color"] }}>
              {t("taskScores", {
                urgency: decimal.format(point.x),
                importance: decimal.format(point.y),
              })}
            </Text>
          </View>
        )}
        quadrantContent={{
          topLeft: header("topLeft"),
          topRight: header("topRight"),
          bottomLeft: header("bottomLeft"),
          bottomRight: header("bottomRight"),
        }}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status ?? t("dragHintNative")}
      </Text>
    </View>
  );
}

```

## Example: Badges, counts and keyboard moves

Quadrants show badges, descriptions and counts. Hovering or focusing a task shows a detached translucent card beside its point, with its name, quadrant and actions. The point keeps its real size and position; the card stays clear of it and changes sides when space is limited. The card replaces its label; the card goes when the pointer leaves, with Escape or with a click beside the tasks. A selected task keeps a ring. While a task is dragged the card follows it and names the quadrant it would land in. Tab enters the task list, Enter selects, and Shift + arrows move tasks between quadrants with live announcements.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/quadrant-chart/native/triage.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  QuadrantChart,
  useTheme,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/native";

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left
const initial = [
  { key: "loginOutage", x: 9, y: 8 },
  { key: "taxFiling", x: 7, y: 8.8 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "bookTravel", x: 8.5, y: 3 },
  { key: "meetings", x: 6.5, y: 1.8 },
  { key: "socialMedia", x: 1.5, y: 1.2 },
];

export default function Triage() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const { colors } = useTheme();
  const [tasks, setTasks] = useState(initial);
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const points: QuadrantPoint[] = tasks.map(({ key, x, y }) => ({
    label: t(`tasks.${key}`),
    x,
    y,
  }));
  // badge pill, title and a second line, drawn by the chart
  const quadrants: QuadrantRegions = {
    topLeft: {
      badge: "Q1",
      label: t("doFirst"),
      description: t("triage.doNow"),
    },
    topRight: {
      badge: "Q2",
      label: t("schedule"),
      description: t("triage.plan"),
    },
    bottomLeft: {
      badge: "Q3",
      label: t("delegate"),
      description: t("triage.handOff"),
    },
    bottomRight: {
      badge: "Q4",
      label: t("eliminate"),
      description: t("triage.drop"),
    },
  };
  const title = (corner: QuadrantCorner) => quadrants[corner]?.label ?? "";

  return (
    <View style={{ width: "100%", gap: 8 }}>
      <QuadrantChart
        height={340}
        points={points}
        quadrants={quadrants}
        reverseX
        showTicks={false}
        showCounts
        selectedIndex={selected}
        ariaLabel={t("triage.aria")}
        onPointClick={(point, index) => {
          setSelected(index);
          setStatus(t("triage.selected", { task: point.label }));
        }}
        onPointDrop={(point, index, target) => {
          setTasks((current) =>
            current.map((task, i) =>
              i === index ? { ...task, x: target.x, y: target.y } : task,
            ),
          );
          setSelected(index);
          setStatus(
            t("taskMoved", {
              task: point.label,
              quadrant: title(target.quadrant),
            }),
          );
        }}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status ?? t("dragHintNative")}
      </Text>
    </View>
  );
}

```
